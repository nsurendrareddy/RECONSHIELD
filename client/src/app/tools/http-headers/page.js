import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { 
  Shield, Globe, Server, Lock, Terminal, CheckCircle2, ChevronRight, 
  Search, Activity, Target, Network, Info, Check, AlertTriangle, 
  FileText, Send, HelpCircle, BookOpen, Key, Database, Clock
} from 'lucide-react';
import { generateBaseMetadata } from '@/utils/metadata';

const ToolScannerClient = dynamic(() => import('@/components/ToolScannerClient'), {
  loading: () => <div className="min-h-[400px] animate-pulse bg-surface-900/50 rounded-3xl max-w-5xl mx-auto my-12" />
});

export const metadata = generateBaseMetadata({
  title: "Security Headers Checker (Free) | Analyze HTTP Security Headers",
  description: "Check HTTP security headers including HSTS, CSP, X-Frame-Options, and other website security protections.",
  path: "/tools/http-headers"
});

export default function SecurityHeadersPage() {
  const faqs = [
    {
      q: "What are security headers?",
      a: "HTTP security headers are response parameters sent by a web server to a browser. They define security rules for connection handling, resource loading, and rendering, protecting visitors from attacks like Cross-Site Scripting, clickjacking, and session hijacking."
    },
    {
      q: "What is HSTS?",
      a: "HTTP Strict Transport Security (HSTS) is a header that instructs browsers to communicate with a website only using secure HTTPS connections. It protects users from protocol downgrade attacks and cookie interception by blocking all unencrypted HTTP requests."
    },
    {
      q: "What is CSP?",
      a: "Content-Security-Policy (CSP) is an HTTP header that restricts the sources from which a browser can load scripts, styles, images, and other assets. Enforcing a strict CSP is the most effective defense against Cross-Site Scripting (XSS) attacks."
    },
    {
      q: "How do I check security headers?",
      a: "You can check security headers by entering a domain name into the ReconShield Security Headers Checker. The tool sends a request to the server, extracts the response headers, and displays their validation status and security scores."
    },
    {
      q: "What headers improve website security?",
      a: "The most critical security headers are Strict-Transport-Security (HSTS), Content-Security-Policy (CSP), X-Frame-Options, X-Content-Type-Options, Referrer-Policy, and Permissions-Policy. Together, these headers restrict resource loading, prevent framing, and limit data exposure."
    },
    {
      q: "What is X-Frame-Options?",
      a: "X-Frame-Options is a header that controls whether a webpage can be embedded in an iframe or frame on another site. Setting it to DENY or SAMEORIGIN prevents clickjacking attacks by blocking malicious overlay frames."
    },
    {
      q: "What is Referrer-Policy?",
      a: "Referrer-Policy is an HTTP response header that controls how much information about the referring page is sent in the Referer header during navigations, protecting sensitive path details from leaking to external domains."
    },
    {
      q: "What is X-Content-Type-Options?",
      a: "X-Content-Type-Options is a security header that prevents browsers from sniffing MIME types. Setting it to 'nosniff' forces browsers to respect the content-type declared by the server, blocking executable scripting attacks disguised as files."
    },
    {
      q: "What is Permissions-Policy?",
      a: "Permissions-Policy allows web developers to control which browser features and APIs (such as geolocation, camera, microphone, or payment interfaces) can be accessed by the site and third-party frames, minimizing device exposure."
    },
    {
      q: "What is CORS and how does it relate to security headers?",
      a: "Cross-Origin Resource Sharing (CORS) is a mechanism using headers like Access-Control-Allow-Origin to control how web apps on one domain interact with API resources on another, preventing unauthorized data extraction."
    },
    {
      q: "What is Cross-Origin-Embedder-Policy?",
      a: "Cross-Origin-Embedder-Policy (COEP) is a header that prevents a document from loading cross-origin resources that do not explicitly grant permission, helping protect against Spectre-like side-channel attacks."
    },
    {
      q: "What is Cross-Origin-Opener-Policy?",
      a: "Cross-Origin-Opener-Policy (COOP) isolates a site's execution context by preventing newly opened windows from sharing a browsing context group, protecting cross-origin documents from unauthorized scripting interactions."
    },
    {
      q: "What is Cross-Origin-Resource-Policy?",
      a: "Cross-Origin-Resource-Policy (CORP) is a security header that prevents other sites from loading your site's static assets, such as images, scripts, or fonts, protecting against unauthorized cross-origin data exposure."
    },
    {
      q: "What happens if a security header is misconfigured?",
      a: "Misconfigured security headers can break website functionality (e.g. blocking legitimate images or API requests) or leave the site vulnerable to security threats like Cross-Site Scripting, frame injection, or data leaks."
    },
    {
      q: "How do firewalls audit security headers?",
      a: "Web Application Firewalls (WAFs) and automated checkers inspect response headers during requests. They flag missing protections, check directives for weak configurations, and verify compliance with OWASP standards."
    }
  ];

  const breadcrumbs = [
    { name: "Home", url: "https://reconshield.in" },
    { name: "Tools", url: "https://reconshield.in/tools" },
    { name: "Security Headers", url: "https://reconshield.in/tools/http-headers" }
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
          "name": "Security Headers Checker (Free) | Analyze HTTP Security Headers",
          "isPartOf": { "@id": "https://reconshield.in/#website" }
        },
        {
          "@type": "SoftwareApplication",
          "@id": "https://reconshield.in/tools/http-headers#software",
          "name": "ReconShield HTTP Headers Checker",
          "url": "https://reconshield.in/tools/http-headers",
          "description": "Free online security headers checker to analyze Content-Security-Policy (CSP), Strict-Transport-Security (HSTS), X-Frame-Options, and other HTTP parameters.",
          "applicationCategory": "SecurityApplication",
          "operatingSystem": "All",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "publisher": { "@id": "https://reconshield.in/#organization" }
        },
        {
          "@type": "WebApplication",
          "@id": "https://reconshield.in/tools/http-headers#webapp",
          "name": "ReconShield Security Header Scanner App",
          "url": "https://reconshield.in/tools/http-headers",
          "description": "Analyze website HTTP headers and calculate security grades based on active protections.",
          "applicationCategory": "SecurityApplication",
          "operatingSystem": "All",
          "browserRequirements": "Requires JavaScript. Requires HTML5.",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "publisher": { "@id": "https://reconshield.in/#organization" }
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
          "@type": "TechArticle",
          "@id": "https://reconshield.in/tools/http-headers#article",
          "headline": "The Professional Guide to HTTP Response Headers and Website Hardening Guidelines",
          "description": "An in-depth analysis of HTTP security headers, cross-origin resource isolation, MIME-type protections, and OWASP compliance auditing.",
          "author": { "@type": "Person", "name": "Surendra Reddy" },
          "publisher": { "@id": "https://reconshield.in/#organization" },
          "url": "https://reconshield.in/tools/http-headers",
          "isPartOf": { "@id": "https://reconshield.in/tools/http-headers#webpage" }
        },
        {
          "@type": "HowTo",
          "@id": "https://reconshield.in/tools/http-headers#howto",
          "name": "How to verify website security headers",
          "description": "A step-by-step guide on how to perform a website HTTP response header security validation.",
          "step": [
            { "@type": "HowToStep", "name": "Enter Domain", "text": "Input the domain (e.g., example.com) in the headers checker input container." },
            { "@type": "HowToStep", "name": "Execute Response Parse", "text": "Click search to fetch HTTP headers and analyze their configuration parameters." },
            { "@type": "HowToStep", "name": "Review Hardening Score", "text": "Check your security headers score and follow recommendations for missing headers." }
          ],
          "isPartOf": { "@id": "https://reconshield.in/tools/http-headers#webpage" }
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
            Security Headers Checker
          </h1>
          
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed font-sans">
            Audit HTTP response headers in real-time. Verify HSTS settings, inspect Content-Security-Policy (CSP) rules, check X-Frame-Options, and harden website security.
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
              <Shield className="w-4 h-4 text-cyan-400" /> AI Overview Snippet: Security Headers Checker
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

      {/* Feature Differentiation Grid */}
      <section className="py-16 bg-[#0a0d14] border-b border-white/5" aria-label="Feature Differentiation">
        <div className="max-w-[1000px] mx-auto px-6">
          <h2 className="text-2xl font-display font-bold text-white mb-8 text-center">ReconShield Security Headers Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 not-prose">
            <div className="p-5 bg-surface-900 border border-white/5 rounded-2xl">
              <Shield className="w-6 h-6 text-cyan-400 mb-3" />
              <h4 className="text-white text-xs font-bold font-mono uppercase tracking-wider mb-2">Security Header Score</h4>
              <p className="text-gray-400 text-[11px] leading-relaxed">Calculates an overall grading rating (A+ through F) based on active headers and the strength of their directives.</p>
            </div>
            <div className="p-5 bg-surface-900 border border-white/5 rounded-2xl">
              <Clock className="w-6 h-6 text-cyan-400 mb-3" />
              <h4 className="text-white text-xs font-bold font-mono uppercase tracking-wider mb-2">OWASP Compliance</h4>
              <p className="text-gray-400 text-[11px] leading-relaxed">Verifies header alignment with OWASP recommendations, flagging missing protections.</p>
            </div>
            <div className="p-5 bg-surface-900 border border-white/5 rounded-2xl">
              <Activity className="w-6 h-6 text-cyan-400 mb-3" />
              <h4 className="text-white text-xs font-bold font-mono uppercase tracking-wider mb-2">Browser Compatibility</h4>
              <p className="text-gray-400 text-[11px] leading-relaxed">Analyzes whether configured directives are supported across modern mobile and desktop browsers.</p>
            </div>
            <div className="p-5 bg-surface-900 border border-white/5 rounded-2xl">
              <Terminal className="w-6 h-6 text-cyan-400 mb-3" />
              <h4 className="text-white text-xs font-bold font-mono uppercase tracking-wider mb-2">Hardening Guide</h4>
              <p className="text-gray-400 text-[11px] leading-relaxed">Provides copy-paste configuration snippets for Nginx, Apache, and IIS based on your scan results.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Educational Guide */}
      <div className="bg-[#05080f]">
        
        {/* H2: What Are HTTP Security Headers? */}
        <section className="py-20 border-b border-white/5">
          <div className="max-w-[1000px] mx-auto px-6 prose prose-invert max-w-none prose-p:leading-relaxed prose-p:text-gray-400 prose-headings:text-white prose-a:text-cyan-400 hover:prose-a:text-cyan-300">
            
            <h2 className="text-3xl font-display font-bold mt-0 mb-6 flex items-center gap-3">
              <Key className="w-8 h-8 text-cyan-400" />
              What Are HTTP Security Headers?
            </h2>
            <p>
              <strong>HTTP security headers</strong> are response metadata parameters sent by a web server to a client browser. They define security rules for connection handling, resource loading, and page rendering, protecting visitors from client-side attacks like Cross-Site Scripting (XSS), clickjacking, and session hijacking.
            </p>

            {/* H2: Why Security Headers Matter */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">Why Security Headers Matter</h2>
            <p>
              When a browser requests a page, the server responds with the HTML document and headers containing configuration directives. Without security headers, browsers run in a permissive mode, leaving visitors exposed to malicious scripts, frame injection, or data leaks.
            </p>

            {/* H2: How Security Headers Protect Websites */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">How Security Headers Protect Websites</h2>
            <p>
              Security headers allow developers to establish boundaries at the browser level:
            </p>
            <ul>
              <li><strong>Connection Hardening:</strong> HSTS forces browsers to connect only via HTTPS.</li>
              <li><strong>Resource Control:</strong> CSP restricts resource loading to trusted sources.</li>
              <li><strong>Framing Protection:</strong> X-Frame-Options blocks unauthorized page framing.</li>
            </ul>

            {/* H2: How to Check Security Headers */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">How to Check Security Headers</h2>
            <p>
              You can verify your website's HTTP security headers using the ReconShield Security Headers Checker:
            </p>
            <ol>
              <li>Input the target domain name in the input box above.</li>
              <li>Click the scan button to fetch and analyze the server's HTTP response headers.</li>
              <li>Review the security grade and check the hardening recommendations for any missing headers.</li>
            </ol>

            {/* H2: Strict-Transport-Security (HSTS) */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">Strict-Transport-Security (HSTS)</h2>
            <p>
              <strong>Strict-Transport-Security (HSTS)</strong> forces browsers to communicate with a website only using secure HTTPS connections. It protects users from protocol downgrade attacks and cookie interception by blocking all unencrypted HTTP requests.
            </p>
            <pre><code>Strict-Transport-Security: max-age=63072000; includeSubDomains; preload</code></pre>

            {/* H2: Content-Security-Policy (CSP) */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">Content-Security-Policy (CSP)</h2>
            <p>
              <strong>Content-Security-Policy (CSP)</strong> restricts the sources from which a browser can load scripts, styles, images, and other assets. Enforcing a strict CSP is the most effective defense against Cross-Site Scripting (XSS) attacks.
            </p>
            <pre><code>Content-Security-Policy: default-src 'self'; script-src 'self' https://trusted.com; object-src 'none';</code></pre>

            {/* H2: X-Frame-Options */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">X-Frame-Options</h2>
            <p>
              <strong>X-Frame-Options</strong> controls whether a webpage can be embedded in an iframe or frame on another site. Setting it to DENY or SAMEORIGIN prevents clickjacking attacks by blocking malicious overlay frames.
            </p>
            <pre><code>X-Frame-Options: SAMEORIGIN</code></pre>

            {/* H2: X-Content-Type-Options */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">X-Content-Type-Options</h2>
            <p>
              <strong>X-Content-Type-Options</strong> prevents browsers from sniffing MIME types. Setting it to 'nosniff' forces browsers to respect the content-type declared by the server, blocking executable scripting attacks disguised as files.
            </p>
            <pre><code>X-Content-Type-Options: nosniff</code></pre>

            {/* H2: Referrer-Policy */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">Referrer-Policy</h2>
            <p>
              <strong>Referrer-Policy</strong> controls how much information about the referring page is sent in the Referer header during navigations, protecting sensitive path details from leaking to external domains.
            </p>
            <pre><code>Referrer-Policy: strict-origin-when-cross-origin</code></pre>

            {/* H2: Permissions-Policy */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">Permissions-Policy</h2>
            <p>
              <strong>Permissions-Policy</strong> allows web developers to control which browser features and APIs (such as geolocation, camera, microphone, or payment interfaces) can be accessed by the site and third-party frames.
            </p>
            <pre><code>Permissions-Policy: camera=(), microphone=(), geolocation=(self)</code></pre>

            {/* H2: Cross-Origin Resource Sharing (CORS) */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">Cross-Origin Resource Sharing (CORS)</h2>
            <p>
              CORS defines headers (like Access-Control-Allow-Origin) that allow servers to specify which origins are permitted to read resources, preventing unauthorized cross-origin data access.
            </p>

            {/* H2: Cross-Origin-Embedder-Policy */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">Cross-Origin-Embedder-Policy</h2>
            <p>
              <strong>Cross-Origin-Embedder-Policy (COEP)</strong> prevents a document from loading cross-origin resources that do not explicitly grant permission, helping protect against Spectre-like side-channel attacks.
            </p>
            <pre><code>Cross-Origin-Embedder-Policy: require-corp</code></pre>

            {/* H2: Cross-Origin-Opener-Policy */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">Cross-Origin-Opener-Policy</h2>
            <p>
              <strong>Cross-Origin-Opener-Policy (COOP)</strong> isolates a site's execution context by preventing newly opened windows from sharing a browsing context group, protecting cross-origin documents from unauthorized scripting interactions.
            </p>
            <pre><code>Cross-Origin-Opener-Policy: same-origin</code></pre>

            {/* H2: Cross-Origin-Resource-Policy */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">Cross-Origin-Resource-Policy</h2>
            <p>
              <strong>Cross-Origin-Resource-Policy (CORP)</strong> prevents other sites from loading your site's static assets (images, scripts, fonts), protecting against unauthorized cross-origin data exposure.
            </p>
            <pre><code>Cross-Origin-Resource-Policy: same-origin</code></pre>

            {/* H2: Common Security Header Misconfigurations */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">Common Security Header Misconfigurations</h2>
            <p>
              Common misconfigurations include:
            </p>
            <ul>
              <li>Using an overly permissive CSP directive (such as `unsafe-inline` or wildcard script sources).</li>
              <li>Setting HSTS max-age to values that are too short (should be at least 1 year).</li>
              <li>Omitting security headers on API responses and static assets.</li>
            </ul>

            {/* H2: Security Headers and OWASP Best Practices */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">Security Headers and OWASP Best Practices</h2>
            <p>
              OWASP guidelines recommend enforcing a complete set of security headers to mitigate risks like cross-site scripting, clickjacking, and information exposure. Regular automated audits help ensure compliance.
            </p>

            {/* H2: How Security Teams Audit Security Headers */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">How Security Teams Audit Security Headers</h2>
            <p>
              Security teams use automated checkers and CI/CD validation steps to inspect response headers. Direct tests ensure that security headers are active and correctly configured on all public-facing endpoints.
            </p>

          </div>
        </section>

        {/* Comparison Matrix Table */}
        <section className="py-20 bg-[#0a0d14] border-b border-white/5">
          <div className="max-w-[1000px] mx-auto px-6 prose prose-invert max-w-none">
            <h2 className="text-3xl font-display font-bold text-white mb-6">Security Headers Reference Matrix</h2>
            <p className="text-gray-400 mb-8">
              Verify standard security headers, their purposes, and the risks of leaving them unconfigured:
            </p>

            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0d1117] not-prose my-8">
              <table className="w-full text-left text-sm text-gray-400 border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.02] text-white font-mono uppercase text-xs">
                    <th className="p-4">HTTP Response Header</th>
                    <th className="p-4 border-l border-white/10">Recommended Configuration</th>
                    <th className="p-4 border-l border-white/10">Primary Purpose</th>
                    <th className="p-4 border-l border-white/10">Severity if Missing</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono text-xs">
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-4 font-semibold text-white">Strict-Transport-Security</td>
                    <td className="p-4 border-l border-white/10">max-age=63072000; includeSubDomains; preload</td>
                    <td className="p-4 border-l border-white/10">Enforce HTTPS connections</td>
                    <td className="p-4 border-l border-white/10 text-orange-500 font-bold">High (Mitigates MitM)</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-4 font-semibold text-white">Content-Security-Policy</td>
                    <td className="p-4 border-l border-white/10">default-src 'self'; object-src 'none';</td>
                    <td className="p-4 border-l border-white/10">Restrict resource loading sources</td>
                    <td className="p-4 border-l border-white/10 text-red-500 font-bold">Critical (Protects against XSS)</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-4 font-semibold text-white">X-Frame-Options</td>
                    <td className="p-4 border-l border-white/10">DENY or SAMEORIGIN</td>
                    <td className="p-4 border-l border-white/10">Prevent frame embedding</td>
                    <td className="p-4 border-l border-white/10 text-yellow-500 font-bold">Medium (Protects against clickjacking)</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-4 font-semibold text-white">X-Content-Type-Options</td>
                    <td className="p-4 border-l border-white/10">nosniff</td>
                    <td className="p-4 border-l border-white/10">Disable MIME type sniffing</td>
                    <td className="p-4 border-l border-white/10 text-yellow-500 font-bold">Medium (Protects against MIME attacks)</td>
                  </tr>
                </tbody>
              </table>
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

        {/* Website Security Hardening Learning Center Section */}
        <section className="py-20 bg-[#0a0d14] border-t border-b border-white/5" aria-label="Website Security Hardening Learning Center">
          <div className="max-w-[1000px] mx-auto px-6 font-sans">
            <h2 className="text-3xl font-display font-bold text-white mb-4 text-center">Website Security Hardening Learning Center</h2>
            <p className="text-gray-400 text-sm text-center max-w-xl mx-auto mb-12 leading-relaxed">
              Understand the mechanics of browser-side configurations, CSP policies, and transport layer security headers.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "OWASP Top 10 Web Configuration Audits: Hardening HTTP Headers",
                  desc: "Learn how Content-Security-Policy (CSP) and MIME-type sniffing checks safeguard applications and prevent stack signature leaks.",
                  url: "/blog/owasp-http-headers-hardening",
                  time: "7 min read"
                },
                {
                  title: "HTTPS Security Best Practices: Hardening Web Server Transport Security",
                  desc: "Configure secure server directives, set up Elliptic Curve Diffie-Hellman ciphers, and enforce HSTS rules correctly.",
                  url: "/blog/https-security-best-practices",
                  time: "9 min read"
                },
                {
                  title: "SSL Certificate Explained: Public Key Cryptography and Public Trust Chains",
                  desc: "Learn how public-key cryptography secures browsers, and how hierarchical trust models validate domain certificates.",
                  url: "/blog/ssl-certificate-explained",
                  time: "8 min read"
                },
                {
                  title: "Demystifying SPF, DKIM, and DMARC: A Blueprint for Email Spoofing Defense",
                  desc: "Configure SPF, DKIM, and DMARC TXT records in your DNS zones to establish strict email sender authentication.",
                  url: "/blog/spf-dkim-dmarc-blueprint",
                  time: "7 min read"
                }
              ].map((article, idx) => (
                <Link key={idx} href={article.url} className="p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-cyan-500/30 transition-all group flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-gray-500 mb-3">
                      <span className="flex items-center gap-1.5 text-cyan-400/80">
                        <BookOpen className="w-3.5 h-3.5" /> Technical Guide
                      </span>
                      <span>{article.time}</span>
                    </div>
                    <h3 className="text-white font-bold text-base mb-2 group-hover:text-cyan-400 transition-colors leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed mb-4">
                      {article.desc}
                    </p>
                  </div>
                  <span className="text-cyan-400 text-xs font-mono flex items-center gap-1 mt-auto">
                    Read Article <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Semantic Internal Links (Phase 7 - Internal Linking) */}
        <section className="py-20 bg-[#05080f]" aria-label="Related Security Tools">
          <div className="max-w-[1000px] mx-auto px-6">
            <h2 className="text-3xl font-display font-bold text-white mb-10 text-center">Complete Your Perimeter Hardening</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* SSL Checker Link */}
              <Link href="/tools/ssl-checker" className="p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-cyan-500/30 transition-all group">
                <Lock className="w-8 h-8 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-white font-bold text-lg mb-2">SSL/TLS Checker</h4>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">Audit cryptographic validity, certificate expiry, and handshake errors using our SSL/TLS Checker.</p>
                <span className="text-cyan-400 text-xs font-mono flex items-center gap-1">Validate SSL <ChevronRight className="w-3 h-3"/></span>
              </Link>
              
              {/* DNS Lookup Link */}
              <Link href="/tools/dns-lookup" className="p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-orange-500/30 transition-all group">
                <Database className="w-8 h-8 text-orange-400 mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-white font-bold text-lg mb-2">DNS Records Auditor</h4>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">Extract and verify authoritative MX, TXT, A, and CAA records to prevent routing configuration gaps using our DNS records auditor.</p>
                <span className="text-orange-400 text-xs font-mono flex items-center gap-1">Audit DNS Records <ChevronRight className="w-3 h-3"/></span>
              </Link>

              {/* WHOIS Lookup Link */}
              <Link href="/tools/whois" className="p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-cyan-500/30 transition-all group">
                <Globe className="w-8 h-8 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-white font-bold text-lg mb-2">WHOIS Lookup</h4>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">Analyze domain registration records, registrar details, ownership, and administrative locks using our WHOIS Lookup tool.</p>
                <span className="text-cyan-400 text-xs font-mono flex items-center gap-1">Run WHOIS Check <ChevronRight className="w-3 h-3"/></span>
              </Link>

              {/* IP Lookup Link */}
              <Link href="/tools/ip-lookup" className="p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-purple-500/30 transition-all group">
                <Network className="w-8 h-8 text-purple-400 mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-white font-bold text-lg mb-2">IP Reputation Checker</h4>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">Analyze host reputation, threat tags, and ISP subnet details using our IP reputation checker.</p>
                <span className="text-purple-400 text-xs font-mono flex items-center gap-1">Run IP Scan <ChevronRight className="w-3 h-3"/></span>
              </Link>

              {/* Subdomain Finder Link */}
              <Link href="/tools/subdomain-finder" className="p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-orange-500/30 transition-all group">
                <Terminal className="w-8 h-8 text-orange-400 mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-white font-bold text-lg mb-2">Subdomain Finder</h4>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">Enumerate public namespaces, find dev subdomains, and identify external infrastructure with our Subdomain Finder.</p>
                <span className="text-orange-400 text-xs font-mono flex items-center gap-1">Find Subdomains <ChevronRight className="w-3 h-3"/></span>
              </Link>
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
