"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { 
  Plus, LayoutDashboard, ArrowUpRight, Send, Wallet, 
  TrendingUp, CreditCard, ShieldCheck, Wifi, Bell, Lock 
} from "lucide-react";

const BannerUser: React.FC = () => {
  const { data: session } = useSession();
  const [dbUser, setDbUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [greeting, setGreeting] = useState("");

  // ১. গ্রিটিং সেট করা
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 17) setGreeting("Good afternoon");
    else setGreeting("Good evening");

    const handleScroll = () => requestAnimationFrame(() => setScrollY(window.scrollY));
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ২. এপিআই থেকে ডাটা আনা
  useEffect(() => {
    const fetchUserData = async () => {
      if (session?.user?.email) {
        try {
          const res = await fetch(`/api/user/update?email=${session.user.email}`);
          const data = await res.json();
          setDbUser(data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchUserData();
  }, [session]);

  // ৩. ডাইনামিক ভ্যালু সেট করা
  const firstName = dbUser?.name?.split(" ")[0] || session?.user?.name?.split(" ")[0] || "User";
  const currencySymbol = dbUser?.currency === "BDT" ? "৳" : "$";
  const isApproved = dbUser?.kycStatus === "approved";

  const stats = [
    { 
      label: "Balance", 
      value: isApproved ? `${currencySymbol}${dbUser?.balance || "0.00"}` : "Locked", 
      icon: <Wallet size={15} />, 
      color: "text-[#4DA1FF]" 
    },
    { 
      label: "This Month", 
      value: isApproved ? `${currencySymbol}${dbUser?.monthlyTotal || "0"}` : "N/A", 
      icon: <TrendingUp size={15} />, 
      color: "text-green-400" 
    },
    { 
      label: "Transactions", 
      value: isApproved ? (dbUser?.transactionCount || "0") : "0", 
      icon: <CreditCard size={15} />, 
      color: "text-purple-400" 
    },
    { 
      label: "Security", 
      value: isApproved ? "Active" : "Pending", 
      icon: <ShieldCheck size={15} />, 
      color: isApproved ? "text-emerald-400" : "text-orange-400" 
    },
  ];

  const cardActions = [
    { label: "Send", icon: <Send size={15} /> },
    { label: "Add", icon: <Plus size={15} /> },
    { label: "History", icon: <TrendingUp size={15} /> },
  ];

  const hedwigGradient = "linear-gradient(to right, #4DA1FF, #1E50FF)";

  return (
    <section className="relative w-full min-h-[88vh] bg-[#f0f7ff] dark:bg-[#050B14] flex flex-col items-center justify-center pt-24 pb-16 overflow-hidden font-sans">
      
      <style dangerouslySetInnerHTML={{
        __html: `
          .bg-user-grid {
            background-image:
              linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px);
            background-size: 50px 50px;
          }
          .dark .bg-user-grid {
            background-image:
              linear-gradient(to right, rgba(255,255,255,0.025) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.025) 1px, transparent 1px);
          }
          @keyframes iconFloat {
            0%, 100% { transform: translateY(0px) scale(1); opacity: 0.25; }
            50% { transform: translateY(-20px) scale(1.08); opacity: 0.5; }
          }
          .icon-float { animation: iconFloat 7s ease-in-out infinite; }
          @keyframes floatCard {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          .float-card { animation: floatCard 5s ease-in-out infinite; }
          @keyframes shimmerSlide { 100% { transform: translateX(200%); } }
          .shimmer-card { position: relative; overflow: hidden; }
          .shimmer-card::after {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
            animation: shimmerSlide 3s infinite;
          }
        `
      }} />

      <div
        className="absolute inset-0 bg-user-grid z-[-2]"
        style={{ transform: `translateY(${scrollY * 0.2}px)` }}
      />
      
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] dark:bg-[#1E50FF] opacity-[0.18] blur-[140px] rounded-full pointer-events-none z-[-1]" />

      <div className="w-11/12 mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 z-10">

        {/* LEFT CONTENT */}
        <motion.div
          className="flex-1 flex flex-col items-start gap-6 max-w-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Status Badge */}
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#4DA1FF]/20 bg-[#4DA1FF]/10 backdrop-blur-sm">
            <div className={`w-2 h-2 rounded-full animate-pulse ${isApproved ? 'bg-green-400' : 'bg-orange-400'}`} />
            <span className="text-[#1E50FF] dark:text-[#4DA1FF] text-xs font-bold tracking-widest uppercase">
              NovaPay · {isApproved ? "Verified Account" : "KYC Pending"}
            </span>
          </div>

          <div>
            <p className="text-[#64748B] dark:text-[#94A3B8] text-base mb-1">{greeting},</p>
            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-tight leading-[1.1] text-[#0F172A] dark:text-white">
              Welcome back,{" "}
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: hedwigGradient }}>
                {firstName}!
              </span>
            </h1>
            <p className="mt-4 text-[#64748B] dark:text-[#94A3B8] text-sm md:text-base max-w-md leading-relaxed">
              Your digital assets are {isApproved ? "secure and ready" : "under review"}. {isApproved ? "Manage transfers and track spending in real-time." : "Complete your profile to unlock all features."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link href="/dashboard">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="group relative flex items-center gap-2 px-7 py-3.5 rounded-full overflow-hidden border border-[#4DA1FF]/20 shadow-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#4DA1FF] to-[#1E50FF]" />
                <LayoutDashboard size={16} className="relative text-white" />
                <span className="relative text-white text-sm font-semibold tracking-wide">Dashboard</span>
                <ArrowUpRight size={15} className="relative text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.button>
            </Link>

            <motion.button
              whileHover={{ scale: 1.04 }}
              className="flex items-center gap-2 px-7 py-3.5 rounded-full border border-[#4DA1FF]/25 bg-white/70 dark:bg-white/[0.04] backdrop-blur-md text-[#1E50FF] dark:text-[#4DA1FF]"
            >
              <Send size={15} />
              <span className="text-sm font-semibold">Quick Send</span>
            </motion.button>
          </div>

          {/* Stats Chips */}
          <div className="flex flex-wrap gap-3">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                className="flex items-center gap-2 px-3 py-2 rounded-xl border border-[#4DA1FF]/15 bg-white/60 dark:bg-white/[0.04] backdrop-blur-sm"
              >
                <span className={stat.color}>{stat.icon}</span>
                <div>
                  <p className="text-[10px] text-[#94A3B8] leading-none">{stat.label}</p>
                  <p className="text-xs font-bold text-[#0F172A] dark:text-white mt-0.5">{loading ? "..." : stat.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT CARD SECTION */}
        <motion.div
          className="flex-shrink-0 flex flex-col items-center gap-5"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <div className="relative flex items-center gap-2 self-end px-3 py-1.5 rounded-full bg-white/70 dark:bg-[#0F172A]/70 border border-[#4DA1FF]/20 backdrop-blur-md">
            <Bell size={13} className="text-[#4DA1FF]" />
            <span className="text-xs text-[#0F172A] dark:text-white font-medium">New Alerts</span>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-[9px] text-white font-bold">!</span>
          </div>

          <div className="float-card">
            <div
              className={`shimmer-card w-[300px] md:w-[340px] h-[200px] md:h-[220px] rounded-2xl border border-white/20 p-6 flex flex-col justify-between shadow-2xl transition-all duration-500 ${!isApproved ? 'grayscale brightness-75' : ''}`}
              style={{ background: isApproved ? "linear-gradient(130deg, #4DA1FF, #1E50FF)" : "#1e293b" }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-white/60 text-[10px] uppercase tracking-widest font-medium">NovaPay Wallet</p>
                  <p className="text-white font-bold text-base mt-0.5">{firstName}</p>
                </div>
                {isApproved ? <Wifi size={18} className="text-white/60 rotate-90" /> : <Lock size={16} className="text-white/40" />}
              </div>
              
              <div>
                <p className="text-white/60 text-[10px] uppercase tracking-widest">Available Balance</p>
                <p className="text-white font-bold text-3xl tracking-tight mt-1">
                  {loading ? "..." : isApproved ? `${currencySymbol}${dbUser?.balance || "0.00"}` : `${currencySymbol} ••••`}
                </p>
              </div>

              <div className="flex justify-between items-end">
                <p className="font-mono text-white/75 text-sm tracking-wider">**** **** **** {isApproved ? "4291" : "****"}</p>
                <div className="flex items-center">
                  <div className="w-7 h-7 rounded-full bg-yellow-400/80 -mr-3 border border-white/20" />
                  <div className="w-7 h-7 rounded-full bg-orange-500/70 border border-white/20" />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 w-full px-2">
            {cardActions.map((action) => (
              <motion.button
                key={action.label}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 flex flex-col items-center gap-1.5 py-3 rounded-xl bg-white/70 dark:bg-white/[0.04] border border-[#4DA1FF]/15 backdrop-blur-sm hover:bg-[#4DA1FF]/10 text-[#1E50FF] dark:text-[#4DA1FF]"
              >
                {action.icon}
                <span className="text-[10px] font-semibold text-[#0F172A] dark:text-white">{action.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BannerUser;