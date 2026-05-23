import DynamicHomeSections from '@/components/DynamicHomeSections';
import DynamicDashboardClient from '@/components/DynamicDashboardClient';
import { client, homepageBlogQuery } from '@/utils/sanity';
import { Shield, Target, Activity, Cpu } from 'lucide-react';

export const metadata = {
  title: "Free Website Vulnerability Scanner & AI Security Analysis | ReconShield",
  description: "Scan websites for vulnerabilities, SSL issues, DNS misconfigurations, open ports, security headers, and infrastructure exposure using ReconShield’s AI-powered cybersecurity scanner.",
  keywords: [
    "cybersecurity", "threat intelligence", "vulnerability scanner", "IP intelligence", "AI security", "ReconShield",
    "free website scanner", "vulnerability scanner online", "DNS checker", "SSL checker", "IP reputation checker", "website security scan",
    "attack surface", "infrastructure analysis", "passive scanning", "endpoint discovery", "TLS configuration", "exposed services"
  ],
  alternates: {
    canonical: 'https://reconshield.in',
  },
  openGraph: {
    title: "Free Website Vulnerability Scanner & AI Security Analysis | ReconShield",
    siteName: "ReconShield",
    description: "Scan websites for vulnerabilities, SSL issues, DNS misconfigurations, open ports, security headers, and infrastructure exposure using ReconShield’s AI-powered cybersecurity scanner.",
    url: 'https://reconshield.in',
    type: 'website',
  }
};

export default async function Page() {
  const posts = await client.fetch(homepageBlogQuery);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebApplication",
                "@id": "https://reconshield.in/#software",
                "name": "ReconShield Vulnerability Scanner",
                "url": "https://reconshield.in",
                "description": "Free passive website vulnerability scanner. Check DNS, SSL, open ports, IP reputation and security headers.",
                "applicationCategory": "SecurityApplication",
                "operatingSystem": "Web",
                "offers": {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "USD"
                }
              },
              {
                "@type": "Organization",
                "@id": "https://reconshield.in/#organization",
                "name": "ReconShield",
                "url": "https://reconshield.in",
                "logo": "https://reconshield.in/logo.png",
                "sameAs": []
              },
              {
                "@type": "BreadcrumbList",
                "@id": "https://reconshield.in/#breadcrumb",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://reconshield.in"
                  }
                ]
              },
              {
                "@type": "FAQPage",
                "@id": "https://reconshield.in/#faq",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "Is website vulnerability scanning legal?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes, passive website vulnerability scanning is legal. ReconShield uses only passive reconnaissance techniques, collecting publicly available OSINT data without sending active payloads to the target infrastructure."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What vulnerabilities can ReconShield detect?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "ReconShield detects exposed open ports, SSL/TLS misconfigurations, missing security headers (like HSTS and CSP), DNS vulnerabilities (missing DMARC/SPF), and poor IP reputation."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What is passive reconnaissance?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Passive reconnaissance involves gathering information about a target system from public databases, DNS records, and third-party scanners without directly interacting with the target's servers."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How often should websites be scanned?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Websites should be scanned continuously. The digital attack surface changes daily as new ports are opened, certificates expire, or DNS records are modified. Regular monitoring is essential."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What are HTTP security headers?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "HTTP security headers are directives passed between the server and the browser to mitigate vulnerabilities like Cross-Site Scripting (XSS), Clickjacking, and packet sniffing."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How does SSL scanning work?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Our SSL scanning analyzes the target's TLS configuration to ensure certificates are valid, not expired, and support strong cryptographic ciphers (e.g., TLS 1.2/1.3) while rejecting deprecated protocols."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What is DNS enumeration?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "DNS enumeration is the process of locating all DNS records (A, MX, TXT, NS) for a domain to map out the infrastructure and identify security weaknesses like lack of email spoofing protection."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Can open ports expose websites to attacks?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes. Unnecessarily open ports (like database ports 3306 or unencrypted FTP 21) provide direct entry points for attackers to exploit vulnerable services."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What is attack surface monitoring?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Attack surface monitoring is the continuous discovery, analysis, and management of an organization's digital footprint to identify and remediate exposed IT assets."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Is ReconShield free to use?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes, ReconShield is a completely free vulnerability scanning and cybersecurity utility platform designed to democratize access to security intelligence."
                    }
                  }
                ]
              }
            ]
          })
        }}
      />
      <div className="sr-only">
        <h1>Free Website Security Scanner — Scan for Vulnerabilities Instantly</h1>
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

      <DynamicDashboardClient />

      <div className="text-center mt-4 mb-8">
        <a href="/ip-scanner" className="text-[#00ff88] hover:underline text-sm font-medium">
          Also check our Free IP Reputation Scanner →
        </a>
      </div>

      <section className="max-w-[1000px] mx-auto px-6 py-16 animate-fade-in text-[#94a3b8] prose prose-invert max-w-none prose-p:leading-relaxed prose-h2:text-white prose-h2:font-bold prose-h2:text-2xl prose-h3:text-white prose-h3:font-semibold prose-h3:text-xl">
        <h2 className="mb-6 border-b border-[#1a2332] pb-4">The Ultimate Website Vulnerability Scanner & Cybersecurity Platform</h2>
        
        <p className="mb-6">
          In an era of relentless cyber threats, maintaining visibility over your <strong>digital footprint</strong> is non-negotiable. Organizations frequently leave critical infrastructure exposed due to misconfigurations, expired certificates, or shadow IT. ReconShield serves as a professional-grade, AI-powered <strong>website vulnerability scanner</strong> engineered to conduct exhaustive <strong>attack surface analysis</strong> without alerting the target. Through advanced <strong>passive reconnaissance</strong>, our platform aggregates critical intelligence on your endpoints, empowering security teams to achieve a fortified <strong>cybersecurity posture</strong>.
        </p>

        <h3 className="mt-12 mb-4">What Is Website Vulnerability Scanning?</h3>
        <p className="mb-6">
          Website vulnerability scanning is the automated process of evaluating web applications, networks, and hosting environments to uncover security loopholes. It simulates the initial phases of a cyberattack—specifically <strong>endpoint discovery</strong> and <strong>reconnaissance automation</strong>—to identify misconfigured assets before malicious actors can exploit them. ReconShield goes beyond traditional scanning by offering continuous <strong>asset intelligence</strong> and structured remediation steps.
        </p>

        <h3 className="mt-12 mb-4">How ReconShield Scans Websites (Passive Reconnaissance)</h3>
        <p className="mb-6">
          Unlike aggressive vulnerability scanners that send malicious payloads or disruptive network packets, ReconShield operates strictly via <strong>passive scanning</strong>. We aggregate data from global DNS registries, public threat intelligence databases, certificate transparency logs, and OSINT (Open Source Intelligence) providers. This allows us to perform deep <strong>infrastructure analysis</strong> and <strong>subdomain enumeration</strong> with zero impact on the target's uptime or bandwidth.
        </p>

        <h3 className="mt-12 mb-4">Why Attack Surface Monitoring Matters</h3>
        <p className="mb-6">
          An organization's attack surface consists of all internet-facing hardware, software, and cloud assets. As businesses scale, their attack surface naturally expands, often introducing unmanaged or forgotten endpoints. Continuous <strong>attack surface monitoring</strong> ensures that newly exposed APIs, sudden DNS alterations, or vulnerable <strong>exposed services</strong> are detected in real-time. This proactive approach shifts the security paradigm from reactive incident response to preemptive risk management.
        </p>

        <h3 className="mt-12 mb-4">SSL/TLS Misconfigurations Explained</h3>
        <p className="mb-6">
          A secure <strong>TLS configuration</strong> is the backbone of encrypted web traffic. ReconShield's SSL checker meticulously audits your certificates. We verify expiration dates, assess the strength of cryptographic ciphers, and check for the presence of outdated protocols like SSLv3 or TLS 1.0. Proper SSL/TLS security ensures that sensitive user data remains protected against Man-in-the-Middle (MitM) attacks and packet sniffing.
        </p>

        <h3 className="mt-12 mb-4">DNS Exposure Risks & Security</h3>
        <p className="mb-6">
          DNS acts as the phonebook of the internet, but misconfigured records can lead to catastrophic breaches. Our DNS scanner evaluates A, AAAA, MX, TXT, and NS records to uncover vulnerabilities such as subdomain takeover risks and email spoofing. By validating the presence of SPF, DKIM, and DMARC records, we help organizations secure their email infrastructure against phishing campaigns and domain impersonation.
        </p>

        <h3 className="mt-12 mb-4">Security Header Analysis</h3>
        <p className="mb-6">
          <strong>HTTP header analysis</strong> is critical for modern web application security. Security headers instruct the browser on how to behave when interacting with your site. ReconShield audits for essential headers including Content-Security-Policy (CSP) to prevent Cross-Site Scripting (XSS), Strict-Transport-Security (HSTS) to enforce HTTPS, and X-Frame-Options to mitigate clickjacking attacks. Missing these headers severely weakens your client-side security architecture.
        </p>

        <h3 className="mt-12 mb-4">Open Port Detection & Exposed Services</h3>
        <p className="mb-6">
          Every open port is a potential gateway into your network. Our port scanning technology cross-references your IP address to identify unnecessarily <strong>exposed services</strong> such as SSH (Port 22), MySQL (Port 3306), or RDP (Port 3389). Leaving administrative interfaces accessible to the public internet is one of the most common vectors for ransomware operators and initial access brokers.
        </p>

        <h3 className="mt-12 mb-4">Threat Intelligence & Risk Scoring</h3>
        <p className="mb-6">
          Raw data without context leads to alert fatigue. ReconShield integrates proprietary AI models with global threat intelligence feeds to assign a clear, actionable Risk Score to your infrastructure. We evaluate your assets against 50+ global blocklists, providing instant insights into your IP reputation and identifying if your infrastructure is part of a known botnet or malware distribution network.
        </p>

        {/* Detailed Example Scans */}
        <div className="bg-[#0d1117] border border-[#1a2332] p-6 rounded-lg my-12 shadow-lg">
          <h3 className="text-white mb-4 mt-0 border-b border-[#1a2332] pb-4">Example Scan Results</h3>
          <p className="mb-6 text-sm">Below is a detailed representation of what a ReconShield cybersecurity analysis report looks like.</p>
          
          <div className="space-y-6 text-sm">
            {/* DNS Results */}
            <div className="bg-[#0a0d14] p-4 rounded border border-[#1a2332]">
              <div className="flex justify-between mb-2">
                <span className="font-bold text-white">DNS Security Analysis</span>
                <span className="text-[#00ff88] font-mono">PASS</span>
              </div>
              <p className="text-gray-400 mb-2">DMARC policy is set to 'reject'. SPF records strictly enforce approved mail servers.</p>
              <div className="bg-black/50 p-2 rounded font-mono text-xs text-gray-500">v=DMARC1; p=reject; rua=mailto:dmarc@domain.com;</div>
            </div>

            {/* SSL Results */}
            <div className="bg-[#0a0d14] p-4 rounded border border-[#1a2332]">
              <div className="flex justify-between mb-2">
                <span className="font-bold text-white">SSL/TLS Configuration</span>
                <span className="text-amber-400 font-mono">WARNING</span>
              </div>
              <p className="text-gray-400 mb-2">Certificate is valid, but server supports deprecated TLS 1.1 protocol.</p>
              <p className="text-xs text-amber-500">Remediation: Disable TLS 1.0 and TLS 1.1 in your web server configuration (Nginx/Apache).</p>
            </div>

            {/* Port Results */}
            <div className="bg-[#1a0f14] p-4 rounded border border-red-900/30">
              <div className="flex justify-between mb-2">
                <span className="font-bold text-white">Open Port Detection</span>
                <span className="text-red-400 font-mono">CRITICAL</span>
              </div>
              <p className="text-gray-400 mb-2">Database port 5432 (PostgreSQL) is exposed to the public internet.</p>
              <p className="text-xs text-red-400">Remediation: Restrict access via firewall to internal IPs or trusted VPN subnets only.</p>
            </div>

            {/* Header Results */}
            <div className="bg-[#0a0d14] p-4 rounded border border-[#1a2332]">
              <div className="flex justify-between mb-2">
                <span className="font-bold text-white">HTTP Security Headers</span>
                <span className="text-amber-400 font-mono">WARNING</span>
              </div>
              <p className="text-gray-400 mb-2">Missing Content-Security-Policy (CSP) header.</p>
              <p className="text-xs text-amber-500">Remediation: Implement a strict CSP to prevent Cross-Site Scripting (XSS) attacks.</p>
            </div>
          </div>
        </div>

        <h2 className="mt-16 mb-6 border-b border-[#1a2332] pb-4">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-white font-semibold mb-2 text-lg">Is website vulnerability scanning legal?</h3>
            <p>Yes, passive website vulnerability scanning is legal. ReconShield uses only passive reconnaissance techniques, collecting publicly available OSINT data without sending active payloads to the target infrastructure.</p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-lg">What vulnerabilities can ReconShield detect?</h3>
            <p>ReconShield detects exposed open ports, SSL/TLS misconfigurations, missing security headers (like HSTS and CSP), DNS vulnerabilities (missing DMARC/SPF), and poor IP reputation.</p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-lg">What is passive reconnaissance?</h3>
            <p>Passive reconnaissance involves gathering information about a target system from public databases, DNS records, and third-party scanners without directly interacting with the target's servers.</p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-lg">How often should websites be scanned?</h3>
            <p>Websites should be scanned continuously. The digital attack surface changes daily as new ports are opened, certificates expire, or DNS records are modified. Regular monitoring is essential.</p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-lg">What are HTTP security headers?</h3>
            <p>HTTP security headers are directives passed between the server and the browser to mitigate vulnerabilities like Cross-Site Scripting (XSS), Clickjacking, and packet sniffing.</p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-lg">How does SSL scanning work?</h3>
            <p>Our SSL scanning analyzes the target's TLS configuration to ensure certificates are valid, not expired, and support strong cryptographic ciphers (e.g., TLS 1.2/1.3) while rejecting deprecated protocols.</p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-lg">What is DNS enumeration?</h3>
            <p>DNS enumeration is the process of locating all DNS records (A, MX, TXT, NS) for a domain to map out the infrastructure and identify security weaknesses like lack of email spoofing protection.</p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-lg">Can open ports expose websites to attacks?</h3>
            <p>Yes. Unnecessarily open ports (like database ports 3306 or unencrypted FTP 21) provide direct entry points for attackers to exploit vulnerable services.</p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-lg">What is attack surface monitoring?</h3>
            <p>Attack surface monitoring is the continuous discovery, analysis, and management of an organization's digital footprint to identify and remediate exposed IT assets.</p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-lg">Is ReconShield free to use?</h3>
            <p>Yes, ReconShield is a completely free vulnerability scanning and cybersecurity utility platform designed to democratize access to security intelligence.</p>
          </div>
        </div>
      </section>
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
            <div className="mt-8 border-t border-[#1a2332]/50 pt-4 flex items-center gap-2 text-[9px] font-mono text-[#8a9bb0] uppercase tracking-widest">
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
            <div className="mt-8 border-t border-[#1a2332]/50 pt-4 flex items-center gap-2 text-[9px] font-mono text-[#8a9bb0] uppercase tracking-widest">
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
            <div className="mt-8 border-t border-[#1a2332]/50 pt-4 flex items-center gap-2 text-[9px] font-mono text-[#8a9bb0] uppercase tracking-widest">
              <Cpu className="w-3.5 h-3.5 text-[#00ff88]/60" />
              <span>AI-Driven Interpretation</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
