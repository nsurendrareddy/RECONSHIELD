import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { 
  Shield, Globe, Server, Lock, Terminal, CheckCircle2, ChevronRight, 
  Search, Activity, Target, Network, Info, Check, AlertTriangle, 
  FileText, Send, HelpCircle, BookOpen, Key, Database, Clock, ArrowRight, ExternalLink,
  Layers, Users, ShieldAlert, Cpu, SearchCode
} from 'lucide-react';
import { generateBaseMetadata } from '@/utils/metadata';

const ToolScannerClient = dynamic(() => import('@/components/ToolScannerClient'), {
  loading: () => <div className="min-h-[400px] animate-pulse bg-surface-900/50 rounded-3xl max-w-5xl mx-auto my-12" />
});

export const metadata = generateBaseMetadata({
  title: "Free WHOIS Lookup - Check Domain Owner & IP | ReconShield",
  description: "Free WHOIS lookup tool to check domain ownership, registration dates, IP details & nameservers. Instant results. No registration required.",
  path: "/tools/whois"
});

export default function WhoisPage() {
  const faqs = [
    {
      q: "What is a WHOIS lookup?",
      a: "A WHOIS lookup is a public query tool that searches domain registrar databases to retrieve ownership details, registration status, administrative contacts, creation and expiration dates, and nameservers. It is widely used by cybersecurity teams for threat attribution, brand protection, and network audits."
    },
    {
      q: "What is the difference between WHOIS and RDAP?",
      a: "WHOIS is a legacy query-response protocol (port 43) that returns unstructured plain-text reports. The Registration Data Access Protocol (RDAP) is the modern RESTful successor returning structured JSON over HTTPS, facilitating programmatic access control, enhanced security via TLS, and internationalization."
    },
    {
      q: "How does WHOIS privacy protection work?",
      a: "WHOIS privacy protection (or proxy shielding) replaces a domain owner's personal contacts, such as name, email, phone, and address, with proxy credentials provided by the registrar. It hides personally identifiable information from crawlers while forwarding legitimate technical inquiries."
    },
    {
      q: "What are EPP status codes in WHOIS records?",
      a: "Extensible Provisioning Protocol (EPP) status codes indicate the current administrative state of a domain name registration. Codes like clientTransferProhibited and clientUpdateProhibited act as security locks, preventing unauthorized transfers, deletions, or DNS updates by hijackers."
    },
    {
      q: "How can I find the owner of a domain with redacted WHOIS?",
      a: "If contact details are redacted due to GDPR privacy, you can submit an ownership query using the registrar's public email form or abuse address found in the WHOIS output. Alternatively, you can check historical WHOIS databases or request details via legal dispute policies."
    },
    {
      q: "What is domain redemption grace period?",
      a: "The redemption grace period is a 30-day window occurring after a domain has expired and passed the registrar's auto-renew grace period. During this phase, the original owner can still recover the domain by paying a registry-specified redemption fee before deletion."
    },
    {
      q: "What is pending delete status?",
      a: "Pending delete is the final 5-day phase in the domain expiration lifecycle. During this time, the domain is locked at the registry, and no updates or recovery actions can be performed. Upon completion, the domain drops back to the public pool."
    },
    {
      q: "How do security researchers use WHOIS for threat hunting?",
      a: "Threat hunters check creation dates and registrar history. Newly registered domains (NRDs) under 30 days old are highly correlated with command-and-control networks, phishing sites, and malvertising loops because they lack historical reputation marks on static firewalls."
    },
    {
      q: "Why is domain age an important security indicator?",
      a: "Domain age measures how long a domain has been registered. Older domains have established traffic history and email reputation, whereas brand-new domains mimicking reputable companies are immediate security anomalies often utilized in business email compromise (BEC) attacks."
    },
    {
      q: "What is a Reverse WHOIS lookup?",
      a: "A Reverse WHOIS query searches registry databases for domains sharing identical owner names, email addresses, or administrative IDs. Investigators use it to trace all assets registered by a threat actor or to monitor trademark infringements."
    },
    {
      q: "How can I identify the web host of a domain using WHOIS?",
      a: "WHOIS records list nameservers defining the domain's DNS authority, but they do not disclose the web host. To identify the host, run an IP lookup or DNS query to resolve the A record, then trace the hosting provider's ASN."
    },
    {
      q: "What is the role of ICANN in WHOIS governance?",
      a: "The Internet Corporation for Assigned Names and Numbers (ICANN) coordinates the global DNS and IP address systems. ICANN establishes policies for registries and registrars, enforcing rules like accuracy in registration records and the transition to RDAP databases."
    },
    {
      q: "How often are public WHOIS records updated?",
      a: "While registrar databases update in real-time when modifications occur, third-party WHOIS clients, public mirrors, and local network cache systems may take anywhere from 12 hours to several days to synchronize and display updated registry parameters."
    },
    {
      q: "What does the 'No Match' WHOIS error mean?",
      a: "A 'No Match' error in a WHOIS lookup output indicates that the domain name is currently not registered in the queried TLD registry. This means the domain is available for registration by the public."
    },
    {
      q: "How do EPP status codes protect against domain hijacking?",
      a: "EPP locks (like clientTransferProhibited) disable automated registrar-to-registrar transfers. If a hijacker compromises a registrant's account, they cannot move the domain to a different registrar without verifying the removal of the EPP status code first."
    },
    {
      q: "What is a thick vs. thin WHOIS registry?",
      a: "A thick registry stores all registration data, including registrant contacts, administrative details, and technical contacts in the registry database. A thin registry only contains basic operational data like nameservers, status codes, and managing registrar referrals, requiring a second lookup to get contact information."
    },
    {
      q: "What is the role of IANA in domain registrations?",
      a: "The Internet Assigned Numbers Authority (IANA) manages the DNS root zone database, allocating IP blocks and coordinating the assignment of Top-Level Domains (TLDs) like .com, .net, and .org. It acts as the root registry pointing to authoritative registries."
    },
    {
      q: "Can a domain owner sue for a WHOIS privacy leak?",
      a: "Yes, under privacy laws like GDPR and CCPA, if a registrar exposes personally identifiable information (PII) without consent or due to a security breach, the domain owner can hold the registrar liable for regulatory penalties and civil damages."
    },
    {
      q: "How do you check if an IP address is malicious using WHOIS data?",
      a: "Check the IP block owner (ASN) and registration country. If the IP is owned by a hosting provider known for bulletproof hosting or resides in a region associated with threat actors, and has short registration history, it may be a proxy or botnet node."
    },
    {
      q: "What is the relationship between WHOIS data and search engine optimization (SEO)?",
      a: "Search engines may use domain age, ownership stability, and registry history as minor signals of trust. A domain with frequent ownership changes or short registration durations may be scrutinized, while older, stable domains generally have higher authority."
    },
    {
      q: "What is the Uniform Domain-Name Dispute-Resolution Policy (UDRP)?",
      a: "The UDRP is a process established by ICANN to resolve disputes over the registration of domain names. It allows trademark holders to challenge bad-faith registrations (cybersquatting) through administrative proceedings rather than litigating in court."
    },
    {
      q: "How do bad actors abuse WHOIS data for spamming and phishing?",
      a: "Scammers crawl public WHOIS databases to harvest unredacted phone numbers, emails, and physical addresses. They use this data to target owners with domain renewal scams, phishing links, and unsolicited telemarketing campaigns."
    }
  ];

  const breadcrumbs = [
    { name: "Home", url: "https://reconshield.in" },
    { name: "Tools", url: "https://reconshield.in/tools" },
    { name: "WHOIS Lookup", url: "https://reconshield.in/tools/whois" }
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
          "@id": "https://reconshield.in/tools/whois#webpage",
          "url": "https://reconshield.in/tools/whois",
          "name": "WHOIS Lookup Tool | Free Domain Owner & IP Registry Checker | ReconShield",
          "isPartOf": { "@id": "https://reconshield.in/#website" }
        },
        {
          "@type": "SoftwareApplication",
          "@id": "https://reconshield.in/tools/whois#software",
          "name": "ReconShield WHOIS Checker",
          "url": "https://reconshield.in/tools/whois",
          "image": "https://reconshield.in/icon.png",
          "description": "Enterprise-grade WHOIS domain registry lookup tool to search registrar data, ownership, EPP status flags, and registry databases.",
          "applicationCategory": "UtilitiesApplication",
          "operatingSystem": "Web-based",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "publisher": { "@id": "https://reconshield.in/#organization" }
        },
        {
          "@type": "WebApplication",
          "@id": "https://reconshield.in/tools/whois#webapp",
          "name": "ReconShield RDAP Checker",
          "url": "https://reconshield.in/tools/whois",
          "image": "https://reconshield.in/icon.png",
          "description": "Perform real-time WHOIS queries and RDAP JSON evaluations to audit domain registration lifecycle stages.",
          "applicationCategory": "SecurityApplication",
          "operatingSystem": "All",
          "browserRequirements": "Requires JavaScript. Requires HTML5.",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "publisher": { "@id": "https://reconshield.in/#organization" }
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
          "@type": "TechArticle",
          "@id": "https://reconshield.in/tools/whois#article",
          "headline": "The Enterprise Guide to WHOIS Protocols, RDAP Registries, and Domain Forensic Investigations",
          "description": "An in-depth, authoritative analysis of the WHOIS database protocol, domain registration lifecycles, and network forensic workflows for cybersecurity experts.",
          "datePublished": "2026-06-01T00:00:00Z",
          "dateModified": "2026-06-12T08:35:00Z",
          "author": { "@type": "Person", "name": "Surendra Reddy" },
          "publisher": { "@id": "https://reconshield.in/#organization" },
          "url": "https://reconshield.in/tools/whois",
          "isPartOf": { "@id": "https://reconshield.in/tools/whois#webpage" }
        },
        {
          "@type": "HowTo",
          "@id": "https://reconshield.in/tools/whois#howto",
          "name": "How to check domain ownership using WHOIS",
          "description": "A step-by-step guide on how to perform a WHOIS lookup and interpret the registration results.",
          "step": [
            { "@type": "HowToStep", "name": "Enter Domain", "text": "Enter the domain name (e.g., example.com) into the WHOIS search bar." },
            { "@type": "HowToStep", "name": "Run Query", "text": "Click 'Search' to initiate the query to the authoritative root registries and parsers." },
            { "@type": "HowToStep", "name": "Analyze Data", "text": "Review the extracted registrar information, expiration dates, nameservers, and EPP status codes." }
          ],
          "isPartOf": { "@id": "https://reconshield.in/tools/whois#webpage" }
        },
        {
          "@type": "FAQPage",
          "@id": "https://reconshield.in/tools/whois#faq",
          "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": { "@type": "Answer", "text": faq.a }
          })),
          "isPartOf": { "@id": "https://reconshield.in/tools/whois#webpage" }
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
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-[#00ff88]/5 blur-[100px] rounded-full pointer-events-none -z-10" />
        
        <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-center">
          {/* Breadcrumb Trail */}
          <nav aria-label="Breadcrumbs" className="mb-6 inline-block">
            <ol className="flex items-center gap-2 text-xs font-mono text-gray-500">
              <li><Link href="/" className="hover:text-[#00ff88] transition-colors">Home</Link></li>
              <li><ChevronRight className="w-3 h-3 text-gray-700" /></li>
              <li><Link href="/tools" className="hover:text-[#00ff88] transition-colors">Tools</Link></li>
              <li><ChevronRight className="w-3 h-3 text-gray-700" /></li>
              <li className="text-[#00ff88] font-semibold">WHOIS Lookup</li>
            </ol>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-900 border border-white/10 text-gray-400 text-xs font-mono uppercase tracking-widest mb-6 shadow-sm">
            <Search className="w-4 h-4 text-[#00ff88]" />
            <span>Domain Registry Mapping Module</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 tracking-tight">
            Free WHOIS Lookup Tool - Check Domain Owner & IP Information
          </h1>
          
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-6 leading-relaxed font-sans">
            Retrieve real-time domain registration metrics. Search registrar profiles, expiration timelines, nameservers, and EPP lock status codes. Audit ownership context and check if WHOIS details are redacted or private.
          </p>

          <div className="flex items-center justify-center gap-4 text-xs font-mono text-gray-500 mb-10 border-y border-white/5 py-2 max-w-xl mx-auto">
            <span>Published: June 1, 2026</span>
            <span className="text-gray-700">•</span>
            <span>Last Updated: June 12, 2026</span>
            <span className="text-gray-700">•</span>
            <span className="text-[#00ff88]">Fact Checked</span>
          </div>

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

      {/* AI Overview / Featured Snippet Optimization */}
      <section className="py-12 bg-[#05080f] border-b border-white/5" aria-label="AI Search Overview">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="bg-gradient-to-r from-emerald-500/5 to-teal-500/5 border border-emerald-500/10 rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00ff88]/5 blur-[50px] rounded-full pointer-events-none" />
            
            <h2 className="font-mono text-xs text-[#00ff88] uppercase tracking-wider mb-6 flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#00ff88]" /> AI Overview Snippet: WHOIS Database & Protocols
            </h2>
            <div className="space-y-6 text-sm text-gray-300 font-sans leading-relaxed">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Definition: What is WHOIS Lookup?</span>
                  <p className="text-gray-300 text-sm">
                    A <strong>whois lookup</strong> is a query-response database transaction that retrieves registration profile records of a domain name from registry databases. It reveals the domain registrar, registration timeline, and nameservers.
                  </p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Definition: How to find a Domain Owner?</span>
                  <p className="text-gray-300 text-sm">
                    To perform a <strong>domain owner lookup</strong>, input the address in a <strong>whois checker</strong>. While GDPR masks personal details, you can locate abuse emails and contact web forms to reach the holder.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-white/5 pt-6">
                <div>
                  <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Definition: What is a WHOIS database?</span>
                  <p className="text-gray-300 text-sm">
                    The <strong>whois database</strong> is a decentralized directory maintained by registrars and registries. ICANN rules govern this data to verify network responsibility and technical points of contact.
                  </p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Definition: What is RDAP?</span>
                  <p className="text-gray-300 text-sm">
                    An <strong>rdap lookup</strong> queries the modern, secure RESTful successor protocol. Designed by the IETF, RDAP returns structured JSON payloads over HTTPS, facilitating automation and security.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-white/5 pt-6">
                <div>
                  <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Definition: What is Reverse WHOIS?</span>
                  <p className="text-gray-300 text-sm">
                    A <strong>reverse whois</strong> search matches a contact's email, name, or phone number against registry records to list all domains they registered. It is crucial for network footprints and attack tracing.
                  </p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Definition: How is it used in Threat Intelligence?</span>
                  <p className="text-gray-300 text-sm">
                    <strong>Cybersecurity whois</strong> and <strong>threat intelligence whois</strong> databases allow SOC analysts to audit domain age, identify newly registered domains (NRDs), and catalog malicious subnets.
                  </p>
                </div>
              </div>
              
              <div className="border-t border-white/5 pt-6">
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// TL;DR Section</span>
                <p className="text-gray-400 text-xs font-mono">
                  WHOIS queries allow administrators and threat hunters to verify domain registration details. Modern systems use RDAP for structured outputs. Privacy mandates like GDPR redaction mask direct contact information, making fallback technical fields and historical records essential.
                </p>
              </div>

              <div className="border-t border-white/5 pt-6">
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Key Takeaways</span>
                <ul className="list-disc pl-5 text-gray-400 text-xs space-y-2 font-mono">
                  <li><strong>Registry Standard:</strong> Port 43 WHOIS is transitioning to RESTful HTTPS-based RDAP format.</li>
                  <li><strong>Security Audits:</strong> EPP locks (like clientTransferProhibited) prevent domain hijacking.</li>
                  <li><strong>Forensics:</strong> High correlation exists between brand-new domains and threat infrastructure.</li>
                  <li><strong>GDPR Impact:</strong> Redacted fields require checking DNS SOA tags or corporate documents for attribution.</li>
                </ul>
              </div>

              {/* Fact Box: WHOIS Protocol Specifications */}
              <div className="border-t border-white/5 pt-6">
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Fact Box: WHOIS & RDAP Specs</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono text-gray-400 mt-2">
                  <div>
                    <span className="text-[10px] text-gray-600 uppercase block">Port & Transport:</span>
                    <span>TCP Port 43 (WHOIS) / HTTPS 443 (RDAP)</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-600 uppercase block">Standards:</span>
                    <span>RFC 3912 (WHOIS) / RFC 7480-7485 (RDAP)</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-600 uppercase block">Data Structure:</span>
                    <span>Plain Unstructured Text / Structured JSON</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-600 uppercase block">Governance:</span>
                    <span>ICANN Policies & Registry Consensus</span>
                  </div>
                </div>
              </div>

              {/* Expert Summary */}
              <div className="border-t border-white/5 pt-6">
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Expert Summary</span>
                <p className="text-gray-400 text-xs leading-relaxed font-sans">
                  From an enterprise attack surface viewpoint, a WHOIS query is not a basic phone directory lookup. It is a critical layer of infrastructure lineage. Analyzing registrar history, registration lifecycles, and EPP status lock indicators allows security teams to verify domain authenticity, perform passive threat mapping, and track trademark assets.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Differentiation Grid */}
      <section className="py-16 bg-[#0a0d14] border-b border-white/5" aria-label="Feature Differentiation">
        <div className="max-w-[1000px] mx-auto px-6">
          <h2 className="text-2xl font-display font-bold text-white mb-8 text-center">ReconShield WHOIS Lookup Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 not-prose">
            <div className="p-5 bg-surface-900 border border-white/5 rounded-2xl">
              <Layers className="w-6 h-6 text-[#00ff88] mb-3" />
              <h3 className="text-white text-xs font-bold font-mono uppercase tracking-wider mb-2">Dual Lookup Engine</h3>
              <p className="text-gray-400 text-[11px] leading-relaxed">Runs standard port 43 WHOIS requests combined with modern REST-based RDAP JSON lookups to extract maximum data.</p>
            </div>
            <div className="p-5 bg-surface-900 border border-white/5 rounded-2xl">
              <Clock className="w-6 h-6 text-[#00ff88] mb-3" />
              <h3 className="text-white text-xs font-bold font-mono uppercase tracking-wider mb-2">Age and Timeline Tracking</h3>
              <p className="text-gray-400 text-[11px] leading-relaxed">Calculates domain age and maps the registration dates to pinpoint newly registered domains (NRDs) that present threat vectors.</p>
            </div>
            <div className="p-5 bg-surface-900 border border-white/5 rounded-2xl">
              <Lock className="w-6 h-6 text-[#00ff88] mb-3" />
              <h3 className="text-white text-xs font-bold font-mono uppercase tracking-wider mb-2">EPP Lock Analysis</h3>
              <p className="text-gray-400 text-[11px] leading-relaxed">Audits registry security locks (like clientTransferProhibited) to verify domain status and hijack prevention configurations.</p>
            </div>
            <div className="p-5 bg-surface-900 border border-white/5 rounded-2xl">
              <ShieldAlert className="w-6 h-6 text-[#00ff88] mb-3" />
              <h3 className="text-white text-xs font-bold font-mono uppercase tracking-wider mb-2">Abuse Point Harvesting</h3>
              <p className="text-gray-400 text-[11px] leading-relaxed">Extracts abuse contact emails and registrar contact URLs, allowing security teams to submit immediate takedowns.</p>
            </div>
          </div>

          {/* Core Feature Highlights */}
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-xs font-mono text-gray-400">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.02] border border-white/5">
              <Check className="w-3.5 h-3.5 text-[#00ff88]" /> Free WHOIS Searches
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.02] border border-white/5">
              <Check className="w-3.5 h-3.5 text-[#00ff88]" /> No Registration Required
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.02] border border-white/5">
              <Check className="w-3.5 h-3.5 text-[#00ff88]" /> Bulk Lookup Support
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.02] border border-white/5">
              <Check className="w-3.5 h-3.5 text-[#00ff88]" /> Fast Results
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.02] border border-white/5">
              <Check className="w-3.5 h-3.5 text-[#00ff88]" /> Privacy Focused
            </span>
          </div>
        </div>
      </section>

      {/* Main Educational Guide */}
      <div className="bg-[#05080f]">
        
        <section className="py-20 border-b border-white/5">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
              
              {/* Sticky Table of Contents (Desktop) */}
              <aside className="hidden lg:block lg:col-span-1 sticky top-24 self-start border-r border-white/5 pr-6">
                <div className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-[#00ff88]" />
                  <span>On This Page</span>
                </div>
                <nav className="space-y-3 font-sans text-xs">
                  <a href="#what-is-whois" className="block text-gray-400 hover:text-[#00ff88] transition-colors py-0.5">What Is WHOIS Lookup?</a>
                  <a href="#how-whois-works" className="block text-gray-400 hover:text-[#00ff88] transition-colors py-0.5">How WHOIS Works</a>
                  <a href="#understanding-records" className="block text-gray-400 hover:text-[#00ff88] transition-colors py-0.5">Understanding WHOIS Records</a>
                  <a href="#fields-explained" className="block text-gray-400 hover:text-[#00ff88] transition-colors py-0.5">WHOIS Fields Explained</a>
                  <a href="#registration-lifecycle" className="block text-gray-400 hover:text-[#00ff88] transition-colors py-0.5">Domain Registration Lifecycle</a>
                  <a href="#whois-vs-rdap" className="block text-gray-400 hover:text-[#00ff88] transition-colors py-0.5">WHOIS vs RDAP</a>
                  <a href="#reverse-whois" className="block text-gray-400 hover:text-[#00ff88] transition-colors py-0.5">Reverse WHOIS Explained</a>
                  <a href="#cybersecurity-threat-intel" className="block text-gray-400 hover:text-[#00ff88] transition-colors py-0.5">WHOIS for Threat Intelligence</a>
                  <a href="#bug-bounty" className="block text-gray-400 hover:text-[#00ff88] transition-colors py-0.5">WHOIS for Bug Bounty</a>
                  <a href="#brand-protection" className="block text-gray-400 hover:text-[#00ff88] transition-colors py-0.5">WHOIS for Brand Protection</a>
                  <a href="#domain-investors" className="block text-gray-400 hover:text-[#00ff88] transition-colors py-0.5">WHOIS for Domain Investors</a>
                  <a href="#privacy-gdpr" className="block text-gray-400 hover:text-[#00ff88] transition-colors py-0.5">Privacy and GDPR Questions</a>
                  <a href="#benefits" className="block text-gray-400 hover:text-[#00ff88] transition-colors py-0.5">Benefits of WHOIS Lookup</a>
                  <a href="#limitations" className="block text-gray-400 hover:text-[#00ff88] transition-colors py-0.5">Limitations of WHOIS Data</a>
                  <a href="#investigation-examples" className="block text-gray-400 hover:text-[#00ff88] transition-colors py-0.5">Real-World Investigations</a>
                  <a href="#use-cases" className="block text-gray-400 hover:text-[#00ff88] transition-colors py-0.5">WHOIS Key Use Cases</a>
                  <a href="#related-tools" className="block text-gray-400 hover:text-[#00ff88] transition-colors py-0.5">Related ReconShield Tools</a>
                  <a href="#faq" className="block text-gray-400 hover:text-[#00ff88] transition-colors py-0.5">Frequently Asked Questions</a>
                </nav>
              </aside>

              {/* Prose Content */}
              <div className="lg:col-span-3 prose prose-invert max-w-none prose-p:leading-relaxed prose-p:text-gray-400 prose-headings:text-white prose-a:text-[#00ff88] hover:prose-a:text-[#00cc6a]">
                
                {/* 1. What Is WHOIS Lookup? */}
                <h2 id="what-is-whois" className="text-3xl font-display font-bold mt-0 mb-6 flex items-center gap-3">
                  <Search className="w-8 h-8 text-[#00ff88]" />
                  What Is WHOIS Lookup?
                </h2>
                <p>
                  A comprehensive WHOIS Lookup is the first step in understanding any online target. It acts as an open directory, providing critical visibility into <strong>Domain Ownership</strong>, <strong>Registration Details</strong>, <strong>IP Information</strong>, and forming a baseline for <strong>Cybersecurity Research</strong> and network investigations.
                </p>
                <p>
                  A <strong>whois lookup</strong> is a foundational database query and response protocol used to retrieve registration information and technical parameters associated with internet resources. These resources principally include domain names, IP address blocks, and Autonomous System Numbers (ASNs). Historically established at the inception of the public internet, a WHOIS query acts as a standardized directory system, enabling network engineers, security practitioners, and general users to locate the administrative, billing, and technical points of contact responsible for specific online infrastructures.
                </p>
                <p>
                  The protocol dates back to 1982, when the Internet Engineering Task Force (IETF) published <strong>RFC 812</strong>, drafted by Ken Harrenstien and Vic White of SRI International. In the early days of the ARPANET, looking up registration details was simple: a centralized directory hosted by the Network Information Center (NIC) served queries directly. As the web commercialized and decentralized, this database evolved. The Internet Corporation for Assigned Names and Numbers (ICANN) and the Internet Assigned Numbers Authority (IANA) standardized the protocol, delegating registry operations to top-level domain (TLD) managers and accredited registrars.
                </p>
                <p>
                  In modern terms, a <strong>domain whois lookup</strong> serves as the backbone for establishing ownership parameters. When you perform a query on a <strong>whois database</strong>, you access a registry&apos;s transaction logs. These logs list when the domain was registered, which organization manages it, and where complaints of malicious behavior should be directed. For security researchers, it is the primary method to start identifying who or what lies behind an active host.
                </p>
                <p>
                  The WHOIS system is decentralized. ICANN mandates that accredited registrars and registry operators maintain public databases containing registration data. A query to a <strong>whois search</strong> engine resolves the delegated chain of authority to identify the exact registrar holding the registration data. While privacy regulations like GDPR have altered what data is visible to the public, the technical indicators (such as name servers, EPP lock statuses, and registrar contact details) remain publicly accessible. By compiling this information, a <strong>whois checker</strong> produces a complete technical snapshot of the target domain, which is essential for verification, risk assessment, and active threat hunting.
                </p>
                <p>
                  Ultimately, a WHOIS lookup is not just about finding a name; it is about establishing technical accountability. When systems fail, or when malicious actors launch attacks from specific domains, WHOIS records provide the starting point for technical remediation, trademark protection, and forensic investigation. By understanding who manages the domain and where the DNS is routed, administrators can pinpoint potential vulnerabilities and coordinate with the appropriate registrars to mitigate cyber threats.
                </p>

                {/* 2. How WHOIS Works */}
                <h2 id="how-whois-works" className="text-3xl font-display font-bold mt-16 mb-6 flex items-center gap-3">
                  <Cpu className="w-8 h-8 text-[#00ff88]" />
                  How WHOIS Works
                </h2>
                <p>
                  The mechanics of a <strong>whois search</strong> operate under a straightforward client-server paradigm. The protocol (governed by <strong>RFC 3912</strong>) transmits queries over TCP port 43. When you submit a domain name to a <strong>whois checker</strong>, the client software executes a structured lookup process:
                </p>
                <div className="my-6 space-y-4 not-prose">
                  <div className="p-5 bg-surface-900 border border-white/5 rounded-2xl font-mono text-xs text-gray-300">
                    <p className="text-[#00ff88] font-bold mb-2">// THE QUERY FLOW SCHEMATIC</p>
                    <p>1. User executes query: <span className="text-white">&quot;reconshield.in&quot;</span></p>
                    <p>2. Query targets root database at IANA (whois.iana.org) to resolve TLD authority (.in).</p>
                    <p>3. IANA refers client to authoritative Registry Operator (e.g., NIXI for .in TLD).</p>
                    <p>4. Client queries Registry Operator WHOIS server.</p>
                    <p>5. Registry identifies the managing Registrar (e.g., Hostinger) and provides a referral server.</p>
                    <p>6. Client queries the Registrar&apos;s database directly to download the authoritative registration records.</p>
                  </div>
                </div>
                <p>
                  The query&apos;s path depends on whether the queried TLD uses a <strong>Thick Registry</strong> or a <strong>Thin Registry</strong> model:
                </p>
                <ul>
                  <li>
                    <strong>Thin Registry Model:</strong> Utilized by legacy TLDs like <code>.com</code> and <code>.net</code> (operated by Verisign). A thin registry database stores only basic technical indicators: authoritative DNS nameservers, creation and expiration dates, and status codes. It does not store the contact details of the registrant. To retrieve contact information, a <strong>domain registration lookup</strong> must follow a referral. The client queries the registrar&apos;s WHOIS server (e.g., GoDaddy or Namecheap) to obtain the detailed record.
                  </li>
                  <li>
                    <strong>Thick Registry Model:</strong> Used by registries like <code>.org</code>, <code>.info</code>, and many country-code TLDs (ccTLDs) like <code>.in</code>. A thick registry stores both technical data and complete contact information (registrant, administrative, billing, and technical contacts) within the central database. A single query to the registry server returns the complete record, bypassing the need for a registrar referral lookup.
                  </li>
                </ul>
                <p>
                  In addition to the standard Port 43 TCP connection, modern clients utilize the HTTP-based RESTful protocol known as RDAP (Registration Data Access Protocol) over port 443. RDAP standardizes queries by returning structured JSON payloads rather than plain, unstructured text. This prevents parser errors and makes automated threat intelligence gathering far more reliable. During a standard <strong>domain whois lookup</strong>, a hybrid scanner queries both Port 43 and the RDAP endpoint to compile a dual-source dataset.
                </p>
                <p>
                  For IP addresses and Autonomous System Numbers (ASNs), the query process is delegated to the Regional Internet Registries (RIRs). The five global RIRs—ARIN (North America), RIPE NCC (Europe/Middle East), APNIC (Asia-Pacific), LACNIC (Latin America/Caribbean), and AFRINIC (Africa)—maintain independent databases. If an analyst queries an IP block, the WHOIS client determines which RIR is responsible and directs the query to the correct registry, returning network scope, registration country, and parent ASN details.
                </p>

                {/* 3. Understanding WHOIS Records */}
                <h2 id="understanding-records" className="text-3xl font-display font-bold mt-16 mb-6 flex items-center gap-3">
                  <FileText className="w-8 h-8 text-[#00ff88]" />
                  Understanding WHOIS Records
                </h2>
                <p>
                  Raw <strong>whois records</strong> are flat, unstructured blocks of text. Unlike modern APIs that deliver data in standard JSON or XML, legacy WHOIS servers return data in a key-value layout. Keys are separated from values by colons, and sections are demarcated by carriage returns.
                </p>
                <p>
                  Because registries and registrars construct their database outputs independently, there is no single, globally standardized layout. A query on a <code>.com</code> domain may look entirely different from a query on a <code>.de</code> or <code>.jp</code> domain. To make this data readable, a modern <strong>whois checker</strong> parses the raw text block, using regular expressions to extract dates, emails, and servers into structured tables.
                </p>
                <p>
                  An unredacted, standard record is composed of several blocks:
                </p>
                <ol>
                  <li><strong>Domain Metadata:</strong> Lists the canonical domain name, its unique Registry Domain ID, and the managing registrar.</li>
                  <li><strong>Registrar Credentials:</strong> Lists the registrar&apos;s name, website, and their IANA identification number.</li>
                  <li><strong>Timeline Timestamps:</strong> Lists the date the domain was created, when it was last modified, and when the registration expires.</li>
                  <li><strong>Contact Details:</strong> Splits contacts into three roles: Registrant (the domain owner), Administrative Contact (handles business matters), and Technical Contact (manages DNS and hosting).</li>
                  <li><strong>DNS Configuration:</strong> Lists the authoritative nameservers delegated to control the domain&apos;s DNS zones.</li>
                  <li><strong>EPP Status Flags:</strong> Extensible Provisioning Protocol codes that indicate the administrative locks active on the domain.</li>
                </ol>
                <p>
                  For cybersecurity analysts, understanding the structure of these blocks is crucial for spotting anomalies. A domain claiming to represent a major financial institution but registered under a personal email address or via a consumer registrar immediately signals a phishing attempt. Furthermore, analyzing the timeline stamps can reveal &quot;domain age&quot; anomalies, where a newly registered domain is used to spoof a decades-old corporate identity.
                </p>
                <p>
                  In the context of modern privacy regulations, most contact details will display statements like &quot;REDACTED FOR PRIVACY&quot; or point to a registrar&apos;s proxy service. While this masks the individual&apos;s name, the state, country, and organization fields are often still populated. These geo-locational clues, combined with the technical contacts and registrar details, help investigators build a profile of the domain owner, even when direct PII is withheld.
                </p>

                {/* 4. WHOIS Fields Explained */}
                <h2 id="fields-explained" className="text-3xl font-display font-bold mt-16 mb-6 flex items-center gap-3">
                  <Info className="w-8 h-8 text-[#00ff88]" />
                  WHOIS Fields Explained
                </h2>
                <p>
                  To conduct a successful <strong>domain investigation</strong>, you must understand what each field in a registry record signifies. In the table below, we break down the critical fields exposed during a <strong>domain registration lookup</strong>:
                </p>

                <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0d1117] not-prose my-8">
                  <table className="w-full text-left text-xs text-gray-400 border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/[0.02] text-white font-mono uppercase text-[10px] tracking-wider">
                        <th className="p-4">Field Name</th>
                        <th className="p-4 border-l border-white/10">Typical Output Example</th>
                        <th className="p-4 border-l border-white/10">Security Significance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 font-mono text-[11px] leading-relaxed">
                      <tr className="hover:bg-white/[0.01]">
                        <td className="p-4 font-semibold text-white">Domain Name</td>
                        <td className="p-4 border-l border-white/10 text-gray-300">reconshield.in</td>
                        <td className="p-4 border-l border-white/10">The primary resource queried. Used to identify typosquatting variations.</td>
                      </tr>
                      <tr className="hover:bg-white/[0.01]">
                        <td className="p-4 font-semibold text-white">Registry Domain ID</td>
                        <td className="p-4 border-l border-white/10 text-gray-300">D412345678-IN</td>
                        <td className="p-4 border-l border-white/10">A unique string assigned by the registry to track the domain globally.</td>
                      </tr>
                      <tr className="hover:bg-white/[0.01]">
                        <td className="p-4 font-semibold text-white">Registrar IANA ID</td>
                        <td className="p-4 border-l border-white/10 text-gray-300">146 (GoDaddy)</td>
                        <td className="p-4 border-l border-white/10">The registrar&apos;s ID with ICANN. Helps identify their jurisdiction and history.</td>
                      </tr>
                      <tr className="hover:bg-white/[0.01]">
                        <td className="p-4 font-semibold text-white">Creation Date</td>
                        <td className="p-4 border-l border-white/10 text-gray-300">2026-06-01T00:00:00Z</td>
                        <td className="p-4 border-l border-white/10">Identifies domain age. Newly registered domains are immediate high-risk indicators.</td>
                      </tr>
                      <tr className="hover:bg-white/[0.01]">
                        <td className="p-4 font-semibold text-white">Registrar Abuse Contact Email</td>
                        <td className="p-4 border-l border-white/10 text-[#00ff88]">abuse@registrar.com</td>
                        <td className="p-4 border-l border-white/10">The specific address to submit abuse reports for phishing or malware hosting.</td>
                      </tr>
                      <tr className="hover:bg-white/[0.01]">
                        <td className="p-4 font-semibold text-white">Registrar Abuse Contact Phone</td>
                        <td className="p-4 border-l border-white/10 text-gray-300">+1.4805058800</td>
                        <td className="p-4 border-l border-white/10">Direct phone contact for immediate escalations regarding active cyber attacks.</td>
                      </tr>
                      <tr className="hover:bg-white/[0.01]">
                        <td className="p-4 font-semibold text-white">Registry Expiry Date</td>
                        <td className="p-4 border-l border-white/10 text-gray-300">2027-06-01T00:00:00Z</td>
                        <td className="p-4 border-l border-white/10">Indicates the lease expiration. Helps monitor domain renewal timelines.</td>
                      </tr>
                      <tr className="hover:bg-white/[0.01]">
                        <td className="p-4 font-semibold text-white">Updated Date</td>
                        <td className="p-4 border-l border-white/10 text-gray-300">2026-06-12T08:35:00Z</td>
                        <td className="p-4 border-l border-white/10">The timestamp of the last database update. Helpful to trace DNS or owner changes.</td>
                      </tr>
                      <tr className="hover:bg-white/[0.01]">
                        <td className="p-4 font-semibold text-white">Domain Status</td>
                        <td className="p-4 border-l border-white/10 text-yellow-400">clientTransferProhibited</td>
                        <td className="p-4 border-l border-white/10">EPP lock codes. Verifies if security blocks are active.</td>
                      </tr>
                      <tr className="hover:bg-white/[0.01]">
                        <td className="p-4 font-semibold text-white">Name Server</td>
                        <td className="p-4 border-l border-white/10 text-gray-300">ns1.reconshield.in</td>
                        <td className="p-4 border-l border-white/10">Identifies hosting, CDN, or DNS providers (e.g., Cloudflare, Route 53).</td>
                      </tr>
                      <tr className="hover:bg-white/[0.01]">
                        <td className="p-4 font-semibold text-white">Registrant Organization</td>
                        <td className="p-4 border-l border-white/10 text-gray-300">ReconShield Ltd.</td>
                        <td className="p-4 border-l border-white/10">The registered corporate entity. Crucial for mapping corporate parent organizations.</td>
                      </tr>
                      <tr className="hover:bg-white/[0.01]">
                        <td className="p-4 font-semibold text-white">Registrant Country</td>
                        <td className="p-4 border-l border-white/10 text-gray-300">IN</td>
                        <td className="p-4 border-l border-white/10">Geographical registration location. Flags mismatch risks for domestic targets.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p>
                  Understanding these fields is essential. For instance, the <code>Domain Status</code> field lists the active EPP codes. If it displays <code>ok</code> instead of <code>clientTransferProhibited</code>, the domain lacks transfer protection. This leaves it vulnerable to registrar-level hijackings if the account is compromised.
                </p>
                <p>
                  Additionally, the <code>Registrar Abuse Contact Email</code> field is a vital security coordinate. When threat hunters detect a phishing domain, they can bypass standard customer service channels and file an abuse complaint directly using this email. Under ICANN regulations, registrars must maintain a designated abuse point of contact and investigate legitimate reports of malicious activity. Providing this direct contact info is one of the primary reasons security teams rely on a <strong>domain owner lookup</strong>.
                </p>

                {/* 5. Domain Registration Lifecycle */}
                <h2 id="registration-lifecycle" className="text-3xl font-display font-bold mt-16 mb-6 flex items-center gap-3">
                  <Clock className="w-8 h-8 text-[#00ff88]" />
                  Domain Registration Lifecycle
                </h2>
                <p>
                  Domain names are not purchased permanently; they are leased from the registry for set durations (typically 1 to 10 years). The <strong>domain registration lookup</strong> status indicates where a domain stands in its standardized lifecycle. Understanding this timeline is crucial for domain investors and security teams monitoring expired assets:
                </p>
                <div className="bg-surface-900 border border-white/10 rounded-2xl p-6 my-8 not-prose font-mono text-xs text-gray-300 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="w-24 shrink-0 text-emerald-400 font-bold">1. Available:</span>
                    <span>The domain is open for registration by any public entity.</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-24 shrink-0 text-emerald-400 font-bold">2. Active:</span>
                    <span>Registered (1-10 years). DNS resolves, and website/email operations function normally. EPP locks can be set.</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-24 shrink-0 text-yellow-400 font-bold">3. Expired:</span>
                    <span>Auto-Renew Grace Period (0-45 days). DNS ceases resolving. Standard renewal fees apply. Owner can reclaim.</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-24 shrink-0 text-orange-400 font-bold">4. Redemption:</span>
                    <span>Redemption Grace Period (30 days). Deleted by registrar. Reclaimable only for a steep fee ($80-$250).</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-24 shrink-0 text-red-500 font-bold">5. Pending Delete:</span>
                    <span>5 days. Domain is locked at registry level, scheduled for deletion. No recovery actions allowed.</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-24 shrink-0 text-emerald-400 font-bold">6. Released:</span>
                    <span>Returned to the public pool, becoming available for registration again.</span>
                  </div>
                </div>
                <p>
                  Security teams monitor these transitions closely. Threat actors often register domains immediately after they drop back to the public pool (a practice known as drop-catching). They do this to hijack the domain&apos;s legacy search engine authority or capture incoming emails from the previous owner.
                </p>
                <p>
                  From an asset management perspective, monitoring expiration statuses prevents accidental domain loss. Large corporations manage thousands of domains, and occasionally, legacy or subsidiary domains lapse due to credit card expirations or personnel transitions. Automated trackers check the <code>Registry Expiry Date</code> and warn IT managers before a critical asset enters the redemption phase, saving the company from costly reclaim fees or the risk of competitor acquisition.
                </p>

                {/* 6. WHOIS vs RDAP */}
                <h2 id="whois-vs-rdap" className="text-3xl font-display font-bold mt-16 mb-6 flex items-center gap-3">
                  <Layers className="w-8 h-8 text-[#00ff88]" />
                  WHOIS vs RDAP
                </h2>
                <p>
                  The legacy WHOIS protocol (established by <strong>RFC 3912</strong>) has served the internet for decades, but it has significant limitations. It operates over unencrypted TCP port 43, lacks standard formatting, does not support internationalized domain names (IDNs), and cannot handle authenticated access. 
                </p>
                <p>
                  To address these issues, the IETF developed the <strong>Registration Data Access Protocol (RDAP)</strong> (standardized under <strong>RFC 7480-7485</strong>). ICANN now requires registries and registrars to support RDAP as the successor to WHOIS. An <strong>rdap lookup</strong> provides a modern approach to querying registry databases:
                </p>

                <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0d1117] not-prose my-8">
                  <table className="w-full text-left text-xs text-gray-400 border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/[0.02] text-white font-mono uppercase text-[10px] tracking-wider">
                        <th className="p-4">Feature Metric</th>
                        <th className="p-4 border-l border-white/10">Legacy WHOIS (Port 43)</th>
                        <th className="p-4 border-l border-white/10">Modern RDAP (HTTPS 443)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 font-mono text-[11px]">
                      <tr className="hover:bg-white/[0.01]">
                        <td className="p-4 font-semibold text-white">Transport Security</td>
                        <td className="p-4 border-l border-white/10 text-red-400">Plain text over TCP Port 43 (No encryption)</td>
                        <td className="p-4 border-l border-white/10 text-[#00ff88]">HTTPS with TLS encryption (Secure transit)</td>
                      </tr>
                      <tr className="hover:bg-white/[0.01]">
                        <td className="p-4 font-semibold text-white">Data Representation</td>
                        <td className="p-4 border-l border-white/10 text-red-400">Unstructured free-form text (Requires regex parser)</td>
                        <td className="p-4 border-l border-white/10 text-[#00ff88]">Structured JSON payloads (Easy API parsing)</td>
                      </tr>
                      <tr className="hover:bg-white/[0.01]">
                        <td className="p-4 font-semibold text-white">Query Redirection</td>
                        <td className="p-4 border-l border-white/10 text-gray-400">Referral texts (Variable formats)</td>
                        <td className="p-4 border-l border-white/10 text-[#00ff88]">Standard HTTP 307 redirects</td>
                      </tr>
                      <tr className="hover:bg-white/[0.01]">
                        <td className="p-4 font-semibold text-white">Access Control</td>
                        <td className="p-4 border-l border-white/10 text-red-400">All-or-nothing (No authorization layer)</td>
                        <td className="p-4 border-l border-white/10 text-[#00ff88]">Token authorization (Allows tiered access)</td>
                      </tr>
                      <tr className="hover:bg-white/[0.01]">
                        <td className="p-4 font-semibold text-white">IDN Translation</td>
                        <td className="p-4 border-l border-white/10 text-red-400">Inconsistent (Character encoding issues)</td>
                        <td className="p-4 border-l border-white/10 text-[#00ff88]">Native support for Unicode and Punycode</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  For developers, the transition to RDAP is a major improvement. Instead of writing custom text parsers for every registrar, they can use a single JSON parser. RDAP also supports token-based authentication. This allows registries to share unredacted registrant contact details with verified law enforcement and security teams, while keeping them hidden from spam crawlers.
                </p>
                <p>
                  Moreover, RDAP handles localization much better. The legacy protocol lacks an encoding negotiation framework, which leads to character corruption when displaying records with Cyrillic, Chinese, or Arabic characters. RDAP solves this by enforcing UTF-8 encoding. This guarantees that international registrar data is accurately rendered across all clients.
                </p>

                {/* 7. Reverse WHOIS Explained */}
                <h2 id="reverse-whois" className="text-3xl font-display font-bold mt-16 mb-6 flex items-center gap-3">
                  <SearchCode className="w-8 h-8 text-[#00ff88]" />
                  Reverse WHOIS Explained
                </h2>
                <p>
                  A standard WHOIS lookup is a forward query: you input a domain name, and the server returns its associated registration details. In contrast, a <strong>reverse whois</strong> search does the opposite. You input an owner&apos;s attribute—such as their name, email address, physical address, or phone number—and the database returns all domains registered with those details.
                </p>
                <p>
                  This search is highly valuable for gathering <strong>domain intelligence</strong>. If a security team discovers a phishing domain registered with the email address <code>attacker@malicious-actor.com</code>, they can run a reverse search on that email. The query reveals all other domains registered under the same address, allowing them to map out the actor&apos;s threat infrastructure and block them proactively.
                </p>
                <p>
                  However, privacy regulations like GDPR have made public reverse searches more difficult. Registrars now redact registrant emails and phone numbers from public WHOIS records by default. To bypass this, investigators use historical archives to search records indexed before GDPR was enforced, or they use premium threat intelligence databases that analyze DNS zone files and SSL metadata to link domains.
                </p>
                <p>
                  Another common workaround is searching by registrant organizations. Large corporations register hundreds of domains under their official legal names (e.g., &quot;Microsoft Corporation&quot; or &quot;Google LLC&quot;). These organizational names are rarely redacted, allowing brand protection teams and competitors to run reverse checks to identify all corporate domains and verify their configuration status.
                </p>

                {/* 8. WHOIS for Cybersecurity and Threat Intelligence */}
                <h2 id="cybersecurity-threat-intel" className="text-3xl font-display font-bold mt-16 mb-6 flex items-center gap-3">
                  <ShieldAlert className="w-8 h-8 text-[#00ff88]" />
                  WHOIS for Cybersecurity and Threat Intelligence
                </h2>
                <p>
                  In cybersecurity, WHOIS data is a critical source of infrastructure intelligence. Security Operations Centers (SOCs) and Threat Intelligence teams use it to analyze and attribute cyber attacks:
                </p>
                <ul>
                  <li>
                    <strong>Detecting Newly Registered Domains (NRDs):</strong> Threat actors register lookalike domains (typosquatting) for phishing and malware campaigns. They drop these domains after a few days to avoid reputation filters. By checking a domain&apos;s creation date, security systems can flag domains registered within the last 30 days as high-risk, applying strict email filters and web access rules.
                  </li>
                  <li>
                    <strong>Attributing Attacks:</strong> Even when contact details are redacted, investigators can look for patterns in WHOIS metadata. Using the same registrar, registrar abuse email, or nameserver structures can link phishing sites to known cybercriminal groups.
                  </li>
                  <li>
                    <strong>Mapping Subnet Exposures:</strong> Resolving the IP address of a suspicious domain and checking its IP WHOIS record reveals the owning ASN. If the IP belongs to a hosting provider known for ignoring abuse complaints (bulletproof hosting), security teams can block the provider&apos;s entire IP range.
                  </li>
                  <li>
                    <strong>SIEM Enrichment:</strong> Enterprise security teams integrate automated WHOIS lookups into their Security Information and Event Management (SIEM) pipelines. When a firewall flags an outbound connection to an unknown external domain, the SIEM automatically pulls the domain age and registrar name, allowing analysts to triage the alert based on registration risk factors.
                  </li>
                </ul>
                <p>
                  Automating these checks allows security platforms to block threats before they reach users, mitigating risk before static threat lists update.
                </p>

                {/* 9. WHOIS for Bug Bounty Hunting */}
                <h2 id="bug-bounty" className="text-3xl font-display font-bold mt-16 mb-6 flex items-center gap-3">
                  <Terminal className="w-8 h-8 text-[#00ff88]" />
                  WHOIS for Bug Bounty Hunting
                </h2>
                <p>
                  For bug bounty hunters and penetration testers, WHOIS lookups are essential for mapping an organization&apos;s attack surface during reconnaissance:
                </p>
                <ul>
                  <li>
                    <strong>Discovering Subsidiary Domains:</strong> Large organizations register hundreds of domains for acquisitions and regional sites. Searching the <code>Registrant Organization</code> field reveals these domains, expanding the hunter&apos;s scope beyond the primary corporate domain.
                  </li>
                  <li>
                    <strong>Tracking Down Staging Environments:</strong> Developers often register separate domains for testing (e.g., <code>acmetest-portal.com</code>). These sites are frequently less secure than main corporate portals and may expose debug logs or test databases.
                  </li>
                  <li>
                    <strong>Identifying Dangling CNAMEs:</strong> Checking WHOIS nameservers helps hunters identify domain hosting providers. This is the first step in detecting potential subdomain takeovers when DNS records are misconfigured.
                  </li>
                  <li>
                    <strong>Bypassing Web Application Firewalls (WAF):</strong> If a target domain is shielded behind Cloudflare or another WAF, investigators check historical WHOIS records to identify the original IP addresses and host locations registered before the WAF setup. Direct connection queries to these underlying IPs bypass the proxy filters, exposing vulnerabilities.
                  </li>
                </ul>
                <p>
                  Using historical WHOIS databases can also uncover technical contact emails registered before GDPR redaction. These legacy details help hunters map out an organization&apos;s older infrastructure.
                </p>

                {/* 10. WHOIS for Brand Protection */}
                <h2 id="brand-protection" className="text-3xl font-display font-bold mt-16 mb-6 flex items-center gap-3">
                  <Target className="w-8 h-8 text-[#00ff88]" />
                  WHOIS for Brand Protection
                </h2>
                <p>
                  Brands monitor domain registrations to protect their reputation from typosquatting and trademark abuse:
                </p>
                <ol>
                  <li>
                    <strong>Detecting Typosquatting:</strong> Bad actors register domains similar to popular brands (e.g., <code>paypa1-security.com</code> instead of <code>paypal.com</code>) to run phishing campaigns. Brand protection tools run automated WHOIS checks for these lookalike variations.
                  </li>
                  <li>
                    <strong>Locating Abuse Contacts:</strong> When an infringing domain is discovered, brand analysts extract the registrar abuse email from the WHOIS output. This allows them to submit DMCA takedown requests directly to the registrar.
                  </li>
                  <li>
                    <strong>UDRP Proceedings:</strong> Under the Uniform Domain-Name Dispute-Resolution Policy (UDRP), trademark owners can challenge bad-faith registrations. WHOIS timestamps and registrar records are crucial evidence in these administrative proceedings.
                  </li>
                  <li>
                    <strong>Monitoring Defensive Registrations:</strong> Large brands monitor expiration alerts of their own defensive domain catalogs. These are non-resolving domains registered solely to prevent trademark squatting. If a defensive registration accidentally expires, brand monitoring systems flag it immediately for renewal.
                  </li>
                </ol>
                <p>
                  Proactive brand protection helps businesses secure variations of their names before they can be exploited, protecting customer trust.
                </p>

                {/* 11. WHOIS for Domain Investors */}
                <h2 id="domain-investors" className="text-3xl font-display font-bold mt-16 mb-6 flex items-center gap-3">
                  <Database className="w-8 h-8 text-[#00ff88]" />
                  WHOIS for Domain Investors
                </h2>
                <p>
                  Domain investors (domainers) buy and sell domains as digital real estate, using WHOIS data to guide their transactions:
                </p>
                <ul>
                  <li>
                    <strong>Assessing Domain Age:</strong> Older domains have established historical backlink profiles and search engine authority, making them more valuable than brand-new domains.
                  </li>
                  <li>
                    <strong>Reaching Sellers:</strong> Even with redacted contact details, buyers can contact domain owners via the registrar&apos;s public contact forms or proxy email addresses.
                  </li>
                  <li>
                    <strong>Monitoring Domain Drops:</strong> Investors track domains entering the <code>pendingDelete</code> phase to prepare backorders using drop-catching services (like SnapNames or DropCatch) the instant the domain is released.
                  </li>
                  <li>
                    <strong>Verifying Portfolio Ownership:</strong> When acquiring large portfolios, investors run bulk WHOIS queries to confirm that all target domains are registered under the seller&apos;s name and registrar account before executing transaction agreements.
                  </li>
                </ul>
                <p>
                  Analyzing registry status updates allows domainers to negotiate purchases and time their acquisitions.
                </p>

                {/* 12. Common WHOIS Privacy and GDPR Questions */}
                <h2 id="privacy-gdpr" className="text-3xl font-display font-bold mt-16 mb-6 flex items-center gap-3">
                  <Lock className="w-8 h-8 text-[#00ff88]" />
                  Common WHOIS Privacy and GDPR Questions
                </h2>
                <p>
                  The enforcement of the European Union&apos;s General Data Protection Regulation (GDPR) in May 2018 significantly changed access to WHOIS data. To comply with GDPR, ICANN introduced a temporary specification that requires registrars to redact personally identifiable information (PII) by default.
                </p>
                <p>
                  This change creates several common questions regarding privacy:
                </p>
                <ul>
                  <li>
                    <strong>Registry Redaction vs. Paid Proxy Services:</strong> Registry-level redaction is default privacy applied by registrars for compliance. Proxy services (like WhoisGuard) replace user details with third-party details. Both protect PII, but proxy services are used globally, whereas GDPR redaction is based on location.
                  </li>
                  <li>
                    <strong>Accessing Redacted Data:</strong> Verified security teams and law enforcement can submit data disclosure requests to registrars. Registrars assess these requests under legal frameworks to share records for legitimate threat investigations.
                  </li>
                  <li>
                    <strong>Future Access Models:</strong> ICANN is developing the System for Standardized Access/Disclosure (SSAD) to centralize and speed up access requests for security professionals.
                  </li>
                  <li>
                    <strong>Impact on Legal Ownership Disputes:</strong> While GDPR obscures public owner details, trademark holders can still initiate UDRP filings. Once a dispute is filed, the authoritative registry is legally required to freeze the domain and disclose the registrant details to the arbitration panel.
                  </li>
                </ul>

                {/* 13. Benefits of WHOIS Lookup */}
                <h2 id="benefits" className="text-3xl font-display font-bold mt-16 mb-6 flex items-center gap-3">
                  <CheckCircle2 className="w-8 h-8 text-[#00ff88]" />
                  Benefits of WHOIS Lookup
                </h2>
                <p>
                  A WHOIS lookup is a valuable tool for maintaining network operations and resolving online issues:
                </p>
                <ol>
                  <li><strong>Abuse Reporting:</strong> Exposes abuse contact emails for submitting takedowns for phishing, malware, or copyright infringements.</li>
                  <li><strong>Technical Troubleshooting:</strong> Helps network admins find nameserver managers to resolve routing and DNS issues.</li>
                  <li><strong>Identity Verification:</strong> Allows businesses to verify domain ownership before transactions or SSL certificate issuance.</li>
                  <li><strong>Ownership Stability:</strong> Tracks domain history to verify that assets are securely managed and registered.</li>
                  <li><strong>Legal Accountability:</strong> Provides public technical points of contact, ensuring that domain holders can be reached regarding technical violations or legal disputes.</li>
                </ol>

                {/* 14. Limitations of WHOIS Data */}
                <h2 id="limitations" className="text-3xl font-display font-bold mt-16 mb-6 flex items-center gap-3">
                  <AlertTriangle className="w-8 h-8 text-[#00ff88]" />
                  Limitations of WHOIS Data
                </h2>
                <p>
                  While WHOIS is a key directory tool, it has several limitations:
                </p>
                <ul>
                  <li><strong>Data Accuracy:</strong> Registrars rarely verify registrant contact details, allowing users to register domains with fake names or addresses.</li>
                  <li><strong>Redaction Barriers:</strong> GDPR redaction masks contact details, requiring investigators to rely on fallback technical fields.</li>
                  <li><strong>Rate Limiting:</strong> Registrars rate-limit port 43 and web queries to prevent database scraping, requiring query rotation.</li>
                  <li><strong>No Protocol-Level History:</strong> Standard WHOIS only queries live data. Tracking ownership changes requires historical indexers that cache previous records.</li>
                </ul>

                {/* 15. Real-World WHOIS Investigation Examples */}
                <h2 id="investigation-examples" className="text-3xl font-display font-bold mt-16 mb-6 flex items-center gap-3">
                  <Activity className="w-8 h-8 text-[#00ff88]" />
                  Real-World WHOIS Investigation Examples
                </h2>
                <p>
                  Here are three real-world examples of how security analysts use WHOIS data in investigations:
                </p>

                <h3 className="text-xl font-bold mt-8 mb-4">Case Study 1: Phishing Campaign Analysis</h3>
                <p>
                  An analyst discovers a phishing email targeting their organization with links to <code>security-update-bank.com</code>. Running a WHOIS query reveals:
                </p>
                <ul>
                  <li>The domain was registered 2 hours ago.</li>
                  <li>It is registered with a cheap registrar known for transient registrations.</li>
                  <li>It uses nameservers linked to known malicious subnets.</li>
                </ul>
                <p>
                  This combination confirms a phishing attempt. The analyst extracts the abuse contact email (<code>abuse@cheap-registrar.com</code>) and submits a takedown request while blocking the domain across their network.
                </p>

                <h3 className="text-xl font-bold mt-8 mb-4">Case Study 2: Tracing a C2 Server Network</h3>
                <p>
                  During an incident response, an analyst identifies a compromised endpoint connecting to <code>c2-node-1.com</code>. A WHOIS query reveals:
                </p>
                <ul>
                  <li>The domain uses nameservers hosted on <code>ns1.malicious-dns.com</code>.</li>
                  <li>A reverse WHOIS query on the registrar IANA ID and registration patterns reveals 12 other domains using the same nameservers and registrar.</li>
                </ul>
                <p>
                  This maps the attacker&apos;s command-and-control infrastructure, allowing the security team to block all 12 domains and contain the incident.
                </p>

                <h3 className="text-xl font-bold mt-8 mb-4">Case Study 3: Uncovering Corporate Assets</h3>
                <p>
                  A brand protection analyst is tasked with verifying all domains registered by a competitor, <code>Competitor Corp</code>. Running a WHOIS query on their public domain reveals their registrant organization name. Using a reverse WHOIS search, the analyst:
                </p>
                <ul>
                  <li>Discovers 45 domains owned by the organization.</li>
                  <li>Identifies two staging domains (<code>dev-portal-competitor.com</code>) running unsecured pre-release applications.</li>
                </ul>
                <p>
                  This helps the competitor&apos;s security team identify and secure these exposed assets before they are exploited.
                </p>

                {/* WHOIS Lookup Key Use Cases */}
                <h2 id="use-cases" className="text-3xl font-display font-bold mt-16 mb-6 flex items-center gap-3">
                  <Target className="w-8 h-8 text-[#00ff88]" />
                  WHOIS Lookup Key Use Cases
                </h2>
                <p>
                  The WHOIS protocol serves as a crucial data point across various fields in network operations and security. Here are the core use cases for WHOIS lookups:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8 not-prose">
                  <div className="p-5 bg-surface-900 border border-white/5 rounded-2xl">
                    <Shield className="w-5 h-5 text-[#00ff88] mb-2" />
                    <h4 className="text-white text-xs font-bold font-mono uppercase tracking-wider mb-2">Cybersecurity</h4>
                    <p className="text-gray-400 text-[11px] leading-relaxed">
                      Analyze target configurations and identify domain anomalies to block malicious domains before attacks occur.
                    </p>
                  </div>
                  <div className="p-5 bg-surface-900 border border-white/5 rounded-2xl">
                    <Terminal className="w-5 h-5 text-[#00ff88] mb-2" />
                    <h4 className="text-white text-xs font-bold font-mono uppercase tracking-wider mb-2">Threat Intelligence</h4>
                    <p className="text-gray-400 text-[11px] leading-relaxed">
                      Map command-and-control (C2) servers, track threat actor registration footprints, and gather forensic evidence.
                    </p>
                  </div>
                  <div className="p-5 bg-surface-900 border border-white/5 rounded-2xl">
                    <Database className="w-5 h-5 text-[#00ff88] mb-2" />
                    <h4 className="text-white text-xs font-bold font-mono uppercase tracking-wider mb-2">Domain Acquisition</h4>
                    <p className="text-gray-400 text-[11px] leading-relaxed">
                      Monitor registry expiration dates, check ownership history, and identify contacts to purchase domains safely.
                    </p>
                  </div>
                  <div className="p-5 bg-surface-900 border border-white/5 rounded-2xl">
                    <Globe className="w-5 h-5 text-[#00ff88] mb-2" />
                    <h4 className="text-white text-xs font-bold font-mono uppercase tracking-wider mb-2">Brand Protection</h4>
                    <p className="text-gray-400 text-[11px] leading-relaxed">
                      Scan WHOIS records to identify copycat domains, typosquatting campaigns, and brand abuse for immediate takedowns.
                    </p>
                  </div>
                  <div className="p-5 bg-surface-900 border border-white/5 rounded-2xl md:col-span-2">
                    <Network className="w-5 h-5 text-[#00ff88] mb-2" />
                    <h4 className="text-white text-xs font-bold font-mono uppercase tracking-wider mb-2">Network Administration</h4>
                    <p className="text-gray-400 text-[11px] leading-relaxed">
                      Verify DNS zone authority, trace IP block allocations, and troubleshoot routing failures with upstream providers.
                    </p>
                  </div>
                </div>

                {/* 16. Related ReconShield Tools */}
                <h2 id="related-tools" className="text-3xl font-display font-bold mt-16 mb-6 flex items-center gap-3">
                  <Network className="w-8 h-8 text-[#00ff88]" />
                  Related ReconShield Tools
                </h2>
                <p>
                  WHOIS queries are part of a complete network audit. Use these related ReconShield tools to verify your external assets:
                </p>
                <ul>
                  <li>
                    <Link href="/tools/subdomain-finder"><strong>Subdomain Finder:</strong></Link> Discover all subdomains and map your external attack surface.
                  </li>
                  <li>
                    <Link href="/tools/dns-lookup"><strong>DNS Lookup:</strong></Link> Resolve authoritative DNS zone records (A, MX, TXT, NS) and perform reverse DNS queries.
                  </li>
                  <li>
                    <Link href="/tools/ip-lookup"><strong>IP Lookup:</strong></Link> Check IP reputation, geographical location, ISP details, and map Autonomous System Numbers (ASNs).
                  </li>
                  <li>
                    <Link href="/tools/ssl-checker"><strong>SSL Checker:</strong></Link> Verify TLS certificate validity, expiration dates, and configurations.
                  </li>
                </ul>

              </div>
            </div>
          </div>
        </section>

        {/* Competitor Gap Analysis & Comparison Matrix */}
        <section className="py-20 bg-[#0a0d14] border-b border-white/5">
          <div className="max-w-[1000px] mx-auto px-6 prose prose-invert max-w-none">
            <h2 className="text-3xl font-display font-bold text-white mb-6">WHOIS Lookup Competitor Comparison</h2>
            <p className="text-gray-400 mb-8">
              Compare ReconShield&apos;s WHOIS Lookup features with other leading registry checker platforms. While command-line tools require setup, ReconShield provides real-time web access with integrated EPP analysis and RDAP support.
            </p>

            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0d1117] not-prose my-8">
              <table className="w-full text-left text-sm text-gray-400 border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.02] text-white font-mono uppercase text-xs">
                    <th className="p-4">Registry Platform</th>
                    <th className="p-4 border-l border-white/10">RDAP Integration</th>
                    <th className="p-4 border-l border-white/10">EPP Lock Parsing</th>
                    <th className="p-4 border-l border-white/10">Abuse Email Extraction</th>
                    <th className="p-4 border-l border-white/10">Historical Lookup</th>
                    <th className="p-4 border-l border-white/10">Execution Mode</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono text-xs">
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-4 font-semibold text-white">ReconShield</td>
                    <td className="p-4 border-l border-white/10 text-[#00ff88] font-bold">Yes (Dual query)</td>
                    <td className="p-4 border-l border-white/10 text-[#00ff88] font-bold">Automated</td>
                    <td className="p-4 border-l border-white/10 text-[#00ff88] font-bold">Yes</td>
                    <td className="p-4 border-l border-white/10 text-red-400">No (Stealth focus)</td>
                    <td className="p-4 border-l border-white/10">Web App (Instant)</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-4 font-semibold text-white">WHOIS.com</td>
                    <td className="p-4 border-l border-white/10 text-red-400">No (Legacy)</td>
                    <td className="p-4 border-l border-white/10 text-red-400">Raw text</td>
                    <td className="p-4 border-l border-white/10">No (Manual search)</td>
                    <td className="p-4 border-l border-white/10 text-red-400">No</td>
                    <td className="p-4 border-l border-white/10">Web App (Ads)</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-4 font-semibold text-white">DomainTools</td>
                    <td className="p-4 border-l border-white/10 text-[#00ff88] font-bold">Yes</td>
                    <td className="p-4 border-l border-white/10 text-[#00ff88] font-bold">Automated</td>
                    <td className="p-4 border-l border-white/10 text-[#00ff88] font-bold">Yes</td>
                    <td className="p-4 border-l border-white/10 text-[#00ff88] font-bold">Yes (Paid)</td>
                    <td className="p-4 border-l border-white/10">Enterprise Portal</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-4 font-semibold text-white">MXToolbox</td>
                    <td className="p-4 border-l border-white/10 text-red-400">No</td>
                    <td className="p-4 border-l border-white/10 text-red-400">Raw text</td>
                    <td className="p-4 border-l border-white/10">No</td>
                    <td className="p-4 border-l border-white/10 text-red-400">No</td>
                    <td className="p-4 border-l border-white/10">Web App (Free)</td>
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
              <div className="w-24 h-24 rounded-full bg-[#1a2332] border-2 border-[#00ff88]/30 flex items-center justify-center shrink-0 overflow-hidden">
                <Shield className="w-10 h-10 text-[#00ff88]" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 px-2 py-1 rounded bg-[#00ff88]/10 text-[#00ff88] text-[10px] font-mono uppercase tracking-widest mb-2">
                  <Check className="w-3 h-3" /> Fact Checked & Verified
                </div>
                <h3 className="text-white font-bold text-xl mb-1">Surendra Reddy</h3>
                <p className="text-gray-400 text-xs font-mono uppercase tracking-wider mb-3">Founder & Principal Architect, ReconShield</p>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  Surendra is an information security engineer specializing in OSINT methodology, internet telemetry mapping, and cryptographic domain security. He designed ReconShield to help teams manage their attack surface exposure.
                </p>
                <div className="flex gap-6 text-sm font-mono">
                  <a href="https://linkedin.com/in/surendrareddy3" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 flex items-center gap-1">LinkedIn <ChevronRight className="w-3.5 h-3.5"/></a>
                  <a href="https://github.com/nsurendrareddy" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white flex items-center gap-1">GitHub <ChevronRight className="w-3.5 h-3.5"/></a>
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
                  Our findings are derived from RFC protocol documentation, ICANN governance policies, and verified cybersecurity databases. We avoid speculative telemetry, prioritizing primary sources and verifiable network actions.
                </p>
              </div>
              <div>
                <h3 className="text-white font-bold mb-3 uppercase tracking-wider font-mono text-xs">Fact Checking Process</h3>
                <p className="leading-relaxed">
                  Information is verified against active DNS zones, registrar configurations, and IETF specifications (including RFC 3912 and RFC 7480-7485). Each section is tested for technical accuracy under modern browser routing environments.
                </p>
              </div>
            </div>

            <div className="text-center text-[10px] font-mono text-gray-600 uppercase tracking-widest mt-12">
              Last Updated: June 12, 2026 | Reviewed by ReconShield Editorial Board | Reference: Internet Engineering Task Force (IETF) RFC 3912, RFC 7480-7485, ICANN specifications
            </div>
          </div>
        </section>

        {/* Topical Authority Hub: Related Guides (Future Blog Links) */}
        <section className="py-20 bg-[#05080f]" aria-label="ReconShield Resource Hub">
          <div className="max-w-[1000px] mx-auto px-6 font-sans">
            <h2 className="text-3xl font-display font-bold text-white mb-4 text-center">Related Guides & Resources</h2>
            <p className="text-gray-400 text-sm text-center max-w-2xl mx-auto mb-12 leading-relaxed">
              Explore our collection of cybersecurity guides, protocol analyses, and technical blogs to secure your network perimeter.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Blog Link 1 */}
              <div className="p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-[#00ff88]/20 transition-all group">
                <span className="text-[10px] font-mono text-[#00ff88] uppercase block mb-2 tracking-widest">Educational Article</span>
                <h3 className="text-white font-bold text-base mb-2 group-hover:text-[#00ff88] transition-colors">What Is WHOIS Lookup?</h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">A complete deep dive into how WHOIS databases are maintained, queried, and updated across registries.</p>
                <Link href="/blog/what-is-whois-lookup" className="text-[#00ff88] text-xs font-mono inline-flex items-center gap-1 group-hover:underline">
                  Read Article <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Blog Link 2 */}
              <div className="p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-[#00ff88]/20 transition-all group">
                <span className="text-[10px] font-mono text-[#00ff88] uppercase block mb-2 tracking-widest">Protocol Analysis</span>
                <h3 className="text-white font-bold text-base mb-2 group-hover:text-[#00ff88] transition-colors">WHOIS vs RDAP</h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">Compare legacy port 43 requests against HTTPS-based JSON endpoints for registry queries.</p>
                <Link href="/blog/whois-vs-rdap" className="text-[#00ff88] text-xs font-mono inline-flex items-center gap-1 group-hover:underline">
                  Read Article <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Blog Link 3 */}
              <div className="p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-[#00ff88]/20 transition-all group">
                <span className="text-[10px] font-mono text-[#00ff88] uppercase block mb-2 tracking-widest">Security Playbook</span>
                <h3 className="text-white font-bold text-base mb-2 group-hover:text-[#00ff88] transition-colors">Reverse WHOIS Explained</h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">Learn how to search by contact attributes to map out a threat actor&apos;s infrastructure.</p>
                <Link href="/blog/reverse-whois-explained" className="text-[#00ff88] text-xs font-mono inline-flex items-center gap-1 group-hover:underline">
                  Read Guide <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Blog Link 4 */}
              <div className="p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-[#00ff88]/20 transition-all group">
                <span className="text-[10px] font-mono text-[#00ff88] uppercase block mb-2 tracking-widest">Recon Strategy</span>
                <h3 className="text-white font-bold text-base mb-2 group-hover:text-[#00ff88] transition-colors">Domain Investigation Guide</h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">A step-by-step workbook for investigating target namespaces during audits.</p>
                <Link href="/blog/domain-investigation-guide" className="text-[#00ff88] text-xs font-mono inline-flex items-center gap-1 group-hover:underline">
                  Read Guide <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Blog Link 5 */}
              <div className="p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-[#00ff88]/20 transition-all group">
                <span className="text-[10px] font-mono text-[#00ff88] uppercase block mb-2 tracking-widest">Enterprise Blueprint</span>
                <h3 className="text-white font-bold text-base mb-2 group-hover:text-[#00ff88] transition-colors">WHOIS for Threat Intelligence</h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">How SOC analysts query registry databases to block campaigns and profile threat groups.</p>
                <Link href="/blog/whois-for-threat-intelligence" className="text-[#00ff88] text-xs font-mono inline-flex items-center gap-1 group-hover:underline">
                  Read Playbook <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Blog Link 6 */}
              <div className="p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-[#00ff88]/20 transition-all group">
                <span className="text-[10px] font-mono text-[#00ff88] uppercase block mb-2 tracking-widest">Tool Comparison</span>
                <h3 className="text-white font-bold text-base mb-2 group-hover:text-[#00ff88] transition-colors">Domain Registration Lifecycle Explained</h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">Examine the stages of a domain name registration from available to pending delete.</p>
                <Link href="/blog/domain-registration-lifecycle-explained" className="text-[#00ff88] text-xs font-mono inline-flex items-center gap-1 group-hover:underline">
                  Read Guide <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>
          </div>
        </section>

        {/* FAQ Section */}
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
