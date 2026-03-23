"use client";

import { supabase } from "../../lib/supabase.js";

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-[#1a1a1a] to-[#d4a373] relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-[#d4a373]/30 blur-[120px] rounded-full top-[-100px] left-[-100px]" />
      <div className="absolute w-[400px] h-[400px] bg-[#d4a373]/20 blur-[100px] rounded-full bottom-[-100px] right-[-100px]" />

      {/* Card */}
      <div className="relative z-10 backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-10 w-[90%] max-w-md shadow-2xl text-center">
        
        {/* Logo / SVG */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-[#d4a373] text-black flex items-center justify-center font-bold text-xl">
            B
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-semibold text-white mb-2">
          Welcome Back
        </h1>
        <p className="text-gray-400 mb-8">
          Sign in to continue to Be-Owned Skin
        </p>

        {/* Button */}
        <button
          onClick={handleLogin}
          className="w-full flex items-center justify-center gap-3 bg-[#d4a373] hover:bg-[#c08c5a] text-black font-medium py-3 rounded-xl transition-all duration-300 shadow-lg shadow-indigo-300/50 hover:scale-105"
        >
          {/* Google SVG */}
          <svg width="20" height="20" viewBox="0 0 48 48">
            <path
              fill="#FFC107"
              d="M43.6 20.5H42V20H24v8h11.3C33.7 32.1 29.3 35 24 35c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C33.6 4.5 29.1 3 24 3 12.9 3 4 11.9 4 23s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-4z"
            />
            <path
              fill="#FF3D00"
              d="M6.3 14.7l6.6 4.8C14.5 16 18.9 13 24 13c3 0 5.7 1.1 7.8 2.9l5.7-5.7C33.6 4.5 29.1 3 24 3 16.1 3 9.2 7.6 6.3 14.7z"
            />
            <path
              fill="#4CAF50"
              d="M24 43c5.2 0 9.9-2 13.4-5.3l-6.2-5.1C29.2 34.5 26.8 35 24 35c-5.3 0-9.7-2.9-11.3-7.1l-6.6 5.1C9.2 40.4 16.1 43 24 43z"
            />
            <path
              fill="#1976D2"
              d="M43.6 20.5H42V20H24v8h11.3c-1 3-3.1 5.4-5.8 6.9l6.2 5.1C39.9 36.6 44 30.5 44 23c0-1.3-.1-2.7-.4-4z"
            />
          </svg>

          Login with Google
        </button>

        {/* Footer */}
        <p className="text-gray-500 text-sm mt-6">
          Secure authentication powered by Google
        </p>
      </div>
    </div>
  );
}