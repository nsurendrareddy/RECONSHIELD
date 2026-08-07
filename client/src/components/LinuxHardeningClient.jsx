'use client';

import { useState } from 'react';
import { Terminal, Copy, Check, Download, Shield, Sliders, Server, Sparkles } from 'lucide-react';
import { SemanticToolLinks } from '@/components/SemanticLinks';

export default function LinuxHardeningClient() {
  const [targetOs, setTargetOs] = useState('ubuntu'); // 'ubuntu' or 'rhel'
  const [format, setFormat] = useState('bash'); // 'bash' or 'ansible'
  
  // Hardening Toggles
  const [disableRootSsh, setDisableRootSsh] = useState(true);
  const [disablePasswordAuth, setDisablePasswordAuth] = useState(true);
  const [customSshPort, setCustomSshPort] = useState('2222');
  const [enableFirewall, setEnableFirewall] = useState(true);
  const [enableSysctlHardening, setEnableSysctlHardening] = useState(true);
  const [enableAutoUpdates, setEnableAutoUpdates] = useState(true);
  const [enableAuditd, setEnableAuditd] = useState(true);
  const [disableUnusedFilesystems, setDisableUnusedFilesystems] = useState(true);

  const [copied, setCopied] = useState(false);

  // Bash Script Generator
  const generateBashScript = () => {
    let script = `#!/bin/bash\n# ReconShield Enterprise CIS Hardening Script\n# Target OS: ${targetOs.toUpperCase()}\nset -euo pipefail\n\necho "[+] Starting Enterprise Linux Hardening Sequence..."\n\n`;

    if (targetOs === 'ubuntu') {
      script += `# Package Updates\necho "[+] Updating package repositories..."\napt-get update && apt-get upgrade -y\n\n`;
      if (enableAutoUpdates) {
        script += `# Unattended Security Upgrades\necho "[+] Configuring Unattended Security Updates..."\napt-get install -y unattended-upgrades\ndpkg-reconfigure -f noninteractive unattended-upgrades\n\n`;
      }
    } else {
      script += `# Package Updates (RHEL/Rocky)\necho "[+] Updating package repositories..."\ndnf update -y\n\n`;
    }

    // SSH Hardening
    script += `# SSH Protocol Hardening\necho "[+] Hardening SSH configuration (/etc/ssh/sshd_config)..."\n`;
    if (disableRootSsh) {
      script += `sed -i 's/^#\\?PermitRootLogin.*/PermitRootLogin no/' /etc/ssh/sshd_config\n`;
    }
    if (disablePasswordAuth) {
      script += `sed -i 's/^#\\?PasswordAuthentication.*/PasswordAuthentication no/' /etc/ssh/sshd_config\n`;
    }
    if (customSshPort && customSshPort !== '22') {
      script += `sed -i 's/^#\\?Port.*/Port ${customSshPort}/' /etc/ssh/sshd_config\n`;
    }
    script += `sed -i 's/^#\\?X11Forwarding.*/X11Forwarding no/' /etc/ssh/sshd_config\n`;
    script += `sed -i 's/^#\\?MaxAuthTries.*/MaxAuthTries 3/' /etc/ssh/sshd_config\n`;
    script += `systemctl restart sshd || systemctl restart ssh\n\n`;

    // Sysctl Kernel Hardening
    if (enableSysctlHardening) {
      script += `# Kernel & Network Stack Hardening (/etc/sysctl.d/99-hardening.conf)\necho "[+] Applying sysctl security parameters..."\ncat << 'EOF' > /etc/sysctl.d/99-hardening.conf\nfs.suid_dumpable = 0\nkernel.randomize_va_space = 2\nnet.ipv4.conf.all.accept_redirects = 0\nnet.ipv4.conf.all.send_redirects = 0\nnet.ipv4.tcp_syncookies = 1\nnet.ipv4.ip_forward = 0\nnet.ipv6.conf.all.disable_ipv6 = 1\nEOF\nsysctl -p /etc/sysctl.d/99-hardening.conf\n\n`;
    }

    // Firewall
    if (enableFirewall) {
      if (targetOs === 'ubuntu') {
        script += `# UFW Firewall Enforce\necho "[+] Enabling UFW Firewall..."\nufw default deny incoming\nufw default allow outgoing\nufw allow ${customSshPort || 22}/tcp\nufw --force enable\n\n`;
      } else {
        script += `# Firewalld Enforce\necho "[+] Enabling Firewalld..."\nsystemctl enable --now firewalld\nfirewall-cmd --permanent --add-port=${customSshPort || 22}/tcp\nfirewall-cmd --reload\n\n`;
      }
    }

    // Auditd
    if (enableAuditd) {
      script += `# Auditd Service Setup\necho "[+] Installing and enabling auditd logging..."\n${targetOs === 'ubuntu' ? 'apt-get install -y auditd' : 'dnf install -y auditd'}\nsystemctl enable --now auditd\n\n`;
    }

    script += `echo "[+] Enterprise Linux Hardening Sequence Successfully Completed!"\n`;
    return script;
  };

  // Ansible Playbook Generator
  const generateAnsiblePlaybook = () => {
    return `---
- name: Enterprise CIS Linux Hardening
  hosts: all
  become: yes
  tasks:
    - name: Ensure SSH Root Login is Disabled
      lineinfile:
        path: /etc/ssh/sshd_config
        regexp: '^#?PermitRootLogin'
        line: 'PermitRootLogin no'
      notify: Restart SSH

    - name: Ensure Password Authentication is Disabled
      lineinfile:
        path: /etc/ssh/sshd_config
        regexp: '^#?PasswordAuthentication'
        line: 'PasswordAuthentication no'
      notify: Restart SSH

    - name: Set Custom SSH Port
      lineinfile:
        path: /etc/ssh/sshd_config
        regexp: '^#?Port'
        line: 'Port ${customSshPort || 22}'
      notify: Restart SSH

    - name: Apply Sysctl Kernel Security Hardening
      sysctl:
        name: "{{ item.name }}"
        value: "{{ item.value }}"
        state: present
        reload: yes
      loop:
        - { name: 'fs.suid_dumpable', value: '0' }
        - { name: 'kernel.randomize_va_space', value: '2' }
        - { name: 'net.ipv4.tcp_syncookies', value: '1' }
        - { name: 'net.ipv4.ip_forward', value: '0' }

  handlers:
    - name: Restart SSH
      service:
        name: "{{ ansible_os_family == 'Debian' | ternary('ssh', 'sshd') }}"
        state: restarted
`;
  };

  const outputScript = format === 'bash' ? generateBashScript() : generateAnsiblePlaybook();

  const copyScript = () => {
    navigator.clipboard.writeText(outputScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadScript = () => {
    const ext = format === 'bash' ? 'sh' : 'yml';
    const element = document.createElement('a');
    const file = new Blob([outputScript], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `hardening-script.${ext}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-10 font-sans max-w-5xl mx-auto">
      {/* Configuration Controls */}
      <div className="p-8 bg-surface-900/90 border border-white/10 rounded-3xl shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <h2 className="text-xs font-mono text-matrix-400 font-bold uppercase tracking-widest">// CIS BENCHMARK LINUX HARDENING GENERATOR</h2>
            <p className="text-gray-400 text-xs mt-1">Generate automated security hardening scripts for enterprise Linux servers.</p>
          </div>

          <div className="flex gap-2 font-mono text-xs">
            <button
              type="button"
              onClick={() => setFormat('bash')}
              className={`px-4 py-2 rounded-xl font-bold uppercase transition-all cursor-pointer ${
                format === 'bash' ? 'bg-matrix-400 text-black shadow-[0_0_12px_rgba(0,255,156,0.3)]' : 'bg-surface-950 text-gray-400 border border-white/5'
              }`}
            >
              Bash Script (.sh)
            </button>
            <button
              type="button"
              onClick={() => setFormat('ansible')}
              className={`px-4 py-2 rounded-xl font-bold uppercase transition-all cursor-pointer ${
                format === 'ansible' ? 'bg-matrix-400 text-black shadow-[0_0_12px_rgba(0,255,156,0.3)]' : 'bg-surface-950 text-gray-400 border border-white/5'
              }`}
            >
              Ansible Playbook (.yml)
            </button>
          </div>
        </div>

        {/* Options Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
          <div className="space-y-4">
            <span className="text-matrix-400 font-bold uppercase block tracking-wider">1. OS Target &amp; Network Hardening:</span>
            
            <div className="flex gap-3 items-center">
              <span className="text-gray-400">Target Distribution:</span>
              <button
                type="button"
                onClick={() => setTargetOs('ubuntu')}
                className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${targetOs === 'ubuntu' ? 'bg-matrix-400/10 border-matrix-400 text-matrix-400 font-bold' : 'bg-surface-950 border-white/10 text-gray-400'}`}
              >
                Ubuntu / Debian
              </button>
              <button
                type="button"
                onClick={() => setTargetOs('rhel')}
                className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${targetOs === 'rhel' ? 'bg-matrix-400/10 border-matrix-400 text-matrix-400 font-bold' : 'bg-surface-950 border-white/10 text-gray-400'}`}
              >
                RHEL / Rocky Linux
              </button>
            </div>

            <label className="flex items-center gap-2 cursor-pointer text-gray-200">
              <input
                type="checkbox"
                checked={disableRootSsh}
                onChange={(e) => setDisableRootSsh(e.target.checked)}
                className="rounded accent-matrix-400"
              />
              <span>Disable SSH Root Direct Login (PermitRootLogin no)</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-gray-200">
              <input
                type="checkbox"
                checked={disablePasswordAuth}
                onChange={(e) => setDisablePasswordAuth(e.target.checked)}
                className="rounded accent-matrix-400"
              />
              <span>Mandate SSH Key Auth (PasswordAuthentication no)</span>
            </label>

            <div className="flex items-center gap-3 pt-1">
              <label htmlFor="custom-ssh-port-input" className="text-gray-400">Custom SSH Port:</label>
              <input
                id="custom-ssh-port-input"
                type="text"
                value={customSshPort}
                onChange={(e) => setCustomSshPort(e.target.value)}
                className="w-24 p-2 bg-surface-950 border border-white/10 rounded-lg text-white font-mono text-xs focus:outline-none focus:border-matrix-400"
              />
            </div>
          </div>

          <div className="space-y-4">
            <span className="text-cyan-400 font-bold uppercase block tracking-wider">2. Kernel &amp; Service Hardening:</span>

            <label className="flex items-center gap-2 cursor-pointer text-gray-200">
              <input
                type="checkbox"
                checked={enableFirewall}
                onChange={(e) => setEnableFirewall(e.target.checked)}
                className="rounded accent-matrix-400"
              />
              <span>Enable Default Deny Firewall (UFW / Firewalld)</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-gray-200">
              <input
                type="checkbox"
                checked={enableSysctlHardening}
                onChange={(e) => setEnableSysctlHardening(e.target.checked)}
                className="rounded accent-matrix-400"
              />
              <span>Apply Kernel Security Directives (ASLR, SYN Cookies)</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-gray-200">
              <input
                type="checkbox"
                checked={enableAutoUpdates}
                onChange={(e) => setEnableAutoUpdates(e.target.checked)}
                className="rounded accent-matrix-400"
              />
              <span>Configure Unattended Security Package Upgrades</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-gray-200">
              <input
                type="checkbox"
                checked={enableAuditd}
                onChange={(e) => setEnableAuditd(e.target.checked)}
                className="rounded accent-matrix-400"
              />
              <span>Install &amp; Enable Auditd System Log Tracking</span>
            </label>
          </div>
        </div>
      </div>

      {/* Script Output Console */}
      <div className="p-8 bg-surface-900 border border-white/10 rounded-3xl space-y-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <span className="text-xs font-mono text-gray-400 uppercase font-bold">
            Generated {format === 'bash' ? 'Executable Bash Script' : 'Ansible Playbook'}
          </span>
          <div className="flex gap-2 font-mono text-xs">
            <button
              type="button"
              onClick={copyScript}
              className="px-4 py-2 bg-matrix-400 hover:bg-matrix-300 text-black font-bold uppercase rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-[0_0_15px_rgba(0,255,156,0.3)]"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied' : 'Copy Script'}</span>
            </button>
            <button
              type="button"
              onClick={downloadScript}
              className="px-4 py-2 bg-surface-950 border border-white/10 hover:border-matrix-400 text-gray-300 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-4 h-4 text-matrix-400" />
              <span>Download .{format === 'bash' ? 'sh' : 'yml'}</span>
            </button>
          </div>
        </div>

        <pre className="text-matrix-400 font-bold text-xs bg-black/60 p-5 rounded-2xl border border-white/10 overflow-x-auto whitespace-pre-wrap leading-relaxed font-mono">
          {outputScript}
        </pre>
      </div>

      <SemanticToolLinks currentTool="port-scanner" />
    </div>
  );
}
