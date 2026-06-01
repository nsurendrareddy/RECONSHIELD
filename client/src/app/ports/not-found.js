'use client'
import React from 'react'
import Link from 'next/link'
import { Server, Shield, Network, ArrowLeft, HelpCircle } from 'lucide-react'

export default function PortNotFound() {
  const commonPorts = [22, 80, 443, 3389, 8080];
  
  return (
    <div className="min-h-[85vh] bg-[#05080f] text-white py-20 px-6 font-sans">
      <div className="max-w-3xl mx-auto border border-white/5 bg-[#0a0d14] rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 blur-[100px] rounded-full pointer-events-none" />
        
        {/* Header */}
        <div className="flex items-center gap-2 text-xs font-mono text-red-500 uppercase tracking-widest mb-6">
          <Shield className="w-4 h-4" />
          <span>Status Code: 404 - Registry Query Failed</span>
        </div>
        
        <h1 className="text-3xl md:text-5xl font-display font-black text-white mb-6 uppercase tracking-tight">
          Network Port Profile Not Found
        </h1>
        
        <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-10">
          The requested network port is either invalid, out of the allowed range (1–65535), or currently does not have a dedicated threat analysis profile in our intelligence registry.
        </p>

        {/* Educational Section */}
        <section className="border-t border-white/5 pt-8 mb-10">
          <h2 className="text-lg font-bold text-white mb-4 uppercase tracking-wider flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#00ff88]" /> Understanding Port Exposure
          </h2>
          <div className="space-y-4 text-xs md:text-sm text-gray-400 leading-relaxed">
            <p>
              In computer networking, a port is a logical endpoint for system communications. Port numbers range from <strong>1 to 65535</strong> and are categorized by the Internet Assigned Numbers Authority (IANA) into:
            </p>
            <ul className="list-disc pl-5 space-y-2 font-mono text-xs">
              <li><strong className="text-white">Well-Known Ports (1-1023):</strong> Used by system services such as SSH (22), HTTP (80), and HTTPS (443).</li>
              <li><strong className="text-white">Registered Ports (1024-49151):</strong> Reserved for specific applications like MySQL (3306) and RDP (3389).</li>
              <li><strong className="text-white">Dynamic/Private Ports (49152-65535):</strong> Used for ephemeral client side transit.</li>
            </ul>
            <p>
              Exposing ports to the public WAN creates a potential attack entry point. Standard network firewalls should block all incoming ports by default, whitelisting traffic only for authorized IPs or requiring a secure VPN tunnel.
            </p>
          </div>
        </section>

        {/* Suggested Queries */}
        <div className="bg-black/30 border border-white/5 p-6 rounded-2xl mb-10">
          <h3 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest mb-4">
            Common Security Port Profiles
          </h3>
          <div className="flex flex-wrap gap-3">
            {commonPorts.map(port => (
              <Link 
                key={port} 
                href={`/ports/${port}`} 
                className="px-4 py-2 bg-surface-900 border border-white/5 hover:border-[#00ff88]/30 rounded-xl text-xs font-mono text-white transition-all"
              >
                Port {port} →
              </Link>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link 
            href="/ports" 
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0d1117] border border-white/5 hover:border-[#00ff88]/30 px-6 py-3 rounded-xl text-xs font-mono text-white uppercase tracking-widest transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Ports Hub
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
