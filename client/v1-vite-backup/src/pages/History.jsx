import { useState, useEffect } from 'react'
import { getHistory, deleteScan, downloadExport } from '../utils/api'
import { History as HistoryIcon, Trash2, Download, ExternalLink, RefreshCw, Database, Loader2 } from 'lucide-react'
import StatusBadge from '../components/StatusBadge'
import { useAuth } from '../context/AuthContext'

export default function History() {
  const [scans, setScans] = useState([])
  const [loading, setLoading] = useState(true)
  const [downloadingId, setDownloadingId] = useState(null)
  const { token } = useAuth()

  const load = async () => {
    setLoading(true)
    try { const data = await getHistory(); setScans(data.scans || []) } catch (e) {}
    setLoading(false)
  }
  useEffect(() => { load() }, [])

  const handleDelete = async (id) => {
    if (!confirm('Delete this scan record?')) return
    try { await deleteScan(id); setScans(s => s.filter(scan => scan.id !== id)) } catch (e) { alert('Failed to delete') }
  }

  const handleDownload = async (id, type) => {
    if (!token) return alert('Please login to download reports')
    setDownloadingId(`${id}-${type}`)
    try {
      await downloadExport(id, type, token)
    } catch (e) {
      alert('Failed to download report')
    } finally {
      setDownloadingId(null)
    }
  }

  const gradeColors = {
    A: 'text-matrix-400 bg-matrix-400/8 border-matrix-400/15',
    B: 'text-cyan-400 bg-cyan-400/8 border-cyan-400/15',
    C: 'text-amber-400 bg-amber-400/8 border-amber-400/15',
    D: 'text-orange-400 bg-orange-400/8 border-orange-400/15',
    F: 'text-red-400 bg-red-400/8 border-red-400/15',
  }

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-neon-500/10 border border-neon-500/20 flex items-center justify-center">
            <Database className="w-5 h-5 text-neon-400" />
          </div>
          <div>
            <h2 className="text-xl font-display font-bold text-white tracking-wider uppercase">Scan Database</h2>
            <p className="text-xs font-mono text-gray-600">{scans.length} record{scans.length !== 1 ? 's' : ''}</p>
          </div>
        </div>
        <button onClick={load} className="p-2.5 rounded-lg text-gray-600 hover:text-matrix-400 hover:bg-white/[0.02] transition-all border border-white/5">
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="skeleton h-20 rounded-xl" />)}</div>
      ) : scans.length === 0 ? (
        <div className="text-center py-20 glass-card">
          <Database className="w-12 h-12 text-gray-700 mx-auto mb-4" />
          <p className="text-gray-400 font-heading text-lg tracking-wide">No scan records</p>
          <p className="text-gray-600 text-xs font-mono mt-1">Execute a scan from the Dashboard</p>
        </div>
      ) : (
        <div className="space-y-3">
          {scans.map((scan) => (
            <div key={scan.id} className="glass-card p-4 flex items-center gap-4 group">
              <div className={`w-12 h-12 rounded-xl border flex items-center justify-center font-display text-lg font-bold shrink-0 ${gradeColors[scan.grade] || 'text-gray-500 bg-gray-500/8 border-gray-500/15'}`}>
                {scan.grade || '—'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-mono font-semibold text-white truncate tracking-wide">{scan.domain}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-[10px] font-mono text-gray-600">{scan.created_at ? new Date(scan.created_at).toLocaleDateString() : '—'}</span>
                  {scan.score != null && <span className="text-[10px] font-mono text-gray-500">Score: {scan.score}</span>}
                  <StatusBadge status={scan.status === 'completed' ? 'pass' : scan.status === 'running' ? 'warning' : 'fail'} label={scan.status} />
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0 opacity-40 group-hover:opacity-100 transition-opacity">
                {scan.status === 'completed' && (
                  <>
                    <button onClick={() => handleDownload(scan.id, 'json')} disabled={!!downloadingId} className="p-2 rounded-lg text-gray-500 hover:text-matrix-400 hover:bg-white/[0.03] transition-all disabled:opacity-50" title="JSON">
                      {downloadingId === `${scan.id}-json` ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                    </button>
                    <button onClick={() => handleDownload(scan.id, 'pdf')} disabled={!!downloadingId} className="p-2 rounded-lg text-gray-500 hover:text-neon-400 hover:bg-white/[0.03] transition-all disabled:opacity-50" title="PDF">
                      {downloadingId === `${scan.id}-pdf` ? <Loader2 className="w-4 h-4 animate-spin" /> : <ExternalLink className="w-4 h-4" />}
                    </button>
                  </>
                )}
                <button onClick={() => handleDelete(scan.id)} className="p-2 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-400/5 transition-all" title="Delete">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
