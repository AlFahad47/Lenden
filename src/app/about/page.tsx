"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1D4E48]/10 via-white to-[#BDDD7E]/20 overflow-hidden">
      {/* ================= HERO ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          <motion.h1
            variants={fadeUp}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1D4E48] leading-tight"
          >
            Empowering Digital Transactions with Lenden
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-lg text-gray-600 leading-relaxed"
          >
            Lenden is a modern FinTech-based digital wallet system inspired by
            the Bengali word “লেনদেন”. It enables users to send, receive, and
            manage money securely with real-time analytics and fraud protection.
          </motion.p>

          <motion.div variants={fadeUp}>
            <Link
              href="/login"
              className="inline-block bg-[#1D4E48] hover:bg-[#163c37] text-white px-8 py-4 rounded-2xl shadow-xl transition-all duration-300"
            >
              Create Your Account
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
