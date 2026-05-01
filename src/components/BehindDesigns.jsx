import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const BehindDesigns = ({ projects }) => {
  const [activeIndex, setActiveIndex] = useState(Math.floor(projects.length / 2));
  const [isWrapping, setIsWrapping] = useState(false);
  const prevIndex = useRef(activeIndex);

  const processes = [
    { id: "01", title: "Strategy & Planning" },
    { id: "02", title: "Design & Development" },
    { id: "03", title: "Launch & Growth" },
    { id: "04", title: "Ongoing Support" },
  ];
  const total = projects.length;

  // Detect wrap-around on activeIndex change
  useEffect(() => {
    const diff = Math.abs(activeIndex - prevIndex.current);
    if (diff > 1) {
      // Wrap happened — teleport all cards instantly
      setIsWrapping(true);
      // Reset after a frame so next normal navigation uses spring
      requestAnimationFrame(() => {
        setIsWrapping(false);
      });
    }
    prevIndex.current = activeIndex;
  }, [activeIndex]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  // Card config — circular offset calculation
  const getCardProps = (index) => {
    let offset = index - activeIndex;
    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset += total;
    const absOffset = Math.abs(offset);

    if (absOffset > 3) return null;

    const xSpacing = 380;
    const x = offset * xSpacing;
    const rotateY = offset * 12;
    const z = -absOffset * 100;
    const scale = 1 - absOffset * 0.08;
    const opacity = 1 - absOffset * 0.2;
    const zIndex = 10 - absOffset;

    return { x, rotateY, z, scale, opacity, zIndex };
  };

  return (
    <section className="py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="relative text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mb-4"
          >
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-[0.4em]">Section / 03 — Behind the Designs</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-editorial italic text-slate-900 leading-[1.1] mb-6 tracking-tighter"
          >
            Curious <span className="text-cyan-600">What Else</span> I've Created?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-xs md:text-sm max-w-lg mx-auto"
          >
            Explore more brand identities, packaging, and digital design work in my extended portfolio.
          </motion.p>
        </div>
      </div>

      {/* Cinema Poster Carousel */}
      <div 
        className="relative w-full h-[380px] md:h-[520px] flex items-center justify-center"
        style={{ perspective: "1200px" }}
      >
        {projects.map((project, index) => {
          const props = getCardProps(index);
          if (!props) return null;

          const isActive = index === activeIndex;

          return (
            <motion.div
              key={project.id}
              animate={{
                x: props.x,
                rotateY: props.rotateY,
                z: props.z,
                scale: props.scale,
                opacity: props.opacity,
              }}
              transition={isWrapping ? { duration: 0 } : {
                type: "spring",
                stiffness: 200,
                damping: 30,
              }}
              onClick={() => setActiveIndex(index)}
              style={{
                position: "absolute",
                zIndex: props.zIndex,
                transformStyle: "preserve-3d",
              }}
              className={`w-[240px] md:w-[340px] aspect-[2/3] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl cursor-pointer group ${
                isActive ? "shadow-slate-400/30" : "shadow-slate-200/30"
              }`}
            >
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                draggable={false}
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6 md:p-8">
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-[0.2em] mb-2">{project.category}</span>
                <h3 className="text-white text-lg md:text-2xl font-display font-bold leading-tight">{project.title}</h3>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation Arrows */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handlePrev}
          className="w-12 h-12 rounded-full border-2 border-slate-200 flex items-center justify-center text-slate-400 hover:border-cyan-500 hover:text-cyan-500 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleNext}
          className="w-12 h-12 rounded-full border-2 border-slate-200 flex items-center justify-center text-slate-400 hover:border-cyan-500 hover:text-cyan-500 transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>

      <div className="container mx-auto px-6">
        {/* Process Indicators */}
        <div className="mt-16 flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
          {processes.map((process, index) => (
            <motion.div
              key={process.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + (index * 0.1) }}
              className="flex flex-col items-center gap-2 group cursor-default"
            >
              <span className="text-[10px] font-bold text-cyan-500 tracking-tighter">
                #{process.id}
              </span>
              <span className="text-[11px] md:text-xs text-slate-400 font-bold group-hover:text-cyan-600 transition-colors uppercase tracking-[0.2em]">
                {process.title}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BehindDesigns;
