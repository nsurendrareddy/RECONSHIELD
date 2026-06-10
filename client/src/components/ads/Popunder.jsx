"use client";

import { useEffect } from 'react';

export default function Popunder() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 24 hour frequency cap check
    const lastShown = localStorage.getItem('adsterra_popunder_last_shown');
    const twentyFourHours = 24 * 60 * 60 * 1000;
    const now = Date.now();

    if (lastShown && now - parseInt(lastShown, 10) < twentyFourHours) {
      return;
    }

    // Prevent duplicate script loading
    if (document.querySelector('script[src*="pl29692348.effectivecpmnetwork.com"]')) {
      return;
    }

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://pl29692348.effectivecpmnetwork.com/97/8f/c9/978fc9648a071536b1d4c22b9186ce64.js';
    script.async = true;

    document.body.appendChild(script);
    localStorage.setItem('adsterra_popunder_last_shown', now.toString());

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return null;
}

