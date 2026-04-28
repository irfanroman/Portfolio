import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "../lib/utils";

const ProjectCard = ({ project }) => {
  return (
    <motion.a
      href={project.link || "#"}
      target={project.link ? "_blank" : undefined}
      rel={project.link ? "noopener noreferrer" : undefined}
      aria-label={`View project: ${project.title}`}
      whileHover={{ y: -12 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={cn(
        "group relative overflow-hidden rounded-[2.5rem] border border-slate-100 glass-premium p-6 h-full min-h-[350px] flex flex-col shadow-xl hover:shadow-cyan-100/40 hover:border-cyan-200/50 transition-liquid block outline-none"
      )}
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-liquid" />
      
      {/* Image Preview */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[1.5rem] mb-8">
        <img 
          src={project.image} 
          alt={project.title} 
          className="object-cover w-full h-full transform group-hover:scale-105 transition-liquid duration-1000"
        />
        <div className="absolute inset-0 bg-slate-900/5 group-hover:bg-slate-900/0 transition-liquid" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-600 bg-cyan-50 px-3 py-1 rounded-full">{project.category}</span>
            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{project.year}</span>
          </div>
          <div className="p-2 bg-slate-50 rounded-full group-hover:bg-cyan-500 group-hover:text-white transition-liquid">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
        <h3 className="text-2xl font-display font-bold text-slate-900 mb-3 leading-tight">{project.title}</h3>
        <p className="text-[15px] text-slate-500 font-medium leading-relaxed mb-6">{project.description}</p>
      </div>
    </motion.a>
  );
};

const ProjectsBento = ({ projects }) => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20 relative">
          {/* Editorial Section Label */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="absolute -top-12 left-0"
          >
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-[0.4em]">Section / 04</span>
          </motion.div>

          <div className="max-w-2xl">
            
            <h2 className="text-4xl md:text-6xl font-editorial italic text-slate-900 leading-[1.1] mb-2 tracking-tighter whitespace-normal md:whitespace-nowrap">
                         Selected <span className="text-cyan-600 relative">
                           Work
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
             <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Architecture</span>
             <span className="text-xs font-black text-slate-900 uppercase">Scalable / Precise / Performant</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsBento;
