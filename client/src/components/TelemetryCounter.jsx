'use client';

import React, { useEffect, useState, useRef } from 'react';

export default function TelemetryCounter({ targetValue, duration = 1500, suffix = '', prefix = '' }) {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);

  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Use easeOutQuad for smoother visual deceleration
      const easeProgress = progress * (2 - progress);
      const currentCount = Math.floor(easeProgress * targetValue);
      
      setCount(currentCount);
      
      if (progress < 1) {
        countRef.current = requestAnimationFrame(step);
      }
    };
    
    countRef.current = requestAnimationFrame(step);
    
    return () => {
      if (countRef.current) {
        cancelAnimationFrame(countRef.current);
      }
    };
  }, [targetValue, duration]);

  // Format with commas if it's a large integer
  const formattedCount = count.toLocaleString('en-US');

  return (
    <span>
      {prefix}
      {formattedCount}
      {suffix}
    </span>
  );
}
