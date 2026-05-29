import Link from 'next/link';
import { getRelatedEntities } from '@/lib/internalLinking';
import { Network, Search } from 'lucide-react';

export default function RelatedIPs({ currentIp }) {
  const relations = getRelatedEntities('ip', currentIp);

  return (
    <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 mt-6">
      <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-wider text-sm border-b border-white/5 pb-2 flex items-center gap-2">
        <Network className="w-4 h-4 text-blue-400" /> Network Adjacency
      </h3>
      
      <div className="space-y-6">
        <div>
          <h4 className="text-xs font-mono text-gray-500 uppercase mb-3">Neighboring IPs</h4>
          <ul className="grid grid-cols-2 gap-2">
            {relations.neighbors.map((neighbor, i) => (
              <li key={i}>
                <Link href={neighbor.href} className="flex items-center gap-2 text-sm text-blue-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3 py-2 rounded-md font-mono">
                  <Search className="w-3 h-3" /> {neighbor.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="text-xs font-mono text-gray-500 uppercase mb-3">Subnet / Organization</h4>
          <Link href={relations.asnLink.href} className="text-sm text-blue-400 hover:text-white hover:underline transition-colors block mb-2">
            {relations.asnLink.label}
          </Link>
          {relations.subnets.map((subnet, i) => (
            <Link key={i} href={subnet.href} className="text-sm text-blue-400 hover:text-white hover:underline transition-colors block">
              Analyze {subnet.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
