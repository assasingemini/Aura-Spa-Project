"use client";

import { TrendingUp, TrendingDown, Users, CalendarDays, DollarSign, Star, ArrowRight, Clock } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import Link from "next/link";

const SERIF = { fontFamily: "'Playfair Display', serif" };

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

export default function AdminDashboardClient({
  stats,
  recentBookings,
  revenueData,
  serviceDistribution,
  summary
}: any) {
  const STAT_CARDS = [
    { label: "Total Revenue", value: stats.totalRevenue, change: stats.revenueChange, up: stats.revenueChange.startsWith("+"), icon: DollarSign, color: "from-[#EC4899] to-[#F472B6]", bg: "bg-pink-50" },
    { label: "Bookings (Month)", value: stats.bookingsThisMonth, change: stats.bookingsChange, up: stats.bookingsChange.startsWith("+"), icon: CalendarDays, color: "from-[#A855F7] to-[#C084FC]", bg: "bg-purple-50" },
    { label: "Active Clients", value: stats.activeClients, change: stats.clientsChange, up: stats.clientsChange.startsWith("+"), icon: Users, color: "from-[#F472B6] to-[#EC4899]", bg: "bg-rose-50" },
    { label: "Avg. Rating", value: stats.avgRating, change: stats.ratingChange, up: stats.ratingChange.startsWith("+"), icon: Star, color: "from-[#FBBF24] to-[#F59E0B]", bg: "bg-amber-50" },
  ];

  const statusColor: Record<string, string> = {
    confirmed: "bg-green-50 text-green-600 border-green-200",
    pending: "bg-amber-50 text-amber-600 border-amber-200",
    completed: "bg-blue-50 text-blue-600 border-blue-200",
    cancelled: "bg-red-50 text-red-500 border-red-200",
  };

  const todayStr = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 style={SERIF} className="text-gray-900 text-2xl font-semibold">Dashboard Overview</h1>
          <p className="text-gray-400 text-sm mt-1">{todayStr}</p>
        </div>
        <Link
          href="/booking"
          target="_blank"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#EC4899] to-[#A855F7] text-white text-sm font-medium hover:opacity-90 hover:shadow-lg hover:shadow-pink-300/30 transition-all"
        >
          New Booking <ArrowRight className="w-4 h-4" />
        </Link>
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
              <h3 style={SERIF} className="text-gray-900 font-semibold">Revenue & Bookings</h3>
              <p className="text-gray-400 text-xs mt-0.5">Last 6 months</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            {revenueData.length > 0 ? (
              <AreaChart data={revenueData} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="colorRevenuePink" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EC4899" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#EC4899" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(236, 72, 153, 0.06)" />
                <XAxis dataKey="month" tick={{ fill: "#9ca3af", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#9ca3af", fontSize: 11 }} axisLine={false} tickLine={false} width={45} tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="revenue" stroke="#EC4899" strokeWidth={2} fill="url(#colorRevenuePink)" />
              </AreaChart>
            ) : (
              <div className="flex items-center justify-center h-full text-pink-300/50">No data</div>
            )}
          </ResponsiveContainer>
        </div>

        {/* Service Distribution Pie */}
        <div className="p-6 rounded-2xl bg-white border border-pink-100/80">
          <h3 style={SERIF} className="text-gray-900 font-semibold mb-1">Service Mix</h3>
          <p className="text-gray-400 text-xs mb-5">Treatment distribution</p>
          <div className="flex justify-center mb-4">
            <ResponsiveContainer width={180} height={180}>
              {serviceDistribution.length > 0 ? (
                <PieChart>
                  <Pie data={serviceDistribution} cx="50%" cy="50%" innerRadius={52} outerRadius={80} paddingAngle={3} dataKey="value">
                    {serviceDistribution.map((entry: any, index: number) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              ) : (
                 <div className="flex items-center justify-center h-full w-full rounded-full border-4 border-pink-50 text-pink-300 text-xs">No Data</div>
              )}
            </ResponsiveContainer>
          </div>
          <div className="space-y-2">
            {serviceDistribution.map((item: any) => (
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
            <h3 style={SERIF} className="text-gray-900 font-semibold">Monthly Bookings</h3>
            <p className="text-gray-400 text-xs mt-0.5">Appointment volume per month</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={160}>
          {revenueData.length > 0 ? (
            <BarChart data={revenueData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(236, 72, 153, 0.06)" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: "#9ca3af", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#9ca3af", fontSize: 11 }} axisLine={false} tickLine={false} width={30} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="bookings" radius={[6, 6, 0, 0]}>
                {revenueData.map((_: any, i: number) => (
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
          ) : (
            <div className="flex items-center justify-center h-full text-pink-300/50">No data</div>
          )}
        </ResponsiveContainer>
      </div>

      {/* Recent Bookings */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 rounded-2xl bg-white border border-pink-100/80 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-5 border-b border-pink-50">
            <h3 style={SERIF} className="text-gray-900 font-semibold">Recent Bookings</h3>
            <Link href="/admin/bookings" className="text-pink-500 text-sm hover:text-pink-700 transition-colors flex items-center gap-1">
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-pink-50/80">
                  <th className="px-6 py-3 text-left text-gray-400 text-xs uppercase tracking-wider">Client</th>
                  <th className="px-6 py-3 text-left text-gray-400 text-xs uppercase tracking-wider">Service</th>
                  <th className="px-6 py-3 text-left text-gray-400 text-xs uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-gray-400 text-xs uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-gray-400 text-xs uppercase tracking-wider">Amount</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.length > 0 ? recentBookings.map((b: any, i: number) => (
                  <tr key={b.id} className={`border-b border-pink-50/60 hover:bg-pink-50/30 transition-colors ${i === recentBookings.length - 1 ? "border-transparent" : ""}`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#EC4899] to-[#A855F7] flex items-center justify-center text-white text-xs font-semibold shrink-0">
                          {b.customer.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase()}
                        </div>
                        <span className="text-gray-800 text-sm whitespace-nowrap">{b.customer}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-sm">{b.service}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-gray-400 text-xs whitespace-nowrap">
                        <Clock className="w-3 h-3" /> {b.date} · {b.time}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs border capitalize ${statusColor[b.status] || "bg-gray-50 text-gray-600 border-gray-200"}`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-gray-900 font-medium text-sm">${b.amount}</td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-400">No recent bookings found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <div className="p-6 rounded-2xl bg-white border border-pink-100/80">
            <h3 style={SERIF} className="text-gray-900 font-semibold mb-5">Quick Actions</h3>
            <div className="space-y-2">
              {[
                { label: "New Booking", href: "/booking", gradient: true },
                { label: "Manage Bookings", href: "/admin/bookings", gradient: false },
                { label: "Manage Services", href: "/admin/services", gradient: false },
                { label: "View Customers", href: "/admin/customers", gradient: false },
                { label: "Blog Editor", href: "/admin/blog", gradient: false },
              ].map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
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
            <h3 style={SERIF} className="text-gray-900 font-semibold mb-4">Today&apos;s Summary</h3>
            <div className="space-y-3">
              {[
                { label: "Appointments", value: summary.appointments },
                { label: "Expected Revenue", value: summary.revenue },
                { label: "Available Slots", value: summary.availableSlots },
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
