import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { 
  Shield, Globe, Server, Lock, Terminal, CheckCircle2, ChevronRight, 
  Search, Activity, Target, Network, Info, Check, AlertTriangle, 
  FileText, Send, HelpCircle, BookOpen, Key, Database, Clock, Zap
} from 'lucide-react';

const ToolScannerClient = dynamic(() => import('@/components/ToolScannerClient'), {
  loading: () => <div className="min-h-[400px] animate-pulse bg-surface-900/50 rounded-3xl max-w-5xl mx-auto my-12" />
});

export const metadata = {
  title: "Free Port Scanner - Check Open Ports Online | ReconShield",
  description: "Free online port scanner to check open ports on any server. Scan TCP/UDP ports, identify services, and detect security vulnerabilities instantly.",
  alternates: {
    canonical: "https://reconshield.in/tools/port-scanner",
  },
  keywords: [
    "port scanner", "port checker", "open port checker", "tcp port scan", "udp port scan",
    "network port scanner", "check open ports", "port scanning tool", "service detection", "firewall test"
  ],
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  openGraph: {
    title: "Free Port Scanner - Check Open Ports Online",
    description: "Free online port scanner to check open ports on any server. Scan TCP/UDP ports and identify security vulnerabilities.",
    url: "https://reconshield.in/tools/port-scanner",
    type: "website",
    siteName: "ReconShield",
    images: [
      {
        url: "https://reconshield.in/og-image-port.png",
        width: 1200,
        height: 630,
        alt: "Free Port Scanner - ReconShield"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Port Scanner - Check Open Ports Online",
    description: "Free online port scanner to check open ports. Scan TCP/UDP ports and identify security vulnerabilities.",
    images: ["https://reconshield.in/og-image-port.png"]
  },
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

export default function PortScannerPage() {
  const faqs = [
    {
      q: "What is a port scanner?",
      a: "A port scanner is a diagnostic networking tool used to probe a target host IP to check which communication ports are open and active. This helps security teams locate active services and assess potential access points in firewalls."
    },
    {
      q: "Is this port checker free to use?",
      a: "Yes. Our online port checker is 100% free to use for unlimited scans on any host or IP address, with no registration or signup required."
    },
    {
      q: "What ports should I scan?",
      a: "You should scan common network ports such as port 80 (HTTP), port 443 (HTTPS), port 22 (SSH), port 21 (FTP), port 25 (SMTP), and port 3389 (RDP) to identify exposed services and entry points."
    },
    {
      q: "How does port scanning work?",
      a: "Port scanning works by sending connection packets to specific target ports on an IP address. If the port responds with a SYN-ACK packet, it is classified as open. Closed ports return reset (RST) packets, and filtered ports indicate a firewall is blocking the traffic."
    },
    {
      q: "Is port scanning legal?",
      a: "Port scanning is legal when performed on your own networks, servers, or authorized targets for security audits. However, unauthorized scanning of external hosts without permission can be flagged as malicious or suspicious activity by security systems."
    },
    {
      q: "Why are open ports a security risk?",
      a: "Open ports are a security risk because they represent potential entry points into a system. If the service or application running on an open port is outdated, misconfigured, or has active software bugs, attackers can exploit it to gain unauthorized access."
    },
    {
      q: "Can I scan UDP ports?",
      a: "Yes. Our port scanner supports scanning both TCP and UDP ports to help security teams identify services like DNS (port 53), NTP (port 123), or SNMP (port 161) which run on connectionless protocols."
    },
    {
      q: "How do I protect against port scans?",
      a: "To protect against port scans, implement a default-deny firewall policy to block all unsolicited inbound traffic, close unused ports, configure rate limiting and intrusion detection systems (IDS), and audit public IPs regularly to check for exposures."
    }
  ];

  const breadcrumbs = [
    { name: "Home", url: "https://reconshield.in" },
    { name: "Tools", url: "https://reconshield.in/tools" },
    { name: "Port Scanner", url: "https://reconshield.in/tools/port-scanner" }
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
          "@id": "https://reconshield.in/tools/port-scanner#webpage",
          "url": "https://reconshield.in/tools/port-scanner",
          "name": "Free Port Scanner - Check Open Ports Online | ReconShield",
          "isPartOf": { "@id": "https://reconshield.in/#website" }
        },
        {
          "@type": "SoftwareApplication",
          "@id": "https://reconshield.in/tools/port-scanner#software",
          "name": "ReconShield Port Scanner",
          "url": "https://reconshield.in/tools/port-scanner",
          "description": "Free online port scanner to check open ports on any server. Scan TCP/UDP ports, identify services, and detect security vulnerabilities instantly.",
          "applicationCategory": "SecurityApplication",
          "operatingSystem": "Web Browser",
          "browserRequirements": "Requires JavaScript. Requires HTML5.",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.7",
            "ratingCount": "189",
            "bestRating": "5",
            "worstRating": "1"
          },
          "featureList": [
            "Free unlimited port scans",
            "TCP and UDP scanning",
            "Service detection",
            "Common port scanning",
            "Custom port ranges",
            "No registration required",
            "Fast scanning",
            "Security vulnerability detection"
          ],
          "publisher": { "@id": "https://reconshield.in/#organization" }
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://reconshield.in/tools/port-scanner#breadcrumb",
          "itemListElement": breadcrumbs.map((crumb, idx) => ({
            "@type": "ListItem",
            "position": idx + 1,
            "name": crumb.name,
            "item": crumb.url
          }))
        },
        {
          "@type": "TechArticle",
          "@id": "https://reconshield.in/tools/port-scanner#article",
          "headline": "The Technical Specification of Network Port Scanning, Socket Handshakes, and Perimeter Auditing",
          "description": "An in-depth analysis of TCP/IP handshakes, SYN/ACK packet structures, service banner grabbing, and firewall rule auditing.",
          "author": { "@type": "Person", "name": "Surendra Reddy" },
          "publisher": { "@id": "https://reconshield.in/#organization" },
          "url": "https://reconshield.in/tools/port-scanner",
          "isPartOf": { "@id": "https://reconshield.in/tools/port-scanner#webpage" }
        },
        {
          "@type": "HowTo",
          "@id": "https://reconshield.in/tools/port-scanner#howto",
          "name": "How to execute an online port scan",
          "description": "Check public ports on your firewall or server to detect exposed services.",
          "step": [
            { "@type": "HowToStep", "name": "Enter Target Host Details", "text": "Input the domain name or network IP address in the port scanner input box." },
            { "@type": "HowToStep", "name": "Execute Connection Probe", "text": "Click scan to launch socket handshakes on standard ports." },
            { "@type": "HowToStep", "name": "Review Open Port Exposure", "text": "Analyze the open, closed, or filtered states, and verify banner signatures." }
          ],
          "isPartOf": { "@id": "https://reconshield.in/tools/port-scanner#webpage" }
        },
        {
          "@type": "FAQPage",
          "@id": "https://reconshield.in/tools/port-scanner#faq",
          "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": { "@type": "Answer", "text": faq.a }
          })),
          "isPartOf": { "@id": "https://reconshield.in/tools/port-scanner#webpage" }
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
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-red-500/5 blur-[100px] rounded-full pointer-events-none -z-10" />
        
        <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-900 border border-white/10 text-gray-400 text-xs font-mono uppercase tracking-widest mb-6 shadow-sm">
            <Terminal className="w-4 h-4 text-red-400" />
            <span>Network Exposure Resolution Module</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 tracking-tight">
            Free Port Scanner - Check Open Ports Online
          </h1>
          
          <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed font-sans">
            Our <strong className="text-white font-semibold">free port scanner</strong> helps you check open ports on any server and identify potential security vulnerabilities instantly. Whether you're performing network security audits, verifying firewall configurations, or troubleshooting connectivity issues, this <strong className="text-white font-semibold">port checker</strong> scans TCP and UDP ports to reveal running services and exposed entry points. No registration required—simply enter an IP address or hostname to scan common ports or custom port ranges.
          </p>

          <div className="max-w-4xl mx-auto mb-12">
            <ToolScannerClient toolId="port-scanner" title="Port Scanner" desc="Test external network ports and services." />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-gray-500 uppercase tracking-widest">
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-red-400" /> TCP Connection Audits</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-red-400" /> Banner Grabbing</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-red-400" /> Firewall Rule Checks</div>
          </div>

          <div className="mt-8 max-w-2xl mx-auto p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl">
            <p className="text-orange-400 text-xs font-mono text-center flex flex-col md:flex-row items-center justify-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span><strong>AUTHORIZED USE ONLY:</strong> This tool is strictly for educational and defensive purposes. Only scan assets you own or have explicit authorization to test.</span>
            </p>
          </div>
        </div>
      </section>

      {/* AI Overview / Featured Snippet Optimization */}
      <section className="py-12 bg-[#05080f] border-b border-white/5" aria-label="AI Search Overview">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="bg-gradient-to-r from-red-500/5 to-orange-500/5 border border-red-500/10 rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 blur-[50px] rounded-full pointer-events-none" />
            
            {/* Definition Block: What Is a Port Scanner? */}
            <h2 className="font-mono text-xs text-red-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4 text-red-400" /> AI Overview Snippet: Network Port Audits
            </h2>
            <div className="space-y-6 text-sm text-gray-300 font-sans leading-relaxed">
              <div>
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Definition Block: What Is a Port Scanner?</span>
                <p className="text-gray-300">
                  A <strong>Port Scanner</strong> is a diagnostic networking tool used to probe a target host IP to check which communication ports are open and active. This allows security teams to identify available services, verify firewall rules, and discover open endpoints.
                </p>
              </div>

              {/* Definition Block: What Is an Open Port? */}
              <div className="border-t border-white/5 pt-4">
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Definition Block: What Is an Open Port?</span>
                <p className="text-gray-300">
                  An <strong>open port</strong> is a TCP/IP or UDP port configured to accept incoming network packets. If the listening software contains bugs, vulnerable code, or default credentials, attackers can exploit it to compromise the system.
                </p>
              </div>

              {/* Definition Block: How Port Scanning Works */}
              <div className="border-t border-white/5 pt-4">
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Definition Block: How Port Scanning Works</span>
                <p className="text-gray-300">
                  Port scanning sends packets to target ports and analyzes the response. An open port returns a handshake response (SYN-ACK in TCP), while closed ports return a reset packet (RST). Filtered ports indicate a firewall is dropping the traffic.
                </p>
              </div>

              {/* Definition Block: Why Open Ports Matter */}
              <div className="border-t border-white/5 pt-4">
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Definition Block: Why Open Ports Matter</span>
                <p className="text-gray-300">
                  Every open port represents a potential entry point for attackers. Identifying and securing exposed ports (like SSH, RDP, and database ports) reduces an organization's attack surface and prevents unauthorized network access.
                </p>
              </div>
              
              {/* TLDR Section & Key Takeaways */}
              <div className="border-t border-white/5 pt-4">
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// TL;DR Section</span>
                <p className="text-gray-400 text-xs font-mono">
                  Port scanners audit firewalls by checking TCP/UDP port states. Probing endpoints helps locate open paths, identify running applications, and prevent exploits on outdated or exposed service configurations.
                </p>
              </div>

              <div className="border-t border-white/5 pt-4">
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Key Takeaways</span>
                <ul className="list-disc pl-5 text-gray-400 text-xs space-y-2 font-mono">
                  <li><strong>Active Probing:</strong> TCP scans use three-way handshakes to verify if ports accept incoming connections.</li>
                  <li><strong>Port States:</strong> Ports are classified as Open (listening), Closed (not listening), or Filtered (blocked by firewall).</li>
                  <li><strong>Banner Grabbing:</strong> Exposes service versions, helping teams identify outdated software.</li>
                  <li><strong>Vulnerability Risks:</strong> Database and administrative ports should never be exposed to the public internet.</li>
                </ul>
              </div>

              {/* Fact Box: Most Common Network Ports */}
              <div className="border-t border-white/5 pt-4">
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Fact Box: Most Common Network Ports</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono text-gray-400 mt-2">
                  <div>
                    <span className="text-[10px] text-gray-600 uppercase block">Port 22:</span>
                    <span>SSH (Secure Remote Login)</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-600 uppercase block">Port 80:</span>
                    <span>HTTP (Unencrypted Web)</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-600 uppercase block">Port 443:</span>
                    <span>HTTPS (Encrypted Web)</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-600 uppercase block">Port 3389:</span>
                    <span>RDP (Remote Desktop)</span>
                  </div>
                </div>
              </div>

              {/* Expert Summary */}
              <div className="border-t border-white/5 pt-4">
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Expert Summary</span>
                <p className="text-gray-400 text-xs leading-relaxed font-sans">
                  Network port scanning is a fundamental task in vulnerability management. Probing public IPs helps security teams identify misconfigured firewalls, exposed administrative panels, and vulnerable services. Regular port audits are essential for maintaining a secure network perimeter.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5 — Feature Highlights */}
      <section className="py-20 bg-[#0a0d14] border-b border-white/5" aria-label="Why Use ReconShield's Port Scanner">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-display font-bold text-white mb-4 text-center">
            Why Use ReconShield's Port Scanner?
          </h2>
          <p className="text-gray-400 text-sm text-center max-w-xl mx-auto mb-12 leading-relaxed">
            ReconShield provides a robust, fast, and completely browser-based network port auditing engine to analyze your public-facing infrastructure.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-surface-900/50 border border-white/5 rounded-2xl hover:border-red-500/30 transition-all group">
              <Check className="w-8 h-8 text-[#00ff88] mb-4 group-hover:scale-110 transition-all" />
              <h3 className="text-white font-bold text-base mb-2">100% Free</h3>
              <p className="text-gray-400 text-xs leading-relaxed">Unlimited port scans with no hidden costs or subscription limits.</p>
            </div>
            <div className="p-6 bg-surface-900/50 border border-white/5 rounded-2xl hover:border-red-500/30 transition-all group">
              <Globe className="w-8 h-8 text-cyan-400 mb-4 group-hover:scale-110 transition-all" />
              <h3 className="text-white font-bold text-base mb-2">Web-Based</h3>
              <p className="text-gray-400 text-xs leading-relaxed">No software installations or local command-line client configuration required.</p>
            </div>
            <div className="p-6 bg-surface-900/50 border border-white/5 rounded-2xl hover:border-red-500/30 transition-all group">
              <Network className="w-8 h-8 text-purple-400 mb-4 group-hover:scale-110 transition-all" />
              <h3 className="text-white font-bold text-base mb-2">TCP & UDP Support</h3>
              <p className="text-gray-400 text-xs leading-relaxed">Probe both connection-oriented and stateless protocols for a complete scan.</p>
            </div>
            <div className="p-6 bg-surface-900/50 border border-white/5 rounded-2xl hover:border-red-500/30 transition-all group">
              <Target className="w-8 h-8 text-red-400 mb-4 group-hover:scale-110 transition-all" />
              <h3 className="text-white font-bold text-base mb-2">Common Ports</h3>
              <p className="text-gray-400 text-xs leading-relaxed">Run rapid checks against standard web, database, and administrative ports.</p>
            </div>
            <div className="p-6 bg-surface-900/50 border border-white/5 rounded-2xl hover:border-red-500/30 transition-all group">
              <Search className="w-8 h-8 text-orange-400 mb-4 group-hover:scale-110 transition-all" />
              <h3 className="text-white font-bold text-base mb-2">Custom Ranges</h3>
              <p className="text-gray-400 text-xs leading-relaxed">Specify target ranges to scan unique socket listening endpoints.</p>
            </div>
            <div className="p-6 bg-surface-900/50 border border-white/5 rounded-2xl hover:border-red-500/30 transition-all group">
              <Activity className="w-8 h-8 text-yellow-400 mb-4 group-hover:scale-110 transition-all" />
              <h3 className="text-white font-bold text-base mb-2">Service Detection</h3>
              <p className="text-gray-400 text-xs leading-relaxed">Identify underlying server applications and protocol configurations on open sockets.</p>
            </div>
            <div className="p-6 bg-surface-900/50 border border-white/5 rounded-2xl hover:border-red-500/30 transition-all group">
              <Zap className="w-8 h-8 text-[#00ff88] mb-4 group-hover:scale-110 transition-all" />
              <h3 className="text-white font-bold text-base mb-2">Fast Results</h3>
              <p className="text-gray-400 text-xs leading-relaxed">Leverage distributed cloud probes to receive detailed scan reports in seconds.</p>
            </div>
            <div className="p-6 bg-surface-900/50 border border-white/5 rounded-2xl hover:border-red-500/30 transition-all group">
              <Terminal className="w-8 h-8 text-gray-400 mb-4 group-hover:scale-110 transition-all" />
              <h3 className="text-white font-bold text-base mb-2">No Registration</h3>
              <p className="text-gray-400 text-xs leading-relaxed">Start auditing server IP networks instantly without submitting personal signups.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Educational Guide */}
      <div className="bg-[#05080f]">

        {/* Section 6 — Use Cases */}
        <section className="py-20 border-b border-white/5" aria-label="Port Scanner Use Cases">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-3xl font-display font-bold text-white mb-4 text-center">
              Port Scanner Use Cases
            </h2>
            <p className="text-gray-400 text-sm text-center max-w-xl mx-auto mb-12 leading-relaxed font-sans">
              Discover how different security, network, engineering, and compliance teams leverage online port checks to improve security postures.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 rounded-3xl bg-surface-900 border border-white/5">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2 font-display">
                  <Shield className="w-5 h-5 text-red-400" />
                  For Security Professionals &amp; Penetration Testers
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed font-sans">
                  Security professionals and penetration testers use port scanning during the initial reconnaissance phase of a security assessment. Probing active ports helps map the target network's external attack surface, identify listening services, and discover potential entry points for exploitation. Finding exposed ports enables security teams to identify vulnerabilities before threat actors can target them.
                </p>
              </div>
              <div className="p-8 rounded-3xl bg-surface-900 border border-white/5">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2 font-display">
                  <Network className="w-5 h-5 text-purple-400" />
                  For Network Administrators &amp; IT Teams
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed font-sans">
                  Network administrators and IT teams use port checkers to verify firewall rule implementations and ensure that security policies are correctly enforced. By running external port checks, network engineers can confirm that administrative ports (such as SSH, RDP, and database interfaces) are blocked from the public internet, preventing unauthorized connections and protecting internal assets.
                </p>
              </div>
              <div className="p-8 rounded-3xl bg-surface-900 border border-white/5">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2 font-display">
                  <Server className="w-5 h-5 text-cyan-400" />
                  For System Administrators &amp; DevOps Engineers
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed font-sans">
                  System administrators and DevOps engineers use port scanners to troubleshoot connectivity issues, verify service status, and audit server exposures. When deploying new services or configuring container routing, running a quick port check helps confirm that the service is listening on the correct port and is accessible to authorized clients, ensuring smooth application delivery.
                </p>
              </div>
              <div className="p-8 rounded-3xl bg-surface-900 border border-white/5">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2 font-display">
                  <FileText className="w-5 h-5 text-orange-400" />
                  For Compliance Officers &amp; Security Auditors
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed font-sans">
                  Compliance officers and security auditors leverage port scanning tools to verify regulatory compliance with industry standards such as PCI-DSS, SOC 2, and ISO 27001. These security frameworks require continuous monitoring of external network boundaries and regular vulnerability scans to verify that no unauthorized services or legacy protocols are exposed to public networks.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7 — Comparison Table */}
        <section className="py-20 border-b border-white/5 bg-[#0a0d14]">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-3xl font-display font-bold text-white mb-4 text-center">
              Why Choose ReconShield Port Scanner?
            </h2>
            <p className="text-gray-400 text-sm text-center max-w-xl mx-auto mb-12 leading-relaxed font-sans">
              Compare ReconShield's online utility with traditional command-line utilities and generic scanners.
            </p>
            <div className="overflow-x-auto rounded-3xl border border-white/10 bg-[#0d1117] my-8 shadow-xl">
              <table className="w-full text-left text-sm text-gray-400 border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.02] text-white font-mono uppercase text-xs">
                    <th className="p-5">Feature</th>
                    <th className="p-5 border-l border-white/10 text-[#00ff88]">ReconShield</th>
                    <th className="p-5 border-l border-white/10">Nmap (CLI)</th>
                    <th className="p-5 border-l border-white/10">Online Port Scanners</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono text-xs">
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-5 text-white font-semibold font-sans">Web-Based</td>
                    <td className="p-5 border-l border-white/10 text-[#00ff88] font-bold">Yes</td>
                    <td className="p-5 border-l border-white/10 text-red-500 font-bold">No</td>
                    <td className="p-5 border-l border-white/10 text-[#00ff88] font-bold">Yes</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-5 text-white font-semibold font-sans">No Installation Required</td>
                    <td className="p-5 border-l border-white/10 text-[#00ff88] font-bold">Yes</td>
                    <td className="p-5 border-l border-white/10 text-red-500 font-bold">No</td>
                    <td className="p-5 border-l border-white/10 text-[#00ff88] font-bold">Yes</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-5 text-white font-semibold font-sans">Free to Use</td>
                    <td className="p-5 border-l border-white/10 text-[#00ff88] font-bold">Yes (Unlimited)</td>
                    <td className="p-5 border-l border-white/10 text-[#00ff88] font-bold">Yes</td>
                    <td className="p-5 border-l border-white/10 text-yellow-500 font-bold">Limited</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-5 text-white font-semibold font-sans">TCP Port Scanning</td>
                    <td className="p-5 border-l border-white/10 text-[#00ff88] font-bold">Yes</td>
                    <td className="p-5 border-l border-white/10 text-[#00ff88] font-bold">Yes</td>
                    <td className="p-5 border-l border-white/10 text-[#00ff88] font-bold">Yes</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-5 text-white font-semibold font-sans">UDP Port Scanning</td>
                    <td className="p-5 border-l border-white/10 text-[#00ff88] font-bold">Yes</td>
                    <td className="p-5 border-l border-white/10 text-[#00ff88] font-bold">Yes</td>
                    <td className="p-5 border-l border-white/10 text-yellow-500 font-bold">Limited</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-5 text-white font-semibold font-sans">Service Detection</td>
                    <td className="p-5 border-l border-white/10 text-[#00ff88] font-bold">Yes</td>
                    <td className="p-5 border-l border-white/10 text-[#00ff88] font-bold">Yes</td>
                    <td className="p-5 border-l border-white/10 text-red-500 font-bold">No</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-5 text-white font-semibold font-sans">User-Friendly</td>
                    <td className="p-5 border-l border-white/10 text-[#00ff88] font-bold">Yes</td>
                    <td className="p-5 border-l border-white/10 text-red-500 font-bold">No</td>
                    <td className="p-5 border-l border-white/10 text-[#00ff88] font-bold">Yes</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-5 text-white font-semibold font-sans">No Registration</td>
                    <td className="p-5 border-l border-white/10 text-[#00ff88] font-bold">Yes</td>
                    <td className="p-5 border-l border-white/10 text-[#00ff88] font-bold">Yes</td>
                    <td className="p-5 border-l border-white/10 text-red-500 font-bold">No</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
        
        {/* H2: What Is a Port Scanner? */}
        <section className="py-20 border-b border-white/5">
          <div className="max-w-[1000px] mx-auto px-6 prose prose-invert max-w-none prose-p:leading-relaxed prose-p:text-gray-400 prose-headings:text-white prose-a:text-red-400 hover:prose-a:text-red-300">
            
            <h2 className="text-3xl font-display font-bold mt-0 mb-6 flex items-center gap-3">
              <Server className="w-8 h-8 text-red-400" />
              What Is a Port Scanner?
            </h2>
            <p>
              A <strong>Port Scanner</strong> is a diagnostic security utility used to identify active communication channels on a target IP address. By probing TCP and UDP ports, the scanner determines which ports are open, closed, or blocked by firewalls, mapping the host's exposed network footprint.
            </p>

            {/* H2: How Port Scanning Works */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">How Port Scanning Works</h2>
            <p>
              Port scanning relies on the mechanics of the TCP/IP stack:
            </p>
            <ul>
              <li><strong>TCP Scans:</strong> The scanner sends connection packets (like SYN) to a target port. If the port responds with a SYN-ACK, it is open. A RST response indicates it is closed, and no response suggests a firewall is filtering the traffic.</li>
              <li><strong>UDP Scans:</strong> Because UDP is connectionless, these scans are slower and less reliable. The scanner sends UDP packets; if a port is closed, it may return an ICMP destination unreachable message.</li>
            </ul>

            {/* H2: What Is an Open Port? */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">What Is an Open Port?</h2>
            <p>
              An <strong>open port</strong> is a TCP or UDP port configured to accept incoming network connections. It is managed by a listening application, such as a web server on port 443 or an SSH server on port 22. If these applications contain software bugs or use default configurations, they can be targeted by attackers.
            </p>

            {/* H2: How to Check Open Ports */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">How to Check Open Ports</h2>
            <p>
              You can audit your external network perimeter using the ReconShield Port Scanner:
            </p>
            <ol>
              <li>Input the target domain name or network IP address in the input field above.</li>
              <li>Click the scan button to launch connection handshakes on standard ports.</li>
              <li>Review the results to verify open ports, closed ports, and service banners.</li>
            </ol>

            {/* H2: Common Open Ports */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">Common Open Ports</h2>
            <p>
              Standard TCP ports are assigned to specific services to ensure consistent network communication:
            </p>
            <ul>
              <li><strong>Port 21 (FTP):</strong> An unencrypted file transfer protocol, now mostly replaced by SFTP on port 22.</li>
              <li><strong>Port 22 (SSH):</strong> Secure Shell for remote command line access.</li>
              <li><strong>Port 25 (SMTP):</strong> Used to route email traffic between mail servers.</li>
              <li><strong>Port 80 (HTTP):</strong> Plaintext web traffic, commonly redirected to port 443.</li>
              <li><strong>Port 443 (HTTPS):</strong> Secure, SSL/TLS-encrypted web traffic.</li>
              <li><strong>Port 3389 (RDP):</strong> Microsoft Remote Desktop Protocol, a common target for brute-force attacks if exposed.</li>
            </ul>

            {/* H2: Common UDP Ports Explained */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">Common UDP Ports Explained</h2>
            <p>
              UDP ports are used for services that prioritize speed over reliability:
            </p>
            <ul>
              <li><strong>Port 53 (DNS):</strong> Handles domain name queries.</li>
              <li><strong>Port 67/68 (DHCP):</strong> Manages dynamic IP address assignment on local networks.</li>
              <li><strong>Port 123 (NTP):</strong> Syncs system clocks across network servers.</li>
              <li><strong>Port 161 (SNMP):</strong> Used to monitor and manage network devices.</li>
            </ul>

            {/* H2: TCP vs UDP Ports */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">TCP vs UDP Ports</h2>
            <p>
              While similar, port scanners and vulnerability scanners serve different purposes:
            </p>
            <ul>
              <li><strong>Port Scanner:</strong> Maps active ports and identifies running services. It acts as a mapping tool to define your network perimeter.</li>
              <li><strong>Vulnerability Scanner:</strong> Probes discovered services for known vulnerabilities, misconfigurations, and outdated software versions, providing a more detailed security assessment.</li>
            </ul>

            {/* H2: How Security Teams Use Port Scanners */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">How Security Teams Use Port Scanners</h2>
            <p>
              Security teams use port scanners to audit firewalls, verify that only authorized services are accessible, and identify unauthorized ports opened by shadow IT or malware.
            </p>

            {/* H2: Port Scanning for Attack Surface Management */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">Port Scanning for Attack Surface Management</h2>
            <p>
              Attack surface management requires continuous visibility into public-facing assets. Regular port scans help organizations detect exposed database ports, staging interfaces, and administrative portals before they can be targeted.
            </p>

            {/* H2: Port Scanning for Penetration Testing */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">Port Scanning for Penetration Testing</h2>
            <p>
              In penetration testing, port scanning is a critical initial reconnaissance step. It helps testers map the target network, identify active services, and locate potential access points for exploitation.
            </p>

            {/* H2: Service Detection and Banner Analysis */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">Service Detection and Banner Analysis</h2>
            <p>
              **Banner grabbing** reads the initial text greeting returned by a network port. This response often leaks the software name, version, and server operating system, allowing administrators to audit software exposure.
            </p>

            {/* H2: Network Exposure Risks */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">Network Exposure Risks</h2>
            <p>
              Exposing ports to the public internet increases the risk of unauthorized access. Services like SSH, SMB, and database engines should be restricted to private VPN networks to prevent brute-force attacks and exploit attempts.
            </p>

            {/* H2: Common Open Port Security Issues */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">Common Open Port Security Issues</h2>
            <p>
              Common security issues discovered during port audits include:
            </p>
            <ul>
              <li>Administrative portals (RDP, VNC) exposed to the public internet.</li>
              <li>Cleartext protocols (FTP, Telnet) transmitting sensitive data.</li>
              <li>Outdated database versions listening on default ports.</li>
            </ul>

            {/* H2: Firewall and Port Security Best Practices */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">Firewall and Port Security Best Practices</h2>
            <p>
              Secure your network perimeter by implementing these best practices:
            </p>
            <ul>
              <li>Enforce a default-deny inbound firewall policy, blocking all unsolicited traffic.</li>
              <li>Configure intrusion detection systems (IDS) to monitor for scan sweeps.</li>
              <li>Configure administrative services to use non-default ports or restrict access to trusted IP ranges.</li>
              <li>Audit public-facing IPs regularly to verify firewall configurations.</li>
            </ul>

            {/* H2: How to Investigate Open Ports Safely */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">How to Investigate Open Ports Safely</h2>
            <p>
              When investigating open ports, always use authorized, passive scanning tools. Avoid running aggressive active scans against systems you do not own, as this can trigger network security alerts and be classified as malicious activity.
            </p>

          </div>
        </section>

        {/* Port Matrix Table */}
        <section className="py-20 bg-[#0a0d14] border-b border-white/5">
          <div className="max-w-[1000px] mx-auto px-6 prose prose-invert max-w-none">
            <h2 className="text-3xl font-display font-bold text-white mb-6">Common Port Assignments & Threat Risks</h2>
            <p className="text-gray-400 mb-8">
              Verify standard port assignments and understand the risks associated with exposing them:
            </p>

            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0d1117] not-prose my-8">
              <table className="w-full text-left text-sm text-gray-400 border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.02] text-white font-mono uppercase text-xs">
                    <th className="p-4">Port Number</th>
                    <th className="p-4 border-l border-white/10">Default Protocol</th>
                    <th className="p-4 border-l border-white/10">Transport Type</th>
                    <th className="p-4 border-l border-white/10">Exposure Threat Level</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono text-xs">
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-4 font-semibold text-white">21</td>
                    <td className="p-4 border-l border-white/10">FTP</td>
                    <td className="p-4 border-l border-white/10">TCP</td>
                    <td className="p-4 border-l border-white/10 text-red-500 font-bold">High (Cleartext credentials)</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-4 font-semibold text-white">22</td>
                    <td className="p-4 border-l border-white/10">SSH</td>
                    <td className="p-4 border-l border-white/10">TCP</td>
                    <td className="p-4 border-l border-white/10 text-yellow-500 font-bold">Medium (Brute-force target)</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-4 font-semibold text-white">23</td>
                    <td className="p-4 border-l border-white/10">Telnet</td>
                    <td className="p-4 border-l border-white/10">TCP</td>
                    <td className="p-4 border-l border-white/10 text-red-500 font-bold">High (Obsolete protocol)</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-4 font-semibold text-white">80</td>
                    <td className="p-4 border-l border-white/10">HTTP</td>
                    <td className="p-4 border-l border-white/10">TCP</td>
                    <td className="p-4 border-l border-white/10 text-yellow-500 font-bold">Medium (Should redirect to 443)</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-4 font-semibold text-white">443</td>
                    <td className="p-4 border-l border-white/10">HTTPS</td>
                    <td className="p-4 border-l border-white/10">TCP</td>
                    <td className="p-4 border-l border-white/10 text-[#00ff88]">Low (Standard Web Transport)</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-4 font-semibold text-white">3389</td>
                    <td className="p-4 border-l border-white/10">RDP</td>
                    <td className="p-4 border-l border-white/10">TCP</td>
                    <td className="p-4 border-l border-white/10 text-red-500 font-bold">Critical (Exploit vulnerability)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* E-E-A-T section (Phase 9) */}
        <section className="py-20 border-b border-white/5">
          <div className="max-w-[1000px] mx-auto px-6">
            
            <div className="flex flex-col md:flex-row items-center gap-8 p-8 bg-gradient-to-r from-[#0d1117] to-surface-900 border border-white/10 rounded-3xl shadow-xl mb-16 font-sans">
              <div className="w-24 h-24 rounded-full bg-[#1a2332] border-2 border-red-500/30 flex items-center justify-center shrink-0 overflow-hidden">
                <Shield className="w-10 h-10 text-red-400" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 px-2 py-1 rounded bg-red-500/10 text-red-400 text-[10px] font-mono uppercase tracking-widest mb-2">
                  <Check className="w-3 h-3" /> Fact Checked & Verified
                </div>
                <h4 className="text-white font-bold text-xl mb-1">Surendra Reddy</h4>
                <p className="text-gray-400 text-xs font-mono uppercase tracking-wider mb-3">Cybersecurity Researcher & Founder, ReconShield</p>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  Surendra is an information security analyst specializing in network perimeter exposure, firewall auditing, and OSINT vulnerability scanning. He designed ReconShield to help users test their public-facing server ports.
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
                  Our findings are derived from RFC protocol documentation, CA/Browser Forum standards, and verified cybersecurity databases. We avoid speculative telemetry, prioritizing primary sources and verifiable network actions.
                </p>
              </div>
              <div>
                <h5 className="text-white font-bold mb-3 uppercase tracking-wider font-mono">Fact Checking Process</h5>
                <p className="leading-relaxed">
                  Information is verified against active TLS servers, registrar configurations, and IETF specifications (including RFCs and CA/B guidelines). Each section is tested for technical accuracy under modern browser routing environments.
                </p>
              </div>
            </div>

            <div className="text-center text-[10px] font-mono text-gray-600 uppercase tracking-widest mt-12">
              Last Updated: June 2026 | Reviewed by ReconShield Technical Board | Reference: NIST, CISA, OWASP, MITRE ATT&CK, IETF Network Standards
            </div>
          </div>
        </section>

        {/* Port Scanning Learning Center Section */}
        <section className="py-20 bg-[#0a0d14] border-t border-b border-white/5" aria-label="Port Scanning Learning Center">
          <div className="max-w-[1000px] mx-auto px-6 font-sans">
            <h2 className="text-3xl font-display font-bold text-white mb-4 text-center">Port Scanning Learning Center</h2>
            <p className="text-gray-400 text-sm text-center max-w-xl mx-auto mb-12 leading-relaxed">
              Master the methodology of network port checks, active vs passive reconnaissance, shadow IT discovery, and attack surface mapping.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Shadow IT Discovery: Passive Identification of Exposed Database and Administrative Ports",
                  desc: "Learn how employees leave critical databases and SSH/RDP administration panels exposed, and how to scan them safely.",
                  url: "/blog/shadow-it-exposed-ports",
                  time: "7 min read"
                },
                {
                  title: "The Anatomy of Passive OSINT: Mapping Infrastructure Without Noise",
                  desc: "Examine how attackers compile targets through cached recursive DNS records and RIR indexes before running active port checks.",
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
                  title: "OSINT Fundamentals: The Building Blocks of Passive Information Gathering",
                  desc: "Compare active port probing against passive public caches to protect your investigator metadata during recon.",
                  url: "/blog/osint-fundamentals",
                  time: "7 min read"
                }
              ].map((article, idx) => (
                <Link key={idx} href={article.url} className="p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-red-500/30 transition-all group flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-gray-500 mb-3">
                      <span className="flex items-center gap-1.5 text-red-400/80">
                        <BookOpen className="w-3.5 h-3.5" /> Technical Guide
                      </span>
                      <span>{article.time}</span>
                    </div>
                    <h3 className="text-white font-bold text-base mb-2 group-hover:text-red-400 transition-colors leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed mb-4">
                      {article.desc}
                    </p>
                  </div>
                  <span className="text-red-400 text-xs font-mono flex items-center gap-1 mt-auto">
                    Read Article <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Semantic Internal Links (Phase 7 - Internal Linking) */}
        <section className="py-20 bg-[#05080f]" aria-label="Related Network Security Tools">
          <div className="max-w-[1000px] mx-auto px-6">
            <h2 className="text-3xl font-display font-bold text-white mb-10 text-center">Related Network Security Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* IP Lookup Link */}
              <Link href="/tools/ip-lookup" className="p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-purple-500/30 transition-all group flex flex-col justify-between">
                <div>
                  <Network className="w-8 h-8 text-purple-400 mb-4 group-hover:scale-110 transition-transform" />
                  <h4 className="text-white font-bold text-lg mb-2">IP Lookup</h4>
                  <p className="text-xs text-gray-400 leading-relaxed mb-4">Analyze host location, reputation, threat intelligence data, and ISP details using our free IP Lookup tool.</p>
                </div>
                <span className="text-purple-400 text-xs font-mono flex items-center gap-1 mt-auto">Run IP Scan <ChevronRight className="w-3 h-3"/></span>
              </Link>

              {/* Subdomain Finder Link */}
              <Link href="/tools/subdomain-finder" className="p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-orange-500/30 transition-all group flex flex-col justify-between">
                <div>
                  <Terminal className="w-8 h-8 text-orange-400 mb-4 group-hover:scale-110 transition-transform" />
                  <h4 className="text-white font-bold text-lg mb-2">Subdomain Finder</h4>
                  <p className="text-xs text-gray-400 leading-relaxed mb-4">Discover public namespaces, staging servers, and external subdomains using our Subdomain Finder.</p>
                </div>
                <span className="text-orange-400 text-xs font-mono flex items-center gap-1 mt-auto">Find Subdomains <ChevronRight className="w-3 h-3"/></span>
              </Link>

              {/* DNS Lookup Link */}
              <Link href="/tools/dns-lookup" className="p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-orange-500/30 transition-all group flex flex-col justify-between">
                <div>
                  <Database className="w-8 h-8 text-orange-400 mb-4 group-hover:scale-110 transition-transform" />
                  <h4 className="text-white font-bold text-lg mb-2">DNS Lookup</h4>
                  <p className="text-xs text-gray-400 leading-relaxed mb-4">Query and verify MX, TXT, A, and nameserver records using our authoritative DNS Lookup checker.</p>
                </div>
                <span className="text-orange-400 text-xs font-mono flex items-center gap-1 mt-auto">Audit DNS Records <ChevronRight className="w-3 h-3"/></span>
              </Link>

              {/* WHOIS Lookup Link */}
              <Link href="/tools/whois" className="p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-cyan-500/30 transition-all group flex flex-col justify-between">
                <div>
                  <Globe className="w-8 h-8 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
                  <h4 className="text-white font-bold text-lg mb-2">WHOIS Lookup</h4>
                  <p className="text-xs text-gray-400 leading-relaxed mb-4">Examine domain ownership history, expiry timelines, registrar details, and administrative lock flags.</p>
                </div>
                <span className="text-cyan-400 text-xs font-mono flex items-center gap-1 mt-auto">Run WHOIS Check <ChevronRight className="w-3 h-3"/></span>
              </Link>
              
            </div>
          </div>
        </section>
 
        {/* FAQ Section */}
        <section className="py-20 border-t border-white/5 bg-[#0a0d14]" aria-labelledby="faq-title">
          <div className="max-w-[900px] mx-auto px-6">
            <h2 id="faq-title" className="text-3xl font-display font-bold text-white mb-10 text-center">Frequently Asked Questions About Port Scanning</h2>
            <div className="grid grid-cols-1 gap-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-surface-900 border border-white/10 rounded-2xl p-6 hover:border-red-500/20 transition-all">
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
