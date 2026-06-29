'use client';
import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { gsap } from 'gsap';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'ghost' | 'gold';
  className?: string;
  onClick?: () => void;
}

export default function MagneticButton({
  children,
  variant = 'primary',
  className,
  onClick,
  ...props
}: MagneticButtonProps) {
  const containerRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    const text = textRef.current;
    if (!el || !text) return;

    el.style.willChange = 'transform';
    text.style.willChange = 'transform';

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Elastic pull on container boundary offset
      gsap.to(el, {
        x: x * 0.35,
        y: y * 0.35,
        duration: 0.3,
        ease: 'power3.out',
      });

      // Micro offset on text to give subtle physical depth separation inside container
      gsap.to(text, {
        x: x * 0.18,
        y: y * 0.18,
        duration: 0.3,
        ease: 'power3.out',
      });
    };

    const onMouseLeave = () => {
      // Elastic snap-back
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.4)',
      });
      gsap.to(text, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.4)',
      });
    };

    el.addEventListener('mousemove', onMouseMove);
    el.addEventListener('mouseleave', onMouseLeave);

    return () => {
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  const baseStyle =
    'relative overflow-hidden inline-flex items-center justify-center font-body text-xs font-semibold tracking-[0.16em] uppercase transition-all duration-300 px-8 py-3.5 border text-center cursor-pointer select-none';

  const variants = {
    primary:
      'border-stone bg-transparent text-stone hover:bg-stone hover:text-obsidian',
    ghost:
      'border-glassBorder bg-transparent text-[#8A8A8A] hover:text-stone hover:border-gold/40',
    gold:
      'border-gold bg-transparent text-gold hover:bg-gold hover:text-obsidian',
  };

  return (
    <button
      ref={containerRef}
      onClick={onClick}
      className={cn(baseStyle, variants[variant], className)}
      {...props}
    >
      <span ref={textRef} className="relative block pointer-events-none">
        {children}
      </span>
    </button>
  );
}
