'use client';

import React, { useCallback } from 'react';
import AdSlot from './AdSlot';

interface Banner728Props {
  className?: string;
}

export default function Banner728({ className = '' }: Banner728Props) {
  const handleLoad = useCallback((container: HTMLDivElement, isMobile: boolean) => {
    return new Promise<boolean>((resolve) => {
      // Mobile replacement: dynamically serve 300x250 parameters if viewport is below tablet width
      const KEY = isMobile ? 'bff74f8eee55b4a3775d46c9295efe9a' : 'ad055ae12ee78ddc0ebf1be2e3a5830f';
      const width = isMobile ? 300 : 728;
      const height = isMobile ? 250 : 90;

      const atOptions = {
        key: KEY,
        format: 'iframe',
        height,
        width,
        params: {},
      };

      (window as any).atOptions = atOptions;
      container.innerHTML = '';

      const inlineScript = document.createElement('script');
      inlineScript.type = 'text/javascript';
      inlineScript.text = `window.atOptions = ${JSON.stringify(atOptions)};`;

      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.highperformanceformat.com/${KEY}/invoke.js`;
      script.async = true;

      let observer: MutationObserver | null = null;
      let timeout: number | null = null;

      const cleanUp = (status: boolean) => {
        if (observer) observer.disconnect();
        if (timeout) window.clearTimeout(timeout);
        resolve(status);
      };

      observer = new MutationObserver((mutations) => {
        for (const m of mutations) {
          if (m.addedNodes.length) {
            for (const node of Array.from(m.addedNodes)) {
              if (node.nodeName === 'IFRAME') {
                cleanUp(true);
                return;
              }
            }
          }
        }
      });

      observer.observe(container, { childList: true, subtree: true });

      timeout = window.setTimeout(() => {
        cleanUp(false);
      }, 5000);

      script.onerror = () => cleanUp(false);

      container.appendChild(inlineScript);
      container.appendChild(script);
    });
  }, []);

  return (
    <AdSlot
      type="728x90"
      className={className}
      onLoadAd={handleLoad}
    />
  );
}
