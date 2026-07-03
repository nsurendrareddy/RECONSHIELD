'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';

/**
 * Inner component: must be wrapped in Suspense because useSearchParams()
 * opts the subtree out of static rendering in Next.js App Router.
 */
function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (typeof window.gtag !== 'function') return;

    const search = searchParams.toString();
    const url = pathname + (search ? `?${search}` : '');

    window.gtag('event', 'page_view', {
      page_path: url,
      page_title: document.title,
      page_location: window.location.href,
    });
  }, [pathname, searchParams]);

  return null;
}

/**
 * Mount this once in the root layout <body>.
 * It fires a GA4 page_view on every client-side route change,
 * which Next.js App Router does NOT do automatically.
 */
export default function GoogleAnalyticsPageView() {
  return (
    <Suspense fallback={null}>
      <PageViewTracker />
    </Suspense>
  );
}
