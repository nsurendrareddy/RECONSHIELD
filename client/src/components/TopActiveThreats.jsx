import React from 'react';
import Link from 'next/link';
import { Activity, ShieldAlert, ArrowUpRight, Server, Globe } from 'lucide-react';

export default function TopActiveThreats() {
  // Mock data for Phase 1 of implementation (Simulating Redis/ClickHouse pull)
  const threats = [
    { ip: "185.122.204.10", score: 98, asn: 44534, campaign: "Kimsuky abuse", lastSeen: "2 mins ago", country: "RU" },
    { ip: "45.227.255.43", score: 94, asn: 262254, campaign: "Mirai Botnet", lastSeen: "5 mins ago", country: "CN" },
    { ip: "103.142.228.6", score: 91, asn: 13412, campaign: "CVE-2023-44487", lastSeen: "12 mins ago", country: "VN" },
    { ip: "193.169.255.10", score: 88, asn: 51042, campaign: "Log4Shell Scans", lastSeen: "15 mins ago", country: "IR" },
  ];

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
            <div key={i} className="group grid grid-cols-[auto_1fr_1fr] md:grid-cols-[auto_auto_1fr_auto_auto] gap-x-4 gap-y-1 items-center p-5 hover:bg-[#1a2332]/50 transition-colors">
               
               <dt className="col-start-1 row-start-1 row-span-2 flex items-center justify-center">
                 <ShieldAlert className="w-5 h-5 text-[#ff3366] opacity-70 group-hover:opacity-100 transition-opacity" />
                 <span className="sr-only">Threat Alert</span>
               </dt>

               <dt className="col-start-2 col-span-2 md:col-span-1 row-start-1 font-mono text-[14px] text-[#e2e8f0] font-bold group-hover:text-[#ff3366] transition-colors">
                 {threat.ip}
               </dt>

               <dd className="col-start-2 col-span-2 md:col-span-1 row-start-2 flex flex-wrap items-center gap-3 text-[10px] font-mono text-[#94a3b8] uppercase tracking-[1px]">
                  <span className="flex items-center gap-1"><Server className="w-3 h-3" /> AS{threat.asn}</span>
                  <span className="flex items-center gap-1"><Globe className="w-3 h-3" /> {threat.country}</span>
                  <span className="text-[#00ff88]">Score: {threat.score}/100</span>
               </dd>
               
               <dd className="col-start-1 col-span-2 md:col-span-1 md:col-start-3 md:row-start-1 md:row-span-2 flex items-center justify-start md:justify-end mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-[#1a2332]">
                 <span className="font-mono text-[11px] text-[#e2e8f0] bg-[#1a2332] px-3 py-1 rounded-[4px] border border-[#1a2332]/50">
                   {threat.campaign}
                 </span>
               </dd>

               <dd className="col-start-3 md:col-start-4 md:row-start-1 md:row-span-2 flex items-center justify-end mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-[#1a2332]">
                 <span className="font-mono text-[10px] text-[#8a9bb0] text-right">
                   {threat.lastSeen}
                 </span>
               </dd>

               <dd className="hidden md:flex md:col-start-5 md:row-start-1 md:row-span-2 items-center justify-end pl-4">
                 <Link href={`/ip/${threat.ip}`} prefetch={false} className="p-2 hover:bg-[#ff3366]/10 rounded-full transition-colors text-[#94a3b8] hover:text-[#ff3366]">
                   <ArrowUpRight className="w-4 h-4" />
                   <span className="sr-only">View Intelligence for {threat.ip}</span>
                 </Link>
               </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
