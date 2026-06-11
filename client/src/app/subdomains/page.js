import React from 'react';
import Link from 'next/link';
import { Network, Search, Server, Globe, ChevronRight, Activity, Shield, Lock } from 'lucide-react';
import { KNOWN_DOMAINS } from '@/lib/entityRegistry';

export const metadata = {
  title: 'Subdomain Intelligence Hub - ReconShield',
  description: 'Explore the Subdomain Intelligence Hub. Understand subdomain enumeration, passive recon, DNS architectures, and shadow IT asset discovery.',
  alternates: { canonical: 'https://reconshield.in/subdomains' }
};

export default function SubdomainsHubPage() {
  const commonDomains = ['google.com', 'github.com', 'microsoft.com', 'openai.com', 'cloudflare.com', 'apple.com'].filter(domain => KNOWN_DOMAINS.includes(domain));
  
  const topics = [
    { slug: 'subdomain-enumeration', title: 'Subdomain Enumeration', desc: 'Understanding the methodologies for mapping subdomains.' },
    { slug: 'passive-enumeration', title: 'Passive Enumeration', desc: 'Reconnaissance techniques without interacting directly with the target.' },
    { slug: 'certificate-transparency', title: 'Certificate Transparency', desc: 'Leveraging CT logs to discover newly minted domains.' },
    { slug: 'subdomain-takeover', title: 'Subdomain Takeover', desc: 'Identifying dangling DNS records pointing to inactive hosts.' },
    { slug: 'shadow-it', title: 'Shadow IT Asset Discovery', desc: 'Finding unauthorized dev or staging boxes outside administrative controls.' },
    { slug: 'active-enumeration', title: 'Active Enumeration', desc: 'Directly querying nameservers using wordlists and brute force.' },
    { slug: 'asset-discovery', title: 'Asset Discovery', desc: 'Mapping the external perimeter and public interfaces.' },
    { slug: 'attack-surface-management', title: 'Attack Surface Management', desc: 'Continuous discovery and risk mitigation of public hosts.' }
  ];

  return (
    <div className="min-h-screen pb-24 font-sans bg-[#06090e]">
      <div className="max-w-[1200px] mx-auto px-6 pt-12">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-xs font-mono text-gray-500">
            <li><Link href="/" className="hover:text-[#00ff88] transition-colors">Home</Link></li>
            <li><ChevronRight className="w-3 h-3" /></li>
            <li className="text-[#00ff88]">Subdomains Intelligence Hub</li>
          </ol>
        </nav>

        <header className="mb-12 border-b border-[#1a2332] pb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Subdomain Intelligence Hub</h1>
          <p className="text-gray-400 text-lg max-w-3xl leading-relaxed">
            Subdomain discovery is the foundation of external asset mapping. Learn about domain infrastructures, active/passive reconnaissance, Certificate Transparency logs, and dangling DNS risks.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2">
                <Network className="w-5 h-5 text-[#00ff88]" /> Domain Subdomain Maps
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {commonDomains.map(domain => (
                  <Link key={domain} href={`/subdomains/${domain}`} className="bg-[#0d1117] border border-white/5 hover:border-[#00ff88]/30 p-4 rounded-xl transition-all group">
                    <div className="text-lg font-bold text-white group-hover:text-[#00ff88] truncate">{domain}</div>
                    <div className="text-xs text-gray-500 font-mono mt-1">View Domain Map →</div>
                  </Link>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2">
                <Search className="w-5 h-5 text-[#00ff88]" /> Educational Intelligence Topics
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {topics.map(topic => (
                  <Link key={topic.slug} href={`/subdomains/${topic.slug}`} className="bg-[#0d1117] border border-white/5 hover:border-[#00ff88]/30 p-5 rounded-xl transition-all group">
                    <h3 className="text-sm font-bold text-white group-hover:text-[#00ff88] transition-colors mb-1">{topic.title}</h3>
                    <p className="text-xs text-gray-400 leading-relaxed font-sans">{topic.desc}</p>
                    <div className="text-xs text-[#00ff88] font-mono mt-3 flex items-center gap-1 opacity-80">
                      Learn More <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            <section className="prose prose-invert max-w-none">
              <h2 className="text-2xl font-bold text-white mb-4">Subdomain Intelligence & Perimeter Defence</h2>
              <p>
                Organizations frequently lose track of staging, testing, and third-party SaaS host points. These orphaned systems present high risk vectors for data theft, bypasses, and domain takeovers.
              </p>
              <p>
                Continuous subdomain mapping and DNS audits allow security departments to detect dangling records and isolate dev/staging boxes behind corporate VPN networks before they can be enumerated.
              </p>
            </section>
          </div>

          <aside className="lg:col-span-1 space-y-6">
            <div className="bg-[#0d1117] border border-white/5 rounded-xl p-6 sticky top-24">
              <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-widest">Related Hubs</h3>
              <ul className="space-y-3">
                <li><Link href="/dns-analysis" className="text-[#00ff88] hover:underline flex items-center gap-2"><Shield className="w-4 h-4"/> DNS Analysis</Link></li>
                <li><Link href="/ssl" className="text-[#00ff88] hover:underline flex items-center gap-2"><Lock className="w-4 h-4"/> SSL Analysis</Link></li>
                <li><Link href="/ports" className="text-[#00ff88] hover:underline flex items-center gap-2"><Server className="w-4 h-4"/> Ports Hub</Link></li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
