"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { motion } from "framer-motion";
import Image from "next/image";

const slides = [
  {
    id: 1,
    image: "/images/model1.jpg",
    tagline: "Discover Clarity",
    title: "Science-Backed\nSkincare.",
    description: "Formulations rooted in clinical research, perfected for your daily glow. Experience uncompromised quality.",
    cta: "Explore Collection",
    align: "left",
    bgClass: "bg-[#f2ede7]",
    imgClass: "object-cover object-center md:object-[60%_center]"
  },
  {
    id: 2,
    image: "/images/product.png",
    tagline: "High Performance",
    title: "Niacinamide\n10%",
    description: "Your daily dose of perfection. Clinically proven to reduce blemishes and brighten your complexion.",
    cta: "Shop Now",
    align: "right",
    isProduct: true,
  },
  {
    id: 3,
    image: "/images/model2.jpg",
    tagline: "Glow From Within",
    title: "Reveal Your\nTrue Radiance.",
    description: "Personalized skincare regimens backed by AI technology and dermatological science.",
    cta: "Take AI Skin Test",
    align: "left",
    bgClass: "bg-[#d6d4ce]",
    imgClass: "object-cover object-[70%_20%]"
  }
];

export default function HeroSlider() {
  return (
    <section className="h-[85vh] md:h-[95vh] w-full relative overflow-hidden bg-[#0A0A0A] mt-16 md:mt-20">
      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        autoplay={{ delay: 7000, disableOnInteraction: false }}
        loop
        effect="fade"
        speed={1500}
        navigation={{
          nextEl: ".hero-next",
          prevEl: ".hero-prev",
        }}
        pagination={{
          clickable: true,
          el: ".hero-pagination",
          renderBullet: function (index, className) {
            return `<span class="${className} custom-bullet"></span>`;
          },
        }}
        className="h-full w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            {({ isActive }) => (
              <div className={`h-full w-full relative flex flex-col md:flex-row items-center ${slide.bgClass || 'bg-[#0A0A0A]'}`}>
                
                {/* Background Image Container */}
                <div className="absolute inset-0 z-0 overflow-hidden bg-black">
                  {slide.isProduct ? (
                     <div className="absolute inset-0 bg-gradient-to-br from-[#EFEAE4] to-[#fcfcfb] flex items-start md:items-center justify-center md:justify-start md:pl-[15%] pt-24 md:pt-0">
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                          animate={{ 
                            opacity: isActive ? 1 : 0, 
                            scale: isActive ? 1 : 0.8,
                            rotate: isActive ? 0 : -5
                          }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          style={{ willChange: "transform, opacity", WebkitTransform: "translateZ(0)" }}
                          className={`max-h-[45%] md:max-h-[70%] max-w-[80%] z-10 transition-transform duration-700 hover:-translate-y-4 hover:rotate-3 animate-float flex justify-center h-full w-full relative`}
                        >
                          <Image
                            src={slide.image}
                            alt={slide.title || "Product"}
                            fill
                            priority
                            sizes="(max-width: 768px) 80vw, 50vw"
                            className="object-contain drop-shadow-2xl"
                          />
                        </motion.div>
                        <div className="absolute top-[30%] md:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[60vw] md:h-[60vw] max-w-[600px] max-h-[600px] bg-[radial-gradient(circle_at_center,theme(colors.white/60%)_0%,transparent_70%)] rounded-full z-0 pointer-events-none" />
                     </div>
                  ) : (
                    <>
                      <motion.div
                        initial={{ scale: 1.15 }}
                        animate={{ scale: isActive ? 1 : 1.15 }}
                        transition={{ duration: 8, ease: "linear" }}
                        style={{ willChange: "transform", WebkitTransform: "translateZ(0)" }}
                        className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'opacity-0'}`}
                      >
                        <Image
                          src={slide.image}
                          alt={slide.title || "Hero"}
                          fill
                          priority
                          sizes="100vw"
                          className={`object-cover ${slide.imgClass || ''}`}
                        />
                      </motion.div>
                      {/* Global dark gradient overlays to increase contrast and premium feel */}
                      <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 via-black/40 md:via-black/20 to-transparent z-10 pointer-events-none" />
                      <div className="absolute inset-0 bg-black/20 md:bg-black/30 z-10 pointer-events-none" />
                    </>
                  )}
                </div>

                {/* Floating Glassmorphic Content Panel */}
                <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 w-full mt-auto mb-20 md:my-auto">
                  <div className={`flex justify-center ${slide.align === 'right' ? 'md:justify-end' : 'md:justify-start'}`}>
                    <motion.div
                      initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                      animate={{ 
                        opacity: isActive ? 1 : 0, 
                        y: isActive ? 0 : 40,
                        filter: isActive ? "blur(0px)" : "blur(10px)"
                      }}
                      transition={{ duration: 1.2, delay: 0.4, ease: [0.25, 0.4, 0, 1] }}
                      style={{ willChange: "transform, opacity, filter", WebkitTransform: "translateZ(0)" }}
                      className={`w-full max-w-[95%] sm:max-w-lg md:max-w-xl p-6 sm:p-8 md:p-14 rounded-[2rem] relative overflow-hidden group ${slide.isProduct ? 'bg-black/80 text-white backdrop-blur-2xl border border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.3)]' : 'bg-black/50 md:bg-black/40 backdrop-blur-xl md:backdrop-blur-2xl border border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.5)]'}`}
                    >
                      {/* Subtle animated gradient inside the card to give a glossy effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

                      <motion.p 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -20 }}
                        transition={{ duration: 0.8, delay: 1.0 }}
                        className="text-white/80 md:text-white/70 uppercase tracking-[0.3em] md:tracking-[0.4em] text-[0.65rem] md:text-sm font-semibold mb-4 md:mb-5 flex items-center gap-3"
                      >
                        <span className="w-6 md:w-8 h-[1px] bg-white/50 inline-block"></span>
                        {slide.tagline}
                      </motion.p>
                      
                      <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                        transition={{ duration: 0.8, delay: 1.2 }}
                        className="text-4xl sm:text-5xl md:text-7xl font-light text-white mb-4 md:mb-6 leading-[1.1] drop-shadow-md whitespace-pre-line tracking-tight"
                      >
                        {slide.title}
                      </motion.h1>

                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isActive ? 1 : 0 }}
                        transition={{ duration: 0.8, delay: 1.4 }}
                        className="text-white/70 md:text-white/60 text-sm md:text-lg mb-8 md:mb-10 font-light leading-relaxed max-w-md"
                      >
                        {slide.description}
                      </motion.p>
                      
                      <motion.button 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                        transition={{ duration: 0.8, delay: 1.6 }}
                        className="relative overflow-hidden w-full md:w-auto px-8 md:px-10 py-3.5 md:py-4 bg-white/90 text-black rounded-full hover:bg-white transition-all duration-500 font-medium tracking-wider text-xs md:text-sm shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_50px_rgba(255,255,255,0.3)] md:hover:scale-105"
                      >
                        <span className="relative z-10">{slide.cta}</span>
                      </motion.button>
                    </motion.div>
                  </div>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Modern Minimal Navigation Arrows */}
      <div className="hero-prev absolute left-4 md:left-10 top-1/2 -translate-y-1/2 z-30 cursor-pointer group hidden md:flex hover:scale-110 transition-transform">
        <div className="w-14 h-14 flex items-center justify-center rounded-full bg-black/20 backdrop-blur-xl border border-white/10 text-white/70 group-hover:bg-white/10 group-hover:text-white transition-all duration-500 shadow-[0_0_20px_rgba(0,0,0,0.3)]">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="transform group-hover:-translate-x-1 transition-transform duration-300">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </div>
      </div>

      <div className="hero-next absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-30 cursor-pointer group hidden md:flex hover:scale-110 transition-transform">
        <div className="w-14 h-14 flex items-center justify-center rounded-full bg-black/20 backdrop-blur-xl border border-white/10 text-white/70 group-hover:bg-white/10 group-hover:text-white transition-all duration-500 shadow-[0_0_20px_rgba(0,0,0,0.3)]">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="transform group-hover:translate-x-1 transition-transform duration-300">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      {/* Custom Pagination Container */}
      <div className="hero-pagination absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-30 flex gap-3"></div>

      {/* Global styles for pagination bullets to make them look like sleek dashes */}

    </section>
  );
}
