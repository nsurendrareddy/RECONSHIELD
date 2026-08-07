import React from 'react';
import MitreAttackClient from '@/components/MitreAttackClient';

export const metadata = {
  title: "MITRE ATT&CK Matrix Explorer & Heatmap Studio | ReconShield",
  description: "Explore MITRE ATT&CK tactics and techniques for Windows, Linux, and Cloud. Map adversary TTPs directly to Sigma detection rules. 100% free.",
  alternates: { canonical: "https://reconshield.in/tools/mitre-attack-explorer" },
  keywords: ["mitre attack explorer", "mitre attack matrix online", "ttp heatmap studio"]
};

export default function MitreAttackPage() {
  return (
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
      </div>
    </div>
  );
}
