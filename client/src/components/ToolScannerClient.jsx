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
  'whois-checker': { section: DomainSection, icon: Activity, dataKey: 'whois' },
  'dns-lookup': { section: DnsSection, icon: Globe, dataKey: 'dns' },
  'ssl-checker': { section: SslSection, icon: Lock, dataKey: 'ssl' },
  'subdomain-finder': { section: SubdomainSection, icon: Layers, dataKey: 'subdomains' },
  'port-scanner': { section: PortSection, icon: Activity, dataKey: 'ports' },
  'security-headers': { section: HeadersSection, icon: Layers, dataKey: 'headers' },
  'email-security-checker': { section: DnsSection, icon: Shield, dataKey: 'dns' },
  'threat-intelligence': { section: IpSection, icon: Activity, dataKey: 'ip' },
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
          <div className="flex items-center justify-between p-4 bg-matrix-400/5 border border-matrix-400/10 rounded-xl mb-6">
            <span className="font-mono text-xs text-matrix-400 uppercase font-bold">Analysis Results for: {domain}</span>
            <button onClick={reset} className="text-[10px] font-mono text-gray-500 hover:text-matrix-400 uppercase underline">New Analysis</button>
          </div>
          
          <SectionComponent data={results[tool.dataKey]} />
        </motion.div>
      )}

    </div>
  );
}
