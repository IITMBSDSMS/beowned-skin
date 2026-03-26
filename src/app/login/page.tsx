"use client";

import { supabase } from "../../lib/supabase";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Login() {
  const handleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });
      if (error) throw error;
    } catch (err: any) {
      console.error("Login error:", err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden px-6">
      
      {/* Subtle Background Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[150px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px] pointer-events-none translate-y-1/2 -translate-x-1/2" />

      {/* Login Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 bg-white/80 backdrop-blur-2xl border border-gray-100 rounded-[2rem] p-10 md:p-14 w-full max-w-md shadow-[0_20px_60px_rgba(0,0,0,0.03)] text-center"
      >
        
        {/* Logo Return */}
        <div className="absolute top-8 left-8">
           <Link href="/">
              <button className="flex items-center gap-2 text-gray-400 hover:text-gray-900 transition-colors group">
                 <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" className="group-hover:-translate-x-1 transition-transform" />
                 </svg>
              </button>
           </Link>
        </div>

        {/* Branding */}
        <div className="flex justify-center mb-10 mt-6">
          <div className="w-14 h-14 rounded-full bg-accent/10 border border-accent/20 text-accent flex items-center justify-center text-xl italic font-light">
            B
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-light text-gray-900 mb-3 tracking-tight">
          Welcome Back
        </h1>
        <p className="text-gray-500 font-light text-sm mb-12">
          Securely authenticate to access your personal dashboard and tailored routines.
        </p>

        {/* Action Button */}
        <button
          onClick={handleLogin}
          className="w-full flex items-center justify-center gap-4 bg-white border border-gray-200 text-gray-900 hover:bg-gray-50 font-medium tracking-wide py-3.5 rounded-xl transition-all duration-300 shadow-[0_4px_14px_rgba(0,0,0,0.03)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.06)] active:scale-95"
        >
          {/* Minimal Google SVG */}
          <svg width="18" height="18" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.1 29.3 35 24 35c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C33.6 4.5 29.1 3 24 3 12.9 3 4 11.9 4 23s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-4z" />
            <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 16 18.9 13 24 13c3 0 5.7 1.1 7.8 2.9l5.7-5.7C33.6 4.5 29.1 3 24 3 16.1 3 9.2 7.6 6.3 14.7z" />
            <path fill="#4CAF50" d="M24 43c5.2 0 9.9-2 13.4-5.3l-6.2-5.1C29.2 34.5 26.8 35 24 35c-5.3 0-9.7-2.9-11.3-7.1l-6.6 5.1C9.2 40.4 16.1 43 24 43z" />
            <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1 3-3.1 5.4-5.8 6.9l6.2 5.1C39.9 36.6 44 30.5 44 23c0-1.3-.1-2.7-.4-4z" />
          </svg>
          Continue with Google
        </button>

        {/* Footer */}
        <p className="text-gray-400 text-xs mt-10 tracking-widest uppercase">
          Enterprise Grade Security
        </p>

      </motion.div>
    </div>
  );
}