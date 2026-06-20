'use client';

import React, { useEffect, useRef } from 'react';

type AdsterraNativeProps = {
  className?: string;
};

export default function AdsterraNative({ className = '' }: AdsterraNativeProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return;
    
    // Prevent double injection
    if (containerRef.current.querySelector('iframe')) return;

    try {
      // Create iframe for isolation to prevent container ID namespace collisions
      const iframe = document.createElement('iframe');
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.style.minHeight = '250px';
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
              <div id="container-6546c038dbbf040d39d1b8179e7743ca"></div>
              <script type="text/javascript" data-cfasync="false" src="https://pl29692252.effectivecpmnetwork.com/6546c038dbbf040d39d1b8179e7743ca/invoke.js"></script>
            </body>
          </html>
        `);
        iframeDoc.close();
      }
    } catch (error) {
      console.warn('Adsterra native injection failed:', error);
    }
  }, []);

  return (
    <div className={`flex justify-center items-center my-6 w-full ${className}`}>
      <div 
        ref={containerRef} 
        className="w-full min-h-[250px] relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-surface-900/10 border border-white/5 rounded-lg -z-10" />
      </div>
    </div>
  );
}
