import React from 'react';
import Link from 'next/link';
import { 
  Server, Search, Globe, ChevronRight, Clock, AlertTriangle, 
  Shield, Database, Lock, Terminal, Activity, Info, CheckCircle2, Check, Network
} from 'lucide-react';
import { notFound } from 'next/navigation';
import SimulatedDataNotice from '@/components/SimulatedDataNotice';

export const dynamic = 'force-dynamic';

const isValidHost = (host) => {
  const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  const domainRegex = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/i;
  return ipRegex.test(host) || domainRegex.test(host);
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
    robots: { index: false, follow: true },
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

  // Generate deterministic report parameters based on the host domain or IP
  const seedRisk = getSeededValue(host, "risk") % 50 + 10; // Risk score 10-60
  const providers = ["Amazon Web Services", "Cloudflare Networks", "Google Cloud Infrastructure", "Microsoft Azure Cloud", "DigitalOcean LLC", "Linode LLC"];
  const provider = providers[getSeededValue(host, "provider") % providers.length];
  
  const allPorts = [
    { port: 21, service: "FTP", banner: "220-FileZilla Server 1.5.0", risk: "HIGH" },
    { port: 22, service: "SSH", banner: "SSH-2.0-OpenSSH_8.9p1 Ubuntu-3ubuntu0.1", risk: "MEDIUM" },
    { port: 23, service: "Telnet", banner: "Console login daemon", risk: "HIGH" },
    { port: 25, service: "SMTP", banner: "220 mail.local ESMTP Postfix", risk: "MEDIUM" },
    { port: 53, service: "DNS", banner: "BIND 9.18.12", risk: "LOW" },
    { port: 80, service: "HTTP", banner: "nginx/1.24.0", risk: "LOW" },
    { port: 443, service: "HTTPS", banner: "nginx/1.24.0 (SSL active)", risk: "LOW" },
    { port: 3306, service: "MySQL", banner: "8.0.33 MySQL Community Server", risk: "HIGH" },
    { port: 3389, service: "RDP", banner: "MS-RDP server endpoint", risk: "CRITICAL" },
    { port: 8080, service: "HTTP-Alt", banner: "Apache Tomcat/9.0.58", risk: "MEDIUM" }
  ];

  // Pick a random set of ports to show as open based on the seed
  const openCount = (getSeededValue(host, "open_count") % 3) + 2; // 2 to 4 open ports
  const indices = [];
  while (indices.length < openCount) {
    const idx = getSeededValue(host, `idx_${indices.length}`) % allPorts.length;
    if (!indices.includes(idx)) {
      indices.push(idx);
    }
  }
  const openPorts = indices.map(idx => allPorts[idx]).sort((a, b) => a.port - b.port);

  const schemaJson = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TechArticle',
        '@id': `https://reconshield.in/tools/port-scanner/${host}/#article`,
        headline: `Sample Port Scan Output (Illustrative) for ${host}`,
        description: `Demonstration of public-facing TCP ports and service banners for host ${host} using simulated data.`,
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
              
              <SimulatedDataNotice />
              
              {/* Dynamic Telemetry Audit Card */}
              <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 blur-[100px] rounded-full pointer-events-none" />
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Server className="w-5 h-5 text-red-400" />
                  Sample Port Scan Output (Illustrative)
                </h2>
                
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6 mb-8 p-4 bg-black/40 rounded-xl border border-white/5 font-sans">
                  <div>
                    <dt className="text-xs text-gray-500 font-mono mb-1 uppercase">Target Destination</dt>
                    <dd className="text-white font-bold break-all">{host}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-500 font-mono mb-1 uppercase">Methodology</dt>
                    <dd className="text-gray-300 font-mono text-sm">TCP Connect Handshake</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-500 font-mono mb-1 uppercase">Network Infrastructure</dt>
                    <dd className="text-white font-mono text-sm">{provider}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-500 font-mono mb-1 uppercase">Exposure Risk Score</dt>
                    <dd className={`font-mono text-sm font-bold ${seedRisk > 35 ? 'text-red-400' : 'text-yellow-400'}`}>
                      {seedRisk}/100
                    </dd>
                  </div>
                </dl>

                {/* Open Port List Preview */}
                <h3 className="text-sm font-bold font-mono text-gray-400 uppercase tracking-wider mb-3">// Example Discovered Open Port Profiles (Demo Data)</h3>
                <div className="bg-[#05080f] border border-white/5 rounded-xl p-4 font-mono text-xs text-gray-400 mb-6 space-y-3 max-h-60 overflow-y-auto">
                  {openPorts.map((pInfo, index) => (
                    <div key={index} className="pb-3 border-b border-white/[0.03] last:border-0 last:pb-0">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-red-400 font-bold">Port {pInfo.port} ({pInfo.service})</span>
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          pInfo.risk === 'CRITICAL' ? 'bg-red-500/10 text-red-400' :
                          pInfo.risk === 'HIGH' ? 'bg-orange-500/10 text-orange-400' :
                          pInfo.risk === 'MEDIUM' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-emerald-500/10 text-[#00ff88]'
                        }`}>{pInfo.risk} RISK</span>
                      </div>
                      <div className="text-gray-500 text-[10px] break-all">{pInfo.banner}</div>
                    </div>
                  ))}
                </div>

                <p className="text-sm text-gray-400 mb-6 font-sans">
                  Initiate a real-time TCP port checker probe to identify open services and grab banner version headers for <strong>{host}</strong>.
                </p>
                
                <Link href={`/tools/port-scanner?target=${host}`} className="inline-flex items-center justify-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 px-6 py-3 rounded-xl font-bold transition-all">
                  <Search className="w-4 h-4" />
                  Perform Port Scan on {host}
                </Link>
              </div>

              {/* Technical Analysis Section */}
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

              {/* FAQs */}
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
