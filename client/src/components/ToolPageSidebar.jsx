import React from 'react';
import Link from 'next/link';
import { ArrowRight, Shield, Layers, Globe, Star, Mail, Search, Lock, Code, Terminal, Network } from 'lucide-react';
import { FLAGSHIP_TOOLS } from '@/registry/tools';
import { CATEGORIES } from '@/registry/categories';

export default function ToolPageSidebar({ currentToolId }) {
  return (
    <aside className="w-full lg:w-80 space-y-6 font-sans shrink-0">
      {/* 1. TOP FEATURED FLAGSHIP TOOLS */}
      <div className="p-5 bg-surface-900 border border-white/10 rounded-2xl space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h3 className="font-mono text-xs uppercase font-bold text-matrix-400 tracking-widest flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5" />
            <span>Featured Flagship Tools</span>
          </h3>
          <span className="text-[9px] font-mono text-gray-500 uppercase">Top 10</span>
        </div>

        <div className="space-y-2 font-mono text-xs">
          {FLAGSHIP_TOOLS.map((tool) => {
            const isActive = tool.id === currentToolId || tool.slug === currentToolId;
            return (
              <Link
                key={tool.id}
                href={`/tools/${tool.slug}`}
                className={`p-2.5 rounded-xl border transition-all flex items-center justify-between group ${
                  isActive
                    ? 'bg-matrix-400/10 border-matrix-400/40 text-matrix-400'
                    : 'bg-surface-950/80 border-white/5 text-gray-300 hover:border-matrix-400/30 hover:text-matrix-400'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="text-white font-medium group-hover:text-matrix-400 transition-colors truncate">
                    {tool.name}
                  </span>
                  {tool.isNew && (
                    <span className="text-[8px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.2 rounded bg-matrix-400/20 text-matrix-400 border border-matrix-400/30 shrink-0">
                      NEW
                    </span>
                  )}
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-matrix-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
              </Link>
            );
          })}
        </div>
      </div>

      {/* 2. BROWSE CATEGORIES */}
      <div className="p-5 bg-surface-900 border border-white/10 rounded-2xl space-y-3 shadow-xl">
        <h3 className="font-mono text-xs uppercase font-bold text-cyan-400 tracking-widest flex items-center gap-1.5 border-b border-white/5 pb-3">
          <Layers className="w-3.5 h-3.5" />
          <span>Browse Categories</span>
        </h3>

        <div className="flex flex-wrap gap-1.5 font-mono text-xs">
          {CATEGORIES.slice(0, 10).map((cat) => (
            <Link
              key={cat.id}
              href={`/tools/${cat.slug}`}
              className="px-2.5 py-1 rounded-lg bg-surface-950 border border-white/5 text-gray-400 hover:text-white hover:border-cyan-400/30 transition-colors text-[11px]"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>

      {/* 3. EXPLORE ALL TOOLS DIRECTORY CTA */}
      <div className="p-5 bg-gradient-to-br from-surface-900 to-surface-950 border border-matrix-400/30 rounded-2xl space-y-3 shadow-xl text-center">
        <h4 className="font-display font-bold text-white uppercase text-sm">Explore 100+ Security Tools</h4>
        <p className="text-gray-400 text-xs font-sans leading-relaxed">
          Access our full directory of free cybersecurity, OSINT, network audit, and threat intelligence tools.
        </p>
        <Link
          href="/tools"
          className="w-full py-2.5 bg-matrix-400 hover:bg-matrix-300 text-black text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-all shadow-[0_0_12px_rgba(0,255,156,0.3)] inline-flex items-center justify-center gap-1.5"
        >
          <span>→ Explore All Tools Directory</span>
        </Link>
      </div>
    </aside>
  );
}
