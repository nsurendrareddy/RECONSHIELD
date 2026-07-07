'use client';

import React, { useEffect, useRef, useState, useMemo, memo } from 'react';
import { usePathname } from 'next/navigation';
import { adMetrics } from '@/lib/adMetrics';

export interface AdSlotProps {
  type: '300x250' | '728x90' | 'native';
  id?: string;
  className?: string;
  /** Priority hint — controls when this slot starts loading relative to others */
  priority?: 'critical' | 'high' | 'normal' | 'low';
  /** Timeout in ms before giving up on ad fill. Default: 8000 */
  timeout?: number;
  onLoadAd: (container: HTMLDivElement, isMobile: boolean) => Promise<boolean>;
}

// Global GA4 custom event tracking helper for ad-centric analytics
export function trackAdEvent(action: string, label: string, value?: number) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', `ad_${action}`, {
      event_category: 'AdMonetization',
      event_label: label,
      value: value,
      page_path: window.location.pathname,
      device_type: window.innerWidth < 768 ? 'mobile' : window.innerWidth < 1024 ? 'tablet' : 'desktop',
    });
  }
}

// Skeleton shimmer CSS — injected once via a style tag
const SKELETON_STYLE_ID = 'ad-skeleton-style';
function ensureSkeletonStyles() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(SKELETON_STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = SKELETON_STYLE_ID;
  style.textContent = `
    @keyframes adSkeletonShimmer {
      0%   { background-position: -400px 0; }
      100% { background-position: 400px 0; }
    }
    .ad-skeleton {
      background: linear-gradient(
        90deg,
        rgba(255,255,255,0.03) 0%,
        rgba(255,255,255,0.07) 40%,
        rgba(255,255,255,0.03) 80%
      );
      background-size: 800px 100%;
      animation: adSkeletonShimmer 1.6s ease-in-out infinite;
      border-radius: 8px;
    }
  `;
  document.head.appendChild(style);
}

function AdSlotInner({ type, id, className = '', priority = 'normal', timeout = 8000, onLoadAd }: AdSlotProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [adState, setAdState] = useState<'idle' | 'loading' | 'filled' | 'failed'>('idle');
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  const prevPath = useRef(pathname);
  const metricsIdxRef = useRef<number | null>(null);
  const timedOutRef = useRef(false);

  // Inject skeleton styles once
  useEffect(() => {
    ensureSkeletonStyles();
    setMounted(true);

    // isMobile — set once, update on resize with debounce to avoid excessive renders
    let debounceTimer: ReturnType<typeof setTimeout>;
    const checkMobile = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        setIsMobile(window.innerWidth < 768);
      }, 150);
    };
    setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(debounceTimer);
    };
  }, []);

  // Teardown + reset on client-side route change
  useEffect(() => {
    if (prevPath.current !== pathname) {
      prevPath.current = pathname;
      timedOutRef.current = false;
      setAdState('idle');
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    }
  }, [pathname]);

  // IntersectionObserver — trigger loading when within 500px of viewport
  // For critical/high priority: fire immediately without waiting for intersection
  useEffect(() => {
    if (!mounted || adState !== 'idle' || !containerRef.current) return;

    if (priority === 'critical' || priority === 'high') {
      // Don't wait for intersection — start immediately
      setAdState('loading');
      return;
    }

    const loadObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAdState('loading');
          loadObserver.disconnect();
        }
      },
      { rootMargin: '500px', threshold: 0.01 }
    );

    loadObserver.observe(containerRef.current);
    return () => loadObserver.disconnect();
  }, [mounted, adState, priority]);

  // Execute the load when state shifts to 'loading'
  useEffect(() => {
    if (adState !== 'loading' || !containerRef.current) return;

    // Open a metrics slot
    const scriptUrl =
      type === 'native'
        ? 'https://pl29692252.effectivecpmnetwork.com/6546c038dbbf040d39d1b8179e7743ca/invoke.js'
        : `https://www.highperformanceformat.com/[key]/invoke.js`;
    const metricIdx = adMetrics.openSlot(type, scriptUrl);
    metricsIdxRef.current = metricIdx;
    timedOutRef.current = false;

    let active = true;

    const runLoad = async () => {
      try {
        // Hard timeout — stop waiting after `timeout` ms (default 8s)
        const timeoutPromise = new Promise<boolean>(resolve => {
          window.setTimeout(() => {
            if (active && !timedOutRef.current) {
              timedOutRef.current = true;
              adMetrics.recordSlotTimeout(metricIdx);
              if (process.env.NODE_ENV === 'development') {
                console.warn(`[Ad System] Timeout after ${timeout}ms for slot type: ${type}`);
              }
              resolve(false);
            }
          }, timeout);
        });

        const loadPromise = onLoadAd(containerRef.current!, isMobile);
        const success = await Promise.race([loadPromise, timeoutPromise]);

        if (!active) return;

        if (success) {
          setAdState('filled');
          adMetrics.recordSlotFilled(metricIdx);
          trackAdEvent('impression', type);
          if (process.env.NODE_ENV === 'development') {
            console.log(`[Ad System] Filled: ${type}`);
          }
        } else {
          setAdState('failed');
          if (!timedOutRef.current) {
            adMetrics.recordSlotFailed(metricIdx);
          }
          if (process.env.NODE_ENV === 'development') {
            console.warn(`[Ad System] Failed/timeout: ${type}`);
          }
        }
      } catch (err) {
        if (active) {
          setAdState('failed');
          adMetrics.recordSlotFailed(metricIdx);
          if (process.env.NODE_ENV === 'development') {
            console.error(`[Ad System] Error loading slot ${type}:`, err);
          }
        }
      }
    };

    runLoad();
    return () => { active = false; };
  }, [adState, isMobile, onLoadAd, type, timeout]);

  // Viewability observer — fires once when 70%+ of ad is visible
  useEffect(() => {
    if (adState !== 'filled' || !containerRef.current) return;

    const viewObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.7) {
          trackAdEvent('viewability', type);
          viewObserver.disconnect();
        }
      },
      { threshold: 0.7 }
    );

    viewObserver.observe(containerRef.current);
    return () => viewObserver.disconnect();
  }, [adState, type]);

  // Dimensions
  const isType728 = type === '728x90';
  const displayWidth = useMemo(
    () => (isType728 && !isMobile ? '728px' : '300px'),
    [isType728, isMobile]
  );
  const displayHeight = useMemo(
    () => (isType728 && !isMobile ? '90px' : '250px'),
    [isType728, isMobile]
  );

  // SSR placeholder — exact reserved space, no layout shift
  if (!mounted) {
    return (
      <div
        className="mx-auto"
        style={{ height: displayHeight, width: displayWidth, minHeight: displayHeight }}
        aria-hidden="true"
      />
    );
  }

  // Dev-only failure UI
  if (adState === 'failed') {
    if (process.env.NODE_ENV === 'development') {
      return (
        <div className="w-full max-w-[728px] mx-auto flex flex-col justify-center items-center p-5 bg-red-950/20 border border-red-500/20 rounded-2xl text-center text-xs font-mono text-red-400 my-4">
          <p className="font-bold flex items-center gap-2">
            <span>⚠️</span> AD SYSTEM WARNING (DEV ONLY)
          </p>
          <p className="text-[11px] text-gray-500 mt-2 leading-relaxed max-w-lg">
            Failed to render slot type <strong className="text-red-400">"{type}"</strong>. Likely blocked by AdBlocker, DNS filter, or CSP. Disable ad-blocking to verify layout.
          </p>
        </div>
      );
    }
    return null;
  }

  const containerStyle: React.CSSProperties = adState === 'filled'
    ? { minHeight: displayHeight, opacity: 1, transition: 'opacity 400ms ease' }
    : { height: displayHeight, width: displayWidth, opacity: adState === 'loading' ? 1 : 0 };

  return (
    <div
      role="complementary"
      aria-label="Advertisement"
      className={`not-prose flex justify-center items-center mx-auto overflow-hidden ${className}`}
      style={containerStyle}
    >
      {/* Skeleton placeholder — shown while loading, hidden once filled */}
      {adState === 'loading' && (
        <div
          className="ad-skeleton absolute inset-0 rounded-lg"
          style={{ width: displayWidth, height: displayHeight }}
          aria-hidden="true"
        />
      )}
      <div
        ref={containerRef}
        id={id}
        className="relative flex justify-center items-center overflow-hidden w-full h-full"
        style={{ minHeight: displayHeight }}
      />
    </div>
  );
}

// Memoize to prevent re-renders when parent re-renders
const AdSlot = memo(AdSlotInner);
export default AdSlot;
