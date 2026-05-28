import React from 'react';
import Link from 'next/link';
import { Server, Network, Lock, Shield, ChevronRight } from 'lucide-react';

export const metadata = {
  title: 'IP Intelligence Hub - ReconShield',
  description: 'Explore our IP Intelligence directory. Analyze geolocation, ASN associations, and threat intel across various IP addresses to support network defense.',
  alternates: { canonical: 'https://reconshield.in/ip-intelligence' }
};

export default function IpIntelligenceHubPage() {
  const sampleIps = ['8.8.8.8', '1.1.1.1', '9.9.9.9', '185.191.171.2', '194.165.16.2', '8.8.4.4', '1.0.0.1', '208.67.222.222'];
  
  return (
    <div className="min-h-screen pb-24 font-sans bg-[#06090e]">
      <div className="max-w-[1200px] mx-auto px-6 pt-12">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-xs font-mono text-gray-500">
            <li><Link href="/" className="hover:text-[#00ff88] transition-colors">Home</Link></li>
            <li><ChevronRight className="w-3 h-3" /></li>
            <li className="text-[#00ff88]">IP Intelligence Hub</li>
          </ol>
        </nav>

        <header className="mb-12 border-b border-[#1a2332] pb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">IP Intelligence Hub</h1>
          <p className="text-gray-400 text-lg max-w-3xl leading-relaxed">
            Access detailed intelligence for IP addresses, including geographic location, ASN associations, and behavioral threat analysis to empower network defenders.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2">
                <Server className="w-5 h-5 text-[#00ff88]" /> Sample IP Analysis
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {sampleIps.map(ip => (
                  <Link key={ip} href={`/ip/${ip}`} className="bg-[#0d1117] border border-white/5 hover:border-[#00ff88]/30 p-4 rounded-xl transition-all group">
                    <div className="text-lg font-bold text-white group-hover:text-[#00ff88]">{ip}</div>
                    <div className="text-xs text-gray-500 font-mono mt-1">View Intel →</div>
                  </Link>
                ))}
              </div>
            </section>

            <section className="prose prose-invert max-w-none">
              <h2 className="text-2xl font-bold text-white mb-4">The Importance of IP Intelligence</h2>
              <p>
                IP Intelligence is critical for identifying malicious actors, verifying legitimate traffic, and enforcing geofencing rules. By correlating an IP address with its physical location and ASN, analysts can distinguish between standard enterprise traffic and suspicious proxy networks.
              </p>
              <h3 className="text-xl font-bold text-white mb-3">Defensive Applications</h3>
              <ul>
                <li><strong>Threat Hunting:</strong> Correlating IPs to known threat actors (e.g., botnet controllers).</li>
                <li><strong>Access Control:</strong> Implementing Zero Trust policies based on geographic anomalies.</li>
                <li><strong>Compliance:</strong> Guaranteeing data flows comply with localized privacy regulations by ensuring traffic does not route through unauthorized jurisdictions.</li>
              </ul>
            </section>
          </div>

          <aside className="lg:col-span-1 space-y-6">
            <div className="bg-[#0d1117] border border-white/5 rounded-xl p-6 sticky top-24">
              <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-widest">Related Hubs</h3>
              <ul className="space-y-3">
                <li><Link href="/asn" className="text-[#00ff88] hover:underline flex items-center gap-2"><Network className="w-4 h-4"/> ASN Database</Link></li>
                <li><Link href="/ports" className="text-[#00ff88] hover:underline flex items-center gap-2"><Server className="w-4 h-4"/> Ports Hub</Link></li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
