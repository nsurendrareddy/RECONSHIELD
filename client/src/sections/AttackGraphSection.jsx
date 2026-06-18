'use client'
import { useEffect, useRef, useState, useMemo } from 'react'
import { useReactFlow, ReactFlow, Background, Controls, MiniMap, Handle, Position, ReactFlowProvider } from '@xyflow/react'
import { Network } from 'lucide-react'
import '@xyflow/react/dist/style.css'
import '@/styles/react-flow.css'

const nodeStyles = {
  domain:    { bg: 'bg-cyber-500/20', border: 'border-cyber-400/40', text: 'text-cyber-300', glow: '#0EA5E9' },
  subdomain: { bg: 'bg-purple-500/10', border: 'border-purple-500/20', text: 'text-purple-300', glow: '#A855F7' },
  ip:        { bg: 'bg-slate-500/10', border: 'border-slate-500/20', text: 'text-slate-300', glow: '#94A3B8' },
  port:      { bg: 'bg-orange-500/10', border: 'border-orange-500/20', text: 'text-orange-300', glow: '#F97316' },
  tech:      { bg: 'bg-matrix-500/10', border: 'border-matrix-500/20', text: 'text-matrix-300', glow: '#00FF9C' },
  cloud:     { bg: 'bg-sky-500/10', border: 'border-sky-500/20', text: 'text-sky-300', glow: '#38BDF8' },
  risk_high: { bg: 'bg-red-500/15', border: 'border-red-500/40', text: 'text-red-300', glow: '#EF4444' },
}

function CustomNode({ data }) {
  const style = nodeStyles[data.type] || nodeStyles.domain
  return (
    <div className={`relative px-3 py-2 rounded-xl border ${style.bg} ${style.border} min-w-[90px] max-w-[160px] cursor-pointer`}
      style={{ boxShadow: `0 0 12px ${style.glow}20` }}>
      <Handle type="target" position={Position.Top} style={{ background: style.glow, width: 6, height: 6 }} />
      <div className="flex items-center gap-1.5">
        <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: style.glow }} />
        <p className={`text-[10px] font-mono font-semibold ${style.text} truncate`}>{data.label}</p>
      </div>
      {data.badge && <span className="text-[9px] font-mono text-gray-500">{data.badge}</span>}
      <Handle type="source" position={Position.Bottom} style={{ background: style.glow, width: 6, height: 6 }} />
    </div>
  )
}

const nodeTypes = { custom: CustomNode }

import dagre from 'dagre'

function buildGraphData(data) {
  const nodes = []
  const edges = []

  const domain = data?._domain || 'target'
  nodes.push({ id: 'domain', type: 'custom', data: { label: domain, type: 'domain' } })

  // IP node
  const ipInfo = data?.ip || {}
  if (ipInfo.ip) {
    const ipId = `ip_${ipInfo.ip}`
    nodes.push({ id: ipId, type: 'custom', data: { label: ipInfo.ip, type: 'ip', badge: ipInfo.org || '' } })
    edges.push({ id: `e_domain_${ipId}`, source: 'domain', target: ipId, style: { stroke: '#0EA5E9', strokeWidth: 1.5 } })

    // Open ports from IP
    const openPorts = (data?.ports?.open_ports || []).slice(0, 5)
    openPorts.forEach((p) => {
      const portId = `port_${p.port}`
      const isHigh = p.risk === 'High'
      nodes.push({ id: portId, type: 'custom', data: { label: `:${p.port} ${p.service}`, type: isHigh ? 'risk_high' : 'port' } })
      edges.push({ id: `e_${ipId}_${portId}`, source: ipId, target: portId, style: { stroke: isHigh ? '#EF4444' : '#64748B', strokeWidth: 1 } })
    })
  }

  // Subdomains
  const subdomains = (data?.subdomains?.categorized || []).slice(0, 8)
  subdomains.forEach((sub, i) => {
    const subId = `sub_${i}`
    const isRisky = ['admin', 'db', 'staging', 'dev'].includes(sub.category)
    nodes.push({ id: subId, type: 'custom', data: { label: sub.subdomain.split('.')[0], type: isRisky ? 'risk_high' : (sub.cloud_provider ? 'cloud' : 'subdomain'), badge: sub.category } })
    edges.push({ id: `e_domain_${subId}`, source: 'domain', target: subId, style: { stroke: isRisky ? '#EF4444' : '#A855F7', strokeWidth: 1, strokeDasharray: '4 2' } })
  })

  // Technologies
  const techs = (data?.tech?.technologies || []).slice(0, 5)
  techs.forEach((t, i) => {
    const techId = `tech_${i}`
    nodes.push({ id: techId, type: 'custom', data: { label: t.name, type: t.potential_cves?.length > 0 ? 'risk_high' : 'tech', badge: t.version || '' } })
    edges.push({ id: `e_domain_${techId}`, source: 'domain', target: techId, style: { stroke: '#00FF9C', strokeWidth: 1, strokeDasharray: '3 3' } })
  })

  // Apply Dagre layout
  const dagreGraph = new dagre.graphlib.Graph()
  dagreGraph.setDefaultEdgeLabel(() => ({}))
  dagreGraph.setGraph({ rankdir: 'TB', ranksep: 80, nodesep: 80 })

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: 140, height: 45 })
  })

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target)
  })

  dagre.layout(dagreGraph)

  const positionedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id)
    return {
      ...node,
      position: {
        x: nodeWithPosition.x - 70, // offset by half width
        y: nodeWithPosition.y - 22.5, // offset by half height
      },
    }
  })

  return { nodes: positionedNodes, edges }
}

function GraphInner({ graphData }) {
  const [detail, setDetail] = useState(null)
  const { nodes, edges } = graphData

  return (
    <div className="relative h-[420px] bg-surface-950/60 rounded-2xl border border-white/[0.04] overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.3 }}
        proOptions={{ hideAttribution: true }}
        onNodeClick={(_, node) => setDetail(node.data)}
        style={{ background: 'transparent' }}
        defaultEdgeOptions={{ animated: false }}
      >
        <Background color="#1e293b" gap={20} size={1} />
        <Controls />
        <MiniMap
          nodeColor={n => {
            const type = n.data?.type
            return type === 'domain' ? '#0EA5E9' : type === 'risk_high' ? '#EF4444' : type === 'tech' ? '#00FF9C' : type === 'cloud' ? '#38BDF8' : '#64748B'
          }}
        />
      </ReactFlow>
      {detail && (
        <div className="absolute top-3 right-12 bg-surface-900/95 border border-white/10 rounded-xl p-3 min-w-[180px] backdrop-blur z-50">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-white">{detail.label}</p>
            <button onClick={() => setDetail(null)} className="text-gray-500 hover:text-white text-xs">✕</button>
          </div>
          <p className="text-[10px] font-mono text-gray-500">Type: {detail.type}</p>
          {detail.badge && <p className="text-[10px] font-mono text-gray-500">Info: {detail.badge}</p>}
        </div>
      )}
      <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
        {[['Domain', '#0EA5E9'], ['Subdomain', '#A855F7'], ['Port', '#F97316'], ['Technology', '#00FF9C'], ['High Risk', '#EF4444'], ['Cloud', '#38BDF8']].map(([label, color]) => (
          <div key={label} className="flex items-center gap-1.5 px-2 py-1 bg-surface-900/80 rounded text-[9px] font-mono text-gray-400">
            <div className="w-2 h-2 rounded-full" style={{ background: color }} />{label}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function AttackGraphSection({ data }) {
  const graphData = useMemo(() => buildGraphData(data), [data])
  if (!data) return null
  return (
    <div className="glass-card animate-slide-up overflow-hidden">
      <div className="relative p-6 border-b border-white/[0.04]">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyber-500/40 to-transparent" />
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute -inset-1 bg-cyber-500/15 rounded-lg blur-sm" />
            <div className="relative w-11 h-11 rounded-lg bg-surface-900 border border-cyber-500/25 flex items-center justify-center">
              <Network className="w-6 h-6 text-cyber-400" />
            </div>
          </div>
          <div>
            <h3 className="text-base font-display font-bold text-white tracking-wide uppercase">internet-facing assets Graph</h3>
            <p className="text-[11px] font-mono text-gray-500 mt-0.5">INTERACTIVE TOPOLOGY MAP — CLICK NODES FOR DETAILS</p>
          </div>
        </div>
      </div>
      <div className="p-6">
        <ReactFlowProvider>
          <GraphInner graphData={graphData} />
        </ReactFlowProvider>
      </div>
    </div>
  )
}
