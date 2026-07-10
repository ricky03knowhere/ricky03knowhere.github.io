import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download } from 'lucide-react';
import { getProfile } from '../lib/data';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Stack', href: '#stack' },
  { label: 'Resume', href: '#resume' },
  { label: 'Interest', href: '#interest' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const profile = getProfile();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    // Intersection Observer for active section
    const sections = navLinks.map(link => 
      document.querySelector(link.href)
    ).filter(Boolean) as Element[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -80% 0px' }
    );

    sections.forEach((section) => observer.observe(section));

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
        className={`
          fixed top-6 left-1/2 -translate-x-1/2 z-50
          transition-all duration-500 ease-out
          ${scrolled
            ? 'w-[90%] max-w-[850px] py-2 px-4'
            : 'w-[95%] max-w-[1280px] py-4 px-6'
          }
        `}
      >
        <div
          className={`
            glass rounded-full flex items-center justify-between
            transition-all duration-500
            ${scrolled ? 'px-6 py-2.5 shadow-[0_10px_30px_rgba(8,18,32,0.5)]' : 'px-10 py-4'}
          `}
        >
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-cyan to-accent-purple flex items-center justify-center text-base font-bold font-heading transition-transform duration-300 group-hover:scale-110">
              {profile.nickname.charAt(0)}
            </div>
            <span
              className={`
                font-heading font-bold transition-all duration-500 tracking-tight
                ${scrolled ? 'text-base' : 'text-lg'}
              `}
            >
              <span className="gradient-text">{profile.nickname}</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`
                  relative px-4 py-2 text-sm font-semibold rounded-full
                  transition-all duration-300
                  ${activeSection === link.href.slice(1)
                    ? 'text-accent-cyan'
                    : 'text-light-text hover:text-white'
                  }
                `}
              >
                {activeSection === link.href.slice(1) && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 rounded-full bg-accent-cyan/10 border border-accent-cyan/20"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </a>
            ))}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <a
              href={profile.resume}
              download
              className={`
                hidden sm:flex items-center gap-2
                btn-gradient rounded-full font-bold
                transition-all duration-500
                ${scrolled ? 'px-5 py-2 text-xs' : 'px-7 py-3 text-sm'}
              `}
            >
              <span className="flex items-center gap-2">
                <Download size={scrolled ? 14 : 16} />
                Download CV
              </span>
            </a>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2.5 rounded-full hover:bg-white/5 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-primary/80 backdrop-blur-md"
              onClick={() => setMobileOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="absolute top-20 left-1/2 -translate-x-1/2 w-[90%] max-w-[400px]"
            >
              <div className="glass rounded-3xl p-6 space-y-2">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    className={`
                      block px-4 py-3 rounded-2xl text-base font-medium
                      transition-all duration-300
                      ${activeSection === link.href.slice(1)
                        ? 'text-accent-cyan bg-accent-cyan/10'
                        : 'text-light-text hover:text-white hover:bg-white/5'
                      }
                    `}
                  >
                    {link.label}
                  </motion.a>
                ))}

                <div className="pt-4 border-t border-white/10">
                  <a
                    href={profile.resume}
                    download
                    className="btn-gradient rounded-2xl px-5 py-3 text-sm w-full flex items-center justify-center gap-2"
                  >
                    <span className="flex items-center gap-2">
                      <Download size={16} />
                      Download CV
                    </span>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
