import HomeSections from '@/components/HomeSections';
import DynamicDashboardClient from '@/components/DynamicDashboardClient';
import NewsletterForm from '@/components/NewsletterForm';
import { client, homepageBlogQuery } from '@/utils/sanity';
import { Shield, Target, Activity, Cpu, MapPin, Network, Search, Terminal, Lock, Layers, Mail, CheckCircle2, Globe, Database, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: "AI-Powered Cybersecurity & Threat Intelligence Platform",
  description: "ReconShield is a free, passive OSINT cybersecurity platform. Scan websites, analyze infrastructure, and detect configuration risks instantly with our threat intelligence engine.",
  alternates: {
    canonical: 'https://reconshield.in',
  },
  openGraph: {
    title: "AI-Powered Cybersecurity & Threat Intelligence Platform",
    siteName: "ReconShield",
    description: "Scan websites, analyze infrastructure, and detect configuration risks instantly with our threat intelligence engine.",
    url: 'https://reconshield.in',
    type: 'website',
  }
};

export default async function Page() {
  const posts = await client.fetch(homepageBlogQuery);

  const tools = [
    { name: 'IP Lookup Tool', icon: MapPin, href: '/tools/ip-lookup', desc: 'Trace IP addresses, detect VPNs/proxies, and check 50+ threat blocklists.' },
    { name: 'DNS Lookup', icon: Network, href: '/tools/dns-lookup', desc: 'audit DNS records and analyze SPF/DMARC for email spoofing risks.' },
    { name: 'Exposure Assessment Tool', icon: Shield, href: '/tools/vulnerability-scanner', desc: 'Scan websites passively for misconfigurations and exposed configuration risks.' },
    { name: 'WHOIS Lookup', icon: Search, href: '/tools/whois', desc: 'Identify domain ownership, registration dates, and infrastructure providers.' },
    { name: 'Port Scanner', icon: Terminal, href: '/tools/port-scanner', desc: 'Detect exposed services, database ports, and unencrypted administrative interfaces.' },
    { name: 'SSL Checker', icon: Lock, href: '/tools/ssl-checker', desc: 'Analyze TLS certificates for expiration, cipher strength, and deprecated protocols.' },
    { name: 'Security Headers', icon: Layers, href: '/tools/http-headers', desc: 'Audit CSP, HSTS, and X-Frame-Options to prevent XSS and clickjacking.' },
    { name: 'Email Security', icon: Mail, href: '/tools/email-security', desc: 'Validate SPF, DKIM, and DMARC records to assess mail server security and phishing protection.' },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebApplication",
                "@id": "https://reconshield.in/#software",
                "name": "ReconShield Threat Intelligence Platform",
                "url": "https://reconshield.in",
                "description": "Free passive security exposure assessment tool and OSINT platform.",
                "applicationCategory": "SecurityApplication",
                "operatingSystem": "Web",
                "offers": {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "USD"
                }
              },
              {
                "@type": "Organization",
                "@id": "https://reconshield.in/#organization",
                "name": "ReconShield",
                "url": "https://reconshield.in",
                "logo": "https://reconshield.in/logo.png",
                "sameAs": []
              },
              {
                "@type": "BreadcrumbList",
                "@id": "https://reconshield.in/#breadcrumb",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://reconshield.in"
                  }
                ]
              }
            ]
          })
        }}
      />

      {/* 1. Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[#0a0d14] -z-20" />
        <div className="absolute inset-0 bg-[url('/matrix-bg.png')] bg-repeat opacity-[0.02] -z-10" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-full bg-matrix-400/5 blur-[120px] rounded-full pointer-events-none -z-10" />
        
        <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-center animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-matrix-400/10 border border-matrix-400/20 text-matrix-400 text-xs font-semibold uppercase tracking-widest mb-8">
            <Activity className="w-4 h-4" />
            <span>INFRASTRUCTURE VISIBILITY ACTIVE</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-8 tracking-tight leading-tight md:leading-[1.1]">
            Infrastructure Visibility <br className="hidden md:block"/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-matrix-400 to-matrix-300">
              & Threat Intelligence
            </span> Platform
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            Audit configurations, analyze infrastructure, and identify exposure instantly with our free, professional-grade passive infrastructure visibility engine. Identify infrastructure exposure before issues impact operations.
          </p>

          <div className="bg-surface-900/60 border border-white/10 text-gray-300 text-sm py-4 px-6 rounded-xl max-w-2xl mx-auto mb-10 shadow-lg">
            <strong className="text-white">NOTICE:</strong> ReconShield provides defensive cybersecurity tools intended solely for authorized security research, infrastructure self-assessment, and defensive analysis. <Link href="/disclaimer" className="text-matrix-400 hover:text-matrix-300 transition-colors ml-1">Read Authorized Use Policy</Link>
          </div>

          <div className="max-w-3xl mx-auto bg-surface-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-4 shadow-xl">
            <DynamicDashboardClient />
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 text-sm font-mono text-gray-500 uppercase tracking-widest">
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-matrix-400" /> 100% Passive</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-matrix-400" /> No Paywalls</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-matrix-400" /> Real-Time OSINT</div>
          </div>
        </div>
      </section>

      {/* 2. Threat Intelligence Tools Grid */}
      <section className="py-24 bg-[#05080f] border-b border-white/5 relative">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Enterprise Threat Intelligence Tools</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Access our suite of open-source intelligence utilities to map infrastructure, identify internet-facing assets, and secure your digital footprint.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tools.map((tool, i) => (
              <Link href={tool.href} key={i} className="group p-6 bg-surface-900/60 border border-white/5 hover:border-white/10 rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-surface-900/50 flex flex-col h-full">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                  <tool.icon className="w-6 h-6 text-matrix-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-matrix-400 transition-colors">{tool.name}</h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-6 flex-1">{tool.desc}</p>
                <div className="font-mono text-xs text-matrix-400 flex items-center gap-2 uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                  Launch Tool <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Website Exposure Assessment & 4. OSINT Research */}
      <section className="py-24 bg-[#0a0d14] relative">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono uppercase tracking-widest mb-6">
              <Globe className="w-4 h-4" />
              <span>Infrastructure Visibility</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6 leading-tight">
              Security Exposure <br/> Assessment & OSINT Engine
            </h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Traditional assessment tools can generate disruptive traffic. ReconShield utilizes strict <strong>passive intelligence gathering</strong> and OSINT methodologies to map out your digital infrastructure passively. We analyze DNS propagation, perform deep domain intelligence, and uncover forgotten configuration risks.
            </p>
            <ul className="space-y-4 mb-8">
              {['Real-time threat detection and exposure analysis', 'Zero-impact passive intelligence gathering', 'Continuous infrastructure monitoring and discovery', 'Domain intelligence and shadow IT exposure tracking'].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#00ff88]/10 flex items-center justify-center mt-0.5 shrink-0">
                    <CheckCircle2 className="w-3 h-3 text-[#00ff88]" />
                  </div>
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
            <Link href="/tools/vulnerability-scanner" className="px-6 py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl font-medium transition-colors inline-flex items-center gap-2">
              Learn about Exposure Assessment <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#00ff88]/10 to-blue-500/10 rounded-3xl blur-2xl" />
            <div className="relative bg-[#0d1117] border border-white/10 rounded-3xl p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="font-mono text-xs text-gray-500">terminal@reconshield:~$</div>
              </div>
              <div className="font-mono text-sm space-y-4">
                <p className="text-gray-400"><span className="text-blue-400">➜</span> <span className="text-white">reconshield</span> --target example.com --passive</p>
                <p className="text-[#00ff88]">[+] Initializing OSINT modules...</p>
                <p className="text-gray-400">[i] Resolving DNS infrastructure...</p>
                <p className="text-amber-400">[!] Warning: SPF record uses soft-fail (~all)</p>
                <p className="text-gray-400">[i] Verifying SSL/TLS certificates...</p>
                <p className="text-[#00ff88]">[+] Certificate valid (TLS 1.3 supported)</p>
                <p className="text-gray-400">[i] Cross-referencing 50+ threat databases...</p>
                <p className="text-[#00ff88]">[+] IP reputation is clean. 0/54 blocklists.</p>
                <p className="text-white mt-4">Assessment complete. 1 configuration risk found. Exposure Level: <span className="text-amber-400 font-bold">MEDIUM</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Security Analysis Platform & 7. AI Security Intelligence */}
      <section className="py-24 bg-[#05080f] border-t border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">AI Security Intelligence Platform</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">We process raw network telemetry through advanced AI algorithms to generate human-readable cyber risk assessments and security monitoring protocols.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#0d1117] border border-[#1a2332] rounded-2xl p-8">
              <Cpu className="w-8 h-8 text-blue-400 mb-6" />
              <h3 className="text-xl font-bold text-white mb-4">AI Threat Analysis</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Raw data causes alert fatigue. Our engine translates complex port scans, SSL logs, and header configurations into actionable, intelligent scanning insights that prioritize critical risks.
              </p>
            </div>
            <div className="bg-[#0d1117] border border-[#1a2332] rounded-2xl p-8">
              <Activity className="w-8 h-8 text-[#00ff88] mb-6" />
              <h3 className="text-xl font-bold text-white mb-4">Cyber Risk Assessment</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Receive an aggregated Abuse Confidence Score based on our proprietary algorithms. We evaluate infrastructure against global threat feeds to determine your true organizational cyber risk.
              </p>
            </div>
            <div className="bg-[#0d1117] border border-[#1a2332] rounded-2xl p-8">
              <Database className="w-8 h-8 text-purple-400 mb-6" />
              <h3 className="text-xl font-bold text-white mb-4">Security Monitoring</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                The internet-facing assets changes daily. Continuous automated security insights ensure that newly exposed APIs, expired certificates, or DNS alterations are detected in real-time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Trust & Authority Section (EEAT) */}
      <section className="py-20 bg-[#0a0d14]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="bg-gradient-to-r from-surface-900 to-[#0d1117] border border-white/10 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-12 shadow-2xl">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs font-mono uppercase tracking-widest">
                <Shield className="w-4 h-4" />
                <span>Security-First Foundation</span>
              </div>
              <h2 className="text-3xl font-display font-bold text-white">Built for Security Researchers & authorized security professionals</h2>
              <p className="text-gray-400 leading-relaxed">
                ReconShield operates under a strict ethical framework prioritizing internet safety and responsible research. Built by <strong>Surendra Reddy</strong>, a dedicated cybersecurity engineer focused on exposure intelligence and OSINT. Our platform serves as a safe harbor for mapping infrastructure passively without violating legal boundaries.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-white/10">
                <div>
                  <div className="text-2xl font-bold text-white font-mono">1M+</div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">IPs Analyzed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white font-mono">50+</div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">Threat Feeds</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white font-mono">100%</div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">Passive OSINT</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#00ff88] font-mono">Free</div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">Platform</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Cybersecurity News & Research */}
      {posts && posts.length > 0 && (
        <section className="py-24 bg-[#05080f] border-t border-white/5">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
              <div>
                <h2 className="text-3xl font-display font-bold text-white mb-2">Cybersecurity News & Research</h2>
                <p className="text-gray-400">Latest threat intelligence reports, CVE analysis, and AI security insights.</p>
              </div>
              <Link href="/blog" className="px-6 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium transition-colors text-sm shrink-0">
                View All Research
              </Link>
            </div>
            
            <HomeSections posts={posts} />
          </div>
        </section>
      )}

      {/* 9. Newsletter Section */}
      <section className="py-24 bg-[#0a0d14] relative overflow-hidden">
        <div className="absolute inset-0 bg-matrix-400/5 -z-10" />
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Mail className="w-12 h-12 text-[#00ff88] mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Stay Ahead of Emerging Threats</h2>
          <p className="text-gray-400 mb-8">Join thousands of security professionals receiving our weekly threat intelligence updates, zero-day security alerts, and exclusive research reports.</p>
          
          <NewsletterForm />
          <p className="text-xs text-gray-600 mt-4">We respect your privacy. No spam, just high-fidelity intelligence.</p>
        </div>
      </section>


    </>
  );
}
