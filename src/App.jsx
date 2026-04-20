import React from "react";
import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutCanvas from "./components/AboutCanvas";
import ProjectsBento from "./components/ProjectsBento";
import Blog from "./components/Blog";
import TechMarquee from "./components/TechMarquee";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import data from "./data.json";

const FadeIn = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
  >
    {children}
  </motion.div>
);

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <FadeIn><Hero personal={data.personal} /></FadeIn>
        <FadeIn>
          <AboutCanvas 
            journey={data.career_journey} 
            experience_projects={data.experience_projects}
            personal={data.personal}
          />
        </FadeIn>
        <FadeIn><ProjectsBento projects={data.projects} /></FadeIn>
        <FadeIn><Blog /></FadeIn>
        <FadeIn><TechMarquee stack={data.tech_stack} /></FadeIn>
        <FadeIn><Contact personal={data.personal} /></FadeIn>
      </main>
      <FadeIn><Footer /></FadeIn>
    </div>
  );
}

export default App;
