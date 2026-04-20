import React from "react";
import { motion } from "framer-motion";

const TechMarquee = ({ stack }) => {
  // we render multiple copies directly below

  return (
    <section id="stack" className="py-32 bg-slate-50/50 overflow-hidden relative">
      <div className="container mx-auto px-6 mb-16 relative z-10">
        <div className="max-w-3xl">
          <span className="text-cyan-600 font-bold tracking-[0.2em] text-xs uppercase mb-4 flex items-center gap-2">
            Development Stack
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6 leading-[1.1]">
            Tech <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-emerald-500">Stack.</span>
          </h2>
        </div>
      </div>

      <div className="relative flex overflow-hidden py-10 hover-pause">
        <div className="flex w-max animate-marquee-slide">
          {[1, 2].map((copy) => (
            <div key={copy} className="flex gap-8 md:gap-16 items-center pr-8 md:pr-16">
              {stack.map((item, i) => (
                <motion.div
                  key={`${item.name}-${copy}-${i}`}
                  whileHover={{ y: -8, scale: 1.05 }}
                  className="flex items-center gap-3 md:gap-6 group cursor-pointer"
                >
                  <div className="w-14 h-14 md:w-20 md:h-20 glass-premium rounded-2xl md:rounded-3xl flex items-center justify-center p-3 md:p-4 grayscale group-hover:grayscale-0 transition-liquid group-hover:shadow-liquid border border-slate-200/50">
                    <img 
                      src={`https://api.iconify.design/logos:${item.icon}.svg`} 
                      alt={item.name} 
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${item.name}&background=f3f4f6&color=0891b2&font-size=0.4&bold=true`;
                      }}
                    />
                  </div>
                  <span className="text-xs md:text-sm font-bold text-slate-400 group-hover:text-cyan-600 transition-liquid uppercase tracking-[0.15em] md:tracking-[0.2em] whitespace-nowrap">
                    {item.name}
                  </span>
                </motion.div>
              ))}
            </div>
          ))}
        </div>
        
        {/* Fade Edges */}
        <div className="absolute inset-y-0 left-0 w-20 md:w-40 bg-gradient-to-r from-slate-50 to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-20 md:w-40 bg-gradient-to-l from-slate-50 to-transparent z-10" />
      </div>
    </section>
  );
};

export default TechMarquee;
