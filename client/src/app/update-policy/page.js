import React from 'react';
import Link from 'next/link';
import { RefreshCw, Clock, Database, ShieldAlert, ArrowLeft } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
  title: 'Data Update Frequency Policy | ReconShield',
  description: 'Understand how frequently scanning data, public reports, threat feeds, and database entries are updated on the ReconShield security platform.',
  alternates: {
    canonical: 'https://reconshield.in/update-policy',
  }
};

export default function UpdatePolicyPage() {
  return (
    <div className="min-h-screen pb-24 bg-[#05080f] text-white">
      <div className="max-w-4xl mx-auto px-4 pt-8">
        
        <Breadcrumbs crumbs={[
          { label: 'Update Policy', href: '/update-policy' }
        ]} />

        {/* Back Link */}
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-mono text-gray-500 hover:text-[#00ff88] transition-colors mb-6 mt-6">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        {/* Header */}
        <div className="border-b border-white/10 pb-8 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00ff88]/10 border border-[#00ff88]/20 rounded-full text-[10px] font-mono text-[#00ff88] mb-4 uppercase tracking-widest">
            <RefreshCw className="w-3 h-3" />
            <span>Telemetry Lifespans & Caching</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold font-display leading-tight mb-4">
            Data Update & Cache Policy
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl leading-relaxed">
            Details regarding report caching, threat-intelligence feed synchronization, and tool refresh frequencies.
          </p>
        </div>

        {/* Update Policy Content */}
        <div className="space-y-10">
          
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#00ff88]" />
              1. Public Report Caching (7 Days)
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              All public domain reports compiled under <code>/reports/ssl/</code>, <code>/reports/subdomains/</code>, and <code>/reports/ports/</code> are cached using a strict 7-day revalidation cycle (<code>revalidate = 604800</code>). 
              This caching prevents excessive load on DNS nameservers and ensures consistent loading speeds for search engine web crawlers. 
              If you require an instant, un-cached report, run the query directly inside the live tool interface.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Database className="w-5 h-5 text-cyan-400" />
              2. Threat-Intelligence Database Feeds
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              ReconShield synchronizes its CVE database references and IP reputation databases with primary registries (such as the NVD and AbuseIPDB) on a daily basis. 
              Our ports database indexes are reviewed and revised weekly to incorporate newly discovered common protocol services.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-500" />
              3. Live Scan Requests
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Live queries executed through the tool dashboard (e.g. SSL Checker, Subdomain Finder, Port Scanner) retrieve real-time DNS queries, TLS handshakes, and socket states directly. 
              These queries bypass cache layers and represent the instantaneous operational state of the target system at the millisecond of execution.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
}
