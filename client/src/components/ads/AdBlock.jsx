'use client';

import React, { useState, useEffect, useRef } from 'react';

/**
 * AdBlock component for rendering responsive Google AdSense units.
 * Prevents Layout Shift (CLS) by reserving container spaces.
 * Loads ads lazily using Intersection Observer.
 */
export default function AdBlock({ type = 'in-article', slot, className = '' }) {
  const [isIntersected, setIsIntersected] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersected(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '250px', // Load ad when within 250px of the viewport
        threshold: 0.01,
      }
    );

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  useEffect(() => {
    if (isIntersected) {
      const checkAdStatus = setTimeout(() => {
        // Simple ad block check or script load status check
        if (!window.adsbygoogle || typeof window.adsbygoogle.push !== 'function') {
          setIsBlocked(true);
        } else {
          try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          } catch (err) {
            console.warn('AdSense unit injection failed:', err);
            setIsBlocked(true);
          }
        }
      }, 350);

      return () => clearTimeout(checkAdStatus);
    }
  }, [isIntersected]);

  // Height mappings to reserve fixed height to prevent CLS layout shift
  const sizeClasses = {
    'in-article': 'min-h-[280px] w-full max-w-[728px]',
    'sidebar': 'min-h-[600px] w-full max-w-[300px]',
    'comments': 'min-h-[250px] w-full max-w-[728px]',
    'related-articles': 'min-h-[250px] w-full max-w-[728px]',
    'mobile-sticky': 'h-[50px] w-full max-w-[320px]',
    'banner-home': 'min-h-[90px] md:min-h-[250px] w-full max-w-[970px]',
  };

  const currentSizeClass = sizeClasses[type] || 'min-h-[250px] w-full';

  return (
    <div
      ref={containerRef}
      className={`relative mx-auto overflow-hidden bg-surface-900/30 border border-white/[0.03] rounded-2xl flex flex-col items-center justify-center transition-all ${currentSizeClass} ${className}`}
    >
      {/* Small Attribution Label */}
      <div className="absolute top-1.5 right-3 text-[8px] font-mono text-gray-600 tracking-wider uppercase select-none z-10 pointer-events-none">
        SPONSORED BRIEFING
      </div>

      {isIntersected ? (
        isBlocked ? (
          /* Premium theme fallback when ad blocker is active */
          <div className="p-6 text-center font-mono flex flex-col items-center justify-center w-full h-full border border-dashed border-matrix-400/20 rounded-2xl bg-surface-950/40 select-none">
            <div className="w-1.5 h-1.5 rounded-full bg-matrix-400 animate-pulse mb-2.5" />
            <span className="text-[10px] text-matrix-400 font-bold uppercase tracking-widest mb-1.5">// SECURE TRANSMISSION ENGAGED</span>
            <p className="text-[9px] text-gray-500 max-w-xs leading-relaxed">
              Support our security research. Whitelist ReconShield in your ad-blocker settings to view active sponsorships.
            </p>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ins
              className="adsbygoogle"
              style={{ display: 'block', width: '100%', height: '100%' }}
              data-ad-client="ca-pub-3496685713682736"
              data-ad-slot={slot || '1234567890'}
              data-ad-format={type === 'sidebar' ? 'vertical' : 'auto'}
              data-full-width-responsive={type === 'sidebar' ? 'false' : 'true'}
            />
          </div>
        )
      ) : (
        /* Subtle cyberpunk loading indicator to prevent layouts from popping */
        <div className="flex flex-col items-center justify-center gap-2 font-mono text-[9px] text-gray-600 select-none">
          <div className="w-4 h-4 border border-dashed border-gray-700 rounded-full animate-spin" />
          <span>CONNECTING SPONSOR PORTAL...</span>
        </div>
      )}
    </div>
  );
}
