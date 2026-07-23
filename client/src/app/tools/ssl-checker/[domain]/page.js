import React from 'react';
import Link from 'next/link';
import { Server, Search, Globe, ChevronRight, Clock, AlertTriangle, Shield, Database, Lock } from 'lucide-react';
import { notFound } from 'next/navigation';

import { KNOWN_DOMAINS } from '@/lib/entityRegistry';

export async function generateStaticParams() {
  return KNOWN_DOMAINS.map((domain) => ({ domain }));
}

export const dynamicParams = true;

const isValidDomain = (domain) => {
  const domainRegex = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/i;
  return domainRegex.test(domain);
};

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const domain = resolvedParams?.domain?.toLowerCase();

  if (!domain || !isValidDomain(domain)) {
    return { title: 'Invalid Domain' };
  }

  return {
    title: `${domain} SSL Certificate Expiration & TLS Validation Report | ReconShield`,
    description: `Lookup the SSL certificate details for ${domain}. Verify expiration alerts, TLS protocol version support, certificate issuer, and trust chain configurations.`,
    alternates: {
      canonical: `https://reconshield.in/tools/ssl-checker/${domain}`,
    },
    robots: { index: true, follow: true },
    openGraph: {
      url: `https://reconshield.in/tools/ssl-checker/${domain}`,
      title: `${domain} SSL Certificate Audit`,
      description: `Cryptographic audit, issuer analysis, and certificate validity checkers for ${domain}.`,
      type: 'article',
      images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${domain} TLS & Certificate Report`,
      description: `SSL certificate expiration tracker and TLS security analysis for ${domain}.`,
      images: ['/og-image.png']
    }
  };
}

export default async function SslIntelligencePage({ params }) {
  const resolvedParams = await params;
  const domain = resolvedParams?.domain?.toLowerCase();

  if (!domain || !isValidDomain(domain)) {
    notFound();
  }

  const schemaJson = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TechArticle',
        '@id': `https://reconshield.in/tools/ssl-checker/${domain}/#article`,
        headline: `${domain} SSL/TLS Certificate Analysis Report`,
        description: `Detailed cryptographic analysis of the digital certificate chain of trust, issuer credentials, and expiry timeline for ${domain}.`,
        publisher: {
          '@type': 'Organization',
          name: 'ReconShield Threat Research'
        },
        url: `https://reconshield.in/tools/ssl-checker/${domain}`
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://reconshield.in' },
          { '@type': 'ListItem', position: 2, name: 'SSL Certificate Checker', item: 'https://reconshield.in/tools/ssl-checker' },
          { '@type': 'ListItem', position: 3, name: domain, item: `https://reconshield.in/tools/ssl-checker/${domain}` },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: `How do I check the SSL certificate expiration for ${domain}?`,
            acceptedAnswer: { '@type': 'Answer', text: `You can initiate a cryptographic scan above to read the 'Not After' field in ${domain}'s leaf certificate, returning the exact expiration date.` }
          },
          {
            '@type': 'Question',
            name: `Who is the Certificate Authority (CA) issuing the certificate for ${domain}?`,
            acceptedAnswer: { '@type': 'Answer', text: `The Certificate Authority (such as DigiCert, Let's Encrypt, or Sectigo) is identified in the Issuer field of the certificate details during the TLS handshake.` }
          },
          {
            '@type': 'Question',
            name: `What happens if the certificate chain for ${domain} is broken?`,
            acceptedAnswer: { '@type': 'Answer', text: `If a server fails to present intermediate certificates, client browsers (especially mobile browsers) will throw a trust warning warning users of an insecure connection.` }
          }
        ],
      },
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />
      
      <div className="min-h-screen pb-20">
        <div className="max-w-5xl mx-auto px-4 pt-8">
          
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-xs font-mono text-gray-500">
              <li><Link href="/" className="hover:text-[#00ff88] transition-colors">Home</Link></li>
              <li><ChevronRight className="w-3 h-3" /></li>
              <li><Link href="/tools/ssl-checker" className="hover:text-[#00ff88] transition-colors">SSL Checker</Link></li>
              <li><ChevronRight className="w-3 h-3" /></li>
              <li className="text-[#00ff88]">{domain}</li>
            </ol>
          </nav>

          <div className="border-b border-white/10 pb-8 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-[10px] font-mono text-cyan-400 mb-4 uppercase tracking-widest">
              <Lock className="w-3 h-3" />
              <span>TLS Security Profile</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              SSL Certificate details for <span className="text-cyan-400 font-mono">{domain}</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
              Verify SSL/TLS certificate installation status, expiration timeline alerts, and signature validation details for {domain}.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-10">
              
              <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none" />
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Server className="w-5 h-5 text-cyan-400" />
                  Cryptographic Trust Audit
                </h2>
                
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6 mb-8 p-4 bg-black/40 rounded-xl border border-white/5">
                  <div>
                    <dt className="text-xs text-gray-500 font-mono mb-1 uppercase">Target Domain</dt>
                    <dd className="text-white font-bold break-all">{domain}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-500 font-mono mb-1 uppercase">Certificate Issuer</dt>
                    <dd className="text-gray-300 font-mono text-sm">Validating Root CA Authority...</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-500 font-mono mb-1 uppercase">Expiration Alert</dt>
                    <dd className="text-gray-300 font-mono text-sm">Awaiting SSL handshake...</dd>
                  </div>
                </dl>

                <p className="text-sm text-gray-400 mb-6">
                  Initiate a real-time cryptographic audit for <strong>{domain}</strong> to extract active certificate chain hierarchies, test validity windows, and examine supported TLS version levels.
                </p>
                
                <Link href={`/tools/ssl-checker?target=${domain}`} className="inline-flex items-center justify-center gap-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 border border-cyan-500/30 px-6 py-3 rounded-xl font-bold transition-all">
                  <Search className="w-4 h-4" />
                  Perform Active SSL Scan on {domain}
                </Link>
              </div>

              <div className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-bold text-white uppercase tracking-wider mb-4 border-b border-white/5 pb-2">
                  Security Analysis: SSL/TLS on {domain}
                </h2>
                <p className="text-gray-400 leading-relaxed">
                  The digital certificate configuration for <strong>{domain}</strong> must align with modern web security practices. When a client initiates a request to the server hosting {domain}, the server responds with a TLS certificate. This certificate binds the public key to verify domain identity and prevents attackers from eavesdropping on data packets using man-in-the-middle (MitM) techniques.
                </p>

                <h3 className="text-xl font-bold text-white mt-8 mb-3">Chain of Trust Validation</h3>
                <p className="text-gray-400 leading-relaxed">
                  Web servers must furnish both the leaf certificate for {domain} and any required intermediate certificates. The intermediate certificates link the leaf certificate back to a globally recognized Root Certificate Authority (such as DigiCert or Let's Encrypt). A missing intermediate certificate creates a broken chain, causing browser security exceptions.
                </p>

                <h3 className="text-xl font-bold text-white mt-8 mb-3">Auditing Expiration Windows</h3>
                <p className="text-gray-400 leading-relaxed">
                  Industry-standard certificates are valid for a maximum of 398 days. Expired certificates trigger warnings that discourage visitors and lead to severe traffic drops. Integrating automated certificate monitors ensures domains are renewed well in advance of their expiration.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wider border-b border-white/5 pb-2">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {[
                    { q: `Why does ${domain} require intermediate certificates?`, a: `Certificate authorities use intermediate certs as a buffer to secure the root certificate from direct key disclosure. Web servers must present this intermediate bundle to validate the complete chain of trust.` },
                    { q: `Can ${domain} support TLS 1.3 encryption?`, a: `TLS 1.3 support depends on the server's cryptographic library (such as OpenSSL 1.1.1+). This modern protocol eliminates outdated cipher suites and speeds up connections through 0-RTT handshakes.` },
                    { q: `What is a common name mismatch on ${domain}?`, a: `This error occurs if the SSL certificate has been issued to a different domain name than the one resolving to the web server, making the connection untrusted.` }
                  ].map((faq, i) => (
                    <div key={i} className="p-5 rounded-xl bg-[#0d1117] border border-white/[0.06]">
                      <h3 className="text-white font-semibold mb-2 text-sm">{faq.q}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1 space-y-6">
              <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0d1117] to-transparent border border-white/5 sticky top-24">
                <h3 className="text-sm font-mono font-bold text-gray-400 uppercase tracking-widest mb-6">Entity Graph Relations</h3>
                
                <div className="space-y-3">
                  <Link href={`/tools/whois`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                    <div className="w-8 h-8 rounded-md bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500/20">
                      <Globe className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">WHOIS Lookup</div>
                      <div className="text-xs text-gray-500">Query domain registration</div>
                    </div>
                  </Link>

                  <Link href={`/tools/dns-lookup`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                    <div className="w-8 h-8 rounded-md bg-teal-500/10 flex items-center justify-center text-teal-400 group-hover:bg-teal-500/20">
                      <Database className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">DNS Records</div>
                      <div className="text-xs text-gray-500">Verify zones & records</div>
                    </div>
                  </Link>
                  
                  <Link href={`/tools/ip-lookup`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                    <div className="w-8 h-8 rounded-md bg-orange-500/10 flex items-center justify-center text-orange-400 group-hover:bg-orange-500/20">
                      <Shield className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">IP Reputation</div>
                      <div className="text-xs text-gray-500">Check threat score</div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
