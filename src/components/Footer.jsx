import React from "react";

const Footer = () => {
  return (
    <footer className="py-16 bg-white border-t border-slate-100">
      <div className="container mx-auto px-6 flex flex-col items-center justify-center">
        <div className="flex flex-col gap-2 items-center text-center">
          <p className="text-slate-900 font-display font-bold text-lg tracking-tight">Irfan Fahrurohman</p>
          <p className="text-slate-400 text-sm font-medium uppercase tracking-[0.2em]">Designer & DevOps Engineer</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
