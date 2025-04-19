import React from "react";
import { motion } from "framer-motion";
import { personalInfo } from "../config/portfolio";
import HeroCanvas from "../components/3D/HeroCanvas";
import { ArrowDown } from "lucide-react";

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen">
      {/* 3D Background */}
      <HeroCanvas />
      
      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white z-10 p-4">
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-center mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {personalInfo.name}
        </motion.h1>
        
        <motion.div
          className="h-1 w-20 bg-primary mb-6"
          initial={{ width: 0 }}
          animate={{ width: 80 }}
          transition={{ duration: 1, delay: 0.8 }}
        />
        
        <motion.h2
          className="text-xl md:text-2xl text-center mb-8 max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {personalInfo.title}
        </motion.h2>
        
        <motion.p
          className="text-lg text-center max-w-2xl mb-12 text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          {personalInfo.bio}
        </motion.p>
        
        <motion.a
          href="#about"
          className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          whileHover={{ y: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowDown className="text-white" />
        </motion.a>
      </div>
    </section>
  );
};

export default Hero;