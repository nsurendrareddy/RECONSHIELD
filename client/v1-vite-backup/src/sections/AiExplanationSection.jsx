import { BrainCircuit, AlertTriangle, Shield, Zap, Clock, Wrench } from 'lucide-react'

const severityColors = {
  critical: { bg: 'bg-red-500/5', border: 'border-red-500/15', text: 'text-red-400', icon: '🔴' },
  high: { bg: 'bg-orange-500/5', border: 'border-orange-500/15', text: 'text-orange-400', icon: '🟠' },
  medium: { bg: 'bg-amber-500/5', border: 'border-amber-500/15', text: 'text-amber-400', icon: '🟡' },
  low: { bg: 'bg-cyan-500/5', border: 'border-cyan-500/15', text: 'text-cyan-400', icon: '🔵' },
  info: { bg: 'bg-gray-500/5', border: 'border-gray-500/15', text: 'text-gray-400', icon: 'ℹ️' },
}

const difficultyColors = {
  Easy: 'text-matrix-400 bg-matrix-400/8',
  Medium: 'text-amber-400 bg-amber-400/8',
  Hard: 'text-red-400 bg-red-400/8',
}

export default function AiExplanationSection({ explanations = [], summary = '' }) {
  if (!explanations.length) return null

  return (
    <div className="glass-card animate-slide-up overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-white/[0.03]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-neon-500/10 border border-neon-500/20 flex items-center justify-center">
            <BrainCircuit className="w-5 h-5 text-neon-400" />
          </div>
          <div>
            <h3 className="text-sm font-heading font-semibold text-white tracking-wide uppercase">AI Security Analysis</h3>
            <p className="text-[10px] font-mono text-gray-500 mt-0.5">{explanations.length} findings analyzed</p>
          </div>
        </div>
      </div>

      {/* Executive Summary — Terminal style */}
      {summary && (
        <div className="mx-5 mt-4 p-4 terminal-card">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-mono text-matrix-400/60 uppercase tracking-widest">System Analysis</span>
          </div>
          <p className="text-xs font-mono text-matrix-400/80 leading-relaxed">{summary}</p>
        </div>
      )}

      {/* Explanations */}
      <div className="p-5 space-y-4">
        {explanations.map((exp, i) => {
          const s = severityColors[exp.severity] || severityColors.info
          return (
            <div key={i} className={`${s.bg} border ${s.border} rounded-xl p-4 animate-slide-up`} style={{ animationDelay: `${i * 0.05}s` }}>
              {/* Title row */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-start gap-2">
                  <span className="text-sm mt-0.5">{s.icon}</span>
                  <div>
                    <h4 className={`text-sm font-semibold ${s.text}`}>{exp.title}</h4>
                    <span className="text-[10px] font-mono text-gray-500">{exp.category} • {exp.severity.toUpperCase()}</span>
                  </div>
                </div>
                {exp.difficulty && (
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${difficultyColors[exp.difficulty] || ''}`}>
                    {exp.difficulty}
                  </span>
                )}
              </div>

              {/* Impact */}
              <div className="space-y-2.5 text-xs text-gray-400 ml-6">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400/60 shrink-0 mt-0.5" />
                  <div><span className="text-gray-500 font-mono text-[10px]">IMPACT:</span> <span className="text-gray-300">{exp.impact}</span></div>
                </div>
                <div className="flex items-start gap-2">
                  <Zap className="w-3.5 h-3.5 text-red-400/60 shrink-0 mt-0.5" />
                  <div><span className="text-gray-500 font-mono text-[10px]">ATTACK:</span> <span className="text-gray-300">{exp.attack}</span></div>
                </div>
                <div className="flex items-start gap-2">
                  <Shield className="w-3.5 h-3.5 text-cyan-400/60 shrink-0 mt-0.5" />
                  <div><span className="text-gray-500 font-mono text-[10px]">REAL-WORLD:</span> <span className="text-gray-300">{exp.real_world}</span></div>
                </div>
                <div className="flex items-start gap-2">
                  <Wrench className="w-3.5 h-3.5 text-matrix-400/60 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-gray-500 font-mono text-[10px]">FIX:</span>{' '}
                    <span className="text-matrix-400/80 font-mono">{exp.fix}</span>
                    {exp.time_estimate && <span className="text-gray-600 ml-2">({exp.time_estimate})</span>}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
