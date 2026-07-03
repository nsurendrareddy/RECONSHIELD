'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Show banner only if the user hasn't set their preferences yet
    if (localStorage.getItem('cookieConsent') === null) {
      setShow(true);
    }
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md bg-[#0d1117]/95 backdrop-blur-md border border-[#1a2332] p-5 rounded-xl z-[999] flex flex-col gap-4 font-sans text-xs shadow-[0_10px_40px_rgba(0,0,0,0.6)] animate-fade-in">
      <div className="flex items-start gap-3">
        <div className="w-2 h-2 rounded-full bg-[#00ff88] mt-1.5 animate-pulse shrink-0" />
        <div>
          <h4 className="font-mono text-[11px] font-bold text-white uppercase tracking-wider mb-1">Cookie Consent Required</h4>
          <p className="text-gray-400 leading-relaxed font-light">
            We use cookies to analyze web traffic and deliver personalized advertising. Please select your preference. 
            <Link href="/privacy" className="text-[#00ff88] hover:text-[#00ff88]/80 ml-1 font-medium underline">Privacy Policy</Link>
          </p>
        </div>
      </div>
      <div className="flex items-center justify-end gap-2.5 font-mono">
        <button 
          onClick={() => {
            localStorage.setItem('cookieConsent', 'false');
            setShow(false);
            if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
              window.gtag('consent', 'update', {
                analytics_storage: 'denied',
                ad_storage: 'denied',
              });
            }
          }}
          className="px-4 py-2 border border-white/10 hover:border-white/20 text-gray-400 hover:text-white rounded-lg transition-all text-[10px] tracking-wider uppercase active:scale-95"
        >
          Decline
        </button>
        <button 
          onClick={() => {
            localStorage.setItem('cookieConsent', 'true');
            setShow(false);
            if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
              window.gtag('consent', 'update', {
                analytics_storage: 'granted',
                ad_storage: 'granted',
              });
            }
          }}
          className="px-5 py-2 bg-[#00ff88] text-surface-950 font-bold rounded-lg hover:bg-[#00ff88]/85 transition-all text-[10px] tracking-wider uppercase shadow-lg shadow-[#00ff88]/15 active:scale-95"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
