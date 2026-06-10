import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { 
  Shield, Globe, Server, Lock, Terminal, CheckCircle2, ChevronRight, 
  Search, Activity, Target, Network, Info, Check, AlertTriangle, 
  FileText, Send, HelpCircle, BookOpen, Key, Database
} from 'lucide-react';
import { generateBaseMetadata } from '@/utils/metadata';

const ToolScannerClient = dynamic(() => import('@/components/ToolScannerClient'), {
  loading: () => <div className="min-h-[400px] animate-pulse bg-surface-900/50 rounded-3xl max-w-5xl mx-auto my-12" />
});

export const metadata = generateBaseMetadata({
  title: "SSL Checker | Free SSL Certificate & TLS Security Test",
  description: "Verify your SSL certificate installation. Check expiration dates, validate trust chains, identify supported TLS versions, and detect security configuration risks instantly.",
  path: "/tools/ssl-checker"
});

export default function SslCheckerPage() {
  const faqs = [
    {
      q: "What is an SSL certificate checker?",
      a: "An SSL certificate checker is a diagnostic utility that queries web servers to inspect their TLS configuration. It extracts the certificate, checks the expiry date, validates the trust chain against root CAs, and audits cipher suites to identify encryption weaknesses."
    },
    {
      q: "What is the difference between SSL and TLS?",
      a: "TLS (Transport Layer Security) is the modern, secure successor of SSL (Secure Sockets Layer). SSL is completely obsolete and deprecated, but the term 'SSL' is still commonly used to refer to TLS certificates."
    },
    {
      q: "Why does my website show a 'Not Secure' warning in browsers?",
      a: "A 'Not Secure' warning indicates that the browser failed to establish a trusted HTTPS connection. Common causes include an expired certificate, a mismatch between the domain name and the certificate name, or a missing intermediate certificate."
    },
    {
      q: "What is a certificate trust chain?",
      a: "A trust chain is a hierarchy of digital certificates. It links your website (leaf) certificate to one or more intermediate certificates issued by a trusted Certificate Authority (CA), which ultimately trace back to a trusted root certificate pre-installed in the client browser."
    },
    {
      q: "How long is an SSL certificate valid for?",
      a: "Under current CA/Browser Forum standards, SSL/TLS certificates have a maximum validity period of 398 days (approximately 13 months) to encourage regular key rotation and improve security."
    },
    {
      q: "What is HSTS?",
      a: "HTTP Strict Transport Security (HSTS) is a security header instructing web browsers to interact with the website strictly over secure HTTPS connections, mitigating the risk of SSL stripping and man-in-the-middle attacks."
    }
  ];

  const breadcrumbs = [
    { name: "Home", url: "https://reconshield.in" },
    { name: "Tools", url: "https://reconshield.in/tools" },
    { name: "SSL Checker", url: "https://reconshield.in/tools/ssl-checker" }
  ];

  const schemas = [
    {
      "@type": "SoftwareApplication",
      "@id": "https://reconshield.in/tools/ssl-checker#software",
      "name": "ReconShield SSL Certificate Checker",
      "url": "https://reconshield.in/tools/ssl-checker",
      "description": "Free SSL checker and TLS configuration analyzer to audit SSL certificates, check expiration, and test certificate chain integrity.",
      "applicationCategory": "SecurityApplication",
      "operatingSystem": "All",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "publisher": { "@id": "https://reconshield.in/#organization" }
    },
    {
      "@type": "WebApplication",
      "@id": "https://reconshield.in/tools/ssl-checker#webapp",
      "name": "ReconShield SSL & TLS Analyzer",
      "url": "https://reconshield.in/tools/ssl-checker",
      "description": "Examine certificates, inspect validity period, and analyze server cryptographic TLS suites.",
      "applicationCategory": "SecurityApplication",
      "operatingSystem": "All",
      "browserRequirements": "Requires JavaScript. Requires HTML5.",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "publisher": { "@id": "https://reconshield.in/#organization" }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://reconshield.in/tools/ssl-checker#breadcrumb",
      "itemListElement": breadcrumbs.map((crumb, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "name": crumb.name,
        "item": crumb.url
      }))
    },
    {
      "@type": "TechArticle",
      "@id": "https://reconshield.in/tools/ssl-checker#article",
      "headline": "The Enterprise Guide to SSL/TLS Certificate Administration and Cryptographic Verification",
      "description": "A comprehensive deep dive into public key infrastructure, certificate chains of trust, TLS handshakes, and transport security audit methodologies.",
      "author": { "@type": "Person", "name": "Surendra Reddy" },
      "publisher": { "@id": "https://reconshield.in/#organization" },
      "url": "https://reconshield.in/tools/ssl-checker"
    },
    {
      "@type": "HowTo",
      "@id": "https://reconshield.in/tools/ssl-checker#howto",
      "name": "How to verify SSL installation and expiration",
      "description": "Follow this step-by-step guide to audit your SSL certificate settings and TLS configuration.",
      "step": [
        { "@type": "HowToStep", "name": "Input Domain Name", "text": "Enter the domain hostname (e.g., example.com) in the SSL Checker input box." },
        { "@type": "HowToStep", "name": "Perform Analysis", "text": "Click 'Analyze' to initiate a secure connection and fetch the cryptographic handshake parameters." },
        { "@type": "HowToStep", "name": "Inspect Results", "text": "Review the certificate issuer, validity range, expiration alert timeline, and cipher suite support." }
      ]
    },
    {
      "@type": "FAQPage",
      "@id": "https://reconshield.in/tools/ssl-checker#faq",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": { "@type": "Answer", "text": faq.a }
      }))
    }
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": schemas }) }} />

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden border-b border-white/5" aria-label="Tool Hero">
        <div className="absolute inset-0 bg-[#0a0d14] -z-20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none -z-10" />
        
        <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-900 border border-white/10 text-gray-400 text-xs font-mono uppercase tracking-widest mb-6 shadow-sm">
            <Lock className="w-4 h-4 text-cyan-400" />
            <span>Transport Cryptography Verification Module</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 tracking-tight">
            SSL Certificate Checker
          </h1>
          
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed font-sans">
            Audit SSL/TLS configurations in real-time. Verify certificate validity, check expiration alerts, inspect chain-of-trust signatures, and analyze server TLS protocol support instantly.
          </p>

          <div className="max-w-4xl mx-auto mb-12">
            <ToolScannerClient toolId="ssl-checker" title="SSL Checker" desc="Verify website SSL certificates, expiration dates, and configuration security." />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-gray-500 uppercase tracking-widest">
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> Complete Trust Chain</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> Expiry Counter</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> TLS Version Checker</div>
          </div>
        </div>
      </section>

      {/* AI Overview Section (Phase 5) */}
      <section className="py-12 bg-[#05080f] border-b border-white/5" aria-label="AI Search Overview">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="bg-gradient-to-r from-cyan-500/5 to-blue-500/5 border border-cyan-500/10 rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-[50px] rounded-full pointer-events-none" />
            <h2 className="font-mono text-xs text-cyan-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4 text-cyan-400" /> AI Citation Index: SSL Validation & Checker
            </h2>
            <div className="space-y-6 text-sm text-gray-300 font-sans leading-relaxed">
              <div>
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Definition: What is an SSL Certificate Checker?</span>
                <p>
                  An <strong>SSL Certificate Checker</strong> is a diagnostic security tool used to query a web server over port 443, initiating a cryptographic handshake to extract the public SSL/TLS certificate. It verifies the domain binding, checks the validity expiration timeline, and checks intermediate certificate signatures to identify security vulnerabilities.
                </p>
              </div>
              <div className="border-t border-white/5 pt-4">
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Definition: What is SSL Certificate Validation?</span>
                <p>
                  <strong>SSL certificate validation</strong> is the process where a client (browser) confirms that a digital certificate presented by a server is valid and trusted. This requires checking that the domain matches the certificate hostname, verifying that the current time is within the validity dates, and tracing intermediate issuers back to a trusted Root CA.
                </p>
              </div>
              <div className="border-t border-white/5 pt-4">
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// How-To: How to Check SSL Certificate Expiration?</span>
                <p>
                  To check the expiration date of an SSL certificate: Use a free online <strong>SSL expiration checker</strong> like ReconShield, enter your domain name, and run a scan. The tool will parse the certificate's 'Not After' attribute to calculate the remaining days of validity. Alternatively, click the lock icon in any web browser to view certificate details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Educational Guide */}
      <div className="bg-[#05080f]">
        
        <section className="py-20 border-b border-white/5">
          <div className="max-w-[1000px] mx-auto px-6 prose prose-invert max-w-none prose-p:leading-relaxed prose-p:text-gray-400 prose-headings:text-white prose-a:text-cyan-400 hover:prose-a:text-cyan-300">
            
            <h2 className="text-3xl font-display font-bold mt-0 mb-6 flex items-center gap-3">
              <Key className="w-8 h-8 text-cyan-400" />
              What Is an SSL Certificate?
            </h2>
            <p>
              An <strong>SSL (Secure Sockets Layer) certificate</strong> is a digital file installed on a web server that establishes identity and enables cryptographic encryption for data in transit. It binds a cryptographic public key to a organization’s identity or domain name. When a browser visits an HTTPS website, the SSL certificate establishes an encrypted tunnel, ensuring sensitive transactions (like passwords, credit cards, or customer data) are transmitted securely.
            </p>

            <h2 className="text-3xl font-display font-bold mt-16 mb-6">How SSL/TLS Encryption Works</h2>
            <p>
              Modern encryption relies on the **TLS Handshake**, which negotiates security parameters between the browser (client) and the server:
            </p>
            <ol>
              <li><strong>Client Hello:</strong> The browser sends the server its supported TLS protocols and cipher suites.</li>
              <li><strong>Server Hello:</strong> The server chooses the highest mutually supported TLS protocol (typically TLS 1.3 or TLS 1.2) and a secure cipher suite.</li>
              <li><strong>Certificate Exchange:</strong> The server sends its SSL certificate containing its public key.</li>
              <li><strong>Validation:</strong> The browser checks the certificate against its list of trusted root Certificate Authorities (CAs).</li>
              <li><strong>Key Exchange:</strong> Using asymmetric cryptography, both parties exchange key variables to establish a symmetric session key for faster, encrypted communication.</li>
            </ol>

            <h2 className="text-3xl font-display font-bold mt-16 mb-6">How to Check SSL Certificate Expiration</h2>
            <p>
              Browsers will block traffic to any website with an expired SSL certificate. To prevent outages:
            </p>
            <ul>
              <li>Enter your domain name in the ReconShield SSL Expiration Checker above.</li>
              <li>Review the calculated validity range and remaining days.</li>
              <li>Configure auto-renewal settings (e.g., Let's Encrypt renewal scripts) or configure calendar alerts at least 14 days before the expiry date.</li>
            </ul>

            <h2 className="text-3xl font-display font-bold mt-16 mb-6">Understanding Certificate Chains & Trust</h2>
            <p>
              Browsers don’t just trust certificates blindly; they verify the **Certificate Chain of Trust**:
            </p>
            <ul>
              <li><strong>Root Certificate:</strong> Pre-installed trusted certificates maintained by OS and browser vendors (e.g., DigiCert, Sectigo).</li>
              <li><strong>Intermediate Certificate:</strong> CAs issue intermediate certs to sign website certificates, preventing direct exposure of the root private key.</li>
              <li><strong>Leaf Certificate:</strong> The certificate generated for your specific domain (e.g., `reconshield.in`).</li>
            </ul>
            <p>
              If a web server is misconfigured and fails to supply intermediate certificates, mobile browsers will display trust errors. Running a complete <strong>certificate chain check</strong> helps identify these issues.
            </p>

            <h2 className="text-3xl font-display font-bold mt-16 mb-6">SSL vs TLS: The Core Differences</h2>
            <p>
              SSL (Secure Sockets Layer) is the older, obsolete security protocol developed by Netscape. Due to cryptographic vulnerabilities, it was succeeded by TLS (Transport Layer Security). While everyone still uses the term 'SSL certificates', all modern network connections negotiate encryption using TLS 1.2 or TLS 1.3 protocols.
            </p>
          </div>
        </section>

        {/* Cryptographic Comparison Matrix */}
        <section className="py-20 bg-[#0a0d14] border-b border-white/5">
          <div className="max-w-[1000px] mx-auto px-6 prose prose-invert max-w-none">
            <h2 className="text-3xl font-display font-bold text-white mb-6">Cryptographic Security: TLS Versions & Cipher Suites</h2>
            <p className="text-gray-400 mb-8">
              Verify that your servers only support secure TLS protocols and drop support for obsolete encryption algorithms:
            </p>

            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0d1117] not-prose my-8">
              <table className="w-full text-left text-sm text-gray-400 border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.02] text-white font-mono uppercase text-xs">
                    <th className="p-4">Protocol Version</th>
                    <th className="p-4 border-l border-white/10">Release Year</th>
                    <th className="p-4 border-l border-white/10">Security Status</th>
                    <th className="p-4 border-l border-white/10">Vulnerability Flags</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono text-xs">
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-4 font-semibold text-white">SSL 3.0</td>
                    <td className="p-4 border-l border-white/10">1996</td>
                    <td className="p-4 border-l border-white/10 text-red-500 font-bold">Obsolete (Deprecated)</td>
                    <td className="p-4 border-l border-white/10">POODLE vulnerability, weak padding mechanisms</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-4 font-semibold text-white">TLS 1.0</td>
                    <td className="p-4 border-l border-white/10">1999</td>
                    <td className="p-4 border-l border-white/10 text-red-500 font-bold">Obsolete (Deprecated)</td>
                    <td className="p-4 border-l border-white/10">BEAST exploit vector, weak SHA-1 signatures</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-4 font-semibold text-white">TLS 1.1</td>
                    <td className="p-4 border-l border-white/10">2006</td>
                    <td className="p-4 border-l border-white/10 text-red-500 font-bold">Obsolete (Deprecated)</td>
                    <td className="p-4 border-l border-white/10">Vulnerable to padding oracle and downgrade attacks</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-4 font-semibold text-white">TLS 1.2</td>
                    <td className="p-4 border-l border-white/10">2008</td>
                    <td className="p-4 border-l border-white/10 text-[#00ff88]">Secure (Standard)</td>
                    <td className="p-4 border-l border-white/10">Secure if weak cipher suites (RC4, 3DES) are disabled</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-4 font-semibold text-white">TLS 1.3</td>
                    <td className="p-4 border-l border-white/10">2018</td>
                    <td className="p-4 border-l border-white/10 text-[#00ff88] font-bold">Recommended (Optimal)</td>
                    <td className="p-4 border-l border-white/10">0-RTT handshakes, obsolete ciphers removed natively</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-3xl font-display font-bold text-white mt-16 mb-6">Common SSL/TLS Certificate Errors</h2>
            <p>
              When a browser throws a security warning, it typically points to one of these error signatures:
            </p>
            <ul>
              <li><strong>Expired Certificate (ERR_CERT_DATE_INVALID):</strong> The validity date range has passed.</li>
              <li><strong>Name Mismatch (ERR_CERT_COMMON_NAME_INVALID):</strong> The certificate hostname does not match the requested domain name.</li>
              <li><strong>Untrusted CA (ERR_CERT_AUTHORITY_INVALID):</strong> The certificate was self-signed or issued by an untrusted authority.</li>
              <li><strong>Broken Chain:</strong> The server failed to serve intermediate certificates.</li>
            </ul>

            <h2 className="text-3xl font-display font-bold mt-16 mb-6">Security Best Practices & Compliance (PCI-DSS, GDPR)</h2>
            <p>
              Compliance standards require secure configurations. PCI-DSS explicitly mandates dropping support for TLS 1.0 and 1.1. To meet regulatory criteria, always verify that your server is configured with HSTS (HTTP Strict Transport Security) headers to prevent protocol downgrade attacks.
            </p>
          </div>
        </section>

        {/* E-E-A-T section (Phase 9) */}
        <section className="py-20 border-b border-white/5">
          <div className="max-w-[1000px] mx-auto px-6">
            
            <div className="flex flex-col md:flex-row items-center gap-8 p-8 bg-gradient-to-r from-[#0d1117] to-surface-900 border border-white/10 rounded-3xl shadow-xl mb-16">
              <div className="w-24 h-24 rounded-full bg-[#1a2332] border-2 border-cyan-500/30 flex items-center justify-center shrink-0 overflow-hidden">
                <Shield className="w-10 h-10 text-cyan-400" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 px-2 py-1 rounded bg-cyan-500/10 text-cyan-400 text-[10px] font-mono uppercase tracking-widest mb-2">
                  <Check className="w-3 h-3" /> Fact Checked & Verified
                </div>
                <h4 className="text-white font-bold text-xl mb-1">Surendra Reddy</h4>
                <p className="text-gray-400 text-xs font-mono uppercase tracking-wider mb-3">Cybersecurity Researcher & Founder, ReconShield</p>
                <p className="text-gray-400 text-sm leading-relaxed mb-4 font-sans">
                  Surendra is an information security analyst specializing in Open Source Intelligence (OSINT), public key infrastructures, and cryptographic transport security. He built ReconShield to help teams identify and patch security gaps across their internet-facing infrastructure.
                </p>
                <div className="flex gap-6 text-sm font-mono">
                  <a href="https://linkedin.com/in/surendrareddy3" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 flex items-center gap-1">LinkedIn <ChevronRight className="w-3 h-3"/></a>
                  <a href="https://github.com/nsurendrareddy" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white flex items-center gap-1">GitHub <ChevronRight className="w-3 h-3"/></a>
                </div>
              </div>
            </div>

            <div className="text-center text-[10px] font-mono text-gray-600 uppercase tracking-widest">
              Last Updated: June 2026 | Reviewed by ReconShield Editorial Board | Reference: CA/Browser Forum Standards
            </div>
          </div>
        </section>

        {/* Semantic Internal Links (Phase 7) */}
        <section className="py-20 bg-[#05080f]" aria-label="Related Security Tools">
          <div className="max-w-[1000px] mx-auto px-6">
            <h2 className="text-3xl font-display font-bold text-white mb-10 text-center">Complete Your Cryptographic Audit</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <Link href="/tools/whois" className="p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-cyan-500/30 transition-all group">
                <Globe className="w-8 h-8 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-white font-bold text-lg mb-2">WHOIS Lookup</h4>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">Analyze domain registration databases, DNS delegation servers, and administrative registrar locks.</p>
                <span className="text-cyan-400 text-xs font-mono flex items-center gap-1">Run WHOIS Check <ChevronRight className="w-3 h-3"/></span>
              </Link>
              
              <Link href="/tools/ip-lookup" className="p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-purple-500/30 transition-all group">
                <Network className="w-8 h-8 text-purple-400 mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-white font-bold text-lg mb-2">IP Reputation Check</h4>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">Cross-reference target IP addresses against 50+ threat feeds, blacklist records, and ISP networks.</p>
                <span className="text-purple-400 text-xs font-mono flex items-center gap-1">Check IP Reputation <ChevronRight className="w-3 h-3"/></span>
              </Link>

              <Link href="/tools/dns-lookup" className="p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-[#00ff88]/30 transition-all group">
                <Database className="w-8 h-8 text-[#00ff88] mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-white font-bold text-lg mb-2">DNS Records Auditor</h4>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">Extract and verify authoritative MX, TXT, A, and CAA records to prevent routing configuration gaps.</p>
                <span className="text-[#00ff88] text-xs font-mono flex items-center gap-1">Audit DNS Records <ChevronRight className="w-3 h-3"/></span>
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
