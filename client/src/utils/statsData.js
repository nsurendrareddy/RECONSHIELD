export const STATS_CATEGORIES = {
  'tls-adoption': {
    title: 'TLS Protocol Adoption Telemetry',
    desc: 'Surveys TLS handshake defaults and cryptographic version support across public enterprise interfaces.',
    metrics: [
      { name: 'TLS 1.3 Default Negotiation', value: '85.2%', count: '8,520 hosts' },
      { name: 'TLS 1.2 Default Negotiation', value: '14.7%', count: '1,470 hosts' },
      { name: 'Insecure / Legacy Fallbacks (TLS 1.0/1.1)', value: '0.1%', count: '10 hosts' }
    ],
    methodology: 'Data is gathered weekly from passive SSL scans of 10,000 corporate domain endpoints, matching negotiating version signatures.',
    apa: 'ReconShield Threat Research. (2026). Global TLS Protocol Adoption Telemetry. Retrieved from https://reconshield.in/stats/tls-adoption'
  },
  'security-headers': {
    title: 'HTTP Security Headers Enforcement Rates',
    desc: 'Measures response headers deployed on web frontends to shield clients against cross-site scripting and framing attacks.',
    metrics: [
      { name: 'Strict-Transport-Security (HSTS) Active', value: '45.0%', count: '4,500 hosts' },
      { name: 'Content-Security-Policy (CSP) Declared', value: '28.4%', count: '2,840 hosts' },
      { name: 'X-Frame-Options (XFO) Configured', value: '62.1%', count: '6,210 hosts' },
      { name: 'Referrer-Policy Controlled', value: '35.6%', count: '3,560 hosts' }
    ],
    methodology: 'Monitors HTTP headers returned during standard homepage responses from corporate domains under test.',
    apa: 'ReconShield Threat Research. (2026). HTTP Security Headers Enforcement Rates. Retrieved from https://reconshield.in/stats/security-headers'
  },
  'email-security': {
    title: 'Email Spoofing & Authentication Telemetry',
    desc: 'Analyzes SPF, DKIM, and DMARC TXT records deployed on root enterprise mail servers to block spoofing.',
    metrics: [
      { name: 'SPF Record Configured', value: '92.4%', count: '9,240 hosts' },
      { name: 'DKIM Selectors Identified', value: '74.1%', count: '7,410 hosts' },
      { name: 'DMARC Rule Enforced (Quarantine/Reject)', value: '38.6%', count: '3,860 hosts' }
    ],
    methodology: 'Parses DNS TXT records query responses retrieved from authoritative nameservers for top organization domains.',
    apa: 'ReconShield Threat Research. (2026). Email Spoofing & Authentication Telemetry. Retrieved from https://reconshield.in/stats/email-security'
  },
  'open-port-exposure': {
    title: 'Public Infrastructure Port Exposure Statistics',
    desc: 'Tracks unfiltered administrative and database management listening ports facing the public internet.',
    metrics: [
      { name: 'Port 22 (SSH) Accessible', value: '18.2%', count: '1,820 hosts' },
      { name: 'Port 3389 (RDP) Exposed', value: '2.1%', count: '210 hosts' },
      { name: 'Port 3306 (MySQL) Exposed', value: '3.4%', count: '340 hosts' },
      { name: 'Port 5432 (Postgres) Exposed', value: '0.8%', count: '80 hosts' }
    ],
    methodology: 'Monitors standard listening TCP/UDP sockets mapped across network scans without executing intrusion tests.',
    apa: 'ReconShield Threat Research. (2026). Public Infrastructure Port Exposure Statistics. Retrieved from https://reconshield.in/stats/open-port-exposure'
  },
  'subdomain-security': {
    title: 'Subdomain Exposure & Shadow IT Telemetry',
    desc: 'Audits unmanaged DNS subdomains, staging infrastructure, and dangling SaaS pointers.',
    metrics: [
      { name: 'Shadow IT Dev/Staging Exposure', value: '64.0%', count: '6,400 companies' },
      { name: 'Orphan CNAME Takeover Candidates', value: '2.4%', count: '240 domains' },
      { name: 'Exposed Boundary APIs Mapping', value: '42.8%', count: '4,280 hosts' }
    ],
    methodology: 'Aggregates passive Certificate Transparency (CT) data log streams and matches DNS resolution states.',
    apa: 'ReconShield Threat Research. (2026). Subdomain Exposure & Shadow IT Telemetry. Retrieved from https://reconshield.in/stats/subdomain-security'
  }
};
