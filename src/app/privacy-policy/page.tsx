"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion, Variants } from "framer-motion";

export default function PrivacyPolicy() {
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#fcfcfb] text-gray-900 pt-32 pb-24 selection:bg-accent/20">
        
        <div className="max-w-3xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16 border-b border-gray-200 pb-10"
          >
            <p className="text-accent tracking-[0.2em] font-medium text-sm mb-4 uppercase">Legal Documentation</p>
            <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4">
              Privacy Policy
            </h1>
            <p className="text-gray-400 font-light tracking-wide text-sm">
              Effective Date: February 20, 2026
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-12 text-gray-600 font-light leading-[1.8] text-[15px] md:text-base prose prose-a:text-accent prose-a:no-underline hover:prose-a:underline"
          >
            <motion.p variants={fadeInUp}>
              This Privacy Notice for Manthaan Healthcare and Wellness Private Limited ("we," "us," or "our"), describes how and why we might access, collect, store, use, and/or share ("process") your personal information when you profoundly engage with our platform ("Services").
            </motion.p>

            <motion.div variants={fadeInUp} className="bg-white border border-gray-100 p-8 rounded-2xl shadow-sm my-10">
              <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-widest mb-4">Summary of Key Points</h2>
              <p className="m-0">
                We stringently process personal and sensitive information (such as diagnostic health data) entirely with your consent to curate and elevate your routines. <strong>We do not sell your data.</strong> We employ military-grade, state-of-the-art security practices to ensure absolute privacy.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <h2 className="text-xl font-medium text-gray-900 mb-4 tracking-tight">1. Collected Information</h2>
              <p>
                We carefully curate collected data necessary for optimizing your experience, securely gathering details such as email, passwords, sophisticated billing profiles, and—strictly under explicit consent—biometric health-related diagnostic data natively through our AI scanner. We additionally collect secure technical footprint data like IP address identifiers and localized device configurations.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <h2 className="text-xl font-medium text-gray-900 mb-4 tracking-tight">2. Google OAuth & Integrity</h2>
              <p>
                We employ Google OAuth strictly as a frictionless authentication gateway. We access only the absolute baseline profile nodes—specifically email address, authenticated nomenclature, and profile imagery. <strong>Under no circumstance</strong> do we interface with your Gmail, Drive, or highly sensitive ambient Google topologies.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <h2 className="text-xl font-medium text-gray-900 mb-4 tracking-tight">3. Data Processing Protocols</h2>
              <p>
                Your data functions to authorize account orchestration, seamlessly process financial transactions, empower customer service endpoints, and critically, calibrate and improve our proprietary platform algorithms.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <h2 className="text-xl font-medium text-gray-900 mb-4 tracking-tight">4. Transparency in Sharing</h2>
              <p>
                Transmission of your records only occurs explicitly during business acquisitions/transfers or under legally binding mandates. We adhere to a rigid non-sale philosophy regarding your physiological and personal data.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <h2 className="text-xl font-medium text-gray-900 mb-4 tracking-tight">5. AI Intelligence</h2>
              <p>
                Our ecosystem utilizes advanced AI intelligence layers (partnered selectively via securely sandboxed OpenAI architectures) to return diagnostic insights. Diagnostic submission implies consent to computational analysis, but robust opt-out parameters remain available in your settings.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <h2 className="text-xl font-medium text-gray-900 mb-4 tracking-tight">6. Archival and Security</h2>
              <p>
                We maintain active archives solely mapped towards necessary curation lengths, heavily restricted by end-to-end multi-layer encryption deployments. Unnecessary data is immediately anonymized or systematically purged from server clusters.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="pt-10 border-t border-gray-200 mt-16">
              <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-widest mb-6">Contact Registry</h2>
              <p className="leading-relaxed text-sm">
                <span className="text-gray-900 font-medium">Manthaan Healthcare and Wellness Private Limited</span><br />
                06, Gaytri Society, Kacchi Colony<br />
                Banaskantha, Gujarat 385535, India<br /><br />
                <span className="text-gray-400">Direct Contact:</span> <a href="mailto:official@beowned-skin.com" className="text-gray-900 font-medium ml-2">official@beowned-skin.com</a>
              </p>
            </motion.div>

          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}