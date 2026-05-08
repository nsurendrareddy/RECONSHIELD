'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, Image as ImageIcon, X, AlertCircle, Loader2, Tag, Eye, Edit3 } from 'lucide-react'
import Link from 'next/link'
import { API_BASE, BASE_URL } from '@/utils/api'
import { useAuth } from '@/context/AuthContext'

import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
import 'react-quill-new/dist/quill.snow.css';

export default function BlogEditor({ initialData = null, isEdit = false }) {
  const router = useRouter()
  const { token, role } = useAuth()
  
  // Quill Modules configuration
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'code-block'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'code-block'
  ];
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Cybersecurity Basics',
    content: '',
    meta_title: '',
    meta_description: '',
    image_url: '',
    tags: []
  })

  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState(null)
  const [previewMode, setPreviewMode] = useState(false)

  const categories = [
    'Cybersecurity Basics',
    'OSINT',
    'DNS',
    'SSL',
    'Vulnerabilities',
    'Threat Intel',
    'Network Security'
  ]

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...formData,
        ...initialData,
        tags: initialData.tags || []
      })
    }
  }, [initialData])

  // Security check: Redirect if not admin
  useEffect(() => {
    if (role !== 'admin') {
      router.push('/blog')
    }
  }, [role, router])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => {
      const newData = { ...prev, [name]: value }
      
      // Sanitization function for slugs (matches backend logic)
      const sanitizeSlug = (str) => {
        if (!str) return ""
        return str.toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, '-') // Replace special chars and spaces with -
          .replace(/-+/g, '-')         // Remove duplicate hyphens
          .replace(/^-+|-+$/g, '')     // Trim hyphens from ends
      }

      // Auto-generate slug from title if not manually edited or if empty
      if (name === 'title' && !isEdit) {
        const currentGeneratedSlug = sanitizeSlug(prev.title)
        if (!prev.slug || prev.slug === currentGeneratedSlug) {
          newData.slug = sanitizeSlug(value)
        }
      }
      
      // If manually editing slug, sanitize it as well
      if (name === 'slug') {
        newData.slug = sanitizeSlug(value)
      }

      return newData
    })
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setUploading(true)
    setError(null)

    const formDataUpload = new FormData()
    formDataUpload.append('file', file)

    try {
      const res = await fetch(`${API_BASE}/blog/upload-image`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataUpload
      })

      if (!res.ok) throw new Error('Failed to upload image')
      
      const data = await res.json()
      setFormData(prev => ({ ...prev, image_url: data.url }))
    } catch (err) {
      setError('Image upload failed. Please try again.')
      console.error(err)
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const endpoint = isEdit 
      ? `${API_BASE}/blog/update/${initialData._id}` 
      : `${API_BASE}/blog/create`
    
    const method = isEdit ? 'PUT' : 'POST'

    try {
      const res = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.detail || 'Failed to save article')
      }

      // Ensure we use the slug from the server response in case it was modified
      const finalSlug = data.slug || formData.slug
      
      // Force refresh to clear any client-side caches
      router.refresh()
      router.push(`/blog/${finalSlug}`)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (role !== 'admin') return null

  return (
    <div className="max-w-5xl mx-auto pb-20 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Link href="/blog" className="p-2 rounded-lg bg-surface-900 border border-white/5 text-gray-400 hover:text-white hover:border-white/10 transition-all">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-display font-bold text-white tracking-wider uppercase">
              {isEdit ? 'Edit Intelligence Briefing' : 'Create Intelligence Briefing'}
            </h1>
            <p className="text-xs font-mono text-gray-500">Authorized administrative access only</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-mono transition-all border ${
              previewMode 
              ? 'bg-matrix-400 text-surface-950 border-matrix-400' 
              : 'bg-surface-900 text-gray-400 border-white/5 hover:border-matrix-400/30'
            }`}
          >
            {previewMode ? <Edit3 className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {previewMode ? 'Back to Editor' : 'Live Preview'}
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2 bg-matrix-400 text-surface-950 rounded-xl text-sm font-bold hover:bg-matrix-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(0,255,65,0.2)]"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {isEdit ? 'Update Transmission' : 'Publish to Archives'}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 text-sm font-mono animate-shake">
          <AlertCircle className="w-5 h-5 shrink-0" />
          {error}
        </div>
      )}

      {previewMode ? (
        <div className="glass-card p-8 md:p-12 animate-fade-in">
          <div className="mb-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono font-medium border text-matrix-400 bg-matrix-400/10 border-matrix-400/20 backdrop-blur-md mb-4">
              <Tag className="w-3.5 h-3.5" />
              {formData.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-display font-bold text-white tracking-wider uppercase leading-tight mb-4">
              {formData.title || 'Untitled Briefing'}
            </h1>
            <p className="text-gray-500 font-mono text-xs italic">Preview Mode — Content rendering below</p>
          </div>
          
          <div className="prose prose-invert max-w-none font-mono text-sm leading-relaxed text-gray-300">
            {formData.content.split('\n\n').map((p, i) => (
              <p key={i} className="mb-4 whitespace-pre-wrap">{p}</p>
            ))}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Primary Content */}
            <div className="glass-card p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-mono text-gray-500 uppercase tracking-widest ml-1">Briefing Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Intercepted Transmission: Zero-Day Analysis"
                  required
                  className="w-full bg-surface-900 border border-white/5 rounded-xl py-3 px-4 text-white focus:border-matrix-400 focus:outline-none transition-all font-display text-lg"
                />
              </div>

              <div className="space-y-2 flex flex-col min-h-[500px]">
                <label className="text-xs font-mono text-gray-500 uppercase tracking-widest ml-1">Content (Rich Text Editor)</label>
                <div className="flex-1 bg-surface-900 border border-white/5 rounded-xl overflow-hidden focus-within:border-matrix-400 transition-all">
                  <ReactQuill 
                    theme="snow"
                    value={formData.content}
                    onChange={(content) => setFormData(prev => ({ ...prev, content }))}
                    modules={modules}
                    formats={formats}
                    placeholder="Write your intelligence briefing here..."
                    className="h-full text-white font-mono blog-quill-editor"
                  />
                </div>
                <style jsx global>{`
                  .blog-quill-editor .ql-toolbar {
                    background: #111;
                    border: none !important;
                    border-bottom: 1px solid rgba(255,255,255,0.05) !important;
                    padding: 12px;
                  }
                  .blog-quill-editor .ql-container {
                    border: none !important;
                    font-family: 'JetBrains Mono', monospace !important;
                    font-size: 14px;
                    min-height: 400px;
                  }
                  .blog-quill-editor .ql-editor {
                    min-height: 400px;
                    color: #ccc;
                  }
                  .blog-quill-editor .ql-editor.ql-blank::before {
                    color: #555 !important;
                    font-style: normal;
                  }
                  .blog-quill-editor .ql-stroke {
                    stroke: #888 !important;
                  }
                  .blog-quill-editor .ql-fill {
                    fill: #888 !important;
                  }
                  .blog-quill-editor .ql-picker {
                    color: #888 !important;
                  }
                  .blog-quill-editor .ql-active .ql-stroke {
                    stroke: #00ff41 !important;
                  }
                `}</style>
              </div>
            </div>

            {/* SEO Settings */}
            <div className="glass-card p-6 space-y-6">
              <h3 className="text-sm font-display font-bold text-white tracking-widest uppercase border-b border-white/5 pb-3">Metadata & SEO</h3>
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono text-gray-500 uppercase tracking-widest ml-1">Meta Title</label>
                  <input
                    type="text"
                    name="meta_title"
                    value={formData.meta_title}
                    onChange={handleChange}
                    className="w-full bg-surface-900 border border-white/5 rounded-xl py-3 px-4 text-sm text-white focus:border-matrix-400 focus:outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono text-gray-500 uppercase tracking-widest ml-1">Meta Description</label>
                  <textarea
                    name="meta_description"
                    value={formData.meta_description}
                    onChange={handleChange}
                    rows={3}
                    className="w-full bg-surface-900 border border-white/5 rounded-xl py-3 px-4 text-sm text-gray-300 focus:border-matrix-400 focus:outline-none transition-all resize-none"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {/* Classification & Slug */}
            <div className="glass-card p-6 space-y-6">
              <h3 className="text-sm font-display font-bold text-white tracking-widest uppercase border-b border-white/5 pb-3">Classification</h3>
              
              <div className="space-y-2">
                <label className="text-xs font-mono text-gray-500 uppercase tracking-widest ml-1">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full bg-surface-900 border border-white/5 rounded-xl py-3 px-4 text-sm text-white focus:border-matrix-400 focus:outline-none transition-all"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-gray-500 uppercase tracking-widest ml-1">Slug (URL path)</label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  placeholder="zero-day-analysis"
                  className="w-full bg-surface-900 border border-white/5 rounded-xl py-3 px-4 text-sm text-matrix-400 font-mono focus:border-matrix-400 focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Featured Image */}
            <div className="glass-card p-6 space-y-6">
              <h3 className="text-sm font-display font-bold text-white tracking-widest uppercase border-b border-white/5 pb-3">Visual Intel</h3>
              
              <div className="space-y-4">
                {formData.image_url ? (
                  <div className="relative aspect-video rounded-lg overflow-hidden border border-white/10 group">
                    <img 
                      src={formData.image_url.startsWith('http') ? formData.image_url : `${BASE_URL}${formData.image_url}`} 
                      alt="Featured Preview" 
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, image_url: '' }))}
                      className="absolute top-2 right-2 p-1.5 bg-red-500/80 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center aspect-video rounded-lg border-2 border-dashed border-white/10 bg-surface-900/50 hover:bg-surface-900 hover:border-matrix-400/30 transition-all cursor-pointer group">
                    {uploading ? (
                      <Loader2 className="w-8 h-8 text-matrix-400 animate-spin" />
                    ) : (
                      <>
                        <ImageIcon className="w-8 h-8 text-gray-600 group-hover:text-matrix-400 transition-colors mb-2" />
                        <span className="text-[10px] font-mono text-gray-500 group-hover:text-gray-400 uppercase tracking-widest">Upload Header Image</span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={uploading}
                    />
                  </label>
                )}
                
                <div className="space-y-2">
                  <label className="text-xs font-mono text-gray-500 uppercase tracking-widest ml-1 text-[10px]">Or External URL</label>
                  <input
                    type="text"
                    name="image_url"
                    value={formData.image_url}
                    onChange={handleChange}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-surface-900 border border-white/5 rounded-xl py-2 px-3 text-xs text-gray-400 font-mono focus:border-matrix-400 focus:outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  )
}
