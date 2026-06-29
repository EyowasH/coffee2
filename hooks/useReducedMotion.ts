'use client';
import { useEffect, useState } from 'react';

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const id = setTimeout(() => {
      setReduced(media.matches);
    }, 0);

    const listener = (e: MediaQueryListEvent) => setReduced(e.matches);
    media.addEventListener('change', listener);
    return () => {
      clearTimeout(id);
      media.removeEventListener('change', listener);
    };
  }, []);

  return reduced;
}
