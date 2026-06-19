'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';

export default function AdSenseLoader() {
  const pathname = usePathname() || '';

  // List of paths where AdSense should be blocked (thin, programmatic, or simulated data).
  const isProgrammaticRoute = [
    /^\/tools\/ip-lookup\/.+/,
    /^\/tools\/dns-lookup\/.+/,
    /^\/tools\/subdomain-finder\/.+/,
    /^\/tools\/ssl-checker\/.+/,
    /^\/tools\/whois\/.+/,
    /^\/reports\/.+/,
    /^\/ip\/.+/,
    /^\/domain\/.+/,
    /^\/asn\/.+/,
    /^\/subdomains\/.+/,
    /^\/ssl\/.+/,
  ].some((pattern) => pattern.test(pathname));

  // Allow AdSense on the root /ssl/errors/[errorCode] as it's an educational concept page
  const isSslErrorConceptPage = /^\/ssl\/errors\/.+/.test(pathname);

  if (isProgrammaticRoute && !isSslErrorConceptPage) {
    return null;
  }

  return (
    <Script
      id="google-adsense"
      strategy="afterInteractive"
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3496685713682736"
      crossOrigin="anonymous"
    />
  );
}
