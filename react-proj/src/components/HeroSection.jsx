import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Send, ChevronDown, Sparkles } from 'lucide-react';
import { contacts } from '../data/data';
import useReducedMotion from './useReducedMotion';

const roles = [
  'Mobile Developer',
  'Flutter Engineer',
  'Android Developer',
  'iOS Developer',
  'Creative Coder',
];

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const accentRef = useRef(null);

  useEffect(() => {
    if (reducedMotion) return;
    const id = setInterval(() => {
      setRoleIndex((i) => (i + 1) % roles.length);
    }, 2600);
    return () => clearInterval(id);
  }, [reducedMotion]);

  // Cursor-tracked parallax accent — replaces the four floating shapes
  useEffect(() => {
    if (reducedMotion) return;
    const section = sectionRef.current;
    const accent = accentRef.current;
    if (!section || !accent) return;

    let raf = null;
    const onMove = (e) => {
      const rect = section.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        accent.style.transform = `translate3d(${x * 40}px, ${y * 40}px, 0)`;
      });
    };
    section.addEventListener('mousemove', onMove);
    return () => {
      section.removeEventListener('mousemove', onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reducedMotion]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Single cursor-parallax accent — replaces previous 4 floating shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          ref={accentRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full opacity-[0.07] transition-transform duration-[400ms] ease-out"
          style={{
            background:
              'radial-gradient(circle, #818cf8 0%, #c084fc 40%, transparent 70%)',
          }}
          aria-hidden="true"
        />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Status badge */}
        <motion.div variants={childVariants} className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10">
            <div className="status-dot" />
            <span className="text-sm text-gray-300 font-medium">
              Available for opportunities
            </span>
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={childVariants}
          className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight mb-4"
        >
          <span className="text-white glow-text">Taalay</span>
        </motion.h1>

        {/* Role — calm fade-cycle replaces the typewriter */}
        <motion.div
          variants={childVariants}
          className="flex items-center justify-center gap-2 mb-8 h-8"
        >
          <Sparkles size={18} className="text-indigo-400 shrink-0" />
          <div className="relative font-mono text-lg sm:text-xl md:text-2xl text-indigo-300">
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIndex}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                className="inline-block"
              >
                {roles[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Bio */}
        <motion.p
          variants={childVariants}
          className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Passionate software engineer crafting{' '}
          <span className="text-gray-200">clean, efficient, and user-friendly</span>{' '}
          solutions across mobile and web platforms.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={childVariants}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="magnetic-btn inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-base font-semibold
              bg-gradient-to-r from-indigo-500 to-purple-600 text-white
              hover:from-indigo-400 hover:to-purple-500 transition-all"
          >
            View My Work
            <ChevronDown size={18} className="animate-bounce" />
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="magnetic-btn inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-base font-semibold
              glass text-white hover:bg-white/10 transition-all"
          >
            Get in Touch
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          variants={childVariants}
          className="flex items-center justify-center gap-3"
        >
          {[
            { icon: Github, href: contacts.github, label: 'GitHub' },
            { icon: Linkedin, href: contacts.linkedin, label: 'LinkedIn' },
            { icon: Send, href: contacts.telegram, label: 'Telegram' },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="group p-3 rounded-xl glass hover:bg-white/10 transition-all duration-300"
            >
              <Icon
                size={20}
                className="text-gray-400 group-hover:text-white transition-colors"
              />
            </a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          animate={reducedMotion ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-gray-500 font-mono tracking-widest uppercase">
            Scroll
          </span>
          <div className="w-5 h-8 rounded-full border-2 border-gray-600 flex justify-center pt-1.5">
            <motion.div
              className="w-1 h-2 bg-gray-500 rounded-full"
              animate={reducedMotion ? {} : { y: [0, 8, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
