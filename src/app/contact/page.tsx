"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion, Variants } from "framer-motion";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;

    const data = {
      name: form[0].value,
      email: form[1].value,
      message: form[2].value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        setSuccess(true);
        form.reset();
        setTimeout(() => setSuccess(false), 5000);
      } else {
        alert(result.error || "Something went wrong");
      }
    } catch (error) {
      alert("Server error. Try again.");
    }

    setLoading(false);
  };

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background text-gray-900 pt-32 pb-24 relative overflow-hidden">
        
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] -z-10 -translate-y-1/2 translate-x-1/3" />
        
        <div className="max-w-6xl mx-auto px-6">
          
          {/* HEADER */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center md:text-left mb-16 md:mb-24"
          >
            <motion.p variants={fadeInUp} className="text-accent tracking-[0.2em] font-medium text-sm mb-4 uppercase">
              Get In Touch
            </motion.p>
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl font-light tracking-tight mb-6">
              Contact Us
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-gray-500 text-lg md:text-xl font-light max-w-2xl">
              Have questions regarding formulations, routines, or support? We're here to assist you on your journey.
            </motion.p>
          </motion.div>

          {/* GRID */}
          <div className="grid md:grid-cols-12 gap-16 lg:gap-24">
            
            {/* LEFT - INFO */}
            <motion.div 
               initial="hidden"
               animate="visible"
               variants={staggerContainer}
               className="md:col-span-5 space-y-10"
            >
              <motion.div variants={fadeInUp}>
                <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-gray-400 mb-3">Email Inquiries</h3>
                <a href="mailto:support@beownedskin.co" className="text-xl font-light text-gray-900 hover:text-accent transition-colors">support@beownedskin.co</a>
              </motion.div>

              <motion.div variants={fadeInUp} className="h-px bg-gray-200 w-12" />

              <motion.div variants={fadeInUp}>
                <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-gray-400 mb-3">Direct Line</h3>
                <p className="text-xl font-light text-gray-900">+91 98765 43210</p>
              </motion.div>
              
              <motion.div variants={fadeInUp} className="h-px bg-gray-200 w-12" />

              <motion.div variants={fadeInUp}>
                <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-gray-400 mb-3">Operating Hours</h3>
                <p className="text-xl font-light text-gray-900">Mon - Sat, 10:00 AM - 7:00 PM</p>
                <p className="text-sm font-light text-gray-500 mt-2">We typically reply within 24 hours.</p>
              </motion.div>
            </motion.div>

            {/* RIGHT - FORM */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="md:col-span-7 bg-white/60 backdrop-blur-xl border border-gray-100 p-8 md:p-12 rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)]"
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                   <label className="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-2 ml-1">Full Name</label>
                   <input
                     type="text"
                     placeholder="Jane Doe"
                     required
                     className="w-full px-5 py-4 text-sm border-b border-gray-300 bg-transparent focus:border-accent text-gray-900 placeholder-gray-300 focus:outline-none transition-colors"
                   />
                </div>

                <div>
                   <label className="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-2 ml-1">Email Address</label>
                   <input
                     type="email"
                     placeholder="jane@example.com"
                     required
                     className="w-full px-5 py-4 text-sm border-b border-gray-300 bg-transparent focus:border-accent text-gray-900 placeholder-gray-300 focus:outline-none transition-colors"
                   />
                </div>

                <div>
                   <label className="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-2 ml-1">Your Message</label>
                   <textarea
                     placeholder="How can we assist you?"
                     required
                     rows={4}
                     className="w-full px-5 py-4 text-sm border-b border-gray-300 bg-transparent focus:border-accent text-gray-900 placeholder-gray-300 focus:outline-none transition-colors resize-none"
                   />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading || success}
                    className="w-full py-4 rounded-full bg-black text-white font-medium tracking-widest uppercase text-sm hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-xl"
                  >
                    {loading ? "Transmitting..." : success ? "Delivered ✓" : "Send Inquiry"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}