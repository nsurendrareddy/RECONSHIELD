'use client';

import { useEffect, useRef } from 'react';

/**
 * InFeedAd — Fluid In-Feed ad (slot: 2383367167)
 * Designed to blend visually with the blog card grid.
 * Lazy-loaded via IntersectionObserver (only triggers when ~200px from viewport).
 * Reserves minimum height to prevent CLS.
 */
export default function InFeedAd({ className = '' }) {
  const containerRef = useRef(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Bot check — don't initialise ads for crawlers
    const ua = navigator.userAgent || '';
    const isBot =
      /bot|googlebot|crawler|spider|robot|crawling|lighthouse|headless|page-speed|pagespeed|adsense|mediapartners/i.test(
        ua
      );
    if (isBot) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !pushed.current) {
          pushed.current = true;
          try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          } catch (_) {}
          observer.disconnect();
        }
      },
      { rootMargin: '200px', threshold: 0 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`flex flex-col bg-surface-900 border border-white/[0.06] rounded-2xl overflow-hidden shadow-lg ${className}`}
      aria-label="Advertisement"
    >
      {/* Label matched to card styling */}
      <p
        className="text-[8px] font-mono text-gray-600 uppercase tracking-[0.2em] text-center py-2 border-b border-white/5 select-none"
        aria-hidden="true"
      >
        Sponsored
      </p>

      {/* Reserve min-height to prevent CLS — fluid ads expand to content */}
      <div style={{ minHeight: '280px' }} className="w-full flex items-center justify-center px-2 py-2">
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '100%' }}
          data-ad-format="fluid"
          data-ad-layout-key="-6t+ed+2i-1n-4w"
          data-ad-client="ca-pub-3496685713682736"
          data-ad-slot="2383367167"
        />
      </div>
    </div>
  );
}
