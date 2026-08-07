import React from 'react';
import MitreAttackClient from '@/components/MitreAttackClient';
import FlagshipToolGuide from '@/components/FlagshipToolGuide';

export const metadata = {
  title: "MITRE ATT&CK Matrix Explorer & Heatmap Studio | ReconShield",
  description: "Explore MITRE ATT&CK tactics and techniques for Windows, Linux, and Cloud. Map adversary TTPs directly to Sigma detection rules. 100% free.",
  alternates: { canonical: "https://reconshield.in/tools/mitre-attack-explorer" },
  keywords: ["mitre attack explorer", "mitre attack matrix online", "ttp heatmap studio"]
};

export default function MitreAttackPage() {
  const faqs = [
    { question: "What is MITRE ATT&CK?", answer: "MITRE ATT&CK (Adversary Tactics, Techniques, and Common Knowledge) is a globally accessible knowledge base of adversary tactics and techniques based on real-world threat intelligence." },
    { question: "What is the difference between Tactics, Techniques, and Procedures (TTPs)?", answer: "Tactics represent the adversary's technical goal (e.g. Initial Access). Techniques represent how that goal is achieved (e.g. Phishing). Procedures represent the specific implementation or tool used." },
    { question: "What is ATT&CK Navigator?", answer: "ATT&CK Navigator is an open web tool used to visualize and color-code ATT&CK matrices to assess enterprise detection coverage and gap analysis." },
    { question: "How many Tactics are in Enterprise ATT&CK?", answer: "Enterprise ATT&CK contains 14 Tactics ranging from Reconnaissance and Initial Access to Command & Control and Impact." },
    { question: "What are Sub-techniques in ATT&CK?", answer: "Sub-techniques provide a more granular description of specific adversary methods (e.g. T1059.001 PowerShell under T1059 Command Scripting Interpreter)." },
    { question: "What is MITRE D3FEND?", answer: "MITRE D3FEND is a complementary knowledge graph of defensive cybersecurity countermeasures and architectural controls." },
    { question: "How do SOC teams use MITRE ATT&CK?", answer: "SOC teams map SIEM alert triggers to ATT&CK techniques to identify coverage blindspots and prioritize detection engineering." },
    { question: "What is CAR (Cyber Analytics Repository)?", answer: "MITRE CAR is a knowledge base of analytics and sensor data models designed to detect ATT&CK techniques." },
    { question: "What is Caldera framework?", answer: "MITRE Caldera is an automated adversary emulation platform built on the ATT&CK framework for red team testing." },
    { question: "What is the Cloud ATT&CK Matrix?", answer: "A subset of ATT&CK focusing on techniques targeting AWS, Azure, GCP, Office 365, and SaaS environments." },
    { question: "What is the Mobile ATT&CK Matrix?", answer: "Focuses on tactics and techniques used against Android and iOS mobile devices." },
    { question: "How do threat intelligence reports reference ATT&CK?", answer: "CTI reports tag adversary campaigns (e.g. APT29, Lazarus Group) with specific technique IDs (T1059, T1078)." },
    { question: "What is Defense Evasion tactic?", answer: "Techniques adversaries use to avoid detection, such as process hollowing, obfuscation, and disabling security software." },
    { question: "What is Privilege Escalation tactic?", answer: "Techniques adversaries use to gain higher-level permissions on a system (e.g. sudo exploitation, UAC bypass)." },
    { question: "Is this ATT&CK Explorer free?", answer: "Yes, 100% free with no registration required." }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "ReconShield MITRE ATT&CK Explorer",
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
              // THREAT INTELLIGENCE FRAMEWORKS
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white uppercase tracking-tight">
              MITRE ATT&amp;CK <span className="text-matrix-400">Explorer &amp; Studio</span>
            </h1>
            <p className="text-gray-400 text-sm sm:text-base font-sans leading-relaxed">
              Browse enterprise adversary tactics, techniques, and procedures (TTPs) mapped directly to defensive detection rules.
            </p>
          </div>

          <MitreAttackClient />

          <FlagshipToolGuide
            toolName="MITRE ATT&CK Matrix Explorer"
            subtitle="Adversary TTP Mapping & Detection Gap Analysis Framework"
            description="The MITRE ATT&CK framework provides an industry-standard lexicon for describing cyber adversary behavior. Security teams leverage ATT&CK to assess defensive coverage, emulate red team threat actors, and prioritize SIEM detection engineering."
            category="Threat Intelligence"
            whatIsContent={
              <p>
                Organizing SOC alerts around MITRE ATT&CK tactics (the &apos;why&apos;) and techniques (the &apos;how&apos;) elevates incident response from isolated alert triage to comprehensive adversary campaign tracking.
              </p>
            }
            howItWorksSteps={[
              { title: "Tactic Categorization", description: "Groups adversary behavior into 14 tactical objectives." },
              { title: "Technique Mapping", description: "Associates specific technique IDs (e.g. T1059) with detection data sources." }
            ]}
            bestPractices={[
              { title: "Perform Heatmap Gap Analysis", description: "Color-code your SIEM detection coverage on the ATT&CK Matrix to highlight blindspots." }
            ]}
            faqs={faqs}
          />
        </div>
      </div>
    </>
  );
}
