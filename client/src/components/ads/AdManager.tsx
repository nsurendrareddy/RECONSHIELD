'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { adMetrics } from '@/lib/adMetrics';
import type { AdPriority } from '@/lib/adQueue';

interface AdContextType {
  isScanning: boolean;
  setIsScanning: (scanning: boolean) => void;
  isTyping: boolean;
  isMobileKeyboardActive: boolean;
  /** Default priority for ad slots in the current page context */
  defaultAdPriority: AdPriority;
  setDefaultAdPriority: (priority: AdPriority) => void;
}

const AdContext = createContext<AdContextType>({
  isScanning: false,
  setIsScanning: () => {},
  isTyping: false,
  isMobileKeyboardActive: false,
  defaultAdPriority: 'normal',
  setDefaultAdPriority: () => {},
});

export const useAdManager = () => useContext(AdContext);

export function AdManagerProvider({ children }: { children: React.ReactNode }) {
  const [isScanning, setIsScanning] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isMobileKeyboardActive, setIsMobileKeyboardActive] = useState(false);
  const [defaultAdPriority, setDefaultAdPriority] = useState<AdPriority>('normal');
  const pathname = usePathname();

  // Reset state + metrics on route change
  useEffect(() => {
    setIsScanning(false);
    setDefaultAdPriority('normal');
    adMetrics.onNavigation();
  }, [pathname]);

  // Monitor keyboard focus and resize for virtual keyboard detection
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleFocus = (e: FocusEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        setIsTyping(true);
      }
    };

    const handleBlur = (e: FocusEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        setIsTyping(false);
      }
    };

    let initialHeight = window.innerHeight;
    const handleResize = () => {
      const currentHeight = window.innerHeight;
      const isMobile = window.innerWidth < 768;
      if (isMobile && (initialHeight - currentHeight) > (initialHeight * 0.15)) {
        setIsMobileKeyboardActive(true);
      } else {
        setIsMobileKeyboardActive(false);
      }
    };

    document.addEventListener('focusin', handleFocus);
    document.addEventListener('focusout', handleBlur);
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('focusin', handleFocus);
      document.removeEventListener('focusout', handleBlur);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // CSP violation listener (development only)
  useEffect(() => {
    if (typeof window === 'undefined' || process.env.NODE_ENV !== 'development') return;

    const handleCspViolation = (e: SecurityPolicyViolationEvent) => {
      const blockedUri = e.blockedURI || '';
      if (
        blockedUri.includes('highperformanceformat') ||
        blockedUri.includes('effectivecpmnetwork')
      ) {
        console.warn(
          `[Ad System CSP Warning] Blocked URI: ${blockedUri} via directive: ${e.violatedDirective}. Check next.config.mjs CSP headers!`
        );
      }
    };

    window.addEventListener('securitypolicyviolation', handleCspViolation);
    return () => window.removeEventListener('securitypolicyviolation', handleCspViolation);
  }, []);

  return (
    <AdContext.Provider
      value={{
        isScanning,
        setIsScanning,
        isTyping,
        isMobileKeyboardActive,
        defaultAdPriority,
        setDefaultAdPriority,
      }}
    >
      {children}
    </AdContext.Provider>
  );
}
