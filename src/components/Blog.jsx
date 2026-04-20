import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowUpRight, Clock, CalendarDays, ExternalLink, Loader2 } from "lucide-react";
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

const BlogCard = ({ post, isFeatured }) => {
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
    <motion.a
      layout
      href={post.link}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      whileHover={{ y: -8 }}
      transition={{ 
        layout: { type: "spring", stiffness: 250, damping: 30 },
        opacity: { duration: 0.2 }
      }}
      className={cn(
        "group relative overflow-hidden rounded-[2rem] border border-slate-100 flex shadow-xl hover:shadow-cyan-100/40 hover:border-cyan-200/50 bg-white glass-premium",
        isFeatured ? "flex-col md:flex-row md:col-span-2 min-h-[400px]" : "flex-col col-span-1 min-h-[380px]"
      )}
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500" />

      {/* Image Preview */}
      <motion.div 
        layout
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
      </motion.div>

      {/* Content */}
      <motion.div layout className="flex flex-col flex-grow p-6 lg:p-8">
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
            <ExternalLink className="w-4 h-4" />
          </div>
        </div>
      </motion.div>
    </motion.a>
  );
};

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  
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
    <section id="blog" className="py-32 bg-slate-50/50">
      <div className="container mx-auto px-6">
        
        {/* Header Area */}
        <div className="max-w-3xl mb-16">
          <span className="text-cyan-600 font-bold tracking-[0.2em] text-xs uppercase mb-4 block flex items-center gap-2">
            Thoughts & Writings
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6 w-full leading-[1.1]">
            Exploring ideas in <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-emerald-500">design and engineering.</span>
          </h2>
          <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-2xl">
            A collection of my thoughts, tutorials, and deep-dives into UX strategies, modern frameworks, and building scalable systems. Direct from Medium.
          </p>
        </div>

        {/* Toolbar: Search and Filter */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-8 mb-16">
          
          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 lg:pb-0 hide-scrollbar flex-nowrap -mx-6 px-6 lg:mx-0 lg:px-0">
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
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post, i) => (
                  <BlogCard 
                    key={post.link} 
                    post={post} 
                    isFeatured={activeCategory === "All" && searchQuery === "" && i === 0} 
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
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Blog;
