'use client';

import { useEffect, useRef, useState, memo } from 'react';
import { usePathname } from 'next/navigation';
import { adQueue, AdPriority } from '@/lib/adQueue';
import { adScriptLoader } from './AdScriptLoader';
import { adMetrics } from '@/lib/adMetrics';

type AdsterraNativeProps = {
  className?: string;
  priority?: AdPriority;
};

const INVOKE_URL = 'https://pl29692252.effectivecpmnetwork.com/6546c038dbbf040d39d1b8179e7743ca/invoke.js';
const AD_TIMEOUT_MS = 8000;

// Ensure skeleton styles exist (shared with AdsterraBanner)
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

function AdsterraNativeInner({ className = '', priority = 'normal' }: AdsterraNativeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [adState, setAdState] = useState<'idle' | 'loading' | 'filled' | 'failed'>('idle');
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const prevPath = useRef(pathname);

  useEffect(() => {
    ensureSkeletonStyles();
    setMounted(true);
  }, []);

  useEffect(() => {
    if (prevPath.current !== pathname) {
      prevPath.current = pathname;
      if (containerRef.current) containerRef.current.innerHTML = '';
      setAdState('idle');
    }
  }, [pathname]);

  useEffect(() => {
    return () => {
      if (containerRef.current) containerRef.current.innerHTML = '';
    };
  }, []);

  // IntersectionObserver — critical/high fire immediately
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

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current || adState !== 'loading') return;

    let observer: MutationObserver | null = null;
    let timeoutTimer: ReturnType<typeof window.setTimeout> | null = null;
    let active = true;

    const loadAd = () => new Promise<void>((resolve) => {
      if (!containerRef.current) { resolve(); return; }

      const metricIdx = adMetrics.openSlot('native', INVOKE_URL);

      // Unique container ID per instance
      const uniqueSuffix = Math.random().toString(36).substring(2, 9);
      const instanceId = `container-native-${uniqueSuffix}`;

      const adContainer = document.createElement('div');
      adContainer.id = instanceId;
      containerRef.current.innerHTML = '';
      containerRef.current.appendChild(adContainer);

      const finishLoading = (status: 'filled' | 'failed') => {
        if (!active) { resolve(); return; }
        if (observer) { observer.disconnect(); observer = null; }
        if (timeoutTimer) { window.clearTimeout(timeoutTimer); timeoutTimer = null; }

        if (status === 'filled') {
          adMetrics.recordSlotFilled(metricIdx);
          // Rename container ID so next native slot can safely use a fresh ID
          const rand = Math.random().toString(36).substring(2, 9);
          adContainer.id = `filled-native-${rand}`;
        } else {
          adMetrics.recordSlotTimeout(metricIdx);
          if (containerRef.current) containerRef.current.innerHTML = '';
        }

        if (process.env.NODE_ENV === 'development') {
          console.log(`[Adsterra] Native Banner — ${status.toUpperCase()}`);
        }
        setAdState(status);
        resolve();
      };

      observer = new MutationObserver((mutations) => {
        if (!containerRef.current) return;
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

      observer.observe(adContainer, { childList: true, subtree: true });
      timeoutTimer = window.setTimeout(() => finishLoading('failed'), AD_TIMEOUT_MS);

      // Deduplicated load
      adScriptLoader.load(INVOKE_URL, { 'data-cfasync': 'false' })
        .then(() => {
          adMetrics.recordSlotScriptLoaded(metricIdx);
          if (!active || !containerRef.current) { resolve(); return; }
          const triggerScript = document.createElement('script');
          triggerScript.async = true;
          triggerScript.setAttribute('data-cfasync', 'false');
          triggerScript.src = INVOKE_URL;
          triggerScript.onerror = () => finishLoading('failed');
          containerRef.current.appendChild(triggerScript);
        })
        .catch(() => finishLoading('failed'));
    });

    adQueue.enqueue(loadAd, priority);

    return () => {
      active = false;
      if (observer) observer.disconnect();
      if (timeoutTimer) window.clearTimeout(timeoutTimer);
    };
  }, [adState, priority]);

  if (!mounted) {
    return <div style={{ height: '250px', minHeight: '250px' }} className="mx-auto w-full" aria-hidden="true" />;
  }

  if (adState === 'failed') return null;

  const sizeStyles =
    adState === 'filled'
      ? { opacity: 1, minHeight: 250, height: 'auto', transition: 'opacity 400ms ease' }
      : adState === 'loading'
      ? { opacity: 1, minHeight: 250 }
      : { height: 0, margin: 0, padding: 0, opacity: 0, overflow: 'hidden' as const };

  return (
    <div
      className={`not-prose w-full ${adState === 'filled' ? className : ''}`}
      style={sizeStyles}
    >
      {adState === 'loading' && (
        <div className="ad-skeleton w-full" style={{ height: 250 }} aria-hidden="true" />
      )}
      <div ref={containerRef} className="w-full relative overflow-hidden" />
    </div>
  );
}

const AdsterraNative = memo(AdsterraNativeInner);
export default AdsterraNative;
