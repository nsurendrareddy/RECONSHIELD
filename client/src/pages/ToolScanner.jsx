import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useScan } from '../hooks/useScan';
import SearchBar from '../components/SearchBar';
import LoadingState from '../components/LoadingState';
import { Shield, Target, Globe, Lock, Cpu, Layers, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

// Specialized sections based on tool
import DnsSection from '../sections/DnsSection';
import SslSection from '../sections/SslSection';
import HeadersSection from '../sections/HeadersSection';
import VulnSimSection from '../sections/VulnSimSection';
import IpSection from '../sections/IpSection';

const TOOL_CONFIG = {
  'dns-lookup': {
    title: 'DNS Infrastructure Lookup',
    desc: 'Deep dive into MX, SPF, DMARC, and Nameserver history.',
    icon: <Globe />,
    section: DnsSection,
    dataKey: 'dns'
  },
  'ssl-checker': {
    title: 'SSL/TLS Security Auditor',
    desc: 'Analyze certificate chains, cipher suites, and vulnerabilities.',
    icon: <Lock />,
    section: SslSection,
    dataKey: 'ssl'
  },
  'security-headers': {
    title: 'HTTP Header Security',
    desc: 'Evaluate CSP, HSTS, X-Frame-Options and other security headers.',
    icon: <Layers />,
    section: HeadersSection,
    dataKey: 'headers'
  },
  'vulnerability-scanner': {
    title: 'Vulnerability Simulation',
    desc: 'Simulated attack vectors to identify potential weaknesses.',
    icon: <Shield />,
    section: VulnSimSection,
    dataKey: 'vuln_sim'
  },
  'threat-intelligence': {
    title: 'Threat Intel & Reputation',
    desc: 'IP reputation, blacklist status, and ASN intelligence.',
    icon: <Activity />,
    section: IpSection,
    dataKey: 'ip'
  }
};

export default function ToolScanner() {
  const { toolId } = useParams();
  const config = TOOL_CONFIG[toolId] || TOOL_CONFIG['dns-lookup'];
  const { status, scanData, domain, scan, scanProgress, progress, reset } = useScan();
  const results = scanData?.results || {};

  React.useEffect(() => {
    document.title = `${config.title} | ReconShield Security Tools`;
  }, [config.title]);

  return (
    <div className="max-w-5xl mx-auto py-12">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4 mb-10"
      >
        <div className="w-14 h-14 rounded-2xl bg-matrix-400/10 border border-matrix-400/20 flex items-center justify-center text-matrix-400">
          {React.cloneElement(config.icon, { size: 28 })}
        </div>
        <div>
          <h1 className="text-3xl font-display font-bold text-white uppercase tracking-wider">{config.title}</h1>
          <p className="text-gray-500 font-mono text-sm mt-1">{config.desc}</p>
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
          
          <config.section data={results[config.dataKey]} />
        </motion.div>
      )}
    </div>
  );
}
