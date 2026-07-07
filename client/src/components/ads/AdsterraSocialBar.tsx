'use client';

import { useEffect } from 'react';

const SOCIAL_BAR_SCRIPT_ID = 'adsterra-social-bar';
const SOCIAL_BAR_SRC = 'https://pl29692251.effectivecpmnetwork.com/06/ea/fc/06eafc4004351bf68b0c5aa80b3255c9.js';

export default function AdsterraSocialBar() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Already injected — do not repeat
    if (document.getElementById(SOCIAL_BAR_SCRIPT_ID)) return;

    let hasInjected = false;

    const injectScript = () => {
      if (hasInjected) return;
      if (document.getElementById(SOCIAL_BAR_SCRIPT_ID)) return;
      hasInjected = true;

      const script = document.createElement('script');
      script.id = SOCIAL_BAR_SCRIPT_ID;
      script.src = SOCIAL_BAR_SRC;
      script.type = 'text/javascript';
      script.async = true;

      script.onload = () => {
        if (process.env.NODE_ENV === 'development') {
          console.log('[Adsterra] Social Bar — loaded');
        }
      };
      script.onerror = () => {
        if (process.env.NODE_ENV === 'development') {
          console.warn('[Adsterra] Social Bar — failed to load');
        }
      };

      document.body.appendChild(script);
    };

    // requestIdleCallback — non-critical, inject during idle time
    // Timeout 2500ms ensures it still loads on very busy pages
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(injectScript, { timeout: 2500 });
    } else {
      setTimeout(injectScript, 1500);
    }

    // Early-fire on user interaction
    const onInteraction = () => injectScript();
    window.addEventListener('mousemove', onInteraction, { passive: true, once: true });
    window.addEventListener('scroll', onInteraction, { passive: true, once: true });
    window.addEventListener('touchstart', onInteraction, { passive: true, once: true });

    return () => {
      window.removeEventListener('mousemove', onInteraction);
      window.removeEventListener('scroll', onInteraction);
      window.removeEventListener('touchstart', onInteraction);
    };
  }, []);

  return null;
}
