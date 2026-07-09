import React from 'react';
import Link from 'next/link';
import { 
  Server, Search, Globe, ChevronRight, Clock, AlertTriangle, 
  Shield, Database, Lock, Network, Activity, Info, CheckCircle2, Check
} from 'lucide-react';
import { notFound } from 'next/navigation';
import SimulatedDataNotice from '@/components/SimulatedDataNotice';

export const dynamic = 'force-dynamic';

const isValidDomain = (domain) => {
  const domainRegex = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/i;
  return domainRegex.test(domain);
};

// Deterministic seed generator
function getSeededValue(str, seed) {
  let hash = 0;
  const combined = str + seed;
  for (let i = 0; i < combined.length; i++) {
    hash = combined.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const domain = resolvedParams?.domain?.toLowerCase();

  if (!domain || !isValidDomain(domain)) {
    return { title: 'Invalid Domain' };
  }

  return {
    title: `${domain} Subdomain Enumeration & Attack Surface Mapping | ReconShield`,
    description: `Lookup active subdomains for ${domain}. Identify forgotten development servers, staging environments, virtual hosts, and subdomain takeover vulnerabilities.`,
    alternates: {
      canonical: `https://reconshield.in/tools/subdomain-finder/${domain}`,
    },
    robots: { index: false, follow: true },
    openGraph: {
      url: `https://reconshield.in/tools/subdomain-finder/${domain}`,
      title: `${domain} Subdomain Map`,
      description: `Passive asset discovery, host enumeration, and external attack surface audits for ${domain}.`,
      type: 'article',
      images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${domain} Subdomain Intelligence`,
      description: `Active subdomains inventory and cloud host vulnerability reports for ${domain}.`,
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

  // Generate deterministic report parameters based on the domain name
  const seedRisk = getSeededValue(domain, "risk") % 45 + 10; // Risk score 10-55
  const seedHosts = getSeededValue(domain, "hosts") % 180 + 12; // 12-192 hosts
  const seedTakeovers = getSeededValue(domain, "takeover") % 100 < 15 ? 1 : 0; // 15% chance of showing takeover exposure
  
  const providers = ["Amazon Web Services", "Cloudflare", "Google Cloud Platform", "Microsoft Azure", "Fastly", "Akamai Technologies"];
  const provider = providers[getSeededValue(domain, "provider") % providers.length];

  const subdomains = [
    `www.${domain}`,
    `api.${domain}`,
    `dev.${domain}`,
    `staging.${domain}`,
    `mail.${domain}`,
    `assets.${domain}`,
    `blog.${domain}`,
    `test.${domain}`
  ].slice(0, (getSeededValue(domain, "subcount") % 6) + 3);

  const schemaJson = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TechArticle',
        '@id': `https://reconshield.in/tools/subdomain-finder/${domain}/#article`,
        headline: `Sample Subdomain Map (Illustrative) for ${domain}`,
        description: `Demonstration audit documenting known subdomain namespaces, DNS zone delegations, and hosting platforms connected to ${domain} using simulated data.`,
        publisher: {
          '@type': 'Organization',
          name: 'ReconShield Threat Research'
        },
        url: `https://reconshield.in/tools/subdomain-finder/${domain}`
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://reconshield.in' },
          { '@type': 'ListItem', position: 2, name: 'Subdomain Finder', item: 'https://reconshield.in/tools/subdomain-finder' },
          { '@type': 'ListItem', position: 3, name: domain, item: `https://reconshield.in/tools/subdomain-finder/${domain}` },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: `How do I view all subdomains for ${domain}?`,
            acceptedAnswer: { '@type': 'Answer', text: `Use the ReconShield Subdomain Finder query container above to parse public Certificate Transparency (CT) logs and return all registered hostnames for ${domain}.` }
          },
          {
            '@type': 'Question',
            name: `What is a dangling subdomain on ${domain}?`,
            acceptedAnswer: { '@type': 'Answer', text: `A dangling subdomain is a host entry whose DNS CNAME record points to an expired external cloud platform. If left unconfigured, threat actors can claim that endpoint to hijack the subdomain.` }
          },
          {
            '@type': 'Question',
            name: `Does passive scanning impact ${domain}'s server performance?`,
            acceptedAnswer: { '@type': 'Answer', text: `No. ReconShield utilizes passive OSINT techniques, scanning public registries, cached DNS records, and transparency logs without sending network packets directly to ${domain}.` }
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
              <li><Link href="/tools/subdomain-finder" className="hover:text-[#00ff88] transition-colors">Subdomain Finder</Link></li>
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
              Subdomain Map for <span className="text-orange-400 font-mono">{domain}</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
              Verify external host visibility, staging environments, cloud service configurations, and DNS CNAME alignment for {domain}.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-10">
              
              <SimulatedDataNotice />

              {/* Dynamic Telemetry Audit Card */}
              <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 blur-[100px] rounded-full pointer-events-none" />
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Server className="w-5 h-5 text-orange-500" />
                  Sample Subdomain Discovery Output (Illustrative)
                </h2>
                
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6 mb-8 p-4 bg-black/40 rounded-xl border border-white/5">
                  <div>
                    <dt className="text-xs text-gray-500 font-mono mb-1 uppercase">Root Domain</dt>
                    <dd className="text-white font-bold break-all">{domain}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-500 font-mono mb-1 uppercase">Methodology</dt>
                    <dd className="text-gray-300 font-mono text-sm">Passive CT Log Analysis</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-500 font-mono mb-1 uppercase">Primary Cloud Provider</dt>
                    <dd className="text-white font-mono text-sm">{provider}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-500 font-mono mb-1 uppercase">Estimated Subdomains</dt>
                    <dd className="text-white font-mono text-sm">{seedHosts} hosts tracked</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-500 font-mono mb-1 uppercase">Subdomain Risk Score</dt>
                    <dd className={`font-mono text-sm font-bold ${seedRisk > 40 ? 'text-red-400' : 'text-yellow-400'}`}>
                      {seedRisk}/100
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-500 font-mono mb-1 uppercase">Takeover Exposure</dt>
                    <dd className={`font-mono text-sm font-bold ${seedTakeovers > 0 ? 'text-red-400 flex items-center gap-1' : 'text-[#00ff88]'}`}>
                      {seedTakeovers > 0 ? (
                        <>
                          <AlertTriangle className="w-3 h-3 text-red-400" />
                          Dangling CNAME Detected
                        </>
                      ) : (
                        'No Dangling Records Detected'
                      )}
                    </dd>
                  </div>
                </dl>

                {/* Subdomain Inventory Preview */}
                <h3 className="text-sm font-bold font-mono text-gray-400 uppercase tracking-wider mb-3">// Example Subdomain Inventory Preview (Demo Data)</h3>
                <div className="bg-[#05080f] border border-white/5 rounded-xl p-4 font-mono text-xs text-gray-400 mb-6 space-y-1 max-h-48 overflow-y-auto">
                  {subdomains.map((sub, index) => (
                    <div key={index} className="flex justify-between items-center py-1 border-b border-white/[0.02] last:border-0">
                      <span className="text-orange-400">{sub}</span>
                      <span className="text-gray-600">RESOLVED (A, AAAA, MX)</span>
                    </div>
                  ))}
                </div>

                <p className="text-sm text-gray-400 mb-6 font-sans">
                  Initiate a complete passive security scan for <strong>{domain}</strong> to extract all active subdomains, find staging hosts, and check CNAME takeover configurations.
                </p>
                
                <Link href={`/tools/subdomain-finder?target=${domain}`} className="inline-flex items-center justify-center gap-2 bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 border border-orange-500/30 px-6 py-3 rounded-xl font-bold transition-all">
                  <Search className="w-4 h-4" />
                  Scan Subdomains on {domain}
                </Link>
              </div>

              {/* Security Analysis Section */}
              <div className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-bold text-white uppercase tracking-wider mb-4 border-b border-white/5 pb-2">
                  Security Analysis: External Attack Surface on {domain}
                </h2>
                <p className="text-gray-400 leading-relaxed">
                  The external perimeter of <strong>{domain}</strong> consists of all public-facing IP bindings, subdomains, and hostnames resolving to the organization's servers. While core corporate applications are typically protected behind strong access controls, subdomains created for developers, APIs, and marketing campaigns frequently go unmonitored.
                </p>

                <h3 className="text-xl font-bold text-white mt-8 mb-3">The Vulnerability of Forgotten Assets</h3>
                <p className="text-gray-400 leading-relaxed">
                  Reconnaissance scans consistently reveal subdomains (e.g. `dev.{domain}` or `test.{domain}`) running outdated software versions with unpatched software exploits. Identifying these hosts through passive certificate analysis enables security administrators to secure them before they are discovered by malicious actors.
                </p>

                <h3 className="text-xl font-bold text-white mt-8 mb-3">Analyzing DNS Wildcards</h3>
                <p className="text-gray-400 leading-relaxed">
                  If {domain} employs wildcard DNS configurations, any query for a non-existent subdomain resolves to a default server. In this scenario, passive log checks (which parse SSL transactions) remain the most effective technique to discover active, historically valid subdomains.
                </p>
              </div>

              {/* Dynamic FAQs */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wider border-b border-white/5 pb-2">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {[
                    { q: `What is the difference between active and passive discovery on ${domain}?`, a: `Active discovery uses DNS brute-forcing, querying target name servers directly for hundreds of common subdomain words. Passive discovery queries third-party databases and CT logs, leaving zero footprints on ${domain}'s host logs.` },
                    { q: `How can I secure ${domain} against subdomain takeovers?`, a: `Always audit external CNAME bindings. Ensure that if you remove a resource on a third-party platform (such as a GitHub page or Shopify shop), you immediately delete the corresponding DNS entry in the zone file.` },
                    { q: `How does a Certificate Transparency log discover subdomains for ${domain}?`, a: `Whenever a Certificate Authority issues an SSL/TLS certificate for a host name (e.g. api.${domain}), it is legally required to publish the transaction in public CT logs. We index these logs to extract host names passively.` }
                  ].map((faq, i) => (
                    <div key={i} className="p-5 rounded-xl bg-[#0d1117] border border-white/[0.06]">
                      <h3 className="text-white font-semibold mb-2 text-sm">{faq.q}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar with Entity Relations */}
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
                  
                  <Link href={`/tools/dns-lookup`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                    <div className="w-8 h-8 rounded-md bg-teal-500/10 flex items-center justify-center text-teal-400 group-hover:bg-teal-500/20">
                      <Database className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">DNS Lookup</div>
                      <div className="text-xs text-gray-500">Resolve A/MX/TXT records</div>
                    </div>
                  </Link>

                  <Link href={`/tools/ip-lookup`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                    <div className="w-8 h-8 rounded-md bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:bg-purple-500/20">
                      <Network className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">IP Lookup</div>
                      <div className="text-xs text-gray-500">Analyze host reputation</div>
                    </div>
                  </Link>

                  <Link href={`/tools/port-scanner`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                    <div className="w-8 h-8 rounded-md bg-red-500/10 flex items-center justify-center text-red-400 group-hover:bg-red-500/20">
                      <Terminal className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Port Scanner</div>
                      <div className="text-xs text-gray-500">Scan public services</div>
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
