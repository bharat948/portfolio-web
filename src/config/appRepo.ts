export type SocialLink = {
  name: string;
  url: string;
  icon: string;
};

export type Skill = {
  name: string;
  icon?: string;
  proficiency: number; // 0-100
  category: "frontend" | "backend" | "design" | "other";
};

export type Project = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  demoUrl?: string;
  sourceUrl?: string;
  technologies: string[];
  featured?: boolean;
};

export type Experience = {
  company: string;
  position: string;
  duration: string;
  description: string;
  technologies?: string[];
};

export const appRepo = {
  personalInfo: {
    name: "Bharat Patidar",
    title: "Associate Product Engineer",
    email: "bharatpatidar002@example.com",
    location: "Bhubaneswar, Odisha",
    bio: "I'm a  developer with expertise in building beautiful, interactive digital experiences. I specialize in React, TypeScript, and Three.js, bringing designs to life with modern web technologies.",
    avatar: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  socialLinks: [
    {
      name: "GitHub",
      url: "https://github.com/bharat948",
      icon: "Github",
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/yourusername",
      icon: "Linkedin",
    },
    {
      name: "Twitter",
      url: "https://twitter.com/yourusername",
      icon: "Twitter",
    },
    {
      name: "Dribbble",
      url: "https://dribbble.com/yourusername",
      icon: "Dribbble",
    },
  ] as SocialLink[],
  skills: [
    { name: "React", proficiency: 90, category: "frontend" },
    { name: "TypeScript", proficiency: 85, category: "frontend" },
    { name: "Three.js", proficiency: 80, category: "frontend" },
    { name: "Node.js", proficiency: 75, category: "backend" },
    { name: "GraphQL", proficiency: 70, category: "backend" },
    { name: "UI/UX Design", proficiency: 85, category: "design" },
    { name: "WebGL", proficiency: 75, category: "frontend" },
    { name: "Next.js", proficiency: 80, category: "frontend" },
    { name: "Tailwind CSS", proficiency: 90, category: "frontend" },
    { name: "Docker", proficiency: 65, category: "backend" },
  ] as Skill[],
  projects: [
    {
      id: "interactive-globe",
      title: "Interactive Globe Visualization",
      description: "An interactive 3D globe visualization showing global data patterns with animated data points and customizable filters.",
      thumbnail: "https://images.pexels.com/photos/2156881/pexels-photo-2156881.jpeg?auto=compress&cs=tinysrgb&w=600",
      demoUrl: "https://example.com/projects/globe",
      sourceUrl: "https://github.com/yourusername/globe",
      technologies: ["React", "Three.js", "D3.js", "WebGL"],
      featured: true,
    },
    {
      id: "portfolio-website",
      title: "3D Portfolio Website",
      description: "A personal portfolio website featuring 3D elements, interactive animations, and a responsive design built with React and Three.js.",
      thumbnail: "https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=600",
      demoUrl: "https://example.com",
      sourceUrl: "https://github.com/yourusername/portfolio",
      technologies: ["React", "TypeScript", "Three.js", "Framer Motion"],
      featured: true,
    },
    {
      id: "ar-product-viewer",
      title: "AR Product Viewer",
      description: "An augmented reality product viewer that allows users to visualize products in their real environment using WebXR technology.",
      thumbnail: "https://images.pexels.com/photos/4144294/pexels-photo-4144294.jpeg?auto=compress&cs=tinysrgb&w=600",
      demoUrl: "https://example.com/projects/ar-viewer",
      sourceUrl: "https://github.com/yourusername/ar-viewer",
      technologies: ["React", "Three.js", "WebXR", "GLSL"],
    },
    {
      id: "interactive-music-visualizer",
      title: "Interactive Music Visualizer",
      description: "A 3D music visualizer that reacts to audio input with dynamic shapes and colors, creating a unique visual experience for each track.",
      thumbnail: "https://images.pexels.com/photos/5611966/pexels-photo-5611966.jpeg?auto=compress&cs=tinysrgb&w=600",
      demoUrl: "https://example.com/projects/music-viz",
      sourceUrl: "https://github.com/yourusername/music-viz",
      technologies: ["React", "Three.js", "Web Audio API", "GLSL"],
    },
  ] as Project[],
  experiences: [
    {
      company: "Tech Innovations Inc.",
      position: "Senior Frontend Developer",
      duration: "2021 - Present",
      description: "Leading the development of interactive web applications with a focus on performance and user experience. Implementing 3D visualizations and complex UI animations.",
      technologies: ["React", "TypeScript", "Three.js", "WebGL"],
    },
    {
      company: "Creative Digital Agency",
      position: "Creative Developer",
      duration: "2018 - 2021",
      description: "Developed award-winning websites and digital experiences for clients in various industries. Specialized in creating unique interactive elements and animations.",
      technologies: ["JavaScript", "GSAP", "Canvas", "Vue.js"],
    },
    {
      company: "Web Solutions Co.",
      position: "Frontend Developer",
      duration: "2016 - 2018",
      description: "Built responsive websites and web applications with a focus on accessibility and cross-browser compatibility. Collaborated with designers to implement pixel-perfect interfaces.",
      technologies: ["React", "CSS", "JavaScript", "Responsive Design"],
    },
  ] as Experience[],
  colorTheme: {
    light: {
      primary: "#0066CC",
      secondary: "#5AC8FA",
      accent: "#FF2D55",
      background: "#FFFFFF",
      text: "#000000",
      surface: "#F5F5F7",
    },
    dark: {
      primary: "#0A84FF",
      secondary: "#64D2FF",
      accent: "#FF375F",
      background: "#000000",
      text: "#FFFFFF",
      surface: "#1C1C1E",
    },
  },
  about: {
    title: "About Me",
    description: "Get to know more about me, my experience, and what drives my passion for creating amazing digital experiences.",
    whoAmI: "Who am I?",
    contactMe: "Contact Me",
  },
  projectsSection: {
    title: "My Projects",
    portfolio: "Portfolio",
    description: "Explore a curated selection of my work showcasing expertise in interactive 3D experiences, modern web development, and innovative digital solutions.",
    allProjects: "All Projects",
    featuredProjects: "Featured Projects",
    noProjectsFound: "No projects found",
    filterMessage: "Try adjusting your filter criteria",
  },
  skillsSection: {
    title: "My Skills",
    description: "I've worked with a variety of technologies and tools to create amazing digital experiences.",
  },
  contactSection: {
    title: "Get In Touch",
    description: "Have a project in mind or want to work together? Feel free to reach out to me using the form below or through my social media channels.",
    contactInfo: "Contact Information",
    email: "Email",
    location: "Location",
    connectWithMe: "Connect With Me",
    sendMessage: "Send Me a Message",
    yourName: "Your Name",
    yourEmail: "Your Email",
    subject: "Subject",
    yourMessage: "Your Message",
    formSuccess: "Message Sent!",
    formSuccessMessage: "Thank you for your message. I'll get back to you as soon as possible.",
    formSending: "Sending...",
  },
};
