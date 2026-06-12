import { permanentRedirect } from 'next/navigation';

export async function generateMetadata({ params }) {
  return {
    title: 'Redirecting...',
    robots: { index: false }
  };
}

export default async function DnsRedirectPage({ params }) {
  const resolvedParams = await params;
  const domain = resolvedParams?.domain?.toLowerCase();
  permanentRedirect(`/dns-records/${domain}`);
}
