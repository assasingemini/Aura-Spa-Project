"use client";

import { useState, useTransition, useRef } from "react";
import { Plus, Pencil, Trash2, Search, Clock, X, Save, Upload, Link as LinkIcon } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { toast } from "sonner";
import { createPostAction, updatePostAction, deletePostAction } from "./actions";

const SERIF = { fontFamily: "'Playfair Display', serif" };

export interface PostUI {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  published: boolean;
  authorName?: string;
  createdAt?: string;
}

export function AdminBlogClient({ initialPosts }: { initialPosts: PostUI[] }) {
  const [posts, setPosts] = useState(initialPosts); // Using state to optimism if needed, though Server Action revalidates
  const [search, setSearch] = useState("");
  const [editPost, setEditPost] = useState<PostUI | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  
  const [isPending, startTransition] = useTransition();
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filtered = initialPosts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  const generateSlug = (text: string) => {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  };

  const openNew = () => {
    setEditPost({
      id: "new",
      slug: "",
      title: "",
      excerpt: "",
      content: "",
      imageUrl: "",
      published: false,
    });
    setShowModal(true);
  };

  const openEdit = (post: PostUI) => {
    setEditPost({ ...post });
    setShowModal(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editPost) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      setEditPost({ ...editPost, imageUrl: data.url });
      toast.success("Image uploaded!");
    } catch (error) {
      toast.error("Failed to upload image.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = () => {
    if (!editPost) return;
    if (!editPost.title.trim()) return toast.error("Title is required");

    let finalSlug = editPost.slug.trim();
    if (!finalSlug) finalSlug = generateSlug(editPost.title);

    startTransition(async () => {
      try {
        const payload = {
          title: editPost.title,
          slug: finalSlug,
          excerpt: editPost.excerpt,
          content: editPost.content,
          imageUrl: editPost.imageUrl,
          published: editPost.published,
        };

        if (editPost.id === "new") {
          await createPostAction(payload);
          toast.success("Post created");
        } else {
          await updatePostAction(editPost.id, payload);
          toast.success("Post updated");
        }
        setShowModal(false);
        setEditPost(null);
      } catch (error: any) {
        toast.error(error.message || "Failed to save post. Slug might already exist.");
      }
    });
  };

  const handleDelete = (id: string) => {
    startTransition(async () => {
      try {
        await deletePostAction(id);
        toast.success("Post deleted");
        setDeleteConfirm(null);
      } catch (error) {
        toast.error("Failed to delete post.");
        setDeleteConfirm(null);
      }
    });
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 style={SERIF} className="text-gray-900 text-2xl font-semibold">Blog Management</h1>
          <p className="text-gray-400 text-sm mt-1">{initialPosts.length} articles</p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#EC4899] to-[#A855F7] text-white text-sm font-medium hover:opacity-90 hover:shadow-lg hover:shadow-pink-300/30 transition-all"
        >
          <Plus className="w-4 h-4" /> New Post
        </button>
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
          <div key={post.id} className="flex flex-col sm:flex-row gap-5 p-5 rounded-2xl bg-white border border-pink-100 hover:border-pink-300/60 hover:shadow-md hover:shadow-pink-100/40 transition-all">
            <div className="w-full sm:w-32 h-32 sm:h-24 rounded-xl overflow-hidden shrink-0 border border-pink-100 bg-gray-50 flex items-center justify-center text-gray-400">
              {post.imageUrl ? <ImageWithFallback src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" /> : "No Image"}
            </div>
            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs border ${post.published ? "bg-green-50 border-green-200 text-green-600" : "bg-gray-50 border-gray-200 text-gray-500"}`}>
                    {post.published ? "Published" : "Draft"}
                  </span>
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
                <span>{post.authorName}</span>
                <span>·</span>
                <span>{post.createdAt}</span>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="py-12 text-center text-gray-400 border border-dashed border-pink-200 rounded-2xl">
            No posts found.
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {showModal && editPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-md">
          <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white border border-pink-100 shadow-2xl shadow-pink-200/30">
            <div className="flex items-center justify-between p-6 border-b border-pink-100">
              <h2 style={SERIF} className="text-gray-900 text-xl font-semibold">
                {editPost.id === "new" ? "New Post" : "Edit Post"}
              </h2>
              <button 
                onClick={() => setShowModal(false)} 
                disabled={isPending || isUploading}
                className="p-2 rounded-lg hover:bg-pink-50 text-gray-400 hover:text-pink-600 transition-all disabled:opacity-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-5">
                <div className="col-span-2">
                  <label className="text-gray-500 text-sm mb-1.5 block">Post Title</label>
                  <input
                    value={editPost.title}
                    onChange={(e) => setEditPost({ ...editPost, title: e.target.value })}
                    className="w-full bg-pink-50/40 border border-pink-200/60 rounded-xl px-4 py-3 text-gray-800 text-sm focus:outline-none focus:border-pink-400 focus:bg-white transition-colors"
                    placeholder="Article title"
                  />
                </div>
                
                <div className="col-span-2 sm:col-span-1">
                  <label className="text-gray-500 text-sm mb-1.5 block">Slug (URL)</label>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-pink-300" />
                    <input
                      value={editPost.slug}
                      onChange={(e) => setEditPost({ ...editPost, slug: e.target.value })}
                      className="w-full bg-pink-50/40 border border-pink-200/60 rounded-xl pl-9 pr-4 py-3 text-gray-800 text-sm focus:outline-none focus:border-pink-400 focus:bg-white transition-colors"
                      placeholder="leave-blank-to-auto-generate"
                    />
                  </div>
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className="text-gray-500 text-sm mb-1.5 block">Cover Cover</label>
                  <div className="flex gap-2">
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileUpload}
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-pink-200 text-gray-600 text-sm hover:border-pink-300 hover:bg-pink-50 transition-all ${isUploading ? "opacity-50" : ""}`}
                    >
                      <Upload className="w-4 h-4" /> {isUploading ? "Uploading..." : "Upload Photo"}
                    </button>
                  </div>
                  {editPost.imageUrl && (
                    <div className="mt-2 text-xs text-green-600 flex items-center gap-1">
                       ✓ Image uploaded
                    </div>
                  )}
                </div>

                <div className="col-span-2">
                  <label className="text-gray-500 text-sm mb-1.5 block">Excerpt</label>
                  <textarea
                    value={editPost.excerpt}
                    onChange={(e) => setEditPost({ ...editPost, excerpt: e.target.value })}
                    rows={2}
                    className="w-full bg-pink-50/40 border border-pink-200/60 rounded-xl px-4 py-3 text-gray-800 text-sm focus:outline-none focus:border-pink-400 focus:bg-white transition-colors resize-none"
                    placeholder="Brief summary..."
                  />
                </div>

                <div className="col-span-2">
                  <label className="text-gray-500 text-sm mb-1.5 block">Content (Markdown / Text)</label>
                  <textarea
                    value={editPost.content}
                    onChange={(e) => setEditPost({ ...editPost, content: e.target.value })}
                    rows={8}
                    className="w-full bg-pink-50/40 border border-pink-200/60 rounded-xl px-4 py-3 text-gray-800 text-sm focus:outline-none focus:border-pink-400 focus:bg-white transition-colors resize-none"
                    placeholder="Write your article content here..."
                  />
                </div>

                <div className="col-span-2 flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="publishedStatus"
                    checked={editPost.published}
                    onChange={(e) => setEditPost({ ...editPost, published: e.target.checked })}
                    className="w-4 h-4 rounded accent-pink-500"
                  />
                  <label htmlFor="publishedStatus" className="text-gray-500 text-sm">Publish this post</label>
                </div>
              </div>

              <div className="flex gap-3 pt-2 border-t border-pink-100">
                <button 
                  onClick={() => setShowModal(false)} 
                  disabled={isPending || isUploading}
                  className="flex-1 py-3 rounded-xl border border-pink-200 text-gray-500 hover:text-pink-600 hover:border-pink-300 hover:bg-pink-50 text-sm transition-all disabled:opacity-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave} 
                  disabled={isPending || isUploading}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#EC4899] to-[#A855F7] text-white text-sm font-medium hover:opacity-90 disabled:opacity-50"
                >
                  <Save className="w-4 h-4" /> {isPending ? "Saving..." : "Save Post"}
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
              <button 
                onClick={() => setDeleteConfirm(null)} 
                disabled={isPending}
                className="flex-1 py-3 rounded-xl border border-pink-200 text-gray-500 hover:text-pink-600 hover:border-pink-300 hover:bg-pink-50 text-sm transition-all disabled:opacity-50"
              >
                Cancel
              </button>
              <button 
                onClick={() => handleDelete(deleteConfirm)} 
                disabled={isPending}
                className="flex-1 py-3 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-all disabled:opacity-50 flex items-center gap-2 justify-center"
              >
                {isPending ? "..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
