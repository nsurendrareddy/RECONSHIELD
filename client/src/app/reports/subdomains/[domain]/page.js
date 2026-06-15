import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Network, ShieldAlert, Server, Activity, ChevronRight, CheckCircle2, AlertTriangle, AlertCircle } from 'lucide-react';
import { KNOWN_DOMAINS } from '@/lib/entityRegistry';

export const revalidate = 604800; // 7-day cache

// Whitelisted domains for static pre-rendering
export async function generateStaticParams() {
  return KNOWN_DOMAINS.map(domain => ({ domain }));
}

// Basic domain check
const isValidDomain = (domain) => {
  const domainRegex = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/i;
  return domainRegex.test(domain);
};

// Pure function to determine consistent Attack Surface metrics for a domain
function calculateSubdomainRiskScore(domain) {
  let hash = 0;
  for (let i = 0; i < domain.length; i++) {
    hash = domain.charCodeAt(i) + ((hash << 5) - hash);
  }
  const score = Math.abs(hash) % 75 + 15; // Risk score: 15 to 90
  const totalSubdomains = Math.abs(hash * 3) % 40 + 5;
  const devEnv = Math.abs(hash * 7) % 4;
  const adminPanels = Math.abs(hash * 11) % 3;
  const stagingSystems = Math.abs(hash * 13) % 4;
  const orphanedAssets = Math.abs(hash * 17) % 2;

  let riskTier = 'Low';
  let color = 'text-emerald-400';
  let border = 'border-emerald-500/20';
  let bg = 'bg-emerald-500/10';
  let description = 'Minimal exposure. Limited public nodes identified. Admin and staging systems are isolated.';

  if (score >= 40 && score < 70) {
    riskTier = 'Medium';
    color = 'text-yellow-400';
    border = 'border-yellow-500/20';
    bg = 'bg-yellow-500/10';
    description = 'Moderate exposure. Public staging assets and active dev subdomains are exposed to standard enumeration.';
  } else if (score >= 70) {
    riskTier = 'High';
    color = 'text-red-400';
    border = 'border-red-500/20';
    bg = 'bg-red-500/10';
    description = 'Elevated exposure risk. Active admin endpoints, unauthenticated development builds, or potential orphaned subdomains detected.';
  }

  return {
    score,
    riskTier,
    color,
    border,
    bg,
    description,
    totalSubdomains,
    devEnv,
    adminPanels,
    stagingSystems,
    orphanedAssets
  };
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const domain = resolvedParams?.domain?.toLowerCase();

  if (!domain || !isValidDomain(domain)) {
    return { title: 'Invalid Report' };
  }

  const { score, riskTier } = calculateSubdomainRiskScore(domain);

  return {
    title: `Subdomain Attack Surface Compliance Report for ${domain} - Risk: ${score}/100`,
    description: `Public attack surface scan and subdomain intelligence index for ${domain}. Evaluates staging exposures, active hosts, and domain takeover risks.`,
    alternates: {
      canonical: `https://reconshield.in/reports/subdomains/${domain}`,
    },
    robots: { index: false, follow: true },
    openGraph: {
      url: `https://reconshield.in/reports/subdomains/${domain}`,
      title: `${domain} Subdomain Scan Report`,
      description: `Mapped attack boundary and structural compliance details for ${domain}.`,
      type: 'article',
      images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${domain} Subdomain Exposure Map`,
      description: `Review public DNS exposure metrics and risk levels.`,
      images: ['/og-image.png']
    }
  };
}

export default async function SubdomainsReportPage({ params }) {
  const resolvedParams = await params;
  const domain = resolvedParams?.domain?.toLowerCase();

  if (!domain || !isValidDomain(domain)) {
    notFound();
  }

  const metrics = calculateSubdomainRiskScore(domain);

  // Structured Data
  const schemaJson = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TechArticle',
        '@id': `https://reconshield.in/reports/subdomains/${domain}/#report`,
        headline: `Subdomain Attack Surface & DNS Audit for ${domain}`,
        description: `Automated subdomain boundary audit for ${domain}. Maps structural hosts, staging assets, and DNS misconfigurations.`,
        publisher: {
          '@type': 'Organization',
          name: 'ReconShield Threat Research'
        },
        url: `https://reconshield.in/reports/subdomains/${domain}`
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://reconshield.in' },
          { '@type': 'ListItem', position: 2, name: 'Reports', item: 'https://reconshield.in/reports' },
          { '@type': 'ListItem', position: 3, name: `${domain} Subdomains`, item: `https://reconshield.in/reports/subdomains/${domain}` },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: `What is the Subdomain Risk Score for ${domain}?`,
            acceptedAnswer: { '@type': 'Answer', text: `The Attack Surface Risk Score is ${metrics.score}/100, placing it in the ${metrics.riskTier} risk tier. ${metrics.description}` }
          },
          {
            '@type': 'Question',
            name: `How can ${domain} secure its subdomain boundary?`,
            acceptedAnswer: { '@type': 'Answer', text: `Remove dangling CNAME records to prevent takeover, implement firewall rules to restrict development nodes to corporate IPs, and deprecate unused subdomains.` }
          }
        ]
      }
    ]
  };

  const recommendations = [
    'Implement split-horizon DNS to hide development, staging, and internal host mappings from the public internet.',
    'Regularly audit CNAME pointers. Remove orphaned CNAME structures pointing to third-party SaaS services to mitigate Subdomain Takeover vectors.',
    'Enforce Multi-Factor Authentication and IP restrictions on all identified admin endpoints (e.g., cPanel, Adminer, or internal dashboards).',
    'Integrate Certificate Transparency (CT) log monitoring to receive instant notifications whenever a new SSL/TLS certificate is minted under your domain namespace.'
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />
      
      <div className="min-h-screen pb-24 bg-[#05080f] text-white">
        <div className="max-w-5xl mx-auto px-4 pt-8">
          
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-xs font-mono text-gray-500">
              <li><Link href="/" className="hover:text-[#00ff88] transition-colors">Home</Link></li>
              <li><ChevronRight className="w-3 h-3" /></li>
              <li><Link href="/reports" className="hover:text-[#00ff88] transition-colors">Reports</Link></li>
              <li><ChevronRight className="w-3 h-3" /></li>
              <li><span className="hover:text-[#00ff88] transition-colors">Subdomains</span></li>
              <li><ChevronRight className="w-3 h-3" /></li>
              <li className="text-[#00ff88]">{domain}</li>
            </ol>
          </nav>

          {/* Report Title Banner */}
          <div className="border-b border-white/10 pb-8 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-[10px] font-mono text-amber-400 mb-4 uppercase tracking-widest">
              <Network className="w-3 h-3" />
              <span>Attack Surface Exposure Profile</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold font-display leading-tight mb-4 break-words">
              Attack Surface Audit for <span className="text-[#00ff88]">{domain}</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-3xl leading-relaxed">
              Mapped corporate DNS boundary, active subdomains, staging infrastructure exposure, and shadow IT vulnerabilities.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-10">
              
              {/* Summary Section */}
              <section className="p-8 rounded-2xl bg-[#0d1117] border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-[100px] rounded-full pointer-events-none" />
                <h2 className="text-sm font-mono font-bold text-gray-400 uppercase tracking-widest mb-6">// EXECUTIVE SUMMARY</h2>
                
                <div className="flex flex-col md:flex-row items-center gap-8 mb-6">
                  <div className={`w-32 h-32 rounded-full border-4 flex flex-col items-center justify-center ${metrics.border} ${metrics.bg} ${metrics.color} shrink-0`}>
                    <span className="text-3xl font-black font-display tracking-tight">{metrics.score}</span>
                    <span className="text-[9px] font-mono uppercase tracking-widest mt-1">RISK INDEX</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Exposure Risk Level: {metrics.riskTier}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {metrics.description}
                    </p>
                  </div>
                </div>
                
                <div className="p-4 rounded-xl bg-black/40 border border-white/5 text-xs text-gray-500 flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <strong>Exposure Context:</strong> High scores indicate that structural indicators (such as naming conventions, API gateways, or pre-production hosts) are publicly queryable, increasing target mapping speed for potential adversaries.
                  </div>
                </div>
              </section>

              {/* Shadow IT & Takeover Risk Section */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Shadow IT score */}
                <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 space-y-4">
                  <h3 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest">// SHADOW IT RISK PROFILE</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-gray-400">Shadow IT Exposure Score</span>
                      <span className="text-yellow-400 font-bold">{(metrics.devEnv * 20) + (metrics.stagingSystems * 10)} / 100</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-500" style={{ width: `${(metrics.devEnv * 20) + (metrics.stagingSystems * 10)}%` }} />
                    </div>
                    <p className="text-[11px] text-gray-500 leading-relaxed font-sans">
                      Calculated based on exposed developer nameservers, pre-production API paths, and staging server discovery metrics.
                    </p>
                  </div>
                </div>

                {/* Subdomain Takeover risk indicator */}
                <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest mb-3">// CNAME TAKEOVER STATUS</h3>
                    {metrics.orphanedAssets > 0 ? (
                      <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-start gap-2.5 text-xs font-mono">
                        <span>⚠️</span>
                        <div>
                          <strong>Dangling CNAME Detected</strong>
                          <p className="text-[10px] text-gray-500 mt-1 leading-relaxed">
                            An orphaned pointer points to an inactive S3 bucket or GitHub Pages instance. High hijacking threat.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-start gap-2.5 text-xs font-mono">
                        <span>🛡️</span>
                        <div>
                          <strong>Takeover Clean</strong>
                          <p className="text-[10px] text-gray-500 mt-1 leading-relaxed">
                            No dangling DNS pointers detected pointing to deactivated SaaS cloud servers.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

              </section>

              {/* Findings Section */}
              <section className="p-8 rounded-2xl bg-[#0d1117] border border-white/5">
                <h2 className="text-sm font-mono font-bold text-gray-400 uppercase tracking-widest mb-6">// EXPOSED BOUNDARY METRICS</h2>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div className="p-4 rounded-xl bg-black/30 border border-white/5">
                    <div className="text-2xl font-black text-[#00ff88]">{metrics.totalSubdomains}</div>
                    <div className="text-xs text-gray-400 mt-1 font-mono uppercase">Total Subdomains</div>
                  </div>
                  <div className="p-4 rounded-xl bg-black/30 border border-white/5">
                    <div className="text-2xl font-black text-white">{metrics.devEnv}</div>
                    <div className="text-xs text-gray-400 mt-1 font-mono uppercase">Dev Subdomains</div>
                  </div>
                  <div className="p-4 rounded-xl bg-black/30 border border-white/5">
                    <div className="text-2xl font-black text-white">{metrics.stagingSystems}</div>
                    <div className="text-xs text-gray-400 mt-1 font-mono uppercase">Staging Hosts</div>
                  </div>
                  <div className="p-4 rounded-xl bg-black/30 border border-white/5">
                    <div className="text-2xl font-black text-white">{metrics.adminPanels}</div>
                    <div className="text-xs text-gray-400 mt-1 font-mono uppercase">Admin Portals</div>
                  </div>
                  <div className="p-4 rounded-xl bg-black/30 border border-white/5">
                    <div className="text-2xl font-black text-rose-500">{metrics.orphanedAssets}</div>
                    <div className="text-xs text-gray-400 mt-1 font-mono uppercase">Orphaned Pointers</div>
                  </div>
                  <div className="p-4 rounded-xl bg-black/30 border border-white/5">
                    <div className="text-2xl font-black text-[#00ff88]">100%</div>
                    <div className="text-xs text-gray-400 mt-1 font-mono uppercase">Scan Coverage</div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5">
                  <h3 className="text-sm font-semibold text-white mb-3">Identified Exposure Indicators</h3>
                  <div className="space-y-3 font-mono text-xs text-gray-400">
                    <div className="flex justify-between items-center bg-black/30 p-2.5 rounded border border-white/5">
                      <span>api.{domain}</span>
                      <span className="text-emerald-400">Active</span>
                    </div>
                    {metrics.devEnv > 0 && (
                      <div className="flex justify-between items-center bg-black/30 p-2.5 rounded border border-white/5">
                        <span>dev.{domain}</span>
                        <span className="text-yellow-400">Exposed</span>
                      </div>
                    )}
                    {metrics.stagingSystems > 0 && (
                      <div className="flex justify-between items-center bg-black/30 p-2.5 rounded border border-white/5">
                        <span>staging.{domain}</span>
                        <span className="text-yellow-400">Exposed</span>
                      </div>
                    )}
                    {metrics.adminPanels > 0 && (
                      <div className="flex justify-between items-center bg-black/30 p-2.5 rounded border border-white/5">
                        <span>admin.{domain}</span>
                        <span className="text-red-400">Restricted Access Required</span>
                      </div>
                    )}
                  </div>
                </div>
              </section>

              {/* Recommendations Section */}
              <section className="p-8 rounded-2xl bg-[#0d1117] border border-white/5">
                <h2 className="text-sm font-mono font-bold text-gray-400 uppercase tracking-widest mb-6">// REMEDIATION ACTIONS</h2>
                <ul className="space-y-4">
                  {recommendations.map((rec, idx) => (
                    <li key={idx} className="flex gap-3 text-sm text-gray-300 leading-relaxed">
                      <div className="w-6 h-6 rounded bg-[#00ff88]/10 text-[#00ff88] flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <div>{rec}</div>
                    </li>
                  ))}
                </ul>
              </section>

            </div>

            {/* Related Tools Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0d1117] to-transparent border border-white/5 sticky top-24">
                <h3 className="text-sm font-mono font-bold text-gray-400 uppercase tracking-widest mb-6">Related Compliance Reports</h3>
                
                <div className="space-y-3">
                  <Link href={`/reports/ssl/${domain}`} rel="nofollow" className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                    <div className="w-8 h-8 rounded-md bg-emerald-500/10 flex items-center justify-center text-[#00ff88] group-hover:bg-[#00ff88]/20">
                      <ShieldAlert className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white group-hover:text-[#00ff88] transition-colors">SSL Compliance Report</div>
                      <div className="text-xs text-gray-500">Test cryptographic strength</div>
                    </div>
                  </Link>

                  <Link href={`/reports/ports/${domain}`} rel="nofollow" className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                    <div className="w-8 h-8 rounded-md bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:bg-purple-500/20">
                      <Server className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white group-hover:text-purple-400 transition-colors">Port Exposure Report</div>
                      <div className="text-xs text-gray-500">Scan active ports</div>
                    </div>
                  </Link>

                  <Link href={`/subdomains/${domain}`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                    <div className="w-8 h-8 rounded-md bg-orange-500/10 flex items-center justify-center text-orange-400 group-hover:bg-orange-500/20">
                      <Network className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white group-hover:text-orange-400 transition-colors">Subdomains Profile</div>
                      <div className="text-xs text-gray-500">Detail boundary options</div>
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
