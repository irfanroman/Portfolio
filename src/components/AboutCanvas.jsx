import React, { useRef } from "react";
import { motion } from "framer-motion";
import { 
  MousePointer2, 
  Square, 
  Type, 
  PenTool, 
  Hand, 
  Layout, 
  Layers,
  Search,
  Plus,
  Briefcase,
  GraduationCap,
  Sparkles,
  Command,
  ChevronDown
} from "lucide-react";
import { cn } from "../lib/utils";

const Toolbar = () => {
  const tools = [
    { icon: <MousePointer2 className="w-4 h-4" />, name: "Select", active: true },
    { icon: <Hand className="w-4 h-4" />, name: "Hand" },
    { icon: <Square className="w-4 h-4" />, name: "Frame" },
    { icon: <PenTool className="w-4 h-4" />, name: "Pen" },
    { icon: <Type className="w-4 h-4" />, name: "Text" },
    { icon: <Layout className="w-4 h-4" />, name: "Section" },
  ];

  return (
    <div className="absolute top-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1 p-1 glass-premium rounded-xl shadow-liquid border border-slate-200/50">
      {tools.map((tool) => (
        <button
          key={tool.name}
          className={cn(
            "p-2 rounded-lg transition-liquid hover:bg-slate-100/50",
            tool.active ? "bg-cyan-500 text-white shadow-sm" : "text-slate-500"
          )}
        >
          {tool.icon}
        </button>
      ))}
      <div className="w-px h-6 bg-slate-200 mx-1" />
      <button className="p-2 text-slate-400 hover:text-slate-600">
        <Layers className="w-4 h-4" />
      </button>
    </div>
  );
};

// --- BENTO FRAME COMPONENTS ---

const ProfileFrame = ({ personal, containerRef }) => (
  <motion.div
    drag
    dragConstraints={containerRef}
    whileDrag={{ scale: 1.02, zIndex: 50, boxShadow: "0 0 0 2px white, 0 0 0 4px #06b6d4" }}
    whileTap={{ scale: 1.02, zIndex: 50, boxShadow: "0 0 0 2px white, 0 0 0 4px #06b6d4" }}
    className="glass-premium relative p-6 rounded-[2rem] w-full max-w-[450px] shadow-node border border-white/80 cursor-grab active:cursor-grabbing group active:selection-ring"
  >
    <div className="flex items-center gap-4 mb-5">
      <div className="w-14 h-14 rounded-2xl bg-cyan-500 flex items-center justify-center border border-cyan-500/20 shadow-lg pr-0.5">
        <span className="text-xl font-black text-white">IF</span>
      </div>
      <div>
        <h3 className="text-lg font-display font-bold text-slate-900 leading-tight">{personal.name}</h3>
        <p className="text-[10px] font-bold text-cyan-600 uppercase tracking-[0.2em] mt-0.5">{personal.roles.join(" & ")}</p>
      </div>
    </div>
    <p className="text-sm text-slate-600 font-medium leading-relaxed opacity-90 italic">
      "{personal.who_is_irfan}"
    </p>
    <div className="mt-6 flex gap-2">
       {["Creative", "Systematic", "Scaled"].map(tag => (
         <span key={tag} className="text-[9px] font-bold py-1 px-3 bg-slate-50 text-slate-400 rounded-full border border-slate-100 uppercase tracking-widest">{tag}</span>
       ))}
    </div>
  </motion.div>
);

const JourneyFrame = ({ journey, containerRef }) => (
  <motion.div
    drag
    dragConstraints={containerRef}
    whileDrag={{ scale: 1.02, zIndex: 50, boxShadow: "0 0 0 2px white, 0 0 0 4px #06b6d4" }}
    whileTap={{ scale: 1.02, zIndex: 50, boxShadow: "0 0 0 2px white, 0 0 0 4px #06b6d4" }}
    className="glass-premium relative p-8 rounded-[2.5rem] w-full max-w-[420px] shadow-node border border-white/80 cursor-grab active:cursor-grabbing group active:selection-ring"
  >
    <div className="flex items-center gap-2 mb-8">
      <GraduationCap className="w-5 h-5 text-cyan-500" />
      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-600">Career Journey</span>
    </div>
    <div className="space-y-8">
      {journey.map((item) => (
        <div key={item.id} className="relative pl-6 border-l-2 border-slate-100 flex flex-col gap-1">
          <div className="absolute top-0 left-0 -translate-x-1/2 w-2.5 h-2.5 bg-cyan-500 rounded-full border-2 border-white shadow-sm" />
          <h4 className="text-[13px] font-bold text-slate-900 leading-tight">{item.label}</h4>
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{item.period}</p>
          <p className="text-[11px] text-slate-400 font-medium leading-relaxed mt-0.5">{item.description}</p>
        </div>
      ))}
    </div>
  </motion.div>
);

const ExperienceFrame = ({ experience, containerRef }) => (
  <motion.div
    drag
    dragConstraints={containerRef}
    whileDrag={{ scale: 1.02, zIndex: 50, boxShadow: "0 0 0 2px white, 0 0 0 4px #06b6d4" }}
    whileTap={{ scale: 1.02, zIndex: 50, boxShadow: "0 0 0 2px white, 0 0 0 4px #06b6d4" }}
    className="glass-premium relative p-8 rounded-[2.5rem] w-full max-w-[420px] shadow-node border border-white/80 cursor-grab active:cursor-grabbing group active:selection-ring"
  >
    <div className="flex items-center gap-2 mb-8">
      <Briefcase className="w-5 h-5 text-cyan-600" />
      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-600">Experience</span>
    </div>
    <div className="space-y-8">
      {experience.map((item) => (
        <div key={item.id} className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h4 className="text-md font-display font-bold text-slate-900">{item.title}</h4>
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400/10" />
          </div>
          <p className="text-[12px] text-slate-500 font-medium leading-relaxed">{item.description}</p>
        </div>
      ))}
    </div>
  </motion.div>
);

// --- MAIN CANVAS COMPONENT ---

const AboutCanvas = ({ journey, experience_projects, personal }) => {
  const containerRef = useRef(null);

  return (
    <section id="about" className="relative py-20 bg-white">
      <div className="container mx-auto px-6 mb-12 text-center">
         <span className="text-cyan-600 font-bold tracking-[0.2em] text-xs uppercase mb-4 block">Workspace Archive</span>
         <h2 className="text-4xl font-display font-bold text-slate-900">My Journeys</h2>
      </div>

      <div className="container mx-auto px-4 lg:px-12">
        <div 
          className="relative min-h-[700px] h-auto w-full border border-slate-200/60 rounded-[3rem] bg-white canvas-grid p-8 shadow-sm transition-all overflow-visible"
        >
          {/* Internal Canvas Surface */}
          <div ref={containerRef} className="relative w-full h-full p-4 lg:p-20 overflow-visible flex flex-col items-center">
            
            <Toolbar />

            {/* STRUCTURED GRID LAYOUT ON CANVAS */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 max-w-7xl w-full h-fit mt-20 pb-20">
              {/* Left Column: About + Experience */}
              <div className="flex flex-col gap-10 lg:gap-16">
                <ProfileFrame personal={personal} containerRef={containerRef} />
                <ExperienceFrame experience={experience_projects} containerRef={containerRef} />
              </div>

              {/* Right Column: Journey */}
              <div className="flex justify-start lg:justify-end">
                <JourneyFrame journey={journey} containerRef={containerRef} />
              </div>
            </div>

             {/* UI HUD DECORATIONS */}
            <div className="absolute top-8 left-8 hidden md:flex items-center gap-3">
              <div className="glass-premium p-2 px-3 rounded-lg text-slate-500 border border-slate-100 flex items-center gap-2">
                <Command className="w-3.5 h-3.5" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-slate-900">About_v4</span>
              </div>
              <div className="glass-premium p-2 px-3 rounded-lg text-slate-400 border border-slate-100 flex items-center gap-2">
                <span className="text-[9px] font-bold uppercase tracking-widest text-slate-900">Artboard 1</span>
                <ChevronDown className="w-3 h-3" />
              </div>
            </div>

            <div className="absolute bottom-10 right-10 hidden md:flex items-center gap-6 glass-premium p-2.5 px-5 rounded-2xl text-slate-400 text-[9px] font-bold uppercase tracking-widest">
              <div className="flex items-center gap-4">
                <button className="p-1 hover:text-cyan-600 transition-colors"><Search className="w-3 h-3" /></button>
                <span className="text-cyan-600 font-black">100%</span>
                <button className="p-1 hover:text-cyan-600 transition-colors"><Plus className="w-3 h-3" /></button>
              </div>
              <div className="w-px h-5 bg-slate-200" />
              <span className="flex items-center gap-2">
                <Layout className="w-3 h-3" /> 
                Live
              </span>
            </div>

            <div className="absolute top-8 right-8 hidden md:flex items-center gap-3 glass-premium p-2 px-3 rounded-lg text-slate-400 border border-slate-100">
               <span className="text-[9px] font-bold uppercase tracking-widest">Published</span>
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCanvas;
