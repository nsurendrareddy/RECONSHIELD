export const ssl = {
  "term": "SSL",
  "title": "Secure Sockets Layer (SSL): The Legacy of Web Encryption",
  "description": "Understand the history of SSL, why it was deprecated, how X.509 digital certificates work, and how to manage cryptographic trust chains.",
  "keyTakeaways": [
    "SSL was netscape's original encryption protocol, now completely obsolete.",
    "X.509 certificates bind a public key to an organization's identity.",
    "The chain of trust relies on Root CAs, Intermediate CAs, and Leaf certificates."
  ],
  "history": {
    "origin": "SSL 1.0 was designed by Netscape in 1994 but never released due to severe flaws. SSL 2.0 was released in 1995 but cracked quickly, leading to SSL 3.0 in 1996.",
    "evolution": "In 1999, SSL was redesigned as TLS 1.0. All versions of SSL are now deprecated, with SSL 3.0 officially retired in 2015 via RFC 7568.",
    "adoption": "Despite being deprecated for years, the term 'SSL' is still widely used to refer to modern TLS certificates."
  },
  "deepDive": {
    "protocol": "SSL protocols are transport-layer protocols operating over TCP. They are vulnerable to structural cryptographic exploits.",
    "architecture": "Relies on asymmetric cryptography to exchange symmetric keys. Certificates are formatted under the X.509 standard.",
    "standards": "SSL 3.0 was defined in RFC 6101. Its deprecation is codified in RFC 7568."
  },
  "security": {
    "attacks": "POODLE (Padding Oracle On Downgraded Legacy Encryption) exploited fallback mechanisms to decrypt SSL 3.0 traffic.",
    "threatModel": "Focuses on man-in-the-middle decryptions and packet sniffing.",
    "detection": "Detection involves auditing server configurations to verify all SSL versions are disabled."
  },
  "realWorld": {
    "enterprise": "Compliance frameworks like HIPAA require organizations to disable SSL 3.0 across all internal and external servers.",
    "incidents": "The POODLE attack forced major web platforms to drop support for SSL 3.0 overnight in 2014.",
    "misconfigurations": "Keeping SSL 3.0 enabled as a fallback protocol, allowing attackers to force secure clients to downgrade."
  },
  "usage": {
    "steps": "Check for SSL protocol status using command line tools (e.g., 'nmap --script ssl-enum-ciphers -p 443 target.com').",
    "bestPractices": "Configure web servers to explicitly block SSLv2 and SSLv3, allowing only TLSv1.2 and TLSv1.3."
  },
  "mistakes": {
    "errors": "Buying wildcard certificates and exposing the private key across multiple unmanaged edge devices.",
    "weaknesses": "Failing to monitor certificate expiration, leading to expired SSL warnings.",
    "troubleshooting": "Verify that your certificate matches the requested domain and the chain of trust is intact."
  },
  "comparisonTable": {
    "title": "SSL vs TLS",
    "headers": [
      "Feature",
      "SSL (Legacy)",
      "TLS (Modern)"
    ],
    "rows": [
      [
        "Current Status",
        "Deprecated / Insecure",
        "Active / Secure"
      ],
      [
        "Versions",
        "1.0, 2.0, 3.0",
        "1.0, 1.1, 1.2, 1.3"
      ],
      [
        "Handshake Message Authentication",
        "Uses MAC (message authentication code)",
        "Uses HMAC (hashed MAC)"
      ],
      [
        "Downgrade Protection",
        "Vulnerable to downgrade attacks",
        "Built-in protection against downgrades"
      ]
    ]
  },
  "references": [
    {
      "title": "RFC 7568 - Deprecating Secure Sockets Layer Version 3.0",
      "url": "https://datatracker.ietf.org/doc/html/rfc7568"
    }
  ],
  "faqs": [
    {
      "q": "What is SSL?",
      "url": "",
      "a": "Secure Sockets Layer, a deprecated cryptographic protocol."
    },
    {
      "q": "Why is SSL deprecated?",
      "url": "",
      "a": "Due to fundamental design vulnerabilities (like POODLE) that allowed attackers to decrypt secure traffic."
    },
    {
      "q": "What is an X.509 certificate?",
      "url": "",
      "a": "A standard format for public key certificates, used to manage digital identities in SSL/TLS."
    },
    {
      "q": "What is a root certificate?",
      "url": "",
      "a": "A public key certificate identifying a root Certificate Authority, pre-installed in OS trust stores."
    },
    {
      "q": "What is an intermediate certificate?",
      "url": "",
      "a": "A certificate signed by a root CA that is used to sign end-user certificates, protecting the root key."
    },
    {
      "q": "What is a self-signed certificate?",
      "url": "",
      "a": "A certificate signed by the entity that created it, rather than a trusted CA."
    },
    {
      "q": "What is a wildcard certificate?",
      "url": "",
      "a": "A certificate that covers a domain and all of its first-level subdomains."
    },
    {
      "q": "How long do SSL certificates last?",
      "url": "",
      "a": "Public certificates are limited to a maximum validity of 398 days to enforce key rotation."
    },
    {
      "q": "What is Let's Encrypt?",
      "url": "",
      "a": "A free, automated, and open Certificate Authority providing trusted certificates."
    },
    {
      "q": "What is the green address bar?",
      "url": "",
      "a": "A legacy browser UI indicator showing that a site possessed an EV (Extended Validation) certificate."
    },
    {
      "q": "What is mixed content?",
      "url": "",
      "a": "When a secure HTTPS page loads elements (like images) over insecure HTTP connections."
    },
    {
      "q": "What is a Certificate Revocation List (CRL)?",
      "url": "",
      "a": "A database of revoked certificates maintained by a CA that clients can check."
    },
    {
      "q": "What is OCSP?",
      "url": "",
      "a": "Online Certificate Status Protocol, a real-time query method to check if a certificate is valid."
    },
    {
      "q": "What is a hostname mismatch?",
      "url": "",
      "a": "An error occurring when the domain requested does not match any name listed in the certificate."
    },
    {
      "q": "How do I fix a broken SSL chain?",
      "url": "",
      "a": "Configure your web server to serve the full intermediate certificate file alongside your primary certificate."
    }
  ],
  "relatedTerms": [
    "tls",
    "dns"
  ],
  "cta": {
    "title": "Validate Certificate Chains",
    "desc": "Ensure your server provides the correct intermediate certificates and valid expiration dates.",
    "tool": "SSL Checker",
    "url": "/tools/ssl-checker"
  }
};
