import { useEffect, useRef } from 'react';

const CELL = 8;          // pixel-art grid size
const MAX_AGE = 55;      // frames a cell lives
const GLOW = 10;         // canvas shadowBlur

// Bresenham line — yields every grid cell the line passes through
function* bresenham(x0, y0, x1, y1) {
  let dx = Math.abs(x1 - x0), sx = x0 < x1 ? 1 : -1;
  let dy = -Math.abs(y1 - y0), sy = y0 < y1 ? 1 : -1;
  let err = dx + dy;
  while (true) {
    yield [x0, y0];
    if (x0 === x1 && y0 === y1) break;
    const e2 = 2 * err;
    if (e2 >= dy) { err += dy; x0 += sx; }
    if (e2 <= dx) { err += dx; y0 += sy; }
  }
}

// Convert hue (0-360) to a hex color string
function hsl(h, s, l) {
  h = ((h % 360) + 360) % 360;
  s /= 100; l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => {
    const k = (n + h / 30) % 12;
    return l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
  };
  const toHex = (v) => Math.round(v * 255).toString(16).padStart(2, '0');
  return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`;
}

export default function PixelTrail() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Map of "gx,gy" → { age, hue } — one entry per live grid cell
    const cells = new Map();
    let hue = 260;          // start in violet, drifts with movement
    let prevGrid = null;    // last snapped grid position
    let raf = null;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMove = (e) => {
      const gx = Math.floor(e.clientX / CELL);
      const gy = Math.floor(e.clientY / CELL);

      if (!prevGrid) { prevGrid = [gx, gy]; }

      // Fill every grid cell on the line from last to current position
      for (const [cx, cy] of bresenham(prevGrid[0], prevGrid[1], gx, gy)) {
        cells.set(`${cx},${cy}`, { age: 0, hue });
      }

      hue = (hue + 1.2) % 360;   // slowly cycle color as cursor moves
      prevGrid = [gx, gy];
    };

    window.addEventListener('mousemove', onMove, { passive: true });

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const [key, cell] of cells) {
        cell.age++;
        if (cell.age > MAX_AGE) { cells.delete(key); continue; }

        const progress = cell.age / MAX_AGE;             // 0 → 1
        const alpha = Math.pow(1 - progress, 1.6);       // ease-out fade
        const lightness = 55 + (1 - progress) * 20;      // brightest when fresh

        const color = hsl(cell.hue, 90, lightness);
        const [gx, gy] = key.split(',').map(Number);

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.shadowColor = color;
        ctx.shadowBlur  = GLOW * (1 - progress * 0.7);
        ctx.fillStyle   = color;
        ctx.fillRect(gx * CELL, gy * CELL, CELL, CELL);

        // 1-px bright highlight on top-left corner (pixel-art shine)
        ctx.globalAlpha = alpha * 0.55;
        ctx.fillStyle   = '#ffffff';
        ctx.fillRect(gx * CELL, gy * CELL, 2, 2);

        ctx.restore();
      }

      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        imageRendering: 'pixelated',
      }}
    />
  );
}
