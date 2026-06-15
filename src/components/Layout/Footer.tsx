import React from "react";
import { Github, Linkedin, Twitter, Mail, ArrowUp } from "lucide-react";
import { personalInfo, socialLinks, navItems } from "../../config/portfolio";

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  Github,
  Linkedin,
  Twitter,
  Mail,
};

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200/70 dark:border-white/10">
      <div className="section-shell py-12">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-between">
          <div className="text-center md:text-left">
            <a href="#home" className="font-display text-xl font-bold tracking-tight">
              {personalInfo.name.split(" ")[0]}
              <span className="text-gradient">.</span>
            </a>
            <p className="mt-2 max-w-xs text-sm text-slate-500 dark:text-slate-400">
              {personalInfo.tagline}
            </p>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex gap-2">
            {socialLinks.map((link) => {
              const Icon = iconMap[link.icon];
              return (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  className="rounded-full border border-slate-200 p-2.5 text-slate-500 transition-colors hover:text-slate-900 dark:border-white/10 dark:text-slate-400 dark:hover:text-white"
                >
                  {Icon && <Icon size={18} />}
                </a>
              );
            })}
            <a
              href={`mailto:${personalInfo.email}`}
              aria-label="Email"
              className="rounded-full border border-slate-200 p-2.5 text-slate-500 transition-colors hover:text-slate-900 dark:border-white/10 dark:text-slate-400 dark:hover:text-white"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-slate-200/70 pt-6 text-sm text-slate-500 dark:border-white/10 dark:text-slate-400 sm:flex-row">
          <p>
            © {year} {personalInfo.name}. All rights reserved.
          </p>
          <a
            href="#home"
            className="inline-flex items-center gap-1.5 font-medium transition-colors hover:text-slate-900 dark:hover:text-white"
          >
            Back to top
            <ArrowUp size={15} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
