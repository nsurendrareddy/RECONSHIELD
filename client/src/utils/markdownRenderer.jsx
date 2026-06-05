import React from 'react';
import Link from 'next/link';
import SecurityDefinitions from '@/components/definitions/SecurityDefinitions';
import { SECURITY_DEFINITIONS } from '@/utils/securityDefinitionsData';


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

export function renderMarkdown(mdString, toolId) {
  if (!mdString) return null;

  const lines = mdString.split('\n');
  const elements = [];
  let currentList = [];
  let inList = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Skip empty lines, but close list if open
    if (!line) {
      if (inList && currentList.length > 0) {
        elements.push(
          <ul key={`list-${i}`} className="text-gray-400 leading-relaxed mb-6 list-disc pl-6 space-y-2">
            {currentList}
          </ul>
        );
        currentList = [];
        inList = false;
      }
      continue;
    }

    // Headers
    if (line.startsWith('## ')) {
      if (inList && currentList.length > 0) {
        elements.push(
          <ul key={`list-${i}`} className="text-gray-400 leading-relaxed mb-6 list-disc pl-6 space-y-2">
            {currentList}
          </ul>
        );
        currentList = [];
        inList = false;
      }
      const text = line.substring(3).trim();
      elements.push(
        <h2 key={`h2-${i}`} className="text-2xl font-display font-bold text-white mb-6 uppercase tracking-wider mt-10">
          {parseInline(text)}
        </h2>
      );
      continue;
    }

    if (line.startsWith('### ')) {
      if (inList && currentList.length > 0) {
        elements.push(
          <ul key={`list-${i}`} className="text-gray-400 leading-relaxed mb-6 list-disc pl-6 space-y-2">
            {currentList}
          </ul>
        );
        currentList = [];
        inList = false;
      }
      const text = line.substring(4).trim();
      elements.push(
        <h3 key={`h3-${i}`} className="text-xl font-bold text-white mt-8 mb-3">
          {parseInline(text)}
        </h3>
      );
      continue;
    }

    // List items
    if (line.startsWith('- ') || line.startsWith('* ')) {
      inList = true;
      const text = line.substring(2).trim();
      currentList.push(<li key={`li-${i}`}>{parseInline(text)}</li>);
      continue;
    }

    // Default paragraph
    if (inList && currentList.length > 0) {
      elements.push(
        <ul key={`list-${i}`} className="text-gray-400 leading-relaxed mb-6 list-disc pl-6 space-y-2">
          {currentList}
        </ul>
      );
      currentList = [];
      inList = false;
    }

    // Check for CTA block placeholder
    if (line === '<CTABlock />' || line === '{{CTABlock}}') {
      elements.push(<CTABlock key={`cta-${i}`} />);
      continue;
    }

    // Check for SecurityDefinitions placeholder
    if (line === '<SecurityDefinitions />' || line === '{{SecurityDefinitions}}') {
      const defData = SECURITY_DEFINITIONS[toolId];
      if (defData) {
        elements.push(
          <SecurityDefinitions 
            key={`sec-def-${i}`}
            title={null}
            description={null}
            definitions={defData.definitions}
            colorClass={defData.colorClass}
          />
        );
      }
      continue;
    }

    elements.push(
      <p key={`p-${i}`} className="text-gray-400 leading-relaxed mb-6">
        {parseInline(line)}
      </p>
    );
  }

  if (inList && currentList.length > 0) {
    elements.push(
      <ul key={`list-end`} className="text-gray-400 leading-relaxed mb-6 list-disc pl-6 space-y-2">
        {currentList}
      </ul>
    );
  }

  return <div>{elements}</div>;
}

function parseInline(text) {
  const parts = [];
  let remaining = text;
  const regex = /(\*\*.*?\*\*|`.*?`|\[.*?\]\(.*?\))/;

  while (remaining) {
    const match = regex.exec(remaining);
    if (!match) {
      parts.push(remaining);
      break;
    }

    const matchIndex = match.index;
    if (matchIndex > 0) {
      parts.push(remaining.substring(0, matchIndex));
    }

    const matchedText = match[0];
    if (matchedText.startsWith('**') && matchedText.endsWith('**')) {
      parts.push(
        <strong key={parts.length} className="text-white font-bold">
          {matchedText.substring(2, matchedText.length - 2)}
        </strong>
      );
    } else if (matchedText.startsWith('`') && matchedText.endsWith('`')) {
      parts.push(
        <code key={parts.length} className="text-xs bg-surface-950 px-1.5 py-0.5 rounded font-mono text-cyan-400 border border-white/5">
          {matchedText.substring(1, matchedText.length - 1)}
        </code>
      );
    } else if (matchedText.startsWith('[') && matchedText.includes('](')) {
      const closeBracketIndex = matchedText.indexOf(']');
      const linkText = matchedText.substring(1, closeBracketIndex);
      const url = matchedText.substring(closeBracketIndex + 2, matchedText.length - 1);
      const isExternal = url.startsWith('http://') || url.startsWith('https://');

      if (isExternal) {
        parts.push(
          <a key={parts.length} href={url} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 underline decoration-cyan-400/20 hover:decoration-cyan-400 transition-all">
            {linkText}
          </a>
        );
      } else {
        parts.push(
          <Link key={parts.length} href={url} className="text-cyan-400 hover:text-cyan-300 underline decoration-cyan-400/20 hover:decoration-cyan-400 transition-all">
            {linkText}
          </Link>
        );
      }
    }

    remaining = remaining.substring(matchIndex + matchedText.length);
  }

  return parts;
}
