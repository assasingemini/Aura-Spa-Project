import Link from "next/link";
import { ArrowRight, Award, Heart, Leaf, Star, Sparkles, Shield, Clock, Users, MapPin, Calendar } from "lucide-react";
import { specialists, testimonials, customerReviews, IMAGES } from "../../data/mockData";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";

const SERIF = { fontFamily: "'Playfair Display', serif" };

function SectionBadge({ label }: { label: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFC5C1]/20 border border-[#FEAEA7]/50 text-[#FF9689] text-sm mb-6">
      <Sparkles className="w-3.5 h-3.5" />
      {label}
    </div>
  );
}

function GradientText({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-gradient-to-r from-[#FF9689] to-[#FFC6A4] bg-clip-text text-transparent">
      {children}
    </span>
  );
}

export function AboutPage() {
  const spaGalleryImages = [
    { src: IMAGES.spaReception, title: "Elegant Reception", desc: "Warm welcome in luxury" },
    { src: IMAGES.treatmentRoom, title: "Treatment Rooms", desc: "Private & serene spaces" },
    { src: IMAGES.relaxLounge, title: "Relaxation Lounge", desc: "Peaceful retreat area" },
    { src: IMAGES.spaGarden, title: "Zen Garden", desc: "Nature-inspired tranquility" },
    { src: IMAGES.spaProducts, title: "Premium Products", desc: "World-class skincare" },
    { src: IMAGES.spaCandles, title: "Aromatherapy Corner", desc: "Soothing ambiance" },
    { src: IMAGES.spaStones, title: "Hot Stone Station", desc: "Therapeutic warmth" },
    { src: IMAGES.spaFlowers, title: "Floral Details", desc: "Beauty in every corner" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFD6BE]/30 via-white to-[#FEAEA7]/20 pt-24">
      {/* ── Hero ── */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback src={IMAGES.elegantSpa} alt="About AURA" className="w-full h-full object-cover opacity-12" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FFD6BE]/70 via-[#FFC5C1]/50 to-white" />
        </div>
        {/* Decorative orbs */}
        <div className="absolute top-10 right-1/4 w-80 h-80 bg-[#FF9689]/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 left-1/4 w-64 h-64 bg-[#FFC6A4]/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="max-w-2xl">
            <SectionBadge label="Our Story" />
            <h1 style={SERIF} className="text-5xl lg:text-7xl font-semibold text-gray-900 leading-tight mb-6">
              Where Luxury{" "}
              <GradientText>Meets</GradientText>{" "}
              Transformation
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed">
              Born from a passion for authentic beauty and holistic wellness, AURA was created to be more than a spa — it's a sanctuary for those who seek the extraordinary.
            </p>
          </div>
        </div>
      </section>

      {/* ── Brand Story with Timeline ── */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-4 h-4 text-[#FF9689]" />
              <span className="text-[#FF9689] text-sm uppercase tracking-wider font-semibold">Founded 2018</span>
            </div>
            <h2 style={SERIF} className="text-4xl font-semibold text-gray-900 mt-2 mb-6">
              A Vision of <GradientText>Refined Luxury</GradientText>
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
                <div key={stat.label} className="p-4 rounded-xl bg-white border border-[#FFC5C1]/50 text-center shadow-sm shadow-[#FEAEA7]/20 hover:shadow-lg hover:shadow-[#FEAEA7]/30 transition-all duration-300">
                  <p style={SERIF} className="text-2xl font-semibold bg-gradient-to-r from-[#FF9689] to-[#FFC6A4] bg-clip-text text-transparent">
                    {stat.value}
                  </p>
                  <p className="text-gray-400 text-xs mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl overflow-hidden border border-[#FFC5C1]/50 shadow-xl shadow-[#FEAEA7]/20">
              <ImageWithFallback src={IMAGES.aromatherapy} alt="AURA Spa" className="w-full h-[500px] object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 p-6 rounded-2xl bg-white border border-[#FFC5C1]/50 shadow-xl shadow-[#FEAEA7]/30 max-w-xs">
              <div className="flex gap-1 mb-2">
                {[1,2,3,4,5].map((i) => <Star key={i} className="w-4 h-4 fill-[#FF9689] text-[#FF9689]" />)}
              </div>
              <p style={SERIF} className="text-gray-900 font-medium">"The finest spa experience in New York."</p>
              <p className="text-gray-400 text-xs mt-2">— Luxury Travel & Lifestyle Magazine</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Quality & Standards ── */}
      <section className="py-24 bg-gradient-to-br from-[#FFD6BE]/20 via-[#FFC5C1]/15 to-[#FEAEA7]/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <SectionBadge label="Our Standards" />
            <h2 style={SERIF} className="text-4xl lg:text-5xl font-semibold text-gray-900 mb-4">
              Uncompromising <GradientText>Quality</GradientText>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Every detail at AURA is meticulously curated to ensure the highest standards of luxury, safety, and efficacy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: "Certified Therapists",
                desc: "All our specialists hold international certifications and undergo continuous training with industry leaders.",
                highlight: "100% Certified",
              },
              {
                icon: Award,
                title: "Premium Products",
                desc: "We exclusively use clinical-grade, organic products from the world's most trusted skincare brands.",
                highlight: "12 Award-Winning Brands",
              },
              {
                icon: Heart,
                title: "Hygienic Standards",
                desc: "Medical-grade sterilization protocols and single-use premium materials ensure your complete safety.",
                highlight: "5-Star Hygiene Rating",
              },
              {
                icon: Leaf,
                title: "Eco-Conscious",
                desc: "Sustainable, cruelty-free ingredients and eco-friendly practices are at the core of everything we do.",
                highlight: "100% Cruelty-Free",
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="p-8 rounded-2xl bg-white border border-[#FFC5C1]/50 hover:border-[#FF9689]/50 hover:shadow-lg hover:shadow-[#FEAEA7]/30 transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FFC5C1]/40 to-[#FFD6BE]/30 border border-[#FEAEA7]/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-[#FF9689]" />
                  </div>
                  <h3 style={SERIF} className="text-gray-900 text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{item.desc}</p>
                  <span className="inline-flex px-3 py-1 rounded-full bg-[#FFC5C1]/20 border border-[#FEAEA7]/50 text-[#FF9689] text-xs font-medium">
                    {item.highlight}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Spa Atmosphere Gallery ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <SectionBadge label="Our Space" />
            <h2 style={SERIF} className="text-4xl lg:text-5xl font-semibold text-gray-900 mb-4">
              A Sanctuary of <GradientText>Elegance</GradientText>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Step into a world where every detail has been crafted to inspire calm, beauty, and transformation.
            </p>
          </div>

          {/* Masonry-style gallery grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {spaGalleryImages.map((img, i) => {
              const isLarge = i === 0 || i === 5;
              return (
                <div
                  key={i}
                  className={`group relative rounded-2xl overflow-hidden border border-[#FFC5C1]/50 hover:border-[#FF9689]/50 hover:shadow-xl hover:shadow-[#FEAEA7]/30 transition-all duration-500 ${
                    isLarge ? "md:col-span-2 md:row-span-2" : ""
                  }`}
                >
                  <div className={`relative overflow-hidden ${isLarge ? "aspect-square" : "aspect-[4/5]"}`}>
                    <ImageWithFallback
                      src={img.src}
                      alt={img.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <h3 style={SERIF} className="text-white text-lg font-semibold">{img.title}</h3>
                    <p className="text-white/70 text-xs mt-1">{img.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Philosophy ── */}
      <section className="py-24 bg-gradient-to-br from-[#FFD6BE]/20 via-[#FFC5C1]/15 to-[#FEAEA7]/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <SectionBadge label="Our Philosophy" />
            <h2 style={SERIF} className="text-4xl lg:text-5xl font-semibold text-gray-900 mb-4">
              The AURA{" "}
              <GradientText>Principles</GradientText>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Award,
                title: "Uncompromising Excellence",
                desc: "We source only the finest ingredients and technologies. Every product, every tool, every technique must meet our exacting standards before it reaches our clients.",
              },
              {
                icon: Heart,
                title: "Holistic Approach",
                desc: "True beauty radiates from within. Our treatments address the whole person — body, mind, and spirit — to create transformation that is lasting and profound.",
              },
              {
                icon: Leaf,
                title: "Conscious Luxury",
                desc: "We believe luxury and responsibility are not mutually exclusive. Our commitment to sustainable, cruelty-free ingredients is as strong as our commitment to results.",
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="p-8 rounded-2xl bg-white border border-[#FFC5C1]/50 hover:border-[#FF9689]/50 hover:shadow-lg hover:shadow-[#FEAEA7]/30 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FFC5C1]/40 to-[#FFD6BE]/30 border border-[#FEAEA7]/50 flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-[#FF9689]" />
                  </div>
                  <h3 style={SERIF} className="text-gray-900 text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <SectionBadge label="Meet the Team" />
            <h2 style={SERIF} className="text-4xl lg:text-5xl font-semibold text-gray-900 mb-4">
              Our{" "}
              <GradientText>Specialists</GradientText>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              World-class experts handpicked for their exceptional skill, passion, and dedication to transformative results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {specialists.map((spec) => (
              <div key={spec.id} className="group text-center">
                <div className="relative mx-auto w-48 h-48 rounded-full overflow-hidden mb-5 border-2 border-[#FFC5C1]/50 group-hover:border-[#FF9689]/60 group-hover:shadow-xl group-hover:shadow-[#FEAEA7]/30 transition-all duration-500">
                  <ImageWithFallback
                    src={spec.image}
                    alt={spec.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#FF9689]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 style={SERIF} className="text-gray-900 text-xl font-semibold mb-1">{spec.name}</h3>
                <p className="text-[#FF9689] text-sm mb-2">{spec.role}</p>
                <p className="text-gray-400 text-xs mb-4">{spec.experience} experience</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {spec.specialties.map((s) => (
                    <span key={s} className="px-2.5 py-1 rounded-full bg-[#FFC5C1]/20 border border-[#FEAEA7]/50 text-[#FF9689] text-xs">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Customer Feedback ── */}
      <section className="py-24 bg-gradient-to-br from-[#FFD6BE]/20 via-[#FFC5C1]/15 to-[#FEAEA7]/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <SectionBadge label="Customer Feedback" />
            <h2 style={SERIF} className="text-4xl lg:text-5xl font-semibold text-gray-900 mb-4">
              What Our Clients <GradientText>Say</GradientText>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Thousands of satisfied clients trust AURA for their wellness journey. Here are some of their stories.
            </p>
          </div>

          {/* Featured testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {customerReviews.map((review) => (
              <div
                key={review.id}
                className="p-8 rounded-2xl bg-white border border-[#FFC5C1]/50 hover:border-[#FF9689]/50 hover:shadow-lg hover:shadow-[#FEAEA7]/30 transition-all duration-300"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#FF9689] text-[#FF9689]" />
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed mb-6 text-sm italic">"{review.quote}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-[#FEAEA7]/30">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF9689] to-[#FFC6A4] flex items-center justify-center text-white text-sm font-semibold shadow-sm shadow-[#FF9689]/30">
                    {review.avatar}
                  </div>
                  <div>
                    <p className="text-gray-900 text-sm font-medium">{review.name}</p>
                    <p className="text-gray-400 text-xs">{review.treatment} · {review.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            {[
              { icon: Users, label: "15,000+ Happy Clients" },
              { icon: Star, label: "4.9/5 Average Rating" },
              { icon: Award, label: "12 Industry Awards" },
              { icon: MapPin, label: "New York's #1 Spa" },
            ].map((badge, i) => {
              const Icon = badge.icon;
              return (
                <div key={i} className="flex items-center gap-2 px-5 py-3 rounded-full bg-white border border-[#FFC5C1]/50 shadow-sm shadow-[#FEAEA7]/10">
                  <Icon className="w-4 h-4 text-[#FF9689]" />
                  <span className="text-gray-600 text-sm font-medium">{badge.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="relative rounded-3xl overflow-hidden p-16 text-center bg-gradient-to-br from-white via-[#FFC5C1]/20 to-[#FFD6BE]/20 border border-[#FEAEA7]/50 shadow-lg shadow-[#FEAEA7]/20">
            {/* Decorative elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-[#FF9689]/50 to-transparent" />
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-[#FFC5C1]/60 to-transparent rounded-br-full" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-[#FFD6BE]/60 to-transparent rounded-tl-full" />

            <div className="relative z-10">
              <SectionBadge label="Your Journey Begins" />
              <h2 style={SERIF} className="text-4xl font-semibold text-gray-900 mb-4">
                Begin Your{" "}
                <GradientText>Journey</GradientText>
              </h2>
              <p className="text-gray-500 mb-8 max-w-lg mx-auto">
                We invite you to experience the AURA difference. Your transformation awaits.
              </p>
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-gradient-to-r from-[#FF9689] to-[#FFC6A4] text-white font-medium hover:opacity-90 hover:shadow-xl hover:shadow-[#FF9689]/30 transition-all group"
              >
                Book Your First Treatment
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
