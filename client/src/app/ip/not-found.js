'use client'
import React from 'react'
import Link from 'next/link'
import { Globe, Shield, ArrowLeft, HelpCircle } from 'lucide-react'

export default function IpNotFound() {
  return (
    <div className="min-h-[85vh] bg-[#05080f] text-white py-20 px-6 font-sans">
      <div className="max-w-3xl mx-auto border border-white/5 bg-[#0a0d14] rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none" />
        
        {/* Header */}
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-6">
          <Globe className="w-4 h-4" />
          <span>Status Code: 404 - IP Reputation Resolve Failed</span>
        </div>
        
        <h1 className="text-3xl md:text-5xl font-display font-black text-white mb-6 uppercase tracking-tight">
          IP Address Profile Not Found
        </h1>
        
        <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-10">
          The requested IP address is either syntactically invalid, belongs to a private/reserved network space (RFC 1918), or currently does not have any recorded scanning activity in our sensors.
        </p>

        {/* Educational Section */}
        <section className="border-t border-white/5 pt-8 mb-10">
          <h2 className="text-lg font-bold text-white mb-4 uppercase tracking-wider flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#00ff88]" /> Understanding IP Reputation
          </h2>
          <div className="space-y-4 text-xs md:text-sm text-gray-400 leading-relaxed">
            <p>
              An <strong>IP Address</strong> is a numerical label assigned to each device connected to a computer network. Threat intelligence systems track the reputation of public IP addresses to identify malicious nodes:
            </p>
            <ul className="list-disc pl-5 space-y-2 font-mono text-xs">
              <li><strong className="text-white">Public IP Addresses:</strong> Globally unique endpoints visible across the public internet. Only public IPs can have global abuse scores or open port listings.</li>
              <li><strong className="text-white">Private IP Addresses (RFC 1918):</strong> Reserved blocks (e.g., <code>10.0.0.0/8</code>, <code>192.168.0.0/16</code>, <code>127.0.0.1</code>) used inside local area networks. Private IPs are never routed publicly on the internet and cannot be analyzed by external threat feeds.</li>
              <li><strong className="text-white">Abuse Confidence Score:</strong> A metric calculated based on the volume of SSH brute force, SQL injection, or spam attempts originating from a specific IP.</li>
            </ul>
          </div>
        </section>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link 
            href="/" 
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0d1117] border border-white/5 hover:border-cyan-400/30 px-6 py-3 rounded-xl text-xs font-mono text-white uppercase tracking-widest transition-all"
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
