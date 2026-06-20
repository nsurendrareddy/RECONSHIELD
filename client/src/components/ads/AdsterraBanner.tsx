'use client';

import React, { useEffect, useRef } from 'react';

type AdsterraBannerProps = {
  type: '728x90' | '300x250';
  className?: string;
};

const BANNER_CONFIGS = {
  '728x90': { key: 'ad055ae12ee78ddc0ebf1be2e3a5830f', width: 728, height: 90 },
  '300x250': { key: 'bff74f8eee55b4a3775d46c9295efe9a', width: 300, height: 250 }
};

export default function AdsterraBanner({ type, className = '' }: AdsterraBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return;
    
    // Prevent double injection (especially in React Strict Mode)
    if (containerRef.current.querySelector('iframe')) return;

    const config = BANNER_CONFIGS[type];
    if (!config) return;

    try {
      // Create iframe for isolation to prevent atOptions namespace collisions
      const iframe = document.createElement('iframe');
      iframe.width = String(config.width);
      iframe.height = String(config.height);
      iframe.style.border = 'none';
      iframe.style.overflow = 'hidden';
      iframe.style.background = 'transparent';
      iframe.setAttribute('scrolling', 'no');
      iframe.setAttribute('frameborder', '0');

      containerRef.current.appendChild(iframe);

      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      if (iframeDoc) {
        iframeDoc.open();
        iframeDoc.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body { margin: 0; padding: 0; overflow: hidden; background: transparent; }
              </style>
            </head>
            <body>
              <script type="text/javascript">
                var atOptions = {
                  'key' : '${config.key}',
                  'format' : 'iframe',
                  'height' : ${config.height},
                  'width' : ${config.width},
                  'params' : {}
                };
              </script>
              <script type="text/javascript" src="https://www.highperformanceformat.com/${config.key}/invoke.js"></script>
            </body>
          </html>
        `);
        iframeDoc.close();
      }
    } catch (error) {
      console.warn('Adsterra banner injection failed:', error);
    }
  }, [type]);

  // Use tailwind classes to reserve space and prevent Cumulative Layout Shift (CLS)
  const sizeClass = type === '728x90' 
    ? 'min-h-[90px] w-full max-w-[728px]' 
    : 'min-h-[250px] w-full max-w-[300px]';

  return (
    <div className={`flex justify-center items-center my-6 w-full ${className}`}>
      <div 
        ref={containerRef} 
        className={`relative flex justify-center items-center overflow-hidden ${sizeClass}`}
      >
        {/* Placeholder gradient / subtle border before ad loads */}
        <div className="absolute inset-0 bg-surface-900/10 border border-white/5 rounded-lg -z-10" />
      </div>
    </div>
  );
}
