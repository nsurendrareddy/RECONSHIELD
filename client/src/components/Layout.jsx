'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Shield, History, Terminal, Sun, Moon, Activity, AlertTriangle, Lock, Globe, Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Layout({ children }) {
  const pathname = usePathname()
  const [theme, setTheme] = useState('dark')
  const [showBanner, setShowBanner] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('reconshield-theme') || 'dark'
    setTheme(savedTheme)
    document.documentElement.classList.toggle('light', savedTheme === 'light')
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('reconshield-theme', newTheme)
    document.documentElement.classList.toggle('light', newTheme === 'light')
  }

  const navItems = [
    { path: '/', label: 'Scanner', icon: Terminal },
    { path: '/ip-scanner', label: 'IP Intel', icon: Globe },
    { path: '/blog', label: 'Blog' },
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
            <button onClick={() => setShowBanner(false)} className="ml-auto p-1 hover:bg-amber-500/10 rounded transition-colors">
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
      {!isBlogPage && (
        <header className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-all duration-300 ${theme === 'dark'
            ? 'bg-surface-950/80 border-white/[0.04]'
            : 'bg-white/80 border-gray-200'
          }`}>
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
  
              {/* Logo */}
              <Link href="/" className="flex items-center gap-3 group">
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
                  <h1 className="font-display text-lg font-bold tracking-wider">
                    <span className={`${theme === 'dark' ? 'text-glow-green text-matrix-400' : 'text-matrix-600'}`}>RECON</span>
                    <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>SHIELD</span>
                  </h1>
                  <div className="flex items-center gap-1.5 -mt-0.5">
                    <Activity className={`w-2.5 h-2.5 ${theme === 'dark' ? 'text-matrix-400/60' : 'text-matrix-600/60'}`} />
                    <p className={`text-[9px] tracking-[0.25em] uppercase font-mono ${theme === 'dark' ? 'text-matrix-400/60' : 'text-matrix-600/60'}`}>Cyber Intelligence</p>
                  </div>
                </div>
              </Link>
  
              {/* Nav - Desktop + Controls */}
              <div className="flex items-center gap-2 sm:gap-6">
                <nav className="hidden md:flex items-center gap-1">
                  {navItems.map(({ path, label, icon: Icon }) => (
                    <Link
                      key={path}
                      href={path}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${pathname === path
                          ? theme === 'dark'
                            ? 'bg-matrix-400/10 text-matrix-400 border border-matrix-400/20'
                            : 'bg-matrix-600/10 text-matrix-600 border border-matrix-600/20'
                          : theme === 'dark'
                            ? 'text-gray-500 hover:text-matrix-400 hover:bg-white/[0.02]'
                            : 'text-gray-600 hover:text-matrix-600 hover:bg-gray-100'
                        }`}
                    >
                      {Icon && <Icon className="w-4 h-4" />}
                      <span>{label}</span>
                    </Link>
                  ))}
                </nav>
  
                {/* Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className={`p-2 rounded-lg transition-all ${theme === 'dark'
                      ? 'bg-white/[0.03] text-gray-400 hover:text-white hover:bg-white/[0.08]'
                      : 'bg-gray-100 text-gray-500 hover:text-gray-900 hover:bg-gray-200'
                    }`}
                  aria-label="Toggle Theme"
                >
                  {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
  
                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className={`md:hidden p-2 rounded-lg transition-all ${theme === 'dark'
                      ? 'bg-matrix-400/10 text-matrix-400'
                      : 'bg-matrix-600/10 text-matrix-600'
                    }`}
                  aria-label="Toggle Menu"
                >
                  {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
              {/* END: flex items-center gap-2 sm:gap-6 */}
  
            </div>
            {/* END: flex items-center justify-between h-16 */}
  
            {/* Mobile Navigation Overlay — inside max-w container */}
            {isMenuOpen && (
              <div className={`md:hidden fixed inset-0 top-16 z-40 transition-all duration-300 ${theme === 'dark' ? 'bg-surface-950/95' : 'bg-white/95'
                } backdrop-blur-xl`}>
                <div className="px-6 py-8 space-y-8 animate-fade-in">
                  <nav className="flex flex-col gap-2">
                    {navItems.map(({ path, label, icon: Icon }) => (
                      <Link
                        key={path}
                        href={path}
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center gap-4 p-4 rounded-xl text-base font-medium transition-all ${pathname === path
                            ? theme === 'dark'
                              ? 'bg-matrix-400/10 text-matrix-400 border border-matrix-400/20'
                              : 'bg-matrix-600/10 text-matrix-600 border border-matrix-600/20'
                            : theme === 'dark'
                              ? 'text-gray-400 hover:text-matrix-400 hover:bg-white/[0.02]'
                              : 'text-gray-600 hover:text-matrix-600 hover:bg-gray-100'
                          }`}
                      >
                        {Icon && <Icon className="w-5 h-5" />}
                        <span>{label}</span>
                      </Link>
                    ))}
                  </nav>
                  <div className="pt-8 border-t border-white/[0.06] text-center">
                    <p className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em]">Authorized Intelligence Access Only</p>
                  </div>
                </div>
              </div>
            )}
  
          </div>
          {/* END: max-w-[1440px] */}
        </header>
      )}

      {/* Main Content */}
      <main className={`${isBlogPage ? '' : 'max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8'} min-h-[80vh] relative`}>
        {children}
      </main>

      {/* Footer */}
      {!isBlogPage && (
        <footer className={`border-t mt-16 transition-colors duration-300 ${theme === 'dark'
            ? 'bg-surface-950/80 border-white/[0.04] text-gray-500'
            : 'bg-white border-gray-200 text-gray-600'
          } backdrop-blur-md`}>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Shield className={`w-5 h-5 ${theme === 'dark' ? 'text-matrix-400' : 'text-matrix-600'}`} />
                <span className={`font-display font-bold tracking-wider ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>RECONSHIELD</span>
              </div>
              <p className="text-sm leading-relaxed max-w-sm">
                Advanced educational reconnaissance and intelligence platform. Empowers security researchers with visibility into their attack surface through passive data collection.
              </p>
            </div>
            <div>
              <h4 className={`text-xs font-mono font-bold uppercase tracking-widest mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Platform</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/" className="hover:text-matrix-400 transition-colors">Security Scanner</Link></li>
                <li><Link href="/blog" className="hover:text-matrix-400 transition-colors">Security Blog</Link></li>
                <li><Link href="/about" className="hover:text-matrix-400 transition-colors">About Research</Link></li>
              </ul>
            </div>
            <div>
              <h4 className={`text-xs font-mono font-bold uppercase tracking-widest mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/terms" className="hover:text-matrix-400 transition-colors">Terms of Use</Link></li>
                <li><Link href="/privacy" className="hover:text-matrix-400 transition-colors">Privacy Policy</Link></li>
                <li><Link href="/contact" className="hover:text-matrix-400 transition-colors">Contact Support</Link></li>
              </ul>
            </div>
          </div>

          <div className={`pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-6 ${theme === 'dark' ? 'border-white/[0.04]' : 'border-gray-100'}`}>
            <div className="flex items-center gap-6">
              <p className="text-[11px] font-mono">© 2026 RECONSHIELD INTELLIGENCE</p>
              <div className="flex items-center gap-2 px-3 py-1 bg-surface-900/40 rounded-full border border-white/[0.03]">
                <div className="w-1.5 h-1.5 rounded-full bg-matrix-400 animate-pulse" />
                <span className="text-[10px] font-mono text-matrix-400 uppercase tracking-tighter">System Live</span>
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-amber-500/5 border border-amber-500/10 rounded-xl">
              <Lock className="w-3.5 h-3.5 text-amber-500/60" />
              <p className="text-[11px] text-amber-500/80 font-mono italic">
                AUTHORIZED RESEARCH ONLY — Ethical hackers only.
              </p>
            </div>
          </div>
        </div>
      </footer>
      )}
    </div>
  )
}