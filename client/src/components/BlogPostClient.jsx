'use client'
import React from 'react'
import { ArrowLeft, Clock, Calendar, Tag, BookOpen } from 'lucide-react'
import Link from 'next/link'
import { BASE_URL } from '@/utils/api'

import { PortableText } from '@portabletext/react'
import { urlFor } from '@/utils/sanity'

const components = {
  types: {
    image: ({ value }) => (
      <img
        src={urlFor(value).width(800).url()}
        alt={value.alt || ''}
        style={{ width: '100%', borderRadius: '8px', margin: '1.5rem 0' }}
      />
    ),
  },
  block: {
    h2: ({ children }) => <h2 className="text-2xl font-display font-bold text-matrix-400 mt-10 mb-5 tracking-wider uppercase">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-display font-semibold text-white mt-8 mb-4 tracking-wide">{children}</h3>,
    normal: ({ children }) => <p className="text-gray-300 font-mono text-sm leading-loose mb-6">{children}</p>,
    blockquote: ({ children }) => <blockquote className="border-l-4 border-matrix-400 pl-6 my-10 italic text-gray-400 text-lg">{children}</blockquote>,
  },
  list: {
    bullet: ({ children }) => <ul className="mb-6 font-mono text-sm leading-relaxed list-disc ml-4 space-y-2">{children}</ul>,
    number: ({ children }) => <ol className="mb-6 font-mono text-sm leading-relaxed list-decimal ml-4 space-y-2">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="text-gray-300">{children}</li>,
    number: ({ children }) => <li className="text-gray-300">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="text-matrix-400 font-bold">{children}</strong>,
    link: ({ children, value }) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
      return (
        <a href={value.href} rel={rel} className="text-matrix-400 underline decoration-matrix-400/30 hover:decoration-matrix-400 transition-all">
          {children}
        </a>
      )
    },
  },
}

export default function BlogPostClient({ post }) {
  const isSanity = !!post._type || !!post.body;
  const imageUrl = isSanity 
    ? (post.mainImage ? urlFor(post.mainImage).url() : null)
    : (post.image_url?.startsWith('http') ? post.image_url : `${BASE_URL}${post.image_url}`);

  const renderContent = (content) => {
    if (!content) return null;
    
    // Check if the content is HTML (from the old rich text editor)
    const isHtml = typeof content === 'string' && (content.trim().startsWith('<') || content.includes('</'));
    
    if (isHtml) {
      return (
        <div 
          className="rich-text-content"
          dangerouslySetInnerHTML={{ __html: content }} 
        />
      );
    }

    // Fallback for old markdown-style posts
    if (typeof content === 'string') {
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
        return <p key={index} className="text-gray-300 font-mono text-sm leading-relaxed mb-6">{text}</p>
      })
    }
    
    return null;
  }

  return (
    <div className="animate-fade-in max-w-4xl mx-auto pb-20 px-4">
      <Link href="/blog" className="inline-flex items-center gap-2 text-xs font-mono text-gray-500 hover:text-matrix-400 transition-colors mb-8 group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Intelligence Briefings
      </Link>

      <article className="relative">
        {/* Header Image Section */}
        <div className="w-full h-64 md:h-[450px] relative rounded-3xl overflow-hidden border border-white/5 bg-surface-900 shadow-2xl">
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={post.title} 
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-1000" 
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-matrix-400/10 to-transparent flex items-center justify-center">
              <BookOpen className="w-20 h-20 text-matrix-400/10" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-surface-950 via-surface-950/40 to-transparent"></div>
        </div>

        {/* Floating Title Card */}
        <div className="relative -mt-20 md:-mt-32 px-6 md:px-12 z-20">
          <div className="bg-surface-900/60 backdrop-blur-2xl border border-white/10 p-8 md:p-12 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div className="flex flex-col gap-6">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[10px] uppercase tracking-widest font-mono font-bold border text-matrix-400 bg-matrix-400/10 border-matrix-400/20 mb-6">
                  <Tag className="w-3.5 h-3.5" />
                  {post.category || 'Intelligence'}
                </span>
                <h1 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight leading-[1.1] mb-6">
                  {post.title}
                </h1>
                <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-gray-400">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-matrix-400/60" /> 
                    {new Date(post.publishedAt || post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-matrix-400/60" /> 
                    {isSanity ? 'Read Online' : `${Math.max(1, Math.ceil((post.content?.split(' ').length || 0) / 200))} min read`}
                  </span>
                </div>
              </div>

              {(post.meta_description || post.excerpt) && (
                <div className="border-t border-white/5 pt-8">
                  <p className="text-lg text-gray-400 font-heading leading-relaxed italic max-w-2xl">
                    {post.meta_description || post.excerpt}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Article Body */}
        <div className="px-6 md:px-12 py-12 md:py-20">
          <div className="prose prose-invert max-w-none prose-p:text-gray-300 prose-p:font-mono prose-p:text-sm prose-p:leading-loose prose-headings:font-display prose-headings:tracking-wider prose-headings:uppercase prose-strong:text-matrix-400">
            {isSanity ? (
              <PortableText value={post.body} components={components} />
            ) : (
              renderContent(post.content)
            )}
          </div>
        </div>
      </article>
    </div>
  )
}
