'use client';

import { useState } from 'react';
import { Search, ExternalLink, Copy, Check } from 'lucide-react';
import { SemanticToolLinks } from '@/components/SemanticLinks';

export default function GoogleDorkBuilderClient() {
  const [domain, setDomain] = useState('');
  const [category, setCategory] = useState('files');
  const [copied, setCopied] = useState(false);

  const getDorkQuery = () => {
    const d = domain.trim() || 'example.com';
    switch (category) {
      case 'files': return `site:${d} ext:pdf OR ext:doc OR ext:xls OR ext:docx OR ext:xlsx`;
      case 'logins': return `site:${d} inurl:login OR inurl:admin OR inurl:portal OR inurl:dashboard`;
      case 'dbs': return `site:${d} ext:sql OR ext:dbf OR ext:mdb OR ext:bak`;
      case 'env': return `site:${d} filename:.env OR filename:config.php OR filename:wp-config.php`;
      default: return `site:${d}`;
    }
  };

  const currentDork = getDorkQuery();

  const launchSearch = () => {
    window.open(`https://www.google.com/search?q=${encodeURIComponent(currentDork)}`, '_blank');
  };

  const copyDork = () => {
    navigator.clipboard.writeText(currentDork);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-10 font-sans max-w-5xl mx-auto">
      <div className="p-8 bg-surface-900/90 border border-white/10 rounded-3xl shadow-2xl space-y-6">
        <div className="space-y-4">
          <label className="block text-xs font-mono text-matrix-400 font-bold uppercase tracking-widest">
            Enter Target Domain Scope:
          </label>
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="targetdomain.com"
            className="w-full p-4 bg-surface-950 border border-white/10 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-matrix-400"
          />
        </div>

        <div className="flex flex-wrap gap-2 pt-2 font-mono text-xs">
          {[
            { id: 'files', label: 'Exposed Documents (PDF/XLS)' },
            { id: 'logins', label: 'Admin Portals & Logins' },
            { id: 'dbs', label: 'Database Backups (.SQL)' },
            { id: 'env', label: 'Configuration Files (.ENV)' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`px-4 py-2 rounded-xl uppercase font-bold transition-all ${
                category === cat.id ? 'bg-matrix-400 text-black' : 'bg-surface-950 text-gray-400 border border-white/5 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="p-6 bg-black/60 border border-white/10 rounded-2xl space-y-4 font-mono text-xs">
          <span className="text-gray-400 uppercase block">Generated Google Dork Search Operator:</span>
          <p className="text-matrix-400 font-bold text-sm bg-surface-950 p-4 rounded-xl border border-white/5 break-all">
            {currentDork}
          </p>
          <div className="flex gap-3">
            <button
              onClick={launchSearch}
              className="px-5 py-2.5 bg-matrix-400 hover:bg-matrix-300 text-black font-bold uppercase rounded-xl transition-all flex items-center gap-1.5"
            >
              <span>Launch Dork Query</span>
              <ExternalLink className="w-4 h-4" />
            </button>
            <button
              onClick={copyDork}
              className="px-5 py-2.5 bg-surface-950 border border-white/10 hover:border-matrix-400 text-gray-300 rounded-xl transition-all flex items-center gap-1.5"
            >
              {copied ? <Check className="w-4 h-4 text-matrix-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied' : 'Copy Query'}</span>
            </button>
          </div>
        </div>
      </div>
      <SemanticToolLinks currentTool="subdomain-finder" />
    </div>
  );
}
