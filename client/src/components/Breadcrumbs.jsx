import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function Breadcrumbs({ crumbs }) {
  if (!crumbs || crumbs.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://reconshield.in/"
      },
      ...crumbs.map((crumb, index) => ({
        "@type": "ListItem",
        "position": index + 2, // +2 because Home is 1
        "name": crumb.label,
        "item": `https://reconshield.in${crumb.href}`
      }))
    ]
  };

  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex items-center flex-wrap gap-2 text-sm text-slate-400">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Link href="/" className="hover:text-blue-400 transition-colors flex items-center gap-1">
        Home
      </Link>
      {crumbs.map((crumb, index) => {
        const isLast = index === crumbs.length - 1;
        
        return (
          <div key={crumb.href || index} className="flex items-center gap-2">
            <ChevronRight className="w-4 h-4 text-slate-600" />
            {isLast ? (
              <span className="text-slate-200" aria-current="page">
                {crumb.label}
              </span>
            ) : (
              <Link href={crumb.href} className="hover:text-blue-400 transition-colors">
                {crumb.label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
