import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Shield, Globe, Server, Activity, AlertTriangle, Cpu, Network, Lock, Search, History, ChevronRight } from 'lucide-react';

// Phase 11: Edge/ISR Configuration
export const revalidate = 3600; // ISR cache invalidation every hour

// Mocked DB Call for demonstration of Phase 2, 3, 4, 5
async function getIpIntelligence(ip) {
  // In production, this would query Neo4j and ClickHouse via Redis cache
  // We use a mock response here to demonstrate the architecture
  return {
    ip,
    threatScore: 88,
    riskClassification: 'High Risk',
    asn: 51042,
    organization: 'HostKey B.V.',
    country: 'Netherlands',
    countryCode: 'NL',
    lastSeen: new Date().toISOString(),
    firstSeen: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    reverseDns: 'scanner-01.hostkey.nl',
    abuseConfidence: 95,
    infrastructureType: 'Data Center / Hosting',
    isTor: false,
    isProxy: true,
    aiSummary: `ReconShield Intelligence identifies ${ip} as high-risk scanner infrastructure associated with brute-force activity and mass port scanning targeting exposed RDP and SSH services. This IP is owned by HostKey B.V. (AS51042) and has a 95% abuse confidence score.`,
    openPorts: [22, 80, 443, 3389],
    malwareAssociations: ['Mirai Variant', 'Kinsing'],
    relatedCVEs: ['CVE-2023-44487', 'CVE-2021-44228'],
    relatedThreatActors: ['Kimsuky', 'Unknown Proxies'],
    timeline: [
      { date: '2026-05-20', event: 'Mass SSH Brute Force Detected' },
      { date: '2026-05-18', event: 'Added to Spamhaus DROP List' },
      { date: '2026-05-01', event: 'First Seen on ReconShield Sensors' }
    ]
  };
}

const isValidIP = (ip) => /^(\d{1,3}\.){3}\d{1,3}$/.test(ip) || /^([\da-fA-F]{1,4}:){7}[\da-fA-F]{1,4}$/.test(ip);

// Phase 10: Next.js SEO & OpenGraph Optimization
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const ip = resolvedParams?.ip;
  if (!ip || !isValidIP(ip)) return { title: 'Invalid IP Address' };

  const intel = await getIpIntelligence(ip);

  return {
    title: `${ip} Threat Intelligence & Risk Report | ReconShield`,
    description: intel.aiSummary,
    keywords: [`${ip}`, `ip ${ip}`, `${ip} threat intel`, `${ip} abuse check`, `${ip} blacklist`, `AS${intel.asn}`, intel.organization, `who owns ${ip}`],
    alternates: { canonical: `https://reconshield.in/ip/${ip}` },
    openGraph: {
      title: `${ip} - ${intel.riskClassification} (Score: ${intel.threatScore}/100)`,
      description: intel.aiSummary,
      type: 'article',
      url: `https://reconshield.in/ip/${ip}`,
    },
    twitter: { card: 'summary_large_image' }
  };
}

// Phase 1: Page Architecture & Semantic HTML5
export default async function IpEntityPage({ params }) {
  const resolvedParams = await params;
  const ip = resolvedParams?.ip;

  if (!ip || !isValidIP(ip)) notFound();
  
  const intel = await getIpIntelligence(ip);

  // Phase 9: Structured Data Generation
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AnalysisNewsArticle',
        headline: `Cybersecurity Intelligence Report for ${ip}`,
        description: intel.aiSummary,
        abstract: intel.aiSummary,
        author: { '@type': 'Organization', name: 'ReconShield Threat Research' },
        publisher: { '@type': 'Organization', name: 'ReconShield Security' },
        datePublished: intel.firstSeen,
        dateModified: intel.lastSeen,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://reconshield.in' },
          { '@type': 'ListItem', position: 2, name: 'Threat Intelligence', item: 'https://reconshield.in/threats' },
          { '@type': 'ListItem', position: 3, name: ip, item: `https://reconshield.in/ip/${ip}` },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: `Is IP ${ip} malicious or dangerous?`,
            acceptedAnswer: { '@type': 'Answer', text: intel.aiSummary }
          },
          {
            '@type': 'Question',
            name: `What ASN owns ${ip}?`,
            acceptedAnswer: { '@type': 'Answer', text: `${ip} is routed via AS${intel.asn}, owned by ${intel.organization}.` }
          },
          {
            '@type': 'Question',
            name: `Has ${ip} hosted malware?`,
            acceptedAnswer: { '@type': 'Answer', text: `Yes, ReconShield has observed associations with ${intel.malwareAssociations.join(', ')} on ${ip}.` }
          }
        ]
      },
      {
        '@type': 'Dataset',
        name: `Threat Data for ${ip}`,
        description: `Open ports, malware associations, and abuse history for ${ip}.`,
        keywords: [ip, 'Threat Intelligence', 'Port Scan']
      }
    ]
  };

  const severityColor = intel.threatScore > 80 ? 'text-[#ff3366] border-[#ff3366]' 
                      : intel.threatScore > 50 ? 'text-[#ffaa00] border-[#ffaa00]' 
                      : 'text-[#00ff88] border-[#00ff88]';
  const severityBg = intel.threatScore > 80 ? 'bg-[#ff3366]/10' 
                   : intel.threatScore > 50 ? 'bg-[#ffaa00]/10' 
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
              <li><Link href="/tools/ip-lookup" className="hover:text-[#00ff88] transition-colors">IP Lookup</Link></li>
              <li><ChevronRight className="w-3 h-3" /></li>
              <li className="text-[#00ff88]">{ip}</li>
            </ol>
          </nav>

          {/* Phase 2: Threat Intelligence Header */}
          <header className="mb-12 border-b border-[#1a2332] pb-10">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`px-3 py-1 border rounded-full text-[10px] font-mono uppercase tracking-[2px] ${severityColor} ${severityBg}`}>
                    {intel.riskClassification}
                  </div>
                  <span className="font-mono text-xs text-[#8a9bb0]">Threat Entity Node</span>
                </div>
                <h1 itemProp="headline" className="text-4xl md:text-6xl font-bold text-white mb-2 font-mono tracking-tight">
                  {ip}
                </h1>
                <p className="text-[#94a3b8] font-mono text-sm uppercase tracking-wider flex items-center gap-2">
                  <Server className="w-4 h-4" /> AS{intel.asn} — {intel.organization}
                </p>
              </div>

              {/* Threat Score Widget */}
              <div className="flex items-center gap-6 bg-[#0d1117] border border-[#1a2332] p-5 rounded-xl shadow-lg">
                <div>
                  <div className="text-[10px] font-mono text-[#8a9bb0] uppercase tracking-[1px] mb-1">Threat Score</div>
                  <div className={`text-4xl font-black ${severityColor.split(' ')[0]}`}>{intel.threatScore}<span className="text-xl text-[#8a9bb0]">/100</span></div>
                </div>
                <div className="h-12 w-[1px] bg-[#1a2332]" />
                <div>
                  <div className="text-[10px] font-mono text-[#8a9bb0] uppercase tracking-[1px] mb-1">Abuse Confidence</div>
                  <div className="text-2xl font-bold text-white">{intel.abuseConfidence}%</div>
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
                  <Cpu className="w-4 h-4" /> // AI Intelligence Summary
                </h2>
                <div className="bg-gradient-to-br from-[#0d1117] to-[#121822] border border-[#1a2332] rounded-xl p-6 relative overflow-hidden shadow-lg">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#00ff88]/5 blur-[80px] pointer-events-none" />
                  <p itemProp="abstract" className="text-[#e2e8f0] text-lg leading-relaxed font-sans relative z-10">
                    {intel.aiSummary}
                  </p>
                </div>
              </section>

              {/* Phase 4: Definition List Intelligence Block */}
              <section aria-labelledby="intel-details">
                <h2 id="intel-details" className="font-mono text-xs tracking-[4px] uppercase text-[#8a9bb0] font-bold mb-6 flex items-center gap-2">
                  <Search className="w-4 h-4" /> // Infrastructure Fingerprint
                </h2>
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { term: 'IP Address', desc: ip },
                    { term: 'Reverse DNS', desc: intel.reverseDns },
                    { term: 'ASN', desc: `AS${intel.asn}` },
                    { term: 'Organization', desc: intel.organization },
                    { term: 'Geolocation', desc: `${intel.country} (${intel.countryCode})` },
                    { term: 'Infra Type', desc: intel.infrastructureType },
                    { term: 'Proxy / VPN', desc: intel.isProxy ? 'Detected' : 'None' },
                    { term: 'Last Activity', desc: new Date(intel.lastSeen).toLocaleString() },
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
                  <AlertTriangle className="w-4 h-4" /> // Threat Analysis
                </h2>
                <div className="prose prose-invert max-w-none">
                  <div className="bg-[#1a0f14] border border-[#ff3366]/20 p-6 rounded-xl mb-6">
                    <h3 className="text-[#ff3366] text-lg font-bold mt-0 mb-3">Observed Scanner Behavior</h3>
                    <p className="text-[#e2e8f0]">
                      This node exhibits automated mass-scanning behaviors typical of botnets searching for vulnerable infrastructure. Target payloads indicate exploitation attempts for known remote code execution (RCE) vulnerabilities.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-[#0d1117] border border-[#1a2332] p-6 rounded-xl">
                      <h3 className="text-white text-base font-bold mt-0 mb-3">Open Ports & Services</h3>
                      <ul className="m-0 p-0 list-none space-y-2">
                        {intel.openPorts.map(port => (
                          <li key={port} className="flex items-center gap-2 text-sm text-[#94a3b8] font-mono">
                            <span className="w-2 h-2 rounded-full bg-[#00ff88]" /> Port {port}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-[#0d1117] border border-[#1a2332] p-6 rounded-xl">
                      <h3 className="text-white text-base font-bold mt-0 mb-3">Malware Associations</h3>
                      <ul className="m-0 p-0 list-none space-y-2">
                        {intel.malwareAssociations.map(malware => (
                          <li key={malware} className="flex items-center gap-2 text-sm text-[#94a3b8] font-mono">
                            <Shield className="w-3 h-3 text-[#ff3366]" /> {malware}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Phase 7: Historical Timeline */}
              <section aria-labelledby="historical-timeline">
                <h2 id="historical-timeline" className="font-mono text-xs tracking-[4px] uppercase text-[#8a9bb0] font-bold mb-6 flex items-center gap-2">
                  <History className="w-4 h-4" /> // Activity Timeline
                </h2>
                <div className="relative border-l border-[#1a2332] ml-3 space-y-8 pb-4">
                  {intel.timeline.map((event, idx) => (
                    <div key={idx} className="relative pl-6">
                      <div className="absolute -left-[5px] top-1.5 w-[9px] h-[9px] rounded-full bg-[#00ff88] ring-4 ring-[#06090e]" />
                      <div className="text-[10px] font-mono text-[#8a9bb0] uppercase tracking-[1px] mb-1">{event.date}</div>
                      <div className="text-sm text-[#e2e8f0]">{event.event}</div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Phase 8: AI-Optimized FAQ */}
              <section aria-labelledby="faq">
                <h2 id="faq" className="font-mono text-xs tracking-[4px] uppercase text-[#8a9bb0] font-bold mb-6">
                  // FREQUENTLY ASKED QUESTIONS
                </h2>
                <div className="space-y-4">
                  <div className="bg-[#0d1117] border border-[#1a2332] p-5 rounded-lg">
                    <h3 className="text-white font-semibold text-sm mb-2">Is {ip} malicious?</h3>
                    <p className="text-sm text-[#94a3b8] leading-relaxed">Based on ReconShield intelligence, {ip} is considered {intel.riskClassification.toLowerCase()} with a threat score of {intel.threatScore}/100 due to observed malicious activities including mass scanning.</p>
                  </div>
                  <div className="bg-[#0d1117] border border-[#1a2332] p-5 rounded-lg">
                    <h3 className="text-white font-semibold text-sm mb-2">Who hosts {ip}?</h3>
                    <p className="text-sm text-[#94a3b8] leading-relaxed">This IP is part of AS{intel.asn} and is allocated to {intel.organization}, operating primarily out of {intel.country}.</p>
                  </div>
                  <div className="bg-[#0d1117] border border-[#1a2332] p-5 rounded-lg">
                    <h3 className="text-white font-semibold text-sm mb-2">Are there known CVEs associated with this IP?</h3>
                    <p className="text-sm text-[#94a3b8] leading-relaxed">Yes, traffic originating from this IP has been correlated with exploitation attempts for {intel.relatedCVEs.join(', ')}.</p>
                  </div>
                </div>
              </section>
            </div>

            {/* Phase 5: Related Entity Graph (Sidebar) */}
            <aside className="lg:col-span-1 space-y-6">
              <div className="bg-[#0d1117] border border-[#1a2332] rounded-xl p-6 sticky top-24">
                <h2 className="font-mono text-[10px] tracking-[2px] uppercase text-[#8a9bb0] font-bold mb-6 flex items-center gap-2 border-b border-[#1a2332] pb-4">
                  <Network className="w-4 h-4" /> Knowledge Graph Links
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xs text-[#e2e8f0] font-semibold mb-3">Associated CVEs</h3>
                    <ul className="space-y-2">
                      {intel.relatedCVEs.map(cve => (
                        <li key={cve}>
                          <Link href={`/cve/${cve.toLowerCase()}`} className="text-sm text-[#00ff88] hover:underline font-mono inline-flex items-center gap-2 bg-[#00ff88]/5 px-2 py-1 rounded border border-[#00ff88]/10 w-full transition-colors hover:bg-[#00ff88]/10">
                            {cve}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xs text-[#e2e8f0] font-semibold mb-3">Threat Actors</h3>
                    <ul className="space-y-2">
                      {intel.relatedThreatActors.map(actor => (
                        <li key={actor}>
                          <Link href={`/threat-actor/${actor.toLowerCase().replace(' ', '-')}`} className="text-sm text-[#ffaa00] hover:underline font-mono inline-flex items-center gap-2 bg-[#ffaa00]/5 px-2 py-1 rounded border border-[#ffaa00]/10 w-full transition-colors hover:bg-[#ffaa00]/10">
                            {actor}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xs text-[#e2e8f0] font-semibold mb-3">Action Center</h3>
                    <div className="space-y-2">
                      <Link href={`/tools/port-scanner?target=${ip}`} className="flex items-center gap-3 p-3 rounded-lg bg-[#1a2332]/50 hover:bg-[#1a2332] transition-colors border border-transparent hover:border-white/5 group">
                        <Search className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                        <span className="text-sm text-gray-300 group-hover:text-white transition-colors">Run Live Port Scan</span>
                      </Link>
                      <Link href={`/tools/ssl-checker?target=${ip}`} className="flex items-center gap-3 p-3 rounded-lg bg-[#1a2332]/50 hover:bg-[#1a2332] transition-colors border border-transparent hover:border-white/5 group">
                        <Lock className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                        <span className="text-sm text-gray-300 group-hover:text-white transition-colors">Inspect SSL/TLS Certs</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </article>
      </main>
    </>
  );
}
