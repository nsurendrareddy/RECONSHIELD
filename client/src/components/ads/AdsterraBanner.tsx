'use client';

import { useEffect, useRef, useState, memo } from 'react';
import { usePathname } from 'next/navigation';
import { AdManager, AdPriority, AdStatus } from '@/lib/AdManager';


type AdsterraBannerProps = {
  type: '728x90' | '300x250';
  className?: string;
  priority?: AdPriority;
};

const BANNER_CONFIGS = {
  '728x90': { key: 'ad055ae12ee78ddc0ebf1be2e3a5830f', width: 728, height: 90 },
  '300x250': { key: 'bff74f8eee55b4a3775d46c9295efe9a', width: 300, height: 250 }
};

const INVOKE_BASE = 'https://www.highperformanceformat.com';
const AD_TIMEOUT_MS = 8000;

function AdsterraBannerInner({ type, className = '', priority = 'normal' }: AdsterraBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [adState, setAdState] = useState<AdStatus>('idle');
  const instanceId = useRef(Math.random().toString(36).substring(2, 9));
  const pathname = usePathname();

  useEffect(() => {
    if (!containerRef.current) return;

    const config = BANNER_CONFIGS[type];
    if (!config) return;

    const atOptions = { key: config.key, format: 'iframe', height: config.height, width: config.width, params: {} };
    const invokeUrl = `${INVOKE_BASE}/${config.key}/invoke.js`;
    
    // Unique ID combining component instance and type
    const zoneId = `banner-${type}-${instanceId.current}`;

    AdManager.registerZone({
      id: zoneId,
      type,
      container: containerRef.current,
      priority,
      invokeUrl,
      atOptions,
      onStatusChange: (status) => setAdState(status)
    });

    return () => {
      AdManager.unregisterZone(zoneId, containerRef.current);
    };
  }, [type, priority, pathname]);

  if (adState === 'failed') return null;

  const config = BANNER_CONFIGS[type];
  const h = config.height;
  const w = type === '728x90' ? 'max-w-[728px]' : 'max-w-[300px]';

  const sizeStyles =
    adState === 'filled'
      ? { minHeight: h, opacity: 1, height: 'auto', transition: 'opacity 400ms ease' }
      : adState === 'loading'
      ? { height: h, opacity: 1 }
      : { height: h, margin: 0, padding: 0, opacity: 1, overflow: 'hidden' as const };

  return (
    <div
      className={`not-prose flex justify-center items-center w-full ${adState === 'filled' ? className : ''}`}
      style={sizeStyles}
    >
      {adState !== 'filled' && (
        <div className={`ad-skeleton w-full ${w}`} style={{ height: h, position: 'absolute' }} aria-hidden="true" />
      )}
      <div
        ref={containerRef}
        className={`relative flex justify-center items-center overflow-hidden w-full ${w}`}
        style={{ opacity: adState === 'filled' ? 1 : 0 }}
      />
    </div>
  );
}

const AdsterraBanner = memo(AdsterraBannerInner);
export default AdsterraBanner;
