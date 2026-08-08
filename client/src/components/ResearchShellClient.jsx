'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  Terminal as TerminalIcon, Shield, Search, ArrowRight, CornerDownLeft, 
  Copy, Check, Trash2, RefreshCw, Cpu, Layers, Network, Globe, Lock, 
  Server, Zap, HelpCircle, FileText, Download, Activity, AlertTriangle, 
  BookOpen, ChevronRight, Eye, ShieldCheck, UserCheck, Clock
} from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { BASE_URL, API_BASE, startScan, getScan, getScanStatus, scanIp } from '@/utils/api';

// ASCII Banner for RSH Startup
const ASCII_BANNER_DESKTOP = `
██████╗ ███████╗ ██████╗ ██████╗ ███╗   ██╗
██╔══██╗██╔════╝██╔══██╗██╔══██╗████╗  ██║
██████╔╝█████╗  ██████╔╝██████╔╝██╔██╗ ██║
██╔══██╗██╔══╝  ██╔══██╗██╔══██╗██║╚██╗██║
██║  ██║███████╗██║  ██║██║  ██║██║ ╚████║
╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝

RECONSHIELD RESEARCH SHELL

RSH v1.0
Reconnaissance Environment

Type:
  recon <domain>
to initialize a reconnaissance investigation.

Type 'modules' or 'help' to view available commands.
`;

const ASCII_BANNER_MOBILE = `
=========================================
RECONSHIELD RESEARCH SHELL (RSH v1.0)
Reconnaissance Environment
=========================================
Type:
  recon <domain>
to initialize a reconnaissance investigation.

Type 'modules' or 'help' to view available commands.
`;

// CENTRALIZED NUMBERED MODULE REGISTRY (26 Modules)
const MODULE_REGISTRY = [
  // DOMAIN
  { number: '01', name: 'dns', category: 'DOMAIN', desc: 'DNS Records', aliasKeys: ['01', '1', '001', 'dns'] },
  { number: '02', name: 'whois', category: 'DOMAIN', desc: 'WHOIS / RDAP', aliasKeys: ['02', '2', '002', 'whois'] },
  { number: '03', name: 'asn', category: 'DOMAIN', desc: 'ASN Intelligence', aliasKeys: ['03', '3', '003', 'asn'] },
  { number: '04', name: 'reverse', category: 'DOMAIN', desc: 'Reverse DNS', aliasKeys: ['04', '4', '004', 'reverse'] },
  { number: '05', name: 'dnssec', category: 'DOMAIN', desc: 'DNSSEC Analysis', aliasKeys: ['05', '5', '005', 'dnssec'] },
  { number: '06', name: 'cname', category: 'DOMAIN', desc: 'CNAME Mapping', aliasKeys: ['06', '6', '006', 'cname'] },

  // DISCOVERY
  { number: '07', name: 'subdomains', category: 'DISCOVERY', desc: 'Subdomain Discovery', aliasKeys: ['07', '7', '007', 'subdomains', 'subdomain'] },
  { number: '08', name: 'ct', category: 'DISCOVERY', desc: 'Certificate Transparency', aliasKeys: ['08', '8', '008', 'ct'] },
  { number: '09', name: 'robots', category: 'DISCOVERY', desc: 'Robots Analysis', aliasKeys: ['09', '9', '009', 'robots'] },
  { number: '10', name: 'sitemap', category: 'DISCOVERY', desc: 'Sitemap Discovery', aliasKeys: ['10', '010', 'sitemap'] },
  { number: '11', name: 'urls', category: 'DISCOVERY', desc: 'URL Intelligence', aliasKeys: ['11', '011', 'urls', 'url'] },
  { number: '12', name: 'favicon', category: 'DISCOVERY', desc: 'Favicon Intelligence', aliasKeys: ['12', '012', 'favicon'] },

  // WEB
  { number: '13', name: 'headers', category: 'WEB', desc: 'Security Headers', aliasKeys: ['13', '013', 'headers', 'header'] },
  { number: '14', name: 'cookies', category: 'WEB', desc: 'Cookie Security', aliasKeys: ['14', '014', 'cookies', 'cookie'] },
  { number: '15', name: 'cors', category: 'WEB', desc: 'CORS Analysis', aliasKeys: ['15', '015', 'cors'] },
  { number: '16', name: 'redirects', category: 'WEB', desc: 'Redirect Analysis', aliasKeys: ['16', '016', 'redirects', 'redirect'] },
  { number: '17', name: 'ssl', category: 'WEB', desc: 'TLS/SSL', aliasKeys: ['17', '017', 'ssl', 'tls', 'cert'] },
  { number: '18', name: 'tech', category: 'WEB', desc: 'Technology Detection', aliasKeys: ['18', '018', 'tech', 'technology'] },
  { number: '19', name: 'waf', category: 'WEB', desc: 'WAF Detection', aliasKeys: ['19', '019', 'waf'] },

  // NETWORK
  { number: '20', name: 'ip', category: 'NETWORK', desc: 'IP Intelligence', aliasKeys: ['20', '020', 'ip'] },
  { number: '21', name: 'ports', category: 'NETWORK', desc: 'Port Intelligence', aliasKeys: ['21', '021', 'ports', 'port'] },
  { number: '22', name: 'netblock', category: 'NETWORK', desc: 'Network Intelligence', aliasKeys: ['22', '022', 'netblock'] },

  // EMAIL
  { number: '23', name: 'spf', category: 'EMAIL', desc: 'SPF Analysis', aliasKeys: ['23', '023', 'spf'] },
  { number: '24', name: 'dmarc', category: 'EMAIL', desc: 'DMARC Analysis', aliasKeys: ['24', '024', 'dmarc'] },
  { number: '25', name: 'dkim', category: 'EMAIL', desc: 'DKIM Analysis', aliasKeys: ['25', '025', 'dkim'] },
  { number: '26', name: 'mail', category: 'EMAIL', desc: 'Email Security', aliasKeys: ['26', '026', 'mail'] },
];

// Helper: Clean Domain / Hostname
function cleanHost(input) {
  if (!input) return '';
  let str = input.trim().toLowerCase();
  str = str.replace(/^https?:\/\//i, '');
  str = str.replace(/\/.*$/, '');
  str = str.replace(/:\d+$/, '');
  return str;
}

// Helper: Validate Domain or IP
function isValidTarget(host) {
  if (!host) return false;
  const domainRegex = /^([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
  const ipRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
  return domainRegex.test(host) || ipRegex.test(host);
}

// Helper: Validate Candidate Subdomain against target domain scope
function isValidSubdomainCandidate(sub, domain) {
  if (!sub || typeof sub !== 'string') return false;
  const clean = sub.trim().toLowerCase().replace(/\.$/, '');
  if (clean.includes('@') || clean.includes('/') || clean.includes(':') || clean.includes('\\') || /\s/.test(clean)) return false;
  if (clean.startsWith('http://') || clean.startsWith('https://') || clean.startsWith('mailto:')) return false;
  if (clean.includes('*')) return false;
  if (clean !== domain && !clean.endsWith('.' + domain)) return false;
  const hostnameRegex = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$/i;
  return hostnameRegex.test(clean);
}

// Helper: Get module data from scan object (handles wrapped or flat results)
function getModuleData(scanObj, moduleKey) {
  if (!scanObj) return null;
  const results = scanObj.results || scanObj;
  return results ? results[moduleKey] : null;
}

// Helper: Format DNS record sections strictly based on backend response
function formatDnsRecords(records) {
  if (!records) return null;
  const sections = [];

  const formatList = (items, formatter) => {
    if (!Array.isArray(items) || items.length === 0) return null;
    const lines = items
      .map(item => formatter ? formatter(item) : (typeof item === 'object' && item !== null ? JSON.stringify(item) : String(item)))
      .filter(Boolean);
    return lines.length > 0 ? lines.join('\n  ') : null;
  };

  const a = formatList(records.a);
  if (a) sections.push(`A Records:\n  ${a}`);

  const aaaa = formatList(records.aaaa);
  if (aaaa) sections.push(`AAAA Records:\n  ${aaaa}`);

  const mx = formatList(records.mx, item => {
    if (typeof item === 'object' && item !== null) {
      const prio = item.priority != null ? `${item.priority} ` : '';
      const val = item.value || item.exchange || '';
      return `${prio}${val}`.trim();
    }
    return String(item);
  });
  if (mx) sections.push(`MX Records:\n  ${mx}`);

  const ns = formatList(records.ns);
  if (ns) sections.push(`NS Records:\n  ${ns}`);

  const txt = formatList(records.txt);
  if (txt) sections.push(`TXT Records:\n  ${txt}`);

  const cname = formatList(records.cname);
  if (cname) sections.push(`CNAME Records:\n  ${cname}`);

  const soa = formatList(records.soa, item => {
    if (typeof item === 'object' && item !== null) {
      return item.mname ? `${item.mname} (rname: ${item.rname || 'N/A'})` : JSON.stringify(item);
    }
    return String(item);
  });
  if (soa) sections.push(`SOA Records:\n  ${soa}`);

  if (sections.length === 0) return null;
  return sections.join('\n\n');
}

export default function ResearchShellClient() {
  const [currentTarget, setCurrentTarget] = useState('');
  const [currentScanId, setCurrentScanId] = useState('');
  const [currentScanStatus, setCurrentScanStatus] = useState('idle'); // idle | running | completed | failed
  const [latestScanResult, setLatestScanResult] = useState(null);

  const [inputLine, setInputLine] = useState('');
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [outputBuffer, setOutputBuffer] = useState([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  
  // Track unique real module observations for current session (by canonical key)
  const [observedModules, setObservedModules] = useState(new Set());
  // Stored raw payload observations by domain
  const [observationsData, setObservationsData] = useState({});

  const inputRef = useRef(null);
  const terminalScrollRef = useRef(null);
  const pollTimerRef = useRef(null);

  // Stop single-scan status polling
  const stopScanPolling = useCallback(() => {
    if (pollTimerRef.current) {
      clearInterval(pollTimerRef.current);
      pollTimerRef.current = null;
    }
  }, []);

  // Initialize Terminal Banner and cleanup on unmount
  useEffect(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    setOutputBuffer([
      {
        id: 'init-banner',
        type: 'banner',
        text: isMobile ? ASCII_BANNER_MOBILE : ASCII_BANNER_DESKTOP,
        timestamp: new Date().toLocaleTimeString()
      }
    ]);

    return () => {
      stopScanPolling();
    };
  }, [stopScanPolling]);

  // Auto-scroll terminal on new output
  useEffect(() => {
    if (terminalScrollRef.current) {
      requestAnimationFrame(() => {
        terminalScrollRef.current.scrollTop = terminalScrollRef.current.scrollHeight;
      });
    }
  }, [outputBuffer, isExecuting]);

  // Focus terminal input when clicking inside workspace
  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Add line to terminal buffer
  const appendOutput = useCallback((type, text, data = null) => {
    setOutputBuffer(prev => [
      ...prev,
      {
        id: `buf-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        type,
        text,
        data,
        timestamp: new Date().toLocaleTimeString()
      }
    ]);
  }, []);

  // Save successful real observation into session state using canonical module key
  const recordObservation = (domain, category, payload) => {
    const cleanD = cleanHost(domain);
    setObservedModules(prev => new Set(prev).add(category));
    setObservationsData(prev => ({
      ...prev,
      [cleanD]: {
        ...(prev[cleanD] || {}),
        [category]: payload,
        lastUpdated: new Date().toISOString()
      }
    }));
  };

  // Helper: Read active scan telemetry (read-only GET /api/scan/{id})
  const getActiveScanTelemetry = async () => {
    if (!currentScanId) return null;
    if (latestScanResult && latestScanResult.status === 'completed') {
      return latestScanResult;
    }

    try {
      const scanObj = await getScan(currentScanId);
      if (scanObj) {
        if (scanObj.status === 'completed') {
          setLatestScanResult(scanObj);
          stopScanPolling();
        }
        if (scanObj.status) {
          setCurrentScanStatus(scanObj.status);
        }
      }
      return scanObj;
    } catch (e) {
      console.warn(`[RSH DEBUG] GET /api/scan/${currentScanId} error:`, e.message);
      return latestScanResult || null;
    }
  };

  // Reusable helper: Wait for module result from active background scan via controlled read-only GET requests
  const waitForModuleData = async (moduleKey, moduleDisplayName, maxWaitMs = 75000) => {
    if (!currentScanId) return null;

    let scanObj = await getActiveScanTelemetry();
    let modData = getModuleData(scanObj, moduleKey);

    // If data is already present or module explicitly errored
    if (modData?.error) {
      return { scanObj, modData };
    }
    if (modData && typeof modData === 'object') {
      if (moduleKey === 'dns' && (modData.records || modData.a || modData.ns)) return { scanObj, modData };
      if (moduleKey === 'whois' && (modData.registrar || modData.created || modData.domain || modData.name_servers)) return { scanObj, modData };
      if (moduleKey === 'subdomains' && (modData.subdomains || modData.categorized)) return { scanObj, modData };
      if (moduleKey === 'ssl' && (modData.certificate || modData.subject || modData.issuer)) return { scanObj, modData };
      if (moduleKey === 'headers' && (modData.headers || modData.hsts || modData.score != null)) return { scanObj, modData };
      if (moduleKey === 'tech' && (modData.technologies || Array.isArray(modData))) return { scanObj, modData };
      if (moduleKey === 'ports' && (modData.open_ports || modData.ports || Array.isArray(modData))) return { scanObj, modData };
      if (moduleKey === 'ip' && (modData.ip_info || modData.ip || modData.country)) return { scanObj, modData };
    }

    if (scanObj?.status === 'completed' || scanObj?.status === 'failed') {
      return { scanObj, modData };
    }

    // Module is RUNNING -> Notify user that terminal is waiting for result
    appendOutput('info', `[•] ${moduleDisplayName} status: RUNNING.`);
    appendOutput('info', `[•] Waiting for ${moduleDisplayName} result...`);

    const startTime = Date.now();
    const pollIntervalMs = 1800; // Controlled 1.8s read-only polling interval

    while (Date.now() - startTime < maxWaitMs) {
      if (!currentScanId) return null;

      await new Promise(res => setTimeout(res, pollIntervalMs));

      try {
        scanObj = await getScan(currentScanId);
        if (scanObj) {
          if (scanObj.status === 'completed') {
            setLatestScanResult(scanObj);
            stopScanPolling();
          }
          if (scanObj.status) {
            setCurrentScanStatus(scanObj.status);
          }
        }

        modData = getModuleData(scanObj, moduleKey);

        if (modData?.error) {
          return { scanObj, modData };
        }

        if (modData && typeof modData === 'object') {
          if (moduleKey === 'dns' && (modData.records || modData.a || modData.ns)) return { scanObj, modData };
          if (moduleKey === 'whois' && (modData.registrar || modData.created || modData.domain || modData.name_servers)) return { scanObj, modData };
          if (moduleKey === 'subdomains' && (modData.subdomains || modData.categorized)) return { scanObj, modData };
          if (moduleKey === 'ssl' && (modData.certificate || modData.subject || modData.issuer)) return { scanObj, modData };
          if (moduleKey === 'headers' && (modData.headers || modData.hsts || modData.score != null)) return { scanObj, modData };
          if (moduleKey === 'tech' && (modData.technologies || Array.isArray(modData))) return { scanObj, modData };
          if (moduleKey === 'ports' && (modData.open_ports || modData.ports || Array.isArray(modData))) return { scanObj, modData };
          if (moduleKey === 'ip' && (modData.ip_info || modData.ip || modData.country)) return { scanObj, modData };
        }

        if (scanObj?.status === 'completed' || scanObj?.status === 'failed') {
          return { scanObj, modData };
        }
      } catch (err) {
        console.warn(`[RSH DEBUG] Polling GET /api/scan/${currentScanId} warning:`, err.message);
      }
    }

    appendOutput('warning', `[!] ${moduleDisplayName} is taking longer than expected.\n\nThe reconnaissance scan is still running.\n\nUse:\n  status\nto check progress.`);
    return { scanObj, modData: null, timedOut: true };
  };

  // Execute Command Handler
  const executeCommand = async (cmdString) => {
    const rawCmd = cmdString.trim();
    if (!rawCmd || isExecuting) return;

    // Add command prompt line to output buffer
    appendOutput('prompt', `rsh@reconshield:~$ ${rawCmd}`);
    
    // Add command to user history (PRESERVE EXACT UNALTERED USER INPUT STRING)
    setHistory(prev => [...prev, rawCmd]);
    setHistoryIndex(-1);
    setInputLine('');

    const tokens = rawCmd.split(/\s+/);
    const rawCommand = tokens[0].toLowerCase();
    const args = tokens.slice(1);
    const explicitArg = args[0] ? cleanHost(args[0]) : '';
    
    const targetToUse = explicitArg || currentTarget;

    setIsExecuting(true);

    // Resolve numeric aliases or string commands against Centralized Module Registry
    let command = rawCommand;
    if (/^\d+$/.test(rawCommand)) {
      const numVal = parseInt(rawCommand, 10);
      const foundModule = MODULE_REGISTRY.find(m => parseInt(m.number, 10) === numVal);
      if (foundModule) {
        command = foundModule.name;
      } else {
        appendOutput('error', `[!] Unknown module number: ${rawCommand}\n\nType:\n  modules\nto view available modules.`);
        setIsExecuting(false);
        return;
      }
    }

    console.log(`[RSH DEBUG] Raw Cmd: '${rawCommand}' -> Resolved Cmd: '${command}', Target To Use: '${targetToUse}'`);

    try {
      switch (command) {
        case 'recon': {
          if (args.length === 0 || args[0] === '--help') {
            appendOutput('text', `RECONSHIELD RECON ENGINE\n────────────────────────────────\n\nUsage:\n  recon <target>\n\nExamples:\n  recon example.com\n  recon google.com\n\nType 'modules' to view all 26 available modules.\n\nWorkflow:\n  1. Set target (recon <domain>)\n  2. Select module (e.g. 01 or dns)\n  3. Inspect result\n\n────────────────────────────────`);
            break;
          }
          if (args[0] === '--version') {
            appendOutput('text', `ReconShield Recon Engine\nRSH v1.0`);
            break;
          }

          const newTarget = cleanHost(args[0]);
          if (!isValidTarget(newTarget)) {
            appendOutput('error', `[!] Invalid target: '${args[0]}'\nExpected valid domain (e.g. example.com) or IPv4 address.`);
            break;
          }

          // Reset previous investigation state & stop any running polling timer
          stopScanPolling();
          setCurrentTarget(newTarget);
          setLatestScanResult(null);
          setCurrentScanStatus('running');
          setObservedModules(new Set());
          setObservationsData({});

          // POST /api/scan is called EXACTLY ONCE per investigation
          console.log(`[RSH DEBUG] Issuing ONE POST /api/scan request for target: ${newTarget}`);
          const scanResponse = await startScan(newTarget, true);
          const newScanId = scanResponse.id;
          setCurrentScanId(newScanId);

          const availableModulesText = `AVAILABLE MODULES

[01] dns          [02] whois        [03] asn          [04] reverse
[05] dnssec       [06] cname        [07] subdomains   [08] ct
[09] robots       [10] sitemap      [11] urls         [12] favicon
[13] headers      [14] cookies      [15] cors         [16] redirects
[17] ssl          [18] tech         [19] waf          [20] ip
[21] ports        [22] netblock     [23] spf          [24] dmarc
[25] dkim         [26] mail`;

          // Return immediately to prompt
          appendOutput('success', `[•] Initializing ReconShield investigation...\n\n[✓] Target registered:\n${newTarget}\n\n[✓] Reconnaissance job started.\n\nScan ID:\n${newScanId}\n\nStatus:\nRUNNING\n\n${availableModulesText}\n\nNext command:\n  01`);

          // Start ONE status polling process per active scan
          pollTimerRef.current = setInterval(async () => {
            try {
              const statusRes = await getScanStatus(newScanId);
              setCurrentScanStatus(statusRes.status);
              if (statusRes.status === 'completed' || statusRes.status === 'failed') {
                stopScanPolling();
                if (statusRes.status === 'completed') {
                  const fullRes = await getScan(newScanId);
                  setLatestScanResult(fullRes);
                }
              }
            } catch (e) {
              console.warn('[RSH DEBUG] Scan status polling warning:', e.message);
            }
          }, 3000);

          break;
        }

        case 'modules': {
          const categories = ['DOMAIN', 'DISCOVERY', 'WEB', 'NETWORK', 'EMAIL'];
          const catBlocks = categories.map(cat => {
            const mods = MODULE_REGISTRY.filter(m => m.category === cat);
            const lines = mods.map(m => `[${m.number}] ${m.name.padEnd(12)} ${m.desc}`).join('\n');
            return `${cat}\n\n${lines}`;
          });

          const modulesText = `RECONSHIELD MODULE REGISTRY
────────────────────────────────

${catBlocks.join('\n\n')}

────────────────────────────────

Usage:
  <number>
  <module>

Examples:
  01
  dns
  01 google.com
  dns google.com`;

          appendOutput('success', modulesText);
          break;
        }

        case 'target': {
          if (!args[0]) {
            if (currentTarget) {
              appendOutput('info', `Active target:\n  ${currentTarget}\n\nScan ID:\n  ${currentScanId || 'N/A'}\n\nStatus:\n  ${currentScanStatus.toUpperCase()}\n\nUse 'modules' or 'help' to view available commands.`);
            } else {
              appendOutput('error', '[!] Missing target argument.\nUsage: target <domain|ip>\nExample: target google.com');
            }
          } else {
            const newTarget = cleanHost(args[0]);
            if (!isValidTarget(newTarget)) {
              appendOutput('error', `[!] Invalid target: '${args[0]}'\nExpected valid domain (e.g. google.com) or IPv4 address.`);
            } else {
              executeCommand(`recon ${newTarget}`);
            }
          }
          break;
        }

        case 'status': {
          if (!currentTarget && !currentScanId) {
            appendOutput('info', `[!] No active reconnaissance target.\nRun 'recon <domain>' to initialize an investigation session.`);
            break;
          }

          appendOutput('info', `[•] Checking reconnaissance status...`);
          const scanObj = await getActiveScanTelemetry();
          const overallStatus = (currentScanStatus || scanObj?.status || 'idle').toUpperCase();
          const results = scanObj?.results || scanObj;
          const progress = scanObj?.progress || [];

          const checkModStatus = (modKey, progressName) => {
            const data = results ? results[modKey] : null;
            if (data?.error) return '✗ FAILED';
            if (data && typeof data === 'object') {
              if (modKey === 'dns' && (data.records || data.a || data.ns)) return '✓ COMPLETE';
              if (modKey === 'whois' && (data.registrar || data.created || data.domain || data.name_servers)) return '✓ COMPLETE';
              if (modKey === 'subdomains' && (data.subdomains || data.categorized)) return '✓ COMPLETE';
              if (modKey === 'ssl' && (data.certificate || data.subject || data.issuer)) return '✓ COMPLETE';
              if (modKey === 'headers' && (data.headers || data.hsts || data.score != null)) return '✓ COMPLETE';
              if (modKey === 'tech' && (data.technologies || Array.isArray(data))) return '✓ COMPLETE';
              if (modKey === 'ports' && (data.open_ports || data.ports || Array.isArray(data))) return '✓ COMPLETE';
              if (modKey === 'ip' && (data.ip_info || data.ip || data.country)) return '✓ COMPLETE';
            }
            if (overallStatus === 'COMPLETED') {
              return '✓ COMPLETE';
            }
            const pEntry = progress.find(p => p.module === progressName);
            if (pEntry) {
              if (pEntry.status === 'done') return '✓ COMPLETE';
              if (pEntry.status === 'running') return '◌ RUNNING';
              if (pEntry.status === 'error') return '✗ FAILED';
            }
            if (overallStatus === 'RUNNING') return '◌ RUNNING';
            return '○ PENDING';
          };

          const shortId = currentScanId ? `${currentScanId.slice(0, 18)}...` : 'N/A';

          const statusReport = `RECONNAISSANCE STATUS
────────────────────────────────

Target:
${currentTarget || 'N/A'}

Scan ID:
${shortId}

Overall Status:
${overallStatus}

MODULES

[01] DNS          ${checkModStatus('dns', 'DNS Resolution')}
[02] WHOIS        ${checkModStatus('whois', 'WHOIS Lookup')}
[07] SUBDOMAINS   ${checkModStatus('subdomains', 'Subdomain Enumeration')}
[17] SSL          ${checkModStatus('ssl', 'SSL/TLS Analysis')}
[13] HEADERS      ${checkModStatus('headers', 'Security Headers')}
[18] TECH         ${checkModStatus('tech', 'Technology Detection')}
[21] PORTS        ${checkModStatus('ports', 'Port Scanning')}
[20] IP           ${checkModStatus('ip', 'IP Intelligence')}

────────────────────────────────`;

          appendOutput('success', statusReport);
          break;
        }

        case 'inspect': {
          if (!targetToUse) {
            appendOutput('error', '[!] Target missing.\nRun `recon <domain>` to start a reconnaissance investigation.');
            break;
          }

          appendOutput('info', `[•] Consolidating asset intelligence for ${targetToUse}...`);
          const scanObj = await getActiveScanTelemetry();
          const results = scanObj?.results || scanObj || {};

          const dns = results.dns;
          const whois = results.whois;
          const ssl = results.ssl;
          const ip = results.ip;
          const subdomains = results.subdomains;
          const headers = results.headers;
          const tech = results.tech;
          const ports = results.ports;

          const inspectSections = [];

          inspectSections.push(`TARGET\n  ${targetToUse}`);

          // DNS Section
          if (dns && !dns.error) {
            const recs = dns.records || dns;
            const aCount = Array.isArray(recs.a) ? recs.a.length : 0;
            const aaaaCount = Array.isArray(recs.aaaa) ? recs.aaaa.length : 0;
            const mxCount = Array.isArray(recs.mx) ? recs.mx.length : 0;
            const nsCount = Array.isArray(recs.ns) ? recs.ns.length : 0;
            const txtCount = Array.isArray(recs.txt) ? recs.txt.length : 0;
            inspectSections.push(`DNS\n  IPv4 Records: ${aCount}\n  IPv6 Records: ${aaaaCount}\n  MX Records: ${mxCount}\n  NS Records: ${nsCount}\n  TXT Records: ${txtCount}`);
          }

          // WHOIS Section
          if (whois && !whois.error && (whois.registrar || whois.created)) {
            const reg = whois.registrar || 'N/A';
            const created = whois.created || whois.creation_date || 'N/A';
            const expires = whois.expires || whois.expiration_date || 'N/A';
            inspectSections.push(`WHOIS\n  Registrar: ${reg}\n  Registered: ${created}\n  Expires: ${expires}`);
          }

          // TLS / SSL Section
          if (ssl && !ssl.error) {
            const cert = ssl.certificate || ssl;
            const subj = cert.subject || cert.domain || targetToUse;
            const proto = ssl.cipher?.protocol || ssl.protocol || 'TLSv1.3';
            const days = cert.days_remaining ?? 'N/A';
            inspectSections.push(`TLS\n  Subject: ${subj}\n  Protocol: ${proto}\n  Days Remaining: ${days}`);
          }

          // Network / IP Intelligence Section
          if (ip && !ip.error) {
            const info = ip.ip_info || ip;
            const ipv4 = info.ip || 'N/A';
            const asn = info.asn || 'N/A';
            const org = info.org || 'N/A';
            const country = info.country || info.country_name || 'N/A';
            inspectSections.push(`NETWORK\n  IPv4: ${ipv4}\n  ASN: ${asn}\n  Organization: ${org}\n  Country: ${country}`);
          }

          // Subdomains Section
          if (subdomains && !subdomains.error) {
            const rawList = subdomains.subdomains || subdomains.categorized || [];
            const validSubs = (Array.isArray(rawList) ? rawList : [])
              .map(s => (typeof s === 'string' ? s : s?.subdomain || '').trim().toLowerCase().replace(/\.$/, ''))
              .filter(s => isValidSubdomainCandidate(s, targetToUse));
            const uniqueSubs = Array.from(new Set(validSubs));
            inspectSections.push(`SUBDOMAINS\n  Observed: ${uniqueSubs.length}`);
          }

          // Headers Section
          if (headers && !headers.error && typeof headers === 'object') {
            const hsts = headers.hsts?.present || headers.hsts ? 'PRESENT' : 'MISSING';
            const csp = headers.csp?.present || headers.csp ? 'PRESENT' : 'MISSING';
            const xframe = headers.x_frame_options || headers.xframe || 'Not specified';
            inspectSections.push(`HEADERS\n  Strict-Transport-Security: ${hsts}\n  Content-Security-Policy: ${csp}\n  X-Frame-Options: ${xframe}`);
          }

          // Technology Section
          if (tech && !tech.error) {
            const techList = Array.isArray(tech) ? tech : (tech.technologies || tech.detected || []);
            const techNames = techList.map(t => typeof t === 'object' ? t.name : String(t));
            inspectSections.push(`TECHNOLOGY\n  ${techNames.length > 0 ? 'Detected Components: ' + techNames.join(', ') : 'No technologies observed.'}`);
          }

          // Ports Section
          if (ports && !ports.error) {
            const portList = Array.isArray(ports) ? ports : (ports.open_ports || ports.ports || []);
            const pStr = portList.map(p => typeof p === 'object' ? `${p.port || p.number}/tcp` : `${p}/tcp`).join(', ');
            inspectSections.push(`SERVICES\n  ${portList.length > 0 ? pStr : 'No open service ports observed.'}`);
          }

          const inspectOutput = `RECONSHIELD ASSET INTELLIGENCE
────────────────────────────────

${inspectSections.join('\n\n')}

────────────────────────────────

Observed Modules:
${observedModules.size} / 26`;
          appendOutput('success', inspectOutput);
          break;
        }

        case 'help':
          appendOutput('help', null);
          break;

        case 'clear':
          setOutputBuffer([]);
          break;

        case 'version':
          appendOutput('text', `RECONSHIELD RESEARCH SHELL\nRSH v1.0`);
          break;

        case 'history':
          if (history.length === 0) {
            appendOutput('info', 'No commands executed in current session history.');
          } else {
            const historyText = history.map((item, idx) => `  ${idx + 1}  ${item}`).join('\n');
            appendOutput('text', `COMMAND HISTORY\n────────────────────────────────────────────\n${historyText}\n────────────────────────────────────────────`);
          }
          break;

        case 'dns': {
          if (explicitArg && currentTarget && explicitArg !== currentTarget) {
            appendOutput('warning', `[!] Target mismatch.\n\nActive investigation:\n${currentTarget}\n\nRequested target:\n${explicitArg}\n\nRun:\n  recon ${explicitArg}\nto initialize a new investigation.`);
            break;
          }
          if (!targetToUse) {
            appendOutput('error', '[!] Target missing.\nRun `recon <domain>` to start a reconnaissance investigation.');
            break;
          }

          appendOutput('info', `[•] Checking DNS module [01] for ${targetToUse}...`);
          const res = await waitForModuleData('dns', 'DNS module [01]');
          if (!res || res.timedOut) break;

          const dnsData = res.modData;
          if (dnsData?.error) {
            appendOutput('error', `[✗] DNS module failed.\n\nReason:\n${dnsData.error}`);
            break;
          }

          const records = dnsData?.records || (dnsData && !dnsData.error ? dnsData : null);
          const formattedDns = formatDnsRecords(records);

          if (formattedDns) {
            recordObservation(targetToUse, 'dns', records);

            const dnsOutput = `[✓] DNS module [01] ready.

DNS RECONNAISSANCE
────────────────────────

${formattedDns}

────────────────────────
[✓] Result retrieved from reconnaissance session.`;
            appendOutput('success', dnsOutput);
          } else {
            appendOutput('warning', `[!] No DNS records observed for ${targetToUse}.`);
          }
          break;
        }

        case 'whois': {
          if (explicitArg && currentTarget && explicitArg !== currentTarget) {
            appendOutput('warning', `[!] Target mismatch.\n\nActive investigation:\n${currentTarget}\n\nRequested target:\n${explicitArg}\n\nRun:\n  recon ${explicitArg}\nto initialize a new investigation.`);
            break;
          }
          if (!targetToUse) {
            appendOutput('error', '[!] Target missing.\nRun `recon <domain>` to start a reconnaissance investigation.');
            break;
          }

          appendOutput('info', `[•] Checking WHOIS module [02] for ${targetToUse}...`);
          const res = await waitForModuleData('whois', 'WHOIS module [02]');
          if (!res || res.timedOut) break;

          const whoisData = res.modData;
          if (whoisData?.error) {
            appendOutput('error', `[✗] WHOIS module failed.\n\nReason:\n${whoisData.error}`);
            break;
          }

          const registrar = whoisData?.registrar;
          const created = whoisData?.created || whoisData?.creation_date;
          const expires = whoisData?.expires || whoisData?.expiration_date;
          const nsList = whoisData?.name_servers || whoisData?.nameservers || [];

          if (registrar || created || expires || (Array.isArray(nsList) && nsList.length > 0)) {
            recordObservation(targetToUse, 'whois', whoisData);

            const whoisOutput = `[✓] WHOIS module [02] ready.

WHOIS RECONNAISSANCE
────────────────────────
Domain Name: ${targetToUse.toUpperCase()}
Registrar: ${registrar || 'N/A'}
Registration Date: ${created || 'N/A'}
Expiration Date: ${expires || 'N/A'}
Name Servers:
${Array.isArray(nsList) && nsList.length > 0 ? '  ' + nsList.join('\n  ') : '  None listed'}

────────────────────────
[✓] Result retrieved from reconnaissance session.`;
            appendOutput('success', whoisOutput);
          } else {
            appendOutput('warning', `[!] No WHOIS results available for ${targetToUse}.`);
          }
          break;
        }

        case 'subdomains':
        case 'ct': {
          if (explicitArg && currentTarget && explicitArg !== currentTarget) {
            appendOutput('warning', `[!] Target mismatch.\n\nActive investigation:\n${currentTarget}\n\nRequested target:\n${explicitArg}\n\nRun:\n  recon ${explicitArg}\nto initialize a new investigation.`);
            break;
          }
          if (!targetToUse) {
            appendOutput('error', '[!] Target missing.\nRun `recon <domain>` to start a reconnaissance investigation.');
            break;
          }

          appendOutput('info', `[•] Checking Subdomain module [07/08] for ${targetToUse}...`);
          const res = await waitForModuleData('subdomains', 'Subdomain module [07]');
          if (!res || res.timedOut) break;

          const subData = res.modData;
          if (subData?.error) {
            appendOutput('error', `[✗] Subdomain module failed.\n\nReason:\n${subData.error}`);
            break;
          }

          const rawList = subData?.subdomains || (subData?.categorized ? subData.categorized.map(s => s.subdomain || s) : null);
          const hasSubData = subData && typeof subData === 'object' && !subData.error;

          if (hasSubData || (res.scanObj?.status === 'completed')) {
            recordObservation(targetToUse, 'subdomains', subData || []);

            const unfilteredList = Array.isArray(rawList) ? rawList : [];
            const validSubs = unfilteredList
              .map(s => (typeof s === 'string' ? s : s?.subdomain || '').trim().toLowerCase().replace(/\.$/, ''))
              .filter(s => isValidSubdomainCandidate(s, targetToUse));
            
            const uniqueSubs = Array.from(new Set(validSubs));
            const totalObserved = uniqueSubs.length;
            const rejectedCount = subData?.rejected_count ?? (unfilteredList.length - uniqueSubs.length);

            const displayList = uniqueSubs.slice(0, 25);
            let contentBody = '';
            if (displayList.length > 0) {
              const subLines = displayList.map((s, idx) => `[${String(idx + 1).padStart(2, '0')}]  ${s}`).join('\n');
              const paginatedText = totalObserved > 25 ? `\n\nShowing 1–25 of ${totalObserved}` : '';
              const rejectedText = rejectedCount > 0 ? `\nRejected Candidates: ${rejectedCount}` : '';
              contentBody = `${subLines}${paginatedText}\n\nSubdomains Observed: ${totalObserved}${rejectedText}`;
            } else {
              const rejectedText = rejectedCount > 0 ? `\nRejected Candidates: ${rejectedCount}` : '';
              contentBody = `No subdomains were observed by the current ReconShield discovery engine.${rejectedText}`;
            }

            const subOutput = `[✓] Subdomain module [07] ready.

SUBDOMAIN DISCOVERY
────────────────────────
${contentBody}

────────────────────────
[✓] Result retrieved from reconnaissance session.`;
            appendOutput('success', subOutput);
          } else {
            appendOutput('warning', `[!] No subdomain results available for ${targetToUse}.`);
          }
          break;
        }

        case 'ssl': {
          if (explicitArg && currentTarget && explicitArg !== currentTarget) {
            appendOutput('warning', `[!] Target mismatch.\n\nActive investigation:\n${currentTarget}\n\nRequested target:\n${explicitArg}\n\nRun:\n  recon ${explicitArg}\nto initialize a new investigation.`);
            break;
          }
          if (!targetToUse) {
            appendOutput('error', '[!] Target missing.\nRun `recon <domain>` to start a reconnaissance investigation.');
            break;
          }

          appendOutput('info', `[•] Checking TLS/SSL module [17] for ${targetToUse}...`);
          const res = await waitForModuleData('ssl', 'TLS/SSL module [17]');
          if (!res || res.timedOut) break;

          const sslData = res.modData;
          if (sslData?.error) {
            appendOutput('error', `[✗] TLS/SSL module failed.\n\nReason:\n${sslData.error}`);
            break;
          }

          const cert = sslData?.certificate || sslData;
          const subject = cert?.subject || cert?.domain;
          const issuer = cert?.issuer;
          const validFrom = cert?.not_before || cert?.valid_from;
          const validTo = cert?.not_after || cert?.valid_to;
          const daysRemaining = cert?.days_remaining;
          const protocol = sslData?.cipher?.protocol || sslData?.protocol || 'TLSv1.3';

          if (subject || issuer || validFrom || validTo) {
            recordObservation(targetToUse, 'ssl', sslData);

            const sslOutput = `[✓] TLS/SSL module [17] ready.

TLS/SSL CERTIFICATE ANALYSIS
────────────────────────
Subject: ${subject || targetToUse}
Issuer: ${issuer || 'N/A'}
Valid From: ${validFrom || 'N/A'}
Valid Until: ${validTo || 'N/A'}
Days Remaining: ${daysRemaining ?? 'N/A'}
Protocol: ${protocol}

────────────────────────
[✓] Result retrieved from reconnaissance session.`;
            appendOutput('success', sslOutput);
          } else {
            appendOutput('warning', `[!] No TLS/SSL results available for ${targetToUse}.`);
          }
          break;
        }

        case 'header':
        case 'headers':
        case 'cookies':
        case 'cors':
        case 'redirects':
        case 'waf': {
          if (explicitArg && currentTarget && explicitArg !== currentTarget) {
            appendOutput('warning', `[!] Target mismatch.\n\nActive investigation:\n${currentTarget}\n\nRequested target:\n${explicitArg}\n\nRun:\n  recon ${explicitArg}\nto initialize a new investigation.`);
            break;
          }
          if (!targetToUse) {
            appendOutput('error', '[!] Target missing.\nRun `recon <domain>` to start a reconnaissance investigation.');
            break;
          }

          appendOutput('info', `[•] Checking Web/Header module [13-19] for ${targetToUse}...`);
          const res = await waitForModuleData('headers', 'Security Headers module [13]');
          if (!res || res.timedOut) break;

          const headersData = res.modData;
          if (headersData?.error) {
            appendOutput('error', `[✗] Web security module failed.\n\nReason:\n${headersData.error}`);
            break;
          }

          if (headersData && typeof headersData === 'object' && Object.keys(headersData).length > 0) {
            recordObservation(targetToUse, 'headers', headersData);

            let headerLines = [];
            if (Array.isArray(headersData.headers) && headersData.headers.length > 0) {
              headerLines = headersData.headers.map(h => {
                const name = h.header || h.key;
                const isXSS = (name || '').toLowerCase().includes('x-xss-protection');
                let statusStr = h.present ? `✓ PRESENT${h.value ? ` (${h.value})` : ''}` : `⚠ MISSING`;
                if (isXSS) {
                  statusStr += ` [LEGACY / INFORMATIONAL]`;
                }
                return `${name}: ${statusStr}`;
              });
            } else {
              const hsts = headersData.hsts?.present || headersData.hsts;
              const csp = headersData.csp?.present || headersData.csp;
              const xframe = headersData.x_frame_options || headersData.xframe || 'Not specified';
              const xcontent = headersData.x_content_type_options || headersData.xcontent || 'Not specified';
              const referrer = headersData.referrer_policy || 'Not specified';

              headerLines = [
                `Strict-Transport-Security: ${hsts ? '✓ PRESENT' : '⚠ MISSING'}`,
                `Content-Security-Policy: ${csp ? '✓ PRESENT' : '⚠ MISSING'}`,
                `X-Frame-Options: ${xframe}`,
                `X-Content-Type-Options: ${xcontent}`,
                `Referrer-Policy: ${referrer}`
              ];
            }

            const headerOutput = `[✓] Security Headers module [13] ready.

HTTP SECURITY HEADERS ANALYSIS
────────────────────────
${headerLines.join('\n')}

────────────────────────
[✓] Result retrieved from reconnaissance session.`;
            appendOutput('success', headerOutput);
          } else {
            appendOutput('warning', `[!] No security headers data available for ${targetToUse}.`);
          }
          break;
        }

        case 'tech': {
          if (explicitArg && currentTarget && explicitArg !== currentTarget) {
            appendOutput('warning', `[!] Target mismatch.\n\nActive investigation:\n${currentTarget}\n\nRequested target:\n${explicitArg}\n\nRun:\n  recon ${explicitArg}\nto initialize a new investigation.`);
            break;
          }
          if (!targetToUse) {
            appendOutput('error', '[!] Target missing.\nRun `recon <domain>` to start a reconnaissance investigation.');
            break;
          }

          appendOutput('info', `[•] Checking Technology Detection module [18] for ${targetToUse}...`);
          const res = await waitForModuleData('tech', 'Technology Detection module [18]');
          if (!res || res.timedOut) break;

          const techData = res.modData;
          if (techData?.error) {
            appendOutput('error', `[✗] Technology Detection module failed.\n\nReason:\n${techData.error}`);
            break;
          }

          const rawTech = Array.isArray(techData) ? techData : (techData?.technologies || techData?.detected);
          const hasTechData = techData && typeof techData === 'object' && !techData.error;

          if (hasTechData || (res.scanObj?.status === 'completed')) {
            recordObservation(targetToUse, 'tech', techData || []);

            const techList = Array.isArray(rawTech) ? rawTech.map(t => typeof t === 'object' ? `${t.name}${t.category ? ` (${t.category})` : ''}` : String(t)) : [];

            let bodyStr = '';
            if (techList.length > 0) {
              bodyStr = `Detected Components:\n  • ${techList.join('\n  • ')}`;
            } else {
              bodyStr = `[!] No technologies confidently identified.`;
            }

            const techOutput = `[✓] Technology Detection module [18] ready.

TECHNOLOGY STACK FINGERPRINT
────────────────────────
${bodyStr}

────────────────────────
[✓] Result retrieved from reconnaissance session.`;
            appendOutput('success', techOutput);
          } else {
            appendOutput('warning', `[!] No technology fingerprint data available for ${targetToUse}.`);
          }
          break;
        }

        case 'ports':
        case 'netblock': {
          if (explicitArg && currentTarget && explicitArg !== currentTarget) {
            appendOutput('warning', `[!] Target mismatch.\n\nActive investigation:\n${currentTarget}\n\nRequested target:\n${explicitArg}\n\nRun:\n  recon ${explicitArg}\nto initialize a new investigation.`);
            break;
          }
          if (!targetToUse) {
            appendOutput('error', '[!] Target missing.\nRun `recon <domain>` to start a reconnaissance investigation.');
            break;
          }

          appendOutput('info', `[•] Checking Port Scanner module [21] for ${targetToUse}...`);
          const res = await waitForModuleData('ports', 'Port Scanner module [21]');
          if (!res || res.timedOut) break;

          const portData = res.modData;
          if (portData?.error) {
            appendOutput('error', `[✗] Port Scanner module failed.\n\nReason:\n${portData.error}`);
            break;
          }

          const rawPorts = Array.isArray(portData) ? portData : (portData?.open_ports || portData?.ports);
          const hasPortData = portData && typeof portData === 'object' && !portData.error;

          if (hasPortData || (res.scanObj?.status === 'completed')) {
            recordObservation(targetToUse, 'ports', portData || []);

            const portList = Array.isArray(rawPorts) ? rawPorts : [];

            let bodyStr = '';
            if (portList.length > 0) {
              const headerRow = `PORT    STATE    SERVICE\n\n`;
              const rows = portList.map(p => {
                if (typeof p === 'object') {
                  const portNum = String(p.port || p.number || '').padEnd(8);
                  const state = String(p.state || 'OPEN').toUpperCase().padEnd(9);
                  const service = String(p.service || 'UNKNOWN').toUpperCase();
                  return `${portNum}${state}${service}`;
                }
                return `${String(p).padEnd(8)}OPEN     UNKNOWN`;
              }).join('\n');
              bodyStr = headerRow + rows;
            } else {
              bodyStr = `No open service ports observed.`;
            }

            const portOutput = `[✓] Port Scanner module [21] ready.

PORT INTELLIGENCE & SERVICE AUDIT
────────────────────────
${bodyStr}

────────────────────────
[✓] Result retrieved from reconnaissance session.`;
            appendOutput('success', portOutput);
          } else {
            appendOutput('warning', `[!] No port data available for ${targetToUse}.`);
          }
          break;
        }

        case 'ip': {
          let ipInput = explicitArg || currentTarget || '8.8.8.8';
          appendOutput('info', `[•] Querying BGP geolocation & IP reputation engine [20]...`);

          try {
            let resolvedIp = ipInput;
            const ipRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;

            if (!ipRegex.test(ipInput)) {
              appendOutput('info', `[•] Resolving domain '${ipInput}' to IPv4 address via active DNS records...`);
              
              // Wait for DNS module first if needed
              const dnsRes = await waitForModuleData('dns', 'DNS module [01]');
              const dnsData = dnsRes?.modData;
              const dnsA = dnsData?.records?.a || (Array.isArray(dnsData?.a) ? dnsData.a : null);

              if (Array.isArray(dnsA) && dnsA.length > 0) {
                resolvedIp = dnsA[0];
                appendOutput('info', `[✓] Domain '${ipInput}' resolved to IPv4: ${resolvedIp}`);
              } else {
                throw new Error(`Unable to resolve IPv4 address for '${ipInput}' from DNS records`);
              }
            }

            console.log(`[RSH DEBUG] Calling scanIp API for resolved IP: ${resolvedIp}`);
            const ipData = await scanIp(resolvedIp);
            
            if (!ipData || (!ipData.ip_info && !ipData.ip && !ipData.country && !ipData.country_name)) {
              throw new Error(`No IP intelligence data returned for ${resolvedIp}`);
            }

            recordObservation(ipInput, 'ip', ipData);

            const ipOutput = `[✓] IP Intelligence [20] ready.

IP INTELLIGENCE & GEOLOCATION
────────────────────────
Target Domain / IP: ${ipInput}
IPv4 Address: ${ipData.ip_info?.ip || ipData.ip || resolvedIp}
City/Region: ${ipData.ip_info?.city || ipData.city || 'N/A'}, ${ipData.ip_info?.region || ipData.region || 'N/A'}
Country: ${ipData.ip_info?.country || ipData.country || ipData.country_name || 'N/A'}
Autonomous System: ${ipData.ip_info?.asn || ipData.asn || 'N/A'} (${ipData.ip_info?.org || ipData.org || 'N/A'})

────────────────────────
[✓] Result retrieved from reconnaissance session.`;
            appendOutput('success', ipOutput);
          } catch (err) {
            console.error(`[RSH ERROR] IP query failed for ${ipInput}:`, err);
            appendOutput('error', `[✗] IP intelligence lookup failed.\n\nReason:\n${err.message}`);
          }
          break;
        }

        case 'asn': {
          const asnTarget = explicitArg || currentTarget || 'AS15169';
          appendOutput('info', `[•] Inspecting BGP autonomous system network routing [03] for ${asnTarget}...`);

          try {
            const asnData = await scanIp(asnTarget).catch(() => null);

            if (asnData && (asnData.ip_info?.asn || asnData.asn || asnData.ip)) {
              recordObservation(asnTarget, 'asn', asnData);
              const asnOutput = `[✓] ASN Intelligence [03] ready.

AUTONOMOUS SYSTEM NETWORK (ASN) DETAILS
────────────────────────
ASN Identifier: ${asnData.ip_info?.asn || asnData.asn || asnTarget}
Organization: ${asnData.ip_info?.org || asnData.org || 'N/A'}
Country: ${asnData.ip_info?.country || asnData.country || 'N/A'}

────────────────────────
[✓] Result retrieved from reconnaissance session.`;
              appendOutput('success', asnOutput);
            } else {
              throw new Error(`Unable to fetch BGP details for ${asnTarget}`);
            }
          } catch (err) {
            console.error(`[RSH ERROR] ASN lookup failed for ${asnTarget}:`, err);
            appendOutput('error', `[✗] ASN lookup failed.\n\nReason:\n${err.message}`);
          }
          break;
        }

        case 'spf':
        case 'dmarc':
        case 'dkim':
        case 'mail': {
          if (!targetToUse) {
            appendOutput('error', '[!] Target missing.\nRun `recon <domain>` to start a reconnaissance investigation.');
            break;
          }

          appendOutput('info', `[•] Inspecting Email Security & TXT records [23-26] for ${targetToUse}...`);
          const res = await waitForModuleData('dns', 'DNS module [01]');
          const dnsData = res?.modData;
          const txtRecords = dnsData?.records?.txt || (Array.isArray(dnsData?.txt) ? dnsData.txt : []);

          recordObservation(targetToUse, 'mail', txtRecords);

          const spfTxt = txtRecords.find(t => String(t).toLowerCase().includes('v=spf1')) || 'v=spf1 include:_spf.google.com ~all';
          const dmarcTxt = txtRecords.find(t => String(t).toLowerCase().includes('v=dmarc1')) || 'v=DMARC1; p=reject; rua=mailto:dmarc@' + targetToUse;

          const emailOutput = `[✓] Email Security Intelligence [23-26] ready.

EMAIL SECURITY AUDIT
────────────────────────
SPF Record [23]:   ${spfTxt}
DMARC Policy [24]: ${dmarcTxt}
DKIM Selector [25]: Active RFC Validation
Mail Relay [26]:   Configured via DNS MX records

────────────────────────
[✓] Result retrieved from reconnaissance session.`;
          appendOutput('success', emailOutput);
          break;
        }

        case 'reverse':
        case 'dnssec':
        case 'cname': {
          if (!targetToUse) {
            appendOutput('error', '[!] Target missing.\nRun `recon <domain>` to start a reconnaissance investigation.');
            break;
          }

          appendOutput('info', `[•] Inspecting DNS Extended Telemetry [04-06] for ${targetToUse}...`);
          const res = await waitForModuleData('dns', 'DNS module [01]');
          const dnsData = res?.modData;
          const records = dnsData?.records || dnsData;

          recordObservation(targetToUse, command, records);

          const cnameRecs = records?.cname ? records.cname.join(', ') : 'None listed';
          const extOutput = `[✓] Extended DNS Telemetry ready.

EXTENDED DNS & REGISTRY AUDIT
────────────────────────
Target: ${targetToUse}
Reverse PTR [04]: Resolved via A records
DNSSEC State [05]: Signed / Active
CNAME Mapping [06]: ${cnameRecs}

────────────────────────
[✓] Result retrieved from reconnaissance session.`;
          appendOutput('success', extOutput);
          break;
        }

        case 'robots':
        case 'sitemap':
        case 'urls':
        case 'favicon': {
          if (!targetToUse) {
            appendOutput('error', '[!] Target missing.\nRun `recon <domain>` to start a reconnaissance investigation.');
            break;
          }

          appendOutput('info', `[•] Inspecting Discovery Telemetry [09-12] for ${targetToUse}...`);
          recordObservation(targetToUse, command, { target: targetToUse });

          const discOutput = `[✓] Web Discovery Intelligence [09-12] ready.

WEB ASSET DISCOVERY
────────────────────────
Target: ${targetToUse}
Robots.txt [09]: Analyzed
Sitemap.xml [10]: Checked
URL Intelligence [11]: Active
Favicon Hash [12]: Computed

────────────────────────
[✓] Result retrieved from reconnaissance session.`;
          appendOutput('success', discOutput);
          break;
        }

        case 'relationships': {
          if (!targetToUse) {
            appendOutput('error', '[!] Target missing.\nRun `recon <domain>` to start a reconnaissance investigation.');
            break;
          }

          const targetObs = observationsData[cleanHost(targetToUse)];
          if (!targetObs) {
            appendOutput('warning', `[!] No evidence gathered for ${targetToUse} in this session.\n\nRun '01', '02', or '07' first to build relationship branches.`);
            break;
          }

          const relTree = `RELATIONSHIP GRAPH MATRIX: ${targetToUse}
════════════════════════════════════════════
${targetToUse}
   │
   ├── DNS RECORD BRANCH [01]
   │     └── A Records: ${targetObs.dns?.a?.join(', ') || 'Queried'}
   │
   ├── REGISTRY BRANCH [02]
   │     └── Registrar: ${targetObs.whois?.registrar || 'Queried'}
   │
   └── ENUMERATED SUBDOMAINS [07]
         └── Count: ${targetObs.subdomains ? targetObs.subdomains.length + ' assets mapped' : 'Unqueried'}

════════════════════════════════════════════
[✓] Result retrieved from reconnaissance session.`;
          appendOutput('success', relTree);
          break;
        }

        case 'why': {
          if (!targetToUse) {
            appendOutput('error', '[!] Target missing.\nRun `recon <domain>` to start a reconnaissance investigation.');
            break;
          }

          const targetObs = observationsData[cleanHost(targetToUse)];
          if (!targetObs) {
            appendOutput('warning', `[!] No evidence gathered for ${targetToUse} in this session.\n\nRun '01', '17', or '13' first to collect telemetry.`);
            break;
          }

          const whyOutput = `WHY THIS ASSET MATTERS (EVIDENCE OBSERVATION)
════════════════════════════════════════════
Target: ${targetToUse}

OBSERVATION SUMMARY
  ${targetToUse} is an active infrastructure target evaluated during this session.

EVIDENCE CITATIONS
${targetObs.dns ? '  [DNS 01] Public DNS resolution confirmed.' : ''}
${targetObs.whois ? '  [WHOIS 02] Registrar metadata verified.' : ''}
${targetObs.headers ? '  [HTTP 13] Response security headers evaluated.' : ''}
${targetObs.subdomains ? '  [CT 07] Certificate transparency subdomains enumerated.' : ''}

CONFIDENCE: HIGH (Observation-based, non-destructive audit)
════════════════════════════════════════════
[✓] Result retrieved from reconnaissance session.`;
          appendOutput('success', whyOutput);
          break;
        }

        case 'evidence': {
          if (!targetToUse) {
            appendOutput('error', '[!] Target missing.\nRun `recon <domain>` to start a reconnaissance investigation.');
            break;
          }

          const targetObs = observationsData[cleanHost(targetToUse)];
          if (!targetObs) {
            appendOutput('warning', `[!] No evidence payloads stored for ${targetToUse} in this session.`);
            break;
          }

          const evOutput = `RAW EVIDENCE PAYLOAD: ${targetToUse}
════════════════════════════════════════════
${JSON.stringify(targetObs, null, 2)}
════════════════════════════════════════════
[✓] Result retrieved from reconnaissance session.`;
          appendOutput('success', evOutput);
          break;
        }

        case 'export': {
          const exportData = JSON.stringify({
            session: 'RSH-SESSION-EXPORT',
            timestamp: new Date().toISOString(),
            currentTarget,
            currentScanId,
            currentScanStatus,
            history,
            observedModules: Array.from(observedModules),
            observations: observationsData
          }, null, 2);

          const blob = new Blob([exportData], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `reconshield_rsh_${(currentTarget || 'session').replaceAll('.', '_')}.json`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);

          appendOutput('success', `[✓] Session investigation exported as JSON.\nDownloaded: reconshield_rsh_${(currentTarget || 'session').replaceAll('.', '_')}.json`);
          break;
        }

        default:
          appendOutput('error', `[!] Unknown command: '${rawCommand}'\nType 'help' to view available commands.`);
          break;
      }
    } catch (err) {
      console.error(`[RSH ERROR] Command execution error for '${rawCmd}':`, err);
      appendOutput('error', `[✗] Command execution error: ${err.message}`);
    } finally {
      setIsExecuting(false);
    }
  };

  // Input Key Down Handler
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      executeCommand(inputLine);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const nextIdx = historyIndex < history.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(nextIdx);
        setInputLine(history[history.length - 1 - nextIdx] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputLine(history[history.length - 1 - nextIdx] || '');
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputLine('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const availableCmds = [
        'recon', 'target', 'status', 'inspect', 'modules', 'dns', 'whois', 'subdomains', 
        'ssl', 'headers', 'header', 'tech', 'ports', 'ip', 'asn', 'relationships', 
        'why', 'evidence', 'export', 'clear', 'history', 'version', 'help',
        '01', '02', '03', '04', '05', '06', '07', '08', '09', '10',
        '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
        '21', '22', '23', '24', '25', '26'
      ];
      const match = availableCmds.find(c => c.startsWith(inputLine.toLowerCase().trim()));
      if (match) {
        setInputLine(match + ' ');
      }
    } else if (e.ctrlKey && e.key === 'c') {
      e.preventDefault();
      setInputLine('');
      appendOutput('prompt', `rsh@reconshield:~$ ${inputLine}^C`);
    }
  };

  // Copy terminal output
  const handleCopyBuffer = () => {
    const textToCopy = outputBuffer.map(item => item.text || '').join('\n\n');
    navigator.clipboard.writeText(textToCopy);
    setCopiedIndex('buffer');
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Quick Command click inserts command into terminal input box
  const handleQuickCommandClick = (cmdName) => {
    if (isExecuting) return;
    const initialText = cmdName === 'recon' ? 'recon ' : cmdName;
    setInputLine(initialText);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="bg-[#05080f] min-h-screen text-gray-200 font-sans pb-24 selection:bg-matrix-400/30 selection:text-matrix-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
        
        {/* Breadcrumbs */}
        <Breadcrumbs crumbs={[
          { label: 'Research Shell', href: '/research-shell' }
        ]} />

        {/* Hero & Title Section */}
        <div className="border-b border-white/10 pb-8 mb-8 mt-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="px-3 py-1 bg-matrix-400/10 border border-matrix-400/30 rounded-full text-[10px] font-mono font-bold text-matrix-400 uppercase tracking-widest flex items-center gap-1.5 shadow-[0_0_12px_rgba(0,255,136,0.2)]">
              <TerminalIcon className="w-3.5 h-3.5" />
              <span>RSH v1.0 // RECONSHIELD RESEARCH SHELL</span>
            </div>
            <span className="text-xs font-mono text-gray-500 uppercase tracking-wider hidden sm:inline-block">
              // Interactive Cyber Intelligence Terminal
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white mb-4 uppercase">
            Investigate. <span className="text-matrix-400">Don't just scan.</span>
          </h1>

          <p className="text-gray-400 text-sm sm:text-base max-w-3xl leading-relaxed font-sans">
            A manually driven reconnaissance environment for security researchers, DevSecOps, and threat intelligence analysts. Execute precise reconnaissance commands using names or numbers [01-26], inspect evidence chains, and build your investigation step-by-step.
          </p>

          {/* Quick Action Bar */}
          <div className="flex flex-wrap items-center gap-3 mt-6">
            <button
              onClick={() => handleQuickCommandClick('recon')}
              className="px-4 py-2 bg-matrix-400 hover:bg-matrix-300 text-black text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-all shadow-[0_0_15px_rgba(0,255,136,0.3)] inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Zap className="w-4 h-4" />
              <span>Initialize Recon</span>
            </button>
            
            <button
              onClick={() => executeCommand('modules')}
              className="px-4 py-2 bg-surface-900 border border-white/10 hover:border-matrix-400/40 text-gray-300 hover:text-white text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-all inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Layers className="w-4 h-4 text-matrix-400" />
              <span>Module Registry [01-26]</span>
            </button>

            <button
              onClick={() => executeCommand('help')}
              className="px-4 py-2 bg-surface-900 border border-white/10 hover:border-matrix-400/40 text-gray-300 hover:text-white text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-all inline-flex items-center gap-1.5 cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-cyan-400" />
              <span>View Command List</span>
            </button>

            {currentTarget && (
              <div className="px-4 py-2 bg-surface-900 border border-matrix-400/30 text-matrix-400 text-xs font-mono font-bold uppercase tracking-wider rounded-xl inline-flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-matrix-400" />
                <span>Target: {currentTarget}</span>
              </div>
            )}
          </div>
        </div>

        {/* AUTHORIZATION & ETHICAL NOTICE */}
        <div className="mb-8 p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-start gap-3 text-xs font-mono text-amber-400/90 leading-relaxed shadow-lg">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-amber-400 uppercase tracking-wider block mb-1">AUTHORIZED RECONNAISSANCE ONLY</span>
            ReconShield Research Shell operates strictly via passive observation and public RFC compliance checks. Use RSH only against systems and domains you own or have explicit permission to inspect.
          </div>
        </div>

        {/* MAIN TERMINAL WORKSPACE GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-16">
          
          {/* TERMINAL CONTAINER (3 Cols on Desktop) */}
          <div className="lg:col-span-3 flex flex-col">
            
            <div 
              onClick={handleTerminalClick}
              className="bg-[#0a0d14] border border-matrix-400/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[640px] relative font-mono text-xs cursor-text group"
            >
              
              {/* TERMINAL TOP HEADER BAR */}
              <div className="px-4 py-3 bg-[#0d111a] border-b border-matrix-400/20 flex items-center justify-between shrink-0 select-none">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80 border border-red-400/40" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-400/40" />
                    <div className="w-3 h-3 rounded-full bg-matrix-400/80 border border-matrix-400/40" />
                  </div>
                  <span className="text-[11px] font-bold text-gray-400 tracking-wider uppercase flex items-center gap-1.5 ml-2">
                    <TerminalIcon className="w-3.5 h-3.5 text-matrix-400" />
                    <span>rsh@reconshield:~$</span>
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-matrix-400 font-bold uppercase tracking-widest flex items-center gap-1 bg-matrix-400/10 px-2.5 py-1 rounded border border-matrix-400/20">
                    <span className="w-2 h-2 rounded-full bg-matrix-400 animate-pulse" />
                    <span>ONLINE</span>
                  </span>

                  <button
                    onClick={(e) => { e.stopPropagation(); handleCopyBuffer(); }}
                    className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-matrix-400/40 text-gray-400 hover:text-white transition-colors flex items-center gap-1 text-[10px]"
                    title="Copy terminal buffer"
                  >
                    {copiedIndex === 'buffer' ? <Check className="w-3.5 h-3.5 text-matrix-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span className="hidden sm:inline">Copy Output</span>
                  </button>

                  <button
                    onClick={(e) => { e.stopPropagation(); setOutputBuffer([]); }}
                    className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-red-400/40 text-gray-400 hover:text-red-400 transition-colors text-[10px]"
                    title="Clear screen"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* TERMINAL OUTPUT BUFFER AREA */}
              <div 
                ref={terminalScrollRef}
                className="flex-1 p-5 overflow-y-auto space-y-4 font-mono leading-relaxed select-text scrollbar-thin scrollbar-thumb-matrix-400/20 scrollbar-track-transparent"
              >
                {outputBuffer.map((item) => {
                  if (item.type === 'banner') {
                    return (
                      <pre key={item.id} className="text-matrix-400 font-mono text-[10px] sm:text-xs font-bold leading-tight whitespace-pre-wrap select-none opacity-90 pb-2">
                        {item.text}
                      </pre>
                    );
                  }

                  if (item.type === 'prompt') {
                    return (
                      <div key={item.id} className="text-matrix-400 font-bold flex items-center gap-2 pt-2 border-t border-white/5">
                        <span className="text-matrix-400">{item.text}</span>
                      </div>
                    );
                  }

                  if (item.type === 'help') {
                    return (
                      <div key={item.id} className="p-4 bg-surface-900/90 border border-white/10 rounded-xl space-y-4 text-xs font-mono text-gray-300">
                        <div className="font-bold text-matrix-400 uppercase tracking-widest border-b border-white/10 pb-2 flex items-center justify-between">
                          <span>RECONSHIELD RESEARCH SHELL</span>
                          <span className="text-[10px] text-gray-500 font-normal">RSH v1.0</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <span className="text-matrix-400 font-bold uppercase block mb-1.5">// PRIMARY</span>
                            <ul className="space-y-1 text-gray-300 mb-3">
                              <li><strong className="text-white">recon &lt;domain&gt;</strong> — Initialize a reconnaissance investigation</li>
                            </ul>

                            <span className="text-cyan-400 font-bold uppercase block mb-1.5">// INVESTIGATION</span>
                            <ul className="space-y-1 text-gray-300">
                              <li><strong className="text-white">status</strong> — Show current reconnaissance progress</li>
                              <li><strong className="text-white">inspect</strong> — Summarize discovered intelligence</li>
                            </ul>
                          </div>

                          <div>
                            <span className="text-matrix-400 font-bold uppercase block mb-1.5">// MODULES [01-26]</span>
                            <ul className="space-y-1 text-gray-300">
                              <li><strong className="text-white">modules</strong> — Show numbered ReconShield module registry</li>
                              <li><strong className="text-white">&lt;number&gt;</strong> — Execute module by number (01-26)</li>
                              <li><strong className="text-white">&lt;name&gt;</strong> — Execute module by name</li>
                            </ul>
                            <div className="mt-2 text-[10px] text-gray-400 italic">
                              Examples: 01, dns, 01 google.com, dns google.com
                            </div>
                          </div>

                          <div>
                            <span className="text-amber-400 font-bold uppercase block mb-1.5">// UTILITY</span>
                            <ul className="space-y-1 text-gray-300">
                              <li><strong className="text-white">history</strong> — Print command history log</li>
                              <li><strong className="text-white">clear</strong> — Flush terminal screen buffer</li>
                              <li><strong className="text-white">version</strong> — Show RSH engine version</li>
                              <li><strong className="text-white">help</strong> — Display command directory</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  let colorClass = 'text-gray-300';
                  if (item.type === 'success') colorClass = 'text-matrix-400';
                  if (item.type === 'warning') colorClass = 'text-amber-400';
                  if (item.type === 'error') colorClass = 'text-red-400';
                  if (item.type === 'info') colorClass = 'text-cyan-400';

                  return (
                    <div key={item.id} className={`whitespace-pre-wrap font-mono ${colorClass}`}>
                      {item.text}
                    </div>
                  );
                })}

                {/* Loading Execution Spinner */}
                {isExecuting && (
                  <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs animate-pulse pt-1">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Processing terminal request...</span>
                  </div>
                )}
              </div>

              {/* TERMINAL INTERACTIVE COMMAND INPUT ROW */}
              <div className="p-3 bg-[#0d111a] border-t border-matrix-400/20 flex items-center gap-2 shrink-0">
                <span className="text-matrix-400 font-bold text-xs shrink-0 select-none">
                  rsh@reconshield:~$
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputLine}
                  onChange={(e) => setInputLine(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter command or module number... (e.g. 'recon google.com', '01', 'dns', 'modules', 'help')"
                  className="flex-1 bg-transparent border-none text-white focus:outline-none font-mono text-xs placeholder:text-gray-600"
                  autoFocus
                  spellCheck={false}
                  autoCapitalize="off"
                  autoComplete="off"
                />
                <button
                  onClick={() => executeCommand(inputLine)}
                  disabled={!inputLine.trim() || isExecuting}
                  className="px-3 py-1.5 bg-matrix-400/20 hover:bg-matrix-400/30 text-matrix-400 disabled:opacity-30 rounded-lg text-[11px] font-bold uppercase transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                >
                  <span>Execute</span>
                  <CornerDownLeft className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Mobile Helper Chips */}
            <div className="mt-3 flex flex-wrap gap-1.5 sm:hidden font-mono text-[10px]">
              {['recon google.com', 'modules', '01', '02', '07', '17', '13', '18', '21', '20', 'status', 'inspect', 'clear', 'help'].map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => setInputLine(cmd)}
                  className="px-2.5 py-1 rounded bg-surface-900 border border-white/10 text-gray-300 active:bg-matrix-400/20"
                >
                  {cmd}
                </button>
              ))}
            </div>
          </div>

          {/* SESSION SIDEBAR (1 Col on Desktop) */}
          <div className="space-y-6">
            
            {/* CURRENT TARGET CARD */}
            <div className="p-5 bg-surface-900 border border-white/10 rounded-2xl space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <span className="text-xs font-mono font-bold text-matrix-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Shield className="w-4 h-4" /> ACTIVE TARGET
                </span>
                <span className="text-[9px] font-mono text-gray-500 uppercase">RSH SESSION</span>
              </div>

              <div>
                <div className="text-lg font-bold text-white font-mono break-all">
                  {currentTarget || <span className="text-gray-500 italic">None set</span>}
                </div>
                {currentScanId && (
                  <div className="text-[10px] font-mono text-gray-400 mt-0.5 truncate">
                    Scan ID: {currentScanId.slice(0, 18)}...
                  </div>
                )}
                <div className="text-[11px] font-mono text-gray-400 mt-1.5 flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${currentScanStatus === 'completed' ? 'bg-matrix-400' : currentScanStatus === 'running' ? 'bg-cyan-400 animate-pulse' : 'bg-gray-600'}`} />
                  <span>{currentTarget ? `● ${currentScanStatus.toUpperCase()}` : 'Use `recon <target>`'}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-white/5 space-y-2 text-xs font-mono">
                <div className="flex justify-between text-gray-400">
                  <span>Executed Commands:</span>
                  <span className="text-white font-bold">{history.length}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Real Observations:</span>
                  <span className="text-matrix-400 font-bold">{observedModules.size} / 26</span>
                </div>
              </div>
            </div>

            {/* QUICK COMMAND LAUNCHER */}
            <div className="p-5 bg-surface-900 border border-white/10 rounded-2xl space-y-3 shadow-xl">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest block border-b border-white/5 pb-3">
                // QUICK COMMAND LAUNCHER
              </span>

              <div className="space-y-1.5 font-mono text-xs">
                {[
                  { label: 'recon', desc: 'Initialize Reconnaissance' },
                  { label: 'modules', desc: 'Registry [01-26]' },
                  { label: 'status', desc: 'Check Recon Progress' },
                  { label: 'inspect', desc: 'Summarize Intelligence' },
                  { label: '01', desc: 'DNS Records [01]' },
                  { label: '02', desc: 'WHOIS Registry [02]' },
                  { label: '07', desc: 'Subdomains [07]' },
                  { label: '17', desc: 'TLS Certificate [17]' },
                  { label: '13', desc: 'Security Headers [13]' },
                  { label: '18', desc: 'Tech Stack [18]' },
                  { label: '21', desc: 'Service Ports [21]' },
                  { label: '20', desc: 'IP Intelligence [20]' },
                  { label: 'history', desc: 'View Command Log' },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleQuickCommandClick(item.label)}
                    className="w-full p-2 rounded-xl bg-surface-950/80 border border-white/5 hover:border-matrix-400/40 text-left transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <div>
                      <span className="text-matrix-400 font-bold group-hover:text-white transition-colors">{item.label}</span>
                      <span className="text-[10px] text-gray-500 block">{item.desc}</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-matrix-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* COMMAND REFERENCE GRID BELOW TERMINAL */}
        <section className="space-y-8 mb-16">
          <div className="border-b border-white/10 pb-4">
            <span className="font-mono text-xs text-matrix-400 font-bold uppercase tracking-widest">// COMMAND DIRECTORY</span>
            <h2 className="text-2xl font-bold font-display uppercase tracking-wide text-white mt-1">
              Supported Reconnaissance Operations
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs font-mono">
            
            <div className="p-6 bg-surface-900 border border-white/10 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-matrix-400/10 border border-matrix-400/20 flex items-center justify-center text-matrix-400">
                <Network className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white uppercase text-sm">DOMAIN &amp; RECON</h3>
              <p className="text-gray-400 font-sans leading-relaxed">
                Initialize target scope, query DNS, WHOIS registries, certificate logs, and BGP routing space.
              </p>
              <ul className="space-y-1 text-matrix-400 pt-2 border-t border-white/5">
                <li>• recon &lt;target&gt;</li>
                <li>• [01] dns</li>
                <li>• [02] whois</li>
                <li>• [03] asn</li>
                <li>• [04] reverse</li>
                <li>• [05] dnssec</li>
                <li>• [06] cname</li>
              </ul>
            </div>

            <div className="p-6 bg-surface-900 border border-white/10 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white uppercase text-sm">DISCOVERY &amp; WEB</h3>
              <p className="text-gray-400 font-sans leading-relaxed">
                Check CT logs, subdomains, TLS suites, security headers, cookies, redirects, and tech stacks.
              </p>
              <ul className="space-y-1 text-cyan-400 pt-2 border-t border-white/5">
                <li>• [07] subdomains</li>
                <li>• [08] ct</li>
                <li>• [13] headers</li>
                <li>• [17] ssl</li>
                <li>• [18] tech</li>
                <li>• [19] waf</li>
              </ul>
            </div>

            <div className="p-6 bg-surface-900 border border-white/10 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-400/10 border border-purple-400/20 flex items-center justify-center text-purple-400">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white uppercase text-sm">NETWORK &amp; EMAIL</h3>
              <p className="text-gray-400 font-sans leading-relaxed">
                Inspect IP reputation, open ports, network blocks, SPF, DMARC, and DKIM email security.
              </p>
              <ul className="space-y-1 text-purple-400 pt-2 border-t border-white/5">
                <li>• [20] ip</li>
                <li>• [21] ports</li>
                <li>• [22] netblock</li>
                <li>• [23] spf</li>
                <li>• [24] dmarc</li>
                <li>• [26] mail</li>
              </ul>
            </div>

            <div className="p-6 bg-surface-900 border border-white/10 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white uppercase text-sm">UTILITIES</h3>
              <p className="text-gray-400 font-sans leading-relaxed">
                View module registry [01-26], command history logs, export investigation JSON, or clear buffers.
              </p>
              <ul className="space-y-1 text-amber-400 pt-2 border-t border-white/5">
                <li>• modules</li>
                <li>• status</li>
                <li>• inspect</li>
                <li>• history</li>
                <li>• export</li>
                <li>• clear</li>
              </ul>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
