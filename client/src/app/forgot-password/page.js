'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Key, Mail, ArrowRight, AlertCircle, Terminal } from 'lucide-react'
import { API_BASE } from '@/utils/api'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    try {
      const response = await fetch(`${API_BASE}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      const data = await response.json()

      if (response.ok) {
        setMessage(data.message)
        // Store email for next step
        sessionStorage.setItem('reset_email', email)
        setTimeout(() => {
          router.push('/verify-otp')
        }, 2000)
      } else {
        setError(data.detail || 'Failed to initiate recovery.')
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
            <Key className="w-8 h-8 text-matrix-400" />
          </div>
          <h2 className="text-2xl font-display font-bold text-white tracking-widest uppercase">Token Recovery</h2>
          <p className="text-xs font-mono text-gray-500 mt-2">INITIATING SECURE ACCESS RESTORATION</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 text-xs font-mono">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {message && (
          <div className="mb-6 p-4 bg-matrix-400/10 border border-matrix-400/20 rounded-xl flex items-center gap-3 text-matrix-400 text-xs font-mono">
            <Terminal className="w-4 h-4 shrink-0" />
            <span>{message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest ml-1">Registered Email</label>
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

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-matrix-400 text-surface-950 rounded-xl font-bold text-xs uppercase tracking-[0.2em] hover:bg-matrix-300 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? 'Transmitting Request...' : 'Send Verification Code'}
            {!loading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-xs text-gray-500 font-mono">
            Remembered your token? <Link href="/login" className="text-matrix-400 hover:underline">Secure Login</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
