import React, { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  });

  const links = [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Blog", href: "#blog" },
    { name: "Stack", href: "#stack" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ 
        y: isVisible ? 0 : -100, 
        opacity: isVisible ? 1 : 0 
      }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      className="fixed top-6 md:top-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none w-full max-w-fit px-4"
    >
      <div className="glass-premium px-4 md:px-10 py-3 md:py-4 rounded-full flex gap-4 md:gap-12 items-center pointer-events-auto border border-slate-200/50 shadow-liquid mx-auto">
        <div className="flex items-center gap-4 md:gap-8 overflow-hidden">
          {links.map((link, idx) => (
            <a
              key={link.name}
              href={link.href}
              className={cn(
                "text-[10px] md:text-[11px] font-bold text-slate-500 hover:text-cyan-600 transition-liquid uppercase tracking-[0.15em] md:tracking-[0.25em] whitespace-nowrap",
                idx > 1 ? "hidden sm:block" : "block"
              )}
            >
              {link.name}
            </a>
          ))}
        </div>
        <div className="w-px h-4 bg-slate-200 hidden sm:block" />
        <button className="text-[10px] md:text-[11px] font-bold text-white bg-slate-900 px-4 md:px-5 py-2 md:py-2.5 rounded-full hover:bg-cyan-500 transition-liquid uppercase tracking-[0.2em] shadow-sm whitespace-nowrap">
          Menu
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
