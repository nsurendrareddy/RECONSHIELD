import React from 'react';
import { ToolPageContent } from '../[toolId]/page';
import { generateBaseMetadata } from '@/utils/metadata';

export const metadata = generateBaseMetadata({
  title: "Security Headers Analyzer & Website Hardening Tool",
  description: "Free security headers checker. Audit HTTP security headers, analyze your Content-Security-Policy (CSP), and enforce HSTS to protect against XSS and clickjacking.",
  path: "/tools/http-headers"
});

export default function Page() {
  return <ToolPageContent toolId="http-headers" />;
}
