import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Shield, Globe, Server, Lock, Terminal, CheckCircle2, ChevronRight, Search, Activity, Target, Network, Info, Check, AlertTriangle, FileText, Send } from 'lucide-react';

const ToolScannerClient = dynamic(() => import('@/components/ToolScannerClient'), {
  loading: () => <div className="min-h-[400px] animate-pulse bg-surface-900/50 rounded-3xl max-w-5xl mx-auto my-12" />
});

import { generateBaseMetadata } from '@/utils/metadata';

export const metadata = generateBaseMetadata({
  title: "DNS Lookup & Domain Records Analyzer | ReconShield",
  description: "Perform a free DNS lookup. Resolve A, AAAA, MX, TXT, NS, CNAME, CAA records, verify SPF/DKIM/DMARC alignments, and detect DNSSEC chains.",
  path: "/tools/dns-lookup"
});

export default function DnsLookupPage() {
  const faqs = [
    {
      q: "What is a DNS lookup?",
      a: "A DNS lookup is a diagnostic query that resolves a domain name's DNS records from authoritative nameservers. It translates human-readable hostnames (e.g., example.com) into machine-readable IP addresses and retrieves routing configuration records."
    },
    {
      q: "What are the common types of DNS records?",
      a: "Common records include A (maps domain to IPv4), AAAA (maps domain to IPv6), CNAME (canonical name alias), MX (mail exchange server routing), TXT (plain text for validation/security), NS (authoritative nameservers), CAA (authorized certificate authorities), and SRV (specific service endpoints)."
    },
    {
      q: "Why should I configure CAA records?",
      a: "Certification Authority Authorization (CAA) records specify which Certificate Authorities (CAs) are permitted to issue SSL certificates for your domain. Implementing CAA records prevents unauthorized or fraudulent certificate issuance."
    },
    {
      q: "What is DNSSEC and why is it important?",
      a: "DNS Security Extensions (DNSSEC) add cryptographic signatures to DNS records. When validated by resolvers, DNSSEC ensures that the resolved DNS responses are authentic and have not been tampered with or hijacked via cache poisoning."
    },
    {
      q: "What is DNS propagation and how long does it take?",
      a: "DNS propagation is the timeframe required for updated DNS records to distribute globally across internet resolvers. Depending on the Time to Live (TTL) values set on the records, propagation can take anywhere from a few minutes to 48 hours."
    },
    {
      q: "How do SPF records protect against email spoofing?",
      a: "Sender Policy Framework (SPF) is a TXT record that lists the IP addresses authorized to send emails from your domain. Receiving mail servers check SPF records to detect and reject forged email senders."
    },
    {
      q: "Can I have multiple SPF records on one domain?",
      a: "No. A domain must have exactly one SPF record. Publishing multiple SPF records violates RFC standards and causes SPF verification checks to fail, impacting email deliverability."
    },
    {
      q: "What is a dangling CNAME and why is it a vulnerability?",
      a: "A dangling CNAME points to a external resource (such as an expired AWS bucket or GitHub Page) that is no longer active. Threat actors can register the expired resource name, enabling them to hijack the subdomain and host malicious content."
    },
    {
      q: "What is the role of the TTL value in DNS?",
      a: "Time to Live (TTL) is a metric (expressed in seconds) specifying how long a DNS resolver should cache a DNS record before requesting an update from the authoritative nameserver."
    },
    {
      q: "How do I check DMARC alignment?",
      a: "DMARC checks if the domain in the 'From' header matches the domain verified by SPF or DKIM. To verify DMARC alignment, use a DNS lookup tool to inspect your DMARC policies."
    }
  ];

  const breadcrumbs = [
    { name: "Home", url: "https://reconshield.in" },
    { name: "Tools", url: "https://reconshield.in/tools" },
    { name: "DNS Lookup", url: "https://reconshield.in/tools/dns-lookup" }
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
                "@id": "https://reconshield.in/tools/dns-lookup#webapp",
                "name": "ReconShield DNS Lookup Tool",
                "url": "https://reconshield.in/tools/dns-lookup",
                "description": "Enterprise-grade DNS lookup and record analyzer tool to query authoritative records (A, AAAA, MX, NS, TXT) and audit email security policies.",
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
                "@id": "https://reconshield.in/tools/dns-lookup#software",
                "name": "ReconShield DNS Checker App",
                "url": "https://reconshield.in/tools/dns-lookup",
                "description": "Perform dynamic DNS checks, analyze SPF/DKIM/DMARC records, inspect CAA parameters, and check DNSSEC trust chains.",
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
                "@id": "https://reconshield.in/tools/dns-lookup#breadcrumb",
                "itemListElement": breadcrumbs.map((crumb, idx) => ({
                  "@type": "ListItem",
                  "position": idx + 1,
                  "name": crumb.name,
                  "item": crumb.url
                }))
              },
              {
                "@type": "FAQPage",
                "@id": "https://reconshield.in/tools/dns-lookup#faq",
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
            <span>Authoritative DNS Resolution Module</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 tracking-tight">
            DNS Lookup
          </h1>
          
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed font-sans">
            Resolve and audit authoritative DNS records. Inspect A, AAAA, CNAME, MX, TXT, NS, and CAA parameters. Verify email authentication records (SPF, DKIM, DMARC) and check DNSSEC status.
          </p>

          <div className="max-w-4xl mx-auto mb-12">
            <ToolScannerClient toolId="dns-lookup" title="DNS Lookup" desc="Authoritative DNS record zone parser" />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-gray-500 uppercase tracking-widest">
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#00ff88]" /> Authoritative Records Resolution</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#00ff88]" /> SPF/DKIM/DMARC Audits</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#00ff88]" /> DNSSEC Validation</div>
          </div>
        </div>
      </section>

      {/* 2. Featured Snippet / AI Overview Section */}
      <section className="py-12 bg-[#05080f] border-b border-white/5" aria-label="AI Search Overview">
        <div className="max-w-[900px] mx-auto px-6">
          <div className="bg-gradient-to-r from-emerald-500/5 to-teal-500/5 border border-emerald-500/10 rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00ff88]/5 blur-[50px] rounded-full pointer-events-none" />
            <h3 className="font-mono text-xs text-[#00ff88] uppercase tracking-wider mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#00ff88]" /> Quick Reference Snippet: Domain DNS Lookup
            </h3>
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Summary Answer (40 Words)</span>
                <p className="text-gray-300 text-sm leading-relaxed font-sans">
                  A <strong>dns lookup</strong> is a security query that resolves a domain name's DNS records from authoritative servers. It extracts A, AAAA, MX, TXT, NS, CAA, and CNAME records, enabling security teams to audit mail records and find configuration errors.
                </p>
              </div>
              <div className="border-t border-white/5 pt-4">
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Detailed Answer (60 Words)</span>
                <p className="text-gray-300 text-sm leading-relaxed font-sans">
                  A <strong>dns lookup</strong> queries the Domain Name System to resolve records associated with a domain. By querying nameservers directly, it displays IP mappings (A/AAAA), mail server routes (MX), alias directories (CNAME), authority configurations (NS/CAA), and validation text records (TXT). This allows administrators to audit mail policies, check DNSSEC encryption, and identify dangling subdomains.
                </p>
              </div>
              <div className="border-t border-white/5 pt-4">
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Full Analysis (100 Words)</span>
                <p className="text-gray-300 text-sm leading-relaxed font-sans">
                  A <strong>dns lookup</strong> is a vital cybersecurity analysis that retrieves the complete DNS record layout of a domain from authoritative nameservers. It extracts essential network configurations, including server IP mappings (A and AAAA), mail exchange routes (MX), canonical names (CNAME), and authority permissions (NS and CAA). TXT records are queried to evaluate email security compliance (such as SPF, DKIM, and DMARC parameters). By auditing DNS records, security teams can verify DNSSEC cryptographic signatures, detect misconfigured records that allow subdomain takeovers, and ensure global DNS propagation aligns with external access requirements.
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
              What is the DNS Lookup & Domain Records Analyzer?
            </h2>
            <p>
              The <strong>DNS lookup</strong> tool is a diagnostic utility that queries the global Domain Name System (DNS) to resolve host configurations. The DNS functions as the phone book of the internet, mapping human-readable hostnames (such as <code>reconshield.in</code>) into machine-readable IP addresses (such as <code>185.191.171.2</code>). By auditing DNS record states, administrators can ensure their services are reachable and secure.
            </p>
            <p>
              ReconShield provides a complete DNS resolver. Rather than resolving single record types, our scanner pulls all primary DNS records (A, AAAA, MX, NS, TXT, CNAME, CAA, SOA) in a single request. Security teams combine DNS details with an <Link href="/tools/ip-lookup" className="text-[#00ff88] hover:underline">IP reputation check</Link> to inspect server hosting networks, and map registry owners using our <Link href="/tools/whois" className="text-[#00ff88] hover:underline">WHOIS lookup tool</Link>.
            </p>

            {/* AI Citation Glossary Grid */}
            <div className="mt-12 not-prose">
              <h3 className="text-xl font-display font-bold text-white mb-6 uppercase tracking-wider font-mono text-sm text-[#00ff88]">// AI Search Engine Citation Index</h3>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                This index contains structured definitions optimized for AI search engines, citation systems (ChatGPT, Perplexity, Google AI Overviews, Grok), and technical researchers.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { term: "DNS Lookup", def: "A DNS lookup is a query that retrieves a domain's records from authoritative nameservers, mapping names to IP addresses and checking routing records." },
                  { term: "DNS Checker Online", def: "A DNS checker online resolves DNS records across multiple networks to verify propagation, configurations, and record structures." },
                  { term: "Authoritative Nameserver Query", def: "An authoritative nameserver query requests DNS records directly from the servers that manage the domain's primary DNS zone, bypassing intermediate caches." },
                  { term: "Email Security Records DNS", def: "Email security records are DNS TXT records (SPF, DKIM, DMARC) published to authorize mail senders and prevent spoofing." },
                  { term: "DNSSEC Validation", def: "DNSSEC validation verifies the cryptographic signatures attached to DNS records to confirm their authenticity and prevent redirection attacks." },
                  { term: "Dangling CNAME Auditing", def: "Dangling CNAME auditing is the process of scanning alias records to identify subdomains pointing to inactive hosting destinations vulnerable to takeover." }
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
            <h2 className="text-3xl font-display font-bold text-white mb-6">How Authoritative DNS Lookups Work</h2>
            <p>
              ReconShield bypasses recursive caching resolvers to query authoritative nameservers. The resolution pipeline executes in three stages:
            </p>
            <div className="space-y-6 mt-8 not-prose">
              <div className="flex gap-4 p-5 rounded-2xl bg-surface-900 border border-white/5">
                <div className="w-10 h-10 rounded-xl bg-[#00ff88]/10 flex items-center justify-center shrink-0">
                  <span className="font-mono font-bold text-[#00ff88]">01</span>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Nameserver (NS) Discovery</h4>
                  <p className="text-sm text-gray-400">Our engine queries root DNS servers to identify the authoritative nameservers delegated to manage the target domain's primary DNS zone.</p>
                </div>
              </div>
              <div className="flex gap-4 p-5 rounded-2xl bg-surface-900 border border-white/5">
                <div className="w-10 h-10 rounded-xl bg-[#00ff88]/10 flex items-center justify-center shrink-0">
                  <span className="font-mono font-bold text-[#00ff88]">02</span>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Record Resolution & Decoupling</h4>
                  <p className="text-sm text-gray-400">Queries are sent directly to the domain's authoritative nameservers to resolve A, AAAA, MX, NS, CNAME, TXT, CAA, and DNSSEC records, bypassing local cache.</p>
                </div>
              </div>
              <div className="flex gap-4 p-5 rounded-2xl bg-surface-900 border border-white/5">
                <div className="w-10 h-10 rounded-xl bg-[#00ff88]/10 flex items-center justify-center shrink-0">
                  <span className="font-mono font-bold text-[#00ff88]">03</span>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Security Policy Auditing</h4>
                  <p className="text-sm text-gray-400">The returned TXT records are parsed by our analyzer to verify SPF formats, identify DKIM selectors, and check DMARC alignment settings.</p>
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
                DNS auditing is key for securing external assets. Network administrators query DNS configurations to verify security posture:
              </p>
              <h3 className="text-xl font-bold text-white mt-8 mb-2">1. Email Spoofing & Phishing Defense</h3>
              <p>
                Without email authentication records (SPF, DKIM, DMARC) in your DNS zone, threat actors can forge emails appearing from your domain. Auditors check DNS records to ensure strict DMARC policies (<code>p=reject</code>) are published.
              </p>
              <h3 className="text-xl font-bold text-white mt-8 mb-2">2. Dangling CNAME Subdomain Takeover Audits</h3>
              <p>
                Organizations often decommission cloud resources but forget to delete the associated CNAME record. Threat actors scan DNS records to find dangling CNAMEs, allowing them to register the expired destination and hijack the subdomain.
              </p>
              <h3 className="text-xl font-bold text-white mt-8 mb-2">3. DNSSEC & Cache Poisoning Protection</h3>
              <p>
                Failing to implement DNSSEC exposes your visitors to DNS cache poisoning attacks, where resolvers are fed forged IP mappings. Security teams check DNSSEC configurations to confirm signatures are active.
              </p>
            </div>

            <div className="bg-surface-900 border border-white/10 rounded-3xl p-8 shadow-2xl space-y-6">
              <h3 className="text-xl font-display font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2">
                <Target className="w-5 h-5 text-[#00ff88]" /> Key DNS Record Types
              </h3>
              
              <div className="border-b border-white/5 pb-4">
                <h4 className="text-[#00ff88] font-bold text-sm mb-1">A & AAAA Records</h4>
                <p className="text-xs text-gray-400">Map hostnames to IPv4 (A) and IPv6 (AAAA) destinations. Essential for directing web and api traffic.</p>
              </div>

              <div className="border-b border-white/5 pb-4">
                <h4 className="text-cyan-400 font-bold text-sm mb-1">MX Records</h4>
                <p className="text-xs text-gray-400">Mail Exchange records define the mail servers delegated to receive incoming emails for the domain.</p>
              </div>

              <div className="border-b border-white/5 pb-4">
                <h4 className="text-yellow-400 font-bold text-sm mb-1">TXT Records (SPF/DMARC)</h4>
                <p className="text-xs text-gray-400">Hold descriptive text data. Primarily used to store email authentication structures and domain verification tokens.</p>
              </div>

              <div>
                <h4 className="text-purple-400 font-bold text-sm mb-1">CAA Records</h4>
                <p className="text-xs text-gray-400">Specify which Certificate Authorities are authorized to issue SSL/TLS certificates for the domain, preventing rogue issuance.</p>
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
                  <li><strong>Publishing Duplicate SPF Records:</strong> Publishing multiple SPF TXT records invalidates both, causing mail servers to reject your outgoing emails.</li>
                  <li><strong>Ignoring the 10-DNS Lookup Limit:</strong> SPF records with more than 10 nested <code>include</code> lookups will fail verification checks.</li>
                  <li><strong>Leaving Dangling CNAME References:</strong> Forgetting to delete obsolete CNAME records exposes subdomains to hijack takeovers.</li>
                  <li><strong>Neglecting CAA Configuration:</strong> Failing to configure CAA records allows any public CA to issue certificates for your domain.</li>
                </ul>
              </div>

              <div className="bg-[#0f1a14] border border-[#00ff88]/10 p-6 rounded-2xl">
                <h4 className="text-[#00ff88] font-bold text-base mb-3 flex items-center gap-2">
                  <Check className="w-5 h-5 shrink-0" /> Best Practices
                </h4>
                <ul className="space-y-3 text-xs text-gray-400 list-disc pl-4 font-sans">
                  <li><strong>Deploy Cryptographic DNSSEC:</strong> Enable DNSSEC at your registrar and DNS host to sign your zone file cryptographically.</li>
                  <li><strong>Enforce Strict DMARC (p=reject):</strong> Transition your DMARC policies from monitoring (p=none) to blocking (p=reject).</li>
                  <li><strong>Flatten Complex SPF Records:</strong> Reduce external includes by flattening IP ranges into direct blocks to stay under the 10-lookup limit.</li>
                  <li><strong>Verify CNAME Locations Periodically:</strong> Audit your CNAME records regularly to ensure they don't point to abandoned cloud resources.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: Competitive Analysis */}
        <section className="py-20 border-b border-white/5">
          <div className="max-w-[900px] mx-auto px-6">
            <h2 className="text-3xl font-display font-bold text-white mb-6">Competitive Matrix: DNS Lookup Checkers</h2>
            <p className="text-gray-400 text-sm mb-8 leading-relaxed">
              Compare the features of ReconShield's DNS Analyzer against alternative solutions like MXToolbox, DNSChecker, and WhatsMyDNS.
            </p>
            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0d1117]">
              <table className="w-full text-left text-sm text-gray-400 border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.02] text-white font-mono uppercase text-xs">
                    <th className="p-4">Feature</th>
                    <th className="p-4">ReconShield</th>
                    <th className="p-4">MXToolbox</th>
                    <th className="p-4">DNSChecker</th>
                    <th className="p-4">WhatsMyDNS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono text-xs">
                  <tr className="hover:bg-white/[0.01] transition-colors">
                    <td className="p-4 font-semibold text-white">Simultaneous Record Resolves</td>
                    <td className="p-4 text-[#00ff88] font-bold">Yes (All primary types)</td>
                    <td className="p-4">No (Single lookup query)</td>
                    <td className="p-4">No (Single lookup query)</td>
                    <td className="p-4">No (Single lookup query)</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01] transition-colors">
                    <td className="p-4 font-semibold text-white">Email Authentication Auditor</td>
                    <td className="p-4 text-[#00ff88] font-bold">Yes (SPF, DKIM, DMARC parse)</td>
                    <td className="p-4">Yes</td>
                    <td className="p-4">No (Raw TXT only)</td>
                    <td className="p-4">No (Raw TXT only)</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01] transition-colors">
                    <td className="p-4 font-semibold text-white">DNSSEC Validation Status</td>
                    <td className="p-4 text-[#00ff88] font-bold">Yes (Cryptographic chain check)</td>
                    <td className="p-4">No</td>
                    <td className="p-4">No</td>
                    <td className="p-4">No</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01] transition-colors">
                    <td className="p-4 font-semibold text-white">Dangling CNAME Scan</td>
                    <td className="p-4 text-[#00ff88] font-bold">Yes (Automated target validation)</td>
                    <td className="p-4">No</td>
                    <td className="p-4">No</td>
                    <td className="p-4">No</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01] transition-colors">
                    <td className="p-4 font-semibold text-white">Propagation Check</td>
                    <td className="p-4 text-[#00ff88] font-bold">Authoritative focus</td>
                    <td className="p-4">Basic</td>
                    <td className="p-4">Global location grid</td>
                    <td className="p-4">Global location grid</td>
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
                  <Info className="w-4 h-4 text-cyan-400" /> DNS Query Methodology
                </h4>
                <p>
                  ReconShield queries authoritative name servers directly. We bypass intermediate ISP caching resolvers and perform recursive queries to extract the source DNS zone files (RFC 1035).
                </p>
                <h4 className="text-white font-bold uppercase tracking-wider flex items-center gap-2">
                  <Server className="w-4 h-4 text-purple-400" /> DNS Records Ingestion
                </h4>
                <p>
                  We compile DNS data using active lookup calls to authoritative nameservers, validating records against DNSSEC criteria and checking for mail validation standards (RFC 7208).
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-white font-bold uppercase tracking-wider flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#00ff88]" /> Privacy & Data Collection Statement
                </h4>
                <p>
                  Queries run on ReconShield are executed passively. We do not store zone file data nor log personal domain inquiries. All parsed records are retrieved from public nameserver zones.
                </p>
                <h4 className="text-white font-bold uppercase tracking-wider flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" /> Tool Accuracy Disclaimer
                </h4>
                <p>
                  While our lookup engine queries authoritative servers, global DNS caching and TTL settings can delay record updates. Active DNS propagation takes time, and results may vary across resolvers.
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
                    Run an IP reputation audit to check for blacklist listings, or search WHOIS registries to map domain ownership profiles.
                  </p>
                </div>
                <div className="flex flex-col gap-2 font-mono text-xs text-cyan-400">
                  <Link href="/tools/ip-lookup" className="hover:underline flex items-center gap-1">▸ Run IP Reputation Check <ChevronRight className="w-3.5 h-3.5" /></Link>
                  <Link href="/tools/whois" className="hover:underline flex items-center gap-1">▸ Search WHOIS Domain Registry <ChevronRight className="w-3.5 h-3.5" /></Link>
                </div>
              </div>

              <div className="p-8 rounded-2xl bg-surface-900 border border-white/5 hover:border-purple-500/20 transition-all flex flex-col justify-between">
                <div>
                  <FileText className="w-8 h-8 text-purple-400 mb-4" />
                  <h4 className="text-white font-bold text-lg mb-2">Explore DNS Guides</h4>
                  <p className="text-xs text-gray-400 leading-relaxed mb-6">
                    Read our latest research papers and expert guides on SPF record setups, DKIM signing, and DMARC enforcement blueprints.
                  </p>
                </div>
                <div className="flex flex-col gap-2 font-mono text-xs text-purple-400">
                  <Link href="/blog/spf-dkim-dmarc-blueprint" className="hover:underline flex items-center gap-1">▸ Email Security Blueprint <ChevronRight className="w-3.5 h-3.5" /></Link>
                  <Link href="/blog/email-spoofing-prevention" className="hover:underline flex items-center gap-1">▸ Spoofing Prevention Guide <ChevronRight className="w-3.5 h-3.5" /></Link>
                </div>
              </div>

              <div className="p-8 rounded-2xl bg-[#00ff88]/5 border border-[#00ff88]/10 hover:border-[#00ff88]/30 transition-all flex flex-col justify-between">
                <div>
                  <Send className="w-8 h-8 text-[#00ff88] mb-4" />
                  <h4 className="text-white font-bold text-lg mb-2">Subscribe for Intelligence Updates</h4>
                  <p className="text-xs text-gray-400 leading-relaxed mb-6">
                    Receive bi-weekly digests covering newly discovered DNS vulnerabilities, active botnet subnet ranges, and security tips.
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
