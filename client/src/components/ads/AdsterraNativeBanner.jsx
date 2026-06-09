"use client";

import { useEffect, useRef } from 'react';

export default function AdsterraNativeBanner() {
  const adRef = useRef(null);

  useEffect(() => {
    if (adRef.current && !adRef.current.firstChild) {
      const container = document.createElement('div');
      container.id = 'container-6546c038dbbf040d39d1b8179e7743ca';
      
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = 'https://pl29692252.effectivecpmnetwork.com/6546c038dbbf040d39d1b8179e7743ca/invoke.js';
      script.setAttribute('data-cfasync', 'false');

      adRef.current.appendChild(container);
      adRef.current.appendChild(script);
    }
  }, []);

  return (
    <div ref={adRef} className="w-full my-6 min-h-[150px] flex justify-center bg-surface-900/10 rounded-lg overflow-hidden" />
  );
}
