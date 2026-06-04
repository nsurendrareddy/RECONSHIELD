import React from 'react';
import Link from 'next/link';
import { Database, Shield, ArrowLeft } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
  title: 'Authoritative Cybersecurity Data Sources | ReconShield',
  description: 'Examine the list of open-source registries, threat databases, and protocol standards organizations referenced across ReconShield.',
  alternates: {
    canonical: 'https://reconshield.in/data-sources',
  }
};

const DATA_SOURCES = [
  {
    name: 'IANA (Internet Assigned Numbers Authority)',
    purpose: 'Standard port number assignments, protocol parameters, and root zone databases.',
    url: 'https://www.iana.org'
  },
  {
    name: 'NVD (National Vulnerability Database)',
    purpose: 'CVE data streams and CVSS scores used in vulnerability scanners and blog reports.',
    url: 'https://nvd.nist.gov'
  },
  {
    name: 'Spamhaus Project',
    purpose: 'IP reputation lists (DROP/EDROP) used in malicious IP diagnostics.',
    url: 'https://www.spamhaus.org'
  },
  {
    name: 'AbuseIPDB',
    purpose: 'Crowdsourced IP abuse reports and history telemetry for reputation scoring.',
    url: 'https://www.abuseipdb.com'
  },
  {
    name: 'IETF (Internet Engineering Task Force)',
    purpose: 'RFC specifications for DNS, SSL/TLS, SMTP, and other core routing standards.',
    url: 'https://www.ietf.org'
  }
];

export default function DataSourcesPage() {
  return (
    <div className="min-h-screen pb-24 bg-[#05080f] text-white">
      <div className="max-w-3xl mx-auto px-4 pt-8">
        
        <Breadcrumbs crumbs={[
          { label: 'Data Sources', href: '/data-sources' }
        ]} />

        {/* Header */}
        <div className="border-b border-white/10 pb-8 mb-10 mt-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00ff88]/10 border border-[#00ff88]/20 rounded-full text-[10px] font-mono text-[#00ff88] mb-4 uppercase tracking-widest">
            <Database className="w-3 h-3" />
            <span>Telemetry Standards & Feeds</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold font-display leading-tight mb-4">
            Data Sources
          </h1>
          <p className="text-gray-400 text-base leading-relaxed">
            Standard databases, repositories, and registries consumed by ReconShield tools and research workflows.
          </p>
        </div>

        {/* List of Data Sources */}
        <div className="space-y-6">
          {DATA_SOURCES.map((source, i) => (
            <div 
              key={i}
              className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
            >
              <div>
                <h2 className="text-base font-bold font-mono text-white mb-2">{source.name}</h2>
                <p className="text-xs text-gray-400 leading-relaxed font-sans">{source.purpose}</p>
              </div>
              <div className="shrink-0">
                <a 
                  href={source.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center justify-center bg-white/5 hover:bg-white/10 text-white border border-white/10 px-4 py-2 rounded-xl text-xs font-mono transition-all"
                >
                  Visit Registry ↗
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
