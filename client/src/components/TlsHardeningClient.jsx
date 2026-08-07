'use client';

import { useState } from 'react';
import { Lock, Copy, Check } from 'lucide-react';
import { SemanticToolLinks } from '@/components/SemanticLinks';

export default function TlsHardeningClient() {
  const [profile, setProfile] = useState('modern');
  const [server, setServer] = useState('nginx');
  const [copied, setCopied] = useState(false);

  const getTlsConfig = () => {
    if (server === 'nginx') {
      if (profile === 'modern') {
        return `ssl_protocols TLSv1.3;\nssl_prefer_server_ciphers off;\nssl_session_timeout 1d;\nssl_session_cache shared:MozSSL:10m;`;
      }
      return `ssl_protocols TLSv1.2 TLSv1.3;\nssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384;\nssl_prefer_server_ciphers off;`;
    } else {
      return `SSLProtocol all -SSLv3 -TLSv1 -TLSv1.1\nSSLCipherSuite ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256`;
    }
  };

  const config = getTlsConfig();

  const copyConfig = () => {
    navigator.clipboard.writeText(config);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-10 font-sans max-w-5xl mx-auto">
      <div className="p-8 bg-surface-900/90 border border-white/10 rounded-3xl shadow-2xl space-y-6">
        <div className="flex gap-4 font-mono text-xs">
          <div className="space-y-2">
            <span className="text-gray-400 font-bold uppercase block">Security Profile:</span>
            <div className="flex gap-2">
              <button
                onClick={() => setProfile('modern')}
                className={`px-4 py-2 rounded-xl font-bold uppercase ${profile === 'modern' ? 'bg-matrix-400 text-black' : 'bg-surface-950 text-gray-400 border border-white/5'}`}
              >
                Modern (TLS 1.3 Only)
              </button>
              <button
                onClick={() => setProfile('intermediate')}
                className={`px-4 py-2 rounded-xl font-bold uppercase ${profile === 'intermediate' ? 'bg-matrix-400 text-black' : 'bg-surface-950 text-gray-400 border border-white/5'}`}
              >
                Intermediate (TLS 1.2+1.3)
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 bg-black/60 border border-white/10 rounded-2xl space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 uppercase">Generated Web Server Config Snippet:</span>
            <button
              onClick={copyConfig}
              className="px-3 py-1 bg-surface-950 border border-white/10 text-matrix-400 hover:border-matrix-400 text-xs rounded-lg transition-all flex items-center gap-1"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Config'}</span>
            </button>
          </div>
          <pre className="text-matrix-400 font-bold text-xs bg-surface-950 p-4 rounded-xl border border-white/5 overflow-x-auto whitespace-pre-wrap">
            {config}
          </pre>
        </div>
      </div>
      <SemanticToolLinks currentTool="ssl-checker" />
    </div>
  );
}
