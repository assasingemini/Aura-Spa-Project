import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, Users, CalendarDays, DollarSign, Star, ArrowRight, Clock, Loader2 } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Link } from "react-router";
import { revenueData, serviceDistribution, Booking } from "../../data/mockData";
import { toast } from "sonner";

const SERIF = { fontFamily: "'Playfair Display', serif" };

const STAT_CARDS = [
  { label: "Tổng doanh thu", value: "$32,840", change: "+12.5%", up: true, icon: DollarSign, color: "from-[#EC4899] to-[#F472B6]", bg: "bg-pink-50", ring: "ring-pink-200/60" },
  { label: "Lịch hẹn", value: "164", change: "+8.2%", up: true, icon: CalendarDays, color: "from-[#A855F7] to-[#C084FC]", bg: "bg-purple-50", ring: "ring-purple-200/60" },
  { label: "Khách kích hoạt", value: "847", change: "+15.3%", up: true, icon: Users, color: "from-[#F472B6] to-[#EC4899]", bg: "bg-rose-50", ring: "ring-rose-200/60" },
  { label: "Đánh giá TB", value: "4.97", change: "+0.02", up: true, icon: Star, color: "from-[#FBBF24] to-[#F59E0B]", bg: "bg-amber-50", ring: "ring-amber-200/60" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-pink-100 rounded-xl px-4 py-3 shadow-lg shadow-pink-100/40 text-sm">
        <p className="text-gray-500 mb-1">{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} style={{ color: p.color }} className="font-medium">
            {p.name === "revenue" ? "$" : ""}{p.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function AdminDashboard() {
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const res = await fetch("/api/bookings", { cache: "no-store" });
        if (!res.ok) {
          console.error(`Bookings API failed with status ${res.status}`);
          const errData = await res.json().catch(() => ({}));
          console.error("Error details:", errData);
          setRecentBookings([]);
          return;
        }
        const data = await res.json();
        if (Array.isArray(data)) {
          setRecentBookings(data.slice(0, 5));
        } else {
          console.error("Received non-array bookings data in dashboard:", data);
          setRecentBookings([]);
        }
      } catch (error) {
        console.error("Dashboard fetch error:", error);
        toast.error("Failed to load dashboard data");
        setRecentBookings([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRecent();
  }, []);

  const statusColor: Record<string, string> = {
    confirmed: "bg-green-50 text-green-600 border-green-200",
    pending: "bg-amber-50 text-amber-600 border-amber-200",
    completed: "bg-blue-50 text-blue-600 border-blue-200",
    cancelled: "bg-red-50 text-red-500 border-red-200",
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 style={SERIF} className="text-gray-900 text-2xl font-semibold">Tổng quan</h1>
          <p className="text-gray-400 text-sm mt-1">{new Date().toLocaleDateString("vi", { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {STAT_CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className={`p-6 rounded-2xl bg-white border border-pink-100/80 hover:border-pink-200 hover:shadow-md hover:shadow-pink-50/80 transition-all group`}>
              <div className="flex items-start justify-between mb-5">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center shadow-sm`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className={`flex items-center gap-1 text-xs ${card.up ? "text-green-500" : "text-red-400"}`}>
                  {card.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {card.change}
                </span>
              </div>
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">{card.label}</p>
              <p style={SERIF} className="text-gray-900 text-2xl font-semibold">{card.value}</p>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        {/* Revenue Chart */}
        <div className="xl:col-span-2 p-6 rounded-2xl bg-white border border-pink-100/80">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 style={SERIF} className="text-gray-900 font-semibold">Doanh thu & Lịch hẹn</h3>
              <p className="text-gray-400 text-xs mt-0.5">8 tháng qua</p>
            </div>
            <select className="bg-pink-50 border border-pink-200/60 rounded-lg px-3 py-1.5 text-gray-600 text-xs focus:outline-none focus:border-pink-300">
              <option>8 tháng qua</option>
              <option>Năm ngoái</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={revenueData} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="colorRevenuePink" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EC4899" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#EC4899" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorBookingsPurple" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#A855F7" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#A855F7" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(236, 72, 153, 0.06)" />
              <XAxis dataKey="month" tick={{ fill: "#9ca3af", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#9ca3af", fontSize: 11 }} axisLine={false} tickLine={false} width={45} tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="revenue" stroke="#EC4899" strokeWidth={2} fill="url(#colorRevenuePink)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Service Distribution Pie */}
        <div className="p-6 rounded-2xl bg-white border border-pink-100/80">
          <h3 style={SERIF} className="text-gray-900 font-semibold mb-1">Cơ cấu dịch vụ</h3>
          <p className="text-gray-400 text-xs mb-5">Phân bổ liệu trình khách chọn</p>
          <div className="flex justify-center mb-4">
            <ResponsiveContainer width={180} height={180}>
              <PieChart>
                <Pie data={serviceDistribution} cx="50%" cy="50%" innerRadius={52} outerRadius={80} paddingAngle={3} dataKey="value">
                  {serviceDistribution.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2">
            {serviceDistribution.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                  <span className="text-gray-500 text-xs">{item.name}</span>
                </div>
                <span className="text-gray-700 text-xs font-medium">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Bookings Bar Chart */}
      <div className="p-6 rounded-2xl bg-white border border-pink-100/80 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 style={SERIF} className="text-gray-900 font-semibold">Lịch hẹn theo tháng</h3>
            <p className="text-gray-400 text-xs mt-0.5">Lưu lượng khách mỗi tháng</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={revenueData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(236, 72, 153, 0.06)" vertical={false} />
            <XAxis dataKey="month" tick={{ fill: "#9ca3af", fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#9ca3af", fontSize: 11 }} axisLine={false} tickLine={false} width={30} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="bookings" radius={[6, 6, 0, 0]}>
              {revenueData.map((_, i) => (
                <Cell key={i} fill={i === revenueData.length - 1 ? "url(#barGradPink)" : "rgba(236, 72, 153, 0.2)"} />
              ))}
            </Bar>
            <defs>
              <linearGradient id="barGradPink" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#EC4899" />
                <stop offset="100%" stopColor="#A855F7" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Bookings */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 rounded-2xl bg-white border border-pink-100/80 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-5 border-b border-pink-50">
            <h3 style={SERIF} className="text-gray-900 font-semibold">Lịch hẹn gần đây</h3>
            <Link to="/admin/bookings" className="text-pink-500 text-sm hover:text-pink-700 transition-colors flex items-center gap-1">
              Xem tất cả <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex items-center justify-center py-24">
                <Loader2 className="w-8 h-8 text-pink-500 animate-spin" />
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-pink-50/80">
                    <th className="px-6 py-3 text-left text-gray-400 text-xs uppercase tracking-wider">Khách hàng</th>
                    <th className="px-6 py-3 text-left text-gray-400 text-xs uppercase tracking-wider">Dịch vụ</th>
                    <th className="px-6 py-3 text-left text-gray-400 text-xs uppercase tracking-wider">Ngày/Giờ</th>
                    <th className="px-6 py-3 text-left text-gray-400 text-xs uppercase tracking-wider">Trạng thái</th>
                    <th className="px-6 py-3 text-right text-gray-400 text-xs uppercase tracking-wider">Thành tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((b, i) => (
                    <tr key={b.id} className={`border-b border-pink-50/60 hover:bg-pink-50/30 transition-colors ${i === recentBookings.length - 1 ? "border-transparent" : ""}`}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#EC4899] to-[#A855F7] flex items-center justify-center text-white text-xs font-semibold shrink-0">
                            {b.customer.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                          </div>
                          <span className="text-gray-800 text-sm">{b.customer}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-500 text-sm">{b.service}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                          <Clock className="w-3 h-3 text-pink-300" /> {b.date} · {b.time}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs border capitalize ${statusColor[b.status]}`}>
                          {b.status === "pending" ? "Chờ duyệt" : b.status === "confirmed" ? "Đã xác nhận" : b.status === "completed" ? "Hoàn thành" : b.status === "cancelled" ? "Đã hủy" : b.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right text-gray-900 font-medium text-sm">${b.amount}</td>
                    </tr>
                  ))}
                  {recentBookings.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-gray-400 text-sm">Chưa có lịch hẹn gần đây</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <div className="p-6 rounded-2xl bg-white border border-pink-100/80">
            <h3 style={SERIF} className="text-gray-900 font-semibold mb-5">Tác vụ nhanh</h3>
            <div className="space-y-2">
              {[
                { label: "Quản lý dịch vụ", href: "/admin/services", gradient: false },
                { label: "Xem khách hàng", href: "/admin/customers", gradient: false },
                { label: "Thư viện Ảnh", href: "/admin/media", gradient: false },
                { label: "Cài đặt & Điểm", href: "/admin/settings", gradient: false },
              ].map((action) => (
                <Link
                  key={action.label}
                  to={action.href}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all group text-sm ${
                    action.gradient
                      ? "bg-gradient-to-r from-[#EC4899] to-[#A855F7] text-white hover:opacity-90 hover:shadow-md hover:shadow-pink-300/30"
                      : "bg-pink-50/60 border border-pink-100 text-gray-600 hover:text-pink-600 hover:border-pink-200 hover:bg-pink-50"
                  }`}
                >
                  {action.label}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              ))}
            </div>
          </div>

          {/* Today's summary */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-pink-50 to-fuchsia-50/60 border border-pink-200/50">
            <h3 style={SERIF} className="text-gray-900 font-semibold mb-4">Tổng kết Hôm nay</h3>
            <div className="space-y-3">
              {[
                { label: "Số lịch hẹn", value: "8" },
                { label: "Doanh thu dự kiến", value: "$1,240" },
                { label: "Lịch trống còn lại", value: "4" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-gray-500 text-sm">{item.label}</span>
                  <span className="text-gray-900 font-medium text-sm">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
