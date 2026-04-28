import React from "react";
import { motion } from "framer-motion";

const TechMarquee = ({ stack }) => {
  // we render multiple copies directly below

  return (
    <section aria-label="Tech stack" id="stack" className="py-32 bg-slate-50/50 overflow-hidden relative">
      <div className="container mx-auto px-6 mb-16 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20 relative">
          {/* Editorial Section Label */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="absolute -top-12 left-0"
          >
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-[0.4em]">Section / 07</span>
          </motion.div>

          <div className="max-w-2xl">
            
            <h2 className="text-4xl md:text-6xl font-editorial italic text-slate-900 leading-[1.1] mb-8 tracking-tighter whitespace-normal md:whitespace-nowrap">
               Tech <span className="text-cyan-600">Stack</span>
              <span className="relative">
                <motion.svg 
                  className="absolute -bottom-2 left-0 w-full h-2 text-cyan-200/50" 
                  viewBox="0 0 100 10" 
                  preserveAspectRatio="none"
                >
                  <motion.path 
                    d="M0,5 Q25,0 50,5 T100,5" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                  />
                </motion.svg>
              </span>
            </h2>
          </div>

          <div className="hidden lg:flex flex-col items-end gap-2 text-right">
             <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Infrastructure</span>
             <span className="text-xs font-black text-slate-900 uppercase">Modern / Scalable</span>
          </div>
        </div>
      </div>

      <div role="marquee" aria-label="Scrolling tech stack" className="relative flex overflow-hidden py-10 hover-pause">
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
