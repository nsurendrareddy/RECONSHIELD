import React from 'react';
import Link from 'next/link';
import { Shield, Network, Lock, Server, ChevronRight } from 'lucide-react';

export const metadata = {
  title: 'DNS Analysis Hub - ReconShield',
  description: 'Explore our DNS Analysis hub. Review critical DNS infrastructure, mail exchange (MX) security, and domain routing architectures to prevent email spoofing.',
  alternates: { canonical: 'https://reconshield.in/dns-analysis' }
};

export default function DnsAnalysisHubPage() {
  const commonDomains = ['google.com', 'github.com', 'microsoft.com', 'cloudflare.com', 'apple.com'];
  
  return (
    <div className="min-h-screen pb-24 font-sans bg-[#06090e]">
      <div className="max-w-[1200px] mx-auto px-6 pt-12">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-xs font-mono text-gray-500">
            <li><Link href="/" className="hover:text-[#00ff88] transition-colors">Home</Link></li>
            <li><ChevronRight className="w-3 h-3" /></li>
            <li className="text-[#00ff88]">DNS Analysis Hub</li>
          </ol>
        </nav>

        <header className="mb-12 border-b border-[#1a2332] pb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">DNS Analysis Hub</h1>
          <p className="text-gray-400 text-lg max-w-3xl leading-relaxed">
            The Domain Name System (DNS) directs global traffic. Analyze DNS zone records to ensure proper routing and validate security policies like SPF, DKIM, and DMARC that prevent phishing.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#00ff88]" /> Domain Infrastructure Profiles
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {commonDomains.map(domain => (
                  <Link key={domain} href={`/dns-records/${domain}`} className="bg-[#0d1117] border border-white/5 hover:border-[#00ff88]/30 p-4 rounded-xl transition-all group">
                    <div className="text-lg font-bold text-white group-hover:text-[#00ff88] truncate">{domain}</div>
                    <div className="text-xs text-gray-500 font-mono mt-1">View Records →</div>
                  </Link>
                ))}
              </div>
            </section>

            <section className="prose prose-invert max-w-none">
              <h2 className="text-2xl font-bold text-white mb-4">Securing DNS Configurations</h2>
              <p>
                Without proper DNS hygiene, organizations are susceptible to traffic hijacking, subdomain takeovers, and email spoofing. Routine auditing of DNS zones is critical for maintaining corporate security postures.
              </p>
              <h3 className="text-xl font-bold text-white mb-3">Defensive Configurations</h3>
              <ul>
                <li><strong>Prevent Subdomain Takeovers:</strong> Ensure all CNAME records point to active resources. Dangling CNAMEs can be hijacked by unauthorized actors to host malicious content.</li>
                <li><strong>Harden Email Infrastructure:</strong> Enforce strict SPF, DKIM, and DMARC policies in TXT records to cryptographically verify email senders and eliminate phishing.</li>
                <li><strong>Protect Zone Transfers:</strong> Ensure authoritative nameservers do not permit anonymous AXFR zone transfers.</li>
              </ul>
            </section>
          </div>

          <aside className="lg:col-span-1 space-y-6">
            <div className="bg-[#0d1117] border border-white/5 rounded-xl p-6 sticky top-24">
              <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-widest">Related Hubs</h3>
              <ul className="space-y-3">
                <li><Link href="/ssl" className="text-[#00ff88] hover:underline flex items-center gap-2"><Lock className="w-4 h-4"/> SSL Hub</Link></li>
                <li><Link href="/ip-intelligence" className="text-[#00ff88] hover:underline flex items-center gap-2"><Server className="w-4 h-4"/> IP Intelligence</Link></li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
