"use client";

import { useEffect } from 'react';
import useUserInteraction from '@/hooks/useUserInteraction';

export default function SocialBar() {
  const hasInteracted = useUserInteraction();

  useEffect(() => {
    if (!hasInteracted || typeof window === 'undefined') return;
    if (document.querySelector('script[src*="pl29692251.effectivecpmnetwork.com"]')) {
      return;
    }
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://pl29692251.effectivecpmnetwork.com/06/ea/fc/06eafc4004351bf68b0c5aa80b3255c9.js';
    script.async = true;

    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [hasInteracted]);

  return null;
}
