'use client';

import React, { useCallback, memo } from 'react';
import AdSlot, { AdSlotProps } from './AdSlot';
import { adScriptLoader } from './AdScriptLoader';

const TARGET_ID_BASE = 'container-6546c038dbbf040d39d1b8179e7743ca';
const INVOKE_URL = 'https://pl29692252.effectivecpmnetwork.com/6546c038dbbf040d39d1b8179e7743ca/invoke.js';

// Pre-load the native invoke.js script as early as possible
// (called once when the module is first imported)
if (typeof window !== 'undefined') {
  // Use idle time so it doesn't compete with critical resources
  const preloadNative = () => {
    adScriptLoader.preload(INVOKE_URL, { 'data-cfasync': 'false' });
  };
  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(preloadNative, { timeout: 2000 });
  } else {
    setTimeout(preloadNative, 500);
  }
}

interface NativeBannerProps {
  className?: string;
  priority?: AdSlotProps['priority'];
}

function NativeBannerInner({ className = '', priority = 'normal' }: NativeBannerProps) {
  const handleLoad = useCallback((container: HTMLDivElement): Promise<boolean> => {
    return new Promise<boolean>((resolve) => {
      // Each instance needs a unique container ID that the script will target
      const uniqueSuffix = Math.random().toString(36).substring(2, 9);
      const instanceId = `${TARGET_ID_BASE}-${uniqueSuffix}`;

      const adContainer = document.createElement('div');
      adContainer.id = instanceId;
      container.innerHTML = '';
      container.appendChild(adContainer);

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
            if (
              node.nodeName === 'IFRAME' ||
              (node instanceof HTMLElement && node.classList.length > 0 && node.tagName !== 'SCRIPT')
            ) {
              // Rename ID after fill so subsequent native slots can re-use the base ID pattern
              const rand = Math.random().toString(36).substring(2, 9);
              adContainer.id = `filled-native-${rand}`;
              cleanUp(true);
              return;
            }
          }
        }
      });

      observer.observe(adContainer, { childList: true, subtree: true });
      timeoutId = window.setTimeout(() => cleanUp(false), 9000);

      // Load via registry (fetched once globally), then inject trigger per instance
      adScriptLoader.load(INVOKE_URL, { 'data-cfasync': 'false' })
        .then(() => {
          const triggerScript = document.createElement('script');
          triggerScript.async = true;
          triggerScript.setAttribute('data-cfasync', 'false');
          // Pass the unique container ID to the script via a data attribute
          // that effectivecpmnetwork's invoke.js uses
          triggerScript.setAttribute('data-container', instanceId);
          triggerScript.src = INVOKE_URL;
          triggerScript.onerror = () => cleanUp(false);
          container.appendChild(triggerScript);
        })
        .catch(() => cleanUp(false));
    });
  }, []);

  return (
    <AdSlot
      type="native"
      className={className}
      priority={priority}
      timeout={8000}
      onLoadAd={handleLoad}
    />
  );
}

const NativeBanner = memo(NativeBannerInner);
export default NativeBanner;
