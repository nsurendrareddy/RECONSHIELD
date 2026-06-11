import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { 
  Shield, Globe, Server, Lock, Terminal, CheckCircle2, ChevronRight, 
  Search, Activity, Target, Network, Info, Check, AlertTriangle, 
  FileText, Send, HelpCircle, BookOpen, Key, Database, Clock, Eye
} from 'lucide-react';
import { generateBaseMetadata } from '@/utils/metadata';

const ToolScannerClient = dynamic(() => import('@/components/ToolScannerClient'), {
  loading: () => <div className="min-h-[400px] animate-pulse bg-surface-900/50 rounded-3xl max-w-5xl mx-auto my-12" />
});

export const metadata = generateBaseMetadata({
  title: "SSL Checker | Free SSL Certificate & TLS Security Auditor",
  description: "Verify your website's SSL certificate installation with our free online ssl checker. Audit certificate validity, check expiry dates, and test TLS configurations.",
  path: "/tools/ssl-checker"
});

export default function SslCheckerPage() {
  const faqs = [
    {
      q: "What is SSL?",
      a: "SSL (Secure Sockets Layer) is an obsolete cryptographic protocol designed to encrypt communications between a web browser and a server. It has been replaced by TLS, though the term SSL is still widely used to refer to modern TLS encryption certificates."
    },
    {
      q: "What is TLS?",
      a: "TLS (Transport Layer Security) is the modern cryptographic successor to SSL. It establishes secure, encrypted connections over TCP using advanced algorithms to protect data from tampering and interception. Currently, TLS 1.2 and TLS 1.3 are the industry standards."
    },
    {
      q: "How do I check an SSL certificate?",
      a: "You can check an SSL certificate by entering a domain name into the ReconShield SSL Checker. The tool initiates a cryptographic handshake with the web server, retrieves the certificate details, and verifies its validity, expiration, and trust chain."
    },
    {
      q: "How do I check certificate expiration?",
      a: "To check certificate expiration, run a scan on our SSL Checker tool, which extracts the 'Not After' field from the X.509 certificate. Browsers also display this under the security lock icon in the address bar."
    },
    {
      q: "What is a wildcard SSL certificate?",
      a: "A wildcard SSL certificate is a public key certificate that secures a root domain and unlimited subdomains under it using a wildcard character (e.g., *.domain.com). This simplifies certificate management for multi-subdomain configurations."
    },
    {
      q: "What causes SSL errors?",
      a: "SSL errors are caused by expired certificates, mismatched hostnames, self-signed certificates from untrusted Certificate Authorities (CAs), incomplete certificate trust chains, weak cipher support, or client-side system clock mismatches."
    },
    {
      q: "What is certificate chain validation?",
      a: "Certificate chain validation is the process where a client verifies the path from the server's leaf certificate through intermediate certificates up to a trusted Root CA preloaded in the client's trust store, ensuring authenticity."
    },
    {
      q: "What is a Certificate Authority (CA)?",
      a: "A Certificate Authority is a trusted entity that issues digital certificates verifying website ownership. CAs, such as Let's Encrypt and DigiCert, must comply with strict CA/Browser Forum rules to remain trusted by web browsers."
    },
    {
      q: "What is Domain Validation (DV)?",
      a: "Domain Validation (DV) is the basic level of SSL validation. The CA confirms that the applicant controls the target domain name (usually via DNS record or HTTP file validation) before issuing the certificate."
    },
    {
      q: "What is Organization Validation (OV)?",
      a: "Organization Validation (OV) is a validation level where the CA verifies the legal existence and physical address of the organization, providing moderate trust indicators visible in the certificate details."
    },
    {
      q: "What is Extended Validation (EV)?",
      a: "Extended Validation (EV) is the highest level of SSL validation. The CA performs strict background checks on the company's legal status, operational existence, and authority, offering the highest trust profile."
    },
    {
      q: "What is a Multi-Domain SSL certificate?",
      a: "A Multi-Domain SSL certificate uses Subject Alternative Names (SAN) to secure multiple distinct domain names (e.g., example.com, test.in, blog.net) under a single cryptographic file, simplifying server administration."
    },
    {
      q: "What is HSTS and why is it important?",
      a: "HTTP Strict Transport Security (HSTS) is a response header that forces browsers to connect only via HTTPS. It prevents protocol downgrade attacks and cookie hijacking by blocking unencrypted connections."
    },
    {
      q: "What is OCSP validation?",
      a: "Online Certificate Status Protocol (OCSP) is an internet protocol used to determine the revocation state of a digital certificate in real-time, providing a faster alternative to traditional CRL lists."
    },
    {
      q: "How does SNI affect SSL checking?",
      a: "Server Name Indication (SNI) is a TLS extension that allows a server to host multiple SSL certificates on a single IP address by specifying the target hostname during the initial TLS handshake."
    }
  ];

  const breadcrumbs = [
    { name: "Home", url: "https://reconshield.in" },
    { name: "Tools", url: "https://reconshield.in/tools" },
    { name: "SSL Checker", url: "https://reconshield.in/tools/ssl-checker" }
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
          "@id": "https://reconshield.in/tools/ssl-checker#webpage",
          "url": "https://reconshield.in/tools/ssl-checker",
          "name": "SSL Checker Tool (Free) | Check SSL Certificate & TLS Security",
          "isPartOf": { "@id": "https://reconshield.in/#website" }
        },
        {
          "@type": "SoftwareApplication",
          "@id": "https://reconshield.in/tools/ssl-checker#software",
          "name": "ReconShield SSL Checker Tool",
          "url": "https://reconshield.in/tools/ssl-checker",
          "description": "Enterprise-grade SSL/TLS checker tool to verify certificate authority chains, expiry ranges, HSTS presence, and cipher suite strengths.",
          "applicationCategory": "UtilitiesApplication",
          "operatingSystem": "Web-based",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "publisher": { "@id": "https://reconshield.in/#organization" }
        },
        {
          "@type": "WebApplication",
          "@id": "https://reconshield.in/tools/ssl-checker#webapp",
          "name": "ReconShield SSL Certificate and Expiry Checker",
          "url": "https://reconshield.in/tools/ssl-checker",
          "description": "Initiate real-time cryptographic handshakes over port 443 to audit X.509 certificates and verify TLS compliance settings.",
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
          "headline": "The Technical Specification of public key infrastructure and transport layer security validation",
          "description": "An in-depth analysis of TLS handshakes, certificate chain verification, X.509 profiles, and HSTS security configurations.",
          "author": { "@type": "Person", "name": "Surendra Reddy" },
          "publisher": { "@id": "https://reconshield.in/#organization" },
          "url": "https://reconshield.in/tools/ssl-checker",
          "isPartOf": { "@id": "https://reconshield.in/tools/ssl-checker#webpage" }
        },
        {
          "@type": "HowTo",
          "@id": "https://reconshield.in/tools/ssl-checker#howto",
          "name": "How to check an SSL certificate installation",
          "description": "A step-by-step guide on how to perform a website SSL certificate validation using our check tools.",
          "step": [
            { "@type": "HowToStep", "name": "Enter Target Domain Name", "text": "Input the website domain name (e.g., example.com) in the analyzer input box." },
            { "@type": "HowToStep", "name": "Execute Handshake Scan", "text": "Click 'Search' to initiate a cryptographic audit of the server's TLS parameters." },
            { "@type": "HowToStep", "name": "Review Cryptographic Health", "text": "Verify the certificate authority chain of trust, expiry alert range, cipher strength, and HSTS headers." }
          ],
          "isPartOf": { "@id": "https://reconshield.in/tools/ssl-checker#webpage" }
        },
        {
          "@type": "FAQPage",
          "@id": "https://reconshield.in/tools/ssl-checker#faq",
          "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": { "@type": "Answer", "text": faq.a }
          })),
          "isPartOf": { "@id": "https://reconshield.in/tools/ssl-checker#webpage" }
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
            <span>Transport Cryptography Verification Module</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 tracking-tight">
            SSL Checker
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

      {/* AI Overview / Featured Snippet Optimization */}
      <section className="py-12 bg-[#05080f] border-b border-white/5" aria-label="AI Search Overview">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="bg-gradient-to-r from-cyan-500/5 to-blue-500/5 border border-cyan-500/10 rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-[50px] rounded-full pointer-events-none" />
            
            {/* Definition Block: What Is an SSL Checker? */}
            <h2 className="font-mono text-xs text-cyan-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4 text-cyan-400" /> AI Overview Snippet: SSL Validation & Checker
            </h2>
            <div className="space-y-6 text-sm text-gray-300 font-sans leading-relaxed">
              <div>
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Definition Block: What Is an SSL Checker?</span>
                <p className="text-gray-300">
                  An <strong>SSL Checker</strong> is a diagnostic transport layer security tool designed to verify website SSL certificates. It initiates a cryptographic handshake over port 443 to fetch the X.509 certificate file, verifying the domain name registration binding, trust chain, expiration alert timeline, HSTS presence, and cipher suite support.
                </p>
              </div>

              {/* Definition Block: What Is an SSL Certificate? */}
              <div className="border-t border-white/5 pt-4">
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Definition Block: What Is an SSL Certificate?</span>
                <p className="text-gray-300">
                  An <strong>SSL certificate</strong> (or TLS certificate) is a digital file issued by a trusted Certificate Authority (CA) that establishes server identity and enables symmetric encryption. It binds a cryptographic public key to a organization’s domain or IP identity.
                </p>
              </div>

              {/* Definition Block: What Is TLS? */}
              <div className="border-t border-white/5 pt-4">
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Definition Block: What Is TLS?</span>
                <p className="text-gray-300">
                  <strong>TLS (Transport Layer Security)</strong> is the modern cryptographic successor protocol to legacy SSL. Negotiated under standard IETF RFC rules, TLS establishes encrypted tunnels protecting data from interception. TLS 1.2 and TLS 1.3 are the current standards.
                </p>
              </div>

              {/* Definition Block: How to Check SSL Certificate Expiration? */}
              <div className="border-t border-white/5 pt-4">
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Definition Block: How to Check SSL Certificate Expiration?</span>
                <p className="text-gray-300">
                  To check SSL certificate expiration, enter your domain name in an online <strong>ssl expiration checker</strong>. The tool resolves the X.509 metadata to read the 'Not After' field and calculate the remaining validity days. Browsers also show this by clicking the lock icon.
                </p>
              </div>
              
              {/* TLDR Section & Key Takeaways */}
              <div className="border-t border-white/5 pt-4">
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// TL;DR Section</span>
                <p className="text-gray-400 text-xs font-mono">
                  SSL checkers establish connections over port 443 to audit X.509 certificates. The checker validates trust chains from root authorities down to leaf domain keys, ensuring HSTS headers, OCSP validation, and strong ciphers are active.
                </p>
              </div>

              <div className="border-t border-white/5 pt-4">
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Key Takeaways</span>
                <ul className="list-disc pl-5 text-gray-400 text-xs space-y-2 font-mono">
                  <li><strong>Handshake Check:</strong> Cryptographic tests extract validation lifetimes, issuers, and key lengths.</li>
                  <li><strong>Chain Health:</strong> Servers must provide intermediate certificates to avoid client trust errors.</li>
                  <li><strong>HSTS Hardening:</strong> HSTS forces browsers to connect only via secure HTTPS tunnels.</li>
                  <li><strong>TLS Standards:</strong> Legacy SSL 3.0, TLS 1.0, and TLS 1.1 must be disabled.</li>
                </ul>
              </div>

              {/* Fact Box: Common SSL Certificate Fields */}
              <div className="border-t border-white/5 pt-4">
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Fact Box: Common SSL Certificate Fields</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono text-gray-400 mt-2">
                  <div>
                    <span className="text-[10px] text-gray-600 uppercase block">Subject (CN):</span>
                    <span>Domain Name (Common Name)</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-600 uppercase block">Issuer:</span>
                    <span>Certificate Authority (CA)</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-600 uppercase block">Validity:</span>
                    <span>Not Before & Not After Dates</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-600 uppercase block">SAN:</span>
                    <span>Subject Alternative Names</span>
                  </div>
                </div>
              </div>

              {/* Expert Summary */}
              <div className="border-t border-white/5 pt-4">
                <span className="text-[10px] font-bold text-gray-500 block mb-2 font-mono uppercase tracking-wider">// Expert Summary</span>
                <p className="text-gray-400 text-xs leading-relaxed font-sans">
                  Transport layer encryption has transitioned from obsolete SSL protocols to TLS 1.3. A secure configuration requires disabling deprecated cipher suites, installing complete intermediate certificate chains, enabling HSTS, and monitoring expiration dates to prevent downtime.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Differentiation Grid */}
      <section className="py-16 bg-[#0a0d14] border-b border-white/5" aria-label="Feature Differentiation">
        <div className="max-w-[1000px] mx-auto px-6">
          <h2 className="text-2xl font-display font-bold text-white mb-8 text-center">ReconShield Enterprise Analyzer Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 not-prose">
            <div className="p-5 bg-surface-900 border border-white/5 rounded-2xl">
              <Shield className="w-6 h-6 text-cyan-400 mb-3" />
              <h4 className="text-white text-xs font-bold font-mono uppercase tracking-wider mb-2">SSL Security Score</h4>
              <p className="text-gray-400 text-[11px] leading-relaxed">Calculates an overall grading rating (A+ through F) based on protocol support, cipher strengths, and HSTS headers.</p>
            </div>
            <div className="p-5 bg-surface-900 border border-white/5 rounded-2xl">
              <Clock className="w-6 h-6 text-cyan-400 mb-3" />
              <h4 className="text-white text-xs font-bold font-mono uppercase tracking-wider mb-2">Expiry Risk Indicator</h4>
              <p className="text-gray-400 text-[11px] leading-relaxed">Calculates remaining days and displays a color-coded warning alert timeline before browsers throw invalid-date errors.</p>
            </div>
            <div className="p-5 bg-surface-900 border border-white/5 rounded-2xl">
              <Activity className="w-6 h-6 text-cyan-400 mb-3" />
              <h4 className="text-white text-xs font-bold font-mono uppercase tracking-wider mb-2">OCSP Revocation Status</h4>
              <p className="text-gray-400 text-[11px] leading-relaxed">Queries Certificate Authority responders in real-time to check if the certificate has been revoked before expiration.</p>
            </div>
            <div className="p-5 bg-surface-900 border border-white/5 rounded-2xl">
              <Terminal className="w-6 h-6 text-cyan-400 mb-3" />
              <h4 className="text-white text-xs font-bold font-mono uppercase tracking-wider mb-2">HSTS Verification</h4>
              <p className="text-gray-400 text-[11px] leading-relaxed">Checks web server headers to confirm HSTS is active, protecting users from protocol downgrade attacks.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Educational Guide */}
      <div className="bg-[#05080f]">
        
        {/* H2: What Is an SSL Certificate? */}
        <section className="py-20 border-b border-white/5">
          <div className="max-w-[1000px] mx-auto px-6 prose prose-invert max-w-none prose-p:leading-relaxed prose-p:text-gray-400 prose-headings:text-white prose-a:text-cyan-400 hover:prose-a:text-cyan-300">
            
            <h2 className="text-3xl font-display font-bold mt-0 mb-6 flex items-center gap-3">
              <Key className="w-8 h-8 text-cyan-400" />
              What Is an SSL Certificate?
            </h2>
            <p>
              An <strong>SSL (Secure Sockets Layer) certificate</strong> is a digital file installed on a web server that establishes identity and enables cryptographic encryption for data in transit. It binds a cryptographic public key to a organization’s identity or domain name. When a browser visits an HTTPS website, the SSL certificate establishes an encrypted tunnel, ensuring sensitive transactions (like passwords, credit cards, or customer data) are transmitted securely.
            </p>

            {/* H2: How SSL Certificates Work */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">How SSL Certificates Work</h2>
            <p>
              SSL certificates operate within a **Public Key Infrastructure (PKI)** framework. This framework relies on asymmetric cryptography, which uses a mathematically linked key pair:
            </p>
            <ul>
              <li><strong>Public Key:</strong> Shared publicly via the certificate. It is used by the browser to encrypt data sent to the server.</li>
              <li><strong>Private Key:</strong> Kept secure on the web server. It is used by the server to decrypt data encrypted with the public key.</li>
            </ul>
            <p>
              By separating encryption and decryption, PKI allows secure communication without requiring the parties to share a secret key beforehand.
            </p>

            {/* H2: How SSL/TLS Encryption Works */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">How SSL/TLS Encryption Works</h2>
            <p>
              Secure connections are established using the **TLS Handshake** protocol, which negotiates security parameters between the browser (client) and the server:
            </p>
            <div className="space-y-6 my-8 not-prose">
              <div className="relative border-l-2 border-cyan-500/30 pl-6 ml-3 space-y-6">
                <div>
                  <span className="absolute -left-[7px] w-3 h-3 rounded-full bg-cyan-400" />
                  <h5 className="text-white font-bold text-xs font-mono uppercase tracking-wider mb-1">Step 1: Client Hello</h5>
                  <p className="text-xs text-gray-400">The browser sends the server its supported TLS versions, cipher suites, and a random string of bytes.</p>
                </div>
                <div>
                  <span className="absolute -left-[7px] w-3 h-3 rounded-full bg-cyan-400" />
                  <h5 className="text-white font-bold text-xs font-mono uppercase tracking-wider mb-1">Step 2: Server Hello & Certificate Exchange</h5>
                  <p className="text-xs text-gray-400">The server selects the highest mutually supported TLS protocol, chooses a cipher suite, and sends its public SSL certificate.</p>
                </div>
                <div>
                  <span className="absolute -left-[7px] w-3 h-3 rounded-full bg-cyan-400" />
                  <h5 className="text-white font-bold text-xs font-mono uppercase tracking-wider mb-1">Step 3: Trust Chain Verification</h5>
                  <p className="text-xs text-gray-400">The browser verifies the certificate against its preloaded list of trusted root Certificate Authorities (CAs).</p>
                </div>
                <div>
                  <span className="absolute -left-[7px] w-3 h-3 rounded-full bg-cyan-400" />
                  <h5 className="text-white font-bold text-xs font-mono uppercase tracking-wider mb-1">Step 4: Session Key Generation</h5>
                  <p className="text-xs text-gray-400">Both parties generate a symmetric session key. Subsequent traffic is encrypted using this key for faster data transmission.</p>
                </div>
              </div>
            </div>

            {/* H2: How to Check an SSL Certificate */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">How to Check an SSL Certificate</h2>
            <p>
              To check a website's SSL certificate configuration, use the ReconShield SSL Checker tool:
            </p>
            <ol>
              <li>Enter the target domain name in the search input above.</li>
              <li>Click search to initiate a cryptographic audit of the server's TLS parameters.</li>
              <li>Review the certificate health, including the issuer, validity range, expiration timeline, and cipher suite support.</li>
            </ol>

            {/* H2: What Information an SSL Certificate Contains */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">What Information an SSL Certificate Contains</h2>
            <p>
              An SSL certificate conforms to the standard **X.509** format, which structures metadata fields including:
            </p>
            <ul>
              <li><strong>Subject (Common Name):</strong> The domain name secured by the certificate.</li>
              <li><strong>Subject Alternative Names (SAN):</strong> Additional domains or subdomains covered under the same certificate.</li>
              <li><strong>Issuer:</strong> The Certificate Authority (CA) that validated the domain and signed the file.</li>
              <li><strong>Serial Number:</strong> A unique identifier assigned by the CA.</li>
              <li><strong>Validity Period:</strong> The 'Not Before' and 'Not After' timestamps.</li>
              <li><strong>Public Key Signature:</strong> The public key algorithm and signature hash.</li>
            </ul>

            {/* H2: Check SSL Certificate Expiry */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">Check SSL Certificate Expiry</h2>
            <p>
              Under current CA/Browser Forum standards, certificates have a maximum validity period of **398 days** (~13 months). Expiry monitoring is critical: if a certificate expires, browsers will display a security warning, blocking visitors.
            </p>
            <p>
              The ReconShield SSL Checker includes an **Expiration Risk Indicator** that calculates the remaining validity days and flags certificates nearing expiration, helping you prevent outages.
            </p>

            {/* H2: TLS vs SSL */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">TLS vs SSL</h2>
            <p>
              SSL (Secure Sockets Layer) is the older, obsolete security protocol developed by Netscape. Due to cryptographic vulnerabilities, it was succeeded by TLS (Transport Layer Security). While everyone still uses the term 'SSL certificates', all modern network connections negotiate encryption using TLS 1.2 or TLS 1.3 protocols.
            </p>

            {/* H2: TLS Versions Explained */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">TLS Versions Explained</h2>
            <p>
              Server configurations should only support secure TLS protocol versions:
            </p>
            <ul>
              <li><strong>TLS 1.3:</strong> The current standard. It simplifies the handshake process and removes obsolete, weak cryptographic algorithms.</li>
              <li><strong>TLS 1.2:</strong> Secure when configured to use strong cipher suites (e.g., ECDHE key exchanges).</li>
              <li><strong>TLS 1.0 & 1.1:</strong> Obsolete and deprecated. Supporting these versions violates PCI-DSS compliance standards.</li>
            </ul>

            {/* H2: Certificate Chain Validation */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">Certificate Chain Validation</h2>
            <p>
              Browsers verify certificates using a hierarchical **Chain of Trust**:
            </p>
            <ul>
              <li><strong>Root Certificate:</strong> Preloaded trusted certificates maintained by OS and browser vendors.</li>
              <li><strong>Intermediate Certificate:</strong> CAs use intermediate certs to sign website certificates, protecting the root private key from direct exposure.</li>
              <li><strong>Leaf Certificate:</strong> The certificate generated for your specific domain (e.g., `reconshield.in`).</li>
            </ul>
            <p>
              If a web server is misconfigured and fails to supply intermediate certificates, mobile browsers will display trust errors. Running a complete <strong>certificate chain check</strong> helps identify these issues.
            </p>

            {/* H2: Domain Validation (DV) Certificates */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">Domain Validation (DV) Certificates</h2>
            <p>
              Domain Validation is the basic level of SSL validation. The CA only verifies that the applicant controls the target domain name. It is typically automated and issued within minutes, making it ideal for blogs and small websites.
            </p>

            {/* H2: Organization Validation (OV) Certificates */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">Organization Validation (OV) Certificates</h2>
            <p>
              Organization Validation provides a moderate level of trust. The CA verifies the legal existence, physical address, and operational status of the organization before issuing the certificate, which is visible in the certificate details.
            </p>

            {/* H2: Extended Validation (EV) Certificates */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">Extended Validation (EV) Certificates</h2>
            <p>
              Extended Validation provides the highest level of trust. The CA performs strict background checks on the company's legal status and authority, making it the standard choice for financial institutions and enterprise e-commerce platforms.
            </p>

            {/* H2: Wildcard SSL Certificates */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">Wildcard SSL Certificates</h2>
            <p>
              A wildcard SSL certificate secures a root domain and unlimited subdomains under it using a wildcard character (e.g., `*.domain.com`). This simplifies certificate management for multi-subdomain configurations.
            </p>

            {/* H2: Multi-Domain SSL Certificates */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">Multi-Domain SSL Certificates</h2>
            <p>
              A Multi-Domain SSL certificate uses Subject Alternative Names (SAN) to secure multiple distinct domain names (e.g., example.com, test.in, blog.net) under a single cryptographic file, simplifying server administration.
            </p>

            {/* H2: Common SSL Certificate Errors */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">Common SSL Certificate Errors</h2>
            <p>
              When a browser throws a security warning, it typically points to one of these error signatures:
            </p>
            <ul>
              <li><strong>Expired Certificate (ERR_CERT_DATE_INVALID):</strong> The validity date range has passed.</li>
              <li><strong>Name Mismatch (ERR_CERT_COMMON_NAME_INVALID):</strong> The certificate hostname does not match the requested domain name.</li>
              <li><strong>Untrusted CA (ERR_CERT_AUTHORITY_INVALID):</strong> The certificate was self-signed or issued by an untrusted authority.</li>
              <li><strong>Broken Chain:</strong> The server failed to serve intermediate certificates.</li>
            </ul>

            {/* H2: How Security Teams Audit SSL Configurations */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">How Security Teams Audit SSL Configurations</h2>
            <p>
              Security teams run automated scans to audit their attack surface:
            </p>
            <ol>
              <li>Verify that all public web assets serve valid, unexpired certificates.</li>
              <li>Scan port configurations to ensure obsolete TLS 1.0 and 1.1 protocols are disabled.</li>
              <li>Check HSTS headers to ensure secure connections are enforced.</li>
            </ol>

            {/* H2: SSL Security Best Practices */}
            <h2 className="text-3xl font-display font-bold mt-16 mb-6">SSL Security Best Practices</h2>
            <p>
              Secure your website's transport layer by implementing these best practices:
            </p>
            <ul>
              <li>Disable all obsolete protocols, enabling only TLS 1.2 and TLS 1.3.</li>
              <li>Enable HSTS (HTTP Strict Transport Security) to force secure connections.</li>
              <li>Set up automated expiration alerts at least 14 days before expiry.</li>
              <li>Configure CAA records in your DNS zones to restrict certificate issuance to authorized CAs.</li>
            </ul>

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
                  Surendra is an information security analyst specializing in Open Source Intelligence (OSINT), public key infrastructures, and cryptographic transport security. He built ReconShield to help teams identify and patch security gaps across their internet-facing infrastructure.
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
              Last Updated: June 2026 | Reviewed by ReconShield Editorial Board | Reference: CA/Browser Forum Standards, IETF TLS RFCs, NIST TLS Guidance
            </div>
          </div>
        </section>

        {/* Semantic Internal Links (Phase 7 - Internal Linking) */}
        <section className="py-20 bg-[#05080f]" aria-label="Related Security Tools">
          <div className="max-w-[1000px] mx-auto px-6">
            <h2 className="text-3xl font-display font-bold text-white mb-10 text-center">Complete Your Cryptographic Audit</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
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
              <Link href="/tools/subdomain-finder" className="p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-[#00ff88]/30 transition-all group">
                <Globe className="w-8 h-8 text-[#00ff88] mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-white font-bold text-lg mb-2">Subdomain Finder</h4>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">Discover public host records and expose shadow subdomains with our Subdomain Finder.</p>
                <span className="text-[#00ff88] text-xs font-mono flex items-center gap-1">Find Subdomains <ChevronRight className="w-3 h-3"/></span>
              </Link>

              {/* DNS Lookup Link */}
              <Link href="/tools/dns-lookup" className="p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-orange-500/30 transition-all group">
                <Database className="w-8 h-8 text-orange-400 mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-white font-bold text-lg mb-2">DNS Records Auditor</h4>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">Extract and verify authoritative MX, TXT, A, and CAA records to prevent routing configuration gaps using our DNS records auditor.</p>
                <span className="text-orange-400 text-xs font-mono flex items-center gap-1">Audit DNS Records <ChevronRight className="w-3 h-3"/></span>
              </Link>

              {/* Port Scanner Link */}
              <Link href="/tools/port-scanner" className="p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-red-500/30 transition-all group">
                <Terminal className="w-8 h-8 text-red-400 mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-white font-bold text-lg mb-2">Exposed Port Scanner</h4>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">Identify open port states, service tags, and firewall leaks with our Exposed Port Scanner.</p>
                <span className="text-red-500 text-xs font-mono flex items-center gap-1">Scan Ports <ChevronRight className="w-3 h-3"/></span>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 border-t border-white/5 bg-[#0a0d14]" aria-labelledby="faq-title">
          <div className="max-w-[900px] mx-auto px-6">
            <h2 id="faq-title" className="text-3xl font-display font-bold text-white mb-10 text-center">SSL FAQ</h2>
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
