import React from "react";
import { motion } from "framer-motion";
import { MoveRight, ArrowDownRight, Compass, ArrowRight } from "lucide-react";
import { cn } from "../lib/utils";

const SparkleIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-cyan-500">
    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" fill="currentColor" />
  </svg>
);

const Hero = ({ personal }) => {
  return (
    <section 
      aria-label="Hero" 
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-white selection:bg-cyan-100"
    >
      {/* Background Textures */}
      <div className="grain-overlay" />
      
      {/* Subtle Flow Lines (Background) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.08]" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
        <motion.path
          d="M-100 200 C 200 400 500 100 800 300 C 1100 500 1200 800 1500 600"
          stroke="#06b6d4"
          strokeWidth="0.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3, ease: "easeInOut" }}
        />
        <motion.path
          d="M1100 100 C 800 300 400 100 100 400 C -200 700 -100 900 300 1100"
          stroke="#10b981"
          strokeWidth="0.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 4, delay: 0.5, ease: "easeInOut" }}
        />
      </svg>

      {/* --- MICROCOPY: TOP LEFT --- */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute top-10 left-10 md:top-16 md:left-16 z-20"
      >
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Version / 2026</span>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
            <span className="text-[9px] font-black text-slate-900 uppercase tracking-tighter">System: Online</span>
          </div>
        </div>
      </motion.div>

      {/* --- MICROCOPY: TOP RIGHT --- */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute top-10 right-10 md:top-16 md:right-16 z-20 text-right"
      >
        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block mb-2">Visual Storyteller</span>
        <div className="flex flex-col items-end gap-1">
           <div className="flex items-center gap-1">
              <span className="text-[9px] font-black text-slate-900 uppercase">Poetry in Design</span>
              <SparkleIcon />
           </div>
        </div>
      </motion.div>

      {/* --- MAIN HEADLINE --- */}
      <div className="relative z-10 select-none">
        <motion.div
          initial={{ opacity: 0, scale: 1.1, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
          className="relative"
        >
          {/* 2026 Pill */}


          {/* Large Editorial Headline */}
          <h1 className="text-[16vw] md:text-[14vw] leading-none font-editorial italic text-slate-900 tracking-tighter flex items-center justify-center">
            <span>Port</span>
            <span className="relative inline-block px-[0.02em]">
               {/* Custom Fluid "f" Stroke - Refined for better legibility */}
                <motion.svg 
                 viewBox="0 0 100 160" 
                 className="absolute -top-[0.35em] left-1/2 -translate-x-[48%] w-[1.4em] h-[2.2em] pointer-events-none z-20"
               >
                 <motion.path
                   d="M75,10 C60,10 40,25 40,60 L40,110 C40,145 25,155 5,155 M20,65 L90,65"
                   stroke="#06b6d4"
                   strokeWidth="2.5"
                   fill="none"
                   strokeLinecap="round"
                   initial={{ pathLength: 0, opacity: 0 }}
                   animate={{ pathLength: 1, opacity: 1 }}
                   transition={{ duration: 2, delay: 1.2, ease: "easeInOut" }}
                 />
               </motion.svg>
               <span className="opacity-0">f</span>
            </span>
            <span>olio</span>
          </h1>

          {/* Tagline */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-4 text-center"
          >
             <p className="text-[10px] md:text-xs font-mono text-slate-400 uppercase tracking-[0.4em]">
                Designing systems with <span className="text-slate-900 font-bold">clarity</span> & <span className="text-slate-900 font-bold">precision</span>
             </p>
          </motion.div>
        </motion.div>
      </div>

      {/* --- MICROCOPY: BOTTOM LEFT --- */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-10 left-10 md:bottom-16 md:left-16 z-20 max-w-[200px]"
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-slate-400">
            <ArrowDownRight className="w-4 h-4" />
            <span className="text-[9px] font-black text-slate-900 uppercase tracking-widest">UI/UX & DevOps Engineer</span>
          </div>
          <div className="w-12 h-px bg-slate-100" />
        </div>
      </motion.div>

      {/* --- MICROCOPY: BOTTOM RIGHT --- */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-10 right-10 md:bottom-16 md:right-16 z-20 text-right"
      >
        <div className="flex flex-col items-end gap-3">
          <div className="text-[9px] font-mono text-slate-400 uppercase tracking-widest leading-relaxed">
            Design Executed <br />
            <span className="text-slate-900 font-bold">by Irfan Fahrurohman</span>
          </div>
          <motion.a 
            href="#projects"
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-full group overflow-hidden relative"
          >
            <span className="text-[9px] font-black uppercase tracking-widest relative z-10">Explore Work</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform relative z-10" />
            <motion.div 
              className="absolute inset-0 bg-cyan-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500"
            />
          </motion.a>
        </div>
      </motion.div>

      {/* Center Flow Divider */}
      <motion.div 
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 2, duration: 1.5 }}
        className="absolute bottom-32 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent"
      />
    </section>
  );
};


export default Hero;
