"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [placeholder, setPlaceholder] = useState("");
  const fullText = "Search products...";
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setPlaceholder(fullText.slice(0, i + 1));
      i++;
      if (i === fullText.length) {
        clearInterval(interval);
      }
    }, 80);
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
    <div className="fixed top-0 w-full z-50 bg-[#F5F5F2]/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between gap-6">

        {/* LOGO */}
        <h1 className="tracking-widest font-semibold text-lg">
          BE-OWNED SKIN
        </h1>

        {/* SEARCH BAR */}
        <div className="hidden md:flex flex-1 max-w-md">
          <input
            type="text"
            placeholder={placeholder}
            className="w-full px-4 py-2 rounded-full border border-gray-300 bg-white/70 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-[#BFA37A]"
          />
        </div>

        {/* NAV LINKS */}
        <div className="hidden md:flex gap-8 text-sm">
          <Link href="/shop" className="hover:text-[#BFA37A] transition">Shop</Link>
          <Link href="/about" className="hover:text-[#BFA37A] transition">About</Link>
          <Link href="/contact" className="hover:text-[#BFA37A] transition">Contact</Link>
          <Link href="/beowned-ai" className="text-[#BFA37A] font-semibold">AI</Link>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-4">

          {/* HAMBURGER */}
          <button
            className="md:hidden text-xl p-2 rounded-lg active:scale-95 transition"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

          {/* USER / LOGIN */}
          {user ? (
            <button
              onClick={() => router.push("/profile")}
              className="flex items-center gap-2 hover:scale-110 transition"
            >
              <img
                src={user.user_metadata?.avatar_url || "https://ui-avatars.com/api/?name=User"}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "https://ui-avatars.com/api/?name=User";
                }}
                className="w-8 h-8 rounded-full object-cover"
              />
            </button>
          ) : (
            <button
              onClick={() => router.push("/login")}
              className="hover:scale-110 active:scale-95 p-2 rounded-lg transition"
            >
              <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z"/>
              </svg>
            </button>
          )}

          {/* CART */}
          <button
            onClick={() => router.push("/shop")}
            className="hover:scale-110 active:scale-95 p-2 rounded-lg transition"
          >
            <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7 4h-2l-1 2h2l3.6 7.59-1.35 2.44C7.16 16.37 7 16.68 7 17a2 2 0 002 2h12v-2H9.42c-.14 0-.25-.11-.25-.25l.03-.12L10.1 15h7.45a2 2 0 001.79-1.11l3.58-7.16A1 1 0 0022 5H6.21l-.94-2zM7 20a2 2 0 100 4 2 2 0 000-4zm10 0a2 2 0 100 4 2 2 0 000-4z"/>
            </svg>
          </button>

        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/30 z-40 pointer-events-auto"
            onClick={() => setMenuOpen(false)}
          />
          <div className="md:hidden relative z-50 bg-white border-t border-gray-200 px-6 py-6 space-y-5 animate-[fadeIn_0.3s_ease]">
            <Link href="/shop" className="block py-3 text-lg active:scale-95 transition">Shop</Link>
            <Link href="/about" className="block py-3 text-lg active:scale-95 transition">About</Link>
            <Link href="/contact" className="block py-3 text-lg active:scale-95 transition">Contact</Link>
            <Link href="/beowned-ai" className="block py-3 text-lg text-[#BFA37A] font-semibold">AI Skin Test</Link>
          </div>
        </>
      )}

    </div>
  );
}