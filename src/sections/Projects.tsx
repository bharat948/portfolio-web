import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { Github, ExternalLink, FolderGit2, Star } from "lucide-react";
import { projects, type Project } from "../config/portfolio";
import SectionHeading from "../components/SectionHeading";

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  // Pointer position within the card, normalised to 0–1.
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  // Smooth the tilt so it eases toward the cursor instead of snapping.
  const springCfg = { stiffness: 150, damping: 18 };
  const rotateX = useSpring(useTransform(py, [0, 1], [6, -6]), springCfg);
  const rotateY = useSpring(useTransform(px, [0, 1], [-6, 6]), springCfg);

  // Radial spotlight that tracks the cursor.
  const spotX = useTransform(px, (v) => `${v * 100}%`);
  const spotY = useTransform(py, (v) => `${v * 100}%`);
  const spotlight = useMotionTemplate`radial-gradient(240px circle at ${spotX} ${spotY}, rgba(255,255,255,0.14), transparent 60%)`;

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };

  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
  <motion.article
    ref={ref}
    onMouseMove={reduce ? undefined : handleMove}
    onMouseLeave={reduce ? undefined : reset}
    style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 900 }}
    className="group relative flex flex-col overflow-hidden rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl transition-all duration-500 hover:border-[#EA580C]/40 hover:shadow-[0_0_30px_rgba(234,88,12,0.1)]"
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false, amount: 0.2 }}
    transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
  >
    {/* Cursor spotlight */}
    {!reduce && (
      <motion.div
        aria-hidden
        style={{ background: spotlight }}
        className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 mix-blend-overlay"
      />
    )}

    {/* Technical Abstract Header instead of purple gradient */}
    <div className="relative h-48 overflow-hidden bg-[#050505] border-b border-white/5">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent" />
      
      {/* Glowing orb accent */}
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#EA580C] opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-30" />
      
      <FolderGit2 className="absolute bottom-6 left-6 text-white/20 transition-colors duration-500 group-hover:text-[#EA580C]" size={32} />
      
      {typeof project.stars === "number" && project.stars > 0 && (
        <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 px-3 py-1.5 text-xs font-semibold text-white">
          <Star size={12} className="fill-[#EA580C] text-[#EA580C]" />
          {project.stars}
        </span>
      )}
    </div>

    <div className="flex flex-1 flex-col p-8">
      <h3 className="break-words font-display text-2xl font-bold tracking-tight text-white group-hover:text-[#EA580C] transition-colors">
        {project.title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-white/60 font-light">
        {project.description}
      </p>

      {project.technologies.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/70 tracking-wide"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      <div className="mt-8 flex items-center gap-6 border-t border-white/10 pt-6 text-sm font-semibold">
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white/60 transition-colors hover:text-[#EA580C]"
          >
            <ExternalLink size={16} />
            Live demo
          </a>
        )}
        {project.sourceUrl && (
          <a
            href={project.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white/60 transition-colors hover:text-[#EA580C]"
          >
            <Github size={16} />
            Code
          </a>
        )}
      </div>
    </div>
  </motion.article>
  );
};



const Projects: React.FC = () => {
  return (
    <section id="projects" className="scroll-mt-20 py-24 sm:py-32">
      <div className="section-shell">
        <SectionHeading eyebrow="Work" title="Selected projects" />
        <motion.p
          className="mt-3 max-w-2xl text-slate-600 dark:text-slate-400"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          A few things I've built.
        </motion.p>

        {projects.length > 0 ? (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        ) : (
          <div className="card-surface mt-12 flex flex-col items-center justify-center p-16 text-center">
            <FolderGit2 className="text-slate-400" size={40} />
            <p className="mt-4 text-lg font-medium text-slate-600 dark:text-slate-300">
              Projects coming soon.
            </p>
            <p className="mt-1 text-sm text-slate-500">
              I'm putting the finishing touches on a few things.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
