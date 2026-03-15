import { useState } from "react";
import { Link } from "react-router";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import {
  ArrowRight, Star, CheckCircle, Play, ChevronLeft, ChevronRight,
  Sparkles, Wind, Droplets, Zap, Heart, Clock, Award, Users
} from "lucide-react";
import { services, specialists, testimonials, blogPosts, pricingPackages, IMAGES } from "../../data/mockData";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";

const SERIF = { fontFamily: "'Playfair Display', serif" };

function GradientText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`bg-gradient-to-r from-[#FF9689] to-[#FFC6A4] bg-clip-text text-transparent ${className}`}>
      {children}
    </span>
  );
}

function SectionBadge({ label }: { label: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFC5C1]/20 border border-[#FEAEA7]/50 text-[#FF9689] text-sm mb-6">
      <Sparkles className="w-3.5 h-3.5" />
      {label}
    </div>
  );
}

// Custom Arrow Components for Slider
function SliderPrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <button
      className={`${className} !flex items-center justify-center !w-12 !h-12 !bg-white/90 hover:!bg-white !rounded-full !shadow-lg hover:!shadow-xl !transition-all !duration-300 !z-10 before:!hidden`}
      style={{ ...style, left: '20px' }}
      onClick={onClick}
      aria-label="Previous slide"
    >
      <ChevronLeft className="w-6 h-6 text-[#FF9689]" />
    </button>
  );
}

function SliderNextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <button
      className={`${className} !flex items-center justify-center !w-12 !h-12 !bg-white/90 hover:!bg-white !rounded-full !shadow-lg hover:!shadow-xl !transition-all !duration-300 !z-10 before:!hidden`}
      style={{ ...style, right: '20px' }}
      onClick={onClick}
      aria-label="Next slide"
    >
      <ChevronRight className="w-6 h-6 text-[#FF9689]" />
    </button>
  );
}

// ── Hero Slider ────────────────────────────────────────────────────────────────
function HeroSection() {
  const heroSlides = [
    {
      image: "https://images.unsplash.com/photo-1650532897813-d92427f7d229?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzcGElMjBpbnRlcmlvciUyMGVsZWdhbnQlMjByZWNlcHRpb258ZW58MXx8fHwxNzczNTg0MzgzfDA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "AURA Luxury Spa",
      subtitle: "Không gian thương hiệu đẳng cấp"
    },
    {
      image: "https://images.unsplash.com/photo-1752477225721-5f1b72f83b4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dGlmdWwlMjBhc2lhbiUyMG1vZGVsJTIwd2VsbG5lc3MlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzM1ODQzODd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Brand Ambassador",
      subtitle: "Đại sứ thương hiệu AURA"
    },
    {
      image: "https://images.unsplash.com/photo-1761718210055-e83ca7e2c9ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGElMjB0cmVhdG1lbnQlMjBwcm9mZXNzaW9uYWwlMjBoYW5kcyUyMGZhY2lhbHxlbnwxfHx8fDE3NzM1ODQzODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Professional Care",
      subtitle: "Chăm sóc chuyên nghiệp"
    }
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    fade: true,
    pauseOnHover: false,
    arrows: true,
    prevArrow: <SliderPrevArrow />,
    nextArrow: <SliderNextArrow />
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#FFD6BE]/30 via-[#FFC5C1]/20 to-[#FEAEA7]/20">
      {/* Hero Slider */}
      <div className="absolute inset-0">
        <Slider {...sliderSettings} className="h-full hero-slider">
          {heroSlides.map((slide, index) => (
            <div key={index} className="relative h-screen">
              <ImageWithFallback
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent" />
              <div className="absolute bottom-20 left-12 text-white z-10">
                <p className="text-sm uppercase tracking-widest mb-2 opacity-80">{slide.subtitle}</p>
                <h3 style={SERIF} className="text-3xl font-semibold">{slide.title}</h3>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Animated blossom orbs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#FF9689]/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-[#FFC6A4]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-[#FEAEA7]/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: "2s" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16">
        <div className="max-w-2xl">
          

          
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 z-20">
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-[#FF9689]" />
        <p className="text-[#FF9689] text-xs tracking-widest uppercase">Scroll</p>
      </div>
    </section>
  );
}

// ── Featured Treatments (Vertical Layout) ────────────────────────────────────
function FeaturedTreatments() {
  const featured = services.filter((s) => s.featured).slice(0, 4);
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <SectionBadge label="Our Signature Treatments" />
          <h2 style={SERIF} className="text-4xl lg:text-5xl font-semibold text-gray-900 mb-4">
            Curated for <GradientText>Exceptional</GradientText> Results
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
            Each treatment is a masterpiece, blending ancient wisdom with cutting-edge techniques for a truly transformative experience.
          </p>
        </div>

        <div className="flex flex-col gap-8">
          {featured.map((service, i) => (
            <div
              key={service.id}
              className="group relative rounded-2xl overflow-hidden cursor-pointer border border-[#FFC5C1]/50 hover:border-[#FF9689]/60 hover:shadow-xl hover:shadow-[#FEAEA7]/30 transition-all duration-500 flex flex-col md:flex-row bg-white"
            >
              <div className="w-full md:w-[45%] lg:w-1/2 aspect-video md:aspect-auto relative overflow-hidden">
                <ImageWithFallback
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 md:absolute md:inset-0"
                />
              </div>
              <div className="w-full md:w-[55%] lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center bg-white">
                <span className="text-[#FF9689] text-sm uppercase tracking-wider font-semibold">{service.category}</span>
                <h3 style={SERIF} className="text-gray-900 text-3xl font-semibold mt-3 mb-4 group-hover:text-[#FF9689] transition-colors">{service.title}</h3>
                <p className="text-gray-500 text-base mb-6 leading-relaxed">{service.description}</p>
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-[#FEAEA7]/30">
                  <span className="text-gray-600 font-medium flex items-center gap-2"><Clock className="w-4 h-4 text-[#FF9689]"/> {service.duration}</span>
                  <span className="text-gray-900 font-bold text-2xl">${service.price}</span>
                </div>
                <Link
                  to="/booking"
                  className="inline-flex items-center gap-2 text-[#FF9689] text-base group-hover:gap-3 transition-all font-medium self-start bg-[#FFC5C1]/20 px-6 py-3 rounded-full hover:bg-[#FF9689] hover:text-white"
                >
                  Book Appointment <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-[#FEAEA7] text-gray-600 hover:text-[#FF9689] hover:border-[#FF9689] hover:bg-[#FFC5C1]/20 transition-all duration-300 group"
          >
            View All Treatments
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ── Spa Gallery (Professional Space) ──────────────────────────────────────────
function SpaGallerySection() {
  const spaImages = [
    {
      image: "https://images.unsplash.com/photo-1700142360825-d21edc53c8db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGElMjBtYXNzYWdlJTIwdGhlcmFweSUyMHJvb218ZW58MXx8fHwxNzczNDk5Njk3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Tranquil Treatment Rooms"
    },
    {
      image: "https://images.unsplash.com/photo-1640791416299-25645e72d186?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc3NlbnRpYWwlMjBvaWxzJTIwYm90dGxlcyUyMHNwYSUyMG1hc3NhZ2V8ZW58MXx8fHwxNzczNTg1MzU2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Aromatherapy Blends"
    },
    {
      image: "https://images.unsplash.com/photo-1680163660834-fa4f67748e21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGElMjBob3QlMjBzdG9uZXMlMjBtYXNzYWdlJTIwdGhlcmFweXxlbnwxfHx8fDE3NzM1ODUzNTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Hot Stone Therapy"
    },
    {
      image: "https://images.unsplash.com/photo-1761718210089-ba3bb5ccb54f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWNpYWwlMjB0cmVhdG1lbnQlMjBtYXNrJTIwc2Fsb258ZW58MXx8fHwxNzczNTg1MzU3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Rejuvenating Facials"
    },
    {
      image: "https://images.unsplash.com/photo-1669281392832-9181a2b484af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGElMjBib2R5JTIwc2NydWIlMjBvcmdhbmljJTIwbmF0dXJhbHxlbnwxfHx8fDE3NzM1ODUzNTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Organic Body Scrubs"
    },
    {
      image: "https://images.unsplash.com/photo-1595788088802-0e32ff9306f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzcGElMjBqYWN1enppJTIwZmxvd2VyJTIwcGV0YWxzfGVufDF8fHx8MTc3MzU4NTM1N3ww&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Floral Hydrotherapy"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-[#FFD6BE]/30 via-[#FFC5C1]/20 to-[#FEAEA7]/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <SectionBadge label="Our Luxurious Space" />
          <h2 style={SERIF} className="text-4xl lg:text-5xl font-semibold text-gray-900 mb-4">
            Professional Spa, <GradientText>Elegant Sanctuary</GradientText>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Step into a world of luxury and tranquility. Our state-of-the-art facilities are designed to provide the ultimate wellness experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {spaImages.map((item, i) => (
            <div
              key={i}
              className="group relative rounded-2xl overflow-hidden border border-[#FFC5C1]/50 hover:border-[#FF9689]/60 hover:shadow-xl hover:shadow-[#FEAEA7]/30 transition-all duration-500"
            >
              <div className="aspect-[4/5] relative overflow-hidden">
                <ImageWithFallback
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <h3 style={SERIF} className="text-white text-xl font-semibold">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Service Categories ────────────────────────────────────────────────────────
function ServiceCategories() {
  const categories = [
    { icon: Sparkles, title: "Facial Treatments", desc: "Advanced skincare for radiant results", count: "12 treatments", color: "from-[#FFC5C1]/40 to-[#FFD6BE]/30" },
    { icon: Wind, title: "Massage Therapy", desc: "Deep relaxation for body and mind", count: "8 treatments", color: "from-[#FEAEA7]/40 to-[#FFC6A4]/30" },
    { icon: Droplets, title: "Holistic Wellness", desc: "Mind-body harmony through ancient rituals", count: "6 treatments", color: "from-[#FFD6BE]/40 to-[#FFC5C1]/30" },
    { icon: Zap, title: "Body Treatments", desc: "Full-body transformation rituals", count: "5 treatments", color: "from-[#FFC6A4]/40 to-[#FEAEA7]/30" },
    { icon: Heart, title: "Water Therapy", desc: "Healing hydrotherapy experiences", count: "4 treatments", color: "from-[#FFC5C1]/40 to-[#FFC6A4]/30" },
    { icon: Award, title: "Hand & Nail", desc: "Precision artistry for hands and nails", count: "6 treatments", color: "from-[#FEAEA7]/40 to-[#FFD6BE]/30" },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <SectionBadge label="Treatment Categories" />
          <h2 style={SERIF} className="text-4xl lg:text-5xl font-semibold text-gray-900 mb-4">
            Every <GradientText>Need</GradientText>, Perfectly Met
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <Link
                to="/services"
                key={i}
                className="group p-8 rounded-2xl bg-white border border-[#FFC5C1]/50 hover:border-[#FF9689]/60 hover:shadow-lg hover:shadow-[#FEAEA7]/40 transition-all duration-300 cursor-pointer"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} border border-[#FEAEA7]/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6 text-[#FF9689]" />
                </div>
                <h3 style={SERIF} className="text-gray-900 text-xl font-semibold mb-2">{cat.title}</h3>
                <p className="text-gray-500 text-sm mb-4 leading-relaxed">{cat.desc}</p>
                <span className="text-[#FF9689] text-xs uppercase tracking-wider">{cat.count}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── Before/After Gallery ──────────────────────────────────────────────────────
function BeforeAfterSection() {
  const pairs = [
    { before: IMAGES.skincare, after: IMAGES.glowingSkin, label: "Anti-Aging Facial Treatment" },
    { before: IMAGES.facial, after: IMAGES.elegantSpa, label: "Signature Rejuvenation Facial" },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <SectionBadge label="Visible Transformations" />
          <h2 style={SERIF} className="text-4xl lg:text-5xl font-semibold text-gray-900 mb-4">
            Real Results, <GradientText>Real Beauty</GradientText>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            The AURA difference is visible from your very first session. See the transformation our clients experience.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {pairs.map((pair, i) => (
            <div key={i} className="rounded-2xl overflow-hidden border border-pink-100 bg-white shadow-lg shadow-pink-50/60">
              <div className="grid grid-cols-2 gap-px bg-pink-100">
                <div className="relative aspect-[4/5]">
                  <ImageWithFallback src={pair.before} alt="Before" className="w-full h-full object-cover opacity-75" />
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-white/90 text-gray-600 text-xs backdrop-blur-sm border border-pink-100">Before</span>
                  </div>
                </div>
                <div className="relative aspect-[4/5]">
                  <ImageWithFallback src={pair.after} alt="After" className="w-full h-full object-cover" />
                  <div className="absolute bottom-4 right-4">
                    <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#EC4899] to-[#A855F7] text-white text-xs">After</span>
                  </div>
                </div>
              </div>
              <div className="p-5 bg-pink-50/40">
                <p style={SERIF} className="text-gray-800 font-medium">{pair.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Testimonials ─────────────────────────────────────────────────────────────
function TestimonialsSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-[#FFD6BE]/30 via-[#FFC5C1]/20 to-[#FEAEA7]/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <SectionBadge label="Client Stories" />
          <h2 style={SERIF} className="text-4xl lg:text-5xl font-semibold text-gray-900 mb-4">
            Trusted by <GradientText>Thousands</GradientText>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {testimonials.slice(0, 3).map((t) => (
            <div
              key={t.id}
              className="p-8 rounded-2xl bg-white border border-[#FFC5C1]/50 hover:border-[#FF9689]/60 hover:shadow-lg hover:shadow-[#FEAEA7]/40 transition-all duration-300"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#FF9689] text-[#FF9689]" />
                ))}
              </div>
              <p className="text-gray-600 leading-relaxed mb-6 text-sm">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF9689] to-[#FFC6A4] flex items-center justify-center text-white text-sm font-semibold">
                  {t.initials}
                </div>
                <div>
                  <p className="text-gray-900 text-sm font-medium">{t.name}</p>
                  <p className="text-gray-400 text-xs">{t.service} · {t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Secondary row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.slice(3, 6).map((t) => (
            <div
              key={t.id}
              className="p-8 rounded-2xl bg-white border border-[#FFC5C1]/50 hover:border-[#FF9689]/60 hover:shadow-lg hover:shadow-[#FEAEA7]/40 transition-all duration-300"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#FFC6A4] text-[#FFC6A4]" />
                ))}
              </div>
              <p className="text-gray-600 leading-relaxed mb-6 text-sm">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FFC6A4] to-[#FF9689] flex items-center justify-center text-white text-sm font-semibold">
                  {t.initials}
                </div>
                <div>
                  <p className="text-gray-900 text-sm font-medium">{t.name}</p>
                  <p className="text-gray-400 text-xs">{t.service} · {t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Specialists ───────────────────────────────────────────────────────────────
function SpecialistsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <SectionBadge label="Our Expert Team" />
          <h2 style={SERIF} className="text-4xl lg:text-5xl font-semibold text-gray-900 mb-4">
            Masters of Their <GradientText>Craft</GradientText>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Our specialists are among the most highly trained and passionate professionals in luxury wellness.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {specialists.map((spec) => (
            <div key={spec.id} className="group text-center">
              <div className="relative mb-6 mx-auto w-48 h-48 rounded-full overflow-hidden border-2 border-[#FFC5C1]/50 group-hover:border-[#FF9689]/60 group-hover:shadow-xl group-hover:shadow-[#FEAEA7]/40 transition-all duration-500">
                <ImageWithFallback
                  src={spec.image}
                  alt={spec.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#FF9689]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <h3 style={SERIF} className="text-gray-900 text-xl font-semibold mb-1">{spec.name}</h3>
              <p className="text-[#FF9689] text-sm mb-3">{spec.role}</p>
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
  );
}

// ── Pricing ───────────────────────────────────────────────────────────────────
function PricingSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-[#FFD6BE]/30 via-[#FFC5C1]/20 to-[#FEAEA7]/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <SectionBadge label="Membership Plans" />
          <h2 style={SERIF} className="text-4xl lg:text-5xl font-semibold text-gray-900 mb-4">
            Invest in Your <GradientText>Wellbeing</GradientText>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Choose a membership that fits your lifestyle. All plans include exclusive member benefits and priority access.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPackages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative p-8 rounded-2xl transition-all duration-300 ${
                pkg.featured
                  ? "bg-gradient-to-b from-[#FFC5C1]/30 to-[#FFD6BE]/20 border-2 border-[#FF9689]/60 scale-105 shadow-xl shadow-[#FEAEA7]/40"
                  : "bg-white border border-[#FFC5C1]/50 hover:border-[#FF9689]/50 hover:shadow-lg hover:shadow-[#FEAEA7]/40"
              }`}
            >
              {pkg.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-[#FF9689] to-[#FFC6A4] text-white text-xs font-medium shadow-sm shadow-[#FF9689]/40">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 style={SERIF} className="text-gray-900 text-2xl font-semibold mb-1">{pkg.name}</h3>
                <p className="text-gray-400 text-sm">{pkg.tagline}</p>
              </div>

              <div className="mb-8">
                <span style={SERIF} className="text-5xl font-semibold text-gray-900">${pkg.price}</span>
                <span className="text-gray-400 text-sm">/{pkg.period}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-[#FF9689] mt-0.5 shrink-0" />
                    <span className="text-gray-600 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/booking"
                className={`w-full flex items-center justify-center gap-2 py-4 rounded-full text-sm font-medium transition-all duration-300 group ${
                  pkg.featured
                    ? "bg-gradient-to-r from-[#FF9689] to-[#FFC6A4] text-white hover:opacity-90 hover:shadow-xl hover:shadow-[#FF9689]/30"
                    : "border border-[#FEAEA7] text-gray-700 hover:border-[#FF9689] hover:bg-[#FFC5C1]/20 hover:text-[#FF9689]"
                }`}
              >
                {pkg.cta}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─ Blog Preview ──────────────────────────────────────────────────────────────
function BlogPreview() {
  const recent = blogPosts.slice(0, 3);
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <SectionBadge label="Wellness Journal" />
            <h2 style={SERIF} className="text-4xl lg:text-5xl font-semibold text-gray-900">
              Insights & <GradientText>Inspiration</GradientText>
            </h2>
          </div>
          <Link to="/blog" className="flex items-center gap-2 text-[#FF9689] hover:text-[#FFC6A4] transition-colors group">
            View All Articles <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recent.map((post) => (
            <Link key={post.id} to={`/blog/${post.slug}`} className="group">
              <div className="aspect-video rounded-2xl overflow-hidden mb-5 border border-[#FFC5C1]/50">
                <ImageWithFallback
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 rounded-full bg-[#FFC5C1]/20 border border-[#FEAEA7]/50 text-[#FF9689] text-xs">
                  {post.category}
                </span>
                <span className="text-gray-400 text-xs">{post.readTime}</span>
              </div>
              <h3 style={SERIF} className="text-gray-900 text-xl font-semibold mb-2 group-hover:text-[#FF9689] transition-colors leading-snug">
                {post.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{post.excerpt}</p>
              <div className="flex items-center gap-2 mt-4">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#FF9689] to-[#FFC6A4] flex items-center justify-center text-white text-xs font-semibold">
                  {post.author.initials}
                </div>
                <span className="text-gray-500 text-xs">{post.author.name}</span>
                <span className="text-gray-300 text-xs">·</span>
                <span className="text-gray-400 text-xs">{post.date}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CTA Banner ────────────────────────────────────────────────────────────────
function CTABanner() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#FFD6BE]/30 via-[#FFC5C1]/20 to-[#FEAEA7]/20">
      <div className="max-w-5xl mx-auto px-6">
        <div className="relative rounded-3xl overflow-hidden p-16 text-center bg-gradient-to-br from-white via-[#FFC5C1]/20 to-[#FFD6BE]/20 border border-[#FEAEA7]/50 shadow-lg shadow-[#FEAEA7]/40">
          {/* Decorative top line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-[#FF9689]/50 to-transparent" />
          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-[#FFC5C1]/60 to-transparent rounded-br-full" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-[#FFD6BE]/60 to-transparent rounded-tl-full" />

          <div className="relative z-10">
            <SectionBadge label="Your Journey Begins" />
            <h2 style={SERIF} className="text-4xl lg:text-5xl font-semibold text-gray-900 mb-4">
              Ready for Your <GradientText>Transformation</GradientText>?
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto mb-10 leading-relaxed">
              Book your appointment today and discover why AURA is the preferred destination for those who demand the finest in beauty and wellness.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/booking"
                className="flex items-center gap-2 px-10 py-4 rounded-full bg-gradient-to-r from-[#FF9689] to-[#FFC6A4] text-white font-medium hover:opacity-90 hover:shadow-2xl hover:shadow-[#FF9689]/40 transition-all duration-300 group"
              >
                Book Appointment
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="flex items-center gap-2 px-10 py-4 rounded-full border border-[#FEAEA7] text-gray-700 hover:bg-[#FFC5C1]/20 hover:border-[#FF9689] transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Main ─────────────────────────────────────────────────────────────────────
export function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedTreatments />
      <SpaGallerySection />
      <ServiceCategories />
      <TestimonialsSection />
      <SpecialistsSection />
      <PricingSection />
      <BlogPreview />
      <CTABanner />
    </>
  );
}