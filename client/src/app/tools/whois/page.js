import React from 'react';
import { ToolPageContent } from '../[toolId]/page';
import { generateBaseMetadata } from '@/utils/metadata';

export const metadata = generateBaseMetadata({
  title: "WHOIS Lookup & Domain Intelligence Tool",
  description: "Free WHOIS checker and RDAP lookup tool. Perform domain ownership lookup, analyze registration data, and uncover domain intelligence instantly.",
  path: "/tools/whois"
});

export default function Page() {
  return <ToolPageContent toolId="whois" />;
}
