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
      <section className="w-full h-screen">
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
                <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
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
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    );
  }

