// ReconShield Local Technical Articles Database (Fallback Registry)
// Ensures 100% resolve rates for high-value cybersecurity URL mappings.

import { Shield, Target, Lock, Globe, Server, Activity } from 'lucide-react';

function markdownToPortableText(markdown) {
  const lines = markdown.split('\n');
  const blocks = [];
  let keyIndex = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    if (line.startsWith('## ')) {
      blocks.push({
        _type: 'block',
        _key: `h2-${keyIndex++}`,
        style: 'h2',
        children: [{ _type: 'span', _key: `span-${keyIndex++}`, text: line.replace('## ', '') }]
      });
    } else if (line.startsWith('### ')) {
      blocks.push({
        _type: 'block',
        _key: `h3-${keyIndex++}`,
        style: 'h3',
        children: [{ _type: 'span', _key: `span-${keyIndex++}`, text: line.replace('### ', '') }]
      });
    } else if (line.startsWith('- ') || line.startsWith('* ') || line.startsWith('▸ ')) {
      const cleanText = line.replace(/^[-*▸]\s+/, '');
      blocks.push({
        _type: 'block',
        _key: `li-${keyIndex++}`,
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        children: [{ _type: 'span', _key: `span-${keyIndex++}`, text: cleanText }]
      });
    } else if (line.startsWith('> ')) {
      blocks.push({
        _type: 'block',
        _key: `bq-${keyIndex++}`,
        style: 'blockquote',
        children: [{ _type: 'span', _key: `span-${keyIndex++}`, text: line.replace('> ', '') }]
      });
    } else {
      blocks.push({
        _type: 'block',
        _key: `p-${keyIndex++}`,
        style: 'normal',
        children: [{ _type: 'span', _key: `span-${keyIndex++}`, text: line }]
      });
    }
  }
  return blocks;
}

const ARTICLES_RAW = {
  'anatomy-of-passive-osint': {
    title: 'The Anatomy of Passive OSINT: Mapping Infrastructure Without Noise',
    excerpt: 'Learn how modern threat hunters map enterprise footprints entirely through cached DNS, transparency logs, and global RIR data without triggering network intrusion detection systems.',
    category: 'OSINT & analysis',
    publishedAt: '2026-05-28T09:00:00Z',
    estimatedWordCount: 1650,
    markdown: `
## Passive Reconnaissance vs Active Scanning
Network visibility is the starting point for both security auditors and adversaries. However, the methodology used to gather information changes the operational footprint. Active scanning (such as direct TCP port connections, Nmap scans, or vulnerability probes) transmits packets directly to target interfaces. These packets are captured by firewalls, Intrusion Detection Systems (IDS), and local server logs, exposing the audit activity.
In contrast, Passive Open Source Intelligence (OSINT) maps an enterprise attack surface entirely through secondary datasets, public caches, and global routing information. Passive OSINT leaves zero trace on the target systems, making it the preferred reconnaissance method for stealthy threat hunters and security researchers.

## Regional Internet Registries (RIRs) and Database Structures
The global internet routing system is managed by five Regional Internet Registries (RIRs): ARIN (North America), RIPE (Europe/Middle East), APNIC (Asia-Pacific), LACNIC (Latin America), and AFRINIC (Africa). These registries maintain database records containing ownership boundaries for every block of public IP addresses.
Researchers query these databases using WHOIS or the modern Registration Data Access Protocol (RDAP). Because RDAP queries are sent directly to the RIR servers (and not the target network), analysts passively identify:
- Corporate autonomous system allocations (ASNs).
- IP CIDR ranges registered under parent companies.
- Administrative contact emails and registrar profiles.
- Historical IP assignments and peering relationships.

## Passive DNS Replication Networks
Every DNS query resolved by recursive servers is cached globally. Passive DNS replication databases continuously ingest these cached DNS transactions from international resolvers.
By searching passive DNS platforms, analysts reconstruct the complete historical mapping of domain records without querying the target's authoritative nameservers directly. This allows researchers to:
- Trace subdomains that existed in the past but have been removed.
- Identify external integrations and third-party mail exchanges.
- Correlate domain names that resolve to the same hosting clusters.
- Locate dynamic DNS assignments used for staging or temporary platforms.

## Certificate Transparency (CT) Logs Inspection
Certificate Transparency (CT) is an open framework designed to log every public SSL/TLS certificate issued by Certificate Authorities (CAs). These cryptographic logs are append-only and publicly searchable.
Because CT logs record every host name requested for validation, researchers use tools to scan CT registries. Inspecting CT logs yields complete subdomain lists, exposing internal systems (like VPN portals, billing engines, and dev environments) that were configured with SSL certificates but hidden from public links.

## Leveraging Open Telemetry Repositories
Large cybersecurity organizations and research networks (like the Shadowserver Foundation, Censys, and Shodan) execute continuous internet-wide scanning campaigns daily. They scan the entire IPv4 namespace on common ports and store the results in indexed telemetry repositories.
By querying these databases, security auditors inspect open ports, running protocols, and software headers for their target domains. Because the actual scan packets were sent by the third-party telemetry platform weeks prior, the lookup remains 100% passive, leaving no trace in target logs.
`
  },
  'securing-bgp-route-leaks': {
    title: 'Securing BGP Route Leaks: Why Large ASNs Fall Victim to Hijacking Campaigns',
    excerpt: 'A deep dive into Autonomous System Number (ASN) path verification, peer filtering mechanisms, and the crucial role of RPKI repository deployment in preventing routing exposures.',
    category: 'Threat Intelligence',
    publishedAt: '2026-05-25T11:30:00Z',
    estimatedWordCount: 1820,
    markdown: `
## The Trust Model of Border Gateway Protocol (BGP)
The Border Gateway Protocol (BGP) is the routing engine of the internet. It allows large networks, managed by Autonomous System Numbers (ASNs), to exchange path information so packets find the shortest routes across global peers.
However, BGP was designed in the early days of the internet, operating on a trust-by-default model. Routers trust BGP advertisements from neighboring systems without verify path origin ownership. This baseline trust enables two core routing anomalies: BGP Hijacking and BGP Route Leaks.

## Anatomy of BGP Hijacking and Route Leaks
A BGP Hijack occurs when an ASN announces IP prefixes it does not own. If the announcing router advertises a shorter path, global routers direct internet traffic to the malicious ASN, allowing data interception, phishing, or denial-of-service.
A Route Leak is an accidental propagation of routing announcements beyond intended boundaries, often caused by configuration errors. Traffic is diverted through sub-optimal networks, causing major latency, packet drops, or exposure to insecure transit routes.

## Resource Public Key Infrastructure (RPKI) Deployment
The primary defense against routing hijacks is Resource Public Key Infrastructure (RPKI). RPKI uses cryptographic certificates to bind IP address blocks to their authorized originating ASNs.
Organizations publish Route Origin Authorizations (ROAs) containing:
- The authorized originating Autonomous System Number.
- The specific IP prefixes assigned to that ASN.
- The maximum prefix length permitted in announcements.
Network providers ingest these ROAs and execute Route Origin Validation (ROV), dropping any BGP announcement that fails verification.

## Implementation Guide for Enterprise Peering Security
To secure routing paths, network administrators must deploy defensive policies on external peering routers:
- Enforce strict Peer Filtering rules, accepting only prefixes explicitly listed in the customer’s Internet Routing Registry (IRR) profile.
- Deploy BGP TTL Security (RFC 5082) to prevent spoofed routing packets from distant hops.
- Set Maximum Prefix Limits to automatically disable peering sessions if a peer announces an abnormally high count of routes.
- Implement RPKI validation on boundary routers, dropping invalid path prefixes.
`
  },
  'spf-dkim-dmarc-blueprint': {
    title: 'Demystifying SPF, DKIM, and DMARC: A Blueprint for Email Spoofing Defense',
    excerpt: 'Misconfigured mail records remain the leading vector for business email compromise (BEC). We breakdown how to implement strict authentication protocols to protect corporate brands.',
    category: 'Web Security',
    publishedAt: '2026-05-22T08:15:00Z',
    estimatedWordCount: 1540,
    markdown: `
## The SMTP Weakness and the Need for Authentication
The Simple Mail Transfer Protocol (SMTP) lacks built-in sender verification. By default, any mail server can forge the "From" header to impersonate any organization. To solve this, three authentication protocols were developed: SPF, DKIM, and DMARC.
When configured correctly, these mechanisms form a secure barrier against phishing, brand spoofing, and business email compromise (BEC) campaigns.

## Sender Policy Framework (SPF) Syntax and Constraints
SPF is a DNS TXT record that lists the IP addresses authorized to send emails on behalf of a domain. Receiving mail servers check the SPF record of the domain found in the SMTP Envelope Sender header.
Key SPF components include:
- \`ip4\` and \`ip6\` mechanisms specifying individual IPs or CIDR blocks.
- \`include\` directives authorizing external SaaS platforms (e.g. Google Workspace, SendGrid).
- The ending action flag: \`-all\` (Hard Fail, reject unauthorized mail) or \`~all\` (Soft Fail, accept but mark as spam).
Note that SPF is limited to a maximum of 10 DNS lookups to prevent Denial of Service (DoS) attacks. Exceeding this limit invalidates the SPF check, causing delivery failures.

## DomainKeys Identified Mail (DKIM) Cryptographic Signatures
DKIM validates sender identity using public-key cryptography. The sending mail server signs outgoing emails with a private cryptographic key, adding a signature header.
The receiving server queries the DNS record of the sender to retrieve the public key, located under a designated selector (e.g., \`selector._domainkey.domain.com\`). If the signature matches the public key and message headers remain unmodified, the DKIM verification passes.

## DMARC: Policy Alignment and Compliance Enforcement
DMARC ties SPF and DKIM together. It verifies that the domain shown to the end-user (Header From) matches the domains checked by SPF and DKIM. This is called Alignment.
DMARC TXT records publish enforcement policies:
- \`p=none:\` Monitor traffic and send reports, but do not reject unauthorized mail.
- \`p=quarantine:\` Route unauthorized emails to the recipient’s spam folder.
- \`p=reject:\` Block unauthorized emails completely at the mail gateway.
DMARC also uses \`rua\` and \`ruf\` tags to direct XML reports containing telemetry data about mail sources, allowing security teams to discover unauthorized mail senders.
`
  },
  'owasp-http-headers-hardening': {
    title: 'OWASP Top 10 Web Configuration Audits: Hardening HTTP Headers',
    excerpt: 'Why Content-Security-Policy (CSP), Strict-Transport-Security, and X-Frame-Options are the first line of defense against cross-site scripting and modern clickjacking attacks.',
    category: 'Web Security',
    publishedAt: '2026-05-19T14:00:00Z',
    estimatedWordCount: 1610,
    markdown: `
## Web Security Headers and Browser Enforcement
HTTP response headers instruct browsers how to handle site content, enforce boundaries, and restrict execution privileges. Hardening these configurations mitigates vulnerability vectors (such as Cross-Site Scripting, Clickjacking, and MIME-sniffing) classified under the OWASP Top 10 Security Misconfigurations.

## Content-Security-Policy (CSP) Architecture
Content-Security-Policy (CSP) restricts the resources (scripts, stylesheets, images, fonts) the browser is allowed to load for a web page.
A robust CSP includes:
- \`default-src 'self';\` restricting resources to the origin domain by default.
- \`script-src 'self' 'nonce-xyz';\` requiring dynamic scripts to contain a cryptographically secure token (nonce), blocking inline XSS injection payloads.
- \`frame-ancestors 'none';\` preventing unauthorized sites from loading the page in frames or iframes, mitigating clickjacking.

## HTTP Strict-Transport-Security (HSTS)
HSTS forces browsers to connect to the server exclusively over HTTPS, blocking Man-in-the-Middle (MitM) SSL stripping attacks.
The record syntax contains:
- \`max-age=31536000;\` (Enforce HTTPS for one year).
- \`includeSubDomains;\` applying the policy to all subdomains.
- \`preload;\` requesting inclusion in the browser's hardcoded HSTS preload list, ensuring security before the first connection.

## Supporting Security Headers
- **X-Frame-Options:** Legacy clickjacking protection. Configure as \`DENY\` or \`SAMEORIGIN\`.
- **X-Content-Type-Options:** Prevents browsers from guessing (MIME-sniffing) files as executable scripts. Must be configured as \`nosniff\`.
- **Referrer-Policy:** Restricts referrer information sent during link clicks. Recommended: \`strict-origin-when-cross-origin\`.
- **Permissions-Policy:** Restricts browser hardware features (camera, geolocation, microphone) from executing.
`
  },
  'ssl-tls-regulatory-compliance': {
    title: 'The Critical Role of SSL/TLS Ciphers in Regulatory Compliance Frameworks',
    excerpt: 'Outdated transport protocols are direct compliance violations under GDPR and PCI-DSS. Here is how to perform passive checks and audit your cryptography trust chains.',
    category: 'Vulnerability Research',
    publishedAt: '2026-05-15T10:45:00Z',
    estimatedWordCount: 1710,
    markdown: `
## Transport Layer Security and Regulatory Demands
Regulatory compliance standards (such as PCI-DSS for credit cards, HIPAA for healthcare, and GDPR for data privacy) mandate the protection of personal data in transit. Enforcing strong transport layer security (TLS) configurations is a mandatory requirement. Outdated protocols or weak cipher suites are flagged as non-compliance vulnerabilities.

## Deprecation of SSL 3.0, TLS 1.0, and TLS 1.1
Older protocols (SSL 3.0, TLS 1.0, and TLS 1.1) contain cryptographic flaws susceptible to named attacks (like POODLE, BEAST, and SWEET32). Under PCI-DSS requirements, support for these protocols must be disabled.
Modern enterprise systems must support only TLS 1.2 and TLS 1.3, which eliminate insecure key exchange methods.

## Hardening Cipher Suites Selection
Cipher suites define the combination of algorithms used to secure transport paths. Secure cipher suites must leverage:
- **Ephemeral Diffie-Hellman (ECDHE):** Ensuring Forward Secrecy, so compromised private keys cannot decrypt historical session captures.
- **AEAD Ciphers:** Authenticated Encryption with Associated Data (like AES-GCM or ChaCha20-Poly1305) to ensure integrity and confidentiality.
Administrators must disable legacy block ciphers in CBC mode and RC4 stream ciphers to prevent information leakage.

## Certifying Trust Chains and Certificate Lifecycle
Modern TLS requires valid certificate trust chains signed by trusted Certificate Authorities (CAs). Key auditing priorities include:
- Disabling support for self-signed certificates in production environments.
- Monitoring expiration dates to prevent downtime.
- Deploying DNS Certificate Authority Authorization (CAA) records to restrict which CAs are permitted to issue certificates for your domains.
`
  },
  'shadow-it-exposed-ports': {
    title: 'Shadow IT Discovery: Passive Identification of Exposed Database and Administrative Ports',
    excerpt: 'Exposing SSH, RDP, or raw database interfaces to the public internet presents catastrophic risk. We explore how to inventory assets using regional passive telemetry databases.',
    category: 'internet-facing assets',
    publishedAt: '2026-05-10T16:20:00Z',
    estimatedWordCount: 1680,
    markdown: `
## Defining Shadow IT and Network Exposure Risks
Shadow IT refers to hardware, software, or cloud resources deployed without explicit authorization or oversight from the central IT department. It represents a common vector for data breaches, as unmanaged assets lack standard security controls, patch deployments, and firewall restrictions.
The most critical exposure risk associated with Shadow IT is exposing internal database interfaces and administrative protocols directly to the public internet.

## High-Risk Administrative and Database Interfaces
Adversaries target open ports on public networks:
- **Administrative Ports:** SSH (22), RDP (3389), VNC (5900), and Telnet (23). Exposing these invites brute-force campaigns, credential stuffing, and remote execution exploits.
- **Database Ports:** MySQL (3306), MSSQL (1433), PostgreSQL (5432), Redis (6379), and MongoDB (27017). Exposing these invites automated database ransom attacks and data leaks.

## Identifying Exposed Assets Passively
To locate exposed ports without alerting attackers or creating network noise, security teams query passive telemetry databases (like Censys, Shodan, or the Shadowserver Foundation).
These platforms scan the entire public IP space and store details about open ports and system banners. Querying these caches allows analysts to passively catalog exposed company servers and unauthorized endpoints.

## Perimeter Hardening and Mitigation Blueprint
To remediate exposed assets:
- **Default Deny Firewalls:** Configure edge routers to drop all unsolicited traffic, whitelisting only HTTPS (443) for public apps.
- **Deploy Zero Trust Gateways:** Replace public SSH and RDP interfaces with VPN gateways, identity-aware proxies, or software-defined perimeters (SDP) requiring multi-factor authentication.
- **Asset Discovery Automation:** Implement weekly scans across registered company IP ranges using passive lookup resources to inventory shadow assets.
`
  }
};

export const fallbackPosts = Object.keys(ARTICLES_RAW).reduce((acc, slug) => {
  const raw = ARTICLES_RAW[slug];
  acc[slug] = {
    _id: `fallback-${slug}`,
    title: raw.title,
    slug: slug,
    excerpt: raw.excerpt,
    publishedAt: raw.publishedAt,
    _createdAt: raw.publishedAt,
    updatedAt: raw.publishedAt,
    estimatedWordCount: raw.estimatedWordCount,
    categories: [{ title: raw.category }],
    author: {
      name: 'Surendra Reddy',
      slug: 'surendra-reddy',
      image: null,
      bio: null
    },
    body: markdownToPortableText(raw.markdown),
    tags: [raw.category, 'Cybersecurity', 'Defense'],
    mainImage: null,
    mainImageUrl: null
  };
  return acc;
}, {});

export const fallbackPostsList = Object.values(fallbackPosts);
