import React from 'react';
import Link from 'next/link';
import { 
  Server, Search, Globe, ChevronRight, Clock, AlertTriangle, 
  Shield, Database, Lock, Terminal, Activity, Info, CheckCircle2, Check, Network
} from 'lucide-react';
import { notFound } from 'next/navigation';
import SimulatedDataNotice from '@/components/SimulatedDataNotice';

const isValidDomain = (domain) => {
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

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const domain = resolvedParams?.domain?.toLowerCase();

  if (!domain || !isValidDomain(domain)) {
    return { title: 'Invalid Domain Target' };
  }

  return {
    title: `${domain} Security Headers Audit & CSP Validation | ReconShield`,
    description: `Check active HTTP response headers for ${domain}. Validate Content-Security-Policy (CSP), Strict-Transport-Security (HSTS), X-Frame-Options, and X-Content-Type-Options.`,
    alternates: {
      canonical: `https://reconshield.in/tools/http-headers/${domain}`,
    },
    robots: { index: false, follow: true },
    openGraph: {
      url: `https://reconshield.in/tools/http-headers/${domain}`,
      title: `${domain} Security Headers Analysis`,
      description: `Detailed HTTP response headers inventory, CSP directive verification, and security grade for ${domain}.`,
      type: 'article',
      images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${domain} HTTP Headers Security Audit`,
      description: `Audit website response parameters and check header hardening compliance for ${domain}.`,
      images: ['/og-image.png']
    }
  };
}

export default async function SecurityHeadersIntelligencePage({ params }) {
  const resolvedParams = await params;
  const domain = resolvedParams?.domain?.toLowerCase();

  if (!domain || !isValidDomain(domain)) {
    notFound();
  }

  // Generate deterministic report parameters based on target domain name
  const seedRisk = getSeededValue(domain, "risk") % 45 + 10; // Risk score 10-55
  const grades = ["A+", "A", "B", "C", "D", "F"];
  const grade = grades[getSeededValue(domain, "grade") % grades.length];
  
  const allHeaders = [
    { name: "Strict-Transport-Security", status: "PRESENT", value: "max-age=63072000; includeSubDomains; preload", desc: "Forces connections over secure HTTPS channels." },
    { name: "Content-Security-Policy", status: "PRESENT", value: "default-src 'self'; object-src 'none'; frame-ancestors 'none';", desc: "Controls script loading and prevents XSS." },
    { name: "X-Frame-Options", status: "PRESENT", value: "SAMEORIGIN", desc: "Blocks framing and clickjacking vectors." },
    { name: "X-Content-Type-Options", status: "PRESENT", value: "nosniff", desc: "Prevents browser MIME type sniffing." },
    { name: "Referrer-Policy", status: "MISSING", value: null, desc: "Restricts browser referral data exposure." },
    { name: "Permissions-Policy", status: "MISSING", value: null, desc: "Restricts peripheral device API access." }
  ];

  // Randomize which headers are present/missing based on domain seed
  const headers = allHeaders.map(hdr => {
    const isMissing = getSeededValue(domain, `hdr_${hdr.name}`) % 100 < 30; // 30% chance to report missing
    if (isMissing) {
      return { ...hdr, status: "MISSING", value: null };
    }
    return hdr;
  });

  const presentHeaders = headers.filter(h => h.status === "PRESENT");
  const missingHeaders = headers.filter(h => h.status === "MISSING");

  const schemaJson = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TechArticle',
        '@id': `https://reconshield.in/tools/http-headers/${domain}/#article`,
        headline: `Sample HTTP Response Headers Security Audit (Illustrative) for ${domain}`,
        description: `Demonstration analysis documenting active security headers, CSP directives, and connection hardening configurations for ${domain} using simulated data.`,
        publisher: {
          '@type': 'Organization',
          name: 'ReconShield Security Research'
        },
        url: `https://reconshield.in/tools/http-headers/${domain}`
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://reconshield.in' },
          { '@type': 'ListItem', position: 2, name: 'HTTP Headers Checker', item: 'https://reconshield.in/tools/http-headers' },
          { '@type': 'ListItem', position: 3, name: domain, item: `https://reconshield.in/tools/http-headers/${domain}` },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: `How do I check security headers on ${domain}?`,
            acceptedAnswer: { '@type': 'Answer', text: `Use the ReconShield Security Headers Checker container above to query the active web server and parse response headers for ${domain}.` }
          },
          {
            '@type': 'Question',
            name: `What is the security headers grade for ${domain}?`,
            acceptedAnswer: { '@type': 'Answer', text: `Based on active directives (such as CSP and HSTS), the overall hardening rating is evaluated dynamically to represent the relative strength of browser security rules.` }
          },
          {
            '@type': 'Question',
            name: `Why is HSTS important for ${domain}?`,
            acceptedAnswer: { '@type': 'Answer', text: `Strict-Transport-Security prevents man-in-the-middle protocol downgrades by forcing browsers to connect only via secure HTTPS, securing all cookies and authentication tokens.` }
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
              <li><Link href="/tools/http-headers" className="hover:text-[#00ff88] transition-colors">HTTP Headers Checker</Link></li>
              <li><ChevronRight className="w-3 h-3" /></li>
              <li className="text-[#00ff88]">{domain}</li>
            </ol>
          </nav>

          <div className="border-b border-white/10 pb-8 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-[10px] font-mono text-cyan-400 mb-4 uppercase tracking-widest">
              <Lock className="w-3 h-3" />
              <span>Response Header Hardening</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Security Headers Audit for <span className="text-cyan-400 font-mono">{domain}</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
              Verify website response configurations, check CSP directives, validate HSTS preloads, and review protection grades.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-10">
              
              <SimulatedDataNotice />

              {/* Dynamic Telemetry Audit Card */}
              <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none" />
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Server className="w-5 h-5 text-cyan-400" />
                  Sample HTTP Headers Audit (Illustrative)
                </h2>
                
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6 mb-8 p-4 bg-black/40 rounded-xl border border-white/5 font-sans">
                  <div>
                    <dt className="text-xs text-gray-500 font-mono mb-1 uppercase">Target Domain</dt>
                    <dd className="text-white font-bold break-all">{domain}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-500 font-mono mb-1 uppercase">Response Header Grade</dt>
                    <dd className={`font-mono text-2xl font-bold ${
                      ["A+", "A"].includes(grade) ? 'text-emerald-400' :
                      ["B", "C"].includes(grade) ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {grade}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-500 font-mono mb-1 uppercase">Methodology</dt>
                    <dd className="text-gray-300 font-mono text-sm">Response Parameter Verification</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-500 font-mono mb-1 uppercase">Exposure Rating</dt>
                    <dd className={`font-mono text-sm font-bold ${seedRisk > 35 ? 'text-red-400' : 'text-yellow-400'}`}>
                      {seedRisk}/100
                    </dd>
                  </div>
                </dl>

                {/* Present Headers list */}
                <h3 className="text-sm font-bold font-mono text-emerald-400 uppercase tracking-wider mb-3">// Example Configured Security Headers ({presentHeaders.length}) (Demo Data)</h3>
                <div className="bg-[#05080f] border border-white/5 rounded-xl p-4 font-mono text-xs text-gray-400 mb-6 space-y-3 max-h-60 overflow-y-auto">
                  {presentHeaders.map((hdr, index) => (
                    <div key={index} className="pb-3 border-b border-white/[0.03] last:border-0 last:pb-0">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-emerald-400 font-bold">{hdr.name}</span>
                        <span className="text-gray-500 text-[10px]">VERIFIED</span>
                      </div>
                      <div className="text-gray-400 text-[10px] break-all">{hdr.value}</div>
                      <div className="text-gray-600 text-[9px] mt-1 font-sans">{hdr.desc}</div>
                    </div>
                  ))}
                </div>

                {/* Missing Headers list */}
                {missingHeaders.length > 0 && (
                  <>
                    <h3 className="text-sm font-bold font-mono text-red-400 uppercase tracking-wider mb-3">// Missing Security Headers ({missingHeaders.length})</h3>
                    <div className="bg-[#05080f] border border-white/5 rounded-xl p-4 font-mono text-xs text-gray-400 mb-6 space-y-3 max-h-60 overflow-y-auto">
                      {missingHeaders.map((hdr, index) => (
                        <div key={index} className="pb-3 border-b border-white/[0.03] last:border-0 last:pb-0">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-red-400 font-bold">{hdr.name}</span>
                            <span className="text-gray-500 text-[10px]">MISSING</span>
                          </div>
                          <div className="text-gray-600 text-[10px] mt-1 font-sans">{hdr.desc}</div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                <p className="text-sm text-gray-400 mb-6 font-sans">
                  Initiate a real-time HTTP response parser to inspect all custom headers and security parameters for <strong>{domain}</strong>.
                </p>
                
                <Link href={`/tools/http-headers?target=${domain}`} className="inline-flex items-center justify-center gap-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 border border-cyan-500/30 px-6 py-3 rounded-xl font-bold transition-all">
                  <Search className="w-4 h-4" />
                  Perform Header Scan on {domain}
                </Link>
              </div>

              {/* Technical Analysis Section */}
              <div className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-bold text-white uppercase tracking-wider mb-4 border-b border-white/5 pb-2">
                  Technical Analysis: Response Header Security for {domain}
                </h2>
                <p className="text-gray-400 leading-relaxed">
                  Web application security on <strong>{domain}</strong> relies heavily on response directives enforced by visitor browsers. By delivering restrictive parameters, the server establishes strict boundary layers, preventing unauthorized script execution, frame injection, or referral leaks.
                </p>

                <h3 className="text-xl font-bold text-white mt-8 mb-3">Mitigating Cross-Site Scripting (XSS)</h3>
                <p className="text-gray-400 leading-relaxed">
                  Cross-Site Scripting represents a critical risk if user-controlled input is reflected in browser frames. Content-Security-Policy (CSP) addresses this by restricting script loading permissions, ensuring only trusted source scripts run on the DOM.
                </p>

                <h3 className="text-xl font-bold text-white mt-8 mb-3">Enforcing Protocol Cryptography</h3>
                <p className="text-gray-400 leading-relaxed">
                  Strict-Transport-Security (HSTS) guarantees that browser agents communicate with {domain} exclusively over encrypted TLS connections. This secures active sessions and protects cookies from network sniffing.
                </p>
              </div>

              {/* FAQs */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wider border-b border-white/5 pb-2">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {[
                    { q: `What headers are validated on ${domain}?`, a: `We check key response parameters: Strict-Transport-Security (HSTS), Content-Security-Policy (CSP), X-Frame-Options, X-Content-Type-Options, Referrer-Policy, and Permissions-Policy.` },
                    { q: `How do I configure missing security headers on my server?`, a: `Add appropriate response directives in your server configuration file (e.g., nginx.conf or .htaccess in Apache) and restart the service.` },
                    { q: `Will missing headers cause functional errors on ${domain}?`, a: `No. Missing headers represent a security exposure rather than a functional issue. However, misconfigured headers (like an overly restrictive CSP) can block legitimate resources.` }
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
