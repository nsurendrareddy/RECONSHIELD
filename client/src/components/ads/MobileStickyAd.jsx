'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import AdBlock from './AdBlock';

export default function MobileStickyAd() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Delay appearance slightly to ensure layout rendering is clean and user experience is smooth
    const timer = setTimeout(() => {
      if (!isDismissed) {
        setIsVisible(true);
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [isDismissed]);

  const handleClose = () => {
    setIsVisible(false);
    setIsDismissed(true);
  };

  if (isDismissed || !isVisible) return null;

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 p-2 bg-surface-950/90 backdrop-blur-md border-t border-white/5 flex flex-col items-center justify-center transition-transform duration-500 md:hidden ${
      isVisible ? 'translate-y-0' : 'translate-y-full'
    }`}>
      {/* Close Button Header */}
      <div className="w-full max-w-[320px] flex justify-end mb-1">
        <button
          onClick={handleClose}
          className="p-1 rounded-full bg-surface-900 border border-white/10 hover:border-red-500/30 text-gray-400 hover:text-white transition-all focus:outline-none"
          aria-label="Close Ad"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Ad block */}
      <AdBlock type="mobile-sticky" slot="5546372810" />
    </div>
  );
}
