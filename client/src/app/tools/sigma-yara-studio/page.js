import React from 'react';
import SigmaYaraClient from '@/components/SigmaYaraClient';
import FlagshipToolGuide from '@/components/FlagshipToolGuide';

export const metadata = {
  title: "Sigma Rule to SIEM Translator & YARA Linter | ReconShield",
  description: "Convert Sigma detection rules into Splunk SPL, Elastic KQL, QRadar, and Microsoft Sentinel queries instantly. Validate YARA syntax in-browser. 100% free.",
  alternates: { canonical: "https://reconshield.in/tools/sigma-yara-studio" },
  keywords: ["sigma rule translator", "convert sigma to splunk", "sigma to kql sentinel", "yara linter online"]
};

export default function SigmaYaraPage() {
  const faqs = [
    { question: "What is a Sigma rule?", answer: "Sigma is an open, vendor-agnostic signature format for describing log events in a structured YAML schema, allowing detection engineers to write rules once and translate them into Splunk, Elastic, QRadar, or Sentinel queries." },
    { question: "What is YARA?", answer: "YARA is a tool aimed at helping malware researchers identify and classify malware samples by creating description rules based on textual or binary patterns." },
    { question: "What is the difference between Sigma and YARA?", answer: "Sigma detects events in log streams (process creation, network logs, authentication events). YARA detects patterns inside binary files, memory dumps, and static file samples." },
    { question: "How does Sigma translate rules to Splunk SPL?", answer: "Sigma maps logsource categories (e.g. process_creation) to Splunk sourcetypes or data models, converting detection field matches into SPL search syntax." },
    { question: "How does Sigma translate rules to Elastic KQL?", answer: "Sigma maps log fields to Elastic Common Schema (ECS) standard field names (e.g. process.command_line) for KQL execution." },
    { question: "What is uncoder.io?", answer: "Uncoder is a web utility for converting detection rules between SIEM dialects, similar to this open ReconShield Sigma Studio." },
    { question: "What are Sigma logsource categories?", answer: "Predefined categories like process_creation, image_load, network_connection, file_event, and web_application that standardize log fields across OS platforms." },
    { question: "What is YARA condition section?", answer: "The condition section of a YARA rule contains Boolean logic determining when a rule triggers (e.g. $string1 and filesize < 5MB)." },
    { question: "How to run YARA rules against memory dumps?", answer: "Use command line tools like yara64.exe -r rule.yar PID or Volatility memory forensics framework." },
    { question: "What is sigmac tool?", answer: "Sigmac is the legacy Python CLI tool for compiling Sigma rules into target SIEM languages, now largely replaced by pySigma." },
    { question: "What is Microsoft Sentinel KQL?", answer: "Kusto Query Language (KQL) is the query language used to search log analytics workspaces in Azure and Microsoft Sentinel." },
    { question: "How to write YARA rules for packed malware?", answer: "Focus on entry point hex sequences, unique PE section names, or decrypted string artifacts rather than compressed byte arrays." },
    { question: "What is MITRE ATT&CK mapping in Sigma?", answer: "Sigma rules contain tags referencing MITRE ATT&CK techniques (e.g. attack.t1059.001) for direct SOC coverage mapping." },
    { question: "Can YARA rules run inside SIEM platforms?", answer: "Yes, modern EDR agents (CrowdStrike, SentinelOne) execute YARA rules locally on endpoints to block malicious binaries in real-time." },
    { question: "Is this Sigma Studio free?", answer: "Yes, 100% free with no registration required." }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "ReconShield Sigma & YARA Studio",
        "operatingSystem": "All",
        "applicationCategory": "SecurityApplication",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
      },
      {
        "@type": "FAQPage",
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="bg-[#05080f] min-h-screen text-white py-12">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="font-mono text-xs text-matrix-400 font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-matrix-400/10 border border-matrix-400/20">
              // THREAT INTELLIGENCE &amp; SIEM DETECTIONS
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white uppercase tracking-tight">
              Sigma &amp; YARA <span className="text-matrix-400">Detection Studio</span>
            </h1>
            <p className="text-gray-400 text-sm sm:text-base font-sans leading-relaxed">
              Translate open-source Sigma detection rules into Splunk, Elastic, and Sentinel queries automatically.
            </p>
          </div>

          <SigmaYaraClient />

          <FlagshipToolGuide
            toolName="Sigma Rule & YARA Detection Studio"
            subtitle="Universal SIEM Query Converter & Rule Validation Engine"
            description="Sigma is an open standard format for writing SIEM detection rules in structured YAML. It enables threat intelligence teams and SOC detection engineers to write rules once and deploy them seamlessly across Splunk, Elastic, Microsoft Sentinel, and QRadar."
            category="SIEM"
            whatIsContent={
              <p>
                SIEM vendor lock-in historically restricted detection rule sharing between organizations. Sigma solves this fragmentation by abstracting detection logic into vendor-neutral logsource definitions and selection fields.
              </p>
            }
            howItWorksSteps={[
              { title: "YAML AST Parsing", description: "Parses Sigma rule YAML metadata, logsource definitions, and detection logic." },
              { title: "Field Mapping Translation", description: "Maps generic field names (e.g. CommandLine) to target SIEM schemas like ECS or Splunk Data Models." },
              { title: "Query Generation", description: "Outputs vendor-optimized SPL, KQL, or EQL queries." }
            ]}
            bestPractices={[
              { title: "Map Rules to MITRE ATT&CK", description: "Tag every Sigma rule with relevant attack.tXXXX IDs to measure detection coverage." }
            ]}
            faqs={faqs}
          />
        </div>
      </div>
    </>
  );
}
