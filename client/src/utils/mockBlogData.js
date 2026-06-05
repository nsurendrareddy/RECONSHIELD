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
Security teams must assume that their entire public-facing architecture is mapped and regularly audit their DNS zone files to purge unused hostnames. Discovering subdomains is easiest through certificate logs.
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
    `)
  },

  // ================= 20 PILLAR CONTENT ARTICLES =================

  // WHOIS CLUSTER

  'domain-ownership-verification': {
    title: "Domain Ownership Verification: Protocols for Validating Asset Authority",
    slug: "domain-ownership-verification",
    publishedAt: "2026-06-03T09:00:00Z",
    excerpt: "Discover the standard methodologies used to verify domain ownership, from DNS TXT verification to HTML file uploads and cryptographic signatures.",
    categories: [{ title: "OSINT & analysis" }],
    author: { name: "Surendra Reddy", slug: "surendra-reddy" },
    estimatedWordCount: 2300,
    body: convertMarkdownToPortableText(`
## Why Verify Domain Ownership?
Before cloud providers (AWS, Google Cloud) or certificate authorities issue resources scoped to a domain, they must verify ownership authority.

### Verification Methods
- **DNS TXT Record Verification:** Adding a unique token string to your DNS zones. Check ours via [DNS Lookup](/tools/dns-lookup).
- **HTML File Upload:** Uploading a unique token file to the root server.
- **Email Validation:** Receiving verification tokens at contact addresses listed in the WHOIS lookup.
- **Cryptographic Signatures:** Signing payloads using SSL private keys.

### Security Vulnerabilities in Verification
If CNAME records are left dangling, unauthorized actors can take over the subdomain and complete verification checks.
    `)
  },
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
The registry (e.g. Verisign) manages the TLD. The registrar sells individual domains to consumers.

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
If a corporate domain expires, speculators or threat actors can purchase it immediately, capturing active traffic and inbound emails.

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
An SSL/TLS certificate is a digital credential binding a public key to a specific domain identity. It forms the backbone of HTTPS.

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
Merely obtaining an SSL certificate is not enough. You must secure the configurations of your web servers.

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
Occurs when the domain requested does not match the names listed in the SAN (Subject Alternative Name) field.

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
DMARC dictates what receiving servers should do if SPF or DKIM checks fail. It relies on SPF/DKIM alignment with the From header.

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
Combat spoofing by enforcing:
1. **SPF:** IP mapping.
2. **DKIM:** Cryptographic proof.
3. **DMARC:** Enforcement rule.

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
By implementing strict SPF/DKIM and DMARC configurations, you prevent threat actors from utilizing your domain in spoofing campaigns.

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
Active recon interacts directly with targets (scanning, probing). Passive recon queries third-party datasets, avoiding detection.

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
1. **Domain Discovery:** Find root domains and subdomains.
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
- **Open-source feeds:** Malicious IP lists, bad reputation domains.
- **Credential dumps:** Exposed credentials from breaches.
- **Passive indicators:** Certificate logs indicating phishing setups.

### Integrating Intelligence Into Defensive Configurations
Inject blocked IP lists into edge WAF configurations and restrict access to exposed services based on reputation telemetry.
    `)
  }
};
