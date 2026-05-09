'use client'
import { BookOpen, ArrowRight, Tag, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { API_BASE, BASE_URL } from '@/utils/api'
import { client, blogListQuery, urlFor } from '@/utils/sanity'

export default function Blog() {
  const [sanityArticles, setSanityArticles] = useState([])
  const router = useRouter()

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  useEffect(() => {
    // Fetch ONLY from Sanity
    console.log('Fetching blog posts from Sanity...');
    client.fetch(blogListQuery)
      .then(data => {
        console.log('Sanity Articles Fetched:', data?.length || 0, data);
        setSanityArticles(data || []);
      })
      .catch(err => {
        console.error('Sanity fetch error:', err);
        // Fallback or error state
      })
  }, [])

  // Process Sanity articles
  const allArticles = sanityArticles.map(a => {
    const hasSlug = a.slug;
    if (!hasSlug) {
      console.warn(`Article "${a.title || 'Untitled'}" is missing a slug and will be hidden.`, a);
    }
    return { 
      ...a, 
      _source: 'sanity', 
      created_at: a.publishedAt || a._createdAt, // Fallback to _createdAt if publishedAt is missing
      image_url: a.mainImage ? urlFor(a.mainImage).url() : null,
      content: a.excerpt || ''
    };
  })
  .sort((a, b) => {
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);
    return dateB - dateA;
  })

  // Filter for display
  const articlesWithSlugs = allArticles.filter(a => a.slug)
  const articlesMissingSlugs = allArticles.filter(a => !a.slug)

  const categories = ['All', ...new Set(articlesWithSlugs.map(a => a.category).filter(Boolean))]

  const filteredArticles = articlesWithSlugs.filter(article => {
    const matchesSearch = (article.title || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (article.content || '').toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getCategoryColor = (cat) => {
    const colors = {
      'OSINT': 'text-neon-400 bg-neon-400/10 border-neon-400/20',
      'Cybersecurity Basics': 'text-matrix-400 bg-matrix-400/10 border-matrix-400/20',
      'DNS': 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
      'SSL': 'text-amber-400 bg-amber-400/10 border-amber-400/20',
      'Vulnerabilities': 'text-red-400 bg-red-400/10 border-red-400/20',
    }
    return colors[cat] || 'text-gray-400 bg-gray-400/10 border-gray-400/20'
  }

  return (
    <div className="animate-fade-in max-w-6xl mx-auto">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-12 h-12 rounded-xl bg-matrix-400/10 border border-matrix-400/20 flex items-center justify-center">
          <BookOpen className="w-6 h-6 text-matrix-400" />
        </div>
        <div>
          <h2 className="text-3xl font-display font-bold text-white tracking-wider uppercase">Intelligence Blog</h2>
          <p className="text-sm font-mono text-gray-500 mt-1">Insights, guides, and OSINT techniques</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-12">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input 
            type="text"
            placeholder="Search intelligence briefings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface-900 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:border-matrix-400 focus:outline-none transition-all"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-mono whitespace-nowrap border transition-all ${
                selectedCategory === cat 
                ? 'bg-matrix-400 text-surface-950 border-matrix-400 font-bold' 
                : 'bg-surface-900 text-gray-500 border-white/5 hover:border-matrix-400/30'
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredArticles.map((article, i) => (
          <div 
            onClick={() => router.push(`/blog/${article.slug}`)} 
            key={article._id} 
            className="glass-card flex flex-col group animate-slide-up overflow-hidden hover:scale-[1.02] transition-transform duration-300 relative cursor-pointer" 
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            {/* Article Image */}
            <div className="w-full h-48 relative overflow-hidden bg-surface-900 border-b border-white/5">
              {article.image_url ? (
                <img 
                  src={article.image_url} 
                  alt={article.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-matrix-400/5 to-transparent flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-matrix-400/20" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-surface-950 to-transparent z-10 opacity-60"></div>
              <div className="absolute top-4 left-4 z-20">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-mono font-medium border backdrop-blur-md ${getCategoryColor(article.category)}`}>
                  <Tag className="w-3 h-3" />
                  {article.category || 'INTEL'}
                </span>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-6 flex flex-col flex-1">
              <div className="flex items-center justify-between text-[10px] font-mono text-gray-500 mb-3">
                <span>{new Date(article.created_at).toLocaleDateString()}</span>
                <span className="text-matrix-400 opacity-50">Verified Intel</span>
              </div>

              <h3 className="text-lg font-heading font-semibold text-white mb-3 group-hover:text-matrix-400 transition-colors line-clamp-2">
                {article.title}
              </h3>
              
              <p className="text-sm text-gray-400 mb-6 flex-1 line-clamp-3 leading-relaxed">
                {article.excerpt || article.content?.substring(0, 100) + '...'}
              </p>
              
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-matrix-400 group-hover:text-matrix-300 transition-colors uppercase tracking-wider w-fit">
                Read Full Article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
        {articlesWithSlugs.length === 0 && (
          <div className="col-span-full py-20 text-center">
            <p className="text-gray-500 mb-4">No published intelligence briefings found.</p>
            {articlesMissingSlugs.length > 0 && (
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-mono inline-block">
                Warning: {articlesMissingSlugs.length} post(s) found but they are missing a URL slug.
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Hidden Debug Info for Admin */}
      {articlesMissingSlugs.length > 0 && articlesWithSlugs.length > 0 && (
        <div className="mt-8 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-mono">
          SYSTEM NOTE: {articlesMissingSlugs.length} post(s) (e.g. "{articlesMissingSlugs[0].title}") are hidden because they lack a slug.
        </div>
      )}
    </div>
  )
}
