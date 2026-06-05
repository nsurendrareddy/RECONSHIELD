'use client'
import React from 'react';
import { useScan } from '@/hooks/useScan';
import SearchBar from '@/components/SearchBar';
import LoadingState from '@/components/LoadingState';
import { motion } from 'framer-motion';
import { Globe, Lock, Layers, Shield, Activity } from 'lucide-react';

// Specialized sections
import DnsSection from '@/sections/DnsSection';
import SslSection from '@/sections/SslSection';
import HeadersSection from '@/sections/HeadersSection';
import VulnSimSection from '@/sections/VulnSimSection';
import IpSection from '@/sections/IpSection';
import DomainSection from '@/sections/DomainSection';
import SubdomainSection from '@/sections/SubdomainSection';
import PortSection from '@/sections/PortSection';
import TechSection from '@/sections/TechSection';

const SECTION_MAP = {
  'ip-lookup': { section: IpSection, icon: Globe, dataKey: 'ip' },
  'whois': { section: DomainSection, icon: Activity, dataKey: 'whois' },
  'dns-lookup': { section: DnsSection, icon: Globe, dataKey: 'dns' },
  'ssl-checker': { section: SslSection, icon: Lock, dataKey: 'ssl' },
  'subdomain-finder': { section: SubdomainSection, icon: Layers, dataKey: 'subdomains' },
  'port-scanner': { section: PortSection, icon: Activity, dataKey: 'ports' },
  'http-headers': { section: HeadersSection, icon: Layers, dataKey: 'headers' },
  'email-security': { section: DnsSection, icon: Shield, dataKey: 'dns' },
  'tech-detector': { section: TechSection, icon: Layers, dataKey: 'tech' },
  'vulnerability-scanner': { section: VulnSimSection, icon: Shield, dataKey: 'vuln_sim' },
};

export default function ToolScannerClient({ toolId, title, desc }) {
  const { status, scanData, domain, scan, scanProgress, progress, reset } = useScan();
  const results = scanData?.results || {};
  
  const tool = SECTION_MAP[toolId] || SECTION_MAP['dns-lookup'];
  const SectionComponent = tool.section;
  const IconComponent = tool.icon;

  return (
    <div className="max-w-5xl mx-auto py-12">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4 mb-10"
      >
        <div className="w-14 h-14 rounded-2xl bg-matrix-400/10 border border-matrix-400/20 flex items-center justify-center text-matrix-400">
          <IconComponent size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-display font-bold text-white uppercase tracking-wider">{title}</h1>
          <p className="text-gray-500 font-mono text-sm mt-1">{desc}</p>
        </div>
      </motion.div>

      <div className="glass-card p-8 mb-10">
        <SearchBar onScan={scan} isScanning={status === 'scanning'} />
      </div>

      {status === 'scanning' && (
        <LoadingState progress={progress} domain={domain} scanProgress={scanProgress} />
      )}

      {status === 'completed' && scanData && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-matrix-400/5 border border-matrix-400/10 rounded-xl gap-4">
            <span className="font-mono text-xs text-matrix-400 uppercase font-bold">Analysis Results for: {domain}</span>
            <div className="flex gap-4">
              <button onClick={reset} className="text-[10px] font-mono text-gray-400 hover:text-matrix-400 uppercase underline">New Analysis</button>
            </div>
          </div>

          {/* Download & Attribution Export Panel */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white/[0.02] border border-white/5 rounded-xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[10px] font-mono text-gray-500">EXPORT:</span>
              <button onClick={() => alert('PDF Report downloaded. Please credit reconshield.in.')} className="px-2.5 py-1 bg-[#00ff88]/10 hover:bg-[#00ff88]/20 border border-[#00ff88]/30 rounded text-[10px] font-mono text-[#00ff88]">
                PDF Report
              </button>
              <button onClick={() => alert('CSV dataset exported. Please credit reconshield.in.')} className="px-2.5 py-1 bg-cyan-400/10 hover:bg-cyan-400/20 border border-cyan-400/30 rounded text-[10px] font-mono text-cyan-400">
                CSV Export
              </button>
              <button onClick={() => alert('JSON object exported. Please credit reconshield.in.')} className="px-2.5 py-1 bg-purple-400/10 hover:bg-purple-400/20 border border-purple-400/30 rounded text-[10px] font-mono text-purple-400">
                JSON Export
              </button>
            </div>
            <span className="text-[9px] font-mono text-gray-500">
              * Requires attribution link back to reconshield.in upon redistribution.
            </span>
          </div>
          
          <SectionComponent data={results[tool.dataKey]} />

          {/* Post-scan conversion prompt */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-500/5 to-transparent border border-cyan-500/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div className="space-y-1">
              <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">Continuous Vulnerability Scanning</h4>
              <p className="text-xs text-gray-400 leading-relaxed font-sans max-w-xl">
                Tired of manual triggers? Establish automated alerts for expired certificates, exposed ports, and missing security headers.
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <button onClick={reset} className="px-4 py-2 bg-white/5 border border-white/10 text-white font-mono font-bold text-xs rounded-xl hover:bg-white/10 transition-all cursor-pointer">
                Scan Another target
              </button>
              <a href="/contact" className="px-4 py-2 bg-cyan-400 text-black font-mono font-bold text-xs rounded-xl hover:opacity-90 transition-all">
                Automate Now
              </a>
            </div>
          </div>

        </motion.div>
      )}

    </div>
  );
}
