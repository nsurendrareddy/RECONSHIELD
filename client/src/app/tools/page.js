import React from 'react';
import Link from 'next/link';
import { 
  Shield, Globe, Server, Lock, Terminal, CheckCircle2, ChevronRight, 
  Search, Activity, Target, Network, Info, Check, AlertTriangle, 
  FileText, Send, HelpCircle, BookOpen, Key, Database, Clock, Cpu, Mail, ArrowUpRight
} from 'lucide-react';

import { generateBaseMetadata } from '@/utils/metadata';
import ToolsListContainer from '@/components/ToolsListContainer';

export const metadata = generateBaseMetadata({
  title: "ReconShield Cybersecurity Tools Platform | Free Online OSINT Toolkit",
  description: "Free enterprise cybersecurity tools hub. Passively audit domain ownership, resolve DNS records, verify SSL setups, scan TCP ports, detect web frameworks, and evaluate attack surfaces.",
  path: '/tools'
});

export default function ToolsHubPage() {
  const faqs = [
    {
      q: "What is the ReconShield Cybersecurity Intelligence Platform?",
      a: "The ReconShield Cybersecurity Intelligence Platform is an enterprise-grade suite of free tools designed to audit internet-facing assets, assess vulnerability risks, and analyze attack surfaces. It operates passively to collect metadata without causing host disruptions."
    },
    {
      q: "Are all ReconShield tools free to use?",
      a: "Yes, all tools on our platform are completely free and require no signup or registration. We aim to democratize access to critical OSINT and defensive utility resources for developers, researchers, and systems administrators globally."
    },
    {
      q: "What is passive reconnaissance?",
      a: "Passive reconnaissance is an information gathering method that extracts data from public logs, response headers, and third-party registries. It allows you to audit security configurations without sending direct, intrusive packets that might disrupt target servers."
    },
    {
      q: "How does the Attack Surface Workflow function?",
      a: "The Attack Surface Workflow starts with WHOIS domain checks and advances through DNS, subdomain discovery, tech stacks, TLS layers, HTTP headers, port exposures, IP lookups, email security, and vulnerability evaluations to construct a complete security report."
    },
    {
      q: "What is Attack Surface Management (ASM)?",
      a: "Attack Surface Management (ASM) is the continuous monitoring, discovery, and mitigation of an organization's public-facing digital assets. It ensures that all subdomains, certificates, open ports, and frameworks are documented and secured against threats."
    },
    {
      q: "Can the tools help with compliance auditing?",
      a: "Yes. The platform audits settings against standard compliance guidelines (like OWASP Top 10, NIST SP 800-53, and PCI-DSS) by verifying transport layer security, HTTP header policies, and proper email validation setups."
    },
    {
      q: "Why should I check DNSSEC?",
      a: "Checking DNSSEC ensures that your Domain Name System records are cryptographically signed. This prevents DNS spoofing and cache poisoning attacks, ensuring web visitors are routed to your legitimate servers."
    },
    {
      q: "What is DMARC reject mode?",
      a: "DMARC reject mode (p=reject) is an email security policy that instructs receiving servers to block any message that fails SPF or DKIM checks, preventing unauthorized actors from spoofing your domain name."
    },
    {
      q: "How are the Security and Exposure scores calculated?",
      a: "Scores are computed by evaluating SSL certificate parameters, security headers, open ports, and mail records against NIST standards. Security scores represent configuration strength, while Exposure scores measure entry visibility."
    },
    {
      q: "What is OSINT in cybersecurity?",
      a: "Open Source Intelligence (OSINT) involves collecting, analyzing, and correlating publicly accessible data to understand threat landscapes, trace attacker infrastructures, and audit your own network perimeter defenses."
    },
    {
      q: "Do these scanners cause server load?",
      a: "No. Because our scanners rely on passive queries, cached intelligence, public DNS records, and standard HTTP head requests, they consume negligible resources and will not affect target host performance."
    },
    {
      q: "Why is technology stack fingerprinting helpful?",
      a: "Fingerprinting identifies the frameworks, CMS systems, and libraries powering a site. This allows administrators to inventory assets and spot outdated components that contain known CVE vulnerabilities before exploitation."
    },
    {
      q: "What is the difference between vulnerability scanning and pen testing?",
      a: "Vulnerability scanning is an automated audit that flags configuration gaps and known weaknesses. Penetration testing is a manual, simulated cyberattack designed to actively bypass controls and exploit discovered vulnerabilities."
    },
    {
      q: "How do I fix HTTP header warnings?",
      a: "Harden HTTP responses by configuring headers like Strict-Transport-Security (HSTS), Content-Security-Policy (CSP), and X-Frame-Options in your server settings (Nginx, Apache, or web application middleware) to limit browser risks."
    },
    {
      q: "Who built the ReconShield tools suite?",
      a: "ReconShield was built by cybersecurity researcher Surendra Reddy to provide developers and security analysts with robust, free, and accessible infrastructure visibility tools to defend their digital perimeters."
    }
  ];

  const tools = [
    {
      id: "whois",
      name: "WHOIS Lookup",
      category: "Domain Intelligence",
      iconName: "whois",
      desc: "Query domain registration records, registrar details, registration duration, and name server locking parameters.",
      useCases: ["Domain Ownership Checks", "Phishing Infrastructure Trace", "EPP Code Status Audit"],
      benefits: ["Track domain expiration risks", "Detect registry hijacking", "Extract administrative contact data"],
      related: ["DNS Lookup", "Subdomain Finder", "IP Lookup"],
      cta: "Run WHOIS Check",
      route: "/tools/whois"
    },
    {
      id: "dns-lookup",
      name: "DNS Lookup",
      category: "Domain Intelligence",
      iconName: "dns",
      desc: "Retrieve DNS zone files, MX, TXT, A, AAAA, CAA records, and cryptographically audit DNSSEC configuration status.",
      useCases: ["DNSSEC Key Verification", "MX Mail Routing Checks", "Zone Transfer Auditing"],
      benefits: ["Verify server record replication", "Identify missing security markers", "Audit authoritative resolvers"],
      related: ["WHOIS Lookup", "Subdomain Finder", "Email Security Checker"],
      cta: "Run DNS Lookup",
      route: "/tools/dns-lookup"
    },
    {
      id: "subdomain-finder",
      name: "Subdomain Finder",
      category: "Domain Intelligence",
      iconName: "subdomain",
      desc: "Enumerate domain hostnames passively using public caching, transparency registries, and DNS records.",
      useCases: ["Shadow IT Asset Identification", "Namespace Perimeter Mapping", "Subdomain Takeover Audits"],
      benefits: ["Expose forgotten staging endpoints", "Map digital network surfaces", "Verify external CDN associations"],
      related: ["DNS Lookup", "Port Scanner", "Tech Detector"],
      cta: "Discover Subdomains",
      route: "/tools/subdomain-finder"
    },
    {
      id: "ip-lookup",
      name: "IP Lookup",
      category: "Infrastructure Intelligence",
      iconName: "ip",
      desc: "Geolocate IP addresses, map hosting providers, identify Autonomous System Numbers (ASN), and audit proxy or VPN flags.",
      useCases: ["Traffic Geoblocking Auditing", "Abuse Registry Tracing", "Anonymizer Endpoint Detection"],
      benefits: ["Locate hosting origins", "Trace BGP routing ASNs", "Identify malicious blocklist tags"],
      related: ["Port Scanner", "Tech Detector", "WHOIS Lookup"],
      cta: "Run IP Lookup",
      route: "/tools/ip-lookup"
    },
    {
      id: "port-scanner",
      name: "Port Scanner",
      category: "Infrastructure Intelligence",
      iconName: "port",
      desc: "Audit public network targets to identify open TCP ports, service version banners, and firewall configurations.",
      useCases: ["Interface Exposure Audits", "Firewall Verification Checks", "Service Fingerprint Grabs"],
      benefits: ["Isolate unneeded open ports", "Locate exposed databases", "Verify port forwarding guidelines"],
      related: ["IP Lookup", "Subdomain Finder", "Vulnerability Scanner"],
      cta: "Run Port Scan",
      route: "/tools/port-scanner"
    },
    {
      id: "tech-detector",
      name: "Tech Detector",
      category: "Infrastructure Intelligence",
      iconName: "tech",
      desc: "Identify framework libraries, content management systems (CMS), CDNs, firewalls, and analytics stack signatures.",
      useCases: ["Outdated Framework Discovery", "Web Stack Inventory Audits", "WAF Deployment Checks"],
      benefits: ["Locate unpatched CMS versions", "Audit front-end vendor libraries", "Expose configuration headers"],
      related: ["Subdomain Finder", "SSL Checker", "HTTP Headers Checker"],
      cta: "Detect Website Stack",
      route: "/tools/tech-detector"
    },
    {
      id: "ssl-checker",
      name: "SSL Checker",
      category: "Web Security",
      iconName: "ssl",
      desc: "Audit TLS certificate configurations, verify key lengths, validate trust chains, and flag insecure ciphers.",
      useCases: ["TLS Compliance Assessments", "Downgrade Attack Prevention", "Certificate Expiry Tracking"],
      benefits: ["Stop encryption MITM risks", "Verify root CA alignments", "Check handshake error points"],
      related: ["HTTP Headers Checker", "Tech Detector", "Vulnerability Scanner"],
      cta: "Check SSL Certificate",
      route: "/tools/ssl-checker"
    },
    {
      id: "http-headers",
      name: "HTTP Headers Checker",
      category: "Web Security",
      iconName: "headers",
      desc: "Analyze response headers for security parameters including HSTS, CSP, XSS protection, and CORS policies.",
      useCases: ["Clickjacking Defense Hardening", "XSS Injection Prevention", "Cookie Flag Compliance Audits"],
      benefits: ["Enforce transport encryption", "Restrict frame embedding options", "Audit session cookie parameters"],
      related: ["SSL Checker", "Tech Detector", "Vulnerability Scanner"],
      cta: "Check Security Headers",
      route: "/tools/http-headers"
    },
    {
      id: "email-security",
      name: "Email Security Checker",
      category: "Email Security",
      iconName: "email",
      desc: "Audit email verification DNS configurations, including SPF lookup metrics, DKIM parameters, and DMARC enforcement.",
      useCases: ["Domain Impersonation Prevention", "Phishing Abuse Protection", "Spam Filter Score Improvement"],
      benefits: ["Harden email sender policies", "Stop spoofing vectors", "Audit DKIM key sizes"],
      related: ["DNS Lookup", "WHOIS Lookup", "Vulnerability Scanner"],
      cta: "Check Email Security",
      route: "/tools/email-security"
    },
    {
      id: "vulnerability-scanner",
      name: "Vulnerability Scanner",
      category: "Security Assessment",
      iconName: "vuln",
      desc: "Passively assess system components for security configuration errors, old software, and exposure risks.",
      useCases: ["Baseline Configuration Hardening", "OWASP Compliance Audits", "CVSS Vulnerability Triage"],
      benefits: ["Rate risks via CVSS standards", "Track configuration drift", "Draft remediation roadmaps"],
      related: ["Port Scanner", "SSL Checker", "Website Security Scanner"],
      cta: "Run Vulnerability Scan",
      route: "/tools/vulnerability-scanner"
    },
    {
      id: "scanner",
      name: "Website Security Scanner",
      category: "Security Assessment",
      iconName: "scanner",
      desc: "AI-powered assessment tool evaluating domain parameters, transport security, mail configurations, and exposures.",
      useCases: ["Attack Surface Management", "Perimeter Posture Calculations", "Executive Security Reporting"],
      benefits: ["Generate security scores", "Identify exposure rankings", "Build compliance health graphs"],
      related: ["Vulnerability Scanner", "HTTP Headers Checker", "SSL Checker"],
      cta: "Run Website Security Scan",
      route: "/scanner"
    }
  ];

  const categories = ["All", "Domain Intelligence", "Infrastructure Intelligence", "Web Security", "Email Security", "Security Assessment"];

  const breadcrumbs = [
    { name: "Home", url: "https://reconshield.in" },
    { name: "Tools", url: "https://reconshield.in/tools" }
  ];

  const schemaJson = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "https://reconshield.in/tools#collection",
        "name": "ReconShield Cybersecurity Tools Platform",
        "url": "https://reconshield.in/tools",
        "description": "The ultimate cybersecurity intelligence platform. Audit domains, DNS, SSL, ports, and tech stacks passively."
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://reconshield.in/tools#breadcrumb",
        "itemListElement": breadcrumbs.map((crumb, idx) => ({
          "@type": "ListItem",
          "position": idx + 1,
          "name": crumb.name,
          "item": crumb.url
        }))
      },
      {
        "@type": "ItemList",
        "@id": "https://reconshield.in/tools#itemlist",
        "itemListElement": tools.map((tool, idx) => ({
          "@type": "ListItem",
          "position": idx + 1,
          "url": `https://reconshield.in${tool.route}`,
          "name": tool.name
        }))
      },
      {
        "@type": "FAQPage",
        "@id": "https://reconshield.in/tools#faq",
        "mainEntity": faqs.map(faq => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": { "@type": "Answer", "text": faq.a }
        }))
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }} />

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden border-b border-white/5" aria-label="Platform Hero">
        <div className="absolute inset-0 bg-[#0a0d14] -z-20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none -z-10" />
        
        <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-900 border border-white/10 text-gray-400 text-xs font-mono uppercase tracking-widest mb-6 shadow-sm">
            <Shield className="w-4 h-4 text-cyan-400" />
            <span>Enterprise Threat Intelligence Hub</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 tracking-tight">
            The ReconShield Cybersecurity Intelligence Platform
          </h1>
          
          <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed font-sans">
            Audit internet-facing assets, evaluate public vulnerability configurations, check DNSSEC, scan open ports, and secure your email infrastructure using our passive diagnostics toolkit.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-gray-500 uppercase tracking-widest">
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> Passive OSINT Audits</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> Zero Installation</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> Free Public Diagnostics</div>
          </div>
        </div>
      </section>

      {/* AI Overview / Featured Snippet Optimization */}
      <section className="py-12 bg-[#05080f] border-b border-white/5" aria-label="AI Search Overview">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="bg-gradient-to-r from-cyan-500/5 to-blue-500/5 border border-cyan-500/10 rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-[50px] rounded-full pointer-events-none" />
            
            {/* Definition Block: What Are Cybersecurity Tools? */}
            <h2 className="font-mono text-xs text-cyan-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4 text-cyan-400" /> AI Overview Snippet: Cybersecurity Intelligence Tools
            </h2>
            <div className="space-y-6 text-sm text-gray-300 font-sans leading-relaxed">
              <div>
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Definition Block: What Are Cybersecurity Tools?</span>
                <p className="text-gray-300">
                  <strong>Cybersecurity Tools</strong> are specialized utilities designed to monitor networks, analyze software stacks, audit transport encryption, and verify domain parameters to safeguard assets against threat exposures and unauthorized access.
                </p>
              </div>

              {/* Definition Block: What Is Attack Surface Management? */}
              <div className="border-t border-white/5 pt-4">
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Definition Block: What Is Attack Surface Management?</span>
                <p className="text-gray-300">
                  <strong>Attack Surface Management (ASM)</strong> is the continuous process of identifying, mapping, auditing, and securing all public-facing digital assets, including root domains, subdomains, open ports, and certificates, to limit vulnerabilities.
                </p>
              </div>

              {/* Definition Block: What Is Threat Intelligence? */}
              <div className="border-t border-white/5 pt-4">
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Definition Block: What Is Threat Intelligence?</span>
                <p className="text-gray-300">
                  <strong>Threat Intelligence</strong> refers to the collection, correlation, and analysis of server data, network prefixes, registry records, and blacklists to anticipate, identify, and mitigate security exposures before exploits occur.
                </p>
              </div>

              {/* Definition Block: What Is OSINT? */}
              <div className="border-t border-white/5 pt-4">
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Definition Block: What Is OSINT?</span>
                <p className="text-gray-300">
                  <strong>Open Source Intelligence (OSINT)</strong> is a data gathering methodology that extracts configuration parameters from public-facing DNS registries, response headers, certificate databases, and regional IP directories.
                </p>
              </div>
              
              {/* TLDR Section & Key Takeaways */}
              <div className="border-t border-white/5 pt-4">
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// TL;DR Section</span>
                <p className="text-gray-400 text-xs font-mono">
                  ReconShield is a unified cybersecurity intelligence suite that aggregates passive OSINT telemetry to audit your network boundaries, verify transport encryption, harden email security, and prioritize remediation workflows.
                </p>
              </div>

              <div className="border-t border-white/5 pt-4">
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Key Takeaways</span>
                <ul className="list-disc pl-5 text-gray-400 text-xs space-y-2 font-mono">
                  <li><strong>Domain Integrity:</strong> Check WHOIS registration parameters and validate DNSSEC cryptography.</li>
                  <li><strong>Transport Safety:</strong> Validate certificate chains and audit HTTP security headers.</li>
                  <li><strong>Email Hardening:</strong> Configure SPF, DKIM, and DMARC to block brand spoofing.</li>
                  <li><strong>Exposure Limits:</strong> Map public subdomains and identify open administrative ports.</li>
                </ul>
              </div>

              {/* Fact Box: What ReconShield Checks */}
              <div className="border-t border-white/5 pt-4">
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Fact Box: What ReconShield Checks</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono text-gray-400 mt-2">
                  <div>
                    <span className="text-[10px] text-gray-600 uppercase block">Domain Setup:</span>
                    <span>WHOIS, DNS, Subdomains</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-600 uppercase block">Cryptography:</span>
                    <span>SSL/TLS certificates & ciphers</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-600 uppercase block">App Hardening:</span>
                    <span>HTTP headers & tech stacks</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-600 uppercase block">Boundary Auditing:</span>
                    <span>Open ports, email SPF/DMARC</span>
                  </div>
                </div>
              </div>

              {/* Expert Summary */}
              <div className="border-t border-white/5 pt-4">
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Expert Summary</span>
                <p className="text-gray-400 text-xs leading-relaxed font-sans">
                  The ReconShield tools suite provides comprehensive security monitoring and exposure assessments. By analyzing public domain, cryptographic, and server configs, organizations can harden their perimeters against vulnerabilities without impacting performance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Catalog Segment */}
      <section className="py-20 bg-[#0a0d14] border-b border-white/5" aria-label="Interactive Tools Catalog">
        <div className="max-w-[1200px] mx-auto px-6">
          <ToolsListContainer tools={tools} categories={categories} />
        </div>
      </section>

      {/* Visual Attack Surface Workflow Section */}
      <section className="py-20 bg-[#05080f] border-b border-white/5" aria-label="Security Diagnostics Workflow">
        <div className="max-w-[1000px] mx-auto px-6">
          <h2 className="text-3xl font-display font-bold text-white mb-6 text-center">The ReconShield Attack Surface Workflow</h2>
          <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12 font-sans">
            A step-by-step methodology mapping how security teams and threat researchers use our connected diagnostics suite to secure perimeters.
          </p>
          
          <div className="space-y-4 max-w-3xl mx-auto font-sans">
            {[
              { step: "1. WHOIS Lookup", desc: "Query domain registration records, administrative locks, and expiration timelines to verify ownership properties.", target: "Security Researchers & Administrators", route: "/tools/whois" },
              { step: "2. DNS Lookup", desc: "Retrieve authoritative MX, TXT, and A records. Audit DNSSEC configuration properties to prevent route hijacking.", target: "Systems Engineers & DNS Administrators", route: "/tools/dns-lookup" },
              { step: "3. Subdomain Finder", desc: "Passively compile subdomains using Certificate Transparency (CT) logs to identify staging environments.", target: "Penetration Testers & Bug Bounty Hunters", route: "/tools/subdomain-finder" },
              { step: "4. Tech Detector", desc: "Fingerprint framework versions, server signatures, and active content management systems (CMS).", target: "Application Security Engineers", route: "/tools/tech-detector" },
              { step: "5. SSL Checker", desc: "Audit TLS configurations, check handshake protocol versions, and identify weak cipher suite errors.", target: "Compliance Officers & Security Auditors", route: "/tools/ssl-checker" },
              { step: "6. HTTP Headers Checker", desc: "Audit security headers (CSP, HSTS, X-Frame-Options) to mitigate script injections and clickjacking.", target: "Web Developers & AppSec Teams", route: "/tools/http-headers" },
              { step: "7. Port Scanner", desc: "Passively query host ports to identify exposed databases, SSH interfaces, or unneeded service connections.", target: "Network Administrators & Security Teams", route: "/tools/port-scanner" },
              { step: "8. IP Lookup", desc: "Verify IP routing prefixes, geolocation, and ASN reputations against active threat registries.", target: "Threat Intelligence Specialists", route: "/tools/ip-lookup" },
              { step: "9. Email Security Checker", desc: "Verify SPF lookup limits, DKIM cryptographic parameters, and DMARC enforcement directives.", target: "Domain Administrators & Postmasters", route: "/tools/email-security" },
              { step: "10. Vulnerability Scanner", desc: "Score perimeter configuration errors against CVSS frameworks to prioritize patching.", target: "Vulnerability Managers & Security Engineers", route: "/tools/vulnerability-scanner" },
              { step: "11. Website Security Scanner", desc: "Calculate overall posture scoring, verify exposure levels, and generate security reports.", target: "CISOs & Security Directors", route: "/scanner" }
            ].map((node, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-[#0d1117] border border-white/5 hover:border-cyan-500/20 transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h4 className="text-white font-bold text-sm mb-1">{node.step}</h4>
                  <p className="text-gray-400 text-xs leading-relaxed mb-2">{node.desc}</p>
                  <span className="text-[10px] text-gray-500 font-mono uppercase">Target Audience: {node.target}</span>
                </div>
                <Link href={node.route} className="text-cyan-400 hover:text-cyan-300 text-xs font-mono flex items-center gap-1 shrink-0">
                  Open Tool <ChevronRight className="w-3 h-3"/>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Educational Guide */}
      <div className="bg-[#05080f]">
        
        {/* H2: What Are Cybersecurity Tools? */}
        <section className="py-20 border-b border-white/5">
          <div className="max-w-[1000px] mx-auto px-6 prose prose-invert max-w-none prose-p:leading-relaxed prose-p:text-gray-400 prose-headings:text-white prose-a:text-cyan-400 hover:prose-a:text-cyan-300">
            
            <h2 className="text-3xl font-display font-bold mt-0 mb-6 flex items-center gap-3">
              <Key className="w-8 h-8 text-cyan-400" />
              What Are Cybersecurity Tools?
            </h2>
            <p>
              <strong>Cybersecurity tools</strong> are specialized utilities designed to monitor networks, analyze software stacks, audit transport encryption, and verify domain parameters to safeguard assets against threat exposures and unauthorized access. The ReconShield Cybersecurity Intelligence Platform integrates these features into a unified dashboard, enabling developers, researchers, and network engineers to audit their digital boundaries passively without signing up.
            </p>

            {/* H2: What Is Threat Intelligence? */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">What Is Threat Intelligence?</h2>
            <p>
              Threat intelligence is the collection, correlation, and analysis of server data, network prefixes, registry records, and blacklists to anticipate, identify, and mitigate security exposures. Analyzing these parameters helps organizations evaluate host reputations, trace bad ASNs, and understand attack sources.
            </p>

            {/* H2: What Is Attack Surface Management? */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">What Is Attack Surface Management?</h2>
            <p>
              Attack Surface Management (ASM) is the continuous monitoring, discovery, and mitigation of an organization's public-facing digital assets. It ensures that all subdomains, certificates, open ports, and frameworks are documented and secured against threats.
            </p>

            {/* H2: What Is OSINT? */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">What Is OSINT?</h2>
            <p>
              Open Source Intelligence (OSINT) is a data gathering methodology that extracts configuration parameters from public-facing DNS registries, response headers, certificate databases, and regional IP directories. ReconShield uses passive OSINT to audit hosts safely with zero network impact.
            </p>

            {/* H2: What Is Security Posture Assessment? */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">What Is Security Posture Assessment?</h2>
            <p>
              A security posture assessment is a technical review of an organization's overall cybersecurity strength. By evaluating active TLS versions, response headers, DMARC records, and open interfaces, teams can catalog and resolve defensive gaps.
            </p>

            {/* H2: What Is Infrastructure Visibility? */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">What Is Infrastructure Visibility?</h2>
            <p>
              Infrastructure visibility is the ability to map and monitor all public network endpoints, subnets, and host headers. Having clear visibility prevents shadow IT exposures, helping teams discover unmanaged setups before they become targets.
            </p>

            {/* H2: What Is Exposure Management? */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">What Is Exposure Management?</h2>
            <p>
              Exposure management is the structured approach of identifying, rating, prioritizing, and patching security issues. Using standard CVSS frameworks, vulnerability managers can target high-risk exposures first, keeping perimeters aligned with NIST and OWASP guidelines.
            </p>

          </div>
        </section>

        {/* Security Scoring Matrix Table */}
        <section className="py-20 bg-[#0a0d14] border-b border-white/5">
          <div className="max-w-[1000px] mx-auto px-6 prose prose-invert max-w-none">
            <h2 className="text-3xl font-display font-bold text-white mb-6">ReconShield Diagnostics Classification Matrix</h2>
            <p className="text-gray-400 mb-8">
              Verify platform capabilities, passive operation parameters, and targeted security controls:
            </p>

            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0d1117] not-prose my-8">
              <table className="w-full text-left text-sm text-gray-400 border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.02] text-white font-mono uppercase text-xs">
                    <th className="p-4">Utility Module</th>
                    <th className="p-4 border-l border-white/10">Primary Objective</th>
                    <th className="p-4 border-l border-white/10">Operation Mode</th>
                    <th className="p-4 border-l border-white/10">Target Standard</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono text-xs">
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-4 font-semibold text-white">WHOIS Lookup</td>
                    <td className="p-4 border-l border-white/10 text-gray-300">Extract registration & registry status</td>
                    <td className="p-4 border-l border-white/10 text-emerald-400 font-semibold">100% Passive</td>
                    <td className="p-4 border-l border-white/10 text-gray-300">ICANN registry locks</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-4 font-semibold text-white">DNS Records Lookup</td>
                    <td className="p-4 border-l border-white/10 text-gray-300">Verify routing & DNSSEC security signatures</td>
                    <td className="p-4 border-l border-white/10 text-emerald-400 font-semibold">100% Passive</td>
                    <td className="p-4 border-l border-white/10 text-gray-300">IETF RFCs, DNSSEC</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-4 font-semibold text-white">SSL/TLS Checker</td>
                    <td className="p-4 border-l border-white/10 text-gray-300">Audit handshake TLS versions & ciphers</td>
                    <td className="p-4 border-l border-white/10 text-emerald-400 font-semibold">100% Passive</td>
                    <td className="p-4 border-l border-white/10 text-gray-300">CA/Browser Forum rules</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-4 font-semibold text-white">HTTP Headers Checker</td>
                    <td className="p-4 border-l border-white/10 text-gray-300">Verify response security headers (CSP/HSTS)</td>
                    <td className="p-4 border-l border-white/10 text-emerald-400 font-semibold">100% Passive</td>
                    <td className="p-4 border-l border-white/10 text-gray-300">OWASP Top 10 A05</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-4 font-semibold text-white">Email Security Checker</td>
                    <td className="p-4 border-l border-white/10 text-gray-300">Verify SPF, DKIM, and DMARC alignments</td>
                    <td className="p-4 border-l border-white/10 text-emerald-400 font-semibold">100% Passive</td>
                    <td className="p-4 border-l border-white/10 text-gray-300">IETF SPF, DKIM, DMARC</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-4 font-semibold text-white">Vulnerability Scanner</td>
                    <td className="p-4 border-l border-white/10 text-gray-300">Score configuration gaps & exposed ports</td>
                    <td className="p-4 border-l border-white/10 text-emerald-400 font-semibold">100% Passive</td>
                    <td className="p-4 border-l border-white/10 text-gray-300">NIST, CVSS, MITRE</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* E-E-A-T section */}
        <section className="py-20 border-b border-white/5">
          <div className="max-w-[1000px] mx-auto px-6">
            
            <div className="flex flex-col md:flex-row items-center gap-8 p-8 bg-gradient-to-r from-[#0d1117] to-surface-900 border border-white/10 rounded-3xl shadow-xl mb-16 font-sans">
              <div className="w-24 h-24 rounded-full bg-[#1a2332] border-2 border-cyan-500/30 flex items-center justify-center shrink-0 overflow-hidden">
                <Shield className="w-10 h-10 text-cyan-400" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 px-2 py-1 rounded bg-cyan-500/10 text-cyan-400 text-[10px] font-mono uppercase tracking-widest mb-2">
                  <Check className="w-3 h-3" /> Fact Checked & Verified
                </div>
                <h4 className="text-white font-bold text-xl mb-1">Surendra Reddy</h4>
                <p className="text-gray-400 text-xs font-mono uppercase tracking-wider mb-3">Cybersecurity Researcher & Founder, ReconShield</p>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  Surendra is an information security engineer specializing in vulnerability management, network diagnostics, and attack surface analytics. He built ReconShield to provide developers and security analysts with free, accessible, and passive infrastructure visibility tools.
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
                <h5 className="text-white font-bold mb-3 uppercase tracking-wider font-mono">Editorial Standards</h5>
                <p className="leading-relaxed">
                  ReconShield is committed to publishing accurate, technical, and objective cybersecurity analysis. Our documentation is created by credentialed security practitioners and undergoes strict reviews before publication.
                </p>
              </div>
              <div>
                <h5 className="text-white font-bold mb-3 uppercase tracking-wider font-mono">Threat Intelligence Methodology</h5>
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
              Last Updated: June 2026 | Reviewed by ReconShield Technical Board | Reference: NIST, OWASP, CISA, MITRE, IETF, ICANN
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 border-t border-white/5 bg-[#0a0d14]" aria-labelledby="faq-title">
          <div className="max-w-[900px] mx-auto px-6">
            <h2 id="faq-title" className="text-3xl font-display font-bold text-white mb-10 text-center">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 gap-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-surface-900 border border-white/10 rounded-2xl p-6 hover:border-cyan-500/20 transition-all font-sans">
                  <h3 className="text-lg font-bold text-white mb-3 font-display">{faq.q}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
