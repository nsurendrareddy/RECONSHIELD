'use client';

import React, { useState, useEffect } from 'react';
import { Terminal, Shield, Cpu, Activity, Lock, Globe } from 'lucide-react';

export default function HeroSocVisual() {
  const [logs, setLogs] = useState([
    'INIT: Security analysis subsystem starting...',
    'SYSTEM: Memory buffers cleared. SSL/TLS hooks active.',
  ]);

  const [threatScore, setThreatScore] = useState(12);
  const [uptime, setUptime] = useState(99.98);

  useEffect(() => {
    const mockLogs = [
      'CHECK: Checking DNS SPF policy constraints...',
      'VERIFY: Analyzing TLS cipher negotiating suites...',
      'AUDIT: Port validation checks executed.',
      'PASSIVE: Querying WHOIS cache repositories...',
      'INTEL: Parsing CVE threat intelligence feeds...',
      'DMARC: Validating alignment parameters...',
      'SUCCESS: SSL certificate verification completed.',
      'SECURE: Server header check completed: no leaks found.',
    ];

    const interval = setInterval(() => {
      // Append a random log
      const randomLog = mockLogs[Math.floor(Math.random() * mockLogs.length)];
      const timestamp = new Date().toLocaleTimeString();
      setLogs((prev) => [`[${timestamp}] ${randomLog}`, ...prev.slice(0, 5)]);
      
      // Slightly fluctuate score & uptime for dynamic effect
      setThreatScore((prev) => Math.max(0, Math.min(100, Math.floor(prev + (Math.random() * 4 - 2)))));
      setUptime((prev) => Math.min(100, Number((prev + (Math.random() * 0.02 - 0.01)).toFixed(4))));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-lg mx-auto bg-surface-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-2xl relative overflow-hidden font-mono text-[10px] text-gray-400">
      {/* Glow Effects */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-matrix-500/10 blur-xl rounded-full" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/5 blur-2xl rounded-full" />

      {/* Header Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-4">
        <div className="flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5 text-matrix-400 animate-pulse" />
          <span className="text-white font-bold tracking-widest text-[9px] uppercase">SOC ACTIVE TELEMETRY</span>
        </div>
        <div className="flex gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-matrix-400 animate-ping" />
          <span className="text-[8px] text-matrix-400">LIVE FEED</span>
        </div>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="p-3 bg-surface-950/40 border border-white/5 rounded-lg flex flex-col justify-between">
          <span className="text-[8px] text-gray-500 uppercase">SYS INTEGRITY</span>
          <span className="text-xs font-bold text-[#00ff88] mt-1">{uptime}%</span>
        </div>
        <div className="p-3 bg-surface-950/40 border border-white/5 rounded-lg flex flex-col justify-between">
          <span className="text-[8px] text-gray-500 uppercase">THREAT LEVEL</span>
          <span className="text-xs font-bold text-amber-500 mt-1">LOW ({threatScore})</span>
        </div>
        <div className="p-3 bg-surface-950/40 border border-white/5 rounded-lg flex flex-col justify-between">
          <span className="text-[8px] text-gray-500 uppercase">ACTIVE CHECKS</span>
          <span className="text-xs font-bold text-blue-400 mt-1">7 MODULES</span>
        </div>
      </div>

      {/* Radar Graphic Sweeper */}
      <div className="relative h-24 bg-surface-950/60 border border-white/5 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full border border-matrix-500/10 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full border border-matrix-500/20 flex items-center justify-center" />
          </div>
        </div>
        {/* Sweep Hand */}
        <div className="absolute inset-0 origin-center bg-gradient-to-r from-matrix-400/0 via-matrix-400/0 to-matrix-400/15 animate-[spin_5s_linear_infinite]" />
        
        {/* Target Points */}
        <div className="absolute top-8 left-16 w-1.5 h-1.5 rounded-full bg-[#00ff88] shadow-[0_0_8px_#00ff88] animate-ping" />
        <div className="absolute bottom-6 right-20 w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_#38bdf8] animate-ping [animation-delay:2s]" />

        <div className="absolute bottom-2 left-3 text-[7px] text-gray-500 uppercase tracking-widest flex items-center gap-1">
          <Globe className="w-2.5 h-2.5 text-blue-400" /> SENSORS: ONLINE
        </div>
      </div>

      {/* Rolling Terminal Feed */}
      <div className="bg-surface-950/80 border border-white/5 rounded-lg p-3 h-24 overflow-y-hidden font-mono flex flex-col-reverse gap-1">
        {logs.map((log, idx) => (
          <div key={idx} className="truncate leading-normal flex gap-1.5 items-center">
            <span className="text-matrix-500 shrink-0">&gt;</span>
            <span className={idx === 0 ? "text-gray-200" : "text-gray-500"}>{log}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
