'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, Lock, Layers, FileText, Cookie, Mail, Key, FileCheck, Server, Globe, Search, Network, 
  RefreshCw, Terminal, Cpu, Binary, AlertTriangle, ShieldAlert, LayoutTemplate, Database, Target, 
  ArrowRight, ArrowUpRight, Sparkles, Filter, X, CheckCircle2, ShieldCheck, Activity, Eye, Zap, 
  Clock, Calendar, ChevronRight, HelpCircle
} from 'lucide-react';
import { urlFor } from '@/utils/sanity';

// Tool metadata mapping
const TOOLS_LIST = [
  // Web Security
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

  // Email Security
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

  // DNS & Infrastructure
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

  // Network Security
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

  // Threat Intelligence
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

// Helper for Category Colors
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

  // Scroll to main tools container
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

  // Featured Tools details
  const featuredTools = useMemo(() => {
    return [
      {
        id: 'featured-headers',
        name: 'HTTP Security Headers Scanner',
        desc: 'Submit a target domain to receive an instant letter-grade (A to F) based on HTTP headers compliance auditing. Analyze Content Security Policy, strict Transport Layer protection headers, frame constraints, and other OWASP configuration recommendations.',
        icon: Shield,
        tag: 'Recommended',
        badge: 'Web App Security',
        route: '/tools/http-headers',
        grade: 'A+',
        details: 'Audit security headers (CSP, HSTS, CORS, X-Frame-Options)'
      },
      {
        id: 'featured-email',
        name: 'SPF / DKIM / DMARC Authentication Checker',
        desc: 'Protect domain integrity from spear-phishing and Business Email Compromise (BEC) spoofs. This validator parses DNS zones, evaluates authentication policies, assesses alignment profiles, and flags weak quarantine options.',
        icon: Mail,
        tag: 'Popular',
        badge: 'Email Threat Vector',
        route: '/tools/email-security',
        grade: 'Strict',
        details: 'Validate DNS records, syntax validity, & alignment criteria'
      },
      {
        id: 'featured-ssl',
        name: 'SSL/TLS Cryptographic Certificate Auditor',
        desc: 'Inspect the cipher configurations and trust chains of web servers. Audit certificate registration details, identify weak protocols (TLS 1.0, SSLv3), verify key renegotiation vulnerability status, and determine compliance postures.',
        icon: Lock,
        tag: 'Compliance Essential',
        badge: 'Transport Security',
        route: '/tools/ssl-checker',
        grade: 'Secure',
        details: 'Verify trust chains, cipher suites, & protocol version parameters'
      }
    ];
  }, []);

  return (
    <div className="relative">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-24 overflow-hidden border-b border-white/[0.04] bg-gradient-to-b from-[#0a0d14] to-[#05080f]">
        
        {/* Neon blue/cyan blur lights */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-cyber-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />
        <div className="absolute top-1/3 right-1/4 translate-x-1/2 w-[400px] h-[400px] bg-matrix-500/5 blur-[130px] rounded-full pointer-events-none -z-10" />
        
        {/* Particle Overlay (Background aesthetics) */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,229,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,255,0.01)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none -z-10" />
        
        {/* Cyber scan-line scan overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00e5ff]/[0.015] to-transparent h-12 w-full animate-scan-fast pointer-events-none -z-10" />

        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          
          <div className="text-center max-w-4xl mx-auto">
            {/* High-tech Badge */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-500/10 border border-cyber-500/20 text-cyber-400 text-xs font-mono uppercase tracking-widest mb-8"
            >
              <Zap className="w-3.5 h-3.5 animate-pulse text-cyber-400" />
              <span>Unified Scanner Hub</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl font-display font-extrabold text-white tracking-tight uppercase leading-none mb-6"
            >
              Cybersecurity <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-400 via-matrix-400 to-[#8B5CF6]">Scanner Hub</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-400 text-lg md:text-xl font-sans max-w-3xl mx-auto leading-relaxed mb-4"
            >
              Advanced Security Analysis Tools for Web, Email, DNS, Network, and Infrastructure Protection.
            </motion.p>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-gray-500 text-xs sm:text-sm font-mono max-w-2xl mx-auto leading-relaxed mb-10"
            >
              // This page centralizes all security scanners previously accessible from the old homepage tools section into one dedicated scanner hub.
            </motion.p>

            {/* Action buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <button 
                onClick={handleScrollToTools}
                className="w-full sm:w-auto px-8 py-4 bg-cyber-500 hover:bg-cyber-400 text-black text-xs font-mono font-bold uppercase tracking-widest rounded-xl transition-all shadow-[0_0_20px_rgba(0,229,255,0.2)] hover:shadow-[0_0_30px_rgba(0,229,255,0.4)] flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Start Scanning</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={handleScrollToTools}
                className="w-full sm:w-auto px-8 py-4 bg-surface-900 border border-white/10 hover:border-cyber-400/50 hover:bg-surface-800 text-white text-xs font-mono font-bold uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Explore Tools</span>
                <Eye className="w-4 h-4 text-cyber-400" />
              </button>
            </motion.div>
          </div>

        </div>
      </section>

      {/* 5. SECURITY STATS SECTION */}
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

      {/* 4. FEATURED TOOLS SECTION */}
      <section className="py-24 bg-[#0a0d14]/30 border-b border-white/[0.04] relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-cyber-500/[0.015] blur-[150px] rounded-full pointer-events-none -z-10" />
        <div className="max-w-[1200px] mx-auto px-6">
          
          <div className="mb-12">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyber-400" />
              <span className="font-mono text-xs text-cyber-400 font-bold uppercase tracking-widest">// SECURE FIRST LINE OF DEFENSE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mt-2 uppercase tracking-wide">Featured Exposure Scanners</h2>
            <p className="text-gray-400 text-sm mt-1">High-impact audit utilities recommended for initial digital footprints mapping.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredTools.map((tool) => {
              const Icon = tool.icon;
              return (
                <div 
                  key={tool.id} 
                  className="group flex flex-col justify-between p-8 rounded-3xl bg-[#0d1117]/60 backdrop-blur-xl border border-white/[0.06] hover:border-cyber-400/40 hover:shadow-[0_0_35px_rgba(0,229,255,0.05)] transition-all duration-300 relative overflow-hidden"
                >
                  {/* Subtle hover background highlight */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyber-400/[0.02] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  
                  {/* Neon border glow bar */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyber-400/10 via-cyber-400 to-cyber-400/10 opacity-30 group-hover:opacity-100 transition-opacity duration-300" />

                  <div>
                    {/* Top Row: Icon + Badges */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-cyber-500/10 border border-cyber-500/20 flex items-center justify-center text-cyber-400 group-hover:scale-105 transition-transform duration-300">
                        <Icon className="w-6 h-6" />
                      </div>
                      
                      <div className="flex items-center gap-2 font-mono">
                        <span className="text-[9px] font-bold text-[#00ff88] bg-[#00ff88]/10 border border-[#00ff88]/20 px-2 py-0.5 rounded uppercase tracking-wider">
                          {tool.tag}
                        </span>
                        <span className="text-[9px] text-gray-400 bg-surface-950 border border-white/5 px-2 py-0.5 rounded tracking-wider">
                          {tool.grade}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyber-400 transition-colors tracking-wide">
                      {tool.name}
                    </h3>
                    
                    <p className="text-sm text-gray-400 leading-relaxed mb-6">
                      {tool.desc}
                    </p>

                    <div className="p-3.5 rounded-xl bg-surface-950/60 border border-white/[0.04] mb-8">
                      <p className="text-xs font-mono text-gray-500 flex items-start gap-1.5">
                        <span className="text-cyber-400 shrink-0 font-bold">»</span>
                        <span className="leading-snug">{tool.details}</span>
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/[0.04] flex items-center justify-between mt-auto">
                    <span className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">Featured Module</span>
                    <Link 
                      href={tool.route}
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-cyber-400 hover:text-white transition-colors uppercase tracking-widest font-bold"
                    >
                      <span>Launch Scanner</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. MAIN TOOLS DASHBOARD SECTION (MOST IMPORTANT) */}
      <section ref={dashboardRef} className="py-24 bg-[#05080f] scroll-mt-16">
        <div className="max-w-[1200px] mx-auto px-6">
          
          <div className="text-center mb-12">
            <span className="font-mono text-xs text-cyber-400 font-bold uppercase tracking-widest">// TARGET AUDIT ENGINES</span>
            <h2 className="text-3xl font-display font-bold text-white mt-2 uppercase tracking-wide">ReconShield Defense Dashboard</h2>
            <p className="text-gray-400 text-sm max-w-2xl mx-auto mt-2 leading-relaxed">
              Launch defensive network, web, infrastructure, threat intelligence, and compliance assessment scans using passive indicators without targeting payloads directly.
            </p>
          </div>

          {/* 3. SEARCH BAR AND CATEGORY TABS CONTROLLER */}
          <div className="p-6 rounded-3xl bg-[#0d1117]/50 border border-white/[0.05] shadow-2xl relative overflow-hidden mb-12">
            
            {/* Cyber glow background accent */}
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-cyber-500/5 blur-[60px] rounded-full pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
              
              {/* Tool Search Bar */}
              <div className="lg:col-span-1 relative flex items-center bg-surface-950 border border-white/10 rounded-2xl px-4 py-1.5 transition-all focus-within:border-cyber-400/50 focus-within:ring-1 focus-within:ring-cyber-400/50">
                <Search className="w-5 h-5 text-gray-500 shrink-0" />
                <input
                  type="text"
                  className="w-full bg-transparent py-2.5 pl-3 pr-8 text-white focus:outline-none font-mono text-sm placeholder:font-sans placeholder:text-gray-500"
                  placeholder="Search security tools…"
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
                  <span>Filter security class</span>
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
              Showing <span className="text-cyber-400 font-bold">{filteredTools.length}</span> of <span className="text-gray-400 font-bold">{TOOLS_LIST.length}</span> scanners
            </div>
          </div>

          {/* Modern Responsive Tool Grid */}
          <AnimatePresence mode="popLayout">
            {filteredTools.length > 0 ? (
              <motion.div 
                variants={{
                  show: {
                    transition: {
                      staggerChildren: 0.03
                    }
                  }
                }}
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
                      {/* Hover glow background card accent */}
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
                          <span>Launch</span>
                          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </Link>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-16 text-center border border-white/5 rounded-2xl bg-surface-900/60 max-w-md mx-auto shadow-xl"
              >
                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-gray-500">
                  <X className="w-6 h-6" />
                </div>
                <h4 className="text-white font-bold mb-1">No security modules found</h4>
                <p className="text-gray-400 text-xs font-mono mb-6 px-6 leading-relaxed">
                  We couldn't locate any scanners matching "{searchQuery}" under the category "{activeCategory}".
                </p>
                <button 
                  onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                  className="px-5 py-2 bg-cyber-500/10 border border-cyber-500/20 text-cyber-400 text-xs font-mono font-bold rounded-xl hover:bg-cyber-500/20 transition-all uppercase tracking-widest cursor-pointer"
                >
                  Reset Search filter
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>

      {/* 6. RECENT SECURITY ARTICLES SECTION */}
      <section className="py-24 bg-[#0a0d14]/30 border-t border-b border-white/[0.04]">
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
                  <Link href={`/blog/${post.slug}`} className="block relative aspect-video w-full bg-surface-950 overflow-hidden border-b border-white/5">
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
                    
                    <Link href={`/blog/${post.slug}`}>
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

      {/* 7. CTA SECTION */}
      <section className="py-24 bg-[#05080f] relative overflow-hidden">
        
        {/* Glow circle overlay */}
        <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-cyber-500/[0.015] blur-[150px] rounded-full pointer-events-none -z-10" />
        <div className="absolute top-0 left-0 w-[450px] h-[450px] bg-matrix-500/[0.01] blur-[150px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-[1200px] mx-auto px-6">
          <div className="p-8 md:p-12 rounded-3xl border border-cyber-500/20 bg-gradient-to-br from-[#0d1117] via-surface-900 to-transparent relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,229,255,0.02),transparent_40%)] pointer-events-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center relative z-10">
              
              <div className="lg:col-span-2">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-cyber-500/10 text-cyber-400 text-[10px] font-mono uppercase tracking-widest mb-4">
                  <ShieldCheck className="w-3.5 h-3.5" /> 
                  <span>Infrastructure Guard</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-4 uppercase tracking-wide">
                  Secure Your Infrastructure Before Attackers Find Weaknesses
                </h2>
                <p className="text-gray-400 text-sm md:text-base max-w-2xl leading-relaxed">
                  Validate DNS settings, scan SSL certificates, and check HTTP security headers passive. Keep tracking of exposed digital assets and remediate configuration risks today.
                </p>
              </div>

              <div className="lg:col-span-1 flex flex-col sm:flex-row lg:flex-col gap-4 justify-end">
                <Link 
                  href="/tools/vulnerability-scanner"
                  className="w-full text-center px-6 py-4 bg-cyber-500 hover:bg-cyber-400 text-black text-xs font-mono font-bold uppercase tracking-widest rounded-xl transition-all shadow-[0_0_20px_rgba(0,229,255,0.15)] hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] block"
                >
                  Start Free Scan
                </Link>
                <Link 
                  href="/blog"
                  className="w-full text-center px-6 py-4 bg-surface-950 hover:bg-surface-900 border border-white/10 hover:border-cyber-400/40 text-white text-xs font-mono font-bold uppercase tracking-widest rounded-xl transition-all block"
                >
                  Explore Intelligence Hub
                </Link>
              </div>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
