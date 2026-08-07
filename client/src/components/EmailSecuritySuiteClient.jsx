'use client';

import { useState } from 'react';
import { Mail, ShieldCheck, AlertTriangle, CheckCircle2, Copy, Check, ArrowRight, RefreshCw, Lock, FileText, Globe } from 'lucide-react';
import { SemanticToolLinks } from '@/components/SemanticLinks';

export default function EmailSecuritySuiteClient() {
  const [domain, setDomain] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('summary');

  const runAudit = async (e) => {
    e?.preventDefault();
    if (!domain.trim()) return;

    setLoading(true);
    setResults(null);

    const cleanDomain = domain.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/.*$/, '');

    try {
      // 1. Perform DNS-over-HTTPS (DoH) lookup for TXT records (SPF, DMARC, BIMI) and MX records
      const [txtRes, mxRes, dmarcRes, bimiRes] = await Promise.all([
        fetch(`https://cloudflare-dns.com/dns-query?name=${cleanDomain}&type=TXT`, { headers: { accept: 'application/dns-json' } }),
        fetch(`https://cloudflare-dns.com/dns-query?name=${cleanDomain}&type=MX`, { headers: { accept: 'application/dns-json' } }),
        fetch(`https://cloudflare-dns.com/dns-query?name=_dmarc.${cleanDomain}&type=TXT`, { headers: { accept: 'application/dns-json' } }),
        fetch(`https://cloudflare-dns.com/dns-query?name=default._bimi.${cleanDomain}&type=TXT`, { headers: { accept: 'application/dns-json' } })
      ]);

      const [txtData, mxData, dmarcData, bimiData] = await Promise.all([
        txtRes.json(), mxRes.json(), dmarcRes.json(), bimiRes.json()
      ]);

      // Parse SPF
      const txtRecords = txtData.Answer ? txtData.Answer.map(a => a.data.replace(/^"|"$/g, '')) : [];
      const spfRecord = txtRecords.find(r => r.startsWith('v=spf1')) || null;
      
      // Calculate SPF Lookup Count
      let spfLookupCount = 0;
      if (spfRecord) {
        const matches = spfRecord.match(/\b(include|redirect|a|mx|exists|ptr)\b/g);
        spfLookupCount = matches ? matches.length : 0;
      }

      // Parse DMARC
      const dmarcRecords = dmarcData.Answer ? dmarcData.Answer.map(a => a.data.replace(/^"|"$/g, '')) : [];
      const dmarcRecord = dmarcRecords.find(r => r.startsWith('v=DMARC1')) || null;
      let dmarcPolicy = 'none';
      if (dmarcRecord) {
        if (dmarcRecord.includes('p=reject')) dmarcPolicy = 'reject';
        else if (dmarcRecord.includes('p=quarantine')) dmarcPolicy = 'quarantine';
      }

      // Parse MX
      const mxRecords = mxData.Answer ? mxData.Answer.map(a => a.data) : [];

      // Parse BIMI
      const bimiRecords = bimiData.Answer ? bimiData.Answer.map(a => a.data.replace(/^"|"$/g, '')) : [];
      const bimiRecord = bimiRecords.find(r => r.startsWith('v=BIMI1')) || null;

      // Score Calculation (Max 100)
      let score = 0;
      const issues = [];

      if (spfRecord) {
        score += 30;
        if (spfLookupCount > 10) {
          issues.push({ severity: 'High', title: 'SPF 10-DNS Lookup Limit Exceeded', desc: `Found ${spfLookupCount} DNS lookups. Mail servers will abort SPF validation (PermError).` });
        }
      } else {
        issues.push({ severity: 'Critical', title: 'Missing SPF Record', desc: 'No SPF TXT record found. Anyone can spoof emails sent from your domain.' });
      }

      if (dmarcRecord) {
        if (dmarcPolicy === 'reject') score += 40;
        else if (dmarcPolicy === 'quarantine') score += 30;
        else {
          score += 15;
          issues.push({ severity: 'Medium', title: 'Weak DMARC Policy (p=none)', desc: 'DMARC is set to monitoring mode only. Spoofed emails will still reach recipients.' });
        }
      } else {
        issues.push({ severity: 'Critical', title: 'Missing DMARC Policy', desc: 'No DMARC record (_dmarc.' + cleanDomain + ') configured. Spoofed emails are not blocked.' });
      }

      if (mxRecords.length > 0) {
        score += 20;
      } else {
        issues.push({ severity: 'High', title: 'No MX Records Found', desc: 'Domain cannot receive incoming emails.' });
      }

      if (bimiRecord) score += 10;

      setResults({
        domain: cleanDomain,
        score,
        spfRecord,
        spfLookupCount,
        dmarcRecord,
        dmarcPolicy,
        bimiRecord,
        mxRecords,
        issues
      });
    } catch (err) {
      console.error('Audit failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const copyResults = () => {
    if (!results) return;
    navigator.clipboard.writeText(JSON.stringify(results, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-10 font-sans max-w-5xl mx-auto">
      {/* Tool Input Container */}
      <div className="p-8 bg-surface-900/90 border border-white/10 rounded-3xl shadow-2xl backdrop-blur-xl space-y-6">
        <form onSubmit={runAudit} className="space-y-4">
          <label htmlFor="domain-input" className="block text-xs font-mono text-matrix-400 font-bold uppercase tracking-widest">
            Enter Target Domain Name for Anti-Spoofing Audit:
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Globe className="w-5 h-5 text-gray-500 absolute left-4 top-3.5 pointer-events-none" />
              <input
                id="domain-input"
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="example.com (e.g. google.com, github.com)"
                className="w-full pl-12 pr-4 py-3.5 bg-surface-950/90 border border-white/10 rounded-xl text-white placeholder-gray-500 font-mono text-sm focus:outline-none focus:border-matrix-400 transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !domain.trim()}
              className="px-8 py-3.5 bg-matrix-400 hover:bg-matrix-300 disabled:opacity-50 text-black text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-all shadow-[0_0_20px_rgba(0,255,156,0.3)] flex items-center justify-center gap-2 shrink-0 cursor-pointer"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Auditing...</span>
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4" />
                  <span>Audit Anti-Spoofing</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Sample Trigger Quick Actions */}
        <div className="flex items-center gap-2 text-xs font-mono text-gray-400 pt-2 border-t border-white/5">
          <span>Test Samples:</span>
          {['google.com', 'github.com', 'microsoft.com'].map(sample => (
            <button
              key={sample}
              onClick={() => { setDomain(sample); }}
              className="px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-matrix-400 transition-colors"
            >
              {sample}
            </button>
          ))}
        </div>
      </div>

      {/* Results Diagnostic Workspace */}
      {results && (
        <div className="p-8 bg-surface-900 border border-white/10 rounded-3xl space-y-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <span className="text-xs font-mono text-gray-400 uppercase">Target Domain</span>
              <h2 className="text-2xl font-bold font-display text-white uppercase tracking-wide">{results.domain}</h2>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-right">
                <span className="text-xs font-mono text-gray-400 uppercase block">Deliverability Score</span>
                <span className={`text-3xl font-bold font-display ${results.score >= 80 ? 'text-matrix-400' : results.score >= 50 ? 'text-amber-400' : 'text-red-500'}`}>
                  {results.score} / 100
                </span>
              </div>
              <button
                onClick={copyResults}
                className="px-4 py-2 bg-surface-950 border border-white/10 hover:border-matrix-400 text-xs font-mono text-gray-300 rounded-xl transition-all flex items-center gap-1.5"
              >
                {copied ? <Check className="w-4 h-4 text-matrix-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied' : 'Export JSON'}</span>
              </button>
            </div>
          </div>

          {/* Tab Selection Bar */}
          <div className="flex gap-2 border-b border-white/5 pb-3 font-mono text-xs">
            {['summary', 'spf', 'dmarc', 'mx'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl uppercase font-bold transition-all ${
                  activeTab === tab 
                    ? 'bg-matrix-400 text-black shadow-[0_0_12px_rgba(0,255,156,0.3)]' 
                    : 'bg-surface-950 text-gray-400 hover:text-white border border-white/5'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Summary Tab Content */}
          {activeTab === 'summary' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
                <div className="p-4 bg-surface-950 border border-white/5 rounded-2xl">
                  <span className="text-gray-500 uppercase block mb-1">SPF Status</span>
                  <span className={`font-bold ${results.spfRecord ? 'text-matrix-400' : 'text-red-400'}`}>
                    {results.spfRecord ? `Configured (${results.spfLookupCount}/10 Lookups)` : 'Missing'}
                  </span>
                </div>
                <div className="p-4 bg-surface-950 border border-white/5 rounded-2xl">
                  <span className="text-gray-500 uppercase block mb-1">DMARC Policy</span>
                  <span className={`font-bold ${results.dmarcPolicy === 'reject' ? 'text-matrix-400' : results.dmarcPolicy === 'quarantine' ? 'text-amber-400' : 'text-red-400'}`}>
                    p={results.dmarcPolicy}
                  </span>
                </div>
                <div className="p-4 bg-surface-950 border border-white/5 rounded-2xl">
                  <span className="text-gray-500 uppercase block mb-1">MX Mail Servers</span>
                  <span className="font-bold text-cyan-400">
                    {results.mxRecords.length} Active Servers
                  </span>
                </div>
              </div>

              {/* Identified Security Issues List */}
              <div className="space-y-3">
                <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">Identified Security Risks &amp; Remediation</h3>
                {results.issues.length === 0 ? (
                  <div className="p-4 bg-matrix-400/10 border border-matrix-400/20 text-matrix-400 rounded-2xl text-xs font-mono flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Excellent! No critical email spoofing vulnerabilities detected on this domain.</span>
                  </div>
                ) : (
                  results.issues.map((issue, idx) => (
                    <div key={idx} className="p-4 bg-surface-950 border border-white/10 rounded-2xl space-y-1 font-mono text-xs">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className={`w-4 h-4 ${issue.severity === 'Critical' ? 'text-red-500' : 'text-amber-400'}`} />
                        <span className="font-bold text-white">[{issue.severity}] {issue.title}</span>
                      </div>
                      <p className="text-gray-400 pl-6 font-sans text-xs">{issue.desc}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* SPF Raw View */}
          {activeTab === 'spf' && (
            <div className="p-4 bg-surface-950 border border-white/5 rounded-2xl space-y-2 font-mono text-xs">
              <span className="text-gray-500 uppercase block">Raw SPF Record</span>
              <p className="text-matrix-400 bg-black/50 p-3 rounded-xl border border-white/5 break-all">
                {results.spfRecord || 'No SPF TXT record found'}
              </p>
              <span className="text-gray-400 block pt-2">DNS Lookup Count: {results.spfLookupCount} / 10 maximum RFC 7208 limit.</span>
            </div>
          )}

          {/* DMARC Raw View */}
          {activeTab === 'dmarc' && (
            <div className="p-4 bg-surface-950 border border-white/5 rounded-2xl space-y-2 font-mono text-xs">
              <span className="text-gray-500 uppercase block">Raw DMARC Policy Record (_dmarc.{results.domain})</span>
              <p className="text-matrix-400 bg-black/50 p-3 rounded-xl border border-white/5 break-all">
                {results.dmarcRecord || 'No DMARC TXT record found'}
              </p>
            </div>
          )}

          {/* MX Raw View */}
          {activeTab === 'mx' && (
            <div className="p-4 bg-surface-950 border border-white/5 rounded-2xl space-y-2 font-mono text-xs">
              <span className="text-gray-500 uppercase block">Active MX Mail Servers</span>
              {results.mxRecords.map((mx, idx) => (
                <p key={idx} className="text-cyan-400 bg-black/50 p-2.5 rounded-xl border border-white/5 break-all">
                  {mx}
                </p>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Semantic Internal Links Component */}
      <SemanticToolLinks currentTool="email-security" />
    </div>
  );
}
