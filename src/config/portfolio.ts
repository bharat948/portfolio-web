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
  category: "Languages" | "Backend" | "Frontend" | "Data & Cloud" | "AI & ML" | "Tools";
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
  title: "Software Developer",
  // One-liner shown as the hero tagline.
  tagline: "I build Agentic and AI workflow applications.",
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



// ── Quick facts (small grid in the About section) ─────────────────────────────
export const quickFacts: { label: string; value: string }[] = [
  { label: "Role", value: "Associate Product Engineer" },
  { label: "Location", value: "Bhubaneswar, India" },
  { label: "Focus", value: "Web & Product Engineering" },
  { label: "Open to", value: "Full-time & freelance" },
];

// ── Skills ────────────────────────────────────────────────────────────────────
export const skills: Skill[] = [
  // Languages
  { name: "Java", category: "Languages" },
  { name: "Python", category: "Languages" },
  { name: "Golang", category: "Languages" },
  { name: "JavaScript", category: "Languages" },
  { name: "C/C++", category: "Languages" },
  { name: "SQL", category: "Languages" },

  // AI & ML
  { name: "LangChain", category: "AI & ML" },
  { name: "LlamaIndex", category: "AI & ML" },
  { name: "LangGraph", category: "AI & ML" },
  { name: "RAG Systems", category: "AI & ML" },
  { name: "ML/DL", category: "AI & ML" },

  // Backend
  { name: "Django", category: "Backend" },
  { name: "Node.js", category: "Backend" },
  { name: "REST APIs", category: "Backend" },
  { name: "Microservices", category: "Backend" },
  { name: "Concurrency", category: "Backend" },

  // Data & Cloud
  { name: "MongoDB", category: "Data & Cloud" },
  { name: "PostgreSQL", category: "Data & Cloud" },
  { name: "Redis", category: "Data & Cloud" },
  { name: "Apache Kafka", category: "Data & Cloud" },
  { name: "Vector Databases", category: "Data & Cloud" },
  { name: "OLAP", category: "Data & Cloud" },

  // Frontend
  { name: "Angular", category: "Frontend" },
  { name: "React", category: "Frontend" },

  // Tools
  { name: "Git", category: "Tools" },
  { name: "Docker", category: "Tools" },
  { name: "System Design", category: "Tools" },
  { name: "Data Structures", category: "Tools" },
];

// ── Projects ──────────────────────────────────────────────────────────────────
// Replace these placeholders with your real work. Delete or add entries freely.
// Omit demoUrl/sourceUrl to hide the corresponding button. The section shows a
// friendly empty state if this array is empty.
export const projects: Project[] = [
  {
    id: "daily-read",
    title: "DailyRead",
    description:
      "A user-specific curated daily newsletter featuring voice mode, persistent user interest tracking, and intelligent memory.",
    technologies: ["React", "Agentic AI", "Voice Synthesis", "TypeScript"],
    sourceUrl: "https://github.com/bharat948",
    featured: true,
  },
  {
    id: "daily-pilot",
    title: "DailyPilot",
    description:
      "A personal task manager built with several third-party API connectors for advanced, automated task management workflows.",
    technologies: ["Node.js", "API Integrations", "Workflow Automation"],
    sourceUrl: "https://github.com/bharat948",
    featured: true,
  },
  {
    id: "deep-fake-detection",
    title: "Deep Fake Detection",
    description:
      "A college research project focused on accurately identifying and classifying deepfakes using ResNeXt and CNN architectures.",
    technologies: ["Python", "ResNeXt", "CNN", "Deep Learning"],
    sourceUrl: "https://github.com/bharat948",
  },
];

// ── Navigation ────────────────────────────────────────────────────────────────
export const navItems = ["Home", "About", "Projects", "Skills", "Contact"] as const;
