'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error('Entity Route Error:', error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
      <div className="w-20 h-20 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6">
        <AlertTriangle className="w-10 h-10 text-red-500" />
      </div>
      <h2 className="text-2xl font-bold text-white mb-4">Entity Analysis Failed</h2>
      <p className="text-gray-400 max-w-md text-center mb-8">
        We encountered an issue while attempting to resolve the data for this entity. The target may be unreachable, invalid, or blocking our scanners.
      </p>
      <div className="flex items-center gap-4">
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-colors font-semibold border border-white/10"
        >
          Try Again
        </button>
        <Link
          href="/tools"
          className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-colors font-semibold shadow-[0_0_20px_rgba(239,68,68,0.3)]"
        >
          Return to Tools
        </Link>
      </div>
    </div>
  );
}
