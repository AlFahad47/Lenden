"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Zap, Wallet, BarChart3, Globe, Lock } from "lucide-react";

const features = [
  {
    title: "Secure Transactions",
    desc: "Advanced encryption and multi-layer authentication keep every transaction safe and protected.",
    icon: ShieldCheck,
  },
  {
    title: "Instant Transfers",
    desc: "Send and receive money in real time with lightning-fast performance.",
    icon: Zap,
  },
  {
    title: "Smart Wallet",
    desc: "Manage balances, track spending, and organize finances in one place.",
    icon: Wallet,
  },
  {
    title: "Analytics Dashboard",
    desc: "Visual insights help you understand and optimize your financial activity.",
    icon: BarChart3,
  },
  {
    title: "Global Access",
    desc: "Access your wallet anywhere in the world with seamless connectivity.",
    icon: Globe,
  },
  {
    title: "Privacy First",
    desc: "Your data stays private with industry-standard protection protocols.",
    icon: Lock,
  },
];

export default function KeyFeatures() {
  return (
    <div
      className="relative overflow-hidden min-h-screen 
   bg-gradient-to-br
      from-gray-50 via-white to-gray-100
      dark:from-[#234A45] dark:via-[#0b1f1d] dark:to-[#234A45] 
    transition-colors duration-500 px-6 py-18"
    >
      {/* Animated Gradient Blobs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#1D4E48]/30 dark:bg-[#1D4E48]/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#BDDD7E]/30 dark:bg-[#BDDD7E]/20 rounded-full blur-3xl animate-pulse" />

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative text-center max-w-3xl mx-auto mb-16"
      >
        <h1
          className="text-4xl md:text-6xl font-extrabold 
           bg-gradient-to-r
    from-[#1D4E48] via-[#0fa133] to-[#35e0cc]
    dark:from-white dark:via-[#BDDD7E] dark:to-[#1D4E48]
          bg-clip-text text-transparent"
        >
          Key Features
        </h1>

        <p className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-300">
          Explore powerful features designed to deliver speed, security, and a
          modern financial experience.
        </p>
      </motion.div>

      {/* Features Grid */}
      <div
        className="relative max-w-7xl mx-auto 
  grid gap-3 md:gap-4 lg:gap-6
  sm:grid-cols-2 lg:grid-cols-3 
  items-stretch"
      >
        {features.map((feature, i) => {
          const Icon = feature.icon;

          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group h-full"
            >
              {/* Gradient Border */}
              <div
                className="
          h-full
          rounded-lg md:rounded-xl lg:rounded-2xl
          p-[1px]
          bg-gradient-to-br 
          from-[#1D4E48] 
          via-[#BDDD7E] 
          to-[#1D4E48]
          transition-all duration-500
          hover:scale-[1.02]
        "
              >
                {/* Card Body */}
                <div
                  className="
            h-full
            flex flex-col justify-between
            rounded-lg md:rounded-xl lg:rounded-2xl
            bg-white/95 dark:bg-[#0b1f1d]/85
            backdrop-blur-xl
            border border-[#1D4E48]/20 dark:border-[#BDDD7E]/25
            shadow-sm md:shadow-md lg:shadow-lg
            transition-all duration-500
            overflow-hidden
          "
                >
                  <div className="p-3 md:p-4 lg:p-6 flex flex-col h-full">
                    {/* Icon */}
                    <div
                      className="
                w-7 h-7 md:w-8 md:h-8 lg:w-12 lg:h-12
                flex items-center justify-center
                rounded-md md:rounded-lg lg:rounded-xl
                bg-gradient-to-r 
                from-[#1D4E48] 
                to-[#0bdf86c7]
                text-white
                mb-2 md:mb-3 lg:mb-4
                shadow-sm
                group-hover:scale-105
                transition-transform duration-300
              "
                    >
                      <Icon className="w-3.5 h-3.5 md:w-4 md:h-4 lg:w-6 lg:h-6" />
                    </div>

                    {/* Title */}
                    <h3
                      className="
                text-xs md:text-sm lg:text-lg 
                font-semibold 
                text-gray-900 dark:text-white 
                mb-1 md:mb-2
              "
                    >
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p
                      className="
                text-[11px] md:text-xs lg:text-sm
                text-gray-600 dark:text-gray-400 
                leading-relaxed
                flex-grow
              "
                    >
                      {feature.desc}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
