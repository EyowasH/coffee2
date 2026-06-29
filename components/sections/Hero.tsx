'use client';
import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { ChevronDown } from 'lucide-react';

interface SplitTextProps {
  text: string;
  className?: string;
  delayOffset?: number;
}

function SplitText({ text, className, delayOffset = 0 }: SplitTextProps) {
  const words = text.split(' ');
  return (
    <span className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, wordIdx) => (
        <span key={wordIdx} className="inline-block overflow-hidden mr-[0.25em] last:mr-0 pb-1 sm:pb-3">
          <motion.span
            initial={{ y: '110%', rotate: 1.5, opacity: 0 }}
            animate={{ y: 0, rotate: 0, opacity: 1 }}
            transition={{
              duration: 1.5,
              delay: delayOffset + wordIdx * 0.12,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="inline-block origin-left"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

// Particle Field Component for slowly drifting light rays/dust motes
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let isIntersecting = true;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isIntersecting = entry.isIntersecting;
          if (isIntersecting) {
            cancelAnimationFrame(animationFrameId);
            animate();
          }
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    interface Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      opacity: number;
      angle: number;
      driftSpeed: number;
    }

    const particles: Particle[] = [];
    const particleCount = 40;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.6,
        speedY: -(Math.random() * 0.35 + 0.08),
        opacity: Math.random() * 0.28 + 0.05,
        angle: Math.random() * Math.PI * 2,
        driftSpeed: Math.random() * 0.18 - 0.09,
      });
    }

    const animate = () => {
      if (!isIntersecting) return;
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(197, 160, 89, 0.45)'; // Amber gold particles

      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];
        p.y += p.speedY;
        p.angle += p.driftSpeed * 0.02;
        p.x += Math.sin(p.angle) * 0.18;

        // Reset particle position if offscreen
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) {
          p.x = width + 10;
        } else if (p.x > width + 10) {
          p.x = -10;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[8] opacity-60 mix-blend-screen"
    />
  );
}

// Magnetic Indicator wrapper to offer Apple-level touch/pointer feedback
interface MagneticIndicatorProps {
  children: React.ReactNode;
  onClick: () => void;
}

function MagneticIndicator({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    setCoords({
      x: (clientX - centerX) * 0.45,
      y: (clientY - centerY) * 0.45,
    });
  };

  const handleMouseLeave = () => {
    setCoords({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: `translate3d(${coords.x}px, ${coords.y}px, 0)`,
        transition: coords.x === 0 ? 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
      }}
      className="cursor-pointer select-none py-3 px-5 relative z-20 flex flex-col items-center justify-center"
    >
      <div
        className="flex flex-col items-center justify-center"
        style={{
          transform: `translate3d(${coords.x * 0.3}px, ${coords.y * 0.3}px, 0)`,
          transition: coords.x === 0 ? 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default function Hero() {
  const { scrollYProgress } = useScroll();
  const [mounted, setMounted] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [showLoadingMask, setShowLoadingMask] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Mouse interactivity coordinates (luxury springs with damping & momentum)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 45, stiffness: 200, mass: 1 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const id = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(id);
  }, []);

  // Guarantee loading finishes even if browser restricts trigger
  useEffect(() => {
    const timer = setTimeout(() => {
      setVideoLoaded(true);
      setShowLoadingMask(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (videoLoaded) {
      const timer = setTimeout(() => {
        setShowLoadingMask(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [videoLoaded]);

  // Programmatically trigger video play to override strict mobile restrictions
  useEffect(() => {
    const playVideo = () => {
      if (videoRef.current) {
        videoRef.current.play().catch(() => {});
      }
    };
    playVideo();
    window.addEventListener('touchstart', playVideo, { once: true, passive: true });
    window.addEventListener('click', playVideo, { once: true });
    return () => {
      window.removeEventListener('touchstart', playVideo);
      window.removeEventListener('click', playVideo);
    };
  }, []);

  // Parallax transformations for scroll
  const yTxt1Val = useTransform(scrollYProgress, [0, 1], ['0px', '-90px']);
  const yTxt2Val = useTransform(scrollYProgress, [0, 1], ['0px', '-130px']);
  const yTxt3Val = useTransform(scrollYProgress, [0, 1], ['0px', '-175px']);
  const opacityFadeVal = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  // Video backgrounds and vignettes scale reactive to scroll
  const videoScaleVal = useTransform(scrollYProgress, [0, 1], [1.02, 1.15]);
  const videoYVal = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);

  const yTxt1 = mounted ? yTxt1Val : undefined;
  const yTxt2 = mounted ? yTxt2Val : undefined;
  const yTxt3 = mounted ? yTxt3Val : undefined;
  const opacityFade = mounted ? opacityFadeVal : undefined;

  const videoScale = mounted ? videoScaleVal : 1.02;
  const videoY = mounted ? videoYVal : '0%';

  // Lagging mouse shifts for absolute luxury 3D viewport effect
  const bgTranslateX = useTransform(smoothMouseX, [-0.5, 0.5], ['-18px', '18px']);
  const bgTranslateY = useTransform(smoothMouseY, [-0.5, 0.5], ['-18px', '18px']);

  const textParallaxX = useTransform(smoothMouseX, [-0.5, 0.5], ['7px', '-7px']);
  const textParallaxY = useTransform(smoothMouseY, [-0.5, 0.5], ['7px', '-7px']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientWidth, clientHeight } = e.currentTarget;
    const x = (e.clientX / clientWidth) - 0.5;
    const y = (e.clientY / clientHeight) - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      className="relative h-[100dvh] w-full overflow-hidden flex flex-col justify-between cursor-default"
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Luxurious Loading / Prologue Intro Transition Mask */}
      {showLoadingMask && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: videoLoaded ? 0 : 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 z-50 bg-obsidian pointer-events-none flex flex-col items-center justify-center gap-8"
        >
          <div className="flex flex-col items-center gap-6">
            <div className="relative w-[260px] h-[72px] sm:w-[320px] sm:h-[90px] flex-shrink-0">
              <Image
                src="https://res.cloudinary.com/dlgvyseuq/image/upload/v1782629902/fresh-beans-coffee-trading/Freshbeanslogo-removebg-preview-Photoroom_gugilr.png"
                alt="Fresh Beans Coffee Trading PLC Logo"
                fill
                priority
                sizes="(max-width: 640px) 260px, 320px"
                style={{ objectFit: 'contain' }}
                decoding="async"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col items-center gap-3">
              <motion.span
                initial={{ opacity: 0, letterSpacing: '0.25em' }}
                animate={{ opacity: [0.4, 0.85, 0.4], letterSpacing: '0.4em' }}
                transition={{ duration: 2.0, repeat: Infinity, ease: 'easeInOut' }}
                className="text-[#E6E4E0] text-[10px] tracking-[0.4em] font-body uppercase"
              >
                SOURCING EXCELLENCE
              </motion.span>
              <div className="w-28 h-[1px] bg-stone/15 relative overflow-hidden">
                <motion.div
                  className="absolute h-full w-12 bg-gold"
                  animate={{ x: [-50, 120] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Cinematic Fullscreen Background Video & Highly Polished Layered Overlays */}
      <motion.div
        style={{
          scale: videoScale,
          y: videoY,
        }}
        className="absolute inset-0 w-full h-full select-none pointer-events-none origin-center"
      >
        <motion.div
          style={{
            x: bgTranslateX,
            y: bgTranslateY,
          }}
          className="absolute inset-0 w-full h-full"
        >
          <video
            ref={videoRef}
            src="https://res.cloudinary.com/dlgvyseuq/video/upload/v1781012686/upscaled-video_xqtwcu.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onCanPlay={() => setVideoLoaded(true)}
            onLoadedData={() => setVideoLoaded(true)}
            className={`absolute inset-0 w-full h-full object-cover select-none transition-all duration-[1500ms] ease-out-expo object-center max-sm:object-[50%_50%] ${
              videoLoaded ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
            }`}
          />

          {/* LAYER 1: Deep black cinematic overlay */}
          <div className="absolute inset-0 bg-black/45 z-[2] mix-blend-multiply pointer-events-none animate-fade-in" />

          {/* LAYER 2: Luxury gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#090c0b]/80 via-transparent to-[#050806] z-[3] pointer-events-none" />

          {/* LAYER 3: Atmospheric fog/mist drift effect */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-[4] mix-blend-screen opacity-[0.14]">
            <div className="absolute top-1/4 left-[-15%] w-full h-[60vh] bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-full blur-[130px] animate-drift-slow" />
            <div className="absolute bottom-1/4 right-[-25%] w-[110%] h-[50vh] bg-gradient-to-r from-transparent via-white/8 to-transparent rounded-full blur-[150px] animate-drift-reverse" />
          </div>

          {/* LAYER 4: Subtle light bloom effects (rising ambient golden glow) */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(197,160,89,0.14)_0%,transparent_60%)] z-[5] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(30,58,47,0.22)_0%,transparent_75%)] z-[5] pointer-events-none" />

          {/* LAYER 5: Depth vignette around edges */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(3,6,5,0.85)_100%)] z-[6] pointer-events-none" />

          {/* Dynamic ambient Floating Particle field */}
          <ParticleField />
        </motion.div>
      </motion.div>

      {/* Top Header Row of the Hero (Aesthetic Info) */}
      <div className="relative z-10 w-full px-6 sm:px-12 pt-10 flex justify-between items-start text-[10px] tracking-widest text-[#8A8A8A] font-body">
        {/* Left header info */}
        <motion.div
          style={{ opacity: opacityFade }}
          initial={{ opacity: 0, y: 15, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.6, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-1"
        >
          <span className="text-white font-semibold">EST. 2024</span>
          <span>ADDIS ABABA, ETHIOPIA</span>
        </motion.div>

        {/* Right header info */}
        <motion.div
          style={{ opacity: opacityFade }}
          initial={{ opacity: 0, y: 15, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.6, delay: 1.35, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
          <span className="text-gold font-semibold uppercase">Organic & Sustainably Sourced</span>
        </motion.div>
      </div>

      {/* Main Editorial Headline with mouse-reactive 3D perspective shift */}
      <motion.div
        style={{ x: textParallaxX, y: textParallaxY }}
        className="relative z-10 w-full px-6 sm:px-12 md:pl-28 flex flex-col text-left justify-center flex-grow gap-3 sm:gap-4"
      >
        {/* Row 1 */}
        <motion.div
          style={{ y: yTxt1, opacity: opacityFade }}
          className="w-full"
        >
          <div className="py-1">
            <h1 className="select-none leading-none">
              <motion.span
                initial={{ opacity: 0, y: 60, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block font-display font-light text-stone/80 text-4xl sm:text-7xl lg:text-8xl tracking-[0.08em] sm:tracking-[0.12em]"
              >
                THE ORIGIN OF
              </motion.span>
            </h1>
          </div>
        </motion.div>

        {/* Row 2 */}
        <motion.div
          style={{ y: yTxt2, opacity: opacityFade }}
          className="w-full pl-[10%] sm:pl-[12%]"
        >
          <div className="py-1">
            <h1 className="select-none leading-none">
              <motion.span
                initial={{ opacity: 0, y: 60, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block font-display font-medium text-stone text-4xl sm:text-7xl lg:text-8xl tracking-[0.04em] sm:tracking-[0.08em]"
              >
                EXCEPTIONAL
              </motion.span>
            </h1>
          </div>
        </motion.div>

        {/* Row 3 */}
        <motion.div
          style={{ y: yTxt3, opacity: opacityFade }}
          className="w-full pl-[20%] sm:pl-[24%]"
        >
          <div className="py-1">
            <h1 className="select-none leading-none">
              <motion.span
                initial={{ opacity: 0, y: 60, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1.6, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block font-display font-normal text-gold italic text-4xl sm:text-7xl lg:text-8xl tracking-[0.04em] sm:tracking-[0.08em]"
              >
                COFFEE.
              </motion.span>
            </h1>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom cluster: infinite looping ticker and metrics pills */}
      <motion.div
        style={{ opacity: opacityFade }}
        className="relative z-10 w-full pb-10 flex flex-col md:flex-row justify-between items-end gap-6 px-6 sm:px-12"
      >
        {/* Left Ticker (Infinite Ribbon) */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.6, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full md:w-1/2 overflow-hidden select-none opacity-40 hover:opacity-100 transition-opacity duration-300"
        >
          <div className="relative w-full flex overflow-x-hidden border-y border-stone/10 py-2.5">
            <div className="animate-marquee whitespace-nowrap flex gap-4 text-[10px] font-semibold tracking-[0.2em] uppercase font-body text-[#8A8A8A] shrink-0">
              <span>YIRGACHEFFE ·</span>
              <span>GUJI ·</span>
              <span>SIDAMO ·</span>
              <span>JIMMA ·</span>
              <span>DIRECT TRADE ·</span>
              <span>ORGANIC BEANS ·</span>
              <span>SUSTAINABILITY ·</span>
              <span>FRESH ETHIOPIAN COFFEE</span>
            </div>
            {/* Duplicate for seamless infinite marquee loop */}
            <div className="animate-marquee2 absolute top-2.5 whitespace-nowrap flex gap-4 text-[10px] font-semibold tracking-[0.2em] uppercase font-body text-[#8A8A8A] shrink-0">
              <span>YIRGACHEFFE ·</span>
              <span>GUJI ·</span>
              <span>SIDAMO ·</span>
              <span>JIMMA ·</span>
              <span>DIRECT TRADE ·</span>
              <span>ORGANIC BEANS ·</span>
              <span>SUSTAINABILITY ·</span>
              <span>FRESH ETHIOPIAN COFFEE</span>
            </div>
          </div>
        </motion.div>

        {/* Right Layout: Metrics Pills & Magnetic Scroll indicator */}
        <div className="flex flex-col sm:flex-row items-end sm:items-center gap-6 w-full md:w-auto shrink-0 justify-end">
          {/* Metrics block pills with hover scale feedback */}
          <div className="flex flex-wrap gap-2 justify-end pr-0">
            {[
              { label: 'EST.', val: '2024' },
              { label: 'SOURCING', val: 'DIRECT' },
              { label: 'ORIGINS', val: '4 REGIONS' },
              { label: 'EXPORT', val: 'GLOBAL' },
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.96, y: 25, filter: 'blur(6px)' }}
                animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1.4, delay: 1.6 + idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="glass-surface px-4 py-2 border border-white/5 text-center flex items-center gap-2 hover:border-gold/30 hover:scale-[1.03] transition-all duration-300 select-none cursor-default"
              >
                <span className="text-[9px] font-body text-[#8A8A8A] tracking-wider">{stat.label}</span>
                <span className="text-[10px] font-body text-gold font-bold">{stat.val}</span>
              </motion.div>
            ))}
          </div>

          {/* Luxury Magnetic interaction for Scroll arrow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20, filter: 'blur(4px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.6, delay: 2.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <MagneticIndicator
              onClick={() => {
                document.getElementById('heritage')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span className="text-[8px] tracking-[0.2em] font-body font-semibold uppercase vertical-text text-[#8A8A8A]">
                SCROLL
              </span>
              <ChevronDown className="w-4 h-4 text-gold animate-bounce mt-1" />
            </MagneticIndicator>
          </motion.div>
        </div>
      </motion.div>

      {/* Marquee and Fog drift Keyframes injection */}
      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        @keyframes marquee2 {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(0%);
          }
        }
        @keyframes driftSlow {
          0% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(12%, 6%) scale(1.12);
          }
          100% {
            transform: translate(0, 0) scale(1);
          }
        }
        @keyframes driftReverse {
          0% {
            transform: translate(0, 0) scale(1.05);
          }
          50% {
            transform: translate(-10%, -6%) scale(1);
          }
          100% {
            transform: translate(0, 0) scale(1.05);
          }
        }
        .animate-marquee {
          animation: marquee 22s linear infinite;
        }
        .animate-marquee2 {
          animation: marquee2 22s linear infinite;
        }
        .animate-drift-slow {
          animation: driftSlow 36s ease-in-out infinite;
        }
        .animate-drift-reverse {
          animation: driftReverse 44s ease-in-out infinite;
        }
        .ease-out-expo {
          transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>

      {/* Dynamic mist fog bottom divider blending hero into forest green Heritage */}
      <div className="absolute bottom-0 left-0 w-full h-[15vh] bg-gradient-to-t from-[#1E3A2F] via-[#1E3A2F]/40 to-transparent pointer-events-none z-[9]" />
    </section>
  );
}
