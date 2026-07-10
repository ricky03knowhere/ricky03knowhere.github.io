import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2, CheckCircle2, AlertCircle, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getProfile, getSocials } from '../lib/data';

gsap.registerPlugin(ScrollTrigger);

interface FormData {
  name: string;
  email: string;
  instagram: string;
  message: string;
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export default function Contact() {
  const profile = getProfile();
  const socials = getSocials();

  const [form, setForm] = useState<FormData>({ name: '', email: '', instagram: '', message: '' });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.fromTo(
      sectionRef.current.querySelectorAll('.contact-animate'),
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, stagger: 0.12, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      }
    );
  }, []);

  function validate(): boolean {
    const errs: Partial<Record<keyof FormData, string>> = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email';
    if (!form.message.trim()) errs.message = 'Message is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');
    try {
      // Google Apps Script endpoint (placeholder)
      // Replace with actual deployed web app URL
      const SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';

      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          timestamp: new Date().toISOString(),
        }),
      });

      setStatus('success');
      setForm({ name: '', email: '', instagram: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  }

  const inputClass = (field: keyof FormData) => `
    w-full px-4 py-3 rounded-xl bg-white/[0.03] border transition-all duration-300 text-sm text-white placeholder-light-text/40 outline-none
    ${errors[field]
      ? 'border-red-500/50 focus:border-red-500'
      : 'border-glass-border focus:border-accent-cyan/50 hover:border-white/20'
    }
    focus:shadow-[0_0_20px_rgba(34,211,238,0.1)]
  `;

  return (
    <section id="contact" ref={sectionRef} className="relative section-padding overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-[20%] right-0 w-[500px] h-[500px] rounded-full bg-accent-cyan/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-0 w-[400px] h-[400px] rounded-full bg-accent-purple/5 blur-[120px] pointer-events-none" />

      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left — Text */}
          <div className="flex flex-col justify-center">
            <div className="contact-animate">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-[1px] w-12 bg-gradient-to-r from-accent-cyan to-transparent" />
                <span className="text-accent-cyan text-sm font-semibold tracking-widest uppercase">Contact</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white font-heading mb-6">
                Let's <span className="text-gradient">Connect</span>
              </h2>
              <p className="text-light-text/70 text-sm leading-relaxed mb-8 max-w-md">
                Have a project in mind or just want to say hello? I'm always open to discussing new opportunities, creative ideas, or collaborations.
              </p>
            </div>

            {/* Contact Info */}
            <div className="contact-animate space-y-4 mb-8">
              <a href={`mailto:${profile.email}`} className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl glass-card flex items-center justify-center group-hover:border-accent-cyan/40 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all duration-300">
                  <Mail className="w-5 h-5 text-accent-cyan" />
                </div>
                <div>
                  <p className="text-xs text-light-text/50">Email</p>
                  <p className="text-sm text-white group-hover:text-accent-cyan transition-colors">{profile.email}</p>
                </div>
              </a>

              <a href={profile.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl glass-card flex items-center justify-center group-hover:border-accent-purple/40 group-hover:shadow-[0_0_15px_rgba(139,92,246,0.2)] transition-all duration-300">
                  <Phone className="w-5 h-5 text-accent-purple" />
                </div>
                <div>
                  <p className="text-xs text-light-text/50">WhatsApp</p>
                  <p className="text-sm text-white group-hover:text-accent-purple transition-colors">{profile.phone}</p>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl glass-card flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-light-text/50" />
                </div>
                <div>
                  <p className="text-xs text-light-text/50">Location</p>
                  <p className="text-sm text-white">{profile.location}</p>
                </div>
              </div>
            </div>

            {/* Social row */}
            <div className="contact-animate flex gap-3">
              {[
                { label: 'GitHub', url: socials.github },
                { label: 'LinkedIn', url: socials.linkedin },
                { label: 'Instagram', url: socials.instagram },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl glass-card text-xs text-light-text/70 hover:text-white hover:border-accent-cyan/30 flex items-center gap-1.5 transition-all duration-300"
                >
                  {s.label}
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              ))}
            </div>
          </div>

          {/* Right — Glass Form */}
          <div className="contact-animate">
            <form onSubmit={handleSubmit} className="glass-card p-8 rounded-3xl space-y-5">
              <div>
                <label htmlFor="contact-name" className="block text-xs text-light-text/60 mb-1.5 font-medium">Name *</label>
                <input
                  id="contact-name"
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={e => { setForm(p => ({ ...p, name: e.target.value })); setErrors(p => ({ ...p, name: undefined })); }}
                  className={inputClass('name')}
                />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-xs text-light-text/60 mb-1.5 font-medium">Email *</label>
                <input
                  id="contact-email"
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={e => { setForm(p => ({ ...p, email: e.target.value })); setErrors(p => ({ ...p, email: undefined })); }}
                  className={inputClass('email')}
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="contact-instagram" className="block text-xs text-light-text/60 mb-1.5 font-medium">Instagram</label>
                <input
                  id="contact-instagram"
                  type="text"
                  placeholder="@username"
                  value={form.instagram}
                  onChange={e => setForm(p => ({ ...p, instagram: e.target.value }))}
                  className={inputClass('instagram')}
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs text-light-text/60 mb-1.5 font-medium">Message *</label>
                <textarea
                  id="contact-message"
                  rows={5}
                  placeholder="Tell me about your project or just say hello..."
                  value={form.message}
                  onChange={e => { setForm(p => ({ ...p, message: e.target.value })); setErrors(p => ({ ...p, message: undefined })); }}
                  className={`${inputClass('message')} resize-none`}
                />
                {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl btn-gradient text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Toast */}
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm"
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  Message sent successfully! I'll get back to you soon.
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  Failed to send message. Please try again.
                </motion.div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
