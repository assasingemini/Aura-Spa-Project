import { useState } from "react";
import { Link } from "react-router";
import { Mail, ArrowLeft, Sparkles, Send, CheckCircle } from "lucide-react";

const SERIF = { fontFamily: "'Playfair Display', serif" };

export function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }} className="min-h-screen bg-[#0B0B0F] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-12">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7A5CFF] to-[#4F8CFF] flex items-center justify-center shadow-lg shadow-[#7A5CFF]/20">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span style={SERIF} className="text-white text-2xl font-semibold">AURA</span>
        </div>

        <div className="bg-white/[0.02] border border-white/8 rounded-2xl p-10">
          {!sent ? (
            <>
              <div className="text-center mb-8">
                <div className="w-14 h-14 rounded-full bg-[#7A5CFF]/10 border border-[#7A5CFF]/20 flex items-center justify-center mx-auto mb-5">
                  <Mail className="w-6 h-6 text-[#7A5CFF]" />
                </div>
                <h1 style={SERIF} className="text-2xl font-semibold text-white mb-2">Reset Your Password</h1>
                <p className="text-white/50 text-sm leading-relaxed">
                  Enter your email address and we'll send you a link to reset your password.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="text-white/50 text-sm mb-1.5 block">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#7A5CFF]/50 transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-full bg-gradient-to-r from-[#7A5CFF] to-[#4F8CFF] text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-60"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <><Send className="w-4 h-4" /> Send Reset Link</>
                  )}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-5">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <h2 style={SERIF} className="text-2xl font-semibold text-white mb-2">Check Your Email</h2>
              <p className="text-white/50 text-sm leading-relaxed mb-6">
                We've sent a password reset link to <span className="text-white">{email}</span>. Please check your inbox and follow the instructions.
              </p>
              <p className="text-white/30 text-xs">
                Didn't receive the email?{" "}
                <button onClick={() => setSent(false)} className="text-[#7A5CFF] hover:text-[#A78BFA] transition-colors">
                  Try again
                </button>
              </p>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-white/8 text-center">
            <Link to="/login" className="flex items-center justify-center gap-2 text-white/40 hover:text-white text-sm transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
