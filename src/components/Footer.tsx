import { ArrowUp } from 'lucide-react';
import { getProfile, getSocials } from '../lib/data';

export default function Footer() {
  const profile = getProfile();
  const socials = getSocials();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-glass-border">
      <div className="section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-cyan to-accent-purple flex items-center justify-center text-white font-bold text-sm font-heading">
                {profile.nickname?.charAt(0) || 'R'}
              </div>
              <span className="text-white font-heading font-bold">{profile.nickname || profile.name}</span>
            </div>
            <p className="text-light-text/50 text-xs leading-relaxed max-w-xs">
              {profile.profession}. Building digital experiences that are modern, functional, and aesthetic.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-heading font-semibold text-sm mb-3">Contact</h4>
            <div className="space-y-2 text-xs text-light-text/60">
              <p>{profile.location}</p>
              <a href={`mailto:${profile.email}`} className="block hover:text-accent-cyan transition-colors">{profile.email}</a>
              <a href={profile.whatsapp} target="_blank" rel="noopener noreferrer" className="block hover:text-accent-cyan transition-colors">
                WhatsApp: {profile.phone}
              </a>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-heading font-semibold text-sm mb-3">Social</h4>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'GitHub', url: socials.github },
                { label: 'LinkedIn', url: socials.linkedin },
                { label: 'Instagram', url: socials.instagram },
              ].filter(s => s.url).map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg text-xs text-light-text/60 border border-glass-border hover:text-white hover:border-accent-cyan/30 transition-all duration-300"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-glass-border">
          <p className="text-light-text/40 text-xs">
            © {currentYear} {profile.name}. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-xl glass-card text-xs text-light-text/60 hover:text-white hover:border-accent-cyan/30 transition-all duration-300 group"
          >
            Back to Top
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
