import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Editorial Policy',
  description: 'Learn about ReconShield\'s editorial standards, fact-checking, and ethical guidelines for our cybersecurity intelligence content.',
  alternates: {
    canonical: 'https://reconshield.in/editorial-policy',
  },
};

export default function EditorialPolicyPage() {
  return (
    <div className="bg-[#0a0c0f] min-h-screen text-white font-sans selection:bg-[#00ff8833] selection:text-[#00ff88]">
      {/* Header */}
      <div className="max-w-[1000px] mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Editorial Policy</h1>
        <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Our commitment to accuracy, integrity, and defensive security in all the intelligence and educational content we publish.
        </p>
      </div>

      {/* Content */}
      <section className="max-w-[1000px] mx-auto px-6 pb-24">
        <div className="prose prose-invert max-w-none prose-h2:text-2xl prose-h2:font-display prose-h2:text-white prose-h2:mt-12 prose-h2:mb-6 prose-p:text-gray-400 prose-p:leading-relaxed prose-a:text-[#00ff88] prose-li:text-gray-400">
          
          <h2>1. Introduction</h2>
          <p>
            At ReconShield, our mission is to democratize access to high-quality, actionable, and defensive cybersecurity intelligence. To maintain the highest level of trust with our readers—including security researchers, system administrators, and IT professionals—we adhere to strict editorial standards.
          </p>

          <h2>2. Fact-Checking Standards</h2>
          <p>
            Accuracy is paramount in cybersecurity. Every technical article, intelligence briefing, and tool documentation page undergoes a rigorous review process before publication:
          </p>
          <ul>
            <li><strong>Technical Verification:</strong> Vulnerability write-ups and configuration guides are tested against controlled environments.</li>
            <li><strong>Source Credibility:</strong> We rely exclusively on primary sources (e.g., CVE databases, official vendor patches, whitepapers) and reputable threat intelligence feeds.</li>
            <li><strong>Peer Review:</strong> Content is reviewed by active security professionals to ensure that the defensive context is accurate and up-to-date.</li>
          </ul>

          <h2>3. Research Methodology</h2>
          <p>
            Our threat intelligence and OSINT content is generated through passive data collection and public records analysis. 
          </p>
          <ul>
            <li>We do NOT perform unauthorized active scanning to gather data for our articles.</li>
            <li>We do NOT disclose unpatched zero-day configuration risks without adhering to responsible disclosure protocols.</li>
            <li>Our focus is strictly on <strong>defensive architecture, exposure management, and risk mitigation</strong>.</li>
          </ul>

          <h2>4. Ethical-Use Principles</h2>
          <p>
            ReconShield strictly separates defensive research from defensive exploitation. Our content is written to empower defenders. 
          </p>
          <ul>
            <li>We do not publish abuse code (PoC) unless it is widely public and explicitly necessary to demonstrate defensive countermeasures.</li>
            <li>We avoid aggressive terminology that glorifies cybercrime. We focus on terms like "exposure management," "configuration risk," and "security posture."</li>
            <li>We explicitly instruct our readers to utilize our intelligence only on infrastructure they own or are authorized to audit.</li>
          </ul>

          <h2>5. Correction Policy</h2>
          <p>
            Cybersecurity is a rapidly evolving field. When new data emerges that contradicts a previously published article, or if an error is identified, we are committed to transparently updating our content.
          </p>
          <ul>
            <li>Major factual corrections will be highlighted with an "Update" note at the top of the article.</li>
            <li>Minor typographical or grammatical fixes are made silently.</li>
            <li>If you spot a technical inaccuracy, please report it via our <Link href="/contact">Contact Page</Link>.</li>
          </ul>

          <h2>6. Content Review Process</h2>
          <p>
            We regularly audit older content to ensure it remains technically relevant. Articles detailing outdated protocols, deprecated security headers, or obsolete configuration risks are updated with current best practices. We strive to provide a "Last Updated" timestamp on all technical guides to reflect their freshness.
          </p>

        </div>
      </section>
    </div>
  );
}
