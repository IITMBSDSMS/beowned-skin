"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const skincareTypes = [
  "OILY SKIN",
  "DRY SKIN",
  "SENSITIVE SKIN",
  "BARRIER REPAIR",
  "OIL CONTROL",
  "GLOWING SKIN",
  "CLINICAL DATA",
  "AI DIAGNOSTICS",
];

export default function LoadingScreen() {
  const [currentTypeIndex, setCurrentTypeIndex] = useState(0);
  const [phase, setPhase] = useState<"types" | "logo" | "exit">("types");
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Phase 1: Cycle through skincare types
    const typeInterval = setInterval(() => {
      setCurrentTypeIndex((prev) => {
        if (prev === skincareTypes.length - 1) {
          clearInterval(typeInterval);
          setTimeout(() => setPhase("logo"), 600);
          return prev;
        }
        return prev + 1;
      });
    }, 400);

    return () => clearInterval(typeInterval);
  }, []);

  useEffect(() => {
    if (phase === "logo") {
      const timer = setTimeout(() => {
        setPhase("exit");
      }, 3500); // Show logo for 3.5 seconds
      return () => clearTimeout(timer);
    }
    if (phase === "exit") {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 1000); // Duration of fade out
      return () => clearTimeout(timer);
    }
  }, [phase]);

  if (!isVisible) return null;

  const letterVariants = {
    initial: { y: 40, opacity: 0 },
    animate: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.1 * i,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const logoText = "BE-OWNED SKIN";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1, ease: "easeInOut" } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#09090b] text-white"
        >
          <div className="relative w-full max-w-4xl flex items-center justify-center h-40">
            {phase === "types" && (
              <AnimatePresence mode="wait">
                <motion.span
                  key={skincareTypes[currentTypeIndex]}
                  initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                  transition={{ duration: 0.3 }}
                  className="text-lg md:text-2xl font-light tracking-[0.4em] text-gray-400"
                >
                  {skincareTypes[currentTypeIndex]}
                </motion.span>
              </AnimatePresence>
            )}

            {phase === "logo" && (
              <div className="flex flex-col items-center">
                <motion.div 
                  className="flex overflow-hidden pb-2"
                  initial={{ letterSpacing: "0.5em" }}
                  animate={{ letterSpacing: "-0.05em" }}
                  transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
                >
                  {logoText.split("").map((letter, i) => (
                    <motion.span
                      key={i}
                      custom={i}
                      variants={letterVariants}
                      initial="initial"
                      animate="animate"
                      className={`text-4xl md:text-8xl font-black font-poppins ${
                        letter === " " ? "mr-4 md:mr-8" : ""
                      }`}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ delay: 1.5, duration: 2, ease: "easeInOut" }}
                  className="h-[2px] w-64 bg-gradient-to-r from-transparent via-primary to-transparent my-6"
                />

                <motion.p
                  initial={{ opacity: 0, letterSpacing: "0.5em", filter: "blur(10px)" }}
                  animate={{ opacity: 1, letterSpacing: "0.25em", filter: "blur(0px)" }}
                  transition={{ delay: 2, duration: 1.5, ease: "easeOut" }}
                  className="text-sm md:text-xl font-light text-white/80 italic uppercase"
                >
                  own your skin
                </motion.p>
              </div>
            )}
          </div>

          {/* Background Ambient Glow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"
          />

          {/* Progress Indicator */}
          {phase === "logo" && (
            <motion.div 
              className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="w-48 h-[2px] bg-white/10 overflow-hidden rounded-full">
                <motion.div 
                  className="h-full bg-primary"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 3, ease: "linear" }}
                />
              </div>
              <span className="text-[10px] tracking-[0.2em] text-white/30 uppercase">Initializing Protocol</span>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
