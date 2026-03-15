import { useLocation, Link } from "react-router";
import { CheckCircle, Calendar, Clock, User, ArrowRight, Download, Share2, Sparkles } from "lucide-react";

const SERIF = { fontFamily: "'Playfair Display', serif" };

export function BookingSuccessPage() {
  const { state } = useLocation();
  const booking = state?.booking;

  const bookingRef = `AUR-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

  const displayDate = booking?.date
    ? new Date(booking.date + "T12:00:00").toLocaleDateString("en", { weekday: "long", month: "long", day: "numeric", year: "numeric" })
    : "Your scheduled date";

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50/60 via-pink-50/30 to-fuchsia-50/20 pt-24 pb-20 flex items-center justify-center">
      <div className="max-w-xl w-full mx-auto px-6">
        {/* Success animation */}
        <div className="text-center mb-10">
          <div className="relative inline-block mb-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#EC4899] to-[#A855F7] flex items-center justify-center mx-auto shadow-2xl shadow-pink-300/40">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#EC4899]/20 to-[#A855F7]/20 animate-ping" />
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-50 border border-pink-200/70 text-pink-600 text-sm mb-4">
            <Sparkles className="w-3.5 h-3.5" /> Booking Confirmed
          </div>

          <h1 style={SERIF} className="text-4xl lg:text-5xl font-semibold text-gray-900 mb-3">
            You're All Set!
          </h1>
          <p className="text-gray-500 leading-relaxed">
            Your appointment has been successfully booked. A confirmation has been sent to{" "}
            <span className="text-gray-800 font-medium">{booking?.email || "your email"}</span>.
          </p>
        </div>

        {/* Booking card */}
        <div className="rounded-2xl bg-white border border-pink-100 overflow-hidden mb-8 shadow-sm shadow-pink-50/60">
          {/* Top accent */}
          <div className="h-1.5 bg-gradient-to-r from-[#EC4899] to-[#A855F7]" />

          <div className="p-8">
            {/* Ref number */}
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-pink-100">
              <div>
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Booking Reference</p>
                <p style={SERIF} className="text-gray-900 text-xl font-semibold">{bookingRef}</p>
              </div>
              <span className="px-3 py-1.5 rounded-full bg-green-50 border border-green-200 text-green-600 text-xs">Confirmed</span>
            </div>

            <div className="space-y-4">
              {[
                {
                  icon: Sparkles,
                  label: "Treatment",
                  value: booking?.service?.title || "Signature Facial",
                  sub: `${booking?.service?.category || "Facial Treatments"} · ${booking?.service?.duration || "90 min"}`,
                },
                {
                  icon: User,
                  label: "Specialist",
                  value: booking?.specialist?.name || "Dr. Sofia Laurent",
                  sub: booking?.specialist?.role || "Lead Aesthetician",
                },
                {
                  icon: Calendar,
                  label: "Date",
                  value: displayDate,
                },
                {
                  icon: Clock,
                  label: "Time",
                  value: booking?.time || "10:00 AM",
                },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-lg bg-pink-50 border border-pink-200/60 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-[#EC4899]" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">{item.label}</p>
                      <p className="text-gray-800 text-sm font-medium">{item.value}</p>
                      {item.sub && <p className="text-gray-400 text-xs">{item.sub}</p>}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Total */}
            <div className="mt-6 pt-5 border-t border-pink-100 flex items-center justify-between">
              <span className="text-gray-500">Total Amount</span>
              <span style={SERIF} className="text-2xl font-semibold bg-gradient-to-r from-[#EC4899] to-[#A855F7] bg-clip-text text-transparent">
                ${booking?.service?.price || 150}
              </span>
            </div>
          </div>
        </div>

        {/* Info box */}
        <div className="p-5 rounded-xl bg-pink-50/60 border border-pink-200/50 mb-8">
          <h4 className="text-gray-800 text-sm font-medium mb-2">What to expect</h4>
          <ul className="space-y-1.5">
            {[
              "Arrive 10 minutes early to complete a brief consultation",
              "Please avoid heavy meals 1 hour before your treatment",
              "Complimentary herbal tea and relaxation time included",
              "Free cancellation up to 24 hours in advance",
            ].map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-500 text-xs">
                <span className="w-1 h-1 rounded-full bg-[#EC4899] mt-1.5 shrink-0" />
                {tip}
              </li>
            ))}
          </ul>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button className="flex items-center justify-center gap-2 py-3 rounded-full bg-white border border-pink-200 text-gray-600 hover:text-pink-600 hover:border-pink-300 hover:bg-pink-50 text-sm transition-all">
            <Download className="w-4 h-4" /> Save to Calendar
          </button>
          <button className="flex items-center justify-center gap-2 py-3 rounded-full bg-white border border-pink-200 text-gray-600 hover:text-pink-600 hover:border-pink-300 hover:bg-pink-50 text-sm transition-all">
            <Share2 className="w-4 h-4" /> Share
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <Link
            to="/booking"
            className="w-full flex items-center justify-center gap-2 py-4 rounded-full bg-gradient-to-r from-[#EC4899] to-[#A855F7] text-white font-medium hover:opacity-90 hover:shadow-lg hover:shadow-pink-300/30 transition-all group"
          >
            Book Another Treatment
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            to="/"
            className="w-full flex items-center justify-center py-4 rounded-full border border-pink-200 text-gray-500 hover:text-pink-600 hover:border-pink-300 hover:bg-pink-50 text-sm transition-all"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}