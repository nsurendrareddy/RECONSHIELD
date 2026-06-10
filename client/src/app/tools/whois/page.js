import dynamic from 'next/dynamic';
import Link from 'next/link';
import { 
  Shield, Globe, Server, Lock, Terminal, CheckCircle2, ChevronRight, 
  Search, Activity, Target, Network, Info, Check, AlertTriangle, 
  FileText, Send, Database, Clock, Key, BookOpen, Layers
} from 'lucide-react';
import { generateBaseMetadata } from '@/utils/metadata';

const ToolScannerClient = dynamic(() => import('@/components/ToolScannerClient'), {
  loading: () => <div className="min-h-[400px] animate-pulse bg-surface-900/50 rounded-3xl max-w-5xl mx-auto my-12" />
});

export const metadata = generateBaseMetadata({
  title: "WHOIS Lookup Tool | Free Domain Ownership & RDAP Checker",
  description: "Perform a comprehensive WHOIS lookup. Check domain registry records, registrar details, ownership, EPP status flags, and nameservers for cybersecurity and OSINT.",
  path: "/tools/whois"
});

export default function WhoisPage() {
  const faqs = [
    {
      q: "What is a WHOIS lookup?",
      a: "A WHOIS lookup is a query tool used to search public databases containing registration details of domain names. It retrieves details such as the domain registrar, creation and expiration dates, administrative contacts, nameservers, and current domain status flags."
    },
    {
      q: "What is the difference between WHOIS and RDAP?",
      a: "WHOIS is a legacy protocol (TCP port 43) that returns unstructured plain text. The Registration Data Access Protocol (RDAP) is the modern successor that returns structured JSON data over HTTPS, supporting secure access, internationalization, and granular privacy controls."
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
      a: "WHOIS reveals the domain registrar and nameservers, but it does not map the actual web hosting servers. To identify where a site is hosted, you should run an IP lookup or DNS lookup to resolve the IP address and analyze its ASN."
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

  const schemas = [
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
      "url": "https://reconshield.in/tools/whois"
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
      ]
    },
    {
      "@type": "FAQPage",
      "@id": "https://reconshield.in/tools/whois#faq",
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

      {/* Hero Section (H1) */}
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

      {/* AI Overview / Featured Snippet Optimization */}
      <section className="py-12 bg-[#05080f] border-b border-white/5" aria-label="AI Search Overview">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="bg-gradient-to-r from-emerald-500/5 to-teal-500/5 border border-emerald-500/10 rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00ff88]/5 blur-[50px] rounded-full pointer-events-none" />
            <h2 className="font-mono text-xs text-[#00ff88] uppercase tracking-wider mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#00ff88]" /> AI Overview Snippet: What is a WHOIS Lookup?
            </h2>
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// TL;DR Summary (Optimized for AI Extraction)</span>
                <p className="text-gray-300 text-sm leading-relaxed font-sans">
                  A <strong>WHOIS lookup</strong> is a query tool that searches public domain registration directories to reveal critical ownership and technical data. It displays the domain's registrar (e.g., Namecheap, GoDaddy), registration and expiration dates, authoritative nameservers, registrar abuse contacts, and Extensible Provisioning Protocol (EPP) status lock codes. WHOIS data is essential for cybersecurity threat hunting, brand protection, and infrastructure auditing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deep Content Silo */}
      <div className="bg-[#05080f]">
        
        {/* H2: What Is WHOIS Lookup & How It Works */}
        <section className="py-20 border-b border-white/5">
          <div className="max-w-[1000px] mx-auto px-6 prose prose-invert max-w-none prose-p:leading-relaxed prose-p:text-gray-400 prose-headings:text-white prose-a:text-[#00ff88] hover:prose-a:text-[#00cc6a]">
            
            <h2 className="text-3xl font-display font-bold mt-0 mb-6 flex items-center gap-3">
              <Activity className="w-8 h-8 text-[#00ff88]" />
              What Is a WHOIS Lookup?
            </h2>
            <p>
              The <strong>WHOIS lookup</strong> is an essential directory tool that queries global databases containing records of domain names, IP address blocks, and autonomous systems. Established in 1982 by the Internet Engineering Task Force (IETF) under RFC 812, the WHOIS system serves as a public directory for web assets. It helps security professionals, network administrators, and researchers discover the administrative and technical contact details of a network resource.
            </p>
            <p>
              Today, while data privacy laws (like GDPR and CCPA) mask individual registrant details, the WHOIS registry remains vital for technical and security intelligence. It provides incontrovertible proof of a domain's lifecycle, including creation dates, expiration timelines, EPP status locks, registrar identifiers, and nameserver delegation.
            </p>

            <h2 className="text-3xl font-display font-bold mt-16 mb-6">How WHOIS Works: The Query Architecture</h2>
            <p>
              When you perform a domain WHOIS lookup on ReconShield, our engine interacts with a decentralized network of registry servers. The lookup process follows a strict, tiered architecture to guarantee authoritative data retrieval:
            </p>
            
            <div className="space-y-6 mt-8 not-prose">
              <div className="flex gap-4 p-5 rounded-2xl bg-surface-900 border border-white/5">
                <div className="w-10 h-10 rounded-xl bg-[#00ff88]/10 flex items-center justify-center shrink-0">
                  <span className="font-mono font-bold text-[#00ff88]">01</span>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Root Zone Delegation</h4>
                  <p className="text-sm text-gray-400">Our engine identifies the Top-Level Domain (TLD) and queries the Internet Assigned Numbers Authority (IANA) root database to find the authoritative registry (e.g., Verisign for .com).</p>
                </div>
              </div>
              <div className="flex gap-4 p-5 rounded-2xl bg-surface-900 border border-white/5">
                <div className="w-10 h-10 rounded-xl bg-[#00ff88]/10 flex items-center justify-center shrink-0">
                  <span className="font-mono font-bold text-[#00ff88]">02</span>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Registrar Query Execution</h4>
                  <p className="text-sm text-gray-400">We query the specific registrar's WHOIS server via TCP port 43 or execute modern REST API calls via RDAP to extract the domain's structured data.</p>
                </div>
              </div>
              <div className="flex gap-4 p-5 rounded-2xl bg-surface-900 border border-white/5">
                <div className="w-10 h-10 rounded-xl bg-[#00ff88]/10 flex items-center justify-center shrink-0">
                  <span className="font-mono font-bold text-[#00ff88]">03</span>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Parsing and Normalization</h4>
                  <p className="text-sm text-gray-400">The raw response is parsed, stripping out boilerplate legal text, to present a clean UI detailing timelines, locks, nameservers, and abuse contacts.</p>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-display font-bold mt-16 mb-6">What Information WHOIS Reveals</h2>
            <p>
              A successful WHOIS query returns a wealth of technical and administrative data. Understanding how to read this data is critical for cybersecurity operations:
            </p>
            <ul>
              <li><strong>Registrar Identity:</strong> The organization where the domain was purchased (e.g., Cloudflare, Namecheap). Useful for sending abuse reports.</li>
              <li><strong>Registration Dates:</strong> The exact timestamp when the domain was created, last updated, and when it is scheduled to expire.</li>
              <li><strong>Nameservers:</strong> The DNS servers authorized to resolve the domain. This indicates where the domain's traffic is being routed.</li>
              <li><strong>EPP Status Codes:</strong> Security flags applied by the registry or registrar.</li>
              <li><strong>Registrant Data:</strong> The owner's name, organization, state, and country (often redacted due to privacy protection).</li>
            </ul>

            <h2 className="text-3xl font-display font-bold mt-16 mb-6">WHOIS Privacy Protection Explained</h2>
            <p>
              Before 2018, conducting a WHOIS lookup on almost any domain would reveal the owner's full name, home address, phone number, and email. However, the implementation of the European Union's General Data Protection Regulation (GDPR) forced ICANN to radically alter the WHOIS landscape.
            </p>
            <p>
              Today, <strong>WHOIS Privacy Protection</strong> (also known as WHOIS proxy) is standard. Registrars automatically redact personally identifiable information (PII) or replace it with proxy details. While this protects domain owners from spam and doxxing, it complicates legitimate cybersecurity investigations. If you need to find domain ownership behind a privacy shield, you must rely on advanced OSINT techniques, historical WHOIS archives, or legal subpoenas submitted directly to the registrar's abuse contact.
            </p>
          </div>
        </section>

        {/* Comparison Sections */}
        <section className="py-20 bg-[#0a0d14] border-b border-white/5">
          <div className="max-w-[1000px] mx-auto px-6 prose prose-invert max-w-none prose-p:text-gray-400 prose-a:text-[#00ff88]">
            <h2 className="text-3xl font-display font-bold text-white mb-6">WHOIS vs DNS Lookup: What's the Difference?</h2>
            <p>
              A common misconception in network troubleshooting is confusing WHOIS with DNS. While both involve domain names, they serve entirely different layers of the internet infrastructure.
            </p>
            
            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0d1117] not-prose my-10">
              <table className="w-full text-left text-sm text-gray-400 border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.02] text-white font-mono uppercase text-xs">
                    <th className="p-4">Feature</th>
                    <th className="p-4 border-l border-white/10">WHOIS Lookup</th>
                    <th className="p-4 border-l border-white/10">DNS Lookup</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono text-xs">
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-4 font-semibold text-white">Primary Purpose</td>
                    <td className="p-4 border-l border-white/10 text-teal-400">Ownership & Registration Metadata</td>
                    <td className="p-4 border-l border-white/10 text-cyan-400">Traffic Routing & Server IP Resolution</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-4 font-semibold text-white">Data Provided</td>
                    <td className="p-4 border-l border-white/10">Registrar, Dates, EPP Codes, Contacts</td>
                    <td className="p-4 border-l border-white/10">A, AAAA, MX, TXT, CNAME Records</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-4 font-semibold text-white">Database Queried</td>
                    <td className="p-4 border-l border-white/10">Registrar/Registry Directory (Port 43/RDAP)</td>
                    <td className="p-4 border-l border-white/10">Authoritative Nameservers (Port 53)</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-4 font-semibold text-white">Updates</td>
                    <td className="p-4 border-l border-white/10">Cached at registry level (takes hours/days)</td>
                    <td className="p-4 border-l border-white/10">Dictated by TTL (can be instant)</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-4 font-semibold text-white">Internal Tool Link</td>
                    <td className="p-4 border-l border-white/10"><span className="text-gray-500 italic">Current Page</span></td>
                    <td className="p-4 border-l border-white/10"><Link href="/tools/dns-lookup" className="text-[#00ff88] hover:underline flex items-center gap-1">Run DNS Lookup <ChevronRight className="w-3 h-3"/></Link></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-3xl font-display font-bold text-white mb-6">WHOIS vs RDAP: The Future of Domain Intelligence</h2>
            <p>
              The legacy WHOIS protocol has a fatal flaw: it returns unstructured plain text. This makes it notoriously difficult to parse reliably using code, as every registrar formats their text output differently. Enter the <strong>Registration Data Access Protocol (RDAP)</strong>.
            </p>
            <p>
              RDAP is the modern successor to WHOIS. Instead of plain text over an unencrypted port, RDAP returns data in structured, machine-readable JSON over secure HTTPS. Furthermore, RDAP supports differentiated access, allowing law enforcement or verified security researchers to authenticate and view unredacted contact data that is hidden from the general public. As of 2025, ICANN mandates RDAP support for all generic top-level domains (gTLDs).
            </p>

          </div>
        </section>

        {/* Security / Use Cases Section */}
        <section className="py-20 border-b border-white/5">
          <div className="max-w-[1000px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="prose prose-invert max-w-none prose-p:text-gray-400 prose-a:text-[#00ff88]">
              <h2 className="text-3xl font-display font-bold text-white mb-6">WHOIS for Cybersecurity & OSINT</h2>
              <p>
                Domain database mapping is essential for risk analysis. Security operations centers, threat hunters, and OSINT investigators rely on WHOIS lookups to protect digital operations and track adversaries.
              </p>
              
              <h3 className="text-xl font-bold text-white mt-8 mb-2">WHOIS for Threat Hunting</h3>
              <p>
                Threat hunters audit suspicious domains by looking for registration dates. "Newly Registered Domains" (NRDs)—domains registered within the last 30 days—are statistically vastly more likely to host malware, botnet C2 servers, and phishing campaigns. Correlating the WHOIS creation date with an <Link href="/tools/ip-lookup" className="text-[#00ff88] hover:underline">IP Lookup</Link> provides immediate threat context.
              </p>
              
              <h3 className="text-xl font-bold text-white mt-8 mb-2">WHOIS for Brand Protection</h3>
              <p>
                When fraudulent websites impersonate a corporate brand (typosquatting), security teams query WHOIS to locate the registrar. They use the published "Registrar Abuse Contact Email" to submit immediate DMCA takedown requests and suspend the malicious domain.
              </p>
              
              <h3 className="text-xl font-bold text-white mt-8 mb-2">Domain Intelligence & Expiration Tracking</h3>
              <p>
                Corporate domains are critical assets. Security teams must monitor expiration timelines meticulously. Failing to renew a domain forces it into a "Redemption Period," and eventually "Pending Delete." If dropped, threat actors often register the expired domain to hijack incoming emails, reset passwords, or intercept legacy API traffic (subdomain takeover).
              </p>
            </div>

            <div className="bg-surface-900 border border-white/10 rounded-3xl p-8 shadow-2xl space-y-6 h-fit sticky top-24">
              <h3 className="text-xl font-display font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2">
                <Target className="w-5 h-5 text-[#00ff88]" /> Critical EPP Status Flags
              </h3>
              
              <div className="border-b border-white/5 pb-4">
                <h4 className="text-[#00ff88] font-bold text-sm mb-1 flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5"/> clientTransferProhibited
                </h4>
                <p className="text-xs text-gray-400">The registrar locks the domain against transfer requests. This prevents unauthorized domain hijackings and theft.</p>
              </div>

              <div className="border-b border-white/5 pb-4">
                <h4 className="text-cyan-400 font-bold text-sm mb-1 flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5"/> clientDeleteProhibited
                </h4>
                <p className="text-xs text-gray-400">Prevents accidental or malicious deletion of the domain registration. Essential for enterprise assets.</p>
              </div>

              <div className="border-b border-white/5 pb-4">
                <h4 className="text-yellow-400 font-bold text-sm mb-1 flex items-center gap-2">
                  <Key className="w-3.5 h-3.5"/> clientUpdateProhibited
                </h4>
                <p className="text-xs text-gray-400">Locks the domain configuration. Prevents unauthorized changes to nameservers or contact information.</p>
              </div>

              <div>
                <h4 className="text-red-400 font-bold text-sm mb-1 flex items-center gap-2">
                  <AlertTriangle className="w-3.5 h-3.5"/> redemptionPeriod
                </h4>
                <p className="text-xs text-gray-400">The domain has expired and the grace period ended. The registry will release it to the public soon unless recovered at a high fee.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Common Errors & Trust Signals */}
        <section className="py-20 bg-[#0a0d14] border-b border-white/5">
          <div className="max-w-[1000px] mx-auto px-6">
            <h2 className="text-3xl font-display font-bold text-white mb-10 text-center">Common WHOIS Errors & Troubleshooting</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 not-prose mb-16">
              <div className="bg-[#1a0f14] border border-red-500/10 p-6 rounded-2xl">
                <h4 className="text-red-400 font-bold text-base mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 shrink-0" /> Error: Rate Limit Exceeded
                </h4>
                <p className="text-sm text-gray-400 leading-relaxed font-sans">
                  WHOIS servers enforce strict rate limits to prevent automated scraping. If you query the same registrar too frequently, your IP will be temporarily blocked. Use bulk RDAP APIs or space out your queries to avoid port 43 bans.
                </p>
              </div>

              <div className="bg-[#0f141a] border border-blue-500/10 p-6 rounded-2xl">
                <h4 className="text-blue-400 font-bold text-base mb-3 flex items-center gap-2">
                  <Globe className="w-5 h-5 shrink-0" /> Error: Domain Not Found
                </h4>
                <p className="text-sm text-gray-400 leading-relaxed font-sans">
                  If WHOIS returns "No match for domain," it means the domain is unregistered and available for purchase, or you queried an incorrect TLD server (e.g., querying the .com database for a .co.uk domain).
                </p>
              </div>
            </div>

            {/* Author Profile Card (E-E-A-T) */}
            <div className="flex flex-col md:flex-row items-center gap-8 p-8 bg-gradient-to-r from-[#0d1117] to-surface-900 border border-white/10 rounded-3xl shadow-xl">
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
                  Surendra is a cybersecurity engineer specializing in Open Source Intelligence (OSINT), exposure intelligence, and AI-driven threat analysis. He built ReconShield to democratize access to enterprise-grade infrastructure visibility tools and secure digital assets.
                </p>
                <div className="flex gap-6 text-sm font-mono">
                  <a href="https://linkedin.com/in/surendrareddy3" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 flex items-center gap-1">LinkedIn <ChevronRight className="w-3 h-3"/></a>
                  <a href="https://github.com/nsurendrareddy" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white flex items-center gap-1">GitHub <ChevronRight className="w-3 h-3"/></a>
                </div>
              </div>
            </div>
            
            <div className="text-center text-[10px] font-mono text-gray-600 uppercase tracking-widest pt-8">
              Last Updated: June 2026 | Reviewed by ReconShield Editorial Board | Sources: ICANN, IETF RFC 3912, RFC 7480
            </div>
          </div>
        </section>

        {/* Internal Linking / Conversion Block */}
        <section className="py-20 bg-[#05080f]" aria-label="Related Security Tools">
          <div className="max-w-[1000px] mx-auto px-6">
            <h2 className="text-3xl font-display font-bold text-white mb-10 text-center">Complete Your Infrastructure Audit</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/tools/ip-lookup" className="p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-cyan-500/30 transition-all group">
                <Network className="w-8 h-8 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-white font-bold text-lg mb-2">IP Reputation Scanner</h4>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">Analyze the reputation, geolocation, and ASN of the IP hosting the domain.</p>
                <span className="text-cyan-400 text-xs font-mono flex items-center gap-1">Run IP Scan <ChevronRight className="w-3 h-3"/></span>
              </Link>
              
              <Link href="/tools/dns-lookup" className="p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-purple-500/30 transition-all group">
                <Database className="w-8 h-8 text-purple-400 mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-white font-bold text-lg mb-2">DNS Records Lookup</h4>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">Resolve authoritative A, MX, TXT, and CNAME records to map infrastructure routing.</p>
                <span className="text-purple-400 text-xs font-mono flex items-center gap-1">Check DNS <ChevronRight className="w-3 h-3"/></span>
              </Link>

              <Link href="/tools/ssl-checker" className="p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-[#00ff88]/30 transition-all group">
                <Shield className="w-8 h-8 text-[#00ff88] mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-white font-bold text-lg mb-2">SSL/TLS Checker</h4>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">Verify the cryptographic security of the domain's TLS certificates and check expiration.</p>
                <span className="text-[#00ff88] text-xs font-mono flex items-center gap-1">Audit SSL <ChevronRight className="w-3 h-3"/></span>
              </Link>
            </div>
          </div>
        </section>

        {/* Frequently Asked Questions */}
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
