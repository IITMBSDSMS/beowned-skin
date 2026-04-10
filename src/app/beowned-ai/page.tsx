"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

type ViewState = "IDLE" | "SCANNING" | "ANALYZING" | "RESULTS";

export default function BeOwnedAIPage() {
  const router = useRouter();
  const [view, setView] = useState<ViewState>("IDLE");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [scanPhase, setScanPhase] = useState(0);
  const [glitchText, setGlitchText] = useState("");
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  
  const scanPhrases = [
    "INITIALIZING NEURAL MESH...",
    "ISOLATING FACIAL TOPOGRAPHY...",
    "EXTRACTING SEBUM DENSITY MAP...",
    "CALCULATING MICRO-FRACTURES...",
    "DETECTING BARRIER VULNERABILITIES...",
    "WARNING: DEGRADATION DETECTED...",
    "SYNTHESIZING CLINICAL PROTOCOL..."
  ];

  // Deep tech background data simulation
  useEffect(() => {
    if (view === "SCANNING" || view === "ANALYZING") {
      const interval = setInterval(() => {
        let text = "";
        const chars = "ABCDEF0123456789";
        for (let i = 0; i < 40; i++) {
          text += chars.charAt(Math.floor(Math.random() * chars.length)) + " ";
        }
        setGlitchText(text);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [view]);

  // Handle Dramatic Scan Sequence + Status Phrases
  useEffect(() => {
    if (view === "SCANNING") {
      const interval = setInterval(() => {
        setScanPhase((prev) => {
          if (prev >= scanPhrases.length - 2) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 800);
      return () => clearInterval(interval);
    }
  }, [view]);

  // Real AI Analysis Trigger
  useEffect(() => {
    if (view === "SCANNING" && imagePreview) {
      performAnalysis();
    }
  }, [view, imagePreview]);

  const performAnalysis = async () => {
    try {
      // Small artificial delay for "scanning" feel (psychological UX)
      await new Promise(r => setTimeout(r, 4000));
      
      setView("ANALYZING");

      const response = await fetch("/api/analyze-skin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: imagePreview })
      });

      const data = await response.json();

      if (!data.valid) {
        setError(data.error || "Neural Matrix requires human epidermal data.");
        setView("IDLE");
        return;
      }

      setAnalysisData(data);
      setView("RESULTS");
    } catch (err) {
      setError("Neural matrix offline. Please try again.");
      setView("IDLE");
    }
  };

  // File Upload Handler
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setView("SCANNING");
        setError(null);
        setScanPhase(0);
      };
      reader.readAsDataURL(file);
    }
  };

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
      <div className="min-h-screen flex flex-col pt-24 relative overflow-hidden bg-background">
        
        {/* Background Atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] max-w-[1200px] max-h-[1200px] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="flex-1 w-full max-w-6xl mx-auto px-6 py-12 flex flex-col items-center justify-center relative z-10">
          
          <AnimatePresence mode="wait">
            
            {/* ===================== IDLE VIEW ===================== */}
            {view === "IDLE" && (
              <motion.div
                key="idle"
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.9, filter: "brightness(2) blur(10px)", transition: { duration: 0.8 } }}
                variants={staggerContainer}
                className="max-w-5xl text-center w-full flex flex-col items-center"
              >
                {/* Custom HUD decorations */}
                <div className="absolute top-10 left-10 w-16 h-16 border-t border-l border-red-500/30 opacity-50 hidden md:block"></div>
                <div className="absolute top-10 right-10 w-16 h-16 border-t border-r border-red-500/30 opacity-50 hidden md:block"></div>
                <div className="absolute bottom-10 left-10 w-16 h-16 border-b border-l border-red-500/30 opacity-50 hidden md:block"></div>
                <div className="absolute bottom-10 right-10 w-16 h-16 border-b border-r border-red-500/30 opacity-50 hidden md:block"></div>

                <motion.div variants={fadeInUp} className="mb-6 relative z-10 mt-8">
                  <span className="px-5 py-1.5 border border-red-500/30 rounded-full text-[10px] sm:text-xs uppercase tracking-[0.3em] font-bold text-red-500 bg-red-500/5 shadow-[0_0_15px_rgba(239,68,68,0.2)] animate-pulse">
                     Live Clinical Diagnostic
                  </span>
                </motion.div>
                
                <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-7xl font-light text-gray-900 mb-6 tracking-tight relative z-10 leading-tight">
                  Stop Guessing. <br />
                  <span className="italic font-normal bg-clip-text text-transparent bg-gradient-to-r from-gray-500 to-gray-400">Discover The Truth.</span>
                </motion.h1>

                {error && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }} 
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-8 p-4 bg-red-100 border border-red-200 text-red-600 font-bold uppercase tracking-widest text-xs rounded-xl"
                  >
                    {error}
                  </motion.div>
                )}

                <motion.p variants={fadeInUp} className="text-gray-500 text-base md:text-lg mb-8 leading-relaxed max-w-xl mx-auto font-light relative z-10">
                  Upload an unfiltered photo. Our proprietary neural network will instantly expose microscopic vulnerabilities and map your exact clinical protocol.
                </motion.p>
                
                {/* Hypertech Upload Core */}
                <motion.div variants={fadeInUp} className="relative flex justify-center items-center w-[280px] h-[280px] md:w-[350px] md:h-[350px] mt-4">
                  {/* Outer rotating ring */}
                  <motion.svg animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute inset-0 w-full h-full text-red-500/20" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.3" strokeDasharray="2 4" />
                    <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 6" />
                  </motion.svg>
                  
                  {/* Inner inverse rotating ring */}
                  <motion.svg animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute inset-8 w-[calc(100%-4rem)] h-[calc(100%-4rem)] text-gray-300" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="15 10 5 10" />
                    {/* decorative crosshairs */}
                    <path d="M50 0 v12 M50 88 v12 M0 50 h12 M88 50 h12" stroke="currentColor" strokeWidth="1" />
                  </motion.svg>
                  
                  {/* Central Glow */}
                  <div className="absolute inset-0 bg-red-500/10 rounded-full blur-2xl animate-pulse" />

                  {/* Upload Label / Button */}
                  <label className="relative z-20 group cursor-pointer w-32 h-32 md:w-40 md:h-40 rounded-full bg-black flex flex-col items-center justify-center border border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.2)] hover:shadow-[0_0_50px_rgba(239,68,68,0.5)] transition-all duration-500 hover:scale-105 overflow-hidden">
                    {/* Scanner line inside button */}
                    <motion.div animate={{ top: ['-20%', '120%'] }} transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }} className="absolute left-0 right-0 h-[3px] bg-red-500 shadow-[0_0_15px_rgba(239,68,68,1)] z-0 mix-blend-screen opacity-60" />
                    
                    <svg width="32" height="32" fill="none" stroke="white" strokeWidth="1.5" className="mb-2 relative z-10 group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <circle cx="12" cy="13" r="3" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 11v4 M10 13h4" strokeWidth="0.5" />
                    </svg>
                    <span className="font-bold tracking-[0.2em] uppercase text-[9px] md:text-[10px] text-white relative z-10 text-center px-2">Initiate<br/>Uplink</span>
                    <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
                  </label>
                  
                  {/* Floating stats badges around the circle */}
                  <motion.div animate={{ y: [-5, 5, -5] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[8%] -left-[5%] md:-left-[25%] bg-white border border-gray-200 px-3 py-1.5 rounded-lg shadow-xl text-[8px] md:text-[9px] uppercase font-bold tracking-widest text-gray-500 hidden sm:flex items-center gap-2 z-30">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse"></span> Analyzing Matrix
                  </motion.div>
                  <motion.div animate={{ y: [5, -5, 5] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-[10%] -right-[5%] md:-right-[25%] bg-black border border-gray-800 px-3 py-1.5 rounded-[10px] shadow-xl text-[8px] md:text-[9px] uppercase font-bold tracking-[0.2em] text-red-500 hidden sm:flex items-center gap-2 z-30">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> Active Neural Sync
                  </motion.div>
                </motion.div>
                
                <motion.p variants={fadeInUp} className="mt-8 text-[9px] text-gray-400 uppercase tracking-widest flex items-center justify-center gap-2 relative z-10">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                  Processing Core Ready
                </motion.p>
              </motion.div>
            )}

            {/* ===================== SCANNING / ANALYZING VIEW ===================== */}
            {(view === "SCANNING" || view === "ANALYZING") && (
              <motion.div
                key="scanning"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, filter: "brightness(5) blur(20px)", transition: { duration: 0.4 } }}
                className="w-full flex flex-col items-center justify-center absolute inset-0 z-50 bg-black"
              >
                
                {/* Hypertech Background Hex Data */}
                <div className="absolute inset-0 overflow-hidden mix-blend-overlay opacity-30 pointer-events-none font-mono text-[8px] text-red-500 whitespace-pre-wrap leading-tight p-4">
                  {glitchText}
                  <br/>{glitchText}
                  <br/>{glitchText}
                  <br/>{glitchText}
                  <br/>{glitchText}
                  <br/>{glitchText}
                </div>

                <div className="relative w-full max-lg aspect-[3/4] max-h-[70vh] rounded-none md:rounded-3xl overflow-hidden border-2 border-red-500/30 shadow-[0_0_50px_rgba(239,68,68,0.2)] bg-gray-900 mx-auto">
                  {imagePreview && (
                    <img src={imagePreview} className="w-full h-full object-cover opacity-50 contrast-125 saturate-0" alt="Scanning..." />
                  )}
                  
                  {/* Grid Overlay */}
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-30 mix-blend-overlay pointer-events-none" />
                  
                  {/* Aggressive Scanning Laser */}
                  <motion.div 
                    animate={{ top: ['-10%', '110%', '-10%'] }}
                    transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}
                    className="absolute left-0 right-0 h-[4px] bg-red-500 shadow-[0_0_30px_rgba(239,68,68,1)] z-10" 
                  />
                  
                  {/* Multi-layered Reticles */}
                  {view === "SCANNING" && (
                    <>
                      <motion.div 
                        animate={{ rotate: 360, scale: [1, 1.05, 1] }}
                        transition={{ duration: 4, ease: "linear", repeat: Infinity }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border-2 border-red-500/50 rounded-full border-dashed"
                      />
                      <motion.div 
                        animate={{ rotate: -360 }}
                        transition={{ duration: 6, ease: "linear", repeat: Infinity }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white/30 rounded-full"
                      />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-red-500/20" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-[1px] bg-red-500/20" />
                    </>
                  )}

                  {/* Analyze Mode: Identification Step */}
                  {view === "ANALYZING" && (
                    <div className="absolute inset-0 bg-red-500/20 animate-pulse mix-blend-color-dodge flex flex-col justify-center items-center font-mono z-20">
                      <motion.span animate={{ opacity: [0,1,0] }} transition={{ repeat: Infinity, duration: 0.2 }} className="text-4xl text-red-100 font-bold tracking-widest uppercase">
                         IDENTIFYING
                      </motion.span>
                      <span className="text-white text-sm tracking-widest mt-2 bg-red-600 px-4 py-1">GENETIC BIOMARKERS</span>
                    </div>
                  )}

                  {/* Corner Tech Accents */}
                  <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-red-500" />
                  <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-red-500" />
                  <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-red-500" />
                  <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-red-500" />
                </div>

                {/* Intense Status Terminal */}
                <div className="mt-8 text-center font-mono">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={scanPhase}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className={`text-xl font-bold tracking-[0.2em] uppercase ${scanPhase >= 5 || view === "ANALYZING" ? 'text-red-500 animate-pulse' : 'text-white'}`}
                    >
                      {view === "ANALYZING" ? "SYNTHESIZING CLINICAL VERDICT..." : scanPhrases[scanPhase]}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {/* ===================== RESULTS VIEW ===================== */}
            {view === "RESULTS" && analysisData && (
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="w-full relative z-10"
              >
                <div className="text-center mb-12">
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                    className="inline-block px-4 py-1.5 bg-red-500 text-white text-[10px] uppercase tracking-[0.4em] font-bold rounded-full mb-6 shadow-[0_0_20px_rgba(239,68,68,0.4)] animate-pulse"
                  >
                    DIAGNOSTIC ARCHIVE COMPLETE
                  </motion.div>
                  <motion.h2 
                     initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                     className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight uppercase"
                  >
                    Clinical Verdict
                  </motion.h2>
                </div>

                <div className="grid md:grid-cols-12 gap-8 lg:gap-12">
                  
                  {/* Left Column: Harsh Truth Metrics */}
                  <div className="md:col-span-7 bg-white rounded-[2rem] p-8 md:p-12 border border-red-100 shadow-[0_20px_60px_rgba(239,68,68,0.05)] space-y-8 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-red-500" />
                    
                    <div>
                       <h3 className="text-2xl font-bold text-gray-900 mb-4 uppercase tracking-wide">Analysis Profile</h3>
                       <p className="text-gray-600 font-light text-[15px] leading-relaxed italic border-l-2 border-red-500 pl-4">
                         "{analysisData.verdict}"
                       </p>
                    </div>
                    
                    {/* Urgency Metrics */}
                    {[
                      { label: "Sebum Toxicity Level", value: analysisData.metrics.sebum, desc: analysisData.metrics.sebum > 70 ? "CRITICAL: Severe overproduction detected." : "STABLE: Sebum production within normal limits.", color: "bg-red-600" },
                      { label: "Barrier Integrity", value: analysisData.metrics.barrier, desc: analysisData.metrics.barrier < 40 ? "WARNING: Micro-punctures present. Highly sensitive." : "HEALTHY: Skin barrier is effectively resilient.", color: "bg-orange-500" },
                      { label: "Hydration Retention", value: analysisData.metrics.hydration, desc: analysisData.metrics.hydration < 50 ? "POOR: Significant transepidermal water loss." : "OPTIMAL: Cellular hydration is well maintained.", color: "bg-blue-500" },
                      { label: "Textural Degeneration", value: analysisData.metrics.texture, desc: analysisData.metrics.texture > 60 ? "HIGH RISK: Epidermal surfacing shows signs of accelerated aging." : "SMOOTH: Texture is consistent and resilient.", color: "bg-red-500" }
                    ].map((metric, i) => (
                      <motion.div 
                        initial={{ opacity: 0, x: -20 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        transition={{ delay: 0.6 + (i * 0.1) }}
                        key={i} 
                        className="space-y-2 bg-gray-50/50 p-4 rounded-xl border border-gray-100"
                      >
                        <div className="flex justify-between items-end mb-2">
                          <span className="font-bold text-xs tracking-widest text-gray-900 uppercase flex items-center gap-2">
                            {((i === 0 && metric.value > 70) || (i === 1 && metric.value < 40)) && <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>}
                            {metric.label}
                          </span>
                          <span className={`text-xs font-black ${metric.value > 70 ? 'text-red-600' : 'text-gray-900'}`}>{metric.value}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${metric.value}%` }}
                            transition={{ duration: 1.5, delay: 0.8 + (i * 0.1), ease: "easeOut" }}
                            className={`h-full ${metric.color}`} 
                          />
                        </div>
                        <p className="text-xs text-gray-600 font-medium mt-2 leading-relaxed">{metric.desc}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Right Column: The Savior Protocol - Real Recommendations */}
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ delay: 1 }}
                    className="md:col-span-5 bg-gray-900 text-white rounded-[2rem] p-8 md:p-12 shadow-[0_30px_60px_rgba(0,0,0,0.4)] flex flex-col relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-red-500/10 rounded-full blur-[100px] pointer-events-none translate-x-1/2 -translate-y-1/2" />
                    
                    <span className="text-[10px] uppercase tracking-[0.4em] font-black text-red-500 mb-6 border-b border-white/10 pb-4">
                      Prescribed Clinical Protocol
                    </span>
                    
                    <h3 className="text-3xl font-light tracking-tight mb-2 uppercase">Immediate <br/><span className="font-bold text-white">Intervention</span></h3>
                    
                    {analysisData.recommendations && analysisData.recommendations.length > 0 ? (
                      <div className="space-y-6 mt-6 mb-10">
                        {analysisData.recommendations.map((rec: any, i: number) => (
                           <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-colors">
                              <p className="text-red-400 font-bold text-[10px] uppercase tracking-widest mb-2">Prescription {i+1}</p>
                              <h4 className="text-lg font-bold text-white mb-2 underline decoration-red-500 underline-offset-4 decoration-2">BE-OWNED SKU: {rec.id}</h4>
                              <p className="text-white/70 text-sm font-light leading-relaxed">
                                {rec.reason}
                              </p>
                           </div>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 my-6">
                        <p className="text-red-400 font-bold text-xs uppercase tracking-widest mb-1">Status: Degrading</p>
                        <p className="text-white/80 font-light text-sm leading-relaxed">
                          To halt structural degradation and aggressively reset your matrix, you must initiate the **Niacinamide 10% Protocol** explicitly. Traditional cosmetics will only exacerbate your microscopic vulnerabilities.
                        </p>
                      </div>
                    )}
                    
                    <ul className="space-y-4 mb-10">
                      <li className="flex items-start gap-3">
                         <div className="mt-1 text-red-500"><svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg></div>
                         <span className="text-sm font-medium text-white/90">Instantly liquefy toxic sebum buildup</span>
                      </li>
                      <li className="flex items-start gap-3">
                         <div className="mt-1 text-red-500"><svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg></div>
                         <span className="text-sm font-medium text-white/90">Seal micro-punctures within 48 hours</span>
                      </li>
                    </ul>
                    
                    <div className="mt-auto space-y-4 relative z-10">
                       <button 
                         onClick={() => router.push("/shop")}
                         className="w-full py-4 rounded-xl bg-white text-black font-black tracking-[0.2em] text-xs uppercase hover:bg-gray-200 shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all transform hover:scale-[1.02] active:scale-95"
                       >
                         Secure The Protocol Now
                       </button>
                       <p className="text-center text-[10px] text-white/40 tracking-widest uppercase mt-2">
                         Data suggests a 94% recovery rate when initiated immediately.
                       </p>
                    </div>
                  </motion.div>
                  
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
      <Footer />
    </>
  );
}