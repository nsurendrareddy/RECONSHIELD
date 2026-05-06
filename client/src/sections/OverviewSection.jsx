import ScoreGauge from '../components/ScoreGauge'
import StatusBadge from '../components/StatusBadge'
import ExportButton from '../components/ExportButton'
import HackTargetModal from '../components/HackTargetModal'
import { Shield, AlertTriangle, CheckCircle, Info, Crosshair, Zap, Terminal } from 'lucide-react'
import { useState } from 'react'

export default function OverviewSection({ data, scanId, onLockClick }) {
  const [isHackOpen, setIsHackOpen] = useState(false)
  const risk = data?.risk || {}
  const stats = risk.stats || {}
  const domain = data?._domain || 'target'

  return (
    <div className="glass-card p-6 animate-slide-up relative overflow-hidden group">
      {/* Decorative scan line */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(transparent_0%,#00FF9C_50%,transparent_100%)] bg-[length:100%_20px] animate-scan-line" />
      
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 relative z-10">
        {/* Score */}
        <div className="relative shrink-0">
          <ScoreGauge score={risk.score || 0} grade={risk.grade || '?'} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
            <h3 className="text-lg font-heading font-bold text-white flex items-center gap-2.5 tracking-wide uppercase">
              <Crosshair className="w-5 h-5 text-matrix-400" />
              Intelligence Summary
            </h3>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsHackOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 bg-matrix-400/10 border border-matrix-400/30 text-matrix-400 rounded-lg text-[11px] font-mono hover:bg-matrix-400/20 transition-all group/btn"
              >
                <Terminal className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform" />
                SIMULATE_RECON()
              </button>
              <ExportButton scanId={scanId} onLockClick={onLockClick} />
            </div>
          </div>

          <p className="text-gray-400 text-sm mb-5 leading-relaxed font-sans">{risk.summary}</p>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {[
              { icon: AlertTriangle, color: 'red', count: stats.critical || 0, label: 'Critical' },
              { icon: AlertTriangle, color: 'amber', count: stats.warnings || 0, label: 'Warnings' },
              { icon: Info, color: 'cyan', count: stats.info || 0, label: 'Info' },
              { icon: CheckCircle, color: 'matrix', count: stats.total_recommendations || 0, label: 'Actions' },
            ].map(({ icon: Icon, color, count, label }) => (
              <div key={label} className={`bg-${color === 'matrix' ? 'matrix' : color}-500/5 border border-${color === 'matrix' ? 'matrix' : color}-500/10 rounded-xl p-3 text-center transition-all hover:bg-${color === 'matrix' ? 'matrix' : color}-500/10`}>
                <Icon className={`w-4 h-4 text-${color === 'matrix' ? 'matrix' : color}-400 mx-auto mb-1`} />
                <p className={`text-2xl font-display font-bold text-${color === 'matrix' ? 'matrix' : color}-400`}>{count}</p>
                <p className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">{label}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <StatusBadge status={risk.risk_level} label={`Risk: ${risk.risk_level || 'N/A'}`} />
            <div className="px-3 py-1 rounded-full border border-white/[0.04] bg-white/[0.02] text-[10px] font-mono text-gray-500 flex items-center gap-2">
              <Zap className="w-3 h-3 text-matrix-400" />
              ATTACK_SURFACE_INDEX: {risk.attack_surface_score || 0}
            </div>
            <div className="px-3 py-1 rounded-full border border-white/[0.04] bg-white/[0.02] text-[10px] font-mono text-gray-500 flex items-center gap-2">
              <Shield className="w-3 h-3 text-cyber-400" />
              COMPLIANCE_AVG: {Math.round(( (risk.compliance?.gdpr?.score || 0) + (risk.compliance?.pci_dss?.score || 0) + (risk.compliance?.hipaa?.score || 0) ) / 3)}%
            </div>
          </div>
        </div>
      </div>

      {isHackOpen && (
        <HackTargetModal 
          isOpen={true} 
          onClose={() => setIsHackOpen(false)} 
          target={domain} 
        />
      )}
    </div>
  )
}
