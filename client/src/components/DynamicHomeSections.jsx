'use client'
import dynamic from 'next/dynamic'

const HomeSections = dynamic(() => import('./HomeSections'), { 
  ssr: false,
  loading: () => <div className="h-96 animate-pulse bg-surface-900/50 rounded-3xl" />
})

export default function DynamicHomeSections({ posts }) {
  return <HomeSections posts={posts} />
}
