 "use client";

  import React, { useState, useEffect } from "react";
  import Link from "next/link";
  import { useSession } from "next-auth/react";
  import { motion } from "framer-motion";
  import { Plus, LayoutDashboard, ArrowUpRight, Send, Wallet, TrendingUp, CreditCard, ShieldCheck } from "lucide-react";

  const BannerUser: React.FC = () => {
    const { data: session } = useSession();
    const user = session?.user;
    const [scrollY, setScrollY] = useState(0);
    const [greeting, setGreeting] = useState("");

    const firstName =
      (user as { displayName?: string })?.displayName?.split(" ")[0] ||
      user?.name?.split(" ")[0] ||
      "User";

    useEffect(() => {
      const hour = new Date().getHours();
      if (hour < 12) setGreeting("Good morning");
      else if (hour < 17) setGreeting("Good afternoon");
      else setGreeting("Good evening");
    }, []);

    useEffect(() => {
      const handleScroll = () =>
        requestAnimationFrame(() => setScrollY(window.scrollY));
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const hedwigGradient = "linear-gradient(to right, #4DA1FF, #1E50FF)";

    const stats = [
      { label: "Balance", value: "$2,450.00", icon: <Wallet size={15} />, color: "text-[#4DA1FF]" },
      { label: "This Month", value: "+$340", icon: <TrendingUp size={15} />, color: "text-green-400" },
      { label: "Transactions", value: "24", icon: <CreditCard size={15} />, color: "text-purple-400" },
      { label: "Security", value: "Active", icon: <ShieldCheck size={15} />, color: "text-emerald-400" },
    ];

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
          `
        }} />

        <div
          className="absolute inset-0 bg-user-grid z-[-2]"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] dark:bg-[#1E50FF] opacity-[0.18] blur-[140px] rounded-full pointer-events-none z-[-1]"
  />

        <div className="absolute inset-0 pointer-events-none z-0 hidden md:block">
          <Plus className="absolute top-[18%] left-[8%] text-[#4DA1FF]/20 icon-float" size={22} style={{ animationDelay: "0s", animationDuration: "8s" }} />
          <Plus className="absolute top-[30%] right-[10%] text-[#4DA1FF]/20 icon-float" size={30} style={{ animationDelay: "2s", animationDuration: "9s" }} />
          <Plus className="absolute bottom-[35%] left-[18%] text-[#4DA1FF]/15 icon-float" size={18} style={{ animationDelay: "4s", animationDuration: "7s" }} />
          <Plus className="absolute top-[22%] right-[25%] text-[#4DA1FF]/15 icon-float" size={14} style={{ animationDelay: "1s", animationDuration: "10s" }} />
        </div>

        <div className="w-11/12 mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 z-10">

          {/* LEFT */}
          <motion.div
            className="flex-1 flex flex-col items-start gap-6 max-w-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Badge */}
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#4DA1FF]/20 bg-[#4DA1FF]/10 backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[#1E50FF] dark:text-[#4DA1FF] text-xs font-bold tracking-widest uppercase">
                NovaPay · Logged In
              </span>
            </div>

            {/* Heading */}
            <div>
              <p className="text-[#64748B] dark:text-[#94A3B8] text-base mb-1">
                {greeting},
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-tight leading-[1.1] text-[#0F172A] dark:text-white">
                Welcome back,{" "}
                <span
                  className="text-transparent bg-clip-text"
                  style={{ backgroundImage: hedwigGradient }}
                >
                  {firstName}!
                </span>
              </h1>
              <p className="mt-4 text-[#64748B] dark:text-[#94A3B8] text-sm md:text-base max-w-md leading-relaxed">
                Your wallet is secure and ready. Manage transfers, check your balance, and track your spending — all in one place.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="group relative flex items-center gap-2 px-7 py-3.5 rounded-full overflow-hidden border border-[#4DA1FF]/20 shadow-[0_4px_20px_-4px_rgba(77,161,255,0.35)]
  hover:shadow-[0_8px_30px_-4px_rgba(77,161,255,0.5)] transition-shadow duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#4DA1FF] to-[#1E50FF] transition-transform duration-500 group-hover:scale-[1.05]" />
                  <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/25 to-transparent rounded-t-full pointer-events-none" />
                  <LayoutDashboard size={16} className="relative text-white" />
                  <span className="relative text-white text-sm font-semibold tracking-wide">Go to Dashboard</span>
                  <ArrowUpRight size={15} strokeWidth={2.5} className="relative text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </motion.button>
              </Link>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-7 py-3.5 rounded-full border border-[#4DA1FF]/25 bg-white/70 dark:bg-white/[0.04] backdrop-blur-md text-[#1E50FF] dark:text-[#4DA1FF]
  hover:bg-[#4DA1FF]/10 transition-colors duration-300 shadow-sm"
              >
                <Send size={15} />
                <span className="text-sm font-semibold">Quick Send</span>
              </motion.button>
            </div>

            {/* Stat chips */}
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
                    <p className="text-xs font-bold text-[#0F172A] dark:text-white mt-0.5">{stat.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

          </motion.div>

          {/* RIGHT — to be filled */}
          <div className="flex-shrink-0 w-[340px]" />

        </div>
      </section>
    );
  };

  export default BannerUser;
