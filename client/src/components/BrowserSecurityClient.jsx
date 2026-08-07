'use client';

import { useState } from 'react';
import { Shield, Lock, Eye, Copy, Check, RefreshCw } from 'lucide-react';
import { SemanticToolLinks } from '@/components/SemanticLinks';

export default function BrowserSecurityClient() {
  const [hsts, setHsts] = useState(true);
  const [xframe, setXframe] = useState('DENY');
  const [nosniff, setNosniff] = useState(true);
  const [referrer, setReferrer] = useState('strict-origin-when-cross-origin');
  const [copied, setCopied] = useState(false);

  const getHeaders = () => {
    let headers = [];
    if (hsts) headers.push('Strict-Transport-Security: max-age=31536000; includeSubDomains; preload');
    if (xframe) headers.push(`X-Frame-Options: ${xframe}`);
    if (nosniff) headers.push('X-Content-Type-Options: nosniff');
    if (referrer) headers.push(`Referrer-Policy: ${referrer}`);
    headers.push("Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()");
    headers.push("Cross-Origin-Opener-Policy: same-origin");
    headers.push("Cross-Origin-Resource-Policy: same-origin");
    return headers.join('\n');
  };

  const output = getHeaders();

  const copyConfig = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-10 font-sans max-w-5xl mx-auto">
      <div className="p-8 bg-surface-900/90 border border-white/10 rounded-3xl shadow-2xl space-y-6">
        <h2 className="text-xs font-mono text-matrix-400 font-bold uppercase tracking-widest">// BROWSER SECURITY &amp; RESPONSE HEADERS HARDENING</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-mono text-xs">
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer text-gray-300">
              <input
                type="checkbox"
                checked={hsts}
                onChange={(e) => setHsts(e.target.checked)}
                className="rounded accent-matrix-400"
              />
              <span>Enable HSTS (Strict-Transport-Security 1 Year)</span>
            </label>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer text-gray-300">
              <input
                type="checkbox"
                checked={nosniff}
                onChange={(e) => setNosniff(e.target.checked)}
                className="rounded accent-matrix-400"
              />
              <span>Enable X-Content-Type-Options: nosniff</span>
            </label>
          </div>

          <div className="space-y-2">
            <label className="block text-gray-400 font-bold uppercase">X-Frame-Options (Clickjacking):</label>
            <select
              value={xframe}
              onChange={(e) => setXframe(e.target.value)}
              className="w-full p-3 bg-surface-950 border border-white/10 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-matrix-400"
            >
              <option value="DENY">DENY (Prohibit all framing)</option>
              <option value="SAMEORIGIN">SAMEORIGIN (Allow same origin framing)</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-gray-400 font-bold uppercase">Referrer-Policy:</label>
            <select
              value={referrer}
              onChange={(e) => setReferrer(e.target.value)}
              className="w-full p-3 bg-surface-950 border border-white/10 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-matrix-400"
            >
              <option value="strict-origin-when-cross-origin">strict-origin-when-cross-origin (Recommended)</option>
              <option value="no-referrer">no-referrer (Maximum Privacy)</option>
              <option value="same-origin">same-origin (Strict Same Origin)</option>
            </select>
          </div>
        </div>

        <div className="p-6 bg-black/60 border border-white/10 rounded-2xl space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 uppercase">Evaluated Hardened Browser Headers:</span>
            <button
              onClick={copyConfig}
              className="px-3 py-1 bg-surface-950 border border-white/10 text-matrix-400 hover:border-matrix-400 text-xs rounded-lg transition-all flex items-center gap-1"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Headers'}</span>
            </button>
          </div>
          <pre className="text-matrix-400 font-bold text-xs bg-surface-950 p-4 rounded-xl border border-white/5 overflow-x-auto whitespace-pre-wrap">
            {output}
          </pre>
        </div>
      </div>
      <SemanticToolLinks currentTool="http-headers" />
    </div>
  );
}
