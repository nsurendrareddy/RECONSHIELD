'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Network, Lock, Terminal, Shield, 
  AlertTriangle, Cpu, ArrowRight 
} from 'lucide-react'
import { urlFor } from '@/utils/sanity'

export default function HomeSections({ posts }) {
  const features = [
    { icon: Network, title: 'DNS ANALYSIS', desc: 'Map A, MX, TXT, CNAME, NS records and subdomain structure' },
    { icon: Lock, title: 'SSL/TLS AUDIT', desc: 'Certificate validity, cipher suites, protocol versions and HSTS' },
    { icon: Terminal, title: 'PORT DETECTION', desc: 'Identify open ports and exposed services passively' },
    { icon: Shield, title: 'SECURITY HEADERS', desc: 'Check CSP, X-Frame-Options, HSTS and referrer policy' },
    { icon: AlertTriangle, title: 'IP REPUTATION', desc: 'Cross-reference against 50+ threat databases and blocklists' },
    { icon: Cpu, title: 'AI RISK REPORT', desc: 'Plain-English risk summary generated from all scan data' },
  ]

  const steps = [
    { num: '01', title: 'ENTER TARGET', desc: 'Type any domain or IP address into the scanner' },
    { num: '02', title: 'PASSIVE SCAN', desc: 'We query public databases — no traffic sent to target' },
    { num: '03', title: 'READ REPORT', desc: 'Get a full AI-powered risk breakdown in seconds' },
  ]

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase()
  }

  return (
    <div className="space-y-32 py-20 max-w-[1200px] mx-auto px-6">
      {/* Section 1: What We Scan */}
      <section>
        <div className="flex items-center gap-4 mb-12">
          <h2 className="font-mono text-xs tracking-[4px] uppercase text-[#00ff88] font-bold">// WHAT WE SCAN</h2>
          <div className="h-[1px] flex-1 bg-[#1a2332]" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div key={i} className="bg-[#0d1117] border border-[#1a2332] hover:border-[#00ff8833] rounded-[6px] p-4 transition-all group">
              <f.icon className="w-5 h-5 text-[#00ff88] mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-mono text-[13px] text-[#e2e8f0] uppercase tracking-[1px] mb-2">{f.title}</h3>
              <p className="text-[11px] text-[#475569] font-sans leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: How It Works */}
      <section>
        <div className="flex items-center gap-4 mb-12">
          <h2 className="font-mono text-xs tracking-[4px] uppercase text-gray-500 font-bold">// HOW IT WORKS</h2>
          <div className="h-[1px] flex-1 bg-[#1a2332]" />
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
          {steps.map((s, i) => (
            <React.Fragment key={i}>
              <div className="flex-1 bg-[#0d1117] border border-[#1a2332] p-4 rounded-[6px] w-full">
                <span className="block font-mono text-[10px] text-[#00ff88] mb-4">{s.num}</span>
                <h3 className="font-mono text-[13px] text-[#e2e8f0] uppercase tracking-[1px] mb-2">{s.title}</h3>
                <p className="text-[11px] text-[#475569] leading-relaxed font-sans">{s.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden md:block text-[#1a2332] text-xl px-2">▸</div>
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* Section 3: Latest Intelligence */}
      {posts && posts.length > 0 && (
        <section>
          <div className="flex items-center gap-4 mb-12">
            <h2 className="font-mono text-xs tracking-[4px] uppercase text-gray-500 font-bold">// LATEST INTELLIGENCE</h2>
            <div className="h-[1px] flex-1 bg-[#1a2332]" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {posts.map((post) => (
              <Link href={`/blog/${post.slug}`} key={post._id} className="group flex flex-col bg-[#0d1117] border border-[#1a2332] hover:border-[#00ff8833] transition-all duration-300 rounded-[6px] overflow-hidden">
                <div className="relative aspect-video w-full overflow-hidden">
                  {post.mainImage && (
                    <Image 
                      src={urlFor(post.mainImage).width(800).auto('format').url()} 
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  )}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <span className="font-mono text-[9px] tracking-[2px] uppercase text-[#00ff88] mb-3">
                    {post.categories?.[0]?.title || 'INTEL'}
                  </span>
                  <h3 className="text-[13px] font-semibold mb-3 leading-tight group-hover:text-[#00ff88] transition-colors text-white">
                    {post.title}
                  </h3>
                  <p className="text-[#475569] text-[11px] leading-relaxed line-clamp-2 mb-6">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto pt-4 border-t border-[#1a2332] flex items-center justify-between font-mono text-[9px] text-[#475569] uppercase tracking-[1px]">
                    <span>{formatDate(post.publishedAt)}</span>
                    <span className="text-[#00ff88] group-hover:translate-x-1 transition-transform">READ →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="flex justify-end">
            <Link href="/blog" className="font-mono text-[11px] text-[#00ff88] hover:underline uppercase tracking-[2px]">
              View all articles →
            </Link>
          </div>
        </section>
      )}
    </div>
  )
}
