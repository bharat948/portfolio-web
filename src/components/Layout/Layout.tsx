import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";
import ScrollProgress from "../ScrollProgress";

// Lazy-load the heavy Three.js scene so it doesn't block the initial bundle.
const HeroScene = React.lazy(() => import("../three/HeroScene"));

interface LayoutProps {
  children: React.ReactNode;
  darkMode: boolean;
  toggleTheme: () => void;
  /** When false the header stays hidden (preloader is still playing). */
  preloaderDone?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, darkMode, toggleTheme, preloaderDone = true }) => {
  const [mouse, setMouse] = useState<[number, number]>([0, 0]);

  // Track normalised mouse position (-1…1) over the whole page.
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = (e.clientY / window.innerHeight) * 2 - 1;
    setMouse([x, y]);
  }, []);

  // Reset on leave
  const handleMouseLeave = useCallback(() => setMouse([0, 0]), []);

  return (
    <div 
      onMouseMove={handleMouseMove} 
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen overflow-x-hidden dark bg-transparent"
    >
      <ScrollProgress />

      {/* 3D Global Background */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[#0A0A0A]">
        <React.Suspense fallback={null}>
          <HeroScene mouse={mouse} visible={preloaderDone} />
        </React.Suspense>
        {/* Subtle grid overlay to tie it together */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <Header darkMode={darkMode} toggleTheme={toggleTheme} visible={preloaderDone} />
      <main className="relative z-10">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
