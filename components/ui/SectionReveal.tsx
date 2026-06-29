'use client';
import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';

interface SectionRevealProps {
  children: React.ReactNode;
  variant?: 'fade' | 'rise' | 'slide-left' | 'slide-right' | 'scale' | 'clip';
  className?: string;
  delay?: number;
  duration?: number;
  threshold?: number;
}

export default function SectionReveal({
  children,
  variant = 'rise',
  className,
  delay = 0,
  duration = 0.9,
  threshold = 0.15,
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  const isReduced = useReducedMotion();

  if (isReduced) {
    return <div className={className}>{children}</div>;
  }

  const anims = {
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    rise: {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0 },
    },
    'slide-left': {
      hidden: { opacity: 0, x: -40 },
      visible: { opacity: 1, x: 0 },
    },
    'slide-right': {
      hidden: { opacity: 0, x: 40 },
      visible: { opacity: 1, x: 0 },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.96 },
      visible: { opacity: 1, scale: 1 },
    },
    clip: {
      hidden: { clipPath: 'inset(0 0 100% 0)' },
      visible: { clipPath: 'inset(0 0 0% 0)' },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={cn('relative', className)}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={anims[variant]}
      style={{ willChange: isReduced ? 'auto' : 'transform, opacity' }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
