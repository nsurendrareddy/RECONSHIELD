'use client';

import React from 'react';
import dynamic from 'next/dynamic';

export const DynamicHeroSocVisual = dynamic(() => import('@/components/HeroSocVisual'), {
  ssr: false,
  loading: () => <div className="w-full max-w-lg mx-auto min-h-[352px] bg-surface-900/20 border border-white/5 rounded-2xl animate-pulse" />
});

export const DynamicTopActiveThreats = dynamic(() => import('@/components/TopActiveThreats'), {
  ssr: false,
  loading: () => <div className="w-full min-h-[380px] bg-surface-900/20 border border-white/5 rounded-2xl animate-pulse" />
});

export const DynamicNativeBanner = dynamic(() => import('@/components/ads/NativeBanner'), { ssr: false });

export const DynamicNewsletterForm = dynamic(() => import('@/components/NewsletterForm'), { ssr: false });
