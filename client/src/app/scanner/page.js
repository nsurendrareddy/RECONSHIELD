import React from 'react';
import Link from 'next/link';
import { 
  Shield, Globe, Server, Lock, Terminal, CheckCircle2, ChevronRight, 
  Search, Activity, Target, Network, Info, Check, AlertTriangle, 
  FileText, Send, HelpCircle, BookOpen, Key, Database, Clock, ArrowRight
} from 'lucide-react';
import { generateBaseMetadata } from '@/utils/metadata';
import ScannerHubClient from '@/components/ScannerHubClient';
import { client, homepageBlogQuery } from '@/utils/sanity';

export const metadata = generateBaseMetadata({
  title: "Website Security Scanner (Free) | AI-Powered Security Assessment",
  description: "Scan websites for security weaknesses, vulnerabilities, misconfigurations, and exposure risks with ReconShield's free website security scanner.",
  path: "/scanner"
});

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
    posts = await client.fetch(homepageBlogQuery);
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
      a: "A website security scanner is an automated application that audits online platforms for security vulnerabilities, configuration errors, and exposure risks. It evaluates HTTP response headers, SSL/TLS handshakes, open ports, and DNS settings to calculate an overall risk profile."
    },
    {
      q: "How does website security scanning work?",
      a: "Website security scanning maps public assets by querying server response codes, validating SSL certificates, auditing DNS records, and checking active ports. The tool processes these signatures to find outdated software, weak encryption protocols, or misconfigured elements."
    },
    {
      q: "What vulnerabilities can be detected?",
      a: "Our scanner identifies missing security headers (like Content Security Policy), deprecated TLS protocol versions, weak cipher suites, insecure cookies, email spoofing risks (via SPF/DMARC), exposed administrative ports, and public subdomains that increase your attack surface."
    },
    {
      q: "What is attack surface analysis?",
      a: "Attack surface analysis is the continuous process of mapping all public-facing digital assets, including hosts, domains, subdomains, and ports. It helps organizations identify exposed entry points that could be targeted by unauthorized threat actors."
    },
    {
      q: "What is the difference between passive and active scanning?",
      a: "Passive scanning gathers information from public DNS records, cached threat intelligence, and server response headers without sending exploit payloads. Active scanning sends intrusive packets directly to a target, which can cause operational disruptions."
    },
    {
      q: "How often should security scans be performed?",
      a: "Security scans should be run weekly or after any major configuration changes. Because new security vulnerabilities (CVEs) are discovered daily and network components evolve, continuous auditing is essential to maintain solid defense profiles."
    },
    {
      q: "What is the ReconShield Security Score?",
      a: "The ReconShield Security Score is a metric from 0 to 100 calculated by evaluating your SSL certificate strength, security header configurations, DNS record validity, and email authentication parameters to represent your baseline defense health."
    },
    {
      q: "What is the ReconShield Exposure Score?",
      a: "The ReconShield Exposure Score measures the visibility of your public assets. It calculates risk based on exposed administrative ports, active subdomains, IP co-locations, and server banners that disclose operating software versions."
    },
    {
      q: "What is the ReconShield Trust Rating?",
      a: "The ReconShield Trust Rating (graded A+ to F) represents your overall compliance with cybersecurity best practices. It correlates security header implementations, SSL cipher strength, and DMARC enforcement policies to grade your domain."
    },
    {
      q: "What is a vulnerability assessment?",
      a: "A vulnerability assessment is a technical review of security gaps within an information technology environment. It identifies, quantifies, and ranks vulnerabilities using standard severity frameworks like CVSS to guide remediation workflows."
    },
    {
      q: "How do I improve my security score?",
      a: "To improve your score, deploy missing HTTP security headers (like HSTS and CSP), transition DMARC policy rules to reject (p=reject), update SSL settings to enforce TLS 1.3, and close unnecessary open network ports."
    },
    {
      q: "Why is DNSSEC security auditing important?",
      a: "DNSSEC auditing ensures that domain name records are cryptographically signed. This prevents DNS spoofing and cache poisoning attacks, ensuring that visitors are routed to your authentic web servers rather than malicious duplicates."
    },
    {
      q: "Can a security checker identify spam risk?",
      a: "Yes. The scanner checks email authentication protocols (SPF, DKIM, and DMARC). If these records are missing, invalid, or misconfigured, it flags a domain spoofing risk, which leads to lower email deliverability."
    },
    {
      q: "What is website fingerprinting?",
      a: "Website fingerprinting is a reconnaissance technique that maps web technologies, framework versions, and host configurations. It allows administrators to audit their assets, but also helps hackers find targets with unpatched vulnerabilities."
    },
    {
      q: "Does the tool scan internal databases?",
      a: "No. ReconShield is a non-intrusive, passive security scanner. It only evaluates public-facing records, response headers, and open ports. It cannot access, modify, or query internal database tables or backend server files."
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
          "@id": "https://reconshield.in/scanner#webpage",
          "url": "https://reconshield.in/scanner",
          "name": "Website Security Scanner (Free) | AI-Powered Security Assessment",
          "isPartOf": { "@id": "https://reconshield.in/#website" }
        },
        {
          "@type": "SoftwareApplication",
          "@id": "https://reconshield.in/scanner#software",
          "name": "ReconShield Website Security Scanner Suite",
          "url": "https://reconshield.in/scanner",
          "description": "Free online website security scanner to check SSL certificates, HTTP response headers, DMARC policies, open ports, and technology vulnerabilities.",
          "applicationCategory": "SecurityApplication",
          "operatingSystem": "All",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "publisher": { "@id": "https://reconshield.in/#organization" }
        },
        {
          "@type": "WebApplication",
          "@id": "https://reconshield.in/scanner#webapp",
          "name": "ReconShield AI Security Assessment Platform",
          "url": "https://reconshield.in/scanner",
          "description": "Calculates Security, Exposure, and Attack Surface scores using passive reconnaissance intelligence.",
          "applicationCategory": "SecurityApplication",
          "operatingSystem": "All",
          "browserRequirements": "Requires JavaScript. Requires HTML5.",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "publisher": { "@id": "https://reconshield.in/#organization" }
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
        },
        {
          "@type": "TechArticle",
          "@id": "https://reconshield.in/scanner#article",
          "headline": "Professional Website Security Scanning, Attack Surface Discovery, and Hardening Guide",
          "description": "An in-depth security engineering article detailing passive exposure auditing, header hardening, DNSSEC verification, and brand impersonation defenses.",
          "author": { "@type": "Person", "name": "Surendra Reddy" },
          "publisher": { "@id": "https://reconshield.in/#organization" },
          "url": "https://reconshield.in/scanner",
          "isPartOf": { "@id": "https://reconshield.in/scanner#webpage" }
        },
        {
          "@type": "HowTo",
          "@id": "https://reconshield.in/scanner#howto",
          "name": "How to run website security audit",
          "description": "Identify exposed assets and score security configurations.",
          "step": [
            { "@type": "HowToStep", "name": "Input Domain Target", "text": "Enter the URL (e.g. example.com) in the primary scanner console." },
            { "@type": "HowToStep", "name": "Initiate Passive Audit", "text": "Execute scan to fetch security headers, DNS zones, SSL ciphers, and port exposure." },
            { "@type": "HowToStep", "name": "Review Recommendations", "text": "Check calculated security health metrics and implement remediation protocols." }
          ],
          "isPartOf": { "@id": "https://reconshield.in/scanner#webpage" }
        },
        {
          "@type": "FAQPage",
          "@id": "https://reconshield.in/scanner#faq",
          "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": { "@type": "Answer", "text": faq.a }
          })),
          "isPartOf": { "@id": "https://reconshield.in/scanner#webpage" }
        }
      ]
    }
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas[0]) }} />
      
      {/* Interactive Unified Scanner Hub Dashboard Component */}
      <ScannerHubClient latestPosts={latestPosts} />

      {/* AI Overview / Featured Snippet Optimization */}
      <section className="py-12 bg-[#05080f] border-b border-white/5" aria-label="AI Search Overview">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="bg-gradient-to-r from-cyan-500/5 to-blue-500/5 border border-cyan-500/10 rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-[50px] rounded-full pointer-events-none" />
            
            {/* Definition Block: What Is a Website Security Scanner? */}
            <h2 className="font-mono text-xs text-cyan-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4 text-cyan-400" /> AI Overview Snippet: Website Security Scanning
            </h2>
            <div className="space-y-6 text-sm text-gray-300 font-sans leading-relaxed">
              <div>
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Definition Block: What Is a Website Security Scanner?</span>
                <p className="text-gray-300">
                  A <strong>Website Security Scanner</strong> is an automated system that analyzes domains to discover vulnerabilities, misconfigurations, and exposure risks. It audits parameters like SSL/TLS setups, HTTP headers, DNS configurations, and open ports.
                </p>
              </div>

              {/* Definition Block: What Is Attack Surface Analysis? */}
              <div className="border-t border-white/5 pt-4">
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Definition Block: What Is Attack Surface Analysis?</span>
                <p className="text-gray-300">
                  <strong>Attack Surface Analysis</strong> is the continuous mapping of an organization's public-facing assets, including domains, subdomains, open ports, and host records. It catalogs exposed services to limit entrance opportunities for threat actors.
                </p>
              </div>

              {/* Definition Block: What Is a Vulnerability Assessment? */}
              <div className="border-t border-white/5 pt-4">
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Definition Block: What Is a Vulnerability Assessment?</span>
                <p className="text-gray-300">
                  A <strong>vulnerability assessment</strong> is a structured security review that identifies, quantifies, and categorizes security weaknesses in web applications and host servers using standardized frameworks like CVSS.
                </p>
              </div>

              {/* Definition Block: What Is Passive Security Scanning? */}
              <div className="border-t border-white/5 pt-4">
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Definition Block: What Is Passive Security Scanning?</span>
                <p className="text-gray-300">
                  <strong>Passive Security Scanning</strong> is a non-intrusive reconnaissance method that extracts infrastructure configuration data from public records, response headers, and certificates without sending intrusive exploit payloads.
                </p>
              </div>
              
              {/* TLDR Section & Key Takeaways */}
              <div className="border-t border-white/5 pt-4">
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// TL;DR Section</span>
                <p className="text-gray-400 text-xs font-mono">
                  ReconShield functions as an AI-powered security assessment platform, providing deep visibility into infrastructure exposures, configuration gaps, and public attack surfaces without causing server disruption.
                </p>
              </div>

              <div className="border-t border-white/5 pt-4">
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Key Takeaways</span>
                <ul className="list-disc pl-5 text-gray-400 text-xs space-y-2 font-mono">
                  <li><strong>Security Audits:</strong> Evaluates SSL certificates, HTTP headers, and DNSSEC records.</li>
                  <li><strong>Exposure Ratings:</strong> Rates risk based on exposed administrative ports and subdomains.</li>
                  <li><strong>Threat Prevention:</strong> Minimizes spoofing risks by auditing SPF/DKIM/DMARC settings.</li>
                  <li><strong>OSINT Support:</strong> Compiles technology stacks and BGP routing prefixes.</li>
                </ul>
              </div>

              {/* Fact Box: What ReconShield Scanner Checks */}
              <div className="border-t border-white/5 pt-4">
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Fact Box: What ReconShield Scanner Checks</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono text-gray-400 mt-2">
                  <div>
                    <span className="text-[10px] text-gray-600 uppercase block">SSL/TLS layers:</span>
                    <span>Expiry, ciphers & protocols</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-600 uppercase block">HTTP response:</span>
                    <span>CSP, HSTS & security headers</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-600 uppercase block">Mail records:</span>
                    <span>SPF, DKIM & DMARC alignment</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-600 uppercase block">Infrastructure:</span>
                    <span>Open ports, hosting provider, ASN</span>
                  </div>
                </div>
              </div>

              {/* Expert Summary */}
              <div className="border-t border-white/5 pt-4">
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Expert Summary</span>
                <p className="text-gray-400 text-xs leading-relaxed font-sans">
                  The ReconShield Scanner serves as an advanced website security and attack surface auditor. By evaluating public-facing network signals, organizations can isolate configuration issues, enforce transport encryption, and protect their brand sending reputation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Differentiation Grid */}
      <section className="py-16 bg-[#0a0d14] border-b border-white/5" aria-label="Feature Differentiation">
        <div className="max-w-[1000px] mx-auto px-6">
          <h2 className="text-2xl font-display font-bold text-white mb-8 text-center">ReconShield Core Scoring Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 not-prose">
            <div className="p-5 bg-surface-900 border border-white/5 rounded-2xl text-center">
              <Shield className="w-8 h-8 text-cyan-400 mb-3 mx-auto" />
              <h4 className="text-white text-xs font-bold font-mono uppercase tracking-wider mb-2">Security Score</h4>
              <p className="text-gray-400 text-[10px] leading-relaxed">Measures defensive layers including active security headers, SSL setup, and SPF configurations (0-100).</p>
            </div>
            <div className="p-5 bg-surface-900 border border-white/5 rounded-2xl text-center">
              <AlertTriangle className="w-8 h-8 text-cyan-400 mb-3 mx-auto" />
              <h4 className="text-white text-xs font-bold font-mono uppercase tracking-wider mb-2">Exposure Score</h4>
              <p className="text-gray-400 text-[10px] leading-relaxed">Rates perimeter exposure based on open ports, active subdomains, and exposed server banners.</p>
            </div>
            <div className="p-5 bg-surface-900 border border-white/5 rounded-2xl text-center">
              <Activity className="w-8 h-8 text-cyan-400 mb-3 mx-auto" />
              <h4 className="text-white text-xs font-bold font-mono uppercase tracking-wider mb-2">Trust Rating</h4>
              <p className="text-gray-400 text-[10px] leading-relaxed">Aggregated performance grade (A+ to F) evaluating overall compliance with security standards.</p>
            </div>
            <div className="p-5 bg-surface-900 border border-white/5 rounded-2xl text-center">
              <Target className="w-8 h-8 text-cyan-400 mb-3 mx-auto" />
              <h4 className="text-white text-xs font-bold font-mono uppercase tracking-wider mb-2">Attack Surface Score</h4>
              <p className="text-gray-400 text-[10px] leading-relaxed">Tracks public entry points, resolved subnets, and Autonomous System Numbers (ASN).</p>
            </div>
            <div className="p-5 bg-surface-900 border border-white/5 rounded-2xl text-center">
              <Lock className="w-8 h-8 text-cyan-400 mb-3 mx-auto" />
              <h4 className="text-white text-xs font-bold font-mono uppercase tracking-wider mb-2">Config Health</h4>
              <p className="text-gray-400 text-[10px] leading-relaxed">Evaluates DMARC alignments, DNSSEC validation, and SSL certificate key lengths.</p>
            </div>
          </div>
          <div className="mt-8 text-center text-xs text-gray-500 font-mono">
            * Scores are calculated deterministically by evaluating domain parameters against NIST guidelines and OWASP compliance rules.
          </div>
        </div>
      </section>

      {/* Main Educational Guide */}
      <div className="bg-[#05080f]">
        
        {/* H2: What Is a Website Security Scanner? */}
        <section className="py-20 border-b border-white/5">
          <div className="max-w-[1000px] mx-auto px-6 prose prose-invert max-w-none prose-p:leading-relaxed prose-p:text-gray-400 prose-headings:text-white prose-a:text-cyan-400 hover:prose-a:text-cyan-300">
            
            <h2 className="text-3xl font-display font-bold mt-0 mb-6 flex items-center gap-3">
              <Key className="w-8 h-8 text-cyan-400" />
              What Is a Website Security Scanner?
            </h2>
            <p>
              A <strong>website security scanner</strong> is an automated system designed to scan web domains for security flaws, configuration issues, and public exposure risks. Unlike basic checkers, ReconShield works as an AI-powered security assessment platform, analyzing your external attack surface, tracking host reputations, and validating cryptographic settings.
            </p>

            {/* H2: How Website Security Assessments Work */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">How Website Security Assessments Work</h2>
            <p>
              Security assessment engines query target systems to analyze response parameters. By compiling domain registry records, evaluating SSL certificate handshakes, checking DNSSEC keys, and mapping open ports, the scanner builds a detailed security posture profile.
            </p>

            {/* H2: What ReconShield Scanner Analyzes */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">What ReconShield Scanner Analyzes</h2>
            <p>
              ReconShield performs a multi-layered passive analysis, inspecting:
            </p>
            <ul>
              <li><strong>Domain Intelligence:</strong> Registration locks, WHOIS timestamps, and server locations.</li>
              <li><strong>DNS Security:</strong> Cryptographic DNSSEC settings and DNS records.</li>
              <li><strong>SSL/TLS Layers:</strong> Cipher suite compatibility and handshake protocols.</li>
              <li><strong>HTTP Headers:</strong> Content-Security-Policy (CSP), HSTS, and X-Frame-Options rules.</li>
              <li><strong>Email Security:</strong> SPF record lookups, DKIM selectors, and DMARC alignments.</li>
            </ul>

            {/* H2: Domain Intelligence Analysis */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">Domain Intelligence Analysis</h2>
            <p>
              Analyzing domain registration records reveals registrar details, registration duration, and administrative transfer locks. This intelligence helps security teams track registration expiration risks and prevent unauthorized domain hijacking.
            </p>

            {/* H2: DNS Security Assessment */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">DNS Security Assessment</h2>
            <p>
              DNS security audits verify DNSSEC key configurations and check zone file parameters. These safeguards prevent DNS hijacking, cache poisoning, and unauthorized redirection of your web visitors.
            </p>

            {/* H2: SSL/TLS Security Analysis */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">SSL/TLS Security Analysis</h2>
            <p>
              Cryptographic layer audits inspect key length parameters, certificate expiry dates, and cipher configurations. Enforcing modern protocols like TLS 1.3 protects visitor data from interception.
            </p>

            {/* H2: Security Headers Analysis */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">Security Headers Analysis</h2>
            <p>
              HTTP response headers allow servers to restrict browser execution environments. Deploying strict policies (like CSP, HSTS, and X-Frame-Options) helps prevent client-side XSS and clickjacking attacks.
            </p>

            {/* H2: Email Security Analysis */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">Email Security Analysis</h2>
            <p>
              Email validation verifies SPF lookup counts, DKIM public keys, and DMARC rules. Transitioning DMARC policies to reject (`p=reject`) protects your brand reputation from domain spoofing and phishing campaigns.
            </p>

            {/* H2: Infrastructure Exposure Detection */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">Infrastructure Exposure Detection</h2>
            <p>
              Exposed boundaries include active administrative ports, server version banners, and shared hosting networks. The scanner maps these public network attributes to identify potential vulnerabilities.
            </p>

            {/* H2: Attack Surface Discovery */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">Attack Surface Discovery</h2>
            <p>
              Attack surface analysis maps all public assets, subdomains, and open ports. Keeping this map updated helps organizations audit exposed components and reduce their entry footprint.
            </p>

            {/* H2: Technology Stack Intelligence */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">Technology Stack Intelligence</h2>
            <p>
              Fingerprinting active web software identifies CMS platforms, JavaScript libraries, and hosting providers. Tracking these software versions allows administrators to locate and patch outdated components.
            </p>

            {/* H2: Website Risk Scoring */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">Website Risk Scoring</h2>
            <p>
              ReconShield scores domains by evaluating security headers, cryptographic setups, mail authentication records, and open ports against standard CVSS metrics to grade overall security health.
            </p>

            {/* H2: Threat Intelligence Correlation */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">Threat Intelligence Correlation</h2>
            <p>
              Correlating server signatures with real-time CVE vulnerability lists and threat blocklists helps security teams prioritize and address high-risk exposures.
            </p>

            {/* H2: Website Security Best Practices */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">Website Security Best Practices</h2>
            <p>
              Implement these essential website security best practices:
            </p>
            <ul>
              <li>Configure strict HTTP security headers (like Content Security Policy).</li>
              <li>Enforce modern TLS 1.3 cryptographic suites and monitor certificate expiry.</li>
              <li>Secure email systems by deploying DMARC policies with reject rules.</li>
              <li>Close unnecessary open ports and restrict administrative service visibility.</li>
            </ul>

            {/* H2: How Security Teams Use ReconShield */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">How Security Teams Use ReconShield</h2>
            <p>
              Security teams integrate ReconShield's passive assessment platform into their CI/CD deployment pipelines, perform weekly perimeter audits, and generate security reports to maintain defense baselines.
            </p>

            {/* H2: ReconShield Scanner vs Traditional Vulnerability Scanners */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">ReconShield Scanner vs Traditional Vulnerability Scanners</h2>
            <p>
              Traditional vulnerability scanners often send disruptive exploit payloads to target servers, risking downtime. ReconShield uses passive, non-intrusive checks to audit configurations safely from cached records and response headers.
            </p>

          </div>
        </section>

        {/* Backlink Magnet / Security Reports Section */}
        <section className="py-20 bg-[#0a0d14] border-b border-white/5">
          <div className="max-w-[1000px] mx-auto px-6 prose prose-invert max-w-none">
            <h2 className="text-3xl font-display font-bold text-white mb-6">ReconShield Threat Research & Security Benchmarks</h2>
            <p className="text-gray-400 mb-8">
              We publish quarterly cybersecurity metrics, exposure trend reports, and security adoption statistics. Explore our latest research datasets:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose my-8">
              <div className="p-6 rounded-2xl bg-surface-900 border border-white/5">
                <h4 className="text-white font-bold mb-2">Global SSL/TLS Adoption Report</h4>
                <p className="text-xs text-gray-400 mb-4">An analysis of cryptographic cipher usage, TLS 1.3 adoption rates, and common CA trust trends across the top 1 million domains.</p>
                <Link href="/stats/tls-adoption" className="text-cyan-400 text-xs font-mono flex items-center gap-1">View TLS Dataset <ChevronRight className="w-3.5 h-3.5"/></Link>
              </div>
              <div className="p-6 rounded-2xl bg-surface-900 border border-white/5">
                <h4 className="text-white font-bold mb-2">HTTP Security Headers Benchmark</h4>
                <p className="text-xs text-gray-400 mb-4">Tracking Content Security Policy (CSP) deployments, HSTS configurations, and header hardening compliance trends.</p>
                <Link href="/stats/security-headers" className="text-cyan-400 text-xs font-mono flex items-center gap-1">View Header Dataset <ChevronRight className="w-3.5 h-3.5"/></Link>
              </div>
            </div>
          </div>
        </section>

        {/* Tool Ecosystem workflow (Tool Ecosystem) */}
        <section className="py-20 border-b border-white/5">
          <div className="max-w-[1000px] mx-auto px-6 prose prose-invert max-w-none">
            <h2 className="text-3xl font-display font-bold text-white mb-6 text-center">ReconShield Security Workflow</h2>
            <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">
              For complete attack surface intelligence, run our connected security diagnostics workflow:
            </p>
            
            <div className="space-y-4 max-w-3xl mx-auto not-prose font-sans">
              {[
                { name: "1. WHOIS Lookup", desc: "Query domain registration records, administrative locks, and expiration timelines.", link: "/tools/whois" },
                { name: "2. DNS Lookup", desc: "Resolve authoritative DNS records (A, MX, TXT) and check DNSSEC key configurations.", link: "/tools/dns-lookup" },
                { name: "3. Subdomain Finder", desc: "Passively compile active subdomains from CT logs and search indices.", link: "/tools/subdomain-finder" },
                { name: "4. Tech Detector", desc: "Fingerprint web servers, CMS systems, frameworks, and analytics modules.", link: "/tools/tech-detector" },
                { name: "5. SSL Checker", desc: "Audit TLS cipher suite strength, certificate chains, and handshake errors.", link: "/tools/ssl-checker" },
                { name: "6. HTTP Headers", desc: "Evaluate security headers (CSP, HSTS) to protect visitors from scripting threats.", link: "/tools/http-headers" },
                { name: "7. Port Scanner", desc: "Scan network hosts passively to check for exposed administrative interfaces.", link: "/tools/port-scanner" },
                { name: "8. IP Lookup", desc: "Check IP address geolocation records, Autonomous System Numbers (ASN), and reputations.", link: "/tools/ip-lookup" },
                { name: "9. Email Security", desc: "Audit email authentication controls (SPF, DKIM, DMARC) to prevent brand spoofing.", link: "/tools/email-security" },
                { name: "10. Vulnerability Scanner", desc: "Aggregate perimeter exposure data, score security configs, and prioritize updates.", link: "/tools/vulnerability-scanner" }
              ].map((step, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-surface-900 border border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-cyan-500/20 transition-all">
                  <div>
                    <h4 className="text-white font-bold text-sm mb-1">{step.name}</h4>
                    <p className="text-gray-400 text-xs">{step.desc}</p>
                  </div>
                  <Link href={step.link} className="text-cyan-400 hover:text-cyan-300 text-xs font-mono flex items-center gap-1 shrink-0">
                    Open Tool <ChevronRight className="w-3 h-3"/>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* E-E-A-T section (Phase 9) */}
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
                  Surendra is an information security engineer specializing in vulnerability management, network diagnostics, and attack surface analytics. He built ReconShield to help teams manage and secure their public-facing digital footprint.
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
              Last Updated: June 2026 | Reviewed by ReconShield Technical Board | Reference: OWASP, NIST, CISA, MITRE, IETF
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 border-t border-white/5 bg-[#0a0d14]" aria-labelledby="faq-title">
          <div className="max-w-[900px] mx-auto px-6">
            <h2 id="faq-title" className="text-3xl font-display font-bold text-white mb-10 text-center">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 gap-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-surface-900 border border-white/10 rounded-2xl p-6 hover:border-cyan-500/20 transition-all">
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
