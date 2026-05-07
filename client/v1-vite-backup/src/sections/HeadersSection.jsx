import ModuleCard from '../components/ModuleCard'
import StatusBadge from '../components/StatusBadge'
import { ShieldCheck } from 'lucide-react'

export default function HeadersSection({ data }) {
  const h = data || {}

  const gradeColors = {
    A: 'text-emerald-400', B: 'text-cyber-400', C: 'text-amber-400', D: 'text-orange-400', F: 'text-red-400'
  }

  return (
    <ModuleCard title="Security Headers" icon={ShieldCheck} status={h.risk_level}>
      {/* Grade display */}
      <div className="flex items-center gap-4 mb-5">
        <div className="text-center">
          <span className={`text-4xl font-black ${gradeColors[h.grade] || 'text-gray-400'}`}>{h.grade || '?'}</span>
          <p className="text-xs text-gray-500 mt-0.5">Grade</p>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-gray-400">Header Score</span>
            <span className="font-bold text-white">{h.score ?? 0}/100</span>
          </div>
          <div className="w-full h-2 bg-surface-700 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyber-500 to-neon-500 transition-all duration-1000"
              style={{ width: `${h.score || 0}%` }}
            />
          </div>
        </div>
      </div>

      {/* Server info */}
      <div className="flex flex-wrap gap-3 mb-4 text-xs">
        <span className="text-gray-400">Server: <span className="font-mono text-gray-300">{h.server || 'N/A'}</span></span>
        {h.powered_by && h.powered_by !== 'Not disclosed' && (
          <span className="text-amber-400">X-Powered-By: <span className="font-mono">{h.powered_by}</span></span>
        )}
      </div>

      {/* Headers checklist */}
      <div className="space-y-2">
        {(h.headers || []).map((header, i) => (
          <div key={i} className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-surface-800/30 hover:bg-surface-800/50 transition-colors">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-200">{header.header}</p>
              <p className="text-xs text-gray-500 mt-0.5">{header.description}</p>
            </div>
            <StatusBadge status={header.status} label={header.present ? 'Present' : 'Missing'} />
          </div>
        ))}
      </div>
    </ModuleCard>
  )
}
