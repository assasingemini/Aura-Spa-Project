import { useState } from "react";
import { Link } from "react-router";
import { ArrowRight, Clock, Star, Filter, CheckCircle, Sparkles, X } from "lucide-react";
import { services, IMAGES } from "../../data/mockData";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";

const SERIF = { fontFamily: "'Playfair Display', serif" };

const CATEGORIES = ["All", "Facial Treatments", "Massage Therapy", "Body Treatments", "Holistic Wellness", "Hand & Nail", "Water Therapy"];

export function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

  const filtered = activeCategory === "All" ? services : services.filter((s) => s.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50/60 via-pink-50/30 to-white pt-24">
      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-br from-pink-50/80 via-rose-50/60 to-fuchsia-50/40 border-b border-pink-100">
        <div className="absolute inset-0">
          <ImageWithFallback src={IMAGES.pool} alt="Services" className="w-full h-full object-cover opacity-8" />
          <div className="absolute inset-0 bg-gradient-to-b from-pink-50/80 to-rose-50/90" />
        </div>
        {/* Blossom orbs */}
        <div className="absolute top-10 right-20 w-64 h-64 bg-pink-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-20 w-48 h-48 bg-purple-200/20 rounded-full blur-2xl" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-50 border border-pink-200/70 text-pink-600 text-sm mb-6">
            <Sparkles className="w-3.5 h-3.5" /> Our Treatments
          </div>
          <h1 style={SERIF} className="text-5xl lg:text-6xl font-semibold text-gray-900 mb-4">
            Luxury Treatments &{" "}
            <span className="bg-gradient-to-r from-[#EC4899] to-[#A855F7] bg-clip-text text-transparent">
              Services
            </span>
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto text-lg">
            Each treatment is a carefully crafted ritual designed to restore, rejuvenate, and transform.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-16 z-20 bg-white/95 backdrop-blur-xl border-b border-pink-100 py-4 shadow-sm shadow-pink-50/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide pb-1">
            <Filter className="w-4 h-4 text-pink-300 shrink-0" />
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
      </section>

      {/* Services Grid */}
      <section className="py-16 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((service) => (
            <div
              key={service.id}
              className="group rounded-2xl overflow-hidden bg-white border border-pink-100 hover:border-pink-300/60 hover:shadow-xl hover:shadow-pink-100/50 transition-all duration-400 cursor-pointer"
              onClick={() => setSelectedService(service)}
            >
              <div className="aspect-video relative overflow-hidden">
                <ImageWithFallback
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#EC4899]/90 to-[#A855F7]/90 text-white text-xs backdrop-blur-sm">
                  {service.category}
                </span>
                {service.featured && (
                  <span className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-white/90 border border-pink-200 text-pink-600 text-xs backdrop-blur-sm">
                    Featured ✨
                  </span>
                )}
              </div>

              <div className="p-6">
                <h3 style={SERIF} className="text-gray-900 text-2xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">{service.shortDescription}</p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {service.benefits.slice(0, 3).map((b) => (
                    <span key={b} className="flex items-center gap-1 text-gray-500 text-xs">
                      <CheckCircle className="w-3 h-3 text-[#EC4899]" /> {b}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-pink-100">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-pink-300" />
                      <span className="text-gray-500 text-sm">{service.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-[#EC4899] text-[#EC4899]" />
                      <span className="text-gray-500 text-sm">4.9</span>
                    </div>
                  </div>
                  <span style={SERIF} className="text-gray-900 text-xl font-semibold">${service.price}</span>
                </div>

                <Link
                  to="/booking"
                  onClick={(e) => e.stopPropagation()}
                  className="mt-5 w-full flex items-center justify-center gap-2 py-3 rounded-full bg-gradient-to-r from-[#EC4899] to-[#A855F7] text-white text-sm font-medium hover:opacity-90 hover:shadow-lg hover:shadow-pink-300/30 transition-all group"
                >
                  Book This Treatment
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Detail Modal */}
      {selectedService && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-md"
          onClick={() => setSelectedService(null)}
        >
          <div
            className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-2xl bg-white border border-pink-100 shadow-2xl shadow-pink-200/40"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-video relative overflow-hidden rounded-t-2xl">
              <ImageWithFallback src={selectedService.image} alt={selectedService.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent" />
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/90 border border-pink-100 flex items-center justify-center text-gray-600 hover:bg-pink-50 hover:text-pink-600 transition-colors shadow-sm"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-8">
              <span className="text-pink-500 text-sm uppercase tracking-wider">{selectedService.category}</span>
              <h2 style={SERIF} className="text-gray-900 text-3xl font-semibold mt-1 mb-3">{selectedService.title}</h2>

              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-pink-300" />
                  <span className="text-gray-500 text-sm">{selectedService.duration}</span>
                </div>
                <span style={SERIF} className="text-2xl text-gray-900 font-semibold">${selectedService.price}</span>
              </div>

              <p className="text-gray-500 leading-relaxed mb-6 text-sm">{selectedService.description}</p>

              <div className="mb-8">
                <h4 style={SERIF} className="text-gray-900 font-semibold mb-4">Treatment Benefits</h4>
                <div className="grid grid-cols-2 gap-3">
                  {selectedService.benefits.map((b) => (
                    <div key={b} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#EC4899] shrink-0" />
                      <span className="text-gray-500 text-sm">{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                to="/booking"
                className="w-full flex items-center justify-center gap-2 py-4 rounded-full bg-gradient-to-r from-[#EC4899] to-[#A855F7] text-white font-medium hover:opacity-90 hover:shadow-lg hover:shadow-pink-300/30 transition-all"
              >
                Book Now — ${selectedService.price}
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
