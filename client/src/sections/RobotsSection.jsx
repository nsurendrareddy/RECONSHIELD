import ModuleCard from '../components/ModuleCard'
import { FileText, AlertTriangle, ExternalLink } from 'lucide-react'

function PathBadge({ path, category }) {
  const catColors = {
    admin: 'text-red-400 bg-red-500/10 border-red-500/15',
    api: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/15',
    debug: 'text-orange-400 bg-orange-500/10 border-orange-500/15',
    backup: 'text-red-400 bg-red-500/10 border-red-500/15',
    config: 'text-red-400 bg-red-500/10 border-red-500/15',
    git: 'text-red-400 bg-red-500/10 border-red-500/15',
    default: 'text-amber-400 bg-amber-500/10 border-amber-500/15',
  }
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded border text-[10px] font-mono ${catColors[category] || catColors.default}`}>
      {path}
    </span>
  )
}

export default function RobotsSection({ data }) {
  const r = data?.robots_sitemap || {}
  const robots = r.robots || {}
  const sitemap = r.sitemap || {}
  if (!robots.accessible && !sitemap.accessible) return null

  return (
    <ModuleCard title="robots.txt & Sitemap" icon={FileText} status={r.risk_level}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* robots.txt */}
        <div className="bg-surface-800/40 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-2 h-2 rounded-full ${robots.accessible ? 'bg-matrix-400' : 'bg-gray-600'}`} />
            <p className="text-xs font-semibold text-gray-300">robots.txt</p>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${robots.accessible ? 'bg-matrix-400/10 text-matrix-400' : 'bg-gray-700 text-gray-500'}`}>
              {robots.accessible ? 'Found' : 'Not Found'}
            </span>
          </div>

          {robots.accessible && (
            <>
              {robots.sensitive_paths?.length > 0 && (
                <div className="mb-3">
                  <div className="flex items-center gap-1.5 mb-2">
                    <AlertTriangle className="w-3 h-3 text-red-400" />
                    <p className="text-[10px] font-mono text-red-400 uppercase tracking-wider">Sensitive Paths Exposed</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {robots.sensitive_paths.map((sp, i) => (
                      <PathBadge key={i} path={sp.path} category={sp.category} />
                    ))}
                  </div>
                </div>
              )}
              <div className="space-y-2">
                {robots.disallowed?.length > 0 && (
                  <div>
                    <p className="text-[10px] font-mono text-gray-500 mb-1">Disallowed ({robots.disallowed.length})</p>
                    <div className="max-h-24 overflow-y-auto space-y-0.5">
                      {robots.disallowed.slice(0, 10).map((p, i) => (
                        <p key={i} className="text-[11px] font-mono text-gray-400">› {p}</p>
                      ))}
                    </div>
                  </div>
                )}
                {robots.sitemaps?.length > 0 && (
                  <div>
                    <p className="text-[10px] font-mono text-gray-500 mb-1">Sitemap References</p>
                    {robots.sitemaps.slice(0, 3).map((s, i) => (
                      <a key={i} href={s} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[11px] font-mono text-cyber-400 hover:text-cyber-300">
                        <ExternalLink className="w-2.5 h-2.5" />{s.length > 50 ? s.slice(0, 50) + '…' : s}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* sitemap.xml */}
        <div className="bg-surface-800/40 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-2 h-2 rounded-full ${sitemap.accessible ? 'bg-cyber-400' : 'bg-gray-600'}`} />
            <p className="text-xs font-semibold text-gray-300">sitemap.xml</p>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${sitemap.accessible ? 'bg-cyber-400/10 text-cyber-400' : 'bg-gray-700 text-gray-500'}`}>
              {sitemap.accessible ? `${sitemap.url_count} URLs` : 'Not Found'}
            </span>
          </div>

          {sitemap.accessible && (
            <>
              {sitemap.unusual_entries?.length > 0 && (
                <div className="mb-3 p-2 bg-orange-500/5 border border-orange-500/10 rounded-lg">
                  <p className="text-[10px] font-mono text-orange-400 mb-1">⚠ Unusual Entries ({sitemap.unusual_entries.length})</p>
                  {sitemap.unusual_entries.slice(0, 3).map((url, i) => (
                    <p key={i} className="text-[11px] font-mono text-orange-300/80 truncate">› {url}</p>
                  ))}
                </div>
              )}
              {sitemap.urls?.length > 0 && (
                <div>
                  <p className="text-[10px] font-mono text-gray-500 mb-1">Sample URLs</p>
                  <div className="max-h-28 overflow-y-auto space-y-0.5">
                    {sitemap.urls.slice(0, 8).map((url, i) => (
                      <p key={i} className="text-[11px] font-mono text-gray-500 truncate">› {url}</p>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </ModuleCard>
  )
}
