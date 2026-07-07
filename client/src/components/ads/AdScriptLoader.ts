'use client';

import { adMetrics } from '@/lib/adMetrics';

/**
 * AdScriptLoader — Global singleton script registry.
 *
 * Guarantees:
 *   - Every external script URL is fetched exactly once.
 *   - Concurrent requests for the same URL share a single Promise.
 *   - Scripts survive App Router client-side navigations (never re-injected).
 *   - One automatic retry on transient network failure (after 800ms).
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

  private createScriptPromise(
    src: string,
    attrs: Record<string, string>,
    isRetry: boolean
  ): Promise<void> {
    adMetrics.recordScriptStart(src);

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
        // Remove the failed script from DOM so retry can re-add it
        script.remove();

        if (!isRetry) {
          // Single automatic retry after 800ms
          if (process.env.NODE_ENV === 'development') {
            console.warn('[AdScriptLoader] Script failed, retrying in 800ms:', src);
          }
          setTimeout(() => {
            const retryPromise = this.createScriptPromise(src, attrs, true);
            // Replace the promise so concurrent callers get the retry
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
