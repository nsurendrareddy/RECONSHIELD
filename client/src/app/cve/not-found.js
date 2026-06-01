'use client'
import React from 'react'
import Link from 'next/link'
import { Shield, AlertTriangle, ArrowLeft, HelpCircle } from 'lucide-react'

export default function CveNotFound() {
  const commonCves = ['CVE-2021-44228', 'CVE-2017-0144', 'CVE-2023-44487', 'CVE-2023-42793'];

  return (
    <div className="min-h-[85vh] bg-[#05080f] text-white py-20 px-6 font-sans">
      <div className="max-w-3xl mx-auto border border-white/5 bg-[#0a0d14] rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 blur-[100px] rounded-full pointer-events-none" />
        
        {/* Header */}
        <div className="flex items-center gap-2 text-xs font-mono text-red-500 uppercase tracking-widest mb-6">
          <Shield className="w-4 h-4" />
          <span>Status Code: 404 - CVE Registry Search Failed</span>
        </div>
        
        <h1 className="text-3xl md:text-5xl font-display font-black text-white mb-6 uppercase tracking-tight">
          Vulnerability Profile Not Found
        </h1>
        
        <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-10">
          The requested Common Vulnerabilities and Exposures (CVE) identifier is either invalid or does not currently have a threat intelligence profile compiled in our platform.
        </p>

        {/* Educational Section */}
        <section className="border-t border-white/5 pt-8 mb-10">
          <h2 className="text-lg font-bold text-white mb-4 uppercase tracking-wider flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#00ff88]" /> Understanding Vulnerability Scoring
          </h2>
          <div className="space-y-4 text-xs md:text-sm text-gray-400 leading-relaxed">
            <p>
              A <strong>CVE (Common Vulnerabilities and Exposures)</strong> is a unique identifier assigned by authorized CVE Numbering Authorities (CNAs) to public computer security vulnerabilities. 
            </p>
            <p>
              Security teams use three primary metrics to assess the risk of a CVE:
            </p>
            <ul className="list-disc pl-5 space-y-2 font-mono text-xs">
              <li><strong className="text-white">CVSS Score (Common Vulnerability Scoring System):</strong> A score from 0.0 to 10.0 representing the severity based on ease of access, authentication requirements, and impact on system confidentiality and integrity.</li>
              <li><strong className="text-white">EPSS Score (Exploit Prediction Scoring System):</strong> A model predicting the probability (0 to 1) that a vulnerability will be actively exploited in the wild within the next 30 days.</li>
              <li><strong className="text-white">CISA KEV (Known Exploited Vulnerabilities):</strong> A catalog compiled by the Cybersecurity and Infrastructure Security Agency listing vulnerabilities with active exploitation evidence. These must be patched immediately.</li>
            </ul>
          </div>
        </section>

        {/* Suggested Queries */}
        <div className="bg-black/30 border border-white/5 p-6 rounded-2xl mb-10">
          <h3 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest mb-4">
            Notable CVE Case Studies
          </h3>
          <div className="flex flex-wrap gap-3">
            {commonCves.map(cve => (
              <Link 
                key={cve} 
                href={`/cve/${cve.toLowerCase()}`} 
                className="px-4 py-2 bg-surface-900 border border-white/5 hover:border-red-500/30 rounded-xl text-xs font-mono text-white transition-all"
              >
                {cve} →
              </Link>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link 
            href="/" 
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0d1117] border border-white/5 hover:border-red-500/30 px-6 py-3 rounded-xl text-xs font-mono text-white uppercase tracking-widest transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Threat Search
          </Link>
          <Link 
            href="/blog" 
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-matrix-400/10 hover:bg-matrix-400/20 text-matrix-400 border border-matrix-400/20 px-6 py-3 rounded-xl text-xs font-mono uppercase tracking-widest transition-all"
          >
            Access Intelligence Feed
          </Link>
        </div>
      </div>
    </div>
  )
}
