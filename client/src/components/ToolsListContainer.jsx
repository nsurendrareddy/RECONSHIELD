'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Filter, X, ArrowUpRight, Shield, Network, Server, Globe, Terminal, Cpu, Lock, Mail, Activity } from 'lucide-react';

const ICON_MAP = {
  whois: Search,
  dns: Network,
  subdomain: Server,
  ip: Globe,
  port: Terminal,
  tech: Cpu,
  ssl: Lock,
  headers: Shield,
  email: Mail,
  vuln: Activity,
  scanner: Shield
};

export default function ToolsListContainer({ tools, categories }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredTools = useMemo(() => {
    return tools.filter(tool => {
      const matchesSearch = 
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.useCases.some(u => u.toLowerCase().includes(searchQuery.toLowerCase())) ||
        tool.benefits.some(b => b.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = activeCategory === "All" || tool.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory, tools]);

  return (
    <div>
      {/* Controls Panel */}
      <div className="bg-[#0b0e14]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-6 mb-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[80px] rounded-full pointer-events-none -z-10" />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          {/* Tool Search Bar */}
          <div className="lg:col-span-1 relative flex items-center bg-[#05080f] border border-white/10 rounded-2xl px-4 py-1 transition-all focus-within:border-cyan-400/50 focus-within:ring-1 focus-within:ring-cyan-400/50">
            <Search className="w-5 h-5 text-gray-500 shrink-0" />
            <input
              type="text"
              className="w-full bg-transparent py-3 pl-3 pr-8 text-white focus:outline-none font-mono text-sm placeholder:font-sans placeholder:text-gray-500"
              placeholder="Search cybersecurity tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 p-1 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white cursor-pointer"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="lg:col-span-2 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xs font-mono text-gray-500 uppercase tracking-widest pl-1">
              <Filter className="w-3.5 h-3.5 text-cyan-400" /> Filter by Category
            </div>
            <div className="flex overflow-x-auto pb-1 hide-scrollbar gap-2 max-w-full">
              {categories.map((cat) => {
                const isSelected = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-mono transition-all border cursor-pointer ${
                      isSelected
                        ? 'bg-cyan-400/10 text-cyan-400 border-cyan-400/30 font-bold shadow-[0_0_15px_rgba(0,229,255,0.05)]'
                        : 'bg-surface-900 text-gray-400 border-white/5 hover:bg-surface-800 hover:text-white'
                    }`}
                  >
                    {cat.toUpperCase()}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((tool) => {
          const Icon = ICON_MAP[tool.iconName];
          return (
            <div
              key={tool.id}
              className="group flex flex-col justify-between p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/[0.02] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                    {Icon ? <Icon className="w-5 h-5" /> : <Shield className="w-5 h-5" />}
                  </div>
                  <span className="text-[8px] font-mono text-gray-500 bg-surface-950 border border-white/5 px-2 py-0.5 rounded tracking-wider">
                    {tool.category.toUpperCase()}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors flex items-center gap-1.5 font-display tracking-wide uppercase">
                  {tool.name}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-6">
                  {tool.desc}
                </p>

                <div className="space-y-4 mb-6">
                  <div>
                    <span className="text-[10px] text-gray-500 font-mono block uppercase mb-1">// Primary Use Cases</span>
                    <div className="flex flex-wrap gap-1.5">
                      {tool.useCases.map(u => (
                        <span key={u} className="text-[9px] font-mono text-gray-400 bg-surface-950 px-2 py-0.5 rounded border border-white/5">{u}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 font-mono block uppercase mb-1">// Key Benefits</span>
                    <div className="flex flex-wrap gap-1.5">
                      {tool.benefits.map(b => (
                        <span key={b} className="text-[9px] font-mono text-gray-400 bg-surface-950 px-2 py-0.5 rounded border border-white/5">{b}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 font-mono block uppercase mb-1">// Related Tools</span>
                    <div className="flex flex-wrap gap-1.5">
                      {tool.related.map(r => (
                        <span key={r} className="text-[9px] font-mono text-cyan-400/80 bg-surface-950 px-2 py-0.5 rounded border border-white/5">{r}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-auto">
                <span className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">ReconShield Utility</span>
                <Link 
                  href={tool.route}
                  className="inline-flex items-center gap-1 text-xs font-mono text-cyan-400 hover:text-white transition-colors uppercase tracking-widest font-bold"
                >
                  <span>{tool.cta}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
