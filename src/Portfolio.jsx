import { useState, useEffect } from 'react';
import FloatingContact from './components/FloatingContact';
import Header from './components/Header';
import Intro from './components/Intro';
import ContactSection from './components/ContactSection';
import handleRippleClick from './components/rippleEffect';
import { FaArrowUp } from 'react-icons/fa';
import Timeline from './components/Timeline';
import ScrollProgress from './components/ScrollProgress';
import MatrixRain from './components/MatrixRain';

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(() => {
    const hour = new Date().getHours();
    return hour < 6 || hour >= 18;
  });
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => setShowTopButton(window.scrollY > 200);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      <ScrollProgress />
      <div
        className="relative z-10 min-h-screen pb-20"
        onClick={handleRippleClick}
      >
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <Intro />
        <Timeline />
        <ContactSection />
        <FloatingContact />

        {showTopButton && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-20 right-6 p-3 bg-green-600 text-black rounded-sm shadow-lg hover:bg-green-500 transition-all z-50 font-mono"
            aria-label="Back to top"
          >
            <FaArrowUp />
          </button>
        )}

        <footer className="fixed bottom-0 w-full bg-black text-green-400 text-center p-4 text-sm shadow-md z-10 border-t border-green-500 font-mono">
          © {new Date().getFullYear()} Mohsin Ali Balsania — All rights reserved
        </footer>
      </div>
    </>
  );
}