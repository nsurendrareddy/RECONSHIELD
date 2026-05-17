'use client'
import { useState } from 'react'
import { Mail, Globe, ExternalLink, Send, Terminal } from 'lucide-react'
import { API_BASE } from '@/utils/api';

export default function ContactClient() {
  const [status, setStatus] = useState('idle')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Question',
    message: ''
  })
  const [error, setError] = useState('')
  const emailArr = ['nsurendrareddy3', 'gmail.com']
  const obfuscatedEmail = emailArr.join('@')

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
      setFormData({ name: '', email: '', subject: 'General Question', message: '' })
      
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
            Welcome to ReconShield. We are a small independent research team dedicated to providing high-fidelity intelligence tools to the security community. You can reach out to us for security research questions, platform feedback, media enquiries, or enterprise deployment requests. 
            <br/><br/>
            As a lean team, we appreciate your patience and typically aim to respond within 48 hours. For direct inquiries or secure support, you can use the secure transmission form below or email us directly at <span className="text-matrix-400 font-mono">[your@email.com]</span>.
          </p>
        </div>

        <div className="space-y-4">
          <a href="https://github.com/nsurendrareddy" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-xl bg-surface-800/50 border border-white/5 hover:border-matrix-400/30 hover:bg-matrix-400/5 transition-all group">
            <Globe className="w-5 h-5 text-gray-400 group-hover:text-matrix-400 transition-colors" />
            <div>
              <p className="text-sm font-semibold text-white group-hover:text-matrix-400 transition-colors">GitHub Repository</p>
              <p className="text-xs font-mono text-gray-500">nsurendrareddy</p>
            </div>
          </a>
          <a href="https://www.linkedin.com/in/surendrareddy3/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-xl bg-surface-800/50 border border-white/5 hover:border-cyber-400/30 hover:bg-cyber-400/5 transition-all group">
            <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-cyber-400 transition-colors" />
            <div>
              <p className="text-sm font-semibold text-white group-hover:text-cyber-400 transition-colors">LinkedIn Network</p>
              <p className="text-xs font-mono text-gray-500">surendrareddy3</p>
            </div>
          </a>
          <a href={`mailto:${obfuscatedEmail}`} className="flex items-center gap-4 p-4 rounded-xl bg-surface-800/50 border border-white/5 hover:border-matrix-400/30 hover:bg-matrix-400/5 transition-all group">
            <Mail className="w-5 h-5 text-gray-400 group-hover:text-matrix-400 transition-colors" />
            <div>
              <p className="text-sm font-semibold text-white group-hover:text-matrix-400 transition-colors">Direct Email</p>
              <p className="text-xs font-mono text-matrix-400 uppercase">{obfuscatedEmail}</p>
            </div>
          </a>
        </div>
      </div>

      <div className="lg:w-2/3">
        <div className="glass-card p-8">
          <div className="font-mono text-[10px] text-[#94a3b8] uppercase tracking-[2px] mb-6">
            // RESPONSE TIME — We aim to respond within 48 hours.
          </div>
          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono">
              [!] ERROR: {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-gray-500 uppercase tracking-widest pl-1">Inquiry Type</label>
              <div className="relative">
                <select 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-surface-900 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-matrix-400/50 focus:ring-1 focus:ring-matrix-400/50 transition-all font-mono appearance-none"
                >
                  <option value="Bug Report">Bug Report</option>
                  <option value="Enterprise Inquiry">Enterprise Inquiry</option>
                  <option value="API Access Request">API Access Request</option>
                  <option value="General Question">General Question</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                  <Terminal className="w-4 h-4" />
                </div>
              </div>
            </div>

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
