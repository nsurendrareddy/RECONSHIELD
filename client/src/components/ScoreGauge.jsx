import { useEffect, useState } from 'react'

function getColor(score) {
  if (score >= 80) return { main: '#00FF9C', bg: 'rgba(0,255,156,0.08)', label: 'SECURE' }
  if (score >= 65) return { main: '#00E5FF', bg: 'rgba(0,229,255,0.08)', label: 'GOOD' }
  if (score >= 50) return { main: '#FACC15', bg: 'rgba(250,204,21,0.08)', label: 'MODERATE' }
  if (score >= 30) return { main: '#F97316', bg: 'rgba(249,115,22,0.08)', label: 'WEAK' }
  return { main: '#EF4444', bg: 'rgba(239,68,68,0.08)', label: 'CRITICAL' }
}

export default function ScoreGauge({ score = 0, grade = '?', size = 200 }) {
  const [val, setVal] = useState(0)
  const c = getColor(score)
  const r = (size - 24) / 2
  const circ = 2 * Math.PI * r
  const progress = (val / 100) * circ

  useEffect(() => {
    const start = performance.now()
    const dur = 1500
    function tick(now) {
      const p = Math.min((now - start) / dur, 1)
      setVal(Math.round((1 - Math.pow(1 - p, 4)) * score))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [score])

  return (
    <div className="flex flex-col items-center relative">
      <svg width={size} height={size} className="-rotate-90">
        {/* Track */}
        <circle cx={size/2} cy={size/2} r={r} stroke="rgba(255,255,255,0.03)" strokeWidth="6" fill="none" />
        {/* Glow track */}
        <circle cx={size/2} cy={size/2} r={r} stroke={c.main} strokeWidth="6" fill="none"
          strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={circ - progress}
          style={{ filter: `drop-shadow(0 0 12px ${c.main}50)`, transition: 'stroke-dashoffset 0.2s ease' }} />
        {/* Inner ring */}
        <circle cx={size/2} cy={size/2} r={r - 14} stroke="rgba(255,255,255,0.02)" strokeWidth="1" fill="none" />
      </svg>
      {/* Center */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-5xl font-black tracking-wider" style={{ color: c.main, textShadow: `0 0 20px ${c.main}40` }}>
          {val}
        </span>
        <span className="text-[10px] font-mono text-gray-600 tracking-widest mt-0.5">/ 100</span>
      </div>
      {/* Grade + Label */}
      <div className="flex items-center gap-3 mt-4">
        <span className="font-display text-2xl font-black px-4 py-1 rounded-lg border" style={{ color: c.main, borderColor: `${c.main}30`, background: c.bg }}>
          {grade}
        </span>
        <span className="text-xs font-mono tracking-widest" style={{ color: c.main }}>{c.label}</span>
      </div>
    </div>
  )
}
