import React from "react";
import { ArrowUpRight, Mail } from "lucide-react";

const Github = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

const Linkedin = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

const Contact = ({ personal }) => {
  return (
    <section aria-label="Contact" id="contact" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="glass-premium p-8 md:p-16 lg:p-24 rounded-[2rem] md:rounded-[4rem] border border-slate-100 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 overflow-hidden relative shadow-liquid">
          {/* Subtle Glow */}
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-400/5 blur-[100px] -translate-x-1/2 -translate-y-1/2" />
          
          <div className="max-w-xl text-center lg:text-left relative z-10">
            <span className="text-cyan-600 font-bold tracking-[0.2em] text-xs uppercase mb-6 flex items-center justify-center lg:justify-start gap-2">
              Get in touch
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
            </span>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-slate-900 mb-6 md:mb-8 leading-[1.1]">
              Ready to start the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-emerald-500">next project?</span>
            </h2>
            <p className="text-slate-500 text-base md:text-lg font-medium mb-10 md:mb-12 leading-relaxed">
              I'm always looking for ambitious collaborations where design and engineering collide. Let's build something extraordinary together.
            </p>
            <a 
              href={`mailto:${personal.email}`}
              aria-label="Send email"
              className="inline-flex items-center gap-4 text-lg md:text-xl font-display font-bold text-slate-900 hover:text-cyan-600 transition-liquid group break-all md:break-normal"
            >
              <div className="p-3 bg-slate-900 text-white rounded-xl group-hover:bg-cyan-600 transition-liquid shadow-lg shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              {personal.email}
            </a>
          </div>

          <div className="flex flex-col gap-5 w-full md:w-80 relative z-10">
            {[
              { label: "LinkedIn", icon: <Linkedin className="w-5 h-5" />, href: personal.social.linkedin },
              { label: "GitHub", icon: <Github className="w-5 h-5" />, href: personal.social.github },
              { label: "Download CV", icon: <ArrowUpRight className="w-5 h-5" />, href: "#" },
            ].map((link) => (
              <a 
                key={link.label}
                href={link.href}
                aria-label={link.label}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex items-center justify-between gap-12 glass-premium px-8 py-5 rounded-[1.5rem] hover:bg-white transition-liquid border border-slate-100 shadow-sm group hover:shadow-liquid hover:border-cyan-200"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-slate-50 rounded-xl group-hover:bg-cyan-50 group-hover:text-cyan-600 transition-liquid">
                    {link.icon}
                  </div>
                  <span className="font-bold text-slate-700">{link.label}</span>
                </div>
                <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-cyan-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-liquid" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
