'use client'
import dynamic from 'next/dynamic'

const DashboardClient = dynamic(() => import('./DashboardClient'), {
  ssr: false,
  loading: () => <div className="w-full min-h-[400px] bg-surface-900/20 border border-white/5 rounded-2xl animate-pulse" />
})

export default function DynamicDashboardClient(props) {
  return <DashboardClient {...props} />
}
