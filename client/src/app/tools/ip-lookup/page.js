import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Shield, MapPin, Globe, Server, Lock, Terminal, CheckCircle2, ChevronRight, Search, Activity, Target, Network } from 'lucide-react';

const IpScannerClient = dynamic(() => import('@/components/ip-scanner/IpScannerClient'), {
  loading: () => <div className="min-h-[600px] animate-pulse bg-surface-900/50 rounded-3xl" />
});

import { generateBaseMetadata } from '@/utils/metadata';

export const metadata = generateBaseMetadata({
  title: "IP Reputation Check Tool – Check Blacklists, Abuse Reports & Risk Score",
  description: "Check IP reputation, blacklist status, abuse reports, and threat intelligence. Evaluate IP risk scores, detect VPN/proxies, and run deep IP lookup checks.",
  path: "/tools/ip-lookup"
});

export default function IpScannerPage() {
  const faqs = [
    {
      q: "What is IP reputation?",
      a: "IP reputation is a trust score representing the likelihood that an IP address is safe or malicious. It is determined by analyzing historical network behavior, blacklist records, and threat reports."
    },
    {
      q: "How do I check if an IP is blacklisted?",
      a: "You can perform an IP blacklist check using ReconShield. Our tool queries over 50 global DNSBL and RBL databases in real-time to check if the IP has been flagged for spam or malware."
    },
    {
      q: "Why is my IP reputation poor?",
      a: "Your IP reputation can become poor if your device is infected with malware, sending spam emails, hosting malicious files, or if you share a dynamic IP address with an abuse-prone user."
    },
    {
      q: "How can I improve IP reputation?",
      a: "To improve your IP reputation, scan your network for malware, stop unauthorized outgoing emails, secure exposed ports, and request removal (delisting) from blacklists like Spamhaus."
    },
    {
      q: "What causes an IP to be flagged?",
      a: "An IP is flagged due to suspicious activities such as high volumes of email spam, brute-force login attempts, port scanning, hosting phishing pages, or participating in DDoS attacks."
    },
    {
      q: "Is IP reputation permanent?",
      a: "No. IP reputation is dynamic and updates constantly. If the malicious activity stops and you resolve any underlying infections, major threat feeds will restore a positive reputation over time."
    },
    {
      q: "What databases are checked?",
      a: "ReconShield checks major global threat databases, including Spamhaus, AbuseIPDB, Barracuda, Project Honey Pot, and blocklists maintained by security intelligence providers."
    },
    {
      q: "How often should I monitor reputation?",
      a: "For business networks and mail servers, you should monitor IP reputation continuously using automated tools or APIs to prevent security incidents and deliverability drops."
    },
    {
      q: "What is an abuse score?",
      a: "An abuse score (or Abuse Confidence Score) is a metric that indicates how confident threat intelligence networks are that an IP address is actively engaged in malicious cyber activities."
    },
    {
      q: "Why does email reputation matter?",
      a: "Email reputation determines whether your sent messages reach the recipient's inbox. A poor IP reputation causes mail servers to reject your emails or mark them as spam, blocking critical communication."
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
                "@type": "Organization",
                "@id": "https://reconshield.in/#organization",
                "name": "ReconShield",
                "url": "https://reconshield.in",
                "logo": {
                  "@type": "ImageObject",
                  "@id": "https://reconshield.in/#logo",
                  "url": "https://reconshield.in/logo.png",
                  "caption": "ReconShield Logo"
                },
                "sameAs": [
                  "https://linkedin.com/company/reconshield",
                  "https://github.com/nsurendrareddy"
                ]
              },
              {
                "@type": "WebApplication",
                "@id": "https://reconshield.in/tools/ip-lookup#web-app",
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
                "@id": "https://reconshield.in/tools/ip-lookup#software-app",
                "name": "ReconShield IP Reputation Checker",
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
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://reconshield.in"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Tools",
                    "item": "https://reconshield.in/tools"
                  },
                  {
                    "@type": "ListItem",
                    "position": 3,
                    "name": "IP Reputation Check",
                    "item": "https://reconshield.in/tools/ip-lookup"
                  }
                ]
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
      <section className="relative pt-24 pb-20 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[#0a0d14] -z-20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-[#00ff88]/5 blur-[100px] rounded-full pointer-events-none -z-10" />
        
        <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-center animate-fade-in-up">
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

      {/* Featured Snippet Section */}
      <section className="py-12 bg-[#05080f] border-b border-white/5">
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

      {/* SEO Content Silo Container */}
      <div className="bg-[#05080f]">
        
        {/* What Is an IP Reputation Check? */}
        <section className="py-20 border-b border-white/5">
          <div className="max-w-[900px] mx-auto px-6 prose prose-invert max-w-none prose-p:leading-relaxed prose-p:text-gray-400 prose-headings:text-white prose-a:text-[#00ff88] hover:prose-a:text-[#00cc6a]">
            
            <h2 className="text-3xl font-display font-bold mt-0 mb-6 flex items-center gap-3">
              <Activity className="w-8 h-8 text-[#00ff88]" />
              What Is an IP Reputation Check?
            </h2>
            <p>
              An <strong>IP reputation check</strong> is a critical cybersecurity process that gathers and analyzes threat intelligence associated with a specific Internet Protocol (IP) address. In the digital ecosystem, every device and server communicates via IP addresses. However, threat actors regularly exploit compromised hosts, commercial VPNs, and proxies to conduct attacks. By performing a reputation check, organizations can determine if an IP address has a history of malicious network behavior.
            </p>
            <p>
              ReconShield combines dynamic IP lookup telemetry with threat reputation tracking. Rather than returning basic geolocation details, our engine checks the IP against 50+ global databases to find active blacklists, spam reports, and security risks. To gather full exposure telemetry on an endpoint, security analysts often combine an IP check with a <Link href="/tools/whois" className="text-[#00ff88] hover:underline">WHOIS lookup tool</Link> to reveal ownership data.
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
                  { term: "IP Threat Intelligence Lookup", def: "An IP threat intelligence lookup aggregates telemetry from global security feeds to analyze the ISP, ASN, history, and behavior patterns of a network endpoint." },
                  { term: "IP Risk Score", def: "An IP risk score is a numerical rating from 0 to 100 representing the probability that traffic originating from an IP address is malicious, fraudulent, or automated." },
                  { term: "Abuse Confidence Score", def: "An abuse confidence score is a percentage indicator reflecting the certainty that an IP address has engaged in malicious activity, based on the frequency and reliability of recent reports." },
                  { term: "Email Deliverability Impact", def: "Email deliverability impact refers to the reduction in inbox placement rates when a sending mail server's IP address is flagged on blacklists or has a poor reputation score." },
                  { term: "Cybersecurity Risk Assessment", def: "A cybersecurity risk assessment is an evaluation process that analyzes infrastructure vulnerabilities, threat indicators, and endpoint reputation to secure network boundaries." }
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

        {/* Why IP Reputation Matters */}
        <section className="py-20 bg-[#0a0d14] border-b border-white/5">
          <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            <div className="prose prose-invert max-w-none prose-p:text-gray-400 prose-a:text-[#00ff88]">
              <h2 className="text-3xl font-display font-bold text-white mb-6">Why IP Reputation Matters</h2>
              <p>
                In cybersecurity, context is vital. IP reputation tells network defenders whether an inbound connection is safe to accept. If a server IP is blacklisted, it indicates the host has been compromised or actively used for abusive tasks. 
              </p>
              <p>
                A critical area where IP reputation has immediate consequences is the <strong>email deliverability impact</strong>. If your mail server IP is flagged on DNSBL/RBL databases due to spam detection, major email providers like Google and Microsoft will block or route your emails to the spam folder. This damages company communication and sales operations.
              </p>
              <p>
                By utilizing a proactive <strong>malicious IP lookup</strong>, organizations can block high-risk networks before they interact with internal applications. If a flagged IP attempts to connect, your firewalls can automatically challenge or drop the traffic. If your network's IP is flagged, it is vital to audit mail exchange configurations using a <Link href="/tools/dns-lookup" className="text-[#00ff88] hover:underline">DNS lookup tool</Link> to check DNSSEC, SPF, and DMARC setups.
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

        {/* How ReconShield Evaluates IP Risk */}
        <section className="py-20 border-b border-white/5">
          <div className="max-w-[900px] mx-auto px-6 prose prose-invert max-w-none prose-p:text-gray-400 prose-a:text-[#00ff88]">
            <h2 className="text-3xl font-display font-bold text-white mb-8">How ReconShield Evaluates IP Risk</h2>
            
            <p>
              Our threat evaluation methodology combines passive scanning framework checks with third-party threat intelligence ingestion. When you search an IP address on ReconShield, our system initiates a multi-layered analysis:
            </p>
            <ol className="list-decimal list-inside space-y-4 text-gray-300">
              <li><strong>Passive Reconnaissance:</strong> Our engine maps the host's BGP routing prefixes and queries the Regional Internet Registries (RIRs) to verify network ownership. Our threat engine automatically performs a <Link href="/tools/dns-lookup" className="text-[#00ff88] hover:underline">reverse DNS check</Link> to resolve host PTR records and checks SSL certificates via our <Link href="/tools/ssl-checker" className="text-[#00ff88] hover:underline">SSL checker tool</Link> to verify cryptographic health.</li>
              <li><strong>BGP & ASN Intelligence:</strong> We map routing networks via an <Link href="/tools/ip-lookup" className="text-[#00ff88] hover:underline">Autonomous System Number lookup</Link> to trace the originating ISP network, identifying if the IP belongs to a residential provider or a commercial hosting platform.</li>
              <li><strong>Threat Database Cross-Reference:</strong> The system queries major abuse databases and blocklists in real-time, matching the target against recent reports of spam, brute-forcing, SQL injection, or malware propagation.</li>
              <li><strong>Anonymizer Detection:</strong> We scan blocklists and commercial subnets to check if the host is a public proxy, commercial VPN gateway, or Tor exit node.</li>
            </ol>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
              <div className="bg-[#0d1117] border border-[#1a2332] rounded-2xl p-6">
                <h4 className="text-white font-bold text-sm mb-3 font-mono text-[#00ff88]">// Global Data Sources</h4>
                <p className="text-xs text-gray-400 leading-relaxed font-sans">
                  We collect network routing, IP assignment, and reputation data from primary registries (ARIN, RIPE, APNIC, LACNIC, AFRINIC) and leading security databases including Spamhaus, AbuseIPDB, Project Honey Pot, and major open-source threat feeds.
                </p>
              </div>
              <div className="bg-[#0d1117] border border-[#1a2332] rounded-2xl p-6">
                <h4 className="text-white font-bold text-sm mb-3 font-mono text-[#00ff88]">// Update Frequency</h4>
                <p className="text-xs text-gray-400 leading-relaxed font-sans">
                  Threat intelligence lists and active blacklist mappings are refreshed every 15 minutes. Geolocation, ISP assignments, and BGP routing records are updated daily to ensure maximum data accuracy and crawl fresh details.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* Understanding Reputation Scores */}
        <section className="py-20 bg-[#0a0d14] border-b border-white/5">
          <div className="max-w-[900px] mx-auto px-6 prose prose-invert max-w-none prose-p:text-gray-400">
            <h2 className="text-3xl font-display font-bold text-white mb-6">Understanding Reputation Scores</h2>
            <p>
              When evaluating an IP risk profile, ReconShield outputs a Total Risk Index from 0 to 100. This numerical score represents the mathematical likelihood that traffic originating from the IP is malicious or fraudulent:
            </p>
            
            <div className="space-y-4 mt-8 not-prose">
              <div className="p-5 rounded-2xl bg-surface-900 border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h4 className="text-white font-bold text-sm mb-1 font-mono">Score 0–15: Clean / Low Risk</h4>
                  <p className="text-xs text-gray-400 max-w-xl">Legitimate residential or corporate IP addresses with no history of abuse, blacklists, or suspicious telemetry. Safely allow traffic.</p>
                </div>
                <div className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono rounded">LOW</div>
              </div>
              
              <div className="p-5 rounded-2xl bg-surface-900 border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h4 className="text-white font-bold text-sm mb-1 font-mono">Score 16–45: Medium Risk</h4>
                  <p className="text-xs text-gray-400 max-w-xl">Commercial hosting IPs, dynamic subnets, or VPNs with minor reports. Treat with caution for financial transactions, but generally safe for browsing.</p>
                </div>
                <div className="px-3 py-1 bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-mono rounded">MEDIUM</div>
              </div>

              <div className="p-5 rounded-2xl bg-surface-900 border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h4 className="text-white font-bold text-sm mb-1 font-mono">Score 46–79: High Risk</h4>
                  <p className="text-xs text-gray-400 max-w-xl">IPs with verified recent spam activity, brute-forcing attempts, or public proxy listings. Recommended to challenge with CAPTCHAs or limit API access.</p>
                </div>
                <div className="px-3 py-1 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-mono rounded">HIGH</div>
              </div>

              <div className="p-5 rounded-2xl bg-surface-900 border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h4 className="text-white font-bold text-sm mb-1 font-mono">Score 80–100: Critical Risk</h4>
                  <p className="text-xs text-gray-400 max-w-xl">Confirmed threat sources, including active botnet nodes, malware distributors, C2 servers, or hosts flagged on multiple high-authority blacklists. Block immediately.</p>
                </div>
                <div className="px-3 py-1 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono rounded">CRITICAL</div>
              </div>
            </div>

            <p className="mt-8">
              In addition to the overall risk index, our system displays the <strong>Abuse Confidence Score</strong>. Calculated from community reports, it acts as a secondary verification of malicious behavior. In a cybersecurity risk assessment, combining these two scores gives analysts a reliable baseline for traffic filtering and defense.
            </p>
          </div>
        </section>

        {/* Frequently Asked Questions */}
        <section className="py-20 border-b border-white/5 bg-[#0a0d14]">
          <div className="max-w-[900px] mx-auto px-6">
            <h2 className="text-3xl font-display font-bold text-white mb-10 text-center">Frequently Asked Questions</h2>
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

        {/* EEAT Author Bio */}
        <section className="py-16">
          <div className="max-w-[900px] mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center gap-8 p-8 bg-gradient-to-r from-[#0d1117] to-surface-900 border border-white/10 rounded-3xl shadow-xl">
              <div className="w-24 h-24 rounded-full bg-[#1a2332] border-2 border-[#00ff88]/30 flex items-center justify-center shrink-0 overflow-hidden">
                <Shield className="w-10 h-10 text-[#00ff88]" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 px-2 py-1 rounded bg-[#00ff88]/10 text-[#00ff88] text-[10px] font-mono uppercase tracking-widest mb-2">
                  <CheckCircle2 className="w-3 h-3" /> Fact Checked & Verified
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
          </div>
        </section>

        {/* Explore Related Tools */}
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
                <h3 className="text-white font-bold mb-2 group-hover:text-[#00ff88] transition-colors">Security Exposure Assessment Tool</h3>
                <p className="text-xs text-gray-400">Perform a full internet-facing assets analysis passively on any domain.</p>
              </Link>

              <Link href="/tools/port-scanner" className="p-6 bg-surface-900 border border-white/5 hover:border-[#00ff88]/30 rounded-2xl group transition-all">
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
