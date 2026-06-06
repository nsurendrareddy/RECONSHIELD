import React from 'react';
import Link from 'next/link';
import { FileText, ArrowRight, ShieldCheck, Lock, Terminal, Mail, CheckCircle2, Globe, Database, BookOpen, AlertCircle, Compass } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
  title: 'Cybersecurity Resources & Security Tools Directory | ReconShield',
  description: 'Access free downloadable hardening guides, OSINT frameworks, DNS/email security checklists, and cybersecurity frameworks compiled by security practitioners.',
  alternates: {
    canonical: 'https://reconshield.in/resources',
  },
  openGraph: {
    title: 'Cybersecurity Resources & Security Tools Directory | ReconShield',
    description: 'Access free downloadable hardening guides, OSINT frameworks, DNS/email security checklists, and cybersecurity frameworks compiled by security practitioners.',
    url: 'https://reconshield.in/resources',
    siteName: 'ReconShield',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cybersecurity Resources & Security Tools Directory | ReconShield',
    description: 'Access free downloadable hardening guides, OSINT frameworks, DNS/email security checklists, and cybersecurity frameworks compiled by security practitioners.',
  }
};

const RESOURCES = [
  {
    title: 'Enterprise SSL/TLS Configuration Checklist',
    desc: 'An interactive, step-by-step auditing checklist to configure TLS protocol settings, verify cipher strength, configure HSTS headers, and test chains.',
    type: 'Hardening Checklist',
    icon: Lock,
    iconColor: 'text-emerald-400',
    bgIcon: 'bg-emerald-500/10',
    link: '/docs/resources/ssl-hardening-checklist.pdf'
  },
  {
    title: 'Linux Firewall & Port Exposure Remediation Guide',
    desc: 'UFW and iptables configuration scripts to lock down exposed administration services (SSH, RDP) and secure databases from public scanning.',
    type: 'Configuration Manual',
    icon: Terminal,
    iconColor: 'text-cyan-400',
    bgIcon: 'bg-cyan-500/10',
    link: '/docs/resources/port-exposure-guide.pdf'
  },
  {
    title: 'Email Security Authentication Configuration Pack',
    desc: 'Step-by-step guidance to construct valid SPF TXT records, configure DKIM selectors, and build aligned DMARC policies for domain security.',
    type: 'Policy Checklist',
    icon: Mail,
    iconColor: 'text-purple-400',
    bgIcon: 'bg-purple-500/10',
    link: '/docs/resources/email-auth-guide.pdf'
  }
];

export default function ResourcesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://reconshield.in/resources/#webpage",
        "url": "https://reconshield.in/resources",
        "name": "Cybersecurity Resources & Security Tools Directory | ReconShield",
        "description": "Access free downloadable hardening guides, OSINT frameworks, DNS/email security checklists, and cybersecurity frameworks compiled by security practitioners.",
        "breadcrumb": {
          "@id": "https://reconshield.in/resources/#breadcrumb"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://reconshield.in/resources/#breadcrumb",
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
            "name": "Resources",
            "item": "https://reconshield.in/resources"
          }
        ]
      }
    ]
  };

  return (
    <div className="bg-[#05080f] min-h-screen text-white pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-6xl mx-auto px-4 pt-8">
        
        <Breadcrumbs crumbs={[
          { label: 'Resources', href: '/resources' }
        ]} />

        {/* Page Header */}
        <div className="border-b border-white/10 pb-8 mb-12 mt-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00ff88]/10 border border-[#00ff88]/20 rounded-full text-[10px] font-mono text-[#00ff88] mb-4 uppercase tracking-widest">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Information Security Resource Center</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold font-display leading-tight mb-4">
            Cybersecurity Hardening Resources & Guides
          </h1>
          <p className="text-gray-400 text-lg max-w-4xl leading-relaxed font-sans">
            Free checklists, architectural reference maps, and step-by-step configuration manuals compiled by cybersecurity professionals to secure your attack surface.
          </p>
          <div className="text-[10px] font-mono text-gray-500 mt-4 flex items-center gap-2">
            <span>Last Updated: June 6, 2026</span>
            <span>•</span>
            <span>Compiled by: ReconShield Security Operations Team</span>
          </div>
        </div>

        {/* Downloads Grid */}
        <div className="space-y-6 mb-16">
          <h2 className="text-xl font-bold font-display text-white mb-2 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-cyan-400" />
            <span>Interactive Hardening Checklists</span>
          </h2>
          {RESOURCES.map((res, idx) => {
            const IconComponent = res.icon;
            return (
              <div key={idx} className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:border-[#00ff88]/20 transition-all">
                <div className="flex gap-4 items-start">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${res.bgIcon} ${res.iconColor}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest font-bold">{res.type}</span>
                    <h3 className="text-base font-bold text-white mt-0.5">{res.title}</h3>
                    <p className="text-xs text-gray-400 leading-relaxed font-sans mt-1 max-w-2xl">{res.desc}</p>
                  </div>
                </div>

                <span 
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white/5 border border-white/5 text-xs font-mono rounded-xl text-gray-500 select-none shrink-0 self-stretch md:self-auto justify-center"
                >
                  <FileText className="w-3.5 h-3.5 text-gray-600" /> PDF Coming Soon
                </span>
              </div>
            );
          })}
        </div>

        {/* Technical Resource Center Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          
          {/* DNS Security Resources */}
          <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5">
            <h3 className="text-lg font-bold font-display text-cyan-400 mb-3 flex items-center gap-2">
              <Globe className="w-4 h-4" /> DNS Security Resources
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              The Domain Name System is a critical target for attackers. Secure your DNS architecture by configuring:
            </p>
            <ul className="list-disc pl-5 text-xs text-gray-400 space-y-2 mb-4">
              <li><strong>DNSSEC Validation:</strong> Cryptographically sign your DNS zones to mitigate DNS cache poisoning and redirect injection.</li>
              <li><strong>Secure Zone Transfers:</strong> Restrict AXFR requests to trusted secondary nameservers to prevent infrastructure disclosure.</li>
              <li><strong>CAA Records:</strong> Publish Certificate Authority Authorization records to restrict which CAs are permitted to issue certificates for your domain.</li>
            </ul>
            <Link href="/tools/dns-lookup" className="text-xs font-mono text-cyan-400 hover:underline inline-flex items-center gap-1">
              Test DNS Configuration <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Email Security Resources */}
          <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5">
            <h3 className="text-lg font-bold font-display text-cyan-400 mb-3 flex items-center gap-2">
              <Mail className="w-4 h-4" /> Email Security Resources
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              Phishing and spoofing remain the primary enterprise initial access vectors. Hardening standards include:
            </p>
            <ul className="list-disc pl-5 text-xs text-gray-400 space-y-2 mb-4">
              <li><strong>SPF Optimization:</strong> Structure SPF syntax to avoid exceeding the strict 10 DNS lookup limit (use subnets over macros).</li>
              <li><strong>DKIM Key Length:</strong> Migrate from deprecated 1024-bit signatures to secure 2048-bit RSA keys to prevent key cracking.</li>
              <li><strong>DMARC Alignment:</strong> Configure reporting mailboxes (rua/ruf) to monitor delivery profiles prior to enforcing <code>p=reject</code>.</li>
            </ul>
            <Link href="/tools/email-security" className="text-xs font-mono text-cyan-400 hover:underline inline-flex items-center gap-1">
              Verify Mail Alignments <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Threat Intelligence Resources */}
          <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5">
            <h3 className="text-lg font-bold font-display text-cyan-400 mb-3 flex items-center gap-2">
              <Database className="w-4 h-4" /> Threat Intelligence Resources
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              Track host reputations, malicious indicators, and active botnet controls using verified feeds:
            </p>
            <ul className="list-disc pl-5 text-xs text-gray-400 space-y-2 mb-4">
              <li><strong>STIX/TAXII Standards:</strong> Adopt structured threat sharing patterns to automatically ingest threat intelligence.</li>
              <li><strong>IP Reputation Checking:</strong> Cross-reference public endpoints against Spamhaus and AbuseIPDB records to isolate compromised nodes.</li>
              <li><strong>Feeds Integration:</strong> Automatically ingest IP blocks into local firewalls to intercept ingress brute-force attempts.</li>
            </ul>
            <Link href="/tools/ip-lookup" className="text-xs font-mono text-cyan-400 hover:underline inline-flex items-center gap-1">
              Query IP Reputation <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Vulnerability Assessment Resources */}
          <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5">
            <h3 className="text-lg font-bold font-display text-cyan-400 mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" /> Vulnerability Assessment
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              Systematic scanning isolates exploitable configurations and unpatched application libraries:
            </p>
            <ul className="list-disc pl-5 text-xs text-gray-400 space-y-2 mb-4">
              <li><strong>CVSS Scoring System:</strong> Learn to prioritize vulnerabilities using Common Vulnerability Scoring System weights.</li>
              <li><strong>Internal Scanning:</strong> Combine external scans with credentialed internal audits to identify unpatched services.</li>
              <li><strong>ReconShield Vulnerability Scanner:</strong> Run passive and safe active assessments against target assets.</li>
            </ul>
            <Link href="/tools/vulnerability-scanner" className="text-xs font-mono text-cyan-400 hover:underline inline-flex items-center gap-1">
              Run Vulnerability Scan <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* OSINT Resources */}
          <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5">
            <h3 className="text-lg font-bold font-display text-cyan-400 mb-3 flex items-center gap-2">
              <Terminal className="w-4 h-4" /> OSINT Resources
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              Open Source Intelligence (OSINT) gathers public metadata to map exposure boundaries:
            </p>
            <ul className="list-disc pl-5 text-xs text-gray-400 space-y-2 mb-4">
              <li><strong>Certificate Transparency Logs:</strong> Scan public certificate dumps to locate unmapped staging subdomains.</li>
              <li><strong>Search Engine Dorks:</strong> Use search operators to find exposed logs, config files, and admin panels.</li>
              <li><strong>Subdomain Enumeration:</strong> Implement active and passive enumeration tools to discover shadow assets.</li>
            </ul>
            <Link href="/tools/port-scanner" className="text-xs font-mono text-cyan-400 hover:underline inline-flex items-center gap-1">
              Scan Infrastructure <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Domain Intelligence Resources */}
          <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5">
            <h3 className="text-lg font-bold font-display text-cyan-400 mb-3 flex items-center gap-2">
              <Lock className="w-4 h-4" /> Domain Intelligence Resources
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              Maintain ownership oversight and protect portfolio domains from hijacking:
            </p>
            <ul className="list-disc pl-5 text-xs text-gray-400 space-y-2 mb-4">
              <li><strong>Registry/Registrar Locks:</strong> Enforce transfer locks (<code>clientTransferProhibited</code>) on corporate assets.</li>
              <li><strong>Expiration Auditing:</strong> Track expiration milestones across registry portfolios to prevent hostile drop-catching.</li>
              <li><strong>Whois Protection:</strong> Ensure PII is redacted under GDPR protocols to restrict social engineering vectors.</li>
            </ul>
            <Link href="/tools/whois" className="text-xs font-mono text-cyan-400 hover:underline inline-flex items-center gap-1">
              Verify Domain Ownership <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Learning Path for Beginners */}
        <section className="p-8 rounded-2xl bg-[#0d1117] border border-white/5 shadow-xl mb-12">
          <h2 className="text-xl md:text-2xl font-bold font-display text-white mb-4 flex items-center gap-2">
            <Compass className="w-5 h-5 text-cyan-400" />
            <span>Cybersecurity Learning Path for Beginners</span>
          </h2>
          <p className="text-xs text-gray-300 leading-relaxed mb-6">
            If you are new to network defense and cybersecurity operations, we recommend starting with this structural roadmap to build your capabilities systematically:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-gray-400">
            <div className="border border-white/5 p-4 rounded-xl bg-[#05080f]">
              <span className="font-mono text-cyan-400 font-bold block mb-1">STAGE 1: Network Fundamentals</span>
              Understand the TCP/IP stack, DNS routing, and socket communication. Practice running manual lookups using CLI tools like <code>dig</code>, <code>nslookup</code>, and <code>whois</code>.
            </div>
            <div className="border border-white/5 p-4 rounded-xl bg-[#05080f]">
              <span className="font-mono text-cyan-400 font-bold block mb-1">STAGE 2: Protocol Hardening</span>
              Learn to verify SSL certificates and configure secure TLS cipher suites. Practice setting up SPF, DKIM, and DMARC alignments on sandbox domains.
            </div>
            <div className="border border-white/5 p-4 rounded-xl bg-[#05080f]">
              <span className="font-mono text-cyan-400 font-bold block mb-1">STAGE 3: Threat Hunting</span>
              Dive into vulnerability scans, parse CT log databases, perform port sweeps, and monitor IP reputations to identify and mitigate infrastructure flaws.
            </div>
          </div>
        </section>

        {/* Recommended Security Frameworks */}
        <section className="p-8 rounded-2xl bg-gradient-to-r from-matrix-400/5 to-transparent border border-matrix-400/10 mb-12">
          <h2 className="text-xl md:text-2xl font-bold font-display text-white mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-cyan-400" />
            <span>Recommended Compliance & Security Frameworks</span>
          </h2>
          <p className="text-xs text-gray-300 leading-relaxed mb-4">
            Security teams should align their auditing processes with industry-recognized frameworks to enforce compliance and operational standards:
          </p>
          <ul className="list-disc pl-5 text-xs text-gray-400 space-y-2 mb-6">
            <li><strong>NIST Cybersecurity Framework (CSF):</strong> Guidance from the National Institute of Standards and Technology to identify, protect, detect, respond, and recover.</li>
            <li><strong>CIS Critical Security Controls:</strong> A prioritized set of 18 actions designed to block the most common cyber attacks.</li>
            <li><strong>OWASP Top 10:</strong> Web application security compliance guidelines updated regularly by the Open Web Application Security Project.</li>
            <li><strong>ISO/IEC 27001:</strong> Standard specifications for an Information Security Management System (ISMS).</li>
          </ul>
          <div className="flex flex-wrap gap-4 items-center justify-between pt-4 border-t border-white/5">
            <span className="text-[10px] font-mono text-gray-500 uppercase">Need to read our technical methodology?</span>
            <Link href="/methodology" className="inline-flex items-center gap-2 px-4 py-2 bg-[#00ff88] text-[#05080f] font-mono font-bold text-xs rounded-xl hover:opacity-90 transition-all shrink-0">
              Read Verification Rules <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
