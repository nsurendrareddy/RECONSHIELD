'use client';

import { useEffect } from 'react';

const FREQUENCY_CAP_MS = 60 * 60 * 1000; // 1 hour

export default function MonetagGlobal() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const lastLoadStr = sessionStorage.getItem('monetag_last_load');
      const now = Date.now();

      if (lastLoadStr) {
        const lastLoad = parseInt(lastLoadStr, 10);
        if (!isNaN(lastLoad) && now - lastLoad < FREQUENCY_CAP_MS) {
          console.log('[Monetag] Frequency cap active. Skipping vignette and push script injection.');
          return;
        }
      }

      // Check if scripts already exist in DOM to prevent duplicate injections
      const oldVignette = document.getElementById('monetag-vignette');
      const oldPush = document.getElementById('monetag-push');

      if (!oldVignette) {
        console.log('[Monetag] Injecting vignette script');
        const vignetteScript = document.createElement('script');
        vignetteScript.id = 'monetag-vignette';
        vignetteScript.src = 'https://n6wxm.com/vignette.min.js';
        vignetteScript.setAttribute('data-zone', '11124393');
        vignetteScript.async = true;
        document.head.appendChild(vignetteScript);
      }

      if (!oldPush) {
        console.log('[Monetag] Injecting push script');
        const pushScript = document.createElement('script');
        pushScript.id = 'monetag-push';
        pushScript.src = 'https://nap5k.com/tag.min.js';
        pushScript.setAttribute('data-zone', '11124391');
        pushScript.async = true;
        document.head.appendChild(pushScript);
      }

      sessionStorage.setItem('monetag_last_load', now.toString());
    } catch (e) {
      console.warn('[Monetag] Failed to check or set sessionStorage for frequency cap', e);
    }
  }, []);

  return null;
}

