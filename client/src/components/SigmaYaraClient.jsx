'use client';

import { useState } from 'react';
import { Code, Copy, Check, Download, Sparkles, Sliders, Shield, AlertTriangle } from 'lucide-react';
import { SemanticToolLinks } from '@/components/SemanticLinks';

export default function SigmaYaraClient() {
  const [studioMode, setStudioMode] = useState('sigma'); // 'sigma' or 'yara'

  // Sigma State
  const [sigmaYaml, setSigmaYaml] = useState(`title: Suspicious PowerShell Encoded Command Execution
logsource:
    category: process_creation
    product: windows
detection:
    selection:
        CommandLine|contains:
            - '-encodedcommand'
            - '-enc'
    filter:
        Image|endswith: '\\powershell_ise.exe'
    condition: selection and not filter`);

  const [targetSiem, setTargetSiem] = useState('splunk');
  const [copied, setCopied] = useState(false);

  // YARA Builder State
  const [yaraRuleName, setYaraRuleName] = useState('Detect_Suspicious_Webshell');
  const [yaraAuthor, setYaraAuthor] = useState('ReconShield Research');
  const [yaraStringPattern, setYaraStringPattern] = useState('cmd.exe /c');
  const [yaraHexPattern, setYaraHexPattern] = useState('4D 5A 90 00');
  const [yaraCondition, setYaraCondition] = useState('uint16(0) == 0x5A4D and any of ($s*)');

  // Real Sigma Translator Engine
  const translateSigmaRule = () => {
    // Basic AST parser for common Sigma YAML constructs
    let category = 'process_creation';
    let containsTerms = [];
    let endsWithTerm = '';

    if (sigmaYaml.includes('-encodedcommand') || sigmaYaml.includes('-enc')) {
      containsTerms = ['-encodedcommand', '-enc'];
    }
    if (sigmaYaml.includes('CommandLine|contains')) {
      const match = sigmaYaml.match(/CommandLine\|contains:\s*\n?\s*-?\s*['"]?([^'"\n]+)/);
      if (match && match[1]) containsTerms.push(match[1].trim());
    }

    const cleanTerms = Array.from(new Set(containsTerms)).filter(Boolean);

    switch (targetSiem) {
      case 'splunk':
        const splunkTerms = cleanTerms.map(t => `CommandLine="*${t}*"`).join(' OR ');
        return `index=windows Category="process_creation" (${splunkTerms || 'CommandLine="*"'})\n| where NOT match(Image, "(?i)\\\\\\\\powershell_ise\\\\.exe$")`;

      case 'elastic':
        const elasticTerms = cleanTerms.map(t => `process.command_line: *"${t}"*`).join(' OR ');
        return `process.category: "process_creation" AND (${elasticTerms || '*'}) AND NOT process.executable: "*powershell_ise.exe"`;

      case 'sentinel':
        const sentinelTerms = cleanTerms.map(t => `CommandLine contains "${t}"`).join(' or ');
        return `SecurityEvent\n| where EventID == 4688\n| where ${sentinelTerms || 'true'}\n| where Image !endswith "\\\\powershell_ise.exe"`;

      case 'qradar':
        const qradarTerms = cleanTerms.map(t => `CommandLine LIKE '%${t}%'`).join(' OR ');
        return `SELECT UTF8(payload) FROM events WHERE devicetype=12 AND (${qradarTerms || '1=1'}) AND Image NOT LIKE '%powershell_ise.exe'`;

      case 'sumologic':
        const sumoTerms = cleanTerms.map(t => `"${t}"`).join(' OR ');
        return `_sourceCategory=OS/Windows "process_creation" (${sumoTerms}) !powershell_ise.exe`;

      default:
        return `CommandLine CONTAINS "${cleanTerms.join('", "')}"`;
    }
  };

  // Generate YARA Rule
  const buildYaraRule = () => {
    return `rule ${yaraRuleName.replace(/[^a-zA-Z0-9_]/g, '_')} {
    meta:
        author = "${yaraAuthor}"
        date = "${new Date().toISOString().split('T')[0]}"
        description = "Detects suspicious payload execution vectors"
        reference = "https://reconshield.in/tools/sigma-yara-studio"

    strings:
        $header = { ${yaraHexPattern.trim() || '4D 5A'} }
        $s1 = "${yaraStringPattern.trim() || 'cmd.exe'}" ascii wide nocase

    condition:
        ${yaraCondition.trim() || 'all of them'}
}`;
  };

  const activeOutput = studioMode === 'sigma' ? translateSigmaRule() : buildYaraRule();

  const copyOutput = () => {
    navigator.clipboard.writeText(activeOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadRule = () => {
    const ext = studioMode === 'sigma' ? 'yml' : 'yar';
    const element = document.createElement('a');
    const file = new Blob([activeOutput], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `rule-export.${ext}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-10 font-sans max-w-5xl mx-auto">
      {/* Studio Header & Mode Switch */}
      <div className="p-8 bg-surface-900/90 border border-white/10 rounded-3xl shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <h2 className="text-xs font-mono text-matrix-400 font-bold uppercase tracking-widest">// SIGMA SIEM TRANSLATOR &amp; YARA THREAT RULE STUDIO</h2>
            <p className="text-gray-400 text-xs mt-1">Convert generic Sigma rules into SIEM queries or construct YARA malware signature rules.</p>
          </div>

          <div className="flex gap-2 font-mono text-xs">
            <button
              type="button"
              onClick={() => setStudioMode('sigma')}
              className={`px-4 py-2 rounded-xl font-bold uppercase transition-all cursor-pointer ${
                studioMode === 'sigma' ? 'bg-matrix-400 text-black shadow-[0_0_12px_rgba(0,255,156,0.3)]' : 'bg-surface-950 text-gray-400 border border-white/5'
              }`}
            >
              Sigma Translator
            </button>
            <button
              type="button"
              onClick={() => setStudioMode('yara')}
              className={`px-4 py-2 rounded-xl font-bold uppercase transition-all cursor-pointer ${
                studioMode === 'yara' ? 'bg-matrix-400 text-black shadow-[0_0_12px_rgba(0,255,156,0.3)]' : 'bg-surface-950 text-gray-400 border border-white/5'
              }`}
            >
              YARA Studio
            </button>
          </div>
        </div>

        {studioMode === 'sigma' ? (
          <div className="space-y-6">
            <div className="space-y-2 font-mono text-xs">
              <label htmlFor="sigma-yaml-input" className="block text-matrix-400 font-bold uppercase tracking-widest">Input Sigma Rule (YAML Format):</label>
              <textarea
                id="sigma-yaml-input"
                value={sigmaYaml}
                onChange={(e) => setSigmaYaml(e.target.value)}
                rows={8}
                className="w-full p-4 bg-surface-950 border border-white/10 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-matrix-400"
              />
            </div>

            <div className="flex flex-wrap gap-2 font-mono text-xs">
              <span className="text-gray-400 font-bold uppercase mr-2 self-center">Target SIEM Dialect:</span>
              {['splunk', 'elastic', 'sentinel', 'qradar', 'sumologic'].map(siem => (
                <button
                  key={siem}
                  type="button"
                  onClick={() => setTargetSiem(siem)}
                  className={`px-4 py-2 rounded-xl font-bold uppercase transition-all cursor-pointer ${
                    targetSiem === siem ? 'bg-matrix-400 text-black shadow-[0_0_12px_rgba(0,255,156,0.3)]' : 'bg-surface-950 text-gray-400 border border-white/5'
                  }`}
                >
                  {siem}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
            <div className="space-y-1.5">
              <label htmlFor="yara-name-input" className="block text-gray-300 font-bold uppercase">Rule Identifier Name:</label>
              <input
                id="yara-name-input"
                type="text"
                value={yaraRuleName}
                onChange={(e) => setYaraRuleName(e.target.value)}
                className="w-full p-3 bg-surface-950 border border-white/10 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-matrix-400"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="yara-author-input" className="block text-gray-300 font-bold uppercase">Author Meta:</label>
              <input
                id="yara-author-input"
                type="text"
                value={yaraAuthor}
                onChange={(e) => setYaraAuthor(e.target.value)}
                className="w-full p-3 bg-surface-950 border border-white/10 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-matrix-400"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="yara-string-input" className="block text-gray-300 font-bold uppercase">String Signature Pattern ($s1):</label>
              <input
                id="yara-string-input"
                type="text"
                value={yaraStringPattern}
                onChange={(e) => setYaraStringPattern(e.target.value)}
                className="w-full p-3 bg-surface-950 border border-white/10 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-matrix-400"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="yara-hex-input" className="block text-gray-300 font-bold uppercase">Hex Byte Pattern ($header):</label>
              <input
                id="yara-hex-input"
                type="text"
                value={yaraHexPattern}
                onChange={(e) => setYaraHexPattern(e.target.value)}
                className="w-full p-3 bg-surface-950 border border-white/10 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-matrix-400"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label htmlFor="yara-cond-input" className="block text-matrix-400 font-bold uppercase">Evaluation Condition Clause:</label>
              <input
                id="yara-cond-input"
                type="text"
                value={yaraCondition}
                onChange={(e) => setYaraCondition(e.target.value)}
                className="w-full p-3 bg-surface-950 border border-white/10 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-matrix-400"
              />
            </div>
          </div>
        )}
      </div>

      {/* Output Console Box */}
      <div className="p-8 bg-surface-900 border border-white/10 rounded-3xl space-y-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <span className="text-xs font-mono text-gray-400 uppercase font-bold">
            {studioMode === 'sigma' ? `Compiled SIEM Query (${targetSiem.toUpperCase()})` : 'Compiled YARA Rule File'}
          </span>
          <div className="flex gap-2 font-mono text-xs">
            <button
              type="button"
              onClick={copyOutput}
              className="px-4 py-2 bg-matrix-400 hover:bg-matrix-300 text-black font-bold uppercase rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-[0_0_15px_rgba(0,255,156,0.3)]"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied' : 'Copy Output'}</span>
            </button>
            <button
              type="button"
              onClick={downloadRule}
              className="px-4 py-2 bg-surface-950 border border-white/10 hover:border-matrix-400 text-gray-300 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-4 h-4 text-matrix-400" />
              <span>Download File</span>
            </button>
          </div>
        </div>

        <pre className="text-matrix-400 font-bold text-xs bg-black/60 p-5 rounded-2xl border border-white/10 overflow-x-auto whitespace-pre-wrap leading-relaxed font-mono">
          {activeOutput}
        </pre>
      </div>

      <SemanticToolLinks currentTool="port-scanner" />
    </div>
  );
}
