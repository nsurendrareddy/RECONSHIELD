/**
 * AdMetrics — Fully instrumented ad performance analytics singleton.
 */

export interface AdScriptTiming {
  url: string;
  startAt: number;
  loadedAt: number | null;
  durationMs: number | null;
  failed: boolean;
  statusCode?: number;
}

export interface AdSlotMetric {
  slotType: string;
  scriptUrl: string;
  enqueuedAt: number;
  scriptLoadedAt: number | null;
  renderCompletedAt: number | null;
  appDelayMs: number | null;
  providerDelayMs: number | null;
  totalMs: number | null;
  status: 'pending' | 'filled' | 'timeout' | 'failed' | 'http500';
  providerStatusCode?: number;
}

export interface EnhancedSlotTelemetry {
  id: string;
  type: string; // '728x90' | '300x250' | 'native' | 'social-bar'
  placement: string; // 'Header' | 'Sidebar' | 'Inline' | 'Footer' | 'Floating'
  pageUrl: string;
  registeredAt: number;
  intersectionAt: number | null;
  scriptRequestedAt: number | null;
  scriptLoadedAt: number | null;
  iframeCreatedAt: number | null;
  nativeDomInjectedAt: number | null;
  adLoadedAt: number | null;
  adVisibleAt: number | null;
  dimensions: string;
  viewportVisibility: 'visible' | 'hidden';
  cleanedUpAt: number | null;
  navigationCount: number;
  status: 'registered' | 'intersected' | 'requested' | 'loaded' | 'iframe_created' | 'native_injected' | 'filled' | 'failed' | 'cleaned_up';
  container?: HTMLElement;
}

class AdMetrics {
  private scriptTimings = new Map<string, AdScriptTiming>();
  private slots: AdSlotMetric[] = [];
  private pageNavigationAt: number = Date.now();
  private firstAdFilledAt: number | null = null;

  // New Telemetry State
  public telemetrySlots: EnhancedSlotTelemetry[] = [];
  public navigationCount = 0;
  public registeredSlotsCount = 0;
  public scriptRequestedCount = 0;
  public scriptLoadedCount = 0;
  public iframeCreatedCount = 0;
  public renderedAdsCount = 0;
  public visibleAdsCount = 0;
  public failedLoadsCount = 0;
  public blockedRequestsCount = 0;
  public cspViolationsCount = 0;
  public adBlockFailuresCount = 0;

  constructor() {
    if (typeof window !== 'undefined') {
      (window as any).__adMetrics = this;
      this.initInstrumentation();
    }
  }

  private initInstrumentation() {
    // 1. Monkeypatch IntersectionObserver globally to detect when slot container intersects
    const OriginalIO = window.IntersectionObserver;
    const self = this;
    window.IntersectionObserver = class InstrumentedIO extends OriginalIO {
      constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
        const wrappedCallback: IntersectionObserverCallback = (entries, observer) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              self.onIntersectionFired(entry.target);
            }
          }
          return callback(entries, observer);
        };
        super(wrappedCallback, options);
      }
    };

    // 2. Monkeypatch HTMLScriptElement.prototype.src to intercept script requests
    const scriptProto = HTMLScriptElement.prototype;
    const originalScriptSrcSet = Object.getOwnPropertyDescriptor(scriptProto, 'src')?.set;
    if (originalScriptSrcSet) {
      Object.defineProperty(scriptProto, 'src', {
        set: function(val) {
          const url = String(val);
          if (url.includes('highperformanceformat.com') || url.includes('effectivecpmnetwork.com')) {
            self.onAdScriptRequested(url);
          }
          return originalScriptSrcSet.call(this, val);
        },
        configurable: true
      });
    }

    // 3. Monkeypatch HTMLLinkElement.prototype.href to intercept script preloads
    const linkProto = HTMLLinkElement.prototype;
    const originalLinkHrefSet = Object.getOwnPropertyDescriptor(linkProto, 'href')?.set;
    if (originalLinkHrefSet) {
      Object.defineProperty(linkProto, 'href', {
        set: function(val) {
          const url = String(val);
          if (url.includes('highperformanceformat.com') || url.includes('effectivecpmnetwork.com')) {
            self.onAdScriptRequested(url);
          }
          return originalLinkHrefSet.call(this, val);
        },
        configurable: true
      });
    }

    // 4. Listen to script loads and errors in the capturing phase
    window.addEventListener('load', (e) => {
      if (e.target instanceof HTMLScriptElement) {
        const src = e.target.src;
        if (src.includes('highperformanceformat.com') || src.includes('effectivecpmnetwork.com')) {
          self.onAdScriptLoaded(src);
        }
      }
    }, true);

    window.addEventListener('error', (e) => {
      if (e.target instanceof HTMLScriptElement) {
        const src = e.target.src;
        if (src.includes('highperformanceformat.com') || src.includes('effectivecpmnetwork.com')) {
          self.onAdScriptFailed(src);
        }
      }
    }, true);

    // 5. Watch for CSP violations
    window.addEventListener('securitypolicyviolation', (e) => {
      const blockedUri = e.blockedURI || '';
      if (blockedUri.includes('highperformanceformat') || blockedUri.includes('effectivecpmnetwork')) {
        self.onCspViolation(blockedUri);
      }
    });

    // 6. Set up Global MutationObserver to watch for Social Bar injection under document.body
    this.setupGlobalBodyObserver();

    // 7. Lazily wrap AdManager Singleton to capture register/unregister and render start events
    setTimeout(() => {
      import('./AdManager').then(({ AdManager }) => {
        const originalRegister = AdManager.registerZone;
        AdManager.registerZone = function(config: any) {
          self.onZoneRegistered(config);
          return originalRegister.call(this, config);
        };

        const originalUnregister = AdManager.unregisterZone;
        AdManager.unregisterZone = function(id: string, container: HTMLDivElement | null) {
          self.onZoneUnregistered(id, container);
          return originalUnregister.call(this, id, container);
        };

        const originalRender = AdManager.renderBanner;
        AdManager.renderBanner = function(config: any) {
          self.onZoneRenderStart(config.id);
          return originalRender.call(this, config);
        };
        console.log('[Telemetry] Lazy wrapping of AdManager complete.');
      }).catch(err => {
        console.error('[Telemetry] Failed to wrap AdManager:', err);
      });
    }, 100);
  }

  // ------------------------------------------------------------------
  // Telemetry Event Handlers
  // ------------------------------------------------------------------

  private detectPlacement(container: HTMLElement, id: string): string {
    if (!container) return 'Inline';
    if (id.includes('header') || container.closest('header') || container.closest('.global-header')) {
      return 'Header';
    }
    const rect = container.getBoundingClientRect();
    const scrollTop = typeof window !== 'undefined' ? (window.scrollY || document.documentElement.scrollTop) : 0;
    const absoluteTop = rect.top + scrollTop;
    if (absoluteTop < 350) {
      return 'Header';
    }
    if (container.closest('footer') || id.includes('footer')) {
      return 'Footer';
    }
    if (container.closest('aside') || container.closest('.sidebar') || id.includes('sidebar')) {
      return 'Sidebar';
    }
    return 'Inline';
  }

  private onZoneRegistered(config: any) {
    const id = config.id;
    const placement = this.detectPlacement(config.container, id);
    const pageUrl = typeof window !== 'undefined' ? window.location.pathname + window.location.search : '';

    // Deactivate previous active instance of this zone if it exists
    const prev = this.telemetrySlots.find(s => s.id === id && !s.cleanedUpAt);
    if (prev) {
      prev.cleanedUpAt = Date.now();
      prev.status = 'cleaned_up';
      this.logTransition(id, 'UNREGISTER (pre-emptive)');
      this.logTransition(id, 'CLEANUP COMPLETE');
    }

    const newSlot: EnhancedSlotTelemetry = {
      id,
      type: config.type,
      placement,
      pageUrl,
      registeredAt: Date.now(),
      intersectionAt: null,
      scriptRequestedAt: null,
      scriptLoadedAt: null,
      iframeCreatedAt: null,
      nativeDomInjectedAt: null,
      adLoadedAt: null,
      adVisibleAt: null,
      dimensions: '0x0',
      viewportVisibility: 'hidden',
      cleanedUpAt: null,
      navigationCount: this.navigationCount,
      status: 'registered',
      container: config.container
    };

    this.telemetrySlots.push(newSlot);
    this.registeredSlotsCount++;
    this.logTransition(id, `REGISTER zone=${placement.toLowerCase()}`);

    // Set up MutationObserver to watch for iframe/element creation in this container
    if (config.container) {
      const mutationObs = new MutationObserver((mutations) => {
        for (const m of mutations) {
          for (const node of Array.from(m.addedNodes)) {
            if (node.nodeName === 'IFRAME') {
              newSlot.iframeCreatedAt = Date.now();
              this.iframeCreatedCount++;
              this.logTransition(id, 'IFRAME CREATED');
            } else if (
              node instanceof HTMLElement &&
              node.tagName !== 'SCRIPT' &&
              node.tagName !== 'STYLE' &&
              !node.classList.contains('ad-skeleton')
            ) {
              newSlot.nativeDomInjectedAt = Date.now();
              this.logTransition(id, 'NATIVE DOM INJECTED');
            }
          }
        }
        this.printSummaryTable();
      });
      mutationObs.observe(config.container, { childList: true, subtree: true });
      (config.container as any).__mutationObs = mutationObs;

      // Set up visibility IntersectionObserver (0px rootMargin, threshold 0.01)
      const visibilityObs = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            newSlot.viewportVisibility = 'visible';
            const rect = entry.boundingClientRect;
            newSlot.dimensions = `${Math.round(rect.width)}x${Math.round(rect.height)}`;
            if (!newSlot.adVisibleAt) {
              newSlot.adVisibleAt = Date.now();
              this.visibleAdsCount++;
              this.logTransition(id, 'VISIBLE');
            }
          } else {
            newSlot.viewportVisibility = 'hidden';
          }
        }
        this.printSummaryTable();
      }, { rootMargin: '0px', threshold: 0.01 });
      visibilityObs.observe(config.container);
      (config.container as any).__visibilityObs = visibilityObs;
    }

    this.printSummaryTable();
  }

  private onZoneUnregistered(id: string, container: HTMLDivElement | null) {
    const slot = this.telemetrySlots.find(s => s.id === id && !s.cleanedUpAt);
    if (slot) {
      slot.cleanedUpAt = Date.now();
      slot.status = 'cleaned_up';
      this.logTransition(id, 'UNREGISTER');
      this.logTransition(id, 'CLEANUP COMPLETE');

      if (container) {
        const anyC = container as any;
        if (anyC.__mutationObs) {
          anyC.__mutationObs.disconnect();
          delete anyC.__mutationObs;
        }
        if (anyC.__visibilityObs) {
          anyC.__visibilityObs.disconnect();
          delete anyC.__visibilityObs;
        }
      }
      this.printSummaryTable();
    }
  }

  private onZoneRenderStart(id: string) {
    const slot = this.telemetrySlots.find(s => s.id === id && !s.cleanedUpAt);
    if (slot && !slot.scriptRequestedAt) {
      slot.scriptRequestedAt = Date.now();
      slot.status = 'requested';
      this.logTransition(id, 'REQUEST invoke.js');
      this.printSummaryTable();
    }
  }

  private onIntersectionFired(target: Element) {
    const slot = this.telemetrySlots.find(s => s.container === target && !s.intersectionAt && !s.cleanedUpAt);
    if (slot) {
      slot.intersectionAt = Date.now();
      slot.status = 'intersected';
      this.logTransition(slot.id, 'INTERSECTION');
      this.printSummaryTable();
    }
  }

  private onAdScriptRequested(url: string) {
    if (url.includes('pl29692251') || url.includes('06eafc4004351bf68b0c5aa80b3255c9')) {
      this.ensureSocialBarRegistered();
      return;
    }

    this.scriptRequestedCount++;

    const slot = this.telemetrySlots.find(s =>
      !s.scriptRequestedAt &&
      !s.cleanedUpAt &&
      (url.includes(s.type) ||
        (s.type === '728x90' && url.includes('ad055ae12ee78ddc0ebf1be2e3a5830f')) ||
        (s.type === '300x250' && url.includes('bff74f8eee55b4a3775d46c9295efe9a')) ||
        (s.type === 'native' && url.includes('6546c038dbbf040d39d1b8179e7743ca'))
      )
    );

    if (slot) {
      slot.scriptRequestedAt = Date.now();
      slot.status = 'requested';
      this.logTransition(slot.id, 'REQUEST invoke.js');
      this.printSummaryTable();
    }
  }

  private onAdScriptLoaded(url: string) {
    this.scriptLoadedCount++;

    const slot = this.telemetrySlots.find(s =>
      s.scriptRequestedAt &&
      !s.scriptLoadedAt &&
      !s.cleanedUpAt &&
      (url.includes(s.type) ||
        (s.type === '728x90' && url.includes('ad055ae12ee78ddc0ebf1be2e3a5830f')) ||
        (s.type === '300x250' && url.includes('bff74f8eee55b4a3775d46c9295efe9a')) ||
        (s.type === 'native' && url.includes('6546c038dbbf040d39d1b8179e7743ca')) ||
        (s.type === 'social-bar' && (url.includes('pl29692251') || url.includes('06eafc4004351bf68b0c5aa80b3255c9')))
      )
    );

    if (slot) {
      slot.scriptLoadedAt = Date.now();
      slot.status = 'loaded';
      this.logTransition(slot.id, 'invoke.js LOADED');
      this.printSummaryTable();
    }
  }

  private onAdScriptFailed(url: string) {
    this.failedLoadsCount++;
    this.blockedRequestsCount++;
    this.adBlockFailuresCount++;

    const slot = this.telemetrySlots.find(s =>
      s.scriptRequestedAt &&
      !s.scriptLoadedAt &&
      !s.cleanedUpAt &&
      (url.includes(s.type) ||
        (s.type === '728x90' && url.includes('ad055ae12ee78ddc0ebf1be2e3a5830f')) ||
        (s.type === '300x250' && url.includes('bff74f8eee55b4a3775d46c9295efe9a')) ||
        (s.type === 'native' && url.includes('6546c038dbbf040d39d1b8179e7743ca')) ||
        (s.type === 'social-bar' && (url.includes('pl29692251') || url.includes('06eafc4004351bf68b0c5aa80b3255c9')))
      )
    );

    if (slot) {
      slot.status = 'failed';
      this.logTransition(slot.id, 'invoke.js FAILED (possibly blocked by AdBlock)');
      this.printSummaryTable();
    }
  }

  private onCspViolation(blockedUri: string) {
    this.cspViolationsCount++;
    console.warn(`[Telemetry] CSP Violation detected: ${blockedUri}`);
  }

  private ensureSocialBarRegistered() {
    const id = 'social-bar';
    if (this.telemetrySlots.some(s => s.id === id && !s.cleanedUpAt)) return;

    const newSlot: EnhancedSlotTelemetry = {
      id,
      type: 'social-bar',
      placement: 'Floating',
      pageUrl: typeof window !== 'undefined' ? window.location.pathname + window.location.search : '',
      registeredAt: Date.now(),
      intersectionAt: Date.now(),
      scriptRequestedAt: Date.now(),
      scriptLoadedAt: null,
      iframeCreatedAt: null,
      nativeDomInjectedAt: null,
      adLoadedAt: null,
      adVisibleAt: null,
      dimensions: 'N/A',
      viewportVisibility: 'hidden',
      cleanedUpAt: null,
      navigationCount: this.navigationCount,
      status: 'requested'
    };

    this.telemetrySlots.push(newSlot);
    this.registeredSlotsCount++;
    this.scriptRequestedCount++;

    this.logTransition(id, 'REGISTER zone=floating (social-bar)');
    this.logTransition(id, 'INTERSECTION (auto)');
    this.logTransition(id, 'REQUEST invoke.js');
    this.printSummaryTable();
  }

  private setupGlobalBodyObserver() {
    if (typeof window === 'undefined') return;
    const self = this;
    const bodyObserver = new MutationObserver((mutations) => {
      for (const m of mutations) {
        for (const node of Array.from(m.addedNodes)) {
          if (node instanceof HTMLElement) {
            const matchesSocial =
              node.nodeName === 'IFRAME' && (
                (node as HTMLIFrameElement).src.includes('effectivecpmnetwork.com') ||
                node.id.startsWith('asb-') ||
                (node as HTMLIFrameElement).src.includes('adsterra')
              );
            const matchesSocialDiv =
              node.nodeName === 'DIV' && (
                node.id.startsWith('adsterra') ||
                node.className.includes('social-bar')
              );

            if (matchesSocial || matchesSocialDiv) {
              const slot = self.telemetrySlots.find(s => s.id === 'social-bar' && !s.cleanedUpAt);
              if (slot) {
                if (matchesSocial && !slot.iframeCreatedAt) {
                  slot.iframeCreatedAt = Date.now();
                  self.iframeCreatedCount++;
                  self.logTransition('social-bar', 'IFRAME CREATED');
                } else if (matchesSocialDiv && !slot.nativeDomInjectedAt) {
                  slot.nativeDomInjectedAt = Date.now();
                  self.logTransition('social-bar', 'NATIVE DOM INJECTED');
                }

                if (!slot.adLoadedAt) {
                  slot.adLoadedAt = Date.now();
                  slot.status = 'filled';
                  self.renderedAdsCount++;
                  self.logTransition('social-bar', 'AD FILLED');
                }

                if (!slot.adVisibleAt) {
                  slot.adVisibleAt = Date.now();
                  slot.viewportVisibility = 'visible';
                  self.visibleAdsCount++;
                  self.logTransition('social-bar', 'VISIBLE');
                }

                self.printSummaryTable();
              }
            }
          }
        }
      }
    });
    bodyObserver.observe(document.body, { childList: true, subtree: true });
  }

  private logTransition(slotId: string, step: string) {
    console.log(`[AdManager] [${slotId}] -> ${step}`);
  }

  private printSummaryTable() {
    if (typeof window === 'undefined') return;

    let table = '\n=== Ad Telemetry Summary Table ===\n';
    table += '| Slot | Registered | Request Sent | Request Success | Ad Rendered | Visible | Cleaned Up |\n';
    table += '| --- | --- | --- | --- | --- | --- | --- |\n';

    this.telemetrySlots.forEach(s => {
      const reg = s.registeredAt ? 'Yes' : 'No';
      const req = s.scriptRequestedAt ? 'Yes' : 'No';
      const succ = s.scriptLoadedAt ? 'Yes' : 'No';
      const rend = s.adLoadedAt ? 'Yes' : 'No';
      const vis = s.adVisibleAt ? 'Yes' : 'No';
      const clean = s.cleanedUpAt ? 'Yes' : 'No';

      table += `| ${s.id} (${s.placement}) | ${reg} | ${req} | ${succ} | ${rend} | ${vis} (${s.viewportVisibility} - ${s.dimensions}) | ${clean} |\n`;
    });

    table += '=================================\n';
    console.log(table);

    console.log(
      `[Telemetry Totals] ` +
      `Registered: ${this.registeredSlotsCount} | ` +
      `Requested: ${this.scriptRequestedCount} | ` +
      `Loaded: ${this.scriptLoadedCount} | ` +
      `Iframes: ${this.iframeCreatedCount} | ` +
      `Rendered: ${this.renderedAdsCount} | ` +
      `Visible: ${this.visibleAdsCount} | ` +
      `Failed: ${this.failedLoadsCount} | ` +
      `Blocked: ${this.blockedRequestsCount} | ` +
      `CSP Violations: ${this.cspViolationsCount}`
    );
  }

  // ------------------------------------------------------------------
  // Legacy compatibility methods (called by AdManager)
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
      slot.providerDelayMs = now - slot.scriptLoadedAt;
    }
    if (slot.appDelayMs === null && slot.scriptLoadedAt) {
      slot.appDelayMs = slot.scriptLoadedAt - slot.enqueuedAt;
    }

    if (this.firstAdFilledAt === null) {
      this.firstAdFilledAt = now;
    }

    // Telemetry Sync
    const telSlot = this.telemetrySlots.find(s =>
      !s.adLoadedAt &&
      !s.cleanedUpAt &&
      s.type === slot.slotType
    );
    if (telSlot) {
      telSlot.adLoadedAt = now;
      telSlot.status = 'filled';
      this.renderedAdsCount++;
      this.logTransition(telSlot.id, 'AD FILLED');
      this.printSummaryTable();
    }
  }

  recordSlotTimeout(idx: number): void {
    const slot = this.slots[idx];
    if (!slot) return;
    slot.status = 'timeout';
    slot.totalMs = Date.now() - slot.enqueuedAt;

    // Telemetry Sync
    const telSlot = this.telemetrySlots.find(s =>
      !s.adLoadedAt &&
      !s.cleanedUpAt &&
      s.type === slot.slotType
    );
    if (telSlot) {
      telSlot.status = 'failed';
      this.failedLoadsCount++;
      this.logTransition(telSlot.id, 'TIMEOUT (failed to load)');
      this.printSummaryTable();
    }
  }

  recordSlotFailed(idx: number): void {
    const slot = this.slots[idx];
    if (!slot) return;
    slot.status = 'failed';
    slot.totalMs = Date.now() - slot.enqueuedAt;
  }

  recordSlotHttp500(idx: number, statusCode: number = 500): void {
    const slot = this.slots[idx];
    if (!slot) return;
    slot.status = 'http500';
    slot.providerStatusCode = statusCode;
    slot.totalMs = Date.now() - slot.enqueuedAt;
  }

  onNavigation(): void {
    this.pageNavigationAt = Date.now();
    this.firstAdFilledAt = null;
    this.slots = [];

    this.navigationCount++;
    console.log(`[Telemetry] Navigation occurred. Count: ${this.navigationCount}`);
  }

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
      avgAppDelayMs,
      avgProviderDelayMs,
      avgTotalMs,
      scriptTimings: Object.fromEntries(this.scriptTimings),
      slots: this.slots,
    };
  }

  getReport(): string {
    const s = this.getSummary();
    const lines = [
      '╔══════════════════════════════════════════════════════╗',
      '║       ReconShield — Ad Performance Report            ║',
      '╚══════════════════════════════════════════════════════╝',
      `  Total slots attempted : ${s.total}`,
      `  Filled                : ${s.filled}  (fill rate: ${s.fillRate})`,
      `  Timed out             : ${s.timedOut}  (timeout rate: ${s.timeoutRate})`,
      `  Hard failed           : ${s.failed}`,
      `  HTTP 500 (provider)   : ${s.http500}`,
      '══════════════════════════════════════════════════════'
    ];
    return lines.join('\n');
  }
}

export const adMetrics = new AdMetrics();
