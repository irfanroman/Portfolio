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
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-600 bg-cyan-50 px-3 py-1 rounded-full">{project.category}</span>
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
    <section id="projects" className="py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-16">
          <span className="text-cyan-600 font-bold tracking-[0.2em] text-xs uppercase mb-4 flex items-center gap-2">
            Selected Work
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6 leading-[1.1]">
            Project <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-emerald-500">Showcase</span>
          </h2>
          <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-2xl">
            Selected projects that demonstrate the fusion of advanced design thinking and robust engineering execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsBento;
