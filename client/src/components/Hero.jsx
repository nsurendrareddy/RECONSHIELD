import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Target, Activity, Globe } from 'lucide-react';

export default function Hero({ onStartScan }) {
  return (
    <div className="relative pt-20 pb-16 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-matrix-400/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyber-400/5 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-matrix-400/5 border border-matrix-400/10 mb-8"
        >
          <Zap className="w-3.5 h-3.5 text-matrix-400" />
          <span className="text-[10px] font-mono text-matrix-400 font-bold uppercase tracking-[0.2em]">
            Next-Gen Threat Intelligence
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-display font-black text-white leading-tight mb-6"
        >
          AI-Powered <span className="text-gradient-matrix">Cybersecurity</span> <br />
          & Threat Intelligence Platform
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed font-light"
        >
          Scan websites, analyze IP threats, detect vulnerabilities, and monitor cyber risks in real time using advanced AI security analytics.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <button
            onClick={() => document.getElementById('domain-input')?.focus()}
            className="px-8 py-4 bg-matrix-400 text-surface-950 font-bold rounded-xl hover:bg-matrix-300 transition-all flex items-center gap-2 shadow-lg shadow-matrix-400/20 active:scale-95"
          >
            <Shield className="w-5 h-5" /> Start Free Scan
          </button>
          <button
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            className="px-8 py-4 bg-surface-800 text-white border border-white/5 font-bold rounded-xl hover:bg-surface-700 transition-all flex items-center gap-2 active:scale-95"
          >
            <Target className="w-5 h-5 text-matrix-400" /> Exploration Mode
          </button>
        </motion.div>

        {/* Animated Stats Ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 border-t border-white/5 pt-12"
        >
          <StatBox label="Active Threats" value="1.2M+" icon={<Activity />} />
          <StatBox label="Nodes Monitored" value="84.2K" icon={<Globe />} />
          <StatBox label="Daily Scans" value="12.5K" icon={<Target />} />
          <StatBox label="Security Score" value="98.4" icon={<Shield />} />
        </motion.div>
      </div>
    </div>
  );
}

function StatBox({ label, value, icon }) {
  return (
    <div className="text-left group cursor-default">
      <div className="flex items-center gap-2 mb-1 text-gray-500 group-hover:text-matrix-400 transition-colors">
        {React.cloneElement(icon, { className: 'w-3 h-3' })}
        <span className="text-[10px] font-mono uppercase tracking-widest">{label}</span>
      </div>
      <div className="text-2xl font-display font-bold text-white group-hover:text-glow-green transition-all">{value}</div>
    </div>
  );
}
