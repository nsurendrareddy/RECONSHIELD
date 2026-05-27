import Link from 'next/link';
import { Mail, Shield, AlertTriangle, Cpu, Bug, Activity, Rss } from 'lucide-react';
import { client, homepageBlogQuery } from '@/utils/sanity';
import NewsletterForm from '@/components/NewsletterForm';

import { generateBaseMetadata } from '@/utils/metadata';

export const metadata = generateBaseMetadata({
  title: "Weekly Threat Briefing Newsletter",
  description: "Subscribe to the ReconShield Intelligence Newsletter for weekly threat intelligence, CVE alerts, AI security updates, and malware trends.",
  path: "/newsletter"
});

export default async function NewsletterPage() {
  const recentPosts = await client.fetch(homepageBlogQuery);

  return (
    <div className="bg-[#0a0c0f] min-h-screen text-white font-sans selection:bg-[#00ff8833] selection:text-[#00ff88] py-20 px-4 md:px-8">
      <div className="max-w-[1440px] mx-auto space-y-24">
        
        {/* Header Section */}
        <section className="text-center space-y-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00ff8811] border border-[#00ff8844] rounded-full text-[#00ff88] text-[10px] uppercase tracking-[2px] font-mono mb-4">
            <Mail className="w-3 h-3" /> INTEL DIGEST
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Threat Intelligence,<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff88] to-[#378add]">Delivered Weekly</span>.
          </h1>
          <p className="text-[#94a3b8] text-lg lg:text-xl font-light">
            Stay ahead of threat actors with our curated weekly digest. Critical CVEs, defensive AI capabilities, malware trends, and actionable intelligence straight to your inbox.
          </p>
          <div className="pt-4 flex justify-center gap-4">
            <Link href="/rss.xml" className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors font-mono text-[11px] uppercase tracking-wider">
              <Rss className="w-4 h-4" /> RSS Feed
            </Link>
          </div>
        </section>

        {/* CTA Form */}
        <section className="max-w-xl mx-auto bg-[#0d1117] border border-[#1a2332] p-8 rounded-2xl relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#00ff88] opacity-[0.03] blur-[100px] rounded-full pointer-events-none" />
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-[#e2e8f0]">
            Join the Briefing
          </h2>
          <NewsletterForm />
        </section>

        {/* Weekly Topics */}
        <section className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="font-mono text-[12px] tracking-[3px] uppercase text-[#00ff88] font-bold">// WEEKLY TOPICS</h2>
            <div className="h-[1px] flex-1 bg-[#1a2332]" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TopicCard 
              icon={<Shield className="w-5 h-5 text-[#00ff88]" />} 
              title="Threat Intelligence" 
              desc="Deep dives into emerging APT groups, novel configuration risks, and geopolitical cyber activity." 
            />
            <TopicCard 
              icon={<AlertTriangle className="w-5 h-5 text-yellow-500" />} 
              title="CVEs & Patch Alerts" 
              desc="Critical vulnerability disclosures, configuration abuse in the wild, and immediate mitigation steps." 
            />
            <TopicCard 
              icon={<Cpu className="w-5 h-5 text-blue-400" />} 
              title="AI Security" 
              desc="defensive AI capabilities, prompt injection techniques, and LLM vulnerability research." 
            />
            <TopicCard 
              icon={<Bug className="w-5 h-5 text-red-400" />} 
              title="Malware Trends" 
              desc="Analysis of new ransomware strains, infostealers, and evolving persistence mechanisms." 
            />
            <TopicCard 
              icon={<Activity className="w-5 h-5 text-purple-400" />} 
              title="OSINT Techniques" 
              desc="New open-source intelligence gathering methods, tools, and methodologies." 
            />
          </div>
        </section>

        {/* Archive Previews */}
        <section className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="font-mono text-[12px] tracking-[3px] uppercase text-[#00ff88] font-bold">// FROM THE ARCHIVES</h2>
            <div className="h-[1px] flex-1 bg-[#1a2332]" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentPosts.map((p) => (
               <Link href={`/blog/${p.slug}`} key={p._id} className="group block bg-[#0d1117] border border-[#1a2332] p-6 rounded-xl hover:border-[#00ff8833] transition-all">
                  <span className="font-mono text-[9px] tracking-[2px] uppercase text-gray-500 group-hover:text-[#00ff88] transition-colors mb-3 block">
                    {p.categories?.[0]?.title || 'ARCHIVE'}
                  </span>
                  <h3 className="text-[15px] font-semibold mb-3 leading-tight text-[#e2e8f0] group-hover:text-white transition-colors line-clamp-2">
                    {p.title}
                  </h3>
                  <p className="text-[#94a3b8] text-[13px] leading-relaxed line-clamp-3">
                    {p.excerpt}
                  </p>
               </Link>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link href="/blog" className="inline-flex items-center justify-center px-6 py-3 border border-[#1a2332] rounded-lg text-sm font-mono text-gray-300 hover:text-[#00ff88] hover:border-[#00ff8844] hover:bg-[#00ff8805] transition-all">
              BROWSE ALL INTELLIGENCE
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}

function TopicCard({ icon, title, desc }) {
  return (
    <div className="bg-[#0d1117] border border-[#1a2332] p-6 rounded-xl hover:border-[#00ff8833] hover:bg-[#11161d] transition-all group">
      <div className="w-10 h-10 rounded-lg bg-[#1a2332] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-[15px] font-semibold text-white mb-2">{title}</h3>
      <p className="text-[13px] text-[#94a3b8] leading-relaxed">{desc}</p>
    </div>
  );
}
