import React, { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "../lib/utils";

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
      aria-label="Main navigation"
      initial={{ y: -100, opacity: 0 }}
      animate={{ 
        y: isVisible ? 0 : -100, 
        opacity: isVisible ? 1 : 0 
      }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      className="fixed top-6 md:top-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none w-full max-w-fit px-4"
    >
      <div className="glass-premium px-6 md:px-10 py-3 md:py-4 rounded-full flex items-center pointer-events-auto border border-slate-200/50 shadow-liquid mx-auto">
        <div className="flex items-center gap-6 md:gap-8 overflow-hidden">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={cn(
                "text-[10px] md:text-[11px] font-bold text-slate-500 hover:text-cyan-600 transition-liquid uppercase tracking-[0.15em] md:tracking-[0.25em] whitespace-nowrap block"
              )}
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
