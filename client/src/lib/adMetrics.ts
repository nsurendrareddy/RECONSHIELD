/**
 * AdMetrics — Lightweight ad performance analytics singleton.
 *
 * Tracks:
 *   - Script load time per URL (download latency from ad provider)
 *   - Banner render time (script loaded → iframe injected)
 *   - Time to first visible ad (from page navigation)
 *   - Fill rate (filled / total attempted)
 *   - Timeout rate (timed-out / total attempted)
 *   - HTTP 500 rate (provider-side failures vs network/adblocker)
 *
 * Exposes:
 *   window.__adMetrics.getSummary() — structured machine-readable metrics
 *   window.__adMetrics.getReport()  — Phase 13 human-readable performance report
 *
 * Separates:
 *   - appDelayMs  = time from slot enqueue → script loaded (queue + network)
 *   - providerDelayMs = time from script loaded → render complete (provider rendering)
 */

export interface AdScriptTiming {
  url: string;
  startAt: number;
  loadedAt: number | null;
  durationMs: number | null;
  failed: boolean;
  /** HTTP status code if a 500 was detected via HEAD probe */
  statusCode?: number;
}

export interface AdSlotMetric {
  slotType: string;
  scriptUrl: string;
  enqueuedAt: number;
  scriptLoadedAt: number | null;
  renderCompletedAt: number | null;
  /** appDelayMs = enqueuedAt → scriptLoadedAt (queue wait + DNS + download) */
  appDelayMs: number | null;
  /** providerDelayMs = scriptLoadedAt → renderCompletedAt (provider rendering) */
  providerDelayMs: number | null;
  /** totalMs = enqueuedAt → renderCompletedAt */
  totalMs: number | null;
  status: 'pending' | 'filled' | 'timeout' | 'failed' | 'http500';
  /** HTTP status code if provider returned 500 */
  providerStatusCode?: number;
}

class AdMetrics {
  private scriptTimings = new Map<string, AdScriptTiming>();
  private slots: AdSlotMetric[] = [];
  private pageNavigationAt: number = Date.now();
  private firstAdFilledAt: number | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      (window as any).__adMetrics = this;
    }
  }

  // ------------------------------------------------------------------
  // Script-level tracking
  // ------------------------------------------------------------------

  recordScriptStart(url: string): void {
    if (this.scriptTimings.has(url)) return;
    this.scriptTimings.set(url, {
      url,
      startAt: Date.now(),
      loadedAt: null,
      durationMs: null,
      failed: false,
    });
  }

  recordScriptLoaded(url: string): void {
    const entry = this.scriptTimings.get(url);
    if (!entry) return;
    entry.loadedAt = Date.now();
    entry.durationMs = entry.loadedAt - entry.startAt;
    if (process.env.NODE_ENV === 'development') {
      console.log(`[AdMetrics] Script loaded: ${url} in ${entry.durationMs}ms`);
    }
  }

  recordScriptFailed(url: string, statusCode?: number): void {
    const entry = this.scriptTimings.get(url);
    if (!entry) return;
    entry.failed = true;
    entry.loadedAt = Date.now();
    entry.durationMs = entry.loadedAt - entry.startAt;
    if (statusCode !== undefined) {
      entry.statusCode = statusCode;
    }
  }

  // ------------------------------------------------------------------
  // Slot-level tracking
  // ------------------------------------------------------------------

  openSlot(slotType: string, scriptUrl: string): number {
    const idx = this.slots.length;
    this.slots.push({
      slotType,
      scriptUrl,
      enqueuedAt: Date.now(),
      scriptLoadedAt: null,
      renderCompletedAt: null,
      appDelayMs: null,
      providerDelayMs: null,
      totalMs: null,
      status: 'pending',
    });
    return idx;
  }

  recordSlotScriptLoaded(idx: number): void {
    const slot = this.slots[idx];
    if (!slot) return;
    slot.scriptLoadedAt = Date.now();
    // appDelayMs = queue wait + DNS + script download time
    slot.appDelayMs = slot.scriptLoadedAt - slot.enqueuedAt;
  }

  recordSlotFilled(idx: number): void {
    const slot = this.slots[idx];
    if (!slot) return;
    const now = Date.now();
    slot.renderCompletedAt = now;
    slot.status = 'filled';
    slot.totalMs = now - slot.enqueuedAt;
    if (slot.scriptLoadedAt) {
      // providerDelayMs = time provider took to render ad after script executed
      slot.providerDelayMs = now - slot.scriptLoadedAt;
    }
    // appDelayMs already set by recordSlotScriptLoaded; set fallback if not
    if (slot.appDelayMs === null && slot.scriptLoadedAt) {
      slot.appDelayMs = slot.scriptLoadedAt - slot.enqueuedAt;
    }

    if (this.firstAdFilledAt === null) {
      this.firstAdFilledAt = now;
      if (process.env.NODE_ENV === 'development') {
        console.log(`[AdMetrics] ⚡ Time to first ad: ${now - this.pageNavigationAt}ms`);
      }
    }
    if (process.env.NODE_ENV === 'development') {
      console.log(
        `[AdMetrics] Slot filled (${slot.slotType}): total=${slot.totalMs}ms` +
        ` | app=${slot.appDelayMs}ms | provider=${slot.providerDelayMs}ms`
      );
    }
  }

  recordSlotTimeout(idx: number): void {
    const slot = this.slots[idx];
    if (!slot) return;
    slot.status = 'timeout';
    slot.totalMs = Date.now() - slot.enqueuedAt;
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[AdMetrics] Slot timeout (${slot.slotType}) after ${slot.totalMs}ms`);
    }
  }

  recordSlotFailed(idx: number): void {
    const slot = this.slots[idx];
    if (!slot) return;
    slot.status = 'failed';
    slot.totalMs = Date.now() - slot.enqueuedAt;
  }

  /** Call when the HEAD probe detects an HTTP 500 from the ad provider. */
  recordSlotHttp500(idx: number, statusCode: number = 500): void {
    const slot = this.slots[idx];
    if (!slot) return;
    slot.status = 'http500';
    slot.providerStatusCode = statusCode;
    slot.totalMs = Date.now() - slot.enqueuedAt;
    if (process.env.NODE_ENV === 'development') {
      console.warn(
        `[AdMetrics] ⚠ HTTP ${statusCode} from provider for slot (${slot.slotType}) after ${slot.totalMs}ms`
      );
    }
  }

  // ------------------------------------------------------------------
  // Navigation reset
  // ------------------------------------------------------------------

  onNavigation(): void {
    this.pageNavigationAt = Date.now();
    this.firstAdFilledAt = null;
    // Keep script timings — scripts survive navigation in SPA
    this.slots = [];
  }

  // ------------------------------------------------------------------
  // Summary (structured, machine-readable)
  // ------------------------------------------------------------------

  getSummary() {
    const total = this.slots.length;
    const filled = this.slots.filter(s => s.status === 'filled').length;
    const timedOut = this.slots.filter(s => s.status === 'timeout').length;
    const failed = this.slots.filter(s => s.status === 'failed').length;
    const http500 = this.slots.filter(s => s.status === 'http500').length;

    const filledSlots = this.slots.filter(s => s.status === 'filled');
    const avgAppDelayMs = filledSlots.length
      ? Math.round(filledSlots.reduce((acc, s) => acc + (s.appDelayMs ?? 0), 0) / filledSlots.length)
      : null;
    const avgProviderDelayMs = filledSlots.length
      ? Math.round(filledSlots.reduce((acc, s) => acc + (s.providerDelayMs ?? 0), 0) / filledSlots.length)
      : null;
    const avgTotalMs = total
      ? Math.round(this.slots.reduce((acc, s) => acc + (s.totalMs ?? 0), 0) / total)
      : null;

    return {
      total,
      filled,
      timedOut,
      failed,
      http500,
      fillRate: total ? `${Math.round((filled / total) * 100)}%` : 'n/a',
      timeoutRate: total ? `${Math.round((timedOut / total) * 100)}%` : 'n/a',
      http500Rate: total ? `${Math.round((http500 / total) * 100)}%` : 'n/a',
      timeToFirstAdMs: this.firstAdFilledAt ? this.firstAdFilledAt - this.pageNavigationAt : null,
      /** avg time spent in app (queue + script download) for filled slots only */
      avgAppDelayMs,
      /** avg time spent waiting on provider to render for filled slots only */
      avgProviderDelayMs,
      avgTotalMs,
      scriptTimings: Object.fromEntries(this.scriptTimings),
      slots: this.slots,
    };
  }

  // ------------------------------------------------------------------
  // Phase 13 Report (human-readable)
  // ------------------------------------------------------------------

  getReport(): string {
    const s = this.getSummary();
    const lines: string[] = [
      '╔══════════════════════════════════════════════════════╗',
      '║       ReconShield — Ad Performance Report            ║',
      '╚══════════════════════════════════════════════════════╝',
      '',
      '── Slot Summary ──────────────────────────────────────',
      `  Total slots attempted : ${s.total}`,
      `  Filled                : ${s.filled}  (fill rate: ${s.fillRate})`,
      `  Timed out             : ${s.timedOut}  (timeout rate: ${s.timeoutRate})`,
      `  Hard failed           : ${s.failed}`,
      `  HTTP 500 (provider)   : ${s.http500}  (500 rate: ${s.http500Rate})`,
      '',
      '── Latency Breakdown ─────────────────────────────────',
      `  Time to first ad      : ${s.timeToFirstAdMs != null ? s.timeToFirstAdMs + 'ms' : 'n/a'}`,
      `  Avg total per slot    : ${s.avgTotalMs != null ? s.avgTotalMs + 'ms' : 'n/a'}`,
      '',
      '  For successfully filled slots:',
      `  ├─ App delay (queue+download) : ${s.avgAppDelayMs != null ? s.avgAppDelayMs + 'ms' : 'n/a'}`,
      `  └─ Provider delay (rendering) : ${s.avgProviderDelayMs != null ? s.avgProviderDelayMs + 'ms' : 'n/a'}`,
      '',
      '── Attribution ───────────────────────────────────────',
    ];

    const totalFailures = s.timedOut + s.failed + s.http500;
    if (totalFailures > 0) {
      const pct500 = Math.round((s.http500 / totalFailures) * 100);
      lines.push(`  ${pct500}% of failures caused by provider HTTP 500`);
      lines.push(`  ${100 - pct500}% caused by timeout / network / adblocker`);
    } else {
      lines.push('  No failures recorded.');
    }

    lines.push('');
    lines.push('── Script Registry ───────────────────────────────────');
    const timings = Object.values(s.scriptTimings) as AdScriptTiming[];
    if (timings.length === 0) {
      lines.push('  No scripts loaded yet.');
    } else {
      timings.forEach(t => {
        const status = t.failed ? `FAILED (HTTP ${t.statusCode ?? 'err'})` : `OK ${t.durationMs}ms`;
        const shortUrl = t.url.replace('https://', '').substring(0, 55);
        lines.push(`  ${status.padEnd(20)} ${shortUrl}`);
      });
    }

    lines.push('');
    lines.push('── Remaining Bottlenecks (Outside App Control) ───────');
    lines.push('  • Ad provider HTTP 500 responses — cannot be prevented');
    lines.push('  • Provider render latency — depends on demand/fill rate');
    lines.push('  • Adblocker DNS blocks — no mitigation possible');
    lines.push('  • User network speed — no mitigation possible');
    lines.push('');
    lines.push('── Optimizations Applied ─────────────────────────────');
    lines.push('  ✓ 2-concurrent normal slot queue (was: serial)');
    lines.push('  ✓ HTTP 500 HEAD probe — skip 8s timeout on known failures');
    lines.push('  ✓ IntersectionObserver lazy load (500px rootMargin)');
    lines.push('  ✓ requestIdleCallback for low-priority slots');
    lines.push('  ✓ Script deduplication — invoke.js loaded once globally');
    lines.push('  ✓ preconnect + dns-prefetch for ad network origins');
    lines.push('  ✓ MutationObserver fill detection (no polling)');
    lines.push('  ✓ Skeleton placeholders — zero layout shift');
    lines.push('  ✓ App Router route reset — no stale script re-injection');
    lines.push('══════════════════════════════════════════════════════');

    const report = lines.join('\n');
    console.log(report);
    return report;
  }
}

// Singleton — persists across App Router navigations
export const adMetrics = new AdMetrics();
