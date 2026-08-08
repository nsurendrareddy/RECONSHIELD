import Link from 'next/link';
import { getRelatedEntities } from '@/lib/internalLinking';
import { Server, Zap } from 'lucide-react';

export default function RelatedPorts({ currentPort }) {
  const relations = getRelatedEntities('port', currentPort);

  return (
    <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 mt-6">
      <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-wider text-sm border-b border-white/5 pb-2 flex items-center gap-2">
        <Server className="w-4 h-4 text-purple-400" /> {relations.clusterName}
      </h3>
      
      <div className="space-y-4">
        <p className="text-xs text-gray-400">
          Ports often operate in clusters. When analyzing a service on Port {currentPort}, security engineers typically check the status of these related ports.
        </p>
        <ul className="grid grid-cols-2 gap-2">
          {relations.cluster.map((portNode, i) => (
            <li key={i}>
              <Link href={portNode.href} prefetch={false} className="flex items-center gap-2 text-sm text-purple-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3 py-2 rounded-md font-mono">
                <Zap className="w-3 h-3" /> {portNode.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-4 pt-4 border-t border-white/5">
           <Link href="/ports" prefetch={false} className="text-xs text-gray-500 hover:text-purple-400 transition-colors uppercase tracking-widest font-bold">
             → Browse Full Port Directory
           </Link>
        </div>
      </div>
    </div>
  );
}
