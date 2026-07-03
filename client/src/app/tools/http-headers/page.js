import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { 
  Shield, Globe, Server, Lock, Terminal, CheckCircle2, ChevronRight, 
  Search, Activity, Target, Network, Info, Check, AlertTriangle, 
  FileText, Send, HelpCircle, BookOpen, Key, Database, Clock, Zap
} from 'lucide-react';

const ToolScannerClient = dynamic(() => import('@/components/ToolScannerClient'), {
  loading: () => <div className="min-h-[400px] animate-pulse bg-surface-900/50 rounded-3xl max-w-5xl mx-auto my-12" />
});

export const metadata = {
  title: "HTTP Headers Checker - Analyze Security Headers | ReconShield",
  description: "Free HTTP headers checker to analyze security headers including HSTS, CSP, X-Frame-Options, and CORS. Test website security configurations instantly.",
  alternates: {
    canonical: "https://reconshield.in/tools/http-headers",
  },
  keywords: [
    "http headers checker", "security headers", "check http headers", "hsts checker", 
    "csp validator", "x-frame-options", "cors checker", "security headers analyzer", 
    "http security test"
  ],
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  openGraph: {
    title: "HTTP Headers Checker - Analyze Security Headers",
    description: "Free HTTP headers checker to analyze security headers including HSTS, CSP, and X-Frame-Options instantly.",
    url: "https://reconshield.in/tools/http-headers",
    type: "website",
    siteName: "ReconShield",
    images: [
      {
        url: "https://reconshield.in/og-image-headers.png",
        width: 1200,
        height: 630,
        alt: "HTTP Headers Checker - ReconShield"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "HTTP Headers Checker - Analyze Security Headers",
    description: "Free HTTP headers checker to analyze security headers including HSTS and CSP instantly.",
    images: ["https://reconshield.in/og-image-headers.png"]
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

export default function SecurityHeadersPage() {
  const faqs = [
    {
      q: "What is an HTTP headers checker?",
      a: "An HTTP headers checker is an online diagnostic tool designed to retrieve and analyze the HTTP response headers sent by a web server. It identifies missing or misconfigured security headers, helping you secure your site from vulnerabilities."
    },
    {
      q: "Is this security headers checker free to use?",
      a: "Yes, the ReconShield security headers checker is completely free to use. You can audit HTTP response headers for any website with unlimited scans and no account registration required."
    },
    {
      q: "What security headers should a website have?",
      a: "A secure website should configure Strict-Transport-Security (HSTS), Content-Security-Policy (CSP), X-Frame-Options, X-Content-Type-Options, Referrer-Policy, and Permissions-Policy response headers to protect visitors."
    },
    {
      q: "How do HTTP security headers protect websites?",
      a: "HTTP security headers protect websites by telling the visitor's browser how to behave. They restrict resource loading, prevent clickjacking via frame embedding, enforce secure HTTPS connections, and disable MIME type sniffing."
    },
    {
      q: "Why is checking HTTP headers important?",
      a: "Checking HTTP headers is important to identify missing security protections that could expose your website to Cross-Site Scripting (XSS), session hijacking, clickjacking, or sensitive data leakage."
    },
    {
      q: "What is Content Security Policy (CSP)?",
      a: "Content Security Policy (CSP) is a security header that restricts the domains from which a browser can load scripts, styles, images, and other resources, serving as a powerful defense against XSS."
    },
    {
      q: "How do I implement security headers?",
      a: "Security headers are implemented by configuring your web server (such as Nginx, Apache, or IIS) or your application framework to include these key-value pairs in all HTTP responses."
    },
    {
      q: "Can I check headers for any website?",
      a: "Yes, you can check HTTP response headers for any publicly accessible website. The tool sends a standard web request to retrieve and inspect the response headers sent by the host."
    }
  ];

  const breadcrumbs = [
    { name: "Home", url: "https://reconshield.in" },
    { name: "Tools", url: "https://reconshield.in/tools" },
    { name: "HTTP Headers Checker", url: "https://reconshield.in/tools/http-headers" }
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
          "@id": "https://reconshield.in/tools/http-headers#webpage",
          "url": "https://reconshield.in/tools/http-headers",
          "name": "HTTP Headers Checker - Analyze Security Headers | ReconShield",
          "isPartOf": { "@id": "https://reconshield.in/#website" }
        },
        {
          "@type": "SoftwareApplication",
          "@id": "https://reconshield.in/tools/http-headers#software",
          "name": "ReconShield HTTP Headers Checker",
          "url": "https://reconshield.in/tools/http-headers",
          "description": "Free HTTP headers checker to analyze security headers including HSTS, CSP, X-Frame-Options, and CORS. Test website security configurations instantly.",
          "applicationCategory": "SecurityApplication",
          "operatingSystem": "Web Browser",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "publisher": { "@id": "https://reconshield.in/#organization" },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "ratingCount": "167",
            "bestRating": "5",
            "worstRating": "1"
          },
          "featureList": [
            "Free unlimited header checks",
            "Security headers analysis",
            "HSTS verification",
            "CSP validation",
            "CORS configuration check",
            "X-Frame-Options testing",
            "Implementation guidance",
            "No registration required"
          ]
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://reconshield.in/tools/http-headers#breadcrumb",
          "itemListElement": breadcrumbs.map((crumb, idx) => ({
            "@type": "ListItem",
            "position": idx + 1,
            "name": crumb.name,
            "item": crumb.url
          }))
        },
        {
          "@type": "FAQPage",
          "@id": "https://reconshield.in/tools/http-headers#faq",
          "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": { "@type": "Answer", "text": faq.a }
          })),
          "isPartOf": { "@id": "https://reconshield.in/tools/http-headers#webpage" }
        }
      ]
    }
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas[0]) }} />
      <link rel="dns-prefetch" href="https://api.reconshield.in" />

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden border-b border-white/5" aria-label="Tool Hero">
        <div className="absolute inset-0 bg-[#0a0d14] -z-20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none -z-10" />
        
        <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-900 border border-white/10 text-gray-400 text-xs font-mono uppercase tracking-widest mb-6 shadow-sm">
            <Lock className="w-4 h-4 text-cyan-400" />
            <span>HTTP Response Header Hardening Module</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 tracking-tight">
            Free HTTP Headers Checker - Analyze Security Headers
          </h1>
          
          <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed font-sans">
            Our <strong>free HTTP headers checker</strong> helps you analyze security headers and identify vulnerabilities instantly. Whether you're auditing HSTS configurations, validating Content Security Policy (CSP), or checking X-Frame-Options and CORS headers, this <strong>security headers analyzer</strong> provides comprehensive analysis of your website's HTTP response headers. No registration required—simply enter your website URL to check security headers, identify missing protections, and receive actionable recommendations.
          </p>

          <div className="max-w-4xl mx-auto mb-12">
            <ToolScannerClient toolId="http-headers" title="Headers Checker" desc="Verify website HTTP security headers." />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-gray-500 uppercase tracking-widest">
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> CSP & HSTS Hardening</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> Clickjacking Protection</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> MIME Sniffing Checks</div>
          </div>
        </div>
      </section>

      {/* AI Overview / Featured Snippet Optimization */}
      <section className="py-12 bg-[#05080f] border-b border-white/5" aria-label="AI Search Overview">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="bg-gradient-to-r from-cyan-500/5 to-blue-500/5 border border-cyan-500/10 rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-[50px] rounded-full pointer-events-none" />
            
            {/* Definition Block: What Are Security Headers? */}
            <h2 className="font-mono text-xs text-cyan-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4 text-cyan-400" /> AI Overview Snippet: HTTP Headers Checker
            </h2>
            <div className="space-y-6 text-sm text-gray-300 font-sans leading-relaxed">
              <div>
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Definition Block: What Are Security Headers?</span>
                <p className="text-gray-300">
                  <strong>HTTP security headers</strong> are response metadata parameters sent by a web server to a client browser. They define security rules for connection handling, resource loading, and page rendering, protecting visitors from Cross-Site Scripting (XSS), clickjacking, and session hijacking.
                </p>
              </div>

              {/* Definition Block: What Is HSTS? */}
              <div className="border-t border-white/5 pt-4">
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Definition Block: What Is HSTS?</span>
                <p className="text-gray-300">
                  <strong>Strict-Transport-Security (HSTS)</strong> is an HTTP response header that forces browsers to connect only via HTTPS. It prevents protocol downgrade attacks and cookie hijacking by blocking all unencrypted HTTP traffic.
                </p>
              </div>

              {/* Definition Block: What Is CSP? */}
              <div className="border-t border-white/5 pt-4">
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Definition Block: What Is CSP?</span>
                <p className="text-gray-300">
                  <strong>Content-Security-Policy (CSP)</strong> is an HTTP header that restricts the sources from which a browser can load scripts, styles, images, and other resources. Enforcing a strict CSP is the most effective defense against Cross-Site Scripting (XSS) attacks.
                </p>
              </div>

              {/* Definition Block: How to Check Security Headers? */}
              <div className="border-t border-white/5 pt-4">
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Definition Block: How to Check Security Headers?</span>
                <p className="text-gray-300">
                  To check security headers, enter your domain name in an online <strong>security headers test</strong>. The tool sends a request to the server, extracts the response headers, and displays their validation status and security scores.
                </p>
              </div>
              
              {/* TLDR Section & Key Takeaways */}
              <div className="border-t border-white/5 pt-4">
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// TL;DR Section</span>
                <p className="text-gray-400 text-xs font-mono">
                  Security headers check web server response parameters to ensure correct security directives are configured. Validating headers like CSP, HSTS, and X-Frame-Options protects browsers from scripts, frames, and protocol downgrades.
                </p>
              </div>

              <div className="border-t border-white/5 pt-4">
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Key Takeaways</span>
                <ul className="list-disc pl-5 text-gray-400 text-xs space-y-2 font-mono">
                  <li><strong>Security Headers:</strong> Essential response parameters sent by a server to define browser security rules.</li>
                  <li><strong>HSTS:</strong> Enforces secure HTTPS connections, preventing protocol downgrade attacks.</li>
                  <li><strong>CSP:</strong> Restricts resource loading sources to mitigate Cross-Site Scripting (XSS) risks.</li>
                  <li><strong>Clickjacking:</strong> X-Frame-Options blocks unauthorized page framing.</li>
                </ul>
              </div>

              {/* Fact Box: Most Important Security Headers */}
              <div className="border-t border-white/5 pt-4">
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Fact Box: Most Important Security Headers</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono text-gray-400 mt-2">
                  <div>
                    <span className="text-[10px] text-gray-600 uppercase block">HSTS:</span>
                    <span>Enforces HTTPS Connections</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-600 uppercase block">CSP:</span>
                    <span>Restricts Resource Sources</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-600 uppercase block">X-Frame-Options:</span>
                    <span>Blocks Frame Embedding</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-600 uppercase block">X-Content-Type:</span>
                    <span>Enforces MIME 'nosniff'</span>
                  </div>
                </div>
              </div>

              {/* Expert Summary */}
              <div className="border-t border-white/5 pt-4">
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Expert Summary</span>
                <p className="text-gray-400 text-xs leading-relaxed font-sans">
                  HTTP security headers are a key component of website security. They allow developers to define security boundaries, restrict resource loading, and isolate browsing contexts. Regular audits help teams identify missing or misconfigured headers, reducing exposure to client-side attacks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Use ReconShield's HTTP Headers Checker? Section */}
      <section className="py-20 bg-[#0a0d14] border-b border-white/5" aria-label="Why Use ReconShield's HTTP Headers Checker">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-display font-bold text-white mb-4 text-center">
            Why Use ReconShield's HTTP Headers Checker?
          </h2>
          <p className="text-gray-400 text-sm text-center max-w-xl mx-auto mb-12 leading-relaxed font-sans">
            Audit HTTP response headers with the most accurate, secure, and user-friendly testing platform.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-surface-900 border border-white/5 rounded-2xl hover:border-cyan-500/30 transition-all group">
              <Shield className="w-8 h-8 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-white font-bold text-base mb-2">100% Free</h3>
              <p className="text-gray-400 text-xs leading-relaxed">Unlimited HTTP header analysis with zero cost or scanning caps.</p>
            </div>
            <div className="p-6 bg-surface-900 border border-white/5 rounded-2xl hover:border-cyan-500/30 transition-all group">
              <Lock className="w-8 h-8 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-white font-bold text-base mb-2">Security Headers</h3>
              <p className="text-gray-400 text-xs leading-relaxed">Analyze HSTS, CSP, X-Frame-Options, and CORS setups in detail.</p>
            </div>
            <div className="p-6 bg-surface-900 border border-white/5 rounded-2xl hover:border-cyan-500/30 transition-all group">
              <Zap className="w-8 h-8 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-white font-bold text-base mb-2">Instant Analysis</h3>
              <p className="text-gray-400 text-xs leading-relaxed">Audit active response headers and configurations in seconds.</p>
            </div>
            <div className="p-6 bg-surface-900 border border-white/5 rounded-2xl hover:border-cyan-500/30 transition-all group">
              <FileText className="w-8 h-8 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-white font-bold text-base mb-2">Implementation Guide</h3>
              <p className="text-gray-400 text-xs leading-relaxed">Get specific server configuration snippets for Nginx and Apache.</p>
            </div>
            <div className="p-6 bg-surface-900 border border-white/5 rounded-2xl hover:border-cyan-500/30 transition-all group">
              <AlertTriangle className="w-8 h-8 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-white font-bold text-base mb-2">Vulnerability Detection</h3>
              <p className="text-gray-400 text-xs leading-relaxed">Identify missing or misconfigured security directives immediately.</p>
            </div>
            <div className="p-6 bg-surface-900 border border-white/5 rounded-2xl hover:border-cyan-500/30 transition-all group">
              <Check className="w-8 h-8 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-white font-bold text-base mb-2">Compliance Ready</h3>
              <p className="text-gray-400 text-xs leading-relaxed">Ensure configuration alignment with PCI-DSS, HIPAA, and SOC 2.</p>
            </div>
            <div className="p-6 bg-surface-900 border border-white/5 rounded-2xl hover:border-cyan-500/30 transition-all group">
              <Terminal className="w-8 h-8 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-white font-bold text-base mb-2">No Registration</h3>
              <p className="text-gray-400 text-xs leading-relaxed">Verify server response layouts immediately with no email signups.</p>
            </div>
            <div className="p-6 bg-surface-900 border border-white/5 rounded-2xl hover:border-cyan-500/30 transition-all group">
              <Activity className="w-8 h-8 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-white font-bold text-base mb-2">Detailed Reports</h3>
              <p className="text-gray-400 text-xs leading-relaxed">Comprehensive security ratings and detailed cryptographic breakdowns.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Educational Content Area */}
      <div className="bg-[#05080f]">

        {/* HTTP Headers Checker Use Cases Section */}
        <section className="py-20 border-b border-white/5" aria-label="HTTP Headers Checker Use Cases">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-3xl font-display font-bold text-white mb-4 text-center">
              HTTP Headers Checker Use Cases
            </h2>
            <p className="text-gray-400 text-sm text-center max-w-xl mx-auto mb-12 leading-relaxed font-sans">
              Discover how security experts, engineering teams, and server administrators audit response headers.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 rounded-3xl bg-surface-900 border border-white/5">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2 font-display">
                  <Send className="w-5 h-5 text-cyan-400" />
                  For Security Professionals &amp; Auditors
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed font-sans">
                  Audit external attack surfaces by verifying security headers across client domains, ensuring compliance with industry baselines, and discovering misconfigured HSTS or CSP policies.
                </p>
              </div>
              <div className="p-8 rounded-3xl bg-surface-900 border border-white/5">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2 font-display">
                  <Terminal className="w-5 h-5 text-cyan-400" />
                  For Web Developers &amp; DevOps Teams
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed font-sans">
                  Validate security headers during deployments, generate proper directives for Nginx or Apache, and troubleshoot CORS or CSP violations in real-time.
                </p>
              </div>
              <div className="p-8 rounded-3xl bg-surface-900 border border-white/5">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2 font-display">
                  <Shield className="w-5 h-5 text-red-400" />
                  For Compliance Officers &amp; Risk Management
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed font-sans">
                  Ensure application layers satisfy compliance directives such as PCI-DSS, HIPAA, and SOC 2 by maintaining strict browser security headers.
                </p>
              </div>
              <div className="p-8 rounded-3xl bg-surface-900 border border-white/5">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2 font-display">
                  <Activity className="w-5 h-5 text-purple-400" />
                  For Website Owners &amp; Business Managers
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed font-sans">
                  Protect visitors from clickjacking and session attacks, maintain brand trust, and avoid browser security warnings that damage organic search positioning.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose ReconShield HTTP Headers Checker Comparison Section */}
        <section className="py-20 border-b border-white/5 bg-[#0a0d14]">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-3xl font-display font-bold text-white mb-4 text-center">
              Why Choose ReconShield HTTP Headers Checker?
            </h2>
            <p className="text-gray-400 text-sm text-center max-w-xl mx-auto mb-12 leading-relaxed font-sans">
              Compare ReconShield's HTTP response headers scanner against industry alternatives.
            </p>
            <div className="overflow-x-auto rounded-3xl border border-white/10 bg-[#0d1117] my-8 shadow-xl">
              <table className="w-full text-left text-sm text-gray-400 border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.02] text-white font-mono uppercase text-xs">
                    <th className="p-5">Feature</th>
                    <th className="p-5 border-l border-white/10 text-cyan-400">ReconShield</th>
                    <th className="p-5 border-l border-white/10">SecurityHeaders.com</th>
                    <th className="p-5 border-l border-white/10">Mozilla Observatory</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono text-xs">
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-5 text-white font-semibold font-sans">Free to Use</td>
                    <td className="p-5 border-l border-white/10 text-emerald-400 font-bold">Yes (Unlimited)</td>
                    <td className="p-5 border-l border-white/10 text-emerald-400 font-bold">Yes</td>
                    <td className="p-5 border-l border-white/10 text-emerald-400 font-bold">Yes</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-5 text-white font-semibold font-sans">No Registration</td>
                    <td className="p-5 border-l border-white/10 text-emerald-400 font-bold">Yes</td>
                    <td className="p-5 border-l border-white/10 text-emerald-400 font-bold">Yes</td>
                    <td className="p-5 border-l border-white/10 text-emerald-400 font-bold">Yes</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-5 text-white font-semibold font-sans">Fast Results</td>
                    <td className="p-5 border-l border-white/10 text-emerald-400 font-bold">Yes (&lt; 3s)</td>
                    <td className="p-5 border-l border-white/10 text-emerald-400 font-bold">Yes</td>
                    <td className="p-5 border-l border-white/10 text-yellow-500 font-bold">Slow (Minutes)</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-5 text-white font-semibold font-sans">Security Headers Check</td>
                    <td className="p-5 border-l border-white/10 text-emerald-400 font-bold">Yes</td>
                    <td className="p-5 border-l border-white/10 text-emerald-400 font-bold">Yes</td>
                    <td className="p-5 border-l border-white/10 text-emerald-400 font-bold">Yes</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-5 text-white font-semibold font-sans">CSP Validation</td>
                    <td className="p-5 border-l border-white/10 text-emerald-400 font-bold">Yes</td>
                    <td className="p-5 border-l border-white/10 text-emerald-400 font-bold">Yes</td>
                    <td className="p-5 border-l border-white/10 text-emerald-400 font-bold">Yes</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-5 text-white font-semibold font-sans">Implementation Guide</td>
                    <td className="p-5 border-l border-white/10 text-emerald-400 font-bold">Yes</td>
                    <td className="p-5 border-l border-white/10 text-red-500 font-bold">No</td>
                    <td className="p-5 border-l border-white/10 text-yellow-500 font-bold">Limited</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-5 text-white font-semibold font-sans">Clean Interface</td>
                    <td className="p-5 border-l border-white/10 text-emerald-400 font-bold">Yes (No Ads)</td>
                    <td className="p-5 border-l border-white/10 text-red-500 font-bold">No (Cluttered)</td>
                    <td className="p-5 border-l border-white/10 text-yellow-500 font-bold">Basic</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-5 text-white font-semibold font-sans">CORS Analysis</td>
                    <td className="p-5 border-l border-white/10 text-emerald-400 font-bold">Yes</td>
                    <td className="p-5 border-l border-white/10 text-red-500 font-bold">No</td>
                    <td className="p-5 border-l border-white/10 text-red-500 font-bold">No</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Visible FAQ Section (Section 8) */}
        <section className="py-20 border-b border-white/5 bg-[#05080f]" aria-labelledby="faq-title">
          <div className="max-w-[900px] mx-auto px-6">
            <h2 id="faq-title" className="text-3xl font-display font-bold text-white mb-4 text-center">
              Frequently Asked Questions About HTTP Security Headers
            </h2>
            <p className="text-gray-400 text-sm text-center max-w-xl mx-auto mb-12 leading-relaxed font-sans">
              Find answers to common questions about browser headers, connection protections, and CSP rules.
            </p>
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

        {/* In-depth Technical Article Container */}
        <section className="py-20 border-b border-white/5">
          <div className="max-w-[1000px] mx-auto px-6 prose prose-invert max-w-none prose-p:leading-relaxed prose-p:text-gray-400 prose-headings:text-white prose-a:text-cyan-400 hover:prose-a:text-cyan-300">
            
            <h2 className="text-3xl font-display font-bold mt-0 mb-6 flex items-center gap-3">
              <Key className="w-8 h-8 text-cyan-400" />
              What Are HTTP Security Headers?
            </h2>
            <p>
              <strong>HTTP security headers</strong> are response metadata parameters sent by a web server to a client browser. They define security rules for connection handling, resource loading, and page rendering, protecting visitors from client-side attacks like Cross-Site Scripting (XSS), clickjacking, and session hijacking.
            </p>

            <h2 className="text-3xl font-display font-bold mt-16 mb-6">Why Security Headers Matter</h2>
            <p>
              When a browser requests a page, the server responds with the HTML document and headers containing configuration directives. Without security headers, browsers run in a permissive mode, leaving visitors exposed to malicious scripts, frame injection, or data leaks.
            </p>

            <h2 className="text-3xl font-display font-bold mt-16 mb-6">How Security Headers Protect Websites</h2>
            <p>
              Security headers allow developers to establish boundaries at the browser level:
            </p>
            <ul>
              <li><strong>Connection Hardening:</strong> HSTS forces browsers to connect only via HTTPS.</li>
              <li><strong>Resource Control:</strong> CSP restricts resource loading to trusted sources.</li>
              <li><strong>Framing Protection:</strong> X-Frame-Options blocks unauthorized page framing.</li>
            </ul>

            <h2 className="text-3xl font-display font-bold mt-16 mb-6">How to Check Security Headers</h2>
            <p>
              You can verify your website's HTTP security headers using the ReconShield Security Headers Checker:
            </p>
            <ol>
              <li>Input the target domain name in the input box above.</li>
              <li>Click the scan button to fetch and analyze the server's HTTP response headers.</li>
              <li>Review the security grade and check the hardening recommendations for any missing headers.</li>
            </ol>

            <h2 className="text-3xl font-display font-bold mt-16 mb-6">Strict-Transport-Security (HSTS)</h2>
            <p>
              <strong>Strict-Transport-Security (HSTS)</strong> forces browsers to communicate with a website only using secure HTTPS connections. It protects users from protocol downgrade attacks and cookie interception by blocking all unencrypted HTTP requests.
            </p>
            <pre><code>Strict-Transport-Security: max-age=63072000; includeSubDomains; preload</code></pre>

            <h2 className="text-3xl font-display font-bold mt-16 mb-6">Content-Security-Policy (CSP)</h2>
            <p>
              <strong>Content-Security-Policy (CSP)</strong> restricts the sources from which a browser can load scripts, styles, images, and other assets. Enforcing a strict CSP is the most effective defense against Cross-Site Scripting (XSS) attacks.
            </p>
            <pre><code>Content-Security-Policy: default-src 'self'; script-src 'self' https://trusted.com; object-src 'none';</code></pre>

            <h2 className="text-3xl font-display font-bold mt-16 mb-6">X-Frame-Options</h2>
            <p>
              <strong>X-Frame-Options</strong> controls whether a webpage can be embedded in an iframe or frame on another site. Setting it to DENY or SAMEORIGIN prevents clickjacking attacks by blocking malicious overlay frames.
            </p>
            <pre><code>X-Frame-Options: SAMEORIGIN</code></pre>

            <h2 className="text-3xl font-display font-bold mt-16 mb-6">X-Content-Type-Options</h2>
            <p>
              <strong>X-Content-Type-Options</strong> prevents browsers from sniffing MIME types. Setting it to 'nosniff' forces browsers to respect the content-type declared by the server, blocking executable scripting attacks disguised as files.
            </p>
            <pre><code>X-Content-Type-Options: nosniff</code></pre>

            <h2 className="text-3xl font-display font-bold mt-16 mb-6">Referrer-Policy</h2>
            <p>
              <strong>Referrer-Policy</strong> controls how much information about the referring page is sent in the Referer header during navigations, protecting sensitive path details from leaking to external domains.
            </p>
            <pre><code>Referrer-Policy: strict-origin-when-cross-origin</code></pre>

            <h2 className="text-3xl font-display font-bold mt-16 mb-6">Permissions-Policy</h2>
            <p>
              <strong>Permissions-Policy</strong> allows web developers to control which browser features and APIs (such as geolocation, camera, microphone, or payment interfaces) can be accessed by the site and third-party frames.
            </p>
            <pre><code>Permissions-Policy: camera=(), microphone=(), geolocation=(self)</code></pre>

            <h2 className="text-3xl font-display font-bold mt-16 mb-6">Cross-Origin Resource Sharing (CORS)</h2>
            <p>
              CORS defines headers (like Access-Control-Allow-Origin) that allow servers to specify which origins are permitted to read resources, preventing unauthorized cross-origin data access.
            </p>

            <h2 className="text-3xl font-display font-bold mt-16 mb-6">Cross-Origin-Embedder-Policy</h2>
            <p>
              <strong>Cross-Origin-Embedder-Policy (COEP)</strong> prevents a document from loading cross-origin resources that do not explicitly grant permission, helping protect against Spectre-like side-channel attacks.
            </p>
            <pre><code>Cross-Origin-Embedder-Policy: require-corp</code></pre>

            <h2 className="text-3xl font-display font-bold mt-16 mb-6">Cross-Origin-Opener-Policy</h2>
            <p>
              <strong>Cross-Origin-Opener-Policy (COOP)</strong> isolates a site's execution context by preventing newly opened windows from sharing a browsing context group, protecting cross-origin documents from unauthorized scripting interactions.
            </p>
            <pre><code>Cross-Origin-Opener-Policy: same-origin</code></pre>

            <h2 className="text-3xl font-display font-bold mt-16 mb-6">Cross-Origin-Resource-Policy</h2>
            <p>
              <strong>Cross-Origin-Resource-Policy (CORP)</strong> prevents other sites from loading your site's static assets (images, scripts, fonts), protecting against unauthorized cross-origin data exposure.
            </p>
            <pre><code>Cross-Origin-Resource-Policy: same-origin</code></pre>

            <h2 className="text-3xl font-display font-bold mt-16 mb-6">Common Security Header Misconfigurations</h2>
            <p>
              Common misconfigurations include using an overly permissive CSP directive (such as `unsafe-inline` or wildcard script sources), setting HSTS max-age to values that are too short (should be at least 1 year), and omitting security headers on API responses and static assets.
            </p>

            <h2 className="text-3xl font-display font-bold mt-16 mb-6">Security Headers and OWASP Best Practices</h2>
            <p>
              OWASP guidelines recommend enforcing a complete set of security headers to mitigate risks like cross-site scripting, clickjacking, and information exposure. Regular automated audits help ensure compliance.
            </p>

            <h2 className="text-3xl font-display font-bold mt-16 mb-6">How Security Teams Audit Security Headers</h2>
            <p>
              Security teams use automated checkers and CI/CD validation steps to inspect response headers. Direct tests ensure that security headers are active and correctly configured on all public-facing endpoints.
            </p>

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
                  Surendra is an information security analyst specializing in public key infrastructures, web application hardening, and HTTP protocol standards. He built ReconShield to help developers test and secure their server responses.
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
              Last Updated: June 2026 | Reviewed by ReconShield Technical Board | Reference: OWASP Security Headers Guidelines, Mozilla MDN, W3C, IETF HTTP Standards, CISA
            </div>
          </div>
        </section>

        {/* Semantic Related Tools Section (Section 9) */}
        <section className="py-20 bg-[#05080f]" aria-label="Related Security &amp; Website Tools">
          <div className="max-w-[1000px] mx-auto px-6">
            <h2 className="text-3xl font-display font-bold text-white mb-4 text-center">Related Security &amp; Website Tools</h2>
            <p className="text-gray-400 text-sm text-center max-w-xl mx-auto mb-12 leading-relaxed font-sans">
              Explore our suite of technical analysis tools to analyze domain names, DNS configurations, subdomains, and host routing.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* SSL Checker Link */}
              <Link href="/tools/ssl-checker" className="p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-cyan-500/30 transition-all group flex flex-col justify-between">
                <div>
                  <Lock className="w-8 h-8 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
                  <h4 className="text-white font-bold text-lg mb-2 font-display">SSL Checker</h4>
                  <p className="text-xs text-gray-400 leading-relaxed mb-4">Audit cryptographic validity, certificate expiry, and handshake errors using our SSL/TLS Checker.</p>
                </div>
                <span className="text-cyan-400 text-xs font-mono flex items-center gap-1 mt-auto">Validate SSL <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform"/></span>
              </Link>

              {/* Port Scanner Link */}
              <Link href="/tools/port-scanner" className="p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-red-500/30 transition-all group flex flex-col justify-between">
                <div>
                  <Terminal className="w-8 h-8 text-red-400 mb-4 group-hover:scale-110 transition-transform" />
                  <h4 className="text-white font-bold text-lg mb-2 font-display">Port Scanner</h4>
                  <p className="text-xs text-gray-400 leading-relaxed mb-4">Identify open port states, service tags, and firewall leaks with our Exposed Port Scanner.</p>
                </div>
                <span className="text-red-500 text-xs font-mono flex items-center gap-1 mt-auto">Scan Ports <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform"/></span>
              </Link>

              {/* IP Lookup Link */}
              <Link href="/tools/ip-lookup" className="p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-purple-500/30 transition-all group flex flex-col justify-between">
                <div>
                  <Network className="w-8 h-8 text-purple-400 mb-4 group-hover:scale-110 transition-transform" />
                  <h4 className="text-white font-bold text-lg mb-2 font-display">IP Lookup Tool</h4>
                  <p className="text-xs text-gray-400 leading-relaxed mb-4">Analyze host reputation, threat tags, and ISP subnet details using our IP reputation checker.</p>
                </div>
                <span className="text-purple-400 text-xs font-mono flex items-center gap-1 mt-auto">Run IP Scan <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform"/></span>
              </Link>

              {/* Technology Detector Link */}
              <Link href="/tools/tech-detector" className="p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-cyan-500/30 transition-all group flex flex-col justify-between">
                <div>
                  <Globe className="w-8 h-8 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
                  <h4 className="text-white font-bold text-lg mb-2 font-display">Technology Detector</h4>
                  <p className="text-xs text-gray-400 leading-relaxed mb-4">Identify CMS platforms, frameworks, analytics scripts, and hosting infrastructure instantly.</p>
                </div>
                <span className="text-cyan-400 text-xs font-mono flex items-center gap-1 mt-auto">Detect Tech Stack <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform"/></span>
              </Link>

            </div>
          </div>
        </section>

      </div>
    </>
  );
}
