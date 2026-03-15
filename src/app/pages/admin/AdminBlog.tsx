import { useState } from "react";
import { Plus, Pencil, Trash2, Search, Clock, X, Save } from "lucide-react";
import { blogPosts as initialPosts, BlogPost } from "../../data/mockData";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { toast } from "sonner";

const SERIF = { fontFamily: "'Playfair Display', serif" };

export function AdminBlog() {
  const [posts, setPosts] = useState(initialPosts);
  const [search, setSearch] = useState("");
  const [editPost, setEditPost] = useState<BlogPost | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const filtered = posts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const openNew = () => {
    setEditPost({
      id: Date.now().toString(),
      slug: "",
      title: "",
      category: "Skincare",
      image: "",
      author: { name: "Dr. Sofia Laurent", role: "Lead Aesthetician", initials: "SL" },
      date: new Date().toLocaleDateString("en", { month: "long", day: "numeric", year: "numeric" }),
      readTime: "5 min read",
      excerpt: "",
      featured: false,
      tags: [],
    });
    setShowModal(true);
  };

  const openEdit = (post: BlogPost) => {
    setEditPost({ ...post });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!editPost) return;
    const exists = posts.find((p) => p.id === editPost.id);
    if (exists) {
      setPosts(posts.map((p) => p.id === editPost.id ? editPost : p));
      toast.success("Post updated");
    } else {
      setPosts([editPost, ...posts]);
      toast.success("Post created");
    }
    setShowModal(false);
    setEditPost(null);
  };

  const handleDelete = (id: string) => {
    setPosts(posts.filter((p) => p.id !== id));
    setDeleteConfirm(null);
    toast.success("Post deleted");
  };

  const CATEGORIES = ["Skincare", "Massage", "Wellness", "Lifestyle", "Body Treatments"];

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 style={SERIF} className="text-gray-900 text-2xl font-semibold">Blog Management</h1>
          <p className="text-gray-400 text-sm mt-1">{posts.length} articles published</p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#EC4899] to-[#A855F7] text-white text-sm font-medium hover:opacity-90 hover:shadow-lg hover:shadow-pink-300/30 transition-all"
        >
          <Plus className="w-4 h-4" /> New Post
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-5 rounded-2xl bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-200/60 text-center">
          <p style={SERIF} className="text-gray-900 text-2xl font-semibold">{posts.length}</p>
          <p className="text-gray-500 text-xs mt-1">Total Posts</p>
        </div>
        <div className="p-5 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200/60 text-center">
          <p style={SERIF} className="text-green-600 text-2xl font-semibold">{posts.filter((p) => p.featured).length}</p>
          <p className="text-gray-500 text-xs mt-1">Featured</p>
        </div>
        <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-50 to-fuchsia-50 border border-purple-200/60 text-center">
          <p style={SERIF} className="text-purple-600 text-2xl font-semibold">5</p>
          <p className="text-gray-500 text-xs mt-1">Categories</p>
        </div>
      </div>

      <div className="relative mb-6 max-w-sm">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-pink-300" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search posts..."
          className="w-full bg-pink-50/40 border border-pink-200/60 rounded-xl pl-11 pr-4 py-2.5 text-gray-700 text-sm placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:bg-white transition-colors"
        />
      </div>

      <div className="space-y-4">
        {filtered.map((post) => (
          <div key={post.id} className="flex gap-5 p-5 rounded-2xl bg-white border border-pink-100 hover:border-pink-300/60 hover:shadow-md hover:shadow-pink-100/40 transition-all">
            <div className="w-24 h-20 rounded-xl overflow-hidden shrink-0 border border-pink-100">
              <ImageWithFallback src={post.image} alt={post.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-pink-50 border border-pink-200/60 text-pink-600 text-xs">{post.category}</span>
                  {post.featured && <span className="px-2.5 py-0.5 rounded-full bg-green-50 border border-green-200 text-green-600 text-xs">✨ Featured</span>}
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => openEdit(post)} className="p-1.5 rounded-lg bg-pink-50 border border-pink-200/60 text-pink-400 hover:text-pink-600 hover:bg-pink-100 text-xs transition-all">
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => setDeleteConfirm(post.id)} className="p-1.5 rounded-lg bg-red-50 border border-red-200 text-red-400 hover:text-red-600 hover:bg-red-100 text-xs transition-all">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <h3 className="text-gray-900 font-medium text-sm mb-1 line-clamp-1">{post.title}</h3>
              <p className="text-gray-400 text-xs line-clamp-2 mb-2">{post.excerpt}</p>
              <div className="flex items-center gap-3 text-gray-400 text-xs">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-pink-300" />{post.readTime}</span>
                <span>·</span>
                <span>{post.author.name}</span>
                <span>·</span>
                <span>{post.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {showModal && editPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-md">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white border border-pink-100 shadow-2xl shadow-pink-200/30">
            <div className="flex items-center justify-between p-6 border-b border-pink-100">
              <h2 style={SERIF} className="text-gray-900 text-xl font-semibold">
                {posts.find((p) => p.id === editPost.id) ? "Edit Post" : "New Post"}
              </h2>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-pink-50 text-gray-400 hover:text-pink-600 transition-all">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <label className="text-gray-500 text-sm mb-1.5 block">Post Title</label>
                <input
                  value={editPost.title}
                  onChange={(e) => setEditPost({ ...editPost, title: e.target.value })}
                  className="w-full bg-pink-50/40 border border-pink-200/60 rounded-xl px-4 py-3 text-gray-800 text-sm focus:outline-none focus:border-pink-400 focus:bg-white transition-colors"
                  placeholder="Article title"
                />
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="text-gray-500 text-sm mb-1.5 block">Category</label>
                  <select
                    value={editPost.category}
                    onChange={(e) => setEditPost({ ...editPost, category: e.target.value })}
                    className="w-full bg-pink-50/40 border border-pink-200/60 rounded-xl px-4 py-3 text-gray-800 text-sm focus:outline-none focus:border-pink-400 focus:bg-white transition-colors"
                  >
                    {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-gray-500 text-sm mb-1.5 block">Read Time</label>
                  <input
                    value={editPost.readTime}
                    onChange={(e) => setEditPost({ ...editPost, readTime: e.target.value })}
                    className="w-full bg-pink-50/40 border border-pink-200/60 rounded-xl px-4 py-3 text-gray-800 text-sm focus:outline-none focus:border-pink-400 focus:bg-white transition-colors"
                    placeholder="5 min read"
                  />
                </div>
              </div>
              <div>
                <label className="text-gray-500 text-sm mb-1.5 block">Excerpt</label>
                <textarea
                  value={editPost.excerpt}
                  onChange={(e) => setEditPost({ ...editPost, excerpt: e.target.value })}
                  rows={3}
                  className="w-full bg-pink-50/40 border border-pink-200/60 rounded-xl px-4 py-3 text-gray-800 text-sm focus:outline-none focus:border-pink-400 focus:bg-white transition-colors resize-none"
                  placeholder="Brief summary..."
                />
              </div>
              <div>
                <label className="text-gray-500 text-sm mb-1.5 block">Tags (comma separated)</label>
                <input
                  value={editPost.tags.join(", ")}
                  onChange={(e) => setEditPost({ ...editPost, tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) })}
                  className="w-full bg-pink-50/40 border border-pink-200/60 rounded-xl px-4 py-3 text-gray-800 text-sm focus:outline-none focus:border-pink-400 focus:bg-white transition-colors"
                  placeholder="Skincare, Wellness, Anti-Aging"
                />
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="featuredPost"
                  checked={editPost.featured}
                  onChange={(e) => setEditPost({ ...editPost, featured: e.target.checked })}
                  className="w-4 h-4 rounded accent-pink-500"
                />
                <label htmlFor="featuredPost" className="text-gray-500 text-sm">Feature this post</label>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowModal(false)} className="flex-1 py-3 rounded-xl border border-pink-200 text-gray-500 hover:text-pink-600 hover:border-pink-300 hover:bg-pink-50 text-sm transition-all">Cancel</button>
                <button onClick={handleSave} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#EC4899] to-[#A855F7] text-white text-sm font-medium hover:opacity-90">
                  <Save className="w-4 h-4" /> Save Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-md">
          <div className="w-full max-w-sm rounded-2xl bg-white border border-pink-100 p-8 text-center shadow-2xl shadow-pink-200/30">
            <div className="w-14 h-14 rounded-full bg-red-50 border border-red-200 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6 text-red-500" />
            </div>
            <h3 style={SERIF} className="text-gray-900 text-xl font-semibold mb-2">Delete Post?</h3>
            <p className="text-gray-400 text-sm mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-3 rounded-xl border border-pink-200 text-gray-500 hover:text-pink-600 hover:border-pink-300 hover:bg-pink-50 text-sm transition-all">Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 py-3 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-all">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
