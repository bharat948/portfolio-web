import React from 'react';
import Layout from './components/Layout/Layout';
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Contact from './sections/Contact';
import { useDarkMode } from './hooks/useDarkMode';

function App() {
  const { darkMode, toggleTheme } = useDarkMode();

  return (
    <Layout darkMode={darkMode} toggleTheme={toggleTheme}>
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
    </Layout>
  );
}

export default App;
