import React from 'react';
import ResearchShellClient from '@/components/ResearchShellClient';

export const metadata = {
  title: 'ReconShield Research Shell — Cybersecurity Reconnaissance Terminal',
  description: 'Use the ReconShield Research Shell (RSH) to manually investigate domains, DNS, SSL, subdomains, technologies, HTTP headers, and other publicly observable security intelligence.',
  alternates: {
    canonical: 'https://reconshield.in/research-shell',
  },
  openGraph: {
    title: 'ReconShield Research Shell — Interactive Recon Terminal',
    description: 'Manually driven cybersecurity research environment for domain, DNS, SSL, and asset intelligence.',
    url: 'https://reconshield.in/research-shell',
    siteName: 'ReconShield',
    type: 'website',
  }
};

export default function ResearchShellPage() {
  return <ResearchShellClient />;
}
