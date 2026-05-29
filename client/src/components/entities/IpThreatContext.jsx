import { AlertTriangle, ShieldCheck, Info } from 'lucide-react';

export default function IpThreatContext({ ip, isMalicious }) {
  return (
    <div className="prose prose-invert max-w-none mt-8 border-t border-white/10 pt-8">
      <h2 className="text-2xl font-bold text-white uppercase tracking-wider mb-4 border-b border-white/5 pb-2">
        Analyst Notes on {ip}
      </h2>
      
      <p className="text-gray-400 leading-relaxed mb-4">
        This intelligence report provides an operational security (OPSEC) summary for the IPv4 address <strong>{ip}</strong>. 
        Security analysts use this data to determine if traffic originating from this host should be permitted, monitored, or dropped at the network edge.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        <div className="bg-black/40 border border-white/5 rounded-xl p-5">
          <h3 className="text-white font-bold mb-2 flex items-center gap-2 text-sm">
            <Info className="w-4 h-4 text-blue-400" /> What is an IP Reputation?
          </h3>
          <p className="text-sm text-gray-400">
            IP reputation is a dynamic score assigned to an IP address based on its historical behavior. If {ip} is frequently involved in spam campaigns, DDoS attacks, or malware distribution, its reputation score drops, leading to widespread blocking by global firewalls.
          </p>
        </div>
        
        <div className="bg-black/40 border border-white/5 rounded-xl p-5">
          <h3 className="text-white font-bold mb-2 flex items-center gap-2 text-sm">
            {isMalicious ? <AlertTriangle className="w-4 h-4 text-red-500" /> : <ShieldCheck className="w-4 h-4 text-green-500" />}
            Security Implications
          </h3>
          <p className="text-sm text-gray-400">
            {isMalicious 
              ? `Traffic originating from ${ip} has triggered security alerts. SOC teams should immediately investigate connections to this host and consider adding it to blocklists or SIEM rules.`
              : `Currently, ${ip} does not appear on major threat intelligence feeds. However, if this IP belongs to a residential proxy or cloud provider, it could still be temporarily leased to malicious actors.`}
          </p>
        </div>
      </div>
    </div>
  );
}
