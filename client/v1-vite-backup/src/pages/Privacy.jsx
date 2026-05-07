import React from 'react';

export default function Privacy() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-6 font-mono text-sm">
      <h1 className="text-3xl font-display font-bold text-white mb-8 uppercase tracking-widest border-b border-white/5 pb-4">
        Privacy <span className="text-matrix-400">Policy</span>
      </h1>
      
      <div className="space-y-8 text-gray-400 leading-relaxed">
        <section>
          <h2 className="text-white text-lg font-bold mb-3 uppercase">[1.0] Data Collection</h2>
          <p>
            ReconShield collects minimal personal information necessary for account management and security auditing. 
            We do not sell or trade your data with third parties.
          </p>
        </section>

        <section>
          <h2 className="text-white text-lg font-bold mb-3 uppercase">[2.0] Scan Data</h2>
          <p>
            Scan results performed on the platform are stored for historical analysis. Users may delete their scan history 
            at any time through the dashboard. All scans are performed using passive, non-intrusive techniques.
          </p>
        </section>

        <section>
          <h2 className="text-white text-lg font-bold mb-3 uppercase">[3.0] Security</h2>
          <p>
            We implement industry-standard encryption (AES-256) for data at rest and TLS 1.3 for data in transit. 
            Your security is our priority.
          </p>
        </section>

        <p className="pt-8 border-t border-white/5 text-[10px]">
          Last Updated: 2026-05-07 // Revision 1.0.4
        </p>
      </div>
    </div>
  );
}
