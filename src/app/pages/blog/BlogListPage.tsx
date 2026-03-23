import { useState, useEffect } from "react";
import { Link } from "react-router";
import { ArrowRight, Search, Clock, Sparkles, TrendingUp, Loader2 } from "lucide-react";
import { blogPosts as mockBlogPosts, BlogPost } from "../../data/mockData";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";

const SERIF = { fontFamily: "'Playfair Display', serif" };
const CATEGORIES = ["All", "Skincare", "Massage", "Wellness", "Lifestyle", "Body Treatments"];

export function BlogListPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const ITEMS_PER_PAGE = 4;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/posts");
        if (!response.ok) throw new Error("Failed to fetch posts");
        const data = await response.json();
        setBlogPosts(data.length > 0 ? data : mockBlogPosts);
        setError(null);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Could not load latest articles.");
        setBlogPosts(mockBlogPosts);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const filtered = blogPosts.filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = blogPosts.find((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured || activeCategory !== "All" || search);
  const paginated = rest.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
  const totalPages = Math.ceil(rest.length / ITEMS_PER_PAGE);

  const tags = ["Anti-Aging", "Skincare", "Relaxation", "Wellness", "Self-Care", "Hydration", "Massage", "Detox", "Aromatherapy", "Lifestyle"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFD6BE]/10 via-white to-[#FEAEA7]/10 pt-24">
      {/* Header */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFC5C1]/20 border border-[#FEAEA7]/50 text-[#FF9689] text-sm mb-6">
              <Sparkles className="w-3.5 h-3.5" /> Wellness Journal
            </div>
            <h1 style={SERIF} className="text-5xl lg:text-6xl font-semibold text-gray-900">
              Beauty &{" "}
              <span className="bg-gradient-to-r from-[#FF9689] to-[#FFC6A4] bg-clip-text text-transparent">
                Wellness
              </span>{" "}
              Insights
            </h1>
          </div>
          <div className="relative max-w-xs w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search articles..."
              className="w-full bg-white border border-[#FEAEA7] rounded-full pl-11 pr-5 py-3 text-gray-700 text-sm placeholder-gray-400 focus:outline-none focus:border-[#FF9689] focus:ring-2 focus:ring-[#FF9689]/20 transition-all"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-3 overflow-x-auto pb-2 mb-12 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setPage(1); }}
              className={`shrink-0 px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-[#FF9689] to-[#FFC6A4] text-white shadow-md shadow-[#FF9689]/20"
                  : "bg-white border border-[#FFC5C1]/50 text-gray-600 hover:border-[#FF9689] hover:text-[#FF9689]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 animate-in fade-in duration-700">
            <Loader2 className="w-10 h-10 text-[#FF9689] animate-spin mb-4" />
            <p className="text-gray-400 font-medium italic">Gathering wellness insights...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-[#FFC5C1]/30">
            <p className="text-[#FF9689] font-medium mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-8 py-2.5 bg-gradient-to-r from-[#FF9689] to-[#FFC6A4] text-white rounded-full hover:opacity-90 transition-opacity shadow-sm shadow-[#FF9689]/20"
            >
              Reload Feed
            </button>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Featured Post */}
            {featured && activeCategory === "All" && !search && (
              <Link to={`/blog/${featured.slug}`} className="group block mb-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-[#FFC5C1]/50 bg-white hover:border-[#FF9689]/60 hover:shadow-xl hover:shadow-[#FEAEA7]/30 transition-all duration-500">
                  <div className="aspect-video lg:aspect-auto relative overflow-hidden">
                    <ImageWithFallback
                      src={featured.image}
                      alt={featured.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 min-h-64"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#FF9689] to-[#FFC6A4] text-white text-xs font-medium shadow-sm shadow-[#FF9689]/30">
                        <TrendingUp className="w-3 h-3" /> Featured
                      </span>
                    </div>
                  </div>
                  <div className="p-10 lg:p-12 flex flex-col justify-center">
                    <span className="text-[#FF9689] text-xs uppercase tracking-wider mb-4 font-semibold">{featured.category}</span>
                    <h2 style={SERIF} className="text-gray-900 text-3xl lg:text-4xl font-semibold mb-4 leading-snug group-hover:text-[#FF9689] transition-colors">
                      {featured.title}
                    </h2>
                    <p className="text-gray-500 leading-relaxed mb-6 text-base">{featured.excerpt}</p>
                    <div className="flex items-center gap-4 mb-8">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF9689] to-[#FFC6A4] flex items-center justify-center text-white text-xs font-semibold">
                          {featured.author.initials}
                        </div>
                        <span className="text-gray-600 text-sm font-medium">{featured.author.name}</span>
                      </div>
                      <span className="text-gray-300">·</span>
                      <span className="text-gray-500 text-sm">{featured.date}</span>
                      <span className="text-gray-300">·</span>
                      <div className="flex items-center gap-1 text-gray-500 text-sm">
                        <Clock className="w-3.5 h-3.5" /> {featured.readTime}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-[#FF9689] font-medium group-hover:gap-3 transition-all">
                      Read Article <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* Blog Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Posts */}
              <div className="lg:col-span-2 space-y-8">
                {paginated.map((post) => (
                  <Link key={post.id} to={`/blog/${post.slug}`} className="group flex flex-col sm:flex-row gap-6 p-6 rounded-2xl bg-white border border-[#FFC5C1]/50 hover:border-[#FF9689]/60 hover:shadow-lg hover:shadow-[#FEAEA7]/20 transition-all duration-300">
                    <div className="w-full sm:w-48 h-48 sm:h-36 rounded-xl overflow-hidden shrink-0">
                      <ImageWithFallback
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2.5 py-1 rounded-full bg-[#FFC5C1]/20 text-[#FF9689] text-xs font-medium">{post.category}</span>
                        <span className="text-gray-400 text-xs flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {post.readTime}
                        </span>
                      </div>
                      <h3 style={SERIF} className="text-gray-900 font-semibold text-xl mb-2 group-hover:text-[#FF9689] transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-500 text-sm line-clamp-2 mb-4 leading-relaxed">{post.excerpt}</p>
                      <div className="flex items-center gap-2 text-gray-500 text-xs">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#FF9689] to-[#FFC6A4] flex items-center justify-center text-white text-[10px] font-semibold">
                          {post.author.initials}
                        </div>
                        <span className="font-medium">{post.author.name}</span> <span className="text-gray-300">·</span> {post.date}
                      </div>
                    </div>
                  </Link>
                ))}

                {paginated.length === 0 && (
                  <div className="text-center py-16 bg-white rounded-2xl border border-[#FFC5C1]/30">
                    <p className="text-gray-500">No articles found. Try a different search or category.</p>
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 pt-8">
                    <button
                      onClick={() => setPage(Math.max(1, page - 1))}
                      disabled={page === 1}
                      className="px-4 py-2 rounded-full bg-white border border-[#FFC5C1]/50 text-gray-600 hover:border-[#FF9689] hover:text-[#FF9689] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      ←
                    </button>
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setPage(i + 1)}
                        className={`w-10 h-10 rounded-full text-sm font-medium transition-all ${
                          page === i + 1
                            ? "bg-gradient-to-r from-[#FF9689] to-[#FFC6A4] text-white shadow-md shadow-[#FF9689]/20"
                            : "bg-white border border-[#FFC5C1]/50 text-gray-600 hover:border-[#FF9689] hover:text-[#FF9689]"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => setPage(Math.min(totalPages, page + 1))}
                      disabled={page === totalPages}
                      className="px-4 py-2 rounded-full bg-white border border-[#FFC5C1]/50 text-gray-600 hover:border-[#FF9689] hover:text-[#FF9689] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      →
                    </button>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Recent Posts */}
                <div className="p-6 rounded-2xl bg-white border border-[#FFC5C1]/50 shadow-sm shadow-[#FEAEA7]/10">
                  <h3 style={SERIF} className="text-gray-900 text-lg font-semibold mb-5">Recent Posts</h3>
                  <div className="space-y-5">
                    {blogPosts.slice(0, 4).map((post) => (
                      <Link key={post.id} to={`/blog/${post.slug}`} className="flex gap-4 group">
                        <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                          <ImageWithFallback src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-700 text-sm font-medium leading-snug group-hover:text-[#FF9689] transition-colors line-clamp-2">
                            {post.title}
                          </p>
                          <p className="text-gray-400 text-xs mt-1.5 flex items-center gap-1"><Clock className="w-3 h-3"/> {post.date}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div className="p-6 rounded-2xl bg-white border border-[#FFC5C1]/50 shadow-sm shadow-[#FEAEA7]/10">
                  <h3 style={SERIF} className="text-gray-900 text-lg font-semibold mb-5">Popular Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setSearch(tag)}
                        className="px-3.5 py-1.5 rounded-full bg-[#FFC5C1]/10 border border-[#FEAEA7]/30 text-gray-600 text-xs hover:text-[#FF9689] hover:border-[#FF9689]/50 transition-all font-medium"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Newsletter CTA */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-[#FFD6BE]/30 to-[#FFC5C1]/20 border border-[#FF9689]/30 relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#FF9689]/10 rounded-full blur-2xl"></div>
                  <h3 style={SERIF} className="text-gray-900 text-xl font-semibold mb-2 relative z-10">Stay Inspired</h3>
                  <p className="text-gray-600 text-sm mb-5 relative z-10">Get wellness insights and exclusive offers delivered to your inbox weekly.</p>
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full bg-white border border-[#FEAEA7] rounded-xl px-4 py-3 text-gray-700 text-sm placeholder-gray-400 focus:outline-none focus:border-[#FF9689] focus:ring-2 focus:ring-[#FF9689]/20 mb-3 relative z-10"
                  />
                  <button className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF9689] to-[#FFC6A4] text-white text-sm font-medium hover:opacity-90 transition-opacity shadow-md shadow-[#FF9689]/20 relative z-10">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
