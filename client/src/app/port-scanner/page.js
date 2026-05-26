import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Shield, Target, Server, Lock, Terminal, CheckCircle2, ChevronRight, Activity, Network, AlertTriangle, Search, Globe, Key } from 'lucide-react';

const ToolScannerClient = dynamic(() => import('@/components/ToolScannerClient'), {
  loading: () => <div className="min-h-[600px] animate-pulse bg-surface-900/50 rounded-3xl" />
});

export const metadata = {
  title: "Port Scanner & Network Attack Surface Analysis Tool | ReconShield",
  description: "Free TCP port scanner and open port checker. Scan open ports, map your attack surface, and detect vulnerable network services passively.",
  keywords: [
    "port scanner", "open port checker", "network port scanner", 
    "scan open ports", "TCP port scanner", "attack surface analysis", 
    "open ports security checker"
  ],
  alternates: {
    canonical: 'https://reconshield.in/port-scanner',
  },
  openGraph: {
    title: "Port Scanner & Network Attack Surface Analysis Tool",
    description: "Free TCP port scanner and open port checker. Scan open ports, map your attack surface, and detect vulnerable network services passively.",
    url: 'https://reconshield.in/port-scanner',
    type: 'article',
  }
};

export default function PortScannerPage() {
  const faqs = [
    {
      q: "What is an Open Port Checker?",
      a: "An open port checker is a network utility that attempts to establish connections to specific TCP or UDP ports on a target IP address or domain. It determines whether a service (like a web server or database) is actively listening and accessible from the public internet."
    },
    {
      q: "Is it illegal to scan open ports?",
      a: "Port scanning is generally considered reconnaissance and is legal if it strictly relies on public, passive databases (like ReconShield does via Shodan/InternetDB). However, actively firing intrusive packets at unauthorized targets can violate terms of service and be perceived as a hostile act."
    },
    {
      q: "What is Attack Surface Analysis?",
      a: "Attack surface analysis involves mapping all the points where an unauthorized user could potentially enter or extract data from an environment. Our network port scanner identifies all exposed services, allowing administrators to minimize this attack surface."
    },
    {
      q: "What are the most dangerous open ports?",
      a: "Ports associated with remote administration or databases are the most critical. Leaving ports like 22 (SSH), 3389 (RDP), 21 (FTP), 23 (Telnet), or 3306 (MySQL) open to the public internet is a massive security risk."
    },
    {
      q: "How does a TCP port scanner work?",
      a: "A TCP port scanner initiates a standard TCP three-way handshake (SYN, SYN-ACK, ACK). If the target responds with a SYN-ACK, the port is marked 'open'. If it responds with an RST (Reset), the port is 'closed'. If there is no response, the port is typically 'filtered' by a firewall."
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
                "@id": "https://reconshield.in/port-scanner#software",
                "name": "ReconShield Port Scanner",
                "url": "https://reconshield.in/port-scanner",
                "description": "Enterprise TCP port scanner and attack surface analysis tool.",
                "applicationCategory": "SecurityApplication",
                "operatingSystem": "Web",
                "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
              },
              {
                "@type": "BreadcrumbList",
                "@id": "https://reconshield.in/port-scanner#breadcrumb",
                "itemListElement": [
                  { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://reconshield.in" },
                  { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://reconshield.in/tools" },
                  { "@type": "ListItem", "position": 3, "name": "Port Scanner", "item": "https://reconshield.in/port-scanner" }
                ]
              },
              {
                "@type": "FAQPage",
                "@id": "https://reconshield.in/port-scanner#faq",
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
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-red-500/5 blur-[100px] rounded-full pointer-events-none -z-10" />
        
        <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-center animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-900 border border-white/10 text-gray-400 text-xs font-mono uppercase tracking-widest mb-6 shadow-sm">
            <Terminal className="w-4 h-4 text-red-500" />
            <span>Reconnaissance & Mapping Module</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Port Scanner</span> & Attack Surface Analysis
          </h1>
          
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Instantly map exposed infrastructure with our <strong>network port scanner</strong>. Scan open ports, identify listening services, and perform a comprehensive <strong>attack surface analysis</strong> passively.
          </p>

          <div className="max-w-4xl mx-auto mb-12">
            <ToolScannerClient 
              toolId="port-scanner" 
              title="TCP Port Intelligence Scanner" 
              desc="Enter an IP or domain to initiate a comprehensive open port check." 
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-gray-500 uppercase tracking-widest">
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-red-500" /> TCP Port Discovery</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-red-500" /> Service Identification</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-red-500" /> Passive Reconnaissance</div>
          </div>
        </div>
      </section>

      {/* SEO Content Silo Container */}
      <div className="bg-[#05080f]">
        
        {/* 2. What Is Port Scanning? & 3. How Port Scanning Works */}
        <section className="py-20 border-b border-white/5">
          <div className="max-w-[900px] mx-auto px-6 prose prose-invert max-w-none prose-p:leading-relaxed prose-p:text-gray-400 prose-headings:text-white prose-a:text-red-500 hover:prose-a:text-red-400">
            
            <h2 className="text-3xl font-display font-bold mt-0 mb-6 flex items-center gap-3">
              <Network className="w-8 h-8 text-red-500" />
              What Is Port Scanning?
            </h2>
            <p>
              In networking, a "port" is a virtual endpoint where network connections start and end. A <strong>port scanner</strong> is a software application designed to probe a server or host for open ports. By using an <strong>open port checker</strong>, security analysts can determine which network services are running and accessible on a target machine.
            </p>
            <p>
              ReconShield provides a powerful <strong>open ports security checker</strong> that operates passively. Instead of firing aggressive packets at the target, we query vast OSINT databases (like Shodan InternetDB) to return historical and cached port data, ensuring zero impact on your production environment.
            </p>

            <h2 className="text-3xl font-display font-bold mt-16 mb-6 flex items-center gap-3">
              <Activity className="w-8 h-8 text-orange-500" />
              How Port Scanning Works
            </h2>
            <p>
              A traditional <strong>TCP port scanner</strong> works by attempting to complete a standard connection handshake with thousands of ports sequentially. When you <strong>scan open ports</strong>, the scanner analyzes the packet responses. An open port signifies that an application (like Nginx on Port 443 or SSH on Port 22) is actively listening and ready to accept connections. A closed or filtered port means a firewall is blocking the traffic.
            </p>

          </div>
        </section>

        {/* 4. Common Ports & 5. Security Risks & 6. Attack Surface */}
        <section className="py-20 bg-[#0a0d14] border-b border-white/5">
          <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            <div className="prose prose-invert max-w-none prose-p:text-gray-400">
              <h2 className="text-3xl font-display font-bold text-white mb-6">Common Ports Explained</h2>
              <p>
                To effectively conduct an <strong>attack surface analysis</strong>, it is critical to recognize standard service ports:
              </p>
              <ul>
                <li><strong>Port 21 (FTP):</strong> File Transfer Protocol. Often vulnerable if transmitting data unencrypted.</li>
                <li><strong>Port 22 (SSH):</strong> Secure Shell for remote administration. Should be locked down to specific IP ranges.</li>
                <li><strong>Port 80/443 (HTTP/HTTPS):</strong> Standard web traffic. Generally expected to be open on web servers.</li>
                <li><strong>Port 3306/5432 (Databases):</strong> MySQL and PostgreSQL. Exposing these to the public internet is extremely dangerous.</li>
                <li><strong>Port 3389 (RDP):</strong> Remote Desktop Protocol. A primary vector for ransomware attacks.</li>
              </ul>

              <h3 className="text-xl text-white font-bold mt-8 mb-4">Open Port Security Risks</h3>
              <p>
                Every open port represents a potential entry point for an attacker. If a service running on an open port contains a vulnerability (CVE) or is secured by weak/default credentials, an attacker can compromise the entire server. This is why a <strong>network port scanner</strong> is the first tool deployed during a penetration test.
              </p>
            </div>

            {/* Core Threats Focus Card */}
            <div className="bg-surface-900 border border-white/10 rounded-3xl p-8 shadow-2xl">
              <h3 className="text-xl font-display font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" /> Attack Surface Analysis
              </h3>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0">
                    <Target className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Infrastructure Mapping</h4>
                    <p className="text-sm text-gray-400">By determining the open ports, attackers and defenders alike can infer the exact architecture (web, database, mail) of the underlying server.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0">
                    <Server className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Shadow IT Discovery</h4>
                    <p className="text-sm text-gray-400">Organizations often spin up temporary testing servers that are forgotten. Our scanner helps locate these rogue endpoints before attackers do.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                    <Lock className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Firewall Auditing</h4>
                    <p className="text-sm text-gray-400">If a database port (like 1433 for MSSQL) shows as open, it immediately signifies a catastrophic failure in firewall access control lists (ACLs).</p>
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
              <li><strong>Zero Trust Verification:</strong> Security engineers use an <strong>open port checker</strong> to verify that strict "default-deny" firewall rules are correctly implemented.</li>
              <li><strong>Red Teaming & Reconnaissance:</strong> Ethical hackers use a <strong>TCP port scanner</strong> as the very first step of an engagement to map out where vulnerabilities might exist.</li>
              <li><strong>Incident Response:</strong> If a server is behaving anomalously, incident responders will scan for unauthorized open ports that may indicate a malicious backdoor listener.</li>
            </ul>

            <h2 className="text-3xl font-display font-bold text-white mt-16 mb-8">Step-by-Step Tutorial: Scanning a Target</h2>
            <div className="bg-[#0d1117] border border-[#1a2332] rounded-2xl p-6 mb-12">
              <ol className="list-decimal list-inside space-y-4 text-gray-300">
                <li><strong>Enter the Target IP or Domain:</strong> Input your server's address into the ReconShield terminal.</li>
                <li><strong>Initiate Passive Scan:</strong> Click scan to query our OSINT threat intelligence databases.</li>
                <li><strong>Review the Exposed Ports:</strong> Analyze the list of ports flagged as 'open'.</li>
                <li><strong>Identify the Services:</strong> Correlate the port numbers with their associated services (e.g., Port 443 = HTTPS).</li>
                <li><strong>Harden the Firewall:</strong> Any port that does not absolutely need to be publicly accessible should be immediately blocked via your firewall or security group.</li>
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
              <div className="w-24 h-24 rounded-full bg-[#1a2332] border-2 border-red-500/30 flex items-center justify-center shrink-0 overflow-hidden">
                <Terminal className="w-10 h-10 text-red-500" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 px-2 py-1 rounded bg-red-500/10 text-red-500 text-[10px] font-mono uppercase tracking-widest mb-2">
                  <CheckCircle2 className="w-3 h-3" /> Fact Checked & Verified
                </div>
                <h4 className="text-white font-bold text-xl mb-1">Surendra Reddy</h4>
                <p className="text-gray-400 text-xs font-mono uppercase tracking-wider mb-3">Cybersecurity Researcher & Founder, ReconShield</p>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  Surendra is a cybersecurity engineer specializing in Open Source Intelligence (OSINT), vulnerability intelligence, and AI-driven threat analysis. He built ReconShield to democratize access to enterprise-grade reconnaissance tools and secure the digital attack surface.
                </p>
                <div className="flex gap-6 text-sm font-mono">
                  <a href="#" className="text-red-500 hover:text-red-400 flex items-center gap-1">LinkedIn <ChevronRight className="w-3 h-3"/></a>
                  <a href="#" className="text-gray-300 hover:text-white flex items-center gap-1">GitHub <ChevronRight className="w-3 h-3"/></a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 10. Related Security Tools & 12. Internal Linking Hub */}
        <section className="py-20 bg-[#0a0d14]">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex items-center gap-4 mb-10">
              <h2 className="font-mono text-xs tracking-[4px] uppercase text-red-500 font-bold">// EXPLORE RELATED RECONNAISSANCE TOOLS</h2>
              <div className="h-[1px] flex-1 bg-[#1a2332]" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/vulnerability-scanner" className="p-6 bg-surface-900 border border-white/5 hover:border-red-500/30 rounded-2xl group transition-all">
                <Shield className="w-6 h-6 text-red-500 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-white font-bold mb-2 group-hover:text-red-500 transition-colors">Website Vulnerability Scanner</h3>
                <p className="text-xs text-gray-400">Combine port intelligence with deep web application security auditing.</p>
              </Link>

              <Link href="/ip-scanner" className="p-6 bg-surface-900 border border-white/5 hover:border-red-500/30 rounded-2xl group transition-all">
                <Search className="w-6 h-6 text-red-500 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-white font-bold mb-2 group-hover:text-red-500 transition-colors">IP Reputation Scanner</h3>
                <p className="text-xs text-gray-400">Perform an ASN lookup on resolved IP addresses and check them against threat feeds.</p>
              </Link>

              <Link href="/ssl-checker" className="p-6 bg-surface-900 border border-white/5 hover:border-red-500/30 rounded-2xl group transition-all">
                <Lock className="w-6 h-6 text-red-500 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-white font-bold mb-2 group-hover:text-red-500 transition-colors">SSL/TLS Checker</h3>
                <p className="text-xs text-gray-400">Analyze cryptographic strength on exposed port 443 infrastructure.</p>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
