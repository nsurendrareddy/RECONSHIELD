'use client'
import { useState } from 'react'
import { Search, Shield, Loader2, AlertTriangle, Terminal } from 'lucide-react'

export default function SearchBar({ onScan, isScanning }) {
  const [domain, setDomain] = useState('')
  const [consent, setConsent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    const cleaned = domain.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/.*$/, '')
    if (!cleaned) { setError('Domain name or IP address is required.'); return }
    if (!consent) { setError('You must confirm authorization before proceeding.'); return }
    onScan(cleaned)
  }

  return (
    <div className="animate-fade-in w-full max-w-3xl mx-auto">
      {/* Terminal Frame with Glassmorphism and Glowing Borders */}
      <div className="relative group rounded-2xl border border-white/10 bg-surface-900/65 backdrop-blur-xl shadow-2xl overflow-hidden transition-all duration-300 hover:border-matrix-400/30">
        
        {/* Animated Glow Border Background */}
        <div className="absolute -inset-[2px] bg-gradient-to-r from-matrix-500/25 via-cyber-400/20 to-neon-500/25 rounded-2xl opacity-75 group-hover:opacity-100 blur-md transition-opacity duration-700 pointer-events-none" />
        
        {/* Subtle Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-grid opacity-[0.25] pointer-events-none animate-pulse-glow" />

        {/* Terminal Header */}
        <div className="relative z-10 flex items-center justify-between px-5 py-3.5 border-b border-white/5 bg-surface-950/80">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
            <span className="ml-2 font-mono text-[10px] tracking-widest text-gray-500 uppercase flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-cyber-400" />
              Diagnostics Console
            </span>
          </div>
          <span className="font-mono text-[9px] tracking-[2px] text-matrix-400/80 uppercase animate-pulse">
            ● passive_mode_active
          </span>
        </div>

        {/* Input Form Area */}
        <div className="relative z-10 p-6 md:p-8 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative flex flex-col sm:flex-row items-stretch gap-3">
              <div className="relative flex-1 flex items-center bg-surface-950 border border-white/10 focus-within:border-matrix-400/40 rounded-xl px-4 py-1 transition-all duration-300">
                <Search className="w-5 h-5 text-gray-500 shrink-0" />
                <input
                  type="text"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder="example.com"
                  className="w-full bg-transparent border-none outline-none text-white placeholder-gray-600 text-base py-3.5 pl-3 font-mono tracking-wide focus:ring-0 focus:outline-none"
                  disabled={isScanning}
                  id="domain-input"
                />
              </div>
              <button
                type="submit"
                disabled={isScanning}
                className="px-6 py-4 sm:py-3.5 bg-gradient-to-r from-matrix-400 to-cyber-400 text-surface-950 font-bold font-mono text-xs tracking-wider rounded-xl hover:from-matrix-300 hover:to-cyber-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-matrix-400/10 hover:shadow-matrix-400/25 flex items-center justify-center gap-2 uppercase cursor-pointer"
                id="scan-button"
              >
                {isScanning ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-surface-950" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Shield className="w-4 h-4 text-surface-950" />
                    <span>Analyze Target</span>
                  </>
                )}
              </button>
            </div>

            {/* Authorization Compliance Checkbox Card */}
            <div className="p-4 rounded-xl border border-amber-500/15 bg-amber-500/[0.03] hover:border-amber-500/30 transition-all duration-300">
              <label className="flex items-start gap-3 cursor-pointer group/consent" id="consent-label">
                <div className="relative mt-0.5 shrink-0">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="w-4 h-4 rounded border-amber-500/40 bg-surface-950 text-amber-500 focus:ring-amber-500/30 checked:bg-amber-500 cursor-pointer transition-colors"
                    id="consent-checkbox"
                  />
                </div>
                <span className="text-xs text-amber-500/80 group-hover/consent:text-amber-500 transition-colors font-mono leading-relaxed select-none">
                  <span className="font-bold text-amber-500">[REQUIRED]</span> I confirm authorization to analyze this infrastructure. All analysis uses non-intrusive passive visibility only.
                </span>
              </label>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-xs text-red-400 font-mono animate-fade-in bg-red-500/5 border border-red-500/10 p-3 rounded-lg">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
