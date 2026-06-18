'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Search, Shield, GitBranch, Lock } from 'lucide-react';

const PHASES = [
  {
    num: '01',
    title: 'DISCOVER',
    icon: Search,
    items: ['Domains', 'Subdomains', 'IP Ranges', 'Certificates', 'ASN Data'],
    color: '#00ff88',
    description: 'Comprehensive asset discovery across your entire digital footprint.',
  },
  {
    num: '02',
    title: 'ANALYZE',
    icon: Shield,
    items: ['DNS Security', 'SSL/TLS', 'Security Headers', 'Exposure Mapping', 'Configuration Review'],
    color: '#00E5FF',
    description: 'Deep protocol-level analysis of every discovered asset.',
  },
  {
    num: '03',
    title: 'CORRELATE',
    icon: GitBranch,
    items: ['Threat Feeds', 'CVE Intelligence', 'Historical Data', 'IOC Matching', 'Reputation Sources'],
    color: '#a78bfa',
    description: 'Cross-reference findings against global threat intelligence.',
  },
  {
    num: '04',
    title: 'DEFEND',
    icon: Lock,
    items: ['Risk Prioritization', 'Remediation Guidance', 'Continuous Monitoring', 'Alerting', 'Security Hardening'],
    color: '#f472b6',
    description: 'Actionable defense strategies and continuous protection.',
  },
];

function PhaseCard({ phase, index, isLast }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: '-80px' });
  const isEven = index % 2 === 0;
  const Icon = phase.icon;

  return (
    <div ref={cardRef} className="relative grid grid-cols-1 md:grid-cols-[1fr_80px_1fr] gap-0 md:gap-0 items-start">
      {/* Left column content (even phases) / empty (odd phases) */}
      <div className={`${isEven ? 'md:block' : 'md:hidden'} hidden`}>
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="group relative p-6 rounded-xl border border-white/5 bg-[#0a0e16]/80 backdrop-blur-sm hover:border-opacity-100 transition-all duration-500 mr-4"
          style={{
            '--phase-color': phase.color,
            borderColor: isInView ? `${phase.color}20` : 'rgba(255,255,255,0.05)',
          }}
          whileHover={{
            scale: 1.02,
            borderColor: `${phase.color}40`,
            boxShadow: `0 0 30px ${phase.color}08`,
          }}
        >
          {/* Phase number watermark */}
          <div
            className="absolute -top-4 -right-2 font-display text-[80px] font-bold leading-none opacity-[0.04] pointer-events-none select-none"
            style={{ color: phase.color }}
          >
            {phase.num}
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ background: `${phase.color}10`, border: `1px solid ${phase.color}25` }}
            >
              <Icon className="w-4 h-4" style={{ color: phase.color }} />
            </div>
            <div>
              <span className="font-mono text-[9px] uppercase tracking-widest block" style={{ color: phase.color }}>
                Phase {phase.num}
              </span>
              <h3 className="text-white font-display font-bold text-lg uppercase tracking-wide">
                {phase.title}
              </h3>
            </div>
          </div>

          <p className="text-gray-500 text-xs font-sans mb-4 leading-relaxed">
            {phase.description}
          </p>

          <div className="space-y-2">
            {phase.items.map((item, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-2.5"
                initial={{ opacity: 0, x: -15 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.06 }}
              >
                <span className="text-[10px]" style={{ color: phase.color }}>✓</span>
                <span className="font-mono text-[11px] text-gray-300">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Empty spacer for odd phases on left */}
      <div className={`${!isEven ? 'md:block' : 'md:hidden'} hidden`} />

      {/* Center timeline column */}
      <div className="hidden md:flex flex-col items-center relative">
        {/* Timeline node */}
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.1, type: 'spring', stiffness: 200 }}
          className="relative z-10 w-12 h-12 rounded-full flex items-center justify-center"
          style={{
            background: `${phase.color}15`,
            border: `2px solid ${phase.color}40`,
            boxShadow: `0 0 20px ${phase.color}15`,
          }}
        >
          <span className="font-mono text-xs font-bold" style={{ color: phase.color }}>
            {phase.num}
          </span>
          {/* Pulse ring */}
          <span
            className="absolute inset-[-6px] rounded-full animate-ping opacity-20"
            style={{
              border: `1px solid ${phase.color}`,
              animationDuration: '3s',
            }}
          />
        </motion.div>

        {/* Connecting line segment */}
        {!isLast && (
          <div className="w-[2px] flex-1 min-h-[40px] relative">
            <div className="absolute inset-0 bg-white/5" />
            <motion.div
              className="absolute inset-0 origin-top"
              style={{ background: `linear-gradient(to bottom, ${phase.color}40, ${PHASES[index + 1]?.color || phase.color}40)` }}
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
          </div>
        )}
      </div>

      {/* Right column content (odd phases) / empty (even phases) */}
      <div className={`${!isEven ? 'md:block' : 'md:hidden'} hidden`}>
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="group relative p-6 rounded-xl border border-white/5 bg-[#0a0e16]/80 backdrop-blur-sm hover:border-opacity-100 transition-all duration-500 ml-4"
          style={{ borderColor: isInView ? `${phase.color}20` : 'rgba(255,255,255,0.05)' }}
          whileHover={{
            scale: 1.02,
            borderColor: `${phase.color}40`,
            boxShadow: `0 0 30px ${phase.color}08`,
          }}
        >
          {/* Phase number watermark */}
          <div
            className="absolute -top-4 -left-2 font-display text-[80px] font-bold leading-none opacity-[0.04] pointer-events-none select-none"
            style={{ color: phase.color }}
          >
            {phase.num}
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ background: `${phase.color}10`, border: `1px solid ${phase.color}25` }}
            >
              <Icon className="w-4 h-4" style={{ color: phase.color }} />
            </div>
            <div>
              <span className="font-mono text-[9px] uppercase tracking-widest block" style={{ color: phase.color }}>
                Phase {phase.num}
              </span>
              <h3 className="text-white font-display font-bold text-lg uppercase tracking-wide">
                {phase.title}
              </h3>
            </div>
          </div>

          <p className="text-gray-500 text-xs font-sans mb-4 leading-relaxed">
            {phase.description}
          </p>

          <div className="space-y-2">
            {phase.items.map((item, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-2.5"
                initial={{ opacity: 0, x: 15 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.06 }}
              >
                <span className="text-[10px]" style={{ color: phase.color }}>✓</span>
                <span className="font-mono text-[11px] text-gray-300">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Empty spacer for even phases on right */}
      <div className={`${isEven ? 'md:block' : 'md:hidden'} hidden`} />

      {/* Mobile: Full-width card (shown only on mobile) */}
      <div className="md:hidden col-span-1">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative p-5 rounded-xl border bg-[#0a0e16]/80 mb-6"
          style={{ borderColor: `${phase.color}20` }}
        >
          {/* Mobile timeline dot */}
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
              style={{
                background: `${phase.color}15`,
                border: `2px solid ${phase.color}40`,
              }}
            >
              <span className="font-mono text-[10px] font-bold" style={{ color: phase.color }}>{phase.num}</span>
            </div>
            <div>
              <span className="font-mono text-[9px] uppercase tracking-widest block" style={{ color: phase.color }}>
                Phase {phase.num}
              </span>
              <h3 className="text-white font-display font-bold text-base uppercase tracking-wide">
                {phase.title}
              </h3>
            </div>
          </div>

          <p className="text-gray-500 text-xs font-sans mb-3 leading-relaxed">
            {phase.description}
          </p>

          <div className="space-y-1.5">
            {phase.items.map((item, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.2 + i * 0.05 }}
              >
                <span className="text-[10px]" style={{ color: phase.color }}>✓</span>
                <span className="font-mono text-[10px] text-gray-300">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function SecurityWorkflow() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const progressHeight = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '100%']);

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-[#0a0d14] border-b border-white/5 overflow-hidden relative"
      aria-label="Security Workflow"
    >
      {/* Ambient background effects */}
      <div className="absolute top-1/4 left-0 w-[300px] h-[300px] bg-[#00ff88]/[0.02] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[300px] h-[300px] bg-[#00E5FF]/[0.02] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1000px] mx-auto px-6 relative">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20 space-y-3"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <span className="font-mono text-xs text-[#00ff88] font-bold uppercase tracking-widest">
            // PROCESS PIPELINE
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white uppercase tracking-wide">
            ReconShield Intelligence Workflow
          </h2>
          <p className="text-gray-400 text-sm max-w-xl mx-auto leading-relaxed">
            From asset discovery to continuous monitoring — a four-phase intelligence pipeline
            engineered for modern security operations.
          </p>
        </motion.div>

        {/* Scroll-driven progress line (desktop only, centered behind timeline) */}
        <div className="hidden md:block absolute left-1/2 top-[200px] bottom-[80px] w-[2px] -translate-x-1/2 bg-white/[0.03] z-0">
          <motion.div
            className="absolute top-0 left-0 w-full origin-top"
            style={{
              height: progressHeight,
              background: 'linear-gradient(to bottom, #00ff88, #00E5FF, #a78bfa, #f472b6)',
              opacity: 0.3,
            }}
          />
        </div>

        {/* Phase Cards */}
        <div className="relative z-10 space-y-8 md:space-y-0">
          {PHASES.map((phase, i) => (
            <PhaseCard
              key={phase.num}
              phase={phase}
              index={i}
              isLast={i === PHASES.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
