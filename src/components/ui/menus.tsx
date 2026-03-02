 "use client";
  import React, { useState } from "react";
  import { ArrowLeft, ArrowRight } from "lucide-react";
  import {
    FaPaperPlane, FaHandHoldingUsd, FaMoneyBillWave, FaWallet,
    FaMobileAlt, FaReceipt, FaHistory, FaPiggyBank, FaCreditCard,
    FaSyncAlt, FaLock, FaUnlockAlt, FaBolt,
  } from "react-icons/fa";
  import { IconType } from "react-icons";
  import { useSession } from "next-auth/react";
  import { useRouter } from "next/navigation";
  import Swal from "sweetalert2";
  import "sweetalert2/dist/sweetalert2.min.css";

  type MenuItem = {
    name: string
    icon: IconType
    route: string
    requiresAuth: boolean
  }

  const quickActions: MenuItem[] = [
    { name: "Send Money",          icon: FaPaperPlane,     route: "/send-money",       requiresAuth: true  },
    { name: "Request Money",       icon: FaHandHoldingUsd, route: "/request-money",    requiresAuth: true  },
    { name: "Cash Out",            icon: FaMoneyBillWave,  route: "/cash-out",         requiresAuth: true  },
    { name: "Add Money",           icon: FaWallet,         route: "/add-money",        requiresAuth: true  },
    { name: "Mobile Recharge",     icon: FaMobileAlt,      route: "/mobile-recharge",  requiresAuth: false },
    { name: "Pay Bill",            icon: FaReceipt,        route: "/pay-bill",         requiresAuth: false },
    { name: "Transaction History", icon: FaHistory,        route: "/dashboard/transactions", requiresAuth: true  },
    { name: "Wallet",              icon: FaPiggyBank,      route: "/wallet",           requiresAuth: true  },
    { name: "Cards & Banks",       icon: FaCreditCard,     route: "/cards-banks",      requiresAuth: true  },
    { name: "Subscriptions",       icon: FaSyncAlt,        route: "/subscriptions",    requiresAuth: false },
  ]

  const Menus: React.FC = () => {
    const { data: session, status } = useSession();
    const isLoggedIn = status === "authenticated";
    const router = useRouter();

    const [activeIndex, setActiveIndex] = useState(0);
    const total = quickActions.length;
    const lockedCount = quickActions.filter(m => m.requiresAuth).length;

    const handleNext = () => setActiveIndex((prev) => (prev + 1) % total);
    const handlePrev = () => setActiveIndex((prev) => (prev - 1 + total) % total);

    const handleItemClick = (index: number, item: MenuItem) => {
      setActiveIndex(index);
      if (index !== activeIndex) return;

      const isLocked = item.requiresAuth && !isLoggedIn;

      if (isLocked) {
        Swal.fire({
          icon: "warning",
          title: `🔒 ${item.name}`,
          html: `<p style="color:#6b7280">This feature requires an account.<br/>Already have one? <b>Login</b>. New here? <b>Register</b>.</p>`,
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Login",
          denyButtonText: "Register",
          cancelButtonText: "Cancel",
          confirmButtonColor: "#1E50FF",
          denyButtonColor: "#4DA1FF",
          cancelButtonColor: "#9ca3af",
        }).then((result) => {
          if (result.isConfirmed) router.push("/login");
          if (result.isDenied) router.push("/register");
        });
        return;
      }

      router.push(item.route);
    };

    const getItemStyles = (index: number) => {
      let diff = (index - activeIndex + total) % total;
      if (diff > Math.floor(total / 2)) diff -= total;
      const isCenter = diff === 0;
      const spacingX = "max(110px, min(18vw, 240px))";
      const translateX = `calc(-50% + calc(${spacingX} * ${diff}))`;
      const scale = isCenter ? 1 : 0.8;
      const opacity = Math.abs(diff) >= 3 ? 0 : 1;
      return {
        transform: `translate(${translateX}, -50%) scale(${scale})`,
        opacity,
        zIndex: isCenter ? 20 : 10,
      };
    };

    return (
      <section className="w-full bg-gray-50 dark:bg-[#0A0E17] pb-10 overflow-hidden select-none border-y border-gray-200 dark:border-gray-800/60 transition-colors duration-300">

        <svg width="0" height="0" className="absolute">
          <defs>
            <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop stopColor="#4DA1FF" offset="0%" />
              <stop stopColor="#1E50FF" offset="100%" />
            </linearGradient>
          </defs>
        </svg>

        <div className="max-w-[1400px] mx-auto px-2 md:px-4 relative flex flex-col items-center">

          {/* ── SECTION HEADER ── */}
          <div className="w-full text-center pt-14 pb-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4DA1FF]/10 border border-[#4DA1FF]/20 text-[#4DA1FF] text-xs font-semibold mb-3">
              <FaBolt size={10} />
              Quick Actions
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 dark:text-white">
              Everything You Need,{" "}
              <span className="bg-gradient-to-r from-[#4DA1FF] to-[#1E50FF] bg-clip-text text-transparent">
                One Tap Away
              </span>
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Browse using arrows — tap the center icon to open
            </p>
          </div>

          {/* ── CAROUSEL ── */}
          <div className="relative w-full h-[280px] md:h-[340px] flex items-center justify-between">

            {/* Left Arrow */}
            <button
              onClick={handlePrev}
              className="z-30 p-3 md:p-4 text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white dark:hover:bg-[#121928] rounded-full transition-all
  active:scale-95 hidden sm:block shadow-sm border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
            >
              <ArrowLeft strokeWidth={2} size={32} />
            </button>

            <div className="relative flex-1 h-full overflow-hidden mx-2 sm:mx-8">

              {/* Glow */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] bg-blue-500/15 dark:bg-blue-500/20 blur-[40px] rounded-full z-0
  pointer-events-none" />

              {/* Center circle */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px] md:w-[230px] md:h-[230px] bg-white dark:bg-[#121928] rounded-full
  shadow-[0_15px_40px_rgba(15,23,42,0.08)] dark:shadow-[0_15px_40px_rgba(0,0,0,0.4)] border-[3px] border-white dark:border-[#121928] z-10 pointer-events-none transition-all duration-300" />

              {/* Items */}
              {quickActions.map((item, index) => {
                const isCenter = index === activeIndex;
                const Icon = item.icon;
                const isLocked = item.requiresAuth && !isLoggedIn;

                return (
                  <div
                    key={index}
                    onClick={() => handleItemClick(index, item)}
                    className={`absolute left-1/2 top-1/2 flex flex-col items-center justify-center transition-all duration-[600ms] ease-[cubic-bezier(0.25,0.8,0.25,1)] w-[160px] md:w-[200px]
  ${
                      isCenter && isLocked ? "cursor-not-allowed" : "cursor-pointer"
                    }`}
                    style={getItemStyles(index)}
                  >
                    <div className="relative mb-4 md:mb-5 flex items-center justify-center">
                      <div className={`transition-all duration-500 flex items-center justify-center ${
                        isCenter
                          ? "scale-110 drop-shadow-[0_8px_16px_rgba(37,99,235,0.3)] dark:drop-shadow-[0_8px_16px_rgba(96,165,250,0.2)]"
                          : ""
                      } ${isLocked ? "opacity-35" : ""}`}>
                        <Icon
                          size={isCenter ? 64 : 52}
                          style={isCenter && !isLocked ? { fill: "url(#iconGradient)" } : {}}
                          className={!isCenter || isLocked ? "text-gray-400 dark:text-gray-500" : ""}
                        />
                      </div>

                      {/* Lock badge — only on requiresAuth items when not logged in */}
                      {isLocked && (
                        <div className={`absolute flex items-center justify-center rounded-full bg-white dark:bg-[#1a2235] shadow-md border border-gray-200 dark:border-gray-700 ${
                          isCenter ? "-bottom-2 -right-2 w-7 h-7" : "-bottom-1 -right-1 w-5 h-5"
                        }`}>
                          <FaLock
                            size={isCenter ? 13 : 9}
                            className="text-gray-400 dark:text-gray-500"
                          />
                        </div>
                      )}
                    </div>

                    <span className={`text-center transition-all duration-300 leading-tight ${
                      isLocked ? "opacity-40" : ""
                    } ${
                      isCenter && !isLocked
                        ? "text-[17px] md:text-[20px] font-black text-transparent bg-clip-text bg-gradient-to-r from-[#4DA1FF] to-[#1E50FF] dark:from-blue-400 dark:to-blue-600"
                        : "text-[15px] md:text-[17px] font-bold text-gray-500 dark:text-gray-400"
                    }`}>
                      {item.name}
                    </span>

                    {isCenter && !isLocked && (
                      <span className="mt-2 text-[11px] text-[#4DA1FF]/70 font-medium animate-pulse">
                        Tap to open →
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right Arrow */}
            <button
              onClick={handleNext}
              className="z-30 p-3 md:p-4 text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white dark:hover:bg-[#121928] rounded-full transition-all
  active:scale-95 hidden sm:block shadow-sm border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
            >
              <ArrowRight strokeWidth={2} size={32} />
            </button>
          </div>

          {/* ── DOT INDICATORS ── */}
          <div className="flex items-center gap-2 mb-6">
            {quickActions.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "w-6 h-2 bg-gradient-to-r from-[#4DA1FF] to-[#1E50FF]"
                    : "w-2 h-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>

          {/* ── CTA STRIP ── */}
          {!isLoggedIn ? (
            <div className="w-full max-w-2xl mx-auto px-4 pb-2">
              <div className="relative overflow-hidden rounded-2xl px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-[#4DA1FF]/10 to-[#1E50FF]/10
  border border-[#4DA1FF]/20 dark:from-[#4DA1FF]/8 dark:to-[#1E50FF]/8 dark:border-[#4DA1FF]/15">
                <div className="absolute inset-0 bg-gradient-to-r from-[#4DA1FF]/5 to-transparent pointer-events-none" />
                <div className="flex items-center gap-3 z-10">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#4DA1FF] to-[#1E50FF] flex items-center justify-center shadow-md shadow-[#1E50FF]/20 shrink-0">
                    <FaLock size={14} className="text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 dark:text-white text-sm">
                      {lockedCount} features require login
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Sign in to access Send Money, Cash Out, Wallet &amp; more
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 z-10 shrink-0">
                  <button
                    onClick={() => router.push("/login")}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#4DA1FF] to-[#1E50FF] text-white text-sm font-bold shadow-lg shadow-[#1E50FF]/25 hover:scale-105 transition-all active:scale-95"
                  >
                    <FaUnlockAlt size={13} />
                    Login
                  </button>
                  <button
                    onClick={() => router.push("/register")}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-white/10 text-[#1E50FF] dark:text-[#4DA1FF] text-sm font-bold border border-[#4DA1FF]/30 hover:scale-105 transition-all active:scale-95"
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full max-w-2xl mx-auto px-4 pb-2">
              <div className="rounded-2xl px-6 py-3 flex items-center justify-center gap-2 bg-emerald-500/8 border border-emerald-500/20">
                <FaUnlockAlt size={13} className="text-emerald-500" />
                <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                  All features unlocked — welcome, {session.user?.name?.split(" ")[0]}!
                </p>
              </div>
            </div>
          )}

        </div>
      </section>
    );
  };

  export default Menus;
