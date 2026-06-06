import React from 'react';
import Link from 'next/link';
import { GitBranch, Shield, Terminal, Globe, Lock, Cpu, Code2, Heart, Award, AlertTriangle, ExternalLink } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
  title: 'Open Source Cybersecurity Tools & Security Projects | ReconShield',
  description: 'Access the authoritative directory of open-source security tools, reconnaissance scripts, and vulnerability scanning repositories compiled by ReconShield.',
  alternates: {
    canonical: 'https://reconshield.in/opensource',
  },
  openGraph: {
    title: 'Open Source Cybersecurity Tools & Security Projects | ReconShield',
    description: 'Access the authoritative directory of open-source security tools, reconnaissance scripts, and vulnerability scanning repositories compiled by ReconShield.',
    url: 'https://reconshield.in/opensource',
    siteName: 'ReconShield',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Open Source Cybersecurity Tools & Security Projects | ReconShield',
    description: 'Access the authoritative directory of open-source security tools, reconnaissance scripts, and vulnerability scanning repositories compiled by ReconShield.',
  }
};

const REPOS = [
  {
    name: 'Security Headers Knowledge Base',
    desc: 'Community-driven configuration templates, validation rules, and parser specifications for security headers (CSP, HSTS, XFO).',
    link: 'https://github.com/reconshield/security-headers-kb',
    tool: '/tools/http-headers',
    toolLabel: 'HTTP Header Grader'
  },
  {
    name: 'SSL/TLS Knowledge Base',
    desc: 'Handshake profiling scripts, cipher suite risk classifications, and CA trust root verification databases.',
    link: 'https://github.com/reconshield/ssl-tls-kb',
    tool: '/tools/ssl-checker',
    toolLabel: 'SSL Checker'
  },
  {
    name: 'Port Security Knowledge Base',
    desc: 'Standard service banner signatures, risk metrics, and firewall configuration syntax definitions (UFW/iptables).',
    link: 'https://github.com/reconshield/port-security-kb',
    tool: '/tools/port-scanner',
    toolLabel: 'Port Scanner'
  },
  {
    name: 'Subdomain Intelligence Knowledge Base',
    desc: 'Passive enumeration heuristics, Certificate Transparency log parsers, and dangling DNS takeover templates.',
    link: 'https://github.com/reconshield/subdomain-intelligence-kb',
    tool: '/tools/port-scanner',
    toolLabel: 'Port Scanner' // Fallback to Port Scanner since dedicated subdomain finder is not registered as tool route
  }
];

const OPEN_SOURCE_DIRECTORY = [
  {
    category: 'OSINT (Open Source Intelligence) Tools',
    tools: [
      {
        name: 'SpiderFoot',
        desc: 'An automated OSINT reconnaissance tool that integrates with over 100 public data sources to gather intelligence on IPs, domain names, e-mails, and netblocks.',
        useCase: 'Perform automated passive attack surface mapping and locate leaking administrative subdomains or leaked files.',
        link: 'https://github.com/smicallef/spiderfoot'
      },
      {
        name: 'Recon-ng',
        desc: 'A full-featured Web-based Reconnaissance Framework written in Python, complete with independent modules, database interaction, and API integrations.',
        useCase: 'Construct open-source intelligence databases of corporate assets, subdomains, and contact email profiles.',
        link: 'https://github.com/lanmaster53/recon-ng'
      }
    ]
  },
  {
    category: 'DNS & Domain Mapping Tools',
    tools: [
      {
        name: 'OWASP Amass',
        desc: 'In-depth DNS active and passive subdomain enumeration, mapping, and attack surface discovery using open-source data aggregation.',
        useCase: 'Create exhaustive mappings of an organization\'s external DNS boundaries and monitor asset registration changes.',
        link: 'https://github.com/owasp-amass/amass'
      },
      {
        name: 'dnsrecon',
        desc: 'A powerful Python script used to perform DNS zone transfers, PTR record checks, wildcard resolution detection, and SRV record enumeration.',
        useCase: 'Audit nameserver configurations and identify dangling DNS records susceptible to domain hijacking.',
        link: 'https://github.com/darkoperator/dnsrecon'
      }
    ]
  },
  {
    category: 'Email Security & Authentication Tools',
    tools: [
      {
        name: 'SPF-Tools',
        desc: 'A suite of Python scripts designed to parse, analyze, and test SPF records, assisting in resolving lookup limits and syntax structure errors.',
        useCase: 'Deconstruct nested SPF include blocks to optimize DNS lookup queries below the hard IETF limit of 10.',
        link: 'https://github.com/roehling/postsf'
      },
      {
        name: 'DKIMpy',
        desc: 'A Python library that implements DomainKeys Identified Mail (DKIM) and Author Domain Signing Practices (ADSP) signature verification and generation.',
        useCase: 'Programmatically sign outbound messages and validate DKIM public selector keys in DNS.',
        link: 'https://launchpad.net/dkimpy'
      }
    ]
  },
  {
    category: 'Vulnerability Scanners',
    tools: [
      {
        name: 'Nuclei',
        desc: 'A fast and customizable vulnerability scanner based on simple YAML templates, allowing researchers to target specific CVE indicators.',
        useCase: 'Auditing endpoints for fresh zero-day vulnerabilities and configuration discrepancies across a distributed host fleet.',
        link: 'https://github.com/projectdiscovery/nuclei'
      },
      {
        name: 'OWASP ZAP (Zed Attack Proxy)',
        desc: 'A popular, open-source web application security testing utility designed to locate vulnerabilities like SQL injection and XSS.',
        useCase: 'Run automated vulnerability scans against staging applications as part of a secure CI/CD pipeline.',
        link: 'https://github.com/zaproxy/zaproxy'
      }
    ]
  },
  {
    category: 'Threat Intelligence Tools',
    tools: [
      {
        name: 'MISP (Malware Information Sharing Platform)',
        desc: 'An open-source threat intelligence platform used to share, store, and correlate Indicators of Compromise (IoCs) of targeted attacks.',
        useCase: 'Store and share IP reputation blocks, file hashes, and active botnet domains across trust groups.',
        link: 'https://github.com/MISP/MISP'
      },
      {
        name: 'OpenCTI',
        desc: 'A modern threat intelligence platform designed to structure, store, and visualize technical and tactical threat intelligence data.',
        useCase: 'Construct semantic knowledge graphs of threat actor relationships, target profiles, and malware families.',
        link: 'https://github.com/OpenCTI-Platform/opencti'
      }
    ]
  },
  {
    category: 'Reconnaissance & Network Auditing Tools',
    tools: [
      {
        name: 'Nmap (Network Mapper)',
        desc: 'The industry-standard open-source network scanner used for host discovery, port scanning, OS identification, and service version checks.',
        useCase: 'Identify active network hosts, discover open TCP/UDP ports, and check banner versions during perimeter security audits.',
        link: 'https://github.com/nmap/nmap'
      },
      {
        name: 'Masscan',
        desc: 'An extremely fast internet port scanner that transmits SYN packets asynchronously, capable of scanning the entire internet in under 6 minutes.',
        useCase: 'Perform rapid, large-scale sweeps of IP blocks to locate exposed services and databases.',
        link: 'https://github.com/robertdavidgraham/masscan'
      }
    ]
  }
];

export default function OpenSourcePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://reconshield.in/opensource/#webpage",
        "url": "https://reconshield.in/opensource",
        "name": "Open Source Cybersecurity Tools & Security Projects | ReconShield",
        "description": "Access the authoritative directory of open-source security tools, reconnaissance scripts, and vulnerability scanning repositories compiled by ReconShield.",
        "breadcrumb": {
          "@id": "https://reconshield.in/opensource/#breadcrumb"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://reconshield.in/opensource/#breadcrumb",
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
            "name": "Open Source",
            "item": "https://reconshield.in/opensource"
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
          { label: 'Open Source', href: '/opensource' }
        ]} />

        {/* Header */}
        <div className="border-b border-white/10 pb-8 mb-12 mt-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[10px] font-mono text-emerald-400 mb-4 uppercase tracking-widest">
            <GitBranch className="w-3.5 h-3.5" />
            <span>Security Engineering & OSINT Repository</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold font-display leading-tight mb-4">
            Open Source Cybersecurity Tools Directory
          </h1>
          <p className="text-gray-400 text-lg max-w-4xl leading-relaxed font-sans">
            Explore the curated index of authoritative open-source security projects, OSINT scripts, and core threat scanning databases. Supported by the ReconShield security research community.
          </p>
          <div className="text-[10px] font-mono text-gray-500 mt-4 flex items-center gap-2">
            <span>Last Directory Review: June 6, 2026</span>
            <span>•</span>
            <span>License Paradigm: MIT & GPL Permissive</span>
          </div>
        </div>

        {/* Security Disclaimer Section */}
        <section className="p-6 rounded-2xl bg-red-500/5 border border-red-500/20 shadow-md mb-12 flex gap-4 items-start">
          <AlertTriangle className="w-6 h-6 text-red-500 shrink-0 mt-1" />
          <div>
            <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wider mb-2">
              Critical Security Disclaimer & Ethical Usage
            </h2>
            <p className="text-xs text-gray-400 leading-relaxed font-sans">
              All tools cataloged within this directory must be used strictly for ethical security auditing, authorized vulnerability testing, and educational research purposes. Executing active scans, port sweeps, or exploit probes against network infrastructures without explicit, written authorization from the asset owner is illegal and constitutes a violation of computer security laws (such as the US Computer Fraud and Abuse Act - CFAA). Users are fully responsible for ensuring compliance with local legal frameworks prior to launching scanning routines.
            </p>
          </div>
        </section>

        {/* Repos Grid */}
        <section className="mb-16">
          <h2 className="text-xl font-bold font-display text-white mb-6 flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-cyan-400" />
            <span>ReconShield Open Source Repositories</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {REPOS.map((repo, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 space-y-4 hover:border-cyan-500/20 transition-all flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold font-display text-white">{repo.name}</h3>
                  <p className="text-xs text-gray-400 font-sans leading-relaxed mt-2">{repo.desc}</p>
                </div>

                <div className="space-y-3 pt-4 border-t border-white/5">
                  <div className="flex gap-4 text-[10px] font-mono text-gray-400">
                    <span>License: <strong>MIT</strong></span>
                    <span>Branch: <strong>main</strong></span>
                  </div>
                  <div className="flex justify-between items-center">
                    <a 
                      href={repo.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-[#00ff88] hover:underline"
                    >
                      <Code2 className="w-3.5 h-3.5" /> View Repository
                    </a>
                    <Link 
                      href={repo.tool} 
                      className="text-xs font-mono text-cyan-400 hover:underline"
                    >
                      Analyze Site with {repo.toolLabel} →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Global Open Source Tools Directory */}
        <section className="space-y-10 mb-16">
          <h2 className="text-xl font-bold font-display text-white">
            Curated Industry-Standard Security Directory
          </h2>
          <div className="space-y-8">
            {OPEN_SOURCE_DIRECTORY.map((cat, idx) => (
              <div key={idx} className="border-t border-white/10 pt-6">
                <h3 className="text-base font-mono text-[#00ff88] font-bold uppercase tracking-wider mb-4">
                  {cat.category}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {cat.tools.map((tool, tIdx) => (
                    <div key={tIdx} className="p-5 rounded-xl bg-[#0d1117] border border-white/5 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="text-sm font-bold text-white">{tool.name}</h4>
                          <a 
                            href={tool.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-gray-500 hover:text-cyan-400 inline-flex items-center gap-1"
                          >
                            <span>Github</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                        <p className="text-xs text-gray-400 leading-relaxed mb-3">
                          {tool.desc}
                        </p>
                      </div>
                      <div className="bg-[#05080f] p-3 rounded-lg border border-white/5 text-[11px] text-gray-400 leading-relaxed">
                        <span className="font-bold text-white block mb-0.5 font-mono">PRIMARY USE CASE:</span>
                        {tool.useCase}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Guidelines / E-E-A-T Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-white/10 pt-10">
          
          <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 space-y-4">
            <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-500" />
              Contributor Covenant Guidelines
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed font-sans">
              We welcome code reviews, issue alerts, and database updates. Please read our official contributor guidelines within the respective repository. Keep pull requests focused on adding vulnerability indicators, fixing documentation discrepancies, or extending Nginx/Apache configuration snippets.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 space-y-4">
            <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              MIT Licensing & Standard Permissions
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed font-sans">
              All databases are free to copy, modify, distribute, and include in commercial applications. We believe that open access to cybersecurity signatures and standards is essential to secure modern digital ecosystems.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
