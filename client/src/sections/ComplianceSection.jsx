import ModuleCard from '../components/ModuleCard'
import { CheckSquare } from 'lucide-react'

const FRAMEWORKS = [
  { key: 'gdpr', name: 'GDPR', desc: 'EU Data Protection Regulation', color: 'blue' },
  { key: 'pci_dss', name: 'PCI-DSS', desc: 'Payment Card Industry', color: 'purple' },
  { key: 'hipaa', name: 'HIPAA', desc: 'Healthcare Data Privacy', color: 'red' },
]

function ComplianceBar({ score, color }) {
  const colorMap = { blue: 'bg-blue-500', purple: 'bg-purple-500', red: 'bg-red-500' }
  const textMap = { blue: 'text-blue-400', purple: 'text-purple-400', red: 'text-red-400' }
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-2 bg-surface-800 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-1000 ${colorMap[color]}`} style={{ width: `${score}%`, boxShadow: `0 0 8px ${color === 'blue' ? '#3B82F6' : color === 'purple' ? '#A855F7' : '#EF4444'}40` }} />
      </div>
      <span className={`text-xs font-bold font-mono w-10 text-right ${textMap[color]}`}>{score}%</span>
    </div>
  )
}

export default function ComplianceSection({ data }) {
  const compliance = data?.risk?.compliance || {}
  if (!Object.keys(compliance).length) return null

  return (
    <ModuleCard title="Compliance Readiness" icon={CheckSquare} status={null}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {FRAMEWORKS.map(fw => {
          const fw_data = compliance[fw.key] || {}
          const score = fw_data.score || 0
          const passed = fw_data.passed || []
          const failed = fw_data.failed || []
          return (
            <div key={fw.key} className="bg-surface-800/40 rounded-2xl p-4 border border-white/[0.04] space-y-3">
              <div>
                <p className="text-sm font-bold text-white">{fw.name}</p>
                <p className="text-[10px] text-gray-500 font-mono">{fw.desc}</p>
              </div>
              <ComplianceBar score={score} color={fw.color} />
              <div className="text-[10px] font-mono text-gray-500">{passed.length}/{fw_data.total || 0} controls passed</div>
              {failed.slice(0, 3).map((f, i) => (
                <div key={i} className="flex items-start gap-2 text-[10px] font-mono text-red-400/70">
                  <span className="shrink-0">✗</span><span>{f.name}</span>
                </div>
              ))}
              {passed.slice(0, 2).map((p, i) => (
                <div key={i} className="flex items-start gap-2 text-[10px] font-mono text-matrix-400/70">
                  <span className="shrink-0">✓</span><span>{p.name}</span>
                </div>
              ))}
            </div>
          )
        })}
      </div>
    </ModuleCard>
  )
}
