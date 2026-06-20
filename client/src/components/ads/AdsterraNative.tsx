'use client';

import { useEffect, useRef, useState } from 'react';
import { adQueue } from '@/lib/adQueue';

type AdsterraNativeProps = {
  className?: string;
};

export default function AdsterraNative({ className = '' }: AdsterraNativeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [adState, setAdState] = useState<'loading' | 'filled' | 'failed'>('loading');

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current || adState !== 'loading') return;

    let observer: MutationObserver;
    let timeoutTimer: number;

    const loadAd = () => new Promise<void>((resolve) => {
      if (!containerRef.current) {
        setAdState('failed');
        resolve();
        return;
      }

      const TARGET_ID = 'container-6546c038dbbf040d39d1b8179e7743ca';
      
      // We create the expected container div for this specific ad load
      const adContainer = document.createElement('div');
      adContainer.id = TARGET_ID;
      containerRef.current.innerHTML = ''; // Clean up any existing children
      containerRef.current.appendChild(adContainer);

      const script = document.createElement('script');
      script.async = true;
      script.setAttribute('data-cfasync', 'false');
      script.src = 'https://pl29692252.effectivecpmnetwork.com/6546c038dbbf040d39d1b8179e7743ca/invoke.js';

      const finishLoading = (status: 'filled' | 'failed') => {
        if (observer) observer.disconnect();
        window.clearTimeout(timeoutTimer);
        setAdState(status);
        console.log(`[Adsterra] Native Banner - ${status.toUpperCase()}`);
        
        if (status === 'filled') {
          // Dynamic ID rotation: Change the ID so the NEXT Native Ad in the queue can use the TARGET_ID safely
          const uniqueHash = Math.random().toString(36).substring(2, 9);
          adContainer.id = `filled-native-${uniqueHash}`;
        } else if (containerRef.current) {
          containerRef.current.innerHTML = '';
        }
        resolve(); // Free the queue
      };

      // Watch for actual ad content injection (either iframe or native ad nodes)
      observer = new MutationObserver((mutations) => {
        if (!containerRef.current) return;
        for (const mutation of mutations) {
          if (mutation.addedNodes.length) {
            for (const node of Array.from(mutation.addedNodes)) {
              if (
                node.nodeName === 'IFRAME' || 
                (node instanceof HTMLElement && node.classList && node.classList.length > 0 && node.tagName !== 'SCRIPT')
              ) {
                finishLoading('filled');
                return;
              }
            }
          }
        }
      });

      // We observe the adContainer specifically
      observer.observe(adContainer, { childList: true, subtree: true });

      // 3-second strict timeout for fill diagnostics
      timeoutTimer = window.setTimeout(() => {
        finishLoading('failed');
      }, 3000);

      script.onerror = () => finishLoading('failed');

      // Inject script AFTER appending the container with the correct ID
      containerRef.current.appendChild(script);
    });

    adQueue.enqueue(loadAd);

    return () => {
      if (observer) observer.disconnect();
      window.clearTimeout(timeoutTimer);
    };
  }, [adState]);

  if (adState === 'failed') return null;

  const sizeStyles = adState === 'filled' 
    ? { opacity: 1, minHeight: 250, height: 'auto' }
    : { height: 0, opacity: 0, overflow: 'hidden' as const };

  return (
    <div 
      className={`flex justify-center items-center w-full transition-all duration-500 ease-in-out ${adState === 'filled' ? 'my-6' : 'my-0'} ${className}`}
      style={sizeStyles}
    >
      <div
        ref={containerRef}
        className="w-full relative overflow-hidden flex justify-center"
      >
      </div>
    </div>
  );
}
