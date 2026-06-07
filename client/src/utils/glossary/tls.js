export const tls = {
  "term": "TLS",
  "title": "Transport Layer Security (TLS): The Standard for Web Encryption",
  "description": "A deep dive into Transport Layer Security (TLS), handshake protocols, ciphers, and why modern web security requires TLS 1.2 and TLS 1.3.",
  "keyTakeaways": [
    "TLS encrypts data in transit to prevent interception and tampering.",
    "TLS 1.3 is faster and more secure than TLS 1.2, eliminating weak ciphers.",
    "Perfect Forward Secrecy ensures past session keys cannot be decrypted if the private key is leaked."
  ],
  "history": {
    "origin": "TLS was introduced in 1999 in RFC 2246 as an upgrade to SSL 3.0. The rename from SSL to TLS was a compromise between Netscape and Microsoft.",
    "evolution": "TLS has gone through versions 1.0, 1.1, 1.2 (2008), and 1.3 (2018). Older versions have been deprecated due to cryptographic flaws.",
    "adoption": "TLS is the foundation of HTTPS, universally adopted to secure web, email, database, and VPN connections."
  },
  "deepDive": {
    "protocol": "TLS sits between the transport layer (TCP) and application layer, executing a cryptographic handshake to establish session keys.",
    "architecture": "The handshake uses asymmetric cryptography for authentication and key exchange, switching to symmetric cryptography for actual data encryption.",
    "standards": "TLS 1.3 is defined by RFC 8446, introducing a faster 1-RTT handshake and eliminating legacy ciphers."
  },
  "security": {
    "attacks": "Attackers target weak configurations via downgrade attacks (forcing the server to use SSL 3.0 or TLS 1.0) and weak ciphers.",
    "threatModel": "Mitigates man-in-the-middle (MitM) sniffing, session hijacking, and data tampering.",
    "detection": "Detection involves scanning public ports with tools like SSL Checker to find obsolete protocol support."
  },
  "realWorld": {
    "enterprise": "Enterprises configure their load balancers and web servers to disable TLS 1.0/1.1 to comply with PCI-DSS standards.",
    "incidents": "The Heartbleed bug in OpenSSL allowed attackers to read memory buffers, exposing private TLS keys.",
    "misconfigurations": "Enabling weak cipher suites (like those using RC4 or 3DES) that are vulnerable to computational decryption."
  },
  "usage": {
    "steps": "Web servers are configured via directives (e.g., 'ssl_protocols TLSv1.2 TLSv1.3') in configuration files.",
    "bestPractices": "Disable TLS 1.0/1.1, prioritize AEAD ciphers, use ECDHE key exchanges for Forward Secrecy, and enable HSTS."
  },
  "mistakes": {
    "errors": "Neglecting to configure intermediate certificates, causing trust chain errors on client browsers.",
    "weaknesses": "Enabling 0-RTT in TLS 1.3 without replay attack protection.",
    "troubleshooting": "Use command line 'openssl s_client -connect domain:443 -tls1_3' to test server responses."
  },
  "comparisonTable": {
    "title": "TLS 1.2 vs TLS 1.3",
    "headers": [
      "Feature",
      "TLS 1.2",
      "TLS 1.3"
    ],
    "rows": [
      [
        "Handshake Time",
        "2 Round-Trips (2-RTT)",
        "1 Round-Trip (1-RTT)"
      ],
      [
        "Cipher Suites Supported",
        "Over 300 (includes weak ciphers)",
        "Only 5 (all secure, AEAD ciphers)"
      ],
      [
        "Zero Round-Trip (0-RTT)",
        "Not supported",
        "Supported for resumption"
      ],
      [
        "Static RSA Key Exchange",
        "Allowed (vulnerable)",
        "Removed (PFS mandatory)"
      ]
    ]
  },
  "references": [
    {
      "title": "RFC 8446 - The Transport Layer Security (TLS) Protocol Version 1.3",
      "url": "https://datatracker.ietf.org/doc/html/rfc8446"
    }
  ],
  "faqs": [
    {
      "q": "What is TLS?",
      "url": "",
      "a": "Transport Layer Security, a cryptographic protocol securing network communication."
    },
    {
      "q": "Is TLS the same as SSL?",
      "url": "",
      "a": "TLS is the modern successor to SSL; SSL is obsolete, but the terms are often used interchangeably."
    },
    {
      "q": "What is the TLS handshake?",
      "url": "",
      "a": "The initial negotiation process between client and server to agree on ciphers, authenticate identity, and exchange keys."
    },
    {
      "q": "What is TLS 1.3?",
      "url": "",
      "a": "The latest version of TLS, optimizing speed and security by deprecating weak ciphers and reducing handshake times."
    },
    {
      "q": "What are cipher suites?",
      "url": "",
      "a": "Combinations of cryptographic algorithms used to establish secure connections."
    },
    {
      "q": "What is Perfect Forward Secrecy (PFS)?",
      "url": "",
      "a": "A cryptographic property ensuring session keys are unique, meaning past traffic cannot be decrypted even if the server key is compromised."
    },
    {
      "q": "What is mTLS?",
      "url": "",
      "a": "Mutual TLS, where both client and server verify each other's certificates, commonly used in API gateways."
    },
    {
      "q": "What port does TLS use?",
      "url": "",
      "a": "By default, HTTPS uses port 443, which encapsulates HTTP traffic inside TLS."
    },
    {
      "q": "What is SNI?",
      "url": "",
      "a": "Server Name Indication, allowing a client to specify the target domain during the handshake so a server can host multiple sites on one IP."
    },
    {
      "q": "What is HSTS?",
      "url": "",
      "a": "HTTP Strict Transport Security, forcing browsers to only connect to a site using HTTPS."
    },
    {
      "q": "Why is TLS 1.0 insecure?",
      "url": "",
      "a": "Because it relies on weak hashing algorithms (MD5/SHA1) and is vulnerable to attacks like BEAST."
    },
    {
      "q": "How do I check my server's TLS version?",
      "url": "",
      "a": "Use our SSL Checker tool to scan your public-facing ports."
    },
    {
      "q": "What is a CA?",
      "url": "",
      "a": "Certificate Authority, a trusted third-party entity that issues digital certificates."
    },
    {
      "q": "What is an intermediate certificate?",
      "url": "",
      "a": "A certificate linking the server's certificate to the Root CA in the chain of trust."
    },
    {
      "q": "What happens if a TLS certificate expires?",
      "url": "",
      "a": "Browsers will block access to the site with a prominent warning message."
    }
  ],
  "relatedTerms": [
    "ssl",
    "dns"
  ],
  "cta": {
    "title": "Audit Server Cryptography",
    "desc": "Scan your infrastructure for deprecated TLS 1.0 protocols and weak cipher suites.",
    "tool": "SSL Checker",
    "url": "/tools/ssl-checker"
  }
};
