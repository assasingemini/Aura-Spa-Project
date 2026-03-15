// ─── Images ────────────────────────────────────────────────────────────────
export const IMAGES = {
  hero: "https://images.unsplash.com/photo-1754534128045-ea1cfd09fb8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
  facial: "https://images.unsplash.com/photo-1664549761426-6a1cb1032854?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  hotstone: "https://images.unsplash.com/photo-1610402601271-5b4bd5b3eba4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  skincare: "https://images.unsplash.com/photo-1662577066108-4bb081e818b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  aromatherapy: "https://images.unsplash.com/photo-1636715734641-811b49be55bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  therapist: "https://images.unsplash.com/photo-1762341115129-cd69236f50d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  bodywrap: "https://images.unsplash.com/photo-1709316054551-355656bd4815?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  manicure: "https://images.unsplash.com/photo-1648241815778-fdc8daf0d6ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  pool: "https://images.unsplash.com/photo-1532691403316-d08a19730ed9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  glowingSkin: "https://images.unsplash.com/photo-1579801874037-f28c38c7edbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  blog1: "https://images.unsplash.com/photo-1658501833982-b153633f7177?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  elegantSpa: "https://images.unsplash.com/photo-1630595633877-9918ee257288?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
};

// ─── Services ───────────────────────────────────────────────────────────────
export interface Service {
  id: string;
  slug: string;
  title: string;
  category: string;
  price: number;
  duration: string;
  image: string;
  shortDescription: string;
  description: string;
  benefits: string[];
  featured: boolean;
}

export const services: Service[] = [
  {
    id: "1",
    slug: "signature-facial",
    title: "Signature Facial",
    category: "Facial Treatments",
    price: 150,
    duration: "90 min",
    image: IMAGES.facial,
    shortDescription: "Our flagship treatment combining deep cleansing with advanced rejuvenation.",
    description: "Experience the pinnacle of skincare with our Signature Facial — a bespoke treatment crafted for your unique skin type. Using the finest botanical extracts and cutting-edge technologies, our expert aestheticians deliver a transformative experience that leaves your skin luminous, hydrated, and visibly younger.",
    benefits: ["Deep pore cleansing", "Advanced hydration", "Radiance boost", "Anti-aging peptides", "Custom mask therapy"],
    featured: true,
  },
  {
    id: "2",
    slug: "hot-stone-massage",
    title: "Hot Stone Massage",
    category: "Massage Therapy",
    price: 180,
    duration: "75 min",
    image: IMAGES.hotstone,
    shortDescription: "Ancient healing stones combined with expert massage techniques.",
    description: "Surrender to the therapeutic warmth of smooth basalt stones expertly placed and glided across tense muscles. This time-honored ritual melts away stress, improves circulation, and restores deep muscular balance. Paired with our signature aromatherapy oils, it's the ultimate relaxation experience.",
    benefits: ["Deep muscle relaxation", "Improved circulation", "Stress relief", "Pain reduction", "Better sleep quality"],
    featured: true,
  },
  {
    id: "3",
    slug: "aromatherapy-ritual",
    title: "Aromatherapy Ritual",
    category: "Holistic Wellness",
    price: 120,
    duration: "60 min",
    image: IMAGES.aromatherapy,
    shortDescription: "A sensory journey through nature's most precious essential oils.",
    description: "Immerse yourself in the healing power of pure essential oils in this deeply restorative ritual. Our therapists curate a bespoke blend tailored to your emotional and physical needs, delivering profound relaxation through aromatherapy massage, steam therapy, and mindful breathing techniques.",
    benefits: ["Emotional balance", "Stress reduction", "Respiratory clarity", "Immune support", "Mental clarity"],
    featured: true,
  },
  {
    id: "4",
    slug: "body-wrap-therapy",
    title: "Body Wrap Therapy",
    category: "Body Treatments",
    price: 200,
    duration: "120 min",
    image: IMAGES.bodywrap,
    shortDescription: "Detoxifying body wrap that nourishes from head to toe.",
    description: "Our signature Body Wrap Therapy is a full-body transformation ritual. We begin with a full-body exfoliation using our mineral-rich scrub, followed by application of our proprietary detoxifying wrap. While cocooned, enjoy a scalp massage. Finish with a deeply moisturizing full-body massage.",
    benefits: ["Full-body detox", "Skin firming", "Deep nourishment", "Improved tone & texture", "Lymphatic drainage"],
    featured: false,
  },
  {
    id: "5",
    slug: "luxury-manicure",
    title: "Luxury Manicure",
    category: "Hand & Nail",
    price: 85,
    duration: "60 min",
    image: IMAGES.manicure,
    shortDescription: "A premium nail and hand care experience using luxury products.",
    description: "Elevate your nail experience with our Luxury Manicure. Using premium French brands and expert techniques, we transform your hands and nails into works of art. Includes cuticle care, nail shaping, paraffin treatment, hand massage, and your choice of gel or classic polish.",
    benefits: ["Nail strengthening", "Cuticle repair", "Hand rejuvenation", "Lasting polish", "Relaxing hand massage"],
    featured: false,
  },
  {
    id: "6",
    slug: "hydrotherapy-pool",
    title: "Hydrotherapy Pool",
    category: "Water Therapy",
    price: 95,
    duration: "45 min",
    image: IMAGES.pool,
    shortDescription: "Healing waters with precision jets for total body rejuvenation.",
    description: "Step into our private hydrotherapy pool where therapeutic water jets target specific muscle groups for profound relief. The carefully controlled temperature and mineral-infused water creates an environment of total healing. Perfect for athletic recovery, joint pain relief, and deep relaxation.",
    benefits: ["Joint pain relief", "Muscle recovery", "Improved mobility", "Stress reduction", "Circulation boost"],
    featured: false,
  },
  {
    id: "7",
    slug: "anti-aging-facial",
    title: "Anti-Aging Facial",
    category: "Facial Treatments",
    price: 220,
    duration: "90 min",
    image: IMAGES.skincare,
    shortDescription: "Advanced peptide treatment to visibly reverse signs of aging.",
    description: "Our most advanced facial combines microdermabrasion, LED light therapy, and our exclusive peptide complex to dramatically reduce fine lines and restore youthful elasticity. Using clinical-grade ingredients and proven techniques, this treatment delivers visible results from the very first session.",
    benefits: ["Fine line reduction", "Elasticity restoration", "Pigmentation correction", "Deep hydration", "Collagen stimulation"],
    featured: true,
  },
  {
    id: "8",
    slug: "full-body-massage",
    title: "Full Body Massage",
    category: "Massage Therapy",
    price: 160,
    duration: "90 min",
    image: IMAGES.elegantSpa,
    shortDescription: "A complete relaxation journey from head to toe.",
    description: "Our comprehensive Full Body Massage is a symphony of relaxation techniques combined into one indulgent experience. Our therapists work methodically through every area of the body using Swedish, deep tissue, and reflexology techniques, leaving you completely rejuvenated.",
    benefits: ["Complete relaxation", "Tension release", "Improved sleep", "Enhanced wellbeing", "Energy restoration"],
    featured: false,
  },
];

// ─── Specialists ─────────────────────────────────────────────────────────────
export interface Specialist {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  specialties: string[];
  experience: string;
}

export const specialists: Specialist[] = [
  {
    id: "1",
    name: "Dr. Sofia Laurent",
    role: "Lead Aesthetician",
    image: IMAGES.skincare,
    bio: "With over 15 years of experience in luxury skincare, Dr. Sofia has trained at the most prestigious institutes in Paris and New York.",
    specialties: ["Anti-Aging", "Facial Sculpting", "Chemical Peels"],
    experience: "15 years",
  },
  {
    id: "2",
    name: "Isabelle Chen",
    role: "Master Massage Therapist",
    image: IMAGES.therapist,
    bio: "Isabelle brings a holistic approach to bodywork, blending Eastern and Western techniques for transformative healing.",
    specialties: ["Deep Tissue", "Hot Stone", "Prenatal Massage"],
    experience: "12 years",
  },
  {
    id: "3",
    name: "Marie Dubois",
    role: "Holistic Wellness Expert",
    image: IMAGES.elegantSpa,
    bio: "Marie's journey into holistic wellness began in the mountains of Switzerland, where she studied ancient healing traditions.",
    specialties: ["Aromatherapy", "Reiki", "Sound Healing"],
    experience: "10 years",
  },
  {
    id: "4",
    name: "Camille Moreau",
    role: "Nail & Beauty Specialist",
    image: IMAGES.glowingSkin,
    bio: "Camille is our resident nail artist and beauty specialist, trained in the finest nail studios in Milan and Tokyo.",
    specialties: ["Nail Art", "Luxury Manicure", "Gel Systems"],
    experience: "8 years",
  },
];

// ─── Testimonials ────────────────────────────────────────────────────────────
export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  text: string;
  service: string;
  location: string;
  initials: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Emma Richardson",
    rating: 5,
    text: "AURA has completely transformed my skincare routine. The Signature Facial left my skin absolutely radiant. Dr. Sofia is a genius — I felt like royalty from the moment I walked in.",
    service: "Signature Facial",
    location: "New York, NY",
    initials: "ER",
  },
  {
    id: "2",
    name: "Charlotte Williams",
    rating: 5,
    text: "The Hot Stone Massage was absolutely life-changing. Isabelle's technique is extraordinary — she knew exactly where my tension was hiding. I floated out of there on a cloud.",
    service: "Hot Stone Massage",
    location: "Los Angeles, CA",
    initials: "CW",
  },
  {
    id: "3",
    name: "Amelia Fontaine",
    rating: 5,
    text: "I've visited spas around the world, and AURA is genuinely world-class. The ambiance, the treatments, the personal attention — everything is perfection. My go-to for special occasions.",
    service: "Body Wrap Therapy",
    location: "Miami, FL",
    initials: "AF",
  },
  {
    id: "4",
    name: "Sophia Bennett",
    rating: 5,
    text: "The Anti-Aging Facial is a miracle in 90 minutes. My colleagues thought I had taken a vacation — the results are that dramatic. Worth every penny.",
    service: "Anti-Aging Facial",
    location: "Chicago, IL",
    initials: "SB",
  },
  {
    id: "5",
    name: "Olivia Marchand",
    rating: 5,
    text: "Marie's Aromatherapy Ritual is the most deeply relaxing experience I've ever had. The custom oil blend she created for me was absolutely magical. I sleep so much better now.",
    service: "Aromatherapy Ritual",
    location: "Boston, MA",
    initials: "OM",
  },
  {
    id: "6",
    name: "Isabella Torres",
    rating: 5,
    text: "The entire AURA experience exceeds all expectations. From the beautifully designed space to the incredibly skilled therapists — it's pure luxury. Already booked my next three appointments!",
    service: "Full Body Massage",
    location: "San Francisco, CA",
    initials: "IT",
  },
];

// ─── Blog Posts ──────────────────────────────────────────────────────────────
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  image: string;
  author: { name: string; role: string; initials: string };
  date: string;
  readTime: string;
  excerpt: string;
  featured: boolean;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "ultimate-guide-to-skin-hydration",
    title: "The Ultimate Guide to Radiant Skin Hydration",
    category: "Skincare",
    image: IMAGES.facial,
    author: { name: "Dr. Sofia Laurent", role: "Lead Aesthetician", initials: "SL" },
    date: "March 8, 2026",
    readTime: "8 min read",
    excerpt: "Discover the science behind deep skin hydration and how our signature treatments restore your skin's natural luminosity and youthful glow.",
    featured: true,
    tags: ["Skincare", "Hydration", "Facial Treatments", "Anti-Aging"],
  },
  {
    id: "2",
    slug: "power-of-aromatherapy",
    title: "The Transformative Power of Aromatherapy",
    category: "Wellness",
    image: IMAGES.aromatherapy,
    author: { name: "Marie Dubois", role: "Wellness Expert", initials: "MD" },
    date: "March 1, 2026",
    readTime: "6 min read",
    excerpt: "Explore how ancient aromatherapy traditions combined with modern science can profoundly transform your mental and physical wellbeing.",
    featured: false,
    tags: ["Aromatherapy", "Essential Oils", "Wellness", "Stress Relief"],
  },
  {
    id: "3",
    slug: "hot-stone-healing-therapy",
    title: "Hot Stone Therapy: Ancient Wisdom, Modern Results",
    category: "Massage",
    image: IMAGES.hotstone,
    author: { name: "Isabelle Chen", role: "Massage Therapist", initials: "IC" },
    date: "February 22, 2026",
    readTime: "5 min read",
    excerpt: "Learn how volcanic basalt stones heated to precise temperatures unlock deep muscular tension that no hands alone can reach.",
    featured: false,
    tags: ["Hot Stone", "Massage", "Healing", "Relaxation"],
  },
  {
    id: "4",
    slug: "luxury-spa-rituals-self-care",
    title: "Luxury Spa Rituals: The New Language of Self-Care",
    category: "Lifestyle",
    image: IMAGES.blog1,
    author: { name: "Dr. Sofia Laurent", role: "Lead Aesthetician", initials: "SL" },
    date: "February 15, 2026",
    readTime: "7 min read",
    excerpt: "In today's demanding world, luxury self-care isn't an indulgence — it's a necessity. Discover how to build a sustainable spa ritual into your lifestyle.",
    featured: false,
    tags: ["Self-Care", "Lifestyle", "Wellness", "Luxury"],
  },
  {
    id: "5",
    slug: "anti-aging-secrets",
    title: "The Science Behind Our Anti-Aging Facial Protocols",
    category: "Skincare",
    image: IMAGES.glowingSkin,
    author: { name: "Dr. Sofia Laurent", role: "Lead Aesthetician", initials: "SL" },
    date: "February 8, 2026",
    readTime: "10 min read",
    excerpt: "Uncover the clinical research and premium ingredients that make our Anti-Aging Facial one of the most effective treatments available today.",
    featured: false,
    tags: ["Anti-Aging", "Science", "Skincare", "Clinical"],
  },
  {
    id: "6",
    slug: "body-wrap-detox-guide",
    title: "The Complete Guide to Body Wrap Detoxification",
    category: "Body Treatments",
    image: IMAGES.bodywrap,
    author: { name: "Isabelle Chen", role: "Massage Therapist", initials: "IC" },
    date: "January 30, 2026",
    readTime: "6 min read",
    excerpt: "From mineral-rich seaweed wraps to warming clay therapies — a deep dive into how body wraps purify, tone, and transform your skin.",
    featured: false,
    tags: ["Body Wrap", "Detox", "Body Treatments", "Skin Toning"],
  },
];

// ─── Pricing Packages ────────────────────────────────────────────────────────
export interface PricingPackage {
  id: string;
  name: string;
  tagline: string;
  price: number;
  period: string;
  featured: boolean;
  features: string[];
  cta: string;
}

export const pricingPackages: PricingPackage[] = [
  {
    id: "1",
    name: "Serenity",
    tagline: "Begin your wellness journey",
    price: 199,
    period: "month",
    featured: false,
    features: [
      "2 x 60-min treatments/month",
      "Access to relaxation lounge",
      "Complimentary herbal teas",
      "10% off retail products",
      "Birthday treatment bonus",
    ],
    cta: "Start Serenity",
  },
  {
    id: "2",
    name: "Radiance",
    tagline: "The complete luxury experience",
    price: 399,
    period: "month",
    featured: true,
    features: [
      "4 x 90-min treatments/month",
      "Priority booking access",
      "Hydrotherapy pool access",
      "20% off retail products",
      "Personalized skincare plan",
      "Monthly facial consultation",
      "Guest passes (2/month)",
    ],
    cta: "Join Radiance",
  },
  {
    id: "3",
    name: "Prestige",
    tagline: "Unlimited luxury, always",
    price: 699,
    period: "month",
    featured: false,
    features: [
      "Unlimited treatments",
      "Dedicated personal therapist",
      "24/7 concierge booking",
      "30% off retail products",
      "Exclusive member events",
      "Bespoke product curation",
      "VIP lounge access",
      "Annual wellness retreat",
    ],
    cta: "Elevate to Prestige",
  },
];

// ─── Gallery Images ──────────────────────────────────────────────────────────
export interface GalleryImage {
  id: string;
  image: string;
  title: string;
  category: string;
}

export const galleryImages: GalleryImage[] = [
  { id: "1", image: IMAGES.hero, title: "Spa Interior", category: "Facilities" },
  { id: "2", image: IMAGES.facial, title: "Facial Treatment", category: "Facials" },
  { id: "3", image: IMAGES.hotstone, title: "Hot Stone Therapy", category: "Massage" },
  { id: "4", image: IMAGES.aromatherapy, title: "Aromatherapy Suite", category: "Wellness" },
  { id: "5", image: IMAGES.bodywrap, title: "Body Wrap Ritual", category: "Body" },
  { id: "6", image: IMAGES.manicure, title: "Luxury Manicure", category: "Nails" },
  { id: "7", image: IMAGES.pool, title: "Hydrotherapy Pool", category: "Facilities" },
  { id: "8", image: IMAGES.glowingSkin, title: "Radiant Results", category: "Results" },
  { id: "9", image: IMAGES.skincare, title: "Premium Skincare", category: "Facials" },
  { id: "10", image: IMAGES.elegantSpa, title: "Relaxation Journey", category: "Wellness" },
  { id: "11", image: IMAGES.therapist, title: "Expert Hands", category: "Massage" },
  { id: "12", image: IMAGES.blog1, title: "Wellness Lifestyle", category: "Wellness" },
];

// ─── Time Slots ──────────────────────────────────────────────────────────────
export const timeSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
  "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM",
];

// ─── Admin: Bookings ─────────────────────────────────────────────────────────
export interface Booking {
  id: string;
  customer: string;
  service: string;
  specialist: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  amount: number;
}

export const adminBookings: Booking[] = [
  { id: "BK001", customer: "Emma Richardson", service: "Signature Facial", specialist: "Dr. Sofia Laurent", date: "Mar 15, 2026", time: "10:00 AM", status: "confirmed", amount: 150 },
  { id: "BK002", customer: "Charlotte Williams", service: "Hot Stone Massage", specialist: "Isabelle Chen", date: "Mar 15, 2026", time: "11:30 AM", status: "confirmed", amount: 180 },
  { id: "BK003", customer: "Amelia Fontaine", service: "Body Wrap Therapy", specialist: "Marie Dubois", date: "Mar 16, 2026", time: "02:00 PM", status: "pending", amount: 200 },
  { id: "BK004", customer: "Sophia Bennett", service: "Anti-Aging Facial", specialist: "Dr. Sofia Laurent", date: "Mar 16, 2026", time: "09:00 AM", status: "completed", amount: 220 },
  { id: "BK005", customer: "Olivia Marchand", service: "Aromatherapy Ritual", specialist: "Marie Dubois", date: "Mar 17, 2026", time: "03:00 PM", status: "pending", amount: 120 },
  { id: "BK006", customer: "Isabella Torres", service: "Full Body Massage", specialist: "Isabelle Chen", date: "Mar 17, 2026", time: "01:00 PM", status: "confirmed", amount: 160 },
  { id: "BK007", customer: "Grace Kim", service: "Luxury Manicure", specialist: "Camille Moreau", date: "Mar 18, 2026", time: "11:00 AM", status: "confirmed", amount: 85 },
  { id: "BK008", customer: "Natalia Reeves", service: "Hydrotherapy Pool", specialist: "Isabelle Chen", date: "Mar 18, 2026", time: "04:00 PM", status: "cancelled", amount: 95 },
  { id: "BK009", customer: "Priya Sharma", service: "Signature Facial", specialist: "Dr. Sofia Laurent", date: "Mar 19, 2026", time: "10:30 AM", status: "pending", amount: 150 },
  { id: "BK010", customer: "Zoe Martin", service: "Hot Stone Massage", specialist: "Isabelle Chen", date: "Mar 19, 2026", time: "02:30 PM", status: "confirmed", amount: 180 },
];

// ─── Admin: Customers ────────────────────────────────────────────────────────
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  joined: string;
  totalVisits: number;
  totalSpent: number;
  tier: "Silver" | "Gold" | "Platinum";
  lastVisit: string;
}

export const adminCustomers: Customer[] = [
  { id: "C001", name: "Emma Richardson", email: "emma@email.com", phone: "+1 555-0101", joined: "Jan 2025", totalVisits: 24, totalSpent: 3840, tier: "Platinum", lastVisit: "Mar 10, 2026" },
  { id: "C002", name: "Charlotte Williams", email: "charlotte@email.com", phone: "+1 555-0102", joined: "Mar 2025", totalVisits: 18, totalSpent: 2880, tier: "Gold", lastVisit: "Mar 8, 2026" },
  { id: "C003", name: "Amelia Fontaine", email: "amelia@email.com", phone: "+1 555-0103", joined: "Jun 2025", totalVisits: 12, totalSpent: 2100, tier: "Gold", lastVisit: "Mar 5, 2026" },
  { id: "C004", name: "Sophia Bennett", email: "sophia@email.com", phone: "+1 555-0104", joined: "Aug 2025", totalVisits: 8, totalSpent: 1540, tier: "Silver", lastVisit: "Feb 28, 2026" },
  { id: "C005", name: "Olivia Marchand", email: "olivia@email.com", phone: "+1 555-0105", joined: "Oct 2025", totalVisits: 6, totalSpent: 960, tier: "Silver", lastVisit: "Feb 20, 2026" },
  { id: "C006", name: "Isabella Torres", email: "isabella@email.com", phone: "+1 555-0106", joined: "Nov 2025", totalVisits: 5, totalSpent: 870, tier: "Silver", lastVisit: "Feb 15, 2026" },
  { id: "C007", name: "Grace Kim", email: "grace@email.com", phone: "+1 555-0107", joined: "Dec 2025", totalVisits: 4, totalSpent: 520, tier: "Silver", lastVisit: "Mar 1, 2026" },
  { id: "C008", name: "Priya Sharma", email: "priya@email.com", phone: "+1 555-0108", joined: "Jan 2026", totalVisits: 2, totalSpent: 300, tier: "Silver", lastVisit: "Feb 28, 2026" },
];

// ─── Revenue Chart Data ──────────────────────────────────────────────────────
export const revenueData = [
  { month: "Aug", revenue: 18500, bookings: 92 },
  { month: "Sep", revenue: 21200, bookings: 108 },
  { month: "Oct", revenue: 19800, bookings: 98 },
  { month: "Nov", revenue: 24600, bookings: 124 },
  { month: "Dec", revenue: 31200, bookings: 156 },
  { month: "Jan", revenue: 28400, bookings: 142 },
  { month: "Feb", revenue: 26100, bookings: 131 },
  { month: "Mar", revenue: 32800, bookings: 164 },
];

export const serviceDistribution = [
  { name: "Facial Treatments", value: 35, color: "#7A5CFF" },
  { name: "Massage Therapy", value: 28, color: "#4F8CFF" },
  { name: "Body Treatments", value: 18, color: "#A78BFA" },
  { name: "Holistic Wellness", value: 12, color: "#60A5FA" },
  { name: "Hand & Nail", value: 7, color: "#93C5FD" },
];
