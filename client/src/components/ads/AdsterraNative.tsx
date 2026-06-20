'use client';

import { useEffect, useRef } from 'react';

type AdsterraNativeProps = {
  className?: string;
};

export default function AdsterraNative({ className = '' }: AdsterraNativeProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return;
    if (containerRef.current.querySelector('script')) return;

    const adContainer = document.createElement('div');
    adContainer.id = 'container-6546c038dbbf040d39d1b8179e7743ca';

    const script = document.createElement('script');
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    script.src = 'https://pl29692252.effectivecpmnetwork.com/6546c038dbbf040d39d1b8179e7743ca/invoke.js';

    containerRef.current.appendChild(adContainer);
    containerRef.current.appendChild(script);
  }, []);

  return (
    <div className={`flex justify-center items-center my-6 w-full ${className}`}>
      <div
        ref={containerRef}
        className="w-full min-h-[250px] relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-surface-900/10 border border-white/5 rounded-lg -z-10" />
      </div>
    </div>
  );
}
