import ModuleCard from '../components/ModuleCard'
import { Clock, AlertTriangle, FileWarning } from 'lucide-react'

export default function WaybackSection({ data }) {
  const w = data?.wayback || {}
  if (!w.accessible && !w.total_snapshots) return null

  const criticalFiles = (w.sensitive_files || []).filter(f => f.risk === 'critical')
  const highFiles = (w.sensitive_files || []).filter(f => f.risk === 'high')
  const techEntries = Object.entries(w.tech_timeline || {})

  return (
    <ModuleCard title="Wayback Machine Analysis" icon={Clock} status={w.risk_level}>
      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-surface-800/50 rounded-xl p-3 text-center">
          <p className="text-xl font-bold font-display text-cyber-400">{w.total_snapshots || 0}</p>
          <p className="text-[10px] text-gray-500 font-mono">Snapshots</p>
        </div>
        <div className="bg-surface-800/50 rounded-xl p-3 text-center">
          <p className="text-xl font-bold font-display text-amber-400">{w.sensitive_files?.length || 0}</p>
          <p className="text-[10px] text-gray-500 font-mono">Sensitive Files</p>
        </div>
        <div className="bg-surface-800/50 rounded-xl p-3 text-center">
          <p className="text-xl font-bold font-display text-matrix-400">{w.first_seen || '—'}</p>
          <p className="text-[10px] text-gray-500 font-mono">First Seen</p>
        </div>
      </div>

      {/* Critical files */}
      {criticalFiles.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
            <p className="text-xs font-semibold text-red-400">Critical Files Found in Archive</p>
          </div>
          <div className="space-y-1.5">
            {criticalFiles.slice(0, 5).map((f, i) => (
              <div key={i} className="flex items-center justify-between px-3 py-2 bg-red-500/5 border border-red-500/10 rounded-lg">
                <div className="flex items-center gap-2">
                  <FileWarning className="w-3.5 h-3.5 text-red-400 shrink-0" />
                  <span className="text-xs font-mono text-red-300">{f.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-red-400/60">{f.year}</span>
                  {f.status && <span className="text-[10px] font-mono text-gray-600">HTTP {f.status}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* High-risk files */}
      {highFiles.length > 0 && (
        <div className="mb-4">
          <p className="text-[10px] font-mono text-orange-400 uppercase tracking-wider mb-2">High-Risk Files</p>
          <div className="flex flex-wrap gap-1.5">
            {highFiles.slice(0, 6).map((f, i) => (
              <span key={i} className="px-2 py-1 bg-orange-500/10 border border-orange-500/15 rounded text-[11px] font-mono text-orange-300">{f.label} ({f.year})</span>
            ))}
          </div>
        </div>
      )}

      {/* Historical paths */}
      {w.historical_paths?.length > 0 && (
        <div className="mb-4">
          <p className="text-[10px] font-mono text-gray-500 uppercase tracking-wider mb-2">Historical Sensitive Paths</p>
          <div className="max-h-28 overflow-y-auto space-y-0.5">
            {w.historical_paths.slice(0, 10).map((p, i) => (
              <div key={i} className="flex items-center justify-between text-[11px] font-mono text-gray-400">
                <span>› {p.path}</span>
                <span className="text-gray-600">{p.year}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tech timeline */}
      {techEntries.length > 0 && (
        <div>
          <p className="text-[10px] font-mono text-gray-500 uppercase tracking-wider mb-2">Technology Timeline</p>
          <div className="flex flex-wrap gap-2">
            {techEntries.slice(0, 8).map(([tech, years], i) => (
              <div key={i} className="px-2.5 py-1.5 bg-surface-800/60 border border-white/[0.04] rounded-lg">
                <p className="text-[10px] font-mono text-gray-300">{tech}</p>
                <p className="text-[10px] font-mono text-gray-600">{years[0]} – {years[years.length - 1]}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {!w.sensitive_files?.length && !w.historical_paths?.length && (
        <p className="text-sm text-gray-500 text-center py-4 font-mono">No sensitive files found in Wayback Machine archive</p>
      )}
    </ModuleCard>
  )
}
