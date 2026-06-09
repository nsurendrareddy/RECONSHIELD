"use client";

import { useEffect, useRef } from 'react';

export default function Adsterra300x250() {
  const adRef = useRef(null);

  useEffect(() => {
    if (adRef.current && !adRef.current.firstChild) {
      const atOptions = {
        'key': 'bff74f8eee55b4a3775d46c9295efe9a',
        'format': 'iframe',
        'height': 250,
        'width': 300,
        'params': {}
      };

      const conf = document.createElement('script');
      conf.innerHTML = `atOptions = ${JSON.stringify(atOptions)}`;

      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://www.highperformanceformat.com/bff74f8eee55b4a3775d46c9295efe9a/invoke.js';
      script.async = true;

      adRef.current.appendChild(conf);
      adRef.current.appendChild(script);
    }
  }, []);

  return (
    <div className="flex justify-center my-6 min-h-[250px] w-full bg-surface-900/10 rounded-lg overflow-hidden">
      <div ref={adRef} style={{ width: '300px', height: '250px' }} />
    </div>
  );
}
