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
  title: "DNS Lookup & Domain Records Analyzer | ReconShield",
  description: "Perform a free authoritative DNS lookup. Verify A, AAAA, MX, TXT, CNAME, NS, and CAA records, audit SPF/DKIM/DMARC email configurations, and inspect DNSSEC.",
  path: "/tools/dns-lookup"
});

export default function DnsLookupPage() {
  const faqs = [
    {
      q: "What is a DNS lookup?",
      a: "A DNS lookup is a query process that resolves a domain name's DNS records from authoritative nameservers, translating human-readable hostnames into computer-readable IP addresses."
    },
    {
      q: "What is a DNS record?",
      a: "A DNS record is a database record residing within a DNS zone file. It maps host domains to specific resources, such as IP addresses (A/AAAA), mail servers (MX), canonical names (CNAME), or text parameters (TXT)."
    },
    {
      q: "How to check DNS records?",
      a: "To check DNS records, enter a domain name into the ReconShield DNS Lookup tool, choose the target record types, and run the scan. The tool queries authoritative servers directly and displays the records."
    },
    {
      q: "What is DNS propagation?",
      a: "DNS propagation is the timeframe during which changes to DNS records update globally across all DNS resolvers and servers. Propagation times are governed by Time-To-Live (TTL) values."
    },
    {
      q: "What is an MX record?",
      a: "An MX (Mail Exchanger) record is a DNS configuration that specifies which mail servers are designated to accept incoming emails on behalf of the domain name."
    },
    {
      q: "What is a TXT record?",
      a: "A TXT (Text) record is a DNS record containing text-based information used for domain verification, email spoofing prevention (SPF/DKIM/DMARC), and server validation."
    }
  ];

  const breadcrumbs = [
    { name: "Home", url: "https://reconshield.in" },
    { name: "Tools", url: "https://reconshield.in/tools" },
    { name: "DNS Lookup", url: "https://reconshield.in/tools/dns-lookup" }
  ];

  const schemas = [
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
      "url": "https://reconshield.in/tools/dns-lookup"
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
      ]
    },
    {
      "@type": "FAQPage",
      "@id": "https://reconshield.in/tools/dns-lookup#faq",
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
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-[#00ff88]/5 blur-[100px] rounded-full pointer-events-none -z-10" />
        
        <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-900 border border-white/10 text-gray-400 text-xs font-mono uppercase tracking-widest mb-6 shadow-sm">
            <Database className="w-4 h-4 text-[#00ff88]" />
            <span>Authoritative Zone Resolution Module</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 tracking-tight">
            DNS Lookup & Domain Records Analyzer
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

      {/* AI Overview Section (Phase 5) */}
      <section className="py-12 bg-[#05080f] border-b border-white/5" aria-label="AI Search Overview">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="bg-gradient-to-r from-emerald-500/5 to-teal-500/5 border border-emerald-500/10 rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00ff88]/5 blur-[50px] rounded-full pointer-events-none" />
            <h2 className="font-mono text-xs text-[#00ff88] uppercase tracking-wider mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#00ff88]" /> AI Citation Index: DNS Resolution & Records
            </h2>
            <div className="space-y-6 text-sm text-gray-300 font-sans leading-relaxed">
              <div>
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Definition: What is DNS Lookup?</span>
                <p>
                  A <strong>DNS lookup</strong> is a digital query that resolves a hostname (like <code>reconshield.in</code>) from authoritative nameservers, returning configured resource records (IP mappings, mail routes, and validation scripts) to direct client connections.
                </p>
              </div>
              <div className="border-t border-white/5 pt-4">
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Definition: What is a DNS Record?</span>
                <p>
                  A <strong>DNS record</strong> is a formatted entry within a domain's DNS zone file. Each record specifies how request traffic is directed, mapping domains to IPv4 addresses (A), IPv6 addresses (AAAA), alias targets (CNAME), or incoming mail domains (MX).
                </p>
              </div>
              <div className="border-t border-white/5 pt-4">
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// How-To: How to Check DNS Records?</span>
                <p>
                  To check a domain's active DNS records: Input the domain name in the ReconShield DNS checker, select the requested query type, and click scan. The engine queries the domain's root delegation path, returning live parameters from authoritative resolvers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Educational Guide */}
      <div className="bg-[#05080f]">
        
        <section className="py-20 border-b border-white/5">
          <div className="max-w-[1000px] mx-auto px-6 prose prose-invert max-w-none prose-p:leading-relaxed prose-p:text-gray-400 prose-headings:text-white prose-a:text-[#00ff88] hover:prose-a:text-[#00cc6a]">
            
            <h2 className="text-3xl font-display font-bold mt-0 mb-6 flex items-center gap-3">
              <Database className="w-8 h-8 text-[#00ff88]" />
              Understanding the Domain Name System (DNS)
            </h2>
            <p>
              The **Domain Name System (DNS)** translates human-friendly website domains into raw IP addresses. Think of it as the core directory routing traffic across the internet. When you type a web URL, your browser sends queries across hierarchical layers of name servers to locate the target machine's IP address.
            </p>

            <h2 className="text-3xl font-display font-bold mt-16 mb-6">What is DNS Propagation?</h2>
            <p>
              When you update a DNS record, it takes time for the change to distribute globally. This delay is known as **DNS propagation**. Resolvers cache records based on their **Time To Live (TTL)** settings. Until the cached TTL expires, resolvers continue serving the old values. Propagation typically takes anywhere from 5 minutes to 48 hours to complete.
            </p>

            <h2 className="text-3xl font-display font-bold mt-16 mb-6">Demystifying Mail Routing (MX Records)</h2>
            <p>
              **Mail Exchanger (MX) records** are DNS entries that specify how email sent to your domain is routed. They point to incoming email servers and contain a priority number. The mail transfer agent queries your DNS zone for MX records, selecting the server with the lowest priority value (highest precedence) to send the mail packets.
            </p>

            <h2 className="text-3xl font-display font-bold mt-16 mb-6">TXT Records & Email Authentication (SPF/DMARC)</h2>
            <p>
              **TXT records** are unstructured text records used for domain ownership validation and email authentication policies:
            </p>
            <ul>
              <li><strong>SPF (Sender Policy Framework):</strong> Defines which IP ranges are authorized to send email on behalf of your domain.</li>
              <li><strong>DMARC (Domain-based Message Authentication):</strong> Instructs receiving servers how to handle emails that fail SPF/DKIM alignments (e.g. `p=reject` or `p=quarantine`).</li>
            </ul>

            <h2 className="text-3xl font-display font-bold mt-16 mb-6">DNS Troubleshooting & Analysis Guide</h2>
            <p>
              When diagnosing network connections, perform these validation checks:
            </p>
            <ol>
              <li>Verify A/AAAA records point to the correct hosting web servers.</li>
              <li>Confirm there are no duplicate SPF records (which invalidates both and blocks email delivery).</li>
              <li>Inspect CNAME records to verify they do not point to expired cloud resources (which allows subdomain takeover attacks).</li>
              <li>Validate that authoritative nameservers match the records listed in your domain registry.</li>
            </ol>
          </div>
        </section>

        {/* Competitor Analysis Matrix */}
        <section className="py-20 bg-[#0a0d14] border-b border-white/5">
          <div className="max-w-[1000px] mx-auto px-6 prose prose-invert max-w-none">
            <h2 className="text-3xl font-display font-bold text-white mb-6">DNS Checker vs. Alternative Tools</h2>
            <p className="text-gray-400 mb-8">
              Compare ReconShield against traditional DNS propagation checkers and diagnostic tools:
            </p>

            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0d1117] not-prose my-8">
              <table className="w-full text-left text-sm text-gray-400 border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.02] text-white font-mono uppercase text-xs">
                    <th className="p-4">Utility Parameter</th>
                    <th className="p-4 border-l border-white/10">ReconShield</th>
                    <th className="p-4 border-l border-white/10">MXToolbox</th>
                    <th className="p-4 border-l border-white/10">DNSChecker</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono text-xs">
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-4 font-semibold text-white">Full Zone Resolution</td>
                    <td className="p-4 border-l border-white/10 text-[#00ff88] font-bold">Yes (All records queried)</td>
                    <td className="p-4 border-l border-white/10">Single type lookup</td>
                    <td className="p-4 border-l border-white/10">Single type lookup</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-4 font-semibold text-white">DNSSEC Chain Check</td>
                    <td className="p-4 border-l border-white/10 text-[#00ff88] font-bold">Yes (Cryptographic validation)</td>
                    <td className="p-4 border-l border-white/10">No</td>
                    <td className="p-4 border-l border-white/10">No</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-4 font-semibold text-white">CNAME Takeover Security Check</td>
                    <td className="p-4 border-l border-white/10 text-[#00ff88] font-bold">Yes (Automated destination checks)</td>
                    <td className="p-4 border-l border-white/10">No</td>
                    <td className="p-4 border-l border-white/10">No</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-4 font-semibold text-white">Ad-Free UX Experience</td>
                    <td className="p-4 border-l border-white/10 text-[#00ff88] font-bold">Yes (Clean workspace)</td>
                    <td className="p-4 border-l border-white/10">Heavy promotional ads</td>
                    <td className="p-4 border-l border-white/10">Ad banners</td>
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
                  Surendra is an information security engineer specializing in OSINT methodology, internet telemetry mapping, and cryptographic domain security. He designed ReconShield to help teams manage their attack surface exposure.
                </p>
                <div className="flex gap-6 text-sm font-mono">
                  <a href="https://linkedin.com/in/surendrareddy3" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 flex items-center gap-1">LinkedIn <ChevronRight className="w-3 h-3"/></a>
                  <a href="https://github.com/nsurendrareddy" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white flex items-center gap-1">GitHub <ChevronRight className="w-3 h-3"/></a>
                </div>
              </div>
            </div>

            <div className="text-center text-[10px] font-mono text-gray-600 uppercase tracking-widest">
              Last Updated: June 2026 | Reviewed by ReconShield Editorial Board | Reference: Internet Engineering Task Force (IETF) RFCs
            </div>
          </div>
        </section>

        {/* Semantic Internal Links (Phase 7) */}
        <section className="py-20 bg-[#05080f]" aria-label="Related Security Tools">
          <div className="max-w-[1000px] mx-auto px-6">
            <h2 className="text-3xl font-display font-bold text-white mb-10 text-center">Complete Your Network Asset Audit</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <Link href="/tools/whois" className="p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-cyan-500/30 transition-all group">
                <Globe className="w-8 h-8 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-white font-bold text-lg mb-2">WHOIS Lookup</h4>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">Analyze domain registration records, registrar details, ownership, and administrative locks.</p>
                <span className="text-cyan-400 text-xs font-mono flex items-center gap-1">Run WHOIS Check <ChevronRight className="w-3 h-3"/></span>
              </Link>
              
              <Link href="/tools/ip-lookup" className="p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-purple-500/30 transition-all group">
                <Network className="w-8 h-8 text-purple-400 mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-white font-bold text-lg mb-2">IP Reputation Checker</h4>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">Verify hosting network ASN metadata and check listings across global threat blacklist databases.</p>
                <span className="text-purple-400 text-xs font-mono flex items-center gap-1">Check IP Reputation <ChevronRight className="w-3 h-3"/></span>
              </Link>

              <Link href="/tools/ssl-checker" className="p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-emerald-500/30 transition-all group">
                <Lock className="w-8 h-8 text-emerald-400 mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-white font-bold text-lg mb-2">SSL & TLS Analyzer</h4>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">Verify certificate chain of trust validity, expiration timestamps, and cipher suite configurations.</p>
                <span className="text-emerald-400 text-xs font-mono flex items-center gap-1">Analyze SSL Settings <ChevronRight className="w-3 h-3"/></span>
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
