import Link from 'next/link'

export const metadata = {
  title: "Terms of Use | ReconShield Engagement & Services",
  description: "Read the Terms of Use for ReconShield. Review the rules for authorized use, data accuracy, and ethical security research on our intelligence platform.",
  alternates: {
    canonical: 'https://reconshield.in/terms',
  },
  openGraph: {
    title: "Terms of Service | ReconShield Intelligence",
    description: "Terms and conditions for using the ReconShield platform for security research and reconnaissance.",
    url: 'https://reconshield.in/terms',
    type: 'website',
  }
};

export default function Terms() {
  return (
    <div className="animate-fade-in max-w-4xl mx-auto py-12">
      <div className="glass-card p-10 md:p-16">
        <div className="font-mono text-[10px] text-[#94a3b8] uppercase tracking-[2px] mb-8">
          LAST UPDATED: MAY 10, 2026
        </div>
        <h1 className="text-3xl font-display font-bold text-white tracking-widest uppercase mb-10 border-b border-white/5 pb-6">
          Terms of <span className="text-matrix-400">Engagement</span>
        </h1>
        
        <div className="space-y-12 font-mono text-sm leading-relaxed text-gray-400">
          <section>
            <h3 className="text-white font-bold mb-4 flex items-center gap-3">
              <span className="text-matrix-400">01.</span> AUTHORIZED USE
            </h3>
            <p>
              ReconShield is a platform designed for authorized security testing and educational research. You agree to only use our tools against assets you own or have explicit written permission to test. Unauthorized scanning of third-party networks is strictly prohibited and may be illegal.
            </p>
          </section>

          <section>
            <h3 className="text-white font-bold mb-4 flex items-center gap-3">
              <span className="text-matrix-400">02.</span> DATA ACCURACY
            </h3>
            <p>
              While we strive for 100% precision, intelligence reports are generated based on passive data collection and third-party feeds. ReconShield makes no warranties regarding the absolute accuracy of threat ratings or vulnerability detections.
            </p>
          </section>

          <section>
            <h3 className="text-white font-bold mb-4 flex items-center gap-3">
              <span className="text-matrix-400">03.</span> INTELLECTUAL PROPERTY
            </h3>
            <p>
              The platform architecture, AI scanning algorithms, and user interface are the exclusive property of ReconShield. You may use generated reports for internal security purposes but may not resell our intelligence feeds without prior authorization.
            </p>
          </section>

          <section>
            <h3 className="text-white font-bold mb-4 flex items-center gap-3">
              <span className="text-matrix-400">04.</span> TERMINATION
            </h3>
            <p>
              We reserve the right to terminate access to any user found violating ethical hacking standards or using the platform to facilitate malicious activity.
            </p>
          </section>

          <section>
            <h3 className="text-white font-bold mb-4 flex items-center gap-3">
              <span className="text-matrix-400">05.</span> GOVERNING LAW
            </h3>
            <p>
              This agreement is governed by the laws of India. Any disputes shall be resolved under Indian jurisdiction.
            </p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/privacy" className="text-xs font-mono text-[#94a3b8] hover:text-[#00ff88] transition-colors uppercase tracking-[1px]">
            For information on data handling, see our Privacy Policy →
          </Link>
          <div className="p-4 bg-matrix-400/5 border border-matrix-400/20 rounded-xl flex-1 md:flex-none">
            <p className="text-[10px] text-matrix-400/70 font-mono text-center uppercase tracking-[0.3em]">
              Ethical research is a shared responsibility.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
