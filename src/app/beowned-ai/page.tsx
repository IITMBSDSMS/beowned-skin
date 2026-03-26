"use client";

import { motion, Variants } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function BeOwnedAIPage() {
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-[90vh] flex flex-col items-center justify-center bg-background px-6 pt-32 pb-24 relative overflow-hidden">
        
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[800px] max-h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-3xl w-full text-center relative z-10"
        >
          {/* Badge */}
          <motion.div variants={fadeInUp} className="mb-10">
            <span className="px-5 py-1.5 border border-accent/30 rounded-full text-xs uppercase tracking-[0.2em] font-medium text-accent bg-accent/5">
              Future Release
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl font-light text-gray-900 mb-8 tracking-tight">
            Skin Intelligence, <br className="hidden md:block"/> 
            <span className="italic text-gray-400">Perfected</span>
          </motion.h1>

          {/* Description */}
          <motion.p variants={fadeInUp} className="text-gray-500 text-lg md:text-xl mb-16 leading-relaxed max-w-2xl mx-auto font-light">
            We are actively engineering an AI-powered diagnostic system designed to decode your skin's unique topography and formulate hyper-personalized protocols instantly.
          </motion.p>

          {/* Steps */}
          <motion.div variants={fadeInUp} className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              { title: "Capture", desc: "Scan your complex topography securely." },
              { title: "Decode", desc: "AI maps underlying hydration and texture." },
              { title: "curate", desc: "Generate a flawless, targeted protocol." }
            ].map((step, i) => (
              <div
                key={i}
                className="bg-white/60 backdrop-blur-md border border-gray-100 rounded-[2rem] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
              >
                <div className="text-accent text-sm font-semibold tracking-widest uppercase mb-3">0{i+1}</div>
                <h3 className="text-xl font-light text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm font-light text-gray-500">{step.desc}</p>
              </div>
            ))}
          </motion.div>

          {/* Form / Waiting List */}
          <motion.div variants={fadeInUp} className="max-w-md mx-auto">
            <p className="text-xs uppercase tracking-[0.2em] font-semibold text-gray-400 mb-4">Join The Beta List</p>
            <div className="flex bg-white rounded-full p-1.5 border border-gray-200 shadow-sm focus-within:border-accent focus-within:ring-1 focus-within:ring-accent transition-all">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-1 bg-transparent px-4 py-2 text-sm focus:outline-none text-gray-900 placeholder:text-gray-400"
              />
              <button className="bg-black text-white px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest hover:bg-gray-800 transition-colors">
                Request Access
              </button>
            </div>
          </motion.div>

        </motion.div>
      </div>
      <Footer />
    </>
  );
}