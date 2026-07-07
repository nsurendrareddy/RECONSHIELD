'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface AdContextType {
  isScanning: boolean;
  setIsScanning: (scanning: boolean) => void;
  isTyping: boolean;
  isMobileKeyboardActive: boolean;
}

const AdContext = createContext<AdContextType>({
  isScanning: false,
  setIsScanning: () => {},
  isTyping: false,
  isMobileKeyboardActive: false,
});

export const useAdManager = () => useContext(AdContext);

export function AdManagerProvider({ children }: { children: React.ReactNode }) {
  const [isScanning, setIsScanning] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isMobileKeyboardActive, setIsMobileKeyboardActive] = useState(false);
  const pathname = usePathname();

  // Automatically reset the scanning state upon page transitions
  useEffect(() => {
    setIsScanning(false);
  }, [pathname]);

  // Monitor keyboard focus and resize interactions to detect user typing and virtual keyboard states
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
      // Height contraction of >15% on mobile indicates virtual keyboard overlay
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

  // Listen for CSP violations in development to capture blocked ad scripts
  useEffect(() => {
    if (typeof window === 'undefined' || process.env.NODE_ENV !== 'development') return;

    const handleCspViolation = (e: SecurityPolicyViolationEvent) => {
      const blockedUri = e.blockedURI || '';
      if (
        blockedUri.includes('highperformanceformat') ||
        blockedUri.includes('effectivecpmnetwork')
      ) {
        console.warn(
          `[Ad System CSP Warning] Blocked URI: ${blockedUri} via directive: ${e.violatedDirective}. Check your next.config.mjs CSP headers!`
        );
      }
    };

    window.addEventListener('securitypolicyviolation', handleCspViolation);
    return () => {
      window.removeEventListener('securitypolicyviolation', handleCspViolation);
    };
  }, []);

  return (
    <AdContext.Provider value={{ isScanning, setIsScanning, isTyping, isMobileKeyboardActive }}>
      {children}
    </AdContext.Provider>
  );
}
