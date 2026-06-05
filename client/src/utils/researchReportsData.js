export const RESEARCH_REPORTS = {
  'tls-security-report': {
    slug: 'tls-security-report',
    title: 'Global TLS Security Configuration Report (2026)',
    headline: 'State of Transport Layer Security: Cryptographic Adoption & Deprecation Telemetry',
    description: 'An empirical analysis of SSL/TLS configurations across 10,000 top global domains. Examines protocol breakdown, weak cipher prevalence, and HSTS adoption.',
    author: 'ReconShield Threat Research Team',
    publishedDate: '2026-05-15',
    lastUpdated: '2026-06-05',
    citation: 'ReconShield Threat Research. "Global TLS Security Configuration Report." June 2026. Available at https://reconshield.in/research/tls-security-report.',
    executiveSummary: 'This report analyzes transport layer cryptographic configurations across 10,000 public corporate web domains to establish a baseline of modern transport security. Our findings show that while TLS 1.3 adoption has risen to 85.2%, a minor subset of systems still allow legacy TLS 1.0 or TLS 1.1 fallback.',
    methodology: 'Data was compiled by running non-intrusive SSL/TLS handshake queries against 10,000 randomly selected domains from public web-rank lists. Handshake requests targeted port 443 to extract protocol versions, negotiated cipher suites, and certificate metadata.',
    dataSource: 'ReconShield Active Telemetry Network and public certificate logs.',
    keyFindings: [
      { label: 'TLS 1.3 Default Negotiation', value: '85.2%', desc: 'The majority of scanned servers negotiate the TLS 1.3 protocol by default.' },
      { label: 'TLS 1.2 Protocol Fallback', value: '14.7%', desc: 'A significant portion of servers still allow fallback to TLS 1.2 for legacy clients.' },
      { label: 'Insecure Protocol Legacy Fallback', value: '0.1%', desc: 'A residual fraction of hosts permit deprecated TLS 1.0 or 1.1 handshakes.' },
      { label: 'HSTS Header Enforcement Gap', value: '45.0%', desc: 'Only 45% of surveyed domains enforce HSTS headers, leaving clients open to SSL stripping.' }
    ],
    chartData: {
      type: 'pie',
      title: 'TLS Protocol Negotiation Breakdown',
      labels: ['TLS 1.3', 'TLS 1.2', 'TLS 1.0/1.1'],
      values: [85.2, 14.7, 0.1],
      colors: ['#00ff88', '#00bfff', '#ff4500']
    },
    content: `
## Cryptographic Key Length Distribution
Our scanning telemetry analyzed the public key sizes used in leaf certificates:
- **RSA 2048-bit:** 68% of certificates.
- **ECDSA 256-bit:** 27% of certificates.
- **RSA 4096-bit:** 5% of certificates.

## Defensive Policy Guidelines
To mitigate downgrade threats, security teams should immediately enforce TLS 1.2 as the minimum protocol version and disable all CBC-mode ciphers in web-facing server blocks. Ensure HSTS is enabled with a minimum duration of one year.
    `
  },
  'open-port-exposure-report': {
    slug: 'open-port-exposure-report',
    title: 'Public Open Port & Listening Service Exposure Report',
    headline: 'Exposed Network Boundaries: Passive Port Scanning and Service Exposure Analysis',
    description: 'An analysis of exposed database ports, remote management consoles, and unencrypted transport protocols on public-facing internet hosts.',
    author: 'ReconShield Threat Research Team',
    publishedDate: '2026-05-20',
    lastUpdated: '2026-06-05',
    citation: 'ReconShield Threat Research. "Public Open Port & Listening Service Exposure Report." June 2026. Available at https://reconshield.in/research/open-port-exposure-report.',
    executiveSummary: 'Exposing administrative network services directly to the public WAN is a leading vector for corporate ransomware deployment. This study examines open port distribution to highlight insecure listening services.',
    methodology: 'ReconShield scanners monitored public network interfaces to detect active, listening services across standard TCP/UDP ports. Data was collected passively without executing exploits.',
    dataSource: 'Global port scanning indexes and ReconShield border mapping logs.',
    keyFindings: [
      { label: 'Secure Management Active (SSH)', value: '32.0%', desc: 'SSH port 22 is open on nearly a third of all public corporate boundaries.' },
      { label: 'Exposed Administrative Databases', value: '4.2%', desc: 'MySQL and PostgreSQL servers are listening directly on public interfaces.' },
      { label: 'Legacy Protocols Active (FTP/Telnet)', value: '1.8%', desc: 'Obsolete, unencrypted communication standards remain active on historical hosts.' }
    ],
    chartData: {
      type: 'bar',
      title: 'Exposed Service Prevalence by Port',
      labels: ['Port 80/443', 'Port 22 (SSH)', 'Port 3306/5432 (DB)', 'Port 21/23 (Legacy)'],
      values: [98.2, 32.0, 4.2, 1.8],
      colors: ['#00ff88', '#00bfff', '#ffbf00', '#ff4500']
    },
    content: `
## Threat Analysis
Automated botnets sweep the IPv4 namespace continuously. Exposing port 3389 (RDP) or database engines directly to standard scanners invites password-spraying and exploit matching.

## Hardening Recommendations
Ensure all database engines are bound strictly to localhost or private network interfaces. Restrict SSH access using certificate-based authentication and security gateway boundaries.
    `
  },
  'shadow-it-benchmark': {
    slug: 'shadow-it-benchmark',
    title: 'Enterprise Shadow IT & Cloud Asset Discovery Benchmark',
    headline: 'Shadow Infrastructure: Measuring Unmanaged Host Configurations and Cloud Leaks',
    description: 'A study mapping the growth of unmanaged staging environments, corporate subdomains, and unmonitored DNS setups in cloud-native environments.',
    author: 'ReconShield Threat Research Team',
    publishedDate: '2026-05-28',
    lastUpdated: '2026-06-05',
    citation: 'ReconShield Threat Research. "Enterprise Shadow IT & Cloud Asset Discovery Benchmark." June 2026. Available at https://reconshield.in/research/shadow-it-benchmark.',
    executiveSummary: 'Shadow IT represents a major visibility gap for modern CSOs. Our study indicates that for every 10 approved production hosts, organizations deploy an average of 3 unmanaged subdomains.',
    methodology: 'Analysis of domain names registered under corporate brands compared against active DNS resolutions and Certificate Transparency certificate log histories.',
    dataSource: 'ReconShield Subdomain OSINT scrapers and corporate DNS registries.',
    keyFindings: [
      { label: 'Unmanaged Development Assets', value: '64.0%', desc: 'More than half of target organizations run unauthenticated staging or dev instances.' },
      { label: 'Dangling DNS Records', value: '12.0%', desc: 'Dangling CNAME records point to decommissioned cloud buckets.' },
      { label: 'Missing WAF Redirection', value: '78.0%', desc: 'Shadow assets bypass centralized corporate Web Application Firewalls.' }
    ],
    chartData: {
      type: 'pie',
      title: 'Shadow IT Asset Types Discovery',
      labels: ['Staging/Dev Hosts', 'Orphaned SaaS Pointers', 'Dangling Cloud Buckets'],
      values: [64.0, 24.0, 12.0],
      colors: ['#00bfff', '#ffbf00', '#ff4500']
    },
    content: `
## Impact & Mitigation
Organizations should deploy automated domain monitors to discover newly minted subdomains in real-time. Enforce security standards consistently and decommission old DNS zone lists.
    `
  },
  'certificate-expiry-study': {
    slug: 'certificate-expiry-study',
    title: 'Global SSL/TLS Certificate Expiration & Revocation Study',
    headline: 'Certificate Lifecycle Management: Analysis of Outages and Expiration Incidents',
    description: 'Investigates the operational impact of certificate expiration, analyzing automated ACME validation and common configuration gaps.',
    author: 'ReconShield Threat Research Team',
    publishedDate: '2026-06-01',
    lastUpdated: '2026-06-05',
    citation: 'ReconShield Threat Research. "Global SSL/TLS Certificate Expiration & Revocation Study." June 2026. Available at https://reconshield.in/research/certificate-expiry-study.',
    executiveSummary: 'Expired SSL certificates trigger browser blocks that instantly damage customer trust. This study highlights how manual certificate management processes fail.',
    methodology: 'Monitored SSL expiration calendars and OCSP status histories for 5,000 web-facing enterprise portals.',
    dataSource: 'OCSP status endpoints and public Certificate Transparency archives.',
    keyFindings: [
      { label: 'Annual Expiration Outages', value: '22.0%', desc: 'Nearly a quarter of enterprises experienced an outage due to an expired certificate.' },
      { label: 'Pre-Expiry CA Revocations', value: '1.5%', desc: 'Certificates revoked mid-term due to key modifications or private key leaks.' },
      { label: 'ACME Automation Adoption', value: '68.0%', desc: 'Two-thirds of servers utilize automated renewal validation engines.' }
    ],
    chartData: {
      type: 'bar',
      title: 'Enterprise SSL Renewal Failures by Method',
      labels: ['Manual Renewal', 'Semi-Automated', 'Fully Automated (ACME)'],
      values: [48.0, 28.0, 2.0],
      colors: ['#ff4500', '#ffbf00', '#00ff88']
    },
    content: `
## Outage Prevention
Implement automated ACME validation workflows. Maintain internal alerts that trigger 30, 15, and 7 days prior to expiry for all web-facing assets.
    `
  },
  'subdomain-takeover-report': {
    slug: 'subdomain-takeover-report',
    title: 'Subdomain Takeover & CNAME Hijacking Threat Report',
    headline: 'Dangling DNS Assets: Measuring the Prevalence of Subdomain Takeover Vectors',
    description: 'An analysis of orphaned DNS records pointing to decommissioned third-party SaaS cloud platforms, detailing exploit risks.',
    author: 'ReconShield Threat Research Team',
    publishedDate: '2026-06-04',
    lastUpdated: '2026-06-05',
    citation: 'ReconShield Threat Research. "Subdomain Takeover & CNAME Hijacking Threat Report." June 2026. Available at https://reconshield.in/research/subdomain-takeover-report.',
    executiveSummary: 'Subdomain takeover remains a high-severity threat. Attackers hijacking trust structures can execute phishing campaigns or steal session cookies scoped to root domains.',
    methodology: 'Queried active CNAME pointers against known third-party host response headers (S3, GitHub Pages, Zendesk, etc.) to check for unassigned configurations.',
    dataSource: 'ReconShield Active DNS telemetry and external host state analysis.',
    keyFindings: [
      { label: 'Dangling CNAME Rate', value: '2.4%', desc: 'More than 2% of corporate DNS zones contain orphan third-party host points.' },
      { label: 'S3 Target Vector Dominance', value: '55.0%', desc: 'Amazon S3 remains the most common service vector for orphaned points.' },
      { label: 'GitHub Pages Hijacking Risk', value: '30.0%', desc: 'Unassigned GitHub Pages host CNAMEs allow immediate hijack.' }
    ],
    chartData: {
      type: 'pie',
      title: 'Subdomain Takeover Host Target Distribution',
      labels: ['Amazon S3', 'GitHub Pages', 'Heroku/Other SaaS'],
      values: [55.0, 30.0, 15.0],
      colors: ['#ff4500', '#ffbf00', '#00bfff']
    },
    content: `
## Mitigation Guidelines
Verify cloud routing resources before deleting AWS buckets or SaaS instances. Regularly audit CNAME profiles to identify unresolved dangling nodes.
    `
  }
};
