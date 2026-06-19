import React from 'react';
import Link from 'next/link';
import { 
  Network, Search, Server, Globe, ChevronRight, Activity, 
  Lock, Shield, AlertTriangle, CheckCircle2, Database, HelpCircle, Check, ArrowRight
} from 'lucide-react';
import { notFound } from 'next/navigation';
import { generateDatasetSchema } from '@/utils/metadata';
import { SUBDOMAIN_TOPICS_DATA } from '@/utils/programmaticTopicsData';
import { renderMarkdown } from '@/utils/markdownRenderer';
import { KNOWN_DOMAINS } from '@/lib/entityRegistry';
import SimulatedDataNotice from '@/components/SimulatedDataNotice';

const SUBDOMAIN_TOPICS = Object.keys(SUBDOMAIN_TOPICS_DATA);

const isValidDomain = (domain) => {
  const normalized = domain.toLowerCase();
  if (SUBDOMAIN_TOPICS.includes(normalized)) return true;
  if (!KNOWN_DOMAINS.includes(normalized)) return false;
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

// Generate premium mock telemetry datasets for programmatic domains
function getDomainTelemetry(domain) {
  const normalized = domain.toLowerCase();
  const seedRisk = getSeededValue(normalized, "risk") % 35 + 10; // 10-45 range
  const totalSubdomains = getSeededValue(normalized, "subcount") % 120 + 20; // 20-140

  if (normalized === 'google.com') {
    return {
      provider: 'Google LLC',
      riskScore: 12,
      subdomainsCount: 2340,
      dnssec: 'Enabled',
      dmarc: 'Reject (p=reject)',
      spf: 'Valid policy (include:_spf.google.com)',
      sslGrade: 'A+',
      hsts: 'Enabled',
      cnameTakeover: 'None Detected',
      ips: ['142.250.190.46', '142.250.190.78', '142.250.190.110'],
      subdomainsList: [
        { name: 'www.google.com', ip: '142.250.190.46', status: '200 OK', type: 'Production', provider: 'Google LLC' },
        { name: 'mail.google.com', ip: '142.250.190.37', status: '200 OK', type: 'Mail Gateway', provider: 'Google LLC' },
        { name: 'api.google.com', ip: '142.250.190.78', status: '404 Not Found', type: 'REST API', provider: 'Google LLC' },
        { name: 'dev.google.com', ip: '142.250.190.110', status: '302 Redirect', type: 'Development', provider: 'Google LLC' },
        { name: 'staging.google.com', ip: '142.250.190.142', status: '401 Unauthorized', type: 'Staging Server', provider: 'Google LLC' },
        { name: 'blog.google.com', ip: '142.250.190.206', status: '200 OK', type: 'Marketing', provider: 'Google LLC' }
      ],
      dns: {
        A: [
          { host: 'google.com', ip: '142.250.190.46', ttl: 300 },
          { host: 'www.google.com', ip: '142.250.190.46', ttl: 300 }
        ],
        MX: [
          { exchange: 'aspmx.l.google.com', priority: 10, ttl: 3600 },
          { exchange: 'alt1.aspmx.l.google.com', priority: 20, ttl: 3600 }
        ],
        TXT: [
          { record: 'v=spf1 include:_spf.google.com ~all', ttl: 3600 },
          { record: 'google-site-verification=rU33z5JDx82...', ttl: 3600 }
        ],
        NS: [
          { target: 'ns1.google.com', ttl: 86400 },
          { target: 'ns2.google.com', ttl: 86400 }
        ]
      },
      ssl: {
        issuer: 'Google Trust Services LLC',
        cipher: 'TLS_AES_128_GCM_SHA256',
        keySize: 'ECDSA 256 bits',
        protocols: ['TLS 1.2', 'TLS 1.3'],
        validFrom: '2026-01-01',
        validTo: '2027-01-01'
      }
    };
  }

  if (normalized === 'github.com') {
    return {
      provider: 'Fastly CDN / AWS',
      riskScore: 18,
      subdomainsCount: 840,
      dnssec: 'Disabled',
      dmarc: 'Quarantine (p=quarantine)',
      spf: 'Valid policy (include:spf.protection.outlook.com)',
      sslGrade: 'A+',
      hsts: 'Enabled',
      cnameTakeover: 'None Detected',
      ips: ['140.82.112.4', '140.82.113.5', '140.82.114.8'],
      subdomainsList: [
        { name: 'www.github.com', ip: '140.82.112.4', status: '200 OK', type: 'Production', provider: 'Fastly CDN' },
        { name: 'api.github.com', ip: '140.82.113.5', status: '200 OK', type: 'REST API', provider: 'Fastly CDN' },
        { name: 'dev.github.com', ip: '140.82.112.20', status: '301 Redirect', type: 'Development', provider: 'AWS' },
        { name: 'status.github.com', ip: '140.82.113.21', status: '200 OK', type: 'Operations', provider: 'AWS' },
        { name: 'pages.github.com', ip: '140.82.114.8', status: '200 OK', type: 'Static Hosting', provider: 'Fastly CDN' }
      ],
      dns: {
        A: [
          { host: 'github.com', ip: '140.82.112.4', ttl: 60 },
          { host: 'www.github.com', ip: '140.82.112.4', ttl: 60 }
        ],
        MX: [
          { exchange: 'aspmx.l.google.com', priority: 10, ttl: 3600 },
          { exchange: 'alt1.aspmx.l.google.com', priority: 20, ttl: 3600 }
        ],
        TXT: [
          { record: 'v=spf1 include:_spf.google.com include:spf.protection.outlook.com ~all', ttl: 3600 },
          { record: 'github-verification=d562fa5342a...', ttl: 3600 }
        ],
        NS: [
          { target: 'ns-1283.awsdns-32.org', ttl: 86400 },
          { target: 'ns-421.awsdns-52.com', ttl: 86400 }
        ]
      },
      ssl: {
        issuer: 'DigiCert TLS RSA SHA256 2020 CA1',
        cipher: 'TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256',
        keySize: 'RSA 2048 bits',
        protocols: ['TLS 1.2', 'TLS 1.3'],
        validFrom: '2025-11-15',
        validTo: '2026-11-15'
      }
    };
  }

  if (normalized === 'microsoft.com') {
    return {
      provider: 'Microsoft Azure',
      riskScore: 24,
      subdomainsCount: 4120,
      dnssec: 'Enabled',
      dmarc: 'Reject (p=reject)',
      spf: 'Valid policy (include:_spf-a.microsoft.com)',
      sslGrade: 'A',
      hsts: 'Enabled',
      cnameTakeover: 'None Detected',
      ips: ['23.100.122.175', '23.101.44.89', '23.96.52.111'],
      subdomainsList: [
        { name: 'www.microsoft.com', ip: '23.100.122.175', status: '200 OK', type: 'Production', provider: 'Microsoft Azure' },
        { name: 'api.microsoft.com', ip: '23.101.44.89', status: '404 Not Found', type: 'REST API', provider: 'Microsoft Azure' },
        { name: 'dev.microsoft.com', ip: '23.96.52.111', status: '403 Forbidden', type: 'Development', provider: 'Microsoft Azure' },
        { name: 'staging.microsoft.com', ip: '23.96.110.12', status: '401 Unauthorized', type: 'Staging Server', provider: 'Microsoft Azure' },
        { name: 'portal.microsoft.com', ip: '40.112.72.200', status: '302 Found', type: 'App Portal', provider: 'Microsoft Azure' }
      ],
      dns: {
        A: [
          { host: 'microsoft.com', ip: '23.100.122.175', ttl: 3600 },
          { host: 'www.microsoft.com', ip: '23.100.122.175', ttl: 3600 }
        ],
        MX: [
          { exchange: 'microsoft-com.mail.protection.outlook.com', priority: 10, ttl: 3600 }
        ],
        TXT: [
          { record: 'v=spf1 include:_spf-a.microsoft.com include:_spf-b.microsoft.com -all', ttl: 3600 },
          { record: 'facebook-domain-verification=37a1...', ttl: 3600 }
        ],
        NS: [
          { target: 'ns1-205.azure-dns.com', ttl: 86400 },
          { target: 'ns2-205.azure-dns.net', ttl: 86400 }
        ]
      },
      ssl: {
        issuer: 'Microsoft RSA TLS CA 01',
        cipher: 'TLS_AES_256_GCM_SHA384',
        keySize: 'RSA 2048 bits',
        protocols: ['TLS 1.2', 'TLS 1.3'],
        validFrom: '2026-03-01',
        validTo: '2027-03-01'
      }
    };
  }

  if (normalized === 'openai.com') {
    return {
      provider: 'Cloudflare',
      riskScore: 28,
      subdomainsCount: 154,
      dnssec: 'Enabled',
      dmarc: 'Reject (p=reject)',
      spf: 'Valid policy (include:spf.protection.outlook.com)',
      sslGrade: 'A+',
      hsts: 'Enabled',
      cnameTakeover: 'None Detected',
      ips: ['104.18.3.111', '104.18.2.111', '104.18.4.111'],
      subdomainsList: [
        { name: 'www.openai.com', ip: '104.18.3.111', status: '200 OK', type: 'Production', provider: 'Cloudflare' },
        { name: 'api.openai.com', ip: '104.18.2.111', status: '401 Unauthorized', type: 'REST API', provider: 'Cloudflare' },
        { name: 'dev.openai.com', ip: '104.18.4.111', status: '403 Forbidden', type: 'Development', provider: 'Cloudflare' },
        { name: 'chat.openai.com', ip: '104.18.2.100', status: '200 OK', type: 'Chat Application', provider: 'Cloudflare' },
        { name: 'status.openai.com', ip: '104.18.15.54', status: '200 OK', type: 'Operations', provider: 'Cloudflare' }
      ],
      dns: {
        A: [
          { host: 'openai.com', ip: '104.18.3.111', ttl: 300 },
          { host: 'www.openai.com', ip: '104.18.3.111', ttl: 300 }
        ],
        MX: [
          { exchange: 'aspmx.l.google.com', priority: 1, ttl: 300 },
          { exchange: 'alt1.aspmx.l.google.com', priority: 5, ttl: 300 }
        ],
        TXT: [
          { record: 'v=spf1 include:spf.protection.outlook.com include:_spf.google.com include:mailgun.org ~all', ttl: 300 },
          { record: 'openai-domain-verification=open82a...', ttl: 300 }
        ],
        NS: [
          { target: 'curt.ns.cloudflare.com', ttl: 86400 },
          { target: 'glenda.ns.cloudflare.com', ttl: 86400 }
        ]
      },
      ssl: {
        issuer: 'Cloudflare Inc ECC CA-3',
        cipher: 'TLS_AES_128_GCM_SHA256',
        keySize: 'ECDSA 256 bits',
        protocols: ['TLS 1.2', 'TLS 1.3'],
        validFrom: '2026-02-10',
        validTo: '2027-02-10'
      }
    };
  }

  // Fallback for other domains (cloudflare.com, apple.com, yahoo.com, reconshield.in)
  const fallbackProviders = ['Cloudflare', 'Amazon Web Services', 'Fastly CDN', 'Akamai CDN'];
  const fbProvider = fallbackProviders[getSeededValue(normalized, 'provider') % fallbackProviders.length];
  const fbIssuer = fbProvider === 'Cloudflare' ? 'Cloudflare Inc ECC CA-3' : 'DigiCert TLS RSA SHA256 2020 CA1';
  
  return {
    provider: fbProvider,
    riskScore: seedRisk,
    subdomainsCount: totalSubdomains,
    dnssec: seedRisk % 3 === 0 ? 'Enabled' : 'Disabled',
    dmarc: seedRisk % 2 === 0 ? 'Reject' : 'Quarantine',
    spf: 'Valid policy',
    sslGrade: seedRisk > 35 ? 'A' : 'A+',
    hsts: 'Enabled',
    cnameTakeover: seedRisk > 45 ? '1 Potential Dangling CNAME' : 'None Detected',
    ips: [`192.0.2.${seedRisk}`, `192.0.2.${seedRisk + 1}`],
    subdomainsList: [
      { name: `www.${normalized}`, ip: `192.0.2.${seedRisk}`, status: '200 OK', type: 'Production', provider: fbProvider },
      { name: `api.${normalized}`, ip: `192.0.2.${seedRisk + 1}`, status: '200 OK', type: 'REST API', provider: fbProvider },
      { name: `dev.${normalized}`, ip: `192.0.2.${seedRisk + 2}`, status: '403 Forbidden', type: 'Development', provider: fbProvider },
      { name: `mail.${normalized}`, ip: `192.0.2.${seedRisk + 3}`, status: '200 OK', type: 'Mail Gateway', provider: fbProvider }
    ],
    dns: {
      A: [
        { host: normalized, ip: `192.0.2.${seedRisk}`, ttl: 300 },
        { host: `www.${normalized}`, ip: `192.0.2.${seedRisk}`, ttl: 300 }
      ],
      MX: [
        { exchange: `mail.${normalized}`, priority: 10, ttl: 3600 }
      ],
      TXT: [
        { record: `v=spf1 ip4:192.0.2.0/24 -all`, ttl: 3600 }
      ],
      NS: [
        { target: `ns1.${normalized}`, ttl: 86400 },
        { target: `ns2.${normalized}`, ttl: 86400 }
      ]
    },
    ssl: {
      issuer: fbIssuer,
      cipher: 'TLS_AES_128_GCM_SHA256',
      keySize: fbIssuer.includes('ECC') ? 'ECDSA 256 bits' : 'RSA 2048 bits',
      protocols: ['TLS 1.2', 'TLS 1.3'],
      validFrom: '2026-01-15',
      validTo: '2027-01-15'
    }
  };
}

export async function generateStaticParams() {
  const topicParams = SUBDOMAIN_TOPICS.map(domain => ({ domain }));
  const domainParams = KNOWN_DOMAINS.map(domain => ({ domain }));
  return [...topicParams, ...domainParams];
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
    title: `${domain} Subdomain Enumeration & Internet-Facing Assets Mapping`,
    description: `Discover hidden subdomains and map the external internet-facing assets of ${domain}. Detect forgotten development servers, staging environments, and potential subdomain takeovers.`,
    alternates: {
      canonical: `https://reconshield.in/subdomains/${domain}`,
    },
    robots: { index: false, follow: true },
    openGraph: {
      url: `https://reconshield.in/subdomains/${domain}`,
      title: `${domain} Internet-Facing Assets Profile | ReconShield`,
      description: `Passive infrastructure visibility and subdomain enumeration for ${domain}.`,
      type: 'article',
      images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${domain} Subdomain Intelligence | ReconShield`,
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

  // Domain intelligence telemetry data
  const data = getDomainTelemetry(domain);

  // Schema Generation for Domain pages
  const schemaJson = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TechArticle',
        '@id': `https://reconshield.in/subdomains/${domain}/#article`,
        headline: `Sample Subdomain Internet-Facing Assets Mapping (Illustrative Demo)`,
        description: `Detailed intelligence report (Illustrative Demo) outlining the known subdomains, virtual hosts, and cloud infrastructure associated with ${domain} using simulated data.`,
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
        <div className="max-w-6xl mx-auto px-4 pt-8">
          
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-xs font-mono text-gray-500">
              <li><Link href="/" className="hover:text-[#00ff88] transition-colors">Home</Link></li>
              <li><ChevronRight className="w-3 h-3" /></li>
              <li><Link href="/subdomains" className="hover:text-[#00ff88] transition-colors">Subdomains Hub</Link></li>
              <li><ChevronRight className="w-3 h-3" /></li>
              <li className="text-[#00ff88]">{domain}</li>
            </ol>
          </nav>

          {/* Header */}
          <div className="border-b border-white/10 pb-8 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/10 border border-orange-500/20 rounded-full text-[10px] font-mono text-orange-400 mb-4 uppercase tracking-widest">
              <Network className="w-3 h-3" />
              <span>Internet-Facing Assets Mapping</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              <span className="text-orange-400 font-mono">{domain}</span> Subdomains & External Footprint (Demo)
            </h1>
            <p className="text-gray-400 text-lg max-w-3xl leading-relaxed">
              Passive infrastructure intelligence and host audit report for {domain} using simulated data. Access active subdomains, DNS records, TLS health, and attack surface risk evaluations.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
            
            {/* Left/Middle Content Dashboard columns */}
            <div className="lg:col-span-2 space-y-8">
              
              <SimulatedDataNotice />

              {/* Telemetry Overview & Attack Surface Score */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                
                {/* Score Widget */}
                <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/[0.02] blur-[40px] rounded-full pointer-events-none" />
                  <div>
                    <h4 className="text-xs font-mono font-bold text-gray-500 uppercase tracking-wider mb-2">Attack Surface Score</h4>
                    <div className="flex items-baseline gap-2 mt-4">
                      <span className="text-5xl font-bold font-mono text-white">{data.riskScore}</span>
                      <span className="text-sm font-mono text-gray-500">/100</span>
                    </div>
                  </div>
                  <div className="mt-6">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                      data.riskScore < 20 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                      data.riskScore < 40 ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' : 
                      'bg-red-500/10 text-red-400 border border-red-500/20'
                    }`}>
                      <Shield className="w-3 h-3" />
                      {data.riskScore < 20 ? 'Low Exposure' : data.riskScore < 40 ? 'Medium Exposure' : 'High Exposure'}
                    </span>
                  </div>
                </div>

                {/* Total Hosts */}
                <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-mono font-bold text-gray-500 uppercase tracking-wider mb-2">Tracked Subdomains</h4>
                    <div className="flex items-baseline gap-2 mt-4">
                      <span className="text-5xl font-bold font-mono text-orange-400">{data.subdomainsCount}</span>
                      <span className="text-sm font-mono text-gray-500">hosts</span>
                    </div>
                  </div>
                  <div className="mt-6 text-xs text-gray-400 font-mono">
                    Aggregated from CT Logs & DNS
                  </div>
                </div>

                {/* Primary Cloud / Takeover status */}
                <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-mono font-bold text-gray-500 uppercase tracking-wider mb-2">Primary Cloud/Host</h4>
                    <p className="text-white font-bold mt-4 font-mono text-sm leading-snug">{data.provider}</p>
                  </div>
                  <div className="mt-6 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs text-gray-400 font-mono">takeovers: {data.cnameTakeover}</span>
                  </div>
                </div>

              </div>

              {/* Found Subdomains Section */}
              <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-orange-500" />
                  Sample Subdomain Mapping Table (Demo)
                </h3>
                <p className="text-sm text-gray-400 mb-6">
                  Resolved subdomains discovered via passive certificate log parsing. These subdomains route directly to the core assets of {domain}.
                </p>
                <div className="overflow-x-auto rounded-xl border border-white/5 bg-black/40">
                  <table className="w-full text-left text-xs font-mono text-gray-400 border-collapse">
                    <thead>
                      <tr className="border-b border-white/5 bg-white/[0.02] text-white">
                        <th className="p-3">Hostname</th>
                        <th className="p-3">Resolved IP Address</th>
                        <th className="p-3">HTTP Status</th>
                        <th className="p-3">Asset Classification</th>
                        <th className="p-3">Network Operator</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {data.subdomainsList.map((sub, idx) => (
                        <tr key={idx} className="hover:bg-white/[0.01]">
                          <td className="p-3 font-semibold text-orange-400">{sub.name}</td>
                          <td className="p-3 text-gray-300">{sub.ip}</td>
                          <td className="p-3">
                            <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] ${
                              sub.status.startsWith('200') ? 'bg-emerald-500/10 text-emerald-400' :
                              sub.status.startsWith('3') ? 'bg-blue-500/10 text-blue-400' :
                              'bg-yellow-500/10 text-yellow-400'
                            }`}>
                              {sub.status}
                            </span>
                          </td>
                          <td className="p-3 text-gray-400">{sub.type}</td>
                          <td className="p-3 text-gray-500">{sub.provider}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* DNS Records Section */}
              <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Database className="w-5 h-5 text-orange-500" />
                  Authoritative DNS Zone Profile
                </h3>
                <p className="text-sm text-gray-400 mb-6">
                  DNS record configurations retrieved for the parent domain and primary sub-environments.
                </p>
                
                <div className="space-y-6">
                  
                  {/* A Records */}
                  <div>
                    <span className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest block mb-2">// Address (A) Records</span>
                    <div className="bg-black/30 border border-white/5 rounded-xl p-3 font-mono text-xs space-y-1.5">
                      {data.dns.A.map((rec, i) => (
                        <div key={i} className="flex justify-between items-center text-gray-300">
                          <span>{rec.host}</span>
                          <span className="text-gray-500">IN A</span>
                          <span className="text-orange-400">{rec.ip}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* MX Records */}
                  <div>
                    <span className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest block mb-2">// Mail Exchange (MX) Records</span>
                    <div className="bg-black/30 border border-white/5 rounded-xl p-3 font-mono text-xs space-y-1.5">
                      {data.dns.MX.map((rec, i) => (
                        <div key={i} className="flex justify-between items-center text-gray-300">
                          <span>{domain}</span>
                          <span className="text-gray-500">IN MX {rec.priority}</span>
                          <span className="text-orange-400">{rec.exchange}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* TXT Records */}
                  <div>
                    <span className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest block mb-2">// Text (TXT) Metadata Records</span>
                    <div className="bg-black/30 border border-white/5 rounded-xl p-3 font-mono text-xs space-y-1.5">
                      {data.dns.TXT.map((rec, i) => (
                        <div key={i} className="flex justify-between items-start text-gray-300 gap-4">
                          <span className="shrink-0">{domain}</span>
                          <span className="text-gray-500">IN TXT</span>
                          <span className="text-orange-400 break-all text-right">{rec.record}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* NS Records */}
                  <div>
                    <span className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest block mb-2">// Nameserver (NS) Authorities</span>
                    <div className="bg-black/30 border border-white/5 rounded-xl p-3 font-mono text-xs space-y-1.5">
                      {data.dns.NS.map((rec, i) => (
                        <div key={i} className="flex justify-between items-center text-gray-300">
                          <span>{domain}</span>
                          <span className="text-gray-500">IN NS</span>
                          <span className="text-orange-400">{rec.target}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

              {/* Cryptographic SSL/TLS Audit */}
              <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-orange-500" />
                  Cryptographic SSL/TLS Audit
                </h3>
                <p className="text-sm text-gray-400 mb-6">
                  Validates certificate authorities, cipher suites, expiration timeframes, and security configurations.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-black/40 p-4 rounded-xl border border-white/5">
                  <div className="space-y-3 font-mono text-xs text-gray-400">
                    <div>
                      <span className="block text-gray-500 text-[10px] uppercase">Certificate Authority (Issuer)</span>
                      <strong className="text-white text-sm">{data.ssl.issuer}</strong>
                    </div>
                    <div>
                      <span className="block text-gray-500 text-[10px] uppercase">Active Cipher Suite</span>
                      <strong className="text-white text-sm">{data.ssl.cipher}</strong>
                    </div>
                    <div>
                      <span className="block text-gray-500 text-[10px] uppercase">Key Size & Type</span>
                      <strong className="text-white text-sm">{data.ssl.keySize}</strong>
                    </div>
                  </div>

                  <div className="space-y-3 font-mono text-xs text-gray-400 border-t md:border-t-0 md:border-l border-white/5 pt-3 md:pt-0 md:pl-6">
                    <div>
                      <span className="block text-gray-500 text-[10px] uppercase">TLS Protocol Version Support</span>
                      <strong className="text-white text-sm">{data.ssl.protocols.join(', ')}</strong>
                    </div>
                    <div>
                      <span className="block text-gray-500 text-[10px] uppercase">Validity Period</span>
                      <strong className="text-white text-sm">{data.ssl.validFrom} to {data.ssl.validTo}</strong>
                    </div>
                    <div>
                      <span className="block text-gray-500 text-[10px] uppercase">Web SSL Security Grade</span>
                      <span className="inline-block bg-[#00ff88]/10 border border-[#00ff88]/20 text-[#00ff88] px-2 py-0.5 rounded font-bold text-sm mt-1">
                        {data.sslGrade}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Observations */}
              <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-orange-500" />
                  Key Security Observations
                </h3>
                <p className="text-sm text-gray-400 mb-6">
                  Diagnostic analysis of public configurations, mail security rules, and DNS hijack protection for {domain}.
                </p>

                <ul className="space-y-4 font-mono text-xs text-gray-300">
                  <li className="flex items-start gap-3 bg-black/20 p-3 rounded-lg border border-white/5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">DNSSEC Validation:</strong> {data.dnssec === 'Enabled' ? 'Authoritative DNSSEC validation is successfully enabled. Prevents cache poisoning.' : 'DNSSEC signatures not detected. Vulnerable to cache-poisoning redirection.'}
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-black/20 p-3 rounded-lg border border-white/5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">DMARC Compliance:</strong> DMARC policy configured: {data.dmarc}. Helps prevent spoofing attacks.
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-black/20 p-3 rounded-lg border border-white/5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">Sender Policy Framework (SPF):</strong> {data.spf}. Authorized mail servers explicitly listed.
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-black/20 p-3 rounded-lg border border-white/5">
                    {data.cnameTakeover === 'None Detected' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <strong className="text-white">CNAME Takeover Vulnerabilities:</strong> {data.cnameTakeover === 'None Detected' ? 'No dangling CNAME records pointing to decommissioned hosts detected.' : 'Warning: Found potential dangling CNAME records. Immediate verification is advised.'}
                    </div>
                  </li>
                </ul>
              </div>

              {/* CTA box */}
              <div className="p-8 rounded-2xl border border-orange-500/20 bg-gradient-to-br from-orange-500/5 to-transparent relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 blur-[100px] rounded-full pointer-events-none" />
                <h3 className="text-xl md:text-2xl font-bold mb-3 text-white">
                  Audit Subdomain Vulnerabilities in Real Time
                </h3>
                <p className="text-gray-400 mb-6 max-w-2xl leading-relaxed text-sm">
                  Run a real-time deep scan on the ReconShield live engine to query latest Certificate Transparency registries, active HTTP ports, and service headers for {domain}.
                </p>
                <Link href={`/tools/subdomain-finder?target=${domain}`}>
                  <span className="inline-flex items-center justify-center bg-orange-500 hover:bg-orange-500/90 text-black px-6 py-3 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)] cursor-pointer">
                    Scan {domain} Now
                  </span>
                </Link>
              </div>

            </div>

            {/* Right sidebar */}
            <div className="lg:col-span-1 space-y-6">
              
              {/* Informational context card */}
              <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0d1117] to-transparent border border-white/5 font-sans">
                <h3 className="text-sm font-mono font-bold text-gray-400 uppercase tracking-widest mb-4">Domain Analysis Context</h3>
                <p className="text-gray-400 text-xs leading-relaxed mb-4">
                  This page showcases a security snapshot of the external footprint of <strong>{domain}</strong> using passive OSINT datasets and DNS telemetry caches.
                </p>
                <ul className="space-y-2 text-xs text-gray-500 font-mono">
                  <li>- No active packets are sent to {domain}.</li>
                  <li>- SSL records verify PKI updates.</li>
                  <li>- Staging nodes map staging subdomains.</li>
                </ul>
              </div>

              {/* Related Tools */}
              <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0d1117] to-transparent border border-white/5 sticky top-24 font-sans">
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

          {/* Sibling Links */}
          <div className="pt-10 border-t border-white/5">
            <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wider">
              Other Indexed Domain Maps
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {KNOWN_DOMAINS
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
      </div>
    </>
  );
}
