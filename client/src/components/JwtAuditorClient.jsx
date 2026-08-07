'use client';

import { useState } from 'react';
import { Lock, ShieldAlert, Check, Copy, RefreshCw, Key } from 'lucide-react';
import { SemanticToolLinks } from '@/components/SemanticLinks';

export default function JwtAuditorClient() {
  const [token, setToken] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c');
  const [header, setHeader] = useState('');
  const [payload, setPayload] = useState('');
  const [analyzed, setAnalyzed] = useState(false);

  const analyzeToken = (e) => {
    e?.preventDefault();
    if (!token.trim()) return;

    try {
      const parts = token.trim().split('.');
      if (parts.length >= 2) {
        setHeader(JSON.stringify(JSON.parse(atob(parts[0])), null, 2));
        setPayload(JSON.stringify(JSON.parse(atob(parts[1])), null, 2));
        setAnalyzed(true);
      }
    } catch (err) {
      console.error('Invalid JWT:', err);
    }
  };

  return (
    <div className="space-y-10 font-sans max-w-5xl mx-auto">
      <div className="p-8 bg-surface-900/90 border border-white/10 rounded-3xl shadow-2xl space-y-6">
        <form onSubmit={analyzeToken} className="space-y-4">
          <label className="block text-xs font-mono text-matrix-400 font-bold uppercase tracking-widest">
            Paste JSON Web Token (JWT) String:
          </label>
          <textarea
            value={token}
            onChange={(e) => setToken(e.target.value)}
            rows={4}
            className="w-full p-4 bg-surface-950 border border-white/10 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-matrix-400 break-all"
            placeholder="eyJhbGciOiJIUzI1Ni..."
          />
          <button
            type="submit"
            className="px-6 py-3 bg-matrix-400 hover:bg-matrix-300 text-black font-mono font-bold text-xs uppercase rounded-xl transition-all shadow-[0_0_15px_rgba(0,255,156,0.3)]"
          >
            Audit JWT Security
          </button>
        </form>

        {analyzed && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs pt-4 border-t border-white/10">
            <div className="p-4 bg-surface-950 border border-white/10 rounded-2xl space-y-2">
              <span className="text-matrix-400 font-bold uppercase block">Decoded Header:</span>
              <pre className="text-gray-300 overflow-x-auto">{header}</pre>
            </div>
            <div className="p-4 bg-surface-950 border border-white/10 rounded-2xl space-y-2">
              <span className="text-cyan-400 font-bold uppercase block">Decoded Payload:</span>
              <pre className="text-gray-300 overflow-x-auto">{payload}</pre>
            </div>
          </div>
        )}
      </div>
      <SemanticToolLinks currentTool="ssl-checker" />
    </div>
  );
}
