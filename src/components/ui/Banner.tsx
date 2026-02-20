 "use client";

  import { Swiper, SwiperSlide } from "swiper/react";
  import { Autoplay, EffectFade, Parallax } from "swiper/modules";
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
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    );
  }
