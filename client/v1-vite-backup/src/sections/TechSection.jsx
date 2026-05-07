import ModuleCard from '../components/ModuleCard'
import { Cpu, AlertTriangle, Shield } from 'lucide-react'

const categoryColors = {
  'Web Server': 'from-blue-500/20 to-blue-600/20 text-blue-400 border-blue-500/20',
  'Backend': 'from-green-500/20 to-green-600/20 text-green-400 border-green-500/20',
  'Frontend': 'from-cyan-500/20 to-cyan-600/20 text-cyan-400 border-cyan-500/20',
  'CMS': 'from-purple-500/20 to-purple-600/20 text-purple-400 border-purple-500/20',
  'Framework': 'from-indigo-500/20 to-indigo-600/20 text-indigo-400 border-indigo-500/20',
  'CDN': 'from-orange-500/20 to-orange-600/20 text-orange-400 border-orange-500/20',
  'Analytics': 'from-pink-500/20 to-pink-600/20 text-pink-400 border-pink-500/20',
  'CSS Framework': 'from-teal-500/20 to-teal-600/20 text-teal-400 border-teal-500/20',
  'JavaScript Library': 'from-yellow-500/20 to-yellow-600/20 text-yellow-400 border-yellow-500/20',
  'Security': 'from-matrix-500/20 to-matrix-600/20 text-matrix-400 border-matrix-500/20',
  'Payment': 'from-emerald-500/20 to-emerald-600/20 text-emerald-400 border-emerald-500/20',
}

const severityColor = { critical: 'bg-red-400', high: 'bg-orange-400', medium: 'bg-amber-400', low: 'bg-sky-400' }

export default function TechSection({ data }) {
  const t = data || {}
  const totalCves = t.total_potential_cves || 0

  return (
    <ModuleCard title="Technology Stack" icon={Cpu} status={t.risk_level}>
      {/* Summary bar */}
      <div className="flex flex-wrap gap-3 mb-4">
        <div className="bg-surface-800/50 rounded-xl px-4 py-2 text-center">
          <p className="text-xl font-bold font-display text-cyber-400">{t.count || 0}</p>
          <p className="text-[10px] text-gray-500 font-mono">Detected</p>
        </div>
        {totalCves > 0 && (
          <div className="bg-red-500/10 border border-red-500/10 rounded-xl px-4 py-2 text-center">
            <p className="text-xl font-bold font-display text-red-400">{totalCves}</p>
            <p className="text-[10px] text-red-400/70 font-mono">Potential CVEs</p>
          </div>
        )}
        {t.waf_detected && (
          <div className="bg-matrix-500/10 border border-matrix-500/10 rounded-xl px-4 py-2 text-center flex items-center gap-2">
            <Shield className="w-4 h-4 text-matrix-400" />
            <div>
              <p className="text-xs font-bold text-matrix-400">{t.waf_detected}</p>
              <p className="text-[10px] text-gray-500 font-mono">WAF Detected</p>
            </div>
          </div>
        )}
      </div>

      {/* Tech grid */}
      {(t.technologies || []).length === 0 ? (
        <p className="text-sm text-gray-500 text-center py-4">No technologies detected</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {t.technologies.map((tech, i) => {
            const hasCves = tech.potential_cves?.length > 0
            return (
              <div key={i} className={`bg-gradient-to-r ${categoryColors[tech.category] || 'from-gray-500/20 to-gray-600/20 text-gray-400 border-gray-500/20'} border rounded-xl p-3 ${hasCves ? 'ring-1 ring-red-500/20' : ''}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-sm">{tech.name}</span>
                  {tech.version && <span className="text-xs font-mono bg-black/25 px-2 py-0.5 rounded">v{tech.version}</span>}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs opacity-70">{tech.category}</span>
                  <span className="text-[10px] opacity-50">{tech.source}</span>
                </div>
                {hasCves && (
                  <div className="mt-2 pt-2 border-t border-red-500/10">
                    <p className="text-[10px] font-mono text-red-400 mb-1 flex items-center gap-1">
                      <AlertTriangle className="w-2.5 h-2.5" /> {tech.potential_cves.length} potential CVE(s)
                    </p>
                    {tech.potential_cves.slice(0, 2).map((cve, j) => (
                      <div key={j} className="flex items-start gap-1.5 text-[10px] font-mono text-red-300/70">
                        <span className={`mt-0.5 w-1.5 h-1.5 rounded-full shrink-0 ${severityColor[cve.severity] || 'bg-gray-400'}`} />
                        <span>{cve.id}: {cve.desc.slice(0, 45)}{cve.desc.length > 45 ? '…' : ''}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {t.issues?.length > 0 && (
        <div className="mt-4 space-y-1.5">
          {t.issues.map((issue, i) => (
            <p key={i} className="text-xs text-amber-400 flex items-start gap-2 font-mono"><span>⚠</span>{issue}</p>
          ))}
        </div>
      )}
    </ModuleCard>
  )
}
