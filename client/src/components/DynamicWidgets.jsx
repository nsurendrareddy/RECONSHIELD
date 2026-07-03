'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

// A high-performance IntersectionObserver wrapper to defer heavy client components until they are close to the viewport
function ViewportDeferred({ children, height = '300px', className = '' }) {
  const [hasRendered, setHasRendered] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasRendered(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' } // Load slightly before coming into view to prevent visual layout shifts
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} style={{ minHeight: hasRendered ? 'auto' : height }} className={className}>
      {hasRendered ? children : null}
    </div>
  );
}

// Hero element is deferred with a large rootMargin so it still loads before the user sees it,
// but its JS (setInterval timers, animation states) only initialises when the hero is near the viewport.
const HeroSocVisualComp = dynamic(() => import('@/components/HeroSocVisual'), {
  ssr: false,
  loading: () => <div className="w-full max-w-lg mx-auto min-h-[352px] bg-surface-900/20 border border-white/5 rounded-2xl animate-pulse" />,
});
export const DynamicHeroSocVisual = (props) => (
  <ViewportDeferred height="352px" className="w-full max-w-lg mx-auto">
    <HeroSocVisualComp {...props} />
  </ViewportDeferred>
);


// Newsletter is very light and can load immediately
export const DynamicNewsletterForm = dynamic(() => import('@/components/NewsletterForm'), { ssr: false });

// Defer other heavy sections using ViewportDeferred wrapper
const TopActiveThreatsComp = dynamic(() => import('@/components/TopActiveThreats'), {
  ssr: false,
  loading: () => <div className="w-full min-h-[380px] bg-surface-900/20 border border-white/5 rounded-2xl animate-pulse" />
});
export const DynamicTopActiveThreats = (props) => (
  <ViewportDeferred height="380px">
    <TopActiveThreatsComp {...props} />
  </ViewportDeferred>
);

const CommandCenterComp = dynamic(() => import('@/components/CommandCenter'), {
  ssr: false,
  loading: () => <div className="w-full min-h-[500px] bg-surface-950/20 border border-white/5 rounded-2xl animate-pulse" />
});
export const DynamicCommandCenter = (props) => (
  <ViewportDeferred height="500px">
    <CommandCenterComp {...props} />
  </ViewportDeferred>
);

const SecurityWorkflowComp = dynamic(() => import('@/components/SecurityWorkflow'), {
  ssr: false,
  loading: () => <div className="w-full min-h-[600px] bg-surface-950/20 border border-white/5 rounded-2xl animate-pulse" />
});
export const DynamicSecurityWorkflow = (props) => (
  <ViewportDeferred height="600px">
    <SecurityWorkflowComp {...props} />
  </ViewportDeferred>
);

const IntelligenceModulesComp = dynamic(() => import('@/components/IntelligenceModules'), {
  ssr: false,
  loading: () => <div className="w-full min-h-[500px] bg-surface-950/20 border border-white/5 rounded-2xl animate-pulse" />
});
export const DynamicIntelligenceModules = (props) => (
  <ViewportDeferred height="500px">
    <IntelligenceModulesComp {...props} />
  </ViewportDeferred>
);
