import React from "react";
import { motion, useInView } from "framer-motion";
import { skills } from "../config/portfolio";
import SkillsCanvas from "../components/3D/SkillsCanvas";

const Skills: React.FC = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    },
  };

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  const categoryLabels = {
    frontend: "Frontend Development",
    backend: "Backend Development",
    design: "Design & UX",
    other: "Other Skills",
  };

  return (
    <section id="skills" className="py-20 bg-[#1A1A2E] text-white min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            variants={itemVariants}
          >
            My Skills
          </motion.h2>
          <motion.div
            className="h-1 w-20 bg-yellow-400 mx-auto mb-6"
            variants={itemVariants}
          />
          <motion.p
            className="text-lg text-gray-300 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Technologies and tools I use to bring ideas to life
          </motion.p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Left Column - Skills List */}
            <motion.div
              className="flex-1 space-y-8"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
                <motion.div key={category} variants={itemVariants}>
                  <h3 className="text-xl font-semibold mb-4 text-yellow-400 capitalize">
                    {categoryLabels[category as keyof typeof categoryLabels]}
                  </h3>
                  <div className="space-y-3">
                    {categorySkills.map((skill) => (
                      <div key={skill.name} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-white">{skill.name}</span>
                          <span className="text-sm text-gray-400">{skill.proficiency}%</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2">
                          <motion.div
                            className="bg-yellow-400 h-2 rounded-full"
                            initial={{ width: 0 }}
                            animate={isInView ? { width: `${skill.proficiency}%` } : { width: 0 }}
                            transition={{ duration: 1, delay: 0.5 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Right Column - 3D Skills Visualization */}
            <motion.div
              className="flex-1 flex justify-center lg:justify-center"
              variants={itemVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <div className="w-72 h-88 rounded-3xl overflow-hidden shadow-2xl">
                <SkillsCanvas />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
