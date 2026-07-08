'use client';

import { useEffect, useRef, useState, memo } from 'react';
import { AdManager, AdPriority, AdStatus } from '@/lib/AdManager';


type AdsterraNativeProps = {
  className?: string;
  priority?: AdPriority;
};

const INVOKE_URL = 'https://pl29692252.effectivecpmnetwork.com/6546c038dbbf040d39d1b8179e7743ca/invoke.js';
const AD_TIMEOUT_MS = 8000;

// Ensure skeleton styles exist (shared with AdsterraBanner)
const SKELETON_STYLE_ID = 'ad-skeleton-style';
function ensureSkeletonStyles() {
  if (typeof document === 'undefined' || document.getElementById(SKELETON_STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = SKELETON_STYLE_ID;
  style.textContent = `
    @keyframes adSkeletonShimmer {
      0%   { background-position: -400px 0; }
      100% { background-position: 400px 0; }
    }
    .ad-skeleton {
      background: linear-gradient(90deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.07) 40%, rgba(255,255,255,0.03) 80%);
      background-size: 800px 100%;
      animation: adSkeletonShimmer 1.6s ease-in-out infinite;
      border-radius: 8px;
    }
  `;
  document.head.appendChild(style);
}

function AdsterraNativeInner({ className = '', priority = 'normal' }: AdsterraNativeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [adState, setAdState] = useState<AdStatus>('idle');
  const instanceId = useRef(Math.random().toString(36).substring(2, 9));

  useEffect(() => {
    ensureSkeletonStyles();
  }, []);

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
  }, [priority]);

  if (adState === 'failed') return null;

  const sizeStyles =
    adState === 'filled'
      ? { opacity: 1, minHeight: 250, height: 'auto', transition: 'opacity 400ms ease' }
      : adState === 'loading'
      ? { opacity: 1, minHeight: 250 }
      : { height: 0, margin: 0, padding: 0, opacity: 0, overflow: 'hidden' as const };

  return (
    <div
      className={`not-prose w-full ${adState === 'filled' ? className : ''}`}
      style={sizeStyles}
    >
      {adState !== 'filled' && (
        <div className="ad-skeleton w-full" style={{ height: 250, position: 'absolute' }} aria-hidden="true" />
      )}
      <div ref={containerRef} className="w-full relative overflow-hidden" style={{ opacity: adState === 'filled' ? 1 : 0 }} />
    </div>
  );
}

const AdsterraNative = memo(AdsterraNativeInner);
export default AdsterraNative;
