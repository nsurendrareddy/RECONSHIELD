import React from 'react';
import Link from 'next/link';
import { Award, ShieldCheck, ArrowLeft } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
  title: 'Editorial Standards & Publishing Guidelines | ReconShield',
  description: 'Understand the editorial guidelines, peer-review standards, and ethical publishing constraints enforced across ReconShield.',
  alternates: {
    canonical: 'https://reconshield.in/editorial-standards',
  }
};

export default function EditorialStandardsPage() {
  return (
    <div className="min-h-screen pb-24 bg-[#05080f] text-white">
      <div className="max-w-3xl mx-auto px-4 pt-8">
        
        <Breadcrumbs crumbs={[
          { label: 'Editorial Standards', href: '/editorial-standards' }
        ]} />

        {/* Header */}
        <div className="border-b border-white/10 pb-8 mb-10 mt-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00ff88]/10 border border-[#00ff88]/20 rounded-full text-[10px] font-mono text-[#00ff88] mb-4 uppercase tracking-widest">
            <ShieldCheck className="w-3 h-3" />
            <span>Ethical Security Reporting Framework</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold font-display leading-tight mb-4">
            Editorial Standards
          </h1>
          <p className="text-gray-400 text-base leading-relaxed">
            Technical integrity, transparency, and research standards enforced across all ReconShield intelligence publications.
          </p>
        </div>

        {/* Content */}
        <article className="prose prose-invert max-w-none text-gray-400 leading-relaxed space-y-6 font-sans text-sm">
          <p className="font-mono text-xs text-gray-500 uppercase tracking-wider">
            DOCUMENT REFERENCE: RS-ES-2026 | VERIFIED: June 2026
          </p>

          <h2 className="text-lg font-bold font-display text-white mt-8 mb-4">1. Objective and Technical Parity</h2>
          <p>
            ReconShield publishes defensive cybersecurity tutorials, protocol breakdowns, and network exposure threat studies. Every publication is audited for technical precision and structured to prevent alarmism or the glorification of offensive exploits.
          </p>

          <h2 className="text-lg font-bold font-display text-white mt-8 mb-4">2. Mandatory Citations and Alignment</h2>
          <p>
            No technical claims are published without primary source verification. This includes:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Protocol Specifications:</strong> Any explanation of DNS, SSL/TLS, and email routing must reference the official Internet Engineering Task Force (IETF) RFC specifications (e.g., RFC 7480 for RDAP).</li>
            <li><strong>Vulnerability Databases:</strong> Common Vulnerabilities and Exposures (CVE) writeups must link to the official National Vulnerability Database (NVD) records.</li>
            <li><strong>Tactic Classifications:</strong> Attributed adversary profiles and behaviors must align with the MITRE ATT&CK framework.</li>
          </ul>

          <h2 className="text-lg font-bold font-display text-white mt-8 mb-4">3. Ethical Research Guidelines</h2>
          <p>
            ReconShield enforces a zero-weaponization policy. We do not host or distribute active exploit payloads (Proof-of-Concept codes that execute remote shell access). We focus entirely on:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Configuration mitigation guidelines (Nginx config blocks, DNS policy syntax).</li>
            <li>Passive exposure audits and detection methodologies.</li>
            <li>Coordinated, responsible disclosure workflows for identified infrastructure flaws.</li>
          </ul>

          <h2 className="text-lg font-bold font-display text-white mt-8 mb-4">4. Verification Workflow</h2>
          <p>
            Before publication, all guides go through our three-step review pipeline:
          </p>
          <ol className="list-decimal pl-5 space-y-2">
            <li><strong>Technical Lab Reproduction:</strong> Verify server configuration commands work under standard OS distributions.</li>
            <li><strong>Security Architect Sign-off:</strong> Review terms to ensure alignment with defensive postures.</li>
            <li><strong>Metadata Schema Check:</strong> Confirm clean parsing of JSON-LD breadcrumbs and FAQ structures.</li>
          </ol>
        </article>

      </div>
    </div>
  );
}
