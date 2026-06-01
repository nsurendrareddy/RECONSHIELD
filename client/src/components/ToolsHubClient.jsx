'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Shield, ArrowUpRight, CheckCircle2, Cpu, Terminal, Sparkles, Filter, X } from 'lucide-react';
import { TOOLS, CATEGORIES, COLOR_MAP } from '@/utils/toolsData';

export default function ToolsHubClient() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // Pre-process categories to ensure human-friendly titles
  const formattedCategories = useMemo(() => {
    return CATEGORIES.map(cat => {
      if (cat === 'infrastructure visibility') return 'OSINT & Infrastructure';
      return cat;
    });
  }, []);

  const getOriginalCategoryName = (formattedName) => {
    if (formattedName === 'OSINT & Infrastructure') return 'infrastructure visibility';
    return formattedName;
  };

  const filteredTools = useMemo(() => {
    return TOOLS.filter((tool) => {
      const query = searchQuery.toLowerCase().trim();
      
      const matchesSearch = 
        !query ||
        tool.name.toLowerCase().includes(query) || 
        tool.desc.toLowerCase().includes(query) ||
        (tool.tags && tool.tags.some(tag => tag.toLowerCase().includes(query))) ||
        tool.category.toLowerCase().includes(query) ||
        (tool.keywords && tool.keywords.toLowerCase().includes(query));
      
      const targetCategory = getOriginalCategoryName(activeCategory);
      const matchesCategory = activeCategory === 'All' || tool.category === targetCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-24">
      {/* Search and Filters Controller */}
      <div className="bg-[#0b0e14]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-6 mb-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-matrix-500/5 blur-[80px] rounded-full pointer-events-none -z-10" />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          {/* Tool Search Bar */}
          <div className="lg:col-span-1 relative flex items-center bg-[#05080f] border border-white/10 rounded-2xl px-4 py-1 transition-all focus-within:border-matrix-400/50 focus-within:ring-1 focus-within:ring-matrix-400/50">
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
                className="absolute right-4 p-1 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="lg:col-span-2 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xs font-mono text-gray-500 uppercase tracking-widest pl-1">
              <Filter className="w-3.5 h-3.5 text-matrix-400" /> Filter by Category
            </div>
            <div className="flex overflow-x-auto pb-1 hide-scrollbar gap-2 max-w-full">
              {CATEGORIES.map((cat, idx) => {
                const displayLabel = formattedCategories[idx];
                const originalName = cat;
                const isSelected = activeCategory === originalName || (activeCategory === 'All' && originalName === 'All');
                
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(originalName)}
                    className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-mono transition-all border ${
                      isSelected
                        ? 'bg-matrix-400/10 text-matrix-400 border-matrix-400/30 font-bold shadow-[0_0_15px_rgba(0,255,136,0.05)]'
                        : 'bg-surface-900 text-gray-400 border-white/5 hover:bg-surface-800 hover:text-white'
                    }`}
                  >
                    {displayLabel.toUpperCase()}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Grid Results Header */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <Shield className="w-4 h-4 text-matrix-400" />
          <h2 className="text-xs font-mono font-bold text-white uppercase tracking-widest">
            {activeCategory === 'All' ? 'All Defense Modules' : activeCategory.toUpperCase()}
          </h2>
        </div>
        <div className="text-[11px] font-mono text-gray-500 bg-[#0d1117] border border-white/5 px-3 py-1 rounded-full uppercase tracking-wider">
          Showing <span className="text-matrix-400 font-bold">{filteredTools.length}</span> of <span className="text-gray-400 font-bold">{TOOLS.length}</span> Tools
        </div>
      </div>

      {/* Modern Responsive Tool Grid */}
      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => {
            const Icon = tool.icon;
            const c = COLOR_MAP[tool.color] || COLOR_MAP.green;
            const displayCat = tool.category === 'infrastructure visibility' ? 'OSINT & INFRASTRUCTURE' : tool.category.toUpperCase();
            
            return (
              <div
                key={tool.id}
                className="group flex flex-col justify-between p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-matrix-400/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl relative overflow-hidden"
              >
                {/* Visual Glow Effect on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-matrix-400/[0.02] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                
                <div>
                  {/* Top Row: Icon + Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center group-hover:scale-105 transition-transform`}>
                      <Icon className={`w-5 h-5 ${c.text}`} />
                    </div>
                    
                    <div className="flex gap-2 items-center">
                      {tool.popular && (
                        <span className="text-[8px] font-mono font-bold text-matrix-400 bg-matrix-400/10 border border-matrix-400/20 px-2 py-0.5 rounded uppercase tracking-wider">
                          POPULAR
                        </span>
                      )}
                      <span className="text-[8px] font-mono text-gray-500 bg-surface-950 border border-white/5 px-2 py-0.5 rounded tracking-wider">
                        {displayCat}
                      </span>
                    </div>
                  </div>

                  {/* Title & SEO Description */}
                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-matrix-400 transition-colors flex items-center gap-1.5">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed mb-6 line-clamp-3">
                    {tool.desc}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {tool.tags.map(tag => (
                      <span key={tag} className="text-[9px] font-mono text-gray-500 bg-surface-950 border border-white/5 px-2 py-0.5 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Row: Link Button */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-auto">
                  <span className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">Defensive utility</span>
                  
                  <Link 
                    href={`/tools/${tool.id}`} 
                    className="inline-flex items-center gap-1 text-xs font-mono text-matrix-400 hover:text-white transition-colors uppercase tracking-widest font-bold"
                  >
                    Launch Tool <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-20 text-center border border-white/5 rounded-3xl bg-surface-900 max-w-xl mx-auto shadow-xl">
          <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-gray-500">
            <X className="w-6 h-6" />
          </div>
          <h3 className="text-white font-bold mb-2">No tools matches search query</h3>
          <p className="text-gray-400 text-xs font-mono mb-6 px-6">
            We couldn't find any tools matching "{searchQuery}" in category "{activeCategory}".
          </p>
          <button 
            onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
            className="px-5 py-2.5 bg-matrix-400/10 border border-matrix-400/20 text-matrix-400 text-xs font-mono font-bold rounded-xl hover:bg-matrix-400/20 transition-all uppercase tracking-widest"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
