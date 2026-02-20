"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

// ===== Animated Counter =====
function Counter({ value, label }: { value: number; label: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const stepTime = 16;
    const increment = value / (duration / stepTime);

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="text-center">
      <h3 className="text-4xl font-bold bg-gradient-to-r from-[#1D4E48] to-[#BDDD7E] bg-clip-text text-transparent">
        {count}+
      </h3>
      <p className="text-gray-600 mt-2">{label}</p>
    </div>
  );
}

// ===== Animation Section =====
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export default function AboutPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-white via-[#f7faf9] to-[#eef5f3]">
      {/* =====  Gradient Background ===== */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-r from-[#BDDD7E]/40 to-[#1D4E48]/20 rounded-full blur-3xl -z-10"
      />

      <motion.div
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 14, repeat: Infinity }}
        className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-r from-[#1D4E48]/30 to-[#BDDD7E]/20 rounded-full blur-3xl -z-10"
      />

      {/* ================= HERO ================= */}
      <section className="max-w-7xl mx-auto px-6 py-28 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-8"
        >
          <motion.span
            variants={fadeUp}
            className="inline-block bg-gradient-to-r from-[#BDDD7E]/40 to-[#1D4E48]/20 text-[#1D4E48] px-4 py-2 rounded-full text-sm font-medium"
          >
            Next-Gen Digital Wallet
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="text-4xl md:text-6xl font-extrabold leading-tight bg-gradient-to-r from-[#1D4E48] to-[#2f7c72] bg-clip-text text-transparent"
          >
            Professional Digital Finance Made Simple
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-lg text-gray-600 leading-relaxed max-w-xl"
          >
            Lenden delivers a secure and intelligent digital wallet platform
            built for modern financial management. Experience fast transactions,
            AI-powered analytics, and enterprise-grade security in one seamless
            ecosystem.
          </motion.p>

          <motion.div variants={fadeUp} className="flex gap-4 flex-wrap">
            <Link
              href="/register"
              className="bg-gradient-to-r from-[#1D4E48] to-[#2f7c72] hover:scale-105 text-white px-8 py-4 rounded-2xl shadow-2xl transition-all duration-300"
            >
              Get Started
            </Link>

            <Link
              href="/login"
              className="border border-[#1D4E48] text-[#1D4E48] hover:bg-[#1D4E48] hover:text-white px-8 py-4 rounded-2xl transition-all duration-300"
            >
              Login
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating Glass Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: [0, -12, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="bg-white/60 backdrop-blur-2xl p-10 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] border border-white/40"
        >
          {[
            "End-to-End Encrypted Payments",
            "Real-Time Transaction Monitoring",
            "AI Expense Intelligence",
            "Advanced Fraud Protection",
          ].map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.25 }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-[#1D4E48] to-[#BDDD7E]" />
              <p className="text-gray-700 font-medium">{item}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ================= STATS ================= */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-3 gap-12 bg-white rounded-3xl shadow-xl p-12"
        >
          <Counter value={50} label="Secure Transactions / sec" />
          <Counter value={99} label="System Reliability %" />
          <Counter value={24} label="Customer Support Hours" />
        </motion.div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="max-w-7xl mx-auto px-6 pb-28">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-[#1D4E48] to-[#2f7c72] bg-clip-text text-transparent"
        >
          Why Professionals Choose Lenden
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            {
              title: "Enterprise Security",
              desc: "Multi-layer authentication and fraud detection protect every transaction.",
            },
            {
              title: "High Performance",
              desc: "Optimized architecture ensures fast, scalable experiences.",
            },
            {
              title: "AI Financial Tools",
              desc: "Smart analytics help users make informed financial decisions.",
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group bg-white p-10 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-4 transition-all duration-500 border border-gray-100"
            >
              <h3 className="text-xl font-semibold text-[#1D4E48] mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= TECHNOLOGY ================= */}
      <section className="relative bg-gradient-to-r from-[#1D4E48] to-[#2f7c72] text-white py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,white,transparent_70%)]" />

        <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold">
              Built with Modern Technology
            </h2>
            <p className="text-white/80 leading-relaxed max-w-xl">
              Lenden is engineered with TypeScript and Next.js to deliver
              reliability, performance, and scalability for future-ready digital
              finance platforms.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            {["TypeScript", "Next.js", "Tailwind CSS", "Framer Motion"].map(
              (tech) => (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  key={tech}
                  className="bg-white/10 hover:bg-white/20 transition-all duration-300 border border-white/20 p-8 rounded-2xl text-center font-semibold backdrop-blur-xl"
                >
                  {tech}
                </motion.div>
              ),
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
