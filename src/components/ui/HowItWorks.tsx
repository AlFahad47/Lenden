// Designed by :- JARIF -:
"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Card = ({ children }: { children: React.ReactNode }) => (
  <div
    className="group relative 
    rounded-xl md:rounded-2xl lg:rounded-3xl 
    p-[1px] 
    bg-gradient-to-br from-[#1D4E48] via-[#BDDD7E] to-[#1D4E48]
    hover:scale-[1.02] transition-all duration-500"
  >
    <div
      className="relative 
      rounded-xl md:rounded-2xl lg:rounded-3xl
      bg-white/80 dark:bg-[#0b1f1d]/80
      backdrop-blur-xl
      border border-[#1D4E48]/30 dark:border-[#BDDD7E]/30
      shadow-md md:shadow-lg lg:shadow-2xl
      group-hover:shadow-[#BDDD7E]/40
      transition-all duration-500"
    >
      <div
        className="absolute inset-0 
        rounded-xl md:rounded-2xl lg:rounded-3xl
        opacity-0 group-hover:opacity-100
        bg-gradient-to-br from-[#1D4E48]/20 to-[#BDDD7E]/20
        blur-xl transition duration-500"
      />

      <div className="relative">{children}</div>
    </div>
  </div>
);

const CardContent = ({ children }: { children: React.ReactNode }) => (
  <div className="p-3 md:p-4 lg:p-6 space-y-1.5 md:space-y-2 lg:space-y-3">
    {children}
  </div>
);

const Button = ({ children }: { children: React.ReactNode }) => (
  <button className="px-4 md:px-6 py-2.5 md:py-3 rounded-xl md:rounded-2xl bg-gradient-to-r from-[#1D4E48] to-[#0bdf86c7] hover:scale-105 hover:shadow-xl hover:shadow-[#1D4E48]/30 text-white text-sm md:text-base font-semibold transition-all duration-300 inline-flex items-center gap-2">
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
    <div
      className="relative overflow-hidden min-h-[80vh]
      bg-gradient-to-br
      from-gray-50 via-white to-gray-100
      dark:from-[#234A45] dark:via-[#0b1f1d] dark:to-[#234A45]
      transition-colors duration-500
      px-4 md:px-6 py-12 md:py-16"
    >
      {/* Background Blobs */}
      <div className="absolute -top-40 -left-40 w-60 md:w-80 h-60 md:h-80 bg-[#1D4E48]/30 dark:bg-[#1D4E48]/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-60 md:w-80 h-60 md:h-80 bg-[#BDDD7E]/30 dark:bg-[#BDDD7E]/20 rounded-full blur-3xl animate-pulse" />

      {/* Hero */}
      <section className="relative max-w-6xl mx-auto text-center space-y-4 md:space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="
            text-2xl sm:text-3xl md:text-5xl
            font-extrabold
            bg-gradient-to-r
            from-[#1D4E48] via-[#0fa133] to-[#35e0cc]
            dark:from-white dark:via-[#BDDD7E] dark:to-[#1D4E48]
            bg-clip-text text-transparent
          "
        >
          How <span>Lenden</span> Works
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
        >
          Experience a next-generation digital wallet built with security,
          performance, and modern architecture at its core.
        </motion.p>
      </section>

      {/* Timeline */}
      <div className="hidden md:block absolute left-1/2 top-64 bottom-24 w-1 bg-gradient-to-b from-[#35e0cc] to-[#BDDD7E] opacity-30" />

      {/* Steps */}
      <section className="relative max-w-6xl mx-auto mt-8 md:mt-10 grid sm:grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 lg:gap-5">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.25, duration: 0.9 }}
            className={`${index % 2 !== 0 ? "md:mt-12 lg:mt-16" : ""}`}
          >
            <Card>
              <CardContent>
                <div
                  className="
                    text-xl md:text-2xl lg:text-4xl
                    font-extrabold
                    bg-gradient-to-r
                    from-[#123d38] to-[#0fa133]
                    dark:from-[#BDDD7E] dark:to-[#1D4E48]
                    bg-clip-text text-transparent"
                >
                  0{index + 1}
                </div>

                <h3 className="text-base md:text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                  {step.title}
                </h3>

                <p className="text-xs md:text-sm lg:text-base text-gray-600 dark:text-gray-400">
                  {step.desc}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>

      {/* CTA */}
      <section className="relative max-w-4xl mx-auto mt-14 md:mt-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="group relative rounded-2xl md:rounded-3xl p-[1px]
          bg-gradient-to-br from-[#1D4E48] via-[#BDDD7E] to-[#1D4E48]
          shadow-xl md:shadow-2xl hover:scale-[1.02] transition-all duration-500"
        >
          <div
            className="relative rounded-2xl md:rounded-3xl
            p-6 md:p-10
            bg-white/80 dark:bg-[#0b1f1d]/80
            backdrop-blur-2xl
            border border-[#1D4E48]/30 dark:border-[#BDDD7E]/30
            overflow-hidden"
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100
              bg-gradient-to-br from-[#1D4E48]/20 to-[#BDDD7E]/20
              blur-xl transition duration-500"
            />

            <h2 className="relative text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-5 md:mb-6">
              Ready to Experience the Future of Digital Finance?
            </h2>

            <Link href="/login" className="relative">
              <Button>
                Get Started <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
