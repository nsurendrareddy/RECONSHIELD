'use client'
import Link from 'next/link'
import { Terminal, ShieldAlert, ArrowLeft, ArrowRight } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="relative mb-8">
        <div className="text-[120px] md:text-[180px] font-display font-bold text-[#00ff8808] leading-none select-none">
          404
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <ShieldAlert className="w-16 h-16 text-[#00ff88] mb-4 animate-pulse" />
          <h1 className="text-2xl md:text-3xl font-mono font-bold text-white tracking-[5px] uppercase">
            TARGET NOT FOUND
          </h1>
        </div>
      </div>
      
      <div className="max-w-md mx-auto space-y-6">
        <p className="text-gray-500 font-mono text-sm leading-relaxed uppercase tracking-widest">
          [!] The page you're looking for doesn't exist or has been moved to a classified directory.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <Link 
            href="/" 
            className="flex items-center gap-2 px-6 py-3 bg-[#00ff8811] border border-[#00ff8833] text-[#00ff88] font-mono text-xs tracking-[2px] uppercase hover:bg-[#00ff8822] transition-all group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
            BACK TO SCANNER
          </Link>
          <Link 
            href="/blog" 
            className="flex items-center gap-2 px-6 py-3 bg-surface-800 border border-white/5 text-gray-400 font-mono text-xs tracking-[2px] uppercase hover:text-white hover:bg-surface-700 transition-all group"
          >
            VIEW INTELLIGENCE BLOG
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      <div className="mt-20 flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
        <span className="font-mono text-[10px] text-gray-600 tracking-[3px] uppercase">ACCESS DENIED // 404_NOT_FOUND</span>
      </div>
    </div>
  )
}
