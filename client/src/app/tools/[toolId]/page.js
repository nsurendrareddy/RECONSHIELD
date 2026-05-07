'use client'
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { useScan } from '@/hooks/useScan';
import SearchBar from '@/components/SearchBar';
import LoadingState from '@/components/LoadingState';
import { Shield, Target, Globe, Lock, Cpu, Layers, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

// Specialized sections based on tool
import DnsSection from '@/sections/DnsSection';
import SslSection from '@/sections/SslSection';
import HeadersSection from '@/sections/HeadersSection';
import VulnSimSection from '@/sections/VulnSimSection';
import IpSection from '@/sections/IpSection';

const TOOL_CONFIG = {
  'dns-lookup': {
    title: 'DNS Infrastructure Lookup',
    desc: 'Deep dive into MX, SPF, DMARC, and Nameserver history.',
    icon: <Globe />,
    section: DnsSection,
    dataKey: 'dns',
    seoContent: (
      <div className="mt-16 prose prose-invert max-w-none border-t border-white/5 pt-12">
        <h2 className="text-2xl font-display font-bold text-white mb-6 uppercase tracking-wider">About DNS Infrastructure Analysis</h2>
        <p className="text-gray-400 leading-relaxed mb-6 font-mono text-sm">
          Domain Name System (DNS) is the phonebook of the internet. Analyzing DNS records is a critical first step in any security reconnaissance. 
          By examining MX, SPF, and DMARC records, you can identify potential email spoofing risks and infrastructure weaknesses. 
          Our tool performs a non-intrusive lookup to provide you with a comprehensive view of your domain's DNS posture.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
          <div className="glass-card p-6">
            <h4 className="text-matrix-400 font-bold mb-2 uppercase text-xs">What is an MX Record?</h4>
            <p className="text-gray-500 text-xs leading-relaxed">Mail Exchanger records specify the mail servers responsible for receiving email on behalf of a domain.</p>
          </div>
          <div className="glass-card p-6">
            <h4 className="text-matrix-400 font-bold mb-2 uppercase text-xs">Why check SPF/DMARC?</h4>
            <p className="text-gray-500 text-xs leading-relaxed">These records prevent unauthorized actors from sending emails appearing to be from your domain, a technique known as spoofing.</p>
          </div>
        </div>
        <h3 className="text-xl font-display font-bold text-white mb-4 uppercase">Frequently Asked Questions</h3>
        <div className="space-y-4">
          <details className="glass-card p-4 cursor-pointer group">
            <summary className="text-sm font-mono text-gray-300 group-hover:text-matrix-400 transition-colors">Is this scan intrusive?</summary>
            <p className="mt-4 text-xs text-gray-500 leading-relaxed">No. We only perform public queries against global DNS nameservers. No direct contact is made with your local infrastructure.</p>
          </details>
          <details className="glass-card p-4 cursor-pointer group">
            <summary className="text-sm font-mono text-gray-300 group-hover:text-matrix-400 transition-colors">How often should I audit DNS?</summary>
            <p className="mt-4 text-xs text-gray-500 leading-relaxed">We recommend a weekly audit or whenever you make changes to your cloud infrastructure to ensure records are consistent.</p>
          </details>
        </div>
      </div>
    )
  },
  'ssl-checker': {
    title: 'SSL/TLS Security Auditor',
    desc: 'Analyze certificate chains, cipher suites, and vulnerabilities.',
    icon: <Lock />,
    section: SslSection,
    dataKey: 'ssl',
    seoContent: (
      <div className="mt-16 prose prose-invert max-w-none border-t border-white/5 pt-12">
        <h2 className="text-2xl font-display font-bold text-white mb-6 uppercase tracking-wider">SSL/TLS Security Standards</h2>
        <p className="text-gray-400 leading-relaxed mb-6 font-mono text-sm">
          Encryption is the backbone of web security. An outdated SSL certificate or weak TLS cipher suites can leave your users' data vulnerable to interception. 
          The ReconShield SSL Auditor checks your certificate chain, validates expiration dates, and ensures that you are using modern, secure protocols.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
          <div className="glass-card p-6">
            <h4 className="text-matrix-400 font-bold mb-2 uppercase text-xs">Certificate Chain Validation</h4>
            <p className="text-gray-500 text-xs leading-relaxed">We verify the trust link from your certificate up to the root Certificate Authority (CA).</p>
          </div>
          <div className="glass-card p-6">
            <h4 className="text-matrix-400 font-bold mb-2 uppercase text-xs">Cipher Suite Assessment</h4>
            <p className="text-gray-500 text-xs leading-relaxed">Ensuring your server doesn't support weak or deprecated encryption methods like SSLv3 or TLS 1.0.</p>
          </div>
        </div>
        <h3 className="text-xl font-display font-bold text-white mb-4 uppercase">Security FAQ</h3>
        <div className="space-y-4">
          <details className="glass-card p-4 cursor-pointer group">
            <summary className="text-sm font-mono text-gray-300 group-hover:text-matrix-400 transition-colors">Why does my SSL show "Warning"?</summary>
            <p className="mt-4 text-xs text-gray-500 leading-relaxed">This usually means a certificate in your chain is expiring soon or you are using a legacy protocol that is no longer recommended.</p>
          </details>
        </div>
      </div>
    )
  },
  'security-headers': {
    title: 'HTTP Header Security',
    desc: 'Evaluate CSP, HSTS, X-Frame-Options and other security headers.',
    icon: <Layers />,
    section: HeadersSection,
    dataKey: 'headers',
    seoContent: (
      <div className="mt-16 prose prose-invert max-w-none border-t border-white/5 pt-12">
        <h2 className="text-2xl font-display font-bold text-white mb-6 uppercase tracking-wider">Understanding Security Headers</h2>
        <p className="text-gray-400 leading-relaxed mb-6 font-mono text-sm">
          HTTP security headers are a powerful way to harden your website with minimal performance impact. 
          They instruct the browser on how to handle content and interactions, preventing common attacks like XSS, clickjacking, and session hijacking.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-10">
          <div className="glass-card p-4">
            <h4 className="text-matrix-400 font-bold mb-1 uppercase text-[10px]">CSP</h4>
            <p className="text-gray-500 text-[10px]">Prevents Cross-Site Scripting (XSS) by restricting where content can be loaded from.</p>
          </div>
          <div className="glass-card p-4">
            <h4 className="text-matrix-400 font-bold mb-1 uppercase text-[10px]">HSTS</h4>
            <p className="text-gray-500 text-[10px]">Forces the browser to always use HTTPS for all communication.</p>
          </div>
          <div className="glass-card p-4">
            <h4 className="text-matrix-400 font-bold mb-1 uppercase text-[10px]">X-Frame</h4>
            <p className="text-gray-500 text-[10px]">Prevents Clickjacking by stopping your site from being loaded in an iframe.</p>
          </div>
        </div>
      </div>
    )
  },
  'vulnerability-scanner': {
    title: 'Vulnerability Simulation',
    desc: 'Simulated attack vectors to identify potential weaknesses.',
    icon: <Shield />,
    section: VulnSimSection,
    dataKey: 'vuln_sim',
    seoContent: (
      <div className="mt-16 prose prose-invert max-w-none border-t border-white/5 pt-12">
        <h2 className="text-2xl font-display font-bold text-white mb-6 uppercase tracking-wider">Passive Vulnerability Assessment</h2>
        <p className="text-gray-400 leading-relaxed mb-6 font-mono text-sm">
          Proactive security requires understanding your weaknesses before an attacker does. 
          Our simulation engine uses passive footprinting to identify likely vulnerabilities based on version headers, infrastructure patterns, and public exploit databases.
        </p>
        <div className="p-6 bg-red-500/5 border border-red-500/10 rounded-2xl mb-8">
          <p className="text-xs text-red-400/80 font-mono leading-relaxed italic">
            "Security is not a product, but a process." - Bruce Schneier. 
            Continuous scanning is the only way to stay ahead of the ever-evolving threat landscape.
          </p>
        </div>
      </div>
    )
  },
  'threat-intelligence': {
    title: 'Threat Intel & Reputation',
    desc: 'IP reputation, blacklist status, and ASN intelligence.',
    icon: <Activity />,
    section: IpSection,
    dataKey: 'ip',
    seoContent: (
      <div className="mt-16 prose prose-invert max-w-none border-t border-white/5 pt-12">
        <h2 className="text-2xl font-display font-bold text-white mb-6 uppercase tracking-wider">Global Threat Intelligence</h2>
        <p className="text-gray-400 leading-relaxed mb-6 font-mono text-sm">
          Knowing who you are interacting with is vital. Our threat intelligence engine aggregates data from hundreds of blacklists and reputation feeds 
          to provide a clear picture of the risk associated with any given IP or network block.
        </p>
      </div>
    )
  }
};

export default function ToolScanner({ toolId: propToolId }) {
  const params = useParams();
  const toolId = propToolId || params?.toolId || 'dns-lookup';
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

      {/* SEO & Educational Content */}
      {config.seoContent}
    </div>
  );
}
