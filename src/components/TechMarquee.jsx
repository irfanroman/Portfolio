import React from "react";
import { motion } from "framer-motion";

const TechMarquee = ({ stack }) => {
  // we render multiple copies directly below

  return (
    <section id="stack" className="py-32 bg-slate-50/50 overflow-hidden relative">
      <div className="container mx-auto px-6 mb-16 relative z-10">
        <div className="flex items-center gap-4">
          <h2 className="text-4xl font-display font-bold text-slate-900 pr-8 border-r border-slate-200">Tech Stack</h2>
          <p className="text-slate-500 font-medium max-w-sm">
            A curated selection of industrial-grade tools and frameworks.
          </p>
        </div>
      </div>

      <div className="relative flex overflow-hidden py-10 hover-pause">
        <div className="flex w-max animate-marquee-slide">
          {[1, 2].map((copy) => (
            <div key={copy} className="flex gap-16 items-center pr-16">
              {stack.map((item, i) => (
                <motion.div
                  key={`${item.name}-${copy}-${i}`}
                  whileHover={{ y: -8, scale: 1.05 }}
                  className="flex items-center gap-6 group cursor-pointer"
                >
                  <div className="w-20 h-20 glass-premium rounded-3xl flex items-center justify-center p-4 grayscale group-hover:grayscale-0 transition-liquid group-hover:shadow-liquid border border-slate-200/50">
                    <img 
                      src={`https://api.iconify.design/logos:${item.icon}.svg`} 
                      alt={item.name} 
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${item.name}&background=f3f4f6&color=0891b2&font-size=0.4&bold=true`;
                      }}
                    />
                  </div>
                  <span className="text-sm font-bold text-slate-400 group-hover:text-cyan-600 transition-liquid uppercase tracking-[0.2em]">
                    {item.name}
                  </span>
                </motion.div>
              ))}
            </div>
          ))}
        </div>
        
        {/* Fade Edges */}
        <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-slate-50 to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-slate-50 to-transparent z-10" />
      </div>
    </section>
  );
};

export default TechMarquee;
