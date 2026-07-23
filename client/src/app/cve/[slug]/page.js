import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Shield, Globe, Server, Activity, AlertTriangle, Cpu, Network, Lock, Search, FileCode2, ChevronRight } from 'lucide-react';
import { slugify } from '@/utils/slugify';
import { generateDatasetSchema } from '@/utils/metadata';


export const revalidate = false; // Cache forever (fully static)
export const dynamicParams = false; // No on-demand dynamic pages

// Mocked DB Call
async function getCveIntelligence(cveId) {
  const normalizedId = cveId.toUpperCase();
  
  if (normalizedId === 'CVE-2023-44487' || normalizedId === 'CVE-2021-44228' || normalizedId === 'CVE-2017-0144' || normalizedId === 'CVE-2023-42793') {
    const isLog4j = normalizedId === 'CVE-2021-44228';
    const isWannaCry = normalizedId === 'CVE-2017-0144';
    const isTeamCity = normalizedId === 'CVE-2023-42793';

    let title, description, aiSummary, affectedSoftware, relatedActors, cvss, severity, epss, cisaKev, publishedDate, activeExploitation, ransomwareUse, patchAvailable;

    if (isLog4j) {
      title = 'Log4Shell: Apache Log4j RCE';
      cvss = 10.0; epss = '97.4%'; severity = 'CRITICAL'; cisaKev = true; publishedDate = '2021-12-10';
      description = 'Apache Log4j2 JNDI features used in configuration, log messages, and parameters do not protect against unauthorized actor controlled LDAP and other JNDI related endpoints.';
      aiSummary = `ReconShield Intelligence identifies ${normalizedId} as a CRITICAL severity vulnerability actively exploited in the wild. Threat actors frequently utilize this vulnerability to achieve remote code execution (RCE).`;
      affectedSoftware = ['Apache Log4j 2.x']; relatedActors = ['Lazarus Group', 'Nemesis Bear']; activeExploitation = true; ransomwareUse = true; patchAvailable = true;
    } else if (isWannaCry) {
      title = 'EternalBlue SMB Remote Code Execution';
      cvss = 8.1; epss = '95.2%'; severity = 'HIGH'; cisaKev = true; publishedDate = '2017-03-16';
      description = 'The SMBv1 server in various Microsoft Windows versions mishandles specially crafted packets, allowing remote attackers to execute arbitrary code (EternalBlue).';
      aiSummary = `ReconShield Intelligence identifies ${normalizedId} as a HIGH severity vulnerability widely known as EternalBlue, heavily used in the WannaCry ransomware worm.`;
      affectedSoftware = ['Microsoft Windows (SMBv1)']; relatedActors = ['Lazarus Group']; activeExploitation = true; ransomwareUse = true; patchAvailable = true;
    } else if (isTeamCity) {
      title = 'JetBrains TeamCity Authentication Bypass';
      cvss = 9.8; epss = '93.1%'; severity = 'CRITICAL'; cisaKev = true; publishedDate = '2023-09-20';
      description = 'Authentication bypass in JetBrains TeamCity allows unauthenticated attackers to perform RCE and gain administrative control.';
      aiSummary = `ReconShield Intelligence identifies ${normalizedId} as a CRITICAL vulnerability in TeamCity used by state-sponsored actors to breach supply chains.`;
      affectedSoftware = ['JetBrains TeamCity']; relatedActors = ['Lazarus Group (Diamond Sleet)']; activeExploitation = true; ransomwareUse = true; patchAvailable = true;
    } else {
      title = 'HTTP/2 Rapid Reset Vulnerability';
      cvss = 7.5; epss = '65.2%'; severity = 'HIGH'; cisaKev = true; publishedDate = '2023-10-10';
      description = 'The HTTP/2 protocol allows a denial of service (server resource consumption) because request cancellation can reset many streams quickly.';
      aiSummary = `ReconShield Intelligence identifies ${normalizedId} as a HIGH severity vulnerability actively exploited for DDoS.`;
      affectedSoftware = ['Multiple HTTP/2 Implementations']; relatedActors = ['Unknown DDoS operators']; activeExploitation = true; ransomwareUse = false; patchAvailable = true;
    }

    return {
      id: normalizedId,
      title, cvss, epss, severity, cisaKev, publishedDate, description, aiSummary, affectedSoftware, relatedActors, activeExploitation, ransomwareUse, patchAvailable
    };
  }
  
  return null;
}

export async function generateStaticParams() {
  return [
    { slug: 'CVE-2023-44487' },
    { slug: 'CVE-2021-44228' },
    { slug: 'CVE-2017-0144' },
    { slug: 'CVE-2023-42793' }
  ];
}

// Phase 10: Dynamic SEO & OpenGraph
export async function generateMetadata({ params }) {
  try {
    const resolvedParams = await params;
    const cveId = resolvedParams?.slug?.toUpperCase();
    if (!cveId) return { title: 'CVE Not Found' };

    const intel = await getCveIntelligence(cveId);
    if (!intel) return { title: 'CVE Not Found' };

    return {
      title: `${intel.id} Vulnerability Analysis & abuse Intelligence`,
      description: intel.aiSummary,
      alternates: { canonical: `https://reconshield.in/cve/${cveId.toLowerCase()}` },
      robots: { index: true, follow: true },
      openGraph: {
        title: `${intel.id} - ${intel.severity} Vulnerability (CVSS: ${intel.cvss})`,
        description: intel.aiSummary,
        type: 'article',
        url: `https://reconshield.in/cve/${cveId.toLowerCase()}`,
        images: [{ url: '/og-image.png', width: 1200, height: 630 }],
      },
      twitter: { 
        card: 'summary_large_image',
        title: `${intel.id} - Vulnerability Intelligence`,
        description: intel.aiSummary,
        images: ['/og-image.png']
      }
    };
  } catch (error) {
    return { title: 'CVE Error' };
  }
}

// Phase 1: Semantic HTML5 Architecture
export default async function CveEntityPage({ params }) {
  try {
    const resolvedParams = await params;
    const cveId = resolvedParams?.slug?.toUpperCase();
    
    if (!cveId) notFound();

    const intel = await getCveIntelligence(cveId);
    if (!intel) notFound();

  // Phase 9: AI/LLM Optimized JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TechArticle',
        headline: `exposure intelligence: ${intel.id}`,
        description: intel.aiSummary,
        abstract: intel.aiSummary,
        author: { '@type': 'Organization', name: 'ReconShield Threat Research' },
        publisher: { '@type': 'Organization', name: 'ReconShield Security' },
        datePublished: intel.publishedDate
      },
      generateDatasetSchema({
        name: `${intel.id} Vulnerability Analysis & Exploit Intelligence Data`,
        description: `Vulnerability analysis and exploit intelligence dataset for ${intel.id} (${intel.title}). Contains CVSS rating of ${intel.cvss}, EPSS score of ${intel.epss}, CISA KEV listing status, and mitigation guidelines.`,
        url: `https://reconshield.in/cve/${intel.id.toLowerCase()}`,
        dateModified: new Date().toISOString()
      }),
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://reconshield.in' },
          { '@type': 'ListItem', position: 2, name: 'configuration risks', item: 'https://reconshield.in/cve' },
          { '@type': 'ListItem', position: 3, name: intel.id, item: `https://reconshield.in/cve/${intel.id.toLowerCase()}` },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: `What is ${intel.id}?`,
            acceptedAnswer: { '@type': 'Answer', text: intel.description }
          },
          {
            '@type': 'Question',
            name: `Is ${intel.id} actively exploited?`,
            acceptedAnswer: { '@type': 'Answer', text: intel.activeExploitation ? `Yes, ReconShield sensors observe active exploitation of ${intel.id} in the wild.` : `There is currently no widespread active exploitation observed for ${intel.id}.` }
          }
        ]
      }
    ]
  };

  const severityColor = intel.cvss >= 9.0 ? 'text-[#ff3366] border-[#ff3366]' 
                      : intel.cvss >= 7.0 ? 'text-[#ffaa00] border-[#ffaa00]' 
                      : 'text-[#00ff88] border-[#00ff88]';
  const severityBg = intel.cvss >= 9.0 ? 'bg-[#ff3366]/10' 
                   : intel.cvss >= 7.0 ? 'bg-[#ffaa00]/10' 
                   : 'bg-[#00ff88]/10';

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="min-h-screen bg-[#06090e] pb-24 font-sans">
        <article itemScope itemType="https://schema.org/TechArticle" className="max-w-[1200px] mx-auto px-6 pt-12">
          
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-xs font-mono text-[#8a9bb0]">
              <li><Link href="/" className="hover:text-[#00ff88] transition-colors">Home</Link></li>
              <li><ChevronRight className="w-3 h-3" /></li>
              <li><Link href="/tools/vulnerability-scanner" className="hover:text-[#00ff88] transition-colors">CVE Scanner</Link></li>
              <li><ChevronRight className="w-3 h-3" /></li>
              <li className="text-[#00ff88]">{intel.id}</li>
            </ol>
          </nav>

          {/* Phase 2: Vulnerability Header */}
          <header className="mb-12 border-b border-[#1a2332] pb-10">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`px-3 py-1 border rounded-full text-[10px] font-mono uppercase tracking-[2px] ${severityColor} ${severityBg}`}>
                    {intel.severity} Severity
                  </div>
                  {intel.cisaKev && (
                    <div className="px-3 py-1 border border-purple-500 bg-purple-500/10 rounded-full text-[10px] font-mono text-purple-400 uppercase tracking-[2px]">
                      CISA KEV Listed
                    </div>
                  )}
                </div>
                <h1 itemProp="headline" className="text-4xl md:text-5xl font-bold text-white mb-2 font-mono tracking-tight">
                  {intel.id}
                </h1>
                <p className="text-[#94a3b8] text-lg max-w-2xl mt-4 leading-relaxed">
                  {intel.title}
                </p>
              </div>

              {/* Scoring Widgets */}
              <div className="flex items-center gap-6 bg-[#0d1117] border border-[#1a2332] p-5 rounded-xl shadow-lg">
                <div>
                  <div className="text-[10px] font-mono text-[#8a9bb0] uppercase tracking-[1px] mb-1">CVSS v3.1</div>
                  <div className={`text-4xl font-black ${severityColor.split(' ')[0]}`}>{intel.cvss.toFixed(1)}</div>
                </div>
                <div className="h-12 w-[1px] bg-[#1a2332]" />
                <div>
                  <div className="text-[10px] font-mono text-[#8a9bb0] uppercase tracking-[1px] mb-1">EPSS Score</div>
                  <div className="text-2xl font-bold text-white">{intel.epss}</div>
                </div>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-12">
              
              {/* Phase 3: AI Intelligence Summary */}
              <section aria-labelledby="ai-summary">
                <h2 id="ai-summary" className="font-mono text-xs tracking-[4px] uppercase text-[#00ff88] font-bold mb-4 flex items-center gap-2">
                  <Cpu className="w-4 h-4" /> // AI abuse Summary
                </h2>
                <div className="bg-gradient-to-br from-[#0d1117] to-[#121822] border border-[#1a2332] rounded-xl p-6 relative overflow-hidden shadow-lg">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#00ff88]/5 blur-[80px] pointer-events-none" />
                  <p itemProp="abstract" className="text-[#e2e8f0] text-lg leading-relaxed font-sans relative z-10">
                    {intel.aiSummary}
                  </p>
                </div>
              </section>

              {/* NVD Description */}
              <section>
                <h2 className="font-mono text-xs tracking-[4px] uppercase text-[#8a9bb0] font-bold mb-4 flex items-center gap-2">
                  <FileCode2 className="w-4 h-4" /> // Technical Description
                </h2>
                <div className="prose prose-invert max-w-none text-[#94a3b8] leading-relaxed">
                  <p>{intel.description}</p>
                </div>
              </section>

              {/* Phase 4: Definition List Intelligence Block */}
              <section aria-labelledby="intel-details">
                <h2 id="intel-details" className="font-mono text-xs tracking-[4px] uppercase text-[#8a9bb0] font-bold mb-6 flex items-center gap-2">
                  <Search className="w-4 h-4" /> // Vulnerability Metadata
                </h2>
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { term: 'CVE Identifier', desc: intel.id },
                    { term: 'Published Date', desc: intel.publishedDate },
                    { term: 'Active Exploitation', desc: intel.activeExploitation ? 'Observed in the Wild' : 'None Observed' },
                    { term: 'Ransomware Usage', desc: intel.ransomwareUse ? 'Known Associations' : 'Unknown' },
                    { term: 'Patch Available', desc: intel.patchAvailable ? 'Yes' : 'No' }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-[#0d1117] border border-[#1a2332] p-4 rounded-lg flex flex-col justify-center">
                      <dt className="text-[10px] font-mono text-[#8a9bb0] uppercase tracking-[1px] mb-1">{item.term}</dt>
                      <dd className="text-sm text-white font-mono">{item.desc}</dd>
                    </div>
                  ))}
                </dl>
              </section>

            </div>

            {/* Phase 5: Related Entity Graph (Sidebar) */}
            <aside className="lg:col-span-1 space-y-6">
              <div className="bg-[#0d1117] border border-[#1a2332] rounded-xl p-6 sticky top-24">
                <h2 className="font-mono text-[10px] tracking-[2px] uppercase text-[#8a9bb0] font-bold mb-6 flex items-center gap-2 border-b border-[#1a2332] pb-4">
                  <Network className="w-4 h-4" /> abuse Graph
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xs text-[#e2e8f0] font-semibold mb-3">Threat Actors Using {intel.id}</h3>
                    <ul className="space-y-2">
                      {intel.relatedActors.map(actor => {
                        const safeSlug = slugify(actor);
                        if (!safeSlug || safeSlug.includes('(') || safeSlug.includes(' ')) return null;
                        return (
                        <li key={actor}>
                          <Link href={`/threat-actor/${safeSlug}`} className="text-sm text-[#ffaa00] hover:underline font-mono inline-flex items-center gap-2 bg-[#ffaa00]/5 px-2 py-1 rounded border border-[#ffaa00]/10 w-full transition-colors hover:bg-[#ffaa00]/10">
                            {actor}
                          </Link>
                        </li>
                        );
                      })}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xs text-[#e2e8f0] font-semibold mb-3">Affected Software</h3>
                    <ul className="space-y-2">
                      {intel.affectedSoftware.map(software => (
                        <li key={software} className="text-sm text-[#94a3b8] font-mono border-l-2 border-[#1a2332] pl-2 py-1">
                          {software}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xs text-[#e2e8f0] font-semibold mb-3">Action Center</h3>
                    <Link href={`/tools/vulnerability-scanner`} className="flex items-center gap-3 p-3 rounded-lg bg-[#1a2332]/50 hover:bg-[#1a2332] transition-colors border border-transparent hover:border-white/5 group">
                      <Shield className="w-4 h-4 text-[#00ff88] group-hover:scale-110 transition-transform" />
                      <span className="text-sm text-gray-300 group-hover:text-white transition-colors">Scan Infrastructure for {intel.id}</span>
                    </Link>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </article>
      </main>
    </>
  );
  } catch (error) {
    console.error("CVE Page Error:", error);
    notFound();
  }
}
