"use client";

import { useState, useEffect } from 'react';

/**
 * useUserInteraction
 * Defers loading of heavy third-party assets (like ads, analytics, tracking, etc.)
 * until a user interaction is detected (scroll, touch, mouse, key) or a fallback delay.
 * 
 * @param {number} delayMs Fallback delay before auto-triggering (default: 4000ms)
 * @returns {boolean} Whether user interaction has occurred or timeout reached
 */
export default function useUserInteraction(delayMs = 4000) {
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    let triggered = false;

    const trigger = () => {
      if (triggered) return;
      triggered = true;
      setHasInteracted(true);
      cleanup();
    };

    const cleanup = () => {
      if (typeof window === 'undefined') return;
      window.removeEventListener('scroll', trigger);
      window.removeEventListener('mousemove', trigger);
      window.removeEventListener('touchstart', trigger);
      window.removeEventListener('keydown', trigger);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', trigger, { passive: true });
      window.addEventListener('mousemove', trigger, { passive: true });
      window.addEventListener('touchstart', trigger, { passive: true });
      window.addEventListener('keydown', trigger, { passive: true });
    }

    // Fallback: trigger after delay if no interaction occurs
    const timer = setTimeout(trigger, delayMs);

    return () => {
      cleanup();
      clearTimeout(timer);
    };
  }, [delayMs]);

  return hasInteracted;
}
