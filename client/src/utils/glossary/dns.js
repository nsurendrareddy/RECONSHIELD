export const dns = {
  "term": "DNS",
  "title": "Domain Name System (DNS): The Cybersecurity Foundation",
  "description": "Learn how the Domain Name System (DNS) works, common DNS vulnerabilities, record types, and how to perform DNS reconnaissance.",
  "keyTakeaways": [
    "DNS translates human-readable domain names to machine-readable IP addresses.",
    "Common record types include A, AAAA, MX, TXT, CNAME, and NS records.",
    "DNSSEC is critical for protecting against DNS spoofing and cache poisoning attacks."
  ],
  "history": {
    "origin": "The Domain Name System was invented in 1983 by Paul Mockapetris (RFC 882 and RFC 883). It replaced the legacy 'hosts.txt' file, which had to be manually downloaded from SRI-NIC by every computer on the ARPANET.",
    "evolution": "DNS expanded rapidly, introducing complex caching mechanisms, dynamic updates (RFC 2136), and DNS Security Extensions (DNSSEC) to cryptographically sign records and prevent spoofing.",
    "adoption": "DNS is arguably the most critical core protocol on the Internet today. It has evolved to support secure transport mechanisms like DNS over TLS (DoT) and DNS over HTTPS (DoH) to secure DNS queries."
  },
  "deepDive": {
    "protocol": "DNS is a hierarchical, distributed database system. By default, it operates over UDP on port 53 for standard queries, falling back to TCP port 53 for large payloads like zone transfers.",
    "architecture": "The hierarchy starts at Root servers (.), followed by Top-Level Domain (TLD) servers (e.g., .com, .in), and finally Authoritative Nameservers which hold the specific resource records.",
    "standards": "DNS standards are defined across multiple RFCs, primarily RFC 1034 (Concepts and Facilities) and RFC 1035 (Implementation and Specification)."
  },
  "security": {
    "attacks": "Common attacks include Cache Poisoning (injecting false IP data into a resolver cache), DNS Hijacking (routing queries to rogue servers), and DNS Tunneling (exfiltrating data using TXT records).",
    "threatModel": "DNS serves as a target for DDoS amplification attacks, phishing redirection, and active subdomain discovery by threat actors.",
    "detection": "Detection relies on auditing query logs for anomalous TXT volume, verifying DNSSEC signatures, and setting up alerts for nameserver changes."
  },
  "realWorld": {
    "enterprise": "Enterprises implement DNS filtering to block users from resolving malicious domains associated with malware and phishing.",
    "incidents": "A massive DDoS campaign targeting a major DNS provider knocked out access to popular platforms like Twitter and Netflix by overwhelming recursive resolvers.",
    "misconfigurations": "Leaving AXFR zone transfers open, allowing attackers to download the entire list of subdomains for an organization."
  },
  "usage": {
    "steps": "Practitioners use tools like 'dig' (e.g., 'dig TXT reconshield.in') or online DNS query tools to inspect domain records.",
    "bestPractices": "Always enable DNSSEC, restrict zone transfers, enforce DNS filtering, and regularly scan for dangling CNAME records."
  },
  "mistakes": {
    "errors": "Failing to clean up old CNAME records pointing to decommissioned third-party cloud buckets, resulting in Subdomain Takeover.",
    "weaknesses": "Using unencrypted DNS resolvers, exposing corporate browsing telemetry to passive sniffing.",
    "troubleshooting": "If a record is not resolving, check propagation status globally and flush local resolver caches."
  },
  "comparisonTable": {
    "title": "DNS vs WHOIS",
    "headers": [
      "Feature",
      "DNS",
      "WHOIS"
    ],
    "rows": [
      [
        "Primary Function",
        "Maps domains to IP addresses",
        "Identifies owner and registrar info"
      ],
      [
        "Data Type",
        "Resource records (A, CNAME, etc.)",
        "Contact info and domain lifecycle dates"
      ],
      [
        "Standard Port",
        "Port 53 (UDP/TCP)",
        "Port 43 (TCP)"
      ],
      [
        "Security Layer",
        "DNSSEC",
        "Registry Lock / RDAP auth"
      ]
    ]
  },
  "references": [
    {
      "title": "RFC 1035 - Domain Names Specification",
      "url": "https://datatracker.ietf.org/doc/html/rfc1035"
    },
    {
      "title": "RFC 4033 - DNS Security Introduction",
      "url": "https://datatracker.ietf.org/doc/html/rfc4033"
    }
  ],
  "faqs": [
    {
      "q": "What is an A record?",
      "url": "",
      "a": "An Address record that maps a domain name to an IPv4 address."
    },
    {
      "q": "What is a CNAME record?",
      "url": "",
      "a": "A Canonical Name record that acts as an alias, pointing one domain to another."
    },
    {
      "q": "What does TTL mean?",
      "url": "",
      "a": "Time to Live, specifying how many seconds a resolver should cache a DNS record before querying again."
    },
    {
      "q": "What is DNS Cache Poisoning?",
      "url": "",
      "a": "An exploit where an attacker redirects traffic by injecting false DNS records into a resolver's cache."
    },
    {
      "q": "What is DNSSEC?",
      "url": "",
      "a": "Security Extensions that use digital signatures to verify the authenticity of DNS records."
    },
    {
      "q": "What is a recursive resolver?",
      "url": "",
      "a": "A DNS server that handles the lookup process by querying multiple nameservers to find the final IP address."
    },
    {
      "q": "What is an authoritative nameserver?",
      "url": "",
      "a": "The final DNS server in the chain that holds the actual record database for a domain."
    },
    {
      "q": "What is DNS over HTTPS (DoH)?",
      "url": "",
      "a": "A protocol that encrypts DNS queries inside HTTPS traffic, enhancing privacy."
    },
    {
      "q": "Why is DNS tunneling dangerous?",
      "url": "",
      "a": "It allows malware to encode data within DNS requests, bypassing standard network firewalls."
    },
    {
      "q": "What is an MX record?",
      "url": "",
      "a": "Mail Exchanger record, pointing to the mail server responsible for receiving emails for the domain."
    },
    {
      "q": "What is a TXT record?",
      "url": "",
      "a": "A text record used to store arbitrary data, primarily for domain verification and email authentication."
    },
    {
      "q": "What is a subdomain takeover?",
      "url": "",
      "a": "When a dangling CNAME record points to an inactive service, allowing an attacker to claim it and host content."
    },
    {
      "q": "What is an anycast network?",
      "url": "",
      "a": "A routing technique that routes DNS requests to the nearest physical server in a global network."
    },
    {
      "q": "What is reverse DNS (rDNS)?",
      "url": "",
      "a": "A query that resolves an IP address back to its associated domain name."
    },
    {
      "q": "How does DNS propagation work?",
      "url": "",
      "a": "The time it takes for updated DNS records to spread across recursive resolvers worldwide, dictated by the TTL."
    }
  ],
  "relatedTerms": [
    "whois",
    "spf"
  ],
  "cta": {
    "title": "Analyze DNS Topologies",
    "desc": "Extract A, MX, TXT, and CNAME records to audit domain configurations.",
    "tool": "DNS Lookup",
    "url": "/tools/dns-lookup"
  }
};
