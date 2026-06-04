import React from 'react';
import { ToolPageContent } from '../[toolId]/page';
import { generateBaseMetadata } from '@/utils/metadata';

export const metadata = generateBaseMetadata({
  title: "SPF, DKIM & DMARC Analyzer | Email Security Auditor",
  description: "Free email security audit tool. Analyze SPF, DKIM, and DMARC DNS records to prevent email spoofing, phishing, and domain abuse.",
  path: "/tools/email-security"
});

export default function Page() {
  return <ToolPageContent toolId="email-security" />;
}
