import React from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, FolderGit2, Star } from "lucide-react";
import { projects as fallbackProjects, github, type Project } from "../config/portfolio";
import { useGitHubProjects } from "../hooks/useGitHubProjects";

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => (
  <motion.article
    className="card-surface group flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/5 dark:hover:border-white/20"
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
  >
    {/* Gradient cover */}
    <div className="relative aspect-[16/9] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-400 via-brand-500 to-fuchsia-500 opacity-90 transition-transform duration-500 group-hover:scale-105" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_55%)]" />
      <FolderGit2 className="absolute bottom-4 left-4 text-white/90" size={28} />
      {typeof project.stars === "number" && project.stars > 0 && (
        <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-slate-800">
          <Star size={12} className="fill-current" />
          {project.stars}
        </span>
      )}
    </div>

    <div className="flex flex-1 flex-col p-6">
      <h3 className="break-words font-display text-xl font-bold tracking-tight">
        {project.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
        {project.description}
      </p>

      {project.technologies.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-600 dark:border-white/10 dark:text-slate-300"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      <div className="mt-5 flex items-center gap-4 border-t border-slate-100 pt-4 text-sm font-semibold dark:border-white/5">
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-slate-700 transition-colors hover:text-brand-500 dark:text-slate-200"
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
            className="inline-flex items-center gap-1.5 text-slate-700 transition-colors hover:text-brand-500 dark:text-slate-200"
          >
            <Github size={16} />
            Code
          </a>
        )}
      </div>
    </div>
  </motion.article>
);

const SkeletonCard: React.FC = () => (
  <div className="card-surface overflow-hidden">
    <div className="aspect-[16/9] animate-pulse bg-slate-200/70 dark:bg-white/5" />
    <div className="space-y-3 p-6">
      <div className="h-5 w-2/3 animate-pulse rounded bg-slate-200/70 dark:bg-white/5" />
      <div className="h-4 w-full animate-pulse rounded bg-slate-200/70 dark:bg-white/5" />
      <div className="h-4 w-4/5 animate-pulse rounded bg-slate-200/70 dark:bg-white/5" />
      <div className="flex gap-2 pt-2">
        <div className="h-6 w-16 animate-pulse rounded-full bg-slate-200/70 dark:bg-white/5" />
        <div className="h-6 w-16 animate-pulse rounded-full bg-slate-200/70 dark:bg-white/5" />
      </div>
    </div>
  </div>
);

const Projects: React.FC = () => {
  const { projects, loading, error } = useGitHubProjects(
    github.username,
    github.featuredRepos,
    github.autoLimit
  );

  // Use live GitHub data when available; fall back to the static config on error.
  const displayProjects = error ? fallbackProjects : projects;

  return (
    <section id="projects" className="scroll-mt-20 py-24 sm:py-32">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-500">
            Work
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Selected projects
          </h2>
          <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-400">
            A few things I've built — pulled live from{" "}
            <a
              href={`https://github.com/${github.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-brand-500 hover:underline"
            >
              GitHub
            </a>
            .
          </p>
        </motion.div>

        {loading ? (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: github.featuredRepos.length || github.autoLimit }).map(
              (_, i) => (
                <SkeletonCard key={i} />
              )
            )}
          </div>
        ) : displayProjects.length > 0 ? (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {displayProjects.map((project, index) => (
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

        <div className="mt-10 flex justify-center">
          <a
            href={`https://github.com/${github.username}?tab=repositories`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition-all hover:-translate-y-0.5 hover:border-slate-400 dark:border-white/15 dark:text-slate-200 dark:hover:border-white/30"
          >
            <Github size={18} />
            View all on GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
