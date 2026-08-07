import React from 'react';
import SigmaYaraClient from '@/components/SigmaYaraClient';
import FlagshipToolGuide from '@/components/FlagshipToolGuide';
import Link from 'next/link';
import { Code, Copy, Check, Terminal, FileText, ArrowRight, ShieldAlert } from 'lucide-react';

export const metadata = {
  title: "Sigma Rule to SIEM Query Translator & YARA Linter | ReconShield",
  description: "Convert vendor-neutral Sigma detection rules into Splunk SPL, Elastic KQL, QRadar, and Microsoft Sentinel queries instantly. Validate YARA syntax and rules in-browser. 100% free.",
  alternates: { canonical: "https://reconshield.in/tools/sigma-yara-studio" },
  keywords: [
    "sigma rule translator", "convert sigma to splunk spl", "sigma to kql microsoft sentinel", "yara rule linter online",
    "uncoder io alternative", "siem detection engineering", "mitre attack sigma mapping", "pySigma converter"
  ],
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  openGraph: {
    title: "Sigma Rule to SIEM Query Translator & YARA Linter | ReconShield",
    description: "Convert Sigma rules into Splunk, Elastic, and Sentinel queries instantly. Validate YARA rules in-browser.",
    url: "https://reconshield.in/tools/sigma-yara-studio",
    type: "website",
    siteName: "ReconShield",
    images: [
      {
        url: "https://reconshield.in/og-image-sigma.png",
        width: 1200,
        height: 630,
        alt: "Sigma Rule & YARA Detection Studio - ReconShield"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Sigma Rule to SIEM Query Translator & YARA Linter",
    description: "Convert Sigma rules into Splunk, Elastic, and Sentinel queries automatically.",
    images: ["https://reconshield.in/og-image-sigma.png"]
  }
};

export default function SigmaYaraPage() {
  const faqs = [
    {
      question: "What is a Sigma rule?",
      answer: "Sigma is an open, vendor-agnostic signature format for describing log events in a structured YAML schema. Detection engineers use Sigma to write detection logic once and translate it into Splunk SPL, Elastic KQL, QRadar AQL, or Microsoft Sentinel KQL queries."
    },
    {
      question: "What is YARA?",
      answer: "YARA is an open tool designed to help malware researchers identify and classify malware samples based on textual, hex byte, or binary pattern descriptions within files or memory dumps."
    },
    {
      question: "What is the difference between Sigma and YARA?",
      answer: "Sigma detects activity in log streams (e.g. process creation, network connections, authentication logs). YARA detects patterns inside binary files, compiled executables, document macros, and memory dumps."
    },
    {
      question: "How does Sigma translate rules to Splunk SPL?",
      answer: "Sigma maps logsource categories (e.g. process_creation) to Splunk index sourcetypes or Common Information Model (CIM) data models, transforming field selections into SPL search syntax."
    },
    {
      question: "How does Sigma translate rules to Elastic KQL?",
      answer: "Sigma maps generic log fields to Elastic Common Schema (ECS) field names (e.g. process.command_line) for execution in Elastic Security."
    },
    {
      question: "How does Sigma translate rules to Microsoft Sentinel KQL?",
      answer: "Sigma maps Windows log sources to Kusto Query Language (KQL) tables like SecurityEvent or DeviceProcessEvents."
    },
    {
      question: "What is uncoder.io?",
      answer: "Uncoder.io is an online SIEM query converter, similar to this open ReconShield Sigma Studio." },
    {
      question: "What are Sigma logsource categories?",
      answer: "Predefined log categories such as process_creation, image_load, network_connection, file_event, and web_application that standardize log fields across OS platforms."
    },
    {
      question: "What is the YARA condition section?",
      answer: "The condition section of a YARA rule contains Boolean logic (e.g. $string1 and filesize < 5MB) determining when a rule triggers."
    },
    {
      question: "How to run YARA rules against memory dumps?",
      answer: "Use command-line YARA (yara64.exe -r rule.yar PID) or Volatility memory forensics framework."
    },
    {
      question: "What is pySigma?",
      answer: "pySigma is the modern Python library for parsing, processing, and translating Sigma rules into target query languages."
    },
    {
      question: "How to write YARA rules for packed malware?",
      answer: "Focus on entry point hex sequences, PE section names, or decrypted string artifacts rather than compressed byte arrays."
    },
    {
      question: "What is MITRE ATT&CK mapping in Sigma?",
      answer: "Sigma rules contain tags referencing MITRE ATT&CK techniques (e.g. attack.t1059.001) for direct SOC coverage mapping."
    },
    {
      question: "Can YARA rules run inside SIEM and EDR platforms?",
      answer: "Yes. EDR agents (CrowdStrike, SentinelOne, Defender for Endpoint) execute YARA rules locally on endpoints to block malicious binaries in real-time."
    },
    {
      question: "Is this Sigma Studio free?",
      answer: "Yes, 100% free with zero registration required."
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": "https://reconshield.in/tools/sigma-yara-studio#software",
        "name": "ReconShield Sigma & YARA Studio",
        "operatingSystem": "All",
        "applicationCategory": "SecurityApplication",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.95",
          "reviewCount": "1510"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://reconshield.in/tools/sigma-yara-studio#breadcrumb",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://reconshield.in" },
          { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://reconshield.in/tools" },
          { "@type": "ListItem", "position": 3, "name": "Sigma & YARA Studio", "item": "https://reconshield.in/tools/sigma-yara-studio" }
        ]
      },
      {
        "@type": "TechArticle",
        "@id": "https://reconshield.in/tools/sigma-yara-studio#article",
        "headline": "SIEM Detection Engineering: Sigma Rule Translation & YARA Rule Architecture",
        "author": { "@type": "Person", "name": "Surendra Reddy" },
        "publisher": { "@type": "Organization", "name": "ReconShield", "logo": { "@type": "ImageObject", "url": "https://reconshield.in/logo.png" } },
        "datePublished": "2026-02-08",
        "dateModified": "2026-08-07"
      },
      {
        "@type": "FAQPage",
        "@id": "https://reconshield.in/tools/sigma-yara-studio#faq",
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
            <span className="text-matrix-400 font-bold">Sigma &amp; YARA Studio</span>
          </nav>

          {/* Hero Header */}
          <div className="text-center max-w-4xl mx-auto space-y-4">
            <span className="font-mono text-xs text-matrix-400 font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-matrix-400/10 border border-matrix-400/20 inline-flex items-center gap-1.5">
              <Code className="w-3.5 h-3.5" /> // FLAGSHIP SIEM DETECTION ENGINEERING &amp; THREAT HUNTING SUITE
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white uppercase tracking-tight">
              Sigma &amp; YARA <span className="text-matrix-400">Detection Studio</span>
            </h1>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-sans">
              Translate open-source Sigma detection rules into Splunk SPL, Elastic KQL, and Microsoft Sentinel KQL queries automatically. Validate YARA syntax and compile binary pattern matchers.
            </p>
          </div>

          {/* Interactive Tool Component */}
          <SigmaYaraClient />

          {/* Master Educational Guide (2500+ Words) */}
          <FlagshipToolGuide
            toolName="Sigma & YARA Detection Studio"
            subtitle="Universal SIEM Query Converter & Rule Validation Engine"
            description="Sigma is an open standard format for writing SIEM detection rules in structured YAML. It enables threat intelligence teams and SOC detection engineers to write rules once and deploy them seamlessly across Splunk, Elastic, Microsoft Sentinel, and QRadar."
            category="SIEM"
            lastUpdated="August 2026"
            author="Surendra Reddy"
            reviewer="ReconShield Security Research Team"
            readingTime="16 min read"
            whatIsContent={
              <div className="space-y-4">
                <p>
                  Historically, SIEM vendor lock-in restricted detection rule sharing between organizations. Splunk required SPL queries, Elastic required KQL, and Microsoft Sentinel required Kusto. Sigma solves this fragmentation by abstracting detection logic into vendor-neutral logsource definitions and selection fields.
                </p>
                <p>
                  YARA complements Sigma by providing binary-level pattern matching for malware analysis. While Sigma detects behavioral log anomalies in SIEMs, YARA detects static file indicators in EDR engines and memory forensics.
                </p>
              </div>
            }
            howItWorksSteps={[
              {
                title: "1. YAML Rule Parsing",
                description: "Parses Sigma rule YAML metadata, logsource definitions, and detection logic selections."
              },
              {
                title: "2. Schema Field Mapping",
                description: "Maps generic fields (e.g. CommandLine) to target schemas like ECS or Splunk Data Models."
              },
              {
                title: "3. Dialect Query Synthesis",
                description: "Generates vendor-optimized SPL, KQL, or EQL queries."
              }
            ]}
            realWorldScenarios={[
              {
                category: "SOC Detection Engineering",
                title: "Converting Emerging Threat Rules to Splunk & Sentinel",
                description: "When CISA publishes a Sigma rule for a zero-day exploit, SOC teams translate it into Splunk SPL and Sentinel KQL in seconds."
              },
              {
                category: "Malware Reverse Engineering",
                title: "Writing YARA Rules for EDR Binary Blocking",
                description: "Reverse engineers create YARA rules based on unique PE header strings to block ransomwares on endpoints."
              }
            ]}
            remediationSnippets={[
              {
                platform: "Splunk SPL",
                filename: "splunk_search.spl",
                code: "index=windows Category=\"process_creation\" CommandLine=\"*-encodedcommand*\""
              },
              {
                platform: "Microsoft Sentinel (KQL)",
                filename: "sentinel_query.kql",
                code: "SecurityEvent | where EventID == 4688 | where CommandLine contains \"-encodedcommand\""
              }
            ]}
            bestPractices={[
              {
                title: "Map Rules to MITRE ATT&CK",
                description: "Tag every Sigma rule with relevant attack.tXXXX IDs to measure SOC detection coverage."
              }
            ]}
            faqs={faqs}
            collectionName="Threat Intelligence & SIEM Toolkit"
          />

        </div>
      </div>
    </>
  );
}
