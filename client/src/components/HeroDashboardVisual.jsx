'use client';

import React from 'react';
import { Shield, Lock, Activity, Globe, CheckCircle, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeroDashboardVisual() {
  const securityChecks = [
    { label: 'TLS Cryptography', status: 'secure', value: '1.3' },
    { label: 'DNSSEC Validation', status: 'secure', value: 'active' },
    { label: 'SPF/DMARC Record', status: 'secure', value: 'strict' },
    { label: 'HTTP Security Headers', status: 'warning', value: 'missing' }
  ];

  return (
    <div className="relative w-full max-w-md mx-auto h-[380px] flex items-center justify-center select-none">
      {/* Background glowing particles/circles */}
      <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-[#00ff88]/5 blur-3xl rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-cyan-500/5 blur-2xl rounded-full" />

      {/* Floating Card 1: Main Security Rating Dashboard */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: [0, -10, 0] }}
        transition={{ 
          y: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
          opacity: { duration: 0.8 }
        }}
        className="absolute w-[280px] bg-surface-900/80 backdrop-blur-xl border border-white/10 p-5 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] z-20"
      >
        <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-matrix-400" />
            <span className="text-[10px] font-mono text-white font-bold uppercase tracking-wider">SEC_MONITOR</span>
          </div>
          <span className="text-[8px] font-mono bg-matrix-400/10 text-matrix-400 px-1.5 py-0.5 rounded uppercase font-bold">ONLINE</span>
        </div>

        {/* Big Score Gauge */}
        <div className="flex items-center justify-between py-2">
          <div>
            <span className="text-[8px] font-mono text-gray-500 uppercase">SECURITY GRADE</span>
            <h4 className="text-2xl font-bold font-display text-white mt-0.5">GRADE A</h4>
            <span className="text-[9px] font-mono text-matrix-400">92/100 RATING</span>
          </div>
          <div className="w-14 h-14 rounded-full border-2 border-matrix-400/20 flex items-center justify-center relative">
            <div className="absolute inset-0.5 rounded-full border-2 border-matrix-400 border-t-transparent animate-spin [animation-duration:8s]" />
            <span className="text-xs font-mono font-bold text-white">92</span>
          </div>
        </div>

        {/* Minimal metrics row */}
        <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-white/5 text-[9px] font-mono text-gray-500">
          <div>
            <span>EXPOSED PORTS:</span> <span className="text-white ml-0.5 font-bold">0</span>
          </div>
          <div>
            <span>SSL TRUST:</span> <span className="text-matrix-400 ml-0.5 font-bold">EXCELLENT</span>
          </div>
        </div>
      </motion.div>

      {/* Floating Card 2: Security Handshake Audits */}
      <motion.div 
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: [0, 8, 0] }}
        transition={{ 
          y: { duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 },
          opacity: { duration: 0.8, delay: 0.3 }
        }}
        className="absolute top-6 right-2 w-[220px] bg-surface-950/80 backdrop-blur-xl border border-white/5 p-4 rounded-xl shadow-[0_15px_30px_rgba(0,0,0,0.5)] z-10"
      >
        <span className="text-[8px] font-mono text-gray-500 uppercase tracking-widest block mb-2">// RUNTIME CHECKS</span>
        
        <div className="space-y-2">
          {securityChecks.map((check, i) => (
            <div key={i} className="flex items-center justify-between text-[9px] font-mono border-b border-white/[0.03] pb-1">
              <span className="text-gray-400">{check.label}</span>
              <span className={`font-bold ${check.status === 'secure' ? 'text-matrix-400' : 'text-amber-500'}`}>
                {check.value}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Floating Card 3: Traffic Threat Telemetry graph */}
      <motion.div 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: [0, -6, 0] }}
        transition={{ 
          y: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2 },
          opacity: { duration: 0.8, delay: 0.5 }
        }}
        className="absolute bottom-6 left-2 w-[220px] bg-[#05080f]/90 backdrop-blur-xl border border-white/5 p-4 rounded-xl shadow-[0_15px_30px_rgba(0,0,0,0.5)] z-30"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-[8px] font-mono text-gray-500 uppercase tracking-widest block">// EXPOSURE SCAN LOGS</span>
          <Activity className="w-3 h-3 text-[#38bdf8] animate-pulse" />
        </div>
        
        {/* Simulating mini chart SVG */}
        <div className="h-10 w-full bg-surface-950 rounded border border-white/5 relative overflow-hidden flex items-end">
          <svg className="w-full h-full p-1 stroke-cyan-500 fill-none" viewBox="0 0 100 30">
            <path d="M0,25 L10,15 L20,20 L30,5 L40,25 L50,10 L60,18 L70,8 L80,22 L90,12 L100,5" strokeWidth="1.5" />
          </svg>
        </div>
        <div className="flex items-center justify-between text-[7px] font-mono text-gray-500 mt-2">
          <span>08:00</span>
          <span>12:00</span>
          <span>16:00</span>
        </div>
      </motion.div>
    </div>
  );
}
