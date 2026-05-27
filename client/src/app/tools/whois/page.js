import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Shield, Target, Server, Lock, Terminal, CheckCircle2, ChevronRight, Activity, Network, AlertTriangle, Search, Globe, Database, UserCheck } from 'lucide-react';

const ToolScannerClient = dynamic(() => import('@/components/ToolScannerClient'), {
  loading: () => <div className="min-h-[600px] animate-pulse bg-surface-900/50 rounded-3xl" />
});

export const metadata = {
  title: "WHOIS Lookup & Domain Intelligence Tool ",
  description: "Free WHOIS checker and RDAP lookup tool. Perform domain ownership lookup, analyze registration data, and uncover domain intelligence instantly.",
  alternates: {
    canonical: 'https://reconshield.in/tools/whois',
  },
  openGraph: {
    title: "WHOIS Lookup & Domain Intelligence Tool",
    description: "Free WHOIS checker and RDAP lookup tool. Perform domain ownership lookup, analyze registration data, and uncover domain intelligence instantly.",
    url: 'https://reconshield.in/tools/whois',
    type: 'article',
  }
};

export default function WhoisPage() {
  const faqs = [
    {
      q: "What is a WHOIS Lookup?",
      a: "A WHOIS lookup is a query protocol used to access databases that store the registered users or assignees of an Internet resource, such as a domain name, an IP address block, or an autonomous system."
    },
    {
      q: "What is the difference between WHOIS and RDAP?",
      a: "RDAP (Registration Data Access Protocol) is the modern successor to WHOIS. It provides structured, machine-readable JSON responses, supports internationalization, and offers better security and privacy controls compared to the legacy text-based WHOIS protocol."
    },
    {
      q: "Can I use this for domain ownership lookup?",
      a: "Yes. Our domain intelligence tool queries global registrars to find the listed owner (Registrant), administrative contacts, and technical contacts for a given domain, provided the information hasn't been redacted."
    },
    {
      q: "Why is the registrant data hidden or redacted?",
      a: "Due to privacy regulations like GDPR, many registrars now automatically redact personal identifying information (PII) from public WHOIS records or replace it with proxy service details to protect the owner's privacy."
    },
    {
      q: "How does WHOIS help with threat hunting?",
      a: "Threat hunters use WHOIS checkers to perform infrastructure attribution analysis. By analyzing creation dates, registrar choices, and nameservers, analysts can link seemingly unrelated domains to the same malicious security incident."
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
                "@id": "https://reconshield.in/tools/whois#software",
                "name": "ReconShield WHOIS Intelligence Tool",
                "url": "https://reconshield.in/tools/whois",
                "description": "Enterprise WHOIS checker and domain ownership lookup tool.",
                "applicationCategory": "SecurityApplication",
                "operatingSystem": "Web",
                "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
              },
              {
                "@type": "BreadcrumbList",
                "@id": "https://reconshield.in/tools/whois#breadcrumb",
                "itemListElement": [
                  { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://reconshield.in" },
                  { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://reconshield.in/tools" },
                  { "@type": "ListItem", "position": 3, "name": "WHOIS Lookup", "item": "https://reconshield.in/tools/whois" }
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
            ]
          })
        }}
      />

      {/* 1. Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[#0a0d14] -z-20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-teal-500/5 blur-[100px] rounded-full pointer-events-none -z-10" />
        
        <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-center animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-900 border border-white/10 text-gray-400 text-xs font-mono uppercase tracking-widest mb-6 shadow-sm">
            <Globe className="w-4 h-4 text-teal-400" />
            <span>Infrastructure Attribution Module</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-500">WHOIS Lookup</span> & Domain Intelligence
          </h1>
          
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Perform a deep <strong>domain ownership lookup</strong>. Query global registries via RDAP to uncover registration dates, registrar details, and conduct advanced <strong>domain intelligence analysis</strong>.
          </p>

          <div className="max-w-4xl mx-auto mb-12">
            <ToolScannerClient 
              toolId="whois" 
              title="WHOIS Intelligence Scanner" 
              desc="Enter a domain to initiate a comprehensive registration data query." 
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-gray-500 uppercase tracking-widest">
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-teal-400" /> Ownership Discovery</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-teal-400" /> RDAP Integration</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-teal-400" /> Threat Attribution</div>
          </div>
        </div>
      </section>

      {/* SEO Content Silo Container */}
      <div className="bg-[#05080f]">
        
        {/* 2. What Is WHOIS? & 3. How WHOIS Works */}
        <section className="py-20 border-b border-white/5">
          <div className="max-w-[900px] mx-auto px-6 prose prose-invert max-w-none prose-p:leading-relaxed prose-p:text-gray-400 prose-headings:text-white prose-a:text-teal-400 hover:prose-a:text-teal-300">
            
            <h2 className="text-3xl font-display font-bold mt-0 mb-6 flex items-center gap-3">
              <Database className="w-8 h-8 text-teal-400" />
              What Is WHOIS?
            </h2>
            <p>
              Originally drafted in the early 1980s, WHOIS is a widely used internet record listing that identifies who owns a domain and how to get in contact with them. A modern <strong>WHOIS checker</strong> functions as an essential <strong>domain intelligence tool</strong>, querying the decentralized databases managed by domain registrars and registries.
            </p>
            <p>
              When a person or organization registers a domain, the Internet Corporation for Assigned Names and Numbers (ICANN) requires the registrar to collect and publish identifying information. Our <strong>domain ownership lookup</strong> taps into these registries to extract this critical data.
            </p>

            <h2 className="text-3xl font-display font-bold mt-16 mb-6 flex items-center gap-3">
              <Network className="w-8 h-8 text-emerald-400" />
              How WHOIS Works (and the Shift to RDAP)
            </h2>
            <p>
              Traditionally, WHOIS operated via TCP port 43, returning unstructured, text-based data that was difficult to parse programmatically. Today, the industry is transitioning to the Registration Data Access Protocol (<strong>RDAP lookup</strong>). RDAP delivers structured JSON data over secure HTTPS, standardizing responses across different TLDs (Top-Level Domains). ReconShield acts as an advanced client, interrogating these endpoints to provide clean, normalized <strong>domain registration lookup</strong> intelligence.
            </p>

          </div>
        </section>

        {/* 4. Record Fields & 5. Privacy & 6. Threat Hunting */}
        <section className="py-20 bg-[#0a0d14] border-b border-white/5">
          <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            <div className="prose prose-invert max-w-none prose-p:text-gray-400">
              <h2 className="text-3xl font-display font-bold text-white mb-6">WHOIS Record Fields Explained</h2>
              <p>
                A standard <strong>domain registration lookup</strong> yields several distinct blocks of information critical for <strong>domain intelligence analysis</strong>:
              </p>
              <ul>
                <li><strong>Registrar:</strong> The commercial entity (like GoDaddy or Namecheap) where the domain was purchased.</li>
                <li><strong>Registrant:</strong> The actual owner of the domain (often an organization or individual).</li>
                <li><strong>Creation/Expiry Dates:</strong> The exact timestamp the domain was registered and when it is set to expire.</li>
                <li><strong>Nameservers:</strong> The authoritative DNS servers directing the domain's traffic.</li>
                <li><strong>Status Codes:</strong> ICANN EPP codes indicating if the domain is locked (e.g., `clientTransferProhibited`).</li>
              </ul>

              <h3 className="text-xl text-white font-bold mt-8 mb-4">WHOIS Privacy & Redaction</h3>
              <p>
                In the post-GDPR era, conducting a <strong>domain ownership lookup</strong> often yields redacted information. Registrars mask personal emails and phone numbers to comply with data protection laws. While this protects individuals, it complicates OSINT. However, analysts can still derive massive value by correlating unredacted data points (like identical Nameservers or Creation patterns).
              </p>
            </div>

            {/* Core Threats Focus Card */}
            <div className="bg-surface-900 border border-white/10 rounded-3xl p-8 shadow-2xl">
              <h3 className="text-xl font-display font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2">
                <Target className="w-5 h-5 text-teal-500" /> Intelligence & Threat Hunting
              </h3>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center shrink-0">
                    <UserCheck className="w-5 h-5 text-teal-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Attribution Analysis</h4>
                    <p className="text-sm text-gray-400">Threat intelligence analysts use WHOIS to link malicious domains together. If a phishing domain shares a registration email with a known malware C2 server, attribution is established.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Age-Based Trust Scoring</h4>
                    <p className="text-sm text-gray-400">Domains registered within the last 30 days are statistically more likely to be involved in phishing or spam campaigns. Our tool immediately flags newly created domains.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                    <Globe className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Brand Protection</h4>
                    <p className="text-sm text-gray-400">Security teams use WHOIS lookups to discover typosquatting domains mimicking their brand, allowing them to issue rapid takedown notices to the registrar.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 7. Use Cases & 8. Tutorial */}
        <section className="py-20 border-b border-white/5">
          <div className="max-w-[900px] mx-auto px-6 prose prose-invert max-w-none prose-p:text-gray-400">
            
            <h2 className="text-3xl font-display font-bold text-white mb-6">Real-World Security Use Cases</h2>
            <ul>
              <li><strong>Incident Response (IR):</strong> When a malicious URL is detected in corporate email filters, IR teams perform a <strong>WHOIS lookup</strong> to identify the abuse contact for the hosting provider to request a takedown.</li>
              <li><strong>Mergers & Acquisitions (M&A):</strong> Corporate investigators analyze domain portfolios to map the digital assets of a company before an acquisition.</li>
              <li><strong>Cybercrime Investigations:</strong> Law enforcement utilizes historical WHOIS data to track the operational evolution of cybercriminal syndicates.</li>
            </ul>

            <h2 className="text-3xl font-display font-bold text-white mt-16 mb-8">Step-by-Step Tutorial: Analyzing a Domain</h2>
            <div className="bg-[#0d1117] border border-[#1a2332] rounded-2xl p-6 mb-12">
              <ol className="list-decimal list-inside space-y-4 text-gray-300">
                <li><strong>Enter the Target Domain:</strong> Input the URL (e.g., `reconshield.in`) into the <strong>WHOIS checker</strong> terminal.</li>
                <li><strong>Initiate RDAP Query:</strong> Click scan to query the authoritative global registry.</li>
                <li><strong>Review Registration Timeline:</strong> Check the `Creation Date` to determine if the domain was recently stood up for an attack.</li>
                <li><strong>Analyze Infrastructure:</strong> Note the Nameservers to see which cloud provider or DNS service is actively routing the traffic.</li>
                <li><strong>Extract Contacts:</strong> Locate the `Abuse Contact Email` if you need to report malicious activity associated with the domain.</li>
              </ol>
            </div>
          </div>
        </section>

        {/* 9. FAQ Section */}
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

        {/* 11. EEAT Author Bio */}
        <section className="py-16">
          <div className="max-w-[900px] mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center gap-8 p-8 bg-gradient-to-r from-[#0d1117] to-surface-900 border border-white/10 rounded-3xl shadow-xl">
              <div className="w-24 h-24 rounded-full bg-[#1a2332] border-2 border-teal-500/30 flex items-center justify-center shrink-0 overflow-hidden">
                <Globe className="w-10 h-10 text-teal-500" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 px-2 py-1 rounded bg-teal-500/10 text-teal-400 text-[10px] font-mono uppercase tracking-widest mb-2">
                  <CheckCircle2 className="w-3 h-3" /> Fact Checked & Verified
                </div>
                <h4 className="text-white font-bold text-xl mb-1">Surendra Reddy</h4>
                <p className="text-gray-400 text-xs font-mono uppercase tracking-wider mb-3">Cybersecurity Researcher & Founder, ReconShield</p>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  Surendra is a cybersecurity engineer specializing in Open Source Intelligence (OSINT), exposure intelligence, and AI-driven threat analysis. He built ReconShield to democratize access to enterprise-grade infrastructure visibility tools and secure the digital internet-facing assets.
                </p>
                <div className="flex gap-6 text-sm font-mono">
                  <a href="https://linkedin.com/in/surendrareddy3" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:text-teal-300 flex items-center gap-1">LinkedIn <ChevronRight className="w-3 h-3"/></a>
                  <a href="https://github.com/nsurendrareddy" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white flex items-center gap-1">GitHub <ChevronRight className="w-3 h-3"/></a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 10. Related Security Tools & 12. Internal Linking Hub */}
        <section className="py-20 bg-[#0a0d14]">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex items-center gap-4 mb-10">
              <h2 className="font-mono text-xs tracking-[4px] uppercase text-teal-400 font-bold">// EXPLORE RELATED OSINT TOOLS</h2>
              <div className="h-[1px] flex-1 bg-[#1a2332]" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/tools/dns-lookup" className="p-6 bg-surface-900 border border-white/5 hover:border-teal-500/30 rounded-2xl group transition-all">
                <Network className="w-6 h-6 text-teal-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-white font-bold mb-2 group-hover:text-teal-400 transition-colors">DNS Intelligence</h3>
                <p className="text-xs text-gray-400">Pivot from WHOIS data to audit the target's underlying DNS infrastructure.</p>
              </Link>

              <Link href="/tools/ip-lookup" className="p-6 bg-surface-900 border border-white/5 hover:border-teal-500/30 rounded-2xl group transition-all">
                <Search className="w-6 h-6 text-teal-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-white font-bold mb-2 group-hover:text-teal-400 transition-colors">IP Reputation Scanner</h3>
                <p className="text-xs text-gray-400">Perform an ASN lookup on the domain's resolved IP address for security incident attribution.</p>
              </Link>

              <Link href="/tools/port-scanner" className="p-6 bg-surface-900 border border-white/5 hover:border-teal-500/30 rounded-2xl group transition-all">
                <Terminal className="w-6 h-6 text-teal-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-white font-bold mb-2 group-hover:text-teal-400 transition-colors">Port Scanner</h3>
                <p className="text-xs text-gray-400">Scan the newly discovered domain for exposed, vulnerable TCP services.</p>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
