import React from "react";
import { motion } from "framer-motion";
import { personalInfo, quickFacts } from "../config/portfolio";

const About: React.FC = () => {
  return (
    <section id="about" className="scroll-mt-20 py-24 sm:py-32">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-500">
            About
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            A bit about me
          </h2>
        </motion.div>

        <div className="mt-10 grid gap-10 lg:grid-cols-5 lg:gap-14">
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
              {personalInfo.bio}
            </p>
            <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
              When I'm not shipping features, I'm usually exploring new tools,
              refining my craft, and learning how great products are built.
            </p>
          </motion.div>

          <motion.dl
            className="grid grid-cols-2 gap-4 lg:col-span-2"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {quickFacts.map((fact) => (
              <div key={fact.label} className="card-surface p-5">
                <dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  {fact.label}
                </dt>
                <dd className="mt-1.5 font-medium text-slate-800 dark:text-slate-100">
                  {fact.value}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>
    </section>
  );
};

export default About;
