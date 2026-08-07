'use client';

import { useState } from 'react';
import { Shield, ShieldAlert, Check, Copy, RefreshCw, Code, CheckCircle2, AlertTriangle, Layers } from 'lucide-react';
import { SemanticToolLinks } from '@/components/SemanticLinks';

export default function CspEvaluatorClient() {
  const [defaultSrc, setDefaultSrc] = useState("'self'");
  const [scriptSrc, setScriptSrc] = useState("'self' 'unsafe-inline' https://www.googletagmanager.com");
  const [styleSrc, setStyleSrc] = useState("'self' 'unsafe-inline' https://fonts.googleapis.com");
  const [imgSrc, setImgSrc] = useState("'self' data: https:");
  const [copied, setCopied] = useState(false);
  const [activeServerTab, setActiveServerTab] = useState('nginx');

  const generatedCsp = `default-src ${defaultSrc}; script-src ${scriptSrc}; style-src ${styleSrc}; img-src ${imgSrc}; object-src 'none'; frame-ancestors 'self';`;

  const isUnsafeInline = scriptSrc.includes("'unsafe-inline'");
  const isUnsafeEval = scriptSrc.includes("'unsafe-eval'");
  const hasObjectSrc = generatedCsp.includes("object-src 'none'");

  const copyConfig = () => {
    let output = generatedCsp;
    if (activeServerTab === 'nginx') {
      output = `add_header Content-Security-Policy "${generatedCsp}" always;`;
    } else if (activeServerTab === 'apache') {
      output = `Header set Content-Security-Policy "${generatedCsp}"`;
    } else if (activeServerTab === 'nextjs') {
      output = `// next.config.mjs\nconst cspHeader = "${generatedCsp}";\nheaders: [{ key: 'Content-Security-Policy', value: cspHeader }]`;
    }
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-10 font-sans max-w-5xl mx-auto">
      {/* Workspace Controls */}
      <div className="p-8 bg-surface-900/90 border border-white/10 rounded-3xl shadow-2xl backdrop-blur-xl space-y-6">
        <h2 className="text-xs font-mono text-matrix-400 font-bold uppercase tracking-widest">// CSP LEVEL 3 DIRECTIVE BUILDER</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-mono text-xs">
          <div className="space-y-2">
            <label className="block text-gray-400 font-bold uppercase">default-src Directive:</label>
            <input
              type="text"
              value={defaultSrc}
              onChange={(e) => setDefaultSrc(e.target.value)}
              className="w-full p-3 bg-surface-950 border border-white/10 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-matrix-400"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-400 font-bold uppercase">script-src Directive (XSS Vectors):</label>
            <input
              type="text"
              value={scriptSrc}
              onChange={(e) => setScriptSrc(e.target.value)}
              className="w-full p-3 bg-surface-950 border border-white/10 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-matrix-400"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-400 font-bold uppercase">style-src Directive:</label>
            <input
              type="text"
              value={styleSrc}
              onChange={(e) => setStyleSrc(e.target.value)}
              className="w-full p-3 bg-surface-950 border border-white/10 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-matrix-400"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-400 font-bold uppercase">img-src Directive:</label>
            <input
              type="text"
              value={imgSrc}
              onChange={(e) => setImgSrc(e.target.value)}
              className="w-full p-3 bg-surface-950 border border-white/10 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-matrix-400"
            />
          </div>
        </div>
      </div>

      {/* Generated Header & Server Snippet Export */}
      <div className="p-8 bg-surface-900 border border-white/10 rounded-3xl space-y-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <h3 className="text-lg font-bold font-display text-white uppercase tracking-wide">Evaluated CSP Header &amp; Risk Grade</h3>
          <button
            onClick={copyConfig}
            className="px-4 py-2 bg-matrix-400 hover:bg-matrix-300 text-black font-mono font-bold text-xs uppercase rounded-xl transition-all flex items-center gap-1.5"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied Snippet' : 'Copy Server Config'}</span>
          </button>
        </div>

        {/* Real-time XSS Risk Alerts */}
        <div className="space-y-3 font-mono text-xs">
          {isUnsafeInline && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>HIGH RISK: &apos;unsafe-inline&apos; in script-src allows inline XSS injection payloads. Use nonces or hashes.</span>
            </div>
          )}
          {hasObjectSrc && (
            <div className="p-4 bg-matrix-400/10 border border-matrix-400/20 text-matrix-400 rounded-2xl flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>SECURE: object-src &apos;none&apos; prevents Flash and plugin execution vulnerabilities.</span>
            </div>
          )}
        </div>

        {/* Code Snippet Box */}
        <div className="space-y-3 font-mono text-xs">
          <div className="flex gap-2 border-b border-white/5 pb-2">
            {['nginx', 'apache', 'nextjs'].map(server => (
              <button
                key={server}
                onClick={() => setActiveServerTab(server)}
                className={`px-3 py-1.5 rounded-lg uppercase font-bold transition-all ${
                  activeServerTab === server ? 'bg-matrix-400 text-black' : 'bg-surface-950 text-gray-400 hover:text-white'
                }`}
              >
                {server}
              </button>
            ))}
          </div>

          <pre className="p-4 bg-black/60 border border-white/10 rounded-2xl text-matrix-400 overflow-x-auto font-mono text-xs leading-relaxed">
            {activeServerTab === 'nginx' && `add_header Content-Security-Policy "${generatedCsp}" always;`}
            {activeServerTab === 'apache' && `Header set Content-Security-Policy "${generatedCsp}"`}
            {activeServerTab === 'nextjs' && `// next.config.mjs\nconst cspHeader = "${generatedCsp}";`}
          </pre>
        </div>
      </div>

      <SemanticToolLinks currentTool="http-headers" />
    </div>
  );
}
