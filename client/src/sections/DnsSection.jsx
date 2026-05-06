import ModuleCard from '../components/ModuleCard'
import StatusBadge from '../components/StatusBadge'
import { Network } from 'lucide-react'

export default function DnsSection({ data }) {
  const d = data || {}
  const records = d.records || {}

  const recordTypes = ['a', 'aaaa', 'mx', 'ns', 'cname', 'txt']

  return (
    <ModuleCard title="DNS & Infrastructure" icon={Network} status={d.risk_level}>
      {/* Cloud providers */}
      {d.cloud_providers?.length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Detected Infrastructure</p>
          <div className="flex flex-wrap gap-2">
            {d.cloud_providers.map((p, i) => (
              <span key={i} className="text-xs font-medium bg-cyber-500/10 text-cyber-400 px-3 py-1.5 rounded-lg border border-cyber-500/20">
                {p}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* SPF & DMARC */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <div className="bg-surface-800/50 rounded-xl p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium text-gray-300">SPF Record</span>
            <StatusBadge status={d.spf?.status || 'fail'} />
          </div>
          {d.spf?.record && (
            <p className="text-xs font-mono text-gray-400 break-all mt-1">{d.spf.record.substring(0, 100)}</p>
          )}
        </div>
        <div className="bg-surface-800/50 rounded-xl p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium text-gray-300">DMARC Record</span>
            <StatusBadge status={d.dmarc?.status || 'fail'} />
          </div>
          {d.dmarc?.record && (
            <p className="text-xs font-mono text-gray-400 break-all mt-1">{d.dmarc.record.substring(0, 100)}</p>
          )}
        </div>
      </div>

      {/* DNS Records Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5">
              <th className="text-left py-2 px-3 text-xs text-gray-500 uppercase">Type</th>
              <th className="text-left py-2 px-3 text-xs text-gray-500 uppercase">Value</th>
            </tr>
          </thead>
          <tbody>
            {recordTypes.map(type => {
              const recs = records[type] || []
              return recs.map((rec, i) => (
                <tr key={`${type}-${i}`} className="border-b border-white/[0.03] hover:bg-white/[0.02]">
                  <td className="py-2 px-3">
                    <span className="text-xs font-mono font-bold text-cyber-400 bg-cyber-500/10 px-2 py-0.5 rounded">{type.toUpperCase()}</span>
                  </td>
                  <td className="py-2 px-3 font-mono text-xs text-gray-300 break-all">
                    {typeof rec === 'object' ? (rec.value || `${rec.priority} ${rec.value}`) : rec}
                  </td>
                </tr>
              ))
            })}
          </tbody>
        </table>
      </div>
    </ModuleCard>
  )
}
