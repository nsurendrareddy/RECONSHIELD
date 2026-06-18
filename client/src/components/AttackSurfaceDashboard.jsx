'use client';

import React, { useState } from 'react';
import { 
  Shield, AlertTriangle, AlertCircle, CheckCircle, 
  Search, Terminal, Database, Server, RefreshCw, BarChart3, Lock 
} from 'lucide-react';

export default function AttackSurfaceDashboard() {
  const [selectedTab, setSelectedTab] = useState('all');
  const [targetDomain, setTargetDomain] = useState('enterprise-network.io');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Simulated issues
  const issues = [
    { 
      id: 1,
      category: 'network',
      severity: 'critical', 
      title: 'Exposed Database Interface (Port 5432)', 
      desc: 'PostgreSQL database service port exposed to the public internet on 184.22.109.4.',
      asset: 'db-replica.enterprise-network.io',
      impact: 'RCE / Data Exfiltration',
      icon: Database
    },
    { 
      id: 2,
      category: 'ssl',
      severity: 'warning', 
      title: 'Outdated TLS Protocol Suite (TLS 1.0/1.1)', 
      desc: 'Web server is negotiating connections using outdated TLS version 1.0 and 1.1 protocol specs.',
      asset: 'payments.enterprise-network.io',
      impact: 'MITM Eavesdropping',
      icon: Lock
    },
    { 
      id: 3,
      category: 'headers',
      severity: 'warning', 
      title: 'Missing Content-Security-Policy (CSP)', 
      desc: 'HTTP response headers do not enforce CSP rules, facilitating cross-site scripting (XSS).',
      asset: 'enterprise-network.io',
      impact: 'Cross-Site Scripting (XSS)',
      icon: Shield
    },
    { 
      id: 4,
      category: 'dns',
      severity: 'safe', 
      title: 'DMARC Security Policy Enforced', 
      desc: 'Valid DMARC TXT record exists with reject configuration parameters protecting brand mail flow.',
      asset: 'mail.enterprise-network.io',
      impact: 'Email Spoofing Prevention',
      icon: CheckCircle
    }
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1200);
  };

  const filteredIssues = selectedTab === 'all' 
    ? issues 
    : issues.filter(issue => issue.severity === selectedTab);

  return (
    <div className="w-full bg-[#070b12] border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative font-sans">
      {/* Header Panel */}
      <div className="p-6 border-b border-white/5 bg-surface-900/60 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-matrix-500/10 flex items-center justify-center border border-matrix-500/20">
            <Shield className="w-5 h-5 text-matrix-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-white font-bold text-sm tracking-wide font-display uppercase">{targetDomain}</span>
              <span className="text-[9px] font-mono bg-matrix-500/10 text-[#00ff88] border border-[#00ff88]/30 px-1.5 py-0.5 rounded uppercase font-bold">MONITORED</span>
            </div>
            <p className="text-[10px] text-gray-400 font-mono mt-0.5">Last indexed: 2 minutes ago</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none">
            <Search className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              value={targetDomain}
              onChange={(e) => setTargetDomain(e.target.value)}
              className="bg-surface-950/80 border border-white/10 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-matrix-400/50 w-full md:w-56 font-mono"
              placeholder="enterprise-network.io"
            />
          </div>
          <button 
            onClick={handleRefresh}
            className="p-2 bg-surface-900 border border-white/10 rounded-xl hover:bg-surface-800 transition-all cursor-pointer group"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-gray-400 group-hover:text-white ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Dashboard Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Side: Scoring Gauge & Inventory Stats */}
        <div className="lg:col-span-4 p-6 border-b lg:border-b-0 lg:border-r border-white/5 space-y-6">
          
          {/* Security Rating Gauge */}
          <div className="bg-surface-950/40 border border-white/5 rounded-2xl p-5 text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-amber-500/[0.02] to-transparent pointer-events-none" />
            <span className="text-[9px] font-mono text-gray-400 tracking-widest uppercase block mb-3">// SECURITY RATING</span>
            
            {/* SVG Rating Ring */}
            <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                {/* Gray Background circle */}
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="rgba(255,255,255,0.03)" strokeWidth="8" />
                {/* Colored progress circle */}
                <circle 
                  cx="50" 
                  cy="50" 
                  r="40" 
                  fill="transparent" 
                  stroke="#fbbf24" 
                  strokeWidth="8" 
                  strokeDasharray="251.2" 
                  strokeDashoffset={251.2 - (251.2 * 82) / 100} 
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              {/* Inner score */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-display font-bold text-white leading-none">82</span>
                <span className="text-[10px] font-mono text-amber-500 font-bold mt-1 tracking-widest uppercase">GRADE B</span>
              </div>
            </div>

            <p className="text-[11px] text-gray-400 mt-4 leading-relaxed font-sans">
              Critical score affected by <span className="text-red-400 font-bold">1 exposed database</span> service.
            </p>
          </div>

          {/* Inventory Assets Counter */}
          <div className="space-y-3">
            <span className="text-[9px] font-mono text-gray-500 tracking-widest uppercase block">// ASSET COUNT</span>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-3 bg-surface-950/40 border border-white/[0.03] rounded-xl flex flex-col">
                <span className="text-gray-500 text-[9px] uppercase">DOMAINS</span>
                <span className="text-white font-bold mt-1 text-sm">14</span>
              </div>
              <div className="p-3 bg-surface-950/40 border border-white/[0.03] rounded-xl flex flex-col">
                <span className="text-gray-500 text-[9px] uppercase">SUBDOMAINS</span>
                <span className="text-white font-bold mt-1 text-sm">118</span>
              </div>
              <div className="p-3 bg-surface-950/40 border border-white/[0.03] rounded-xl flex flex-col">
                <span className="text-gray-500 text-[9px] uppercase">IP BLOCKS</span>
                <span className="text-white font-bold mt-1 text-sm">8</span>
              </div>
              <div className="p-3 bg-surface-950/40 border border-white/[0.03] rounded-xl flex flex-col">
                <span className="text-gray-500 text-[9px] uppercase">OPEN SERVICE</span>
                <span className="text-white font-bold mt-1 text-sm">4</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Security issues log list */}
        <div className="lg:col-span-8 p-6 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            
            {/* Sub-header Filter tab keys */}
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <span className="text-[9px] font-mono text-gray-400 tracking-widest uppercase block">// INCIDENT DISCOVERIES</span>
              
              <div className="flex gap-2">
                {['all', 'critical', 'warning', 'safe'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setSelectedTab(tab)}
                    className={`px-2 py-0.5 rounded text-[9px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                      selectedTab === tab
                        ? 'bg-white/10 text-white font-bold border border-white/10'
                        : 'text-gray-500 hover:text-gray-300'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Issues Stack */}
            <div className="space-y-3">
              {filteredIssues.map((issue) => {
                const Icon = issue.icon;
                const isCritical = issue.severity === 'critical';
                const isWarning = issue.severity === 'warning';
                
                return (
                  <div 
                    key={issue.id} 
                    className="p-4 bg-surface-950/60 border border-white/5 hover:border-white/10 rounded-2xl flex items-start gap-4 transition-all group"
                  >
                    {/* Severity Symbol Indicator */}
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                      isCritical 
                        ? 'bg-red-500/10 border-red-500/20 text-red-400' 
                        : isWarning 
                          ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' 
                          : 'bg-matrix-500/10 border-matrix-500/20 text-matrix-400'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="space-y-1 flex-1">
                      <div className="flex items-start md:items-center justify-between flex-col md:flex-row gap-1">
                        <h4 className="text-xs font-bold text-white font-display uppercase tracking-wide group-hover:text-matrix-400 transition-colors">
                          {issue.title}
                        </h4>
                        <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded uppercase font-bold shrink-0 ${
                          isCritical 
                            ? 'bg-red-500/10 text-red-400' 
                            : isWarning 
                              ? 'bg-amber-500/10 text-amber-400' 
                              : 'bg-matrix-500/10 text-[#00ff88]'
                        }`}>
                          {issue.severity}
                        </span>
                      </div>
                      <p className="text-[10px] text-gray-400 leading-relaxed font-sans">{issue.desc}</p>
                      
                      {/* Technical details context row */}
                      <div className="pt-2 flex flex-wrap gap-x-4 gap-y-1 text-[8px] font-mono text-gray-500 uppercase">
                        <div>
                          <span>TARGET ASSET:</span> <span className="text-white ml-0.5 font-bold">{issue.asset}</span>
                        </div>
                        <div>
                          <span>POTENTIAL RISK:</span> <span className="text-red-400 ml-0.5 font-bold">{issue.impact}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Summary Banner */}
          <div className="p-3 bg-matrix-400/[0.02] border border-matrix-400/10 rounded-xl flex items-center justify-between text-[10px] font-mono">
            <span className="text-gray-400">EXPOSURE INTEL: READY FOR MITIGATION</span>
            <span className="text-matrix-400 font-bold uppercase tracking-wider">RESOLVE EXPOSURES →</span>
          </div>

        </div>
      </div>
    </div>
  );
}
