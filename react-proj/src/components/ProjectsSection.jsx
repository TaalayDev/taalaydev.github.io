import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from './useInView';
import { ExternalLink, Github, Globe, Smartphone, Monitor, Apple, X } from 'lucide-react';
import { projects } from '../data/data';

const platformIcons = {
  ios: { icon: Apple, label: 'iOS' },
  macos: { icon: Monitor, label: 'macOS' },
  web: { icon: Globe, label: 'Web' },
  sourcecode: { icon: Github, label: 'Source' },
};

export default function ProjectsSection() {
  const [ref, isInView] = useInView(0.05);
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState('all');

  const stacks = ['all', ...new Set(projects.flatMap((p) => p.stack))];

  const filteredProjects =
    filter === 'all'
      ? projects
      : projects.filter((p) => p.stack.includes(filter));

  return (
    <section id="projects" className="relative py-32 overflow-hidden" ref={ref}>
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="font-mono text-sm text-indigo-400 tracking-wider uppercase mb-3 block">
            // Projects
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Featured{' '}
            <span className="text-gradient">work</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
            A collection of projects I've built, from creative tools to educational
            apps — each crafted with attention to detail.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-12"
        >
          {stacks.map((stack) => (
            <button
              key={stack}
              onClick={() => setFilter(stack)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                filter === stack
                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                  : 'glass text-gray-400 hover:text-white hover:bg-white/[0.06]'
              }`}
            >
              {stack === 'all' ? 'All' : stack}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.name + i}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="project-card rounded-2xl glass overflow-hidden cursor-pointer group"
                onClick={() => setSelectedProject(project)}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-surface-800 to-surface-900">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-contain p-6
                      group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#04040a] via-transparent to-transparent
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Platform badges */}
                  <div className="absolute bottom-3 left-3 flex gap-1.5 opacity-0 group-hover:opacity-100
                    transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    {Object.entries(project.platforms || {}).map(([platform, url]) => {
                      const config = platformIcons[platform];
                      if (!config) return null;
                      const Icon = config.icon;
                      return (
                        <a
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="platform-badge p-1.5 rounded-lg bg-white/10 backdrop-blur-sm
                            hover:bg-white/20 transition-all"
                          title={config.label}
                        >
                          <Icon size={14} className="text-white" />
                        </a>
                      );
                    })}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-display text-lg font-semibold text-white group-hover:text-indigo-300 transition-colors">
                      {project.name}
                    </h3>
                    <ExternalLink
                      size={16}
                      className="text-gray-500 group-hover:text-indigo-400 transition-colors mt-1 flex-shrink-0"
                    />
                  </div>

                  <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Stack tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 rounded-md text-xs font-mono
                          bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function ProjectModal({ project, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto
          rounded-2xl bg-surface-900 border border-white/10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-lg glass text-gray-400
            hover:text-white hover:bg-white/10 transition-all"
        >
          <X size={18} />
        </button>

        {/* Image header */}
        <div className="relative h-56 overflow-hidden bg-gradient-to-br from-surface-800 to-surface-950 rounded-t-2xl">
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-contain p-8"
          />
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-surface-900 to-transparent" />
        </div>

        {/* Content */}
        <div className="p-8 -mt-4 relative">
          <h2 className="font-display text-2xl font-bold text-white mb-2">
            {project.name}
          </h2>

          <p className="text-gray-400 leading-relaxed mb-6">{project.description}</p>

          {/* Stack */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-lg text-sm font-mono font-medium
                  bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Features */}
          {project.note && project.note.length > 0 && (
            <div className="mb-6">
              <h3 className="font-display text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">
                Key Features
              </h3>
              <ul className="space-y-2">
                {project.note.map((note, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-gray-400 text-sm leading-relaxed"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 flex-shrink-0" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Platform links */}
          <div className="flex flex-wrap gap-3">
            {Object.entries(project.platforms || {}).map(([platform, url]) => {
              const config = platformIcons[platform];
              if (!config) return null;
              const Icon = config.icon;
              return (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="magnetic-btn inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium
                    glass hover:bg-white/10 text-gray-300 hover:text-white transition-all"
                >
                  <Icon size={16} />
                  {config.label}
                </a>
              );
            })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
