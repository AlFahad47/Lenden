  "use client";

  import Image from "next/image";
  import { motion } from "framer-motion";
  import { Users, ArrowLeftRight, ShieldCheck } from "lucide-react";

  const PEXELS_COINS =
    "https://images.pexels.com/photos/6266502/pexels-photo-6266502.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

  export default function Banner() {
    return (
      <section
        className="relative w-full overflow-hidden flex flex-col"
        style={{ background: "#FFFFFF" }}
      >
        {/* Top teal accent line */}
        <div
          className="absolute top-0 left-0 w-full h-1 z-10"
          style={{ background: "linear-gradient(90deg, #0D9488, #0EA5E9)" }}
        />

        {/* ── MAIN ROW ── */}
        <div
          className="w-full max-w-7xl mx-auto px-6 lg:px-16
                     grid grid-cols-1 lg:grid-cols-2 items-center gap-8"
          style={{ minHeight: "60vh" }}
        >
          {/* ── LEFT — TEXT ── */}
          <div className="flex flex-col items-start justify-center lg:pr-12 py-10">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div
                className="mb-5 inline-flex items-center gap-2 px-4 py-1.5
                           rounded-full text-xs font-bold uppercase tracking-widest"
                style={{ background: "#CCFBF1", color: "#0D9488" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#14B8A6] animate-pulse" />
                Bangladesh&apos;s Smartest Wallet
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-[3.2rem] font-black uppercase
                         leading-[1.12] tracking-tight"
              style={{ color: "#0F172A" }}
            >
              YOUR MONEY
              <br />
              GUARDED WITH
              <br />
              <span style={{ color: "#0D9488" }}>EXCELLENCE.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22 }}
              className="mt-5 text-sm sm:text-base leading-relaxed max-w-[360px]"
              style={{ color: "#64748B" }}
            >
              Experience the next generation of secure digital transactions
              with NovaPay — fast, safe, and always available.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.34 }}
            >
              <motion.a
                href="/register"
                whileHover={{
                  scale: 1.04,
                  boxShadow: "0 12px 36px rgba(13,148,136,0.45)",
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="mt-7 inline-block px-9 py-3.5 font-bold text-sm
                           uppercase tracking-widest text-white"
                style={{ background: "#0D9488", borderRadius: "6px" }}
              >
                Get Started
              </motion.a>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.46 }}
              className="mt-6 hidden sm:flex flex-wrap gap-2"
            >
              {[
                { icon: "✅", label: "KYC Verified" },
                { icon: "🔒", label: "Bank-Grade Security" },
                { icon: "⚡", label: "Instant Transfers" },
              ].map((b) => (
                <div
                  key={b.label}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs"
                  style={{
                    color: "#475569",
                    background: "#F1F5F9",
                    border: "1px solid #E2E8F0",
                  }}
                >
                  <span>{b.icon}</span> {b.label}
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT — PHOTO ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative hidden lg:block"
            style={{ height: "420px", marginBottom: "32px" }}
          >
            <div
              className="relative w-full h-full overflow-hidden"
              style={{ borderRadius: "20px" }}
            >
              <Image
                src={PEXELS_COINS}
                alt="NovaPay — secure digital wallet"
                fill
                className="object-cover"
                style={{ objectPosition: "center 70%" }}
                priority
              />
            </div>
          </motion.div>
        </div>

        {/* ── BOTTOM INFO STRIP ── */}
        <div className="relative z-10 w-full">
          <div className="grid grid-cols-3">
            {[
              { icon: Users,          value: "10,000+",  label: "Active Users", teal: true  },
              { icon: ArrowLeftRight, value: "BDT 50L+", label: "Transferred",  teal: false },
              { icon: ShieldCheck,    value: "99.9%",    label: "Uptime",       teal: true  },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="flex items-center gap-4 py-5 px-6 lg:px-10"
                  style={{ background: item.teal ? "#0D9488" : "#1E293B" }}
                >
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(255,255,255,0.15)" }}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xl font-black text-white">{item.value}</p>
                    <p className="text-xs text-white/70">{item.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }
