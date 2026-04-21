import { useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

export const ParticleBackground = () => {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    initParticlesEngine(async (engine) => { await loadSlim(engine); }).then(() => setReady(true));
  }, []);
  if (!ready) return null;
  return (
    <Particles
      id="hero-particles"
      className="absolute inset-0 -z-10"
      options={{
        fullScreen: { enable: false },
        background: { color: { value: 'transparent' } },
        fpsLimit: 60,
        particles: {
          number: { value: 50, density: { enable: true } },
          color: { value: ['#a855f7', '#06b6d4', '#ec4899'] },
          shape: { type: 'circle' },
          opacity: { value: 0.4 },
          size: { value: { min: 1, max: 3 } },
          move: { enable: true, speed: 0.6, direction: 'none', outModes: 'bounce', random: true },
          links: { enable: true, distance: 140, color: '#a855f7', opacity: 0.2, width: 1 },
        },
        interactivity: {
          events: { onHover: { enable: true, mode: 'grab' } },
          modes: { grab: { distance: 160, links: { opacity: 0.5 } } },
        },
        detectRetina: true,
      }}
    />
  );
};
