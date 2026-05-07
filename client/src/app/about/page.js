import { Shield, Target, Activity, Users, Globe, Lock, Cpu } from 'lucide-react'

export const metadata = {
  title: "About ReconShield | AI-Powered Cybersecurity Research",
  description: "Learn about the mission of ReconShield: providing advanced, AI-driven visibility into global attack surfaces for security researchers.",
};

export default function About() {
  const features = [
    { icon: Globe, title: 'Global Intelligence', desc: 'Real-time monitoring of infrastructure and network reputation across 200+ countries.' },
    { icon: Lock, title: 'Security Auditing', desc: 'Deep-packet inspection of SSL/TLS and security headers to ensure data encryption standards.' },
    { icon: Cpu, title: 'AI-Powered Analysis', desc: 'Using advanced language models to interpret complex technical scans into human-readable risk reports.' },
    { icon: Target, title: 'Precision Recon', desc: 'High-fidelity mapping of DNS records and subdomain structures for comprehensive visibility.' },
  ]

  return (
    <div className="animate-fade-in max-w-5xl mx-auto py-10">
      <div className="text-center mb-20">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-matrix-400/10 border border-matrix-400/20 mb-6">
          <Shield className="w-10 h-10 text-matrix-400" />
        </div>
        <h1 className="text-4xl md:text-6xl font-display font-bold text-white tracking-widest uppercase mb-6">
          The <span className="text-matrix-400">ReconShield</span> Mission
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed font-mono">
          Empowering the next generation of security researchers with AI-driven visibility into the digital attack surface.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
        {features.map((f, i) => (
          <div key={i} className="glass-card p-8 group hover:border-matrix-400/40 transition-all duration-500">
            <f.icon className="w-12 h-12 text-matrix-400/30 mb-6 group-hover:text-matrix-400 group-hover:scale-110 transition-all" />
            <h3 className="text-xl font-display font-bold text-white mb-3 tracking-wide">{f.title}</h3>
            <p className="text-gray-500 leading-relaxed text-sm font-mono">{f.desc}</p>
          </div>
        ))}
      </div>

      <div className="glass-card p-12 border-matrix-400/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <Activity className="w-64 h-64 text-matrix-400" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-3xl font-display font-bold text-white mb-6 tracking-wide">ETHICAL INTELLECTUALISM</h2>
          <p className="text-gray-400 leading-relaxed mb-6 font-mono">
            ReconShield was built on the principle that visibility is the first step toward defense. We believe that by democratizing high-level reconnaissance tools, we can help build a more resilient internet.
          </p>
          <div className="flex items-center gap-4 py-6 border-t border-white/5">
             <div className="flex -space-x-3">
               {[1,2,3,4].map(i => (
                 <div key={i} className="w-10 h-10 rounded-full bg-surface-800 border-2 border-surface-950 flex items-center justify-center">
                   <Users className="w-4 h-4 text-gray-600" />
                 </div>
               ))}
             </div>
             <p className="text-xs font-mono text-gray-500 tracking-tighter">JOINED BY 2,500+ RESEARCHERS GLOBALLY</p>
          </div>
        </div>
      </div>
    </div>
  )
}
