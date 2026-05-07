'use client'
import { useState } from 'react'
import { Search, Shield, Loader2, Zap } from 'lucide-react'

export default function SearchBar({ onScan, isScanning }) {
  const [domain, setDomain] = useState('')
  const [consent, setConsent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    const cleaned = domain.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/.*$/, '')
    if (!cleaned) { setError('Target domain or IP required'); return }
    if (!consent) { setError('Authorization confirmation required'); return }
    onScan(cleaned)
  }

  return (
    <div className="animate-fade-in py-8">
      {/* Search */}
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
        <div className="relative group">
          {/* Glow border */}
          <div className="absolute -inset-[1px] bg-gradient-to-r from-matrix-400/20 via-cyber-400/20 to-neon-500/20 rounded-2xl opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 blur-sm transition-opacity duration-500" />
          <div className="relative flex items-center gap-2 p-2 rounded-2xl bg-surface-800 border border-matrix-400/10 group-focus-within:border-matrix-400/25 transition-colors">
            <div className="flex-1 flex items-center gap-3 px-4">
              <Search className="w-5 h-5 text-matrix-400/50 shrink-0" />
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="target.domain.com"
                className="w-full bg-transparent border-none outline-none text-matrix-400 placeholder-gray-600 text-lg py-3 font-mono tracking-wide"
                disabled={isScanning}
                id="domain-input"
              />
            </div>
            <button
              type="submit"
              disabled={isScanning}
              className="shrink-0 px-4 sm:px-6 py-3 bg-gradient-to-r from-matrix-400 to-cyber-400 text-surface-950 font-bold font-heading text-xs sm:text-sm tracking-wider rounded-xl
                         hover:from-matrix-300 hover:to-cyber-300 disabled:opacity-40 disabled:cursor-not-allowed
                         transition-all duration-300 shadow-lg shadow-matrix-400/15 hover:shadow-matrix-400/30
                         flex items-center gap-2 uppercase"
              id="scan-button"
            >
              {isScanning ? (
                <><Loader2 className="w-4 h-4 animate-spin" />Scanning...</>
              ) : (
                <><Shield className="w-4 h-4" />Analyze</>
              )}
            </button>
          </div>
        </div>

        {/* Consent */}
        <label className="flex items-start gap-3 mt-5 px-2 cursor-pointer group/consent" id="consent-label">
          <div className="relative mt-0.5">
            <input
              type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)}
              className="w-4 h-4 rounded border-gray-700 bg-surface-800 text-matrix-400 focus:ring-matrix-400/30 cursor-pointer"
              id="consent-checkbox"
            />
          </div>
          <span className="text-xs text-gray-500 group-hover/consent:text-gray-400 transition-colors font-mono leading-relaxed">
            [REQUIRED] I confirm authorization to scan this target.
            All analysis uses non-intrusive, passive reconnaissance only.
          </span>
        </label>

        {error && <p className="mt-3 text-xs text-red-400 px-2 font-mono animate-fade-in">⚠ {error}</p>}
      </form>
    </div>
  )
}
