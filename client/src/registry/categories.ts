import { ToolCategory } from '@/types/tool';

export interface CategoryMetadata {
  id: ToolCategory;
  name: string;
  slug: string;
  description: string;
  iconName: string;
  accentColor: string;
  itemCount?: number;
}

export const CATEGORIES: CategoryMetadata[] = [
  { id: 'osint', name: 'OSINT & Reconnaissance', slug: 'osint', description: 'Open-source intelligence gathering, target profiling, and digital footprinting tools.', iconName: 'Search', accentColor: 'matrix' },
  { id: 'dns', name: 'DNS & Domain Intelligence', slug: 'dns', description: 'Global DNS record resolution, propagation maps, and nameserver diagnostics.', iconName: 'Globe', accentColor: 'cyan' },
  { id: 'whois', name: 'WHOIS & Registrar Data', slug: 'whois', description: 'Domain registration history, ownership intelligence, and registrar details.', iconName: 'FileText', accentColor: 'blue' },
  { id: 'domains', name: 'Domains & Subdomains', slug: 'domains', description: 'Subdomain discovery, attack surface mapping, and takeover vulnerability checks.', iconName: 'Server', accentColor: 'indigo' },
  { id: 'networking', name: 'Networking & IP Routing', slug: 'networking', description: 'Network diagnostics, CIDR subnet calculation, ping, and traceroute utilities.', iconName: 'Network', accentColor: 'purple' },
  { id: 'ip-intelligence', name: 'IP Intelligence & ASN', slug: 'ip-intelligence', description: 'Autonomous System Number lookups, BGP routing analysis, and IP geolocation.', iconName: 'Radio', accentColor: 'emerald' },
  { id: 'ssl-tls', name: 'SSL/TLS Security', slug: 'ssl-tls', description: 'HTTPS configuration auditing, cipher suite testing, and TLS vulnerability checks.', iconName: 'Lock', accentColor: 'teal' },
  { id: 'certificates', name: 'Digital Certificates', slug: 'certificates', description: 'X.509 certificate chain validation, CSR decoding, and expiration tracking.', iconName: 'Award', accentColor: 'amber' },
  { id: 'email-security', name: 'Email Security & Deliverability', slug: 'email-security', description: 'SPF record validation, DKIM key inspection, and DMARC policy enforcement.', iconName: 'Mail', accentColor: 'sky' },
  { id: 'cryptography', name: 'Cryptography & Ciphers', slug: 'cryptography', description: 'Asymmetric encryption playgrounds, key pair generation, and cipher benchmarks.', iconName: 'Key', accentColor: 'rose' },
  { id: 'encoding', name: 'Encoding & Decoding', slug: 'encoding', description: 'Base64, Hex, URL, HTML entity, and binary data conversion utilities.', iconName: 'Binary', accentColor: 'violet' },
  { id: 'hashing', name: 'Hashing & Checksums', slug: 'hashing', description: 'Cryptographic hash calculation (MD5, SHA256), Bcrypt hashing, and hash identification.', iconName: 'Hash', accentColor: 'fuchsia' },
  { id: 'malware-analysis', name: 'Malware Analysis', slug: 'malware-analysis', description: 'PE header inspection, string obfuscation identification, and disassembling tools.', iconName: 'Bug', accentColor: 'red' },
  { id: 'threat-intelligence', name: 'Threat Intelligence', slug: 'threat-intelligence', description: 'Real-time threat feed querying, CISA KEV tracker, and threat actor profiling.', iconName: 'Crosshair', accentColor: 'orange' },
  { id: 'ioc-analysis', name: 'IOC & Hash Analysis', slug: 'ioc-analysis', description: 'Indicators of Compromise (IOC) sanitization, refanging, and reputation checks.', iconName: 'Microscope', accentColor: 'yellow' },
  { id: 'yara', name: 'YARA Rules', slug: 'yara', description: 'YARA rule syntax validation, testing playground, and rule generation helpers.', iconName: 'Code', accentColor: 'lime' },
  { id: 'sigma', name: 'Sigma Detection Rules', slug: 'sigma', description: 'Sigma rule conversion to Splunk, Elastic, QRadar, and SIEM search strings.', iconName: 'ShieldAlert', accentColor: 'amber' },
  { id: 'windows', name: 'Windows Security', slug: 'windows', description: 'Event ID reference guides, GPO baseline benchmarks, and PowerShell logging checkers.', iconName: 'AppWindow', accentColor: 'blue' },
  { id: 'linux', name: 'Linux Hardening', slug: 'linux', description: 'CIS benchmark hardening script generation, SUID permission auditing, and cron checkers.', iconName: 'Terminal', accentColor: 'green' },
  { id: 'cloud-security', name: 'Cloud Security', slug: 'cloud-security', description: 'Multi-cloud posture management, public asset exposure checkers, and IAM policy linters.', iconName: 'Cloud', accentColor: 'cyan' },
  { id: 'aws', name: 'AWS Security', slug: 'aws', description: 'Amazon S3 public bucket exposure checkers and IAM least-privilege evaluators.', iconName: 'Box', accentColor: 'amber' },
  { id: 'azure', name: 'Azure Security', slug: 'azure', description: 'Microsoft Azure storage blob security and Entra ID permissions checkers.', iconName: 'Layers', accentColor: 'blue' },
  { id: 'gcp', name: 'GCP Security', slug: 'gcp', description: 'Google Cloud Platform bucket exposure and Cloud IAM permission linters.', iconName: 'CloudCog', accentColor: 'red' },
  { id: 'containers', name: 'Containers & Security', slug: 'containers', description: 'Container security posture testing, image vulnerability checks, and runtime linters.', iconName: 'Container', accentColor: 'sky' },
  { id: 'kubernetes', name: 'Kubernetes Security', slug: 'kubernetes', description: 'K8s manifest security posture linters, RBAC checkers, and Kube-bench benchmarks.', iconName: 'Cpu', accentColor: 'indigo' },
  { id: 'docker', name: 'Docker Hardening', slug: 'docker', description: 'Dockerfile security linters, non-root user checkers, and layer optimization tools.', iconName: 'PackageCheck', accentColor: 'blue' },
  { id: 'web-security', name: 'Web Application Security', slug: 'web-security', description: 'OWASP Top 10 auditing, Content Security Policy evaluation, and CORS testing.', iconName: 'LayoutGrid', accentColor: 'emerald' },
  { id: 'api-security', name: 'API Security', slug: 'api-security', description: 'REST & GraphQL security introspection checkers, OpenAPI spec linters, and token auditors.', iconName: 'Link', accentColor: 'purple' },
  { id: 'jwt', name: 'JWT & Token Auditing', slug: 'jwt', description: 'JSON Web Token decoding, signature verification, and weak secret strength testing.', iconName: 'Ticket', accentColor: 'yellow' },
  { id: 'authentication', name: 'Authentication & Identity', slug: 'authentication', description: 'OAuth2/OIDC config checkers, 2FA secret generators, and session security checkers.', iconName: 'Fingerprint', accentColor: 'teal' },
  { id: 'password-security', name: 'Password Security', slug: 'password-security', description: 'Password entropy analysis, breach lookup integration, and policy generators.', iconName: 'KeyRound', accentColor: 'rose' },
  { id: 'forensics', name: 'Digital Forensics', slug: 'forensics', description: 'PCAP packet stream analysis, memory dump command builders, and timeline tools.', iconName: 'ScanSearch', accentColor: 'indigo' },
  { id: 'incident-response', name: 'Incident Response', slug: 'incident-response', description: 'IR triage checklists, IOC extraction pipelines, and playbook generation helpers.', iconName: 'Siren', accentColor: 'red' },
  { id: 'compliance', name: 'Compliance & Frameworks', slug: 'compliance', description: 'ISO 27001, SOC 2, PCI-DSS 4.0, HIPAA, and NIST CSF 2.0 readiness checklists.', iconName: 'ClipboardCheck', accentColor: 'green' },
  { id: 'siem', name: 'SIEM & Log Analysis', slug: 'siem', description: 'Log parsing, syslog event decoders, and SIEM search query formatters.', iconName: 'MonitorCheck', accentColor: 'purple' },
  { id: 'mitre-attack', name: 'MITRE ATT&CK Framework', slug: 'mitre-attack', description: 'Technique explorer, adversary TTP heatmap generators, and mitigation lookups.', iconName: 'Grid', accentColor: 'orange' },
  { id: 'blue-team', name: 'Blue Team Defenses', slug: 'blue-team', description: 'Defensive hardening toolkits, detection rule builders, and security baselines.', iconName: 'ShieldCheck', accentColor: 'blue' },
  { id: 'red-team', name: 'Red Team & Pentesting', slug: 'red-team', description: 'Reverse shell command builders, GTFOBins search, and payload obfuscators.', iconName: 'Swords', accentColor: 'red' },
  { id: 'soc', name: 'SOC Operations', slug: 'soc', description: 'Security Operations Center telemetry dashboards, active sensors, and alert triage.', iconName: 'Activity', accentColor: 'matrix' }
];

export function getCategoryBySlug(slug: string): CategoryMetadata | undefined {
  return CATEGORIES.find(c => c.slug === slug || c.id === slug);
}
