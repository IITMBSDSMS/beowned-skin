"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion, Variants } from "framer-motion";

export default function AboutPage() {
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background text-gray-900 pt-32 pb-24 overflow-hidden">
        
        {/* HERO SECTION */}
        <section className="px-6 md:px-20 py-16 md:py-24 max-w-7xl mx-auto flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-10 w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center border border-accent/20"
          >
             <span className="text-3xl font-light text-accent italic">B</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-7xl font-light mb-8 tracking-[0.1em] uppercase text-gray-900"
          >
            Be-Owned <br className="hidden md:block"/> Skin
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-2xl font-light text-gray-500 max-w-3xl leading-relaxed"
          >
            Skincare today is noisy, confusing, and often built on trends rather than truth. At Be-Owned Skin, we exist to change that.
          </motion.p>
        </section>

        {/* INTRO STATEMENT */}
        <section className="px-6 md:px-20 py-20 bg-white border-y border-gray-100 flex justify-center text-center">
          <motion.p 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-gray-500 max-w-4xl text-xl md:text-3xl font-light leading-relaxed tracking-wide"
          >
            We are not just a skincare brand. <br className="hidden md:block mb-4"/>
            <span className="text-gray-900 font-normal">We are a data-driven skin intelligence system</span> designed to help individuals confidently understand, track, and optimize their skin with precision.
          </motion.p>
        </section>

        {/* PHILOSOPHY GRID */}
        <section className="px-6 md:px-20 py-24 md:py-32 max-w-7xl mx-auto relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] h-[600px] bg-accent/5 rounded-full blur-[100px] -z-10" />

          <motion.div 
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true }}
             variants={staggerContainer}
             className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-xs uppercase tracking-[0.3em] font-semibold text-accent mb-4">Our Philosophy</motion.h2>
            <motion.p variants={fadeInUp} className="text-3xl md:text-5xl font-light text-gray-900 tracking-tight">Skincare is not random. <br/> It’s data.</motion.p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              { id: "01", title: "Scientific Understanding", desc: "Rooted deeply in foundational dermatological principles, prioritizing efficacy over fads." },
              { id: "02", title: "Personalization", desc: "There are no one-size-fits-all routines. Your skin is entirely unique." },
              { id: "03", title: "Consistency", desc: "True, lasting results come from structured, disciplined daily execution." },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeInUp} className="p-10 bg-white/60 backdrop-blur-xl rounded-[2rem] border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:-translate-y-2 transition-transform duration-500">
                <p className="text-accent font-light text-3xl mb-6">{item.id}</p>
                <h3 className="text-xl font-medium text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-500 font-light leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* APPROACH SECTION START */}
        <section className="px-6 md:px-20 py-24 bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto">
             <motion.div 
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
               variants={staggerContainer}
               className="mb-20 text-center md:text-left flex flex-col md:flex-row md:items-end md:justify-between gap-10"
             >
               <div>
                  <motion.h2 variants={fadeInUp} className="text-xs uppercase tracking-[0.3em] font-semibold text-accent mb-4">The Methodology</motion.h2>
                  <motion.p variants={fadeInUp} className="text-3xl md:text-5xl font-light tracking-tight max-w-xl">
                    Most brands sell products. We build protocols.
                  </motion.p>
               </div>
               <motion.div variants={fadeInUp} className="text-gray-400 font-light max-w-sm md:text-right">
                 Embrace a paradigm shift. Moving from disjointed experiments to complete, structured mastery over your skin health.
               </motion.div>
             </motion.div>

             <motion.div 
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
               variants={staggerContainer}
               className="grid md:grid-cols-3 gap-x-8 gap-y-12 border-t border-gray-800 pt-16"
             >
                <motion.div variants={fadeInUp}>
                  <h3 className="text-2xl font-light mb-4">1. Decode</h3>
                  <p className="text-gray-400 font-light leading-relaxed">Map and analyze your unique skin baseline using advanced diagnostics to uncover core needs.</p>
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <h3 className="text-2xl font-light mb-4 text-accent">2. Design</h3>
                  <p className="text-gray-400 font-light leading-relaxed">Formulate meticulous, structured routines built entirely around powerful evidence-based ingredients.</p>
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <h3 className="text-2xl font-light mb-4">3. Optimize</h3>
                  <p className="text-gray-400 font-light leading-relaxed">Continuously track metrics over time, dynamically refining protocols for ever-improving results.</p>
                </motion.div>
             </motion.div>
          </div>
        </section>

        {/* THE NAME */}
        <section className="px-6 md:px-20 py-24 md:py-32 max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeInUp} className="text-xs uppercase tracking-[0.3em] font-semibold text-accent mb-8">The Be-Owned Mindset</motion.h2>
            
            <motion.div variants={fadeInUp} className="space-y-4 text-xl md:text-2xl font-light text-gray-500 mb-12">
               <p>• Take absolute control</p>
               <p>• Understand yourself deeply</p>
               <p>• Build unyielding discipline</p>
            </motion.div>

            <motion.p variants={fadeInUp} className="text-3xl md:text-5xl font-light text-gray-900 tracking-tight leading-tight">
              You don’t just treat your skin—you <span className="italic text-accent">own it</span>.
            </motion.p>
          </motion.div>
        </section>

      </div>
      <Footer />
    </>
  );
}