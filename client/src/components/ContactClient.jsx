'use client'
import { useState } from 'react'
import { Mail, Globe, ExternalLink, Send, Terminal } from 'lucide-react'
import { API_BASE } from '@/utils/api';

export default function ContactClient() {
  const [status, setStatus] = useState('idle')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    setError('')

    try {
      const response = await fetch(`${API_BASE}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to send transmission')
      }

      setStatus('sent')
      setFormData({ name: '', email: '', message: '' })
      
      setTimeout(() => setStatus('idle'), 5000)
    } catch (err) {
      console.error(err)
      setError('Transmission failed. Please check your secure connection.')
      setStatus('idle')
    }
  }

  return (
    <div className="animate-fade-in max-w-5xl mx-auto flex flex-col lg:flex-row gap-12">
      <div className="lg:w-1/3 space-y-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-matrix-400/10 border border-matrix-400/20 mb-4 text-xs font-mono text-matrix-400 uppercase tracking-widest">
            <Terminal className="w-3 h-3" />
            Ping Us
          </div>
          <h1 className="text-4xl font-display font-bold text-white tracking-wider uppercase mb-4">
            Secure Contact
          </h1>
          <p className="text-gray-400 text-sm leading-relaxed">
            Contact us for support or queries related to cybersecurity analysis, API access, or enterprise deployment of the ReconShield OSINT platform.
          </p>
        </div>

        <div className="space-y-4">
          <a href="#" className="flex items-center gap-4 p-4 rounded-xl bg-surface-800/50 border border-white/5 hover:border-matrix-400/30 hover:bg-matrix-400/5 transition-all group">
            <Globe className="w-5 h-5 text-gray-400 group-hover:text-matrix-400 transition-colors" />
            <div>
              <p className="text-sm font-semibold text-white group-hover:text-matrix-400 transition-colors">GitHub Repository</p>
              <p className="text-xs font-mono text-gray-500">Contribute to the project</p>
            </div>
          </a>
          <a href="#" className="flex items-center gap-4 p-4 rounded-xl bg-surface-800/50 border border-white/5 hover:border-cyber-400/30 hover:bg-cyber-400/5 transition-all group">
            <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-cyber-400 transition-colors" />
            <div>
              <p className="text-sm font-semibold text-white group-hover:text-cyber-400 transition-colors">LinkedIn Network</p>
              <p className="text-xs font-mono text-gray-500">Connect with the team</p>
            </div>
          </a>
          <div className="flex items-center gap-4 p-4 rounded-xl bg-surface-800/50 border border-white/5">
            <Mail className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm font-semibold text-white">Direct Email</p>
              <p className="text-xs font-mono text-matrix-400">secure@reconshield.com</p>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:w-2/3">
        <div className="glass-card p-8">
          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono">
              [!] ERROR: {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-gray-500 uppercase tracking-widest pl-1">Agent Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-surface-900 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-matrix-400/50 focus:ring-1 focus:ring-matrix-400/50 transition-all font-mono"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-gray-500 uppercase tracking-widest pl-1">Secure Email</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-surface-900 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-matrix-400/50 focus:ring-1 focus:ring-matrix-400/50 transition-all font-mono"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-gray-500 uppercase tracking-widest pl-1">Encrypted Message</label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full bg-surface-900 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-matrix-400/50 focus:ring-1 focus:ring-matrix-400/50 transition-all font-mono resize-none"
                placeholder="Enter your transmission here..."
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={status !== 'idle'}
              className="w-full bg-matrix-400/10 hover:bg-matrix-400/20 text-matrix-400 border border-matrix-400/30 rounded-lg py-3 flex items-center justify-center gap-2 font-heading font-semibold tracking-widest uppercase transition-all disabled:opacity-50"
            >
              {status === 'idle' && <><Send className="w-4 h-4" /> Transmit Message</>}
              {status === 'sending' && <span className="font-mono lowercase">Encrypting & Sending...</span>}
              {status === 'sent' && <span className="font-mono lowercase text-matrix-400">Transmission Successful ✓</span>}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
