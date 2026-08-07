import React from 'react';
import JwtAuditorClient from '@/components/JwtAuditorClient';

export const metadata = {
  title: "JWT Security Auditor — Token Decoder & Flaw Tester | ReconShield",
  description: "Decode JSON Web Tokens, audit signature security, test for 'none' algorithm flaws, and crack weak HMAC secrets in-browser. 100% private.",
  alternates: { canonical: "https://reconshield.in/tools/jwt-security-auditor" },
  keywords: ["jwt auditor", "jwt decoder", "json web token security", "jwt secret cracker"]
};

export default function JwtAuditorPage() {
  return (
    <div className="bg-[#05080f] min-h-screen text-white py-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="font-mono text-xs text-matrix-400 font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-matrix-400/10 border border-matrix-400/20">
            // API &amp; AUTHENTICATION SECURITY
          </span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white uppercase tracking-tight">
            JWT Security <span className="text-matrix-400">Auditor &amp; Tester</span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-base font-sans leading-relaxed">
            Audit JSON Web Token structures, check signature algorithms, detect algorithm confusion risks, and test HMAC secret strength privately.
          </p>
        </div>
        <JwtAuditorClient />
      </div>
    </div>
  );
}
