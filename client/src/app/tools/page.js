import React from 'react';
import Link from 'next/link';
import { 
  Shield, Globe, Server, Lock, Terminal, CheckCircle2, ChevronRight, 
  Search, Activity, Target, Network, Info, Check, AlertTriangle, 
  FileText, Send, HelpCircle, BookOpen, Key, Database, Clock, Cpu, Mail, ArrowUpRight, Zap
} from 'lucide-react';

import ToolsListContainer from '@/components/ToolsListContainer';

export const metadata = {
  title: "Free Cybersecurity Tools - OSINT & Security Toolkit | ReconShield",
  description: "Free cybersecurity tools for security professionals. WHOIS lookup, DNS checker, port scanner, SSL tester, and more. No registration required.",
  alternates: {
    canonical: "https://reconshield.in/tools",
  },
  keywords: [
    "cybersecurity tools", "free security tools", "osint tools", "penetration testing tools", 
    "whois lookup", "dns checker", "port scanner", "ssl checker", "vulnerability scanner"
  ],
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  openGraph: {
    title: "Free Cybersecurity Tools - OSINT & Security Toolkit",
    description: "Free cybersecurity tools for security professionals. WHOIS, DNS, port scanner, SSL tester, and more.",
    url: "https://reconshield.in/tools",
    type: "website",
    siteName: "ReconShield",
    images: [
      {
        url: "https://reconshield.in/og-image-tools.png",
        width: 1200,
        height: 630,
        alt: "Free Cybersecurity Tools - ReconShield"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Cybersecurity Tools - OSINT & Security Toolkit",
    description: "Free cybersecurity tools for security professionals. WHOIS, DNS, SSL, and more.",
    images: ["https://reconshield.in/og-image-tools.png"]
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

export default function ToolsHubPage() {
  const faqs = [
    {
      q: "What cybersecurity tools does ReconShield offer?",
      a: "ReconShield offers a suite of free cybersecurity tools including WHOIS Lookup, DNS Lookup, Subdomain Finder, IP Lookup, Port Scanner, Tech Detector, SSL Checker, HTTP Headers Checker, Email Security Checker, and Vulnerability Scanner."
    },
    {
      q: "Are these security tools really free to use?",
      a: "Yes, all security tools on ReconShield are 100% free to use. There are no subscriptions, hidden fees, or account registrations required to access our toolkit."
    },
    {
      q: "Who should use these cybersecurity tools?",
      a: "These tools are designed for security professionals, penetration testers, IT administrators, web developers, security researchers, and business owners looking to audit their digital perimeters."
    },
    {
      q: "What makes ReconShield tools different from competitors?",
      a: "ReconShield offers completely free, ad-free, and registration-free utilities that operate passively, ensuring no direct intrusion or load on target servers."
    },
    {
      q: "Can I use these tools for professional security assessments?",
      a: "Yes, ReconShield tools provide enterprise-grade data and passive OSINT capabilities, making them suitable for initial security assessments and penetration testing reconnaissance."
    },
    {
      q: "Do I need technical knowledge to use these tools?",
      a: "While the tools are easy to use—requiring only a domain or IP address—interpreting the detailed security configuration reports is most beneficial for technical users."
    },
    {
      q: "Are there any usage limits or restrictions?",
      a: "There are no strict limits on the number of domain or IP queries you can run, but automated scripts or scrapers are rate-limited to ensure platform stability."
    },
    {
      q: "How often are the tools updated?",
      a: "Our tools, vulnerability definitions, and security standards are updated regularly to track modern web protocols, security headers, and emerging CVE exposures."
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
        "name": "Free Cybersecurity Tools Platform",
        "url": "https://reconshield.in/tools",
        "description": "Comprehensive collection of free cybersecurity tools for security professionals, penetration testers, and IT administrators.",
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://reconshield.in/#website",
          "name": "ReconShield Website",
          "url": "https://reconshield.in"
        },
        "about": {
          "@type": "Thing",
          "name": "Cybersecurity Tools"
        }
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
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://api.reconshield.in" />

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
            Free Cybersecurity Tools &amp; Security Testing Platform
          </h1>
          
          <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed font-sans">
            Welcome to ReconShield's <strong>free cybersecurity tools</strong> platform. Our comprehensive toolkit provides essential security testing and OSINT tools for <strong>security professionals</strong>, penetration testers, and IT administrators. From WHOIS lookups and DNS analysis to vulnerability scanning and SSL testing, all tools are completely free with no registration required. Trusted by security researchers worldwide for reconnaissance, threat intelligence, and security assessments.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-gray-500 uppercase tracking-widest">
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> Passive OSINT Audits</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> Zero Installation</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> Free Public Diagnostics</div>
          </div>
        </div>
      </section>

      {/* Why Choose ReconShield Tools? Section */}
      <section className="py-20 bg-[#0a0d14] border-b border-white/5" aria-label="Why Choose ReconShield Tools">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-display font-bold text-white mb-4 text-center">
            Why Choose ReconShield Tools?
          </h2>
          <p className="text-gray-400 text-sm text-center max-w-xl mx-auto mb-12 leading-relaxed font-sans">
            Explore the key features that make ReconShield the preferred platform for security analysis and domain audits.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-surface-900 border border-white/5 rounded-2xl hover:border-cyan-500/30 transition-all group">
              <Check className="w-8 h-8 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-white font-bold text-base mb-2">100% Free</h3>
              <p className="text-gray-400 text-xs leading-relaxed">All tools are completely free with zero cost or subscription caps.</p>
            </div>
            <div className="p-6 bg-surface-900 border border-white/5 rounded-2xl hover:border-cyan-500/30 transition-all group">
              <Zap className="w-8 h-8 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-white font-bold text-base mb-2">No Registration</h3>
              <p className="text-gray-400 text-xs leading-relaxed">Start scanning domains and querying services immediately with no accounts.</p>
            </div>
            <div className="p-6 bg-surface-900 border border-white/5 rounded-2xl hover:border-cyan-500/30 transition-all group">
              <Shield className="w-8 h-8 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-white font-bold text-base mb-2">Privacy Focused</h3>
              <p className="text-gray-400 text-xs leading-relaxed">We respect user privacy and enforce a strict no-logging policy for targets.</p>
            </div>
            <div className="p-6 bg-surface-900 border border-white/5 rounded-2xl hover:border-cyan-500/30 transition-all group">
              <Cpu className="w-8 h-8 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-white font-bold text-base mb-2">Professional Grade</h3>
              <p className="text-gray-400 text-xs leading-relaxed">Enterprise-quality diagnostic results, standard risk scores, and detailed logs.</p>
            </div>
            <div className="p-6 bg-surface-900 border border-white/5 rounded-2xl hover:border-cyan-500/30 transition-all group">
              <Database className="w-8 h-8 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-white font-bold text-base mb-2">Comprehensive Suite</h3>
              <p className="text-gray-400 text-xs leading-relaxed">Over 10 specialized tools covering DNS, WHOIS, ports, SSL, and stacks.</p>
            </div>
            <div className="p-6 bg-surface-900 border border-white/5 rounded-2xl hover:border-cyan-500/30 transition-all group">
              <Clock className="w-8 h-8 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-white font-bold text-base mb-2">Always Updated</h3>
              <p className="text-gray-400 text-xs leading-relaxed">Continuously updated to support the newest protocols and security checks.</p>
            </div>
            <div className="p-6 bg-surface-900 border border-white/5 rounded-2xl hover:border-cyan-500/30 transition-all group">
              <Activity className="w-8 h-8 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-white font-bold text-base mb-2">Fast &amp; Reliable</h3>
              <p className="text-gray-400 text-xs leading-relaxed">Instant analysis delivering real-time logs and domain metadata in seconds.</p>
            </div>
            <div className="p-6 bg-surface-900 border border-white/5 rounded-2xl hover:border-cyan-500/30 transition-all group">
              <Info className="w-8 h-8 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-white font-bold text-base mb-2">Expert Recommendations</h3>
              <p className="text-gray-400 text-xs leading-relaxed">Includes actionable guidance and best practices to remediate found issues.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Security Tools Section */}
      <section className="py-20 bg-[#05080f] border-b border-white/5" aria-label="Featured Security Tools">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-display font-bold text-white mb-4 text-center">
            Featured Security Tools
          </h2>
          <p className="text-gray-400 text-sm text-center max-w-xl mx-auto mb-12 leading-relaxed font-sans">
            Our most popular and essential utilities for passive reconnaissance and infrastructure auditing.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <Link href="/tools/whois" className="p-6 bg-surface-900 border border-white/5 rounded-2xl hover:border-cyan-500/30 transition-all group flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider block mb-2">Most Popular Tool</span>
                <Globe className="w-8 h-8 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-white font-bold text-lg mb-2">🔍 WHOIS Lookup Tool</h3>
                <p className="text-gray-400 text-xs leading-relaxed mb-4">Query registrar parameters, dates, and ownership records.</p>
              </div>
              <span className="text-cyan-400 text-xs font-mono flex items-center gap-1 mt-auto">Run WHOIS Check <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform"/></span>
            </Link>

            <Link href="/tools/vulnerability-scanner" className="p-6 bg-surface-900 border border-white/5 rounded-2xl hover:border-cyan-500/30 transition-all group flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider block mb-2">Most Comprehensive</span>
                <Shield className="w-8 h-8 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-white font-bold text-lg mb-2">🛡️ Vulnerability Scanner</h3>
                <p className="text-gray-400 text-xs leading-relaxed mb-4">Scan endpoints for configuration weaknesses and exposures.</p>
              </div>
              <span className="text-cyan-400 text-xs font-mono flex items-center gap-1 mt-auto">Run Scan <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform"/></span>
            </Link>

            <Link href="/tools/ssl-checker" className="p-6 bg-surface-900 border border-white/5 rounded-2xl hover:border-cyan-500/30 transition-all group flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider block mb-2">Most Trusted</span>
                <Lock className="w-8 h-8 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-white font-bold text-lg mb-2">🔒 SSL Certificate Checker</h3>
                <p className="text-gray-400 text-xs leading-relaxed mb-4">Audit TLS validity, trust chains, and cryptographic ciphers.</p>
              </div>
              <span className="text-cyan-400 text-xs font-mono flex items-center gap-1 mt-auto">Check SSL <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform"/></span>
            </Link>

            <Link href="/tools/email-security" className="p-6 bg-surface-900 border border-white/5 rounded-2xl hover:border-cyan-500/30 transition-all group flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider block mb-2">Most Useful for Marketers</span>
                <Mail className="w-8 h-8 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-white font-bold text-lg mb-2">📧 Email Security Checker</h3>
                <p className="text-gray-400 text-xs leading-relaxed mb-4">Verify SPF, DKIM, and DMARC parameters to prevent spoofing.</p>
              </div>
              <span className="text-cyan-400 text-xs font-mono flex items-center gap-1 mt-auto">Check Email <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform"/></span>
            </Link>

          </div>
        </div>
      </section>

      {/* Tools Catalog Segment */}
      <section className="py-20 bg-[#0a0d14] border-b border-white/5" aria-label="Interactive Tools Catalog">
        <div className="max-w-[1200px] mx-auto px-6">
          <ToolsListContainer tools={tools} categories={categories} />
        </div>
      </section>

      {/* Categorized Tools List (Section 7) */}
      <section className="py-20 bg-[#05080f] border-b border-white/5" aria-label="Security Tools Directory Categories">
        <div className="max-w-5xl mx-auto px-6 font-sans">
          <h2 className="text-3xl font-display font-bold text-white mb-4 text-center">
            Cybersecurity Tools Categorized
          </h2>
          <p className="text-gray-400 text-sm text-center max-w-xl mx-auto mb-12 leading-relaxed">
            Find the right tools categorized by security assessment, domain intelligence, and network analysis.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-surface-900 border border-white/5">
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2 border-b border-white/5 pb-2">
                <Shield className="w-5 h-5 text-cyan-400" />
                Security Assessment Tools
              </h3>
              <p className="text-gray-400 text-xs leading-relaxed mb-4">
                Evaluate systems for configuration issues, scan network ports, and check client browser vulnerabilities.
              </p>
              <ul className="space-y-2.5 font-mono text-xs">
                <li><Link href="/tools/vulnerability-scanner" className="text-cyan-400 hover:underline flex items-center gap-1">Vulnerability Scanner <ChevronRight className="w-3 h-3"/></Link></li>
                <li><Link href="/tools/port-scanner" className="text-cyan-400 hover:underline flex items-center gap-1">Port Scanner <ChevronRight className="w-3 h-3"/></Link></li>
                <li><Link href="/tools/ssl-checker" className="text-cyan-400 hover:underline flex items-center gap-1">SSL Checker <ChevronRight className="w-3 h-3"/></Link></li>
                <li><Link href="/tools/http-headers" className="text-cyan-400 hover:underline flex items-center gap-1">HTTP Headers Checker <ChevronRight className="w-3 h-3"/></Link></li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-surface-900 border border-white/5">
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2 border-b border-white/5 pb-2">
                <Globe className="w-5 h-5 text-cyan-400" />
                Domain Intelligence Tools
              </h3>
              <p className="text-gray-400 text-xs leading-relaxed mb-4">
                Query registration histories, audit name servers, discover subdomains, and detect active technology stacks.
              </p>
              <ul className="space-y-2.5 font-mono text-xs">
                <li><Link href="/tools/whois" className="text-cyan-400 hover:underline flex items-center gap-1">WHOIS Lookup <ChevronRight className="w-3 h-3"/></Link></li>
                <li><Link href="/tools/dns-lookup" className="text-cyan-400 hover:underline flex items-center gap-1">DNS Lookup <ChevronRight className="w-3 h-3"/></Link></li>
                <li><Link href="/tools/subdomain-finder" className="text-cyan-400 hover:underline flex items-center gap-1">Subdomain Finder <ChevronRight className="w-3 h-3"/></Link></li>
                <li><Link href="/tools/tech-detector" className="text-cyan-400 hover:underline flex items-center gap-1">Technology Detector <ChevronRight className="w-3 h-3"/></Link></li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-surface-900 border border-white/5">
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2 border-b border-white/5 pb-2">
                <Network className="w-5 h-5 text-cyan-400" />
                Network Analysis Tools
              </h3>
              <p className="text-gray-400 text-xs leading-relaxed mb-4">
                Analyze IP geolocation routing boundaries and verify email authentication policies.
              </p>
              <ul className="space-y-2.5 font-mono text-xs">
                <li><Link href="/tools/ip-lookup" className="text-cyan-400 hover:underline flex items-center gap-1">IP Lookup <ChevronRight className="w-3 h-3"/></Link></li>
                <li><Link href="/tools/email-security" className="text-cyan-400 hover:underline flex items-center gap-1">Email Security Checker <ChevronRight className="w-3 h-3"/></Link></li>
              </ul>
            </div>
          </div>
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

      {/* Who Uses ReconShield Section (Section 8) */}
      <section className="py-20 bg-[#0a0d14] border-b border-white/5" aria-label="Who Uses ReconShield">
        <div className="max-w-5xl mx-auto px-6 font-sans">
          <h2 className="text-3xl font-display font-bold text-white mb-4 text-center">
            Who Uses ReconShield Tools?
          </h2>
          <p className="text-gray-400 text-sm text-center max-w-xl mx-auto mb-12 leading-relaxed">
            Our diagnostic platform serves security administrators, web creators, and enterprise threat researchers.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-surface-900 border border-white/5 rounded-2xl">
              <h3 className="text-white font-bold text-base mb-3 font-display">Security Professionals &amp; Penetration Testers</h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                Penetration testers and security auditors utilize our passive OSINT scanners to map target perimeters, gather initial footprint data, and verify security protocols during professional engagements.
              </p>
            </div>
            <div className="p-6 bg-surface-900 border border-white/5 rounded-2xl">
              <h3 className="text-white font-bold text-base mb-3 font-display">IT Administrators &amp; DevOps Teams</h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                System administrators and DevOps engineers use our tools to verify DNS configurations, test SSL/TLS certificate chains, audit port exposures, and ensure secure server deployments.
              </p>
            </div>
            <div className="p-6 bg-surface-900 border border-white/5 rounded-2xl">
              <h3 className="text-white font-bold text-base mb-3 font-display">Web Developers &amp; Agencies</h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                Front-end and back-end developers rely on ReconShield to detect stack library details, inspect response headers, and secure customer websites before launching.
              </p>
            </div>
            <div className="p-6 bg-[#0d1117] border border-cyan-500/10 rounded-2xl">
              <h3 className="text-white font-bold text-base mb-3 font-display">Security Researchers &amp; OSINT Analysts</h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                Open source intelligence analysts and security researchers leverage our domain queries to trace infrastructure routing, examine registry details, and track threats.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits Section (Section 9) */}
      <section className="py-20 bg-[#05080f] border-b border-white/5" aria-label="Key Benefits of ReconShield Tools">
        <div className="max-w-5xl mx-auto px-6 font-sans">
          <h2 className="text-3xl font-display font-bold text-white mb-4 text-center">
            Key Benefits of ReconShield Tools
          </h2>
          <p className="text-gray-400 text-sm text-center max-w-xl mx-auto mb-12 leading-relaxed">
            Maximize your perimeter defenses with our free security intelligence collection.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="text-white font-bold text-base mb-2">Comprehensive Security Coverage</h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                Scan everything from registrar records to server ports and email authorization.
              </p>
            </div>
            <div>
              <h3 className="text-white font-bold text-base mb-2">Time-Saving Efficiency</h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                Run multiple connected diagnostics in seconds instead of querying multiple separate resources.
              </p>
            </div>
            <div>
              <h3 className="text-white font-bold text-base mb-2">Professional Results</h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                Get clean, structured JSON-like reports, CVSS ratings, and actionable recommendations.
              </p>
            </div>
            <div>
              <h3 className="text-white font-bold text-base mb-2">Cost-Free Security Testing</h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                Access enterprise-grade tools without paying expensive licensing or software subscription fees.
              </p>
            </div>
            <div>
              <h3 className="text-white font-bold text-base mb-2">Privacy &amp; Trust</h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                We respect user privacy; all checks run passively and we do not store target domains, search history, or personal logs.
              </p>
            </div>
            <div>
              <h3 className="text-white font-bold text-base mb-2">Regular Updates</h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                Our scanning signatures and header evaluations track the newest industry security guidelines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Getting Started Section (Section 10) */}
      <section className="py-20 bg-[#0a0d14] border-b border-white/5" aria-label="Getting Started with ReconShield Tools">
        <div className="max-w-5xl mx-auto px-6 font-sans">
          <h2 className="text-3xl font-display font-bold text-white mb-4 text-center">
            Getting Started with ReconShield Tools
          </h2>
          <p className="text-gray-400 text-sm text-center max-w-xl mx-auto mb-12 leading-relaxed">
            Begin auditing your external infrastructure footprint in four simple steps.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
            <div className="p-6 bg-surface-900 border border-white/5 rounded-2xl">
              <span className="text-xs font-mono text-cyan-400 block mb-2 font-bold uppercase tracking-wider">Step 1</span>
              <h3 className="text-white font-bold text-base mb-2">Choose Your Tool</h3>
              <p className="text-gray-400 text-xs leading-relaxed">Browse our directory and select the tool matching your requirement (e.g., DNS, SSL, Ports).</p>
            </div>
            <div className="p-6 bg-surface-900 border border-white/5 rounded-2xl">
              <span className="text-xs font-mono text-cyan-400 block mb-2 font-bold uppercase tracking-wider">Step 2</span>
              <h3 className="text-white font-bold text-base mb-2">Enter Your Target</h3>
              <p className="text-gray-400 text-xs leading-relaxed">Input the target domain name or IP address in the input field.</p>
            </div>
            <div className="p-6 bg-surface-900 border border-white/5 rounded-2xl">
              <span className="text-xs font-mono text-cyan-400 block mb-2 font-bold uppercase tracking-wider">Step 3</span>
              <h3 className="text-white font-bold text-base mb-2">Get Instant Results</h3>
              <p className="text-gray-400 text-xs leading-relaxed">Click run and view the structured telemetry, configuration scores, and logs in seconds.</p>
            </div>
            <div className="p-6 bg-surface-900 border border-white/5 rounded-2xl">
              <span className="text-xs font-mono text-cyan-400 block mb-2 font-bold uppercase tracking-wider">Step 4</span>
              <h3 className="text-white font-bold text-base mb-2">Take Action</h3>
              <p className="text-gray-400 text-xs leading-relaxed">Use the remediation recommendations to patch weaknesses and secure your systems.</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 max-w-2xl mx-auto text-center">
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-widest font-mono">Popular Starting Points</h4>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/tools/whois" className="px-3.5 py-1.5 rounded-lg bg-surface-900 border border-white/5 text-gray-300 hover:text-white hover:border-cyan-500/20 text-xs transition-colors">WHOIS Lookup</Link>
              <Link href="/tools/dns-lookup" className="px-3.5 py-1.5 rounded-lg bg-surface-900 border border-white/5 text-gray-300 hover:text-white hover:border-cyan-500/20 text-xs transition-colors">DNS Lookup</Link>
              <Link href="/tools/ssl-checker" className="px-3.5 py-1.5 rounded-lg bg-surface-900 border border-white/5 text-gray-300 hover:text-white hover:border-cyan-500/20 text-xs transition-colors">SSL Checker</Link>
              <Link href="/tools/http-headers" className="px-3.5 py-1.5 rounded-lg bg-surface-900 border border-white/5 text-gray-300 hover:text-white hover:border-cyan-500/20 text-xs transition-colors">HTTP Headers Checker</Link>
              <Link href="/tools/vulnerability-scanner" className="px-3.5 py-1.5 rounded-lg bg-surface-900 border border-white/5 text-gray-300 hover:text-white hover:border-cyan-500/20 text-xs transition-colors">Vulnerability Scanner</Link>
              <Link href="/tools/port-scanner" className="px-3.5 py-1.5 rounded-lg bg-surface-900 border border-white/5 text-gray-300 hover:text-white hover:border-cyan-500/20 text-xs transition-colors">Port Scanner</Link>
              <Link href="/tools/email-security" className="px-3.5 py-1.5 rounded-lg bg-surface-900 border border-white/5 text-gray-300 hover:text-white hover:border-cyan-500/20 text-xs transition-colors">Email Security Checker</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Comparison Section (Section 11) */}
      <section className="py-20 bg-[#05080f] border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 font-sans">
          <h2 className="text-3xl font-display font-bold text-white mb-4 text-center">
            ReconShield vs Other Security Tool Platforms
          </h2>
          <p className="text-gray-400 text-sm text-center max-w-xl mx-auto mb-12 leading-relaxed">
            See how ReconShield delivers more security intelligence value with zero pricing or registration constraints.
          </p>

          <div className="overflow-x-auto rounded-3xl border border-white/10 bg-[#0d1117] max-w-3xl mx-auto shadow-xl">
            <table className="w-full text-left text-sm text-gray-400 border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02] text-white font-mono uppercase text-xs">
                  <th className="p-5">Feature</th>
                  <th className="p-5 border-l border-white/10 text-cyan-400">ReconShield</th>
                  <th className="p-5 border-l border-white/10">Other Platforms</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-mono text-xs">
                <tr className="hover:bg-white/[0.01]">
                  <td className="p-5 text-white font-semibold font-sans">Completely Free</td>
                  <td className="p-5 border-l border-white/10 text-emerald-400 font-bold">Yes (No Limits)</td>
                  <td className="p-5 border-l border-white/10 text-yellow-500 font-bold">Limited / Paid Upgrades</td>
                </tr>
                <tr className="hover:bg-white/[0.01]">
                  <td className="p-5 text-white font-semibold font-sans">No Registration</td>
                  <td className="p-5 border-l border-white/10 text-emerald-400 font-bold">Yes</td>
                  <td className="p-5 border-l border-white/10 text-red-500 font-bold">Required for features</td>
                </tr>
                <tr className="hover:bg-white/[0.01]">
                  <td className="p-5 text-white font-semibold font-sans">No Ads</td>
                  <td className="p-5 border-l border-white/10 text-emerald-400 font-bold">Yes</td>
                  <td className="p-5 border-l border-white/10 text-red-500 font-bold">Banner-heavy layout</td>
                </tr>
                <tr className="hover:bg-white/[0.01]">
                  <td className="p-5 text-white font-semibold font-sans">Tool Variety</td>
                  <td className="p-5 border-l border-white/10 text-emerald-400 font-bold">10+ Connected Tools</td>
                  <td className="p-5 border-l border-white/10 text-gray-400">Often single utilities</td>
                </tr>
                <tr className="hover:bg-white/[0.01]">
                  <td className="p-5 text-white font-semibold font-sans">Privacy Focused</td>
                  <td className="p-5 border-l border-white/10 text-emerald-400 font-bold">Yes (No logs saved)</td>
                  <td className="p-5 border-l border-white/10 text-red-500 font-bold">Tracks target domains</td>
                </tr>
                <tr className="hover:bg-white/[0.01]">
                  <td className="p-5 text-white font-semibold font-sans">Professional Grade</td>
                  <td className="p-5 border-l border-white/10 text-emerald-400 font-bold">Yes (CVSS &amp; details)</td>
                  <td className="p-5 border-l border-white/10 text-gray-400">Basic outputs</td>
                </tr>
                <tr className="hover:bg-white/[0.01]">
                  <td className="p-5 text-white font-semibold font-sans">Regular Updates</td>
                  <td className="p-5 border-l border-white/10 text-emerald-400 font-bold">Yes</td>
                  <td className="p-5 border-l border-white/10 text-yellow-500 font-bold">Infrequent update cycle</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Main Educational Guide */}
      <section className="py-20 bg-[#05080f] border-b border-white/5">
        <div className="max-w-[1000px] mx-auto px-6 prose prose-invert max-w-none prose-p:leading-relaxed prose-p:text-gray-400 prose-headings:text-white prose-a:text-cyan-400 hover:prose-a:text-cyan-300">
          
          <h2 className="text-3xl font-display font-bold mt-0 mb-6 flex items-center gap-3">
            <Key className="w-8 h-8 text-cyan-400" />
            What Are Cybersecurity Tools?
          </h2>
          <p>
            <strong>Cybersecurity tools</strong> are specialized utilities designed to monitor networks, analyze software stacks, audit transport encryption, and verify domain parameters to safeguard assets against threat exposures and unauthorized access. The ReconShield Cybersecurity Intelligence Platform integrates these features into a unified dashboard, enabling developers, researchers, and network engineers to audit their digital boundaries passively without signing up.
          </p>

          <h2 className="text-3xl font-display font-bold mt-16 mb-6">What Is Threat Intelligence?</h2>
          <p>
            Threat intelligence is the collection, correlation, and analysis of server data, network prefixes, registry records, and blacklists to anticipate, identify, and mitigate security exposures. Analyzing these parameters helps organizations evaluate host reputations, trace bad ASNs, and understand attack sources.
          </p>

          <h2 className="text-3xl font-display font-bold mt-16 mb-6">What Is Attack Surface Management?</h2>
          <p>
            Attack Surface Management (ASM) is the continuous monitoring, discovery, and mitigation of an organization's public-facing digital assets. It ensures that all subdomains, certificates, open ports, and frameworks are documented and secured against threats.
          </p>

          <h2 className="text-3xl font-display font-bold mt-16 mb-6">What Is OSINT?</h2>
          <p>
            Open Source Intelligence (OSINT) is a data gathering methodology that extracts configuration parameters from public-facing DNS registries, response headers, certificate databases, and regional IP directories. ReconShield uses passive OSINT to audit hosts safely with zero network impact.
          </p>

          <h2 className="text-3xl font-display font-bold mt-16 mb-6">What Is Security Posture Assessment?</h2>
          <p>
            A security posture assessment is a technical review of an organization's overall cybersecurity strength. By evaluating active TLS versions, response headers, DMARC records, and open interfaces, teams can catalog and resolve defensive gaps.
          </p>

          <h2 className="text-3xl font-display font-bold mt-16 mb-6">What Is Infrastructure Visibility?</h2>
          <p>
            Infrastructure visibility is the ability to map and monitor all public network endpoints, subnets, and host headers. Having clear visibility prevents shadow IT exposures, helping teams discover unmanaged setups before they become targets.
          </p>

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

      {/* E-E-A-T Section */}
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

      {/* FAQ Content Section (Section 12) */}
      <section className="py-20 border-t border-white/5 bg-[#0a0d14]" aria-labelledby="faq-title">
        <div className="max-w-[900px] mx-auto px-6">
          <h2 id="faq-title" className="text-3xl font-display font-bold text-white mb-4 text-center">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 text-sm text-center max-w-xl mx-auto mb-12 leading-relaxed font-sans">
            Find answers to common questions about our free cybersecurity tools, limits, and security assessments.
          </p>
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

    </>
  );
}
