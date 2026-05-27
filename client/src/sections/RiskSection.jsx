import ModuleCard from '../components/ModuleCard'
import { BrainCircuit, ArrowRight } from 'lucide-react'

const priorityStyles = {
  critical: 'bg-red-500/10 border-red-500/20 text-red-400',
  high: 'bg-orange-500/10 border-orange-500/20 text-orange-400',
  medium: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
  low: 'bg-sky-500/10 border-sky-500/20 text-sky-400',
}

const severityStyles = {
  critical: 'bg-red-500/10 text-red-400',
  warning: 'bg-amber-500/10 text-amber-400',
  info: 'bg-sky-500/10 text-sky-400',
}

export default function RiskSection({ data }) {
  const risk = data?.risk || {}

  return (
    <ModuleCard title="AI Risk Analysis" icon={BrainCircuit} status={risk.risk_level} defaultOpen={true}>
      {/* vulnerabilities */}
      {risk.vulnerabilities?.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-300 mb-3">Detected configuration risks</h4>
          <div className="space-y-2">
            {risk.vulnerabilities.map((v, i) => (
              <div key={i} className={`rounded-lg px-4 py-3 ${severityStyles[v.severity] || severityStyles.info}`}>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs font-bold uppercase opacity-70">{v.severity}</span>
                  <span className="font-medium text-sm">{v.title}</span>
                </div>
                <p className="text-xs opacity-70">{v.detail}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      {risk.recommendations?.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-gray-300 mb-3">Recommendations</h4>
          <div className="space-y-2">
            {risk.recommendations.map((r, i) => (
              <div key={i} className={`flex items-start gap-3 rounded-lg border px-4 py-3 ${priorityStyles[r.priority] || priorityStyles.low}`}>
                <ArrowRight className="w-4 h-4 shrink-0 mt-0.5 opacity-70" />
                <div className="flex-1">
                  <span className="text-xs font-bold uppercase opacity-60 mr-2">{r.priority}</span>
                  <span className="text-sm">{r.action}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {(!risk.vulnerabilities?.length && !risk.recommendations?.length) && (
        <p className="text-sm text-gray-500 text-center py-4">No specific issues detected — good security posture!</p>
      )}
    </ModuleCard>
  )
}
