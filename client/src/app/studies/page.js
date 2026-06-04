import React from 'react';
import Link from 'next/link';
import { FileText, Database, ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
  title: 'Original Cybersecurity Studies & Surveys | ReconShield',
  description: 'Read original security studies detailing DNS Hijacking trends, TLS deprecation metrics, and corporate attack surface exposure levels.',
  alternates: {
    canonical: 'https://reconshield.in/studies',
  }
};

const SECURITY_STUDIES = [
  {
    id: 'global-email-alignment-index',
    title: 'The 2026 Global Email Authentication & DMARC Alignment Index',
    desc: 'An empirical survey analyzing DMARC, SPF, and DKIM deployment rates across 50,000 public corporate domains. Discover the correlation between missing headers and phishing delivery success.',
    category: 'Email Security',
    pages: '18 Pages',
    date: 'June 2026'
  },
  {
    id: 'tls-deprecation-handshake-survey',
    title: 'State of SSL/TLS: Handshake Latencies and Protocol Deprecation Trends',
    desc: 'A measurement study of SSL/TLS protocol deployments across Alexa Top 100K sites. Evaluates TLS 1.3 0-RTT deployment density and the persistence of legacy CBC ciphers.',
    category: 'Cryptographic Standards',
    pages: '12 Pages',
    date: 'May 2026'
  },
  {
    id: 'public-cloud-port-exposures',
    title: 'Shadow IT & Cloud Port Exposures: The Database Vulnerability Index',
    desc: 'Analyzing exposed MySQL (3306), Redis (6379), and RDP (3389) servers across public IPv4 cloud subnets. Evaluates the response times of administrators to automated exposure warnings.',
    category: 'Attack Surface Management',
    pages: '24 Pages',
    date: 'March 2026'
  }
];

export default function StudiesIndexPage() {
  return (
    <div className="min-h-screen pb-24 bg-[#05080f] text-white">
      <div className="max-w-5xl mx-auto px-4 pt-8">
        
        <Breadcrumbs crumbs={[
          { label: 'Research Center', href: '/research' },
          { label: 'Studies', href: '/studies' }
        ]} />

        {/* Back Link */}
        <Link href="/research" className="inline-flex items-center gap-2 text-xs font-mono text-gray-500 hover:text-[#00ff88] transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Research Hub</span>
        </Link>

        {/* Header */}
        <div className="border-b border-white/10 pb-8 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-[10px] font-mono text-cyan-400 mb-4 uppercase tracking-widest">
            <BookOpen className="w-3 h-3" />
            <span>Telemetry & Internet Measurements</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold font-display leading-tight mb-4">
            Cybersecurity Studies
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl leading-relaxed">
            Read original empirical studies, threat surveys, and telemetry mappings detailing the state of public internet exposure.
          </p>
        </div>

        {/* Studies List */}
        <div className="space-y-6">
          {SECURITY_STUDIES.map((study) => (
            <div 
              key={study.id}
              className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 hover:border-cyan-500/30 transition-all flex flex-col md:flex-row md:items-center md:justify-between gap-6"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[10px] font-mono text-cyan-400 uppercase bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                    {study.category}
                  </span>
                  <span className="text-[10px] font-mono text-gray-500 uppercase">{study.date}</span>
                </div>
                <h2 className="text-lg font-bold font-display text-white mb-2 leading-snug">
                  {study.title}
                </h2>
                <p className="text-xs text-gray-400 leading-relaxed font-sans mb-4 max-w-3xl">
                  {study.desc}
                </p>
                <div className="text-[10px] font-mono text-gray-500 uppercase">
                  LENGTH: {study.pages}
                </div>
              </div>

              <div className="shrink-0">
                <Link 
                  href={`/contact?inquiry=study&id=${study.id}`}
                  className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 border border-cyan-500/30 px-6 py-3 rounded-xl font-bold transition-all text-xs font-mono"
                >
                  Read Study <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* E-E-A-T Footnote */}
        <div className="mt-16 p-6 bg-[#0d1117]/50 rounded-2xl border border-white/5 text-center">
          <h3 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest mb-2">Research Methodology</h3>
          <p className="text-xs text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Our research methodology relies exclusively on passive DNS queries, SSL handshake inspections, and public BGP updates. We strictly adhere to our <Link href="/editorial-policy" className="text-[#00ff88] underline">Fact-Checking Policy</Link> to ensure all telemetry data is verified.
          </p>
        </div>

      </div>
    </div>
  );
}
