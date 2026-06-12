export function convertMarkdownToPortableText(md) {
  const lines = md.split('\n');
  const blocks = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    if (line.startsWith('## ')) {
      blocks.push({
        _key: `h2-${i}`,
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: line.replace('## ', '') }]
      });
    } else if (line.startsWith('### ')) {
      blocks.push({
        _key: `h3-${i}`,
        _type: 'block',
        style: 'h3',
        children: [{ _type: 'span', text: line.replace('### ', '') }]
      });
    } else if (line.startsWith('> ')) {
      blocks.push({
        _key: `bq-${i}`,
        _type: 'block',
        style: 'blockquote',
        children: [{ _type: 'span', text: line.replace('> ', '') }]
      });
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      blocks.push({
        _key: `li-${i}`,
        _type: 'block',
        listItem: 'bullet',
        level: 1,
        style: 'normal',
        children: [{ _type: 'span', text: line.substring(2) }]
      });
    } else {
      blocks.push({
        _key: `p-${i}`,
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: line }]
      });
    }
  }
  return blocks;
}

export const MOCK_POSTS_DATA = {
  'anatomy-of-passive-osint': {
    title: "The Anatomy of Passive OSINT: Mapping Infrastructure Without Noise",
    slug: "anatomy-of-passive-osint",
    publishedAt: "2026-05-28T09:00:00Z",
    excerpt: "Learn how modern threat hunters map enterprise footprints entirely through cached DNS, transparency logs, and global RIR data without triggering network intrusion detection systems.",
    categories: [{ title: "OSINT & analysis" }],
    author: { name: "Surendra Reddy", slug: "surendra-reddy" },
    estimatedWordCount: 1520,
    body: convertMarkdownToPortableText(`
## Passive Infrastructure Mapping
Passive reconnaissance represents a critical blind spot for many enterprise security programs. While active scans are logged, passive data gathering using certificate transparency logs and regional caching databases leaves zero footprints on target systems.

### Key Investigation Vectors
Security teams must assume that their entire public-facing architecture is mapped and regularly audit their [DNS zone files](/tools/dns-lookup) to purge unused hostnames. Discovering subdomains is easiest through certificate logs.

### The Methodology of Zero-Footprint Reconnaissance
Modern threat intelligence starts with silent mapping. Passive Open Source Intelligence (OSINT) refers to the collection and analysis of data without directly interacting with the target system. Unlike active footprinting, which involves port scanning (e.g., Nmap) and application probing that immediately triggers firewalls and Intrusion Detection Systems (IDS), passive mapping leverages public, third-party databases.

### 1. Certificate Transparency (CT) Logs
Certificate Transparency is an open framework designed to monitor and audit SSL/TLS certificates. Whenever a certificate authority (CA) issues a certificate for a domain, they are legally required to log the certificate in a public, cryptographic ledger. While this prevents unauthorized certificates from being issued, it also acts as a public ledger of all subdomains created by an organization.
For example, querying a CT log engine (like crt.sh) for \`example.com\` will immediately reveal subdomains such as:
- \`dev-stage.internal.example.com\`
- \`vpn-gateway.example.com\`
- \`db-admin.example.com\`

### 2. DNS Zone Cache Scraping
Rather than querying the target's DNS servers directly, threat hunters query public DNS caches and recursive resolvers (like Cloudflare, Google DNS, or Quad9). By harvesting DNS propagation histories from open lookup records, attackers map out IP mappings without sending a single packet to the target network.

### 3. WHOIS and Regional Internet Registries (RIRs)
By querying RIR databases (such as ARIN, RIPE, APNIC, LACNIC, and AFRINIC), investigators identify IP prefixes, Autonomous System Numbers (ASNs), and registered administrative contacts. These profiles map the global infrastructure allocations of the target organization.

### Hardening the Perimeter Against Passive Gathering
Defense against passive OSINT requires a shift in threat modeling:
- **Prune Dangling DNS Records:** Regularly clean up obsolete DNS records pointing to defunct cloud instances.
- **Implement Wildcard Certificates:** Minimize the exposure of internal-use subdomains in public CT logs by using wildcard certificates (\`*.example.com\`) where appropriate.
- **Monitor External Attack Surface:** Use threat intelligence portals to scan what databases have cached about your public assets.
    `)
  },
  'securing-bgp-route-leaks': {
    title: "Securing BGP Route Leaks: Why Large ASNs Fall Victim to Hijacking Campaigns",
    slug: "securing-bgp-route-leaks",
    publishedAt: "2026-05-25T11:30:00Z",
    excerpt: "A deep dive into Autonomous System Number (ASN) path verification, peer filtering mechanisms, and the crucial role of RPKI repository deployment in preventing routing exposures.",
    categories: [{ title: "Threat Intelligence" }],
    author: { name: "Surendra Reddy", slug: "surendra-reddy" },
    estimatedWordCount: 1840,
    body: convertMarkdownToPortableText(`
## Securing BGP Paths
BGP route security remains the Achilles' heel of core internet routing. Rogue route advertisements can redirect enterprise traffic through adversarial infrastructure, enabling man-in-the-middle attacks. Security analysts must verify BGP path logs, configure explicit neighbor maps, and deploy RPKI certificates.

### The Border Gateway Protocol Vulnerability
The Border Gateway Protocol (BGP) was created during the early days of the internet, when routing was established on mutual trust. Under BGP, networks (Autonomous Systems) announce which [IP address blocks](/tools/dns-lookup) they own, which map to DNS A/AAAA records. However, BGP does not natively validate whether a network actually has authorization to announce those prefixes.

### BGP Hijacking and Route Leaks
A BGP hijack occurs when an AS announces an IP prefix it does not own. This causes global routers to send traffic intended for the legitimate owner to the hijacker instead. A route leak is a configuration mistake where an AS announces routes learned from one peer to another peer, causing traffic to flow through unintended subnets. Both issues result in connectivity losses and metadata interception.

### Deploying Cryptographic Guardrails (RPKI)
The primary protection against BGP exploits is Resource Public Key Infrastructure (RPKI). RPKI allows network administrators to publish cryptographic statements called Route Origin Authorizations (ROAs). An ROA binds a specific IP prefix to a designated ASN, allowing BGP routers to validate incoming advertisements.
- **Validate ROA Signatures:** Routers confirm if incoming BGP announcements match active cryptographic bindings.
- **Enforce Strict Peer Filtering:** Configure neighbor relationships to ignore unauthorized prefix advertisements.
- **Monitor Looking Glass Portals:** Regularly audit global routing tables to identify anomalous route announcements.
    `)
  },
  'spf-dkim-dmarc-blueprint': {
    title: "Demystifying SPF, DKIM, and DMARC: A Blueprint for Email Spoofing Defense",
    slug: "spf-dkim-dmarc-blueprint",
    publishedAt: "2026-05-22T08:15:00Z",
    excerpt: "Misconfigured mail records remain the leading vector for business email compromise (BEC). We breakdown how to implement strict authentication protocols to protect corporate brands.",
    categories: [{ title: "Web Security" }],
    author: { name: "Surendra Reddy", slug: "surendra-reddy" },
    estimatedWordCount: 1390,
    body: convertMarkdownToPortableText(`
## Hardening Email Infrastructure
Email spoofing remains one of the primary delivery methods for business compromise payloads. By configuring SPF, DKIM, and strict DMARC enforcement policies, organizations can prevent malicious mail delivery using their domains.

### Understanding the Email Defense Triad
To prevent domain forgery and unauthorized email delivery, security administrators must coordinate three distinct [DNS TXT records](/tools/dns-lookup) that define authorized sending sources.

### 1. Sender Policy Framework (SPF)
SPF allows a domain owner to publish a list of IP addresses and mail servers authorized to send emails from their domain name. Receiving servers check this TXT record to see if the sending IP is whitelisted.
Example SPF record:
\`v=spf1 ip4:192.0.2.0/24 include:_spf.google.com ~all\`

### 2. DomainKeys Identified Mail (DKIM)
DKIM adds a cryptographic signature to email headers. The domain owner publishes a public key in their DNS records. Receiving servers use this key to decrypt the signature in the header, verifying that the email was sent by the domain owner and has not been altered in transit.

### 3. Domain-based Message Authentication, Reporting, and Conformance (DMARC)
DMARC ties SPF and DKIM together. It tells receiving servers how to handle emails that fail SPF or DKIM checks. It supports three policy levels:
- **p=none:** Monitor delivery and send reports, but do not block emails.
- **p=quarantine:** Deliver failing emails directly to the recipient's spam folder.
- **p=reject:** Block failing emails at the gateway, preventing delivery entirely.

### Moving Safely to Reject
Transitioning to \`p=reject\` must be done in phases. Start with \`p=none\` to analyze the reports generated in the \`rua\` tag. Once all legitimate third-party senders (like Salesforce, Mailchimp) are properly aligned with SPF and DKIM, raise the policy to \`p=quarantine\` and eventually \`p=reject\`.
    `)
  },
  'owasp-http-headers-hardening': {
    title: "OWASP Top 10 Web Configuration Audits: Hardening HTTP Headers",
    slug: "owasp-http-headers-hardening",
    publishedAt: "2026-05-19T14:00:00Z",
    excerpt: "Why Content-Security-Policy (CSP), Strict-Transport-Security, and X-Frame-Options are the first line of defense against cross-site scripting and modern clickjacking attacks.",
    categories: [{ title: "Web Security" }],
    author: { name: "Surendra Reddy", slug: "surendra-reddy" },
    estimatedWordCount: 1250,
    body: convertMarkdownToPortableText(`
## OWASP HTTP Headers Hardening
HTTP response security headers provide instructions to the browser on how to isolate web contexts. Content-Security-Policy (CSP), X-Frame-Options, and Strict-Transport-Security form the baseline core of website hardening.

### Baseline Security Headers Definition
By default, web browsers trust the content served by a domain. Security headers restrict browser permissions, preventing dynamic injection exploits.

### 1. Content-Security-Policy (CSP)
CSP allows developers to whitelist the origins of script execution, stylesheet rendering, and connection paths. This blocks Cross-Site Scripting (XSS) and data injection payloads.
Example strict policy:
\`Content-Security-Policy: default-src 'self'; script-src 'self' https://trusted.cdn.com\`

### 2. Strict-Transport-Security (HSTS)
HSTS tells the browser that the site must only be accessed using HTTPS. If a user attempts to connect via HTTP, the browser automatically upgrades the connection to HTTPS before making the request.
Example record:
\`Strict-Transport-Security: max-age=63072000; includeSubDomains; preload\`

### 3. X-Frame-Options
Protects users against clickjacking attacks by dictating whether a browser should allow the page to be loaded inside an \`<iframe>\`. Use \`DENY\` or \`SAMEORIGIN\`.

### 4. X-Content-Type-Options
Prevents the browser from sniffing the MIME type of a file. Forcing the browser to follow the declared content-type block blocks drive-by downloads.
Example record:
\`X-Content-Type-Options: nosniff\`
    `)
  },
  'ssl-tls-regulatory-compliance': {
    title: "The Critical Role of SSL/TLS Ciphers in Regulatory Compliance Frameworks",
    slug: "ssl-tls-regulatory-compliance",
    publishedAt: "2026-05-15T10:45:00Z",
    excerpt: "Outdated transport protocols are direct compliance violations under GDPR and PCI-DSS. Here is how to perform passive checks and audit your cryptography trust chains.",
    categories: [{ title: "Vulnerability Research" }],
    author: { name: "Surendra Reddy", slug: "surendra-reddy" },
    estimatedWordCount: 2100,
    body: convertMarkdownToPortableText(`
## Cryptographic Protocol Auditing
Outdated cryptographic handshakes (SSLv3, TLS 1.0, and TLS 1.1) represent severe configuration risks. Regulated environments must verify they only authenticate with TLS 1.2 and TLS 1.3 ciphers.

### The Cryptographic Compliance Mandate
As computing power increases, older cryptographic algorithms become vulnerable to decryption attacks. Under security frameworks like PCI-DSS and GDPR, using broken ciphers is a compliance violation.

### Identifying Legacy Ciphers
Legacy algorithms like RC4, 3DES, and DES are insecure. Similarly, connection exchanges using CBC (Cipher Block Chaining) modes are vulnerable to padding oracle attacks. Security auditors must verify that their web servers disable TLS 1.0 and TLS 1.1 entirely.

### Best Practices for TLS Configurations
To pass compliance audits, implement the following web server directives:
- **Enforce TLS 1.2 and 1.3:** Disable all previous protocol handshakes.
- **Select ECDHE Cipher Suites:** Ensure Perfect Forward Secrecy is active.
- **Verify Certificate Trust Chains:** Audit certificates to confirm signatures use secure algorithms (e.g., SHA-256) rather than deprecated SHA-1.
    `)
  },
  'shadow-it-exposed-ports': {
    title: "Shadow IT Discovery: Passive Identification of Exposed Database and Administrative Ports",
    slug: "shadow-it-exposed-ports",
    publishedAt: "2026-05-10T16:20:00Z",
    excerpt: "Exposing SSH, RDP, or raw database interfaces to the public internet presents catastrophic risk. We explore how to inventory assets using regional passive telemetry databases.",
    categories: [{ title: "Network Security" }],
    author: { name: "Surendra Reddy", slug: "surendra-reddy" },
    estimatedWordCount: 1670,
    body: convertMarkdownToPortableText(`
## Shadow IT Exposed Interface Scanning
Managing external assets exposure requires continuous inventory tracking. Passive port mapping identifies databases, management panels, and raw consoles exposed to the wider internet.

### The Risk of Shadow IT
Shadow IT refers to any system or software deployed by employees without the approval of the central IT security department. When developers expose databases (like MongoDB, PostgreSQL) or remote consoles (like SSH, RDP) to access services easily, they expose the organization to automated brute-force attacks and vulnerability exploitation.

### Passive Discovery Mechanics
Security teams must scan public datasets to discover these exposures without performing loud port scans. Search portals (like Shodan, Censys) index the public IP space daily.
Auditors check:
- **Port 3389 (RDP):** Windows Remote Desktop exposure.
- **Port 22 (SSH):** Remote console exposures.
- **Ports 3306 & 5432:** Raw database exposures.

### Remediating Exposure Gaps
If administrative services require remote access, place them behind a secure VPN gateway or Zero Trust network access (ZTNA) model. Never expose database interfaces directly to the public internet.
    `)
  },

  // ================= 20 PILLAR CONTENT ARTICLES =================

  // WHOIS CLUSTER

  'domain-registrar-identification': {
    title: "Domain Registrar Identification: Mapping the Supply Chain of Web Assets",
    slug: "domain-registrar-identification",
    publishedAt: "2026-06-03T08:30:00Z",
    excerpt: "Learn how to audit registrars, identify abuse handling channels, and evaluate security controls provided by domain vendors.",
    categories: [{ title: "OSINT & analysis" }],
    author: { name: "Surendra Reddy", slug: "surendra-reddy" },
    estimatedWordCount: 2200,
    body: convertMarkdownToPortableText(`
## Understanding Registrars vs Registries
The registry (e.g. Verisign) [delegates the TLD](/tools/dns-lookup) root zones. The registrar sells individual domains to consumers.

### Evaluating Registrar Security Features
- **Two-Factor Authentication (2FA):** Mandatory for preventing hijackings.
- **EPP Lock Controls:** Preventing unauthorized domain transfers.
- **IP Access Whitelisting:** Limiting registry configuration access.

### Abuse Contact Identification
When dealing with a phishing site, security teams locate the abuse email from the registrar's WHOIS data to submit takedown reports.
    `)
  },
  'domain-expiration-monitoring': {
    title: "Domain Expiration Monitoring: Mitigating Asset Drop and Hijack Vectors",
    slug: "domain-expiration-monitoring",
    publishedAt: "2026-06-03T08:00:00Z",
    excerpt: "Why failing to monitor domain expirations leads to outages and malicious domain speculations. Learn to automate expiration audits.",
    categories: [{ title: "OSINT & analysis" }],
    author: { name: "Surendra Reddy", slug: "surendra-reddy" },
    estimatedWordCount: 2400,
    body: convertMarkdownToPortableText(`
## The Catastrophic Cost of Domain Dropping
If a corporate domain expires, speculators or threat actors can purchase it immediately, breaking the original [DNS configuration](/tools/dns-lookup) and capturing active traffic and inbound emails.

### Expiration Timelines
- **Auto-Renewal Period:** Typically 30-45 days past expiration.
- **Redemption Grace Period:** 30 days of high-fee recovery.
- **Pending Delete:** 5 days before release to the public.

### Best Practices for Expiration Defense
Set critical domains to auto-renew, register domains for multi-year periods, and use a [WHOIS Checker](/tools/whois) to track validity.
    `)
  },

  // SSL/TLS CLUSTER
  'ssl-certificate-explained': {
    title: "SSL Certificate Explained: Public Key Cryptography and Public Trust Chains",
    slug: "ssl-certificate-explained",
    publishedAt: "2026-06-02T10:00:00Z",
    excerpt: "A complete guide explaining how SSL/TLS certificates secure web browsers using public key cryptography and hierarchical trust models.",
    categories: [{ title: "Web Security" }],
    author: { name: "Surendra Reddy", slug: "surendra-reddy" },
    estimatedWordCount: 2500,
    body: convertMarkdownToPortableText(`
## What Is an SSL Certificate?
An SSL/TLS certificate is a digital credential [digitally binding a public key](/tools/dns-lookup) to a specific domain identity that resolves via standard DNS. It forms the backbone of HTTPS.

### Public Key Cryptography
SSL uses asymmetric encryption (RSA/ECC) to securely share session keys, enabling fast symmetric encryption for web traffic.

### The Cryptographic Chain of Trust
Certificates are signed in a chain: Root CA signs Intermediate CA, which signs the Leaf certificate. Validate yours using [SSL Checker](/tools/ssl-checker).

### Types of Validation
- **Domain Validation (DV):** Quick domain authority checks.
- **Organization Validation (OV):** Verifies business registration.
- **Extended Validation (EV):** Strict verification models.
    `)
  },
  'tls-1-3-guide': {
    title: "TLS 1.3 Guide: Implementation, Ciphers, and Performance Hardening",
    slug: "tls-1-3-guide",
    publishedAt: "2026-06-02T09:30:00Z",
    excerpt: "A detailed technical review of TLS 1.3, explaining handshake improvements, zero round-trip times (0-RTT), and deprecated cipher suites.",
    categories: [{ title: "Web Security" }],
    author: { name: "Surendra Reddy", slug: "surendra-reddy" },
    estimatedWordCount: 2600,
    body: convertMarkdownToPortableText(`
## The Evolution of Transport Encryption
TLS 1.3 represents a major redesign of the handshake protocol, prioritizing speed and eliminating legacy cryptographic vulnerabilities.

### Key Handshake Improvements
TLS 1.3 reduces the handshake to a single round-trip (1-RTT), and supports 0-RTT for repeating clients.

### Deprecated Cryptographic Algorithms
TLS 1.3 removes support for weak algorithms like RC4, 3DES, MD5, SHA-1, and CBC-mode ciphers.

### Enabling TLS 1.3 On Web Servers
Configure modern web servers like Nginx or Apache to support TLS 1.2 and TLS 1.3, disabling older configurations.
    `)
  },
  'ssl-expiry-monitoring': {
    title: "SSL Expiry Monitoring: Automating Renewal Pipelines for Zero Outages",
    slug: "ssl-expiry-monitoring",
    publishedAt: "2026-06-02T09:00:00Z",
    excerpt: "How to design automated alert systems for SSL certificate expiration monitoring, avoiding browser warning blocks.",
    categories: [{ title: "Web Security" }],
    author: { name: "Surendra Reddy", slug: "surendra-reddy" },
    estimatedWordCount: 2300,
    body: convertMarkdownToPortableText(`
## The Danger of Expired Certificates
Expired certificates trigger block warnings in browsers, halting e-commerce transactions and destroying organic rankings.

### Automating Renewals with ACME
Using tools like Certbot and Let's Encrypt automated renew scripts prevents manual scheduling errors.

### Monitoring Staging and Subdomains
Staging environments and API subdomains are often missed in manual audits. Discover them via the [Subdomain Finder](/tools/subdomain-finder).

### Setting Up Expiry Check Alerts
Incorporate [SSL Checker](/tools/ssl-checker) scripts into CI/CD pipelines to catch expiring assets.
    `)
  },
  'https-security-best-practices': {
    title: "HTTPS Security Best Practices: Hardening Web Server Transport Security",
    slug: "https-security-best-practices",
    publishedAt: "2026-06-02T08:30:00Z",
    excerpt: "A blueprint for securing web servers, configuring cipher suites, enabling HSTS, and implementing perfect forward secrecy.",
    categories: [{ title: "Web Security" }],
    author: { name: "Surendra Reddy", slug: "surendra-reddy" },
    estimatedWordCount: 2700,
    body: convertMarkdownToPortableText(`
## Hardening the Transport Layer
Merely obtaining an SSL certificate is not enough. You must secure the configurations of your web servers and implement [DNS zone hardening](/tools/dns-lookup) like CAA and DNSSEC.

### 1. Disable Outdated Protocols
Disable SSLv2, SSLv3, TLS 1.0, and TLS 1.1 completely in server configurations.

### 2. Configure Cipher Strength
Prefer Elliptic Curve Diffie-Hellman (ECDHE) exchange ciphers to achieve Perfect Forward Secrecy (PFS).

### 3. Enforce Strict-Transport-Security (HSTS)
HSTS forces browsers to only connect via HTTPS. Verify HSTS configuration using [Security Headers Analyzer](/tools/http-headers).
    `)
  },
  'ssl-troubleshooting': {
    title: "SSL Troubleshooting: Resolving Common Certificate and Trust Errors",
    slug: "ssl-troubleshooting",
    publishedAt: "2026-06-02T08:00:00Z",
    excerpt: "A diagnostic guide for resolving trust chain failures, mixed content errors, and name mismatch alerts.",
    categories: [{ title: "Web Security" }],
    author: { name: "Surendra Reddy", slug: "surendra-reddy" },
    estimatedWordCount: 2250,
    body: convertMarkdownToPortableText(`
## Diagnosing Connection Handshake Failures
When users encounter SSL connection blocks, administrators must systematically troubleshoot the root cause.

### 1. Broken Trust Chains (Missing Intermediates)
If your server fails to send the intermediate certificate, mobile devices will block connections. Verify chain paths using the [SSL Checker](/tools/ssl-checker).

### 2. Hostname Mismatch Alerts
Occurs when the domain requested does not match the [names listed in the SAN](/tools/dns-lookup) (Subject Alternative Name) field, which can be verified by resolving CNAME and A record structures.

### 3. Mixed Content Vulnerabilities
If a secure HTTPS page requests scripts or images over unencrypted HTTP, browsers block the resource loading.
    `)
  },

  // EMAIL SECURITY CLUSTER

  'dmarc-enforcement-blueprint': {
    title: "DMARC Enforcement Blueprint: Transitioning to strict p=reject Policies",
    slug: "dmarc-enforcement-blueprint",
    publishedAt: "2026-06-01T09:00:00Z",
    excerpt: "How to deploy DMARC, monitor reports, align SPF/DKIM domains, and safely block phishing emails.",
    categories: [{ title: "Web Security" }],
    author: { name: "Surendra Reddy", slug: "surendra-reddy" },
    estimatedWordCount: 2800,
    body: convertMarkdownToPortableText(`
## The Role of DMARC
DMARC dictates what receiving servers should do if [SPF or DKIM checks](/tools/dns-lookup) fail, verifying message alignment. It relies on SPF/DKIM alignment with the From header.

### DMARC Policy Stages
- **p=none:** Monitor reports without blocking traffic.
- **p=quarantine:** Send failed emails to the spam folder.
- **p=reject:** Drop unauthorized emails entirely.

### Designing the Transition Blueprint
1. Deploy \`p=none\` and configure report collection in the \`rua\` tag.
2. Align all third-party email providers.
3. Move policy to \`p=quarantine\`, and finally \`p=reject\`.
    `)
  },
  'email-spoofing-prevention': {
    title: "Email Spoofing Prevention: Defensive Protocols against Domain Forgery",
    slug: "email-spoofing-prevention",
    publishedAt: "2026-06-01T08:30:00Z",
    excerpt: "A comprehensive review of spoofing vectors, SMTP exploits, and how to align DNS records to protect your brand.",
    categories: [{ title: "Web Security" }],
    author: { name: "Surendra Reddy", slug: "surendra-reddy" },
    estimatedWordCount: 2500,
    body: convertMarkdownToPortableText(`
## Why Spoofing Is Easy
The original SMTP protocol did not authenticate sender identities, allowing anyone to modify headers to appear as any address.

### The Triad of Defense
Combat spoofing by ensuring you [align DNS records](/tools/dns-lookup) for:
1. SPF: IP mapping.
2. DKIM: Cryptographic proof.
3. DMARC: Enforcement rule.

### Verifying Spoofing Exposures
Use the [Email Security Tool](/tools/email-security) to check if your domain lacks quarantine or reject policies.
    `)
  },
  'business-email-compromise-defense': {
    title: "Business Email Compromise Defense: Blocking Inbound Impersonation Attacks",
    slug: "business-email-compromise-defense",
    publishedAt: "2026-06-01T08:00:00Z",
    excerpt: "Analyzing BEC attack vectors, CEO fraud, invoice hijacks, and the administrative controls required to block phishing.",
    categories: [{ title: "Web Security" }],
    author: { name: "Surendra Reddy", slug: "surendra-reddy" },
    estimatedWordCount: 2700,
    body: convertMarkdownToPortableText(`
## Inside Business Email Compromise (BEC)
BEC attacks focus on social engineering rather than malware, using spoofed executive identities to trick employees into transfers.

### Preventing Domain Impersonation
By implementing and auditing [strict SPF/DKIM and DMARC configurations](/tools/dns-lookup), you prevent threat actors from utilizing your domain in spoofing campaigns.

### Technical & Administrative Controls
- Enforce DMARC \`p=reject\` on all corporate root domains.
- Implement employee security awareness training focusing on invoice change requests.
- Deploy secure email gateways (SEG) with display name spoofing detection.
    `)
  },

  // OSINT CLUSTER
  'osint-fundamentals': {
    title: "OSINT Fundamentals: The Building Blocks of Passive Information Gathering",
    slug: "osint-fundamentals",
    publishedAt: "2026-05-30T10:00:00Z",
    excerpt: "An educational review of Open Source Intelligence (OSINT), detailing methodologies, passive search protocols, and collection ethics.",
    categories: [{ title: "OSINT & analysis" }],
    author: { name: "Surendra Reddy", slug: "surendra-reddy" },
    estimatedWordCount: 2400,
    body: convertMarkdownToPortableText(`
## What Is Open Source Intelligence?
OSINT is the collection and analysis of data gathered from publicly available sources to produce actionable intelligence.

### Passive vs Active Reconnaissance
Active recon interacts directly with targets (scanning, probing). Passive recon [queries third-party datasets](/tools/dns-lookup)—such as cached public DNS resolvers—avoiding direct detection.

### The OSINT Lifecycle
1. Requirements identification.
2. Data collection and extraction.
3. Threat profiling and aggregation.
4. Actionable reporting.

### Operational Security (OPSEC)
Always use anonymous proxy networks or sandbox environments when performing active validations to avoid leaking investigator metadata.
    `)
  },

  'attack-surface-mapping': {
    title: "Attack Surface Mapping: Documenting Exposed Infrastructure Boundary Configurations",
    slug: "attack-surface-mapping",
    publishedAt: "2026-05-30T09:00:00Z",
    excerpt: "How to inventory digital assets, detect shadow IT configurations, and mitigate exposures across cloud networks.",
    categories: [{ title: "OSINT & analysis" }],
    author: { name: "Surendra Reddy", slug: "surendra-reddy" },
    estimatedWordCount: 2750,
    body: convertMarkdownToPortableText(`
## Defining the External Attack Surface
The attack surface includes all public-facing assets (subdomains, open ports, web apps, mail servers) exposed to threat actors.

### Steps to Map Your Attack Surface
1. Domain Discovery: [Find root domains and subdomains](/tools/dns-lookup) and resolve their active mappings.
2. **Port Auditing:** Identify active network services.
3. **Configuration Check:** Check security headers and TLS protocol suites.

### Continuous Attack Surface Management
Deploy continuous exposure audits to catch shadow IT before vulnerabilities are abused. Run scans via [Security Exposure Assessment](/tools/vulnerability-scanner).
    `)
  },
  'subdomain-enumeration': {
    title: "Subdomain Enumeration: Methods for Discovering Hidden Target Namespaces",
    slug: "subdomain-enumeration",
    publishedAt: "2026-05-30T08:30:00Z",
    excerpt: "Comparing passive certificate scraping and active DNS brute-forcing to discover hidden subdomains.",
    categories: [{ title: "OSINT & analysis" }],
    author: { name: "Surendra Reddy", slug: "surendra-reddy" },
    estimatedWordCount: 2300,
    body: convertMarkdownToPortableText(`
## Why Enumerate Subdomains?
Threat actors look for unmanaged subdomains (e.g. \`staging-api.example.com\`) which often use weaker credentials and outdated software.

### Passive Subdomain Scraped Sources
Query Certificate Transparency (CT) logs, scrape search engines, and retrieve DNS indexes using passive tools.

### Mitigating Subdomain Risks
Prune dangling DNS entries to prevent subdomain takeovers. Validate CNAME destinations using our [DNS Lookup](/tools/dns-lookup) tool.
    `)
  },
  'threat-intelligence-collection': {
    title: "Threat Intelligence Collection: Aggregating Feeds for Boundary Hardening",
    slug: "threat-intelligence-collection",
    publishedAt: "2026-05-30T08:00:00Z",
    excerpt: "How to compile IP blacklists, identify compromised credentials, and automate exposure updates.",
    categories: [{ title: "OSINT & analysis" }],
    author: { name: "Surendra Reddy", slug: "surendra-reddy" },
    estimatedWordCount: 2650,
    body: convertMarkdownToPortableText(`
## The Value of Threat Intelligence
Threat intelligence provides context on which threats represent active risks to your specific organization.

### Intelligence Collection Feeds
- **Open-source feeds:** Malicious IP lists, [bad reputation domains](/tools/dns-lookup) that should be audited for DNS anomalies.
- **Credential dumps:** Exposed credentials from breaches.
- **Passive indicators:** Certificate logs indicating phishing setups.

### Integrating Intelligence Into Defensive Configurations
Inject blocked IP lists into edge WAF configurations and restrict access to exposed services based on reputation telemetry.
    `)
  }
};
