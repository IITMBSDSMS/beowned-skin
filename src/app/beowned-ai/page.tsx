"use client";

import { motion } from "framer-motion";

export default function BeOwnedAIPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-[#F5F5F2] to-[#EAD9C5] px-6">
      <div className="max-w-2xl w-full text-center">
        {/* Badge */}
        <div className="mb-6">
          <span className="px-4 py-1 rounded-full text-sm bg-black text-white tracking-wide">
            BEOWNED AI
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
          Your Personal Skin Intelligence System
        </h1>

        {/* Description */}
        <p className="text-gray-600 text-base md:text-lg mb-8 leading-relaxed">
          We are building an AI-powered system that analyzes your skin,
          understands patterns, and recommends personalized skincare routines
          with precision.
        </p>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {["Analyze", "Diagnose", "Optimize"].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-xl p-4 shadow-sm"
            >
              <p className="font-semibold text-gray-800">{step}</p>
            </motion.div>
          ))}
        </div>

        {/* Coming Soon */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white px-6 py-3 rounded-full inline-block shadow-lg"
        >
          🚀 Coming Soon
        </motion.div>

        {/* Subtext */}
        <p className="mt-6 text-sm text-gray-500">
          We're building something powerful. Stay tuned.
        </p>
      </div>
    </div>
  );
}