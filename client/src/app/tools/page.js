import Link from 'next/link';
import { 
  Shield, Target, Server, Lock, Terminal, 
  ChevronRight, Activity, Network, Search, 
  Globe, Key, Zap, Database, CheckCircle2 
} from 'lucide-react';

import { generateBaseMetadata } from '@/utils/metadata';
import ToolsHubClient from '@/components/ToolsHubClient';
import NativeBanner from '@/components/ads/NativeBanner';

export const metadata = generateBaseMetadata({
  title: "Cybersecurity Tools & Threat Intelligence Platform",
  description: "Enterprise suite of free cybersecurity tools. Perform internet-facing assets analysis, OSINT infrastructure visibility, exposure assessment, and infrastructure intelligence.",
  path: '/tools'
});

export default function ToolsHubPage() {
  const faqs = [
    {
      q: "Are these cybersecurity tools completely free?",
      a: "Yes. ReconShield operates as a free, open-access threat intelligence platform. We believe enterprise-grade security tools should be accessible to all developers and researchers."
    },
    {
      q: "Is it legal to use these infrastructure visibility tools?",
      a: "Absolutely. All ReconShield tools operate passively. We aggregate data from global OSINT databases, public DNS registries, and passive header analysis without sending disruptive or malicious payloads to the target."
    },
    {
      q: "What is internet-facing assets Analysis?",
      a: "internet-facing assets analysis is the process of mapping all exposed digital assets (domains, IPs, ports, headers) that an unauthorized actor could potentially abuse. Our tools automate this discovery phase."
    },
    {
      q: "How accurate is the threat intelligence platform?",
      a: "Our engine queries live, authoritative data sources (like regional internet registries and Let's Encrypt transparency logs) to ensure the intelligence provided is accurate in real-time."
    },
    {
      q: "Which cybersecurity tool should I start with?",
      a: "We recommend starting with the Security Exposure Assessment Tool to get a broad overview of your web application's security posture, then pivoting to the Security Headers and SSL Checker for deep hardening."
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
                "description": "A comprehensive suite of cybersecurity tools for OSINT and internet-facing assets analysis."
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
            Equip yourself with enterprise-grade <strong>cybersecurity infrastructure visibility tools</strong>. Perform massive <strong>internet-facing assets analysis</strong>, audit infrastructure, and harden your defenses—all entirely free.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-gray-500 uppercase tracking-widest mb-16">
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-matrix-400" /> Passive infrastructure visibility</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> Live OSINT Feeds</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400" /> Zero Registration</div>
          </div>
        </div>
      </section>

      <div className="bg-[#05080f]">
        
        <div className="max-w-[1200px] mx-auto px-6 py-20 space-y-32">
          <NativeBanner />
          {/* Dynamic Tools Hub Client (Includes Search, Category Filtering, and Responsive Grid) */}
          <ToolsHubClient />

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
                The volume of data generated by an <strong>internet-facing assets analysis</strong> is staggering. To combat alert fatigue, ReconShield is evolving to integrate <strong>AI cybersecurity intelligence</strong>. 
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
                    Surendra is a cybersecurity engineer specializing in Open Source Intelligence (OSINT), exposure intelligence, and AI-driven threat analysis. He built ReconShield to democratize access to enterprise-grade infrastructure visibility tools and secure the digital internet-facing assets.
                  </p>
                  <div className="flex gap-6 text-sm font-mono">
                    <a href="https://linkedin.com/in/surendrareddy3" target="_blank" rel="noopener noreferrer" className="text-matrix-400 hover:text-matrix-300 flex items-center gap-1">LinkedIn <ChevronRight className="w-3 h-3"/></a>
                    <a href="https://github.com/nsurendrareddy" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white flex items-center gap-1">GitHub <ChevronRight className="w-3 h-3"/></a>
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
              <Link href="/tools/ip-lookup" className="text-sm font-mono text-gray-400 hover:text-matrix-400 transition-colors flex items-center gap-2">
                <ChevronRight className="w-3 h-3" /> IP Scanner
              </Link>
              <Link href="/tools/dns-lookup" className="text-sm font-mono text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-2">
                <ChevronRight className="w-3 h-3" /> DNS Lookup
              </Link>
              <Link href="/tools/whois" className="text-sm font-mono text-gray-400 hover:text-teal-400 transition-colors flex items-center gap-2">
                <ChevronRight className="w-3 h-3" /> WHOIS Intelligence
              </Link>
              <Link href="/tools/vulnerability-scanner" className="text-sm font-mono text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2">
                <ChevronRight className="w-3 h-3" /> Exposure Assessment Tool
              </Link>
              <Link href="/tools/http-headers" className="text-sm font-mono text-gray-400 hover:text-amber-500 transition-colors flex items-center gap-2">
                <ChevronRight className="w-3 h-3" /> Security Headers
              </Link>
              <Link href="/tools/ssl-checker" className="text-sm font-mono text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-2">
                <ChevronRight className="w-3 h-3" /> SSL/TLS Checker
              </Link>
              <Link href="/tools/port-scanner" className="text-sm font-mono text-gray-400 hover:text-red-500 transition-colors flex items-center gap-2">
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
