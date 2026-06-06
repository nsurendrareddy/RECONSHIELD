import React from 'react';
import Link from 'next/link';
import { Database, Shield, ShieldAlert, Globe, Key, FileSpreadsheet, Activity, Cpu, CheckSquare, EyeOff, ExternalLink } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
  title: 'Cybersecurity Threat Data Sources & Registries | ReconShield',
  description: 'Learn about the authoritative security intelligence sources, threat feeds, and protocol registries compiled by ReconShield tools and scanner telemetry.',
  alternates: {
    canonical: 'https://reconshield.in/data-sources',
  },
  openGraph: {
    title: 'Cybersecurity Threat Data Sources & Registries | ReconShield',
    description: 'Learn about the authoritative security intelligence sources, threat feeds, and protocol registries compiled by ReconShield tools and scanner telemetry.',
    url: 'https://reconshield.in/data-sources',
    siteName: 'ReconShield',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cybersecurity Threat Data Sources & Registries | ReconShield',
    description: 'Learn about the authoritative security intelligence sources, threat feeds, and protocol registries compiled by ReconShield tools and scanner telemetry.',
  }
};

const DATA_SOURCES = [
  {
    name: 'IANA (Internet Assigned Numbers Authority)',
    purpose: 'Authoritative IP space allocations, standard port number assignments, protocol parameter registries, and TLD root zone databases.',
    url: 'https://www.iana.org',
    category: 'DNS & IP Registries'
  },
  {
    name: 'ARIN, RIPE, APNIC, LACNIC, AFRINIC (Regional Internet Registries)',
    purpose: 'Allocated Autonomous System Numbers (ASN), IP address ranges (IPv4/IPv6), and network operator contact metadata.',
    url: 'https://www.nro.net',
    category: 'DNS & IP Registries'
  },
  {
    name: 'NVD (National Vulnerability Database)',
    purpose: 'NIST-managed CVE (Common Vulnerabilities and Exposures) repository, CVSS scores, and platform configurations (CPE) used by vulnerability scanners.',
    url: 'https://nvd.nist.gov',
    category: 'Vulnerabilities'
  },
  {
    name: 'Spamhaus Project',
    purpose: 'Real-time IP reputation feeds, including DROP (Don\'t Route Or Peer) and EDROP lists, utilized for malicious network diagnostics.',
    url: 'https://www.spamhaus.org',
    category: 'Threat Feeds'
  },
  {
    name: 'AbuseIPDB',
    purpose: 'Crowdsourced IP abuse report database, containing millions of reported malicious IPs scanned for spam, scanning, DDoS, and brute force.',
    url: 'https://www.abuseipdb.com',
    category: 'Threat Feeds'
  },
  {
    name: 'Google & Cloudflare CT logs (Certificate Transparency)',
    purpose: 'Public, append-only logs recording the issuance of SSL/TLS certificates, used to passively discover subdomains and domains.',
    url: 'https://www.certificate-transparency.org',
    category: 'Cryptographic Logs'
  },
  {
    name: 'IETF (Internet Engineering Task Force)',
    purpose: 'Technical RFC standardization documents defining DNS, SMTP, SSL/TLS, HTTP headers, and cryptographic specifications.',
    url: 'https://www.ietf.org',
    category: 'Standards'
  }
];

export default function DataSourcesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://reconshield.in/data-sources/#webpage",
        "url": "https://reconshield.in/data-sources",
        "name": "Cybersecurity Threat Data Sources & Registries | ReconShield",
        "description": "Learn about the authoritative security intelligence sources, threat feeds, and protocol registries compiled by ReconShield tools and scanner telemetry.",
        "breadcrumb": {
          "@id": "https://reconshield.in/data-sources/#breadcrumb"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://reconshield.in/data-sources/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://reconshield.in"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Data Sources",
            "item": "https://reconshield.in/data-sources"
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen pb-24 bg-[#05080f] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-5xl mx-auto px-4 pt-8">
        
        <Breadcrumbs crumbs={[
          { label: 'Data Sources', href: '/data-sources' }
        ]} />

        {/* Header */}
        <div className="border-b border-white/10 pb-8 mb-10 mt-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00ff88]/10 border border-[#00ff88]/20 rounded-full text-[10px] font-mono text-[#00ff88] mb-4 uppercase tracking-widest">
            <Database className="w-3 h-3" />
            <span>Telemetry Standards & Databases</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold font-display leading-tight mb-4">
            ReconShield Intelligence Data Sources
          </h1>
          <p className="text-gray-400 text-base md:text-lg max-w-4xl leading-relaxed">
            Discover the global registries, threat feeds, and protocol standards organizations aggregated by the ReconShield platform.
          </p>
        </div>

        {/* Categories Grid (Technical Content) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* DNS Intelligence */}
          <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-cyan-400">
                <Globe className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold font-display text-white">DNS Intelligence Sources</h2>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              Our DNS intelligence platform aggregates records from internet root zone files managed by IANA, Top-Level Domain (TLD) registries (like Verisign and Nominet), and passive DNS logging databases. Passive DNS mapping records historical IP-to-domain associations, enabling us to detect subdomains that were mapped to assets in the past.
            </p>
            <p className="text-xs text-gray-400 leading-relaxed">
              We also integrate with public resolvers (Cloudflare 1.1.1.1, Google 8.8.8.8, and Quad9 9.9.9.9) to perform live, authoritative NS lookup queries, validating DNSSEC trust chains and checking for SPF/DKIM/DMARC configurations.
            </p>
          </div>

          {/* WHOIS & RDAP */}
          <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-[#00ff88]/10 border border-[#00ff88]/20 rounded-xl text-[#00ff88]">
                <Cpu className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold font-display text-white">WHOIS & RDAP Data Sources</h2>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              Domain registration metadata is fetched directly from the five Regional Internet Registries (RIRs): ARIN (North America), RIPE NCC (Europe & Middle East), APNIC (Asia-Pacific), LACNIC (Latin America), and AFRINIC (Africa). These registries manage block allocations of IP spaces and Autonomous System Numbers (ASN).
            </p>
            <p className="text-xs text-gray-400 leading-relaxed">
              When querying registrar-specific details, ReconShield interfaces with RDAP servers complying with RFC 7480. In cases where TLDs do not yet support RDAP, we fall back to raw WHOIS servers on port 43.
            </p>
          </div>

          {/* Threat Intelligence */}
          <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold font-display text-white">Threat Intelligence Feeds</h2>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              To evaluate host security and IP reputation, ReconShield digests open-source and commercial threat intelligence feeds. We check host IPs against Spamhaus, AbuseIPDB, PhishTank, and emerging threat blocklists.
            </p>
            <p className="text-xs text-gray-400 leading-relaxed">
              These databases aggregate reports of brute force attempts, spam forwarding, botnet commands, and hosting of phishing pages. Our scanning logic parses this information into a consolidated threat score, enabling researchers to quickly evaluate a target IP\'s security posture.
            </p>
          </div>

          {/* SSL/TLS & Certificate Transparency */}
          <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-yellow-500/10 border border-yellow-500/20 rounded-xl text-yellow-400">
                <Key className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold font-display text-white">SSL/TLS Certificate Data</h2>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              Our subdomain enumeration and asset discovery workflows rely heavily on Certificate Transparency (CT) logs. Standardized under RFC 6962, CT is a system of public, cryptographically verifiable, append-only logs. Certificate Authorities (CAs) are mandated to log every issued SSL/TLS certificate to a CT log.
            </p>
            <p className="text-xs text-gray-400 leading-relaxed">
              ReconShield monitors these logs in real-time. By parsing the Common Name (CN) and Subject Alternative Names (SAN) of certificates, we discover subdomains and server endpoints, mapping an enterprise\'s shadow IT infrastructure.
            </p>
          </div>
        </section>

        {/* Methodology Sections */}
        <section className="p-8 rounded-2xl bg-[#0d1117] border border-white/5 shadow-xl mb-16">
          <h2 className="text-xl md:text-2xl font-bold font-display text-white mb-6">
            Data Collection & Validation Methodologies
          </h2>
          
          <div className="space-y-6 text-sm text-gray-300">
            {/* Methodology 1 */}
            <div>
              <h3 className="font-bold text-[#00ff88] mb-2 flex items-center gap-2 text-base">
                <Activity className="w-4 h-4" />
                Data Collection Process
              </h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                ReconShield utilizes a distributed fleet of passive crawlers that perform standard lookup queries without sending intrusive payloads to the targeted networks. Our systems operate on a queuing manager that optimizes request frequency. When a query is initiated on a tool page (e.g., WHOIS Lookup or DNS Resolver), our application routes the query through rate-limiting load balancers, fetching directly from the authoritative registries. By query-caching static DNS records and RDAP payloads, we prevent rate-limiting blocks and deliver immediate results.
              </p>
            </div>

            {/* Methodology 2 */}
            <div>
              <h3 className="font-bold text-[#00ff88] mb-2 flex items-center gap-2 text-base">
                <CheckSquare className="w-4 h-4" />
                Data Validation & Integrity Checks
              </h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                Raw data returned from legacy text servers is highly prone to structural errors and parsing failures. ReconShield enforces strict data validation pipelines:
              </p>
              <ul className="list-disc pl-6 text-gray-400 text-xs space-y-2 mt-2">
                <li><strong>Signature Verification:</strong> We validate cryptographic signatures on SSL certificates using root trust chains (X.509 standard) and verify DNSSEC signatures (RRSIG).</li>
                <li><strong>Cross-Feed Consensus:</strong> For threat reputation scoring, a single report does not flag an IP. ReconShield requires consensus across multiple feeds (e.g., AbuseIPDB and Spamhaus lists) to trigger a warning, reducing false positives.</li>
                <li><strong>Stale Eviction:</strong> DNS and WHOIS records cache with strict TTL limits, purging records every 24 hours to ensure that expired registrations or updated record sets are reflected accurately.</li>
              </ul>
            </div>

            {/* Methodology 3 */}
            <div>
              <h3 className="font-bold text-[#00ff88] mb-2 flex items-center gap-2 text-base">
                <EyeOff className="w-4 h-4" />
                Privacy, Compliance & GDPR Redaction
              </h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                ReconShield respects modern data privacy frameworks (including GDPR, CCPA, and CPRA). Legacy WHOIS databases historically exposed personal details (registrant name, address, phone number, email) publically. Our RDAP and WHOIS parsing engine automatically filters and redacts personal identifiable information (PII) before it is rendered or stored. By focusing exclusively on infrastructure metadata (IP routing, nameservers, autonomous systems, open port statuses), ReconShield delivers vital security context while protecting individual privacy.
              </p>
            </div>
          </div>
        </section>

        {/* Directory List of Registries */}
        <section>
          <h2 className="text-xl md:text-2xl font-bold font-display text-white mb-6">
            Authoritative Registries & Platforms
          </h2>
          <div className="space-y-4">
            {DATA_SOURCES.map((source, i) => (
              <div 
                key={i}
                className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 flex flex-col md:flex-row md:items-center md:justify-between gap-6 hover:border-cyan-500/20 transition-all"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-cyan-500/10 border border-cyan-500/20 text-[9px] font-mono text-cyan-400 uppercase tracking-wider rounded">
                      {source.category}
                    </span>
                    <h3 className="text-sm font-bold font-mono text-white">{source.name}</h3>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed font-sans">{source.purpose}</p>
                </div>
                <div className="shrink-0">
                  <a 
                    href={source.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 px-4 py-2 rounded-xl text-xs font-mono transition-all"
                  >
                    <span>Visit Registry</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
