import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Portfolio from './components/Portfolio';
import TechStack from './components/TechStack';
import Resume from './components/Resume';
import Interest from './components/Interest';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import CursorGlow from './components/CursorGlow';
import LoadingScreen from './components/LoadingScreen';

import Lenis from 'lenis';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function App() {
  useEffect(() => {
    // Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Initialize AOS
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
    });

    return () => {
      lenis.destroy();
    };
  }, []);
  return (
    <>
      <LoadingScreen />
      <CursorGlow />
      <ScrollProgress />
      <div className="noise-overlay">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Portfolio />
          <TechStack />
          <Resume />
          <Interest />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
