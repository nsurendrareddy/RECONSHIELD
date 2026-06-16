'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Shield, Terminal, Activity, AlertTriangle, Lock, Globe, Menu, X, 
  ExternalLink, ChevronDown, BookOpen, FileText, Code, Users, Award, 
  ShieldAlert, Cpu, Database, Network, Server, ArrowRight, ArrowUpRight,
  Home
} from 'lucide-react'
import { useState, useEffect, useRef, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import useMultiTagAds from '@/hooks/useMultiTagAds'

const NewsletterForm = dynamic(() => import('@/components/NewsletterForm'), { ssr: false })
const CookieBanner = dynamic(() => import('@/components/CookieBanner'), { ssr: false })
const LazyAdSense = dynamic(() => import("@/components/ads/LazyAdSense"), { ssr: false })
const MobileStickyAd = dynamic(() => import("@/components/ads/MobileStickyAd"), { ssr: false })

export default function Layout({ children }) {
  const pathname = usePathname()
  
  // Integrate MultiTag ad script on allowed routes
  useMultiTagAds()

  const [theme, setTheme] = useState('dark')
  const [showBanner, setShowBanner] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState(null)
  const [mobileExpanded, setMobileExpanded] = useState(null)
  
  const timeoutRef = useRef(null)

  // Active state helper
  const isActive = useCallback((path) => {
    if (path === '/') return pathname === '/'
    return pathname === path || pathname?.startsWith(path + '/')
  }, [pathname])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [isMenuOpen])

  // Force dark theme
  useEffect(() => {
    setTheme('dark')
    document.documentElement.classList.remove('light')
    localStorage.setItem('reconshield-theme', 'dark')
  }, [])

  // Escape key closes menus
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveMenu(null)
        setIsMenuOpen(false)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false)
    setMobileExpanded(null)
  }, [pathname])

  const handleMouseEnter = (menuName) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setActiveMenu(menuName)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null)
    }, 200)
  }

  const toggleMobileSection = (section) => {
    setMobileExpanded(prev => prev === section ? null : section)
  }

  const isBlogPage = pathname?.startsWith('/blog')

  // ─── Navigation Data ───────────────────────────────────────────────────────

  const scannersCategories = [
    {
      title: 'Domain Security',
      items: [
        { label: 'SSL Checker', path: '/tools/ssl-checker' },
        { label: 'WHOIS Lookup', path: '/tools/whois' },
        { label: 'DNS Lookup', path: '/tools/dns-lookup' },
        { label: 'Header Analyzer', path: '/tools/http-headers' }
      ]
    },
    {
      title: 'Network Intelligence',
      items: [
        { label: 'Port Scanner', path: '/tools/port-scanner' },
        { label: 'IP Lookup', path: '/tools/ip-lookup' },
        { label: 'ASN Lookup', path: '/asn' }
      ]
    },
    {
      title: 'Web Security',
      items: [
        { label: 'Technology Detector', path: '/tools/tech-detector' },
        { label: 'Security Headers', path: '/tools/http-headers' },
        { label: 'Website Fingerprinting', path: '/tools/tech-detector' }
      ]
    },
    {
      title: 'Vulnerability Intel',
      items: [
        { label: 'CVE Search', path: '/vulnerability' },
        { label: 'Vulnerability DB', path: '/vulnerability' },
        { label: 'Threat Intelligence', path: '/blog' }
      ]
    }
  ]

  const toolsCategories = [
    {
      category: 'Reconnaissance',
      items: [
        { label: 'Subdomain Finder', path: '/tools/subdomain-finder', desc: 'Find active subdomains list', count: '12.4K', icon: Globe },
        { label: 'WHOIS Lookup', path: '/tools/whois', desc: 'Domain owner registration info', count: '9.8K', icon: FileText },
        { label: 'DNS Lookup', path: '/tools/dns-lookup', desc: 'Resolve full target name records', count: '15.1K', icon: Server }
      ]
    },
    {
      category: 'Intelligence',
      items: [
        { label: 'IP Lookup', path: '/tools/ip-lookup', desc: 'Assess IP reputation & location', count: '22.3K', icon: Activity },
        { label: 'ASN Directory', path: '/asn', desc: 'Map autonomous routes & routing', count: '7.6K', icon: Network }
      ]
    },
    {
      category: 'Network Analysis',
      items: [
        { label: 'Port Scanner', path: '/tools/port-scanner', desc: 'List exposed system server ports', count: '34.2K', icon: Terminal }
      ]
    },
    {
      category: 'Web Security',
      items: [
        { label: 'Technology Detector', path: '/tools/tech-detector', desc: 'Web stack and component audit', count: '18.5K', icon: Cpu },
        { label: 'Header Analyzer', path: '/tools/http-headers', desc: 'Check CSP and security headers', count: '11.2K', icon: Shield },
        { label: 'SSL Checker', path: '/tools/ssl-checker', desc: 'Validate TLS handshake strength', count: '20.4K', icon: Lock }
      ]
    },
    {
      category: 'AI Security',
      items: [
        { label: 'Vulnerability Database', path: '/vulnerability', desc: 'Search CVE intelligence directory', count: '14.7K', icon: ShieldAlert }
      ]
    },
    {
      category: 'Utilities',
      items: [
        { label: 'Email Security', path: '/tools/email-security', desc: 'Audit SPF, DKIM, DMARC config', count: '8.9K', icon: ExternalLink }
      ]
    }
  ]

  const platformItems = [
    { label: 'Academic Labs', path: '/academic', desc: 'Cybersecurity learning resources', icon: BookOpen },
    { label: 'Resources Library', path: '/resources', desc: 'Guides, checklists, reports', icon: FileText },
    { label: 'Open Source Projects', path: '/opensource', desc: 'GitHub repositories', icon: Code },
    { label: 'Cybersecurity Glossary', path: '/glossary', desc: 'Terms definitions resource', icon: FileText },
    { label: 'Threat Reports', path: '/reports', desc: 'Quarterly OSINT threat reviews', icon: ShieldAlert },
    { label: 'API Access (Future)', path: '/developers', desc: 'Developers threat intelligence endpoints', icon: Terminal },
    { label: 'Community Resources', path: '/contact', desc: 'Security community forums', icon: Users },
    { label: 'Research Papers', path: '/research', desc: 'Technical security research briefs', icon: Award },
    { label: 'Security Learning Center', path: '/academic', desc: 'Vulnerability remediation tutorials', icon: BookOpen }
  ]

  const entityIntelItems = [
    { label: 'Ports Directory', path: '/ports', desc: 'Index of standard service ports configuration' },
    { label: 'ASN Directory', path: '/asn', desc: 'Catalog of registered network routing spaces' },
    { label: 'IP Intelligence Hub', path: '/ip-intelligence', desc: 'Active IP ranges vulnerability telemetry' },
    { label: 'SSL Analysis Hub', path: '/ssl', desc: 'TLS certifications index & vulnerability analysis' },
    { label: 'DNS Records Hub', path: '/dns-analysis', desc: 'Central lookup trace records history' },
    { label: 'Technology Detection Hub', path: '/technology', desc: 'Indexed list of detected frameworks online' },
    { label: 'Vulnerability Database', path: '/vulnerability', desc: 'Active list of zero-day vulnerabilities & CVEs' },
    { label: 'Subdomains Intelligence Hub', path: '/subdomains', desc: 'Public DNS subdomain record mappings' },
    { label: 'Threat Actors (Future)', path: '/threat-actor', desc: 'Profiles of threat actor groups & TTPs' },
    { label: 'Malware Families (Future)', path: '/threat-actor', desc: 'Analysis reports on emerging malware strains' },
    { label: 'Exploit Intelligence (Future)', path: '/vulnerability', desc: 'Correlated exploit indices with remediation paths' }
  ]

  // ─── Shared button class builder ──────────────────────────────────────────

  const navBtnClass = (menuKey) =>
    `flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold tracking-wide uppercase transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-matrix-400/60 ${
      activeMenu === menuKey
        ? 'bg-matrix-400/10 text-matrix-400'
        : 'text-gray-300 hover:text-matrix-400 hover:bg-white/[0.02]'
    }`

  const navLinkClass = (path) =>
    `px-3 py-2 rounded-lg text-xs font-semibold tracking-wide uppercase transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-matrix-400/60 ${
      isActive(path)
        ? 'bg-matrix-400/10 text-matrix-400'
        : 'text-gray-300 hover:text-matrix-400 hover:bg-white/[0.02]'
    }`

  // ─── Mega menu animation props ────────────────────────────────────────────

  const megaMenuMotion = {
    initial: { opacity: 0, y: 8, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit:    { opacity: 0, y: 8, scale: 0.98 },
    transition: { duration: 0.18, ease: 'easeOut' }
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-surface-950 text-white' : 'bg-gray-50 text-gray-900'} ${!isBlogPage ? 'bg-grid' : ''}`}>
      
      {/* Ethical Disclaimer Banner */}
      {showBanner && !isBlogPage && (
        <div className="bg-amber-500/10 border-b border-amber-500/20 py-2 relative overflow-hidden group z-50">
          <div className="max-w-[1440px] mx-auto px-4 flex items-center justify-center gap-4 text-[11px] md:text-xs font-mono text-amber-500 font-medium">
            <div className="flex items-center gap-1.5 shrink-0">
              <AlertTriangle className="w-3.5 h-3.5 animate-pulse" aria-hidden="true" />
              <span className="uppercase tracking-wider">Legal Disclaimer:</span>
            </div>
            <p className="opacity-80">This platform is for authorized security research and educational purposes ONLY. Scanning assets without explicit permission is illegal.</p>
            <button onClick={() => setShowBanner(false)} aria-label="Dismiss notification" className="ml-auto p-1 hover:bg-amber-500/10 rounded transition-colors cursor-pointer">
              <X className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-amber-500/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </div>
      )}

      {/* Ambient background orbs */}
      {!isBlogPage && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          <div className={`absolute -top-48 -right-48 w-[500px] h-[500px] rounded-full blur-[120px] ${theme === 'dark' ? 'bg-matrix-400/[0.03]' : 'bg-matrix-400/[0.05]'}`} />
          <div className={`absolute -bottom-48 -left-48 w-[500px] h-[500px] rounded-full blur-[120px] ${theme === 'dark' ? 'bg-neon-500/[0.02]' : 'bg-neon-500/[0.04]'}`} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyber-400/[0.01] rounded-full blur-[150px]" />
        </div>
      )}

      {/* ─── Header ────────────────────────────────────────────────────────── */}
      <header className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-all duration-300 ${
        theme === 'dark' ? 'bg-surface-950/80 border-white/[0.04]' : 'bg-white/80 border-gray-200'
      }`}>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/" aria-label="ReconShield home" className="flex items-center gap-3 group shrink-0">
              <div className="relative">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                  theme === 'dark'
                    ? 'bg-matrix-400/10 border border-matrix-400/20 group-hover:border-matrix-400/40'
                    : 'bg-matrix-600/10 border border-matrix-600/20 group-hover:border-matrix-600/40'
                }`}>
                  <Shield className={`w-5 h-5 ${theme === 'dark' ? 'text-matrix-400' : 'text-matrix-600'}`} aria-hidden="true" />
                </div>
                <div className={`absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full animate-pulse ${theme === 'dark' ? 'bg-matrix-400' : 'bg-matrix-600'}`} />
              </div>
              <div className="hidden xs:block">
                <span className="font-display text-lg font-bold tracking-wider">
                  <span className={`${theme === 'dark' ? 'text-glow-green text-matrix-400' : 'text-matrix-600'}`}>Recon</span>
                  <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Shield</span>
                </span>
                <div className="flex items-center gap-1.5 -mt-0.5">
                  <Activity className={`w-2.5 h-2.5 ${theme === 'dark' ? 'text-matrix-400/60' : 'text-matrix-600/60'}`} aria-hidden="true" />
                  <p className={`text-[9px] tracking-[0.25em] uppercase font-mono ${theme === 'dark' ? 'text-matrix-400/60' : 'text-matrix-600/60'}`}>Threat Intelligence</p>
                </div>
              </div>
            </Link>

            {/* ─── Desktop Navigation ──────────────────────────────────────── */}
            <nav className="hidden md:flex items-center gap-1 xl:gap-2" role="navigation" aria-label="Main navigation">

              {/* Home */}
              <Link href="/" className={navLinkClass('/')}>
                Home
              </Link>

              {/* ── Scanners Mega Menu ── */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('scanners')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className={navBtnClass('scanners')}
                  aria-haspopup="true"
                  aria-expanded={activeMenu === 'scanners'}
                  aria-controls="mega-scanners"
                >
                  Scanners
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMenu === 'scanners' ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>
                <AnimatePresence>
                  {activeMenu === 'scanners' && (
                    <motion.div
                      id="mega-scanners"
                      role="menu"
                      aria-label="Scanners menu"
                      {...megaMenuMotion}
                      className="absolute left-1/2 -translate-x-[40%] mt-2 w-[760px] bg-surface-950/97 backdrop-blur-2xl border border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.6)] rounded-2xl overflow-hidden p-7 z-50 grid grid-cols-4 gap-7"
                    >
                      {scannersCategories.map((cat, i) => (
                        <div key={i} className="space-y-4">
                          <h4 className="font-mono text-[13px] text-gray-300 font-bold uppercase tracking-widest border-b border-white/8 pb-2.5">{cat.title}</h4>
                          <ul className="space-y-1" role="none">
                            {cat.items.map((item, idx) => (
                              <li key={idx} role="none">
                                <Link
                                  href={item.path}
                                  role="menuitem"
                                  className="text-[15px] text-gray-200 hover:text-matrix-400 flex items-center min-h-[44px] transition-colors duration-150 hover:translate-x-0.5 transform rounded-lg px-2 -mx-2 hover:bg-white/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-matrix-400/60"
                                >
                                  {item.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                      <div className="col-span-4 mt-1 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
                        <span className="text-gray-500 uppercase tracking-wider">Passive Real-Time Discovery Engine</span>
                        <Link href="/tools" role="menuitem" className="text-matrix-400 hover:text-white transition-colors flex items-center gap-1.5 font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-matrix-400/60 rounded">
                          Explore All Security Scanners <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* ── Blog — Direct Link (no dropdown) ── */}
              <Link href="/blog" className={navLinkClass('/blog')}>
                Blog
              </Link>

              {/* ── Tools Mega Menu ── */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('tools')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className={navBtnClass('tools')}
                  aria-haspopup="true"
                  aria-expanded={activeMenu === 'tools'}
                  aria-controls="mega-tools"
                >
                  Tools
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMenu === 'tools' ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>
                <AnimatePresence>
                  {activeMenu === 'tools' && (
                    <motion.div
                      id="mega-tools"
                      role="menu"
                      aria-label="Tools menu"
                      {...megaMenuMotion}
                      className="absolute left-1/2 -translate-x-[50%] mt-2 w-[920px] bg-surface-950/97 backdrop-blur-2xl border border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.6)] rounded-2xl overflow-hidden p-7 z-50 grid grid-cols-3 gap-7"
                    >
                      {toolsCategories.map((group, i) => (
                        <div key={i} className="space-y-3">
                          <h4 className="font-mono text-[13px] text-gray-300 font-bold uppercase tracking-widest border-b border-white/8 pb-2.5">{group.category}</h4>
                          <div className="space-y-1">
                            {group.items.map((tool, idx) => {
                              const ToolIcon = tool.icon
                              return (
                                <Link
                                  key={idx}
                                  href={tool.path}
                                  role="menuitem"
                                  className="flex gap-3 items-start hover:bg-white/[0.03] p-3 rounded-xl transition-all group min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-matrix-400/60"
                                >
                                  <div className="w-8 h-8 rounded-lg bg-surface-900 border border-white/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:border-matrix-400/30 transition-colors">
                                    <ToolIcon className="w-4 h-4 text-matrix-400 group-hover:scale-110 transition-transform" aria-hidden="true" />
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <span className="text-[14px] font-bold text-white font-display group-hover:text-matrix-400 transition-colors uppercase leading-snug">{tool.label}</span>
                                      <span className="text-[10px] font-mono text-gray-500 font-bold shrink-0 leading-none">{tool.count}</span>
                                    </div>
                                    <p className="text-[12px] text-gray-300 leading-snug mt-0.5 font-sans">{tool.desc}</p>
                                  </div>
                                </Link>
                              )
                            })}
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* ── Platform Mega Menu ── */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('platform')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className={navBtnClass('platform')}
                  aria-haspopup="true"
                  aria-expanded={activeMenu === 'platform'}
                  aria-controls="mega-platform"
                >
                  Platform
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMenu === 'platform' ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>
                <AnimatePresence>
                  {activeMenu === 'platform' && (
                    <motion.div
                      id="mega-platform"
                      role="menu"
                      aria-label="Platform menu"
                      {...megaMenuMotion}
                      className="absolute left-1/2 -translate-x-[55%] mt-2 w-[800px] bg-surface-950/97 backdrop-blur-2xl border border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.6)] rounded-2xl overflow-hidden p-7 z-50"
                    >
                      <div className="grid grid-cols-3 gap-3">
                        {platformItems.map((item, i) => {
                          const ItemIcon = item.icon
                          return (
                            <Link
                              key={i}
                              href={item.path}
                              role="menuitem"
                              className="flex gap-3 items-start hover:bg-white/[0.03] p-3.5 rounded-xl transition-all group min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-matrix-400/60"
                            >
                              <div className="w-9 h-9 rounded-lg bg-surface-900 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-matrix-400/30 transition-colors">
                                <ItemIcon className="w-4 h-4 text-matrix-400 group-hover:scale-110 transition-transform" aria-hidden="true" />
                              </div>
                              <div>
                                <span className="text-[14px] font-bold text-white font-display uppercase tracking-wide group-hover:text-matrix-400 transition-colors block leading-snug">{item.label}</span>
                                <p className="text-[12px] text-gray-300 leading-snug mt-0.5 font-sans">{item.desc}</p>
                              </div>
                            </Link>
                          )
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* ── Entity Intel Mega Menu ── */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('entityIntel')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className={navBtnClass('entityIntel')}
                  aria-haspopup="true"
                  aria-expanded={activeMenu === 'entityIntel'}
                  aria-controls="mega-entity-intel"
                >
                  Entity Intel
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMenu === 'entityIntel' ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>
                <AnimatePresence>
                  {activeMenu === 'entityIntel' && (
                    <motion.div
                      id="mega-entity-intel"
                      role="menu"
                      aria-label="Entity Intelligence menu"
                      {...megaMenuMotion}
                      className="absolute left-1/2 -translate-x-[65%] mt-2 w-[760px] bg-surface-950/97 backdrop-blur-2xl border border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.6)] rounded-2xl overflow-hidden p-7 z-50"
                    >
                      <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                        {entityIntelItems.map((item, i) => (
                          <Link
                            key={i}
                            href={item.path}
                            role="menuitem"
                            className="p-3 hover:bg-white/[0.03] rounded-xl transition-all group flex flex-col min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-matrix-400/60"
                          >
                            <span className="text-[14px] font-bold text-white font-mono uppercase tracking-wide group-hover:text-matrix-400 transition-colors flex items-center justify-between leading-snug">
                              {item.label}
                              <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-matrix-400 shrink-0" aria-hidden="true" />
                            </span>
                            <p className="text-[12px] text-gray-300 mt-1 leading-snug font-sans">{item.desc}</p>
                          </Link>
                        ))}
                      </div>
                      <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
                        <span className="text-gray-500 uppercase tracking-wider">Search Engine Optimized Directory Structure</span>
                        <span className="text-matrix-400 font-bold">Monitored Securely</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* ── About — Direct Link (no dropdown) ── */}
              <Link href="/about-reconshield" className={navLinkClass('/about-reconshield')}>
                About
              </Link>

            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-4">
              <Link href="/scanner" className="px-4 py-2 bg-matrix-400 hover:bg-matrix-500 text-surface-950 text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-all shadow-[0_0_15px_rgba(0,255,156,0.15)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-matrix-400">
                Start Scanning
              </Link>
              <Link href="/ip-intelligence" className="px-4 py-2 border border-white/10 hover:border-white/20 text-white hover:bg-white/[0.02] text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30">
                Explore Intelligence
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg transition-all bg-matrix-400/10 text-matrix-400 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-matrix-400/60"
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav"
            >
              {isMenuOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
            </button>

          </div>
        </div>
      </header>

      {/* ─── Mobile Navigation Drawer ──────────────────────────────────────── */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="md:hidden fixed inset-0 z-[100] bg-surface-950/98 backdrop-blur-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="flex flex-col h-[100dvh] w-full">

              {/* Top bar */}
              <div className="flex items-center justify-between px-6 h-16 border-b border-white/10 shrink-0">
                <Link href="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-matrix-400/60 rounded-lg">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-matrix-400/10 border border-matrix-400/20">
                    <Shield className="w-5 h-5 text-matrix-400" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="font-display text-lg font-bold tracking-wider">
                      <span className="text-matrix-400">Recon</span><span className="text-white">Shield</span>
                    </span>
                  </div>
                </Link>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                  aria-label="Close navigation menu"
                >
                  <X className="w-6 h-6" aria-hidden="true" />
                </button>
              </div>

              {/* Scrollable nav content */}
              <nav className="flex-1 overflow-y-auto py-6 px-5" aria-label="Mobile navigation">
                <ul className="flex flex-col gap-1" role="list">

                  {/* Home */}
                  <li>
                    <Link
                      href="/"
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center gap-3 min-h-[52px] px-4 py-3 rounded-xl text-base font-display font-bold uppercase tracking-wider transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-matrix-400/60 ${
                        isActive('/') ? 'bg-matrix-400/10 text-matrix-400' : 'text-white hover:bg-white/[0.04] hover:text-matrix-400'
                      }`}
                    >
                      <Home className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>Home</span>
                    </Link>
                  </li>

                  {/* Scanners (accordion) */}
                  <li>
                    <button
                      onClick={() => toggleMobileSection('scanners')}
                      aria-expanded={mobileExpanded === 'scanners'}
                      className="w-full flex items-center justify-between min-h-[52px] px-4 py-3 rounded-xl text-base font-display font-bold uppercase tracking-wider text-white hover:bg-white/[0.04] hover:text-matrix-400 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-matrix-400/60"
                    >
                      <div className="flex items-center gap-3">
                        <Shield className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <span>Scanners</span>
                      </div>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileExpanded === 'scanners' ? 'rotate-180 text-matrix-400' : 'text-gray-500'}`} aria-hidden="true" />
                    </button>
                    <AnimatePresence>
                      {mobileExpanded === 'scanners' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="ml-4 mt-1 pl-4 border-l border-white/10 space-y-1 pb-2">
                            {scannersCategories.map((cat, i) => (
                              <div key={i} className="pt-3 first:pt-1">
                                <p className="text-[11px] font-mono text-gray-500 uppercase tracking-widest font-bold mb-1.5 px-3">{cat.title}</p>
                                {cat.items.map((item, idx) => (
                                  <Link
                                    key={idx}
                                    href={item.path}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center min-h-[44px] px-3 py-2 rounded-lg text-[15px] text-gray-200 hover:text-matrix-400 hover:bg-white/[0.03] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-matrix-400/60"
                                  >
                                    {item.label}
                                  </Link>
                                ))}
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>

                  {/* Blog — Direct link */}
                  <li>
                    <Link
                      href="/blog"
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center gap-3 min-h-[52px] px-4 py-3 rounded-xl text-base font-display font-bold uppercase tracking-wider transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-matrix-400/60 ${
                        isActive('/blog') ? 'bg-matrix-400/10 text-matrix-400' : 'text-white hover:bg-white/[0.04] hover:text-matrix-400'
                      }`}
                    >
                      <BookOpen className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>Blog</span>
                    </Link>
                  </li>

                  {/* Tools (accordion) */}
                  <li>
                    <button
                      onClick={() => toggleMobileSection('tools')}
                      aria-expanded={mobileExpanded === 'tools'}
                      className="w-full flex items-center justify-between min-h-[52px] px-4 py-3 rounded-xl text-base font-display font-bold uppercase tracking-wider text-white hover:bg-white/[0.04] hover:text-matrix-400 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-matrix-400/60"
                    >
                      <div className="flex items-center gap-3">
                        <Terminal className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <span>Tools</span>
                      </div>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileExpanded === 'tools' ? 'rotate-180 text-matrix-400' : 'text-gray-500'}`} aria-hidden="true" />
                    </button>
                    <AnimatePresence>
                      {mobileExpanded === 'tools' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="ml-4 mt-1 pl-4 border-l border-white/10 space-y-1 pb-2">
                            {toolsCategories.map((group, i) => (
                              <div key={i} className="pt-3 first:pt-1">
                                <p className="text-[11px] font-mono text-gray-500 uppercase tracking-widest font-bold mb-1.5 px-3">{group.category}</p>
                                {group.items.map((tool, idx) => (
                                  <Link
                                    key={idx}
                                    href={tool.path}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center gap-3 min-h-[44px] px-3 py-2 rounded-lg text-[15px] text-gray-200 hover:text-matrix-400 hover:bg-white/[0.03] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-matrix-400/60"
                                  >
                                    {tool.label}
                                  </Link>
                                ))}
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>

                  {/* Platform (accordion) */}
                  <li>
                    <button
                      onClick={() => toggleMobileSection('platform')}
                      aria-expanded={mobileExpanded === 'platform'}
                      className="w-full flex items-center justify-between min-h-[52px] px-4 py-3 rounded-xl text-base font-display font-bold uppercase tracking-wider text-white hover:bg-white/[0.04] hover:text-matrix-400 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-matrix-400/60"
                    >
                      <div className="flex items-center gap-3">
                        <Cpu className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <span>Platform</span>
                      </div>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileExpanded === 'platform' ? 'rotate-180 text-matrix-400' : 'text-gray-500'}`} aria-hidden="true" />
                    </button>
                    <AnimatePresence>
                      {mobileExpanded === 'platform' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="ml-4 mt-1 pl-4 border-l border-white/10 pb-2">
                            {platformItems.map((item, i) => (
                              <Link
                                key={i}
                                href={item.path}
                                onClick={() => setIsMenuOpen(false)}
                                className="flex items-center min-h-[44px] px-3 py-2 rounded-lg text-[15px] text-gray-200 hover:text-matrix-400 hover:bg-white/[0.03] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-matrix-400/60"
                              >
                                {item.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>

                  {/* Entity Intel (accordion) */}
                  <li>
                    <button
                      onClick={() => toggleMobileSection('entityIntel')}
                      aria-expanded={mobileExpanded === 'entityIntel'}
                      className="w-full flex items-center justify-between min-h-[52px] px-4 py-3 rounded-xl text-base font-display font-bold uppercase tracking-wider text-white hover:bg-white/[0.04] hover:text-matrix-400 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-matrix-400/60"
                    >
                      <div className="flex items-center gap-3">
                        <Database className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <span>Entity Intel</span>
                      </div>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileExpanded === 'entityIntel' ? 'rotate-180 text-matrix-400' : 'text-gray-500'}`} aria-hidden="true" />
                    </button>
                    <AnimatePresence>
                      {mobileExpanded === 'entityIntel' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="ml-4 mt-1 pl-4 border-l border-white/10 pb-2">
                            {entityIntelItems.map((item, i) => (
                              <Link
                                key={i}
                                href={item.path}
                                onClick={() => setIsMenuOpen(false)}
                                className="flex flex-col min-h-[44px] px-3 py-2.5 rounded-lg hover:bg-white/[0.03] transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-matrix-400/60"
                              >
                                <span className="text-[15px] text-gray-200 group-hover:text-matrix-400 transition-colors font-medium leading-snug">{item.label}</span>
                                <span className="text-[11px] text-gray-500 leading-snug mt-0.5">{item.desc}</span>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>

                  {/* About — Direct link */}
                  <li>
                    <Link
                      href="/about-reconshield"
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center gap-3 min-h-[52px] px-4 py-3 rounded-xl text-base font-display font-bold uppercase tracking-wider transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-matrix-400/60 ${
                        isActive('/about-reconshield') ? 'bg-matrix-400/10 text-matrix-400' : 'text-white hover:bg-white/[0.04] hover:text-matrix-400'
                      }`}
                    >
                      <Users className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>About</span>
                    </Link>
                  </li>

                </ul>

                {/* Mobile CTA buttons */}
                <div className="mt-8 grid grid-cols-1 gap-3">
                  <Link
                    href="/scanner"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center gap-2 min-h-[52px] px-6 py-3 bg-matrix-400 hover:bg-matrix-500 text-surface-950 text-sm font-mono font-bold uppercase tracking-wider rounded-xl transition-all shadow-[0_0_20px_rgba(0,255,156,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-matrix-400"
                  >
                    <Shield className="w-4 h-4" aria-hidden="true" />
                    Start Security Scan
                  </Link>
                  <Link
                    href="/ip-intelligence"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center gap-2 min-h-[52px] px-6 py-3 border border-white/10 hover:border-white/20 text-white hover:bg-white/[0.04] text-sm font-mono font-bold uppercase tracking-wider rounded-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                  >
                    <Activity className="w-4 h-4" aria-hidden="true" />
                    Explore Intelligence
                  </Link>
                </div>
              </nav>

              {/* Bottom footer links */}
              <div className="p-5 border-t border-white/10 bg-surface-900/40 shrink-0">
                <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm text-gray-400 font-medium">
                  <Link href="/disclaimer" onClick={() => setIsMenuOpen(false)} className="hover:text-white transition-colors min-h-[44px] flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded">Disclaimer</Link>
                  <Link href="/privacy" onClick={() => setIsMenuOpen(false)} className="hover:text-white transition-colors min-h-[44px] flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded">Privacy Policy</Link>
                  <Link href="/editorial-policy" onClick={() => setIsMenuOpen(false)} className="hover:text-white transition-colors min-h-[44px] flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded">Editorial Policy</Link>
                  <Link href="/terms" onClick={() => setIsMenuOpen(false)} className="hover:text-white transition-colors min-h-[44px] flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded">Terms of Service</Link>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Main Content ──────────────────────────────────────────────────── */}
      <main className={`${isBlogPage || pathname === '/' ? '' : 'max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8'} min-h-[80vh] relative`}>
        {children}
      </main>

      {/* ─── Footer ────────────────────────────────────────────────────────── */}
      <footer className={`border-t mt-16 transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-surface-950/80 border-white/[0.04] text-gray-400'
          : 'bg-white border-gray-200 text-gray-600'
      } backdrop-blur-md`}>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-8 md:gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Shield className={`w-5 h-5 ${theme === 'dark' ? 'text-matrix-400' : 'text-matrix-600'}`} aria-hidden="true" />
                <span className={`font-display font-bold tracking-wider ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>RECONSHIELD</span>
              </div>
              <p className="text-sm leading-relaxed max-w-sm">
                Advanced educational infrastructure visibility and intelligence platform. Empowers security researchers with visibility into their internet-facing assets through passive data collection.
              </p>
            </div>
            
            {/* Newsletter Signup */}
            <div>
              <h3 className={`text-xs font-mono font-bold uppercase tracking-widest mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>// WEEKLY INTEL</h3>
              <p className="text-[11px] text-[#94a3b8] mb-4 leading-relaxed">Get the latest threat intelligence and OSINT guides.</p>
              <NewsletterForm
                accentColor="bg-matrix-400/10 hover:bg-matrix-400/20"
                buttonTextColor="text-matrix-400"
                inputClass="w-full bg-surface-900 border border-white/10 rounded-lg px-3 py-2 text-[11px] text-white focus:outline-none focus:border-matrix-400/50 transition-all font-mono"
                buttonClass="w-full border border-matrix-400/30 rounded-lg py-2 font-mono text-[10px] tracking-widest uppercase transition-all"
                layout="stacked"
                placeholder="agent@agency.gov"
                buttonText="SUBSCRIBE"
              />
            </div>

            <div>
              <h3 className={`text-xs font-mono font-bold uppercase tracking-widest mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Platform</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/scanner" className="hover:text-matrix-400 transition-colors">Security Scanner</Link></li>
                <li><Link href="/tools/subdomain-finder" className="hover:text-matrix-400 transition-colors">Subdomain Finder</Link></li>
                <li><Link href="/tools/dns-lookup" className="hover:text-matrix-400 transition-colors">DNS Lookup Tool</Link></li>
                <li><Link href="/tools/email-security" className="hover:text-matrix-400 transition-colors">Email Security Tool</Link></li>
                <li><Link href="/blog" className="hover:text-matrix-400 transition-colors">Security Blog</Link></li>
                <li><Link href="/about-reconshield" className="hover:text-matrix-400 transition-colors">About ReconShield</Link></li>
                <li><Link href="/research-team" className="hover:text-matrix-400 transition-colors">Research Team</Link></li>
                <li><Link href="/press" className="hover:text-matrix-400 transition-colors">Press Room</Link></li>
                <li><Link href="/academic" className="hover:text-matrix-400 transition-colors">Academic Labs</Link></li>
                <li><Link href="/resources" className="hover:text-matrix-400 transition-colors">Resources Library</Link></li>
                <li><Link href="/opensource" className="hover:text-matrix-400 transition-colors">Open Source OSS</Link></li>
                <li><Link href="/glossary" className="hover:text-matrix-400 transition-colors">Cyber Glossary</Link></li>
              </ul>
            </div>

            <div>
              <h3 className={`text-xs font-mono font-bold uppercase tracking-widest mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/terms" className="hover:text-matrix-400 transition-colors">Terms of Use</Link></li>
                <li><Link href="/privacy" className="hover:text-matrix-400 transition-colors">Privacy Policy</Link></li>
                <li><Link href="/disclaimer" className="hover:text-[#00ff88] transition-colors text-amber-500/80 hover:text-amber-500">Legal Disclaimer</Link></li>
                <li><Link href="/editorial-policy" className="hover:text-matrix-400 transition-colors">Editorial Policy</Link></li>
                <li><Link href="/research-methodology" className="hover:text-matrix-400 transition-colors">Research Methodology</Link></li>
                <li><Link href="/security-disclosure" className="hover:text-matrix-400 transition-colors">Security Disclosure</Link></li>
                <li><Link href="/contact" className="hover:text-matrix-400 transition-colors">Contact Support</Link></li>
              </ul>
            </div>

            <div>
              <h3 className={`text-xs font-mono font-bold uppercase tracking-widest mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Entity Intel</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/ports" className="hover:text-matrix-400 transition-colors">Ports Directory</Link></li>
                <li><Link href="/asn" className="hover:text-matrix-400 transition-colors">ASN Directory</Link></li>
                <li><Link href="/ip-intelligence" className="hover:text-matrix-400 transition-colors">IP Intelligence Hub</Link></li>
                <li><Link href="/ssl" className="hover:text-matrix-400 transition-colors">SSL Analysis Hub</Link></li>
                <li><Link href="/dns-analysis" className="hover:text-matrix-400 transition-colors">DNS Records Hub</Link></li>
                <li><Link href="/technology" className="hover:text-matrix-400 transition-colors">Technology Detection</Link></li>
                <li><Link href="/vulnerability" className="hover:text-matrix-400 transition-colors">Vulnerability DB</Link></li>
                <li><Link href="/subdomains" className="hover:text-matrix-400 transition-colors">Subdomains Hub</Link></li>
              </ul>
            </div>
          </div>

          <div className={`pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-6 ${theme === 'dark' ? 'border-white/[0.04]' : 'border-gray-100'}`}>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-6">
                <p className="text-[11px] font-mono">© 2026 RECONSHIELD INTELLIGENCE</p>
                <div className="flex items-center gap-2 px-3 py-1 bg-surface-900/40 rounded-full border border-white/[0.03]">
                  <div className="w-1.5 h-1.5 rounded-full bg-matrix-400 animate-pulse" />
                  <span className="text-[10px] font-mono text-matrix-400 uppercase tracking-tighter">System Live</span>
                </div>
              </div>
              {/* Social Row */}
              <div className="flex items-center gap-3">
                <a href="https://github.com/nsurendrareddy" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className="text-[#94a3b8] hover:text-matrix-400 transition-colors">
                  <Globe className="w-4 h-4" aria-hidden="true" />
                </a>
                <a href="https://linkedin.com/in/surendrareddy3" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className="text-[#94a3b8] hover:text-matrix-400 transition-colors">
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-amber-500/5 border border-amber-500/10 rounded-xl">
              <Lock className="w-3.5 h-3.5 text-amber-500/60" aria-hidden="true" />
              <p className="text-[11px] text-amber-500/80 font-mono italic">
                AUTHORIZED DEFENSIVE SECURITY USE ONLY
              </p>
            </div>
          </div>
        </div>
      </footer>
      <CookieBanner />
      <LazyAdSense />
      <MobileStickyAd />
    </div>
  )
}