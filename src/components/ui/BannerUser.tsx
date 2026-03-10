"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, LayoutDashboard, ArrowUpRight, Send, Wallet, 
  TrendingUp, CreditCard, ShieldCheck, Wifi, Bell, Lock, X 
} from "lucide-react";

const BannerUser: React.FC = () => {
  const { data: session } = useSession();
  const [dbUser, setDbUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [greeting, setGreeting] = useState("");
  
  // NEW: State to manage which modal is open
  const [activeModal, setActiveModal] = useState<"send" | "add" | null>(null);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 17) setGreeting("Good afternoon");
    else setGreeting("Good evening");

    const handleScroll = () => requestAnimationFrame(() => setScrollY(window.scrollY));
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  // Lock scrolling when modal is open
  useEffect(() => {
    if (activeModal) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [activeModal]);

  const firstName = dbUser?.name?.split(" ")[0] || session?.user?.name?.split(" ")[0] || "User";
  const currencySymbol = dbUser?.currency === "BDT" ? "৳" : "$";
  // const isApproved = dbUser?.kycStatus === "approved";
  const isApproved = true;


  const stats = [
    { label: "Balance", value: isApproved ? `${currencySymbol}${dbUser?.balance || "0.00"}` : "Locked", icon: <Wallet size={15} />, color: "text-[#4DA1FF]" },
    { label: "This Month", value: isApproved ? `${currencySymbol}${dbUser?.monthlyTotal || "0"}` : "N/A", icon: <TrendingUp size={15} />, color: "text-green-400" },
    { label: "Transactions", value: isApproved ? (dbUser?.transactionCount || "0") : "0", icon: <CreditCard size={15} />, color: "text-purple-400" },
    { label: "Security", value: isApproved ? "Active" : "Pending", icon: <ShieldCheck size={15} />, color: isApproved ? "text-emerald-400" : "text-orange-400" },
  ];

  // UPDATED: Added onClick actions to the buttons
  const cardActions = [
    { label: "Send", icon: <Send size={15} />, onClick: () => setActiveModal("send") },
    { label: "Add", icon: <Plus size={15} />, onClick: () => setActiveModal("add") },
    { label: "History", icon: <TrendingUp size={15} />, onClick: () => console.log("Navigate to history") },
  ];

  const hedwigGradient = "linear-gradient(to right, #4DA1FF, #1E50FF)";

  return (
    <section className="relative w-full min-h-[88vh] bg-[#f0f7ff] dark:bg-[#050B14] flex flex-col items-center justify-center pt-24 pb-16 overflow-hidden font-sans">
      
      <style dangerouslySetInnerHTML={{
        __html: `
          .bg-user-grid { background-image: linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px); background-size: 50px 50px; }
          .dark .bg-user-grid { background-image: linear-gradient(to right, rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.025) 1px, transparent 1px); }
          @keyframes floatCard { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
          .float-card { animation: floatCard 5s ease-in-out infinite; }
          @keyframes shimmerSlide { 100% { transform: translateX(200%); } }
          .shimmer-card { position: relative; overflow: hidden; }
          .shimmer-card::after { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent); animation: shimmerSlide 3s infinite; }
        `
      }} />

      <div className="absolute inset-0 bg-user-grid z-[-2]" style={{ transform: `translateY(${scrollY * 0.2}px)` }} />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] dark:bg-[#1E50FF] opacity-[0.18] blur-[140px] rounded-full pointer-events-none z-[-1]" />

      <div className="w-11/12 mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 z-10">
        
        {/* LEFT CONTENT */}
        <motion.div className="flex-1 flex flex-col items-start gap-6 max-w-xl" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
          
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#4DA1FF]/20 bg-[#4DA1FF]/10 backdrop-blur-sm">
            <div className={`w-2 h-2 rounded-full animate-pulse ${isApproved ? 'bg-green-400' : 'bg-orange-400'}`} />
            <span className="text-[#1E50FF] dark:text-[#4DA1FF] text-xs font-bold tracking-widest uppercase">
              NovaPay · {isApproved ? "Verified Account" : "KYC Pending"}
            </span>
          </div>

          <div>
            <p className="text-[#64748B] dark:text-[#94A3B8] text-base mb-1">{greeting},</p>
            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-tight leading-[1.1] text-[#0F172A] dark:text-white">
              Welcome back, <span className="text-transparent bg-clip-text" style={{ backgroundImage: hedwigGradient }}>{firstName}!</span>
            </h1>
            <p className="mt-4 text-[#64748B] dark:text-[#94A3B8] text-sm md:text-base max-w-md leading-relaxed">
              Your digital assets are {isApproved ? "secure and ready" : "under review"}. {isApproved ? "Manage transfers and track spending in real-time." : "Complete your profile to unlock all features."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link href="/dashboard">
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="group relative flex items-center gap-2 px-7 py-3.5 rounded-full overflow-hidden border border-[#4DA1FF]/20 shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-[#4DA1FF] to-[#1E50FF]" />
                <LayoutDashboard size={16} className="relative text-white" />
                <span className="relative text-white text-sm font-semibold tracking-wide">Dashboard</span>
                <ArrowUpRight size={15} className="relative text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.button>
            </Link>

            {/* UPDATED: Quick Send Button */}
            <motion.button 
              onClick={() => setActiveModal("send")}
              whileHover={{ scale: 1.04 }} 
              className="flex items-center gap-2 px-7 py-3.5 rounded-full border border-[#4DA1FF]/25 bg-white/70 dark:bg-white/[0.04] backdrop-blur-md text-[#1E50FF] dark:text-[#4DA1FF]"
            >
              <Send size={15} />
              <span className="text-sm font-semibold">Quick Send</span>
            </motion.button>
          </div>

          <div className="flex flex-wrap gap-3">
            {stats.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.08 }} className="flex items-center gap-2 px-3 py-2 rounded-xl border border-[#4DA1FF]/15 bg-white/60 dark:bg-white/[0.04] backdrop-blur-sm">
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
        <motion.div className="flex-shrink-0 flex flex-col items-center gap-5" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }}>
          
          <div className="relative flex items-center gap-2 self-end px-3 py-1.5 rounded-full bg-white/70 dark:bg-[#0F172A]/70 border border-[#4DA1FF]/20 backdrop-blur-md">
            <Bell size={13} className="text-[#4DA1FF]" />
            <span className="text-xs text-[#0F172A] dark:text-white font-medium">New Alerts</span>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-[9px] text-white font-bold">!</span>
          </div>

          <div className="float-card">
            <div className={`shimmer-card w-[300px] md:w-[340px] h-[200px] md:h-[220px] rounded-2xl border border-white/20 p-6 flex flex-col justify-between shadow-2xl transition-all duration-500 ${!isApproved ? 'grayscale brightness-75' : ''}`} style={{ background: isApproved ? "linear-gradient(130deg, #4DA1FF, #1E50FF)" : "#1e293b" }}>
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

          <div className="flex items-center gap-3 w-full px-2">
            {/* UPDATED: Dynamic Button mapping with onClick */}
            {cardActions.map((action) => (
              <motion.button 
                key={action.label} 
                onClick={action.onClick}
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

      {/* --- MODALS OVERLAY --- */}
      <AnimatePresence>
        {activeModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F172A]/80 backdrop-blur-sm p-4"
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-[#1E293B] rounded-3xl p-6 shadow-2xl"
            >
              {/* Close Button */}
              <button 
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-800 dark:hover:text-white rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
              >
                <X size={18} />
              </button>

              {/* Modal Content Logic */}
              {!isApproved ? (
                <div className="text-center py-6">
                  <div className="w-16 h-16 mx-auto bg-orange-100 dark:bg-orange-500/20 text-orange-500 rounded-full flex items-center justify-center mb-4">
                    <ShieldCheck size={30} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">KYC Verification Required</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                    You must complete your identity verification before you can send or add money to your wallet.
                  </p>
                  <button onClick={() => setActiveModal(null)} className="w-full py-3 rounded-xl bg-gradient-to-r from-[#4DA1FF] to-[#1E50FF] text-white font-semibold">
                    Verify Identity Now
                  </button>
                </div>
              ) : activeModal === "send" ? (
                // SEND MONEY UI
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <Send size={20} className="text-[#4DA1FF]" /> Send Money
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Recipient Email or Phone</label>
                      <input type="text" placeholder="john@example.com" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-[#1E293B] bg-gray-50 dark:bg-[#050B14] text-gray-900 dark:text-white focus:outline-none focus:border-[#4DA1FF]" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Amount ({currencySymbol})</label>
                      <input type="number" placeholder="0.00" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-[#1E293B] bg-gray-50 dark:bg-[#050B14] text-gray-900 dark:text-white focus:outline-none focus:border-[#4DA1FF]" />
                    </div>
                    <button className="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-[#4DA1FF] to-[#1E50FF] text-white font-semibold hover:shadow-lg hover:shadow-[#4DA1FF]/30 transition-all">
                      Confirm Transfer
                    </button>
                  </div>
                </div>
              ) : (
                // ADD MONEY UI
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <Plus size={20} className="text-[#4DA1FF]" /> Add Money
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Amount to Add ({currencySymbol})</label>
                      <input type="number" placeholder="100.00" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-[#1E293B] bg-gray-50 dark:bg-[#050B14] text-gray-900 dark:text-white focus:outline-none focus:border-[#4DA1FF]" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Payment Method</label>
                      <select className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-[#1E293B] bg-gray-50 dark:bg-[#050B14] text-gray-900 dark:text-white focus:outline-none focus:border-[#4DA1FF]">
                        <option>Bank Transfer (**** 4291)</option>
                        <option>Credit/Debit Card</option>
                      </select>
                    </div>
                    <button className="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-[#4DA1FF] to-[#1E50FF] text-white font-semibold hover:shadow-lg hover:shadow-[#4DA1FF]/30 transition-all">
                      Fund Wallet
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default BannerUser;