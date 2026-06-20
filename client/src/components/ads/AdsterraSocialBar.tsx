'use client';

import { useEffect, useState } from 'react';

export default function AdsterraSocialBar() {
  const [adState, setAdState] = useState<'loading' | 'filled' | 'failed'>('loading');

  useEffect(() => {
    if (typeof window === 'undefined' || document.getElementById('adsterra-social-bar')) {
      return;
    }

    // Delay slightly to ensure hydration is done and layout is stable
    const timer = window.setTimeout(() => {
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

      document.body.appendChild(script);
    }, 1000);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  return null; // Social bar injects its own floating UI, no React node needed
}
