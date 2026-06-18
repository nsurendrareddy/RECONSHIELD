'use client';

import React, { useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Shield, X } from 'lucide-react';

const HOTSPOTS = [
  {
    id: 'dns',
    label: 'DNS SECURITY ENGINE',
    shortLabel: 'DNS',
    items: ['DNSSEC Validation', 'SPF Analysis', 'DMARC Validation', 'CAA Verification', 'Zone Transfer Detection'],
    position: { top: '22%', left: '18%' },
    color: '#00ff88',
  },
  {
    id: 'threat',
    label: 'THREAT INTELLIGENCE',
    shortLabel: 'THREAT',
    items: ['IOC Correlation', 'Malware Indicators', 'Threat Actor Tracking', 'Reputation Analysis'],
    position: { top: '22%', right: '18%' },
    color: '#00E5FF',
  },
  {
    id: 'attack',
    label: 'ATTACK SURFACE MONITOR',
    shortLabel: 'ASM',
    items: ['Asset Discovery', 'Subdomain Enumeration', 'Open Service Detection', 'Exposure Monitoring'],
    position: { bottom: '28%', left: '18%' },
    color: '#a78bfa',
  },
  {
    id: 'ssl',
    label: 'SSL/TLS ANALYZER',
    shortLabel: 'SSL',
    items: ['Certificate Validation', 'Cipher Analysis', 'TLS Version Review', 'Expiration Monitoring'],
    position: { bottom: '28%', right: '18%' },
    color: '#f472b6',
  },
];

const PARTICLES = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 2 + Math.random() * 3,
  duration: 6 + Math.random() * 8,
  delay: Math.random() * 5,
}));

const CONNECTION_LINES = [
  { x1: '20%', y1: '30%', x2: '50%', y2: '20%' },
  { x1: '80%', y1: '30%', x2: '50%', y2: '20%' },
  { x1: '20%', y1: '65%', x2: '50%', y2: '80%' },
  { x1: '80%', y1: '65%', x2: '50%', y2: '80%' },
  { x1: '20%', y1: '30%', x2: '20%', y2: '65%' },
  { x1: '80%', y1: '30%', x2: '80%', y2: '65%' },
];

export default function CommandCenter3D() {
  const containerRef = useRef(null);
  const transformRef = useRef(null);
  const rotRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);
  const [activeHotspot, setActiveHotspot] = useState(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const animate = useCallback(() => {
    const lerp = 0.08;
    rotRef.current.x += (targetRef.current.x - rotRef.current.x) * lerp;
    rotRef.current.y += (targetRef.current.y - rotRef.current.y) * lerp;

    if (transformRef.current) {
      transformRef.current.style.transform = `rotateX(${rotRef.current.x}deg) rotateY(${rotRef.current.y}deg)`;
    }

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (!isInView) return;
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [animate, isInView]);

  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    targetRef.current = { x: -y * 12, y: x * 12 };
  }, []);

  const handleMouseLeave = useCallback(() => {
    targetRef.current = { x: 0, y: 0 };
  }, []);

  return (
    <section className="py-24 bg-[#05080f] border-b border-white/5 overflow-hidden" aria-label="3D Command Center">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 space-y-3"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <span className="font-mono text-xs text-[#00ff88] font-bold uppercase tracking-widest">
            // COMMAND CENTER
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white uppercase tracking-wide">
            3D ReconShield Command Center
          </h2>
          <p className="text-gray-400 text-sm max-w-xl mx-auto leading-relaxed">
            Hover to rotate the SOC dashboard. Click hotspots to explore security modules.
          </p>
        </motion.div>

        {/* 3D Container */}
        <div
          ref={containerRef}
          className="relative mx-auto max-w-[900px]"
          style={{ perspective: '2000px' }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="relative w-full"
            style={{
              transformStyle: 'preserve-3d',
              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
              transition: 'none',
            }}
          >
            {/* ============ LAYER 4: Glow Effects (deepest) ============ */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ transform: 'translateZ(90px)', transformStyle: 'preserve-3d' }}
            >
              {/* Radial glow halos */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-20"
                style={{ background: 'radial-gradient(circle, rgba(0,255,136,0.15) 0%, transparent 70%)' }} />
              <div className="absolute top-[20%] right-[15%] w-[200px] h-[200px] rounded-full opacity-15"
                style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.2) 0%, transparent 70%)' }} />

              {/* Floating particles */}
              {PARTICLES.map((p) => (
                <div
                  key={p.id}
                  className="absolute rounded-full"
                  style={{
                    left: `${p.x}%`,
                    top: `${p.y}%`,
                    width: p.size,
                    height: p.size,
                    background: p.id % 2 === 0 ? '#00ff88' : '#00E5FF',
                    opacity: 0.4,
                    animation: `particle-drift ${p.duration}s ease-in-out ${p.delay}s infinite`,
                    boxShadow: `0 0 ${p.size * 2}px ${p.id % 2 === 0 ? 'rgba(0,255,136,0.5)' : 'rgba(0,229,255,0.5)'}`,
                  }}
                />
              ))}

              {/* Connection lines */}
              <svg className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }}>
                {CONNECTION_LINES.map((line, i) => (
                  <line
                    key={i}
                    x1={line.x1} y1={line.y1}
                    x2={line.x2} y2={line.y2}
                    stroke="rgba(0,255,136,0.08)"
                    strokeWidth="1"
                    strokeDasharray="6 8"
                    className="animate-connection-dash"
                  />
                ))}
              </svg>
            </div>

            {/* ============ LAYER 1: Browser Frame (base) ============ */}
            <div
              className="relative rounded-xl overflow-hidden border border-white/10 bg-[#0a0e16] shadow-2xl"
              style={{ transform: 'translateZ(0px)', transformStyle: 'preserve-3d' }}
            >
              {/* Browser chrome */}
              <div className="flex items-center gap-3 px-4 py-3 bg-[#0d1117] border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <span className="font-mono text-[10px] text-gray-500 tracking-widest uppercase">
                    RECONSHIELD CORE SEC OPS v3.0.0
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
                  <span className="font-mono text-[9px] text-[#00ff88] uppercase tracking-wider">LIVE</span>
                </div>
              </div>

              {/* Dashboard Content Area */}
              <div className="relative p-4 md:p-6 min-h-[400px] md:min-h-[460px]">
                {/* Background grid */}
                <div className="absolute inset-0 bg-grid opacity-[0.3] pointer-events-none" />

                {/* ============ LAYER 2: Dashboard Panels ============ */}
                <div
                  className="relative grid grid-cols-1 md:grid-cols-2 gap-4"
                  style={{ transform: 'translateZ(30px)', transformStyle: 'preserve-3d' }}
                >
                  {/* Asset Radar Panel */}
                  <div className="bg-[#080c14] border border-white/5 rounded-lg p-4 relative overflow-hidden">
                    <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest block mb-4">
                      // ASSET RADAR
                    </span>
                    <div className="flex items-center justify-center h-[140px] relative">
                      {/* Radar circles */}
                      <div className="absolute w-[120px] h-[120px] rounded-full border border-cyan-500/10" />
                      <div className="absolute w-[80px] h-[80px] rounded-full border border-cyan-500/15" />
                      <div className="absolute w-[40px] h-[40px] rounded-full border border-cyan-500/20" />
                      {/* Radar sweep */}
                      <div className="absolute w-[120px] h-[120px] rounded-full animate-radar overflow-hidden">
                        <div
                          className="absolute top-0 left-1/2 w-1/2 h-1/2 origin-bottom-left"
                          style={{
                            background: 'conic-gradient(from 0deg, transparent 0deg, rgba(0,229,255,0.3) 40deg, transparent 80deg)',
                          }}
                        />
                      </div>
                      {/* Radar blips */}
                      <div className="absolute w-2 h-2 rounded-full bg-[#00ff88] shadow-[0_0_8px_rgba(0,255,136,0.6)]" style={{ top: '30%', left: '35%' }} />
                      <div className="absolute w-1.5 h-1.5 rounded-full bg-[#00E5FF] shadow-[0_0_6px_rgba(0,229,255,0.6)]" style={{ top: '55%', left: '65%' }} />
                      <div className="absolute w-1.5 h-1.5 rounded-full bg-[#a78bfa] shadow-[0_0_6px_rgba(167,139,250,0.6)]" style={{ top: '40%', left: '55%' }} />
                    </div>
                  </div>

                  {/* Threat Feed Panel */}
                  <div className="bg-[#080c14] border border-white/5 rounded-lg p-4">
                    <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest block mb-4">
                      // THREAT INCIDENTS TRACKING FEED
                    </span>
                    <div className="space-y-3">
                      {[
                        { label: 'DNS Anomalies', value: 87, color: '#00ff88' },
                        { label: 'SSL Violations', value: 62, color: '#00E5FF' },
                        { label: 'Header Misconfigs', value: 45, color: '#a78bfa' },
                        { label: 'Port Exposures', value: 23, color: '#f472b6' },
                      ].map((item, i) => (
                        <div key={i}>
                          <div className="flex justify-between mb-1">
                            <span className="font-mono text-[9px] text-gray-400 uppercase tracking-wider">{item.label}</span>
                            <span className="font-mono text-[9px] text-gray-500">{item.value}%</span>
                          </div>
                          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full rounded-full"
                              style={{ background: item.color }}
                              initial={{ width: 0 }}
                              animate={isInView ? { width: `${item.value}%` } : {}}
                              transition={{ duration: 1.2, delay: 0.3 + i * 0.15, ease: 'easeOut' }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Console Log Stream */}
                  <div className="md:col-span-2 bg-[#080c14] border border-white/5 rounded-lg p-4">
                    <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest block mb-3">
                      // CONSOLE LOG STREAM
                    </span>
                    <div className="space-y-1.5 font-mono text-[10px]">
                      {[
                        { time: '21:34:12', msg: '[DNS] DNSSEC validation passed for reconshield.in', color: '#00ff88' },
                        { time: '21:34:08', msg: '[SSL] TLS 1.3 negotiation confirmed — cipher: AES_256_GCM', color: '#00E5FF' },
                        { time: '21:34:05', msg: '[ASM] 3 new subdomains discovered via CT logs', color: '#a78bfa' },
                        { time: '21:34:01', msg: '[THR] IOC match: 0 indicators flagged across 12.4M feeds', color: '#f472b6' },
                      ].map((log, i) => (
                        <motion.div
                          key={i}
                          className="flex items-start gap-3 py-1 px-2 rounded bg-white/[0.02]"
                          initial={{ opacity: 0, x: -20 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ duration: 0.5, delay: 0.8 + i * 0.12 }}
                        >
                          <span className="text-gray-600 shrink-0">{log.time}</span>
                          <span style={{ color: log.color }}>{log.msg}</span>
                        </motion.div>
                      ))}
                      <div className="flex items-center gap-1 pt-1 text-gray-600">
                        <span>&gt;</span>
                        <span className="terminal-cursor">_</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ============ LAYER 3: Interactive Hotspots ============ */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ transform: 'translateZ(60px)', transformStyle: 'preserve-3d' }}
                >
                  {HOTSPOTS.map((spot) => (
                    <div
                      key={spot.id}
                      className="absolute pointer-events-auto"
                      style={{ ...spot.position }}
                    >
                      {/* Hotspot button */}
                      <button
                        onClick={() => setActiveHotspot(activeHotspot === spot.id ? null : spot.id)}
                        className="relative w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center cursor-pointer group z-10"
                        style={{
                          background: `${spot.color}15`,
                          border: `1.5px solid ${spot.color}40`,
                          boxShadow: `0 0 15px ${spot.color}20`,
                        }}
                        aria-label={`View ${spot.label} details`}
                      >
                        {/* Pulsing ring */}
                        <span
                          className="absolute inset-[-4px] rounded-full animate-ping"
                          style={{
                            border: `1px solid ${spot.color}30`,
                            animationDuration: '2.5s',
                          }}
                        />
                        <span
                          className="font-mono text-[8px] md:text-[9px] font-bold tracking-wider"
                          style={{ color: spot.color }}
                        >
                          {activeHotspot === spot.id ? '×' : '+'}
                        </span>
                      </button>

                      {/* Expanded detail card */}
                      <AnimatePresence>
                        {activeHotspot === spot.id && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 5 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 5 }}
                            transition={{ duration: 0.25, ease: 'easeOut' }}
                            className="absolute z-20 mt-2 w-[220px] md:w-[260px] bg-[#0a0e16]/95 backdrop-blur-xl border rounded-lg p-4 shadow-2xl"
                            style={{
                              borderColor: `${spot.color}30`,
                              boxShadow: `0 0 30px ${spot.color}10, inset 0 1px 0 ${spot.color}10`,
                              left: spot.position.right ? 'auto' : '0',
                              right: spot.position.right ? '0' : 'auto',
                            }}
                          >
                            <div className="flex items-center justify-between mb-3">
                              <span
                                className="font-mono text-[9px] font-bold uppercase tracking-widest"
                                style={{ color: spot.color }}
                              >
                                {spot.label}
                              </span>
                            </div>
                            <div className="space-y-1.5">
                              {spot.items.map((item, i) => (
                                <motion.div
                                  key={i}
                                  className="flex items-center gap-2"
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.05 }}
                                >
                                  <span style={{ color: spot.color }} className="text-[10px]">✓</span>
                                  <span className="font-mono text-[10px] text-gray-300">{item}</span>
                                </motion.div>
                              ))}
                            </div>
                            <div className="mt-3 pt-2 border-t border-white/5">
                              <span className="font-mono text-[8px] text-gray-600 uppercase tracking-wider">
                                Module Active • Real-time
                              </span>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>

              </div>
            </div>

            {/* Bottom status bar */}
            <div
              className="flex items-center justify-between px-4 py-2 bg-[#080c14] border border-white/5 border-t-0 rounded-b-xl"
              style={{ transform: 'translateZ(0px)' }}
            >
              <div className="flex items-center gap-3">
                <Shield className="w-3.5 h-3.5 text-[#00ff88]" />
                <span className="font-mono text-[9px] text-gray-500 uppercase tracking-wider">
                  4 Modules Active
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-mono text-[9px] text-gray-600 uppercase tracking-wider hidden sm:inline">
                  Latency: 12ms
                </span>
                <span className="font-mono text-[9px] text-gray-600 uppercase tracking-wider hidden sm:inline">
                  Uptime: 99.97%
                </span>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
                  <span className="font-mono text-[9px] text-[#00ff88] uppercase tracking-wider">Operational</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
