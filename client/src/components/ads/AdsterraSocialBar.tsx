'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const SOCIAL_BAR_SCRIPT_ID = 'adsterra-social-bar';
const SOCIAL_BAR_SRC = 'https://pl29692251.effectivecpmnetwork.com/06/ea/fc/06eafc4004351bf68b0c5aa80b3255c9.js';

export default function AdsterraSocialBar() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Clean up old script if it exists
    const oldScript = document.getElementById(SOCIAL_BAR_SCRIPT_ID);
    if (oldScript) {
      oldScript.remove();
    }

    const script = document.createElement('script');
    script.id = SOCIAL_BAR_SCRIPT_ID;
    script.type = 'text/javascript';
    script.src = SOCIAL_BAR_SRC;
    script.async = true;
    
    script.onload = () => {
      if (process.env.NODE_ENV === 'development') {
        console.log(`[Adsterra] Social Bar — loaded for route: ${pathname}`);
      }
    };
    
    script.onerror = (e) => {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`[Adsterra] Social Bar — failed to load for route: ${pathname}`, e);
      }
    };

    // Append to body to trigger evaluation
    document.body.appendChild(script);

    return () => {
      // Clean up script on unmount or before next route change
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [pathname]);

  return null;
}
