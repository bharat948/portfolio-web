import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { colorTheme } from "../../config/portfolio";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  
  // Set theme based on user preference
  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDarkMode(prefersDark);
  }, []);
  
  // Update HTML class when theme changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);
  
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="min-h-screen transition-colors duration-300 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header />
      <main className="pt-16">
        {children}
      </main>
      <Footer />
      
      {/* Theme Toggle Button */}
      <motion.button
        className="fixed bottom-8 right-8 p-3 rounded-full shadow-lg bg-white dark:bg-gray-800 text-primary dark:text-primary-dark z-10"
        onClick={toggleTheme}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle theme"
      >
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </motion.button>
    </div>
  );
};

export default Layout;