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
  title: "Port Scanner | Free Online TCP Open Port Checker",
  description: "Test your external network exposure using our free online port scanner. Scan common open ports, verify running service banners, and identify vulnerabilities.",
  path: "/tools/port-scanner"
});

export default function PortScannerPage() {
  const faqs = [
    {
      q: "What is a port scanner?",
      a: "A port scanner is a diagnostic security tool that queries target IP addresses to identify which TCP or UDP ports are open, closed, or filtered by firewalls."
    },
    {
      q: "How does port scanning work?",
      a: "Port scanning sends network packets to target ports and analyzes the response. An open port returns a handshake response (SYN-ACK in TCP), while closed ports return a reset packet (RST)."
    },
    {
      q: "What is an open port?",
      a: "An open port is a communication endpoint on a server configured to accept incoming network connections. It is managed by a specific service or application."
    },
    {
      q: "How do I check for open ports?",
      a: "Enter your target IP or domain name into the ReconShield online port scanner, select the query type, and click scan. The tool queries common ports and displays active services."
    },
    {
      q: "Why do open ports matter for security?",
      a: "Every open port is a potential entry point for attackers. If the software listening on that port contains vulnerabilities, attackers can exploit it to compromise the system."
    },
    {
      q: "What is banner grabbing?",
      a: "Banner grabbing is the technique of reading the initial greeting message (banner) sent by a service when connecting to its port, allowing researchers to identify the software name and version."
    }
  ];

  const breadcrumbs = [
    { name: "Home", url: "https://reconshield.in" },
    { name: "Tools", url: "https://reconshield.in/tools" },
    { name: "Port Scanner", url: "https://reconshield.in/tools/port-scanner" }
  ];

  const schemas = [
    {
      "@type": "SoftwareApplication",
      "@id": "https://reconshield.in/tools/port-scanner#software",
      "name": "ReconShield Port Scanner",
      "url": "https://reconshield.in/tools/port-scanner",
      "description": "Free online port checking application for network perimeter audits and open service detection.",
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
      "description": "Verify external firewall rules, check open ports, and perform TCP banner grabbing audits.",
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
      "headline": "The Professional Guide to TCP Port Scanning, Firewall Diagnostics, and Exposure Audits",
      "description": "An in-depth analysis of port state definitions, TCP/IP handshake logic, banner grabbing methodologies, and external attack surface management.",
      "author": { "@type": "Person", "name": "Surendra Reddy" },
      "publisher": { "@id": "https://reconshield.in/#organization" },
      "url": "https://reconshield.in/tools/port-scanner"
    },
    {
      "@type": "HowTo",
      "@id": "https://reconshield.in/tools/port-scanner#howto",
      "name": "How to check open ports online",
      "description": "Diagnose firewall configuration rules and inspect public-facing network services.",
      "step": [
        { "@type": "HowToStep", "name": "Enter IP or Hostname", "text": "Input the target network IP address or domain name in the input bar." },
        { "@type": "HowToStep", "name": "Run Exposure Check", "text": "Launch the scan to query target TCP connections." },
        { "@type": "HowToStep", "name": "Verify Service State", "text": "Review open, closed, or filtered states, and inspect banner versions." }
      ]
    },
    {
      "@type": "FAQPage",
      "@id": "https://reconshield.in/tools/port-scanner#faq",
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
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-red-500/5 blur-[100px] rounded-full pointer-events-none -z-10" />
        
        <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-900 border border-white/10 text-gray-400 text-xs font-mono uppercase tracking-widest mb-6 shadow-sm">
            <Terminal className="w-4 h-4 text-red-400" />
            <span>Network Exposure Resolution Module</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 tracking-tight">
            Port Scanner
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

      {/* AI Overview Section (Phase 5) */}
      <section className="py-12 bg-[#05080f] border-b border-white/5" aria-label="AI Search Overview">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="bg-gradient-to-r from-red-500/5 to-orange-500/5 border border-red-500/10 rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 blur-[50px] rounded-full pointer-events-none" />
            <h2 className="font-mono text-xs text-red-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4 text-red-400" /> AI Citation Index: Network Port Audits
            </h2>
            <div className="space-y-6 text-sm text-gray-300 font-sans leading-relaxed">
              <div>
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Definition: What is a Port Scanner?</span>
                <p>
                  A <strong>Port Scanner</strong> is a diagnostic networking tool used to probe a target host IP to check which communication ports are open and active, indicating available services and applications.
                </p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Definition: What is an Open Port?</span>
                <p>
                  An <strong>open port</strong> is a TCP/IP or UDP port configured to accept incoming network packets. If the listening software contains bugs or default configurations, attackers can exploit it.
                </p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// How-To: How to Check Open Ports?</span>
                <p>
                  To check for open ports online: Input the destination host domain name or IP address in the ReconShield Port Checker, select common target ports, and run the test. The engine attempts a direct TCP handshake to confirm the port state.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Educational Guide */}
      <div className="bg-[#05080f]">
        
        <section className="py-20 border-b border-white/5">
          <div className="max-w-[1000px] mx-auto px-6 prose prose-invert max-w-none prose-p:leading-relaxed prose-p:text-gray-400 prose-headings:text-white prose-a:text-red-400 hover:prose-a:text-red-300">
            
            <h2 className="text-3xl font-display font-bold mt-0 mb-6 flex items-center gap-3">
              <Server className="w-8 h-8 text-red-400" />
              What is a Port Scanner and How Does It Work?
            </h2>
            <p>
              A **port scanner** queries target IP addresses to map which communication pathways are open. Think of it like a security guard checking the doors of a building to see which are unlocked.
            </p>
            <p>
              When running a **TCP port scan**, our tool initiates a standard three-way TCP handshake (SYN, SYN-ACK, ACK). If the target port responds with a SYN-ACK packet, we confirm the port is open and immediately close the connection with a reset (RST) packet.
            </p>

            <h2 className="text-3xl font-display font-bold mt-16 mb-6">Common Port States</h2>
            <ul>
              <li><strong>Open:</strong> An application is actively accepting connections on this port.</li>
              <li><strong>Closed:</strong> The port rejects connections. No application is listening.</li>
              <li><strong>Filtered:</strong> A firewall is blocking the connection packets, meaning we cannot confirm if the port is open or closed.</li>
            </ul>

            <h2 className="text-3xl font-display font-bold mt-16 mb-6">Common Port Configurations and Default Services</h2>
            <p>
              Network systems rely on standardized port assignments managed by IANA:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose my-8">
              <div className="p-5 rounded-2xl bg-surface-900 border border-white/5">
                <span className="font-mono text-xs text-red-400 block mb-1">Port 22 — SSH (Secure Shell)</span>
                <p className="text-xs text-gray-400">Used for secure remote command line access. If exposed publicly, administrators must enforce public-key authentication to prevent brute-force attacks.</p>
              </div>
              <div className="p-5 rounded-2xl bg-surface-900 border border-white/5">
                <span className="font-mono text-xs text-cyan-400 block mb-1">Port 80 & 443 — HTTP & HTTPS</span>
                <p className="text-xs text-gray-400">Standard web traffic channels. Port 443 routes encrypted SSL/TLS web traffic, which should be audited regularly using an SSL checker.</p>
              </div>
              <div className="p-5 rounded-2xl bg-surface-900 border border-white/5">
                <span className="font-mono text-xs text-yellow-400 block mb-1">Port 21 — FTP (File Transfer Protocol)</span>
                <p className="text-xs text-gray-400">An insecure file exchange protocol. FTP servers should be disabled or routed over secure SFTP/SSH channels.</p>
              </div>
              <div className="p-5 rounded-2xl bg-surface-900 border border-white/5">
                <span className="font-mono text-xs text-purple-400 block mb-1">Port 3389 — RDP (Remote Desktop)</span>
                <p className="text-xs text-gray-400">Microsoft Remote Desktop Protocol. Exposing RDP to the public internet is a major security risk vulnerable to ransomware exploitation.</p>
              </div>
            </div>

            <h2 className="text-3xl font-display font-bold mt-16 mb-6">Cybersecurity Port Scanning Best Practices</h2>
            <ol>
              <li>Block all unused ports by default at your edge firewall.</li>
              <li>Implement host-based intrusion prevention systems (IPS) to detect and block port scans.</li>
              <li>Use service banner grabbing checks to verify that running services do not leak software brand name and version details.</li>
              <li>Route admin services (like SSH, RDP, Database) behind private virtual networks (VPNs).</li>
            </ol>
          </div>
        </section>

        {/* Competitor Comparison */}
        <section className="py-20 bg-[#0a0d14] border-b border-white/5">
          <div className="max-w-[1000px] mx-auto px-6 prose prose-invert max-w-none">
            <h2 className="text-3xl font-display font-bold text-white mb-6">Port Checker Comparison Matrix</h2>
            <p className="text-gray-400 mb-8">
              Compare ReconShield against traditional open port check diagnostic websites:
            </p>

            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0d1117] not-prose my-8">
              <table className="w-full text-left text-sm text-gray-400 border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.02] text-white font-mono uppercase text-xs">
                    <th className="p-4">Utility Parameter</th>
                    <th className="p-4 border-l border-white/10">ReconShield</th>
                    <th className="p-4 border-l border-white/10">YouGetSignal</th>
                    <th className="p-4 border-l border-white/10">HackerTarget</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono text-xs">
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-4 font-semibold text-white">Service Banner Grabbing</td>
                    <td className="p-4 border-l border-white/10 text-red-400 font-bold">Yes (Version fingerprinting)</td>
                    <td className="p-4 border-l border-white/10">No</td>
                    <td className="p-4 border-l border-white/10">Yes</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-4 font-semibold text-white">Clean, Ad-Free UI</td>
                    <td className="p-4 border-l border-white/10 text-red-400 font-bold">Yes (No popups)</td>
                    <td className="p-4 border-l border-white/10">Heavy ad banners</td>
                    <td className="p-4 border-l border-white/10">Basic layout</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-4 font-semibold text-white">Threat Risk Assessment</td>
                    <td className="p-4 border-l border-white/10 text-red-400 font-bold">Yes (Calculates exposure risk)</td>
                    <td className="p-4 border-l border-white/10">No</td>
                    <td className="p-4 border-l border-white/10">No</td>
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
              <div className="w-24 h-24 rounded-full bg-[#1a2332] border-2 border-red-500/30 flex items-center justify-center shrink-0 overflow-hidden">
                <Shield className="w-10 h-10 text-red-400" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 px-2 py-1 rounded bg-red-500/10 text-red-400 text-[10px] font-mono uppercase tracking-widest mb-2">
                  <Check className="w-3 h-3" /> Fact Checked & Verified
                </div>
                <h4 className="text-white font-bold text-xl mb-1">Surendra Reddy</h4>
                <p className="text-gray-400 text-xs font-mono uppercase tracking-wider mb-3">Cybersecurity Researcher & Founder, ReconShield</p>
                <p className="text-gray-400 text-sm leading-relaxed mb-4 font-sans">
                  Surendra is an information security analyst specializing in network perimeter exposure, firewall auditing, and OSINT vulnerability scanning. He designed ReconShield to help users test their public-facing server ports.
                </p>
                <div className="flex gap-6 text-sm font-mono">
                  <a href="https://linkedin.com/in/surendrareddy3" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 flex items-center gap-1">LinkedIn <ChevronRight className="w-3 h-3"/></a>
                  <a href="https://github.com/nsurendrareddy" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white flex items-center gap-1">GitHub <ChevronRight className="w-3 h-3"/></a>
                </div>
              </div>
            </div>

            <div className="text-center text-[10px] font-mono text-gray-600 uppercase tracking-widest">
              Last Updated: June 2026 | Reviewed by ReconShield Technical Board | Reference: IANA Port Assignments list
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
                <h4 className="text-white font-bold text-lg mb-2">IP Reputation Check</h4>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">Verify hosting network ASN metadata and check listings across global threat blacklist databases.</p>
                <span className="text-purple-400 text-xs font-mono flex items-center gap-1">Check IP Reputation <ChevronRight className="w-3 h-3"/></span>
              </Link>

              <Link href="/tools/subdomain-finder" className="p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-orange-500/30 transition-all group">
                <Terminal className="w-8 h-8 text-orange-400 mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-white font-bold text-lg mb-2">Subdomain Finder</h4>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">Enumerate public namespaces, find dev subdomains, and identify external infrastructure.</p>
                <span className="text-orange-400 text-xs font-mono flex items-center gap-1">Find Subdomains <ChevronRight className="w-3 h-3"/></span>
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
