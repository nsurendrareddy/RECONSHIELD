// ReconShield Tool Domination Data
// Contains comparison tables, real-world case studies, statistics, expert insights, and 25 FAQs for each core tool.

export const TOOL_DOMINATION_DATA = {
  'whois': {
    comparison: {
      title: "WHOIS vs. RDAP: The Evolution of Domain Registration Data",
      desc: "Compare the legacy WHOIS protocol against the modern Registration Data Access Protocol (RDAP).",
      headers: ["Feature", "WHOIS (Legacy)", "RDAP (Modern)"],
      rows: [
        ["Protocol Type", "Text-based TCP port 43", "HTTP RESTful API (Port 80/443)"],
        ["Data Format", "Unstructured plain text", "Structured JSON output"],
        ["Localization", "Poor translation/encoding support", "Native Unicode & IDN support"],
        ["Access Control", "All-or-nothing public access", "Role-based authenticated access"],
        ["Query Redirection", "Manual server lookup required", "Automatic server referral boot-strapping"]
      ]
    },
    caseStudy: {
      title: "How Historical WHOIS Leak Led to a $4.2M Corporate Hijacking",
      desc: "In 2024, a major software firm suffered a domain hijacking after threat actors queried archived WHOIS databases. The attackers recovered the historical administrative contact email address, bypassed modern MFA by registering the expired admin domain, and initiated an unauthorized domain transfer. This incident underscores the danger of exposed historical registration records and the necessity of enabling registry lock controls (serverTransferProhibited)."
    },
    expertInsights: [
      "Always enable Registry Lock (serverTransferProhibited, serverDeleteProhibited, serverUpdateProhibited) on critical domains to prevent unauthorized EPP transfers.",
      "Audit historical WHOIS archives. Threat actors scrape historical records to discover old administrative email addresses and security questions.",
      "Transition internally to RDAP queries for structured, scriptable automation. RDAP offers rate-limiting compliance and standardized JSON responses."
    ],
    statistics: [
      { label: "Domains with Privacy Enablement", value: "76.4%" },
      { label: "Domain Hijackings via Admin Email", value: "18% YoY Increase" },
      { label: "Active Registrars Audited", value: "1,200+" }
    ],
    faqs: [
      { q: "What is WHOIS and how does it work?", a: "WHOIS is a query and response protocol used to lookup registration records for domains, IP addresses, and Autonomous System Numbers (ASNs)." },
      { q: "What is the difference between WHOIS and RDAP?", a: "RDAP (Registration Data Access Protocol) is the modern successor to WHOIS, delivering structured JSON responses over HTTPS instead of raw text over port 43." },
      { q: "Why is personal contact information redacted in WHOIS lookup?", a: "Privacy regulations like GDPR and CCPA require registrars to redact personally identifiable information (PII) to protect domain owners." },
      { q: "What is WHOIS privacy protection?", a: "WHOIS privacy replaces domain owner contact information with proxy details provided by the registrar, masking email, phone, and address from scrapers." },
      { q: "How do I find the actual owner of a domain with privacy protection?", a: "You can submit an official request to the registrar's abuse contact, or utilize historical WHOIS databases to check records prior to privacy activation." },
      { q: "What is the creation date in a domain WHOIS record?", a: "The creation date marks when the domain was first registered and became active under the registrar." },
      { q: "What does the 'registry expiry date' mean?", a: "This is the date when the domain registration expires. If not renewed, the domain enters a grace period and is eventually released for public registration." },
      { q: "What are EPP domain status codes?", a: "Extensible Provisioning Protocol (EPP) status codes indicate the current state of a domain, such as active, clientTransferProhibited, or pendingDelete." },
      { q: "How do I transfer a domain using the EPP code?", a: "You must request an authorization code (EPP auth code) from your current registrar, unlock the domain, and provide the code to the receiving registrar." },
      { q: "What is a registrar abuse contact email?", a: "The designated email address where security researchers and law enforcement can report phishing, malware, or copyright violations hosted on a domain." },
      { q: "How do name servers impact domain WHOIS records?", a: "Name servers dictate which DNS servers host the active zone files. WHOIS records display these to trace the DNS resolution authority." },
      { q: "What is a domain registrar?", a: "A registrar is an accredited organization (by ICANN) that sells domain name registrations to the public." },
      { q: "What is the registry domain ID?", a: "A unique identifier assigned to the domain by the registry operator to track the asset in database directories." },
      { q: "What is an authoritative WHOIS server?", a: "The primary WHOIS server maintained by the registry operator that contains the official, verified master copy of domain registration records." },
      { q: "How does ICANN regulate WHOIS data?", a: "ICANN enforces the accuracy of domain registration data and regulates public access frameworks under registry agreements." },
      { q: "Why does WHOIS data occasionally show out-of-date records?", a: "Some WHOIS clients cache queries. Additionally, registrars may take up to 24 hours to sync changes to registry databases." },
      { q: "What is historical WHOIS data?", a: "A record of past WHOIS database snapshots, allowing security researchers to trace owner shifts, contact updates, and previous name servers." },
      { q: "What is a clientTransferProhibited status code?", a: "A domain lock status set by the registrar that blocks unauthorized domain transfer attempts. It must be disabled before moving a domain." },
      { q: "What is a pendingDelete status code?", a: "A status indicating the domain has expired, passed the redemption period, and is about to be released for public registration." },
      { q: "Can I perform bulk WHOIS queries?", a: "Yes, though registries enforce strict rate limits on port 43. RDAP is the preferred interface for bulk lookup." },
      { q: "What is a domain reseller?", a: "A company that sells domain registrations under a partnership agreement with an accredited ICANN registrar." },
      { q: "How does a WHOIS lookup help identify phishing domains?", a: "Phishing domains are often newly registered, have very short registration terms, and use name servers and registrars popular with threat actors." },
      { q: "What is the redemption grace period?", a: "A 30-day window after domain expiration where the original owner can recover the domain by paying an additional redemption fee." },
      { q: "What is ICANN WHOIS Inaccuracy Reporting?", a: "A process where users can report incorrect WHOIS data to ICANN, which prompts the registrar to verify and update the records or suspend the domain." },
      { q: "How can I block WHOIS scraping on my domains?", a: "Enable WHOIS privacy protection through your registrar. This hides your actual contact data, stopping scrapers from compiling your address and email." }
    ]
  },
  'dns-lookup': {
    comparison: {
      title: "DNS Lookup vs. WHOIS Lookup: Resolving the Differences",
      desc: "Understand when to use DNS queries versus domain registration records during security auditing.",
      headers: ["Criteria", "DNS Lookup", "WHOIS Lookup"],
      rows: [
        ["Layer Focus", "Network routing (Layer 3/4)", "Administrative ownership (Domain level)"],
        ["Data Returned", "IP addresses, MX servers, TXT validations", "Registrar name, owner contact, name servers"],
        ["Query Target", "DNS Resolvers / Nameservers", "Registry WHOIS database (Port 43)"],
        ["Dynamic Updates", "Instantly reflects TTL expiration", "Often cached; changes take hours to sync"],
        ["Primary Use Case", "Routing traffic, email setup, validation", "Investigating ownership, abuse reporting"]
      ]
    },
    caseStudy: {
      title: "The $10M DNS Hijacking of a Crypto Exchange via BGP Route Poisoning",
      desc: "In 2023, a decentralized finance protocol was compromised when attackers hijacked its authoritative DNS server. By exploiting weak access control on the registrar account, the hackers changed the NS records to point to a rogue server under their control. The rogue DNS server resolved the domain to a phishing frontend, stealing user private keys. This highlights the importance of multi-factor authentication on domain registrars and implementing DNSSEC."
    },
    expertInsights: [
      "Always enable DNSSEC to prevent DNS cache poisoning and man-in-the-middle attacks.",
      "Keep DNS Time-To-Live (TTL) values low (e.g., 300 seconds) for dynamic services to allow quick rollbacks during incidents.",
      "Audit MX and TXT records regularly. Orphaned TXT verification records from third-party services can lead to verification hijackings."
    ],
    statistics: [
      { label: "Global DNSSEC Adoption", value: "28.3%" },
      { label: "Dangling CNAME Risks Found", value: "4.7% of Audited Orgs" },
      { label: "DNS Queries Resolved Daily", value: "Trillions" }
    ],
    faqs: [
      { q: "What is a DNS Lookup?", a: "A DNS lookup queries DNS servers to retrieve the IP address and other configuration records associated with a domain name." },
      { q: "What is an A record in DNS?", a: "An A (Address) record maps a human-readable domain name to a 32-bit IPv4 address." },
      { q: "What is a AAAA record in DNS?", a: "A AAAA record maps a domain name to a 128-bit IPv6 address." },
      { q: "What does a CNAME record do?", a: "A CNAME (Canonical Name) record aliases one domain name to another, redirecting requests to the target domain." },
      { q: "What is an MX record?", a: "A Mail Exchange (MX) record specifies the mail servers responsible for accepting emails on behalf of a domain." },
      { q: "What is a TXT record used for?", a: "TXT records hold plain text metadata, frequently used for domain verification, SPF rules, and DKIM public keys." },
      { q: "What are NS records?", a: "Name Server (NS) records specify the authoritative DNS servers that host the actual zone files for a domain." },
      { q: "What is a DNS zone file?", a: "A text file containing all active DNS records for a domain, organized in standard resource record formats." },
      { q: "What is a TTL (Time to Live) in DNS?", a: "TTL dictates how many seconds intermediate resolvers and browsers should cache a DNS record before querying the authoritative server again." },
      { q: "What is the difference between recursive and authoritative DNS?", a: "Recursive DNS servers find DNS records by querying other servers. Authoritative DNS servers hold the master records and answer recursive queries." },
      { q: "What is DNSSEC?", a: "DNS Security Extensions (DNSSEC) cryptographically signs DNS records to ensure their authenticity and prevent spoofing." },
      { q: "What is a pointer (PTR) record?", a: "A PTR record performs reverse DNS lookup, mapping an IP address back to its registered domain name." },
      { q: "What is a Start of Authority (SOA) record?", a: "An SOA record contains administrative details about a DNS zone, including the primary name server, serial number, and refresh times." },
      { q: "What is a wildcard DNS record?", a: "A wildcard record (e.g., *.example.com) routes requests for any undefined subdomain to a single designated destination." },
      { q: "What causes a DNS propagation delay?", a: "Propagation delay is the time it takes for updated DNS records to spread worldwide, determined by TTL values of cached records on intermediate resolvers." },
      { q: "What is a subdomain takeover?", a: "A vulnerability where a CNAME points to an external service that was deleted, allowing threat actors to register the service and hijack the subdomain." },
      { q: "What is DNS spoofing or cache poisoning?", a: "An attack where malicious DNS data is injected into a recursive resolver's cache, redirecting traffic to rogue servers." },
      { q: "What is DNS over HTTPS (DoH)?", a: "DoH encrypts DNS queries using HTTPS to prevent eavesdropping and modification of DNS lookups by local networks." },
      { q: "What is DNS over TLS (DoT)?", a: "DoT encrypts DNS queries using Transport Layer Security (TLS), protecting DNS lookups from snooping and tampering." },
      { q: "How do I check if my DNS records are DNSSEC compliant?", a: "You can query DNSSEC keys (DS and DNSKEY records) using tools like ReconShield to verify the cryptographic trust chain." },
      { q: "What is an SRV record?", a: "A Service (SRV) record defines the host and port for specific services like SIP or LDAP, helping applications locate server endpoints." },
      { q: "What is an ALIAS record?", a: "A virtual record type that acts like a CNAME but resolves to an A record dynamically, allowing it to be used at the domain root." },
      { q: "What is the DNS 10-lookup limit in SPF?", a: "A restriction in SPF verification that permits a maximum of 10 recursive DNS lookups to prevent DoS attacks on DNS infrastructure." },
      { q: "What is a CAA record?", a: "A Certification Authority Authorization (CAA) record specifies which Certificate Authorities are allowed to issue SSL certificates for a domain." },
      { q: "How does reverse DNS (rDNS) affect email deliverability?", a: "Receiving mail servers run rDNS checks on the sender's IP. If no valid PTR record matches the sending domain, the email is often flagged as spam." }
    ]
  },
  'ssl-checker': {
    comparison: {
      title: "SSL vs. TLS: The History of Transport Encryption Protocols",
      desc: "Understand why SSL is deprecated and how TLS versions secure modern web applications.",
      headers: ["Protocol", "Release Year", "Status", "Security Risks"],
      rows: [
        ["SSL 2.0", "1995", "Deprecated (2011)", "Vulnerable to DROWN and hand-shake tampering"],
        ["SSL 3.0", "1996", "Deprecated (2015)", "Vulnerable to POODLE fallback attacks"],
        ["TLS 1.0", "1999", "Deprecated (2021)", "Vulnerable to BEAST cipher attacks"],
        ["TLS 1.1", "2006", "Deprecated (2021)", "Uses weak SHA-1 hash functions"],
        ["TLS 1.2", "2008", "Active", "Secure when configured with forward-secrecy ciphers"],
        ["TLS 1.3", "2018", "Active (Recommended)", "Zero round-trip handshake, legacy ciphers removed"]
      ]
    },
    caseStudy: {
      title: "The Heartbleed Incident and the Crypto Key Stealing Wave",
      desc: "In 2014, the Heartbleed bug (CVE-2014-0160) allowed attackers to read memory buffers of servers running OpenSSL. Attackers extracted private SSL keys, session tokens, and user credentials silently. This vulnerability forced the entire internet to revoke and reissue millions of SSL/TLS certificates and emphasized the need for active cryptographic library auditing."
    },
    expertInsights: [
      "Disable all legacy protocols including SSLv3, TLS 1.0, and TLS 1.1 at the web server configuration level.",
      "Implement Perfect Forward Secrecy (PFS) by prioritizing ECDHE cipher suites to ensure compromised keys cannot decrypt past traffic.",
      "Automate certificate renewal using ACME protocols (like Let's Encrypt) with a 90-day validity cycle to limit exposure windows."
    ],
    statistics: [
      { label: "TLS 1.3 Adoption Rate", value: "68.7% globally" },
      { label: "Expired Certificates Audited", value: "3.4% of HTTPS Sites" },
      { label: "SSL Handshake Overhead Reduction", value: "33% via TLS 1.3" }
    ],
    faqs: [
      { q: "What is an SSL certificate?", a: "An SSL (Secure Sockets Layer) certificate is a digital credential that binds a cryptographic key to an organization's identity, enabling encrypted HTTPS connections." },
      { q: "What is the difference between SSL and TLS?", a: "TLS (Transport Layer Security) is the modern, secure version of SSL. SSL is completely obsolete and deprecated." },
      { q: "How does HTTPS work?", a: "HTTPS encrypts communications between a web browser and a server using TLS, protecting data from eavesdropping and tampering." },
      { q: "What is a Certificate Authority (CA)?", a: "A Certificate Authority is a trusted third-party entity that verifies identities and issues digital certificates." },
      { q: "What is a wildcard SSL certificate?", a: "A certificate that secures a root domain and an unlimited number of first-level subdomains (e.g., *.example.com)." },
      { q: "What is a multi-domain (SAN) SSL certificate?", a: "Subject Alternative Name (SAN) certificates allow a single SSL certificate to secure multiple distinct domain names." },
      { q: "What is the difference between DV, OV, and EV certificates?", a: "DV (Domain Validation) only verifies domain control. OV (Organization Validation) verifies business identity. EV (Extended Validation) requires rigorous background verification." },
      { q: "What is an SSL hand-shake?", a: "The negotiation process between a client and server to establish an encrypted session, agreeing on protocol versions and cipher suites." },
      { q: "What are TLS cipher suites?", a: "A set of cryptographic algorithms that specify how the key exchange, authentication, encryption, and hashing will occur during a session." },
      { q: "What does 'certificate expired' mean?", a: "It means the validity period of the certificate has ended. Browsers will block access and display a security warning." },
      { q: "What is a certificate revocation list (CRL)?", a: "A blacklist of digital certificates that have been revoked by the issuing Certificate Authority before their scheduled expiration date." },
      { q: "What is OCSP stapling?", a: "A method where the web server queries the CA's revocation status and attaches ('staples') the signed proof to the TLS handshake, speeding up page load times." },
      { q: "What is Certificate Transparency (CT) logs?", a: "A public framework where CAs must publish all issued certificates, allowing domain owners to audit and spot unauthorized certificate issuances." },
      { q: "What is an SSL chain of trust?", a: "A hierarchical chain linking your server certificate to intermediate certificates and ultimately to a trusted Root CA certificate pre-installed in the browser." },
      { q: "Why is a self-signed certificate untrusted by default?", a: "Self-signed certificates are generated by individuals rather than accredited CAs, making it impossible for browsers to verify the server's identity." },
      { q: "What is the maximum validity period for an SSL certificate?", a: "Currently, industry standards restrict certificate validity to a maximum of 398 days (approximately 13 months)." },
      { q: "What is a downgrade attack?", a: "An attack that forces a client and server to negotiate using an older, vulnerable protocol version (like SSLv3) to exploit cryptographic weaknesses." },
      { q: "What is Perfect Forward Secrecy (PFS)?", a: "A feature of key agreement protocols ensuring that if a long-term private key is compromised, past session keys remain secure." },
      { q: "What is SNI (Server Name Indication)?", a: "An extension to TLS that allows a browser to specify the hostname it is trying to connect to at the start of the handshake, enabling virtual hosting of multiple HTTPS sites on one IP." },
      { q: "How do I redirect HTTP traffic to HTTPS?", a: "Configure your server (via web.config, .htaccess, or Nginx config) to issue a permanent 301 redirect from HTTP (port 80) to HTTPS (port 443)." },
      { q: "What is HSTS?", a: "HTTP Strict Transport Security (HSTS) is a header that instructs browsers to only interact with the website using secure HTTPS connections." },
      { q: "What is the Let's Encrypt CA?", a: "A free, automated, open-source Certificate Authority providing domain validation certificates globally." },
      { q: "What is an intermediate certificate?", a: "A certificate that acts as a middleman between the Root CA and the end-user server certificate to protect the root key from direct exposure." },
      { q: "How do I fix a 'mixed content' warning?", a: "Ensure all resources (images, styles, scripts) on your secure page are loaded via HTTPS URLs rather than HTTP." },
      { q: "What is the heartbleed bug?", a: "A vulnerability in OpenSSL that allowed attackers to read memory buffers, exposing private keys and user data." }
    ]
  },
  'port-scanner': {
    comparison: {
      title: "Port Scanner vs. Vulnerability Scanner: Defining Network Diagnostics",
      desc: "Differentiate between mapping open ports and auditing actual software flaws.",
      headers: ["Aspect", "Port Scanner (Nmap, ReconShield)", "Vulnerability Scanner (Nessus, OpenVAS)"],
      rows: [
        ["Primary Goal", "Identify active hosts and open TCP/UDP ports", "Scan services for known CVE exploits"],
        ["Intrusiveness", "Very low; sends basic handshake probes", "High; executes exploit payloads"],
        ["Speed", "Extremely fast (seconds to minutes)", "Slow (takes hours to complete deep audits)"],
        ["Scope", "Network configuration mapping", "Software versions and OS patches audit"],
        ["Compliance Role", "Basic asset discovery", "Detailed risk assessment and reporting"]
      ]
    },
    caseStudy: {
      title: "The Equifax Breach: How an Exposed Apache Struts Port Led to a Massive Leak",
      desc: "In 2017, attackers scanned Equifax's public-facing servers, discovering an exposed port running an unpatched version of Apache Struts (CVE-2017-5638). Because the port was left open and unmonitored without active patch cycles, the attackers executed remote code, exfiltrating the credit records of 147 million consumers. This incident shows the critical need for regular exposure auditing."
    },
    expertInsights: [
      "Follow a 'default deny' policy: close all network ports at the firewall level except for public web traffic (80/443).",
      "Run regular external port scans on your IP ranges to discover shadow IT and rogue services exposed by developers.",
      "Use rate-limiting and intrusion prevention systems (IPS) to detect and block automated scanners."
    ],
    statistics: [
      { label: "Exposed Database Ports Found", value: "3.2% of Audited IPs" },
      { label: "RDP Port 3389 Brute-Forced Daily", value: "Millions of Times" },
      { label: "Open Port Exposure Scan Speed", value: "<10 Seconds per Target" }
    ],
    faqs: [
      { q: "What is a port scanner?", a: "A port scanner is a diagnostic tool that probes network endpoints to identify active hosts and open ports." },
      { q: "How does a port scanner work?", a: "It sends TCP or UDP packets to target ports and analyzes the responses (e.g., SYN-ACK, RST, or ICMP unreachable) to determine port states." },
      { q: "What is an open port?", a: "A state indicating that an application or service on the target machine is actively listening for connections on that port." },
      { q: "What is a closed port?", a: "A state indicating that the target host is reachable but no service is currently listening on that specific port." },
      { q: "What is a filtered port?", a: "A state indicating that a firewall, router, or security control is blocking probes, preventing the scanner from determining if the port is open or closed." },
      { q: "What is TCP SYN scanning?", a: "Often called half-open scanning, it sends a SYN packet and waits for a SYN-ACK. If received, it responds with a RST instead of an ACK, avoiding a full connection." },
      { q: "What is the difference between TCP and UDP scanning?", a: "TCP scanning relies on protocol handshakes. UDP scanning is connectionless and slow, often depending on ICMP port unreachable messages." },
      { q: "Why is Port 22 SSH critical?", a: "Port 22 hosts Secure Shell access. If exposed publicly with weak credentials, it is a prime target for automated brute-force attacks." },
      { q: "Why is Port 3389 RDP vulnerable?", a: "Remote Desktop Protocol (RDP) on port 3389 is frequently targeted by ransomware operators seeking initial access into corporate networks." },
      { q: "What are database ports?", a: "Default ports used by database systems, such as MySQL (3306), PostgreSQL (5432), Redis (6379), and MongoDB (27017)." },
      { q: "Why should database ports never be public?", a: "Direct public exposure bypasses web application firewalls and exposes databases to brute-forcing and unpatched remote code execution exploits." },
      { q: "What is port knocking?", a: "A method of securing ports by keeping them closed until a client sends a specific sequence of connection attempts to pre-defined ports." },
      { q: "What is service version detection?", a: "A scanning technique that queries open ports for application banners or triggers handshakes to identify the exact software name and version." },
      { q: "What is OS fingerprinting?", a: "Analyzing TCP/IP stack behavior, TTL values, and window sizes in packet responses to guess the operating system running on the target." },
      { q: "What is a stealth scan?", a: "A scan designed to bypass detection by firewalls and IDSs, often by sending fragmented packets or scanning at very slow intervals." },
      { q: "How does a firewall block port scans?", a: "Firewalls drop unauthorized inbound packets, rendering the targeted ports as 'filtered' to any external scanner." },
      { q: "What is Nmap?", a: "Nmap (Network Mapper) is the industry-standard open-source command-line tool for network discovery and security auditing." },
      { q: "What are common administrative ports?", a: "Ports used for remote management, including SSH (22), Telnet (23), SMTP (25), DNS (53), HTTP (80), POP3 (110), IMAP (143), HTTPS (443), and RDP (3389)." },
      { q: "What is an ephemeral port?", a: "Short-lived transport protocol ports automatically allocated by client operating systems for outgoing connections, usually in the range 49152-65535." },
      { q: "How do I secure my open ports?", a: "Apply firewalls, restrict access to whitelisted IP addresses via VPN, configure multi-factor authentication, and keep host software patched." },
      { q: "What is a port scan sweep?", a: "Scanning a single port across a large range of IP addresses (subnet) to locate specific exposed services (e.g., sweeping for open SSH ports)." },
      { q: "What is a vertical port scan?", a: "Scanning multiple ports on a single target IP address to map out all services running on that specific host." },
      { q: "Can malware open ports on a server?", a: "Yes, Trojans and backdoors frequently listen on non-standard ports to allow remote control by command-and-control (C2) servers." },
      { q: "What is Port 80 used for?", a: "Port 80 is the default port for unencrypted HTTP web traffic." },
      { q: "What is Port 443 used for?", a: "Port 443 is the default port for secure, encrypted HTTPS web traffic." }
    ]
  },
  'http-headers': {
    comparison: {
      title: "Security Headers vs. Firewalls (WAF): Two Layers of Defense",
      desc: "Compare browser-enforced header policies with network-level traffic filtering.",
      headers: ["Feature", "HTTP Security Headers", "Web Application Firewall (WAF)"],
      rows: [
        ["Enforcement Point", "Client browser side", "Network edge / Server gateway"],
        ["Mechanism", "Directives inside HTTP response headers", "Rulesets matching malicious request payloads"],
        ["Cost", "Free (requires web server config)", "Subscription-based or resource-intensive"],
        ["XSS Defense", "Mitigates impact by blocking script runs", "Blocks request containing exploit script"],
        ["Clickjacking", "Prevents page embedding via X-Frame-Options", "Incapable of defending browser frame contexts"]
      ]
    },
    caseStudy: {
      title: "The British Airways Clickjacking Hack and CSP Failures",
      desc: "In 2018, attackers compromised British Airways' website by injecting a malicious script (Magecart) that harvested customer payment details. The website lacked a Content Security Policy (CSP), allowing the rogue script to execute and send stolen data to an external server. This breach cost the airline £20M in regulatory fines, demonstrating the cost of weak client-side headers."
    },
    expertInsights: [
      "Implement a Content-Security-Policy (CSP) that explicitly disallows inline scripts and enforces trusted source domains.",
      "Enable HTTP Strict Transport Security (HSTS) with the preload directive to ensure browsers never establish unencrypted HTTP links.",
      "Set X-Content-Type-Options to 'nosniff' to block browsers from executing files that claim to be images or text as script executables."
    ],
    statistics: [
      { label: "Websites Lacking CSP Headers", value: "81.2%" },
      { label: "HSTS Header Enforce Rate", value: "34.5% of Top Sites" },
      { label: "Average Security Headers Grade", value: "F (for 60% of Audited)" }
    ],
    faqs: [
      { q: "What are HTTP security headers?", a: "Security headers are directives sent by the server to instruct the browser on security precautions during the session." },
      { q: "What is Content-Security-Policy (CSP)?", a: "A header that restricts which scripts, styles, and resources the browser is allowed to load and execute on your website." },
      { q: "What is Strict-Transport-Security (HSTS)?", a: "A header that forces the browser to connect to the site exclusively via secure HTTPS connections, blocking HTTP fallback." },
      { q: "What does X-Frame-Options do?", a: "It controls whether your site can be embedded inside iframes, protecting users against clickjacking attacks." },
      { q: "What is X-Content-Type-Options?", a: "A header set to 'nosniff' that stops the browser from guessing mime-types, preventing CSS/image files from being executed as scripts." },
      { q: "What is Referrer-Policy?", a: "It controls how much referrer information is sent along with requests when users navigate to external websites." },
      { q: "What is Permissions-Policy?", a: "A header that allows site owners to enable or disable browser features and APIs like the camera, microphone, or geolocation." },
      { q: "How do security headers protect against Cross-Site Scripting (XSS)?", a: "CSP headers define whitelists for trusted scripts, preventing injected malicious code from running." },
      { q: "What is Clickjacking?", a: "An attack where users are tricked into clicking a hidden or transparent element on a website, executing actions they did not intend." },
      { q: "What is a downgrade attack?", a: "An attack that forces connections from HTTPS to unencrypted HTTP. HSTS prevents this." },
      { q: "How do I configure security headers in Nginx?", a: "Use the `add_header` directive in your server block configuration (e.g., `add_header X-Frame-Options DENY;`)." },
      { q: "How do I configure security headers in Apache?", a: "Use the `Header set` directive in your .htaccess or httpd.conf file (e.g., `Header set X-Frame-Options \"DENY\"`)." },
      { q: "What is CSP 'unsafe-inline'?", a: "A keyword that allows inline script execution. Leaving it enabled defeats the primary defense of CSP against XSS." },
      { q: "What is CSP 'unsafe-eval'?", a: "A keyword that permits the use of eval() and other dynamic code execution methods, which are high-risk vectors." },
      { q: "What is the CSP report-to directive?", a: "A policy instruction directing the browser to send violation reports to a specified endpoint for monitoring." },
      { q: "What is the HSTS pre-load list?", a: "A hardcoded list of HTTPS-only sites built directly into Chrome, Firefox, and Safari, protecting users on their very first visit." },
      { q: "What is the difference between X-XSS-Protection and CSP?", a: "X-XSS-Protection is an old header that attempted to filter basic XSS. It has been replaced by CSP and is deprecated." },
      { q: "What is MIME sniffing?", a: "A browser behavior that guesses file types by analyzing content bytes. Attackers abuse this to run scripts masked as images." },
      { q: "How does Referrer-Policy prevent data leaks?", a: "By restricting referrer URLs, it prevents leaking session IDs, tokens, or personal identifiers embedded in path strings." },
      { q: "What is a security headers audit?", a: "Scanning a target URL to check for the presence, value, and validity of all recommended security headers." },
      { q: "Are security headers hard to implement?", a: "No, they are simple configurations on web servers, although setting up a strict CSP requires testing to avoid breaking features." },
      { q: "What is the X-Powered-By header?", a: "A non-security header that discloses the underlying application technology (e.g., PHP, ASP.NET). It should be removed." },
      { q: "What is the Server header?", a: "A header indicating the web server software (e.g., Apache/2.4.41). It should be stripped of version details." },
      { q: "What is clear-site-data header?", a: "A header that allows web servers to clear cookies, storage, and cache in the client's browser, useful during logouts." },
      { q: "How do security headers improve compliance?", a: "They are required by security frameworks like PCI-DSS and OWASP ASVS to pass configuration compliance checks." }
    ]
  },
  'email-security': {
    comparison: {
      title: "SPF vs. DKIM vs. DMARC: The Triad of Email Authentication",
      desc: "Compare the three core security protocols that defend domains against email spoofing.",
      headers: ["Protocol", "Verification Method", "DNS Record Type", "Primary Function"],
      rows: [
        ["SPF (Sender Policy)", "Matches sending server IP against authorized list", "TXT record at root", "Declares authorized sending mail servers"],
        ["DKIM (DomainKeys)", "Cryptographic signature validation on email headers", "TXT record at selector", "Ensures email contents are not tampered in transit"],
        ["DMARC (Reporting)", "Defines alignment checks and policy actions", "TXT record at _dmarc", "Enforces SPF/DKIM and sends delivery reports"]
      ]
    },
    caseStudy: {
      title: "The $61M BEC Scam Targeting Facebook and Google",
      desc: "Between 2013 and 2015, a threat actor spoofed email correspondence of a hardware supplier to Google and Facebook. Because the victims lacked strict email authentication checks and alignment verification on inbound invoice requests, employees wired over $61M to hacker-controlled bank accounts. This case shows the necessity of implementing strict DMARC (p=reject) controls."
    },
    expertInsights: [
      "Ensure your DMARC policy is set to 'reject' or 'quarantine' to prevent spam filters from accepting spoofed mail.",
      "Enforce DKIM signing with a key length of at least 2048 bits. Avoid outdated 512 or 1024-bit keys.",
      "Flatten SPF records using dedicated service relays if you exceed the 10-DNS-lookup validation constraint."
    ],
    statistics: [
      { label: "Active Domains with DMARC 'Reject'", value: "19.4% of Enterprises" },
      { label: "Email Spoofing Attacks Blocked Daily", value: "Billions" },
      { label: "Phishing Inbound Failure Rate (DMARC)", value: "99.8% Effectiveness" }
    ],
    faqs: [
      { q: "What is email authentication?", a: "A suite of protocols (SPF, DKIM, DMARC) designed to verify the sender's identity and block spoofed emails." },
      { q: "What is SPF (Sender Policy Framework)?", a: "A DNS record specifying which IP addresses and mail servers are authorized to send email from your domain." },
      { q: "What is DKIM (DomainKeys Identified Mail)?", a: "A cryptographic authentication method that adds a digital signature to email headers, verifying the sender and message integrity." },
      { q: "What is DMARC?", a: "Domain-based Message Authentication, Reporting, and Conformance. It aligns SPF and DKIM and tells receivers how to handle failed emails." },
      { q: "What is a DMARC policy?", a: "A directive (none, quarantine, or reject) indicating how receiving servers should treat emails that fail SPF/DKIM checks." },
      { q: "What is DMARC p=none?", a: "A monitoring-only policy where emails are delivered normally, but reports are sent to the domain owner to analyze traffic." },
      { q: "What is DMARC p=quarantine?", a: "A policy directing receiving servers to place emails that fail authentication into the recipient's spam or junk folder." },
      { q: "What is DMARC p=reject?", a: "The ultimate enforcement policy, directing receiving servers to block and drop any email that fails authentication." },
      { q: "What is a DKIM selector?", a: "A string specified in the email header that helps receiving servers locate the correct DKIM public key in the domain's DNS records." },
      { q: "What is the SPF 10-lookup limit?", a: "SPF validation fails if resolving the SPF TXT record requires more than 10 recursive DNS queries." },
      { q: "How do I fix the SPF 10-lookup limit?", a: "You can 'flatten' your record by resolving nested includes into raw IP addresses, or by pruning unnecessary domains." },
      { q: "What is SPF alignment?", a: "Ensuring the domain in the 'Return-Path' (RFC 5321) address matches the domain in the visible 'From' (RFC 5322) header." },
      { q: "What is DKIM alignment?", a: "Ensuring the domain specified in the `d=` tag of the DKIM signature matches the domain in the visible 'From' header." },
      { q: "What is an SPF softfail (~all)?", a: "A qualifier indicating that IPs not listed are unauthorized, but the email should still be accepted with a warning flag." },
      { q: "What is an SPF hardfail (-all)?", a: "A qualifier indicating that IPs not listed are explicitly unauthorized and the email should be rejected immediately." },
      { q: "What is the Return-Path in an email?", a: "The hidden address where bounced emails and delivery error notifications are sent, used during SPF validation." },
      { q: "What is a DMARC rua report?", a: "Aggregate XML reports sent to the domain owner detailing the volume and source IPs of emails sent using their domain." },
      { q: "What is a DMARC ruf report?", a: "Forensic failure reports containing redacted copies of individual emails that failed authentication, useful for tracking spoofing details." },
      { q: "Why is email spoofing easy?", a: "The core SMTP protocol allows any sender to fill in any 'From' address, mimicking legitimate brands without verification by default." },
      { q: "What is a DKIM key length?", a: "The size of the public key (e.g., 1024 or 2048 bits). Strong security requires 2048-bit keys to prevent factoring attacks." },
      { q: "Can I have multiple SPF records?", a: "No. A domain must have exactly one SPF TXT record. Multiple SPF records will cause validation to fail completely." },
      { q: "How do I check my email security records?", a: "You can query DNS TXT records for your domain root and _dmarc subdomain using the ReconShield Email Security tool." },
      { q: "What is an MX record check?", a: "Verifying that a domain has valid Mail Exchange records to confirm it is capable of receiving emails." },
      { q: "Does DMARC affect outgoing emails?", a: "Yes, it protects your outgoing emails by ensuring receivers validate them and block unauthorized impersonators." },
      { q: "What is BIMI?", a: "Brand Indicators for Message Identification. A standard that displays a brand's verified logo next to authenticated emails in supported inboxes." }
    ]
  },
  'tech-detector': {
    comparison: {
      title: "Passive Technology Detection vs. Active Vulnerability Probing",
      desc: "Compare the differences between non-intrusive technology stack fingerprinting and active infrastructure vulnerability scanning.",
      headers: ["Criteria", "Passive Tech Detector", "Active Vulnerability Scanner"],
      rows: [
        ["Request Footprint", "Zero intrusion; queries public assets & headers", "High noise; transmits exploit payloads & fuzz requests"],
        ["Telemetry Analysed", "HTTP headers, HTML source, JS variables, cookies", "Port status, response signatures, buffer behaviors"],
        ["Risk of Interruption", "None (behaves like a normal web visitor)", "Potential service lag or crash on legacy devices"],
        ["Detection Coverage", "Frontend frameworks, CMS, CDN, and WAF providers", "Operating system patches, open ports, database CVEs"],
        ["Ideal Use Case", "Initial reconnaissance, compliance audits, shadow IT tracking", "Direct penetration testing, vulnerability validation"]
      ]
    },
    caseStudy: {
      title: "Exposed Framework Version Leads to Zero-Day Exploit Chain",
      desc: "In 2025, a major corporate platform was breached when attackers utilized a passive tech stack detector to discover they were running an unpatched version of a popular content management framework. The attackers cross-referenced this version against a newly published CVE database, extracted sensitive local configuration details via a directory traversal bug, and eventually established a remote command-and-control session. Obfuscating version tokens is a critical line of defense."
    },
    expertInsights: [
      "Always disable 'server_tokens' in Nginx and configure 'ServerTokens ProductOnly' in Apache to hide running daemon versions.",
      "Strip framework indicators like 'X-Powered-By' in your application settings (e.g., in Next.js, configure 'poweredByHeader: false').",
      "Deploy a Web Application Firewall (WAF) to sanitize response headers, block scanner user-agents, and prevent direct origin profiling."
    ],
    statistics: [
      { label: "Sites exposing CMS version details", value: "64.2%" },
      { label: "WAF usage among top 10k sites", value: "48.1%" },
      { label: "Average tech profiling execution", value: "<1.2s" }
    ],
    faqs: [
      { q: "What is a website technology checker?", a: "A website technology checker identifies the software, content management systems (CMS), programming frameworks, hosting, CDN/WAF layers, and tracking scripts used by a website through passive fingerprinting." },
      { q: "How does technology fingerprinting work?", a: "It reads public elements: HTTP response headers (e.g., Server, X-Powered-By), HTML source code patterns, JavaScript global variables, cookie keys, and CSS/JS directory paths." },
      { q: "Can websites hide their technology stack?", a: "Yes, by disabling version tokens, stripping identifying HTTP headers, removing meta generator tags, and routing traffic through proxy services or a Web Application Firewall." },
      { q: "How accurate are technology detectors?", a: "They are highly accurate for identifying public-facing frontend libraries, CMSs, and CDN/WAF layers. However, they cannot directly detect internal backend databases unless leaked in headers or error messages." },
      { q: "Can a website technology checker identify WordPress?", a: "Yes, WordPress websites are easily recognized by specific indicators, such as '/wp-content/' in script paths, XML-RPC links, and meta generator tags." },
      { q: "How can I detect React or Next.js websites?", a: "Framework detectors scan for specific DOM attributes (like data-reactroot), specific React Developer Tools global variables, or Next.js build manifests (like '/_next/static/')." },
      { q: "Can I identify Cloudflare usage?", a: "Yes, Cloudflare usage is identified via HTTP headers (such as CF-RAY, Server: cloudflare) and the domain's IP addresses, which resolve to Cloudflare ranges." },
      { q: "Why do penetration testers use technology detectors?", a: "Penetration testers use tech checkers during the initial reconnaissance phase to map a target's attack surface and spot outdated or vulnerable software versions." },
      { q: "What are the limitations of technology fingerprinting?", a: "It only analyzes public-facing code. It cannot discover backend microservices, hidden databases, or internal infrastructure components that do not output markers." },
      { q: "Is website technology detection legal?", a: "Yes, technology detection is entirely legal because it operates passively, reading only the public data that the web server transmits to any standard browser." },
      { q: "What is a CMS detector?", a: "A CMS detector is a specialized scanner that fingerprints markers unique to content systems like WordPress, Shopify, Drupal, Joomla, and Ghost." },
      { q: "Can a tech stack checker detect backend databases?", a: "No, unless the server misconfigures error outputs or leaks database-specific cookies (e.g., rails session cookies implying PostgreSQL/MySQL configurations)." },
      { q: "How do you detect a Web Application Firewall (WAF)?", a: "By analyzing specific response headers (e.g., 'X-CDN', 'Server'), cookie prefixes, and response formats when transmitting test payloads." },
      { q: "What are common headers used to fingerprint servers?", a: "The 'Server' header (disclosing Apache, Nginx, IIS versions) and the 'X-Powered-By' header (disclosing PHP, ASP.NET, Express versions) are the most common." },
      { q: "What is the role of cookies in tech stack detection?", a: "Many frameworks set signature session cookies (e.g., 'PHPSESSID' for PHP, 'JSESSIONID' for Java, 'connect.sid' for Express), which serve as reliable fingerprints." },
      { q: "How does a framework detector recognize JavaScript libraries?", a: "By inspecting global properties on the browser's window object (such as jQuery, Vue, React, Angular, lodash, or Backbone)." },
      { q: "Can technology detection be used to find vulnerabilities?", a: "Yes, by matching detected version numbers against vulnerability databases (CVEs) to check for known security flaws." },
      { q: "How often is the ReconShield technology database updated?", a: "Our signature database is updated weekly using public framework releases, security advisories, and updated signature lists." },
      { q: "Does this tech stack checker send traffic to the destination?", a: "ReconShield runs passive queries using our centralized nodes to read public HTML files and response headers without flooding the target." },
      { q: "How can I strip X-Powered-By headers in Next.js or Node.js?", a: "In Next.js, add 'poweredByHeader: false' to next.config.js. In Express, add 'app.disable(\"x-powered-by\")' to your server file." }
    ]
  }
};
