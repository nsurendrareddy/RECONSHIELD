'use client';

import { useEffect } from 'react';

export default function DynamicThirdPartyScripts() {
  useEffect(() => {
    let loaded = false;

    function loadScripts() {
      if (loaded) return;
      loaded = true;

      // 1. Load Google Analytics
      const gaScript = document.createElement('script');
      gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-C1L15RFXXR';
      gaScript.async = true;
      document.head.appendChild(gaScript);

      // Initialize gtag configuration settings immediately upon script load
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      window.gtag = window.gtag || gtag;
      window.gtag('js', new Date());
      window.gtag('config', 'G-C1L15RFXXR', { send_page_view: false });

      // Restore consent for users who already accepted
      try {
        var consent = localStorage.getItem('cookieConsent');
        if (consent === 'true') {
          window.gtag('consent', 'update', {
            analytics_storage: 'granted',
            ad_storage: 'granted'
          });
        }
      } catch (e) {}

      // 2. Load Google AdSense
      const adsenseScript = document.createElement('script');
      adsenseScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3496685713682736';
      adsenseScript.async = true;
      adsenseScript.crossOrigin = 'anonymous';
      document.head.appendChild(adsenseScript);

      removeListeners();
    }

    const events = ['pointermove', 'click', 'scroll', 'keydown', 'touchstart'];

    function addListeners() {
      events.forEach((event) => {
        window.addEventListener(event, loadScripts, { passive: true, once: true });
      });
    }

    function removeListeners() {
      events.forEach((event) => {
        window.removeEventListener(event, loadScripts);
      });
    }

    addListeners();

    // Idle fallback
    let idleId;
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(loadScripts, { timeout: 2500 });
    } else {
      setTimeout(loadScripts, 2500);
    }

    return () => {
      removeListeners();
      if (idleId && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleId);
      }
    };
  }, []);

  return null;
}
