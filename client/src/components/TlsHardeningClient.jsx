'use client';

import { useState } from 'react';
import { Lock, Copy, Check, Download, ShieldCheck, Sparkles, Sliders, Server, AlertTriangle } from 'lucide-react';
import { SemanticToolLinks } from '@/components/SemanticLinks';

export default function TlsHardeningClient() {
  const [profile, setProfile] = useState('intermediate'); // 'modern', 'intermediate', 'legacy'
  const [server, setServer] = useState('nginx'); // 'nginx', 'apache', 'haproxy', 'caddy', 'traefik'
  const [enableHsts, setEnableHsts] = useState(true);
  const [enableOcsp, setEnableOcsp] = useState(true);
  const [enableDhparam, setEnableDhparam] = useState(true);
  const [copied, setCopied] = useState(false);

  // Generate Web Server Configuration
  const generateTlsConfig = () => {
    let config = '';

    if (server === 'nginx') {
      config += `# Nginx Hardened TLS Configuration\n# Security Profile: ${profile.toUpperCase()}\n\n`;
      if (profile === 'modern') {
        config += `ssl_protocols TLSv1.3;\nssl_conf_command Ciphersuites TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:TLS_AES_128_GCM_SHA256;\n`;
      } else if (profile === 'intermediate') {
        config += `ssl_protocols TLSv1.2 TLSv1.3;\nssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;\nssl_prefer_server_ciphers off;\n`;
      } else {
        config += `ssl_protocols TLSv1.2;\nssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384;\nssl_prefer_server_ciphers on;\n`;
      }

      config += `\nssl_session_timeout 1d;\nssl_session_cache shared:MozSSL:10m;\nssl_session_tickets off;\n`;

      if (enableDhparam && profile !== 'modern') {
        config += `ssl_dhparam /etc/nginx/dhparam.pem; # Generate: openssl dhparam -out /etc/nginx/dhparam.pem 4096\n`;
      }
      if (enableHsts) {
        config += `add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;\n`;
      }
      if (enableOcsp) {
        config += `ssl_stapling on;\nssl_stapling_verify on;\nresolver 8.8.8.8 1.1.1.1 valid=300s;\nresolver_timeout 5s;\n`;
      }
    } else if (server === 'apache') {
      config += `# Apache HTTPD Hardened TLS Configuration\n# Security Profile: ${profile.toUpperCase()}\n\n`;
      if (profile === 'modern') {
        config += `SSLProtocol all -SSLv3 -TLSv1 -TLSv1.1 -TLSv1.2\n`;
      } else if (profile === 'intermediate') {
        config += `SSLProtocol all -SSLv3 -TLSv1 -TLSv1.1\nSSLCipherSuite ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384\nSSLHonorCipherOrder off\n`;
      } else {
        config += `SSLProtocol all -SSLv3 -TLSv1 -TLSv1.1\nSSLCipherSuite HIGH:!aNULL:!MD5\nSSLHonorCipherOrder on\n`;
      }

      if (enableHsts) {
        config += `Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"\n`;
      }
      if (enableOcsp) {
        config += `SSLUseStapling On\nSSLStaplingCache "shmcb:logs/ssl_stapling(32768)"\n`;
      }
    } else if (server === 'haproxy') {
      config += `# HAProxy Global TLS Configuration\nglobal\n`;
      if (profile === 'modern') {
        config += `  ssl-default-bind-curves X25519:P-256\n  ssl-default-bind-options ssl-min-ver TLSv1.3\n`;
      } else {
        config += `  ssl-default-bind-ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384\n  ssl-default-bind-options ssl-min-ver TLSv1.2\n`;
      }
    } else if (server === 'caddy') {
      config += `# Caddyfile TLS Configuration\nyourdomain.com {\n`;
      if (profile === 'modern') {
        config += `  tls {\n    protocols tls1.3\n  }\n`;
      } else {
        config += `  tls {\n    protocols tls1.2 tls1.3\n  }\n`;
      }
      config += `}`;
    }

    return config;
  };

  const configOutput = generateTlsConfig();

  // Evaluate Security Score
  const getSecurityScore = () => {
    let score = 85;
    if (profile === 'modern') score = 100;
    else if (profile === 'intermediate') score = 95;
    else score = 70;

    if (enableHsts) score += 5;
    if (enableOcsp) score += 5;

    const finalScore = Math.min(100, score);
    let grade = 'A+';
    if (finalScore < 80) grade = 'B';
    else if (finalScore < 90) grade = 'A';

    return { score: finalScore, grade };
  };

  const evalGrade = getSecurityScore();

  const copyConfig = () => {
    navigator.clipboard.writeText(configOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadConfig = () => {
    const element = document.createElement('a');
    const file = new Blob([configOutput], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `tls-hardening-${server}.conf`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-10 font-sans max-w-5xl mx-auto">
      {/* Control Workspace */}
      <div className="p-8 bg-surface-900/90 border border-white/10 rounded-3xl shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <h2 className="text-xs font-mono text-matrix-400 font-bold uppercase tracking-widest">// TLS CIPHER &amp; PROTOCOL HARDENING STUDIO</h2>
            <p className="text-gray-400 text-xs mt-1">Configure Mozilla-compliant TLS 1.3/1.2 cipher suites for enterprise web servers.</p>
          </div>

          <div className="flex gap-2 font-mono text-xs">
            {['nginx', 'apache', 'haproxy', 'caddy'].map(s => (
              <button
                key={s}
                type="button"
                onClick={() => setServer(s)}
                className={`px-4 py-2 rounded-xl font-bold uppercase transition-all cursor-pointer ${
                  server === s ? 'bg-matrix-400 text-black shadow-[0_0_12px_rgba(0,255,156,0.3)]' : 'bg-surface-950 text-gray-400 border border-white/5'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Profile Toggles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
          <div className="space-y-3">
            <span className="text-matrix-400 font-bold uppercase block tracking-wider">1. Security Compatibility Profile:</span>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => setProfile('modern')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${profile === 'modern' ? 'bg-matrix-400/10 border-matrix-400 text-matrix-400 font-bold' : 'bg-surface-950 border-white/10 text-gray-400'}`}
              >
                <span className="block font-bold text-white uppercase text-xs">Modern (TLS 1.3 Only)</span>
                <span className="text-[11px] text-gray-400 font-sans block">Maximum security. Compatible with modern browsers (Chrome 70+, Firefox 63+).</span>
              </button>

              <button
                type="button"
                onClick={() => setProfile('intermediate')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${profile === 'intermediate' ? 'bg-matrix-400/10 border-matrix-400 text-matrix-400 font-bold' : 'bg-surface-950 border-white/10 text-gray-400'}`}
              >
                <span className="block font-bold text-white uppercase text-xs">Intermediate (TLS 1.2 + 1.3) [Recommended]</span>
                <span className="text-[11px] text-gray-400 font-sans block">General-purpose security. Compatible with almost all clients while enforcing ECDHE.</span>
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <span className="text-cyan-400 font-bold uppercase block tracking-wider">2. Security Features &amp; Headers:</span>

            <label className="flex items-center gap-2 cursor-pointer text-gray-200">
              <input
                type="checkbox"
                checked={enableHsts}
                onChange={(e) => setEnableHsts(e.target.checked)}
                className="rounded accent-matrix-400"
              />
              <span>Strict-Transport-Security (HSTS Preload 1 Year)</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-gray-200">
              <input
                type="checkbox"
                checked={enableOcsp}
                onChange={(e) => setEnableOcsp(e.target.checked)}
                className="rounded accent-matrix-400"
              />
              <span>Enable OCSP Stapling (Must-Staple Verification)</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-gray-200">
              <input
                type="checkbox"
                checked={enableDhparam}
                onChange={(e) => setEnableDhparam(e.target.checked)}
                className="rounded accent-matrix-400"
              />
              <span>Include 4096-bit DHParam Directive</span>
            </label>
          </div>
        </div>
      </div>

      {/* Output Console Box */}
      <div className="p-8 bg-surface-900 border border-white/10 rounded-3xl space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <span className="text-xs font-mono text-gray-400 uppercase block">SSL Labs Rating Grade</span>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold font-display text-matrix-400">{evalGrade.score} / 100</span>
              <span className="px-2.5 py-1 bg-matrix-400/10 border border-matrix-400/30 text-matrix-400 font-mono text-xs font-bold rounded-lg">
                GRADE {evalGrade.grade}
              </span>
            </div>
          </div>

          <div className="flex gap-2 font-mono text-xs">
            <button
              type="button"
              onClick={copyConfig}
              className="px-4 py-2.5 bg-matrix-400 hover:bg-matrix-300 text-black font-bold uppercase rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-[0_0_15px_rgba(0,255,156,0.3)]"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied' : 'Copy Config'}</span>
            </button>
            <button
              type="button"
              onClick={downloadConfig}
              className="px-4 py-2.5 bg-surface-950 border border-white/10 hover:border-matrix-400 text-gray-300 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-4 h-4 text-matrix-400" />
              <span>Download .conf</span>
            </button>
          </div>
        </div>

        <pre className="text-matrix-400 font-bold text-xs bg-black/60 p-5 rounded-2xl border border-white/10 overflow-x-auto whitespace-pre-wrap leading-relaxed font-mono">
          {configOutput}
        </pre>
      </div>

      <SemanticToolLinks currentTool="ssl-checker" />
    </div>
  );
}
