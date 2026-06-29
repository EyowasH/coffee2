'use client';
import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'motion/react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface MetricCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  decimals?: number;
}

export default function MetricCounter({
  value,
  suffix = '',
  prefix = '',
  label,
  decimals = 0,
}: MetricCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const isReduced = useReducedMotion();

  useEffect(() => {
    if (isReduced) {
      const id = setTimeout(() => {
        setCount(value);
      }, 0);
      return () => clearTimeout(id);
    }

    if (!isInView) return;

    let startTimestamp: number | null = null;
    const duration = 2000; // 2 seconds

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);

      // Ease out expo mathematical curve
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = easeProgress * value;

      setCount(currentVal);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [isInView, value, isReduced]);

  const displayValue = count.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <div ref={ref} className="text-center md:text-left select-none">
      <div className="font-display font-medium text-4xl sm:text-5xl lg:text-6xl text-gold mb-2 tracking-tight">
        <span>{prefix}</span>
        <span>{displayValue}</span>
        <span className="text-stone select-none">{suffix}</span>
      </div>
      <div className="text-label text-stone/60 font-body block">
        {label}
      </div>
    </div>
  );
}
