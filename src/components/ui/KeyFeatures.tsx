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
    from-white via-[#1D4E48] to-[#0c9472]/90 
    dark:from-black dark:via-[#1D4E48]/50 dark:to-black 
    transition-colors duration-500 px-6 py-24"
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
          from-[#39ED46] via-[#abf0f0] to-[#b3fc21]
          dark:from-white dark:to-[#BDDD7E]
          bg-clip-text text-transparent"
        >
          Key Features
        </h1>

        <p className="mt-6 text-lg md:text-xl text-gray-200 dark:text-gray-300">
          Explore powerful features designed to deliver speed, security, and a
          modern financial experience.
        </p>
      </motion.div>

      {/* Features Grid */}
      <div className="relative max-w-7xl mx-auto grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, i) => {
          const Icon = feature.icon;

          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.8 }}
              whileHover={{ y: -10, scale: 1.03 }}
              className="group relative rounded-3xl p-[1px] 
              bg-gradient-to-br 
              from-[#1d4e483f] to-[#0bdf8770]"
            >
              <div
                className="h-full  w-full rounded-3xl 
              bg-white/70 dark:bg-white/5 
              backdrop-blur-2xl 
              border border-[#1D4E48]/30 dark:border-[#BDDD7E]/20
              p-10 shadow-2xl 
              transition-all duration-500 
              group-hover:shadow-[#1D4E48]/30"
              >
                {/* Icon */}
                <div
                  className="w-14 h-14 flex items-center justify-center 
                rounded-2xl 
                bg-gradient-to-r 
                from-[#1D4E48] to-[#0bdf86c7] 
                text-white mb-6"
                >
                  <Icon className="w-7 h-7" />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-700 dark:text-gray-400 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
