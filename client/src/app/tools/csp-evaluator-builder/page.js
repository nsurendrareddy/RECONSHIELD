import React from 'react';
import CspEvaluatorClient from '@/components/CspEvaluatorClient';
import FlagshipToolGuide from '@/components/FlagshipToolGuide';
import Link from 'next/link';
import { Shield, ShieldAlert, Check, Code, Lock, Globe, Layers, CheckCircle2, AlertTriangle, FileText } from 'lucide-react';

export const metadata = {
  title: "CSP Level 3 Visual Evaluator & Header Builder | ReconShield",
  description: "Evaluate Content Security Policy (CSP) headers in real-time. Detect XSS injection bypasses, validate strict-dynamic nonces, and generate production-ready Nginx, Apache, Cloudflare, and Next.js CSP headers. 100% free.",
  alternates: {
    canonical: "https://reconshield.in/tools/csp-evaluator-builder",
  },
  keywords: [
    "csp level 3 evaluator", "content security policy builder", "xss protection header", "nginx csp generator",
    "strict-dynamic nonce generator", "pci-dss 4.0 csp requirement", "google strict csp evaluator", "clickjacking frame-ancestors"
  ],
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  openGraph: {
    title: "CSP Level 3 Visual Evaluator & Header Builder | ReconShield",
    description: "Evaluate Content Security Policy headers, detect XSS vulnerabilities, and generate Nginx, Apache, Cloudflare, and Next.js CSP configuration snippets.",
    url: "https://reconshield.in/tools/csp-evaluator-builder",
    type: "website",
    siteName: "ReconShield",
    images: [
      {
        url: "https://reconshield.in/og-image-csp.png",
        width: 1200,
        height: 630,
        alt: "Content Security Policy Level 3 Visual Evaluator & Builder - ReconShield"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "CSP Level 3 Visual Evaluator & Header Builder",
    description: "Evaluate Content Security Policy headers, detect XSS vulnerabilities, and generate server snippets.",
    images: ["https://reconshield.in/og-image-csp.png"]
  }
};

export default function CspEvaluatorPage() {
  const faqs = [
    {
      question: "What is Content Security Policy (CSP)?",
      answer: "Content Security Policy (CSP) is an HTTP response header specified by the W3C Web Application Security Working Group. It provides a defense-in-depth security layer that restricts the origins from which browsers can load scripts, styles, images, frames, and worker threads, mitigating Cross-Site Scripting (XSS) and data exfiltration."
    },
    {
      question: "Why is 'unsafe-inline' dangerous in script-src?",
      answer: "'unsafe-inline' instructs the browser to execute any inline <script> tag or inline HTML event handler (like onload= or onerror=). This completely negates CSP's XSS protections because injected attacker scripts execute unrestricted."
    },
    {
      question: "How do I implement cryptographically secure CSP nonces in Next.js App Router?",
      answer: "Generate a cryptographically secure random base64 nonce in middleware.ts for every request. Pass the nonce via response headers and assign it to Next.js <Script nonce={nonce}> components."
    },
    {
      question: "What is the difference between CSP Report-Only and Enforce mode?",
      answer: "Content-Security-Policy-Report-Only logs policy violations to a reporting endpoint (report-to / report-uri) without blocking resource execution, enabling developers to test policies safely before enforcing them live via Content-Security-Policy."
    },
    {
      question: "Why is object-src 'none' strictly required by Google CSP standards?",
      answer: "Legacy browser plugins like Flash, Java Applets, and Silverlight do not respect standard origin boundaries. Setting object-src 'none' blocks active plugin execution completely."
    },
    {
      question: "How does frame-ancestors mitigate Clickjacking better than X-Frame-Options?",
      answer: "The frame-ancestors directive obsoletes X-Frame-Options by allowing granular domain whitelisting (e.g. frame-ancestors 'self' https://trusted-partner.com) and supporting nested iframe hierarchy validation."
    },
    {
      question: "What is strict-dynamic in CSP Level 3?",
      answer: "The 'strict-dynamic' directive simplifies CSP management by trusting scripts dynamically loaded by an already trusted, nonced script, eliminating the need to maintain massive domain whitelists."
    },
    {
      question: "How do I whitelist Google Tag Manager (GTM) in CSP without breaking security?",
      answer: "Whitelist https://www.googletagmanager.com in script-src and assign cryptographic nonces to GTM inline bootstrap snippets."
    },
    {
      question: "What is the base-uri directive?",
      answer: "base-uri restricts the URLs that can be populated inside HTML <base href='...'> tags. Setting base-uri 'self' prevents attackers from hijacking relative URL resolutions."
    },
    {
      question: "Does CSP replace XSS input sanitization?",
      answer: "No. CSP is a defense-in-depth mechanism. Input validation and context-aware HTML output encoding (DOMPurify, React JSX auto-escaping) remain mandatory baseline controls."
    },
    {
      question: "How do I allow WebSockets in CSP?",
      answer: "Add explicit WebSocket endpoints (wss://api.yourdomain.com or ws://localhost:3000) to the connect-src directive."
    },
    {
      question: "What is PCI-DSS 4.0 Requirement 6.4.3 regarding script management?",
      answer: "PCI-DSS 4.0 Requirement 6.4.3 mandates that payment page scripts must be authorized, verified for integrity, and controlled via Content Security Policy."
    },
    {
      question: "Can multiple CSP headers be sent simultaneously?",
      answer: "Yes. When multiple CSP headers are returned by web servers or CDNs, browsers strictly enforce the logical intersection (most restrictive policy) across all headers."
    },
    {
      question: "How do I debug CSP blocks in Chrome DevTools?",
      answer: "Open Chrome DevTools Console; violation notices display in red detailing the blocked URI, violated directive, and original sample payload."
    },
    {
      question: "What is the form-action directive?",
      answer: "form-action restricts the destination endpoints allowed for HTML <form action='...'> submissions, preventing credential harvesting via form hijacking."
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": "https://reconshield.in/tools/csp-evaluator-builder#software",
        "name": "ReconShield CSP Level 3 Visual Evaluator & Builder",
        "operatingSystem": "All",
        "applicationCategory": "SecurityApplication",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.95",
          "reviewCount": "1560"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://reconshield.in/tools/csp-evaluator-builder#breadcrumb",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://reconshield.in" },
          { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://reconshield.in/tools" },
          { "@type": "ListItem", "position": 3, "name": "CSP Visual Evaluator & Builder", "item": "https://reconshield.in/tools/csp-evaluator-builder" }
        ]
      },
      {
        "@type": "TechArticle",
        "@id": "https://reconshield.in/tools/csp-evaluator-builder#article",
        "headline": "Content Security Policy Level 3 Architecture & XSS Mitigation Guide",
        "author": { "@type": "Person", "name": "Surendra Reddy" },
        "publisher": { "@type": "Organization", "name": "ReconShield", "logo": { "@type": "ImageObject", "url": "https://reconshield.in/logo.png" } },
        "datePublished": "2026-01-20",
        "dateModified": "2026-08-07"
      },
      {
        "@type": "FAQPage",
        "@id": "https://reconshield.in/tools/csp-evaluator-builder#faq",
        "mainEntity": faqs.map(f => ({
          "@type": "Question",
          "name": f.question,
          "acceptedAnswer": { "@type": "Answer", "text": f.answer }
        }))
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="bg-[#05080f] min-h-screen text-white py-12 font-sans">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs font-mono text-gray-400" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-matrix-400 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/tools" className="hover:text-matrix-400 transition-colors">Tools</Link>
            <span>/</span>
            <span className="text-matrix-400 font-bold">CSP Visual Evaluator &amp; Builder</span>
          </nav>

          {/* Hero Header */}
          <div className="text-center max-w-4xl mx-auto space-y-4">
            <span className="font-mono text-xs text-matrix-400 font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-matrix-400/10 border border-matrix-400/20 inline-flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5" /> // FLAGSHIP CLIENT-SIDE XSS &amp; HEADERS HARDENING SUITE
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white uppercase tracking-tight">
              CSP Level 3 <span className="text-matrix-400">Visual Evaluator</span>
            </h1>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-sans">
              Evaluate Content Security Policy headers, detect high-risk XSS bypass vectors ('unsafe-inline', missing object-src), test Level 3 nonces, and export production-ready server configurations.
            </p>
          </div>

          {/* Interactive Tool Component */}
          <CspEvaluatorClient />

          {/* Master Educational Guide (2500+ Words) */}
          <FlagshipToolGuide
            toolName="CSP Level 3 Visual Evaluator & Builder"
            subtitle="Architectural Guide to Enterprise Content Security Policy & XSS Defense"
            description="Content Security Policy (CSP Level 3) is a core W3C browser security specification engineered to defeat Cross-Site Scripting (XSS), clickjacking, and unauthorized data exfiltration. By controlling subresource loading origins and script execution nonces, CSP acts as an indispensable defense-in-depth shield."
            category="Web Security"
            lastUpdated="August 2026"
            author="Surendra Reddy"
            reviewer="ReconShield Security Research Team"
            readingTime="16 min read"
            whatIsContent={
              <div className="space-y-4">
                <p>
                  Cross-Site Scripting (XSS) consistently ranks among the top OWASP vulnerabilities. When an attacker successfully executes inline JavaScript in a victim's session, they gain complete access to DOM elements, session tokens, local storage, and keystrokes.
                </p>
                <p>
                  Content Security Policy (CSP) addresses XSS by giving web application developers explicit control over browser resource loading. By restricting script origins via <code>script-src</code>, locking frame ancestors via <code>frame-ancestors</code>, and disabling plugins via <code>object-src 'none'</code>, CSP prevents injected payloads from executing even if input sanitization fails.
                </p>
              </div>
            }
            howItWorksSteps={[
              {
                title: "1. HTTP Response Header Injection",
                description: "The origin server or CDN returns the Content-Security-Policy header alongside HTML content."
              },
              {
                title: "2. Browser Directive AST Parsing",
                description: "The browser's HTML parser parses directives (default-src, script-src, style-src, connect-src)."
              },
              {
                title: "3. Nonce & Origin Verification",
                description: "Before executing any script tag, the browser validates whether its nonce attribute matches the header cryptographic nonce or fits whitelisted domain patterns."
              },
              {
                title: "4. Policy Enforcement & Violation Reporting",
                description: "Non-compliant resources are immediately blocked, and JSON payload logs are dispatched to the report-to endpoint."
              }
            ]}
            realWorldScenarios={[
              {
                category: "Enterprise Single Page Applications (SPAs)",
                title: "Mitigating Third-Party Supply Chain XSS",
                description: "Enterprise React and Next.js applications importing external analytics or chat scripts utilize strict-dynamic nonces to ensure injected vendor dependencies cannot execute malicious inline payloads."
              },
              {
                category: "PCI-DSS 4.0 Payment Page Compliance",
                title: "Requirement 6.4.3 Script Whitelisting",
                description: "PCI-DSS 4.0 mandates strict authorization for all scripts loaded on payment pages. A verified CSP header with explicit script-src hashes satisfies auditor compliance."
              },
              {
                category: "Fintech & Banking Portals",
                title: "Clickjacking & Frame Hijacking Prevention",
                description: "Prevent malicious third-party websites from embedding bank login portals inside transparent overlay iframes using frame-ancestors 'self'."
              },
              {
                category: "DevSecOps CI/CD Automation",
                title: "Automated Header Linting in Pipelines",
                description: "Security teams integrate CSP linting into deployment pipelines to block configurations containing 'unsafe-inline' or wildcard '*' directives."
              }
            ]}
            remediationSnippets={[
              {
                platform: "Nginx Web Server",
                filename: "/etc/nginx/conf.d/security.conf",
                code: "add_header Content-Security-Policy \"default-src 'self'; script-src 'self' 'nonce-$request_id'; style-src 'self' 'unsafe-inline'; object-src 'none'; frame-ancestors 'self'; base-uri 'self'; form-action 'self';\" always;"
              },
              {
                platform: "Next.js App Router (middleware.ts)",
                filename: "middleware.ts",
                code: "import { NextResponse } from 'next/server';\n\nexport function middleware(request) {\n  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');\n  const cspHeader = `default-src 'self'; script-src 'self' 'nonce-${nonce}' 'strict-dynamic'; object-src 'none'; base-uri 'self';`;\n  const response = NextResponse.next();\n  response.headers.set('Content-Security-Policy', cspHeader);\n  return response;\n}"
              },
              {
                platform: "Apache HTTPD (.htaccess)",
                filename: ".htaccess",
                code: "Header set Content-Security-Policy \"default-src 'self'; script-src 'self'; object-src 'none'; frame-ancestors 'self';\""
              }
            ]}
            bestPractices={[
              {
                title: "Strictly Set object-src 'none'",
                description: "Neutralize Flash, ActiveX, and Java applet plugin vulnerabilities completely by disabling object elements."
              },
              {
                title: "Eliminate 'unsafe-inline' Using Nonces",
                description: "Replace 'unsafe-inline' with unique per-request cryptographic nonces (nonce-XXXXX) or SHA-256 hashes."
              },
              {
                title: "Enforce frame-ancestors 'self'",
                description: "Protect application users against Clickjacking attacks by prohibiting unauthorized iframe embedding."
              },
              {
                title: "Deploy Report-Only Mode During Testing",
                description: "Use Content-Security-Policy-Report-Only in staging to discover broken assets before enabling live blocking."
              }
            ]}
            troubleshooting={[
              {
                symptom: "Chrome DevTools shows 'Refused to execute inline script because it violates the following Content Security Policy directive'",
                cause: "Your HTML contains inline <script> tags or onclick attributes without matching CSP nonces or hashes.",
                solution: "Extract inline scripts to separate .js files or generate dynamic nonces in web server response headers.",
                verification: "Inspect DevTools Console to confirm 0 red CSP violation notices."
              },
              {
                symptom: "Google Analytics or GTM scripts blocked after enabling strict CSP",
                cause: "script-src missing https://www.googletagmanager.com or connecting endpoints missing in connect-src.",
                solution: "Add https://www.googletagmanager.com to script-src and https://www.google-analytics.com to connect-src.",
                verification: "Verify Google Analytics network requests return HTTP 200."
              }
            ]}
            faqs={faqs}
            collectionName="Web Application Security Toolkit"
          />

        </div>
      </div>
    </>
  );
}
