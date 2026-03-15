import { useState, useRef } from "react";
import { Upload, Grid3X3, List, Search, Trash2, X, Download, ZoomIn } from "lucide-react";
import { galleryImages } from "../../data/mockData";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { toast } from "sonner";

const SERIF = { fontFamily: "'Playfair Display', serif" };

interface MediaItem {
  id: string;
  name: string;
  url: string;
  category: string;
  size: string;
  uploaded: string;
}

const initialMedia: MediaItem[] = galleryImages.map((g, i) => ({
  id: g.id,
  name: `${g.title.toLowerCase().replace(/\s/g, "-")}.jpg`,
  url: g.image,
  category: g.category,
  size: `${(Math.random() * 2 + 0.5).toFixed(1)} MB`,
  uploaded: `Mar ${Math.floor(Math.random() * 12 + 1)}, 2026`,
}));

export function AdminMedia() {
  const [media, setMedia] = useState(initialMedia);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [preview, setPreview] = useState<MediaItem | null>(null);
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const filtered = media.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleUpload = (files: FileList | null) => {
    if (!files) return;
    const count = files.length;
    toast.success(`${count} file${count > 1 ? "s" : ""} uploaded successfully`);
  };

  const handleDelete = (id: string) => {
    setMedia(media.filter((m) => m.id !== id));
    setSelected(new Set([...selected].filter((s) => s !== id)));
    toast.success("File deleted");
  };

  const handleBulkDelete = () => {
    setMedia(media.filter((m) => !selected.has(m.id)));
    toast.success(`${selected.size} files deleted`);
    setSelected(new Set());
  };

  const toggleSelect = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 style={SERIF} className="text-gray-900 text-2xl font-semibold">Media Library</h1>
          <p className="text-gray-400 text-sm mt-1">{media.length} files stored</p>
        </div>
        <div className="flex gap-3">
          {selected.size > 0 && (
            <button
              onClick={handleBulkDelete}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-50 border border-red-200 text-red-500 hover:bg-red-100 text-sm transition-all"
            >
              <Trash2 className="w-4 h-4" /> Delete ({selected.size})
            </button>
          )}
          <button
            onClick={() => fileRef.current?.click()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#EC4899] to-[#A855F7] text-white text-sm font-medium hover:opacity-90 hover:shadow-lg hover:shadow-pink-300/30 transition-all"
          >
            <Upload className="w-4 h-4" /> Upload
          </button>
          <input ref={fileRef} type="file" multiple accept="image/*" className="hidden" onChange={(e) => handleUpload(e.target.files)} />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Files", value: media.length, bg: "from-pink-50 to-rose-50", border: "border-pink-200/60" },
          { label: "Storage Used", value: "24.7 GB", bg: "from-purple-50 to-fuchsia-50", border: "border-purple-200/60" },
          { label: "Images", value: media.length, bg: "from-rose-50 to-pink-50", border: "border-rose-200/60" },
          { label: "Categories", value: "7", bg: "from-fuchsia-50 to-purple-50", border: "border-fuchsia-200/60" },
        ].map((s) => (
          <div key={s.label} className={`p-5 rounded-2xl bg-gradient-to-br ${s.bg} border ${s.border} text-center`}>
            <p style={SERIF} className="text-gray-900 text-xl font-semibold">{s.value}</p>
            <p className="text-gray-500 text-xs mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Upload dropzone */}
      <div
        className={`relative mb-6 rounded-2xl border-2 border-dashed transition-all p-10 text-center cursor-pointer ${
          dragging
            ? "border-[#EC4899] bg-pink-50/60"
            : "border-pink-200/60 hover:border-pink-400/60 hover:bg-pink-50/40"
        }`}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); handleUpload(e.dataTransfer.files); }}
        onClick={() => fileRef.current?.click()}
      >
        <div className="w-14 h-14 rounded-full bg-pink-100 border border-pink-200 flex items-center justify-center mx-auto mb-3">
          <Upload className="w-6 h-6 text-[#EC4899]" />
        </div>
        <p className="text-gray-700 font-medium mb-1">Drop files here or click to upload</p>
        <p className="text-gray-400 text-sm">PNG, JPG, WebP up to 10MB each</p>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-pink-300" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search files..."
            className="w-full bg-pink-50/40 border border-pink-200/60 rounded-xl pl-11 pr-4 py-2.5 text-gray-700 text-sm placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:bg-white transition-colors"
          />
        </div>
        <div className="flex gap-2 ml-auto">
          <button
            onClick={() => setView("grid")}
            className={`p-2.5 rounded-xl transition-all ${view === "grid" ? "bg-pink-100 text-[#EC4899] border border-pink-200" : "bg-pink-50 border border-pink-100 text-gray-400 hover:text-pink-600"}`}
          >
            <Grid3X3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setView("list")}
            className={`p-2.5 rounded-xl transition-all ${view === "list" ? "bg-pink-100 text-[#EC4899] border border-pink-200" : "bg-pink-50 border border-pink-100 text-gray-400 hover:text-pink-600"}`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid View */}
      {view === "grid" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className={`group relative rounded-xl overflow-hidden border transition-all cursor-pointer ${
                selected.has(item.id) ? "border-[#EC4899] ring-2 ring-pink-200/60 shadow-sm shadow-pink-200/40" : "border-pink-100 hover:border-pink-300"
              }`}
              onClick={() => toggleSelect(item.id)}
            >
              <div className="aspect-square">
                <ImageWithFallback src={item.url} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all" />

              {/* Selection indicator */}
              <div className={`absolute top-2 left-2 w-5 h-5 rounded-full border-2 transition-all ${
                selected.has(item.id)
                  ? "bg-[#EC4899] border-[#EC4899]"
                  : "border-white/60 opacity-0 group-hover:opacity-100"
              } flex items-center justify-center`}>
                {selected.has(item.id) && <span className="text-white text-xs">✓</span>}
              </div>

              {/* Actions */}
              <div className="absolute bottom-0 left-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-all flex gap-1">
                <button
                  onClick={(e) => { e.stopPropagation(); setPreview(item); }}
                  className="flex-1 flex items-center justify-center py-1.5 rounded-lg bg-white/80 text-gray-700 hover:text-pink-600 text-xs backdrop-blur-sm border border-pink-100/60"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }}
                  className="flex items-center justify-center px-2 py-1.5 rounded-lg bg-red-500/80 text-white text-xs backdrop-blur-sm"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List View */}
      {view === "list" && (
        <div className="rounded-2xl bg-white border border-pink-100/80 overflow-hidden shadow-sm shadow-pink-50/60">
          <table className="w-full">
            <thead>
              <tr className="border-b border-pink-50/80 bg-pink-50/40">
                <th className="w-8 px-5 py-3"></th>
                {["File", "Category", "Size", "Uploaded", "Actions"].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-gray-400 text-xs uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, i) => (
                <tr key={item.id} className={`border-b border-pink-50/50 hover:bg-pink-50/30 transition-colors ${i === filtered.length - 1 ? "border-transparent" : ""}`}>
                  <td className="px-5 py-3">
                    <input
                      type="checkbox"
                      checked={selected.has(item.id)}
                      onChange={() => toggleSelect(item.id)}
                      className="w-4 h-4 accent-pink-500"
                    />
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-pink-100">
                        <ImageWithFallback src={item.url} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="text-gray-700 text-sm">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3"><span className="text-gray-400 text-sm">{item.category}</span></td>
                  <td className="px-5 py-3"><span className="text-gray-400 text-sm">{item.size}</span></td>
                  <td className="px-5 py-3"><span className="text-gray-400 text-sm">{item.uploaded}</span></td>
                  <td className="px-5 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => setPreview(item)} className="p-1.5 rounded-lg bg-pink-50 border border-pink-200/60 text-pink-400 hover:text-pink-600 hover:bg-pink-100 transition-all">
                        <ZoomIn className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleDelete(item.id)} className="p-1.5 rounded-lg bg-red-50 border border-red-200 text-red-400 hover:text-red-600 hover:bg-red-100 transition-all">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Preview Modal */}
      {preview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xl" onClick={() => setPreview(null)}>
          <div className="max-w-3xl w-full rounded-2xl overflow-hidden border border-pink-100 shadow-2xl shadow-pink-200/30" onClick={(e) => e.stopPropagation()}>
            <ImageWithFallback src={preview.url} alt={preview.name} className="w-full max-h-[65vh] object-cover" />
            <div className="bg-white border-t border-pink-100 p-5 flex items-center justify-between">
              <div>
                <p className="text-gray-900 text-sm font-medium">{preview.name}</p>
                <p className="text-gray-400 text-xs mt-0.5">{preview.category} · {preview.size} · {preview.uploaded}</p>
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-pink-50 border border-pink-200 text-pink-600 hover:bg-pink-100 text-sm transition-all">
                  <Download className="w-4 h-4" /> Download
                </button>
                <button onClick={() => setPreview(null)} className="p-2 rounded-xl bg-pink-50 border border-pink-100 text-gray-400 hover:text-pink-600 hover:bg-pink-100 transition-all">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
