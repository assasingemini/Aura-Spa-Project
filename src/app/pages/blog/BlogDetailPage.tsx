import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import { ArrowLeft, Clock, Share2, Twitter, Facebook, Link2, Sparkles, BookOpen, Loader2 } from "lucide-react";
import { blogPosts as mockPosts } from "../../data/mockData";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { toast } from "sonner";

const SERIF = { fontFamily: "'Playfair Display', serif" };

export function BlogDetailPage() {
  const { slug } = useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch current post
        const res = await fetch(`/api/posts?slug=${slug}`);
        const data = await res.json();
        
        // Fetch all posts for related section
        const allRes = await fetch("/api/posts");
        const allData = await allRes.json();
        const availablePosts = allData.length > 0 ? allData : mockPosts;
        setPosts(availablePosts);

        if (data && !data.error) {
          setPost(data);
        } else {
          setPost(availablePosts.find((p: any) => p.slug === slug) || availablePosts[0]);
        }
      } catch (err) {
        console.error("Failed to fetch post:", err);
        setPost(mockPosts.find((p) => p.slug === slug) || mockPosts[0]);
        setPosts(mockPosts);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white pt-24">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[#FF9689] animate-spin mx-auto mb-4" />
          <p className="text-gray-500 font-serif text-lg">Loading your wellness story...</p>
        </div>
      </div>
    );
  }

  if (!post) return null;

  const related = posts.filter((p) => p.id !== post.id && p.category === post.category).slice(0, 3);
  const otherRelated = posts.filter((p) => p.id !== post.id).slice(0, 3 - related.length);
  const allRelated = [...related, ...otherRelated].slice(0, 3);

  const articleContent = post.content || "";

  const tocItems = [
    "Introduction",
    "Key Principles",
    "Results You Can Expect",
    "Conclusion",
  ];

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFD6BE]/10 via-white to-[#FEAEA7]/10 pt-24 pb-24">
      {/* Back nav */}
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-0">
        <Link to="/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#FF9689] transition-colors text-sm font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Journal
        </Link>
      </div>

      <article className="py-12 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Post header */}
            <div className="mb-10">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FFC5C1]/20 border border-[#FEAEA7]/50 text-[#FF9689] text-sm font-medium mb-6">
                <Sparkles className="w-3.5 h-3.5" /> {post.category}
              </span>
              <h1 style={SERIF} className="text-4xl lg:text-5xl font-semibold text-gray-900 leading-tight mb-8">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-[#FFC5C1]/30">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF9689] to-[#FFC6A4] flex items-center justify-center text-white font-semibold shadow-sm">
                    {post.author.initials}
                  </div>
                  <div>
                    <p className="text-gray-900 text-sm font-semibold">{post.author.name}</p>
                    <p className="text-gray-500 text-xs">{post.author.role}</p>
                  </div>
                </div>
                <span className="text-[#FEAEA7]">·</span>
                <span className="text-gray-500 text-sm">{post.date}</span>
                <span className="text-[#FEAEA7]">·</span>
                <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                  <Clock className="w-4 h-4 text-[#FF9689]" /> {post.readTime}
                </div>
              </div>

              {/* Share buttons */}
              <div className="flex items-center gap-4">
                <span className="text-gray-500 text-sm font-medium">Share this article:</span>
                <button
                  onClick={copyLink}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#FFC5C1]/50 text-gray-600 hover:text-[#FF9689] hover:border-[#FF9689] text-sm transition-all shadow-sm"
                >
                  <Link2 className="w-4 h-4" /> Copy link
                </button>
                <button className="w-9 h-9 rounded-full bg-white border border-[#FFC5C1]/50 flex items-center justify-center text-gray-500 hover:text-[#1DA1F2] hover:border-[#1DA1F2]/50 transition-all shadow-sm">
                  <Twitter className="w-4 h-4" />
                </button>
                <button className="w-9 h-9 rounded-full bg-white border border-[#FFC5C1]/50 flex items-center justify-center text-gray-500 hover:text-[#1877F2] hover:border-[#1877F2]/50 transition-all shadow-sm">
                  <Facebook className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Cover image */}
            <div className="rounded-3xl overflow-hidden mb-12 shadow-xl shadow-[#FEAEA7]/20 border border-[#FFC5C1]/30">
              <ImageWithFallback
                src={post.image}
                alt={post.title}
                className="w-full h-96 object-cover"
              />
            </div>

            {/* Article content */}
            <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-[#FF9689] prose-strong:text-gray-900 prose-ul:text-gray-600">
              <p className="text-xl leading-relaxed mb-8 text-gray-600 border-l-4 border-[#FF9689] pl-6 italic bg-white p-6 rounded-r-2xl border-y border-r border-[#FFC5C1]/30 shadow-sm">
                "{post.excerpt}"
              </p>

              {articleContent.split("\n\n").map((block: string, i: number) => {
                if (block.startsWith("## ")) {
                  return (
                    <h2 key={i} style={SERIF} className="text-3xl font-semibold mt-12 mb-6 text-gray-900 flex items-center gap-3">
                      <Sparkles className="w-5 h-5 text-[#FF9689] opacity-50" />
                      {block.replace("## ", "")}
                    </h2>
                  );
                }
                if (block.startsWith("**") && block.endsWith("**")) {
                  const inner = block.replace(/\*\*/g, "");
                  return <p key={i} className="font-semibold text-gray-900 text-lg mt-8 mb-4">{inner}</p>;
                }
                if (block.startsWith("- ")) {
                  const items = block.split("\n").filter((l) => l.startsWith("- "));
                  return (
                    <ul key={i} className="space-y-3 mb-8 ml-2 bg-white p-8 rounded-2xl border border-[#FFC5C1]/30 shadow-sm">
                      {items.map((item, j) => (
                        <li key={j} className="flex items-start gap-3 text-gray-600 leading-relaxed">
                          <CheckCircleIcon />
                          <span className="pt-0.5">{item.replace("- ", "")}</span>
                        </li>
                      ))}
                    </ul>
                  );
                }
                if (block.trim()) {
                  // Handle bold inline text
                  const parts = block.split(/(\*\*[^*]+\*\*)/);
                  return (
                    <p key={i} className="text-gray-600 leading-relaxed mb-6 text-lg">
                      {parts.map((part, j) => {
                        if (part.startsWith("**") && part.endsWith("**")) {
                          return <strong key={j} className="font-semibold text-gray-900">{part.slice(2, -2)}</strong>;
                        }
                        return part;
                      })}
                    </p>
                  );
                }
                return null;
              })}
            </div>

            {/* Tags */}
            <div className="mt-12 pt-10 border-t border-[#FFC5C1]/30">
              <p className="text-gray-500 text-sm font-medium mb-4">Article Tags:</p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link key={tag} to="/blog" className="px-4 py-2 rounded-full bg-white border border-[#FFC5C1]/50 text-gray-600 text-sm hover:text-[#FF9689] hover:border-[#FF9689] transition-all shadow-sm">
                    {tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* Author box */}
            <div className="mt-12 p-8 rounded-3xl bg-gradient-to-br from-white to-[#FFD6BE]/10 border border-[#FFC5C1]/50 shadow-lg shadow-[#FEAEA7]/10">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FF9689] to-[#FFC6A4] flex items-center justify-center text-white text-2xl font-semibold shrink-0 shadow-md">
                  {post.author.initials}
                </div>
                <div>
                  <p className="text-[#FF9689] text-xs uppercase tracking-widest font-semibold mb-2">Written by</p>
                  <h3 style={SERIF} className="text-gray-900 text-2xl font-semibold mb-1">{post.author.name}</h3>
                  <p className="text-gray-500 text-sm mb-4">{post.author.role}</p>
                  <p className="text-gray-600 leading-relaxed max-w-2xl">
                    An expert at AURA Luxury Spa with years of experience in luxury skincare and wellness. Passionate about helping clients achieve their most radiant, confident selves through personalized, results-driven treatments.
                  </p>
                </div>
              </div>
            </div>

            {/* Related Posts */}
            <div className="mt-20">
              <h2 style={SERIF} className="text-gray-900 text-3xl font-semibold mb-8">You Might Also Like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {allRelated.map((p) => (
                  <Link key={p.id} to={`/blog/${p.slug}`} className="group bg-white p-4 rounded-2xl border border-[#FFC5C1]/30 hover:border-[#FF9689]/50 hover:shadow-lg transition-all">
                    <div className="aspect-[4/3] rounded-xl overflow-hidden mb-4 relative">
                      <ImageWithFallback src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium text-[#FF9689]">
                        {p.category}
                      </div>
                    </div>
                    <h4 style={SERIF} className="text-gray-900 text-lg font-semibold mt-2 group-hover:text-[#FF9689] transition-colors leading-snug line-clamp-2">
                      {p.title}
                    </h4>
                    <p className="text-gray-400 text-xs mt-3 flex items-center gap-1"><Clock className="w-3 h-3"/> {p.readTime}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Table of contents */}
            <div className="sticky top-28 space-y-8">
              <div className="p-8 rounded-3xl bg-white border border-[#FFC5C1]/50 shadow-sm">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#FEAEA7]/30">
                  <div className="p-2 rounded-lg bg-[#FFC5C1]/20">
                    <BookOpen className="w-5 h-5 text-[#FF9689]" />
                  </div>
                  <h3 style={SERIF} className="text-gray-900 text-lg font-semibold">In this article</h3>
                </div>
                <ul className="space-y-3">
                  {tocItems.map((item, i) => (
                    <li key={i}>
                      <a href="#" className="text-gray-600 text-sm hover:text-[#FF9689] transition-colors flex items-start gap-3 group">
                        <span className="w-6 h-6 rounded-full bg-[#FFC5C1]/10 flex items-center justify-center text-xs text-[#FF9689] font-medium group-hover:bg-[#FF9689] group-hover:text-white transition-all shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span className="pt-0.5">{item}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Book CTA */}
              <div className="p-8 rounded-3xl bg-gradient-to-br from-[#FFD6BE]/40 to-[#FFC5C1]/30 border border-[#FF9689]/40 relative overflow-hidden text-center shadow-lg shadow-[#FEAEA7]/20">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/40 rounded-full blur-2xl"></div>
                <h3 style={SERIF} className="text-gray-900 text-2xl font-semibold mb-3 relative z-10">Ready to Glow?</h3>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed relative z-10">
                  Experience our premium treatments and start your transformation journey today.
                </p>
                <Link
                  to="/booking"
                  className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-[#FF9689] to-[#FFC6A4] text-white font-medium hover:opacity-90 hover:shadow-lg hover:shadow-[#FF9689]/30 transition-all relative z-10"
                >
                  Book Consultation <ArrowLeft className="w-4 h-4 rotate-180" />
                </Link>
              </div>

              {/* Recent Posts Sidebar */}
              <div className="p-8 rounded-3xl bg-white border border-[#FFC5C1]/50 shadow-sm">
                <h3 style={SERIF} className="text-gray-900 text-lg font-semibold mb-6">Latest Posts</h3>
                <div className="space-y-5">
                  {posts.slice(0, 3).map((p) => (
                    <Link key={p.id} to={`/blog/${p.slug}`} className="flex gap-4 group">
                      <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 shadow-sm">
                        <ImageWithFallback src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-800 text-sm font-medium leading-snug group-hover:text-[#FF9689] transition-colors line-clamp-2">{p.title}</p>
                        <p className="text-gray-400 text-xs mt-1.5">{p.date}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

function CheckCircleIcon() {
  return (
    <svg className="w-5 h-5 text-[#FF9689] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
