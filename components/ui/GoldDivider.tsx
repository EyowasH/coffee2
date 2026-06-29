'use client';
import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface GoldDividerProps {
  variant?: 'line' | 'short' | 'ornate' | 'dash';
  className?: string;
  delay?: number;
}

export default function GoldDivider({
  variant = 'line',
  className,
  delay = 0,
}: GoldDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 'some' });
  const isReduced = useReducedMotion();

  if (isReduced) {
    return (
      <div
        className={cn(
          'bg-gold/30',
          variant === 'short' ? 'w-12 h-[1px]' : 'w-full h-[1px]',
          className
        )}
      />
    );
  }

  // Define animations based on variants
  const getStyle = () => {
    switch (variant) {
      case 'short':
        return 'w-12 h-[1.5px] bg-gold';
      case 'dash':
        return 'w-full h-[1.5px] border-t border-dashed border-gold/40 bg-transparent';
      case 'ornate':
        return 'relative w-full h-[1.5px] bg-gold/20 flex items-center justify-center';
      case 'line':
      default:
        return 'w-full h-[1px] bg-gold/30';
    }
  };

  return (
    <div ref={ref} className={cn('relative py-6', className)}>
      {variant === 'ornate' ? (
        <div className="w-full flex items-center gap-4">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-gold/30 origin-right"
          />
          <motion.div
            initial={{ scale: 0, rotate: 45 }}
            animate={isInView ? { scale: 1, rotate: 45 } : {}}
            transition={{ duration: 0.6, delay: delay + 0.3, type: 'spring' }}
            className="w-2 h-2 bg-gold rotate-45 flex-shrink-0"
          />
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-gold/30 origin-left"
          />
        </div>
      ) : (
        <motion.div
          className={getStyle()}
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
          style={{ originX: 0 }}
        />
      )}
    </div>
  );
}
