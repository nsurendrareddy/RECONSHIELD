'use client'
import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/utils/sanity'

export default function BlogClient({ posts }) {
  const [activeFilter, setActiveFilter] = useState('ALL')

  const categories = useMemo(() => {
    const cats = new Set(['ALL'])
    posts.forEach(post => {
      if (post.categories?.[0]?.title) {
        cats.add(post.categories[0].title.toUpperCase())
      }
    })
    return Array.from(cats)
  }, [posts])

  const filteredPosts = useMemo(() => {
    if (activeFilter === 'ALL') return posts
    return posts.filter(post => post.categories?.[0]?.title?.toUpperCase() === activeFilter)
  }, [posts, activeFilter])

  const featuredPost = posts[0]
  const trendingPosts = posts.slice(1, 4)

  const getInitials = (name) => {
    if (!name) return '??'
    const parts = name.split(' ')
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
    return parts[0][0].toUpperCase()
  }

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase()
  }

  const calculateReadTime = (body) => {
    if (!body) return 1
    const text = body.map(block => block.children?.map(child => child.text).join(' ')).join(' ')
    const wordCount = text.split(/\s+/).length
    return Math.ceil(wordCount / 200)
  }

  return (
    <main className="max-w-[1440px] mx-auto px-6 py-12">
      {/* Hero Section */}
      <div className="mb-16">
        <div className="flex items-center gap-4 mb-8">
          <h2 className="font-mono text-xs tracking-[3px] uppercase text-[#00ff88]">INTELLIGENCE BRIEFINGS</h2>
          <div className="h-[1px] flex-1 bg-[#1a2332]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
          {/* Featured Article */}
          {featuredPost && (
            <Link href={`/blog/${featuredPost.slug}`} className="group">
              <div className="bg-[#0d1117] border border-[#1a2332] overflow-hidden group-hover:border-[#00ff8833] transition-all duration-300">
                <div className="relative aspect-[21/9] w-full">
                  {featuredPost.mainImage && (
                    <Image 
                      src={urlFor(featuredPost.mainImage).width(1200).url()} 
                      alt={featuredPost.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  )}
                </div>
                <div className="p-8">
                  <span className="inline-block font-mono text-[10px] tracking-[2px] uppercase text-[#00ff88] mb-4">
                    {featuredPost.categories?.[0]?.title || 'UNCLASSIFIED'}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-semibold mb-4 leading-tight group-hover:text-[#00ff88] transition-colors">
                    {featuredPost.title}
                  </h3>
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8 max-w-3xl">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-4 border-t border-[#1a2332] pt-6">
                    <div className="w-10 h-10 rounded-full bg-[#1a2332] flex items-center justify-center font-mono text-xs text-[#00ff88]">
                      {getInitials(featuredPost.author?.name)}
                    </div>
                    <div className="font-mono text-[9px] tracking-[2px] uppercase flex gap-4 text-gray-500">
                      <span className="text-white tracking-[1px]">{featuredPost.author?.name || 'RECON TEAM'}</span>
                      <span className="tracking-[2px]">{formatDate(featuredPost.publishedAt || featuredPost._createdAt)}</span>
                      <span className="tracking-[2px]">{calculateReadTime(featuredPost.body)} MIN READ</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* Trending Sidebar */}
          <div className="flex flex-col gap-6">
            <h4 className="font-mono text-xs tracking-[3px] uppercase text-gray-500 mb-2">TRENDING</h4>
            <div className="flex flex-col gap-6">
              {trendingPosts.map((post) => (
                <Link href={`/blog/${post.slug}`} key={post._id} className="group flex gap-4">
                  <div className="relative w-16 h-16 shrink-0 bg-[#1a2332] overflow-hidden">
                    {post.mainImage && (
                      <Image 
                        src={urlFor(post.mainImage).width(64).height(64).url()} 
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    )}
                  </div>
                  <div className="flex flex-col justify-center min-w-0">
                    <span className="font-mono text-[9px] tracking-[1px] uppercase text-[#00ff88] mb-1">
                      {post.categories?.[0]?.title || 'INTEL'}
                    </span>
                    <h5 className="text-sm font-semibold truncate group-hover:text-[#00ff88] transition-colors">
                      {post.title}
                    </h5>
                    <span className="font-mono text-[9px] tracking-[2px] text-gray-500 uppercase mt-1">
                      {formatDate(post.publishedAt || post._createdAt)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Live Ticker Bar */}
      <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-[#0d1117] border-y border-[#1a2332] h-12 flex items-center mb-16 overflow-hidden">
        <div className="px-6 h-full flex items-center border-r border-[#1a2332] bg-[#0d1117] z-10 shrink-0">
          <span className="font-mono text-[10px] tracking-[3px] uppercase text-[#00ff88] font-bold whitespace-nowrap">LIVE FEED</span>
        </div>
        <div className="flex-1 overflow-hidden">
          <div className="flex items-center whitespace-nowrap animate-ticker">
            {[...posts, ...posts].map((post, i) => (
              <div key={`${post._id}-${i}`} className="flex items-center px-8">
                <Link href={`/blog/${post.slug}`} className="font-mono text-[10px] tracking-[1px] uppercase text-gray-400 hover:text-[#00ff88] transition-colors">
                  {post.title}
                </Link>
                <span className="mx-8 text-[#00ff88]">▸</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Article Grid Section */}
      <div className="mb-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <h2 className="font-mono text-xs tracking-[3px] uppercase text-gray-500">// ALL ARTICLES</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-1.5 font-mono text-[10px] tracking-[2px] uppercase border transition-all duration-200 ${
                  activeFilter === cat
                    ? 'bg-[#00ff88] text-[#0a0c0f] border-[#00ff88]'
                    : 'bg-transparent text-gray-500 border-[#1a2332] hover:border-[#00ff8833] hover:text-[#00ff88]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post._id} className="group flex flex-col bg-[#0d1117] border border-[#1a2332] hover:border-[#00ff8833] transition-all duration-300">
              <div className="relative aspect-video w-full overflow-hidden">
                {post.mainImage && (
                  <Image 
                    src={urlFor(post.mainImage).width(800).url()} 
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                )}
              </div>
              <div className="p-6 flex flex-col flex-1">
                <span className="font-mono text-[9px] tracking-[2px] uppercase text-[#00ff88] mb-3">
                  {post.categories?.[0]?.title || 'OSINT'}
                </span>
                <h3 className="text-lg font-semibold mb-3 leading-tight group-hover:text-[#00ff88] transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 mb-6">
                  {post.excerpt}
                </p>
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-[#1a2332]">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#1a2332] flex items-center justify-center font-mono text-[10px] text-[#00ff88]">
                      {getInitials(post.author?.name)}
                    </div>
                    <span className="font-mono text-[9px] tracking-[2px] uppercase text-gray-300">
                      {post.author?.name || 'RECON'}
                    </span>
                  </div>
                  <span className="font-mono text-[9px] tracking-[2px] uppercase text-gray-500">
                    {formatDate(post.publishedAt || post._createdAt)}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
