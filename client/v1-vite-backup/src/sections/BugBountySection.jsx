import { useState } from 'react'
import { Target, AlertTriangle, Shield, ChevronDown, ChevronUp } from 'lucide-react'

const riskColors = {
  critical: 'text-red-400 bg-red-500/10 border-red-500/20',
  high: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
  medium: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  low: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
}
const riskDot = { critical: 'bg-red-400', high: 'bg-orange-400', medium: 'bg-amber-400', low: 'bg-sky-400' }

const COMMON_ENDPOINTS = [
  { path: '/admin', risk: 'critical' }, { path: '/wp-admin', risk: 'critical' },
  { path: '/.env', risk: 'critical' }, { path: '/.git/', risk: 'critical' },
  { path: '/phpmyadmin', risk: 'critical' }, { path: '/backup.zip', risk: 'critical' },
  { path: '/graphql', risk: 'high' }, { path: '/swagger', risk: 'high' },
  { path: '/actuator', risk: 'critical' }, { path: '/server-status', risk: 'high' },
  { path: '/api/', risk: 'medium' }, { path: '/login', risk: 'medium' },
  { path: '/console', risk: 'critical' }, { path: '/config.yml', risk: 'critical' },
  { path: '/wp-json', risk: 'medium' }, { path: '/redoc', risk: 'medium' },
]

export default function BugBountySection({ data }) {
  const [expanded, setExpanded] = useState(true)
  const risk = data?.risk || {}
  const subdomains = data?.subdomains || {}
  const ports = data?.ports || {}
  const headers = data?.headers || {}
  const github = data?.github || {}
  const graphql = data?.graphql || {}
  const vuln = data?.vuln_sim || {}
  const infra = data?.infra || {}
  const attackSurfaceScore = risk.attack_surface_score ?? 0
  const attackPaths = risk.attack_paths || []
  const sentiment = risk.sentiment || 'UNKNOWN'
  const gaugeColor = attackSurfaceScore > 60 ? '#EF4444' : attackSurfaceScore > 30 ? '#FACC15' : '#00FF9C'
  const sentimentMap = { CRITICAL: 'text-red-400 border-red-400/30 bg-red-400/5', 'AT RISK': 'text-orange-400 border-orange-400/30 bg-orange-400/5', STABLE: 'text-amber-400 border-amber-400/30 bg-amber-400/5', SECURE: 'text-matrix-400 border-matrix-400/30 bg-matrix-400/5' }

  const riskyServices = [
    { name: 'MySQL', port: 3306 }, { name: 'PostgreSQL', port: 5432 },
    { name: 'MongoDB', port: 27017 }, { name: 'Redis', port: 6379 },
    { name: 'RDP', port: 3389 }, { name: 'FTP', port: 21 },
  ].filter(s => ports.open_ports?.some(p => p.port === s.port && p.state === 'open'))

  const infraServices = infra.services_detected || []

  const insights = []
  const adminCount = subdomains.risky_subdomains?.filter(s => ['admin', 'db'].includes(s.tag || s.category)).length || 0
  if (adminCount > 0) insights.push({ text: `${adminCount} admin/DB subdomain(s) discovered — high priority`, risk: 'critical' })
  const missingHeaders = headers.headers?.filter(h => !h.present && h.severity === 'high') || []
  if (missingHeaders.length > 0) insights.push({ text: `Missing ${missingHeaders.slice(0, 2).map(h => h.header).join(', ')} — interception risk`, risk: 'high' })
  const cmsWithCves = (data?.tech?.technologies || []).filter(t => t.potential_cves?.length > 0)
  if (cmsWithCves.length > 0) insights.push({ text: `${cmsWithCves[0].name} ${cmsWithCves[0].version || ''} — ${cmsWithCves[0].potential_cves.length} potential CVE(s)`, risk: 'high' })
  const cloudAssets = subdomains.cloud_assets || []
  if (cloudAssets.length > 0) insights.push({ text: `Cloud assets detected (${[...new Set(cloudAssets.map(a => a.cloud_provider))].join(', ')}) — check permissions`, risk: 'medium' })
  if (github.leaks_found > 0) insights.push({ text: `${github.leaks_found} potential GitHub credential leak(s) — rotate immediately`, risk: 'critical' })
  if (graphql.introspection_enabled) insights.push({ text: 'GraphQL introspection enabled — full schema exposed', risk: 'high' })
  if (vuln.cors?.reflects_origin) insights.push({ text: 'CORS origin reflection detected — session hijack possible', risk: 'critical' })
  if (infra.critical_exposures?.length > 0) insights.push({ text: `${infra.critical_exposures.length} critical infra service(s) exposed (K8s/Docker/Jenkins)`, risk: 'critical' })

  const robotsDisallowed = data?.robots_sitemap?.robots?.disallowed || []
  const endpoints = COMMON_ENDPOINTS.map(ep => ({
    ...ep,
    exposed: robotsDisallowed.some(p => p.includes(ep.path.replace(/\//g, ''))) || (ep.path === '/graphql' && graphql.endpoints_found?.length > 0)
  })).sort((a, b) => (b.exposed ? 1 : 0) - (a.exposed ? 1 : 0))

  return (
    <div className="glass-card animate-slide-up overflow-hidden">
      <div className="relative p-6 border-b border-white/[0.04]">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-red-500/60 to-transparent" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute -inset-1 bg-red-500/20 rounded-lg blur-sm" />
              <div className="relative w-11 h-11 rounded-lg bg-surface-900 border border-red-500/30 flex items-center justify-center">
                <Target className="w-6 h-6 text-red-400" />
              </div>
            </div>
            <div>
              <h3 className="text-base font-display font-bold text-white tracking-wide uppercase">Bug Bounty Recon Mode</h3>
              <p className="text-[11px] font-mono text-gray-500 mt-0.5">LIVE ATTACK SURFACE INTELLIGENCE</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className={`px-3 py-1 rounded-full border text-xs font-bold font-mono tracking-widest ${sentimentMap[sentiment] || sentimentMap.STABLE}`}>{sentiment}</div>
            <button onClick={() => setExpanded(!expanded)} className="p-1.5 rounded-lg hover:bg-white/5 text-gray-500 hover:text-white transition-all">
              {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {expanded && (
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Attack Surface Score Gauge */}
            <div className="bg-surface-900/60 rounded-2xl p-4 border border-white/[0.04] flex flex-col items-center">
              <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-3">Attack Surface Score</p>
              <svg width="100" height="100" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="8" />
                <circle cx="50" cy="50" r="40" fill="none" stroke={gaugeColor} strokeWidth="8"
                  strokeDasharray={`${(attackSurfaceScore / 100) * 251.2} 251.2`} strokeLinecap="round"
                  transform="rotate(-90 50 50)" style={{ filter: `drop-shadow(0 0 6px ${gaugeColor}60)`, transition: 'stroke-dasharray 1s ease' }} />
                <text x="50" y="46" textAnchor="middle" fill={gaugeColor} fontSize="20" fontWeight="bold" fontFamily="monospace">{attackSurfaceScore}</text>
                <text x="50" y="60" textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="monospace">/ 100</text>
              </svg>
              <p className="text-[10px] font-mono text-gray-600">Lower = safer</p>
            </div>

            {/* Risky Services */}
            <div className="bg-surface-900/60 rounded-2xl p-4 border border-white/[0.04]">
              <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-3">Exposed Services</p>
              {riskyServices.length === 0 && infraServices.length === 0 ? (
                <div className="flex items-center gap-2 mt-3"><Shield className="w-4 h-4 text-matrix-400" /><p className="text-xs text-matrix-400 font-mono">No dangerous services open</p></div>
              ) : (
                <div className="space-y-1.5">
                  {riskyServices.map((s, i) => (
                    <div key={i} className="flex items-center justify-between px-2.5 py-1.5 bg-red-500/5 border border-red-500/10 rounded-lg">
                      <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" /><span className="text-xs font-mono text-red-300">{s.name}</span></div>
                      <span className="text-[10px] font-mono text-red-400/60">:{s.port}</span>
                    </div>
                  ))}
                  {infraServices.slice(0, 3).map((s, i) => (
                    <div key={i} className="flex items-center justify-between px-2.5 py-1.5 bg-orange-500/5 border border-orange-500/10 rounded-lg">
                      <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-400" /><span className="text-xs font-mono text-orange-300">{s.name}</span></div>
                      <span className="text-[10px] font-mono text-orange-400/60">{s.risk}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Attack Paths */}
            <div className="bg-surface-900/60 rounded-2xl p-4 border border-white/[0.04]">
              <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-3">Attack Paths ({attackPaths.length})</p>
              {attackPaths.length === 0 ? (
                <div className="flex items-center gap-2 mt-3"><Shield className="w-4 h-4 text-matrix-400" /><p className="text-xs text-matrix-400 font-mono">No exploit chains found</p></div>
              ) : (
                <div className="space-y-1.5">
                  {attackPaths.slice(0, 4).map((p, i) => (
                    <div key={i} className={`px-2.5 py-1.5 rounded-lg border text-[11px] font-mono truncate ${p.severity === 'Critical' ? 'bg-red-500/5 border-red-500/10 text-red-300' : 'bg-orange-500/5 border-orange-500/10 text-orange-300'}`}>
                      <span className="opacity-50 mr-1">{i + 1}.</span>{p.name.split('→')[0].trim()}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {insights.length > 0 && (
            <div>
              <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-3">Recon Insights</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {insights.map((ins, i) => (
                  <div key={i} className={`flex items-start gap-2.5 px-3 py-2.5 rounded-xl border ${ins.risk === 'critical' ? 'bg-red-500/5 border-red-500/10' : ins.risk === 'high' ? 'bg-orange-500/5 border-orange-500/10' : 'bg-amber-500/5 border-amber-500/10'}`}>
                    <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${riskDot[ins.risk]}`} />
                    <p className="text-xs font-mono text-gray-300">{ins.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-3">Common Attack Endpoints</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {endpoints.map((ep, i) => (
                <div key={i} className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-mono ${ep.exposed ? riskColors[ep.risk] : 'bg-surface-800/40 border-white/[0.03] text-gray-600'}`}>
                  <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${ep.exposed ? riskDot[ep.risk] : 'bg-gray-700'}`} />
                  <span className="truncate">{ep.path}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-start gap-3 px-4 py-3 bg-amber-500/5 border border-amber-500/10 rounded-xl">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-[11px] font-mono text-amber-400/80">EDUCATIONAL USE ONLY — Passive reconnaissance only. No active exploitation. Only test domains you own or have written authorization to assess.</p>
          </div>
        </div>
      )}
    </div>
  )
}
