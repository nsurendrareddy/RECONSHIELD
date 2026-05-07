'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Lock, Mail, ArrowRight, Shield, AlertCircle } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { API_BASE } from '@/utils/api'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (response.ok) {
        login(data.token, data.role)
        router.push('/')
      } else {
        setError(data.detail || 'Invalid intelligence credentials.')
      }
    } catch (err) {
      setError('Connection to intelligence relay failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto py-12 animate-fade-in">
      <div className="glass-card p-8 border-matrix-400/10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-matrix-400/10 border border-matrix-400/20 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-matrix-400" />
          </div>
          <h2 className="text-2xl font-display font-bold text-white tracking-widest uppercase">Secure Login</h2>
          <p className="text-xs font-mono text-gray-500 mt-2">ACCESSING RECONSHIELD CENTRAL COMMAND</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 text-xs font-mono">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest ml-1">Personnel Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-surface-900/50 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:border-matrix-400/50 outline-none transition-all font-mono"
                placeholder="agent@reconshield.io"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest ml-1">Access Token</label>
            <div className="relative">
              <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-surface-900/50 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:border-matrix-400/50 outline-none transition-all font-mono"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-matrix-400 text-surface-950 rounded-xl font-bold text-xs uppercase tracking-[0.2em] hover:bg-matrix-300 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Establish Connection'}
            {!loading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-xs text-gray-500 font-mono">
            New operative? <Link href="/register" className="text-matrix-400 hover:underline">Request Access</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
