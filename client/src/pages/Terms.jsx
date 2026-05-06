import { ShieldAlert, CheckCircle2, XOctagon, AlertTriangle } from 'lucide-react'

export default function Terms() {
  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
          <ShieldAlert className="w-6 h-6 text-amber-500" />
        </div>
        <div>
          <h1 className="text-3xl font-display font-bold text-white tracking-wider uppercase">Terms of Use</h1>
          <p className="text-sm font-mono text-gray-500 mt-1">Legal guidelines for utilizing ReconShield</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="glass-card p-6 border-l-4 border-l-matrix-400">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-5 h-5 text-matrix-400" />
            <h2 className="text-lg font-heading font-semibold text-white uppercase tracking-wide">Authorized Access</h2>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed font-mono">
            Users MUST only scan domains they explicitly own or have documented, legal permission to test. ReconShield is an ethical cybersecurity platform built for defense and security analysis.
          </p>
        </div>

        <div className="glass-card p-6 border-l-4 border-l-red-500">
          <div className="flex items-center gap-2 mb-3">
            <XOctagon className="w-5 h-5 text-red-500" />
            <h2 className="text-lg font-heading font-semibold text-white uppercase tracking-wide">Prohibited Activities</h2>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed font-mono">
            Illegal or unauthorized usage of this platform is strictly prohibited. Utilizing this service for malicious reconnaissance, unauthorized penetration testing, or harassing third-party infrastructure will result in immediate termination of access.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card p-6 border-white/5">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-gray-400" />
              <h2 className="text-md font-heading font-semibold text-white uppercase tracking-wide">Disclaimer of Warranty</h2>
            </div>
            <p className="text-gray-500 text-xs leading-relaxed font-mono">
              This tool is provided "as-is" without any guarantees or warranties of any kind, express or implied. We do not guarantee the absolute accuracy, completeness, or reliability of the OSINT data or vulnerability analysis provided.
            </p>
          </div>

          <div className="glass-card p-6 border-white/5">
            <div className="flex items-center gap-2 mb-3">
              <ShieldAlert className="w-4 h-4 text-gray-400" />
              <h2 className="text-md font-heading font-semibold text-white uppercase tracking-wide">Limitation of Liability</h2>
            </div>
            <p className="text-gray-500 text-xs leading-relaxed font-mono">
              We are not responsible for the misuse of this platform. In no event shall the creators or operators of ReconShield be held liable for any direct, indirect, incidental, or consequential damages arising out of the use or inability to use the platform.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
