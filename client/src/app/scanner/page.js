import React from 'react';
import Link from 'next/link';
import { 
  Shield, Globe, Server, Lock, Terminal, CheckCircle2, ChevronRight, 
  Search, Activity, Target, Network, Info, Check, AlertTriangle, 
  FileText, Send, HelpCircle, BookOpen, Key, Database, Clock, ArrowRight,
  Eye, Zap, ListTodo, ShieldAlert, Award
} from 'lucide-react';
import { generateBaseMetadata } from '@/utils/metadata';
import ScannerHubClient from '@/components/ScannerHubClient';
import { client, homepageBlogQuery } from '@/utils/sanity';

export const metadata = generateBaseMetadata({
  title: "Free Website Security Scanner & Vulnerability Assessment Tool",
  description: "Audit domains with our free online website security scanner. Run passive vulnerability assessments for SSL certificates, open ports, security headers, and attack surface configurations.",
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
      a: "A website security scanner is an automated tool that analyzes public domains for configuration issues, certificate exposures, and protocol vulnerabilities. ReconShield runs non-intrusive tests against HTTP response headers, SSL/TLS configurations, DNSSEC, open ports, and mail records to produce a security score."
    },
    {
      q: "How does passive scanning work?",
      a: "Passive scanning gathers domain configurations, registrar data, certificate transparency (CT) logs, and DNS records from public lookup indices. Unlike active vulnerability scanning, it does not send exploit payloads or trigger network intrusion detection systems (IDS)."
    },
    {
      q: "Is passive scanning legal?",
      a: "Yes, passive scanning is 100% legal. It only requests publicly accessible infrastructure information and cached records, which web servers freely transmit. It does not exploit systems or attempt unauthorized entry."
    },
    {
      q: "Can ReconShield find vulnerabilities?",
      a: "Yes. ReconShield identifies high-risk exposures including missing HTTP security headers, deprecated TLS versions, weak cryptographic ciphers, open administrative ports, invalid SPF/DMARC email records, and outdated web server frameworks."
    },
    {
      q: "What is attack surface analysis?",
      a: "Attack surface analysis is the continuous cataloging of all public-facing digital assets, subdomains, open TCP/UDP ports, host records, and network ranges. Identifying these entry points helps companies harden their systems before threat actors exploit them."
    },
    {
      q: "How often should I scan my website?",
      a: "Website scans should be performed weekly or after any major configuration and code deployments. Because new security vulnerability disclosures (CVEs) occur daily, automated audits help ensure security hygiene remains up to date."
    },
    {
      q: "What is the difference between passive and active scanning?",
      a: "Passive scanning is non-intrusive and reads publicly accessible records with zero risk of downtime. Active scanning interacts directly with server components, using scripting and exploit payloads to discover internal system bugs, which requires target authorization."
    },
    {
      q: "Can this scanner detect SQL injection or XSS?",
      a: "Passive tools do not execute form submissions or database queries to detect active SQL injection. However, ReconShield checks for missing defensive configurations like Content Security Policy (CSP), which is the primary browser-side mitigation for Cross-Site Scripting (XSS)."
    },
    {
      q: "What makes email security relevant to a website security scanner?",
      a: "Email protocols (SPF, DKIM, DMARC) are managed in domain DNS records. If misconfigured, threat actors can spoof corporate email addresses, damage sending domain reputation, and launch phishing campaigns targeting users."
    },
    {
      q: "How do I fix a low security score?",
      a: "Fixing a low score involves: 1) Deploying strict security headers (HSTS, CSP, X-Frame-Options); 2) Updating TLS configurations to support only TLS 1.2 and 1.3; 3) Enabling strict DMARC rules (p=reject); 4) Closing exposed administration ports."
    }
  ];

  const breadcrumbs = [
    { name: "Home", url: "https://reconshield.in" },
    { name: "Website Security Scanner", url: "https://reconshield.in/scanner" }
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
          "name": "Free Website Security Scanner & Vulnerability Assessment Tool",
          "isPartOf": { "@id": "https://reconshield.in/#website" }
        },
        {
          "@type": "SoftwareApplication",
          "@id": "https://reconshield.in/scanner#software",
          "name": "ReconShield Website Security Scanner",
          "url": "https://reconshield.in/scanner",
          "description": "Free online security assessment and vulnerability assessment tool. Evaluates SSL certificates, HTTP headers, DNS configurations, open ports, and email security protocols passively.",
          "applicationCategory": "SecurityApplication",
          "operatingSystem": "All",
          "offers": { "@type": "Offer", "price": "0.00", "priceCurrency": "USD" },
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
        
        {/* Section 1: What Is a Website Security Scanner? */}
        <section className="py-20 border-b border-white/5" aria-labelledby="section-what-is">
          <div className="max-w-[1000px] mx-auto px-6 prose prose-invert max-w-none prose-p:leading-relaxed prose-p:text-gray-400 prose-headings:text-white prose-a:text-cyan-400 hover:prose-a:text-cyan-300">
            
            <h2 id="section-what-is" className="text-3xl font-display font-bold mt-0 mb-6 flex items-center gap-3">
              <Key className="w-8 h-8 text-cyan-400" />
              What Is a Website Security Scanner?
            </h2>
            <p>
              A <strong>website security scanner</strong> is an automated software application designed to audit web-facing domains, evaluate system configurations, and flag security exposures. In modern web environments, security cannot be treated as a single perimeter wall. Instead, administrators must implement a defense-in-depth architecture. Using an online security scanner allows security teams and developers to run non-intrusive tests to map out public exposures and fix misconfigurations before threat actors exploit them.
            </p>
            <p>
              Unlike legacy scanning frameworks that require server-side agents or invasive scripting, ReconShield functions as a passive security scanner. It harvests public intelligence records, inspects host metadata, and correlates DNS data. This process ensures a robust assessment of your attack surface without risking application downtime or violating compliance rules.
            </p>

            <h3 className="text-xl font-bold mt-10 mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5 text-cyan-400" />
              DNS Security & Zone Records Analysis
            </h3>
            <p>
              Domain Name System (DNS) configurations represent the foundational routing layer of the web. A security scanner inspects zone records to ensure that name servers are configured securely and that DNSSEC (Domain Name System Security Extensions) cryptographic signatures are enabled. DNSSEC protects visitors from cache poisoning and DNS spoofing campaigns. Furthermore, auditing DNS includes reviewing CAA (Certification Authority Authorization) records to specify exactly which certificate authorities are permitted to issue SSL certificates for the domain, preventing unauthorized certificate generation. To run an in-depth investigation on your zone structures, you can use our <Link href="/tools/dns-lookup">comprehensive DNS Lookup utility</Link> or retrieve registry locks with a <Link href="/tools/whois">detailed WHOIS Lookup query</Link>.
            </p>

            <h3 className="text-xl font-bold mt-10 mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5 text-cyan-400" />
              SSL/TLS Certificate & Handshake Inspection
            </h3>
            <p>
              Secure Sockets Layer (SSL) and Transport Layer Security (TLS) establish encrypted tunnels between client browsers and hosting servers. A website security scanner evaluates the cryptographic strength of these tunnels. The scanner audits the certificate chain of trust, expiration timelines, key lengths (e.g., RSA 2048-bit or ECC 256-bit), and negotiated protocol versions. Enforcing modern TLS 1.3 protocols and disabling outdated TLS 1.0 and 1.1 versions is critical to block man-in-the-middle (MitM) decryption attacks. Developers can audit their certificate configurations directly using our <Link href="/tools/ssl-checker">online SSL Checker tool</Link> to ensure compatibility and compliance with standards.
            </p>

            <h3 className="text-xl font-bold mt-10 mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-cyan-400" />
              HTTP Security Headers & Client-Side Protections
            </h3>
            <p>
              HTTP response headers allow servers to control how modern browsers render web pages and execute scripts. Hardening these policies is a critical step in client-side defense. Important headers include <code>Content-Security-Policy (CSP)</code> to prevent cross-site scripting (XSS), <code>Strict-Transport-Security (HSTS)</code> to enforce HTTPS usage, and <code>X-Frame-Options</code> to block clickjacking attempts. A dedicated <Link href="/tools/http-headers">HTTP Security Headers Checker</Link> scans server headers to ensure defensive parameters are deployed correctly, limiting the browser's execution boundaries.
            </p>

            <h3 className="text-xl font-bold mt-10 mb-4 flex items-center gap-2">
              <Send className="w-5 h-5 text-cyan-400" />
              Email Security Auditing & Anti-Spoofing Protocol Alignment
            </h3>
            <p>
              Email phishing is a leading vector for corporate brand impersonation and business email compromise (BEC). A domain security scanner reviews email authentication records deployed in a domain's DNS zones. These protocols include SPF (Sender Policy Framework), DKIM (DomainKeys Identified Mail), and DMARC (Domain-based Message Authentication, Reporting, and Conformance). Establishing a strict DMARC rule (such as <code>p=reject</code>) instructs receiving servers to block emails that fail alignment tests. Administrators should leverage a dedicated <Link href="/tools/email-security">Email Security Checker</Link> to ensure SPF lookups remain under the RFC-mandated limit of 10 and prevent domain spoofing.
            </p>

            <h3 className="text-xl font-bold mt-10 mb-4 flex items-center gap-2">
              <Database className="w-5 h-5 text-cyan-400" />
              Web Technology Stack Fingerprinting
            </h3>
            <p>
              Technology stack fingerprinting involves analyzing public server response headers, cookies, and page structures to identify CMS systems (such as WordPress or Next.js), scripting libraries, CDNs, and active firewalls (WAF). Knowing these technologies allows administrators to match components against vulnerability databases (like CVEs) and patch outdated packages. Utilizing a <Link href="/tools/tech-detector">web technology stack detector</Link> helps maintain visibility over software configurations across all corporate assets.
            </p>

            <h3 className="text-xl font-bold mt-10 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-cyan-400" />
              Passive Attack Surface Discovery & OSINT Reconnaissance
            </h3>
            <p>
              An organization's attack surface consists of all internet-accessible entry points. Attack surface discovery uses Open Source Intelligence (OSINT) to find active subdomains, trace hosting providers, map IP spaces, and query recursive records. Identifying these assets is critical to prevent dangling DNS entries and subdomain takeover vulnerabilities. Security teams can run a <Link href="/tools/subdomain-finder">passive subdomain discovery tool</Link> alongside a <Link href="/tools/port-scanner">passive network Port Scanner</Link> to map their network perimeter and close unneeded open ports.
            </p>

          </div>
        </section>

        {/* Section 2: Passive vs Active Security Scanning */}
        <section className="py-20 border-b border-white/5 bg-[#0a0d14]/30" aria-labelledby="section-passive-active">
          <div className="max-w-[1000px] mx-auto px-6">
            <h2 id="section-passive-active" className="text-3xl font-display font-bold text-white mb-6 text-center">
              Passive vs Active Security Scanning
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed text-center max-w-3xl mx-auto mb-10">
              Understanding the difference between passive and active methodologies is essential when selecting a vulnerability assessment tool. Both methodologies play key roles in cybersecurity, but they differ significantly in their risk profile, speed, compliance requirements, and execution.
            </p>

            <div className="overflow-x-auto border border-white/10 rounded-2xl bg-surface-900/50 backdrop-blur-md">
              <table className="min-w-full divide-y divide-white/10 font-sans">
                <thead>
                  <tr className="bg-surface-950 text-left">
                    <th className="py-4 px-6 text-xs font-mono font-bold text-white uppercase tracking-wider">Comparison Metric</th>
                    <th className="py-4 px-6 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">Passive Security Scanning (ReconShield)</th>
                    <th className="py-4 px-6 text-xs font-mono font-bold text-purple-400 uppercase tracking-wider">Active Vulnerability Scanning</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-xs text-gray-300">
                  <tr>
                    <td className="py-4 px-6 font-bold text-white">System Safety</td>
                    <td className="py-4 px-6 text-emerald-400 font-semibold">100% Safe. Zero risk of service disruption or server crashes.</td>
                    <td className="py-4 px-6 text-yellow-400">Potential Risk. Can trigger database locks, application faults, or resource exhaustion.</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-bold text-white">Detection Capability</td>
                    <td className="py-4 px-6">Exposed records, SSL/TLS settings, security headers, open ports, mail records, tech stacks.</td>
                    <td className="py-4 px-6">Deep code vulnerabilities, SQL injection, buffer overflows, remote code execution (RCE).</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-bold text-white">Authorization Needs</td>
                    <td className="py-4 px-6 text-emerald-400 font-semibold">None. Uses publicly accessible DNS, HTTP records, and public search logs.</td>
                    <td className="py-4 px-6 text-red-400 font-semibold">Strict Authorization Required. Scanning without permission can be illegal.</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-bold text-white">Primary Use Cases</td>
                    <td className="py-4 px-6">Continuous perimeter auditing, third-party risk management (TPRM), supply chain audits, rapid OSINT.</td>
                    <td className="py-4 px-6">Internal systems auditing, pre-release software validation, deep penetration testing.</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-bold text-white">Operational Risk Level</td>
                    <td className="py-4 px-6 text-emerald-400 font-bold uppercase">Zero Risk</td>
                    <td className="py-4 px-6 text-red-400 font-bold uppercase">Moderate to High Risk</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-500 text-[11px] font-mono mt-4 text-center">
              * Note: Passive assessments are ideal for continuous digital hygiene and checking third-party dependencies, whereas active testing is suited for internal code review.
            </p>
          </div>
        </section>

        {/* Section 3: What Can ReconShield Detect? */}
        <section className="py-20 border-b border-white/5" aria-labelledby="section-detect-capabilities">
          <div className="max-w-[1000px] mx-auto px-6">
            <h2 id="section-detect-capabilities" className="text-3xl font-display font-bold text-white mb-6 text-center">
              What Can ReconShield Detect?
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed text-center max-w-3xl mx-auto mb-12">
              Our passive vulnerability assessment engine correlates public records to flag security exposures. ReconShield maps your external attack surface to identify critical risks across seven primary categories:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
              
              <div className="p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-cyan-500/20 transition-all">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-4">
                  <Globe className="w-5 h-5" />
                </div>
                <h4 className="text-white font-bold text-base mb-2 uppercase tracking-wide">1. DNS Misconfigurations</h4>
                <p className="text-gray-400 text-xs leading-relaxed">
                  Detects missing DNSSEC records, wildcard entries, and misconfigured nameservers. Identifying these issues is key to preventing DNS hijacking and domain takeover attacks.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-cyan-500/20 transition-all">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-4">
                  <Lock className="w-5 h-5" />
                </div>
                <h4 className="text-white font-bold text-base mb-2 uppercase tracking-wide">2. SSL Certificate Issues</h4>
                <p className="text-gray-400 text-xs leading-relaxed">
                  Identifies expired certificates, self-signed keys, mismatch errors, weak cipher suites, and outdated protocol versions like TLS 1.0/1.1 to help secure data in transit.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-cyan-500/20 transition-all">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-4">
                  <Shield className="w-5 h-5" />
                </div>
                <h4 className="text-white font-bold text-base mb-2 uppercase tracking-wide">3. Missing Security Headers</h4>
                <p className="text-gray-400 text-xs leading-relaxed">
                  Flags missing client-side protections like Content-Security-Policy (CSP), Strict-Transport-Security (HSTS), X-Frame-Options, and referrer policies that mitigate XSS and clickjacking.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-cyan-500/20 transition-all">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-4">
                  <Terminal className="w-5 h-5" />
                </div>
                <h4 className="text-white font-bold text-base mb-2 uppercase tracking-wide">4. Open Network Ports</h4>
                <p className="text-gray-400 text-xs leading-relaxed">
                  Passively tracks exposed administrative interfaces (such as SSH on port 22, RDP on port 3389, Telnet, or public database connections) to reduce entry routes.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-cyan-500/20 transition-all">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-4">
                  <Send className="w-5 h-5" />
                </div>
                <h4 className="text-white font-bold text-base mb-2 uppercase tracking-wide">5. Email Authentication Problems</h4>
                <p className="text-gray-400 text-xs leading-relaxed">
                  Audits SPF records for lookups over the limit, checks DKIM selector validity, and flags missing or weak DMARC policies (like <code>p=none</code>) that expose domains to spoofing.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-cyan-500/20 transition-all">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-4">
                  <Database className="w-5 h-5" />
                </div>
                <h4 className="text-white font-bold text-base mb-2 uppercase tracking-wide">6. Technology Stack Exposure</h4>
                <p className="text-gray-400 text-xs leading-relaxed">
                  Fingerprints server types, CMS frameworks, CDN setups, and software versions. Disclosing these details can help threat actors identify targets with known CVEs.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-cyan-500/20 transition-all md:col-span-2 lg:col-span-1">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-4">
                  <Target className="w-5 h-5" />
                </div>
                <h4 className="text-white font-bold text-base mb-2 uppercase tracking-wide">7. Attack Surface Visibility</h4>
                <p className="text-gray-400 text-xs leading-relaxed">
                  Compiles active subdomains, public IP ranges, and ASN routing paths. Maintaining this inventory helps prevent shadow IT exposures and orphan subdomains.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* Section 4: Conversion Optimization: Why Choose ReconShield? */}
        <section className="py-20 bg-[#0a0d14]/40 border-b border-white/5" aria-labelledby="section-why-reconshield">
          <div className="max-w-[1000px] mx-auto px-6 font-sans">
            <h2 id="section-why-reconshield" className="text-3xl font-display font-bold text-white mb-10 text-center uppercase tracking-wide">
              Transform Your Security Workflow
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="p-8 rounded-3xl bg-gradient-to-b from-[#0d1117] to-transparent border border-white/5 relative overflow-hidden text-center">
                <Zap className="w-8 h-8 text-cyan-400 mb-4 mx-auto" />
                <h4 className="text-white font-bold text-lg mb-2">Key Features</h4>
                <p className="text-gray-400 text-xs leading-relaxed">
                  Modular diagnostic engines, auto-correlated scores (Security, Exposure, Trust), and real-time DNS queries packaged in a zero-configuration dashboard.
                </p>
              </div>
              <div className="p-8 rounded-3xl bg-gradient-to-b from-[#0d1117] to-transparent border border-white/5 relative overflow-hidden text-center">
                <ListTodo className="w-8 h-8 text-[#00ff88] mb-4 mx-auto" />
                <h4 className="text-white font-bold text-lg mb-2">Primary Use Cases</h4>
                <p className="text-gray-400 text-xs leading-relaxed">
                  Continuous digital hygiene audits, rapid OSINT during security assessments, third-party vendor risk scoring, and post-deployment validation.
                </p>
              </div>
              <div className="p-8 rounded-3xl bg-gradient-to-b from-[#0d1117] to-transparent border border-white/5 relative overflow-hidden text-center">
                <Award className="w-8 h-8 text-purple-400 mb-4 mx-auto" />
                <h4 className="text-white font-bold text-lg mb-2">System Benefits</h4>
                <p className="text-gray-400 text-xs leading-relaxed">
                  100% passive scans carry no operational risk. Review your configurations legally, instantly, and with zero setup or impact on target servers.
                </p>
              </div>
            </div>

            {/* Why Choose & Trusted By */}
            <div className="p-8 rounded-3xl bg-surface-900 border border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-3 max-w-xl">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 text-[10px] font-mono uppercase tracking-wider">
                  <ShieldAlert className="w-3.5 h-3.5" /> Built for Modern Security Teams
                </div>
                <h3 className="text-white font-bold text-xl uppercase tracking-wide">Trusted by Security Professionals</h3>
                <p className="text-gray-400 text-xs leading-relaxed">
                  ReconShield is designed by security practitioners to provide developers and engineers with clear, actionable security indicators. Our scoring models are grounded in verified frameworks including the OWASP Top 10, NIST Guidelines, CISA directives, and CVSS parameters.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 shrink-0 text-center font-mono">
                <div className="p-4 bg-surface-950 border border-white/5 rounded-2xl w-32">
                  <span className="text-white font-bold text-lg block">100%</span>
                  <span className="text-gray-500 text-[9px] uppercase">Compliance</span>
                </div>
                <div className="p-4 bg-surface-950 border border-white/5 rounded-2xl w-32">
                  <span className="text-cyan-400 font-bold text-lg block">Passive</span>
                  <span className="text-gray-500 text-[9px] uppercase">Recon Only</span>
                </div>
              </div>
            </div>

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
                { name: "8. Email Security Check", desc: "Audit email authentication controls (SPF, DKIM, DMARC) to prevent brand spoofing.", link: "/tools/email-security" },
                { name: "9. Vulnerability Scanner", desc: "Aggregate perimeter exposure data, score security configs, and prioritize updates.", link: "/tools/vulnerability-scanner" }
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
            <div className="grid grid-cols-1 gap-6 text-sans">
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
