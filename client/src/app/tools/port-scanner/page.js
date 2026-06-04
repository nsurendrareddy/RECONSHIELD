import React from 'react';
import { ToolPageContent } from '../[toolId]/page';
import { generateBaseMetadata } from '@/utils/metadata';

export const metadata = generateBaseMetadata({
  title: "Port Scanner & Network internet-facing assets Analysis Tool",
  description: "Free TCP port scanner and open port checker. Scan open ports, map your internet-facing assets, and detect vulnerable network services passively.",
  path: "/tools/port-scanner"
});

export default function Page() {
  return <ToolPageContent toolId="port-scanner" />;
}
