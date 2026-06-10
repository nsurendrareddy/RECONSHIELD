"use client";

import { useEffect, useRef, useState } from 'react';

export default function Ad728x90() {
  const containerRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    // Clear any previous elements to avoid duplicate IFRAMEs
    containerRef.current.innerHTML = '';

    const conf = document.createElement('script');
    conf.innerHTML = `
      atOptions = {
        'key' : 'ad055ae12ee78ddc0ebf1be2e3a5830f',
        'format' : 'iframe',
        'height' : 90,
        'width' : 728,
        'params' : {}
      };
    `;

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://www.highperformanceformat.com/ad055ae12ee78ddc0ebf1be2e3a5830f/invoke.js';
    script.async = true;

    containerRef.current.appendChild(conf);
    containerRef.current.appendChild(script);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div className="hidden md:flex justify-center my-6 min-h-[90px] w-full bg-surface-900/10 rounded-lg overflow-hidden">
      <div ref={containerRef} style={{ width: '728px', height: '90px' }} />
    </div>
  );
}
