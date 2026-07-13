import { useEffect, useRef, useState, type SVGProps } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, Globe, BookOpen } from 'lucide-react';
import { getProfile, getSocials } from '../lib/data';

/* ─── Custom SVG Icons (lucide doesn't include brand icons) ─── */
type IconComponent = React.ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;

const GithubIcon: IconComponent = ({ size = 22, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedinIcon: IconComponent = ({ size = 22, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const InstagramIcon: IconComponent = ({ size = 22, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const FacebookIcon: IconComponent = ({ size = 22, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const YoutubeIcon: IconComponent = ({ size = 22, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

/* ─── Animated Counter ─── */
function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref} className="stat-number gradient-text">
      {count}{suffix}
    </span>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const profile = getProfile();
  const socials = getSocials();

  const socialLinks = [
    { icon: GithubIcon as IconComponent, label: 'GitHub', href: socials.github, color: '#22D3EE' },
    { icon: LinkedinIcon as IconComponent, label: 'LinkedIn', href: socials.linkedin, color: '#8B5CF6' },
    { icon: InstagramIcon as IconComponent, label: 'Instagram', href: socials.instagram, color: '#22D3EE' },
    { icon: Mail as IconComponent, label: 'Email', href: socials.email, color: '#8B5CF6' },
    { icon: Phone as IconComponent, label: 'WhatsApp', href: socials.whatsapp, color: '#22D3EE' },
    { icon: Globe as IconComponent, label: 'Portfolio', href: socials.portfolio, color: '#8B5CF6' },
    { icon: BookOpen as IconComponent, label: 'Blog', href: socials.blog, color: '#22D3EE' },
    { icon: YoutubeIcon as IconComponent, label: 'YouTube', href: socials.youtube, color: '#8B5CF6' },
    { icon: FacebookIcon as IconComponent, label: 'Facebook', href: socials.facebook, color: '#22D3EE' },
  ].filter(l => l.href);

  const stats = [
    { value: profile.yearsExperience, suffix: '+', label: 'Years Experience' },
    { value: profile.totalProjects, suffix: '+', label: 'Projects' },
    { value: profile.totalCertificates, suffix: '+', label: 'Certificates' },
    { value: 10, suffix: '+', label: 'Happy Clients' },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 md:py-36 lg:py-44 overflow-hidden scroll-mt-28"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full bg-accent-purple/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-accent-cyan/5 blur-[100px] pointer-events-none" />

      <div className="section-container">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="h-[1px] w-12 bg-gradient-to-r from-accent-cyan to-transparent" />
          <span className="text-accent-cyan text-sm font-semibold tracking-widest uppercase">
            About
          </span>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left — About Text */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-10 leading-tight tracking-tight text-white"
            >
              About <span className="gradient-text">Me</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6 text-light-text/90"
            >
              {profile.about.split('\n').map((paragraph, index) => (
                <p key={index} className="leading-relaxed text-base md:text-lg font-light">
                  {paragraph}
                </p>
              ))}
            </motion.div>
          </div>

          {/* Right — Social Media + Stats */}
          <div className="flex flex-col justify-center lg:pt-4">
            {/* Social Media */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-14"
            >
              <h3 className="text-xs font-semibold text-accent-cyan/80 tracking-widest uppercase mb-6">
                Connect with me
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon group block w-full"
                    aria-label={social.label}
                  >
                    <div
                      className="rounded-2xl px-5 py-4 flex items-center gap-3.5 transition-all duration-300 border border-white/10 bg-white/[0.02] backdrop-blur-md group-hover:border-accent-cyan/40 group-hover:bg-white/[0.06] group-hover:shadow-[0_0_25px_rgba(34,211,238,0.12)]"
                    >
                      <social.icon
                        size={20}
                        className="text-light-text transition-colors duration-300 group-hover:text-accent-cyan"
                      />
                      <span className="text-sm font-medium text-light-text group-hover:text-white transition-colors duration-300">
                        {social.label}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                hidden: {},
                show: {
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
              className="about-stats-container"
            >
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat) => (
                  <motion.div
                    key={stat.label}
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                    }}
                    className="about-stat rounded-2xl p-6 text-center transition-all duration-300 border border-white/10 bg-white/[0.02] backdrop-blur-md hover:border-accent-cyan/30 hover:bg-white/[0.05] hover:shadow-[0_0_35px_rgba(34,211,238,0.1)]"
                  >
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                    <p className="text-light-text/75 text-xs md:text-sm mt-3 font-semibold uppercase tracking-wider">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Section Divider */}
        <div className="mt-28 flex justify-center">
          <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-accent-cyan/30 to-transparent" />
        </div>
      </div>
    </section>
  );
}
