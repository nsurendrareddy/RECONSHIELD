"use client";

import { useEffect, useRef, useState } from 'react';

export default function Ad300x250() {
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
        'key' : 'bff74f8eee55b4a3775d46c9295efe9a',
        'format' : 'iframe',
        'height' : 250,
        'width' : 300,
        'params' : {}
      };
    `;

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://www.highperformanceformat.com/bff74f8eee55b4a3775d46c9295efe9a/invoke.js';
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
    <div className="flex justify-center my-6 min-h-[250px] w-full bg-surface-900/10 rounded-lg overflow-hidden">
      <div ref={containerRef} style={{ width: '300px', height: '250px' }} />
    </div>
  );
}
