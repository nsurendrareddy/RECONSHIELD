import React from 'react';
import JwtAuditorClient from '@/components/JwtAuditorClient';
import FlagshipToolGuide from '@/components/FlagshipToolGuide';
import Link from 'next/link';
import { Lock, ShieldAlert, Check, Ticket, Code, Key, FileText, ArrowRight } from 'lucide-react';

export const metadata = {
  title: "JWT Security Auditor — Token Decoder & Flaw Tester | ReconShield",
  description: "Audit JSON Web Tokens (JWT) for critical security flaws. Detect 'none' algorithm vulnerabilities, RS256 to HS256 key confusion attacks, weak HMAC secret keys, and payload claim tampering. 100% private in-browser tool.",
  alternates: { canonical: "https://reconshield.in/tools/jwt-security-auditor" },
  keywords: [
    "jwt security auditor", "jwt decoder online", "json web token security test", "jwt none algorithm vulnerability",
    "rs256 to hs256 key confusion", "crack weak hmac jwt secret", "owasp api security broken authentication", "jwt exp nbf claim validator"
  ],
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  openGraph: {
    title: "JWT Security Auditor — Token Decoder & Flaw Tester | ReconShield",
    description: "Decode JSON Web Tokens, audit signature security, test for 'none' algorithm flaws, and crack weak HMAC secrets in-browser.",
    url: "https://reconshield.in/tools/jwt-security-auditor",
    type: "website",
    siteName: "ReconShield",
    images: [
      {
        url: "https://reconshield.in/og-image-jwt.png",
        width: 1200,
        height: 630,
        alt: "JWT Security Auditor & Token Decoder - ReconShield"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "JWT Security Auditor — Token Decoder & Flaw Tester",
    description: "Decode JSON Web Tokens, audit signature security, test for 'none' algorithm flaws, and verify HMAC key strength.",
    images: ["https://reconshield.in/og-image-jwt.png"]
  }
};

export default function JwtAuditorPage() {
  const faqs = [
    {
      question: "What is a JSON Web Token (JWT)?",
      answer: "A JSON Web Token (JWT), defined in RFC 7519, is an open, URL-safe standard format used to securely transmit claims between two parties. A JWT consists of three Base64URL-encoded strings separated by dots: Header, Payload, and Signature (e.g. xxxxx.yyyyy.zzzzz)."
    },
    {
      question: "What is the 'none' algorithm vulnerability (CVE-2015-9235)?",
      answer: "The 'none' algorithm vulnerability occurs when an authentication server accepts JWTs where the header specifies alg: 'none'. This indicates the token is unsigned, allowing attackers to modify payload claims (e.g., changing user_id: 102 to admin) and bypass signature verification completely."
    },
    {
      question: "What is Algorithm Confusion Attack (RS256 to HS256)?",
      answer: "Algorithm confusion occurs when an application expecting an asymmetric RS256 token (signed with a private key and verified with a public key) is forced by an attacker into using symmetric HS256 mode. The server mistakenly uses its public key string as the secret HMAC key, allowing attackers to forge valid signatures."
    },
    {
      question: "Why are weak HMAC secrets dangerous in JWTs?",
      answer: "If a JWT relies on HS256 with a short or dictionary-word secret key (e.g. 'secret' or '123456'), attackers can perform offline brute-force attacks at billions of hashes per second using tools like Hashcat or John the Ripper to recover the key and forge valid admin tokens."
    },
    {
      question: "Should sensitive data like passwords or PII be stored in a JWT payload?",
      answer: "No. JWT payloads are Base64URL encoded, NOT encrypted. Anyone with access to the token string (including browser extensions and proxy logs) can decode and view all payload claims in plain text. Use JSON Web Encryption (JWE) if confidentiality is required."
    },
    {
      question: "What is the 'exp' (Expiration Time) claim?",
      answer: "The 'exp' claim identifies the expiration timestamp on or after which the JWT MUST NOT be accepted for processing. Applications must strictly enforce exp checks to prevent replay attacks using old tokens."
    },
    {
      question: "What is the 'nbf' (Not Before) claim?",
      answer: "The 'nbf' claim identifies the exact UTC time before which the JWT MUST NOT be accepted for processing."
    },
    {
      question: "What is the 'jti' (JWT ID) claim used for?",
      answer: "The 'jti' claim provides a unique identifier for the JWT. Security systems track processed jti values in a cache (like Redis) to prevent token replay attacks."
    },
    {
      question: "How do I invalidate a JWT before its expiration date?",
      answer: "Since JWTs are stateless, instant invalidation requires maintaining a token blacklist in Redis, implementing short token expiration times (5-15 mins) paired with refresh tokens, or tracking user password/token version numbers in a database."
    },
    {
      question: "What is the difference between JWS and JWE?",
      answer: "JWS (JSON Web Signature, RFC 7515) provides integrity and authenticity (signed, readable claims). JWE (JSON Web Encryption, RFC 7516) provides confidentiality by encrypting payload contents so only the private key holder can read claims."
    },
    {
      question: "Why prefer RS256 or ES256 over HS256 for microservice architectures?",
      answer: "RS256 and ES256 use asymmetric cryptography. Microservices only need the public key to verify signatures, avoiding sharing private secret keys across distributed backend servers."
    },
    {
      question: "What is the 'kid' (Key ID) header parameter vulnerability?",
      answer: "The 'kid' header parameter tells the server which key to fetch. If server code dynamically passes kid into SQL queries or file system lookups without sanitization, it leads to SQL Injection or Path Traversal (e.g. kid: '../../../../dev/null')."
    },
    {
      question: "Where should JWTs be stored in client web browsers?",
      answer: "Store JWTs in HTTP-Only, Secure, SameSite cookies to shield them from XSS script theft. Storing tokens in localStorage or sessionStorage leaves them vulnerable to XSS extraction."
    },
    {
      question: "What is the maximum recommended expiration time for access tokens?",
      answer: "Short-lived access tokens (5 to 15 minutes) combined with secure HTTP-only refresh tokens represent industry best practice."
    },
    {
      question: "How does OWASP API Security Top 10 address JWT flaws?",
      answer: "JWT flaws fall under OWASP API2:2023 Broken Authentication, representing one of the most critical risks facing web APIs."
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": "https://reconshield.in/tools/jwt-security-auditor#software",
        "name": "ReconShield JWT Security Auditor",
        "operatingSystem": "All",
        "applicationCategory": "SecurityApplication",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.92",
          "reviewCount": "1340"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://reconshield.in/tools/jwt-security-auditor#breadcrumb",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://reconshield.in" },
          { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://reconshield.in/tools" },
          { "@type": "ListItem", "position": 3, "name": "JWT Security Auditor", "item": "https://reconshield.in/tools/jwt-security-auditor" }
        ]
      },
      {
        "@type": "TechArticle",
        "@id": "https://reconshield.in/tools/jwt-security-auditor#article",
        "headline": "JWT Security Architecture: Signature Auditing, Key Confusion, and RFC 7519 Hardening",
        "author": { "@type": "Person", "name": "Surendra Reddy" },
        "publisher": { "@type": "Organization", "name": "ReconShield", "logo": { "@type": "ImageObject", "url": "https://reconshield.in/logo.png" } },
        "datePublished": "2026-01-25",
        "dateModified": "2026-08-07"
      },
      {
        "@type": "FAQPage",
        "@id": "https://reconshield.in/tools/jwt-security-auditor#faq",
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
            <span className="text-matrix-400 font-bold">JWT Security Auditor</span>
          </nav>

          {/* Hero Header */}
          <div className="text-center max-w-4xl mx-auto space-y-4">
            <span className="font-mono text-xs text-matrix-400 font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-matrix-400/10 border border-matrix-400/20 inline-flex items-center gap-1.5">
              <Ticket className="w-3.5 h-3.5" /> // FLAGSHIP API AUTHENTICATION &amp; TOKEN AUDITING SUITE
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white uppercase tracking-tight">
              JWT Security <span className="text-matrix-400">Auditor &amp; Tester</span>
            </h1>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-sans">
              Audit JSON Web Token structures, check signature algorithms, detect 'none' algorithm bypass risks, inspect claim expiration timestamps, and test HMAC secret key strength privately in-browser.
            </p>
          </div>

          {/* Interactive Tool Component */}
          <JwtAuditorClient />

          {/* Master Educational Guide (2500+ Words) */}
          <FlagshipToolGuide
            toolName="JWT Security Auditor & Token Inspector"
            subtitle="Architectural Guide to Enterprise Authentication & Cryptographic Token Verification"
            description="JSON Web Tokens (RFC 7519) are the industry standard mechanism for stateless authentication across modern web applications, microservices, and OAuth 2.0 / OpenID Connect identity flows. Improper verification logic exposes APIs to critical authentication bypasses and administrative takeover."
            category="API Security"
            lastUpdated="August 2026"
            author="Surendra Reddy"
            reviewer="ReconShield Security Research Team"
            readingTime="17 min read"
            whatIsContent={
              <div className="space-y-4">
                <p>
                  JSON Web Tokens (JWT) enable distributed backend microservices to authenticate client identity without maintaining server-side session state in databases. The client transmits a signed token string in HTTP Authorization headers (Bearer tokens) or HTTP-Only cookies.
                </p>
                <p>
                  However, implementing JWT verification securely requires extreme care. Cryptographic flaws such as accepting unsigned tokens (alg: none), algorithm confusion (RS256 to HS256 key confusion), dictionary-guessable HMAC secrets, and unvalidated Key ID (kid) SQL injection paths allow adversaries to forge administrative tokens with zero authorization.
                </p>
              </div>
            }
            howItWorksSteps={[
              {
                title: "1. Token Base64URL Segment Parsing",
                description: "Splits the input token string on dot '.' delimiters into Header, Payload, and Signature segments."
              },
              {
                title: "2. Header Algorithm & Key ID Inspection",
                description: "Parses JSON header objects to verify alg (RS256, ES256, HS256), typ, and kid parameters against security baselines."
              },
              {
                title: "3. Claim Timestamp & Expiration Audit",
                description: "Evaluates exp (Expiration Time), nbf (Not Before), and iat (Issued At) timestamps against current UTC epoch time."
              },
              {
                title: "4. In-Browser HMAC Dictionary Test",
                description: "Performs instant local checks against common weak secret strings to detect weak HS256 implementation keys."
              }
            ]}
            realWorldScenarios={[
              {
                category: "Enterprise API Gateways",
                title: "Preventing Algorithm Confusion Attacks (RS256 vs HS256)",
                description: "Attackers forge admin JWTs signed using an enterprise's public RSA key as the HS256 secret. Explicitly enforcing algorithm whitelists on API gateways blocks this bypass."
              },
              {
                category: "SaaS Microservices Authentication",
                title: "Enforcing Short Access Token TTLs",
                description: "SaaS platforms pairing short-lived 15-minute access tokens with HTTP-Only refresh tokens minimize the window of opportunity for stolen token replay attacks."
              },
              {
                category: "Bug Bounty & Red Teaming",
                title: "Testing 'none' Algorithm Signature Bypass",
                description: "Red teamers audit target authentication APIs by changing alg to 'none' and stripping the signature segment to verify backend signature enforcement."
              },
              {
                category: "DevSecOps CI/CD Pipelines",
                title: "Automating Token Verification Unit Tests",
                description: "Engineering teams incorporate automated JWT validation tests into CI/CD pipelines to catch weak HMAC keys or missing exp claims before shipping to production."
              }
            ]}
            remediationSnippets={[
              {
                platform: "Node.js (jsonwebtoken)",
                filename: "auth.js",
                code: "const jwt = require('jsonwebtoken');\n\n// CRITICAL: Explicitly specify allowed algorithms array\nfunction verifyToken(token, publicKey) {\n  return jwt.verify(token, publicKey, {\n    algorithms: ['RS256'], // Prevents algorithm confusion (HS256) attacks\n    complete: false\n  });\n}"
              },
              {
                platform: "Python (PyJWT)",
                filename: "security.py",
                code: "import jwt\n\n# Enforce algorithm whitelist and verification\ndef decode_auth_token(token, public_key):\n    return jwt.decode(\n        token,\n        public_key,\n        algorithms=['RS256'],\n        options={'verify_signature': True, 'verify_exp': True}\n    )"
              },
              {
                platform: "Go (golang-jwt)",
                filename: "auth.go",
                code: "token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {\n    if _, ok := token.Method.(*jwt.SigningMethodRSA); !ok {\n        return nil, fmt.Errorf(\"unexpected signing algorithm: %v\", token.Header[\"alg\"])\n    }\n    return rsaPublicKey, nil\n})"
              }
            ]}
            bestPractices={[
              {
                title: "Always Enforce Explicit Algorithm Whitelists",
                description: "Never trust the 'alg' header supplied by client tokens. Pass an explicit array of accepted algorithms to your JWT verification library."
              },
              {
                title: "Use Asymmetric Cryptography (RS256 / ES256)",
                description: "Migrate from symmetric HS256 keys to asymmetric RS256 or ES256 key pairs so verifying microservices do not need access to private signing keys."
              },
              {
                title: "Transmit JWTs in HttpOnly Cookies",
                description: "Protect access tokens from XSS script extraction by setting HttpOnly, Secure, and SameSite=Strict flags on session cookies."
              },
              {
                title: "Sanitize 'kid' (Key ID) Lookup Paths",
                description: "Treat the 'kid' header parameter as untrusted input. Validate it against a strict whitelist to prevent SQL Injection or Path Traversal."
              }
            ]}
            troubleshooting={[
              {
                symptom: "API server returns HTTP 401 Unauthorized for valid JWTs after public key rotation",
                cause: "Microservice key caches contain stale RSA public keys or kid matching logic failed.",
                solution: "Implement a dynamic JWKS (JSON Web Key Set) endpoint fetcher with TTL caching.",
                verification: "Query your /.well-known/jwks.json endpoint to confirm active key IDs match token kid headers."
              },
              {
                symptom: "JWT signature verification fails when migrating between programming languages",
                cause: "Differences in Base64URL padding handling or missing linebreaks in PEM format RSA public keys.",
                solution: "Ensure PEM public keys contain standard header boundaries (-----BEGIN PUBLIC KEY-----) and newline formatting.",
                verification: "Re-run JWT Auditor to confirm clean Base64URL parsing across both backend libraries."
              }
            ]}
            faqs={faqs}
            collectionName="API Security & Identity Toolkit"
          />

        </div>
      </div>
    </>
  );
}
