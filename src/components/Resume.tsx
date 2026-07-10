import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Briefcase, Award, Calendar, MapPin, ExternalLink, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getEducation, getExperience, getCertificates } from '../lib/data';
import type { Education } from '../types/Education';
import type { Experience } from '../types/Experience';
import type { Certificate } from '../types/Certificate';

gsap.registerPlugin(ScrollTrigger);

const tabs = [
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'certificate', label: 'Certificate', icon: Award },
];

/* ── Education Timeline ── */
function EducationTimeline({ items }: { items: Education[] }) {
  return (
    <div className="relative pl-8 md:pl-12">
      {/* Vertical line */}
      <div className="absolute left-3 md:left-5 top-0 bottom-0 w-px bg-gradient-to-b from-accent-cyan via-accent-purple to-transparent" />

      {items.map((edu, i) => (
        <motion.div
          key={edu.id}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.15, duration: 0.5 }}
          className="relative mb-10 last:mb-0"
        >
          {/* Dot */}
          <div className="absolute -left-5 md:-left-7 top-1 w-4 h-4 rounded-full bg-accent-cyan shadow-[0_0_12px_rgba(34,211,238,0.5)] border-2 border-primary" />

          <div className="glass-card p-6 rounded-2xl hover:border-accent-cyan/30 transition-all duration-300">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
              <h3 className="text-lg font-bold text-white font-heading">{edu.school}</h3>
              <span className="flex items-center gap-1.5 text-xs text-accent-cyan font-medium">
                <Calendar className="w-3.5 h-3.5" />
                {edu.startYear} — {edu.endYear}
              </span>
            </div>
            <p className="text-light-text text-sm mb-1">{edu.degree} — {edu.major}</p>
            {edu.gpa && (
              <span className="inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full bg-accent-purple/10 text-accent-purple border border-accent-purple/20">
                IPK {edu.gpa}
              </span>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ── Experience Timeline ── */
function ExperienceTimeline({ items }: { items: Experience[] }) {
  function formatPeriod(start: string, end: string, isCurrent: boolean) {
    const fmt = (d: string) => {
      const [y, m] = d.split('-');
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return `${months[parseInt(m) - 1]} ${y}`;
    };
    return `${fmt(start)} — ${isCurrent ? 'Present' : fmt(end)}`;
  }

  function calcDuration(start: string, end: string, isCurrent: boolean) {
    const s = new Date(start);
    const e = isCurrent ? new Date() : new Date(end);
    const months = (e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth());
    const y = Math.floor(months / 12);
    const m = months % 12;
    return y > 0 ? `${y} yr${y > 1 ? 's' : ''} ${m} mo${m !== 1 ? 's' : ''}` : `${m} mo${m !== 1 ? 's' : ''}`;
  }

  return (
    <div className="relative pl-8 md:pl-12">
      <div className="absolute left-3 md:left-5 top-0 bottom-0 w-px bg-gradient-to-b from-accent-purple via-accent-cyan to-transparent" />

      {items.map((exp, i) => (
        <motion.div
          key={exp.id}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.15, duration: 0.5 }}
          className="relative mb-10 last:mb-0"
        >
          <div className="absolute -left-5 md:-left-7 top-1 w-4 h-4 rounded-full border-2 border-primary shadow-[0_0_12px_rgba(139,92,246,0.5)]"
            style={{ backgroundColor: exp.isCurrent ? '#8B5CF6' : '#22D3EE' }}
          />

          <div className="glass-card p-6 rounded-2xl hover:border-accent-purple/30 transition-all duration-300">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
              <div>
                <h3 className="text-lg font-bold text-white font-heading">{exp.position}</h3>
                <p className="text-accent-cyan text-sm font-medium">{exp.company}</p>
              </div>
              <div className="text-right shrink-0">
                {exp.isCurrent && (
                  <span className="inline-block mb-1 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                    Current
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 mb-3 text-xs text-light-text/70">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatPeriod(exp.startDate, exp.endDate, exp.isCurrent)}
              </span>
              <span className="text-accent-cyan/50">·</span>
              <span>{calcDuration(exp.startDate, exp.endDate, exp.isCurrent)}</span>
              <span className="text-accent-cyan/50">·</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {exp.location}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-white/5 text-light-text/60 text-[10px]">
                {exp.employmentType}
              </span>
            </div>

            <p className="text-light-text/80 text-sm leading-relaxed mb-4">{exp.description}</p>

            <div className="flex flex-wrap gap-1.5">
              {exp.stack.map((s) => (
                <span key={s} className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-accent-purple/10 text-accent-purple border border-accent-purple/20">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ── Certificate Gallery (Masonry) ── */
function CertificateGallery({ items }: { items: Certificate[] }) {
  const [selected, setSelected] = useState<Certificate | null>(null);

  return (
    <>
      {/* Masonry grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-0">
        {items.map((cert, i) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className="relative break-inside-avoid cursor-pointer group overflow-hidden"
            onClick={() => setSelected(cert)}
          >
            <img
              src={cert.image}
              alt={cert.title}
              className="w-full block transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <h4 className="text-white font-bold text-sm font-heading">{cert.title}</h4>
              <p className="text-accent-cyan text-xs">{cert.issuer} · {cert.year}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Fullscreen modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-xl bg-primary/70"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-3xl w-full"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute -top-3 -right-3 z-10 w-10 h-10 rounded-full glass-card flex items-center justify-center text-white hover:text-accent-cyan transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <img
                src={selected.image}
                alt={selected.title}
                className="w-full rounded-2xl shadow-2xl"
              />
              <div className="mt-4 text-center">
                <h3 className="text-xl font-bold text-white font-heading">{selected.title}</h3>
                <p className="text-accent-cyan text-sm mt-1">{selected.issuer} · {selected.year}</p>
                {selected.credential && (
                  <a
                    href={selected.credential}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-3 px-4 py-2 rounded-xl btn-gradient text-xs font-semibold"
                  >
                    View Credential <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Main Resume Section ── */
export default function Resume() {
  const [activeTab, setActiveTab] = useState('education');
  const sectionRef = useRef<HTMLElement>(null);

  const education = getEducation();
  const experience = getExperience();
  const certificates = getCertificates();

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.fromTo(
      sectionRef.current.querySelectorAll('.resume-animate'),
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      }
    );
  }, []);

  return (
    <section id="resume" ref={sectionRef} className="relative section-padding overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-[10%] left-0 w-[400px] h-[400px] rounded-full bg-accent-purple/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-0 w-[350px] h-[350px] rounded-full bg-accent-cyan/5 blur-[100px] pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="resume-animate mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-[1px] w-12 bg-gradient-to-r from-accent-cyan to-transparent" />
            <span className="text-accent-cyan text-sm font-semibold tracking-widest uppercase">Resume</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="text-4xl md:text-5xl font-bold text-white font-heading">
              My <span className="text-gradient">Journey</span>
            </h2>
            <p className="text-light-text/70 text-sm max-w-md">
              A chronicle of my education, professional experience, and earned certifications.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="resume-animate flex flex-wrap gap-2 mb-10">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300
                  ${isActive
                    ? 'bg-gradient-to-r from-accent-cyan to-accent-purple text-white shadow-[0_0_20px_rgba(34,211,238,0.3)]'
                    : 'glass-card text-light-text/70 hover:text-white hover:border-accent-cyan/30'
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'education' && <EducationTimeline items={education} />}
            {activeTab === 'experience' && <ExperienceTimeline items={experience} />}
            {activeTab === 'certificate' && <CertificateGallery items={certificates} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
