'use client';

import { useState } from 'react';
import { Shield, ShieldAlert, Check, Copy, RefreshCw, Code, CheckCircle2, AlertTriangle, Layers, Download, Sparkles, Sliders, FileText } from 'lucide-react';
import { SemanticToolLinks } from '@/components/SemanticLinks';

export default function CspEvaluatorClient() {
  const [mode, setMode] = useState('builder'); // 'builder' or 'evaluator'
  
  // Builder state
  const [defaultSrc, setDefaultSrc] = useState("'self'");
  const [scriptSrc, setScriptSrc] = useState("'self' 'unsafe-inline' https://www.googletagmanager.com");
  const [styleSrc, setStyleSrc] = useState("'self' 'unsafe-inline' https://fonts.googleapis.com");
  const [imgSrc, setImgSrc] = useState("'self' data: https:");
  const [connectSrc, setConnectSrc] = useState("'self' https://api.example.com");
  const [fontSrc, setFontSrc] = useState("'self' https://fonts.gstatic.com");
  const [frameSrc, setFrameSrc] = useState("'self' https://www.youtube.com");
  const [objectSrc, setObjectSrc] = useState("'none'");
  const [baseUri, setBaseUri] = useState("'self'");
  const [frameAncestors, setFrameAncestors] = useState("'self'");
  const [upgradeInsecure, setUpgradeInsecure] = useState(true);
  const [reportUri, setReportUri] = useState('https://csp-report.example.com/r/default');

  // Raw CSP Evaluator state
  const [rawCspInput, setRawCspInput] = useState("default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://code.jquery.com; style-src 'self' 'unsafe-inline'; object-src *;");
  
  const [copied, setCopied] = useState(false);
  const [activeServerTab, setActiveServerTab] = useState('nginx');
  const [activePreset, setActivePreset] = useState('custom');

  // Presets
  const applyPreset = (presetKey) => {
    setActivePreset(presetKey);
    if (presetKey === 'strict') {
      setDefaultSrc("'self'");
      setScriptSrc("'self'");
      setStyleSrc("'self'");
      setImgSrc("'self'");
      setConnectSrc("'self'");
      setFontSrc("'self'");
      setFrameSrc("'none'");
      setObjectSrc("'none'");
      setBaseUri("'self'");
      setFrameAncestors("'none'");
      setUpgradeInsecure(true);
    } else if (presetKey === 'gtm') {
      setDefaultSrc("'self'");
      setScriptSrc("'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com");
      setStyleSrc("'self' 'unsafe-inline' https://fonts.googleapis.com");
      setImgSrc("'self' data: https://www.google-analytics.com");
      setConnectSrc("'self' https://www.google-analytics.com https://stats.g.doubleclick.net");
      setFontSrc("'self' https://fonts.gstatic.com");
      setFrameSrc("'self'");
      setObjectSrc("'none'");
      setBaseUri("'self'");
      setFrameAncestors("'self'");
      setUpgradeInsecure(true);
    } else if (presetKey === 'wordpress') {
      setDefaultSrc("'self'");
      setScriptSrc("'self' 'unsafe-inline' 'unsafe-eval' https://s.w.org");
      setStyleSrc("'self' 'unsafe-inline' https://fonts.googleapis.com");
      setImgSrc("'self' data: https:");
      setConnectSrc("'self'");
      setFontSrc("'self' https://fonts.gstatic.com");
      setFrameSrc("'self'");
      setObjectSrc("'none'");
      setBaseUri("'self'");
      setFrameAncestors("'self'");
      setUpgradeInsecure(true);
    }
  };

  // Construct generated CSP string
  const buildCspString = () => {
    const parts = [];
    if (defaultSrc.trim()) parts.push(`default-src ${defaultSrc.trim()}`);
    if (scriptSrc.trim()) parts.push(`script-src ${scriptSrc.trim()}`);
    if (styleSrc.trim()) parts.push(`style-src ${styleSrc.trim()}`);
    if (imgSrc.trim()) parts.push(`img-src ${imgSrc.trim()}`);
    if (connectSrc.trim()) parts.push(`connect-src ${connectSrc.trim()}`);
    if (fontSrc.trim()) parts.push(`font-src ${fontSrc.trim()}`);
    if (frameSrc.trim()) parts.push(`frame-src ${frameSrc.trim()}`);
    if (objectSrc.trim()) parts.push(`object-src ${objectSrc.trim()}`);
    if (baseUri.trim()) parts.push(`base-uri ${baseUri.trim()}`);
    if (frameAncestors.trim()) parts.push(`frame-ancestors ${frameAncestors.trim()}`);
    if (upgradeInsecure) parts.push(`upgrade-insecure-requests`);
    if (reportUri.trim()) parts.push(`report-uri ${reportUri.trim()}`);
    return parts.join('; ');
  };

  const activeCspText = mode === 'builder' ? buildCspString() : rawCspInput;

  // Real CSP Security Evaluator Engine
  const evaluateCspSecurity = (cspText) => {
    const findings = [];
    let score = 100;

    const directives = {};
    cspText.split(';').forEach(part => {
      const trimmed = part.trim();
      if (!trimmed) return;
      const tokens = trimmed.split(/\s+/);
      const dirName = tokens[0].toLowerCase();
      const dirValues = tokens.slice(1);
      directives[dirName] = dirValues;
    });

    const scriptValues = directives['script-src'] || directives['default-src'] || [];
    const styleValues = directives['style-src'] || directives['default-src'] || [];
    const objectValues = directives['object-src'] || directives['default-src'] || [];
    const baseUriValues = directives['base-uri'] || [];

    // Check script-src unsafe-inline
    if (scriptValues.includes("'unsafe-inline'")) {
      score -= 30;
      findings.push({
        severity: 'Critical',
        title: "'unsafe-inline' in script-src Directive",
        desc: "Allows execution of arbitrary inline <script> tags and inline event handlers (e.g. onload=), rendering the site vulnerable to XSS attacks.",
        remediation: "Remove 'unsafe-inline' and utilize cryptographic nonces (nonce-...) or SHA-256 hashes for legitimate inline scripts."
      });
    }

    // Check script-src unsafe-eval
    if (scriptValues.includes("'unsafe-eval'")) {
      score -= 20;
      findings.push({
        severity: 'High',
        title: "'unsafe-eval' in script-src Directive",
        desc: "Allows execution of code string evaluation functions like eval(), setTimeout('code'), and Function('code').",
        remediation: "Refactor dynamic JavaScript execution to avoid eval() or String-based timers."
      });
    }

    // Check script-src wildcards
    if (scriptValues.includes('*') || scriptValues.includes('https:') || scriptValues.includes('http:')) {
      score -= 25;
      findings.push({
        severity: 'High',
        title: "Overly Permissive Scheme/Wildcard in script-src",
        desc: "Using '*' or broad scheme specifiers (https:) permits loading scripts from ANY external domain on the internet.",
        remediation: "Restrict script sources to explicit trusted domain hostnames."
      });
    }

    // Check object-src
    if (!objectValues.includes("'none'")) {
      score -= 15;
      findings.push({
        severity: 'Medium',
        title: "Missing object-src 'none'",
        desc: "Plugins such as Flash or Java applets can bypass script-src restrictions. Setting object-src 'none' blocks legacy browser plugin execution.",
        remediation: "Add 'object-src 'none';' to your Content-Security-Policy."
      });
    }

    // Check base-uri
    if (baseUriValues.length === 0) {
      score -= 10;
      findings.push({
        severity: 'Medium',
        title: "Missing base-uri Directive",
        desc: "Without base-uri restrictions, attackers can inject <base href='https://attacker.com'> tags to hijack relative script and asset loads.",
        remediation: "Add 'base-uri 'self';' or 'base-uri 'none';' to your policy."
      });
    }

    // Check style-src unsafe-inline
    if (styleValues.includes("'unsafe-inline'")) {
      score -= 5;
      findings.push({
        severity: 'Low',
        title: "'unsafe-inline' in style-src Directive",
        desc: "Allows inline <style> tags and style attributes. While less severe than script XSS, CSS exfiltration vectors remain possible.",
        remediation: "Move inline styles to external stylesheets or use nonces."
      });
    }

    // Positive security attributes check
    if (cspText.includes('upgrade-insecure-requests')) score += 5;
    if (cspText.includes("frame-ancestors 'none'") || cspText.includes("frame-ancestors 'self'")) score += 5;

    const finalScore = Math.max(0, Math.min(100, score));
    let grade = 'F';
    if (finalScore >= 90) grade = 'A+';
    else if (finalScore >= 80) grade = 'A';
    else if (finalScore >= 70) grade = 'B';
    else if (finalScore >= 50) grade = 'C';

    return { score: finalScore, grade, findings };
  };

  const evaluation = evaluateCspSecurity(activeCspText);

  // Generate Server Configurations
  const getServerConfig = () => {
    const csp = activeCspText;
    switch (activeServerTab) {
      case 'nginx':
        return `# Nginx Configuration\nadd_header Content-Security-Policy "${csp}" always;`;
      case 'apache':
        return `# Apache .htaccess / httpd.conf\nHeader set Content-Security-Policy "${csp}"`;
      case 'nextjs':
        return `// next.config.mjs\nconst cspHeader = \`${csp}\`;\n\nexport default {\n  async headers() {\n    return [{\n      source: '/(.*)',\n      headers: [{ key: 'Content-Security-Policy', value: cspHeader }]\n    }];\n  }\n};`;
      case 'express':
        return `// Node.js Express Middleware\napp.use((req, res, next) => {\n  res.setHeader("Content-Security-Policy", "${csp}");\n  next();\n});`;
      case 'cloudflare':
        return `// Cloudflare Worker Header Injection\naddEventListener('fetch', event => {\n  event.respondWith(handleRequest(event.request));\n});\n\nasync function handleRequest(request) {\n  const response = await fetch(request);\n  const newHeaders = new Headers(response.headers);\n  newHeaders.set('Content-Security-Policy', "${csp}");\n  return new Response(response.body, { ...response, headers: newHeaders });\n}`;
      default:
        return csp;
    }
  };

  const copySnippet = () => {
    navigator.clipboard.writeText(getServerConfig());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadConfig = () => {
    const element = document.createElement('a');
    const file = new Blob([getServerConfig()], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `csp-policy-${activeServerTab}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-10 font-sans max-w-5xl mx-auto">
      {/* Mode Selection Header */}
      <div className="p-8 bg-surface-900/90 border border-white/10 rounded-3xl shadow-2xl backdrop-blur-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <h2 className="text-xs font-mono text-matrix-400 font-bold uppercase tracking-widest">// CSP LEVEL 3 VISUAL BUILDER &amp; REAL-TIME SECURITY AUDITOR</h2>
            <p className="text-gray-400 text-xs mt-1">Design hardened Content Security Policies or paste raw headers to evaluate XSS vulnerabilities.</p>
          </div>

          <div className="flex gap-2 font-mono text-xs">
            <button
              type="button"
              onClick={() => setMode('builder')}
              className={`px-4 py-2 rounded-xl font-bold uppercase transition-all cursor-pointer ${
                mode === 'builder' ? 'bg-matrix-400 text-black shadow-[0_0_12px_rgba(0,255,156,0.3)]' : 'bg-surface-950 text-gray-400 border border-white/5'
              }`}
            >
              Visual Builder
            </button>
            <button
              type="button"
              onClick={() => setMode('evaluator')}
              className={`px-4 py-2 rounded-xl font-bold uppercase transition-all cursor-pointer ${
                mode === 'evaluator' ? 'bg-matrix-400 text-black shadow-[0_0_12px_rgba(0,255,156,0.3)]' : 'bg-surface-950 text-gray-400 border border-white/5'
              }`}
            >
              Raw CSP Auditor
            </button>
          </div>
        </div>

        {mode === 'builder' ? (
          <div className="space-y-6">
            {/* Quick Presets */}
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              <span className="text-gray-400 font-bold uppercase mr-1">Security Presets:</span>
              {[
                { id: 'strict', label: 'Strict Security (A+ Grade)' },
                { id: 'gtm', label: 'Google Analytics & GTM' },
                { id: 'wordpress', label: 'WordPress / CMS Standard' }
              ].map(preset => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => applyPreset(preset.id)}
                  className={`px-3 py-1.5 rounded-lg border font-mono text-xs transition-colors cursor-pointer ${
                    activePreset === preset.id
                      ? 'bg-matrix-400/10 border-matrix-400 text-matrix-400 font-bold'
                      : 'bg-surface-950 border-white/10 text-gray-400 hover:text-white'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>

            {/* Directive Controls Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
              <div className="space-y-1.5">
                <label className="block text-gray-300 font-bold uppercase">default-src (Fallback):</label>
                <input
                  type="text"
                  value={defaultSrc}
                  onChange={(e) => { setDefaultSrc(e.target.value); setActivePreset('custom'); }}
                  className="w-full p-3 bg-surface-950 border border-white/10 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-matrix-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-matrix-400 font-bold uppercase">script-src (XSS Target):</label>
                <input
                  type="text"
                  value={scriptSrc}
                  onChange={(e) => { setScriptSrc(e.target.value); setActivePreset('custom'); }}
                  className="w-full p-3 bg-surface-950 border border-white/10 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-matrix-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-gray-300 font-bold uppercase">style-src:</label>
                <input
                  type="text"
                  value={styleSrc}
                  onChange={(e) => { setStyleSrc(e.target.value); setActivePreset('custom'); }}
                  className="w-full p-3 bg-surface-950 border border-white/10 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-matrix-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-gray-300 font-bold uppercase">img-src:</label>
                <input
                  type="text"
                  value={imgSrc}
                  onChange={(e) => { setImgSrc(e.target.value); setActivePreset('custom'); }}
                  className="w-full p-3 bg-surface-950 border border-white/10 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-matrix-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-gray-300 font-bold uppercase">connect-src (API/Fetch):</label>
                <input
                  type="text"
                  value={connectSrc}
                  onChange={(e) => { setConnectSrc(e.target.value); setActivePreset('custom'); }}
                  className="w-full p-3 bg-surface-950 border border-white/10 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-matrix-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-gray-300 font-bold uppercase">font-src:</label>
                <input
                  type="text"
                  value={fontSrc}
                  onChange={(e) => { setFontSrc(e.target.value); setActivePreset('custom'); }}
                  className="w-full p-3 bg-surface-950 border border-white/10 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-matrix-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-gray-300 font-bold uppercase">object-src (Plugins):</label>
                <input
                  type="text"
                  value={objectSrc}
                  onChange={(e) => { setObjectSrc(e.target.value); setActivePreset('custom'); }}
                  className="w-full p-3 bg-surface-950 border border-white/10 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-matrix-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-gray-300 font-bold uppercase">base-uri (Relative URLs):</label>
                <input
                  type="text"
                  value={baseUri}
                  onChange={(e) => { setBaseUri(e.target.value); setActivePreset('custom'); }}
                  className="w-full p-3 bg-surface-950 border border-white/10 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-matrix-400"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3 font-mono text-xs">
            <label className="block text-matrix-400 font-bold uppercase">Paste Existing Raw Content-Security-Policy Header:</label>
            <textarea
              value={rawCspInput}
              onChange={(e) => setRawCspInput(e.target.value)}
              rows={5}
              placeholder="default-src 'self'; script-src 'self' https://example.com; ..."
              className="w-full p-4 bg-surface-950 border border-white/10 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-matrix-400"
            />
          </div>
        )}
      </div>

      {/* Audit Evaluation & Code Output */}
      <div className="p-8 bg-surface-900 border border-white/10 rounded-3xl space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <span className="text-xs font-mono text-gray-400 uppercase block">Security Audit Score</span>
            <div className="flex items-center gap-3">
              <span className={`text-3xl font-bold font-display ${evaluation.score >= 80 ? 'text-matrix-400' : evaluation.score >= 50 ? 'text-amber-400' : 'text-red-500'}`}>
                {evaluation.score} / 100
              </span>
              <span className={`px-3 py-1 rounded-lg font-mono text-xs font-bold border ${evaluation.grade === 'A+' || evaluation.grade === 'A' ? 'bg-matrix-400/10 border-matrix-400/30 text-matrix-400' : 'bg-red-500/10 border-red-500/30 text-red-400'}`}>
                GRADE {evaluation.grade}
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={copySnippet}
              className="px-4 py-2.5 bg-matrix-400 hover:bg-matrix-300 text-black font-mono font-bold text-xs uppercase rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-[0_0_15px_rgba(0,255,156,0.3)]"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied' : 'Copy Server Snippet'}</span>
            </button>
            <button
              type="button"
              onClick={downloadConfig}
              className="px-4 py-2.5 bg-surface-950 border border-white/10 hover:border-matrix-400 text-gray-300 font-mono font-bold text-xs uppercase rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-4 h-4 text-matrix-400" />
              <span>Download</span>
            </button>
          </div>
        </div>

        {/* Audit Risk Findings */}
        <div className="space-y-3 font-mono text-xs">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">Identified Security Risks &amp; Weaknesses ({evaluation.findings.length})</h3>
          {evaluation.findings.length === 0 ? (
            <div className="p-4 bg-matrix-400/10 border border-matrix-400/20 text-matrix-400 rounded-2xl flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Excellent! Your Content Security Policy follows strict XSS hardening guidelines.</span>
            </div>
          ) : (
            evaluation.findings.map((item, idx) => (
              <div key={idx} className="p-4 bg-surface-950 border border-white/10 rounded-2xl space-y-1.5">
                <div className="flex items-center gap-2">
                  <AlertTriangle className={`w-4 h-4 ${item.severity === 'Critical' ? 'text-red-500' : 'text-amber-400'}`} />
                  <span className="font-bold text-white">[{item.severity}] {item.title}</span>
                </div>
                <p className="text-gray-400 pl-6 font-sans text-xs">{item.desc}</p>
                <div className="ml-6 p-2.5 bg-black/50 border border-white/5 rounded-xl text-matrix-400 text-[11px]">
                  <span className="text-gray-400 font-sans block text-[10px]">Fix Recommendation:</span>
                  {item.remediation}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Server Config Tab Bar */}
        <div className="space-y-3 font-mono text-xs">
          <div className="flex flex-wrap gap-2 border-b border-white/5 pb-2">
            {['nginx', 'apache', 'nextjs', 'express', 'cloudflare'].map(server => (
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

          <pre className="p-4 bg-black/60 border border-white/10 rounded-2xl text-matrix-400 overflow-x-auto font-mono text-xs leading-relaxed whitespace-pre-wrap">
            {getServerConfig()}
          </pre>
        </div>
      </div>

      <SemanticToolLinks currentTool="http-headers" />
    </div>
  );
}
