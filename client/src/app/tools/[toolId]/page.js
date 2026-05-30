import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ChevronRight, Share2 } from 'lucide-react';
import { TOOLS, TOOL_SEO_CONTENT } from '@/utils/toolsData';
import AuthorizedUseBanner from '@/components/AuthorizedUseBanner';
import { SemanticToolLinks } from '@/components/SemanticLinks';

const ToolScannerClient = dynamic(() => import('@/components/ToolScannerClient'), {
  loading: () => <div className="min-h-[400px] animate-pulse bg-surface-900/50 rounded-3xl max-w-5xl mx-auto my-12" />
});

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const toolId = resolvedParams?.toolId || 'dns-lookup';
  
  const tool = TOOLS.find(t => t.id === toolId) || TOOLS.find(t => t.id === 'dns-lookup');
  
  return {
    title: `${tool.name} - Free Online ${tool.name} Tool`,
    description: tool.desc,
    alternates: {
      canonical: `https://reconshield.in/tools/${toolId}`,
    },
    openGraph: {
      url: `https://reconshield.in/tools/${toolId}`,
      title: `${tool.name} - Free Cybersecurity Tool`,
      description: tool.desc,
      type: 'website',
      siteName: 'ReconShield',
      locale: 'en_US',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${tool.name} | Free Cybersecurity Tool`,
      description: tool.desc,
      images: ['/og-image.png']
    }
  };
}

const ShareButtons = ({ toolId, toolName }) => {
  const url = `https://reconshield.in/tools/${toolId}`;
  const text = `Check out this free ${toolName} tool on ReconShield:`;

  return (
    <div className="flex items-center gap-3 mt-8 pt-6 border-t border-white/5">
      <span className="text-sm font-mono text-gray-500 flex items-center gap-2">
        <Share2 className="w-4 h-4" /> Share:
      </span>
      <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`} target="_blank" rel="noreferrer" className="px-3 py-1 bg-white/[0.02] border border-white/5 rounded-lg hover:bg-blue-500/10 hover:text-blue-400 transition-colors text-xs font-bold font-mono">
        X
      </a>
      <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(toolName)}`} target="_blank" rel="noreferrer" className="px-3 py-1 bg-white/[0.02] border border-white/5 rounded-lg hover:bg-blue-600/10 hover:text-blue-500 transition-colors text-xs font-bold font-mono">
        IN
      </a>
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`} target="_blank" rel="noreferrer" className="px-3 py-1 bg-white/[0.02] border border-white/5 rounded-lg hover:bg-blue-600/10 hover:text-blue-500 transition-colors text-xs font-bold font-mono">
        FB
      </a>
    </div>
  );
};

export function ToolPageContent({ toolId }) {
  const tool = TOOLS.find(t => t.id === toolId) || TOOLS.find(t => t.id === 'dns-lookup');
  const seoConfig = TOOL_SEO_CONTENT[toolId] || TOOL_SEO_CONTENT['dns-lookup'];
  
  // Get 3 related tools based on category
  const relatedTools = TOOLS.filter(t => t.category === tool.category && t.id !== toolId).slice(0, 3);
  if (relatedTools.length < 3) {
    const extraTools = TOOLS.filter(t => t.category !== tool.category && t.id !== toolId).slice(0, 3 - relatedTools.length);
    relatedTools.push(...extraTools);
  }

  const schemaJson = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': `https://reconshield.in/tools/${toolId}/#software`,
        name: `${tool.name} - Free Online Security Tool by ReconShield`,
        description: tool.desc,
        applicationCategory: 'SecurityApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript. Requires HTML5.',
        url: `https://reconshield.in/tools/${toolId}`,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD'
        },
        author: {
          '@type': 'Organization',
          name: 'ReconShield Security'
        }
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://reconshield.in' },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://reconshield.in/tools' },
          { '@type': 'ListItem', position: 3, name: tool.name, item: `https://reconshield.in/tools/${toolId}` },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: seoConfig.faqs?.map(f => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })) || [],
      },
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />
      <AuthorizedUseBanner />
      
      <div className="sr-only">
        <h2>{tool.name}</h2>
        <p>{tool.desc}</p>
      </div>

      <div className="max-w-5xl mx-auto px-4 pt-4">
        {/* Breadcrumb Navigation and Meta */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-xs font-mono text-gray-500">
              <li><Link href="/" className="hover:text-[#00ff88] transition-colors">Home</Link></li>
              <li><ChevronRight className="w-3 h-3" /></li>
              <li><Link href="/tools" className="hover:text-[#00ff88] transition-colors">Tools</Link></li>
              <li><ChevronRight className="w-3 h-3" /></li>
              <li className="text-[#00ff88]">{tool.name}</li>
            </ol>
          </nav>
          <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
            LAST UPDATED: May 2026
          </div>
        </div>

        {/* Prominent Legal Disclaimer Badge */}
        <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4 flex flex-col sm:flex-row items-center gap-3 text-[10px] sm:text-xs font-mono text-amber-500 mb-8 shadow-sm">
          <div className="flex items-center gap-1.5 shrink-0 uppercase font-bold tracking-wider">
            <span className="text-[14px]">⚠️</span> LEGAL DISCLAIMER:
          </div>
          <p className="flex-1 leading-relaxed font-sans text-gray-400">
            ReconShield is intended for authorized security research and educational purposes only. Unauthorized scanning is illegal.
            <a href="/disclaimer" className="text-amber-500 underline ml-1.5 hover:text-amber-400 font-mono text-[10px]">View Policy</a>
          </p>
        </div>
      </div>

      {/* Main Scanner Client Component */}
      <ToolScannerClient 
        toolId={toolId} 
        title={tool.name} 
        desc={tool.desc} 
      />

      {/* SEO Content & Information */}
      <div className="max-w-5xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 border-t border-white/5 pt-12">
          
          {/* Left Column: Rich Content */}
          <div className="lg:col-span-2">
            {seoConfig.content}
            
            {/* Tool FAQs */}
            {seoConfig.faqs && seoConfig.faqs.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-display font-bold text-white mb-6 uppercase tracking-wider">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {seoConfig.faqs.map((faq, i) => (
                    <div key={i} className="p-5 rounded-xl bg-[#0d1117] border border-white/[0.06]">
                      <h3 className="text-white font-semibold mb-2 text-sm">{faq.q}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <SemanticToolLinks currentTool={toolId} />
            <ShareButtons toolId={toolId} toolName={tool.name} />
          </div>

          {/* Right Column: Sidebar (Related Tools) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <h3 className="text-sm font-mono font-bold text-gray-400 uppercase tracking-widest mb-6">Related Tools</h3>
              <div className="space-y-4">
                {relatedTools.map(t => {
                  const Icon = t.icon;
                  return (
                    <Link key={t.id} href={`/tools/${t.id}`} className="group flex items-start gap-4 p-4 rounded-xl bg-[#0d1117] border border-white/[0.06] hover:border-cyan-500/30 transition-all">
                      <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-cyan-400" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white mb-1 group-hover:text-cyan-400 transition-colors">{t.name}</h4>
                        <p className="text-xs text-gray-500 line-clamp-2">{t.desc}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
              
              <div className="mt-8 p-6 rounded-xl bg-gradient-to-br from-matrix-400/10 to-transparent border border-matrix-400/20">
                <h4 className="text-sm font-bold text-white mb-2">Automate Your Scans</h4>
                <p className="text-xs text-gray-400 mb-4 leading-relaxed">
                  Get full internet-facing assets visibility and continuous monitoring with our enterprise API.
                </p>
                <Link href="/contact" className="text-xs font-mono font-bold text-matrix-400 hover:underline">
                  Contact Sales →
                </Link>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
}

export default async function Page({ params }) {
  const resolvedParams = await params;
  const toolId = resolvedParams?.toolId || 'dns-lookup';
  
  return <ToolPageContent toolId={toolId} />;
}
