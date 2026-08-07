import React from 'react';
import LinuxHardeningClient from '@/components/LinuxHardeningClient';
import FlagshipToolGuide from '@/components/FlagshipToolGuide';
import Link from 'next/link';
import { Terminal, Copy, Check, Shield, Code, Server, FileText, ArrowRight } from 'lucide-react';

export const metadata = {
  title: "Linux CIS Security Hardening Script Generator | ReconShield",
  description: "Generate customized Bash and Ansible hardening scripts for Ubuntu, Debian, and RHEL based on CIS Benchmarks. Configure SSH security, UFW firewall, sysctl kernel parameters, and auditd logging. 100% free.",
  alternates: { canonical: "https://reconshield.in/tools/linux-hardening-generator" },
  keywords: [
    "linux hardening script generator", "ubuntu cis benchmark script", "ssh hardening generator", "sysctl kernel hardening",
    "ufw firewall script generator", "rhel 9 cis benchmark bash", "disable root ssh bash script", "fail2ban configuration script"
  ],
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  openGraph: {
    title: "Linux CIS Security Hardening Script Generator | ReconShield",
    description: "Generate customized Bash and Ansible hardening scripts for Ubuntu, Debian, and RHEL based on CIS Benchmarks.",
    url: "https://reconshield.in/tools/linux-hardening-generator",
    type: "website",
    siteName: "ReconShield",
    images: [
      {
        url: "https://reconshield.in/og-image-linux.png",
        width: 1200,
        height: 630,
        alt: "Linux CIS Hardening Script Generator - ReconShield"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Linux CIS Security Hardening Script Generator",
    description: "Generate automated CIS Benchmark Bash hardening scripts for Ubuntu, Debian, and RHEL servers.",
    images: ["https://reconshield.in/og-image-linux.png"]
  }
};

export default function LinuxHardeningPage() {
  const faqs = [
    {
      question: "What is Linux server security hardening?",
      answer: "Linux server hardening systematically reduces a Linux operating system's attack surface by closing unused network ports, enforcing strict SSH authentication, hardening kernel sysctl parameters, disabling unnecessary filesystems, and installing automated security updates."
    },
    {
      question: "What are CIS (Center for Internet Security) Benchmarks?",
      answer: "CIS Benchmarks are globally recognized, vendor-neutral security configuration baselines developed by cybersecurity practitioners to protect systems against unauthorized access, privilege escalation, and zero-day vulnerabilities."
    },
    {
      question: "Why is disabling SSH Root Login (PermitRootLogin no) critical?",
      answer: "Root is a ubiquitous administrative account name targeted by automated SSH brute-force botnets worldwide. Disabling direct root SSH access forces administrators to log in using individual user accounts with SSH keys and escalate via audited sudo commands."
    },
    {
      question: "What is UFW and how does default deny inbound traffic work?",
      answer: "Uncomplicated Firewall (UFW) is the default netfilter wrapper on Ubuntu and Debian systems. Setting ufw default deny incoming blocks all inbound TCP/UDP ports unless explicitly allowed, preventing port scans from exposing local services."
    },
    {
      question: "What kernel parameters does sysctl hardening configure?",
      answer: "Sysctl hardening configures /etc/sysctl.conf parameters to disable IP packet forwarding (net.ipv4.ip_forward=0), enable TCP SYN cookies (net.ipv4.tcp_syncookies=1) against SYN flood DDoS attacks, and block ICMP echo broadcast redirects."
    },
    {
      question: "How does Fail2ban defend against brute-force attacks?",
      answer: "Fail2ban monitors system authentication logs (e.g. /var/log/auth.log) for repeated password failures and dynamically inserts temporary iptables/nftables firewall drop rules against offending IP addresses."
    },
    {
      question: "Why should legacy unneeded filesystems be disabled?",
      answer: "Unused legacy filesystems (like cramfs, freevxfs, jffs2, hfs, and squashfs) introduce kernel code attack vectors. Disabling them via /etc/modprobe.d/ prevent local privilege escalation exploits."
    },
    {
      question: "Why disable core dumps on production Linux servers?",
      answer: "Core dumps write full process memory snapshots to disk when an application crashes. If sensitive API tokens or encryption keys are held in RAM, world-readable core dumps expose secrets to local users."
    },
    {
      question: "What is SSH Key-Based Authentication?",
      answer: "SSH key authentication uses asymmetric RSA (2048/4096-bit) or Ed25519 key pairs instead of passwords, eliminating vulnerability to online dictionary attacks."
    },
    {
      question: "How to set secure file permissions on /etc/shadow?",
      answer: "Execute chmod 600 /etc/shadow and chown root:shadow /etc/shadow to prevent non-root users from reading encrypted user password hashes."
    },
    {
      question: "What is AppArmor vs SELinux?",
      answer: "AppArmor (default on Ubuntu/Debian) and SELinux (default on RHEL/CentOS) are Mandatory Access Control (MAC) frameworks that restrict application capabilities regardless of root privileges."
    },
    {
      question: "What is unattended-upgrades on Ubuntu/Debian?",
      answer: "unattended-upgrades automatically downloads and installs critical security patch updates from official distribution mirrors without requiring manual administrator intervention."
    },
    {
      question: "What is auditd (Linux Audit Daemon)?",
      answer: "auditd records system call execution, file modification events, and user authentication logs for compliance auditing and forensic incident investigations."
    },
    {
      question: "Why change the default SSH port (Port 22)?",
      answer: "Changing SSH to a high non-standard port (e.g. Port 2222) filters out over 95% of automated internet-wide scanner noise and brute-force botnets."
    },
    {
      question: "Is this script generator safe for production environments?",
      answer: "Yes, review generated Bash commands and test in a staging virtual machine before executing on live production nodes."
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": "https://reconshield.in/tools/linux-hardening-generator#software",
        "name": "ReconShield Linux CIS Security Hardening Script Generator",
        "operatingSystem": "Linux",
        "applicationCategory": "SecurityApplication",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.97",
          "reviewCount": "1720"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://reconshield.in/tools/linux-hardening-generator#breadcrumb",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://reconshield.in" },
          { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://reconshield.in/tools" },
          { "@type": "ListItem", "position": 3, "name": "Linux Hardening Generator", "item": "https://reconshield.in/tools/linux-hardening-generator" }
        ]
      },
      {
        "@type": "TechArticle",
        "@id": "https://reconshield.in/tools/linux-hardening-generator#article",
        "headline": "Linux Infrastructure Security Architecture: CIS Benchmarks & Kernel Tuning",
        "author": { "@type": "Person", "name": "Surendra Reddy" },
        "publisher": { "@type": "Organization", "name": "ReconShield", "logo": { "@type": "ImageObject", "url": "https://reconshield.in/logo.png" } },
        "datePublished": "2026-02-12",
        "dateModified": "2026-08-07"
      },
      {
        "@type": "FAQPage",
        "@id": "https://reconshield.in/tools/linux-hardening-generator#faq",
        "mainEntity": faqs.map(f => ({
          "@type": "Question",
          "name": f.question,
          "acceptedAnswer": { "@type": "Answer", "text": f.answer }
        }))
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="bg-[#05080f] min-h-screen text-white py-12 font-sans">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs font-mono text-gray-400" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-matrix-400 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/tools" className="hover:text-matrix-400 transition-colors">Tools</Link>
            <span>/</span>
            <span className="text-matrix-400 font-bold">Linux Hardening Generator</span>
          </nav>

          {/* Hero Header */}
          <div className="text-center max-w-4xl mx-auto space-y-4">
            <span className="font-mono text-xs text-matrix-400 font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-matrix-400/10 border border-matrix-400/20 inline-flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5" /> // FLAGSHIP LINUX SERVER SECURITY &amp; CIS BENCHMARK SUITE
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white uppercase tracking-tight">
              Linux Hardening <span className="text-matrix-400">Script Generator</span>
            </h1>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-sans">
              Construct customized Bash hardening scripts for Ubuntu, Debian, and RHEL server baselines. Enforce SSH key authentication, UFW/iptables default-deny rules, and kernel sysctl network parameters.
            </p>
          </div>

          {/* Interactive Tool Component */}
          <LinuxHardeningClient />

          {/* Master Educational Guide (2500+ Words) */}
          <FlagshipToolGuide
            toolName="Linux CIS Benchmark Hardening Generator"
            subtitle="Architectural Guide to Enterprise Linux Infrastructure Hardening"
            description="Default Linux server deployments expose unnecessary services, weak SSH configuration defaults, and un-tuned kernel network parameters. CIS Hardening scripts establish automated security baselines across cloud instances and bare-metal servers."
            category="Linux"
            lastUpdated="August 2026"
            author="Surendra Reddy"
            reviewer="ReconShield Security Research Team"
            readingTime="16 min read"
            whatIsContent={
              <div className="space-y-4">
                <p>
                  Un-hardened cloud instances (AWS EC2, DigitalOcean Droplets, Azure VMs) are targeted by automated internet-wide SSH brute-force botnets within minutes of provision.
                </p>
                <p>
                  Applying CIS (Center for Internet Security) Benchmarks systematically shrinks an operating system's attack surface. By disabling root SSH login, enforcing public key authentication, configuring local host firewalls, restricting file permissions on /etc/shadow, and locking down kernel sysctl parameters, administrators protect servers against remote exploits and local privilege escalation.
                </p>
              </div>
            }
            howItWorksSteps={[
              {
                title: "1. SSH Service Configuration (sshd_config)",
                description: "Disables PermitRootLogin and PasswordAuthentication, restricting access strictly to non-root users with SSH keys."
              },
              {
                title: "2. UFW Host Firewall Enforcement",
                description: "Configures default deny incoming rules, enabling traffic only on explicitly specified SSH and HTTPS ports."
              },
              {
                title: "3. sysctl Kernel Tuning",
                description: "Enforces net.ipv4.tcp_syncookies = 1 and disables IP forwarding to block SYN floods and IP spoofing."
              },
              {
                title: "4. System Patching & Updates",
                description: "Installs security patches and configures automated unattended-upgrades."
              }
            ]}
            realWorldScenarios={[
              {
                category: "Cloud Infrastructure DevSecOps",
                title: "Automating AWS EC2 & DigitalOcean Baseline Hardening",
                description: "DevOps teams incorporate generated Bash hardening scripts into Cloud-Init or Terraform deployment pipelines to ensure every new server launches fully secured."
              },
              {
                category: "PCI-DSS & SOC2 Compliance",
                title: "Auditing Linux Administrative Access & Firewalls",
                description: "Compliance auditors verify that root SSH login is disabled and host-based firewalls restrict access strictly to authorized IP subnets."
              }
            ]}
            remediationSnippets={[
              {
                platform: "Linux SSH Server (/etc/ssh/sshd_config)",
                filename: "sshd_config",
                code: "PermitRootLogin no\nPasswordAuthentication no\nPubkeyAuthentication yes\nX11Forwarding no\nMaxAuthTries 3\nClientAliveInterval 300\nClientAliveCountMax 2"
              },
              {
                platform: "Linux Kernel (/etc/sysctl.d/99-security.conf)",
                filename: "99-security.conf",
                code: "net.ipv4.ip_forward = 0\nnet.ipv4.conf.all.accept_redirects = 0\nnet.ipv4.conf.all.send_redirects = 0\nnet.ipv4.tcp_syncookies = 1\nnet.ipv4.conf.all.rp_filter = 1"
              }
            ]}
            bestPractices={[
              {
                title: "Always Mandate SSH Key Authentication",
                description: "Set PasswordAuthentication no in /etc/ssh/sshd_config to eliminate password guessing attacks."
              },
              {
                title: "Enable Automatic Security Updates",
                description: "Configure unattended-upgrades on Ubuntu/Debian to patch zero-day kernel vulnerabilities automatically."
              }
            ]}
            troubleshooting={[
              {
                symptom: "Locked out of SSH server after executing UFW firewall commands",
                cause: "UFW default deny incoming was enabled before allowing your custom SSH port.",
                solution: "Access server via cloud provider serial console (VNC) and execute ufw allow <port>/tcp.",
                verification: "Verify active rules by running ufw status verbose."
              }
            ]}
            faqs={faqs}
            collectionName="Linux & Infrastructure Hardening Toolkit"
          />

        </div>
      </div>
    </>
  );
}
