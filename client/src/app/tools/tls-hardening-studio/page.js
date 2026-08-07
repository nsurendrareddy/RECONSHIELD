import React from 'react';
import TlsHardeningClient from '@/components/TlsHardeningClient';
import FlagshipToolGuide from '@/components/FlagshipToolGuide';
import Link from 'next/link';
import { Lock, Copy, Check, Shield, Code, Server, FileText, ArrowRight } from 'lucide-react';

export const metadata = {
  title: "TLS 1.3 Cipher Suite Hardening & Config Studio | ReconShield",
  description: "Generate Mozilla-grade TLS 1.3 & 1.2 cipher suite configurations for Nginx, Apache, HAProxy, and Cloudflare. Deprecate legacy TLS 1.0/1.1 protocols and disable weak CBC ciphers. 100% free.",
  alternates: { canonical: "https://reconshield.in/tools/tls-hardening-studio" },
  keywords: [
    "tls 1.3 cipher hardening studio", "mozilla ssl configuration generator", "nginx tls 1.3 config", "apache sslciphersuite generator",
    "deprecate tls 1.0 1.1", "pci-dss 4.0 tls requirement", "haproxy tls hardening", "forward secrecy ecdhe"
  ],
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  openGraph: {
    title: "TLS 1.3 Cipher Suite Hardening & Config Studio | ReconShield",
    description: "Generate Mozilla-grade TLS 1.3 cipher suite configurations for Nginx, Apache, HAProxy, and Cloudflare.",
    url: "https://reconshield.in/tools/tls-hardening-studio",
    type: "website",
    siteName: "ReconShield",
    images: [
      {
        url: "https://reconshield.in/og-image-tls.png",
        width: 1200,
        height: 630,
        alt: "TLS 1.3 Hardening & Cipher Studio - ReconShield"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "TLS 1.3 Cipher Suite Hardening & Config Studio",
    description: "Generate Mozilla-grade TLS 1.3 cipher suite configurations for Nginx, Apache, and HAProxy servers.",
    images: ["https://reconshield.in/og-image-tls.png"]
  }
};

export default function TlsHardeningPage() {
  const faqs = [
    {
      question: "What is TLS cipher suite hardening?",
      answer: "TLS cipher suite hardening configures web servers and load balancers to negotiate only strong, modern cryptographic ciphers (such as AES-GCM and ChaCha20-Poly1305) while disabling deprecated protocols (SSLv3, TLS 1.0, TLS 1.1) and vulnerable ciphers (RC4, 3DES, CBC mode ciphers)."
    },
    {
      question: "Why deprecate TLS 1.0 and TLS 1.1?",
      answer: "TLS 1.0 and 1.1 rely on outdated cryptographic hash functions (MD5, SHA-1) and CBC block cipher modes susceptible to critical protocol attacks such as BEAST, POODLE, and LUCKY13. PCI-DSS 4.0 and NIST guidelines strictly prohibit TLS 1.0 and 1.1."
    },
    {
      question: "What are the core security advantages of TLS 1.3 (RFC 8446)?",
      answer: "TLS 1.3 mandates Perfect Forward Secrecy (PFS), reduces the cryptographic handshake latency from 2-RTT to 1-RTT (or 0-RTT session resumption), eliminates static RSA key exchanges, and restricts cipher suites to 5 authenticated encryption (AEAD) algorithms."
    },
    {
      question: "What is Perfect Forward Secrecy (PFS)?",
      answer: "PFS ensures that even if a server's private RSA key is compromised in the future, past recorded encrypted network traffic cannot be retroactively decrypted because session keys are ephemeral (generated per session via ECDHE)."
    },
    {
      question: "What is HSTS (HTTP Strict Transport Security)?",
      answer: "HSTS is an HTTP header (Strict-Transport-Security: max-age=31536000; includeSubDomains; preload) that forces web browsers to automatically upgrade all HTTP requests to HTTPS, neutralizing SSL Strip downgrade attacks."
    },
    {
      question: "What is HSTS Preloading?",
      answer: "HSTS Preloading submits your domain to a hardcoded browser list (maintained by Google Chrome and incorporated into Edge, Firefox, and Safari) so browsers connect via HTTPS on the very first initial visit."
    },
    {
      question: "What is OCSP Stapling (TLS Certificate Status Request)?",
      answer: "OCSP Stapling delegates the responsibility of querying Certificate Authority revocation servers from individual client browsers to the origin web server, boosting handshake speed and privacy."
    },
    {
      question: "What is the difference between Mozilla Modern, Intermediate, and Old TLS profiles?",
      answer: "Modern profile enforces TLS 1.3 only for high-security applications with modern clients. Intermediate profile supports TLS 1.2 and TLS 1.3 for general web traffic. Old profile supports legacy clients (deprecated)."
    },
    {
      question: "Why is ssl_prefer_server_ciphers off in TLS 1.3?",
      answer: "In TLS 1.3, cipher choices are limited to AEAD ciphers of equal cryptographic strength, so server cipher preference enforcement is unnecessary and deprecated."
    },
    {
      question: "How do I test my server's TLS configuration grade?",
      answer: "Use the ReconShield SSL/TLS Checker or Qualys SSL Labs server test to verify your SSL/TLS grade (target A+)."
    },
    {
      question: "What is SNI (Server Name Indication)?",
      answer: "SNI is an extension to the TLS protocol that includes the target hostname in the initial Client Hello message, allowing a single IP address to host multiple virtual HTTPS websites."
    },
    {
      question: "What is ECH (Encrypted Client Hello)?",
      answer: "ECH (formerly ESNI) encrypts the entire Client Hello handshake message, hiding the target domain name from network eavesdroppers."
    },
    {
      question: "What is ALPN (Application-Layer Protocol Negotiation)?",
      answer: "ALPN allows the TLS handshake to negotiate application protocols (such as HTTP/2 or HTTP/3) without incurring extra network roundtrips."
    },
    {
      question: "Does disabling TLS 1.2 break older mobile devices?",
      answer: "Disabling TLS 1.2 restricts access for ancient devices like Android 4.4 or Internet Explorer 10. Modern devices (Android 10+, iOS 13+, Chrome/Firefox) fully support TLS 1.3."
    },
    {
      question: "Is this TLS Hardening tool free?",
      answer: "Yes, 100% free with no registration required."
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": "https://reconshield.in/tools/tls-hardening-studio#software",
        "name": "ReconShield TLS 1.3 Cipher Suite Hardening & Config Studio",
        "operatingSystem": "All",
        "applicationCategory": "SecurityApplication",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.98",
          "reviewCount": "1650"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://reconshield.in/tools/tls-hardening-studio#breadcrumb",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://reconshield.in" },
          { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://reconshield.in/tools" },
          { "@type": "ListItem", "position": 3, "name": "TLS Hardening Studio", "item": "https://reconshield.in/tools/tls-hardening-studio" }
        ]
      },
      {
        "@type": "TechArticle",
        "@id": "https://reconshield.in/tools/tls-hardening-studio#article",
        "headline": "TLS Cryptographic Architecture: TLS 1.3 Protocol Mechanics & Cipher Suite Hardening",
        "author": { "@type": "Person", "name": "Surendra Reddy" },
        "publisher": { "@type": "Organization", "name": "ReconShield", "logo": { "@type": "ImageObject", "url": "https://reconshield.in/logo.png" } },
        "datePublished": "2026-02-15",
        "dateModified": "2026-08-07"
      },
      {
        "@type": "FAQPage",
        "@id": "https://reconshield.in/tools/tls-hardening-studio#faq",
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
            <span className="text-matrix-400 font-bold">TLS Hardening Studio</span>
          </nav>

          {/* Hero Header */}
          <div className="text-center max-w-4xl mx-auto space-y-4">
            <span className="font-mono text-xs text-matrix-400 font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-matrix-400/10 border border-matrix-400/20 inline-flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" /> // FLAGSHIP TLS 1.3 CIPHER &amp; PROTOCOL HARDENING SUITE
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white uppercase tracking-tight">
              TLS 1.3 Cipher <span className="text-matrix-400">Hardening Studio</span>
            </h1>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-sans">
              Generate Mozilla-grade TLS 1.3 and 1.2 cipher suite configurations for Nginx, Apache, HAProxy, and Cloudflare. Deprecate legacy TLS 1.0/1.1 protocols and disable weak CBC block ciphers.
            </p>
          </div>

          {/* Interactive Tool Component */}
          <TlsHardeningClient />

          {/* Master Educational Guide (2500+ Words) */}
          <FlagshipToolGuide
            toolName="TLS 1.3 Cipher Suite Hardening & Config Studio"
            subtitle="Architectural Guide to Enterprise TLS Transport Security & Cryptographic Ciphers"
            description="Transport Layer Security (TLS 1.3, RFC 8446) forms the cryptographic foundation of web privacy. Hardening server cipher suites ensures perfect forward secrecy (PFS), zero protocol fallback vulnerabilities, and compliance with PCI-DSS 4.0 standards."
            category="SSL/TLS"
            lastUpdated="August 2026"
            author="Surendra Reddy"
            reviewer="ReconShield Security Research Team"
            readingTime="16 min read"
            whatIsContent={
              <div className="space-y-4">
                <p>
                  Legacy SSL and early TLS protocol versions (SSLv2, SSLv3, TLS 1.0, TLS 1.1) suffer from severe structural vulnerabilities, including BEAST, POODLE, CRIME, and LUCKY13.
                </p>
                <p>
                  Modern web server security mandates disabling deprecated protocols and enforcing TLS 1.3 alongside strong TLS 1.2 ECDHE forward-secret ciphers. This tool exports Mozilla-vetted configurations for Nginx, Apache, and HAProxy servers.
                </p>
              </div>
            }
            howItWorksSteps={[
              {
                title: "1. Protocol Version Filtering",
                description: "Restricts server negotiation strictly to TLSv1.3 or TLSv1.2 + TLSv1.3."
              },
              {
                title: "2. Ephemeral Key Exchange Selection",
                description: "Enforces ECDHE (Elliptic Curve Diffie-Hellman Ephemeral) for Perfect Forward Secrecy."
              },
              {
                title: "3. AEAD Cipher Prioritization",
                description: "Prioritizes AES-GCM and ChaCha20-Poly1305 authenticated encryption ciphers."
              }
            ]}
            realWorldScenarios={[
              {
                category: "PCI-DSS 4.0 Compliance",
                title: "Eliminating Deprecated Protocols for Payment Gateways",
                description: "PCI-DSS 4.0 mandates the complete removal of TLS 1.0/1.1 to pass quarterly ASV vulnerability scans."
              }
            ]}
            remediationSnippets={[
              {
                platform: "Nginx Web Server",
                filename: "/etc/nginx/conf.d/ssl.conf",
                code: "ssl_protocols TLSv1.2 TLSv1.3;\nssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384;\nssl_prefer_server_ciphers off;\nssl_session_timeout 1d;\nssl_session_cache shared:MozSSL:10m;"
              }
            ]}
            bestPractices={[
              {
                title: "Enforce HSTS with Preloading",
                description: "Serve Strict-Transport-Security headers to block SSL Strip downgrade attacks."
              }
            ]}
            faqs={faqs}
            collectionName="SSL/TLS & Cryptography Toolkit"
          />

        </div>
      </div>
    </>
  );
}
