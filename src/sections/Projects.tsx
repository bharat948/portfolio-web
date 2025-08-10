import React from "react";
import { motion, useInView } from "framer-motion";
import { projects } from "../config/portfolio";
import { Github, ExternalLink } from "lucide-react";
import ProjectCard from "../components/3D/ProjectCard";

const Projects: React.FC = () => {
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

  return (
    <section id="projects" className="py-20 bg-[#1A1A2E] text-white min-h-screen flex items-center">
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
            My Projects
          </motion.h2>
          <motion.div
            className="h-1 w-20 bg-yellow-400 mx-auto mb-6"
            variants={itemVariants}
          />
          <motion.p
            className="text-lg text-gray-300 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Explore my latest work and creative solutions
          </motion.p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Featured Projects Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {projects
              .filter((project) => project.featured)
              .map((project, index) => (
                <motion.div key={project.id} variants={itemVariants}>
                  <ProjectCard project={project} index={index} />
                </motion.div>
              ))}
          </motion.div>

          {/* All Projects Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {projects.map((project) => (
              <motion.div
                key={project.id}
                className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 group"
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-yellow-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-yellow-400/20 text-yellow-400 text-sm rounded-full border border-yellow-400/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded-lg transition-all duration-300 text-sm"
                      >
                        <ExternalLink size={16} />
                        Demo
                      </a>
                    )}
                    {project.sourceUrl && (
                      <a
                        href={project.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 text-sm border border-white/20"
                      >
                        <Github size={16} />
                        Code
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
