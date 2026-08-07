'use client';

import { useState } from 'react';
import { Mail, ShieldCheck, AlertTriangle, CheckCircle2, Copy, Check, ArrowRight, RefreshCw, Lock, FileText, Globe, Key, Info, Sparkles } from 'lucide-react';
import { SemanticToolLinks } from '@/components/SemanticLinks';

export default function EmailSecuritySuiteClient() {
  const [domain, setDomain] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('summary');

  // Client-side DoH resolution fallback if API route is unavailable
  const fetchDoHRecord = async (name, type) => {
    const endpoints = [
      `https://dns.google/resolve?name=${encodeURIComponent(name)}&type=${type}`,
      `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(name)}&type=${type}`
    ];

    for (const url of endpoints) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 4000);
        const res = await fetch(url, {
          headers: { accept: 'application/dns-json' },
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          if (data.Answer && Array.isArray(data.Answer)) {
            return data.Answer.map(a => a.data ? a.data.replace(/^"|"$/g, '').replace(/\\"/g, '"') : '').filter(Boolean);
          }
        }
      } catch (e) {
        // Retry next endpoint
      }
    }
    return [];
  };

  const clientSideAuditFallback = async (cleanDomain) => {
    const [txtRecords, mxData, dmarcRecords, bimiRecords] = await Promise.all([
      fetchDoHRecord(cleanDomain, 'TXT'),
      fetchDoHRecord(cleanDomain, 'MX'),
      fetchDoHRecord(`_dmarc.${cleanDomain}`, 'TXT'),
      fetchDoHRecord(`default._bimi.${cleanDomain}`, 'TXT')
    ]);

    // Check common DKIM selectors
    const dkimSelectors = ['google', 'k1', 's1', 'selector1', 'mail', 'default', 'dmarc'];
    const dkimResults = [];

    await Promise.all(
      dkimSelectors.map(async (selector) => {
        const records = await fetchDoHRecord(`${selector}._domainkey.${cleanDomain}`, 'TXT');
        const dkimRecord = records.find(r => r.includes('v=DKIM1') || r.includes('p='));
        if (dkimRecord) {
          dkimResults.push({
            selector,
            record: dkimRecord,
            keyLength: dkimRecord.includes('p=') ? (dkimRecord.length > 250 ? '2048-bit+' : '1024-bit') : 'Unknown'
          });
        }
      })
    );

    const spfRecord = txtRecords.find(r => r.startsWith('v=spf1')) || null;
    let spfLookupCount = 0;
    let spfMechanisms = [];
    if (spfRecord) {
      const matches = spfRecord.match(/\b(include|redirect|a|mx|exists|ptr):?[^\s]*/gi);
      spfLookupCount = matches ? matches.length : 0;
      spfMechanisms = spfRecord.split(/\s+/).filter(Boolean);
    }

    const dmarcRecord = dmarcRecords.find(r => r.startsWith('v=DMARC1')) || null;
    let dmarcPolicy = 'none';
    let dmarcSubdomainPolicy = 'none';
    let dmarcRua = null;
    let dmarcRuf = null;

    if (dmarcRecord) {
      const pMatch = dmarcRecord.match(/\bp=([a-z]+)/i);
      if (pMatch) dmarcPolicy = pMatch[1].toLowerCase();

      const spMatch = dmarcRecord.match(/\bsp=([a-z]+)/i);
      if (spMatch) dmarcSubdomainPolicy = spMatch[1].toLowerCase();

      const ruaMatch = dmarcRecord.match(/\brua=([^\s;]+)/i);
      if (ruaMatch) dmarcRua = ruaMatch[1];

      const rufMatch = dmarcRecord.match(/\bruf=([^\s;]+)/i);
      if (rufMatch) dmarcRuf = rufMatch[1];
    }

    const bimiRecord = bimiRecords.find(r => r.startsWith('v=BIMI1')) || null;
    let bimiLogoUrl = null;
    let bimiVmcUrl = null;
    if (bimiRecord) {
      const lMatch = bimiRecord.match(/\bl=([^\s;]+)/i);
      if (lMatch) bimiLogoUrl = lMatch[1];
      const aMatch = bimiRecord.match(/\ba=([^\s;]+)/i);
      if (aMatch) bimiVmcUrl = aMatch[1];
    }

    let score = 0;
    const issues = [];
    const recommendations = [];

    if (spfRecord) {
      score += 25;
      if (spfLookupCount > 10) {
        issues.push({
          severity: 'High',
          category: 'SPF',
          title: 'SPF 10-DNS Lookup Limit Exceeded',
          desc: `Found ${spfLookupCount} DNS lookups in SPF record. RFC 7208 limits lookups to 10. Receiving mail servers will abort evaluation with a PermError.`,
          remediation: 'Flatten your SPF record by consolidating domain includes into direct IP blocks (ip4/ip6) or using dynamic SPF lookup services.'
        });
      } else if (spfRecord.includes('+all')) {
        issues.push({
          severity: 'Critical',
          category: 'SPF',
          title: 'SPF Permissive "+all" Qualifier Detected',
          desc: 'The "+all" mechanism explicitly authorizes ANY IP address to send email on behalf of your domain.',
          remediation: 'Replace "+all" with "-all" (hardfail) or "~all" (softfail).'
        });
      } else if (spfRecord.includes('~all')) {
        recommendations.push('Upgrade SPF ending qualifier from "~all" (softfail) to "-all" (hardfail) once DMARC is fully enforced.');
      }
    } else {
      issues.push({
        severity: 'Critical',
        category: 'SPF',
        title: 'Missing SPF Record',
        desc: 'No SPF TXT record was found. Unauthenticated senders can easily send emails pretending to come from your domain.',
        remediation: 'Publish an SPF TXT record (v=spf1 ...) specifying authorized mail servers for your domain.'
      });
    }

    if (dmarcRecord) {
      if (dmarcPolicy === 'reject') {
        score += 40;
      } else if (dmarcPolicy === 'quarantine') {
        score += 30;
        recommendations.push('Transition DMARC policy from p=quarantine to p=reject for complete spoofing elimination.');
      } else {
        score += 15;
        issues.push({
          severity: 'Medium',
          category: 'DMARC',
          title: 'Weak DMARC Policy (p=none)',
          desc: 'DMARC is configured in monitoring mode only (p=none). Unauthenticated or spoofed emails will still reach recipients.',
          remediation: 'Monitor aggregate RUA reports and upgrade your DMARC policy to p=quarantine and eventually p=reject.'
        });
      }

      if (!dmarcRua) {
        recommendations.push(`Add an aggregate reporting tag (rua=mailto:dmarc-reports@${cleanDomain}) to receive daily authentication reports.`);
      }
    } else {
      issues.push({
        severity: 'Critical',
        category: 'DMARC',
        title: 'Missing DMARC Policy',
        desc: `No DMARC record found at _dmarc.${cleanDomain}. Mail providers will not enforce SPF/DKIM failures or reject spoofed messages.`,
        remediation: `Create a DNS TXT record for _dmarc.${cleanDomain} with value "v=DMARC1; p=reject; rua=mailto:dmarc-reports@${cleanDomain};"`
      });
    }

    if (dkimResults.length > 0) {
      score += 20;
    } else {
      issues.push({
        severity: 'High',
        category: 'DKIM',
        title: 'No Active DKIM Selectors Discovered',
        desc: 'Could not detect public DKIM keys under common selectors (google, k1, s1, selector1, mail, default).',
        remediation: 'Ensure your mail provider (e.g. Google Workspace, Microsoft 365) has active DKIM signing enabled and public keys published in DNS.'
      });
    }

    if (mxData.length > 0) {
      score += 10;
    } else {
      issues.push({
        severity: 'High',
        category: 'MX',
        title: 'No MX Records Found',
        desc: 'Domain has no active MX records configured. Incoming emails will fail to deliver.',
        remediation: 'Configure MX DNS records pointing to your email hosting provider servers.'
      });
    }

    if (bimiRecord) {
      score += 5;
    } else if (dmarcPolicy === 'reject' || dmarcPolicy === 'quarantine') {
      recommendations.push('Deploy BIMI (Brand Indicators for Message Identification) to display your official verified brand logo in recipient inboxes.');
    }

    return {
      domain: cleanDomain,
      score: Math.min(100, score),
      spfRecord,
      spfLookupCount,
      spfMechanisms,
      dmarcRecord,
      dmarcPolicy,
      dmarcSubdomainPolicy,
      dmarcRua,
      dmarcRuf,
      dkimResults,
      bimiRecord,
      bimiLogoUrl,
      bimiVmcUrl,
      mxRecords: mxData,
      issues,
      recommendations,
      timestamp: new Date().toISOString()
    };
  };

  const runAudit = async (e, targetDomain = null) => {
    if (e) e.preventDefault();
    
    const inputDomain = targetDomain || domain;
    if (!inputDomain || !inputDomain.trim()) {
      setError('Please enter a target domain name to audit.');
      return;
    }

    const cleanDomain = inputDomain
      .trim()
      .toLowerCase()
      .replace(/^https?:\/\//, '')
      .replace(/\/.*$/, '')
      .replace(/[^a-z0-9.-]/g, '');

    if (!cleanDomain || !cleanDomain.includes('.')) {
      setError('Invalid domain format. Please enter a valid domain name like "example.com".');
      return;
    }

    setLoading(true);
    setError(null);
    setResults(null);
    setDomain(cleanDomain);

    try {
      // 1. Attempt API route audit first
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      
      const res = await fetch(`/api/email-security-audit?domain=${encodeURIComponent(cleanDomain)}`, {
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        setResults(data);
      } else {
        // If API route failed or returned non-200, fallback to Client-side DoH audit
        const fallbackData = await clientSideAuditFallback(cleanDomain);
        setResults(fallbackData);
      }
    } catch (err) {
      console.warn('API audit route failed or timed out, executing client-side DoH fallback:', err);
      try {
        const fallbackData = await clientSideAuditFallback(cleanDomain);
        setResults(fallbackData);
      } catch (fallbackErr) {
        console.error('Audit failed completely:', fallbackErr);
        setError('Failed to perform email security audit. Please verify network connectivity and try again.');
      }
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

  const handleSampleClick = (sampleDomain) => {
    setDomain(sampleDomain);
    runAudit(null, sampleDomain);
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
                onChange={(e) => {
                  setDomain(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="example.com (e.g. google.com, github.com, microsoft.com)"
                className="w-full pl-12 pr-4 py-3.5 bg-surface-950/90 border border-white/10 rounded-xl text-white placeholder-gray-500 font-mono text-sm focus:outline-none focus:border-matrix-400 transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !domain.trim()}
              className="px-8 py-3.5 bg-matrix-400 hover:bg-matrix-300 disabled:opacity-50 text-black text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-all shadow-[0_0_20px_rgba(0,255,156,0.3)] flex items-center justify-center gap-2 shrink-0 cursor-pointer disabled:cursor-not-allowed"
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

        {/* Error Alert Display */}
        {error && (
          <div className="p-4 bg-red-950/80 border border-red-500/30 rounded-2xl text-red-300 text-xs font-mono flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
            <div className="flex-1">
              <span className="font-bold text-red-200 block mb-0.5">Validation Error</span>
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Sample Trigger Quick Actions */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-gray-400 pt-2 border-t border-white/5">
          <span>Test Samples:</span>
          {['google.com', 'github.com', 'microsoft.com', 'cloudflare.com'].map(sample => (
            <button
              key={sample}
              type="button"
              onClick={() => handleSampleClick(sample)}
              className="px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-matrix-400 transition-colors cursor-pointer"
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
              <span className="text-xs font-mono text-gray-400 uppercase">Target Domain Audit Report</span>
              <h2 className="text-2xl font-bold font-display text-white uppercase tracking-wide flex items-center gap-2">
                {results.domain}
                <ShieldCheck className="w-6 h-6 text-matrix-400" />
              </h2>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-right">
                <span className="text-xs font-mono text-gray-400 uppercase block">Deliverability Score</span>
                <span className={`text-3xl font-bold font-display ${results.score >= 80 ? 'text-matrix-400' : results.score >= 50 ? 'text-amber-400' : 'text-red-500'}`}>
                  {results.score} / 100
                </span>
              </div>
              <button
                type="button"
                onClick={copyResults}
                className="px-4 py-2.5 bg-surface-950 border border-white/10 hover:border-matrix-400 text-xs font-mono text-gray-300 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-matrix-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied' : 'Export JSON'}</span>
              </button>
            </div>
          </div>

          {/* Tab Selection Bar */}
          <div className="flex flex-wrap gap-2 border-b border-white/5 pb-3 font-mono text-xs">
            {['summary', 'spf', 'dkim', 'dmarc', 'mx', 'bimi', 'recommendations'].map(tab => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl uppercase font-bold transition-all cursor-pointer ${
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
                <div className="p-4 bg-surface-950 border border-white/5 rounded-2xl">
                  <span className="text-gray-500 uppercase block mb-1">SPF Status</span>
                  <span className={`font-bold block ${results.spfRecord ? 'text-matrix-400' : 'text-red-400'}`}>
                    {results.spfRecord ? `Valid (${results.spfLookupCount}/10 Lookups)` : 'Missing Record'}
                  </span>
                </div>
                <div className="p-4 bg-surface-950 border border-white/5 rounded-2xl">
                  <span className="text-gray-500 uppercase block mb-1">DMARC Enforcement</span>
                  <span className={`font-bold block ${results.dmarcPolicy === 'reject' ? 'text-matrix-400' : results.dmarcPolicy === 'quarantine' ? 'text-amber-400' : 'text-red-400'}`}>
                    p={results.dmarcPolicy}
                  </span>
                </div>
                <div className="p-4 bg-surface-950 border border-white/5 rounded-2xl">
                  <span className="text-gray-500 uppercase block mb-1">DKIM Selectors</span>
                  <span className={`font-bold block ${results.dkimResults?.length > 0 ? 'text-cyan-400' : 'text-amber-400'}`}>
                    {results.dkimResults?.length || 0} Key(s) Found
                  </span>
                </div>
                <div className="p-4 bg-surface-950 border border-white/5 rounded-2xl">
                  <span className="text-gray-500 uppercase block mb-1">MX Mail Hosts</span>
                  <span className="font-bold text-cyan-400 block">
                    {results.mxRecords?.length || 0} Active Servers
                  </span>
                </div>
              </div>

              {/* Identified Security Issues List */}
              <div className="space-y-3">
                <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">Identified Security Risks &amp; Vulnerabilities</h3>
                {results.issues?.length === 0 ? (
                  <div className="p-4 bg-matrix-400/10 border border-matrix-400/20 text-matrix-400 rounded-2xl text-xs font-mono flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Excellent! No critical email spoofing vulnerabilities detected on this domain.</span>
                  </div>
                ) : (
                  results.issues?.map((issue, idx) => (
                    <div key={idx} className="p-4 bg-surface-950 border border-white/10 rounded-2xl space-y-2 font-mono text-xs">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className={`w-4 h-4 ${issue.severity === 'Critical' ? 'text-red-500' : issue.severity === 'High' ? 'text-amber-400' : 'text-yellow-300'}`} />
                        <span className="font-bold text-white">[{issue.severity}] [{issue.category}] {issue.title}</span>
                      </div>
                      <p className="text-gray-400 pl-6 font-sans text-xs">{issue.desc}</p>
                      {issue.remediation && (
                        <div className="ml-6 mt-2 p-3 bg-black/50 border border-white/5 rounded-xl text-matrix-400 font-mono text-xs">
                          <span className="text-gray-400 block font-sans text-[11px] mb-1">Remediation Action:</span>
                          {issue.remediation}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* SPF Raw View */}
          {activeTab === 'spf' && (
            <div className="p-5 bg-surface-950 border border-white/5 rounded-2xl space-y-4 font-mono text-xs">
              <div>
                <span className="text-gray-400 uppercase block mb-1 text-[11px]">Raw SPF Record (TXT)</span>
                <p className="text-matrix-400 bg-black/60 p-4 rounded-xl border border-white/5 break-all">
                  {results.spfRecord || 'No SPF TXT record published for this domain.'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 bg-surface-900 border border-white/5 rounded-xl">
                  <span className="text-gray-400 block text-[11px] uppercase">DNS Lookup Count</span>
                  <span className={`text-lg font-bold ${results.spfLookupCount <= 10 ? 'text-matrix-400' : 'text-red-400'}`}>
                    {results.spfLookupCount} / 10 (RFC 7208 Limit)
                  </span>
                </div>
                <div className="p-3 bg-surface-900 border border-white/5 rounded-xl">
                  <span className="text-gray-400 block text-[11px] uppercase">SPF Compliance</span>
                  <span className={`text-lg font-bold ${results.spfRecord ? 'text-matrix-400' : 'text-red-400'}`}>
                    {results.spfRecord ? (results.spfLookupCount <= 10 ? 'PASS' : 'FAIL (PermError)') : 'FAIL (Missing)'}
                  </span>
                </div>
              </div>

              {results.spfMechanisms?.length > 0 && (
                <div>
                  <span className="text-gray-400 uppercase block mb-2 text-[11px]">Parsed SPF Directives</span>
                  <div className="flex flex-wrap gap-2">
                    {results.spfMechanisms.map((mech, idx) => (
                      <span key={idx} className="px-2.5 py-1 bg-surface-900 border border-white/10 rounded-lg text-gray-300">
                        {mech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* DKIM View */}
          {activeTab === 'dkim' && (
            <div className="p-5 bg-surface-950 border border-white/5 rounded-2xl space-y-4 font-mono text-xs">
              <span className="text-gray-400 uppercase block text-[11px]">Discovered DKIM Public Keys</span>
              {results.dkimResults?.length === 0 ? (
                <p className="text-amber-400 bg-black/60 p-4 rounded-xl border border-white/5">
                  No DKIM public key TXT records discovered for common selectors (google, k1, s1, selector1, mail, default).
                </p>
              ) : (
                results.dkimResults?.map((item, idx) => (
                  <div key={idx} className="p-4 bg-surface-900 border border-white/10 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white uppercase">Selector: {item.selector}</span>
                      <span className="px-2 py-0.5 bg-matrix-400/10 text-matrix-400 rounded text-[11px]">
                        {item.keyLength}
                      </span>
                    </div>
                    <p className="text-cyan-400 bg-black/60 p-3 rounded-lg border border-white/5 break-all text-[11px]">
                      {item.record}
                    </p>
                  </div>
                ))
              )}
            </div>
          )}

          {/* DMARC Raw View */}
          {activeTab === 'dmarc' && (
            <div className="p-5 bg-surface-950 border border-white/5 rounded-2xl space-y-4 font-mono text-xs">
              <div>
                <span className="text-gray-400 uppercase block mb-1 text-[11px]">Raw DMARC Record (_dmarc.{results.domain})</span>
                <p className="text-matrix-400 bg-black/60 p-4 rounded-xl border border-white/5 break-all">
                  {results.dmarcRecord || 'No DMARC TXT record published.'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-3 bg-surface-900 border border-white/5 rounded-xl">
                  <span className="text-gray-400 block text-[11px] uppercase">Domain Policy (p=)</span>
                  <span className={`text-lg font-bold ${results.dmarcPolicy === 'reject' ? 'text-matrix-400' : results.dmarcPolicy === 'quarantine' ? 'text-amber-400' : 'text-red-400'}`}>
                    p={results.dmarcPolicy}
                  </span>
                </div>
                <div className="p-3 bg-surface-900 border border-white/5 rounded-xl">
                  <span className="text-gray-400 block text-[11px] uppercase">Subdomain Policy (sp=)</span>
                  <span className="text-lg font-bold text-gray-200">
                    sp={results.dmarcSubdomainPolicy || results.dmarcPolicy}
                  </span>
                </div>
                <div className="p-3 bg-surface-900 border border-white/5 rounded-xl">
                  <span className="text-gray-400 block text-[11px] uppercase">Aggregate Reports (rua=)</span>
                  <span className="text-xs font-bold text-cyan-400 block truncate">
                    {results.dmarcRua || 'None'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* MX Raw View */}
          {activeTab === 'mx' && (
            <div className="p-5 bg-surface-950 border border-white/5 rounded-2xl space-y-4 font-mono text-xs">
              <span className="text-gray-400 uppercase block text-[11px]">Active Mail Exchange (MX) Host Servers</span>
              {results.mxRecords?.length === 0 ? (
                <p className="text-red-400 bg-black/60 p-4 rounded-xl border border-white/5">
                  No active MX records configured. Domain cannot receive incoming email.
                </p>
              ) : (
                results.mxRecords?.map((mx, idx) => (
                  <div key={idx} className="p-3 bg-black/60 rounded-xl border border-white/5 flex items-center justify-between text-cyan-400">
                    <span className="font-bold">{mx}</span>
                    <span className="text-gray-500 text-[11px]">Priority / Host</span>
                  </div>
                ))
              )}
            </div>
          )}

          {/* BIMI View */}
          {activeTab === 'bimi' && (
            <div className="p-5 bg-surface-950 border border-white/5 rounded-2xl space-y-4 font-mono text-xs">
              <div>
                <span className="text-gray-400 uppercase block mb-1 text-[11px]">Raw BIMI Record (default._bimi.{results.domain})</span>
                <p className="text-matrix-400 bg-black/60 p-4 rounded-xl border border-white/5 break-all">
                  {results.bimiRecord || 'No BIMI TXT record published.'}
                </p>
              </div>

              {results.bimiRecord && (
                <div className="space-y-2">
                  {results.bimiLogoUrl && (
                    <div className="p-3 bg-surface-900 rounded-xl border border-white/5">
                      <span className="text-gray-400 block text-[11px]">SVG Logo Location (l=):</span>
                      <span className="text-cyan-400 break-all">{results.bimiLogoUrl}</span>
                    </div>
                  )}
                  {results.bimiVmcUrl && (
                    <div className="p-3 bg-surface-900 rounded-xl border border-white/5">
                      <span className="text-gray-400 block text-[11px]">VMC Certificate Authority (a=):</span>
                      <span className="text-cyan-400 break-all">{results.bimiVmcUrl}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Recommendations View */}
          {activeTab === 'recommendations' && (
            <div className="p-5 bg-surface-950 border border-white/5 rounded-2xl space-y-4 font-mono text-xs">
              <span className="text-gray-400 uppercase block text-[11px]">Strategic Recommendations &amp; Hardening Steps</span>
              {results.recommendations?.length === 0 ? (
                <p className="text-matrix-400 bg-black/60 p-4 rounded-xl border border-white/5">
                  Your domain configuration follows optimal email deliverability and anti-spoofing standards!
                </p>
              ) : (
                results.recommendations?.map((rec, idx) => (
                  <div key={idx} className="p-4 bg-surface-900 border border-white/10 rounded-xl space-y-1 flex items-start gap-3">
                    <Sparkles className="w-4 h-4 text-matrix-400 shrink-0 mt-0.5" />
                    <p className="text-gray-200 font-sans text-xs">{rec}</p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}

      {/* Semantic Internal Links Component */}
      <SemanticToolLinks currentTool="email-security" />
    </div>
  );
}
