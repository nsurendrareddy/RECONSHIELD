import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { Shield, MapPin, Globe, Server, Lock, Terminal, CheckCircle2, ChevronRight, Search, Activity, Target, Network } from 'lucide-react';

const IpScannerClient = dynamic(() => import('@/components/ip-scanner/IpScannerClient'), {
  loading: () => <div className="min-h-[600px] animate-pulse bg-surface-900/50 rounded-3xl" />
});

export const metadata = {
  title: "Free IP Lookup & Reputation Checker ",
  description: "Trace any IP address instantly. Our IP lookup tool checks 50+ global blocklists, detects VPNs, and provides accurate geolocation and ASN data.",
  keywords: [
    "IP lookup tool", "IP reputation checker", "trace IP address", "IP geolocation checker", 
    "ASN lookup", "malicious IP checker", "IP intelligence tool", "threat intelligence"
  ],
  alternates: {
    canonical: 'https://reconshield.in/tools/ip-lookup',
  },
  openGraph: {
    title: "Free IP Lookup & Reputation Checker",
    description: "Trace any IP address instantly. Our IP lookup tool checks 50+ global blocklists, detects VPNs, and provides accurate geolocation and ASN data.",
    url: 'https://reconshield.in/tools/ip-lookup',
    type: 'article',
    images: [{ url: 'https://reconshield.in/og-ip-scanner.png' }]
  }
};

export default function IpScannerPage() {
  const faqs = [
    {
      q: "What is an IP reputation checker?",
      a: "An IP reputation checker analyzes an IP address against dozens of global threat intelligence feeds and blocklists to determine if it has been involved in malicious activities like spamming, DDoS attacks, or malware distribution."
    },
    {
      q: "How accurate is the IP geolocation checker?",
      a: "Our IP geolocation checker aggregates data from top-tier regional internet registries (RIRs) and ISP routing databases to provide city-level accuracy for most public IP addresses. However, VPNs or proxies can mask true locations."
    },
    {
      q: "Can this tool trace an IP address to a specific person?",
      a: "No. Tracing an IP address publicly will only reveal the ISP (Internet Service Provider), ASN, and general geographic location (city/state). Identifying a specific individual requires a legal subpoena to the ISP."
    },
    {
      q: "What does an Autonomous System Number (ASN) lookup tell me?",
      a: "An ASN lookup reveals the overarching network organization that owns or routes the IP address. For example, it helps you identify if traffic is coming from a residential ISP (like Comcast) or a commercial cloud provider (like AWS or DigitalOcean)."
    },
    {
      q: "How does the malicious IP checker detect VPNs and Proxies?",
      a: "The tool cross-references the target IP against known datacenter subnets, Tor exit nodes, and commercial VPN provider IP ranges to determine if the user is attempting to mask their true identity."
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
                "@type": "WebApplication",
                "@id": "https://reconshield.in/tools/ip-lookup#software",
                "name": "ReconShield Free IP Lookup & Reputation Checker",
                "url": "https://reconshield.in/tools/ip-lookup",
                "description": "Enterprise-grade IP intelligence tool for geolocation, VPN detection, and threat reputation.",
                "applicationCategory": "SecurityApplication",
                "operatingSystem": "Web",
                "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
              },
              {
                "@type": "BreadcrumbList",
                "@id": "https://reconshield.in/tools/ip-lookup#breadcrumb",
                "itemListElement": [
                  { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://reconshield.in" },
                  { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://reconshield.in/tools" },
                  { "@type": "ListItem", "position": 3, "name": "IP Scanner", "item": "https://reconshield.in/tools/ip-lookup" }
                ]
              },
              {
                "@type": "FAQPage",
                "@id": "https://reconshield.in/tools/ip-lookup#faq",
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
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-[#00ff88]/5 blur-[100px] rounded-full pointer-events-none -z-10" />
        
        <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-center animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-900 border border-white/10 text-gray-400 text-xs font-mono uppercase tracking-widest mb-6 shadow-sm">
            <Search className="w-4 h-4 text-[#00ff88]" />
            <span>Passive Reconnaissance Module</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 tracking-tight">
            Free <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff88] to-emerald-400">IP Lookup</span> & Reputation Checker
          </h1>
          
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Trace any IP address instantly with our enterprise-grade <strong>IP intelligence tool</strong>. Detect VPNs, map geolocation, verify ASN routing, and check IP reputation against 50+ global threat blocklists.
          </p>

          <div className="max-w-4xl mx-auto mb-12">
            {/* The actual Client Component doing the heavy lifting */}
            <IpScannerClient />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-gray-500 uppercase tracking-widest">
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#00ff88]" /> 50+ Blocklists</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#00ff88]" /> VPN/Proxy Detection</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#00ff88]" /> ASN Resolution</div>
          </div>
        </div>
      </section>

      {/* SEO Content Silo Container */}
      <div className="bg-[#05080f]">
        
        {/* 2. What Is an IP Lookup Tool? & 3. How IP Intelligence Works */}
        <section className="py-20 border-b border-white/5">
          <div className="max-w-[900px] mx-auto px-6 prose prose-invert max-w-none prose-p:leading-relaxed prose-p:text-gray-400 prose-headings:text-white prose-a:text-[#00ff88] hover:prose-a:text-[#00cc6a]">
            
            <h2 className="text-3xl font-display font-bold mt-0 mb-6 flex items-center gap-3">
              <Activity className="w-8 h-8 text-[#00ff88]" />
              What Is an IP Lookup Tool?
            </h2>
            <p>
              An <strong>IP lookup tool</strong> is a fundamental cybersecurity utility used to gather actionable intelligence about a specific Internet Protocol (IP) address. Every device connected to the internet is assigned an IP address, which acts as a digital return address. By performing an IP lookup, security researchers, network administrators, and threat hunters can extract vital metadata associated with that address—including its physical geolocation, Internet Service Provider (ISP), and underlying network architecture.
            </p>
            <p>
              ReconShield elevates the standard lookup by functioning as a comprehensive <strong>IP intelligence tool</strong>. Rather than simply returning a city or country, our engine cross-references the target against massive OSINT databases to provide a holistic view of the endpoint's identity and risk profile.
            </p>

            <h2 className="text-3xl font-display font-bold mt-16 mb-6 flex items-center gap-3">
              <Network className="w-8 h-8 text-blue-400" />
              How IP Intelligence Works
            </h2>
            <p>
              The moment you query an IP address, ReconShield initiates a series of strict, passive reconnaissance checks. First, the <strong>IP geolocation checker</strong> queries Regional Internet Registries (like ARIN or RIPE) to determine the geographical assignment of the subnet. Concurrently, an <strong>ASN lookup</strong> (Autonomous System Number) is performed to identify the organization routing the traffic. 
            </p>
            <p>
              An ASN is critical for context: an IP belonging to AS15169 (Google) behaves very differently from an IP originating from a bulletproof hosting provider known for harboring cybercriminals. Our platform aggregates this data silently, ensuring the target is never alerted to the investigation.
            </p>

          </div>
        </section>

        {/* 4. Why IP Reputation Matters & 5. Real-World Security Use Cases */}
        <section className="py-20 bg-[#0a0d14] border-b border-white/5">
          <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            <div className="prose prose-invert max-w-none prose-p:text-gray-400">
              <h2 className="text-3xl font-display font-bold text-white mb-6">Why IP Reputation Matters</h2>
              <p>
                In the realm of cybersecurity, context is everything. An <strong>IP reputation checker</strong> analyzes the historical behavior of an IP address across the global internet. If an IP has been recently observed orchestrating brute-force attacks, distributing malware, or sending massive phishing campaigns, it is flagged by threat intelligence networks.
              </p>
              <p>
                Monitoring IP reputation allows organizations to preemptively block malicious traffic. By utilizing our <strong>malicious IP checker</strong>, network defenders can filter out high-risk endpoints before they interact with internal systems, significantly reducing the attack surface.
              </p>

              <h3 className="text-xl text-white font-bold mt-8 mb-4">VPN & Proxy Detection Explained</h3>
              <p>
                Cybercriminals rarely use their actual residential IP addresses. Instead, they mask their traffic through Tor exit nodes, open proxies, or commercial VPNs. ReconShield's engine automatically detects these anonymization services. If an IP lookup reveals a datacenter ASN but the user claims to be a residential shopper, it's a massive red flag for fraud detection.
              </p>
            </div>

            {/* Real World Use Cases Card */}
            <div className="bg-surface-900 border border-white/10 rounded-3xl p-8 shadow-2xl">
              <h3 className="text-xl font-display font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2">
                <Target className="w-5 h-5 text-[#00ff88]" /> Real-World Use Cases
              </h3>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                    <span className="font-mono font-bold text-blue-400">01</span>
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Incident Response</h4>
                    <p className="text-sm text-gray-400">Quickly trace suspicious IP addresses found in server logs to determine if they belong to known threat actors or automated botnets.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                    <span className="font-mono font-bold text-amber-400">02</span>
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Fraud Prevention</h4>
                    <p className="text-sm text-gray-400">E-commerce platforms use IP intelligence to flag transactions originating from high-risk VPNs or offshore hosting providers.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0">
                    <span className="font-mono font-bold text-purple-400">03</span>
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Network Security</h4>
                    <p className="text-sm text-gray-400">Firewall administrators can cross-reference inbound connections against our threat blocklists to establish dynamic deny rules.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 6. Step-by-Step Tutorial & 7. Threat Intelligence */}
        <section className="py-20 border-b border-white/5">
          <div className="max-w-[900px] mx-auto px-6 prose prose-invert max-w-none prose-p:text-gray-400">
            <h2 className="text-3xl font-display font-bold text-white mb-8">Step-by-Step Tutorial: Tracing an IP Address</h2>
            <div className="bg-[#0d1117] border border-[#1a2332] rounded-2xl p-6 mb-12">
              <ol className="list-decimal list-inside space-y-4 text-gray-300">
                <li><strong>Locate the Target:</strong> Extract the suspicious IP address from your firewall, email headers, or access logs.</li>
                <li><strong>Initiate Scan:</strong> Paste the IPv4 or IPv6 address into the ReconShield terminal above.</li>
                <li><strong>Analyze Geolocation:</strong> Review the city, region, and timezone to verify if the traffic origin makes logical sense for your business.</li>
                <li><strong>Check the ASN:</strong> Look at the ISP/Organization. If a consumer app is receiving traffic from a server hosting provider (like DigitalOcean), investigate further.</li>
                <li><strong>Review Threat Intelligence:</strong> Check the "Abuse Confidence Score". If the IP is flagged by Spamhaus, AbuseIPDB, or others, consider blocking it at the WAF level.</li>
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
              <div className="w-24 h-24 rounded-full bg-[#1a2332] border-2 border-[#00ff88]/30 flex items-center justify-center shrink-0 overflow-hidden">
                {/* Fallback avatar if no image is present */}
                <Shield className="w-10 h-10 text-[#00ff88]" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 px-2 py-1 rounded bg-[#00ff88]/10 text-[#00ff88] text-[10px] font-mono uppercase tracking-widest mb-2">
                  <CheckCircle2 className="w-3 h-3" /> Fact Checked & Verified
                </div>
                <h4 className="text-white font-bold text-xl mb-1">Surendra Reddy</h4>
                <p className="text-gray-400 text-xs font-mono uppercase tracking-wider mb-3">Cybersecurity Researcher & Founder, ReconShield</p>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  Surendra is a cybersecurity engineer specializing in Open Source Intelligence (OSINT), vulnerability intelligence, and AI-driven threat analysis. He built ReconShield to democratize access to enterprise-grade reconnaissance tools and secure the digital attack surface.
                </p>
                <div className="flex gap-6 text-sm font-mono">
                  <a href="https://linkedin.com/in/surendrareddy3" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 flex items-center gap-1">LinkedIn <ChevronRight className="w-3 h-3"/></a>
                  <a href="https://github.com/nsurendrareddy" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white flex items-center gap-1">GitHub <ChevronRight className="w-3 h-3"/></a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 10. Related Tools & 12. Internal Linking Hub */}
        <section className="py-20 bg-[#0a0d14]">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex items-center gap-4 mb-10">
              <h2 className="font-mono text-xs tracking-[4px] uppercase text-[#00ff88] font-bold">// EXPLORE RELATED INTELLIGENCE TOOLS</h2>
              <div className="h-[1px] flex-1 bg-[#1a2332]" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/tools/dns-lookup" className="p-6 bg-surface-900 border border-white/5 hover:border-[#00ff88]/30 rounded-2xl group transition-all">
                <Network className="w-6 h-6 text-[#00ff88] mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-white font-bold mb-2 group-hover:text-[#00ff88] transition-colors">DNS Lookup Tool</h3>
                <p className="text-xs text-gray-400">Map out A, MX, and TXT records to discover misconfigured domains.</p>
              </Link>

              <Link href="/tools/vulnerability-scanner" className="p-6 bg-surface-900 border border-white/5 hover:border-[#00ff88]/30 rounded-2xl group transition-all">
                <Shield className="w-6 h-6 text-[#00ff88] mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-white font-bold mb-2 group-hover:text-[#00ff88] transition-colors">Website Vulnerability Scanner</h3>
                <p className="text-xs text-gray-400">Perform a full attack surface analysis passively on any domain.</p>
              </Link>

              <Link href="/ports" className="p-6 bg-surface-900 border border-white/5 hover:border-[#00ff88]/30 rounded-2xl group transition-all">
                <Terminal className="w-6 h-6 text-[#00ff88] mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-white font-bold mb-2 group-hover:text-[#00ff88] transition-colors">Open Port Scanner</h3>
                <p className="text-xs text-gray-400">Check IP addresses for exposed database and administrative ports.</p>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
