import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ArrowRight, Layers } from 'lucide-react';
import gsap from 'gsap';

/* ─── Carousel Slides (gradient placeholders) ─── */
const carouselSlides = [
  'linear-gradient(135deg, #0c1929 0%, #1a1040 50%, #081220 100%)',
  'linear-gradient(135deg, #081220 0%, #0d2137 50%, #140e30 100%)',
  'linear-gradient(135deg, #100a25 0%, #081220 50%, #0a1e35 100%)',
  'linear-gradient(135deg, #0a1e35 0%, #15102e 50%, #081220 100%)',
];

import { getProfile, getSettings } from '../lib/data';

export default function Hero() {
  const profile = getProfile();
  const settings = getSettings();
  const roles = settings.heroTyping || ['Web Developer', 'Philosopher', 'Weebs'];

  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  /* ─── Carousel auto-advance ─── */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  /* ─── Typing animation ─── */
  const tick = useCallback(() => {
    const currentRole = roles[roleIndex];
    if (!isDeleting) {
      setDisplayText(currentRole.substring(0, displayText.length + 1));
      if (displayText.length + 1 === currentRole.length) {
        setTimeout(() => setIsDeleting(true), 1800);
      }
    } else {
      setDisplayText(currentRole.substring(0, displayText.length - 1));
      if (displayText.length - 1 === 0) {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }
  }, [displayText, isDeleting, roleIndex]);

  useEffect(() => {
    const speed = isDeleting ? 60 : 120;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting]);

  /* ─── GSAP entrance ─── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      tl.from('.hero-photo', {
        scale: 0.5,
        opacity: 0,
        duration: 1,
        ease: 'back.out(1.7)',
      })
        .from('.hero-greeting', {
          y: 40,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
        }, '-=0.4')
        .from('.hero-name', {
          y: 60,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        }, '-=0.4')
        .from('.hero-role', {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.out',
        }, '-=0.3')
        .from('.hero-quote', {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.out',
        }, '-=0.2')
        .from('.hero-buttons', {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.out',
        }, '-=0.2')
        .from('.hero-scroll', {
          y: 20,
          opacity: 0,
          duration: 0.5,
          ease: 'power3.out',
        }, '-=0.1');

      // Floating circles parallax
      gsap.to('.float-circle-1', {
        y: -40,
        x: 20,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      gsap.to('.float-circle-2', {
        y: 30,
        x: -25,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      gsap.to('.float-circle-3', {
        y: -25,
        x: -15,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* ─── Background Carousel ─── */}
      {carouselSlides.map((bg, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{
            background: bg,
            opacity: currentSlide === i ? 1 : 0,
          }}
        />
      ))}

      {/* ─── Dark Gradient Overlay ─── */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/60 to-primary z-[1]" />

      {/* ─── Floating Blur Circles ─── */}
      <div className="float-circle-1 absolute top-[15%] left-[10%] w-[300px] h-[300px] rounded-full bg-accent-cyan/20 blur-[100px] z-[2] pointer-events-none" />
      <div className="float-circle-2 absolute bottom-[20%] right-[10%] w-[350px] h-[350px] rounded-full bg-accent-purple/20 blur-[100px] z-[2] pointer-events-none" />
      <div className="float-circle-3 absolute top-[50%] right-[30%] w-[200px] h-[200px] rounded-full bg-accent-cyan/10 blur-[80px] z-[2] pointer-events-none" />

      {/* ─── Content ─── */}
      <div
        ref={contentRef}
        className="relative z-10 text-center flex flex-col items-center px-8 py-20 max-w-[1000px] w-full"
      >
        {/* Profile Photo */}
        <div ref={photoRef} className="hero-photo mb-12">
          <div className="relative">
            {/* Outer glow ring */}
            <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-accent-cyan/40 to-accent-purple/40 blur-xl animate-pulse" />
            {/* Glass border ring */}
            <div className="relative w-36 h-36 md:w-48 md:h-48 rounded-full p-[4px] bg-gradient-to-br from-accent-cyan to-accent-purple shadow-[0_0_50px_rgba(34,211,238,0.25)]">
              <div className="w-full h-full rounded-full overflow-hidden glass">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-full h-full object-cover scale-105"
                  onError={(e) => {
                    // Fallback if image doesn't exist
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.innerHTML = `
                      <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent-cyan/20 to-accent-purple/20 text-5xl font-heading font-bold gradient-text">${profile.name.charAt(0)}</div>
                    `;
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Greeting */}
        <p className="hero-greeting text-accent-cyan text-base md:text-xl mb-4 font-semibold tracking-[0.2em] uppercase">
          Halo, Saya
        </p>

        {/* Name */}
        <h1 className="hero-name text-5xl md:text-7xl lg:text-9xl font-extrabold mb-8 leading-[1.05] tracking-tight text-white">
          <span className="gradient-text">{profile.name}</span>
        </h1>

        {/* Animated Typing Role */}
        <div className="hero-role flex items-center gap-4 mb-8">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-accent-cyan" />
          <p className="text-lg md:text-2xl text-light-text font-light tracking-wide">
            <span className="text-accent-cyan font-semibold">{displayText}</span>
            <span className="typing-cursor" />
          </p>
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-accent-purple" />
        </div>

        {/* Quote */}
        <p className="hero-quote text-light-text/75 text-base md:text-lg max-w-[650px] mb-14 italic font-light leading-relaxed">
          "{profile.quote}"
        </p>

        {/* CTA Buttons */}
        <div className="hero-buttons flex flex-col sm:flex-row items-center gap-6">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-gradient rounded-full px-10 py-4 text-sm md:text-base flex items-center gap-2 glow-gradient transition-all duration-300 hover:scale-105"
          >
            <span className="flex items-center gap-2">
              Contact Me
              <ArrowRight size={18} />
            </span>
          </a>
          <a
            href="#portfolio"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-outline rounded-full px-10 py-4 text-sm md:text-base flex items-center gap-2 transition-all duration-300 hover:scale-105"
          >
            <Layers size={18} />
            My Projects
          </a>
        </div>
      </div>

      {/* ─── Scroll Indicator ─── */}
      <motion.div
        className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 cursor-pointer"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        onClick={() => {
          document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span className="text-light-text/50 text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-6 h-10 rounded-full border-2 border-light-text/30 flex items-start justify-center p-1.5">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-accent-cyan"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        <ChevronDown size={16} className="text-light-text/30" />
      </motion.div>
    </section>
  );
}
