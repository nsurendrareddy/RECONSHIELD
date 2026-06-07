export const osint = {
  "term": "OSINT",
  "title": "Open Source Intelligence (OSINT): The Art of Passive Reconnaissance",
  "description": "A comprehensive guide to Open Source Intelligence (OSINT), detailing methodologies, frameworks, and tools used by hackers and defenders to map digital attack surfaces.",
  "keyTakeaways": [
    "OSINT gathers information strictly from public records and third-party databases.",
    "Passive recon avoids direct interaction with the target's servers, leaving no logs.",
    "Certificate Transparency logs are highly effective for passive subdomain enumeration."
  ],
  "history": {
    "origin": "OSINT has roots in national intelligence (e.g., monitoring public foreign broadcasts). In cybersecurity, it emerged in the late 1990s as search engines began indexing exposed corporate systems.",
    "evolution": "Shifted from manual searches to automated threat scraping platforms, utilizing massive databases of indexed port scans and credentials.",
    "adoption": "Now a primary discipline for security teams, penetration testers, and threat analysts to assess external exposure."
  },
  "deepDive": {
    "protocol": "OSINT uses standard application layer protocols (HTTP, DNS, WHOIS) to query third-party search engines, registries, and API databases.",
    "architecture": "Reconnaissance pipelines query platforms like Shodan, crt.sh, and public code repositories to compile target footprints.",
    "standards": "No standard protocol exists, but structured OSINT frameworks guide investigations."
  },
  "security": {
    "attacks": "Threat actors execute OSINT to map targets, identify software versions, locate exposed credentials, and craft targeted spear-phishing campaigns.",
    "threatModel": "The threat model covers public exposure of configurations, passwords, and server locations.",
    "detection": "Detection is difficult because queries target third-party caches. Defenders monitor their own public footprints to identify changes."
  },
  "realWorld": {
    "enterprise": "Enterprises employ continuous attack surface monitoring (EASM) to identify shadow IT assets.",
    "incidents": "An attacker breached an organization by finding API keys accidentally uploaded to a public GitHub repository.",
    "misconfigurations": "Accidentally exposing sensitive cloud storage buckets (.s3.amazonaws.com) containing private data."
  },
  "usage": {
    "steps": "Analysts run tools like Subdomain Finder or scrape Certificate Transparency logs to find subdomains.",
    "bestPractices": "Automate exposure scans, treat code repositories as high-risk, and enforce strict social media sharing policies."
  },
  "mistakes": {
    "errors": "Failing to scan internal repositories before pushing code publicly.",
    "weaknesses": "Over-sharing technical details on public forums and LinkedIn by IT employees.",
    "troubleshooting": "If search limits are reached, rotate API tokens and rotate queries across multiple providers."
  },
  "comparisonTable": {
    "title": "Active vs Passive Recon",
    "headers": [
      "Feature",
      "Passive Recon (OSINT)",
      "Active Recon"
    ],
    "rows": [
      [
        "Method",
        "Queries third-party caches",
        "Sends packets directly to target"
      ],
      [
        "Logs Generated",
        "None on target's servers",
        "Generates logs on target's firewalls/IDS"
      ],
      [
        "Examples",
        "Scraping CT logs, Shodan queries",
        "Nmap scanning, vulnerability probes"
      ],
      [
        "Risk of Detection",
        "Zero risk",
        "High risk of triggering alerts"
      ]
    ]
  },
  "references": [
    {
      "title": "OSINT Framework",
      "url": "https://osintframework.com"
    }
  ],
  "faqs": [
    {
      "q": "What is OSINT?",
      "url": "",
      "a": "Open Source Intelligence, gathering info from public sources."
    },
    {
      "q": "Is OSINT legal?",
      "url": "",
      "a": "Yes, it only uses public information. However, using that data to hack a system is illegal."
    },
    {
      "q": "What is Google Dorking?",
      "url": "",
      "a": "Using advanced Google search operators to find hidden files, databases, or configs."
    },
    {
      "q": "What is Shodan?",
      "url": "",
      "a": "A search engine for internet-connected devices, showing open ports and banners."
    },
    {
      "q": "What is passive reconnaissance?",
      "url": "",
      "a": "Gathering data without directly interacting with the target system."
    },
    {
      "q": "What is active reconnaissance?",
      "url": "",
      "a": "Directly probing target systems, creating log entries."
    },
    {
      "q": "What is Certificate Transparency?",
      "url": "",
      "a": "An open framework logging all public certificates, used to passively find subdomains."
    },
    {
      "q": "How do hackers use OSINT?",
      "url": "",
      "a": "To map attack surfaces, find unpatched systems, and profile employees for phishing."
    },
    {
      "q": "What is HaveIBeenPwned?",
      "url": "",
      "a": "A public database tracking breached credential dumps."
    },
    {
      "q": "What is DNS harvesting?",
      "url": "",
      "a": "Querying DNS servers to compile lists of subdomains and active hosts."
    },
    {
      "q": "How can I block OSINT?",
      "url": "",
      "a": "You cannot block passive queries on external sites, but you can remove the raw data (e.g., using WHOIS privacy)."
    },
    {
      "q": "What is the OSINT Lifecycle?",
      "url": "",
      "a": "Planning, collection, processing, analysis, and dissemination."
    },
    {
      "q": "What is Maltego?",
      "url": "",
      "a": "A link-analysis software used to map relationships between IPs, domains, and people."
    },
    {
      "q": "Why is OSINT important for SOCs?",
      "url": "",
      "a": "It gives defenders context on what threat actors can see from the outside."
    },
    {
      "q": "What is a burner account?",
      "url": "",
      "a": "A temporary social media or email account used during investigations to protect the analyst's identity."
    }
  ],
  "relatedTerms": [
    "whois",
    "dns"
  ],
  "cta": {
    "title": "Discover Hidden Infrastructure",
    "desc": "Query Certificate Transparency logs to enumerate exposed subdomains effortlessly.",
    "tool": "Subdomain Finder",
    "url": "/tools/subdomain-finder"
  }
};
