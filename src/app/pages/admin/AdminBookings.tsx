import { useEffect, useState } from "react";
import { Search, Eye, CheckCircle, XCircle, Clock, Calendar, Loader2 } from "lucide-react";
import { Booking } from "../../data/mockData";
import { toast } from "sonner";

const SERIF = { fontFamily: "'Playfair Display', serif" };

const STATUS_OPTIONS = ["All", "pending", "confirmed", "completed", "cancelled"];

const statusStyle: Record<string, string> = {
  confirmed: "bg-green-50 text-green-600 border-green-200",
  pending: "bg-amber-50 text-amber-600 border-amber-200",
  completed: "bg-blue-50 text-blue-600 border-blue-200",
  cancelled: "bg-red-50 text-red-500 border-red-200",
};

export function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [page, setPage] = useState(1);
  const PER_PAGE = 6;

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/bookings", { cache: "no-store" });
      if (!res.ok) {
        console.error(`Bookings API failed with status ${res.status}`);
        setBookings([]);
        return;
      }
      const data = await res.json();
      if (Array.isArray(data)) {
        setBookings(data);
      } else {
        console.error("Received non-array bookings data:", data);
        setBookings([]);
        if (data.error) toast.error(data.error);
      }
    } catch (error) {
      toast.error("Failed to load bookings");
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const filtered = (Array.isArray(bookings) ? bookings : []).filter((b) => {
    const matchSearch = (b.customer || "").toLowerCase().includes(search.toLowerCase()) ||
      (b.service || "").toLowerCase().includes(search.toLowerCase()) ||
      (b.id || "").toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || b.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const totalPages = Math.ceil(filtered.length / PER_PAGE);

  const updateStatus = async (id: string, status: Booking["status"]) => {
    try {
      const res = await fetch("/api/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (!res.ok) throw new Error("Update failed");
      
      toast.success(`Booking ${status}`);
      fetchBookings();
      setSelectedBooking(null);
    } catch (error) {
      toast.error("Failed to update booking status");
    }
  };

  const stats = [
    { label: "Total", value: bookings.length, color: "text-gray-900", bg: "from-pink-50 to-rose-50", border: "border-pink-200/60" },
    { label: "Confirmed", value: bookings.filter((b) => b.status === "confirmed").length, color: "text-green-600", bg: "from-green-50 to-emerald-50", border: "border-green-200/60" },
    { label: "Pending", value: bookings.filter((b) => b.status === "pending").length, color: "text-amber-600", bg: "from-amber-50 to-yellow-50", border: "border-amber-200/60" },
    { label: "Completed", value: bookings.filter((b) => b.status === "completed").length, color: "text-blue-600", bg: "from-blue-50 to-sky-50", border: "border-blue-200/60" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 style={SERIF} className="text-gray-900 text-2xl font-semibold">Manage Bookings</h1>
        <p className="text-gray-400 text-sm mt-1">Track and manage all spa appointments</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => (
          <div key={stat.label} className={`p-5 rounded-2xl bg-gradient-to-br ${stat.bg} border ${stat.border} text-center`}>
            <p className={`text-2xl font-semibold mb-1 ${stat.color}`} style={SERIF}>{stat.value}</p>
            <p className="text-gray-500 text-xs">{stat.label} Bookings</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-pink-300" />
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search bookings..."
            className="w-full bg-pink-50/40 border border-pink-200/60 rounded-xl pl-11 pr-4 py-2.5 text-gray-700 text-sm placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:bg-white transition-colors"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {STATUS_OPTIONS.map((s) => (
            <button
              key={s}
              onClick={() => { setStatusFilter(s); setPage(1); }}
              className={`shrink-0 px-4 py-2 rounded-xl text-sm capitalize transition-all ${
                statusFilter === s
                  ? "bg-gradient-to-r from-[#EC4899] to-[#A855F7] text-white shadow-sm shadow-pink-300/30"
                  : "bg-pink-50 border border-pink-200/60 text-gray-600 hover:text-pink-600 hover:border-pink-300"
              }`}
            >
              {s === "All" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="w-8 h-8 text-pink-500 animate-spin" />
        </div>
      ) : (
        <div className="rounded-2xl bg-white border border-pink-100/80 overflow-hidden mb-6 shadow-sm shadow-pink-50/60">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-pink-50/80 bg-pink-50/40">
                  {["Booking ID", "Client", "Service", "Specialist", "Date & Time", "Status", "Amount", "Actions"].map((h) => (
                    <th key={h} className="px-5 py-4 text-left text-gray-400 text-xs uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginated.map((b, i) => (
                  <tr key={b.id} className={`border-b border-pink-50/50 hover:bg-pink-50/30 transition-colors ${i === paginated.length - 1 ? "border-transparent" : ""}`}>
                    <td className="px-5 py-4 text-pink-500 text-sm font-mono">{b.id}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#EC4899] to-[#A855F7] flex items-center justify-center text-white text-xs font-semibold shrink-0">
                          {b.customer.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                        </div>
                        <span className="text-gray-800 text-sm whitespace-nowrap">{b.customer}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-gray-500 text-sm whitespace-nowrap">{b.service}</td>
                    <td className="px-5 py-4 text-gray-500 text-sm whitespace-nowrap">{b.specialist}</td>
                    <td className="px-5 py-4">
                      <div className="text-gray-400 text-xs">
                        <div className="flex items-center gap-1"><Calendar className="w-3 h-3 text-pink-300" />{b.date}</div>
                        <div className="flex items-center gap-1 mt-0.5"><Clock className="w-3 h-3 text-pink-300" />{b.time}</div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs border capitalize ${statusStyle[b.status]}`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-gray-900 font-medium text-sm">${b.amount}</td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => setSelectedBooking(b)}
                        className="p-2 rounded-lg bg-pink-50 border border-pink-200/60 text-pink-400 hover:text-pink-600 hover:bg-pink-100 hover:border-pink-300 transition-all"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {paginated.length === 0 && (
              <div className="py-16 text-center text-gray-400">No bookings found</div>
            )}
          </div>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`w-9 h-9 rounded-xl text-sm transition-all ${
                page === i + 1
                  ? "bg-gradient-to-r from-[#EC4899] to-[#A855F7] text-white shadow-sm shadow-pink-300/30"
                  : "bg-pink-50 border border-pink-200/60 text-gray-500 hover:text-pink-600 hover:border-pink-300"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* Booking Detail Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-md">
          <div className="w-full max-w-md rounded-2xl bg-white border border-pink-100 p-8 shadow-2xl shadow-pink-200/30">
            <div className="flex items-center justify-between mb-6">
              <h2 style={SERIF} className="text-gray-900 text-xl font-semibold">Booking Details</h2>
              <button onClick={() => setSelectedBooking(null)} className="p-2 rounded-lg hover:bg-pink-50 text-gray-400 hover:text-pink-600 transition-all">
                ✕
              </button>
            </div>

            <div className="space-y-4 mb-6">
              {[
                { label: "Reference", value: selectedBooking.id },
                { label: "Client", value: selectedBooking.customer },
                { label: "Service", value: selectedBooking.service },
                { label: "Specialist", value: selectedBooking.specialist },
                { label: "Date", value: selectedBooking.date },
                { label: "Time", value: selectedBooking.time },
                { label: "Amount", value: `$${selectedBooking.amount}` },
              ].map((item) => (
                <div key={item.label} className="flex justify-between">
                  <span className="text-gray-400 text-sm">{item.label}</span>
                  <span className="text-gray-800 text-sm font-medium">{item.value}</span>
                </div>
              ))}
              <div className="flex justify-between items-center pt-2 border-t border-pink-100">
                <span className="text-gray-400 text-sm">Status</span>
                <span className={`px-3 py-1 rounded-full text-xs border capitalize ${statusStyle[selectedBooking.status]}`}>
                  {selectedBooking.status}
                </span>
              </div>
            </div>

            {selectedBooking.status !== "completed" && selectedBooking.status !== "cancelled" && (
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => updateStatus(selectedBooking.id, "confirmed")}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-green-50 border border-green-200 text-green-600 hover:bg-green-100 text-sm transition-all"
                >
                  <CheckCircle className="w-4 h-4" /> Confirm
                </button>
                <button
                  onClick={() => updateStatus(selectedBooking.id, "cancelled")}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-red-50 border border-red-200 text-red-500 hover:bg-red-100 text-sm transition-all"
                >
                  <XCircle className="w-4 h-4" /> Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
