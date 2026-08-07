import { CollectionMetadata } from '@/types/tool';

export const COLLECTIONS: CollectionMetadata[] = [
  {
    id: 'osint-toolkit',
    slug: 'osint-toolkit',
    title: 'OSINT & Reconnaissance Suite',
    tagline: 'Target profiling, domain WHOIS, and subdomain discovery',
    description: 'Complete open-source intelligence pipeline for mapping digital footprints, registrar records, and public attack surfaces.',
    iconName: 'Search',
    toolIds: ['whois', 'subdomain-finder', 'dns-lookup', 'ip-lookup'],
    workflowSteps: [
      { title: 'Step 1: Domain Ownership Inspection', description: 'Query registrar details, creation dates, and nameservers using WHOIS Lookup.', toolId: 'whois' },
      { title: 'Step 2: Subdomain Enumeration', description: 'Discover active subdomains and certificate logs using Subdomain Finder.', toolId: 'subdomain-finder' },
      { title: 'Step 3: DNS Record Resolution', description: 'Resolve A, MX, TXT, and CAA records across global DNS servers.', toolId: 'dns-lookup' },
      { title: 'Step 4: IP & ASN Intelligence', description: 'Gather BGP routing data, ISP owner, and geolocation intelligence.', toolId: 'ip-lookup' }
    ]
  },
  {
    id: 'blue-team-toolkit',
    slug: 'blue-team-toolkit',
    title: 'Blue Team Defense & Hardening Suite',
    tagline: 'Email authentication, HTTP security headers, and TLS auditing',
    description: 'Defensive auditing kit to harden infrastructure, enforce DMARC policies, and eliminate security regressions.',
    iconName: 'ShieldCheck',
    toolIds: ['email-security', 'http-headers', 'ssl-checker', 'vulnerability-scanner'],
    workflowSteps: [
      { title: 'Step 1: Anti-Spoofing Audit', description: 'Validate SPF, DKIM, and DMARC policies to prevent email domain spoofing.', toolId: 'email-security' },
      { title: 'Step 2: HTTP Security Header Hardening', description: 'Grade CSP, HSTS, and X-Frame-Options headers.', toolId: 'http-headers' },
      { title: 'Step 3: SSL/TLS Certificate Audit', description: 'Inspect HTTPS certificate chains, SAN domains, and expiration dates.', toolId: 'ssl-checker' },
      { title: 'Step 4: Passive Vulnerability Assessment', description: 'Scan web servers for security misconfigurations.', toolId: 'vulnerability-scanner' }
    ]
  },
  {
    id: 'soc-toolkit',
    slug: 'soc-toolkit',
    title: 'SOC Analyst Triage Suite',
    tagline: 'Incident response, network port auditing, and threat intelligence',
    description: 'Security Operations Center suite for quick alert triage, port exposure checks, and threat reputation analysis.',
    iconName: 'Activity',
    toolIds: ['port-scanner', 'ip-lookup', 'vulnerability-scanner', 'http-headers'],
    workflowSteps: [
      { title: 'Step 1: Open Port Scan', description: 'Scan IP address for exposed administrative services (SSH, RDP, FTP).', toolId: 'port-scanner' },
      { title: 'Step 2: Reputation Check', description: 'Analyze IP geolocation, ASN routing, and ISP reputation.', toolId: 'ip-lookup' },
      { title: 'Step 3: Security Header Diagnostics', description: 'Verify web application security headers and TLS version compliance.', toolId: 'http-headers' }
    ]
  }
];

export function getCollectionBySlug(slug: string): CollectionMetadata | undefined {
  return COLLECTIONS.find(c => c.slug === slug || c.id === slug);
}
