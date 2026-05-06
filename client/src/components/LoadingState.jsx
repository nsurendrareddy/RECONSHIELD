import ScanTerminal from './ScanTerminal'

export default function LoadingState({ progress, domain, scanProgress }) {
  return (
    <div className="mt-10 space-y-6 animate-fade-in">
      {/* Radar animation */}
      <div className="flex justify-center mb-6">
        <div className="relative w-28 h-28">
          <div className="absolute inset-0 rounded-full border border-matrix-400/10" />
          <div className="absolute inset-3 rounded-full border border-matrix-400/8" />
          <div className="absolute inset-6 rounded-full border border-matrix-400/5" />
          <div className="absolute inset-0 rounded-full border-t-2 border-matrix-400/60 animate-radar" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 bg-matrix-400 rounded-full animate-pulse shadow-lg shadow-matrix-400/40" />
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="max-w-lg mx-auto">
        <div className="flex items-center justify-between text-xs font-mono text-gray-500 mb-2">
          <span>{progress || 'Scanning target...'}</span>
          <span className="text-matrix-400">{scanProgress?.completed_count || 0}/{scanProgress?.total_modules || 20}</span>
        </div>
        <div className="w-full h-1 bg-surface-700 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-matrix-400 to-cyber-400 transition-all duration-700"
            style={{ width: `${((scanProgress?.completed_count || 0) / (scanProgress?.total_modules || 20)) * 100}%` }}
          />
        </div>
      </div>

      {/* Live terminal */}
      <div className="max-w-2xl mx-auto">
        <ScanTerminal progress={scanProgress?.progress || []} domain={domain} />
      </div>
    </div>
  )
}
