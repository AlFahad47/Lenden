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
      <section className="w-full py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#1D4E48]">
              What We Offer
            </h2>
            <p className="mt-4 text-gray-500 text-base md:text-lg max-w-xl mx-auto">
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
                className="bg-white rounded-2xl p-8 shadow-md border-t-4 border-[#1D4E48] hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-[#1D4E48] mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Promo Banner */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 rounded-2xl px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{ backgroundColor: "#BDDD7E" }}
          >
            <div>
              <h3 className="text-xl font-bold text-[#1D4E48]">
                🎉 First 3 transfers FREE for new users!
              </h3>
              <p className="text-[#1D4E48]/80 text-sm mt-1">
                Sign up today and experience Lenden with zero fees.
              </p>
            </div>
            <a
              href="/register"
              className="px-6 py-3 rounded-full bg-[#1D4E48] text-white font-semibold text-sm whitespace-nowrap hover:opacity-90 transition"
            >
              Get Started →
            </a>
          </motion.div>

        </div>
      </section>
    );
  }
