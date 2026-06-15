import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../utils/cn";
import { personalInfo, socialLinks, navItems } from "../../config/portfolio";
import { navigate } from "../../lib/router";
import { Menu, X, Github, Linkedin, Twitter, Mail, Moon, Sun, Heart } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  Github,
  Linkedin,
  Twitter,
  Mail,
};

interface HeaderProps {
  darkMode: boolean;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleTheme }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");

  // Add a frosted background once the page is scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the nav item for the section currently in view.
  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.toLowerCase()))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 90, damping: 18 }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-slate-200/70 bg-white/75 backdrop-blur-xl dark:border-white/10 dark:bg-[#0a0a12]/75"
          : "border-b border-transparent"
      )}
    >
      <div className="section-shell flex h-16 items-center justify-between">
        {/* Logo */}
        <a href="#home" className="font-display text-xl font-bold tracking-tight">
          {personalInfo.name.split(" ")[0]}
          <span className="text-gradient">.</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const id = item.toLowerCase();
            const isActive = activeSection === id;
            return (
              <a
                key={item}
                href={`#${id}`}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "text-slate-900 dark:text-white"
                    : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-slate-900/[0.06] dark:bg-white/10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {item}
              </a>
            );
          })}
          <a
            href="/play"
            onClick={(e) => {
              e.preventDefault();
              navigate("/play");
            }}
            className="ml-1 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-brand-500 to-fuchsia-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-transform hover:-translate-y-0.5"
          >
            <Heart size={14} className="fill-current" />
            Play
          </a>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-1.5">
          <div className="hidden items-center gap-1.5 sm:flex">
            {socialLinks.map((link) => {
              const Icon = iconMap[link.icon];
              return (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  className="rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-900/[0.06] hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white"
                >
                  {Icon && <Icon size={18} />}
                </a>
              );
            })}
          </div>

          <button
            onClick={toggleTheme}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            className="rounded-full p-2 text-slate-600 transition-colors hover:bg-slate-900/[0.06] hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
            className="rounded-full p-2 text-slate-700 hover:bg-slate-900/[0.06] dark:text-slate-200 dark:hover:bg-white/10 md:hidden"
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col bg-white/95 backdrop-blur-xl dark:bg-[#0a0a12]/95 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="section-shell flex h-16 items-center justify-between">
              <span className="font-display text-xl font-bold">
                {personalInfo.name.split(" ")[0]}
                <span className="text-gradient">.</span>
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
                className="rounded-full p-2 text-slate-700 hover:bg-slate-900/[0.06] dark:text-slate-200 dark:hover:bg-white/10"
              >
                <X size={24} />
              </button>
            </div>

            <nav className="flex flex-1 flex-col items-center justify-center gap-2">
              {navItems.map((item, i) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-display text-3xl font-semibold text-slate-800 transition-colors hover:text-gradient dark:text-slate-100"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  {item}
                </motion.a>
              ))}

              <motion.a
                href="/play"
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                  navigate("/play");
                }}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-500 to-fuchsia-500 px-6 py-3 font-display text-2xl font-semibold text-white"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * navItems.length }}
              >
                <Heart size={20} className="fill-current" />
                Play
              </motion.a>

              <div className="mt-8 flex gap-3">
                {socialLinks.map((link) => {
                  const Icon = iconMap[link.icon];
                  return (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.name}
                      className="rounded-full border border-slate-200 p-3 text-slate-600 transition-colors hover:text-slate-900 dark:border-white/10 dark:text-slate-300 dark:hover:text-white"
                    >
                      {Icon && <Icon size={20} />}
                    </a>
                  );
                })}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
