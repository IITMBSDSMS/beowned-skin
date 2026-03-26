"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [placeholder, setPlaceholder] = useState("");
  const fullText = "Search premium skincare...";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setPlaceholder(fullText.slice(0, i + 1));
      i++;
      if (i === fullText.length) clearInterval(interval);
    }, 60);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getUser();
  }, []);

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full z-50 transition-all duration-300 bg-white/60 backdrop-blur-2xl border-b border-white/30 shadow-[0_4px_30px_rgba(0,0,0,0.03)]"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">

          {/* LOGO */}
          <Link href="/">
            <h1 className="tracking-[0.2em] font-light text-xl hover:text-accent transition-colors duration-300">
              BE-OWNED SKIN
            </h1>
          </Link>

          {/* SEARCH BAR */}
          <div className="hidden md:flex flex-1 max-w-sm ml-8 relative group">
            <input
              type="text"
              placeholder={placeholder}
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-200 bg-white/40 backdrop-blur-md focus:outline-none focus:ring-1 focus:ring-accent transition-all duration-300 text-sm placeholder:text-gray-400 group-hover:border-accent/40 shadow-inner"
            />
            <svg className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z" />
            </svg>
          </div>

          {/* NAV LINKS */}
          <div className="hidden md:flex items-center gap-10 text-[12px] uppercase tracking-widest font-medium text-gray-500">
            <Link href="/shop" className="hover:text-accent transition-colors duration-300 py-2 relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[1px] after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full">Shop</Link>
            <Link href="/about" className="hover:text-accent transition-colors duration-300 py-2 relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[1px] after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full">Our Story</Link>
            <Link href="/contact" className="hover:text-accent transition-colors duration-300 py-2 relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[1px] after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full">Contact</Link>
            <Link href="/beowned-ai" className="text-accent py-2 relative overflow-hidden group border border-accent rounded-full px-5 hover:text-white transition-colors duration-300">
               <span className="relative z-10 transition-colors">AI SKIN TEST</span>
               <div className="absolute inset-0 bg-accent translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 z-0" />
            </Link>
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-5">
            {/* HAMBURGER */}
            <button
              className="md:hidden text-2xl p-2 rounded-full hover:bg-gray-100 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 7h16M4 12h16M4 17h16"/>
              </svg>
            </button>

            {/* USER / SIGN IN */}
            {user ? (
              <button
                onClick={() => router.push("/profile")}
                className="flex items-center gap-2 relative group"
              >
                <div className="w-9 h-9 p-[2px] rounded-full border border-gray-200 group-hover:border-accent transition-colors">
                  <img
                    src={user.user_metadata?.avatar_url || "https://ui-avatars.com/api/?name=User"}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = "https://ui-avatars.com/api/?name=User";
                    }}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </button>
            ) : (
              <button
                onClick={() => router.push("/login")}
                className="hover:text-accent p-2 transition-colors duration-300"
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2m8-10a4 4 0 100-8 4 4 0 000 8z" />
                </svg>
              </button>
            )}

            {/* CART */}
            <button
              onClick={() => router.push("/shop")}
              className="relative p-2 hover:text-accent transition-colors duration-300 group"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="absolute top-1.5 right-1 w-2 h-2 bg-accent rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"/>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-[80%] max-w-sm bg-white z-50 shadow-2xl p-8 flex flex-col pt-24"
            >
              <div className="absolute top-6 right-6">
                <button onClick={() => setMenuOpen(false)} className="p-2 text-3xl font-light hover:text-accent transition">×</button>
              </div>
              <div className="flex flex-col gap-8 text-lg tracking-widest font-light">
                <Link href="/shop" onClick={() => setMenuOpen(false)} className="hover:text-accent transition">SHOP</Link>
                <div className="h-px bg-gray-100" />
                <Link href="/about" onClick={() => setMenuOpen(false)} className="hover:text-accent transition">OUR STORY</Link>
                <div className="h-px bg-gray-100" />
                <Link href="/contact" onClick={() => setMenuOpen(false)} className="hover:text-accent transition">CONTACT</Link>
                <div className="h-px bg-gray-100" />
                <Link href="/beowned-ai" onClick={() => setMenuOpen(false)} className="text-accent font-medium">AI SKIN TEST</Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}