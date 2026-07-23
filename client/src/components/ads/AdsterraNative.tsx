'use client';

import { useEffect, useRef, useState, memo } from 'react';
import { usePathname } from 'next/navigation';
import { AdManager, AdPriority, AdStatus } from '@/lib/AdManager';


type AdsterraNativeProps = {
  className?: string;
  priority?: AdPriority;
};

const INVOKE_URL = 'https://pl29692252.effectivecpmnetwork.com/6546c038dbbf040d39d1b8179e7743ca/invoke.js';
const AD_TIMEOUT_MS = 8000;

function AdsterraNativeInner({ className = '', priority = 'normal' }: AdsterraNativeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [adState, setAdState] = useState<AdStatus>('idle');
  const instanceId = useRef(Math.random().toString(36).substring(2, 9));
  const pathname = usePathname();

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Unique ID combining component instance and type
    const zoneId = `native-${instanceId.current}`;

    AdManager.registerZone({
      id: zoneId,
      type: 'native',
      container: containerRef.current,
      priority,
      invokeUrl: INVOKE_URL,
      onStatusChange: (status) => setAdState(status)
    });

    return () => {
      AdManager.unregisterZone(zoneId, containerRef.current);
    };
  }, [priority, pathname]);

  if (adState === 'failed') return null;

  const sizeStyles =
    adState === 'filled'
      ? { opacity: 1, minHeight: 250, height: 'auto', transition: 'opacity 400ms ease' }
      : adState === 'loading'
      ? { opacity: 1, minHeight: 250 }
      : { minHeight: 250, margin: 0, padding: 0, opacity: 1, overflow: 'hidden' as const };

  return (
    <div
      className={`not-prose w-full ${adState === 'filled' ? className : ''}`}
      style={sizeStyles}
    >
      {adState !== 'filled' && (
        <div className="ad-skeleton w-full" style={{ height: 250, position: 'absolute' }} aria-hidden="true" />
      )}
      <div ref={containerRef} className="w-full relative overflow-hidden" />
    </div>
  );
}

const AdsterraNative = memo(AdsterraNativeInner);
export default AdsterraNative;
