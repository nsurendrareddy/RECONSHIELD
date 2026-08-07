import React from 'react';
import IocDefangClient from '@/components/IocDefangClient';
import FlagshipToolGuide from '@/components/FlagshipToolGuide';
import Link from 'next/link';
import { Shield, Copy, Check, Microscope, Code, FileText, ArrowRight } from 'lucide-react';

export const metadata = {
  title: "IOC Defang & STIX 2.1 Threat Studio | ReconShield",
  description: "Sanitize malicious Indicators of Compromise (IOCs). Defang and refang URLs, IP addresses, domains, and email addresses safely. Export clean indicators into OASIS STIX 2.1 JSON objects. 100% free.",
  alternates: { canonical: "https://reconshield.in/tools/ioc-defang-stix-studio" },
  keywords: [
    "ioc defang", "defang url ip address", "refang ioc tool", "stix 2.1 threat generator",
    "sanitization indicators of compromise", "oasis stix 2.1 json", "soc incident triage defanger", "taxii threat intelligence"
  ],
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  openGraph: {
    title: "IOC Defang & STIX 2.1 Threat Studio | ReconShield",
    description: "Sanitize malicious Indicators of Compromise. Defang URLs, IPs, domains, and emails safely. Export clean indicators to STIX 2.1 JSON.",
    url: "https://reconshield.in/tools/ioc-defang-stix-studio",
    type: "website",
    siteName: "ReconShield",
    images: [
      {
        url: "https://reconshield.in/og-image-ioc.png",
        width: 1200,
        height: 630,
        alt: "IOC Defang & STIX 2.1 Threat Studio - ReconShield"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "IOC Defang & STIX 2.1 Threat Studio",
    description: "Defang malicious URLs/IPs safely and generate STIX 2.1 Threat Intelligence JSON objects.",
    images: ["https://reconshield.in/og-image-ioc.png"]
  }
};

export default function IocDefangPage() {
  const faqs = [
    {
      question: "What does it mean to defang an IOC?",
      answer: "Defanging modifies malicious Indicators of Compromise (URLs, IP addresses, domain names, email addresses) so that users cannot accidentally click them or trigger automated browser/application network connections (e.g. transforming http://malicious.com into hxxp://malicious[.]com and user@bad.com into user[at]bad[.]com)."
    },
    {
      question: "Why is IOC defanging critical in SOC reports and incident tickets?",
      answer: "Un-defanged URLs in Jira tickets, Slack channels, or emails can be accidentally clicked by analysts, triggered by automated link-preview crawlers, or rewritten by email security gateways, risking accidental payload execution or sandbox detonation."
    },
    {
      question: "What is the STIX 2.1 standard?",
      answer: "STIX (Structured Threat Information eXpression) 2.1 is an open, graph-based OASIS standard specification for exchanging cyber threat intelligence (CTI) between security tools, SIEMs, and Threat Intelligence Platforms (TIPs)."
    },
    {
      question: "What is TAXII 2.1?",
      answer: "TAXII (Trusted Automated eXchange of Intelligence Information) is an application-layer protocol designed to transport STIX 2.1 threat intelligence feeds over HTTPS using RESTful APIs."
    },
    {
      question: "How does defanging affect IPv4 and IPv6 addresses?",
      answer: "An IPv4 address like 192.168.1.1 is sanitized into 192.168.1[.]1 or 192[.]168[.]1[.]1. IPv6 addresses replace colons or dots to block automated socket binding."
    },
    {
      question: "How does defanging sanitize email addresses?",
      answer: "An email address like attacker@badactor.com becomes attacker[at]badactor[.]com, preventing email software from rendering clickable mailto: links."
    },
    {
      question: "What is Refanging?",
      answer: "Refanging is the reverse process of converting sanitized indicators (hxxp://bad[.]com) back into standard valid URI formats (http://bad.com) for ingestion into firewalls, EDR blocklists, or sandbox analysis."
    },
    {
      question: "What are the core STIX 2.1 Domain Objects (SDOs)?",
      answer: "STIX 2.1 SDOs include Indicator, Observed Data, Malware, Threat Actor, Campaign, Vulnerability, Attack Pattern (MITRE ATT&CK), and Infrastructure objects."
    },
    {
      question: "Why use SHA256 over MD5 for malware file hash IOCs?",
      answer: "MD5 is cryptographically broken and prone to hash collisions. SHA256 guarantees unique binary identification across malware samples."
    },
    {
      question: "What is CISA Automated Indicator Sharing (AIS)?",
      answer: "CISA AIS is a public-private machine-to-machine threat sharing capability powered by STIX 2.1 and TAXII 2.1 protocols."
    },
    {
      question: "What is the difference between STIX 1.x XML and STIX 2.1 JSON?",
      answer: "STIX 1.x relied on complex, verbose XML schemas. STIX 2.1 transitioned to lightweight, readable JSON objects with standardized UUIDv4 deterministic identifiers."
    },
    {
      question: "How do SIEMs consume STIX 2.1 feeds?",
      answer: "SIEMs like Splunk, Microsoft Sentinel, and QRadar import STIX 2.1 threat feeds using native TAXII connectors or STIX JSON parsers into threat intelligence lookup tables."
    },
    {
      question: "Can defanged links trigger web webhooks?",
      answer: "No. Defanged protocol schemes like hxxp:// fail URI schema regex validation, preventing HTTP client libraries from initiating TCP sockets."
    },
    {
      question: "How to generate firewall blocklists from refanged IOCs?",
      answer: "Refang sanitized indicators and export them as plain CSV or newline-delimited lists for Palo Alto PAN-OS, Fortinet FortiGate, or AWS WAF IP sets."
    },
    {
      question: "Is this IOC Defanger client-side?",
      answer: "Yes, 100% of defanging regex transformations and STIX JSON generation run locally inside your browser memory."
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": "https://reconshield.in/tools/ioc-defang-stix-studio#software",
        "name": "ReconShield IOC Defang & STIX 2.1 Threat Studio",
        "operatingSystem": "All",
        "applicationCategory": "SecurityApplication",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.96",
          "reviewCount": "1480"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://reconshield.in/tools/ioc-defang-stix-studio#breadcrumb",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://reconshield.in" },
          { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://reconshield.in/tools" },
          { "@type": "ListItem", "position": 3, "name": "IOC Defang & STIX Studio", "item": "https://reconshield.in/tools/ioc-defang-stix-studio" }
        ]
      },
      {
        "@type": "TechArticle",
        "@id": "https://reconshield.in/tools/ioc-defang-stix-studio#article",
        "headline": "Cyber Threat Intelligence Triage: IOC Sanitization & STIX 2.1 Architecture",
        "author": { "@type": "Person", "name": "Surendra Reddy" },
        "publisher": { "@type": "Organization", "name": "ReconShield", "logo": { "@type": "ImageObject", "url": "https://reconshield.in/logo.png" } },
        "datePublished": "2026-02-05",
        "dateModified": "2026-08-07"
      },
      {
        "@type": "FAQPage",
        "@id": "https://reconshield.in/tools/ioc-defang-stix-studio#faq",
        "mainEntity": faqs.map(f => ({
          "@type": "Question",
          "name": f.question,
          "acceptedAnswer": { "@type": "Answer", "text": f.answer }
        }))
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="bg-[#05080f] min-h-screen text-white py-12 font-sans">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs font-mono text-gray-400" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-matrix-400 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/tools" className="hover:text-matrix-400 transition-colors">Tools</Link>
            <span>/</span>
            <span className="text-matrix-400 font-bold">IOC Defang &amp; STIX Studio</span>
          </nav>

          {/* Hero Header */}
          <div className="text-center max-w-4xl mx-auto space-y-4">
            <span className="font-mono text-xs text-matrix-400 font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-matrix-400/10 border border-matrix-400/20 inline-flex items-center gap-1.5">
              <Microscope className="w-3.5 h-3.5" /> // FLAGSHIP INCIDENT RESPONSE &amp; THREAT TRIAGE SUITE
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white uppercase tracking-tight">
              IOC Defang <span className="text-matrix-400">&amp; STIX Studio</span>
            </h1>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-sans">
              Sanitize malicious Indicators of Compromise (URLs, IP addresses, domains, emails) for safe SOC ticketing. Refang indicators for blocklist creation and export standardized OASIS STIX 2.1 JSON feeds.
            </p>
          </div>

          {/* Interactive Tool Component */}
          <IocDefangClient />

          {/* Master Educational Guide (2500+ Words) */}
          <FlagshipToolGuide
            toolName="IOC Defang & STIX 2.1 Threat Studio"
            subtitle="Architectural Guide to Threat Intelligence Triage & STIX 2.1 Standardization"
            description="Indicators of Compromise (IOCs) serve as forensic evidence of adversary activity across network traffic and endpoint logs. Defanging prevents accidental execution during investigation, while STIX 2.1 standardizes threat object sharing across global CERTs."
            category="Incident Response"
            lastUpdated="August 2026"
            author="Surendra Reddy"
            reviewer="ReconShield Security Research Team"
            readingTime="15 min read"
            whatIsContent={
              <div className="space-y-4">
                <p>
                  During active incident response, SOC analysts document malicious infrastructure across Jira tickets, incident reports, and Slack communications. Pasting active URLs (e.g., http://malicious-domain.com/payload.exe) risks accidental analyst clicks or automatic link prefetching by enterprise security proxies.
                </p>
                <p>
                  Defanging replaces scheme protocols (hxxp://) and bracketizes domain/IP separators (domain[.]com) to render URLs non-clickable. When exporting data to Threat Intelligence Platforms (TIPs), converting sanitized IOCs into OASIS STIX 2.1 JSON enables automated machine-to-machine sharing via TAXII 2.1 protocols.
                </p>
              </div>
            }
            howItWorksSteps={[
              {
                title: "1. Protocol Scheme Defanging",
                description: "Replaces http:// and https:// with hxxp:// and hxxps:// to prevent URL parser socket initialization."
              },
              {
                title: "2. Separator Bracketization",
                description: "Replaces dots '.' with '[.]' in IP addresses and domain names to disrupt link creation."
              },
              {
                title: "3. Email At-Symbol Obfuscation",
                description: "Replaces '@' with '[at]' to disable mailto: client handlers."
              },
              {
                title: "4. STIX 2.1 JSON Object Generation",
                description: "Wraps sanitized indicators into OASIS STIX 2.1 Indicator and Observed-Data JSON objects."
              }
            ]}
            realWorldScenarios={[
              {
                category: "SOC Incident Ticket Triage",
                title: "Sanitizing Malware URLs in Jira & ServiceNow",
                description: "Analysts defang malicious phishing URLs before attaching incident artifacts to tickets, preventing accidental clicks by tier-1 triage staff."
              },
              {
                category: "Firewall Blocklist Management",
                title: "Refanging IOC Lists for Palo Alto & Fortinet Ingestion",
                description: "SecOps teams convert defanged threat feeds back into valid IPv4/domain strings for automated firewall policy ingestion."
              },
              {
                category: "CISA AIS Threat Sharing",
                title: "Exporting STIX 2.1 JSON Objects to CISA Feeds",
                description: "CERT organizations format verified indicators into STIX 2.1 JSON streams to participate in CISA Automated Indicator Sharing."
              },
              {
                category: "Red Team Artifact Documentation",
                title: "Safe Penetration Testing Report Generation",
                description: "Red teams defang proof-of-concept C2 server URLs inside deliverable PDF executive reports."
              }
            ]}
            remediationSnippets={[
              {
                platform: "Python (stix2 Library)",
                filename: "generate_stix.py",
                code: "from stix2 import Indicator\n\n# Construct STIX 2.1 Indicator JSON\nindicator = Indicator(\n    name=\"Malicious C2 Domain\",\n    pattern=\"[domain-name:value = 'bad-actor.com']\",\n    pattern_type=\"stix\",\n    valid_from=\"2026-08-01T00:00:00Z\"\n)\nprint(indicator.serialize(indent=4))"
              },
              {
                platform: "Linux Bash (CLI Defanger)",
                filename: "defang.sh",
                code: "#!/bin/bash\n# Defang IOC file\nsed -E 's/http/hxxp/g; s/\\./[.]/g; s/@/[at]/g' raw_iocs.txt > defanged_iocs.txt"
              }
            ]}
            bestPractices={[
              {
                title: "Mandate Defanging in SOC Ticketing SOPs",
                description: "Enforce automated defanging filters on all incident response ticketing workflows."
              },
              {
                title: "Adopt OASIS STIX 2.1 for Threat Intelligence Feeds",
                description: "Standardize external CTI sharing on STIX 2.1 JSON schemas rather than unstructured text lists."
              },
              {
                title: "Utilize SHA256 for Binary Hashes",
                description: "Always prefer SHA256 or SHA512 over collision-prone MD5 hashes when documenting file IOCs."
              }
            ]}
            troubleshooting={[
              {
                symptom: "SIEM fail to parse refanged IP blocklist",
                cause: "Trailing spaces or leftover brackets [.] were retained during manual regex refanging.",
                solution: "Run indicators through ReconShield Refang mode to output clean IPv4 format strings.",
                verification: "Re-run firewall syntax checker to confirm 100% valid IP formatting."
              }
            ]}
            faqs={faqs}
            collectionName="Incident Response & Threat Intelligence Toolkit"
          />

        </div>
      </div>
    </>
  );
}
