import ModuleCard from '../components/ModuleCard'
import StatusBadge from '../components/StatusBadge'
import { Globe, ExternalLink, AlertTriangle } from 'lucide-react'

export default function WebsiteSection({ data }) {
  const w = data || {}
  if (!w.accessible && !w.issues?.length) return null

  return (
    <ModuleCard title="Website Intelligence" icon={Globe} status={w.risk_level}>
      {w.accessible ? (
        <>
          {/* Metadata */}
          <div className="space-y-3 mb-4">
            {w.title && (
              <div>
                <p className="text-[10px] font-mono text-gray-600 uppercase tracking-wider mb-1">Page Title</p>
                <p className="text-sm text-white font-medium">{w.title}</p>
              </div>
            )}
            {w.description && (
              <div>
                <p className="text-[10px] font-mono text-gray-600 uppercase tracking-wider mb-1">Meta Description</p>
                <p className="text-xs text-gray-400 leading-relaxed">{w.description}</p>
              </div>
            )}
            <div className="grid grid-cols-2 gap-3">
              {w.language && (
                <div className="bg-surface-800/50 rounded-lg p-2.5">
                  <p className="text-[10px] font-mono text-gray-600">Language</p>
                  <p className="text-xs font-mono text-gray-300">{w.language}</p>
                </div>
              )}
              {w.generator && (
                <div className="bg-surface-800/50 rounded-lg p-2.5">
                  <p className="text-[10px] font-mono text-gray-600">Generator</p>
                  <p className="text-xs font-mono text-gray-300">{w.generator}</p>
                </div>
              )}
              {w.status_code && (
                <div className="bg-surface-800/50 rounded-lg p-2.5">
                  <p className="text-[10px] font-mono text-gray-600">Status Code</p>
                  <p className="text-xs font-mono text-matrix-400">{w.status_code}</p>
                </div>
              )}
              {w.favicon && (
                <div className="bg-surface-800/50 rounded-lg p-2.5 flex items-center gap-2">
                  <img src={w.favicon} alt="favicon" className="w-4 h-4" onError={e => e.target.style.display = 'none'} />
                  <p className="text-[10px] font-mono text-gray-600">Favicon detected</p>
                </div>
              )}
            </div>
          </div>

          {/* Phishing analysis */}
          {w.phishing_score > 0 && (
            <div className="bg-red-500/5 border border-red-500/10 rounded-xl p-4 mt-3">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <span className="text-xs font-heading font-semibold text-red-400 uppercase tracking-wide">
                  Phishing Indicators ({w.phishing_score}/100)
                </span>
              </div>
              <div className="space-y-1.5">
                {w.phishing_indicators.map((ind, i) => (
                  <p key={i} className="text-xs text-red-300/80 font-mono flex items-start gap-2">
                    <span className="text-red-400">•</span> {ind}
                  </p>
                ))}
              </div>
            </div>
          )}

          {w.final_url && (
            <div className="mt-3 flex items-center gap-2 text-xs font-mono text-gray-600">
              <ExternalLink className="w-3 h-3" />
              <span className="truncate">{w.final_url}</span>
            </div>
          )}
        </>
      ) : (
        <p className="text-sm text-gray-500 text-center py-4 font-mono">Website not accessible</p>
      )}
    </ModuleCard>
  )
}
