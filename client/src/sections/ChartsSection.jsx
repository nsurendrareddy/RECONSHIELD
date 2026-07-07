import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts'
import { BarChart3 } from 'lucide-react'

const COLORS = { critical: '#EF4444', warning: '#FACC15', info: '#00E5FF', pass: '#00FF9C' }

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-surface-800 border border-matrix-400/15 rounded-lg px-3 py-2 text-xs font-mono shadow-xl">
      <span className="text-white">{payload[0].name || payload[0].payload?.subject}: </span>
      <span className="text-matrix-400 font-bold">{payload[0].value}</span>
    </div>
  )
}

export default function ChartsSection({ data }) {
  const risk = data?.risk || {}
  const stats = risk.stats || {}
  const headers = data?.headers || {}
  const ports = data?.ports || {}

  // Risk distribution pie
  const vulnData = [
    { name: 'Critical', value: stats.critical || 0, color: COLORS.critical },
    { name: 'Warnings', value: stats.warnings || 0, color: COLORS.warning },
    { name: 'Info', value: stats.info || 0, color: COLORS.info },
  ].filter(d => d.value > 0)

  // Port status bar
  const openPorts = (ports.open_ports || []).slice(0, 8)
  const portData = openPorts.map(p => ({
    name: `${p.port}`,
    service: p.service,
    risk: p.risk === 'High' ? 3 : p.risk === 'Medium' ? 2 : 1,
    fill: p.risk === 'High' ? COLORS.critical : p.risk === 'Medium' ? COLORS.warning : COLORS.pass,
  }))

  // Security radar
  const ssl = data?.ssl || {}
  const sslScore = ssl.has_ssl ? (ssl.certificate?.is_expired ? 20 : ssl.certificate?.days_remaining > 30 ? 90 : 60) : 0
  const radarData = [
    { subject: 'SSL/TLS', score: sslScore },
    { subject: 'Headers', score: headers.score || 0 },
    { subject: 'DNS', score: data?.dns?.spf?.found && data?.dns?.dmarc?.found ? 90 : data?.dns?.spf?.found || data?.dns?.dmarc?.found ? 50 : 20 },
    { subject: 'Ports', score: Math.max(0, 100 - (ports.high_risk_count || 0) * 20) },
    { subject: 'Tech', score: (data?.tech?.issues?.length || 0) > 0 ? 60 : 90 },
    { subject: 'Domain', score: risk.score || 50 },
  ]



  return (
    <div className="glass-card animate-slide-up overflow-hidden group">
      {/* Premium Header */}
      <div className="relative p-6 border-b border-white/[0.03]">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyber-400/50 to-transparent opacity-30" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute -inset-1 bg-cyber-400/20 rounded-lg blur-sm group-hover:bg-cyber-400/30 transition-all" />
              <div className="relative w-11 h-11 rounded-lg bg-surface-900 border border-cyber-400/20 flex items-center justify-center shadow-inner">
                <BarChart3 className="w-6 h-6 text-cyber-400" />
              </div>
            </div>
            <div>
              <h3 className="text-base font-display font-bold text-white tracking-wide uppercase">Security Intelligence</h3>
              <p className="text-[11px] font-mono text-gray-500 mt-0.5 tracking-tight">REAL-TIME RISK VECTOR ANALYSIS & DATA VISUALIZATION</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-mono text-gray-600 uppercase tracking-tighter">Engine Status</span>
              <span className="text-[10px] font-mono text-matrix-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-matrix-400 animate-pulse" /> NOMINAL
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />

        {/* Security Radar */}
        <div className="relative group/chart">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em]">Postural Balance</span>
            <div className="h-[1px] flex-1 mx-3 bg-white/[0.05]" />
          </div>
          <div className="relative bg-surface-900/40 rounded-2xl p-2 border border-white/[0.02]">
            <ResponsiveContainer width="100%" height={220}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.06)" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 9, fill: '#64748b', fontFamily: 'JetBrains Mono', letterSpacing: '-0.02em' }} />
                <Radar 
                  name="Score" 
                  dataKey="score" 
                  stroke="#00FF9C" 
                  fill="#00FF9C" 
                  fillOpacity={0.15} 
                  strokeWidth={2.5} 
                  animationDuration={1500}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk distribution */}
        <div className="relative group/chart">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em]">Threat Vectors</span>
            <div className="h-[1px] flex-1 mx-3 bg-white/[0.05]" />
          </div>
          <div className="relative bg-surface-900/40 rounded-2xl p-2 border border-white/[0.02]">
            {vulnData.length > 0 ? (
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie 
                    data={vulnData} 
                    cx="50%" 
                    cy="50%" 
                    innerRadius={55} 
                    outerRadius={80} 
                    paddingAngle={4} 
                    dataKey="value"
                    animationBegin={200}
                    animationDuration={1200}
                  >
                    {vulnData.map((entry, i) => <Cell key={i} fill={entry.color} stroke="rgba(0,0,0,0.2)" strokeWidth={2} />)}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[220px] flex flex-col items-center justify-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-matrix-400/5 flex items-center justify-center border border-matrix-400/10">
                   <div className="w-2 h-2 rounded-full bg-matrix-400 animate-pulse" />
                </div>
                <span className="text-[10px] font-mono text-matrix-400/50 uppercase tracking-widest">No Active Threats</span>
              </div>
            )}
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-2 px-2 pb-2">
              {vulnData.map((d, i) => (
                <div key={i} className="flex items-center gap-1.5 bg-surface-800/50 px-2 py-0.5 rounded-full border border-white/[0.03]">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: d.color }} />
                  <span className="text-[9px] font-mono text-gray-400">{d.name}: {d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Port Exposure */}
        <div className="relative group/chart">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em]">Service Exposure</span>
            <div className="h-[1px] flex-1 mx-3 bg-white/[0.05]" />
          </div>
          <div className="relative bg-surface-900/40 rounded-2xl p-2 border border-white/[0.02]">
            {portData.length > 0 ? (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={portData} margin={{ top: 10, right: 10, left: -30, bottom: 0 }}>
                  <defs>
                    <linearGradient id="barHigh" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#EF4444" stopOpacity={1}/>
                      <stop offset="100%" stopColor="#EF4444" stopOpacity={0.2}/>
                    </linearGradient>
                    <linearGradient id="barMedium" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FACC15" stopOpacity={1}/>
                      <stop offset="100%" stopColor="#FACC15" stopOpacity={0.2}/>
                    </linearGradient>
                    <linearGradient id="barLow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00FF9C" stopOpacity={1}/>
                      <stop offset="100%" stopColor="#00FF9C" stopOpacity={0.2}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 9, fill: '#94a3b8', fontFamily: 'JetBrains Mono' }} 
                    axisLine={false} 
                    tickLine={false} 
                    dy={5}
                  />
                  <YAxis domain={[0, 3]} hide />
                  <Tooltip 
                    cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                    content={<CustomTooltip />} 
                  />
                  <Bar 
                    dataKey="risk" 
                    radius={[4, 4, 0, 0]} 
                    animationDuration={1800}
                    barSize={20}
                    background={{ fill: 'rgba(255,255,255,0.02)', radius: [4, 4, 0, 0] }}
                  >
                    {portData.map((entry, i) => (
                      <Cell 
                        key={i} 
                        fill={entry.risk === 3 ? 'url(#barHigh)' : entry.risk === 2 ? 'url(#barMedium)' : 'url(#barLow)'} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[220px] flex flex-col items-center justify-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-cyber-400/5 flex items-center justify-center border border-cyber-400/10">
                   <div className="w-2 h-2 rounded-full bg-cyber-400 animate-pulse" />
                </div>
                <span className="text-[10px] font-mono text-cyber-400/50 uppercase tracking-widest">Internal Ports Secured</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
