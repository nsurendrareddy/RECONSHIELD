import React from 'react';
import Link from 'next/link';

export function SemanticToolLinks({ currentTool }) {
  // Logic: Map tools to relevant blog posts or other tools to build Hub-and-Spoke structure
  const relationshipMap = {
    'email-security': [
      { title: 'Understanding DMARC Policies', url: '/blog/what-is-dmarc' },
      { title: 'Free Cybersecurity Tools Guide', url: '/blog/free-cybersecurity-tools' }
    ],
    'vulnerability-scanner': [
      { title: 'Attack Surface Management', url: '/blog/category/attack-surface-management' }
    ],
    'ip-lookup': [
      { title: 'What is OSINT? A Beginner\'s Guide', url: '/blog/what-is-osint-beginners-guide' }
    ],
    'dns-lookup': [
      { title: 'Free Cybersecurity Tools Guide', url: '/blog/free-cybersecurity-tools' }
    ]
  };

  const links = relationshipMap[currentTool] || [];

  if (links.length === 0) return null;

  return (
    <aside className="border-t border-matrix-400/20 pt-6 mt-8">
      <h3 className="font-mono text-sm uppercase text-matrix-400 mb-4">Related Intelligence</h3>
      <ul className="space-y-2">
        {links.map(link => (
          <li key={link.url}>
             <Link href={link.url} className="text-gray-400 hover:text-white transition-colors text-sm">
               → {link.title}
             </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
