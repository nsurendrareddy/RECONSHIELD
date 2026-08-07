import { ToolMetadata } from '@/types/tool';

export const TOOLS_REGISTRY: ToolMetadata[] = [
  {
    id: 'whois',
    name: 'WHOIS Lookup',
    slug: 'whois',
    tagline: 'Domain ownership and registrar intelligence',
    description: 'Query official domain registration records, registrar details, creation dates, expiration deadlines, and nameservers.',
    category: 'whois',
    secondaryCategories: ['domains', 'osint'],
    tags: ['whois', 'domain', 'registrar', 'osint', 'free', 'instant'],
    iconName: 'Search',
    difficulty: 'Beginner',
    estimatedTime: 'Instant (1s)',
    isPopular: true,
    isFeatured: true,
    faqs: [
      { question: 'What information does WHOIS provide?', answer: 'WHOIS returns domain registrar details, registration/expiry dates, status codes, and active authoritative nameservers.' },
      { question: 'Why are contact details hidden on some domains?', answer: 'ICDR GDPR guidelines allow domain owners to enable WHOIS privacy protection, masking personal emails and physical addresses.' }
    ],
    relatedToolIds: ['dns-lookup', 'subdomain-finder', 'ssl-checker'],
    relatedBlogSlugs: ['what-is-whois-lookup', 'whois-privacy-protection']
  },
  {
    id: 'port-scanner',
    name: 'Port Scanner',
    slug: 'port-scanner',
    tagline: 'Detect open ports and exposed network services',
    description: 'Audit network interfaces to detect open TCP ports, running services, and potential entry points.',
    category: 'networking',
    secondaryCategories: ['web-security', 'red-team'],
    tags: ['nmap', 'port', 'tcp', 'scanner', 'firewall', 'network'],
    iconName: 'Terminal',
    difficulty: 'Intermediate',
    estimatedTime: '3-5 seconds',
    isPopular: true,
    isFeatured: true,
    ports: [21, 22, 23, 25, 53, 80, 110, 143, 443, 3306, 3389, 5432, 8080],
    faqs: [
      { question: 'What is an open port?', answer: 'An open port is a network socket configured to accept incoming connection requests from remote clients or systems.' },
      { question: 'Why should unused ports be closed?', answer: 'Unused open ports expose services to automated brute-force attacks, port scans, and potential remote exploit payloads.' }
    ],
    relatedToolIds: ['whois', 'vulnerability-scanner', 'http-headers'],
    relatedBlogSlugs: ['how-port-scanning-works-open-ports-tcp-vs-udp-security', 'shadow-it-exposed-ports']
  },
  {
    id: 'ssl-checker',
    name: 'SSL Certificate Checker',
    slug: 'ssl-checker',
    tagline: 'Audit SSL/TLS certificate validity and chain',
    description: 'Inspect HTTPS certificate validity, expiration dates, issuing Certificate Authority (CA), SAN domains, and TLS ciphers.',
    category: 'ssl-tls',
    secondaryCategories: ['certificates', 'web-security'],
    tags: ['ssl', 'tls', 'https', 'certificate', 'security', 'crypto'],
    iconName: 'Lock',
    difficulty: 'Beginner',
    estimatedTime: 'Instant (2s)',
    isPopular: true,
    isFeatured: true,
    protocols: ['TLS 1.2', 'TLS 1.3'],
    faqs: [
      { question: 'Why does an SSL certificate expire?', answer: 'Certificates expire after a fixed lifespan (max 398 days) to ensure key security and enforce modern TLS encryption standards.' },
      { question: 'What happens when an SSL certificate expires?', answer: 'Browsers display a critical connection warning (ERR_CERT_DATE_INVALID) and block user access to prevent MITM attacks.' }
    ],
    relatedToolIds: ['http-headers', 'dns-lookup', 'vulnerability-scanner'],
    relatedBlogSlugs: ['ssl-vs-tls-explained-https-security-guide', 'ssl-expiry-monitoring']
  },
  {
    id: 'dns-lookup',
    name: 'DNS Lookup',
    slug: 'dns-lookup',
    tagline: 'Comprehensive DNS record resolution and analysis',
    description: 'Query A, AAAA, MX, TXT, CNAME, NS, SOA, and CAA records across global authoritative DNS servers.',
    category: 'dns',
    secondaryCategories: ['domains', 'email-security'],
    tags: ['dns', 'records', 'mx', 'txt', 'a-record', 'nameserver'],
    iconName: 'Globe',
    difficulty: 'Beginner',
    estimatedTime: 'Instant (1s)',
    isPopular: true,
    isFeatured: true,
    faqs: [
      { question: 'What is an MX record?', answer: 'An MX (Mail Exchanger) record specifies the mail server responsible for accepting incoming emails for a domain.' },
      { question: 'What is a TXT record used for?', answer: 'TXT records hold human or machine-readable text used for domain verification, SPF anti-spoofing policies, and DKIM keys.' }
    ],
    relatedToolIds: ['whois', 'email-security', 'subdomain-finder'],
    relatedBlogSlugs: ['dns-record-types', 'dns-security-explained']
  },
  {
    id: 'email-security',
    name: 'Email Security Checker',
    slug: 'email-security',
    tagline: 'Validate SPF, DKIM, and DMARC anti-spoofing policies',
    description: 'Analyze email authentication records to prevent domain spoofing, phishing abuse, and deliverability drops.',
    category: 'email-security',
    secondaryCategories: ['dns', 'compliance'],
    tags: ['spf', 'dkim', 'dmarc', 'email', 'phishing', 'security'],
    iconName: 'Mail',
    difficulty: 'Intermediate',
    estimatedTime: 'Instant (2s)',
    isPopular: true,
    isFeatured: true,
    faqs: [
      { question: 'What is DMARC?', answer: 'DMARC (Domain-based Message Authentication) dictates how mail servers handle emails that fail SPF or DKIM checks.' },
      { question: 'Why is p=reject recommended?', answer: 'A policy of p=reject blocks unauthenticated emails completely, preventing attackers from spoofing your domain name.' }
    ],
    relatedToolIds: ['dns-lookup', 'http-headers', 'ssl-checker'],
    relatedBlogSlugs: ['spf-dkim-dmarc-blueprint', 'email-spoofing-prevention']
  },
  {
    id: 'http-headers',
    name: 'HTTP Security Headers',
    slug: 'http-headers',
    tagline: 'Evaluate security header configurations and grades',
    description: 'Inspect HTTP response headers for Content-Security-Policy, HSTS, X-Frame-Options, and X-Content-Type-Options.',
    category: 'web-security',
    secondaryCategories: ['ssl-tls', 'api-security'],
    tags: ['headers', 'csp', 'hsts', 'xss', 'security', 'owasp'],
    iconName: 'ShieldAlert',
    difficulty: 'Intermediate',
    estimatedTime: 'Instant (2s)',
    isPopular: true,
    isFeatured: true,
    faqs: [
      { question: 'What is a Content Security Policy (CSP)?', answer: 'CSP is an HTTP response header that restricts which scripts, styles, and media resources a browser can load, stopping XSS.' },
      { question: 'Why is Strict-Transport-Security (HSTS) essential?', answer: 'HSTS forces browsers to communicate strictly over encrypted HTTPS connections, preventing SSL-stripping MITM attacks.' }
    ],
    relatedToolIds: ['ssl-checker', 'vulnerability-scanner', 'tech-detector'],
    relatedBlogSlugs: ['http-security-headers-explained-complete-guide', 'owasp-http-headers-hardening']
  },
  {
    id: 'subdomain-finder',
    name: 'Subdomain Finder',
    slug: 'subdomain-finder',
    tagline: 'Discover public subdomains and attack surface assets',
    description: 'Perform passive subdomain enumeration using Certificate Transparency logs and public asset intelligence.',
    category: 'domains',
    secondaryCategories: ['osint', 'web-security'],
    tags: ['subdomain', 'enumeration', 'ct-logs', 'osint', 'attack-surface'],
    iconName: 'Server',
    difficulty: 'Intermediate',
    estimatedTime: '2-4 seconds',
    isPopular: true,
    isFeatured: true,
    faqs: [
      { question: 'What is subdomain enumeration?', answer: 'Subdomain enumeration is the process of mapping all valid subdomains belonging to a target domain to audit attack surfaces.' },
      { question: 'What is a subdomain takeover vulnerability?', answer: 'A subdomain takeover occurs when a subdomain points to an external cloud resource (e.g. AWS S3, GitHub Pages) that has been deallocated.' }
    ],
    relatedToolIds: ['whois', 'dns-lookup', 'port-scanner'],
    relatedBlogSlugs: ['what-is-subdomain-enumeration', 'subdomain-takeover-guide']
  },
  {
    id: 'tech-detector',
    name: 'Technology Detector',
    slug: 'tech-detector',
    tagline: 'Identify CMS, web frameworks, CDNs, and server stack',
    description: 'Analyze web application headers, HTML DOM footprints, and JavaScript variables to uncover the underlying tech stack.',
    category: 'web-security',
    secondaryCategories: ['osint', 'api-security'],
    tags: ['wappalyzer', 'cms', 'framework', 'tech-stack', 'recon'],
    iconName: 'Cpu',
    difficulty: 'Beginner',
    estimatedTime: 'Instant (2s)',
    isPopular: true,
    faqs: [
      { question: 'How does technology detection work?', answer: 'Tech detection scans HTTP headers (e.g. Server, X-Powered-By), HTML meta tags, script URLs, and global JS object signatures.' }
    ],
    relatedToolIds: ['http-headers', 'vulnerability-scanner', 'subdomain-finder'],
    relatedBlogSlugs: ['free-cybersecurity-tools']
  },
  {
    id: 'ip-lookup',
    name: 'IP & ASN Intelligence',
    slug: 'ip-lookup',
    tagline: 'IP geolocation, ASN routing, and ISP identification',
    description: 'Query IP addresses for Autonomous System Numbers (ASN), BGP network range, ISP owner, country location, and threat reputation.',
    category: 'ip-intelligence',
    secondaryCategories: ['networking', 'threat-intelligence'],
    tags: ['ip', 'asn', 'geolocation', 'bgp', 'isp', 'reputation'],
    iconName: 'Radio',
    difficulty: 'Beginner',
    estimatedTime: 'Instant (1s)',
    isPopular: true,
    faqs: [
      { question: 'What is an Autonomous System Number (ASN)?', answer: 'An ASN is a unique number assigned to a network routing domain controlled by an ISP, enterprise, or cloud provider.' }
    ],
    relatedToolIds: ['whois', 'dns-lookup', 'port-scanner'],
    relatedBlogSlugs: ['ip-reputation-check-guide', 'securing-bgp-route-leaks']
  },
  {
    id: 'vulnerability-scanner',
    name: 'Vulnerability Scanner',
    slug: 'vulnerability-scanner',
    tagline: 'Identify web security weaknesses and misconfigurations',
    description: 'Run automated passive diagnostics to uncover missing security headers, outdated SSL protocols, and exposed administrative paths.',
    category: 'web-security',
    secondaryCategories: ['ssl-tls', 'compliance'],
    tags: ['vulnerability', 'scan', 'owasp', 'security', 'cve'],
    iconName: 'ShieldAlert',
    difficulty: 'Intermediate',
    estimatedTime: '3-6 seconds',
    isPopular: true,
    isFeatured: true,
    faqs: [
      { question: 'Is this vulnerability scan passive or active?', answer: 'ReconShield runs non-intrusive passive checks that analyze public responses without executing destructive exploit payloads.' }
    ],
    relatedToolIds: ['http-headers', 'ssl-checker', 'port-scanner'],
    relatedBlogSlugs: ['how-to-scan-a-website-for-vulnerabilities-2026', 'owasp-top-10-explained']
  }
];

export function getToolById(id: string): ToolMetadata | undefined {
  return TOOLS_REGISTRY.find(t => t.id === id || t.slug === id);
}

export function getToolsByCategory(category: string): ToolMetadata[] {
  return TOOLS_REGISTRY.filter(t => t.category === category || t.secondaryCategories?.includes(category as any));
}
