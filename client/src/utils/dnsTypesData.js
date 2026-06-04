// ReconShield DNS Record Types SEO Data
// Provides comprehensive security analysis, configuration guides, and FAQs for programmatic landing pages.

export const DNS_TYPES_DATA = {
  'a-record': {
    name: "A Record (Address Record)",
    title: "A Record – DNS Address Configuration & Security Exposure Audits",
    description: "Learn what the DNS A Record is, its fundamental role in internet routing, potential configuration risks (including CNAME loops), and how to secure IP mapping.",
    content: `
## What is a DNS A Record?
The Address (A) record is the most fundamental resource record in the Domain Name System (DNS). It maps a host name to a 32-bit IPv4 address. When you type a domain (such as example.com) into your browser, the resolver queries the authoritative name servers to find the A record, allowing the client to establish a TCP/IP connection to the server's IP address.

## How the A Record Pipeline Works
When an A record is queried:
1. **User Request:** The client browser requests the IP for the hostname.
2. **Recursive Resolver:** Checks its cache. If expired or not present, it queries the Root Server.
3. **Root and TLD Server:** Refers the resolver to the authoritative name server for the target domain.
4. **Authoritative Server:** Returns the IPv4 address configured in the A record alongside the Time-To-Live (TTL) value.

## Cybersecurity Risks of Misconfigured A Records
DNS A records are major targets for threat actors seeking to hijack traffic or profile infrastructure:
* **DNS Spoofing & Cache Poisoning:** If the authoritative nameservers do not enforce DNSSEC, attackers can forge A records to redirect traffic to phishing pages.
* **Orphaned IPs & Subdomain Takeovers:** If an A record points to a decommissioned server IP that is subsequently reassigned to another hosting customer, that customer can hijack the subdomain's traffic.
* **Asset Discovery Mapping:** Passive scanners and threat actors harvest A records across subdomains to map out the external attack surface of an enterprise.

## Defensive Mitigation & Configuration Best Practices
* **Enforce DNSSEC:** Cryptographically sign your DNS zones to guarantee that the resolver receives authentic A record data.
* **Regular IP Inventory Checks:** Audit your A records to ensure none point to expired or unallocated hosting services.
* **Optimal TTL Settings:** Configure appropriate TTL values. Use shorter TTLs (e.g., 300 seconds) for dynamic services to allow quick IP rotation in the event of a server breach.
    `,
    faqs: [
      { q: "What does an A record do?", a: "It maps a domain or subdomain hostname to its corresponding IPv4 address." },
      { q: "Can a domain have multiple A records?", a: "Yes. Configuring multiple A records for a single host is a common load balancing technique known as Round Robin DNS." },
      { q: "What is the difference between an A record and a AAAA record?", a: "An A record maps to an IPv4 address, while a AAAA record maps to an IPv6 address." },
      { q: "How long does it take for an A record change to propagate?", a: "Propagation time is governed by the Time-To-Live (TTL) of the previous record, typically ranging from a few minutes to 24 hours." },
      { q: "Can an A record point to another domain name?", a: "No. An A record must point to a raw IP address. To point to another domain name, you must use a CNAME record." }
    ],
    relatedTools: ['dns-lookup', 'subdomain-finder', 'ip-lookup']
  },
  'aaaa-record': {
    name: "AAAA Record (IPv6 Address Record)",
    title: "AAAA Record – IPv6 DNS Configuration & Security Audit Guide",
    description: "Understand the IPv6 AAAA record, how it enables modern routing, associated threat models, and how to verify AAAA security alignment.",
    content: `
## What is a DNS AAAA Record?
The AAAA (Quad-A) record operates identically to the standard A record, but instead of mapping to a 32-bit IPv4 address, it maps a hostname to a 128-bit IPv6 address. As the global supply of IPv4 addresses has depleted, AAAA records have become critical for enabling modern internet infrastructure.

## Security Implications of IPv6 AAAA Exposures
While IPv6 provides a massive address space, it introduces distinct threat patterns:
* **Bypassing IPv4-only Firewalls:** Many legacy corporate firewalls and intrusion prevention systems only inspect IPv4 traffic. If a subdomain has an active AAAA record, clients may bypass security controls by routing over IPv6.
* **SLAAC Address Exposure:** Stateless Address Autoconfiguration (SLAAC) can leak MAC addresses or physical host details in the IPv6 suffix, allowing threat actors to trace hardware attributes.
* **WAF Bypass:** Web Application Firewalls (WAFs) must be explicitly configured to inspect IPv6 traffic; otherwise, threat actors can bypass rules by targeting the AAAA endpoint.

## Mitigation & Auditing Guidelines
* **Dual-Stack Firewall Inspections:** Ensure all security boundaries, firewalls, and proxy layers inspect IPv6 traffic with identical parity to IPv4.
* **Obfuscate Hardware IDs:** Use IPv6 privacy extensions to randomize interface identifiers rather than deriving them from hardware MAC addresses.
* **Synchronize A and AAAA Records:** Always audit both configurations. An out-of-sync AAAA record can lead to partial site outages or traffic diversion if one of the targets is compromised.
    `,
    faqs: [
      { q: "What is a AAAA record?", a: "A DNS record that maps a domain name to a 128-bit IPv6 address." },
      { q: "Why is it called a Quad-A record?", a: "Because IPv6 addresses are four times larger (128 bits) than IPv4 addresses (32 bits), requiring four times the space of an A record." },
      { q: "Is IPv6 more secure than IPv4?", a: "The protocols themselves have similar security properties, but IPv6 is often misconfigured or unmonitored, creating unique security exposures." },
      { q: "Do I need a AAAA record if I have an A record?", a: "It is not strictly required, but highly recommended to support clients connecting via IPv6-only networks." },
      { q: "Can a CNAME alias point to a AAAA record?", a: "Yes. A CNAME points to a domain name, which can resolve to A, AAAA, or both depending on the client query." }
    ],
    relatedTools: ['dns-lookup', 'ip-lookup', 'vulnerability-scanner']
  },
  'mx-record': {
    name: "MX Record (Mail Exchanger)",
    title: "MX Record – DNS Mail Exchange Security & Spam Defenses",
    description: "Analyze the DNS MX record structure, its role in mail delivery, how threat actors target mail flow, and how to verify email security records.",
    content: `
## What is a DNS MX Record?
The Mail Exchanger (MX) record specifies the mail servers responsible for accepting incoming email messages on behalf of a domain name. It includes a preference value, telling sender systems which mail server to try first when delivering messages.

## MX Preference and Mail Routing
An MX record contains:
1. **Mail Server Hostname:** The domain name of the mail server (e.g., mail.example.com).
2. **Priority/Preference:** A numeric value where lower numbers indicate higher priority. The sending server will attempt delivery to the server with the lowest preference value first.

## Threat Models Involving MX Records
MX records are primary targets for phishing and interception:
* **Backup Mail Server Exploits:** Attackers often look for backup MX servers (higher preference numbers) that have weaker spam filtering than the primary mail server. They send spam directly to the backup server to bypass defenses.
* **MX Hijacking:** If an attacker gains access to the DNS zone file, they can alter the MX record to route all incoming corporate email to an attacker-controlled server, harvesting sensitive attachments and login links.
* **Email Spoofing Verification:** MX records must align with SPF records. If SPF records are misconfigured, attackers can spoof incoming mail by sending from unauthorized relays.

## Recommendations for Mail Security
* **Filter Backup MX Servers:** Apply identical spam filtering and validation rules to all mail servers listed in your MX records, regardless of their preference level.
* **Enforce TLS on Mail Servers:** Ensure mail servers support MTA-STS (Mail Transfer Agent Strict Transport Security) to force secure TLS encryption on all incoming connections.
* **Audit MX Zone Entanglements:** Never point an MX record to a CNAME alias; industry RFC standards require MX records to point directly to an A or AAAA host record.
    `,
    faqs: [
      { q: "What is the purpose of an MX record?", a: "It tells the internet which mail servers are authorized to receive incoming emails for your domain." },
      { q: "Can I have multiple MX records?", a: "Yes. Multiple MX records provide redundancy and failover, routing mail to secondary servers if the primary goes offline." },
      { q: "What does the priority number mean in an MX record?", a: "It dictates the order in which sending servers try to deliver email. The server with the lowest preference number is contacted first." },
      { q: "Can an MX record point to an IP address?", a: "No. MX records must point to a domain name (hostname), which then resolves to an IP via an A or AAAA record." },
      { q: "How do MX records interact with SPF?", a: "SPF records reference your MX records (using the 'mx' mechanism) to verify if the sending IP is authorized to send email." }
    ],
    relatedTools: ['email-security', 'dns-lookup', 'port-scanner']
  },
  'txt-record': {
    name: "TXT Record (Text Record)",
    title: "TXT Record – DNS Metadata, SPF/DKIM Verification & Exploit Audits",
    description: "Detailed analysis of DNS TXT records. Understand how they host email security policies, validation metadata, and audit security compliance.",
    content: `
## What is a DNS TXT Record?
The Text (TXT) resource record allows domain administrators to insert arbitrary text into DNS zone files. Historically used for human-readable notes, TXT records have evolved into the primary vehicle for hosting security policies, domain verification metadata, and cryptographic public keys.

## Key Uses of TXT Records in Modern Security
* **SPF (Sender Policy Framework):** Declares which IP addresses are authorized to send email from the domain.
* **DMARC (Domain-based Message Authentication):** Defines how receivers handle emails that fail SPF/DKIM verification.
* **Domain Verification:** Services like Google Search Console, Microsoft 365, and SSL CAs require domain owners to add specific TXT records to prove ownership.
* **DKIM (DomainKeys Identified Mail) Keys:** TXT records store the cryptographic public keys used to verify email header signatures.

## Security Exposures of TXT Records
Because TXT records are publicly queryable, they present several security considerations:
* **Information Leakage:** TXT records often leak internal infrastructure details, disclosing which CRM, hosting, or analytics platforms the organization uses.
* **Dangling Verification Records:** Organizations often fail to remove validation TXT records after verifying a service. Threat actors search for these stale records to hijack unclaimed SaaS accounts.
* **TXT Syntax Hijacking:** Small typos in SPF or DMARC TXT records can invalidate your email authentication, causing legitimate emails to go to spam or allowing attackers to spoof your domain.

## Hardening TXT Configurations
* **Minimize Information Footprint:** Remove validation TXT records immediately once the third-party service verification is complete.
* **Audit Syntax Integrity:** Use tools like ReconShield to validate SPF and DMARC syntax, ensuring there are no double-declaration issues.
* **DKIM Selector Rotation:** Regularly rotate your DKIM selector TXT keys (e.g., every 6 months) to invalidate compromised cryptographic signatures.
    `,
    faqs: [
      { q: "What is a TXT record?", a: "A DNS record that stores arbitrary text data, primarily used for security configurations and domain ownership verification." },
      { q: "Can I have multiple TXT records?", a: "Yes. You can configure multiple TXT records, but you must ensure they do not conflict, especially for SPF policies." },
      { q: "How is a TXT record used for email security?", a: "It hosts the configuration text for SPF (~all or -all rules) and DMARC enforcement records." },
      { q: "What is the maximum character limit for a TXT record?", a: "A single TXT string can be up to 255 characters, but multiple strings can be chained together up to a total of 65,535 bytes." },
      { q: "Why should I delete verification TXT records?", a: "Deleting completed verification records prevents information disclosure and blocks attackers from claiming old accounts." }
    ],
    relatedTools: ['email-security', 'dns-lookup', 'vulnerability-scanner']
  },
  'ns-record': {
    name: "NS Record (Name Server Record)",
    title: "NS Record – DNS Authority Mapping & Zone Delegation Risks",
    description: "Examine the role of DNS NS records, delegate authority models, zone transfers, and critical infrastructure defense strategies.",
    content: `
## What is a DNS NS Record?
The Name Server (NS) record delegates a DNS zone to use a specific authoritative name server. NS records determine which servers host the master DNS records for a domain. If a resolver queries a domain, the NS records dictate where the query is routed next.

## How Delegation of Authority Operates
When you register a domain, the top-level domain (TLD) registry points your NS records to your DNS provider. The provider's servers then act as the source of truth for your A, MX, CNAME, and other resource records.

## Security Threats to NS Authority
NS records represent the keys to your domain's routing control:
* **DNS Registrar Hijacking:** If an attacker compromises your registrar account, they can replace your NS records with their own. This immediately redirects all traffic and mail to the attacker's infrastructure.
* **Lame Delegations:** If a domain points its NS records to name servers that are no longer active, resolving queries will fail or, worse, attackers can register the inactive name server IP and hijack DNS resolution.
* **AXFR Zone Transfer Exposure:** Misconfigured name servers allow anonymous zone transfers (AXFR), permitting anyone to download your entire DNS directory.

## Defenses for NS Records
* **Implement Registrar Lock:** Enable two-factor authentication and registrar lock controls (serverTransferProhibited) to prevent unauthorized NS modifications.
* **Audit Name Server Health:** Check for lame delegations and ensure all listed name servers are active and responsive.
* **Disable Unencrypted AXFR Queries:** Configure your authoritative servers to block unauthorized DNS zone transfer requests.
    `,
    faqs: [
      { q: "What is an NS record?", a: "A DNS record that delegates a DNS zone to use a designated authoritative name server." },
      { q: "How many NS records should a domain have?", a: "A domain should have at least two NS records pointing to separate physical servers for redundancy." },
      { q: "What is a lame delegation?", a: "A configuration error where a domain's NS records point to a server that does not host the domain's DNS zone files." },
      { q: "Can I use different DNS providers simultaneously?", a: "Yes, by adding NS records from both providers, but keeping them synchronized is complex and prone to errors." },
      { q: "How do NS records impact site availability?", a: "If all listed name servers go offline or are misdirected, your entire website, API, and email delivery will fail immediately." }
    ],
    relatedTools: ['dns-lookup', 'whois', 'vulnerability-scanner']
  },
  'soa-record': {
    name: "SOA Record (Start of Authority)",
    title: "SOA Record – DNS Zone Administration & Refresh Interval Hardening",
    description: "Understand the SOA record structure, zone synchronization, serial numbers, and how to optimize SOA security configurations.",
    content: `
## What is a DNS SOA Record?
The Start of Authority (SOA) record is a mandatory resource record that contains administrative metadata about the DNS zone. It identifies the primary name server, the email of the administrator, the serial number of the zone, and various refresh and retry timers.

## The Structure of an SOA Record
An SOA record contains several key fields:
1. **Primary Name Server (MNAME):** The master name server hosting the authoritative zone files.
2. **Responsible Party (RNAME):** The email address of the administrator (with the dot replacing the @ symbol).
3. **Serial Number:** A revision number that increments every time the zone file changes, letting secondary servers know when to sync.
4. **Refresh/Retry Timers:** Dictate how often secondary servers check the primary server for updates.

## Threat Analysis of SOA Exposure
* **Email Enumeration:** The RNAME field discloses the email of the DNS administrator, making them a target for spear-phishing campaigns.
* **Zone Desynchronization:** If refresh and retry timers are misconfigured, secondary name servers may serve stale, obsolete records, creating security gaps.
* **Serial Number Tracking:** Attackers monitor the serial number to track how frequently an organization updates its DNS infrastructure.

## Hardening SOA Records
* **Use Role-Based Emails:** Set the RNAME field to a generic, role-based email alias (e.g., hostmaster.example.com) rather than a personal address.
* **Secure Zone Transfer Authentication:** Use TSIG (Transaction Signature) keys to cryptographically authenticate zone syncs between primary and secondary servers.
* **Adopt Date-Based Serial Numbers:** Standardize your serial numbers in the YYYYMMDDNN format to track changes systematically.
    `,
    faqs: [
      { q: "What is an SOA record?", a: "A mandatory DNS record that stores administrative metadata about a DNS zone." },
      { q: "Why is the SOA record important?", a: "It coordinates zone file synchronization between primary and secondary DNS servers." },
      { q: "What is the serial number in an SOA record?", a: "A version number that increments with every change. Secondary servers use it to detect updates." },
      { q: "What does RNAME represent?", a: "The contact email of the domain administrator, formatted with a dot instead of an @ sign." },
      { q: "How does the negative caching TTL work?", a: "The final value in the SOA record, dictating how long resolvers should cache non-existent (NXDOMAIN) responses." }
    ],
    relatedTools: ['dns-lookup', 'ip-lookup', 'vulnerability-scanner']
  },
  'ptr-record': {
    name: "PTR Record (Pointer Record)",
    title: "PTR Record – Reverse DNS Lookup & Mail Delivery Trust Seals",
    description: "Analyze the PTR record, how reverse DNS validation blocks spam networks, and how to verify IP-to-domain pointer alignment.",
    content: `
## What is a DNS PTR Record?
The Pointer (PTR) record performs reverse DNS lookup. Unlike an A record that maps a domain name to an IP, a PTR record maps an IP address back to its corresponding domain name.

## Reverse DNS (rDNS) Mechanics
When a client connects to a server, the server runs a reverse DNS query on the client's IP. The resolver checks the special pointer domain (in-addr.arpa for IPv4 or ip6.arpa for IPv6) to fetch the PTR record.

## Cybersecurity Role of PTR Records
PTR records are critical for verifying the legitimacy of sending mail servers:
* **Spam Prevention & Trust Seals:** Most modern mail servers automatically reject incoming emails from IP addresses that lack a valid PTR record, as this is a common indicator of dial-up or hijacked residential spam relays.
* **Forward-Confirmed reverse DNS (FCrDNS):** A high-security check where the server resolves the IP's PTR record to a domain, and then queries the domain's A record to verify it points back to the starting IP.
* **Network Forensics:** PTR records allow network administrators to quickly identify hosts in system logs by name rather than sorting through raw IP listings.

## Configuring PTR Records Correctly
* **Coordinate with Your ISP:** Unlike other records, PTR records belong to the owner of the IP space (your ISP or hosting provider). You must request them to set the PTR record for your allocated IPs.
* **Ensure FCrDNS Alignment:** Verify that your PTR domain resolves back to the identical IP address via an A record.
* **Maintain 1-to-1 Mapping:** Ensure each sending IP has exactly one corresponding PTR record to prevent validation errors.
    `,
    faqs: [
      { q: "What is a PTR record?", a: "A DNS record used for reverse DNS lookup, mapping an IP address back to a domain name." },
      { q: "Why do I need a PTR record?", a: "Primarily to prevent emails from being marked as spam. Lacking a PTR record heavily damages mail server reputation." },
      { q: "How do I create a PTR record?", a: "You must request your IP provider (hosting provider or ISP) to create the PTR record, as they control the reverse DNS zone." },
      { q: "What is Forward-Confirmed reverse DNS (FCrDNS)?", a: "A security check verifying that an IP's PTR record resolves to a domain that maps back to the starting IP." },
      { q: "Does every IP need a PTR record?", a: "Only IPs that send email or host public services need PTR records. Client workstations do not require them." }
    ],
    relatedTools: ['dns-lookup', 'ip-lookup', 'email-security']
  },
  'cname-record': {
    name: "CNAME Record (Canonical Name)",
    title: "CNAME Record – DNS Aliasing, Subdomain Takeovers & CNAME Cloaking",
    description: "Complete guide to CNAME records. Learn how aliasing works, security risks of CNAME cloaking, and how to prevent subdomain takeovers.",
    content: `
## What is a DNS CNAME Record?
The Canonical Name (CNAME) record maps an alias hostname to another canonical domain name. It is commonly used to point multiple subdomains to a single root service domain.

## CNAME Resolution Pipeline
When a CNAME is queried:
1. **Request:** The client queries for alias.example.com.
2. **CNAME Response:** The name server returns the canonical domain (service.anotherdomain.com).
3. **Subsequent Resolution:** The client must run a separate query to resolve service.anotherdomain.com to its actual A/AAAA IP address.

## Severe Cybersecurity Risks of CNAME Misconfiguration
CNAME records are highly targeted by attackers:
* **Subdomain Takeover Vulnerabilities:** If a CNAME points to an external cloud service (like an AWS S3 bucket, Heroku app, or Shopify store) that is later deleted or expired, an attacker can register that name on the cloud provider and hijack the subdomain.
* **CNAME Cloaking (Privacy Bypass):** Ad networks use CNAME aliases to trick browsers into treating third-party tracking scripts as first-party scripts, bypassing ad blockers and cookies privacy rules.
* **CNAME Loops:** Misconfiguring CNAME records to point to each other in a circle will cause DNS queries to fail and can exhaust resolver resources.

## Best Practices for CNAME Management
* **Enforce Strict Asset Decommissioning:** Always delete CNAME records pointing to third-party cloud services before canceling or deleting those accounts.
* **Avoid Root CNAME Placements:** According to DNS standards (RFC 1034), a CNAME record cannot coexist with other records. This means you cannot put a CNAME at the root domain (example.com), as it conflicts with MX and NS records. Use ALIAS or ANAME records instead.
* **Automate Subdomain Audits:** Use tools like ReconShield to actively scan your CNAME records for dangling endpoints.
    `,
    faqs: [
      { q: "What is a CNAME record?", a: "A DNS record that maps an alias hostname to a canonical domain name, redirecting requests to the target domain." },
      { q: "Can a CNAME record point to an IP address?", a: "No. A CNAME record must point to another domain name. Only A or AAAA records can point to IP addresses." },
      { q: "What is a subdomain takeover?", a: "A security vulnerability where a CNAME record points to an inactive or expired third-party hosting service, allowing attackers to hijack the domain." },
      { q: "Why can't I use a CNAME record at the root domain?", a: "DNS standards require that if a CNAME is present, no other records can exist for that host. The root domain requires NS and MX records, creating a conflict." },
      { q: "What is CNAME cloaking?", a: "A technique where third-party trackers use a CNAME subdomain on your domain to bypass ad blockers and browser privacy protections." }
    ],
    relatedTools: ['dns-lookup', 'subdomain-finder', 'vulnerability-scanner']
  }
};
