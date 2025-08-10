import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "../../utils/cn";
import { appRepo } from "../../config/appRepo";
import { Menu, X, Github, Linkedin, Twitter, Moon, Sun } from "lucide-react";

const Header: React.FC<{ darkMode: boolean, toggleTheme: () => void }> = ({ darkMode, toggleTheme }) => {
  const { personalInfo, socialLinks } = appRepo;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  
  // Better scroll-based background transitions
  const headerBg = useTransform(
    scrollY,
    [0, 100],
    ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.95)"]
  );
  
  const headerBlur = useTransform(
    scrollY,
    [0, 100],
    ["blur(0px)", "blur(10px)"]
  );
  
  const headerShadow = useTransform(
    scrollY,
    [0, 100],
    ["0 0 0 rgba(0, 0, 0, 0)", "0 8px 32px rgba(0, 0, 0, 0.3)"]
  );

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Close mobile menu when user clicks anywhere outside the menu
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (mobileMenuOpen && e.target) {
        const target = e.target as HTMLElement;
        if (!target.closest('.mobile-menu') && !target.closest('.menu-button')) {
          setMobileMenuOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [mobileMenuOpen]);

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
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out"
      style={{
        backgroundColor: headerBg,
        backdropFilter: headerBlur,
        WebkitBackdropFilter: headerBlur,
        boxShadow: headerShadow,
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)"
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <motion.div
          className="text-2xl font-bold text-white ml-[80px] font-serif"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
        >
          {personalInfo.name.split(" ")[0]}
          <span className="text-primary">.</span>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 mr-8">
          {['Home', 'About', 'Projects', 'Skills', 'Contact'].map((item, index) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="font-medium text-white/90 hover:text-white transition-all duration-300 relative group"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              {item}
              <motion.div
                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white/60 group-hover:w-full transition-all duration-300"
                whileHover={{ width: "100%" }}
              />
            </motion.a>
          ))}
        </nav>

        {/* Theme Toggle Button (Nav) */}
        <div className="relative group ml-4">
          <button
            className="p-2 rounded-full bg-white dark:bg-gray-800 text-primary dark:text-primary-dark shadow-md focus:outline-none focus:ring-2 focus:ring-primary"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
            Theme
          </span>
        </div>

        {/* Social Links */}
        <div className="hidden md:flex space-x-6 mr-8">
          {socialLinks.slice(0, 3).map((link, index) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-white/80 hover:text-primary transition-all duration-300 rounded-full hover:bg-white/10"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ y: -2, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label={link.name}
            >
              {renderSocialIcon(link.icon)}
            </motion.a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden p-2 menu-button text-white"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.div>
        </motion.button>

        {/* Mobile Menu */}
        <motion.div
          className={cn(
            "fixed inset-0 bg-black/95 backdrop-blur-lg z-50 flex flex-col mobile-menu",
            "md:hidden"
          )}
          initial={{ x: "100%" }}
          animate={{ x: mobileMenuOpen ? 0 : "100%" }}
          transition={{ type: "spring", damping: 20, stiffness: 100 }}
        >
          <div className="flex justify-end p-6">
            <motion.button
              onClick={toggleMobileMenu}
              aria-label="Close menu"
              className="text-white p-2"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={24} />
            </motion.button>
          </div>
          <div className="flex flex-col items-center justify-center flex-1 space-y-8">
            {['Home', 'About', 'Projects', 'Skills', 'Contact'].map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-2xl font-medium text-white hover:text-primary transition-colors"
                initial={{ opacity: 0, x: 50 }}
                animate={{ 
                  opacity: mobileMenuOpen ? 1 : 0, 
                  x: mobileMenuOpen ? 0 : 50 
                }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 10, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleMobileMenu}
              >
                {item}
              </motion.a>
            ))}

            <div className="flex space-x-6 mt-8">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 text-white hover:text-primary transition-colors rounded-full hover:bg-white/10"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: mobileMenuOpen ? 1 : 0, 
                    scale: mobileMenuOpen ? 1 : 0 
                  }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ y: -2, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={link.name}
                >
                  {renderSocialIcon(link.icon)}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;
