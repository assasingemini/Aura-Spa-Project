import { Link } from "react-router";
import { ArrowRight, Award, Heart, Leaf, Star, Sparkles } from "lucide-react";
import { specialists, IMAGES } from "../../data/mockData";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";

const SERIF = { fontFamily: "'Playfair Display', serif" };

export function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50/60 via-pink-50/30 to-white pt-24">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback src={IMAGES.elegantSpa} alt="About AURA" className="w-full h-full object-cover opacity-12" />
          <div className="absolute inset-0 bg-gradient-to-b from-rose-50/85 via-pink-50/70 to-rose-50" />
        </div>
        {/* Decorative orbs */}
        <div className="absolute top-10 right-1/4 w-80 h-80 bg-pink-200/25 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-1/4 w-64 h-64 bg-purple-200/20 rounded-full blur-3xl" />

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
              Born from a passion for authentic beauty and holistic wellness, AURA was created to be more than a spa — it's a sanctuary for those who seek the extraordinary.
            </p>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-pink-500 text-sm uppercase tracking-wider">Founded 2018</span>
            <h2 style={SERIF} className="text-4xl font-semibold text-gray-900 mt-2 mb-6">
              A Vision of Refined Luxury
            </h2>
            <div className="space-y-4 text-gray-500 leading-relaxed">
              <p>
                AURA was founded with a singular vision: to create a haven where the world's most refined beauty traditions meet modern science and uncompromising luxury. Our journey began when founder Élise Beaumont returned from studying advanced aesthetics in Paris, Switzerland, and Japan.
              </p>
              <p>
                She envisioned a space that would honor the ancient rituals of beauty and healing while embracing cutting-edge innovations. A place where every treatment would be a deeply personal journey, crafted with intention, knowledge, and genuine care.
              </p>
              <p>
                Today, AURA stands as New York's premier luxury spa destination, serving clients who demand nothing less than perfection. Our philosophy is simple: true beauty emerges when the body, mind, and spirit are in harmony.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-6">
              {[
                { value: "8+", label: "Years of Excellence" },
                { value: "15K+", label: "Clients Served" },
                { value: "12", label: "Awards Won" },
              ].map((stat) => (
                <div key={stat.label} className="p-4 rounded-xl bg-white border border-pink-100 text-center shadow-sm shadow-pink-50/60">
                  <p style={SERIF} className="text-2xl font-semibold bg-gradient-to-r from-[#EC4899] to-[#A855F7] bg-clip-text text-transparent">
                    {stat.value}
                  </p>
                  <p className="text-gray-400 text-xs mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl overflow-hidden border border-pink-100 shadow-xl shadow-pink-100/30">
              <ImageWithFallback src={IMAGES.aromatherapy} alt="AURA Spa" className="w-full h-[500px] object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 p-6 rounded-2xl bg-white border border-pink-100 shadow-xl shadow-pink-100/50 max-w-xs">
              <div className="flex gap-1 mb-2">
                {[1,2,3,4,5].map((i) => <Star key={i} className="w-4 h-4 fill-[#EC4899] text-[#EC4899]" />)}
              </div>
              <p style={SERIF} className="text-gray-900 font-medium">"The finest spa experience in New York."</p>
              <p className="text-gray-400 text-xs mt-2">— Luxury Travel & Lifestyle Magazine</p>
            </div>
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
                <div key={i} className="p-8 rounded-2xl bg-white border border-pink-100 hover:border-pink-300/50 hover:shadow-lg hover:shadow-pink-100/40 transition-all duration-300">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} border border-pink-200/50 flex items-center justify-center mb-6`}>
                    <Icon className="w-6 h-6 text-[#EC4899]" />
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
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-5 border border-pink-100 group-hover:border-pink-300/50 hover:shadow-xl hover:shadow-pink-100/40 transition-all duration-500">
                  <ImageWithFallback
                    src={spec.image}
                    alt={spec.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-rose-900/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex flex-wrap gap-1">
                      {spec.specialties.slice(0, 2).map((s) => (
                        <span key={s} className="px-2 py-0.5 rounded-full bg-white/80 text-pink-700 text-xs backdrop-blur-sm border border-pink-200/60">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <h3 style={SERIF} className="text-gray-900 text-xl font-semibold mb-1">{spec.name}</h3>
                <p className="text-pink-500 text-sm mb-2">{spec.role}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{spec.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-rose-50/60 via-pink-50/50 to-fuchsia-50/30">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 style={SERIF} className="text-4xl font-semibold text-gray-900 mb-4">
            Begin Your{" "}
            <span className="bg-gradient-to-r from-[#EC4899] to-[#A855F7] bg-clip-text text-transparent">
              Journey
            </span>
          </h2>
          <p className="text-gray-500 mb-8">
            We invite you to experience the AURA difference. Your transformation awaits.
          </p>
          <Link
            to="/booking"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-gradient-to-r from-[#EC4899] to-[#A855F7] text-white font-medium hover:opacity-90 hover:shadow-xl hover:shadow-pink-300/30 transition-all group"
          >
            Book Your First Treatment
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
