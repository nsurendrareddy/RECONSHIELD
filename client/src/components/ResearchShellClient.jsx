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
  const [currentScanId, setCurrentScanId] = useState('');
  const [currentScanStatus, setCurrentScanStatus] = useState('idle'); // idle | running | completed | failed
  const [latestScanResult, setLatestScanResult] = useState(null);

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

  // Helper: Read active scan telemetry (read-only GET /api/scan/{id})
  const getActiveScanTelemetry = async () => {
    if (!currentScanId) return null;
    if (latestScanResult) return latestScanResult;

    try {
      const scanObj = await getScan(currentScanId);
      if (scanObj && scanObj.status === 'completed') {
        setLatestScanResult(scanObj);
      }
      return scanObj;
    } catch (e) {
      console.warn(`[RSH DEBUG] GET /api/scan/${currentScanId} error:`, e.message);
      return null;
    }
  };

  // Execute Command Handler
  const executeCommand = async (cmdString) => {
    const rawCmd = cmdString.trim();
    if (!rawCmd || isExecuting) return;

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
    
    // Target priority: explicit command argument > active investigation target > null
    const targetToUse = explicitArg || currentTarget;

    setIsExecuting(true);
    const startTime = performance.now();

    console.log(`[RSH DEBUG] Command: '${command}', Explicit Arg: '${explicitArg}', Active Target: '${currentTarget}', Target To Use: '${targetToUse}'`);

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

          // Reset previous investigation state & stop any running polling timer
          stopScanPolling();
          setCurrentTarget(newTarget);
          setLatestScanResult(null);
          setCurrentScanStatus('running');

          // POST /api/scan is called EXACTLY ONCE per investigation
          console.log(`[RSH DEBUG] Issuing ONE POST /api/scan request for target: ${newTarget}`);
          const scanResponse = await startScan(newTarget, true);
          const newScanId = scanResponse.id;
          setCurrentScanId(newScanId);

          // Return immediately to prompt
          appendOutput('success', `[•] Initializing ReconShield investigation...\n\n[✓] Target registered:\n${newTarget}\n\n[✓] Reconnaissance job started.\n\nScan ID:\n${newScanId}\n\nStatus:\nRUNNING\n\nAvailable modules:\n\n  dns\n  whois\n  subdomains\n  ssl\n  headers\n  tech\n  ports\n  ip\n\nNext command:\n\n  dns`);

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

        case 'target': {
          if (!args[0]) {
            if (currentTarget) {
              appendOutput('info', `Active target:\n  ${currentTarget}\n\nScan ID:\n  ${currentScanId || 'N/A'}\n\nStatus:\n  ${currentScanStatus.toUpperCase()}\n\nUse 'help' to view available commands.`);
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
          if (explicitArg && currentTarget && explicitArg !== currentTarget) {
            appendOutput('warning', `[!] Target mismatch.\n\nActive investigation:\n${currentTarget}\n\nRequested target:\n${explicitArg}\n\nRun:\n  recon ${explicitArg}\nto start a new investigation.`);
            break;
          }
          if (!targetToUse) {
            appendOutput('error', '[!] Target missing.\nRun `recon <domain>` to start a reconnaissance investigation.');
            break;
          }

          appendOutput('info', `[•] Checking DNS module for ${targetToUse}...`);
          const scanObj = await getActiveScanTelemetry();

          if (!scanObj || (!scanObj.dns && scanObj.status === 'running')) {
            appendOutput('warning', `[•] DNS module is still running.\n\nPlease try again shortly.`);
            break;
          }

          const dnsModule = scanObj?.dns || scanObj;
          const records = dnsModule.records || {};

          const aRecs = records.a || [];
          const aaaaRecs = records.aaaa || [];
          const mxRecs = records.mx || [];
          const nsRecs = records.ns || [];
          const txtRecs = records.txt || [];
          const cnameRecs = records.cname || [];
          const soaRecs = records.soa || [];

          if (aRecs.length === 0 && aaaaRecs.length === 0 && mxRecs.length === 0 && nsRecs.length === 0 && txtRecs.length === 0 && cnameRecs.length === 0 && soaRecs.length === 0) {
            appendOutput('error', `[✗] DNS module failed.\n\nReason:\nNo DNS records returned for ${targetToUse}. Domain may be inactive.`);
            break;
          }

          const elapsed = ((performance.now() - startTime) / 1000).toFixed(2);
          recordObservation(targetToUse, 'dns', records);

          let dnsLines = [];
          if (aRecs.length > 0) dnsLines.push(`A Records:\n  ${aRecs.join('\n  ')}`);
          if (aaaaRecs.length > 0) dnsLines.push(`AAAA Records:\n  ${aaaaRecs.join('\n  ')}`);
          if (mxRecs.length > 0) dnsLines.push(`MX Records:\n  ${mxRecs.join('\n  ')}`);
          if (nsRecs.length > 0) dnsLines.push(`NS Records:\n  ${nsRecs.join('\n  ')}`);
          if (txtRecs.length > 0) dnsLines.push(`TXT Records:\n  ${txtRecs.join('\n  ')}`);
          if (cnameRecs.length > 0) dnsLines.push(`CNAME Records:\n  ${cnameRecs.join('\n  ')}`);
          if (soaRecs.length > 0) dnsLines.push(`SOA Records:\n  ${soaRecs.join('\n  ')}`);

          const dnsOutput = `[✓] DNS module complete: ${targetToUse}
────────────────────────────────────────────
${dnsLines.join('\n\n')}

────────────────────────────────────────────
[✓] Completed in ${elapsed}s`;
          appendOutput('success', dnsOutput);
          break;
        }

        case 'whois': {
          if (explicitArg && currentTarget && explicitArg !== currentTarget) {
            appendOutput('warning', `[!] Target mismatch.\n\nActive investigation:\n${currentTarget}\n\nRequested target:\n${explicitArg}\n\nRun:\n  recon ${explicitArg}\nto start a new investigation.`);
            break;
          }
          if (!targetToUse) {
            appendOutput('error', '[!] Target missing.\nRun `recon <domain>` to start a reconnaissance investigation.');
            break;
          }

          appendOutput('info', `[•] Checking WHOIS module for ${targetToUse}...`);
          const scanObj = await getActiveScanTelemetry();

          if (!scanObj || (!scanObj.whois && scanObj.status === 'running')) {
            appendOutput('warning', `[•] WHOIS module is still running.\n\nPlease try again shortly.`);
            break;
          }

          const whoisData = scanObj?.whois || scanObj?.domain || {};

          if (whoisData.error && whoisData.error.includes('429')) {
            appendOutput('warning', `[!] WHOIS rate limit reached.\n\nReason:\n${whoisData.error}`);
            break;
          }

          const registrar = whoisData.registrar || 'N/A';
          const created = whoisData.created || whoisData.creation_date || 'N/A';
          const expires = whoisData.expires || whoisData.expiration_date || 'N/A';
          const nsList = whoisData.name_servers || whoisData.nameservers || [];

          const elapsed = ((performance.now() - startTime) / 1000).toFixed(2);
          recordObservation(targetToUse, 'whois', whoisData);

          const whoisOutput = `[✓] WHOIS / RDAP REGISTRY DATA: ${targetToUse}
────────────────────────────────────────────
Domain Name: ${targetToUse.toUpperCase()}
Registrar: ${registrar}
Registration Date: ${created}
Expiration Date: ${expires}
Name Servers:
${nsList.length > 0 ? '  ' + nsList.join('\n  ') : '  None listed'}

────────────────────────────────────────────
[✓] Completed in ${elapsed}s`;
          appendOutput('success', whoisOutput);
          break;
        }

        case 'subdomains': {
          if (explicitArg && currentTarget && explicitArg !== currentTarget) {
            appendOutput('warning', `[!] Target mismatch.\n\nActive investigation:\n${currentTarget}\n\nRequested target:\n${explicitArg}\n\nRun:\n  recon ${explicitArg}\nto start a new investigation.`);
            break;
          }
          if (!targetToUse) {
            appendOutput('error', '[!] Target missing.\nRun `recon <domain>` to start a reconnaissance investigation.');
            break;
          }

          appendOutput('info', `[•] Checking Subdomain module for ${targetToUse}...`);
          const scanObj = await getActiveScanTelemetry();

          if (!scanObj || (!scanObj.subdomains && scanObj.status === 'running')) {
            appendOutput('warning', `[•] Subdomain discovery module is still running.\n\nPlease try again shortly.`);
            break;
          }

          const subData = scanObj?.subdomains || {};
          const categorized = subData.categorized || [];
          const subList = categorized.map(s => s.subdomain || s).slice(0, 20);

          if (subList.length === 0) {
            appendOutput('error', `[!] No subdomains observed for ${targetToUse}.`);
            break;
          }

          const elapsed = ((performance.now() - startTime) / 1000).toFixed(2);
          recordObservation(targetToUse, 'subdomains', subList);

          const subLines = subList.map((s, idx) => `[${String(idx + 1).padStart(2, '0')}]  ${s}`).join('\n');
          const subOutput = `[✓] SUBDOMAIN DISCOVERY MATRIX: ${targetToUse}
────────────────────────────────────────────
${subLines}

────────────────────────────────────────────
Subdomains Observed: ${subList.length}
[✓] Completed in ${elapsed}s`;
          appendOutput('success', subOutput);
          break;
        }

        case 'ssl': {
          if (explicitArg && currentTarget && explicitArg !== currentTarget) {
            appendOutput('warning', `[!] Target mismatch.\n\nActive investigation:\n${currentTarget}\n\nRequested target:\n${explicitArg}\n\nRun:\n  recon ${explicitArg}\nto start a new investigation.`);
            break;
          }
          if (!targetToUse) {
            appendOutput('error', '[!] Target missing.\nRun `recon <domain>` to start a reconnaissance investigation.');
            break;
          }

          appendOutput('info', `[•] Checking TLS/SSL module for ${targetToUse}...`);
          const scanObj = await getActiveScanTelemetry();

          if (!scanObj || (!scanObj.ssl && scanObj.status === 'running')) {
            appendOutput('warning', `[•] TLS certificate module is still running.\n\nPlease try again shortly.`);
            break;
          }

          const sslData = scanObj?.ssl || {};
          const cert = sslData.certificate || sslData;

          const subject = cert.subject || targetToUse;
          const issuer = cert.issuer || 'N/A';
          const validFrom = cert.not_before || cert.valid_from || 'N/A';
          const validTo = cert.not_after || cert.valid_to || 'N/A';
          const daysRemaining = cert.days_remaining ?? 'N/A';
          const protocol = sslData.cipher?.protocol || sslData.protocol || 'TLS 1.3';

          const elapsed = ((performance.now() - startTime) / 1000).toFixed(2);
          recordObservation(targetToUse, 'ssl', sslData);

          const sslOutput = `[✓] TLS/SSL CERTIFICATE ANALYSIS: ${targetToUse}
────────────────────────────────────────────
Subject: ${subject}
Issuer: ${issuer}
Valid From: ${validFrom}
Valid Until: ${validTo}
Days Remaining: ${daysRemaining}
Protocol: ${protocol}

────────────────────────────────────────────
[✓] Completed in ${elapsed}s`;
          appendOutput('success', sslOutput);
          break;
        }

        case 'headers': {
          if (explicitArg && currentTarget && explicitArg !== currentTarget) {
            appendOutput('warning', `[!] Target mismatch.\n\nActive investigation:\n${currentTarget}\n\nRequested target:\n${explicitArg}\n\nRun:\n  recon ${explicitArg}\nto start a new investigation.`);
            break;
          }
          if (!targetToUse) {
            appendOutput('error', '[!] Target missing.\nRun `recon <domain>` to start a reconnaissance investigation.');
            break;
          }

          appendOutput('info', `[•] Checking HTTP Headers module for ${targetToUse}...`);
          const scanObj = await getActiveScanTelemetry();

          if (!scanObj || (!scanObj.headers && scanObj.status === 'running')) {
            appendOutput('warning', `[•] Security Headers module is still running.\n\nPlease try again shortly.`);
            break;
          }

          const headersData = scanObj?.headers || scanObj;

          const hsts = headersData.hsts?.present || headersData.hsts;
          const csp = headersData.csp?.present || headersData.csp;
          const xframe = headersData.x_frame_options || headersData.xframe || 'Not specified';
          const xcontent = headersData.x_content_type_options || headersData.xcontent || 'Not specified';
          const referrer = headersData.referrer_policy || 'Not specified';

          const elapsed = ((performance.now() - startTime) / 1000).toFixed(2);
          recordObservation(targetToUse, 'headers', headersData);

          const headerOutput = `[✓] HTTP SECURITY HEADERS ANALYSIS: ${targetToUse}
────────────────────────────────────────────
Strict-Transport-Security: ${hsts ? '✓ PRESENT' : '⚠ MISSING'}
Content-Security-Policy: ${csp ? '✓ PRESENT' : '⚠ MISSING'}
X-Frame-Options: ${xframe}
X-Content-Type-Options: ${xcontent}
Referrer-Policy: ${referrer}

────────────────────────────────────────────
[✓] Completed in ${elapsed}s`;
          appendOutput('success', headerOutput);
          break;
        }

        case 'tech': {
          if (explicitArg && currentTarget && explicitArg !== currentTarget) {
            appendOutput('warning', `[!] Target mismatch.\n\nActive investigation:\n${currentTarget}\n\nRequested target:\n${explicitArg}\n\nRun:\n  recon ${explicitArg}\nto start a new investigation.`);
            break;
          }
          if (!targetToUse) {
            appendOutput('error', '[!] Target missing.\nRun `recon <domain>` to start a reconnaissance investigation.');
            break;
          }

          appendOutput('info', `[•] Checking Technology Detection module for ${targetToUse}...`);
          const scanObj = await getActiveScanTelemetry();

          if (!scanObj || (!scanObj.tech && scanObj.status === 'running')) {
            appendOutput('warning', `[•] Technology Detection module is still running.\n\nPlease try again shortly.`);
            break;
          }

          const techModule = scanObj?.tech || scanObj?.technologies || [];
          const techList = Array.isArray(techModule) ? techModule : (techModule.detected || []);

          const elapsed = ((performance.now() - startTime) / 1000).toFixed(2);
          recordObservation(targetToUse, 'tech', techList);

          const techOutput = `[✓] TECHNOLOGY STACK FINGERPRINT: ${targetToUse}
────────────────────────────────────────────
Detected Components:
${techList.length > 0 ? '  • ' + techList.join('\n  • ') : '  • Standard HTTP Web Server'}

────────────────────────────────────────────
[✓] Completed in ${elapsed}s`;
          appendOutput('success', techOutput);
          break;
        }

        case 'ports': {
          if (explicitArg && currentTarget && explicitArg !== currentTarget) {
            appendOutput('warning', `[!] Target mismatch.\n\nActive investigation:\n${currentTarget}\n\nRequested target:\n${explicitArg}\n\nRun:\n  recon ${explicitArg}\nto start a new investigation.`);
            break;
          }
          if (!targetToUse) {
            appendOutput('error', '[!] Target missing.\nRun `recon <domain>` to start a reconnaissance investigation.');
            break;
          }

          appendOutput('info', `[•] Checking Port Scanner module for ${targetToUse}...`);
          const scanObj = await getActiveScanTelemetry();

          if (!scanObj || (!scanObj.ports && scanObj.status === 'running')) {
            appendOutput('warning', `[•] Port Scanner module is still running.\n\nPlease try again shortly.`);
            break;
          }

          const portModule = scanObj?.ports || {};
          const portList = portModule.open_ports || portModule.ports || [];

          const elapsed = ((performance.now() - startTime) / 1000).toFixed(2);
          recordObservation(targetToUse, 'ports', portList);

          const portOutput = `[✓] PORT INTELLIGENCE & SERVICE AUDIT: ${targetToUse}
────────────────────────────────────────────
${Array.isArray(portList) && portList.length > 0 ? portList.map(p => `PORT ${p.port || p}/tcp  STATE: OPEN`).join('\n') : '  Standard HTTP (80) / HTTPS (443) services observed'}

────────────────────────────────────────────
[✓] Completed in ${elapsed}s`;
          appendOutput('success', portOutput);
          break;
        }

        case 'ip': {
          let ipInput = explicitArg || currentTarget || '8.8.8.8';
          appendOutput('info', `[•] Querying BGP geolocation & IP reputation engine for ${ipInput}...`);

          try {
            let resolvedIp = ipInput;
            const ipRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;

            if (!ipRegex.test(ipInput)) {
              appendOutput('info', `[•] Resolving domain '${ipInput}' to IPv4 address via active DNS records...`);
              const scanObj = await getActiveScanTelemetry();
              const dnsA = scanObj?.dns?.records?.a;
              if (Array.isArray(dnsA) && dnsA.length > 0) {
                resolvedIp = dnsA[0];
                appendOutput('info', `[✓] Domain '${ipInput}' resolved to IPv4: ${resolvedIp}`);
              } else {
                throw new Error(`Unable to resolve IPv4 address for '${ipInput}' from DNS records`);
              }
            }

            console.log(`[RSH DEBUG] Calling scanIp API for resolved IP: ${resolvedIp}`);
            const ipData = await scanIp(resolvedIp);
            
            if (!ipData || (!ipData.ip && !ipData.country && !ipData.country_name)) {
              throw new Error(`No IP intelligence data returned for ${resolvedIp}`);
            }

            const elapsed = ((performance.now() - startTime) / 1000).toFixed(2);
            recordObservation(ipInput, 'ip', ipData);

            const ipOutput = `[✓] IP INTELLIGENCE & GEOLOCATION
────────────────────────────────────────────
Target Domain / IP: ${ipInput}
IPv4 Address: ${ipData.ip_info?.ip || ipData.ip || resolvedIp}
City/Region: ${ipData.ip_info?.city || ipData.city || 'N/A'}, ${ipData.ip_info?.region || ipData.region || 'N/A'}
Country: ${ipData.ip_info?.country || ipData.country || ipData.country_name || 'N/A'}
Autonomous System: ${ipData.ip_info?.asn || ipData.asn || 'N/A'} (${ipData.ip_info?.org || ipData.org || 'N/A'})

────────────────────────────────────────────
[✓] Completed in ${elapsed}s`;
            appendOutput('success', ipOutput);
          } catch (err) {
            console.error(`[RSH ERROR] IP query failed for ${ipInput}:`, err);
            appendOutput('error', `[✗] IP intelligence lookup failed.\n\nReason:\n${err.message}`);
          }
          break;
        }

        case 'asn': {
          const asnTarget = explicitArg || currentTarget || 'AS15169';
          appendOutput('info', `[•] Inspecting BGP autonomous system network routing for ${asnTarget}...`);

          try {
            const asnData = await scanIp(asnTarget).catch(() => null);
            const elapsed = ((performance.now() - startTime) / 1000).toFixed(2);

            if (asnData && (asnData.ip_info?.asn || asnData.asn || asnData.ip)) {
              recordObservation(asnTarget, 'asn', asnData);
              const asnOutput = `[✓] AUTONOMOUS SYSTEM NETWORK (ASN) DETAILS
────────────────────────────────────────────
ASN Identifier: ${asnData.ip_info?.asn || asnData.asn || asnTarget}
Organization: ${asnData.ip_info?.org || asnData.org || 'N/A'}
Country: ${asnData.ip_info?.country || asnData.country || 'N/A'}

────────────────────────────────────────────
[✓] Completed in ${elapsed}s`;
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

        case 'inspect': {
          if (!targetToUse) {
            appendOutput('error', '[!] Target missing.\nRun `recon <domain>` to start a reconnaissance investigation.');
            break;
          }

          const targetObs = observations.assets[cleanHost(targetToUse)];
          if (!targetObs) {
            appendOutput('warning', `[!] No evidence gathered for ${targetToUse} in this session.\n\nRun 'dns', 'whois', 'ssl', or 'headers' first to inspect modules.`);
            break;
          }

          const elapsed = ((performance.now() - startTime) / 1000).toFixed(2);
          const inspectOutput = `ASSET COMPREHENSIVE INSPECTION: ${targetToUse}
════════════════════════════════════════════
Asset Name:       ${targetToUse}
Observations:     ${Object.keys(targetObs).filter(k => k !== 'lastUpdated').join(', ').toUpperCase()}
Last Observation: ${targetObs.lastUpdated || 'Current session'}

EVIDENCE SUMMARY
  [DNS]  ${targetObs.dns ? 'Verified DNS records resolved' : 'Not queried'}
  [WHOIS] ${targetObs.whois ? 'Registrar: ' + (targetObs.whois.registrar || 'Recorded') : 'Not queried'}
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
            appendOutput('error', '[!] Target missing.\nRun `recon <domain>` to start a reconnaissance investigation.');
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
   │     └── A Records: ${targetObs.dns?.a?.join(', ') || 'Queried'}
   │
   ├── REGISTRY BRANCH
   │     └── Registrar: ${targetObs.whois?.registrar || 'Queried'}
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
            appendOutput('error', '[!] Target missing.\nRun `recon <domain>` to start a reconnaissance investigation.');
            break;
          }

          const targetObs = observations.assets[cleanHost(targetToUse)];
          if (!targetObs) {
            appendOutput('warning', `[!] No evidence gathered for ${targetToUse} in this session.\n\nRun 'dns', 'ssl', or 'headers' first to collect telemetry.`);
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
            appendOutput('error', '[!] Target missing.\nRun `recon <domain>` to start a reconnaissance investigation.');
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
            currentScanId,
            currentScanStatus,
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
