"use client";

import { motion } from "framer-motion";

const features = [
  {
    icon: "🔒",
    title: "Bank-Grade Security",
    description: "Your funds are protected with end-to-end encryption and multi-layer authentication.",
  },
  {
    icon: "⚡",
    title: "Instant Transfers",
    description: "Send and receive money in seconds — anytime, anywhere across Bangladesh.",
  },
  {
    icon: "💳",
    title: "Easy Payments",
    description: "Pay bills, recharge mobile, and shop online all from one wallet.",
  },
];

export default function OfferSection() {
  return (
    <section className="w-full py-16 bg-[#f0f7ff] dark:bg-[#04090f] transition-colors duration-300">
      <div className="w-11/12 mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-[#0061ff] via-[#0095ff] to-[#00d4ff] dark:from-white dark:via-[#93C5FD] dark:to-[#0061ff] bg-clip-text text-transparent">
            What We Offer
          </h2>
          <p className="mt-4 text-gray-500 dark:text-gray-400 text-base md:text-lg max-w-xl mx-auto">
            Everything you need to manage your money — simple, fast, and secure.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.03 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-md border-t-4 border-[#0061ff] dark:border-[#0095ff] hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-[#0061ff] dark:text-[#00b4ff] mb-2">{feature.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Promo Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 rounded-2xl px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#0061ff] dark:bg-[#1e3a8a]"
        >
          <div>
            <h3 className="text-xl font-bold text-white">
              🎉 First 3 transfers FREE for new users!
            </h3>
            <p className="text-blue-100 text-sm mt-1">
              Sign up today and experience NovaPay with zero fees.
            </p>
          </div>
          <a
            href="/register"
            className="px-6 py-3 rounded-full bg-white text-[#0061ff] font-semibold text-sm whitespace-nowrap hover:opacity-90 transition"
          >
            Get Started →
          </a>
        </motion.div>

      </div>
    </section>
  );
}
