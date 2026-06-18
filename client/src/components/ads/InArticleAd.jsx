'use client';

import React, { useEffect, useState } from 'react';

export default function InArticleAd() {
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
        console.warn('AdSense InArticleAd push failed:', err);
      }
    }, 150);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center my-10 px-4">
      <span className="text-[9px] font-mono text-gray-600 tracking-widest uppercase mb-1.5 select-none">
        Advertisement
      </span>
      <div className="w-full max-w-[728px] min-h-[250px] bg-surface-950/20 border border-white/[0.01] rounded-xl p-2 flex items-center justify-center overflow-hidden">
        {isClient && (
          <ins
            className="adsbygoogle"
            style={{ display: 'block', textAlign: 'center', width: '100%' }}
            data-ad-layout="in-article"
            data-ad-format="fluid"
            data-ad-client="ca-pub-3496685713682736"
            data-ad-slot="6736374284"
          />
        )}
      </div>
    </div>
  );
}
