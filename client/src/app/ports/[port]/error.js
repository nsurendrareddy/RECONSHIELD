'use client';
import { useEffect } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';
import Link from 'next/link';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error('Ports page error:', error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6">
        <AlertTriangle className="w-10 h-10 text-red-500" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-4">Rendering Error</h2>
      <p className="text-gray-400 mb-8 max-w-md text-center">
        We encountered an error loading this port's intelligence data.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="px-6 py-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl hover:bg-red-500/20 transition-all flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" /> Try Again
        </button>
        <Link 
          href="/" 
          className="px-6 py-2 bg-white/5 text-white border border-white/10 rounded-xl hover:bg-white/10 transition-all"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
