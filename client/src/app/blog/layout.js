'use client'
import Link from 'next/link'

export default function BlogLayout({ children }) {
  return (
    <div className="bg-[#0a0c0f] min-h-screen text-white font-sans selection:bg-[#00ff8833] selection:text-[#00ff88]">
      {/* Navbar */}
      <nav className="border-b border-[#1a2332] bg-[#0a0c0f] sticky top-0 z-50">
        <div className="max-w-[1440px] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-[#00ff88]" />
            <div>
              <h1 className="font-mono text-xl font-bold tracking-[3px] uppercase text-white">RECONSHIELD</h1>
              <p className="font-mono text-[10px] text-gray-500 tracking-[3px] uppercase -mt-1">CYBER INTELLIGENCE</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8 font-mono text-xs tracking-[2px] uppercase">
            <Link href="/" className="hover:text-[#00ff88] transition-colors text-gray-400">SCANNER</Link>
            <Link href="/ip-scanner" className="hover:text-[#00ff88] transition-colors text-gray-400">IP INTEL</Link>
            <Link href="/blog" className="text-[#00ff88]">BLOG</Link>
            <Link href="/about" className="hover:text-[#00ff88] transition-colors text-gray-400">ABOUT</Link>
            <Link href="/contact" className="hover:text-[#00ff88] transition-colors text-gray-400">CONTACT</Link>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
            <span className="font-mono text-[10px] tracking-[2px] uppercase">SYSTEM LIVE</span>
          </div>
        </div>
      </nav>

      {children}

      {/* Footer Bar */}
      <footer className="border-t border-[#1a2332] bg-[#0a0c0f] py-8">
        <div className="max-w-[1440px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-mono text-[10px] tracking-[2px] uppercase text-gray-500">
            © 2026 RECONSHIELD INTELLIGENCE — AUTHORIZED RESEARCH ONLY
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
            <span className="font-mono text-[10px] tracking-[2px] uppercase">SYSTEM LIVE</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
