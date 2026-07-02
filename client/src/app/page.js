import React from 'react';
import Link from 'next/link';
import { client, homepageBlogQuery } from '@/utils/sanity';
import { 
  Shield, Target, Activity, Cpu, Network, Search, Terminal, Lock, 
  Layers, Mail, CheckCircle2, Globe, Database, ArrowRight, Clock, 
  Award, ChevronRight, Check, Send, Zap, ListTodo, ShieldAlert,
  Server, ArrowUpRight
} from 'lucide-react';
import ResponsiveImage from '@/components/ResponsiveImage';

import {
  DynamicNewsletterForm,
  DynamicTopActiveThreats,
  DynamicHeroSocVisual,
  DynamicCommandCenter,
  DynamicSecurityWorkflow,
  DynamicIntelligenceModules
} from '@/components/DynamicWidgets';
import AdsterraBanner from '@/components/ads/AdsterraBanner';
import AdsterraNative from '@/components/ads/AdsterraNative';

export const metadata = {
  title: "ReconShield - Free Cybersecurity Tools & Threat Intelligence",
  description: "Free cybersecurity tools and threat intelligence platform. OSINT research, security testing, vulnerability scanning, and domain intelligence for professionals.",
  alternates: {
    canonical: "https://reconshield.in",
  },
  keywords: [
    "reconshield", "cybersecurity tools", "free security tools", "threat intelligence platform", "osint tools",
    "security testing platform", "reconnaissance tools", "security research tools", "penetration testing tools", "domain intelligence"
  ],
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  openGraph: {
    title: "ReconShield - Free Cybersecurity Tools & Threat Intelligence",
    description: "Professional-grade security testing and OSINT tools. WHOIS, DNS, SSL, vulnerability scanning, and more. Completely free.",
    url: "https://reconshield.in",
    type: "website",
    siteName: "ReconShield",
    images: [
      {
        url: "https://reconshield.in/og-image.png",
        width: 1200,
        height: 630,
        alt: "ReconShield - Free Cybersecurity Tools & Threat Intelligence"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "ReconShield - Free Cybersecurity Tools & Threat Intelligence",
    description: "Professional-grade security testing and OSINT tools. Completely free, no registration.",
    images: ["https://reconshield.in/og-image.png"]
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

// Fallback high-quality editorial articles in case Sanity fetch returns empty
const MOCK_POSTS = [
  {
    _id: "mock-1",
    title: "The Anatomy of Passive OSINT: Mapping Infrastructure Without Noise",
    slug: "anatomy-of-passive-osint",
    publishedAt: "2026-05-28T09:00:00Z",
    excerpt: "Learn how modern threat hunters map enterprise footprints entirely through cached DNS, transparency logs, and global RIR data without triggering network intrusion detection systems.",
    categories: [{ title: "OSINT & Analysis" }],
    author: { name: "Surendra Reddy", slug: "surendra-reddy" },
    estimatedWordCount: 1520
  },
  {
    _id: "mock-2",
    title: "Securing BGP Route Leaks: Why Large ASNs Fall Victim to Hijacking Campaigns",
    slug: "securing-bgp-route-leaks",
    publishedAt: "2026-05-25T11:30:00Z",
    excerpt: "A deep dive into Autonomous System Number (ASN) path verification, peer filtering mechanisms, and the crucial role of RPKI repository deployment in preventing routing exposures.",
    categories: [{ title: "Threat Intelligence" }],
    author: { name: "Surendra Reddy", slug: "surendra-reddy" },
    estimatedWordCount: 1840
  },
  {
    _id: "mock-3",
    title: "Demystifying SPF, DKIM, and DMARC: A Blueprint for Email Spoofing Defense",
    slug: "spf-dkim-dmarc-blueprint",
    publishedAt: "2026-05-22T08:15:00Z",
    excerpt: "Misconfigured mail records remain the leading vector for business email compromise (BEC). We breakdown how to implement strict authentication protocols to protect corporate brands.",
    categories: [{ title: "Web Security" }],
    author: { name: "Surendra Reddy", slug: "surendra-reddy" },
    estimatedWordCount: 1390
  },
  {
    _id: "mock-4",
    title: "OWASP Top 10 Web Configuration Audits: Hardening HTTP Headers",
    slug: "owasp-http-headers-hardening",
    publishedAt: "2026-05-19T14:00:00Z",
    excerpt: "Why Content-Security-Policy (CSP), Strict-Transport-Security, and X-Frame-Options are the first line of defense against cross-site scripting and modern clickjacking attacks.",
    categories: [{ title: "Web Security" }],
    author: { name: "Surendra Reddy", slug: "surendra-reddy" },
    estimatedWordCount: 1250
  },
  {
    _id: "mock-5",
    title: "The Critical Role of SSL/TLS Ciphers in Regulatory Compliance Frameworks",
    slug: "ssl-tls-regulatory-compliance",
    publishedAt: "2026-05-15T10:45:00Z",
    excerpt: "Outdated transport protocols are direct compliance violations under GDPR and PCI-DSS. Here is how to perform passive checks and audit your cryptography trust chains.",
    categories: [{ title: "Vulnerability Research" }],
    author: { name: "Surendra Reddy", slug: "surendra-reddy" },
    estimatedWordCount: 2100
  },
  {
    _id: "mock-6",
    title: "Shadow IT Discovery: Passive Identification of Exposed Database and Administrative Ports",
    slug: "shadow-it-exposed-ports",
    publishedAt: "2026-05-10T16:20:00Z",
    excerpt: "Exposing SSH, RDP, or raw database interfaces to the public internet presents catastrophic risk. We explore how to inventory assets using regional passive telemetry databases.",
    categories: [{ title: "Network Security" }],
    author: { name: "Surendra Reddy", slug: "surendra-reddy" },
    estimatedWordCount: 1670
  }
];

export default async function Page() {
  let posts = [];
  try {
    posts = await client.fetch(homepageBlogQuery);
  } catch (error) {
    console.error('Error fetching blog posts for homepage:', error);
  }

  if (!posts || posts.length === 0) {
    posts = MOCK_POSTS;
  }

  const featuredPost = posts[0] || MOCK_POSTS[0];
  const secondaryArticles = posts.slice(1, 4).length > 0 ? posts.slice(1, 4) : MOCK_POSTS.slice(1, 4);

  const getInitials = (name) => {
    if (!name) return 'SR';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase();
  };

  const calculateReadTime = (post) => {
    if (post.estimatedWordCount) return Math.max(1, Math.ceil(post.estimatedWordCount / 5 / 200));
    return 6;
  };

  const schemas = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://reconshield.in/#website",
        "url": "https://reconshield.in",
        "name": "ReconShield",
        "description": "Free cybersecurity tools and threat intelligence platform",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://reconshield.in/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "Organization",
        "@id": "https://reconshield.in/#organization",
        "name": "ReconShield",
        "url": "https://reconshield.in",
        "logo": {
          "@type": "ImageObject",
          "url": "https://reconshield.in/logo.png"
        },
        "description": "Free cybersecurity tools and threat intelligence platform for security professionals."
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://reconshield.in/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://reconshield.in"
          }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <link rel="dns-prefetch" href="https://api.reconshield.in" />

      <div className="bg-[#05080f] min-h-screen text-white">
        
        {/* ================= SECTION 3: HERO SECTION ================= */}
        <section className="relative pt-32 pb-24 overflow-hidden border-b border-white/5 bg-[#070b12]">
          <div className="absolute inset-0 bg-grid opacity-[0.2] pointer-events-none -z-10" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-full bg-[#00ff88]/5 blur-[120px] rounded-full pointer-events-none -z-10" />
          <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-cyber-500/5 blur-[100px] rounded-full pointer-events-none -z-10" />

          <div className="max-w-[1200px] mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-7 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00ff88]/10 border border-[#00ff88]/20 text-[#00ff88] text-[10px] font-mono uppercase tracking-widest">
                  <Activity className="w-3.5 h-3.5 animate-pulse" />
                  <span>Free Security &amp; OSINT Audits</span>
                </div>
                
                {/* Homepage H1 */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight leading-[1.1] uppercase">
                  ReconShield - <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff88] to-[#38bdf8]">Free Cybersecurity Tools</span> &amp; Threat Intelligence Platform
                </h1>
                
                <p className="text-gray-400 text-sm sm:text-base font-sans leading-relaxed max-w-xl">
                  Professional-grade security testing and OSINT reconnaissance tools for security researchers, penetration testers, and IT professionals. Completely free, no registration required.
                </p>
                
                {/* Feature Highlights */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="flex items-center gap-2 text-xs text-gray-300 font-mono">
                    <Check className="w-4 h-4 text-[#00ff88] shrink-0" />
                    <span>10+ Free Security Tools</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-300 font-mono">
                    <Check className="w-4 h-4 text-[#00ff88] shrink-0" />
                    <span>Comprehensive Testing</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-300 font-mono">
                    <Check className="w-4 h-4 text-[#00ff88] shrink-0" />
                    <span>No Registration Required</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-300 font-mono">
                    <Check className="w-4 h-4 text-[#00ff88] shrink-0" />
                    <span>Trusted by Professionals</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <Link href="/tools" className="px-6 py-3.5 bg-[#00ff88] hover:bg-[#00e077] text-surface-950 text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-all shadow-[0_0_15px_rgba(0,255,136,0.15)] flex items-center gap-1.5 cursor-pointer">
                    <span>Explore Tools</span>
                    <ArrowRight className="w-4 h-4 text-surface-950" />
                  </Link>
                  <Link href="/scanner" className="px-6 py-3.5 bg-surface-900 hover:bg-surface-800 text-white border border-white/10 hover:border-white/20 text-xs font-mono uppercase tracking-widest rounded-xl transition-all cursor-pointer">
                    Run Security Scan
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5 min-h-[352px] flex items-center justify-center">
                <DynamicHeroSocVisual />
              </div>

            </div>
          </div>
        </section>

        <AdsterraBanner type="728x90" />

        <DynamicCommandCenter />

        {/* ================= SECTION 7: FEATURED SECURITY TOOLS ================= */}
        <section className="py-24 bg-[#05080f] border-b border-white/5" aria-label="Featured Tools">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="text-center mb-16 space-y-2">
              <span className="font-mono text-xs text-[#00ff88] font-bold uppercase tracking-widest">// ESSENTIAL UTILITIES</span>
              <h2 className="text-3xl font-display font-bold text-white uppercase tracking-wide">Featured Security Tools</h2>
              <p className="text-gray-400 text-sm max-w-xl mx-auto leading-relaxed">
                Run targeted diagnostic checks on specific network protocols, registrar data, or configurations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Link href="/tools/whois" className="group p-6 bg-surface-900 border border-white/5 rounded-2xl hover:border-cyan-500/30 transition-all flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-surface-950 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-105 transition-transform border border-white/5">
                    <Search className="w-5 h-5" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2 font-display uppercase tracking-wide group-hover:text-cyan-400 transition-colors">WHOIS Lookup</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">Domain ownership and registration intelligence.</p>
                </div>
                <div className="pt-4 border-t border-white/5 mt-6 flex items-center justify-between text-xs font-mono text-cyan-400">
                  <span>Open Tool</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </Link>

              <Link href="/tools/vulnerability-scanner" className="group p-6 bg-surface-900 border border-white/5 rounded-2xl hover:border-cyan-500/30 transition-all flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-surface-950 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-105 transition-transform border border-white/5">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2 font-display uppercase tracking-wide group-hover:text-cyan-400 transition-colors">Vulnerability Scanner</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">Identify vulnerabilities and weaknesses.</p>
                </div>
                <div className="pt-4 border-t border-white/5 mt-6 flex items-center justify-between text-xs font-mono text-cyan-400">
                  <span>Open Tool</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </Link>

              <Link href="/tools/ssl-checker" className="group p-6 bg-surface-900 border border-white/5 rounded-2xl hover:border-cyan-500/30 transition-all flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-surface-950 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-105 transition-transform border border-white/5">
                    <Lock className="w-5 h-5" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2 font-display uppercase tracking-wide group-hover:text-cyan-400 transition-colors">SSL Certificate Checker</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">Validate SSL/TLS certificates.</p>
                </div>
                <div className="pt-4 border-t border-white/5 mt-6 flex items-center justify-between text-xs font-mono text-cyan-400">
                  <span>Open Tool</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </Link>

              <Link href="/tools/email-security" className="group p-6 bg-surface-900 border border-white/5 rounded-2xl hover:border-cyan-500/30 transition-all flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-surface-950 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-105 transition-transform border border-white/5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2 font-display uppercase tracking-wide group-hover:text-cyan-400 transition-colors">Email Security Checker</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">SPF, DKIM and DMARC validation.</p>
                </div>
                <div className="pt-4 border-t border-white/5 mt-6 flex items-center justify-between text-xs font-mono text-cyan-400">
                  <span>Open Tool</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </Link>

              <Link href="/tools/dns-lookup" className="group p-6 bg-surface-900 border border-white/5 rounded-2xl hover:border-cyan-500/30 transition-all flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-surface-950 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-105 transition-transform border border-white/5">
                    <Globe className="w-5 h-5" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2 font-display uppercase tracking-wide group-hover:text-cyan-400 transition-colors">DNS Lookup</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">Analyze DNS records.</p>
                </div>
                <div className="pt-4 border-t border-white/5 mt-6 flex items-center justify-between text-xs font-mono text-cyan-400">
                  <span>Open Tool</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </Link>

              <Link href="/tools/port-scanner" className="group p-6 bg-surface-900 border border-white/5 rounded-2xl hover:border-cyan-500/30 transition-all flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-surface-950 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-105 transition-transform border border-white/5">
                    <Terminal className="w-5 h-5" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2 font-display uppercase tracking-wide group-hover:text-cyan-400 transition-colors">Port Scanner</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">Detect open ports and exposed services.</p>
                </div>
                <div className="pt-4 border-t border-white/5 mt-6 flex items-center justify-between text-xs font-mono text-cyan-400">
                  <span>Open Tool</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </Link>
            </div>
          </div>
        </section>

        <AdsterraNative />

        {/* ================= SECTION 8: WHY CHOOSE RECONSHIELD ================= */}
        <section className="py-24 bg-[#0a0d14] border-b border-white/5" aria-label="Why Choose ReconShield">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="text-center mb-16 space-y-2">
              <span className="font-mono text-xs text-[#00ff88] font-bold uppercase tracking-widest">// VALUE STATEMENT</span>
              <h2 className="text-3xl font-display font-bold text-white uppercase tracking-wide">Why Choose ReconShield?</h2>
              <p className="text-gray-400 text-sm max-w-xl mx-auto leading-relaxed">
                Discover the engineering values and operational criteria that define our diagnostic platform.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 font-sans">
              <div className="p-6 bg-surface-900 border border-white/5 rounded-2xl">
                <Check className="w-8 h-8 text-[#00ff88] mb-4" />
                <h3 className="text-white font-bold text-lg mb-2 font-display">100% Free &amp; No Registration</h3>
                <p className="text-gray-400 text-xs leading-relaxed">
                  Access our entire cybersecurity toolkit instantly. No credit card, no sign-up, and no usage limits.
                </p>
              </div>

              <div className="p-6 bg-surface-900 border border-white/5 rounded-2xl">
                <Check className="w-8 h-8 text-[#00ff88] mb-4" />
                <h3 className="text-white font-bold text-lg mb-2 font-display">Comprehensive Tool Suite</h3>
                <p className="text-gray-400 text-xs leading-relaxed">
                  Audits SSL/TLS configs, DNS zone records, security headers, active ports, email authentication, and website vulnerabilities.
                </p>
              </div>

              <div className="p-6 bg-surface-900 border border-white/5 rounded-2xl">
                <Check className="w-8 h-8 text-[#00ff88] mb-4" />
                <h3 className="text-white font-bold text-lg mb-2 font-display">Privacy Focused</h3>
                <p className="text-gray-400 text-xs leading-relaxed">
                  We respect your privacy. No domain queries, IP addresses, or scan outputs are logged or stored.
                </p>
              </div>

              <div className="p-6 bg-surface-900 border border-white/5 rounded-2xl">
                <Check className="w-8 h-8 text-[#00ff88] mb-4" />
                <h3 className="text-white font-bold text-lg mb-2 font-display">Professional Grade Results</h3>
                <p className="text-gray-400 text-xs leading-relaxed">
                  Enterprise-grade analysis reports aligned with industry frameworks including OWASP, NIST, and CVSS guidelines.
                </p>
              </div>

              <div className="p-6 bg-surface-900 border border-white/5 rounded-2xl">
                <Check className="w-8 h-8 text-[#00ff88] mb-4" />
                <h3 className="text-white font-bold text-lg mb-2 font-display">Built by Security Professionals</h3>
                <p className="text-gray-400 text-xs leading-relaxed">
                  Designed and verified by active cybersecurity engineers to provide actionable security telemetry.
                </p>
              </div>

              <div className="p-6 bg-surface-900 border border-white/5 rounded-2xl">
                <Check className="w-8 h-8 text-[#00ff88] mb-4" />
                <h3 className="text-white font-bold text-lg mb-2 font-display">Always Up-To-Date</h3>
                <p className="text-gray-400 text-xs leading-relaxed">
                  Scanning engines and signature databases are continuously updated to check for new security disclosures.
                </p>
              </div>

              <div className="p-6 bg-surface-900 border border-white/5 rounded-2xl">
                <Check className="w-8 h-8 text-[#00ff88] mb-4" />
                <h3 className="text-white font-bold text-lg mb-2 font-display">Fast &amp; Reliable</h3>
                <p className="text-gray-400 text-xs leading-relaxed">
                  High-performance diagnostics with real-time checks returning initial results in seconds.
                </p>
              </div>

              <div className="p-6 bg-surface-900 border border-white/5 rounded-2xl">
                <Check className="w-8 h-8 text-[#00ff88] mb-4" />
                <h3 className="text-white font-bold text-lg mb-2 font-display">Educational Resources</h3>
                <p className="text-gray-400 text-xs leading-relaxed">
                  In-depth threat research briefings, CVE writeups, and security policies help you remediate issues.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= SECTION 9: TRUST SECTION ================= */}
        <section className="py-24 bg-[#05080f] border-b border-white/5" aria-label="Trusted Audiences">
          <div className="max-w-[1000px] mx-auto px-6 font-sans">
            <h2 className="text-3xl font-display font-bold text-white mb-10 text-center uppercase tracking-wide">
              Trusted by Security Professionals Worldwide
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="bg-surface-900 border border-white/5 p-8 rounded-3xl">
                <h3 className="text-lg font-bold text-[#00ff88] font-display mb-4 uppercase tracking-wider">Used by</h3>
                <ul className="grid grid-cols-2 gap-4 text-xs font-mono text-gray-300">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88]" /> Security Researchers
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88]" /> Ethical Hackers
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88]" /> Penetration Testers
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88]" /> IT Administrators
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88]" /> DevOps Teams
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88]" /> Compliance Professionals
                  </li>
                </ul>
              </div>

              <div className="bg-surface-900 border border-white/5 p-8 rounded-3xl">
                <h3 className="text-lg font-bold text-[#38bdf8] font-display mb-4 uppercase tracking-wider">Supported Industries</h3>
                <ul className="grid grid-cols-2 gap-4 text-xs font-mono text-gray-300">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" /> Finance
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" /> Healthcare
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" /> Technology
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" /> Education
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" /> Government
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" /> E-commerce
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ================= SECTION 10: USE CASES ================= */}
        <section className="py-24 bg-[#0a0d14] border-b border-white/5" aria-label="Use cases">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="text-center mb-16 space-y-2">
              <span className="font-mono text-xs text-[#00ff88] font-bold uppercase tracking-widest">// DEPLOYMENT CAPABILITIES</span>
              <h2 className="text-3xl font-display font-bold text-white uppercase tracking-wide">What You Can Do With ReconShield</h2>
              <p className="text-gray-400 text-sm max-w-xl mx-auto leading-relaxed">
                Utilize our framework across a variety of infrastructure audit workflows.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 font-sans">
              <div className="p-6 bg-surface-900 border border-white/5 rounded-2xl">
                <Search className="w-8 h-8 text-[#00ff88] mb-4" />
                <h3 className="text-white font-bold text-base mb-2 font-display">Security Reconnaissance &amp; OSINT</h3>
                <p className="text-gray-400 text-xs leading-relaxed">
                  Gather public details about nameservers, subdomains, registration history, and IP spaces passively.
                </p>
              </div>

              <div className="p-6 bg-surface-900 border border-white/5 rounded-2xl">
                <ShieldAlert className="w-8 h-8 text-[#00ff88] mb-4" />
                <h3 className="text-white font-bold text-base mb-2 font-display">Vulnerability Assessment</h3>
                <p className="text-gray-400 text-xs leading-relaxed">
                  Identify security weaknesses, deprecated TLS protocols, and exposed administrative interfaces.
                </p>
              </div>

              <div className="p-6 bg-surface-900 border border-white/5 rounded-2xl">
                <Lock className="w-8 h-8 text-[#00ff88] mb-4" />
                <h3 className="text-white font-bold text-base mb-2 font-display">SSL/TLS Testing</h3>
                <p className="text-gray-400 text-xs leading-relaxed">
                  Audit certificate expiration, chain configurations, key lengths, and negotiated cryptographic ciphers.
                </p>
              </div>

              <div className="p-6 bg-surface-900 border border-white/5 rounded-2xl">
                <Send className="w-8 h-8 text-[#00ff88] mb-4" />
                <h3 className="text-white font-bold text-base mb-2 font-display">Email Deliverability Testing</h3>
                <p className="text-gray-400 text-xs leading-relaxed">
                  Validate anti-spoofing policies (SPF/DKIM/DMARC) to prevent domain spoofing and verify delivery profiles.
                </p>
              </div>

              <div className="p-6 bg-surface-900 border border-white/5 rounded-2xl">
                <Globe className="w-8 h-8 text-[#00ff88] mb-4" />
                <h3 className="text-white font-bold text-base mb-2 font-display">DNS Management</h3>
                <p className="text-gray-400 text-xs leading-relaxed">
                  Trace nameserver authority, zone configurations, and DNSSEC cryptographic signature validity.
                </p>
              </div>

              <div className="p-6 bg-surface-900 border border-white/5 rounded-2xl">
                <Terminal className="w-8 h-8 text-[#00ff88] mb-4" />
                <h3 className="text-white font-bold text-base mb-2 font-display">Network Security Assessment</h3>
                <p className="text-gray-400 text-xs leading-relaxed">
                  Passively scan network ports to catalog exposed administrative interfaces.
                </p>
              </div>

              <div className="p-6 bg-surface-900 border border-white/5 rounded-2xl">
                <Award className="w-8 h-8 text-[#00ff88] mb-4" />
                <h3 className="text-white font-bold text-base mb-2 font-display">Compliance Validation</h3>
                <p className="text-gray-400 text-xs leading-relaxed">
                  Check that web servers meet regulatory compliance rules including GDPR, HIPAA, and PCI-DSS.
                </p>
              </div>

              <div className="p-6 bg-surface-900 border border-white/5 rounded-2xl">
                <Activity className="w-8 h-8 text-[#00ff88] mb-4" />
                <h3 className="text-white font-bold text-base mb-2 font-display">Continuous Security Monitoring</h3>
                <p className="text-gray-400 text-xs leading-relaxed">
                  Audit configurations weekly to prevent security regressions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= SECTION 11: HOW IT WORKS ================= */}
        <DynamicSecurityWorkflow />

        {/* ================= SECTION 12: COMPLETE SECURITY TOOLKIT ================= */}
        <DynamicIntelligenceModules />

        {/* ================= SECTION 13: CTA SECTION ================= */}
        <section className="py-24 bg-[#05080f] relative overflow-hidden border-b border-white/5">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyber-500/[0.03] blur-[120px] rounded-full pointer-events-none -z-10" />

          <div className="max-w-[800px] mx-auto px-6 text-center space-y-6">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white uppercase tracking-wider">
              Start Testing Your Security Today
            </h2>
            
            <p className="text-gray-400 text-sm sm:text-base font-mono uppercase tracking-widest font-bold text-[#00ff88]">
              Free. Fast. Professional.
            </p>

            <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-xs text-gray-500 font-mono uppercase tracking-wider">
              <span>✓ No registration</span>
              <span>✓ No credit card</span>
              <span>✓ No hidden fees</span>
            </div>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Link href="/scanner" className="px-6 py-3.5 bg-[#00ff88] hover:bg-[#00e077] text-surface-950 text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-all shadow-[0_0_15px_rgba(0,255,136,0.15)] flex items-center gap-1.5 cursor-pointer">
                <span>Run Complete Security Scan</span>
                <ArrowRight className="w-4 h-4 text-surface-950" />
              </Link>
              <Link href="/tools" className="px-6 py-3.5 bg-surface-900 hover:bg-surface-800 text-white border border-white/10 text-xs font-mono uppercase tracking-widest rounded-xl transition-all cursor-pointer">
                Browse All Tools
              </Link>
              <Link href="/about" className="px-6 py-3.5 bg-surface-900 hover:bg-surface-800 text-white border border-white/10 text-xs font-mono uppercase tracking-widest rounded-xl transition-all cursor-pointer">
                Learn About ReconShield
              </Link>
            </div>
          </div>
        </section>

        {/* ================= LATEST CYBERSECURITY ARTICLES BRIEFINGS ================= */}
        <section className="py-24 bg-[#0a0d14]/30 border-b border-white/5">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex items-center justify-between mb-12">
              <div>
                <span className="font-mono text-xs text-[#00ff88] font-bold uppercase tracking-widest">// THREAT RESEARCH NEWS</span>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mt-2 uppercase">Threat Intel &amp; Vulnerability Briefings</h2>
                <p className="text-gray-400 text-sm mt-1">Peer-reviewed OSINT methodology updates, CVE analysis logs, and infrastructure guides.</p>
              </div>
              
              <Link 
                href="/blog" 
                className="mt-4 md:mt-0 inline-flex items-center gap-1 text-xs font-mono text-[#00ff88] hover:text-white uppercase tracking-widest font-bold group"
              >
                <span>View All Briefings</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {secondaryArticles.map((post) => {
                const date = post.publishedAt || post._createdAt;
                const formattedDate = date ? new Date(date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                }).toUpperCase() : '';
                
                const readTime = post.estimatedWordCount 
                  ? Math.max(1, Math.ceil(post.estimatedWordCount / 5 / 200))
                  : 6;

                return (
                  <div 
                    key={post._id}
                    className="group flex flex-col bg-surface-900 border border-white/5 hover:border-[#00ff88]/30 transition-all duration-300 rounded-2xl overflow-hidden shadow-lg"
                  >
                    <Link href={`/blog/${post.slug?.current || post.slug}`} className="block relative aspect-video w-full bg-surface-950 overflow-hidden border-b border-white/5">
                      {post.mainImage ? (
                        <ResponsiveImage
                          image={post.mainImage}
                          alt={post.title}
                          width={360}
                          height={202}
                          sizes="(max-width: 768px) 100vw, 360px"
                          className="object-cover w-full h-full group-hover:scale-[1.03] transition-transform duration-700"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-surface-950 to-surface-900 flex items-center justify-center">
                          <Activity className="w-10 h-10 text-[#00ff88]/20" />
                        </div>
                      )}
                    </Link>
                    
                    <div className="p-6 flex flex-col flex-1">
                      <span className="font-mono text-[9px] tracking-[2px] uppercase text-[#00ff88] mb-3">
                        {post.categories?.[0]?.title || 'Threat Intel'}
                      </span>
                      
                      <Link href={`/blog/${post.slug?.current || post.slug}`}>
                        <h3 className="text-sm font-bold text-white mb-2 leading-snug group-hover:text-[#00ff88] transition-colors line-clamp-2 uppercase font-display tracking-wide">
                          {post.title}
                        </h3>
                      </Link>
                      
                      <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 mb-6 font-sans">
                        {post.excerpt}
                      </p>
                      
                      <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5 font-mono text-[9px] text-gray-500 uppercase">
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {readTime} MIN READ</span>
                        <span>{formattedDate}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================= EEAT BRAND DETAILS SECTION ================= */}
        <section className="py-24 bg-[#05080f] border-b border-white/5">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center gap-10 p-8 md:p-12 bg-gradient-to-r from-[#0d1117] to-surface-900 border border-white/10 rounded-3xl shadow-xl mb-16 font-sans">
              <div className="w-24 h-24 rounded-full bg-[#1a2332] border-2 border-cyan-500/30 flex items-center justify-center shrink-0 overflow-hidden">
                <Shield className="w-10 h-10 text-cyan-400" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#00ff88]/10 text-[#00ff88] text-[10px] font-mono uppercase tracking-widest mb-3">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Certified Verification
                </div>
                <h3 className="text-white font-bold text-2xl mb-1 font-display uppercase tracking-wide">Surendra Reddy</h3>
                <p className="text-gray-400 text-xs font-mono uppercase tracking-wider mb-4">Founder &amp; Principal Security Engineer, ReconShield</p>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  Surendra Reddy is a veteran cybersecurity researcher, systems analyst, and information security practitioner. He established ReconShield to make enterprise-grade OSINT reconnaissance and passive diagnostic tools freely accessible to developers and administrators worldwide.
                </p>
                <div className="flex gap-6 text-xs font-mono">
                  <a href="https://linkedin.com/in/surendrareddy3" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 flex items-center gap-1">LinkedIn <ChevronRight className="w-3.5 h-3.5" /></a>
                  <a href="https://github.com/nsurendrareddy" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white flex items-center gap-1">GitHub <ChevronRight className="w-3.5 h-3.5" /></a>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs text-gray-400 leading-relaxed font-sans border-t border-white/5 pt-12">
              <div>
                <h4 className="text-white font-bold mb-3 uppercase tracking-wider font-mono">Editorial Policy</h4>
                <p>
                  ReconShield is committed to publishing accurate, technical, and objective cybersecurity analysis. Our documentation is created by credentialed security practitioners and undergoes strict reviews before publication.
                </p>
              </div>
              <div>
                <h4 className="text-white font-bold mb-3 uppercase tracking-wider font-mono">Research Methodology</h4>
                <p>
                  Our findings are derived from RFC protocol documentation, CA/Browser Forum standards, and verified cybersecurity databases. We avoid speculative telemetry, prioritizing primary sources and verifiable network actions.
                </p>
              </div>
              <div>
                <h4 className="text-white font-bold mb-3 uppercase tracking-wider font-mono">Fact Checking Process</h4>
                <p>
                  Information is verified against active TLS servers, registrar configurations, and IETF specifications. Each section is tested for technical accuracy under modern browser routing environments.
                </p>
              </div>
            </div>

            <div className="text-center text-[10px] font-mono text-gray-600 uppercase tracking-widest mt-12">
              Last Updated: June 2026 | Reviewed by ReconShield Editorial Board
            </div>
          </div>
        </section>

        {/* ================= SECTION 8: NEWSLETTER SUBSCRIPTION ================= */}
        <section className="py-24 bg-[#0a0d14] relative overflow-hidden">
          <div className="absolute inset-0 bg-[#00ff88]/5 -z-10 pointer-events-none" />
          <div className="max-w-3xl mx-auto px-6 text-center space-y-6">
            <Mail className="w-12 h-12 text-[#00ff88] mx-auto" />
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white uppercase tracking-wider">Stay Ahead of Emerging Threat Vectors</h2>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xl mx-auto">
              Join thousands of cybersecurity analysts, developers, and compliance auditors who receive our weekly threat briefings, zero-day CVE alerts, and defensive tutorials.
            </p>
            
            <div className="flex justify-center pt-2">
              <DynamicNewsletterForm 
                accentColor="bg-[#00ff88] hover:bg-[#00e077]"
                buttonTextColor="text-surface-950"
                inputClass="px-6 py-4 w-full sm:w-96 text-sm"
                buttonClass="px-8 py-4 text-xs font-mono tracking-widest font-bold"
              />
            </div>
            <p className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">Fact checked intelligence. 100% spam-free. Unsubscribe anytime.</p>
          </div>
        </section>

        <AdsterraBanner type="300x250" className="mb-12" />

      </div>
    </>
  );
}
