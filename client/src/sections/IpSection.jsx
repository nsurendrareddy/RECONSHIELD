import ModuleCard from '../components/ModuleCard'
import { MapPin } from 'lucide-react'

export default function IpSection({ data }) {
  const ip = data || {}

  const rows = [
    ['IP Address', ip.ip],
    ['Country', ip.country ? `${ip.country} (${ip.country_code})` : null],
    ['Region', ip.region],
    ['City', ip.city],
    ['ISP', ip.isp],
    ['Organization', ip.org],
    ['ASN', ip.as_number],
    ['AS Name', ip.as_name],
    ['Timezone', ip.timezone],
    ['Hosting', ip.is_hosting ? 'Yes (Datacenter)' : 'No'],
    ['Proxy/VPN', ip.is_proxy ? 'Yes ⚠' : 'No'],
  ]

  return (
    <ModuleCard title="IP Intelligence" icon={MapPin} status={ip.risk_level}>
      <div className="grid gap-2">
        {rows.map(([label, value]) => (
          value != null && (
            <div key={label} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
              <span className="text-sm text-gray-400">{label}</span>
              <span className="text-sm font-medium text-gray-200 font-mono">{value}</span>
            </div>
          )
        ))}
      </div>

      {/* Coordinates */}
      {ip.lat && ip.lon && (
        <div className="mt-3 bg-surface-800/50 rounded-xl p-3">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Coordinates</p>
          <p className="text-sm font-mono text-gray-300">{ip.lat}, {ip.lon}</p>
        </div>
      )}

      {ip.issues?.length > 0 && (
        <div className="mt-4 space-y-2">
          {ip.issues.map((issue, i) => (
            <p key={i} className="text-xs text-amber-400 flex items-start gap-2"><span>⚠</span>{issue}</p>
          ))}
        </div>
      )}
    </ModuleCard>
  )
}
