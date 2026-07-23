import React from 'react';
import Link from 'next/link';
import { Server, Search, Globe, ChevronRight, Clock, AlertTriangle, Shield, Database, Lock } from 'lucide-react';
import { notFound } from 'next/navigation';
import { KNOWN_DOMAINS } from '@/lib/entityRegistry';

const RECORD_TYPES = ['a', 'aaaa', 'mx', 'txt', 'cname', 'ns', 'caa', 'dnssec'];

const RECORD_TYPE_SEO = {
  a: {
    title: "A Record Lookup - Resolve Domain to IPv4 Address | ReconShield",
    description: "Perform a free online A record lookup to find the IPv4 address mapped to any domain name. Check hosting server routing configurations instantly.",
    headline: "A Record Lookup and Hostname IPv4 Resolution Guide",
    desc: "Query IPv4 mappings for target hostnames using our online lookup utility.",
    longDesc: "An Address (A) record maps a domain name directly to a 32-bit IPv4 address. Web browsers use A records to locate and load the servers hosting websites.",
    formatExample: "example.com.  3600  IN  A  192.0.2.1",
    cliCommand: "dig example.com A"
  },
  aaaa: {
    title: "AAAA Record Lookup - Resolve Domain to IPv6 Address | ReconShield",
    description: "Perform a free online AAAA record lookup to check the IPv6 address configurations for any host. Verify modern IPv6 network compatibility.",
    headline: "AAAA Record Lookup and Hostname IPv6 Resolution Guide",
    desc: "Query IPv6 mappings for target hostnames using our online lookup utility.",
    longDesc: "An IPv6 Address (AAAA) record maps a domain name directly to a 128-bit IPv6 address, enabling modern devices to resolve and route traffic over version 6 internet protocols.",
    formatExample: "example.com.  3600  IN  AAAA  2001:db8::1",
    cliCommand: "dig example.com AAAA"
  },
  mx: {
    title: "MX Lookup - Check Mail Exchanger Records Online | ReconShield",
    description: "Perform a free online MX lookup to check mail exchanger records for any domain. Analyze mail server hostname routing priorities and SMTP configs.",
    headline: "MX Record Lookup and SMTP Mail Routing Analysis",
    desc: "Query mail exchange routing targets and priority maps using our online lookup utility.",
    longDesc: "A Mail Exchanger (MX) record specifies the mail servers responsible for accepting incoming email messages on behalf of a domain name, using priority numbers to establish routing chains.",
    formatExample: "example.com.  86400  IN  MX  10 mail.example.com.",
    cliCommand: "dig example.com MX"
  },
  txt: {
    title: "TXT Record Lookup - Check DNS Text Records | ReconShield",
    description: "Perform a free online TXT record lookup to check DNS text fields. Verify SPF, DKIM, and DMARC verification records for security compliance.",
    headline: "TXT Record Lookup and Security Policy TXT Verification",
    desc: "Query public text entries and verification tokens using our online lookup utility.",
    longDesc: "A Text (TXT) record holds arbitrary human-readable or machine-readable text parameters. It is commonly used for domain ownership validation and email authentication policies (SPF, DKIM, DMARC).",
    formatExample: "example.com.  3600  IN  TXT  \"v=spf1 include:_spf.google.com ~all\"",
    cliCommand: "dig example.com TXT"
  },
  cname: {
    title: "CNAME Lookup - Find Domain Aliases & Canonical Names | ReconShield",
    description: "Perform a free online CNAME lookup to identify domain aliases, canonical names, and redirect configurations. Detect dangling DNS records.",
    headline: "CNAME Record Lookup and Alias Mapping Analysis",
    desc: "Query canonical name mappings and trace alias chains using our online lookup utility.",
    longDesc: "A Canonical Name (CNAME) record creates an alias pointing one domain or subdomain to another target hostname, simplifying DNS management when mapping alias nodes.",
    formatExample: "www.example.com.  3600  IN  CNAME  example.com.",
    cliCommand: "dig www.example.com CNAME"
  },
  ns: {
    title: "NS Lookup - Check Authoritative Nameservers Online | ReconShield",
    description: "Perform a free online NS lookup to identify a domain's authoritative nameservers. Verify nameserver delegation zones and routing paths.",
    headline: "NS Record Lookup and Authoritative Nameserver Delegation Check",
    desc: "Query nameserver delegations and zone authority records using our online lookup utility.",
    longDesc: "A Nameserver (NS) record delegates a DNS zone to use a specific set of authoritative nameservers, defining where the domain's resource records reside.",
    formatExample: "example.com.  86400  IN  NS  ns1.example.com.",
    cliCommand: "dig example.com NS"
  },
  caa: {
    title: "CAA Record Lookup - Check Certificate Authority Authorization | ReconShield",
    description: "Perform a free online CAA record lookup to check authorized Certificate Authorities (CAs) for a domain. Verify SSL/TLS issuance policies.",
    headline: "CAA Record Lookup and Certificate Authority Authorization Audit",
    desc: "Query CAA records to audit authorized certificate issuers using our online lookup utility.",
    longDesc: "A Certification Authority Authorization (CAA) record specifies which certificate authorities (CAs) are permitted to issue SSL/TLS certificates for a domain name.",
    formatExample: "example.com.  3600  IN  CAA  0 issue \"letsencrypt.org\"",
    cliCommand: "dig example.com CAA"
  },
  dnssec: {
    title: "DNSSEC Checker - Test Domain Cryptographic Signatures | ReconShield",
    description: "Perform a free online DNSSEC lookup to test a domain's cryptographic signatures (DS and DNSKEY). Audit DNS spoofing defense protocols.",
    headline: "DNSSEC Status Lookup and Cryptographic Security Signature Audit",
    desc: "Query DNSSEC cryptographic signatures and key delegations using our online lookup utility.",
    longDesc: "Domain Name System Security Extensions (DNSSEC) secure DNS query responses by attaching digital cryptographic signatures to existing resource records to authenticate zone identity.",
    formatExample: "example.com.  3600  IN  DNSKEY  256 3 8 AwEAAa3... (RRSIG records verify data integrity)",
    cliCommand: "dig example.com DNSKEY"
  }
};


export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const domain = resolvedParams?.domain?.toLowerCase();

  if (!domain || (!KNOWN_DOMAINS.includes(domain) && !RECORD_TYPES.includes(domain))) {
    return { title: 'Invalid Domain' };
  }

  if (RECORD_TYPES.includes(domain)) {
    const seo = RECORD_TYPE_SEO[domain];
    return {
      title: seo.title,
      description: seo.description,
      alternates: {
        canonical: `https://reconshield.in/tools/dns-lookup/${domain}`,
      },
      robots: { index: true, follow: true },
      openGraph: {
        url: `https://reconshield.in/tools/dns-lookup/${domain}`,
        title: seo.title,
        description: seo.description,
        type: 'article',
        images: [{ url: '/og-image.png', width: 1200, height: 630 }],
      },
      twitter: {
        card: 'summary_large_image',
        title: seo.title,
        description: seo.description,
        images: ['/og-image.png']
      }
    };
  }

  return {
    title: `${domain} DNS Records & Authoritative Nameserver Report | ReconShield`,
    description: `Lookup active DNS records for ${domain}. Resolve A, AAAA, MX, TXT, CNAME, and NS records, verify email security alignments, and analyze DNSSEC configuration.`,
    alternates: {
      canonical: `https://reconshield.in/tools/dns-lookup/${domain}`,
    },
    robots: { index: true, follow: true },
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

  if (!domain || (!KNOWN_DOMAINS.includes(domain) && !RECORD_TYPES.includes(domain))) {
    notFound();
  }

  if (RECORD_TYPES.includes(domain)) {
    const seo = RECORD_TYPE_SEO[domain];
    const schemaJson = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'TechArticle',
          '@id': `https://reconshield.in/tools/dns-lookup/${domain}/#article`,
          headline: seo.headline,
          description: seo.description,
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
            { '@type': 'ListItem', position: 3, name: `${domain.toUpperCase()} Lookup`, item: `https://reconshield.in/tools/dns-lookup/${domain}` },
          ],
        },
        {
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: `What is the purpose of a DNS ${domain.toUpperCase()} record?`,
              acceptedAnswer: { '@type': 'Answer', text: seo.longDesc }
            },
            {
              '@type': 'Question',
              name: `How do I perform a DNS ${domain.toUpperCase()} lookup online?`,
              acceptedAnswer: { '@type': 'Answer', text: `Use the free diagnostic utility on this page to enter any target domain and run a real-time ${domain.toUpperCase()} query.` }
            }
          ]
        }
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
                <li className="text-[#00ff88]">{domain.toUpperCase()} Lookup</li>
              </ol>
            </nav>

            <div className="border-b border-white/10 pb-8 mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-[10px] font-mono text-cyan-400 mb-4 uppercase tracking-widest">
                <Database className="w-3 h-3" />
                <span>DNS Protocol Library</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 uppercase">
                {domain.toUpperCase()} Record Lookup Tool
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl leading-relaxed font-sans">
                {seo.description}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-10">
                
                {/* Active Diagnostic Scanner (Tool ecosystem integration) */}
                <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none" />
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2 font-display uppercase tracking-wider">
                    <Server className="w-5 h-5 text-cyan-400" />
                    Query Live {domain.toUpperCase()} Records
                  </h2>
                  <p className="text-sm text-gray-400 mb-6 font-sans leading-relaxed">
                    Perform a real-time network request to fetch active {domain.toUpperCase()} mappings for any target domain.
                  </p>
                  
                  <Link href={`/tools/dns-lookup?target=example.com`} className="inline-flex items-center justify-center gap-2 bg-cyan-500/25 hover:bg-cyan-500/35 text-cyan-300 border border-cyan-500/30 px-6 py-3 rounded-xl font-bold transition-all font-mono text-sm">
                    <Search className="w-4 h-4" />
                    Open Diagnostic Console
                  </Link>
                </div>

                {/* Technical Protocol Description (Deep Informational Intent) */}
                <div className="prose prose-invert max-w-none font-sans">
                  <h2 className="text-2xl font-bold text-white uppercase tracking-wider mb-4 border-b border-white/5 pb-2">
                    What is a DNS {domain.toUpperCase()} Record?
                  </h2>
                  <p className="text-gray-400 leading-relaxed">
                    {seo.longDesc}
                  </p>

                  <h3 className="text-xl font-bold text-white mt-8 mb-3">RFC Zone File Example Format</h3>
                  <p className="text-gray-400 leading-relaxed mb-4">
                    In standard zone files, a {domain.toUpperCase()} record is declared using the following syntax structure:
                  </p>
                  <pre className="bg-black/50 p-4 rounded-xl border border-white/5 font-mono text-xs text-emerald-400">
                    <code>{seo.formatExample}</code>
                  </pre>

                  <h3 className="text-xl font-bold text-white mt-8 mb-3">CLI Terminal Query Example</h3>
                  <p className="text-gray-400 leading-relaxed mb-4">
                    Verify this record type locally using standard terminal debugging tools:
                  </p>
                  <pre className="bg-black/50 p-4 rounded-xl border border-white/5 font-mono text-xs text-cyan-400">
                    <code>{seo.cliCommand}</code>
                  </pre>
                </div>

                {/* Internal Navigation Anchor Links Grid */}
                <div className="border-t border-white/5 pt-10">
                  <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wider">Other Diagnostic Record Lookups</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {RECORD_TYPES.filter(t => t !== domain).map(t => (
                      <Link key={t} href={`/tools/dns-lookup/${t}`} className="p-3 rounded-xl bg-[#0d1117] border border-white/5 hover:border-cyan-500/20 text-center transition-all group">
                        <span className="text-xs font-mono font-bold text-gray-400 group-hover:text-cyan-400 uppercase">{t} Record</span>
                      </Link>
                    ))}
                  </div>
                </div>

              </div>

              {/* Sidebar entity nodes */}
              <div className="lg:col-span-1 space-y-6">
                <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0d1117] to-transparent border border-white/5 sticky top-24">
                  <h3 className="text-sm font-mono font-bold text-gray-400 uppercase tracking-widest mb-6">Entity Relations</h3>
                  <div className="space-y-3 font-sans">
                    <Link href={`/tools/dns-lookup`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                      <div className="w-8 h-8 rounded-md bg-[#00ff88]/10 flex items-center justify-center text-[#00ff88] group-hover:bg-[#00ff88]/20">
                        <Server className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">DNS Lookup Hub</div>
                        <div className="text-xs text-gray-500">Run generic DNS check</div>
                      </div>
                    </Link>
                    <Link href={`/tools/whois`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                      <div className="w-8 h-8 rounded-md bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500/20">
                        <Globe className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">WHOIS Lookup</div>
                        <div className="text-xs text-gray-500">Domain registration info</div>
                      </div>
                    </Link>
                    <Link href={`/tools/ssl-checker`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                      <div className="w-8 h-8 rounded-md bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/20">
                        <Lock className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">SSL Analyzer</div>
                        <div className="text-xs text-gray-500">Verify certificate expiry</div>
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
                
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6 mb-8 p-4 bg-black/40 rounded-xl border border-white/5 font-mono">
                  <div>
                    <dt className="text-xs text-gray-500 mb-1 uppercase">Query Domain</dt>
                    <dd className="text-white font-bold break-all">{domain}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-500 mb-1 uppercase">DNSSEC Status</dt>
                    <dd className="text-gray-300 text-sm">Validating cryptographic signatures...</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-500 mb-1 uppercase">Authoritative Nameservers</dt>
                    <dd className="text-gray-300 text-sm">Querying delegation zones...</dd>
                  </div>
                </dl>

                <p className="text-sm text-gray-400 mb-6 leading-relaxed font-sans">
                  Perform a real-time authoritative DNS query for <strong>{domain}</strong> to view active record sets, check SPF limitations, and audit zone file configs.
                </p>
                
                <Link href={`/tools/dns-lookup?target=${domain}`} className="inline-flex items-center justify-center gap-2 bg-[#00ff88]/20 hover:bg-[#00ff88]/30 text-[#00ff88] border border-[#00ff88]/30 px-6 py-3 rounded-xl font-bold transition-all text-sm font-mono">
                  <Search className="w-4 h-4" />
                  Perform Active DNS Scan on {domain}
                </Link>
              </div>

              <div className="prose prose-invert max-w-none font-sans">
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
                      <h3 className="text-white font-semibold mb-2 text-sm font-sans">{faq.q}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed font-sans">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1 space-y-6">
              <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0d1117] to-transparent border border-white/5 sticky top-24 font-sans">
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

export async function generateStaticParams() {
  const params = [];
  RECORD_TYPES.forEach(t => params.push({ domain: t }));
  KNOWN_DOMAINS.forEach(d => params.push({ domain: d }));
  return params;
}

export const dynamicParams = false;
