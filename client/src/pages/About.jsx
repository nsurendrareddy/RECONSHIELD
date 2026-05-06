import { Shield, Target, Cpu, TerminalSquare, Info, Lock } from 'lucide-react'

export default function About() {
  return (
    <div className="animate-fade-in max-w-5xl mx-auto space-y-12 pb-20">
      {/* Premium Hero Header */}
      <div className="relative text-center py-12">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-matrix-400/[0.03] rounded-full blur-[120px] -z-10" />
        
        <div className="relative inline-block mb-8">
          <div className="absolute -inset-4 bg-matrix-400/20 rounded-full blur-xl animate-pulse" />
          <div className="relative w-20 h-20 rounded-3xl bg-surface-900 border border-matrix-400/30 flex items-center justify-center shadow-2xl shadow-matrix-400/20">
            <Shield className="w-10 h-10 text-matrix-400" />
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tighter mb-6">
          ADVANCED <span className="text-matrix-400">INTELLIGENCE</span>
        </h1>
        
        <div className="max-w-3xl mx-auto space-y-6">
          <p className="text-lg md:text-xl text-gray-300 font-heading leading-relaxed">
            ReconShield is an <span className="text-white font-semibold">advanced cybersecurity intelligence and OSINT platform</span> designed to analyze domains using modern, non-intrusive reconnaissance techniques.
          </p>
          <p className="text-gray-400 font-mono text-sm leading-relaxed max-w-2xl mx-auto">
            We provide developers, system administrators, and security professionals with deep visibility into their digital assets, identifying potential risks before they become critical threats.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Mission Section */}
        <div className="glass-card p-10 relative overflow-hidden group border-white/[0.03]">
          <div className="absolute top-0 right-0 w-48 h-48 bg-neon-500/[0.02] rounded-bl-full -z-10 group-hover:bg-neon-500/[0.05] transition-all duration-500" />
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 rounded-xl bg-neon-500/10 border border-neon-500/20 flex items-center justify-center">
              <Target className="w-5 h-5 text-neon-400" />
            </div>
            <h2 className="text-2xl font-display font-bold text-white uppercase tracking-wider">Our Mission</h2>
          </div>
          <p className="text-gray-400 text-base leading-relaxed font-mono italic border-l-2 border-neon-400/30 pl-6">
            "To provide simple, accessible, and ethical cybersecurity analysis tools that empower individuals and organizations to understand, monitor, and secure their attack surface proactively."
          </p>
        </div>

        {/* Ethical Commitment Section */}
        <div className="glass-card p-10 border-matrix-400/10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-48 h-48 bg-matrix-400/[0.02] rounded-bl-full -z-10 group-hover:bg-matrix-400/[0.05] transition-all duration-500" />
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 rounded-xl bg-matrix-400/10 border border-matrix-400/20 flex items-center justify-center">
              <Lock className="w-5 h-5 text-matrix-400" />
            </div>
            <h2 className="text-2xl font-display font-bold text-white uppercase tracking-wider">Ethical Commitment</h2>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-1 bg-matrix-400/5 blur-md rounded-lg" />
            <div className="relative bg-surface-950/80 border border-matrix-400/20 rounded-xl p-5 font-mono text-[11px] leading-relaxed shadow-inner">
              <div className="flex items-center gap-2 text-matrix-400/80 mb-3 border-b border-matrix-400/10 pb-2">
                <TerminalSquare className="w-3.5 h-3.5" />
                <span>root@reconshield:~$ cat policy.txt</span>
              </div>
              <p className="text-gray-300">
                This platform is intended strictly for authorized security analysis. 
                Users must only scan domains they own or have explicit permission to test.
              </p>
              <p className="text-matrix-400/60 mt-3">
                [+] We support defensive security, OSINT research, and awareness, not exploitation or misuse.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Technology Stack */}
      <div className="glass-card p-10 border-cyber-400/10">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-10 h-10 rounded-xl bg-cyber-400/10 border border-cyber-400/20 flex items-center justify-center">
            <Cpu className="w-5 h-5 text-cyber-400" />
          </div>
          <h2 className="text-2xl font-display font-bold text-white uppercase tracking-wider">Intelligence Stack</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-cyber-400/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
            <div className="relative bg-surface-900 border border-white/5 rounded-2xl p-6 text-center hover:border-cyber-400/30 transition-all duration-300">
              <div className="text-2xl font-display font-bold text-white mb-1">React</div>
              <div className="text-[10px] font-mono text-cyber-400 uppercase tracking-widest mb-4">Frontend Interface</div>
              <p className="text-xs text-gray-500 font-mono leading-tight">Modern, reactive UI for real-time intelligence visualization.</p>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-0.5 bg-matrix-400/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
            <div className="relative bg-surface-900 border border-white/5 rounded-2xl p-6 text-center hover:border-matrix-400/30 transition-all duration-300">
              <div className="text-2xl font-display font-bold text-white mb-1">FastAPI</div>
              <div className="text-[10px] font-mono text-matrix-400 uppercase tracking-widest mb-4">Async Backend</div>
              <p className="text-xs text-gray-500 font-mono leading-tight">High-performance Python engine for multi-threaded scanning.</p>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-0.5 bg-neon-400/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
            <div className="relative bg-surface-900 border border-white/5 rounded-2xl p-6 text-center hover:border-neon-400/30 transition-all duration-300">
              <div className="text-2xl font-display font-bold text-white mb-1">Linux Core</div>
              <div className="text-[10px] font-mono text-neon-400 uppercase tracking-widest mb-4">Native Tools</div>
              <p className="text-xs text-gray-500 font-mono leading-tight">Secure reconnaissance engine leveraging native security tools.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Trust & SEO Footer */}
      <div className="flex items-center justify-center gap-8 py-8 border-t border-white/[0.03]">
        <div className="flex items-center gap-2 text-[10px] font-mono text-gray-600 uppercase tracking-widest">
          <Info className="w-3.5 h-3.5" /> OSINT Verified
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono text-gray-600 uppercase tracking-widest">
          <Shield className="w-3.5 h-3.5" /> Ethical Standard
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono text-gray-600 uppercase tracking-widest">
          <Cpu className="w-3.5 h-3.5" /> High Performance
        </div>
      </div>
    </div>
  )
}
