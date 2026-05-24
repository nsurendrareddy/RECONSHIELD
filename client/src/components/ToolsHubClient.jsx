'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, ChevronRight, ArrowRight, Shield } from 'lucide-react';
import { TOOLS, CATEGORIES, COLOR_MAP } from '@/utils/toolsData';

export default function ToolsHubClient() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredTools = TOOLS.filter((tool) => {
    const matchesSearch = 
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      tool.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.keywords.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory === 'All' || tool.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
      {/* Search and Filter Controls */}
      <div className="flex flex-col lg:flex-row gap-6 mb-12">
        {/* Search Bar */}
        <div className="relative flex-1">
          <div className="absolute top-1/2 -translate-y-1/2 left-4 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-gray-500" />
          </div>
          <input
            type="text"
            className="w-full bg-[#0d1117] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#00ff88]/50 focus:ring-1 focus:ring-[#00ff88]/50 transition-all font-mono placeholder:font-sans placeholder:text-gray-500"
            placeholder="Search tools, IPs, DNS, vulnerabilities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Category Tabs (Scrollable on mobile) */}
        <div className="flex overflow-x-auto pb-2 -mx-4 px-4 lg:mx-0 lg:px-0 lg:pb-0 hide-scrollbar gap-2 lg:flex-wrap lg:max-w-xl shrink-0">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-mono transition-all border ${
                activeCategory === cat
                  ? 'bg-[#00ff88]/10 text-[#00ff88] border-[#00ff88]/20 font-bold'
                  : 'bg-white/[0.02] text-gray-400 border-white/5 hover:bg-white/[0.05] hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Results */}
      <div className="flex items-center gap-3 mb-8">
        <Shield className="w-4 h-4 text-[#00ff88]" />
        <h2 className="text-sm font-mono font-bold text-[#00ff88] uppercase tracking-widest">
          {activeCategory === 'All' ? 'All Security Tools' : activeCategory}
        </h2>
        <div className="h-px flex-1 bg-white/5" />
        <span className="text-xs font-mono text-gray-600">{filteredTools.length} tools</span>
      </div>

      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTools.map((tool) => {
            const Icon = tool.icon;
            const c = COLOR_MAP[tool.color];
            return (
              <Link
                key={tool.id}
                href={`/tools/${tool.id}`}
                className={`group flex gap-4 p-5 rounded-xl bg-[#0d1117] border border-white/[0.06] ${c.hover} transition-all duration-300 hover:bg-[#0d1117]/80 hover:-translate-y-0.5 hover:shadow-lg`}
              >
                <div className={`w-12 h-12 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center shrink-0`}>
                  <Icon className={`w-6 h-6 ${c.text}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-white font-semibold text-sm">{tool.name}</h3>
                    {tool.popular && (
                      <span className="text-[9px] font-mono font-bold text-[#00ff88] bg-[#00ff88]/10 border border-[#00ff88]/20 px-1.5 py-0.5 rounded-full uppercase">
                        Popular
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed mb-3 line-clamp-2">{tool.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {tool.tags.slice(0, 3).map(tag => (
                      <span key={tag} className={`text-[10px] font-mono ${c.text} ${c.bg} border ${c.border} px-2 py-0.5 rounded`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="py-16 text-center border border-white/5 rounded-2xl bg-[#0d1117]">
          <p className="text-gray-400 font-mono mb-2">No tools found matching "{searchQuery}"</p>
          <button 
            onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
            className="text-[#00ff88] text-sm font-semibold hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
