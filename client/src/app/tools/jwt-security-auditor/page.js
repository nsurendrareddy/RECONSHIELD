import React from 'react';
import JwtAuditorClient from '@/components/JwtAuditorClient';
import FlagshipToolGuide from '@/components/FlagshipToolGuide';

export const metadata = {
  title: "JWT Security Auditor — Token Decoder & Flaw Tester | ReconShield",
  description: "Decode JSON Web Tokens, audit signature security, test for 'none' algorithm flaws, and crack weak HMAC secrets in-browser. 100% private.",
  alternates: { canonical: "https://reconshield.in/tools/jwt-security-auditor" },
  keywords: ["jwt auditor", "jwt decoder", "json web token security", "jwt secret cracker"]
};

export default function JwtAuditorPage() {
  const faqs = [
    { question: "What is a JSON Web Token (JWT)?", answer: "JWT (RFC 7519) is a compact, URL-safe means of representing claims to be transferred between two parties. It consists of three parts: Header, Payload, and Signature, separated by dots." },
    { question: "What is the 'none' algorithm vulnerability?", answer: "The 'none' algorithm flaw occurs when a server accepts unsigned tokens where the header specifies alg: 'none', allowing attackers to tamper with claims without verification." },
    { question: "Why are weak HMAC secrets dangerous?", answer: "If a JWT relies on HS256 with a short or dictionary-word secret key (e.g. 'secret'), offline brute-force tools can crack the key in seconds and forge arbitrary admin tokens." },
    { question: "What is Algorithm Confusion Attack (RS256 to HS256)?", answer: "This occurs when an application expecting an RS256 token (signed with a private key and verified with a public key) treats the public key as an HMAC secret when forced into HS256 mode." },
    { question: "Should sensitive data be stored in JWT payload?", answer: "No. JWT payloads are base64url-encoded strings, not encrypted bytes. Anyone can decode and view the payload claims." },
    { question: "What is the 'exp' claim?", answer: "The 'exp' (expiration time) claim identifies the expiration time on or after which the JWT MUST NOT be accepted for processing." },
    { question: "What is the 'nbf' claim?", answer: "The 'nbf' (not before) claim identifies the time before which the JWT MUST NOT be accepted for processing." },
    { question: "What is jti in JWT?", answer: "jti (JWT ID) provides a unique identifier for the token, used to prevent replay attacks by tracking processed IDs." },
    { question: "How do I invalidate a JWT before expiration?", answer: "Maintain a token blacklist in Redis, implement short token expiry with refresh tokens, or increment the user's password version timestamp in the database." },
    { question: "What is JWE vs JWS?", answer: "JWS (JSON Web Signature) represents signed content (integrity verified). JWE (JSON Web Encryption) encrypts content so only the private key holder can read payload claims." },
    { question: "Why prefer RS256 over HS256 for microservices?", answer: "RS256 uses asymmetric cryptography: microservices only need the public key to verify signatures, avoiding sharing private secrets across distributed nodes." },
    { question: "What is kid header parameter?", answer: "kid (Key ID) is a hint indicating which key was used to sign the JWT, aiding key rotation in multi-key environments." },
    { question: "Can kid parameter lead to SQL injection or Path Traversal?", answer: "Yes, if server code blindly concatenates kid into database queries or file lookup paths without sanitization." },
    { question: "How should JWTs be stored in web browsers?", answer: "Store JWTs in HTTP-Only, Secure, SameSite cookies to mitigate XSS script theft." },
    { question: "What is the maximum recommended expiration for access tokens?", answer: "Short-lived access tokens (5 to 15 minutes) combined with secure HTTP-only refresh tokens represent industry best practice." }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "ReconShield JWT Security Auditor",
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
              // API &amp; AUTHENTICATION SECURITY
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white uppercase tracking-tight">
              JWT Security <span className="text-matrix-400">Auditor &amp; Tester</span>
            </h1>
            <p className="text-gray-400 text-sm sm:text-base font-sans leading-relaxed">
              Audit JSON Web Token structures, check signature algorithms, detect algorithm confusion risks, and test HMAC secret strength privately.
            </p>
          </div>

          <JwtAuditorClient />

          <FlagshipToolGuide
            toolName="JWT Security Auditor & Token Inspector"
            subtitle="Enterprise Authentication Security and Cryptographic Signature Triage"
            description="JSON Web Tokens (RFC 7519) are widely deployed across modern web architectures, single page applications (SPAs), and microservices to authenticate identity and exchange signed authorization claims."
            category="API Security"
            whatIsContent={
              <p>
                JWT security vulnerabilities directly lead to account takeover, privilege escalation, and full administrative bypass. Common implementation flaws include accepting unsigned tokens (alg: none), algorithm confusion (RS256 to HS256 key confusion), dictionary-guessable HMAC secrets, and unvalidated Key ID (kid) paths.
              </p>
            }
            howItWorksSteps={[
              { title: "Token Base64 Parsing", description: "The auditor splits the JWT on dot '.' delimiters and decodes Header and Payload segments." },
              { title: "Header Verification", description: "Inspects the 'alg' and 'typ' parameters to verify strong cryptographic algorithms." },
              { title: "Claim Expiration Audit", description: "Validates 'exp', 'nbf', and 'iat' timestamps against current UTC epoch time." },
              { title: "HMAC Secret Test", description: "Performs in-browser dictionary checks against common weak keys." }
            ]}
            remediationSnippets={[
              { platform: "Node.js (jsonwebtoken)", filename: "auth.js", code: "const jwt = require('jsonwebtoken');\n// Enforce explicit algorithm whitelist\njwt.verify(token, publicKey, { algorithms: ['RS256'] });" }
            ]}
            bestPractices={[
              { title: "Enforce Algorithm Whitelists", description: "Never trust the 'alg' parameter header provided by the client. Explicitly specify expected algorithms in verify function." },
              { title: "Store in HttpOnly Cookies", description: "Prevent XSS token theft by transmitting JWTs exclusively inside HTTP-Only, Secure cookies." }
            ]}
            faqs={faqs}
          />
        </div>
      </div>
    </>
  );
}
