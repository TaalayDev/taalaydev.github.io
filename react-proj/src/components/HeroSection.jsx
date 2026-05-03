import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Send, ChevronDown, Sparkles } from 'lucide-react';
import { contacts } from '../data/data';

const roles = [
  'Mobile Developer',
  'Flutter Engineer',
  'Android Developer',
  'iOS Developer',
  'Creative Coder',
];

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const typeRole = useCallback(() => {
    const currentRole = roles[roleIndex];
    if (!isDeleting) {
      if (displayText.length < currentRole.length) {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
      } else {
        setTimeout(() => setIsDeleting(true), 2000);
        return;
      }
    } else {
      if (displayText.length > 0) {
        setDisplayText(currentRole.substring(0, displayText.length - 1));
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
        return;
      }
    }
  }, [displayText, isDeleting, roleIndex]);

  useEffect(() => {
    const speed = isDeleting ? 40 : 80;
    const timer = setTimeout(typeRole, speed);
    return () => clearTimeout(timer);
  }, [typeRole, isDeleting]);

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
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Floating geometric shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-[15%] w-64 h-64 rounded-full opacity-[0.04]"
          style={{ background: 'radial-gradient(circle, #6366f1, transparent)' }}
          animate={{ y: [-20, 20, -20], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute bottom-32 right-[10%] w-48 h-48 rounded-full opacity-[0.03]"
          style={{ background: 'radial-gradient(circle, #ec4899, transparent)' }}
          animate={{ y: [15, -15, 15], x: [-10, 10, -10] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-[40%] right-[25%] w-2 h-2 bg-indigo-400 rounded-full"
          animate={{ y: [-30, 30, -30], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-[30%] left-[10%] w-1.5 h-1.5 bg-purple-400 rounded-full"
          animate={{ y: [20, -20, 20], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        <motion.div
          className="absolute bottom-[40%] left-[30%] w-1 h-1 bg-pink-400 rounded-full"
          animate={{ y: [-15, 15, -15], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
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

        {/* Role typing */}
        <motion.div
          variants={childVariants}
          className="flex items-center justify-center gap-2 mb-8"
        >
          <Sparkles size={18} className="text-indigo-400" />
          <span className="font-mono text-lg sm:text-xl md:text-2xl text-indigo-300">
            {displayText}
            <span className="typing-cursor" />
          </span>
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
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-gray-500 font-mono tracking-widest uppercase">
            Scroll
          </span>
          <div className="w-5 h-8 rounded-full border-2 border-gray-600 flex justify-center pt-1.5">
            <motion.div
              className="w-1 h-2 bg-gray-500 rounded-full"
              animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
