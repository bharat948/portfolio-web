import React from "react";
import { personalInfo } from "../config/portfolio";
import { Mail } from "lucide-react";

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-[#1A1A2E] text-white min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            About Me
          </h2>
          <div className="h-1 w-20 bg-yellow-400 mx-auto mb-6" />
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-center max-w-6xl mx-auto">
          {/* Left Column - Text Content */}
          <div className="flex-1 space-y-6 text-center lg:text-left max-w-xl">
            {/* Greeting */}
            <p className="text-yellow-400 text-lg font-medium">
              Hello, Welcome
            </p>
            
            {/* Name/Headline */}
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              I'm {personalInfo.name}
            </h3>
            
            {/* Description */}
            <p className="text-gray-300 text-lg leading-relaxed">
              {personalInfo.bio}
            </p>
            
            {/* Contact Button */}
            <div className="pt-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-3 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                <Mail size={20} />
                Contact us
              </a>
            </div>
          </div>

          {/* Right Column - Portrait Image */}
          <div className="flex-1 flex justify-center lg:justify-center">
            <div className="relative">
              <div className="w-72 h-88 rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={personalInfo.avatar}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Decorative accent */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
