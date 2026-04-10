"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion, Variants } from "framer-motion";

export default function RefundPolicy() {
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
            <p className="text-primary tracking-[0.2em] font-medium text-sm mb-4 uppercase">Customer Care</p>
            <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4">
              Refund & Return Policy
            </h1>
            <p className="text-gray-400 font-light tracking-wide text-sm">
              Effective Date: February 20, 2026
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-12 text-gray-600 font-light leading-[1.8] text-[15px] md:text-base prose prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
          >
            <motion.p variants={fadeInUp}>
              At BE-OWNED SKIN, we are committed to delivering high-quality skincare products. Due to the nature of cosmetic and personal care items, we follow a strict but fair return and refund policy to ensure hygiene, safety, and customer satisfaction.
            </motion.p>

            <motion.div variants={fadeInUp}>
              <h2 className="text-xl font-medium text-gray-900 mb-4 tracking-tight">1. Returns Eligibility</h2>
              <p>We accept returns only under the following conditions:</p>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li>The product is damaged, defective, or leaked upon delivery</li>
                <li>The product delivered is incorrect (wrong item)</li>
              </ul>
              <p className="mt-4">To be eligible:</p>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li>The issue must be reported within 48 hours of delivery</li>
                <li>The product must be unused and in original packaging</li>
                <li>An unboxing video or clear images must be provided as proof</li>
              </ul>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <h2 className="text-xl font-medium text-gray-900 mb-4 tracking-tight">2. Non-Returnable Items</h2>
              <p>We do not accept returns or refunds for:</p>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li>Opened or used products</li>
                <li>Products purchased due to personal preference (e.g., texture, results, skin reaction)</li>
                <li>Minor packaging variations that do not affect product quality</li>
                <li>Delayed results, as skincare outcomes vary from person to person</li>
              </ul>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <h2 className="text-xl font-medium text-gray-900 mb-4 tracking-tight">3. Refund Process</h2>
              <p>Once your request is reviewed and approved:</p>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li>Refunds will be processed within 5–7 business days</li>
                <li>The amount will be credited to your original payment method</li>
              </ul>
              <p className="mt-4">In case of Cash on Delivery (COD) orders:</p>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li>Refunds will be processed via bank transfer or UPI</li>
              </ul>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <h2 className="text-xl font-medium text-gray-900 mb-4 tracking-tight">4. Replacement Policy</h2>
              <p>Instead of a refund, we may offer a replacement product in cases of:</p>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li>Damaged or defective items</li>
                <li>Wrong product delivered</li>
              </ul>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <h2 className="text-xl font-medium text-gray-900 mb-4 tracking-tight">5. Order Cancellation</h2>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li>Orders can be cancelled before dispatch only</li>
                <li>Once shipped, cancellations are not permitted</li>
              </ul>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <h2 className="text-xl font-medium text-gray-900 mb-4 tracking-tight">6. Contact for Support</h2>
              <p>For any refund or return requests, please contact us at:</p>
              <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm mt-4">
                <p className="mb-2">📧 Email: <a href="mailto:support@beownedskin.com" className="text-primary font-medium">support@beownedskin.com</a></p>
                <p>📱 WhatsApp: <span className="text-primary font-medium">+91-XXXXXXXXXX</span></p>
              </div>
              <p className="mt-4 font-medium text-gray-900 uppercase text-xs tracking-widest">Include:</p>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li>Order ID</li>
                <li>Issue description</li>
                <li>Photo/video proof</li>
              </ul>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <h2 className="text-xl font-medium text-gray-900 mb-4 tracking-tight">7. Important Note</h2>
              <p>
                Our products are formulated based on scientific skincare principles, but individual skin responses may vary. We recommend performing a patch test before use.
              </p>
            </motion.div>

            <motion.p variants={fadeInUp} className="italic text-gray-500 text-sm mt-12 pb-12">
              BE-OWNED SKIN reserves the right to deny refund requests that do not meet the above conditions.
            </motion.p>

          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}
