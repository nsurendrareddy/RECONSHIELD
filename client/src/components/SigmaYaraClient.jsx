'use client';

import { useState } from 'react';
import { Code, Copy, Check } from 'lucide-react';
import { SemanticToolLinks } from '@/components/SemanticLinks';

export default function SigmaYaraClient() {
  const [sigmaYaml, setSigmaYaml] = useState(`title: Suspicious PowerShell Execution
logsource:
    category: process_creation
    product: windows
detection:
    selection:
        CommandLine|contains: '-encodedcommand'
    condition: selection`);
  const [targetSiem, setTargetSiem] = useState('splunk');
  const [copied, setCopied] = useState(false);

  const getTranslatedSiemQuery = () => {
    switch (targetSiem) {
      case 'splunk':
        return `index=windows Category="process_creation" CommandLine="*-encodedcommand*"`;
      case 'elastic':
        return `process.command_line: *\-encodedcommand*`;
      case 'sentinel':
        return `SecurityEvent | where EventID == 4688 | where CommandLine contains "-encodedcommand"`;
      default:
        return `CommandLine CONTAINS "-encodedcommand"`;
    }
  };

  const output = getTranslatedSiemQuery();

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-10 font-sans max-w-5xl mx-auto">
      <div className="p-8 bg-surface-900/90 border border-white/10 rounded-3xl shadow-2xl space-y-6">
        <div className="space-y-4 font-mono text-xs">
          <label className="block text-matrix-400 font-bold uppercase tracking-widest">Input Sigma Detection Rule (YAML):</label>
          <textarea
            value={sigmaYaml}
            onChange={(e) => setSigmaYaml(e.target.value)}
            rows={7}
            className="w-full p-4 bg-surface-950 border border-white/10 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-matrix-400"
          />
        </div>

        <div className="flex gap-2 font-mono text-xs">
          {['splunk', 'elastic', 'sentinel'].map(siem => (
            <button
              key={siem}
              onClick={() => setTargetSiem(siem)}
              className={`px-4 py-2 rounded-xl font-bold uppercase transition-all ${
                targetSiem === siem ? 'bg-matrix-400 text-black' : 'bg-surface-950 text-gray-400 border border-white/5'
              }`}
            >
              Translate to {siem}
            </button>
          ))}
        </div>

        <div className="p-6 bg-black/60 border border-white/10 rounded-2xl space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 uppercase">Target SIEM Query ({targetSiem.toUpperCase()}):</span>
            <button
              onClick={copyOutput}
              className="px-3 py-1 bg-surface-950 border border-white/10 text-matrix-400 hover:border-matrix-400 text-xs rounded-lg transition-all flex items-center gap-1"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <pre className="text-matrix-400 font-bold text-sm bg-surface-950 p-4 rounded-xl border border-white/5 overflow-x-auto">
            {output}
          </pre>
        </div>
      </div>
      <SemanticToolLinks currentTool="port-scanner" />
    </div>
  );
}
