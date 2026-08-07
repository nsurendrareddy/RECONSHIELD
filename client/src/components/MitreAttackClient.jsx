'use client';

import { useState } from 'react';
import { Network, Search, ArrowRight } from 'lucide-react';
import { SemanticToolLinks } from '@/components/SemanticLinks';

export default function MitreAttackClient() {
  const [selectedTactic, setSelectedTactic] = useState('Reconnaissance');

  const tactics = [
    { id: 'Reconnaissance', count: 10, desc: 'Gathering target organization information' },
    { id: 'Resource Development', count: 8, desc: 'Establishing infrastructure & capabilities' },
    { id: 'Initial Access', count: 12, desc: 'Gaining initial foothold in adversary network' },
    { id: 'Execution', count: 14, desc: 'Running adversary controlled code' },
    { id: 'Persistence', count: 19, desc: 'Maintaining access across system reboots' },
    { id: 'Privilege Escalation', count: 13, desc: 'Gaining higher-level permissions' },
    { id: 'Defense Evasion', count: 42, desc: 'Avoiding detection mechanisms' }
  ];

  return (
    <div className="space-y-10 font-sans max-w-5xl mx-auto">
      <div className="p-8 bg-surface-900/90 border border-white/10 rounded-3xl shadow-2xl space-y-6">
        <h2 className="text-xs font-mono text-matrix-400 font-bold uppercase tracking-widest">// ENTERPRISE ATT&amp;CK TACTIC MATRIX</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 font-mono text-xs">
          {tactics.map(tactic => (
            <button
              key={tactic.id}
              onClick={() => setSelectedTactic(tactic.id)}
              className={`p-4 rounded-2xl border text-left transition-all ${
                selectedTactic === tactic.id
                  ? 'bg-matrix-400/10 border-matrix-400 text-matrix-400 font-bold'
                  : 'bg-surface-950 border-white/5 text-gray-400 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="uppercase text-white font-bold">{tactic.id}</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-matrix-400">{tactic.count} TTPs</span>
              </div>
              <p className="text-[10px] text-gray-500 font-sans leading-tight">{tactic.desc}</p>
            </button>
          ))}
        </div>
      </div>
      <SemanticToolLinks currentTool="vulnerability-scanner" />
    </div>
  );
}
