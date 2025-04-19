import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Project } from "../../config/portfolio";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { cn } from "../../utils/cn";

interface ProjectCardProps {
  project: Project;
  index: number;
}

const cardVariants = {
  initial: { y: 50, opacity: 0 },
  animate: (index: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.1 * index,
      duration: 0.5,
      ease: [0.43, 0.13, 0.23, 0.96],
    },
  }),
  hover: {
    y: -10,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cardRef}
      className="relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-shadow duration-300"
      variants={cardVariants}
      initial="initial"
      whileInView="animate"
      whileHover="hover"
      viewport={{ once: true }}
      custom={index}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Project Image */}
      <div className="relative overflow-hidden h-48 md:h-64">
        <motion.img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Overlay for featured projects */}
        {project.featured && (
          <div className="absolute top-4 left-4 bg-primary px-3 py-1 text-xs text-white font-medium rounded-full">
            Featured
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
          {project.description}
        </p>
        
        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="bg-gray-100 dark:bg-gray-700 px-2 py-1 text-xs rounded-md"
            >
              {tech}
            </span>
          ))}
        </div>
        
        {/* Actions */}
        <div className="flex justify-between items-center mt-4">
          <div className="flex space-x-2">
            {project.sourceUrl && (
              <a
                href={project.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                aria-label="View Source Code"
              >
                <Github size={16} />
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                aria-label="View Demo"
              >
                <ExternalLink size={16} />
              </a>
            )}
          </div>
          
          <motion.a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center text-sm font-medium",
              "text-primary dark:text-primary-dark hover:underline"
            )}
            animate={{ x: isHovered ? 5 : 0 }}
            transition={{ duration: 0.2 }}
          >
            View Project <ArrowRight size={16} className="ml-1" />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;