import React from 'react';
import Link from 'next/link';
import { Network, Search, Server, Globe, ChevronRight, Activity } from 'lucide-react';
import { notFound } from 'next/navigation';
import { generateDatasetSchema } from '@/utils/metadata';
import { SUBDOMAIN_TOPICS_DATA } from '@/utils/programmaticTopicsData';
import { renderMarkdown } from '@/utils/markdownRenderer';

const SUBDOMAIN_TOPICS = Object.keys(SUBDOMAIN_TOPICS_DATA);

const isValidDomain = (domain) => {
  if (SUBDOMAIN_TOPICS.includes(domain.toLowerCase())) return true;
  const domainRegex = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/i;
  return domainRegex.test(domain);
};

export async function generateStaticParams() {
  return SUBDOMAIN_TOPICS.map(domain => ({ domain }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const domain = resolvedParams?.domain?.toLowerCase();

  if (!domain || !isValidDomain(domain)) {
    return { title: 'Invalid Domain' };
  }

  // Check if it's a programmatic authority page
  if (SUBDOMAIN_TOPICS_DATA[domain]) {
    const topic = SUBDOMAIN_TOPICS_DATA[domain];
    return {
      title: topic.title,
      description: topic.description,
      alternates: {
        canonical: `https://reconshield.in/subdomains/${domain}`,
      },
      robots: { index: true, follow: true },
      openGraph: {
        url: `https://reconshield.in/subdomains/${domain}`,
        title: topic.title,
        description: topic.description,
        type: 'article',
        images: [{ url: '/og-image.png', width: 1200, height: 630 }],
      },
      twitter: {
        card: 'summary_large_image',
        title: topic.title,
        description: topic.description,
        images: ['/og-image.png']
      }
    };
  }

  return {
    title: `${domain} Subdomain Enumeration & internet-facing assets Mapping`,
    description: `Discover hidden subdomains and map the external internet-facing assets of ${domain}. Detect forgotten development servers, staging environments, and potential subdomain takeovers.`,
    alternates: {
      canonical: `https://reconshield.in/subdomains/${domain}`,
    },
    robots: { index: true, follow: true },
    openGraph: {
      url: `https://reconshield.in/subdomains/${domain}`,
      title: `${domain} internet-facing assets Profile`,
      description: `Passive infrastructure visibility and subdomain enumeration for ${domain}.`,
      type: 'article',
      images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${domain} Subdomain Intelligence`,
      description: `Map the external infrastructure and subdomains associated with ${domain}.`,
      images: ['/og-image.png']
    }
  };
}

export default async function SubdomainIntelligencePage({ params }) {
  const resolvedParams = await params;
  const domain = resolvedParams?.domain?.toLowerCase();

  if (!domain || !isValidDomain(domain)) {
    notFound();
  }

  // Check if rendering a programmatic topic page
  if (SUBDOMAIN_TOPICS_DATA[domain]) {
    const topic = SUBDOMAIN_TOPICS_DATA[domain];

    const schemaJson = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'TechArticle',
          '@id': `https://reconshield.in/subdomains/${domain}/#article`,
          headline: topic.h1,
          description: topic.description,
          publisher: {
            '@type': 'Organization',
            name: 'ReconShield Security'
          },
          url: `https://reconshield.in/subdomains/${domain}`
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://reconshield.in' },
            { '@type': 'ListItem', position: 2, name: topic.parentToolName, item: `https://reconshield.in${topic.parentToolPath}` },
            { '@type': 'ListItem', position: 3, name: topic.h1, item: `https://reconshield.in/subdomains/${domain}` },
          ],
        },
        {
          '@type': 'FAQPage',
          mainEntity: topic.faqs.map(f => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a }
          }))
        },
        ...(topic.howto ? [{
          '@type': 'HowTo',
          name: topic.howto.name,
          description: topic.howto.description,
          step: topic.howto.steps.map((step, idx) => ({
            '@type': 'HowToStep',
            position: idx + 1,
            name: step.name,
            text: step.text,
            url: `https://reconshield.in/subdomains/${domain}#step-${idx + 1}`
          }))
        }] : [])
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
                <li><Link href="/subdomains" className="hover:text-[#00ff88] transition-colors">Subdomains Hub</Link></li>
                <li><ChevronRight className="w-3 h-3" /></li>
                <li className="text-[#00ff88]">{topic.title}</li>
              </ol>
            </nav>

            <div className="border-b border-white/10 pb-8 mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/10 border border-orange-500/20 rounded-full text-[10px] font-mono text-orange-400 mb-4 uppercase tracking-widest">
                <Network className="w-3 h-3" />
                <span>Subdomain OSINT Guide</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                {topic.h1}
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
                {topic.intro}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-10">
                
                {/* Deep-dive Content */}
                <article className="prose prose-invert max-w-none text-gray-400 leading-relaxed">
                  {renderMarkdown(topic.content)}
                </article>

                {/* Conversion CTA Card (Phase 5) */}
                <div className="mt-12 p-8 rounded-2xl border border-orange-500/20 bg-gradient-to-br from-orange-500/5 to-transparent relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 blur-[100px] rounded-full pointer-events-none" />
                  <h3 className="text-xl md:text-2xl font-bold mb-3 text-white">
                    Audit Your Subdomain Exposure
                  </h3>
                  <p className="text-gray-400 mb-6 max-w-2xl leading-relaxed">
                    Map out forgotten development environments, staging configurations, and scan for dangling CNAME takeover vulnerabilities instantly.
                  </p>
                  <Link href="/tools/subdomain-finder">
                    <span className="inline-flex items-center justify-center bg-orange-500 hover:bg-orange-500/90 text-black px-6 py-3 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)] cursor-pointer">
                      Scan Subdomains Now
                    </span>
                  </Link>
                </div>

                {/* FAQs Section */}
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wider border-b border-white/5 pb-2">Frequently Asked Questions</h2>
                  <div className="space-y-4">
                    {topic.faqs.map((faq, i) => (
                      <div key={i} className="p-5 rounded-xl bg-[#0d1117] border border-white/[0.06]">
                        <h3 className="text-white font-semibold mb-2 text-sm">{faq.q}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sibling Topic Links */}
                <div className="pt-10 border-t border-white/5">
                  <h3 className="text-xl font-bold text-white mb-6">Related Subdomain Topics</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {SUBDOMAIN_TOPICS
                      .filter(t => t !== domain)
                      .slice(0, 4)
                      .map(t => (
                        <Link 
                          key={t} 
                          href={`/subdomains/${t}`} 
                          className="bg-[#0d1117] border border-white/5 hover:border-orange-500/30 p-5 rounded-xl transition-all group flex flex-col justify-between"
                        >
                          <div>
                            <h4 className="text-sm font-bold text-white group-hover:text-[#00ff88] mt-1 mb-2">
                              {SUBDOMAIN_TOPICS_DATA[t].title}
                            </h4>
                            <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">{SUBDOMAIN_TOPICS_DATA[t].description}</p>
                          </div>
                          <div className="text-xs text-[#00ff88] font-mono mt-4 flex items-center gap-1 opacity-80">
                            Learn More <ChevronRight className="w-3.5 h-3.5" />
                          </div>
                        </Link>
                      ))}
                  </div>
                  <div className="mt-6 flex justify-end">
                    <Link href="/subdomains" className="text-xs text-orange-400 hover:text-orange-300 font-mono flex items-center gap-1">
                      Explore all subdomain profiles & topics <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

              </div>

              <div className="lg:col-span-1 space-y-6">
                <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0d1117] to-transparent border border-white/5 sticky top-24">
                  <h3 className="text-sm font-mono font-bold text-gray-400 uppercase tracking-widest mb-6">Related OSINT Guides</h3>
                  
                  <div className="space-y-3">
                    {topic.related.map((rel, idx) => (
                      <Link key={idx} href={rel.path} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                        <div className="w-8 h-8 rounded-md bg-orange-500/10 flex items-center justify-center text-orange-400 group-hover:bg-orange-500/20">
                          <Network className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white group-hover:text-orange-400 transition-colors">{rel.name}</div>
                          <div className="text-xs text-gray-500">OSINT analysis guide</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </>
    );
  }

  // Schema Generation for Domain pages
  const schemaJson = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TechArticle',
        '@id': `https://reconshield.in/subdomains/${domain}/#article`,
        headline: `${domain} Subdomain internet-facing assets Mapping`,
        description: `Detailed intelligence report outlining the known subdomains, virtual hosts, and cloud infrastructure associated with ${domain}.`,
        publisher: {
          '@type': 'Organization',
          name: 'ReconShield Threat Research'
        },
        url: `https://reconshield.in/subdomains/${domain}`
      },
      generateDatasetSchema({
        name: `${domain} Subdomain & Asset Inventory Data`,
        description: `External asset mapping and subdomain enumeration dataset for ${domain}. Uncovers forgotten development servers, staging environments, API endpoints, and potential subdomain takeover vectors.`,
        url: `https://reconshield.in/subdomains/${domain}`,
        dateModified: new Date().toISOString()
      }),
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
            acceptedAnswer: { '@type': 'Answer', text: `A takeover occurs when a subdomain of ${domain} has a DNS record pointing to a decommissioned third-party service (like an expired AWS S3 bucket). An unauthorized actor can claim that bucket and serve malicious content on the legitimate subdomain.` }
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
              <li><Link href="/subdomains" className="hover:text-[#00ff88] transition-colors">Subdomains Hub</Link></li>
              <li><ChevronRight className="w-3 h-3" /></li>
              <li className="text-[#00ff88]">{domain}</li>
            </ol>
          </nav>

          <div className="border-b border-white/10 pb-8 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/10 border border-orange-500/20 rounded-full text-[10px] font-mono text-orange-400 mb-4 uppercase tracking-widest">
              <Network className="w-3 h-3" />
              <span>internet-facing assets Mapping</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              <span className="text-orange-400">{domain}</span> Subdomains
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
              Passive infrastructure visibility and subdomain enumeration to uncover the hidden infrastructure of {domain}.
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
                  audit Subdomains for {domain}
                </Link>
              </div>

              <div className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-bold text-white uppercase tracking-wider mb-4 border-b border-white/5 pb-2">
                  Mapping the Footprint of {domain}
                </h2>
                <p className="text-gray-400 leading-relaxed">
                  While the main website (`www.{domain}`) is heavily defended by web application firewalls and security teams, subdomains often host forgotten or unmonitored infrastructure. Finding these subdomains is the foundational first step in any compliance audit or Bug Bounty engagement.
                </p>

                <h3 className="text-xl font-bold text-white mt-8 mb-3">The Danger of Shadow IT</h3>
                <p className="text-gray-400 leading-relaxed">
                  "Shadow IT" refers to servers and applications deployed without the knowledge of the central security team. By enumerating the subdomains of {domain}, researchers frequently discover exposed administrative panels (`admin.{domain}`), legacy API versions (`v1-api.{domain}`), or vulnerable staging environments containing debug code.
                </p>

                <h3 className="text-xl font-bold text-white mt-8 mb-3">Investigation Workflows</h3>
                <ul className="text-gray-400 leading-relaxed list-disc pl-5 space-y-2">
                  <li><strong>Port Scanning:</strong> Once a list of subdomains is generated, the next step is running a port scan against each unique IP to identify running services.</li>
                  <li><strong>CNAME Resolution:</strong> Analyzing the DNS records of each subdomain to check for Subdomain Takeover configuration risks on services like AWS, GitHub Pages, or Heroku.</li>
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

              {/* Related Resources Hub & Sibling Links */}
              <div className="pt-10 border-t border-white/5">
                <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wider">
                  Related Domain Maps
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {['google.com', 'github.com', 'microsoft.com', 'cloudflare.com', 'apple.com']
                    .filter(d => d !== domain)
                    .slice(0, 4)
                    .map(d => (
                      <Link 
                        key={d} 
                        href={`/subdomains/${d}`} 
                        className="bg-[#0d1117] border border-white/5 hover:border-orange-500/30 p-5 rounded-xl transition-all group flex flex-col justify-between"
                      >
                        <div>
                          <h3 className="text-sm font-bold text-white group-hover:text-[#00ff88] transition-colors mb-2">
                            {d} Subdomains
                          </h3>
                          <p className="text-xs text-gray-400 leading-relaxed">View the external asset mapping footprint for {d}.</p>
                        </div>
                        <div className="text-xs text-[#00ff88] font-mono mt-4 flex items-center gap-1 opacity-80">
                          View Map <ChevronRight className="w-3.5 h-3.5" />
                        </div>
                      </Link>
                    ))}
                </div>
                <div className="mt-6 flex justify-end">
                  <Link href="/subdomains" className="text-xs text-orange-400 hover:text-orange-300 font-mono flex items-center gap-1">
                    Explore all subdomains & topics <ChevronRight className="w-4 h-4" />
                  </Link>
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
