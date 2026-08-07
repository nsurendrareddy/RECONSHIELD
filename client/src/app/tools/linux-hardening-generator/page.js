import React from 'react';
import LinuxHardeningClient from '@/components/LinuxHardeningClient';

export const metadata = {
  title: "Linux CIS Security Hardening Script Generator | ReconShield",
  description: "Generate customized Bash and Ansible hardening scripts for Ubuntu, Debian, and RHEL based on CIS Benchmarks. SSH, UFW, sysctl parameters. 100% free.",
  alternates: { canonical: "https://reconshield.in/tools/linux-hardening-generator" },
  keywords: ["linux hardening script generator", "ubuntu cis benchmark script", "ssh hardening generator"]
};

export default function LinuxHardeningPage() {
  return (
    <div className="bg-[#05080f] min-h-screen text-white py-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="font-mono text-xs text-matrix-400 font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-matrix-400/10 border border-matrix-400/20">
            // LINUX SECURITY &amp; SERVER HARDENING
          </span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white uppercase tracking-tight">
            Linux Hardening <span className="text-matrix-400">Script Generator</span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-base font-sans leading-relaxed">
            Construct automated Bash hardening scripts for Ubuntu, Debian, and RHEL server baselines.
          </p>
        </div>
        <LinuxHardeningClient />
      </div>
    </div>
  );
}
