import Link from 'next/link';
import { 
  Shield, Target, Server, Lock, Terminal, 
  ChevronRight, Activity, Network, Search, 
  Globe, Key, Zap, Database, CheckCircle2 
} from 'lucide-react';

export const metadata = {
  title: "Cybersecurity Tools & Threat Intelligence Platform | ReconShield",
  description: "Enterprise suite of free cybersecurity tools. Perform attack surface analysis, OSINT reconnaissance, vulnerability scanning, and infrastructure intelligence.",
  keywords: [
    "cybersecurity tools", "threat intelligence platform", "OSINT tools", 
    "attack surface analysis", "cybersecurity reconnaissance tools", 
    "website security tools", "infrastructure intelligence tools",
    "network security tools", "free security scanners"
  ],
  alternates: {
    canonical: 'https://reconshield.in/tools',
  },
  openGraph: {
    title: "Cybersecurity Tools & Threat Intelligence Platform",
    description: "Enterprise suite of free cybersecurity tools. Perform attack surface analysis, OSINT reconnaissance, vulnerability scanning, and infrastructure intelligence.",
    url: 'https://reconshield.in/tools',
    type: 'website',
  }
};

export default function ToolsHubPage() {
  const faqs = [
    {
      q: "Are these cybersecurity tools completely free?",
      a: "Yes. ReconShield operates as a free, open-access threat intelligence platform. We believe enterprise-grade security tools should be accessible to all developers and researchers."
    },
    {
      q: "Is it legal to use these reconnaissance tools?",
      a: "Absolutely. All ReconShield tools operate passively. We aggregate data from global OSINT databases, public DNS registries, and passive header analysis without sending disruptive or malicious payloads to the target."
    },
    {
      q: "What is Attack Surface Analysis?",
      a: "Attack surface analysis is the process of mapping all exposed digital assets (domains, IPs, ports, headers) that an attacker could potentially exploit. Our tools automate this discovery phase."
    },
    {
      q: "How accurate is the threat intelligence platform?",
      a: "Our engine queries live, authoritative data sources (like regional internet registries and Let's Encrypt transparency logs) to ensure the intelligence provided is accurate in real-time."
    },
    {
      q: "Which cybersecurity tool should I start with?",
      a: "We recommend starting with the Website Vulnerability Scanner to get a broad overview of your web application's security posture, then pivoting to the Security Headers and SSL Checker for deep hardening."
    }
  ];

  return (
    <>
      {/* Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "CollectionPage",
                "@id": "https://reconshield.in/tools#collection",
                "name": "ReconShield Cybersecurity Tools Platform",
                "url": "https://reconshield.in/tools",
                "description": "A comprehensive suite of cybersecurity tools for OSINT and attack surface analysis."
              },
              {
                "@type": "BreadcrumbList",
                "@id": "https://reconshield.in/tools#breadcrumb",
                "itemListElement": [
                  { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://reconshield.in" },
                  { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://reconshield.in/tools" }
                ]
              },
              {
                "@type": "FAQPage",
                "@id": "https://reconshield.in/tools#faq",
                "mainEntity": faqs.map(faq => ({
                  "@type": "Question",
                  "name": faq.q,
                  "acceptedAnswer": { "@type": "Answer", "text": faq.a }
                }))
              }
            ]
          })
        }}
      />

      {/* 1. Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[#0a0d14] -z-20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-matrix-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />
        
        <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-center animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-900 border border-white/10 text-gray-400 text-xs font-mono uppercase tracking-widest mb-6 shadow-sm">
            <Zap className="w-4 h-4 text-matrix-400" />
            <span>Open Source Intelligence Hub</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-white mb-6 tracking-tight">
            Cybersecurity Tools & <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-matrix-400 via-cyan-400 to-blue-500">Threat Intelligence Platform</span>
          </h1>
          
          <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            Equip yourself with enterprise-grade <strong>cybersecurity reconnaissance tools</strong>. Perform massive <strong>attack surface analysis</strong>, enumerate infrastructure, and harden your defenses—all entirely free.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-gray-500 uppercase tracking-widest mb-16">
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-matrix-400" /> Passive Reconnaissance</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> Live OSINT Feeds</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400" /> Zero Registration</div>
          </div>
        </div>
      </section>

      <div className="bg-[#05080f]">
        
        <div className="max-w-[1200px] mx-auto px-6 py-20 space-y-32">

          {/* 2. Infrastructure Intelligence Tools */}
          <section>
            <div className="flex items-center gap-4 mb-10">
              <h2 className="text-2xl font-display font-bold text-white flex items-center gap-3">
                <Network className="w-6 h-6 text-cyan-400" /> Infrastructure Intelligence
              </h2>
              <div className="h-px flex-1 bg-gradient-to-r from-cyan-500/20 to-transparent" />
            </div>
            <p className="text-gray-400 mb-8 max-w-3xl">
              Map the underlying fabric of any target. Our <strong>infrastructure intelligence tools</strong> query global registries and DNS resolvers to unmask the technologies and policies powering a domain.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link href="/dns-lookup" className="relative group p-8 rounded-3xl bg-surface-900 border border-white/5 hover:border-cyan-500/30 transition-all overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-20 transition-opacity">
                  <Network className="w-32 h-32 text-cyan-500" />
                </div>
                <Network className="w-8 h-8 text-cyan-400 mb-6 relative z-10" />
                <h3 className="text-xl font-bold text-white mb-3 relative z-10">DNS Lookup & Security Analysis</h3>
                <p className="text-sm text-gray-400 leading-relaxed relative z-10">
                  Enumerate A, MX, TXT, and NS records instantly. Perform a deep security audit on your SPF and DMARC configurations to prevent domain spoofing and phishing.
                </p>
              </Link>

              <Link href="/whois" className="relative group p-8 rounded-3xl bg-surface-900 border border-white/5 hover:border-teal-500/30 transition-all overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-20 transition-opacity">
                  <Globe className="w-32 h-32 text-teal-500" />
                </div>
                <Globe className="w-8 h-8 text-teal-400 mb-6 relative z-10" />
                <h3 className="text-xl font-bold text-white mb-3 relative z-10">WHOIS Domain Intelligence</h3>
                <p className="text-sm text-gray-400 leading-relaxed relative z-10">
                  Query modern RDAP endpoints to discover domain ownership, registration dates, and perform infrastructure attribution analysis for threat hunting.
                </p>
              </Link>
            </div>
          </section>

          {/* 3. Web Security Analysis Tools */}
          <section>
            <div className="flex items-center gap-4 mb-10">
              <h2 className="text-2xl font-display font-bold text-white flex items-center gap-3">
                <Shield className="w-6 h-6 text-blue-400" /> Web Security Analysis
              </h2>
              <div className="h-px flex-1 bg-gradient-to-r from-blue-500/20 to-transparent" />
            </div>
            <p className="text-gray-400 mb-8 max-w-3xl">
              Harden your web applications against modern cyber attacks. These <strong>website security tools</strong> simulate how an attacker views your frontend defenses.
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Link href="/vulnerability-scanner" className="relative group p-8 rounded-3xl bg-surface-900 border border-white/5 hover:border-blue-500/30 transition-all">
                <Shield className="w-8 h-8 text-blue-400 mb-6" />
                <h3 className="text-lg font-bold text-white mb-3">Vulnerability Scanner</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Perform a massive passive scan to detect OWASP misconfigurations and attack vectors on your web server.
                </p>
              </Link>

              <Link href="/security-headers" className="relative group p-8 rounded-3xl bg-surface-900 border border-white/5 hover:border-amber-500/30 transition-all">
                <Lock className="w-8 h-8 text-amber-500 mb-6" />
                <h3 className="text-lg font-bold text-white mb-3">Security Headers Auditor</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Check your Content-Security-Policy (CSP) and HSTS headers to definitively defeat XSS and clickjacking attacks.
                </p>
              </Link>

              <Link href="/ssl-checker" className="relative group p-8 rounded-3xl bg-surface-900 border border-white/5 hover:border-purple-500/30 transition-all">
                <Key className="w-8 h-8 text-purple-400 mb-6" />
                <h3 className="text-lg font-bold text-white mb-3">SSL/TLS Crypto Checker</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Analyze cryptographic trust chains, monitor certificate expiration, and eliminate weak, vulnerable cipher suites.
                </p>
              </Link>
            </div>
          </section>

          {/* 4. Attack Surface & Reconnaissance Tools */}
          <section>
            <div className="flex items-center gap-4 mb-10">
              <h2 className="text-2xl font-display font-bold text-white flex items-center gap-3">
                <Target className="w-6 h-6 text-red-500" /> Attack Surface Reconnaissance
              </h2>
              <div className="h-px flex-1 bg-gradient-to-r from-red-500/20 to-transparent" />
            </div>
            <p className="text-gray-400 mb-8 max-w-3xl">
              Discover what you are exposing to the world. Use our <strong>OSINT tools</strong> to find shadow IT, forgotten endpoints, and vulnerable network services.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link href="/ip-scanner" className="relative group p-8 rounded-3xl bg-surface-900 border border-white/5 hover:border-matrix-500/30 transition-all overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-20 transition-opacity">
                  <Search className="w-32 h-32 text-matrix-500" />
                </div>
                <Search className="w-8 h-8 text-matrix-400 mb-6 relative z-10" />
                <h3 className="text-xl font-bold text-white mb-3 relative z-10">IP Reputation Intelligence</h3>
                <p className="text-sm text-gray-400 leading-relaxed relative z-10">
                  Cross-reference IP addresses against global threat feeds. Perform an ASN lookup, identify proxy/VPN usage, and assess IP risk scores.
                </p>
              </Link>

              <Link href="/port-scanner" className="relative group p-8 rounded-3xl bg-surface-900 border border-white/5 hover:border-red-500/30 transition-all overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-20 transition-opacity">
                  <Terminal className="w-32 h-32 text-red-500" />
                </div>
                <Terminal className="w-8 h-8 text-red-500 mb-6 relative z-10" />
                <h3 className="text-xl font-bold text-white mb-3 relative z-10">TCP Port Scanner</h3>
                <p className="text-sm text-gray-400 leading-relaxed relative z-10">
                  Scan for open TCP ports to map your network boundaries. Identify inadvertently exposed services like SSH, RDP, or databases instantly.
                </p>
              </Link>
            </div>
          </section>

          {/* 5. OSINT Education & 6. AI Intelligence */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 border-t border-white/5 pt-20">
            <div className="prose prose-invert max-w-none prose-p:text-gray-400">
              <h2 className="text-3xl font-display font-bold text-white mb-6">OSINT & Threat Intelligence Education</h2>
              <p>
                A <strong>threat intelligence platform</strong> is only as good as the analyst using it. Open Source Intelligence (OSINT) is the methodology of gathering data from publicly available sources to be used in an intelligence context. 
              </p>
              <p>
                ReconShield operates entirely on passive OSINT principles. Whether you are performing a <strong>WHOIS lookup</strong> to trace a phishing domain back to a registrar, or using our <strong>IP Scanner</strong> to see if an IP has been flagged for brute-force attacks, our tools automate the heavy lifting of data collection.
              </p>
            </div>

            <div className="prose prose-invert max-w-none prose-p:text-gray-400">
              <h2 className="text-3xl font-display font-bold text-white mb-6">AI Cybersecurity Intelligence</h2>
              <p>
                The volume of data generated by an <strong>attack surface analysis</strong> is staggering. To combat alert fatigue, ReconShield is evolving to integrate <strong>AI cybersecurity intelligence</strong>. 
              </p>
              <p>
                By applying machine learning algorithms to the telemetry gathered by our <strong>cybersecurity tools</strong>, we can automatically prioritize risks—differentiating between a low-level missing security header and a critical exposed database port. This allows security teams to focus on remediation rather than data triage.
              </p>
            </div>
          </section>

          {/* 7. Tool Comparison Grid */}
          <section className="pt-10">
            <h2 className="text-3xl font-display font-bold text-white mb-10 text-center">Tool Capability Matrix</h2>
            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0d1117]">
              <table className="w-full text-left text-sm text-gray-400">
                <thead className="bg-[#1a2332] text-white font-mono uppercase text-xs tracking-wider">
                  <tr>
                    <th className="p-4">Tool</th>
                    <th className="p-4">Primary Use Case</th>
                    <th className="p-4">Security Layer</th>
                    <th className="p-4 text-center">Passive</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr className="hover:bg-white/[0.02]">
                    <td className="p-4 font-bold text-matrix-400">IP Scanner</td>
                    <td className="p-4">Threat Feed Reputation & ASN</td>
                    <td className="p-4">Network Layer</td>
                    <td className="p-4 text-center"><CheckCircle2 className="w-4 h-4 mx-auto text-green-500" /></td>
                  </tr>
                  <tr className="hover:bg-white/[0.02]">
                    <td className="p-4 font-bold text-cyan-400">DNS Lookup</td>
                    <td className="p-4">SPF/DMARC Email Security</td>
                    <td className="p-4">Infrastructure Layer</td>
                    <td className="p-4 text-center"><CheckCircle2 className="w-4 h-4 mx-auto text-green-500" /></td>
                  </tr>
                  <tr className="hover:bg-white/[0.02]">
                    <td className="p-4 font-bold text-amber-500">Security Headers</td>
                    <td className="p-4">CSP & XSS Prevention</td>
                    <td className="p-4">Application Layer</td>
                    <td className="p-4 text-center"><CheckCircle2 className="w-4 h-4 mx-auto text-green-500" /></td>
                  </tr>
                  <tr className="hover:bg-white/[0.02]">
                    <td className="p-4 font-bold text-red-500">Port Scanner</td>
                    <td className="p-4">Exposed Service Discovery</td>
                    <td className="p-4">Transport Layer</td>
                    <td className="p-4 text-center"><CheckCircle2 className="w-4 h-4 mx-auto text-green-500" /></td>
                  </tr>
                  <tr className="hover:bg-white/[0.02]">
                    <td className="p-4 font-bold text-purple-400">SSL Checker</td>
                    <td className="p-4">Crypto Configuration Audit</td>
                    <td className="p-4">Transport Layer (TLS)</td>
                    <td className="p-4 text-center"><CheckCircle2 className="w-4 h-4 mx-auto text-green-500" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 8. FAQ Section */}
          <section className="border-t border-white/5 pt-20">
            <h2 className="text-3xl font-display font-bold text-white mb-10 text-center">Frequently Asked Questions</h2>
            <div className="max-w-[900px] mx-auto space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-surface-900 border border-white/10 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-3">{faq.q}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 10. EEAT Founder Section */}
          <section className="pt-10">
            <div className="max-w-[900px] mx-auto">
              <div className="flex flex-col md:flex-row items-center gap-8 p-8 bg-gradient-to-r from-[#0d1117] to-surface-900 border border-white/10 rounded-3xl shadow-xl">
                <div className="w-24 h-24 rounded-full bg-[#1a2332] border-2 border-matrix-500/30 flex items-center justify-center shrink-0 overflow-hidden">
                  <Shield className="w-10 h-10 text-matrix-400" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-2 px-2 py-1 rounded bg-matrix-500/10 text-matrix-400 text-[10px] font-mono uppercase tracking-widest mb-2">
                    <CheckCircle2 className="w-3 h-3" /> Built by Security Professionals
                  </div>
                  <h4 className="text-white font-bold text-xl mb-1">Surendra Reddy</h4>
                  <p className="text-gray-400 text-xs font-mono uppercase tracking-wider mb-3">Cybersecurity Researcher & Founder, ReconShield</p>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    Surendra is a cybersecurity engineer specializing in Open Source Intelligence (OSINT), vulnerability intelligence, and AI-driven threat analysis. He built ReconShield to democratize access to enterprise-grade reconnaissance tools and secure the digital attack surface.
                  </p>
                  <div className="flex gap-6 text-sm font-mono">
                    <a href="#" className="text-matrix-400 hover:text-matrix-300 flex items-center gap-1">LinkedIn <ChevronRight className="w-3 h-3"/></a>
                    <a href="#" className="text-gray-300 hover:text-white flex items-center gap-1">GitHub <ChevronRight className="w-3 h-3"/></a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 9. Internal Linking Hub */}
          <section className="pt-10 border-t border-white/5">
            <div className="flex items-center gap-4 mb-10">
              <h2 className="font-mono text-xs tracking-[4px] uppercase text-matrix-400 font-bold">// PLATFORM NAVIGATION DIRECTORY</h2>
              <div className="h-[1px] flex-1 bg-[#1a2332]" />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/ip-scanner" className="text-sm font-mono text-gray-400 hover:text-matrix-400 transition-colors flex items-center gap-2">
                <ChevronRight className="w-3 h-3" /> IP Scanner
              </Link>
              <Link href="/dns-lookup" className="text-sm font-mono text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-2">
                <ChevronRight className="w-3 h-3" /> DNS Lookup
              </Link>
              <Link href="/whois" className="text-sm font-mono text-gray-400 hover:text-teal-400 transition-colors flex items-center gap-2">
                <ChevronRight className="w-3 h-3" /> WHOIS Intelligence
              </Link>
              <Link href="/vulnerability-scanner" className="text-sm font-mono text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2">
                <ChevronRight className="w-3 h-3" /> Vulnerability Scanner
              </Link>
              <Link href="/security-headers" className="text-sm font-mono text-gray-400 hover:text-amber-500 transition-colors flex items-center gap-2">
                <ChevronRight className="w-3 h-3" /> Security Headers
              </Link>
              <Link href="/ssl-checker" className="text-sm font-mono text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-2">
                <ChevronRight className="w-3 h-3" /> SSL/TLS Checker
              </Link>
              <Link href="/port-scanner" className="text-sm font-mono text-gray-400 hover:text-red-500 transition-colors flex items-center gap-2">
                <ChevronRight className="w-3 h-3" /> Port Scanner
              </Link>
              <Link href="/blog" className="text-sm font-mono text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                <ChevronRight className="w-3 h-3" /> Threat Intel Blog
              </Link>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
