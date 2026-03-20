import { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router";
import {
  LayoutDashboard, Scissors, BookOpen, CalendarDays, Users,
  Image, Settings, Sparkles, Menu, X, Bell, Search,
  ChevronRight, LogOut, TrendingUp, Mail
} from "lucide-react";

const SIDEBAR_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Bookings", href: "/admin/bookings", icon: CalendarDays },
  { label: "Services", href: "/admin/services", icon: Scissors },
  { label: "Blog Posts", href: "/admin/blog", icon: BookOpen },
  { label: "Customers", href: "/admin/customers", icon: Users },
  { label: "Contacts", href: "/admin/contacts", icon: Mail },
  { label: "Media Library", href: "/admin/media", icon: Image },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebar, setMobileSidebar] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (href: string) => {
    if (href === "/admin") return location.pathname === "/admin";
    return location.pathname.startsWith(href);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-pink-100">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#EC4899] to-[#A855F7] flex items-center justify-center shadow-lg shadow-pink-200/50">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          {sidebarOpen && (
            <div>
              <span style={{ fontFamily: "'Playfair Display', serif" }} className="text-gray-900 text-lg font-semibold block leading-none">AURA</span>
              <span className="text-pink-400 text-xs">Admin Panel</span>
            </div>
          )}
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <p className={`text-pink-300 text-xs uppercase tracking-wider mb-3 px-3 ${!sidebarOpen && "hidden"}`}>Menu</p>
        {SIDEBAR_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setMobileSidebar(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative ${
                active
                  ? "bg-gradient-to-r from-pink-50 to-fuchsia-50 text-pink-700 border border-pink-200/70 shadow-sm shadow-pink-100"
                  : "text-gray-500 hover:text-pink-600 hover:bg-pink-50/60"
              }`}
            >
              {active && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-[#EC4899] to-[#A855F7] rounded-r-full" />}
              <Icon className={`w-5 h-5 shrink-0 ${active ? "text-[#EC4899]" : ""}`} />
              {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
              {sidebarOpen && active && <ChevronRight className="w-4 h-4 ml-auto text-pink-400/60" />}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-4 border-t border-pink-100 space-y-2">
        <Link
          to="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-500 hover:text-pink-600 hover:bg-pink-50/60 transition-all group"
        >
          <TrendingUp className="w-5 h-5 shrink-0" />
          {sidebarOpen && <span className="text-sm">View Website</span>}
        </Link>
        <Link
          to="/login"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {sidebarOpen && <span className="text-sm">Sign Out</span>}
        </Link>
      </div>
    </div>
  );

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }} className="min-h-screen bg-gradient-to-br from-rose-50/60 via-pink-50/30 to-fuchsia-50/20 text-gray-900 flex">
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-col fixed top-0 left-0 h-full bg-white border-r border-pink-100 z-40 transition-all duration-300 shadow-sm shadow-pink-100/50 ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebar && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setMobileSidebar(false)} />
          <aside className="absolute left-0 top-0 h-full w-72 bg-white border-r border-pink-100 flex flex-col shadow-xl shadow-pink-200/30">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${sidebarOpen ? "lg:ml-64" : "lg:ml-20"}`}>
        {/* Top Navigation */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-xl border-b border-pink-100 px-6 py-4 flex items-center gap-4 shadow-sm shadow-pink-50/80">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden lg:flex p-2 rounded-lg text-gray-400 hover:text-pink-600 hover:bg-pink-50 transition-all"
          >
            <Menu className="w-5 h-5" />
          </button>
          <button
            onClick={() => setMobileSidebar(true)}
            className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-pink-600 hover:bg-pink-50 transition-all"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Search */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-pink-300" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-pink-50/60 border border-pink-100 rounded-xl pl-9 pr-4 py-2 text-sm text-gray-700 placeholder-pink-300 focus:outline-none focus:border-pink-300/60 focus:bg-white transition-colors"
              />
            </div>
          </div>

          <div className="ml-auto flex items-center gap-3">
            {/* Notifications */}
            <button className="relative p-2 rounded-xl bg-pink-50 border border-pink-100 text-pink-400 hover:text-pink-600 hover:bg-pink-100 transition-all">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#EC4899] rounded-full" />
            </button>

            {/* User avatar */}
            <div className="flex items-center gap-3 pl-3 border-l border-pink-100">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#EC4899] to-[#A855F7] flex items-center justify-center text-sm font-semibold text-white shadow-sm shadow-pink-200/60">
                A
              </div>
              <div className="hidden sm:block">
                <p className="text-gray-900 text-sm font-medium leading-none">Admin</p>
                <p className="text-pink-400 text-xs mt-0.5">Super Admin</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
