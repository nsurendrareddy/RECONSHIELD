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

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
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
    <div className="terminal-card animate-slide-up overflow-hidden">
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-matrix-400/10 bg-surface-900/50">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-matrix-400/60" />
        </div>
        <div className="flex items-center gap-2 ml-2">
          <Terminal className="w-3.5 h-3.5 text-matrix-400/50" />
          <span className="text-[11px] text-gray-500 font-mono">reconshield — scan-engine</span>
        </div>
      </div>
      {/* Body */}
      <div ref={scrollRef} className="p-4 max-h-64 overflow-y-auto space-y-1">
        {displayedLines.map((line, i) => {
          if (!line) return null;
          return (
            <div key={i} className={`text-xs font-mono flex items-start gap-2 ${typeColors[line.type] || 'text-gray-400'}`}>
              <span className="opacity-60 shrink-0">{prefixes[line.type] || '   '}</span>
              <span>{line.text}</span>
            </div>
          );
        })}
        <div className="text-xs font-mono text-matrix-400/50">
          <span className="terminal-cursor">{'>'} </span>
        </div>
      </div>
    </div>
  )
}
