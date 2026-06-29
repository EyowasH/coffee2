'use client';
import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import Image from 'next/image';

interface VideoBackgroundProps {
  src: string;
  poster: string;
  className?: string;
  overlayOpacity?: number;
}

export default function VideoBackground({
  src,
  poster,
  className,
  overlayOpacity = 0.5,
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const isReducedMotion = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Use IntersectionObserver to play/pause intelligently
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isReducedMotion) {
            video.play().catch(() => {
              // Ignore autoplay play breaks
            });
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(video);

    const handleCanPlay = () => {
      setIsLoaded(true);
    };

    video.addEventListener('canplay', handleCanPlay);

    return () => {
      observer.disconnect();
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, [isReducedMotion]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden select-none bg-obsidian pointer-events-none">
      {/* HTML Head Preload Link - Hoisted automatically by Next.js App Router */}
      <link rel="preload" href={poster} as="image" fetchPriority="high" />

      {/* Poster image first */}
      <Image
        src={poster}
        alt="Ethiopian Coffee Highlands"
        fill
        className={`object-cover transition-opacity duration-1000 select-none bg-[#020202] ${
          isLoaded ? 'opacity-0' : 'opacity-100'
        }`}
        sizes="100vw"
        priority
        fetchPriority="high"
        referrerPolicy="no-referrer"
      />

      {/* Video Stream */}
      {!isReducedMotion && (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 select-none bg-[#020202] ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}

      {/* Aesthetic Overlays: radial and linear gradient masks */}
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#0B0806_95%)]"
        style={{ opacity: overlayOpacity }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0806]/70 via-transparent to-[#0B0806]" />

      {/* Subtle organic film grain texture layer */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('data:image/svg+xml;utf8,<svg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22><filter id=%22noiseFilter%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/></svg>')] pointer-events-none" />
    </div>
  );
}
