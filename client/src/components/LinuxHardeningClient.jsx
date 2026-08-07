'use client';

import { useState } from 'react';
import { Terminal, Copy, Check } from 'lucide-react';
import { SemanticToolLinks } from '@/components/SemanticLinks';

export default function LinuxHardeningClient() {
  const [sshPort, setSshPort] = useState('2222');
  const [enableUfw, setEnableUfw] = useState(true);
  const [disableRootSsh, setDisableRootSsh] = useState(true);
  const [copied, setCopied] = useState(false);

  const generateScript = () => {
    let script = `#!/bin/bash\n# ReconShield CIS Linux Hardening Script\nset -euo pipefail\n\necho "[+] Updating package repositories..."\napt-get update && apt-get upgrade -y\n\n`;

    if (disableRootSsh) {
      script += `# SSH Hardening\necho "[+] Disabling SSH root login..."\nsed -i 's/^#\\?PermitRootLogin.*/PermitRootLogin no/' /etc/ssh/sshd_config\n`;
    }

    if (sshPort !== '22') {
      script += `sed -i 's/^#\\?Port.*/Port ${sshPort}/' /etc/ssh/sshd_config\n`;
    }
    script += `systemctl restart sshd\n\n`;

    if (enableUfw) {
      script += `# UFW Firewall Setup\necho "[+] Enabling UFW Firewall..."\nufw default deny incoming\nufw default allow outgoing\nufw allow ${sshPort}/tcp\nufw --force enable\n\n`;
    }

    script += `echo "[+] Linux Hardening Complete!"\n`;
    return script;
  };

  const script = generateScript();

  const copyScript = () => {
    navigator.clipboard.writeText(script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-10 font-sans max-w-5xl mx-auto">
      <div className="p-8 bg-surface-900/90 border border-white/10 rounded-3xl shadow-2xl space-y-6">
        <div className="space-y-4 font-mono text-xs">
          <h2 className="text-matrix-400 font-bold uppercase tracking-widest">// CIS BENCHMARK HARDENING OPTIONS</h2>
          <div className="space-y-3">
            <label className="flex items-center gap-2 cursor-pointer text-gray-300">
              <input
                type="checkbox"
                checked={disableRootSsh}
                onChange={(e) => setDisableRootSsh(e.target.checked)}
                className="rounded accent-matrix-400"
              />
              <span>Disable SSH Root Login (PermitRootLogin no)</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-gray-300">
              <input
                type="checkbox"
                checked={enableUfw}
                onChange={(e) => setEnableUfw(e.target.checked)}
                className="rounded accent-matrix-400"
              />
              <span>Enable UFW Firewall &amp; Restrict Inbound Ports</span>
            </label>

            <div className="pt-2 flex items-center gap-3">
              <span className="text-gray-400">Custom SSH Port:</span>
              <input
                type="text"
                value={sshPort}
                onChange={(e) => setSshPort(e.target.value)}
                className="w-24 p-2 bg-surface-950 border border-white/10 rounded-lg text-white font-mono text-xs focus:outline-none focus:border-matrix-400"
              />
            </div>
          </div>
        </div>

        <div className="p-6 bg-black/60 border border-white/10 rounded-2xl space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 uppercase">Generated Bash Script:</span>
            <button
              onClick={copyScript}
              className="px-3 py-1 bg-surface-950 border border-white/10 text-matrix-400 hover:border-matrix-400 text-xs rounded-lg transition-all flex items-center gap-1"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Script'}</span>
            </button>
          </div>
          <pre className="text-matrix-400 font-bold text-xs bg-surface-950 p-4 rounded-xl border border-white/5 overflow-x-auto whitespace-pre-wrap">
            {script}
          </pre>
        </div>
      </div>
      <SemanticToolLinks currentTool="port-scanner" />
    </div>
  );
}
