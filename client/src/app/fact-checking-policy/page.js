import React from 'react';
import Link from 'next/link';
import { ShieldAlert, CheckCircle, ArrowLeft } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
  title: 'Fact-Checking & Data Verification Policy | ReconShield',
  description: 'Learn about our strict threat intelligence verification protocols, Kent\'s scale of probability, and telemetry validation procedures.',
  alternates: {
    canonical: 'https://reconshield.in/fact-checking-policy',
  }
};

export default function FactCheckingPolicyPage() {
  return (
    <div className="min-h-screen pb-24 bg-[#05080f] text-white">
      <div className="max-w-3xl mx-auto px-4 pt-8">
        
        <Breadcrumbs crumbs={[
          { label: 'Fact-Checking Policy', href: '/fact-checking-policy' }
        ]} />

        {/* Header */}
        <div className="border-b border-white/10 pb-8 mb-10 mt-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-[10px] font-mono text-cyan-400 mb-4 uppercase tracking-widest">
            <ShieldAlert className="w-3 h-3" />
            <span>Factual Verification & Audit telemetry</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold font-display leading-tight mb-4">
            Fact-Checking Policy
          </h1>
          <p className="text-gray-400 text-base leading-relaxed">
            How we verify threat signatures, compile network reputation listings, and handle telemetry updates.
          </p>
        </div>

        {/* Content */}
        <article className="prose prose-invert max-w-none text-gray-400 leading-relaxed space-y-6 font-sans text-sm">
          <p className="font-mono text-xs text-gray-500 uppercase tracking-wider">
            DOCUMENT REFERENCE: RS-FCP-2026 | VERIFIED: June 2026
          </p>

          <h2 className="text-lg font-bold font-display text-white mt-8 mb-4">1. Telemetry Verification Standards</h2>
          <p>
            ReconShield publishes reputation indicators and configuration vulnerability reports. To maintain high accuracy and prevent false positives, we verify telemetry against multiple independent databases (such as Spamhaus DROP records, AbuseIPDB reputation points, and Censys certificate logs).
          </p>

          <h2 className="text-lg font-bold font-display text-white mt-8 mb-4">2. Kent's Scale of Probability</h2>
          <p>
            We use Kent's Scale of Probability to rate our threat intelligence findings, assigning certainty levels based on the corroboration of telemetry:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>High Confidence:</strong> Telemetry is confirmed by three or more independent scanning sensors within a rolling 24-hour window.</li>
            <li><strong>Medium Confidence:</strong> Indicators match established threat behavior patterns but are only verified by one source.</li>
            <li><strong>Low Confidence:</strong> Single-source reports that require further diagnostic inspection before classification.</li>
          </ul>

          <h2 className="text-lg font-bold font-display text-white mt-8 mb-4">3. Infrastructure Whitelist Protections</h2>
          <p>
            We explicitly profile public infrastructure endpoints (e.g., Googlebot crawlers, Cloudflare Anycast servers, and OpenDNS nodes) to prevent false positives and block misleading security warnings on our platform.
          </p>

          <h2 className="text-lg font-bold font-display text-white mt-8 mb-4">4. Correction Mechanisms</h2>
          <p>
            When a technical error or outdated server configuration advisory is identified, we commit to immediate revision updates. A notice is added to the top of the article detailing the correction. Community reports can be made directly via our <Link href="/contact" className="text-[#00ff88] underline">contact form</Link>.
          </p>
        </article>

      </div>
    </div>
  );
}
