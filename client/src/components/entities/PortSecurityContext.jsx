import { Lock, ShieldAlert, Activity } from 'lucide-react';

export default function PortSecurityContext({ port }) {
  return (
    <div className="prose prose-invert max-w-none mt-8 border-t border-white/10 pt-8">
      <h2 className="text-2xl font-bold text-white uppercase tracking-wider mb-4 border-b border-white/5 pb-2">
        Security Implications of Port {port}
      </h2>
      
      <p className="text-gray-400 leading-relaxed mb-4">
        Network ports are logical endpoints used by the Transmission Control Protocol (TCP) and User Datagram Protocol (UDP) to manage network traffic. Analyzing the state of Port <strong>{port}</strong> is a fundamental step in vulnerability management and penetration testing.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        <div className="bg-black/40 border border-white/5 rounded-xl p-5">
          <h3 className="text-white font-bold mb-2 flex items-center gap-2 text-sm">
            <Activity className="w-4 h-4 text-purple-400" /> Why scan Port {port}?
          </h3>
          <p className="text-sm text-gray-400">
            Scanning this port reveals whether a specific service is actively listening. An open port is not inherently malicious, but it represents an attack surface. Unnecessary or misconfigured open ports are prime targets for automated exploit scanners.
          </p>
        </div>
        
        <div className="bg-black/40 border border-white/5 rounded-xl p-5">
          <h3 className="text-white font-bold mb-2 flex items-center gap-2 text-sm">
            <ShieldAlert className="w-4 h-4 text-yellow-500" /> Threat Intelligence Relevance
          </h3>
          <p className="text-sm text-gray-400">
            Certain malware families and trojans are known to bind to specific non-standard ports to establish Command and Control (C2) communication. Identifying unexpected traffic on Port {port} within a secure network enclave is a critical Indicator of Compromise (IoC).
          </p>
        </div>
      </div>
    </div>
  );
}
