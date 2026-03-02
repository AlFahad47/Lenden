
  "use client";
  import React, { useState } from "react";
  import { ArrowLeft, ArrowRight } from "lucide-react";
  import {
    FaPaperPlane, FaHandHoldingUsd, FaMoneyBillWave, FaWallet,
    FaMobileAlt, FaReceipt, FaHistory, FaPiggyBank, FaCreditCard, FaSyncAlt,
  } from "react-icons/fa";
  import { IconType } from "react-icons";

  type MenuItem = {
    name: string
    icon: IconType
    route: string
  }

  const quickActions: MenuItem[] = [
    { name: "Send Money",          icon: FaPaperPlane,     route: "/send-money"     },
    { name: "Request Money",       icon: FaHandHoldingUsd, route: "/request-money"  },
    { name: "Cash Out",            icon: FaMoneyBillWave,  route: "/cash-out"       },
    { name: "Add Money",           icon: FaWallet,         route: "/add-money"      },
    { name: "Mobile Recharge",     icon: FaMobileAlt,      route: "/mobile-recharge"},
    { name: "Pay Bill",            icon: FaReceipt,        route: "/pay-bill"       },
    { name: "Transaction History", icon: FaHistory,        route: "/transactions"   },
    { name: "Wallet",              icon: FaPiggyBank,      route: "/wallet"         },
    { name: "Cards & Banks",       icon: FaCreditCard,     route: "/cards-banks"    },
    { name: "Subscriptions",       icon: FaSyncAlt,        route: "/subscriptions"  },
  ]

  const Menus: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const total = quickActions.length;

    const handleNext = () => setActiveIndex((prev) => (prev + 1) % total);
    const handlePrev = () => setActiveIndex((prev) => (prev - 1 + total) % total);

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
      <section className="w-full mt-[-12%] bg-gray-50 dark:bg-[#0A0E17] py-16 md:py-20 overflow-hidden select-none border-y border-gray-200 dark:border-gray-800/60 transition-colors
  duration-300">

        {/* SVG gradient for fill-based icons */}
        <svg width="0" height="0" className="absolute">
          <defs>
            <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop stopColor="#4DA1FF" offset="0%" />
              <stop stopColor="#1E50FF" offset="100%" />
            </linearGradient>
          </defs>
        </svg>

        <div className="max-w-[1400px] mx-auto px-2 md:px-4 relative flex flex-col items-center">
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
                return (
                  <div
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className="absolute left-1/2 top-1/2 flex flex-col items-center justify-center cursor-pointer transition-all duration-[600ms] ease-[cubic-bezier(0.25,0.8,0.25,1)] w-[160px]
   md:w-[200px]"
                    style={getItemStyles(index)}
                  >
                    <div className={`mb-4 md:mb-5 transition-all duration-500 flex items-center justify-center ${
                      isCenter
                        ? "scale-110 drop-shadow-[0_8px_16px_rgba(37,99,235,0.3)] dark:drop-shadow-[0_8px_16px_rgba(96,165,250,0.2)]"
                        : "text-gray-400 dark:text-gray-500"
                    }`}>
                      <Icon
                        size={isCenter ? 64 : 52}
                        style={isCenter ? { fill: "url(#iconGradient)" } : {}}
                      />
                    </div>
                    <span className={`text-center transition-all duration-300 leading-tight ${
                      isCenter
                        ? "text-[17px] md:text-[20px] font-black text-transparent bg-clip-text bg-gradient-to-r from-[#4DA1FF] to-[#1E50FF] dark:from-blue-400 dark:to-blue-600"
                        : "text-[15px] md:text-[17px] font-bold text-gray-500 dark:text-gray-400"
                    }`}>
                      {item.name}
                    </span>
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
        </div>
      </section>
    );
  };

  export default Menus;
