'use client';
import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'motion/react';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface ParallaxImageProps {
  src: string;
  alt: string;
  rate?: number; // negative numbers move image up, positive move image down
  className?: string;
  containerClassName?: string;
  fill?: boolean;
  priority?: boolean;
}

export default function ParallaxImage({
  src,
  alt,
  rate = -0.15,
  className,
  containerClassName,
  fill = true,
  priority = false,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isReduced = useReducedMotion();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    const id = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(id);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Smooth drift translation based on rate
  const travelDist = (rate * 100) + '%';
  const yTranslate = useTransform(scrollYProgress, [0, 1], [rate > 0 ? '0%' : '10%', rate > 0 ? '10%' : '-10%']);

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative overflow-hidden w-full h-full bg-obsidian-soft cursor-pointer select-none',
        containerClassName
      )}
    >
      <motion.div
        className="relative w-full h-[120%] -top-[10%]"
        style={{
          y: mounted && !isReduced ? yTranslate : undefined,
          willChange: isReduced ? 'auto' : 'transform',
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill={fill}
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          referrerPolicy="no-referrer"
          className={cn(
            'object-cover select-none pointer-events-none transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105',
            className
          )}
        />
      </motion.div>
    </div>
  );
}
