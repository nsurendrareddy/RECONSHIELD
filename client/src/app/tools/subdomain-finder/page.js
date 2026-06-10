import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { 
  Shield, Globe, Server, Lock, Terminal, CheckCircle2, ChevronRight, 
  Search, Activity, Target, Network, Info, Check, AlertTriangle, 
  FileText, Send, HelpCircle, BookOpen, Key, Database
} from 'lucide-react';
import { generateBaseMetadata } from '@/utils/metadata';

const ToolScannerClient = dynamic(() => import('@/components/ToolScannerClient'), {
  loading: () => <div className="min-h-[400px] animate-pulse bg-surface-900/50 rounded-3xl max-w-5xl mx-auto my-12" />
});

export const metadata = generateBaseMetadata({
  title: "Subdomain Finder | Free Passive Subdomain Enumeration Tool",
  description: "Find subdomains online using our free passive subdomain discovery tool. Scan Certificate Transparency logs, identify staging environments, and map attack surfaces.",
  path: "/tools/subdomain-finder"
});

export default function SubdomainFinderPage() {
  const faqs = [
    {
      q: "What is a subdomain finder?",
      a: "A subdomain finder is an OSINT security tool that searches public registries, DNS datasets, and Certificate Transparency (CT) logs to compile a list of all subdomains associated with a root domain."
    },
    {
      q: "What is subdomain enumeration?",
      a: "Subdomain enumeration is the process of identifying and mapping the subdomains of a target domain to discover the full scope of an organization's external network infrastructure."
    },
    {
      q: "How does subdomain discovery work?",
      a: "Passive discovery searches historic record logs and SSL/TLS certificates issued for a domain. Active discovery queries target nameservers directly through DNS brute-forcing."
    },
    {
      q: "Why do security teams monitor subdomains?",
      a: "Security teams monitor subdomains to identify forgotten servers (shadow IT), detect dangling CNAME takeover vulnerabilities, and reduce the organization's external attack surface."
    },
    {
      q: "How do bug bounty hunters use subdomains?",
      a: "Hunters search for subdomains to uncover lower-security assets like development systems, staging APIs, or internal wikis, which are more likely to contain software vulnerabilities."
    },
    {
      q: "What is a subdomain takeover?",
      a: "A subdomain takeover occurs when a subdomain's DNS record points to an inactive or expired third-party service, allowing an attacker to claim that resource and serve malicious content."
    }
  ];

  const breadcrumbs = [
    { name: "Home", url: "https://reconshield.in" },
    { name: "Tools", url: "https://reconshield.in/tools" },
    { name: "Subdomain Finder", url: "https://reconshield.in/tools/subdomain-finder" }
  ];

  const schemas = [
    {
      "@type": "SoftwareApplication",
      "@id": "https://reconshield.in/tools/subdomain-finder#software",
      "name": "ReconShield Subdomain Finder",
      "url": "https://reconshield.in/tools/subdomain-finder",
      "description": "Free online passive subdomain checker and external attack surface mapper.",
      "applicationCategory": "SecurityApplication",
      "operatingSystem": "All",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "publisher": { "@id": "https://reconshield.in/#organization" }
    },
    {
      "@type": "WebApplication",
      "@id": "https://reconshield.in/tools/subdomain-finder#webapp",
      "name": "ReconShield Subdomain Scanner App",
      "url": "https://reconshield.in/tools/subdomain-finder",
      "description": "Query Certificate Transparency logs and historical DNS maps to find hidden subdomains.",
      "applicationCategory": "SecurityApplication",
      "operatingSystem": "All",
      "browserRequirements": "Requires JavaScript. Requires HTML5.",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "publisher": { "@id": "https://reconshield.in/#organization" }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://reconshield.in/tools/subdomain-finder#breadcrumb",
      "itemListElement": breadcrumbs.map((crumb, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "name": crumb.name,
        "item": crumb.url
      }))
    },
    {
      "@type": "TechArticle",
      "@id": "https://reconshield.in/tools/subdomain-finder#article",
      "headline": "The Professional Guide to Subdomain Enumeration and Attack Surface Asset Mapping",
      "description": "A comprehensive deep dive into passive reconnaissance methodology, Certificate Transparency log parsing, DNS querying, and external attack surface vulnerability auditing.",
      "author": { "@type": "Person", "name": "Surendra Reddy" },
      "publisher": { "@id": "https://reconshield.in/#organization" },
      "url": "https://reconshield.in/tools/subdomain-finder"
    },
    {
      "@type": "HowTo",
      "@id": "https://reconshield.in/tools/subdomain-finder#howto",
      "name": "How to find subdomains online",
      "description": "Discover subdomains and map the external hosting infrastructure of any domain using passive OSINT.",
      "step": [
        { "@type": "HowToStep", "name": "Enter Root Domain", "text": "Input the target domain name in the search container." },
        { "@type": "HowToStep", "name": "Launch Enumeration", "text": "Click Scan to query Certificate Transparency databases." },
        { "@type": "HowToStep", "name": "Export Host List", "text": "Inspect the parsed subdomains and verify DNS binding records." }
      ]
    },
    {
      "@type": "FAQPage",
      "@id": "https://reconshield.in/tools/subdomain-finder#faq",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": { "@type": "Answer", "text": faq.a }
      }))
    }
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": schemas }) }} />

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden border-b border-white/5" aria-label="Tool Hero">
        <div className="absolute inset-0 bg-[#0a0d14] -z-20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-orange-500/5 blur-[100px] rounded-full pointer-events-none -z-10" />
        
        <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-900 border border-white/10 text-gray-400 text-xs font-mono uppercase tracking-widest mb-6 shadow-sm">
            <Network className="w-4 h-4 text-orange-400" />
            <span>Passive Infrastructure Reconnaissance Module</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 tracking-tight">
            Subdomain Finder
          </h1>
          
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed font-sans">
            Map external attack surfaces and discover hidden subdomains. Query Certificate Transparency (CT) logs and passive DNS tables to enumerate host configurations instantly.
          </p>

          <div className="max-w-4xl mx-auto mb-12">
            <ToolScannerClient toolId="subdomain-finder" title="Subdomain Finder" desc="Passive subdomain discovery engine" />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-gray-500 uppercase tracking-widest">
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-orange-400" /> Certificate Transparency Logs</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-orange-400" /> Staging Host Identification</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-orange-400" /> Attack Surface Mapping</div>
          </div>
        </div>
      </section>

      {/* AI Overview Section (Phase 5) */}
      <section className="py-12 bg-[#05080f] border-b border-white/5" aria-label="AI Search Overview">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="bg-gradient-to-r from-orange-500/5 to-amber-500/5 border border-orange-500/10 rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 blur-[50px] rounded-full pointer-events-none" />
            <h2 className="font-mono text-xs text-orange-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4 text-orange-400" /> AI Citation Index: Subdomain Discovery
            </h2>
            <div className="space-y-6 text-sm text-gray-300 font-sans leading-relaxed">
              <div>
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Definition: What is a Subdomain Finder?</span>
                <p>
                  A <strong>Subdomain Finder</strong> is a security intelligence utility that scans public databases, search engine indexes, and Certificate Transparency (CT) registries to compile a complete list of subdomains pointing to a root domain.
                </p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Definition: What is Subdomain Enumeration?</span>
                <p>
                  <strong>Subdomain enumeration</strong> is the reconnaissance phase of mapping an external network. It extracts valid subdomains to identify forgotten servers (shadow IT), test APIs, and detect misconfigured DNS records vulnerable to takeovers.
                </p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// How-To: How Bug Bounty Hunters Find Subdomains?</span>
                <p>
                  Bug bounty hunters discover hidden subdomains using passive OSINT APIs (like ReconShield or CRT.sh) to query certificate logs. They combine passive lookups with active DNS resolution to check for live hosts and outdated web software.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Educational Guide */}
      <div className="bg-[#05080f]">
        
        <section className="py-20 border-b border-white/5">
          <div className="max-w-[1000px] mx-auto px-6 prose prose-invert max-w-none prose-p:leading-relaxed prose-p:text-gray-400 prose-headings:text-white prose-a:text-orange-400 hover:prose-a:text-orange-300">
            
            <h2 className="text-3xl font-display font-bold mt-0 mb-6 flex items-center gap-3">
              <Network className="w-8 h-8 text-orange-400" />
              What is Subdomain Discovery?
            </h2>
            <p>
              <strong>Subdomain discovery</strong> is the process of mapping all hosts and subdomains nested under a primary domain. In cybersecurity, this is a critical component of reconnaissance. Attackers and defenders alike scan domains to locate web servers, database endpoints, testing environments, and internal tools that may not be linked from the main site but are publicly accessible.
            </p>

            <h2 className="text-3xl font-display font-bold mt-16 mb-6">How Subdomain Finder Technology Works</h2>
            <p>
              ReconShield employs **passive enumeration** techniques to discover subdomains without interacting directly with target servers:
            </p>
            <ul>
              <li><strong>Certificate Transparency Logs:</strong> We query public CT logs, which compile all SSL/TLS certificates issued by Certificate Authorities (CAs) for the domain.</li>
              <li><strong>Search Engine Crawlers:</strong> We parse search engine indexes using advanced querying to extract indexed host paths.</li>
              <li><strong>Historical DNS Databases:</strong> We pull from databases of historically resolved DNS records to match older subdomains.</li>
            </ul>

            <h2 className="text-3xl font-display font-bold mt-16 mb-6">Why Organizations Monitor Subdomains</h2>
            <p>
              Organizations must actively track their subdomains to eliminate **Shadow IT** (infrastructure deployed without security approval) and secure forgotten assets. Left unmonitored, subdomains often host outdated software versions, debug tools, or testing pages that are vulnerable to exploitation.
            </p>

            <h2 className="text-3xl font-display font-bold mt-16 mb-6">What is a Subdomain Takeover Vulnerability?</h2>
            <p>
              A <strong>subdomain takeover</strong> is a critical vulnerability that occurs when a subdomain points to an external service (such as GitHub Pages, AWS S3, or Heroku) via a CNAME record, but the external service workspace has been deleted or expired. Attackers can claim that external endpoint, allowing them to host malicious code on a trusted subdomain and execute cross-site scripting (XSS) attacks.
            </p>
          </div>
        </section>

        {/* Competitor Comparison */}
        <section className="py-20 bg-[#0a0d14] border-b border-white/5">
          <div className="max-w-[1000px] mx-auto px-6 prose prose-invert max-w-none">
            <h2 className="text-3xl font-display font-bold text-white mb-6">Subdomain Finder Alternatives</h2>
            <p className="text-gray-400 mb-8">
              Compare ReconShield's passive subdomain finder against alternative scanner platforms:
            </p>

            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0d1117] not-prose my-8">
              <table className="w-full text-left text-sm text-gray-400 border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.02] text-white font-mono uppercase text-xs">
                    <th className="p-4">Utility Parameter</th>
                    <th className="p-4 border-l border-white/10">ReconShield</th>
                    <th className="p-4 border-l border-white/10">DNSDumpster</th>
                    <th className="p-4 border-l border-white/10">CRT.sh</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono text-xs">
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-4 font-semibold text-white">Passive Enumeration Speed</td>
                    <td className="p-4 border-l border-white/10 text-orange-400 font-bold">Fast (Real-time logs)</td>
                    <td className="p-4 border-l border-white/10">Moderate</td>
                    <td className="p-4 border-l border-white/10">Slow (Database timeouts)</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-4 font-semibold text-white">DNS SEC Validation</td>
                    <td className="p-4 border-l border-white/10 text-orange-400 font-bold">Integrated checks</td>
                    <td className="p-4 border-l border-white/10">Manual dig required</td>
                    <td className="p-4 border-l border-white/10">No</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-4 font-semibold text-white">Takeover Scanning</td>
                    <td className="p-4 border-l border-white/10 text-orange-400 font-bold">Automatic target flags</td>
                    <td className="p-4 border-l border-white/10">No</td>
                    <td className="p-4 border-l border-white/10">No</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* E-E-A-T credentials (Phase 9) */}
        <section className="py-20 border-b border-white/5">
          <div className="max-w-[1000px] mx-auto px-6">
            
            <div className="flex flex-col md:flex-row items-center gap-8 p-8 bg-gradient-to-r from-[#0d1117] to-surface-900 border border-white/10 rounded-3xl shadow-xl mb-16">
              <div className="w-24 h-24 rounded-full bg-[#1a2332] border-2 border-orange-500/30 flex items-center justify-center shrink-0 overflow-hidden">
                <Shield className="w-10 h-10 text-orange-400" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 px-2 py-1 rounded bg-orange-500/10 text-orange-400 text-[10px] font-mono uppercase tracking-widest mb-2">
                  <Check className="w-3 h-3" /> Fact Checked & Verified
                </div>
                <h4 className="text-white font-bold text-xl mb-1">Surendra Reddy</h4>
                <p className="text-gray-400 text-xs font-mono uppercase tracking-wider mb-3">Cybersecurity Researcher & Founder, ReconShield</p>
                <p className="text-gray-400 text-sm leading-relaxed mb-4 font-sans">
                  Surendra is an information security researcher focusing on attack surface discovery, DNS vulnerability analysis, and OSINT methodology. He built ReconShield to provide accessible reconnaissance utilities for bug hunters and security administrators.
                </p>
                <div className="flex gap-6 text-sm font-mono">
                  <a href="https://linkedin.com/in/surendrareddy3" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 flex items-center gap-1">LinkedIn <ChevronRight className="w-3 h-3"/></a>
                  <a href="https://github.com/nsurendrareddy" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white flex items-center gap-1">GitHub <ChevronRight className="w-3 h-3"/></a>
                </div>
              </div>
            </div>

            <div className="text-center text-[10px] font-mono text-gray-600 uppercase tracking-widest">
              Last Updated: June 2026 | Reviewed by ReconShield Security Board | Reference: Certificate Transparency log database (RFC 6962)
            </div>
          </div>
        </section>

        {/* Semantic Internal Links (Phase 7) */}
        <section className="py-20 bg-[#05080f]" aria-label="Related Security Tools">
          <div className="max-w-[1000px] mx-auto px-6">
            <h2 className="text-3xl font-display font-bold text-white mb-10 text-center">Audit Your Threat Surface</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <Link href="/tools/whois" className="p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-cyan-500/30 transition-all group">
                <Globe className="w-8 h-8 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-white font-bold text-lg mb-2">WHOIS Lookup</h4>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">Analyze domain registration records, registrar details, ownership, and administrative locks.</p>
                <span className="text-cyan-400 text-xs font-mono flex items-center gap-1">Run WHOIS Check <ChevronRight className="w-3 h-3"/></span>
              </Link>
              
              <Link href="/tools/ip-lookup" className="p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-purple-500/30 transition-all group">
                <Network className="w-8 h-8 text-purple-400 mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-white font-bold text-lg mb-2">IP Reputation Check</h4>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">Verify hosting network ASN metadata and check listings across global threat blacklist databases.</p>
                <span className="text-purple-400 text-xs font-mono flex items-center gap-1">Check IP Reputation <ChevronRight className="w-3 h-3"/></span>
              </Link>

              <Link href="/tools/dns-lookup" className="p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-emerald-500/30 transition-all group">
                <Database className="w-8 h-8 text-[#00ff88] mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-white font-bold text-lg mb-2">DNS Records Lookup</h4>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">Extract and verify authoritative DNS configurations (A, AAAA, MX, NS, TXT) and check DNSSEC encryption.</p>
                <span className="text-[#00ff88] text-xs font-mono flex items-center gap-1">Query DNS Records <ChevronRight className="w-3 h-3"/></span>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 border-t border-white/5 bg-[#0a0d14]" aria-labelledby="faq-title">
          <div className="max-w-[900px] mx-auto px-6">
            <h2 id="faq-title" className="text-3xl font-display font-bold text-white mb-10 text-center">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 gap-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-surface-900 border border-white/10 rounded-2xl p-6 hover:border-orange-500/20 transition-all">
                  <h3 className="text-lg font-bold text-white mb-3 font-display">{faq.q}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed font-sans">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
