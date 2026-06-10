import React from 'react';
import Link from 'next/link';
import { Server, Search, Globe, ChevronRight, Clock, AlertTriangle, Shield, Database, Lock, Terminal } from 'lucide-react';
import { notFound } from 'next/navigation';

const isValidHost = (host) => {
  const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  const domainRegex = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/i;
  return ipRegex.test(host) || domainRegex.test(host);
};

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const host = resolvedParams?.host?.toLowerCase();

  if (!host || !isValidHost(host)) {
    return { title: 'Invalid Target Host' };
  }

  return {
    title: `${host} Open Ports Scan & Firewall Rule Diagnostics | ReconShield`,
    description: `Perform an online port scan check on ${host}. Scan common TCP ports (22, 80, 443, 8080), grab service banners, and diagnose firewall configurations.`,
    alternates: {
      canonical: `https://reconshield.in/tools/port-scanner/${host}`,
    },
    openGraph: {
      url: `https://reconshield.in/tools/port-scanner/${host}`,
      title: `${host} Open Ports Security Analysis`,
      description: `Active port scanner resolved services list, banner versions, and firewall exposures for ${host}.`,
      type: 'article',
      images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${host} External Port Scanner`,
      description: `Verify public-facing ports list and active service check profiles for ${host}.`,
      images: ['/og-image.png']
    }
  };
}

export default async function PortScannerIntelligencePage({ params }) {
  const resolvedParams = await params;
  const host = resolvedParams?.host?.toLowerCase();

  if (!host || !isValidHost(host)) {
    notFound();
  }

  const schemaJson = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TechArticle',
        '@id': `https://reconshield.in/tools/port-scanner/${host}/#article`,
        headline: `${host} Open Ports and External Service Analysis`,
        description: `Detailed verification of public-facing TCP ports and service banners for host ${host}.`,
        publisher: {
          '@type': 'Organization',
          name: 'ReconShield Security Research'
        },
        url: `https://reconshield.in/tools/port-scanner/${host}`
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://reconshield.in' },
          { '@type': 'ListItem', position: 2, name: 'Port Scanner', item: 'https://reconshield.in/tools/port-scanner' },
          { '@type': 'ListItem', position: 3, name: host, item: `https://reconshield.in/tools/port-scanner/${host}` },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: `How do I scan open ports on ${host}?`,
            acceptedAnswer: { '@type': 'Answer', text: `Use the ReconShield Port Scanner input form above to send connection probes to common ports on ${host} and verify their listening states.` }
          },
          {
            '@type': 'Question',
            name: `What is the risk of exposing databases on ${host}?`,
            acceptedAnswer: { '@type': 'Answer', text: `Exposing database ports (such as MySQL 3306 or PostgreSQL 5432) to the public internet makes them vulnerable to brute-force credential attacks and remote code exploitation.` }
          },
          {
            '@type': 'Question',
            name: `What does 'Filtered' mean for ports on ${host}?`,
            acceptedAnswer: { '@type': 'Answer', text: `'Filtered' indicates that connection probes were dropped by a firewall or router configuration protecting ${host}, preventing the scanner from determining if the port is open.` }
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
              <li><Link href="/tools/port-scanner" className="hover:text-[#00ff88] transition-colors">Port Scanner</Link></li>
              <li><ChevronRight className="w-3 h-3" /></li>
              <li className="text-[#00ff88]">{host}</li>
            </ol>
          </nav>

          <div className="border-b border-white/10 pb-8 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-[10px] font-mono text-red-400 mb-4 uppercase tracking-widest">
              <Terminal className="w-3 h-3" />
              <span>Exposure Intelligence</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Port Scanner Report for <span className="text-red-400 font-mono">{host}</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
              Scan TCP/IP connections, check for common open ports, verify service banner versions, and analyze external security postures.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-10">
              
              <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 blur-[100px] rounded-full pointer-events-none" />
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Server className="w-5 h-5 text-red-400" />
                  Active Port Scanner Probing
                </h2>
                
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6 mb-8 p-4 bg-black/40 rounded-xl border border-white/5">
                  <div>
                    <dt className="text-xs text-gray-500 font-mono mb-1 uppercase">Target Destination</dt>
                    <dd className="text-white font-bold break-all">{host}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-500 font-mono mb-1 uppercase">Port Scanning State</dt>
                    <dd className="text-gray-300 font-mono text-sm">Awaiting connection handshake...</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-500 font-mono mb-1 uppercase">Methodology</dt>
                    <dd className="text-gray-300 font-mono text-sm">TCP Connect Handshake</dd>
                  </div>
                </dl>

                <p className="text-sm text-gray-400 mb-6">
                  Initiate a real-time TCP port checker probe to identify open services and grab banner version headers for <strong>{host}</strong>.
                </p>
                
                <Link href={`/tools/port-scanner?target=${host}`} className="inline-flex items-center justify-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 px-6 py-3 rounded-xl font-bold transition-all">
                  <Search className="w-4 h-4" />
                  Perform Port Scan on {host}
                </Link>
              </div>

              <div className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-bold text-white uppercase tracking-wider mb-4 border-b border-white/5 pb-2">
                  Technical Analysis: Network Security Configuration for {host}
                </h2>
                <p className="text-gray-400 leading-relaxed">
                  Probing active ports on <strong>{host}</strong> provides an external layout of the running network services. An exposed port represents a boundary interface listening for input, which must be carefully audited to prevent data leakage and system exploitation.
                </p>

                <h3 className="text-xl font-bold text-white mt-8 mb-3">Service Identification and Risk Profiles</h3>
                <p className="text-gray-400 leading-relaxed">
                  Different listening applications carry distinct vulnerability risk profiles. For example, standard web ports (80/443) are expected on public hosts, while administration interfaces (22 for SSH, 3389 for RDP) should be protected by firewall rules restricting access to trusted IP ranges.
                </p>

                <h3 className="text-xl font-bold text-white mt-8 mb-3">The Significance of Service Banners</h3>
                <p className="text-gray-400 leading-relaxed">
                  When a connection is established, many servers reply with a welcoming banner (e.g. `SSH-2.0-OpenSSH_8.2p1`). Reading these banners (banner grabbing) allows auditors to document the exact software package and patch level, cross-referencing them with known CVE databases.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wider border-b border-white/5 pb-2">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {[
                    { q: `What ports are scanned by default on ${host}?`, a: `Our online scanner checks common web, administration, and database ports, including 21 (FTP), 22 (SSH), 23 (Telnet), 25 (SMTP), 53 (DNS), 80 (HTTP), 110 (POP3), 143 (IMAP), 443 (HTTPS), 3306 (MySQL), 3389 (RDP), and 8080 (HTTP-Alt).` },
                    { q: `How does a firewall affect scans on ${host}?`, a: `Firewalls block unauthorized traffic. If a firewall silently drops connection packets directed to a port, the scanner registers the port state as 'Filtered' after a connection timeout.` },
                    { q: `Is it legal to run port scans on ${host}?`, a: `Passive audits and querying public log details are safe. Active scans attempt connections on common ports to verify firewall states and should only be conducted on servers you own or have explicit permission to test.` }
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
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
