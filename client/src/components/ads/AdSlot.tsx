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
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    }
  }, [pathname]);

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

    let active = true;
    const runLoad = async () => {
      try {
        const success = await onLoadAd(containerRef.current!, isMobile);
        if (active) {
          if (success) {
            setAdState('filled');
            trackAdEvent('impression', type);
          } else {
            setAdState('failed');
          }
        }
      } catch (err) {
        console.error(`[AdSlot] Failed loading ad of type ${type}:`, err);
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

  if (adState === 'failed') return null;

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
