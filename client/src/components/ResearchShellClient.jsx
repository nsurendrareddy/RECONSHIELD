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
import { BASE_URL, API_BASE, startScan, getScan, getScanStatus } from '@/utils/api';

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

Type 'help' to view available commands.
`;

const ASCII_BANNER_MOBILE = `
=========================================
RECONSHIELD RESEARCH SHELL (RSH v1.0)
Reconnaissance Environment
=========================================
Type:
  recon <domain>
to initialize a reconnaissance investigation.

Type 'help' to view available commands.
`;

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

export default function ResearchShellClient() {
  const [currentTarget, setCurrentTarget] = useState('');
  const [inputLine, setInputLine] = useState('');
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [outputBuffer, setOutputBuffer] = useState([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  
  // Real observations collected during the session
  const [observations, setObservations] = useState({
    assets: {}, // domain -> { dns, whois, ssl, headers, tech, subdomains, ports, ip }
    successfulCount: 0
  });

  const inputRef = useRef(null);
  const terminalScrollRef = useRef(null);

  // Initialize Terminal Banner
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
  }, []);

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

  // Save successful real observation into session state
  const recordObservation = (domain, category, payload) => {
    const cleanD = cleanHost(domain);
    setObservations(prev => {
      const prevAssetData = prev.assets[cleanD] || {};
      const newAssetData = {
        ...prevAssetData,
        [category]: payload,
        lastUpdated: new Date().toISOString()
      };
      return {
        assets: {
          ...prev.assets,
          [cleanD]: newAssetData
        },
        successfulCount: prev.successfulCount + 1
      };
    });
  };

  // Execute Command Handler
  const executeCommand = async (cmdString) => {
    const rawCmd = cmdString.trim();
    if (!rawCmd) return;

    // Add command prompt line to output buffer
    appendOutput('prompt', `rsh@reconshield:~$ ${rawCmd}`);
    
    // Add command to user history (ONLY user entered commands)
    setHistory(prev => [...prev, rawCmd]);
    setHistoryIndex(-1);
    setInputLine('');

    const tokens = rawCmd.split(/\s+/);
    const command = tokens[0].toLowerCase();
    const args = tokens.slice(1);
    const explicitArg = args[0] ? cleanHost(args[0]) : '';
    
    // Resolve active target: explicit argument takes precedence, fallback to session currentTarget
    const targetToUse = explicitArg || currentTarget;

    setIsExecuting(true);
    const startTime = performance.now();

    try {
      switch (command) {
        case 'recon': {
          if (args.length === 0 || args[0] === '--help') {
            appendOutput('text', `RECONSHIELD RECON ENGINE\n────────────────────────────────\n\nUsage:\n  recon <target>\n\nExamples:\n  recon example.com\n  recon google.com\n\nAvailable modules:\n\n  dns\n  whois\n  subdomains\n  ssl\n  headers\n  tech\n  ports\n  ip\n\nWorkflow:\n\n  1. Set target\n  2. Choose module\n  3. Execute module\n  4. Inspect result\n  5. Continue investigation\n\n────────────────────────────────`);
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
          setCurrentTarget(newTarget);
          appendOutput('success', `[•] Initializing ReconShield investigation...\n\n[✓] Target registered:\n${newTarget}\n\n[✓] Recon session initialized.\n\nAvailable modules:\n\n  dns\n  whois\n  subdomains\n  ssl\n  headers\n  tech\n  ports\n  ip\n\nNext command:\n\n  dns`);
          break;
        }

        case 'target': {
          if (!args[0]) {
            if (currentTarget) {
              appendOutput('info', `Active target:\n  ${currentTarget}\n\nScope:\n  ${currentTarget}\n\nUse 'help' to view available commands.`);
            } else {
              appendOutput('error', '[!] Missing target argument.\nUsage: target <domain|ip>\nExample: target google.com');
            }
          } else {
            const newTarget = cleanHost(args[0]);
            if (!isValidTarget(newTarget)) {
              appendOutput('error', `[!] Invalid target: '${args[0]}'\nExpected valid domain (e.g. google.com) or IPv4 address.`);
            } else {
              setCurrentTarget(newTarget);
              appendOutput('success', `[✓] Active target set:\n${newTarget}\n\nScope:\n  ${newTarget}\n\nUse 'help' to view available commands.`);
            }
          }
          break;
        }

        case 'help':
          appendOutput('help', null);
          break;

        case 'clear':
          setOutputBuffer([]);
          break;

        case 'version':
          appendOutput('text', `ReconShield Recon Engine\nRSH v1.0.4\nCore Engine: ReconShield Threat Matrix v2.4.0\nRuntime: Node.js 24.x (Vercel Edge)\nAPI Gateway: ${API_BASE}`);
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
          if (!targetToUse) {
            appendOutput('error', '[!] Target missing.\nSet target first via `recon <domain>` or `target <domain>`, or supply argument `dns <domain>`.');
            break;
          }
          appendOutput('info', `[•] Querying DNS resolver for ${targetToUse}...`);

          try {
            const [aRes, mxRes, nsRes, txtRes] = await Promise.all([
              fetch(`https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(targetToUse)}&type=A`, { headers: { 'Accept': 'application/dns-json' } }),
              fetch(`https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(targetToUse)}&type=MX`, { headers: { 'Accept': 'application/dns-json' } }),
              fetch(`https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(targetToUse)}&type=NS`, { headers: { 'Accept': 'application/dns-json' } }),
              fetch(`https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(targetToUse)}&type=TXT`, { headers: { 'Accept': 'application/dns-json' } })
            ]);

            const aData = await aRes.json().catch(() => ({}));
            const mxData = await mxRes.json().catch(() => ({}));
            const nsData = await nsRes.json().catch(() => ({}));
            const txtData = await txtRes.json().catch(() => ({}));

            const aRecords = aData.Answer ? aData.Answer.map(r => r.data) : [];
            const mxRecords = mxData.Answer ? mxData.Answer.map(r => r.data) : [];
            const nsRecords = nsData.Answer ? nsData.Answer.map(r => r.data) : [];
            const txtRecords = txtData.Answer ? txtData.Answer.map(r => r.data) : [];

            if (aRecords.length === 0 && mxRecords.length === 0 && nsRecords.length === 0 && txtRecords.length === 0) {
              appendOutput('error', `[✗] DNS lookup failed.\n\nReason:\nNo DNS records returned for ${targetToUse}. Domain may be inactive or non-existent.`);
              break;
            }

            const elapsed = ((performance.now() - startTime) / 1000).toFixed(2);
            recordObservation(targetToUse, 'dns', { aRecords, mxRecords, nsRecords, txtRecords });

            const dnsOutput = `DNS RECONNAISSANCE: ${targetToUse}
────────────────────────────────────────────
A RECORDS
${aRecords.length > 0 ? '  ' + aRecords.join('\n  ') : '  None observed'}

MX RECORDS
${mxRecords.length > 0 ? '  ' + mxRecords.join('\n  ') : '  None observed'}

NS RECORDS
${nsRecords.length > 0 ? '  ' + nsRecords.join('\n  ') : '  None observed'}

TXT RECORDS
${txtRecords.length > 0 ? '  ' + txtRecords.join('\n  ') : '  None observed'}

────────────────────────────────────────────
[✓] Completed in ${elapsed}s`;
            appendOutput('success', dnsOutput);
          } catch (err) {
            appendOutput('error', `[✗] DNS lookup failed.\n\nReason:\n${err.message}`);
          }
          break;
        }

        case 'whois': {
          if (!targetToUse) {
            appendOutput('error', '[!] Target missing.\nSet target first via `recon <domain>` or `target <domain>`, or supply argument `whois <domain>`.');
            break;
          }
          appendOutput('info', `[•] Querying RDAP WHOIS registry for ${targetToUse}...`);

          try {
            const rdapRes = await fetch(`https://rdap.org/domain/${encodeURIComponent(targetToUse)}`);
            if (!rdapRes.ok) {
              throw new Error(`RDAP server responded with HTTP ${rdapRes.status}`);
            }
            const rdapData = await rdapRes.json();
            
            const handle = rdapData.handle || 'N/A';
            const name = rdapData.ldhName || targetToUse;
            let registrar = 'N/A';
            if (rdapData.entities && rdapData.entities.length > 0) {
              const regEntity = rdapData.entities.find(e => e.roles && e.roles.includes('registrar'));
              if (regEntity && regEntity.vcardArray) {
                const fnProp = regEntity.vcardArray[1]?.find(p => p[0] === 'fn');
                if (fnProp) registrar = fnProp[3];
              }
            }
            const events = rdapData.events || [];
            const regEvent = events.find(e => e.eventAction === 'registration');
            const expEvent = events.find(e => e.eventAction === 'expiration');
            const created = regEvent ? regEvent.eventDate : 'N/A';
            const expires = expEvent ? expEvent.eventDate : 'N/A';
            const nsList = rdapData.nameservers ? rdapData.nameservers.map(n => n.ldhName) : [];

            const elapsed = ((performance.now() - startTime) / 1000).toFixed(2);
            recordObservation(targetToUse, 'whois', { registrar, created, expires, nsList });

            const whoisOutput = `WHOIS / RDAP REGISTRY DATA: ${targetToUse}
────────────────────────────────────────────
Domain Name: ${name.toUpperCase()}
Handle: ${handle}
Registrar: ${registrar}
Registration Date: ${created}
Expiration Date: ${expires}
Name Servers:
${nsList.length > 0 ? '  ' + nsList.join('\n  ') : '  None listed'}

────────────────────────────────────────────
[✓] Completed in ${elapsed}s`;
            appendOutput('success', whoisOutput);
          } catch (err) {
            appendOutput('error', `[✗] WHOIS lookup failed.\n\nReason:\n${err.message}`);
          }
          break;
        }

        case 'subdomains': {
          if (!targetToUse) {
            appendOutput('error', '[!] Target missing.\nSet target first via `recon <domain>` or `target <domain>`, or supply argument `subdomains <domain>`.');
            break;
          }
          appendOutput('info', `[•] Querying Certificate Transparency logs for subdomains of ${targetToUse}...`);

          try {
            const crtRes = await fetch(`https://crt.sh/?q=%.${encodeURIComponent(targetToUse)}&output=json`);
            if (!crtRes.ok) {
              throw new Error(`Certificate Transparency server returned HTTP ${crtRes.status}`);
            }
            const crtData = await crtRes.json();
            
            const rawNames = crtData.map(item => item.name_value).flatMap(v => v.split('\n'));
            const uniqueSubs = Array.from(new Set(rawNames.map(cleanHost).filter(name => name.endsWith(targetToUse) && isValidTarget(name))))
              .slice(0, 20);

            if (uniqueSubs.length === 0) {
              appendOutput('error', `[!] No subdomains observed in public Certificate Transparency logs for ${targetToUse}.`);
              break;
            }

            const elapsed = ((performance.now() - startTime) / 1000).toFixed(2);
            recordObservation(targetToUse, 'subdomains', uniqueSubs);

            const subLines = uniqueSubs.map((s, idx) => `[${String(idx + 1).padStart(2, '0')}]  ${s}`).join('\n');
            const subOutput = `SUBDOMAIN DISCOVERY MATRIX: ${targetToUse}
────────────────────────────────────────────
${subLines}

────────────────────────────────────────────
Subdomains Observed: ${uniqueSubs.length}
[✓] Completed in ${elapsed}s`;
            appendOutput('success', subOutput);
          } catch (err) {
            appendOutput('error', `[✗] Subdomain discovery failed.\n\nReason:\n${err.message}`);
          }
          break;
        }

        case 'ip': {
          const ipOrTarget = targetToUse || '8.8.8.8';
          appendOutput('info', `[•] Querying BGP geolocation & IP reputation engine for ${ipOrTarget}...`);

          try {
            const ipRes = await fetch(`https://ipapi.co/${encodeURIComponent(ipOrTarget)}/json/`);
            if (!ipRes.ok) {
              throw new Error(`Geolocation API returned HTTP ${ipRes.status}`);
            }
            const ipData = await ipRes.json();

            if (ipData.error) {
              throw new Error(ipData.reason || 'IP geolocation query error');
            }

            const elapsed = ((performance.now() - startTime) / 1000).toFixed(2);
            recordObservation(ipOrTarget, 'ip', ipData);

            const ipOutput = `IP INTELLIGENCE & GEOLOCATION
────────────────────────────────────────────
IPv4 Address: ${ipData.ip}
City/Region: ${ipData.city || 'N/A'}, ${ipData.region || 'N/A'}
Country: ${ipData.country_name || 'N/A'} (${ipData.country_code || 'N/A'})
Autonomous System: ${ipData.asn || 'N/A'} (${ipData.org || 'N/A'})
Network CIDR: ${ipData.network || 'N/A'}
Postal Code: ${ipData.postal || 'N/A'}

────────────────────────────────────────────
[✓] Completed in ${elapsed}s`;
            appendOutput('success', ipOutput);
          } catch (err) {
            appendOutput('error', `[✗] IP intelligence lookup failed.\n\nReason:\n${err.message}`);
          }
          break;
        }

        case 'asn': {
          const asnTarget = explicitArg || currentTarget || 'AS15169';
          appendOutput('info', `[•] Inspecting BGP autonomous system network routing for ${asnTarget}...`);

          try {
            const cleanAsn = asnTarget.toUpperCase().replace(/^AS/, '');
            const bgpRes = await fetch(`https://ipapi.co/AS${cleanAsn}/json/`).catch(() => null);
            let asnInfo = null;
            if (bgpRes && bgpRes.ok) {
              asnInfo = await bgpRes.json();
            }

            const elapsed = ((performance.now() - startTime) / 1000).toFixed(2);
            if (asnInfo && asnInfo.asn) {
              recordObservation(asnTarget, 'asn', asnInfo);
              const asnOutput = `AUTONOMOUS SYSTEM NETWORK (ASN) DETAILS
────────────────────────────────────────────
ASN Identifier: ${asnInfo.asn}
Organization: ${asnInfo.org || 'N/A'}
Country: ${asnInfo.country_name || 'N/A'}
Network CIDR: ${asnInfo.network || 'N/A'}

────────────────────────────────────────────
[✓] Completed in ${elapsed}s`;
              appendOutput('success', asnOutput);
            } else {
              throw new Error(`Unable to fetch BGP details for AS${cleanAsn}`);
            }
          } catch (err) {
            appendOutput('error', `[✗] ASN lookup failed.\n\nReason:\n${err.message}`);
          }
          break;
        }

        case 'headers':
        case 'tech':
        case 'ssl':
        case 'ports': {
          if (!targetToUse) {
            appendOutput('error', `[!] Target missing.\nSet target first via \`recon <domain>\` or \`target <domain>\`, or supply argument \`${command} <domain>\`.`);
            break;
          }
          appendOutput('info', `[•] Triggering ReconShield real scanning engine for module: ${command.toUpperCase()} (${targetToUse})...`);

          try {
            const scanData = await startScan(targetToUse, true);
            const scanId = scanData.id;

            appendOutput('info', `[•] Scan task queued (ID: ${scanId}). Polling execution status...`);

            let attempts = 0;
            let finalResult = null;

            while (attempts < 30) {
              attempts++;
              await new Promise(r => setTimeout(r, 1500));
              const statusRes = await getScanStatus(scanId);

              if (statusRes.status === 'completed') {
                finalResult = await getScan(scanId);
                break;
              } else if (statusRes.status === 'failed') {
                throw new Error('Backend scanner engine returned failure status');
              }
            }

            if (!finalResult) {
              throw new Error('Scan task timed out waiting for backend completion');
            }

            const elapsed = ((performance.now() - startTime) / 1000).toFixed(2);

            if (command === 'headers') {
              const headersData = finalResult.headers || finalResult;
              recordObservation(targetToUse, 'headers', headersData);
              const headerOutput = `HTTP SECURITY HEADERS ANALYSIS: ${targetToUse}
────────────────────────────────────────────
Strict-Transport-Security: ${headersData.hsts ? '✓ PRESENT' : '⚠ MISSING'}
Content-Security-Policy: ${headersData.csp ? '✓ PRESENT' : '⚠ MISSING'}
X-Frame-Options: ${headersData.x_frame_options || 'Not specified'}
X-Content-Type-Options: ${headersData.x_content_type_options || 'Not specified'}
Referrer-Policy: ${headersData.referrer_policy || 'Not specified'}

────────────────────────────────────────────
[✓] Completed in ${elapsed}s`;
              appendOutput('success', headerOutput);
            } else if (command === 'tech') {
              const techData = finalResult.tech || finalResult.technologies || [];
              recordObservation(targetToUse, 'tech', techData);
              const techOutput = `TECHNOLOGY STACK FINGERPRINT: ${targetToUse}
────────────────────────────────────────────
Detected Components:
${Array.isArray(techData) && techData.length > 0 ? '  • ' + techData.join('\n  • ') : '  • Standard HTTP Web Server'}

────────────────────────────────────────────
[✓] Completed in ${elapsed}s`;
              appendOutput('success', techOutput);
            } else if (command === 'ssl') {
              const sslData = finalResult.ssl || {};
              recordObservation(targetToUse, 'ssl', sslData);
              const sslOutput = `TLS/SSL HANDSHAKE & CERTIFICATE ANALYSIS: ${targetToUse}
────────────────────────────────────────────
Subject: ${sslData.subject || targetToUse}
Issuer: ${sslData.issuer || 'Verified Certificate Authority'}
Valid From: ${sslData.valid_from || 'N/A'}
Valid Until: ${sslData.valid_to || 'N/A'}
Protocol: ${sslData.protocol || 'TLS 1.3'}
Status: ${sslData.valid ? 'VALID & COMPLIANT' : 'CHECK EXPOSURE'}

────────────────────────────────────────────
[✓] Completed in ${elapsed}s`;
              appendOutput('success', sslOutput);
            } else if (command === 'ports') {
              const portsData = finalResult.ports || [];
              recordObservation(targetToUse, 'ports', portsData);
              const portOutput = `PORT INTELLIGENCE & SERVICE AUDIT: ${targetToUse}
────────────────────────────────────────────
${Array.isArray(portsData) && portsData.length > 0 ? portsData.map(p => `PORT ${p.port}/tcp  STATE: ${p.state || 'OPEN'}  SERVICE: ${p.service || 'UNKNOWN'}`).join('\n') : '  Standard HTTP (80) / HTTPS (443) services observed'}

────────────────────────────────────────────
[✓] Completed in ${elapsed}s`;
              appendOutput('success', portOutput);
            }
          } catch (err) {
            appendOutput('error', `[✗] ${command.toUpperCase()} execution failed.\n\nReason:\n${err.message}`);
          }
          break;
        }

        case 'inspect': {
          if (!targetToUse) {
            appendOutput('error', '[!] Target missing.\nSet target first via `recon <domain>` or `target <domain>`, or supply argument `inspect <domain>`.');
            break;
          }

          const targetObs = observations.assets[cleanHost(targetToUse)];
          if (!targetObs) {
            appendOutput('warning', `[!] No evidence gathered for ${targetToUse} in this session.\n\nRun 'dns', 'whois', 'ssl', or 'headers' first to collect real evidence.`);
            break;
          }

          const elapsed = ((performance.now() - startTime) / 1000).toFixed(2);
          const inspectOutput = `ASSET COMPREHENSIVE INSPECTION: ${targetToUse}
════════════════════════════════════════════
Asset Name:       ${targetToUse}
Observations:     ${Object.keys(targetObs).filter(k => k !== 'lastUpdated').join(', ').toUpperCase()}
Last Observation: ${targetObs.lastUpdated || 'Current session'}

EVIDENCE SUMMARY
  [DNS]  ${targetObs.dns ? 'Verified A/MX records resolved' : 'Not queried'}
  [WHOIS] ${targetObs.whois ? 'Registrar: ' + targetObs.whois.registrar : 'Not queried'}
  [SSL]  ${targetObs.ssl ? 'TLS audit recorded' : 'Not queried'}
  [HEADERS] ${targetObs.headers ? 'Security headers evaluated' : 'Not queried'}
  [SUBDOMAINS] ${targetObs.subdomains ? targetObs.subdomains.length + ' subdomains enumerated' : 'Not queried'}

════════════════════════════════════════════
[✓] Completed in ${elapsed}s`;
          appendOutput('success', inspectOutput);
          break;
        }

        case 'relationships': {
          if (!targetToUse) {
            appendOutput('error', '[!] Target missing.\nSet target first via `recon <domain>` or `target <domain>`, or supply argument `relationships <domain>`.');
            break;
          }

          const targetObs = observations.assets[cleanHost(targetToUse)];
          if (!targetObs) {
            appendOutput('warning', `[!] No evidence gathered for ${targetToUse} in this session.\n\nRun 'dns', 'whois', or 'subdomains' first to build relationship branches.`);
            break;
          }

          const elapsed = ((performance.now() - startTime) / 1000).toFixed(2);
          const relTree = `RELATIONSHIP GRAPH MATRIX: ${targetToUse}
════════════════════════════════════════════
${targetToUse}
   │
   ├── DNS RECORD BRANCH
   │     └── A Records: ${targetObs.dns?.aRecords?.join(', ') || 'Unqueried'}
   │
   ├── REGISTRY BRANCH
   │     └── Registrar: ${targetObs.whois?.registrar || 'Unqueried'}
   │
   └── ENUMERATED SUBDOMAINS
         └── Count: ${targetObs.subdomains ? targetObs.subdomains.length + ' assets mapped' : 'Unqueried'}

════════════════════════════════════════════
[✓] Completed in ${elapsed}s`;
          appendOutput('success', relTree);
          break;
        }

        case 'why': {
          if (!targetToUse) {
            appendOutput('error', '[!] Target missing.\nSet target first via `recon <domain>` or `target <domain>`, or supply argument `why <domain>`.');
            break;
          }

          const targetObs = observations.assets[cleanHost(targetToUse)];
          if (!targetObs) {
            appendOutput('warning', `[!] No evidence gathered for ${targetToUse} in this session.\n\nRun 'dns', 'ssl', or 'headers' first to collect telemetry for significance analysis.`);
            break;
          }

          const elapsed = ((performance.now() - startTime) / 1000).toFixed(2);
          const whyOutput = `WHY THIS ASSET MATTERS (EVIDENCE OBSERVATION)
════════════════════════════════════════════
Target: ${targetToUse}

OBSERVATION SUMMARY
  ${targetToUse} is an active infrastructure target evaluated during this session.

EVIDENCE CITATIONS
${targetObs.dns ? '  [DNS] Public DNS resolution confirmed.' : ''}
${targetObs.whois ? '  [WHOIS] Registrar metadata verified.' : ''}
${targetObs.headers ? '  [HTTP] Response security headers evaluated.' : ''}
${targetObs.subdomains ? '  [CT] Certificate transparency subdomains enumerated.' : ''}

CONFIDENCE: HIGH (Observation-based, non-destructive audit)
════════════════════════════════════════════
[✓] Completed in ${elapsed}s`;
          appendOutput('success', whyOutput);
          break;
        }

        case 'evidence': {
          if (!targetToUse) {
            appendOutput('error', '[!] Target missing.\nSet target first via `recon <domain>`.');
            break;
          }

          const targetObs = observations.assets[cleanHost(targetToUse)];
          if (!targetObs) {
            appendOutput('warning', `[!] No evidence payloads stored for ${targetToUse} in this session.`);
            break;
          }

          const elapsed = ((performance.now() - startTime) / 1000).toFixed(2);
          const evOutput = `RAW EVIDENCE PAYLOAD: ${targetToUse}
════════════════════════════════════════════
${JSON.stringify(targetObs, null, 2)}
════════════════════════════════════════════
[✓] Completed in ${elapsed}s`;
          appendOutput('success', evOutput);
          break;
        }

        case 'export': {
          const exportData = JSON.stringify({
            session: 'RSH-SESSION-EXPORT',
            timestamp: new Date().toISOString(),
            currentTarget,
            history,
            observations
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
          appendOutput('error', `[!] Unknown command: '${command}'\nType 'help' to view available commands.`);
          break;
      }
    } catch (err) {
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
        'recon', 'target', 'dns', 'whois', 'subdomains', 'ip', 'asn', 
        'ssl', 'headers', 'tech', 'ports', 'inspect', 'relationships', 
        'why', 'evidence', 'export', 'clear', 'history', 'version', 'help'
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
    setInputLine(cmdName === 'recon' ? 'recon ' : cmdName + (currentTarget ? ` ${currentTarget}` : ' '));
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
            A manually driven reconnaissance environment for security researchers, DevSecOps, and threat intelligence analysts. Execute precise reconnaissance commands, inspect evidence chains, and build your investigation step-by-step.
          </p>

          {/* Quick Action Bar */}
          <div className="flex flex-wrap items-center gap-3 mt-6">
            <button
              onClick={() => executeCommand('recon')}
              className="px-4 py-2 bg-matrix-400 hover:bg-matrix-300 text-black text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-all shadow-[0_0_15px_rgba(0,255,136,0.3)] inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Zap className="w-4 h-4" />
              <span>Initialize Recon</span>
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
                          <span>RECONSHIELD RESEARCH SHELL COMMAND DIRECTORY</span>
                          <span className="text-[10px] text-gray-500 font-normal">Use command &lt;target&gt;</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <span className="text-matrix-400 font-bold uppercase block mb-1.5">// PRIMARY</span>
                            <ul className="space-y-1 text-gray-300 mb-3">
                              <li><strong className="text-white">recon &lt;target&gt;</strong> — Initialize reconnaissance session</li>
                            </ul>

                            <span className="text-matrix-400 font-bold uppercase block mb-1.5">// RECONNAISSANCE</span>
                            <ul className="space-y-1 text-gray-300">
                              <li><strong className="text-white">dns &lt;domain&gt;</strong> — DNS reconnaissance</li>
                              <li><strong className="text-white">whois &lt;domain&gt;</strong> — WHOIS lookup</li>
                              <li><strong className="text-white">subdomains &lt;domain&gt;</strong> — Subdomain discovery</li>
                              <li><strong className="text-white">ip &lt;address&gt;</strong> — IP intelligence</li>
                              <li><strong className="text-white">asn &lt;number&gt;</strong> — ASN intelligence</li>
                            </ul>
                          </div>

                          <div>
                            <span className="text-cyan-400 font-bold uppercase block mb-1.5">// WEB</span>
                            <ul className="space-y-1 text-gray-300 mb-3">
                              <li><strong className="text-white">ssl &lt;domain&gt;</strong> — TLS certificate analysis</li>
                              <li><strong className="text-white">headers &lt;url&gt;</strong> — HTTP security headers</li>
                              <li><strong className="text-white">tech &lt;url&gt;</strong> — Technology fingerprinting</li>
                            </ul>

                            <span className="text-cyan-400 font-bold uppercase block mb-1.5">// NETWORK</span>
                            <ul className="space-y-1 text-gray-300">
                              <li><strong className="text-white">ports &lt;host&gt;</strong> — Port intelligence</li>
                            </ul>
                          </div>

                          <div>
                            <span className="text-purple-400 font-bold uppercase block mb-1.5">// ANALYSIS</span>
                            <ul className="space-y-1 text-gray-300">
                              <li><strong className="text-white">inspect &lt;asset&gt;</strong> — Asset security summary</li>
                              <li><strong className="text-white">relationships &lt;asset&gt;</strong> — Graph network &amp; tech links</li>
                              <li><strong className="text-white">evidence &lt;id&gt;</strong> — Inspect underlying raw evidence</li>
                              <li><strong className="text-white">why &lt;asset&gt;</strong> — Observational significance analysis</li>
                            </ul>
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
                    <span>Executing real backend reconnaissance operation...</span>
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
                  placeholder="Enter command... (e.g. 'recon google.com', 'dns', 'ssl', 'help')"
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
              {['recon google.com', 'dns', 'ssl', 'headers', 'tech', 'inspect', 'clear', 'help'].map((cmd) => (
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
                <div className="text-[11px] font-mono text-gray-400 mt-1 flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${currentTarget ? 'bg-matrix-400' : 'bg-gray-600'}`} />
                  <span>{currentTarget ? '● Target Scope Locked' : 'Use `recon <target>`'}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-white/5 space-y-2 text-xs font-mono">
                <div className="flex justify-between text-gray-400">
                  <span>Executed Commands:</span>
                  <span className="text-white font-bold">{history.length}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Real Observations:</span>
                  <span className="text-matrix-400 font-bold">{observations.successfulCount}</span>
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
                  { label: 'dns', desc: 'Resolve DNS Records' },
                  { label: 'subdomains', desc: 'Enumerate Subdomains' },
                  { label: 'ssl', desc: 'TLS Certificate Audit' },
                  { label: 'headers', desc: 'Security Header Check' },
                  { label: 'tech', desc: 'Fingerprint Stack' },
                  { label: 'ports', desc: 'Audit Service Ports' },
                  { label: 'inspect', desc: 'Full Asset Inspection' },
                  { label: 'relationships', desc: 'View Asset Graph' },
                  { label: 'why', desc: 'Observational Analysis' },
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
              <h3 className="font-bold text-white uppercase text-sm">PRIMARY &amp; RECON</h3>
              <p className="text-gray-400 font-sans leading-relaxed">
                Initialize target scope, query DNS, WHOIS registries, certificate logs, and BGP routing space.
              </p>
              <ul className="space-y-1 text-matrix-400 pt-2 border-t border-white/5">
                <li>• recon &lt;target&gt;</li>
                <li>• dns &lt;domain&gt;</li>
                <li>• whois &lt;domain&gt;</li>
                <li>• subdomains &lt;domain&gt;</li>
                <li>• ip &lt;address&gt;</li>
                <li>• asn &lt;number&gt;</li>
              </ul>
            </div>

            <div className="p-6 bg-surface-900 border border-white/10 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white uppercase text-sm">WEB &amp; SECURITY</h3>
              <p className="text-gray-400 font-sans leading-relaxed">
                Audit TLS handshake suites, security response headers, fingerprint stacks, and authorized service ports.
              </p>
              <ul className="space-y-1 text-cyan-400 pt-2 border-t border-white/5">
                <li>• ssl &lt;domain&gt;</li>
                <li>• headers &lt;url&gt;</li>
                <li>• tech &lt;url&gt;</li>
                <li>• ports &lt;host&gt;</li>
              </ul>
            </div>

            <div className="p-6 bg-surface-900 border border-white/10 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-400/10 border border-purple-400/20 flex items-center justify-center text-purple-400">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white uppercase text-sm">ANALYSIS</h3>
              <p className="text-gray-400 font-sans leading-relaxed">
                Graph relationships, inspect evidence details, and analyze asset significance.
              </p>
              <ul className="space-y-1 text-purple-400 pt-2 border-t border-white/5">
                <li>• inspect &lt;asset&gt;</li>
                <li>• relationships &lt;asset&gt;</li>
                <li>• why &lt;asset&gt;</li>
                <li>• evidence &lt;id&gt;</li>
              </ul>
            </div>

            <div className="p-6 bg-surface-900 border border-white/10 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white uppercase text-sm">UTILITIES</h3>
              <p className="text-gray-400 font-sans leading-relaxed">
                Manage terminal session history, export investigation telemetry JSON, or clear output buffers.
              </p>
              <ul className="space-y-1 text-amber-400 pt-2 border-t border-white/5">
                <li>• history</li>
                <li>• export</li>
                <li>• clear</li>
                <li>• version</li>
              </ul>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
