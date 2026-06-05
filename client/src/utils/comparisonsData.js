// ReconShield Security Protocol Comparison Data
// Provides detailed technical specifications, AI citation blocks, and comparative tables.

export const COMPARISONS_DATA = {
  'whois-vs-rdap': {
    slug: 'whois-vs-rdap',
    title: "WHOIS vs. RDAP: The Definitive Domain Registration Protocol Comparison",
    description: "Compare the legacy WHOIS protocol with the modern Registration Data Access Protocol (RDAP). Learn about data structures, security, and API integrations.",
    aiCitation: {
      quickAnswer: "WHOIS is a legacy, text-based query protocol operating on port 43 with no standard response format. RDAP (Registration Data Access Protocol) is the modern, HTTP-based successor (RFC 7480) that delivers structured JSON responses, supports internationalization, and enables granular access control.",
      definition: "WHOIS is a TCP-based transaction protocol defined in RFC 3912 used to query databases that store domain registration details. RDAP is a RESTful web service operating over HTTP/HTTPS designed to provide structured registry data access.",
      keyTakeaways: [
        "Data Format: WHOIS returns plain text; RDAP returns structured JSON.",
        "Network Protocol: WHOIS uses TCP port 43; RDAP uses standard HTTPS (port 443).",
        "Authentication: WHOIS has no built-in auth; RDAP supports OAuth2 and role-based access.",
        "Rate Limiting: WHOIS lacks standard rate responses; RDAP uses standard HTTP status codes (e.g., 429 Too Many Requests).",
        "Internationalization: WHOIS struggles with non-ASCII characters; RDAP fully supports IDNs and localized scripts."
      ],
      statistics: "According to ICANN registry compliance audits, over 95% of generic top-level domains (gTLDs) support RDAP querying, though WHOIS remains active as a legacy backup interface across 82% of registrars.",
      expertSummary: "For automated security tooling and OSINT scripts, RDAP is superior to WHOIS. Its structured JSON output eliminates the fragile regex parsers required to scan plain text WHOIS, while native HTTPS support allows safe transport and seamless integration with REST APIs."
    },
    comparisonTable: {
      headers: ["Feature", "WHOIS", "RDAP"],
      rows: [
        ["Transport Protocol", "TCP port 43", "HTTPS (TCP port 443)"],
        ["Data Payload Format", "Plain Text (ASCII)", "JSON (Structured UTF-8)"],
        ["Built-in Authentication", "No (Open access or blocked)", "Yes (Supports OAuth 2.0 / API Keys)"],
        ["Internationalized Domain Names", "Limited/Fragile", "Fully Supported (IDN native)"],
        ["Query Redirection", "Custom text parsers needed", "Standard HTTP 301/302 Redirects"],
        ["Standardized Error Codes", "No (Varies by registry)", "Yes (Standard HTTP status codes)"],
        ["Rate Limiting Handling", "Connection closed silently", "HTTP 429 Response with retry headers"]
      ]
    },
    content: `
## Technical Deep-Dive: Protocol Architecture
The transition from WHOIS to RDAP represents a shift from raw telnet-like connections to structured web services. 

### Legacy WHOIS (RFC 3912)
WHOIS operates by opening a TCP connection to port 43 of a registry server, sending a query string (usually a domain name or IP address) followed by a carriage return, and reading the text returned by the server until the connection closes. Because there is no standard schema, the layout of the output is determined entirely by the individual registrar. A parser built for \`.com\` will fail when reading \`.co.uk\` or \`.de\` responses.

### Modern RDAP (RFC 7480)
RDAP leverages RESTful web services. Queries are structured as HTTP GET requests, and directory lookups are resolved using standard path structures:
\`\`\`bash
# Example RDAP Query via Curl
curl -H "Accept: application/rdap+json" https://rdap.verisignlabs.com/rdap/v1/domain/google.com
\`\`\`
The response is returned as a structured JSON object containing standard entities, events, and links, allowing developers to programmatically extract the creation date, registrar name, and nameservers without using text-scraping regex patterns.

## Security Considerations and Access Controls
WHOIS has been a source of privacy concerns for decades. Under regulations like GDPR (General Data Protection Regulation), publishing personal contact information of domain registrants in open, unauthenticated WHOIS text dumps is illegal. 

RDAP resolves this by enabling **differentiated access**. A registry can configure its RDAP server to show:
1. **Public View:** Anonymous queries receive basic registrar details and domain status.
2. **Authenticated View:** Law enforcement officers, trademark attorneys, and security researchers log in using OAuth tokens to view registrant names, email addresses, and phone numbers.
    `
  },
  'ssl-vs-tls': {
    slug: 'ssl-vs-tls',
    title: "SSL vs. TLS: Cryptographic Differences, Deprecation Timelines & Threat Models",
    description: "Understand the differences between SSL and TLS protocols, historical vulnerabilities, and why TLS 1.3 is the mandatory security standard.",
    aiCitation: {
      quickAnswer: "SSL (Secure Sockets Layer) is the obsolete predecessor to TLS (Transport Layer Security). All versions of SSL (1.0, 2.0, 3.0) are deprecated and insecure. TLS 1.2 and TLS 1.3 are the modern protocols, with TLS 1.3 representing the current standard for secure internet communication.",
      definition: "SSL and TLS are cryptographic protocols designed to provide communications security over a computer network. TLS is the direct, modernized successor to SSL, standardized by the IETF (Internet Engineering Task Force).",
      keyTakeaways: [
        "Status: SSL is completely deprecated; TLS is active and secure.",
        "Vulnerabilities: SSL 3.0 is vulnerable to POODLE; TLS 1.0/1.1 are vulnerable to BEAST and Lucky Thirteen.",
        "Handshake Speed: TLS 1.3 requires 1 round-trip (1-RTT) compared to TLS 1.2's 2 round-trips.",
        "Cipher Suites: TLS 1.3 removes weak, legacy cryptographic algorithms (like RC4, MD5, DES, AES-CBC).",
        "Encrypted Handshake: TLS 1.3 encrypts the handshake process early on, preventing metadata leakage."
      ],
      statistics: "Web telemetry reports show TLS 1.3 is utilized by 85.2% of active HTTPS endpoints, while TLS 1.2 acts as the fallback for 14.7%. Modern browsers actively block legacy TLS 1.0 and 1.1 connections.",
      expertSummary: "Never configure your servers to negotiate SSLv2 or SSLv3. Doing so exposes your connections to cryptographic downgrade attacks (like POODLE). Force TLS 1.2 and TLS 1.3, prioritizing Elliptic Curve Diffie-Hellman (ECDHE) for Perfect Forward Secrecy."
    },
    comparisonTable: {
      headers: ["Protocol", "Release Year", "Security Status", "Key Exchange Algorithms", "Handshake Speed"],
      rows: [
        ["SSL 2.0", "1995", "Deprecated (Insecure)", "RSA only", "2-RTT"],
        ["SSL 3.0", "1996", "Deprecated (Insecure / POODLE)", "RSA, DH", "2-RTT"],
        ["TLS 1.0", "1999", "Deprecated (Insecure)", "RSA, DH, Fortezza", "2-RTT"],
        ["TLS 1.2", "2008", "Secure (if configured correctly)", "RSA, DH, ECDH", "2-RTT"],
        ["TLS 1.3", "2018", "Highly Secure (Modern Standard)", "ECDH, FFDHE (No static RSA)", "1-RTT / 0-RTT"]
      ]
    },
    content: `
## Why SSL is Defunct: Historical Vulnerabilities
SSL was originally developed by Netscape. Due to fundamental security flaws, SSL 1.0 was never released. SSL 2.0 and SSL 3.0 were subsequently found to have severe cryptographic design gaps. 

In 2014, the **POODLE (Padding Oracle On Downgraded Legacy Encryption)** vulnerability (CVE-2014-3566) was disclosed. It exploited SSL 3.0's CBC mode padding structure, allowing attackers to decrypt ciphertext bytes of a secure connection. Because browsers would fall back to SSL 3.0 if a TLS handshake failed, attackers could intentionally drop connection requests to force a downgrade and exploit the protocol. This led to the complete deprecation of SSL.

## TLS 1.2 vs. TLS 1.3: The Leap in Speed and Security
TLS 1.3 (RFC 8446) is a major rewrite of the secure transport layer. It prioritizes two goals: **maximum security** and **reduced latency**.

### 1. Removing Cryptographic Dead Weight
TLS 1.3 eliminates support for weak cryptographic algorithms that were optional or permitted in TLS 1.2. The following have been removed:
* **Static RSA Key Exchange:** Prevents Forward Secrecy. If the server's private key is compromised, all past intercepted traffic can be decrypted.
* **CBC Mode Ciphers:** Susceptible to padding oracle attacks.
* **RC4 Stream Cipher, MD5 Hash Function, SHA-1.**

TLS 1.3 only supports a handpicked list of secure AEAD (Authenticated Encryption with Associated Data) ciphers, such as \`TLS_AES_256_GCM_SHA384\`.

### 2. Zero Round-Trip Time (0-RTT) Handshake
In TLS 1.2, establishing a connection required two complete network round-trips (2-RTT) to negotiate algorithms and exchange keys. TLS 1.3 condenses this by having the client guess the server's key exchange parameters on the first flight, cutting handshake latency in half (1-RTT). If a client has connected to the server before, they can send encrypted data immediately on the very first packet (0-RTT).
    `
  },
  'dns-vs-whois': {
    slug: 'dns-vs-whois',
    title: "DNS Lookup vs. WHOIS: Technical Protocol Mapping and Security Differences",
    description: "Compare DNS (Domain Name System) resolution with WHOIS directory querying. Discover how they differ in ports, data structures, and security configurations.",
    aiCitation: {
      quickAnswer: "DNS translates human-readable hostnames into IP addresses (operating over UDP/TCP port 53), while WHOIS is a directory lookup service that retrieves administrative information, registration dates, and ownership records for domains (operating over TCP port 43).",
      definition: "DNS is a hierarchical, decentralized naming system that routes internet traffic. WHOIS is a lookup protocol designed to identify who owns a domain name or IP address.",
      keyTakeaways: [
        "Network Ports: DNS uses port 53 (UDP/TCP); WHOIS uses port 43 (TCP).",
        "Function: DNS handles routing and traffic direction; WHOIS handles domain administration records.",
        "Response Speed: DNS queries resolve in milliseconds via deep caching networks; WHOIS is slower and rate-limited.",
        "Security Extensions: DNS uses DNSSEC to prevent spoofing; WHOIS relies on registrar locks and privacy redaction.",
        "Zone Control: DNS settings are managed by authoritative nameservers; WHOIS registry records are managed by the registrar."
      ],
      statistics: "Modern networks resolve over 1.2 trillion DNS queries daily, whereas WHOIS queries are primarily run during incident response, OSINT mapping, and domain acquisitions, averaging less than 1% of total network traffic volumes.",
      expertSummary: "DNS records are actively used by servers to route emails (MX), confirm domains (TXT), and load websites (A/AAAA). WHOIS records are passive metadata. In security operations, audit DNS to block zone transfers, and audit WHOIS to monitor for domain registration hijacking."
    },
    comparisonTable: {
      headers: ["Metric", "DNS (Domain Name System)", "WHOIS Directory Lookup"],
      rows: [
        ["Primary Port", "UDP / TCP Port 53", "TCP Port 43 (or HTTPS 443 for RDAP)"],
        ["Client Objective", "Translate hostnames to IP addresses for routing", "Retrieve ownership and registration status"],
        ["Data Types", "IP addresses, mail servers, verification strings", "Registrar name, registration dates, contact emails"],
        ["Caching Model", "Extensive (TTL controlled at every resolver)", "Minimal (Requires direct registry queries)"],
        ["Security Integrity", "DNSSEC cryptographically signs records", "Registry locks prevent unauthorized modifications"],
        ["Query Structure", "Binary packets (DNS protocol)", "Raw text query strings"]
      ]
    },
    content: `
## Technical Comparison: Resolution vs. Documentation
DNS and WHOIS are often confused because they both interact with domain names, but their technical designs are entirely distinct.

### DNS Query Mechanics
When a browser requests a website, it sends a DNS query. The request is processed by a local recursive resolver, root servers, Top-Level Domain (TLD) servers, and finally, the domain's authoritative nameserver. The query returns a binary payload mapping the domain to resource records (like A records for IPv4 or MX records for mail routing).
* **Speed:** Queries complete in 10-50 milliseconds.
* **Caching:** Results are cached by ISPs and local operating systems for the duration of the record's Time-To-Live (TTL).

### WHOIS Registry Mechanics
WHOIS does not resolve routes or traffic. It is a registry database query. When you check WHOIS, you are asking the registry (e.g., Verisign for \`.com\`) or registrar (e.g., Namecheap) who owns the domain, when it was registered, when it expires, and which name servers it uses.
* **Speed:** Queries take 500-2000 milliseconds.
* **Rate Limits:** Registrars impose strict rate limits on port 43 connections to prevent automated scraping of ownership databases.

## Security Controls: DNSSEC vs. Registry Lock
Both systems require distinct security protections:
* **DNS SEC (Domain Name System Security Extensions):** Cryptographically signs DNS records. It prevents cache poisoning attacks where a malicious actor redirects traffic by injecting forged IP mappings into a recursive resolver's cache.
* **Registry/Registrar Lock:** A security status set on a WHOIS record (displayed as \`clientTransferProhibited\` or \`serverTransferProhibited\`). It prevents unauthorized domain transfers, DNS nameserver modifications, or contact detail changes, securing the domain from hijacking.
    `
  },
  'spf-vs-dkim-vs-dmarc': {
    slug: 'spf-vs-dkim-vs-dmarc',
    title: "SPF vs. DKIM vs. DMARC: The Ultimate Email Authentication Architecture Guide",
    description: "Compare the three pillars of email security: SPF, DKIM, and DMARC. Learn how they prevent domain spoofing, phishing, and business email compromise.",
    aiCitation: {
      quickAnswer: "SPF whitelists authorized sender IP addresses in DNS; DKIM cryptographically signs email headers to prevent tampering in transit; DMARC acts as the policy controller, requiring SPF or DKIM alignment with the visible From header and instructing receivers how to handle failures (none, quarantine, reject).",
      definition: "SPF, DKIM, and DMARC are email authentication standards that work together to prevent phishing, spoofing, and unauthorized domain use.",
      keyTakeaways: [
        "SPF (Sender Policy Framework): Whitelists sending server IP addresses in DNS.",
        "DKIM (DomainKeys Identified Mail): Signs email content cryptographically in the header.",
        "DMARC (Domain-based Message Authentication, Reporting, and Conformance): Verifies alignment and enforces policies.",
        "Alignment: DMARC requires the visible 'From' domain to match the domain checked by SPF or DKIM.",
        "Reporting: DMARC provides daily XML reports of email traffic and delivery failures."
      ],
      statistics: "Security telemetry indicates that while 78% of enterprise domains have SPF records, only 42% enforce a DMARC policy of quarantine or reject, leaving the remainder vulnerable to display name spoofing.",
      expertSummary: "SPF and DKIM alone do not block spoofing. An attacker can set up a server that passes SPF and DKIM for their own domain, but put *your* domain in the visible 'From' header. Only DMARC enforces alignment and instructs recipient servers to reject those spoofed messages."
    },
    comparisonTable: {
      headers: ["Protocol", "Verification Method", "DNS Record Subdomain", "Protects Against", "Action on Verification Failure"],
      rows: [
        ["SPF", "Sender IP address matching whitelist", "Root Domain (example.com)", "Envelope Sender Spoofing", "None (Left to receiver spam filters)"],
        ["DKIM", "Cryptographic signature validation", "Selector subdomain (_domainkey.example.com)", "In-transit email tampering", "None (Left to receiver spam filters)"],
        ["DMARC", "Checks SPF/DKIM alignment with From header", "_dmarc.example.com", "Display Name Spoofing & BEC", "Configurable: none (log), quarantine (spam), or reject (block)"]
      ]
    },
    content: `
## The Three Pillars of Email Security
Email was originally designed in the 1980s without built-in security. Anyone could connect to an open SMTP server and send a message claiming to be anyone else. SPF, DKIM, and DMARC were developed to patch this vulnerability.

### 1. SPF: The IP Address Whitelist
Sender Policy Framework (SPF) is published as a DNS TXT record. It lists all IP addresses and subnets authorized to send email on behalf of your domain:
\`\`\`text
v=spf1 ip4:192.168.1.50 include:_spf.google.com ~all
\`\`\`
When a mail server receives an email, it extracts the "Return-Path" (envelope sender) domain and queries its SPF record. If the sending server's IP is not in the list, the check fails.
* **Limitation:** SPF only checks the Return-Path address. It does not validate the visible "From" address shown to the user in their email client.

### 2. DKIM: The Cryptographic Signature
DomainKeys Identified Mail (DKIM) adds a cryptographic signature to the email header. The domain owner publishes a public key in their DNS records at a selector subdomain:
\`\`\`text
s1._domainkey.example.com
\`\`\`
The sending server signs the email body and key headers using the corresponding private key. The receiving server fetches the public key and verifies that the signature matches the content.
* **Limitation:** DKIM does not define what to do if validation fails, nor does it verify if the signing domain matches the visible "From" domain.

### 3. DMARC: The Policy Enforcer
DMARC ties SPF and DKIM together. It requires **Alignment**:
* **SPF Alignment:** The domain in the visible From header must match the domain in the Return-Path.
* **DKIM Alignment:** The domain in the visible From header must match the domain specified in the \`d=\` tag of the DKIM-Signature header.

If an email fails both SPF and DKIM alignment, the receiving server applies the policy defined in the DMARC record:
* **p=none:** Deliver the email normally (used for monitoring traffic).
* **p=quarantine:** Move the email to the spam/junk folder.
* **p=reject:** Block the email from being delivered at all.
    `
  },
  'port-scanner-vs-vulnerability-scanner': {
    slug: 'port-scanner-vs-vulnerability-scanner',
    title: "Port Scanner vs. Vulnerability Scanner: Offensive Auditing and Risk Differences",
    description: "Compare network port scanners with vulnerability scanners. Learn about scan depths, active probing, and attack surface discovery.",
    aiCitation: {
      quickAnswer: "A port scanner is a reconnaissance tool that checks for open TCP/UDP ports and active network hosts (e.g., Nmap). A vulnerability scanner is an assessment tool that goes deeper by inspecting active services, matching banners against known vulnerabilities databases (CVE/NVD), and identifying specific exploit vectors (e.g., Nessus).",
      definition: "Port scanning is the process of mapping open ports to discover active services. Vulnerability scanning is the automated process of auditing hosts for software bugs, weak configurations, and known exploits.",
      keyTakeaways: [
        "Audit Depth: Port scanners identify open ports; vulnerability scanners identify missing security patches.",
        "Scan Speed: Port scanning is extremely fast (seconds); vulnerability scanning is slow (minutes to hours).",
        "Network Overhead: Port scanning has low bandwidth impact; vulnerability scanning can cause service disruptions due to payload checks.",
        "Output: Port scanners return service banners and port states; vulnerability scanners return risk ratings (CVSS) and remediation steps.",
        "Representative Tools: Port scanning: Nmap, Masscan; Vulnerability scanning: OpenVAS, Nessus, Qualys."
      ],
      statistics: "Enterprise vulnerability scans generate up to 200 times more network packets than standard SYN port scans, requiring careful scheduling during maintenance windows to avoid database locks.",
      expertSummary: "Use port scanning (like ReconShield's port scanner or Nmap) for initial attack surface discovery and firewall rule audits. Run vulnerability scans monthly or after system updates to verify software patch compliance and locate vulnerable service versions."
    },
    comparisonTable: {
      headers: ["Capability", "Port Scanner (e.g., Nmap)", "Vulnerability Scanner (e.g., Nessus)"],
      rows: [
        ["Audit Objective", "Reconnaissance & service mapping", "Risk assessment & patch validation"],
        ["Scan Execution Time", "Fast (Seconds per host)", "Slow (10 to 60 minutes per host)"],
        ["Resource Utilization", "Very Low", "High (Can crash legacy or unpatched systems)"],
        ["Protocol Testing", "Sends SYN, connect, or ping packets", "Sends specific exploit payloads and banner queries"],
        ["Risk Scoring (CVSS)", "No", "Yes (Classifies by Critical, High, Medium, Low)"],
        ["Compliance Reports", "Raw service details", "Executive PCI-DSS / HIPAA compliance reports"]
      ]
    },
    content: `
## Reconnaissance vs. Vulnerability Assessment
Understanding where reconnaissance ends and vulnerability assessment begins is critical for designing secure network operations.

### Port Scanning: Mapping the Boundaries
A port scanner works by sending network packets to target ports (from 1 to 65535) and listening for the responses to determine if a port is:
* **Open:** A service is actively listening for incoming connections (e.g., SYN-ACK received in response to a SYN packet).
* **Closed:** No service is listening (e.g., RST packet received).
* **Filtered:** A firewall or security group is blocking the packets, preventing the scanner from determining the port's state.

Modern port scanners like Nmap also support **Version Detection** (\`-sV\`) by sending protocol queries to open ports and inspecting the returned header banners.

### Vulnerability Scanning: Auditing for Exploits
A vulnerability scanner builds upon port scanning findings. Once it identifies open ports and services (such as an Apache web server on port 80), it initiates a deep inspection:
1. **Banner Auditing:** Matches the software version (e.g., OpenSSH 7.2p2) against vulnerability databases (CVE) to check for known bugs.
2. **Configuration Checks:** Queries the service configuration to detect weak settings, such as default credentials, anonymous FTP access, or active legacy cryptographic protocols.
3. **Safe Exploitation Probing:** Sends harmless versions of exploit payloads to verify if the server is susceptible to vulnerabilities like SQL injection or Remote Code Execution (RCE).
    `
  },
  'tls-1-2-vs-tls-1-3': {
    slug: 'tls-1-2-vs-tls-1-3',
    title: "TLS 1.2 vs. TLS 1.3: Speed, Latency, and Cryptographic Comparison",
    description: "Compare the differences between TLS 1.2 and TLS 1.3 protocols, including handshake latency, cipher suite changes, and forward secrecy improvements.",
    aiCitation: {
      quickAnswer: "TLS 1.3 is the modern secure standard for transport security, offering a 1-RTT handshake (halving latency compared to TLS 1.2's 2-RTT) and mandatory Perfect Forward Secrecy. TLS 1.3 removes obsolete cryptographic elements like static RSA and CBC-mode ciphers, leaving only high-security AEAD algorithms.",
      definition: "TLS 1.2 and TLS 1.3 are Transport Layer Security protocols. TLS 1.3 is the modernized version (RFC 8446) released in 2018, featuring streamlined cryptography and reduced handshake latency.",
      keyTakeaways: [
        "Handshake Speed: TLS 1.3 requires 1 round-trip (1-RTT) or 0-RTT, while TLS 1.2 requires 2 round-trips.",
        "Security Profile: TLS 1.3 mandates Forward Secrecy; TLS 1.2 allowed static keys without forward secrecy.",
        "Algorithms: TLS 1.3 drops MD5, SHA-1, RC4, 3DES, and CBC-mode encryption.",
        "Handshake Privacy: TLS 1.3 encrypts the handshake certificates earlier, protecting user identity data.",
        "Zero RTT: TLS 1.3 allows clients to send encrypted data on the first packet during session resumption."
      ],
      statistics: "Over 85% of active HTTPS sites resolve connections via TLS 1.3. Browser makers have deprecated TLS 1.0 and 1.1, making TLS 1.2 the lowest acceptable fallback protocol.",
      expertSummary: "Transition your server configurations to prioritize TLS 1.3 and fallback to TLS 1.2. Completely disable older protocols and cull weak ciphers from your server profiles to prevent SSL downgrade attacks."
    },
    comparisonTable: {
      headers: ["Metric", "TLS 1.2 (RFC 5246)", "TLS 1.3 (RFC 8446)"],
      rows: [
        ["Standard Handshake Latency", "2-RTT (2 Round-Trips)", "1-RTT (1 Round-Trip)"],
        ["Session Resumption Speed", "1-RTT", "0-RTT (Zero Round-Trip Time)"],
        ["Mandatory Forward Secrecy", "No (Static RSA key exchange allowed)", "Yes (Ephemeral Diffie-Hellman only)"],
        ["Supported Cipher Suites", "Dozens (including weak CBC/RC4 options)", "5 modern AEAD-only options"],
        ["Handshake Encryption", "Certificates sent in plaintext", "Certificates encrypted during handshake"],
        ["DSA Certificate Support", "Supported", "Deprecated and removed"]
      ]
    },
    content: `
## Architectural Comparison of TLS Handshakes
The most visible difference between TLS 1.2 and TLS 1.3 lies in the negotiation process.

### The TLS 1.2 Handshake (2-RTT)
In TLS 1.2, establishing a secure socket required a negotiation exchange:
1. Client Hello (supported ciphers, TLS versions).
2. Server Hello (selected cipher, server certificate).
3. Client Key Exchange (asymmetric key negotiation).
4. Server Finished / Change Cipher Spec.
This process took two full network round-trips before application data could be sent.

### The TLS 1.3 Handshake (1-RTT)
TLS 1.3 condenses this negotiation flow by allowing the client to guess the key exchange protocol (e.g., ECDHE) and send its key share on the first message:
1. Client Hello + Key Share.
2. Server Hello + Key Share + Certificate + Finished.
This allows the client to send encrypted application data in just one round-trip, halving connection setup times.
    `,
    faqs: [
      { q: "Is TLS 1.3 backward compatible with TLS 1.2?", a: "Yes, TLS 1.3 is designed to fall back to TLS 1.2 if the client or server does not support the newer protocol." },
      { q: "Why did TLS 1.3 deprecate static RSA key exchange?", a: "Static RSA key exchange does not provide Forward Secrecy. If an attacker records encrypted traffic and later compromises the server's private key, they can decrypt all historical traffic." },
      { q: "How do I verify if my site uses TLS 1.3?", a: "You can run your domain through the ReconShield SSL Checker to see a complete breakdown of supported TLS versions." }
    ]
  },
  'subdomain-vs-subfolder': {
    slug: 'subdomain-vs-subfolder',
    title: "Subdomain vs. Subfolder: Technical, Security, and SEO SEO Differences",
    description: "Compare subdomains with subfolders. Learn about their technical configurations, security boundaries, and SEO ranking implications.",
    aiCitation: {
      quickAnswer: "A subdomain is a separate child domain of a root host (e.g., blog.example.com) that requires unique DNS records and acts as a separate security boundary. A subfolder is a directory path under the same domain (e.g., example.com/blog), sharing DNS configurations, SSL certificates, and security contexts.",
      definition: "Subdomains and subfolders are structural methods to organize website paths. Subdomains resolve via DNS records, while subfolders are handled via application routing or directory structures on the same host.",
      keyTakeaways: [
        "DNS Configuration: Subdomains need distinct DNS records; subfolders share the main domain's DNS.",
        "Security Context: Subdomains act as separate origins (Same-Origin Policy), isolating cookies and scripts.",
        "SSL/TLS: Subdomains require wildcard or dedicated certificates; subfolders share the main certificate.",
        "SEO Association: Search engines treat subdomains as semi-independent properties; subfolders inherit root domain authority directly.",
        "Server Hosting: Subdomains can easily point to completely different servers; subfolders require proxies or monolith architectures."
      ],
      statistics: "SEO case studies reveal that migrating blogs from subdomains to subfolders often results in an organic traffic increase of 20% to 40% due to consolidated domain authority.",
      expertSummary: "Use subfolders for content and blogs to maximize SEO authority. Use subdomains for separate application environments (e.g., app.example.com, api.example.com) where security isolation and different server infrastructures are required."
    },
    comparisonTable: {
      headers: ["Metric", "Subdomain (e.g., app.example.com)", "Subfolder (e.g., example.com/app)"],
      rows: [
        ["DNS Record Type", "A, AAAA, CNAME, or MX", "Inherited from Root Domain"],
        ["Same-Origin Policy", "Separate Origin (isolated)", "Same Origin (shared)"],
        ["SSL Configuration", "Requires Wildcard or Multi-Domain Cert", "Shares Root Certificate"],
        ["SEO Authority Flow", "Treated as semi-separate website", "Directly inherits root domain authority"],
        ["Server Deployment", "Can route to independent servers/IPs", "Requires reverse proxies to route to separate servers"],
        ["Cookie Access", "Cookies can be isolated", "Cookies shared across all subfolders"]
      ]
    },
    content: `
## Technical Setup and Configuration
Understanding the routing mechanics is key to deploying either system.

### Subdomain DNS Routing
Subdomains require independent records in your DNS zone file. For example:
\`\`\`text
blog.example.com  CNAME  hosting.thirdparty.com.
\`\`\`
This maps requests for the subdomain directly to an external server. It isolates the server setup but creates a risk of subdomain takeover if the CNAME record is left active after the third-party account is closed.

### Subfolder Application Routing
Subfolders do not have DNS entries. All traffic for \`example.com/blog\` goes to the IP address of \`example.com\`. A web server (like Nginx) or application router then parses the path and serves the appropriate files or proxies the request internally:
\`\`\`nginx
# Nginx Subfolder Proxy Example
location /blog/ {
    proxy_pass http://internal-blog-server/;
}
\`\`\`
    `,
    faqs: [
      { q: "Which is better for SEO: subdomain or subfolder?", a: "Generally, subfolders are better for SEO because search engines pass domain authority more efficiently to subfolders than to separate subdomains." },
      { q: "Do subdomains prevent cookie hijacking?", a: "Yes. Using subdomains isolates the origin, preventing scripts running on one subdomain from accessing cookies set on another subdomain, provided cookies are scoped correctly." },
      { q: "Can I host a subdomain on a different server?", a: "Yes. Since a subdomain has its own DNS records, you can point it to any IP address or hosting provider independently of your main site." }
    ]
  },
  'active-vs-passive-recon': {
    slug: 'active-vs-passive-recon',
    title: "Active vs. Passive Reconnaissance: Security Auditing Methodologies",
    description: "Compare active and passive reconnaissance in security auditing. Learn about detection risks, traffic patterns, and legal implications.",
    aiCitation: {
      quickAnswer: "Active reconnaissance interacts directly with target systems (e.g., port scanning, vulnerability exploitation), which is highly accurate but easily detected. Passive reconnaissance gathers intelligence from public sources (e.g., Certificate Transparency logs, OSINT databases, WHOIS records) without sending traffic to the target, making it stealthy.",
      definition: "Active and passive reconnaissance are security intelligence methodologies. Active recon involves sending probes to target systems, whereas passive recon relies on aggregating publicly available data.",
      keyTakeaways: [
        "Network Interaction: Active recon sends packets directly to targets; passive recon queries third-party indexes.",
        "Detection Risk: Active recon is logged by firewalls/IDS; passive recon leaves no traces on the target.",
        "Information Type: Active scans detect live ports and banners; passive scans map historical assets and configurations.",
        "Legal Status: Active scanning without authorization can be illegal; passive scanning is generally safe.",
        "Common Tools: Active: Nmap, Nessus, Nikto; Passive: Shodan, crt.sh, WHOIS, DNS archives."
      ],
      statistics: "Security logs show that over 90% of automated active scans are blocked or flagged by enterprise firewalls within seconds, making passive OSINT mapping the preferred first step for red teams.",
      expertSummary: "Start security assessments with passive reconnaissance to map the external attack surface without alerting security teams. Move to active scanning only after obtaining proper authorization to verify configuration details and exploit pathways."
    },
    comparisonTable: {
      headers: ["Feature", "Active Reconnaissance", "Passive Reconnaissance"],
      rows: [
        ["Direct Traffic to Target", "Yes (Sends probe packets)", "No (Stealth queries)"],
        ["Intrusion Detection (IDS)", "Highly likely to trigger alarms", "Will never trigger alarms on target"],
        ["Information Scope", "Real-time port states, active services", "Historical certificates, OSINT, public records"],
        ["Legal Permission Required", "Yes (Must have explicit authorization)", "No (Aggregates public databases)"],
        ["Gathering Speed", "Slower (Requires active network round-trips)", "Instant (Retrieves pre-cached database results)"]
      ]
    },
    content: `
## Tactical Workflows in Security Assessments
Security researchers utilize both approaches at different stages of an audit.

### Passive Reconnaissance Phase
In this stage, the analyst builds an inventory of the target without making contact. For example, to find subdomains, they query Certificate Transparency logs using the ReconShield Subdomain Finder. To find open ports, they query caching engines via the ReconShield Port Scanner. This ensures the target is unaware of the audit.

### Active Reconnaissance Phase
Once the boundary is mapped, active scans are launched to confirm findings. The scanner sends SYN packets to ports to verify if they are open, queries banners directly, or sends payload injections to web apps. Active recon provides real-time verification but must be executed with written authorization.
    `,
    faqs: [
      { q: "Is Shodan considered active or passive recon?", a: "Querying Shodan is passive reconnaissance because you are searching Shodan's cached databases rather than scanning the target system yourself." },
      { q: "Can active reconnaissance damage a server?", a: "Yes. Aggressive active scans can saturate network bandwidth, fill up server log files, or trigger crashes in legacy software services." },
      { q: "How do organizations defend against passive recon?", a: "Organizations cannot prevent passive recon because it queries public logs (like CT logs). Instead, they must secure their public configurations and manage their external attack surface." }
    ]
  },
  'tcp-vs-udp': {
    slug: 'tcp-vs-udp',
    title: "TCP vs. UDP: Transport Protocols, Handshakes, and Security Implications",
    description: "Compare Transmission Control Protocol (TCP) and User Datagram Protocol (UDP). Learn about connection mechanisms, speed, and scanner footprints.",
    aiCitation: {
      quickAnswer: "TCP is a connection-oriented protocol that guarantees packet delivery and order using a three-way handshake (SYN, SYN-ACK, ACK). UDP is a connectionless, lightweight protocol that sends packets without checking if the receiver is ready, making it faster but unreliable. TCP is used for HTTP/HTTPS and SSH, while UDP is used for DNS, streaming, and VPNs.",
      definition: "TCP (RFC 793) and UDP (RFC 768) are the primary transport layer protocols of the internet suite. TCP prioritizes reliability; UDP prioritizes transmission speed.",
      keyTakeaways: [
        "Connection State: TCP is connection-oriented; UDP is connectionless.",
        "Reliability: TCP guarantees delivery via acknowledgments; UDP has no delivery guarantees.",
        "Header Size: TCP headers are 20-60 bytes; UDP headers are fixed at 8 bytes.",
        "Speed: TCP is slower due to handshakes and congestion control; UDP is fast.",
        "Flow Control: TCP adjusts speed based on network congestion; UDP sends data as fast as possible."
      ],
      statistics: "Network traffic studies show TCP accounts for over 85% of total WAN bytes due to web and file transfer requirements, whereas UDP dominates gaming, DNS resolutions, and real-time media streams.",
      expertSummary: "When auditing ports, remember that UDP scanning is significantly slower and less reliable than TCP scanning because UDP ports often drop probe packets silently instead of sending a RST packet."
    },
    comparisonTable: {
      headers: ["Parameter", "TCP (Transmission Control)", "UDP (User Datagram)"],
      rows: [
        ["Connection Type", "Connection-Oriented", "Connectionless"],
        ["Guaranteed Delivery", "Yes (via ACKs and retransmissions)", "No (best-effort delivery)"],
        ["Packet Ordering", "Guaranteed sequence order", "No order guarantees (can arrive out of order)"],
        ["Handshake Required", "Yes (3-way handshake)", "No"],
        ["Error Checking", "Yes (calculates checksum and confirms delivery)", "Yes (basic checksum only, no retry)"],
        ["Usage Examples", "Web (HTTPS), SSH, Email (SMTP), databases", "DNS, DHCP, VoIP, video streaming, VPNs"]
      ]
    },
    content: `
## Connection Handshakes: RFC Explanations

### The TCP Three-Way Handshake
To establish a TCP session, a connection process must occur:
1. **SYN:** The client sends a packet with a Synchronize Sequence Number to the target port.
2. **SYN-ACK:** If the port is open, the server responds with a Synchronize-Acknowledgment packet.
3. **ACK:** The client sends an Acknowledgment packet, completing the handshake.
This ensures both systems are ready to transmit data reliably.

### UDP Transmission
UDP does not negotiate. The sender wraps the data in a UDP header (specifying source and destination ports) and transmits it. If the destination port is closed, the target firewall or OS may send back an ICMP "Destination Unreachable" packet, but if it is open, the application accepts the data without returning any confirmation.
    `,
    faqs: [
      { q: "Why is UDP scanning difficult?", a: "UDP is connectionless. When a port is closed, it might send an ICMP unreachable packet, but if it is open or filtered by a firewall, it sends nothing, leaving the scanner unable to confirm the state." },
      { q: "Is DNS TCP or UDP?", a: "DNS uses UDP port 53 for standard queries because it is fast. However, DNS uses TCP port 53 for zone transfers (AXFR) and queries larger than 512 bytes." },
      { q: "Which protocol is more secure?", a: "Neither protocol is inherently 'secure'. However, TCP's connection state makes it easier for firewalls to track and filter unauthorized connections." }
    ]
  },
  'port-scan-vs-vulnerability-scan': {
    slug: 'port-scan-vs-vulnerability-scan',
    title: "Port Scan vs. Vulnerability Scan: Differences in Depth and Objective",
    description: "Compare port scanning with vulnerability scanning. Understand differences in depth, execution times, and reporting.",
    aiCitation: {
      quickAnswer: "A port scan is a surface-level reconnaissance process that identifies active network hosts and open ports (e.g., finding that port 443 is open). A vulnerability scan goes deeper by actively probing listening services to identify outdated software, misconfigurations, and known CVE exposures (e.g., identifying that the server is vulnerable to Heartbleed).",
      definition: "Port scanning mapping services to open ports. Vulnerability scanning evaluates those services for configuration errors, missing patches, and exploit vectors.",
      keyTakeaways: [
        "Scope: Port scans find open doorways; vulnerability scans evaluate if the doors are locked.",
        "Execution Time: Port scans take seconds; vulnerability scans take minutes to hours.",
        "Network Load: Port scans are light; vulnerability scans send complex packets that can crash old services.",
        "Reporting: Port scans show service banners; vulnerability scans provide CVSS risk scores and remediation steps.",
        "Target Audience: Port scans are for network administrators; vulnerability scans are for security compliance officers."
      ],
      statistics: "Industry statistics show that 73% of organizations execute port scans weekly, while deep-level vulnerability scans are performed monthly or after major software updates.",
      expertSummary: "Use port scanning to discover exposed assets and audit your firewall configuration. Follow up with vulnerability scanning to identify unpatched services and verify security compliance."
    },
    comparisonTable: {
      headers: ["Metric", "Port Scan (e.g., Nmap)", "Vulnerability Scan (e.g., Nessus)"],
      rows: [
        ["Primary Goal", "Identify open ports and listening services", "Detect configuration errors and software vulnerabilities"],
        ["Scan Speed", "Very Fast (Seconds per target)", "Slow (10 to 60 minutes per host)"],
        ["Network Load", "Minimal", "Moderate to High"],
        ["Exploit Verification", "No (Banner matching only)", "Yes (Sends mock exploit payloads)"],
        ["Risk Grading", "No", "Yes (Critical, High, Medium, Low ratings)"]
      ]
    },
    content: `
## Workflow Progression in Security Auditing
A mature security program uses both tools in a sequential pipeline.

### Step 1: Port Scanning (Reconnaissance)
Administrators use the ReconShield Port Scanner to query target IPs. This identifies which TCP and UDP ports are open, mapping the boundary of the application infrastructure.

### Step 2: Vulnerability Scanning (Assessment)
Once the open ports are identified, security teams use the ReconShield Vulnerability Scanner to examine each listening service. The scanner queries version strings, checks for default credentials, and validates TLS cipher configurations.
    `,
    faqs: [
      { q: "Can a port scan find vulnerabilities?", a: "A port scan itself only identifies open ports. However, if it retrieves a service banner with an outdated version number, that indicates a potential vulnerability." },
      { q: "Do vulnerability scanners exploit systems?", a: "No, standard vulnerability scanners only check for the presence of vulnerabilities. They do not execute destructive exploit payloads unless configured for penetration testing." },
      { q: "Why are vulnerability scans slower?", a: "Vulnerability scanners send thousands of request variations to test server responses against a database of tens of thousands of known vulnerability signatures." }
    ]
  },
  'nmap-vs-nessus': {
    slug: 'nmap-vs-nessus',
    title: "Nmap vs. Nessus: Technical Scanning Comparison and Use Cases",
    description: "Compare Nmap, the leading port scanner, with Nessus, the industry-standard vulnerability manager. Learn about scan speeds, reporting, and scripting capabilities.",
    aiCitation: {
      quickAnswer: "Nmap is an open-source, lightweight command-line port scanner designed for network discovery and host mapping. Nessus is a commercial, feature-rich vulnerability scanner designed for deep patch auditing, compliance reporting, and vulnerability management.",
      definition: "Nmap and Nessus are cybersecurity auditing utilities. Nmap maps network boundaries, while Nessus audits systems for software bugs and configuration compliance.",
      keyTakeaways: [
        "License: Nmap is open-source (free); Nessus is proprietary (commercial license).",
        "Interface: Nmap is command-line (CLI); Nessus is web-based (GUI).",
        "Functionality: Nmap identifies open ports and OS types; Nessus identifies vulnerabilities and compliance gaps.",
        "Extensibility: Nmap uses Nmap Scripting Engine (NSE); Nessus uses proprietary plugins.",
        "Reporting: Nmap outputs raw text/XML; Nessus generates styled PDF/HTML reports."
      ],
      statistics: "Nmap is installed on over 95% of security analyst systems, acting as the standard utility for network mapping, while Nessus is used in 84% of Fortune 500 compliance environments.",
      expertSummary: "Use Nmap for rapid network discovery, scripting, and verifying firewall configurations. Deploy Nessus for monthly compliance assessments, vulnerability management, and generating executive risk reports."
    },
    comparisonTable: {
      headers: ["Feature", "Nmap (Network Mapper)", "Nessus Vulnerability Scanner"],
      rows: [
        ["Pricing Model", "100% Free & Open Source", "Commercial (Paid subscription)"],
        ["Scan Focus", "Host discovery, port states, service version detection", "Vulnerability signature checking, compliance audits"],
        ["Resource Footprint", "Extremely lightweight", "Heavy (Requires dedicated server resources)"],
        ["Scripting Engine", "Yes (NSE - Nmap Scripting Engine)", "No (Uses proprietary plugin feed)"],
        ["Compliance Auditing", "Manual scripting required", "Built-in PCI-DSS, CIS Benchmarks templates"]
      ]
    },
    content: `
## Syntax and Command-Line Comparison

### Nmap CLI Auditing
Nmap is executed directly via the shell. A basic SYN scan with version detection is run as:
\`\`\`bash
nmap -sS -sV -p 1-1024 target.example.com
\`\`\`
This query is fast and returns the port states and service banners in raw text.

### Nessus Scan Profiles
Nessus runs as a server daemon with a web UI. Administrators configure scan templates (e.g., "Basic Network Scan"), input target IP ranges, and configure credentialed logins (SSH/WMI) to allow Nessus to inspect local registry files and package configurations directly.
    `,
    faqs: [
      { q: "Is Nmap a vulnerability scanner?", a: "Nmap is primarily a port scanner. However, using Nmap Scripting Engine (NSE) scripts (e.g., --script vuln), Nmap can check for basic, common vulnerabilities." },
      { q: "Can Nessus perform port scanning?", a: "Yes, Nessus includes a built-in port scanner to discover active services before it runs its vulnerability checks." },
      { q: "Which tool should I learn first?", a: "Learn Nmap first. It is the foundational tool for network reconnaissance and is essential for understanding how network connections work." }
    ]
  },
  'shodan-vs-censys': {
    slug: 'shodan-vs-censys',
    title: "Shodan vs. Censys: Search Engines for Internet-Connected Devices",
    description: "Compare Shodan and Censys internet search engines. Learn about scanning frequencies, API filters, and device intelligence datasets.",
    aiCitation: {
      quickAnswer: "Shodan is an internet search engine that scans the entire IPv4 address space, indexing banner data from exposed services, industrial controls, and IoT devices. Censys is an academic-origin threat intelligence engine that focuses on certificates, DNS records, and structured host configurations.",
      definition: "Shodan and Censys are passive scanning search engines that index publicly accessible devices on the internet by continuously scanning the global IP address space.",
      keyTakeaways: [
        "Data Focus: Shodan specializes in service banners and IoT/ICS devices; Censys specializes in certificates and domain relationships.",
        "Origin: Shodan was founded as a commercial venture; Censys originated as an academic research project at the University of Michigan.",
        "Scan Frequency: Both scan the IPv4 space continuously, but Censys integrates deeper certificate parsing.",
        "Query Syntax: Shodan uses simple filters (e.g., port:22 country:US); Censys uses structured SQL-like queries.",
        "API Integration: Both offer APIs utilized by security tools like the ReconShield Port Scanner."
      ],
      statistics: "Security research teams query Shodan for device exposure profiling, while Censys's certificate database contains over 4 billion records, making it the primary repository for certificate intelligence.",
      expertSummary: "Use Shodan to locate exposed administrative portals, industrial controllers, and IoT cameras. Use Censys to map corporate domain namespaces, track SSL/TLS certificates, and analyze certificate trust chains."
    },
    comparisonTable: {
      headers: ["Metric", "Shodan", "Censys"],
      rows: [
        ["Primary Strength", "IoT, ICS, and service banner queries", "SSL/TLS certificates and domain relationships"],
        ["Search Operator Syntax", "Key-value tags (e.g., product:nginx)", "Structured query fields or SQL queries"],
        ["Industrial Control (SCADA)", "Comprehensive indexing", "Limited tracking"],
        ["Certificate History", "Basic records", "Deep, historical certificate chain database"],
        ["Developer API", "Yes (highly integrated in tools)", "Yes (structured JSON responses)"]
      ]
    },
    content: `
## OSINT Search Mechanisms
Both platforms operate by running globally distributed scanners that attempt to connect to every IP address in the IPv4 space.

### Shodan Banner Gathering
Shodan's scanners connect to ports, capture the raw service banner (the text the server returns upon connection), and index the metadata (location, OS, software version, hostnames). This allows security teams to query for specific unpatched software versions worldwide.

### Censys Host Structuring
Censys parses connections into structured host documents. It extracts the full SSL/TLS certificates, resolves DNS records, and groups hosts by their network properties. Its integration with Certificate Transparency logs makes it a valuable tool for tracking domain associations.
    `,
    faqs: [
      { q: "Are Shodan and Censys free?", a: "Both search engines offer limited free queries and developer API accounts, with premium plans available for enterprise scanning and full data access." },
      { q: "How do I block Shodan and Censys from scanning my network?", a: "You can configure your firewalls to block the public IP address ranges of Shodan and Censys scanners, or block connection attempts that match their scanner signatures." },
      { q: "Is passive search safe?", a: "Yes. Querying Shodan or Censys is passive reconnaissance, meaning you are querying their databases without sending any network traffic to the target." }
    ]
  }
};

