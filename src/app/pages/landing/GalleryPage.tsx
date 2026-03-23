import { useState, useEffect, useCallback } from "react";
import { X, ZoomIn, Sparkles, ChevronLeft, ChevronRight, Camera, Heart } from "lucide-react";
import { galleryImages } from "../../data/mockData";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { Link } from "react-router";

const SERIF = { fontFamily: "'Playfair Display', serif" };
const CATEGORIES = ["All", "Facilities", "Facials", "Massage", "Body", "Wellness", "Nails", "Results"];

export function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [loaded, setLoaded] = useState(false);

  const filtered = activeCategory === "All" ? galleryImages : galleryImages.filter((g) => g.category === activeCategory);
  const lightboxItem = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  // Entrance animation
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Reset animation on category change
  useEffect(() => {
    setLoaded(false);
    const t = setTimeout(() => setLoaded(true), 50);
    return () => clearTimeout(t);
  }, [activeCategory]);

  // Keyboard navigation for lightbox
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (lightboxIndex === null) return;
    if (e.key === "Escape") setLightboxIndex(null);
    if (e.key === "ArrowRight" && lightboxIndex < filtered.length - 1) setLightboxIndex(lightboxIndex + 1);
    if (e.key === "ArrowLeft" && lightboxIndex > 0) setLightboxIndex(lightboxIndex - 1);
  }, [lightboxIndex, filtered.length]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Category counts
  const getCategoryCount = (cat: string) => {
    if (cat === "All") return galleryImages.length;
    return galleryImages.filter((g) => g.category === cat).length;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50/60 via-pink-50/30 to-white pt-24">
      {/* Hero Header */}
      <section className="py-20 text-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative">
          {/* Decorative orbs */}
          <div className="absolute -top-20 left-1/4 w-96 h-96 bg-gradient-to-br from-pink-200/25 to-purple-200/15 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: "6s" }} />
          <div className="absolute -bottom-10 right-1/4 w-72 h-72 bg-gradient-to-br from-rose-200/20 to-fuchsia-200/15 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: "8s" }} />
          <div className="absolute top-10 right-10 w-48 h-48 bg-gradient-to-br from-purple-100/20 to-pink-100/15 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-200/70 text-pink-600 text-sm mb-8 shadow-sm shadow-pink-100/50">
              <Camera className="w-3.5 h-3.5" /> Visual Journey · {galleryImages.length} Photos
            </div>
            <h1 style={SERIF} className="text-5xl lg:text-7xl font-semibold text-gray-900 mb-5 leading-tight">
              The AURA{" "}
              <span className="bg-gradient-to-r from-[#EC4899] via-[#D946EF] to-[#A855F7] bg-clip-text text-transparent">
                Experience
              </span>
            </h1>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
              A visual tour through our world-class facilities, transformative treatments, 
              and breathtaking results. Every image tells a story of luxury and transformation.
            </p>

            {/* Stats row */}
            <div className="flex items-center justify-center gap-8 mt-10">
              {[
                { label: "Categories", value: CATEGORIES.length - 1 },
                { label: "Photos", value: galleryImages.length },
                { label: "Treatments", value: "20+" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p style={SERIF} className="text-2xl font-semibold bg-gradient-to-r from-[#EC4899] to-[#A855F7] bg-clip-text text-transparent">
                    {stat.value}
                  </p>
                  <p className="text-gray-400 text-xs mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Category Filter */}
      <div className="sticky top-16 z-20 bg-white/95 backdrop-blur-xl border-b border-pink-100 py-4 shadow-sm shadow-pink-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
            {CATEGORIES.map((cat) => {
              const count = getCategoryCount(cat);
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`shrink-0 px-5 py-2.5 rounded-full text-sm transition-all duration-300 flex items-center gap-2 ${
                    activeCategory === cat
                      ? "bg-gradient-to-r from-[#EC4899] to-[#A855F7] text-white shadow-md shadow-pink-300/40 scale-105"
                      : "bg-pink-50/80 border border-pink-200/60 text-gray-600 hover:text-pink-600 hover:border-pink-300 hover:bg-pink-100/60 hover:scale-105"
                  }`}
                >
                  {cat}
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                    activeCategory === cat 
                      ? "bg-white/25 text-white" 
                      : "bg-pink-100 text-pink-500"
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Masonry Grid */}
      <section className="py-12 max-w-7xl mx-auto px-6">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filtered.map((item, i) => (
            <div
              key={item.id}
              className="group relative rounded-2xl overflow-hidden cursor-pointer break-inside-avoid border border-pink-100/80 hover:border-pink-300/60 hover:shadow-2xl hover:shadow-pink-200/40 transition-all duration-500"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0)" : "translateY(30px)",
                transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.08}s`,
              }}
              onClick={() => setLightboxIndex(i)}
            >
              <ImageWithFallback
                src={item.image}
                alt={item.title}
                className={`w-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out ${
                  i % 4 === 0 ? "aspect-[3/4]" : i % 4 === 1 ? "aspect-square" : i % 4 === 2 ? "aspect-video" : "aspect-[4/5]"
                }`}
              />
              
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-rose-900/70 via-rose-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-end justify-between">
                    <div>
                      <p style={SERIF} className="text-white font-semibold text-lg">{item.title}</p>
                      <p className="text-pink-200/80 text-sm mt-0.5">{item.category}</p>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-10 h-10 rounded-full bg-white/15 border border-white/25 flex items-center justify-center backdrop-blur-md hover:bg-white/30 transition-colors">
                        <Heart className="w-4 h-4 text-white" />
                      </div>
                      <div className="w-10 h-10 rounded-full bg-white/15 border border-white/25 flex items-center justify-center backdrop-blur-md hover:bg-white/30 transition-colors">
                        <ZoomIn className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Category badge */}
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/80 border border-pink-100/60 text-pink-600 text-xs backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {item.category}
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24">
            <div className="w-20 h-20 rounded-full bg-pink-50 border border-pink-200 flex items-center justify-center mx-auto mb-4">
              <Camera className="w-8 h-8 text-pink-300" />
            </div>
            <p className="text-gray-400 text-lg">No images in this category</p>
            <button
              onClick={() => setActiveCategory("All")}
              className="mt-4 px-6 py-2.5 rounded-full bg-pink-50 border border-pink-200 text-pink-600 hover:bg-pink-100 transition-all text-sm"
            >
              View All Photos
            </button>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="p-12 rounded-3xl bg-gradient-to-br from-rose-50 via-pink-50 to-fuchsia-50 border border-pink-200/60 shadow-xl shadow-pink-100/30">
            <Sparkles className="w-8 h-8 text-pink-400 mx-auto mb-4" />
            <h2 style={SERIF} className="text-3xl lg:text-4xl font-semibold text-gray-900 mb-4">
              Ready to Experience AURA?
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto mb-8">
              Book your appointment today and discover why thousands choose AURA 
              for their wellness journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/booking"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#EC4899] to-[#A855F7] text-white font-medium hover:opacity-90 hover:shadow-xl hover:shadow-pink-300/30 transition-all group"
              >
                Book Your Visit
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white border border-pink-200 text-gray-700 hover:text-pink-600 hover:border-pink-300 hover:bg-pink-50 transition-all"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox with Navigation */}
      {lightboxItem && lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-2xl p-4"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close */}
          <button
            className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-all z-20 backdrop-blur-md"
            onClick={() => setLightboxIndex(null)}
          >
            <X className="w-5 h-5" />
          </button>

          {/* Counter */}
          <div className="absolute top-6 left-6 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm backdrop-blur-md z-20">
            {lightboxIndex + 1} / {filtered.length}
          </div>

          {/* Previous */}
          {lightboxIndex > 0 && (
            <button
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-all z-20 backdrop-blur-md"
              onClick={(e) => { e.stopPropagation(); setLightboxIndex(lightboxIndex - 1); }}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {/* Next */}
          {lightboxIndex < filtered.length - 1 && (
            <button
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-all z-20 backdrop-blur-md"
              onClick={(e) => { e.stopPropagation(); setLightboxIndex(lightboxIndex + 1); }}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}

          {/* Image */}
          <div
            className="max-w-5xl w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50"
            onClick={(e) => e.stopPropagation()}
          >
            <ImageWithFallback
              src={lightboxItem.image}
              alt={lightboxItem.title}
              className="w-full max-h-[75vh] object-cover"
            />
            <div className="p-6 bg-white/95 backdrop-blur-xl border-t border-pink-100/50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 style={SERIF} className="text-gray-900 font-semibold text-lg">{lightboxItem.title}</h3>
                  <p className="text-pink-500 text-sm mt-0.5">{lightboxItem.category}</p>
                </div>
                <div className="flex gap-2">
                  <button className="p-2.5 rounded-xl bg-pink-50 border border-pink-200 text-pink-400 hover:text-pink-600 hover:bg-pink-100 transition-all">
                    <Heart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
