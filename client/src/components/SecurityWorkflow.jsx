'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Search, Compass, Database, ShieldAlert, Zap, Cpu, Server, Network } from 'lucide-react';

export default function SecurityWorkflow() {
  const containerRef = useRef(null);

  // Scroll tracking for the timeline progress line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const workflowSteps = [
    {
      phase: '01',
      title: 'DISCOVER',
      icon: Search,
      desc: 'Map target perimeter and inventory internet-facing assets passively without touching active servers.',
      items: ['Domains', 'Subdomains', 'IP Ranges', 'Certificates', 'ASN Data'],
      color: 'border-cyber-500/30 text-cyber-400 focus-within:border-cyber-400',
      glow: 'shadow-[0_0_15px_rgba(0,229,255,0.15)] bg-cyber-500/5',
      iconBg: 'bg-cyber-500/10 text-cyber-400 border-cyber-500/20',
      badge: 'border-cyber-500/20 text-cyber-400 bg-cyber-500/5',
    },
    {
      phase: '02',
      title: 'ANALYZE',
      icon: Network,
      desc: 'Audit DNS records, examine cryptographic certificates, and parse HTTP headers for configuration drift.',
      items: ['DNS Security', 'SSL/TLS', 'Security Headers', 'Exposure Mapping', 'Configuration Review'],
      color: 'border-matrix-400/30 text-matrix-400 focus-within:border-matrix-400',
      glow: 'shadow-[0_0_15px_rgba(0,255,156,0.15)] bg-matrix-400/5',
      iconBg: 'bg-matrix-400/10 text-matrix-400 border-matrix-400/20',
      badge: 'border-matrix-400/20 text-matrix-400 bg-matrix-400/5',
    },
    {
      phase: '03',
      title: 'CORRELATE',
      icon: Database,
      desc: 'Cross-reference discovery telemetry against live threat databases, open CVE lists, and known IoC signatures.',
      items: ['Threat Feeds', 'CVE Intelligence', 'Historical Data', 'IOC Matching', 'Reputation Sources'],
      color: 'border-neon-500/30 text-neon-400 focus-within:border-neon-500',
      glow: 'shadow-[0_0_15px_rgba(139,92,246,0.15)] bg-neon-500/5',
      iconBg: 'bg-neon-500/10 text-neon-400 border-neon-500/20',
      badge: 'border-neon-500/20 text-neon-400 bg-neon-500/5',
    },
    {
      phase: '04',
      title: 'DEFEND',
      icon: ShieldAlert,
      desc: 'Prioritize exposure risks with remediation blueprints to harden network controls and enforce continuous monitoring.',
      items: ['Risk Prioritization', 'Remediation Guidance', 'Continuous Monitoring', 'Alerting', 'Security Hardening'],
      color: 'border-[#ff0055]/30 text-[#ff0055] focus-within:border-[#ff0055]',
      glow: 'shadow-[0_0_15px_rgba(255,0,85,0.15)] bg-[#ff0055]/5',
      iconBg: 'bg-[#ff0055]/10 text-[#ff0055] border-[#ff0055]/20',
      badge: 'border-[#ff0055]/20 text-[#ff0055] bg-[#ff0055]/5',
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-[#0a0d14] border-b border-white/5 font-sans" id="intelligence-workflow">
      <div className="absolute inset-0 bg-grid opacity-[0.1] pointer-events-none" />
      
      {/* Decorative cyber ambient circles */}
      <div className="absolute top-1/4 right-0 w-[450px] h-[450px] bg-matrix-500/[0.015] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[450px] h-[450px] bg-cyber-500/[0.015] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1000px] mx-auto px-6 relative z-10">
        <div className="text-center mb-20 space-y-3">
          <span className="font-mono text-xs text-matrix-400 font-bold uppercase tracking-widest block animate-pulse">
            // PROCESS PIPELINE
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white uppercase tracking-wider">
            RECONSHIELD INTELLIGENCE WORKFLOW
          </h2>
          <p className="text-gray-400 text-sm max-w-xl mx-auto leading-relaxed">
            From asset discovery to continuous monitoring.
          </p>
        </div>

        {/* Timeline container */}
        <div ref={containerRef} className="relative mt-12 pb-10">
          
          {/* Central Line Background */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/[0.05] -translate-x-[1px]" />
          
          {/* Animated Progress Line */}
          <motion.div
            style={{ scaleY, originY: 0 }}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyber-400 via-matrix-400 to-neon-500 -translate-x-[1px] z-10"
          />

          {/* Steps */}
          <div className="space-y-16">
            {workflowSteps.map((step, idx) => {
              const IconComp = step.icon;
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={step.phase}
                  className={`flex flex-col md:flex-row items-stretch relative ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Content Card (Left or Right side on desktop, stacked on mobile) */}
                  <div className="w-full md:w-1/2 flex items-center justify-center pl-10 md:pl-0">
                    <motion.div
                      initial={{ opacity: 0, y: 30, scale: 0.98 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ duration: 0.55, delay: idx * 0.1 }}
                      className={`w-full max-w-[420px] p-6 rounded-2xl border bg-surface-950/70 border-white/5 relative group transition-all duration-300 hover:border-white/10 hover:${step.glow}`}
                    >
                      {/* Corner Decorations */}
                      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 group-hover:border-white/40 transition-colors" />
                      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 group-hover:border-white/40 transition-colors" />
                      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20 group-hover:border-white/40 transition-colors" />
                      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 group-hover:border-white/40 transition-colors" />

                      <div className="flex items-start gap-4">
                        <div className={`p-2.5 rounded-xl border ${step.iconBg} shrink-0`}>
                          <IconComp className="w-5 h-5" />
                        </div>
                        <div className="space-y-2">
                          <h3 className="font-display text-lg font-bold text-white uppercase tracking-wider">
                            {step.title}
                          </h3>
                          <p className="text-gray-400 text-xs leading-relaxed">
                            {step.desc}
                          </p>
                        </div>
                      </div>

                      {/* Phase Content Tags */}
                      <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap gap-2">
                        {step.items.map((item) => (
                          <span
                            key={item}
                            className={`px-2.5 py-1 rounded text-[9px] font-mono border tracking-wider uppercase ${step.badge}`}
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  {/* Node Marker (Fixed center on desktop, left on mobile) */}
                  <div className="absolute left-4 md:left-1/2 top-8 md:top-1/2 -translate-x-[16px] md:-translate-x-[16px] md:-translate-y-[16px] z-20 flex items-center justify-center pointer-events-none">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: 'spring', stiffness: 200, delay: idx * 0.15 }}
                      className={`w-8 h-8 rounded-full bg-surface-950 border-2 flex items-center justify-center relative ${
                        idx === 0 ? 'border-cyber-400' :
                        idx === 1 ? 'border-matrix-400' :
                        idx === 2 ? 'border-neon-500' : 'border-[#ff0055]'
                      }`}
                    >
                      {/* Central core node */}
                      <div
                        className={`w-2.5 h-2.5 rounded-full ${
                          idx === 0 ? 'bg-cyber-400' :
                          idx === 1 ? 'bg-matrix-400' :
                          idx === 2 ? 'bg-neon-500' : 'bg-[#ff0055]'
                        }`}
                      />
                      
                      {/* Pulse ring */}
                      <div
                        className={`absolute inset-[-4px] rounded-full border opacity-20 animate-pulse ${
                          idx === 0 ? 'border-cyber-400' :
                          idx === 1 ? 'border-matrix-400' :
                          idx === 2 ? 'border-neon-500' : 'border-[#ff0055]'
                        }`}
                      />
                    </motion.div>
                  </div>

                  {/* Phase Number Panel (Right or Left side on desktop, stacked on mobile) */}
                  <div className="w-full md:w-1/2 flex items-center justify-start md:justify-center pl-10 md:pl-0 mt-3 md:mt-0 font-display">
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <span className="text-4xl md:text-6xl font-bold font-display text-white/5 group-hover:text-white/10 select-none tracking-tighter">
                        PHASE
                      </span>
                      <span
                        className={`text-5xl md:text-7xl font-bold font-display tracking-tight bg-clip-text text-transparent bg-gradient-to-b ${
                          idx === 0 ? 'from-cyber-400 to-cyber-600' :
                          idx === 1 ? 'from-matrix-400 to-matrix-600' :
                          idx === 2 ? 'from-neon-400 to-neon-600' : 'from-[#ff0055] to-[#aa003b]'
                        }`}
                      >
                        {step.phase}
                      </span>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
