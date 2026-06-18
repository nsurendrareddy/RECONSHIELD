'use client';

import React, { useEffect, useState } from 'react';

export default function InFeedAd() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (typeof window === 'undefined') return;

    const timer = setTimeout(() => {
      try {
        if (window.adsbygoogle) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      } catch (err) {
        console.warn('AdSense InFeedAd push failed:', err);
      }
    }, 150);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="group flex flex-col justify-between bg-surface-900 border border-white/5 hover:border-matrix-400/20 transition-all duration-300 rounded-2xl overflow-hidden shadow-lg p-6 min-h-[420px] w-full">
      <div className="text-[9px] font-mono text-gray-500 uppercase tracking-widest mb-3 select-none">
        Sponsorship
      </div>
      <div className="flex-1 flex items-center justify-center overflow-hidden bg-surface-950/20 border border-white/[0.01] rounded-xl p-2 min-h-[300px]">
        {isClient && (
          <ins
            className="adsbygoogle"
            style={{ display: 'block', width: '100%', height: '100%' }}
            data-ad-format="fluid"
            data-ad-layout-key="-6t+ed+2i-1n-4w"
            data-ad-client="ca-pub-3496685713682736"
            data-ad-slot="2383367167"
          />
        )}
      </div>
    </div>
  );
}
