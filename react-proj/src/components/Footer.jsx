import { motion } from 'framer-motion';
import { Heart, Terminal } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 overflow-hidden">
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & copyright */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600
              flex items-center justify-center">
              <Terminal size={16} className="text-white" />
            </div>
            <span className="text-gray-500 text-sm">
              © {currentYear} Taalay. Built with{' '}
              <Heart size={12} className="inline text-pink-500 fill-pink-500" />{' '}
              using React
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            {['About', 'Projects', 'Contact'].map((label) => (
              <a
                key={label}
                href={`#${label.toLowerCase()}`}
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector(`#${label.toLowerCase()}`)
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-gray-500 hover:text-gray-300 text-sm transition-colors"
              >
                {label}
              </a>
            ))}
          </div>

          {/* Back to top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group px-4 py-2 rounded-lg glass text-gray-500 hover:text-white
              hover:bg-white/[0.06] text-sm transition-all"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
