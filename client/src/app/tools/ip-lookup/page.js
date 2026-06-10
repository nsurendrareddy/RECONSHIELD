import dynamic from 'next/dynamic';
import Link from 'next/link';
import { 
  Shield, Globe, Server, Lock, Terminal, CheckCircle2, ChevronRight, 
  Search, Activity, Target, Network, Info, Check, AlertTriangle, 
  FileText, Send, MapPin, Database, Zap, BookOpen, Layers
} from 'lucide-react';
import { generateBaseMetadata } from '@/utils/metadata';

const IpScannerClient = dynamic(() => import('@/components/ip-scanner/IpScannerClient'), {
  loading: () => <div className="min-h-[600px] animate-pulse bg-surface-900/50 rounded-3xl" />
});

export const metadata = generateBaseMetadata({
  title: "IP Reputation Checker | Free IP Blacklist & Threat Lookup",
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

  const schemas = [
    {
      "@type": "SoftwareApplication",
      "@id": "https://reconshield.in/tools/ip-lookup#software",
      "name": "ReconShield IP Reputation Checker",
      "url": "https://reconshield.in/tools/ip-lookup",
      "description": "Enterprise-grade IP reputation lookup and abuse check tool to verify blacklist status, threat intelligence, and IP risk scores.",
      "applicationCategory": "UtilitiesApplication",
      "operatingSystem": "Web-based",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "publisher": { "@id": "https://reconshield.in/#organization" }
    },
    {
      "@type": "WebApplication",
      "@id": "https://reconshield.in/tools/ip-lookup#webapp",
      "name": "ReconShield IP Blacklist & Threat Scanner",
      "url": "https://reconshield.in/tools/ip-lookup",
      "description": "Evaluate IP risk scores, perform dynamic IP blacklist checks, and check IP reputation across 50+ global threat intelligence databases.",
      "applicationCategory": "SecurityApplication",
      "operatingSystem": "All",
      "browserRequirements": "Requires JavaScript. Requires HTML5.",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "publisher": { "@id": "https://reconshield.in/#organization" }
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
      "@type": "TechArticle",
      "@id": "https://reconshield.in/tools/ip-lookup#article",
      "headline": "The Ultimate Guide to IP Reputation, Blacklists, and Cyber Threat Intelligence",
      "description": "Learn how IP reputation is calculated, how to check if an IP is blacklisted, and how security operations centers use IP threat intelligence.",
      "author": { "@type": "Person", "name": "Surendra Reddy" },
      "publisher": { "@id": "https://reconshield.in/#organization" },
      "url": "https://reconshield.in/tools/ip-lookup"
    },
    {
      "@type": "HowTo",
      "@id": "https://reconshield.in/tools/ip-lookup#howto",
      "name": "How to check IP Reputation and Blacklist status",
      "description": "A step-by-step guide on how to perform an IP reputation check and analyze threat levels.",
      "step": [
        { "@type": "HowToStep", "name": "Enter IP Address", "text": "Input the target IPv4 or IPv6 address in the search input field." },
        { "@type": "HowToStep", "name": "Initiate Scan", "text": "Click 'Search' to analyze the IP across 50+ global threat blocklists and RIR datasets." },
        { "@type": "HowToStep", "name": "Inspect Risk Metrics", "text": "Analyze the IP Risk Score, Abuse Confidence, ASN details, ISP location, and proxy/VPN status." }
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
            <Search className="w-4 h-4 text-[#00ff88]" />
            <span>Passive Infrastructure Visibility Module</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 tracking-tight">
            IP Reputation Checker
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

      {/* AI Overview Snippets (Phase 4 Optimization) */}
      <section className="py-12 bg-[#05080f] border-b border-white/5" aria-label="AI Search Overview">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="bg-gradient-to-r from-emerald-500/5 to-teal-500/5 border border-emerald-500/10 rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00ff88]/5 blur-[50px] rounded-full pointer-events-none" />
            <h2 className="font-mono text-xs text-[#00ff88] uppercase tracking-wider mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#00ff88]" /> AI Overview Snippet: What is IP Reputation?
            </h2>
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// TL;DR Summary (Optimized for AI Search Engines)</span>
                <p className="text-gray-300 text-sm leading-relaxed font-sans">
                  <strong>IP reputation</strong> is a dynamic cybersecurity metric indicating the trustworthiness of an IP address. Calculated by scanning Real-time Blocklists (RBLs) and threat feeds, a poor IP reputation occurs when an IP is flagged for spamming, brute-force hacking, hosting malware, or running proxy/VPN gateways. Implementing regular IP blacklist checks prevents email delivery failures and protects corporate networks from cyber attacks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deep SEO Content Silo */}
      <div className="bg-[#05080f]">
        
        {/* H2 Content Blocks */}
        <section className="py-20 border-b border-white/5">
          <div className="max-w-[1000px] mx-auto px-6 prose prose-invert max-w-none prose-p:leading-relaxed prose-p:text-gray-400 prose-headings:text-white prose-a:text-[#00ff88] hover:prose-a:text-[#00cc6a]">
            
            <h2 className="text-3xl font-display font-bold mt-0 mb-6 flex items-center gap-3">
              <Activity className="w-8 h-8 text-[#00ff88]" />
              What Is IP Reputation?
            </h2>
            <p>
              <strong>IP reputation</strong> is a quantitative assessment of the trustworthiness and security threat level associated with a specific Internet Protocol (IP) address. In the context of global network communication, every computer, server, and IoT device is identified by a unique IP address. When a device exhibits malicious activity, cybersecurity threat intelligence platforms log and report it, degrading the IP's reputation score.
            </p>
            <p>
              Maintaining a positive IP reputation is crucial for normal business operations. A degraded reputation causes immediate operational issues, such as outgoing corporate emails being automatically routed to spam folders, web portals blocking legitimate client access, and network firewalls blacklisting your entire IP range.
            </p>

            <h2 className="text-3xl font-display font-bold mt-16 mb-6">How IP Reputation Works</h2>
            <p>
              IP reputation is calculated dynamically based on real-time network observations. Threat intelligence networks deploy distributed network sensors, honeypots, and spam traps to detect abnormal activities. The reputation calculation uses several distinct telemetry inputs:
            </p>
            <ul>
              <li><strong>Active Threat Feeds:</strong> Immediate reports of malicious behavior, such as SQL injections, SSH brute-forcing, and port scans.</li>
              <li><strong>Email Spam Volume:</strong> Outgoing mail patterns that hit corporate spam traps or generate SPF/DKIM/DMARC authentication failures.</li>
              <li><strong>Network Context:</strong> The type of host. Residential IP addresses are treated differently from server hosting environments (ASNs) which are often utilized by command-and-control infrastructures.</li>
              <li><strong>Anonymizer Usage:</strong> Active status as a Tor exit node, commercial VPN endpoint, or open proxy gateway.</li>
            </ul>

            <h2 className="text-3xl font-display font-bold mt-16 mb-6">How to Check IP Reputation</h2>
            <p>
              Checking the reputation of an IP is straightforward using ReconShield. By simply entering the IPv4 or IPv6 address in the input field above, our scanner queries over 50 global reputation blocklists simultaneously. Security operations centers utilize these checkers to query unknown endpoints before white-listing them, and developers run automated scripts using IP reputation APIs to dynamically adjust user privilege scores during login events.
            </p>

            <h2 className="text-3xl font-display font-bold mt-16 mb-6">How to Check if an IP Is Blacklisted</h2>
            <p>
              If your corporate web traffic is suddenly blocked or your mail servers are failing to deliver emails, your IP may be blacklisted. To check blacklist status:
            </p>
            <ol>
              <li>Perform a dynamic IP lookup on ReconShield to scan active DNSBL (DNS-based Blocklist) directories.</li>
              <li>Determine which specific blocklist has flagged your IP (e.g., Spamhaus, Barracuda, or Spamcop).</li>
              <li>Inspect your network logs for the timestamp of the listing. This typically indicates a compromised device or a malware infection sending out unauthorized traffic.</li>
              <li>Remediate the underlying threat (clean the server or patch the vulnerable port) and submit a delisting request to the relevant blocklist authority.</li>
            </ol>

            <h2 className="text-3xl font-display font-bold mt-16 mb-6">Understanding Abuse Scores</h2>
            <p>
              An <strong>Abuse Confidence Score</strong> is a percentage rating (from 0% to 100%) reflecting the mathematical probability that an IP address is actively engaged in malicious network behavior. A score of 0% indicates a clean IP with no reports, whereas a score of 100% signifies that multiple independent security databases have validated ongoing threat activity originating from the host within the last 24 to 48 hours.
            </p>

            <h2 className="text-3xl font-display font-bold mt-16 mb-6">IP Risk Score Explained</h2>
            <p>
              Similar to abuse confidence, the <strong>IP Risk Score</strong> integrates static routing details with active threat intelligence. A hosting server IP located in a datacenter known for bulletproof hosting has a high baseline risk score, even if it has no active abuse reports. Conversely, residential dynamic IPs have low baseline scores, but their risk score spikes instantly when a spam campaign is detected.
            </p>
          </div>
        </section>

        {/* Comparison Tables */}
        <section className="py-20 bg-[#0a0d14] border-b border-white/5">
          <div className="max-w-[1000px] mx-auto px-6 prose prose-invert max-w-none prose-p:text-gray-400 prose-a:text-[#00ff88]">
            <h2 className="text-3xl font-display font-bold text-white mb-6">IP Reputation vs WHOIS Lookup vs DNS Lookup</h2>
            <p>
              Security teams leverage multiple lookup protocols to map target exposure. Each check operates on a different layer of the OSI model:
            </p>

            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0d1117] not-prose my-10">
              <table className="w-full text-left text-sm text-gray-400 border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.02] text-white font-mono uppercase text-xs">
                    <th className="p-4">Feature</th>
                    <th className="p-4 border-l border-white/10">IP Reputation Check</th>
                    <th className="p-4 border-l border-white/10">WHOIS Lookup</th>
                    <th className="p-4 border-l border-white/10">DNS Lookup</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono text-xs">
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-4 font-semibold text-white">Focus Layer</td>
                    <td className="p-4 border-l border-white/10 text-[#00ff88]">Network Layer (Threat / Risk Profile)</td>
                    <td className="p-4 border-l border-white/10 text-purple-400">Application Layer (Registry Ownership)</td>
                    <td className="p-4 border-l border-white/10 text-cyan-400">Infrastructure Layer (Routing Records)</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-4 font-semibold text-white">Data Provided</td>
                    <td className="p-4 border-l border-white/10">Abuse score, Blacklists, VPN status</td>
                    <td className="p-4 border-l border-white/10">Registrar details, expiry dates, status locks</td>
                    <td className="p-4 border-l border-white/10">A, AAAA, MX, TXT record allocations</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-4 font-semibold text-white">Cybersecurity Use Case</td>
                    <td className="p-4 border-l border-white/10">Filtering malicious traffic, blocking attacks</td>
                    <td className="p-4 border-l border-white/10">Attribution, brand protection, takedowns</td>
                    <td className="p-4 border-l border-white/10">SPF/DMARC auditing, DNS hijacking checks</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-4 font-semibold text-white">ReconShield Tool Link</td>
                    <td className="p-4 border-l border-white/10"><span className="text-gray-500 italic">Current Page</span></td>
                    <td className="p-4 border-l border-white/10"><Link href="/tools/whois" className="text-[#00ff88] hover:underline flex items-center gap-1">Run WHOIS Check <ChevronRight className="w-3 h-3"/></Link></td>
                    <td className="p-4 border-l border-white/10"><Link href="/tools/dns-lookup" className="text-[#00ff88] hover:underline flex items-center gap-1">Run DNS Check <ChevronRight className="w-3 h-3"/></Link></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-3xl font-display font-bold text-white mt-16 mb-6">Threat Intelligence and IP Analysis</h2>
            <p>
              In modern security operations centers (SOC), IP reputation analysis is paired with active Threat Intelligence. Threat intelligence involves analyzing not just if an IP is bad, but <em>why</em> it is bad, who controls it, and what campaign it belongs to. By combining ISP and ASN metadata with live threat feeds, threat hunters can map the infrastructure footprint of advanced persistent threat (APT) groups.
            </p>

            <h2 className="text-3xl font-display font-bold mt-16 mb-6">Email Sender Reputation</h2>
            <p>
              Email delivery relies entirely on IP and domain reputation. If your outbound mail server's IP address gets listed on a Real-time Blocklist (RBL) like Spamhaus SBL/XBL, receiving mail servers will reject your messages. Regular auditing of email sender IPs alongside SPF and DMARC record checks is a fundamental step in mail delivery maintenance.
            </p>

            <h2 className="text-3xl font-display font-bold mt-16 mb-6">VPN and Proxy Detection</h2>
            <p>
              Threat actors hide their origin using VPNs, Tor exit nodes, and public proxies. Understanding whether an incoming connection is originating from a datacenter-hosted VPN tunnel or a direct residential fiber connection is critical for fraud detection and access control management.
            </p>

            <h2 className="text-3xl font-display font-bold mt-16 mb-6">Botnet and Malware Detection</h2>
            <p>
              Compromised IoT devices are compiled into massive botnets used to execute DDoS attacks or distribute malware. ReconShield's checker cross-references incoming endpoints with known botnet controller directories, helping you secure applications from automated scanning.
            </p>

            <h2 className="text-3xl font-display font-bold mt-16 mb-6">Common Blacklists</h2>
            <p>
              There are hundreds of blocklists, but a few industry standards govern the web:
            </p>
            <ul>
              <li><strong>Spamhaus:</strong> The gold standard for email spam tracking. Highly authoritative blocklist.</li>
              <li><strong>AbuseIPDB:</strong> Crowdsourced database logging web hacks, SSH brute-forcing, and spam.</li>
              <li><strong>Barracuda Rep:</strong> Real-time lookup database tracking IP reputation for spam prevention.</li>
              <li><strong>CBL (Composite Blocking List):</strong> Automated blocklist tracking botnet malware infections.</li>
            </ul>

            <h2 className="text-3xl font-display font-bold mt-16 mb-6">How Security Teams Use IP Reputation</h2>
            <p>
              Security teams leverage reputation checker tools to protect company networks:
            </p>
            <ul>
              <li><strong>Firewall Integration:</strong> Automatically ingest malicious IP feeds to block known C2 servers.</li>
              <li><strong>SIEM Alerts:</strong> Flag internal servers communicating with bad IP addresses.</li>
              <li><strong>Fraud Prevention:</strong> Block payment transactions originating from proxy/VPN networks.</li>
            </ul>
          </div>
        </section>

        {/* E-E-A-T & Trust Section */}
        <section className="py-20 border-b border-white/5">
          <div className="max-w-[1000px] mx-auto px-6">
            
            {/* Author Profile */}
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
                  Surendra is a cybersecurity engineer specializing in Open Source Intelligence (OSINT), exposure intelligence, and AI-driven threat analysis. He built ReconShield to democratize access to enterprise-grade infrastructure visibility tools and secure digital assets.
                </p>
                <div className="flex gap-6 text-sm font-mono">
                  <a href="https://linkedin.com/in/surendrareddy3" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 flex items-center gap-1">LinkedIn <ChevronRight className="w-3 h-3"/></a>
                  <a href="https://github.com/nsurendrareddy" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white flex items-center gap-1">GitHub <ChevronRight className="w-3 h-3"/></a>
                </div>
              </div>
            </div>

            <div className="text-center text-[10px] font-mono text-gray-600 uppercase tracking-widest">
              Last Updated: June 2026 | Reviewed by ReconShield Editorial Board | Sources: IANA, RIRs, Spamhaus, AbuseIPDB
            </div>
          </div>
        </section>

        {/* Related Tools Navigation (Internal Link Building) */}
        <section className="py-20 bg-[#05080f]" aria-label="Related Security Tools">
          <div className="max-w-[1000px] mx-auto px-6">
            <h2 className="text-3xl font-display font-bold text-white mb-10 text-center">Complete Your Infrastructure Audit</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/tools/whois" className="p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-cyan-500/30 transition-all group">
                <Globe className="w-8 h-8 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-white font-bold text-lg mb-2">WHOIS Lookup</h4>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">Analyze domain registration data, ownership timelines, and registrar security locks.</p>
                <span className="text-cyan-400 text-xs font-mono flex items-center gap-1">Run WHOIS check <ChevronRight className="w-3 h-3"/></span>
              </Link>
              
              <Link href="/tools/dns-lookup" className="p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-purple-500/30 transition-all group">
                <Database className="w-8 h-8 text-purple-400 mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-white font-bold text-lg mb-2">DNS Records Checker</h4>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">Resolve authoritative A, MX, TXT, and CNAME records to map routing configurations.</p>
                <span className="text-purple-400 text-xs font-mono flex items-center gap-1">Check DNS records <ChevronRight className="w-3 h-3"/></span>
              </Link>

              <Link href="/tools/ssl-checker" className="p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-[#00ff88]/30 transition-all group">
                <Shield className="w-8 h-8 text-[#00ff88] mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-white font-bold text-lg mb-2">SSL/TLS Checker</h4>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">Audit cryptographic security, verify SSL chains, and check certificate expiry timelines.</p>
                <span className="text-[#00ff88] text-xs font-mono flex items-center gap-1">Audit TLS certs <ChevronRight className="w-3 h-3"/></span>
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
