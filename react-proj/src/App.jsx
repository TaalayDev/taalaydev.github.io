import { useEffect, useRef } from 'react';
import Portfolio from './pages/Portfolio';
import ParticleBackground from './components/ParticleBackground';
import PixelTrail from './components/PixelTrail';
import './App.css';

/**
 * Cursor spotlight — a CSS radial-gradient that follows the mouse
 * and adds a subtle warm ambient glow over the page background.
 */
function CursorSpotlight() {
  const ref = useRef(null);
  const pos = useRef({ x: -1000, y: -1000 });
  const smooth = useRef({ x: -1000, y: -1000 });
  const raf = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
    };
    const onLeave = () => {
      pos.current.x = -1000;
      pos.current.y = -1000;
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseleave', onLeave);

    const tick = () => {
      smooth.current.x += (pos.current.x - smooth.current.x) * 0.06;
      smooth.current.y += (pos.current.y - smooth.current.y) * 0.06;

      el.style.background = `radial-gradient(
        600px circle at ${smooth.current.x}px ${smooth.current.y + window.scrollY}px,
        rgba(99, 102, 241, 0.035),
        rgba(139, 92, 246, 0.02) 30%,
        rgba(168, 85, 247, 0.008) 55%,
        transparent 70%
      )`;

      raf.current = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none z-[1]"
      style={{ minHeight: '100%' }}
    />
  );
}

function App() {
  return (
    <div className="App relative min-h-screen noise-bg">
      {/* Aurora atmosphere — slowly drifting blurred gradients */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="aurora aurora-1" />
        <div className="aurora aurora-2" />
        <div className="aurora aurora-3" />
      </div>

      {/* Subtle dot grid */}
      <div className="fixed inset-0 pointer-events-none z-0 dot-grid" />

      {/* Mouse-reactive particle network */}
      <ParticleBackground />

      {/* Cursor-following spotlight overlay */}
      <CursorSpotlight />

      {/* Edge vignette for depth */}
      <div className="fixed inset-0 pointer-events-none z-0 vignette" />

      {/* Pixel art mouse trail */}
      <PixelTrail />

      {/* Main content */}
      <Portfolio />
    </div>
  );
}

export default App;
