import React from 'react';
import Layout from './components/Layout/Layout';
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Contact from './sections/Contact';
import Play from './pages/Play';
import { useRoute } from './lib/router';
import { useDarkMode } from './hooks/useDarkMode';

function App() {
  const { darkMode, toggleTheme } = useDarkMode();
  const route = useRoute();

  if (route === '/play') {
    return <Play darkMode={darkMode} toggleTheme={toggleTheme} />;
  }

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
