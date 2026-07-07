'use client';

import React, { useCallback } from 'react';
import AdSlot from './AdSlot';

interface Banner300Props {
  className?: string;
}

export default function Banner300({ className = '' }: Banner300Props) {
  const handleLoad = useCallback((container: HTMLDivElement) => {
    return new Promise<boolean>((resolve) => {
      const KEY = 'bff74f8eee55b4a3775d46c9295efe9a';
      const atOptions = {
        key: KEY,
        format: 'iframe',
        height: 250,
        width: 300,
        params: {},
      };

      // Assign configurations to window for script execution context
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

      // Watch for iframe inclusion to confirm filled state
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

      // Fallback timeout of 5 seconds to diagnose ad block or connection dropouts
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
      type="300x250"
      className={className}
      onLoadAd={handleLoad}
    />
  );
}
