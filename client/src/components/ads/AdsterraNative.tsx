'use client';

import { useEffect, useRef, useState } from 'react';

type AdsterraNativeProps = {
  className?: string;
};

export default function AdsterraNative({ className = '' }: AdsterraNativeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [adFailed, setAdFailed] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current || adFailed) return;
    if (containerRef.current.querySelector('script')) return;

    const adContainer = document.createElement('div');
    adContainer.id = 'container-6546c038dbbf040d39d1b8179e7743ca';

    const script = document.createElement('script');
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    script.src = 'https://pl29692252.effectivecpmnetwork.com/6546c038dbbf040d39d1b8179e7743ca/invoke.js';

    const hasRenderedAd = () => {
      if (!containerRef.current) return false;
      const hasContainerChildren = adContainer.children.length > 0;
      const hasAdditionalChildren = Array.from(containerRef.current.children).some((child) => {
        if (child === adContainer || child === script) return false;
        if (child.nodeName === 'SCRIPT' || child.nodeName === 'NOSCRIPT') return false;
        if (child instanceof HTMLElement && child.dataset.adsterraPlaceholder === 'true') return false;
        return true;
      });
      return hasContainerChildren || hasAdditionalChildren;
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

    containerRef.current.appendChild(adContainer);
    containerRef.current.appendChild(script);

    return () => {
      window.clearTimeout(cleanupTimer);
      if (script.parentNode) script.parentNode.removeChild(script);
      if (adContainer.parentNode) adContainer.parentNode.removeChild(adContainer);
    };
  }, [adFailed]);

  if (adFailed) return null;

  return (
    <div className={`flex justify-center items-center my-6 w-full ${className}`}>
      <div
        ref={containerRef}
        className="w-full min-h-[250px] relative overflow-hidden"
      >
        <div
          data-adsterra-placeholder="true"
          className="absolute inset-0 bg-surface-900/10 border border-white/5 rounded-lg -z-10"
        />
      </div>
    </div>
  );
}
