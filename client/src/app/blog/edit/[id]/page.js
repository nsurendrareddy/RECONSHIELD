'use client'
import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import BlogEditor from '@/components/BlogEditor'
import { API_BASE } from '@/utils/api'
import { Loader2, AlertCircle } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

export default function EditBlogPage() {
  const { id } = useParams()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { token, role } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!id) return
    
    // Security check
    if (role !== 'admin') {
      router.push('/blog')
      return
    }

    const fetchArticle = async () => {
      try {
        const res = await fetch(`${API_BASE}/blog/id/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        if (!res.ok) throw new Error('Failed to fetch article')
        const data = await res.json()
        setArticle(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchArticle()
  }, [id, token, role, router])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-40 gap-4">
        <Loader2 className="w-10 h-10 text-matrix-400 animate-spin" />
        <p className="text-gray-500 font-mono text-sm animate-pulse tracking-widest uppercase">Deciphering Intelligence Data...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto py-20 text-center space-y-6">
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto" />
        <h1 className="text-2xl font-display font-bold text-white uppercase tracking-wider">Access Denied / Not Found</h1>
        <p className="text-gray-500 font-mono">{error}</p>
        <button 
          onClick={() => router.push('/blog')}
          className="px-6 py-2 bg-surface-900 border border-white/5 text-matrix-400 rounded-xl hover:bg-surface-800 transition-all font-mono text-sm"
        >
          Return to Archives
        </button>
      </div>
    )
  }

  return (
    <div className="py-10">
      <BlogEditor initialData={article} isEdit={true} />
    </div>
  )
}
