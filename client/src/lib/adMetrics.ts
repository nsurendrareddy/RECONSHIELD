/**
 * AdMetrics — Lightweight ad performance analytics singleton.
 *
 * Tracks:
 *   - Script load time per URL
 *   - Banner render time (script loaded → iframe injected)
 *   - Time to first visible ad (from page navigation)
 *   - Fill rate (filled / total attempted)
 *   - Timeout rate (timed-out / total attempted)
 *
 * Exposed on window.__adMetrics for DevTools inspection.
 * Tree-shakes cleanly in production (no runtime overhead when unused).
 */

export interface AdScriptTiming {
  url: string;
  startAt: number;
  loadedAt: number | null;
  durationMs: number | null;
  failed: boolean;
}

export interface AdSlotMetric {
  slotType: string;
  scriptUrl: string;
  enqueuedAt: number;
  scriptLoadedAt: number | null;
  renderCompletedAt: number | null;
  scriptLoadMs: number | null;
  renderMs: number | null;
  totalMs: number | null;
  status: 'pending' | 'filled' | 'timeout' | 'failed';
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

  recordScriptFailed(url: string): void {
    const entry = this.scriptTimings.get(url);
    if (!entry) return;
    entry.failed = true;
    entry.loadedAt = Date.now();
    entry.durationMs = entry.loadedAt - entry.startAt;
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
      scriptLoadMs: null,
      renderMs: null,
      totalMs: null,
      status: 'pending',
    });
    return idx;
  }

  recordSlotScriptLoaded(idx: number): void {
    const slot = this.slots[idx];
    if (!slot) return;
    slot.scriptLoadedAt = Date.now();
    slot.scriptLoadMs = slot.scriptLoadedAt - slot.enqueuedAt;
  }

  recordSlotFilled(idx: number): void {
    const slot = this.slots[idx];
    if (!slot) return;
    const now = Date.now();
    slot.renderCompletedAt = now;
    slot.status = 'filled';
    slot.totalMs = now - slot.enqueuedAt;
    if (slot.scriptLoadedAt) {
      slot.renderMs = now - slot.scriptLoadedAt;
    }
    // Record time to first ad (from last page navigation)
    if (this.firstAdFilledAt === null) {
      this.firstAdFilledAt = now;
      if (process.env.NODE_ENV === 'development') {
        console.log(`[AdMetrics] ⚡ Time to first ad: ${now - this.pageNavigationAt}ms`);
      }
    }
    if (process.env.NODE_ENV === 'development') {
      console.log(`[AdMetrics] Slot filled (${slot.slotType}): total=${slot.totalMs}ms, scriptLoad=${slot.scriptLoadMs}ms, render=${slot.renderMs}ms`);
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

  // ------------------------------------------------------------------
  // Navigation reset
  // ------------------------------------------------------------------

  onNavigation(): void {
    this.pageNavigationAt = Date.now();
    this.firstAdFilledAt = null;
    // Keep script timings — scripts survive navigation in SPA
    // Reset slot list
    this.slots = [];
  }

  // ------------------------------------------------------------------
  // Summary
  // ------------------------------------------------------------------

  getSummary() {
    const total = this.slots.length;
    const filled = this.slots.filter(s => s.status === 'filled').length;
    const timedOut = this.slots.filter(s => s.status === 'timeout').length;
    const failed = this.slots.filter(s => s.status === 'failed').length;
    const avgTotal = total
      ? Math.round(this.slots.reduce((acc, s) => acc + (s.totalMs ?? 0), 0) / total)
      : null;

    return {
      total,
      filled,
      timedOut,
      failed,
      fillRate: total ? `${Math.round((filled / total) * 100)}%` : 'n/a',
      timeoutRate: total ? `${Math.round((timedOut / total) * 100)}%` : 'n/a',
      timeToFirstAdMs: this.firstAdFilledAt ? this.firstAdFilledAt - this.pageNavigationAt : null,
      avgSlotTotalMs: avgTotal,
      scriptTimings: Object.fromEntries(this.scriptTimings),
      slots: this.slots,
    };
  }
}

// Singleton — persists across App Router navigations
export const adMetrics = new AdMetrics();
