import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { personalInfo } from "../config/portfolio";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

interface HeroProps {
  preloaderDone?: boolean;
}

const Hero: React.FC<HeroProps> = ({ preloaderDone = true }) => {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* ─── Gradient overlays for text readability ─── */}
      <div
        aria-hidden
        className="absolute inset-0 z-0 bg-gradient-to-l from-[#0a0a12]/90 via-[#0a0a12]/50 to-transparent"
      />
      
      {/* ─── Content ─── */}
      {preloaderDone && (
        <motion.div
          className="section-shell relative z-10 flex w-full flex-col justify-center py-32 lg:py-0"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <div className="max-w-2xl ml-auto text-right flex flex-col items-end">
            {/* Eyebrow */}
            <motion.p
              variants={fadeUp}
              className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400"
            >
              {personalInfo.title}
            </motion.p>

            {/* Main headline */}
            <motion.h1
              variants={fadeUp}
              className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
            >
              Bharat Patidar.
            </motion.h1>

            {/* Tagline */}
            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-lg text-lg leading-relaxed text-slate-400"
            >
              {personalInfo.tagline}
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              variants={fadeUp}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-slate-900 shadow-lg shadow-white/10 transition-all hover:-translate-y-0.5 hover:shadow-xl"
              >
                View my work
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform group-hover:translate-x-1"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 font-semibold text-white transition-all hover:-translate-y-0.5 hover:border-white/40"
              >
                Get in touch
              </a>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* ─── Bottom bar ─── */}
      {preloaderDone && (
        <div className="absolute inset-x-0 bottom-0 z-10">
          <div className="section-shell flex items-end justify-between pb-8">
            <motion.a
              href="#about"
              aria-label="Scroll to about"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white/60 transition-colors hover:border-white/40 hover:text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <ArrowDown size={18} className="animate-float" />
            </motion.a>

            {/* Info badge */}
            <motion.div
              className="hidden text-right text-sm text-slate-500 lg:block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                📍 {personalInfo.location}
              </p>
            </motion.div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
