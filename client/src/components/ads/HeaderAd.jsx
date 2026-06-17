'use client';

import { useEffect, useRef } from 'react';

/**
 * HeaderAd — 728×90 Leaderboard ad (slot: 6636301930)
 * Renders below the navigation bar above main content.
 * Hidden on mobile (<md) to prevent horizontal overflow.
 * Reserves fixed height to prevent Cumulative Layout Shift (CLS).
 */
export default function HeaderAd() {
  const pushed = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined' || pushed.current) return;

    // Skip for bots / crawlers to protect Core Web Vitals & SEO
    const ua = navigator.userAgent || '';
    const isBot =
      /bot|googlebot|crawler|spider|robot|crawling|lighthouse|headless|page-speed|pagespeed|adsense|mediapartners/i.test(
        ua
      );
    if (isBot) return;

    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (_) {}
  }, []);

  return (
    /* Hidden on mobile — 728px does not fit < 768px viewports */
    <div className="hidden md:flex w-full flex-col items-center py-3 bg-surface-950/60 border-b border-white/[0.04]">
      <p
        className="text-[9px] font-mono text-gray-600 uppercase tracking-[0.2em] mb-2 select-none"
        aria-hidden="true"
      >
        Advertisement
      </p>
      {/* Fixed-size container reserves 90px height to prevent CLS */}
      <div
        style={{ minHeight: '90px', width: '728px', maxWidth: '100%' }}
        className="overflow-hidden flex items-center justify-center"
      >
        <ins
          className="adsbygoogle"
          style={{ display: 'inline-block', width: '728px', height: '90px' }}
          data-ad-client="ca-pub-3496685713682736"
          data-ad-slot="6636301930"
        />
      </div>
    </div>
  );
}
