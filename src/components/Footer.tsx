import { ArrowUp } from 'lucide-react';
import { getProfile } from '../lib/data';
import { useEffect, useState } from 'react';

export default function Footer() {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    setScrolled(window.scrollY > 50);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const profile = getProfile();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-glass-border">
      <div className="section-container py-12">
        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 p-8 border-t border-glass-border">
          <p className="text-light-text/40 text-xs">
            © {currentYear} <span className='text-gradient'>{profile.name}</span>. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 p-4 rounded-full glass-card text-xs text-light-text/60 animate-bounce
             hover:text-white hover:border-accent-cyan/30 transition-all duration-300 group fixed bottom-1 right-4 z-50"
            style={{ opacity: scrolled ? 1 : 0 }}
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
