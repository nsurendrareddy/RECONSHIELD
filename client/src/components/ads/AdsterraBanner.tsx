'use client';

import React, { useEffect, useRef } from 'react';

type AdsterraBannerProps = {
  type: '728x90' | '300x250';
  className?: string;
};

export default function AdsterraBanner({ type, className = '' }: AdsterraBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Define configurations for different banner types
  const adConfig = type === '728x90' 
    ? { key: 'ad055ae12ee78ddc0ebf1be2e3a5830f', width: 728, height: 90 }
    : { key: 'bff74f8eee55b4a3775d46c9295efe9a', width: 300, height: 250 };

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return;
    
    // Prevent double injection (especially in React Strict Mode)
    if (containerRef.current.childNodes.length > 0) return;

    try {
      // 1. Inject the configuration script
      const confScript = document.createElement('script');
      confScript.type = 'text/javascript';
      confScript.innerHTML = `
        atOptions = {
          'key' : '${adConfig.key}',
          'format' : 'iframe',
          'height' : ${adConfig.height},
          'width' : ${adConfig.width},
          'params' : {}
        };
      `;
      
      // 2. Inject the invocation script
      const invokeScript = document.createElement('script');
      invokeScript.type = 'text/javascript';
      invokeScript.src = `https://www.highperformanceformat.com/${adConfig.key}/invoke.js`;
      invokeScript.async = true;

      containerRef.current.appendChild(confScript);
      containerRef.current.appendChild(invokeScript);
    } catch (error) {
      console.warn('Adsterra banner injection failed:', error);
    }
  }, [adConfig]);

  // Use tailwind classes to reserve space and prevent Cumulative Layout Shift (CLS)
  const sizeClass = type === '728x90' 
    ? 'min-h-[90px] w-full max-w-[728px]' 
    : 'min-h-[250px] w-full max-w-[300px]';

  return (
    <div className={`flex justify-center items-center my-6 w-full ${className}`}>
      <div 
        ref={containerRef} 
        className={`relative flex justify-center items-center overflow-hidden ${sizeClass}`}
      >
        {/* Placeholder gradient / subtle border before ad loads */}
        <div className="absolute inset-0 bg-surface-900/10 border border-white/5 rounded-lg -z-10" />
      </div>
    </div>
  );
}
