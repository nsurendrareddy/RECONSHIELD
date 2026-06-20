'use client';

import { useEffect, useRef, useState } from 'react';

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
  const [adFailed, setAdFailed] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current || adFailed) return;
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

    const hasRenderedAd = () => {
      if (!containerRef.current) return false;
      return Array.from(containerRef.current.children).some((child) => {
        if (child === inlineScript || child === script) return false;
        if (child.nodeName === 'SCRIPT' || child.nodeName === 'NOSCRIPT') return false;
        if (child instanceof HTMLElement && child.dataset.adsterraPlaceholder === 'true') return false;
        return true;
      });
    };

      const cleanupTimer = window.setTimeout(() => {
      if (!hasRenderedAd()) {
        setAdFailed(true);
        if (containerRef.current) {
          containerRef.current.innerHTML = '';
        }
      }
    }, 8000);

    script.onload = () => {
      if (hasRenderedAd()) {
        window.clearTimeout(cleanupTimer);
      }
    };

    script.onerror = () => {
      window.clearTimeout(cleanupTimer);
      setAdFailed(true);
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };

    containerRef.current.appendChild(inlineScript);
    containerRef.current.appendChild(script);

    return () => {
      window.clearTimeout(cleanupTimer);
      if (script.parentNode) script.parentNode.removeChild(script);
      if (inlineScript.parentNode) inlineScript.parentNode.removeChild(inlineScript);
    };
  }, [type, adFailed]);

  if (adFailed) return null;

  const sizeClass = type === '728x90'
    ? 'min-h-[90px] w-full max-w-[728px]'
    : 'min-h-[250px] w-full max-w-[300px]';

  return (
    <div className={`flex justify-center items-center my-6 w-full ${className}`}>
      <div
        ref={containerRef}
        className={`relative flex justify-center items-center overflow-hidden ${sizeClass}`}
      >
        <div
          data-adsterra-placeholder="true"
          className="absolute inset-0 bg-surface-900/10 border border-white/5 rounded-lg -z-10"
        />
      </div>
    </div>
  );
}
