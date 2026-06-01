'use client'
import React from 'react'
import Link from 'next/link'
import { Network, Shield, ArrowLeft, HelpCircle } from 'lucide-react'

export default function AsnNotFound() {
  const popularAsns = ['AS15169', 'AS13335', 'AS714', 'AS32934', 'AS16509'];

  return (
    <div className="min-h-[85vh] bg-[#05080f] text-white py-20 px-6 font-sans">
      <div className="max-w-3xl mx-auto border border-white/5 bg-[#0a0d14] rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 blur-[100px] rounded-full pointer-events-none" />
        
        {/* Header */}
        <div className="flex items-center gap-2 text-xs font-mono text-purple-400 uppercase tracking-widest mb-6">
          <Network className="w-4 h-4" />
          <span>Status Code: 404 - BGP Routing Resolution Failed</span>
        </div>
        
        <h1 className="text-3xl md:text-5xl font-display font-black text-white mb-6 uppercase tracking-tight">
          Autonomous System (ASN) Not Found
        </h1>
        
        <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-10">
          The requested Autonomous System Number (ASN) is invalid or currently does not have active routing advertisements indexed in our database.
        </p>

        {/* Educational Section */}
        <section className="border-t border-white/5 pt-8 mb-10">
          <h2 className="text-lg font-bold text-white mb-4 uppercase tracking-wider flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#00ff88]" /> Understanding BGP & Autonomous Systems
          </h2>
          <div className="space-y-4 text-xs md:text-sm text-gray-400 leading-relaxed">
            <p>
              An <strong>Autonomous System (AS)</strong> is a collection of IP networks controlled by a single network operator (such as an ISP, a university, or a major technology enterprise) that maintains a routing policy. 
            </p>
            <p>
              Autonomous Systems communicate with each other using the <strong>Border Gateway Protocol (BGP)</strong>. Every AS is assigned a unique 16-bit or 32-bit identifier called an <strong>ASN (Autonomous System Number)</strong>. 
            </p>
            <ul className="list-disc pl-5 space-y-2 font-mono text-xs">
              <li><strong className="text-white">IP Prefixes:</strong> ASNs announce IP address blocks (CIDR blocks) that they are authorized to route.</li>
              <li><strong className="text-white">BGP Hijacking:</strong> Occurs when a malicious network operator advertises routes for IP ranges it does not own, disrupting communications.</li>
              <li><strong className="text-white">Reputation Filtering:</strong> Security appliances block entire ASNs if they host excessive malware or act as malicious spam origins.</li>
            </ul>
          </div>
        </section>

        {/* Suggested Queries */}
        <div className="bg-black/30 border border-white/5 p-6 rounded-2xl mb-10">
          <h3 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest mb-4">
            Common Network ASNs
          </h3>
          <div className="flex flex-wrap gap-3">
            {popularAsns.map(asn => (
              <Link 
                key={asn} 
                href={`/asn/${asn}`} 
                className="px-4 py-2 bg-surface-900 border border-white/5 hover:border-purple-400/30 rounded-xl text-xs font-mono text-white transition-all"
              >
                {asn} (Google/Cloudflare) →
              </Link>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link 
            href="/asn" 
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0d1117] border border-white/5 hover:border-purple-400/30 px-6 py-3 rounded-xl text-xs font-mono text-white uppercase tracking-widest transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> Back to ASN Hub
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
