import React from "react";
import { motion } from "framer-motion";
import { skills, type Skill } from "../config/portfolio";
import SectionHeading from "../components/SectionHeading";

const categoryOrder: Skill["category"][] = ["Frontend", "Backend", "Tools", "Design"];

const Skills: React.FC = () => {
  const grouped = categoryOrder
    .map((category) => ({
      category,
      items: skills.filter((skill) => skill.category === category),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <section id="skills" className="scroll-mt-20 py-24 sm:py-32">
      <div className="section-shell">
        <SectionHeading eyebrow="Skills" title="Tools I work with" />

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {grouped.map((group, i) => (
            <motion.div
              key={group.category}
              className="card-surface p-6"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                {group.category}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {group.items.map((skill) => (
                  <span
                    key={skill.name}
                    className="rounded-lg border border-slate-200 bg-white/50 px-3.5 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:border-brand-300 hover:text-brand-600 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-200 dark:hover:border-brand-400/50 dark:hover:text-brand-300"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
