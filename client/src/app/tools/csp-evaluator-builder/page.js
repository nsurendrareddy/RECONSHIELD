import React from 'react';
import CspEvaluatorClient from '@/components/CspEvaluatorClient';
import FlagshipToolGuide from '@/components/FlagshipToolGuide';

export const metadata = {
  title: "CSP Level 3 Evaluator & Header Builder | ReconShield",
  description: "Evaluate Content Security Policy headers, detect XSS vulnerabilities, and generate Nginx, Apache, and Next.js CSP configuration snippets. 100% free.",
  alternates: {
    canonical: "https://reconshield.in/tools/csp-evaluator-builder",
  },
  keywords: ["csp evaluator", "content security policy builder", "xss protection", "nginx csp header", "csp level 3 generator"]
};

export default function CspEvaluatorPage() {
  const faqs = [
    { question: "What is Content Security Policy (CSP)?", answer: "CSP is an HTTP response header that defines which dynamic resources (scripts, styles, images, frames) the browser is allowed to load for a given website, mitigating XSS and data injection attacks." },
    { question: "Why is 'unsafe-inline' dangerous in script-src?", answer: "'unsafe-inline' allows inline script tags and event handlers to execute, completely bypassing CSP XSS protections." },
    { question: "How do I implement CSP nonces in Next.js?", answer: "In Next.js App Router, generate a random base64 nonce in middleware.ts, attach it to response headers, and pass it to inline Script components." },
    { question: "What is the difference between CSP Report-Only and Enforce mode?", answer: "Content-Security-Policy-Report-Only monitors and reports policy violations to a URI without blocking resources, allowing developers to test policies safely before enforcement." },
    { question: "What is object-src 'none'?", answer: "It disables legacy plugin execution like Flash, Java applets, and ActiveX controls in modern web browsers." },
    { question: "Can CSP prevent Clickjacking?", answer: "Yes, using the frame-ancestors directive (e.g. frame-ancestors 'self') restricts which domains are permitted to embed your pages in iframes." },
    { question: "What is strict-dynamic in CSP Level 3?", answer: "strict-dynamic propagates trust from an explicitly trusted nonce script to any scripts that trusted script dynamically loads." },
    { question: "How do I fix CSP violations in Google Tag Manager?", answer: "Whitelist https://www.googletagmanager.com in script-src and use nonces for GTM inline snippet initialization." },
    { question: "What is base-uri 'self'?", answer: "base-uri restricts the URLs that can be used in a document's <base> element, preventing base tag hijacking." },
    { question: "Does CSP replace XSS sanitization?", answer: "No, CSP is a defense-in-depth layer. Input sanitization and context-aware HTML output encoding remain mandatory." },
    { question: "How do I handle WebSocket connections in CSP?", answer: "Add wss:// or ws:// endpoints to the connect-src directive." },
    { question: "What happens when a browser encounters an unknown CSP directive?", answer: "Browsers ignore unrecognized directives and continue enforcing recognized policy directives." },
    { question: "Can I use multiple CSP headers?", answer: "Yes, multiple CSP headers can be returned. Browsers strictly enforce the intersection (most restrictive policy) of all headers." },
    { question: "How do I debug CSP blocks in Chrome DevTools?", answer: "Open the Console tab; Chrome logs red Security Policy Violation notices indicating the blocked directive and URI." },
    { question: "What is form-action directive?", answer: "form-action restricts the URLs that can be used as the target of HTML form submissions." }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "ReconShield CSP Evaluator & Builder",
        "operatingSystem": "All",
        "applicationCategory": "SecurityApplication",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
      },
      {
        "@type": "FAQPage",
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="bg-[#05080f] min-h-screen text-white py-12">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="font-mono text-xs text-matrix-400 font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-matrix-400/10 border border-matrix-400/20">
              // WEB APPLICATION SECURITY SUITE
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white uppercase tracking-tight">
              CSP Level 3 <span className="text-matrix-400">Evaluator &amp; Builder</span>
            </h1>
            <p className="text-gray-400 text-sm sm:text-base font-sans leading-relaxed">
              Design, test, and validate Content Security Policy headers to mitigate Cross-Site Scripting (XSS) and clickjacking attacks.
            </p>
          </div>

          <CspEvaluatorClient />

          <FlagshipToolGuide
            toolName="CSP Level 3 Visual Evaluator & Builder"
            subtitle="Enterprise Content Security Policy Generator and Vulnerability Grader"
            description="Content Security Policy (CSP) is an essential browser security standard specified by the W3C Web Application Security Working Group. It provides a robust, defense-in-depth mechanism against Cross-Site Scripting (XSS), data injection, and clickjacking by instructing modern web browsers to restrict script execution and network requests."
            category="Web Security"
            whatIsContent={
              <p>
                Cross-Site Scripting (XSS) remains one of the most widespread vulnerabilities on the modern web. When an attacker successfully injects malicious JavaScript into a victim&apos;s browser, they gain full access to session cookies, localStorage tokens, DOM content, and API credentials. Content Security Policy (CSP) prevents exploitation by enabling server administrators to declare an explicit whitelist of trusted script, style, image, and frame origins.
              </p>
            }
            howItWorksSteps={[
              { title: "Header Injection", description: "The web server transmits a Content-Security-Policy HTTP header in the HTTP response." },
              { title: "AST Directive Parsing", description: "The browser parses policy directives like script-src, style-src, and frame-ancestors." },
              { title: "Origin Whitelist Check", description: "Before executing any script or fetching a subresource, the browser checks the URI against the whitelist." },
              { title: "Enforcement & Violation Logging", description: "Unauthorized resources are blocked, and violation reports are sent to the report-uri endpoint." }
            ]}
            remediationSnippets={[
              { platform: "Nginx Server", filename: "nginx.conf", code: "add_header Content-Security-Policy \"default-src 'self'; script-src 'self' 'nonce-rAnd0m'; object-src 'none'; frame-ancestors 'self';\" always;" },
              { platform: "Apache HTTPD", filename: ".htaccess", code: "Header set Content-Security-Policy \"default-src 'self'; script-src 'self'; object-src 'none';\"" }
            ]}
            bestPractices={[
              { title: "Avoid 'unsafe-inline'", description: "Never use 'unsafe-inline' in production script-src. Implement cryptographic nonces or hashes instead." },
              { title: "Set object-src 'none'", description: "Disable Flash, Java applets, and active objects to neutralize browser plugin vulnerabilities." }
            ]}
            faqs={faqs}
          />
        </div>
      </div>
    </>
  );
}
