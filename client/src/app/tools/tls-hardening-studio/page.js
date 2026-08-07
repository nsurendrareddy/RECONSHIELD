import React from 'react';
import TlsHardeningClient from '@/components/TlsHardeningClient';
import FlagshipToolGuide from '@/components/FlagshipToolGuide';

export const metadata = {
  title: "TLS Cipher Hardening & Config Studio | ReconShield",
  description: "Generate secure TLS 1.3 and 1.2 cipher configuration rules for Nginx, Apache, HAProxy, and Cloudflare based on Mozilla baselines. 100% free.",
  alternates: { canonical: "https://reconshield.in/tools/tls-hardening-studio" },
  keywords: ["tls cipher hardening", "nginx ssl config generator", "mozilla tls config builder"]
};

export default function TlsHardeningPage() {
  const faqs = [
    { question: "What is TLS Hardening?", answer: "TLS hardening configures web servers to restrict allowed SSL/TLS protocol versions (disabling SSLv3, TLS 1.0, and TLS 1.1) and enforce strong cryptographic cipher suites with Perfect Forward Secrecy (PFS)." },
    { question: "Why disable TLS 1.0 and TLS 1.1?", answer: "TLS 1.0 and 1.1 rely on weak SHA-1 and MD5 hashes and are vulnerable to cryptographic attacks like BEAST and POODLE. PCI-DSS mandates disabling TLS 1.0/1.1." },
    { question: "What is Perfect Forward Secrecy (PFS)?", answer: "PFS ensures that even if a server's private key is compromised in the future, past recorded encrypted session traffic cannot be decrypted. Diffie-Hellman Ephemeral (ECDHE) key exchange provides PFS." },
    { question: "What is the Mozilla Modern SSL Profile?", answer: "Mozilla's Modern SSL profile mandates TLS 1.3 exclusively, providing maximum security for modern web browsers." },
    { question: "What is the Mozilla Intermediate SSL Profile?", answer: "Mozilla's Intermediate profile allows both TLS 1.2 and TLS 1.3, providing strong security while maintaining compatibility with legacy browsers and operating systems." },
    { question: "What is HSTS (HTTP Strict Transport Security)?", answer: "HSTS is an HTTP header (Strict-Transport-Security) that instructs browsers to interact with the site exclusively over HTTPS connections, preventing SSL-stripping attacks." },
    { question: "What is OCSP Stapling?", answer: "OCSP Stapling allows the web server to query the Certificate Authority's OCSP responder and staple the signed timestamped response directly to the TLS handshake, improving speed and privacy." },
    { question: "What is ALPN in TLS?", answer: "Application-Layer Protocol Negotiation (ALPN) allows the client and server to negotiate whether to use HTTP/2 or HTTP/3 during the TLS handshake." },
    { question: "What is TLS 1.3 0-RTT Early Data risk?", answer: "TLS 1.3 0-RTT allows clients to send application data on the first flight, but early data is susceptible to replay attacks if not restricted to idempotent GET requests." },
    { question: "How to enable TLS 1.3 in Nginx?", answer: "Ensure Nginx is compiled with OpenSSL 1.1.1+ and set ssl_protocols TLSv1.2 TLSv1.3; in server block." },
    { question: "What is Session Resumption (TLS Session Tickets)?", answer: "Session tickets allow clients and servers to resume previous TLS sessions without repeating expensive public key handshakes." },
    { question: "What is ChaCha20-Poly1305 cipher?", answer: "An ultra-fast stream cipher with authenticated encryption, optimized for mobile devices without hardware AES acceleration." },
    { question: "What is SNI (Server Name Indication)?", answer: "SNI includes the requested hostname in the initial TLS ClientHello message, allowing a single IP address to host multiple secure HTTPS domains." },
    { question: "What is Encrypted Client Hello (ECH)?", answer: "ECH (formerly ESNI) encrypts the entire ClientHello message including SNI, preventing ISPs and network observers from snooping visited domain names." },
    { question: "How to test server SSL/TLS grade?", answer: "Use ReconShield SSL Checker or Qualys SSL Labs to verify grade A+ configuration." }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "ReconShield TLS Hardening Studio",
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
              // SSL / TLS CRYPTOGRAPHIC HARDENING
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white uppercase tracking-tight">
              TLS Cipher <span className="text-matrix-400">Hardening Studio</span>
            </h1>
            <p className="text-gray-400 text-sm sm:text-base font-sans leading-relaxed">
              Construct Mozilla-compliant TLS 1.2 and 1.3 web server encryption configurations.
            </p>
          </div>

          <TlsHardeningClient />

          <FlagshipToolGuide
            toolName="TLS Cipher Hardening & Encryption Studio"
            subtitle="Mozilla Cryptographic Baseline Generator & SSL Configuration Utility"
            description="Transport Layer Security (TLS) forms the foundation of internet privacy and trust. Misconfigured cipher suites or enabling outdated TLS 1.0/1.1 protocols expose enterprise traffic to eavesdropping and MITM attacks."
            category="SSL/TLS"
            whatIsContent={
              <p>
                Modern HTTPS deployments must mandate TLS 1.2+ with Authenticated Encryption with Associated Data (AEAD) ciphers (AES-GCM, ChaCha20-Poly1305) and Elliptic Curve Diffie-Hellman (ECDHE) key exchange to guarantee Perfect Forward Secrecy.
              </p>
            }
            howItWorksSteps={[
              { title: "Protocol Enforcement", description: "Configures ssl_protocols to mandate TLS 1.2 and TLS 1.3." },
              { title: "AEAD Cipher Selection", description: "Restricts ciphers to ECDHE-ECDSA-AES128-GCM-SHA256 and AES256 variants." }
            ]}
            bestPractices={[
              { title: "Enable OCSP Stapling", description: "Set ssl_stapling on; to improve handshake performance and protect user privacy." }
            ]}
            faqs={faqs}
          />
        </div>
      </div>
    </>
  );
}
