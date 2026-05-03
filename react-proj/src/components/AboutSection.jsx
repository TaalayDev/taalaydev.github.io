import { motion } from 'framer-motion';
import { useInView } from './useInView';
import { Code2, Palette, Zap } from 'lucide-react';

export default function AboutSection() {
  const [ref, isInView] = useInView(0.2);

  const cards = [
    {
      icon: Code2,
      title: 'Clean Code',
      desc: 'Writing maintainable, scalable code that stands the test of time.',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Palette,
      title: 'UI / UX',
      desc: 'Crafting intuitive interfaces with pixel-perfect attention to detail.',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Zap,
      title: 'Performance',
      desc: 'Optimizing every millisecond for smooth, responsive experiences.',
      gradient: 'from-amber-500 to-orange-500',
    },
  ];

  return (
    <section id="about" className="relative py-32 overflow-hidden" ref={ref}>
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
            // About Me
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Turning ideas into{' '}
            <span className="text-gradient">digital reality</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
            I'm a self-taught developer with a strong foundation in mobile and web
            technologies. I specialize in building high-quality, scalable applications
            that deliver exceptional user experiences. With expertise spanning Android,
            Flutter, iOS, and web development, I bring a versatile skill set to every
            project.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="group relative p-8 rounded-2xl glass card-shine cursor-default"
            >
              {/* Icon */}
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-5
                  group-hover:scale-110 group-hover:shadow-lg transition-all duration-300`}
                style={{ boxShadow: `0 0 20px rgba(99, 102, 241, 0.1)` }}
              >
                <card.icon size={22} className="text-white" />
              </div>

              <h3 className="font-display text-xl font-semibold text-white mb-3">
                {card.title}
              </h3>
              <p className="text-gray-400 leading-relaxed text-sm">{card.desc}</p>

              {/* Corner accent */}
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/5 rounded-tr-xl
                group-hover:border-indigo-500/30 transition-colors duration-300" />
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
        >
          {[
            { value: '7+', label: 'Years Coding' },
            { value: '5+', label: 'Years Professional' },
            { value: '15+', label: 'Projects Shipped' },
            { value: '5', label: 'Platforms' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-xl glass"
            >
              <div className="font-display text-3xl sm:text-4xl font-bold text-gradient mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
