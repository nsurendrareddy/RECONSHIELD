import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { 
  Shield, Globe, Server, Lock, Terminal, CheckCircle2, ChevronRight, 
  Search, Activity, Target, Network, Info, Check, AlertTriangle, 
  FileText, Send, HelpCircle, BookOpen, Key, Database, Clock
} from 'lucide-react';
import { generateBaseMetadata } from '@/utils/metadata';

const ToolScannerClient = dynamic(() => import('@/components/ToolScannerClient'), {
  loading: () => <div className="min-h-[400px] animate-pulse bg-surface-900/50 rounded-3xl max-w-5xl mx-auto my-12" />
});

export const metadata = generateBaseMetadata({
  title: "Subdomain Finder Tool (Free) | Discover Hidden Subdomains",
  description: "Find subdomains, analyze attack surfaces, and discover hidden assets using ReconShield's free Subdomain Finder tool.",
  path: "/tools/subdomain-finder"
});

export default function SubdomainFinderPage() {
  const faqs = [
    {
      q: "What is a subdomain finder?",
      a: "A subdomain finder is a digital reconnaissance tool used to discover and map subdomains associated with a primary domain. It parses public records, search engine indexes, and Certificate Transparency logs to build a complete inventory of an organization's public-facing assets."
    },
    {
      q: "How do I find subdomains?",
      a: "You can find subdomains by entering a domain name into the ReconShield Subdomain Finder. The scanner queries Certificate Transparency databases and DNS datasets passively to retrieve all active host configurations without sending direct network requests to the target."
    },
    {
      q: "What is subdomain enumeration?",
      a: "Subdomain enumeration is the process of identifying all subdomains associated with a root domain. It is a fundamental step in penetration testing and bug bounty hunting, designed to uncover hidden or forgotten servers hosting web applications."
    },
    {
      q: "What is attack surface discovery?",
      a: "Attack surface discovery is the practice of identifying all public-facing assets, including subdomains, IP addresses, open ports, and active services, that could be targeted by attackers. It helps organizations understand their exposure and secure weak points."
    },
    {
      q: "What is passive subdomain enumeration?",
      a: "Passive subdomain enumeration gathers subdomain information from third-party databases, historical DNS records, and SSL/TLS certificate transparency logs without interacting directly with the target. This ensures the reconnaissance is stealthy and does not trigger security alerts."
    },
    {
      q: "What is certificate transparency?",
      a: "Certificate Transparency (CT) is an open framework requiring Certificate Authorities to publish every issued SSL/TLS certificate to public logs. Security researchers query these logs to discover new hostnames, staging sites, and public endpoints."
    },
    {
      q: "What is a subdomain takeover?",
      a: "A subdomain takeover occurs when a domain's DNS record (such as a CNAME) points to an external service provider that has been deleted or expired. An attacker can register that workspace to host malicious content under the trusted domain."
    },
    {
      q: "What is active subdomain discovery?",
      a: "Active subdomain discovery interacts directly with the target domain's nameservers, using DNS dictionary attacks or brute-force guessing to identify active subdomains. While thorough, this method can trigger intrusion detection systems."
    },
    {
      q: "Why are dev and staging subdomains high risk?",
      a: "Development and staging subdomains often run pre-release code, debug features, or unpatched databases. Because they are rarely monitored as strictly as production sites, they serve as easy access points for threat actors."
    },
    {
      q: "How does CNAME routing affect subdomains?",
      a: "CNAME records route subdomains to external services like cloud hosting or SaaS platforms. If the target service is removed but the CNAME remains, the subdomain becomes vulnerable to a takeover attack."
    },
    {
      q: "What is wildcard DNS resolution?",
      a: "Wildcard DNS resolution configuration maps any non-existent subdomain query to a single default IP address. This can complicate dictionary-based active enumeration, making passive CT log parsing more reliable."
    },
    {
      q: "What tools perform active subdomain enumeration?",
      a: "Popular tools for active subdomain enumeration include amass, subfinder, and gobuster. These utilities combine active brute-forcing with API integrations to resolve domain namespaces, though they require manual CLI execution."
    },
    {
      q: "How does ASN correlation aid discovery?",
      a: "Autonomous System Number (ASN) correlation matches resolved subdomain IPs to the hosting provider's network block. This allows security teams to map the global cloud footprint of an organization."
    },
    {
      q: "How do I secure my domain from takeovers?",
      a: "To secure domains against takeovers, maintain a strict inventory of all active DNS records. Immediately delete any CNAME or A records when the underlying hosting service or cloud workspace is deactivated."
    },
    {
      q: "What is technology fingerprinting?",
      a: "Technology fingerprinting analyzes HTTP response headers, SSL metadata, and HTML source files of discovered subdomains to identify the web server, CMS, or framework in use, highlighting outdated versions."
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
          "name": "Subdomain Finder Tool (Free) | Discover Hidden Subdomains",
          "isPartOf": { "@id": "https://reconshield.in/#website" }
        },
        {
          "@type": "SoftwareApplication",
          "@id": "https://reconshield.in/tools/subdomain-finder#software",
          "name": "ReconShield Subdomain Enumerator",
          "url": "https://reconshield.in/tools/subdomain-finder",
          "description": "Free subdomain discovery application to query public transparency logs, resolve active subdomains, and identify external security exposure.",
          "applicationCategory": "SecurityApplication",
          "operatingSystem": "All",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "publisher": { "@id": "https://reconshield.in/#organization" }
        },
        {
          "@type": "WebApplication",
          "@id": "https://reconshield.in/tools/subdomain-finder#webapp",
          "name": "ReconShield Subdomain Finder App",
          "url": "https://reconshield.in/tools/subdomain-finder",
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
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-900 border border-white/10 text-gray-400 text-xs font-mono uppercase tracking-widest mb-6 shadow-sm">
            <Network className="w-4 h-4 text-orange-400" />
            <span>Passive Infrastructure Reconnaissance Module</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 tracking-tight">
            Subdomain Finder Tool
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

      {/* AI Overview / Featured Snippet Optimization */}
      <section className="py-12 bg-[#05080f] border-b border-white/5" aria-label="AI Search Overview">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="bg-gradient-to-r from-orange-500/5 to-amber-500/5 border border-orange-500/10 rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 blur-[50px] rounded-full pointer-events-none" />
            
            {/* Definition Block: What Is a Subdomain Finder? */}
            <h2 className="font-mono text-xs text-orange-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4 text-orange-400" /> AI Overview Snippet: Subdomain Discovery & Mapping
            </h2>
            <div className="space-y-6 text-sm text-gray-300 font-sans leading-relaxed">
              <div>
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Definition Block: What Is a Subdomain Finder?</span>
                <p className="text-gray-300">
                  A <strong>Subdomain Finder</strong> is a cybersecurity reconnaissance tool designed to identify and catalog all subdomains of a target domain. It aggregates data from public registries, search engine caches, and Certificate Transparency (CT) logs, establishing a domain asset inventory.
                </p>
              </div>

              {/* Definition Block: What Is Subdomain Enumeration? */}
              <div className="border-t border-white/5 pt-4">
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Definition Block: What Is Subdomain Enumeration?</span>
                <p className="text-gray-300">
                  <strong>Subdomain enumeration</strong> is the security process of mapping a target's active subdomain namespace. It uncovers secondary and tertiary hosts, helping organizations identify forgotten staging environments, legacy APIs, and misconfigured DNS records.
                </p>
              </div>

              {/* Definition Block: What Is Attack Surface Discovery? */}
              <div className="border-t border-white/5 pt-4">
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Definition Block: What Is Attack Surface Discovery?</span>
                <p className="text-gray-300">
                  <strong>Attack surface discovery</strong> is the practice of mapping all public-facing digital assets (hostnames, IPs, open ports) linked to an organization. This mapping exposes security exposures like shadow IT before threat actors can locate and target them.
                </p>
              </div>

              {/* Definition Block: How Are Hidden Subdomains Found? */}
              <div className="border-t border-white/5 pt-4">
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Definition Block: How Are Hidden Subdomains Found?</span>
                <p className="text-gray-300">
                  Hidden subdomains are resolved by scanning Certificate Transparency logs, parsing search engine indexing parameters, and executing dictionary checks against DNS nameservers. Passive scans rely on historical certificate data to identify hosts without triggering alerts.
                </p>
              </div>
              
              {/* TLDR Section & Key Takeaways */}
              <div className="border-t border-white/5 pt-4">
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// TL;DR Section</span>
                <p className="text-gray-400 text-xs font-mono">
                  Subdomain finders map public network perimeters by aggregating Certificate Transparency logs, search engine footprints, and DNS datasets. This passive discovery provides asset visibility and helps security teams identify outdated testing sites.
                </p>
              </div>

              <div className="border-t border-white/5 pt-4">
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Key Takeaways</span>
                <ul className="list-disc pl-5 text-gray-400 text-xs space-y-2 font-mono">
                  <li><strong>CT Log Tracking:</strong> CAs must log every issued SSL/TLS certificate, making CT logs a valuable source for subdomain discovery.</li>
                  <li><strong>Active vs Passive:</strong> Passive searches query databases; active searches interact with target servers.</li>
                  <li><strong>Takeover Security:</strong> Dangling CNAME records on deleted hosting services leave subdomains vulnerable to takeover.</li>
                  <li><strong>Staging Targets:</strong> Testing subdomains are frequently less secure than main sites.</li>
                </ul>
              </div>

              {/* Fact Box: Common Subdomain Discovery Techniques */}
              <div className="border-t border-white/5 pt-4">
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
              <div className="border-t border-white/5 pt-4">
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Expert Summary</span>
                <p className="text-gray-400 text-xs leading-relaxed font-sans">
                  Mapping subdomains is a critical starting point for external network audits. Passive discovery techniques gather essential asset data without alerting target servers, allowing defenders to identify and secure legacy endpoints and misconfigured DNS records before attackers can exploit them.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Differentiation Grid */}
      <section className="py-16 bg-[#0a0d14] border-b border-white/5" aria-label="Feature Differentiation">
        <div className="max-w-[1000px] mx-auto px-6">
          <h2 className="text-2xl font-display font-bold text-white mb-8 text-center">ReconShield Subdomain Finder Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 not-prose">
            <div className="p-5 bg-surface-900 border border-white/5 rounded-2xl">
              <Shield className="w-6 h-6 text-orange-400 mb-3" />
              <h4 className="text-white text-xs font-bold font-mono uppercase tracking-wider mb-2">Attack Surface Score</h4>
              <p className="text-gray-400 text-[11px] leading-relaxed">Evaluates your external perimeter risk based on host counts, active SSL configurations, and hosting diversity.</p>
            </div>
            <div className="p-5 bg-surface-900 border border-white/5 rounded-2xl">
              <Clock className="w-6 h-6 text-orange-400 mb-3" />
              <h4 className="text-white text-xs font-bold font-mono uppercase tracking-wider mb-2">Takeover Detection</h4>
              <p className="text-gray-400 text-[11px] leading-relaxed">Scans CNAME targets for inactive cloud workspaces, flagging subdomains vulnerable to takeover attacks.</p>
            </div>
            <div className="p-5 bg-surface-900 border border-white/5 rounded-2xl">
              <Activity className="w-6 h-6 text-orange-400 mb-3" />
              <h4 className="text-white text-xs font-bold font-mono uppercase tracking-wider mb-2">Live Host Detection</h4>
              <p className="text-gray-400 text-[11px] leading-relaxed">Verifies DNS resolution for discovered hostnames in real-time, filtering out dead or inactive entries.</p>
            </div>
            <div className="p-5 bg-surface-900 border border-white/5 rounded-2xl">
              <Terminal className="w-6 h-6 text-orange-400 mb-3" />
              <h4 className="text-white text-xs font-bold font-mono uppercase tracking-wider mb-2">ASN Correlation</h4>
              <p className="text-gray-400 text-[11px] leading-relaxed">Maps resolved subdomain IPs to hosting provider network blocks, revealing your global cloud footprint.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Educational Guide */}
      <div className="bg-[#05080f]">
        
        {/* H2: What Is a Subdomain Finder? */}
        <section className="py-20 border-b border-white/5">
          <div className="max-w-[1000px] mx-auto px-6 prose prose-invert max-w-none prose-p:leading-relaxed prose-p:text-gray-400 prose-headings:text-white prose-a:text-orange-400 hover:prose-a:text-orange-300">
            
            <h2 className="text-3xl font-display font-bold mt-0 mb-6 flex items-center gap-3">
              <Network className="w-8 h-8 text-orange-400" />
              What Is a Subdomain Finder?
            </h2>
            <p>
              A <strong>Subdomain Finder</strong> is a security intelligence utility designed to discover and catalog subdomains associated with a primary root domain. These tools are widely used in penetration testing, bug bounty hunting, and attack surface management to compile a complete list of an organization's public-facing assets.
            </p>

            {/* H2: How Subdomain Discovery Works */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">How Subdomain Discovery Works</h2>
            <p>
              Subdomain discovery uses both passive and active techniques to scan domain namespaces:
            </p>
            <ol>
              <li><strong>Passive Data Harvesting:</strong> Queries public databases, search engine caches, and Certificate Transparency (CT) logs. Since it doesn't interact directly with target servers, it leaves no trace in their logs.</li>
              <li><strong>Active Target Resolution:</strong> Sends DNS queries directly to the target domain's nameservers, using brute-force dictionaries or zone transfers to verify active subdomains.</li>
            </ol>

            {/* H2: What Is Subdomain Enumeration? */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">What Is Subdomain Enumeration?</h2>
            <p>
              <strong>Subdomain enumeration</strong> is the structured process of mapping a target's active subdomain namespace. In cybersecurity audits, this mapping identifies forgotten staging environments, pre-release APIs, and legacy servers that may still be accessible to the public.
            </p>

            {/* H2: Passive vs Active Subdomain Enumeration */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">Passive vs Active Subdomain Enumeration</h2>
            <p>
              Understanding the differences between passive and active enumeration is key to planning a security assessment:
            </p>
            <ul>
              <li><strong>Passive Enumeration:</strong> Fast, stealthy, and reliant on third-party data. It is ideal for initial assessments, though it may include inactive historical records.</li>
              <li><strong>Active Enumeration:</strong> Accurate and thorough, but noisy. It sends DNS queries directly to target nameservers, which can trigger network security alerts.</li>
            </ul>

            {/* H2: Why Organizations Monitor Subdomains */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">Why Organizations Monitor Subdomains</h2>
            <p>
              Security perimeters expand quickly as new marketing campaigns, development environments, and third-party integrations are deployed. Continuous monitoring helps organizations:
            </p>
            <ul>
              <li>Identify and decommission forgotten servers (**shadow IT**).</li>
              <li>Prevent unauthorized subdomain registration.</li>
              <li>Maintain compliance with data protection regulations by securing exposed endpoints.</li>
            </ul>

            {/* H2: Subdomain Discovery for Attack Surface Management */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">Subdomain Discovery for Attack Surface Management</h2>
            <p>
              Attack surface management involves identifying and securing all public-facing assets. Subdomain discovery is a core part of this process, helping security teams map their perimeters and identify potential vulnerabilities before they are exploited.
            </p>

            {/* H2: Subdomain Discovery for OSINT Investigations */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">Subdomain Discovery for OSINT Investigations</h2>
            <p>
              In open-source intelligence (OSINT) investigations, subdomains reveal details about an organization's digital footprint, including hosting providers, mail servers, and external software integrations.
            </p>

            {/* H2: Subdomain Discovery for Bug Bounty Programs */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">Subdomain Discovery for Bug Bounty Programs</h2>
            <p>
              Bug bounty hunters use subdomain discovery to find less-secure staging environments, API perimeters, or internal wikis, which are more likely to contain software vulnerabilities than the main corporate site.
            </p>

            {/* H2: Certificate Transparency and Subdomain Discovery */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">Certificate Transparency and Subdomain Discovery</h2>
            <p>
              Under **Certificate Transparency (CT)** standards, CAs must publish every issued SSL/TLS certificate to public logs. Security researchers query these logs to discover new subdomains and track changes to domain perimeters.
            </p>

            {/* H2: DNS-Based Subdomain Enumeration */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">DNS-Based Subdomain Enumeration</h2>
            <p>
              DNS enumeration techniques query target nameservers using common host dictionary lists. While effective, wildcard DNS settings can complicate these scans by routing all queries to a default IP.
            </p>

            {/* H2: How Security Teams Find Hidden Assets */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">How Security Teams Find Hidden Assets</h2>
            <p>
              Security teams combine passive searches, active brute-forcing, and DNS zone transfers to build a complete inventory of an organization's subdomains and identify hidden assets.
            </p>

            {/* H2: Subdomain Takeover Risks */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">Subdomain Takeover Risks</h2>
            <p>
              A **subdomain takeover** occurs when a CNAME record points to an inactive third-party cloud service. If the workspace is deleted but the DNS entry remains, attackers can claim the resource and host malicious content under the trusted domain.
            </p>

            {/* H2: Common Subdomain Security Issues */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">Common Subdomain Security Issues</h2>
            <p>
              Common subdomain security issues include:
            </p>
            <ul>
              <li>Outdated software running on staging environments.</li>
              <li>Exposed debug endpoints and administrative portals.</li>
              <li>Dangling CNAME records pointing to expired third-party services.</li>
            </ul>

            {/* H2: Attack Surface Monitoring Best Practices */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">Attack Surface Monitoring Best Practices</h2>
            <p>
              Maintain a secure digital perimeter by implementing these best practices:
            </p>
            <ol>
              <li>Maintain a centralized inventory of all subdomains and DNS records.</li>
              <li>Audit DNS zones regularly to identify and remove dangling CNAME records.</li>
              <li>Perform continuous passive scans to discover unauthorized or forgotten host perimeters.</li>
            </ol>

            {/* H2: How to Investigate Discovered Subdomains */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">How to Investigate Discovered Subdomains</h2>
            <p>
              After discovering subdomains, security teams should:
            </p>
            <ul>
              <li>Perform DNS resolution checks to verify active hosts.</li>
              <li>Audit HTTP response headers and SSL certificates to identify running software.</li>
              <li>Scan exposed ports to locate open services and database endpoints.</li>
            </ul>

          </div>
        </section>

        {/* Alternatives Matrix */}
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

        {/* E-E-A-T section (Phase 9) */}
        <section className="py-20 border-b border-white/5">
          <div className="max-w-[1000px] mx-auto px-6">
            
            <div className="flex flex-col md:flex-row items-center gap-8 p-8 bg-gradient-to-r from-[#0d1117] to-surface-900 border border-white/10 rounded-3xl shadow-xl mb-16 font-sans">
              <div className="w-24 h-24 rounded-full bg-[#1a2332] border-2 border-orange-500/30 flex items-center justify-center shrink-0 overflow-hidden">
                <Shield className="w-10 h-10 text-orange-400" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 px-2 py-1 rounded bg-orange-500/10 text-orange-400 text-[10px] font-mono uppercase tracking-widest mb-2">
                  <Check className="w-3 h-3" /> Fact Checked & Verified
                </div>
                <h4 className="text-white font-bold text-xl mb-1">Surendra Reddy</h4>
                <p className="text-gray-400 text-xs font-mono uppercase tracking-wider mb-3">Cybersecurity Researcher & Founder, ReconShield</p>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  Surendra is an information security researcher focusing on attack surface discovery, DNS vulnerability analysis, and OSINT methodology. He built ReconShield to provide accessible reconnaissance utilities for bug hunters and security administrators.
                </p>
                <div className="flex gap-6 text-sm font-mono">
                  <a href="https://linkedin.com/in/surendrareddy3" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 flex items-center gap-1">LinkedIn <ChevronRight className="w-3 h-3"/></a>
                  <a href="https://github.com/nsurendrareddy" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white flex items-center gap-1">GitHub <ChevronRight className="w-3 h-3"/></a>
                </div>
              </div>
            </div>

            {/* Editorial Policy, Research Methodology, Fact Checking */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs text-gray-400 font-sans border-t border-white/5 pt-12">
              <div>
                <h5 className="text-white font-bold mb-3 uppercase tracking-wider font-mono">Editorial Policy</h5>
                <p className="leading-relaxed">
                  ReconShield is committed to publishing accurate, technical, and objective cybersecurity analysis. Our documentation is created by credentialed security practitioners and undergoes strict reviews before publication.
                </p>
              </div>
              <div>
                <h5 className="text-white font-bold mb-3 uppercase tracking-wider font-mono">Research Methodology</h5>
                <p className="leading-relaxed">
                  Our findings are derived from RFC protocol documentation, CA/Browser Forum standards, and verified cybersecurity databases. We avoid speculative telemetry, prioritizing primary sources and verifiable network actions.
                </p>
              </div>
              <div>
                <h5 className="text-white font-bold mb-3 uppercase tracking-wider font-mono">Fact Checking Process</h5>
                <p className="leading-relaxed">
                  Information is verified against active TLS servers, registrar configurations, and IETF specifications (including RFCs and CA/B guidelines). Each section is tested for technical accuracy under modern browser routing environments.
                </p>
              </div>
            </div>

            <div className="text-center text-[10px] font-mono text-gray-600 uppercase tracking-widest mt-12">
              Last Updated: June 2026 | Reviewed by ReconShield Security Board | Reference: Certificate Transparency log database (RFC 6962), OWASP, NIST, CISA
            </div>
          </div>
        </section>

        {/* Semantic Internal Links (Phase 7 - Internal Linking) */}
        <section className="py-20 bg-[#05080f]" aria-label="Related Security Tools">
          <div className="max-w-[1000px] mx-auto px-6">
            <h2 className="text-3xl font-display font-bold text-white mb-10 text-center">Audit Your Threat Surface</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* WHOIS Lookup Link */}
              <Link href="/tools/whois" className="p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-cyan-500/30 transition-all group">
                <Globe className="w-8 h-8 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-white font-bold text-lg mb-2">WHOIS Lookup</h4>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">Analyze domain registration records, registrar details, ownership, and administrative locks using our WHOIS Lookup tool.</p>
                <span className="text-cyan-400 text-xs font-mono flex items-center gap-1">Run WHOIS Check <ChevronRight className="w-3 h-3"/></span>
              </Link>
              
              {/* IP Lookup Link */}
              <Link href="/tools/ip-lookup" className="p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-purple-500/30 transition-all group">
                <Network className="w-8 h-8 text-purple-400 mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-white font-bold text-lg mb-2">IP Reputation Checker</h4>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">Analyze host reputation, threat tags, and ISP subnet details using our IP reputation checker.</p>
                <span className="text-purple-400 text-xs font-mono flex items-center gap-1">Run IP Scan <ChevronRight className="w-3 h-3"/></span>
              </Link>

              {/* DNS Lookup Link */}
              <Link href="/tools/dns-lookup" className="p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-orange-500/30 transition-all group">
                <Database className="w-8 h-8 text-orange-400 mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-white font-bold text-lg mb-2">DNS Records Auditor</h4>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">Extract and verify authoritative MX, TXT, A, and CAA records to prevent routing configuration gaps using our DNS records auditor.</p>
                <span className="text-orange-400 text-xs font-mono flex items-center gap-1">Audit DNS Records <ChevronRight className="w-3 h-3"/></span>
              </Link>

              {/* SSL Checker Link */}
              <Link href="/tools/ssl-checker" className="p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-cyan-500/30 transition-all group">
                <Lock className="w-8 h-8 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-white font-bold text-lg mb-2">SSL/TLS Checker</h4>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">Audit cryptographic validity, certificate expiry, and handshake errors using our SSL/TLS Checker.</p>
                <span className="text-cyan-400 text-xs font-mono flex items-center gap-1">Validate SSL <ChevronRight className="w-3 h-3"/></span>
              </Link>

              {/* Port Scanner Link */}
              <Link href="/tools/port-scanner" className="p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-red-500/30 transition-all group">
                <Terminal className="w-8 h-8 text-red-400 mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-white font-bold text-lg mb-2">Exposed Port Scanner</h4>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">Identify open port states, service tags, and firewall leaks with our Exposed Port Scanner.</p>
                <span className="text-red-500 text-xs font-mono flex items-center gap-1">Scan Ports <ChevronRight className="w-3 h-3"/></span>
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
