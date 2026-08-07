import React from 'react';
import TlsHardeningClient from '@/components/TlsHardeningClient';

export const metadata = {
  title: "TLS Cipher Hardening & Config Studio | ReconShield",
  description: "Generate secure TLS 1.3 and 1.2 cipher configuration rules for Nginx, Apache, HAProxy, and Cloudflare based on Mozilla baselines. 100% free.",
  alternates: { canonical: "https://reconshield.in/tools/tls-hardening-studio" },
  keywords: ["tls cipher hardening", "nginx ssl config generator", "mozilla tls config builder"]
};

export default function TlsHardeningPage() {
  return (
    <div className="bg-[#05080f] min-h-screen text-white py-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="font-mono text-xs text-matrix-400 font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-matrix-400/10 border border-matrix-400/20">
            // SSL / TLS CRYPTOGRAPHIC HARDENING
          </span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white uppercase tracking-tight">
            TLS Cipher <span className="text-matrix-400">Hardening Studio</span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-base font-sans leading-relaxed">
            Construct Mozilla-compliant TLS 1.2 and 1.3 web server encryption configurations.
          </p>
        </div>
        <TlsHardeningClient />
      </div>
    </div>
  );
}
