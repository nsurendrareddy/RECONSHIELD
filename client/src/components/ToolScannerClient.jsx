'use client'
import React from 'react';
import { useScan } from '@/hooks/useScan';
import SearchBar from '@/components/SearchBar';
import LoadingState from '@/components/LoadingState';
import { motion } from 'framer-motion';

export default function ToolScannerClient({ toolId, config }) {
  const { status, scanData, domain, scan, scanProgress, progress, reset } = useScan();
  const results = scanData?.results || {};

  return (
    <div className="max-w-5xl mx-auto py-12">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4 mb-10"
      >
        <div className="w-14 h-14 rounded-2xl bg-matrix-400/10 border border-matrix-400/20 flex items-center justify-center text-matrix-400">
          {React.cloneElement(config.icon, { size: 28 })}
        </div>
        <div>
          <h1 className="text-3xl font-display font-bold text-white uppercase tracking-wider">{config.title}</h1>
          <p className="text-gray-500 font-mono text-sm mt-1">{config.desc}</p>
        </div>
      </motion.div>

      <div className="glass-card p-8 mb-10">
        <SearchBar onScan={scan} isScanning={status === 'scanning'} />
      </div>

      {status === 'scanning' && (
        <LoadingState progress={progress} domain={domain} scanProgress={scanProgress} />
      )}

      {status === 'completed' && scanData && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between p-4 bg-matrix-400/5 border border-matrix-400/10 rounded-xl mb-6">
            <span className="font-mono text-xs text-matrix-400 uppercase font-bold">Analysis Results for: {domain}</span>
            <button onClick={reset} className="text-[10px] font-mono text-gray-500 hover:text-matrix-400 uppercase underline">New Analysis</button>
          </div>
          
          <config.section data={results[config.dataKey]} />
        </motion.div>
      )}

    </div>
  );
}
