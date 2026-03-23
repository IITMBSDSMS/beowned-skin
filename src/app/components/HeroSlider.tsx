"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

export default function HeroSlider() {
  return (
    <section className="h-[50vh] md:h-[65vh] w-full relative overflow-hidden mt-20 md:mt-24">
      <div className="max-w-7xl mx-auto h-full px-4 md:px-6">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade, Navigation]}
        autoplay={{ delay: 4000 }}
        loop
        pagination={{ clickable: true }}
        effect="fade"
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        className="h-full rounded-xl md:rounded-2xl overflow-hidden shadow-lg bg-white"
      >

        {/* Slide 1 */}
        <SwiperSlide>
          <div className="h-full w-full relative flex items-center justify-center bg-white">
            <img
              src="/images/model1.jpg"
              className="max-h-full max-w-full object-contain object-center mx-auto my-auto z-0"
            />
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="h-full w-full relative flex items-center justify-center bg-white">
            <img
              src="/images/product.png"
              className="max-h-full max-w-full object-contain object-center mx-auto my-auto z-0"
            />
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div className="h-full w-full relative flex items-center justify-center bg-white">
            <img
              src="/images/model2.jpg"
              className="max-h-full max-w-full object-contain object-center mx-auto my-auto z-0"
            />
          </div>
        </SwiperSlide>

      </Swiper>
      </div>

      <div className="custom-prev absolute left-2 md:left-3 top-1/2 -translate-y-1/2 z-20 cursor-pointer">
        <div className="bg-white/70 backdrop-blur-md p-1.5 md:p-2 rounded-full hover:scale-110 transition">
          ←
        </div>
      </div>

      <div className="custom-next absolute right-2 md:right-3 top-1/2 -translate-y-1/2 z-20 cursor-pointer">
        <div className="bg-white/70 backdrop-blur-md p-1.5 md:p-2 rounded-full hover:scale-110 transition">
          →
        </div>
      </div>
    </section>
  );
}
