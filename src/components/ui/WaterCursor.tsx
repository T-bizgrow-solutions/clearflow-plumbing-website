import { useEffect, useRef, useState, type CSSProperties } from 'react';

type SprayParticle = {
  id: number;
  x: number;
  y: number;
  tx: number;
  ty: number;
  size: number;
  delay: number;
};

function isCursorSupported() {
  if (typeof window === 'undefined') return false;
  const finePointer = window.matchMedia('(pointer: fine)').matches;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  return finePointer && !reducedMotion;
}

let particleId = 0;

export function WaterCursor() {
  const dropletRef = useRef<HTMLDivElement>(null);
  const [enabled] = useState(isCursorSupported);
  const [particles, setParticles] = useState<SprayParticle[]>([]);
  const pressedRef = useRef(false);

  useEffect(() => {
    if (!enabled) return;

    const droplet = dropletRef.current;
    if (!droplet) return;

    document.documentElement.classList.add('has-water-cursor');

    const positionDroplet = (x: number, y: number) => {
      droplet.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    };

    const handleMove = (e: PointerEvent) => {
      droplet.style.opacity = '1';
      positionDroplet(e.clientX, e.clientY);
    };

    const handleLeave = () => {
      droplet.style.opacity = '0';
    };

    const handleEnter = () => {
      droplet.style.opacity = '1';
    };

    const handleDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      pressedRef.current = true;
      droplet.dataset.pressed = 'true';

      const burst: SprayParticle[] = Array.from({ length: 10 }, () => {
        const angle = (Math.random() * Math.PI) / 1.4 - Math.PI / 2.8;
        const distance = 28 + Math.random() * 52;
        return {
          id: ++particleId,
          x: e.clientX,
          y: e.clientY,
          tx: Math.cos(angle) * distance * (Math.random() > 0.5 ? 1 : -1) * 0.55,
          ty: 40 + Math.random() * 70,
          size: 4 + Math.random() * 7,
          delay: Math.random() * 40,
        };
      });

      setParticles((current) => [...current, ...burst]);

      window.setTimeout(() => {
        const ids = new Set(burst.map((p) => p.id));
        setParticles((current) => current.filter((p) => !ids.has(p.id)));
      }, 650);
    };

    const handleUp = () => {
      pressedRef.current = false;
      droplet.dataset.pressed = 'false';
    };

    positionDroplet(window.innerWidth / 2, window.innerHeight / 2);

    document.addEventListener('pointermove', handleMove, { passive: true });
    document.addEventListener('pointerleave', handleLeave);
    document.addEventListener('pointerenter', handleEnter);
    document.addEventListener('pointerdown', handleDown);
    document.addEventListener('pointerup', handleUp);

    return () => {
      document.documentElement.classList.remove('has-water-cursor');
      document.removeEventListener('pointermove', handleMove);
      document.removeEventListener('pointerleave', handleLeave);
      document.removeEventListener('pointerenter', handleEnter);
      document.removeEventListener('pointerdown', handleDown);
      document.removeEventListener('pointerup', handleUp);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="water-cursor-root">
      <div ref={dropletRef} className="water-cursor-droplet" data-pressed="false">
        <svg viewBox="0 0 32 40" width="28" height="34" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M16 2C16 2 4 16.5 4 24.5C4 31.127 9.373 36.5 16 36.5C22.627 36.5 28 31.127 28 24.5C28 16.5 16 2 16 2Z"
            fill="#009fe3"
            fillOpacity="0.92"
          />
          <path
            d="M12 22C12.5 18.5 14.2 15.2 16 12"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.55"
          />
        </svg>
      </div>
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="water-cursor-spray"
          style={
            {
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size * 1.25,
              animationDelay: `${particle.delay}ms`,
              '--spray-x': `${particle.tx}px`,
              '--spray-y': `${particle.ty}px`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
