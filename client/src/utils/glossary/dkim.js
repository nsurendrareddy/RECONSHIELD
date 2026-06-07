export const dkim = {
  "term": "DKIM",
  "title": "DomainKeys Identified Mail (DKIM): Cryptographic Email Trust",
  "description": "Understand how DKIM uses public key cryptography to digitally sign emails, ensuring they haven't been tampered with in transit.",
  "keyTakeaways": [
    "DKIM signs emails cryptographically using a private key.",
    "The public key is published in the sender's DNS under a selector.",
    "DKIM signatures survive email forwarding, unlike SPF."
  ],
  "history": {
    "origin": "DKIM was created in 2004 by merging Yahoo's 'DomainKeys' and Cisco's 'Identified Internet Mail' protocols to create a cryptographic validation standard for email.",
    "evolution": "In 2007, the IETF published DKIM as RFC 4871. It was updated in RFC 6376 in 2011, standardizing the signing of specific headers and hashing algorithms.",
    "adoption": "DKIM is a primary pillar of email authentication, used globally by large providers to secure transport streams and assign domain reputation."
  },
  "deepDive": {
    "protocol": "DKIM embeds a cryptographic signature in the headers of outgoing emails using RSA or Ed25519 hashing algorithms.",
    "architecture": "The signing server calculates a hash of the email body and headers, signs it with a private key, and inserts it as a 'DKIM-Signature' header. The receiving server fetches the public key from DNS to verify it.",
    "standards": "The primary specification is RFC 6376. DKIM requires a specific DNS record format under a selector prefix (e.g., selector._domainkey)."
  },
  "security": {
    "attacks": "Attackers can perform DKIM replay attacks by intercepting a legitimately signed email and sending it to many recipients without changing the signed headers.",
    "threatModel": "Threat models cover key compromise, algorithm weakness (e.g., using weak 512-bit keys), and replay vectors.",
    "detection": "Detection relies on checking email authentication headers for 'dkim=pass' or 'dkim=fail' and verifying key lengths."
  },
  "realWorld": {
    "enterprise": "Enterprises generate unique DKIM keys for each marketing platform (e.g., HubSpot, Marketo) to isolate reputations.",
    "incidents": "Security breaches have occurred when old, weak 512-bit DKIM keys were cracked by adversaries to sign spam.",
    "misconfigurations": "Signing the entire email body but failing to sign critical headers like 'Subject' or 'Date', leaving them open to tampering."
  },
  "usage": {
    "steps": "Mail servers calculate signatures on outbound SMTP queues. Administrators copy public keys provided by mail servers into their DNS settings.",
    "bestPractices": "Enforce a minimum of 2048-bit RSA keys, rotate keys every 6 months, and sign critical headers like From, Subject, and To."
  },
  "mistakes": {
    "errors": "Configuring DKIM keys with incorrect selectors, causing DNS lookup failures during verification.",
    "weaknesses": "Leaving old, inactive DKIM public keys in DNS indefinitely after changing providers.",
    "troubleshooting": "Validate records using our Email Analyzer and monitor mail headers on test messages."
  },
  "comparisonTable": {
    "title": "DKIM vs SPF",
    "headers": [
      "Feature",
      "DKIM",
      "SPF"
    ],
    "rows": [
      [
        "Authentication Mechanism",
        "Cryptographic signature",
        "Sender IP matching"
      ],
      [
        "DNS Record Location",
        "selector._domainkey.domain.com",
        "domain.com (root)"
      ],
      [
        "Survivability",
        "Survives email forwarding",
        "Breaks during email forwarding"
      ],
      [
        "Tamper Protection",
        "Protects body and headers",
        "No content integrity protection"
      ]
    ]
  },
  "references": [
    {
      "title": "RFC 6376 - DomainKeys Identified Mail (DKIM) Signatures",
      "url": "https://datatracker.ietf.org/doc/html/rfc6376"
    }
  ],
  "faqs": [
    {
      "q": "What is a DKIM selector?",
      "url": "",
      "a": "A string used in DNS to identify a specific DKIM public key record, allowing a domain to have multiple keys."
    },
    {
      "q": "How does DKIM work?",
      "url": "",
      "a": "It hashes the email body and headers, signs it with a private key, and places it in the email header for public verification."
    },
    {
      "q": "Is DKIM required?",
      "url": "",
      "a": "It is highly recommended and mandatory for bulk email senders sending to Google and Yahoo."
    },
    {
      "q": "What is the _domainkey subdomain?",
      "url": "",
      "a": "The standard subdomain label where all DKIM public keys must be published in DNS."
    },
    {
      "q": "What key size should I use?",
      "url": "",
      "a": "Use 2048-bit RSA keys. 1024-bit keys are discouraged and 512-bit keys are insecure."
    },
    {
      "q": "Can I have multiple DKIM keys?",
      "url": "",
      "a": "Yes, by using different selectors for different email services."
    },
    {
      "q": "What is a DKIM replay attack?",
      "url": "",
      "a": "An exploit where a signed email is copied and re-sent to other recipients to piggyback on the sender's reputation."
    },
    {
      "q": "Does DKIM protect the From header?",
      "url": "",
      "a": "Yes, DKIM signs the From header, ensuring it cannot be changed in transit without breaking the signature."
    },
    {
      "q": "What is DKIM alignment?",
      "url": "",
      "a": "When the domain in the DKIM d= tag matches the domain in the visible From header."
    },
    {
      "q": "What is the d= tag?",
      "url": "",
      "a": "The parameter in the DKIM header specifying the domain that signed the email."
    },
    {
      "q": "What is the s= tag?",
      "url": "",
      "a": "The parameter in the DKIM header specifying the selector used to fetch the public key."
    },
    {
      "q": "How do I rotate DKIM keys?",
      "url": "",
      "a": "Generate a new key pair, publish the new public key under a new selector, switch the signing server, and delete the old key after 30 days."
    },
    {
      "q": "What happens if DKIM fails?",
      "url": "",
      "a": "Depending on DMARC policy, the email may be delivered normally, marked as spam, or rejected."
    },
    {
      "q": "Can DKIM sign attachments?",
      "url": "",
      "a": "Yes, since attachments are part of the email body, their hashes are included in the overall DKIM hash."
    },
    {
      "q": "Does DKIM verify the actual sender?",
      "url": "",
      "a": "It verifies that the domain owner authorized the sending system to sign the message, but it does not authenticate individual users."
    }
  ],
  "relatedTerms": [
    "spf",
    "dmarc"
  ],
  "cta": {
    "title": "Validate DKIM Signatures",
    "desc": "Ensure your public keys are correctly formatted and properly aligned.",
    "tool": "Email Security Analyzer",
    "url": "/tools/email-security"
  }
};
