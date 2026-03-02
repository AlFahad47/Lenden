"use client";

import React, { useState, useEffect } from "react";
import { Lock, Eye, EyeOff, ArrowLeft, Shield } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

const ResetPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  const calculateStrength = (pass: string) => {
    let score = 0;
    if (!pass) return 0;
    if (pass.length > 5) score += 1;
    if (pass.length > 7) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    return Math.min(4, score);
  };

  const strength = calculateStrength(newPassword);
  const strengthColors = ["#E2E8F0", "#EF4444", "#F59E0B", "#10B981", "#22C55E"];
  const strengthLabels = ["", "দুর্বল", "মাঝারি", "ভালো", "শক্তিশালী"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("পাসওয়ার্ড মিলছে না!");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে!");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, resetToken, newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message);
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("সার্ভারে সমস্যা হয়েছে!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#050B14] via-[#0F172A] to-[#1E293B]">
      {/* Animated background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#2C64FF]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#4DA1FF]/20 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-[0_20px_80px_rgba(44,100,255,0.3)] p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#4DA1FF] to-[#2C64FF] rounded-full mb-4 shadow-lg">
              <Lock className="text-white" size={32} />
            </div>
            <h1 className="text-3xl font-black text-[#050B14] mb-2">নতুন পাসওয়ার্ড সেট করুন</h1>
            <p className="text-slate-600">আপনার নতুন পাসওয়ার্ড দিন</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email (readonly) */}
            <div className="relative">
              <label className="block text-sm font-bold text-slate-700 mb-2">
                ইমেইল অ্যাড্রেস
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-[#2C64FF] focus:ring-4 focus:ring-[#2C64FF]/10 outline-none transition-all bg-slate-50"
              />
            </div>

            {/* Reset Token */}
            <div className="relative">
              <label className="block text-sm font-bold text-slate-700 mb-2">
                রিসেট কোড (৬ ডিজিট)
              </label>
              <input
                type="text"
                value={resetToken}
                onChange={(e) => setResetToken(e.target.value)}
                placeholder="123456"
                required
                maxLength={6}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-[#2C64FF] focus:ring-4 focus:ring-[#2C64FF]/10 outline-none transition-all text-center text-2xl font-bold tracking-widest"
              />
            </div>

            {/* New Password */}
            <div className="relative">
              <label className="block text-sm font-bold text-slate-700 mb-2">
                নতুন পাসওয়ার্ড
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="কমপক্ষে ৬ অক্ষর"
                  required
                  className="w-full pl-12 pr-12 py-3 border-2 border-slate-200 rounded-xl focus:border-[#2C64FF] focus:ring-4 focus:ring-[#2C64FF]/10 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#2C64FF] transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              
              {/* Password Strength */}
              {newPassword && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4].map((level) => (
                      <div
                        key={level}
                        className="h-1.5 flex-1 rounded-full transition-all duration-300"
                        style={{
                          backgroundColor: level <= strength ? strengthColors[strength] : "#E2E8F0",
                        }}
                      />
                    ))}
                  </div>
                  <p className="text-xs font-semibold" style={{ color: strengthColors[strength] }}>
                    {strengthLabels[strength]}
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <label className="block text-sm font-bold text-slate-700 mb-2">
                পাসওয়ার্ড কনফার্ম করুন
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="পাসওয়ার্ড আবার লিখুন"
                  required
                  className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:border-[#2C64FF] focus:ring-4 focus:ring-[#2C64FF]/10 outline-none transition-all"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="relative overflow-hidden w-full py-3.5 rounded-xl border-none outline-none text-white font-bold text-lg tracking-wide cursor-pointer transition-all duration-300 hover:-translate-y-1 shadow-[0_8px_20px_-5px_rgba(44,100,255,0.4)] hover:shadow-[0_12px_25px_-5px_rgba(44,100,255,0.6)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#4DA1FF] to-[#1E50FF] transition-transform duration-500 ease-out hover:scale-105"></div>
              <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/30 to-transparent opacity-30 rounded-t-xl pointer-events-none"></div>
              <span className="relative z-10 drop-shadow-sm">
                {loading ? "সেভ করা হচ্ছে..." : "পাসওয়ার্ড রিসেট করুন"}
              </span>
            </button>
          </form>

          {/* Back to Login */}
          <div className="mt-6 text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-[#2C64FF] font-bold hover:underline transition-all"
            >
              <ArrowLeft size={18} />
              লগইন পেজে ফিরে যান
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
