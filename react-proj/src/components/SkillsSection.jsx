import { motion } from 'framer-motion';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';
import { useInView } from './useInView';
import { skils } from '../data/data';

const techColors = {
  Java: '#f89820',
  Kotlin: '#7F52FF',
  Dart: '#0175C2',
  Flutter: '#02569B',
  PHP: '#777BB4',
  Laravel: '#FF2D20',
  Javascript: '#F7DF1E',
  React: '#61DAFB',
  Vue: '#4FC08D',
  Swift: '#F05138',
  Android: '#3DDC84',
  'iOS, MacOS': '#147EFB',
  Web: '#E44D26',
  Backend: '#68A063',
};

const radarData = skils.map((s) => ({
  skill: s.name,
  value: s.percent,
  fullMark: 100,
}));

export default function SkillsSection() {
  const [ref, isInView] = useInView(0.15);

  return (
    <section id="skills" className="relative py-32 overflow-hidden" ref={ref}>
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
            {'// Skills'}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Tech <span className="text-gradient">stack</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
            Technologies and frameworks I work with to bring ideas to life.
          </p>
        </motion.div>

        {/* Radar + skill detail grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Radar chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="relative h-[380px] sm:h-[440px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} outerRadius="75%">
                <defs>
                  <linearGradient id="radarFill" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#818cf8" stopOpacity={0.7} />
                    <stop offset="100%" stopColor="#c084fc" stopOpacity={0.4} />
                  </linearGradient>
                </defs>
                <PolarGrid stroke="rgba(148,163,184,0.15)" />
                <PolarAngleAxis
                  dataKey="skill"
                  tick={{ fill: '#cbd5e1', fontSize: 13, fontFamily: 'Space Grotesk' }}
                />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 100]}
                  tick={{ fill: '#475569', fontSize: 10 }}
                  axisLine={false}
                  tickCount={5}
                />
                <Radar
                  name="Proficiency"
                  dataKey="value"
                  stroke="#a78bfa"
                  strokeWidth={2}
                  fill="url(#radarFill)"
                  isAnimationActive={isInView}
                  animationDuration={1200}
                  animationEasing="ease-out"
                />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Skill detail list */}
          <div className="space-y-4">
            {skils.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                className="group p-4 rounded-xl glass hover:bg-white/[0.06] transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-display text-lg font-semibold text-white group-hover:text-indigo-300 transition-colors">
                    {skill.name}
                  </span>
                  <span className="font-mono text-sm text-indigo-400">
                    {skill.percent}%
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  {skill.langs.map((lang) => (
                    <span
                      key={lang}
                      className="px-2 py-0.5 rounded-md text-xs font-mono font-medium
                        bg-white/5 border border-white/10 text-gray-400
                        group-hover:border-indigo-500/30 group-hover:text-indigo-300 transition-all"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tech cloud */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16"
        >
          <h3 className="font-mono text-xs text-gray-500 uppercase tracking-wider mb-6">
            All Technologies
          </h3>
          <div className="flex flex-wrap gap-3">
            {Object.entries(techColors).map(([tech, color], i) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.9 + i * 0.04 }}
                whileHover={{ scale: 1.08, y: -3 }}
                className="px-4 py-2.5 rounded-xl glass hover:bg-white/[0.08] transition-all duration-300 cursor-default"
              >
                <span className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-sm font-medium text-gray-300">
                    {tech}
                  </span>
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
