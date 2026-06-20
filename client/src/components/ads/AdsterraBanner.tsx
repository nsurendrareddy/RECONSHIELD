'use client';

import { useEffect, useRef } from 'react';

type AdsterraBannerProps = {
  type: '728x90' | '300x250';
  className?: string;
};

const BANNER_CONFIGS = {
  '728x90': { key: 'ad055ae12ee78ddc0ebf1be2e3a5830f', width: 728, height: 90 },
  '300x250': { key: 'bff74f8eee55b4a3775d46c9295efe9a', width: 300, height: 250 }
};

export default function AdsterraBanner({ type, className = '' }: AdsterraBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return;
    if (containerRef.current.querySelector('script')) return;

    const config = BANNER_CONFIGS[type];
    if (!config) return;

    const atOptions = {
      key: config.key,
      format: 'iframe',
      height: config.height,
      width: config.width,
      params: {}
    };

    ;(window as any).atOptions = atOptions;

    const inlineScript = document.createElement('script');
    inlineScript.type = 'text/javascript';
    inlineScript.text = `window.atOptions = ${JSON.stringify(atOptions)};`;

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://www.highperformanceformat.com/${config.key}/invoke.js`;
    script.async = true;

    containerRef.current.appendChild(inlineScript);
    containerRef.current.appendChild(script);
  }, [type]);

  const sizeClass = type === '728x90'
    ? 'min-h-[90px] w-full max-w-[728px]'
    : 'min-h-[250px] w-full max-w-[300px]';

  return (
    <div className={`flex justify-center items-center my-6 w-full ${className}`}>
      <div
        ref={containerRef}
        className={`relative flex justify-center items-center overflow-hidden ${sizeClass}`}
      >
        <div className="absolute inset-0 bg-surface-900/10 border border-white/5 rounded-lg -z-10" />
      </div>
    </div>
  );
}
