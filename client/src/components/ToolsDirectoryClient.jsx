'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { 
  Search, Star, Shield, Terminal, Globe, Lock, Mail, Server, Radio, 
  Cpu, ShieldAlert, ArrowRight, Zap, Filter, Tag, Check, Layers, ExternalLink 
} from 'lucide-react';
import { TOOLS_REGISTRY } from '@/registry/tools';
import { CATEGORIES } from '@/registry/categories';
import { COLLECTIONS } from '@/registry/collections';

export default function ToolsDirectoryClient() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [favorites, setFavorites] = useState([]);
  const [recents, setRecents] = useState([]);

  // Hydrate favorites and recents from localStorage
  useEffect(() => {
    try {
      const savedFavs = localStorage.getItem('reconshield_favorites');
      if (savedFavs) setFavorites(JSON.parse(savedFavs));

      const savedRecents = localStorage.getItem('reconshield_recents');
      if (savedRecents) setRecents(JSON.parse(savedRecents));
    } catch (e) {
      console.warn('LocalStorage unavailable:', e);
    }
  }, []);

  const toggleFavorite = (toolId) => {
    setFavorites(prev => {
      const next = prev.includes(toolId) ? prev.filter(id => id !== toolId) : [...prev, toolId];
      try {
        localStorage.setItem('reconshield_favorites', JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  const filteredTools = useMemo(() => {
    return TOOLS_REGISTRY.filter(tool => {
      const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory || tool.secondaryCategories?.includes(selectedCategory);
      const matchesQuery = searchQuery.trim() === '' || 
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="space-y-12 font-sans">
      {/* Search & Category Header Bar */}
      <div className="p-6 bg-surface-900/60 border border-white/10 rounded-2xl backdrop-blur-xl shadow-xl space-y-6">
        <div className="relative flex items-center">
          <Search className="w-5 h-5 text-matrix-400 absolute left-4 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search 100+ tools, tags (e.g. #osint, #ssl, #port)... Press 'CTRL + K' for instant search"
            className="w-full pl-12 pr-4 py-3.5 bg-surface-950/80 border border-white/10 rounded-xl text-white placeholder-gray-500 font-mono text-sm focus:outline-none focus:border-matrix-400/50 transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 text-xs font-mono text-gray-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pill Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/10">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all shrink-0 ${
              selectedCategory === 'all'
                ? 'bg-matrix-400 text-black shadow-[0_0_12px_rgba(0,255,156,0.4)]'
                : 'bg-surface-950/80 border border-white/10 text-gray-400 hover:text-white hover:border-white/20'
            }`}
          >
            All Tools ({TOOLS_REGISTRY.length})
          </button>
          {CATEGORIES.slice(0, 10).map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-medium transition-all shrink-0 flex items-center gap-2 ${
                selectedCategory === cat.id
                  ? 'bg-matrix-400 text-black font-bold shadow-[0_0_12px_rgba(0,255,156,0.4)]'
                  : 'bg-surface-950/80 border border-white/10 text-gray-400 hover:text-white hover:border-white/20'
              }`}
            >
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Curated Workflow Toolkits Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <span className="font-mono text-xs text-matrix-400 font-bold uppercase tracking-widest">// CURATED WORKFLOWS</span>
            <h2 className="text-2xl font-display font-bold text-white uppercase tracking-wide">Featured Toolkits</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COLLECTIONS.map((col) => (
            <div
              key={col.id}
              className="p-6 bg-surface-900 border border-white/10 rounded-2xl hover:border-matrix-400/30 transition-all flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-matrix-400 uppercase tracking-widest px-2.5 py-1 rounded bg-matrix-400/10 border border-matrix-400/20">
                    {col.toolIds.length} Tools Included
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white font-display group-hover:text-matrix-400 transition-colors uppercase">
                  {col.title}
                </h3>
                <p className="text-gray-400 text-xs leading-relaxed font-sans">
                  {col.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 mt-6 flex items-center justify-between text-xs font-mono text-matrix-400">
                <span>View Toolkit Pipeline</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Directory Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <div className="flex items-center gap-2 font-mono text-xs text-gray-400">
            <span>Showing <strong className="text-white">{filteredTools.length}</strong> cybersecurity tools</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => {
            const isFav = favorites.includes(tool.id);
            return (
              <div
                key={tool.id}
                className="group p-6 bg-surface-900 border border-white/10 rounded-2xl hover:border-matrix-400/40 transition-all flex flex-col justify-between relative overflow-hidden shadow-lg"
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded bg-white/5 border border-white/10 text-matrix-400">
                      {tool.category}
                    </span>
                    <button
                      onClick={() => toggleFavorite(tool.id)}
                      aria-label="Toggle favorite"
                      className={`p-1.5 rounded-lg border transition-all ${
                        isFav 
                          ? 'bg-amber-500/20 border-amber-500/40 text-amber-400' 
                          : 'bg-surface-950 border-white/10 text-gray-500 hover:text-amber-400 hover:border-amber-400/30'
                      }`}
                    >
                      <Star className="w-4 h-4 fill-current" />
                    </button>
                  </div>

                  <h3 className="text-white font-bold text-lg mb-2 font-display uppercase tracking-wide group-hover:text-matrix-400 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-gray-400 text-xs leading-relaxed mb-4 font-sans">
                    {tool.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {tool.tags.map((tag) => (
                      <span key={tag} className="text-[9px] font-mono text-gray-400 bg-surface-950 px-2 py-0.5 rounded border border-white/5">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 mt-6 flex items-center justify-between text-xs font-mono">
                  <span className="text-gray-500">{tool.estimatedTime}</span>
                  <Link
                    href={`/tools/${tool.slug}`}
                    className="text-matrix-400 font-bold uppercase hover:underline flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Launch Tool</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
