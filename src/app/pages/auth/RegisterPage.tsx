import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Eye, EyeOff, Sparkles, ArrowRight, Mail, Lock, User } from "lucide-react";
import { toast } from "sonner";
import { IMAGES } from "../../data/mockData";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";

const SERIF = { fontFamily: "'Playfair Display', serif" };

export function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "", agree: false });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    toast.success("Account created! Welcome to AURA.");
    navigate("/admin");
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }} className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50/60 to-fuchsia-50/30 flex">
      {/* Left visual */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden rounded-r-3xl">
        <ImageWithFallback src={IMAGES.facial} alt="AURA Spa" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-rose-900/50 via-pink-900/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-between p-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#EC4899] to-[#A855F7] flex items-center justify-center shadow-lg shadow-pink-400/40">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span style={SERIF} className="text-white text-2xl font-semibold">AURA</span>
          </Link>
          <div>
            <div className="flex gap-1 mb-3">
              {[1,2,3,4,5].map((i) => (
                <span key={i} className="text-[#7A5CFF] text-xl">★</span>
              ))}
            </div>
            <p style={SERIF} className="text-white text-2xl font-medium mb-2">
              "AURA transformed my entire approach to self-care."
            </p>
            <p className="text-white/60 text-sm">— Emma R., Platinum Member</p>
          </div>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex-1 flex items-center justify-center p-8 overflow-y-auto">
        <div className="w-full max-w-md py-8">
          <div className="flex items-center gap-2 mb-10 lg:hidden">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#7A5CFF] to-[#4F8CFF] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span style={SERIF} className="text-white text-xl font-semibold">AURA</span>
          </div>

          <div className="mb-8">
            <h1 style={SERIF} className="text-3xl font-semibold text-gray-900 mb-2">Create your account</h1>
            <p className="text-gray-500">Join the AURA community and discover luxury wellness.</p>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {["Continue with Google", "Continue with Apple"].map((label, i) => (
              <button key={i} className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white border border-pink-200 text-gray-600 hover:border-pink-300 hover:bg-pink-50 transition-all text-sm shadow-sm">
                {label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-pink-100" />
            <span className="text-gray-400 text-xs">or register with email</span>
            <div className="flex-1 h-px bg-pink-100" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-gray-500 text-sm mb-1.5 block">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-pink-300" />
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your full name"
                  className="w-full bg-pink-50/40 border border-pink-200/60 rounded-xl pl-11 pr-4 py-3.5 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:bg-white transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-gray-500 text-sm mb-1.5 block">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-pink-300" />
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="your@email.com"
                  className="w-full bg-pink-50/40 border border-pink-200/60 rounded-xl pl-11 pr-4 py-3.5 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:bg-white transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-gray-500 text-sm mb-1.5 block">Password</label>
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
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-600">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-gray-500 text-sm mb-1.5 block">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-pink-300" />
                <input
                  required
                  type={showPass ? "text" : "password"}
                  value={form.confirm}
                  onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                  placeholder="••••••••"
                  className="w-full bg-pink-50/40 border border-pink-200/60 rounded-xl pl-11 pr-4 py-3.5 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:bg-white transition-colors"
                />
              </div>
            </div>

            <div className="flex items-start gap-2 mt-2">
              <input
                type="checkbox"
                id="agree"
                required
                checked={form.agree}
                onChange={(e) => setForm({ ...form, agree: e.target.checked })}
                className="w-4 h-4 rounded mt-0.5 accent-pink-500"
              />
              <label htmlFor="agree" className="text-gray-500 text-sm cursor-pointer">
                I agree to the{" "}
                <a href="#" className="text-pink-500 hover:text-pink-700">Terms of Service</a>
                {" "}and{" "}
                <a href="#" className="text-pink-500 hover:text-pink-700">Privacy Policy</a>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-full bg-gradient-to-r from-[#EC4899] to-[#A855F7] text-white font-medium hover:opacity-90 hover:shadow-xl hover:shadow-pink-300/30 transition-all disabled:opacity-60 group mt-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              ) : (
                <>Create Account <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" /></>
              )}
            </button>
          </form>

          <p className="text-gray-400 text-sm text-center mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-pink-500 hover:text-pink-700 font-medium">Sign in</Link>
          </p>
          <p className="text-gray-300 text-xs text-center mt-4">
            <Link to="/" className="hover:text-pink-400 transition-colors">← Back to AURA website</Link>
          </p>
        </div>
      </div>
    </div>
  );
}