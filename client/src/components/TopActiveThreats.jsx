import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Activity, ShieldAlert, ArrowUpRight, Server, Globe } from 'lucide-react';

export default function TopActiveThreats() {
  const [threats, setThreats] = useState([]);
  
  // Mock data for Phase 1 of implementation (Simulating Redis/ClickHouse pull)
  useEffect(() => {
    setThreats([
      { ip: "185.122.204.10", score: 98, asn: 44534, campaign: "Kimsuky Exploit", lastSeen: "2 mins ago", country: "RU" },
      { ip: "45.227.255.43", score: 94, asn: 262254, campaign: "Mirai Botnet", lastSeen: "5 mins ago", country: "CN" },
      { ip: "103.142.228.6", score: 91, asn: 13412, campaign: "CVE-2023-44487", lastSeen: "12 mins ago", country: "VN" },
      { ip: "193.169.255.10", score: 88, asn: 51042, campaign: "Log4Shell Scans", lastSeen: "15 mins ago", country: "IR" },
    ]);
  }, []);

  return (
    <section aria-labelledby="active-threats-title" className="mb-8">
      <div className="flex items-center gap-4 mb-12">
        <h2 id="active-threats-title" className="font-mono text-xs tracking-[4px] uppercase text-[#ff3366] font-bold flex items-center gap-2">
          <Activity className="w-4 h-4" />
          // LIVE THREAT PULSE
        </h2>
        <div className="h-[1px] flex-1 bg-[#1a2332]" />
        <div className="flex items-center gap-2 px-3 py-1 bg-[#ff3366]/10 rounded-full border border-[#ff3366]/30">
          <div className="w-2 h-2 rounded-full bg-[#ff3366] animate-pulse" />
          <span className="text-[9px] font-mono text-[#ff3366] uppercase tracking-[1px]">Live Feed</span>
        </div>
      </div>

      <div className="bg-[#0d1117] border border-[#1a2332] rounded-[6px] overflow-hidden">
        {/* Using Definition List (dl) for AI Search Retrieval (Phase 8 requirement) */}
        <dl className="divide-y divide-[#1a2332]">
          {threats.map((threat, i) => (
            <div key={i} className="group flex flex-col md:flex-row md:items-center justify-between p-5 hover:bg-[#1a2332]/50 transition-colors">
              <div className="flex items-center gap-4 mb-3 md:mb-0">
                <ShieldAlert className="w-5 h-5 text-[#ff3366] opacity-70 group-hover:opacity-100 transition-opacity" />
                <div>
                  <dt className="font-mono text-[14px] text-[#e2e8f0] font-bold group-hover:text-[#ff3366] transition-colors">
                    {threat.ip}
                  </dt>
                  <dd className="flex items-center gap-3 text-[10px] font-mono text-[#94a3b8] uppercase tracking-[1px] mt-1">
                    <span className="flex items-center gap-1"><Server className="w-3 h-3" /> AS{threat.asn}</span>
                    <span className="flex items-center gap-1"><Globe className="w-3 h-3" /> {threat.country}</span>
                    <span className="text-[#00ff88]">Score: {threat.score}/100</span>
                  </dd>
                </div>
              </div>
              
              <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto border-t md:border-t-0 border-[#1a2332] pt-3 md:pt-0">
                <dd className="font-mono text-[11px] text-[#e2e8f0] bg-[#1a2332] px-3 py-1 rounded-[4px] border border-[#1a2332]/50">
                  {threat.campaign}
                </dd>
                <dd className="font-mono text-[10px] text-[#8a9bb0] w-20 text-right">
                  {threat.lastSeen}
                </dd>
                <Link href={`/ip/${threat.ip}`} className="hidden md:flex p-2 hover:bg-[#ff3366]/10 rounded-full transition-colors text-[#94a3b8] hover:text-[#ff3366]">
                  <ArrowUpRight className="w-4 h-4" />
                  <span className="sr-only">View Intelligence for {threat.ip}</span>
                </Link>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
