import React from 'react';
import Link from 'next/link';
import { Lock, Server, Shield, Network, ChevronRight } from 'lucide-react';
import { KNOWN_DOMAINS } from '@/lib/entityRegistry';

export const metadata = {
  title: 'SSL Configuration Intelligence Hub - ReconShield',
  description: 'Explore the SSL Intelligence Hub. Understand HTTPS encryption, TLS configurations, and cryptographic security for modern web infrastructure.',
  alternates: { canonical: 'https://reconshield.in/ssl' }
};

export default function SslHubPage() {
  const commonDomains = ['google.com', 'github.com', 'microsoft.com', 'cloudflare.com', 'apple.com'].filter(domain => KNOWN_DOMAINS.includes(domain));
  
  return (
    <div className="min-h-screen pb-24 font-sans bg-[#06090e]">
      <div className="max-w-[1200px] mx-auto px-6 pt-12">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-xs font-mono text-gray-500">
            <li><Link href="/" className="hover:text-[#00ff88] transition-colors">Home</Link></li>
            <li><ChevronRight className="w-3 h-3" /></li>
            <li className="text-[#00ff88]">SSL Intelligence Hub</li>
          </ol>
        </nav>

        <header className="mb-12 border-b border-[#1a2332] pb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">SSL Intelligence Hub</h1>
          <p className="text-gray-400 text-lg max-w-3xl leading-relaxed">
            Secure Sockets Layer (SSL) and Transport Layer Security (TLS) are critical to data protection. Explore the cryptographic configurations of internet-facing assets and learn how to harden transport encryption.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2">
                <Lock className="w-5 h-5 text-[#00ff88]" /> Domain SSL Configurations
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {commonDomains.map(domain => (
                  <Link key={domain} href={`/ssl/${domain}`} className="bg-[#0d1117] border border-white/5 hover:border-[#00ff88]/30 p-4 rounded-xl transition-all group">
                    <div className="text-lg font-bold text-white group-hover:text-[#00ff88] truncate">{domain}</div>
                    <div className="text-xs text-gray-500 font-mono mt-1">View Certificate →</div>
                  </Link>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#00ff88]" /> SSL/TLS Security Guides
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { slug: 'ssl-vs-tls', title: 'SSL vs. TLS Comparison', desc: 'Understanding the cryptographic differences and deprecation timelines.' },
                  { slug: 'tls-1-2-vs-tls-1-3', title: 'TLS 1.2 vs. TLS 1.3', desc: 'Performance, latency, and cipher configuration upgrades in TLS 1.3.' },
                  { slug: 'certificate-chain', title: 'Certificate Chain Trust', desc: 'How intermediate and root certificate authorities build trust chains.' },
                  { slug: 'cipher-suites', title: 'Understanding Cipher Suites', desc: 'Analyzing key exchange, encryption, and hashing algorithm packages.' },
                  { slug: 'self-signed-certificate', title: 'Self-Signed Certificate Risks', desc: 'Security implications and trust warning bypasses in internal networks.' },
                  { slug: 'wildcard-certificate', title: 'Wildcard Certificate Guide', desc: 'Securing multiple subdomains with single wildcard certificates.' },
                  { slug: 'pki-explained', title: 'Public Key Infrastructure (PKI)', desc: 'The architecture of asymmetric cryptography, CAs, and RAs.' },
                  { slug: 'https-security', title: 'Enforcing HTTPS Server Security', desc: 'Hardening protocols, cipher parameters, and transport headers.' }
                ].map(topic => (
                  <Link key={topic.slug} href={`/ssl/${topic.slug}`} className="bg-[#0d1117] border border-white/5 hover:border-[#00ff88]/30 p-5 rounded-xl transition-all group">
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
              <h2 className="text-2xl font-bold text-white mb-4">TLS Hardening & Compliance</h2>
              <p>
                A strong TLS configuration is no longer optional; it is mandated by standards like PCI-DSS and HIPAA. Supporting outdated protocols like SSLv3, TLS 1.0, or TLS 1.1 exposes traffic to cryptographic attacks such as POODLE or BEAST.
              </p>
              <h3 className="text-xl font-bold text-white mb-3">Defensive Best Practices</h3>
              <ul>
                <li><strong>Enforce TLS 1.2 / 1.3:</strong> Ensure web servers only negotiate modern encryption protocols.</li>
                <li><strong>Disable Weak Ciphers:</strong> Remove support for RC4, DES, and export-grade ciphers to prevent downgrade attacks.</li>
                <li><strong>Monitor Expirations:</strong> Automate certificate renewals to prevent damaging service outages and loss of user trust.</li>
              </ul>
            </section>
          </div>

          <aside className="lg:col-span-1 space-y-6">
            <div className="bg-[#0d1117] border border-white/5 rounded-xl p-6 sticky top-24">
              <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-widest">Related Hubs</h3>
              <ul className="space-y-3">
                <li><Link href="/dns-analysis" className="text-[#00ff88] hover:underline flex items-center gap-2"><Shield className="w-4 h-4"/> DNS Analysis</Link></li>
                <li><Link href="/ports" className="text-[#00ff88] hover:underline flex items-center gap-2"><Server className="w-4 h-4"/> Ports Hub</Link></li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
