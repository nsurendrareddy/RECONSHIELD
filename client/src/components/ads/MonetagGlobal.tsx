'use client';

import React from 'react';
import Script from 'next/script';

export default function MonetagGlobal() {
  return (
    <>
      {/* Monetag Vignette */}
      <Script
        id="monetag-vignette"
        src="https://n6wxm.com/vignette.min.js"
        data-zone="11124393"
        strategy="afterInteractive"
      />
      {/* Monetag In-Page Push */}
      <Script
        id="monetag-push"
        src="https://nap5k.com/tag.min.js"
        data-zone="11124391"
        strategy="afterInteractive"
      />
    </>
  );
}
