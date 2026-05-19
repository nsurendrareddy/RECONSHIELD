'use client'
import dynamic from 'next/dynamic'

const DashboardClient = dynamic(() => import('./DashboardClient'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-surface-950 flex flex-col items-center justify-center font-mono text-[#00ff9c] text-xs">
      <div className="w-10 h-10 rounded-full border border-[#00ff9c]/20 border-t-[#00ff9c] animate-spin mb-4" />
      <span>INITIALIZING_RECONSHIELD_TELEMETRY...</span>
    </div>
  )
})

export default function DynamicDashboardClient() {
  return <DashboardClient />
}
