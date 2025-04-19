import React from "react";
import { motion } from "framer-motion";
import { personalInfo, socialLinks } from "../../config/portfolio";
import { Github, Linkedin, Twitter, Heart } from "lucide-react";

const Footer: React.FC = () => {
  // Current year for copyright
  const year = new Date().getFullYear();

  // Render appropriate icon for social link
  const renderSocialIcon = (iconName: string) => {
    switch (iconName) {
      case "Github":
        return <Github size={20} />;
      case "Linkedin":
        return <Linkedin size={20} />;
      case "Twitter":
        return <Twitter size={20} />;
      default:
        return null;
    }
  };

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 py-12 mt-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              {personalInfo.name.split(" ")[0]}
              <span className="text-primary dark:text-primary-dark">.</span>
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-xs">
              {personalInfo.bio.split('.')[0]}.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'About', 'Projects', 'Skills', 'Contact'].map((item) => (
                <li key={item}>
                  <motion.a
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-dark transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    {item}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <p className="text-gray-600 dark:text-gray-400 mb-2">{personalInfo.email}</p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{personalInfo.location}</p>
            
            <div className="flex space-x-4 mt-4">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-dark transition-colors"
                  whileHover={{ y: -2, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={link.name}
                >
                  {renderSocialIcon(link.icon)}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            © {year} {personalInfo.name}. All rights reserved.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm flex items-center mt-4 md:mt-0">
            Made with <Heart size={16} className="mx-1 text-red-500" /> in React & Three.js
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;