import { motion } from 'framer-motion';
import { useInView } from './useInView';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { experiences } from '../data/data';

export default function ExperienceSection() {
  const [ref, isInView] = useInView(0.1);

  return (
    <section id="experience" className="relative py-32 overflow-hidden" ref={ref}>
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="font-mono text-sm text-indigo-400 tracking-wider uppercase mb-3 block">
            // Experience
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Professional{' '}
            <span className="text-gradient">journey</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
            Over the years I've gained valuable experience through freelancing and
            collaborations with diverse teams, startups, and organizations.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px">
            <motion.div
              className="w-full h-full"
              style={{
                background: 'linear-gradient(180deg, #6366f1, #a855f7, #ec4899, transparent)',
              }}
              initial={{ scaleY: 0, originY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
            />
          </div>

          {/* Timeline items */}
          <div className="space-y-12">
            {[...experiences].reverse().map((exp, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={`${exp.title}-${i}`}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                  className={`relative flex items-center ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-row`}
                >
                  {/* Dot */}
                  <div className="absolute left-0 md:left-1/2 -translate-x-1/2 z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{ duration: 0.3, delay: 0.3 + i * 0.1 }}
                      className="w-4 h-4 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600
                        shadow-lg shadow-indigo-500/30 ring-4 ring-[#04040a]"
                    />
                  </div>

                  {/* Card */}
                  <div className={`w-full md:w-[calc(50%-32px)] ${isLeft ? 'md:pr-0 md:mr-auto' : 'md:pl-0 md:ml-auto'} pl-8 md:pl-0`}>
                    <div className="group p-6 rounded-2xl glass card-shine hover:bg-white/[0.06] transition-all duration-300">
                      {/* Company badge */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/20
                            flex items-center justify-center">
                            <Briefcase size={14} className="text-indigo-400" />
                          </div>
                          <h3 className="font-display text-lg font-semibold text-white">
                            {exp.title}
                          </h3>
                        </div>
                      </div>

                      <p className="text-indigo-300 font-medium text-sm mb-2">
                        {exp.profession}
                      </p>

                      <div className="flex items-center gap-1.5 text-gray-500 text-xs font-mono">
                        <Calendar size={12} />
                        <span>{exp.date}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
