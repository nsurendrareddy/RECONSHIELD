import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Shield, Target, Server, Lock, Terminal, CheckCircle2, ChevronRight, Activity, Network, AlertTriangle, Search, Globe, FileCode } from 'lucide-react';

const ToolScannerClient = dynamic(() => import('@/components/ToolScannerClient'), {
  loading: () => <div className="min-h-[600px] animate-pulse bg-surface-900/50 rounded-3xl" />
});

import { generateBaseMetadata } from '@/utils/metadata';

export const metadata = generateBaseMetadata({
  title: "Security Headers Analyzer & Website Hardening Tool ",
  description: "Free security headers checker. Audit HTTP security headers, analyze your Content-Security-Policy (CSP), and enforce HSTS to protect against XSS and clickjacking.",
  path: "/tools/http-headers"
});

export default function SecurityHeadersPage() {
  const faqs = [
    {
      q: "What is a Security Headers Checker?",
      a: "A security headers checker is a diagnostic tool that analyzes the HTTP response headers sent by a web server. It verifies if essential security directives (like CSP, HSTS, and X-Frame-Options) are present and correctly configured to protect users from client-side attacks."
    },
    {
      q: "Why do HTTP security headers matter?",
      a: "HTTP security headers are the first line of defense for web applications. They instruct the user's browser on how to behave securely, preventing malicious scripts from executing (XSS), stopping the site from being embedded in malicious iframes (clickjacking), and forcing encrypted connections."
    },
    {
      q: "What does a CSP Checker look for?",
      a: "A CSP (Content-Security-Policy) checker analyzes your CSP header to ensure you strictly define which external resources (scripts, styles, images) are permitted to load. A strong CSP is the most effective defense against Cross-Site Scripting (XSS) attacks."
    },
    {
      q: "What is HSTS and why do I need an HSTS checker?",
      a: "HSTS (HTTP Strict Transport Security) forces browsers to only connect to your website over HTTPS, eliminating downgrade attacks and cookie hijacking. An HSTS checker verifies that the header is present, includes subdomains, and has a sufficient max-age directive."
    },
    {
      q: "Does adding website security headers impact performance?",
      a: "No. Security headers are simply small strings of text sent alongside the HTML payload. They add virtually zero latency while dramatically hardening the security posture of the application."
    }
  ];

  return (
    <>
      {/* Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "SoftwareApplication",
                "@id": "https://reconshield.in/tools/http-headers#software",
                "name": "ReconShield Security Headers Analyzer",
                "url": "https://reconshield.in/tools/http-headers",
                "description": "Enterprise HTTP security headers checker, CSP auditor, and website hardening tool.",
                "applicationCategory": "SecurityApplication",
                "operatingSystem": "Web",
                "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
              },
              {
                "@type": "BreadcrumbList",
                "@id": "https://reconshield.in/tools/http-headers#breadcrumb",
                "itemListElement": [
                  { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://reconshield.in" },
                  { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://reconshield.in/tools" },
                  { "@type": "ListItem", "position": 3, "name": "Security Headers", "item": "https://reconshield.in/tools/http-headers" }
                ]
              },
              {
                "@type": "FAQPage",
                "@id": "https://reconshield.in/tools/http-headers#faq",
                "mainEntity": faqs.map(faq => ({
                  "@type": "Question",
                  "name": faq.q,
                  "acceptedAnswer": { "@type": "Answer", "text": faq.a }
                }))
              }
            ]
          })
        }}
      />

      {/* 1. Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[#0a0d14] -z-20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-amber-500/5 blur-[100px] rounded-full pointer-events-none -z-10" />
        
        <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-center animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-900 border border-white/10 text-gray-400 text-xs font-mono uppercase tracking-widest mb-6 shadow-sm">
            <Shield className="w-4 h-4 text-amber-500" />
            <span>Web Application Defense Module</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-400">Security Headers Analyzer</span> & Hardening Tool
          </h1>
          
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Audit your server's <strong>HTTP security headers</strong> instantly. Perform a deep <strong>CSP checker</strong> analysis and verify HSTS to harden your website against XSS, clickjacking, and protocol downgrade attacks.
          </p>

          <div className="max-w-4xl mx-auto mb-12">
            <ToolScannerClient 
              toolId="security-headers" 
              title="HTTP Headers Auditor" 
              desc="Enter a domain to initiate a comprehensive security headers assessment." 
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-gray-500 uppercase tracking-widest">
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-500" /> CSP Validation</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-500" /> Clickjacking Defense</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-500" /> TLS Enforcement</div>
          </div>
        </div>
      </section>

      {/* SEO Content Silo Container */}
      <div className="bg-[#05080f]">
        
        {/* 2. What Are HTTP Security Headers? & 3. Why Security Headers Matter */}
        <section className="py-20 border-b border-white/5">
          <div className="max-w-[900px] mx-auto px-6 prose prose-invert max-w-none prose-p:leading-relaxed prose-p:text-gray-400 prose-headings:text-white prose-a:text-amber-500 hover:prose-a:text-amber-400">
            
            <h2 className="text-3xl font-display font-bold mt-0 mb-6 flex items-center gap-3">
              <FileCode className="w-8 h-8 text-amber-500" />
              What Are HTTP Security Headers?
            </h2>
            <p>
              When your browser requests a webpage, the server responds with the HTML content and a set of HTTP headers. <strong>Website security headers</strong> are specific directives within this response that dictate how the browser should handle the site's data. A <strong>security headers checker</strong> evaluates these directives to ensure the server is actively protecting the client side.
            </p>
            <p>
              By utilizing a <strong>website hardening tool</strong> like ReconShield, administrators can instantly identify if their server is broadcasting the correct headers. Missing or misconfigured headers represent a massive failure in defense-in-depth architecture, leaving end-users vulnerable to exploitation.
            </p>

            <h2 className="text-3xl font-display font-bold mt-16 mb-6 flex items-center gap-3">
              <Activity className="w-8 h-8 text-orange-400" />
              Why Security Headers Matter
            </h2>
            <p>
              Traditional server-side security (like firewalls and WAFs) protects the backend infrastructure. However, the majority of modern cyber attacks—such as Cross-Site Scripting (XSS), credential harvesting, and session hijacking—occur in the victim's browser. <strong>HTTP security headers</strong> act as a client-side firewall, restricting the browser's capabilities and mitigating the impact of application configuration risks.
            </p>

          </div>
        </section>

        {/* 4. Essential Headers & 5. CSP Deep Dive & 6. HSTS */}
        <section className="py-20 bg-[#0a0d14] border-b border-white/5">
          <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            <div className="prose prose-invert max-w-none prose-p:text-gray-400">
              <h2 className="text-3xl font-display font-bold text-white mb-6">Essential Security Headers Explained</h2>
              <p>
                To achieve a hardened application state, administrators must configure a baseline suite of headers. Our tool audits the following critical directives:
              </p>
              <ul>
                <li><strong>X-Frame-Options:</strong> Prevents your site from being framed, eliminating clickjacking attacks.</li>
                <li><strong>X-Content-Type-Options:</strong> Stops browsers from MIME-sniffing a response away from the declared content-type, mitigating drive-by downloads.</li>
                <li><strong>Referrer-Policy:</strong> Controls how much origin information is included in the Referer header when users navigate away from your site.</li>
                <li><strong>Permissions-Policy:</strong> Restricts which browser features and APIs (like the camera or microphone) can be used.</li>
              </ul>

              <h3 className="text-xl text-white font-bold mt-8 mb-4">Content-Security-Policy (CSP) Deep Dive</h3>
              <p>
                The <strong>Content-Security-Policy</strong> is arguably the most powerful—and complex—security header. Our <strong>Content-Security-Policy analyzer</strong> dissects your policy string to ensure you are not using dangerous directives like `unsafe-inline` or `unsafe-eval`. A strict CSP completely neuters Cross-Site Scripting (XSS) by preventing the execution of unauthorized JavaScript.
              </p>
            </div>

            {/* Core Threats Focus Card */}
            <div className="bg-surface-900 border border-white/10 rounded-3xl p-8 shadow-2xl">
              <h3 className="text-xl font-display font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" /> Defeating Common Threats
              </h3>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0">
                    <Terminal className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Cross-Site Scripting (XSS)</h4>
                    <p className="text-sm text-gray-400">Mitigated by a strict CSP. Our <strong>CSP checker</strong> ensures your policy explicitly blocks malicious payload execution.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                    <Target className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Clickjacking (UI Redressing)</h4>
                    <p className="text-sm text-gray-400">Defeated by `X-Frame-Options: DENY` or the `frame-ancestors` CSP directive. We verify these are present to protect your users' clicks.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                    <Lock className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Downgrade Attacks (HSTS)</h4>
                    <p className="text-sm text-gray-400">Our <strong>HSTS checker</strong> ensures Strict-Transport-Security is active, forcing unbreakable HTTPS and protecting session cookies over public Wi-Fi.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 8. Use Cases & 9. Step-by-Step */}
        <section className="py-20 border-b border-white/5">
          <div className="max-w-[900px] mx-auto px-6 prose prose-invert max-w-none prose-p:text-gray-400">
            
            <h2 className="text-3xl font-display font-bold text-white mb-6">Real-World Security Use Cases</h2>
            <ul>
              <li><strong>Compliance & Audits:</strong> Organizations must run a <strong>security headers checker</strong> to prove compliance with frameworks like SOC 2, ISO 27001, and PCI-DSS, all of which mandate strict transport security and client-side protections.</li>
              <li><strong>Post-Deployment Hardening:</strong> DevOps engineers use the tool as a post-deployment checklist to ensure caching layers (like Cloudflare or AWS CloudFront) aren't stripping critical security directives.</li>
              <li><strong>Bug Bounty Research:</strong> Pentesters analyze infrastructure assets for missing headers. The absence of `X-Frame-Options` is frequently submitted as a clickjacking exposure risk.</li>
            </ul>

            <h2 className="text-3xl font-display font-bold text-white mt-16 mb-8">Step-by-Step Tutorial: Hardening Your Site</h2>
            <div className="bg-[#0d1117] border border-[#1a2332] rounded-2xl p-6 mb-12">
              <ol className="list-decimal list-inside space-y-4 text-gray-300">
                <li><strong>Enter the Target Domain:</strong> Input your application URL into the ReconShield terminal.</li>
                <li><strong>Analyze the Results:</strong> The tool will grade your current configuration and flag any missing <strong>HTTP security headers</strong>.</li>
                <li><strong>Evaluate the CSP:</strong> Review the <strong>CSP checker</strong> output to identify overly permissive directives like `unsafe-inline`.</li>
                <li><strong>Verify HSTS:</strong> Ensure the `Strict-Transport-Security` header includes the `includeSubDomains` and `preload` tags.</li>
                <li><strong>Update Server Config:</strong> Add the missing headers to your web server (Nginx, Apache, or edge worker) and re-scan to confirm the hardening.</li>
              </ol>
            </div>
          </div>
        </section>

        {/* 10. FAQ Section */}
        <section className="py-20 bg-[#0a0d14] border-b border-white/5">
          <div className="max-w-[900px] mx-auto px-6">
            <h2 className="text-3xl font-display font-bold text-white mb-10 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-surface-900 border border-white/10 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-3">{faq.q}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 12. EEAT Author Bio */}
        <section className="py-16">
          <div className="max-w-[900px] mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center gap-8 p-8 bg-gradient-to-r from-[#0d1117] to-surface-900 border border-white/10 rounded-3xl shadow-xl">
              <div className="w-24 h-24 rounded-full bg-[#1a2332] border-2 border-amber-500/30 flex items-center justify-center shrink-0 overflow-hidden">
                <Shield className="w-10 h-10 text-amber-500" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 px-2 py-1 rounded bg-amber-500/10 text-amber-500 text-[10px] font-mono uppercase tracking-widest mb-2">
                  <CheckCircle2 className="w-3 h-3" /> Fact Checked & Verified
                </div>
                <h4 className="text-white font-bold text-xl mb-1">Surendra Reddy</h4>
                <p className="text-gray-400 text-xs font-mono uppercase tracking-wider mb-3">Cybersecurity Researcher & Founder, ReconShield</p>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  Surendra is a cybersecurity engineer specializing in Open Source Intelligence (OSINT), exposure intelligence, and AI-driven threat analysis. He built ReconShield to democratize access to enterprise-grade infrastructure visibility tools and secure the digital internet-facing assets.
                </p>
                <div className="flex gap-6 text-sm font-mono">
                  <a href="https://linkedin.com/in/surendrareddy3" target="_blank" rel="noopener noreferrer" className="text-amber-500 hover:text-amber-400 flex items-center gap-1">LinkedIn <ChevronRight className="w-3 h-3"/></a>
                  <a href="https://github.com/nsurendrareddy" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white flex items-center gap-1">GitHub <ChevronRight className="w-3 h-3"/></a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 11. Related Security Tools & 13. Internal Linking Hub */}
        <section className="py-20 bg-[#0a0d14]">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex items-center gap-4 mb-10">
              <h2 className="font-mono text-xs tracking-[4px] uppercase text-amber-500 font-bold">// EXPLORE RELATED HARDENING TOOLS</h2>
              <div className="h-[1px] flex-1 bg-[#1a2332]" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/tools/vulnerability-scanner" className="p-6 bg-surface-900 border border-white/5 hover:border-amber-500/30 rounded-2xl group transition-all">
                <Shield className="w-6 h-6 text-amber-500 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-white font-bold mb-2 group-hover:text-amber-500 transition-colors">Security Exposure Assessment Tool</h3>
                <p className="text-xs text-gray-400">Assess the full internet-facing assets of a domain passively for deep security misconfigurations.</p>
              </Link>

              <Link href="/tools/ssl-checker" className="p-6 bg-surface-900 border border-white/5 hover:border-amber-500/30 rounded-2xl group transition-all">
                <Lock className="w-6 h-6 text-amber-500 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-white font-bold mb-2 group-hover:text-amber-500 transition-colors">SSL/TLS Checker</h3>
                <p className="text-xs text-gray-400">Analyze cryptographic strength, cipher suites, and verify transport layer security alongside HSTS.</p>
              </Link>

              <Link href="/tools/port-scanner" className="p-6 bg-surface-900 border border-white/5 hover:border-amber-500/30 rounded-2xl group transition-all">
                <Terminal className="w-6 h-6 text-amber-500 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-white font-bold mb-2 group-hover:text-amber-500 transition-colors">Open Port Scanner</h3>
                <p className="text-xs text-gray-400">Detect exposed infrastructure services like SSH, RDP, and FTP alongside your HTTP auditing.</p>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
