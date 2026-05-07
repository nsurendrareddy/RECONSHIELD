import { BookOpen, ArrowRight, Tag, Edit, Trash2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { API_BASE, BASE_URL } from '../utils/api'
import { Search } from 'lucide-react'

export default function Blog() {
  const [articles, setArticles] = useState([])
  const { role, token } = useAuth()
  const navigate = useNavigate()

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  useEffect(() => {
    fetch(`${API_BASE}/blog`)
      .then(res => res.json())
      .then(data => setArticles(data))
      .catch(err => console.error(err))
  }, [])

  const categories = ['All', ...new Set(articles.map(a => a.category))]

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         article.content.toLowerCase().includes(searchQuery.toLowerCase())
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

  const handleDelete = async (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this article?')) return;

    try {
      const res = await fetch(`${API_BASE}/blog/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        setArticles(articles.filter(a => a._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
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
            onClick={() => navigate(`/blog/${article.slug}`)} 
            key={article._id} 
            className="glass-card flex flex-col group animate-slide-up overflow-hidden hover:scale-[1.02] transition-transform duration-300 relative cursor-pointer" 
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            {/* Admin Controls */}
            {role === 'admin' && (
              <div className="absolute top-4 right-4 z-30 flex gap-2">
                <Link
                  to={`/blog/edit/${article._id}`}
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/40 backdrop-blur-md"
                >
                  <Edit className="w-4 h-4" />
                </Link>
                <button
                  onClick={(e) => handleDelete(article._id, e)}
                  className="p-2 bg-red-500/20 text-red-400 rounded hover:bg-red-500/40 backdrop-blur-md"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Article Image */}
            <div className="w-full h-48 relative overflow-hidden bg-surface-900 border-b border-white/5">
              {article.image_url ? (
                <img 
                  src={article.image_url.startsWith('http') ? article.image_url : `${BASE_URL}${article.image_url}`} 
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
                  {article.category}
                </span>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-6 flex flex-col flex-1">
              <div className="flex items-center justify-between text-[10px] font-mono text-gray-500 mb-3">
                <span>{new Date(article.created_at).toLocaleDateString()}</span>
              </div>

              <h3 className="text-lg font-heading font-semibold text-white mb-3 group-hover:text-matrix-400 transition-colors line-clamp-2">
                {article.title}
              </h3>
              
              <p className="text-sm text-gray-400 mb-6 flex-1 line-clamp-3 leading-relaxed">
                {article.meta_description || article.content.substring(0, 100) + '...'}
              </p>
              
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-matrix-400 group-hover:text-matrix-300 transition-colors uppercase tracking-wider w-fit">
                Read Full Article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
        {articles.length === 0 && (
          <p className="text-gray-500 col-span-full">No articles found.</p>
        )}
      </div>
    </div>
  )
}
