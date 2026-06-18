'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Shield, Terminal, Activity, Check, Cpu, Server, Network, Eye, Key } from 'lucide-react';

export default function IntelligenceModules() {
  const [activeIdx, setActiveIdx] = useState(0);

  const modules = [
    {
      id: '01',
      title: 'DNS SECURITY AUDITOR',
      features: ['DNSSEC Verification', 'CAA Authorization', 'SPF Enforcement', 'DMARC Alignment', 'MX Routing Validation'],
      metricValue: '99.8%',
      metricLabel: 'DNS INTEGRITY SCORE',
      description: 'Audit domain namespace routing, cryptographic signing signatures, and mail policy controls to defend against phishing spoofing campaigns.',
      details: [
        { label: 'Primary check', val: 'DNSSEC Root anchors validated' },
        { label: 'Record integrity', val: 'CAA authorized issuers enforced' },
        { label: 'Policy status', val: 'DMARC p=reject alignment active' }
      ],
      color: 'text-cyber-400',
      bgColor: 'bg-cyber-500/10',
      borderColor: 'border-cyber-500/25',
      glowColor: 'shadow-[0_0_20px_rgba(0,229,255,0.25)]',
      visualization: 'dns'
    },
    {
      id: '02',
      title: 'SSL/TLS ANALYZER',
      features: ['Certificate Validation', 'Cipher Suite Review', 'TLS Version Audit', 'Expiration Monitoring'],
      metricValue: '248',
      metricLabel: 'CERTIFICATES ANALYZED',
      description: 'Analyze transport layer encryption profiles, key negotiation parameters, and root CA trust chain paths to meet regulatory requirements.',
      details: [
        { label: 'Protocols', val: 'TLS 1.3 preferred; TLS 1.0/1.1 disabled' },
        { label: 'Cipher strength', val: 'ECDHE-ECDSA AEAD-only forced' },
        { label: 'Status', val: 'All active certs verified within dates' }
      ],
      color: 'text-matrix-400',
      bgColor: 'bg-matrix-500/10',
      borderColor: 'border-matrix-500/25',
      glowColor: 'shadow-[0_0_20px_rgba(0,255,156,0.25)]',
      visualization: 'ssl'
    },
    {
      id: '03',
      title: 'WHOIS INTELLIGENCE',
      features: ['Registrar Analysis', 'Domain Age Tracking', 'Ownership Verification', 'Historical Records'],
      metricValue: '35',
      metricLabel: 'REGISTRATION SIGNALS',
      description: 'Track corporate domain registrar assets, nameserver allocations, registration timelines, and historical metadata changes.',
      details: [
        { label: 'Registrar', val: 'MarkMonitor Inc. verified' },
        { label: 'Domain Age', val: '9.4 years (Stable asset)' },
        { label: 'Intel status', val: 'No recent ownership shifts flagged' }
      ],
      color: 'text-neon-400',
      bgColor: 'bg-neon-500/10',
      borderColor: 'border-neon-500/25',
      glowColor: 'shadow-[0_0_20px_rgba(139,92,246,0.25)]',
      visualization: 'whois'
    },
    {
      id: '04',
      title: 'THREAT INTELLIGENCE HUB',
      features: ['IOC Correlation', 'Malware Indicators', 'Threat Actor Tracking', 'Reputation Analysis'],
      metricValue: '12.4M',
      metricLabel: 'THREAT INDICATORS',
      description: 'Aggregate IP blocklists, malware repository signatures, and ASN routing threat data in real-time to intercept active vectors.',
      details: [
        { label: 'IP Reputation', val: 'Cross-referenced on 50+ blocklists' },
        { label: 'Malware state', val: '0 matching indicators matched' },
        { label: 'Threat actors', val: 'No active campaign targets matched' }
      ],
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/25',
      glowColor: 'shadow-[0_0_20px_rgba(245,158,11,0.25)]',
      visualization: 'threat'
    },
    {
      id: '05',
      title: 'ATTACK SURFACE MONITOR',
      features: ['Asset Discovery', 'Exposure Monitoring', 'Shadow IT Detection', 'Continuous Scanning'],
      metricValue: '1,482',
      metricLabel: 'ASSETS MONITORED',
      description: 'Discover staging subdomains, map external port exposures, identify dangling CNAME targets, and discover untracked cloud endpoints.',
      details: [
        { label: 'Scanned subdomains', val: '840 resolved hosts monitored' },
        { label: 'Open Ports', val: 'Exposed port 80/443 only (Verified)' },
        { label: 'Shadow IT', val: '0 unmapped SaaS CNAME records' }
      ],
      color: 'text-red-400',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/25',
      glowColor: 'shadow-[0_0_20px_rgba(239,68,68,0.25)]',
      visualization: 'surface'
    }
  ];

  const renderVisual = (type) => {
    switch (type) {
      case 'dns':
        return (
          <svg viewBox="0 0 200 120" className="w-full h-full text-cyber-400 opacity-80">
            {/* DNS Node flow */}
            <circle cx="30" cy="60" r="6" className="fill-cyber-500/30 stroke-cyber-400 stroke-[1.5]" />
            <path d="M 36 60 H 70 M 76 60 L 110 30 M 76 60 L 110 90 M 116 30 H 150 M 116 90 H 150" className="stroke-cyber-500/40 stroke-[1.5] fill-none stroke-dasharray-[4]" />
            <circle cx="76" cy="60" r="6" className="fill-cyber-500/30 stroke-cyber-400 stroke-[1.5]" />
            <circle cx="116" cy="30" r="6" className="fill-cyber-500/30 stroke-cyber-400 stroke-[1.5]" />
            <circle cx="116" cy="90" r="6" className="fill-cyber-500/30 stroke-cyber-400 stroke-[1.5]" />
            <text x="30" y="76" textAnchor="middle" className="text-[7px] font-mono fill-gray-500">ROOT</text>
            <text x="76" y="48" textAnchor="middle" className="text-[7px] font-mono fill-gray-500">NS</text>
            <text x="116" y="18" textAnchor="middle" className="text-[7px] font-mono fill-gray-500">MX</text>
            <text x="116" y="108" textAnchor="middle" className="text-[7px] font-mono fill-gray-500">TXT</text>
            {/* Animated signal pulse */}
            <circle cx="30" cy="60" r="3" className="fill-cyber-400">
              <animate attributeName="r" values="3;10;3" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;0;1" dur="2s" repeatCount="indefinite" />
            </circle>
          </svg>
        );
      case 'ssl':
        return (
          <svg viewBox="0 0 200 120" className="w-full h-full text-matrix-400 opacity-80">
            {/* Trust chain */}
            <rect x="20" y="20" width="40" height="20" rx="3" className="fill-matrix-500/15 stroke-matrix-400 stroke-[1.5]" />
            <path d="M 40 40 V 50 H 110 V 60" className="stroke-matrix-500/30 stroke-[1.5] fill-none" />
            <rect x="90" y="60" width="40" height="20" rx="3" className="fill-matrix-500/15 stroke-matrix-400 stroke-[1.5]" />
            <path d="M 110 80 V 90" className="stroke-matrix-500/30 stroke-[1.5] fill-none" />
            <circle cx="110" cy="100" r="6" className="fill-matrix-500/30 stroke-matrix-400 stroke-[1.5]" />
            <text x="40" y="32" textAnchor="middle" className="text-[7px] font-mono fill-gray-300">ROOT CA</text>
            <text x="110" y="72" textAnchor="middle" className="text-[7px] font-mono fill-gray-300">INTERMED</text>
            <text x="110" y="114" textAnchor="middle" className="text-[7px] font-mono fill-gray-500">LEAF</text>
          </svg>
        );
      case 'whois':
        return (
          <svg viewBox="0 0 200 120" className="w-full h-full text-neon-400 opacity-80">
            {/* Domain age progress bar */}
            <line x1="20" y1="60" x2="180" y2="60" className="stroke-neon-500/30 stroke-[2]" />
            <line x1="20" y1="60" x2="130" y2="60" className="stroke-neon-400 stroke-[3]" />
            <circle cx="20" cy="60" r="5" className="fill-surface-950 stroke-neon-400 stroke-[1.5]" />
            <circle cx="130" cy="60" r="5" className="fill-neon-400" />
            <circle cx="180" cy="60" r="5" className="fill-surface-950 stroke-neon-500/30 stroke-[1.5]" />
            <text x="20" y="78" textAnchor="middle" className="text-[7px] font-mono fill-gray-500">REGISTRATION</text>
            <text x="130" y="44" textAnchor="middle" className="text-[7px] font-mono fill-neon-400 font-bold">AGE: 9.4Y</text>
            <text x="180" y="78" textAnchor="middle" className="text-[7px] font-mono fill-gray-500">EXPIRY</text>
          </svg>
        );
      case 'threat':
        return (
          <svg viewBox="0 0 200 120" className="w-full h-full text-amber-400 opacity-80">
            {/* Live radar grid with indicator nodes */}
            <circle cx="100" cy="60" r="45" className="fill-none stroke-amber-500/20 stroke-[1]" />
            <circle cx="100" cy="60" r="25" className="fill-none stroke-amber-500/30 stroke-[1]" />
            <line x1="100" y1="10" x2="100" y2="110" className="stroke-amber-500/20" />
            <line x1="50" y1="60" x2="150" y2="60" className="stroke-amber-500/20" />
            {/* Scanning line */}
            <line x1="100" y1="60" x2="135" y2="35" className="stroke-amber-400 stroke-[1.5]">
              <animateTransform attributeName="transform" type="rotate" from="0 100 60" to="360 100 60" dur="4s" repeatCount="indefinite" />
            </line>
            <circle cx="120" cy="45" r="3" className="fill-amber-500 animate-ping" />
            <circle cx="85" cy="80" r="2.5" className="fill-red-500" />
          </svg>
        );
      case 'surface':
        return (
          <svg viewBox="0 0 200 120" className="w-full h-full text-red-400 opacity-80">
            {/* Scanning asset grid matrix */}
            <rect x="25" y="25" width="24" height="24" rx="2" className="fill-red-500/10 stroke-red-500/30 stroke-[1.5]" />
            <rect x="65" y="25" width="24" height="24" rx="2" className="fill-red-500/10 stroke-red-500/30 stroke-[1.5]" />
            <rect x="105" y="25" width="24" height="24" rx="2" className="fill-red-500/10 stroke-red-500/30 stroke-[1.5]" />
            <rect x="145" y="25" width="24" height="24" rx="2" className="fill-red-500/10 stroke-red-500/30 stroke-[1.5]" />
            
            <rect x="25" y="65" width="24" height="24" rx="2" className="fill-red-500/10 stroke-red-500/30 stroke-[1.5]" />
            <rect x="65" y="65" width="24" height="24" rx="2" className="fill-red-500/10 stroke-red-500/30 stroke-[1.5]" />
            {/* Active exposure node */}
            <rect x="105" y="65" width="24" height="24" rx="2" className="fill-red-500/25 stroke-red-500 stroke-[2] shadow-[0_0_10px_#ef4444]" />
            <rect x="145" y="65" width="24" height="24" rx="2" className="fill-red-500/10 stroke-red-500/30 stroke-[1.5]" />
            <text x="117" y="79" textAnchor="middle" className="text-[6px] font-mono fill-red-400 font-bold">ALERT</text>
          </svg>
        );
      default:
        return null;
    }
  };

  const activeMod = modules[activeIdx];

  return (
    <section className="py-24 relative overflow-hidden bg-[#05080f] border-b border-white/5 font-sans" id="intelligence-modules">
      <div className="absolute inset-0 bg-grid opacity-[0.1] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-matrix-500/[0.02] blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="text-center mb-20 space-y-3">
          <span className="font-mono text-xs text-cyber-400 font-bold uppercase tracking-widest block animate-pulse">
            // INTEL MODULES
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white uppercase tracking-wider">
            RECONSHIELD INTELLIGENCE MODULES
          </h2>
          <p className="text-gray-400 text-sm max-w-xl mx-auto leading-relaxed">
            Expand the selectors below to inspect specialized OSINT diagnostic matrices and check stats.
          </p>
        </div>

        {/* Split Accordion + Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side: Modular Accordion List (Col Span 7) */}
          <div className="lg:col-span-7 space-y-4">
            {modules.map((mod, idx) => {
              const isActive = activeIdx === idx;

              return (
                <div
                  key={mod.id}
                  className={`border rounded-xl transition-all duration-300 bg-surface-950/40 relative overflow-hidden ${
                    isActive 
                      ? `${mod.borderColor} bg-surface-900/40` 
                      : 'border-white/5 hover:border-white/10'
                  }`}
                >
                  {/* Selector Bar */}
                  <button
                    onClick={() => setActiveIdx(idx)}
                    className="w-full flex items-center justify-between p-5 text-left font-display cursor-pointer relative z-10"
                  >
                    <div className="flex items-center gap-4">
                      <span className={`font-mono text-xs font-bold ${isActive ? mod.color : 'text-gray-500'}`}>
                        [MOD-{mod.id}]
                      </span>
                      <h3 className={`font-bold text-sm md:text-base tracking-wide uppercase transition-colors ${
                        isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'
                      }`}>
                        {mod.title}
                      </h3>
                    </div>
                    
                    <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${
                      isActive ? 'rotate-180 text-white' : ''
                    }`} />
                  </button>

                  {/* Expandable Content Area */}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-5 pb-5 pt-1 border-t border-white/5 font-sans space-y-4 relative z-10">
                          <p className="text-gray-400 text-xs leading-relaxed max-w-xl">
                            {mod.description}
                          </p>

                          {/* Features List grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                            {mod.features.map((feat) => (
                              <div key={feat} className="flex items-center gap-2 text-xs text-gray-300">
                                <Check className={`w-3.5 h-3.5 ${mod.color} shrink-0`} />
                                <span className="font-mono text-[11px] uppercase tracking-wider">{feat}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Sidebar visual pulse on active item */}
                  {isActive && (
                    <div className={`absolute left-0 top-0 bottom-0 w-[3px] bg-current ${mod.color}`} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Side: Security Telemetry Dashboard Panel (Col Span 5) */}
          <div className="lg:col-span-5">
            <div className={`bg-surface-950/80 border border-white/5 rounded-2xl p-6 relative overflow-hidden transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.6)] ${
              activeMod.glowColor
            }`}>
              
              {/* Corner Deco */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/10" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/10" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/10" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/10" />

              {/* Title bar */}
              <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-6">
                <div className="flex items-center gap-2 font-mono text-[9px] text-gray-500">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>INTEL_TELEMETRY // MOD-{activeMod.id}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full animate-ping bg-current ${activeMod.color}`} />
                  <span className="font-mono text-[8px] text-gray-500 uppercase">ACTIVE MATRIX</span>
                </div>
              </div>

              {/* Layout for Metric Card & Visualization */}
              <div className="space-y-6">
                
                {/* Metric Card Block */}
                <div className="flex items-center justify-between p-4 bg-surface-900/40 border border-white/5 rounded-xl">
                  <div className="space-y-1">
                    <span className="block text-[8px] font-mono text-gray-500 uppercase tracking-widest">
                      METRIC PREVIEW
                    </span>
                    <span className={`block text-3xl font-display font-bold tracking-tight ${activeMod.color}`}>
                      {activeMod.metricValue}
                    </span>
                    <span className="block text-[9px] font-mono text-gray-400 uppercase tracking-wider">
                      {activeMod.metricLabel}
                    </span>
                  </div>
                  
                  {/* Small animated check badge */}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                    activeMod.borderColor
                  } ${activeMod.bgColor} text-current shrink-0`}>
                    <Shield className="w-5 h-5" />
                  </div>
                </div>

                {/* Dashboard Visualization Area */}
                <div className="h-32 bg-surface-950 border border-white/5 rounded-xl flex items-center justify-center p-3 relative overflow-hidden">
                  <div className="absolute inset-0 bg-grid opacity-[0.05]" />
                  {renderVisual(activeMod.visualization)}
                </div>

                {/* Technical stats table */}
                <div className="space-y-2 border-t border-white/5 pt-4">
                  <span className="block font-mono text-[9px] text-gray-500 uppercase tracking-wider">// DETAILED RUN PARAMETERS</span>
                  <div className="space-y-1.5 font-mono text-[10px]">
                    {activeMod.details.map((detail, idx) => (
                      <div key={idx} className="flex justify-between py-1 border-b border-white/[0.02]">
                        <span className="text-gray-500 uppercase">{detail.label}</span>
                        <span className="text-gray-300 text-right">{detail.val}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
