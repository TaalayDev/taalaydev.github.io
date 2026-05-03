import { useEffect, useRef, useMemo } from 'react';

/**
 * Canvas-based animated particle network background.
 * Particles float, connect with lines when nearby, and gently pulse.
 */
export default function ParticleBackground() {
  const canvasRef = useRef(null);

  // Memoize config to avoid re-creating it on every render
  const config = useMemo(() => ({
    particleCount: 60,
    connectionDistance: 150,
    particleSize: { min: 1, max: 2.5 },
    speed: 0.3,
    colors: ['99,102,241', '139,92,246', '236,72,153', '96,165,250'],
  }), []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Create particles
    for (let i = 0; i < config.particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * config.speed,
        vy: (Math.random() - 0.5) * config.speed,
        size:
          config.particleSize.min +
          Math.random() * (config.particleSize.max - config.particleSize.min),
        color: config.colors[Math.floor(Math.random() * config.colors.length)],
        opacity: 0.1 + Math.random() * 0.4,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update & draw particles
      particles.forEach((p, i) => {
        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Pulse
        p.pulsePhase += 0.01;
        const pulse = 0.5 + 0.5 * Math.sin(p.pulsePhase);
        const alpha = p.opacity * (0.6 + 0.4 * pulse);

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${alpha})`;
        ctx.fill();

        // Connections
        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j];
          const dx = p.x - other.x;
          const dy = p.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < config.connectionDistance) {
            const lineAlpha =
              (1 - dist / config.connectionDistance) * 0.08;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(${p.color}, ${lineAlpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, [config]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
}
