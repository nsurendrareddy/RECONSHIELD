"use client";

import { useEffect, useRef, useState } from 'react';

export default function NativeBanner() {
  const containerRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    // Clear any previous elements to avoid duplicates
    containerRef.current.innerHTML = '';

    const containerDiv = document.createElement('div');
    containerDiv.id = 'container-6546c038dbbf040d39d1b8179e7743ca';
    containerRef.current.appendChild(containerDiv);

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://pl29692252.effectivecpmnetwork.com/6546c038dbbf040d39d1b8179e7743ca/invoke.js';
    script.setAttribute('data-cfasync', 'false');

    containerRef.current.appendChild(script);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div className="w-full my-8 flex justify-center bg-surface-900/10 rounded-lg overflow-hidden min-h-[150px]">
      <div ref={containerRef} className="w-full max-w-4xl" />
    </div>
  );
}
