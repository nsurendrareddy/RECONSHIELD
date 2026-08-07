'use client';

import { useState, useEffect } from 'react';
import { Shield, Lock, Eye, Copy, Check, RefreshCw, AlertTriangle, CheckCircle2, Monitor, Download, Server } from 'lucide-react';
import { SemanticToolLinks } from '@/components/SemanticLinks';

export default function BrowserSecurityClient() {
  const [activeMode, setActiveMode] = useState('builder'); // 'builder' or 'diagnostic'
  
  // Header Builder State
  const [hsts, setHsts] = useState(true);
  const [xframe, setXframe] = useState('DENY');
  const [nosniff, setNosniff] = useState(true);
  const [referrer, setReferrer] = useState('strict-origin-when-cross-origin');
  const [coop, setCoop] = useState('same-origin');
  const [coep, setCoep] = useState('require-corp');
  const [activeServerTab, setActiveServerTab] = useState('nginx');
  const [copied, setCopied] = useState(false);

  // Live Browser Inspection State
  const [browserInfo, setBrowserInfo] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isHttps = window.location.protocol === 'https:';
      const cookiesEnabled = navigator.cookieEnabled;
      let webglVendor = 'Disabled';

      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (gl) {
          const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
          if (debugInfo) {
            webglVendor = gl.getParameter(debugInfo.UNMASKED_RENDERER_STRING) || 'Generic WebGL';
          }
        }
      } catch (e) {
        webglVendor = 'Blocked/Disabled';
      }

      let score = 80;
      if (isHttps) score += 10;
      if (cookiesEnabled) score += 5;
      if ('serviceWorker' in navigator) score += 5;

      setBrowserInfo({
        userAgent: navigator.userAgent,
        isHttps,
        cookiesEnabled,
        webglVendor,
        localStorage: typeof localStorage !== 'undefined',
        score: Math.min(100, score)
      });
    }
  }, []);

  const generateHeaders = () => {
    const headers = [];
    if (hsts) headers.push('Strict-Transport-Security: max-age=31536000; includeSubDomains; preload');
    if (xframe) headers.push(`X-Frame-Options: ${xframe}`);
    if (nosniff) headers.push('X-Content-Type-Options: nosniff');
    if (referrer) headers.push(`Referrer-Policy: ${referrer}`);
    if (coop) headers.push(`Cross-Origin-Opener-Policy: ${coop}`);
    if (coep) headers.push(`Cross-Origin-Embedder-Policy: ${coep}`);
    headers.push('Cross-Origin-Resource-Policy: same-origin');
    headers.push('Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()');
    return headers.join('\n');
  };

  const headerText = generateHeaders();

  const getServerConfig = () => {
    if (activeServerTab === 'nginx') {
      return `# Nginx Response Headers Hardening\nadd_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;\nadd_header X-Frame-Options "${xframe}" always;\nadd_header X-Content-Type-Options "nosniff" always;\nadd_header Referrer-Policy "${referrer}" always;\nadd_header Cross-Origin-Opener-Policy "${coop}" always;`;
    } else if (activeServerTab === 'apache') {
      return `# Apache .htaccess Header Hardening\nHeader always set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"\nHeader always set X-Frame-Options "${xframe}"\nHeader always set X-Content-Type-Options "nosniff"\nHeader always set Referrer-Policy "${referrer}"`;
    } else if (activeServerTab === 'nextjs') {
      return `// next.config.mjs\nheaders: [{\n  source: '/(.*)',\n  headers: [\n    { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },\n    { key: 'X-Frame-Options', value: '${xframe}' },\n    { key: 'X-Content-Type-Options', value: 'nosniff' }\n  ]\n}]`;
    }
    return headerText;
  };

  const copyConfig = () => {
    navigator.clipboard.writeText(getServerConfig());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-10 font-sans max-w-5xl mx-auto">
      {/* Control Workspace */}
      <div className="p-8 bg-surface-900/90 border border-white/10 rounded-3xl shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <h2 className="text-xs font-mono text-matrix-400 font-bold uppercase tracking-widest">// BROWSER SECURITY &amp; RESPONSE HEADERS HARDENING</h2>
            <p className="text-gray-400 text-xs mt-1">Harden client browser isolation response headers or inspect active session attributes.</p>
          </div>

          <div className="flex gap-2 font-mono text-xs">
            <button
              type="button"
              onClick={() => setActiveMode('builder')}
              className={`px-4 py-2 rounded-xl font-bold uppercase transition-all cursor-pointer ${
                activeMode === 'builder' ? 'bg-matrix-400 text-black shadow-[0_0_12px_rgba(0,255,156,0.3)]' : 'bg-surface-950 text-gray-400 border border-white/5'
              }`}
            >
              Header Builder
            </button>
            <button
              type="button"
              onClick={() => setActiveMode('diagnostic')}
              className={`px-4 py-2 rounded-xl font-bold uppercase transition-all cursor-pointer ${
                activeMode === 'diagnostic' ? 'bg-matrix-400 text-black shadow-[0_0_12px_rgba(0,255,156,0.3)]' : 'bg-surface-950 text-gray-400 border border-white/5'
              }`}
            >
              Live Browser Inspector
            </button>
          </div>
        </div>

        {activeMode === 'builder' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-mono text-xs">
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer text-gray-200">
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
              <label className="flex items-center gap-2 cursor-pointer text-gray-200">
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
              <label htmlFor="xframe-select" className="block text-gray-400 font-bold uppercase">X-Frame-Options (Clickjacking):</label>
              <select
                id="xframe-select"
                value={xframe}
                onChange={(e) => setXframe(e.target.value)}
                className="w-full p-3 bg-surface-950 border border-white/10 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-matrix-400"
              >
                <option value="DENY">DENY (Prohibit all framing)</option>
                <option value="SAMEORIGIN">SAMEORIGIN (Allow same origin framing)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="referrer-select" className="block text-gray-400 font-bold uppercase">Referrer-Policy:</label>
              <select
                id="referrer-select"
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
        ) : (
          <div className="space-y-4 font-mono text-xs">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Active Client Browser Environment Diagnostics</h3>
            {browserInfo ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-surface-950 border border-white/10 rounded-2xl space-y-1">
                  <span className="text-gray-400 block text-[11px] uppercase">HTTPS Transport Status</span>
                  <span className={`font-bold block ${browserInfo.isHttps ? 'text-matrix-400' : 'text-amber-400'}`}>
                    {browserInfo.isHttps ? 'SECURE (HTTPS Enforced)' : 'INSECURE (Plain HTTP Session)'}
                  </span>
                </div>

                <div className="p-4 bg-surface-950 border border-white/10 rounded-2xl space-y-1">
                  <span className="text-gray-400 block text-[11px] uppercase">Cookie Storage Permission</span>
                  <span className="font-bold text-cyan-400 block">
                    {browserInfo.cookiesEnabled ? 'ENABLED' : 'DISABLED'}
                  </span>
                </div>

                <div className="p-4 bg-surface-950 border border-white/10 rounded-2xl space-y-1 sm:col-span-2">
                  <span className="text-gray-400 block text-[11px] uppercase">WebGL Hardware Fingerprint Unmasked Renderer</span>
                  <span className="font-bold text-matrix-400 block text-[11px] truncate">{browserInfo.webglVendor}</span>
                </div>
              </div>
            ) : (
              <p className="text-gray-400">Loading browser diagnostics...</p>
            )}
          </div>
        )}
      </div>

      {/* Output Console Box */}
      <div className="p-8 bg-surface-900 border border-white/10 rounded-3xl space-y-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-4 font-mono text-xs">
          <div className="flex gap-2">
            {['nginx', 'apache', 'nextjs'].map(server => (
              <button
                key={server}
                type="button"
                onClick={() => setActiveServerTab(server)}
                className={`px-3 py-1.5 rounded-lg uppercase font-bold transition-all cursor-pointer ${
                  activeServerTab === server ? 'bg-matrix-400 text-black' : 'bg-surface-950 text-gray-400 hover:text-white border border-white/5'
                }`}
              >
                {server}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={copyConfig}
            className="px-4 py-2 bg-matrix-400 hover:bg-matrix-300 text-black font-bold uppercase rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-[0_0_15px_rgba(0,255,156,0.3)]"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied' : 'Copy Headers'}</span>
          </button>
        </div>

        <pre className="text-matrix-400 font-bold text-xs bg-black/60 p-5 rounded-2xl border border-white/10 overflow-x-auto whitespace-pre-wrap leading-relaxed font-mono">
          {getServerConfig()}
        </pre>
      </div>

      <SemanticToolLinks currentTool="http-headers" />
    </div>
  );
}
