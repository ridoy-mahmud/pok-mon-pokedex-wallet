import { motion } from 'framer-motion';
import { useMemo } from 'react';

interface Props {
  count?: number;
  colors?: string[];
  active?: boolean;
}

export const ParticleEffect = ({ count = 50, colors = ['#a855f7', '#06b6d4', '#22c55e', '#f97316', '#ec4899', '#eab308'], active = true }: Props) => {
  const particles = useMemo(() => 
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 0.8,
      duration: Math.random() * 2 + 1.5,
      angle: Math.random() * 360,
      distance: Math.random() * 300 + 100,
      shape: Math.random() > 0.5 ? 'circle' : 'rect',
    })),
  [count, colors]);

  if (!active) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
      {particles.map((p) => {
        const rad = (p.angle * Math.PI) / 180;
        const dx = Math.cos(rad) * p.distance;
        const dy = Math.sin(rad) * p.distance;

        return (
          <motion.div
            key={p.id}
            initial={{ 
              left: '50%', top: '50%', opacity: 1, scale: 0, 
              x: 0, y: 0, rotate: 0
            }}
            animate={{
              x: dx, y: dy - 200,
              opacity: [1, 1, 0],
              scale: [0, 1.5, 0.5],
              rotate: Math.random() * 720 - 360,
            }}
            transition={{ duration: p.duration, delay: p.delay, ease: 'easeOut' }}
            style={{ position: 'absolute', width: p.size, height: p.size, backgroundColor: p.color }}
            className={p.shape === 'circle' ? 'rounded-full' : 'rounded-sm'}
          />
        );
      })}
      {/* Sparkle ring */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary/50"
        initial={{ width: 0, height: 0, opacity: 1 }}
        animate={{ width: 400, height: 400, opacity: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-neon-cyan/40"
        initial={{ width: 0, height: 0, opacity: 1 }}
        animate={{ width: 300, height: 300, opacity: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
      />
    </div>
  );
};
