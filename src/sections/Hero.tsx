import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import HeroCanvas from "../components/3D/HeroCanvas";

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);

  return (
    <section id="home" className="relative overflow-hidden bg-[#1A1A2E] text-white min-h-screen flex items-center">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <HeroCanvas />
      </div>

      {/* Floating Background Icons */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-2 h-2 bg-yellow-400 rounded-full opacity-60 animate-pulse" />
        <div className="absolute top-40 right-20 w-1 h-1 bg-yellow-400 rounded-full opacity-40 animate-ping" />
        <div className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-yellow-400 rounded-full opacity-50 animate-bounce" />
        <div className="absolute bottom-20 right-10 w-1 h-1 bg-yellow-400 rounded-full opacity-30 animate-pulse" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-center max-w-6xl mx-auto">
          {/* Left Column - Text Content */}
          <motion.div 
            className="flex-1 space-y-6 text-center lg:text-left max-w-xl"
            style={{ y, opacity, scale }}
          >
            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
            >
              Creative
              <span className="block text-yellow-400">Developer</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.43, 0.13, 0.23, 0.96] }}
            >
              Crafting digital experiences with code and creativity
            </motion.p>
            
            <motion.div 
              className="pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.43, 0.13, 0.23, 0.96] }}
            >
              <a
                href="#projects"
                className="inline-flex items-center gap-3 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                View My Work
                <ArrowDown size={20} />
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column - 3D Canvas */}
          <motion.div 
            className="flex-1 flex justify-center lg:justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}
          >
            <div className="w-72 h-88 rounded-3xl overflow-hidden shadow-2xl">
              <HeroCanvas />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;