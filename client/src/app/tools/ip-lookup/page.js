import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Shield, MapPin, Globe, Server, Lock, Terminal, CheckCircle2, ChevronRight, Search, Activity, Target, Network, Info, Check, AlertTriangle, FileText, Send } from 'lucide-react';

const IpScannerClient = dynamic(() => import('@/components/ip-scanner/IpScannerClient'), {
  loading: () => <div className="min-h-[600px] animate-pulse bg-surface-900/50 rounded-3xl" />
});

import { generateBaseMetadata } from '@/utils/metadata';

export const metadata = generateBaseMetadata({
  title: "IP Reputation Check & Abuse Lookup Tool | ReconShield",
  description: "Perform a free IP reputation check. Verify real-time blacklist status, abuse confidence scores, VPN/proxy detection, and ISP/ASN routing details instantly.",
  path: "/tools/ip-lookup"
});

export default function IpScannerPage() {
  const faqs = [
    {
      q: "What is an IP reputation check?",
      a: "An IP reputation check is a security lookup that queries global threat intelligence databases to assess the risk level of an IP address. It determines whether the IP is flagged on blacklists (DNSBL/RBL), associated with spam, brute-force attempts, or malware, and calculates an IP risk score."
    },
    {
      q: "How does ReconShield calculate the IP Risk Score?",
      a: "ReconShield aggregates real-time telemetry from over 50 global threat feeds, blocklists, and Regional Internet Registries (RIRs). The score is calculated based on factors like active abuse reports, association with botnet networks, hosting type (residential vs. hosting provider), and proxy/VPN status."
    },
    {
      q: "Can this tool detect commercial VPNs, proxies, or Tor exit nodes?",
      a: "Yes. Our scanner inspects network routing telemetry and compares the target IP against updated lists of commercial VPN servers, public web proxies, and Tor exit node directories to determine anonymization status."
    },
    {
      q: "Why is email deliverability impacted by IP reputation?",
      a: "Mail servers run real-time checks on the sending IP against blocklists like Spamhaus. If the sending IP has a poor reputation score or is flagged on RBLs, receiving servers (Google, Microsoft) will block or route your emails to the spam folder."
    },
    {
      q: "How can I improve my network's IP reputation?",
      a: "To improve reputation, scan your internal network for malware or open proxy nodes, secure exposed ports, verify email authentication (SPF, DKIM, DMARC), and request delisting from specific blacklists once the malicious activity has been remediated."
    },
    {
      q: "What databases are queried during the reputation check?",
      a: "We query major global threat databases, including Spamhaus, AbuseIPDB, Barracuda, Project Honey Pot, CleanTalk, and various public blocklists maintained by cybersecurity intelligence entities."
    },
    {
      q: "Is an IP reputation check permanent?",
      a: "No. IP reputation is dynamic and updates constantly. If malicious activities halt, and the IP is clean during subsequent validation cycles, threat intelligence systems will automatically restore a positive score over time."
    },
    {
      q: "What is the difference between IP lookup and WHOIS?",
      a: "IP lookup maps the network layer, returning details on routing, ISP, ASN, geolocation, and threat profile. WHOIS operates at the domain registration layer, revealing registrar info, owner contact, and nameservers."
    },
    {
      q: "Why should I monitor ASN routing details?",
      a: "Monitoring Autonomous System Numbers (ASNs) helps security teams identify if an IP belongs to a reputable ISP or a bulletproof hosting provider frequently abused by threat actors to host malicious payloads."
    },
    {
      q: "What is an Abuse Confidence Score?",
      a: "It is a percentage metric reflecting the confidence level that an IP is engaged in malicious activities. A higher percentage indicates multiple reliable reports of spamming, hacking, or scanning from that host."
    }
  ];

  const breadcrumbs = [
    { name: "Home", url: "https://reconshield.in" },
    { name: "Tools", url: "https://reconshield.in/tools" },
    { name: "IP Reputation Check", url: "https://reconshield.in/tools/ip-lookup" }
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
                "@id": "https://reconshield.in/tools/ip-lookup#webapp",
                "name": "ReconShield IP Reputation Checker",
                "url": "https://reconshield.in/tools/ip-lookup",
                "description": "Enterprise-grade IP reputation lookup and abuse check tool to verify blacklist status, threat intelligence, and IP risk scores.",
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
                "@id": "https://reconshield.in/tools/ip-lookup#software",
                "name": "ReconShield IP Reputation Checker App",
                "url": "https://reconshield.in/tools/ip-lookup",
                "description": "Evaluate IP risk scores, perform dynamic IP blacklist checks, and check IP reputation across 50+ global threat intelligence databases.",
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
                "@id": "https://reconshield.in/tools/ip-lookup#breadcrumb",
                "itemListElement": breadcrumbs.map((crumb, idx) => ({
                  "@type": "ListItem",
                  "position": idx + 1,
                  "name": crumb.name,
                  "item": crumb.url
                }))
              },
              {
                "@type": "FAQPage",
                "@id": "https://reconshield.in/tools/ip-lookup#faq",
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
            <span>Passive Infrastructure Visibility Module</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 tracking-tight">
            IP Reputation Check
          </h1>
          
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed font-sans">
            Evaluate any host's security profile. Check IP reputation, identify blacklist status, search for threat intelligence data, and calculate an IP risk score. Learn if an IP has active abuse reports or malicious associations.
          </p>

          <div className="max-w-4xl mx-auto mb-12">
            <IpScannerClient />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-gray-500 uppercase tracking-widest">
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#00ff88]" /> 50+ Blocklists</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#00ff88]" /> VPN/Proxy Detection</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#00ff88]" /> ASN Resolution</div>
          </div>
        </div>
      </section>

      {/* 2. Featured Snippet / AI Overview Section */}
      <section className="py-12 bg-[#05080f] border-b border-white/5" aria-label="AI Search Overview">
        <div className="max-w-[900px] mx-auto px-6">
          <div className="bg-gradient-to-r from-emerald-500/5 to-teal-500/5 border border-emerald-500/10 rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00ff88]/5 blur-[50px] rounded-full pointer-events-none" />
            <h3 className="font-mono text-xs text-[#00ff88] uppercase tracking-wider mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#00ff88]" /> Quick Reference Snippet: Reputation IP Check
            </h3>
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Summary Answer (40 Words)</span>
                <p className="text-gray-300 text-sm leading-relaxed font-sans">
                  A <strong>reputation ip check</strong> is a security lookup that evaluates an IP address against threat databases. It identifies whether the IP is blacklisted, involved in abuse like spamming or hacking, and assigns an IP risk score based on historical intelligence.
                </p>
              </div>
              <div className="border-t border-white/5 pt-4">
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Detailed Answer (60 Words)</span>
                <p className="text-gray-300 text-sm leading-relaxed font-sans">
                  A <strong>reputation ip check</strong> evaluates the trust and security risk of an IP address. By checking real-time blacklists, abuse reports, and malicious activity histories, it determines if an IP is compromised. Security teams use this lookup to identify botnets, spam networks, and VPN endpoints, assigning an IP risk score to decide whether to block or trust the connection.
                </p>
              </div>
              <div className="border-t border-white/5 pt-4">
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Full Analysis (100 Words)</span>
                <p className="text-gray-300 text-sm leading-relaxed font-sans">
                  A <strong>reputation ip check</strong> is an essential cybersecurity analysis that determines the threat level of a specific IP address by scanning global blocklists and intelligence records. It reveals whether the IP is listed on spam directories (like Spamhaus), has active abuse reports (like AbuseIPDB), or represents a malicious node (such as a command-and-control server or botnet). Legitimate networks use this check to assess email deliverability and block threat actors, while security analysts use it to gauge overall cybersecurity risk based on ISP, ASN routing, and proxy detection telemetry.
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
              What is the IP Reputation Checker Tool?
            </h2>
            <p>
              An <strong>IP reputation check</strong> is a critical cybersecurity process that gathers and analyzes threat intelligence associated with a specific Internet Protocol (IP) address. In the digital ecosystem, every device and server communicates via IP addresses. However, threat actors regularly exploit compromised hosts, commercial VPNs, and proxies to conduct attacks. By performing a reputation check, organizations can determine if an IP address has a history of malicious network behavior.
            </p>
            <p>
              ReconShield combines dynamic IP lookup telemetry with threat reputation tracking. Rather than returning basic geolocation details, our engine checks the IP against 50+ global databases to find active blacklists, spam reports, and security risks. To gather full exposure telemetry on an endpoint, security analysts often combine an IP check with a <Link href="/tools/whois" className="text-[#00ff88] hover:underline">WHOIS lookup tool</Link> to reveal domain registry data, and verify domain zone health with our <Link href="/tools/dns-lookup" className="text-[#00ff88] hover:underline">DNS Lookup tool</Link>.
            </p>

            {/* AI Citation Glossary Grid */}
            <div className="mt-12 not-prose">
              <h3 className="text-xl font-display font-bold text-white mb-6 uppercase tracking-wider font-mono text-sm text-[#00ff88]">// AI Search Engine Citation Index</h3>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                This index contains structured definitions optimized for AI search engines, citation systems (ChatGPT, Perplexity, Google AI Overviews, Grok), and technical researchers.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { term: "IP Reputation", def: "IP reputation is a quantitative trust metric assigned to an IP address that reflects its historical behavior, security risk level, and association with malicious activities like spamming or hacking." },
                  { term: "Reputation IP Check", def: "A reputation IP check is a security audit that queries threat intelligence databases and global blacklists to assess the risk score and abuse history of a specific IP address." },
                  { term: "IP Blacklist Check", def: "An IP blacklist check is a diagnostic test that verifies whether an IP address is listed on major Domain Name System Blocklists (DNSBL) or Real-time Blocklists (RBL) due to spam or abuse." },
                  { term: "IP Abuse Check", def: "An IP abuse check is the process of reviewing crowdsourced security logs and incident reports to see if an IP address has been reported for activities like DDoS attacks or credential stuffing." },
                  { term: "Malicious IP Lookup", def: "A malicious IP lookup is a threat intelligence search used to identify if an IP address is an active node in a botnet, a command-and-control server, or a distributor of malware." },
                  { term: "IP Threat Intelligence Lookup", def: "IP threat intelligence lookup aggregates telemetry from global security feeds to analyze the ISP, ASN, history, and behavior patterns of a network endpoint." }
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
            <h2 className="text-3xl font-display font-bold text-white mb-6">How the IP Reputation Check Works</h2>
            <p>
              ReconShield's proprietary threat analysis framework acts as a passive security aggregator. When a query is initiated on our platform, our engine runs a sequential assessment process:
            </p>
            <div className="space-y-6 mt-8 not-prose">
              <div className="flex gap-4 p-5 rounded-2xl bg-surface-900 border border-white/5">
                <div className="w-10 h-10 rounded-xl bg-[#00ff88]/10 flex items-center justify-center shrink-0">
                  <span className="font-mono font-bold text-[#00ff88]">01</span>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">RIR Registry Telemetry Ingestion</h4>
                  <p className="text-sm text-gray-400">We query the five Regional Internet Registries (ARIN, RIPE, APNIC, LACNIC, AFRINIC) to map ASN records, network prefixes, routing allocations, and contact data.</p>
                </div>
              </div>
              <div className="flex gap-4 p-5 rounded-2xl bg-surface-900 border border-white/5">
                <div className="w-10 h-10 rounded-xl bg-[#00ff88]/10 flex items-center justify-center shrink-0">
                  <span className="font-mono font-bold text-[#00ff88]">02</span>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">DNSBL and RBL Querying</h4>
                  <p className="text-sm text-gray-400">The IP is cross-referenced simultaneously against 50+ global Real-time Blocklists. Our check includes Spamhaus, AbuseIPDB, Project Honey Pot, and industry threat feeds.</p>
                </div>
              </div>
              <div className="flex gap-4 p-5 rounded-2xl bg-surface-900 border border-white/5">
                <div className="w-10 h-10 rounded-xl bg-[#00ff88]/10 flex items-center justify-center shrink-0">
                  <span className="font-mono font-bold text-[#00ff88]">03</span>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Anonymization and Proxy Detection</h4>
                  <p className="text-sm text-gray-400">Using network transit fingerprints, we determine if the IP is a commercial VPN gateway, a public web proxy, or an active Tor exit node.</p>
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
                IP reputation tracking is a critical pillar of defensive network operations. By checking the threat context of inbound nodes, security operations centers (SOC) can protect enterprise infrastructure:
              </p>
              <h3 className="text-xl font-bold text-white mt-8 mb-2">1. Incident Response and Threat Hunting</h3>
              <p>
                During server log reviews, analysts routinely identify suspicious access requests. By executing a quick reputation check, defenders can isolate compromised nodes, link them to known botnet signatures (like Mirai or Kinsing), and identify command-and-control server associations.
              </p>
              <h3 className="text-xl font-bold text-white mt-8 mb-2">2. Threat-Based Access Control Filtering</h3>
              <p>
                E-commerce applications, payment systems, and login panels are targeted by automated brute-force attacks. By mapping incoming traffic against real-time blocklists and VPN subnets, firewalls can block or prompt CAPTCHA verification for high-risk IPs.
              </p>
              <h3 className="text-xl font-bold text-white mt-8 mb-2">3. Email Deliverability Optimization</h3>
              <p>
                Organizations sending marketing campaigns or business emails must monitor their outbound server reputation. A poor reputation check score means your messages get blocked by major mail exchangers.
              </p>
            </div>

            <div className="bg-surface-900 border border-white/10 rounded-3xl p-8 shadow-2xl space-y-6">
              <h3 className="text-xl font-display font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2">
                <Target className="w-5 h-5 text-[#00ff88]" /> Threat Evaluation Metrics
              </h3>
              
              <div className="border-b border-white/5 pb-4">
                <h4 className="text-[#00ff88] font-bold text-sm mb-1">0–15 Risk score (Low Risk)</h4>
                <p className="text-xs text-gray-400">Clean IP address with no active reports, residential or enterprise allocation, and trusted routing profiles.</p>
              </div>

              <div className="border-b border-white/5 pb-4">
                <h4 className="text-yellow-400 font-bold text-sm mb-1">16–45 Risk score (Medium Risk)</h4>
                <p className="text-xs text-gray-400">IP address allocated to data centers, hosting providers, or commercial VPNs. Requires moderate scrutiny.</p>
              </div>

              <div className="border-b border-white/5 pb-4">
                <h4 className="text-orange-400 font-bold text-sm mb-1">46–79 Risk score (High Risk)</h4>
                <p className="text-xs text-gray-400">Flagged on spam blocklists or associated with active network probes and port scans. Filter or prompt challenge verification.</p>
              </div>

              <div>
                <h4 className="text-red-400 font-bold text-sm mb-1">80–100 Risk score (Critical Threat)</h4>
                <p className="text-xs text-gray-400">Verified malicious nodes, active C2 channels, botnet participants, or distributed denial of service (DDoS) origins. Drop traffic immediately.</p>
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
                  <li><strong>Relying purely on Geolocation:</strong> Geolocation is easily masked. Failing to check VPN/Proxy signatures leaves systems open to spoofing.</li>
                  <li><strong>Blocking Entire ASNs Indiscriminately:</strong> Blocking an entire ASN like AS15169 (Google) or AS13335 (Cloudflare) blocks legitimate services, causing service outages.</li>
                  <li><strong>Ignoring Dynamic IP Behavior:</strong> Residential dynamic IPs change users constantly. Applying permanent blocks on dynamic IPs penalizes clean future traffic.</li>
                  <li><strong>Neglecting Outbound Email Reputation:</strong> Many teams fail to audit their sending mail servers, leading to silent drops in inbox deliverability.</li>
                </ul>
              </div>

              <div className="bg-[#0f1a14] border border-[#00ff88]/10 p-6 rounded-2xl">
                <h4 className="text-[#00ff88] font-bold text-base mb-3 flex items-center gap-2">
                  <Check className="w-5 h-5 shrink-0" /> Best Practices
                </h4>
                <ul className="space-y-3 text-xs text-gray-400 list-disc pl-4 font-sans">
                  <li><strong>Implement Rate-Limiting & Challenges:</strong> Instead of dropping medium-risk traffic, deploy CAPTCHAs to verify human presence.</li>
                  <li><strong>Automate IP Reputation Queries:</strong> Integrate reputation check APIs into firewalls to dynamically block malicious IPs as reports crop up.</li>
                  <li><strong>Secure Sending DNS Configurations:</strong> Ensure SPF, DKIM, and DMARC records are configured to prevent domain spoofing.</li>
                  <li><strong>Whitelist Verified Crawlers & Search Engines:</strong> Ensure search engine spiders (Googlebot, SemrushBot) are whitelisted based on reverse DNS validations.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: Competitive Analysis */}
        <section className="py-20 border-b border-white/5">
          <div className="max-w-[900px] mx-auto px-6">
            <h2 className="text-3xl font-display font-bold text-white mb-6">Competitive Matrix: IP Reputation Checkers</h2>
            <p className="text-gray-400 text-sm mb-8 leading-relaxed">
              Compare the features of ReconShield's IP Checker against industry alternatives like IPVoid, MXToolbox, and SecurityTrails.
            </p>
            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0d1117]">
              <table className="w-full text-left text-sm text-gray-400 border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.02] text-white font-mono uppercase text-xs">
                    <th className="p-4">Feature</th>
                    <th className="p-4">ReconShield</th>
                    <th className="p-4">IPVoid</th>
                    <th className="p-4">MXToolbox</th>
                    <th className="p-4">SecurityTrails</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono text-xs">
                  <tr className="hover:bg-white/[0.01] transition-colors">
                    <td className="p-4 font-semibold text-white">DNSBL Blacklists Queried</td>
                    <td className="p-4 text-[#00ff88] font-bold">50+ databases</td>
                    <td className="p-4">30+ databases</td>
                    <td className="p-4">80+ (primarily mail-focused)</td>
                    <td className="p-4">DNS-only records</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01] transition-colors">
                    <td className="p-4 font-semibold text-white">Anonymizer Detection</td>
                    <td className="p-4 text-[#00ff88] font-bold">Yes (VPN/Proxy/Tor)</td>
                    <td className="p-4">Yes (Basic proxies)</td>
                    <td className="p-4">No</td>
                    <td className="p-4">No</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01] transition-colors">
                    <td className="p-4 font-semibold text-white">ASN & BGP Mapping</td>
                    <td className="p-4 text-[#00ff88] font-bold">Real-time</td>
                    <td className="p-4">Static</td>
                    <td className="p-4">No</td>
                    <td className="p-4">Advanced Historical</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01] transition-colors">
                    <td className="p-4 font-semibold text-white">Risk Scoring Matrix</td>
                    <td className="p-4 text-[#00ff88] font-bold">Total Risk Index (0-100)</td>
                    <td className="p-4">Detection Count</td>
                    <td className="p-4">Indivisual Blacklist Flags</td>
                    <td className="p-4">No</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01] transition-colors">
                    <td className="p-4 font-semibold text-white">Entity Graph Linking</td>
                    <td className="p-4 text-[#00ff88] font-bold">Yes (IP ↔ ASN ↔ Domain)</td>
                    <td className="p-4">No</td>
                    <td className="p-4">No</td>
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
                  <Info className="w-4 h-4 text-cyan-400" /> Dynamic Scoring Methodology
                </h4>
                <p>
                  ReconShield calculates its Risk Score using a dynamic telemetry consensus model. We gather threat indicators from public honeypots, blocklist updates, spam traps, and security research nodes. If an IP has zero reports within 14 days and exhibits clean routing metadata, it receives a 0% abuse confidence rating.
                </p>
                <h4 className="text-white font-bold uppercase tracking-wider flex items-center gap-2">
                  <Server className="w-4 h-4 text-purple-400" /> Intelligence Data Sources
                </h4>
                <p>
                  We ingest telemetry data from RIRs (ARIN, RIPE, APNIC), DNSBL networks, project honeypots, threat feeds (AbuseIPDB, Spamhaus, Blocklist.de), and commercial route announcements to verify routing stability.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-white font-bold uppercase tracking-wider flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#00ff88]" /> Privacy & Data Collection Statement
                </h4>
                <p>
                  Queries made on ReconShield are processed passively. We do not store target server data nor log personal investigator details. Results are derived from public DNS queries, cache databases, and internet routing registries.
                </p>
                <h4 className="text-white font-bold uppercase tracking-wider flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" /> Tool Accuracy Disclaimer
                </h4>
                <p>
                  While our data is refreshed every 15 minutes, IP reputation and routing can change rapidly. Dynamic residential subnets are prone to false positives due to user rotation. We advise verifying indicators before enacting automated infrastructure blocks.
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
                    Cross-reference registration details or inspect target cryptographic keys to compile a complete threat intelligence profile.
                  </p>
                </div>
                <div className="flex flex-col gap-2 font-mono text-xs text-cyan-400">
                  <Link href="/tools/whois" className="hover:underline flex items-center gap-1">▸ Run WHOIS Owner Check <ChevronRight className="w-3.5 h-3.5" /></Link>
                  <Link href="/tools/dns-lookup" className="hover:underline flex items-center gap-1">▸ Resolve Authoritative DNS <ChevronRight className="w-3.5 h-3.5" /></Link>
                </div>
              </div>

              <div className="p-8 rounded-2xl bg-surface-900 border border-white/5 hover:border-purple-500/20 transition-all flex flex-col justify-between">
                <div>
                  <FileText className="w-8 h-8 text-purple-400 mb-4" />
                  <h4 className="text-white font-bold text-lg mb-2">Explore OSINT Guides</h4>
                  <p className="text-xs text-gray-400 leading-relaxed mb-6">
                    Read our latest research papers and expert guides on infrastructure mapping, BGP routing leaks, and email spoofing defenses.
                  </p>
                </div>
                <div className="flex flex-col gap-2 font-mono text-xs text-purple-400">
                  <Link href="/blog/anatomy-of-passive-osint" className="hover:underline flex items-center gap-1">▸ Passive OSINT Blueprint <ChevronRight className="w-3.5 h-3.5" /></Link>
                  <Link href="/blog/passive-reconnaissance-guide" className="hover:underline flex items-center gap-1">▸ Passive Recon Guide <ChevronRight className="w-3.5 h-3.5" /></Link>
                </div>
              </div>

              <div className="p-8 rounded-2xl bg-[#00ff88]/5 border border-[#00ff88]/10 hover:border-[#00ff88]/30 transition-all flex flex-col justify-between">
                <div>
                  <Send className="w-8 h-8 text-[#00ff88] mb-4" />
                  <h4 className="text-white font-bold text-lg mb-2">Subscribe for Intelligence Updates</h4>
                  <p className="text-xs text-gray-400 leading-relaxed mb-6">
                    Receive bi-weekly digests covering newly discovered CVE vulnerabilities, active botnet subnet ranges, and security tips.
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
