import React from 'react';
import Link from 'next/link';
import { ArrowRight, Shield, BookOpen, Layers } from 'lucide-react';
import { getToolById } from '@/registry/tools';
import { getRelatedTools } from '@/lib/recommendationEngine';

export function SemanticToolLinks({ currentTool }) {
  const tool = getToolById(currentTool);
  if (!tool) return null;

  const relatedTools = getRelatedTools(tool, 3);

  return (
    <aside className="p-6 bg-surface-900/80 border border-white/10 rounded-2xl space-y-4 my-8 font-sans">
      <div className="flex items-center gap-2">
        <Shield className="w-4 h-4 text-matrix-400" />
        <h3 className="font-mono text-xs uppercase tracking-widest text-matrix-400 font-bold">
          Related Security Intelligence &amp; Utilities
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
        {relatedTools.map(t => (
          <Link
            key={t.id}
            href={`/tools/${t.slug}`}
            className="p-3 bg-surface-950 border border-white/5 rounded-xl hover:border-matrix-400/40 transition-all flex flex-col justify-between group"
          >
            <div>
              <span className="text-[9px] text-gray-500 uppercase tracking-wider">{t.category}</span>
              <h4 className="text-white font-bold group-hover:text-matrix-400 transition-colors mt-0.5">{t.name}</h4>
            </div>
            <div className="flex items-center justify-between text-matrix-400 text-[10px] pt-3">
              <span>Launch</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        ))}
      </div>

      <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-gray-400">
        <Link href={`/tools/${tool.category}`} className="hover:text-matrix-400 transition-colors flex items-center gap-1">
          <Layers className="w-3.5 h-3.5 text-matrix-400" />
          <span>Explore all {tool.category.toUpperCase()} tools →</span>
        </Link>
        <Link href="/blog" className="hover:text-matrix-400 transition-colors flex items-center gap-1">
          <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
          <span>Read Security Briefings →</span>
        </Link>
      </div>
    </aside>
  );
}
