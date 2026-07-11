import React from 'react';
import Link from 'next/link';
import { 
  Shield, Globe, Server, Lock, Terminal, CheckCircle2, ChevronRight, 
  Search, Activity, Target, Network, Info, Check, AlertTriangle, 
  FileText, Send, HelpCircle, BookOpen, Key, Database, Clock, ArrowRight,
  Eye, Zap, ListTodo, ShieldAlert, Award
} from 'lucide-react';
import ScannerHubClient from '@/components/ScannerHubClient';
import { client, homepageBlogQuery } from '@/utils/sanity';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Website Security Scanner - Free Security Audit | ReconShield",
  description: "Free website security scanner for comprehensive security audits. Scan domains for vulnerabilities, SSL issues, DNS problems, and more. Instant results.",
  alternates: {
    canonical: "https://reconshield.in/scanner",
  },
  keywords: [
    "website security scanner", "security audit tool", "website scanner", "security assessment", 
    "ssl checker", "dns scanner", "vulnerability scanner", "comprehensive security scan", "website security audit"
  ],
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  openGraph: {
    title: "Website Security Scanner - Free Security Audit",
    description: "Free website security scanner for comprehensive audits. Check SSL, DNS, email security, and vulnerabilities instantly.",
    url: "https://reconshield.in/scanner",
    type: "website",
    siteName: "ReconShield",
    images: [
      {
        url: "https://reconshield.in/og-image-scanner.png",
        width: 1200,
        height: 630,
        alt: "Website Security Scanner - ReconShield"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Security Scanner - Free Security Audit",
    description: "Free website security scanner. Check SSL, DNS, email security, and vulnerabilities instantly.",
    images: ["https://reconshield.in/og-image-scanner.png"]
  },
  appleWebApp: {
    capable: true,
    title: "ReconShield Scanner",
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

const MOCK_POSTS = [
  {
    _id: "mock-1",
    title: "The Anatomy of Passive OSINT: Mapping Infrastructure Without Noise",
    slug: "anatomy-of-passive-osint",
    publishedAt: "2026-05-28T09:00:00Z",
    excerpt: "Learn how modern threat hunters map enterprise footprints entirely through cached DNS, transparency logs, and global RIR data without triggering network intrusion detection systems.",
    categories: [{ title: "OSINT & analysis" }],
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
  }
];

export default async function ScannerPage() {
  let posts = [];
  try {
    posts = await client.fetch(homepageBlogQuery, {}, { next: { tags: ['blog'] } });
  } catch (error) {
    console.error('Error fetching blog posts for scanner page:', error);
  }

  if (!posts || posts.length === 0) {
    posts = MOCK_POSTS;
  }
  const latestPosts = posts.slice(0, 3);

  const faqs = [
    {
      q: "What is a website security scanner?",
      a: "A website security scanner is an online diagnostic tool that audits public domains for security vulnerabilities, configuration errors, certificate exposures, and threat entry points passively."
    },
    {
      q: "Is this website scanner free to use?",
      a: "Yes, ReconShield's website security scanner is 100% free with no registration, accounts, or subscriptions required."
    },
    {
      q: "What does the website scanner check?",
      a: "The scanner analyzes SSL/TLS parameters, DNS configurations, email security records (SPF/DKIM/DMARC), open ports, security headers, technology stacks, and general vulnerability exposures."
    },
    {
      q: "How does the security scanner work?",
      a: "The tool performs passive queries against public registers, DNS records, and server responses to compile a correlated security assessment report without impacting target hosts."
    },
    {
      q: "Why should I scan my website regularly?",
      a: "Regular scanning ensures that configuration drift, expired SSL certificates, missing security headers, or newly exposed ports are detected before they can be exploited."
    },
    {
      q: "How long does a security scan take?",
      a: "The initial scan results resolve within 5 to 10 seconds, with the complete correlated threat assessment compiling in 30 to 60 seconds."
    },
    {
      q: "Can I scan any website?",
      a: "Yes, because the scanner operates passively using open-source intelligence (OSINT) and publicly queryable records, you can audit any domain safely and legally."
    },
    {
      q: "What should I do with scan results?",
      a: "Review the highlighted warnings and implement the specific security remediation recommendations provided to patch exposed interfaces and secure header configs."
    }
  ];

  const breadcrumbs = [
    { name: "Home", url: "https://reconshield.in" },
    { name: "Scanner", url: "https://reconshield.in/scanner" }
  ];

  const schemas = [
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "FAQPage",
          "@id": "https://reconshield.in/scanner#faq",
          "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": { "@type": "Answer", "text": faq.a }
          }))
        },
        {
          "@type": "SoftwareApplication",
          "@id": "https://reconshield.in/scanner#software",
          "name": "ReconShield Website Security Scanner",
          "url": "https://reconshield.in/scanner",
          "description": "Free online security assessment and vulnerability assessment tool. Evaluates SSL certificates, HTTP headers, DNS configurations, open ports, and email security protocols passively.",
          "applicationCategory": "SecurityApplication",
          "operatingSystem": "Web Browser",
          "offers": { 
            "@type": "Offer", 
            "price": "0", 
            "priceCurrency": "USD" 
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "ratingCount": "196"
          },
          "featureList": "SSL/TLS Security audits, DNS Configuration validation, Email Security audits (SPF/DKIM/DMARC), Port Scanning, Security Headers verification"
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://reconshield.in/scanner#breadcrumb",
          "itemListElement": breadcrumbs.map((crumb, idx) => ({
            "@type": "ListItem",
            "position": idx + 1,
            "name": crumb.name,
            "item": crumb.url
          }))
        }
      ]
    }
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas[0]) }} />
      <link rel="dns-prefetch" href="https://api.reconshield.in" />

      {/* Interactive Unified Scanner Hub Dashboard Component */}
      <ScannerHubClient latestPosts={latestPosts} />

      {/* Opening Content Section */}
      <section className="py-12 bg-[#05080f] border-b border-white/5" aria-label="About Our Scanner">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="bg-gradient-to-r from-cyan-500/5 to-blue-500/5 border border-cyan-500/10 rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-[50px] rounded-full pointer-events-none" />
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-sans">
              Our <strong>free website security scanner</strong> performs comprehensive security audits in one click. Whether you're checking SSL certificates, analyzing DNS records, testing email authentication, or scanning for vulnerabilities, this <strong>all-in-one security scanner</strong> provides complete website security assessment. No registration required—simply enter your domain to run a full security scan including SSL/TLS testing, HTTP headers analysis, port scanning, email security (SPF/DKIM/DMARC), technology detection, and vulnerability assessment.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section (Why Use Our Website Security Scanner?) */}
      <section className="py-20 bg-[#0a0d14] border-b border-white/5" aria-label="Why Choose Our Scanner">
        <div className="max-w-5xl mx-auto px-6 font-sans">
          <h2 className="text-3xl font-display font-bold text-white mb-4 text-center">
            Why Use Our Website Security Scanner?
          </h2>
          <p className="text-gray-400 text-sm text-center max-w-xl mx-auto mb-12 leading-relaxed">
            Get instant, enterprise-grade diagnostics of your public digital boundaries with zero impact on system operations.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-surface-900 border border-white/5 rounded-2xl hover:border-cyan-500/30 transition-all">
              <Check className="w-8 h-8 text-cyan-400 mb-4" />
              <h3 className="text-white font-bold text-base mb-2 font-display">All-in-One Solution</h3>
              <p className="text-gray-400 text-xs leading-relaxed">Perform complete security checks across all protocols in a single workspace.</p>
            </div>
            <div className="p-6 bg-surface-900 border border-white/5 rounded-2xl hover:border-cyan-500/30 transition-all">
              <Check className="w-8 h-8 text-cyan-400 mb-4" />
              <h3 className="text-white font-bold text-base mb-2 font-display">100% Free</h3>
              <p className="text-gray-400 text-xs leading-relaxed">Access full diagnostic workflows with no subscription caps or payment requirements.</p>
            </div>
            <div className="p-6 bg-surface-900 border border-white/5 rounded-2xl hover:border-cyan-500/30 transition-all">
              <Check className="w-8 h-8 text-cyan-400 mb-4" />
              <h3 className="text-white font-bold text-base mb-2 font-display">Comprehensive Coverage</h3>
              <p className="text-gray-400 text-xs leading-relaxed">Audits SSL/TLS configs, HTTP response policies, open ports, DNS details, and more.</p>
            </div>
            <div className="p-6 bg-surface-900 border border-white/5 rounded-2xl hover:border-cyan-500/30 transition-all">
              <Check className="w-8 h-8 text-cyan-400 mb-4" />
              <h3 className="text-white font-bold text-base mb-2 font-display">Fast Results</h3>
              <p className="text-gray-400 text-xs leading-relaxed">Generates a correlated security assessment report in under 60 seconds.</p>
            </div>
            <div className="p-6 bg-surface-900 border border-white/5 rounded-2xl hover:border-cyan-500/30 transition-all">
              <Check className="w-8 h-8 text-cyan-400 mb-4" />
              <h3 className="text-white font-bold text-base mb-2 font-display">Actionable Reports</h3>
              <p className="text-gray-400 text-xs leading-relaxed">Get detailed recommendations to patch exposed systems and fix server headers.</p>
            </div>
            <div className="p-6 bg-surface-900 border border-white/5 rounded-2xl hover:border-cyan-500/30 transition-all">
              <Check className="w-8 h-8 text-cyan-400 mb-4" />
              <h3 className="text-white font-bold text-base mb-2 font-display">Professional Grade</h3>
              <p className="text-gray-400 text-xs leading-relaxed">Scoring metrics aligned with enterprise vulnerability standards and NIST frameworks.</p>
            </div>
            <div className="p-6 bg-surface-900 border border-white/5 rounded-2xl hover:border-cyan-500/30 transition-all">
              <Check className="w-8 h-8 text-cyan-400 mb-4" />
              <h3 className="text-white font-bold text-base mb-2 font-display">Privacy Focused</h3>
              <p className="text-gray-400 text-xs leading-relaxed">We respect visitor privacy and do not record domains or log search payloads.</p>
            </div>
            <div className="p-6 bg-surface-900 border border-white/5 rounded-2xl hover:border-cyan-500/30 transition-all">
              <Check className="w-8 h-8 text-cyan-400 mb-4" />
              <h3 className="text-white font-bold text-base mb-2 font-display">Easy to Use</h3>
              <p className="text-gray-400 text-xs leading-relaxed">No complicated software deployment required. Simply input the target domain.</p>
            </div>
          </div>
        </div>
      </section>

      {/* What Does Our Scanner Check? Section */}
      <section className="py-20 bg-[#05080f] border-b border-white/5" aria-label="What Does Our Scanner Check">
        <div className="max-w-5xl mx-auto px-6 font-sans">
          <h2 className="text-3xl font-display font-bold text-white mb-4 text-center">
            What Does Our Scanner Check?
          </h2>
          <p className="text-gray-400 text-sm text-center max-w-xl mx-auto mb-12 leading-relaxed">
            ReconShield performs multi-layered passive audits to map out risks across all digital vectors.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-surface-900 border border-white/5">
              <Lock className="w-8 h-8 text-cyan-400 mb-4" />
              <h3 className="text-white font-bold text-lg mb-2 font-display">SSL/TLS Security</h3>
              <ul className="text-gray-400 text-xs space-y-1.5 list-disc pl-4 leading-relaxed">
                <li>Certificate expiration dates</li>
                <li>CA chain validation</li>
                <li>Cryptographic protocol versions (TLS 1.2/1.3)</li>
                <li>Negotiated cipher suite strength</li>
              </ul>
            </div>
            <div className="p-6 rounded-2xl bg-surface-900 border border-white/5">
              <Globe className="w-8 h-8 text-cyan-400 mb-4" />
              <h3 className="text-white font-bold text-lg mb-2 font-display">DNS Configuration</h3>
              <ul className="text-gray-400 text-xs space-y-1.5 list-disc pl-4 leading-relaxed">
                <li>DNSSEC cryptographic configurations</li>
                <li>Nameserver replication</li>
                <li>MX and TXT records verification</li>
                <li>CAA certificate issuer records</li>
              </ul>
            </div>
            <div className="p-6 rounded-2xl bg-surface-900 border border-white/5">
              <Send className="w-8 h-8 text-cyan-400 mb-4" />
              <h3 className="text-white font-bold text-lg mb-2 font-display">Email Security</h3>
              <ul className="text-gray-400 text-xs space-y-1.5 list-disc pl-4 leading-relaxed">
                <li>SPF lookup counts and formatting</li>
                <li>DKIM selectors syntax</li>
                <li>DMARC policy strength checks</li>
                <li>Anti-spoofing alignment status</li>
              </ul>
            </div>
            <div className="p-6 rounded-2xl bg-surface-900 border border-white/5">
              <Terminal className="w-8 h-8 text-cyan-400 mb-4" />
              <h3 className="text-white font-bold text-lg mb-2 font-display">Port &amp; Service Scanning</h3>
              <ul className="text-gray-400 text-xs space-y-1.5 list-disc pl-4 leading-relaxed">
                <li>Exposed administrative interfaces</li>
                <li>Open service banner grab checking</li>
                <li>Passive host port detection</li>
                <li>Firewall filtering indicator mapping</li>
              </ul>
            </div>
            <div className="p-6 rounded-2xl bg-surface-900 border border-white/5">
              <Shield className="w-8 h-8 text-cyan-400 mb-4" />
              <h3 className="text-white font-bold text-lg mb-2 font-display">Security Headers</h3>
              <ul className="text-gray-400 text-xs space-y-1.5 list-disc pl-4 leading-relaxed">
                <li>Content Security Policy (CSP) status</li>
                <li>HSTS configuration parameters</li>
                <li>X-Frame-Options clickjacking defense</li>
                <li>Referrer policy verification</li>
              </ul>
            </div>
            <div className="p-6 rounded-2xl bg-surface-900 border border-white/5">
              <Database className="w-8 h-8 text-cyan-400 mb-4" />
              <h3 className="text-white font-bold text-lg mb-2 font-display">Technology Detection</h3>
              <ul className="text-gray-400 text-xs space-y-1.5 list-disc pl-4 leading-relaxed">
                <li>Server framework fingerprinting</li>
                <li>Content Management System (CMS) audit</li>
                <li>CDN and active WAF signatures</li>
                <li>Front-end library version checks</li>
              </ul>
            </div>
            <div className="p-6 rounded-2xl bg-[#0d1117] border border-cyan-500/10 md:col-span-2 lg:col-span-3">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-white font-bold text-lg mb-1 font-display">Vulnerability Assessment</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    Correlates exposed tech stacks, open interfaces, and header setup parameters to identify configurations that deviate from NIST SP 800-53 or OWASP guidelines.
                  </p>
                </div>
                <div className="shrink-0 font-mono text-xs text-cyan-400 border border-cyan-500/20 px-3 py-1.5 rounded-xl bg-cyan-500/5 uppercase font-bold">
                  Passive Assessment Mode
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who Needs Website Security Scanning Section */}
      <section className="py-20 bg-[#0a0d14] border-b border-white/5" aria-label="Who Needs Scanner">
        <div className="max-w-5xl mx-auto px-6 font-sans">
          <h2 className="text-3xl font-display font-bold text-white mb-4 text-center">
            Who Needs Website Security Scanning?
          </h2>
          <p className="text-gray-400 text-sm text-center max-w-xl mx-auto mb-12 leading-relaxed">
            Every digital asset needs defensive audit reviews to maintain its security posture.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-surface-900 border border-white/5 rounded-2xl">
              <h3 className="text-white font-bold text-base mb-3 font-display">Website Owners &amp; Business Managers</h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                Business managers can check overall domain security ratings, verify SSL validity, and protect sending domains against brand impersonation vectors without technical complexity.
              </p>
            </div>
            <div className="p-6 bg-surface-900 border border-white/5 rounded-2xl">
              <h3 className="text-white font-bold text-base mb-3 font-display">IT Administrators &amp; DevOps Teams</h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                System administrators can audit exposed system ports, verify correct nameserver records, and check that HSTS and Content-Security-Policies are deployed cleanly.
              </p>
            </div>
            <div className="p-6 bg-surface-900 border border-white/5 rounded-2xl">
              <h3 className="text-white font-bold text-base mb-3 font-display">Security Professionals &amp; Auditors</h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                Penetration testers and compliance auditors can leverage passive OSINT gathering during initial reconnaissance workflows to trace BGP paths and map target networks.
              </p>
            </div>
            <div className="p-6 bg-surface-900 border border-white/5 rounded-2xl">
              <h3 className="text-white font-bold text-base mb-3 font-display">Web Developers &amp; Agencies</h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                Frontend and backend developers can inspect framework version exposures, verify cookie secure attributes, and check HTTP security policies before launch.
              </p>
            </div>
            <div className="p-6 bg-surface-900 border border-white/5 rounded-2xl md:col-span-2 lg:col-span-1">
              <h3 className="text-white font-bold text-base mb-3 font-display">E-commerce &amp; Online Businesses</h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                Websites handling transactional data can verify TLS setups and validate certificates to comply with PCI-DSS guidelines and secure customer connections.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Use Scanner Instead of Individual Tools Section */}
      <section className="py-20 bg-[#05080f] border-b border-white/5" aria-label="Scanner vs Individual Tools">
        <div className="max-w-4xl mx-auto px-6 font-sans">
          <h2 className="text-3xl font-display font-bold text-white mb-4 text-center">
            Why Use Our Scanner Instead of Individual Tools?
          </h2>
          <p className="text-gray-400 text-sm text-center max-w-xl mx-auto mb-12 leading-relaxed">
            Consolidating security checks into a single workspace improves threat intelligence workflow speed and analysis accuracy.
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="text-white font-bold text-base mb-2">Time Efficiency</h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                Querying DNS, WHOIS, ports, security headers, and certificates separately takes considerable time. ReconShield launches all checks simultaneously, delivering answers in one click.
              </p>
            </div>
            <div>
              <h3 className="text-white font-bold text-base mb-2">Complete Coverage</h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                Running audits one-by-one can lead to overlooked vectors. Our combined scanner checks all main perimeters, ensuring DNS, mail, SSL, and server systems are audited together.
              </p>
            </div>
            <div>
              <h3 className="text-white font-bold text-base mb-2">Correlated Results</h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                ReconShield does not just present separate outputs. It correlates findings to calculate Security, Exposure, and overall Trust Ratings, helping teams gauge real risk levels.
              </p>
            </div>
            <div>
              <h3 className="text-white font-bold text-base mb-2">Single Report</h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                Presenting security findings to clients or management is easier with a unified dashboard. Get a clean, structured overview containing all key metrics on one page.
              </p>
            </div>
            <div>
              <h3 className="text-white font-bold text-base mb-2">Consistent Monitoring</h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                Consolidated workflows allow administrators to audit all domain configurations weekly, making it easy to track configuration drift and check that updates remain secure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-[#0a0d14] border-b border-white/5" aria-label="How the Scanner Works">
        <div className="max-w-5xl mx-auto px-6 font-sans">
          <h2 className="text-3xl font-display font-bold text-white mb-4 text-center">
            How Does the Security Scanner Work?
          </h2>
          <p className="text-gray-400 text-sm text-center max-w-xl mx-auto mb-12 leading-relaxed">
            ReconShield performs multi-layered passive audits in real-time.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="p-6 bg-surface-900 border border-white/5 rounded-2xl">
              <span className="text-xs font-mono text-cyan-400 block mb-2 font-bold uppercase tracking-wider">Step 1</span>
              <h3 className="text-white font-bold text-base mb-2">Domain Analysis</h3>
              <p className="text-gray-400 text-xs leading-relaxed">Resolves hostnames, validates formats, and identifies target IP mappings.</p>
            </div>
            <div className="p-6 bg-surface-900 border border-white/5 rounded-2xl">
              <span className="text-xs font-mono text-cyan-400 block mb-2 font-bold uppercase tracking-wider">Step 2</span>
              <h3 className="text-white font-bold text-base mb-2">Parallel Checks</h3>
              <p className="text-gray-400 text-xs leading-relaxed">Runs concurrent passive checks on DNS settings, SSL layers, headers, and ports.</p>
            </div>
            <div className="p-6 bg-surface-900 border border-white/5 rounded-2xl">
              <span className="text-xs font-mono text-cyan-400 block mb-2 font-bold uppercase tracking-wider">Step 3</span>
              <h3 className="text-white font-bold text-base mb-2">Tech Profiling</h3>
              <p className="text-gray-400 text-xs leading-relaxed">Inspects public headers and files to identify WAFs, CMS frameworks, and stacks.</p>
            </div>
            <div className="p-6 bg-surface-900 border border-white/5 rounded-2xl">
              <span className="text-xs font-mono text-cyan-400 block mb-2 font-bold uppercase tracking-wider">Step 4</span>
              <h3 className="text-white font-bold text-base mb-2">Result Compilation</h3>
              <p className="text-gray-400 text-xs leading-relaxed">Correlates parameters against CVSS benchmarks and OWASP security guidelines.</p>
            </div>
            <div className="p-6 bg-surface-900 border border-white/5 rounded-2xl">
              <span className="text-xs font-mono text-cyan-400 block mb-2 font-bold uppercase tracking-wider">Step 5</span>
              <h3 className="text-white font-bold text-base mb-2">Report Generation</h3>
              <p className="text-gray-400 text-xs leading-relaxed">Builds clean ratings dashboards outlining specific recommendations.</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 max-w-xl mx-auto text-center font-mono text-xs">
            <h4 className="text-white font-bold mb-3 uppercase tracking-wider">Real-Time Processing Performance</h4>
            <div className="grid grid-cols-3 gap-4 text-gray-400">
              <div>
                <span className="text-[10px] text-gray-500 block">Initial Results:</span>
                <span className="text-[#00ff88] font-bold">5-10 seconds</span>
              </div>
              <div>
                <span className="text-[10px] text-gray-500 block">Complete Scan:</span>
                <span className="text-cyan-400 font-bold">30-60 seconds</span>
              </div>
              <div>
                <span className="text-[10px] text-gray-500 block">Detailed Analysis:</span>
                <span className="text-white font-bold">Immediate</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Scanning Best Practices Section */}
      <section className="py-20 bg-[#05080f] border-b border-white/5" aria-label="Security Best Practices">
        <div className="max-w-4xl mx-auto px-6 font-sans">
          <h2 className="text-3xl font-display font-bold text-white mb-4 text-center">
            Security Scanning Best Practices
          </h2>
          <p className="text-gray-400 text-sm text-center max-w-xl mx-auto mb-12 leading-relaxed">
            Running audits is only the first step. Follow these industry best practices to get the most value from your security tests.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-surface-900 border border-white/5 rounded-2xl">
              <h3 className="text-white font-bold text-base mb-3">Regular Scanning Schedule</h3>
              <ul className="text-gray-400 text-xs space-y-2 list-disc pl-4 leading-relaxed">
                <li><strong>Weekly Audits:</strong> Run checks weekly to check for expired SSL certificates or newly exposed ports.</li>
                <li><strong>Post-Deployment Tests:</strong> Scan websites after implementing updates to ensure security configurations remain intact.</li>
                <li><strong>Continuous Track:</strong> Monitor ratings over time to protect systems from configuration drift.</li>
              </ul>
            </div>
            <div className="p-6 bg-surface-900 border border-white/5 rounded-2xl">
              <h3 className="text-white font-bold text-base mb-3">Act on Findings</h3>
              <ul className="text-gray-400 text-xs space-y-2 list-disc pl-4 leading-relaxed">
                <li><strong>Deploy Headers:</strong> Add recommended response headers (HSTS, CSP) in web server configurations.</li>
                <li><strong>Update TLS Settings:</strong> Configure SSL ciphers to support only secure handshake protocols.</li>
                <li><strong>Close Ports:</strong> Block exposed administrative ports behind firewalls to prevent unauthorized access.</li>
              </ul>
            </div>
            <div className="p-6 bg-surface-900 border border-white/5 rounded-2xl">
              <h3 className="text-white font-bold text-base mb-3">Document &amp; Track</h3>
              <ul className="text-gray-400 text-xs space-y-2 list-disc pl-4 leading-relaxed">
                <li><strong>Inventory Systems:</strong> Keep a catalog of all active domain zones, DNS records, and subdomains.</li>
                <li><strong>Track Drift:</strong> Log rating history to document security improvements and policy compliance.</li>
                <li><strong>Share Reports:</strong> Share structured assessment reports with development teams to coordinate updates.</li>
              </ul>
            </div>
            <div className="p-6 bg-surface-900 border border-white/5 rounded-2xl">
              <h3 className="text-white font-bold text-base mb-3">Combine Security Measures</h3>
              <ul className="text-gray-400 text-xs space-y-2 list-disc pl-4 leading-relaxed">
                <li><strong>Integrate Scans:</strong> Combine passive scanning with active testing to identify deep code issues.</li>
                <li><strong>Harden Stacks:</strong> Keep technology systems and backend server libraries patched.</li>
                <li><strong>Employee Training:</strong> Train team members to prevent phishing and enforce strict credential rules.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Need More Detailed Analysis? Internal Linking Section */}
      <section className="py-20 bg-[#0a0d14] border-b border-white/5" aria-label="Detailed Tool Analysis Links">
        <div className="max-w-5xl mx-auto px-6 font-sans">
          <h2 className="text-3xl font-display font-bold text-white mb-4 text-center">
            Need More Detailed Analysis?
          </h2>
          <p className="text-gray-400 text-sm text-center max-w-xl mx-auto mb-12 leading-relaxed">
            Launch specialized diagnostic tools to audit specific system protocols and configurations.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-surface-900 border border-white/5">
              <h3 className="text-white font-bold text-base mb-3 font-display">Security Testing</h3>
              <ul className="space-y-2 font-mono text-xs">
                <li><Link href="/tools/vulnerability-scanner" className="text-cyan-400 hover:underline flex items-center gap-1">Vulnerability Scanner <ChevronRight className="w-3 h-3"/></Link></li>
                <li><Link href="/tools/port-scanner" className="text-cyan-400 hover:underline flex items-center gap-1">Port Scanner <ChevronRight className="w-3 h-3"/></Link></li>
                <li><Link href="/tools/ssl-checker" className="text-cyan-400 hover:underline flex items-center gap-1">SSL Checker <ChevronRight className="w-3 h-3"/></Link></li>
                <li><Link href="/tools/http-headers" className="text-cyan-400 hover:underline flex items-center gap-1">HTTP Headers Checker <ChevronRight className="w-3 h-3"/></Link></li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-surface-900 border border-white/5">
              <h3 className="text-white font-bold text-base mb-3 font-display">Domain &amp; DNS</h3>
              <ul className="space-y-2 font-mono text-xs">
                <li><Link href="/tools/whois" className="text-cyan-400 hover:underline flex items-center gap-1">WHOIS Lookup <ChevronRight className="w-3 h-3"/></Link></li>
                <li><Link href="/tools/dns-lookup" className="text-cyan-400 hover:underline flex items-center gap-1">DNS Lookup <ChevronRight className="w-3 h-3"/></Link></li>
                <li><Link href="/tools/subdomain-finder" className="text-cyan-400 hover:underline flex items-center gap-1">Subdomain Finder <ChevronRight className="w-3 h-3"/></Link></li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-surface-900 border border-white/5">
              <h3 className="text-white font-bold text-base mb-3 font-display">Email &amp; Network</h3>
              <ul className="space-y-2 font-mono text-xs">
                <li><Link href="/tools/email-security" className="text-cyan-400 hover:underline flex items-center gap-1">Email Security Checker <ChevronRight className="w-3 h-3"/></Link></li>
                <li><Link href="/tools/ip-lookup" className="text-cyan-400 hover:underline flex items-center gap-1">IP Lookup <ChevronRight className="w-3 h-3"/></Link></li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-surface-900 border border-white/5">
              <h3 className="text-white font-bold text-base mb-3 font-display">Other Tools</h3>
              <ul className="space-y-2 font-mono text-xs">
                <li><Link href="/tools/tech-detector" className="text-cyan-400 hover:underline flex items-center gap-1">Technology Detector <ChevronRight className="w-3 h-3"/></Link></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Content Section */}
      <section className="py-20 bg-[#05080f] border-t border-white/5" aria-labelledby="faq-title">
        <div className="max-w-[900px] mx-auto px-6 font-sans">
          <h2 id="faq-title" className="text-3xl font-display font-bold text-white mb-4 text-center">Frequently Asked Questions</h2>
          <p className="text-gray-400 text-sm text-center max-w-xl mx-auto mb-12 leading-relaxed">
            Find technical answers to common questions about running website security audits and passive scanning.
          </p>
          <div className="grid grid-cols-1 gap-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-surface-900 border border-white/10 rounded-2xl p-6 hover:border-cyan-500/20 transition-all">
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
