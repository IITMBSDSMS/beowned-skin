"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import { motion } from "framer-motion";

export default function HeroSlider() {
  return (
    <section className="h-[80vh] md:h-[95vh] w-full relative overflow-hidden bg-black mt-16 md:mt-20">
      <Swiper
        modules={[Autoplay, EffectFade, Navigation]}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop
        effect="fade"
        speed={1500}
        navigation={{
          nextEl: ".hero-next",
          prevEl: ".hero-prev",
        }}
        className="h-full w-full"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          {({ isActive }) => (
            <div className="h-full w-full relative flex items-center bg-[#f2ede7]">
              <motion.img
                initial={{ scale: 1.1 }}
                animate={{ scale: isActive ? 1 : 1.1 }}
                transition={{ duration: 6, ease: "linear" }}
                src="/images/model1.jpg"
                className="absolute inset-0 w-full h-full object-cover z-0 object-top md:object-center"
              />
              <div className="absolute inset-0 bg-black/20 z-10" />
              <div className="relative z-20 max-w-7xl mx-auto px-6 w-full pt-20">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 30 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  <p className="text-white/90 uppercase tracking-[0.3em] text-sm mb-4">Discover Clarity</p>
                  <h1 className="text-5xl md:text-7xl font-light text-white mb-8 leading-[1.1] max-w-2xl drop-shadow-sm">
                    Science-Backed <br /> Skincare.
                  </h1>
                  <button className="px-8 py-3.5 bg-white/20 backdrop-blur-md border border-white/40 text-white rounded-full hover:bg-white hover:text-black transition-all duration-500 font-medium tracking-wide">
                    Explore Collection
                  </button>
                </motion.div>
              </div>
            </div>
          )}
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          {({ isActive }) => (
            <div className="h-full w-full relative flex items-center justify-center bg-gradient-to-br from-[#EFEAE4] to-[#fcfcfb]">
              <motion.img
                initial={{ scale: 0.8, rotate: -5, opacity: 0 }}
                animate={{ 
                  scale: isActive ? 1 : 0.8, 
                  rotate: isActive ? 0 : -5,
                  opacity: isActive ? 1 : 0
                }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                src="/images/product.png"
                className="max-h-[60%] max-w-full object-contain z-10 drop-shadow-2xl hover:-translate-y-4 hover:rotate-3 transition-transform duration-700"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-accent/20 rounded-full blur-[100px] z-0" />
              
              <div className="absolute bottom-16 md:bottom-24 w-full text-center z-20">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                  transition={{ duration: 1, delay: 0.8 }}
                >
                  <h2 className="text-4xl md:text-6xl font-light text-gray-900 tracking-tight drop-shadow-sm mb-2">
                    Niacinamide 10%
                  </h2>
                  <p className="text-gray-600 text-lg md:text-xl font-light tracking-wide">Your daily dose of perfection</p>
                </motion.div>
              </div>
            </div>
          )}
        </SwiperSlide>


        {/* Slide 3 */}
        <SwiperSlide>
          {({ isActive }) => (
            <div className="h-full w-full relative flex items-center justify-end bg-[#d6d4ce]">
              <motion.img
                initial={{ scale: 1.1 }}
                animate={{ scale: isActive ? 1 : 1.1 }}
                transition={{ duration: 6, ease: "linear" }}
                src="/images/model2.jpg"
                className="absolute inset-0 w-full h-full object-cover z-0 object-[70%_20%]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent z-10" />
              
              <div className="relative z-20 max-w-7xl mx-auto px-6 w-full pt-20">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -30 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="max-w-xl"
                >
                  <p className="text-white/80 uppercase tracking-[0.3em] text-sm mb-4">Glow From Within</p>
                  <h1 className="text-5xl md:text-7xl font-light text-white mb-8 leading-[1.1] drop-shadow-md">
                    Reveal Your <br/> True Radiance
                  </h1>
                  <button className="px-8 py-3.5 bg-white text-black rounded-full shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-105 transition-all duration-300 font-medium tracking-wide">
                    Take AI Skin Test
                  </button>
                </motion.div>
              </div>
            </div>
          )}
        </SwiperSlide>

      </Swiper>

      {/* Custom Navigation */}
      <div className="hero-prev absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 cursor-pointer group hidden md:flex">
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white group-hover:bg-white group-hover:text-black transition-all duration-300 shadow-lg">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </div>
      </div>

      <div className="hero-next absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 cursor-pointer group hidden md:flex">
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white group-hover:bg-white group-hover:text-black transition-all duration-300 shadow-lg">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>

    </section>
  );
}
