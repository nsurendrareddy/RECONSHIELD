import React from 'react';
import Link from 'next/link';

import { generateBaseMetadata } from '@/utils/metadata';

export const metadata = generateBaseMetadata({
  title: 'Editorial Policy',
  description: 'Learn about ReconShield\'s editorial standards, fact-checking, and ethical guidelines for our cybersecurity intelligence content.',
  path: '/editorial-policy'
});

export default function EditorialPolicyPage() {
  return (
    <div className="bg-[#0a0c0f] min-h-screen text-white font-sans selection:bg-[#00ff8833] selection:text-[#00ff88]">
      {/* Header */}
      <div className="max-w-[1000px] mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Editorial Policy & Research Methodology</h1>
        <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed text-sm font-mono">
          DOCUMENT ID: RS-ED-2026-v2.1 | LAST REVISED: May 30, 2026
        </p>
      </div>

      {/* Content */}
      <section className="max-w-[1000px] mx-auto px-6 pb-24">
        <div className="prose prose-invert max-w-none prose-h2:text-2xl prose-h2:font-display prose-h2:text-white prose-h2:mt-12 prose-h2:mb-6 prose-p:text-gray-400 prose-p:leading-relaxed prose-a:text-[#00ff88] prose-li:text-gray-400">
          
          <h2>1. Editorial Mission & Integrity</h2>
          <p>
            ReconShield is a professional educational publication and threat research platform dedicated to the dissemination of defensive cybersecurity intelligence. We serve security engineers, system administrators, compliance officers, and IT professionals. 
          </p>
          <p>
            Our core mission is to democratize high-quality, peer-reviewed technical intelligence to help defenders map, analyze, and secure exposed corporate assets. We operate under strict transparency rules and do not receive financial incentives from vendor products we audit.
          </p>

          <h2>2. Threat Intelligence Confidence Methodology</h2>
          <p>
            To prevent false positive classifications and protect public infrastructure networks (such as public recursive DNS resolvers and search engine web crawlers), our Threat Research Division evaluates network node reputation using a dual consensus framework:
          </p>
          <ul>
            <li><strong>Kent's Scale of Probability:</strong> Threat indicators are graded based on corroborative telemetry sources. A reputation classification is only upgraded to "High Risk" when multiple independent telemetry points confirm malicious abuse within a rolling 24-hour window.</li>
            <li><strong>Infrastructure Whitelisting:</strong> Verified Anycast nodes, CDN edge servers, search indexers, and public security research sensors (e.g. Shadowserver Foundation) are explicitly profiled as "Verified Safe / Clean" to avoid misleading threat perceptions.</li>
            <li><strong>Attribution Source Transparency:</strong> Every threat profile references external telemetry verifications including AbuseIPDB records, Spamhaus DROP list registry checks, and CISA known exploited vulnerability datasets.</li>
          </ul>

          <h2>3. Citation & Reference Standards</h2>
          <p>
            All publications, research briefings, and vulnerability analyses published on ReconShield must contain primary source citations. We verify and attribute technical statements using:
          </p>
          <ul>
            <li><strong>CVE Mapping:</strong> References to software flaws must cite the official National Vulnerability Database (NVD) registry identifier.</li>
            <li><strong>MITRE ATT&CK Framework:</strong> Adversary behaviors and defensive remediation guides are mapped to the corresponding MITRE ATT&CK enterprise tactics and techniques.</li>
            <li><strong>RFC Compliance:</strong> DNS, SSL/TLS, and email authentication procedures are cited directly against Internet Engineering Task Force (IETF) Request for Comments (RFC) standards.</li>
          </ul>

          <h2>4. Responsible Disclosure & Ethical Research</h2>
          <p>
            ReconShield strictly separates defensive configuration audits from offensive penetration testing. 
          </p>
          <ul>
            <li><strong>No Active Probing:</strong> We do NOT perform active intrusion attempts or exploit payloads against public networks. All scanning widgets are strictly passive checks using cached global registry lookups.</li>
            <li><strong>Zero Abuse Payload:</strong> We do not publish weaponized exploit code (PoC). We focus exclusively on configuration mitigation, encryption protocol hardening, and patch management.</li>
            <li><strong>Coordinated Disclosures:</strong> Any zero-day vulnerability discovered by our Infrastructure Intelligence Unit is escalated to the affected vendors privately, allowing 90 days for patch deployment before publication.</li>
          </ul>

          <h2>5. Fact-Checking & Peer Review Workflow</h2>
          <p>
            Before publication, all technical manuals and threat intelligence reports undergo a triple-review process:
          </p>
          <ol className="list-decimal space-y-2 pl-5">
            <li><strong>Technical Validation:</strong> Lab reproduction of the vulnerability or protocol configuration to verify mitigation efficacy.</li>
            <li><strong>EEAT Review:</strong> Oversight by our Chief Security Architect to confirm compliance with defensive terminology guidelines (avoiding alarmist cybercrime glorification).</li>
            <li><strong>Grammar & Schema Validation:</strong> Final checks to verify breadcrumbs, structured schema data, and factual summaries are parsed correctly for both human users and AI query crawlers.</li>
          </ol>

          <h2>6. Correction & Retraction Policy</h2>
          <p>
            If a technical error or outdated configuration advice is identified, we act immediately:
          </p>
          <ul>
            <li><strong>Updating Guidelines:</strong> A "Revision Update" box is added at the top of the post explaining the change.</li>
            <li><strong>Community Feedback:</strong> Errors can be reported directly through our <Link href="/contact">contact form</Link>, and are reviewed by our research lead within 48 hours.</li>
          </ul>

        </div>
      </section>
    </div>
  );
}
