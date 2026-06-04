import React from 'react';
import { ToolPageContent } from '../[toolId]/page';
import { generateBaseMetadata } from '@/utils/metadata';

export const metadata = generateBaseMetadata({
  title: "DNS Lookup & Security Analyzer Tool",
  description: "Free DNS lookup and domain analyzer tool. Query DNS records, check propagation status, and detect DNS security vulnerabilities instantly.",
  path: "/tools/dns-lookup"
});

export default function Page() {
  return <ToolPageContent toolId="dns-lookup" />;
}
