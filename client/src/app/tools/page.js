import React from 'react';
import ToolsDirectoryClient from '@/components/ToolsDirectoryClient';
import Link from 'next/link';
import { Shield, Search, Terminal, Globe, Lock, Mail, Server, Radio, Cpu, ShieldAlert, Check } from 'lucide-react';

export const metadata = {
  title: "Free Cybersecurity Tools & OSINT Directory",
  description: "Free cybersecurity tools directory. WHOIS lookup, DNS checker, port scanner, SSL tester, email security validator, and passive OSINT tools. 100% free.",
  alternates: {
    canonical: "https://reconshield.in/tools",
  },
  keywords: [
    "cybersecurity tools", "free security tools", "osint directory", "penetration testing tools", 
    "whois lookup", "dns checker", "port scanner", "ssl checker", "vulnerability scanner", "email security"
  ],
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  openGraph: {
    title: "Free Cybersecurity Tools & OSINT Directory | ReconShield",
    description: "Free cybersecurity tools directory. WHOIS lookup, DNS checker, port scanner, SSL tester, and passive OSINT tools.",
    url: "https://reconshield.in/tools",
    type: "website",
    siteName: "ReconShield",
    images: [
      {
        url: "https://reconshield.in/og-image-tools.png",
        width: 1200,
        height: 630,
        alt: "Free Cybersecurity Tools Directory - ReconShield"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Cybersecurity Tools & OSINT Directory | ReconShield",
    description: "Free cybersecurity tools directory. WHOIS, DNS, SSL, and passive security testing.",
    images: ["https://reconshield.in/og-image-tools.png"]
  }
};

export default function ToolsHubPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://reconshield.in/tools#webpage",
        "url": "https://reconshield.in/tools",
        "name": "Free Cybersecurity Tools Directory",
        "description": "Directory of free cybersecurity and OSINT utilities for security researchers and developers."
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://reconshield.in/tools#breadcrumb",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://reconshield.in" },
          { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://reconshield.in/tools" }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="bg-[#05080f] min-h-screen text-white py-12">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Directory Hero Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="font-mono text-xs text-matrix-400 font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-matrix-400/10 border border-matrix-400/20">
              // RECONSHIELD TOOL PLATFORM
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white uppercase tracking-tight">
              Free Cybersecurity <span className="text-matrix-400">&amp; OSINT Directory</span>
            </h1>
            <p className="text-gray-400 text-sm sm:text-base font-sans leading-relaxed">
              Enterprise-grade security diagnostics, domain WHOIS lookups, global DNS resolution, network port audits, and anti-spoofing checks. 100% free with no registration required.
            </p>
          </div>

          {/* Interactive Tools Directory Client Hub */}
          <ToolsDirectoryClient />

          {/* Educational Security Information Section (AdSense & E-E-A-T) */}
          <section className="pt-12 border-t border-white/5 space-y-8 font-sans max-w-4xl mx-auto">
            <div className="space-y-3 text-center">
              <h2 className="text-2xl font-bold font-display uppercase tracking-wide text-white">
                Why Use ReconShield Cybersecurity Utilities?
              </h2>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                ReconShield utility tools operate passively to perform non-intrusive security audits across public DNS records, registrar disclosures, SSL/TLS handshake chains, and HTTP header configurations.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-gray-300">
              <div className="p-4 bg-surface-900 border border-white/5 rounded-xl space-y-2">
                <h3 className="font-bold text-white font-display text-sm flex items-center gap-2">
                  <Check className="w-4 h-4 text-matrix-400" /> 100% Free &amp; Client-First
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  No subscriptions, usage paywalls, or mandatory sign-ups. Access full diagnostic telemetry instantly.
                </p>
              </div>
              <div className="p-4 bg-surface-900 border border-white/5 rounded-xl space-y-2">
                <h3 className="font-bold text-white font-display text-sm flex items-center gap-2">
                  <Check className="w-4 h-4 text-matrix-400" /> Passive &amp; Non-Intrusive
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  All scans are executed passively using open OSINT data sources and public endpoints, creating zero server load on targets.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
