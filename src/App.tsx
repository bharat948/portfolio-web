import React, { useState } from 'react';
import Layout from './components/Layout/Layout';
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Contact from './sections/Contact';
import { useDarkMode } from './hooks/useDarkMode';
import { usePreloader } from './hooks/usePreloader';

// Lazy-load the preloader so its GSAP dependency doesn't block first paint.
const Preloader = React.lazy(() => import('./components/Preloader/Preloader'));

function App() {
  const { darkMode, toggleTheme } = useDarkMode();
  const { progress, isComplete } = usePreloader(3200);
  const [preloaderDone, setPreloaderDone] = useState(false);

  const handleExitComplete = () => {
    setPreloaderDone(true);
    // Reset the body background from the preloader warm-grey to the app's theme.
    document.body.style.background = '';
  };

  return (
    <>
      {/* ─── Preloader overlay ─────────────────────────────────── */}
      {!preloaderDone && (
        <React.Suspense fallback={null}>
          <Preloader
            progress={progress}
            isComplete={isComplete}
            onExitComplete={handleExitComplete}
          />
        </React.Suspense>
      )}

      {/* ─── Main site ─────────────────────────────────────────── */}
      <Layout darkMode={darkMode} toggleTheme={toggleTheme} preloaderDone={preloaderDone}>
        <Hero preloaderDone={preloaderDone} />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </Layout>
    </>
  );
}

export default App;
