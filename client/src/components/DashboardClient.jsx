'use client'
import { useScan } from '@/hooks/useScan'
import SearchBar from '@/components/SearchBar'
import LoadingState from '@/components/LoadingState'
import OverviewSection from '@/sections/OverviewSection'
import ChartsSection from '@/sections/ChartsSection'
import AiExplanationSection from '@/sections/AiExplanationSection'
import DomainSection from '@/sections/DomainSection'
import DnsSection from '@/sections/DnsSection'
import SslSection from '@/sections/SslSection'
import HeadersSection from '@/sections/HeadersSection'
import TechSection from '@/sections/TechSection'
import IpSection from '@/sections/IpSection'
import SubdomainSection from '@/sections/SubdomainSection'
import PortSection from '@/sections/PortSection'
import WebsiteSection from '@/sections/WebsiteSection'
import RiskSection from '@/sections/RiskSection'
import BugBountySection from '@/sections/BugBountySection'
import VulnSimSection from '@/sections/VulnSimSection'
import RobotsSection from '@/sections/RobotsSection'
import WaybackSection from '@/sections/WaybackSection'
import AttackGraphSection from '@/sections/AttackGraphSection'
import InfraSection from '@/sections/InfraSection'
import ComplianceSection from '@/sections/ComplianceSection'
import ChatbotPanel from '@/components/ChatbotPanel'
import ErrorBoundary from '@/components/ErrorBoundary'
import AuthModal from '@/components/AuthModal'
import { useState } from 'react'
import { AlertTriangle, RotateCcw, Crosshair, Clock } from 'lucide-react'
import SOCBackground from '@/components/SOCBackground'
import Hero from '@/components/Hero'

export default function DashboardClient() {
  const { status, scanData, error, progress, scanProgress, domain, scan, reset } = useScan()
  const [isDownloadAuthOpen, setIsDownloadAuthOpen] = useState(false)
  const results = scanData?.results || {}
  const isLimitReached = status === 'limit-reached'

  return (
    <div className="relative min-h-screen">
      <SOCBackground />
      
      {status === 'idle' && <Hero />}
      
      <div className={status === 'idle' ? 'max-w-4xl mx-auto' : ''}>
        <SearchBar onScan={scan} isScanning={status === 'scanning'} />
      </div>

      {status === 'scanning' && (
        <ErrorBoundary>
          <LoadingState progress={progress} domain={domain} scanProgress={scanProgress} />
        </ErrorBoundary>
      )}

      <AuthModal
        isOpen={isLimitReached}
        onClose={reset}
        message="You've reached the free scan limit for guests. Create a free account to perform unlimited scans and download detailed reports."
      />
      <AuthModal
        isOpen={isDownloadAuthOpen}
        onClose={() => setIsDownloadAuthOpen(false)}
        message="Downloadable PDF and JSON reports are premium features. Please sign in or create an account to download this report."
      />

      {status === 'error' && (
        <div className="mt-12 text-center animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 border border-red-500/15 mb-4">
            <AlertTriangle className="w-8 h-8 text-red-400" />
          </div>
          <p className="text-red-400 font-heading font-semibold text-lg tracking-wide">{error}</p>
          <button onClick={reset} className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surface-700 text-sm font-mono text-gray-300 hover:text-matrix-400 hover:bg-surface-600 transition-all border border-white/5">
            <RotateCcw className="w-4 h-4" /> retry_scan()
          </button>
        </div>
      )}

      {status === 'completed' && scanData && (
        <div className="mt-10 space-y-5 stagger">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <Crosshair className="w-5 h-5 text-matrix-400" />
                <h2 className="text-2xl font-display font-bold text-white tracking-wider">{scanData.domain}</h2>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-gray-600">
                <Clock className="w-3 h-3" />
                <span>{scanData.completed_at ? new Date(scanData.completed_at).toLocaleString() : 'Just now'}</span>
                <span className="text-gray-700">•</span>
                <span>ID: {scanData.id?.slice(0, 8)}</span>
              </div>
            </div>
            <button onClick={reset} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-800 text-sm font-mono text-gray-400 hover:text-matrix-400 hover:bg-surface-700 transition-all border border-matrix-400/10">
              <RotateCcw className="w-3.5 h-3.5" /> new_scan()
            </button>
          </div>

          <ErrorBoundary><OverviewSection data={results} scanId={scanData.id} onLockClick={() => setIsDownloadAuthOpen(true)} /></ErrorBoundary>
          <ErrorBoundary><ChartsSection data={results} /></ErrorBoundary>
          <ErrorBoundary><BugBountySection data={results} domain={scanData.domain} /></ErrorBoundary>
          <ErrorBoundary><AttackGraphSection data={results} /></ErrorBoundary>

          <ErrorBoundary>
            <AiExplanationSection
              explanations={results.ai_explanations || []}
              summary={results.executive_summary || ''}
            />
          </ErrorBoundary>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <ErrorBoundary><DomainSection data={results.whois} /></ErrorBoundary>
            <ErrorBoundary><SslSection data={results.ssl} /></ErrorBoundary>
            <ErrorBoundary><DnsSection data={results.dns} /></ErrorBoundary>
            <ErrorBoundary><HeadersSection data={results.headers} /></ErrorBoundary>
            <ErrorBoundary><TechSection data={results.tech} /></ErrorBoundary>
            <ErrorBoundary><IpSection data={results.ip} /></ErrorBoundary>
            <ErrorBoundary><SubdomainSection data={results.subdomains} /></ErrorBoundary>
            <ErrorBoundary><PortSection data={results.ports} /></ErrorBoundary>
            <ErrorBoundary><WebsiteSection data={results.website} /></ErrorBoundary>
          </div>

          <ErrorBoundary><RobotsSection data={results} /></ErrorBoundary>
          <ErrorBoundary><WaybackSection data={results} /></ErrorBoundary>
          <ErrorBoundary><InfraSection data={results} /></ErrorBoundary>
          <ErrorBoundary><VulnSimSection data={results} /></ErrorBoundary>
          <ErrorBoundary><ComplianceSection data={results} /></ErrorBoundary>
          <ErrorBoundary><RiskSection data={results} /></ErrorBoundary>
        </div>
      )}

      {status === 'completed' && scanData && (
        <ChatbotPanel scanId={scanData.id} data={results} />
      )}
    </div>
  )
}
