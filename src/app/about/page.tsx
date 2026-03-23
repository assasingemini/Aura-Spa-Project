"use client";

import Link from "next/link";
import { ArrowRight, Award, Heart, Leaf, Star, Sparkles, Shield, Clock, Users, Quote, CheckCircle } from "lucide-react";
import { specialists, testimonials, IMAGES } from "../data/mockData";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const SERIF = { fontFamily: "'Playfair Display', serif" };

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50/60 via-pink-50/30 to-white pt-24">
      {/* Hero */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback src={IMAGES.elegantSpa} alt="About AURA" className="w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-b from-rose-50/85 via-pink-50/70 to-rose-50" />
        </div>
        {/* Decorative orbs */}
        <div className="absolute top-10 right-1/4 w-80 h-80 bg-pink-200/25 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 left-1/4 w-64 h-64 bg-purple-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-50 border border-pink-200/70 text-pink-600 text-sm mb-6">
              <Sparkles className="w-3.5 h-3.5" /> Our Story
            </div>
            <h1 style={SERIF} className="text-5xl lg:text-7xl font-semibold text-gray-900 leading-tight mb-6">
              Where Luxury{" "}
              <span className="bg-gradient-to-r from-[#EC4899] to-[#A855F7] bg-clip-text text-transparent">
                Meets
              </span>{" "}
              Transformation
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed">
              Born from a passion for authentic beauty and holistic wellness, AURA was created to be more than a spa — it&apos;s a sanctuary for those who seek the extraordinary.
            </p>
          </div>
        </div>
      </section>

      {/* Brand Story + Founding */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className="inline-flex items-center gap-2 text-pink-500 text-sm uppercase tracking-wider font-medium mb-2">
              <Clock className="w-4 h-4" /> Founded 2018
            </span>
            <h2 style={SERIF} className="text-4xl font-semibold text-gray-900 mt-2 mb-6">
              A Vision of Refined Luxury
            </h2>
            <div className="space-y-4 text-gray-500 leading-relaxed">
              <p>
                AURA was founded with a singular vision: to create a haven where the world&apos;s most refined beauty traditions meet modern science and uncompromising luxury. Our journey began when founder <strong className="text-gray-700">Élise Beaumont</strong> returned from studying advanced aesthetics in Paris, Switzerland, and Japan.
              </p>
              <p>
                She envisioned a space that would honor the ancient rituals of beauty and healing while embracing cutting-edge innovations. A place where every treatment would be a deeply personal journey, crafted with intention, knowledge, and genuine care.
              </p>
              <p>
                Today, AURA stands as New York&apos;s premier luxury spa destination, serving clients who demand nothing less than perfection. Our philosophy is simple: true beauty emerges when the body, mind, and spirit are in harmony.
              </p>
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { value: "8+", label: "Years of Excellence", icon: Award },
                { value: "15K+", label: "Clients Served", icon: Users },
                { value: "12", label: "Awards Won", icon: Star },
              ].map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="p-4 rounded-xl bg-white border border-pink-100 text-center shadow-sm shadow-pink-50/60 hover:shadow-lg hover:shadow-pink-100/40 hover:-translate-y-0.5 transition-all duration-300">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-100 to-purple-50 border border-pink-200/50 flex items-center justify-center mx-auto mb-2">
                      <Icon className="w-4 h-4 text-[#EC4899]" />
                    </div>
                    <p style={SERIF} className="text-2xl font-semibold bg-gradient-to-r from-[#EC4899] to-[#A855F7] bg-clip-text text-transparent">
                      {stat.value}
                    </p>
                    <p className="text-gray-400 text-xs mt-1">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl overflow-hidden border border-pink-100 shadow-xl shadow-pink-100/30">
              <ImageWithFallback src={IMAGES.aromatherapy} alt="AURA Spa" className="w-full h-[500px] object-cover" />
            </div>
            {/* Floating quote card */}
            <div className="absolute -bottom-6 -left-6 p-6 rounded-2xl bg-white border border-pink-100 shadow-xl shadow-pink-100/50 max-w-xs">
              <div className="flex gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-4 h-4 fill-[#EC4899] text-[#EC4899]" />)}
              </div>
              <p style={SERIF} className="text-gray-900 font-medium italic">&quot;The finest spa experience in New York.&quot;</p>
              <p className="text-gray-400 text-xs mt-2">— Luxury Travel & Lifestyle Magazine</p>
            </div>
            {/* Floating founder badge */}
            <div className="absolute -top-4 -right-4 px-4 py-3 rounded-xl bg-gradient-to-r from-[#EC4899] to-[#A855F7] text-white shadow-xl shadow-pink-300/40">
              <p className="text-xs font-medium opacity-80">Founder</p>
              <p style={SERIF} className="text-sm font-semibold">Élise Beaumont</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Standards */}
      <section className="py-20 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <h2 style={SERIF} className="text-4xl font-semibold text-white mb-4">
              Our Commitment to{" "}
              <span className="bg-gradient-to-r from-[#EC4899] to-[#A855F7] bg-clip-text text-transparent">
                Excellence
              </span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Every detail at AURA is designed with purpose and care.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: "Certified Experts", desc: "All therapists are internationally certified with 8+ years average experience" },
              { icon: Leaf, title: "Organic Products", desc: "100% cruelty-free, sustainably sourced ingredients from around the world" },
              { icon: Award, title: "Award-Winning", desc: "12 industry awards including Best Luxury Spa NYC 2024 & 2025" },
              { icon: Heart, title: "Personalized Care", desc: "Every treatment is customized to your unique skin type and wellness goals" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-pink-400/30 transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#EC4899]/20 to-[#A855F7]/20 border border-pink-400/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-pink-400" />
                  </div>
                  <h3 style={SERIF} className="text-white text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 bg-gradient-to-br from-rose-50/60 via-pink-50/40 to-fuchsia-50/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-50 border border-pink-200/70 text-pink-600 text-sm mb-6">
              <Sparkles className="w-3.5 h-3.5" /> Our Philosophy
            </div>
            <h2 style={SERIF} className="text-4xl lg:text-5xl font-semibold text-gray-900 mb-4">
              The AURA{" "}
              <span className="bg-gradient-to-r from-[#EC4899] to-[#A855F7] bg-clip-text text-transparent">
                Principles
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Award,
                title: "Uncompromising Excellence",
                desc: "We source only the finest ingredients and technologies. Every product, every tool, every technique must meet our exacting standards before it reaches our clients.",
                color: "from-pink-100 to-rose-50",
              },
              {
                icon: Heart,
                title: "Holistic Approach",
                desc: "True beauty radiates from within. Our treatments address the whole person — body, mind, and spirit — to create transformation that is lasting and profound.",
                color: "from-fuchsia-100 to-pink-50",
              },
              {
                icon: Leaf,
                title: "Conscious Luxury",
                desc: "We believe luxury and responsibility are not mutually exclusive. Our commitment to sustainable, cruelty-free ingredients is as strong as our commitment to results.",
                color: "from-purple-100 to-fuchsia-50",
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="p-8 rounded-2xl bg-white border border-pink-100 hover:border-pink-300/50 hover:shadow-xl hover:shadow-pink-100/40 hover:-translate-y-1 transition-all duration-300">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} border border-pink-200/50 flex items-center justify-center mb-6`}>
                    <Icon className="w-7 h-7 text-[#EC4899]" />
                  </div>
                  <h3 style={SERIF} className="text-gray-900 text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-50 border border-pink-200/70 text-pink-600 text-sm mb-6">
              <Sparkles className="w-3.5 h-3.5" /> Meet the Team
            </div>
            <h2 style={SERIF} className="text-4xl lg:text-5xl font-semibold text-gray-900 mb-4">
              Our{" "}
              <span className="bg-gradient-to-r from-[#EC4899] to-[#A855F7] bg-clip-text text-transparent">
                Specialists
              </span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              World-class experts handpicked for their exceptional skill, passion, and dedication to transformative results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {specialists.map((spec) => (
              <div key={spec.id} className="group">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-5 border border-pink-100 group-hover:border-pink-300/50 hover:shadow-2xl hover:shadow-pink-100/40 transition-all duration-500">
                  <ImageWithFallback
                    src={spec.image}
                    alt={spec.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-rose-900/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex flex-wrap gap-1">
                      {spec.specialties.slice(0, 2).map((s) => (
                        <span key={s} className="px-2.5 py-1 rounded-full bg-white/85 text-pink-700 text-xs backdrop-blur-sm border border-pink-200/60 shadow-sm">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  {/* Experience badge */}
                  <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#EC4899]/90 to-[#A855F7]/90 text-white text-xs backdrop-blur-sm shadow-lg">
                    {spec.experience}
                  </div>
                </div>
                <h3 style={SERIF} className="text-gray-900 text-xl font-semibold mb-1">{spec.name}</h3>
                <p className="text-pink-500 text-sm mb-2 font-medium">{spec.role}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{spec.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gradient-to-br from-rose-50/60 via-pink-50/40 to-fuchsia-50/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-50 border border-pink-200/70 text-pink-600 text-sm mb-6">
              <Sparkles className="w-3.5 h-3.5" /> Client Stories
            </div>
            <h2 style={SERIF} className="text-4xl lg:text-5xl font-semibold text-gray-900 mb-4">
              What Our Clients{" "}
              <span className="bg-gradient-to-r from-[#EC4899] to-[#A855F7] bg-clip-text text-transparent">
                Say
              </span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Real stories from real clients who have experienced the AURA transformation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.id} className="p-8 rounded-2xl bg-white border border-pink-100 hover:border-pink-300/50 hover:shadow-xl hover:shadow-pink-100/40 hover:-translate-y-1 transition-all duration-300 relative">
                {/* Quote icon */}
                <div className="absolute top-6 right-6">
                  <Quote className="w-8 h-8 text-pink-100" />
                </div>
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#EC4899] text-[#EC4899]" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">&quot;{t.text}&quot;</p>
                <div className="flex items-center gap-3 pt-4 border-t border-pink-100/60">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#EC4899] to-[#A855F7] flex items-center justify-center text-white text-sm font-semibold shadow-lg shadow-pink-200/40">
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-gray-900 text-sm font-semibold">{t.name}</p>
                    <p className="text-gray-400 text-xs">{t.service} · {t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-100/20 rounded-full blur-3xl" />
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-50 border border-pink-200/70 text-pink-600 text-sm mb-6">
            <Sparkles className="w-3.5 h-3.5" /> Start Today
          </div>
          <h2 style={SERIF} className="text-4xl lg:text-5xl font-semibold text-gray-900 mb-4">
            Begin Your{" "}
            <span className="bg-gradient-to-r from-[#EC4899] to-[#A855F7] bg-clip-text text-transparent">
              Journey
            </span>
          </h2>
          <p className="text-gray-500 mb-8 max-w-lg mx-auto text-lg">
            We invite you to experience the AURA difference. Your transformation awaits.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-gradient-to-r from-[#EC4899] to-[#A855F7] text-white font-medium hover:opacity-90 hover:shadow-xl hover:shadow-pink-300/30 transition-all group"
            >
              Book Your First Treatment
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-white border-2 border-pink-200 text-gray-700 font-medium hover:border-pink-400 hover:text-pink-600 hover:shadow-lg transition-all"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
