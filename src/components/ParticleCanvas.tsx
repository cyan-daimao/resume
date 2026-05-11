import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
  life: number;
  maxLife: number;
  layer: number;
}

const LAYER_COLORS = [
  '#10b981', // ingest
  '#f59e0b', // storage
  '#8b5cf6', // compute
  '#38bdf8', // service
  '#f472b6', // app
];

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };

    resize();
    window.addEventListener('resize', resize);

    const createParticle = (
      x: number,
      y: number,
      layer: number,
      direction: 'down' | 'up' | 'scatter'
    ): Particle => {
      const color = LAYER_COLORS[layer % LAYER_COLORS.length];
      const baseVy = direction === 'down' ? 0.5 + Math.random() * 1.5 : direction === 'up' ? -(0.3 + Math.random() * 0.8) : (Math.random() - 0.5) * 0.5;
      const baseVx = direction === 'scatter' ? (Math.random() - 0.5) * 2 : (Math.random() - 0.5) * 0.3;

      return {
        x,
        y,
        vx: baseVx,
        vy: baseVy,
        size: 1 + Math.random() * 2,
        alpha: 0.3 + Math.random() * 0.7,
        color,
        life: 0,
        maxLife: 60 + Math.random() * 120,
        layer,
      };
    };

    const spawnParticles = (width: number, height: number) => {
      const layerHeight = height / 5;

      // Main vertical flow: particles moving down between layers
      for (let layer = 0; layer < 4; layer++) {
        if (Math.random() < 0.3) {
          const startY = layer * layerHeight + layerHeight * 0.5;
          // Multiple columns
          for (let col = 0; col < 5; col++) {
            if (Math.random() < 0.4) {
              const x = width * (0.15 + col * 0.175) + (Math.random() - 0.5) * 20;
              particles.push(createParticle(x, startY, layer, 'down'));
            }
          }
        }
      }

      // Feedback flow: some particles going up (monitoring/heartbeat)
      if (Math.random() < 0.08) {
        const layer = Math.floor(Math.random() * 4);
        const startY = (layer + 1) * layerHeight;
        const x = width * (0.2 + Math.random() * 0.6);
        particles.push(createParticle(x, startY, layer, 'up'));
      }

      // Scatter particles at layer boundaries (data branching)
      if (Math.random() < 0.15) {
        const layer = Math.floor(Math.random() * 5);
        const y = layer * layerHeight + (Math.random() - 0.5) * 30;
        const x = width * (0.1 + Math.random() * 0.8);
        for (let i = 0; i < 3; i++) {
          particles.push(createParticle(x, y, layer, 'scatter'));
        }
      }

      // Central spine: dense flow down the middle
      if (Math.random() < 0.25) {
        const x = width * 0.5 + (Math.random() - 0.5) * 40;
        const y = -10;
        particles.push(createParticle(x, y, Math.floor(Math.random() * 5), 'down'));
      }
    };

    const drawConnectionLines = (width: number, height: number) => {
      const layerHeight = height / 5;
      ctx.save();
      ctx.globalAlpha = 0.06;

      // Vertical spine
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(width * 0.5, 0);
      ctx.lineTo(width * 0.5, height);
      ctx.stroke();

      // Horizontal connections between layers
      for (let i = 1; i < 5; i++) {
        const y = i * layerHeight;
        ctx.strokeStyle = LAYER_COLORS[i - 1];
        ctx.beginPath();
        ctx.moveTo(width * 0.15, y);
        ctx.lineTo(width * 0.85, y);
        ctx.stroke();
      }

      // Branching curves
      ctx.globalAlpha = 0.04;
      for (let i = 0; i < 4; i++) {
        const startY = i * layerHeight + layerHeight * 0.7;
        const endY = (i + 1) * layerHeight + layerHeight * 0.3;
        const color = LAYER_COLORS[i];

        // Left branch
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.moveTo(width * 0.3, startY);
        ctx.quadraticCurveTo(width * 0.2, (startY + endY) / 2, width * 0.25, endY);
        ctx.stroke();

        // Right branch
        ctx.beginPath();
        ctx.moveTo(width * 0.7, startY);
        ctx.quadraticCurveTo(width * 0.8, (startY + endY) / 2, width * 0.75, endY);
        ctx.stroke();
      }

      ctx.restore();
    };

    const animate = () => {
      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;

      ctx.clearRect(0, 0, width, height);

      drawConnectionLines(width, height);
      spawnParticles(width, height);

      particles = particles.filter((p) => {
        p.life++;
        p.x += p.vx;
        p.y += p.vy;

        // Add some sine wave wobble for visual interest
        p.x += Math.sin(p.life * 0.05) * 0.3;

        // Fade in/out
        let alpha = p.alpha;
        if (p.life < 20) alpha *= p.life / 20;
        if (p.life > p.maxLife - 20) alpha *= (p.maxLife - p.life) / 20;

        // Draw particle with glow
        ctx.save();
        ctx.globalAlpha = alpha * 0.8;

        // Glow
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
        gradient.addColorStop(0, p.color);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();

        return p.life < p.maxLife && p.y < height + 20 && p.y > -20 && p.x > -20 && p.x < width + 20;
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
