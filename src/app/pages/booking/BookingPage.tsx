import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Check, ChevronRight, Clock, User, Calendar, CreditCard, Sparkles } from "lucide-react";
import { services as mockServices, specialists, timeSlots } from "../../data/mockData";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

const SERIF = { fontFamily: "'Playfair Display', serif" };

const STEPS = [
  { label: "Service", icon: Sparkles },
  { label: "Specialist", icon: User },
  { label: "Date & Time", icon: Calendar },
  { label: "Your Info", icon: CreditCard },
  { label: "Confirm", icon: Check },
];

// Simple calendar
function MiniCalendar({ selected, onSelect }: { selected: string; onSelect: (d: string) => void }) {
  const today = new Date(2026, 2, 14);
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthName = new Date(year, month).toLocaleDateString("en", { month: "long", year: "numeric" });

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const isDisabled = (d: number) => {
    const date = new Date(year, month, d);
    return date < today;
  };

  const formatDate = (d: number) => `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

  return (
    <div className="bg-pink-50/40 border border-pink-200/60 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => { if (month === 0) { setMonth(11); setYear(y => y - 1); } else setMonth(m => m - 1); }} className="p-2 rounded-lg hover:bg-pink-100 text-gray-400 hover:text-pink-600 transition-all">‹</button>
        <span className="text-gray-700 text-sm font-medium">{monthName}</span>
        <button onClick={() => { if (month === 11) { setMonth(0); setYear(y => y + 1); } else setMonth(m => m + 1); }} className="p-2 rounded-lg hover:bg-pink-100 text-gray-400 hover:text-pink-600 transition-all">›</button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <div key={d} className="text-center text-pink-300 text-xs py-1">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((d, i) => {
          if (!d) return <div key={i} />;
          const dateStr = formatDate(d);
          const disabled = isDisabled(d);
          const isSelected = selected === dateStr;
          return (
            <button
              key={i}
              disabled={disabled}
              onClick={() => onSelect(dateStr)}
              className={`aspect-square rounded-xl text-sm transition-all ${
                isSelected
                  ? "bg-gradient-to-br from-[#EC4899] to-[#A855F7] text-white font-semibold shadow-sm shadow-pink-300/30"
                  : disabled
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-600 hover:bg-pink-100 hover:text-pink-700"
              }`}
            >
              {d}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function BookingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  const { data: session } = useSession();
  const [booking, setBooking] = useState({
    service: null as any | null,
    specialist: null as typeof specialists[0] | null,
    date: "",
    time: "",
    name: session?.user?.name || "",
    email: session?.user?.email || "",
    phone: "",
    notes: "",
  });

  useEffect(() => {
    if (session?.user) {
      setBooking(prev => ({
        ...prev,
        name: prev.name || session.user?.name || "",
        email: prev.email || session.user?.email || "",
      }));
    }
  }, [session]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("/api/services");
        const data = await res.json();
        const mapped = data.map((s: any) => ({
          ...s,
          title: s.name,
          image: s.imageUrl,
          duration: `${s.duration} min`,
          category: s.category || "Wellness"
        }));
        setServices(mapped.length > 0 ? mapped : mockServices);
      } catch (err) {
        console.error("Failed to load services:", err);
        setServices(mockServices);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const canNext = [
    !!booking.service,
    !!booking.specialist,
    !!booking.date && !!booking.time,
    !!booking.name && !!booking.email,
    true,
  ][step];

  const handleNext = async () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      try {
        setSubmitting(true);
        const res = await fetch("/api/bookings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...booking,
            serviceId: booking.service.id,
          }),
        });

        if (!res.ok) throw new Error("Failed to book");

        toast.success("Booking confirmed!");
        navigate("/booking/success", { state: { booking } });
      } catch (err) {
        toast.error("Something went wrong. Please try again.");
      } finally {
        setSubmitting(false);
      }
    }
  };

  const displayDate = booking.date
    ? new Date(booking.date + "T12:00:00").toLocaleDateString("en", { weekday: "long", month: "long", day: "numeric", year: "numeric" })
    : "";

  const inputClass = "w-full bg-pink-50/40 border border-pink-200/60 rounded-xl px-4 py-3 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:bg-white transition-colors";

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50/60 via-pink-50/30 to-fuchsia-50/20 pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-50 border border-pink-200/70 text-pink-600 text-sm mb-4">
            <Sparkles className="w-3.5 h-3.5" /> Book Your Experience
          </div>
          <h1 style={SERIF} className="text-4xl lg:text-5xl font-semibold text-gray-900 mb-2">
            Reserve Your{" "}
            <span className="bg-gradient-to-r from-[#EC4899] to-[#A855F7] bg-clip-text text-transparent">Treatment</span>
          </h1>
        </div>

        {/* Steps */}
        <div className="flex items-center justify-center mb-12 overflow-x-auto">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="flex items-center">
                <button
                  onClick={() => i < step && setStep(i)}
                  className={`flex flex-col items-center gap-1.5 ${i <= step ? "opacity-100" : "opacity-30"} ${i < step ? "cursor-pointer" : "cursor-default"}`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    i < step
                      ? "bg-gradient-to-br from-[#EC4899] to-[#A855F7] shadow-sm shadow-pink-300/40"
                      : i === step
                      ? "bg-gradient-to-br from-[#EC4899] to-[#A855F7] ring-4 ring-pink-200/60 shadow-sm shadow-pink-300/40"
                      : "bg-white border-2 border-pink-200"
                  }`}>
                    {i < step ? <Check className="w-5 h-5 text-white" /> : <Icon className="w-4 h-4 text-white" />}
                  </div>
                  <span className="text-gray-500 text-xs whitespace-nowrap hidden sm:block">{s.label}</span>
                </button>
                {i < STEPS.length - 1 && (
                  <div className={`w-8 sm:w-16 h-px mx-2 transition-all ${i < step ? "bg-gradient-to-r from-[#EC4899] to-[#A855F7]" : "bg-pink-200/60"}`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Step Content */}
        <div className="bg-white border border-pink-100 rounded-2xl p-8 mb-8 shadow-sm shadow-pink-50/60">

          {/* Step 0: Choose Service */}
          {step === 0 && (
            <div>
              <h2 style={SERIF} className="text-gray-900 text-2xl font-semibold mb-6">Choose Your Treatment</h2>
              {loading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-10 h-10 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin mb-4" />
                  <p className="text-gray-400 text-sm">Loading services...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {services.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => setBooking({ ...booking, service })}
                      className={`flex gap-4 p-4 rounded-xl border text-left transition-all ${
                        booking.service?.id === service.id
                          ? "border-pink-400 bg-pink-50 shadow-sm shadow-pink-100/60"
                          : "border-pink-100 bg-white hover:border-pink-300 hover:bg-pink-50/40"
                      }`}
                    >
                      <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-pink-100">
                        <ImageWithFallback src={service.image} alt={service.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-900 text-sm font-medium">{service.title}</p>
                        <p className="text-gray-400 text-xs mt-0.5">{service.category}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-gray-400 text-xs flex items-center gap-1">
                            <Clock className="w-3 h-3 text-pink-300" />{service.duration}
                          </span>
                          <span className="text-pink-600 text-sm font-semibold">${service.price}</span>
                        </div>
                      </div>
                      {booking.service?.id === service.id && (
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#EC4899] to-[#A855F7] flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Step 1: Choose Specialist */}
          {step === 1 && (
            <div>
              <h2 style={SERIF} className="text-gray-900 text-2xl font-semibold mb-6">Select Your Specialist</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {specialists.map((spec) => (
                  <button
                    key={spec.id}
                    onClick={() => setBooking({ ...booking, specialist: spec })}
                    className={`flex gap-4 p-5 rounded-xl border text-left transition-all ${
                      booking.specialist?.id === spec.id
                        ? "border-pink-400 bg-pink-50 shadow-sm shadow-pink-100/60"
                        : "border-pink-100 bg-white hover:border-pink-300 hover:bg-pink-50/40"
                    }`}
                  >
                    <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 border-2 border-pink-200">
                      <ImageWithFallback src={spec.image} alt={spec.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-gray-900 text-sm font-medium">{spec.name}</p>
                      <p className="text-pink-500 text-xs mt-0.5">{spec.role}</p>
                      <p className="text-gray-400 text-xs mt-1">{spec.experience} experience</p>
                    </div>
                    {booking.specialist?.id === spec.id && (
                      <div className="ml-auto w-5 h-5 rounded-full bg-gradient-to-br from-[#EC4899] to-[#A855F7] flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Date & Time */}
          {step === 2 && (
            <div>
              <h2 style={SERIF} className="text-gray-900 text-2xl font-semibold mb-6">Select Date & Time</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <MiniCalendar
                  selected={booking.date}
                  onSelect={(d) => setBooking({ ...booking, date: d, time: "" })}
                />
                <div>
                  <p className="text-gray-500 text-sm mb-4">
                    {booking.date ? `Available times for ${displayDate}` : "Select a date first"}
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        disabled={!booking.date}
                        onClick={() => setBooking({ ...booking, time: slot })}
                        className={`py-2.5 rounded-xl text-sm transition-all ${
                          booking.time === slot
                            ? "bg-gradient-to-r from-[#EC4899] to-[#A855F7] text-white shadow-sm shadow-pink-300/30"
                            : !booking.date
                            ? "bg-pink-50/40 border border-pink-100 text-gray-300 cursor-not-allowed"
                            : "bg-pink-50/40 border border-pink-200/60 text-gray-600 hover:border-pink-400 hover:text-pink-700 hover:bg-pink-50"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Customer Info */}
          {step === 3 && (
            <div>
              <h2 style={SERIF} className="text-gray-900 text-2xl font-semibold mb-6">Your Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-gray-500 text-sm mb-1.5 block">Full Name *</label>
                  <input value={booking.name} onChange={(e) => setBooking({ ...booking, name: e.target.value })} placeholder="Your full name" className={inputClass} />
                </div>
                <div>
                  <label className="text-gray-500 text-sm mb-1.5 block">Email Address *</label>
                  <input type="email" value={booking.email} onChange={(e) => setBooking({ ...booking, email: e.target.value })} placeholder="your@email.com" className={inputClass} />
                </div>
                <div>
                  <label className="text-gray-500 text-sm mb-1.5 block">Phone Number</label>
                  <input value={booking.phone} onChange={(e) => setBooking({ ...booking, phone: e.target.value })} placeholder="+1 (555) 000-0000" className={inputClass} />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-gray-500 text-sm mb-1.5 block">Special Requests</label>
                  <textarea value={booking.notes} onChange={(e) => setBooking({ ...booking, notes: e.target.value })} placeholder="Any allergies, preferences, or special requirements..." rows={3} className={`${inputClass} resize-none`} />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Confirm */}
          {step === 4 && (
            <div>
              <h2 style={SERIF} className="text-gray-900 text-2xl font-semibold mb-6">Confirm Your Booking</h2>
              <div className="space-y-4">
                {[
                  { label: "Treatment", value: booking.service?.title, sub: booking.service?.category },
                  { label: "Specialist", value: booking.specialist?.name, sub: booking.specialist?.role },
                  { label: "Date", value: displayDate },
                  { label: "Time", value: booking.time },
                  { label: "Duration", value: booking.service?.duration },
                  { label: "Guest", value: booking.name, sub: booking.email },
                  { label: "Phone", value: booking.phone || "Not provided" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start justify-between py-3 border-b border-pink-100">
                    <span className="text-gray-400 text-sm">{item.label}</span>
                    <div className="text-right">
                      <span className="text-gray-800 text-sm">{item.value}</span>
                      {item.sub && <p className="text-gray-400 text-xs">{item.sub}</p>}
                    </div>
                  </div>
                ))}

                <div className="flex items-center justify-between pt-3">
                  <span className="text-gray-900 font-medium">Total</span>
                  <span style={SERIF} className="text-2xl font-semibold bg-gradient-to-r from-[#EC4899] to-[#A855F7] bg-clip-text text-transparent">
                    ${booking.service?.price}
                  </span>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-xl bg-pink-50/60 border border-pink-200/50">
                <p className="text-gray-500 text-sm text-center">
                  By confirming, you agree to our cancellation policy. Free cancellation up to 24 hours before your appointment.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setStep(Math.max(0, step - 1))}
            className={`px-8 py-3 rounded-full border border-pink-200 text-gray-500 hover:text-pink-600 hover:border-pink-300 hover:bg-pink-50 transition-all ${step === 0 ? "invisible" : ""}`}
          >
            Back
          </button>

          <div className="flex gap-2">
            {STEPS.map((_, i) => (
              <div key={i} className={`w-2 h-2 rounded-full transition-all ${i === step ? "bg-[#EC4899] w-5" : i < step ? "bg-pink-400/60" : "bg-pink-200"}`} />
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={!canNext || submitting}
            className="flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-[#EC4899] to-[#A855F7] text-white font-medium hover:opacity-90 hover:shadow-lg hover:shadow-pink-300/30 transition-all disabled:opacity-40 disabled:cursor-not-allowed group"
          >
            {submitting ? (
              <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            ) : step === 4 ? (
              "Confirm Booking"
            ) : (
              "Continue"
            )}
            {!submitting && <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />}
          </button>
        </div>
      </div>
    </div>
  );
}
