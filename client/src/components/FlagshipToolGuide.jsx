import React from 'react';
import Link from 'next/link';
import { 
  Shield, CheckCircle2, AlertTriangle, BookOpen, Code, Terminal, Globe, Lock, Mail, 
  Server, Cpu, Activity, Search, ExternalLink, ChevronRight, FileText, UserCheck, 
  Award, Check, Clock, ShieldCheck, Layers, HelpCircle, AlertCircle, ArrowRight
} from 'lucide-react';

export default function FlagshipToolGuide({
  toolName,
  subtitle,
  description,
  category,
  lastUpdated = "August 2026",
  author = "Surendra Reddy",
  reviewer = "ReconShield Security Research Team",
  readingTime = "14 min read",
  whatIsContent,
  howItWorksSteps = [],
  realWorldScenarios = [],
  remediationSnippets = [],
  bestPractices = [],
  commonMistakes = [],
  troubleshooting = [],
  faqs = [],
  references = [],
  relatedTools = [],
  collectionName = "Cybersecurity Platform Suite",
  collectionTools = []
}) {
  return (
    <div className="space-y-16 font-sans text-gray-300 max-w-5xl mx-auto pt-8">
      {/* 2. E-E-A-T Metadata Bar */}
      <div className="p-6 bg-surface-900/80 border border-white/10 rounded-2xl flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="flex items-center gap-1.5 text-matrix-400 font-bold">
            <UserCheck className="w-4 h-4" /> Author: {author}
          </span>
          <span className="text-gray-500">•</span>
          <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
            <Award className="w-4 h-4" /> Peer Reviewed: {reviewer}
          </span>
          <span className="text-gray-500">•</span>
          <span className="flex items-center gap-1.5 text-gray-400">
            <Clock className="w-4 h-4" /> Updated: {lastUpdated}
          </span>
        </div>
        <span className="px-3 py-1 bg-matrix-400/10 border border-matrix-400/20 text-matrix-400 rounded-full uppercase font-bold">
          {readingTime}
        </span>
      </div>

      {/* 4. Quick Summary / TL;DR */}
      <section className="p-8 bg-surface-900 border border-white/10 rounded-3xl space-y-4 shadow-xl">
        <h2 className="text-xl font-bold font-display uppercase tracking-wide text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-matrix-400" />
          Executive Summary &amp; Overview
        </h2>
        <p className="text-sm text-gray-300 leading-relaxed font-sans">
          {description} This free utility operates 100% in-browser with zero data logging to deliver instant security diagnostics, RFC compliance verification, and actionable remediation steps.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 text-xs font-mono">
          <div className="p-4 bg-surface-950 border border-white/5 rounded-xl space-y-1">
            <span className="text-matrix-400 font-bold uppercase block">// PRIMARY USAGE</span>
            <span className="text-gray-300 font-sans">Security Audits &amp; Compliance Verification</span>
          </div>
          <div className="p-4 bg-surface-950 border border-white/5 rounded-xl space-y-1">
            <span className="text-cyan-400 font-bold uppercase block">// TARGET AUDIENCE</span>
            <span className="text-gray-300 font-sans">SysAdmins, SecOps, DevSecOps &amp; Researchers</span>
          </div>
          <div className="p-4 bg-surface-950 border border-white/5 rounded-xl space-y-1">
            <span className="text-purple-400 font-bold uppercase block">// LATENCY &amp; PRIVACY</span>
            <span className="text-gray-300 font-sans">Instant (Client-Side) • 0 Logs Saved</span>
          </div>
        </div>
      </section>

      {/* 5. Deep Architectural Explanation */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold font-display uppercase tracking-wide text-white border-b border-white/10 pb-3 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-matrix-400" />
          Understanding {toolName} Architecture
        </h2>
        <div className="prose prose-invert max-w-none text-sm text-gray-300 leading-relaxed space-y-4 font-sans">
          {whatIsContent}
        </div>
      </section>

      {/* 6. How It Works (Protocol / Algorithm Breakdown) */}
      {howItWorksSteps.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-2xl font-bold font-display uppercase tracking-wide text-white border-b border-white/10 pb-3 flex items-center gap-2">
            <Layers className="w-6 h-6 text-cyan-400" />
            Execution Flow &amp; Protocol Verification Steps
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {howItWorksSteps.map((step, idx) => (
              <div key={idx} className="p-6 bg-surface-900 border border-white/10 rounded-2xl space-y-2">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-matrix-400/10 border border-matrix-400/30 flex items-center justify-center font-mono font-bold text-matrix-400 text-xs shrink-0">
                    0{idx + 1}
                  </span>
                  <h3 className="font-bold text-white text-base font-display">{step.title}</h3>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed font-sans pl-11">{step.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 7. Real-World Enterprise Scenarios */}
      {realWorldScenarios.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-2xl font-bold font-display uppercase tracking-wide text-white border-b border-white/10 pb-3 flex items-center gap-2">
            <Globe className="w-6 h-6 text-purple-400" />
            Real-World Enterprise &amp; Red/Blue Team Scenarios
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            {realWorldScenarios.map((scen, idx) => (
              <div key={idx} className="p-6 bg-surface-900 border border-white/10 rounded-2xl space-y-3">
                <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-md font-mono text-[10px] uppercase font-bold text-matrix-400">
                  {scen.category}
                </span>
                <h3 className="text-sm font-bold text-white font-display">{scen.title}</h3>
                <p className="text-gray-400 leading-relaxed font-sans">{scen.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 9. Remediation & Configuration Code Snippets */}
      {remediationSnippets.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-2xl font-bold font-display uppercase tracking-wide text-white border-b border-white/10 pb-3 flex items-center gap-2">
            <Code className="w-6 h-6 text-matrix-400" />
            Hardening &amp; Server Remediation Snippets
          </h2>
          <div className="space-y-6 font-mono text-xs">
            {remediationSnippets.map((snip, idx) => (
              <div key={idx} className="p-6 bg-surface-900 border border-white/10 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm uppercase">{snip.platform}</span>
                  <span className="text-gray-500 text-[10px]">{snip.filename}</span>
                </div>
                <pre className="p-4 bg-black/70 border border-white/10 rounded-xl text-matrix-400 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                  {snip.code}
                </pre>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 10. Security Best Practices (NIST / OWASP / CISA) */}
      {bestPractices.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-2xl font-bold font-display uppercase tracking-wide text-white border-b border-white/10 pb-3 flex items-center gap-2">
            <Shield className="w-6 h-6 text-matrix-400" />
            Security Standards &amp; Hardening Best Practices
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
            {bestPractices.map((bp, idx) => (
              <div key={idx} className="p-4 bg-surface-900 border border-white/10 rounded-xl flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-matrix-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-white text-sm font-display mb-1">{bp.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{bp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 12. Troubleshooting Guide */}
      {troubleshooting.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-2xl font-bold font-display uppercase tracking-wide text-white border-b border-white/10 pb-3 flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-amber-400" />
            Troubleshooting &amp; Common Diagnostics
          </h2>
          <div className="space-y-4 text-xs font-sans">
            {troubleshooting.map((item, idx) => (
              <div key={idx} className="p-5 bg-surface-900 border border-white/10 rounded-2xl space-y-2">
                <h3 className="font-bold text-amber-400 text-sm font-display flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  Symptom: {item.symptom}
                </h3>
                <p className="text-gray-300 leading-relaxed"><strong className="text-white">Cause:</strong> {item.cause}</p>
                <p className="text-matrix-400 leading-relaxed font-mono"><strong className="text-white">Solution:</strong> {item.solution}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 13. Frequently Asked Questions (15+ FAQs) */}
      {faqs.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-2xl font-bold font-display uppercase tracking-wide text-white border-b border-white/10 pb-3 flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-matrix-400" />
            Frequently Asked Questions (FAQs)
          </h2>
          <div className="space-y-4 text-xs font-sans">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-6 bg-surface-900 border border-white/10 rounded-2xl space-y-2">
                <h3 className="text-sm font-bold text-white font-display flex items-start gap-2">
                  <span className="text-matrix-400 font-mono">Q:</span> {faq.question}
                </h3>
                <p className="text-gray-400 leading-relaxed pl-5 font-sans">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 16. Security Tool Collections */}
      <section className="p-8 bg-surface-900 border border-white/10 rounded-3xl space-y-6">
        <h2 className="text-xl font-bold font-display uppercase tracking-wide text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-matrix-400" />
          {collectionName}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
          {[
            { name: 'Email Security Suite', href: '/tools/email-security-suite', tag: 'Anti-Spoofing' },
            { name: 'CSP Visual Evaluator', href: '/tools/csp-evaluator-builder', tag: 'XSS Guard' },
            { name: 'JWT Security Auditor', href: '/tools/jwt-security-auditor', tag: 'Token Audit' },
            { name: 'Google Dork Builder', href: '/tools/google-dork-builder', tag: 'OSINT Studio' },
            { name: 'IOC Defang & STIX', href: '/tools/ioc-defang-stix-studio', tag: 'Threat Triage' },
            { name: 'Sigma & YARA Studio', href: '/tools/sigma-yara-studio', tag: 'SIEM Rules' },
            { name: 'Linux Hardening', href: '/tools/linux-hardening-generator', tag: 'CIS Baseline' },
            { name: 'TLS Hardening Studio', href: '/tools/tls-hardening-studio', tag: 'SSL Ciphers' }
          ].map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              prefetch={false}
              className="p-4 bg-surface-950 border border-white/5 rounded-xl hover:border-matrix-400/40 transition-all flex flex-col justify-between space-y-2 group"
            >
              <span className="text-white font-bold group-hover:text-matrix-400 transition-colors">{item.name}</span>
              <span className="text-[10px] text-matrix-400/80 uppercase font-mono">{item.tag}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 17 & 18. E-E-A-T Author & Official References */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        <div className="p-6 bg-surface-900 border border-white/10 rounded-2xl space-y-3">
          <h3 className="text-sm font-bold text-white font-display flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-matrix-400" />
            Editorial Policy &amp; Review Methodology
          </h3>
          <p className="text-gray-400 leading-relaxed font-sans">
            Every technical guide published on ReconShield undergoes rigorous peer review by senior cybersecurity engineers. Diagnostics are validated against official IETF RFCs, OWASP Top 10 guidelines, and NIST SP 800-53 security controls.
          </p>
        </div>

        <div className="p-6 bg-surface-900 border border-white/10 rounded-2xl space-y-3">
          <h3 className="text-sm font-bold text-white font-display flex items-center gap-2">
            <ExternalLink className="w-4 h-4 text-cyan-400" />
            Official Security Standards &amp; Citations
          </h3>
          <ul className="space-y-1.5 text-gray-400 font-mono text-[11px]">
            <li>• OWASP Application Security Verification Standard (ASVS)</li>
            <li>• NIST Special Publication 800-53 Rev. 5</li>
            <li>• CISA Known Exploited Vulnerabilities (KEV) Catalog</li>
            <li>• IETF RFC 7208 (SPF), RFC 7489 (DMARC), RFC 6797 (HSTS)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
