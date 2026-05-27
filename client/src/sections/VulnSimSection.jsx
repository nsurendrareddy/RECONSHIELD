'use client'
import { useState } from 'react'
import { ShieldAlert, AlertTriangle, Lock } from 'lucide-react'

const LEGAL_BADGE = (
  <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-amber-500/10 border border-amber-500/20 rounded text-[10px] font-mono text-amber-400">
    <Lock className="w-2.5 h-2.5" /> SIMULATION MODE — NO REAL EXPLOITS
  </div>
)

function VulnPanel({ title, data = {}, payloads = [], remediation = [], color = 'red' }) {
  const [open, setOpen] = useState(false)
  const colorMap = { red: 'red', orange: 'orange', amber: 'amber', sky: 'sky', purple: 'purple' }
  const c = colorMap[color] || 'red'
  return (
    <div className={`bg-surface-900/60 border border-${c}-500/15 rounded-2xl overflow-hidden`}>
      <button onClick={() => setOpen(!open)} className={`w-full flex items-center justify-between px-4 py-3 hover:bg-${c}-500/5 transition-all`}>
        <div className="flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full bg-${c}-400 ${data.risk === 'High' || data.risk === 'Critical' ? 'animate-pulse' : ''}`} />
          <span className={`text-sm font-semibold text-${c}-400`}>{title}</span>
          {data.risk && <span className={`text-[10px] font-mono px-2 py-0.5 rounded bg-${c}-500/10 text-${c}-400`}>{data.risk}</span>}
        </div>
        <span className="text-gray-600 text-xs font-mono">{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div className="px-4 pb-4 space-y-4 border-t border-white/[0.04]">
          <div className="pt-3">{LEGAL_BADGE}</div>
          {data.indicators?.length > 0 && (
            <div>
              <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-2">🔍 Detection Method</p>
              <div className="space-y-1.5">
                {data.indicators.map((ind, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs font-mono text-gray-400">
                    <span className="text-matrix-400 mt-0.5">›</span>{ind}
                  </div>
                ))}
              </div>
            </div>
          )}
          {payloads.length > 0 && (
            <div>
              <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-2">📝 Example Payloads (Educational Only)</p>
              <div className="space-y-2">
                {payloads.slice(0, 3).map((pl, i) => (
                  <div key={i} className="bg-surface-950/80 border border-white/[0.04] rounded-lg p-3">
                    <p className="text-[10px] font-mono text-gray-500 mb-1">{pl.type} — Target: {pl.target}</p>
                    <code className={`text-xs font-mono text-${c}-300 break-all`}>{pl.payload}</code>
                  </div>
                ))}
              </div>
            </div>
          )}
          {data.issues?.length > 0 && (
            <div>
              <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-2">⚠️ Issues Found</p>
              <div className="space-y-1.5">
                {data.issues.map((iss, i) => (
                  <div key={i} className={`flex items-start gap-2 px-3 py-2 bg-${c}-500/5 border border-${c}-500/10 rounded-lg text-xs font-mono text-${c}-300`}>
                    <span className="shrink-0">!</span>{iss}
                  </div>
                ))}
              </div>
            </div>
          )}
          {remediation.length > 0 && (
            <div>
              <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-2">🛡️ Remediation Steps</p>
              <div className="space-y-1.5">
                {remediation.map((r, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs font-mono text-matrix-400">
                    <span className="shrink-0 text-matrix-600">✓</span>{r}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function CorsPanel({ data = {} }) {
  const cors = data.cors || {}
  const issues = cors.issues || []
  const isRisky = cors.reflects_origin || cors.allows_null || cors.allows_wildcard
  return (
    <VulnPanel
      title="CORS Deep Dive"
      data={{ risk: isRisky ? 'High' : 'Low', indicators: ['OPTIONS request sent with crafted Origin header', 'Response analyzed for Access-Control-Allow-Origin reflection'], issues }}
      payloads={cors.payloads || []}
      remediation={['Whitelist specific trusted origins', 'Never reflect arbitrary Origin header values', 'Do not allow null origin', 'Cannot use wildcard with credentials']}
      color="orange"
    />
  )
}

function CspPanel({ data = {} }) {
  const csp = data.csp_eval || {}
  return (
    <VulnPanel
      title={`CSP Evaluator — Grade ${csp.grade || '?'}`}
      data={{
        risk: csp.grade === 'F' || csp.grade === 'D' ? 'High' : csp.grade === 'C' ? 'Medium' : 'Low',
        indicators: [
          `CSP Score: ${csp.score || 0}/100 (Grade ${csp.grade || '?'})`,
          ...(csp.missing_directives || []).map(d => `Missing directive: ${d}`),
          ...(csp.unsafe_values || []).map(v => `Unsafe value '${v.value}' in ${v.directive}`),
        ],
        issues: csp.issues || [],
      }}
      payloads={[]}
      remediation={['Add missing directives: frame-ancestors, base-uri, form-action', "Remove 'unsafe-inline' from script-src", "Remove 'unsafe-eval'", 'Use nonces or hashes instead of unsafe-inline']}
      color="purple"
    />
  )
}

function WafPanel({ data = {} }) {
  const waf = data.waf || {}
  return (
    <VulnPanel
      title={`WAF Detection — ${waf.vendor || 'Not Detected'}`}
      data={{ risk: waf.detected ? 'Low' : 'Medium', indicators: waf.evidence?.length > 0 ? waf.evidence : ['No WAF signatures detected in response headers'], issues: waf.detected ? [] : ['No WAF detected — application directly accessible'] }}
      payloads={[]}
      remediation={waf.detected ? ['Keep WAF rules updated', 'Enable bot protection', 'Monitor WAF logs'] : ['Consider deploying Cloudflare, AWS WAF, or ModSecurity', 'Implement rate limiting at application layer', 'Enable DDoS protection']}
      color={waf.detected ? 'sky' : 'amber'}
    />
  )
}

export default function VulnSimSection({ data }) {
  const vuln = data?.vuln_sim || {}
  if (!vuln.sqli && !vuln.xss && !vuln.cors) return null

  return (
    <div className="glass-card animate-slide-up overflow-hidden">
      <div className="relative p-6 border-b border-white/[0.04]">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute -inset-1 bg-purple-500/15 rounded-lg blur-sm" />
            <div className="relative w-11 h-11 rounded-lg bg-surface-900 border border-purple-500/25 flex items-center justify-center">
              <ShieldAlert className="w-6 h-6 text-purple-400" />
            </div>
          </div>
          <div>
            <h3 className="text-base font-display font-bold text-white tracking-wide uppercase">exposure assessment</h3>
            <p className="text-[11px] font-mono text-gray-500 mt-0.5">SIMULATED CHECKS — EDUCATIONAL ONLY</p>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2 px-3 py-2 bg-amber-500/5 border border-amber-500/15 rounded-xl">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          <p className="text-[11px] font-mono text-amber-400/90">
            🔒 SIMULATION MODE — No payloads were sent. All vulnerability checks are educational assessments based on passive analysis. Real pentesting requires explicit written authorization.
          </p>
        </div>
      </div>

      <div className="p-6 space-y-3">
        <VulnPanel
          title="SQL Injection Assessment"
          data={vuln.sqli || {}}
          payloads={vuln.sqli?.payloads || []}
          remediation={vuln.sqli?.remediation || []}
          color="red"
        />
        <VulnPanel
          title="XSS Assessment"
          data={vuln.xss || {}}
          payloads={vuln.xss?.payloads || []}
          remediation={vuln.xss?.remediation || []}
          color="orange"
        />
        <CorsPanel data={vuln} />
        <CspPanel data={vuln} />
        <WafPanel data={vuln} />
        <VulnPanel
          title="SSRF Discovery"
          data={vuln.ssrf || {}}
          payloads={vuln.ssrf?.payloads || []}
          remediation={vuln.ssrf?.remediation || []}
          color="red"
        />
        <VulnPanel
          title="XXE Injection"
          data={vuln.xxe || {}}
          payloads={vuln.xxe?.payloads || []}
          remediation={vuln.xxe?.remediation || []}
          color="amber"
        />
        <VulnPanel
          title="Directory Bruteforce Simulation"
          data={{ risk: 'Info', indicators: ['High-risk path wordlist shown below — no actual requests made'], issues: [] }}
          payloads={(vuln.directory_sim?.high_risk_paths || []).slice(0, 5).map(p => ({ payload: p, type: 'Path simulation', target: 'Web server' }))}
          remediation={vuln.directory_sim?.remediation || []}
          color="sky"
        />
      </div>
    </div>
  )
}
