'use client';
import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import SectionReveal from '@/components/ui/SectionReveal';
import GoldDivider from '@/components/ui/GoldDivider';
import { ShieldCheck, ClipboardCheck, Sparkles, MapPin } from 'lucide-react';

const trustPillars = [
  {
    number: '01',
    title: 'High Quality Beans',
    body: 'We ensure our coffee beans are of the highest standard. Sourced carefully from four regions to guarantee unique, exquisite flavors for global customers.',
    icon: ClipboardCheck,
  },
  {
    number: '02',
    title: 'Organic Certified',
    body: 'We are committed to offering organic coffee beans that are sustainably sourced, environmentally friendly, and carefully curated.',
    icon: Sparkles,
  },
  {
    number: '03',
    title: 'Fair Trade Sourced',
    body: 'We follow our strict promise to use fair trade and sustainable practices, supporting hardworking farmers and maintaining cultural integrity.',
    icon: MapPin,
  },
  {
    number: '04',
    title: 'Local Family Sourced',
    body: 'As a local family business, we respect Ethiopian coffee heritage and traditions, delivering exquisite results with every container we ship.',
    icon: ShieldCheck,
  },
];

const scoringMetrics = [
  { aspect: 'ECX Grading & Traceability Compliance', score: 10.0, max: 10 },
  { aspect: 'ISO Quality Management Guidelines', score: 10.0, max: 10 },
  { aspect: 'Moisture Calibration (10.5% – 11.5%)', score: 10.0, max: 10 },
  { aspect: 'Hand-Picked Sizing Screen Tolerances', score: 9.8, max: 10 },
  { aspect: 'Phytosanitary Ministry of Agriculture Clearance', score: 10.0, max: 10 },
  { aspect: 'Pre-Shipment SGS Lab Inspections', score: 10.0, max: 10 },
];

export default function Quality() {
  const scoreRef = useRef<HTMLDivElement>(null);
  const scoreInView = useInView(scoreRef, { once: true, amount: 0.15 });

  return (
    <section
      id="quality"
      className="relative bg-gradient-to-b from-forest to-obsidian text-stone py-24 sm:py-32 overflow-hidden"
    >
      {/* Visual lighting source */}
      <div className="absolute top-1/2 right-1/4 w-[45vw] h-[45vw] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Editorial Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <span className="text-label text-gold block mb-3">Systematic Trust Rules</span>
          <h2 className="font-display font-light text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-none">
            Quality is not claimed.<br />It is documented.
          </h2>
        </div>

        {/* trust pillars grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {trustPillars.map((pillar, idx) => {
            const IconComponent = pillar.icon;
            return (
              <SectionReveal
                key={pillar.title}
                variant="rise"
                delay={idx * 0.12}
                className="bg-obsidian-soft border border-white/5 p-6 flex flex-col justify-between items-start hover:border-gold/30 transition-transform duration-300"
              >
                <div className="w-full">
                  <div className="flex justify-between items-center w-full mb-6 text-gold/30 font-mono text-xl">
                    <span className="text-xs tracking-wider uppercase font-body font-bold text-gold/50">0{idx + 1}</span>
                    <IconComponent className="w-5 h-5 text-gold/60" />
                  </div>
                  <h3 className="font-display text-white text-xl font-medium mb-3">
                    {pillar.title}
                  </h3>
                  <p className="font-body text-xs text-[#8A8A8A] leading-relaxed">
                    {pillar.body}
                  </p>
                </div>
              </SectionReveal>
            );
          })}
        </div>

        {/* Scorecard visual split panel layouts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-obsidian-soft border border-white/5 p-8 sm:p-12">
          {/* Left panel - Text content */}
          <div className="lg:col-span-5 text-left">
            <span className="text-micro bg-gold/10 text-gold px-3 py-1 font-bold tracking-widest font-body uppercase border border-gold/20 mb-6 inline-block">
              Sourcing Audits &amp; Compliances
            </span>
            <h3 className="font-display text-white text-3xl sm:text-4xl tracking-tight mb-4">
              Licensed &amp; Standardized PLC Exporter
            </h3>
            <p className="font-body text-[#8A8A8A] text-xs sm:text-sm leading-relaxed mb-6">
              Our drying beds, wet-mills, and dry-mills comply fully with international food safety and sanitary guidelines. We are registered under full B2B compliance, and export green lots validated against both European Union and FDA import thresholds.
            </p>

            {/* List of certification tags */}
            <div className="flex flex-col gap-4 mt-8 font-body">
              <div className="flex flex-wrap gap-2 animate-fade-in">
                {['ECX TRACEABLE', 'ISO 9001 SYSTEM', 'PHYTOSANITARY PASSPORT', 'SGS COMPLIANT'].map((badge) => (
                  <span
                    key={badge}
                    className="text-[9px] font-bold tracking-wider bg-white/5 text-stone/80 px-3 py-1.5 border border-white/5 uppercase"
                  >
                    {badge}
                  </span>
                ))}
              </div>
              
              <div className="inline-flex items-center gap-1.5 px-3 py-2 bg-gold/15 border border-gold/30 text-[9px] font-bold tracking-[0.1em] text-gold uppercase self-start animate-pulse">
                Certifications available upon request
              </div>
            </div>
          </div>

          {/* Right panel - Active scoring metrics visual form */}
          <div ref={scoreRef} className="lg:col-span-7 bg-obsidian border border-white/5 p-6 sm:p-8 relative">
            {/* Form decorative Header */}
            <div className="flex md:flex-row flex-col justify-between items-start md:items-center gap-2 mb-6 text-caption text-[#8A8A8A] font-mono text-[10px]">
              <div className="flex flex-col">
                <span className="text-white font-bold">TYPE: PREMIUM ETHIOPIAN ARABICA</span>
                <span>REGIONS: JIMMA, YIRGACHEFFE, SIDAMO, GUJI</span>
              </div>
              <div className="text-left md:text-right flex flex-col">
                <span className="text-gold font-bold">BRAND: FRESH BEANS COFFEE</span>
                <span>MEMBER STATUS: ETHICAL PLC EXPORTER</span>
              </div>
            </div>

            {/* Metrics List rendering */}
            <div className="flex flex-col gap-4">
              {scoringMetrics.map((met, idx) => {
                const scorePercent = (met.score / met.max) * 100;
                return (
                  <div key={met.aspect} className="flex flex-col gap-1 w-full">
                    <div className="flex justify-between items-center text-[10px] font-bold tracking-widest text-white uppercase font-body font-mono">
                      <span>{met.aspect}</span>
                      <span className="text-gold">{scorePercent.toFixed(0)}% Match</span>
                    </div>

                    <div className="h-1 bg-stone/5 w-full relative">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={scoreInView ? { width: `${scorePercent}%` } : {}}
                        transition={{ duration: 1.2, delay: idx * 0.08, ease: 'easeOut' }}
                        className="h-full bg-gold"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Scorecard total sum block */}
            <div className="flex justify-between items-center border-t border-stone/10 mt-6 pt-4 text-white">
              <span className="font-body text-xs font-bold tracking-widest text-[#8A8A8A] uppercase">Commitment Guarantee Rating</span>
              <span className="font-display text-4xl text-gold font-black">
                100% <span className="text-xs text-white font-body font-bold lowercase">organic & trade</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
