import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Shield, Target, Server, Lock, Terminal, CheckCircle2, ChevronRight, Activity, Network, AlertTriangle, Search, Globe, Key } from 'lucide-react';

const ToolScannerClient = dynamic(() => import('@/components/ToolScannerClient'), {
  loading: () => <div className="min-h-[600px] animate-pulse bg-surface-900/50 rounded-3xl" />
});

export const metadata = {
  title: "SSL Checker & TLS Security Analysis Tool ",
  description: "Free SSL checker and TLS configuration analyzer. Verify SSL certificates, check expiration dates, and test for HTTPS vulnerabilities instantly.",
  alternates: {
    canonical: 'https://reconshield.in/tools/ssl-checker',
  },
  openGraph: {
    title: "SSL Checker & TLS Security Analysis Tool",
    description: "Free SSL checker and TLS configuration analyzer. Verify SSL certificates, check expiration dates, and test for HTTPS vulnerabilities instantly.",
    url: 'https://reconshield.in/tools/ssl-checker',
    type: 'article',
  }
};

export default function SslCheckerPage() {
  const faqs = [
    {
      q: "What is an SSL Checker?",
      a: "An SSL checker is a diagnostic tool that analyzes a website's cryptographic configuration. It verifies if the SSL/TLS certificate is valid, issued by a trusted Certificate Authority (CA), and correctly installed on the web server."
    },
    {
      q: "Why should I use an SSL expiration checker?",
      a: "If your SSL certificate expires, browsers will display a massive, terrifying 'Your connection is not private' warning to users. This destroys user trust and completely breaks your application. An SSL expiration checker helps you monitor validity dates to renew certificates before they lapse."
    },
    {
      q: "What does a TLS configuration analyzer test?",
      a: "Beyond basic certificate validity, a TLS configuration analyzer tests which versions of the TLS protocol (e.g., 1.2, 1.3) are supported and which cipher suites are negotiated. It ensures deprecated, vulnerable protocols like SSLv3, TLS 1.0, and TLS 1.1 are disabled."
    },
    {
      q: "How do SSL certificates work?",
      a: "SSL certificates use public key cryptography. When a browser connects to a server, the server presents its certificate (containing its public key) signed by a trusted authority. The browser verifies this signature, and they negotiate a secure symmetric session key to encrypt all subsequent traffic."
    },
    {
      q: "Can this tool act as an HTTPS vulnerability scanner?",
      a: "Yes. By analyzing the supported protocols and cipher suites, the tool can infer if your server is vulnerable to known cryptographic attacks like POODLE, BEAST, or SWEET32, which rely on weak or outdated encryption standards."
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
                "@id": "https://reconshield.in/tools/ssl-checker#software",
                "name": "ReconShield SSL & TLS Checker",
                "url": "https://reconshield.in/tools/ssl-checker",
                "description": "Enterprise HTTPS security checker and TLS configuration analyzer.",
                "applicationCategory": "SecurityApplication",
                "operatingSystem": "Web",
                "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
              },
              {
                "@type": "BreadcrumbList",
                "@id": "https://reconshield.in/tools/ssl-checker#breadcrumb",
                "itemListElement": [
                  { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://reconshield.in" },
                  { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://reconshield.in/tools" },
                  { "@type": "ListItem", "position": 3, "name": "SSL Checker", "item": "https://reconshield.in/tools/ssl-checker" }
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
            ]
          })
        }}
      />

      {/* 1. Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[#0a0d14] -z-20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-purple-500/5 blur-[100px] rounded-full pointer-events-none -z-10" />
        
        <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-center animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-900 border border-white/10 text-gray-400 text-xs font-mono uppercase tracking-widest mb-6 shadow-sm">
            <Key className="w-4 h-4 text-purple-400" />
            <span>Cryptographic Analysis Module</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">SSL Checker</span> & TLS Security Analysis
          </h1>
          
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Perform a deep cryptographic audit with our <strong>TLS configuration analyzer</strong>. Verify certificate chains, detect weak cipher suites, and utilize the <strong>SSL expiration checker</strong> to prevent HTTPS downtime.
          </p>

          <div className="max-w-4xl mx-auto mb-12">
            <ToolScannerClient 
              toolId="ssl-checker" 
              title="HTTPS Security Scanner" 
              desc="Enter a domain to initiate a comprehensive SSL/TLS cryptographic audit." 
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-gray-500 uppercase tracking-widest">
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400" /> Certificate Chain Audit</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400" /> Cipher Suite Analysis</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400" /> Expiry Monitoring</div>
          </div>
        </div>
      </section>

      {/* SEO Content Silo Container */}
      <div className="bg-[#05080f]">
        
        {/* 2. What Is SSL/TLS? & 3. How Certificates Work */}
        <section className="py-20 border-b border-white/5">
          <div className="max-w-[900px] mx-auto px-6 prose prose-invert max-w-none prose-p:leading-relaxed prose-p:text-gray-400 prose-headings:text-white prose-a:text-purple-400 hover:prose-a:text-purple-300">
            
            <h2 className="text-3xl font-display font-bold mt-0 mb-6 flex items-center gap-3">
              <Lock className="w-8 h-8 text-purple-400" />
              What Is SSL/TLS?
            </h2>
            <p>
              Secure Sockets Layer (SSL) and its modern successor, Transport Layer Security (TLS), are cryptographic protocols designed to provide communications security over a computer network. When you visit an HTTPS website, these protocols encrypt the data transmitted between your browser and the server, preventing Man-in-the-Middle (MitM) attacks. An <strong>HTTPS security checker</strong> evaluates the implementation of these protocols to ensure data privacy and integrity.
            </p>
            <p>
              By utilizing an <strong>SSL certificate checker</strong>, organizations can map out their cryptographic attack surface, identifying deprecated protocols that put sensitive user data at risk.
            </p>

            <h2 className="text-3xl font-display font-bold mt-16 mb-6 flex items-center gap-3">
              <Key className="w-8 h-8 text-pink-400" />
              How SSL Certificates Work
            </h2>
            <p>
              At the core of an HTTPS connection is the SSL certificate. This digital file binds a cryptographic key to an organization's details. It is digitally signed by a trusted third party known as a Certificate Authority (CA), such as Let's Encrypt or DigiCert. Our <strong>SSL checker</strong> interrogates this certificate to verify its chain of trust. If a server presents a self-signed certificate, or if the root CA is not in the browser's trust store, the connection will be flagged as insecure.
            </p>

          </div>
        </section>

        {/* 4. TLS Handshake & 5. Common Vulnerabilities */}
        <section className="py-20 bg-[#0a0d14] border-b border-white/5">
          <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            <div className="prose prose-invert max-w-none prose-p:text-gray-400">
              <h2 className="text-3xl font-display font-bold text-white mb-6">The TLS Handshake Explained</h2>
              <p>
                Before encrypted data can flow, the client and server must perform a TLS handshake. This process involves:
              </p>
              <ol>
                <li><strong>Client Hello:</strong> The browser sends supported TLS versions and cipher suites.</li>
                <li><strong>Server Hello:</strong> The server chooses the strongest mutually supported cipher suite and sends its certificate.</li>
                <li><strong>Authentication:</strong> The client verifies the certificate using its trusted root store.</li>
                <li><strong>Key Exchange:</strong> A secure symmetric session key is generated for the connection.</li>
              </ol>

              <h3 className="text-xl text-white font-bold mt-8 mb-4">Common SSL/TLS Vulnerabilities</h3>
              <p>
                A <strong>TLS configuration analyzer</strong> is critical because simply having an SSL certificate is not enough. If your server supports legacy protocols (like SSLv3 or TLS 1.0) or weak ciphers (like RC4 or DES), attackers can force a protocol downgrade and decrypt the traffic. Our tool acts as an <strong>HTTPS vulnerability scanner</strong>, identifying misconfigurations that lead to attacks such as POODLE, BEAST, or CRIME.
              </p>
            </div>

            {/* Core Threats Focus Card */}
            <div className="bg-surface-900 border border-white/10 rounded-3xl p-8 shadow-2xl">
              <h3 className="text-xl font-display font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-purple-500" /> Cryptographic Weaknesses
              </h3>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0">
                    <Target className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Deprecated Protocols</h4>
                    <p className="text-sm text-gray-400">Supporting SSLv2, SSLv3, TLS 1.0, or TLS 1.1 exposes traffic to known cryptographic breaks. Only TLS 1.2 and 1.3 should be enabled.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0">
                    <Network className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Weak Cipher Suites</h4>
                    <p className="text-sm text-gray-400">Our <strong>TLS checker</strong> looks for the presence of export-grade ciphers, RC4, or null ciphers that provide zero encryption integrity.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                    <Activity className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Broken Trust Chains</h4>
                    <p className="text-sm text-gray-400">Failing to serve the intermediate certificate alongside the entity certificate will cause browsers on mobile devices to reject the connection.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 6. Best Practices & 7. Expiry & 8. Use Cases & 9. Tutorial */}
        <section className="py-20 border-b border-white/5">
          <div className="max-w-[900px] mx-auto px-6 prose prose-invert max-w-none prose-p:text-gray-400">
            
            <h2 className="text-3xl font-display font-bold text-white mb-6">SSL Expiration Monitoring</h2>
            <p>
              Modern certificates (like those from Let's Encrypt) typically have a maximum lifespan of 90 days. Forgetting to renew them is a common cause of catastrophic site outages. Using an <strong>SSL expiration checker</strong> allows DevOps teams to integrate proactive monitoring into their pipelines, ensuring automation scripts (like Certbot) are functioning correctly before the certificate lapses.
            </p>

            <h2 className="text-3xl font-display font-bold text-white mt-16 mb-8">Real-World Security Use Cases</h2>
            <ul>
              <li><strong>E-Commerce Compliance:</strong> PCI-DSS compliance strictly requires robust encryption. Payment gateways use our <strong>HTTPS security checker</strong> to ensure customer data cannot be intercepted.</li>
              <li><strong>SEO Rankings:</strong> Google directly uses HTTPS as a ranking signal. A broken certificate or weak TLS configuration can plummet a domain's organic search visibility.</li>
              <li><strong>Infrastructure Audits:</strong> Penetration testers analyze cipher suites during the reconnaissance phase to find weak cryptographic implementations for exploitation.</li>
            </ul>

            <h2 className="text-3xl font-display font-bold text-white mt-16 mb-8">Step-by-Step Tutorial: Analyzing an SSL Certificate</h2>
            <div className="bg-[#0d1117] border border-[#1a2332] rounded-2xl p-6 mb-12">
              <ol className="list-decimal list-inside space-y-4 text-gray-300">
                <li><strong>Enter the Target Domain:</strong> Input your application URL (e.g., `example.com`) into the ReconShield terminal.</li>
                <li><strong>Initiate Cryptographic Audit:</strong> Click scan to trigger a remote TLS handshake from our servers.</li>
                <li><strong>Verify Certificate Validity:</strong> Ensure the `Valid From` and `Valid To` dates show the certificate is active.</li>
                <li><strong>Check the Issuer:</strong> Confirm the certificate was signed by a recognized Certificate Authority.</li>
                <li><strong>Analyze the Handshake:</strong> Review the negotiated protocol (aim for TLS 1.3) and ensure no weak ciphers are supported.</li>
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
              <div className="w-24 h-24 rounded-full bg-[#1a2332] border-2 border-purple-500/30 flex items-center justify-center shrink-0 overflow-hidden">
                <Key className="w-10 h-10 text-purple-400" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 px-2 py-1 rounded bg-purple-500/10 text-purple-400 text-[10px] font-mono uppercase tracking-widest mb-2">
                  <CheckCircle2 className="w-3 h-3" /> Fact Checked & Verified
                </div>
                <h4 className="text-white font-bold text-xl mb-1">Surendra Reddy</h4>
                <p className="text-gray-400 text-xs font-mono uppercase tracking-wider mb-3">Cybersecurity Researcher & Founder, ReconShield</p>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  Surendra is a cybersecurity engineer specializing in Open Source Intelligence (OSINT), vulnerability intelligence, and AI-driven threat analysis. He built ReconShield to democratize access to enterprise-grade reconnaissance tools and secure the digital attack surface.
                </p>
                <div className="flex gap-6 text-sm font-mono">
                  <a href="https://linkedin.com/in/surendrareddy3" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 flex items-center gap-1">LinkedIn <ChevronRight className="w-3 h-3"/></a>
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
              <h2 className="font-mono text-xs tracking-[4px] uppercase text-purple-400 font-bold">// EXPLORE RELATED CRYPTO TOOLS</h2>
              <div className="h-[1px] flex-1 bg-[#1a2332]" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/tools/http-headers" className="p-6 bg-surface-900 border border-white/5 hover:border-purple-500/30 rounded-2xl group transition-all">
                <Shield className="w-6 h-6 text-purple-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-white font-bold mb-2 group-hover:text-purple-400 transition-colors">Security Headers Analyzer</h3>
                <p className="text-xs text-gray-400">Ensure your server is enforcing HSTS (Strict-Transport-Security) to prevent downgrade attacks.</p>
              </Link>

              <Link href="/tools/vulnerability-scanner" className="p-6 bg-surface-900 border border-white/5 hover:border-purple-500/30 rounded-2xl group transition-all">
                <Activity className="w-6 h-6 text-purple-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-white font-bold mb-2 group-hover:text-purple-400 transition-colors">Website Vulnerability Scanner</h3>
                <p className="text-xs text-gray-400">Perform a comprehensive passive audit of the entire domain, including port and header analysis.</p>
              </Link>

              <Link href="/tools/dns-lookup" className="p-6 bg-surface-900 border border-white/5 hover:border-purple-500/30 rounded-2xl group transition-all">
                <Network className="w-6 h-6 text-purple-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-white font-bold mb-2 group-hover:text-purple-400 transition-colors">DNS Intelligence</h3>
                <p className="text-xs text-gray-400">Verify the routing infrastructure behind the domain and analyze SPF/DMARC policies.</p>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
