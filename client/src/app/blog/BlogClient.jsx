'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/utils/sanity';
import { Search, Shield, Clock, Calendar, User, X, ChevronRight, BookOpen, ArrowRight } from 'lucide-react';

export default function BlogClient({ posts }) {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

  // Extract unique categories in uppercase
  const categories = useMemo(() => {
    const cats = new Set(['ALL']);
    posts.forEach(post => {
      if (post.categories?.[0]?.title) {
        cats.add(post.categories[0].title.toUpperCase());
      }
    });
    return Array.from(cats);
  }, [posts]);

  // Combined Search & Category filter
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesCategory = activeFilter === 'ALL' || post.categories?.[0]?.title?.toUpperCase() === activeFilter;
      
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query ||
        post.title?.toLowerCase().includes(query) ||
        post.excerpt?.toLowerCase().includes(query) ||
        post.categories?.[0]?.title?.toLowerCase().includes(query) ||
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(query))) ||
        (post.keywords && post.keywords.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [posts, activeFilter, searchQuery]);

  // Pagination logic
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = useMemo(() => {
    const lastIndex = currentPage * postsPerPage;
    const firstIndex = lastIndex - postsPerPage;
    return filteredPosts.slice(firstIndex, lastIndex);
  }, [filteredPosts, currentPage, postsPerPage]);

  const handleFilterChange = (cat) => {
    setActiveFilter(cat);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    const element = document.getElementById('articles-grid');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 800, behavior: 'smooth' });
    }
  };

  const featuredPost = posts[0];
  const trendingPosts = posts.slice(1, 5);

  const getInitials = (name) => {
    if (!name) return 'SR';
    const parts = name.split(' ');
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return parts[0][0].toUpperCase();
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric'
    }).format(date).toUpperCase();
  };

  const calculateReadTime = (post) => {
    if (post.estimatedWordCount) return Math.max(1, Math.ceil(post.estimatedWordCount / 5 / 200));
    return 6;
  };

  const getAuthorSlug = (post) => {
    return post.author?.slug?.current || post.author?.slug || 'surendra-reddy';
  };

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-12">
      {/* ================= FEATURED HERO SECTION ================= */}
      <div className="mb-20">
        <div className="flex items-center gap-4 mb-8">
          <span className="font-mono text-xs tracking-[3px] uppercase text-matrix-400">// HEADLINE BRIEFING</span>
          <div className="h-[1px] flex-1 bg-white/5" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Featured Card */}
          {featuredPost && (
            <div className="lg:col-span-2 group bg-surface-900 border border-white/5 hover:border-matrix-400/30 rounded-3xl overflow-hidden transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="relative aspect-[16/9] w-full bg-surface-950 overflow-hidden">
                  {featuredPost.mainImage ? (
                    <Image 
                      src={urlFor(featuredPost.mainImage).width(800).height(450).fit('crop').auto('format').url()} 
                      alt={featuredPost.title}
                      width={800}
                      height={450}
                      priority
                      sizes="(max-width: 1024px) 100vw, 800px"
                      className="object-cover w-full h-auto group-hover:scale-[1.01] transition-transform duration-700"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-matrix-900/10 via-surface-950 to-surface-900 flex items-center justify-center">
                      <Shield className="w-16 h-16 text-matrix-400/20" />
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-matrix-400/90 text-surface-950 text-[10px] font-mono font-bold uppercase tracking-wider rounded">
                      {featuredPost.categories?.[0]?.title || 'OSINT'}
                    </span>
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="text-xl md:text-3xl font-display font-bold text-white mb-4 leading-snug group-hover:text-matrix-400 transition-colors">
                    <Link href={`/blog/${featuredPost.slug?.current || featuredPost.slug}`} prefetch={false}>
                      {featuredPost.title}
                    </Link>
                  </h3>
                  <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-6">
                    {featuredPost.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-8 pb-8">
                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-surface-950 flex items-center justify-center font-mono text-[9px] text-[#00ff88] border border-white/5">
                      {getInitials(featuredPost.author?.name)}
                    </div>
                    <Link 
                      href={`/author/${getAuthorSlug(featuredPost)}`} 
                      prefetch={false}
                      className="text-xs font-mono text-gray-300 hover:text-[#00ff88] transition-colors"
                    >
                      {featuredPost.author?.name || 'Surendra Reddy'}
                    </Link>
                  </div>
                  
                  <div className="flex items-center gap-4 text-[10px] font-mono text-gray-500 uppercase">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {calculateReadTime(featuredPost)} MIN READ</span>
                    <span>{formatDate(featuredPost.publishedAt || featuredPost._createdAt)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Trending sidebar */}
          <div className="flex flex-col bg-surface-900 border border-white/5 rounded-3xl p-6">
            <div className="flex items-center gap-2 mb-6 pb-3 border-b border-white/5">
              <Shield className="w-4 h-4 text-matrix-400" />
              <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider">TRENDING BRIEFINGS</h4>
            </div>
            
            <div className="space-y-6 flex-1 flex flex-col justify-around">
              {trendingPosts.map((post, idx) => (
                <div key={post._id} className="group flex gap-4">
                  <span className="font-mono text-base font-bold text-matrix-400/40 group-hover:text-matrix-400">0{idx + 1}</span>
                  <div className="min-w-0">
                    <span className="block font-mono text-[8px] text-[#00ff88] uppercase tracking-widest mb-0.5">
                      {post.categories?.[0]?.title || 'OSINT'}
                    </span>
                    <h5 className="text-xs font-bold text-white group-hover:text-matrix-400 transition-colors line-clamp-2">
                      <Link href={`/blog/${post.slug?.current || post.slug}`} prefetch={false}>{post.title}</Link>
                    </h5>
                    <span className="block font-mono text-[8px] text-gray-500 mt-2 uppercase">
                      {formatDate(post.publishedAt || post._createdAt)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ================= ARCHIVES & SEARCH SECTION ================= */}
      <div className="mb-24" id="articles-grid">
        <div className="bg-surface-900 border border-white/5 rounded-3xl p-6 mb-12 shadow-xl">
          <div className="flex flex-col lg:flex-row gap-6 justify-between items-stretch lg:items-center">
            {/* Live Search Input */}
            <div className="relative flex items-center bg-[#05080f] border border-white/10 rounded-2xl px-4 py-1.5 flex-1 max-w-xl transition-all focus-within:border-matrix-400/50">
              <Search className="w-5 h-5 text-gray-500 shrink-0" />
              <input
                type="text"
                className="w-full bg-transparent py-2.5 pl-3 pr-8 text-white focus:outline-none font-mono text-sm placeholder:font-sans placeholder:text-gray-500"
                placeholder="Search threat intelligence, malware, OSINT..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 p-1 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Articles Found Counter */}
            <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest bg-surface-950 border border-white/5 px-4 py-2.5 rounded-2xl flex items-center gap-2 self-start lg:self-auto shrink-0">
              <BookOpen className="w-3.5 h-3.5 text-[#00ff88]" />
              <span>{filteredPosts.length} Articles Found</span>
            </div>
          </div>

          {/* Category Tabs below Search */}
          <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-white/5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleFilterChange(cat)}
                className={`px-3.5 py-2 font-mono text-[9px] tracking-[2px] uppercase border transition-all duration-200 rounded-xl ${
                  activeFilter === cat
                    ? 'bg-matrix-400/10 text-matrix-400 border-matrix-400/30 font-bold shadow-sm'
                    : 'bg-[#05080f] text-gray-500 border-white/5 hover:border-matrix-400/20 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Card Grid */}
        {currentPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentPosts.map((post) => {
              const authorSlug = getAuthorSlug(post);
              return (
                <div 
                  key={post._id} 
                  className="group flex flex-col justify-between bg-surface-900 border border-white/5 hover:border-matrix-400/30 transition-all duration-300 rounded-2xl overflow-hidden shadow-lg hover:-translate-y-0.5"
                >
                  <div>
                    {/* Cover Image */}
                    <div className="relative aspect-video w-full overflow-hidden bg-surface-950 border-b border-white/5">
                      {post.mainImage ? (
                        <Image 
                          src={urlFor(post.mainImage).width(360).height(202).fit('crop').auto('format').url()} 
                          alt={post.title}
                          width={360}
                          height={202}
                          sizes="(max-width: 768px) 100vw, 360px"
                          className="object-cover w-full h-auto group-hover:scale-[1.02] transition-transform duration-700"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-surface-950 to-surface-900 flex items-center justify-center">
                          <BookOpen className="w-10 h-10 text-matrix-400/10" />
                        </div>
                      )}
                      
                      <div className="absolute top-3 left-3">
                        <span className="px-2 py-0.5 bg-matrix-400 text-surface-950 text-[9px] font-mono font-bold uppercase tracking-wider rounded">
                          {post.categories?.[0]?.title || 'INTEL'}
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6">
                      <h4 className="text-sm font-bold text-white mb-2 leading-snug group-hover:text-matrix-400 transition-colors line-clamp-2">
                        <Link href={`/blog/${post.slug?.current || post.slug}`} prefetch={false}>{post.title}</Link>
                      </h4>
                      <p className="text-gray-400 text-xs leading-relaxed line-clamp-3 mb-6">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Metadata Row */}
                  <div className="px-6 pb-6 mt-auto">
                    <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                      {/* Author */}
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-surface-950 flex items-center justify-center font-mono text-[9px] text-[#00ff88] border border-white/5">
                          {getInitials(post.author?.name)}
                        </div>
                        <Link 
                          href={`/author/${authorSlug}`} 
                          prefetch={false}
                          className="text-[10px] font-mono text-gray-300 hover:text-[#00ff88] transition-colors"
                        >
                          {post.author?.name || 'Surendra Reddy'}
                        </Link>
                      </div>

                      {/* Read Time & Date */}
                      <div className="flex items-center gap-3 text-[9px] font-mono text-gray-500">
                        <span className="flex items-center gap-0.5"><Clock className="w-3 h-3" /> {calculateReadTime(post)}M</span>
                        <span>{formatDate(post.publishedAt || post._createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-20 text-center border border-white/5 rounded-3xl bg-surface-900 max-w-xl mx-auto shadow-xl">
            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-gray-500">
              <X className="w-6 h-6" />
            </div>
            <h3 className="text-white font-bold mb-2">No matching intelligence briefings</h3>
            <p className="text-gray-400 text-xs font-mono mb-6 px-6">
              We couldn't find any articles matching "{searchQuery}" under the category "{activeFilter}".
            </p>
            <button 
              onClick={() => { setSearchQuery(''); setActiveFilter('ALL'); }}
              className="px-5 py-2.5 bg-matrix-400/10 border border-matrix-400/20 text-matrix-400 text-xs font-mono font-bold rounded-xl hover:bg-matrix-400/20 transition-all uppercase tracking-widest"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-16 flex items-center justify-center gap-3">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2.5 font-mono text-[9px] tracking-[2px] uppercase border transition-all rounded-xl ${
                currentPage === 1
                  ? 'text-gray-700 border-gray-800 cursor-not-allowed opacity-40'
                  : 'text-gray-400 border-white/5 bg-surface-900 hover:text-white hover:border-matrix-400/30'
              }`}
            >
              PREV
            </button>
            
            <div className="flex items-center gap-1.5">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-9 h-9 font-mono text-[10px] border transition-all rounded-xl ${
                    currentPage === page
                      ? 'bg-matrix-400/10 text-matrix-400 border-matrix-400/30 font-bold'
                      : 'bg-surface-900 text-gray-500 border-white/5 hover:text-white hover:border-matrix-400/20'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2.5 font-mono text-[9px] tracking-[2px] uppercase border transition-all rounded-xl ${
                currentPage === totalPages
                  ? 'text-gray-700 border-gray-800 cursor-not-allowed opacity-40'
                  : 'text-gray-400 border-white/5 bg-surface-900 hover:text-white hover:border-matrix-400/30'
              }`}
            >
              NEXT
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
