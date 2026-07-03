import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { 
  Shield, Globe, Server, Lock, Terminal, CheckCircle2, ChevronRight, 
  Search, Activity, Target, Network, Info, Check, AlertTriangle, 
  FileText, Send, HelpCircle, BookOpen, Key, Database, Clock, ArrowRight, ExternalLink
} from 'lucide-react';
import { generateBaseMetadata } from '@/utils/metadata';

const ToolScannerClient = dynamic(() => import('@/components/ToolScannerClient'), {
  loading: () => <div className="min-h-[400px] animate-pulse bg-surface-900/50 rounded-3xl max-w-5xl mx-auto my-12" />
});

export const metadata = {
  ...generateBaseMetadata({
    title: "Free Subdomain Finder - Discover Hidden Subdomains | ReconShield",
    description: "Free subdomain finder tool to discover hidden subdomains, map attack surfaces, and identify DNS records. Instant scanning for security research.",
    path: "/tools/subdomain-finder",
    image: "https://reconshield.in/og-image-subdomain.png"
  }),
  keywords: [
    "subdomain finder", "free subdomain scanner", "subdomain enumeration tool",
    "subdomain discovery", "find subdomains", "DNS enumeration",
    "certificate transparency lookup", "attack surface mapping",
    "subdomain brute force", "security reconnaissance tool",
    "free subdomain finder online", "subdomain scanner for penetration testing",
    "discover hidden subdomains free", "subdomain enumeration techniques",
    "certificate transparency subdomain finder"
  ],
  appleWebApp: {
    capable: true,
    title: "ReconShield",
    statusBarStyle: "black-translucent",
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent"
  }
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0d14",
};

export default function SubdomainFinderPage() {
  const faqs = [
    {
      q: "What is a subdomain finder?",
      a: "A subdomain finder is a digital reconnaissance tool used to discover and map subdomains associated with a primary domain. It parses public records, search engine indexes, and Certificate Transparency logs to build a complete inventory of an organization's public-facing assets."
    },
    {
      q: "How do you find subdomains for a website?",
      a: "You can find subdomains by entering a domain name into the ReconShield Subdomain Finder. The scanner queries Certificate Transparency databases and DNS datasets passively to retrieve all active host configurations without sending direct network requests to the target."
    },
    {
      q: "What is subdomain enumeration in cybersecurity?",
      a: "Subdomain enumeration is the process of identifying all subdomains associated with a root domain. It is a fundamental step in penetration testing and bug bounty hunting, designed to uncover hidden or forgotten servers hosting web applications."
    },
    {
      q: "What is the difference between active and passive subdomain discovery?",
      a: "Passive discovery gathers data from third-party sources (like CT logs or search cache) without interacting directly with the target nameservers, making it stealthy. Active discovery queries the target servers directly using brute-force dictionaries or zone transfers, which is accurate but triggers security alerts."
    },
    {
      q: "What are Certificate Transparency (CT) logs?",
      a: "Certificate Transparency (CT) is an open framework requiring Certificate Authorities to publish every issued SSL/TLS certificate to public logs. Security researchers query these logs to discover new hostnames, staging sites, and public endpoints."
    },
    {
      q: "What is attack surface discovery?",
      a: "Attack surface discovery is the practice of identifying all public-facing assets, including subdomains, IP addresses, open ports, and active services, that could be targeted by attackers. It helps organizations understand their exposure and secure weak points."
    },
    {
      q: "What is a subdomain takeover and how does it happen?",
      a: "A subdomain takeover occurs when a domain's DNS record (such as a CNAME) points to an external service provider (like AWS S3 or GitHub Pages) that has been deleted or expired. An attacker can register that workspace to host malicious content under the trusted domain."
    },
    {
      q: "How does passive DNS lookup help in finding subdomains?",
      a: "Passive DNS databases record historical DNS resolution logs collected from recursive resolvers and ISP sensors. Analyzing these logs reveals previously active subdomains, IP changes, and sub-infrastructure allocations."
    }
  ];

  const breadcrumbs = [
    { name: "Home", url: "https://reconshield.in" },
    { name: "Tools", url: "https://reconshield.in/tools" },
    { name: "Subdomain Finder", url: "https://reconshield.in/tools/subdomain-finder" }
  ];

  const schemas = [
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://reconshield.in/#organization",
          "name": "ReconShield",
          "url": "https://reconshield.in",
          "logo": {
            "@type": "ImageObject",
            "url": "https://reconshield.in/icon.png"
          }
        },
        {
          "@type": "WebSite",
          "@id": "https://reconshield.in/#website",
          "url": "https://reconshield.in",
          "name": "ReconShield",
          "publisher": { "@id": "https://reconshield.in/#organization" }
        },
        {
          "@type": "WebPage",
          "@id": "https://reconshield.in/tools/subdomain-finder#webpage",
          "url": "https://reconshield.in/tools/subdomain-finder",
          "name": "Free Subdomain Finder - Discover Hidden Subdomains | ReconShield",
          "isPartOf": { "@id": "https://reconshield.in/#website" }
        },
        {
          "@type": "SoftwareApplication",
          "@id": "https://reconshield.in/tools/subdomain-finder#software",
          "name": "ReconShield Subdomain Finder",
          "url": "https://reconshield.in/tools/subdomain-finder",
          "image": "https://reconshield.in/icon.png",
          "description": "Free subdomain finder tool to discover hidden subdomains, map attack surfaces, and identify DNS records. Instant scanning for security research.",
          "applicationCategory": "SecurityApplication",
          "operatingSystem": "All",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "publisher": { "@id": "https://reconshield.in/#organization" },
          "featureList": [
            "100% Free - Unlimited subdomain scanning with no cost",
            "No Installation - Web-based tool, works instantly in your browser",
            "Multiple Techniques - DNS enumeration, certificate logs, brute force",
            "Fast Scanning - Discover subdomains in seconds",
            "Certificate Transparency - Query CT logs for historical subdomains",
            "Export Results - Download results in multiple formats",
            "Privacy-Focused - We don't store or log your scans",
            "Active & Historical - Find both current and past subdomains"
          ]
        },
        {
          "@type": "WebApplication",
          "@id": "https://reconshield.in/tools/subdomain-finder#webapp",
          "name": "ReconShield Subdomain Finder App",
          "url": "https://reconshield.in/tools/subdomain-finder",
          "image": "https://reconshield.in/icon.png",
          "description": "Scan databases and certificate logs passively to list and inspect subdomains.",
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
          "headline": "The Enterprise Specification of Passive Domain Enumeration and Attack Surface Mapping",
          "description": "A comprehensive deep dive into Certificate Transparency logging, passive OSINT scanning, and domain takeover detection protocols.",
          "datePublished": "2026-06-01T00:00:00Z",
          "dateModified": "2026-06-11T12:00:00Z",
          "author": { "@type": "Person", "name": "Surendra Reddy" },
          "publisher": { "@id": "https://reconshield.in/#organization" },
          "url": "https://reconshield.in/tools/subdomain-finder",
          "isPartOf": { "@id": "https://reconshield.in/tools/subdomain-finder#webpage" }
        },
        {
          "@type": "HowTo",
          "@id": "https://reconshield.in/tools/subdomain-finder#howto",
          "name": "How to perform a passive subdomain search",
          "description": "A step-by-step walkthrough to extract subdomains and check DNS CNAME bindings.",
          "step": [
            { "@type": "HowToStep", "name": "Enter Target Root Domain", "text": "Input the domain (e.g., example.com) in the Subdomain Finder input field." },
            { "@type": "HowToStep", "name": "Execute Passive Search", "text": "Click Scan to query Certificate Transparency registers and DNS logs." },
            { "@type": "HowToStep", "name": "Audit Security Vulnerabilities", "text": "Inspect the discovered hosts for inactive workspace records and expired CNAME targets." }
          ],
          "isPartOf": { "@id": "https://reconshield.in/tools/subdomain-finder#webpage" }
        },
        {
          "@type": "FAQPage",
          "@id": "https://reconshield.in/tools/subdomain-finder#faq",
          "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": { "@type": "Answer", "text": faq.a }
          })),
          "isPartOf": { "@id": "https://reconshield.in/tools/subdomain-finder#webpage" }
        }
      ]
    }
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas[0]) }} />

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden border-b border-white/5" aria-label="Tool Hero">
        <div className="absolute inset-0 bg-[#0a0d14] -z-20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-orange-500/5 blur-[100px] rounded-full pointer-events-none -z-10" />
        
        <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-center">
          {/* Breadcrumb Trail */}
          <nav aria-label="Breadcrumbs" className="mb-6 inline-block">
            <ol className="flex items-center gap-2 text-xs font-mono text-gray-500">
              <li><Link href="/" className="hover:text-orange-400 transition-colors">Home</Link></li>
              <li><ChevronRight className="w-3 h-3 text-gray-700" /></li>
              <li><Link href="/tools" className="hover:text-orange-400 transition-colors">Tools</Link></li>
              <li><ChevronRight className="w-3 h-3 text-gray-700" /></li>
              <li className="text-orange-400 font-semibold">Subdomain Finder</li>
            </ol>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-900 border border-white/10 text-gray-400 text-xs font-mono uppercase tracking-widest mb-6 shadow-sm">
            <Network className="w-4 h-4 text-orange-400" />
            <span>Passive Infrastructure Reconnaissance Module</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 tracking-tight">
            Free Subdomain Finder &amp; Scanner - Discover Hidden Subdomains
          </h1>
          
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-6 leading-relaxed font-sans">
            Our <strong>free subdomain finder</strong> helps you discover hidden subdomains and map complete attack surfaces instantly. Whether you&apos;re conducting security assessments, penetration testing, or bug bounty research, this <strong>subdomain scanner</strong> uses advanced enumeration techniques to find active and historical subdomains. No registration required—simply enter a domain name to start discovering subdomains.
          </p>

          <div className="flex items-center justify-center gap-4 text-xs font-mono text-gray-500 mb-10 border-y border-white/5 py-2 max-w-xl mx-auto">
            <span>Published: June 1, 2026</span>
            <span className="text-gray-700">•</span>
            <span>Last Updated: June 11, 2026</span>
            <span className="text-gray-700">•</span>
            <span className="text-orange-400">Fact Checked</span>
          </div>

          <div className="max-w-4xl mx-auto mb-12">
            <ToolScannerClient toolId="subdomain-finder" title="Subdomain Finder" desc="Passive subdomain discovery engine" />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-gray-500 uppercase tracking-widest">
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-orange-400" /> Certificate Transparency Logs</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-orange-400" /> Staging Host Identification</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-orange-400" /> Attack Surface Mapping</div>
          </div>

          <div className="mt-8 max-w-2xl mx-auto p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl">
            <p className="text-orange-400 text-xs font-mono text-center flex flex-col md:flex-row items-center justify-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span><strong>AUTHORIZED USE ONLY:</strong> This tool is strictly for educational and defensive purposes. Only scan assets you own or have explicit authorization to test.</span>
            </p>
          </div>
        </div>
      </section>

      {/* AI Overview / Featured Snippet Optimization */}
      <section className="py-12 bg-[#05080f] border-b border-white/5" aria-label="AI Search Overview">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="bg-gradient-to-r from-orange-500/5 to-amber-500/5 border border-orange-500/10 rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 blur-[50px] rounded-full pointer-events-none" />
            
            <h2 className="font-mono text-xs text-orange-400 uppercase tracking-wider mb-6 flex items-center gap-2">
              <Shield className="w-4 h-4 text-orange-400" /> AI Overview Snippet: Subdomain Discovery & Mapping
            </h2>
            <div className="space-y-6 text-sm text-gray-300 font-sans leading-relaxed">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Definition: What is a subdomain finder?</span>
                  <p className="text-gray-300 text-sm">
                    A <strong>subdomain finder</strong> is an information security scanning utility that aggregates public domain name registers, DNS queries, and Certificate Transparency records to list all subdomains of a target.
                  </p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Definition: How do you find subdomains?</span>
                  <p className="text-gray-300 text-sm">
                    To find subdomains, input a domain into a scanner. It queries <strong>passive DNS lookup</strong> datasets and public transparency records to extract hosts, bypassing direct targets to remain stealthy.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-white/5 pt-6">
                <div>
                  <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Definition: What is subdomain enumeration?</span>
                  <p className="text-gray-300 text-sm">
                    <strong>Subdomain enumeration</strong> is the reconnaissance technique used to locate active child hosts within a domain. Mapping namespaces exposes legacy assets, staging web containers, and cloud endpoints.
                  </p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Definition: What are CT logs?</span>
                  <p className="text-gray-300 text-sm">
                    <strong>Certificate Transparency (CT) logs</strong> are append-only public ledgers where authorities must record every issued SSL certificate. Scanners parse these logs to uncover subdomains the instant certificates are minted.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-white/5 pt-6">
                <div>
                  <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Definition: What is attack surface discovery?</span>
                  <p className="text-gray-300 text-sm">
                    <strong>Attack surface discovery</strong> is the continuous mapping of an organization's public infrastructure. Documenting hosts, network scopes, and ports reveals vulnerable entry points before malicious exploitation.
                  </p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Definition: What is a subdomain takeover?</span>
                  <p className="text-gray-300 text-sm">
                    A <strong>subdomain takeover</strong> is a critical hijack vulnerability. It happens when a DNS record points to a deleted third-party service (like AWS or GitHub). Attackers can claim that target to serve content under the trusted domain.
                  </p>
                </div>
              </div>
              
              <div className="border-t border-white/5 pt-6">
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// TL;DR Section</span>
                <p className="text-gray-400 text-xs font-mono">
                  Subdomain finders map public network perimeters by aggregating Certificate Transparency logs, search engine footprints, and DNS datasets. This passive discovery provides asset visibility and helps security teams identify outdated testing sites.
                </p>
              </div>

              <div className="border-t border-white/5 pt-6">
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Key Takeaways</span>
                <ul className="list-disc pl-5 text-gray-400 text-xs space-y-2 font-mono">
                  <li><strong>CT Log Tracking:</strong> CAs must log every issued SSL/TLS certificate, making CT logs a valuable source for subdomain discovery.</li>
                  <li><strong>Active vs Passive:</strong> Passive searches query databases; active searches interact with target servers.</li>
                  <li><strong>Takeover Security:</strong> Dangling CNAME records on deleted hosting services leave subdomains vulnerable to takeover.</li>
                  <li><strong>Staging Targets:</strong> Testing subdomains are frequently less secure than main sites.</li>
                </ul>
              </div>

              {/* Fact Box: Common Subdomain Discovery Techniques */}
              <div className="border-t border-white/5 pt-6">
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Fact Box: Common Subdomain Discovery Techniques</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono text-gray-400 mt-2">
                  <div>
                    <span className="text-[10px] text-gray-600 uppercase block">CT Log Parsing:</span>
                    <span>Extracting Hostnames from Certificates</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-600 uppercase block">DNS Brute-Forcing:</span>
                    <span>Dictionary Host Resolution</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-600 uppercase block">Search Dorking:</span>
                    <span>Filtering Indexed Paths</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-600 uppercase block">Reverse DNS:</span>
                    <span>PTR Mapping on IP Ranges</span>
                  </div>
                </div>
              </div>

              {/* Expert Summary */}
              <div className="border-t border-white/5 pt-6">
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Expert Summary</span>
                <p className="text-gray-400 text-xs leading-relaxed font-sans">
                  Mapping subdomains is a critical starting point for external network audits. Passive discovery techniques gather essential asset data without alerting target servers, allowing defenders to identify and secure legacy endpoints and misconfigured DNS records before attackers can exploit them.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights Section */}
      <section className="py-16 bg-[#0a0d14] border-b border-white/5" aria-label="Why Choose ReconShield">
        <div className="max-w-[1000px] mx-auto px-6">
          <h2 className="text-2xl font-display font-bold text-white mb-8 text-center">Why Use ReconShield&apos;s Subdomain Finder?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 not-prose">
            <div className="p-5 bg-surface-900 border border-white/5 rounded-2xl">
              <Check className="w-6 h-6 text-orange-400 mb-3" />
              <h3 className="text-white text-xs font-bold font-mono uppercase tracking-wider mb-2">100% Free</h3>
              <p className="text-gray-400 text-[11px] leading-relaxed">Unlimited subdomain scanning with no cost.</p>
            </div>
            <div className="p-5 bg-surface-900 border border-white/5 rounded-2xl">
              <Terminal className="w-6 h-6 text-orange-400 mb-3" />
              <h3 className="text-white text-xs font-bold font-mono uppercase tracking-wider mb-2">No Installation</h3>
              <p className="text-gray-400 text-[11px] leading-relaxed">Web-based tool, works instantly in your browser.</p>
            </div>
            <div className="p-5 bg-surface-900 border border-white/5 rounded-2xl">
              <Network className="w-6 h-6 text-orange-400 mb-3" />
              <h3 className="text-white text-xs font-bold font-mono uppercase tracking-wider mb-2">Multiple Techniques</h3>
              <p className="text-gray-400 text-[11px] leading-relaxed">DNS enumeration, certificate logs, brute force.</p>
            </div>
            <div className="p-5 bg-surface-900 border border-white/5 rounded-2xl">
              <Activity className="w-6 h-6 text-orange-400 mb-3" />
              <h3 className="text-white text-xs font-bold font-mono uppercase tracking-wider mb-2">Fast Scanning</h3>
              <p className="text-gray-400 text-[11px] leading-relaxed">Discover subdomains in seconds.</p>
            </div>
            <div className="p-5 bg-surface-900 border border-white/5 rounded-2xl">
              <Lock className="w-6 h-6 text-orange-400 mb-3" />
              <h3 className="text-white text-xs font-bold font-mono uppercase tracking-wider mb-2">Certificate Transparency</h3>
              <p className="text-gray-400 text-[11px] leading-relaxed">Query CT logs for historical subdomains.</p>
            </div>
            <div className="p-5 bg-surface-900 border border-white/5 rounded-2xl">
              <FileText className="w-6 h-6 text-orange-400 mb-3" />
              <h3 className="text-white text-xs font-bold font-mono uppercase tracking-wider mb-2">Export Results</h3>
              <p className="text-gray-400 text-[11px] leading-relaxed">Download results in multiple formats.</p>
            </div>
            <div className="p-5 bg-surface-900 border border-white/5 rounded-2xl">
              <Shield className="w-6 h-6 text-orange-400 mb-3" />
              <h3 className="text-white text-xs font-bold font-mono uppercase tracking-wider mb-2">Privacy-Focused</h3>
              <p className="text-gray-400 text-[11px] leading-relaxed">We don&apos;t store or log your scans.</p>
            </div>
            <div className="p-5 bg-surface-900 border border-white/5 rounded-2xl">
              <Clock className="w-6 h-6 text-orange-400 mb-3" />
              <h3 className="text-white text-xs font-bold font-mono uppercase tracking-wider mb-2">Active &amp; Historical</h3>
              <p className="text-gray-400 text-[11px] leading-relaxed">Find both current and past subdomains.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Educational Guide */}
      <div className="bg-[#05080f]">
        
        {/* Expanded Educational Content */}
        <section className="py-20 border-b border-white/5">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
              
              {/* Sticky Table of Contents (Desktop) */}
              <aside className="hidden lg:block lg:col-span-1 sticky top-24 self-start border-r border-white/5 pr-6">
                <div className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-orange-400" />
                  <span>On This Page</span>
                </div>
                <nav className="space-y-3 font-sans text-xs">
                  <a href="#what-is-subdomain-finder" className="block text-gray-400 hover:text-orange-400 transition-colors py-0.5">What Is a Subdomain Finder?</a>
                  <a href="#how-subdomain-discovery-works" className="block text-gray-400 hover:text-orange-400 transition-colors py-0.5">How Subdomain Discovery Works</a>
                  <a href="#passive-vs-active-enumeration" className="block text-gray-400 hover:text-orange-400 transition-colors py-0.5">Passive vs Active Enumeration</a>
                  <a href="#certificate-transparency-logs" className="block text-gray-400 hover:text-orange-400 transition-colors py-0.5">Certificate Transparency Logs</a>
                  <a href="#dns-based-discovery" className="block text-gray-400 hover:text-orange-400 transition-colors py-0.5">DNS-Based Discovery Methods</a>
                  <a href="#common-use-cases" className="block text-gray-400 hover:text-orange-400 transition-colors py-0.5">Subdomain Finder Use Cases</a>
                  <a href="#security-risks" className="block text-gray-400 hover:text-orange-400 transition-colors py-0.5">Security Risks of Forgotten Subdomains</a>
                  <a href="#subdomain-takeover-detection" className="block text-gray-400 hover:text-orange-400 transition-colors py-0.5">Subdomain Takeover Detection</a>
                  <a href="#enterprise-best-practices" className="block text-gray-400 hover:text-orange-400 transition-colors py-0.5">Enterprise Best Practices</a>
                  <a href="#competitor-comparison" className="block text-gray-400 hover:text-orange-400 transition-colors py-0.5">Why Choose ReconShield</a>
                  <a href="#expert-methodology" className="block text-gray-400 hover:text-orange-400 transition-colors py-0.5">Research & Methodology</a>
                  <a href="#faq" className="block text-gray-400 hover:text-orange-400 transition-colors py-0.5">Frequently Asked Questions</a>
                </nav>
              </aside>

              {/* Prose Content */}
              <div className="lg:col-span-3 prose prose-invert max-w-none prose-p:leading-relaxed prose-p:text-gray-400 prose-headings:text-white prose-a:text-orange-400 hover:prose-a:text-orange-300">
                
                <h2 id="what-is-subdomain-finder" className="text-3xl font-display font-bold mt-0 mb-6 flex items-center gap-3">
                  <Network className="w-8 h-8 text-orange-400" />
                  What Is a Subdomain Finder?
                </h2>
                <p>
                  A <strong>subdomain finder</strong> is an essential information security tool used to discover all the child hostnames (subdomains) mapped to a primary parent domain. In the domain name system (DNS) hierarchy described by standards such as <strong>RFC 1034</strong> and <strong>RFC 1035</strong>, subdomains are delegated segments under a root domain. For example, while <code>example.com</code> represents the root, subdomains might include <code>api.example.com</code>, <code>dev.example.com</code>, or <code>mail.example.com</code>. 
                </p>
                <p>
                  Because organizations routinely deploy new services, applications, and staging environments under separate subdomains, the public attack surface expands rapidly. A subdomain finder crawls and queries public indices, global nameservers, and certificate archives to aggregate these names, establishing a comprehensive asset inventory. For security researchers, penetration testers, and enterprise security teams, this mapping is the crucial first step in evaluating external security posture.
                </p>

                <h2 id="how-subdomain-discovery-works" className="text-3xl font-display font-bold mt-16 mb-6">How Subdomain Discovery Works</h2>
                <p>
                  Subdomain discovery maps a target domain's public boundaries using two core methodologies: <strong>Passive OSINT Aggregation</strong> and <strong>Active DNS Interrogation</strong>.
                </p>
                <p>
                  Passive discovery is stealthy and fast. It relies on querying third-party platforms that already archive public DNS and web transactions. Scanners search through historical records, search engine indexes, and Certificate Transparency ledgers to compile list segments. Because this method queries database caches rather than the target's nameservers, it leaves no trace in the target's system logs, making it ideal for the early stages of security reviews.
                </p>
                <p>
                  Active discovery, on the other hand, queries the target's authoritative nameservers directly. By sending standard DNS query packets (like <code>A</code>, <code>AAAA</code>, or <code>CNAME</code>), active scanners verify if a specific host exists. This is typically done via dictionary brute-forcing—submitting thousands of common prefixes to see which ones resolve. Active discovery is highly accurate but easily detected by network intrusion detection systems (IDS) and firewalls.
                </p>

                <h2 id="passive-vs-active-enumeration" className="text-3xl font-display font-bold mt-16 mb-6">Passive vs Active Enumeration</h2>
                <p>
                  Security teams must balance passive and active techniques to build a complete subdomain map. Let's compare their features:
                </p>
                <ul>
                  <li>
                    <strong>Passive Enumeration:</strong> Operates entirely offline relative to the target. It gathers records from <strong>Certificate Transparency logs</strong>, passive DNS archives (like Censys, Shodan, or SecurityTrails), and search engines using advanced search operators (Google Dorking). The primary advantage is speed and stealth. The disadvantage is that it can return outdated data, including subdomains that have been decommissioned.
                  </li>
                  <li>
                    <strong>Active Enumeration:</strong> Interacts directly with target infrastructure. Scanners generate variations of subdomains using wordlists and evaluate how target nameservers respond. It is essential for verifying if a domain is live and detecting wildcards (where any non-existent subdomain resolves to a default IP). However, active scanning is resource-intensive and easily blocked by rate limiting and firewalls.
                  </li>
                </ul>

                <h2 id="certificate-transparency-logs" className="text-3xl font-display font-bold mt-16 mb-6">Certificate Transparency Logs Explained</h2>
                <p>
                  Introduced via <strong>RFC 6962</strong>, the <strong>Certificate Transparency (CT)</strong> framework was designed to stop Certificate Authorities (CAs) from issuing rogue, unauthorized SSL/TLS certificates. CT requires CAs to log every certificate transaction in public, cryptographically verifiable, append-only ledgers. 
                </p>
                <p>
                  While CT logs successfully secure the Web PKI, they also serve as a public record of an organization's subdomains. The moment a developer requests an SSL certificate for a new server—such as <code>internal-billing.example.com</code>—the host is recorded in public CT logs. By parsing these logs, a subdomain finder can discover newly created hosts within seconds of certificate issuance, bypassing DNS brute-forcing entirely.
                </p>

                <h2 id="dns-based-discovery" className="text-3xl font-display font-bold mt-16 mb-6">DNS-Based Discovery Methods</h2>
                <p>
                  Standard active enumeration relies on specific DNS protocol mechanisms:
                </p>
                <ul>
                  <li>
                    <strong>DNS Zone Transfers (AXFR):</strong> Zone transfer is the protocol mechanism used to replicate DNS records across primary and secondary nameservers. If a nameserver is misconfigured to allow public AXFR requests, a scanner can download the entire DNS zone file in seconds, revealing all registered subdomains and IP addresses.
                  </li>
                  <li>
                    <strong>NSEC/NSEC3 Walking:</strong> In DNSSEC-signed zones, <code>NSEC</code> (Next Secure) records link signed zones sequentially to prove a queried host does not exist. By querying these records in sequence (NSEC walking), an auditor can map out the entire domain namespace without guessing names.
                  </li>
                  <li>
                    <strong>Reverse DNS Mapping (PTR):</strong> If an organization's servers are hosted on a specific IP range, scanning that range for reverse pointer (PTR) records can reveal the subdomains associated with those IPs.
                  </li>
                </ul>

                <h2 id="common-use-cases" className="text-3xl font-display font-bold mt-16 mb-6">Subdomain Finder Use Cases</h2>
                <p>
                  Subdomain discovery is critical across several cybersecurity workflows. Here are the primary use cases for using a subdomain finder:
                </p>
                
                <h3 className="text-xl font-bold mt-8 mb-4">1. For Security Researchers &amp; Penetration Testers</h3>
                <p>
                  During the initial reconnaissance phase of an authorized engagement, penetration testers and security researchers must map the target&apos;s external boundaries. Discovering all active host configurations helps map internal and external infrastructures, pinpoint network topologies, and locate target endpoints that may be susceptible to legacy exploits.
                </p>

                <h3 className="text-xl font-bold mt-8 mb-4">2. For Bug Bounty Hunters</h3>
                <p>
                  Ethical hackers and bug bounty hunters rely on subdomain discovery to find forgotten or unmonitored assets. Since primary domains are usually heavily secured and audited, staging subdomains, development environments, and retired campaign sites frequently host critical vulnerabilities, exposed credentials, and logic flaws.
                </p>

                <h3 className="text-xl font-bold mt-8 mb-4">3. For DevOps &amp; IT Asset Management</h3>
                <p>
                  Modern development teams utilize cloud resources that scale rapidly. A subdomain finder helps DevOps and IT managers audit corporate namespaces, identify forgotten staging servers, and discover shadow IT assets that have been launched without official security reviews.
                </p>

                <h3 className="text-xl font-bold mt-8 mb-4">4. For Brand Monitoring &amp; Protection</h3>
                <p>
                  Brand protection and security intelligence teams monitor subdomains to detect typosquatting, phishing sites, and trademark violations. By identifying rogue subdomains registered under variant names, companies can mitigate impersonation scams and execute timely takedowns.
                </p>

                <h2 id="security-risks" className="text-3xl font-display font-bold mt-16 mb-6">Security Risks of Forgotten Subdomains</h2>
                <p>
                  Leaving decommissioned or unmonitored subdomains active in your DNS configuration creates several security risks:
                </p>
                <ol>
                  <li>
                    <strong>Bypassing Content Security Policies (CSP):</strong> Many sites configure CSP headers to trust their own subdomains (e.g., <code>*.example.com</code>). If an attacker compromises a forgotten subdomain, they can use it to bypass CSP rules on the main site and execute Cross-Site Scripting (XSS) attacks.
                  </li>
                  <li>
                    <strong>Session Cookie Hijacking:</strong> Browsers often share cookies across a root domain and its subdomains. Attackers controlling a compromised subdomain can read session cookies scoped to <code>*.example.com</code>, allowing them to hijack user sessions on the main corporate application.
                  </li>
                  <li>
                    <strong>Phishing and Brand Abuse:</strong> A valid subdomain inherits the trust of the parent domain. Attackers can host phishing pages on a hijacked company subdomain, making the scams highly convincing to customers and security filters.
                  </li>
                </ol>

                <h2 id="subdomain-takeover-detection" className="text-3xl font-display font-bold mt-16 mb-6">Subdomain Takeover Detection (Dangling CNAMEs)</h2>
                <p>
                  A <strong>subdomain takeover</strong> is a critical vulnerability that occurs when a DNS record points to a deleted third-party service. 
                </p>
                <p>
                  For example, an organization might configure <code>blog.example.com</code> to point to a GitHub Pages repository using a <code>CNAME</code> record. If the company later deletes the GitHub repository but forgets to remove the CNAME record from their DNS configuration, the record is left dangling. An attacker can register a new GitHub Pages project under the same name and claim the subdomain, giving them full control over the content served at <code>blog.example.com</code>.
                </p>
                <p>
                  ReconShield's scanner checks CNAME records for these dangling configurations, matching resolved endpoints against known third-party signatures (like AWS S3, Heroku, Shopify, and Zendesk) to alert administrators of potential takeover vulnerabilities.
                </p>

                <h2 id="enterprise-best-practices" className="text-3xl font-display font-bold mt-16 mb-6">Enterprise Asset Discovery & Best Practices</h2>
                <p>
                  Organizations can secure their digital perimeters by adopting these best practices:
                </p>
                <ul>
                  <li>
                    <strong>Automate Continuous Discovery:</strong> Implement automated scanners to continuously audit CT logs and DNS records, cataloging new subdomains as soon as they are created.
                  </li>
                  <li>
                    <strong>Implement Stiff Decommissioning Workflows:</strong> Link your cloud infrastructure lifecycle with DNS management. Ensure that when a cloud bucket, VM, or SaaS subscription is deleted, the corresponding DNS record is removed immediately.
                  </li>
                  <li>
                    <strong>Use Isolated Staging Domains:</strong> Instead of hosting staging and development servers on your primary corporate domain (<code>dev.example.com</code>), host them on a separate, non-branded root domain (<code>example-dev.net</code>) to contain security exposures.
                  </li>
                </ul>

              </div>
            </div>
          </div>
        </section>

        {/* Competitor Gap Analysis & Comparison Matrix */}
        <section id="competitor-comparison" className="py-20 bg-[#0a0d14] border-b border-white/5">
          <div className="max-w-[1000px] mx-auto px-6 prose prose-invert max-w-none">
            <h2 className="text-3xl font-display font-bold text-white mb-6">Why Choose ReconShield Subdomain Finder?</h2>
            <p className="text-gray-400 mb-8">
              Analyze how ReconShield&apos;s passive subdomain finder compares to other leading tools. While CLI tools like Amass offer deep network graph capabilities, ReconShield provides web-based convenience with built-in export features and real-time CT log queries.
            </p>

            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0d1117] not-prose my-8">
              <table className="w-full text-left text-sm text-gray-400 border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.02] text-white font-mono uppercase text-xs">
                    <th className="p-4">Feature</th>
                    <th className="p-4 border-l border-white/10 text-orange-400">ReconShield</th>
                    <th className="p-4 border-l border-white/10">Sublist3r</th>
                    <th className="p-4 border-l border-white/10">Amass</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono text-xs">
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-4 font-semibold text-white">Free to Use</td>
                    <td className="p-4 border-l border-white/10 text-orange-400 font-bold">Yes (100% Free)</td>
                    <td className="p-4 border-l border-white/10">Yes</td>
                    <td className="p-4 border-l border-white/10">Yes</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-4 font-semibold text-white">Web-Based (No Installation)</td>
                    <td className="p-4 border-l border-white/10 text-orange-400 font-bold">Yes</td>
                    <td className="p-4 border-l border-white/10">No</td>
                    <td className="p-4 border-l border-white/10">No</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-4 font-semibold text-white">No Registration Required</td>
                    <td className="p-4 border-l border-white/10 text-orange-400 font-bold">Yes</td>
                    <td className="p-4 border-l border-white/10">Yes</td>
                    <td className="p-4 border-l border-white/10">Yes</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-4 font-semibold text-white">Certificate Transparency</td>
                    <td className="p-4 border-l border-white/10 text-orange-400 font-bold">Yes (Real-time logs)</td>
                    <td className="p-4 border-l border-white/10">Limited</td>
                    <td className="p-4 border-l border-white/10">Yes</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-4 font-semibold text-white">Multiple Techniques</td>
                    <td className="p-4 border-l border-white/10 text-orange-400 font-bold">Yes</td>
                    <td className="p-4 border-l border-white/10">Yes</td>
                    <td className="p-4 border-l border-white/10">Yes</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-4 font-semibold text-white">Export Results</td>
                    <td className="p-4 border-l border-white/10 text-orange-400 font-bold">Yes (PDF, CSV, JSON)</td>
                    <td className="p-4 border-l border-white/10">Yes (Text only)</td>
                    <td className="p-4 border-l border-white/10">Yes (Text/JSON)</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-4 font-semibold text-white">Real-Time Results</td>
                    <td className="p-4 border-l border-white/10 text-orange-400 font-bold">Yes</td>
                    <td className="p-4 border-l border-white/10">No</td>
                    <td className="p-4 border-l border-white/10">No</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-4 font-semibold text-white">User-Friendly Interface</td>
                    <td className="p-4 border-l border-white/10 text-orange-400 font-bold">Yes</td>
                    <td className="p-4 border-l border-white/10">No (CLI)</td>
                    <td className="p-4 border-l border-white/10">No (CLI)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* EEAT Author and Board Details */}
        <section id="expert-methodology" className="py-20 border-b border-white/5">
          <div className="max-w-[1000px] mx-auto px-6">
            
            <div className="flex flex-col md:flex-row items-center gap-8 p-8 bg-gradient-to-r from-[#0d1117] to-surface-900 border border-white/10 rounded-3xl shadow-xl mb-16 font-sans">
              <div className="w-24 h-24 rounded-full bg-[#1a2332] border-2 border-orange-500/30 flex items-center justify-center shrink-0 overflow-hidden">
                <Shield className="w-10 h-10 text-orange-400" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 px-2 py-1 rounded bg-orange-500/10 text-orange-400 text-[10px] font-mono uppercase tracking-widest mb-2">
                  <Check className="w-3 h-3" /> Fact Checked & Verified
                </div>
                <h3 className="text-white font-bold text-xl mb-1">ReconShield Research Team</h3>
                <p className="text-gray-400 text-xs font-mono uppercase tracking-wider mb-3">Reviewed by: Senior Security Researcher</p>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  This educational guide is curated by the ReconShield Research Team, a group of information security researchers specializing in attack surface management, DNS infrastructure mapping, and OSINT methodologies. 
                </p>
                <div className="flex gap-6 text-sm font-mono">
                  <span className="text-orange-400 flex items-center gap-1">Methodology: RFC-Compliant Telemetry Check</span>
                  <span className="text-orange-400 flex items-center gap-1">Data Sources: CT Logs, DNS Databases</span>
                </div>
              </div>
            </div>

            {/* Editorial Policy, Research Methodology, Fact Checking */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs text-gray-400 font-sans border-t border-white/5 pt-12">
              <div>
                <h3 className="text-white font-bold mb-3 uppercase tracking-wider font-mono text-xs">Editorial Policy</h3>
                <p className="leading-relaxed">
                  ReconShield is committed to publishing accurate, technical, and objective cybersecurity analysis. Our documentation is created by credentialed security practitioners and undergoes strict reviews before publication.
                </p>
              </div>
              <div>
                <h3 className="text-white font-bold mb-3 uppercase tracking-wider font-mono text-xs">Research Methodology</h3>
                <p className="leading-relaxed">
                  Our findings are derived from RFC protocol documentation, CA/Browser Forum standards, and verified cybersecurity databases. We avoid speculative telemetry, prioritizing primary sources and verifiable network actions.
                </p>
              </div>
              <div>
                <h3 className="text-white font-bold mb-3 uppercase tracking-wider font-mono text-xs">Fact Checking Process</h3>
                <p className="leading-relaxed">
                  Information is verified against active TLS servers, registrar configurations, and IETF specifications (including RFCs and CA/B guidelines). Each section is tested for technical accuracy under modern browser routing environments.
                </p>
              </div>
            </div>

            <div className="text-center text-[10px] font-mono text-gray-600 uppercase tracking-widest mt-12">
              Last Updated: June 11, 2026 | Reviewed by ReconShield Security Board | References: RFC 6962, RFC 1035, NIST SP 800-53, OWASP ASM
            </div>
          </div>
        </section>

        {/* Topical Authority Hub: Semantic Internal Linking Grid */}
        <section className="py-20 bg-[#05080f]" aria-label="ReconShield Resource Hub">
          <div className="max-w-[1000px] mx-auto px-6 font-sans">
            <h2 className="text-3xl font-display font-bold text-white mb-4 text-center">ReconShield Threat Hub</h2>
            <p className="text-gray-400 text-sm text-center max-w-2xl mx-auto mb-12 leading-relaxed">
              Explore our comprehensive collection of cybersecurity blogs, protocol deep-dives, and utility tools to audit and secure your external digital footprint.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Blog: What is Subdomain Enumeration */}
              <div className="p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-orange-500/20 transition-all group">
                <span className="text-[10px] font-mono text-orange-400 uppercase block mb-2 tracking-widest">Educational Article</span>
                <h3 className="text-white font-bold text-base mb-2 group-hover:text-orange-400 transition-colors">What is Subdomain Enumeration?</h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">A complete deep-dive guide covering passive registries, nameserver queries, and active dictionary brute-forcing.</p>
                <Link href="/blog/what-is-subdomain-enumeration" className="text-orange-400 text-xs font-mono inline-flex items-center gap-1 group-hover:underline">
                  Read Article <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Blog: Subdomain Takeover Guide */}
              <div className="p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-orange-500/20 transition-all group">
                <span className="text-[10px] font-mono text-orange-400 uppercase block mb-2 tracking-widest">Security Playbook</span>
                <h3 className="text-white font-bold text-base mb-2 group-hover:text-orange-400 transition-colors">Subdomain Takeover Guide</h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">Learn how to identify and remediate dangling CNAME records pointing to inactive cloud platforms.</p>
                <Link href="/blog/subdomain-takeover-guide" className="text-orange-400 text-xs font-mono inline-flex items-center gap-1 group-hover:underline">
                  Read Guide <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Blog: CT Logs Explained */}
              <div className="p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-orange-500/20 transition-all group">
                <span className="text-[10px] font-mono text-orange-400 uppercase block mb-2 tracking-widest">Protocol Analysis</span>
                <h3 className="text-white font-bold text-base mb-2 group-hover:text-orange-400 transition-colors">CT Logs Explained</h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">How Certificate Transparency log architectures work and how to query them for OSINT operations.</p>
                <Link href="/blog/certificate-transparency-logs-explained" className="text-orange-400 text-xs font-mono inline-flex items-center gap-1 group-hover:underline">
                  Read Article <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Blog: Passive vs Active Recon */}
              <div className="p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-orange-500/20 transition-all group">
                <span className="text-[10px] font-mono text-orange-400 uppercase block mb-2 tracking-widest">Recon Strategy</span>
                <h3 className="text-white font-bold text-base mb-2 group-hover:text-orange-400 transition-colors">Passive vs Active Reconnaissance</h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">Compare stealthy third-party OSINT gathering against direct port scanning and name resolution.</p>
                <Link href="/blog/passive-vs-active-reconnaissance" className="text-orange-400 text-xs font-mono inline-flex items-center gap-1 group-hover:underline">
                  Read Comparison <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Blog: Attack Surface Management Guide */}
              <div className="p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-orange-500/20 transition-all group">
                <span className="text-[10px] font-mono text-orange-400 uppercase block mb-2 tracking-widest">Enterprise Blueprint</span>
                <h3 className="text-white font-bold text-base mb-2 group-hover:text-orange-400 transition-colors">Attack Surface Management Guide</h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">Enterprise best practices to catalog, assess, and secure your public-facing internet resources.</p>
                <Link href="/blog/attack-surface-management-guide" className="text-orange-400 text-xs font-mono inline-flex items-center gap-1 group-hover:underline">
                  Read Playbook <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Blog: Best Subdomain Finder Tools */}
              <div className="p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-orange-500/20 transition-all group">
                <span className="text-[10px] font-mono text-orange-400 uppercase block mb-2 tracking-widest">Tool Comparison</span>
                <h3 className="text-white font-bold text-base mb-2 group-hover:text-orange-400 transition-colors">Best Subdomain Finder Tools</h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">A critical review of the top 10 subdomain scanners, brute-forcers, and discovery tools.</p>
                <Link href="/blog/best-subdomain-finder-tools" className="text-orange-400 text-xs font-mono inline-flex items-center gap-1 group-hover:underline">
                  Read Reviews <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>
          </div>
        </section>

        {/* Related Reconnaissance Tools */}
        <section className="py-16 bg-[#05080f] border-t border-white/5" aria-label="Related Tools">
          <div className="max-w-[1000px] mx-auto px-6">
            <h2 className="text-3xl font-display font-bold text-white mb-8 text-center">Related Reconnaissance Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Tool: WHOIS Lookup */}
              <div className="p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-orange-500/20 transition-all group">
                <Globe className="w-8 h-8 text-orange-400 mb-4" />
                <h3 className="text-white font-bold text-base mb-2 group-hover:text-orange-400 transition-colors">WHOIS Lookup Tool</h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">Query registrar data, ownership, and creation dates for root domains.</p>
                <Link href="/tools/whois" className="text-orange-400 text-xs font-mono inline-flex items-center gap-1 group-hover:underline">
                  Open Tool <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Tool: DNS Lookup */}
              <div className="p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-orange-500/20 transition-all group">
                <Database className="w-8 h-8 text-orange-400 mb-4" />
                <h3 className="text-white font-bold text-base mb-2 group-hover:text-orange-400 transition-colors">DNS Lookup Tool</h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">Resolve authoritative A, MX, TXT, and CNAME records instantly.</p>
                <Link href="/tools/dns-lookup" className="text-orange-400 text-xs font-mono inline-flex items-center gap-1 group-hover:underline">
                  Open Tool <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Tool: SSL Checker */}
              <div className="p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-orange-500/20 transition-all group">
                <Lock className="w-8 h-8 text-orange-400 mb-4" />
                <h3 className="text-white font-bold text-base mb-2 group-hover:text-orange-400 transition-colors">SSL Certificate Checker</h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">Verify SSL/TLS certificate chains, validity dates, and configurations.</p>
                <Link href="/tools/ssl-checker" className="text-orange-400 text-xs font-mono inline-flex items-center gap-1 group-hover:underline">
                  Open Tool <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Tool: Port Scanner */}
              <div className="p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-orange-500/20 transition-all group">
                <Server className="w-8 h-8 text-orange-400 mb-4" />
                <h3 className="text-white font-bold text-base mb-2 group-hover:text-orange-400 transition-colors">Port Scanner</h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">Audit active target ports and discover exposed services.</p>
                <Link href="/tools/port-scanner" className="text-orange-400 text-xs font-mono inline-flex items-center gap-1 group-hover:underline">
                  Open Tool <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>
          </div>
        </section>

        {/* FAQ Accordion Section */}
        <section id="faq" className="py-20 border-t border-white/5 bg-[#0a0d14]" aria-labelledby="faq-title">
          <div className="max-w-[900px] mx-auto px-6">
            <h2 id="faq-title" className="text-3xl font-display font-bold text-white mb-10 text-center">Frequently Asked Questions About Subdomain Enumeration</h2>
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
