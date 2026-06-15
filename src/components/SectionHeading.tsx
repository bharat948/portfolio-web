import React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "../utils/cn";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  align?: "left" | "center";
}

const wordContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
};

const word: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

// Eyebrow label + heading whose words reveal one-by-one from behind a mask.
const SectionHeading: React.FC<SectionHeadingProps> = ({ eyebrow, title, align = "left" }) => {
  const reduce = useReducedMotion();
  const words = title.split(" ");

  return (
    <div className={align === "center" ? "text-center" : undefined}>
      <motion.p
        className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-500"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {eyebrow}
      </motion.p>

      {reduce ? (
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          {title}
        </h2>
      ) : (
        <motion.h2
          aria-label={title}
          className={cn(
            "mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl",
            align === "center" && "justify-center",
            "flex flex-wrap"
          )}
          variants={wordContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          {words.map((w, i) => (
            <span key={`${w}-${i}`} aria-hidden className="mr-[0.25em] inline-flex overflow-hidden">
              <motion.span variants={word} className="inline-block">
                {w}
              </motion.span>
            </span>
          ))}
        </motion.h2>
      )}
    </div>
  );
};

export default SectionHeading;
