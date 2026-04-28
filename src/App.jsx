import React from "react";
import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutCanvas from "./components/AboutCanvas";
import ProjectTimeline from "./components/ProjectTimeline";
import ProjectsBento from "./components/ProjectsBento";
import Blog from "./components/Blog";
import TechMarquee from "./components/TechMarquee";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
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
        <FadeIn>
          <ProjectTimeline timeline={data.project_timeline} />
        </FadeIn>
        <div id="projects">
          <FadeIn><ProjectsBento projects={data.projects} /></FadeIn>
        </div>
        <div id="blog">
          <FadeIn><Blog /></FadeIn>
        </div>
        <div id="stack">
          <FadeIn><TechMarquee stack={data.tech_stack} /></FadeIn>
        </div>
        <div id="contact">
          <FadeIn><Contact personal={data.personal} /></FadeIn>
        </div>
      </main>
      <FadeIn><Footer /></FadeIn>
      <BackToTop />
    </div>
  );
}

export default App;
