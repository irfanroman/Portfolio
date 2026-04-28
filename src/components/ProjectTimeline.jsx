import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, Calendar, Sparkles, Box, GitCommit, ChevronDown } from "lucide-react";
import { cn } from "../lib/utils";

const ProjectTimeline = ({ timeline }) => {
  // Extract unique years from timeline and current year
  const availableYears = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const years = new Set([currentYear]);
    timeline.forEach(item => {
      const year = new Date(item.date).getFullYear();
      years.add(year);
    });
    return Array.from(years).sort((a, b) => b - a);
  }, [timeline]);

  const [selectedYear, setSelectedYear] = useState(availableYears[0]);
  const [hoveredDay, setHoveredDay] = useState(null);

  // Generate grid data based on selected year
  const gridData = useMemo(() => {
    const today = new Date();
    const isCurrentYear = selectedYear === today.getFullYear();
    const days = [];
    
    // Always start from Jan 1st of the selected year for consistency
    const startDate = new Date(selectedYear, 0, 1);
    const totalDays = 371; // 53 weeks to ensure the grid is full
    
    // Adjust to nearest Sunday
    const dayOfWeek = startDate.getDay();
    startDate.setDate(startDate.getDate() - dayOfWeek);

    for (let i = 0; i < totalDays; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      
      const dateStr = currentDate.toISOString().split("T")[0];
      const milestone = timeline.find(t => t.date === dateStr);
      
      days.push({
        date: currentDate,
        dateStr,
        level: milestone ? milestone.level : 0,
        note: milestone ? milestone.note : null,
        isFuture: currentDate > today,
        isOtherYear: currentDate.getFullYear() !== selectedYear
      });
    }
    return days;
  }, [timeline, selectedYear]);

  const stats = useMemo(() => {
    const yearMilestones = timeline.filter(t => new Date(t.date).getFullYear() === selectedYear);
    return {
      total: yearMilestones.length,
      maxLevel: Math.max(...yearMilestones.map(t => t.level), 0)
    };
  }, [timeline, selectedYear]);

  const weeks = [];
  for (let i = 0; i < gridData.length; i += 7) {
    weeks.push(gridData.slice(i, i + 7));
  }

  const getLevelColor = (level) => {
    switch (level) {
      case 1: return "bg-cyan-200/40 border-cyan-300/20";
      case 2: return "bg-cyan-400/60 border-cyan-400/30";
      case 3: return "bg-cyan-600/80 border-cyan-500/40";
      case 4: return "bg-cyan-700 border-cyan-600/50 shadow-[0_0_10px_rgba(6,182,212,0.3)]";
      default: return "bg-slate-50 border-slate-100";
    }
  };

  return (
    <section aria-label="Project Timeline" id="timeline" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20 relative">
          {/* Editorial Section Label */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="absolute -top-12 left-0"
          >
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-[0.4em]">Section / 03</span>
          </motion.div>

          <div className="max-w-2xl">
            
            <h2 className="text-5xl md:text-6xl font-editorial italic text-slate-900 leading-[1] mb-6 tracking-tighter">
              Project <span className="text-cyan-600">Archive</span> & <br />
              Activity <span className="relative">
                Journey
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
          
          <div className="flex flex-wrap items-center gap-4 lg:mb-2">
            {/* Year Selector Tabs with Archive Dropdown */}
            <div className="flex p-1.5 bg-slate-100/80 backdrop-blur-md rounded-2xl border border-slate-200/50 items-center">
              {availableYears.length > 3 && (
                <div className="relative group/archive px-2 border-r border-slate-200/50 mr-1">
                  <button className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-black transition-all duration-300 uppercase tracking-widest",
                    availableYears.slice(3).includes(selectedYear)
                      ? "bg-white text-cyan-600 shadow-sm border border-slate-200"
                      : "text-slate-400 hover:text-slate-600"
                  )}>
                    {availableYears.slice(3).includes(selectedYear) ? selectedYear : "Archive"}
                    <ChevronDown className="w-3 h-3 transition-transform group-hover/archive:rotate-180" />
                  </button>
                  
                  {/* Dropdown Menu */}
                  <div className="absolute top-full left-0 mt-2 w-32 bg-white/90 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover/archive:opacity-100 group-hover/archive:translate-y-0 group-hover/archive:pointer-events-auto transition-all duration-300 z-[60] p-1.5">
                    {availableYears.slice(3).map((year) => (
                      <button
                        key={year}
                        onClick={() => setSelectedYear(year)}
                        className={cn(
                          "w-full text-left px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors",
                          selectedYear === year 
                            ? "bg-cyan-50 text-cyan-600" 
                            : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                        )}
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Recent years sorted chronologically */}
              {availableYears.slice(0, 3).reverse().map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-xs font-black transition-all duration-300 uppercase tracking-widest",
                    selectedYear === year 
                      ? "bg-white text-cyan-600 shadow-sm border border-slate-200" 
                      : "text-slate-400 hover:text-slate-600"
                  )}
                >
                  {year}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-6 p-4 rounded-2xl bg-slate-50/50 border border-slate-100">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Legend</span>
                <div className="flex items-center gap-1.5">
                  {[0, 1, 2, 3, 4].map((level) => (
                    <div 
                      key={level} 
                      className={cn(
                        "w-3.5 h-3.5 rounded-[3px] border",
                        level === 0 ? "bg-slate-100 border-slate-200" : getLevelColor(level)
                      )} 
                    />
                  ))}
                </div>
              </div>
              <div className="w-px h-8 bg-slate-200" />
              <div className="flex flex-col min-w-[80px]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total</span>
                <span className="text-sm font-black text-slate-800">{stats.total} Milestones</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative group">
          {/* Glass Card Container */}
          <div className="glass-premium p-8 md:p-12 pt-20 md:pt-24 rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/40 overflow-x-auto no-scrollbar relative">
            <div className="min-w-[850px] flex flex-col gap-6">
              
              {/* Month Labels */}
              <div className="relative h-6 ml-12 mb-2">
                 {weeks.map((week, i) => {
                   const day = week[0].date;
                   const prevWeek = weeks[i - 1];
                   const nextWeek = weeks[i + 1];
                   const isNewMonth = !prevWeek || day.getMonth() !== prevWeek[0].date.getMonth();
                   
                   const nextMonthTooClose = nextWeek && nextWeek[0].date.getMonth() !== day.getMonth();
                   if (isNewMonth && i === 0 && nextMonthTooClose) return null;

                   if (isNewMonth) {
                     return (
                       <div 
                         key={i} 
                         className="absolute bottom-0 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap"
                         style={{ left: `${i * 17}px` }}
                       >
                         {day.toLocaleDateString('en-US', { month: 'short' })}
                       </div>
                     );
                   }
                   return null;
                 })}
              </div>

              {/* Day Labels + Grid Row */}
              <div className="flex gap-4">
                <div className="w-8 flex flex-col gap-[3px] text-[9px] font-bold text-slate-300 uppercase h-[116px] shrink-0">
                  <div className="h-3.5" />
                  <div className="h-3.5 flex items-center">Mon</div>
                  <div className="h-3.5" />
                  <div className="h-3.5 flex items-center">Wed</div>
                  <div className="h-3.5" />
                  <div className="h-3.5 flex items-center">Fri</div>
                  <div className="h-3.5" />
                </div>
                
                {/* The Grid container */}
                <div className="flex gap-[3px]">
                  {weeks.map((week, wIndex) => (
                    <div key={wIndex} className="flex flex-col gap-[3px] shrink-0">
                      {week.map((day, dIndex) => (
                        <div key={dIndex} className="relative group/day">
                          <motion.div
                            initial={false}
                            animate={{
                              scale: hoveredDay === day.dateStr ? 1.25 : 1,
                              zIndex: hoveredDay === day.dateStr ? 20 : 1,
                              opacity: day.isOtherYear ? 0.1 : 1
                            }}
                            onMouseEnter={() => day.level > 0 && setHoveredDay(day.dateStr)}
                            onMouseLeave={() => setHoveredDay(null)}
                            className={cn(
                              "w-3.5 h-3.5 rounded-[3px] border transition-all duration-300",
                              day.isFuture ? "opacity-20 cursor-default" : "cursor-pointer",
                              getLevelColor(day.level)
                            )}
                          />
                          
                          {/* Tooltip */}
                          <AnimatePresence>
                            {hoveredDay === day.dateStr && day.note && (
                              <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 5, scale: 0.95 }}
                                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-50 pointer-events-none"
                              >
                                <div className="bg-slate-900 text-white p-3 rounded-xl shadow-2xl whitespace-nowrap border border-slate-800 backdrop-blur-md">
                                  <div className="flex items-center gap-2 mb-1">
                                    <div className={cn("w-2 h-2 rounded-full", getLevelColor(day.level))} />
                                    <span className="text-[10px] font-black uppercase tracking-tighter text-slate-400">
                                      {new Date(day.dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </span>
                                  </div>
                                  <p className="text-xs font-bold leading-tight">{day.note}</p>
                                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-slate-900" />
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-cyan-100/30 blur-3xl rounded-full" />
          <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-emerald-100/20 blur-3xl rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default ProjectTimeline;
