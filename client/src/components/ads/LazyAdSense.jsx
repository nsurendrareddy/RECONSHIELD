"use client";

import { useEffect } from 'react';
import useUserInteraction from '@/hooks/useUserInteraction';

/**
 * LazyAdSense
 * Defers Google AdSense (and associated FundingChoices consent dialogs)
 * until a user interaction is detected. This improves PageSpeed and Lighthouse
 * scores by eliminating large unused JS on initial page load.
 */
export default function LazyAdSense() {
  const hasInteracted = useUserInteraction();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if the user agent is a crawler or the Google AdSense validation bot
    const ua = window.navigator.userAgent || '';
    const isBot = /bot|google|crawler|spider|lighthouse|mediapartners|adsense/i.test(ua);

    // If it's a real user and they haven't interacted yet, defer loading the script
    if (!hasInteracted && !isBot) return;

    // Prevent duplicate injection
    if (document.querySelector('script[src*="pagead2.googlesyndication.com"]')) {
      return;
    }

    const script = document.createElement('script');
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3496685713682736";
    script.async = true;
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);
  }, [hasInteracted]);

  return null;
}
