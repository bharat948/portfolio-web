import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowDown, Github, Linkedin, Twitter, Mail, FileDown } from "lucide-react";
import { personalInfo, socialLinks } from "../config/portfolio";

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  Github,
  Linkedin,
  Twitter,
  Mail,
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

const Hero: React.FC = () => {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center pt-16"
    >
      <motion.div
        className="section-shell flex flex-col items-center text-center"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {personalInfo.availability.available && (
          <motion.div
            variants={item}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/60 px-4 py-1.5 text-sm font-medium text-slate-600 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            {personalInfo.availability.label}
          </motion.div>
        )}

        <motion.h1
          variants={item}
          className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
        >
          Hi, I'm {personalInfo.name.split(" ")[0]}
          <br />
          <span className="text-gradient-animated">{personalInfo.title}</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-400 sm:text-xl"
        >
          {personalInfo.tagline}
        </motion.p>

        <motion.div variants={item} className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 font-semibold text-white shadow-lg shadow-slate-900/10 transition-all hover:-translate-y-0.5 hover:shadow-xl dark:bg-white dark:text-slate-900"
          >
            View my work
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition-all hover:-translate-y-0.5 hover:border-slate-400 dark:border-white/15 dark:text-slate-200 dark:hover:border-white/30"
          >
            Get in touch
          </a>
          {personalInfo.resumeUrl && (
            <a
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-5 py-3 font-semibold text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
            >
              <FileDown size={18} />
              Resume
            </a>
          )}
        </motion.div>

        <motion.div variants={item} className="mt-10 flex items-center gap-2">
          {socialLinks.map((link) => {
            const Icon = iconMap[link.icon];
            return (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.name}
                className="rounded-full border border-slate-200 p-2.5 text-slate-500 transition-all hover:-translate-y-0.5 hover:text-slate-900 dark:border-white/10 dark:text-slate-400 dark:hover:text-white"
              >
                {Icon && <Icon size={18} />}
              </a>
            );
          })}
          <a
            href={`mailto:${personalInfo.email}`}
            aria-label="Email"
            className="rounded-full border border-slate-200 p-2.5 text-slate-500 transition-all hover:-translate-y-0.5 hover:text-slate-900 dark:border-white/10 dark:text-slate-400 dark:hover:text-white"
          >
            <Mail size={18} />
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-400 dark:text-slate-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <ArrowDown size={22} className="animate-float" />
      </motion.a>
    </section>
  );
};

export default Hero;
