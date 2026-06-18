'use client';

import React, { useEffect, useState } from 'react';

export default function MultiplexAd() {
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
        console.warn('AdSense MultiplexAd push failed:', err);
      }
    }, 150);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full flex flex-col my-12 px-4">
      <span className="text-[9px] font-mono text-gray-600 tracking-widest uppercase mb-3 select-none">
        RECOMMENDED FOR YOU
      </span>
      <div className="w-full min-h-[280px] bg-surface-950/20 border border-white/[0.01] rounded-xl p-4 flex items-center justify-center overflow-hidden">
        {isClient && (
          <ins
            className="adsbygoogle"
            style={{ display: 'block', width: '100%' }}
            data-ad-format="autorelaxed"
            data-ad-client="ca-pub-3496685713682736"
            data-ad-slot="4110210943"
          />
        )}
      </div>
    </div>
  );
}
