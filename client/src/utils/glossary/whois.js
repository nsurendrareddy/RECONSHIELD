export const whois = {
  "term": "WHOIS",
  "title": "What is WHOIS? The Complete Cybersecurity Guide",
  "description": "A comprehensive guide to WHOIS lookups, domain registration data, privacy protections, and how cybersecurity professionals use WHOIS for threat intelligence.",
  "keyTakeaways": [
    "WHOIS is a query/response protocol used to find ownership and registration details of internet resources.",
    "GDPR has heavily redacted WHOIS records, making historical WHOIS and RDAP critical for security researchers.",
    "Attackers use WHOIS data for social engineering, brand impersonation, and finding expired domains."
  ],
  "history": {
    "origin": "The WHOIS protocol originated in 1982 when the Internet Engineering Task Force (IETF) published RFC 812. Originally, it was created to list the contact information of ARPANET users, allowing directory lookup of people and organizations.",
    "evolution": "As the ARPANET transitioned into the commercial Internet, the WHOIS database shifted to focus on domain names. Initially, a single server (nic.ddn.mil) managed all queries. Later, Network Solutions took over registration, eventually leading to a decentralized model managed by ICANN and shared registry databases.",
    "adoption": "Today, WHOIS is globally adopted by all domain registrars and registries. However, the introduction of GDPR in 2018 triggered a major shift toward redaction, paving the way for the Registration Data Access Protocol (RDAP) as the modern successor."
  },
  "deepDive": {
    "protocol": "WHOIS operates as a simple, text-based query-response protocol. It traditionally uses TCP port 43. When a client submits a domain query, the server responds with a plain-text record containing registration fields and closes the connection.",
    "architecture": "The architecture relies on two models: Thick WHOIS (where the registry stores both registrar and registrant contact data) and Thin WHOIS (where the registry only stores technical routing data and points the client to the registrar's WHOIS server for registrant details).",
    "standards": "The protocol is officially defined by RFC 3912. Unlike modern web APIs, WHOIS has no standard structure, no authentication, and no error-handling schemas, resulting in ad-hoc parser implementations."
  },
  "security": {
    "attacks": "Attackers leverage WHOIS data to identify expiring corporate domains for hijacking. They also scrape exposed administrative emails for spear-phishing campaigns (CEO fraud). Under Registry Lock bypass, attackers socially engineer registrars using WHOIS details to gain control.",
    "threatModel": "The threat model covers data exposure, registrar account compromise, and DNS hijacking. Attackers target the domain registration layer to redirect enterprise web and email traffic.",
    "detection": "Detection involves monitoring domain expiry dates, tracking WHOIS changes via automated WHOIS checkers, and auditing EPP status flags for unauthorized configuration updates."
  },
  "realWorld": {
    "enterprise": "Enterprises use WHOIS API monitoring to alert on domain registration updates, ensuring critical brand assets do not get hijacked or suffer from transfer fraud.",
    "incidents": "A notable incident occurred when a cryptocurrency platform suffered a DNS hijack because a threat actor recovered historical registrar details from archives, bypassed MFA, and initiated an unauthorized transfer.",
    "misconfigurations": "Common misconfigurations include leaving domain privacy disabled for administrative contacts or failing to activate registry lock controls (serverTransferProhibited)."
  },
  "usage": {
    "steps": "Practitioners run whois command-line queries (e.g., 'whois reconshield.in') or query RDAP REST endpoints to extract creation dates, authoritative nameservers, and domain lock statuses.",
    "bestPractices": "Always enable Registrar Lock, utilize Registry Lock (server-side lock) for critical assets, mask administrative contact data using registrar privacy, and regularly audit nameserver records."
  },
  "mistakes": {
    "errors": "Failing to renew domains before they enter the redemption grace period, causing domain speculators to snatch them.",
    "weaknesses": "Relying on public email addresses for administrative contacts without strict MFA, exposing the account to recovery exploits.",
    "troubleshooting": "If a query fails, check for port 43 rate limits and implement automatic IP rotation or switch to an RDAP-based API."
  },
  "comparisonTable": {
    "title": "WHOIS vs RDAP",
    "headers": [
      "Feature",
      "WHOIS",
      "RDAP"
    ],
    "rows": [
      [
        "Protocol Type",
        "Plain text over TCP 43",
        "RESTful HTTP (JSON)"
      ],
      [
        "Authentication",
        "None (Public)",
        "Supported (Role-based access)"
      ],
      [
        "Localization",
        "Poor/Ad-hoc",
        "Built-in multilingual support"
      ],
      [
        "Rate Limiting",
        "IP-based blocking",
        "Standard HTTP rate limits"
      ]
    ]
  },
  "references": [
    {
      "title": "RFC 3912 - WHOIS Protocol Specification",
      "url": "https://datatracker.ietf.org/doc/html/rfc3912"
    },
    {
      "title": "ICANN WHOIS Policy",
      "url": "https://whois.icann.org"
    }
  ],
  "faqs": [
    {
      "q": "What does WHOIS stand for?",
      "url": "",
      "a": "It is not an acronym; it simply asks 'who is' responsible for the domain name."
    },
    {
      "q": "Is WHOIS data accurate?",
      "url": "",
      "a": "It is supposed to be accurate under ICANN rules, but threat actors frequently use fake or stolen registration credentials."
    },
    {
      "q": "How can I check WHOIS data?",
      "url": "",
      "a": "You can use command line 'whois' tool or our online WHOIS Lookup Tool."
    },
    {
      "q": "What is WHOIS privacy?",
      "url": "",
      "a": "A service provided by registrars that replaces your personal contact details in the WHOIS registry with proxy data."
    },
    {
      "q": "Why is WHOIS redacted?",
      "url": "",
      "a": "The implementation of GDPR in 2018 forced registrars to redact personally identifiable information to avoid heavy fines."
    },
    {
      "q": "What is an EPP status code?",
      "url": "",
      "a": "Extensible Provisioning Protocol status codes tell you the state of a domain, such as clientTransferProhibited (locked)."
    },
    {
      "q": "How does WHOIS help in OSINT?",
      "url": "",
      "a": "It helps map out infrastructure, discover related domains registered by the same admin, and trace ownership changes."
    },
    {
      "q": "What is RDAP?",
      "url": "",
      "a": "Registration Data Access Protocol, the RESTful successor to WHOIS featuring JSON data and query authentication."
    },
    {
      "q": "What is the difference between thin and thick WHOIS?",
      "url": "",
      "a": "Thin stores only technical data; thick stores registrant contact details alongside technical data."
    },
    {
      "q": "What is historical WHOIS?",
      "url": "",
      "a": "Archived records capturing WHOIS databases prior to GDPR redaction, highly useful for investigating old domains."
    },
    {
      "q": "How often does WHOIS update?",
      "url": "",
      "a": "It updates almost instantly when changes are committed to the registrar database, but caches can take 24 hours to clear."
    },
    {
      "q": "What is registry lock?",
      "url": "",
      "a": "A high-security lock requiring manual verification by the registry operator to make any DNS changes."
    },
    {
      "q": "Why does my WHOIS query fail?",
      "url": "",
      "a": "Typically due to port 43 rate limits imposed by the registry. Using an API handles this via proxy rotation."
    },
    {
      "q": "What are nameservers in WHOIS?",
      "url": "",
      "a": "They identify the DNS servers authorized to resolve queries for the domain name."
    },
    {
      "q": "Can a domain transfer be blocked?",
      "url": "",
      "a": "Yes, by enabling registrar lock (clientTransferProhibited) in the domain control panel."
    }
  ],
  "relatedTerms": [
    "dns",
    "osint"
  ],
  "cta": {
    "title": "Trace Domain Infrastructure",
    "desc": "Run a deep WHOIS scan to uncover hidden registrar details and domain statuses.",
    "tool": "WHOIS Lookup",
    "url": "/tools/whois"
  }
};
