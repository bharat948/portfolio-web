import React, { useEffect } from 'react';
import Layout from './components/Layout/Layout';
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Contact from './sections/Contact';
import { colorTheme } from './config/portfolio';

function App() {
  // Update document title
  useEffect(() => {
    document.title = "3D Portfolio | Creative Developer";
  }, []);
  
  // Define dark mode variables
  useEffect(() => {
    const root = document.documentElement;
    
    // Light theme variables
    root.style.setProperty('--color-primary', colorTheme.light.primary);
    root.style.setProperty('--color-secondary', colorTheme.light.secondary);
    root.style.setProperty('--color-accent', colorTheme.light.accent);
    
    // Dark theme variables
    root.style.setProperty('--color-primary-dark', colorTheme.dark.primary);
    root.style.setProperty('--color-secondary-dark', colorTheme.dark.secondary);
    root.style.setProperty('--color-accent-dark', colorTheme.dark.accent);
  }, []);

  return (
    <Layout>
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
    </Layout>
  );
}

export default App;