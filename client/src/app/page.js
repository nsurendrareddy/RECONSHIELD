import DashboardClient from '@/components/DashboardClient';
import DynamicHomeSections from '@/components/DynamicHomeSections';
import { client, homepageBlogQuery } from '@/utils/sanity';
import { Shield, Target, Activity, Cpu } from 'lucide-react';

export const metadata = {
  title: "ReconShield | Advanced AI Cybersecurity & OSINT Platform",
  description: "Empower your security research with ReconShield. Discover our AI-powered cybersecurity tools, threat intelligence, and OSINT capabilities for modern defenses.",
  keywords: ["cybersecurity", "threat intelligence", "vulnerability scanner", "IP intelligence", "AI security", "ReconShield"],
  alternates: {
    canonical: 'https://reconshield.in',
  },
  openGraph: {
    title: "ReconShield | AI Cybersecurity Platform",
    siteName: "ReconShield",
    url: 'https://reconshield.in',
    type: 'website',
  }
};

export default async function Page() {
  const posts = await client.fetch(homepageBlogQuery);

  return (
    <>
      <div className="sr-only">
        <h1>ReconShield AI Cybersecurity Platform</h1>
        <p>
          Advanced reconnaissance and threat intelligence at your fingertips. 
          Scan websites, analyze IP threats, detect vulnerabilities, and monitor cyber risks in real time.
        </p>
        <ul>
          <li>Vulnerability Scanning</li>
          <li>DNS & Infrastructure Analysis</li>
          <li>SSL/TLS Security Auditing</li>
          <li>IP Reputation & Threat Intel</li>
          <li>AI-Powered Risk Assessment</li>
        </ul>
      </div>

      <DashboardClient />
      <DynamicHomeSections posts={posts || []} />

      {/* Highly visible & crawlable About, Mission, & Ethics grid for Google AdSense compliance */}
      <section className="max-w-[1200px] mx-auto px-6 pb-24 animate-fade-in">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="font-mono text-xs tracking-[4px] uppercase text-[#00ff88] font-bold">// ABOUT & MISSION</h2>
          <div className="h-[1px] flex-1 bg-[#1a2332]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Mission Card */}
          <div className="p-8 rounded-[6px] bg-[#0d1117] border border-[#1a2332] hover:border-[#00ff8822] transition-all flex flex-col justify-between shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-[#00ff88]/5 border border-[#00ff88]/15 flex items-center justify-center">
                  <Target className="w-5 h-5 text-[#00ff88]" />
                </div>
                <h3 className="font-display text-base font-bold text-white uppercase tracking-wider">Our Core Mission</h3>
              </div>
              <p className="text-[12px] text-[#94a3b8] leading-[1.8] font-sans font-light">
                ReconShield is a next-generation cybersecurity platform and Open Source Intelligence (OSINT) research hub engineered to provide unparalleled visibility into the digital attack surface. In an era where cyber threats are becoming increasingly systemic and complex, securing digital assets requires proactive, continuous vigilance. Our mission is to democratize advanced security analytics by offering professional-grade, automated passive scanning tools to independent developers, security researchers, and small businesses. We believe that security begins with comprehensive visibility, and by providing open access to sophisticated domain, DNS, and IP intelligence tools, we help researchers expose critical vulnerabilities and misconfigurations before adversaries can exploit them.
              </p>
            </div>
            <div className="mt-8 border-t border-[#1a2332]/50 pt-4 flex items-center gap-2 text-[9px] font-mono text-gray-500 uppercase tracking-widest">
              <Activity className="w-3.5 h-3.5 text-[#00ff88]/60" />
              <span>Democratizing Security</span>
            </div>
          </div>

          {/* Ethics Card */}
          <div className="p-8 rounded-[6px] bg-[#0d1117] border border-[#1a2332] hover:border-[#00ff8822] transition-all flex flex-col justify-between shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-[#00ff88]/5 border border-[#00ff88]/15 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-[#00ff88]" />
                </div>
                <h3 className="font-display text-base font-bold text-white uppercase tracking-wider">Ethical Standards</h3>
              </div>
              <p className="text-[12px] text-[#94a3b8] leading-[1.8] font-sans font-light">
                As pioneers in open-access intelligence, ReconShield operates under a strict ethical framework that prioritizes internet safety, compliance, and responsible security research. All diagnostic scans performed through our interface are 100% passive. We strictly query public global infrastructure registries, security headers, verified blocklists, and open database APIs. Our platform never sends active payloads, intrusive requests, or hostile traffic directly to the target systems. This passive methodology ensures that our users can conduct thorough educational analysis and attack surface mapping without violating legal boundaries or disrupting target business operations. We stand as a safe harbor for ethical hacking, providing the high-fidelity telemetry needed to audit DNS records, SSL/TLS certificates, open ports, and mail server health responsibly.
              </p>
            </div>
            <div className="mt-8 border-t border-[#1a2332]/50 pt-4 flex items-center gap-2 text-[9px] font-mono text-gray-500 uppercase tracking-widest">
              <Shield className="w-3.5 h-3.5 text-[#00ff88]/60" />
              <span>100% Passive Scanning</span>
            </div>
          </div>

          {/* Analytics Card */}
          <div className="p-8 rounded-[6px] bg-[#0d1117] border border-[#1a2332] hover:border-[#00ff8822] transition-all flex flex-col justify-between shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-[#00ff88]/5 border border-[#00ff88]/15 flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-[#00ff88]" />
                </div>
                <h3 className="font-display text-base font-bold text-white uppercase tracking-wider">AI Security Insights</h3>
              </div>
              <p className="text-[12px] text-[#94a3b8] leading-[1.8] font-sans font-light">
                What distinguishes ReconShield is our integration of advanced AI analytics with raw network telemetry. Traditional scanners output overwhelming walls of cryptographic and infrastructure data that are difficult to interpret. ReconShield translates complex port scans, SSL certificate logs, and header configurations into clear, structured, and actionable risk assessments. By presenting a unified risk score alongside step-by-step mitigation guidelines, we bridge the gap between technical data and real-world defense. In addition to our real-time scanner, our Threat Intelligence Blog offers expert analysis, security advisories, and investigative reports on global malware campaigns and supply-chain vulnerabilities, keeping our community informed and prepared against the threats of tomorrow.
              </p>
            </div>
            <div className="mt-8 border-t border-[#1a2332]/50 pt-4 flex items-center gap-2 text-[9px] font-mono text-gray-500 uppercase tracking-widest">
              <Cpu className="w-3.5 h-3.5 text-[#00ff88]/60" />
              <span>AI-Driven Interpretation</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
