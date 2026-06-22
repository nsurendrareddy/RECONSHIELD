'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { adQueue } from '@/lib/adQueue';

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
  const [adState, setAdState] = useState<'loading' | 'filled' | 'failed'>('loading');
  const pathname = usePathname();

  const prevPath = useRef(pathname);
  const prevType = useRef(type);

  // Pathname guard: only trigger loading if pathname or type actually changes
  useEffect(() => {
    let changed = false;
    if (prevPath.current !== pathname) {
      prevPath.current = pathname;
      changed = true;
    }
    if (prevType.current !== type) {
      prevType.current = type;
      changed = true;
    }
    if (changed) {
      setAdState('loading');
    }
  }, [pathname, type]);

  // Deep teardown on absolute unmount
  useEffect(() => {
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
      try {
        delete (window as any).atOptions;
      } catch (e) {
        (window as any).atOptions = undefined;
      }
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current || adState !== 'loading') return;

    let observer: MutationObserver | null = null;
    let timeoutTimer: number | null = null;

    const loadAd = () => new Promise<void>((resolve) => {
      const config = BANNER_CONFIGS[type];
      if (!config || !containerRef.current) {
        setAdState('failed');
        console.warn(`[Adsterra] ${type} Banner - Failed: Invalid config or missing container`);
        resolve();
        return;
      }

      // Prepare configuration
      const atOptions = {
        key: config.key,
        format: 'iframe',
        height: config.height,
        width: config.width,
        params: {}
      };

      // Set global variable carefully
      ;(window as any).atOptions = atOptions;

      // Ensure we clean up any old scripts/iframes in this container
      containerRef.current.innerHTML = '';

      // Inline config script
      const inlineScript = document.createElement('script');
      inlineScript.type = 'text/javascript';
      inlineScript.text = `window.atOptions = ${JSON.stringify(atOptions)};`;

      // Main invoke script
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.highperformanceformat.com/${config.key}/invoke.js`;
      script.async = true;

      const finishLoading = (status: 'filled' | 'failed') => {
        if (observer) {
          observer.disconnect();
          observer = null;
        }
        if (timeoutTimer) {
          window.clearTimeout(timeoutTimer);
          timeoutTimer = null;
        }
        setAdState(status);
        console.log(`[Adsterra] ${type} Banner - ${status.toUpperCase()}`);
        if (status === 'failed' && containerRef.current) {
          containerRef.current.innerHTML = '';
        }
        resolve(); // Free the queue for the next ad
      };

      // Watch for iframe injection
      observer = new MutationObserver((mutations) => {
        if (!containerRef.current) return;
        for (const mutation of mutations) {
          if (mutation.addedNodes.length) {
            for (const node of Array.from(mutation.addedNodes)) {
              if (node.nodeName === 'IFRAME') {
                finishLoading('filled');
                return;
              }
            }
          }
        }
      });

      observer.observe(containerRef.current, { childList: true, subtree: true });

      // 5-second strict timeout for fill diagnosis
      timeoutTimer = window.setTimeout(() => {
        finishLoading('failed');
      }, 5000);

      script.onerror = () => finishLoading('failed');

      // Inject scripts
      containerRef.current.appendChild(inlineScript);
      containerRef.current.appendChild(script);
    });

    // Enqueue the loading process
    adQueue.enqueue(loadAd);

    return () => {
      if (observer) {
        observer.disconnect();
      }
      if (timeoutTimer) {
        window.clearTimeout(timeoutTimer);
      }
    };
  }, [type, adState]);

  if (adState === 'failed') return null;

  // Render container with smooth expansion. Avoid CLS by keeping it 0 height until filled.
  const sizeStyles = adState === 'filled' 
    ? { minHeight: type === '728x90' ? 90 : 250, opacity: 1, height: 'auto' }
    : { height: 0, margin: 0, padding: 0, opacity: 0, overflow: 'hidden' as const };

  const baseWidth = type === '728x90' ? 'max-w-[728px]' : 'max-w-[300px]';

  return (
    <div 
      className={`not-prose flex justify-center items-center w-full transition-all duration-500 ease-in-out ${adState === 'filled' ? className : ''}`}
      style={sizeStyles}
    >
      <div
        ref={containerRef}
        className={`relative flex justify-center items-center overflow-hidden w-full ${baseWidth}`}
      >
      </div>
    </div>
  );
}
