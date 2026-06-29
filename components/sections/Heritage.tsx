'use client';
import React from 'react';
import SectionReveal from '@/components/ui/SectionReveal';
import ParallaxImage from '@/components/ui/ParallaxImage';
import GoldDivider from '@/components/ui/GoldDivider';
import { Sparkles, Compass, ShieldCheck } from 'lucide-react';

export default function Heritage() {
  return (
    <section
      id="heritage"
      className="relative bg-forest text-stone py-24 sm:py-32 md:py-40 px-6 sm:px-12 md:px-24 overflow-hidden"
    >
      {/* Absolute faint radial forest highlight */}
      <div className="absolute top-1/4 left-1/3 w-[50vw] h-[50vw] rounded-full bg-forest-mid/10 blur-[130px] pointer-events-none" />

      {/* Subtle thin vertical structural lines */}
      <div className="absolute inset-0 opacity-[0.03] flex justify-between pointer-events-none px-6 sm:px-12 md:px-24">
        <div className="w-[1px] h-full bg-stone" />
        <div className="w-[1px] h-full bg-stone hidden sm:block" />
        <div className="w-[1px] h-full bg-stone hidden md:block" />
        <div className="w-[1px] h-full bg-stone" />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left Column - Editorial copy */}
        <div className="lg:col-span-7 flex flex-col justify-start">
          <SectionReveal variant="fade" threshold={0.1}>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold/10 border border-gold/20 text-[9px] font-bold tracking-[0.2em] text-gold uppercase mb-6 self-start">
              EST. 2024 · ADDIS ABABA · SPECIALTY PLC EXPORTER
            </div>
            <span className="text-label text-gold font-body block mb-2">
              Sip Ethiopian Fresh Coffee
            </span>
            <h2 className="font-display font-light text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-none text-white mb-8">
              Preserving Ethiopia&apos;s rich coffee legacy.
            </h2>
          </SectionReveal>
 
          <SectionReveal variant="rise" delay={0.2} threshold={0.1}>
            <p className="font-body text-stone/80 text-[15px] sm:text-base leading-relaxed mb-6 max-w-2xl">
              Founded in Addis Ababa, Fresh Beans Coffee Trading PLC is a licensed specialty exporter bridging the gap between Ethiopia&apos;s historic high-altitude coffee forests and elite roasters worldwide. Under our core motto, &ldquo;Sip Ethiopian Fresh Coffee,&rdquo; we preserve the complex genetic diversity, vibrant acidity, and natural sweetness unique to green coffees of the Arabica home region.
            </p>
            <p className="font-body text-stone/80 text-[15px] sm:text-base leading-relaxed mb-10 max-w-2xl">
              By fostering direct-trade networks with smallholder farmer cooperatives across Yirgacheffe, Guji, Sidamo, and Jimma, we bypass redundant auction layers to champion financial transparency. This deep ground presence allows us to carefully oversee wet-mill dry-mill transitions, implement meticulous hand-sorting, and guarantee premium physical and cup qualities for every containerized container shipment.
            </p>
          </SectionReveal>

          {/* Core Heritage Pillars with drawn lines */}
          <SectionReveal variant="rise" delay={0.3} threshold={0.1} className="flex flex-col gap-4">
            <div className="flex items-start gap-4">
              <Compass className="w-5 h-5 text-gold shrink-0 mt-0.5" />
              <div>
                <h4 className="font-display text-white text-lg font-medium mb-1">
                  Traditional Coffee Ceremonies
                </h4>
                <p className="font-body text-xs text-[#8A8A8A]">
                  Our brand respects Ethiopia&apos;s rich culture and traditional coffee ceremonies, keeping heritage alive with every single bean.
                </p>
              </div>
            </div>
            <GoldDivider variant="dash" className="my-0 py-2 opacity-20" />

            <div className="flex items-start gap-4">
              <Sparkles className="w-5 h-5 text-gold shrink-0 mt-0.5" />
              <div>
                <h4 className="font-display text-white text-lg font-medium mb-1">
                  Beautiful Landscapes & Farmers
                </h4>
                <p className="font-body text-xs text-[#8A8A8A]">
                  Each hand-picked bean tells a story of organic soil, beautiful highland landscapes, and the dedication of hardworking farmers.
                </p>
              </div>
            </div>
            <GoldDivider variant="dash" className="my-0 py-2 opacity-20" />

            <div className="flex items-start gap-4">
              <ShieldCheck className="w-5 h-5 text-gold shrink-0 mt-0.5" />
              <div>
                <h4 className="font-display text-white text-lg font-medium mb-1">
                  Fair Trade & Sustainability
                </h4>
                <p className="font-body text-xs text-[#8A8A8A]">
                  We honor our promise to use fair trade and sustainable practices, ensuring that our coffee beans are ethically sourced and friendly to our environment.
                </p>
              </div>
            </div>
          </SectionReveal>
        </div>

        {/* Right Column - Sliding layered layout */}
        <div className="lg:col-span-5 relative w-full aspect-[4/5] sm:aspect-square lg:aspect-[4/5] max-w-md mx-auto">
          {/* Base Background Image Layer (Highlands) */}
          <SectionReveal variant="scale" threshold={0.15} className="absolute inset-0 w-4/5 h-[85%] rounded-none overflow-hidden border border-white/5 shadow-2xl">
            <ParallaxImage
              src="https://res.cloudinary.com/dlgvyseuq/image/upload/v1781078812/fresh-beans-coffee-trading/section2Base_Background_Layer_z95bzk.jpg"
              alt="High-altitude Ethiopian coffee highlands"
              rate={-0.12}
            />
          </SectionReveal>
 
          {/* Foreground Close-up Overlay Layer */}
          <SectionReveal
            variant="rise"
            delay={0.3}
            threshold={0.15}
            className="absolute bottom-0 right-0 w-[60%] aspect-square rounded-none overflow-hidden border-2 border-forest shadow-2xl z-10"
          >
            <ParallaxImage
              src="https://res.cloudinary.com/dlgvyseuq/image/upload/v1781078821/fresh-beans-coffee-trading/section2Macro_Foreground_Layer_e3ss1p.jpg"
              alt="Ripe red coffee cherries on active branches"
              rate={0.1}
            />
          </SectionReveal>

          {/* Visual abstract framing decoration */}
          <div className="absolute top-1/2 -right-4 h-[120px] w-[1px] bg-gold/30 z-0 hidden sm:block" />
          <div className="absolute -bottom-4 left-1/3 h-[1px] w-[200px] bg-gold/30 z-0 hidden sm:block" />
        </div>
      </div>
    </section>
  );
}
