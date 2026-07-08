'use client';

import { adMetrics } from './adMetrics';

export type AdPriority = 'critical' | 'high' | 'normal' | 'low';
export type AdStatus = 'idle' | 'loading' | 'filled' | 'failed';

export interface AdConfig {
  id: string;
  type: string;
  container: HTMLDivElement;
  priority: AdPriority;
  invokeUrl: string;
  atOptions?: Record<string, any>;
  onStatusChange: (status: AdStatus) => void;
}

const AD_TIMEOUT_MS = 8000;

class AdManagerSingleton {
  private queue: AdConfig[] = [];
  private isProcessing = false;
  private activeZones = new Set<string>();
  private scriptPromises = new Map<string, Promise<void>>();
  private observer: IntersectionObserver | null = null;
  private registeredZones = new Map<Element, AdConfig>();
  private hasHydrated = false;

  constructor() {
    if (typeof window === 'undefined') return;
    
    // Centralized Intersection Observer
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const config = this.registeredZones.get(entry.target);
            if (config) {
              this.observer?.unobserve(entry.target);
              this.enqueueBanner(config);
            }
          }
        }
      },
      { rootMargin: '500px', threshold: 0.01 }
    );

    // Fast path: start queue on interaction or immediately after script evaluation
    const onHydrate = () => {
      if (this.hasHydrated) return;
      this.hasHydrated = true;
      this.processQueue();
    };

    setTimeout(onHydrate, 0);
    window.addEventListener('mousemove', onHydrate, { passive: true, once: true });
    window.addEventListener('scroll', onHydrate, { passive: true, once: true });
    window.addEventListener('touchstart', onHydrate, { passive: true, once: true });
  }

  /**
   * Preload the invoke script using a <link rel="preload"> tag.
   * This guarantees the browser fetches the script payload exactly once over the network.
   */
  private preloadScript(url: string): Promise<void> {
    if (this.scriptPromises.has(url)) return this.scriptPromises.get(url)!;

    const promise = new Promise<void>((resolve, reject) => {
      adMetrics.recordScriptStart(url);

      // Check if it's already in the DOM natively
      if (document.querySelector(`link[href="${url}"]`) || document.querySelector(`script[src="${url}"]`)) {
        adMetrics.recordScriptLoaded(url);
        resolve();
        return;
      }

      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'script';
      link.href = url;
      
      link.onload = () => {
        adMetrics.recordScriptLoaded(url);
        resolve();
      };
      link.onerror = (err) => {
        adMetrics.recordScriptFailed(url);
        reject(err);
      };

      document.head.appendChild(link);
    });

    this.scriptPromises.set(url, promise);
    return promise;
  }

  public registerZone(config: AdConfig): void {
    if (typeof window === 'undefined') return;

    if (this.activeZones.has(config.id)) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`[AdManager] Duplicate zone detected and ignored: ${config.id}`);
      }
      return;
    }

    this.activeZones.add(config.id);

    // Start fetching the script immediately in the background
    this.preloadScript(config.invokeUrl).catch(() => {});

    if (config.priority === 'critical' || config.priority === 'high') {
      // Bypass observer and queue immediately
      this.enqueueBanner(config);
    } else {
      this.registeredZones.set(config.container, config);
      this.observer?.observe(config.container);
    }
  }

  public unregisterZone(id: string, container: HTMLDivElement | null): void {
    if (typeof window === 'undefined') return;
    
    this.activeZones.delete(id);
    if (container) {
      this.registeredZones.delete(container);
      this.observer?.unobserve(container);
    }
    
    // Remove from queue if it hasn't processed yet
    this.queue = this.queue.filter(c => c.id !== id);
  }

  private enqueueBanner(config: AdConfig): void {
    config.onStatusChange('loading');
    
    // Push and sort queue: critical/high > normal > low
    this.queue.push(config);
    
    const priorityWeight = { 'critical': 3, 'high': 2, 'normal': 1, 'low': 0 };
    this.queue.sort((a, b) => priorityWeight[b.priority] - priorityWeight[a.priority]);
    
    this.processQueue();
  }

  private async processQueue() {
    if (!this.hasHydrated || this.isProcessing || this.queue.length === 0) return;
    
    this.isProcessing = true;
    const config = this.queue.shift();
    if (!config) {
      this.isProcessing = false;
      return;
    }

    // Verify it wasn't unregistered before its turn
    if (!this.activeZones.has(config.id)) {
      this.isProcessing = false;
      this.processQueue();
      return;
    }

    try {
      if (config.priority === 'low' && 'requestIdleCallback' in window) {
        await new Promise<void>(resolve => {
          (window as any).requestIdleCallback(() => resolve(), { timeout: 2000 });
        });
      }

      await this.renderBanner(config);
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.error(`[AdManager] Failed to render ${config.id}`, err);
      }
      config.onStatusChange('failed');
    } finally {
      this.isProcessing = false;
      this.processQueue(); // process next in queue
    }
  }

  private renderBanner(config: AdConfig): Promise<void> {
    return new Promise(async (resolve, reject) => {
      // 1. Wait for script payload to preload
      try {
        await this.preloadScript(config.invokeUrl);
      } catch (err) {
        return reject(err);
      }

      // Check if container was destroyed while waiting
      if (!this.activeZones.has(config.id) || !document.body.contains(config.container)) {
        return resolve(); 
      }

      const metricIdx = adMetrics.openSlot(config.type, config.invokeUrl);

      // 2. Set global window.atOptions
      if (config.atOptions) {
        (window as any).atOptions = config.atOptions;
      }

      let observer: MutationObserver | null = null;
      let timeoutTimer: ReturnType<typeof window.setTimeout> | null = null;
      let active = true;

      const finishLoading = (status: 'filled' | 'failed') => {
        if (!active) return;
        active = false;
        
        if (observer) observer.disconnect();
        if (timeoutTimer) window.clearTimeout(timeoutTimer);
        
        if (status === 'filled') {
          adMetrics.recordSlotFilled(metricIdx);
        } else {
          adMetrics.recordSlotTimeout(metricIdx);
          if (config.container) config.container.innerHTML = '';
        }
        
        config.onStatusChange(status);
        
        // Resolve the promise to unlock the queue for the next ad
        resolve();
      };

      // 3. Watch for iframe injection
      observer = new MutationObserver((mutations) => {
        for (const m of mutations) {
          for (const node of Array.from(m.addedNodes)) {
            if (
              node.nodeName === 'IFRAME' ||
              (node instanceof HTMLElement && node.classList.length > 0 && node.tagName !== 'SCRIPT')
            ) {
              finishLoading('filled');
              return;
            }
          }
        }
      });
      observer.observe(config.container, { childList: true, subtree: true });

      timeoutTimer = window.setTimeout(() => finishLoading('failed'), AD_TIMEOUT_MS);

      // 4. Inject the script physically into the container to execute it
      const triggerScript = document.createElement('script');
      triggerScript.type = 'text/javascript';
      triggerScript.src = config.invokeUrl;
      triggerScript.async = true;
      if (config.type === 'native') {
        triggerScript.setAttribute('data-cfasync', 'false');
      }
      triggerScript.onerror = () => finishLoading('failed');
      
      config.container.innerHTML = '';
      if (config.type !== 'native') {
        const inlineScript = document.createElement('script');
        inlineScript.type = 'text/javascript';
        inlineScript.text = `window.atOptions = ${JSON.stringify(config.atOptions)};`;
        config.container.appendChild(inlineScript);
      }
      config.container.appendChild(triggerScript);
    });
  }
}

export const AdManager = new AdManagerSingleton();
