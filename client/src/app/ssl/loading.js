import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
      <div className="w-16 h-16 border-4 border-white/10 border-t-[#00ff88] rounded-full animate-spin mb-6"></div>
      <h2 className="text-xl font-mono text-white mb-2">Analyzing Entity...</h2>
      <p className="text-gray-500 font-mono text-sm max-w-md text-center">
        ReconShield is mapping relations and fetching intelligence data. This may take a moment.
      </p>
    </div>
  );
}
