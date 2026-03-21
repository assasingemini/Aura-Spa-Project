"use client";

import { useState } from "react";
import { Search, Users, DollarSign, Award, TrendingUp, Eye, Mail, Phone } from "lucide-react";

const SERIF = { fontFamily: "'Playfair Display', serif" };

const tierColor: Record<string, string> = {
  Platinum: "bg-purple-50 text-purple-600 border-purple-200",
  Gold: "bg-amber-50 text-amber-600 border-amber-200",
  Silver: "bg-gray-100 text-gray-600 border-gray-200",
};

export interface CustomerUI {
  id: string;
  name: string;
  email: string;
  phone: string;
  joined: string;
  totalVisits: number;
  totalSpent: number;
  tier: string;
  lastVisit: string;
}

export function AdminCustomersClient({ initialCustomers }: { initialCustomers: CustomerUI[] }) {
  const [search, setSearch] = useState("");
  const [tierFilter, setTierFilter] = useState("All");
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerUI | null>(null);

  const filtered = initialCustomers.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase());
    const matchTier = tierFilter === "All" || c.tier === tierFilter;
    return matchSearch && matchTier;
  });

  const totalRevenue = initialCustomers.reduce((sum, c) => sum + c.totalSpent, 0);
  const avgVisits = initialCustomers.length > 0 ? Math.round(initialCustomers.reduce((sum, c) => sum + c.totalVisits, 0) / initialCustomers.length) : 0;

  return (
    <div>
      <div className="mb-8">
        <h1 style={SERIF} className="text-gray-900 text-2xl font-semibold">Customer Management</h1>
        <p className="text-gray-400 text-sm mt-1">{initialCustomers.length} registered clients</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Clients", value: initialCustomers.length.toString(), icon: Users, color: "from-[#EC4899] to-[#F472B6]", bg: "from-pink-50 to-rose-50", border: "border-pink-200/60" },
          { label: "Total Revenue", value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, color: "from-[#A855F7] to-[#C084FC]", bg: "from-purple-50 to-fuchsia-50", border: "border-purple-200/60" },
          { label: "Avg. Visits", value: avgVisits.toString(), icon: TrendingUp, color: "from-[#F472B6] to-[#EC4899]", bg: "from-rose-50 to-pink-50", border: "border-rose-200/60" },
          { label: "Platinum Members", value: initialCustomers.filter((c) => c.tier === "Platinum").length.toString(), icon: Award, color: "from-purple-500 to-purple-700", bg: "from-purple-50 to-fuchsia-50", border: "border-purple-200/60" },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className={`p-5 rounded-2xl bg-gradient-to-br ${stat.bg} border ${stat.border}`}>
              <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 shadow-sm`}>
                <Icon className="w-4 h-4 text-white" />
              </div>
              <p style={SERIF} className="text-gray-900 text-xl font-semibold">{stat.value}</p>
              <p className="text-gray-500 text-xs mt-1">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-pink-300" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search customers..."
            className="w-full bg-pink-50/40 border border-pink-200/60 rounded-xl pl-11 pr-4 py-2.5 text-gray-700 text-sm placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:bg-white transition-colors"
          />
        </div>
        <div className="flex gap-2">
          {["All", "Platinum", "Gold", "Silver"].map((tier) => (
            <button
              key={tier}
              onClick={() => setTierFilter(tier)}
              className={`px-4 py-2 rounded-xl text-sm transition-all ${
                tierFilter === tier
                  ? "bg-gradient-to-r from-[#EC4899] to-[#A855F7] text-white shadow-sm shadow-pink-300/30"
                  : "bg-pink-50 border border-pink-200/60 text-gray-600 hover:text-pink-600 hover:border-pink-300"
              }`}
            >
              {tier}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-white border border-pink-100/80 overflow-hidden shadow-sm shadow-pink-50/60">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-pink-50/80 bg-pink-50/40">
                {["Client", "Contact", "Member Since", "Total Visits", "Total Spent", "Tier", "Last Visit", "Actions"].map((h) => (
                  <th key={h} className="px-5 py-4 text-left text-gray-400 text-xs uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((customer, i) => (
                <tr key={customer.id} className={`border-b border-pink-50/50 hover:bg-pink-50/30 transition-colors ${i === filtered.length - 1 ? "border-transparent" : ""}`}>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#EC4899] to-[#A855F7] flex items-center justify-center text-white text-xs font-semibold shrink-0">
                        {customer.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-gray-800 text-sm">{customer.name}</p>
                        <p className="text-gray-400 text-xs">{customer.id.slice(0, 8)}...</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-gray-600 text-xs">{customer.email}</p>
                    <p className="text-gray-400 text-xs">{customer.phone}</p>
                  </td>
                  <td className="px-5 py-4 text-gray-500 text-sm">{customer.joined}</td>
                  <td className="px-5 py-4 text-gray-900 text-sm font-medium">{customer.totalVisits}</td>
                  <td className="px-5 py-4 text-gray-900 text-sm font-medium">${customer.totalSpent.toLocaleString()}</td>
                  <td className="px-5 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs border ${tierColor[customer.tier]}`}>
                      {customer.tier}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-gray-500 text-sm">{customer.lastVisit}</td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => setSelectedCustomer(customer)}
                      className="p-2 rounded-lg bg-pink-50 border border-pink-200/60 text-pink-400 hover:text-pink-600 hover:bg-pink-100 hover:border-pink-300 transition-all"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-5 py-12 text-center text-gray-400">No customers found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Detail Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-md">
          <div className="w-full max-w-md rounded-2xl bg-white border border-pink-100 p-8 shadow-2xl shadow-pink-200/30">
            <div className="flex items-center justify-between mb-6">
              <h2 style={SERIF} className="text-gray-900 text-xl font-semibold">Client Profile</h2>
              <button 
                onClick={() => setSelectedCustomer(null)} 
                className="p-2 rounded-lg hover:bg-pink-50 text-gray-400 hover:text-pink-600 transition-all"
              >✕</button>
            </div>

            <div className="text-center mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#EC4899] to-[#A855F7] flex items-center justify-center text-white text-2xl font-semibold mx-auto mb-3 shadow-md shadow-pink-300/30">
                {selectedCustomer.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
              </div>
              <h3 style={SERIF} className="text-gray-900 text-xl font-semibold">{selectedCustomer.name}</h3>
              <span className={`inline-flex mt-2 px-3 py-1 rounded-full text-xs border ${tierColor[selectedCustomer.tier]}`}>
                {selectedCustomer.tier} Member
              </span>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-pink-50/50 border border-pink-100">
                <Mail className="w-4 h-4 text-[#EC4899]" />
                <span className="text-gray-600 text-sm">{selectedCustomer.email}</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-pink-50/50 border border-pink-100">
                <Phone className="w-4 h-4 text-[#EC4899]" />
                <span className="text-gray-600 text-sm">{selectedCustomer.phone}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { label: "Visits", value: selectedCustomer.totalVisits },
                { label: "Spent", value: `$${selectedCustomer.totalSpent.toLocaleString()}` },
                { label: "Since", value: selectedCustomer.joined },
              ].map((stat) => (
                <div key={stat.label} className="p-4 rounded-xl bg-pink-50/60 border border-pink-100 text-center flex flex-col items-center justify-center">
                  <p style={SERIF} className="text-gray-900 font-semibold text-lg leading-tight">{stat.value}</p>
                  <p className="text-gray-400 text-[10px] uppercase tracking-wider mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setSelectedCustomer(null)}
              className="w-full py-3 rounded-xl border border-pink-200 text-gray-500 hover:text-pink-600 hover:border-pink-300 hover:bg-pink-50 text-sm transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
