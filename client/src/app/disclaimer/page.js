import React from 'react';
import { AlertTriangle, Shield, CheckCircle, Info } from 'lucide-react';

export const metadata = {
  title: "Legal Disclaimer & Compliance | ReconShield",
  description: "Official legal disclaimer and compliance policy for the ReconShield platform. Learn about our passive security research guidelines and terms of authorized use.",
  alternates: {
    canonical: "https://reconshield.in/disclaimer",
  }
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Page Header */}
      <div className="flex items-center gap-4 mb-8">
        <h1 className="font-mono text-xs tracking-[4px] uppercase text-[#00ff88] font-bold">// LEGAL DISCLAIMER</h1>
        <div className="h-[1px] flex-1 bg-[#1a2332]" />
      </div>

      {/* Hero Alert Box */}
      <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-6 mb-12 flex flex-col md:flex-row items-start gap-4">
        <div className="p-3 bg-amber-500/10 rounded-lg text-amber-500 shrink-0">
          <AlertTriangle className="w-6 h-6 animate-pulse" />
        </div>
        <div>
          <h2 className="text-base font-mono font-bold text-white uppercase tracking-wider mb-2">CRITICAL NOTICE FOR ALL USERS</h2>
          <p className="text-gray-400 text-xs leading-relaxed font-sans">
            ReconShield is strictly engineered and intended for authorized cybersecurity research, defensive threat modeling, and professional security education. Performing scanning, reconnaissance, or data collection against digital assets without explicit, written permission from the asset owner is illegal and constitutes a violation of international computer misuse acts.
          </p>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-[#0d1117] border border-[#1a2332] rounded-xl p-8 space-y-8 font-sans text-xs leading-relaxed text-gray-300">
        
        {/* Section 1: Authorized Use Policy */}
        <section className="space-y-3">
          <h3 className="text-white font-mono font-bold uppercase tracking-wider text-[11px] flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#00ff88]" /> 1. Authorized & Defensive Use Only
          </h3>
          <p>
            By accessing or utilizing any tools, threat intelligence reports, or APIs on ReconShield, you represent and warrant that you are either the authorized owner of the target infrastructure or have obtained explicit authorization to audit the designated networks. These utilities are provided to assist system administrators, security engineers, and ethical researchers in identifying and correcting defensive vulnerabilities.
          </p>
        </section>

        {/* Section 2: Passive OSINT Scanning Posture */}
        <section className="space-y-3">
          <h3 className="text-white font-mono font-bold uppercase tracking-wider text-[11px] flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#00ff88]" /> 2. Passive OSINT Posture & Hacking Tool Compliance
          </h3>
          <p>
            ReconShield is **NOT** an active vulnerability exploitation framework, "hacking tool," or packet-injection system. All scanning utilities offered on this platform (including the IP Intelligence Engine, SSL/TLS Checker, DNS Lookup, and Security Header Auditor) operate on a **100% Passive OSINT (Open Source Intelligence) Methodology**. 
          </p>
          <p className="pl-4 border-l border-[#00ff88]/20 text-gray-400">
            This means ReconShield **does not interact with, send payloads to, or exploit target hosts directly**. Instead, it queries public, authorized global databases, DNS registries, and open threat-intelligence indexes to compile publicly exposed meta-structures. Because of this defensive architecture, our utilities do not cause system disruption, unauthorized traffic, or denial of service.
          </p>
        </section>

        {/* Section 3: Educational and Informational Nature */}
        <section className="space-y-3">
          <h3 className="text-white font-mono font-bold uppercase tracking-wider text-[11px] flex items-center gap-2">
            <Info className="w-4 h-4 text-[#00ff88]" /> 3. Threat Intelligence & Educational Focus
          </h3>
          <p>
            All threat intelligence logs, articles, indicators of compromise (IOCs), and security analyses provided in the ReconShield blog are intended purely for security awareness, historical documentation of cyber events, and defensive training. ReconShield does not publish, host, or distribute malicious code, functional exploit scripts, or instructions aimed at enabling unauthorized digital access.
          </p>
        </section>

        {/* Section 4: Limitation of Liability */}
        <section className="space-y-3">
          <h3 className="text-white font-mono font-bold uppercase tracking-wider text-[11px] flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-[#00ff88]" /> 4. Limitation of Liability & Warranty Exclusion
          </h3>
          <p>
            ReconShield is provided on an "as-is" and "as-available" basis without warranties of any kind, whether express or implied. The developers, operators, and authors of ReconShield assume **absolutely zero liability** and are not responsible for any direct, indirect, incidental, or consequential damages, legal repercussions, or system failures resulting from the misuse or misinterpretation of the tools, guides, or data hosted on this platform.
          </p>
        </section>
      </div>

      {/* Call to Action Footer */}
      <div className="mt-8 text-center">
        <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
          Securing the digital frontier, ethically.
        </p>
      </div>
    </div>
  );
}
