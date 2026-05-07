import React from 'react';

export default function Terms() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-6 font-mono text-sm">
      <h1 className="text-3xl font-display font-bold text-white mb-8 uppercase tracking-widest border-b border-white/5 pb-4">
        Terms of <span className="text-matrix-400">Service</span>
      </h1>
      
      <div className="space-y-8 text-gray-400 leading-relaxed">
        <section>
          <h2 className="text-white text-lg font-bold mb-3 uppercase">[1.0] Acceptable Use</h2>
          <p>
            You agree to use ReconShield only for ethical security research, authorized auditing, and educational purposes. 
            Unauthorized scanning of assets you do not own or have permission to test is strictly prohibited.
          </p>
        </section>

        <section>
          <h2 className="text-white text-lg font-bold mb-3 uppercase">[2.0] Limitation of Liability</h2>
          <p>
            ReconShield is provided "as is" without warranty of any kind. We are not responsible for any damage caused 
            by the use or misuse of the tools provided on this platform.
          </p>
        </section>

        <section>
          <h2 className="text-white text-lg font-bold mb-3 uppercase">[3.0] Termination</h2>
          <p>
            We reserve the right to terminate access to the platform for any user found violating ethical guidelines 
            or using the service for malicious activities.
          </p>
        </section>

        <p className="pt-8 border-t border-white/5 text-[10px]">
          Last Updated: 2026-05-07 // Operational Directive 44-B
        </p>
      </div>
    </div>
  );
}
