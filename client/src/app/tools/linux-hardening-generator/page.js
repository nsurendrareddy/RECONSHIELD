import React from 'react';
import LinuxHardeningClient from '@/components/LinuxHardeningClient';
import FlagshipToolGuide from '@/components/FlagshipToolGuide';

export const metadata = {
  title: "Linux CIS Security Hardening Script Generator | ReconShield",
  description: "Generate customized Bash and Ansible hardening scripts for Ubuntu, Debian, and RHEL based on CIS Benchmarks. SSH, UFW, sysctl parameters. 100% free.",
  alternates: { canonical: "https://reconshield.in/tools/linux-hardening-generator" },
  keywords: ["linux hardening script generator", "ubuntu cis benchmark script", "ssh hardening generator"]
};

export default function LinuxHardeningPage() {
  const faqs = [
    { question: "What is Linux server hardening?", answer: "Linux hardening involves configuring system settings, firewalls, user permissions, kernel sysctl parameters, and SSH services to minimize security exposure and comply with security frameworks like CIS Benchmarks." },
    { question: "What are CIS Benchmarks?", answer: "Center for Internet Security (CIS) Benchmarks are consensus-based security configuration baselines created by global cybersecurity experts to protect systems against cyber threats." },
    { question: "Why disable SSH Root Login?", answer: "Disabling root SSH login (PermitRootLogin no) prevents attackers from executing brute-force attacks against the default administrative account. Administrators must authenticate using non-privileged accounts and elevate privileges via sudo." },
    { question: "What is UFW Firewall?", answer: "Uncomplicated Firewall (UFW) is a user-friendly frontend for iptables/nftables on Ubuntu and Debian systems used to manage inbound and outbound network rules." },
    { question: "How to secure sysctl network parameters?", answer: "Configure /etc/sysctl.conf to disable IP forwarding, ignore ICMP echo broadcasts, enable SYN flood cookies (net.ipv4.tcp_syncookies = 1), and disable source routing." },
    { question: "What is Fail2ban?", answer: "Fail2ban monitors system log files (like /var/log/auth.log) for repeated authentication failures and dynamically adds iptables firewall rules to ban offending IP addresses." },
    { question: "What is PAM (Pluggable Authentication Modules)?", answer: "PAM provides a flexible architecture for Linux authentication, allowing administrators to enforce password complexity, account lockout policies, and MFA." },
    { question: "Why disable legacy unneeded filesystems?", answer: "Disabling unused filesystems like cramfs, freevxfs, jffs2, hfs, and squashfs reduces kernel attack surface." },
    { question: "What is SSH Key-Based Authentication?", answer: "SSH key authentication uses asymmetric RSA or Ed25519 key pairs instead of passwords, eliminating vulnerability to online password guessing attacks." },
    { question: "How to set secure file permissions on /etc/shadow?", answer: "Execute chmod 600 /etc/shadow and chown root:shadow /etc/shadow to prevent unauthorized password hash exposure." },
    { question: "What is AppArmor / SELinux?", answer: "Mandatory Access Control (MAC) frameworks that enforce strict security policies on applications regardless of user permissions." },
    { question: "What is unattended-upgrades on Ubuntu?", answer: "A package that automatically downloads and installs security updates to keep Linux systems patched against zero-day exploits." },
    { question: "Why disable core dumps?", answer: "Core dumps contain process memory snapshots that may leak sensitive API tokens or encryption keys if written to world-readable disk locations." },
    { question: "What is auditd in Linux?", answer: "The Linux Audit Daemon (auditd) tracks system calls, file access, and user actions for security compliance and forensic investigation." },
    { question: "Is this script generator safe for production?", answer: "Yes, review generated Bash commands and test in staging before deploying to live production nodes." }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "ReconShield Linux Hardening Generator",
        "operatingSystem": "Linux",
        "applicationCategory": "SecurityApplication",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
      },
      {
        "@type": "FAQPage",
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="bg-[#05080f] min-h-screen text-white py-12">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="font-mono text-xs text-matrix-400 font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-matrix-400/10 border border-matrix-400/20">
              // LINUX SECURITY &amp; SERVER HARDENING
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white uppercase tracking-tight">
              Linux Hardening <span className="text-matrix-400">Script Generator</span>
            </h1>
            <p className="text-gray-400 text-sm sm:text-base font-sans leading-relaxed">
              Construct automated Bash hardening scripts for Ubuntu, Debian, and RHEL server baselines.
            </p>
          </div>

          <LinuxHardeningClient />

          <FlagshipToolGuide
            toolName="Linux CIS Benchmark Hardening Generator"
            subtitle="Automated Infrastructure Security Baseline Script Builder"
            description="Unconfigured Linux deployments remain prime targets for automated botnet SSH brute-forcing and kernel privilege escalation exploits. CIS Hardening scripts establish robust defenses across SSH, firewalls, and sysctl network parameters."
            category="Linux"
            whatIsContent={
              <p>
                Server hardening systematically reduces an operating system&apos;s attack surface by disabling unnecessary services, closing unused ports, enforcing least-privilege access, and tuning kernel network security flags.
              </p>
            }
            howItWorksSteps={[
              { title: "SSH Hardening", description: "Configures sshd_config to disable root login and mandate key authentication." },
              { title: "Firewall Policy Setup", description: "Configures UFW/iptables default deny incoming rules." },
              { title: "Kernel Parameter Tuning", description: "Applies sysctl security parameters to prevent SYN floods and IP spoofing." }
            ]}
            bestPractices={[
              { title: "Mandate SSH Key Authentication", description: "Set PasswordAuthentication no in /etc/ssh/sshd_config." }
            ]}
            faqs={faqs}
          />
        </div>
      </div>
    </>
  );
}
