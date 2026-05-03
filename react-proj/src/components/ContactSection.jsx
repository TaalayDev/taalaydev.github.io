import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from './useInView';
import {
  Mail,
  Github,
  Linkedin,
  Send,
  ArrowUpRight,
  Copy,
  Check,
  MapPin,
  MessageCircle,
} from 'lucide-react';
import { contacts } from '../data/data';

export default function ContactSection() {
  const [ref, isInView] = useInView(0.2);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contacts.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: contacts.github,
      handle: '@TaalayDev',
      color: '#f0f6fc',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: contacts.linkedin,
      handle: 'taalaydev',
      color: '#0a66c2',
    },
    {
      icon: Send,
      label: 'Telegram',
      href: contacts.telegram,
      handle: '@taalay_dev',
      color: '#26a5e4',
    },
  ];

  return (
    <section id="contact" className="relative py-32 overflow-hidden" ref={ref}>
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-sm text-indigo-400 tracking-wider uppercase mb-3 block">
            // Contact
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Let's build something{' '}
            <span className="text-gradient">amazing</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
            Have a project in mind or just want to chat? I'm always open to
            discussing new opportunities and ideas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Email Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-8 rounded-2xl glass relative group overflow-hidden"
          >
            {/* Background gradient on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-purple-600/5 opacity-0
              group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600
                  flex items-center justify-center shadow-lg shadow-indigo-500/20">
                  <Mail size={22} className="text-white" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-white">
                    Drop me an email
                  </h3>
                  <p className="text-gray-500 text-sm">Usually respond within 24 hours</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={`mailto:${contacts.email}`}
                  className="font-mono text-indigo-300 hover:text-indigo-200 transition-colors text-sm sm:text-base break-all"
                >
                  {contacts.email}
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg glass hover:bg-white/10 transition-all flex-shrink-0"
                  title="Copy email"
                >
                  {copied ? (
                    <Check size={14} className="text-emerald-400" />
                  ) : (
                    <Copy size={14} className="text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Location Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="p-8 rounded-2xl glass relative group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/5 to-cyan-600/5 opacity-0
              group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500
                  flex items-center justify-center shadow-lg shadow-emerald-500/20">
                  <MapPin size={22} className="text-white" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-white">
                    Location
                  </h3>
                  <p className="text-gray-500 text-sm">Open to remote work worldwide</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="status-dot" />
                <span className="text-gray-300 font-medium">
                  Kyrgyzstan — Available for remote
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto mt-8"
        >
          {socialLinks.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 rounded-2xl glass hover:bg-white/[0.06] transition-all duration-300
                flex items-center gap-4"
            >
              <link.icon
                size={24}
                className="text-gray-400 group-hover:text-white transition-colors flex-shrink-0"
              />
              <div className="min-w-0">
                <div className="text-sm font-semibold text-white flex items-center gap-1">
                  {link.label}
                  <ArrowUpRight
                    size={14}
                    className="text-gray-500 group-hover:text-indigo-400 transition-colors"
                  />
                </div>
                <div className="text-xs text-gray-500 truncate">{link.handle}</div>
              </div>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
