'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, Lock, Layers, FileText, Cookie, Mail, Key, FileCheck, Server, Globe, Search, Network, 
  RefreshCw, Terminal, Cpu, Binary, AlertTriangle, ShieldAlert, LayoutTemplate, Database, Target, 
  ArrowRight, ArrowUpRight, Sparkles, Filter, X, CheckCircle2, ShieldCheck, Activity, Eye, Zap, 
  Clock, Calendar, ChevronRight, HelpCircle, BookOpen, BookOpenCheck, ShieldQuestion, HeartHandshake
} from 'lucide-react';
import { urlFor } from '@/utils/sanity';
import DynamicDashboardClient from '@/components/DynamicDashboardClient';

// Detailed Tool metadata mapping for the specific scanners list at the bottom
const TOOLS_LIST = [
  {
    id: 'http-headers',
    name: 'HTTP Security Headers Scanner',
    category: 'Web Security',
    icon: Shield,
    desc: 'Analyze critical HTTP response headers (CSP, HSTS, X-Frame-Options, etc.) to assess client-side vulnerability mitigation.',
    tags: ['CSP', 'HSTS', 'X-Frame-Options'],
    badge: 'HTTP Auditing',
    route: '/tools/http-headers',
    color: 'cyber'
  },
  {
    id: 'ssl-checker',
    name: 'SSL/TLS Scanner',
    category: 'Web Security',
    icon: Lock,
    desc: 'Perform cipher suite scans, check handshake parameters, audit certificate authority validity, and inspect expiration timelines.',
    tags: ['Cryptography', 'TLS 1.3', 'Certificate'],
    badge: 'TLS Audit',
    route: '/tools/ssl-checker',
    color: 'cyber'
  },
  {
    id: 'csp-analyzer',
    name: 'CSP Analyzer',
    category: 'Web Security',
    icon: Layers,
    desc: 'Inspect Content Security Policy configuration details, identifying lax source rules and script injection pathways.',
    tags: ['XSS Prevention', 'Policy Audit', 'Source rules'],
    badge: 'Web Hardening',
    route: '/tools/http-headers',
    color: 'cyber'
  },
  {
    id: 'security-txt',
    name: 'Security.txt Validator',
    category: 'Web Security',
    icon: FileText,
    desc: 'Check for RFC 9116 compliant contact configuration records under .well-known/security.txt for responsible disclosures.',
    tags: ['RFC 9116', 'Disclosure Policy', 'OSINT'],
    badge: 'Standard Compliance',
    route: '/tools/vulnerability-scanner',
    color: 'cyber'
  },
  {
    id: 'cookie-checker',
    name: 'Cookie Security Checker',
    category: 'Web Security',
    icon: Cookie,
    desc: 'Analyze HTTP session cookies for protective flags such as Secure, HttpOnly, and strict SameSite parameters.',
    tags: ['Session Hijacking', 'Cookie Flags', 'Web Session'],
    badge: 'Cookie Audit',
    route: '/tools/http-headers',
    color: 'cyber'
  },
  {
    id: 'spf-checker',
    name: 'SPF Checker',
    category: 'Email Security',
    icon: Mail,
    desc: 'Verify Sender Policy Framework (SPF) DNS settings, identifying IP authorize counts and lookup limit exposures.',
    tags: ['Email Spoofing', 'DNS TXT', 'Anti-Phishing'],
    badge: 'SPF Validator',
    route: '/tools/email-security',
    color: 'neon'
  },
  {
    id: 'dkim-validator',
    name: 'DKIM Validator',
    category: 'Email Security',
    icon: Key,
    desc: 'Validate domain key cryptographic selector configurations and public key syntax checks in the DNS.',
    tags: ['Signature Validation', 'DNS Keys', 'Authentication'],
    badge: 'DKIM Validation',
    route: '/tools/email-security',
    color: 'neon'
  },
  {
    id: 'dmarc-analyzer',
    name: 'DMARC Analyzer',
    category: 'Email Security',
    icon: FileCheck,
    desc: 'Check DMARC alignment settings, reporting mailboxes, and policies (p=reject/quarantine) to stop spoofing.',
    tags: ['DMARC Policy', 'Domain Spoofing', 'Reporting'],
    badge: 'Spoof Prevention',
    route: '/tools/email-security',
    color: 'neon'
  },
  {
    id: 'mx-lookup',
    name: 'MX Record Lookup',
    category: 'Email Security',
    icon: Server,
    desc: 'Identify authoritative mail exchange routing servers and audit their prioritize parameters.',
    tags: ['Mail Servers', 'SMTP routing', 'DNS MX'],
    badge: 'Mail Routing',
    route: '/tools/dns-lookup',
    color: 'neon'
  },
  {
    id: 'dns-lookup',
    name: 'DNS Lookup',
    category: 'DNS & Infrastructure',
    icon: Globe,
    desc: 'Retrieve standard records (A, AAAA, MX, TXT, NS, CNAME) and check DNSSEC cryptographic validity.',
    tags: ['DNSSEC', 'NS records', 'Zone Analysis'],
    badge: 'DNS Analysis',
    route: '/tools/dns-lookup',
    color: 'matrix'
  },
  {
    id: 'whois-lookup',
    name: 'WHOIS Lookup',
    category: 'DNS & Infrastructure',
    icon: Search,
    desc: 'Reveal registrar information, creation/expiry timestamps, nameservers, and domain locking flags.',
    tags: ['Registrar', 'Domain History', 'Ownership'],
    badge: 'WHOIS Record',
    route: '/tools/whois',
    color: 'matrix'
  },
  {
    id: 'subdomain-finder',
    name: 'Subdomain Finder',
    category: 'DNS & Infrastructure',
    icon: Network,
    desc: 'Passively compile valid subdomains using search indexing, Certificate Transparency logs, and caching.',
    tags: ['Subdomain Discovery', 'CT Logs', 'OSINT Footprint'],
    badge: 'Passive Recon',
    route: '/tools/subdomain-finder',
    color: 'matrix'
  },
  {
    id: 'dns-propagation',
    name: 'DNS Propagation Checker',
    category: 'DNS & Infrastructure',
    icon: RefreshCw,
    desc: 'Query recursive servers across major global locations to confirm DNS updates and resolution consistency.',
    tags: ['Propagation', 'Global DNS', 'Caching'],
    badge: 'Zone Propagation',
    route: '/tools/dns-lookup',
    color: 'matrix'
  },
  {
    id: 'port-scanner',
    name: 'Open Port Scanner',
    category: 'Network Security',
    icon: Terminal,
    desc: 'Passively search for open ports and services, highlighting exposure risks on external hosts.',
    tags: ['TCP Ports', 'Service Identification', 'Exposure Assessment'],
    badge: 'Port Exposure',
    route: '/tools/port-scanner',
    color: 'red'
  },
  {
    id: 'asn-lookup',
    name: 'ASN Lookup',
    category: 'Network Security',
    icon: Cpu,
    desc: 'Identify Autonomous System details, routing prefixes, hosting ranges, and parent organizations.',
    tags: ['BGP Routing', 'IP Allocation', 'ASN Registry'],
    badge: 'BGP Routing',
    route: '/tools/ip-lookup',
    color: 'red'
  },
  {
    id: 'reverse-ip',
    name: 'Reverse IP Lookup',
    category: 'Network Security',
    icon: Binary,
    desc: 'Enumerate other domains sharing identical web server IPs to check for shared hosting co-location.',
    tags: ['IP Co-location', 'Shared Hosting', 'Virtual Hosts'],
    badge: 'Shared Server',
    route: '/tools/ip-lookup',
    color: 'red'
  },
  {
    id: 'ip-reputation',
    name: 'IP Reputation Checker',
    category: 'Network Security',
    icon: AlertTriangle,
    desc: 'Audit IP addresses against blacklists, botnet registries, spam databases, and abusive activity feeds.',
    tags: ['Threat Intel', 'Spam blacklist', 'Abuse feeds'],
    badge: 'Reputation Check',
    route: '/tools/ip-lookup',
    color: 'red'
  },
  {
    id: 'waf-detector',
    name: 'WAF Detector',
    category: 'Threat Intelligence',
    icon: ShieldAlert,
    desc: 'Fingerprint active Web Application Firewalls (WAF) safeguarding endpoints through signature checks.',
    tags: ['WAF fingerprinting', 'Cloudflare', 'AWS WAF'],
    badge: 'Firewall Detection',
    route: '/tools/tech-detector',
    color: 'yellow'
  },
  {
    id: 'cms-detector',
    name: 'CMS Detector',
    category: 'Threat Intelligence',
    icon: LayoutTemplate,
    desc: 'Verify Content Management Systems (WordPress, Drupal, Ghost) and expose theme version indicators.',
    tags: ['CMS Audit', 'WordPress', 'Theme versions'],
    badge: 'CMS Fingerprint',
    route: '/tools/tech-detector',
    color: 'yellow'
  },
  {
    id: 'tech-stack',
    name: 'Technology Stack Detector',
    category: 'Threat Intelligence',
    icon: Database,
    desc: 'Detect libraries, frameworks, CDNs, analytics tooling, and server architectures powering the target.',
    tags: ['Wappalyzer signatures', 'Web Frameworks', 'CDN/DNS'],
    badge: 'Stack fingerprint',
    route: '/tools/tech-detector',
    color: 'yellow'
  },
  {
    id: 'threat-intel-lookup',
    name: 'Threat Intelligence Lookup',
    category: 'Threat Intelligence',
    icon: Target,
    desc: 'Cross-reference CVE databases, exploit probability databases, and vendor disclosures against known assets.',
    tags: ['CVE audits', 'EPSS rating', 'Vulnerability Intel'],
    badge: 'Threat intelligence',
    route: '/tools/vulnerability-scanner',
    color: 'yellow'
  }
];

const CATEGORIES = ['All', 'Web Security', 'Email Security', 'DNS & Infrastructure', 'Network Security', 'Threat Intelligence'];

const CATEGORY_COLORS = {
  'Web Security': 'text-cyber-400 bg-cyber-500/10 border-cyber-500/20',
  'Email Security': 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  'DNS & Infrastructure': 'text-[#00ff88] bg-[#00ff88]/10 border-[#00ff88]/20',
  'Network Security': 'text-red-400 bg-red-500/10 border-red-500/20',
  'Threat Intelligence': 'text-amber-400 bg-amber-500/10 border-amber-500/20'
};

const AnimatedCounter = ({ value, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    let start = 0;
    const cleanValue = value.toString().replace(/,/g, '').replace(/\+/g, '');
    const target = parseInt(cleanValue, 10);
    
    if (isNaN(target)) {
      setCount(value);
      return;
    }

    let startTime = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const current = Math.floor(progress * target);
      setCount(current);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    window.requestAnimationFrame(step);
  }, [value, duration, hasAnimated]);

  const formatNumber = (num) => {
    if (typeof num !== 'number') return num;
    return num.toLocaleString() + (value.toString().includes('+') ? '+' : '');
  };

  return <span ref={elementRef} className="font-display font-bold tabular-nums">{formatNumber(count)}</span>;
};

export default function ScannerHubClient({ latestPosts }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const dashboardRef = useRef(null);

  const handleScrollToTools = () => {
    if (dashboardRef.current) {
      dashboardRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Filter tools based on query & active tab
  const filteredTools = useMemo(() => {
    return TOOLS_LIST.filter((tool) => {
      const matchesSearch = 
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        tool.badge.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = activeCategory === 'All' || tool.category === activeCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="relative bg-[#05080f] min-h-screen">
      
      {/* ================= 1. PRIMARY HERO CONSOLE ================= */}
      <section className="relative pt-32 pb-24 overflow-hidden border-b border-white/[0.04] bg-[#070b12]">
        
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-grid opacity-[0.25] pointer-events-none -z-10" />
        
        {/* Neon blue/cyan/purple ambient blurs */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-cyber-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />
        <div className="absolute top-1/3 right-1/4 translate-x-1/2 w-[400px] h-[400px] bg-neon-500/5 blur-[130px] rounded-full pointer-events-none -z-10" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-full bg-[#00ff88]/5 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          
          <div className="text-center max-w-4xl mx-auto space-y-6">
            
            {/* Cybersecurity diagnostics label badge */}
            <motion.div 
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono uppercase tracking-widest"
            >
              <Terminal className="w-3.5 h-3.5 text-blue-400" />
              <span>Passive Diagnostics Suite</span>
            </motion.div>

            {/* Page Title & Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-3"
            >
              <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-white tracking-tight uppercase leading-none">
                Passive Diagnostics Suite
              </h1>
              <p className="text-lg sm:text-xl font-mono text-transparent bg-clip-text bg-gradient-to-r from-matrix-400 via-cyber-400 to-neon-400 uppercase tracking-widest font-bold">
                Infrastructure Exposure Diagnostics
              </p>
            </motion.div>

            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-400 text-sm sm:text-base font-sans max-w-3xl mx-auto leading-relaxed"
            >
              Validate email security (SPF/DMARC), inspect SSL cipher health, analyze HTTP security headers, and identify exposed services using passive infrastructure intelligence and non-intrusive diagnostics.
            </motion.p>

            {/* Embedded Centerpiece Interactive Scanning Widget */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="pt-4 max-w-3xl mx-auto text-left"
            >
              <DynamicDashboardClient />
            </motion.div>

            {/* Passive Analysis Trust Indicators */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="pt-8 border-t border-white/5 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-xs font-mono text-gray-500 uppercase tracking-wider"
            >
              {[
                "100% Passive Diagnostics",
                "Zero Direct Packets Sent",
                "Cached Threat Intelligence Only",
                "RFC-Compliant Analysis",
                "Non-Intrusive Infrastructure Visibility"
              ].map((badge, idx) => (
                <div key={idx} className="flex items-center gap-2 hover:text-white transition-colors duration-200">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#00ff88]/10 text-[#00ff88] animate-pulse-glow shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </span>
                  <span>{badge}</span>
                </div>
              ))}
            </motion.div>

          </div>

        </div>
      </section>

      {/* ================= 2. SECURITY STATS SECTION ================= */}
      <section className="bg-[#05080f] py-12 border-b border-white/[0.04]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Total Scans Completed', value: '14,204,592+', subtitle: 'System integrity requests' },
              { label: 'Active Security Modules', value: '21', subtitle: 'Always online diagnostics' },
              { label: 'Risks & Exposures Flagged', value: '348,190+', subtitle: 'Mitigated vulnerabilities' },
              { label: 'Domains Protected Globally', value: '1,894,203+', subtitle: 'Monitored asset profiles' }
            ].map((stat, idx) => (
              <div 
                key={idx} 
                className="p-5 rounded-2xl bg-surface-900/40 border border-white/[0.03] text-center hover:border-cyber-400/10 transition-colors duration-300 relative group overflow-hidden"
              >
                <div className="absolute inset-0 bg-cyber-500/[0.005] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1">{stat.label}</p>
                <h3 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight mb-1 text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-cyber-400/80">
                  <AnimatedCounter value={stat.value} />
                </h3>
                <p className="text-[10px] font-sans text-gray-500 leading-none">{stat.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 3. ADVANCED DIAGNOSTICS CARD MODULES SECTION ================= */}
      <section className="py-24 bg-[#0a0d14]/30 border-b border-white/[0.04] relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-cyber-500/[0.015] blur-[150px] rounded-full pointer-events-none -z-10" />
        
        <div className="max-w-[1200px] mx-auto px-6">
          
          <div className="text-center mb-16 space-y-2">
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-matrix-400" />
              <span className="font-mono text-xs text-matrix-400 font-bold uppercase tracking-widest">// CRITICAL AUDIT VECTORS</span>
            </div>
            <h2 className="text-3xl font-display font-bold text-white uppercase tracking-wide">Advanced Diagnostics Silos</h2>
            <p className="text-gray-400 text-sm max-w-2xl mx-auto">
              Our passive diagnostics system operates across six core parameters to evaluate your domain's defensive architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Email Authentication",
                icon: Mail,
                desc: "Audit domain verification and mail transport records to prevent brand impersonation and spoofing.",
                items: ["SPF configuration check", "DKIM selector validation", "DMARC policy alignment", "BIMI validation parameters", "MX routing diagnostics"],
                accent: "border-purple-500/10 group-hover:border-purple-500/30 text-purple-400 bg-purple-500/[0.02]"
              },
              {
                title: "SSL/TLS Diagnostics",
                icon: Lock,
                desc: "Inspect cryptographic layer health, cipher suites strength, and verification chain parameters.",
                items: ["Cipher suite audits", "Protocol version checks", "HSTS deployment audits", "Certificate chain validation", "Cryptographic expiration"],
                accent: "border-cyber-500/10 group-hover:border-cyber-500/30 text-cyber-400 bg-cyber-500/[0.02]"
              },
              {
                title: "HTTP Security Headers",
                icon: Layers,
                desc: "Analyze client-side vulnerability mitigation policies to prevent clickjacking and script injection.",
                items: ["Content Security Policy (CSP)", "Strict-Transport-Security", "X-Frame-Options rules", "Permissions-Policy validation", "CORS policy check"],
                accent: "border-matrix-500/10 group-hover:border-matrix-500/30 text-[#00ff88] bg-[#00ff88]/[0.02]"
              },
              {
                title: "Infrastructure Exposure",
                icon: Server,
                desc: "Passively identify public-facing entry points, hosting configurations, and boundary defenses.",
                items: ["Open ports passive discovery", "Banner grab telemetry", "CDN & WAF detection signatures", "ASN registry mapping", "Hosting co-location verification"],
                accent: "border-red-500/10 group-hover:border-red-500/30 text-red-400 bg-red-500/[0.02]"
              },
              {
                title: "DNS Intelligence",
                icon: Globe,
                desc: "Audit domain name system zone security configurations, integrity markers, and record mappings.",
                items: ["DNSSEC cryptographic keys", "Nameserver authority validation", "TXT record audits", "MX record inventories", "Zone transfer checks"],
                accent: "border-blue-500/10 group-hover:border-blue-500/30 text-blue-400 bg-blue-500/[0.02]"
              },
              {
                title: "Threat Intelligence",
                icon: Target,
                desc: "Scan historical reputation records, threat activity logs, and system fingerprints.",
                items: ["IP & Domain reputation check", "Known bad threat feed cross", "Passive network fingerprints", "Historical exposure trends", "Registry abuse database queries"],
                accent: "border-amber-500/10 group-hover:border-amber-500/30 text-amber-400 bg-amber-500/[0.02]"
              }
            ].map((module, idx) => {
              const Icon = module.icon;
              return (
                <div 
                  key={idx} 
                  className={`group flex flex-col justify-between p-8 rounded-3xl border bg-surface-900/40 backdrop-blur-xl transition-all duration-300 hover:shadow-2xl relative overflow-hidden ${module.accent}`}
                >
                  <div>
                    {/* Top Row: Icon */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-surface-950 border border-white/5 flex items-center justify-center text-gray-400 group-hover:scale-105 transition-transform duration-300">
                        <Icon className="w-5 h-5 group-hover:text-white transition-colors" />
                      </div>
                      <h3 className="text-lg font-bold text-white group-hover:text-white transition-colors tracking-wide">
                        {module.title}
                      </h3>
                    </div>
                    
                    <p className="text-xs text-gray-400 leading-relaxed mb-6">
                      {module.desc}
                    </p>

                    <ul className="space-y-2.5">
                      {module.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-center gap-2 text-xs font-mono text-gray-500">
                          <span className="w-1 h-1 rounded-full bg-gray-600 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ================= 4. DETAILED SCANNERS DASHBOARD ================= */}
      <section ref={dashboardRef} className="py-24 bg-[#05080f] border-b border-white/[0.04]">
        <div className="max-w-[1200px] mx-auto px-6">
          
          <div className="text-center mb-12">
            <span className="font-mono text-xs text-cyber-400 font-bold uppercase tracking-widest">// TARGET AUDIT ENGINES</span>
            <h2 className="text-3xl font-display font-bold text-white mt-2 uppercase tracking-wide">Granular Audit Modules</h2>
            <p className="text-gray-400 text-sm max-w-2xl mx-auto mt-2 leading-relaxed">
              Launch targeted defensive checks for specific protocols or layers. Enter queries to filter our active modular database.
            </p>
          </div>

          {/* Search bar & categories filter */}
          <div className="p-6 rounded-3xl bg-[#0d1117]/50 border border-white/[0.05] shadow-2xl relative overflow-hidden mb-12">
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-cyber-500/5 blur-[60px] rounded-full pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
              {/* Tool Search Bar */}
              <div className="lg:col-span-1 relative flex items-center bg-surface-950 border border-white/10 rounded-2xl px-4 py-1.5 transition-all focus-within:border-cyber-400/50 focus-within:ring-1 focus-within:ring-cyber-400/50">
                <Search className="w-5 h-5 text-gray-500 shrink-0" />
                <input
                  type="text"
                  className="w-full bg-transparent py-2.5 pl-3 pr-8 text-white focus:outline-none font-mono text-sm placeholder:font-sans placeholder:text-gray-500"
                  placeholder="Filter modular scanners..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 p-1 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white cursor-pointer"
                    aria-label="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Category Filtering Tabs */}
              <div className="lg:col-span-2 flex flex-col gap-2">
                <div className="flex items-center gap-1.5 text-xs font-mono text-gray-500 uppercase tracking-widest pl-1">
                  <Filter className="w-3.5 h-3.5 text-cyber-400" /> 
                  <span>Filter by category</span>
                </div>
                <div className="flex overflow-x-auto pb-1 gap-2 max-w-full hide-scrollbar">
                  {CATEGORIES.map((category) => {
                    const isSelected = activeCategory === category;
                    return (
                      <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-mono transition-all border cursor-pointer ${
                          isSelected
                            ? 'bg-cyber-400/10 text-cyber-400 border-cyber-400/30 font-bold shadow-[0_0_15px_rgba(0,229,255,0.05)]'
                            : 'bg-surface-900 text-gray-400 border-white/5 hover:bg-surface-800 hover:text-white'
                        }`}
                      >
                        {category.toUpperCase()}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Results Summary Header */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/[0.04]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyber-400" />
              <h3 className="text-xs font-mono font-bold text-white uppercase tracking-widest">
                {activeCategory === 'All' ? 'All Active Scanners' : `${activeCategory} Modules`}
              </h3>
            </div>
            <div className="text-[10px] font-mono text-gray-500 bg-[#0d1117] border border-white/5 px-3 py-1 rounded-full uppercase tracking-wider">
              Showing <span className="text-cyber-400 font-bold">{filteredTools.length}</span> of <span className="text-gray-400 font-bold">{TOOLS_LIST.length}</span> modules
            </div>
          </div>

          {/* Modern Responsive Tool Grid */}
          <AnimatePresence mode="popLayout">
            {filteredTools.length > 0 ? (
              <motion.div 
                variants={{ show: { transition: { staggerChildren: 0.03 } } }}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredTools.map((tool) => {
                  const Icon = tool.icon;
                  const categoryColor = CATEGORY_COLORS[tool.category] || '';
                  
                  return (
                    <motion.div
                       layout
                       key={tool.id}
                       variants={{
                         hidden: { opacity: 0, y: 15 },
                         show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 18 } }
                       }}
                       className="group flex flex-col justify-between p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-cyber-400/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(0,229,255,0.02)] relative overflow-hidden"
                     >
                       <div className="absolute inset-0 bg-gradient-to-br from-cyber-400/[0.015] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                       <div>
                         {/* Header: Icon & Category badge */}
                         <div className="flex items-center justify-between mb-5">
                           <div className="w-11 h-11 rounded-xl bg-surface-950 border border-white/10 flex items-center justify-center text-gray-400 group-hover:bg-cyber-500/10 group-hover:border-cyber-500/20 group-hover:text-cyber-400 transition-all duration-300">
                             <Icon className="w-5 h-5" />
                           </div>
                           
                           <span className={`text-[8px] font-mono font-bold px-2 py-0.5 rounded border ${categoryColor}`}>
                             {tool.category.toUpperCase()}
                           </span>
                         </div>

                         {/* Title */}
                         <h4 className="text-base font-bold text-white mb-2 group-hover:text-cyber-400 transition-colors flex items-center gap-1.5 font-display tracking-wide uppercase">
                           {tool.name}
                         </h4>

                         {/* Description */}
                         <p className="text-xs text-gray-400 leading-relaxed mb-6">
                           {tool.desc}
                         </p>

                         {/* Tags list */}
                         <div className="flex flex-wrap gap-1.5 mb-6">
                           {tool.tags.map((tag) => (
                             <span key={tag} className="text-[9px] font-mono text-gray-500 bg-surface-950 border border-white/5 px-2 py-0.5 rounded">
                               #{tag}
                             </span>
                           ))}
                         </div>
                       </div>

                       {/* Footer border & actions */}
                       <div className="pt-4 border-t border-white/[0.04] flex items-center justify-between mt-auto">
                         <span className="text-[9px] font-mono text-gray-600 uppercase tracking-widest">{tool.badge}</span>
                         <Link 
                           href={tool.route}
                           className="inline-flex items-center gap-1 text-xs font-mono text-cyber-400 hover:text-white transition-colors uppercase tracking-widest font-bold"
                         >
                           <span>Launch Page</span>
                           <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                         </Link>
                       </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              <div className="py-16 text-center border border-white/5 rounded-2xl bg-surface-900/60 max-w-md mx-auto shadow-xl">
                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-gray-500">
                  <X className="w-6 h-6" />
                </div>
                <h4 className="text-white font-bold mb-1">No modular checks found</h4>
                <p className="text-gray-400 text-xs font-mono mb-6 px-6 leading-relaxed">
                  We couldn't locate any scanners matching "{searchQuery}" under the category "{activeCategory}".
                </p>
                <button 
                  onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                  className="px-5 py-2 bg-cyber-500/10 border border-cyber-500/20 text-cyber-400 text-xs font-mono font-bold rounded-xl hover:bg-cyber-500/20 transition-all uppercase tracking-widest cursor-pointer"
                >
                  Reset filters
                </button>
              </div>
            )}
          </AnimatePresence>

        </div>
      </section>

      {/* ================= 5. EDUCATIONAL SECTIONS (SEO & ADSENSE ADHERENCE) ================= */}
      <section className="py-24 bg-[#0a0d14]/40 border-b border-white/5 relative">
        <div className="max-w-[1200px] mx-auto px-6">
          
          <div className="text-center mb-16 space-y-2">
            <div className="flex items-center justify-center gap-2">
              <ShieldQuestion className="w-4.5 h-4.5 text-cyber-400" />
              <span className="font-mono text-xs text-cyber-400 font-bold uppercase tracking-widest">// SECURE METHODOLOGY & EDUCATION</span>
            </div>
            <h2 className="text-3xl font-display font-bold text-white uppercase tracking-wide">Understanding Passive Security Audits</h2>
            <p className="text-gray-400 text-sm max-w-2xl mx-auto">
              Learn how non-intrusive metadata evaluation protects organizational resources without creating risk or breaking compliance guidelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch">
            
            <div className="p-8 rounded-3xl border border-white/5 bg-surface-900/30 hover:border-white/10 transition-colors">
              <h3 className="text-lg font-bold text-white mb-3 tracking-wide uppercase font-display">
                1. How Passive Diagnostics Work
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Rather than deploying network packets directly to target servers (which can mimic malicious activity), passive diagnostics compile data from cached threat intelligence registries, global DNS databases, Certificate Transparency (CT) logs, and registrar records. This enables quick evaluations of configuration posture entirely from pre-aggregated records without interacting with client servers.
              </p>
            </div>

            <div className="p-8 rounded-3xl border border-white/5 bg-surface-900/30 hover:border-white/10 transition-colors">
              <h3 className="text-lg font-bold text-white mb-3 tracking-wide uppercase font-display">
                2. Why Non-Intrusive Analysis Matters
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Modern enterprise compliance frameworks (like GDPR, HIPAA, SOC 2, and PCI-DSS) restrict unauthorized penetration testing. Passive auditing allows administrators to survey external parameters (such as email authentication syntax or SSL configurations) safely. This guarantees that your testing is compliant, legal, and does not trigger security alarms.
              </p>
            </div>

            <div className="p-8 rounded-3xl border border-white/5 bg-surface-900/30 hover:border-white/10 transition-colors">
              <h3 className="text-lg font-bold text-white mb-3 tracking-wide uppercase font-display">
                3. Understanding Infrastructure Exposure
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Exposures occur when services or settings reveal internal parameters to the public index. Examples include public BGP routes, active administrative port banners (SSH, RDP), or incomplete security records. Auditing these indicators regularly helps organizations maintain clean digital perimeter hygiene.
              </p>
            </div>

            <div className="p-8 rounded-3xl border border-white/5 bg-surface-900/30 hover:border-white/10 transition-colors">
              <h3 className="text-lg font-bold text-white mb-3 tracking-wide uppercase font-display">
                4. Security Best Practices
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Maintain high-quality defensive layers by implementing strict DMARC alignment (`p=reject`), validating SPF record lookup thresholds, selecting modern TLS 1.3 cryptographic suites, deploying Content Security Policies (CSP) to restrict script sources, and isolating public database servers behind private virtual subnet bounds.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ================= 6. CALL TO ACTIONS (INTERNAL BLOG LINKING) ================= */}
      <section className="py-20 bg-[#070b12] border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="p-8 md:p-12 rounded-3xl border border-cyber-500/20 bg-gradient-to-br from-[#0d1117] via-surface-900/60 to-transparent shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,229,255,0.02),transparent_40%)] pointer-events-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#00ff88]/10 text-[#00ff88] text-[10px] font-mono uppercase tracking-widest mb-4">
                  <HeartHandshake className="w-3.5 h-3.5" /> 
                  <span>Security Guidance Portal</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-4 uppercase tracking-wide">
                  Explore Defensive Security Publications
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Deep dive into our peer-reviewed threat intelligence reports, cryptographic implementation handbooks, and OSINT defense methodologies written by industry experts.
                </p>
              </div>

              <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link 
                  href="/blog"
                  className="w-full text-center px-4 py-3.5 bg-surface-950 hover:bg-surface-900 border border-white/10 hover:border-cyber-400/40 text-white text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Read Security Research</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link 
                  href="/category/threat-intelligence"
                  className="w-full text-center px-4 py-3.5 bg-surface-950 hover:bg-surface-900 border border-white/10 hover:border-cyber-400/40 text-white text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Explore Threat Intel</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link 
                  href="/blog/spf-dkim-dmarc-blueprint"
                  className="w-full text-center px-4 py-3.5 bg-surface-950 hover:bg-surface-900 border border-white/10 hover:border-[#00ff88]/40 text-white text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Learn SPF/DMARC</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link 
                  href="/blog/ssl-tls-regulatory-compliance"
                  className="w-full text-center px-4 py-3.5 bg-surface-950 hover:bg-surface-900 border border-white/10 hover:border-cyber-400/40 text-white text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5"
                >
                  <span>View SSL/TLS Guides</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 7. RECENT CYBERSECURITY ARTICLES ================= */}
      <section className="py-24 bg-[#0a0d14]/30 border-b border-white/[0.04]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-400" />
                <span className="font-mono text-xs text-purple-400 font-bold uppercase tracking-widest">// CYBER EDUCATION FEED</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mt-2 uppercase tracking-wide">Threat Intel & Vulnerability Briefings</h2>
              <p className="text-gray-400 text-sm mt-1">Peer-reviewed OSINT methodology updates, CVE analysis logs, and infrastructure guides.</p>
            </div>
            
            <Link 
              href="/blog" 
              className="mt-4 md:mt-0 inline-flex items-center gap-1 text-xs font-mono text-purple-400 hover:text-white uppercase tracking-widest font-bold group"
            >
              <span>View All Briefings</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestPosts.map((post) => {
              const date = post.publishedAt || post._createdAt;
              const formattedDate = date ? new Date(date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              }).toUpperCase() : '';
              
              const readTime = post.estimatedWordCount 
                ? Math.max(1, Math.ceil(post.estimatedWordCount / 5 / 200))
                : 6;

              return (
                <div 
                  key={post._id}
                  className="group flex flex-col bg-surface-900 border border-white/5 hover:border-purple-500/30 transition-all duration-300 rounded-2xl overflow-hidden shadow-lg"
                >
                  <Link href={`/blog/${post.slug?.current || post.slug}`} className="block relative aspect-video w-full bg-surface-950 overflow-hidden border-b border-white/5">
                    {post.mainImage ? (
                      <Image
                        src={urlFor(post.mainImage).width(360).height(202).fit('crop').auto('format').url()}
                        alt={post.title}
                        width={360}
                        height={202}
                        sizes="(max-width: 768px) 100vw, 360px"
                        className="object-cover w-full h-full group-hover:scale-[1.03] transition-transform duration-700"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-surface-950 to-surface-900 flex items-center justify-center">
                        <Activity className="w-10 h-10 text-purple-400/20" />
                      </div>
                    )}
                  </Link>
                  
                  <div className="p-6 flex flex-col flex-1">
                    <span className="font-mono text-[9px] tracking-[2px] uppercase text-[#00ff88] mb-3">
                      {post.categories?.[0]?.title || 'Threat Intel'}
                    </span>
                    
                    <Link href={`/blog/${post.slug?.current || post.slug}`}>
                      <h4 className="text-sm font-bold text-white mb-2 leading-snug group-hover:text-purple-400 transition-colors line-clamp-2 uppercase font-display tracking-wide">
                        {post.title}
                      </h4>
                    </Link>
                    
                    <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 mb-6">
                      {post.excerpt}
                    </p>
                    
                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5 font-mono text-[9px] text-gray-500 uppercase">
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {readTime} MIN READ</span>
                      <span>{formattedDate}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}
