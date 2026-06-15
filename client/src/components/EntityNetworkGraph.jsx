'use client';

import React, { useState } from 'react';
import { 
  Network, Shield, Activity, ShieldAlert, Cpu, 
  Terminal, Globe, Lock, Info, Server 
} from 'lucide-react';

export default function EntityNetworkGraph() {
  const [hoveredNode, setHoveredNode] = useState(null);

  // Nodes representing different intelligence hubs
  const nodes = [
    { 
      id: 'central', 
      label: 'ENTITY INTEL CORE', 
      x: 250, 
      y: 200, 
      icon: Shield, 
      color: 'text-matrix-400', 
      bg: 'bg-matrix-950/90 border-matrix-400/50 shadow-matrix-400/20',
      description: 'Unified entity graph correlation engine.'
    },
    { 
      id: 'ports', 
      label: 'Ports Directory', 
      x: 80, 
      y: 90, 
      icon: Terminal, 
      color: 'text-[#38bdf8]', 
      bg: 'bg-surface-900/90 border-[#38bdf8]/40 shadow-[#38bdf8]/10',
      description: 'Active port telemetry & exposed service protocols.'
    },
    { 
      id: 'asn', 
      label: 'ASN Directory', 
      x: 420, 
      y: 90, 
      icon: Network, 
      color: 'text-[#a78bfa]', 
      bg: 'bg-surface-900/90 border-[#a78bfa]/40 shadow-[#a78bfa]/10',
      description: 'Autonomous System numbers & routing path mapping.'
    },
    { 
      id: 'ip', 
      label: 'IP Intelligence Hub', 
      x: 60, 
      y: 220, 
      icon: Globe, 
      color: 'text-[#00ff88]', 
      bg: 'bg-surface-900/90 border-[#00ff88]/40 shadow-[#00ff88]/10',
      description: 'Global reputation index & geolocation intelligence.'
    },
    { 
      id: 'ssl', 
      label: 'SSL Analysis Hub', 
      x: 440, 
      y: 220, 
      icon: Lock, 
      color: 'text-[#38bdf8]', 
      bg: 'bg-surface-900/90 border-[#38bdf8]/40 shadow-[#38bdf8]/10',
      description: 'Cryptography audits, certificate validity & cipher checking.'
    },
    { 
      id: 'dns', 
      label: 'DNS Records Hub', 
      x: 100, 
      y: 350, 
      icon: Server, 
      color: 'text-[#fbbf24]', 
      bg: 'bg-surface-900/90 border-[#fbbf24]/40 shadow-[#fbbf24]/10',
      description: 'Authority paths, MX configurations & domain validation.'
    },
    { 
      id: 'tech', 
      label: 'Technology Detection', 
      x: 400, 
      y: 350, 
      icon: Cpu, 
      color: 'text-[#f43f5e]', 
      bg: 'bg-surface-900/90 border-[#f43f5e]/40 shadow-[#f43f5e]/10',
      description: 'Web server fingerprinting & shadow IT stack detection.'
    },
    { 
      id: 'vuln', 
      label: 'Vulnerability Database', 
      x: 250, 
      y: 380, 
      icon: ShieldAlert, 
      color: 'text-[#f97316]', 
      bg: 'bg-surface-900/90 border-[#f97316]/40 shadow-[#f97316]/10',
      description: 'Zero-day vulnerability disclosures and CVE mapping.'
    }
  ];

  // Links connecting satellite nodes to Central node and adjacent nodes
  const links = [
    { from: 'central', to: 'ports' },
    { from: 'central', to: 'asn' },
    { from: 'central', to: 'ip' },
    { from: 'central', to: 'ssl' },
    { from: 'central', to: 'dns' },
    { from: 'central', to: 'tech' },
    { from: 'central', to: 'vuln' },
    // Cross connections
    { from: 'ports', to: 'ip' },
    { from: 'ip', to: 'dns' },
    { from: 'dns', to: 'vuln' },
    { from: 'vuln', to: 'tech' },
    { from: 'tech', to: 'ssl' },
    { from: 'ssl', to: 'asn' }
  ];

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-6 px-4">
      {/* Node Graph Visualization */}
      <div className="lg:col-span-7 relative flex items-center justify-center bg-surface-950/60 border border-white/5 rounded-3xl p-6 h-[480px] overflow-hidden shadow-2xl">
        {/* Subtle grid background inside canvas */}
        <div className="absolute inset-0 bg-grid opacity-[0.15] pointer-events-none" />
        
        <svg viewBox="0 0 500 450" className="w-full h-full max-w-[480px] z-10 select-none">
          <defs>
            {/* Pulsing glow definition */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            {/* Animated linear gradients */}
            <linearGradient id="line-glow-matrix" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00ff88" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#00E5FF" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#00ff88" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* Render Connections */}
          {links.map((link, idx) => {
            const fromNode = nodes.find(n => n.id === link.from);
            const toNode = nodes.find(n => n.id === link.to);
            if (!fromNode || !toNode) return null;

            // Highlight connections related to the hovered node
            const isActive = hoveredNode === link.from || hoveredNode === link.to;
            const isHoveredState = hoveredNode !== null;

            return (
              <g key={idx}>
                {/* Background soft link lines */}
                <line 
                  x1={fromNode.x} 
                  y1={fromNode.y} 
                  x2={toNode.x} 
                  y2={toNode.y} 
                  className={`transition-all duration-500 ${
                    isActive 
                      ? 'stroke-matrix-400/60 stroke-2' 
                      : isHoveredState 
                        ? 'stroke-white/[0.01]' 
                        : 'stroke-white/[0.06]'
                  }`}
                  style={{ transition: 'stroke-width 0.3s' }}
                />
                
                {/* Pulsing signal dots flowing along active lines */}
                {(!isHoveredState || isActive) && (
                  <line 
                    x1={fromNode.x} 
                    y1={fromNode.y} 
                    x2={toNode.x} 
                    y2={toNode.y} 
                    stroke="url(#line-glow-matrix)"
                    strokeWidth={isActive ? "2" : "1"}
                    strokeDasharray="6 30"
                    className="animate-[dash_8s_linear_infinite]"
                  />
                )}
              </g>
            );
          })}

          {/* Render Interactive Nodes */}
          {nodes.map((node) => {
            const IconComponent = node.icon;
            const isCentral = node.id === 'central';
            const isHovered = hoveredNode === node.id;
            const isDimmed = hoveredNode !== null && hoveredNode !== node.id;

            return (
              <g 
                key={node.id}
                className="cursor-pointer group"
                transform={`translate(${node.x}, ${node.y})`}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                {/* Hover Glow Orb */}
                <circle 
                  cx="0" 
                  cy="0" 
                  r={isCentral ? "32" : "24"} 
                  className={`fill-none stroke-current transition-all duration-300 ${
                    isHovered 
                      ? `${node.id === 'central' ? 'text-matrix-400' : 'text-cyan-400'} opacity-30` 
                      : 'opacity-0'
                  }`}
                  filter="url(#glow)"
                  strokeWidth="8"
                />

                {/* Node Container Circle */}
                <circle 
                  cx="0" 
                  cy="0" 
                  r={isCentral ? "22" : "18"} 
                  className={`fill-[#05080f] stroke-2 transition-all duration-300 ${
                    isHovered 
                      ? 'stroke-matrix-400 scale-110 shadow-lg' 
                      : isDimmed 
                        ? 'stroke-white/10 opacity-40' 
                        : 'stroke-white/20'
                  }`}
                />

                {/* Icon inside Node */}
                <g transform={isCentral ? "translate(-9, -9)" : "translate(-7, -7)"} className={`transition-all duration-300 ${isDimmed ? 'opacity-40' : ''}`}>
                  <IconComponent className={`stroke-[2] ${isCentral ? 'w-[18px] h-[18px]' : 'w-[14px] h-[14px]'} ${isHovered ? 'text-matrix-400' : node.color}`} />
                </g>

                {/* Text Label (visible or styled differently on hover) */}
                <text 
                  x="0" 
                  y={isCentral ? "38" : "32"} 
                  textAnchor="middle" 
                  className={`font-mono text-[7px] tracking-wider uppercase transition-all duration-300 font-bold ${
                    isHovered 
                      ? 'fill-matrix-400 text-glow-green text-[8px]' 
                      : isDimmed 
                        ? 'fill-gray-600 opacity-40' 
                        : 'fill-gray-400'
                  }`}
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* CSS Animated Dash Effect Inline */}
        <style jsx global>{`
          @keyframes dash {
            to {
              stroke-dashoffset: -200;
            }
          }
        `}</style>
      </div>

      {/* Intelligence Node Data Details Panel */}
      <div className="lg:col-span-5 space-y-6">
        <div>
          <span className="font-mono text-xs text-matrix-400 uppercase tracking-widest font-bold">// INTERCONNECTED GRAPH</span>
          <h3 className="text-2xl font-display font-bold text-white uppercase tracking-wide mt-1">Cross-Asset Correlation</h3>
          <p className="text-gray-400 text-xs leading-relaxed mt-2 font-sans">
            In modern external attack surfaces, assets do not exist in isolation. A single exposed IP maps to an autonomous network (ASN), hosts domain records (DNS), runs web services (Tech), and presents credentials (SSL) with security indicators (Vulnerabilities).
          </p>
        </div>

        <div className="bg-surface-900/50 border border-white/5 rounded-2xl p-5 shadow-inner min-h-[160px] flex flex-col justify-between transition-all duration-300">
          {hoveredNode ? (
            <div>
              <div className="flex items-center gap-3 border-b border-white/5 pb-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-surface-950 flex items-center justify-center border border-white/10">
                  {React.createElement(nodes.find(n => n.id === hoveredNode).icon, { className: "w-4 h-4 text-matrix-400" })}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white font-mono uppercase">{nodes.find(n => n.id === hoveredNode).label}</h4>
                  <span className="text-[9px] text-matrix-400 font-mono tracking-widest">CORRELATED ENTITY</span>
                </div>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed mb-4">{nodes.find(n => n.id === hoveredNode).description}</p>
              
              <div className="grid grid-cols-2 gap-2 text-[9px] font-mono uppercase text-gray-500">
                <div className="bg-surface-950/40 p-2 border border-white/[0.03] rounded">
                  <span>TELEMETRY:</span> <span className="text-white ml-1 font-bold">100% PASSIVE</span>
                </div>
                <div className="bg-surface-950/40 p-2 border border-white/[0.03] rounded">
                  <span>STATUS:</span> <span className="text-matrix-400 ml-1 font-bold">MONITORED</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-4">
              <Info className="w-8 h-8 text-gray-600 mb-2 animate-bounce" />
              <p className="text-xs text-gray-400 max-w-xs leading-relaxed font-mono uppercase">
                Hover over the nodes on the network graph to inspect linked metadata correlations in real time.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
