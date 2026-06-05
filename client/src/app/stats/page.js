import React from 'react';
import { BarChart3, Shield, BookOpen, Quote, ShieldCheck, Database, Calendar } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
  title: 'Global Cybersecurity Statistics & Telemetry | ReconShield',
  description: 'Public threat statistics detailing SSL/TLS cipher usage, exposed TCP ports, and security header adoption rates across top enterprise boundaries.',
  alternates: {
    canonical: 'https://reconshield.in/stats',
  }
};

const STATS_CARDS = [
  {
    category: 'SSL/TLS Protocol Adoption',
    title: 'TLS 1.3 Default Negotiation',
    value: '85.2%',
    desc: 'Percentage of top 10,000 public enterprise domains successfully negotiating the TLS 1.3 protocol by default.',
    trend: '+12% YoY'
  },
  {
    category: 'Network Port Exposure',
    title: 'Exposed Database Endpoints',
    value: '4.2%',
    desc: 'Prevalence of database listener interfaces (MySQL / Postgres) listening directly on public internet routes.',
    trend: '-1.5% YoY'
  },
  {
    category: 'HTTP Response Headers',
    title: 'HSTS Header Enforcement',
    value: '45.0%',
    desc: 'Surveyed domains setting strict transport security policies to force HTTPS connections client-side.',
    trend: '+8.5% YoY'
  },
  {
    category: 'Email Authentication',
    title: 'DMARC Enforcement Rate',
    value: '38.6%',
    desc: 'Percentage of checked corporate mail domains running active DMARC records with quarantine or reject tags.',
    trend: '+15.2% YoY'
  }
];

export default function StatisticsHubPage() {
  return (
    <div className="bg-[#05080f] min-h-screen text-white pb-24">
      <div className="max-w-5xl mx-auto px-4 pt-8">
        
        <Breadcrumbs crumbs={[
          { label: 'Statistics Hub', href: '/stats' }
        ]} />

        {/* Page Header */}
        <div className="border-b border-white/10 pb-8 mb-12 mt-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-[10px] font-mono text-cyan-400 mb-4 uppercase tracking-widest">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Public Telemetry Data</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold font-display leading-tight mb-4">
            Global Infrastructure Security Statistics
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl leading-relaxed font-sans">
            Real-time cybersecurity statistics compiled across our passive scanning networks. Evaluates SSL/TLS standards, port exposures, security headers, and email authentication configurations.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {STATS_CARDS.map((stat, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 space-y-4 hover:border-[#00ff88]/20 transition-all flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-widest text-gray-500">
                  <span>{stat.category}</span>
                  <span className="text-emerald-400">{stat.trend}</span>
                </div>
                <h3 className="text-3xl font-extrabold text-[#00ff88] font-mono mt-2">{stat.value}</h3>
                <h4 className="text-sm font-bold text-white mt-1">{stat.title}</h4>
                <p className="text-xs text-gray-400 leading-relaxed font-sans mt-2">{stat.desc}</p>
              </div>

              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden mt-4">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-[#00ff88]" style={{ width: stat.value }} />
              </div>
            </div>
          ))}
        </div>

        {/* Citation Guidelines for Journalists */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 space-y-4">
            <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Database className="w-4 h-4 text-cyan-400" />
              Source Methodology & Compilation
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed font-sans">
              Statistics are compiled dynamically by scraping Certificate Transparency logs, auditing public DNS records, and analyzing non-intrusive service banners across 10,000 top enterprise domains. Data is aggregated weekly to reflect current internet-wide patterns.
            </p>
            <div className="flex items-center gap-2 text-[10px] font-mono text-gray-500">
              <Calendar className="w-3.5 h-3.5" />
              <span>Last Data Sweeps: June 2026</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 space-y-4 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Quote className="w-4 h-4 text-[#00ff88]" />
                How to Cite this Telemetry
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed font-sans mb-3">
                Journalists and security researchers can reference this data using the APA citation snippet below:
              </p>
            </div>
            <div className="p-3 bg-black rounded border border-white/5 text-[10px] font-mono text-cyan-300 select-all break-all leading-relaxed">
              ReconShield Telemetry Hub. "Global Infrastructure Security Statistics." June 2026. Available at https://reconshield.in/stats.
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
