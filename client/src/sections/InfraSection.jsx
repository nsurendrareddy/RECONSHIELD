import ModuleCard from '../components/ModuleCard'
import { Server, AlertTriangle, Shield } from 'lucide-react'

const riskColors = {
  Critical: 'text-red-400 bg-red-500/10 border-red-500/15',
  High: 'text-orange-400 bg-orange-500/10 border-orange-500/15',
  Medium: 'text-amber-400 bg-amber-500/10 border-amber-500/15',
  Low: 'text-matrix-400 bg-matrix-500/10 border-matrix-500/15',
}

export default function InfraSection({ data }) {
  const infra = data?.infra || {}
  const graphql = data?.graphql || {}
  const s3 = data?.s3_probe || {}
  const github = data?.github || {}

  const hasData = infra.services_detected?.length || graphql.endpoints_found?.length || s3.public_buckets?.length || github.leaks_found

  if (!hasData) return null

  return (
    <ModuleCard title="Advanced Infrastructure" icon={Server} status={infra.risk_level || 'Low'}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Infrastructure Services */}
        <div className="space-y-3">
          <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Infrastructure Exposure</p>
          {infra.services_detected?.length > 0 ? (
            <div className="space-y-2">
              {infra.services_detected.map((svc, i) => (
                <div key={i} className={`flex items-start justify-between px-3 py-2.5 rounded-xl border ${riskColors[svc.risk] || riskColors.Low}`}>
                  <div>
                    <p className="text-xs font-semibold">{svc.name}</p>
                    <p className="text-[10px] font-mono opacity-70 mt-0.5">{svc.note}</p>
                    {svc.url && <p className="text-[10px] font-mono opacity-50 mt-0.5 truncate max-w-[200px]">{svc.url}</p>}
                  </div>
                  <span className="text-[10px] font-mono shrink-0 ml-2 mt-0.5">{svc.risk}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-2 px-3 py-3 bg-matrix-500/5 border border-matrix-500/10 rounded-xl">
              <Shield className="w-4 h-4 text-matrix-400" />
              <p className="text-xs font-mono text-matrix-400">No critical infra exposure detected</p>
            </div>
          )}
        </div>

        {/* GraphQL + Cloud + GitHub */}
        <div className="space-y-3">
          {/* GraphQL */}
          <div>
            <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-2">GraphQL</p>
            {graphql.endpoints_found?.length > 0 ? (
              <div className={`px-3 py-2.5 rounded-xl border ${graphql.introspection_enabled ? riskColors.High : riskColors.Low}`}>
                <p className="text-xs font-semibold">{graphql.endpoints_found[0]?.url}</p>
                <p className="text-[10px] font-mono opacity-70 mt-1">
                  Introspection: {graphql.introspection_enabled ? '⚠ ENABLED' : '✓ Disabled'}
                  {graphql.schema_preview?.type_count && ` · ${graphql.schema_preview.type_count} types exposed`}
                </p>
              </div>
            ) : (
              <p className="text-xs font-mono text-gray-600">No GraphQL endpoints detected</p>
            )}
          </div>

          {/* Cloud Storage */}
          <div>
            <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-2">Cloud Storage ({s3.buckets_checked || 0} buckets checked)</p>
            {s3.public_buckets?.filter(b => b.risk === 'critical').length > 0 ? (
              <div className="space-y-1.5">
                {s3.public_buckets.filter(b => b.risk === 'critical').slice(0, 3).map((b, i) => (
                  <div key={i} className={`px-3 py-2 rounded-xl border ${riskColors.Critical}`}>
                    <p className="text-[11px] font-mono">{b.name} ({b.provider})</p>
                    <p className="text-[10px] font-mono opacity-60">{b.status}</p>
                  </div>
                ))}
              </div>
            ) : s3.cloud_providers_detected?.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {s3.cloud_providers_detected.slice(0, 4).map((cd, i) => (
                  <span key={i} className="px-2 py-1 bg-sky-500/10 border border-sky-500/15 rounded text-[10px] font-mono text-sky-400">{cd.provider}</span>
                ))}
              </div>
            ) : (
              <p className="text-xs font-mono text-gray-600">No exposed buckets found</p>
            )}
          </div>

          {/* GitHub */}
          <div>
            <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-2">GitHub analysis</p>
            {!github.enabled ? (
              <p className="text-[10px] font-mono text-gray-600">{github.message || 'GitHub token not configured'}</p>
            ) : github.leaks_found > 0 ? (
              <div className="space-y-1.5">
                {github.results.slice(0, 3).map((r, i) => (
                  <div key={i} className={`px-3 py-2 rounded-xl border ${riskColors[r.risk === 'critical' ? 'Critical' : 'High']}`}>
                    <p className="text-[11px] font-mono">{r.label}</p>
                    <p className="text-[10px] font-mono opacity-60 truncate">{r.repo}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-matrix-400" />
                <p className="text-xs font-mono text-matrix-400">No GitHub leaks found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </ModuleCard>
  )
}
