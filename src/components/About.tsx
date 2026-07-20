import { useEffect, useRef, useState, type SVGProps } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail } from 'lucide-react';
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

const WhatsappIcon: IconComponent = ({ size = 22, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" fillRule="evenodd" clipRule="evenodd" {...props}>
    <path d="M12.031 1.5C6.219 1.5 1.5 6.219 1.5 12.031c0 1.912.516 3.7 1.414 5.24L1.5 22.5l5.357-1.383a10.48 10.48 0 0 0 5.174 1.364C17.844 22.481 22.5 17.78 22.5 12.031 22.5 6.219 17.844 1.5 12.031 1.5Zm0 1.875a8.594 8.594 0 0 1 8.594 8.656c0 4.734-3.86 8.575-8.594 8.575a8.6 8.6 0 0 1-4.39-1.2l-.306-.183-3.178.833.85-3.1-.2-.317a8.522 8.522 0 0 1-1.37-4.608 8.594 8.594 0 0 1 8.594-8.656Z" />
    <path d="M8.79 7.104c-.227-.504-.465-.514-.68-.523-.177-.008-.379-.007-.58-.007-.202 0-.53.076-.808.38-.277.304-1.059 1.034-1.059 2.522 0 1.488 1.084 2.926 1.235 3.128.15.202 2.094 3.344 5.166 4.555 2.554 1.006 3.074.806 3.628.755.555-.05 1.79-.731 2.042-1.438.253-.706.253-1.312.177-1.438-.075-.126-.277-.202-.58-.353-.302-.151-1.79-.883-2.068-.984-.278-.1-.48-.15-.681.152-.202.303-.78.983-.957 1.186-.176.202-.353.227-.655.076-.303-.151-1.277-.47-2.433-1.5-.9-.802-1.507-1.793-1.684-2.096-.176-.303-.019-.467.133-.617.136-.136.303-.353.454-.53.151-.177.202-.303.303-.505.1-.202.05-.38-.026-.53-.075-.151-.668-1.625-.933-2.219Z" />
  </svg>
);

const BloggerIcon: IconComponent = ({ size = 22, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M21.976 24H2.026C.9 24 0 23.1 0 21.976V2.026C0 .9.9 0 2.025 0H22.05C23.1 0 24 .9 24 2.025v19.95C24 23.1 23.1 24 21.976 24zM12 3.975H9c-2.775 0-5.025 2.25-5.025 5.025v6c0 2.774 2.25 5.024 5.025 5.024h6c2.774 0 5.024-2.25 5.024-5.024v-3.975c0-.6-.45-1.05-1.05-1.05H18c-.524 0-.976-.45-.976-.976 0-2.776-2.25-5.026-5.024-5.026zm3.074 12H9c-.525 0-.975-.45-.975-.975s.45-.976.975-.976h6.074c.526 0 .977.45.977.976s-.45.976-.975.976zm-2.55-7.95c.527 0 .976.45.976.975s-.45.975-.975.975h-3.6c-.525 0-.976-.45-.976-.975s.45-.975.975-.975h3.6z" />
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
    { icon: WhatsappIcon as IconComponent, label: 'WhatsApp', href: socials.whatsapp, color: '#22D3EE' },
    // { icon: Globe as IconComponent, label: 'Portfolio', href: socials.portfolio, color: '#8B5CF6' },
    { icon: BloggerIcon as IconComponent, label: 'Blog', href: socials.blog, color: '#22D3EE' },
    { icon: YoutubeIcon as IconComponent, label: 'YouTube', href: socials.youtube, color: '#8B5CF6' },
    { icon: FacebookIcon as IconComponent, label: 'Facebook', href: socials.facebook, color: '#22D3EE' },
  ].filter(l => l.href);

  const stats = [
    { value: profile.yearsExperience, suffix: '+', label: 'Years Experience' },
    { value: profile.totalProjects, suffix: '+', label: 'Projects' },
    { value: profile.totalCertificates, suffix: '+', label: 'Certificates' },
    { value: profile.happyClients, suffix: '+', label: 'Happy Clients' },
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
              Who am <span className="gradient-text">I</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6 text-light-text/90"
            >
              {profile.about.split('\n').map((paragraph, index) => (
                <p key={index} className="leading-relaxed text-base md:text-lg font-light text-justify">
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

          </div>
        </div>
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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

        {/* Section Divider */}
        <div className="mt-28 flex justify-center">
          <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-accent-cyan/30 to-transparent" />
        </div>
      </div>
    </section>
  );
}
