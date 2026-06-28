import React from "react";
import { motion } from "framer-motion";
import { skills, type Skill } from "../config/portfolio";
import SectionHeading from "../components/SectionHeading";

const categoryOrder: Skill["category"][] = [
  "AI & ML",
  "Backend",
  "Data & Cloud",
  "Languages",
  "Frontend",
  "Tools",
];

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

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {grouped.map((group, i) => (
            <motion.div
              key={group.category}
              className="group rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 p-8 shadow-2xl transition-all duration-500 hover:border-[#EA580C]/40 hover:shadow-[0_0_30px_rgba(234,88,12,0.1)]"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="mb-6 text-sm font-bold uppercase tracking-[0.2em] text-white/50 group-hover:text-[#EA580C] transition-colors">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {group.items.map((skill) => (
                  <span
                    key={skill.name}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
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
