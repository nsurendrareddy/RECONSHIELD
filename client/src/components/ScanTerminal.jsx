'use client'
import { useState, useEffect, useRef } from 'react'
import { Terminal } from 'lucide-react'

export default function ScanTerminal({ progress = [], domain }) {
  const [displayedLines, setDisplayedLines] = useState([])
  const scrollRef = useRef(null)
  const processedRef = useRef(0)

  // Build and animate lines incrementally
  useEffect(() => {
    const allLines = []
    if (domain && processedRef.current === 0) {
      allLines.push({ text: 'RECONSHIELD v2.0 // Ethical Intelligence Engine', type: 'system' })
      allLines.push({ text: 'Initializing scan modules...', type: 'info' })
      allLines.push({ text: `Target acquired: ${domain}`, type: 'success' })
    }

    for (const p of progress) {
      if (p.module === 'init') continue
      if (p.status === 'running') {
        allLines.push({ text: `Executing: ${p.module}...`, type: 'info' })
      } else if (p.status === 'done') {
        allLines.push({ text: `${p.module} — Complete ✓`, type: 'success' })
      } else if (p.status === 'error') {
        allLines.push({ text: `${p.module} — Error ✗`, type: 'error' })
      }
    }

    // Only add new lines
    if (allLines.length > processedRef.current) {
      const newLines = allLines.slice(processedRef.current)
      processedRef.current = allLines.length
      let i = 0
      const timer = setInterval(() => {
        if (i < newLines.length) {
          setDisplayedLines(prev => [...prev, newLines[i]])
          i++
        } else {
          clearInterval(timer)
        }
      }, 120)
      return () => clearInterval(timer)
    }
  }, [progress, domain])

  // Auto-scroll with requestAnimationFrame to avoid forced reflow
  useEffect(() => {
    if (scrollRef.current) {
      const el = scrollRef.current;
      requestAnimationFrame(() => {
        el.scrollTop = el.scrollHeight;
      });
    }
  }, [displayedLines])

  const typeColors = {
    system: 'text-neon-400',
    info: 'text-cyber-400',
    success: 'text-matrix-400',
    error: 'text-red-400',
  }
  const prefixes = {
    system: '>>>',
    info: '[+]',
    success: '[✓]',
    error: '[✗]',
  }

  return (
    <div className="terminal-card animate-slide-up overflow-hidden group relative">
      {/* Terminal header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-matrix-400/10 bg-surface-900/80 backdrop-blur-md relative z-10">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/40 border border-red-500/20" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/40 border border-amber-500/20" />
            <div className="w-2.5 h-2.5 rounded-full bg-matrix-400/40 border border-matrix-400/20" />
          </div>
          <div className="flex items-center gap-2 ml-2">
            <Terminal className="w-3.5 h-3.5 text-matrix-400/50" />
            <span className="text-[10px] text-gray-500 font-mono font-bold uppercase tracking-widest">reconshield — bash v5.2</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-1.5">
              <span className="text-[9px] font-mono text-gray-600 uppercase">Buffer</span>
              <div className="w-16 h-1 bg-surface-800 rounded-full overflow-hidden">
                <div className="h-full bg-matrix-400/30 animate-scan-fast" style={{ width: '40%' }} />
              </div>
           </div>
           <div className="px-2 py-0.5 rounded bg-matrix-400/10 border border-matrix-400/20">
             <span className="text-[9px] font-mono text-matrix-400 animate-pulse">ENCRYPTED_LINK</span>
           </div>
        </div>
      </div>

      {/* Body */}
      <div className="relative">
        {/* Matrix Background Effect */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] font-mono text-[10px] overflow-hidden leading-none select-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="whitespace-nowrap animate-matrix-column" style={{ animationDelay: `${i * 0.3}s` }}>
              {Array.from({ length: 50 }).map(() => Math.random().toString(36).substring(2, 4)).join(' ')}
            </div>
          ))}
        </div>

        <div ref={scrollRef} className="p-5 max-h-72 overflow-y-auto space-y-1.5 relative z-10 scrollbar-thin scrollbar-thumb-matrix-400/20 scrollbar-track-transparent">
          {displayedLines.map((line, i) => {
            if (!line) return null;
            return (
              <div key={i} className={`text-xs font-mono flex items-start gap-3 ${typeColors[line.type] || 'text-gray-400'} animate-fade-in`}>
                <span className="opacity-40 shrink-0 font-bold">{prefixes[line.type] || '   '}</span>
                <span className="leading-relaxed tracking-tight">{line.text}</span>
              </div>
            );
          })}
          <div className="text-xs font-mono text-matrix-400/50 pt-1">
            <span className="terminal-cursor inline-block w-2 h-4 bg-matrix-400/40 align-middle ml-1" />
          </div>
        </div>
      </div>
    </div>
  )
}
