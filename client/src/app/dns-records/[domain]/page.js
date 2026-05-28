import React from 'react';
import Link from 'next/link';
import { Globe, Shield, Server, Activity, ChevronRight, AlertTriangle } from 'lucide-react';
import { notFound } from 'next/navigation';

const isValidDomain = (domain) => {
  const domainRegex = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/i;
  return domainRegex.test(domain);
};

export async function generateMetadata({ params }) {
  try {
    const resolvedParams = await params;
    const domain = resolvedParams?.domain?.toLowerCase();

    if (!domain || !isValidDomain(domain)) {
      return { title: 'Invalid Domain' };
    }

    return {
      title: `${domain} DNS Records Analysis & Propagation Profile`,
      description: `Complete DNS configuration analysis for ${domain}. View A, AAAA, MX, TXT, and NS records, and uncover potential DNS hijacking or spoofing configuration risks.`,
      alternates: {
        canonical: `https://reconshield.in/dns-records/${domain}`,
      },
      robots: { index: true, follow: true },
      openGraph: {
        url: `https://reconshield.in/dns-records/${domain}`,
        title: `${domain} DNS Profile`,
        description: `Analyze the DNS records and infrastructure topology for ${domain}.`,
        type: 'article',
        images: [{ url: '/og-image.png', width: 1200, height: 630 }],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${domain} DNS Intelligence`,
        description: `DNS routing and zone data analysis for ${domain}.`,
        images: ['/og-image.png']
      }
    };
  } catch (error) {
    return { title: 'Error' };
  }
}

export default async function DnsIntelligencePage({ params }) {
  try {
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
        '@id': `https://reconshield.in/dns/${domain}/#article`,
        headline: `${domain} Domain Name System (DNS) Security Report`,
        description: `Detailed analysis of the zone file configuration and authoritative name servers for ${domain}.`,
        publisher: {
          '@type': 'Organization',
          name: 'ReconShield Threat Research'
        },
        url: `https://reconshield.in/dns/${domain}`
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://reconshield.in' },
          { '@type': 'ListItem', position: 2, name: 'DNS Intelligence', item: 'https://reconshield.in/tools/dns-lookup' },
          { '@type': 'ListItem', position: 3, name: domain, item: `https://reconshield.in/dns/${domain}` },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: `What IP address does ${domain} resolve to?`,
            acceptedAnswer: { '@type': 'Answer', text: `The IP addresses for ${domain} are defined in its 'A' (IPv4) and 'AAAA' (IPv6) DNS records. Running a live lookup will query the authoritative nameservers to fetch the exact routing destination.` }
          },
          {
            '@type': 'Question',
            name: `Who handles email for ${domain}?`,
            acceptedAnswer: { '@type': 'Answer', text: `Email routing for ${domain} is controlled by its Mail Exchange (MX) records. If these records are missing or misconfigured, emails sent to ${domain} will bounce.` }
          },
          {
            '@type': 'Question',
            name: `Is ${domain} protected against email spoofing?`,
            acceptedAnswer: { '@type': 'Answer', text: `Protection against spoofing requires correctly configured SPF, DKIM, and DMARC records, which are typically stored as 'TXT' records within the domain's DNS zone file.` }
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
              <li><Link href="/tools/dns-lookup" className="hover:text-[#00ff88] transition-colors">DNS Analysis</Link></li>
              <li><ChevronRight className="w-3 h-3" /></li>
              <li className="text-[#00ff88]">{domain}</li>
            </ol>
          </nav>

          <div className="border-b border-white/10 pb-8 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-[10px] font-mono text-blue-400 mb-4 uppercase tracking-widest">
              <Globe className="w-3 h-3" />
              <span>Zone File Profile</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              <span className="text-blue-400">{domain}</span> DNS Infrastructure
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
              Analyze topological routing paths, mail exchange setups, and text record security for {domain}.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-10">
              
              <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-blue-500" />
                  Live DNS Resolution
                </h2>
                
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6 mb-8 p-4 bg-black/40 rounded-xl border border-white/5">
                  <div>
                    <dt className="text-xs text-gray-500 font-mono mb-1 uppercase">Target Domain</dt>
                    <dd className="text-white font-bold break-all">{domain}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-500 font-mono mb-1 uppercase">Query Scope</dt>
                    <dd className="text-white font-bold">A, AAAA, MX, TXT, NS, CNAME</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-500 font-mono mb-1 uppercase">DNSSEC</dt>
                    <dd className="text-gray-300 font-mono text-sm">Awaiting Validation...</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-500 font-mono mb-1 uppercase">Spoofing Protection</dt>
                    <dd className="text-gray-300 font-mono text-sm">Awaiting DMARC Check...</dd>
                  </div>
                </dl>

                <p className="text-sm text-gray-400 mb-6">
                  Perform an active resolution against authoritative nameservers to extract the full public zone file mapping for <strong>{domain}</strong>.
                </p>
                
                <Link href={`/tools/dns-lookup?target=${domain}`} className="inline-flex items-center justify-center gap-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30 px-6 py-3 rounded-xl font-bold transition-all">
                  <Globe className="w-4 h-4" />
                  Query DNS Records for {domain}
                </Link>
              </div>

              <div className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-bold text-white uppercase tracking-wider mb-4 border-b border-white/5 pb-2">
                  Understanding DNS for {domain}
                </h2>
                <p className="text-gray-400 leading-relaxed">
                  The Domain Name System (DNS) translates the human-readable domain <strong>{domain}</strong> into machine-readable IP addresses. It is fundamentally the address book of the internet. A domain's DNS configuration is split across various record types, each serving a specific topological function.
                </p>

                <h3 className="text-xl font-bold text-white mt-8 mb-3">Threat Vectors & configuration risks</h3>
                <p className="text-gray-400 leading-relaxed">
                  unauthorized actors heavily target the DNS layer. <strong>Subdomain Takeover</strong> occurs when a CNAME record points to an external, unclaimed cloud resource. Furthermore, if {domain} does not employ DNSSEC, it is potentially vulnerable to cache poisoning, allowing unauthorized actors to route legitimate users to malicious infrastructure by falsifying DNS responses.
                </p>

                <h3 className="text-xl font-bold text-white mt-8 mb-3">Investigation Workflows</h3>
                <ul className="text-gray-400 leading-relaxed list-disc pl-5 space-y-2">
                  <li><strong>Infrastructure Discovery:</strong> Identifying the hosting provider (AWS, Cloudflare, Fastly) by resolving the A records and subsequently checking the resulting IPs.</li>
                  <li><strong>Email Forensics:</strong> Auditing TXT records to evaluate the robustness of SPF and DMARC policies in the event of a phishing incident involving {domain}.</li>
                  <li><strong>Redirection Analysis:</strong> Tracing CNAME chains to map out third-party SaaS dependencies.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wider border-b border-white/5 pb-2">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {[
                    { q: `What happens if the NS records for ${domain} are changed?`, a: `Changing the Name Server (NS) records entirely shifts control over ${domain}'s routing to a new provider. If done maliciously, this is known as DNS Hijacking.` },
                    { q: `How long does it take for DNS changes on ${domain} to propagate?`, a: `Propagation relies on the Time-To-Live (TTL) value configured for the records. Caches globally will update based on this timer, taking anywhere from 5 minutes to 48 hours.` },
                    { q: `Are there hidden subdomains on ${domain}?`, a: `Standard DNS lookups only query exact, known records. To find hidden subdomains, a dedicated Subdomain Enumeration process utilizing Certificate Transparency logs is required.` }
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
                  <Link href={`/tools/whois/${domain}`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                    <div className="w-8 h-8 rounded-md bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:bg-purple-500/20">
                      <Server className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">WHOIS Intelligence</div>
                      <div className="text-xs text-gray-500">Query domain ownership</div>
                    </div>
                  </Link>

                  <Link href={`/subdomains/${domain}`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                    <div className="w-8 h-8 rounded-md bg-orange-500/10 flex items-center justify-center text-orange-400 group-hover:bg-orange-500/20">
                      <Globe className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Subdomains</div>
                      <div className="text-xs text-gray-500">Discover hidden assets</div>
                    </div>
                  </Link>

                  <Link href={`/ssl/${domain}`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                    <div className="w-8 h-8 rounded-md bg-pink-500/10 flex items-center justify-center text-pink-400 group-hover:bg-pink-500/20">
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">SSL Certificates</div>
                      <div className="text-xs text-gray-500">Validate Crypto Trust</div>
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
  } catch (error) {
    console.error("DNS Records Page Error:", error);
    notFound();
  }
}
