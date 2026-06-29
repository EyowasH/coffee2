'use client';
import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import Image from 'next/image';
import SectionReveal from '@/components/ui/SectionReveal';
import GoldDivider from '@/components/ui/GoldDivider';

export default function DryingBeds() {
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(id);
  }, []);

  const { scrollYProgress } = useScroll({
    target: videoContainerRef,
    offset: ['start end', 'end start'],
  });

  const yTranslate = useTransform(scrollYProgress, [0, 1], ['12%', '-12%']);

  return (
    <section
      id="drying"
      className="relative bg-obsidian text-stone py-28 sm:py-36 md:py-44 overflow-hidden"
    >
      {/* Background highlight styling */}
      <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Full viewport-width marquee editorial image (80vh approx) replaced with responsive parallax video */}
        <div ref={videoContainerRef} className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] overflow-hidden border border-white/5 mb-16 bg-obsidian-soft">
          <motion.div
            className="relative w-full h-[124%] -top-[12%]"
            style={{
              y: mounted ? yTranslate : undefined,
            }}
          >
            <Image
              src="https://res.cloudinary.com/dlgvyseuq/image/upload/v1782563668/fresh-beans-coffee-trading/traditional_care_rnszgv.png"
              alt="Meticulous coffee beans quality and traditional drying dryingbeds"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
              loading="lazy"
              quality={100}
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none animate-fade-in"
            />
          </motion.div>
          {/* Subtle text overlay block on bottom left */}
          <div className="absolute bottom-0 left-0 bg-gradient-to-tr from-obsidian via-obsidian/50 to-transparent p-6 sm:p-12 md:max-w-xl z-10">
            <SectionReveal variant="rise" threshold={0.2}>
              <span className="text-label text-gold block mb-3">Sip Ethiopian Fresh Coffee</span>
              <h3 className="font-display text-white text-3xl sm:text-4xl md:text-5xl leading-none font-medium mb-4">
                Traditional harvesting care.
              </h3>
              <p className="font-body text-stone/80 text-xs sm:text-sm leading-relaxed">
                On the beautiful highland landscapes of Ethiopia, our coffee beans are meticulously sourced. Hand-picked with ultimate care, every select lot honors our promise of quality, sustainability, and supporting our hardworking farmers.
              </p>
            </SectionReveal>
          </div>
        </div>

        {/* B2B Specifications Matrix */}
        <div className="mb-24">
          <SectionReveal variant="fade">
            <div className="mb-8">
              <span className="text-label text-gold block mb-3">CONSOLIDATED COMMERCE DATA</span>
              <h3 className="font-display text-white text-3xl sm:text-4xl font-medium tracking-tight">
                Green Coffee Specifications Matrix
              </h3>
              <p className="font-body text-[#8A8A8A] text-sm mt-2 max-w-2xl">
                Compare direct-trade, screen-sorted green coffees from our active sourcing regions. Official certificates of analysis are provided with pre-shipment sample kits.
              </p>
            </div>
          </SectionReveal>

          <SectionReveal variant="scale" className="w-full overflow-hidden border border-white/5 bg-obsidian-soft">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs sm:text-sm text-[#E2E2E2]">
                <thead>
                  <tr className="border-b border-white/5 bg-obsidian text-[9px] font-bold uppercase tracking-widest text-gold font-body">
                    <th className="p-4 sm:p-5">Region</th>
                    <th className="p-4 sm:p-5">Altitude (MASL)</th>
                    <th className="p-4 sm:p-5">Processing</th>
                    <th className="p-4 sm:p-5">Harvest window</th>
                    <th className="p-4 sm:p-5">Cup Rating</th>
                    <th className="p-4 sm:p-5">Grades Available</th>
                    <th className="p-4 sm:p-5">Screen &amp; Moisture %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-body">
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-4 sm:p-5 font-bold font-display text-white text-sm">Yirgacheffe</td>
                    <td className="p-4 sm:p-5 font-mono text-[#8A8A8A]">1,800 – 2,200m</td>
                    <td className="p-4 sm:p-5">Fully Washed, Natural, Honey</td>
                    <td className="p-4 sm:p-5">October – January</td>
                    <td className="p-4 sm:p-5 font-bold text-gold">84 – 87 SCA</td>
                    <td className="p-4 sm:p-5"><span className="px-2 py-0.5 bg-gold/10 border border-gold/20 text-gold text-[9px] font-bold uppercase tracking-wider">Grade 1 &amp; 2</span></td>
                    <td className="p-4 sm:p-5 text-[#8A8A8A]">Screen 15+ / 10.5%–11.5%</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-4 sm:p-5 font-bold font-display text-white text-sm">Guji</td>
                    <td className="p-4 sm:p-5 font-mono text-[#8A8A8A]">1,900 – 2,300m</td>
                    <td className="p-4 sm:p-5">Fully Washed, Natural, Honey</td>
                    <td className="p-4 sm:p-5">October – January</td>
                    <td className="p-4 sm:p-5 font-bold text-gold">85 – 88 SCA</td>
                    <td className="p-4 sm:p-5"><span className="px-2 py-0.5 bg-gold/10 border border-gold/20 text-gold text-[9px] font-bold uppercase tracking-wider">Grade 1 &amp; 2</span></td>
                    <td className="p-4 sm:p-5 text-[#8A8A8A]">Screen 15+ / 10.5%–11.5%</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-4 sm:p-5 font-bold font-display text-white text-sm">Sidamo</td>
                    <td className="p-4 sm:p-5 font-mono text-[#8A8A8A]">1,600 – 2,000m</td>
                    <td className="p-4 sm:p-5">Fully Washed, Natural</td>
                    <td className="p-4 sm:p-5">October – January</td>
                    <td className="p-4 sm:p-5 font-bold text-gold">84 – 86 SCA</td>
                    <td className="p-4 sm:p-5"><span className="px-2 py-0.5 bg-gold/10 border border-gold/20 text-gold text-[9px] font-bold uppercase tracking-wider">Grade 1 &amp; 2</span></td>
                    <td className="p-4 sm:p-5 text-[#8A8A8A]">Screen 15+ / 10.5%–11.5%</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-4 sm:p-5 font-bold font-display text-white text-sm">Jimma</td>
                    <td className="p-4 sm:p-5 font-mono text-[#8A8A8A]">1,400 – 1,800m</td>
                    <td className="p-4 sm:p-5">Fully Washed, Natural</td>
                    <td className="p-4 sm:p-5">October – December</td>
                    <td className="p-4 sm:p-5 font-bold text-gold">82 – 84 SCA</td>
                    <td className="p-4 sm:p-5"><span className="px-2 py-0.5 bg-gold/10 border border-gold/20 text-gold text-[9px] font-bold uppercase tracking-wider">Grade 1 &amp; 2</span></td>
                    <td className="p-4 sm:p-5 text-[#8A8A8A]">Screen 15+ / 10.5%–11.5%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </SectionReveal>
        </div>

        {/* Large Centered Quote Segment */}
        <div className="max-w-3xl mx-auto py-10 text-center flex flex-col items-center">
          <GoldDivider variant="ornate" className="mb-6" />
          <SectionReveal variant="scale" threshold={0.2}>
            <blockquote className="font-display italic text-2xl sm:text-3xl text-white leading-relaxed mb-6">
              &ldquo;At Fresh Ethiopian Coffee Beans, we are committed to offering organic coffee beans that are sustainably sourced and environmentally friendly.&rdquo;
            </blockquote>
            <cite className="font-body text-xs uppercase tracking-[0.2em] font-semibold text-gold not-italic">
              &mdash; Our Sourcing Promise
            </cite>
          </SectionReveal>
          <GoldDivider variant="ornate" className="mt-8" />
        </div>
      </div>
    </section>
  );
}
