'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronDown, Shield, Lock, Search, AlertTriangle, Radar } from 'lucide-react';

const MODULES = [
  {
    id: 'dns',
    num: '01',
    title: 'DNS SECURITY AUDITOR',
    icon: Shield,
    features: ['DNSSEC', 'CAA', 'SPF', 'DMARC', 'MX Validation'],
    metricValue: '99.8%',
    metricLabel: 'DNS INTEGRITY SCORE',
    color: '#00ff88',
    description: 'Comprehensive DNS record validation and cryptographic signature verification across all authoritative zones.',
  },
  {
    id: 'ssl',
    num: '02',
    title: 'SSL/TLS ANALYZER',
    icon: Lock,
    features: ['Certificate Validation', 'Cipher Review', 'TLS Version Audit', 'Expiration Monitoring'],
    metricValue: '248',
    metricLabel: 'CERTIFICATES ANALYZED',
    color: '#00E5FF',
    description: 'Deep inspection of transport-layer security configurations, cipher suites, and certificate trust chains.',
  },
  {
    id: 'whois',
    num: '03',
    title: 'WHOIS INTELLIGENCE',
    icon: Search,
    features: ['Registrar Analysis', 'Domain Age', 'Ownership Tracking', 'Historical Records'],
    metricValue: '35',
    metricLabel: 'REGISTRATION SIGNALS',
    color: '#a78bfa',
    description: 'Domain registration intelligence with ownership timelines, registrar patterns, and WHOIS change detection.',
  },
  {
    id: 'threat',
    num: '04',
    title: 'THREAT INTELLIGENCE HUB',
    icon: AlertTriangle,
    features: ['IOC Correlation', 'Malware Indicators', 'Threat Actor Tracking', 'Reputation Analysis'],
    metricValue: '12.4M',
    metricLabel: 'THREAT INDICATORS',
    color: '#f472b6',
    description: 'Real-time correlation against global threat feeds, malware databases, and adversary infrastructure tracking.',
  },
  {
    id: 'asm',
    num: '05',
    title: 'ATTACK SURFACE MONITOR',
    icon: Radar,
    features: ['Asset Discovery', 'Exposure Monitoring', 'Shadow IT Detection', 'Continuous Scanning'],
    metricValue: '1,482',
    metricLabel: 'ASSETS MONITORED',
    color: '#fbbf24',
    description: 'Continuous external attack surface discovery and shadow IT detection through passive reconnaissance.',
  },
];

function ModuleRow({ module, isOpen, onToggle, index }) {
  const rowRef = useRef(null);
  const isInView = useInView(rowRef, { once: true, margin: '-50px' });
  const Icon = module.icon;

  return (
    <motion.div
      ref={rowRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="relative"
    >
      {/* Collapsed Row / Header */}
      <button
        onClick={onToggle}
        className={`w-full flex items-center gap-4 md:gap-6 px-5 md:px-6 py-5 text-left transition-all duration-300 cursor-pointer group border-b ${
          isOpen
            ? 'bg-[#0a0e16]/80 border-transparent'
            : 'bg-transparent border-white/5 hover:bg-white/[0.02]'
        }`}
        style={{
          borderLeft: isOpen ? `3px solid ${module.color}` : '3px solid transparent',
        }}
        aria-expanded={isOpen}
      >
        {/* Module number */}
        <span
          className="font-mono text-[10px] font-bold uppercase tracking-widest shrink-0 w-8"
          style={{ color: isOpen ? module.color : '#4a5568' }}
        >
          {module.num}
        </span>

        {/* Icon */}
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300"
          style={{
            background: isOpen ? `${module.color}15` : 'rgba(255,255,255,0.03)',
            border: `1px solid ${isOpen ? `${module.color}30` : 'rgba(255,255,255,0.05)'}`,
          }}
        >
          <Icon
            className="w-3.5 h-3.5 transition-colors duration-300"
            style={{ color: isOpen ? module.color : '#6b7280' }}
          />
        </div>

        {/* Title */}
        <h3
          className="font-display font-bold text-sm md:text-base uppercase tracking-wider flex-1 transition-colors duration-300"
          style={{ color: isOpen ? 'white' : '#9ca3af' }}
        >
          {module.title}
        </h3>

        {/* Expand/collapse chevron */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown
            className="w-4 h-4 transition-colors duration-300"
            style={{ color: isOpen ? module.color : '#4a5568' }}
          />
        </motion.div>
      </button>

      {/* Expanded Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
            style={{
              borderLeft: `3px solid ${module.color}`,
            }}
          >
            <div className="px-5 md:px-6 py-6 bg-[#0a0e16]/60">
              <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-6 md:gap-8">
                {/* Left: Description + Features */}
                <div>
                  <p className="text-gray-400 text-xs leading-relaxed mb-5 font-sans">
                    {module.description}
                  </p>

                  <div className="space-y-2.5">
                    {module.features.map((feature, i) => (
                      <motion.div
                        key={i}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ background: module.color }}
                        />
                        <span className="font-mono text-[11px] text-gray-300 uppercase tracking-wider">
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-5 pt-4 border-t border-white/5">
                    <span className="font-mono text-[9px] text-gray-600 uppercase tracking-widest">
                      // MODULE_{module.num} • ACTIVE PIPELINE
                    </span>
                  </div>
                </div>

                {/* Right: Metric Card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                  className="relative rounded-xl p-6 flex flex-col items-center justify-center text-center min-h-[160px]"
                  style={{
                    background: `linear-gradient(135deg, ${module.color}08, ${module.color}03)`,
                    border: `1px solid ${module.color}20`,
                    boxShadow: `0 0 40px ${module.color}05, inset 0 0 40px ${module.color}03`,
                  }}
                >
                  {/* Metric glow effect */}
                  <div
                    className="absolute inset-0 rounded-xl opacity-20 animate-pulse"
                    style={{
                      background: `radial-gradient(circle at center, ${module.color}10, transparent 70%)`,
                    }}
                  />

                  <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest mb-3 relative z-10">
                    METRIC
                  </span>
                  <span
                    className="font-display text-4xl md:text-5xl font-bold relative z-10 tracking-tight"
                    style={{ color: module.color }}
                  >
                    {module.metricValue}
                  </span>
                  <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest mt-2 relative z-10">
                    {module.metricLabel}
                  </span>

                  <div className="mt-4 pt-3 border-t border-white/5 w-full relative z-10">
                    <span
                      className="font-mono text-[9px] uppercase tracking-widest cursor-pointer transition-colors hover:opacity-80"
                      style={{ color: module.color }}
                    >
                      VIEW DETAILS →
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function IntelligenceModules() {
  const [openModule, setOpenModule] = useState('dns');
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const handleToggle = (id) => {
    setOpenModule(openModule === id ? null : id);
  };

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-[#05080f] border-b border-white/5 overflow-hidden relative"
      aria-label="Intelligence Modules"
    >
      {/* Background ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#00ff88]/[0.015] blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-[1000px] mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 space-y-3"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <span className="font-mono text-xs text-[#00ff88] font-bold uppercase tracking-widest">
            // INTELLIGENCE PIPELINES
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white uppercase tracking-wide">
            ReconShield Intelligence Modules
          </h2>
          <p className="text-gray-400 text-sm max-w-xl mx-auto leading-relaxed">
            Five targeted diagnostic pipelines compiled into one unified cybersecurity monitoring platform.
          </p>
        </motion.div>

        {/* Module summary bar */}
        <motion.div
          className="flex items-center justify-center gap-4 md:gap-8 mb-10 flex-wrap"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {MODULES.map((m) => (
            <button
              key={m.id}
              onClick={() => setOpenModule(openModule === m.id ? null : m.id)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 cursor-pointer"
              style={{
                background: openModule === m.id ? `${m.color}10` : 'transparent',
                border: `1px solid ${openModule === m.id ? `${m.color}30` : 'rgba(255,255,255,0.05)'}`,
              }}
            >
              <div
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{
                  background: openModule === m.id ? m.color : '#4a5568',
                  boxShadow: openModule === m.id ? `0 0 8px ${m.color}40` : 'none',
                }}
              />
              <span
                className="font-mono text-[9px] uppercase tracking-widest transition-colors duration-300"
                style={{ color: openModule === m.id ? m.color : '#6b7280' }}
              >
                {m.num}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Modules accordion */}
        <div className="border border-white/5 rounded-xl overflow-hidden bg-[#080c14]/50">
          {MODULES.map((module, index) => (
            <ModuleRow
              key={module.id}
              module={module}
              isOpen={openModule === module.id}
              onToggle={() => handleToggle(module.id)}
              index={index}
            />
          ))}
        </div>

        {/* Bottom stats bar */}
        <motion.div
          className="mt-8 flex items-center justify-center gap-6 md:gap-12 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {[
            { label: 'Active Modules', value: '5' },
            { label: 'Data Sources', value: '47' },
            { label: 'Avg. Response', value: '< 2s' },
            { label: 'Uptime', value: '99.97%' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <span className="block font-mono text-lg md:text-xl font-bold text-white">{stat.value}</span>
              <span className="block font-mono text-[9px] text-gray-500 uppercase tracking-widest mt-0.5">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
