import { useState, useEffect, useRef } from 'react'
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, Cpu, Shield, Zap } from 'lucide-react'

const HACK_STEPS = [
  { cmd: 'nmap -sV --script=vuln {target}', output: 'Scanning target services and vulnerabilities...', delay: 1000 },
  { cmd: 'gobuster dir -u https://{target} -w common.txt', output: 'Finding hidden directories...', delay: 1500 },
  { cmd: 'ffuf -u https://{target}/FUZZ -w subdomains.txt', output: 'Fuzzing for subdomains...', delay: 1200 },
  { cmd: 'sqlmap -u "https://{target}/api/user?id=1" --batch', output: 'Testing for SQL injection points...', delay: 2000 },
  { cmd: 'subfinder -d {target}', output: 'Enumerating subdomains via passive sources...', delay: 1000 },
  { cmd: 'nuclei -u https://{target} -t cves/', output: 'Running template-based vulnerability scans...', delay: 1800 },
  { cmd: 'whois {target}', output: 'Fetching domain registration intelligence...', delay: 800 },
]

export default function HackTargetModal({ isOpen, onClose, target }) {
  const [lines, setLines] = useState([])
  const [currentStep, setCurrentStep] = useState(0)
  const [isMaximized, setIsMaximized] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    if (isOpen && currentStep < HACK_STEPS.length) {
      const step = HACK_STEPS[currentStep]
      
      // Type out command
      const cmdLine = { type: 'cmd', text: `root@reconshield:~# ${step.cmd.replace('{target}', target)}` }
      setLines(prev => [...prev, cmdLine])
      
      const timer = setTimeout(() => {
        // Show output
        setLines(prev => [...prev, { type: 'output', text: step.output }])
        
        // Next step
        const nextTimer = setTimeout(() => {
          setCurrentStep(prev => prev + 1)
        }, step.delay)
        
        return () => clearTimeout(nextTimer)
      }, 600)
      
      return () => clearTimeout(timer)
    }
  }, [isOpen, currentStep, target])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [lines])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 bg-surface-950/80 backdrop-blur-sm animate-fade-in">
      <div className={`terminal-card flex flex-col transition-all duration-300 ${isMaximized ? 'w-full h-full' : 'w-full max-w-3xl h-[500px]'}`}>
        {/* Title Bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-surface-900 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-amber-500/50" />
              <div className="w-3 h-3 rounded-full bg-matrix-500/50" />
            </div>
            <div className="h-4 w-px bg-white/10 mx-1" />
            <div className="flex items-center gap-2 text-[10px] font-mono text-gray-500 uppercase tracking-widest">
              <TerminalIcon className="w-3 h-3" />
              Educational Pentest Lab — {target}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setIsMaximized(!isMaximized)} className="p-1 hover:bg-white/5 rounded text-gray-500 hover:text-white transition-colors">
              {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
            <button onClick={onClose} className="p-1 hover:bg-red-500/20 rounded text-gray-500 hover:text-red-400 transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 font-mono text-xs sm:text-sm scrollbar-thin scrollbar-thumb-matrix-400/20">
          {lines.map((line, i) => (
            <div key={i} className={`mb-1 ${line.type === 'cmd' ? 'text-matrix-400' : 'text-gray-400 pl-4 border-l border-white/5'}`}>
              {line.text}
            </div>
          ))}
          {currentStep < HACK_STEPS.length ? (
            <div className="text-matrix-400 animate-pulse mt-2 flex items-center gap-2">
              <span className="w-2 h-4 bg-matrix-400" />
              <span className="text-[10px] uppercase tracking-tighter opacity-50">Processing next sequence...</span>
            </div>
          ) : (
            <div className="mt-6 p-4 bg-matrix-500/5 border border-matrix-500/20 rounded-xl animate-fade-in">
              <div className="flex items-center gap-3 mb-2">
                <Shield className="w-5 h-5 text-matrix-400" />
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">Simulation Complete</h4>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                You've just witnessed a simulated reconnaissance workflow. Real-world hacking involves these same tools but requires professional authorization.
              </p>
              <div className="mt-4 flex gap-3">
                <button onClick={onClose} className="px-4 py-2 bg-matrix-400/10 border border-matrix-400/20 text-matrix-400 rounded-lg text-[10px] uppercase font-bold hover:bg-matrix-400/20 transition-all">
                  Return to Dashboard
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-surface-900/50 border-t border-white/[0.04] flex items-center justify-between text-[9px] font-mono text-gray-600">
          <div className="flex gap-4">
            <span className="flex items-center gap-1"><Cpu className="w-2.5 h-2.5" /> CPU: 14%</span>
            <span className="flex items-center gap-1"><Zap className="w-2.5 h-2.5" /> LATENCY: 22ms</span>
          </div>
          <span className="uppercase italic">Simulation Environment v2.4</span>
        </div>
      </div>
    </div>
  )
}
