"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Terminal, Shield, ArrowRight, Code2, Copy, Check, Info } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function FreeToolsHubPage() {
  const [copiedId, setCopiedId] = useState(null);

  const EMBEDDABLE_TOOLS = [
    {
      id: 'ssl',
      name: 'SSL Checker Widget',
      desc: 'Verify SSL expiration, protocol negotiation, and trust chains.',
      embedCode: `<div id="reconshield-ssl-widget"></div>\n<script src="https://reconshield.in/embed/ssl.js"></script>`,
      canonicalUrl: 'https://reconshield.in/tools/ssl-checker'
    },
    {
      id: 'subdomain',
      name: 'Subdomain Finder Widget',
      desc: 'Enumerate subdomain mapping and map public boundaries.',
      embedCode: `<div id="reconshield-subdomain-widget"></div>\n<script src="https://reconshield.in/embed/subdomain.js"></script>`,
      canonicalUrl: 'https://reconshield.in/tools/subdomain-finder'
    },
    {
      id: 'port',
      name: 'Port Scanner Widget',
      desc: 'Audit standard network listening ports and expose risks.',
      embedCode: `<div id="reconshield-port-widget"></div>\n<script src="https://reconshield.in/embed/port.js"></script>`,
      canonicalUrl: 'https://reconshield.in/tools/port-scanner'
    },
    {
      id: 'header',
      name: 'Security Header Grader Widget',
      desc: 'Evaluate and grade HTTP response security configuration alignment.',
      embedCode: `<div id="reconshield-header-widget"></div>\n<script src="https://reconshield.in/embed/header.js"></script>`,
      canonicalUrl: 'https://reconshield.in/tools/http-headers'
    }
  ];

  const handleCopy = (id, code) => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(code);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <div className="bg-[#05080f] min-h-screen text-white pb-24">
      <div className="max-w-5xl mx-auto px-4 pt-8">
        
        <Breadcrumbs crumbs={[
          { label: 'Free Tools & Embeds', href: '/free-tools' }
        ]} />

        {/* Page Header */}
        <div className="border-b border-white/10 pb-8 mb-12 mt-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[10px] font-mono text-emerald-400 mb-4 uppercase tracking-widest">
            <Shield className="w-3.5 h-3.5" />
            <span>Developer Widgets</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold font-display leading-tight mb-4">
            Free Security Widgets & Embeds
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl leading-relaxed font-sans">
            Add ReconShield passive scanning forms directly to your website or blog. Embed the scripts below to provide instant tools for your visitors.
          </p>
        </div>

        {/* Info Box */}
        <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 flex gap-4 items-start mb-12">
          <Info className="w-6 h-6 text-[#00ff88] shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs leading-relaxed font-sans text-gray-400">
            <strong className="text-white">Why embed ReconShield?</strong>
            <p>
              Our widgets are ultra-lightweight (under 2KB), styled in a responsive dark schema, and execute checks in a new window to ensure your site performance is unaffected. No external API keys are required for embedding.
            </p>
          </div>
        </div>

        {/* Grid of Embeds */}
        <div className="space-y-10">
          <h2 className="text-xl font-bold font-display text-white">Embed Script Generator</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {EMBEDDABLE_TOOLS.map((tool) => (
              <div key={tool.id} className="p-6 rounded-2xl bg-[#0d1117]/80 border border-white/5 space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-base font-bold font-display text-white">{tool.name}</h3>
                    <Link href={tool.canonicalUrl} className="text-[10px] font-mono text-[#00ff88] hover:underline">
                      Live Tool
                    </Link>
                  </div>
                  <p className="text-xs text-gray-500 font-sans leading-relaxed mb-4">{tool.desc}</p>
                  
                  {/* Code Block */}
                  <div className="relative group">
                    <pre className="p-3 bg-black rounded-lg text-[10px] font-mono text-cyan-400 border border-white/5 overflow-x-auto whitespace-pre select-all">
                      {tool.embedCode}
                    </pre>
                    <button
                      onClick={() => handleCopy(tool.id, tool.embedCode)}
                      className="absolute right-2 top-2 p-1.5 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white transition-all cursor-pointer"
                      title="Copy embed script"
                    >
                      {copiedId === tool.id ? <Check className="w-3.5 h-3.5 text-[#00ff88]" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 text-[9px] font-mono text-gray-500 flex justify-between items-center">
                  <span>No dependencies required</span>
                  {copiedId === tool.id && <span className="text-[#00ff88] font-bold">Copied!</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
