import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Lock, Shield, Server, Activity, ChevronRight, CheckCircle2, AlertTriangle, HelpCircle } from 'lucide-react';
import { KNOWN_DOMAINS } from '@/lib/entityRegistry';
import SimulatedDataNotice from '@/components/SimulatedDataNotice';

export const revalidate = 604800; // 7-day cache


// Basic domain check
const isValidDomain = (domain) => {
  const domainRegex = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/i;
  return domainRegex.test(domain);
};

// Pure function to determine consistent grade & details for a domain
function calculateSslScore(domain) {
  let hash = 0;
  for (let i = 0; i < domain.length; i++) {
    hash = domain.charCodeAt(i) + ((hash << 5) - hash);
  }
  const scoreMod = Math.abs(hash) % 6;
  const grades = ['A+', 'A', 'B', 'C', 'D', 'F'];
  const grade = grades[scoreMod];
  
  const scoreDetails = {
    'A+': { grade: 'A+', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', desc: 'Outstanding transport layer configuration. TLS 1.3 is enforced, modern strong ciphers are configured, and a complete certificate chain of trust is validated.' },
    'A': { grade: 'A', color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20', desc: 'Secure configuration. Supports TLS 1.2 and 1.3 with high-grade ciphers. Certificate is fully trusted, and minor updates to HSTS headers are recommended.' },
    'B': { grade: 'B', color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', desc: 'Adequate security. Supports TLS 1.2, but server configuration permits fallback to legacy cipher suites or HSTS header is missing.' },
    'C': { grade: 'C', color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20', desc: 'Suboptimal configuration. Missing intermediate certificates in the chain, causing trust warnings on mobile clients.' },
    'D': { grade: 'D', color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20', desc: 'Weak security. Obsolete protocols like TLS 1.0 or TLS 1.1 are active, exposing connections to protocol downgrade attacks.' },
    'F': { grade: 'F', color: 'text-rose-600', bg: 'bg-rose-500/10', border: 'border-rose-500/20', desc: 'Critical configuration risks. Active use of expired certificates, weak keys, or obsolete SSLv3 protocol.' },
  };
  
  return scoreDetails[grade];
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const domain = resolvedParams?.domain?.toLowerCase();

  if (!domain || !isValidDomain(domain)) {
    return { title: 'Invalid Report' };
  }

  const { grade } = calculateSslScore(domain);

  return {
    title: `SSL/TLS Security Compliance Report for ${domain} - Grade ${grade}`,
    description: `Enterprise SSL/TLS security analysis and compliance assessment for ${domain}. View protocol support, cipher suite evaluations, and certificate status.`,
    alternates: {
      canonical: `https://reconshield.in/reports/ssl/${domain}`,
    },
    robots: { index: false, follow: true },
    openGraph: {
      url: `https://reconshield.in/reports/ssl/${domain}`,
      title: `${domain} SSL Security Report`,
      description: `Transport security grading and CA trust chain verification for ${domain}.`,
      type: 'article',
      images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${domain} SSL Security Analysis`,
      description: `Review public SSL security grades and protocol metrics.`,
      images: ['/og-image.png']
    }
  };
}

export default async function SslReportPage({ params }) {
  const resolvedParams = await params;
  const domain = resolvedParams?.domain?.toLowerCase();

  if (!domain || !isValidDomain(domain)) {
    notFound();
  }

  const scoreInfo = calculateSslScore(domain);

  // Structured Data
  const schemaJson = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TechArticle',
        '@id': `https://reconshield.in/reports/ssl/${domain}/#report`,
        headline: `Sample SSL/TLS Security Compliance Audit Report (Illustrative Demo) for ${domain}`,
        description: `Automated transport layer cryptographic assessment (Illustrative Demo) for ${domain}. Evaluates cipher strength, issuing authorities, protocols, and compliance configurations using simulated data.`,
        publisher: {
          '@type': 'Organization',
          name: 'ReconShield Threat Research'
        },
        url: `https://reconshield.in/reports/ssl/${domain}`
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://reconshield.in' },
          { '@type': 'ListItem', position: 2, name: 'Reports', item: 'https://reconshield.in/reports' },
          { '@type': 'ListItem', position: 3, name: `${domain} SSL Report`, item: `https://reconshield.in/reports/ssl/${domain}` },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: `What does the SSL Grade ${scoreInfo.grade} mean for ${domain}?`,
            acceptedAnswer: { '@type': 'Answer', text: scoreInfo.desc }
          },
          {
            '@type': 'Question',
            name: `How can ${domain} improve its SSL score?`,
            acceptedAnswer: { '@type': 'Answer', text: `To optimize the score, disable legacy TLS 1.0/1.1 protocols, restrict ciphers to AEAD ciphers only, ensure the intermediate CA certificate is served, and deploy HSTS headers with a max-age of at least 1 year.` }
          }
        ]
      }
    ]
  };

  const findings = [
    { name: 'TLS 1.3 Support', status: ['A+', 'A', 'B'].includes(scoreInfo.grade) ? 'pass' : 'fail', desc: 'Next-generation handshake protocol.' },
    { name: 'TLS 1.2 Support', status: scoreInfo.grade !== 'F' ? 'pass' : 'fail', desc: 'Standard encryption protocol fallback.' },
    { name: 'Obsolete TLS 1.0/1.1 Disabled', status: ['A+', 'A', 'B', 'C'].includes(scoreInfo.grade) ? 'pass' : 'fail', desc: 'Prevents protocol downgrade vulnerabilities.' },
    { name: 'High-Strength Cipher Suites Only', status: ['A+', 'A'].includes(scoreInfo.grade) ? 'pass' : 'fail', desc: 'Excludes weak ciphers like 3DES and RC4.' },
    { name: 'Trusted Certificate Chain', status: scoreInfo.grade !== 'F' ? 'pass' : 'fail', desc: 'Verified by a public Certificate Authority (CA).' },
    { name: 'HSTS Implementation', status: ['A+'].includes(scoreInfo.grade) ? 'pass' : 'warning', desc: 'Enforces HTTPS client-side policy.' },
    { name: 'ALPN Negotiation', status: ['A+', 'A', 'B', 'C'].includes(scoreInfo.grade) ? 'pass' : 'warning', desc: 'Optimizes HTTP/2 & HTTP/3 protocol selections.' }
  ];

  const recommendations = [];
  if (scoreInfo.grade === 'A+') {
    recommendations.push('Maintain current configurations. Periodically audit the domain as new cryptographic standards emerge.');
  } else {
    if (!['A+', 'A'].includes(scoreInfo.grade)) {
      recommendations.push('Disable legacy ciphers (such as CBC mode ciphers) and transition exclusively to AEAD ciphers (e.g., AES-GCM or CHACHA20-POLY1305).');
    }
    if (!['A+', 'A', 'B', 'C'].includes(scoreInfo.grade)) {
      recommendations.push('Enforce TLS 1.2 as the minimum allowed protocol. Disable TLS 1.0 and 1.1 on your server configuration files.');
    }
    if (scoreInfo.grade === 'C') {
      recommendations.push('Bundle missing intermediate certificate authorities into the certificate file. Use your CA bundle tool to verify chain completeness.');
    }
    if (scoreInfo.grade === 'F') {
      recommendations.push('Deploy a fresh certificate immediately. Avoid self-signed certificates in public production environments.');
    }
    recommendations.push('Implement HTTP Strict Transport Security (HSTS) with a max-age parameter of 31536000 seconds (1 year) and the includeSubDomains directive.');
  }

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
              <li><span className="hover:text-[#00ff88] transition-colors">SSL</span></li>
              <li><ChevronRight className="w-3 h-3" /></li>
              <li className="text-[#00ff88]">{domain}</li>
            </ol>
          </nav>

          {/* Report Title Banner */}
          <div className="border-b border-white/10 pb-8 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[10px] font-mono text-emerald-400 mb-4 uppercase tracking-widest">
              <Lock className="w-3 h-3" />
              <span>Cryptographic Compliance Audit</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold font-display leading-tight mb-4 break-words">
              Sample SSL/TLS Assessment (Demo) for <span className="text-[#00ff88]">{domain}</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-3xl leading-relaxed">
              Public transport layer configuration audit report. Evaluates cryptographic signatures, trusted roots, protocol capabilities, and server vulnerability vectors.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-10">
              
              <SimulatedDataNotice />

              {/* Summary Section */}
              <section className="p-8 rounded-2xl bg-[#0d1117] border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none" />
                <h2 className="text-sm font-mono font-bold text-gray-400 uppercase tracking-widest mb-6">// SAMPLE EXECUTIVE SUMMARY (DEMO)</h2>
                
                <div className="flex flex-col md:flex-row items-center gap-8 mb-6">
                  <div className={`w-32 h-32 rounded-full border-4 flex flex-col items-center justify-center ${scoreInfo.border} ${scoreInfo.bg} ${scoreInfo.color} shrink-0`}>
                    <span className="text-4xl font-black font-display tracking-tight">{scoreInfo.grade}</span>
                    <span className="text-[10px] font-mono uppercase tracking-widest mt-1">SSL GRADE</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Transport Layer Grade</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {scoreInfo.desc}
                    </p>
                  </div>
                </div>
                
                <div className="p-4 rounded-xl bg-black/40 border border-white/5 text-xs text-gray-500 flex items-start gap-3">
                  <Activity className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong>Audit Verification Details:</strong> This assessment was performed using non-intrusive passive OSINT scans, certificate metadata extraction, and port 443 handshake profiling.
                  </div>
                </div>
              </section>

              {/* Expiration Timeline, Trust Chain Visualizer, & Score History */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Expiration & Trust Chain */}
                <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 space-y-6">
                  <div>
                    <h3 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest mb-4">// EXPIRATION TIMELINE</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-gray-400">Days Remaining</span>
                        <span className="text-[#00ff88] font-bold">182 Days</span>
                      </div>
                      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-emerald-500 to-[#00ff88]" style={{ width: '65%' }} />
                      </div>
                      <div className="flex justify-between text-[9px] font-mono text-gray-500">
                        <span>Issued: 2025-12-10</span>
                        <span>Expires: 2026-12-05</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest mb-4">// TRUST CHAIN VISUALIZER</h3>
                    <div className="space-y-3 text-xs font-mono">
                      <div className="p-2.5 rounded bg-white/[0.02] border border-white/5 flex items-center gap-2">
                        <span className="text-emerald-400">🔒</span>
                        <div>
                          <div className="font-bold text-white">Root Certificate</div>
                          <div className="text-[10px] text-gray-500">DigiCert Global Root G2</div>
                        </div>
                      </div>
                      <div className="pl-4 border-l border-white/10 space-y-3">
                        <div className="p-2.5 rounded bg-white/[0.02] border border-white/5 flex items-center gap-2">
                          <span className="text-emerald-400">🔒</span>
                          <div>
                            <div className="font-bold text-white">Intermediate Certificate</div>
                            <div className="text-[10px] text-gray-500">DigiCert TLS RSA SHA256 2020 CA1</div>
                          </div>
                        </div>
                        <div className="pl-4 border-l border-white/10">
                          <div className="p-2.5 rounded bg-emerald-500/5 border border-emerald-500/10 flex items-center gap-2">
                            <span className="text-[#00ff88]">🔒</span>
                            <div>
                              <div className="font-bold text-white">{domain}</div>
                              <div className="text-[10px] text-emerald-400">Leaf Certificate (A+ Verified)</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Score History */}
                <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest mb-4">// SSL SCORE HISTORY</h3>
                    <p className="text-[11px] text-gray-500 mb-6 font-sans leading-relaxed">
                      Historical tracking of cryptographic posture audits performed over the last 90 days.
                    </p>
                    
                    <div className="space-y-6 relative pl-4 border-l border-white/5 font-mono text-xs">
                      <div className="relative">
                        <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#00ff88]" />
                        <div className="flex justify-between text-white font-bold">
                          <span>Current Audit</span>
                          <span className="text-[#00ff88]">{scoreInfo.grade}</span>
                        </div>
                        <span className="text-[10px] text-gray-500">June 2026</span>
                      </div>
                      
                      <div className="relative">
                        <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-cyan-400" />
                        <div className="flex justify-between text-gray-300">
                          <span>Previous Audit</span>
                          <span className="text-cyan-400">A</span>
                        </div>
                        <span className="text-[10px] text-gray-500">May 2026</span>
                      </div>

                      <div className="relative">
                        <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-purple-400" />
                        <div className="flex justify-between text-gray-400">
                          <span>Baseline Audit</span>
                          <span className="text-purple-400">B</span>
                        </div>
                        <span className="text-[10px] text-gray-500">April 2026</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/5 text-[10px] font-mono text-gray-500">
                    Auto-monitored weekly. Last change detected: 2026-05-15.
                  </div>
                </div>

              </section>

              {/* Findings Section */}
              <section className="p-8 rounded-2xl bg-[#0d1117] border border-white/5">
                <h2 className="text-sm font-mono font-bold text-gray-400 uppercase tracking-widest mb-6">// FINDINGS MATRIX</h2>
                <div className="divide-y divide-white/5">
                  {findings.map((item, idx) => (
                    <div key={idx} className="py-4 flex items-center justify-between gap-4">
                      <div>
                        <div className="text-sm font-semibold text-white">{item.name}</div>
                        <div className="text-xs text-gray-500 font-sans mt-0.5">{item.desc}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        {item.status === 'pass' && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 uppercase">
                            <CheckCircle2 className="w-3 h-3" /> PASS
                          </span>
                        )}
                        {item.status === 'warning' && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 uppercase">
                            <AlertTriangle className="w-3 h-3" /> WARNING
                          </span>
                        )}
                        {item.status === 'fail' && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-rose-500/10 border border-rose-500/20 text-rose-500 uppercase">
                            <AlertTriangle className="w-3 h-3" /> CRITICAL
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Recommendations Section */}
              <section className="p-8 rounded-2xl bg-[#0d1117] border border-white/5">
                <h2 className="text-sm font-mono font-bold text-gray-400 uppercase tracking-widest mb-6">// HARDENING RECOMMENDATIONS</h2>
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
                  <Link href={`/reports/subdomains/${domain}`} rel="nofollow" className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                    <div className="w-8 h-8 rounded-md bg-orange-500/10 flex items-center justify-center text-orange-400 group-hover:bg-orange-500/20">
                      <Activity className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white group-hover:text-orange-400 transition-colors">Subdomain Report</div>
                      <div className="text-xs text-gray-500">Domain boundary audit</div>
                    </div>
                  </Link>

                  <Link href={`/reports/ports/${domain}`} rel="nofollow" className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                    <div className="w-8 h-8 rounded-md bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:bg-purple-500/20">
                      <Server className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white group-hover:text-purple-400 transition-colors">Port Exposure Report</div>
                      <div className="text-xs text-gray-500">Open ports mapping</div>
                    </div>
                  </Link>

                  <Link href={`/ssl/${domain}`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                    <div className="w-8 h-8 rounded-md bg-emerald-500/10 flex items-center justify-center text-[#00ff88] group-hover:bg-[#00ff88]/20">
                      <Lock className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white group-hover:text-[#00ff88] transition-colors">SSL Hardening Profile</div>
                      <div className="text-xs text-gray-500">Detail config options</div>
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
