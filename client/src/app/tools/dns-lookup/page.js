import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Shield, Target, Server, Lock, Terminal, CheckCircle2, ChevronRight, Activity, Network, AlertTriangle, Search, Globe, Mail } from 'lucide-react';

const ToolScannerClient = dynamic(() => import('@/components/ToolScannerClient'), {
  loading: () => <div className="min-h-[600px] animate-pulse bg-surface-900/50 rounded-3xl" />
});

import { generateBaseMetadata } from '@/utils/metadata';

export const metadata = generateBaseMetadata({
  title: "DNS Lookup Tool & DNS Security Analysis ",
  description: "Free DNS lookup tool to check all domain records instantly. Perform DNS security analysis, verify SPF/DMARC, and track DNS propagation worldwide.",
  path: "/tools/dns-lookup"
});

export default function DnsLookupPage() {
  const faqs = [
    {
      q: "What is a DNS Lookup Tool?",
      a: "A DNS lookup tool queries Domain Name System servers to retrieve the public records associated with a domain name, such as its IP addresses (A records), mail servers (MX records), and security policies (TXT records)."
    },
    {
      q: "How does this tool perform a DNS security analysis?",
      a: "ReconShield doesn't just list records; it analyzes them for misconfigurations. We check if your SPF, DKIM, and DMARC records are correctly formatted to prevent email spoofing, and verify if nameservers are vulnerable to hijacking."
    },
    {
      q: "What does an SPF checker do?",
      a: "An SPF (Sender Policy Framework) checker verifies your domain's TXT records to ensure you have explicitly authorized which IP addresses and services are allowed to send emails on your behalf, mitigating phishing risks."
    },
    {
      q: "Can I use this as a DNS propagation checker?",
      a: "Yes. By querying our global, distributed network nodes, you can observe how DNS records propagate across different regions and ISPs when migrating a site or changing hosting providers."
    },
    {
      q: "What happens if my MX records are misconfigured?",
      a: "If Mail Exchange (MX) records are missing or misconfigured, inbound emails will bounce back to the sender, effectively breaking your organization's email infrastructure."
    }
  ];

  return (
    <>
      {/* Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "SoftwareApplication",
                "@id": "https://reconshield.in/tools/dns-lookup#software",
                "name": "ReconShield DNS Lookup Tool",
                "url": "https://reconshield.in/tools/dns-lookup",
                "description": "Enterprise-grade DNS propagation checker and security analysis tool.",
                "applicationCategory": "SecurityApplication",
                "operatingSystem": "Web",
                "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
              },
              {
                "@type": "BreadcrumbList",
                "@id": "https://reconshield.in/tools/dns-lookup#breadcrumb",
                "itemListElement": [
                  { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://reconshield.in" },
                  { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://reconshield.in/tools" },
                  { "@type": "ListItem", "position": 3, "name": "DNS Lookup", "item": "https://reconshield.in/tools/dns-lookup" }
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
            ]
          })
        }}
      />

      {/* 1. Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[#0a0d14] -z-20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none -z-10" />
        
        <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-center animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-900 border border-white/10 text-gray-400 text-xs font-mono uppercase tracking-widest mb-6 shadow-sm">
            <Network className="w-4 h-4 text-cyan-400" />
            <span>Infrastructure Intelligence</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">DNS Lookup Tool</span> & Security Analysis
          </h1>
          
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Instantly audit domain records with our <strong>domain intelligence tool</strong>. Verify A, AAAA, MX, and TXT records, perform an <strong>SPF checker</strong> audit, and monitor global DNS propagation.
          </p>

          <div className="max-w-4xl mx-auto mb-12">
            <ToolScannerClient 
              toolId="dns-lookup" 
              title="DNS Intelligence Scanner" 
              desc="Enter a domain to initiate a comprehensive DNS enumeration and security audit." 
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-gray-500 uppercase tracking-widest">
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> DMARC Analysis</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> Propagation Tracking</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> Record Enumeration</div>
          </div>
        </div>
      </section>

      {/* SEO Content Silo Container */}
      <div className="bg-[#05080f]">
        
        {/* 2. What Is DNS Lookup? & 3. How DNS Works */}
        <section className="py-20 border-b border-white/5">
          <div className="max-w-[900px] mx-auto px-6 prose prose-invert max-w-none prose-p:leading-relaxed prose-p:text-gray-400 prose-headings:text-white prose-a:text-cyan-400 hover:prose-a:text-cyan-300">
            
            <h2 className="text-3xl font-display font-bold mt-0 mb-6 flex items-center gap-3">
              <Search className="w-8 h-8 text-cyan-400" />
              What Is a DNS Lookup Tool?
            </h2>
            <p>
              A <strong>DNS lookup tool</strong> is a diagnostic utility that queries the Domain Name System (DNS) to fetch the public records associated with a specific domain name. DNS acts as the phonebook of the internet, translating human-readable domain names (like <code>reconshield.in</code>) into the machine-readable IP addresses required by networking protocols.
            </p>
            <p>
              ReconShield goes beyond a basic query by functioning as a complete <strong>domain intelligence tool</strong>. It enumerates the full spectrum of DNS records—including A, AAAA, CNAME, MX, NS, and TXT—providing systems administrators and cybersecurity professionals with a complete map of a target’s digital infrastructure.
            </p>

            <h2 className="text-3xl font-display font-bold mt-16 mb-6 flex items-center gap-3">
              <Globe className="w-8 h-8 text-blue-400" />
              How DNS Works
            </h2>
            <p>
              When a user types a URL into their browser, a DNS resolver initiates a query starting at the root nameservers, moving to the Top-Level Domain (TLD) servers (like `.com` or `.net`), and finally reaching the authoritative nameserver for the domain. The authoritative server returns the specific <strong>DNS records</strong> requested. Our <strong>DNS records checker</strong> mimics this exact process, directly interrogating authoritative nameservers to fetch uncached, real-time data about your infrastructure.
            </p>

          </div>
        </section>

        {/* 4. Record Types & 5. DNS Security Risks */}
        <section className="py-20 bg-[#0a0d14] border-b border-white/5">
          <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            <div className="prose prose-invert max-w-none prose-p:text-gray-400">
              <h2 className="text-3xl font-display font-bold text-white mb-6">DNS Record Types Explained</h2>
              <p>
                To effectively manage and secure a network, it is essential to understand the primary DNS records fetched during an enumeration:
              </p>
              <ul>
                <li><strong>A Record:</strong> Maps a domain to an IPv4 address.</li>
                <li><strong>AAAA Record:</strong> Maps a domain to an IPv6 address.</li>
                <li><strong>CNAME Record:</strong> Forwards one domain or subdomain to another domain.</li>
                <li><strong>MX Record:</strong> Directs emails to a specific mail server. Essential for an <strong>MX lookup</strong>.</li>
                <li><strong>NS Record:</strong> Identifies the authoritative nameservers responsible for the domain.</li>
                <li><strong>TXT Record:</strong> Holds text strings, predominantly used for verification and security policies like SPF.</li>
              </ul>

              <h3 className="text-xl text-white font-bold mt-8 mb-4">DNS Security Risks</h3>
              <p>
                A misconfigured DNS infrastructure exposes organizations to catastrophic configuration risks. Subdomain takeovers occur when a CNAME record points to an unclaimed third-party service (like an abandoned S3 bucket). Nameserver hijacking can redirect all legitimate traffic to a malicious server. Regular <strong>DNS security analysis</strong> ensures that stale records are purged and routing policies remain strictly under the organization's control.
              </p>
            </div>

            {/* SPF/DMARC Focus Card */}
            <div className="bg-surface-900 border border-white/10 rounded-3xl p-8 shadow-2xl">
              <h3 className="text-xl font-display font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2">
                <Mail className="w-5 h-5 text-cyan-400" /> SPF, DKIM & DMARC
              </h3>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center shrink-0">
                    <Shield className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">SPF (Sender Policy Framework)</h4>
                    <p className="text-sm text-gray-400">Our <strong>SPF checker</strong> verifies your TXT records to confirm which IPs and third-party services (like SendGrid or Google) are authorized to send email on your behalf.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                    <Lock className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">DKIM (DomainKeys Identified Mail)</h4>
                    <p className="text-sm text-gray-400">Adds a cryptographic signature to outbound emails, proving to the receiving server that the message was not tampered with in transit.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0">
                    <Target className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">DMARC Enforcement</h4>
                    <p className="text-sm text-gray-400">DMARC ties SPF and DKIM together. We check if your DMARC policy is set to `reject` or `quarantine`, preventing unauthorized actors from spoofing your domain in phishing campaigns.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 7. Propagation & 8. Use Cases & 9. Step-by-Step */}
        <section className="py-20 border-b border-white/5">
          <div className="max-w-[900px] mx-auto px-6 prose prose-invert max-w-none prose-p:text-gray-400">
            
            <h2 className="text-3xl font-display font-bold text-white mb-6">DNS Propagation & TTL Explained</h2>
            <p>
              When you update a DNS record, the change is not immediate globally. It must propagate across thousands of ISP caching servers worldwide. The speed of this depends on your Time-To-Live (TTL) setting. Using ReconShield as a <strong>DNS propagation checker</strong> allows administrators to verify if a recent server migration or IP change has successfully reached end-users in different geographic locations.
            </p>

            <h2 className="text-3xl font-display font-bold text-white mt-16 mb-8">Real-World Security Use Cases</h2>
            <ul>
              <li><strong>Phishing Prevention:</strong> IT teams utilize the tool to audit TXT records, ensuring strict DMARC enforcement is in place to stop domain spoofing.</li>
              <li><strong>Bug Bounty infrastructure visibility:</strong> authorized security professionals perform deep enumeration to discover forgotten subdomains or vulnerable CNAME pointers that could lead to a takeover.</li>
              <li><strong>Email Deliverability Troubleshooting:</strong> Marketing operations use the <strong>MX lookup</strong> function to diagnose why transactional emails are bouncing or landing in spam folders.</li>
            </ul>

            <h2 className="text-3xl font-display font-bold text-white mt-16 mb-8">Step-by-Step Tutorial: Enumerating a Domain</h2>
            <div className="bg-[#0d1117] border border-[#1a2332] rounded-2xl p-6 mb-12">
              <ol className="list-decimal list-inside space-y-4 text-gray-300">
                <li><strong>Enter the Domain:</strong> Input the target URL (e.g., `example.com`) without the `https://` prefix into the scanner.</li>
                <li><strong>Initiate Lookup:</strong> Click scan to query authoritative nameservers directly.</li>
                <li><strong>Review A/AAAA Records:</strong> Identify the specific web server IPs hosting the application.</li>
                <li><strong>Verify Mail Routing:</strong> Check the MX records to confirm emails are routed to the correct provider (like Google Workspace or Microsoft 365).</li>
                <li><strong>Audit Security Policies:</strong> Examine the TXT records to ensure SPF and DMARC strings are syntax-error free.</li>
              </ol>
            </div>
          </div>
        </section>

        {/* 10. FAQ Section */}
        <section className="py-20 bg-[#0a0d14] border-b border-white/5">
          <div className="max-w-[900px] mx-auto px-6">
            <h2 className="text-3xl font-display font-bold text-white mb-10 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-surface-900 border border-white/10 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-3">{faq.q}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 12. EEAT Author Bio */}
        <section className="py-16">
          <div className="max-w-[900px] mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center gap-8 p-8 bg-gradient-to-r from-[#0d1117] to-surface-900 border border-white/10 rounded-3xl shadow-xl">
              <div className="w-24 h-24 rounded-full bg-[#1a2332] border-2 border-cyan-500/30 flex items-center justify-center shrink-0 overflow-hidden">
                <Network className="w-10 h-10 text-cyan-400" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 px-2 py-1 rounded bg-cyan-500/10 text-cyan-400 text-[10px] font-mono uppercase tracking-widest mb-2">
                  <CheckCircle2 className="w-3 h-3" /> Fact Checked & Verified
                </div>
                <h4 className="text-white font-bold text-xl mb-1">Surendra Reddy</h4>
                <p className="text-gray-400 text-xs font-mono uppercase tracking-wider mb-3">Cybersecurity Researcher & Founder, ReconShield</p>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  Surendra is a cybersecurity engineer specializing in Open Source Intelligence (OSINT), exposure intelligence, and AI-driven threat analysis. He built ReconShield to democratize access to enterprise-grade infrastructure visibility tools and secure the digital internet-facing assets.
                </p>
                <div className="flex gap-6 text-sm font-mono">
                  <a href="https://linkedin.com/in/surendrareddy3" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1">LinkedIn <ChevronRight className="w-3 h-3"/></a>
                  <a href="https://github.com/nsurendrareddy" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white flex items-center gap-1">GitHub <ChevronRight className="w-3 h-3"/></a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 11. Related Security Tools & 13. Internal Linking Hub */}
        <section className="py-20 bg-[#0a0d14]">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex items-center gap-4 mb-10">
              <h2 className="font-mono text-xs tracking-[4px] uppercase text-cyan-400 font-bold">// EXPLORE RELATED INFRASTRUCTURE TOOLS</h2>
              <div className="h-[1px] flex-1 bg-[#1a2332]" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/tools/ip-lookup" className="p-6 bg-surface-900 border border-white/5 hover:border-cyan-500/30 rounded-2xl group transition-all">
                <Search className="w-6 h-6 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-white font-bold mb-2 group-hover:text-cyan-400 transition-colors">IP Reputation Scanner</h3>
                <p className="text-xs text-gray-400">Perform an ASN lookup on resolved IP addresses and check them against global threat feeds.</p>
              </Link>

              <Link href="/tools/whois" className="p-6 bg-surface-900 border border-white/5 hover:border-cyan-500/30 rounded-2xl group transition-all">
                <Globe className="w-6 h-6 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-white font-bold mb-2 group-hover:text-cyan-400 transition-colors">WHOIS Domain Lookup</h3>
                <p className="text-xs text-gray-400">Discover domain ownership, registration dates, and registrar details.</p>
              </Link>

              <Link href="/tools/vulnerability-scanner" className="p-6 bg-surface-900 border border-white/5 hover:border-cyan-500/30 rounded-2xl group transition-all">
                <Shield className="w-6 h-6 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-white font-bold mb-2 group-hover:text-cyan-400 transition-colors">Security Exposure Assessment Tool</h3>
                <p className="text-xs text-gray-400">Assess the full internet-facing assets of a domain passively for security misconfigurations.</p>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
