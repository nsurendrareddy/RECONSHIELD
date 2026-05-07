import React from 'react';
import { Shield, Target, Activity, Users, Globe, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="max-w-5xl mx-auto py-16 px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-display font-black text-white mb-6 uppercase tracking-wider">
          About <span className="text-matrix-400">ReconShield</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed font-mono">
          Empowering organizations with autonomous, AI-driven threat intelligence and vulnerability analysis.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        <div className="space-y-6">
          <h2 className="text-2xl font-display font-bold text-white flex items-center gap-3">
            <Shield className="text-matrix-400" /> Our Mission
          </h2>
          <p className="text-gray-400 leading-relaxed font-mono text-sm">
            In an era where cyber threats evolve faster than defenses, ReconShield was built to bridge the gap. Our mission is to provide enterprise-grade reconnaissance tools to everyone—from bug bounty hunters to CISOs—enabling proactive security rather than reactive patching.
          </p>
        </div>
        <div className="space-y-6">
          <h2 className="text-2xl font-display font-bold text-white flex items-center gap-3">
            <Target className="text-matrix-400" /> Technology
          </h2>
          <p className="text-gray-400 leading-relaxed font-mono text-sm">
            We combine distributed scanning nodes, AI-powered pattern recognition, and real-time OSINT feeds to create a 360-degree view of any digital asset. Our engine processes thousands of data points in seconds to deliver actionable security intelligence.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <FeatureCard icon={<Activity />} title="Real-time" desc="Live monitoring of attack surfaces." />
        <FeatureCard icon={<Users />} title="Community" desc="Built for security researchers." />
        <FeatureCard icon={<Globe />} title="OSINT" desc="Global intelligence gathering." />
        <FeatureCard icon={<Lock />} title="Privacy" desc="Ethical and non-intrusive scans." />
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="p-6 glass border border-white/5 rounded-2xl hover:border-matrix-400/30 transition-all group">
      <div className="w-10 h-10 rounded-lg bg-matrix-400/10 flex items-center justify-center mb-4 text-matrix-400 group-hover:scale-110 transition-transform">
        {React.cloneElement(icon, { size: 20 })}
      </div>
      <h3 className="text-white font-bold mb-2 uppercase text-xs tracking-widest">{title}</h3>
      <p className="text-gray-500 text-[10px] font-mono leading-relaxed">{desc}</p>
    </div>
  );
}
