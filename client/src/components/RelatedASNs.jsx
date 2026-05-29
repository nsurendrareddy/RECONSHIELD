import Link from 'next/link';

export default function RelatedASNs({ currentAsn }) {
  // In a real application, this would fetch related ASNs based on peering or country.
  // For the sake of the structural SEO example, we provide programmatic sibling links.
  
  // Extract number if it has 'AS' prefix
  const asnNum = currentAsn.replace(/^AS/i, '');
  
  // Generate mathematically adjacent/related ASNs for crawling
  const baseNum = parseInt(asnNum, 10) || 15169;
  const relatedPeers = [
    `AS${baseNum + 1}`,
    `AS${baseNum + 2}`,
    `AS${Math.max(1, baseNum - 1)}`,
    `AS${Math.max(1, baseNum - 2)}`
  ];

  return (
    <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 mt-6">
      <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-wider text-sm border-b border-white/5 pb-2">
        Network Peers & Related ASNs
      </h3>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <h4 className="text-xs font-mono text-gray-500 uppercase mb-3">Mathematically Adjacent Peers</h4>
          <ul className="space-y-2">
            {relatedPeers.map(peer => (
              <li key={peer}>
                <Link href={`/asn/${peer}`} className="text-blue-400 hover:text-[#00ff88] hover:underline font-mono text-sm transition-colors">
                  {peer} Profile
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
