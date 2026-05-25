import React from 'react';
import Link from 'next/link';
import { Network, Search, Server, Globe, ChevronRight, Activity } from 'lucide-react';
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
    title: `${domain} Subdomain Enumeration & Attack Surface Mapping`,
    description: `Discover hidden subdomains and map the external attack surface of ${domain}. Detect forgotten development servers, staging environments, and potential subdomain takeovers.`,
    keywords: [`${domain} subdomains`, `subdomain finder ${domain}`, `enumerate subdomains ${domain}`, `attack surface ${domain}`, `find subdomains ${domain}`, `osint ${domain}`],
    alternates: {
      canonical: `https://reconshield.in/subdomains/${domain}`,
    },
    openGraph: {
      url: `https://reconshield.in/subdomains/${domain}`,
      title: `${domain} Attack Surface Profile | ReconShield`,
      description: `Passive reconnaissance and subdomain enumeration for ${domain}.`,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${domain} Subdomain Intelligence`,
      description: `Map the external infrastructure and subdomains associated with ${domain}.`,
    }
  };
}

export default async function SubdomainIntelligencePage({ params }) {
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
        '@id': `https://reconshield.in/subdomains/${domain}/#article`,
        headline: `${domain} Subdomain Attack Surface Mapping`,
        description: `Detailed intelligence report outlining the known subdomains, virtual hosts, and cloud infrastructure associated with ${domain}.`,
        publisher: {
          '@type': 'Organization',
          name: 'ReconShield Threat Research'
        },
        url: `https://reconshield.in/subdomains/${domain}`
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://reconshield.in' },
          { '@type': 'ListItem', position: 2, name: 'Subdomain Finder', item: 'https://reconshield.in/tools/subdomain-finder' },
          { '@type': 'ListItem', position: 3, name: domain, item: `https://reconshield.in/subdomains/${domain}` },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: `How do you find subdomains for ${domain}?`,
            acceptedAnswer: { '@type': 'Answer', text: `We utilize passive Open Source Intelligence (OSINT) techniques, primarily querying Certificate Transparency (CT) logs, search engine indexes, and public DNS datasets to locate subdomains without actively brute-forcing the target servers.` }
          },
          {
            '@type': 'Question',
            name: `What is a Subdomain Takeover on ${domain}?`,
            acceptedAnswer: { '@type': 'Answer', text: `A takeover occurs when a subdomain of ${domain} has a DNS record pointing to a decommissioned third-party service (like an expired AWS S3 bucket). An attacker can claim that bucket and serve malicious content on the legitimate subdomain.` }
          },
          {
            '@type': 'Question',
            name: `Why are there hidden subdomains on ${domain}?`,
            acceptedAnswer: { '@type': 'Answer', text: `Large organizations frequently spin up temporary subdomains for development ('dev.${domain}'), testing ('staging.${domain}'), or third-party integrations ('help.${domain}'). These are often forgotten and left unpatched, creating a shadow IT risk.` }
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
              <li><Link href="/tools/subdomain-finder" className="hover:text-[#00ff88] transition-colors">OSINT Mapping</Link></li>
              <li><ChevronRight className="w-3 h-3" /></li>
              <li className="text-[#00ff88]">{domain}</li>
            </ol>
          </nav>

          <div className="border-b border-white/10 pb-8 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/10 border border-orange-500/20 rounded-full text-[10px] font-mono text-orange-400 mb-4 uppercase tracking-widest">
              <Network className="w-3 h-3" />
              <span>Attack Surface Mapping</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              <span className="text-orange-400">{domain}</span> Subdomains
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
              Passive reconnaissance and subdomain enumeration to uncover the hidden infrastructure of {domain}.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-10">
              
              <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 blur-[100px] rounded-full pointer-events-none" />
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-orange-500" />
                  Live Enumeration
                </h2>
                
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6 mb-8 p-4 bg-black/40 rounded-xl border border-white/5">
                  <div>
                    <dt className="text-xs text-gray-500 font-mono mb-1 uppercase">Root Domain</dt>
                    <dd className="text-white font-bold break-all">{domain}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-500 font-mono mb-1 uppercase">Methodology</dt>
                    <dd className="text-white font-bold">Passive OSINT</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-500 font-mono mb-1 uppercase">Data Sources</dt>
                    <dd className="text-white font-bold">CT Logs, DNS Datasets</dd>
                  </div>
                </dl>

                <p className="text-sm text-gray-400 mb-6">
                  Initiate a deep scan across public registries to compile a complete list of valid subdomains, virtual hosts, and API endpoints belonging to <strong>{domain}</strong>.
                </p>
                
                <Link href={`/tools/subdomain-finder?target=${domain}`} className="inline-flex items-center justify-center gap-2 bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 border border-orange-500/30 px-6 py-3 rounded-xl font-bold transition-all">
                  <Search className="w-4 h-4" />
                  Enumerate Subdomains for {domain}
                </Link>
              </div>

              <div className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-bold text-white uppercase tracking-wider mb-4 border-b border-white/5 pb-2">
                  Mapping the Footprint of {domain}
                </h2>
                <p className="text-gray-400 leading-relaxed">
                  While the main website (`www.{domain}`) is heavily defended by web application firewalls and security teams, subdomains often host forgotten or unmonitored infrastructure. Finding these subdomains is the foundational first step in any penetration test or Bug Bounty engagement.
                </p>

                <h3 className="text-xl font-bold text-white mt-8 mb-3">The Danger of Shadow IT</h3>
                <p className="text-gray-400 leading-relaxed">
                  "Shadow IT" refers to servers and applications deployed without the knowledge of the central security team. By enumerating the subdomains of {domain}, researchers frequently discover exposed administrative panels (`admin.{domain}`), legacy API versions (`v1-api.{domain}`), or vulnerable staging environments containing debug code.
                </p>

                <h3 className="text-xl font-bold text-white mt-8 mb-3">Investigation Workflows</h3>
                <ul className="text-gray-400 leading-relaxed list-disc pl-5 space-y-2">
                  <li><strong>Port Scanning:</strong> Once a list of subdomains is generated, the next step is running a port scan against each unique IP to identify running services.</li>
                  <li><strong>CNAME Resolution:</strong> Analyzing the DNS records of each subdomain to check for Subdomain Takeover vulnerabilities on services like AWS, GitHub Pages, or Heroku.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wider border-b border-white/5 pb-2">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {[
                    { q: `Will this scan trigger security alerts on ${domain}?`, a: `No. ReconShield uses completely passive techniques. We query third-party databases and public logs, meaning no traffic is sent directly to ${domain} during the enumeration phase.` },
                    { q: `Why are some subdomains offline?`, a: `A subdomain may exist in historical DNS records or CT logs but the underlying server may have been decommissioned. Only a live DNS resolution can confirm if the subdomain is currently active.` },
                    { q: `Can wildcard certificates hide subdomains?`, a: `Yes. If an organization exclusively uses a wildcard certificate (*.${domain}), individual subdomains will not be recorded in Certificate Transparency logs, requiring active brute-forcing to discover them.` }
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
                  <Link href={`/tools/dns-lookup`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                    <div className="w-8 h-8 rounded-md bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500/20">
                      <Globe className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">DNS Lookup</div>
                      <div className="text-xs text-gray-500">View A/AAAA records</div>
                    </div>
                  </Link>

                  <Link href={`/tools/port-scanner`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                    <div className="w-8 h-8 rounded-md bg-red-500/10 flex items-center justify-center text-red-400 group-hover:bg-red-500/20">
                      <Server className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Port Scanner</div>
                      <div className="text-xs text-gray-500">Scan for open services</div>
                    </div>
                  </Link>

                  <Link href={`/tools/tech-detector`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                    <div className="w-8 h-8 rounded-md bg-teal-500/10 flex items-center justify-center text-teal-400 group-hover:bg-teal-500/20">
                      <Search className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Tech Detector</div>
                      <div className="text-xs text-gray-500">Fingerprint CMS & CDN</div>
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
