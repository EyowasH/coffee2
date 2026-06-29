'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import SectionReveal from '@/components/ui/SectionReveal';
import MagneticButton from '@/components/ui/MagneticButton';
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import Image from 'next/image';

const stages = [
  {
    step: 1,
    icon: '🌿',
    title: 'Sourcing Micro-lots',
    subtitle: 'High-altitude origin mapping',
    detail: 'We register biological coordinates across Gedeo, Oromia, Sidama, and Kaffacho forest zones, securing micro-lots at altitudes stretching from 1,400 to 2,300 meters above sea level.',
    image: 'https://res.cloudinary.com/dlgvyseuq/image/upload/v1781078852/fresh-beans-coffee-trading/section4stage01_y11cb0.jpg',
  },
  {
    step: 2,
    icon: '🍒',
    title: 'Selective Cherry Picking',
    subtitle: 'Strict manual harvesting protocols',
    detail: 'Smallholders execute multiple passes of manual rounds, harvesting exclusively mature, deep-crimson coffee cherries while casting aside underripe or dry-pod defects.',
    image: 'https://res.cloudinary.com/dlgvyseuq/image/upload/v1781078862/fresh-beans-coffee-trading/section4stage02_xu8jxp.jpg',
  },
  {
    step: 3,
    icon: '🤝',
    title: 'Direct-Trade Sincerity',
    subtitle: 'Fair premiums for farmer networks',
    detail: 'By working directly with small farming families, we pay pre-negotiated cash premiums that exceed current commodity market baselines, fostering long-term community relationships.',
    image: 'https://res.cloudinary.com/dlgvyseuq/image/upload/v1781078896/fresh-beans-coffee-trading/section4stage03_rjetei.jpg',
  },
  {
    step: 4,
    icon: '💧',
    title: 'Controlled Fermentation',
    subtitle: 'Density-sorting and clean processing',
    detail: 'Harvested cherries are sorted in water tanks. The dense, sugar-laden cherries sink for pulping, followed by precisely measured aerobic dry or wet fermentation cycles.',
    image: 'https://res.cloudinary.com/dlgvyseuq/image/upload/v1781078899/fresh-beans-coffee-trading/section4stage04_dsxd9a.jpg',
  },
  {
    step: 5,
    icon: '☀️',
    title: 'Raised Bed Drying',
    subtitle: 'Slow solar curation under shaded canopies',
    detail: 'Parchment is laid on traditional raised African drying tables. Dedicated workers rotate the beans constantly to achieve uniform temperature exposure and pristine cup stability.',
    image: 'https://res.cloudinary.com/dlgvyseuq/image/upload/v1781078910/fresh-beans-coffee-trading/section4stage05_exziha.jpg',
  },
  {
    step: 6,
    icon: '🧪',
    title: 'Moisture Calibration',
    subtitle: 'Stabilizing at premium water activity',
    detail: 'Using calibrated digital humimeters, specialized lab technicians check that each dried coffee lot reaches and halts at a stable humidity range of 10.5% to 11.5%.',
    image: 'https://res.cloudinary.com/dlgvyseuq/image/upload/v1781078889/fresh-beans-coffee-trading/section4stage06_cdpgb4.jpg',
  },
  {
    step: 7,
    icon: '🏢',
    title: 'Dry Mill Optical Sorting',
    subtitle: 'Standardizing sizing and density profiles',
    detail: 'In the capital city, the dry-outer shells are safely hulled. Then, state-of-the-art gravity separators and chromatic optical cameras sort the green coffee by weight and color.',
    image: 'https://res.cloudinary.com/dlgvyseuq/image/upload/v1781078924/fresh-beans-coffee-trading/section4stage07_wi11vk.jpg',
  },
  {
    step: 8,
    icon: '🌍',
    title: 'Container Seal & Export',
    subtitle: 'GrainPro protected ocean logistics',
    detail: 'Standard sorted green beans are packaged into airtight GrainPro hermetic bags to conserve freshness, loaded in shipping containers, and documented with complete ECX transparency.',
    image: 'https://res.cloudinary.com/dlgvyseuq/image/upload/v1781078929/fresh-beans-coffee-trading/section4stage08_a9wlk7.jpg',
  },
];

export default function JourneyScroll() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const currentStage = stages[currentIdx];

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % stages.length);
  };

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev - 1 + stages.length) % stages.length);
  };

  return (
    <section
      id="journey"
      className="relative bg-obsidian-soft border-t border-glassBorder text-stone py-24 sm:py-32 overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-label text-gold block mb-3">Traceable Scrollytelling</span>
          <h2 className="font-display font-light text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-none">
            From cherry to container.
          </h2>
          <p className="font-body text-[#8A8A8A] text-sm mt-4 max-w-xl">
            Click or slide through the stages beneath to follow our meticulous sourcing, processing, and quality validation timeline.
          </p>
        </div>

        {/* Modular Stepper Structure Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Layout (40%) */}
          <div className="lg:col-span-5 flex flex-col justify-center min-h-[400px]">
            {/* Step Counter overlay */}
            <div className="relative overflow-hidden mb-2">
              <span className="font-display text-8xl lg:text-9xl text-stone/5 font-black block leading-none select-none select-none">
                0{currentStage.step}
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentStage.step}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-4 mt-[-60px] z-10"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{currentStage.icon}</span>
                  <span className="text-caption text-gold uppercase tracking-[0.2em] font-semibold">
                    STAGE 0{currentStage.step} / 0{stages.length}
                  </span>
                </div>

                <h3 className="font-display text-white text-3xl sm:text-4xl font-medium tracking-tight">
                  {currentStage.title}
                </h3>

                <span className="text-sm text-gold italic font-body">
                  {currentStage.subtitle}
                </span>

                <p className="font-body text-[#8A8A8A] text-[14px] leading-relaxed max-w-lg mt-2">
                  {currentStage.detail}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Manual Controls Row */}
            <div className="flex items-center gap-4 mt-10">
              <button
                onClick={handlePrev}
                aria-label="Previous step"
                className="w-10 h-10 border border-white/10 hover:border-gold hover:text-gold flex items-center justify-center transition-all duration-300 group cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 text-[#8A8A8A] group-hover:text-gold" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next step"
                className="w-10 h-10 border border-white/10 hover:border-gold hover:text-gold flex items-center justify-center transition-all duration-300 group cursor-pointer"
              >
                <ChevronRight className="w-4 h-4 text-[#8A8A8A] group-hover:text-gold" />
              </button>
              <span className="text-[10px] uppercase font-bold tracking-widest text-gold font-body">
                TIMELINE STEP
              </span>
            </div>
          </div>

          {/* Right Layout (60%) - Central Image and segment bar */}
          <div className="lg:col-span-7 flex flex-col gap-6 w-full">
            <div className="relative aspect-[4/3] sm:aspect-video w-full overflow-hidden border border-white/5 bg-obsidian">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStage.step}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 w-full h-full"
                >
                  <Image
                    src={currentStage.image}
                    alt={`${currentStage.title} processing illustration`}
                    fill
                    className="object-cover pointer-events-none"
                    referrerPolicy="no-referrer"
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    priority
                  />
                  {/* Subtle glass vignette */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-obsidian/70 via-transparent to-black/20" />
                  <div className="absolute top-4 right-4 glass-surface px-4 py-1.5 border border-white/10 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold animate-ping" />
                    <span className="text-[9px] font-bold text-white tracking-widest font-body uppercase">DIRECT TRADED</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Horizontal progress indicators */}
            <div className="flex items-center gap-1.5 w-full mt-2">
              {stages.map((stg, sIndex) => {
                const isActive = sIndex === currentIdx;
                const isPassed = sIndex < currentIdx;
                return (
                  <button
                    key={stg.step}
                    onClick={() => setCurrentIdx(sIndex)}
                    aria-label={`Go to stage ${stg.step}`}
                    className="flex-1 h-1.5 focus:outline-none cursor-pointer bg-stone/5 border-none relative transition-all duration-300"
                  >
                    <div
                      className={`absolute inset-0 h-full transition-all duration-500 ease-out origin-left ${
                        isActive
                          ? 'bg-gold w-full scale-x-100'
                          : isPassed
                          ? 'bg-gold/40 w-full scale-x-100'
                          : 'bg-transparent w-y-0 scale-x-0'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
            {/* Legend indexes */}
            <div className="flex justify-between items-center text-[9px] font-bold tracking-widest font-body text-[#8A8A8A] uppercase">
              <span>HARVEST BEGIN</span>
              <span>VERIFIED ARRIVAL</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
