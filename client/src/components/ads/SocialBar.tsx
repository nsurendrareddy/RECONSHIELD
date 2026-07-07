'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useAdManager } from './AdManager';
import { adScriptLoader } from './AdScriptLoader';

const FREQUENCY_CAP_MS = 24 * 60 * 60 * 1000; // 24 hours

export default function SocialBar() {
  const pathname = usePathname();
  const { isScanning, isTyping, isMobileKeyboardActive } = useAdManager();
  const [shouldDisplay, setShouldDisplay] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Suppress display on sensitive login, registration, contact forms, and profile/account sections
    const path = pathname.toLowerCase();
    const isRestrictedPath =
      path.includes('login') ||
      path.includes('signup') ||
      path.includes('account') ||
      path.includes('profile') ||
      path.includes('contact');

    if (isRestrictedPath || isScanning || isTyping || isMobileKeyboardActive) {
      setShouldDisplay(false);
      return;
    }

    // Enforce 24-hour frequency capping
    try {
      const lastLoad = localStorage.getItem('social_bar_last_load');
      const now = Date.now();
      if (lastLoad) {
        const timeDiff = now - parseInt(lastLoad, 10);
        if (timeDiff < FREQUENCY_CAP_MS) {
          setShouldDisplay(false);
          return;
        }
      }
      setShouldDisplay(true);
    } catch (e) {
      console.warn('[SocialBar] Failed to check localStorage frequency cap:', e);
      setShouldDisplay(true);
    }
  }, [pathname, isScanning, isTyping, isMobileKeyboardActive]);

  useEffect(() => {
    if (!shouldDisplay) return;

    let active = true;
    const injectSocialBar = async () => {
      try {
        const scriptUrl = 'https://pl29692251.effectivecpmnetwork.com/06/ea/fc/06eafc4004351bf68b0c5aa80b3255c9.js';
        await adScriptLoader.load(scriptUrl);
        if (active) {
          localStorage.setItem('social_bar_last_load', Date.now().toString());
          if (process.env.NODE_ENV === 'development') {
            console.log('[Adsterra] Social Bar script loaded and initialized.');
          }
        }
      } catch (err) {
        console.warn('[Adsterra] Social Bar load failed:', err);
      }
    };

    injectSocialBar();

    return () => {
      active = false;
    };
  }, [shouldDisplay]);

  return null;
}
