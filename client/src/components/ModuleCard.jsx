'use client'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

export default function ModuleCard({ title, icon: Icon, status, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen)

  const statusColors = {
    Low: 'bg-matrix-400/8 text-matrix-400 border-matrix-400/15',
    Medium: 'bg-amber-400/8 text-amber-400 border-amber-400/15',
    High: 'bg-red-400/8 text-red-400 border-red-400/15',
    pass: 'bg-matrix-400/8 text-matrix-400 border-matrix-400/15',
    warning: 'bg-amber-400/8 text-amber-400 border-amber-400/15',
    fail: 'bg-red-400/8 text-red-400 border-red-400/15',
  }

  return (
    <div className="glass-card animate-slide-up overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.01] transition-colors"
      >
        <div className="flex items-center gap-3">
          {Icon && (
            <div className="w-9 h-9 rounded-lg bg-matrix-400/5 border border-matrix-400/10 flex items-center justify-center">
              <Icon className="w-4.5 h-4.5 text-matrix-400" />
            </div>
          )}
          <h3 className="text-sm font-heading font-semibold text-white tracking-wide uppercase">{title}</h3>
        </div>
        <div className="flex items-center gap-3">
          {status && (
            <span className={`text-[10px] font-mono font-medium px-2.5 py-1 rounded-md border ${statusColors[status] || statusColors.Low}`}>
              {status}
            </span>
          )}
          {open ? <ChevronUp className="w-4 h-4 text-gray-600" /> : <ChevronDown className="w-4 h-4 text-gray-600" />}
        </div>
      </button>
      {open && <div className="px-5 pb-5 border-t border-white/[0.03] pt-4">{children}</div>}
    </div>
  )
}
