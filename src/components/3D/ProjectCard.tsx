import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Project } from "../../config/portfolio";
import { ExternalLink, Github, ArrowRight, Star, Calendar } from "lucide-react";
import { cn } from "../../utils/cn";

interface ProjectCardProps {
  project: Project;
  index: number;
}

const cardVariants = {
  initial: { 
    y: 100, 
    opacity: 0, 
    scale: 0.8,
    rotateX: 45 
  },
  animate: (index: number) => ({
    y: 0,
    opacity: 1,
    scale: 1,
    rotateX: 0,
    transition: {
      delay: 0.1 * index,
      duration: 0.8,
      ease: [0.43, 0.13, 0.23, 0.96],
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  }),
  hover: {
    y: -20,
    scale: 1.02,
    rotateY: 5,
    transition: {
      duration: 0.4,
      ease: "easeOut",
      type: "spring",
      stiffness: 150,
    },
  },
};

const imageVariants = {
  hover: {
    scale: 1.1,
    rotateZ: 2,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const overlayVariants = {
  initial: { opacity: 0 },
  hover: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
};

const contentVariants = {
  initial: { y: 20, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.2,
      duration: 0.6,
    },
  },
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Motion values for smooth interactions
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7.5, -7.5]));
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7.5, 7.5]));

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPct = (event.clientX - rect.left) / width - 0.5;
    const mouseYPct = (event.clientY - rect.top) / height - 0.5;
    mouseX.set(mouseXPct);
    mouseY.set(mouseYPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative group cursor-pointer perspective-1000"
      variants={cardVariants}
      initial="initial"
      whileInView="animate"
      whileHover="hover"
      viewport={{ once: true, margin: "-50px" }}
      custom={index}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-shadow duration-500 border border-gray-100 dark:border-gray-700"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Gradient Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ transform: "translateZ(1px)" }}
        />

        {/* Project Image */}
        <div className="relative overflow-hidden h-56 md:h-64">
          <motion.img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover"
            variants={imageVariants}
            whileHover="hover"
          />
          
          {/* Image Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
            variants={overlayVariants}
            initial="initial"
            whileHover="hover"
          />
          
          {/* Featured Badge */}
          {project.featured && (
            <motion.div
              className="absolute top-4 left-4 bg-gradient-to-r from-primary to-secondary px-4 py-2 text-xs text-white font-medium rounded-full shadow-lg backdrop-blur-sm"
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 150 }}
              whileHover={{ scale: 1.1, rotate: 2 }}
            >
              <Star size={12} className="inline mr-1" />
              Featured
            </motion.div>
          )}
          
          {/* Hover Actions */}
          <motion.div
            className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            variants={overlayVariants}
            initial="initial"
            whileHover="hover"
          >
            {project.sourceUrl && (
              <motion.a
                href={project.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-colors"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                aria-label="View Source Code"
              >
                <Github size={16} />
              </motion.a>
            )}
            {project.demoUrl && (
              <motion.a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-colors"
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
                aria-label="View Demo"
              >
                <ExternalLink size={16} />
              </motion.a>
            )}
          </motion.div>
        </div>
        
        {/* Content */}
        <motion.div
          className="p-6"
          variants={contentVariants}
          initial="initial"
          animate="animate"
          style={{ transform: "translateZ(20px)" }}
        >
          <div className="flex justify-between items-start mb-3">
            <motion.h3 
              className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary dark:group-hover:text-primary-dark transition-colors duration-300"
              whileHover={{ x: 5 }}
            >
              {project.title}
            </motion.h3>
            
            {/* Date Badge (placeholder) */}
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <Calendar size={12} className="mr-1" />
              <span>2024</span>
            </div>
          </div>
          
          <motion.p 
            className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {project.description}
          </motion.p>
          
          {/* Technologies */}
          <motion.div 
            className="flex flex-wrap gap-2 mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {project.technologies.slice(0, 4).map((tech, techIndex) => (
              <motion.span
                key={tech}
                className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 px-3 py-1 text-xs rounded-full font-medium text-gray-700 dark:text-gray-300 hover:from-primary/10 hover:to-secondary/10 transition-all duration-300"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 + techIndex * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                {tech}
              </motion.span>
            ))}
            {project.technologies.length > 4 && (
              <motion.span
                className="bg-gray-100 dark:bg-gray-700 px-3 py-1 text-xs rounded-full text-gray-500 dark:text-gray-400"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                +{project.technologies.length - 4} more
              </motion.span>
            )}
          </motion.div>
          
          {/* Actions */}
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              {project.sourceUrl && (
                <motion.a
                  href={project.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors group/btn"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="View Source Code"
                >
                  <Github size={16} className="group-hover/btn:text-primary transition-colors" />
                </motion.a>
              )}
              {project.demoUrl && (
                <motion.a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors group/btn"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="View Demo"
                >
                  <ExternalLink size={16} className="group-hover/btn:text-primary transition-colors" />
                </motion.a>
              )}
            </div>
            
            <motion.a
              href={project.demoUrl || project.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center text-sm font-medium group/link",
                "text-primary dark:text-primary-dark hover:underline"
              )}
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              View Project 
              <motion.div
                animate={{ x: isHovered ? 5 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowRight size={16} className="ml-1 group-hover/link:translate-x-1 transition-transform" />
              </motion.div>
            </motion.a>
          </div>
        </motion.div>

        {/* Shimmer Effect */}
        <motion.div
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none"
          style={{ transform: "translateZ(1px)" }}
        />

        {/* Bottom Gradient */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ transform: "translateZ(1px)" }}
        />
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;