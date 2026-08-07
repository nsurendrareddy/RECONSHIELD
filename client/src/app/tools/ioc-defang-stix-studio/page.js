import React from 'react';
import IocDefangClient from '@/components/IocDefangClient';

export const metadata = {
  title: "IOC Defang & STIX 2.1 Threat Studio | ReconShield",
  description: "Defang and refang malicious URLs, IP addresses, domains, and emails safely. Export clean indicators of compromise into STIX 2.1 format. 100% free.",
  alternates: { canonical: "https://reconshield.in/tools/ioc-defang-stix-studio" },
  keywords: ["ioc defang", "defang url ip address", "refang ioc", "stix 2.1 threat generator"]
};

export default function IocDefangPage() {
  return (
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
      </div>
    </div>
  );
}
