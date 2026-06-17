'use client';

import { useEffect, useRef } from 'react';

/**
 * MultiplexAd — Autorelaxed multiplex ad (slot: 4110210943)
 * Placed at the end of every article, above Related Articles.
 * Full-width, centered, responsive — no fixed dimensions.
 * Lazy-loaded via IntersectionObserver.
 */
export default function MultiplexAd({ className = '' }) {
  const containerRef = useRef(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

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
      className={`w-full my-10 border-t border-b border-white/5 py-8 ${className}`}
      aria-label="Advertisement"
    >
      <p
        className="text-center text-[9px] font-mono text-gray-600 uppercase tracking-[0.2em] mb-4 select-none"
        aria-hidden="true"
      >
        Advertisement
      </p>
      {/* Reserve min-height to prevent CLS on autorelaxed format */}
      <div style={{ minHeight: '280px' }} className="w-full overflow-hidden">
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-format="autorelaxed"
          data-ad-client="ca-pub-3496685713682736"
          data-ad-slot="4110210943"
        />
      </div>
    </div>
  );
}
