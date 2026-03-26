"use client";

import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

export default function OrderSuccess() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-background px-6 pt-24 pb-20 relative overflow-hidden">
        
        {/* Subtle Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-white/80 backdrop-blur-2xl p-10 md:p-16 rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.04)] text-center max-w-lg w-full border border-gray-100 relative z-10"
        >
          {/* Animated Success Icon via Framer Motion */}
          <div className="mb-10 flex justify-center">
            <motion.div 
               initial={{ scale: 0 }}
               animate={{ scale: 1 }}
               transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
               className="relative"
            >
              <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center border border-green-100 shadow-sm relative z-10">
                <motion.svg
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                  width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </motion.svg>
              </div>
              <motion.div 
                 initial={{ scale: 0.8, opacity: 1 }}
                 animate={{ scale: 1.5, opacity: 0 }}
                 transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 1 }}
                 className="absolute inset-0 border-2 border-green-200 rounded-full z-0" 
              />
            </motion.div>
          </div>

          <h1 className="text-3xl font-light text-gray-900 mb-4 tracking-tight">
            Order Confirmed
          </h1>
          <p className="text-gray-500 font-light leading-relaxed mb-10">
            Thank you for trusting Be-Owned Skin. Your journey to perfect skin is officially underway. We'll email you the tracking details shortly.
          </p>

          <div className="bg-gray-50 rounded-2xl p-6 mb-10 border border-gray-100">
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">Order Reference</p>
            <p className="text-lg font-medium text-gray-900 tracking-wide">#BEO-{Math.floor(Math.random() * 100000)}</p>
          </div>

          <div className="space-y-4">
            <Link
              href="/"
              className="block w-full py-4 text-sm bg-black text-white rounded-full font-medium tracking-widest uppercase hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              Return Home
            </Link>

            <Link
              href="/profile"
              className="block w-full py-4 text-sm border border-gray-200 text-gray-700 rounded-full font-medium tracking-widest uppercase hover:bg-gray-50 hover:border-gray-300 transition-all duration-300"
            >
              View Order Status
            </Link>
          </div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
}