import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Shield, Globe, Server, Activity, AlertTriangle, Cpu, Network, Target, Users, Search, ChevronRight } from 'lucide-react';

// Phase 11: Edge/ISR Configuration
export const revalidate = 86400; // Cache for 24 hours since Actor profiles change less frequently than IPs

// Mocked DB Call (Phase 2, 3, 4, 5)
async function getThreatActorIntelligence(slug) {
  const normalizedSlug = slug.toLowerCase();
  
  if (normalizedSlug === 'lazarus-group' || normalizedSlug === 'apt38') {
    return {
      name: 'Lazarus Group', aliases: ['APT38', 'Hidden Cobra', 'Zinc', 'Diamond Sleet'], origin: 'North Korea', sponsor: 'State-Sponsored (General Bureau)', activeSince: '2009',
      primaryMotivations: ['Espionage', 'Financial Theft', 'Data Destruction'], primaryTargets: ['Financial Institutions', 'Cryptocurrency Exchanges', 'Defense Contractors'],
      aiSummary: 'Lazarus Group (also known as APT38 or Hidden Cobra) is a highly sophisticated, state-sponsored advanced persistent threat (APT) originating from North Korea.',
      associatedMalware: ['WannaCry', 'AppleJeus', 'Brambul', 'Joanap', 'Fallchill'], associatedCVEs: ['CVE-2021-44228', 'CVE-2023-42793', 'CVE-2017-0144'],
      recentCampaigns: [{ date: '2025-11', name: 'Operation Dream Job' }, { date: '2024-03', name: 'Software Supply Chain Attacks via 3CX' }],
      mitreTactics: ['T1190 - Exploit Public-Facing Application', 'T1059 - Command and Scripting Interpreter', 'T1486 - Data Encrypted for Impact']
    };
  } else if (normalizedSlug === 'kimsuky') {
    return {
      name: 'Kimsuky', aliases: ['Velvet Chollima', 'Thallium', 'Black Banshee'], origin: 'North Korea', sponsor: 'State-Sponsored', activeSince: '2012',
      primaryMotivations: ['Espionage', 'Intelligence Gathering'], primaryTargets: ['Government', 'Think Tanks', 'Academia'],
      aiSummary: 'Kimsuky is a North Korean state-sponsored APT focused primarily on espionage and intelligence gathering targeting South Korean entities and global think tanks.',
      associatedMalware: ['AppleSeed', 'PebbleDash'], associatedCVEs: ['CVE-2021-44228'],
      recentCampaigns: [{ date: '2023-08', name: 'Targeting Joint US-South Korea Military Drills' }],
      mitreTactics: ['T1566 - Phishing', 'T1059 - Command and Scripting Interpreter']
    };
  } else if (normalizedSlug === 'nemesis-bear' || normalizedSlug === 'apt28') {
    return {
      name: 'Nemesis Bear', aliases: ['APT28', 'Fancy Bear', 'Sofacy'], origin: 'Russia', sponsor: 'State-Sponsored (GRU)', activeSince: '2004',
      primaryMotivations: ['Espionage', 'Political Interference'], primaryTargets: ['Government', 'Military', 'Media'],
      aiSummary: 'Nemesis Bear (APT28/Fancy Bear) is a Russian military intelligence (GRU) affiliated threat group known for cyber espionage and political interference campaigns.',
      associatedMalware: ['X-Agent', 'Zebrocy', 'Drovorub'], associatedCVEs: ['CVE-2023-44487', 'CVE-2021-44228'],
      recentCampaigns: [{ date: '2024-01', name: 'Targeting European Governments' }],
      mitreTactics: ['T1078 - Valid Accounts', 'T1110 - Brute Force']
    };
  } else if (normalizedSlug === 'unknown-proxies') {
    return {
      name: 'Unknown Proxies', aliases: ['Anonymous Infrastructure'], origin: 'Global', sponsor: 'Unknown', activeSince: 'Unknown',
      primaryMotivations: ['Obfuscation', 'Anonymity'], primaryTargets: ['Global Infrastructure'],
      aiSummary: 'Unknown proxies represent infrastructure utilized by threat actors to obfuscate their origin, complicating attribution and incident response.',
      associatedMalware: [], associatedCVEs: [],
      recentCampaigns: [],
      mitreTactics: ['T1090 - Proxy']
    };
  }
  
  return null; // Triggers 404
}

// Phase 10: Dynamic SEO & OpenGraph
export async function generateMetadata({ params }) {
  try {
    const resolvedParams = await params;
    const slug = resolvedParams?.slug;
    const intel = await getThreatActorIntelligence(slug);

    if (!intel) return { title: 'Not Found' };

    return {
      title: `${intel.name} (${intel.aliases[0]}) - Profile`,
      description: intel.aiSummary,
      alternates: { canonical: `https://reconshield.in/threat-actor/${slug}` },
      robots: { index: true, follow: true },
      openGraph: {
        title: `Intelligence Profile: ${intel.name}`,
        description: intel.aiSummary,
        type: 'article',
        url: `https://reconshield.in/threat-actor/${slug}`,
      },
      twitter: { card: 'summary_large_image' }
    };
  } catch (error) {
    return { title: 'Error' };
  }
}

// Phase 1: Semantic HTML5 Architecture
export default async function ThreatActorPage({ params }) {
  try {
    const resolvedParams = await params;
    const slug = resolvedParams?.slug;
    const intel = await getThreatActorIntelligence(slug);

    if (!intel) notFound();

  // Phase 9: AI/LLM Optimized JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article', // Schema.org does not have a specific 'ThreatActor' type yet
        headline: `Cybersecurity Profile: ${intel.name}`,
        description: intel.aiSummary,
        abstract: intel.aiSummary,
        author: { '@type': 'Organization', name: 'ReconShield Threat Research' },
        publisher: { '@type': 'Organization', name: 'ReconShield Security' },
        about: {
          '@type': 'Organization',
          name: intel.name,
          alternateName: intel.aliases,
          location: { '@type': 'Place', name: intel.origin }
        }
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://reconshield.in' },
          { '@type': 'ListItem', position: 2, name: 'Threat Actors', item: 'https://reconshield.in/threat-actor' },
          { '@type': 'ListItem', position: 3, name: intel.name, item: `https://reconshield.in/threat-actor/${slug}` },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: `Who is the ${intel.name} threat group?`,
            acceptedAnswer: { '@type': 'Answer', text: intel.aiSummary }
          },
          {
            '@type': 'Question',
            name: `What malware does ${intel.name} use?`,
            acceptedAnswer: { '@type': 'Answer', text: `${intel.name} is known to utilize ${intel.associatedMalware.join(', ')} in their campaigns.` }
          },
          {
            '@type': 'Question',
            name: `Where is ${intel.name} located?`,
            acceptedAnswer: { '@type': 'Answer', text: `${intel.name} originates from ${intel.origin} and is classified as ${intel.sponsor}.` }
          }
        ]
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="min-h-screen bg-[#06090e] pb-24 font-sans">
        <article itemScope itemType="https://schema.org/Article" className="max-w-[1200px] mx-auto px-6 pt-12">
          
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-xs font-mono text-[#8a9bb0]">
              <li><Link href="/" className="hover:text-[#00ff88] transition-colors">Home</Link></li>
              <li><ChevronRight className="w-3 h-3" /></li>
              <li><Link href="/blog" className="hover:text-[#00ff88] transition-colors">Threat Intel Blog</Link></li>
              <li><ChevronRight className="w-3 h-3" /></li>
              <li className="text-[#00ff88]">{intel.name}</li>
            </ol>
          </nav>

          {/* Phase 2: security incident Header */}
          <header className="mb-12 border-b border-[#1a2332] pb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="px-3 py-1 border border-[#ff3366] bg-[#ff3366]/10 rounded-full text-[10px] font-mono text-[#ff3366] uppercase tracking-[2px]">
                {intel.sponsor.split(' ')[0]} APT
              </div>
              <span className="font-mono text-xs text-[#8a9bb0]">Advanced Persistent Threat</span>
            </div>
            <h1 itemProp="headline" className="text-4xl md:text-6xl font-bold text-white mb-2 font-mono tracking-tight">
              {intel.name}
            </h1>
            <p className="text-[#94a3b8] font-mono text-sm uppercase tracking-wider flex items-center gap-2">
              <Globe className="w-4 h-4" /> Origin: {intel.origin} | Active Since: {intel.activeSince}
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-12">
              
              {/* Phase 3: AI Intelligence Summary */}
              <section aria-labelledby="ai-summary">
                <h2 id="ai-summary" className="font-mono text-xs tracking-[4px] uppercase text-[#00ff88] font-bold mb-4 flex items-center gap-2">
                  <Cpu className="w-4 h-4" /> // AI Dossier Summary
                </h2>
                <div className="bg-gradient-to-br from-[#0d1117] to-[#121822] border border-[#1a2332] rounded-xl p-6 relative overflow-hidden shadow-lg">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff3366]/5 blur-[80px] pointer-events-none" />
                  <p itemProp="abstract" className="text-[#e2e8f0] text-lg leading-relaxed font-sans relative z-10">
                    {intel.aiSummary}
                  </p>
                </div>
              </section>

              {/* Phase 4: Definition List Intelligence Block */}
              <section aria-labelledby="intel-details">
                <h2 id="intel-details" className="font-mono text-xs tracking-[4px] uppercase text-[#8a9bb0] font-bold mb-6 flex items-center gap-2">
                  <Search className="w-4 h-4" /> // Group Fingerprint
                </h2>
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { term: 'Primary Name', desc: intel.name },
                    { term: 'Known Aliases', desc: intel.aliases.join(', ') },
                    { term: 'State Sponsor', desc: intel.sponsor },
                    { term: 'Motivations', desc: intel.primaryMotivations.join(', ') },
                    { term: 'Primary Targets', desc: intel.primaryTargets.join(', ') },
                    { term: 'Active Since', desc: intel.activeSince }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-[#0d1117] border border-[#1a2332] p-4 rounded-lg flex flex-col justify-center">
                      <dt className="text-[10px] font-mono text-[#8a9bb0] uppercase tracking-[1px] mb-1">{item.term}</dt>
                      <dd className="text-sm text-white font-mono">{item.desc}</dd>
                    </div>
                  ))}
                </dl>
              </section>

              {/* Phase 6: Threat Analysis Engine */}
              <section aria-labelledby="threat-analysis">
                <h2 id="threat-analysis" className="font-mono text-xs tracking-[4px] uppercase text-[#ff3366] font-bold mb-6 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" /> // Tradecraft & Arsenal
                </h2>
                <div className="prose prose-invert max-w-none">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-[#0d1117] border border-[#1a2332] p-6 rounded-xl">
                      <h3 className="text-white text-base font-bold mt-0 mb-3 flex items-center gap-2">
                        <Target className="w-4 h-4 text-[#ffaa00]" /> Known Malware Arsenal
                      </h3>
                      <ul className="m-0 p-0 list-none space-y-2">
                        {intel.associatedMalware.map(malware => (
                          <li key={malware} className="flex items-center gap-2 text-sm text-[#94a3b8] font-mono">
                            <span className="w-2 h-2 rounded-full bg-[#ffaa00]" /> {malware}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-[#0d1117] border border-[#1a2332] p-6 rounded-xl">
                      <h3 className="text-white text-base font-bold mt-0 mb-3 flex items-center gap-2">
                        <Users className="w-4 h-4 text-[#ff3366]" /> Target Industries
                      </h3>
                      <ul className="m-0 p-0 list-none space-y-2">
                        {intel.primaryTargets.map(target => (
                          <li key={target} className="flex items-center gap-2 text-sm text-[#94a3b8] font-mono">
                            <Shield className="w-3 h-3 text-[#ff3366]" /> {target}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="bg-[#1a0f14] border border-[#ff3366]/20 p-6 rounded-xl mb-6">
                    <h3 className="text-[#ff3366] text-lg font-bold mt-0 mb-3">MITRE ATT&CK Mapping</h3>
                    <ul className="m-0 p-0 list-none space-y-3">
                      {intel.mitreTactics.map((tactic, idx) => {
                        const [id, name] = tactic.split(' - ');
                        return (
                          <li key={idx} className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-[#e2e8f0]">
                            <span className="font-mono text-[#ff3366] bg-[#ff3366]/10 px-2 py-0.5 rounded border border-[#ff3366]/30">{id}</span>
                            <span>{name}</span>
                          </li>
                        )
                      })}
                    </ul>
                  </div>

                </div>
              </section>
            </div>

            {/* Phase 5: Related Entity Graph (Sidebar) */}
            <aside className="lg:col-span-1 space-y-6">
              <div className="bg-[#0d1117] border border-[#1a2332] rounded-xl p-6 sticky top-24">
                <h2 className="font-mono text-[10px] tracking-[2px] uppercase text-[#8a9bb0] font-bold mb-6 flex items-center gap-2 border-b border-[#1a2332] pb-4">
                  <Network className="w-4 h-4" /> Graph Relationships
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xs text-[#e2e8f0] font-semibold mb-3">critical configuration risks (CVEs)</h3>
                    <ul className="space-y-2">
                      {intel.associatedCVEs.map(cve => (
                        <li key={cve}>
                          <Link href={`/cve/${cve.toLowerCase()}`} className="text-sm text-[#00ff88] hover:underline font-mono inline-flex items-center gap-2 bg-[#00ff88]/5 px-2 py-1 rounded border border-[#00ff88]/10 w-full transition-colors hover:bg-[#00ff88]/10">
                            {cve}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xs text-[#e2e8f0] font-semibold mb-3">Recent Campaigns</h3>
                    <ul className="space-y-3">
                      {intel.recentCampaigns.map((camp, idx) => (
                        <li key={idx} className="border-l-2 border-[#1a2332] pl-3 py-1">
                          <div className="text-[10px] font-mono text-[#8a9bb0] mb-1">{camp.date}</div>
                          <div className="text-sm text-[#e2e8f0] leading-snug">{camp.name}</div>
                        </li>
                      ))}
                    </ul>
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
    console.error("Threat Actor Page Error:", error);
    notFound();
  }
}
