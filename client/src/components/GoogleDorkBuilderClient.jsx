'use client';

import { useState } from 'react';
import { Search, ExternalLink, Copy, Check, Filter, Sparkles, Database, ShieldAlert, FileText, Lock, Globe } from 'lucide-react';
import { SemanticToolLinks } from '@/components/SemanticLinks';

export default function GoogleDorkBuilderClient() {
  const [domain, setDomain] = useState('example.com');
  const [fileType, setFileType] = useState('');
  const [inUrl, setInUrl] = useState('');
  const [inTitle, setInTitle] = useState('');
  const [inText, setInText] = useState('');
  const [excludeTerm, setExcludeTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [copiedQuery, setCopiedQuery] = useState(false);

  // Pre-compiled Dork Library Matrix
  const dorkLibrary = [
    {
      category: 'credentials',
      title: 'Exposed Environment & Config Files',
      query: (d) => `site:${d} (filename:.env OR filename:config.php OR filename:wp-config.php OR filename:settings.py OR filename:database.yml)`,
      risk: 'Critical',
      desc: 'Discovers exposed configuration files containing database passwords, API keys, and secret tokens.'
    },
    {
      category: 'logins',
      title: 'Admin Portals & Login Interfaces',
      query: (d) => `site:${d} (inurl:admin OR inurl:login OR inurl:portal OR inurl:dashboard OR inurl:auth OR inurl:user/login)`,
      risk: 'High',
      desc: 'Finds administrative access panels and authentication gateways.'
    },
    {
      category: 'databases',
      title: 'Database Dumps & Backup Files',
      query: (d) => `site:${d} (ext:sql OR ext:dbf OR ext:mdb OR ext:bak OR ext:dump OR ext:tar OR ext:gz)`,
      risk: 'Critical',
      desc: 'Locates orphaned database dumps, SQL files, and unencrypted archive backups.'
    },
    {
      category: 'cloud',
      title: 'Exposed Cloud Storage Buckets (S3/Azure/GCP)',
      query: (d) => `site:s3.amazonaws.com "${d}" OR site:blob.core.windows.net "${d}" OR site:storage.googleapis.com "${d}"`,
      risk: 'High',
      desc: 'Queries public cloud storage buckets belonging to the target organization.'
    },
    {
      category: 'directories',
      title: 'Directory Listing & Server Indexes',
      query: (d) => `site:${d} intitle:"index of /" OR intitle:"parent directory"`,
      risk: 'Medium',
      desc: 'Detects web servers with directory browsing enabled, exposing internal file structures.'
    },
    {
      category: 'documents',
      title: 'Confidential PDF & Spreadsheet Documents',
      query: (d) => `site:${d} (ext:pdf OR ext:xlsx OR ext:docx) (confidential OR "for internal use" OR salary OR payroll)`,
      risk: 'High',
      desc: 'Searches for sensitive corporate PDFs, financial spreadsheets, and internal memos.'
    },
    {
      category: 'credentials',
      title: 'Exposed RSA Keys & SSH Credentials',
      query: (d) => `site:${d} (filename:id_rsa OR filename:id_dsa OR ext:pem OR ext:key OR ext:crt)`,
      risk: 'Critical',
      desc: 'Finds private cryptographic keys and SSH certificates.'
    },
    {
      category: 'logins',
      title: 'Exposed Apache / Nginx Log Files',
      query: (d) => `site:${d} (ext:log OR inurl:access.log OR inurl:error.log OR inurl:debug.log)`,
      risk: 'Medium',
      desc: 'Searches for server log files containing user IP addresses, request paths, and error tracebacks.'
    }
  ];

  // Build custom dork query string
  const buildCustomDork = () => {
    const cleanDomain = domain.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/.*$/, '') || 'example.com';
    const parts = [`site:${cleanDomain}`];

    if (fileType) parts.push(`ext:${fileType.trim()}`);
    if (inUrl) parts.push(`inurl:${inUrl.trim()}`);
    if (inTitle) parts.push(`intitle:"${inTitle.trim()}"`);
    if (inText) parts.push(`intext:"${inText.trim()}"`);
    if (excludeTerm) parts.push(`-${excludeTerm.trim()}`);

    return parts.join(' ');
  };

  const customDorkQuery = buildCustomDork();

  const launchGoogleSearch = (query) => {
    window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
  };

  const copyToClipboard = (text, index = null) => {
    navigator.clipboard.writeText(text);
    if (index !== null) {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } else {
      setCopiedQuery(true);
      setTimeout(() => setCopiedQuery(false), 2000);
    }
  };

  const cleanDomain = domain.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/.*$/, '') || 'example.com';
  const filteredLibrary = activeCategory === 'all' 
    ? dorkLibrary 
    : dorkLibrary.filter(item => item.category === activeCategory);

  return (
    <div className="space-y-10 font-sans max-w-5xl mx-auto">
      {/* Target Domain Input Container */}
      <div className="p-8 bg-surface-900/90 border border-white/10 rounded-3xl shadow-2xl backdrop-blur-xl space-y-6">
        <h2 className="text-xs font-mono text-matrix-400 font-bold uppercase tracking-widest">// TARGET DOMAIN &amp; CUSTOM SEARCH OPERATOR BUILDER</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
          <div className="space-y-1.5 sm:col-span-2">
            <label htmlFor="target-domain-input" className="block text-gray-300 font-bold uppercase">Target Domain Scope (site:):</label>
            <div className="relative">
              <Globe className="w-4 h-4 text-gray-500 absolute left-4 top-3.5 pointer-events-none" />
              <input
                id="target-domain-input"
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="example.com"
                className="w-full pl-11 pr-4 py-3 bg-surface-950 border border-white/10 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-matrix-400"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="file-type-select" className="block text-gray-400 font-bold uppercase">File Extension (ext:):</label>
            <select
              id="file-type-select"
              value={fileType}
              onChange={(e) => setFileType(e.target.value)}
              className="w-full p-3 bg-surface-950 border border-white/10 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-matrix-400"
            >
              <option value="">Any File Extension</option>
              <option value="pdf">PDF Documents (.pdf)</option>
              <option value="env">Environment Files (.env)</option>
              <option value="sql">Database Dumps (.sql)</option>
              <option value="log">Server Logs (.log)</option>
              <option value="bak">Backup Archives (.bak)</option>
              <option value="xlsx">Excel Spreadsheets (.xlsx)</option>
              <option value="docx">Word Documents (.docx)</option>
              <option value="json">JSON Datasets (.json)</option>
              <option value="xml">XML Feeds (.xml)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="inurl-input" className="block text-gray-400 font-bold uppercase">URL Keyword (inurl:):</label>
            <input
              id="inurl-input"
              type="text"
              value={inUrl}
              onChange={(e) => setInUrl(e.target.value)}
              placeholder="e.g. admin, login, api, dev"
              className="w-full p-3 bg-surface-950 border border-white/10 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-matrix-400"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="intitle-input" className="block text-gray-400 font-bold uppercase">Title String (intitle:):</label>
            <input
              id="intitle-input"
              type="text"
              value={inTitle}
              onChange={(e) => setInTitle(e.target.value)}
              placeholder="e.g. index of, dashboard, login"
              className="w-full p-3 bg-surface-950 border border-white/10 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-matrix-400"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="intext-input" className="block text-gray-400 font-bold uppercase">Body Text (intext:):</label>
            <input
              id="intext-input"
              type="text"
              value={inText}
              onChange={(e) => setInText(e.target.value)}
              placeholder="e.g. confidential, password, internal"
              className="w-full p-3 bg-surface-950 border border-white/10 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-matrix-400"
            />
          </div>
        </div>

        {/* Generated Custom Dork Preview */}
        <div className="p-5 bg-black/60 border border-white/10 rounded-2xl space-y-3 font-mono text-xs">
          <span className="text-gray-400 uppercase block">Active Custom Search Query:</span>
          <p className="text-matrix-400 font-bold text-sm bg-surface-950 p-4 rounded-xl border border-white/5 break-all">
            {customDorkQuery}
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => launchGoogleSearch(customDorkQuery)}
              className="px-6 py-2.5 bg-matrix-400 hover:bg-matrix-300 text-black font-bold uppercase rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-[0_0_15px_rgba(0,255,156,0.3)]"
            >
              <span>Launch Google Search</span>
              <ExternalLink className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => copyToClipboard(customDorkQuery)}
              className="px-5 py-2.5 bg-surface-950 border border-white/10 hover:border-matrix-400 text-gray-300 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
            >
              {copiedQuery ? <Check className="w-4 h-4 text-matrix-400" /> : <Copy className="w-4 h-4" />}
              <span>{copiedQuery ? 'Copied Query' : 'Copy Query'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Curated Dork Library */}
      <div className="p-8 bg-surface-900 border border-white/10 rounded-3xl space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <h3 className="text-lg font-bold font-display text-white uppercase tracking-wide">Curated OSINT Reconnaissance Library</h3>
            <p className="text-gray-400 text-xs font-mono">Pre-engineered search operators for target domain threat intelligence.</p>
          </div>

          {/* Filter Categories */}
          <div className="flex flex-wrap gap-2 font-mono text-xs">
            {['all', 'credentials', 'logins', 'databases', 'cloud', 'directories', 'documents'].map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg uppercase font-bold transition-all cursor-pointer ${
                  activeCategory === cat ? 'bg-matrix-400 text-black' : 'bg-surface-950 text-gray-400 border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Library Dork Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
          {filteredLibrary.map((item, idx) => {
            const compiledQuery = item.query(cleanDomain);
            return (
              <div key={idx} className="p-5 bg-surface-950 border border-white/10 rounded-2xl space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-xs">{item.title}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold border ${
                      item.risk === 'Critical' ? 'bg-red-500/10 border-red-500/30 text-red-400' :
                      item.risk === 'High' ? 'bg-amber-400/10 border-amber-400/30 text-amber-400' :
                      'bg-cyan-400/10 border-cyan-400/30 text-cyan-400'
                    }`}>
                      [{item.risk}]
                    </span>
                  </div>
                  <p className="text-gray-400 font-sans text-xs">{item.desc}</p>
                  <p className="text-matrix-400 bg-black/60 p-3 rounded-xl border border-white/5 break-all text-[11px]">
                    {compiledQuery}
                  </p>
                </div>

                <div className="flex gap-2 pt-2 border-t border-white/5">
                  <button
                    type="button"
                    onClick={() => launchGoogleSearch(compiledQuery)}
                    className="flex-1 py-2 bg-matrix-400/10 hover:bg-matrix-400/20 text-matrix-400 border border-matrix-400/30 rounded-xl font-bold uppercase text-[11px] transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>Run Query</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(compiledQuery, idx)}
                    className="px-3 py-2 bg-surface-900 hover:bg-surface-800 text-gray-300 border border-white/10 rounded-xl transition-colors cursor-pointer"
                  >
                    {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-matrix-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <SemanticToolLinks currentTool="subdomain-finder" />
    </div>
  );
}
