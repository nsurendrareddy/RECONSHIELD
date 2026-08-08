import Link from 'next/link';
import { getRelatedEntities } from '@/lib/internalLinking';
import { Network, Zap } from 'lucide-react';

export default function RelatedASNs({ currentAsn }) {
  const relations = getRelatedEntities('asn', currentAsn);

  return (
    <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 mt-6">
      <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-wider text-sm border-b border-white/5 pb-2 flex items-center gap-2">
        <Network className="w-4 h-4 text-blue-400" /> Network Peers & Related ASNs
      </h3>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <h4 className="text-xs font-mono text-gray-500 uppercase mb-3">Verified Network Peers</h4>
          <ul className="space-y-2">
            {relations.peers.map(peer => (
              <li key={peer.label}>
                <Link href={peer.href} prefetch={false} className="text-blue-400 hover:text-[#00ff88] hover:underline font-mono text-sm transition-colors flex items-center gap-2">
                  <Zap className="w-3 h-3 text-blue-400" /> {peer.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
