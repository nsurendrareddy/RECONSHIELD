'use client';

import { useState } from 'react';
import { Shield, Copy, Check, RefreshCw, FileText, Download, Code, Sparkles, Filter } from 'lucide-react';
import { SemanticToolLinks } from '@/components/SemanticLinks';

export default function IocDefangClient() {
  const [input, setInput] = useState(
    `http://malicious-phish.com/payload.exe\nhttps://evil-c2.org/api/steal\n192.168.1.100\n10.0.0.5:8080\nbadactor@cybercrime-gang.ru\ne3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855\n44d88612fea8a8f36de82e1278abb02f`
  );
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState('defang'); // 'defang', 'refang', 'extractor', 'stix'
  const [copiedStix, setCopiedStix] = useState(false);

  // Defang logic
  const defangText = (text) => {
    return text
      .replace(/https:\/\//gi, 'hxxps://')
      .replace(/http:\/\//gi, 'hxxp://')
      .replace(/ftp:\/\//gi, 'fxp://')
      .replace(/@/g, '[at]')
      .replace(/\./g, '[.]');
  };

  // Refang logic
  const refangText = (text) => {
    return text
      .replace(/hxxps:\/\//gi, 'https://')
      .replace(/hxxp:\/\//gi, 'http://')
      .replace(/fxp:\/\//gi, 'ftp://')
      .replace(/\[at\]|\(at\)|\{at\}|\[AT\]/g, '@')
      .replace(/\[\.\]|\(\.\)|\{\.\}|\[dot\]|\[DOT\]/g, '.');
  };

  // IOC Extractor Regex Parser
  const extractIocs = (text) => {
    const ipv4Regex = /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/g;
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;
    const urlRegex = /\b(?:https?|ftp|hxxps?):\/\/[^\s/$.?#].[^\s]*\b/g;
    const sha256Regex = /\b[A-Fa-f0-9]{64}\b/g;
    const md5Regex = /\b[A-Fa-f0-9]{32}\b/g;

    const ips = Array.from(new Set(text.match(ipv4Regex) || []));
    const emails = Array.from(new Set(text.match(emailRegex) || []));
    const urls = Array.from(new Set(text.match(urlRegex) || []));
    const sha256s = Array.from(new Set(text.match(sha256Regex) || []));
    const md5s = Array.from(new Set(text.match(md5Regex) || [])).filter(h => !sha256s.some(s => s.includes(h)));

    return { ips, emails, urls, sha256s, md5s };
  };

  const extracted = extractIocs(input);

  // STIX 2.1 JSON Bundle Generator
  const generateStixBundle = () => {
    const timestamp = new Date().toISOString();
    const bundleId = `bundle--${crypto.randomUUID ? crypto.randomUUID() : 'b8d91f2c-4903-4f9e-a81d-93a059b817b1'}`;
    const objects = [];

    extracted.ips.forEach(ip => {
      objects.push({
        type: 'indicator',
        spec_version: '2.1',
        id: `indicator--${crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2)}`,
        created: timestamp,
        modified: timestamp,
        name: `Malicious IPv4: ${ip}`,
        pattern: `[ipv4-addr:value = '${ip}']`,
        pattern_type: 'stix',
        valid_from: timestamp
      });
    });

    extracted.urls.forEach(url => {
      const cleanUrl = refangText(url);
      objects.push({
        type: 'indicator',
        spec_version: '2.1',
        id: `indicator--${crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2)}`,
        created: timestamp,
        modified: timestamp,
        name: `Malicious URL: ${cleanUrl}`,
        pattern: `[url:value = '${cleanUrl}']`,
        pattern_type: 'stix',
        valid_from: timestamp
      });
    });

    extracted.sha256s.forEach(hash => {
      objects.push({
        type: 'indicator',
        spec_version: '2.1',
        id: `indicator--${crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2)}`,
        created: timestamp,
        modified: timestamp,
        name: `Malicious SHA256: ${hash}`,
        pattern: `[file:hashes.'SHA-256' = '${hash}']`,
        pattern_type: 'stix',
        valid_from: timestamp
      });
    });

    return JSON.stringify({
      type: 'bundle',
      id: bundleId,
      spec_version: '2.1',
      objects
    }, null, 2);
  };

  const stixJson = generateStixBundle();

  const getOutputText = () => {
    if (mode === 'defang') return defangText(input);
    if (mode === 'refang') return refangText(input);
    if (mode === 'stix') return stixJson;
    return input;
  };

  const output = getOutputText();

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadFile = (filename, content, type) => {
    const element = document.createElement('a');
    const file = new Blob([content], { type });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-10 font-sans max-w-5xl mx-auto">
      {/* Controls Container */}
      <div className="p-8 bg-surface-900/90 border border-white/10 rounded-3xl shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <h2 className="text-xs font-mono text-matrix-400 font-bold uppercase tracking-widest">// IOC DEFANG, REFANG &amp; STIX 2.1 THREAT INTEL GENERATOR</h2>
            <p className="text-gray-400 text-xs mt-1">Sanitize malicious indicators for safe sharing or convert them into STIX 2.1 JSON CTI bundles.</p>
          </div>

          <div className="flex flex-wrap gap-2 font-mono text-xs">
            {['defang', 'refang', 'extractor', 'stix'].map(m => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`px-4 py-2 rounded-xl font-bold uppercase transition-all cursor-pointer ${
                  mode === m ? 'bg-matrix-400 text-black shadow-[0_0_12px_rgba(0,255,156,0.3)]' : 'bg-surface-950 text-gray-400 border border-white/5'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
          {/* Input Box */}
          <div className="space-y-2">
            <label htmlFor="raw-ioc-input" className="block text-gray-300 font-bold uppercase">Raw Input Indicators (URLs, IPs, Emails, Hashes):</label>
            <textarea
              id="raw-ioc-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={10}
              placeholder="Paste raw log lines or IOC lists..."
              className="w-full p-4 bg-surface-950 border border-white/10 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-matrix-400"
            />
          </div>

          {/* Output Box / Extractor View */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-matrix-400 font-bold uppercase">Processed Output ({mode.toUpperCase()}):</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={copyOutput}
                  className="px-3 py-1 bg-surface-950 border border-white/10 text-matrix-400 hover:border-matrix-400 text-xs rounded-lg transition-all flex items-center gap-1 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
                {mode === 'stix' && (
                  <button
                    type="button"
                    onClick={() => downloadFile('stix-2.1-bundle.json', stixJson, 'application/json')}
                    className="px-3 py-1 bg-matrix-400/10 border border-matrix-400/30 text-matrix-400 text-xs rounded-lg transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>STIX JSON</span>
                  </button>
                )}
              </div>
            </div>

            {mode === 'extractor' ? (
              <div className="p-4 bg-black/60 border border-white/10 rounded-xl space-y-4 font-mono text-xs max-h-[220px] overflow-y-auto">
                <div>
                  <span className="text-gray-400 uppercase block mb-1">Extracted IPv4 Addresses ({extracted.ips.length})</span>
                  <div className="flex flex-wrap gap-1.5">
                    {extracted.ips.map((ip, i) => <span key={i} className="px-2 py-0.5 bg-surface-900 border border-white/10 rounded text-cyan-400">{ip}</span>)}
                  </div>
                </div>
                <div>
                  <span className="text-gray-400 uppercase block mb-1">Extracted URLs ({extracted.urls.length})</span>
                  <div className="space-y-1">
                    {extracted.urls.map((url, i) => <p key={i} className="text-matrix-400 truncate">{url}</p>)}
                  </div>
                </div>
                <div>
                  <span className="text-gray-400 uppercase block mb-1">Extracted SHA256 Hashes ({extracted.sha256s.length})</span>
                  <div className="space-y-1">
                    {extracted.sha256s.map((hash, i) => <p key={i} className="text-amber-400 truncate">{hash}</p>)}
                  </div>
                </div>
              </div>
            ) : (
              <textarea
                readOnly
                value={output}
                rows={10}
                className="w-full p-4 bg-black/60 border border-white/10 rounded-xl text-matrix-400 font-mono text-xs focus:outline-none leading-relaxed"
              />
            )}
          </div>
        </div>
      </div>

      <SemanticToolLinks currentTool="vulnerability-scanner" />
    </div>
  );
}
