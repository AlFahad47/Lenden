 "use client";

  import { Swiper, SwiperSlide } from "swiper/react";
  import { Autoplay, EffectFade, Parallax } from "swiper/modules";
  import { motion } from "framer-motion";
  import "swiper/css";
  import "swiper/css/effect-fade";

  const slides = [
    {
      id: 1,
      image: "https://images.pexels.com/photos/5980865/pexels-photo-5980865.jpeg?auto=compress&cs=tinysrgb&w=1920",
    },
    {
      id: 2,
      image: "https://images.pexels.com/photos/29775797/pexels-photo-29775797.jpeg?auto=compress&cs=tinysrgb&w=1920",
    },
    {
      id: 3,
      image: "https://images.pexels.com/photos/7267232/pexels-photo-7267232.jpeg?auto=compress&cs=tinysrgb&w=1920",
    },
    {
      id: 4,
      image: "https://images.pexels.com/photos/4452505/pexels-photo-4452505.jpeg?auto=compress&cs=tinysrgb&w=1920",
    },
  ];

  const textVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.3, duration: 0.7, ease: "easeOut" },
    }),
  };

  export default function Banner() {
    return (
      <section className="relative w-full h-screen overflow-hidden">
        <Swiper
          modules={[Autoplay, EffectFade, Parallax]}
          effect="fade"
          parallax={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          className="w-full h-full"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/55" />

                {/* Text content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center pb-24">
                  <motion.h1
                    custom={0}
                    initial="hidden"
                    animate="visible"
                    variants={textVariants}
                    className="text-4xl md:text-6xl font-bold text-white max-w-4xl leading-tight"
                  >
                    Your Money, Guarded with{" "}
                    <span style={{ color: "#1D4E48" }}>Excellence.</span>
                  </motion.h1>

                  <motion.p
                    custom={1}
                    initial="hidden"
                    animate="visible"
                    variants={textVariants}
                    className="mt-6 text-lg md:text-xl text-white/80 max-w-2xl"
                  >
                    Experience the next generation of secure digital transactions
                    with Lenden.
                  </motion.p>


                   <motion.div
                    custom={2}
                    initial="hidden"
                    animate="visible"
                    variants={textVariants}
                    className="mt-10 flex flex-col sm:flex-row gap-4"
                  >
                    <motion.a
                      href="/register"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="px-8 py-4 rounded-full font-semibold text-white text-base"
                      style={{ backgroundColor: "#1D4E48" }}
                    >
                      Get Started
                    </motion.a>

                    <motion.a
                      href="/login"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="px-8 py-4 rounded-full font-semibold text-white text-base border-2 border-white hover:bg-white hover:text-black transition-colors"
                    >
                      Learn More
                    </motion.a>
                  </motion.div>

                  {/* Trust Badges */}
                  <motion.div
                    custom={3}
                    initial="hidden"
                    animate="visible"
                    variants={textVariants}
                    className="mt-12 flex flex-wrap items-center justify-center gap-6"
                  >
                    {[
                      { icon: "✅", label: "KYC Verified" },
                      { icon: "🔒", label: "Bank-Grade Security" },
                      { icon: "⚡", label: "Instant Transfers" },
                      { icon: "🕐", label: "24/7 Support" },
                    ].map((badge) => (
                      <div
                        key={badge.label}
                        className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2"
                      >
                        <span aria-hidden="true">{badge.icon}</span>
                        <span className="text-white text-sm font-medium">
                          {badge.label}
                        </span>
                      </div>
                    ))}
                  </motion.div>

                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Stats Strip */}
        <div
          className="absolute bottom-0 left-0 w-full z-10 py-5 px-6"
          style={{ backgroundColor: "rgba(29, 78, 72, 0.85)" }}
        >
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-around gap-4">
            {[
              { number: "10,000+", label: "Active Users" },
              { number: "BDT 50L+", label: "Transferred" },
              { number: "99.9%", label: "Uptime" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-white">
                  {stat.number}
                </p>
                <p className="text-sm text-white/70 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

      </section>
    );
  }

