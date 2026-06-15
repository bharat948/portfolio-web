import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const getInitialDarkMode = (): boolean => {
  if (typeof window === "undefined") return true;
  const stored = localStorage.getItem("theme");
  if (stored === "light") return false;
  if (stored === "dark") return true;
  // Default to the user's system preference, falling back to dark.
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? true;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [darkMode, setDarkMode] = useState<boolean>(getInitialDarkMode);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Ambient aurora background */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -left-32 h-[36rem] w-[36rem] rounded-full bg-brand-400/25 blur-[120px] animate-aurora-1 dark:bg-brand-500/20" />
        <div className="absolute top-1/3 -right-40 h-[34rem] w-[34rem] rounded-full bg-fuchsia-400/20 blur-[120px] animate-aurora-2 dark:bg-fuchsia-500/15" />
        <div className="absolute -bottom-48 left-1/3 h-[30rem] w-[30rem] rounded-full bg-sky-300/20 blur-[120px] animate-aurora-1 dark:bg-sky-500/10" />
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-[size:64px_64px] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)]" />
      </div>

      <Header darkMode={darkMode} toggleTheme={toggleTheme} />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
