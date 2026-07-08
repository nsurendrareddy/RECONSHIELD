'use client';

import Script from 'next/script';

const SOCIAL_BAR_SCRIPT_ID = 'adsterra-social-bar';
const SOCIAL_BAR_SRC = 'https://pl29692251.effectivecpmnetwork.com/06/ea/fc/06eafc4004351bf68b0c5aa80b3255c9.js';

export default function AdsterraSocialBar() {
  return (
    <Script
      id={SOCIAL_BAR_SCRIPT_ID}
      src={SOCIAL_BAR_SRC}
      strategy="afterInteractive"
      onLoad={() => {
        if (process.env.NODE_ENV === 'development') {
          console.log('[Adsterra] Social Bar — loaded');
        }
      }}
      onError={(e) => {
        if (process.env.NODE_ENV === 'development') {
          console.warn('[Adsterra] Social Bar — failed to load', e);
        }
      }}
    />
  );
}
