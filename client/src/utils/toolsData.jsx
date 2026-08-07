import React from 'react';
import Link from 'next/link';
import { Globe, Search, Network, Lock, Server, Activity, Shield, Mail, AlertTriangle, Cpu } from 'lucide-react';

export const CATEGORIES = ['All', 'Network Intelligence', 'Domain Intelligence', 'DNS Analysis', 'SSL/TLS Security', 'infrastructure visibility', 'Web Security', 'Email Security', 'Threat Intelligence'];

export const COLOR_MAP = {
  cyan:   { bg: 'bg-cyan-500/10',    border: 'border-cyan-500/20',    text: 'text-cyan-400',    hover: 'hover:border-cyan-500/40' },
  purple: { bg: 'bg-purple-500/10',  border: 'border-purple-500/20',  text: 'text-purple-400',  hover: 'hover:border-purple-500/40' },
  blue:   { bg: 'bg-blue-500/10',    border: 'border-blue-500/20',    text: 'text-blue-400',    hover: 'hover:border-blue-500/40' },
  green:  { bg: 'bg-[#00ff88]/10',   border: 'border-[#00ff88]/20',   text: 'text-[#00ff88]',   hover: 'hover:border-[#00ff88]/40' },
  orange: { bg: 'bg-orange-500/10',  border: 'border-orange-500/20',  text: 'text-orange-400',  hover: 'hover:border-orange-500/40' },
  red:    { bg: 'bg-red-500/10',     border: 'border-red-500/20',     text: 'text-red-400',     hover: 'hover:border-red-500/40' },
  yellow: { bg: 'bg-yellow-500/10',  border: 'border-yellow-500/20',  text: 'text-yellow-400',  hover: 'hover:border-yellow-500/40' },
  pink:   { bg: 'bg-pink-500/10',    border: 'border-pink-500/20',    text: 'text-pink-400',    hover: 'hover:border-pink-500/40' },
  amber:  { bg: 'bg-amber-500/10',   border: 'border-amber-500/20',   text: 'text-amber-400',   hover: 'hover:border-amber-500/40' },
  teal:   { bg: 'bg-teal-500/10',    border: 'border-teal-500/20',    text: 'text-teal-400',    hover: 'hover:border-teal-500/40' },
};

export const TOOLS = [
  {
    id: 'ip-lookup',
    name: 'IP Lookup',
    icon: Globe,
    color: 'cyan',
    desc: 'Geolocate any IP address. Detect ISP, ASN, hosting provider, proxy/VPN status, and threat reputation.',
    tags: ['Geolocation', 'ISP', 'ASN', 'Threat Intel'],
    popular: true,
    category: 'Network Intelligence',
  },
  {
    id: 'whois',
    name: 'WHOIS Checker',
    icon: Search,
    color: 'purple',
    desc: 'Reveal domain registrar, creation/expiry dates, name servers, domain status, and registrant information.',
    tags: ['Registrar', 'Expiry Date', 'Name Servers'],
    popular: true,
    category: 'Domain Intelligence',
  },
  {
    id: 'dns-lookup',
    name: 'DNS Lookup',
    icon: Network,
    color: 'blue',
    desc: 'Query A, AAAA, MX, TXT, NS, and CNAME records. Check DNSSEC, SPF, DMARC and email security.',
    tags: ['DNS Records', 'SPF', 'DMARC', 'DNSSEC'],
    popular: true,
    category: 'DNS Analysis',
  },
  {
    id: 'ssl-checker',
    name: 'SSL Checker',
    icon: Lock,
    color: 'green',
    desc: 'Audit SSL/TLS certificates, expiry dates, cipher suites, TLS version support, and get a security grade.',
    tags: ['Certificate', 'TLS Version', 'Security Grade'],
    popular: true,
    category: 'SSL/TLS Security',
  },
  {
    id: 'subdomain-finder',
    name: 'Subdomain Finder',
    icon: Server,
    color: 'orange',
    desc: 'Passively audit subdomains from public sources, certificate logs, and DNS records.',
    tags: ['Passive OSINT', 'DNS Validation', 'Export'],
    popular: false,
    category: 'infrastructure visibility',
  },
  {
    id: 'port-scanner',
    name: 'Port Scanner',
    icon: Activity,
    color: 'red',
    desc: 'Detect open ports, identify running services, and highlight high-risk exposures on any host.',
    tags: ['Open Ports', 'Service Detection', 'Risk Rating'],
    popular: false,
    category: 'Network Intelligence',
  },
  {
    id: 'http-headers',
    name: 'HTTP Headers',
    icon: Shield,
    color: 'yellow',
    desc: 'Analyze security headers: CSP, HSTS, X-Frame-Options, X-XSS-Protection, and detect missing protections.',
    tags: ['CSP', 'HSTS', 'X-Frame-Options', 'Security Grade'],
    popular: false,
    category: 'Web Security',
  },
  {
    id: 'email-security',
    name: 'Email Security',
    icon: Mail,
    color: 'pink',
    desc: 'Validate SPF, DKIM, and DMARC records. Assess mail server security and phishing protection.',
    tags: ['SPF', 'DKIM', 'DMARC', 'Mail Server'],
    popular: false,
    category: 'Email Security',
  },

  {
    id: 'tech-detector',
    name: 'Website Technology Checker',
    icon: Cpu,
    color: 'teal',
    desc: 'Identify Content Management Systems (CMS), web frameworks, CDNs, WAFs, analytics trackers, and complete technology stacks of any website.',
    tags: ['CMS Detector', 'Framework Lookup', 'Tech Stack'],
    popular: true,
    category: 'infrastructure visibility',
  },
  {
    id: 'vulnerability-scanner',
    name: 'Security Exposure Assessment Tool',
    icon: Shield,
    color: 'red',
    desc: 'Assess your infrastructure for security exposure, configuration risks, and compliance gaps using free no sign-up defensive tools.',
    tags: ['Security Assessment', 'Exposure Check', 'Passive Scan'],
    popular: true,
    category: 'Web Security',
  },
  {
    id: 'email-security-suite',
    name: 'Email Security Suite',
    icon: Mail,
    color: 'pink',
    desc: 'SPF, DKIM, DMARC & BIMI deliverability audit.',
    tags: ['SPF', 'DKIM', 'DMARC', 'BIMI'],
    popular: true,
    category: 'Email Security',
  },
  {
    id: 'csp-evaluator-builder',
    name: 'CSP Visual Evaluator & Builder',
    icon: Shield,
    color: 'green',
    desc: 'CSP header builder & XSS filter validator.',
    tags: ['CSP', 'XSS', 'Headers'],
    popular: true,
    category: 'Web Security',
  },
  {
    id: 'jwt-security-auditor',
    name: 'JWT Security Auditor',
    icon: Lock,
    color: 'purple',
    desc: 'Decode & test weak HMAC secrets & algorithm flaws.',
    tags: ['JWT', 'Auth', 'Token'],
    popular: true,
    category: 'Web Security',
  },
  {
    id: 'google-dork-builder',
    name: 'Google Dork Builder & OSINT Studio',
    icon: Search,
    color: 'blue',
    desc: 'Construct OSINT search queries & dorks.',
    tags: ['Google Dorks', 'OSINT', 'Recon'],
    popular: true,
    category: 'Threat Intelligence',
  },
  {
    id: 'ioc-defang-stix-studio',
    name: 'IOC Defang & STIX Studio',
    icon: Shield,
    color: 'orange',
    desc: 'Sanitize URLs/IPs & export to STIX 2.1.',
    tags: ['IOC', 'Defang', 'STIX'],
    popular: true,
    category: 'Threat Intelligence',
  },
  {
    id: 'ioc-defang-sanitizer',
    name: 'IOC Defang & STIX Studio',
    icon: Shield,
    color: 'orange',
    desc: 'Sanitize URLs/IPs & export to STIX 2.1.',
    tags: ['IOC', 'Defang', 'STIX'],
    popular: true,
    category: 'Threat Intelligence',
  },
  {
    id: 'sigma-yara-studio',
    name: 'Sigma & YARA Studio',
    icon: Activity,
    color: 'cyan',
    desc: 'Convert Sigma rules to Splunk/Elastic & validate YARA.',
    tags: ['Sigma', 'YARA', 'Splunk'],
    popular: true,
    category: 'Threat Intelligence',
  },
  {
    id: 'sigma-yara-rule-studio',
    name: 'Sigma & YARA Studio',
    icon: Activity,
    color: 'cyan',
    desc: 'Convert Sigma rules to Splunk/Elastic & validate YARA.',
    tags: ['Sigma', 'YARA', 'Splunk'],
    popular: true,
    category: 'Threat Intelligence',
  },
  {
    id: 'linux-hardening-generator',
    name: 'Linux Hardening Generator',
    icon: Server,
    color: 'red',
    desc: 'CIS Benchmark Bash script generator.',
    tags: ['Linux', 'Hardening', 'CIS'],
    popular: true,
    category: 'Network Intelligence',
  },
  {
    id: 'tls-hardening-studio',
    name: 'TLS Hardening Studio',
    icon: Lock,
    color: 'green',
    desc: 'Mozilla SSL config rule generator.',
    tags: ['TLS', 'SSL', 'Hardening'],
    popular: true,
    category: 'SSL/TLS Security',
  },
  {
    id: 'tls-cipher-hardening-generator',
    name: 'TLS Hardening Studio',
    icon: Lock,
    color: 'green',
    desc: 'Mozilla SSL config rule generator.',
    tags: ['TLS', 'SSL', 'Hardening'],
    popular: true,
    category: 'SSL/TLS Security',
  },
  {
    id: 'mitre-attack-explorer',
    name: 'MITRE ATT&CK Explorer',
    icon: Network,
    color: 'teal',
    desc: 'TTP matrix explorer & detection mapper.',
    tags: ['MITRE', 'ATT&CK', 'TTP'],
    popular: true,
    category: 'Threat Intelligence',
  },
  {
    id: 'mitre-attack-navigator',
    name: 'MITRE ATT&CK Explorer',
    icon: Network,
    color: 'teal',
    desc: 'TTP matrix explorer & detection mapper.',
    tags: ['MITRE', 'ATT&CK', 'TTP'],
    popular: true,
    category: 'Threat Intelligence',
  },
  {
    id: 'browser-security-studio',
    name: 'Browser Security Studio',
    icon: Shield,
    color: 'yellow',
    desc: 'HTTP response header auditor & grader.',
    tags: ['Headers', 'CSP', 'Browser'],
    popular: true,
    category: 'Web Security',
  }
];

const CTABlock = () => (
  <div className="mt-12 p-8 rounded-2xl border border-[#00ff88]/20 bg-gradient-to-br from-[#00ff88]/5 to-transparent relative overflow-hidden">
    <div className="absolute top-0 right-0 w-64 h-64 bg-[#00ff88]/10 blur-[100px] rounded-full pointer-events-none" />
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
      <div>
        <h3 className="text-xl md:text-2xl font-bold mb-3 text-white">
          Identify Network & Application Vulnerabilities
        </h3>
        <p className="text-gray-400 max-w-2xl leading-relaxed text-sm">
          Exposing network services without regular audits is a high-risk liability. Use our automated Vulnerability Scanner to audit outdated packages, security configuration errors, and missing security headers.
        </p>
      </div>
      <div className="flex-shrink-0">
        <Link href="/tools/vulnerability-scanner">
          <span className="inline-flex items-center justify-center bg-[#00ff88] hover:bg-[#00ff88]/90 text-black px-6 py-3 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(0,255,136,0.3)] hover:shadow-[0_0_30px_rgba(0,255,136,0.5)] cursor-pointer text-sm whitespace-nowrap">
            Launch Security Scanner
          </span>
        </Link>
      </div>
    </div>
  </div>
);

export const TOOL_SEO_CONTENT = {
  'ip-lookup': {
    faqs: [
      { q: "What is an IP lookup?", a: "An IP lookup tool queries databases to find the geographical location, Internet Service Provider (ISP), Autonomous System Number (ASN), and organization associated with a specific IP address." },
      { q: "How accurate is IP geolocation?", a: "IP geolocation is generally accurate to the city or region level, but not to an exact street address. It relies on databases maintained by Regional Internet Registries (RIRs) and ISPs." },
      { q: "Can IP lookup detect VPNs or proxies?", a: "Yes, advanced IP lookup tools like ours check the IP address against known proxy, VPN, and TOR exit node lists to determine if the connection is anonymized." }
    ],
    content: (
      <div className="prose prose-invert max-w-none mt-12">
        <h2 className="text-2xl font-display font-bold text-white mb-6 uppercase tracking-wider">How IP Lookup Works</h2>
        <p className="text-gray-400 leading-relaxed mb-6">
          Every device connected to the internet is assigned an IP (Internet Protocol) address. An IP lookup performs a deep analysis of this address by querying regional registries (like ARIN, RIPE, APNIC) and proprietary threat intelligence databases. 
          This process reveals critical metadata including the physical location of the server, the ISP routing the traffic, and the Autonomous System Number (ASN) it belongs to.
        </p>

        <h2 className="text-2xl font-display font-bold text-white mb-6 uppercase tracking-wider mt-10">Why unauthorized actors abuse IP Information</h2>
        <p className="text-gray-400 leading-relaxed mb-6">
          Cybercriminals use IP intelligence to profile their targets. By identifying the ASN and hosting provider (e.g., AWS, DigitalOcean, or a residential ISP), unauthorized actors can tailor their configuration abuse. For example, enterprise IP ranges might be targeted with ransomware, while consumer IPs might be targeted with botnet malware. Furthermore, unauthorized actors often use anonymous proxies or VPNs to mask their own IPs, making IP reputation checks vital for defensive security.
        </p>

        <h2 className="text-2xl font-display font-bold text-white mb-6 uppercase tracking-wider mt-10">IP Lookup vs WHOIS</h2>
        <p className="text-gray-400 leading-relaxed mb-6">
          While often confused, IP Lookup and WHOIS serve different purposes. <strong>IP Lookup</strong> focuses on the network layer, revealing the physical location, ISP, and network routing information of an IP address. <strong>WHOIS</strong>, on the other hand, operates at the domain layer, showing who registered a specific domain name (like example.com), when it was registered, and the associated nameservers. Both are essential for complete infrastructure infrastructure visibility.
        </p>

        <h2 className="text-2xl font-display font-bold text-white mb-6 uppercase tracking-wider mt-10">Common IP Security Misconfigurations</h2>
        <ul className="text-gray-400 leading-relaxed mb-6 list-disc pl-6 space-y-2">
          <li><strong>Exposing internal IPs:</strong> Misconfigured load balancers or HTTP headers (like X-Forwarded-For) can accidentally leak internal network IP addresses to the public internet.</li>
          <li><strong>Failing to block known malicious ASNs:</strong> Organizations often fail to implement geo-blocking or ASN-blocking, allowing traffic from bulletproof hosting providers known for malicious activity.</li>
          <li><strong>Ignoring proxy/VPN traffic:</strong> E-commerce and SaaS platforms that do not detect and challenge proxy/VPN traffic are at higher risk of fraud and credential stuffing attacks.</li>
        </ul>
        <CTABlock />
      </div>
    )
  },
  'dns-lookup': {
    faqs: [
      { q: "What is DNS?", a: "The Domain Name System (DNS) is the internet's phonebook. It translates human-readable domain names (like example.com) into machine-readable IP addresses." },
      { q: "What are MX records?", a: "Mail Exchange (MX) records specify the mail servers responsible for accepting email messages on behalf of a domain." },
      { q: "Why is DNS security important?", a: "Insecure DNS can lead to devastating attacks like DNS spoofing, cache poisoning, and email impersonation (phishing) if records like SPF and DMARC are missing." }
    ],
    content: (
      <div className="prose prose-invert max-w-none mt-12">
        <h2 className="text-2xl font-display font-bold text-white mb-6 uppercase tracking-wider">How DNS Lookup Works</h2>
        <p className="text-gray-400 leading-relaxed mb-6">
          Our DNS Lookup tool queries authoritative nameservers to retrieve the complete zone file configuration for a target domain. It extracts essential records: A/AAAA (IPv4/IPv6 addresses), CNAME (canonical names mapping to other domains), MX (mail servers), TXT (text records often used for security verification), and NS (authoritative nameservers). 
          By analyzing these records, security researchers can map out an organization's digital footprint and external dependencies.
        </p>

        <h2 className="text-2xl font-display font-bold text-white mb-6 uppercase tracking-wider mt-10">Why unauthorized actors abuse DNS</h2>
        <p className="text-gray-400 leading-relaxed mb-6">
          DNS is a prime target for unauthorized actors due to its fundamental role in internet routing. unauthorized actors look for <strong>Subdomain Takeover</strong> configuration risks where a CNAME record points to an unclaimed cloud service (like an expired AWS S3 bucket or GitHub Pages site). They also actively scan for domains lacking proper SPF (Sender Policy Framework) and DMARC records, allowing them to easily spoof the domain and launch highly convincing phishing campaigns against employees or customers.
        </p>

        <h2 className="text-2xl font-display font-bold text-white mb-6 uppercase tracking-wider mt-10">DNS Lookup vs Subdomain Finder</h2>
        <p className="text-gray-400 leading-relaxed mb-6">
          A <strong>DNS Lookup</strong> targets a specific, known hostname (e.g., api.example.com) to retrieve its configuration records. In contrast, a <strong>Subdomain Finder</strong> is a discovery tool used during the initial infrastructure visibility phase to find unknown hostnames belonging to a root domain. Subdomain enumeration often utilizes passive sources like Certificate Transparency (CT) logs, while DNS lookup actively queries resolvers for record details.
        </p>

        <h2 className="text-2xl font-display font-bold text-white mb-6 uppercase tracking-wider mt-10">Best Practices for DNS Security</h2>
        <ul className="text-gray-400 leading-relaxed mb-6 list-disc pl-6 space-y-2">
          <li><strong>Implement DNSSEC:</strong> Protect against DNS spoofing and cache poisoning by cryptographically signing your DNS records.</li>
          <li><strong>Enforce strict DMARC policies:</strong> Set your DMARC policy to 'reject' or 'quarantine' to prevent unauthorized senders from spoofing your domain in emails.</li>
          <li><strong>Regularly prune stale records:</strong> Remove obsolete CNAME records pointing to decommissioned third-party services to prevent subdomain takeovers.</li>
          <li><strong>Restrict zone transfers (AXFR):</strong> Ensure your nameservers do not allow anonymous zone transfers, which would hand unauthorized actors a complete map of your infrastructure.</li>
        </ul>
        <CTABlock />
      </div>
    )
  },
  'ssl-checker': {
    faqs: [
      { q: "What does an SSL Checker do?", a: "An SSL Checker audits a website's SSL/TLS certificate to ensure it is valid, trusted by browsers, not expired, and securely configured with strong cryptography." },
      { q: "What is a cipher suite?", a: "A cipher suite is a set of cryptographic algorithms used to secure the network connection (TLS). Weak cipher suites can be cracked by unauthorized actors." },
      { q: "Why should I disable TLS 1.0 and 1.1?", a: "TLS 1.0 and 1.1 are obsolete protocols with known cryptographic configuration risks (like BEAST and POODLE). Modern security standards require TLS 1.2 or 1.3." }
    ],
    content: (
      <div className="prose prose-invert max-w-none mt-12">
        <h2 className="text-2xl font-display font-bold text-white mb-6 uppercase tracking-wider">How the SSL/TLS Checker Works</h2>
        <p className="text-gray-400 leading-relaxed mb-6">
          Our SSL Checker initiates a TLS handshake with the target server, pulling the complete certificate chain. It verifies the cryptographic signature against trusted Root Certificate Authorities (CAs). Beyond mere validity, it negotiates with the server to map out supported TLS protocols (from the deprecated SSLv3 to the modern TLS 1.3) and analyzes the server's accepted cipher suites, flagging weak algorithms like RC4, DES, or those vulnerable to known attacks.
        </p>

        <h2 className="text-2xl font-display font-bold text-white mb-6 uppercase tracking-wider mt-10">Common TLS Misconfigurations</h2>
        <p className="text-gray-400 leading-relaxed mb-6">
          Even with a valid certificate, misconfigured TLS settings can lead to data interception. 
          <strong>Mixed Content</strong> occurs when an HTTPS page loads scripts or images over insecure HTTP, bypassing encryption. 
          <strong>Supporting Weak Ciphers</strong> allows unauthorized actors positioned on the network to perform downgrade attacks or decrypt captured traffic. 
          <strong>Missing Certificate Revocation checking</strong> (OCSP Must-Staple) means browsers might trust a stolen certificate that the CA has already revoked.
        </p>

        <h2 className="text-2xl font-display font-bold text-white mb-6 uppercase tracking-wider mt-10">SSL Checker vs HTTP Headers</h2>
        <p className="text-gray-400 leading-relaxed mb-6">
          While both secure web communications, they operate at different layers. The <strong>SSL Checker</strong> analyzes the transport layer (Layer 4/6), ensuring the pipe between the client and server is encrypted and mathematically secure. <strong>HTTP Headers</strong> (like HSTS or CSP) operate at the application layer (Layer 7), instructing the browser on how to safely interact with the received data, such as forcing HTTPS or restricting script execution.
        </p>
        <CTABlock />
      </div>
    )
  },
  'http-headers': {
    faqs: [
      { q: "What are HTTP Security Headers?", a: "Security headers are directives sent by a web server in HTTP responses that tell the browser how to behave to mitigate configuration risks like XSS and Clickjacking." },
      { q: "What is HSTS?", a: "HTTP Strict Transport Security (HSTS) forces browsers to only connect to your website over HTTPS, preventing downgrade attacks and cookie hijacking." },
      { q: "Why is CSP important?", a: "Content Security Policy (CSP) restricts where scripts and resources can be loaded from, drastically reducing the impact of Cross-Site Scripting (XSS) attacks." }
    ],
    content: (
      <div className="prose prose-invert max-w-none mt-12">
        <h2 className="text-2xl font-display font-bold text-white mb-6 uppercase tracking-wider">Understanding HTTP Security Headers</h2>
        <p className="text-gray-400 leading-relaxed mb-6">
          When a browser requests a web page, the server responds with HTTP headers alongside the HTML content. Security headers are specialized instructions that lock down browser behavior. Our tool analyzes your server's responses for critical headers including <code>Content-Security-Policy</code>, <code>Strict-Transport-Security</code>, <code>X-Frame-Options</code>, and <code>X-Content-Type-Options</code>, providing a comprehensive grade based on OWASP best practices.
        </p>

        <h2 className="text-2xl font-display font-bold text-white mb-6 uppercase tracking-wider mt-10">Why unauthorized actors Love Missing Headers</h2>
        <p className="text-gray-400 leading-relaxed mb-6">
          Without a strong Content Security Policy (CSP), unauthorized actors can inject malicious JavaScript (XSS) into your site to steal user session cookies or log keystrokes. 
          Without <code>X-Frame-Options</code>, an unauthorized actor can embed your site in a hidden iframe on a malicious domain, tricking logged-in users into clicking buttons they didn't intend to (Clickjacking). 
          Missing security headers essentially leave the browser's built-in defense mechanisms disabled.
        </p>

        <h2 className="text-2xl font-display font-bold text-white mb-6 uppercase tracking-wider mt-10">Best Practices for Web Security</h2>
        <ul className="text-gray-400 leading-relaxed mb-6 list-disc pl-6 space-y-2">
          <li><strong>Deploy a restrictive CSP:</strong> Start with a report-only policy to monitor violations, then enforce a strict policy that disallows <code>unsafe-inline</code> scripts.</li>
          <li><strong>Enable HSTS with subdomains:</strong> Add the <code>includeSubDomains</code> and <code>preload</code> directives to your HSTS header for maximum protection.</li>
          <li><strong>Prevent MIME-sniffing:</strong> Always set <code>X-Content-Type-Options: nosniff</code> to prevent browsers from executing non-executable file types as code.</li>
          <li><strong>Control referrers:</strong> Use the <code>Referrer-Policy</code> header to prevent sensitive URLs (like password reset tokens) from leaking to third-party analytics scripts.</li>
        </ul>
        <CTABlock />
      </div>
    )
  },
  'vulnerability-scanner': {
    faqs: [
      { q: "What is passive exposure assessment?", a: "Passive scanning identifies configuration risks by analyzing server responses, headers, and public records without sending intrusive or malicious payloads to the target." },
      { q: "Is exposure assessment legal?", a: "Passive scanning (which ReconShield uses) is generally legal as it only observes public configurations. Active scanning requires explicit authorization from the asset owner." },
      { q: "How often should I scan my website?", a: "Continuous scanning is recommended. The internet-facing assets changes daily as new configuration risks (CVEs) are discovered, certificates expire, and infrastructure is modified." }
    ],
    content: (
      <div className="prose prose-invert max-w-none mt-12">
        <h2 className="text-2xl font-display font-bold text-white mb-6 uppercase tracking-wider">Automated internet-facing assets Analysis</h2>
        <p className="text-gray-400 leading-relaxed mb-6">
          ReconShield's Security Exposure Assessment Tool acts as an automated infrastructure visibility engine. It maps your external internet-facing assets by aggregating data across DNS, SSL/TLS configurations, open ports, HTTP headers, and exposed technologies. By correlating this data against known threat patterns and common misconfigurations, the engine identifies potential entry points before unauthorized actors can abuse them.
        </p>

        <h2 className="text-2xl font-display font-bold text-white mb-6 uppercase tracking-wider mt-10">How It Works: Passive infrastructure visibility</h2>
        <p className="text-gray-400 leading-relaxed mb-6">
          Unlike aggressive compliance auditing tools that brute-force directories or inject SQL payloads, our scanner operates strictly passively. It acts like a standard web browser and DNS client, gathering information through normal operational queries. We analyze server banners, error messages, routing paths, and public intelligence feeds to build a comprehensive risk profile with zero impact on your server's availability or performance.
        </p>

        <h2 className="text-2xl font-display font-bold text-white mb-6 uppercase tracking-wider mt-10">Why Continuous Assessment Matters</h2>
        <p className="text-gray-400 leading-relaxed mb-6">
          Security is not a point-in-time state. A configuration change deployed by a junior developer can inadvertently expose a database port to the internet. A marketing team might point a subdomain to a SaaS tool and later cancel the subscription, leaving a Subdomain Takeover vulnerability. Continuous exposure assessment ensures you maintain visibility over infrastructure drift and shadow IT.
        </p>
        <CTABlock />
      </div>
    )
  },
  'whois': {
    faqs: [
      { q: "What is a WHOIS lookup?", a: "WHOIS is a query and response protocol used to query databases that store the registered users or assignees of an Internet resource, such as a domain name." },
      { q: "Why is WHOIS data hidden?", a: "Due to privacy regulations like GDPR, many registrars redact personal information from WHOIS records by default, replacing it with privacy protection service details." },
      { q: "How can WHOIS help in threat hunting?", a: "Security researchers use WHOIS to find newly registered domains used for phishing, identify domain ownership networks, and track malicious infrastructure changes." }
    ],
    content: (
      <div className="prose prose-invert max-w-none mt-12">
        <h2 className="text-2xl font-display font-bold text-white mb-6 uppercase tracking-wider">The Role of WHOIS in infrastructure visibility</h2>
        <p className="text-gray-400 leading-relaxed mb-6">
          A WHOIS check is often the first step in digital forensics and threat intelligence. It queries authoritative registries (like Verisign or Public Interest Registry) to extract metadata about a domain name. This includes the registrar, the creation and expiration dates, the domain statuses (like clientTransferProhibited), and the designated name servers. 
        </p>

        <h2 className="text-2xl font-display font-bold text-white mb-6 uppercase tracking-wider mt-10">Why unauthorized actors Use WHOIS</h2>
        <p className="text-gray-400 leading-relaxed mb-6">
          unauthorized actors monitor WHOIS records to identify expiring domains belonging to target organizations. If a company fails to renew a domain, an unauthorized actor can purchase it and hijack incoming email or web traffic. Social engineers also use historical WHOIS data to map out corporate structures or find technical contacts to target in spear-phishing campaigns.
        </p>

        <h2 className="text-2xl font-display font-bold text-white mb-6 uppercase tracking-wider mt-10">Best Practices for Domain Management</h2>
        <ul className="text-gray-400 leading-relaxed mb-6 list-disc pl-6 space-y-2">
          <li><strong>Enable Domain Privacy:</strong> Use registrar privacy services to mask organizational contact details and reduce spear-phishing vectors.</li>
          <li><strong>Set Registry Locks:</strong> Apply EPP status codes like <code>serverTransferProhibited</code> and <code>serverUpdateProhibited</code> to prevent unauthorized domain transfers or DNS hijacking.</li>
          <li><strong>Monitor Expiration Dates:</strong> Implement automated monitoring for domain expiry to prevent accidental drops and subsequent malicious takeovers.</li>
        </ul>
        <CTABlock />
      </div>
    )
  },
  'subdomain-finder': {
    faqs: [
      { q: "What is subdomain enumeration?", a: "It is the process of finding valid subdomains for one or more domains. It expands the known internet-facing assets of a target." },
      { q: "How do you find hidden subdomains?", a: "We use passive sources like Certificate Transparency (CT) logs, search engine scraping, and public DNS datasets to discover subdomains without brute-forcing." },
      { q: "What is a subdomain takeover?", a: "It occurs when a subdomain points to a third-party service (like AWS S3) that has been deleted. An unauthorized actor can claim that service and serve content on the victim's subdomain." }
    ],
    content: (
      <div className="prose prose-invert max-w-none mt-12">
        <h2 className="text-2xl font-display font-bold text-white mb-6 uppercase tracking-wider">Expanding the internet-facing assets</h2>
        <p className="text-gray-400 leading-relaxed mb-6">
          Organizations often focus their security efforts on their main website (www.example.com), neglecting forgotten development servers, legacy staging environments, or internal portals hosted on obscure subdomains (e.g., dev-api-v1.example.com). Our Subdomain Finder systematically enumerates these hidden assets using passive OSINT techniques, giving you a complete map of your exposed infrastructure.
        </p>

        <h2 className="text-2xl font-display font-bold text-white mb-6 uppercase tracking-wider mt-10">The Danger of Shadow IT</h2>
        <p className="text-gray-400 leading-relaxed mb-6">
          Subdomains frequently host out-of-date software, unpatched WordPress installations, or exposed administrative panels. Because these assets are often unmanaged by the central IT team (Shadow IT), they represent a path of least resistance for unauthorized actors. Discovering and securing these forgotten subdomains is a critical phase of any Bug Bounty or compliance auditing engagement.
        </p>

        <h2 className="text-2xl font-display font-bold text-white mb-6 uppercase tracking-wider mt-10">Mitigating Subdomain configuration risks</h2>
        <ul className="text-gray-400 leading-relaxed mb-6 list-disc pl-6 space-y-2">
          <li><strong>Implement strict inventory control:</strong> Maintain a centralized, automated inventory of all DNS records and subdomains associated with your organization.</li>
          <li><strong>Audit third-party integrations:</strong> Regularly check subdomains that CNAME to external services (Zendesk, GitHub, Heroku) and ensure those accounts are active and secure.</li>
          <li><strong>Enforce wildcard SSL carefully:</strong> Wildcard certificates (*.example.com) make it easier to secure subdomains but can mask the existence of rogue subdomains if the private key is compromised.</li>
        </ul>
        <CTABlock />
      </div>
    )
  },
  'port-scanner': {
    faqs: [
      { q: "What is a port scan?", a: "A port scan probes a server to determine which network ports are open and listening for connections. It helps identify running services." },
      { q: "Is port scanning illegal?", a: "Scanning your own infrastructure is legal. Scanning third-party infrastructure without permission can be construed as an attack or violation of terms of service in many jurisdictions." },
      { q: "What ports should be open on a web server?", a: "Typically, only port 80 (HTTP) and 443 (HTTPS) should be exposed to the public internet. All other ports (like SSH 22, RDP 3389, or DB 3306) should be firewalled." }
    ],
    content: (
      <div className="prose prose-invert max-w-none mt-12">
        <h2 className="text-2xl font-display font-bold text-white mb-6 uppercase tracking-wider">What is a Port Scanner?</h2>
        <p className="text-gray-400 leading-relaxed mb-6">
          A port scanner is a network visibility tool used to identify open, closed, or filtered ports on internet-connected systems and internal infrastructure. Organizations use port scanning during authorized security assessments to understand which services are exposed and whether unnecessary ports may increase security risk.
        </p>
        <p className="text-gray-400 leading-relaxed mb-6">
          ReconShield’s Port Scanner is designed for defensive security auditing and infrastructure monitoring. By reviewing exposed services, administrators can improve firewall configurations, reduce unnecessary exposure, and strengthen overall network hygiene.
        </p>
        <p className="text-gray-400 leading-relaxed mb-4">Port scanning is commonly used as part of:</p>
        <ul className="text-gray-400 leading-relaxed mb-6 list-disc pl-6 space-y-2">
          <li>Security audits</li>
          <li>Compliance assessments</li>
          <li>Firewall verification</li>
          <li>Network troubleshooting</li>
          <li>Asset inventory management</li>
        </ul>
        <p className="text-gray-400 leading-relaxed mb-6">
          Understanding which ports are publicly accessible helps organizations maintain better visibility into their infrastructure and reduce unintended exposure.
        </p>

        <h2 className="text-2xl font-display font-bold text-white mb-6 uppercase tracking-wider mt-10">Who Should Use This Tool?</h2>
        <p className="text-gray-400 leading-relaxed mb-4">This tool is intended for:</p>
        <ul className="text-gray-400 leading-relaxed mb-6 list-disc pl-6 space-y-2">
          <li>Network administrators</li>
          <li>IT operations teams</li>
          <li>Security analysts</li>
          <li>Compliance auditors</li>
          <li>Authorized penetration testers</li>
          <li>Managed security providers</li>
        </ul>
        <p className="text-gray-400 leading-relaxed mb-6">
          Organizations often use port scanning to validate firewall policies, identify outdated services, confirm secure configurations, and document externally exposed systems.
        </p>
        <p className="text-gray-400 leading-relaxed mb-6">
          ReconShield supports passive, responsible security research and encourages ethical usage aligned with organizational authorization policies.
        </p>

        <h2 className="text-2xl font-display font-bold text-white mb-6 uppercase tracking-wider mt-10">How to Interpret Your Results</h2>
        <p className="text-gray-400 leading-relaxed mb-6">Port scan results typically fall into three categories:</p>
        
        <h3 className="text-xl font-bold text-white mb-2">Open Ports</h3>
        <p className="text-gray-400 leading-relaxed mb-4">
          An open port indicates that a service is actively accepting connections. Examples may include HTTPS (443), DNS (53), or SSH (22).
        </p>
        
        <h3 className="text-xl font-bold text-white mb-2">Closed Ports</h3>
        <p className="text-gray-400 leading-relaxed mb-4">
          A closed port is reachable but not actively accepting connections. This usually indicates the service is disabled or unavailable.
        </p>
        
        <h3 className="text-xl font-bold text-white mb-2">Filtered Ports</h3>
        <p className="text-gray-400 leading-relaxed mb-6">
          Filtered ports are protected by firewalls or filtering controls that restrict visibility or block responses.
        </p>
        
        <p className="text-gray-400 leading-relaxed mb-6">
          Reviewing these results can help organizations identify unnecessary exposure and strengthen defensive configurations.
        </p>

        <h2 className="text-2xl font-display font-bold text-white mb-6 uppercase tracking-wider mt-10">Authorized Use Policy</h2>
        <p className="text-gray-400 leading-relaxed font-semibold mb-6 border-l-4 border-[#00ff88] pl-4 bg-[#00ff88]/10 p-4 rounded-r">
          This tool is for authorized use only. Only scan infrastructure you own or have explicit written permission to test. Unauthorized scanning or network probing may violate applicable laws, regulations, or organizational policies. Users are solely responsible for ensuring their activities comply with all legal and ethical requirements.
        </p>
        <CTABlock />
      </div>
    )
  },
  'email-security': {
    faqs: [
      { q: "What is SPF?", a: "Sender Policy Framework (SPF) is a DNS record that lists the IP addresses and mail servers authorized to send email on behalf of your domain." },
      { q: "What is DMARC?", a: "Domain-based Message Authentication, Reporting, and Conformance (DMARC) instructs receiving servers on what to do if an email fails SPF or DKIM checks (e.g., reject or quarantine)." },
      { q: "Why are my emails going to spam?", a: "Missing or misconfigured SPF, DKIM, and DMARC records heavily negatively impact your domain reputation, causing providers like Google and Microsoft to flag your emails as spam." }
    ],
    content: (
      <div className="prose prose-invert max-w-none mt-12">
        <h2 className="text-2xl font-display font-bold text-white mb-6 uppercase tracking-wider">Defending Against Email Spoofing</h2>
        <p className="text-gray-400 leading-relaxed mb-6">
          The SMTP protocol used for sending emails lacks built-in authentication, making it trivially easy for unauthorized actors to forge the 'From' address. To combat this, three core DNS-based security protocols were developed: SPF, DKIM, and DMARC. Our Email Security Checker analyzes your domain's DNS configuration to validate the syntactic correctness and enforcement strength of these crucial records.
        </p>

        <h2 className="text-2xl font-display font-bold text-white mb-6 uppercase tracking-wider mt-10">The Phishing Epidemic</h2>
        <p className="text-gray-400 leading-relaxed mb-6">
          Business Email Compromise (BEC) and phishing are the leading vectors for ransomware infections and financial wire fraud. If your domain lacks a strict DMARC policy (<code>p=reject</code>), unauthorized actors can send perfectly crafted emails pretending to be your CEO or invoicing department. These emails will pass through spam filters because, technically, there is no policy instructing the receiver to block them.
        </p>

        <h2 className="text-2xl font-display font-bold text-white mb-6 uppercase tracking-wider mt-10">How to Secure Your Email Infrastructure</h2>
        <ul className="text-gray-400 leading-relaxed mb-6 list-disc pl-6 space-y-2">
          <li><strong>Flatten SPF Records:</strong> SPF records have a strict 10-DNS-lookup limit. Exceeding this causes SPF to break entirely. Use SPF flattening if you use many third-party email senders.</li>
          <li><strong>Implement DKIM Signing:</strong> Ensure all legitimate mail servers (including marketing tools like Mailchimp or CRM tools like Salesforce) cryptographically sign outgoing emails with DKIM.</li>
          <li><strong>Enforce DMARC gradually:</strong> Start with a DMARC policy of <code>p=none</code> to monitor reports, fix delivery issues, then escalate to <code>p=quarantine</code>, and finally <code>p=reject</code>.</li>
        </ul>
        <CTABlock />
      </div>
    )
  },

  'tech-detector': {
    faqs: [
      { q: "What is a website technology checker?", a: "It is a utility that identifies the software, CMS platforms, frameworks, analytics tools, CDNs, and WAFs used to build and secure a target website." },
      { q: "How does technology fingerprinting work?", a: "It analyzes HTTP response headers, HTML source code markers, JavaScript global variables, cookie identifiers, and network routes to detect signature matches." },
      { q: "Can website owners block technology detection?", a: "Yes, organizations can strip server identification headers, remove HTML generator tags, obfuscate scripts, and deploy a WAF to hide their technology stack." }
    ],
    content: (
      <div className="prose prose-invert max-w-none mt-12">
        <h2 className="text-2xl font-display font-bold text-white mb-6 uppercase tracking-wider">Uncovering the Tech Stack</h2>
        <p className="text-gray-400 leading-relaxed mb-6">
          Modern websites are complex composites of various frameworks, libraries, analytics trackers, and Content Delivery Networks (CDNs). Our Website Technology Checker analyzes the target's frontend payload and HTTP responses to fingerprint the entire stack. From detecting underlying CMS platforms like WordPress or Ghost, to identifying frontend frameworks like React or Vue.js, and pinpointing infrastructure like Cloudflare or AWS.
        </p>

        <h2 className="text-2xl font-display font-bold text-white mb-6 uppercase tracking-wider mt-10">Why Security Researchers Profile Technology</h2>
        <p className="text-gray-400 leading-relaxed mb-6">
          Technology fingerprinting is a critical step in the reconnaissance phase of the security auditing cycle. If a researcher or auditor identifies that a target is running an outdated version of jQuery, a vulnerable WordPress plugin, or an unpatched web server, they can locate configuration risks before malicious actors do. Reducing the level of detail public servers disclose is a vital defense-in-depth practice.
        </p>

        <h2 className="text-2xl font-display font-bold text-white mb-6 uppercase tracking-wider mt-10">Defending Against Tech Stack Enumeration</h2>
        <ul className="text-gray-400 leading-relaxed mb-6 list-disc pl-6 space-y-2">
          <li><strong>Remove Server Banners:</strong> Configure your web server (Nginx, Apache, IIS) to stop broadcasting its version number in the <code>Server</code> HTTP header.</li>
          <li><strong>Strip Framework Headers:</strong> Disable headers like <code>X-Powered-By: Express</code> or <code>X-AspNet-Version</code> in your application configuration.</li>
          <li><strong>Use a Web Application Firewall (WAF):</strong> Deploy a WAF like Cloudflare or AWS WAF to obscure your origin server IP and filter malicious probes looking for specific technology configuration risks.</li>
        </ul>
        <CTABlock />
      </div>
    )
  }
};
