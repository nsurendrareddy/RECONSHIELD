'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ShieldCheck, ArrowRight, AlertCircle, Terminal } from 'lucide-react'
import { API_BASE } from '@/utils/api'

export default function VerifyOTP() {
  const [otp, setOtp] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    const savedEmail = sessionStorage.getItem('reset_email')
    if (!savedEmail) {
      router.push('/forgot-password')
    } else {
      setEmail(savedEmail)
    }
  }, [router])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    try {
      const response = await fetch(`${API_BASE}/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp })
      })

      const data = await response.json()

      if (response.ok) {
        setMessage(data.message)
        sessionStorage.setItem('reset_otp', otp)
        setTimeout(() => {
          router.push('/reset-password')
        }, 1500)
      } else {
        setError(data.detail || 'Invalid verification code.')
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
            <ShieldCheck className="w-8 h-8 text-matrix-400" />
          </div>
          <h2 className="text-2xl font-display font-bold text-white tracking-widest uppercase">MFA Challenge</h2>
          <p className="text-xs font-mono text-gray-500 mt-2">VERIFYING OPERATIVE IDENTITY</p>
          <p className="text-[10px] font-mono text-matrix-400/60 mt-4 px-4 uppercase leading-relaxed">
            A secure transmission was sent to <span className="text-matrix-400">{email}</span>. Enter the 6-digit code below.
          </p>
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
            <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest ml-1 text-center block w-full">Verification Code</label>
            <input
              type="text"
              required
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              className="w-full bg-surface-900/50 border border-white/5 rounded-xl py-4 px-4 text-2xl text-center text-matrix-400 tracking-[0.5em] focus:border-matrix-400/50 outline-none transition-all font-mono"
              placeholder="000000"
            />
          </div>

          <button
            type="submit"
            disabled={loading || otp.length < 6}
            className="w-full py-4 bg-matrix-400 text-surface-950 rounded-xl font-bold text-xs uppercase tracking-[0.2em] hover:bg-matrix-300 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? 'Verifying...' : 'Validate Code'}
            {!loading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <button 
            onClick={() => router.push('/forgot-password')}
            className="text-xs text-gray-500 font-mono hover:text-matrix-400 transition-colors"
          >
            Did not receive code? Restart Recovery
          </button>
        </div>
      </div>
    </div>
  )
}
