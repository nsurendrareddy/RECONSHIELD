import ModuleCard from '../components/ModuleCard'
import StatusBadge from '../components/StatusBadge'
import { Radio } from 'lucide-react'

export default function PortSection({ data }) {
  const p = data || {}

  return (
    <ModuleCard title="Port Exposure" icon={Radio} status={p.risk_level}>
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-surface-800/50 rounded-xl px-4 py-3 text-center">
          <p className="text-2xl font-bold text-cyber-400">{p.open_count || 0}</p>
          <p className="text-xs text-gray-500">Open</p>
        </div>
        <div className="bg-surface-800/50 rounded-xl px-4 py-3 text-center">
          <p className="text-2xl font-bold text-red-400">{p.high_risk_count || 0}</p>
          <p className="text-xs text-gray-500">High Risk</p>
        </div>
        {p.host && (
          <p className="text-xs font-mono text-gray-500 ml-auto">Host: {p.host}</p>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5">
              <th className="text-left py-2 px-3 text-xs text-gray-500 uppercase">Port</th>
              <th className="text-left py-2 px-3 text-xs text-gray-500 uppercase">Service</th>
              <th className="text-left py-2 px-3 text-xs text-gray-500 uppercase">State</th>
              <th className="text-left py-2 px-3 text-xs text-gray-500 uppercase">Risk</th>
            </tr>
          </thead>
          <tbody>
            {(p.ports || []).map((port, i) => (
              <tr
                key={i}
                className={`border-b border-white/[0.03] ${
                  port.state === 'open'
                    ? port.risk === 'High' ? 'bg-red-500/[0.03]' : 'bg-emerald-500/[0.03]'
                    : ''
                }`}
              >
                <td className="py-2 px-3 font-mono font-bold text-gray-200">{port.port}</td>
                <td className="py-2 px-3 text-gray-400">{port.service}</td>
                <td className="py-2 px-3">
                  <StatusBadge
                    status={port.state === 'open' ? (port.risk === 'High' ? 'fail' : 'pass') : 'info'}
                    label={port.state}
                  />
                </td>
                <td className="py-2 px-3">
                  {port.state === 'open' && <StatusBadge status={port.risk} />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ModuleCard>
  )
}
