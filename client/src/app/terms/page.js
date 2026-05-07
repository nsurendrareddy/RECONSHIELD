export const metadata = {
  title: "Terms of Service | ReconShield Intelligence",
  description: "Terms and conditions for using the ReconShield platform for security research and reconnaissance.",
};

export default function Terms() {
  return (
    <div className="animate-fade-in max-w-4xl mx-auto py-12">
      <div className="glass-card p-10 md:p-16">
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
        </div>

        <div className="mt-16 p-6 bg-matrix-400/5 border border-matrix-400/20 rounded-xl">
          <p className="text-[10px] text-matrix-400/70 font-mono text-center uppercase tracking-[0.3em]">
            By accessing this platform, you acknowledge the responsibility of ethical research.
          </p>
        </div>
      </div>
    </div>
  )
}
