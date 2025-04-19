import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../utils/cn";
import { projects } from "../../config/portfolio";
import { ChevronLeft, ChevronRight } from "lucide-react";

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const ProjectsCarousel: React.FC = () => {
  const [[page, direction], setPage] = useState([0, 0]);
  const [intervalId, setIntervalId] = useState<number | null>(null);
  
  // Wrap to ensure page is always between 0 and projects.length - 1
  const projectIndex = ((page % projects.length) + projects.length) % projects.length;
  
  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
    
    // Reset autoplay timer when user manually changes slide
    if (intervalId) {
      clearInterval(intervalId);
      startAutoPlay();
    }
  };
  
  // Auto-play function
  const startAutoPlay = () => {
    const id = window.setInterval(() => {
      setPage((prevState) => [prevState[0] + 1, 1]);
    }, 5000);
    setIntervalId(id);
  };
  
  // Start autoplay on mount
  useEffect(() => {
    startAutoPlay();
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, []);
  
  // Pause autoplay on hover
  const handleMouseEnter = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };
  
  // Resume autoplay on mouse leave
  const handleMouseLeave = () => {
    if (!intervalId) {
      startAutoPlay();
    }
  };

  return (
    <div
      className="relative w-full h-[500px] overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className="absolute w-full h-full flex items-center justify-center"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = Math.abs(offset.x) * velocity.x;
            
            if (swipe < -5000) {
              paginate(1);
            } else if (swipe > 5000) {
              paginate(-1);
            }
          }}
        >
          <div className="relative w-full h-full">
            <img
              src={projects[projectIndex].thumbnail}
              alt={projects[projectIndex].title}
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <h3 className="text-3xl font-bold mb-4">{projects[projectIndex].title}</h3>
              <p className="text-gray-200 mb-6 max-w-2xl">{projects[projectIndex].description}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {projects[projectIndex].technologies.map((tech) => (
                  <span
                    key={tech}
                    className="bg-white/10 backdrop-blur-sm px-3 py-1 text-sm rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="flex space-x-4">
                {projects[projectIndex].demoUrl && (
                  <a
                    href={projects[projectIndex].demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "px-6 py-2 rounded-full font-medium",
                      "bg-primary hover:bg-primary/90 transition-colors"
                    )}
                  >
                    View Demo
                  </a>
                )}
                {projects[projectIndex].sourceUrl && (
                  <a
                    href={projects[projectIndex].sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "px-6 py-2 rounded-full font-medium",
                      "bg-white/10 hover:bg-white/20 transition-colors"
                    )}
                  >
                    Source Code
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      
      {/* Navigation Arrows */}
      <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
        <motion.button
          className="w-12 h-12 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-sm text-white cursor-pointer pointer-events-auto"
          onClick={() => paginate(-1)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft size={24} />
        </motion.button>
        <motion.button
          className="w-12 h-12 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-sm text-white cursor-pointer pointer-events-auto"
          onClick={() => paginate(1)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight size={24} />
        </motion.button>
      </div>
      
      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {projects.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === projectIndex ? "bg-white" : "bg-white/30"
            }`}
            onClick={() => setPage([index, index > projectIndex ? 1 : -1])}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectsCarousel;