'use client';

import { useEffect } from 'react';

/**
 * Custom hook to dynamically integrate the Monetag OnClick script.
 * Features:
 *  - Checks if browser is a crawler/bot to preserve SEO.
 *  - Limits execution to once every 24 hours per user via localStorage.
 *  - Registers event listeners for lazy loading after user interaction.
 *  - Cleans up scripts and listeners on unmount.
 */
export default function useMonetagOnClick() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 1. Crawler / Bot detection check
    const userAgent = window.navigator.userAgent || '';
    const isBot = /bot|googlebot|crawler|spider|robot|crawling|lighthouse|headless/i.test(userAgent);
    if (isBot) return;

    // 2. Frequency capping (max once every 24 hours per user)
    const STORAGE_KEY = 'reconshield_monetag_onclick_last_trigger';
    const lastTrigger = localStorage.getItem(STORAGE_KEY);
    const now = Date.now();
    const ONCE_A_DAY_MS = 24 * 60 * 60 * 1000;

    if (lastTrigger) {
      const timeElapsed = now - parseInt(lastTrigger, 10);
      if (timeElapsed < ONCE_A_DAY_MS) {
        // Already triggered within 24 hours, skip loading script
        return;
      }
    }

    const scriptId = 'monetag-onclick-tag';

    const injectScript = () => {
      // Prevent duplicate script tags
      if (document.getElementById(scriptId)) return;

      try {
        const script = document.createElement('script');
        script.id = scriptId;
        script.dataset.zone = '11146520';
        script.src = 'https://al5sm.com/tag.min.js';
        script.async = true;

        script.onload = () => {
          // Store trigger timestamp on success
          localStorage.setItem(STORAGE_KEY, Date.now().toString());
        };

        script.onerror = (err) => {
          console.warn('Monetag OnClick script injection failed:', err);
        };

        const target = [document.documentElement, document.body].filter(Boolean).pop();
        if (target) {
          target.appendChild(script);
        }
      } catch (err) {
        console.error('Error executing Monetag OnClick injection:', err);
      }
    };

    // 3. Lazy load on first user interaction
    let interactionRegistered = false;

    const handleInteraction = () => {
      if (interactionRegistered) return;
      interactionRegistered = true;
      injectScript();
      cleanupListeners();
    };

    const cleanupListeners = () => {
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('mousemove', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };

    window.addEventListener('scroll', handleInteraction, { passive: true });
    window.addEventListener('click', handleInteraction, { passive: true });
    window.addEventListener('touchstart', handleInteraction, { passive: true });
    window.addEventListener('mousemove', handleInteraction, { passive: true });
    window.addEventListener('keydown', handleInteraction, { passive: true });

    return () => {
      cleanupListeners();
      // Remove script to prevent polluting layout on routing changes
      const activeScript = document.getElementById(scriptId);
      if (activeScript) {
        activeScript.remove();
      }
    };
  }, []);
}
