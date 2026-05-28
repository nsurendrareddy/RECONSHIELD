'use client'
import dynamic from 'next/dynamic'

const DashboardClient = dynamic(() => import('./DashboardClient'))

export default function DynamicDashboardClient() {
  return <DashboardClient />
}
