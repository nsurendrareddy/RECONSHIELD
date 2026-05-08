'use client'
import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, Image as ImageIcon, X, AlertCircle, Loader2, Tag, Eye, Edit3, Bold, Italic, List, Code, Link as LinkIcon, Heading1, Heading2, Heading3 } from 'lucide-react'
import Link from 'next/link'
import { API_BASE, BASE_URL } from '@/utils/api'

// NOTE: Auth logic removed to allow building in database-less mode
export default function BlogEditor({ initialData = null, isEdit = false }) {
  const router = useRouter()
  const textareaRef = useRef(null)

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
      setFormData(prev => ({
        ...prev,
        ...initialData,
        tags: initialData.tags || []
      }))
    }
  }, [initialData])

  // Toolbar action: wrap selection or insert markdown syntax
  const applyFormat = (prefix, suffix = '') => {
    const textarea = textareaRef.current
    if (!textarea) return
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selected = formData.content.slice(start, end)
    const before = formData.content.slice(0, start)
    const after = formData.content.slice(end)
    const newContent = `${before}${prefix}${selected || 'text'}${suffix}${after}`
    setFormData(prev => ({ ...prev, content: newContent }))
    // Restore focus and selection
    setTimeout(() => {
      textarea.focus()
      const newCursor = start + prefix.length + (selected || 'text').length + suffix.length
      textarea.setSelectionRange(newCursor, newCursor)
    }, 0)
  }

  const toolbarButtons = [
    { icon: <Heading1 className="w-4 h-4" />, action: () => applyFormat('# '), title: 'H1' },
    { icon: <Heading2 className="w-4 h-4" />, action: () => applyFormat('## '), title: 'H2' },
    { icon: <Heading3 className="w-4 h-4" />, action: () => applyFormat('### '), title: 'H3' },
    { icon: <Bold className="w-4 h-4" />, action: () => applyFormat('**', '**'), title: 'Bold' },
    { icon: <Italic className="w-4 h-4" />, action: () => applyFormat('_', '_'), title: 'Italic' },
    { icon: <Code className="w-4 h-4" />, action: () => applyFormat('`', '`'), title: 'Inline Code' },
    { icon: <List className="w-4 h-4" />, action: () => applyFormat('- '), title: 'List item' },
    { icon: <LinkIcon className="w-4 h-4" />, action: () => applyFormat('[', '](url)'), title: 'Link' },
  ]

  const renderPreview = (md) => {
    if (!md) return ''
    return md
      .replace(/^### (.+)$/gm, '<h3 class="text-lg font-bold text-white mt-6 mb-2 font-display uppercase tracking-wider">$1</h3>')
      .replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold text-white mt-8 mb-3 font-display uppercase tracking-wider">$1</h2>')
      .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold text-white mt-8 mb-4 font-display uppercase tracking-widest">$1</h1>')
      .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white">$1</strong>')
      .replace(/_(.+?)_/g, '<em class="text-gray-300">$1</em>')
      .replace(/`(.+?)`/g, '<code class="bg-surface-900 text-matrix-400 px-1.5 py-0.5 rounded text-xs font-mono">$1</code>')
      .replace(/^- (.+)$/gm, '<li class="ml-4 list-disc text-gray-300">$1</li>')
      .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-matrix-400 underline hover:text-matrix-300">$1</a>')
      .replace(/\n\n/g, '</p><p class="mb-4 text-gray-300">')
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => {
      const newData = { ...prev, [name]: value }
      const sanitizeSlug = (str) => {
        if (!str) return ''
        return str.toLowerCase().trim()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-+|-+$/g, '')
      }
      if (name === 'title' && !isEdit) {
        const currentGeneratedSlug = sanitizeSlug(prev.title)
        if (!prev.slug || prev.slug === currentGeneratedSlug) {
          newData.slug = sanitizeSlug(value)
        }
      }
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
        body: formDataUpload
      })
      if (!res.ok) throw new Error('Failed to upload image')
      const data = await res.json()
      setFormData(prev => ({ ...prev, image_url: data.url }))
    } catch (err) {
      setError('Image upload failed. Please try again.')
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
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Failed to save article')
      const finalSlug = data.slug || formData.slug
      router.refresh()
      router.push(`/blog/${finalSlug}`)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

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
            <p className="text-xs font-mono text-gray-500">Standalone Markdown Editor Mode</p>
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
        <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 text-sm font-mono">
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
            <p className="text-gray-500 font-mono text-xs italic">Preview Mode — Markdown rendered below</p>
          </div>
          <div
            className="prose prose-invert max-w-none font-mono text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: `<p class="mb-4 text-gray-300">${renderPreview(formData.content)}</p>` }}
          />
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

              <div className="space-y-2 flex flex-col">
                <label className="text-xs font-mono text-gray-500 uppercase tracking-widest ml-1">Content (Markdown)</label>

                {/* Toolbar */}
                <div className="flex flex-wrap gap-1 p-2 bg-surface-900 border border-white/5 rounded-t-xl border-b-0">
                  {toolbarButtons.map((btn, i) => (
                    <button
                      key={i}
                      type="button"
                      title={btn.title}
                      onClick={btn.action}
                      className="p-1.5 rounded text-gray-400 hover:text-matrix-400 hover:bg-white/5 transition-all"
                    >
                      {btn.icon}
                    </button>
                  ))}
                  <span className="ml-auto text-[10px] font-mono text-gray-600 self-center pr-1">Markdown supported</span>
                </div>

                <textarea
                  ref={textareaRef}
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="Write your intelligence briefing here... (Markdown supported)"
                  rows={20}
                  className="w-full bg-surface-900 border border-white/5 rounded-b-xl py-4 px-4 text-gray-300 font-mono text-sm focus:border-matrix-400 focus:outline-none transition-all resize-y leading-relaxed"
                />
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
