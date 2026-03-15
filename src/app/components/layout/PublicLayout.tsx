import { useState, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router";
import { Menu, X, Sparkles, Instagram, Facebook, Twitter, Youtube, Mail, Phone, MapPin, ChevronRight, Heart } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function PublicLayout() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }} className="min-h-screen bg-gradient-to-br from-[#FFD6BE]/30 via-white to-[#FEAEA7]/20 text-gray-900">
      {/* ── Navbar ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-xl shadow-lg shadow-[#FFC5C1]/60 border-b border-[#FEAEA7]"
            : "bg-white/85 backdrop-blur-md border-b border-[#FEAEA7]/50"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF9689] to-[#FFC6A4] flex items-center justify-center shadow-lg shadow-[#FF9689]/40 group-hover:shadow-[#FF9689]/60 transition-all">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span style={{ fontFamily: "'Playfair Display', serif" }} className="text-xl font-semibold tracking-wide text-gray-900">
              AURA
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm transition-all duration-200 relative group ${
                  location.pathname === link.href ? "text-[#FF9689] font-medium" : "text-gray-600 hover:text-[#FF9689]"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-gradient-to-r from-[#FF9689] to-[#FFC6A4] transition-all duration-300 ${
                    location.pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Link to="/login" className="text-sm text-gray-500 hover:text-[#FF9689] transition-colors">
              Sign In
            </Link>
            <Link
              to="/booking"
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#FF9689] to-[#FFC6A4] text-white text-sm font-medium hover:opacity-90 hover:shadow-lg hover:shadow-[#FF9689]/40 transition-all duration-300"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-500 hover:text-[#FF9689] hover:bg-[#FFC5C1]/20 transition-all"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white/98 backdrop-blur-xl border-t border-[#FEAEA7] px-6 py-6 space-y-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`block text-base py-2 transition-colors ${
                  location.pathname === link.href ? "text-[#FF9689] font-medium" : "text-gray-600 hover:text-[#FF9689]"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 flex flex-col gap-3 border-t border-[#FEAEA7]">
              <Link to="/login" className="text-gray-500 text-sm hover:text-[#FF9689] py-2">Sign In</Link>
              <Link
                to="/booking"
                className="text-center py-3 rounded-full bg-gradient-to-r from-[#FF9689] to-[#FFC6A4] text-white text-sm font-medium"
              >
                Book Appointment
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Page content */}
      <main>
        <Outlet />
      </main>

      {/* ── Footer ── */}
      <footer className="bg-gradient-to-br from-[#FFD6BE]/10 via-white to-[#FEAEA7]/10 border-t border-[#FEAEA7]/30 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand */}
            <div className="lg:col-span-1">
              <Link to="/" className="flex items-center gap-2 mb-6 group">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF9689] to-[#FFC6A4] flex items-center justify-center shadow-lg shadow-[#FF9689]/40 group-hover:shadow-[#FF9689]/60 transition-all">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span style={{ fontFamily: "'Playfair Display', serif" }} className="text-xl font-semibold text-gray-900">AURA</span>
              </Link>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                Where luxury meets wellness. Experience the art of beauty and relaxation in a sanctuary crafted for the discerning.
              </p>
              <div className="flex gap-4">
                {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                  <button key={i} className="w-9 h-9 rounded-full bg-white border border-[#FFC5C1]/50 flex items-center justify-center text-gray-400 hover:text-[#FF9689] hover:bg-[#FFC5C1]/20 hover:border-[#FF9689]/50 transition-all duration-300">
                    <Icon className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 style={{ fontFamily: "'Playfair Display', serif" }} className="text-gray-900 font-semibold mb-6">Explore</h4>
              <ul className="space-y-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link to={link.href} className="text-gray-500 text-sm hover:text-[#FF9689] transition-colors flex items-center gap-2 group">
                      <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 text-[#FF9689]" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 style={{ fontFamily: "'Playfair Display', serif" }} className="text-gray-900 font-semibold mb-6">Treatments</h4>
              <ul className="space-y-3">
                {["Signature Facial", "Hot Stone Massage", "Aromatherapy Ritual", "Body Wrap Therapy", "Anti-Aging Facial", "Hydrotherapy Pool"].map((s) => (
                  <li key={s}>
                    <Link to="/services" className="text-gray-500 text-sm hover:text-[#FF9689] transition-colors flex items-center gap-2 group">
                      <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 text-[#FF9689]" />
                      {s}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 style={{ fontFamily: "'Playfair Display', serif" }} className="text-gray-900 font-semibold mb-6">Contact</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#FF9689] mt-0.5 shrink-0" />
                  <span className="text-gray-500 text-sm">425 Madison Avenue, Suite 1200<br />New York, NY 10017</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#FF9689] shrink-0" />
                  <a href="tel:+12125550100" className="text-gray-500 text-sm hover:text-[#FF9689] transition-colors">+1 (212) 555-0100</a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#FF9689] shrink-0" />
                  <a href="mailto:hello@auraspa.com" className="text-gray-500 text-sm hover:text-[#FF9689] transition-colors">hello@auraspa.com</a>
                </li>
              </ul>
              <div className="mt-6 p-4 rounded-xl bg-white border border-[#FFC5C1]/50 shadow-sm shadow-[#FEAEA7]/10">
                <p className="text-[#FF9689] text-xs font-medium mb-1">Opening Hours</p>
                <p className="text-gray-600 text-sm">Mon – Fri: 9am – 8pm</p>
                <p className="text-gray-600 text-sm">Sat – Sun: 10am – 7pm</p>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="mb-12 p-8 rounded-2xl bg-gradient-to-r from-[#FFC5C1]/20 to-[#FFD6BE]/20 border border-[#FEAEA7]/50 relative overflow-hidden shadow-sm shadow-[#FF9689]/10">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#FF9689]/10 rounded-full blur-2xl"></div>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
              <div>
                <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-gray-900 text-xl font-semibold mb-1">
                  Join the AURA Community
                </h3>
                <p className="text-gray-500 text-sm">Exclusive offers, wellness tips, and new treatment announcements.</p>
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 md:w-72 px-4 py-3 rounded-full bg-white border border-[#FEAEA7] text-gray-700 text-sm placeholder-gray-400 focus:outline-none focus:border-[#FF9689] focus:ring-2 focus:ring-[#FF9689]/20 transition-all shadow-sm"
                />
                <button className="px-6 py-3 rounded-full bg-gradient-to-r from-[#FF9689] to-[#FFC6A4] text-white text-sm font-medium hover:opacity-90 hover:shadow-lg hover:shadow-[#FF9689]/30 transition-all whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-[#FFC5C1]/30">
            <p className="text-gray-400 text-sm flex items-center gap-1.5">
              © 2026 AURA Luxury Spa. Made with <Heart className="w-3 h-3 text-[#FF9689] fill-[#FF9689]" /> All rights reserved.
            </p>
            <div className="flex gap-6">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
                <a key={item} href="#" className="text-gray-400 text-sm hover:text-[#FF9689] transition-colors">{item}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
