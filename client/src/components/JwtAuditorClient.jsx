'use client';

import { useState } from 'react';
import { Lock, ShieldAlert, Check, Copy, RefreshCw, Key, AlertTriangle, CheckCircle2, FileText, Download, Sliders } from 'lucide-react';
import { SemanticToolLinks } from '@/components/SemanticLinks';

export default function JwtAuditorClient() {
  const [tokenInput, setTokenInput] = useState(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMiwiZXhwIjoxNTE2MjQyNjIyLCJzZWNyZXQiOiJteXBhc3N3b3JkMTIzIn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
  );
  const [secretInput, setSecretInput] = useState('secret');
  const [headerObj, setHeaderObj] = useState(null);
  const [payloadObj, setPayloadObj] = useState(null);
  const [signatureStr, setSignatureStr] = useState('');
  const [auditResult, setAuditResult] = useState(null);
  const [parseError, setParseError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('audit'); // 'audit', 'header', 'payload'

  // Helper: Base64Url decode
  const base64UrlDecode = (str) => {
    try {
      let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
      while (base64.length % 4) {
        base64 += '=';
      }
      return decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
    } catch (e) {
      throw new Error('Invalid Base64Url encoding.');
    }
  };

  const auditToken = (e) => {
    if (e) e.preventDefault();
    setParseError(null);
    setHeaderObj(null);
    setPayloadObj(null);
    setAuditResult(null);

    const trimmed = tokenInput.trim();
    if (!trimmed) {
      setParseError('Please paste a JSON Web Token string.');
      return;
    }

    const parts = trimmed.split('.');
    if (parts.length < 2 || parts.length > 3) {
      setParseError('Invalid JWT format. A valid JWT must consist of 2 or 3 dot-separated Base64Url sections.');
      return;
    }

    try {
      const headerJson = JSON.parse(base64UrlDecode(parts[0]));
      const payloadJson = JSON.parse(base64UrlDecode(parts[1]));
      const sig = parts[2] || '';

      setHeaderObj(headerJson);
      setPayloadObj(payloadJson);
      setSignatureStr(sig);

      // Perform Security Audit
      const findings = [];
      let score = 100;

      // 1. Check Algorithm 'none'
      const alg = (headerJson.alg || '').toLowerCase();
      if (!alg || alg === 'none') {
        score -= 50;
        findings.push({
          severity: 'Critical',
          title: "Insecure Algorithm 'none' Detected",
          desc: "The JWT header explicitly allows unsigned tokens (alg: 'none'), allowing any attacker to modify payload claims and bypass authentication.",
          remediation: "Enforce strict algorithm verification on the backend (e.g., mandate RS256 or HS256) and reject tokens with alg: 'none'."
        });
      }

      // 2. Check Weak Symmetric Secret
      const weakSecrets = ['secret', '123456', 'password', 'jwt_secret', 'admin', 'key', 'supersecret', '12345678', 'app_secret', 'mypassword123'];
      if (secretInput && weakSecrets.includes(secretInput.trim().toLowerCase())) {
        score -= 25;
        findings.push({
          severity: 'High',
          title: "Weak HMAC Secret Key Detected",
          desc: `The key '${secretInput}' is listed in common dictionary wordlists and can be brute-forced offline within seconds.`,
          remediation: "Use a high-entropy cryptographically random secret of at least 256 bits (32 bytes)."
        });
      }

      // 3. Expiration (exp) Audit
      const now = Math.floor(Date.now() / 1000);
      if (!payloadJson.exp) {
        score -= 15;
        findings.push({
          severity: 'Medium',
          title: "Missing Expiration Claim (exp)",
          desc: "Token does not specify an expiration timestamp. Stolen tokens remain valid indefinitely.",
          remediation: "Always include an 'exp' claim with a short lifespan (e.g., 15 minutes to 1 hour)."
        });
      } else {
        const expTime = payloadJson.exp;
        if (expTime < now) {
          findings.push({
            severity: 'Info',
            title: "Token Has Expired",
            desc: `Token expired at ${new Date(expTime * 1000).toUTCString()} (${Math.abs(now - expTime)} seconds ago).`,
            remediation: "Issue a new refreshed token."
          });
        }
      }

      // 4. Sensitive Data Leak Check in Payload
      const sensitiveKeys = ['password', 'passwd', 'secret', 'creditcard', 'ssn', 'private_key', 'auth_token'];
      const foundSensitive = [];
      Object.keys(payloadJson).forEach(key => {
        if (sensitiveKeys.includes(key.toLowerCase())) {
          foundSensitive.push(key);
        }
      });
      if (foundSensitive.length > 0) {
        score -= 20;
        findings.push({
          severity: 'High',
          title: "Sensitive Information Leak in Payload Claims",
          desc: `Payload exposes sensitive data fields: [${foundSensitive.join(', ')}]. JWT payloads are unencrypted base64 strings readable by anyone.`,
          remediation: "Do not store confidential credentials or secrets inside JWT payload claims."
        });
      }

      // 5. Header Key ID (kid) Injection Risk
      if (headerJson.kid && (headerJson.kid.includes('../') || headerJson.kid.includes('SELECT') || headerJson.kid.includes('http'))) {
        score -= 30;
        findings.push({
          severity: 'Critical',
          title: "Suspicious Header Key ID (kid) Vector",
          desc: "The 'kid' header parameter contains path traversal or SQL keywords, presenting a potential SQLi or Directory Traversal vulnerability.",
          remediation: "Sanitize and strictly validate 'kid' values before loading key files or querying key databases."
        });
      }

      const finalScore = Math.max(0, Math.min(100, score));
      setAuditResult({
        score: finalScore,
        findings,
        algorithm: headerJson.alg || 'Missing',
        issuedAt: payloadJson.iat ? new Date(payloadJson.iat * 1000).toUTCString() : 'None',
        expiresAt: payloadJson.exp ? new Date(payloadJson.exp * 1000).toUTCString() : 'None',
        subject: payloadJson.sub || 'None'
      });

    } catch (err) {
      setParseError('Failed to parse JWT: ' + err.message);
    }
  };

  const copyDecodedJson = () => {
    const data = {
      header: headerObj,
      payload: payloadObj,
      signature: signatureStr,
      audit: auditResult
    };
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-10 font-sans max-w-5xl mx-auto">
      {/* Tool Control Box */}
      <div className="p-8 bg-surface-900/90 border border-white/10 rounded-3xl shadow-2xl backdrop-blur-xl space-y-6">
        <form onSubmit={auditToken} className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-mono text-matrix-400 font-bold uppercase tracking-widest">
              Paste JSON Web Token (JWT) String for Security Audit:
            </label>
            <span className="text-gray-400 text-xs font-mono">Format: [Header].[Payload].[Signature]</span>
          </div>

          <textarea
            value={tokenInput}
            onChange={(e) => setTokenInput(e.target.value)}
            rows={4}
            placeholder="eyJhbGciOiJIUzI1Ni..."
            className="w-full p-4 bg-surface-950 border border-white/10 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-matrix-400 break-all"
          />

          <div className="flex flex-col sm:flex-row gap-3 items-center">
            <div className="flex-1 w-full relative">
              <Key className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5 pointer-events-none" />
              <input
                type="text"
                value={secretInput}
                onChange={(e) => setSecretInput(e.target.value)}
                placeholder="Optional HMAC Secret for Brute-Force Check (e.g. secret, 123456)"
                className="w-full pl-10 pr-4 py-2.5 bg-surface-950 border border-white/10 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-matrix-400"
              />
            </div>
            <button
              type="submit"
              className="px-8 py-3 bg-matrix-400 hover:bg-matrix-300 text-black font-mono font-bold text-xs uppercase rounded-xl transition-all shadow-[0_0_20px_rgba(0,255,156,0.3)] shrink-0 cursor-pointer w-full sm:w-auto"
            >
              Audit JWT Security
            </button>
          </div>
        </form>

        {parseError && (
          <div className="p-4 bg-red-950/80 border border-red-500/30 rounded-2xl text-red-300 text-xs font-mono flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
            <span>{parseError}</span>
          </div>
        )}
      </div>

      {/* Audit Output Workspace */}
      {auditResult && (
        <div className="p-8 bg-surface-900 border border-white/10 rounded-3xl space-y-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <span className="text-xs font-mono text-gray-400 uppercase">Token Security Score</span>
              <div className="flex items-center gap-3">
                <span className={`text-3xl font-bold font-display ${auditResult.score >= 80 ? 'text-matrix-400' : auditResult.score >= 50 ? 'text-amber-400' : 'text-red-500'}`}>
                  {auditResult.score} / 100
                </span>
                <span className="text-xs font-mono text-cyan-400 px-2.5 py-1 bg-surface-950 border border-white/10 rounded-lg">
                  ALG: {auditResult.algorithm}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={copyDecodedJson}
              className="px-4 py-2.5 bg-surface-950 border border-white/10 hover:border-matrix-400 text-xs font-mono text-gray-300 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-matrix-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied JSON' : 'Export Audit JSON'}</span>
            </button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 bg-surface-950 border border-white/5 rounded-2xl">
              <span className="text-gray-500 uppercase block mb-1">Subject (sub)</span>
              <span className="font-bold text-white block truncate">{auditResult.subject}</span>
            </div>
            <div className="p-4 bg-surface-950 border border-white/5 rounded-2xl">
              <span className="text-gray-500 uppercase block mb-1">Issued At (iat)</span>
              <span className="font-bold text-matrix-400 block text-[11px]">{auditResult.issuedAt}</span>
            </div>
            <div className="p-4 bg-surface-950 border border-white/5 rounded-2xl">
              <span className="text-gray-500 uppercase block mb-1">Expires At (exp)</span>
              <span className="font-bold text-cyan-400 block text-[11px]">{auditResult.expiresAt}</span>
            </div>
          </div>

          {/* Tab Selection */}
          <div className="flex gap-2 border-b border-white/5 pb-3 font-mono text-xs">
            {['audit', 'header', 'payload'].map(tab => (
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

          {/* Audit Findings */}
          {activeTab === 'audit' && (
            <div className="space-y-3 font-mono text-xs">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Identified Security Risks &amp; Claim Vulnerabilities</h3>
              {auditResult.findings.length === 0 ? (
                <div className="p-4 bg-matrix-400/10 border border-matrix-400/20 text-matrix-400 rounded-2xl flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>No critical JWT security flaws detected in this token structure.</span>
                </div>
              ) : (
                auditResult.findings.map((item, idx) => (
                  <div key={idx} className="p-4 bg-surface-950 border border-white/10 rounded-2xl space-y-1.5">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className={`w-4 h-4 ${item.severity === 'Critical' ? 'text-red-500' : item.severity === 'High' ? 'text-amber-400' : 'text-yellow-300'}`} />
                      <span className="font-bold text-white">[{item.severity}] {item.title}</span>
                    </div>
                    <p className="text-gray-400 pl-6 font-sans text-xs">{item.desc}</p>
                    {item.remediation && (
                      <div className="ml-6 p-2.5 bg-black/50 border border-white/5 rounded-xl text-matrix-400 text-[11px]">
                        <span className="text-gray-400 font-sans block text-[10px]">Remediation Action:</span>
                        {item.remediation}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {/* Decoded Header View */}
          {activeTab === 'header' && (
            <div className="p-5 bg-surface-950 border border-white/5 rounded-2xl space-y-2 font-mono text-xs">
              <span className="text-matrix-400 uppercase font-bold block mb-2">Decoded JOSE Header (JSON)</span>
              <pre className="text-gray-200 bg-black/60 p-4 rounded-xl border border-white/5 overflow-x-auto">
                {JSON.stringify(headerObj, null, 2)}
              </pre>
            </div>
          )}

          {/* Decoded Payload View */}
          {activeTab === 'payload' && (
            <div className="p-5 bg-surface-950 border border-white/5 rounded-2xl space-y-2 font-mono text-xs">
              <span className="text-cyan-400 uppercase font-bold block mb-2">Decoded Claims Payload (JSON)</span>
              <pre className="text-gray-200 bg-black/60 p-4 rounded-xl border border-white/5 overflow-x-auto">
                {JSON.stringify(payloadObj, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}

      <SemanticToolLinks currentTool="ssl-checker" />
    </div>
  );
}
