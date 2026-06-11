import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { 
  Shield, Globe, Server, Lock, Terminal, CheckCircle2, ChevronRight, 
  Search, Activity, Target, Network, Info, Check, AlertTriangle, 
  FileText, Send, HelpCircle, BookOpen, Key, Database, Clock
} from 'lucide-react';
import { generateBaseMetadata } from '@/utils/metadata';

const ToolScannerClient = dynamic(() => import('@/components/ToolScannerClient'), {
  loading: () => <div className="min-h-[400px] animate-pulse bg-surface-900/50 rounded-3xl max-w-5xl mx-auto my-12" />
});

export const metadata = generateBaseMetadata({
  title: "Online Port Checker Tool | Check Open Ports Online",
  description: "Scan open ports on any server using our free online port checker tool. Test firewalls, discover listening network services, and identify security exposures.",
  path: "/tools/port-scanner"
});

export default function PortScannerPage() {
  const faqs = [
    {
      q: "What is a port scanner?",
      a: "A port scanner is a diagnostic networking tool used to probe a target host IP to check which communication ports are open and active. This helps security teams locate active services and assess potential access points in firewalls."
    },
    {
      q: "How do I check open ports?",
      a: "You can check open ports by inputting a domain name or IP address into the ReconShield online port scanner. The engine will initiate a TCP handshake test on common target ports to report their connection status instantly."
    },
    {
      q: "What ports should be open?",
      a: "Only ports hosting public services should be open. Standard web servers typically open port 80 for HTTP and port 443 for secure HTTPS. All administrative ports like SSH (22) and RDP (3389) should remain closed to the public."
    },
    {
      q: "What is TCP vs UDP?",
      a: "TCP is a connection-oriented protocol that requires a three-way handshake to establish reliable communication. UDP is a stateless, connectionless protocol that sends packets without verifying receipt, often used for DNS, streaming, and fast service lookups."
    },
    {
      q: "What is banner grabbing?",
      a: "Banner grabbing is a reconnaissance technique that retrieves the initial text greeting returned by a network port. This response often leaks the software name, version, and server operating system, allowing administrators to audit software exposure."
    },
    {
      q: "What is service detection?",
      a: "Service detection analyzes the behavior and banner data of an open port to identify the specific application protocol and version running on it, helping security teams find vulnerable server software."
    },
    {
      q: "Are open ports dangerous?",
      a: "Open ports are not inherently dangerous, but they act as open entryways. If the software listening on an open port is outdated, misconfigured, or contains unpatched vulnerabilities, it can be exploited by threat actors."
    },
    {
      q: "What does a filtered port state mean?",
      a: "A filtered port state indicates that a firewall, router access control list, or security software is blocking the connection packets, preventing the scanner from determining if the port is open or closed."
    },
    {
      q: "How does Nmap differ from online port checkers?",
      a: "Nmap is a command-line utility for advanced internal and external network scans with multiple scan modes. Online port checkers run passive, browser-initiated connection checks against public IPs without requiring software installation."
    },
    {
      q: "Why should database ports be blocked from the public?",
      a: "Database ports like 3306 (MySQL) and 5432 (PostgreSQL) contain sensitive data. Leaving them publicly accessible invites brute-force attacks and exploit attempts, so they should be restricted to private VPN networks."
    },
    {
      q: "What is a SYN scan?",
      a: "A SYN scan, or half-open scan, sends a SYN packet to target ports. If it receives a SYN-ACK, the port is open, but the scanner sends a RST packet to close the connection before the handshake completes."
    },
    {
      q: "How does IP reputation affect port scanning?",
      a: "Scanners trace IP networks to log exposed services. If your host exhibits many open, vulnerable administrative ports, threat databases will lower its IP reputation score, flagging it as an active risk."
    },
    {
      q: "How do firewalls secure network ports?",
      a: "Firewalls secure network ports by enforcing access control lists. They block all unsolicited inbound traffic to closed ports while logging and inspecting connections to authorized open services."
    },
    {
      q: "What is port knocking?",
      a: "Port knocking is a security method that keeps ports closed until a client sends a specific sequence of connection attempts (knocks) to pre-designated ports, opening the target port dynamically."
    },
    {
      q: "How do I close open ports?",
      a: "To close an open port, stop the service listening on it (such as disabling FTP or database server tasks) or add a firewall rule that blocks inbound TCP/UDP traffic to that port number."
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
          "name": "Port Scanner Tool (Free) | Check Open Ports Online",
          "isPartOf": { "@id": "https://reconshield.in/#website" }
        },
        {
          "@type": "SoftwareApplication",
          "@id": "https://reconshield.in/tools/port-scanner#software",
          "name": "ReconShield Port Scanner Engine",
          "url": "https://reconshield.in/tools/port-scanner",
          "description": "Free port auditing application designed to test open TCP ports, execute banner grabbing diagnostics, and analyze host vulnerability exposure.",
          "applicationCategory": "SecurityApplication",
          "operatingSystem": "All",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "publisher": { "@id": "https://reconshield.in/#organization" }
        },
        {
          "@type": "WebApplication",
          "@id": "https://reconshield.in/tools/port-scanner#webapp",
          "name": "ReconShield Port Checker App",
          "url": "https://reconshield.in/tools/port-scanner",
          "description": "Probe network IP addresses to identify listening services, verify firewalls, and check open TCP endpoints.",
          "applicationCategory": "SecurityApplication",
          "operatingSystem": "All",
          "browserRequirements": "Requires JavaScript. Requires HTML5.",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
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
            Online Port Checker Tool
          </h1>
          
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed font-sans">
            Scan open ports and test firewall rules in real-time. Identify running network services, extract banner signatures, and evaluate external threat surfaces.
          </p>

          <div className="max-w-4xl mx-auto mb-12">
            <ToolScannerClient toolId="port-scanner" title="Port Scanner" desc="Test external network ports and services." />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-gray-500 uppercase tracking-widest">
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-red-400" /> TCP Connection Audits</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-red-400" /> Banner Grabbing</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-red-400" /> Firewall Rule Checks</div>
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

      {/* Feature Differentiation Grid */}
      <section className="py-16 bg-[#0a0d14] border-b border-white/5" aria-label="Feature Differentiation">
        <div className="max-w-[1000px] mx-auto px-6">
          <h2 className="text-2xl font-display font-bold text-white mb-8 text-center">ReconShield Port Scanner Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 not-prose">
            <div className="p-5 bg-surface-900 border border-white/5 rounded-2xl">
              <Shield className="w-6 h-6 text-red-400 mb-3" />
              <h4 className="text-white text-xs font-bold font-mono uppercase tracking-wider mb-2">Exposure Risk Score</h4>
              <p className="text-gray-400 text-[11px] leading-relaxed">Calculates an overall threat rating based on the number and type of open ports discovered on the host.</p>
            </div>
            <div className="p-5 bg-surface-900 border border-white/5 rounded-2xl">
              <Clock className="w-6 h-6 text-red-400 mb-3" />
              <h4 className="text-white text-xs font-bold font-mono uppercase tracking-wider mb-2">Banner Intelligence</h4>
              <p className="text-gray-400 text-[11px] leading-relaxed">Extracts and parses service greetings to identify application versions and flag outdated software.</p>
            </div>
            <div className="p-5 bg-surface-900 border border-white/5 rounded-2xl">
              <Activity className="w-6 h-6 text-red-400 mb-3" />
              <h4 className="text-white text-xs font-bold font-mono uppercase tracking-wider mb-2">Port Security Grade</h4>
              <p className="text-gray-400 text-[11px] leading-relaxed">Assigns a security grade based on compliance standards, checking for exposed admin databases or cleartext services.</p>
            </div>
            <div className="p-5 bg-surface-900 border border-white/5 rounded-2xl">
              <Terminal className="w-6 h-6 text-red-400 mb-3" />
              <h4 className="text-white text-xs font-bold font-mono uppercase tracking-wider mb-2">Historical Tracking</h4>
              <p className="text-gray-400 text-[11px] leading-relaxed">Monitors port state changes over time, alerting you when new ports are opened on audited IP ranges.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Educational Guide */}
      <div className="bg-[#05080f]">
        
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

        {/* Semantic Internal Links (Phase 7 - Internal Linking) */}
        <section className="py-20 bg-[#05080f]" aria-label="Related Security Tools">
          <div className="max-w-[1000px] mx-auto px-6">
            <h2 className="text-3xl font-display font-bold text-white mb-10 text-center">Complete Your Network Asset Audit</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* WHOIS Lookup Link */}
              <Link href="/tools/whois" className="p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-cyan-500/30 transition-all group">
                <Globe className="w-8 h-8 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-white font-bold text-lg mb-2">WHOIS Lookup</h4>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">Analyze domain registration records, registrar details, ownership, and administrative locks using our WHOIS Lookup tool.</p>
                <span className="text-cyan-400 text-xs font-mono flex items-center gap-1">Run WHOIS Check <ChevronRight className="w-3 h-3"/></span>
              </Link>
              
              {/* IP Lookup Link */}
              <Link href="/tools/ip-lookup" className="p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-purple-500/30 transition-all group">
                <Network className="w-8 h-8 text-purple-400 mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-white font-bold text-lg mb-2">IP Reputation Checker</h4>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">Analyze host reputation, threat tags, and ISP subnet details using our IP reputation checker.</p>
                <span className="text-purple-400 text-xs font-mono flex items-center gap-1">Run IP Scan <ChevronRight className="w-3 h-3"/></span>
              </Link>

              {/* DNS Lookup Link */}
              <Link href="/tools/dns-lookup" className="p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-orange-500/30 transition-all group">
                <Database className="w-8 h-8 text-orange-400 mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-white font-bold text-lg mb-2">DNS Records Auditor</h4>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">Extract and verify authoritative MX, TXT, A, and CAA records to prevent routing configuration gaps using our DNS records auditor.</p>
                <span className="text-orange-400 text-xs font-mono flex items-center gap-1">Audit DNS Records <ChevronRight className="w-3 h-3"/></span>
              </Link>

              {/* SSL Checker Link */}
              <Link href="/tools/ssl-checker" className="p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-cyan-500/30 transition-all group">
                <Lock className="w-8 h-8 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-white font-bold text-lg mb-2">SSL/TLS Checker</h4>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">Audit cryptographic validity, certificate expiry, and handshake errors using our SSL/TLS Checker.</p>
                <span className="text-cyan-400 text-xs font-mono flex items-center gap-1">Validate SSL <ChevronRight className="w-3 h-3"/></span>
              </Link>

              {/* Subdomain Finder Link */}
              <Link href="/tools/subdomain-finder" className="p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-orange-500/30 transition-all group">
                <Terminal className="w-8 h-8 text-orange-400 mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-white font-bold text-lg mb-2">Subdomain Finder</h4>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">Enumerate public namespaces, find dev subdomains, and identify external infrastructure with our Subdomain Finder.</p>
                <span className="text-orange-400 text-xs font-mono flex items-center gap-1">Find Subdomains <ChevronRight className="w-3 h-3"/></span>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 border-t border-white/5 bg-[#0a0d14]" aria-labelledby="faq-title">
          <div className="max-w-[900px] mx-auto px-6">
            <h2 id="faq-title" className="text-3xl font-display font-bold text-white mb-10 text-center">Port Scanner FAQ</h2>
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
