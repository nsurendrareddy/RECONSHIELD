'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, Terminal, Globe, ShieldAlert, Radio, Lock, FileText, ArrowRight } from 'lucide-react';
import { parseAndExecuteSearch } from '@/lib/searchEngine';

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const router = useRouter();

  // Listen for CTRL + K or CMD + K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Update search results on query change
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const searchResults = parseAndExecuteSearch(query);
    setResults(searchResults);
  }, [query]);

  const handleSelect = (url) => {
    setIsOpen(false);
    setQuery('');
    router.push(url);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4 bg-black/70 backdrop-blur-md transition-opacity">
      <div className="w-full max-w-2xl bg-surface-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col font-sans">
        {/* Input Header */}
        <div className="flex items-center px-4 border-b border-white/10 bg-surface-950/80">
          <Search className="w-5 h-5 text-matrix-400 shrink-0 mr-3" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search 100+ tools, ports (e.g. 3389), CVEs, IPs..."
            className="w-full py-4 bg-transparent text-white placeholder-gray-500 font-mono text-sm focus:outline-none"
          />
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-2 space-y-1 font-mono text-xs">
          {query.trim() === '' ? (
            <div className="p-6 text-center text-gray-500">
              <p className="mb-2">Type a query or enter a specific protocol handler:</p>
              <div className="flex flex-wrap justify-center gap-2 pt-2">
                <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-matrix-400">Port (e.g. 22)</span>
                <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-cyan-400">CVE (e.g. CVE-2026-40639)</span>
                <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-amber-400">IP (e.g. 8.8.8.8)</span>
                <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-purple-400">Tool Name</span>
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="p-6 text-center text-gray-400">
              No matching tools or handlers found for &quot;{query}&quot;
            </div>
          ) : (
            results.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(item.url)}
                className="w-full p-3 rounded-xl hover:bg-matrix-400/10 border border-transparent hover:border-matrix-400/30 flex items-center justify-between transition-all group text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-surface-950 flex items-center justify-center text-matrix-400 border border-white/5 group-hover:border-matrix-400/40">
                    <Search className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold group-hover:text-matrix-400 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-gray-400 text-[11px] font-sans leading-tight">
                      {item.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {item.badge && (
                    <span className="px-2 py-0.5 rounded text-[10px] bg-white/5 border border-white/10 text-gray-300">
                      {item.badge}
                    </span>
                  )}
                  <ArrowRight className="w-4 h-4 text-matrix-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </button>
            ))
          )}
        </div>

        {/* Footer Shortcut Bar */}
        <div className="px-4 py-2 bg-surface-950 border-t border-white/5 flex items-center justify-between text-[10px] text-gray-500 font-mono">
          <div className="flex items-center gap-3">
            <span><kbd className="px-1.5 py-0.5 bg-white/10 rounded text-gray-300">ESC</kbd> Close</span>
            <span><kbd className="px-1.5 py-0.5 bg-white/10 rounded text-gray-300">↵</kbd> Select</span>
          </div>
          <span>ReconShield Search v2.0</span>
        </div>
      </div>
    </div>
  );
}
