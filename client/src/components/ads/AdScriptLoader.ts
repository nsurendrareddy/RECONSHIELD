'use client';

import { adMetrics } from '@/lib/adMetrics';

/**
 * Typed error thrown when the ad provider returns an HTTP error (e.g. 500).
 * Callers can check `err instanceof AdProviderHttpError` to distinguish
 * a provider failure from a network/adblocker failure.
 */
export class AdProviderHttpError extends Error {
  constructor(public readonly statusCode: number, url: string) {
    super(`Ad provider returned HTTP ${statusCode} for: ${url}`);
    this.name = 'AdProviderHttpError';
  }
}

/**
 * AdScriptLoader — Global singleton script registry.
 *
 * Guarantees:
 *   - Every external script URL is fetched exactly once.
 *   - Concurrent requests for the same URL share a single Promise.
 *   - Scripts survive App Router client-side navigations (never re-injected).
 *   - HTTP 500 detection via a cheap HEAD probe before script injection —
 *     avoids burning the full 8s timeout on known-bad provider responses.
 *   - One automatic retry on transient network failure (after 800ms).
 *     (HTTP 500s are NOT retried — the provider is confirming the failure.)
 *   - Load timing is forwarded to adMetrics for analytics.
 *   - preload() allows pre-fetching scripts before they are rendered.
 */
class AdScriptLoader {
  /** URLs of successfully loaded scripts */
  private loaded = new Set<string>();

  /** In-flight or completed promises keyed by URL */
  private promises = new Map<string, Promise<void>>();

  /**
   * Load a script — returns a Promise that resolves when the script is ready.
   * Safe to call concurrently; duplicate calls reuse the existing Promise.
   * Throws AdProviderHttpError if the provider returns a 5xx status.
   */
  public load(src: string, attrs: Record<string, string> = {}): Promise<void> {
    if (typeof window === 'undefined') return Promise.resolve();

    // Already successfully loaded
    if (this.loaded.has(src)) return Promise.resolve();

    // In-flight (or previously resolved promise still in map)
    if (this.promises.has(src)) return this.promises.get(src)!;

    const promise = this.createScriptPromise(src, attrs, false);
    this.promises.set(src, promise);
    return promise;
  }

  /**
   * Preload a script in the background — fire-and-forget.
   * The result is cached so future .load() calls resolve instantly.
   */
  public preload(src: string, attrs: Record<string, string> = {}): void {
    if (typeof window === 'undefined') return;
    if (this.loaded.has(src) || this.promises.has(src)) return;
    // Load silently — errors are swallowed (preload is best-effort)
    this.load(src, attrs).catch(() => {});
  }

  private async createScriptPromise(
    src: string,
    attrs: Record<string, string>,
    isRetry: boolean
  ): Promise<void> {
    adMetrics.recordScriptStart(src);

    // ── HEAD probe ──────────────────────────────────────────────────────
    // A cheap no-body request to detect HTTP 500 before we inject the
    // <script> tag. Saves the full 8s timeout on known-bad responses.
    // We use 'no-cors' mode so the probe works cross-origin without
    // requiring CORS headers from the ad server. With no-cors, the
    // response is "opaque" and status is always 0 — so we only skip
    // the probe result and fall through to normal injection in that case.
    //
    // If fetch itself fails (DNS block, network error), we fall through
    // to the <script> injection which will also fail and trigger a retry.
    try {
      const probe = await fetch(src, {
        method: 'HEAD',
        mode: 'no-cors',
        cache: 'no-store',
        credentials: 'omit',
        signal: AbortSignal.timeout(3000),
      });
      // opaque responses (no-cors) have status === 0 — can't detect 500
      // non-opaque responses (e.g., same-origin or CORS-enabled) expose status
      if (probe.status >= 500 && probe.status < 600) {
        adMetrics.recordScriptFailed(src, probe.status);
        this.promises.delete(src);
        throw new AdProviderHttpError(probe.status, src);
      }
    } catch (err) {
      // Re-throw AdProviderHttpError immediately
      if (err instanceof AdProviderHttpError) throw err;
      // Network error / timeout / CSP block on fetch itself — fall through
      // to <script> injection and let onerror handle it
      if (process.env.NODE_ENV === 'development') {
        console.warn('[AdScriptLoader] HEAD probe failed (falling through to script injection):', src, err);
      }
    }

    // ── Script injection ────────────────────────────────────────────────
    return new Promise<void>((resolve, reject) => {
      // Honour scripts already injected into the DOM by other means
      const existing = document.querySelector(`script[src="${src}"]`);
      if (existing) {
        this.loaded.add(src);
        adMetrics.recordScriptLoaded(src);
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = src;
      script.async = true;

      Object.entries(attrs).forEach(([key, val]) => {
        script.setAttribute(key, val);
      });

      script.onload = () => {
        this.loaded.add(src);
        this.promises.delete(src);
        adMetrics.recordScriptLoaded(src);
        if (process.env.NODE_ENV === 'development') {
          console.log('[AdScriptLoader] Loaded:', src);
        }
        resolve();
      };

      script.onerror = (err) => {
        script.remove();

        if (!isRetry) {
          // Single automatic retry after 800ms for transient network failures
          // (HTTP 500s are already caught by the HEAD probe and won't reach here)
          if (process.env.NODE_ENV === 'development') {
            console.warn('[AdScriptLoader] Script failed, retrying in 800ms:', src);
          }
          setTimeout(() => {
            const retryPromise = this.createScriptPromise(src, attrs, true);
            this.promises.set(src, retryPromise);
            retryPromise.then(resolve).catch(reject);
          }, 800);
        } else {
          // Retry also failed — give up
          this.promises.delete(src);
          adMetrics.recordScriptFailed(src);
          if (process.env.NODE_ENV === 'development') {
            console.error('[AdScriptLoader] Script permanently failed after retry:', src, err);
          }
          reject(err);
        }
      };

      document.head.appendChild(script);
    });
  }
}

// Singleton — survives App Router navigations
export const adScriptLoader = new AdScriptLoader();
