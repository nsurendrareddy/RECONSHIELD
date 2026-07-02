'use client';

import { useEffect, useState } from 'react';

export default function AdsterraSocialBar() {
  const [adState, setAdState] = useState<'loading' | 'filled' | 'failed'>('loading');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let hasInjected = false;
    let idleTimer: number | null = null;
    let fallbackTimer: number | null = null;

    // Check if script already exists to prevent duplicate injections
    if (document.getElementById('adsterra-social-bar')) {
      setAdState('filled');
      return;
    }

    const injectScript = () => {
      if (hasInjected) return;
      hasInjected = true;

      cleanup();

      if (document.getElementById('adsterra-social-bar')) return;

      const script = document.createElement('script');
      script.id = 'adsterra-social-bar';
      script.src = 'https://pl29692251.effectivecpmnetwork.com/06/ea/fc/06eafc4004351bf68b0c5aa80b3255c9.js';
      script.type = 'text/javascript';
      script.async = true;

      script.onload = () => {
        console.log('[Adsterra] Social Bar - FILLED (Script Loaded)');
        setAdState('filled');
      };

      script.onerror = () => {
        console.warn('[Adsterra] Social Bar - FAILED');
        setAdState('failed');
      };

      // Delay slightly to ensure hydration is complete and layout is stable
      fallbackTimer = window.setTimeout(() => {
        document.body.appendChild(script);
      }, 500);
    };

    const cleanup = () => {
      window.removeEventListener('mousemove', injectScript);
      window.removeEventListener('scroll', injectScript);
      window.removeEventListener('touchstart', injectScript);
      window.removeEventListener('keydown', injectScript);
      if (idleTimer) {
        window.clearTimeout(idleTimer);
      }
    };

    // Listen for early user interaction
    window.addEventListener('mousemove', injectScript, { passive: true });
    window.addEventListener('scroll', injectScript, { passive: true });
    window.addEventListener('touchstart', injectScript, { passive: true });
    window.addEventListener('keydown', injectScript, { passive: true });

    // Fallback: inject anyway on idle/timeout (e.g. after 3.5 seconds)
    idleTimer = window.setTimeout(() => {
      injectScript();
    }, 3500);

    return () => {
      cleanup();
      if (fallbackTimer) {
        window.clearTimeout(fallbackTimer);
      }
    };
  }, []);

  return null; // Social bar injects its own floating UI, no React node needed
}
