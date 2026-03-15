import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Eye, EyeOff, Sparkles, ArrowRight, Mail, Lock } from "lucide-react";
import { toast } from "sonner";
import { IMAGES } from "../../data/mockData";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";

const SERIF = { fontFamily: "'Playfair Display', serif" };

export function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    toast.success("Welcome back to AURA!");
    navigate("/admin");
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }} className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50/60 to-fuchsia-50/30 flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden rounded-r-3xl">
        <ImageWithFallback src={IMAGES.elegantSpa} alt="AURA Spa" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-rose-900/50 via-pink-900/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-16">
          <Link to="/" className="flex items-center gap-2 mb-auto">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#EC4899] to-[#A855F7] flex items-center justify-center shadow-lg shadow-pink-400/40">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span style={SERIF} className="text-white text-2xl font-semibold">AURA</span>
          </Link>
          <div>
            <h2 style={SERIF} className="text-white text-3xl font-semibold mb-3">
              "The finest luxury spa experience in New York."
            </h2>
            <p className="text-pink-100/70">— Luxury Travel & Lifestyle Magazine</p>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-10 lg:hidden">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#EC4899] to-[#A855F7] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span style={SERIF} className="text-gray-900 text-xl font-semibold">AURA</span>
          </div>

          <div className="mb-10">
            <h1 style={SERIF} className="text-3xl font-semibold text-gray-900 mb-2">Welcome back</h1>
            <p className="text-gray-500">Sign in to your AURA account to continue.</p>
          </div>

          {/* Social logins */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {["Continue with Google", "Continue with Apple"].map((label, i) => (
              <button key={i} className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white border border-pink-200 text-gray-600 hover:border-pink-300 hover:bg-pink-50 transition-all text-sm shadow-sm">
                {label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-pink-100" />
            <span className="text-gray-400 text-xs">or continue with email</span>
            <div className="flex-1 h-px bg-pink-100" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-gray-500 text-sm mb-1.5 block">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-pink-300" />
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="admin@auraspa.com"
                  className="w-full bg-pink-50/40 border border-pink-200/60 rounded-xl pl-11 pr-4 py-3.5 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:bg-white transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-gray-500 text-sm">Password</label>
                <Link to="/forgot-password" className="text-pink-500 text-xs hover:text-pink-700 transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-pink-300" />
                <input
                  required
                  type={showPass ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full bg-pink-50/40 border border-pink-200/60 rounded-xl pl-11 pr-12 py-3.5 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:bg-white transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-600 transition-colors"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                checked={form.remember}
                onChange={(e) => setForm({ ...form, remember: e.target.checked })}
                className="w-4 h-4 rounded accent-pink-500"
              />
              <label htmlFor="remember" className="text-gray-500 text-sm cursor-pointer">
                Remember me for 30 days
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-full bg-gradient-to-r from-[#EC4899] to-[#A855F7] text-white font-medium hover:opacity-90 hover:shadow-xl hover:shadow-pink-300/30 transition-all disabled:opacity-60 group"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>
          </form>

          <p className="text-gray-400 text-sm text-center mt-8">
            Don't have an account?{" "}
            <Link to="/register" className="text-pink-500 hover:text-pink-700 transition-colors font-medium">
              Create one
            </Link>
          </p>

          <p className="text-gray-300 text-xs text-center mt-6">
            <Link to="/" className="hover:text-pink-400 transition-colors">
              ← Back to AURA website
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
