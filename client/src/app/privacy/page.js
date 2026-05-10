export const metadata = {
  title: "Privacy Policy | ReconShield Intelligence",
  description: "How we handle data and respect user privacy on the ReconShield platform.",
  alternates: {
    canonical: 'https://reconshield.vercel.app/privacy',
  },
  openGraph: {
    title: "Privacy Policy | ReconShield Intelligence",
    description: "How we handle data and respect user privacy on the ReconShield platform.",
    url: 'https://reconshield.vercel.app/privacy',
    type: 'website',
  }
};

export default function Privacy() {
  return (
    <div className="animate-fade-in max-w-4xl mx-auto py-12">
      <div className="glass-card p-10 md:p-16">
        <h1 className="text-3xl font-display font-bold text-white tracking-widest uppercase mb-10 border-b border-white/5 pb-6">
          Privacy <span className="text-matrix-400">&</span> Data Protocol
        </h1>
        
        <div className="space-y-12 font-mono text-sm leading-relaxed text-gray-400">
          <section>
            <h3 className="text-white font-bold mb-4 flex items-center gap-3">
              <span className="text-matrix-400">01.</span> DATA COLLECTION
            </h3>
            <p>
              ReconShield collects minimal personal data. We store account information (email/hash) and logs of scans you perform to provide historical reporting. We do not track your IP or personal activity beyond what is necessary for security auditing.
            </p>
          </section>

          <section>
            <h3 className="text-white font-bold mb-4 flex items-center gap-3">
              <span className="text-matrix-400">02.</span> TARGET DATA
            </h3>
            <p>
              Data collected about scanned targets is sourced from public internet records (WHOIS, DNS, SSL Certificates). This data is stored in our intelligence database to build historical risk trends.
            </p>
          </section>

          <section>
            <h3 className="text-white font-bold mb-4 flex items-center gap-3">
              <span className="text-matrix-400">03.</span> SECURITY
            </h3>
            <p>
              All traffic between your browser and our intelligence engine is encrypted using industry-standard TLS protocols. Your scan history is protected and only accessible via your authenticated account.
            </p>
          </section>

          <section>
            <h3 className="text-white font-bold mb-4 flex items-center gap-3">
              <span className="text-matrix-400">04.</span> COOKIES
            </h3>
            <p>
              We use local storage and session tokens to keep you authenticated. We do not use third-party tracking cookies or advertising pixels.
            </p>
          </section>
        </div>

        <div className="mt-16 text-center">
          <p className="text-[10px] text-gray-600 font-mono uppercase tracking-widest">
            Last Updated: MAY 2026 // Revision 2.0
          </p>
        </div>
      </div>
    </div>
  )
}
