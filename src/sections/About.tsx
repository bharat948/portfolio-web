import React from "react";
import { motion } from "framer-motion";
import { personalInfo, quickFacts } from "../config/portfolio";
import SectionHeading from "../components/SectionHeading";

const About: React.FC = () => {
  return (
    <section id="about" className="scroll-mt-20 py-24 sm:py-32">
      <div className="section-shell">
        <SectionHeading eyebrow="About" title="A bit about me" />

        <div className="mt-10 max-w-md">
          <motion.div
            className="flex flex-col justify-center rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 p-6 sm:p-8 shadow-2xl ring-1 ring-inset ring-white/5"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="text-xl sm:text-2xl lg:text-3xl leading-snug font-medium text-white/90">
              I build <span className="text-[#EA580C]">Agentic</span> and <span className="text-[#EA580C]">AI workflow</span> applications.
            </h3>
            <p className="mt-4 text-base text-white/60 font-light">
              A software developer with deep expertise in crafting intelligent systems and automated workflows.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
