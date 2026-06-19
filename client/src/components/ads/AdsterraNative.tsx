'use client';

import React, { useEffect, useRef } from 'react';

type AdsterraNativeProps = {
  className?: string;
};

export default function AdsterraNative({ className = '' }: AdsterraNativeProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return;
    
    // Prevent double injection
    if (containerRef.current.childNodes.length > 0) return;

    try {
      // 1. Create the target div required by Adsterra Native Banner
      const adContainer = document.createElement('div');
      adContainer.id = "container-6546c038dbbf040d39d1b8179e7743ca";
      
      // 2. Create the invocation script
      const invokeScript = document.createElement('script');
      invokeScript.type = 'text/javascript';
      invokeScript.async = true;
      invokeScript.setAttribute('data-cfasync', 'false');
      invokeScript.src = "https://pl29692252.effectivecpmnetwork.com/6546c038dbbf040d39d1b8179e7743ca/invoke.js";

      // Append to the isolated wrapper container
      containerRef.current.appendChild(adContainer);
      containerRef.current.appendChild(invokeScript);
    } catch (error) {
      console.warn('Adsterra native injection failed:', error);
    }
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
