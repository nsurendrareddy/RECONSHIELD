'use client'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[80vh] bg-[#0a0c0f] flex flex-col items-center justify-center text-center px-6">
      <div className="font-mono text-[64px] text-[#00ff88] font-bold mb-4 tracking-tighter">
        404
      </div>
      <h1 className="text-[20px] font-display font-bold text-[#e2e8f0] tracking-[4px] uppercase mb-4">
        TARGET NOT FOUND
      </h1>
      <p className="text-[13px] text-[#475569] font-sans mb-10 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link 
          href="/" 
          className="bg-[#0d1117] border border-[#1a2332] hover:border-[#00ff8833] text-[#e2e8f0] font-mono text-[11px] tracking-[2px] uppercase px-6 py-3 rounded-[5px] transition-all"
        >
          ← BACK TO SCANNER →
        </Link>
        <Link 
          href="/blog" 
          className="bg-[#0d1117] border border-[#1a2332] hover:border-[#00ff8833] text-[#e2e8f0] font-mono text-[11px] tracking-[2px] uppercase px-6 py-3 rounded-[5px] transition-all"
        >
          VIEW INTELLIGENCE BLOG →
        </Link>
      </div>
    </div>
  )
}
