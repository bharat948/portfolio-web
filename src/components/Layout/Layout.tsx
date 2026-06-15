import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";
import ScrollProgress from "../ScrollProgress";

interface LayoutProps {
  children: React.ReactNode;
  darkMode: boolean;
  toggleTheme: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, darkMode, toggleTheme }) => {
  // Scroll-driven parallax for the ambient aurora blobs. The parallax `y` lives
  // on the wrapper so it doesn't clash with each blob's CSS keyframe transform.
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1600], [0, 220]);
  const y2 = useTransform(scrollY, [0, 1600], [0, -180]);
  const y3 = useTransform(scrollY, [0, 1600], [0, 140]);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <ScrollProgress />

      {/* Ambient aurora background */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <motion.div style={{ y: y1 }} className="absolute -top-40 -left-32">
          <div className="h-[36rem] w-[36rem] rounded-full bg-brand-400/25 blur-[120px] animate-aurora-1 dark:bg-brand-500/20" />
        </motion.div>
        <motion.div style={{ y: y2 }} className="absolute top-1/3 -right-40">
          <div className="h-[34rem] w-[34rem] rounded-full bg-fuchsia-400/20 blur-[120px] animate-aurora-2 dark:bg-fuchsia-500/15" />
        </motion.div>
        <motion.div style={{ y: y3 }} className="absolute -bottom-48 left-1/3">
          <div className="h-[30rem] w-[30rem] rounded-full bg-sky-300/20 blur-[120px] animate-aurora-1 dark:bg-sky-500/10" />
        </motion.div>
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
