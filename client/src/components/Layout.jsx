'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Shield, History, Terminal, Sun, Moon, Activity, AlertTriangle, Lock, Globe, Menu, X, ExternalLink } from 'lucide-react'
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Ad728x90 from '@/components/ads/Ad728x90'

const NewsletterForm = dynamic(() => import('@/components/NewsletterForm'), { ssr: false })
const CookieBanner = dynamic(() => import('@/components/CookieBanner'), { ssr: false })
const SocialBar = dynamic(() => import("@/components/ads/SocialBar"), { ssr: false });
const Popunder = dynamic(() => import("@/components/ads/Popunder"), { ssr: false });
const LazyAdSense = dynamic(() => import("@/components/ads/LazyAdSense"), { ssr: false });

export default function Layout({ children }) {
  const pathname = usePathname()
  const [theme, setTheme] = useState('dark')
  const [showBanner, setShowBanner] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/scanner', label: 'Scanner', isNew: true },
    { path: '/blog', label: 'Intel Feed' },
    { path: '/tools', label: 'Security Tools' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ]

  const isBlogPage = pathname?.startsWith('/blog')

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-surface-950 text-white' : 'bg-gray-50 text-gray-900'} ${!isBlogPage ? 'bg-grid' : ''}`}>
      {/* Ethical Disclaimer Banner */}
      {showBanner && !isBlogPage && (
        <div className="bg-amber-500/10 border-b border-amber-500/20 py-2 relative overflow-hidden group">
          <div className="max-w-[1440px] mx-auto px-4 flex items-center justify-center gap-4 text-[11px] md:text-xs font-mono text-amber-500 font-medium">
            <div className="flex items-center gap-1.5 shrink-0">
              <AlertTriangle className="w-3.5 h-3.5 animate-pulse" />
              <span className="uppercase tracking-wider">Legal Disclaimer:</span>
            </div>
            <p className="opacity-80">This platform is for authorized security research and educational purposes ONLY. Scanning assets without explicit permission is illegal.</p>
            <button onClick={() => setShowBanner(false)} aria-label="Dismiss notification" className="ml-auto p-1 hover:bg-amber-500/10 rounded transition-colors">
              <X className="w-3.5 h-3.5" />
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

      {/* Header */}
      <header className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-all duration-300 ${theme === 'dark'
          ? 'bg-surface-950/80 border-white/[0.04]'
          : 'bg-white/80 border-gray-200'
        }`}>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/" aria-label="ReconShield home" className="flex items-center gap-3 group">
              <div className="relative">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${theme === 'dark'
                    ? 'bg-matrix-400/10 border border-matrix-400/20 group-hover:border-matrix-400/40'
                    : 'bg-matrix-600/10 border border-matrix-600/20 group-hover:border-matrix-600/40'
                  }`}>
                  <Shield className={`w-5 h-5 ${theme === 'dark' ? 'text-matrix-400' : 'text-matrix-600'}`} />
                </div>
                <div className={`absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full animate-pulse ${theme === 'dark' ? 'bg-matrix-400' : 'bg-matrix-600'}`} />
              </div>
              <div className="hidden xs:block">
                <span className="font-display text-lg font-bold tracking-wider">
                  <span className={`${theme === 'dark' ? 'text-glow-green text-matrix-400' : 'text-matrix-600'}`}>analysis</span>
                  <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>SHIELD</span>
                </span>
                <div className="flex items-center gap-1.5 -mt-0.5">
                  <Activity className={`w-2.5 h-2.5 ${theme === 'dark' ? 'text-matrix-400/60' : 'text-matrix-600/60'}`} />
                  <p className={`text-[9px] tracking-[0.25em] uppercase font-mono ${theme === 'dark' ? 'text-matrix-400/60' : 'text-matrix-600/60'}`}>Cyber Intelligence</p>
                </div>
              </div>
            </Link>

            {/* Nav - Desktop + Controls */}
            <div className="flex items-center gap-2 sm:gap-6">
              <nav className="hidden md:flex items-center gap-1">
                {navItems.map(({ path, label, icon: Icon, isNew }) => (
                  <Link
                    key={path}
                    href={path}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative ${pathname === path
                        ? 'bg-matrix-400/10 text-matrix-400 border border-matrix-400/20'
                        : 'text-gray-400 hover:text-matrix-400 hover:bg-white/[0.02]'
                      }`}
                  >
                    {Icon && <Icon className="w-4 h-4" />}
                    <span>{label}</span>
                    {isNew && (
                      <span className="ml-1 text-[9px] font-mono font-bold text-cyber-400 bg-cyber-500/10 border border-cyber-400/30 px-1.5 py-0.5 rounded leading-none animate-pulse shadow-[0_0_10px_rgba(0,229,255,0.2)]">
                        NEW
                      </span>
                    )}
                  </Link>
                ))}
              </nav>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg transition-all bg-matrix-400/10 text-matrix-400"
                aria-label="Toggle Menu"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
            {/* END: flex items-center gap-2 sm:gap-6 */}

          </div>
          {/* END: flex items-center justify-between h-16 */}
        </div>
        {/* END: max-w-[1440px] */}
      </header>

      {/* Mobile Navigation Drawer */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[100] bg-surface-950/95 backdrop-blur-2xl transition-transform duration-300 ease-in-out">
          <div className="flex flex-col h-[100dvh] w-full">
            {/* Top Section */}
            <div className="flex items-center justify-between px-6 h-16 border-b border-white/10 shrink-0">
              <Link href="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-matrix-400/10 border border-matrix-400/20">
                  <Shield className="w-5 h-5 text-matrix-400" />
                </div>
                <div>
                  <span className="font-display text-lg font-bold tracking-wider">
                    <span className="text-matrix-400">analysis</span><span className="text-white">SHIELD</span>
                  </span>
                </div>
              </Link>
              <button onClick={() => setIsMenuOpen(false)} className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-gray-400 hover:text-white transition-colors" aria-label="Close menu">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Main Navigation */}
            <div className="flex-1 overflow-y-auto py-8 px-6">
              <nav className="flex flex-col gap-6">
                {navItems.map(({ path, label, icon: Icon, isNew }) => (
                  <Link
                    key={path}
                    href={path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-4 py-2 text-xl font-medium transition-colors min-h-[44px] ${pathname === path ? 'text-matrix-400' : 'text-gray-300 hover:text-white'}`}
                  >
                    {Icon ? <Icon className="w-6 h-6" /> : <div className="w-6 h-6" />}
                    <span>{label}</span>
                    {isNew && (
                      <span className="ml-1 text-xs font-mono font-bold text-cyber-400 bg-cyber-500/10 border border-cyber-400/30 px-2 py-0.5 rounded leading-none animate-pulse shadow-[0_0_10px_rgba(0,229,255,0.2)]">
                        NEW
                      </span>
                    )}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Bottom Section */}
            <div className="p-6 border-t border-white/10 bg-surface-900/50 shrink-0">
              <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm text-gray-400 font-medium">
                <Link href="/disclaimer" onClick={() => setIsMenuOpen(false)} className="hover:text-white transition-colors min-h-[44px] flex items-center">Disclaimer</Link>
                <Link href="/privacy" onClick={() => setIsMenuOpen(false)} className="hover:text-white transition-colors min-h-[44px] flex items-center">Privacy Policy</Link>
                <Link href="/editorial-policy" onClick={() => setIsMenuOpen(false)} className="hover:text-white transition-colors min-h-[44px] flex items-center">Editorial Policy</Link>
                <Link href="/terms" onClick={() => setIsMenuOpen(false)} className="hover:text-white transition-colors min-h-[44px] flex items-center">Authorized Use</Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className={`${isBlogPage ? '' : 'max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8'} min-h-[80vh] relative`}>
        <Ad728x90 key={pathname} />
        {children}
      </main>

      <footer className={`border-t mt-16 transition-colors duration-300 ${theme === 'dark'
          ? 'bg-surface-950/80 border-white/[0.04] text-gray-400'
          : 'bg-white border-gray-200 text-gray-600'
        } backdrop-blur-md`}>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-8 md:gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Shield className={`w-5 h-5 ${theme === 'dark' ? 'text-matrix-400' : 'text-matrix-600'}`} />
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
      <LazyAdSense />
      <SocialBar />
      <Popunder />
    </div>
  )
}