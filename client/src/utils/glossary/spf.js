export const spf = {
  "term": "SPF",
  "title": "Sender Policy Framework (SPF): Stopping Email Spoofing",
  "description": "Learn how SPF (Sender Policy Framework) protects your domain from email spoofing, how to format SPF records, and how to troubleshoot common SPF failures.",
  "keyTakeaways": [
    "SPF lists all IP addresses authorized to send emails on behalf of a domain.",
    "The receiving server checks the SPF record of the Return-Path domain.",
    "SPF records must not exceed the 10 DNS lookup limit to prevent PermError."
  ],
  "history": {
    "origin": "The SPF protocol was first proposed in 2003 under the name 'Sender Permitted From' to address the inherit vulnerability in SMTP where any sender could forge any domain.",
    "evolution": "In 2006, the IETF published SPF as RFC 4408, establishing it as an experimental standard. It was eventually promoted to a standards-track protocol in RFC 7208 in 2014.",
    "adoption": "Today, SPF is universally adopted by all major email service providers. Implementing SPF is mandatory under Google and Yahoo's bulk-sender rules."
  },
  "deepDive": {
    "protocol": "SPF operates purely within the DNS system. It is published as a single TXT record at the root of a domain name.",
    "architecture": "The protocol validates the IP address of the sending MTA (Mail Transfer Agent) against the authorized IPs and mechanisms listed in the SPF record.",
    "standards": "The protocol standard is defined by RFC 7208. The evaluation process enforces a maximum limit of 10 recursive DNS lookups."
  },
  "security": {
    "attacks": "Attackers bypass SPF by sending emails with a forged From header, since SPF only checks the Return-Path (envelope sender) domain.",
    "threatModel": "The threat model targets business email compromise (BEC), phishing, and domain reputation abuse.",
    "detection": "Detection involves verifying SPF alignment via DMARC and checking incoming email headers for 'spf=pass' or 'spf=fail'."
  },
  "realWorld": {
    "enterprise": "Enterprises configure SPF to include their SaaS vendors (e.g., Salesforce, Zendesk) to ensure customer notifications are delivered successfully.",
    "incidents": "Phishing campaigns frequently abuse domains that use a broad '+all' (allow all) SPF directive.",
    "misconfigurations": "Publishing multiple SPF records, causing recursive resolvers to return a PermError and ignore all authorized senders."
  },
  "usage": {
    "steps": "Administrators create SPF records like 'v=spf1 include:_spf.google.com ~all' and publish them in their DNS zone.",
    "bestPractices": "Avoid using '-all' if forwarding is common, enforce a strict policy using DMARC, and prune unused includes."
  },
  "mistakes": {
    "errors": "Exceeding the 10 DNS lookup limit by including too many external SaaS vendor domains.",
    "weaknesses": "Relying on SPF alone without deploying DKIM and DMARC to secure the visible From header.",
    "troubleshooting": "Use an SPF checker to analyze the lookup chain and flatten records if necessary."
  },
  "comparisonTable": {
    "title": "SPF vs DKIM vs DMARC",
    "headers": [
      "Feature",
      "SPF",
      "DKIM",
      "DMARC"
    ],
    "rows": [
      [
        "Authentication Type",
        "IP-based verification",
        "Cryptographic signature",
        "Alignment and policy enforcement"
      ],
      [
        "Header Checked",
        "Return-Path",
        "DKIM-Signature Header",
        "From Header (visible to user)"
      ],
      [
        "Handles Forwarding",
        "Usually fails",
        "Passes",
        "Passes if DKIM is aligned"
      ],
      [
        "Reporting",
        "None",
        "None",
        "Yes (RUA/RUF reports)"
      ]
    ]
  },
  "references": [
    {
      "title": "RFC 7208 - Sender Policy Framework",
      "url": "https://datatracker.ietf.org/doc/html/rfc7208"
    }
  ],
  "faqs": [
    {
      "q": "What is an SPF record?",
      "url": "",
      "a": "A DNS TXT record listing IP addresses authorized to send emails on behalf of a domain."
    },
    {
      "q": "What is the 10-lookup limit?",
      "url": "",
      "a": "A restriction in the SPF specification preventing resolvers from executing more than 10 DNS queries to validate a record."
    },
    {
      "q": "What does ~all mean?",
      "url": "",
      "a": "SoftFail: Unauthorized mail is accepted but marked as suspicious."
    },
    {
      "q": "What does -all mean?",
      "url": "",
      "a": "HardFail: Unauthorized mail should be rejected entirely."
    },
    {
      "q": "Can I have two SPF records?",
      "url": "",
      "a": "No, publishing multiple SPF records on a single domain invalidates both."
    },
    {
      "q": "What is SPF flattening?",
      "url": "",
      "a": "The process of resolving domain names in SPF records to their corresponding IP addresses to stay under the 10-lookup limit."
    },
    {
      "q": "Why does email forwarding break SPF?",
      "url": "",
      "a": "Because the forwarding server's IP is not listed in the original sender's SPF record."
    },
    {
      "q": "What is the Return-Path?",
      "url": "",
      "a": "The hidden email address used for bounced messages. SPF verifies the domain in this address."
    },
    {
      "q": "What is the From header?",
      "url": "",
      "a": "The email address visible to the end recipient in their email client."
    },
    {
      "q": "Does SPF encrypt mail?",
      "url": "",
      "a": "No, SPF is purely an authentication mechanism and does not encrypt email content."
    },
    {
      "q": "What is a PermError in SPF?",
      "url": "",
      "a": "A permanent error indicating a syntax issue or that the 10-lookup limit has been exceeded."
    },
    {
      "q": "What is a TempError?",
      "url": "",
      "a": "A temporary error, usually caused by DNS timeout issues during verification."
    },
    {
      "q": "What is the ip4 mechanism?",
      "url": "",
      "a": "A parameter in SPF records explicitly authorizing a specific IPv4 address or subnet."
    },
    {
      "q": "What is the include mechanism?",
      "url": "",
      "a": "An SPF parameter that includes another domain's SPF record into your own."
    },
    {
      "q": "Is SPF sufficient on its own?",
      "url": "",
      "a": "No, SPF must be used with DKIM and DMARC to prevent spoofing of the visible From address."
    }
  ],
  "relatedTerms": [
    "dkim",
    "dmarc"
  ],
  "cta": {
    "title": "Audit Your SPF Configuration",
    "desc": "Check for syntax errors, lookup limits, and unauthorized includes.",
    "tool": "Email Security Analyzer",
    "url": "/tools/email-security"
  }
};
