import React from 'react';
import Link from 'next/link';
import { Server, Search, Globe, ChevronRight, Clock, AlertTriangle, Shield, Database, Lock } from 'lucide-react';
import { notFound } from 'next/navigation';

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
    title: `${domain} DNS Records & Authoritative Nameserver Report | ReconShield`,
    description: `Lookup active DNS records for ${domain}. Resolve A, AAAA, MX, TXT, CNAME, and NS records, verify email security alignments, and analyze DNSSEC configuration.`,
    alternates: {
      canonical: `https://reconshield.in/tools/dns-lookup/${domain}`,
    },
    openGraph: {
      url: `https://reconshield.in/tools/dns-lookup/${domain}`,
      title: `${domain} DNS Record Query & Analysis`,
      description: `Authoritative DNS records lookup, nameserver diagnostics, and validation checks for ${domain}.`,
      type: 'article',
      images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${domain} DNS Configuration Report`,
      description: `DNS records list and security analysis tools for ${domain}.`,
      images: ['/og-image.png']
    }
  };
}

export default async function DnsIntelligencePage({ params }) {
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
        '@id': `https://reconshield.in/tools/dns-lookup/${domain}/#article`,
        headline: `${domain} DNS Records and Infrastructure Report`,
        description: `Detailed technical validation of active A, AAAA, MX, NS, and TXT record mappings and DNSSEC security configurations for ${domain}.`,
        publisher: {
          '@type': 'Organization',
          name: 'ReconShield Threat Research'
        },
        url: `https://reconshield.in/tools/dns-lookup/${domain}`
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://reconshield.in' },
          { '@type': 'ListItem', position: 2, name: 'DNS Lookup', item: 'https://reconshield.in/tools/dns-lookup' },
          { '@type': 'ListItem', position: 3, name: domain, item: `https://reconshield.in/tools/dns-lookup/${domain}` },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: `How do I view A and MX records for ${domain}?`,
            acceptedAnswer: { '@type': 'Answer', text: `Use the ReconShield DNS Lookup query above to perform a live scan and fetch all active A and MX records configured for ${domain}.` }
          },
          {
            '@type': 'Question',
            name: `Does ${domain} support DNSSEC?`,
            acceptedAnswer: { '@type': 'Answer', text: `DNSSEC status is verified by querying the authoritative parent zone servers for DS records and checking the nameserver for DNSKEY public signatures.` }
          },
          {
            '@type': 'Question',
            name: `What is the TTL for DNS records on ${domain}?`,
            acceptedAnswer: { '@type': 'Answer', text: `TTL (Time to Live) determines how many seconds DNS resolvers cache the resolved query data before requesting a refresh from the nameserver.` }
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
              <li><Link href="/tools/dns-lookup" className="hover:text-[#00ff88] transition-colors">DNS Lookup</Link></li>
              <li><ChevronRight className="w-3 h-3" /></li>
              <li className="text-[#00ff88]">{domain}</li>
            </ol>
          </nav>

          <div className="border-b border-white/10 pb-8 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00ff88]/10 border border-[#00ff88]/20 rounded-full text-[10px] font-mono text-[#00ff88] mb-4 uppercase tracking-widest">
              <Database className="w-3 h-3" />
              <span>Infrastructure Records</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              DNS Records for <span className="text-[#00ff88] font-mono">{domain}</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
              Verify live A, AAAA, CNAME, MX, TXT, NS, and CAA records, audit mail protection, and validate DNSSEC configuration signatures.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-10">
              
              <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#00ff88]/5 blur-[100px] rounded-full pointer-events-none" />
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Server className="w-5 h-5 text-[#00ff88]" />
                  Active DNS Record Resolver
                </h2>
                
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6 mb-8 p-4 bg-black/40 rounded-xl border border-white/5">
                  <div>
                    <dt className="text-xs text-gray-500 font-mono mb-1 uppercase">Query Domain</dt>
                    <dd className="text-white font-bold break-all">{domain}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-500 font-mono mb-1 uppercase">DNSSEC Status</dt>
                    <dd className="text-gray-300 font-mono text-sm">Validating cryptographic signatures...</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-500 font-mono mb-1 uppercase">Authoritative Nameservers</dt>
                    <dd className="text-gray-300 font-mono text-sm">Querying delegation zones...</dd>
                  </div>
                </dl>

                <p className="text-sm text-gray-400 mb-6">
                  Perform a real-time authoritative DNS query for <strong>{domain}</strong> to view active record sets, check SPF limitations, and audit zone file configs.
                </p>
                
                <Link href={`/tools/dns-lookup?target=${domain}`} className="inline-flex items-center justify-center gap-2 bg-[#00ff88]/20 hover:bg-[#00ff88]/30 text-[#00ff88] border border-[#00ff88]/30 px-6 py-3 rounded-xl font-bold transition-all">
                  <Search className="w-4 h-4" />
                  Perform Active DNS Scan on {domain}
                </Link>
              </div>

              <div className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-bold text-white uppercase tracking-wider mb-4 border-b border-white/5 pb-2">
                  Technical Analysis: DNS Architecture for {domain}
                </h2>
                <p className="text-gray-400 leading-relaxed">
                  The infrastructure configuration of <strong>{domain}</strong> is defined within its authoritative DNS zone file. When a user requests access to resources on {domain}, recursive resolvers process the request by locating the authoritative nameservers listed in the parent registry zone.
                </p>

                <h3 className="text-xl font-bold text-white mt-8 mb-3">Email Protection Setup</h3>
                <p className="text-gray-400 leading-relaxed">
                  Securing outgoing email communication from {domain} requires publishing SPF, DKIM, and DMARC TXT records. The SPF record lists the specific host IP addresses authorized to send emails on behalf of {domain}, while DMARC enforces receiver actions upon validation failures.
                </p>

                <h3 className="text-xl font-bold text-white mt-8 mb-3">Zone Delegation & Redundancy</h3>
                <p className="text-gray-400 leading-relaxed">
                  A resilient DNS architecture uses multiple authoritative nameservers (NS records) across distinct networks. This ensures that even if one provider encounters an outage, queries for {domain} continue to resolve successfully.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wider border-b border-white/5 pb-2">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {[
                    { q: `What are A records on ${domain}?`, a: `A records map host domain names directly to the server's IPv4 address. They are the core routing records used to display website content.` },
                    { q: `How do I check CAA records for ${domain}?`, a: `CAA (Certification Authority Authorization) records specify which Certificate Authorities are allowed to generate SSL/TLS certificates for the domain, blocking unauthorized certificate requests.` },
                    { q: `What is the role of MX records on ${domain}?`, a: `MX records define the server addresses responsible for handling incoming email communications sent to user accounts at the domain.` }
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

                  <Link href={`/tools/ssl-checker`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                    <div className="w-8 h-8 rounded-md bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/20">
                      <Lock className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">SSL Analyzer</div>
                      <div className="text-xs text-gray-500">Verify certificate validity</div>
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
