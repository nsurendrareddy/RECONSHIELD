'use client';

import { useEffect, useRef } from 'react';

/**
 * InArticleAd — In-article fluid ad (slot: 6736374284, layout: in-article)
 * Placed after the 2nd–3rd paragraph and optionally mid-article.
 * Lazy-loaded via IntersectionObserver.
 * 40px top/bottom margin from surrounding content.
 * Max 2 instances per article page (enforced by the caller).
 */
export default function InArticleAd({ className = '' }) {
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
      { rootMargin: '150px', threshold: 0 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      // 40px spacing above and below (my-10 = 2.5rem ≈ 40px)
      className={`my-10 w-full ${className}`}
      aria-label="Advertisement"
    >
      <p
        className="text-center text-[8px] font-mono text-gray-600 uppercase tracking-[0.2em] mb-2 select-none"
        aria-hidden="true"
      >
        Advertisement
      </p>
      {/* Reserve min-height to prevent CLS */}
      <div style={{ minHeight: '200px' }} className="w-full overflow-hidden flex items-center justify-center">
        <ins
          className="adsbygoogle"
          style={{ display: 'block', textAlign: 'center', width: '100%' }}
          data-ad-layout="in-article"
          data-ad-format="fluid"
          data-ad-client="ca-pub-3496685713682736"
          data-ad-slot="6736374284"
        />
      </div>
    </div>
  );
}
