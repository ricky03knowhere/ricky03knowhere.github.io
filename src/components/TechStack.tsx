import { useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getTechStacks } from '../lib/data';

gsap.registerPlugin(ScrollTrigger);

// Helper to get Devicon SVG URLs or fallback
function getIconUrl(logo: string): string {
  const overrides: Record<string, string> = {
    nodedotjs: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
    shadcnui: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg', // Fallback for shadcn to tailwind
    nextjs: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg',
  };

  if (overrides[logo]) return overrides[logo];

  return `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${logo}/${logo}-original.svg`;
}

export default function TechStack() {
  const stacks = useMemo(() => getTechStacks(), []);
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  // Group by category if we want to show stats or categories
  const categories = useMemo(() => {
    return Array.from(new Set(stacks.map((s) => s.category)));
  }, [stacks]);

  // GSAP Parallax Scroll & Entrance Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax Background
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // Title & Marquee fade in
      gsap.from('.stack-title', {
        scrollTrigger: {
          trigger: '.stack-title',
          start: 'top 95%',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.from('.stack-marquee-wrapper', {
        scrollTrigger: {
          trigger: '.stack-marquee-wrapper',
          start: 'top 90%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Double the list to make infinite scrolling seamless
  const marqueeItems = [...stacks, ...stacks, ...stacks];

  return (
    <section
      id="stack"
      ref={sectionRef}
      className="relative section-padding overflow-hidden bg-secondary/20"
    >
      {/* ─── Parallax Background Layer ─── */}
      <div
        ref={bgRef}
        className="tech-parallax-bg absolute inset-0 opacity-10 pointer-events-none scale-110 z-0"
        style={{
          backgroundImage: `
            radial-gradient(var(--color-accent-cyan) 1px, transparent 1px),
            radial-gradient(var(--color-accent-purple) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0, 20px 20px',
        }}
      />

      {/* Glow Orbs */}
      <div className="absolute top-[40%] left-[20%] w-[300px] h-[300px] rounded-full bg-accent-cyan/5 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[20%] right-[20%] w-[250px] h-[250px] rounded-full bg-accent-purple/5 blur-[100px] pointer-events-none z-0" />

      <div className="section-container relative z-10">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-[1px] w-12 bg-gradient-to-r from-accent-cyan to-transparent" />
          <span className="text-accent-cyan text-sm font-semibold tracking-widest uppercase">
            Tech Stack
          </span>
        </div>

        {/* Section title */}
        <div className="stack-title flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            My <span className="gradient-text">Skills</span> & Tools
          </h2>
          <p className="text-light-text/70 max-w-[400px] text-sm md:text-base font-light">
            I work with modern frameworks, utilities, and devops infrastructure to build fast, robust products.
          </p>
        </div>
      </div>

      {/* ─── Infinite Marquee Track ─── */}
      <div className="stack-marquee-wrapper relative w-full overflow-hidden py-8 z-10">
        {/* Shadow overlays for smooth edge fading */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-primary to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-primary to-transparent z-20 pointer-events-none" />

        <div className="flex w-max marquee-track hover:[animation-play-state:paused] cursor-grab active:cursor-grabbing">
          {marqueeItems.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="flex items-center gap-4 px-8 py-4 mx-4 rounded-2xl glass transition-all duration-500 hover:border-accent-cyan/20 group hover:shadow-[0_0_30px_rgba(34,211,238,0.1)] hover:-translate-y-1 select-none"
            >
              {/* Logo container */}
              <div className="w-10 h-10 flex items-center justify-center relative">
                {/* Monochrome logo state / Colored on hover */}
                <img
                  src={getIconUrl(item.logo)}
                  alt={item.name}
                  className="w-8 h-8 object-contain filter grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500 ease-out"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.innerHTML = `
                      <div class="text-xs font-bold text-accent-cyan/70">${item.name.slice(0, 2)}</div>
                    `;
                  }}
                />
              </div>

              {/* Name and category */}
              <div className="flex flex-col">
                <span className="text-sm font-bold group-hover:text-white transition-colors duration-300">
                  {item.name}
                </span>
                <span className="text-[10px] text-light-text/50 uppercase tracking-wider font-semibold">
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Categories Breakdown ─── */}
      <div className="section-container relative z-10 mt-16 md:mt-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div key={category} className="glass rounded-[20px] p-6 hover:border-accent-purple/20 transition-all duration-300">
              <h3 className="text-lg font-bold mb-4 gradient-text">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {stacks
                  .filter((s) => s.category === category)
                  .map((s) => (
                    <span
                      key={s.id}
                      className="px-3 py-1.5 rounded-xl border border-glass-border text-xs text-light-text font-medium transition-all duration-300 hover:border-accent-cyan/20 hover:text-white hover:bg-white/5"
                    >
                      {s.name}
                    </span>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
