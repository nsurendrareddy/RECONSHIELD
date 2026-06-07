import os
import json

# Output directory
out_dir = "src/utils/glossary"
os.makedirs(out_dir, exist_ok=True)

terms_data = {
  "whois": {
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
      "headers": ["Feature", "WHOIS", "RDAP"],
      "rows": [
        ["Protocol Type", "Plain text over TCP 43", "RESTful HTTP (JSON)"],
        ["Authentication", "None (Public)", "Supported (Role-based access)"],
        ["Localization", "Poor/Ad-hoc", "Built-in multilingual support"],
        ["Rate Limiting", "IP-based blocking", "Standard HTTP rate limits"]
      ]
    },
    "references": [
      { "title": "RFC 3912 - WHOIS Protocol Specification", "url": "https://datatracker.ietf.org/doc/html/rfc3912" },
      { "title": "ICANN WHOIS Policy", "url": "https://whois.icann.org" }
    ],
    "faqs": [
      { "q": "What does WHOIS stand for?", "url": "", "a": "It is not an acronym; it simply asks 'who is' responsible for the domain name." },
      { "q": "Is WHOIS data accurate?", "url": "", "a": "It is supposed to be accurate under ICANN rules, but threat actors frequently use fake or stolen registration credentials." },
      { "q": "How can I check WHOIS data?", "url": "", "a": "You can use command line 'whois' tool or our online WHOIS Lookup Tool." },
      { "q": "What is WHOIS privacy?", "url": "", "a": "A service provided by registrars that replaces your personal contact details in the WHOIS registry with proxy data." },
      { "q": "Why is WHOIS redacted?", "url": "", "a": "The implementation of GDPR in 2018 forced registrars to redact personally identifiable information to avoid heavy fines." },
      { "q": "What is an EPP status code?", "url": "", "a": "Extensible Provisioning Protocol status codes tell you the state of a domain, such as clientTransferProhibited (locked)." },
      { "q": "How does WHOIS help in OSINT?", "url": "", "a": "It helps map out infrastructure, discover related domains registered by the same admin, and trace ownership changes." },
      { "q": "What is RDAP?", "url": "", "a": "Registration Data Access Protocol, the RESTful successor to WHOIS featuring JSON data and query authentication." },
      { "q": "What is the difference between thin and thick WHOIS?", "url": "", "a": "Thin stores only technical data; thick stores registrant contact details alongside technical data." },
      { "q": "What is historical WHOIS?", "url": "", "a": "Archived records capturing WHOIS databases prior to GDPR redaction, highly useful for investigating old domains." },
      { "q": "How often does WHOIS update?", "url": "", "a": "It updates almost instantly when changes are committed to the registrar database, but caches can take 24 hours to clear." },
      { "q": "What is registry lock?", "url": "", "a": "A high-security lock requiring manual verification by the registry operator to make any DNS changes." },
      { "q": "Why does my WHOIS query fail?", "url": "", "a": "Typically due to port 43 rate limits imposed by the registry. Using an API handles this via proxy rotation." },
      { "q": "What are nameservers in WHOIS?", "url": "", "a": "They identify the DNS servers authorized to resolve queries for the domain name." },
      { "q": "Can a domain transfer be blocked?", "url": "", "a": "Yes, by enabling registrar lock (clientTransferProhibited) in the domain control panel." }
    ],
    "relatedTerms": ["dns", "osint"]
  },
  
  "dns": {
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
      "headers": ["Feature", "DNS", "WHOIS"],
      "rows": [
        ["Primary Function", "Maps domains to IP addresses", "Identifies owner and registrar info"],
        ["Data Type", "Resource records (A, CNAME, etc.)", "Contact info and domain lifecycle dates"],
        ["Standard Port", "Port 53 (UDP/TCP)", "Port 43 (TCP)"],
        ["Security Layer", "DNSSEC", "Registry Lock / RDAP auth"]
      ]
    },
    "references": [
      { "title": "RFC 1035 - Domain Names Specification", "url": "https://datatracker.ietf.org/doc/html/rfc1035" },
      { "title": "RFC 4033 - DNS Security Introduction", "url": "https://datatracker.ietf.org/doc/html/rfc4033" }
    ],
    "faqs": [
      { "q": "What is an A record?", "url": "", "a": "An Address record that maps a domain name to an IPv4 address." },
      { "q": "What is a CNAME record?", "url": "", "a": "A Canonical Name record that acts as an alias, pointing one domain to another." },
      { "q": "What does TTL mean?", "url": "", "a": "Time to Live, specifying how many seconds a resolver should cache a DNS record before querying again." },
      { "q": "What is DNS Cache Poisoning?", "url": "", "a": "An exploit where an attacker redirects traffic by injecting false DNS records into a resolver's cache." },
      { "q": "What is DNSSEC?", "url": "", "a": "Security Extensions that use digital signatures to verify the authenticity of DNS records." },
      { "q": "What is a recursive resolver?", "url": "", "a": "A DNS server that handles the lookup process by querying multiple nameservers to find the final IP address." },
      { "q": "What is an authoritative nameserver?", "url": "", "a": "The final DNS server in the chain that holds the actual record database for a domain." },
      { "q": "What is DNS over HTTPS (DoH)?", "url": "", "a": "A protocol that encrypts DNS queries inside HTTPS traffic, enhancing privacy." },
      { "q": "Why is DNS tunneling dangerous?", "url": "", "a": "It allows malware to encode data within DNS requests, bypassing standard network firewalls." },
      { "q": "What is an MX record?", "url": "", "a": "Mail Exchanger record, pointing to the mail server responsible for receiving emails for the domain." },
      { "q": "What is a TXT record?", "url": "", "a": "A text record used to store arbitrary data, primarily for domain verification and email authentication." },
      { "q": "What is a subdomain takeover?", "url": "", "a": "When a dangling CNAME record points to an inactive service, allowing an attacker to claim it and host content." },
      { "q": "What is an anycast network?", "url": "", "a": "A routing technique that routes DNS requests to the nearest physical server in a global network." },
      { "q": "What is reverse DNS (rDNS)?", "url": "", "a": "A query that resolves an IP address back to its associated domain name." },
      { "q": "How does DNS propagation work?", "url": "", "a": "The time it takes for updated DNS records to spread across recursive resolvers worldwide, dictated by the TTL." }
    ],
    "relatedTerms": ["whois", "spf"]
  },

  "spf": {
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
      "headers": ["Feature", "SPF", "DKIM", "DMARC"],
      "rows": [
        ["Authentication Type", "IP-based verification", "Cryptographic signature", "Alignment and policy enforcement"],
        ["Header Checked", "Return-Path", "DKIM-Signature Header", "From Header (visible to user)"],
        ["Handles Forwarding", "Usually fails", "Passes", "Passes if DKIM is aligned"],
        ["Reporting", "None", "None", "Yes (RUA/RUF reports)"]
      ]
    },
    "references": [
      { "title": "RFC 7208 - Sender Policy Framework", "url": "https://datatracker.ietf.org/doc/html/rfc7208" }
    ],
    "faqs": [
      { "q": "What is an SPF record?", "url": "", "a": "A DNS TXT record listing IP addresses authorized to send emails on behalf of a domain." },
      { "q": "What is the 10-lookup limit?", "url": "", "a": "A restriction in the SPF specification preventing resolvers from executing more than 10 DNS queries to validate a record." },
      { "q": "What does ~all mean?", "url": "", "a": "SoftFail: Unauthorized mail is accepted but marked as suspicious." },
      { "q": "What does -all mean?", "url": "", "a": "HardFail: Unauthorized mail should be rejected entirely." },
      { "q": "Can I have two SPF records?", "url": "", "a": "No, publishing multiple SPF records on a single domain invalidates both." },
      { "q": "What is SPF flattening?", "url": "", "a": "The process of resolving domain names in SPF records to their corresponding IP addresses to stay under the 10-lookup limit." },
      { "q": "Why does email forwarding break SPF?", "url": "", "a": "Because the forwarding server's IP is not listed in the original sender's SPF record." },
      { "q": "What is the Return-Path?", "url": "", "a": "The hidden email address used for bounced messages. SPF verifies the domain in this address." },
      { "q": "What is the From header?", "url": "", "a": "The email address visible to the end recipient in their email client." },
      { "q": "Does SPF encrypt mail?", "url": "", "a": "No, SPF is purely an authentication mechanism and does not encrypt email content." },
      { "q": "What is a PermError in SPF?", "url": "", "a": "A permanent error indicating a syntax issue or that the 10-lookup limit has been exceeded." },
      { "q": "What is a TempError?", "url": "", "a": "A temporary error, usually caused by DNS timeout issues during verification." },
      { "q": "What is the ip4 mechanism?", "url": "", "a": "A parameter in SPF records explicitly authorizing a specific IPv4 address or subnet." },
      { "q": "What is the include mechanism?", "url": "", "a": "An SPF parameter that includes another domain's SPF record into your own." },
      { "q": "Is SPF sufficient on its own?", "url": "", "a": "No, SPF must be used with DKIM and DMARC to prevent spoofing of the visible From address." }
    ],
    "relatedTerms": ["dkim", "dmarc"]
  },

  "dkim": {
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
      "headers": ["Feature", "DKIM", "SPF"],
      "rows": [
        ["Authentication Mechanism", "Cryptographic signature", "Sender IP matching"],
        ["DNS Record Location", "selector._domainkey.domain.com", "domain.com (root)"],
        ["Survivability", "Survives email forwarding", "Breaks during email forwarding"],
        ["Tamper Protection", "Protects body and headers", "No content integrity protection"]
      ]
    },
    "references": [
      { "title": "RFC 6376 - DomainKeys Identified Mail (DKIM) Signatures", "url": "https://datatracker.ietf.org/doc/html/rfc6376" }
    ],
    "faqs": [
      { "q": "What is a DKIM selector?", "url": "", "a": "A string used in DNS to identify a specific DKIM public key record, allowing a domain to have multiple keys." },
      { "q": "How does DKIM work?", "url": "", "a": "It hashes the email body and headers, signs it with a private key, and places it in the email header for public verification." },
      { "q": "Is DKIM required?", "url": "", "a": "It is highly recommended and mandatory for bulk email senders sending to Google and Yahoo." },
      { "q": "What is the _domainkey subdomain?", "url": "", "a": "The standard subdomain label where all DKIM public keys must be published in DNS." },
      { "q": "What key size should I use?", "url": "", "a": "Use 2048-bit RSA keys. 1024-bit keys are discouraged and 512-bit keys are insecure." },
      { "q": "Can I have multiple DKIM keys?", "url": "", "a": "Yes, by using different selectors for different email services." },
      { "q": "What is a DKIM replay attack?", "url": "", "a": "An exploit where a signed email is copied and re-sent to other recipients to piggyback on the sender's reputation." },
      { "q": "Does DKIM protect the From header?", "url": "", "a": "Yes, DKIM signs the From header, ensuring it cannot be changed in transit without breaking the signature." },
      { "q": "What is DKIM alignment?", "url": "", "a": "When the domain in the DKIM d= tag matches the domain in the visible From header." },
      { "q": "What is the d= tag?", "url": "", "a": "The parameter in the DKIM header specifying the domain that signed the email." },
      { "q": "What is the s= tag?", "url": "", "a": "The parameter in the DKIM header specifying the selector used to fetch the public key." },
      { "q": "How do I rotate DKIM keys?", "url": "", "a": "Generate a new key pair, publish the new public key under a new selector, switch the signing server, and delete the old key after 30 days." },
      { "q": "What happens if DKIM fails?", "url": "", "a": "Depending on DMARC policy, the email may be delivered normally, marked as spam, or rejected." },
      { "q": "Can DKIM sign attachments?", "url": "", "a": "Yes, since attachments are part of the email body, their hashes are included in the overall DKIM hash." },
      { "q": "Does DKIM verify the actual sender?", "url": "", "a": "It verifies that the domain owner authorized the sending system to sign the message, but it does not authenticate individual users." }
    ],
    "relatedTerms": ["spf", "dmarc"]
  },

  "dmarc": {
    "term": "DMARC",
    "title": "DMARC Explained: Enforcing Domain Reputation",
    "description": "Discover how DMARC ties SPF and DKIM together, provides reporting, and allows organizations to definitively block phishing attacks.",
    "keyTakeaways": [
      "DMARC requires alignment of From headers with SPF and/or DKIM domains.",
      "DMARC policies (none, quarantine, reject) tell receiving servers how to handle failures.",
      "DMARC provides XML feedback reports (RUA/RUF) detailing all sending sources."
    ],
    "history": {
      "origin": "DMARC was drafted in 2012 by an industry consortium (including PayPal, Google, and Microsoft) to solve the limits of SPF and DKIM in blocking domain spoofing.",
      "evolution": "In 2015, the IETF published DMARC as RFC 7489, establishing it as the standard mechanism for domain-level email policy enforcement.",
      "adoption": "DMARC enforcement is now the gold standard for brand protection, required by security compliance standards globally."
    },
    "deepDive": {
      "protocol": "DMARC operates at the DNS layer using a TXT record at '_dmarc.domain.com'. It evaluates the alignment of the visible From header.",
      "architecture": "When an email is received, DMARC checks: 1. Did SPF pass and align? 2. Did DKIM pass and align? If either condition is true, DMARC passes.",
      "standards": "Standardized under RFC 7489, featuring a syntax structure using key-value tags (e.g., p, rua, pct, adim)."
    },
    "security": {
      "attacks": "Prevents direct domain spoofing attacks where threat actors forge the visible From header to pretend to be an organization.",
      "threatModel": "Addresses phishing, brand abuse, and executive impersonation (BEC).",
      "detection": "Monitoring XML reports generated by receiving servers, highlighting unauthorized senders."
    },
    "realWorld": {
      "enterprise": "Enterprises transition from 'p=none' to 'p=reject' over several months to safely secure their outbound mail streams.",
      "incidents": "Organizations lacking DMARC policies are frequently spoofed in massive consumer phishing campaigns.",
      "misconfigurations": "Deploying 'p=reject' too quickly before aligning legitimate marketing servers, resulting in corporate email outages."
    },
    "usage": {
      "steps": "Publish a DMARC TXT record at '_dmarc.domain.com' with 'p=none', monitor reports, align sources, and advance to 'p=reject'.",
      "bestPractices": "Always parse DMARC XML reports using a reporting tool and enforce strict alignment for DKIM."
    },
    "mistakes": {
      "errors": "Using incorrect syntax in the DMARC record, which invalidates the policy.",
      "weaknesses": "Failing to configure a valid email in the RUA tag, leaving the domain owner blind to sending volumes.",
      "troubleshooting": "Check DMARC records via our Email Analyzer and ensure DNS propagation is complete."
    },
    "comparisonTable": {
      "title": "DMARC Policies",
      "headers": ["Policy", "Enforcement Level", "Action on Failure", "Use Case"],
      "rows": [
        ["p=none", "None (Monitoring)", "Delivered to inbox (log only)", "Initial setup and data gathering"],
        ["p=quarantine", "Moderate", "Sent to spam/junk folder", "Testing alignment and staging blocks"],
        ["p=reject", "Maximum", "Blocked at SMTP gateway", "Complete protection against domain spoofing"]
      ]
    },
    "references": [
      { "title": "RFC 7489 - Domain-based Message Authentication, Reporting, and Conformance", "url": "https://datatracker.ietf.org/doc/html/rfc7489" }
    ],
    "faqs": [
      { "q": "What is DMARC?", "url": "", "a": "Domain-based Message Authentication, Reporting, and Conformance, an email security protocol." },
      { "q": "What is DMARC alignment?", "url": "", "a": "The requirement that the domain in the From header matches the domain authenticated by SPF and/or DKIM." },
      { "q": "What is the p= tag?", "url": "", "a": "The policy tag specifying how receivers should handle emails that fail DMARC checks." },
      { "q": "What is the difference between RUA and RUF?", "url": "", "a": "RUA collects aggregate daily XML reports; RUF collects real-time forensic failure samples (often disabled due to privacy)." },
      { "q": "Does DMARC stop all spam?", "url": "", "a": "No, it only stops people from spoofing YOUR domain name. It does not stop spam sent from other domains." },
      { "q": "What is BIMI?", "url": "", "a": "Brand Indicators for Message Identification, showing your logo in verified inboxes if you have a p=reject/quarantine DMARC policy." },
      { "q": "How do I check my DMARC record?", "url": "", "a": "Use our online Email Security Analyzer to verify your DMARC DNS settings." },
      { "q": "What is the pct tag?", "url": "", "a": "Percentage tag, allowing you to apply DMARC policy to a fraction of failing messages (e.g., pct=50)." },
      { "q": "Why did my DMARC fail?", "url": "", "a": "Typically because the sending system failed SPF/DKIM or did not have domain alignment with the From header." },
      { "q": "Can I use DMARC for subdomains?", "url": "", "a": "Yes, using the sp= tag to define policies for subdomains separate from the root domain." },
      { "q": "What is strict vs relaxed alignment?", "url": "", "a": "Relaxed allows subdomains to align with root domains; strict requires an exact domain match." },
      { "q": "Who sends DMARC reports?", "url": "", "a": "Receiving email providers (Google, Microsoft, Yahoo) send aggregate XML reports to your designated RUA address." },
      { "q": "Is DMARC difficult to implement?", "url": "", "a": "Publishing the record is easy, but reaching p=reject without blocking legitimate emails requires careful report analysis." },
      { "q": "Does DMARC check inbound or outbound mail?", "url": "", "a": "You publish DMARC to protect your outbound mail reputation. Receiving servers check it to inspect inbound mail." },
      { "q": "What is the adim tag?", "url": "", "a": "This is a typo; the alignment tags are aspf and adkim, setting strict or relaxed alignment." }
    ],
    "relatedTerms": ["spf", "dkim"]
  },

  "tls": {
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
      "headers": ["Feature", "TLS 1.2", "TLS 1.3"],
      "rows": [
        ["Handshake Time", "2 Round-Trips (2-RTT)", "1 Round-Trip (1-RTT)"],
        ["Cipher Suites Supported", "Over 300 (includes weak ciphers)", "Only 5 (all secure, AEAD ciphers)"],
        ["Zero Round-Trip (0-RTT)", "Not supported", "Supported for resumption"],
        ["Static RSA Key Exchange", "Allowed (vulnerable)", "Removed (PFS mandatory)"]
      ]
    },
    "references": [
      { "title": "RFC 8446 - The Transport Layer Security (TLS) Protocol Version 1.3", "url": "https://datatracker.ietf.org/doc/html/rfc8446" }
    ],
    "faqs": [
      { "q": "What is TLS?", "url": "", "a": "Transport Layer Security, a cryptographic protocol securing network communication." },
      { "q": "Is TLS the same as SSL?", "url": "", "a": "TLS is the modern successor to SSL; SSL is obsolete, but the terms are often used interchangeably." },
      { "q": "What is the TLS handshake?", "url": "", "a": "The initial negotiation process between client and server to agree on ciphers, authenticate identity, and exchange keys." },
      { "q": "What is TLS 1.3?", "url": "", "a": "The latest version of TLS, optimizing speed and security by deprecating weak ciphers and reducing handshake times." },
      { "q": "What are cipher suites?", "url": "", "a": "Combinations of cryptographic algorithms used to establish secure connections." },
      { "q": "What is Perfect Forward Secrecy (PFS)?", "url": "", "a": "A cryptographic property ensuring session keys are unique, meaning past traffic cannot be decrypted even if the server key is compromised." },
      { "q": "What is mTLS?", "url": "", "a": "Mutual TLS, where both client and server verify each other's certificates, commonly used in API gateways." },
      { "q": "What port does TLS use?", "url": "", "a": "By default, HTTPS uses port 443, which encapsulates HTTP traffic inside TLS." },
      { "q": "What is SNI?", "url": "", "a": "Server Name Indication, allowing a client to specify the target domain during the handshake so a server can host multiple sites on one IP." },
      { "q": "What is HSTS?", "url": "", "a": "HTTP Strict Transport Security, forcing browsers to only connect to a site using HTTPS." },
      { "q": "Why is TLS 1.0 insecure?", "url": "", "a": "Because it relies on weak hashing algorithms (MD5/SHA1) and is vulnerable to attacks like BEAST." },
      { "q": "How do I check my server's TLS version?", "url": "", "a": "Use our SSL Checker tool to scan your public-facing ports." },
      { "q": "What is a CA?", "url": "", "a": "Certificate Authority, a trusted third-party entity that issues digital certificates." },
      { "q": "What is an intermediate certificate?", "url": "", "a": "A certificate linking the server's certificate to the Root CA in the chain of trust." },
      { "q": "What happens if a TLS certificate expires?", "url": "", "a": "Browsers will block access to the site with a prominent warning message." }
    ],
    "relatedTerms": ["ssl", "dns"]
  },

  "ssl": {
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
      "headers": ["Feature", "SSL (Legacy)", "TLS (Modern)"],
      "rows": [
        ["Current Status", "Deprecated / Insecure", "Active / Secure"],
        ["Versions", "1.0, 2.0, 3.0", "1.0, 1.1, 1.2, 1.3"],
        ["Handshake Message Authentication", "Uses MAC (message authentication code)", "Uses HMAC (hashed MAC)"],
        ["Downgrade Protection", "Vulnerable to downgrade attacks", "Built-in protection against downgrades"]
      ]
    },
    "references": [
      { "title": "RFC 7568 - Deprecating Secure Sockets Layer Version 3.0", "url": "https://datatracker.ietf.org/doc/html/rfc7568" }
    ],
    "faqs": [
      { "q": "What is SSL?", "url": "", "a": "Secure Sockets Layer, a deprecated cryptographic protocol." },
      { "q": "Why is SSL deprecated?", "url": "", "a": "Due to fundamental design vulnerabilities (like POODLE) that allowed attackers to decrypt secure traffic." },
      { "q": "What is an X.509 certificate?", "url": "", "a": "A standard format for public key certificates, used to manage digital identities in SSL/TLS." },
      { "q": "What is a root certificate?", "url": "", "a": "A public key certificate identifying a root Certificate Authority, pre-installed in OS trust stores." },
      { "q": "What is an intermediate certificate?", "url": "", "a": "A certificate signed by a root CA that is used to sign end-user certificates, protecting the root key." },
      { "q": "What is a self-signed certificate?", "url": "", "a": "A certificate signed by the entity that created it, rather than a trusted CA." },
      { "q": "What is a wildcard certificate?", "url": "", "a": "A certificate that covers a domain and all of its first-level subdomains." },
      { "q": "How long do SSL certificates last?", "url": "", "a": "Public certificates are limited to a maximum validity of 398 days to enforce key rotation." },
      { "q": "What is Let's Encrypt?", "url": "", "a": "A free, automated, and open Certificate Authority providing trusted certificates." },
      { "q": "What is the green address bar?", "url": "", "a": "A legacy browser UI indicator showing that a site possessed an EV (Extended Validation) certificate." },
      { "q": "What is mixed content?", "url": "", "a": "When a secure HTTPS page loads elements (like images) over insecure HTTP connections." },
      { "q": "What is a Certificate Revocation List (CRL)?", "url": "", "a": "A database of revoked certificates maintained by a CA that clients can check." },
      { "q": "What is OCSP?", "url": "", "a": "Online Certificate Status Protocol, a real-time query method to check if a certificate is valid." },
      { "q": "What is a hostname mismatch?", "url": "", "a": "An error occurring when the domain requested does not match any name listed in the certificate." },
      { "q": "How do I fix a broken SSL chain?", "url": "", "a": "Configure your web server to serve the full intermediate certificate file alongside your primary certificate." }
    ],
    "relatedTerms": ["tls", "dns"]
  },

  "asn": {
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
      "headers": ["Feature", "ASN", "IP Prefix"],
      "rows": [
        ["Description", "Unique number identifying a network operator", "A block of IP addresses grouped together"],
        ["Example", "AS15169 (Google)", "8.8.8.0/24 (Google DNS)"],
        ["Protocol Use", "Used by BGP to find paths", "Used by routers to deliver packets"],
        ["Registration", "Assigned by RIRs", "Assigned to ASNs by RIRs"]
      ]
    },
    "references": [
      { "title": "RFC 6793 - BGP Support for Four-Octet AS Numbers", "url": "https://datatracker.ietf.org/doc/html/rfc6793" }
    ],
    "faqs": [
      { "q": "What is an ASN?", "url": "", "a": "Autonomous System Number, a unique identifier for a network routing domain." },
      { "q": "What is an Autonomous System?", "url": "", "a": "A collection of IP prefixes managed by a single administrative entity with a common routing policy." },
      { "q": "Who assigns ASNs?", "url": "", "a": "Regional Internet Registries (RIRs) like ARIN, RIPE, and APNIC." },
      { "q": "What is BGP?", "url": "", "a": "Border Gateway Protocol, the routing protocol used to exchange routing info between ASs." },
      { "q": "What is BGP Hijacking?", "url": "", "a": "When a network operator advertises IP ranges it doesn't own, redirecting traffic." },
      { "q": "What is RPKI?", "url": "", "a": "Resource Public Key Infrastructure, a cryptographic standard used to secure BGP routes." },
      { "q": "What is a route leak?", "url": "", "a": "The propagation of routing announcements beyond their intended boundaries, causing routing loops or congestion." },
      { "q": "What is a private ASN?", "url": "", "a": "ASNs reserved for internal use within large private networks, not advertised publicly (ranges 64512-65534)." },
      { "q": "How do I find a domain's ASN?", "url": "", "a": "Resolve the domain to an IP, then query an IP-to-ASN mapping database or use our IP Lookup tool." },
      { "q": "What is peering?", "url": "", "a": "Direct interconnection between two ASs to exchange traffic, usually without fees." },
      { "q": "What is transit?", "url": "", "a": "An agreement where one network operator pays another to carry its traffic to the rest of the Internet." },
      { "q": "What is an internet exchange point (IXP)?", "url": "", "a": "A physical location where different networks connect and peer with each other." },
      { "q": "Why block an ASN?", "url": "", "a": "To instantly block all traffic originating from hosting providers with poor abuse management (bulletproof hosts)." },
      { "q": "What is a multi-homed network?", "url": "", "a": "A network connected to more than one ISP, requiring an ASN to manage BGP routing." },
      { "q": "What is a 32-bit ASN?", "url": "", "a": "An expansion of the original 16-bit range, providing billions of unique numbers." }
    ],
    "relatedTerms": ["ip", "dns"]
  },

  "osint": {
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
      "headers": ["Feature", "Passive Recon (OSINT)", "Active Recon"],
      "rows": [
        ["Method", "Queries third-party caches", "Sends packets directly to target"],
        ["Logs Generated", "None on target's servers", "Generates logs on target's firewalls/IDS"],
        ["Examples", "Scraping CT logs, Shodan queries", "Nmap scanning, vulnerability probes"],
        ["Risk of Detection", "Zero risk", "High risk of triggering alerts"]
      ]
    },
    "references": [
      { "title": "OSINT Framework", "url": "https://osintframework.com" }
    ],
    "faqs": [
      { "q": "What is OSINT?", "url": "", "a": "Open Source Intelligence, gathering info from public sources." },
      { "q": "Is OSINT legal?", "url": "", "a": "Yes, it only uses public information. However, using that data to hack a system is illegal." },
      { "q": "What is Google Dorking?", "url": "", "a": "Using advanced Google search operators to find hidden files, databases, or configs." },
      { "q": "What is Shodan?", "url": "", "a": "A search engine for internet-connected devices, showing open ports and banners." },
      { "q": "What is passive reconnaissance?", "url": "", "a": "Gathering data without directly interacting with the target system." },
      { "q": "What is active reconnaissance?", "url": "", "a": "Directly probing target systems, creating log entries." },
      { "q": "What is Certificate Transparency?", "url": "", "a": "An open framework logging all public certificates, used to passively find subdomains." },
      { "q": "How do hackers use OSINT?", "url": "", "a": "To map attack surfaces, find unpatched systems, and profile employees for phishing." },
      { "q": "What is HaveIBeenPwned?", "url": "", "a": "A public database tracking breached credential dumps." },
      { "q": "What is DNS harvesting?", "url": "", "a": "Querying DNS servers to compile lists of subdomains and active hosts." },
      { "q": "How can I block OSINT?", "url": "", "a": "You cannot block passive queries on external sites, but you can remove the raw data (e.g., using WHOIS privacy)." },
      { "q": "What is the OSINT Lifecycle?", "url": "", "a": "Planning, collection, processing, analysis, and dissemination." },
      { "q": "What is Maltego?", "url": "", "a": "A link-analysis software used to map relationships between IPs, domains, and people." },
      { "q": "Why is OSINT important for SOCs?", "url": "", "a": "It gives defenders context on what threat actors can see from the outside." },
      { "q": "What is a burner account?", "url": "", "a": "A temporary social media or email account used during investigations to protect the analyst's identity." }
    ],
    "relatedTerms": ["whois", "dns"]
  }
}

# Add CTA details to each term dynamically if not present
cta_data = {
    "whois": { "title": "Trace Domain Infrastructure", "desc": "Run a deep WHOIS scan to uncover hidden registrar details and domain statuses.", "tool": "WHOIS Lookup", "url": "/tools/whois" },
    "dns": { "title": "Analyze DNS Topologies", "desc": "Extract A, MX, TXT, and CNAME records to audit domain configurations.", "tool": "DNS Lookup", "url": "/tools/dns-lookup" },
    "spf": { "title": "Audit Your SPF Configuration", "desc": "Check for syntax errors, lookup limits, and unauthorized includes.", "tool": "Email Security Analyzer", "url": "/tools/email-security" },
    "dkim": { "title": "Validate DKIM Signatures", "desc": "Ensure your public keys are correctly formatted and properly aligned.", "tool": "Email Security Analyzer", "url": "/tools/email-security" },
    "dmarc": { "title": "Check DMARC Enforcement", "desc": "Verify if your domain is protected against executive impersonation.", "tool": "Email Security Analyzer", "url": "/tools/email-security" },
    "tls": { "title": "Audit Server Cryptography", "desc": "Scan your infrastructure for deprecated TLS 1.0 protocols and weak cipher suites.", "tool": "SSL Checker", "url": "/tools/ssl-checker" },
    "ssl": { "title": "Validate Certificate Chains", "desc": "Ensure your server provides the correct intermediate certificates and valid expiration dates.", "tool": "SSL Checker", "url": "/tools/ssl-checker" },
    "asn": { "title": "Map Network Ownership", "desc": "Lookup IP addresses to identify their managing Autonomous System, routing prefix, and geolocation.", "tool": "IP Lookup", "url": "/tools/ip-lookup" },
    "osint": { "title": "Discover Hidden Infrastructure", "desc": "Query Certificate Transparency logs to enumerate exposed subdomains effortlessly.", "tool": "Subdomain Finder", "url": "/tools/subdomain-finder" }
}

for term, data in terms_data.items():
    data["cta"] = cta_data.get(term, { "title": "Analyze Infrastructure", "desc": "Perform deep domain and IP investigations.", "tool": "Scanner", "url": "/tools" })
    
    # Write individual JS file
    filename = os.path.join(out_dir, f"{term}.js")
    with open(filename, "w", encoding="utf-8") as f:
        f.write(f"export const {term} = {json.dumps(data, indent=2)};\n")
    print(f"Generated {filename}")

# Generate the main glossaryData.js file
main_js_content = ""
for term in terms_data.keys():
    main_js_content += f"import {{ {term} }} from './glossary/{term}';\n"

main_js_content += "\nexport const GLOSSARY_TERMS = {\n"
for term in terms_data.keys():
    main_js_content += f"  {term},\n"
main_js_content += "};\n"

main_filename = "src/utils/glossaryData.js"
with open(main_filename, "w", encoding="utf-8") as f:
    f.write(main_js_content)
print(f"Generated {main_filename}")

