import React from 'react';
import IocDefangClient from '@/components/IocDefangClient';
import FlagshipToolGuide from '@/components/FlagshipToolGuide';

export const metadata = {
  title: "IOC Defang & STIX 2.1 Threat Studio | ReconShield",
  description: "Defang and refang malicious URLs, IP addresses, domains, and emails safely. Export clean indicators of compromise into STIX 2.1 format. 100% free.",
  alternates: { canonical: "https://reconshield.in/tools/ioc-defang-stix-studio" },
  keywords: ["ioc defang", "defang url ip address", "refang ioc", "stix 2.1 threat generator"]
};

export default function IocDefangPage() {
  const faqs = [
    { question: "What does it mean to defang an IOC?", answer: "Defanging modifies malicious Indicators of Compromise (URLs, IP addresses, email addresses) so that users cannot accidentally click them or trigger automated browser requests (e.g. converting http:// to hxxp:// and dots '.' to '[.]')." },
    { question: "Why is IOC defanging critical in SOC reports?", answer: "Un-defanged URLs in email chains or ticketing systems can trigger accidental user visits, enterprise email security link-rewriting filters, or sandbox detonations." },
    { question: "What is STIX 2.1 format?", answer: "STIX (Structured Threat Information eXpression) 2.1 is an open OASIS standard serialization format for exchanging cyber threat intelligence (CTI) between security tools and threat intelligence platforms (TIPs)." },
    { question: "What is TAXII?", answer: "TAXII (Trusted Automated eXchange of Intelligence Information) is the web application protocol used to transport STIX threat intelligence over HTTPS." },
    { question: "How does defanging affect IP addresses?", answer: "An IP address like 192.168.1.1 is transformed into 192[.]168[.]1[.]1 or 192.168.1[.]1." },
    { question: "How does defanging affect email addresses?", answer: "An email like attacker@badactor.com becomes attacker[at]badactor[.]com." },
    { question: "What is Refanging?", answer: "Refanging is the reverse process of taking defanged indicators (hxxp://bad[.]com) and converting them back into valid standard URI formats for sandbox analysis or firewall blocklist ingestion." },
    { question: "What are common types of IOCs?", answer: "IP addresses, domain names, URLs, email addresses, file hashes (MD5, SHA1, SHA256), registry keys, and SSL certificate serial numbers." },
    { question: "Is IOC defanging automated in SIEM platforms?", answer: "Many SIEMs (Splunk, Sentinel, QRadar) include native defanging functions when generating automated alert summaries." },
    { question: "What is MITRE ATT&CK integration with STIX?", answer: "STIX 2.1 represents MITRE ATT&CK tactics, techniques, and procedures natively using Attack Pattern objects." },
    { question: "Why use SHA256 over MD5 for file hash IOCs?", answer: "MD5 suffers from cryptographic hash collision vulnerabilities. SHA256 guarantees unique identification of malware binaries." },
    { question: "What is OpenIOC?", answer: "OpenIOC is an XML-based threat format introduced by Mandiant, largely superseded by STIX 2.1." },
    { question: "Can defanged links trigger web webhooks?", answer: "No, defanged strings like hxxps:// do not match URL schema parsers, preventing HTTP client libraries from initiating network connections." },
    { question: "How to export IOCs to firewall blocklists?", answer: "Refang IOCs and export them as plain CSV or newline-delimited lists into Palo Alto, Fortinet, or AWS WAF IP sets." },
    { question: "Is this IOC defanger client-side?", answer: "Yes, 100% of defanging string transformations execute locally in your browser memory." }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "ReconShield IOC Defang & STIX Studio",
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
              // INCIDENT RESPONSE &amp; TRIAGE
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white uppercase tracking-tight">
              IOC Defang <span className="text-matrix-400">&amp; STIX Studio</span>
            </h1>
            <p className="text-gray-400 text-sm sm:text-base font-sans leading-relaxed">
              Sanitize malicious indicators of compromise (URLs, IPs, emails) for safe sharing in SOC reports and incident documentation.
            </p>
          </div>

          <IocDefangClient />

          <FlagshipToolGuide
            toolName="IOC Defang & STIX 2.1 Sanitizer Studio"
            subtitle="Threat Intelligence Indicator Sanitization & STIX Export Utility"
            description="Indicators of Compromise (IOCs) are forensic artifacts observed on a network or operating system that indicate a high probability of a security breach. Defanging ensures these artifacts can be documented safely in tickets and reports without risking accidental clicks."
            category="Incident Response"
            whatIsContent={
              <p>
                When Security Operations Center (SOC) analysts document malicious infrastructure, pasting active hyperlinks into Slack, Jira, or email threads exposes organizations to accidental clicks and automated link prefetching by security gateways. Defanging modifies protocol schemes and domain separators to neutralize active links.
              </p>
            }
            howItWorksSteps={[
              { title: "Regex Scheme Matching", description: "Replaces http:// and https:// protocol schemes with hxxp:// and hxxps://." },
              { title: "Dot Sanitization", description: "Replaces domain and IP dot separators with bracketed dots [.]" },
              { title: "Email At-Symbol Obfuscation", description: "Replaces '@' characters with [at] to prevent automated mail delivery." }
            ]}
            bestPractices={[
              { title: "Always Defang External Ticket Attachments", description: "Never attach un-defanged malware URLs in open ticketing systems." },
              { title: "Standardize on STIX 2.1 JSON", description: "Use STIX 2.1 schemas when sharing threat feeds with external CERTs." }
            ]}
            faqs={faqs}
          />
        </div>
      </div>
    </>
  );
}
