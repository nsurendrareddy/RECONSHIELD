import React from 'react';
import CspEvaluatorClient from '@/components/CspEvaluatorClient';
import { Shield, ShieldAlert, Check } from 'lucide-react';

export const metadata = {
  title: "CSP Level 3 Evaluator & Header Builder | ReconShield",
  description: "Evaluate Content Security Policy headers, detect XSS vulnerabilities, and generate Nginx, Apache, and Next.js CSP configuration snippets. 100% free.",
  alternates: {
    canonical: "https://reconshield.in/tools/csp-evaluator-builder",
  },
  keywords: ["csp evaluator", "content security policy builder", "xss protection", "nginx csp header", "csp level 3 generator"]
};

export default function CspEvaluatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "ReconShield CSP Evaluator & Builder",
        "operatingSystem": "All",
        "applicationCategory": "SecurityApplication",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="bg-[#05080f] min-h-screen text-white py-12">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="font-mono text-xs text-matrix-400 font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-matrix-400/10 border border-matrix-400/20">
              // WEB APPLICATION SECURITY SUITE
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white uppercase tracking-tight">
              CSP Level 3 <span className="text-matrix-400">Evaluator &amp; Builder</span>
            </h1>
            <p className="text-gray-400 text-sm sm:text-base font-sans leading-relaxed">
              Design, test, and validate Content Security Policy headers to mitigate Cross-Site Scripting (XSS) and clickjacking attacks.
            </p>
          </div>

          <CspEvaluatorClient />
        </div>
      </div>
    </>
  );
}
