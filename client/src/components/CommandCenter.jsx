'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Shield, ShieldAlert, Cpu, Terminal, Network, Globe, Activity, Check, ShieldCheck, Radio } from 'lucide-react';

export default function CommandCenter() {
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [terminalLogs, setTerminalLogs] = useState([
    'SEC_OPS_INIT // Establishing secure environment...',
    'NET_SCANNER // Active telemetry port hooks initialized.',
  ]);
  const [cyberNodes, setCyberNodes] = useState([]);
  const containerRef = useRef(null);

  // Motion values for mouse tilt
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateXSpring = useSpring(useTransform(y, [0, 1], [12, -12]), { stiffness: 120, damping: 25 });
  const rotateYSpring = useSpring(useTransform(x, [0, 1], [-12, 12]), { stiffness: 120, damping: 25 });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = (e.clientX - rect.left) / width;
    const mouseY = (e.clientY - rect.top) / height;
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
    setActiveHotspot(null);
  };

  // Generate logs
  useEffect(() => {
    const mockLogs = [
      'DNS_ENGINE // Validated DNSSEC root keys successfully.',
      'SSL_ANALYZER // Audited cipher suites: ECDHE-RSA-AES256-GCM-SHA384 active.',
      'ATTACK_SURFACE // Discovered 4 new asset endpoints passively.',
      'THREAT_INTEL // Correlated IOC reputation cache mismatch.',
      'RECONSHIELD_CORE // Running passive diagnostic pipeline validation...',
      'DMARC_CHECK // DMARC signature validated: p=reject policy enforced.',
    ];
    const interval = setInterval(() => {
      const log = mockLogs[Math.floor(Math.random() * mockLogs.length)];
      const time = new Date().toLocaleTimeString();
      setTerminalLogs((prev) => [`[${time}] ${log}`, ...prev.slice(0, 4)]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Generate floating nodes inside the Asset Radar
  useEffect(() => {
    const nodes = Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      x: 30 + Math.random() * 40,
      y: 30 + Math.random() * 40,
      size: 3 + Math.random() * 4,
      delay: Math.random() * 2,
    }));
    setCyberNodes(nodes);
  }, []);

  const hotspots = [
    {
      id: 'A',
      title: 'DNS SECURITY ENGINE',
      icon: Network,
      pos: { top: '35%', left: '28%' },
      items: [
        'DNSSEC Validation',
        'SPF Analysis',
        'DMARC Validation',
        'CAA Verification',
        'Zone Transfer Detection',
      ],
    },
    {
      id: 'B',
      title: 'THREAT INTELLIGENCE',
      icon: ShieldAlert,
      pos: { top: '30%', right: '20%' },
      items: [
        'IOC Correlation',
        'Malware Indicators',
        'Threat Actor Tracking',
        'Reputation Analysis',
      ],
    },
    {
      id: 'C',
      title: 'ATTACK SURFACE MONITOR',
      icon: Globe,
      pos: { bottom: '30%', left: '22%' },
      items: [
        'Asset Discovery',
        'Subdomain Enumeration',
        'Open Service Detection',
        'Exposure Monitoring',
      ],
    },
    {
      id: 'D',
      title: 'SSL/TLS ANALYZER',
      icon: ShieldCheck,
      pos: { bottom: '25%', right: '35%' },
      items: [
        'Certificate Validation',
        'Cipher Analysis',
        'TLS Version Review',
        'Expiration Monitoring',
      ],
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-[#05080f] border-b border-white/5 font-sans" id="command-center">
      {/* Grid background for layout */}
      <div className="absolute inset-0 bg-grid opacity-[0.15] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyber-500/[0.03] blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="text-center mb-16 space-y-3">
          <span className="font-mono text-xs text-cyber-400 font-bold uppercase tracking-widest block animate-pulse">
            // CONSOLE PREVIEW
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white uppercase tracking-wider">
            3D RECONSHIELD COMMAND CENTER
          </h2>
          <p className="text-gray-400 text-sm max-w-xl mx-auto leading-relaxed">
            Hover to rotate browser mockup, and select hotspots to reveal technical capabilities details.
          </p>
        </div>

        {/* Outer Perspective Wrapper */}
        <div 
          className="w-full relative flex items-center justify-center py-8" 
          style={{ perspective: '2000px' }}
        >
          {/* Rotated Container */}
          <motion.div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              rotateX: rotateXSpring,
              rotateY: rotateYSpring,
              transformStyle: 'preserve-3d',
            }}
            className="w-full max-w-5xl bg-surface-900/30 border border-white/10 rounded-2xl p-6 relative shadow-[0_30px_100px_rgba(0,0,0,0.8)] backdrop-blur-md transition-shadow duration-300 hover:shadow-[0_40px_120px_rgba(0,229,255,0.06)]"
          >
            {/* Layer 1: Browser Frame Background */}
            <div 
              className="absolute inset-0 rounded-2xl border border-white/5 bg-gradient-to-b from-surface-900/60 to-surface-950/90 pointer-events-none"
              style={{ transform: 'translateZ(0px)' }}
            />

            {/* Browser Window Bar (Red, Yellow, Green circles & Title) */}
            <div 
              className="flex items-center justify-between pb-4 border-b border-white/5 mb-6 relative z-20"
              style={{ transform: 'translateZ(10px)', transformStyle: 'preserve-3d' }}
            >
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                <span className="w-2.5 h-2.5 rounded-full bg-matrix-400/80 shadow-[0_0_8px_rgba(0,255,156,0.5)]" />
                <span className="font-mono text-[10px] text-gray-500 ml-4 tracking-wider">RECONSHIELD CORE SEC OPS v2.4.0</span>
              </div>
              <div className="flex items-center gap-2 font-mono text-[9px] text-cyber-400">
                <Radio className="w-3.5 h-3.5 animate-pulse text-matrix-400" />
                <span className="tracking-widest uppercase">LIVE COMMAND ROOM</span>
              </div>
            </div>

            {/* Layer 2: Dashboard Panels Grid */}
            <div 
              className="grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10"
              style={{ transform: 'translateZ(35px)', transformStyle: 'preserve-3d' }}
            >
              {/* Left Panel: ASSET RADAR (Col Span 7) */}
              <div className="md:col-span-7 bg-surface-950/80 border border-white/5 rounded-xl p-5 relative overflow-hidden h-[320px] flex flex-col justify-between">
                <div className="absolute top-3 left-4 font-mono text-[10px] text-gray-500 tracking-wider">
                  // ASSET RADAR SYSTEM
                </div>
                
                {/* Radar Sweep Graphic */}
                <div className="flex-1 flex items-center justify-center relative mt-4">
                  {/* Radar Circles */}
                  <div className="w-48 h-48 rounded-full border border-cyber-500/10 flex items-center justify-center relative">
                    <div className="w-36 h-36 rounded-full border border-cyber-500/15 flex items-center justify-center">
                      <div className="w-24 h-24 rounded-full border border-cyber-500/20 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full border border-cyber-500/30 flex items-center justify-center" />
                      </div>
                    </div>
                    
                    {/* Crosshairs */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-full h-[1px] bg-cyber-500/10" />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-full w-[1px] bg-cyber-500/10" />
                    </div>

                    {/* Sweep Hand */}
                    <div className="absolute inset-0 origin-center bg-gradient-to-r from-cyber-400/0 via-cyber-400/0 to-cyber-400/15 animate-[spin_4s_linear_infinite] rounded-full" />

                    {/* Cyber Node Dots (Floating) */}
                    {cyberNodes.map((node) => (
                      <motion.div
                        key={node.id}
                        initial={{ opacity: 0.1 }}
                        animate={{ opacity: [0.1, 0.9, 0.1] }}
                        transition={{ duration: 3, repeat: Infinity, delay: node.delay }}
                        style={{
                          left: `${node.x}%`,
                          top: `${node.y}%`,
                          width: `${node.size}px`,
                          height: `${node.size}px`,
                        }}
                        className="absolute rounded-full bg-matrix-400 shadow-[0_0_8px_#00FF9C]"
                      />
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 font-mono text-[9px] text-gray-500 mt-2">
                  <Activity className="w-3.5 h-3.5 text-matrix-400 animate-pulse" />
                  <span>GRID CONSOLE FEED ACTIVE // SECURE ZONE</span>
                </div>
              </div>

              {/* Right Panel: THREAT INTELLIGENCE (Col Span 5) */}
              <div className="md:col-span-5 bg-surface-950/80 border border-white/5 rounded-xl p-5 relative overflow-hidden h-[320px] flex flex-col justify-between">
                <div className="font-mono text-[10px] text-gray-500 tracking-wider mb-3">
                  // THREAT INCIDENTS TRACKING FEED
                </div>

                {/* Threat feed log lists */}
                <div className="flex-1 space-y-3 font-mono text-[10px] overflow-hidden text-gray-400">
                  <div className="p-2.5 bg-surface-900/40 border-l-2 border-red-500 rounded-r-md flex flex-col gap-1">
                    <div className="flex justify-between text-[9px]">
                      <span className="text-red-400 font-bold">CRITICAL INCIDENT</span>
                      <span className="text-gray-500">IP: 185.190.140.9</span>
                    </div>
                    <p className="text-gray-300">Target enumeration attempt from blocklisted ASN.</p>
                  </div>
                  <div className="p-2.5 bg-surface-900/40 border-l-2 border-amber-500 rounded-r-md flex flex-col gap-1">
                    <div className="flex justify-between text-[9px]">
                      <span className="text-amber-400 font-bold">WARNING INCIDENT</span>
                      <span className="text-gray-500">SSL_EXPIRY</span>
                    </div>
                    <p className="text-gray-300">Port 443 cert certificate chain validation check warning.</p>
                  </div>
                  <div className="p-2.5 bg-surface-900/40 border-l-2 border-cyber-400 rounded-r-md flex flex-col gap-1">
                    <div className="flex justify-between text-[9px]">
                      <span className="text-cyber-400 font-bold">INFO LOG</span>
                      <span className="text-gray-500">WHOIS_REG</span>
                    </div>
                    <p className="text-gray-300">WHOIS registration age changed check executed successfully.</p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-gray-500">
                  <span>MALWARE REPOS: ALIGNED</span>
                  <span className="text-matrix-400 animate-pulse">● FEED ONLINE</span>
                </div>
              </div>

              {/* Bottom Panel: CONSOLE LOG STREAM (Col Span 12) */}
              <div className="md:col-span-12 bg-surface-950/80 border border-white/5 rounded-xl p-4 relative overflow-hidden h-[120px] flex flex-col justify-between">
                <div className="font-mono text-[10px] text-gray-500 tracking-wider">
                  // CONSOLE LOG STREAM
                </div>

                <div className="flex-1 flex flex-col justify-end gap-1.5 font-mono text-[10px] text-matrix-400 overflow-hidden mt-2">
                  {terminalLogs.map((log, index) => (
                    <div key={index} className="flex gap-2 items-center truncate">
                      <span className="text-cyber-400 font-bold shrink-0">&gt;&gt;</span>
                      <span className={index === 0 ? "text-white" : "text-matrix-400/60"}>{log}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Layer 3: Glowing Interactive Hotspots */}
            {hotspots.map((hotspot) => {
              const IconComp = hotspot.icon;
              const isActive = activeHotspot === hotspot.id;
              
              return (
                <div
                  key={hotspot.id}
                  style={{ 
                    ...hotspot.pos, 
                    transform: 'translateZ(65px)', 
                    transformStyle: 'preserve-3d' 
                  }}
                  className="absolute z-30"
                >
                  <button
                    onClick={() => setActiveHotspot(isActive ? null : hotspot.id)}
                    onMouseEnter={() => setActiveHotspot(hotspot.id)}
                    aria-label={`Toggle capability card for ${hotspot.title}`}
                    id={`hotspot-${hotspot.id}`}
                    className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 relative border ${
                      isActive 
                        ? 'bg-cyber-500 text-surface-950 border-cyber-400 shadow-[0_0_20px_#00E5FF]' 
                        : 'bg-surface-950/90 text-cyber-400 border-cyber-500/30 hover:border-cyber-400 hover:shadow-[0_0_15px_rgba(0,229,255,0.4)]'
                    }`}
                  >
                    {/* Ring Pulse Effect */}
                    <span className="absolute inset-0 rounded-full border border-cyber-400 animate-ping opacity-40" />
                    <IconComp className="w-4 h-4" />
                  </button>

                  {/* Layer 4: Popups (Capability List cards overlaying the hotspots) */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        style={{ transform: 'translateZ(95px)' }}
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-64 bg-surface-950/95 border border-cyber-500/40 rounded-xl p-4 shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-md pointer-events-auto"
                      >
                        <div className="flex items-center gap-1.5 border-b border-cyber-500/20 pb-2 mb-3">
                          <Activity className="w-3.5 h-3.5 text-cyber-400" />
                          <h4 className="font-display font-bold text-xs text-white uppercase tracking-wider">
                            {hotspot.title}
                          </h4>
                        </div>
                        <ul className="space-y-1.5 text-left">
                          {hotspot.items.map((item, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-[10px] font-mono text-gray-300">
                              <Check className="w-3 h-3 text-matrix-400 shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                        {/* Glow corner decorations */}
                        <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-cyber-400 rounded-tl" />
                        <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-cyber-400 rounded-tr" />
                        <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-cyber-400 rounded-bl" />
                        <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-cyber-400 rounded-br" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
