import { useState } from "react";
import { X, ZoomIn, Sparkles } from "lucide-react";
import { galleryImages } from "../../data/mockData";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";

const SERIF = { fontFamily: "'Playfair Display', serif" };
const CATEGORIES = ["All", "Facilities", "Facials", "Massage", "Body", "Wellness", "Nails", "Results"];

export function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightbox, setLightbox] = useState<typeof galleryImages[0] | null>(null);

  const filtered = activeCategory === "All" ? galleryImages : galleryImages.filter((g) => g.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50/60 via-pink-50/30 to-white pt-24">
      {/* Header */}
      <section className="py-20 text-center">
        <div className="max-w-7xl mx-auto px-6 relative">
          {/* Orbs */}
          <div className="absolute top-0 left-1/3 w-64 h-64 bg-pink-200/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/3 w-48 h-48 bg-purple-200/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-50 border border-pink-200/70 text-pink-600 text-sm mb-6">
              <Sparkles className="w-3.5 h-3.5" /> Visual Journey
            </div>
            <h1 style={SERIF} className="text-5xl lg:text-6xl font-semibold text-gray-900 mb-4">
              The AURA{" "}
              <span className="bg-gradient-to-r from-[#EC4899] to-[#A855F7] bg-clip-text text-transparent">
                Experience
              </span>
            </h1>
            <p className="text-gray-500 max-w-xl mx-auto text-lg">
              A visual tour through our world-class facilities, transformative treatments, and breathtaking results.
            </p>
          </div>
        </div>
      </section>

      {/* Filter */}
      <div className="sticky top-16 z-20 bg-white/95 backdrop-blur-xl border-b border-pink-100 py-4 shadow-sm shadow-pink-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-5 py-2 rounded-full text-sm transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-[#EC4899] to-[#A855F7] text-white shadow-sm shadow-pink-300/30"
                    : "bg-pink-50 border border-pink-200/60 text-gray-600 hover:text-pink-600 hover:border-pink-300 hover:bg-pink-100/60"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="py-12 max-w-7xl mx-auto px-6">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filtered.map((item, i) => (
            <div
              key={item.id}
              className="group relative rounded-2xl overflow-hidden cursor-pointer break-inside-avoid border border-pink-100 hover:border-pink-300/60 hover:shadow-xl hover:shadow-pink-100/50 transition-all duration-300"
              onClick={() => setLightbox(item)}
            >
              <ImageWithFallback
                src={item.image}
                alt={item.title}
                className={`w-full object-cover group-hover:scale-105 transition-transform duration-700 ${
                  i % 3 === 0 ? "aspect-square" : i % 3 === 1 ? "aspect-[4/5]" : "aspect-video"
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-rose-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div>
                    <p style={SERIF} className="text-white font-medium">{item.title}</p>
                    <p className="text-pink-200/80 text-xs">{item.category}</p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-white/20 border border-white/30 flex items-center justify-center backdrop-blur-sm">
                    <ZoomIn className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400">No images in this category</p>
          </div>
        )}
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xl p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            onClick={() => setLightbox(null)}
          >
            <X className="w-5 h-5" />
          </button>

          <div
            className="max-w-4xl w-full rounded-2xl overflow-hidden border border-pink-100 shadow-2xl shadow-pink-200/20"
            onClick={(e) => e.stopPropagation()}
          >
            <ImageWithFallback
              src={lightbox.image}
              alt={lightbox.title}
              className="w-full max-h-[75vh] object-cover"
            />
            <div className="p-5 bg-white border-t border-pink-100">
              <h3 style={SERIF} className="text-gray-900 font-semibold">{lightbox.title}</h3>
              <p className="text-pink-500 text-sm mt-0.5">{lightbox.category}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
