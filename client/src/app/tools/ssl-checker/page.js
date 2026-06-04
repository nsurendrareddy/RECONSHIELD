import React from 'react';
import { ToolPageContent } from '../[toolId]/page';
import { generateBaseMetadata } from '@/utils/metadata';

export const metadata = generateBaseMetadata({
  title: "SSL Checker & TLS Security Analysis Tool",
  description: "Free SSL checker and TLS configuration analyzer. Verify SSL certificates, check expiration dates, and test for HTTPS configuration risks instantly.",
  path: "/tools/ssl-checker"
});

export default function Page() {
  return <ToolPageContent toolId="ssl-checker" />;
}
