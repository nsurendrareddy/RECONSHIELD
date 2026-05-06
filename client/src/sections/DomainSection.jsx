import ModuleCard from '../components/ModuleCard'
import StatusBadge from '../components/StatusBadge'
import { Globe } from 'lucide-react'

export default function DomainSection({ data }) {
  const w = data || {}
  if (w.error && !w.registrar) return null

  const rows = [
    ['Registrar', w.registrar],
    ['Organization', w.organization],
    ['Created', w.creation_date?.split('T')[0]],
    ['Expires', w.expiration_date?.split('T')[0]],
    ['Domain Age', w.domain_age?.label],
    ['Expiry', w.expiry_days != null ? `${w.expiry_days} days` : 'N/A'],
    ['DNSSEC', w.dnssec || 'Unknown'],
    ['Country', w.registrant_country],
  ]

  return (
    <ModuleCard title="Domain Intelligence" icon={Globe} status={w.risk_level}>
      <div className="grid gap-2">
        {rows.map(([label, value]) => (
          <div key={label} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
            <span className="text-sm text-gray-400">{label}</span>
            <span className="text-sm font-medium text-white font-mono">{value || 'N/A'}</span>
          </div>
        ))}
      </div>

      {/* Name servers */}
      {w.name_servers?.length > 0 && (
        <div className="mt-4">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Name Servers</p>
          <div className="flex flex-wrap gap-2">
            {w.name_servers.map((ns, i) => (
              <span key={i} className="text-xs font-mono bg-surface-700/50 px-2.5 py-1 rounded-lg text-gray-300">{ns}</span>
            ))}
          </div>
        </div>
      )}

      {/* Issues */}
      {w.issues?.length > 0 && (
        <div className="mt-4 space-y-2">
          {w.issues.map((issue, i) => (
            <p key={i} className="text-xs text-amber-400 flex items-start gap-2">
              <span>⚠</span> {issue}
            </p>
          ))}
        </div>
      )}
    </ModuleCard>
  )
}
