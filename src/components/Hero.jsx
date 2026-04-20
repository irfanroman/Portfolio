import React from "react";
import { motion } from "framer-motion";
import { FileText, ChevronRight, Zap } from "lucide-react";

const Hero = ({ personal }) => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-white">
      {/* Dynamic Cyan Radial Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-400/10 blur-[120px] rounded-full" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-300/5 blur-[80px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-cyan-200/5 blur-[60px] rounded-full" />
        
        {/* Subtle grid to keep the canvas feel */}
        <div className="absolute inset-0 opacity-[0.02] canvas-grid" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-6xl px-6 text-center">

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="flex items-center justify-center gap-2 mb-6"
        >
          <span className="text-cyan-600 font-bold tracking-[0.2em] text-xs uppercase flex items-center gap-2">
            Man Behind Every Design
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
          </span>
        </motion.div>

        <motion.h1
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="text-5xl md:text-7xl font-display font-bold text-slate-900 leading-[1.1] mb-10 tracking-tight"
        >
          Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-emerald-500">premium digital</span> experiences.
        </motion.h1>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 md:mb-12 leading-relaxed font-sans font-medium px-4"
        >
          {personal.intro}
        </motion.p>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6"
        >
          <button className="w-full sm:w-auto px-10 py-5 bg-slate-900 text-white rounded-full font-bold hover:bg-slate-800 transition-liquid flex items-center justify-center gap-2 group shadow-2xl hover:shadow-cyan-200/50">
            View My Work
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="w-full sm:w-auto glass-premium px-10 py-5 rounded-full font-bold text-slate-800 hover:bg-white transition-liquid flex items-center justify-center gap-2 border border-slate-200/50 shadow-xl hover:shadow-cyan-100/30">
            <FileText className="w-5 h-5" />
            Download CV
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
