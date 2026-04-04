"use client";
import Navbar from "./components/Navbar";
import HeroSlider from "./components/HeroSlider";
import Footer from "./components/Footer";

import { supabase } from "@/lib/supabase";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, Variants } from "framer-motion";

export default function Home() {
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  const [slider, setSlider] = useState(50);
  const [media, setMedia] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);

  useEffect(() => {
    fetchMedia();
    fetchTestimonials();
  }, []);

  const fetchMedia = async () => {
    const { data } = await supabase.from("media").select("*");
    setMedia(data || []);
  };

  const fetchTestimonials = async () => {
    const { data } = await supabase.from("testimonials").select("*");
    setTestimonials(data || []);
  };

  const requireAuth = async () => {
    const { data } = await supabase.auth.getUser();
    if (!data.user) {
      router.push("/login");
      return false;
    }
    return true;
  };

  // Animation variants
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };
  
  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  return (
    <main className="bg-background text-foreground selection:bg-primary/30 selection:text-white font-inter">
      
      <Navbar />
      <HeroSlider />

      {/* --- HERO PRODUCT FEATURE --- */}
      <section className="max-w-7xl mx-auto px-6 py-24 md:py-36 grid md:grid-cols-2 gap-16 md:gap-24 items-center">
        
        {/* LEFT - PRODUCT IMAGE */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex justify-center relative"
        >
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-[100px] z-0" />
          <motion.img
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            src="/images/product.png"
            alt="Niacinamide Serum"
            className="w-[280px] md:w-[480px] drop-shadow-2xl z-10"
          />
        </motion.div>

        {/* RIGHT - PRODUCT INFO */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.p variants={fadeInUp} className="text-primary tracking-[0.2em] font-medium text-sm mb-4 uppercase">
            The Essentials Collection
          </motion.p>
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl font-poppins font-bold mb-8 tracking-tight leading-tight text-foreground">
            Niacinamide 10% <br/> Serum
          </motion.h2>

          <motion.p variants={fadeInUp} className="text-foreground/70 mb-8 text-lg font-medium leading-relaxed max-w-md">
            A lightweight, active-rich formula designed to seamlessly regulate oil production, powerfully strengthen the delicate skin barrier, and instantly soothe redness.
          </motion.p>

          <motion.div variants={fadeInUp} className="mb-10 space-y-4 text-foreground/80 font-medium tracking-wide">
            <div className="flex items-center gap-3"><span className="text-primary text-xl">✦</span> Controls excess oil & refines pores</div>
            <div className="flex items-center gap-3"><span className="text-primary text-xl">✦</span> Improves overall skin texture</div>
            <div className="flex items-center gap-3"><span className="text-primary text-xl">✦</span> Instantly reduces redness</div>
          </motion.div>

          <motion.div variants={fadeInUp} className="flex items-center gap-8">
            <span className="text-3xl font-poppins font-bold tracking-tight text-foreground">₹699</span>
            <button
              onClick={async () => {
                const ok = await requireAuth();
                if (!ok) return;
                router.push("/shop");
              }}
              className="px-10 py-4 bg-primary text-white rounded-full shadow-lg hover:bg-orange-600 transition-all duration-300 font-bold tracking-wide hover:-translate-y-1 hover:shadow-primary/30"
            >
              Add to Edit
            </button>
          </motion.div>
        </motion.div>

      </section>

      {/* --- BENEFITS SECTION --- */}
      <section className="bg-background py-24 md:py-32 border-y border-foreground/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-poppins font-bold mb-16 tracking-tight text-foreground"
          >
            Why Your Skin Craves This
          </motion.h2>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid md:grid-cols-3 gap-8 md:gap-12"
          >
            {[
              { title: "Oil Control", desc: "Helps powerfully regulate excess sebum and keeps skin perfectly balanced.", icon: "M12 2C12 2 6 9 6 13a6 6 0 0012 0c0-4-6-11-6-11z" },
              { title: "Barrier Strength", desc: "Deeply supports and revitalizes the skin barrier for healthier resilience.", icon: "M12 2l8 4v6c0 5.25-3.5 10-8 12-4.5-2-8-6.75-8-12V6l8-4z" },
              { title: "Even Texture", desc: "Visibly improves skin texture and masterfully reduces redness over time.", icon: "M12 3l2.5 5 5.5.5-4 3.5 1.5 5.5-5-3-5 3 1.5-5.5-4-3.5 5.5-.5L12 3z" }
            ].map((feature, i) => (
              <motion.div 
                key={i} 
                variants={fadeInUp}
                className="group glass p-10 rounded-2xl hover:-translate-y-2 transition-all duration-500"
              >
                <div className="w-16 h-16 mx-auto bg-pink-light rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-pink-light/80 transition-all duration-500">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-pink-accent">
                    <path d={feature.icon} />
                  </svg>
                </div>
                <h3 className="text-xl mb-3 font-poppins font-bold text-foreground tracking-wide">{feature.title}</h3>
                <p className="text-foreground/70 font-medium leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* --- INGREDIENTS SPOTLIGHT --- */}
      <section className="max-w-7xl mx-auto px-6 py-24 md:py-36 grid md:grid-cols-2 gap-16 md:gap-24 items-center">
        
        {/* LEFT - FLOATING PRODUCT EXPERENCE */}
        <motion.div
           initial={{ opacity: 0, x: -50 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1 }}
           className="relative flex justify-center group"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-bg to-transparent w-full h-[500px] rounded-full blur-[80px] -z-10" />
          <motion.img
            src="/images/product.png"
            alt="product overlay"
            className="w-[200px] md:w-[380px] drop-shadow-lg transition-transform duration-700 group-hover:scale-105"
          />
        </motion.div>

        {/* RIGHT - INGREDIENTS */}
        <motion.div
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true }}
           variants={staggerContainer}
        >
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-poppins font-bold mb-10 tracking-tight leading-tight text-foreground">
            Powered by Elements <br/> That Innovate
          </motion.h2>

          <div className="space-y-8">
            {[
              { name: "Niacinamide 10%", desc: "Dramatically controls oil & refines pores." },
              { name: "Zinc Complex", desc: "Instantly reduces inflammation & redness." },
              { name: "Barrier Matrix", desc: "Defends & deeply strengthens skin integrity." }
            ].map((item, i) => (
              <motion.div key={i} variants={fadeInUp} className="flex gap-4 items-start border-b border-foreground/10 pb-6">
                <div className="mt-1 text-blue-accent bg-blue-bg p-2 rounded-full">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-poppins font-bold tracking-wide text-foreground mb-1">{item.name}</h4>
                  <p className="text-foreground/70 font-medium">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </section>

      {/* --- AI SKIN SCANNER SECTION --- */}
      <section className="relative py-24 md:py-36 overflow-hidden bg-[#09090b] text-white">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-primary/20 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-primary tracking-[0.3em] font-medium text-sm mb-4 uppercase">Advanced Diagnostics</p>
            <h2 className="text-4xl md:text-6xl font-poppins font-bold mb-6 tracking-tight">
              Visualize Your Glow
            </h2>
            <p className="text-gray-400 mb-12 max-w-xl mx-auto font-medium text-lg">
              Upload or discreetly capture your skin to witness the instant transformation powered by our curated formulation insights.
            </p>
          </motion.div>

          {!image ? (
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="flex flex-col items-center gap-6"
            >
              <label className="relative group cursor-pointer">
                <div className="absolute -inset-1 rounded-2xl blur-md bg-gradient-to-r from-primary to-[#d8c3a1] opacity-60 group-hover:opacity-100 transition duration-500" />
                <div className="relative px-10 py-5 bg-[#111] text-white rounded-2xl flex items-center gap-3">
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="font-medium tracking-wide">Upload & Scan Now</span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={async (e) => {
                    const ok = await requireAuth();
                    if (!ok) return;

                    const file = e.target.files?.[0];
                    if (file) {
                      setImage(URL.createObjectURL(file));
                    }
                  }}
                  className="hidden"
                />
              </label>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative w-full max-w-3xl mx-auto overflow-hidden rounded-3xl border border-white/20 shadow-[0_0_50px_rgba(255,255,255,0.1)]"
            >
              {/* AFTER IMAGE (Brightened via filter) */}
              <img
                src={image}
                className="w-full aspect-[4/3] object-cover brightness-[1.15] contrast-[1.05] saturate-[1.1] filter"
                alt="After"
              />

              {/* BEFORE IMAGE (Original) */}
              <div
                className="absolute top-0 left-0 h-full overflow-hidden border-r-[3px] border-primary"
                style={{ width: `${slider}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-lg transform translate-x-1/2 -mx-1 pointer-events-none z-10">
                   <div className="w-1.5 h-1.5 bg-white rounded-full" />
                </div>
                <img
                  src={image}
                  className="absolute top-0 left-0 h-full w-[100vw] max-w-[48rem] object-cover"
                  style={{ width: "100%", maxWidth: "none", minWidth: "100%", clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
                  alt="Before"
                />
              </div>

              {/* SLIDER CONTROLLER */}
              <input
                type="range"
                min="0"
                max="100"
                value={slider}
                onChange={(e) => setSlider(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
              />
              
              <div className="absolute top-4 left-6 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider border border-white/10 z-30 pointer-events-none">
                BEFORE
              </div>
              <div className="absolute top-4 right-6 bg-primary/90 text-white px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider shadow-lg z-30 pointer-events-none">
                AFTER 14 DAYS
              </div>

            </motion.div>
          )}
        </div>
      </section>

      {/* --- COMMUNITY REELS --- */}
      <section className="py-24 md:py-36 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-poppins font-bold mb-16 text-center tracking-tight text-foreground"
          >
            The Be-Owned Routine in Action
          </motion.h2>

          <Swiper
            spaceBetween={24}
            grabCursor={true}
            slidesPerView={1.2}
            breakpoints={{
              640: { slidesPerView: 2.2 },
              1024: { slidesPerView: 3.2 }
            }}
            className="pb-12 px-4!"
          >
            {media.filter((m: any) => m.type === "video").map((m: any, i) => (
              <SwiperSlide key={m.id || i}>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative rounded-[2rem] overflow-hidden shadow-[0_10px_30px_rgb(0,0,0,0.05)] group aspect-[3/4]"
                >
                  <video
                    src={m.image}
                    muted
                    autoPlay
                    loop
                    playsInline
                    controls={false}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-white font-medium mb-1 drop-shadow-md">Unfiltered Results</p>
                    <p className="text-white/80 text-sm font-light drop-shadow-md">Daily application over 4 weeks</p>
                  </div>
                  
                  {/* Play icon overlay on hover */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                     <svg width="24" height="24" fill="white" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
            {media.filter((m: any) => m.type === "video").length === 0 && (
              <div className="flex justify-center items-center h-64 border border-dashed border-gray-300 rounded-3xl">
                <p className="text-gray-400 font-light tracking-wide">Community reels updating shortly...</p>
              </div>
            )}
          </Swiper>
        </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      <section className="py-24 md:py-36 bg-background overflow-hidden relative border-y border-foreground/5">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-primary tracking-[0.2em] font-medium text-sm mb-4 uppercase"
          >
            Voices of Trust
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-poppins font-bold mb-16 tracking-tight text-foreground"
          >
            What They Say
          </motion.h2>

          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop
            className="max-w-4xl mx-auto"
          >
            {testimonials.length > 0 ? testimonials.map((t: any, i) => (
              <SwiperSlide key={t.id || i}>
                <div className="px-4 py-8">
                   <div className="glass shadow-[0_8px_40px_rgba(0,0,0,0.03)] p-12 md:p-16 rounded-2xl text-center transition-all duration-300">
                     <div className="text-primary/40 mb-8 inline-block">
                        <svg width="48" height="48" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
                     </div>
                     <p className="text-foreground/80 mb-8 text-xl md:text-2xl font-medium leading-relaxed italic">
                       "{t.message}"
                     </p>
                     <p className="text-sm text-foreground font-bold tracking-widest uppercase">
                       {t.name} <span className="text-primary ml-2">Verified Purchase</span>
                     </p>
                   </div>
                </div>
              </SwiperSlide>
            )) : (
              <SwiperSlide>
                <div className="px-4 py-8">
                   <div className="glass p-12 md:p-16 rounded-2xl text-center">
                     <p className="text-foreground/80 font-medium italic text-xl">"A transformative addition to my minimalist routine. The texture is divine and the results speak for themselves."</p>
                     <p className="mt-8 text-sm text-foreground font-bold tracking-widest uppercase">Sarah L.</p>
                   </div>
                </div>
              </SwiperSlide>
            )}
          </Swiper>
        </div>
      </section>

      {/* --- FINAL CTA & APP BANNER --- */}
      <section className="relative overflow-hidden py-24 md:py-36 text-center bg-[#09090b] text-white">
        <div className="absolute inset-0 z-0">
           <div className="absolute inset-0 bg-gradient-to-t from-black via-[#09090b] to-black opacity-80" />
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-primary/20 rounded-full blur-[120px]" />
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl mx-auto px-6"
        >
          <h2 className="text-4xl md:text-6xl font-poppins font-bold mb-8 tracking-tight text-white">
            Unlock Your Deepest Glow
          </h2>
          <p className="text-white/70 mb-12 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
            Take our bespoke AI skin diagnostic and embark on a personalized journey toward transformative skin health.
          </p>
          <button
            onClick={() => router.push("/beowned-ai")}
            className="px-10 py-5 bg-primary text-white rounded-full text-lg font-bold tracking-wide shadow-xl hover:bg-orange-600 hover:-translate-y-1 hover:shadow-primary/30 transition-all duration-300 mb-20"
          >
            Launch Diagnostics
          </button>

          <div className="pt-20 border-t border-white/10">
            <h3 className="text-sm font-bold tracking-[0.2em] text-white/50 uppercase mb-8">
              Experience the App Soon
            </h3>
            
            <div className="flex justify-center gap-6 flex-wrap">
              {/* PLAY STORE */}
              <button className="flex items-center gap-4 bg-black/40 border border-white/10 hover:border-primary hover:bg-white/5 transition-all duration-300 px-8 py-4 rounded-2xl group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700" />
                <svg width="28" height="28" viewBox="0 0 512 512" fill="none">
                  <path d="M325.3 234.3L104.6 13.6C96.5 5.5 82.7 11.3 82.7 22.9V489.1C82.7 500.7 96.5 506.5 104.6 498.4L325.3 277.7C333.3 269.7 333.3 242.3 325.3 234.3Z" fill="#34A853"/>
                </svg>
                <div className="text-left">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">Get it on</p>
                  <p className="text-sm font-medium tracking-wide">Google Play</p>
                </div>
              </button>

              {/* APP STORE */}
              <button className="flex items-center gap-4 bg-black/40 border border-white/10 hover:border-primary hover:bg-white/5 transition-all duration-300 px-8 py-4 rounded-2xl group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700" />
                <svg width="28" height="28" viewBox="0 0 384 512" fill="none">
                  <path d="M318.7 268.7c-.2-48.2 39.4-71.3 41.1-72.3-22.5-32.9-57.6-37.4-70-37.9-29.8-3-58.1 17.5-73.2 17.5-15.1 0-38.4-17.1-63.2-16.6-32.5.5-62.5 18.9-79.2 48-33.8 58.6-8.6 145.5 24.3 192.9 16.1 23.3 35.3 49.4 60.5 48.5 24.3-1 33.5-15.7 62.9-15.7 29.4 0 37.7 15.7 63.4 15.2 26.2-.5 42.8-23.9 58.8-47.3 18.4-26.8 26-52.7 26.4-54.1-.6-.3-50.6-19.4-50.8-77.9z" fill="#fff"/>
                </svg>
                <div className="text-left">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">Download on the</p>
                  <p className="text-sm font-medium tracking-wide">App Store</p>
                </div>
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}