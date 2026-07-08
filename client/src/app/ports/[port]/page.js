import React from 'react';
import Link from 'next/link';
import { Server, Shield, Activity, ChevronRight, Lock, AlertTriangle, Globe, HelpCircle, FileText, Settings, ShieldCheck } from 'lucide-react';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import RelatedPorts from '@/components/entities/RelatedPorts';
import { generateDatasetSchema } from '@/utils/metadata';
import { PORTS_INTELLIGENCE } from '@/utils/portsIntelligenceData';

export const dynamic = 'force-dynamic'; // Replaced ISR with on-demand edge execution

// Basic port validation
const isValidPort = (portStr) => {
  const port = parseInt(portStr, 10);
  return !isNaN(port) && port >= 1 && port <= 65535;
};

// Fallback port definitions for dynamic queries not pre-registered in intelligence database
const PORT_DATA_FALLBACK = {
  21: { service: 'FTP', risk: 'High', protocol: 'TCP' },
  22: { service: 'SSH', risk: 'Medium', protocol: 'TCP' },
  23: { service: 'Telnet', risk: 'Critical', protocol: 'TCP' },
  25: { service: 'SMTP', risk: 'Medium', protocol: 'TCP' },
  53: { service: 'DNS', risk: 'Low', protocol: 'TCP/UDP' },
  80: { service: 'HTTP', risk: 'Low', protocol: 'TCP' },
  110: { service: 'POP3', risk: 'Medium', protocol: 'TCP' },
  143: { service: 'IMAP', risk: 'Medium', protocol: 'TCP' },
  443: { service: 'HTTPS', risk: 'Low', protocol: 'TCP' },
  587: { service: 'SMTP-SSL', risk: 'Medium', protocol: 'TCP' },
  3306: { service: 'MySQL', risk: 'High', protocol: 'TCP' },
  3389: { service: 'RDP', risk: 'Critical', protocol: 'TCP' },
  5432: { service: 'PostgreSQL', risk: 'High', protocol: 'TCP' },
  6379: { service: 'Redis', risk: 'Critical', protocol: 'TCP' },
  8080: { service: 'HTTP-Alt', risk: 'Medium', protocol: 'TCP' },
  27017: { service: 'MongoDB', risk: 'Critical', protocol: 'TCP' }
};



export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const port = resolvedParams?.port;

  if (!port || !isValidPort(port)) {
    return { title: 'Port Not Found' };
  }

  const intel = PORTS_INTELLIGENCE[port] || PORT_DATA_FALLBACK[port];
  if (!intel) {
    return { title: `Port ${port} Security Analysis` };
  }

  return {
    title: `Port ${port} (${intel.service}) Purpose, risks & Hardening Guide`,
    description: `Security analysis for network port ${port} (${intel.service}). Learn its purpose, default protocol, security vulnerabilities, CVE references, and firewall rules.`,
    alternates: {
      canonical: `https://reconshield.in/ports/${port}`,
    },
    robots: { index: true, follow: true },
    openGraph: {
      url: `https://reconshield.in/ports/${port}`,
      title: `Port ${port} (${intel.service}) Security Analysis`,
      description: `Review service details, CVE vulnerabilities, and hardening configurations for port ${port}.`,
      type: 'article',
      images: [{ url: '/og-image.png', width: 1200, height: 630 }]
    },
    twitter: {
      card: 'summary_large_image',
      title: `Port ${port} Security & Exposure Guide`,
      description: `Understand the threat footprint of port ${port}.`,
      images: ['/og-image.png']
    }
  };
}

export default async function PortIntelligencePage({ params }) {
  const resolvedParams = await params;
  const portStr = resolvedParams?.port;

  if (!portStr || !isValidPort(portStr)) {
    notFound();
  }

  const port = parseInt(portStr, 10);
  const intel = PORTS_INTELLIGENCE[port];
  const fallback = PORT_DATA_FALLBACK[port];

  // If we have neither, return 404
  if (!intel && !fallback) {
    notFound();
  }

  // Build uniform details using intelligence or fallback
  const details = {
    port,
    service: intel?.service || fallback.service,
    protocol: intel?.protocol || fallback.protocol,
    risk: intel?.risk || fallback.risk,
    purpose: intel?.purpose || `Port ${port} is registered for ${intel?.service || fallback.service} network communication.`,
    commonServices: intel?.commonServices || [],
    risks: intel?.risks || `Exposing port ${port} publicly increases attack surface. Ensure proper firewall filters and authentication checks are enforced.`,
    cves: intel?.cves || [],
    hardening: intel?.hardening || ['Restrict access to port using local firewall rules.', 'Disable standard passwords; use cryptographic authentication if supported.'],
    firewall: intel?.firewall || [`# UFW: Deny public access to port ${port}\nufw deny ${port}/tcp`]
  };

  // Structured schemas
  const schemaJson = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TechArticle',
        '@id': `https://reconshield.in/ports/${port}/#article`,
        headline: `Network Port ${port} (${details.service}) Security Analysis`,
        description: details.purpose,
        publisher: {
          '@type': 'Organization',
          name: 'ReconShield Threat Research'
        },
        url: `https://reconshield.in/ports/${port}`
      },
      generateDatasetSchema({
        name: `Port ${port} (${details.service}) Exposure & Security Data`,
        description: `Cybersecurity risk classification and defensive profiles for port ${port}.`,
        url: `https://reconshield.in/ports/${port}`,
        dateModified: new Date().toISOString()
      }),
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://reconshield.in' },
          { '@type': 'ListItem', position: 2, name: 'Ports Database', item: 'https://reconshield.in/ports' },
          { '@type': 'ListItem', position: 3, name: `Port ${port}`, item: `https://reconshield.in/ports/${port}` },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: `What service uses port ${port}?`,
            acceptedAnswer: { '@type': 'Answer', text: `Port ${port} is commonly designated for ${details.service} over the ${details.protocol} protocol.` }
          },
          {
            '@type': 'Question',
            name: `Is port ${port} considered high risk?`,
            acceptedAnswer: { '@type': 'Answer', text: `Port ${port} has a risk rating of ${details.risk}. Exposing database or remote shell management ports directly to the internet is a critical security risk.` }
          }
        ]
      }
    ]
  };

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
              <li><Link href="/ports" className="hover:text-[#00ff88] transition-colors">Ports Database</Link></li>
              <li><ChevronRight className="w-3 h-3" /></li>
              <li className="text-[#00ff88]">Port {port}</li>
            </ol>
          </nav>

          {/* Header */}
          <div className="border-b border-white/10 pb-8 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-[10px] font-mono text-red-400 mb-4 uppercase tracking-widest">
              <Server className="w-3 h-3" />
              <span>Port Intelligence Profile</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Port <span className="text-[#00ff88]">{port}</span>: {details.service}
            </h1>
            <p className="text-gray-400 text-lg max-w-3xl leading-relaxed">
              Analyze default service protocols, historical security vulnerabilities, hardening methods, and firewall rules for port {port}.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-10">
              
              {/* Port Summary Card */}
              <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 blur-[100px] rounded-full pointer-events-none" />
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                    <div className="text-[10px] text-gray-500 font-mono uppercase">Default Service</div>
                    <div className="text-white font-bold text-sm mt-1">{details.service}</div>
                  </div>
                  <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                    <div className="text-[10px] text-gray-500 font-mono uppercase">Protocol</div>
                    <div className="text-white font-bold text-sm mt-1">{details.protocol}</div>
                  </div>
                  <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                    <div className="text-[10px] text-gray-500 font-mono uppercase">Risk Level</div>
                    <div className={`font-bold text-sm mt-1 ${
                      details.risk === 'Critical' || details.risk === 'High' ? 'text-red-400' :
                      details.risk === 'Medium' ? 'text-yellow-400' : 'text-emerald-400'
                    }`}>{details.risk}</div>
                  </div>
                  <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                    <div className="text-[10px] text-gray-500 font-mono uppercase">Port Range</div>
                    <div className="text-white font-bold text-sm mt-1">System (1-1023)</div>
                  </div>
                </div>

                <div className="mt-6">
                  <Link href={`/tools/port-scanner?port=${port}`} className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 px-6 py-3 rounded-xl font-bold transition-all text-xs font-mono">
                    <Activity className="w-4 h-4" /> Run Port Scan Analysis
                  </Link>
                </div>
              </div>

              {/* Purpose Section */}
              <section className="space-y-4">
                <h2 className="text-xl font-bold text-white uppercase tracking-wider border-b border-white/5 pb-2">
                  1. Port Purpose & Usage
                </h2>
                <p className="text-gray-400 leading-relaxed text-sm">
                  {details.purpose}
                </p>

                {details.commonServices.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-xs font-mono font-bold text-gray-500 uppercase tracking-widest mb-3">Common Service Implementations</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {details.commonServices.map((srv, idx) => (
                        <div key={idx} className="p-4 rounded-xl bg-black/40 border border-white/5">
                          <div className="text-white font-bold text-xs">{srv.name}</div>
                          <p className="text-xs text-gray-500 mt-1 leading-relaxed">{srv.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>

              {/* Security Risks & CVEs */}
              <section className="space-y-4">
                <h2 className="text-xl font-bold text-white uppercase tracking-wider border-b border-white/5 pb-2">
                  2. Security Risks & Vulnerability Profiles
                </h2>
                <p className="text-gray-400 leading-relaxed text-sm">
                  {details.risks}
                </p>

                {details.cves.length > 0 && (
                  <div className="mt-4 space-y-3">
                    <h3 className="text-xs font-mono font-bold text-gray-500 uppercase tracking-widest mb-2">Historical CVE References</h3>
                    {details.cves.map((cve, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-red-500/5 border border-red-500/10 flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                          <span className="text-xs font-mono font-bold text-red-400">{cve.id}</span>
                        </div>
                        <p className="text-xs text-gray-400 leading-relaxed">{cve.desc}</p>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              {/* Hardening Guide */}
              <section className="space-y-4">
                <h2 className="text-xl font-bold text-white uppercase tracking-wider border-b border-white/5 pb-2">
                  3. Hardening & Mitigation Checklist
                </h2>
                <div className="space-y-3">
                  {details.hardening.map((item, idx) => (
                    <div key={idx} className="flex gap-3 text-sm text-gray-300 leading-relaxed">
                      <div className="w-5 h-5 rounded bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-mono font-bold text-[10px] shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <div>{item}</div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Firewall Examples */}
              <section className="space-y-4">
                <h2 className="text-xl font-bold text-white uppercase tracking-wider border-b border-white/5 pb-2">
                  4. Firewall Command Examples
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Use the following system configurations to restrict open port exposure on Linux hosts:
                </p>
                <div className="space-y-3">
                  {details.firewall.map((cmd, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-black border border-white/5 font-mono text-xs text-emerald-400 overflow-x-auto whitespace-pre">
                      {cmd}
                    </div>
                  ))}
                </div>
              </section>

            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0d1117] to-transparent border border-white/5 sticky top-24">
                <h3 className="text-sm font-mono font-bold text-gray-400 uppercase tracking-widest mb-6">Further Analysis</h3>
                
                <div className="space-y-3 mb-6">
                  <Link href={`/tools/ip-lookup`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                    <div className="w-8 h-8 rounded-md bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/20">
                      <Globe className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">IP Intelligence</div>
                      <div className="text-xs text-gray-500">Geolocate server IPs</div>
                    </div>
                  </Link>

                  <Link href={`/tools/ssl-checker`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                    <div className="w-8 h-8 rounded-md bg-green-500/10 flex items-center justify-center text-green-400 group-hover:bg-green-500/20">
                      <Lock className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Check SSL</div>
                      <div className="text-xs text-gray-500">Audit TLS configurations</div>
                    </div>
                  </Link>
                </div>

                <RelatedPorts currentPort={port} />
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
