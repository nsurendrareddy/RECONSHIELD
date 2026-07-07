'use client';

import React, { useCallback } from 'react';
import AdSlot from './AdSlot';

interface NativeBannerProps {
  className?: string;
}

export default function NativeBanner({ className = '' }: NativeBannerProps) {
  const handleLoad = useCallback((container: HTMLDivElement) => {
    return new Promise<boolean>((resolve) => {
      const TARGET_ID = 'container-6546c038dbbf040d39d1b8179e7743ca';
      
      const adContainer = document.createElement('div');
      adContainer.id = TARGET_ID;
      container.innerHTML = '';
      container.appendChild(adContainer);

      const script = document.createElement('script');
      script.async = true;
      script.setAttribute('data-cfasync', 'false');
      script.src = 'https://pl29692252.effectivecpmnetwork.com/6546c038dbbf040d39d1b8179e7743ca/invoke.js';

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
              if (
                node.nodeName === 'IFRAME' ||
                (node instanceof HTMLElement && node.classList && node.classList.length > 0 && node.tagName !== 'SCRIPT')
              ) {
                // Rename container ID dynamically after loading to allow subsequent Native Banner slot renderings
                const rand = Math.random().toString(36).substring(2, 9);
                adContainer.id = `filled-native-${rand}`;
                cleanUp(true);
                return;
              }
            }
          }
        }
      });

      observer.observe(adContainer, { childList: true, subtree: true });

      timeout = window.setTimeout(() => {
        cleanUp(false);
      }, 5000);

      script.onerror = () => cleanUp(false);

      container.appendChild(script);
    });
  }, []);

  return (
    <AdSlot
      type="native"
      className={className}
      onLoadAd={handleLoad}
    />
  );
}
