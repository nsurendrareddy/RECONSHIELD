'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('cookieConsent')) {
      setShow(true);
    }
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#0d1117] border-t border-matrix-400/20 p-4 z-50 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs shadow-[0_-10px_30px_rgba(0,255,136,0.05)]">
      <p className="text-gray-400">
        ReconShield uses cookies for analytics and serving personalized Google AdSense advertising. By continuing to use this platform, you consent to our use of cookies. 
        <Link href="/privacy" className="text-matrix-400 ml-2 hover:underline">Read Privacy Policy</Link>
      </p>
      <button 
        onClick={() => {
          localStorage.setItem('cookieConsent', 'true');
          setShow(false);
        }}
        className="px-6 py-2 bg-matrix-400 text-surface-950 font-bold rounded-md hover:bg-matrix-300 transition-colors whitespace-nowrap tracking-wider uppercase"
      >
        Accept
      </button>
    </div>
  );
}
