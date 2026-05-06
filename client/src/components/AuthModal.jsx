import { useNavigate } from 'react-router-dom'
import { X, Shield, Lock, ArrowRight } from 'lucide-react'

export default function AuthModal({ isOpen, onClose, message }) {
  const navigate = useNavigate()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-surface-950/80 backdrop-blur-sm animate-fade-in" 
        onClick={onClose} 
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-md glass-card p-8 animate-zoom-in border border-matrix-400/20 shadow-2xl shadow-matrix-400/10">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-matrix-400/10 border border-matrix-400/20 flex items-center justify-center mb-6">
            <Lock className="w-8 h-8 text-matrix-400" />
          </div>

          <h2 className="text-2xl font-display font-bold text-white mb-2 tracking-wide uppercase">
            Account Required
          </h2>
          
          <p className="text-gray-400 text-sm mb-8 leading-relaxed max-w-[280px]">
            {message || "Login to continue and unlock full features, including unlimited scans and report downloads."}
          </p>

          <div className="flex flex-col gap-3 w-full">
            <button 
              onClick={() => navigate('/login')}
              className="flex items-center justify-center gap-2 w-full py-3 bg-matrix-400 text-black font-bold rounded-xl hover:bg-matrix-300 transition-all shadow-lg shadow-matrix-400/20"
            >
              Sign In <ArrowRight className="w-4 h-4" />
            </button>
            
            <button 
              onClick={() => navigate('/register')}
              className="w-full py-3 bg-surface-800 text-gray-300 font-medium rounded-xl border border-white/5 hover:bg-surface-700 transition-all"
            >
              Create Free Account
            </button>
          </div>

          <div className="mt-8 flex items-center gap-2 text-[10px] font-mono text-gray-600 uppercase tracking-widest">
            <Shield className="w-3 h-3" /> Secure Ethical Intelligence
          </div>
        </div>
      </div>
    </div>
  )
}
