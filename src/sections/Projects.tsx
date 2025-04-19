import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ProjectCard from "../components/3D/ProjectCard";
import ProjectsCarousel from "../components/3D/ProjectsCarousel";
import { projects } from "../config/portfolio";

const Projects: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
  const titleVariants = {
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
    <section id="projects" className="py-20">
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
            variants={titleVariants}
          >
            My Projects
          </motion.h2>
          <motion.div 
            className="h-1 w-20 bg-primary mx-auto mb-6"
            variants={titleVariants}
          />
          <motion.p 
            className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            variants={titleVariants}
          >
            Explore a selection of my work showcasing my expertise in interactive 3D experiences and web development.
          </motion.p>
        </motion.div>
        
        {/* Featured Project Carousel */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-6">Featured Projects</h3>
          <ProjectsCarousel />
        </div>
        
        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;