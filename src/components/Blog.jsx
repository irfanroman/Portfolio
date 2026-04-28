import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, ArrowUpRight, Clock, CalendarDays, ExternalLink, Loader2, ArrowRight } from "lucide-react";
import { cn } from "../lib/utils";

// Helper to strip HTML from Medium description
const stripHtml = (html) => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || "";
};

// Calculate estimated read time based on word count
const getReadTime = (text) => {
  const wordsPerMinute = 200;
  const words = text.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
};

// Format Date
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

// --- BLOG DETAIL VIEW ---
const BlogDetail = ({ post, onClose }) => {
  // Extract images
  let imageUrl = post.thumbnail;
  if (!imageUrl && post.description) {
    const imgMatch = post.description.match(/<img[^>]+src="([^">]+)"/);
    if (imgMatch) imageUrl = imgMatch[1];
  }
  if (!imageUrl || imageUrl.includes('stat?event')) {
    imageUrl = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000";
  }

  // Extract first 2 paragraphs
  const paragraphs = useMemo(() => {
    const doc = new DOMParser().parseFromString(post.description, 'text/html');
    return Array.from(doc.querySelectorAll('p'))
      .map(p => p.textContent.trim())
      .filter(text => text.length > 30)
      .slice(0, 2);
  }, [post.description]);
  
  const fullText = stripHtml(post.description);
  
  const displaySummary = paragraphs.length > 0 
    ? paragraphs.join("\n\n") 
    : fullText.substring(0, 450) + "...";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
    >
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl"
      />

      {/* Modal Content */}
      <motion.div
        layoutId={`card-${post.link}`}
        className="relative w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] md:max-h-[80vh] border border-white/20"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-50 p-2 bg-slate-900/10 hover:bg-slate-900/20 rounded-full transition-colors backdrop-blur-md"
        >
          <X className="w-5 h-5 text-slate-800" />
        </button>

        {/* Hero Image */}
        <div className="w-full md:w-1/2 h-64 md:h-auto relative shrink-0 overflow-hidden">
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            src={imageUrl} 
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent md:hidden" />
        </div>

        {/* Copy */}
        <div className="flex-1 p-8 md:p-12 overflow-y-auto custom-scrollbar">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-600 bg-cyan-50 px-3 py-1 rounded-full">{post.categories?.[0] || "Article"}</span>
            <span className="w-1 h-1 rounded-full bg-slate-200"></span>
            <span className="text-xs font-medium text-slate-400">{formatDate(post.pubDate)}</span>
          </div>

          <h2 className="text-2xl md:text-4xl font-display font-bold text-slate-900 leading-tight mb-8">
            {post.title}
          </h2>

          <div className="space-y-6 mb-10">
            {paragraphs.length > 0 ? (
              paragraphs.map((para, idx) => (
                <p key={idx} className="text-slate-600 text-base md:text-lg leading-relaxed">
                  {para}
                </p>
              ))
            ) : (
              <p className="text-slate-600 text-base md:text-lg leading-relaxed">
                {displaySummary}
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-6 border-t border-slate-100">
            <a 
              href={post.link}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-3 bg-cyan-600 text-white px-10 py-5 rounded-2xl font-bold text-sm tracking-widest hover:bg-cyan-700 hover:shadow-xl hover:shadow-cyan-200/50 transition-all group"
            >
              Read more on Medium
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const BlogCard = ({ post, isFeatured, onClick }) => {
  // Extract first image from content if thumbnail is empty or missing
  let imageUrl = post.thumbnail;
  if (!imageUrl && post.description) {
    const imgMatch = post.description.match(/<img[^>]+src="([^">]+)"/);
    if (imgMatch) imageUrl = imgMatch[1];
  }
  // Fallback abstract pattern
  if (!imageUrl || imageUrl.includes('stat?event')) {
    imageUrl = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000";
  }

  const cleanExcerpt = stripHtml(post.description).substring(0, isFeatured ? 250 : 120) + "...";

  return (
    <motion.div
      layoutId={`card-${post.link}`}
      onClick={onClick}
      aria-label={`Read article: ${post.title}`}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className={cn(
        "group relative overflow-hidden rounded-[2rem] border border-slate-100 flex shadow-xl hover:shadow-cyan-100/40 hover:border-cyan-200/50 bg-white glass-premium cursor-pointer",
        isFeatured ? "flex-col md:flex-row md:col-span-2 min-h-[400px]" : "flex-col col-span-1 min-h-[380px]"
      )}
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500" />

      {/* Image Preview */}
      <div 
        className={cn(
          "relative overflow-hidden shrink-0",
          isFeatured ? "w-full md:w-[45%] h-64 md:h-full" : "w-full aspect-[16/10]"
        )}
      >
        <img 
          src={imageUrl}
          alt={post.title} 
          className="object-cover w-full h-full transform group-hover:scale-105 transition-all duration-1000"
        />
        <div className="absolute inset-0 bg-slate-900/5 group-hover:bg-slate-900/0" />
        {isFeatured && (
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-cyan-600 shadow-sm border border-white/20">
            Featured Article
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-6 lg:p-8">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium">
             <CalendarDays className="w-3.5 h-3.5" />
             <span>{formatDate(post.pubDate)}</span>
          </div>
          <span className="w-1 h-1 rounded-full bg-slate-200"></span>
          <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium">
             <Clock className="w-3.5 h-3.5" />
             <span>{getReadTime(stripHtml(post.description))}</span>
          </div>
        </div>

        <h3 className={cn(
           "font-display font-bold text-slate-900 leading-tight mb-3 group-hover:text-cyan-600 transition-colors",
           isFeatured ? "text-2xl lg:text-3xl" : "text-xl"
        )}>
          {post.title}
        </h3>
        
        <p className="text-[14px] text-slate-500 font-medium leading-relaxed mb-6 flex-grow">
          {cleanExcerpt}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
          <div className="flex flex-wrap gap-2">
            {post.categories?.slice(0, 2).map((category, idx) => (
              <span key={idx} className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-400 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100">
                {category}
              </span>
            ))}
          </div>
          <div className="p-2 bg-slate-50 rounded-full group-hover:bg-cyan-500 group-hover:text-white transition-all text-slate-400">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedPost, setSelectedPost] = useState(null);
  
  useEffect(() => {
    const fetchMediumPosts = async () => {
      try {
        const res = await fetch("https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@pann.tech");
        const data = await res.json();
        if (data.status === "ok") {
          let fetchedPosts = data.items.map(post => {
            if (post.categories) {
              post.categories = post.categories.filter(c => c.toLowerCase() !== "uxdesing");
            }
            return post;
          });
          
          // Logic to pin a specific article to the front
          const pinnedKeyword = "Usability Heuristics"; // You can change this to any word in your pinned article's title
          const pinnedIndex = fetchedPosts.findIndex(p => p.title.includes(pinnedKeyword));
          
          if (pinnedIndex > -1) {
             const [pinnedPost] = fetchedPosts.splice(pinnedIndex, 1);
             // Add a custom property so the UI knows it's manually pinned
             pinnedPost.isPinned = true;
             fetchedPosts.unshift(pinnedPost);
          }
          
          // Limit to maximum 5 articles
          setPosts(fetchedPosts.slice(0, 5));
        }
      } catch (error) {
        console.error("Failed to fetch Medium posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMediumPosts();
  }, []);

  // Extract unique categories directly from medium posts
  const categories = useMemo(() => {
    const cats = new Set(["All"]);
    posts.forEach(post => {
      if (post.categories) {
        post.categories.forEach(c => cats.add(c.toLowerCase()));
      }
    });
    return Array.from(cats).slice(0, 6); // Limit to top categories for UI cleanliness
  }, [posts]);

  // Filter logic
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        stripHtml(post.description).toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = activeCategory === "All" || (post.categories && post.categories.some(c => c.toLowerCase() === activeCategory));
      
      return matchesSearch && matchesCategory;
    });
  }, [posts, searchQuery, activeCategory]);

  return (
    <section aria-label="Blog articles" id="blog" className="py-32 bg-slate-50/50">
      <div className="container mx-auto px-6">
        
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20 relative">
          {/* Editorial Section Label */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="absolute -top-12 left-0"
          >
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-[0.4em]">Section / 05</span>
          </motion.div>

          <div className="max-w-2xl">
            
            <h2 className="text-5xl md:text-6xl font-editorial italic text-slate-900 leading-[0.9] mb-8 tracking-tighter">
              Exploring <span className="text-cyan-600">Ideas</span> & <br />
              <span className="relative">
                Digital Stories
                <motion.svg 
                  className="absolute -bottom-2 left-0 w-full h-2 text-cyan-200/50" 
                  viewBox="0 0 100 10" 
                  preserveAspectRatio="none"
                >
                  <motion.path 
                    d="M0,5 Q25,0 50,5 T100,5" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                  />
                </motion.svg>
              </span>
            </h2>
          </div>

          <div className="hidden lg:flex flex-col items-end gap-2 text-right">
             <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Writings</span>
             <span className="text-xs font-black text-slate-900 uppercase">Direct from Medium</span>
          </div>
        </div>

        {/* Toolbar: Search and Filter */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-8 mb-16">
          
          {/* Categories */}
          <div role="group" aria-label="Filter by category" className="flex items-center gap-2 overflow-x-auto pb-4 lg:pb-0 hide-scrollbar flex-nowrap -mx-6 px-6 lg:mx-0 lg:px-0">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-5 py-2.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap shadow-sm",
                  activeCategory === cat 
                    ? "bg-slate-900 text-white shadow-cyan-200/50" 
                    : "bg-white text-slate-500 border border-slate-200 hover:border-cyan-200 hover:text-cyan-600 hover:bg-cyan-50"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative group w-full lg:w-[320px]">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-cyan-500 transition-colors">
              <Search className="h-4 w-4" />
            </div>
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search articles"
              className="block w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4 text-cyan-600">
             <div className="animate-spin relative flex h-10 w-10">
                <Loader2 className="w-10 h-10 text-cyan-500 absolute" />
             </div>
             <p className="text-sm font-bold tracking-widest uppercase">Fetching Medium...</p>
          </div>
        ) : (
          /* Asymmetrical Post Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post, i) => (
                  <BlogCard 
                    key={post.link} 
                    post={post} 
                    isFeatured={activeCategory === "All" && searchQuery === "" && i === 0} 
                    onClick={() => setSelectedPost(post)}
                  />
                ))
              ) : (
                <motion.div 
                  key="no-results"
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                  className="col-span-full py-20 text-center text-slate-500"
                >
                  <p className="text-lg">No articles found matching your criteria.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Article Preview Modal */}
        <AnimatePresence>
          {selectedPost && (
            <BlogDetail 
              post={selectedPost} 
              onClose={() => setSelectedPost(null)} 
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Blog;
