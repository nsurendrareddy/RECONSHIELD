'use client';

import { useState } from 'react';
import { Shield, Copy, Check, RefreshCw } from 'lucide-react';
import { SemanticToolLinks } from '@/components/SemanticLinks';

export default function IocDefangClient() {
  const [input, setInput] = useState('http://malicious-domain.com/path/phish.exe\n192.168.1.100\nuser@bad-actor.org');
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState('defang');

  const getProcessedText = () => {
    if (mode === 'defang') {
      return input
        .replace(/https?:\/\//gi, 'hxxp://')
        .replace(/\./g, '[.]')
        .replace(/@/g, '[at]');
    } else {
      return input
        .replace(/hxxp:\/\//gi, 'http://')
        .replace(/\[\.\]/g, '.')
        .replace(/\[at\]/gi, '@');
    }
  };

  const output = getProcessedText();

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-10 font-sans max-w-5xl mx-auto">
      <div className="p-8 bg-surface-900/90 border border-white/10 rounded-3xl shadow-2xl space-y-6">
        <div className="flex gap-2 font-mono text-xs border-b border-white/10 pb-3">
          <button
            onClick={() => setMode('defang')}
            className={`px-4 py-2 rounded-xl font-bold uppercase transition-all ${
              mode === 'defang' ? 'bg-matrix-400 text-black' : 'bg-surface-950 text-gray-400'
            }`}
          >
            Defang Indicators
          </button>
          <button
            onClick={() => setMode('refang')}
            className={`px-4 py-2 rounded-xl font-bold uppercase transition-all ${
              mode === 'refang' ? 'bg-matrix-400 text-black' : 'bg-surface-950 text-gray-400'
            }`}
          >
            Refang Indicators
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
          <div className="space-y-2">
            <label className="block text-gray-400 font-bold uppercase">Raw Input Indicators (URLs, IPs, Emails):</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={8}
              className="w-full p-4 bg-surface-950 border border-white/10 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-matrix-400"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-gray-400 font-bold uppercase">Sanitized Output ({mode}):</label>
              <button
                onClick={copyOutput}
                className="px-3 py-1 bg-surface-950 border border-white/10 text-matrix-400 hover:border-matrix-400 text-xs rounded-lg transition-all flex items-center gap-1"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <textarea
              readOnly
              value={output}
              rows={8}
              className="w-full p-4 bg-black/60 border border-white/10 rounded-xl text-matrix-400 font-mono text-xs focus:outline-none"
            />
          </div>
        </div>
      </div>
      <SemanticToolLinks currentTool="vulnerability-scanner" />
    </div>
  );
}
