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
              href="/register"
              className="inline-block bg-[#1D4E48] hover:bg-[#163c37] text-white px-8 py-4 rounded-2xl shadow-xl transition-all duration-300"
            >
              Create Your Account
            </Link>
          </motion.div>
        </motion.div>

        {/* Feature Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-2xl"
        >
          {[
            "Secure & Encrypted Transactions",
            "Instant Money Transfers",
            "AI-Powered Expense Analytics",
            "Smart Fraud Detection",
          ].map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="w-3 h-3 rounded-full bg-[#BDDD7E]" />
              <p className="text-gray-700 font-medium">{item}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center text-[#1D4E48] mb-12"
        >
          Why Lenden Stands Out
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "High-Level Security",
              desc: "Integrated fraud detection and protected APIs keep your funds safe.",
            },
            {
              title: "Lightning Fast",
              desc: "Built with Next.js for fast performance and optimized SEO.",
            },
            {
              title: "Smart Insights",
              desc: "AI analytics help you understand your spending habits better.",
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition duration-300"
            >
              <h3 className="text-xl font-semibold text-[#1D4E48] mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= TECHNOLOGY ================= */}
      {/* <section className="bg-[#1D4E48] text-white py-20">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Built with Modern Technology
            </h2>
            <p className="text-white/80 leading-relaxed">
              Lenden uses TypeScript for reliability and Next.js for
              performance and scalability. The architecture is clean,
              maintainable, and production-ready.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {["TypeScript", "Next.js", "Tailwind CSS", "Framer Motion"].map(
              (tech) => (
                <div
                  key={tech}
                  className="bg-white/10 border border-white/20 p-6 rounded-2xl text-center font-semibold backdrop-blur"
                >
                  {tech}
                </div>
              )
            )}
          </div>
        </div>
      </section> */}
    </div>
  );
}
