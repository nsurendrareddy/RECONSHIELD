'use client'
import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Bot, ChevronDown } from 'lucide-react'
import { askAboutScan } from '../utils/api'

const SUGGESTIONS = [
  "What's my riskiest asset?",
  "Show critical issues",
  "SSL status?",
  "Score summary",
  "Attack paths",
  "Quick wins to fix",
  "Compliance score",
  "Subdomain summary",
]

function Bubble({ msg }) {
  const isUser = msg.role === 'user'
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
      {!isUser && (
        <div className="w-6 h-6 rounded-full bg-matrix-500/20 border border-matrix-500/30 flex items-center justify-center mr-2 shrink-0 mt-1">
          <Bot className="w-3 h-3 text-matrix-400" />
        </div>
      )}
      <div className={`max-w-[85%] px-3 py-2 rounded-2xl text-xs font-mono leading-relaxed whitespace-pre-wrap ${
        isUser
          ? 'bg-cyber-500/20 border border-cyber-500/20 text-cyber-200 rounded-tr-sm'
          : 'bg-surface-800/60 border border-white/[0.06] text-gray-300 rounded-tl-sm'
      }`}>
        {msg.text}
      </div>
    </div>
  )
}

export default function ChatbotPanel({ scanId, data }) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'bot', text: `👋 Hi! I'm your security analyst.\nAsk me about this scan — try "What's my riskiest asset?" or "Show critical issues".` }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  const ask = async (question) => {
    if (!question.trim()) return
    const q = question.trim()
    setMessages(m => {
      const updated = [...m, { role: 'user', text: q }];
      return updated.length > 100 ? updated.slice(-100) : updated;
    })
    setInput('')
    setLoading(true)
    try {
      let answer = ''
      if (scanId) {
        const json = await askAboutScan(scanId, q)
        answer = json.answer || 'No answer available.'
      } else {
        answer = 'Scan ID not available. Please run a scan first.'
      }
      setMessages(m => {
        const updated = [...m, { role: 'bot', text: answer }];
        return updated.length > 100 ? updated.slice(-100) : updated;
      })
    } catch (e) {
      setMessages(m => {
        const updated = [...m, { role: 'bot', text: '⚠️ Error fetching answer. Please try again.' }];
        return updated.length > 100 ? updated.slice(-100) : updated;
      })
    }
    setLoading(false)
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-matrix-500/20 border-2 border-matrix-400/40 flex items-center justify-center shadow-2xl hover:bg-matrix-500/30 transition-all duration-200 hover:scale-110 group"
        style={{ boxShadow: '0 0 24px rgba(0,255,156,0.15)' }}
      >
        {open ? <X className="w-5 h-5 text-matrix-400" /> : <MessageCircle className="w-5 h-5 text-matrix-400" />}
        {!open && <div className="absolute top-0 right-0 w-3 h-3 rounded-full bg-matrix-400 border-2 border-surface-900 animate-pulse" />}
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-surface-900/95 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl flex flex-col overflow-hidden"
          style={{ height: 480, boxShadow: '0 0 40px rgba(0,0,0,0.6), 0 0 24px rgba(0,255,156,0.08)' }}>
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06] bg-surface-950/60">
            <div className="w-8 h-8 rounded-full bg-matrix-500/15 border border-matrix-500/25 flex items-center justify-center">
              <Bot className="w-4 h-4 text-matrix-400" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white">Security Analyst</p>
              <p className="text-[10px] font-mono text-matrix-400">● Online — Ask about this scan</p>
            </div>
            <button onClick={() => setOpen(false)} className="ml-auto text-gray-600 hover:text-white"><ChevronDown className="w-4 h-4" /></button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1 scrollbar-thin scrollbar-thumb-surface-700">
            {messages.map((m, i) => <Bubble key={i} msg={m} />)}
            {loading && (
              <div className="flex items-center gap-2 px-3 py-2">
                <Bot className="w-3 h-3 text-matrix-400" />
                <div className="flex gap-1">
                  {[0, 1, 2].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-matrix-400/60 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />)}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick suggestions */}
          <div className="px-3 py-2 border-t border-white/[0.04] flex gap-1.5 overflow-x-auto scrollbar-none">
            {SUGGESTIONS.slice(0, 4).map((s, i) => (
              <button key={i} onClick={() => ask(s)}
                className="shrink-0 px-2 py-1 bg-surface-800/60 border border-white/[0.06] rounded-full text-[10px] font-mono text-gray-400 hover:text-white hover:border-matrix-400/30 transition-all">
                {s}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 px-4 py-3 border-t border-white/[0.06]">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && ask(input)}
              placeholder="Ask about this scan…"
              className="flex-1 bg-surface-800/60 border border-white/[0.06] rounded-xl px-3 py-2 text-xs font-mono text-white placeholder-gray-600 focus:outline-none focus:border-matrix-400/30 transition-all"
            />
            <button onClick={() => ask(input)} disabled={!input.trim() || loading}
              className="w-8 h-8 rounded-xl bg-matrix-500/20 border border-matrix-500/30 flex items-center justify-center hover:bg-matrix-500/30 disabled:opacity-40 transition-all">
              <Send className="w-3.5 h-3.5 text-matrix-400" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
