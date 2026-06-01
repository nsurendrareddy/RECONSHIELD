import { client, authorDetailQuery, authorPostsQuery, urlFor } from '@/utils/sanity';
import { Shield, Globe, ExternalLink, Clock, ArrowLeft, BookOpen, User, Mail, Award, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import { generateBaseMetadata } from '@/utils/metadata';

export const revalidate = 60; // Revalidate every minute

export async function generateMetadata({ params }) {
  const { slug } = await params;
  let author = null;
  try {
    author = await client.fetch(authorDetailQuery, { slug });
  } catch (e) {
    console.error('Error fetching author metadata', e);
  }

  const name = author?.name || "Surendra Reddy";

  return generateBaseMetadata({
    title: `About ${name} | Cybersecurity Research & Editorial`,
    description: `${name} is an expert contributor and security analyst at ReconShield. Explore detailed threat intelligence reports and security tutorials authored by ${name}.`,
    path: `/author/${slug}`
  });
}

export default async function AuthorProfilePage({ params }) {
  const { slug } = await params;
  let author = null;
  let posts = [];

  try {
    [author, posts] = await Promise.all([
      client.fetch(authorDetailQuery, { slug }),
      client.fetch(authorPostsQuery, { slug })
    ]);
  } catch (error) {
    console.error('Error fetching author data:', error);
  }

  // Fallback for primary author if Sanity is empty/offline
  const isPrimary = slug === 'surendra-reddy' || !author;
  const authorName = author?.name || "Surendra Reddy";
  const authorBio = author?.bio || null;
  const authorImage = author?.image || null;

  const initials = authorName.split(' ').map(n => n[0]).join('').toUpperCase();

  const socialLinks = {
    linkedin: "https://linkedin.com/in/surendrareddy3",
    github: "https://github.com/nsurendrareddy",
    email: "contact@reconshield.in"
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `https://reconshield.in/author/${slug}`,
        "url": `https://reconshield.in/author/${slug}`,
        "name": `About ${authorName} | ReconShield`,
        "mainEntity": {
          "@type": "Person",
          "@id": `https://reconshield.in/author/${slug}#person`,
          "name": authorName,
          "url": `https://reconshield.in/author/${slug}`,
          "jobTitle": isPrimary ? "Founder & Lead Cybersecurity Researcher" : "Cybersecurity Contributor",
          "description": "Cybersecurity researcher specializing in passive OSINT, exposure management, and threat intelligence. Contributor at ReconShield.",
          "image": authorImage ? urlFor(authorImage).url() : "https://reconshield.in/og-image.png",
          "sameAs": [
            socialLinks.linkedin,
            socialLinks.github
          ],
          "worksFor": {
            "@type": "Organization",
            "name": "ReconShield",
            "url": "https://reconshield.in"
          }
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://reconshield.in" },
          { "@type": "ListItem", "position": 2, "name": "Editorial Archives", "item": "https://reconshield.in/blog" },
          { "@type": "ListItem", "position": 3, "name": authorName, "item": `https://reconshield.in/author/${slug}` }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-[#05080f] min-h-screen text-white pb-24">
        {/* Navigation Breadcrumb */}
        <div className="max-w-[1200px] mx-auto px-6 pt-24 pb-6">
          <div className="font-mono text-[10px] text-gray-500 uppercase tracking-[2px] mb-8 flex items-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">HOME</Link>
            <span>›</span>
            <Link href="/blog" className="hover:text-white transition-colors">EDITORIAL ARCHIVES</Link>
            <span>›</span>
            <span className="text-[#00ff88]">{authorName.toUpperCase()}</span>
          </div>
          
          <Link href="/blog" className="inline-flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-[#00ff88] transition-colors mb-12">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Archives
          </Link>
        </div>

        {/* Profile Card Header */}
        <section className="max-w-[1200px] mx-auto px-6 mb-16">
          <div className="bg-gradient-to-br from-[#0d1117] to-surface-900 border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
              <User className="w-64 h-64 text-[#00ff88]" />
            </div>

            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start relative z-10">
              {/* Profile Image */}
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl overflow-hidden border border-white/10 bg-surface-950 flex items-center justify-center shrink-0">
                {authorImage ? (
                  <Image 
                    src={urlFor(authorImage).width(160).height(160).fit('crop').auto('format').url()}
                    alt={authorName}
                    width={160}
                    height={160}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <span className="text-4xl font-mono font-bold text-[#00ff88]">{initials}</span>
                )}
              </div>

              {/* Bio & Details */}
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00ff88]/10 border border-[#00ff88]/20 text-[#00ff88] text-[10px] font-mono uppercase tracking-widest mb-4">
                  <Shield className="w-3.5 h-3.5" />
                  <span>{isPrimary ? "Verified Lead Researcher" : "Verified Security Analyst"}</span>
                </div>

                <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-2 leading-none">{authorName}</h1>
                <p className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-6">
                  {isPrimary ? "Founder & Lead Editor, ReconShield" : "Cybersecurity Contributor"}
                </p>

                <div className="text-gray-400 text-sm md:text-base leading-relaxed mb-8 max-w-3xl">
                  {authorBio ? (
                    <PortableText value={authorBio} />
                  ) : (
                    <div className="space-y-4 text-[13px] md:text-[14px]">
                      <p>
                        Surendra Reddy is a cybersecurity engineer, OSINT analyst, and founder of ReconShield, focusing on offensive exposure intelligence and passive infrastructure visibility. He designed ReconShield as an open-access platform to help developers, system administrators, and security researchers easily map their internet-facing assets.
                      </p>
                      <p>
                        His educational writing focuses on configuration risk mitigation, DNS hygiene, TLS auditing, and deploying defensive artificial intelligence solutions. Surendra is passionate about ethical disclosures, network protection boundaries, and bridging the gap between raw technical telemetry and actionable operations.
                      </p>
                    </div>
                  )}
                </div>

                {/* Social Connections */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-mono">
                  <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-surface-950 border border-white/5 hover:border-[#00ff88]/30 hover:text-[#00ff88] transition-all">
                    <Globe className="w-4 h-4" /> LinkedIn Profile <ExternalLink className="w-3 h-3 text-gray-600" />
                  </a>
                  <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-surface-950 border border-white/5 hover:border-[#00ff88]/30 hover:text-[#00ff88] transition-all">
                    <Award className="w-4 h-4" /> GitHub Repos <ExternalLink className="w-3 h-3 text-gray-600" />
                  </a>
                  <a href={`mailto:${socialLinks.email}`} className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-surface-950 border border-white/5 hover:border-[#00ff88]/30 hover:text-[#00ff88] transition-all">
                    <Mail className="w-4 h-4" /> Editorial Contact
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* E-E-A-T Verification / Expertise Signals */}
        <section className="max-w-[1200px] mx-auto px-6 mb-20 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-surface-900 border border-white/5 rounded-2xl p-6">
            <h3 className="text-white font-mono text-[11px] uppercase tracking-[3px] text-gray-400 mb-4 flex items-center gap-2">
              <span className="w-1 h-3.5 bg-[#00ff88] rounded" /> Areas of Expertise
            </h3>
            <ul className="space-y-3 font-mono text-xs text-gray-400">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#00ff88] shrink-0" /> Open Source Intelligence (OSINT)</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#00ff88] shrink-0" /> Internet Infrastructure & DNS Security</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#00ff88] shrink-0" /> Cryptographic Configuration Standards (SSL/TLS)</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#00ff88] shrink-0" /> Exposure Management & Asset Visibility</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#00ff88] shrink-0" /> AI-Driven Cyber Threat Triage</li>
            </ul>
          </div>

          <div className="bg-surface-900 border border-white/5 rounded-2xl p-6">
            <h3 className="text-white font-mono text-[11px] uppercase tracking-[3px] text-gray-400 mb-4 flex items-center gap-2">
              <span className="w-1 h-3.5 bg-[#00ff88] rounded" /> Editorial Bio & Compliance
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              All intelligence reports, CVE writeups, and security guidelines authored by {authorName} undergo strict editorial reviews in accordance with our <Link href="/editorial-policy" className="text-[#00ff88] underline hover:text-white transition-colors">Editorial Policy</Link>. 
            </p>
            <p className="text-xs text-gray-400 leading-relaxed">
              We strictly publish facts verified under lab conditions, and we enforce a mandatory defensive posture framework. ReconShield opposes malicious use and adheres to responsible vulnerability reporting guidelines.
            </p>
          </div>
        </section>

        {/* Author's Publications / Articles */}
        <section className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-2xl font-display font-bold text-white flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-[#00ff88]" /> Publications & Reports
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-[#00ff88]/20 to-transparent" />
          </div>

          {posts && posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => {
                const readTime = post.estimatedWordCount ? Math.max(1, Math.ceil(post.estimatedWordCount / 5 / 200)) : 1;
                return (
                  <Link href={`/blog/${post.slug}`} key={post._id} className="group flex flex-col bg-[#0d1117] border border-[#1a2332] hover:border-[#00ff8833] transition-all duration-300 rounded-2xl overflow-hidden">
                    <div className="relative aspect-video w-full overflow-hidden border-b border-[#1a2332]">
                      {post.mainImage && (
                        <Image 
                          src={urlFor(post.mainImage).width(361).height(203).fit('crop').auto('format').url()} 
                          alt={post.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 361px"
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      )}
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <span className="font-mono text-[9px] tracking-[2px] uppercase text-[#00ff88] mb-3">
                        {post.categories?.[0]?.title || 'OSINT'}
                      </span>
                      <h3 className="text-base font-bold mb-3 leading-snug group-hover:text-[#00ff88] transition-colors text-white">
                        {post.title}
                      </h3>
                      <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 mb-6">
                        {post.excerpt}
                      </p>
                      <div className="mt-auto flex items-center justify-between pt-4 border-t border-[#1a2332] font-mono text-[9px] text-gray-500">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3"/> {readTime} MIN READ</span>
                        <span>{new Date(post.publishedAt || post._createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 bg-surface-900/40 border border-white/5 rounded-3xl">
              <User className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">No publications found</h3>
              <p className="text-gray-400 text-sm max-w-sm mx-auto">This contributor has not published any threat intelligence briefings yet. Check back soon.</p>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
