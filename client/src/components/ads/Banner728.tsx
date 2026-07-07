'use client';

import React, { useCallback, memo } from 'react';
import AdSlot, { AdSlotProps } from './AdSlot';
import { adScriptLoader } from './AdScriptLoader';

const KEY_728 = 'ad055ae12ee78ddc0ebf1be2e3a5830f';
const KEY_300 = 'bff74f8eee55b4a3775d46c9295efe9a';
const INVOKE_BASE = 'https://www.highperformanceformat.com';

interface Banner728Props {
  className?: string;
  priority?: AdSlotProps['priority'];
}

function Banner728Inner({ className = '', priority = 'normal' }: Banner728Props) {
  const handleLoad = useCallback((container: HTMLDivElement, isMobile: boolean): Promise<boolean> => {
    return new Promise<boolean>((resolve) => {
      // Serve 300x250 on mobile, 728x90 on desktop/tablet
      const KEY = isMobile ? KEY_300 : KEY_728;
      const width = isMobile ? 300 : 728;
      const height = isMobile ? 250 : 90;
      const INVOKE_URL = `${INVOKE_BASE}/${KEY}/invoke.js`;

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
      container.appendChild(inlineScript);

      let observer: MutationObserver | null = null;
      let timeoutId: ReturnType<typeof window.setTimeout> | null = null;

      const cleanUp = (status: boolean) => {
        if (observer) { observer.disconnect(); observer = null; }
        if (timeoutId) { window.clearTimeout(timeoutId); timeoutId = null; }
        resolve(status);
      };

      observer = new MutationObserver((mutations) => {
        for (const m of mutations) {
          for (const node of Array.from(m.addedNodes)) {
            if (node.nodeName === 'IFRAME') { cleanUp(true); return; }
          }
        }
      });
      observer.observe(container, { childList: true, subtree: true });

      timeoutId = window.setTimeout(() => cleanUp(false), 9000);

      // Deduplicated load — invoke.js for this KEY fetched only once globally
      adScriptLoader.load(INVOKE_URL)
        .then(() => {
          const triggerScript = document.createElement('script');
          triggerScript.type = 'text/javascript';
          triggerScript.src = INVOKE_URL;
          triggerScript.async = true;
          triggerScript.onerror = () => cleanUp(false);
          container.appendChild(triggerScript);
        })
        .catch(() => cleanUp(false));
    });
  }, []);

  return (
    <AdSlot
      type="728x90"
      className={className}
      priority={priority}
      timeout={8000}
      onLoadAd={handleLoad}
    />
  );
}

const Banner728 = memo(Banner728Inner);
export default Banner728;
