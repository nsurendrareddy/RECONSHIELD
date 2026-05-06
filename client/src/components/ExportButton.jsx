import { useState } from 'react'
import { Download, Lock, Loader2 } from 'lucide-react'
import { downloadExport } from '../utils/api'
import { useAuth } from '../context/AuthContext'

export default function ExportButton({ scanId, onLockClick }) {
  const { token } = useAuth()
  const [downloading, setDownloading] = useState(null)
  
  if (!scanId) return null

  const handleExport = async (e, type) => {
    e.preventDefault()
    if (!token) {
      onLockClick()
      return
    }
    
    setDownloading(type)
    try {
      await downloadExport(scanId, type, token)
    } catch (err) {
      console.error('Download failed:', err)
      alert('Failed to download report. Please try again.')
    } finally {
      setDownloading(null)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <button 
        onClick={(e) => handleExport(e, 'json')}
        disabled={!!downloading}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-700 text-[11px] font-mono text-gray-400 hover:text-matrix-400 hover:bg-surface-600 transition-all border border-white/5 disabled:opacity-50">
        {!token ? <Lock className="w-3 h-3 text-amber-500/70" /> : downloading === 'json' ? <Loader2 className="w-3 h-3 animate-spin" /> : <Download className="w-3 h-3" />} .json
      </button>
      <button 
        onClick={(e) => handleExport(e, 'pdf')}
        disabled={!!downloading}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-matrix-400/10 text-[11px] font-mono text-matrix-400 hover:bg-matrix-400/15 transition-all border border-matrix-400/15 disabled:opacity-50">
        {!token ? <Lock className="w-3 h-3 text-amber-500/70" /> : downloading === 'pdf' ? <Loader2 className="w-3 h-3 animate-spin" /> : <Download className="w-3 h-3" />} .pdf
      </button>
    </div>
  )
}
