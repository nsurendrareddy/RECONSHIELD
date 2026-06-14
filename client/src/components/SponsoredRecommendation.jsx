'use client'

import React from 'react'
import { Shield, ExternalLink } from 'lucide-react'

export function SponsoredRecommendation() {
  return (
    <div className="my-8 p-6 bg-[#0d1117] border border-[#1a2332] hover:border-[#00ff8844] rounded-xl transition-all duration-300 shadow-lg relative overflow-hidden group">
      {/* Decorative gradient top border that glows on hover */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00ff8833] to-transparent group-hover:via-[#00ff88] transition-all duration-500" />
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex-1 space-y-2">
          {/* Sponsored label */}
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-[9px] font-mono tracking-[1px] text-[#00ff88] bg-[#00ff8811] border border-[#00ff8822] rounded uppercase">
              Sponsored
            </span>
          </div>
          
          {/* Title */}
          <h4 className="text-[14px] font-semibold text-white font-mono uppercase tracking-[1px] flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#00ff88] shrink-0" />
            Recommended Security Resource
          </h4>
          
          {/* Description */}
          <p className="text-[12px] text-[#94a3b8] leading-relaxed font-sans max-w-2xl">
            Explore trusted cybersecurity tools, hosting services, VPN solutions, and security resources.
          </p>
        </div>
        
        {/* Action Button */}
        <div className="shrink-0 flex items-center">
          <a
            href="https://omg10.com/4/11124461"
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#00ff8811] border border-[#00ff8833] hover:bg-[#00ff8822] hover:border-[#00ff8888] text-[#00ff88] font-mono text-[10px] uppercase tracking-[2px] transition-all duration-300 rounded shadow-[0_0_15px_rgba(0,255,136,0.05)] hover:shadow-[0_0_20px_rgba(0,255,136,0.15)]"
          >
            Learn More
            <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </div>
  )
}

// Alias to satisfy both requested component names
export const DirectLinkAd = SponsoredRecommendation;

export default SponsoredRecommendation;
