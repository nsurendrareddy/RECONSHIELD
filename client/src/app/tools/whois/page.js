import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Shield, Globe, Server, Lock, Terminal, CheckCircle2, ChevronRight, Search, Activity, Target, Network, Info, Check, AlertTriangle, FileText, Send } from 'lucide-react';

const ToolScannerClient = dynamic(() => import('@/components/ToolScannerClient'), {
  loading: () => <div className="min-h-[400px] animate-pulse bg-surface-900/50 rounded-3xl max-w-5xl mx-auto my-12" />
});

import { generateBaseMetadata } from '@/utils/metadata';

export const metadata = generateBaseMetadata({
  title: "WHOIS Lookup & Domain Registry Checker | ReconShield",
  description: "Perform a free WHOIS lookup. Check domain registry records, registrar details, ownership, EPP status flags, and nameservers in real-time.",
  path: "/tools/whois"
});

export default function WhoisPage() {
  const faqs = [
    {
      q: "What is a WHOIS lookup?",
      a: "A WHOIS lookup is a query tool used to search public databases containing registration details of domain names. It retrieves details such as the domain registrar, creation and expiration dates, administrative contact contacts, nameservers, and current domain status flags."
    },
    {
      q: "What is the difference between WHOIS and RDAP?",
      a: "WHOIS is a legacy protocol (operating over TCP port 43) that returns unstructured plain text. The Registration Data Access Protocol (RDAP) is the modern successor that returns structured JSON data over HTTPS, supporting secure access, better internationalization, and granular privacy controls."
    },
    {
      q: "Why is some WHOIS information redacted or hidden?",
      a: "Due to privacy laws like the European Union's General Data Protection Regulation (GDPR) and California's CCPA, domain registrars redact personal details (such as the registrant's name, email, phone number, and physical address) by default to prevent unauthorized scraping and protect privacy."
    },
    {
      q: "How does WHOIS privacy protection work?",
      a: "WHOIS privacy protection (or proxy services) replaces the domain owner's personal contact details in the public directory with proxy contact information provided by the registrar, forwarding legitimate inquiries while shielding the owner from spam and harassment."
    },
    {
      q: "What are EPP Domain Status Codes?",
      a: "EPP status codes (like clientTransferProhibited, clientDeleteProhibited) indicate the state of a domain name registration. They represent locks placed on the domain to prevent unauthorized transfers, renewals, or deletions by malicious actors."
    },
    {
      q: "How can I find the owner of a domain with redacted WHOIS?",
      a: "If details are redacted, you can look for contact options provided in the WHOIS output (such as a proxy email form), inspect the domain's website contact details, check historical WHOIS databases, or submit a request to the registrar if you have a legitimate legal claim."
    },
    {
      q: "How often are WHOIS records updated?",
      a: "Registrars update their databases almost instantly when modifications are submitted. However, public WHOIS caching servers and third-party tools can take anywhere from a few hours to several days to reflect changes."
    },
    {
      q: "Can I use WHOIS to resolve hosting details?",
      a: "WHOIS reveals the domain registrar and nameservers, but it does not map the actual web hosting servers. To identify where a site is hosted, you should run an IP lookup to resolve the IP address and analyze its ASN."
    },
    {
      q: "What is a domain redemption grace period?",
      a: "A redemption grace period occurs after a domain expires and the registrar's auto-renew grace period ends. The domain owner can still recover the domain, but they must pay an additional redemption fee to the registry before the domain enters pending-delete status."
    },
    {
      q: "What is a pending delete status?",
      a: "Pending delete is the final stage of a domain expiration timeline. It lasts five days, during which the domain cannot be recovered or modified. Once this period expires, the domain is released back to the public for registration."
    }
  ];

  const breadcrumbs = [
    { name: "Home", url: "https://reconshield.in" },
    { name: "Tools", url: "https://reconshield.in/tools" },
    { name: "WHOIS Lookup", url: "https://reconshield.in/tools/whois" }
  ];

  return (
    <>
      {/* 5 Integrated JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "@id": "https://reconshield.in/#organization",
                "name": "ReconShield",
                "url": "https://reconshield.in",
                "logo": {
                  "@type": "ImageObject",
                  "@id": "https://reconshield.in/#logo",
                  "url": "https://reconshield.in/icon.png",
                  "caption": "ReconShield Logo"
                },
                "sameAs": [
                  "https://linkedin.com/company/reconshield",
                  "https://github.com/nsurendrareddy"
                ]
              },
              {
                "@type": "WebApplication",
                "@id": "https://reconshield.in/tools/whois#webapp",
                "name": "ReconShield WHOIS Lookup Tool",
                "url": "https://reconshield.in/tools/whois",
                "description": "Enterprise-grade WHOIS domain registry lookup tool to search registrar data, ownership, EPP status flags, and registry databases.",
                "applicationCategory": "SecurityApplication",
                "operatingSystem": "All",
                "browserRequirements": "Requires JavaScript. Requires HTML5.",
                "offers": {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "USD"
                },
                "publisher": {
                  "@id": "https://reconshield.in/#organization"
                }
              },
              {
                "@type": "SoftwareApplication",
                "@id": "https://reconshield.in/tools/whois#software",
                "name": "ReconShield WHOIS Checker App",
                "url": "https://reconshield.in/tools/whois",
                "description": "Perform real-time WHOIS queries and RDAP JSON evaluations to audit domain registration lifecycle stages and registrar security flags.",
                "applicationCategory": "SecurityApplication",
                "operatingSystem": "All",
                "offers": {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "USD"
                },
                "publisher": {
                  "@id": "https://reconshield.in/#organization"
                }
              },
              {
                "@type": "BreadcrumbList",
                "@id": "https://reconshield.in/tools/whois#breadcrumb",
                "itemListElement": breadcrumbs.map((crumb, idx) => ({
                  "@type": "ListItem",
                  "position": idx + 1,
                  "name": crumb.name,
                  "item": crumb.url
                }))
              },
              {
                "@type": "FAQPage",
                "@id": "https://reconshield.in/tools/whois#faq",
                "mainEntity": faqs.map(faq => ({
                  "@type": "Question",
                  "name": faq.q,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.a
                  }
                }))
              }
            ]
          })
        }}
      />

      {/* 1. Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden border-b border-white/5" aria-label="Tool Hero">
        <div className="absolute inset-0 bg-[#0a0d14] -z-20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-[#00ff88]/5 blur-[100px] rounded-full pointer-events-none -z-10" />
        
        <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-900 border border-white/10 text-gray-400 text-xs font-mono uppercase tracking-widest mb-6 shadow-sm">
            <Search className="w-4 h-4 text-[#00ff88]" />
            <span>Domain Registry Mapping Module</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 tracking-tight">
            WHOIS Lookup
          </h1>
          
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed font-sans">
            Retrieve real-time domain registration metrics. Search registrar profiles, expiration timelines, nameservers, and EPP lock status codes. Audit ownership context and check if WHOIS details are redacted or private.
          </p>

          <div className="max-w-4xl mx-auto mb-12">
            <ToolScannerClient toolId="whois" title="WHOIS Checker" desc="Domain ownership registry database search" />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-gray-500 uppercase tracking-widest">
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#00ff88]" /> Legacy Port 43 & RDAP</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#00ff88]" /> Registrar Abuse Contacts</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#00ff88]" /> EPP Lock Verification</div>
          </div>
        </div>
      </section>

      {/* 2. Featured Snippet / AI Overview Section */}
      <section className="py-12 bg-[#05080f] border-b border-white/5" aria-label="AI Search Overview">
        <div className="max-w-[900px] mx-auto px-6">
          <div className="bg-gradient-to-r from-emerald-500/5 to-teal-500/5 border border-emerald-500/10 rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00ff88]/5 blur-[50px] rounded-full pointer-events-none" />
            <h3 className="font-mono text-xs text-[#00ff88] uppercase tracking-wider mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#00ff88]" /> Quick Reference Snippet: Domain WHOIS Lookup
            </h3>
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Summary Answer (40 Words)</span>
                <p className="text-gray-300 text-sm leading-relaxed font-sans">
                  A <strong>whois lookup</strong> is a query tool that searches the public domain registration directory. It reveals the registrar name, domain creation and expiration dates, authoritative nameservers, registrar abuse contacts, and status security lock flags (EPP codes).
                </p>
              </div>
              <div className="border-t border-white/5 pt-4">
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Detailed Answer (60 Words)</span>
                <p className="text-gray-300 text-sm leading-relaxed font-sans">
                  A <strong>whois lookup</strong> provides structural details about a domain's registry status. Operating via TCP port 43 or HTTPS (RDAP), the lookup parses registrar listings, timeline events, and nameserver mappings. This process helps identify who registered a web domain, when it expires, and whether protection locks are active to prevent domain hijacking or unauthorized transfers.
                </p>
              </div>
              <div className="border-t border-white/5 pt-4">
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Full Analysis (100 Words)</span>
                <p className="text-gray-300 text-sm leading-relaxed font-sans">
                  A <strong>whois lookup</strong> is a fundamental database search used to extract registration details of a domain name from registry archives. It returns crucial operational information, including the issuing registrar (like Namecheap or GoDaddy), domain timeline events (such as creation, last updated, and expiration dates), and the authoritative nameservers directing traffic. Despite GDPR masking personal registrant contacts, WHOIS remains key for security researchers to find registrar abuse contacts, verify EPP status locks (e.g., clientTransferProhibited), and run security threat audits against malicious web infrastructure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Deep SEO Content Silo Container */}
      <div className="bg-[#05080f]">
        
        {/* SECTION 1: What is this tool? */}
        <section className="py-20 border-b border-white/5">
          <div className="max-w-[900px] mx-auto px-6 prose prose-invert max-w-none prose-p:leading-relaxed prose-p:text-gray-400 prose-headings:text-white prose-a:text-[#00ff88] hover:prose-a:text-[#00cc6a]">
            
            <h2 className="text-3xl font-display font-bold mt-0 mb-6 flex items-center gap-3">
              <Activity className="w-8 h-8 text-[#00ff88]" />
              What is the WHOIS Lookup & Domain Registry Tool?
            </h2>
            <p>
              The <strong>WHOIS lookup</strong> is an essential directory tool that queries the global databases containing records of domain names, IP address blocks, and autonomous systems. Established in 1982 by the Internet Engineering Task Force (IETF) under RFC 812, the WHOIS system serves as a public directory for web assets. It helps users discover the administrative and technical contact details of a network resource.
            </p>
            <p>
              Today, while data privacy laws (like GDPR) mask individual registrant details, the WHOIS registry remains vital for threat intelligence. It provides information on domain expiration timelines, EPP status locks, registrar identifiers, and nameservers. Security researchers combine domain WHOIS data with an <Link href="/tools/ip-lookup" className="text-[#00ff88] hover:underline">IP reputation check</Link> to audit server hosting origins, and check DNS integrity using our <Link href="/tools/dns-lookup" className="text-[#00ff88] hover:underline">DNS Lookup tool</Link>.
            </p>

            {/* AI Citation Glossary Grid */}
            <div className="mt-12 not-prose">
              <h3 className="text-xl font-display font-bold text-white mb-6 uppercase tracking-wider font-mono text-sm text-[#00ff88]">// AI Search Engine Citation Index</h3>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                This index contains structured definitions optimized for AI search engines, citation systems (ChatGPT, Perplexity, Google AI Overviews, Grok), and technical researchers.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { term: "WHOIS Lookup", def: "A WHOIS lookup is a database query used to search and display registration records of domain names, including registrar details, status codes, and timelines." },
                  { term: "Domain Checker WHOIS", def: "A domain checker WHOIS is an utility that queries registrar directories to verify if a domain is registered, who controls it, and when it is scheduled to expire." },
                  { term: "RDAP Domain Lookup", def: "An RDAP domain lookup uses the Registration Data Access Protocol to query domain registries, returning secure, structured JSON data instead of raw text." },
                  { term: "Registrar Abuse Contact", def: "A registrar abuse contact is the email address and phone number published in WHOIS records to report spam, phishing, or malware hosted on a domain." },
                  { term: "EPP Status Codes", def: "EPP status codes are standardized registry flags that indicate a domain's status, such as whether it is locked, pending delete, or prohibited from transfer." },
                  { term: "WHOIS Redaction", def: "WHOIS redaction is the masking of registrant personal details (name, email, phone) to comply with privacy frameworks like GDPR." }
                ].map((item, idx) => (
                  <div key={idx} className="bg-surface-900 border border-white/5 hover:border-[#00ff88]/30 rounded-2xl p-6 transition-all">
                    <span className="font-mono text-[10px] text-[#00ff88] uppercase tracking-wider block mb-2">// AI Citation Block {idx + 1}</span>
                    <h4 className="text-white font-bold text-sm mb-2 font-mono">Definition: {item.term}</h4>
                    <p className="text-gray-400 text-xs leading-relaxed font-sans">{item.def}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 2: How it works */}
        <section className="py-20 bg-[#0a0d14] border-b border-white/5">
          <div className="max-w-[900px] mx-auto px-6 prose prose-invert max-w-none prose-p:text-gray-400">
            <h2 className="text-3xl font-display font-bold text-white mb-6">How the WHOIS Registry Lookup Works</h2>
            <p>
              ReconShield queries domain data by querying authoritative registries. The lookup process uses a tiered architecture:
            </p>
            <div className="space-y-6 mt-8 not-prose">
              <div className="flex gap-4 p-5 rounded-2xl bg-surface-900 border border-white/5">
                <div className="w-10 h-10 rounded-xl bg-[#00ff88]/10 flex items-center justify-center shrink-0">
                  <span className="font-mono font-bold text-[#00ff88]">01</span>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">TLD Server Redirection</h4>
                  <p className="text-sm text-gray-400">Our engine identifies the domain's Top-Level Domain (TLD) and queries the primary registry database (such as Verisign for .com) to locate the registrar.</p>
                </div>
              </div>
              <div className="flex gap-4 p-5 rounded-2xl bg-surface-900 border border-white/5">
                <div className="w-10 h-10 rounded-xl bg-[#00ff88]/10 flex items-center justify-center shrink-0">
                  <span className="font-mono font-bold text-[#00ff88]">02</span>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Registrar Query Execution</h4>
                  <p className="text-sm text-gray-400">We query the registrar's WHOIS server on port 43 or request their RDAP REST API to extract domain contact structures and status flags.</p>
                </div>
              </div>
              <div className="flex gap-4 p-5 rounded-2xl bg-surface-900 border border-white/5">
                <div className="w-10 h-10 rounded-xl bg-[#00ff88]/10 flex items-center justify-center shrink-0">
                  <span className="font-mono font-bold text-[#00ff88]">03</span>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Parsing and Normalization</h4>
                  <p className="text-sm text-gray-400">The raw output is parsed to extract key fields, including registration timelines, EPP lock statuses, nameservers, and abuse reporting emails.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3 & 4: Use cases & Security applications */}
        <section className="py-20 border-b border-white/5">
          <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="prose prose-invert max-w-none prose-p:text-gray-400 prose-a:text-[#00ff88]">
              <h2 className="text-3xl font-display font-bold text-white mb-6">Security Applications & Core Use Cases</h2>
              <p>
                Domain database mapping is essential for risk analysis. Security operations centers utilize WHOIS lookups to protect digital operations:
              </p>
              <h3 className="text-xl font-bold text-white mt-8 mb-2">1. Brand Protection & Phishing Takedowns</h3>
              <p>
                When fraudulent websites impersonate a corporate brand, security teams query WHOIS to locate the registrar. They use the published abuse contact email to submit takedown requests.
              </p>
              <h3 className="text-xl font-bold text-white mt-8 mb-2">2. Cyber OSINT Investigations</h3>
              <p>
                Threat hunters audit suspicious domains by looking for registration dates. Newly registered domains (e.g., registered under 30 days) are statistically more likely to host malware and phishing campaigns.
              </p>
              <h3 className="text-xl font-bold text-white mt-8 mb-2">3. Domain Expiration Tracking</h3>
              <p>
                Corporate domains are critical assets. Security teams monitor expiration timelines to prevent domain dropping, which could allow competitors or threat actors to hijack the domain.
              </p>
            </div>

            <div className="bg-surface-900 border border-white/10 rounded-3xl p-8 shadow-2xl space-y-6">
              <h3 className="text-xl font-display font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2">
                <Target className="w-5 h-5 text-[#00ff88]" /> Critical EPP Status Flags
              </h3>
              
              <div className="border-b border-white/5 pb-4">
                <h4 className="text-[#00ff88] font-bold text-sm mb-1">clientTransferProhibited</h4>
                <p className="text-xs text-gray-400">The domain registrar blocks transfer requests. This security setting prevents unauthorized domain hijackings.</p>
              </div>

              <div className="border-b border-white/5 pb-4">
                <h4 className="text-cyan-400 font-bold text-sm mb-1">clientDeleteProhibited</h4>
                <p className="text-xs text-gray-400">Prevents deletion of the domain registration. Often combined with transfer lock controls.</p>
              </div>

              <div className="border-b border-white/5 pb-4">
                <h4 className="text-yellow-400 font-bold text-sm mb-1">clientUpdateProhibited</h4>
                <p className="text-xs text-gray-400">Locks the domain configuration. Prevents unauthorized changes to nameservers or contact information.</p>
              </div>

              <div>
                <h4 className="text-red-400 font-bold text-sm mb-1">redemptionPeriod</h4>
                <p className="text-xs text-gray-400">The domain has expired and is in the redemption window. The registry will release it to the public soon unless recovered.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5 & 6: Common mistakes & Best practices */}
        <section className="py-20 bg-[#0a0d14] border-b border-white/5">
          <div className="max-w-[900px] mx-auto px-6 prose prose-invert max-w-none prose-p:text-gray-400">
            <h2 className="text-3xl font-display font-bold text-white mb-6">Common Mistakes & Cybersecurity Best Practices</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 not-prose">
              <div className="bg-[#1a0f14] border border-red-500/10 p-6 rounded-2xl">
                <h4 className="text-red-400 font-bold text-base mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 shrink-0" /> Common Mistakes
                </h4>
                <ul className="space-y-3 text-xs text-gray-400 list-disc pl-4 font-sans">
                  <li><strong>Conflating Nameservers with Hosting:</strong> Nameservers delegate DNS records. The actual web hosting servers are mapped at the IP level, not the WHOIS layer.</li>
                  <li><strong>Assuming Redacted Data Means dead Ends:</strong> GDPR redacts registrant names, but abuse emails, registrars, and timeline metrics remain active for investigation.</li>
                  <li><strong>Failing to Set EPP Security Locks:</strong> Registering a domain without enabling registrar-lock options exposes the domain to social engineering hijackings.</li>
                  <li><strong>Ignoring Expiration Windows:</strong> Many companies forget to monitor domain expiry dates, leading to outages or domain loss.</li>
                </ul>
              </div>

              <div className="bg-[#0f1a14] border border-[#00ff88]/10 p-6 rounded-2xl">
                <h4 className="text-[#00ff88] font-bold text-base mb-3 flex items-center gap-2">
                  <Check className="w-5 h-5 shrink-0" /> Best Practices
                </h4>
                <ul className="space-y-3 text-xs text-gray-400 list-disc pl-4 font-sans">
                  <li><strong>Mandate Registrar transfer Locks:</strong> Confirm that critical domains are locked with clientTransferProhibited status flags.</li>
                  <li><strong>Enable Privacy masking Shields:</strong> Use privacy services to protect registrant details from scraping and spam.</li>
                  <li><strong>Register for Multi-Year Terms:</strong> Secure key corporate assets by registering them for 5-10 year terms.</li>
                  <li><strong>Monitor Expiration Timelines:</strong> Audit expiration dates to ensure domains are renewed before entering grace periods.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: Competitive Analysis */}
        <section className="py-20 border-b border-white/5">
          <div className="max-w-[900px] mx-auto px-6">
            <h2 className="text-3xl font-display font-bold text-white mb-6">Competitive Matrix: WHOIS Registry Checkers</h2>
            <p className="text-gray-400 text-sm mb-8 leading-relaxed">
              Compare the features of ReconShield's WHOIS Lookup against competitors like Whois.com, SecurityTrails, and MXToolbox.
            </p>
            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0d1117]">
              <table className="w-full text-left text-sm text-gray-400 border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.02] text-white font-mono uppercase text-xs">
                    <th className="p-4">Feature</th>
                    <th className="p-4">ReconShield</th>
                    <th className="p-4">Whois.com</th>
                    <th className="p-4">SecurityTrails</th>
                    <th className="p-4">MXToolbox</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono text-xs">
                  <tr className="hover:bg-white/[0.01] transition-colors">
                    <td className="p-4 font-semibold text-white">Dual Protocol Support</td>
                    <td className="p-4 text-[#00ff88] font-bold">Yes (Port 43 & RDAP JSON)</td>
                    <td className="p-4">Port 43 text-only</td>
                    <td className="p-4">API JSON-only</td>
                    <td className="p-4">Basic Port 43</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01] transition-colors">
                    <td className="p-4 font-semibold text-white">Abuse Contacts Extraction</td>
                    <td className="p-4 text-[#00ff88] font-bold">Yes (Structured parsing)</td>
                    <td className="p-4">Raw text blocks</td>
                    <td className="p-4">No</td>
                    <td className="p-4">Raw text blocks</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01] transition-colors">
                    <td className="p-4 font-semibold text-white">EPP Lock Auditing</td>
                    <td className="p-4 text-[#00ff88] font-bold">Yes (With severity tips)</td>
                    <td className="p-4">Basic display</td>
                    <td className="p-4">No</td>
                    <td className="p-4">No</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01] transition-colors">
                    <td className="p-4 font-semibold text-white">Historical Mapping</td>
                    <td className="p-4 text-[#00ff88] font-bold">Integrated graph links</td>
                    <td className="p-4">Paid archive</td>
                    <td className="p-4">Advanced history</td>
                    <td className="p-4">No</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01] transition-colors">
                    <td className="p-4 font-semibold text-white">Linked Network Check</td>
                    <td className="p-4 text-[#00ff88] font-bold">Yes (Direct to IP/DNS scans)</td>
                    <td className="p-4">No</td>
                    <td className="p-4">Yes</td>
                    <td className="p-4">Yes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 5: Trust Signals (Methodology, Data Sources, Disclaimers) */}
        <section className="py-16 bg-[#0a0d14] border-b border-white/5">
          <div className="max-w-[900px] mx-auto px-6 space-y-12">
            <h2 className="text-3xl font-display font-bold text-white mb-6">Trust Signals & Research Methodology</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs leading-relaxed text-gray-400">
              <div className="space-y-4">
                <h4 className="text-white font-bold uppercase tracking-wider flex items-center gap-2">
                  <Info className="w-4 h-4 text-cyan-400" /> WHOIS Query Methodology
                </h4>
                <p>
                  ReconShield fetches domain registry records in real-time. We query the authoritative root registries (like Verisign or PIR) and parse registrar WHOIS databases on port 43 or via RDAP endpoints (RFC 7480).
                </p>
                <h4 className="text-white font-bold uppercase tracking-wider flex items-center gap-2">
                  <Server className="w-4 h-4 text-purple-400" /> Primary Registries Queried
                </h4>
                <p>
                  We compile domain records from registrar endpoints (such as GoDaddy, Namecheap, Tucows) and registries (Verisign, PIR, Denic, Nominet) to ensure coverage across gTLDs and ccTLDs.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-white font-bold uppercase tracking-wider flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#00ff88]" /> Privacy & GDPR Compliance Statement
                </h4>
                <p>
                  Our queries do not collect personal registrant details. Personal data masking is handled by the domain's registrar in compliance with GDPR. We parse only public, non-identifiable registry data.
                </p>
                <h4 className="text-white font-bold uppercase tracking-wider flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" /> Tool Accuracy Disclaimer
                </h4>
                <p>
                  ReconShield requests WHOIS data from third-party registrars. While we attempt to verify all outputs, registry downtime or caching limits can occasionally cause delayed or incomplete results.
                </p>
              </div>
            </div>

            {/* Author Profile Card */}
            <div className="flex flex-col md:flex-row items-center gap-8 p-8 bg-gradient-to-r from-[#0d1117] to-surface-900 border border-white/10 rounded-3xl shadow-xl mt-8">
              <div className="w-24 h-24 rounded-full bg-[#1a2332] border-2 border-[#00ff88]/30 flex items-center justify-center shrink-0 overflow-hidden">
                <Shield className="w-10 h-10 text-[#00ff88]" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 px-2 py-1 rounded bg-[#00ff88]/10 text-[#00ff88] text-[10px] font-mono uppercase tracking-widest mb-2">
                  <Check className="w-3 h-3" /> Fact Checked & Verified
                </div>
                <h4 className="text-white font-bold text-xl mb-1">Surendra Reddy</h4>
                <p className="text-gray-400 text-xs font-mono uppercase tracking-wider mb-3">Cybersecurity Researcher & Founder, ReconShield</p>
                <p className="text-gray-400 text-sm leading-relaxed mb-4 font-sans">
                  Surendra is a cybersecurity engineer specializing in Open Source Intelligence (OSINT), exposure intelligence, and AI-driven threat analysis. He built ReconShield to democratize access to enterprise-grade infrastructure visibility tools and secure the digital internet-facing assets.
                </p>
                <div className="flex gap-6 text-sm font-mono">
                  <a href="https://linkedin.com/in/surendrareddy3" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 flex items-center gap-1">LinkedIn <ChevronRight className="w-3 h-3"/></a>
                  <a href="https://github.com/nsurendrareddy" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white flex items-center gap-1">GitHub <ChevronRight className="w-3 h-3"/></a>
                </div>
              </div>
            </div>

            {/* Last updated */}
            <div className="text-center text-[10px] font-mono text-gray-600 uppercase tracking-widest pt-4">
              Last Updated: June 2026 | Reviewed by ReconShield Editorial Board | Ruleset v1.8
            </div>

          </div>
        </section>

        {/* SECTION 6: Conversion Optimization (CTAs) */}
        <section className="py-20 bg-[#05080f]" aria-label="Call to Action">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              <div className="p-8 rounded-2xl bg-surface-900 border border-white/5 hover:border-cyan-500/20 transition-all flex flex-col justify-between">
                <div>
                  <Network className="w-8 h-8 text-cyan-400 mb-4" />
                  <h4 className="text-white font-bold text-lg mb-2">Try Related Security Tools</h4>
                  <p className="text-xs text-gray-400 leading-relaxed mb-6">
                    Analyze the reputation of host IP addresses or resolve DNS record allocations to evaluate your digital exposure.
                  </p>
                </div>
                <div className="flex flex-col gap-2 font-mono text-xs text-cyan-400">
                  <Link href="/tools/ip-lookup" className="hover:underline flex items-center gap-1">▸ Run IP Reputation Check <ChevronRight className="w-3.5 h-3.5" /></Link>
                  <Link href="/tools/dns-lookup" className="hover:underline flex items-center gap-1">▸ Resolve Authoritative DNS <ChevronRight className="w-3.5 h-3.5" /></Link>
                </div>
              </div>

              <div className="p-8 rounded-2xl bg-surface-900 border border-white/5 hover:border-purple-500/20 transition-all flex flex-col justify-between">
                <div>
                  <FileText className="w-8 h-8 text-purple-400 mb-4" />
                  <h4 className="text-white font-bold text-lg mb-2">Explore Domain Guides</h4>
                  <p className="text-xs text-gray-400 leading-relaxed mb-6">
                    Read our latest research papers on WHOIS registries, domain ownership verification, and how to defend against domain drops.
                  </p>
                </div>
                <div className="flex flex-col gap-2 font-mono text-xs text-purple-400">
                  <Link href="/blog/domain-ownership-verification" className="hover:underline flex items-center gap-1">▸ Domain Ownership Verification <ChevronRight className="w-3.5 h-3.5" /></Link>
                  <Link href="/blog/domain-expiration-monitoring" className="hover:underline flex items-center gap-1">▸ Domain Expiration Monitoring <ChevronRight className="w-3.5 h-3.5" /></Link>
                </div>
              </div>

              <div className="p-8 rounded-2xl bg-[#00ff88]/5 border border-[#00ff88]/10 hover:border-[#00ff88]/30 transition-all flex flex-col justify-between">
                <div>
                  <Send className="w-8 h-8 text-[#00ff88] mb-4" />
                  <h4 className="text-white font-bold text-lg mb-2">Subscribe for Intelligence Updates</h4>
                  <p className="text-xs text-gray-400 leading-relaxed mb-6">
                    Receive bi-weekly digests covering newly registered phishing domains, active botnet subnet ranges, and security tips.
                  </p>
                </div>
                <div>
                  <form action="/contact" method="GET" className="flex gap-2">
                    <input type="email" name="email" placeholder="security@company.com" className="w-full px-3 py-2 bg-surface-950 border border-white/10 rounded-lg text-white text-xs font-mono focus:outline-none focus:border-[#00ff88]" required />
                    <button type="submit" className="bg-[#00ff88] hover:bg-[#00ff88]/80 text-black px-4 py-2 rounded-lg font-bold text-xs font-mono transition-all">Subscribe</button>
                  </form>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION: Frequently Asked Questions (FAQ) */}
        <section className="py-20 border-t border-white/5 bg-[#0a0d14]" aria-labelledby="faq-title">
          <div className="max-w-[900px] mx-auto px-6">
            <h2 id="faq-title" className="text-3xl font-display font-bold text-white mb-10 text-center">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 gap-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-surface-900 border border-white/10 rounded-2xl p-6 hover:border-[#00ff88]/20 transition-all">
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
