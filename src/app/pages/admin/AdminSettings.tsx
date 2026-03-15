import { useState } from "react";
import { Save, Building2, Clock, Phone, Bell, Shield } from "lucide-react";
import { toast } from "sonner";

const SERIF = { fontFamily: "'Playfair Display', serif" };

const TABS = [
  { id: "general", label: "General", icon: Building2 },
  { id: "hours", label: "Business Hours", icon: Clock },
  { id: "contact", label: "Contact Info", icon: Phone },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
];

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export function AdminSettings() {
  const [activeTab, setActiveTab] = useState("general");
  const [saving, setSaving] = useState(false);

  const [general, setGeneral] = useState({
    name: "AURA Luxury Spa",
    tagline: "Where Luxury Meets Transformation",
    description: "A premier luxury spa destination offering world-class treatments and personalized wellness experiences.",
    currency: "USD",
    timezone: "America/New_York",
    bookingLeadTime: "24",
    cancellationPolicy: "24",
  });

  const [hours, setHours] = useState(
    DAYS.map((day, i) => ({
      day,
      open: i < 5 ? "09:00" : "10:00",
      close: i < 5 ? "20:00" : "19:00",
      closed: false,
    }))
  );

  const [contact, setContact] = useState({
    address: "425 Madison Avenue, Suite 1200",
    city: "New York",
    state: "NY",
    zip: "10017",
    phone: "+1 (212) 555-0100",
    phone2: "+1 (212) 555-0101",
    email: "hello@auraspa.com",
    bookingEmail: "bookings@auraspa.com",
    website: "https://auraspa.com",
    instagram: "@auraspa",
    facebook: "AURASpaNY",
  });

  const [notifications, setNotifications] = useState({
    newBooking: true,
    bookingReminder: true,
    cancellation: true,
    customerReview: true,
    weeklyReport: false,
    smsEnabled: true,
  });

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
    toast.success("Settings saved successfully");
  };

  const inputClass = "w-full bg-pink-50/40 border border-pink-200/60 rounded-xl px-4 py-3 text-gray-800 text-sm focus:outline-none focus:border-pink-400 focus:bg-white transition-colors";

  return (
    <div>
      <div className="mb-8">
        <h1 style={SERIF} className="text-gray-900 text-2xl font-semibold">Settings</h1>
        <p className="text-gray-400 text-sm mt-1">Manage your spa configuration and preferences</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar tabs */}
        <div className="lg:w-56 shrink-0">
          <nav className="space-y-1">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all text-left ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-pink-50 to-fuchsia-50 text-pink-700 border border-pink-200/70 shadow-sm"
                      : "text-gray-500 hover:text-pink-600 hover:bg-pink-50/60"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${activeTab === tab.id ? "text-[#EC4899]" : ""}`} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="p-8 rounded-2xl bg-white border border-pink-100/80 shadow-sm shadow-pink-50/60">

            {/* General */}
            {activeTab === "general" && (
              <div className="space-y-6">
                <h2 style={SERIF} className="text-gray-900 text-xl font-semibold">General Settings</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="sm:col-span-2">
                    <label className="text-gray-500 text-sm mb-1.5 block">Spa Name</label>
                    <input value={general.name} onChange={(e) => setGeneral({ ...general, name: e.target.value })} className={inputClass} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-gray-500 text-sm mb-1.5 block">Tagline</label>
                    <input value={general.tagline} onChange={(e) => setGeneral({ ...general, tagline: e.target.value })} className={inputClass} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-gray-500 text-sm mb-1.5 block">Description</label>
                    <textarea value={general.description} onChange={(e) => setGeneral({ ...general, description: e.target.value })} rows={3} className={`${inputClass} resize-none`} />
                  </div>
                  <div>
                    <label className="text-gray-500 text-sm mb-1.5 block">Currency</label>
                    <select value={general.currency} onChange={(e) => setGeneral({ ...general, currency: e.target.value })} className={inputClass}>
                      <option>USD</option>
                      <option>EUR</option>
                      <option>GBP</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-gray-500 text-sm mb-1.5 block">Timezone</label>
                    <select value={general.timezone} onChange={(e) => setGeneral({ ...general, timezone: e.target.value })} className={inputClass}>
                      <option>America/New_York</option>
                      <option>America/Los_Angeles</option>
                      <option>Europe/London</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-gray-500 text-sm mb-1.5 block">Booking Lead Time (hours)</label>
                    <input type="number" value={general.bookingLeadTime} onChange={(e) => setGeneral({ ...general, bookingLeadTime: e.target.value })} className={inputClass} />
                  </div>
                  <div>
                    <label className="text-gray-500 text-sm mb-1.5 block">Cancellation Window (hours)</label>
                    <input type="number" value={general.cancellationPolicy} onChange={(e) => setGeneral({ ...general, cancellationPolicy: e.target.value })} className={inputClass} />
                  </div>
                </div>
              </div>
            )}

            {/* Hours */}
            {activeTab === "hours" && (
              <div className="space-y-6">
                <h2 style={SERIF} className="text-gray-900 text-xl font-semibold">Business Hours</h2>
                <div className="space-y-3">
                  {hours.map((h, i) => (
                    <div key={h.day} className="flex items-center gap-4 p-4 rounded-xl bg-pink-50/40 border border-pink-100">
                      <span className="text-gray-600 text-sm w-24 shrink-0">{h.day}</span>
                      <div className="flex items-center gap-3 flex-1">
                        <input
                          type="time"
                          value={h.open}
                          disabled={h.closed}
                          onChange={(e) => setHours(hours.map((x, j) => j === i ? { ...x, open: e.target.value } : x))}
                          className="bg-white border border-pink-200/60 rounded-lg px-3 py-2 text-gray-700 text-sm focus:outline-none focus:border-pink-400 disabled:opacity-40"
                        />
                        <span className="text-pink-300">–</span>
                        <input
                          type="time"
                          value={h.close}
                          disabled={h.closed}
                          onChange={(e) => setHours(hours.map((x, j) => j === i ? { ...x, close: e.target.value } : x))}
                          className="bg-white border border-pink-200/60 rounded-lg px-3 py-2 text-gray-700 text-sm focus:outline-none focus:border-pink-400 disabled:opacity-40"
                        />
                      </div>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={h.closed}
                          onChange={(e) => setHours(hours.map((x, j) => j === i ? { ...x, closed: e.target.checked } : x))}
                          className="w-4 h-4 accent-red-400"
                        />
                        <span className="text-gray-400 text-sm">Closed</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contact */}
            {activeTab === "contact" && (
              <div className="space-y-6">
                <h2 style={SERIF} className="text-gray-900 text-xl font-semibold">Contact Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="sm:col-span-2">
                    <label className="text-gray-500 text-sm mb-1.5 block">Street Address</label>
                    <input value={contact.address} onChange={(e) => setContact({ ...contact, address: e.target.value })} className={inputClass} />
                  </div>
                  {[
                    { label: "City", key: "city" as const },
                    { label: "State", key: "state" as const },
                    { label: "ZIP", key: "zip" as const },
                    { label: "Primary Phone", key: "phone" as const },
                    { label: "Secondary Phone", key: "phone2" as const },
                    { label: "Primary Email", key: "email" as const },
                    { label: "Booking Email", key: "bookingEmail" as const },
                    { label: "Website", key: "website" as const },
                    { label: "Instagram", key: "instagram" as const },
                    { label: "Facebook", key: "facebook" as const },
                  ].map((field) => (
                    <div key={field.key}>
                      <label className="text-gray-500 text-sm mb-1.5 block">{field.label}</label>
                      <input
                        value={contact[field.key]}
                        onChange={(e) => setContact({ ...contact, [field.key]: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Notifications */}
            {activeTab === "notifications" && (
              <div className="space-y-6">
                <h2 style={SERIF} className="text-gray-900 text-xl font-semibold">Notification Preferences</h2>
                <div className="space-y-4">
                  {[
                    { key: "newBooking" as const, label: "New Booking", desc: "Get notified when a new booking is made" },
                    { key: "bookingReminder" as const, label: "Booking Reminders", desc: "Send automatic reminders to clients" },
                    { key: "cancellation" as const, label: "Cancellations", desc: "Alert when a booking is cancelled" },
                    { key: "customerReview" as const, label: "Customer Reviews", desc: "Get notified of new client reviews" },
                    { key: "weeklyReport" as const, label: "Weekly Reports", desc: "Receive weekly performance summaries" },
                    { key: "smsEnabled" as const, label: "SMS Notifications", desc: "Enable SMS for booking confirmations" },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-5 rounded-xl bg-pink-50/40 border border-pink-100">
                      <div>
                        <p className="text-gray-800 text-sm font-medium">{item.label}</p>
                        <p className="text-gray-400 text-xs mt-0.5">{item.desc}</p>
                      </div>
                      <button
                        onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key] })}
                        className={`relative w-12 h-6 rounded-full transition-all ${notifications[item.key] ? "bg-gradient-to-r from-[#EC4899] to-[#A855F7] shadow-sm shadow-pink-300/30" : "bg-gray-200"}`}
                      >
                        <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-all ${notifications[item.key] ? "left-7" : "left-1"}`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Security */}
            {activeTab === "security" && (
              <div className="space-y-6">
                <h2 style={SERIF} className="text-gray-900 text-xl font-semibold">Security Settings</h2>
                <div className="space-y-5">
                  <div className="p-5 rounded-xl bg-pink-50/40 border border-pink-100">
                    <h3 className="text-gray-800 text-sm font-medium mb-4">Change Password</h3>
                    <div className="space-y-3">
                      {["Current Password", "New Password", "Confirm New Password"].map((label) => (
                        <div key={label}>
                          <label className="text-gray-400 text-xs mb-1 block">{label}</label>
                          <input type="password" placeholder="••••••••" className={inputClass} />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-5 rounded-xl bg-pink-50/40 border border-pink-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-800 text-sm font-medium">Two-Factor Authentication</p>
                        <p className="text-gray-400 text-xs mt-0.5">Add an extra layer of security</p>
                      </div>
                      <button className="px-4 py-2 rounded-xl bg-pink-50 border border-pink-200 text-pink-600 text-sm hover:bg-pink-100 hover:border-pink-300 transition-all">
                        Enable 2FA
                      </button>
                    </div>
                  </div>

                  <div className="p-5 rounded-xl bg-pink-50/40 border border-pink-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-800 text-sm font-medium">Active Sessions</p>
                        <p className="text-gray-400 text-xs mt-0.5">Manage your active login sessions</p>
                      </div>
                      <button className="px-4 py-2 rounded-xl bg-red-50 border border-red-200 text-red-500 text-sm hover:bg-red-100 transition-all">
                        Sign Out All
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="mt-8 pt-6 border-t border-pink-100 flex justify-end">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-[#EC4899] to-[#A855F7] text-white text-sm font-medium hover:opacity-90 hover:shadow-lg hover:shadow-pink-300/30 transition-all disabled:opacity-60"
              >
                {saving ? (
                  <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
