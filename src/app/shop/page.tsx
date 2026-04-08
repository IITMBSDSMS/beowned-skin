"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion, Variants } from "framer-motion";

export default function ShopPage() {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data } = await supabase.from("products").select("*");
    setProducts(data || []);
  };

  const requireAuth = async () => {
    const { data } = await supabase.auth.getUser();

    if (!data.user) {
      router.push("/login?next=/shop");
      return false;
    }

    return true;
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background pt-32 pb-24">
        
        {/* Heading */}
        <div className="max-w-7xl mx-auto px-6 mb-16 md:mb-24 text-center md:text-left">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-primary tracking-[0.2em] font-bold text-sm mb-4 uppercase"
          >
            Pre-Booking Collection
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-poppins font-bold mb-6 text-foreground tracking-tight"
          >
            Curated Formulations
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-foreground/70 text-lg md:text-xl font-medium max-w-xl"
          >
            Discover our science-backed skincare designed for visible, lasting results. Each product is formulated with intention.
          </motion.p>
        </div>

        {/* Product Grid */}
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
          >
            {products.map((product) => (
              <motion.div
                variants={itemVariants}
                key={product.id}
                className="group flex flex-col"
              >
                {/* Image */}
                <div className="w-full aspect-[4/5] glass rounded-2xl relative overflow-hidden mb-6 flex items-center justify-center p-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-[60%] h-[60%] object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700 ease-out drop-shadow-md"
                  />
                  {/* Hover Add to Bag Overlay */}
                  <div className="absolute inset-0 bg-background/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                     <button
                        onClick={async () => {
                          const ok = await requireAuth();
                          if (!ok) return;
                          localStorage.setItem("checkoutProduct", JSON.stringify(product));
                          router.push("/checkout");
                        }}
                        className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 bg-primary text-white hover:bg-orange-600 px-8 py-3 rounded-full text-sm font-bold tracking-wide shadow-xl hover:scale-105"
                     >
                        Pre-Book Now
                     </button>
                  </div>
                </div>

                {/* Content */}
                <div className="px-2">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-poppins font-bold tracking-wide text-foreground">
                      {product.name}
                    </h2>
                    <span className="text-lg font-poppins font-bold text-foreground">
                      ₹{product.price}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-foreground/50 line-through text-sm">
                      ₹{product.original_price}
                    </span>
                    <span className="text-pink-accent text-xs font-bold tracking-wider uppercase">
                      {Math.round(
                        ((product.original_price - product.price) /
                          product.original_price) *
                          100
                      )}
                      % OFF
                    </span>
                  </div>
                  
                  {/* Mobile Add to Bag (since hover overlay isn't active on touch) */}
                  <button
                    onClick={async () => {
                      const ok = await requireAuth();
                      if (!ok) return;

                      localStorage.setItem("checkoutProduct", JSON.stringify(product));
                      router.push("/checkout");
                    }}
                    className="md:hidden mt-6 w-full py-3.5 bg-primary text-white rounded-full text-sm font-bold tracking-wider uppercase active:scale-95 transition"
                  >
                    Pre-Book Now
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {products.length === 0 && (
            <div className="flex justify-center items-center py-32">
               <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}