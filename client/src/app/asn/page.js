import React from 'react';
import Link from 'next/link';
import { Network, Server, Lock, Shield, ChevronRight } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
  title: 'Autonomous System Number (ASN) Intelligence Hub - ReconShield',
  description: 'Explore the ASN intelligence hub. Understand global routing infrastructure, BGP configurations, and the network owners behind public IP addresses.',
  alternates: { canonical: 'https://reconshield.in/asn' }
};

export default function AsnHubPage() {
  const commonAsns = ['AS15169', 'AS13335', 'AS714', 'AS32934', 'AS16509', 'AS8075', 'AS14618', 'AS54113'];
  
  return (
    <div className="min-h-screen pb-24 font-sans bg-[#06090e]">
      <div className="max-w-[1200px] mx-auto px-6 pt-12">
        <Breadcrumbs crumbs={[
          { label: 'ASN Hub', href: '/asn' }
        ]} />

        <header className="mb-12 border-b border-[#1a2332] pb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">ASN Intelligence Hub</h1>
          <p className="text-gray-400 text-lg max-w-3xl leading-relaxed">
            Autonomous System Numbers (ASNs) are the backbone of global internet routing. Explore threat intelligence, BGP routing data, and organizational associations for major internet service providers and cloud platforms.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2">
                <Network className="w-5 h-5 text-[#00ff88]" /> Prominent ASNs
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {commonAsns.map(asn => (
                  <Link key={asn} href={`/asn/${asn}`} className="bg-[#0d1117] border border-white/5 hover:border-[#00ff88]/30 p-4 rounded-xl transition-all group">
                    <div className="text-lg font-bold text-white group-hover:text-[#00ff88]">{asn}</div>
                    <div className="text-xs text-gray-500 font-mono mt-1">View Routing Info →</div>
                  </Link>
                ))}
              </div>
            </section>

            <section className="prose prose-invert max-w-none">
              <h2 className="text-2xl font-bold text-white mb-4">What is an ASN?</h2>
              <p>
                An Autonomous System (AS) is a collection of connected Internet Protocol (IP) routing prefixes under the control of one or more network operators on behalf of a single administrative entity or domain. The ASN is a unique number assigned to an AS for use in BGP (Border Gateway Protocol) routing.
              </p>
              <h3 className="text-xl font-bold text-white mb-3">Security Relevance</h3>
              <p>
                Analyzing ASN data helps security teams map infrastructure to known organizations. If traffic from an unfamiliar or untrusted ASN is detected accessing sensitive internal systems, it may indicate a security anomaly, prompting immediate firewall mitigation or geographical blocking.
              </p>
            </section>
          </div>

          <aside className="lg:col-span-1 space-y-6">
            <div className="bg-[#0d1117] border border-white/5 rounded-xl p-6 sticky top-24">
              <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-widest">Related Hubs</h3>
              <ul className="space-y-3">
                <li><Link href="/ip-intelligence" className="text-[#00ff88] hover:underline flex items-center gap-2"><Server className="w-4 h-4"/> IP Intelligence</Link></li>
                <li><Link href="/ports" className="text-[#00ff88] hover:underline flex items-center gap-2"><Network className="w-4 h-4"/> Ports Directory</Link></li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
