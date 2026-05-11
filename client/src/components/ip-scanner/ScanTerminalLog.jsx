'use client'
import { useState, useEffect, useRef } from 'react'

const PHASES = [
  { id: 1, icon: '🌐', label: 'IP Intelligence', key: 'ip_info' },
  { id: 2, icon: '🏢', label: 'ASN & ISP Data', key: 'ip_info' },
  { id: 3, icon: '📍', label: 'Geo-Coordinates', key: 'ip_info' },
  { id: 4, icon: '🏢', label: 'Reverse DNS', key: 'dns_info' },
  { id: 5, icon: '📋', label: 'DNS Enumeration', key: 'dns_info' },
  { id: 6, icon: '🔌', label: 'Port Exposure', key: 'ports' },
  { id: 7, icon: '🔐', label: 'SSL/TLS Analysis', key: 'ssl' },
  { id: 8, icon: '🛡️', label: 'Security Headers', key: 'headers' },
  { id: 9, icon: '🎯', label: 'Threat Reputation', key: 'threat' },
  { id: 10, icon: '💻', label: 'OS Prediction', key: 'os_fingerprint' },
  { id: 11, icon: '📊', label: 'Risk Calculation', key: 'risk_score' },
]

function getDetail(data, phase) {
  if (!data) return ''
  const d = data
  switch (phase.id) {
    case 1: return `${d.ip_info?.ip || '---'} [${d.ip_info?.country || 'Unknown'}]`
    case 2: return `${d.ip_info?.asn || '---'} (${d.ip_info?.isp || 'Unknown'})`
    case 3: return `${d.ip_info?.city || '---'}, LAT:${d.ip_info?.lat?.toFixed(2) || '0'}, LON:${d.ip_info?.lon?.toFixed(2) || '0'}`
    case 4: return d.dns_info?.reverse_dns?.[0]?.ptr || 'No PTR records found'
    case 5: { 
      const counts = Object.keys(d.dns_info?.records || {}).filter(k => d.dns_info.records[k].length > 0).length
      return `${counts} record types identified`
    }
    case 6: return `${d.ports?.open_count || 0} open ports detected`
    case 7: return d.ssl?.has_ssl ? `${d.ssl.cipher?.protocol || 'TLS'} - ${d.ssl.risk_level || 'Safe'}` : 'No SSL detected'
    case 8: return `Grade: ${d.headers?.grade || 'F'} (${d.headers?.score || 0}/100)`
    case 9: return `Threat Score: ${d.threat?.score || 0}/100 [${d.threat?.threat_type || 'Clean'}]`
    case 10: return `${d.os_fingerprint?.os_prediction || 'Unknown'} (Conf: ${d.os_fingerprint?.confidence || 0}%)`
    case 11: return `Final Score: ${d.risk_score?.score || 0} [${d.risk_score?.level || 'Safe'}]`
    default: return ''
  }
}

export default function ScanTerminalLog({ scanning, data, target }) {
  const [visibleLines, setVisibleLines] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    if (scanning) { 
      setVisibleLines(0)
      return 
    }
    if (!data) return
    
    let i = 0
    const timer = setInterval(() => {
      i++
      setVisibleLines(i)
      if (i >= PHASES.length + 2) clearInterval(timer)
    }, 150) // Slightly slower for 'thinking' effect
    return () => clearInterval(timer)
  }, [data, scanning])

  useEffect(() => {
    if (ref.current) {
      const el = ref.current;
      requestAnimationFrame(() => {
        el.scrollTop = el.scrollHeight;
      });
    }
  }, [visibleLines])

  if (!data && !scanning) return null

  return (
    <div className="terminal-card p-0 overflow-hidden border-matrix-400/20 bg-surface-950/80 backdrop-blur-md">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5 bg-surface-900/50">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/40 border border-red-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40 border border-yellow-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/40 border border-green-500/50" />
          </div>
          <span className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">Recon Terminal v2.4</span>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-1.5 h-1.5 rounded-full ${scanning ? 'bg-matrix-400 animate-pulse' : 'bg-gray-600'}`} />
          <span className="text-[9px] text-gray-600 font-mono uppercase">{scanning ? 'Active' : 'Idle'}</span>
        </div>
      </div>
      <div ref={ref} className="p-5 font-mono text-[11px] max-h-[420px] overflow-y-auto custom-scrollbar" style={{ position: 'relative', zIndex: 20 }}>
        {scanning && (
          <div className="space-y-2">
            <div className="text-matrix-400 opacity-80">
              <p className="mb-1 text-xs font-bold tracking-tight">INITIALIZING RECONNAISSANCE ENGINE...</p>
              <p className="text-matrix-400/60">TARGET_VECTOR: {target || 'BROADCAST'}</p>
              <p className="text-matrix-400/60">TIMESTAMP: {new Date().toISOString()}</p>
            </div>
            <div className="flex items-center gap-3 mt-4 text-matrix-400">
              <span className="animate-spin text-sm">/</span>
              <p className="animate-pulse">Analyzing network topology and harvesting intelligence...</p>
            </div>
            <div className="mt-4 pt-4 border-t border-matrix-400/10 grid grid-cols-2 gap-2 opacity-40">
               <p>[LOG] Loading IP_INTEL_MODULE... OK</p>
               <p>[LOG] Loading DNS_SCAN_MODULE... OK</p>
               <p>[LOG] Loading SSL_PROBE_MODULE... OK</p>
               <p>[LOG] Loading PORT_CHK_MODULE... OK</p>
            </div>
          </div>
        )}
        
        {data && (
          <div className="space-y-1.5">
            {visibleLines >= 1 && (
              <div className="text-matrix-400/80 mb-3">
                <p className="font-bold text-matrix-400">SESSION_COMPLETE: {target}</p>
                <p className="text-[10px] opacity-60">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</p>
              </div>
            )}
            
            {PHASES.map((phase, idx) => visibleLines >= idx + 2 && (
              <p key={phase.id} className="flex items-start gap-3 group">
                <span className="text-matrix-400/30 font-bold w-4 shrink-0">{(idx + 1).toString().padStart(2, '0')}</span>
                <span className="text-gray-400 group-hover:text-gray-200 transition-colors truncate w-32 shrink-0">{phase.label}</span>
                <span className="text-matrix-400 shrink-0">»</span>
                <span className="text-gray-500 font-medium break-all">{getDetail(data, phase)}</span>
              </p>
            ))}
            
            {visibleLines >= PHASES.length + 2 && (
              <div className="mt-6 pt-4 border-t border-matrix-400/10">
                <div className="flex items-center justify-between text-matrix-400">
                  <p className="font-bold tracking-wider">REPORT_GENERATED_SUCCESSFULLY</p>
                  <p className="text-[10px] px-2 py-0.5 bg-matrix-400/10 rounded">PASSIVE_RECON</p>
                </div>
                <p className="text-[9px] text-gray-600 mt-2 italic">Data collected via distributed scanners and public databases. No direct intrusion detected.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
