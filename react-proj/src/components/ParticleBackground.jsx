import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * Canvas-based animated particle network with mouse reactivity.
 *
 * Mouse interactions:
 *   - Particles within a radius are gently attracted toward the cursor
 *   - A soft glow / spotlight follows the mouse
 *   - Connections near the cursor become brighter and thicker
 *   - Particles near cursor glow larger
 *
 * Performance:
 *   - Honors prefers-reduced-motion
 *   - Pauses when document is hidden
 *   - Scales particle count to viewport
 *   - Spatial grid for O(n) connection lookups
 */
export default function ParticleBackground() {
  const canvasRef = useRef(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReducedMotion(mq.matches);
    apply();
    mq.addEventListener?.('change', apply);
    return () => mq.removeEventListener?.('change', apply);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });

    // ── Configuration ──
    const COLORS = [
      '99,102,241',   // indigo
      '139,92,246',   // purple
      '168,85,247',   // violet
      '236,72,153',   // pink
      '96,165,250',   // blue
      '52,211,153',   // emerald (sparse)
    ];
    const CONNECTION_DIST = 150;
    const BASE_SPEED = 0.2;
    const MOUSE_RADIUS = 200;        // attraction radius
    const MOUSE_FORCE = 0.018;       // gentle pull strength
    const MOUSE_GLOW_RADIUS = 280;   // cursor spotlight radius
    const REPEL_RADIUS = 50;         // inner repel radius for organic feel

    let dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let particles = [];
    let animationId = null;
    let running = true;

    // Mouse state (lerped for smoothness)
    let mouse = { x: -1000, y: -1000, active: false };
    let smoothMouse = { x: -1000, y: -1000 };
    const MOUSE_LERP = 0.08;

    const particleCountFor = (w) => {
      if (w < 640) return 30;
      if (w < 1024) return 50;
      return 75;
    };

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const target = particleCountFor(w);
      if (particles.length === 0) {
        for (let i = 0; i < target; i++) particles.push(makeParticle(w, h));
      } else if (particles.length < target) {
        while (particles.length < target) particles.push(makeParticle(w, h));
      } else if (particles.length > target) {
        particles.length = target;
      }
    };

    const makeParticle = (w, h) => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * BASE_SPEED,
      vy: (Math.random() - 0.5) * BASE_SPEED,
      baseVx: 0,
      baseVy: 0,
      size: 1 + Math.random() * 1.8,
      baseSize: 1 + Math.random() * 1.8,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      opacity: 0.12 + Math.random() * 0.35,
      pulsePhase: Math.random() * Math.PI * 2,
      pulseSpeed: 0.008 + Math.random() * 0.01,
      // For mouse interaction glow
      mouseInfluence: 0,
    });

    // ── Event listeners ──
    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    const onMouseLeave = () => {
      mouse.active = false;
    };
    const onTouchMove = (e) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
        mouse.active = true;
      }
    };
    const onTouchEnd = () => {
      mouse.active = false;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    resize();
    window.addEventListener('resize', resize);

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        if (animationId) cancelAnimationFrame(animationId);
      } else if (!running) {
        running = true;
        animate();
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    // ── Animation loop ──
    const animate = () => {
      if (!running) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      // Smooth the mouse position
      if (mouse.active) {
        smoothMouse.x += (mouse.x - smoothMouse.x) * MOUSE_LERP;
        smoothMouse.y += (mouse.y - smoothMouse.y) * MOUSE_LERP;
      } else {
        // Slowly drift off-screen
        smoothMouse.x += (-1000 - smoothMouse.x) * 0.02;
        smoothMouse.y += (-1000 - smoothMouse.y) * 0.02;
      }

      // ── Draw cursor spotlight ──
      if (mouse.active) {
        const grad = ctx.createRadialGradient(
          smoothMouse.x, smoothMouse.y, 0,
          smoothMouse.x, smoothMouse.y, MOUSE_GLOW_RADIUS
        );
        grad.addColorStop(0, 'rgba(99, 102, 241, 0.06)');
        grad.addColorStop(0.3, 'rgba(139, 92, 246, 0.03)');
        grad.addColorStop(0.6, 'rgba(168, 85, 247, 0.015)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(
          smoothMouse.x - MOUSE_GLOW_RADIUS,
          smoothMouse.y - MOUSE_GLOW_RADIUS,
          MOUSE_GLOW_RADIUS * 2,
          MOUSE_GLOW_RADIUS * 2
        );
      }

      // Build spatial grid
      const cell = CONNECTION_DIST;
      const cols = Math.max(1, Math.ceil(w / cell));
      const grid = new Map();

      // ── Update particles ──
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Mouse interaction
        const dx = smoothMouse.x - p.x;
        const dy = smoothMouse.y - p.y;
        const distSq = dx * dx + dy * dy;
        const dist = Math.sqrt(distSq);

        if (dist < MOUSE_RADIUS && mouse.active) {
          const normalizedDist = dist / MOUSE_RADIUS;
          const force = (1 - normalizedDist) * MOUSE_FORCE;

          if (dist < REPEL_RADIUS) {
            // Inner repel — particles avoid being right on the cursor
            const repelForce = (1 - dist / REPEL_RADIUS) * 0.04;
            p.vx -= (dx / dist) * repelForce;
            p.vy -= (dy / dist) * repelForce;
          } else {
            // Outer attract — gentle orbit-like pull
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;

            // Add slight tangential force for orbital movement
            const tangentX = -dy / dist;
            const tangentY = dx / dist;
            p.vx += tangentX * force * 0.3;
            p.vy += tangentY * force * 0.3;
          }

          // Smooth mouse influence for glow
          p.mouseInfluence += (1 - normalizedDist - p.mouseInfluence) * 0.1;
        } else {
          p.mouseInfluence *= 0.95;
        }

        // Damping — prevent runaway velocity
        p.vx *= 0.992;
        p.vy *= 0.992;

        // Clamp velocity
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const maxSpeed = BASE_SPEED * 4;
        if (speed > maxSpeed) {
          p.vx = (p.vx / speed) * maxSpeed;
          p.vy = (p.vy / speed) * maxSpeed;
        }

        // Ensure minimum drift so particles don't freeze
        if (speed < BASE_SPEED * 0.3) {
          p.vx += (Math.random() - 0.5) * 0.02;
          p.vy += (Math.random() - 0.5) * 0.02;
        }

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges
        if (p.x < -20) p.x = w + 20;
        else if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        else if (p.y > h + 20) p.y = -20;

        // Pulse
        p.pulsePhase += p.pulseSpeed;
        const pulse = 0.5 + 0.5 * Math.sin(p.pulsePhase);
        const baseAlpha = p.opacity * (0.6 + 0.4 * pulse);

        // Mouse-influenced size & brightness
        const sizeBoost = 1 + p.mouseInfluence * 2.5;
        const alphaBoost = baseAlpha + p.mouseInfluence * 0.4;
        const drawSize = p.baseSize * sizeBoost;

        // Draw particle
        if (p.mouseInfluence > 0.05) {
          // Glow ring for mouse-influenced particles
          const glowGrad = ctx.createRadialGradient(
            p.x, p.y, 0,
            p.x, p.y, drawSize * 4
          );
          glowGrad.addColorStop(0, `rgba(${p.color}, ${alphaBoost * 0.3})`);
          glowGrad.addColorStop(1, `rgba(${p.color}, 0)`);
          ctx.fillStyle = glowGrad;
          ctx.fillRect(p.x - drawSize * 4, p.y - drawSize * 4, drawSize * 8, drawSize * 8);
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, drawSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${Math.min(alphaBoost, 0.9)})`;
        ctx.fill();

        // Add spatial grid
        const cx = Math.floor(p.x / cell);
        const cy = Math.floor(p.y / cell);
        const key = cy * cols + cx;
        let bucket = grid.get(key);
        if (!bucket) {
          bucket = [];
          grid.set(key, bucket);
        }
        bucket.push(p);
        p._cx = cx;
        p._cy = cy;
        p._i = i;
      }

      // ── Draw connections ──
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const neighbors = [
          [p._cx, p._cy],
          [p._cx + 1, p._cy],
          [p._cx - 1, p._cy + 1],
          [p._cx, p._cy + 1],
          [p._cx + 1, p._cy + 1],
        ];
        for (const [nx, ny] of neighbors) {
          const bucket = grid.get(ny * cols + nx);
          if (!bucket) continue;
          for (const other of bucket) {
            if (other._i <= i && nx === p._cx && ny === p._cy) continue;
            if (other === p) continue;
            const ddx = p.x - other.x;
            const ddy = p.y - other.y;
            const distSq2 = ddx * ddx + ddy * ddy;
            if (distSq2 < CONNECTION_DIST * CONNECTION_DIST) {
              const d = Math.sqrt(distSq2);
              const closeness = 1 - d / CONNECTION_DIST;

              // Mouse proximity boost for connections
              const midX = (p.x + other.x) / 2;
              const midY = (p.y + other.y) / 2;
              const mDx = smoothMouse.x - midX;
              const mDy = smoothMouse.y - midY;
              const mDist = Math.sqrt(mDx * mDx + mDy * mDy);
              const mouseProximity = mouse.active
                ? Math.max(0, 1 - mDist / MOUSE_RADIUS)
                : 0;

              const baseLineAlpha = closeness * 0.07;
              const lineAlpha = baseLineAlpha + mouseProximity * closeness * 0.18;
              const lineWidth = 0.4 + mouseProximity * closeness * 1.5;

              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(other.x, other.y);
              ctx.strokeStyle = `rgba(${p.color}, ${Math.min(lineAlpha, 0.35)})`;
              ctx.lineWidth = lineWidth;
              ctx.stroke();
            }
          }
        }
      }

      // ── Draw mouse connection web ──
      // Extra faint lines from cursor to very near particles
      if (mouse.active) {
        for (const p of particles) {
          const dx = smoothMouse.x - p.x;
          const dy = smoothMouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MOUSE_RADIUS * 0.6 && dist > REPEL_RADIUS) {
            const closeness = 1 - dist / (MOUSE_RADIUS * 0.6);
            const alpha = closeness * 0.06;
            ctx.beginPath();
            ctx.moveTo(smoothMouse.x, smoothMouse.y);
            ctx.lineTo(p.x, p.y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
            ctx.lineWidth = closeness * 0.8;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      running = false;
      if (animationId) cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.65 }}
    />
  );
}
