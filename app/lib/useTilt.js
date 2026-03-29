'use client';

import { useEffect, useRef } from 'react';

/**
 * Custom hook to apply a 3D glassmorphism tilt effect on hover.
 * @param {Object} options Options for max tilt, scale, and transition speed.
 * @returns React ref to attach to the target element.
 */
export function useTilt(options = {}) {
  const ref = useRef(null);
  const { maxTilt = 8, scale = 1.02, speed = 400 } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el || window.innerWidth <= 768) return; // Disable on touch devices/mobile

    let bounds;
    
    // Add will-change for performance optimization
    el.style.willChange = 'transform';
    el.style.transformStyle = 'preserve-3d';

    const handleMouseEnter = () => {
      bounds = el.getBoundingClientRect();
      el.style.transition = `transform ${speed}ms cubic-bezier(.03,.98,.52,.99)`;
    };

    const handleMouseMove = (e) => {
      if (!bounds) return;
      
      const x = e.clientX - bounds.left;
      const y = e.clientY - bounds.top;

      const px = x / bounds.width;
      const py = y / bounds.height;

      // Calculate rotation ranging from -maxTilt to +maxTilt
      const rotateX = (0.5 - py) * maxTilt * 2;
      const rotateY = (px - 0.5) * maxTilt * 2;

      // Disable transition during movement so it tracks instantly
      el.style.transition = 'none';
      el.style.transform = `perspective(1000px) scale(${scale}) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
      el.style.transition = `transform ${speed}ms cubic-bezier(.03,.98,.52,.99)`;
      el.style.transform = `perspective(1000px) scale(1) rotateX(0deg) rotateY(0deg)`;
      bounds = null;
    };

    el.addEventListener('mouseenter', handleMouseEnter);
    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mouseenter', handleMouseEnter);
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [maxTilt, scale, speed]);

  return ref;
}
