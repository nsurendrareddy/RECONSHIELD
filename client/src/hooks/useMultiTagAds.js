'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Optimized custom hook to dynamically integrate the MultiTag ad script.
 * Features:
 *  - Checks if browser is a crawler/bot (Googlebot, Lighthouse, etc.) to protect SEO and Core Web Vitals.
 *  - Matches specific allowed paths: homepage (/), tool pages (/tools/*), and blog pages (/blog/*).
 *  - Session-capped injection using sessionStorage (loads only once per browser session).
 *  - Engagement-based deferred loading: pointerdown, 50% scroll depth, or 45-second timer.
 *  - Safe sessionStorage fallback for private mode browsers.
 *  - Logs are output only in development mode.
 * 
 * @param {Object} options Optional callbacks for load and error events.
 * @param {Function} options.onLoad Callback when script successfully loads.
 * @param {Function} options.onError Callback if script fails to load.
 */
export default function useMultiTagAds(options = {}) {
  const pathname = usePathname();
  const { onLoad, onError } = options;

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const isDev = process.env.NODE_ENV === 'development';
    const logDev = (msg) => {
      if (isDev) console.log(msg);
    };

    // Helper to safely access sessionStorage
    const safeGetSession = (key) => {
      try {
        return sessionStorage.getItem(key);
      } catch (e) {
        return null;
      }
    };

    const safeSetSession = (key, value) => {
      try {
        sessionStorage.setItem(key, value);
      } catch (e) {
        // Suppress storage block errors in private modes
      }
    };

    // 1. Crawler / Bot detection check to protect Core Web Vitals and SEO
    const userAgent = window.navigator.userAgent || '';
    const isBot = /bot|googlebot|crawler|spider|robot|crawling|lighthouse|headless|page-speed|pagespeed|pingdom|semrush/i.test(userAgent);
    if (isBot) return;

    // 2. Validate paths
    const isAllowedPage = (path) => {
      if (!path) return false;
      if (path === '/') return true;
      if (path === '/tools' || path.startsWith('/tools/')) return true;
      if (path === '/blog' || path.startsWith('/blog/')) return true;
      return false;
    };

    const isAllowed = isAllowedPage(pathname);
    const SCRIPT_SRC = 'https://quge5.com/88/tag.min.js';

    // If on a forbidden page, do not initialize
    if (!isAllowed) return;

    // 3. Prevent duplicate injections: Check DOM presence and session state
    const scriptExists = !!document.querySelector(`script[src="${SCRIPT_SRC}"]`);
    const sessionLoaded = safeGetSession('multitag_loaded') === 'true';

    if (scriptExists || sessionLoaded) {
      logDev('MultiTag already loaded');
      return;
    }

    // Function to inject the script
    const injectScript = () => {
      // Final sanity check before appending to document
      if (document.querySelector(`script[src="${SCRIPT_SRC}"]`)) {
        logDev('MultiTag already loaded');
        return;
      }

      try {
        const script = document.createElement('script');
        script.src = SCRIPT_SRC;
        script.setAttribute('data-zone', '247948');
        script.async = true;
        script.setAttribute('data-cfasync', 'false');

        script.onload = () => {
          logDev('MultiTag loaded');
          safeSetSession('multitag_loaded', 'true');
          if (typeof onLoad === 'function') {
            onLoad();
          }
        };

        script.onerror = (err) => {
          if (isDev) {
            console.error('MultiTag load failed:', err);
          }
          if (typeof onError === 'function') {
            onError(err);
          }
        };

        const target = document.head || document.body || document.documentElement;
        if (target) {
          target.appendChild(script);
        }
      } catch (err) {
        if (isDev) {
          console.error('Error executing MultiTag injection:', err);
        }
      }
    };

    // 4. Deferred Engagement Loader setup
    let interactionRegistered = false;
    let timeoutId = null;

    const triggerLoad = () => {
      if (interactionRegistered) return;
      interactionRegistered = true;

      logDev('MultiTag conditions met');
      injectScript();
      cleanupListeners();
    };

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (scrollHeight <= 0) return;
      
      const scrollPercent = (scrollTop / scrollHeight) * 100;
      if (scrollPercent >= 50) {
        triggerLoad();
      }
    };

    const cleanupListeners = () => {
      window.removeEventListener('pointerdown', triggerLoad);
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };

    // Set up passive listeners for better scroll and touch responsiveness
    window.addEventListener('pointerdown', triggerLoad, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 45 seconds fallback timer
    timeoutId = setTimeout(() => {
      triggerLoad();
    }, 45000);

    return () => {
      cleanupListeners();
    };
  }, [pathname, onLoad, onError]);
}
