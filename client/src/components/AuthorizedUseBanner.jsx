'use client'
import React, { useState, useEffect } from 'react';
import { ShieldAlert } from 'lucide-react';

export default function AuthorizedUseBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasConsented = localStorage.getItem('reconshield_authorized_use_consent');
    if (!hasConsented) {
      setIsVisible(true);
    }
  }, []);

  const handleConsent = () => {
    localStorage.setItem('reconshield_authorized_use_consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-[#0a0d14]/95 backdrop-blur-md border-t border-red-500/20 shadow-[0_-10px_40px_rgba(239,68,68,0.1)]">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 border border-red-500/20">
            <ShieldAlert className="w-5 h-5 text-red-500" />
          </div>
          <div>
            <h3 className="text-white font-bold text-sm mb-1 uppercase tracking-wider font-mono">Authorized-Use Consent</h3>
            <p className="text-gray-400 text-xs leading-relaxed max-w-3xl">
              ReconShield tools are intended solely for authorized security auditing and defensive research. By continuing, you confirm you own this infrastructure or have explicit permission to assess it. Unauthorized scanning may violate applicable laws and regulations.
            </p>
          </div>
        </div>
        <button 
          onClick={handleConsent}
          className="w-full md:w-auto px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold text-xs uppercase tracking-widest rounded-lg transition-colors shrink-0 whitespace-nowrap shadow-[0_0_15px_rgba(239,68,68,0.3)] hover:shadow-[0_0_25px_rgba(239,68,68,0.5)]"
        >
          I Confirm Authorized Security Use
        </button>
      </div>
    </div>
  );
}
