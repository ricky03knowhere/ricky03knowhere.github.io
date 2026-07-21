import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import gsap from 'gsap';
import { getInterests } from '../lib/data';
import type { Interest } from '../types/Interest';

/* ── Galaxy Node (Floating Bubble) ── */
function GalaxyNode({
  interest,
  index,
  total,
  onSelect,
  containerSize,
}: {
  interest: Interest;
  index: number;
  total: number;
  onSelect: (i: Interest) => void;
  containerSize: { w: number; h: number };
}) {
  const nodeRef = useRef<HTMLButtonElement>(null);
  const baseSize = 90 + (interest.title.length < 8 ? 0 : 20);

  // Arrange in organic spiral layout
  useEffect(() => {
    if (!nodeRef.current || containerSize.w === 0) return;

    const angle = (index / total) * Math.PI * 2 * 1.618;
    const maxRadius = Math.min(containerSize.w, containerSize.h) * 0.5;
    const radius = maxRadius * 0.2 + (index / total) * maxRadius * 0.8;
    const cx = containerSize.w / 2;
    const cy = containerSize.h / 2;

    // Clamp nodes within container bounds
    const rawX = cx + Math.cos(angle) * radius - baseSize / 2;
    const rawY = cy + Math.sin(angle) * radius - baseSize / 2;
    const padding = 10;
    const x = Math.max(padding, Math.min(rawX, containerSize.w - baseSize - padding));
    const y = Math.max(padding, Math.min(rawY, containerSize.h - baseSize - padding));

    gsap.set(nodeRef.current, { x, y });

    // Floating animation
    gsap.to(nodeRef.current, {
      y: `+=${8 + Math.random() * 12}`,
      x: `+=${4 + Math.random() * 8}`,
      duration: 3 + Math.random() * 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: Math.random() * 2,
    });
  }, [index, total, containerSize, baseSize]);

  // Mouse repel effect
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!nodeRef.current) return;
    const rect = nodeRef.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 100) {
      const force = (100 - dist) / 100;
      gsap.to(nodeRef.current, {
        x: `+=${-dx * force * 0.3}`,
        y: `+=${-dy * force * 0.3}`,
        duration: 0.4,
        ease: 'power2.out',
      });
    }
  }, []);

  const colors = [
    'rgba(34,211,238,0.15)',
    'rgba(139,92,246,0.15)',
    'rgba(34,211,238,0.1)',
    'rgba(139,92,246,0.1)',
  ];

  return (
    <button
      ref={nodeRef}
      onMouseMove={handleMouseMove}
      onClick={() => onSelect(interest)}
      className="absolute group cursor-pointer scale-70 md:scale-80 lg:scale-100"
      style={{ width: baseSize, height: baseSize }}
    >
      <div
        className="w-full h-full rounded-full flex items-center justify-center backdrop-blur-md border border-white/10 transition-all duration-300 group-hover:scale-110 group-hover:border-accent-cyan/40 group-hover:shadow-[0_0_30px_rgba(34,211,238,0.3)]"
        style={{ background: colors[index % colors.length] }}
      >
        <span className="text-[10px] md:text-xs font-semibold text-white/80 group-hover:text-white text-center leading-tight px-2 pointer-events-none">
          {interest.title}
        </span>
      </div>
    </button>
  );
}

/* ── Main Interest Section ── */
export default function Interest() {
  const interests = getInterests();
  const [selected, setSelected] = useState<Interest | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [containerSize, setContainerSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    if (!containerRef.current) return;
    const updateSize = () => {
      if (!containerRef.current) return;
      setContainerSize({
        w: containerRef.current.offsetWidth,
        h: containerRef.current.offsetHeight,
      });
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.fromTo(
      sectionRef.current.querySelectorAll('.interest-animate'),
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      }
    );
  }, []);

  return (
    <section id="interest" ref={sectionRef} className="relative section-padding overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary via-secondary/30 to-primary pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="interest-animate text-center mb-8 md:mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-accent-cyan to-transparent" />
            <span className="text-accent-cyan text-sm font-semibold tracking-widest uppercase">Interest</span>
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-accent-cyan to-transparent" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white font-heading mb-4">
            My <span className="text-gradient">Universe</span>
          </h2>
          <p className="text-light-text/60 text-sm max-w-lg mx-auto">
            Click on the floating nodes to explore my interests and passions beyond code.
          </p>
        </div>

        {/* Galaxy Container */}
        <div>
          {/* Galaxy */}
          <div
            ref={containerRef}
            className="interest-animate relative min-h-[450px] lg:min-h-[700px] rounded-3xl border border-glass-border overflow-hidden"
            style={{ background: 'radial-gradient(ellipse at center, rgba(14,28,47,0.8) 0%, rgba(8,18,32,0.95) 70%)' }}
          >
            {/* Ambient star particles */}
            {Array.from({ length: 40 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white/20 animate-pulse"
                style={{
                  width: Math.random() * 2 + 1,
                  height: Math.random() * 2 + 1,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 3}s`,
                }}
              />
            ))}

            {/* Nodes */}
            {containerSize.w > 0 && interests.map((interest, i) => (
              <GalaxyNode
                key={interest.id}
                interest={interest}
                index={i}
                total={interests.length}
                onSelect={setSelected}
                containerSize={containerSize}
              />
            ))}
          </div>
        </div>

        {/* Modal Popup */}
        <AnimatePresence mode="wait">
          {selected && (
            <motion.div
              key={selected.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelected(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="glass-card rounded-3xl overflow-hidden max-w-md w-full flex flex-col border border-white/10 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={selected.image}
                    alt={selected.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent" />
                  <button
                    onClick={() => setSelected(null)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full backdrop-blur-md bg-white/10 border border-white/10 flex items-center justify-center text-white hover:text-accent-cyan transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col">
                  <h3 className="text-2xl font-bold text-white font-heading mb-3">
                    {selected.title}
                  </h3>
                  <p className="text-light-text/75 text-sm leading-relaxed font-light">
                    {selected.description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
