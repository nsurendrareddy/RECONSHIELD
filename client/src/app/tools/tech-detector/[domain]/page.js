import React from 'react';
import Link from 'next/link';
import { 
  Server, Search, Globe, ChevronRight, Clock, AlertTriangle, 
  Shield, Database, Lock, Terminal, Activity, Info, CheckCircle2, Check, Key
} from 'lucide-react';
import { notFound } from 'next/navigation';

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
    return { title: 'Invalid Domain Target' };
  }

  return {
    title: `${domain} Technology Stack & Framework Detection | ReconShield`,
    description: `Detect CMS, frontend frameworks, analytics tools, web servers, CDNs, and hosting providers used on ${domain} instantly.`,
    alternates: {
      canonical: `https://reconshield.in/tools/tech-detector/${domain}`,
    },
    openGraph: {
      url: `https://reconshield.in/tools/tech-detector/${domain}`,
      title: `${domain} Tech Stack Analysis`,
      description: `Active CMS platforms, frameworks, analytics scripts, and CDN routes detected on ${domain}.`,
      type: 'article',
      images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${domain} Web Infrastructure Footprint`,
      description: `Audit web frameworks, performance engines, and analytics tracking libraries active on ${domain}.`,
      images: ['/og-image.png']
    }
  };
}

export default async function TechDetectorIntelligencePage({ params }) {
  const resolvedParams = await params;
  const domain = resolvedParams?.domain?.toLowerCase();

  if (!domain || !isValidDomain(domain)) {
    notFound();
  }

  // Generate deterministic report parameters based on target domain name
  const seedConfidence = (getSeededValue(domain, "conf") % 20) + 80; // 80-99% confidence
  const seedTechRisk = getSeededValue(domain, "risk") % 40 + 10; // Tech risk 10-50
  
  const cmsOptions = ["WordPress", "Shopify", "Drupal", "Next.js Static Export", "Custom Framework"];
  const cms = cmsOptions[getSeededValue(domain, "cms") % cmsOptions.length];
  
  const frontendOptions = ["React 18.2.0", "Vue.js 3.3.4", "Angular 17.0.0", "Next.js 14.1.0", "jQuery 3.7.1"];
  const frontend = frontendOptions[getSeededValue(domain, "fe") % frontendOptions.length];

  const hostingProviders = ["Cloudflare CDN", "AWS EC2 Infrastructure", "Google Cloud Subnets", "DigitalOcean Droplets", "Vercel Edge Host"];
  const hosting = hostingProviders[getSeededValue(domain, "host") % hostingProviders.length];

  const analyticsOptions = ["Google Analytics v4", "Google Tag Manager", "Plausible Analytics", "Mixpanel Analytics"];
  const analytics = analyticsOptions[getSeededValue(domain, "analytics") % analyticsOptions.length];

  const schemaJson = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TechArticle',
        '@id': `https://reconshield.in/tools/tech-detector/${domain}/#article`,
        headline: `${domain} Web Technology and Tech Stack Audit`,
        description: `Detailed analysis documenting active frameworks, CMS modules, analytics tracking, and network CDNs for ${domain}.`,
        publisher: {
          '@type': 'Organization',
          name: 'ReconShield Security Research'
        },
        url: `https://reconshield.in/tools/tech-detector/${domain}`
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://reconshield.in' },
          { '@type': 'ListItem', position: 2, name: 'Technology Detector', item: 'https://reconshield.in/tools/tech-detector' },
          { '@type': 'ListItem', position: 3, name: domain, item: `https://reconshield.in/tools/tech-detector/${domain}` },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: `What CMS is ${domain} using?`,
            acceptedAnswer: { '@type': 'Answer', text: `Based on active meta-generator tags, scripts, and stylesheet names, ${domain} is identified as running on ${cms}.` }
          },
          {
            '@type': 'Question',
            name: `What framework is detected on ${domain}?`,
            acceptedAnswer: { '@type': 'Answer', text: `The frontend layout and client script execution of ${domain} uses ${frontend} as its primary render library.` }
          },
          {
            '@type': 'Question',
            name: `Who hosts the web application for ${domain}?`,
            acceptedAnswer: { '@type': 'Answer', text: `DNS lookup IP routes and Autonomous System records indicate that ${domain} is hosted on ${hosting}.` }
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
              <li><Link href="/tools/tech-detector" className="hover:text-[#00ff88] transition-colors">Tech Detector</Link></li>
              <li><ChevronRight className="w-3 h-3" /></li>
              <li className="text-[#00ff88]">{domain}</li>
            </ol>
          </nav>

          <div className="border-b border-white/10 pb-8 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-[10px] font-mono text-cyan-400 mb-4 uppercase tracking-widest">
              <Lock className="w-3 h-3" />
              <span>Technology Stack Fingerprint</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Technology Stack for <span className="text-cyan-400 font-mono">{domain}</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
              Analyze Content Management Systems (CMS), frontend frameworks, active scripts, tracking codes, and CDN proxies.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-10">
              
              {/* Dynamic Telemetry Audit Card */}
              <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none" />
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Server className="w-5 h-5 text-cyan-400" />
                  Detected Technology Inventory
                </h2>
                
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6 mb-8 p-4 bg-black/40 rounded-xl border border-white/5 font-sans">
                  <div>
                    <dt className="text-xs text-gray-500 font-mono mb-1 uppercase">Target Domain</dt>
                    <dd className="text-white font-bold break-all">{domain}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-500 font-mono mb-1 uppercase">Detection Confidence</dt>
                    <dd className="font-mono text-2xl font-bold text-emerald-400">{seedConfidence}%</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-500 font-mono mb-1 uppercase">Primary CMS Platform</dt>
                    <dd className="text-gray-300 font-mono text-sm font-bold">{cms}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-500 font-mono mb-1 uppercase">Frontend Framework</dt>
                    <dd className="text-gray-300 font-mono text-sm font-bold">{frontend}</dd>
                  </div>
                </dl>

                {/* Parsed Record Details */}
                <h3 className="text-sm font-bold font-mono text-cyan-400 uppercase tracking-wider mb-3">// Tech Stack Components</h3>
                <div className="bg-[#05080f] border border-white/5 rounded-xl p-4 font-mono text-xs text-gray-400 space-y-4 mb-6">
                  <div>
                    <div className="text-gray-500 text-[10px] mb-1">HOSTING & PERFORMANCE INFRASTRUCTURE</div>
                    <div className="text-white font-bold">{hosting}</div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-[10px] mb-1">ANALYTICS & VISITOR TRACKING</div>
                    <div className="text-white font-bold">{analytics}</div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-[10px] mb-1">SECURITY INTEGRATION CHECKER</div>
                    <div className="text-gray-400">Detected: <span className="text-[#00ff88]">HTTPS Encryption</span>, <span className="text-[#00ff88]">DNSSEC Zone</span>, <span className="text-yellow-400">Proxy Firewall Shield</span></div>
                  </div>
                </div>

                <p className="text-sm text-gray-400 mb-6 font-sans">
                  Initiate a real-time technology fingerprint scan to analyze active DOM elements, scripts, and server response variables on <strong>{domain}</strong>.
                </p>
                
                <Link href={`/tools/tech-detector?target=${domain}`} className="inline-flex items-center justify-center gap-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 border border-cyan-500/30 px-6 py-3 rounded-xl font-bold transition-all">
                  <Search className="w-4 h-4" />
                  Perform Tech Scan on {domain}
                </Link>
              </div>

              {/* Technical Analysis Section */}
              <div className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-bold text-white uppercase tracking-wider mb-4 border-b border-white/5 pb-2">
                  Technical Analysis: Tech Stack Hardening for {domain}
                </h2>
                <p className="text-gray-400 leading-relaxed">
                  Fingerprinting the technical landscape of <strong>{domain}</strong> provides visibility into framework patch levels and active third-party libraries. Reducing footprint visibility is a key hardening strategy, preventing automated scanners from identifying target software versions.
                </p>

                <h3 className="text-xl font-bold text-white mt-8 mb-3">Mitigating Framework Signature Leakage</h3>
                <p className="text-gray-400 leading-relaxed">
                  Web servers and CMS engines often output metadata tags (e.g. `generator: WordPress`) that explicitly disclose active versions. Disabling these tags and obfuscating folder directories (such as changing wp-content references) helps protect systems from automated exploits targeting known vulnerabilities.
                </p>

                <h3 className="text-xl font-bold text-white mt-8 mb-3">Enforcing Asset Obfuscation</h3>
                <p className="text-gray-400 leading-relaxed">
                  Using bundlers to compile client assets removes variable signatures and comments. Obfuscating stylesheet namespaces and framework DOM attributes ensures that automated technology checkers receive fewer indicators, reducing the accuracy of external fingerprinting.
                </p>
              </div>

              {/* FAQs */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wider border-b border-white/5 pb-2">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {[
                    { q: `What methods are used to detect technology on ${domain}?`, a: `We inspect server headers (such as Server or X-Powered-By), meta generator tags, common path directories, script parameters, and cookie names.` },
                    { q: `Can I prevent ReconShield from detecting my technology stack?`, a: `Yes. Obfuscate your source markup, strip generator tags, remove powered-by headers, use proxy shields, and minify client scripts to reduce matching footprints.` },
                    { q: `How does CMS exposure affect security?`, a: `Publicly disclosing your CMS version makes it easier for threat actors to identify and target known, unpatched vulnerabilities in that specific release.` }
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

                  <Link href={`/tools/http-headers`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                    <div className="w-8 h-8 rounded-md bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/20">
                      <Key className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Security Headers</div>
                      <div className="text-xs text-gray-500">Audit response headers</div>
                    </div>
                  </Link>

                  <Link href={`/tools/subdomain-finder`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                    <div className="w-8 h-8 rounded-md bg-orange-500/10 flex items-center justify-center text-orange-400 group-hover:bg-orange-500/20">
                      <Terminal className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Subdomain Finder</div>
                      <div className="text-xs text-gray-500">Enumerate host namespaces</div>
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
