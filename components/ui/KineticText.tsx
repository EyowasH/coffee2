'use client';
import React from 'react';
import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface KineticTextProps {
  children: string;
  variant?: 'words' | 'chars' | 'lines' | 'scale';
  className?: string;
  delay?: number;
}

export default function KineticText({
  children,
  variant = 'words',
  className,
  delay = 0,
}: KineticTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  // Trigger when 20% of the element is visible
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const isReduced = useReducedMotion();

  if (isReduced) {
    return <div className={className}>{children}</div>;
  }

  // Handle scale variant cleanly
  if (variant === 'scale') {
    return (
      <motion.div
        ref={ref}
        className={className}
        initial={{ scale: 0.94, opacity: 0, filter: 'blur(10px)' }}
        animate={isInView ? { scale: 1, opacity: 1, filter: 'blur(0px)' } : {}}
        transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    );
  }

  // Split content based on choice
  const items = variant === 'chars' ? children.split('') : children.split(' ');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: variant === 'chars' ? 0.02 : 0.07,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = {
    hidden: {
      y: '100%',
      opacity: 0,
    },
    visible: {
      y: '0%',
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as any,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={cn(
        'inline-flex flex-wrap overflow-hidden leading-snug',
        className
      )}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {items.map((item, idx) => {
        // Maintain spaces when splitting chars
        const content = item === ' ' ? '\u00A0' : item;
        return (
          <span key={idx} className="inline-block overflow-hidden py-[0.1em] mr-[0.15em] last:mr-0">
            <motion.span
              variants={itemVariants}
              className="inline-block"
            >
              {content}
            </motion.span>
          </span>
        );
      })}
    </motion.div>
  );
}
