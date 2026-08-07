import React from 'react';
import GoogleDorkBuilderClient from '@/components/GoogleDorkBuilderClient';

export const metadata = {
  title: "Google Dork Query Builder & OSINT Studio | ReconShield",
  description: "Construct advanced Google Dorks for OSINT reconnaissance. Discover exposed files, login portals, database backups, and S3 buckets safely. 100% free.",
  alternates: { canonical: "https://reconshield.in/tools/google-dork-builder" },
  keywords: ["google dork builder", "osint search query generator", "google dorks bug bounty", "find exposed files google dork"]
};

export default function GoogleDorkBuilderPage() {
  return (
    <div className="bg-[#05080f] min-h-screen text-white py-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="font-mono text-xs text-matrix-400 font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-matrix-400/10 border border-matrix-400/20">
            // OSINT RECONNAISSANCE SUITE
          </span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white uppercase tracking-tight">
            Google Dork Builder <span className="text-matrix-400">&amp; OSINT Studio</span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-base font-sans leading-relaxed">
            Construct targeted search operator dorks for security audits, shadow IT discovery, and passive asset reconnaissance.
          </p>
        </div>
        <GoogleDorkBuilderClient />
      </div>
    </div>
  );
}
