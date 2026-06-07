export const asn = {
  "term": "ASN",
  "title": "Autonomous System Numbers (ASN): The Internet's Routing Backbone",
  "description": "Learn what an Autonomous System Number is, how BGP routing relies on ASNs, and how security researchers use ASNs to map threat infrastructure.",
  "keyTakeaways": [
    "An ASN uniquely identifies an Autonomous System (AS) on the public Internet.",
    "ASNs advertise their IP routing paths to each other using BGP.",
    "Security teams block malicious ASNs to stop large botnets and hosting abuse."
  ],
  "history": {
    "origin": "ASNs were introduced in the late 1980s as the Internet grew beyond a single centralized network, requiring a decentralized routing hierarchy.",
    "evolution": "Originally defined as 16-bit integers, ASNs were expanded to 32-bit values in 2007 (RFC 4893) to prevent address space exhaustion.",
    "adoption": "Every major ISP, cloud provider, and educational institution requires an ASN to peer and route traffic on the global Internet."
  },
  "deepDive": {
    "protocol": "BGP (Border Gateway Protocol) uses ASNs to build path vectors, determining the best route to direct IP prefixes across networks.",
    "architecture": "The Internet routing table is a graph of interconnected ASNs, exchanging routing tables dynamically.",
    "standards": "BGP4 and 32-bit ASNs are defined across RFC 4271 and RFC 6793."
  },
  "security": {
    "attacks": "In BGP Hijacking, a malicious ASN advertises IP prefixes it does not own, stealing routing paths. Route leaks propagate misconfigurations.",
    "threatModel": "Threat models cover traffic interception, DDoS redirection, and route spoofing.",
    "detection": "Detection involves monitoring BGP tables via tools like RouteViews and validating route origins."
  },
  "realWorld": {
    "enterprise": "Enterprises lookup ASNs to map public IP ranges of their business partners and vendors.",
    "incidents": "A BGP hijack redirected traffic intended for a major cryptocurrency site to a server owned by a rogue ASN.",
    "misconfigurations": "An ISP accidentally leaked internal BGP routing tables, causing global congestion and outages."
  },
  "usage": {
    "steps": "Practitioners run WHOIS queries on ASNs (e.g., 'whois -h whois.radb.net AS15169') to audit announced prefixes.",
    "bestPractices": "Deploy RPKI to sign route announcements and configure strict BGP filters."
  },
  "mistakes": {
    "errors": "Failing to register route origin authorizations (ROAs), making routes vulnerable to hijacking.",
    "weaknesses": "Accepting unverified BGP routes from peers without filtering.",
    "troubleshooting": "Use traceroute tools to audit intermediate AS hops."
  },
  "comparisonTable": {
    "title": "ASN vs IP Prefix",
    "headers": [
      "Feature",
      "ASN",
      "IP Prefix"
    ],
    "rows": [
      [
        "Description",
        "Unique number identifying a network operator",
        "A block of IP addresses grouped together"
      ],
      [
        "Example",
        "AS15169 (Google)",
        "8.8.8.0/24 (Google DNS)"
      ],
      [
        "Protocol Use",
        "Used by BGP to find paths",
        "Used by routers to deliver packets"
      ],
      [
        "Registration",
        "Assigned by RIRs",
        "Assigned to ASNs by RIRs"
      ]
    ]
  },
  "references": [
    {
      "title": "RFC 6793 - BGP Support for Four-Octet AS Numbers",
      "url": "https://datatracker.ietf.org/doc/html/rfc6793"
    }
  ],
  "faqs": [
    {
      "q": "What is an ASN?",
      "url": "",
      "a": "Autonomous System Number, a unique identifier for a network routing domain."
    },
    {
      "q": "What is an Autonomous System?",
      "url": "",
      "a": "A collection of IP prefixes managed by a single administrative entity with a common routing policy."
    },
    {
      "q": "Who assigns ASNs?",
      "url": "",
      "a": "Regional Internet Registries (RIRs) like ARIN, RIPE, and APNIC."
    },
    {
      "q": "What is BGP?",
      "url": "",
      "a": "Border Gateway Protocol, the routing protocol used to exchange routing info between ASs."
    },
    {
      "q": "What is BGP Hijacking?",
      "url": "",
      "a": "When a network operator advertises IP ranges it doesn't own, redirecting traffic."
    },
    {
      "q": "What is RPKI?",
      "url": "",
      "a": "Resource Public Key Infrastructure, a cryptographic standard used to secure BGP routes."
    },
    {
      "q": "What is a route leak?",
      "url": "",
      "a": "The propagation of routing announcements beyond their intended boundaries, causing routing loops or congestion."
    },
    {
      "q": "What is a private ASN?",
      "url": "",
      "a": "ASNs reserved for internal use within large private networks, not advertised publicly (ranges 64512-65534)."
    },
    {
      "q": "How do I find a domain's ASN?",
      "url": "",
      "a": "Resolve the domain to an IP, then query an IP-to-ASN mapping database or use our IP Lookup tool."
    },
    {
      "q": "What is peering?",
      "url": "",
      "a": "Direct interconnection between two ASs to exchange traffic, usually without fees."
    },
    {
      "q": "What is transit?",
      "url": "",
      "a": "An agreement where one network operator pays another to carry its traffic to the rest of the Internet."
    },
    {
      "q": "What is an internet exchange point (IXP)?",
      "url": "",
      "a": "A physical location where different networks connect and peer with each other."
    },
    {
      "q": "Why block an ASN?",
      "url": "",
      "a": "To instantly block all traffic originating from hosting providers with poor abuse management (bulletproof hosts)."
    },
    {
      "q": "What is a multi-homed network?",
      "url": "",
      "a": "A network connected to more than one ISP, requiring an ASN to manage BGP routing."
    },
    {
      "q": "What is a 32-bit ASN?",
      "url": "",
      "a": "An expansion of the original 16-bit range, providing billions of unique numbers."
    }
  ],
  "relatedTerms": [
    "ip",
    "dns"
  ],
  "cta": {
    "title": "Map Network Ownership",
    "desc": "Lookup IP addresses to identify their managing Autonomous System, routing prefix, and geolocation.",
    "tool": "IP Lookup",
    "url": "/tools/ip-lookup"
  }
};
