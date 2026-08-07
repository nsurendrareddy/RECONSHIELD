import React from 'react';
import SigmaYaraClient from '@/components/SigmaYaraClient';

export const metadata = {
  title: "Sigma Rule to SIEM Translator & YARA Linter | ReconShield",
  description: "Convert Sigma detection rules into Splunk SPL, Elastic KQL, QRadar, and Microsoft Sentinel queries instantly. Validate YARA syntax in-browser. 100% free.",
  alternates: { canonical: "https://reconshield.in/tools/sigma-yara-studio" },
  keywords: ["sigma rule translator", "convert sigma to splunk", "sigma to kql sentinel", "yara linter online"]
};

export default function SigmaYaraPage() {
  return (
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
      </div>
    </div>
  );
}
