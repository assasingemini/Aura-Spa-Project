import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, Sparkles, Instagram, Facebook, Twitter } from "lucide-react";
import { toast } from "sonner";

const SERIF = { fontFamily: "'Playfair Display', serif" };

export function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitting(false);
    toast.success("Message sent! We'll respond within 24 hours.");
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50/60 via-pink-50/30 to-white pt-24">
      {/* Header */}
      <section className="py-20 text-center max-w-7xl mx-auto px-6 relative">
        {/* Background orbs */}
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-pink-200/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-56 h-56 bg-purple-200/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-50 border border-pink-200/70 text-pink-600 text-sm mb-6">
            <Sparkles className="w-3.5 h-3.5" /> Get in Touch
          </div>
          <h1 style={SERIF} className="text-5xl lg:text-6xl font-semibold text-gray-900 mb-4">
            We'd Love to{" "}
            <span className="bg-gradient-to-r from-[#EC4899] to-[#A855F7] bg-clip-text text-transparent">
              Hear
            </span>{" "}
            From You
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto text-lg">
            Whether you have a question about our treatments, memberships, or just want to say hello — we're here for you.
          </p>
        </div>
      </section>

      <section className="pb-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact Info */}
          <div className="space-y-6">
            {[
              { icon: MapPin, label: "Visit Us", value: "425 Madison Avenue\nSuite 1200\nNew York, NY 10017", color: "from-pink-100 to-rose-50" },
              { icon: Phone, label: "Call Us", value: "+1 (212) 555-0100\n+1 (212) 555-0101", color: "from-fuchsia-100 to-pink-50" },
              { icon: Mail, label: "Email Us", value: "hello@auraspa.com\nbookings@auraspa.com", color: "from-purple-100 to-fuchsia-50" },
              { icon: Clock, label: "Hours", value: "Mon–Fri: 9:00 AM – 8:00 PM\nSat–Sun: 10:00 AM – 7:00 PM", color: "from-rose-100 to-pink-50" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex gap-4 p-5 rounded-2xl bg-white border border-pink-100 shadow-sm shadow-pink-50/60 hover:border-pink-200 hover:shadow-pink-100/40 transition-all">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} border border-pink-200/50 flex items-center justify-center shrink-0`}>
                    <Icon className="w-5 h-5 text-[#EC4899]" />
                  </div>
                  <div>
                    <p className="text-pink-400 text-xs uppercase tracking-wider mb-1">{item.label}</p>
                    {item.value.split("\n").map((line, j) => (
                      <p key={j} className="text-gray-700 text-sm leading-relaxed">{line}</p>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Social */}
            <div className="p-5 rounded-2xl bg-white border border-pink-100 shadow-sm shadow-pink-50/60">
              <p className="text-pink-400 text-xs uppercase tracking-wider mb-4">Follow AURA</p>
              <div className="flex gap-3">
                {[Instagram, Facebook, Twitter].map((Icon, i) => (
                  <button key={i} className="w-10 h-10 rounded-full bg-pink-50 border border-pink-200/60 flex items-center justify-center text-pink-400 hover:text-white hover:bg-gradient-to-br hover:from-[#EC4899] hover:to-[#A855F7] hover:border-transparent transition-all">
                    <Icon className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="p-8 rounded-2xl bg-white border border-pink-100 shadow-sm shadow-pink-50/60">
              <h2 style={SERIF} className="text-2xl font-semibold text-gray-900 mb-6">Send a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-gray-600 text-sm mb-1.5 block">Full Name *</label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your full name"
                      className="w-full bg-pink-50/40 border border-pink-200/60 rounded-xl px-4 py-3 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:bg-white transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-gray-600 text-sm mb-1.5 block">Email Address *</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="your@email.com"
                      className="w-full bg-pink-50/40 border border-pink-200/60 rounded-xl px-4 py-3 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-gray-600 text-sm mb-1.5 block">Phone Number</label>
                    <input
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-pink-50/40 border border-pink-200/60 rounded-xl px-4 py-3 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:bg-white transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-gray-600 text-sm mb-1.5 block">Subject *</label>
                    <select
                      required
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full bg-pink-50/40 border border-pink-200/60 rounded-xl px-4 py-3 text-gray-800 text-sm focus:outline-none focus:border-pink-400 focus:bg-white transition-colors"
                    >
                      <option value="">Select subject...</option>
                      <option value="booking">Booking Inquiry</option>
                      <option value="membership">Membership</option>
                      <option value="corporate">Corporate Events</option>
                      <option value="gift">Gift Cards</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-gray-600 text-sm mb-1.5 block">Message *</label>
                  <textarea
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us how we can help you..."
                    rows={5}
                    className="w-full bg-pink-50/40 border border-pink-200/60 rounded-xl px-4 py-3 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:bg-white transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-full bg-gradient-to-r from-[#EC4899] to-[#A855F7] text-white font-medium hover:opacity-90 hover:shadow-xl hover:shadow-pink-300/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Map Placeholder */}
            <div className="mt-6 rounded-2xl overflow-hidden h-64 relative border border-pink-100 bg-gradient-to-br from-rose-50 to-pink-50/60">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                {/* Grid lines */}
                <div className="grid grid-cols-8 grid-rows-8 gap-px opacity-20 absolute inset-0">
                  {Array.from({ length: 64 }).map((_, i) => (
                    <div key={i} className="border border-pink-300/30" />
                  ))}
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#EC4899] to-[#A855F7] flex items-center justify-center shadow-lg shadow-pink-300/40 relative z-10">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div className="text-center relative z-10">
                  <p style={SERIF} className="text-gray-900 font-medium">AURA Luxury Spa</p>
                  <p className="text-gray-500 text-sm">425 Madison Avenue, New York, NY 10017</p>
                </div>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="relative z-10 mt-2 px-6 py-2 rounded-full bg-white border border-pink-200 text-pink-600 text-sm hover:bg-pink-50 hover:border-pink-300 transition-colors shadow-sm"
                >
                  Open in Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
