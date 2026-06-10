import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { 
  Shield, Globe, Server, Lock, Terminal, CheckCircle2, ChevronRight, 
  Search, Activity, Target, Network, Info, Check, AlertTriangle, 
  FileText, Send, HelpCircle, BookOpen, Key, Database, Users, Layers, Clock
} from 'lucide-react';
import { generateBaseMetadata } from '@/utils/metadata';

const ToolScannerClient = dynamic(() => import('@/components/ToolScannerClient'), {
  loading: () => <div className="min-h-[400px] animate-pulse bg-surface-900/50 rounded-3xl max-w-5xl mx-auto my-12" />
});

export const metadata = generateBaseMetadata({
  title: "DNS Lookup Tool (Free) | Check DNS Records Online",
  description: "Perform a free DNS lookup to analyze A, AAAA, MX, TXT, CNAME, NS, SPF, DKIM, DMARC, and DNSSEC records.",
  path: "/tools/dns-lookup"
});

export default function DnsLookupPage() {
  const faqs = [
    {
      q: "What is a DNS lookup?",
      a: "A DNS lookup is a public query process that queries domain name system servers to resolve and retrieve configured zone files, such as A, MX, or TXT records. It maps human-readable domain hostnames into machine-readable IP addresses to establish network connectivity."
    },
    {
      q: "How do I check DNS records?",
      a: "You can check DNS records using the ReconShield DNS Lookup tool. Simply enter the target domain, select the specific record type (such as A, CNAME, or MX) or select 'ANY' for a full query, and initiate the lookup to retrieve real-time registration data."
    },
    {
      q: "What is DNS propagation?",
      a: "DNS propagation is the process of updating DNS record modifications across recursive resolvers worldwide. It is controlled by the Time-to-Live (TTL) configuration in zone files and can take anywhere from a few minutes up to 48 hours to complete globally."
    },
    {
      q: "What is an MX record?",
      a: "An MX (Mail Exchanger) record is a DNS resource entry that specifies the mail servers designated to accept incoming emails on behalf of a domain. It includes priority values to route messages through backup servers if the primary fails."
    },
    {
      q: "What is a TXT record?",
      a: "A TXT (Text) record is a DNS record containing human-readable and machine-readable text parameters. It is commonly used for domain ownership verification, email security authentication (SPF, DKIM, DMARC), and custom service validation policies."
    },
    {
      q: "What is DNSSEC?",
      a: "DNSSEC (Domain Name System Security Extensions) adds cryptographic signatures to DNS records. Resolvers use these signatures to verify that the returned DNS data is authentic and has not been tampered with or redirected by an attacker in transit."
    },
    {
      q: "What causes NXDOMAIN errors?",
      a: "An NXDOMAIN (Non-Existent Domain) error indicates that the domain queried does not exist in the authoritative registry. This is caused by spelling mistakes, expired domain registrations, missing nameserver delegations, or incomplete DNS zone files."
    },
    {
      q: "What is an A record?",
      a: "An A (Address) record maps a domain name directly to an IPv4 address (such as 192.0.2.1), directing client web browsers to the target web server hosting the website."
    },
    {
      q: "What is a CNAME record?",
      a: "A CNAME (Canonical Name) record is an alias record that points one domain name to another (e.g., www.example.com to example.com). The DNS resolver executes a secondary query to resolve the destination domain's IP."
    },
    {
      q: "What is a CAA record?",
      a: "A CAA (Certification Authority Authorization) record is a DNS security record that specifies which certificate authorities are permitted to issue SSL/TLS certificates for a domain, preventing unauthorized certificate generation."
    },
    {
      q: "What is an SOA record?",
      a: "An SOA (Start of Authority) record marks the start of a DNS zone. It contains essential administrative details, including the primary nameserver, admin email address, serial number, and zone refresh timers."
    },
    {
      q: "What is an AAAA record?",
      a: "An AAAA record maps a domain name to an IPv6 address (Internet Protocol version 6), allowing modern clients to resolve and connect to hosting servers using 128-bit network addresses."
    },
    {
      q: "How does DMARC protect against email spoofing?",
      a: "DMARC (Domain-based Message Authentication, Reporting, and Conformance) matches SPF and DKIM signatures. It enables domain owners to set policies (none, quarantine, reject) blocking unauthorized emails using the domain name."
    },
    {
      q: "Why is SPF alignment important?",
      a: "SPF alignment checks if the sender domain in the message header matches the domain authorized in the SPF DNS record, ensuring unauthorized servers cannot spoof mail origins."
    },
    {
      q: "What is a recursive resolver?",
      a: "A recursive resolver is a DNS server that queries authoritative servers on behalf of a client browser, tracking down root, TLD, and nameservers to resolve and return the final IP address."
    }
  ];

  const breadcrumbs = [
    { name: "Home", url: "https://reconshield.in" },
    { name: "Tools", url: "https://reconshield.in/tools" },
    { name: "DNS Lookup", url: "https://reconshield.in/tools/dns-lookup" }
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
          "@id": "https://reconshield.in/tools/dns-lookup#webpage",
          "url": "https://reconshield.in/tools/dns-lookup",
          "name": "DNS Lookup Tool (Free) | Check DNS Records Online",
          "isPartOf": { "@id": "https://reconshield.in/#website" }
        },
        {
          "@type": "SoftwareApplication",
          "@id": "https://reconshield.in/tools/dns-lookup#software",
          "name": "ReconShield DNS Analyzer",
          "url": "https://reconshield.in/tools/dns-lookup",
          "description": "Free DNS check and lookup app to audit domain nameserver records and email validation compliance.",
          "applicationCategory": "SecurityApplication",
          "operatingSystem": "All",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "publisher": { "@id": "https://reconshield.in/#organization" }
        },
        {
          "@type": "WebApplication",
          "@id": "https://reconshield.in/tools/dns-lookup#webapp",
          "name": "ReconShield DNS Records Lookup Tool",
          "url": "https://reconshield.in/tools/dns-lookup",
          "description": "Perform recursive DNS resolutions on A, AAAA, MX, TXT, and CNAME records directly from authoritative resolvers.",
          "applicationCategory": "SecurityApplication",
          "operatingSystem": "All",
          "browserRequirements": "Requires JavaScript. Requires HTML5.",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "publisher": { "@id": "https://reconshield.in/#organization" }
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://reconshield.in/tools/dns-lookup#breadcrumb",
          "itemListElement": breadcrumbs.map((crumb, idx) => ({
            "@type": "ListItem",
            "position": idx + 1,
            "name": crumb.name,
            "item": crumb.url
          }))
        },
        {
          "@type": "TechArticle",
          "@id": "https://reconshield.in/tools/dns-lookup#article",
          "headline": "The Technical Specification of Domain Name Resolution and DNS Infrastructure Audits",
          "description": "An in-depth analysis of Domain Name System mechanics, recursive vs authoritative queries, SPF/DKIM/DMARC configurations, and network security audit methodologies.",
          "author": { "@type": "Person", "name": "Surendra Reddy" },
          "publisher": { "@id": "https://reconshield.in/#organization" },
          "url": "https://reconshield.in/tools/dns-lookup",
          "isPartOf": { "@id": "https://reconshield.in/tools/dns-lookup#webpage" }
        },
        {
          "@type": "HowTo",
          "@id": "https://reconshield.in/tools/dns-lookup#howto",
          "name": "How to perform a DNS lookup query",
          "description": "Follow this guide to inspect your website's public DNS configurations and security records.",
          "step": [
            { "@type": "HowToStep", "name": "Enter Domain Hostname", "text": "Input the target domain (e.g., reconshield.in) in the input bar." },
            { "@type": "HowToStep", "name": "Select Query Mode", "text": "Select the DNS record type or run a complete zone query." },
            { "@type": "HowToStep", "name": "Inspect Zone Records", "text": "Review resolved IP addresses, mail exchange priorities, and text validation parameters." }
          ],
          "isPartOf": { "@id": "https://reconshield.in/tools/dns-lookup#webpage" }
        },
        {
          "@type": "FAQPage",
          "@id": "https://reconshield.in/tools/dns-lookup#faq",
          "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": { "@type": "Answer", "text": faq.a }
          })),
          "isPartOf": { "@id": "https://reconshield.in/tools/dns-lookup#webpage" }
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
            <Database className="w-4 h-4 text-[#00ff88]" />
            <span>Authoritative Zone Resolution Module</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 tracking-tight">
            DNS Lookup Tool
          </h1>
          
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed font-sans">
            Resolve DNS configurations in real-time. Verify A, AAAA, MX, TXT, CNAME, NS, and CAA records. Audit SPF, DKIM, and DMARC alignments, and detect DNSSEC signatures instantly.
          </p>

          <div className="max-w-4xl mx-auto mb-12">
            <ToolScannerClient toolId="dns-lookup" title="DNS Lookup" desc="Query and audit DNS records for any domain." />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-gray-500 uppercase tracking-widest">
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#00ff88]" /> Authoritative Queries</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#00ff88]" /> Email Auth Diagnostics</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#00ff88]" /> DNSSEC Verification</div>
          </div>
        </div>
      </section>

      {/* AI Overview / Featured Snippet Optimization */}
      <section className="py-12 bg-[#05080f] border-b border-white/5" aria-label="AI Search Overview">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="bg-gradient-to-r from-emerald-500/5 to-teal-500/5 border border-emerald-500/10 rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00ff88]/5 blur-[50px] rounded-full pointer-events-none" />
            
            {/* Definition Block: What Is DNS Lookup? */}
            <h2 className="font-mono text-xs text-[#00ff88] uppercase tracking-wider mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#00ff88]" /> AI Overview Snippet: DNS Resolution & Records
            </h2>
            <div className="space-y-6 text-sm text-gray-300 font-sans leading-relaxed">
              <div>
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Definition Block: What Is DNS Lookup?</span>
                <p className="text-gray-300">
                  A <strong>DNS lookup</strong> is the query and resolution process of retrieving resource records from authoritative nameservers for a specified domain name. This process translates human-readable hostnames into network routing IP addresses, mail exchange priority vectors, security authentication keys, and certification policies.
                </p>
              </div>

              {/* Definition Block: What Is a DNS Record? */}
              <div className="border-t border-white/5 pt-4">
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Definition Block: What Is a DNS Record?</span>
                <p className="text-gray-300">
                  A <strong>DNS record</strong> is a database entry residing within a domain's zone configuration file. Mapped by standard RFC definitions, records allocate specific properties to hostname lookups, directing client connections to IPv4 hosts (A), IPv6 hosts (AAAA), target alias canonical configurations (CNAME), or designated mail exchanges (MX).
                </p>
              </div>

              {/* Definition Block: What Is DNS Propagation? */}
              <div className="border-t border-white/5 pt-4">
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Definition Block: What Is DNS Propagation?</span>
                <p className="text-gray-300">
                  <strong>DNS propagation</strong> is the latency period during which new or modified DNS records are distributed and cached across public recursive DNS resolvers globally. The duration is controlled by the record's Time-To-Live (TTL) header setting, taking from 5 minutes to 48 hours.
                </p>
              </div>

              {/* Definition Block: What Is DNSSEC? */}
              <div className="border-t border-white/5 pt-4">
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Definition Block: What Is DNSSEC?</span>
                <p className="text-gray-300">
                  <strong>DNSSEC (Domain Name System Security Extensions)</strong> is a suite of IETF specifications (RFCs 4033-4035) that secures the DNS resolution system by adding digital signatures to resource records. DNSSEC protects resolvers from cache poisoning and spoofing by verifying that responses originate from authenticated authoritative zone keys.
                </p>
              </div>
              
              {/* TLDR Section & Key Takeaways */}
              <div className="border-t border-white/5 pt-4">
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// TL;DR Section</span>
                <p className="text-gray-400 text-xs font-mono">
                  DNS lookups resolve hostnames into routing configurations. Resource records inside zone files direct web, mail, and cryptographic security traffic. Setting correct TTL settings manages propagation speed, while configuring SPF, DKIM, and DMARC protects domain mail chains.
                </p>
              </div>

              <div className="border-t border-white/5 pt-4">
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Key Takeaways</span>
                <ul className="list-disc pl-5 text-gray-400 text-xs space-y-2 font-mono">
                  <li><strong>Hierary Resolution:</strong> Queries traverse Root, TLD, and Authoritative nameservers.</li>
                  <li><strong>TTL Controls:</strong> Lower TTL metrics speed up propagation but increase query load.</li>
                  <li><strong>Email Hardening:</strong> SPF, DKIM, and DMARC prevent domain spoofing.</li>
                  <li><strong>CAA Restraints:</strong> CAA records restrict SSL/TLS certificate issuance.</li>
                </ul>
              </div>

              {/* Fact Box: Common DNS Record Types */}
              <div className="border-t border-white/5 pt-4">
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Fact Box: Common DNS Record Types</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono text-gray-400 mt-2">
                  <div>
                    <span className="text-[10px] text-gray-600 uppercase block">A Record:</span>
                    <span>IPv4 Address Mapping</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-600 uppercase block">AAAA Record:</span>
                    <span>IPv6 Address Mapping</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-600 uppercase block">MX Record:</span>
                    <span>Mail Exchanger Target</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-600 uppercase block">TXT Record:</span>
                    <span>Text & Authentication</span>
                  </div>
                </div>
              </div>

              {/* Expert Summary */}
              <div className="border-t border-white/5 pt-4">
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Expert Summary</span>
                <p className="text-gray-400 text-xs leading-relaxed font-sans">
                  Analyzing DNS records is critical to maintaining a secure network presence. A single misconfigured TXT or CNAME record can expose organizations to email spoofing, subdomain hijacking, or routing failures. Implementing security extensions like DNSSEC, CAA, and strict email authentication frameworks is essential to protecting digital assets.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Educational Guide */}
      <div className="bg-[#05080f]">
        
        {/* H2: What Is DNS Lookup? */}
        <section className="py-20 border-b border-white/5">
          <div className="max-w-[1000px] mx-auto px-6 prose prose-invert max-w-none prose-p:leading-relaxed prose-p:text-gray-400 prose-headings:text-white prose-a:text-[#00ff88] hover:prose-a:text-[#00cc6a]">
            
            <h2 className="text-3xl font-display font-bold mt-0 mb-6 flex items-center gap-3">
              <Database className="w-8 h-8 text-[#00ff88]" />
              What Is DNS Lookup?
            </h2>
            <p>
              A <strong>DNS lookup</strong> is an information retrieval process that queries the global Domain Name System to resolve and extract resource records from zone files. Established under IETF RFC 1034 and RFC 1035, the DNS functions as a distributed directory routing internet traffic. When a client performs a lookup, it translates a domain hostname (e.g., <code>reconshield.in</code>) into computer-readable IP addresses, mail exchange priorities, and security validation properties.
            </p>

            {/* H2: How DNS Works */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">How DNS Works</h2>
            <p>
              Resolving a domain name involves a query routing loop that traverses four distinct server layers:
            </p>
            <div className="space-y-6 my-8 not-prose">
              <div className="relative border-l-2 border-[#00ff88]/30 pl-6 ml-3 space-y-6">
                <div>
                  <span className="absolute -left-[7px] w-3 h-3 rounded-full bg-[#00ff88]" />
                  <h5 className="text-white font-bold text-xs font-mono uppercase tracking-wider mb-1">Layer 1: DNS Recursor / Recursive Resolver</h5>
                  <p className="text-xs text-gray-400">The recursive resolver acts as an intermediary, receiving queries from client browsers and querying authoritative servers to resolve the domain's IP address.</p>
                </div>
                <div>
                  <span className="absolute -left-[7px] w-3 h-3 rounded-full bg-[#00ff88]" />
                  <h5 className="text-white font-bold text-xs font-mono uppercase tracking-wider mb-1">Layer 2: Root Nameservers</h5>
                  <p className="text-xs text-gray-400">If the record is not cached, the recursor queries one of the 13 global root nameservers, which direct the query to the appropriate TLD nameservers (e.g., <code>.in</code> registry).</p>
                </div>
                <div>
                  <span className="absolute -left-[7px] w-3 h-3 rounded-full bg-[#00ff88]" />
                  <h5 className="text-white font-bold text-xs font-mono uppercase tracking-wider mb-1">Layer 3: TLD Nameservers</h5>
                  <p className="text-xs text-gray-400">The Top-Level Domain (TLD) nameservers direct the recursive resolver to the authoritative nameservers managing the domain's DNS zone file.</p>
                </div>
                <div>
                  <span className="absolute -left-[7px] w-3 h-3 rounded-full bg-[#00ff88]" />
                  <h5 className="text-white font-bold text-xs font-mono uppercase tracking-wider mb-1">Layer 4: Authoritative Nameservers</h5>
                  <p className="text-xs text-gray-400">The authoritative name server holds the actual resource records. It returns the resolved record data to the recursor, which caches it and returns it to the client.</p>
                </div>
              </div>
            </div>

            {/* H2: What Information DNS Records Contain */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">What Information DNS Records Contain</h2>
            <p>
              DNS records contain structured parameters defining target hosts, cache control headers, and validation protocols. A standard record includes:
            </p>
            <ul>
              <li><strong>Record Name:</strong> The subdomain or hostname mapped by the record (e.g., <code>@</code> for the root domain or <code>www</code>).</li>
              <li><strong>TTL (Time-To-Live):</strong> The duration in seconds that a recursive resolver is authorized to cache the record before fetching a fresh copy.</li>
              <li><strong>Record Class:</strong> The network namespace (typically <code>IN</code> for Internet).</li>
              <li><strong>Record Type:</strong> The resource type defining the data format (e.g., <code>A</code>, <code>MX</code>, <code>TXT</code>).</li>
              <li><strong>Record Data:</strong> The resolved payload, such as target IP addresses or server hostnames.</li>
            </ul>

            {/* H2: How to Check DNS Records */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">How to Check DNS Records</h2>
            <p>
              To check a domain's DNS records, use the ReconShield DNS Lookup tool:
            </p>
            <ol>
              <li>Input the target domain hostname in the search field.</li>
              <li>Select the specific record type you want to query, or select <code>ANY</code> to resolve all records.</li>
              <li>Click search to query authoritative nameservers and view the resolved record configurations.</li>
            </ol>

            {/* H2: A Record Explained */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">A Record Explained</h2>
            <p>
              An <strong>A (Address) record</strong> maps a domain name directly to an IPv4 address (e.g., <code>192.0.2.1</code>), directing client browsers to the target web server hosting the website.
            </p>

            {/* H2: AAAA Record Explained */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">AAAA Record Explained</h2>
            <p>
              An <strong>AAAA record</strong> performs the same function as an A record but maps domains to IPv6 addresses (e.g., <code>2001:db8::1</code>), supporting connections over the modern 128-bit IP addressing protocol.
            </p>

            {/* H2: MX Record Lookup */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">MX Record Lookup</h2>
            <p>
              An <strong>MX (Mail Exchanger) record</strong> specifies the mail servers designated to accept incoming emails on behalf of a domain. It includes priority values to route messages through backup servers if the primary fails.
            </p>

            {/* H2: TXT Record Lookup */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">TXT Record Lookup</h2>
            <p>
              A <strong>TXT (Text) record</strong> contains arbitrary text strings. They are widely used for domain ownership validation, email security policies, and third-party service verification.
            </p>

            {/* H2: SPF Record Explained */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">SPF Record Explained</h2>
            <p>
              An <strong>SPF (Sender Policy Framework) record</strong> is a TXT entry listing authorized IP addresses and subnets permitted to send emails for a domain, preventing email spoofing.
            </p>

            {/* H2: DKIM Record Explained */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">DKIM Record Explained</h2>
            <p>
              <strong>DKIM (DomainKeys Identified Mail)</strong> adds a cryptographic signature to email headers. Receiving servers use the public key published in the domain's DNS records to verify that the email was sent by the domain owner and has not been modified in transit.
            </p>

            {/* H2: DMARC Record Explained */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">DMARC Record Explained</h2>
            <p>
              <strong>DMARC (Domain-based Message Authentication, Reporting, and Conformance)</strong> ties SPF and DKIM validation together. It specifies a policy (none, quarantine, or reject) instructing receiving servers on how to handle emails that fail authentication.
            </p>

            {/* H2: CNAME Record Explained */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">CNAME Record Explained</h2>
            <p>
              A <strong>CNAME (Canonical Name) record</strong> is an alias record that points one domain name to another (e.g., mapping <code>blog.reconshield.in</code> to <code>reconshield.in</code>). The DNS resolver executes a secondary query to resolve the destination domain's IP.
            </p>

            {/* H2: NS Record Explained */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">NS Record Explained</h2>
            <p>
              An <strong>NS (Nameserver) record</strong> specifies the authoritative nameservers delegated to manage the domain's DNS zone files.
            </p>

            {/* H2: SOA Record Explained */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">SOA Record Explained</h2>
            <p>
              A <strong>SOA (Start of Authority) record</strong> marks the start of a DNS zone. It contains essential administrative details, including the primary nameserver, admin email address, serial number, and zone refresh timers.
            </p>

            {/* H2: CAA Record Explained */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">CAA Record Explained</h2>
            <p>
              A <strong>CAA (Certification Authority Authorization) record</strong> is a DNS security record that specifies which certificate authorities are permitted to issue SSL/TLS certificates for a domain, protecting against fraudulent certificate generation.
            </p>

            {/* H2: DNSSEC Explained */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">DNSSEC Explained</h2>
            <p>
              <strong>DNSSEC (Domain Name System Security Extensions)</strong> secures the resolution process by adding cryptographic signatures (RRSIG) to existing DNS records. These signatures are validated using a chain of trust that extends from the parent zone (e.g., TLD registry) down to the child domain nameservers using DS and DNSKEY records.
            </p>

            {/* H2: DNS Propagation Explained */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">DNS Propagation Explained</h2>
            <p>
              When a DNS record is updated, it takes time for the change to distribute globally. This delay is known as <strong>DNS propagation</strong>. Resolvers cache records based on their <strong>Time To Live (TTL)</strong> settings. Until the cached TTL expires, resolvers continue serving the old values. Propagation typically takes from 5 minutes to 48 hours to complete.
            </p>

            {/* H2: DNS Troubleshooting Guide */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">DNS Troubleshooting Guide</h2>
            <p>
              When troubleshooting DNS resolution issues, use command-line utilities like <code>dig</code> or <code>nslookup</code>:
            </p>
            <ul>
              <li><strong>Authoritative Query:</strong> Query nameservers directly to bypass local resolver caches: <code>dig @ns1.dns-provider.com example.com A</code>.</li>
              <li><strong>Trace Resolution:</strong> Trace the full resolution path from root servers down to the authoritative nameserver: <code>dig example.com +trace</code>.</li>
            </ul>

            {/* H2: Common DNS Errors */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">Common DNS Errors</h2>
            <p>
              Common DNS resolution errors include:
            </p>
            <ul>
              <li><strong>NXDOMAIN (Non-Existent Domain):</strong> The queried domain does not exist in the authoritative registry.</li>
              <li><strong>SERVFAIL (Server Failure):</strong> The authoritative nameservers failed to respond or returned invalid records.</li>
              <li><strong>REFUSED (Query Refused):</strong> The nameserver refused to process the query due to local policy constraints.</li>
            </ul>

            {/* H2: DNS Security Best Practices */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">DNS Security Best Practices</h2>
            <p>
              Secure your domain's DNS infrastructure by implementing these best practices:
            </p>
            <ol>
              <li>Enable **DNSSEC** to prevent cache poisoning and spoofing attacks.</li>
              <li>Configure **CAA records** to restrict SSL/TLS certificate issuance to authorized CAs.</li>
              <li>Implement **SPF, DKIM, and DMARC** records to prevent email spoofing.</li>
              <li>Audit CNAME records regularly to prevent **subdomain takeover** attacks on expired cloud resources.</li>
            </ol>

          </div>
        </section>

        {/* DNS Troubleshooting Matrix */}
        <section className="py-20 bg-[#0a0d14] border-b border-white/5">
          <div className="max-w-[1000px] mx-auto px-6 prose prose-invert max-w-none">
            <h2 className="text-3xl font-display font-bold text-white mb-6">Common DNS Resolution Errors</h2>
            <p className="text-gray-400 mb-8">
              Understand common DNS error codes returned during troubleshooting queries:
            </p>

            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0d1117] not-prose my-8">
              <table className="w-full text-left text-sm text-gray-400 border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.02] text-white font-mono uppercase text-xs">
                    <th className="p-4">Error Code</th>
                    <th className="p-4 border-l border-white/10">Full Name</th>
                    <th className="p-4 border-l border-white/10">Root Cause</th>
                    <th className="p-4 border-l border-white/10">Remediation Steps</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono text-xs">
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-4 font-semibold text-white">NXDOMAIN</td>
                    <td className="p-4 border-l border-white/10 text-red-400">Non-Existent Domain</td>
                    <td className="p-4 border-l border-white/10">The domain name does not exist at the registry or has expired.</td>
                    <td className="p-4 border-l border-white/10">Verify spelling, check WHOIS status flags, and confirm registration validity.</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-4 font-semibold text-white">SERVFAIL</td>
                    <td className="p-4 border-l border-white/10 text-red-400">Server Failure</td>
                    <td className="p-4 border-l border-white/10">The authoritative nameservers failed to respond or returned invalid records.</td>
                    <td className="p-4 border-l border-white/10">Verify DNSSEC signature validity, check nameserver firewall logs.</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-4 font-semibold text-white">REFUSED</td>
                    <td className="p-4 border-l border-white/10 text-yellow-400">Query Refused</td>
                    <td className="p-4 border-l border-white/10">The nameserver refused to process the query due to local policy constraints.</td>
                    <td className="p-4 border-l border-white/10">Check ACL settings on your BIND/PowerDNS servers, verify request origins.</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-4 font-semibold text-white">TIMEOUT</td>
                    <td className="p-4 border-l border-white/10 text-yellow-400">Query Timeout</td>
                    <td className="p-4 border-l border-white/10">No response received within the lookup window.</td>
                    <td className="p-4 border-l border-white/10">Verify network routing, check port 53 (UDP/TCP) blockages.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* E-E-A-T credentials */}
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
                  Information is verified against active DNS zones, registrar configurations, and IETF specifications (including RFC 1035 and RFC 4033-4035). Each section is tested for technical accuracy under modern browser routing environments.
                </p>
              </div>
            </div>

            <div className="text-center text-[10px] font-mono text-gray-600 uppercase tracking-widest mt-12">
              Last Updated: June 2026 | Reviewed by ReconShield Editorial Board | Reference: Internet Engineering Task Force (IETF) RFC 1035, RFC 4033-4035
            </div>
          </div>
        </section>

        {/* Semantic Internal Links (Phase 7 - Internal Linking) */}
        <section className="py-20 bg-[#05080f]" aria-label="Related Security Tools">
          <div className="max-w-[1000px] mx-auto px-6">
            <h2 className="text-3xl font-display font-bold text-white mb-10 text-center">Complete Your Network Asset Audit</h2>
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
