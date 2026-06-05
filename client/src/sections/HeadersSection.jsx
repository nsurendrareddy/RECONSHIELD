import { useState } from 'react';
import ModuleCard from '../components/ModuleCard';
import StatusBadge from '../components/StatusBadge';
import { ShieldCheck, AlertTriangle, Code, Copy, FileText, CheckCircle2, Share2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function HeadersSection({ data }) {
  const h = data || {};
  const [activeTab, setActiveTab] = useState('checklist');
  const [activeConfigTab, setActiveConfigTab] = useState('nginx');
  const [copiedText, setCopiedText] = useState('');

  const gradeColors = {
    'A+': 'text-[#00ff88] border-[#00ff88]/30 bg-[#00ff88]/5',
    'A': 'text-emerald-400 border-emerald-500/30 bg-emerald-500/5',
    'B': 'text-cyan-400 border-cyan-500/30 bg-cyan-500/5',
    'C': 'text-amber-400 border-amber-500/30 bg-amber-500/5',
    'D': 'text-orange-400 border-orange-500/30 bg-orange-500/5',
    'F': 'text-red-400 border-red-500/30 bg-red-500/5'
  };

  const getStrokeDashOffset = (score = 0) => {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    return circumference - (score / 100) * circumference;
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedText(type);
    setTimeout(() => setCopiedText(''), 2000);
  };

  const domainName = typeof window !== 'undefined' ? window.location.search?.split('target=')?.[1] || 'yourdomain.com' : 'yourdomain.com';

  const configs = {
    nginx: `# Nginx Security Headers Configuration
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';" always;
add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;`,
    apache: `# Apache Security Headers Configuration
<IfModule mod_headers.c>
    Header set X-Frame-Options "SAMEORIGIN"
    Header set X-Content-Type-Options "nosniff"
    Header set X-XSS-Protection "1; mode=block"
    Header set Referrer-Policy "strict-origin-when-cross-origin"
    Header set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
    Header set Strict-Transport-Security "max-age=63072000; includeSubDomains; preload"
    Header set Permissions-Policy "geolocation=(), microphone=(), camera=()"
</IfModule>`,
    node: `// Node.js Express (using Helmet middleware)
const express = require('express');
const helmet = require('helmet');
const app = express();

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
      },
    },
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  })
);`
  };

  const isHighRisk = ['C', 'D', 'F'].includes(h.grade || 'A');

  return (
    <ModuleCard title="Security Headers" icon={ShieldCheck} status={h.risk_level}>
      {/* 1. Header Overview Bar */}
      <div className="flex flex-col md:flex-row items-center gap-8 pb-6 border-b border-white/5 mb-6">
        
        {/* Animated Grade Circle */}
        <div className="relative w-28 h-28 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              className="stroke-white/5 fill-none"
              strokeWidth="6"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              className={`fill-none transition-all duration-1000 ${
                ['A+', 'A'].includes(h.grade) ? 'stroke-emerald-400' :
                h.grade === 'B' ? 'stroke-cyan-400' :
                h.grade === 'C' ? 'stroke-amber-400' :
                h.grade === 'D' ? 'stroke-orange-400' : 'stroke-red-400'
              }`}
              strokeWidth="6"
              strokeDasharray={2 * Math.PI * 40}
              strokeDashoffset={getStrokeDashOffset(h.score ?? 0)}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-3xl font-black tracking-tight ${
              ['A+', 'A'].includes(h.grade) ? 'text-emerald-400' :
              h.grade === 'B' ? 'text-cyan-400' :
              h.grade === 'C' ? 'text-amber-400' :
              h.grade === 'D' ? 'text-orange-400' : 'text-red-400'
            }`}>
              {h.grade || '?'}
            </span>
            <span className="text-[10px] text-gray-500 font-mono mt-0.5">{h.score ?? 0}/100</span>
          </div>
        </div>

        {/* Server & Framework Details */}
        <div className="flex-1 text-center md:text-left space-y-2">
          <h3 className="text-lg font-bold text-white font-mono flex items-center justify-center md:justify-start gap-2">
            <span>Server Profile</span>
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-black/30 p-2.5 rounded-lg border border-white/5">
              <span className="text-gray-500 font-mono block mb-0.5">SERVER TYPE</span>
              <span className="text-white font-bold font-mono">{h.server || 'N/A'}</span>
            </div>
            <div className="bg-black/30 p-2.5 rounded-lg border border-white/5">
              <span className="text-gray-500 font-mono block mb-0.5">X-POWERED-BY</span>
              <span className={`font-bold font-mono ${h.powered_by && h.powered_by !== 'Not disclosed' ? 'text-amber-400' : 'text-gray-400'}`}>
                {h.powered_by || 'Not Disclosed'}
              </span>
            </div>
            <div className="bg-black/30 p-2.5 rounded-lg border border-white/5 col-span-2 sm:col-span-1">
              <span className="text-gray-500 font-mono block mb-0.5">EXPOSURE PROFILE</span>
              <span className={`font-bold font-mono ${isHighRisk ? 'text-red-400' : 'text-emerald-400'}`}>
                {isHighRisk ? 'High Risk' : 'Secure'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Navigation Tabs */}
      <div className="flex border-b border-white/5 mb-6 overflow-x-auto gap-2">
        {[
          { id: 'checklist', label: 'Checked Headers', icon: ShieldCheck },
          { id: 'csp', label: 'CSP Analysis', icon: FileText },
          { id: 'remediation', label: 'Remediation Fixes', icon: Code },
          { id: 'badge', label: 'Embed Badges', icon: Share2 }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 text-xs font-mono uppercase font-bold tracking-wider transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-cyan-500 text-cyan-400'
                  : 'border-transparent text-gray-500 hover:text-white'
              }`}
            >
              <Icon size={14} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3. Tab Contents */}

      {/* TAB A: Checklist */}
      {activeTab === 'checklist' && (
        <div className="space-y-4">
          {(h.headers || []).map((header, i) => (
            <div key={i} className="p-4 rounded-xl bg-surface-900/40 border border-white/[0.03] hover:border-white/[0.07] transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                <div>
                  <h4 className="text-sm font-bold text-white font-mono">{header.header}</h4>
                  <p className="text-xs text-gray-500 mt-1">{header.description}</p>
                </div>
                <StatusBadge status={header.status} label={header.present ? 'Present' : 'Missing'} />
              </div>
              
              {!header.present && header.recommendation && (
                <div className="mt-3 p-3 bg-red-500/5 border border-red-500/10 rounded-lg text-xs font-mono text-red-400 flex items-start gap-2">
                  <AlertTriangle size={14} className="mt-0.5 shrink-0" />
                  <span><strong>Fix Recommendation:</strong> {header.recommendation}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* TAB B: CSP Analysis */}
      {activeTab === 'csp' && (
        <div className="space-y-4">
          {h.csp_breakdown && Object.keys(h.csp_breakdown).length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(h.csp_breakdown).map(([directive, values]) => (
                <div key={directive} className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1.5">
                  <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">{directive}</div>
                  <p className="text-xs font-mono text-gray-300 break-all leading-relaxed bg-[#06080c] p-2.5 rounded border border-white/[0.03]">
                    {values && values.length > 0 ? values.join(' ') : "'none' / default"}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-red-500/5 border border-red-500/10 rounded-xl">
              <AlertTriangle className="w-8 h-8 text-red-400 mx-auto mb-2" />
              <h4 className="text-sm font-bold text-white">Content Security Policy Missing</h4>
              <p className="text-xs text-gray-500 mt-1">This site does not enforce frame, script, or connection boundaries.</p>
            </div>
          )}
        </div>
      )}

      {/* TAB C: Remediation Fixes */}
      {activeTab === 'remediation' && (
        <div className="space-y-4">
          <div className="flex gap-2 border-b border-white/5 pb-2">
            {['nginx', 'apache', 'node'].map((cType) => (
              <button
                key={cType}
                onClick={() => setActiveConfigTab(cType)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider font-bold transition-all ${
                  activeConfigTab === cType
                    ? 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-400'
                    : 'bg-transparent text-gray-500 hover:text-white'
                }`}
              >
                {cType}
              </button>
            ))}
          </div>

          <div className="relative">
            <pre className="bg-[#040608] p-5 rounded-xl border border-white/10 font-mono text-xs overflow-x-auto text-green-400 leading-relaxed max-h-[300px]">
              <code>{configs[activeConfigTab]}</code>
            </pre>
            <button
              onClick={() => copyToClipboard(configs[activeConfigTab], activeConfigTab)}
              className="absolute top-3 right-3 p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-gray-400 hover:text-white transition-all"
              title="Copy to clipboard"
            >
              <Copy size={14} />
            </button>
            {copiedText === activeConfigTab && (
              <span className="absolute top-14 right-3 bg-cyan-500/25 border border-cyan-500/40 text-cyan-300 text-[10px] font-mono px-2 py-1 rounded">
                Copied!
              </span>
            )}
          </div>
        </div>
      )}

      {/* TAB D: Embed Badges */}
      {activeTab === 'badge' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest">Preview Badge</h4>
              <div className="bg-black/40 p-6 rounded-xl border border-white/5 flex items-center justify-center">
                {/* Simulated Grade Badge SVG */}
                <svg width="150" height="20" viewBox="0 0 150 20" xmlns="http://www.w3.org/2000/svg" className="font-sans">
                  <rect width="90" height="20" fill="#24292e" rx="3" />
                  <rect x="90" width="60" height="20" rx="3" className={
                    ['A+', 'A'].includes(h.grade) ? 'fill-[#00ff88]' :
                    h.grade === 'B' ? 'fill-[#22d3ee]' :
                    h.grade === 'C' ? 'fill-[#fbbf24]' :
                    h.grade === 'D' ? 'fill-[#fb923c]' : 'fill-[#f87171]'
                  } />
                  <text x="45" y="14" fill="#fff" fontSize="10" textAnchor="middle" fontWeight="bold">headers score</text>
                  <text x="120" y="14" fill="#000" fontSize="11" textAnchor="middle" fontWeight="black">{h.grade || 'F'}</text>
                </svg>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest">Markdown Embed</h4>
              <div className="relative">
                <textarea
                  readOnly
                  value={`[![Security Grade](https://reconshield.in/api/badge/grade?domain=${domainName})](https://reconshield.in/reports/headers/${domainName})`}
                  className="w-full bg-[#040608] border border-white/10 rounded-xl p-3 font-mono text-xs text-gray-400 h-24 focus:outline-none"
                />
                <button
                  onClick={() => copyToClipboard(`[![Security Grade](https://reconshield.in/api/badge/grade?domain=${domainName})](https://reconshield.in/reports/headers/${domainName})`, 'md')}
                  className="absolute bottom-3 right-3 p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-gray-400 hover:text-white transition-all"
                >
                  <Copy size={12} />
                </button>
                {copiedText === 'md' && (
                  <span className="absolute bottom-3 right-12 bg-cyan-500/25 border border-cyan-500/40 text-cyan-300 text-[10px] font-mono px-2 py-1 rounded">
                    Copied!
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Conversion Trigger Widget */}
      {isHighRisk && (
        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-red-500/10 via-[#0d1117] to-transparent border border-red-500/20 relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <AlertTriangle className="text-red-400 w-4 h-4" />
              Critical Security Warning
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed max-w-xl">
              This host lacks Content-Security-Policy (CSP) or clickjacking frame restrictions. Run a complete external vulnerability scan to discover other critical exposure points.
            </p>
          </div>
          <Link href="/tools/vulnerability-scanner" className="inline-flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 px-4 py-2.5 rounded-xl text-xs font-bold font-mono transition-all self-start sm:self-auto uppercase tracking-wider shrink-0">
            <span>Scan for Vulns</span>
            <ArrowRight size={12} />
          </Link>
        </div>
      )}
    </ModuleCard>
  );
}
