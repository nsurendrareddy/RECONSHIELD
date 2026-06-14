import dynamic from 'next/dynamic';
import Link from 'next/link';
import { 
  Shield, Globe, Server, Lock, Terminal, CheckCircle2, ChevronRight, 
  Search, Activity, Target, Network, Info, Check, AlertTriangle, 
  FileText, Send, MapPin, Database, Zap, BookOpen, Layers, Users
} from 'lucide-react';
import { generateBaseMetadata } from '@/utils/metadata';

const IpScannerClient = dynamic(() => import('@/components/ip-scanner/IpScannerClient'), {
  loading: () => <div className="min-h-[600px] animate-pulse bg-surface-900/50 rounded-3xl" />
});

export const metadata = {
  ...generateBaseMetadata({
    title: "Free IP Lookup - IP Geolocation & Reputation Checker | ReconShield",
    description: "Free IP lookup tool for geolocation, reputation check, and threat intelligence. Verify IP addresses, check blacklists, and analyze network data instantly.",
    path: "/tools/ip-lookup",
    image: "https://reconshield.in/og-image-ip.png"
  }),
  keywords: [
    "ip lookup", "free ip checker", "ip geolocation", "ip address lookup", "ip reputation checker",
    "ip blacklist checker", "check ip address", "ip location finder", "whats my ip location", "ip threat intelligence",
    "free ip geolocation lookup tool", "check ip address reputation online", "ip blacklist checker free", "verify ip address location", "ip reputation scoring tool"
  ],
  appleWebApp: {
    capable: true,
    title: "ReconShield",
    statusBarStyle: "black-translucent",
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent"
  }
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0d14",
};

export default function IpScannerPage() {
  const faqs = [
    {
      q: "What is an IP lookup?",
      a: "An IP lookup is a query process that resolves an Internet Protocol address to retrieve its physical geographic location, network provider (ISP), Autonomous System Number (ASN), and reputation profile across security blacklists."
    },
    {
      q: "What is IP geolocation?",
      a: "IP geolocation is the identification of the geographic location of a device using its IP address. This data includes the country, region, city, zip code, latitude, longitude, and timezone associated with the IP allocation."
    },
    {
      q: "How does the IP reputation checker work?",
      a: "The IP reputation checker queries multiple threat intelligence feeds, spam honeypots, and real-time blacklists (RBLs) to determine if an IP address has been flagged for malicious activities like spamming, port scanning, or malware distribution."
    },
    {
      q: "Can this free IP checker detect VPNs or proxies?",
      a: "Yes. Our scanner inspects network routing headers and compares the target IP against updated directories of commercial VPN servers, public web proxies, Tor exit nodes, and hosting provider subnets to detect anonymization."
    },
    {
      q: "What is an IP blacklist check?",
      a: "An IP blacklist check verifies if a specific IP address is currently blocked by major email filters, spam prevention databases (like Spamhaus), or web application firewalls due to reported abuse or compromises."
    },
    {
      q: "How does email deliverability relate to IP reputation?",
      a: "Mail systems query real-time blocklists before accepting incoming messages. If your outbound email server's IP has a high risk score, servers like Google and Microsoft will block your emails or direct them to spam folders."
    },
    {
      q: "Is IP threat intelligence data real-time?",
      a: "Yes. ReconShield aggregates telemetry from over 50 global threat feeds and real-time blacklists to calculate live IP risk scores and confidence levels."
    },
    {
      q: "How do I improve or clean a bad IP reputation?",
      a: "To restore a poor reputation score, identify and eliminate the source of malicious traffic on your network, configure email security protocols (SPF, DKIM, DMARC), and request a delisting review from major blocklists once clean."
    }
  ];

  const breadcrumbs = [
    { name: "Home", url: "https://reconshield.in" },
    { name: "Tools", url: "https://reconshield.in/tools" },
    { name: "IP Lookup", url: "https://reconshield.in/tools/ip-lookup" }
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
          "@id": "https://reconshield.in/tools/ip-lookup#webpage",
          "url": "https://reconshield.in/tools/ip-lookup",
          "name": "Free IP Lookup - IP Geolocation & Reputation Checker | ReconShield",
          "isPartOf": { "@id": "https://reconshield.in/#website" }
        },
        {
          "@type": "SoftwareApplication",
          "@id": "https://reconshield.in/tools/ip-lookup#software",
          "name": "ReconShield IP Geolocation & Reputation Checker",
          "url": "https://reconshield.in/tools/ip-lookup",
          "description": "Free IP lookup and geolocation tool to check blacklist status, threat intelligence, and IP risk scores.",
          "applicationCategory": "SecurityApplication",
          "operatingSystem": "All",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "publisher": { "@id": "https://reconshield.in/#organization" },
          "featureList": [
            "100% Free - Unlimited IP lookups with no cost",
            "Geolocation Data - Country, city, coordinates, and timezone",
            "Blacklist Checking - Verify against multiple spam and threat databases",
            "Reputation Scoring - Real-time threat intelligence and risk assessment",
            "IPv4 & IPv6 Support - Check both legacy and modern IP addresses",
            "ISP & ASN Information - Network ownership and routing data",
            "No Registration - Start checking IPs instantly",
            "Privacy-Focused - We don't store or log your queries"
          ]
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
          "headline": "Free IP Lookup and Geolocation Verification Guide",
          "description": "Learn how IP reputation is calculated, how to check if an IP is blacklisted, and how security operations centers use IP threat intelligence.",
          "author": { "@type": "Person", "name": "Surendra Reddy" },
          "publisher": { "@id": "https://reconshield.in/#organization" },
          "url": "https://reconshield.in/tools/ip-lookup",
          "isPartOf": { "@id": "https://reconshield.in/tools/ip-lookup#webpage" }
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
          ],
          "isPartOf": { "@id": "https://reconshield.in/tools/ip-lookup#webpage" }
        },
        {
          "@type": "FAQPage",
          "@id": "https://reconshield.in/tools/ip-lookup#faq",
          "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": { "@type": "Answer", "text": faq.a }
          })),
          "isPartOf": { "@id": "https://reconshield.in/tools/ip-lookup#webpage" }
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
            <Search className="w-4 h-4 text-[#00ff88]" />
            <span>Passive Infrastructure Visibility Module</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 tracking-tight">
            Free IP Lookup Tool - IP Geolocation &amp; Reputation Checker
          </h1>
          
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed font-sans">
            Our <strong>free IP lookup tool</strong> helps you check IP addresses for geolocation, reputation, and threat intelligence instantly. Whether you&apos;re investigating suspicious IPs, verifying email senders, or analyzing network traffic, this <strong>IP geolocation checker</strong> provides comprehensive data including location, ISP, blacklist status, and reputation scores. No registration required—simply enter any IPv4 or IPv6 address to get detailed IP information.
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
              
              <div className="border-t border-white/5 pt-4">
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Key Takeaways (Perplexity & Claude Optimized)</span>
                <ul className="list-disc pl-5 text-gray-400 text-xs space-y-2 font-mono">
                  <li>Aggregates indicators from 50+ DNSBL/RBL databases to compute absolute risk scores.</li>
                  <li>Differentiates between commercial VPNs, open proxy tunnels, Tor exit nodes, and residential ISPs.</li>
                  <li>Identifies hosting ASN contexts (e.g., bulletproof datacenters vs. consumer network blocks).</li>
                  <li>Impacts B2B email deliverability, firewall routing policies, and e-commerce checkout fraud filters.</li>
                </ul>
              </div>

              <div className="border-t border-white/5 pt-4">
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Expert Security Summary</span>
                <p className="text-gray-400 text-xs leading-relaxed font-sans">
                  From a forensic standpoint, IP address reputation acts as a transient state of infrastructure health. Since IPv4 resources are limited and constantly recycled, a reputation check must combine real-time blacklist queries with structural routing analysis (ASN registry, BGP updates, and subnet history) to prevent false positives during security log correlation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights Section */}
      <section className="py-16 bg-[#0a0d14] border-b border-white/5" aria-label="Why Choose ReconShield">
        <div className="max-w-[1000px] mx-auto px-6">
          <h2 className="text-2xl font-display font-bold text-white mb-8 text-center">Why Use ReconShield&apos;s IP Lookup Tool?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 not-prose">
            <div className="p-5 bg-surface-900 border border-white/10 rounded-2xl hover:border-[#00ff88]/20 transition-all flex flex-col justify-between">
              <div>
                <Check className="w-6 h-6 text-[#00ff88] mb-3" />
                <h3 className="text-white text-xs font-bold font-mono uppercase tracking-wider mb-2">100% Free</h3>
                <p className="text-gray-400 text-[11px] leading-relaxed">Unlimited IP lookups with no cost</p>
              </div>
            </div>
            <div className="p-5 bg-surface-900 border border-white/10 rounded-2xl hover:border-[#00ff88]/20 transition-all flex flex-col justify-between">
              <div>
                <MapPin className="w-6 h-6 text-[#00ff88] mb-3" />
                <h3 className="text-white text-xs font-bold font-mono uppercase tracking-wider mb-2">Geolocation Data</h3>
                <p className="text-gray-400 text-[11px] leading-relaxed">Country, city, coordinates, and timezone</p>
              </div>
            </div>
            <div className="p-5 bg-surface-900 border border-white/10 rounded-2xl hover:border-[#00ff88]/20 transition-all flex flex-col justify-between">
              <div>
                <AlertTriangle className="w-6 h-6 text-[#00ff88] mb-3" />
                <h3 className="text-white text-xs font-bold font-mono uppercase tracking-wider mb-2">Blacklist Checking</h3>
                <p className="text-gray-400 text-[11px] leading-relaxed">Verify against multiple spam and threat databases</p>
              </div>
            </div>
            <div className="p-5 bg-surface-900 border border-white/10 rounded-2xl hover:border-[#00ff88]/20 transition-all flex flex-col justify-between">
              <div>
                <Shield className="w-6 h-6 text-[#00ff88] mb-3" />
                <h3 className="text-white text-xs font-bold font-mono uppercase tracking-wider mb-2">Reputation Scoring</h3>
                <p className="text-gray-400 text-[11px] leading-relaxed">Real-time threat intelligence and risk assessment</p>
              </div>
            </div>
            <div className="p-5 bg-surface-900 border border-white/10 rounded-2xl hover:border-[#00ff88]/20 transition-all flex flex-col justify-between">
              <div>
                <Zap className="w-6 h-6 text-[#00ff88] mb-3" />
                <h3 className="text-white text-xs font-bold font-mono uppercase tracking-wider mb-2">IPv4 &amp; IPv6 Support</h3>
                <p className="text-gray-400 text-[11px] leading-relaxed">Check both legacy and modern IP addresses</p>
              </div>
            </div>
            <div className="p-5 bg-surface-900 border border-white/10 rounded-2xl hover:border-[#00ff88]/20 transition-all flex flex-col justify-between">
              <div>
                <Database className="w-6 h-6 text-[#00ff88] mb-3" />
                <h3 className="text-white text-xs font-bold font-mono uppercase tracking-wider mb-2">ISP &amp; ASN Information</h3>
                <p className="text-gray-400 text-[11px] leading-relaxed">Network ownership and routing data</p>
              </div>
            </div>
            <div className="p-5 bg-surface-900 border border-white/10 rounded-2xl hover:border-[#00ff88]/20 transition-all flex flex-col justify-between">
              <div>
                <Terminal className="w-6 h-6 text-[#00ff88] mb-3" />
                <h3 className="text-white text-xs font-bold font-mono uppercase tracking-wider mb-2">No Registration</h3>
                <p className="text-gray-400 text-[11px] leading-relaxed">Start checking IPs instantly</p>
              </div>
            </div>
            <div className="p-5 bg-surface-900 border border-white/10 rounded-2xl hover:border-[#00ff88]/20 transition-all flex flex-col justify-between">
              <div>
                <Lock className="w-6 h-6 text-[#00ff88] mb-3" />
                <h3 className="text-white text-xs font-bold font-mono uppercase tracking-wider mb-2">Privacy-Focused</h3>
                <p className="text-gray-400 text-[11px] leading-relaxed">We don&apos;t store or log your queries</p>
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

            <div className="bg-surface-900 border border-white/10 rounded-2xl p-6 my-6 not-prose">
              <div className="flex gap-4">
                <Info className="w-6 h-6 text-[#00ff88] shrink-0 mt-1" />
                <div>
                  <h4 className="text-white font-bold text-sm mb-1 font-mono">// Cybersecurity Definition: IP Reputation</h4>
                  <p className="text-xs text-gray-400 leading-relaxed font-sans">
                    IP reputation is an infrastructure security score, typically evaluated on a scale from 0 to 100, that aggregates telemetry from networks, firewalls, and spam traps to predict the likelihood that an IP address will originate malicious payloads, spam, scans, or unauthorized traffic.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-surface-900 border border-white/10 rounded-2xl p-6 my-6 not-prose">
              <div className="flex gap-4">
                <Info className="w-6 h-6 text-[#00ff88] shrink-0 mt-1" />
                <div>
                  <h4 className="text-white font-bold text-sm mb-1 font-mono">// Cybersecurity Definition: IP Reputation Check</h4>
                  <p className="text-xs text-gray-400 leading-relaxed font-sans">
                    An IP reputation check is a security lookup action querying multiple blocklists, DNSBL/RBL servers, and BGP routing databases to retrieve and display the reputation parameters, ISP registration details, and threat metrics of a specific IP address.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-display font-bold mt-16 mb-6">How IP Reputation Works & How IP Blacklists Operate</h2>
            <p>
              IP reputation is calculated dynamically based on real-time network observations. Threat intelligence networks deploy distributed network sensors, honeypots, and spam traps to detect abnormal activities.
            </p>
            <p>
              When an IP address attempts to execute brute-force login attacks on an SSH port, queries open DNS resolvers, or transmits junk email to a spam trap, the telemetry is reported back to centralized threat databases. The reputation calculation uses several distinct telemetry inputs:
            </p>
            <ul>
              <li><strong>Active Threat Feeds:</strong> Immediate reports of malicious behavior, such as SQL injections, SSH brute-forcing, and port scans.</li>
              <li><strong>Email Spam Volume:</strong> Outgoing mail patterns that hit corporate spam traps or generate SPF/DKIM/DMARC authentication failures.</li>
              <li><strong>Network Context:</strong> The type of host. Residential IP addresses are treated differently from server hosting environments (ASNs) which are often utilized by command-and-control infrastructures.</li>
              <li><strong>Anonymizer Usage:</strong> Active status as a Tor exit node, commercial VPN endpoint, or open proxy gateway.</li>
            </ul>

            <div className="bg-surface-900 border-l-4 border-[#00ff88] p-6 my-8 not-prose">
              <h4 className="text-white font-bold text-sm mb-2 font-mono uppercase tracking-widest flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#00ff88]" /> Technical Fact Box: Blacklist Architecture
              </h4>
              <ul className="text-xs text-gray-400 space-y-2 font-mono">
                <li><strong>Query Protocol:</strong> Most blacklists run on <strong>DNSBL</strong> (DNS-based Blacklist) or <strong>RBL</strong> (Real-time Blacklist) protocols, querying reversing octets (e.g., querying <code>4.3.2.1.zen.spamhaus.org</code> for IP <code>1.2.3.4</code>).</li>
                <li><strong>Response Codes:</strong> Return codes in the <code>127.0.0.0/8</code> loopback range indicate blacklist categorization (e.g., <code>127.0.0.2</code> for spam, <code>127.0.0.4</code> for exploits).</li>
                <li><strong>TTL Values:</strong> Cache lifetimes are kept low (typically 300 seconds) to ensure that dynamically reassigned IPs are not blacklisted indefinitely.</li>
              </ul>
            </div>

            <h2 className="text-3xl font-display font-bold mt-16 mb-6">Understanding Abuse Scores & Risk Ratings</h2>
            <p>
              An <strong>Abuse Confidence Score</strong> is a percentage rating (from 0% to 100%) reflecting the mathematical probability that an IP address is actively engaged in malicious network behavior. A score of 0% indicates a clean IP with no reports, whereas a score of 100% signifies that multiple independent security databases have validated ongoing threat activity originating from the host within the last 24 to 48 hours.
            </p>

            <div className="bg-surface-900 border border-white/10 rounded-2xl p-6 my-6 not-prose">
              <div className="flex gap-4">
                <Info className="w-6 h-6 text-[#00ff88] shrink-0 mt-1" />
                <div>
                  <h4 className="text-white font-bold text-sm mb-1 font-mono">// Cybersecurity Definition: Abuse Score</h4>
                  <p className="text-xs text-gray-400 leading-relaxed font-sans">
                    An abuse score is a percentage confidence index indicating the likelihood that an IP is actively compromised or participating in spamming, hacking, scanning, or DDoS campaigns, derived mathematically from verified logs.
                  </p>
                </div>
              </div>
            </div>

            <p>
              Conversely, the <strong>IP Risk Score</strong> integrates static routing details with active threat intelligence. A hosting server IP located in a datacenter known for bulletproof hosting has a high baseline risk score, even if it has no active abuse reports. Conversely, residential dynamic IPs have low baseline scores, but their risk score spikes instantly when a spam campaign is detected.
            </p>

            <h2 className="text-3xl font-display font-bold mt-16 mb-6">ASN Intelligence & ISP Analysis</h2>
            <p>
              Autonomous System Numbers (ASNs) represent network groups managed by a single organization (ISP, university, or tech enterprise). Analyzing the ASN is vital because malicious actors often buy bulk subnets from cheap, lax providers to launch automated attack campaigns.
            </p>

            <div className="bg-surface-900 border border-white/10 rounded-2xl p-6 my-6 not-prose">
              <div className="flex gap-4">
                <Info className="w-6 h-6 text-[#00ff88] shrink-0 mt-1" />
                <div>
                  <h4 className="text-white font-bold text-sm mb-1 font-mono">// Cybersecurity Definition: ASN Reputation</h4>
                  <p className="text-xs text-gray-400 leading-relaxed font-sans">
                    ASN reputation represents the collective trustworthiness and security compliance level of a network operator’s subnets. It is calculated by measuring the ratio of blacklisted IP addresses to clean IP allocations within a specific Autonomous System Number.
                  </p>
                </div>
              </div>
            </div>

            <p>
              By resolving the ASN during an IP lookup, you can determine who has administrative control over the IP address. For instance, if an IP belongs to an ASN managed by a reliable tier-1 telecom company, the threat profile is significantly lower than an IP originating from an offshore hosting provider specialized in unmonitored infrastructure.
            </p>

            <h3 className="text-xl font-bold mt-8 mb-4">Datacenter vs. Residential vs. Mobile Connection Classes</h3>
            <p>
              Network connections fall into three primary blocks:
            </p>
            <ol>
              <li><strong>Datacenter/Hosting:</strong> Assigned to servers in facilities (e.g., AWS, DigitalOcean). High bandwidth and static nature make them ideal for botnets, but they are easily blocked.</li>
              <li><strong>Residential:</strong> Assigned to consumers by home ISPs. Highly trusted because blocking a residential IP blocks a real customer. Attackers abuse residential proxy services to bypass fraud filters.</li>
              <li><strong>Mobile:</strong> Assigned to cellular towers. IPs are shared among thousands of mobile devices using Carrier-Grade NAT (CGNAT), making blacklisting dangerous due to high collateral block rates.</li>
            </ol>

            <h2 className="text-3xl font-display font-bold mt-16 mb-6">Threat Intelligence Applications & Hunt Workflows</h2>
            <p>
              Threat intelligence leverages reputation data to secure corporate perimeters. Rather than waiting for an attack to occur, security teams dynamically feed blocklists into automated firewall scripts. In threat hunting, investigators cross-reference IP addresses found in security logs against reputation directories to isolate advanced persistent threats (APTs).
            </p>

            <div className="bg-surface-900 border border-white/10 rounded-2xl p-6 my-8 not-prose">
              <h4 className="text-white font-bold text-sm mb-4 font-mono uppercase tracking-widest flex items-center gap-2">
                <Target className="w-5 h-5 text-[#00ff88]" /> Step-by-Step Forensic IP Investigation Workflow
              </h4>
              <div className="relative border-l-2 border-white/10 pl-6 ml-3 space-y-6">
                <div>
                  <span className="absolute -left-[7px] w-3 h-3 rounded-full bg-[#00ff88]" />
                  <h5 className="text-white font-bold text-xs font-mono uppercase tracking-wider mb-1">01. Log Alert Isolation</h5>
                  <p className="text-xs text-gray-400">Extract the foreign IP from your SIEM or web application access logs indicating high error rates (e.g., excessive 401 logins).</p>
                </div>
                <div>
                  <span className="absolute -left-[7px] w-3 h-3 rounded-full bg-[#00ff88]" />
                  <h5 className="text-white font-bold text-xs font-mono uppercase tracking-wider mb-1">02. ASN & Geolocation Lookup</h5>
                  <p className="text-xs text-gray-400">Resolve the host's ASN. Identify if the connection originates from an unexpected country or datacenter block instead of your customer demographics.</p>
                </div>
                <div>
                  <span className="absolute -left-[7px] w-3 h-3 rounded-full bg-[#00ff88]" />
                  <h5 className="text-white font-bold text-xs font-mono uppercase tracking-wider mb-1">03. Blacklist & Abuse Verification</h5>
                  <p className="text-xs text-gray-400">Query RBLs to see if the IP is actively reported for scanning or spam. Check the Abuse Confidence Score to measure confirmation reliability.</p>
                </div>
                <div>
                  <span className="absolute -left-[7px] w-3 h-3 rounded-full bg-[#00ff88]" />
                  <h5 className="text-white font-bold text-xs font-mono uppercase tracking-wider mb-1">04. VPN & Proxy Checks</h5>
                  <p className="text-xs text-gray-400">Run routing tests to detect Tor nodes or VPN tunnels. Determine if the host is actively trying to anonymize their physical location.</p>
                </div>
                <div>
                  <span className="absolute -left-[7px] w-3 h-3 rounded-full bg-[#00ff88]" />
                  <h5 className="text-white font-bold text-xs font-mono uppercase tracking-wider mb-1">05. Policy Enforcement</h5>
                  <p className="text-xs text-gray-400">Apply rules: trigger multi-factor authentication (MFA) for residential proxies, block datacenters outright, or temporarily ban high-abuse IPs.</p>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-display font-bold mt-16 mb-6">VPN, Proxy, and Botnet Detection</h2>
            <p>
              To evade detection, attackers proxy their connections through multiple intermediate systems. A proxy detection checker monitors ports commonly left open for proxy routing (such as 8080, 1080, or 3128). Commercial VPN detection maps the subnets bought by major VPN firms (like NordVPN or ExpressVPN).
            </p>
            <p>
              Botnet detection looks for signs of device takeover. Compromised smart TVs, routers, and IP cameras form massive network clusters controlled by malware servers. When thousands of these devices coordinate, they can knock websites offline via Distributed Denial of Service (DDoS) campaigns.
            </p>

            <h2 className="text-3xl font-display font-bold mt-16 mb-6">Email Reputation & Deliverability</h2>
            <p>
              Email deliverability is entirely bound to the IP address reputation of your mail server. If the IP address you use to send newsletters gets blacklisted, receivers like Gmail and Outlook will reject your mail or place it in the spam folder.
            </p>
            <p>
              To protect email reputation, ensure your DNS contains correct SPF, DKIM, and DMARC verification records. Regularly audit sending server IPs to confirm that they have not been blacklisted due to server compromises or compromised user accounts sending mass spam messages.
            </p>

            <h2 className="text-3xl font-display font-bold mt-16 mb-6">Security Team Use Cases & SOAR Integration</h2>
            <p>
              For Security Operations Centers (SOCs), querying IP addresses manually is highly inefficient. Enterprise teams integrate reputation lookups directly into Security Orchestration, Automation, and Response (SOAR) workflows.
            </p>
            <p>
              When an alert is generated by an intrusion detection system (IDS), the SOAR automatically calls the IP reputation API, gathers threat intelligence metrics, and updates the local firewall policy to ban the IP address if it has an abuse confidence score exceeding 90%.
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
                    <td className="p-4 border-l border-white/10">Abuse score, Blacklists, VPN status, ASN context</td>
                    <td className="p-4 border-l border-white/10">Registrar details, expiry dates, status locks, RDAP JSON</td>
                    <td className="p-4 border-l border-white/10">A, AAAA, MX, TXT record allocations, DNSSEC chain</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-4 font-semibold text-white">Cybersecurity Use Case</td>
                    <td className="p-4 border-l border-white/10">Filtering malicious traffic, blocking attacks</td>
                    <td className="p-4 border-l border-white/10">Attribution, brand protection, takedowns, OSINT</td>
                    <td className="p-4 border-l border-white/10">SPF/DMARC auditing, DNS hijacking checks, routing</td>
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

            <h2 className="text-3xl font-display font-bold text-white mt-16 mb-6">Common Blacklists</h2>
            <p>
              There are hundreds of blocklists, but a few industry standards govern the web:
            </p>
            <ul>
              <li><strong>Spamhaus:</strong> The gold standard for email spam tracking. Highly authoritative blocklist.</li>
              <li><strong>AbuseIPDB:</strong> Crowdsourced database logging web hacks, SSH brute-forcing, and spam.</li>
              <li><strong>Barracuda Rep:</strong> Real-time lookup database tracking IP reputation for spam prevention.</li>
              <li><strong>CBL (Composite Blocking List):</strong> Automated blocklist tracking botnet malware infections.</li>
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
              Last Updated: June 2026 | Reviewed by ReconShield Editorial Board | Sources: IANA, RIRs, Spamhaus, AbuseIPDB, IETF RFC standards
            </div>
          </div>
        </section>

        {/* IP Intelligence Learning Center Section */}
        <section className="py-20 bg-[#0a0d14] border-t border-b border-white/5" aria-label="IP Intelligence Learning Center">
          <div className="max-w-[1000px] mx-auto px-6 font-sans">
            <h2 className="text-3xl font-display font-bold text-white mb-4 text-center">IP Intelligence Learning Center</h2>
            <p className="text-gray-400 text-sm text-center max-w-xl mx-auto mb-12 leading-relaxed">
              Understand the mechanics of IP mapping, Autonomous System routing, shadow IT exposures, and perimeter defense configurations.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "The Anatomy of Passive OSINT: Mapping Infrastructure Without Noise",
                  desc: "Learn how threat hunters map corporate footprints entirely through cached DNS, transparency logs, and global RIR registry databases.",
                  url: "/blog/anatomy-of-passive-osint",
                  time: "6 min read"
                },
                {
                  title: "Securing BGP Route Leaks: Why Large ASNs Fall Victim to Hijacking Campaigns",
                  desc: "Examine how Border Gateway Protocol routing errors redirect corporate subnets, and how to configure RPKI route verification.",
                  url: "/blog/securing-bgp-route-leaks",
                  time: "8 min read"
                },
                {
                  title: "Shadow IT Discovery: Passive Identification of Exposed Database and Administrative Ports",
                  desc: "Discover how to identify database consoles and RDP interfaces exposed to public search networks without triggering firewall alarms.",
                  url: "/blog/shadow-it-exposed-ports",
                  time: "7 min read"
                },
                {
                  title: "OSINT Fundamentals: The Building Blocks of Passive Information Gathering",
                  desc: "Learn the core techniques of passive data gathering, DNS record harvesting, and boundary footprint auditing.",
                  url: "/blog/osint-fundamentals",
                  time: "7 min read"
                }
              ].map((article, idx) => (
                <Link key={idx} href={article.url} className="p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-[#00ff88]/30 transition-all group flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-gray-500 mb-3">
                      <span className="flex items-center gap-1.5 text-[#00ff88]/80">
                        <BookOpen className="w-3.5 h-3.5" /> Technical Article
                      </span>
                      <span>{article.time}</span>
                    </div>
                    <h3 className="text-white font-bold text-base mb-2 group-hover:text-[#00ff88] transition-colors leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed mb-4">
                      {article.desc}
                    </p>
                  </div>
                  <span className="text-[#00ff88] text-xs font-mono flex items-center gap-1 mt-auto">
                    Read Article <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* IP Lookup Use Cases */}
        <section id="ip-use-cases" className="py-20 bg-[#05080f] border-b border-white/5">
          <div className="max-w-[1000px] mx-auto px-6 prose prose-invert max-w-none">
            <h2 className="text-3xl font-display font-bold text-white mb-6 text-center">IP Lookup Use Cases</h2>
            <p className="text-gray-400 text-sm text-center max-w-2xl mx-auto mb-12 leading-relaxed font-sans">
              Explore how security teams, email administrators, network engineers, and fraud prevention teams leverage IP location and threat data.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 not-prose">
              <div className="p-8 rounded-2xl bg-surface-900 border border-white/5 hover:border-[#00ff88]/20 transition-all">
                <h3 className="text-white font-bold text-lg mb-3 flex items-center gap-2 font-display">
                  <Shield className="w-5 h-5 text-[#00ff88]" />
                  1. For Security Teams &amp; SOC Analysts
                </h3>
                <p className="text-gray-400 text-xs leading-relaxed font-sans">
                  Security operations teams use IP lookup tools to investigate suspicious connections, analyze attack sources, and perform threat intelligence. Check IP reputation scores to identify malicious actors, verify blacklist status to detect compromised systems, and use geolocation data to flag unusual access patterns. Essential for incident response, security monitoring, log analysis, and identifying potential security breaches before they escalate.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-surface-900 border border-white/5 hover:border-[#00ff88]/20 transition-all">
                <h3 className="text-white font-bold text-lg mb-3 flex items-center gap-2 font-display">
                  <Send className="w-5 h-5 text-[#00ff88]" />
                  2. For Email Administrators &amp; Anti-Spam Teams
                </h3>
                <p className="text-gray-400 text-xs leading-relaxed font-sans">
                  Email administrators rely on IP lookup to troubleshoot email deliverability issues and prevent spam. Check if your mail server IP is blacklisted, verify sender IP reputation before accepting emails, and monitor your IP address reputation to maintain good email deliverability. Critical for preventing false positives in spam filters, maintaining sender reputation, and ensuring emails reach their intended recipients.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-surface-900 border border-white/5 hover:border-[#00ff88]/20 transition-all">
                <h3 className="text-white font-bold text-lg mb-3 flex items-center gap-2 font-display">
                  <Network className="w-5 h-5 text-[#00ff88]" />
                  3. For Network Engineers &amp; System Administrators
                </h3>
                <p className="text-gray-400 text-xs leading-relaxed font-sans">
                  Network engineers use IP lookup to troubleshoot connectivity issues, identify network abuse, and verify IP ownership. Check ISP information to route traffic efficiently, verify ASN data for BGP routing, and use geolocation for CDN optimization. Essential for network troubleshooting, capacity planning, traffic analysis, and identifying unauthorized network access or proxy usage.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-surface-900 border border-white/5 hover:border-[#00ff88]/20 transition-all">
                <h3 className="text-white font-bold text-lg mb-3 flex items-center gap-2 font-display">
                  <Users className="w-5 h-5 text-[#00ff88]" />
                  4. For Fraud Prevention &amp; E-commerce Security
                </h3>
                <p className="text-gray-400 text-xs leading-relaxed font-sans">
                  Fraud prevention teams use IP lookup to detect suspicious transactions, prevent account takeovers, and verify user locations. Check IP reputation to flag high-risk transactions, compare IP geolocation with billing addresses to detect fraud, and identify VPN/proxy usage that may indicate fraudulent activity. Critical for reducing chargebacks, preventing payment fraud, and protecting customer accounts from unauthorized access.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose ReconShield IP Lookup */}
        <section id="why-choose-reconshield" className="py-20 bg-[#0a0d14] border-b border-white/5">
          <div className="max-w-[1000px] mx-auto px-6 prose prose-invert max-w-none">
            <h2 className="text-3xl font-display font-bold text-white mb-6 text-center">Why Choose ReconShield IP Lookup?</h2>
            <p className="text-gray-400 text-sm text-center max-w-2xl mx-auto mb-12 leading-relaxed font-sans">
              Compare ReconShield's IP Geolocation &amp; Reputation Checker against industry alternatives to see why it is preferred for incident response.
            </p>

            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0d1117] not-prose my-8">
              <table className="w-full text-left text-sm text-gray-400 border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.02] text-white font-mono uppercase text-xs">
                    <th className="p-4">Feature</th>
                    <th className="p-4 border-l border-white/10 text-[#00ff88]">ReconShield</th>
                    <th className="p-4 border-l border-white/10">IPinfo.io</th>
                    <th className="p-4 border-l border-white/10">WhatIsMyIPAddress</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono text-xs">
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-4 font-semibold text-white">Free to Use</td>
                    <td className="p-4 border-l border-white/10 text-[#00ff88] font-bold">Yes (100% Free)</td>
                    <td className="p-4 border-l border-white/10">Limited (Paid tiers)</td>
                    <td className="p-4 border-l border-white/10">Yes (Ad-supported)</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-4 font-semibold text-white">No Registration Required</td>
                    <td className="p-4 border-l border-white/10 text-[#00ff88] font-bold">Yes</td>
                    <td className="p-4 border-l border-white/10">No (Token required)</td>
                    <td className="p-4 border-l border-white/10">Yes</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-4 font-semibold text-white">Geolocation Data</td>
                    <td className="p-4 border-l border-white/10 text-[#00ff88] font-bold">Yes (Detailed)</td>
                    <td className="p-4 border-l border-white/10">Yes</td>
                    <td className="p-4 border-l border-white/10">Yes</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-4 font-semibold text-white">Blacklist Checking</td>
                    <td className="p-4 border-l border-white/10 text-[#00ff88] font-bold">Yes (50+ Feeds)</td>
                    <td className="p-4 border-l border-white/10">No</td>
                    <td className="p-4 border-l border-white/10">Limited</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-4 font-semibold text-white">Reputation Scoring</td>
                    <td className="p-4 border-l border-white/10 text-[#00ff88] font-bold">Yes</td>
                    <td className="p-4 border-l border-white/10">No</td>
                    <td className="p-4 border-l border-white/10">No</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-4 font-semibold text-white">Threat Intelligence</td>
                    <td className="p-4 border-l border-white/10 text-[#00ff88] font-bold">Yes (Real-time)</td>
                    <td className="p-4 border-l border-white/10">Paid only</td>
                    <td className="p-4 border-l border-white/10">No</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-4 font-semibold text-white">IPv6 Support</td>
                    <td className="p-4 border-l border-white/10 text-[#00ff88] font-bold">Yes</td>
                    <td className="p-4 border-l border-white/10">Yes</td>
                    <td className="p-4 border-l border-white/10">Yes</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-4 font-semibold text-white">No Ads</td>
                    <td className="p-4 border-l border-white/10 text-[#00ff88] font-bold">Yes</td>
                    <td className="p-4 border-l border-white/10">Yes</td>
                    <td className="p-4 border-l border-white/10">No (Heavy Ads)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Frequently Asked Questions */}
        <section className="py-20 border-b border-white/5 bg-[#05080f]" aria-labelledby="faq-title">
          <div className="max-w-[900px] mx-auto px-6">
            <h2 id="faq-title" className="text-3xl font-display font-bold text-white mb-10 text-center">Frequently Asked Questions About IP Lookup</h2>
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

        {/* Semantic Internal Links (Section 8 - Internal Linking) */}
        <section className="py-20 bg-[#0a0d14]" aria-label="Related Security Tools">
          <div className="max-w-[1000px] mx-auto px-6">
            <h2 className="text-3xl font-display font-bold text-white mb-10 text-center">Related Security &amp; Network Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* WHOIS Lookup Link */}
              <Link href="/tools/whois" className="p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-[#00ff88]/30 transition-all group flex flex-col justify-between">
                <div>
                  <Globe className="w-8 h-8 text-[#00ff88] mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-white font-bold text-lg mb-2">WHOIS Lookup</h3>
                  <p className="text-xs text-gray-400 leading-relaxed mb-4">Analyze domain registration records, registrar details, ownership, and administrative locks using our WHOIS Lookup tool.</p>
                </div>
                <span className="text-[#00ff88] text-xs font-mono flex items-center gap-1 mt-auto">Run WHOIS Check <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform"/></span>
              </Link>

              {/* DNS Lookup Link */}
              <Link href="/tools/dns-lookup" className="p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-[#00ff88]/30 transition-all group flex flex-col justify-between">
                <div>
                  <Database className="w-8 h-8 text-[#00ff88] mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-white font-bold text-lg mb-2">DNS Lookup</h3>
                  <p className="text-xs text-gray-400 leading-relaxed mb-4">Resolve DNS configurations in real-time. Verify A, AAAA, MX, TXT, CNAME, and NS records instantly.</p>
                </div>
                <span className="text-[#00ff88] text-xs font-mono flex items-center gap-1 mt-auto">Run DNS Check <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform"/></span>
              </Link>

              {/* Subdomain Finder Link */}
              <Link href="/tools/subdomain-finder" className="p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-[#00ff88]/30 transition-all group flex flex-col justify-between">
                <div>
                  <Globe className="w-8 h-8 text-[#00ff88] mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-white font-bold text-lg mb-2">Subdomain Finder</h3>
                  <p className="text-xs text-gray-400 leading-relaxed mb-4">Discover public host records and expose shadow subdomains with our Subdomain Finder.</p>
                </div>
                <span className="text-[#00ff88] text-xs font-mono flex items-center gap-1 mt-auto">Find Subdomains <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform"/></span>
              </Link>

              {/* SSL Checker Link */}
              <Link href="/tools/ssl-checker" className="p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-[#00ff88]/30 transition-all group flex flex-col justify-between">
                <div>
                  <Shield className="w-8 h-8 text-[#00ff88] mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-white font-bold text-lg mb-2">SSL/TLS Checker</h3>
                  <p className="text-xs text-gray-400 leading-relaxed mb-4">Audit cryptographic validity, certificate expiry, and handshake errors using our SSL/TLS Checker.</p>
                </div>
                <span className="text-[#00ff88] text-xs font-mono flex items-center gap-1 mt-auto">Validate SSL <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform"/></span>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
