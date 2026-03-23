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

export default function Home() {
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  const [slider, setSlider] = useState(50);
  const [media, setMedia] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);

  useEffect(() => {
    const elements = document.querySelectorAll(".fade-up, .scale-in");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

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

  return (
    <main className="bg-gradient-to-b from-[#F8F7F4] to-[#EFEAE4] text-[#1A1A1A]">
      
      <Navbar />

      <HeroSlider />

      <section className="fade-up max-w-7xl mx-auto px-4 md:px-6 py-20 md:py-32 grid md:grid-cols-2 gap-12 md:gap-20 items-center">

        {/* LEFT - PRODUCT IMAGE */}
        <div className="flex justify-center">
          <img
            src="/images/product.png"
            alt="product"
            className="w-[240px] md:w-[420px] drop-shadow-2xl hover:scale-105 transition duration-500"
          />
        </div>

        {/* RIGHT - PRODUCT INFO */}
        <div className="scale-in">
          <h2 className="text-2xl md:text-5xl font-light mb-6 tracking-tight leading-tight">
            Niacinamide 10% Serum
          </h2>

          <p className="text-gray-600 mb-6 text-lg">
            A lightweight serum designed to regulate oil production,
            strengthen the skin barrier, and reduce redness.
          </p>

          <div className="mb-8 space-y-2 text-gray-700">
            <p>• Controls excess oil</p>
            <p>• Improves skin texture</p>
            <p>• Reduces redness</p>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-2xl font-medium">₹699</span>
            <button
              onClick={async () => {
                const ok = await requireAuth();
                if (!ok) return;
                router.push("/shop");
              }}
              className="px-8 py-4 bg-[#BFA37A] text-white rounded-full shadow-md hover:shadow-xl hover:scale-105 transition duration-300"
            >
              Add to Cart
            </button>
          </div>
        </div>

      </section>

      <section className="fade-up max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24 text-center">

        <h2 className="text-2xl md:text-5xl font-light mb-12 tracking-tight">
          Why Your Skin Needs This
        </h2>

        <div className="grid md:grid-cols-3 gap-12">

          <div className="scale-in hover-lift bg-white/70 backdrop-blur-xl border border-white/40 shadow-sm p-6 rounded-xl">
            <div className="mb-4 flex justify-center">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2C12 2 6 9 6 13a6 6 0 0012 0c0-4-6-11-6-11z" />
              </svg>
            </div>
            <h3 className="text-xl mb-2 font-medium">Oil Control</h3>
            <p className="text-gray-600">
              Helps regulate excess sebum and keeps skin balanced.
            </p>
          </div>

          <div className="scale-in hover-lift bg-white/70 backdrop-blur-xl border border-white/40 shadow-sm p-6 rounded-xl">
            <div className="mb-4 flex justify-center">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2l8 4v6c0 5.25-3.5 10-8 12-4.5-2-8-6.75-8-12V6l8-4z" />
              </svg>
            </div>
            <h3 className="text-xl mb-2 font-medium">Barrier Strength</h3>
            <p className="text-gray-600">
              Supports the skin barrier for healthier, resilient skin.
            </p>
          </div>

          <div className="scale-in hover-lift bg-white/70 backdrop-blur-xl border border-white/40 shadow-sm p-6 rounded-xl">
            <div className="mb-4 flex justify-center">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 3l2.5 5 5.5.5-4 3.5 1.5 5.5-5-3-5 3 1.5-5.5-4-3.5 5.5-.5L12 3z" />
              </svg>
            </div>
            <h3 className="text-xl mb-2 font-medium">Even Texture</h3>
            <p className="text-gray-600">
              Improves skin texture and reduces redness over time.
            </p>
          </div>

        </div>

      </section>

      <section className="fade-up max-w-7xl mx-auto px-4 md:px-6 py-24 md:py-36 grid md:grid-cols-2 gap-16 items-center">

        {/* LEFT - FLOATING PRODUCT */}
        <div
          className="flex justify-center perspective-[1000px]"
          onMouseMove={(e) => {
            const target = e.currentTarget.querySelector("img");
            if (!target) return;

            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const rotateX = ((y / rect.height) - 0.5) * -10;
            const rotateY = ((x / rect.width) - 0.5) * 10;

            target.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
          }}
          onMouseLeave={(e) => {
            const target = e.currentTarget.querySelector("img");
            if (!target) return;
            target.style.transform = "rotateX(0deg) rotateY(0deg)";
          }}
        >
          <img
            src="/images/product.png"
            alt="product"
            className="w-[200px] md:w-[340px] drop-shadow-2xl animate-[float_6s_ease-in-out_infinite] transition-transform duration-300"
          />
        </div>

        {/* RIGHT - INGREDIENTS */}
        <div>
          <h2 className="text-2xl md:text-5xl font-light mb-8 tracking-tight">
            Powered by Ingredients That Work
          </h2>

          <div className="space-y-6 text-lg text-gray-700">
            <p className="animate-[fadeIn_1s_ease_forwards]">Niacinamide 10% → Controls oil</p>
            <p className="animate-[fadeIn_1s_ease_forwards] [animation-delay:0.3s]">Zinc → Reduces inflammation</p>
            <p className="animate-[fadeIn_1s_ease_forwards] [animation-delay:0.6s]">Barrier Complex → Strengthens skin</p>
          </div>
        </div>

      </section>

      {/* SKIN SCANNER SECTION */}
      <section className="fade-up max-w-7xl mx-auto px-4 md:px-6 py-20 md:py-32 text-center">

        <h2 className="text-2xl md:text-5xl font-light mb-6 tracking-tight">
          See The Difference On Your Skin
        </h2>

        <p className="text-gray-600 mb-10">
          Upload or capture your skin and see instant results.
        </p>

        {!image ? (
          <div className="flex flex-col items-center gap-6">
            <label className="px-6 py-4 bg-[#BFA37A] text-white rounded-lg cursor-pointer">
              Upload or Capture Photo
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
          </div>
        ) : (
          <div className="relative w-full max-w-2xl mx-auto overflow-hidden rounded-2xl shadow-xl border border-white/40">

            {/* AFTER IMAGE */}
            <img
              src={image}
              className="w-full h-full object-cover brightness-110 contrast-110 saturate-110"
            />

            {/* BEFORE IMAGE */}
            <div
              className="absolute top-0 left-0 h-full overflow-hidden"
              style={{ width: `${slider}%` }}
            >
              <img
                src={image}
                className="w-full h-full object-cover"
              />
            </div>

            {/* SLIDER */}
            <input
              type="range"
              min="0"
              max="100"
              value={slider}
              onChange={(e) => setSlider(Number(e.target.value))}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 w-3/4"
            />

          </div>
        )}

      </section>

      {/* REAL RESULTS REELS SECTION */}
      <section className="fade-up max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">

        <h2 className="text-2xl md:text-5xl font-light mb-12 text-center tracking-tight">
          Real Results From Our Community
        </h2>

        <Swiper
          spaceBetween={20}
          grabCursor={true}
          slidesPerView={1.2}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
          className="pb-6"
        >
          {media
            .filter((m: any) => m.type === "video")
            .map((m: any) => (
              <SwiperSlide key={m.id}>
                <div className="scale-in relative rounded-2xl overflow-hidden border border-gray-200 shadow-sm group hover-lift">
                  <video
                    src={m.image}
                    muted
                    autoPlay
                    loop
                    playsInline
                    controls
                    onError={() => console.error("Video load failed:", m.image)}
                    className="w-full h-[320px] md:h-[420px] object-cover group-hover:scale-110 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition"></div>
                  <div className="absolute bottom-4 left-4 text-white text-sm opacity-0 group-hover:opacity-100 transition">
                    Real results in 7 days
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
        {media.length === 0 && (
          <p className="text-center text-gray-500 mt-6">
            No reels uploaded yet
          </p>
        )}

      </section>

      <section className="fade-up max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">

        <h2 className="text-2xl md:text-5xl font-light mb-12 text-center tracking-tight">
          What People Are Saying
        </h2>

        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000 }}
          loop
          className="max-w-3xl mx-auto"
        >
          {testimonials.map((t: any) => (
            <SwiperSlide key={t.id}>
              <div className="bg-white/90 backdrop-blur-xl border border-white/40 shadow-md p-10 rounded-2xl text-center transition-all duration-300 hover:shadow-lg">
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                  {t.message}
                </p>
                <span className="text-sm text-gray-500 tracking-wide">
                  — {t.name}
                </span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </section>

      {/* FINAL CTA SECTION */}
      <section className="fade-up max-w-7xl mx-auto px-4 md:px-6 py-20 md:py-32 text-center bg-gradient-to-br from-[#EFEAE4] to-[#F5F5F2]">

        <h2 className="text-2xl md:text-5xl font-light mb-6 tracking-tight">
          Take The Test Of Your Skin
        </h2>

        <p className="text-gray-600 mb-10 max-w-xl mx-auto">
          Discover what your skin truly needs. Get personalized insights and start your journey to healthier skin today.
        </p>

        <button
          onClick={() => router.push("/beowned-ai")}
          className="px-6 md:px-10 py-3 md:py-4 bg-[#BFA37A] text-white rounded-lg text-lg shadow-md hover:shadow-xl hover:scale-105 transition duration-300"
        >
          Start Skin Test
        </button>

      </section>

      {/* APP LAUNCH SECTION */}
      <section className="fade-up max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24 text-center bg-[#EFEAE4]">

        <h2 className="text-2xl md:text-5xl font-light mb-6 tracking-tight">
          Launching Soon
        </h2>

        <p className="text-gray-600 mb-10">
          Experience Beowned Skin on your mobile. Coming soon to your favorite app stores.
        </p>

        <div className="flex justify-center gap-6 flex-wrap">

          {/* PLAY STORE */}
          <div className="flex items-center gap-3 bg-white/80 backdrop-blur-xl border border-white/40 shadow-sm px-6 py-3 rounded-xl hover:scale-105 transition">
            <svg width="28" height="28" viewBox="0 0 512 512" fill="none">
              <path d="M325.3 234.3L104.6 13.6C96.5 5.5 82.7 11.3 82.7 22.9V489.1C82.7 500.7 96.5 506.5 104.6 498.4L325.3 277.7C333.3 269.7 333.3 242.3 325.3 234.3Z" fill="#34A853"/>
            </svg>
            <div className="text-left">
              <p className="text-xs text-gray-500">Get it on</p>
              <p className="text-sm font-medium">Google Play</p>
            </div>
          </div>

          {/* APP STORE */}
          <div className="flex items-center gap-3 bg-white/80 backdrop-blur-xl border border-white/40 shadow-sm px-6 py-3 rounded-xl hover:scale-105 transition">
            <svg width="28" height="28" viewBox="0 0 384 512" fill="none">
              <path d="M318.7 268.7c-.2-48.2 39.4-71.3 41.1-72.3-22.5-32.9-57.6-37.4-70-37.9-29.8-3-58.1 17.5-73.2 17.5-15.1 0-38.4-17.1-63.2-16.6-32.5.5-62.5 18.9-79.2 48-33.8 58.6-8.6 145.5 24.3 192.9 16.1 23.3 35.3 49.4 60.5 48.5 24.3-1 33.5-15.7 62.9-15.7 29.4 0 37.7 15.7 63.4 15.2 26.2-.5 42.8-23.9 58.8-47.3 18.4-26.8 26-52.7 26.4-54.1-.6-.3-50.6-19.4-50.8-77.9z" fill="#000"/>
            </svg>
            <div className="text-left">
              <p className="text-xs text-gray-500">Download on the</p>
              <p className="text-sm font-medium">App Store</p>
            </div>
          </div>

        </div>

      </section>

      <Footer />
    </main>
  );
}