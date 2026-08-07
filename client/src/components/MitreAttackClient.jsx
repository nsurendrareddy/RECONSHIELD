'use client';

import { useState } from 'react';
import { Network, Search, ArrowRight, ShieldAlert, Check, Copy, Download, Info, X, ExternalLink } from 'lucide-react';
import { SemanticToolLinks } from '@/components/SemanticLinks';

export default function MitreAttackClient() {
  const [selectedTactic, setSelectedTactic] = useState('Initial Access');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTechnique, setActiveTechnique] = useState(null);
  const [copied, setCopied] = useState(false);

  // MITRE ATT&CK Matrix Data
  const matrixData = {
    'Reconnaissance': [
      { id: 'T1595', name: 'Active Scanning', desc: 'Adversaries may execute active scans to gather victim infrastructure information.', platforms: ['Windows', 'Linux', 'macOS'], dataSources: ['Network Traffic: Network Connection'] },
      { id: 'T1592', name: 'Gather Victim Host Information', desc: 'Adversaries may gather information about the target system specs and OS versions.', platforms: ['Windows', 'Linux'], dataSources: ['Host Status: Ping'] },
      { id: 'T1589', name: 'Gather Victim Identity Info', desc: 'Collecting employee emails, credentials, and social media footprints for spearphishing.', platforms: ['PRE'], dataSources: ['OSINT Datasets'] }
    ],
    'Resource Development': [
      { id: 'T1583', name: 'Acquire Infrastructure', desc: 'Purchasing domain names, VPS servers, or SSL certificates for command and control.', platforms: ['PRE'], dataSources: ['Domain Registration'] },
      { id: 'T1587', name: 'Develop Capabilities', desc: 'Developing custom exploits, webshells, malware payloads, or obfuscation scripts.', platforms: ['PRE'], dataSources: ['File Creation'] }
    ],
    'Initial Access': [
      { id: 'T1566', name: 'Phishing', desc: 'Adversaries may send spearphishing emails with malicious attachments or links.', platforms: ['Windows', 'Linux', 'macOS'], dataSources: ['Application Log: Email Gateway'] },
      { id: 'T1190', name: 'Exploit Public-Facing Application', desc: 'Exploiting software vulnerabilities in internet-connected web applications or firewalls.', platforms: ['Windows', 'Linux'], dataSources: ['Application Log: Web Server'] },
      { id: 'T1078', name: 'Valid Accounts', desc: 'Adversaries may obtain and leverage credentials of existing domain users or admins.', platforms: ['Windows', 'Linux', 'Cloud'], dataSources: ['User Account: Authentication'] }
    ],
    'Execution': [
      { id: 'T1059', name: 'Command and Scripting Interpreter', desc: 'Executing malicious commands via PowerShell, CMD, Bash, or Python scripts.', platforms: ['Windows', 'Linux', 'macOS'], dataSources: ['Process: Process Creation'] },
      { id: 'T1204', name: 'User Execution', desc: 'Tricking users into executing a malicious payload file or double-clicking an executable.', platforms: ['Windows', 'macOS'], dataSources: ['Process: Process Creation'] }
    ],
    'Persistence': [
      { id: 'T1053', name: 'Scheduled Task/Cron', desc: 'Configuring cron jobs or Windows Scheduled Tasks to execute malware periodically.', platforms: ['Windows', 'Linux'], dataSources: ['Scheduled Task: Task Creation'] },
      { id: 'T1547', name: 'Boot or Logon Autostart Execution', desc: 'Adding registry Run keys or Startup folder shortcuts to maintain access across reboots.', platforms: ['Windows'], dataSources: ['Windows Registry: Registry Key Modification'] }
    ],
    'Privilege Escalation': [
      { id: 'T1068', name: 'Exploitation for Privilege Escalation', desc: 'Exploiting OS kernel vulnerabilities to escalate from local user to SYSTEM/root.', platforms: ['Windows', 'Linux'], dataSources: ['Process: Process Creation'] },
      { id: 'T1548', name: 'Abuse Elevation Control Mechanism', desc: 'Bypassing Windows UAC or abusing SUID binaries on Linux systems.', platforms: ['Windows', 'Linux'], dataSources: ['Command: Command Execution'] }
    ],
    'Defense Evasion': [
      { id: 'T1027', name: 'Obfuscated Files or Information', desc: 'Encoding or encrypting payloads using Base64 or custom XOR routines to bypass EDR.', platforms: ['Windows', 'Linux'], dataSources: ['File: File Modification'] },
      { id: 'T1055', name: 'Process Injection', desc: 'Injecting malicious shellcode into legitimate processes (e.g. svchost.exe) to conceal execution.', platforms: ['Windows'], dataSources: ['Process: Process Access'] }
    ],
    'Credential Access': [
      { id: 'T1003', name: 'OS Credential Dumping', desc: 'Dumping LSASS memory or reading SAM database files to extract password hashes.', platforms: ['Windows', 'Linux'], dataSources: ['Process: Process Access'] },
      { id: 'T1555', name: 'Credentials from Password Stores', desc: 'Extracting saved passwords from web browsers (Chrome, Firefox) or password managers.', platforms: ['Windows', 'macOS'], dataSources: ['File: File Access'] }
    ],
    'Lateral Movement': [
      { id: 'T1021', name: 'Remote Services (SMB/RDP/SSH)', desc: 'Moving laterally across internal networks using PsExec, RDP sessions, or SSH keys.', platforms: ['Windows', 'Linux'], dataSources: ['Network Traffic: Network Connection'] }
    ],
    'Command and Control': [
      { id: 'T1071', name: 'Application Layer Protocol', desc: 'Exfiltrating data or receiving C2 commands over standard HTTP, HTTPS, or DNS traffic.', platforms: ['Windows', 'Linux'], dataSources: ['Network Traffic: Application Log'] }
    ],
    'Impact': [
      { id: 'T1486', name: 'Data Encrypted for Impact (Ransomware)', desc: 'Encrypting target system files using strong asymmetric algorithms to demand ransom.', platforms: ['Windows', 'Linux'], dataSources: ['File: File Modification'] }
    ]
  };

  const tacticsList = Object.keys(matrixData);

  // Filtered techniques based on search
  const currentTechniques = matrixData[selectedTactic] || [];
  const filteredTechniques = searchQuery.trim()
    ? currentTechniques.filter(t => 
        t.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
        t.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : currentTechniques;

  // Export ATT&CK Layer JSON
  const exportLayerJson = () => {
    const layer = {
      name: "ReconShield ATT&CK Matrix Layer",
      domain: "enterprise-attack",
      version: "4.5",
      techniques: currentTechniques.map(t => ({
        techniqueID: t.id,
        score: 1,
        enabled: true
      }))
    };
    navigator.clipboard.writeText(JSON.stringify(layer, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-10 font-sans max-w-5xl mx-auto">
      {/* Matrix Navigation Control */}
      <div className="p-8 bg-surface-900/90 border border-white/10 rounded-3xl shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <h2 className="text-xs font-mono text-matrix-400 font-bold uppercase tracking-widest">// ENTERPRISE MITRE ATT&amp;CK V15 NAVIGATOR MATRIX</h2>
            <p className="text-gray-400 text-xs mt-1">Explore adversary Tactics, Techniques, and Procedures (TTPs) and detection mitigations.</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-500 absolute left-3 top-2.5 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search TTP ID (e.g. T1566)..."
                className="pl-9 pr-3 py-1.5 bg-surface-950 border border-white/10 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-matrix-400"
              />
            </div>
            <button
              type="button"
              onClick={exportLayerJson}
              className="px-4 py-2 bg-matrix-400 hover:bg-matrix-300 text-black font-mono font-bold text-xs uppercase rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-[0_0_15px_rgba(0,255,156,0.3)] shrink-0"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied' : 'Export Layer JSON'}</span>
            </button>
          </div>
        </div>

        {/* Tactic Buttons Grid */}
        <div className="flex flex-wrap gap-2 font-mono text-xs">
          {tacticsList.map(tactic => (
            <button
              key={tactic}
              type="button"
              onClick={() => { setSelectedTactic(tactic); setSearchQuery(''); }}
              className={`px-3.5 py-2 rounded-xl uppercase font-bold transition-all cursor-pointer ${
                selectedTactic === tactic ? 'bg-matrix-400 text-black shadow-[0_0_12px_rgba(0,255,156,0.3)]' : 'bg-surface-950 text-gray-400 border border-white/5 hover:text-white'
              }`}
            >
              {tactic} ({matrixData[tactic]?.length || 0})
            </button>
          ))}
        </div>
      </div>

      {/* Techniques Display Grid */}
      <div className="p-8 bg-surface-900 border border-white/10 rounded-3xl space-y-6 shadow-2xl">
        <div className="border-b border-white/10 pb-4">
          <span className="text-xs font-mono text-gray-400 uppercase">Tactic Scope</span>
          <h3 className="text-2xl font-bold font-display text-white uppercase tracking-wide">{selectedTactic}</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs">
          {filteredTechniques.map(ttp => (
            <button
              key={ttp.id}
              type="button"
              onClick={() => setActiveTechnique(ttp)}
              className="p-5 bg-surface-950 border border-white/10 hover:border-matrix-400/50 rounded-2xl text-left space-y-2 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 bg-matrix-400/10 text-matrix-400 font-bold rounded text-[11px] border border-matrix-400/20">
                  {ttp.id}
                </span>
                <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-matrix-400 group-hover:translate-x-1 transition-all" />
              </div>
              <h4 className="font-bold text-white text-sm group-hover:text-matrix-400 transition-colors">{ttp.name}</h4>
              <p className="text-gray-400 font-sans text-xs line-clamp-2 leading-relaxed">{ttp.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Technique Modal / Detail Drawer */}
      {activeTechnique && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-900 border border-white/10 rounded-3xl p-8 max-w-2xl w-full space-y-6 font-mono text-xs shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-matrix-400 font-bold text-sm block">ATT&amp;CK TECHNIQUE: {activeTechnique.id}</span>
                <h3 className="text-2xl font-bold font-display text-white uppercase">{activeTechnique.name}</h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveTechnique(null)}
                className="p-2 bg-surface-950 border border-white/10 hover:border-red-500/50 rounded-xl text-gray-400 hover:text-white transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-gray-400 uppercase block mb-1">Technique Overview</span>
                <p className="text-gray-200 font-sans text-xs leading-relaxed">{activeTechnique.desc}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-surface-950 border border-white/5 rounded-xl">
                  <span className="text-gray-400 block text-[11px] uppercase mb-1">Target Platforms</span>
                  <div className="flex flex-wrap gap-1">
                    {activeTechnique.platforms.map(p => <span key={p} className="px-2 py-0.5 bg-surface-900 text-cyan-400 rounded text-[10px]">{p}</span>)}
                  </div>
                </div>

                <div className="p-3 bg-surface-950 border border-white/5 rounded-xl">
                  <span className="text-gray-400 block text-[11px] uppercase mb-1">Detection Data Sources</span>
                  <div className="flex flex-wrap gap-1">
                    {activeTechnique.dataSources.map(d => <span key={d} className="px-2 py-0.5 bg-surface-900 text-amber-400 rounded text-[10px]">{d}</span>)}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end">
              <a
                href={`https://attack.mitre.org/techniques/${activeTechnique.id.replace('.', '/')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 bg-matrix-400 hover:bg-matrix-300 text-black font-bold uppercase rounded-xl transition-all flex items-center gap-1.5"
              >
                <span>View Official MITRE Spec</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}

      <SemanticToolLinks currentTool="vulnerability-scanner" />
    </div>
  );
}
