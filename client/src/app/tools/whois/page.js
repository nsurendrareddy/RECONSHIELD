import dynamic from 'next/dynamic';
import Link from 'next/link';
import { 
  Shield, Globe, Server, Lock, Terminal, CheckCircle2, ChevronRight, 
  Search, Activity, Target, Network, Info, Check, AlertTriangle, 
  FileText, Send, Database, Clock, Key, BookOpen, Layers, Users
} from 'lucide-react';
import { generateBaseMetadata } from '@/utils/metadata';

const ToolScannerClient = dynamic(() => import('@/components/ToolScannerClient'), {
  loading: () => <div className="min-h-[400px] animate-pulse bg-surface-900/50 rounded-3xl max-w-5xl mx-auto my-12" />
});

export const metadata = generateBaseMetadata({
  title: "WHOIS Lookup Tool (Free) | Domain Owner & Registration Checker",
  description: "Perform a free WHOIS lookup to check domain ownership, registrar details, registration dates, expiration dates, and domain intelligence insights.",
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
          "name": "WHOIS Lookup Tool (Free) | Domain Owner & Registration Checker",
          "isPartOf": { "@id": "https://reconshield.in/#website" }
        },
        {
          "@type": "SoftwareApplication",
          "@id": "https://reconshield.in/tools/whois#software",
          "name": "ReconShield WHOIS Lookup Tool",
          "url": "https://reconshield.in/tools/whois",
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
          "headline": "The Ultimate Guide to WHOIS Lookup and Domain Ownership",
          "description": "Everything you need to know about WHOIS lookups, RDAP transitions, domain privacy, EPP status codes, and threat hunting.",
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
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-900 border border-white/10 text-gray-400 text-xs font-mono uppercase tracking-widest mb-6 shadow-sm">
            <Search className="w-4 h-4 text-[#00ff88]" />
            <span>Domain Registry Mapping Module</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 tracking-tight">
            WHOIS Lookup Tool
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

      {/* AI Overview / Featured Snippet Optimization (AI Overview Optimization) */}
      <section className="py-12 bg-[#05080f] border-b border-white/5" aria-label="AI Search Overview">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="bg-gradient-to-r from-emerald-500/5 to-teal-500/5 border border-emerald-500/10 rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00ff88]/5 blur-[50px] rounded-full pointer-events-none" />
            
            {/* Definition Block: What Is WHOIS Lookup? */}
            <h2 className="font-mono text-xs text-[#00ff88] uppercase tracking-wider mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#00ff88]" /> AI Overview Snippet: What is WHOIS Lookup?
            </h2>
            <div className="space-y-6 text-sm text-gray-300 font-sans leading-relaxed">
              <div>
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Definition Block: What Is WHOIS Lookup?</span>
                <p className="text-gray-300">
                  A <strong>WHOIS lookup</strong> is a query and response database transaction that retrieves registration profile records of a domain name from registry databases. It reveals the domain registrar, registration timeline (creation, update, and expiration dates), authoritative DNS nameservers, domain administrative contacts, and Extensible Provisioning Protocol (EPP) status lock indicators.
                </p>
              </div>

              {/* Definition Block: What Is RDAP? */}
              <div className="border-t border-white/5 pt-4">
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Definition Block: What Is RDAP?</span>
                <p className="text-gray-300">
                  <strong>RDAP (Registration Data Access Protocol)</strong> is the standardized HTTP-based successor protocol to legacy port 43 WHOIS services. Dictated by IETF RFCs 7480-7485, RDAP translates domain registry data into structured, secure JSON representations, supporting cryptographic transport, internationalized domain names, and standardized role-based access controls.
                </p>
              </div>

              {/* Definition Block: How to Find a Domain Owner? */}
              <div className="border-t border-white/5 pt-4">
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Definition Block: How to Find a Domain Owner?</span>
                <p className="text-gray-300">
                  To find a domain owner when registry data is redacted, look up the <strong>Registrar Abuse Contact Email</strong> or public proxy submission forms in the WHOIS output. Other OSINT methods include checking historical WHOIS archives (pre-GDPR records), cross-checking DNS SOA email tags, tracing corporate filings, or contacting the registrar with a trademark claim.
                </p>
              </div>
              
              {/* TLDR Section & Key Takeaways */}
              <div className="border-t border-white/5 pt-4">
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// TL;DR Section</span>
                <p className="text-gray-400 text-xs font-mono">
                  WHOIS lookups retrieve administrative registry records for domain names. The database tracking system is governed by ICANN policy and is transitioning from legacy port 43 WHOIS to HTTPS-based RDAP format. GDPR masks most owner contacts, but registrar abuse channels and EPP lock codes remain publicly viewable.
                </p>
              </div>

              <div className="border-t border-white/5 pt-4">
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Key Takeaways</span>
                <ul className="list-disc pl-5 text-gray-400 text-xs space-y-2 font-mono">
                  <li><strong>Registry Query:</strong> WHOIS queries traverse root TLD servers down to registrar-managed databases.</li>
                  <li><strong>Security Audits:</strong> EPP codes verify registry-level protection configurations.</li>
                  <li><strong>Adversary Profiling:</strong> Exposing Newly Registered Domains (NRDs) mitigates phishing and malware attacks.</li>
                  <li><strong>Privacy Layers:</strong> GDPR redaction masks PII, necessitating fallback OSINT contact endpoints.</li>
                </ul>
              </div>

              {/* Fact Box: WHOIS Protocol Specifications */}
              <div className="border-t border-white/5 pt-4">
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Fact Box: WHOIS Protocol Specifications</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono text-gray-400 mt-2">
                  <div>
                    <span className="text-[10px] text-gray-600 uppercase block">Port & Transport:</span>
                    <span>TCP Port 43 (WHOIS) / HTTPS Port 443 (RDAP)</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-600 uppercase block">Governing Standards:</span>
                    <span>IETF RFC 3912 (WHOIS) / RFC 7480-7485 (RDAP)</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-600 uppercase block">Data Encoding:</span>
                    <span>Plain Text (WHOIS) / JSON format (RDAP)</span>
                  </div>
                </div>
              </div>

              {/* Expert Summary */}
              <div className="border-t border-white/5 pt-4">
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Expert Summary</span>
                <p className="text-gray-400 text-xs leading-relaxed font-sans">
                  From a domain intelligence standpoint, WHOIS is not merely an directory lookup; it is a critical source of infrastructure lineage. Analyzing registrar history, registration lifecycles, and EPP status lock indicators allows security teams to verify domain authenticity, perform passive threat mapping, and track trademark assets.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deep Content Silo */}
      <div className="bg-[#05080f]">
        
        {/* H2: What Is WHOIS Lookup? */}
        <section className="py-20 border-b border-white/5">
          <div className="max-w-[1000px] mx-auto px-6 prose prose-invert max-w-none prose-p:leading-relaxed prose-p:text-gray-400 prose-headings:text-white prose-a:text-[#00ff88] hover:prose-a:text-[#00cc6a]">
            
            <h2 className="text-3xl font-display font-bold mt-0 mb-6 flex items-center gap-3">
              <Activity className="w-8 h-8 text-[#00ff88]" />
              What Is WHOIS Lookup?
            </h2>
            <p>
              A <strong>WHOIS lookup</strong> is an information retrieval query designed to check public database registers for domain names, IP address delegations, and autonomous system allocations. Originating in the early 1982s under the oversight of the Internet Engineering Task Force (IETF) and ARPANET directory administrators, the WHOIS registry was structured to identify contacts responsible for operating networked equipment. 
            </p>
            <p>
              In modern internet infrastructure, every domain registration is logged into registry databases. A WHOIS query targets these registries to fetch metadata associated with domain name assignments. While historically this directory included the full names, emails, physical addresses, and telephone numbers of domain owners, contemporary privacy mandates (such as the GDPR and CCPA) redact this PII. The tool remains an invaluable asset for verifying domain ownership timelines, detecting infrastructure spoofing, and assessing cybersecurity threat postures.
            </p>

            {/* H2: How WHOIS Lookup Works */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">How WHOIS Lookup Works</h2>
            <p>
              The execution of a WHOIS query operates under a client-server paradigm. When a domain is checked using the ReconShield WHOIS Lookup engine, the request performs a sequence of lookup steps across several layers of the Domain Name System (DNS):
            </p>
            <div className="space-y-6 my-8 not-prose">
              <div className="relative border-l-2 border-[#00ff88]/30 pl-6 ml-3 space-y-6">
                <div>
                  <span className="absolute -left-[7px] w-3 h-3 rounded-full bg-[#00ff88]" />
                  <h5 className="text-white font-bold text-xs font-mono uppercase tracking-wider mb-1">Step 1: Root Registry Query</h5>
                  <p className="text-xs text-gray-400">The tool identifies the Top-Level Domain (TLD) of the query (e.g., <code>.in</code>, <code>.com</code>) and checks the Internet Assigned Numbers Authority (IANA) database to locate the authoritative Registry Operator.</p>
                </div>
                <div>
                  <span className="absolute -left-[7px] w-3 h-3 rounded-full bg-[#00ff88]" />
                  <h5 className="text-white font-bold text-xs font-mono uppercase tracking-wider mb-1">Step 2: Registry Database Redirection</h5>
                  <p className="text-xs text-gray-400">The query is forwarded to the TLD's registry database (e.g., Verisign for <code>.com</code>). The registry indicates which registrar (e.g., Namecheap) manages the domain's records.</p>
                </div>
                <div>
                  <span className="absolute -left-[7px] w-3 h-3 rounded-full bg-[#00ff88]" />
                  <h5 className="text-white font-bold text-xs font-mono uppercase tracking-wider mb-1">Step 3: Registrar WHOIS Resolution</h5>
                  <p className="text-xs text-gray-400">The client connects directly to the registrar's WHOIS server via TCP Port 43 or contacts the modern RDAP endpoint using secure HTTPS requests to download the authoritative registration record.</p>
                </div>
                <div>
                  <span className="absolute -left-[7px] w-3 h-3 rounded-full bg-[#00ff88]" />
                  <h5 className="text-white font-bold text-xs font-mono uppercase tracking-wider mb-1">Step 4: Output Parsing & Display</h5>
                  <p className="text-xs text-gray-400">The plain-text raw output or JSON payload is structured and displayed on our console, separating technical registry details, timelines, nameserver records, and domain status flags.</p>
                </div>
              </div>
            </div>

            {/* H2: What Information a WHOIS Record Contains */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">What Information a WHOIS Record Contains</h2>
            <p>
              A standard, unredacted WHOIS record is structured into key data groups that disclose administrative and technical information about a domain's setup. A lookup typically exposes:
            </p>
            <ul>
              <li><strong>Domain Name Details:</strong> The canonical domain name, its registry ID, and the managing registrar.</li>
              <li><strong>Registry Timelines:</strong> The registration date (creation date), last update date, and expiration date.</li>
              <li><strong>Contact Entities:</strong> Mapped roles including the Registrant (domain owner), Administrative Contact, and Technical Contact.</li>
              <li><strong>Authoritative Nameservers:</strong> The DNS servers delegated to control DNS zone records for the domain.</li>
              <li><strong>Domain Status:</strong> EPP codes indicating whether the domain is locked, expired, or pending deletion.</li>
              <li><strong>Abuse Contact Data:</strong> The email and phone number monitored by the registrar to report malicious activities.</li>
            </ul>

            {/* H2: How to Find Domain Ownership Information */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">How to Find Domain Ownership Information</h2>
            <p>
              Locating the owner of a domain is a primary intent of executing a WHOIS check. However, privacy laws require registrars to omit individual identities. When searching for domain ownership, use the following methods:
            </p>
            <ol>
              <li><strong>Registrant Contact Form:</strong> Most registrars insert a proxy email (e.g., <code>domain.com@contactprivacy.com</code>) or a web contact link in the WHOIS output. Sending emails to this address forwards the message to the domain owner.</li>
              <li><strong>Historical WHOIS Records:</strong> Access historical archive databases that index legacy WHOIS datasets recorded before GDPR compliance was enforced.</li>
              <li><strong>DNS SOA Record Tags:</strong> Check the Start of Authority (SOA) record of the domain's DNS zones, which frequently lists the administrator's email.</li>
              <li><strong>Corporate Registrar Filings:</strong> For commercial sites, cross-reference domain details against public business registers.</li>
            </ol>

            {/* H2: WHOIS vs RDAP */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">WHOIS vs RDAP</h2>
            <p>
              The legacy WHOIS protocol (RFC 3912) operates on TCP port 43. While widely adopted, it suffers from several limitations: it does not define a standard data structure, lacks transport encryption, and does not support internationalized domain names (IDNs) or granular user access controls.
            </p>
            <p>
              To address these issues, the Registration Data Access Protocol (RDAP) was developed. RDAP standardizes queries over HTTPS and returns JSON payloads. This allows developers to parse domain data programmatically without building custom parser expressions for every registrar. RDAP also supports encrypted transit and access controls, enabling registries to expose registrant data to verified security teams while keeping it hidden from spam bots.
            </p>

            <div className="bg-surface-900 border border-white/10 rounded-2xl p-6 my-8 not-prose">
              <h4 className="text-white font-bold text-sm mb-4 font-mono uppercase tracking-widest flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#00ff88]" /> Protocol Comparison Matrix
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-gray-400 border-collapse font-mono">
                  <thead>
                    <tr className="border-b border-white/10 text-white">
                      <th className="pb-3 pr-4">Metric</th>
                      <th className="pb-3 pr-4">WHOIS (RFC 3912)</th>
                      <th className="pb-3 pr-4">RDAP (RFC 7480)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    <tr>
                      <td className="py-2 pr-4 font-bold text-white">Transport Protocol</td>
                      <td className="py-2 pr-4 text-red-400">Plain TCP Port 43</td>
                      <td className="py-2 pr-4 text-[#00ff88]">HTTPS (TLS)</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 font-bold text-white">Format</td>
                      <td className="py-2 pr-4 text-red-400">Unstructured Plain Text</td>
                      <td className="py-2 pr-4 text-[#00ff88]">Structured JSON</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 font-bold text-white">Rate Limits</td>
                      <td className="py-2 pr-4">Strict IP Blocks (Registry-specific)</td>
                      <td className="py-2 pr-4">Standard HTTP 429 Codes</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 font-bold text-white">Access Control</td>
                      <td className="py-2 pr-4">None (All or nothing)</td>
                      <td className="py-2 pr-4">Token-based Role Access</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* H2: Domain Registration and Registrar Information */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">Domain Registration and Registrar Information</h2>
            <p>
              Domain names are leased from Registries (such as Verisign for <code>.com</code> or Nominet for <code>.uk</code>) through ICANN-accredited Registrars. The registrar handles domain sales, billing, DNS nameserver setup, and WHOIS records updates. Identifying the registrar during a lookup reveals where the domain is managed and provides the contact details needed to report abuse or submit trademark claims.
            </p>

            {/* H2: Understanding Domain Age and Registration Dates */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">Understanding Domain Age and Registration Dates</h2>
            <p>
              Domain age refers to the duration a domain has been registered. It is calculated by subtracting the creation date from the current date. Domain age is a key indicator in trust verification and threat intelligence:
            </p>
            <ul>
              <li><strong>High-Trust Profile:</strong> Domains registered for 5+ years have a lower probability of being malicious, as they have established historical traffic logs, brand history, and mail reputation.</li>
              <li><strong>High-Risk Profile:</strong> Domains registered within the last 30 days are anomalies. Bad actors spin up lookalike domains in bulk for phishing, hosting malware, or running spam campaigns, dropping them before they trigger blacklists.</li>
            </ul>

            {/* H2: WHOIS Privacy Protection Explained */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">WHOIS Privacy Protection Explained</h2>
            <p>
              WHOIS privacy protection (or proxy registration) is a service that shields domain owners' personal contact details from the public WHOIS database. When enabled, the registrar replaces the registrant's name, email, phone number, and physical address with their own generic proxy information.
            </p>
            <p>
              This protects domain owners from data scraping, spam calls, and unsolicited sales pitches. Under GDPR mandates, registrars apply this redaction by default for EU citizens, even without a paid privacy subscription.
            </p>

            {/* H2: EPP Domain Status Codes Explained */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">EPP Domain Status Codes Explained</h2>
            <p>
              The Extensible Provisioning Protocol (EPP) status codes define the administrative status of a domain name registration. These codes represent safety locks that protect domains from hijacking and unauthorized transfers.
            </p>
            <p>
              For example, <code>clientTransferProhibited</code> prevents unauthorized domain transfers to other registrars. Similarly, <code>clientUpdateProhibited</code> locks nameservers and contact records from modifications. When a domain is being deleted, codes like <code>pendingDelete</code> indicate its stage in the expiration lifecycle.
            </p>

            {/* H2: Domain Expiration Lifecycle */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">Domain Expiration Lifecycle</h2>
            <p>
              Domain registrations follow a strict, standardized timeline after their expiration date:
            </p>
            <div className="bg-surface-900 border border-white/10 rounded-2xl p-6 my-8 not-prose">
              <h4 className="text-white font-bold text-sm mb-4 font-mono uppercase tracking-widest flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#00ff88]" /> Expiration Lifecycle Phases
              </h4>
              <div className="space-y-4 text-xs font-mono text-gray-400">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-white">Active Period</span>
                  <span>1 to 10 Years (Registered & Resolving)</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-yellow-500">Auto-Renew Grace Period</span>
                  <span>0 to 45 Days (Expired, DNS Resolution Stops)</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-orange-500">Redemption Grace Period</span>
                  <span>30 Days (Deleted at Registry, Recoverable for Fee)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-red-500">Pending Delete</span>
                  <span>5 Days (Locked, Scheduled for Public Release)</span>
                </div>
              </div>
            </div>

            {/* H2: WHOIS for OSINT Investigations */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">WHOIS for OSINT Investigations</h2>
            <p>
              Open Source Intelligence (OSINT) investigators use WHOIS records to trace domain ownership and map online assets. By analyzing historical records, investigators can connect multiple sites registered under the same email, address, or phone number, helping link anonymous sites back to real-world entities.
            </p>

            {/* H2: WHOIS for Threat Hunting */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">WHOIS for Threat Hunting</h2>
            <p>
              In threat hunting, security analysts use WHOIS telemetry to identify malicious infrastructure. When a compromised endpoint connects to an external server, resolving that domain's WHOIS data helps classify the threat:
            </p>
            <ul>
              <li><strong>Registrar Indicators:</strong> Free or cheap registrars are often favored by actors running transient campaigns.</li>
              <li><strong>Subnet Correlation:</strong> Matching the domain's authoritative nameservers with known malicious networks helps identify malware command-and-control (C2) hubs.</li>
            </ul>

            {/* H2: WHOIS for Phishing Detection */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">WHOIS for Phishing Detection</h2>
            <p>
              Phishing campaigns use lookalike domains (typosquatting) to steal user credentials. Security tools run automated WHOIS checks to flag these sites: if a domain claiming to be a financial institution was registered yesterday and uses nameservers unrelated to the brand, the site is flagged as phishing.
            </p>

            {/* H2: WHOIS for Brand Protection */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">WHOIS for Brand Protection</h2>
            <p>
              Brands monitor registrar databases for unauthorized registrations of their trademarks. Automating Reverse WHOIS searches allows companies to discover squatting domains and submit DMCA or UDRP takedowns to protect their customers.
            </p>

            {/* H2: Common WHOIS Errors and Troubleshooting */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">Common WHOIS Errors and Troubleshooting</h2>
            <p>
              Queries to WHOIS servers can fail due to several factors:
            </p>
            <ul>
              <li><strong>Connection Timeout:</strong> Querying legacy WHOIS servers on port 43 can time out if network firewalls block the traffic. Using RDAP over HTTPS helps bypass this issue.</li>
              <li><strong>Rate Limiting:</strong> Registrars rate-limit requests to prevent database scraping. ReconShield uses distributed endpoints to minimize rate-limiting issues.</li>
              <li><strong>No Match:</strong> This indicates the domain has not been registered yet or has dropped back to the public pool.</li>
            </ul>

          </div>
        </section>

        {/* EPP Lock Grid Section */}
        <section className="py-20 bg-[#0a0d14] border-b border-white/5">
          <div className="max-w-[1000px] mx-auto px-6 prose prose-invert max-w-none prose-p:text-gray-400 prose-a:text-[#00ff88]">
            <h2 className="text-3xl font-display font-bold text-white mb-6">EPP Domain Status Codes</h2>
            <p>
              The Extensible Provisioning Protocol (EPP) defines domain state locking flags. These indicate whether a domain is locked against unauthorized modifications:
            </p>

            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0d1117] not-prose my-10">
              <table className="w-full text-left text-sm text-gray-400 border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.02] text-white font-mono uppercase text-xs">
                    <th className="p-4">EPP Status Code</th>
                    <th className="p-4 border-l border-white/10">Type</th>
                    <th className="p-4 border-l border-white/10">Description</th>
                    <th className="p-4 border-l border-white/10">Security Significance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono text-xs">
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-4 font-semibold text-white">clientTransferProhibited</td>
                    <td className="p-4 border-l border-white/10 text-emerald-400">Registrar Lock</td>
                    <td className="p-4 border-l border-white/10">Prevents domain transfer to another registrar.</td>
                    <td className="p-4 border-l border-white/10">Blocks domain hijackings and unauthorized ownership changes.</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-4 font-semibold text-white">clientDeleteProhibited</td>
                    <td className="p-4 border-l border-white/10 text-emerald-400">Registrar Lock</td>
                    <td className="p-4 border-l border-white/10">Prevents domain deletion.</td>
                    <td className="p-4 border-l border-white/10">Protects critical infrastructure domains from deletion bugs.</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-4 font-semibold text-white">clientUpdateProhibited</td>
                    <td className="p-4 border-l border-white/10 text-emerald-400">Registrar Lock</td>
                    <td className="p-4 border-l border-white/10">Locks nameservers and contact info from updates.</td>
                    <td className="p-4 border-l border-white/10">Prevents unauthorized DNS modifications (DNS hijacking).</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-4 font-semibold text-white">serverTransferProhibited</td>
                    <td className="p-4 border-l border-white/10 text-purple-400">Registry Lock</td>
                    <td className="p-4 border-l border-white/10">Prevents domain transfer (highest lock level).</td>
                    <td className="p-4 border-l border-white/10">Bypasses registrar vulnerabilities, locked directly at registry.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* E-E-A-T credentials & Methodology */}
        <section className="py-20 border-b border-white/5">
          <div className="max-w-[1000px] mx-auto px-6">
            
            <div className="flex flex-col md:flex-row items-center gap-8 p-8 bg-gradient-to-r from-[#0d1117] to-surface-900 border border-white/10 rounded-3xl shadow-xl mb-16 font-sans">
              <div className="w-24 h-24 rounded-full bg-[#1a2332] border-2 border-[#00ff88]/30 flex items-center justify-center shrink-0 overflow-hidden">
                <Shield className="w-10 h-10 text-[#00ff88]" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 px-2 py-1 rounded bg-[#00ff88]/10 text-[#00ff88] text-[10px] font-mono uppercase tracking-widest mb-2">
                  <Check className="w-3 h-3" /> Fact Checked & Verified
                </div>
                <h4 className="text-white font-bold text-xl mb-1">Surendra Reddy</h4>
                <p className="text-gray-400 text-xs font-mono uppercase tracking-wider mb-3">Cybersecurity Researcher & Founder, ReconShield</p>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  Surendra is an information security engineer specializing in OSINT methodology, internet telemetry mapping, and cryptographic domain security. He designed ReconShield to help teams manage their attack surface exposure.
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
                  Our findings are derived from RFC protocol documentation, ICANN governance policies, and verified cybersecurity databases. We avoid speculative telemetry, prioritizing primary sources and verifiable network actions.
                </p>
              </div>
              <div>
                <h5 className="text-white font-bold mb-3 uppercase tracking-wider font-mono">Fact Checking Process</h5>
                <p className="leading-relaxed">
                  Information is verified against active DNS zones, registrar configurations, and IETF specifications (including RFC 3912 and RFC 7480-7485). Each section is tested for technical accuracy under modern browser routing environments.
                </p>
              </div>
            </div>

            <div className="text-center text-[10px] font-mono text-gray-600 uppercase tracking-widest mt-12">
              Last Updated: June 2026 | Reviewed by ReconShield Editorial Board | Reference: Internet Engineering Task Force (IETF) RFC 3912, RFC 7480-7485, ICANN specifications
            </div>
          </div>
        </section>

        {/* Semantic Internal Links (Phase 7 - Internal Linking) */}
        <section className="py-20 bg-[#05080f]" aria-label="Related Security Tools">
          <div className="max-w-[1000px] mx-auto px-6">
            <h2 className="text-3xl font-display font-bold text-white mb-10 text-center">Complete Your Network Asset Audit</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* DNS Lookup Link */}
              <Link href="/tools/dns-lookup" className="p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-cyan-500/30 transition-all group">
                <Database className="w-8 h-8 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-white font-bold text-lg mb-2">DNS Records Lookup</h4>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">Resolve authoritative A, MX, TXT, and CNAME records using our DNS records lookup tool.</p>
                <span className="text-cyan-400 text-xs font-mono flex items-center gap-1">Check DNS <ChevronRight className="w-3 h-3"/></span>
              </Link>
              
              {/* IP Lookup Link */}
              <Link href="/tools/ip-lookup" className="p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-purple-500/30 transition-all group">
                <Network className="w-8 h-8 text-purple-400 mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-white font-bold text-lg mb-2">IP Reputation Checker</h4>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">Analyze host reputation, threat tags, and ISP subnet details using our IP reputation checker.</p>
                <span className="text-purple-400 text-xs font-mono flex items-center gap-1">Run IP Scan <ChevronRight className="w-3 h-3"/></span>
              </Link>

              {/* Subdomain Finder Link */}
              <Link href="/tools/subdomain-finder" className="p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-[#00ff88]/30 transition-all group">
                <Globe className="w-8 h-8 text-[#00ff88] mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-white font-bold text-lg mb-2">Subdomain Finder</h4>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">Discover public host records and expose shadow subdomains with our Subdomain Finder.</p>
                <span className="text-[#00ff88] text-xs font-mono flex items-center gap-1">Find Subdomains <ChevronRight className="w-3 h-3"/></span>
              </Link>

              {/* SSL Checker Link */}
              <Link href="/tools/ssl-checker" className="p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-orange-500/30 transition-all group">
                <Shield className="w-8 h-8 text-orange-400 mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-white font-bold text-lg mb-2">SSL/TLS Checker</h4>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">Audit cryptographic validity, certificate expiry, and handshake errors using our SSL/TLS Checker.</p>
                <span className="text-orange-400 text-xs font-mono flex items-center gap-1">Validate SSL <ChevronRight className="w-3 h-3"/></span>
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
