export default function StatusBadge({ status, label }) {
  const styles = {
    pass: 'bg-matrix-400/8 text-matrix-400 border-matrix-400/15',
    fail: 'bg-red-400/8 text-red-400 border-red-400/15',
    warning: 'bg-amber-400/8 text-amber-400 border-amber-400/15',
    info: 'bg-cyan-400/8 text-cyan-400 border-cyan-400/15',
    Low: 'bg-matrix-400/8 text-matrix-400 border-matrix-400/15',
    Medium: 'bg-amber-400/8 text-amber-400 border-amber-400/15',
    High: 'bg-red-400/8 text-red-400 border-red-400/15',
    critical: 'bg-red-400/8 text-red-400 border-red-400/15',
  }
  const icons = { pass: '✓', fail: '✗', warning: '!', Low: '✓', Medium: '!', High: '✗', critical: '✗', info: 'i' }

  return (
    <span className={`inline-flex items-center gap-1.5 text-[10px] font-mono font-medium px-2.5 py-1 rounded-md border ${styles[status] || styles.info}`}>
      <span>{icons[status] || '•'}</span>
      {label || status}
    </span>
  )
}
