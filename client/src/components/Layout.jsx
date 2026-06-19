'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Shield, Activity, AlertTriangle, Lock, Globe, Menu, X, ExternalLink,
  ChevronDown, Server, Cpu, Database, Network, Layers, Mail,
  GraduationCap, BookOpen, Code, FileText, Users, FileCode, Search,
  ArrowRight
} from 'lucide-react'

const NewsletterForm = dynamic(() => import('@/components/NewsletterForm'), { ssr: false })
const CookieBanner = dynamic(() => import('@/components/CookieBanner'), { ssr: false })

export default function Layout({ children }) {
  const pathname = usePathname()
  
  const [theme, setTheme] = useState('dark')
  const [showBanner, setShowBanner] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState(null)
  const [expandedMobileMenus, setExpandedMobileMenus] = useState({})

  const closeTimeoutRef = useRef(null)

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  useEffect(() => {
    // Keep the site permanently optimized for the dark cybersecurity theme
    setTheme('dark')
    document.documentElement.classList.remove('light')
    localStorage.setItem('reconshield-theme', 'dark')
  }, [])

  // Close menus on clicking outside or pressing Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveMenu(null)
        setIsMenuOpen(false)
      }
    }

    const handleClickOutside = (e) => {
      if (!e.target.closest('.has-dropdown') && !e.target.closest('.mega-menu-container')) {
        setActiveMenu(null)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleMouseEnter = (menuName) => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)
    setActiveMenu(menuName)
  }

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null)
    }, 150)
  }

  const toggleMobileMenu = (menuName) => {
    setExpandedMobileMenus(prev => ({
      ...prev,
      [menuName]: !prev[menuName]
    }))
  }

  const handleLinkClick = () => {
    setActiveMenu(null)
    setIsMenuOpen(false)
  }

  const isBlogPage = pathname?.startsWith('/blog')

  // Menu contents configurations
  const renderMenuContent = () => {
    switch (activeMenu) {
      case 'scanners':
        return (
          <div className="grid grid-cols-4 gap-8">
            <div>
              <h4 className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-4">// Domain Security</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/tools/ssl-checker" onClick={handleLinkClick} className="text-xs text-gray-400 hover:text-matrix-400 transition-colors font-medium">SSL Checker</Link>
                </li>
                <li>
                  <Link href="/tools/whois" onClick={handleLinkClick} className="text-xs text-gray-400 hover:text-matrix-400 transition-colors font-medium">WHOIS Lookup</Link>
                </li>
                <li>
                  <Link href="/tools/dns-lookup" onClick={handleLinkClick} className="text-xs text-gray-400 hover:text-matrix-400 transition-colors font-medium">DNS Lookup</Link>
                </li>
                <li>
                  <Link href="/tools/http-headers" onClick={handleLinkClick} className="text-xs text-gray-400 hover:text-matrix-400 transition-colors font-medium">Header Analyzer</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-4">// Network Intelligence</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/tools/port-scanner" onClick={handleLinkClick} className="text-xs text-gray-400 hover:text-matrix-400 transition-colors font-medium">Port Scanner</Link>
                </li>
                <li>
                  <Link href="/tools/ip-lookup" onClick={handleLinkClick} className="text-xs text-gray-400 hover:text-matrix-400 transition-colors font-medium">IP Lookup</Link>
                </li>
                <li>
                  <Link href="/asn" onClick={handleLinkClick} className="text-xs text-gray-400 hover:text-matrix-400 transition-colors font-medium">ASN Lookup</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-4">// Web Security</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/tools/tech-detector" onClick={handleLinkClick} className="text-xs text-gray-400 hover:text-matrix-400 transition-colors font-medium">Technology Detector</Link>
                </li>
                <li>
                  <Link href="/tools/http-headers" onClick={handleLinkClick} className="text-xs text-gray-400 hover:text-matrix-400 transition-colors font-medium">Security Headers</Link>
                </li>
                <li>
                  <Link href="/tools/tech-detector" onClick={handleLinkClick} className="text-xs text-gray-400 hover:text-matrix-400 transition-colors font-medium">Website Fingerprinting</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-4">// Vulnerability Intel</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/cve" onClick={handleLinkClick} className="text-xs text-gray-400 hover:text-matrix-400 transition-colors font-medium">CVE Search</Link>
                </li>
                <li>
                  <Link href="/vulnerability" onClick={handleLinkClick} className="text-xs text-gray-400 hover:text-matrix-400 transition-colors font-medium">Vulnerability DB</Link>
                </li>
                <li>
                  <Link href="/tools/ip-lookup" onClick={handleLinkClick} className="text-xs text-gray-400 hover:text-matrix-400 transition-colors font-medium">Threat Intelligence</Link>
                </li>
              </ul>
            </div>
          </div>
        )
      case 'tools':
        const toolsData = {
          Reconnaissance: [
            { name: 'Subdomain Finder', stat: '12.4K', desc: 'Find active subdomains list', path: '/tools/subdomain-finder', icon: Server },
            { name: 'WHOIS Lookup', stat: '9.8K', desc: 'Domain owner registration info', path: '/tools/whois', icon: Search },
            { name: 'DNS Lookup', stat: '15.1K', desc: 'Resolve full target name records', path: '/tools/dns-lookup', icon: Network }
          ],
          Intelligence: [
            { name: 'IP Lookup', stat: '22.3K', desc: 'Assess IP reputation & location', path: '/tools/ip-lookup', icon: Globe },
            { name: 'ASN Directory', stat: '7.6K', desc: 'Map autonomous routes & routing', path: '/asn', icon: Layers }
          ],
          'Network Analysis': [
            { name: 'Port Scanner', stat: '34.2K', desc: 'List exposed system server ports', path: '/tools/port-scanner', icon: Activity }
          ],
          'Web Security': [
            { name: 'Technology Detector', stat: '18.5K', desc: 'Web stack and component audit', path: '/tools/tech-detector', icon: Cpu },
            { name: 'Header Analyzer', stat: '11.2K', desc: 'Check CSP and security headers', path: '/tools/http-headers', icon: Shield },
            { name: 'SSL Checker', stat: '28.4K', desc: 'Validate TLS handshake strength', path: '/tools/ssl-checker', icon: Lock }
          ],
          'AI Security': [
            { name: 'Vulnerability Database', stat: '14.7K', desc: 'Search CVE intelligence directory', path: '/tools/vulnerability-scanner', icon: Database }
          ],
          Utilities: [
            { name: 'Email Security', stat: '8.9K', desc: 'Audit SPF, DKIM, DMARC config', path: '/tools/email-security', icon: Mail }
          ]
        }
        return (
          <div className="grid grid-cols-3 gap-x-8 gap-y-6">
            {Object.entries(toolsData).map(([category, items]) => (
              <div key={category} className="space-y-3">
                <h4 className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest pb-1 border-b border-white/5">// {category}</h4>
                <div className="flex flex-col gap-2">
                  {items.map((item) => {
                    const IconComp = item.icon
                    return (
                      <Link
                        key={item.name}
                        href={item.path}
                        onClick={handleLinkClick}
                        className="group flex items-start gap-2.5 p-1 rounded-lg hover:bg-white/[0.02] transition-colors"
                      >
                        <div className="w-7 h-7 rounded-md flex items-center justify-center bg-matrix-400/5 border border-matrix-400/10 text-matrix-400 group-hover:border-matrix-400/30 group-hover:bg-matrix-400/10 transition-all shrink-0">
                          <IconComp className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white group-hover:text-matrix-400 transition-colors uppercase">
                              {item.name}
                            </span>
                            <span className="text-[8px] font-mono text-matrix-400 bg-matrix-400/5 border border-matrix-400/20 px-1 rounded-sm">
                              {item.stat}
                            </span>
                          </div>
                          <p className="text-[10px] text-gray-500 mt-0.5 leading-tight">{item.desc}</p>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )
      case 'platform':
        const platformCards = [
          { name: 'Academic Labs', desc: 'Cybersecurity learning resources', path: '/academic', icon: GraduationCap },
          { name: 'Resources Library', desc: 'Guides, checklists, reports', path: '/resources', icon: BookOpen },
          { name: 'Open Source Projects', desc: 'GitHub repositories', path: '/opensource', icon: Code },
          { name: 'Cybersecurity Glossary', desc: 'Terms definitions resource', path: '/glossary', icon: FileText },
          { name: 'Threat Reports', desc: 'Quarterly OSINT threat reviews', path: '/reports', icon: Shield },
          { name: 'API Access', desc: 'Developers threat intelligence endpoints', path: '#', icon: Network, isFuture: true },
          { name: 'Community Resources', desc: 'Security community forums', path: '#', icon: Users },
          { name: 'Research Papers', desc: 'Technical security research briefs', path: '/research', icon: FileCode },
          { name: 'Security Learning Center', desc: 'Vulnerability remediation tutorials', path: '#', icon: GraduationCap }
        ]
        return (
          <div className="grid grid-cols-3 gap-4">
            {platformCards.map((card) => {
              const IconComp = card.icon
              return (
                <Link
                  key={card.name}
                  href={card.path}
                  onClick={card.isFuture ? (e) => e.preventDefault() : handleLinkClick}
                  className={`group flex items-start gap-3.5 p-3.5 rounded-xl border border-white/5 bg-surface-900/40 hover:border-matrix-400/20 hover:bg-surface-900/60 transition-all ${card.isFuture ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-matrix-400/5 border border-matrix-400/10 text-matrix-400 group-hover:bg-matrix-400/10 transition-all shrink-0">
                    <IconComp className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white group-hover:text-matrix-400 transition-colors uppercase">
                        {card.name}
                      </span>
                      {card.isFuture && (
                        <span className="text-[7px] font-mono font-bold text-gray-500 bg-surface-950 border border-white/5 px-1 py-0.2 rounded-sm uppercase tracking-wide">
                          Future
                        </span>
                      )}
                    </div>
                    <p className="text-[10.5px] text-gray-400 mt-1 leading-snug">{card.desc}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        )
      case 'entityIntel':
        const intelCol1 = [
          { name: 'Ports Directory', desc: 'Index of standard service ports configuration', path: '/ports' },
          { name: 'IP Intelligence Hub', desc: 'Active IP ranges vulnerability telemetry', path: '/ip-intelligence' },
          { name: 'DNS Records Hub', desc: 'Central lookup trace records history', path: '/dns-analysis' },
          { name: 'Vulnerability Database', desc: 'Active list of zero-day vulnerabilities & CVEs', path: '/vulnerability' },
          { name: 'Threat Actors (Future)', desc: 'Profiles of threat actor groups & TTPs', path: '#', isFuture: true },
          { name: 'Exploit Intelligence (Future)', desc: 'Correlated exploit indices with remediation paths', path: '#', isFuture: true }
        ]
        const intelCol2 = [
          { name: 'ASN Directory', desc: 'Catalog of registered network routing spaces', path: '/asn' },
          { name: 'SSL Analysis Hub', desc: 'TLS certifications index & vulnerability analysis', path: '/ssl' },
          { name: 'Technology Detection Hub', desc: 'Indexed list of detected frameworks online', path: '/technology' },
          { name: 'Subdomains Intelligence Hub', desc: 'Public DNS subdomain record mappings', path: '/subdomains' },
          { name: 'Malware Families (Future)', desc: 'Analysis reports on emerging malware strains', path: '#', isFuture: true }
        ]
        return (
          <div className="grid grid-cols-2 gap-x-12 gap-y-6">
            <div className="space-y-4">
              {intelCol1.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  onClick={item.isFuture ? (e) => e.preventDefault() : handleLinkClick}
                  className={`group block p-1.5 rounded-lg hover:bg-white/[0.01] transition-colors ${item.isFuture ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <span className="text-xs font-bold text-white uppercase group-hover:text-matrix-400 transition-colors">
                    {item.name}
                  </span>
                  <p className="text-[10px] text-gray-500 mt-0.5 leading-snug">{item.desc}</p>
                </Link>
              ))}
            </div>
            <div className="space-y-4">
              {intelCol2.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  onClick={item.isFuture ? (e) => e.preventDefault() : handleLinkClick}
                  className={`group block p-1.5 rounded-lg hover:bg-white/[0.01] transition-colors ${item.isFuture ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <span className="text-xs font-bold text-white uppercase group-hover:text-matrix-400 transition-colors">
                    {item.name}
                  </span>
                  <p className="text-[10px] text-gray-500 mt-0.5 leading-snug">{item.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        )
      default:
        return null
    }
  }

  const renderMenuFooter = () => {
    switch (activeMenu) {
      case 'scanners':
        return (
          <div className="pt-4 mt-6 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-gray-500">
            <span className="uppercase tracking-widest opacity-60">Passive Real-Time Discovery Engine</span>
            <Link href="/scanner" onClick={handleLinkClick} className="text-matrix-400 hover:text-white transition-colors font-bold uppercase tracking-wider flex items-center gap-1">
              Explore All Security Scanners <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        )
      case 'entityIntel':
        return (
          <div className="pt-4 mt-6 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-gray-500">
            <span className="uppercase tracking-widest opacity-60">Search Engine Optimized Directory Structure</span>
            <span className="text-matrix-400 font-bold uppercase tracking-wider">Monitored Securely</span>
          </div>
        )
      case 'tools':
        return (
          <div className="pt-4 mt-6 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-gray-500">
            <span className="uppercase tracking-widest opacity-60">Passive Cybersecurity Suite</span>
            <span className="text-matrix-400 font-bold uppercase tracking-wider">Passive Auditing Enabled</span>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 bg-surface-950 text-white ${!isBlogPage ? 'bg-grid' : ''}`}>
      
      {/* 36px Legal Disclaimer Warning Strip */}
      {showBanner && (
        <div className="h-[36px] bg-[#0a0c0f] border-b border-white/[0.03] relative overflow-hidden flex items-center z-[60]">
          <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono text-amber-500 font-medium truncate">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
              <span>
                <strong>LEGAL DISCLAIMER:</strong> This platform is for authorized security research and educational purposes only. Scanning assets without permission is illegal.
              </span>
            </div>
            <button
              onClick={() => setShowBanner(false)}
              aria-label="Dismiss warning"
              className="p-1 hover:bg-white/5 rounded transition-colors text-amber-500/80 hover:text-amber-500"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Ambient background orbs */}
      {!isBlogPage && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          <div className="absolute -top-48 -right-48 w-[500px] h-[500px] rounded-full blur-[120px] bg-matrix-400/[0.03]" />
          <div className="absolute -bottom-48 -left-48 w-[500px] h-[500px] rounded-full blur-[120px] bg-neon-500/[0.02]" />
        </div>
      )}

      {/* Header / Main Navbar */}
      <header className="sticky top-0 z-50 border-b backdrop-blur-xl bg-surface-950/80 border-white/[0.04]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center justify-between h-16">

            {/* Left: ReconShield logo + Shield icon */}
            <Link href="/" aria-label="ReconShield home" className="flex items-center gap-3 group shrink-0">
              <div className="relative">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-matrix-400/10 border border-matrix-400/20 group-hover:border-matrix-400/40 transition-all shadow-[0_0_12px_rgba(0,255,156,0.1)]">
                  <Shield className="w-4.5 h-4.5 text-matrix-400" />
                </div>
                <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full animate-pulse bg-matrix-400 shadow-[0_0_8px_rgba(0,255,156,0.8)]" />
              </div>
              <div className="hidden xs:block">
                <span className="font-display text-base font-bold tracking-wider uppercase">
                  <span className="text-matrix-400">Recon</span>
                  <span className="text-white">Shield</span>
                </span>
                <div className="flex items-center gap-1.5 -mt-0.5">
                  <Activity className="w-2.5 h-2.5 text-matrix-400/60" />
                  <p className="text-[8px] tracking-[0.25em] uppercase font-mono text-matrix-400/60">Cyber Intelligence</p>
                </div>
              </div>
            </Link>

            {/* Center menu */}
            <nav className="hidden lg:flex items-center gap-1 mx-4">
              <Link
                href="/"
                onClick={handleLinkClick}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${pathname === '/' ? 'text-matrix-400 bg-white/[0.02]' : 'text-gray-400 hover:text-matrix-400 hover:bg-white/[0.01]'}`}
              >
                Home
              </Link>
              
              {/* Scanners Menu Button */}
              <button
                onMouseEnter={() => handleMouseEnter('scanners')}
                onMouseLeave={handleMouseLeave}
                aria-haspopup="true"
                aria-expanded={activeMenu === 'scanners'}
                className={`has-dropdown flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${activeMenu === 'scanners' ? 'text-matrix-400 bg-white/[0.02]' : 'text-gray-400 hover:text-matrix-400 hover:bg-white/[0.01]'}`}
              >
                <span>Scanners</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMenu === 'scanners' ? 'rotate-180 text-matrix-400' : ''}`} />
              </button>

              <Link
                href="/blog"
                onClick={handleLinkClick}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${pathname?.startsWith('/blog') ? 'text-matrix-400 bg-white/[0.02]' : 'text-gray-400 hover:text-matrix-400 hover:bg-white/[0.01]'}`}
              >
                Blog
              </Link>

              {/* Tools Menu Button */}
              <button
                onMouseEnter={() => handleMouseEnter('tools')}
                onMouseLeave={handleMouseLeave}
                aria-haspopup="true"
                aria-expanded={activeMenu === 'tools'}
                className={`has-dropdown flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${activeMenu === 'tools' ? 'text-matrix-400 bg-white/[0.02]' : 'text-gray-400 hover:text-matrix-400 hover:bg-white/[0.01]'}`}
              >
                <span>Tools</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMenu === 'tools' ? 'rotate-180 text-matrix-400' : ''}`} />
              </button>

              {/* Platform Menu Button */}
              <button
                onMouseEnter={() => handleMouseEnter('platform')}
                onMouseLeave={handleMouseLeave}
                aria-haspopup="true"
                aria-expanded={activeMenu === 'platform'}
                className={`has-dropdown flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${activeMenu === 'platform' ? 'text-matrix-400 bg-white/[0.02]' : 'text-gray-400 hover:text-matrix-400 hover:bg-white/[0.01]'}`}
              >
                <span>Platform</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMenu === 'platform' ? 'rotate-180 text-matrix-400' : ''}`} />
              </button>

              {/* Entity Intel Menu Button */}
              <button
                onMouseEnter={() => handleMouseEnter('entityIntel')}
                onMouseLeave={handleMouseLeave}
                aria-haspopup="true"
                aria-expanded={activeMenu === 'entityIntel'}
                className={`has-dropdown flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${activeMenu === 'entityIntel' ? 'text-matrix-400 bg-white/[0.02]' : 'text-gray-400 hover:text-matrix-400 hover:bg-white/[0.01]'}`}
              >
                <span>Entity Intel</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMenu === 'entityIntel' ? 'rotate-180 text-matrix-400' : ''}`} />
              </button>

              <Link
                href="/about"
                onClick={handleLinkClick}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${pathname === '/about' ? 'text-matrix-400 bg-white/[0.02]' : 'text-gray-400 hover:text-matrix-400 hover:bg-white/[0.01]'}`}
              >
                About
              </Link>
            </nav>

            {/* Right Side: Start Scanning & Explore Intelligence buttons */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              <Link
                href="/scanner"
                className="bg-matrix-400 hover:bg-matrix-300 text-black text-xs font-mono font-bold uppercase tracking-wider px-5 py-2.5 rounded-full hover:shadow-[0_0_20px_rgba(0,255,156,0.5)] transition-all duration-300 active:scale-95"
              >
                Start Scanning
              </Link>
              <Link
                href="/tools/ip-lookup"
                className="border border-white/10 hover:border-matrix-400 hover:text-matrix-400 text-gray-300 text-xs font-mono font-bold uppercase tracking-wider px-5 py-2.5 rounded-full hover:shadow-[0_0_15px_rgba(0,255,156,0.2)] transition-all duration-300 active:scale-95"
              >
                Explore Intelligence
              </Link>
            </div>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg transition-all bg-matrix-400/10 text-matrix-400 hover:bg-matrix-400/20 shrink-0"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

          {/* Desktop Mega Menu Overlay */}
          <AnimatePresence>
            {activeMenu && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                onMouseEnter={() => handleMouseEnter(activeMenu)}
                onMouseLeave={handleMouseLeave}
                className="mega-menu-container absolute top-16 left-0 right-0 bg-[#0a0c10]/95 border border-white/5 rounded-2xl p-6 shadow-[0_25px_60px_rgba(0,0,0,0.85)] backdrop-blur-xl z-50 overflow-hidden"
              >
                {/* subtle green background glow */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-matrix-400/[0.015] blur-[100px] rounded-full pointer-events-none -z-10" />
                
                {renderMenuContent()}
                
                {renderMenuFooter()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Mobile Drawer (Accordion style) */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[100] bg-surface-950/98 backdrop-blur-2xl transition-transform duration-300 ease-in-out">
          <div className="flex flex-col h-[100dvh] w-full">
            
            {/* Mobile Header */}
            <div className="flex items-center justify-between px-6 h-16 border-b border-white/10 shrink-0">
              <Link href="/" onClick={handleLinkClick} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-matrix-400/10 border border-matrix-400/20">
                  <Shield className="w-4.5 h-4.5 text-matrix-400" />
                </div>
                <span className="font-display text-base font-bold tracking-wider uppercase">
                  <span className="text-matrix-400">Recon</span><span className="text-white">Shield</span>
                </span>
              </Link>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Scroll Area */}
            <div className="flex-1 overflow-y-auto py-6 px-6 space-y-4">
              
              <Link
                href="/"
                onClick={handleLinkClick}
                className={`block py-2.5 text-lg font-medium border-b border-white/5 ${pathname === '/' ? 'text-matrix-400' : 'text-gray-300'}`}
              >
                Home
              </Link>

              {/* Scanners Accordion */}
              <div>
                <button
                  onClick={() => toggleMobileMenu('scanners')}
                  className="flex items-center justify-between w-full py-2.5 text-lg font-medium text-gray-300 border-b border-white/5"
                >
                  <span className={expandedMobileMenus['scanners'] ? 'text-matrix-400' : ''}>Scanners</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expandedMobileMenus['scanners'] ? 'rotate-180 text-matrix-400' : 'text-gray-500'}`} />
                </button>
                {expandedMobileMenus['scanners'] && (
                  <div className="pl-4 py-2 space-y-2 border-l border-white/10 mt-1 flex flex-col">
                    <Link href="/tools/ssl-checker" onClick={handleLinkClick} className="text-sm py-1.5 text-gray-400 hover:text-matrix-400">SSL Checker</Link>
                    <Link href="/tools/whois" onClick={handleLinkClick} className="text-sm py-1.5 text-gray-400 hover:text-matrix-400">WHOIS Lookup</Link>
                    <Link href="/tools/dns-lookup" onClick={handleLinkClick} className="text-sm py-1.5 text-gray-400 hover:text-matrix-400">DNS Lookup</Link>
                    <Link href="/tools/http-headers" onClick={handleLinkClick} className="text-sm py-1.5 text-gray-400 hover:text-matrix-400">Header Analyzer</Link>
                    <Link href="/tools/port-scanner" onClick={handleLinkClick} className="text-sm py-1.5 text-gray-400 hover:text-matrix-400">Port Scanner</Link>
                    <Link href="/tools/ip-lookup" onClick={handleLinkClick} className="text-sm py-1.5 text-gray-400 hover:text-matrix-400">IP Lookup</Link>
                    <Link href="/asn" onClick={handleLinkClick} className="text-sm py-1.5 text-gray-400 hover:text-matrix-400">ASN Lookup</Link>
                    <Link href="/tools/tech-detector" onClick={handleLinkClick} className="text-sm py-1.5 text-gray-400 hover:text-matrix-400">Technology Detector</Link>
                    <Link href="/tools/http-headers" onClick={handleLinkClick} className="text-sm py-1.5 text-gray-400 hover:text-matrix-400">Security Headers</Link>
                    <Link href="/tools/tech-detector" onClick={handleLinkClick} className="text-sm py-1.5 text-gray-400 hover:text-matrix-400">Website Fingerprinting</Link>
                    <Link href="/cve" onClick={handleLinkClick} className="text-sm py-1.5 text-gray-400 hover:text-matrix-400">CVE Search</Link>
                    <Link href="/vulnerability" onClick={handleLinkClick} className="text-sm py-1.5 text-gray-400 hover:text-matrix-400">Vulnerability DB</Link>
                    <Link href="/tools/ip-lookup" onClick={handleLinkClick} className="text-sm py-1.5 text-gray-400 hover:text-matrix-400">Threat Intelligence</Link>
                  </div>
                )}
              </div>

              <Link
                href="/blog"
                onClick={handleLinkClick}
                className={`block py-2.5 text-lg font-medium border-b border-white/5 ${pathname?.startsWith('/blog') ? 'text-matrix-400' : 'text-gray-300'}`}
              >
                Blog
              </Link>

              {/* Tools Accordion */}
              <div>
                <button
                  onClick={() => toggleMobileMenu('tools')}
                  className="flex items-center justify-between w-full py-2.5 text-lg font-medium text-gray-300 border-b border-white/5"
                >
                  <span className={expandedMobileMenus['tools'] ? 'text-matrix-400' : ''}>Tools</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expandedMobileMenus['tools'] ? 'rotate-180 text-matrix-400' : 'text-gray-500'}`} />
                </button>
                {expandedMobileMenus['tools'] && (
                  <div className="pl-4 py-2 space-y-2 border-l border-white/10 mt-1 flex flex-col">
                    <Link href="/tools/subdomain-finder" onClick={handleLinkClick} className="text-sm py-1.5 text-gray-400 hover:text-matrix-400">Subdomain Finder</Link>
                    <Link href="/tools/whois" onClick={handleLinkClick} className="text-sm py-1.5 text-gray-400 hover:text-matrix-400">WHOIS Lookup</Link>
                    <Link href="/tools/dns-lookup" onClick={handleLinkClick} className="text-sm py-1.5 text-gray-400 hover:text-matrix-400">DNS Lookup</Link>
                    <Link href="/tools/ip-lookup" onClick={handleLinkClick} className="text-sm py-1.5 text-gray-400 hover:text-matrix-400">IP Lookup</Link>
                    <Link href="/asn" onClick={handleLinkClick} className="text-sm py-1.5 text-gray-400 hover:text-matrix-400">ASN Directory</Link>
                    <Link href="/tools/port-scanner" onClick={handleLinkClick} className="text-sm py-1.5 text-gray-400 hover:text-matrix-400">Port Scanner</Link>
                    <Link href="/tools/tech-detector" onClick={handleLinkClick} className="text-sm py-1.5 text-gray-400 hover:text-matrix-400">Technology Detector</Link>
                    <Link href="/tools/http-headers" onClick={handleLinkClick} className="text-sm py-1.5 text-gray-400 hover:text-matrix-400">Header Analyzer</Link>
                    <Link href="/tools/ssl-checker" onClick={handleLinkClick} className="text-sm py-1.5 text-gray-400 hover:text-matrix-400">SSL Checker</Link>
                    <Link href="/tools/vulnerability-scanner" onClick={handleLinkClick} className="text-sm py-1.5 text-gray-400 hover:text-matrix-400">Vulnerability Database</Link>
                    <Link href="/tools/email-security" onClick={handleLinkClick} className="text-sm py-1.5 text-gray-400 hover:text-matrix-400">Email Security</Link>
                  </div>
                )}
              </div>

              {/* Platform Accordion */}
              <div>
                <button
                  onClick={() => toggleMobileMenu('platform')}
                  className="flex items-center justify-between w-full py-2.5 text-lg font-medium text-gray-300 border-b border-white/5"
                >
                  <span className={expandedMobileMenus['platform'] ? 'text-matrix-400' : ''}>Platform</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expandedMobileMenus['platform'] ? 'rotate-180 text-matrix-400' : 'text-gray-500'}`} />
                </button>
                {expandedMobileMenus['platform'] && (
                  <div className="pl-4 py-2 space-y-2 border-l border-white/10 mt-1 flex flex-col">
                    <Link href="/academic" onClick={handleLinkClick} className="text-sm py-1.5 text-gray-400 hover:text-matrix-400">Academic Labs</Link>
                    <Link href="/resources" onClick={handleLinkClick} className="text-sm py-1.5 text-gray-400 hover:text-matrix-400">Resources Library</Link>
                    <Link href="/opensource" onClick={handleLinkClick} className="text-sm py-1.5 text-gray-400 hover:text-matrix-400">Open Source Projects</Link>
                    <Link href="/glossary" onClick={handleLinkClick} className="text-sm py-1.5 text-gray-400 hover:text-matrix-400">Cybersecurity Glossary</Link>
                    <Link href="/reports" onClick={handleLinkClick} className="text-sm py-1.5 text-gray-400 hover:text-matrix-400">Threat Reports</Link>
                    <Link href="/research" onClick={handleLinkClick} className="text-sm py-1.5 text-gray-400 hover:text-matrix-400">Research Papers</Link>
                  </div>
                )}
              </div>

              {/* Entity Intel Accordion */}
              <div>
                <button
                  onClick={() => toggleMobileMenu('entityIntel')}
                  className="flex items-center justify-between w-full py-2.5 text-lg font-medium text-gray-300 border-b border-white/5"
                >
                  <span className={expandedMobileMenus['entityIntel'] ? 'text-matrix-400' : ''}>Entity Intel</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expandedMobileMenus['entityIntel'] ? 'rotate-180 text-matrix-400' : 'text-gray-500'}`} />
                </button>
                {expandedMobileMenus['entityIntel'] && (
                  <div className="pl-4 py-2 space-y-2 border-l border-white/10 mt-1 flex flex-col">
                    <Link href="/ports" onClick={handleLinkClick} className="text-sm py-1.5 text-gray-400 hover:text-matrix-400 font-medium uppercase">Ports Directory</Link>
                    <Link href="/asn" onClick={handleLinkClick} className="text-sm py-1.5 text-gray-400 hover:text-matrix-400 font-medium uppercase">ASN Directory</Link>
                    <Link href="/ip-intelligence" onClick={handleLinkClick} className="text-sm py-1.5 text-gray-400 hover:text-matrix-400 font-medium uppercase">IP Intelligence Hub</Link>
                    <Link href="/ssl" onClick={handleLinkClick} className="text-sm py-1.5 text-gray-400 hover:text-matrix-400 font-medium uppercase">SSL Analysis Hub</Link>
                    <Link href="/dns-analysis" onClick={handleLinkClick} className="text-sm py-1.5 text-gray-400 hover:text-matrix-400 font-medium uppercase">DNS Records Hub</Link>
                    <Link href="/technology" onClick={handleLinkClick} className="text-sm py-1.5 text-gray-400 hover:text-matrix-400 font-medium uppercase">Technology Detection Hub</Link>
                    <Link href="/vulnerability" onClick={handleLinkClick} className="text-sm py-1.5 text-gray-400 hover:text-matrix-400 font-medium uppercase">Vulnerability Database</Link>
                    <Link href="/subdomains" onClick={handleLinkClick} className="text-sm py-1.5 text-gray-400 hover:text-matrix-400 font-medium uppercase">Subdomains Intelligence Hub</Link>
                  </div>
                )}
              </div>

              <Link
                href="/about"
                onClick={handleLinkClick}
                className={`block py-2.5 text-lg font-medium border-b border-white/5 ${pathname === '/about' ? 'text-matrix-400' : 'text-gray-300'}`}
              >
                About
              </Link>
            </div>

            {/* Mobile Footer Buttons */}
            <div className="p-6 border-t border-white/10 bg-surface-900/50 flex flex-col gap-3 shrink-0">
              <Link
                href="/scanner"
                onClick={handleLinkClick}
                className="w-full text-center bg-matrix-400 hover:bg-matrix-300 text-black text-sm font-mono font-bold uppercase tracking-wider py-3 rounded-full hover:shadow-[0_0_15px_rgba(0,255,156,0.4)] transition-all"
              >
                Start Scanning
              </Link>
              <Link
                href="/tools/ip-lookup"
                onClick={handleLinkClick}
                className="w-full text-center border border-white/10 hover:border-matrix-400 hover:text-matrix-400 text-gray-300 text-sm font-mono font-bold uppercase tracking-wider py-3 rounded-full hover:shadow-[0_0_12px_rgba(0,255,156,0.15)] transition-all"
              >
                Explore Intelligence
              </Link>
            </div>

          </div>
        </div>
      )}

      {/* Main Content */}
      <main className={`${isBlogPage ? '' : 'max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8'} min-h-[80vh] relative`}>
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t mt-16 transition-colors duration-300 bg-surface-950/80 border-white/[0.04] text-gray-400 backdrop-blur-md">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-8 md:gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-matrix-400" />
                <span className="font-display font-bold tracking-wider text-white">RECONSHIELD</span>
              </div>
              <p className="text-sm leading-relaxed max-w-sm">
                Advanced educational infrastructure visibility and intelligence platform. Empowers security researchers with visibility into their internet-facing assets through passive data collection.
              </p>
            </div>
            
            {/* Newsletter Signup */}
            <div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest mb-4 text-gray-400">// WEEKLY INTEL</h3>
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
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest mb-4 text-gray-400">Platform</h3>
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
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest mb-4 text-gray-400">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/terms" className="hover:text-matrix-400 transition-colors">Terms of Use</Link></li>
                <li><Link href="/privacy" className="hover:text-matrix-400 transition-colors">Privacy Policy</Link></li>
                <li><Link href="/disclaimer" className="hover:text-matrix-400 transition-colors text-amber-500/80 hover:text-amber-500">Legal Disclaimer</Link></li>
                <li><Link href="/editorial-policy" className="hover:text-matrix-400 transition-colors">Editorial Policy</Link></li>
                <li><Link href="/research-methodology" className="hover:text-matrix-400 transition-colors">Research Methodology</Link></li>
                <li><Link href="/security-disclosure" className="hover:text-matrix-400 transition-colors">Security Disclosure</Link></li>
                <li><Link href="/contact" className="hover:text-matrix-400 transition-colors">Contact Support</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest mb-4 text-gray-400">Entity Intel</h3>
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

          <div className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-6 border-white/[0.04]">
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
                  <Globe className="w-4 h-4" />
                </a>
                <a href="https://linkedin.com/in/surendrareddy3" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className="text-[#94a3b8] hover:text-matrix-400 transition-colors">
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-amber-500/5 border border-amber-500/10 rounded-xl">
              <Lock className="w-3.5 h-3.5 text-amber-500/60" />
              <p className="text-[11px] text-amber-500/80 font-mono italic">
                AUTHORIZED DEFENSIVE SECURITY USE ONLY
              </p>
            </div>
          </div>
        </div>
      </footer>
      <CookieBanner />
    </div>
  )
}