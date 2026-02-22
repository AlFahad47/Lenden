"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

// Reusable Components
const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="relative rounded-3xl bg-white/70 dark:bg-white/5 backdrop-blur-2xl border border-[#1D4E48]/30 dark:border-[#BDDD7E]/20 shadow-2xl hover:shadow-[#1D4E48]/20 hover:scale-[1.04] transition-all duration-500">
    {children}
  </div>
);

const CardContent = ({ children }: { children: React.ReactNode }) => (
  <div className="p-10 space-y-4">{children}</div>
);

const Button = ({ children }: { children: React.ReactNode }) => (
  <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#2cb11ab0] to-[#0bdf86c7] hover:scale-105 hover:shadow-xl hover:shadow-[#1D4E48]/30 text-white font-semibold transition-all duration-300 inline-flex items-center gap-2">
    {children}
  </button>
);

const steps = [
  {
    title: "Create Your Account",
    desc: "Register securely with email verification and complete your KYC process in just a few steps.",
  },
  {
    title: "Add Funds Securely",
    desc: "Deposit money into your wallet and monitor your balance in real-time with encrypted protection.",
  },
  {
    title: "Send & Receive Instantly",
    desc: "Transfer funds instantly with smart transaction logging and secure authentication layers.",
  },
  {
    title: "Track & Grow",
    desc: "Analyze transactions, monitor activity insights, and manage your financial growth efficiently.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="relative overflow-hidden min-h-screen bg-gradient-to-br from-[#0c9472]/90 via-[#0cfc0477] to-white dark:from-black dark:via-[#1D4E48]/50 dark:to-black transition-colors duration-500 px-6 py-24">
      {/* Animated Gradient Blobs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#1D4E48]/30 dark:bg-[#1D4E48]/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#BDDD7E]/30 dark:bg-[#BDDD7E]/20 rounded-full blur-3xl animate-pulse" />

      {/* Hero Section */}
      <section className="relative max-w-6xl mx-auto text-center space-y-8">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r
   from-[#39ED46] via-[#abf0f0] to-[#b3fc21] dark:from-white dark:to-[#BDDD7E] bg-clip-text text-transparent"
        >
          How <span>Lenden</span> Works
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg md:text-xl text-gray-200 dark:text-gray-300 max-w-3xl mx-auto"
        >
          Experience a next-generation digital wallet built with security,
          performance, and modern architecture at its core.
        </motion.p>
      </section>

      {/* Timeline Line */}
      <div className="hidden md:block absolute left-1/2 top-80 bottom-32 w-1 bg-gradient-to-b from-[#1D4E48] to-[#BDDD7E] opacity-30" />

      {/* Steps Section */}
      <section className="relative max-w-6xl mx-auto mt-28 grid md:grid-cols-2 gap-16">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.25, duration: 0.9 }}
            className={`${index % 2 !== 0 ? "md:mt-24" : ""}`}
          >
            <Card>
              <CardContent>
                <div
                  className="text-6xl font-extrabold 
  bg-gradient-to-r 
  from-[#123d38] to-[#71a10f] 
  dark:from-[#BDDD7E] dark:to-[#1D4E48]
  bg-clip-text text-transparent"
                >
                  0{index + 1}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-400 text-lg">
                  {step.desc}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>

      {/* CTA Section */}
      <section className="relative max-w-4xl mx-auto mt-32 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="rounded-3xl p-16 bg-gradient-to-r from-[#0a7e06] to-[#bcdbc2f8] shadow-2xl"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            Ready to Experience the Future of Digital Finance?
          </h2>
          <Link href="/login">
            <Button>
              Get Started <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
