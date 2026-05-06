import { useState } from 'react'
import ModuleCard from '../components/ModuleCard'
import { GitBranch, Search, Cloud, AlertTriangle } from 'lucide-react'

const categoryColors = {
  admin: 'bg-red-500/10 border-red-500/20 text-red-400',
  db: 'bg-red-500/10 border-red-500/20 text-red-400',
  staging: 'bg-orange-500/10 border-orange-500/20 text-orange-400',
  dev: 'bg-orange-500/10 border-orange-500/20 text-orange-400',
  test: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
  api: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400',
  portal: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
  cloud: 'bg-sky-500/10 border-sky-500/20 text-sky-400',
  mail: 'bg-matrix-500/10 border-matrix-500/20 text-matrix-400',
  cdn: 'bg-gray-500/10 border-gray-500/20 text-gray-400',
  vpn: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400',
  unknown: 'bg-surface-700/60 border-white/[0.04] text-gray-500',
}

const categoryDot = {
  admin: 'bg-red-400', db: 'bg-red-400', staging: 'bg-orange-400', dev: 'bg-orange-400',
  test: 'bg-amber-400', api: 'bg-cyan-400', portal: 'bg-purple-400', cloud: 'bg-sky-400',
  mail: 'bg-matrix-400', cdn: 'bg-gray-400', vpn: 'bg-indigo-400', unknown: 'bg-gray-600',
}

const TABS = ['All', 'Risky', 'Predicted', 'Cloud']

export default function SubdomainSection({ data }) {
  const s = data || {}
  const [search, setSearch] = useState('')
  const [tab, setTab] = useState('All')

  const categorized = s.categorized || []
  const predicted = s.predicted_subdomains || []
  const cloudAssets = s.cloud_assets || []

  const filtered = categorized.filter(sub => {
    if (search && !sub.subdomain.includes(search.toLowerCase())) return false
    if (tab === 'Risky') return ['Critical', 'High'].includes(sub.risk_level)
    if (tab === 'Cloud') return sub.category === 'cloud' || sub.cloud_provider
    return true
  })

  const displayItems = tab === 'Predicted' ? predicted : filtered

  return (
    <ModuleCard title="Subdomain Enumeration" icon={GitBranch} status={s.risk_level}>
      {/* Stats */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        {[
          { label: 'Total', value: s.count || 0, color: 'text-cyber-400' },
          { label: 'Risky', value: s.risky_count || 0, color: 'text-orange-400' },
          { label: 'Cloud', value: cloudAssets.length, color: 'text-sky-400' },
          { label: 'Predicted', value: predicted.length, color: 'text-purple-400' },
        ].map(stat => (
          <div key={stat.label} className="bg-surface-800/50 rounded-xl px-4 py-2 text-center flex-1 min-w-[60px]">
            <p className={`text-xl font-bold font-display ${stat.color}`}>{stat.value}</p>
            <p className="text-[10px] text-gray-500 font-mono">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-3 bg-surface-800/40 rounded-lg p-1">
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`flex-1 py-1 rounded-md text-[11px] font-mono transition-all ${tab === t ? 'bg-surface-700 text-white shadow' : 'text-gray-500 hover:text-gray-300'}`}>
            {t}
          </button>
        ))}
      </div>

      {/* Search */}
      {tab !== 'Predicted' && (
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-600" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="filter subdomains…"
            className="w-full pl-9 pr-3 py-2 bg-surface-800/40 border border-white/[0.04] rounded-lg text-xs font-mono text-gray-300 placeholder-gray-600 focus:outline-none focus:border-matrix-400/20" />
        </div>
      )}

      {/* List */}
      {displayItems.length > 0 ? (
        <div className="max-h-64 overflow-y-auto space-y-1.5 pr-1">
          {displayItems.map((sub, i) => {
            const category = sub.category || 'unknown'
            const colorCls = categoryColors[category] || categoryColors.unknown
            const dotCls = categoryDot[category] || 'bg-gray-600'
            const subdomain = sub.subdomain || sub
            const cloudProvider = sub.cloud_provider

            return (
              <div key={i} className={`flex items-center justify-between py-2 px-3 rounded-lg border text-xs font-mono ${colorCls}`}>
                <div className="flex items-center gap-2 min-w-0">
                  <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotCls}`} />
                  <span className="truncate">{subdomain}</span>
                  {sub.predicted && <span className="shrink-0 text-[9px] px-1.5 py-0.5 rounded bg-purple-500/10 border border-purple-500/15 text-purple-400">PREDICTED</span>}
                </div>
                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                  {cloudProvider && <Cloud className="w-3 h-3 opacity-70" />}
                  {category !== 'unknown' && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-black/20">{category}</span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-6">
          <p className="text-sm text-gray-500 font-mono">
            {tab === 'Predicted' ? 'No predicted subdomains' :
             tab === 'Risky' ? 'No risky subdomains found' :
             tab === 'Cloud' ? 'No cloud assets detected' :
             'No subdomains found via Certificate Transparency'}
          </p>
        </div>
      )}

      {/* Cloud assets summary */}
      {tab === 'All' && cloudAssets.length > 0 && (
        <div className="mt-3 pt-3 border-t border-white/[0.04]">
          <div className="flex items-center gap-1.5 mb-2">
            <Cloud className="w-3 h-3 text-sky-400" />
            <p className="text-[10px] font-mono text-sky-400 uppercase tracking-wider">Cloud Providers</p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {[...new Set(cloudAssets.map(a => a.cloud_provider))].map((p, i) => (
              <span key={i} className="px-2 py-1 bg-sky-500/10 border border-sky-500/15 rounded text-[10px] font-mono text-sky-400">{p}</span>
            ))}
          </div>
        </div>
      )}
    </ModuleCard>
  )
}
