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
  }
};
