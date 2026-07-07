'use client';

import { useEffect, useRef, useState, memo } from 'react';
import { usePathname } from 'next/navigation';
import { adQueue, AdPriority } from '@/lib/adQueue';
import { adScriptLoader, AdProviderHttpError } from './AdScriptLoader';
import { adMetrics } from '@/lib/adMetrics';


type AdsterraBannerProps = {
  type: '728x90' | '300x250';
  className?: string;
  priority?: AdPriority;
};

const BANNER_CONFIGS = {
  '728x90': { key: 'ad055ae12ee78ddc0ebf1be2e3a5830f', width: 728, height: 90 },
  '300x250': { key: 'bff74f8eee55b4a3775d46c9295efe9a', width: 300, height: 250 }
};

const INVOKE_BASE = 'https://www.highperformanceformat.com';
const AD_TIMEOUT_MS = 8000;

// Ensure skeleton styles exist
const SKELETON_STYLE_ID = 'ad-skeleton-style';
function ensureSkeletonStyles() {
  if (typeof document === 'undefined' || document.getElementById(SKELETON_STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = SKELETON_STYLE_ID;
  style.textContent = `
    @keyframes adSkeletonShimmer {
      0%   { background-position: -400px 0; }
      100% { background-position: 400px 0; }
    }
    .ad-skeleton {
      background: linear-gradient(90deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.07) 40%, rgba(255,255,255,0.03) 80%);
      background-size: 800px 100%;
      animation: adSkeletonShimmer 1.6s ease-in-out infinite;
      border-radius: 8px;
    }
  `;
  document.head.appendChild(style);
}

function AdsterraBannerInner({ type, className = '', priority = 'normal' }: AdsterraBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [adState, setAdState] = useState<'idle' | 'loading' | 'filled' | 'failed'>('idle');
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const prevPath = useRef(pathname);
  const prevType = useRef(type);

  useEffect(() => {
    ensureSkeletonStyles();
    setMounted(true);
  }, []);

  // Reset on route / type change
  useEffect(() => {
    let changed = false;
    if (prevPath.current !== pathname) { prevPath.current = pathname; changed = true; }
    if (prevType.current !== type) { prevType.current = type; changed = true; }
    if (changed && containerRef.current) {
      containerRef.current.innerHTML = '';
      setAdState('idle');
    }
  }, [pathname, type]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (containerRef.current) containerRef.current.innerHTML = '';
      try { delete (window as any).atOptions; } catch { (window as any).atOptions = undefined; }
    };
  }, []);

  // IntersectionObserver — critical/high fire immediately; others wait for 500px proximity
  useEffect(() => {
    if (!mounted || adState !== 'idle' || !containerRef.current) return;

    if (priority === 'critical' || priority === 'high') {
      setAdState('loading');
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setAdState('loading'); observer.disconnect(); } },
      { rootMargin: '500px', threshold: 0.01 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [mounted, adState, priority]);

  // Load ad when state = 'loading'
  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current || adState !== 'loading') return;

    let observer: MutationObserver | null = null;
    let timeoutTimer: ReturnType<typeof window.setTimeout> | null = null;
    let active = true;

    const loadAd = () => new Promise<void>((resolve) => {
      const config = BANNER_CONFIGS[type];
      if (!config || !containerRef.current) {
        if (active) setAdState('failed');
        resolve();
        return;
      }

      const INVOKE_URL = `${INVOKE_BASE}/${config.key}/invoke.js`;
      const metricIdx = adMetrics.openSlot(type, INVOKE_URL);

      const atOptions = { key: config.key, format: 'iframe', height: config.height, width: config.width, params: {} };
      (window as any).atOptions = atOptions;
      containerRef.current.innerHTML = '';

      const inlineScript = document.createElement('script');
      inlineScript.type = 'text/javascript';
      inlineScript.text = `window.atOptions = ${JSON.stringify(atOptions)};`;
      containerRef.current.appendChild(inlineScript);

      const finishLoading = (status: 'filled' | 'failed') => {
        if (!active) { resolve(); return; }
        if (observer) { observer.disconnect(); observer = null; }
        if (timeoutTimer) { window.clearTimeout(timeoutTimer); timeoutTimer = null; }
        if (status === 'filled') { adMetrics.recordSlotFilled(metricIdx); }
        else {
          adMetrics.recordSlotFailed(metricIdx);
          if (containerRef.current) containerRef.current.innerHTML = '';
        }
        if (process.env.NODE_ENV === 'development') {
          console.log(`[Adsterra] ${type} Banner — ${status.toUpperCase()}`);
        }
        setAdState(status);
        resolve();
      };

      observer = new MutationObserver((mutations) => {
        if (!containerRef.current) return;
        for (const m of mutations) {
          for (const node of Array.from(m.addedNodes)) {
            if (node.nodeName === 'IFRAME') { finishLoading('filled'); return; }
          }
        }
      });
      observer.observe(containerRef.current, { childList: true, subtree: true });

      timeoutTimer = window.setTimeout(() => {
        adMetrics.recordSlotTimeout(metricIdx);
        finishLoading('failed');
      }, AD_TIMEOUT_MS);

      // Deduplicated load — invoke.js only fetched once globally
      adScriptLoader.load(INVOKE_URL)
        .then(() => {
          adMetrics.recordSlotScriptLoaded(metricIdx);
          if (!active || !containerRef.current) { resolve(); return; }
          const triggerScript = document.createElement('script');
          triggerScript.type = 'text/javascript';
          triggerScript.src = INVOKE_URL;
          triggerScript.async = true;
          triggerScript.onerror = () => finishLoading('failed');
          containerRef.current.appendChild(triggerScript);
        })
        .catch((err) => {
          if (err instanceof AdProviderHttpError) {
            adMetrics.recordSlotHttp500(metricIdx, err.statusCode);
          }
          finishLoading('failed');
        });

    });

    adQueue.enqueue(loadAd, priority);

    return () => {
      active = false;
      if (observer) observer.disconnect();
      if (timeoutTimer) window.clearTimeout(timeoutTimer);
    };
  }, [type, adState, priority]);

  if (!mounted) {
    const h = type === '728x90' ? '90px' : '250px';
    const w = type === '728x90' ? '728px' : '300px';
    return <div style={{ height: h, width: w, minHeight: h }} className="mx-auto" aria-hidden="true" />;
  }

  if (adState === 'failed') return null;

  const config = BANNER_CONFIGS[type];
  const h = config.height;
  const w = type === '728x90' ? 'max-w-[728px]' : 'max-w-[300px]';

  const sizeStyles =
    adState === 'filled'
      ? { minHeight: h, opacity: 1, height: 'auto', transition: 'opacity 400ms ease' }
      : adState === 'loading'
      ? { height: h, opacity: 1 }
      : { height: 0, margin: 0, padding: 0, opacity: 0, overflow: 'hidden' as const };

  return (
    <div
      className={`not-prose flex justify-center items-center w-full ${adState === 'filled' ? className : ''}`}
      style={sizeStyles}
    >
      {adState === 'loading' && (
        <div className={`ad-skeleton w-full ${w}`} style={{ height: h }} aria-hidden="true" />
      )}
      <div
        ref={containerRef}
        className={`relative flex justify-center items-center overflow-hidden w-full ${w}`}
      />
    </div>
  );
}

const AdsterraBanner = memo(AdsterraBannerInner);
export default AdsterraBanner;
