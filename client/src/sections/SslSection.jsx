import ModuleCard from '../components/ModuleCard'
import StatusBadge from '../components/StatusBadge'
import { Lock } from 'lucide-react'

export default function SslSection({ data }) {
  const s = data || {}
  const cert = s.certificate || {}

  return (
    <ModuleCard title="SSL/TLS Analysis" icon={Lock} status={s.risk_level}>
      {!s.has_ssl ? (
        <div className="text-center py-6">
          <p className="text-red-400 font-medium">No SSL/TLS detected</p>
          <p className="text-sm text-gray-500 mt-1">This website does not support HTTPS</p>
        </div>
      ) : (
        <>
          {/* Certificate info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              {[
                ['Subject', cert.subject],
                ['Issuer', cert.issuer],
                ['Issuer Org', cert.issuer_org],
                ['Algorithm', cert.signature_algorithm],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-xs text-gray-400">{label}</span>
                  <span className="text-xs font-medium text-gray-200 font-mono">{value || 'N/A'}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              {[
                ['Valid From', cert.not_before?.split('T')[0]],
                ['Valid Until', cert.not_after?.split('T')[0]],
                ['Version', cert.version],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-xs text-gray-400">{label}</span>
                  <span className="text-xs font-medium text-gray-200 font-mono">{value || 'N/A'}</span>
                </div>
              ))}
              {/* Expiry countdown */}
              <div className="flex justify-between py-1.5">
                <span className="text-xs text-gray-400">Days Remaining</span>
                <span className={`text-xs font-bold ${
                  cert.days_remaining > 60 ? 'text-emerald-400' :
                  cert.days_remaining > 14 ? 'text-amber-400' : 'text-red-400'
                }`}>
                  {cert.days_remaining ?? 'N/A'}
                </span>
              </div>
            </div>
          </div>

          {/* Cipher & Protocol */}
          {s.cipher && (
            <div className="bg-surface-800/50 rounded-xl p-3 mb-4">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Connection</p>
              <div className="flex flex-wrap gap-3 text-xs font-mono text-gray-300">
                <span>Protocol: <strong className="text-cyber-400">{s.cipher.protocol}</strong></span>
                <span>Cipher: <strong className="text-cyber-400">{s.cipher.name}</strong></span>
                {s.cipher.bits && <span>Bits: <strong className="text-cyber-400">{s.cipher.bits}</strong></span>}
              </div>
            </div>
          )}

          {/* HTTPS redirect */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm text-gray-400">HTTPS Redirect:</span>
            <StatusBadge status={s.https_redirect ? 'pass' : 'fail'} label={s.https_redirect ? 'Enabled' : 'Not Enforced'} />
          </div>

          {/* SANs */}
          {cert.sans?.length > 0 && (
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Subject Alternative Names ({cert.sans.length})</p>
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                {cert.sans.map((san, i) => (
                  <span key={i} className="text-xs font-mono bg-surface-700/50 px-2 py-0.5 rounded text-gray-400">{san}</span>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Issues */}
      {s.issues?.length > 0 && (
        <div className="mt-4 space-y-2">
          {s.issues.map((issue, i) => (
            <p key={i} className="text-xs text-amber-400 flex items-start gap-2"><span>⚠</span>{issue}</p>
          ))}
        </div>
      )}
    </ModuleCard>
  )
}
