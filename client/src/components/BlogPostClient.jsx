'use client'
import React from 'react'
import { ArrowLeft, Clock, Calendar, Tag, BookOpen } from 'lucide-react'
import Link from 'next/link'
import { BASE_URL } from '@/utils/api'

export default function BlogPostClient({ post }) {
  const renderContent = (content) => {
    return content.trim().split('\n\n').map((paragraph, index) => {
      const text = paragraph.trim()
      if (text.startsWith('### ')) {
        return <h3 key={index} className="text-xl font-heading font-semibold text-white mt-8 mb-4">{text.substring(4)}</h3>
      }
      if (text.startsWith('## ')) {
        return <h2 key={index} className="text-2xl font-heading font-bold text-matrix-400 mt-10 mb-5">{text.substring(3)}</h2>
      }
      if (text.startsWith('- ')) {
        const items = text.split('\n').map((item, i) => <li key={i} className="mb-2 ml-4 list-disc text-gray-300">{item.substring(2)}</li>)
        return <ul key={index} className="mb-6 font-mono text-sm leading-relaxed">{items}</ul>
      }
      if (text.match(/^[0-9]+\./)) {
        const items = text.split('\n').map((item, i) => <li key={i} className="mb-2 ml-4 list-decimal text-gray-300">{item.substring(item.indexOf('.') + 1).trim()}</li>)
        return <ol key={index} className="mb-6 font-mono text-sm leading-relaxed">{items}</ol>
      }
      return <p key={index} className="text-gray-300 font-mono text-sm leading-relaxed mb-6">{text}</p>
    })
  }

  return (
    <div className="animate-fade-in max-w-4xl mx-auto pb-20">
      <Link href="/blog" className="inline-flex items-center gap-2 text-xs font-mono text-gray-500 hover:text-matrix-400 transition-colors mb-8 group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Blog
      </Link>

      <article className="glass-card overflow-hidden">
        {/* Header Image */}
        <div className="w-full h-64 md:h-96 relative border-b border-white/5 bg-surface-900">
          {post.image_url ? (
            <img 
              src={post.image_url.startsWith('http') ? post.image_url : `${BASE_URL}${post.image_url}`} 
              alt={post.title} 
              className="w-full h-full object-cover" 
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-matrix-400/10 to-transparent flex items-center justify-center">
              <BookOpen className="w-16 h-16 text-matrix-400/10" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-surface-950 to-transparent z-10 opacity-80"></div>
          
          <div className="absolute bottom-0 left-0 w-full p-8 z-20">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono font-medium border text-matrix-400 bg-matrix-400/10 border-matrix-400/20 backdrop-blur-md mb-4">
              <Tag className="w-3.5 h-3.5" />
              {post.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-display font-bold text-white tracking-wider uppercase leading-tight mb-4">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-gray-400">
              <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-gray-500" /> {new Date(post.created_at).toLocaleDateString()}</span>
              <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-gray-500" /> {Math.max(1, Math.ceil(post.content.split(' ').length / 200))} min read</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 md:p-12">
          {post.meta_description && (
            <div className="border-l-4 border-matrix-400 pl-6 mb-10">
              <p className="text-lg text-gray-400 font-heading leading-relaxed italic">
                {post.meta_description}
              </p>
            </div>
          )}

          <div className="prose prose-invert max-w-none">
            {renderContent(post.content)}
          </div>
        </div>
      </article>
    </div>
  )
}
