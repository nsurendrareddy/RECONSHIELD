'use client';

import React, { useEffect, useState } from 'react';

export default function HeaderAd() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (typeof window === 'undefined') return;
    
    // Initialize standard push when window environment is ready
    const timer = setTimeout(() => {
      try {
        if (window.adsbygoogle) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      } catch (err) {
        console.warn('AdSense HeaderAd push failed:', err);
      }
    }, 150);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center my-6 px-4">
      <span className="text-[9px] font-mono text-gray-600 tracking-widest uppercase mb-1.5 select-none">
        Advertisement
      </span>
      {/* Container with reserved dimensions to mitigate CLS layout shift */}
      <div className="w-full max-w-[728px] min-h-[90px] flex items-center justify-center overflow-hidden bg-surface-950/20 border border-white/[0.01] rounded-lg">
        {isClient && (
          <ins
            className="adsbygoogle header-ad-ins"
            style={{ display: 'inline-block', width: '728px', height: '90px' }}
            data-ad-client="ca-pub-3496685713682736"
            data-ad-slot="6636301930"
          />
        )}
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .header-ad-ins {
            width: 100% !important;
            height: auto !important;
            min-height: 50px;
          }
        }
      `}</style>
    </div>
  );
}
