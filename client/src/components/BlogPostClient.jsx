'use client'
import React from 'react'
import { ArrowLeft, Clock, Calendar, Tag, User, Globe, Shield } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { urlFor } from '@/utils/sanity'

const ptComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      return (
        <div className="relative w-full aspect-video my-8 rounded-lg overflow-hidden border border-[#1a2332]">
          <Image
            src={urlFor(value).width(800).auto('format').url()}
            alt={value.alt || 'Article Image'}
            fill
            sizes="(max-width: 800px) 100vw, 800px"
            quality={75}
            className="object-cover"
          />
          {value.caption && (
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-2 text-[10px] font-mono text-gray-400 text-center">
              {value.caption}
            </div>
          )}
        </div>
      )
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 className="text-[15px] font-semibold text-[#e2e8f0] mt-10 mb-5 flex items-center gap-2">
        <span className="text-[#00ff88]">##</span> {children}
      </h2>
    ),
    h3: ({ children }) => <h3 className="text-[14px] font-semibold text-white mt-8 mb-4">{children}</h3>,
    normal: ({ children }) => <p className="text-[13px] text-[#94a3b8] leading-[1.8] mb-6 font-sans">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-[#00ff8844] bg-[#0d1117] p-4 my-8 italic text-[#64748b] text-[13px]">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="mb-6 space-y-2">{children}</ul>,
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="text-[12px] text-[#64748b] flex gap-2">
        <span className="text-[#00ff88] shrink-0">▸</span>
        <span>{children}</span>
      </li>
    ),
  },
  marks: {
    code: ({ children }) => (
      <code className="bg-[#1a2332] text-[#00ff88] px-1.5 py-0.5 rounded-[3px] text-[12px] font-mono">
        {children}
      </code>
    ),
    link: ({ children, value }) => {
      const href = value?.href || '';
      // Intercept and remove the unpublished BitUnlocker article link dynamically
      if (href.includes('bitunlocker')) {
        return null;
      }
      const rel = !href.startsWith('/') ? 'noreferrer noopener' : undefined
      return (
        <a href={href} rel={rel} className="text-[#00ff88] underline decoration-[#00ff8833] hover:decoration-[#00ff88] transition-all">
          {children}
        </a>
      )
    },
  },
}

export default function BlogPostClient({ post, recentPosts, categories, relatedPosts }) {
  // Filter out any block containing the unpublished/dead BitUnlocker link
  const cleanBody = post.body?.filter(block => {
    if (block.markDefs) {
      const hasBitUnlockerLink = block.markDefs.some(
        m => m._type === 'link' && m.href && m.href.includes('bitunlocker')
      );
      if (hasBitUnlockerLink) return false;
    }
    return true;
  });

  const getInitials = (name) => {
    if (!name) return '??'
    const parts = name.split(' ')
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
    return parts[0][0].toUpperCase()
  }

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      timeZone: 'UTC' 
    }).format(date).toUpperCase()
  }

  const calculateReadTime = (body) => {
    if (!body) return 1
    const text = body.map(block => block.children?.map(child => child.text).join(' ')).join(' ')
    const wordCount = text.split(/\s+/).length
    return Math.ceil(wordCount / 200)
  }

  return (
    <div className="bg-[#0a0c0f] min-h-screen text-white font-sans selection:bg-[#00ff8833] selection:text-[#00ff88]">
      {/* Article Header */}
      <div className="max-w-[1440px] mx-auto px-6 py-4">
        <div className="font-mono text-[10px] text-[#94a3b8] uppercase tracking-[2px] mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-white transition-colors">HOME</Link>
          <span>›</span>
          <Link href="/blog" className="hover:text-white transition-colors">BLOG</Link>
          <span>›</span>
          <span className="truncate max-w-[200px] md:max-w-md">{post.title}</span>
        </div>

        <div className="relative w-full h-[280px] rounded-lg overflow-hidden border border-[#1a2332] mb-8">
          {post.mainImage && (
            <Image
              src={urlFor(post.mainImage).width(1440).auto('format').url()}
              alt={post.title}
              fill
              priority
              fetchPriority="high"
              sizes="(max-width: 1440px) 100vw, 1440px"
              quality={75}
              className="object-cover"
            />
          )}
        </div>

        <div className="mb-12">
          <span className="inline-block px-3 py-1 border border-[#00ff8844] rounded-full font-mono text-[10px] tracking-[1px] text-[#00ff88] uppercase mb-4">
            {post.categories?.[0]?.title || 'INTELLIGENCE'}
          </span>
          <h1 className="text-[20px] md:text-[24px] font-semibold text-[#f1f5f9] mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 font-mono text-[10px] text-[#94a3b8] uppercase tracking-[2px]">
            <Link href="/about" className="flex items-center gap-2 group cursor-pointer">
              <div className="w-6 h-6 rounded-full bg-[#1a2332] flex items-center justify-center text-[#00ff88] text-[8px] group-hover:bg-[#00ff8811] transition-colors">
                {getInitials(post.author?.name)}
              </div>
              <span className="text-white group-hover:text-[#00ff88] transition-colors underline decoration-transparent group-hover:decoration-[#00ff8844] underline-offset-4 flex items-center gap-1.5">
                {post.author?.name} <span className="text-[8px] text-gray-500 group-hover:text-[#00ff88]">↗ View profile</span>
              </span>
            </Link>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(post.publishedAt || post._createdAt)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3 h-3" />
              <span>{calculateReadTime(post.body)} MIN READ</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Globe className="w-3 h-3" />
              <span>{Math.floor(Math.random() * 500) + 100} VIEWS</span>
            </div>
          </div>
        </div>

        {/* Layout Grid */}
        <div className="flex flex-col lg:flex-row gap-12 mb-20">
          {/* Article Body */}
          <div className="flex-1 min-w-0">
            <div className="prose prose-invert max-w-none">
              <PortableText value={cleanBody || []} components={ptComponents} />
            </div>

            {/* Reader Revenue Manager Inline CTA */}
            <div className="mt-12 flex justify-center">
              <div rrm-inline-cta="edf53e34-4989-4bd4-b28e-d1c0e30b9fd4"></div>
            </div>

            {/* Article Tags */}
            <div className="mt-12 pt-8 border-t border-[#1a2332] flex flex-wrap gap-2">
              {(post.tags || post.categories || []).map((tag, i) => (
                <span key={i} className="px-2 py-1 bg-[#0d1117] border border-[#1a2332] font-mono text-[9px] text-gray-500 uppercase tracking-[1px]">
                  #{(tag.title || tag).toUpperCase()}
                </span>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-[240px] shrink-0">
            <div className="sticky top-24 space-y-12">
              {/* Recently Published */}
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <h3 className="font-mono text-[10px] tracking-[2px] text-[#00ff88] uppercase whitespace-nowrap">RECENTLY PUBLISHED</h3>
                  <div className="h-[1px] flex-1 bg-[#1a2332]" />
                </div>
                <div className="space-y-6">
                  {recentPosts.map((p) => (
                    <Link href={`/blog/${p.slug}`} key={p._id} className="group block">
                      <div className="relative w-full aspect-video rounded border border-[#1a2332] overflow-hidden mb-2">
                        {p.mainImage && (
                          <Image
                            src={urlFor(p.mainImage).width(240).auto('format').url()}
                            alt={p.title}
                            fill
                            sizes="240px"
                            quality={75}
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        )}
                      </div>
                      <span className="block font-mono text-[8px] text-[#00ff88] uppercase tracking-[1px] mb-1">
                        {p.categories?.[0]?.title || 'INTEL'}
                      </span>
                      <h4 className="text-[11px] font-medium text-gray-300 group-hover:text-white transition-colors line-clamp-2">
                        {p.title}
                      </h4>
                      <span className="block font-mono text-[8px] text-[#94a3b8] uppercase mt-1">
                        {formatDate(p.publishedAt)}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <h3 className="font-mono text-[10px] tracking-[2px] text-[#00ff88] uppercase whitespace-nowrap">CATEGORIES</h3>
                  <div className="h-[1px] flex-1 bg-[#1a2332]" />
                </div>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <Link 
                      href={`/blog?category=${cat.title}`} 
                      key={cat._id}
                      className="flex items-center justify-between p-2 rounded hover:bg-[#00ff8808] group transition-colors"
                    >
                      <span className="text-[11px] text-gray-400 group-hover:text-[#00ff88] transition-colors">{cat.title}</span>
                      <span className="bg-[#00ff8811] border border-[#00ff8822] text-[#00ff88] text-[9px] px-1.5 py-0.5 rounded min-w-[20px] text-center">
                        {cat.count}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-6">
                <Link href="/ip-scanner" className="block bg-[#0d1117] border border-[#00ff8833] p-4 rounded group hover:border-[#00ff8866] transition-all">
                  <h4 className="font-mono text-[12px] text-[#00ff88] uppercase tracking-[2px] mb-2 flex items-center gap-2">
                    <Globe className="w-3 h-3" /> IP INTELLIGENCE
                  </h4>
                  <p className="text-[10px] text-gray-500 mb-4 leading-relaxed">Passive infrastructure reconnaissance and threat scoring.</p>
                  <div className="w-full py-2 bg-[#00ff8811] border border-[#00ff8822] text-[#00ff88] font-mono text-[9px] text-center tracking-[2px] group-hover:bg-[#00ff8822] transition-colors">
                    SCAN IP
                  </div>
                </Link>

                <Link href="/" className="block bg-[#0d1117] border border-[#378add33] p-4 rounded group hover:border-[#378add66] transition-all">
                  <h4 className="font-mono text-[12px] text-[#378add] uppercase tracking-[2px] mb-2 flex items-center gap-2">
                    <Shield className="w-3 h-3" /> VULN SCANNER
                  </h4>
                  <p className="text-[10px] text-gray-500 mb-4 leading-relaxed">Automated attack surface analysis and risk discovery.</p>
                  <div className="w-full py-2 bg-[#378add11] border border-[#378add22] text-[#378add] font-mono text-[9px] text-center tracking-[2px] group-hover:bg-[#378add22] transition-colors">
                    LAUNCH SCAN
                  </div>
                </Link>
              </div>
            </div>
          </aside>
        </div>

        {/* More Articles */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="font-mono text-[12px] tracking-[3px] uppercase text-white font-bold">// MORE ARTICLES</h2>
            <div className="h-[1px] flex-1 bg-[#1a2332]" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map((p) => (
              <Link href={`/blog/${p.slug}`} key={p._id} className="group flex flex-col bg-[#0d1117] border border-[#1a2332] hover:border-[#00ff8833] transition-all duration-300">
                <div className="relative aspect-square w-full overflow-hidden">
                  {p.mainImage && (
                    <Image 
                      src={urlFor(p.mainImage).width(361).height(361).fit('crop').auto('format').url()} 
                      alt={p.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 361px"
                      quality={70}
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  )}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <span className="font-mono text-[9px] tracking-[2px] uppercase text-[#00ff88] mb-3">
                    {p.categories?.[0]?.title || 'OSINT'}
                  </span>
                  <h3 className="text-[13px] font-semibold mb-3 leading-tight group-hover:text-[#00ff88] transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-[#94a3b8] text-[11px] leading-relaxed line-clamp-2 mb-6">
                    {p.excerpt}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-[#1a2332]">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#1a2332] flex items-center justify-center font-mono text-[10px] text-[#00ff88]">
                        {getInitials(p.author?.name)}
                      </div>
                      <span className="font-mono text-[9px] tracking-[2px] uppercase text-gray-300">
                        {p.author?.name || 'RECON'}
                      </span>
                    </div>
                    <span className="font-mono text-[9px] tracking-[2px] uppercase text-gray-500">
                      {formatDate(p.publishedAt)}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#0d1117] border-t border-[#1a2332] pt-16 pb-8">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <div>
              <div className="flex items-center gap-3 mb-6 group">
                <div className="w-2 h-2 rounded-full bg-[#00ff88]" />
                <h1 className="font-mono text-xl font-bold tracking-[3px] uppercase">RECONSHIELD</h1>
              </div>
              <p className="text-[12px] text-[#94a3b8] leading-relaxed max-w-sm">
                Advanced educational reconnaissance and intelligence platform. Empowers security researchers with visibility into their attack surface through passive data collection.
              </p>
            </div>
            <div>
              <h4 className="font-mono text-[10px] tracking-[3px] text-white uppercase font-bold mb-6">PLATFORM</h4>
              <ul className="space-y-3 font-mono text-[10px] tracking-[1px] text-gray-500 uppercase">
                <li><Link href="/" className="hover:text-[#00ff88] transition-colors">SECURITY SCANNER</Link></li>
                <li><Link href="/blog" className="hover:text-[#00ff88] transition-colors">INTELLIGENCE BLOG</Link></li>
                <li><Link href="/about" className="hover:text-[#00ff88] transition-colors">ABOUT RESEARCH</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-mono text-[10px] tracking-[3px] text-white uppercase font-bold mb-6">LEGAL</h4>
              <ul className="space-y-3 font-mono text-[10px] tracking-[1px] text-gray-500 uppercase">
                <li><Link href="/terms" className="hover:text-[#00ff88] transition-colors">TERMS OF USE</Link></li>
                <li><Link href="/privacy" className="hover:text-[#00ff88] transition-colors">PRIVACY POLICY</Link></li>
                <li><Link href="/contact" className="hover:text-[#00ff88] transition-colors">CONTACT SUPPORT</Link></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-[#1a2332]/30 mb-8">
            <p className="font-mono text-[10px] tracking-[2px] text-gray-500">© 2026 RECONSHIELD INTELLIGENCE</p>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
              <span className="font-mono text-[10px] tracking-[2px] uppercase">SYSTEM LIVE</span>
            </div>
          </div>
          <div className="text-center font-mono text-[9px] tracking-[3px] text-[#1a2332] font-bold uppercase">
            AUTHORIZED RESEARCH ONLY — ETHICAL HACKERS ONLY
          </div>
        </div>
      </footer>
    </div>
  )
}
