import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Terminal, ShieldAlert, Server, Activity, ChevronRight, CheckCircle2, AlertTriangle } from 'lucide-react';
import { KNOWN_DOMAINS, KNOWN_IPS } from '@/lib/entityRegistry';
import SimulatedDataNotice from '@/components/SimulatedDataNotice';

export const dynamic = 'force-dynamic';


// Basic host check (domain or IP format)
const isValidHost = (host) => {
  const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
  const domainRegex = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/i;
  return ipRegex.test(host) || domainRegex.test(host);
};

// Pure function to determine consistent exposure score & open ports for a host
function calculatePortExposureScore(host) {
  let hash = 0;
  for (let i = 0; i < host.length; i++) {
    hash = host.charCodeAt(i) + ((hash << 5) - hash);
  }
  const score = Math.abs(hash) % 70 + 10; // Exposure score: 10 to 80
  const openPortsCount = Math.abs(hash * 3) % 4 + 2; // 2 to 5 open ports
  
  // Choose ports from standard known ports
  const possiblePorts = [
    { port: 21, service: 'FTP', risk: 'High', desc: 'File Transfer Protocol. Transmits credentials in plaintext.' },
    { port: 22, service: 'SSH', risk: 'Medium', desc: 'Secure Shell. Vulnerable to credential brute-forcing if exposed publicly.' },
    { port: 23, service: 'Telnet', risk: 'Critical', desc: 'Unencrypted remote management interface.' },
    { port: 25, service: 'SMTP', risk: 'Low', desc: 'Simple Mail Transfer Protocol. Used for outbound email routing.' },
    { port: 53, service: 'DNS', risk: 'Medium', desc: 'Domain Name System resolver. Vulnerable to amplification attacks.' },
    { port: 80, service: 'HTTP', risk: 'Low', desc: 'Hypertext Transfer Protocol. Plaintext web traffic.' },
    { port: 443, service: 'HTTPS', risk: 'Low', desc: 'Encrypted web traffic. Best practice standard.' },
    { port: 3306, service: 'MySQL', risk: 'High', desc: 'Database service port. Should not be exposed to the public internet.' },
    { port: 3389, service: 'RDP', risk: 'High', desc: 'Remote Desktop Protocol. Target for BlueKeep-style RCE and brute-forcing.' },
    { port: 5432, service: 'PostgreSQL', risk: 'High', desc: 'Database service port. Risk of database credential exposure.' },
    { port: 8080, service: 'HTTP-Proxy', risk: 'Medium', desc: 'Alternative web port, commonly used for staging or administrative dashboards.' }
  ];

  const selectedPorts = [];
  for (let i = 0; i < openPortsCount; i++) {
    const candidate = possiblePorts[Math.abs(hash * (i + 17)) % possiblePorts.length];
    if (!selectedPorts.some(p => p.port === candidate.port)) {
      selectedPorts.push(candidate);
    }
  }

  // Ensure port 80 or 443 exists for web-based domains
  if (host.includes('.') && !selectedPorts.some(p => p.port === 443 || p.port === 80)) {
    selectedPorts.push({ port: 443, service: 'HTTPS', risk: 'Low', desc: 'Encrypted web traffic. Best practice standard.' });
  }

  selectedPorts.sort((a, b) => a.port - b.port);

  let riskTier = 'Low';
  let color = 'text-emerald-400';
  let border = 'border-emerald-500/20';
  let bg = 'bg-emerald-500/10';
  let description = 'Minimal port exposure. Standard public ports (such as HTTP/HTTPS) are listening, with high-risk management ports isolated behind firewall filters.';

  if (score >= 35 && score < 60) {
    riskTier = 'Medium';
    color = 'text-yellow-400';
    border = 'border-yellow-500/20';
    bg = 'bg-yellow-500/10';
    description = 'Moderate port exposure. Database ports or management services (e.g. SSH) are open publicly. Ensure strict password policies and firewall filtering are applied.';
  } else if (score >= 60) {
    riskTier = 'High';
    color = 'text-red-400';
    border = 'border-red-500/20';
    bg = 'bg-red-500/10';
    description = 'Elevated port exposure. Unencrypted management endpoints (Telnet/FTP) or unprotected database structures are directly accessible from public IP addresses.';
  }

  return {
    score,
    riskTier,
    color,
    border,
    bg,
    description,
    openPorts: selectedPorts
  };
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const host = resolvedParams?.host?.toLowerCase();

  if (!host || !isValidHost(host)) {
    return { title: 'Invalid Report' };
  }

  const { score, riskTier } = calculatePortExposureScore(host);

  return {
    title: `Port Exposure & Vulnerability Report for ${host} - Exposure: ${score}/100`,
    description: `Public port scan and exposure mapping report for ${host}. Identifies listening ports, active banners, database exposures, and firewall alignment.`,
    alternates: {
      canonical: `https://reconshield.in/reports/ports/${host}`,
    },
    robots: { index: false, follow: true },
    openGraph: {
      url: `https://reconshield.in/reports/ports/${host}`,
      title: `${host} Port Exposure Report`,
      description: `Active listening port audit and exposure risk evaluation for ${host}.`,
      type: 'article',
      images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${host} Listening Service Map`,
      description: `Review open services, vulnerability metrics and risk levels.`,
      images: ['/og-image.png']
    }
  };
}

export default async function PortReportPage({ params }) {
  const resolvedParams = await params;
  const host = resolvedParams?.host?.toLowerCase();

  if (!host || !isValidHost(host)) {
    notFound();
  }

  const metrics = calculatePortExposureScore(host);

  // Structured Data
  const schemaJson = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TechArticle',
        '@id': `https://reconshield.in/reports/ports/${host}/#report`,
        headline: `Sample Network Port Exposure Audit (Demo) for ${host}`,
        description: `Automated listening service mapping and port security assessment (Illustrative Demo) for ${host}. Evaluates exposed services and banner configurations using simulated data.`,
        publisher: {
          '@type': 'Organization',
          name: 'ReconShield Threat Research'
        },
        url: `https://reconshield.in/reports/ports/${host}`
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://reconshield.in' },
          { '@type': 'ListItem', position: 2, name: 'Reports', item: 'https://reconshield.in/reports' },
          { '@type': 'ListItem', position: 3, name: `${host} Port Report`, item: `https://reconshield.in/reports/ports/${host}` },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: `What open ports were identified on ${host}?`,
            acceptedAnswer: { '@type': 'Answer', text: `The analysis identified ${metrics.openPorts.length} open ports: ${metrics.openPorts.map(p => `Port ${p.port} (${p.service})`).join(', ')}.` }
          },
          {
            '@type': 'Question',
            name: `How can ${host} reduce port exposure risk?`,
            acceptedAnswer: { '@type': 'Answer', text: `Close unused ports, bind database and management services to internal localhost loopback addresses only, and block public access using local firewalls (e.g. iptables or UFW).` }
          }
        ]
      }
    ]
  };

  const recommendations = [
    'Enforce local firewall filters (e.g., iptables, UFW, or cloud security groups) to block public access to database ports (3306, 5432, 27017).',
    'Decommission unencrypted protocols such as Telnet (port 23) and FTP (port 21). Replace them with SSH (port 22) or SFTP (port 22) configurations.',
    'Implement fail2ban or firewall rate-limiting rules on port 22 to block automated brute-forcing networks.',
    'Disable verbose banner configuration headers on web servers and SSH systems to prevent version leaks that facilitate exploit matching.'
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
              <li><span className="hover:text-[#00ff88] transition-colors">Ports</span></li>
              <li><ChevronRight className="w-3 h-3" /></li>
              <li className="text-[#00ff88]">{host}</li>
            </ol>
          </nav>

          {/* Report Title Banner */}
          <div className="border-b border-white/10 pb-8 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-[10px] font-mono text-purple-400 mb-4 uppercase tracking-widest">
              <Terminal className="w-3 h-3" />
              <span>Network Exposure Profile</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold font-display leading-tight mb-4 break-words">
              Sample Port Exposure Report (Demo) for <span className="text-[#00ff88]">{host}</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-3xl leading-relaxed">
              Mapped public network interfaces, active listening ports, software banner signatures, and associated firewall risks.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-10">
              
              <SimulatedDataNotice />

              {/* Summary Section */}
              <section className="p-8 rounded-2xl bg-[#0d1117] border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 blur-[100px] rounded-full pointer-events-none" />
                <h2 className="text-sm font-mono font-bold text-gray-400 uppercase tracking-widest mb-6">// SAMPLE EXECUTIVE SUMMARY (DEMO)</h2>
                
                <div className="flex flex-col md:flex-row items-center gap-8 mb-6">
                  <div className={`w-32 h-32 rounded-full border-4 flex flex-col items-center justify-center ${metrics.border} ${metrics.bg} ${metrics.color} shrink-0`}>
                    <span className="text-3xl font-black font-display tracking-tight">{metrics.score}</span>
                    <span className="text-[9px] font-mono uppercase tracking-widest mt-1">EXPOSURE SCORE</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Exposure Risk Level: {metrics.riskTier}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {metrics.description}
                    </p>
                  </div>
                </div>
                
                <div className="p-4 rounded-xl bg-black/40 border border-white/5 text-xs text-gray-500 flex items-start gap-3">
                  <ShieldAlert className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <div>
                    <strong>Exposure Vector Context:</strong> Higher exposure scores represent a larger attack surface. An adversary looking for weaknesses will scan these targets for unpatched service vulnerabilities.
                  </div>
                </div>
              </section>

              {/* Findings Section */}
              <section className="p-8 rounded-2xl bg-[#0d1117] border border-white/5">
                <h2 className="text-sm font-mono font-bold text-gray-400 uppercase tracking-widest mb-6">// LISTENING SERVICES IDENTIFIED</h2>
                
                <div className="space-y-4">
                  {metrics.openPorts.map((p, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-black/40 border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-white">Port {p.port}</span>
                          <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[9px] font-mono text-gray-400 uppercase">{p.service}</span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">{p.desc}</p>
                      </div>
                      <div className="shrink-0 flex items-center">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase ${
                          p.risk === 'Critical' ? 'bg-red-500/10 border border-red-500/20 text-rose-500' :
                          p.risk === 'High' ? 'bg-orange-500/10 border border-orange-500/20 text-orange-400' :
                          p.risk === 'Medium' ? 'bg-yellow-500/10 border border-yellow-500/20 text-yellow-400' :
                          'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                        }`}>
                          {p.risk} RISK
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Firewall Rule Generator Card */}
              <section className="p-8 rounded-2xl bg-[#0d1117] border border-white/5 space-y-4">
                <h2 className="text-sm font-mono font-bold text-gray-400 uppercase tracking-widest">// AUTOMATED FIREWALL REMEDIATION RULES</h2>
                <p className="text-xs text-gray-400 leading-relaxed font-sans">
                  Execute the following rules on your host shell to block external traffic to the flagged non-web ports.
                </p>
                <div className="space-y-3 font-mono text-[11px]">
                  <div className="space-y-1.5">
                    <span className="text-xs text-gray-500 uppercase tracking-wider font-bold"># UFW (Uncomplicated Firewall)</span>
                    <pre className="p-3 bg-black border border-white/5 rounded-xl text-cyan-400 select-all">
                      {metrics.openPorts
                        .filter(p => ![80, 443].includes(p.port))
                        .map(p => `sudo ufw deny ${p.port}/tcp`)
                        .join('\n') || '# No unencrypted management/database ports open. Boundary secure.'}
                    </pre>
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-xs text-gray-500 uppercase tracking-wider font-bold"># iptables (Standard Linux)</span>
                    <pre className="p-3 bg-black border border-white/5 rounded-xl text-cyan-400 select-all">
                      {metrics.openPorts
                        .filter(p => ![80, 443].includes(p.port))
                        .map(p => `sudo iptables -A INPUT -p tcp --dport ${p.port} -j DROP`)
                        .join('\n') || '# No unencrypted management/database ports open. Boundary secure.'}
                    </pre>
                  </div>
                </div>
              </section>

              {/* Recommendations Section */}
              <section className="p-8 rounded-2xl bg-[#0d1117] border border-white/5">
                <h2 className="text-sm font-mono font-bold text-gray-400 uppercase tracking-widest mb-6">// SECURITY REMEDIATION PLAN</h2>
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
                  {!/^(\d{1,3}\.){3}\d{1,3}$/.test(host) ? (
                    <>
                      <Link href={`/reports/ssl/${host}`} rel="nofollow" className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                        <div className="w-8 h-8 rounded-md bg-emerald-500/10 flex items-center justify-center text-[#00ff88] group-hover:bg-[#00ff88]/20">
                          <ShieldAlert className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white group-hover:text-[#00ff88] transition-colors">SSL Compliance Report</div>
                          <div className="text-xs text-gray-500">Test cryptographic strength</div>
                        </div>
                      </Link>

                      <Link href={`/reports/subdomains/${host}`} rel="nofollow" className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                        <div className="w-8 h-8 rounded-md bg-orange-500/10 flex items-center justify-center text-orange-400 group-hover:bg-orange-500/20">
                          <Activity className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white group-hover:text-orange-400 transition-colors">Subdomain Report</div>
                          <div className="text-xs text-gray-500">Map attack boundary</div>
                        </div>
                      </Link>

                      <Link href={`/dns-records/${host}`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                        <div className="w-8 h-8 rounded-md bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500/20">
                          <Server className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">DNS Records Profile</div>
                          <div className="text-xs text-gray-500">Audit DNS configurations</div>
                        </div>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link href={`/ip/${host}`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                        <div className="w-8 h-8 rounded-md bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500/20">
                          <Server className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">IP Intelligence Profile</div>
                          <div className="text-xs text-gray-500">Geolocation & ASN metadata</div>
                        </div>
                      </Link>

                      <Link href="/ports" className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                        <div className="w-8 h-8 rounded-md bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:bg-purple-500/20">
                          <Terminal className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white group-hover:text-purple-400 transition-colors">Ports Hub Directory</div>
                          <div className="text-xs text-gray-500">Explore standard port registry</div>
                        </div>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
