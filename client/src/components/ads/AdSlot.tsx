'use client';

import React, { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

export interface AdSlotProps {
  type: '300x250' | '728x90' | 'native';
  id?: string;
  className?: string;
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
  console.log(`[Ad Analytics] Tracked event: ${action} - label: ${label}`, value ? `value: ${value}` : '');
}

export default function AdSlot({ type, id, className = '', onLoadAd }: AdSlotProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [adState, setAdState] = useState<'idle' | 'loading' | 'filled' | 'failed'>('idle');
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  const prevPath = useRef(pathname);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Clean teardown and state refresh on client-side routing transitions
  useEffect(() => {
    if (prevPath.current !== pathname) {
      prevPath.current = pathname;
      setAdState('idle');
      if (process.env.NODE_ENV === 'development') {
        console.log('[Ad System] Route change detected. Resetting ad slot of type:', type);
      }
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    }
  }, [pathname, type]);

  // Lazy loading observer: loads the ad when within 300px of the viewport
  useEffect(() => {
    if (!mounted || adState !== 'idle' || !containerRef.current) return;

    const loadObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAdState('loading');
          loadObserver.disconnect();
        }
      },
      { rootMargin: '300px' }
    );

    loadObserver.observe(containerRef.current);
    return () => loadObserver.disconnect();
  }, [mounted, adState]);

  // Execute loading process when status shifts to 'loading'
  useEffect(() => {
    if (adState !== 'loading' || !containerRef.current) return;

    if (process.env.NODE_ENV === 'development') {
      console.log('[Ad System] Banner initialized:', type);
    }

    let active = true;
    const runLoad = async () => {
      try {
        const success = await onLoadAd(containerRef.current!, isMobile);
        if (active) {
          if (success) {
            setAdState('filled');
            trackAdEvent('impression', type);
            if (process.env.NODE_ENV === 'development') {
              console.log(`[Ad System] ${type === 'native' ? 'Native' : 'Banner'} rendered successfully:`, type);
            }
          } else {
            setAdState('failed');
            if (process.env.NODE_ENV === 'development') {
              console.warn('[Ad System] Script load reported failure:', type);
            }
          }
        }
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          console.error(`[Ad System] Failed loading ad of type ${type}:`, err);
        }
        if (active) {
          setAdState('failed');
        }
      }
    };

    runLoad();
    return () => {
      active = false;
    };
  }, [adState, isMobile, onLoadAd, type]);

  // Viewability observer: tracks when at least 70% of the ad area becomes visible
  useEffect(() => {
    if (adState !== 'filled' || !containerRef.current) return;

    const viewObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.7) {
          trackAdEvent('viewability', type);
          if (process.env.NODE_ENV === 'development') {
            console.log('[Ad System] Viewability threshold met (70%+):', type);
          }
          viewObserver.disconnect();
        }
      },
      { threshold: 0.7 }
    );

    viewObserver.observe(containerRef.current);
    return () => viewObserver.disconnect();
  }, [adState, type]);

  if (!mounted) {
    const isType728 = type === '728x90';
    const fallbackHeight = isType728 ? '90px' : '250px';
    const fallbackWidth = isType728 ? '728px' : '300px';
    return <div className="mx-auto" style={{ height: fallbackHeight, width: fallbackWidth, minHeight: fallbackHeight }} />;
  }

  if (adState === 'failed') {
    if (process.env.NODE_ENV === 'development') {
      return (
        <div className="w-full max-w-[728px] mx-auto flex flex-col justify-center items-center p-5 bg-red-950/20 border border-red-500/20 rounded-2xl text-center text-xs font-mono text-red-400 my-4">
          <p className="font-bold flex items-center gap-2">
            <span>⚠️</span> AD SYSTEM INTEGRATION WARNING (DEVELOPMENT ONLY)
          </p>
          <p className="text-[11px] text-gray-500 mt-2 leading-relaxed max-w-lg">
            Failed to render ad slot of type <strong className="text-red-400">"{type}"</strong>. This is highly likely caused by an active AdBlocker (e.g. uBlock Origin, AdBlock, Brave Shields), network DNS filtering (NextDNS, Pi-hole), or a local CSP rejection. Disable blocks to verify layout.
          </p>
        </div>
      );
    }
    return null;
  }

  const isType728 = type === '728x90';
  const displayWidth = isType728 && !isMobile ? '728px' : '300px';
  const displayHeight = isType728 && !isMobile ? '90px' : '250px';

  const containerStyle: React.CSSProperties = adState === 'filled'
    ? { minHeight: displayHeight, opacity: 1 }
    : { height: displayHeight, width: displayWidth, opacity: 0 };

  return (
    <div
      role="complementary"
      aria-label="Advertisement"
      className={`not-prose flex justify-center items-center mx-auto overflow-hidden transition-opacity duration-500 ${className}`}
      style={containerStyle}
    >
      <div
        ref={containerRef}
        id={id}
        className="relative flex justify-center items-center overflow-hidden w-full h-full"
        style={{ minHeight: displayHeight }}
      />
    </div>
  );
}
