'use client';

import { useEffect } from 'react';

const FREQUENCY_CAP_MS = 60 * 60 * 1000; // 1 hour

export default function MonetagGlobal() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let hasInjected = false;

    const injectScript = () => {
      if (hasInjected) return;
      hasInjected = true;

      try {
        const lastLoadStr = sessionStorage.getItem('monetag_last_load');
        const now = Date.now();

        if (lastLoadStr) {
          const lastLoad = parseInt(lastLoadStr, 10);
          if (!isNaN(lastLoad) && now - lastLoad < FREQUENCY_CAP_MS) {
            if (process.env.NODE_ENV === 'development') {
              console.log('[Monetag] Frequency cap active. Skipping injection.');
            }
            return;
          }
        }

        if (!document.getElementById('monetag-vignette')) {
          const vignetteScript = document.createElement('script');
          vignetteScript.id = 'monetag-vignette';
          vignetteScript.src = 'https://n6wxm.com/vignette.min.js';
          vignetteScript.setAttribute('data-zone', '11124393');
          vignetteScript.async = true;
          document.head.appendChild(vignetteScript);
          if (process.env.NODE_ENV === 'development') {
            console.log('[Monetag] Injecting vignette script');
          }
        }

        if (!document.getElementById('monetag-push')) {
          const pushScript = document.createElement('script');
          pushScript.id = 'monetag-push';
          pushScript.src = 'https://nap5k.com/tag.min.js';
          pushScript.setAttribute('data-zone', '11124391');
          pushScript.async = true;
          document.head.appendChild(pushScript);
          if (process.env.NODE_ENV === 'development') {
            console.log('[Monetag] Injecting push script');
          }
        }

        sessionStorage.setItem('monetag_last_load', Date.now().toString());
      } catch (e) {
        if (process.env.NODE_ENV === 'development') {
          console.warn('[Monetag] sessionStorage error:', e);
        }
      }
    };

    // Use requestIdleCallback to inject during browser idle time.
    // This ensures Monetag scripts never compete with critical page resources.
    // Timeout of 2000ms means it fires no later than 2s even on busy pages.
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(injectScript, { timeout: 2000 });
    } else {
      // Fallback for browsers without requestIdleCallback (Safari < 16.4)
      setTimeout(injectScript, 1500);
    }

    // Early-fire on user interaction (best case: inject immediately on first action)
    const onInteraction = () => {
      injectScript();
      window.removeEventListener('mousemove', onInteraction);
      window.removeEventListener('scroll', onInteraction);
      window.removeEventListener('touchstart', onInteraction);
    };

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
