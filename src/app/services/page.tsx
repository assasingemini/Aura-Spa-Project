"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock, Star, Filter, CheckCircle, Sparkles, X } from "lucide-react";
import { services, IMAGES } from "../data/mockData";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const SERIF = { fontFamily: "'Playfair Display', serif" };

const CATEGORIES = ["All", "Facial Treatments", "Massage Therapy", "Body Treatments", "Holistic Wellness", "Hand & Nail", "Water Therapy"];

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

  const filtered = activeCategory === "All" ? services : services.filter((s) => s.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50/60 via-pink-50/30 to-white pt-24">
      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-br from-pink-50/80 via-rose-50/60 to-fuchsia-50/40 border-b border-pink-100 overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback src={IMAGES.pool} alt="Services" className="w-full h-full object-cover opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-pink-50/80 to-rose-50/90" />
        </div>
        {/* Decorative orbs */}
        <div className="absolute top-10 right-20 w-64 h-64 bg-pink-200/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 left-20 w-48 h-48 bg-purple-200/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: "1s" }} />
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
          <div className="flex items-center gap-3 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
            <Filter className="w-4 h-4 text-pink-300 shrink-0" />
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-5 py-2 rounded-full text-sm transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-[#EC4899] to-[#A855F7] text-white shadow-md shadow-pink-300/30 scale-105"
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
          {filtered.map((service, idx) => (
            <div
              key={service.id}
              className="group rounded-2xl overflow-hidden bg-white border border-pink-100 hover:border-pink-300/60 hover:shadow-2xl hover:shadow-pink-100/50 transition-all duration-500 cursor-pointer hover:-translate-y-1"
              onClick={() => setSelectedService(service)}
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="aspect-video relative overflow-hidden">
                <ImageWithFallback
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#EC4899]/90 to-[#A855F7]/90 text-white text-xs backdrop-blur-sm shadow-lg">
                  {service.category}
                </span>
                {service.featured && (
                  <span className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-white/90 border border-pink-200 text-pink-600 text-xs backdrop-blur-sm shadow-sm">
                    Featured ✨
                  </span>
                )}
                {/* Price badge on image */}
                <div className="absolute bottom-4 right-4">
                  <span style={SERIF} className="px-4 py-2 rounded-full bg-white/95 backdrop-blur-sm text-gray-900 text-lg font-semibold shadow-lg border border-pink-100">
                    ${service.price}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 style={SERIF} className="text-gray-900 text-2xl font-semibold mb-2 group-hover:text-pink-600 transition-colors">{service.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">{service.shortDescription}</p>

                {/* Service details bar */}
                <div className="flex items-center gap-4 mb-4 p-3 rounded-xl bg-gradient-to-r from-pink-50/80 to-purple-50/50 border border-pink-100/60">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-pink-400" />
                    <span className="text-gray-600 text-sm font-medium">{service.duration}</span>
                  </div>
                  <div className="w-px h-4 bg-pink-200" />
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-[#EC4899] text-[#EC4899]" />
                    <span className="text-gray-600 text-sm font-medium">4.9</span>
                  </div>
                  <div className="w-px h-4 bg-pink-200" />
                  <span style={SERIF} className="text-gray-900 text-lg font-semibold ml-auto">${service.price}</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-5">
                  {service.benefits.slice(0, 3).map((b) => (
                    <span key={b} className="flex items-center gap-1 text-gray-500 text-xs bg-pink-50/60 px-2 py-1 rounded-full border border-pink-100/50">
                      <CheckCircle className="w-3 h-3 text-[#EC4899]" /> {b}
                    </span>
                  ))}
                </div>

                <Link
                  href="/booking"
                  onClick={(e) => e.stopPropagation()}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-gradient-to-r from-[#EC4899] to-[#A855F7] text-white text-sm font-medium hover:opacity-90 hover:shadow-lg hover:shadow-pink-300/30 transition-all group/btn"
                >
                  Book This Treatment
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Highlight */}
      <section className="py-16 bg-gradient-to-br from-rose-50/60 via-pink-50/40 to-fuchsia-50/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-50 border border-pink-200/70 text-pink-600 text-sm mb-6">
            <Sparkles className="w-3.5 h-3.5" /> Special Offer
          </div>
          <h2 style={SERIF} className="text-4xl font-semibold text-gray-900 mb-4">
            First Visit?{" "}
            <span className="bg-gradient-to-r from-[#EC4899] to-[#A855F7] bg-clip-text text-transparent">
              20% Off
            </span>
          </h2>
          <p className="text-gray-500 mb-8 max-w-lg mx-auto">
            Experience the AURA difference with 20% off your first treatment. Because everyone deserves to feel extraordinary.
          </p>
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-gradient-to-r from-[#EC4899] to-[#A855F7] text-white font-medium hover:opacity-90 hover:shadow-xl hover:shadow-pink-300/30 transition-all group"
          >
            Book Your First Visit
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Detail Modal */}
      {selectedService && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md"
          onClick={() => setSelectedService(null)}
        >
          <div
            className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-2xl bg-white border border-pink-100 shadow-2xl shadow-pink-200/40"
            onClick={(e) => e.stopPropagation()}
            style={{ scrollbarWidth: "thin" }}
          >
            <div className="aspect-video relative overflow-hidden rounded-t-2xl">
              <ImageWithFallback src={selectedService.image} alt={selectedService.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/20 to-transparent" />
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 border border-pink-100 flex items-center justify-center text-gray-600 hover:bg-pink-50 hover:text-pink-600 transition-all shadow-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-8">
              <span className="text-pink-500 text-sm uppercase tracking-wider font-medium">{selectedService.category}</span>
              <h2 style={SERIF} className="text-gray-900 text-3xl font-semibold mt-1 mb-4">{selectedService.title}</h2>

              {/* Info bar */}
              <div className="flex items-center gap-6 mb-6 p-4 rounded-xl bg-gradient-to-r from-pink-50 to-purple-50/50 border border-pink-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-pink-500" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs">Duration</p>
                    <p className="text-gray-800 text-sm font-medium">{selectedService.duration}</p>
                  </div>
                </div>
                <div className="w-px h-10 bg-pink-200" />
                <div>
                  <p className="text-gray-400 text-xs">Price</p>
                  <p style={SERIF} className="text-2xl text-gray-900 font-semibold">${selectedService.price}</p>
                </div>
                <div className="w-px h-10 bg-pink-200" />
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-[#EC4899] text-[#EC4899]" />
                  <Star className="w-4 h-4 fill-[#EC4899] text-[#EC4899]" />
                  <Star className="w-4 h-4 fill-[#EC4899] text-[#EC4899]" />
                  <Star className="w-4 h-4 fill-[#EC4899] text-[#EC4899]" />
                  <Star className="w-4 h-4 fill-[#EC4899] text-[#EC4899]" />
                </div>
              </div>

              <p className="text-gray-500 leading-relaxed mb-8">{selectedService.description}</p>

              <div className="mb-8">
                <h4 style={SERIF} className="text-gray-900 text-lg font-semibold mb-4">Treatment Benefits</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedService.benefits.map((b) => (
                    <div key={b} className="flex items-center gap-3 p-3 rounded-xl bg-pink-50/60 border border-pink-100/50">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#EC4899] to-[#A855F7] flex items-center justify-center shrink-0">
                        <CheckCircle className="w-3.5 h-3.5 text-white" />
                      </div>
                      <span className="text-gray-600 text-sm">{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href="/booking"
                className="w-full flex items-center justify-center gap-2 py-4 rounded-full bg-gradient-to-r from-[#EC4899] to-[#A855F7] text-white font-medium hover:opacity-90 hover:shadow-xl hover:shadow-pink-300/30 transition-all"
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
