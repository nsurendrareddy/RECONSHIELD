'use client';

import React, { useCallback, memo } from 'react';
import AdSlot, { AdSlotProps } from './AdSlot';
import { adScriptLoader } from './AdScriptLoader';

const BANNER_KEY = 'bff74f8eee55b4a3775d46c9295efe9a';
const INVOKE_URL = `https://www.highperformanceformat.com/${BANNER_KEY}/invoke.js`;

interface Banner300Props {
  className?: string;
  priority?: AdSlotProps['priority'];
}

function Banner300Inner({ className = '', priority = 'normal' }: Banner300Props) {
  const handleLoad = useCallback((container: HTMLDivElement): Promise<boolean> => {
    return new Promise<boolean>((resolve) => {
      const atOptions = {
        key: BANNER_KEY,
        format: 'iframe',
        height: 250,
        width: 300,
        params: {},
      };

      // Set atOptions BEFORE the script executes
      (window as any).atOptions = atOptions;
      container.innerHTML = '';

      // Inline config — must be synchronous so invoke.js reads the correct options
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

      // Watch for iframe injection (confirms ad was filled)
      observer = new MutationObserver((mutations) => {
        for (const m of mutations) {
          for (const node of Array.from(m.addedNodes)) {
            if (node.nodeName === 'IFRAME') { cleanUp(true); return; }
          }
        }
      });
      observer.observe(container, { childList: true, subtree: true });

      // Timeout handled by AdSlot — this is a safety net within the load fn
      timeoutId = window.setTimeout(() => cleanUp(false), 9000);

      // Load invoke.js via global registry — fetched only once regardless of
      // how many Banner300 instances exist on the page
      adScriptLoader.load(INVOKE_URL)
        .then(() => {
          // Script is ready — inject a trigger script so invoke.js renders into
          // this specific container using the atOptions we set above
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
      type="300x250"
      className={className}
      priority={priority}
      timeout={8000}
      onLoadAd={handleLoad}
    />
  );
}

const Banner300 = memo(Banner300Inner);
export default Banner300;
