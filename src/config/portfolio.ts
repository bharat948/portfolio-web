// ─────────────────────────────────────────────────────────────────────────────
// Single source of truth for all portfolio content.
// Edit the values below to update the site — no component changes required.
// ─────────────────────────────────────────────────────────────────────────────

export type SocialLink = {
  name: string;
  url: string;
  icon: "Github" | "Linkedin" | "Twitter" | "Mail";
};

export type Skill = {
  name: string;
  category: "Frontend" | "Backend" | "Tools" | "Design";
};

export type Project = {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  demoUrl?: string;
  sourceUrl?: string;
  featured?: boolean;
  stars?: number;
};

// ── Personal information ──────────────────────────────────────────────────────
export const personalInfo = {
  name: "Bharat Patidar",
  // Short role shown under the name in the hero.
  title: "Associate Product Engineer",
  // One-liner shown as the hero tagline.
  tagline: "I build clean, fast, and thoughtful web experiences.",
  location: "Bhubaneswar, Odisha",
  email: "bharatpatidar002@gmail.com",
  // A couple of sentences for the About section.
  bio: "I'm a product engineer focused on building polished, accessible web applications. I enjoy turning ideas into reliable products with React, TypeScript, and a strong eye for detail.",
  // Set to a URL to show a "Download Resume" button, or leave empty to hide it.
  resumeUrl: "",
  // Shown as a small availability badge in the hero. Set available: false to hide.
  availability: { available: true, label: "Available for opportunities" },
};

// ── Social links ──────────────────────────────────────────────────────────────
// Remove any you don't use. `Mail` is added automatically from personalInfo.email.
export const socialLinks: SocialLink[] = [
  { name: "GitHub", url: "https://github.com/bharat948", icon: "Github" },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/bharat-patidar-6909b02b9",
    icon: "Linkedin",
  },
];

// ── GitHub projects ───────────────────────────────────────────────────────────
// The Projects section pulls live repo details (description, language, links,
// stars) from the GitHub API. List the repos you want to feature, in display
// order. Leave `featuredRepos` empty to auto-show your most recently pushed
// non-fork repos. If the API is unreachable, the static `projects` list below is
// used as a fallback.
export const github = {
  username: "bharat948",
  featuredRepos: [
    "trac-r",
    "car-go-UI",
    "connect",
    "multi-user-whiteboard",
    "Campground-web",
    "hospital-management-website",
  ],
  // Max repos to show when featuredRepos is empty (auto mode).
  autoLimit: 6,
};

// ── Quick facts (small grid in the About section) ─────────────────────────────
export const quickFacts: { label: string; value: string }[] = [
  { label: "Role", value: "Associate Product Engineer" },
  { label: "Location", value: "Bhubaneswar, India" },
  { label: "Focus", value: "Web & Product Engineering" },
  { label: "Open to", value: "Full-time & freelance" },
];

// ── Skills ────────────────────────────────────────────────────────────────────
export const skills: Skill[] = [
  { name: "React", category: "Frontend" },
  { name: "TypeScript", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "JavaScript", category: "Frontend" },
  { name: "Node.js", category: "Backend" },
  { name: "REST APIs", category: "Backend" },
  { name: "PostgreSQL", category: "Backend" },
  { name: "Git", category: "Tools" },
  { name: "Docker", category: "Tools" },
  { name: "Vite", category: "Tools" },
  { name: "Figma", category: "Design" },
  { name: "UI/UX", category: "Design" },
];

// ── Projects ──────────────────────────────────────────────────────────────────
// Replace these placeholders with your real work. Delete or add entries freely.
// Omit demoUrl/sourceUrl to hide the corresponding button. The section shows a
// friendly empty state if this array is empty.
export const projects: Project[] = [
  {
    id: "project-one",
    title: "Project One",
    description:
      "A short description of what you built, the problem it solves, and your role. Replace this with a real project.",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    sourceUrl: "https://github.com/bharat948",
    featured: true,
  },
  {
    id: "project-two",
    title: "Project Two",
    description:
      "Another highlight. Mention impact or interesting technical details. Add a live demo link when available.",
    technologies: ["Next.js", "Node.js", "PostgreSQL"],
    sourceUrl: "https://github.com/bharat948",
    featured: true,
  },
  {
    id: "project-three",
    title: "Project Three",
    description:
      "A smaller side project, experiment, or open-source contribution worth showing off.",
    technologies: ["React", "Vite"],
    sourceUrl: "https://github.com/bharat948",
  },
];

// ── Navigation ────────────────────────────────────────────────────────────────
export const navItems = ["Home", "About", "Projects", "Skills", "Contact"] as const;
