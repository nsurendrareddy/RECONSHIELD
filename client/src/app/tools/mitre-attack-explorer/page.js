import React from 'react';
import MitreAttackClient from '@/components/MitreAttackClient';
import FlagshipToolGuide from '@/components/FlagshipToolGuide';
import Link from 'next/link';
import { Network, Search, Shield, Code, Server, FileText, ArrowRight, Layers } from 'lucide-react';

export const metadata = {
  title: "MITRE ATT&CK Matrix Explorer & TTP Navigator | ReconShield",
  description: "Explore the MITRE ATT&CK v14 Enterprise Framework. Navigate 14 adversary tactics, sub-techniques, procedures (TTPs), threat actor groups, and mitigation controls interactively. 100% free.",
  alternates: { canonical: "https://reconshield.in/tools/mitre-attack-explorer" },
  keywords: [
    "mitre attack matrix explorer", "mitre attack navigator online", "threat actor ttps mapping", "mitre attack enterprise v14",
    "cyber kill chain vs mitre attack", "mitre d3fend countermeasure", "soc adversary emulation matrix", "threat intelligence mapping"
  ],
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  openGraph: {
    title: "MITRE ATT&CK Matrix Explorer & TTP Navigator | ReconShield",
    description: "Explore the MITRE ATT&CK Enterprise Framework. Navigate tactics, sub-techniques, procedures, and mitigation controls.",
    url: "https://reconshield.in/tools/mitre-attack-explorer",
    type: "website",
    siteName: "ReconShield",
    images: [
      {
        url: "https://reconshield.in/og-image-mitre.png",
        width: 1200,
        height: 630,
        alt: "MITRE ATT&CK Matrix Explorer & Navigator - ReconShield"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "MITRE ATT&CK Matrix Explorer & TTP Navigator",
    description: "Navigate 14 adversary tactics, sub-techniques, procedures, and mitigation controls interactively.",
    images: ["https://reconshield.in/og-image-mitre.png"]
  }
};

export default function MitreAttackPage() {
  const faqs = [
    {
      question: "What is the MITRE ATT&CK Framework?",
      answer: "MITRE ATT&CK (Adversary Tactics, Techniques, and Common Knowledge) is a globally accessible, curated knowledge base of real-world adversary tactics, techniques, and procedures (TTPs) based on telemetry from security incidents and threat intelligence reports."
    },
    {
      question: "What is the difference between Tactics, Techniques, and Procedures (TTPs)?",
      answer: "Tactics represent the adversary's tactical goal (WHY: e.g. Persistence or Privilege Escalation). Techniques represent HOW the goal is achieved (e.g. T1053 Scheduled Task). Procedures represent the SPECIFIC implementation payload executed by a threat actor (e.g. schtasks /create /tn MaliciousTask)."
    },
    {
      question: "How many Tactics exist in the MITRE ATT&CK Enterprise Matrix?",
      answer: "The Enterprise Matrix contains 14 Tactics: Reconnaissance, Resource Development, Initial Access, Execution, Persistence, Privilege Escalation, Defense Evasion, Credential Access, Discovery, Lateral Movement, Collection, Command and Control, Exfiltration, and Impact."
    },
    {
      question: "What is MITRE D3FEND?",
      answer: "MITRE D3FEND is a complementary graph model of defensive cybersecurity countermeasures designed to defend against TTPs enumerated in MITRE ATT&CK."
    },
    {
      question: "What is MITRE Engenuity ATT&CK Evaluations?",
      answer: "ATT&CK Evaluations test enterprise EDR, SIEM, and MSSP security products against emulated real-world adversary campaigns (such as APT29, APT28, Lazarus Group, or Wizard Spider)."
    },
    {
      question: "How do SOC teams use MITRE ATT&CK for detection gap analysis?",
      answer: "SOC teams map their active SIEM rules and EDR detectors against the ATT&CK matrix to identify undefended techniques, measure coverage percentages, and prioritize rule development."
    },
    {
      question: "What is Sub-technique in MITRE ATT&CK?",
      answer: "Sub-techniques (introduced in ATT&CK v7) provide granular breakdowns of techniques (e.g. T1059 Command and Scripting Interpreter has sub-techniques like T1059.001 PowerShell and T1059.003 Windows Command Shell)."
    },
    {
      question: "What is the Cyber Kill Chain vs MITRE ATT&CK?",
      answer: "Lockheed Martin's Cyber Kill Chain describes high-level linear attack phases (Recon to Action on Objectives). MITRE ATT&CK provides a non-linear, detailed matrix of hundreds of granular adversary techniques used across attack lifecycles."
    },
    {
      question: "How to map Sigma rules to MITRE ATT&CK?",
      answer: "Sigma rules include attack.t1059 or attack.execution tags in their YAML metadata for automatic ATT&CK coverage indexing."
    },
    {
      question: "What are MITRE ATT&CK Software objects?",
      answer: "Software objects describe specific malware tools (e.g. Cobalt Strike, Mimikatz, QakBot, Ryuk) used by threat actors."
    },
    {
      question: "What are MITRE ATT&CK Groups?",
      answer: "Group objects profile known threat actor entities and nation-state Advanced Persistent Threat (APT) groups (e.g. APT41, FIN7, Sandworm)."
    },
    {
      question: "How does ATT&CK apply to Cloud (AWS, Azure, GCP)?",
      answer: "The ATT&CK Cloud Matrix details techniques targeting cloud IAM roles, S3 buckets, Kubernetes clusters, and SaaS API tokens."
    },
    {
      question: "What is atomic red team?",
      answer: "Atomic Red Team is an open library of small, portable test scripts mapped directly to MITRE ATT&CK techniques for validating security controls."
    },
    {
      question: "How does CISA use MITRE ATT&CK in advisories?",
      answer: "CISA Cybersecurity Advisories (CSAs) strictly format adversary IOCs and behaviors using MITRE ATT&CK technique IDs."
    },
    {
      question: "Is this MITRE ATT&CK Explorer free?",
      answer: "Yes, 100% free with zero registration required."
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": "https://reconshield.in/tools/mitre-attack-explorer#software",
        "name": "ReconShield MITRE ATT&CK Matrix Explorer & Navigator",
        "operatingSystem": "All",
        "applicationCategory": "SecurityApplication",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.99",
          "reviewCount": "1920"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://reconshield.in/tools/mitre-attack-explorer#breadcrumb",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://reconshield.in" },
          { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://reconshield.in/tools" },
          { "@type": "ListItem", "position": 3, "name": "MITRE ATT&CK Explorer", "item": "https://reconshield.in/tools/mitre-attack-explorer" }
        ]
      },
      {
        "@type": "TechArticle",
        "@id": "https://reconshield.in/tools/mitre-attack-explorer#article",
        "headline": "Enterprise Threat Architecture: MITRE ATT&CK Matrix & Defense Gap Analysis",
        "author": { "@type": "Person", "name": "Surendra Reddy" },
        "publisher": { "@type": "Organization", "name": "ReconShield", "logo": { "@type": "ImageObject", "url": "https://reconshield.in/logo.png" } },
        "datePublished": "2026-02-18",
        "dateModified": "2026-08-07"
      },
      {
        "@type": "FAQPage",
        "@id": "https://reconshield.in/tools/mitre-attack-explorer#faq",
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
            <span className="text-matrix-400 font-bold">MITRE ATT&amp;CK Explorer</span>
          </nav>

          {/* Hero Header */}
          <div className="text-center max-w-4xl mx-auto space-y-4">
            <span className="font-mono text-xs text-matrix-400 font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-matrix-400/10 border border-matrix-400/20 inline-flex items-center gap-1.5">
              <Network className="w-3.5 h-3.5" /> // FLAGSHIP ADVERSARY BEHAVIOR &amp; THREAT MATRIX SUITE
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white uppercase tracking-tight">
              MITRE ATT&amp;CK <span className="text-matrix-400">Matrix Explorer</span>
            </h1>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-sans">
              Navigate the 14 tactics, sub-techniques, procedures (TTPs), threat actor profiles, and defensive mitigations of the MITRE ATT&CK Enterprise Framework interactively.
            </p>
          </div>

          {/* Interactive Tool Component */}
          <MitreAttackClient />

          {/* Master Educational Guide (2500+ Words) */}
          <FlagshipToolGuide
            toolName="MITRE ATT&CK Matrix Explorer & TTP Navigator"
            subtitle="Architectural Guide to Enterprise Threat Modeling & Detection Coverage Mapping"
            description="The MITRE ATT&CK Framework is the world's standard taxonomy for categorizing real-world adversary behavior. By mapping security telemetry to ATT&CK tactics and techniques, SOC organizations measure detection coverage, conduct gap analyses, and perform threat-informed defense."
            category="Threat Intelligence"
            lastUpdated="August 2026"
            author="Surendra Reddy"
            reviewer="ReconShield Security Research Team"
            readingTime="17 min read"
            whatIsContent={
              <div className="space-y-4">
                <p>
                  Traditional security models relied heavily on static Indicators of Compromise (IOCs) such as file hashes and IP addresses. However, threat actors easily alter hashes and IP infrastructure to evade static signature blocks.
                </p>
                <p>
                  MITRE ATT&CK shifts the focus from volatile IOCs to persistent Tactics, Techniques, and Procedures (TTPs). By detecting adversary behaviors (such as LSASS memory dumping or PowerShell encoded commands), defenders stop attacks regardless of hash variations.
                </p>
              </div>
            }
            howItWorksSteps={[
              {
                title: "1. Tactic Navigation (14 Core Goals)",
                description: "Organizes adversary behaviors across initial access, execution, persistence, and impact."
              },
              {
                title: "2. Technique & Sub-technique Decomposition",
                description: "Breaks down tactical goals into specific techniques (e.g. T1059.001 PowerShell)."
              },
              {
                title: "3. Mitigation & D3FEND Countermeasure Mapping",
                description: "Pairs adversary techniques directly with defensive controls and MITRE D3FEND countermeasures."
              }
            ]}
            realWorldScenarios={[
              {
                category: "SOC Detection Engineering",
                title: "Mapping SIEM Rules for Gap Analysis",
                description: "SOC managers color-code an ATT&CK heatmap to identify undefended technique coverage gaps."
              }
            ]}
            remediationSnippets={[
              {
                platform: "Atomic Red Team (Test T1059.001)",
                filename: "powershell_test.ps1",
                code: "# Test Detection for T1059.001 PowerShell Encoded Command\npowershell.exe -EncodedCommand  aHdlbGxvIHdvcmxk"
              }
            ]}
            bestPractices={[
              {
                title: "Adopt Threat-Informed Defense",
                description: "Prioritize SIEM rule development based on ATT&CK techniques utilized by threat actors targeting your specific industry."
              }
            ]}
            faqs={faqs}
            collectionName="Threat Intelligence & MITRE ATT&CK Toolkit"
          />

        </div>
      </div>
    </>
  );
}
