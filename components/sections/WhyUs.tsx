'use client';
import React from 'react';
import SectionReveal from '@/components/ui/SectionReveal';
import GoldDivider from '@/components/ui/GoldDivider';
import MagneticButton from '@/components/ui/MagneticButton';
import { Package, Truck, Calendar, Anchor, ShieldCheck, FileText } from 'lucide-react';

const logisticSpecs = [
  {
    icon: Package,
    title: "Hermetic Packaging",
    detail: "Standardized in 60kg premium food-grade jute bags lined with airtight moisture-barrier GrainPro or Ecotact hermetic protectors to preserve organic quality."
  },
  {
    icon: Truck,
    title: "Minimum Order (MOQ)",
    detail: "1 Full Container Load (1 FCL - approx. 19.2 Metric Tons / 320 bags). Smaller-scale LCL micro-lot sample shipments are negotiable for specialized roasters."
  },
  {
    icon: Calendar,
    title: "Lead Time",
    detail: "Typically 15 to 30 business days from contract finalization, ECX allocation clearing, and SGS pre-export lab screening to container terminal loading."
  },
  {
    icon: Anchor,
    title: "Sea & Air Routing",
    detail: "Seaborne cargo routed via the Port of Djibouti (primary sea corridor). Direct specialty micro-lots can be dispatched via Addis Ababa Bole Airport (ADD)."
  },
  {
    icon: FileText,
    title: "Standard Incoterms",
    detail: "FOB (Free On Board) Port of Djibouti or Addis Ababa Airport by default. CIF (Cost, Insurance & Freight) or CFR arrangements are available upon request."
  },
  {
    icon: ShieldCheck,
    title: "Quality Control",
    detail: "Every contract undergoes sensory green calibration in our Addis Ababa laboratory, backed by national health certifications, phyto-certificates, and SGS checks."
  }
];

const globalPartners = [
  {
    region: "Northern Europe",
    countries: "Germany, Norway, Netherlands, Sweden",
    focus: "Grade 1 Organic & Washed Specialty Lots"
  },
  {
    region: "North America",
    countries: "United States, Canada",
    focus: "Micro-lots, Co-Op Direct Sourced Natural Guji"
  },
  {
    region: "East Asia",
    countries: "Japan, South Korea, Taiwan",
    focus: "Meticulous Screen Sizing, Zero-Defect Yirgacheffe"
  }
];

export default function WhyUs() {
  return (
    <section
      id="buyers"
      className="relative bg-gradient-to-b from-forest to-obsidian text-stone py-28 sm:py-36 md:py-44 overflow-hidden"
    >
      {/* Delicate light vertical structural lines */}
      <div className="absolute inset-0 opacity-[0.03] flex justify-between pointer-events-none px-6 sm:px-12 md:px-24">
        <div className="w-[1px] h-full bg-stone" />
        <div className="w-[1px] h-full bg-stone hidden sm:block" />
        <div className="w-[1px] h-full bg-stone hidden md:block" />
        <div className="w-[1px] h-full bg-stone" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Asymmetrical Header Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
          <div className="lg:col-span-8 text-left">
            <span className="text-[10px] font-bold tracking-[0.25em] text-gold uppercase font-body block mb-4">
              COMMERCIAL DISTRIBUTION CORRIDORS
            </span>
            <h2 className="font-display font-light text-5xl sm:text-6xl text-white tracking-tight leading-none">
              B2B Export Logistics &amp; Shipping
            </h2>
          </div>
          <div className="lg:col-span-4 mt-4 lg:mt-8 text-left">
            <p className="font-body text-stone/80 text-sm leading-relaxed max-w-sm">
              Fresh Beans Coffee Trading PLC manages the full procurement, dry-milling, clearing, and container packing cycle to guarantee direct-trade efficiency.
            </p>
          </div>
        </div>

        {/* Global Logistics Specs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24 text-left">
          {logisticSpecs.map((spec, sIdx) => {
            const Icon = spec.icon;
            return (
              <SectionReveal
                key={spec.title}
                variant="rise"
                delay={sIdx * 0.08}
                className="bg-forest-mid/10 border border-white/5 p-8 flex flex-col gap-4 hover:border-gold/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-none bg-gold/10 border border-gold/20 flex items-center justify-center text-gold">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display text-white text-lg font-medium mb-2">{spec.title}</h4>
                  <p className="font-body text-xs text-[#8A8A8A] leading-relaxed">{spec.detail}</p>
                </div>
              </SectionReveal>
            );
          })}
        </div>

        {/* SECTION 8 - REAL TESTIMONIALS / OUR PARTNERS SUBSECTION */}
        <div className="border-t border-white/10 pt-20 mb-20">
          <div className="text-left mb-12">
            <span className="text-[10px] text-gold font-bold tracking-[0.2em] font-body uppercase block mb-3">GLOBAL BENEFICIARIES</span>
            <h3 className="font-display text-white text-3xl font-light tracking-tight">Our Roaster &amp; Importer Partners</h3>
            <p className="font-body text-xs text-[#8A8A8A] mt-2 max-w-xl">We supply verified B2B roasting companies and green coffee dealers on three continents, respecting stringent import tolerances.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {globalPartners.map((part, pIdx) => (
              <SectionReveal
                key={part.region}
                variant="scale"
                delay={pIdx * 0.1}
                className="bg-obsidian-soft border border-white/5 p-8 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold text-gold tracking-widest uppercase font-body block mb-3">{part.region}</span>
                  <p className="font-body text-xs text-[#8A8A8A] leading-relaxed mb-6">
                    Primary focus areas cover: <strong className="text-white font-medium">{part.focus}</strong>
                  </p>
                </div>
                <div className="pt-4 border-t border-white/5">
                  <span className="text-[10px] text-stone/50 tracking-wider font-body block uppercase">Active Destinations</span>
                  <span className="text-xs text-white font-bold font-body">{part.countries}</span>
                </div>
              </SectionReveal>
            ))}
          </div>

          {/* Reference List Action Call */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-obsidian-soft border border-white/5 p-8 mt-12 text-left">
            <div>
              <h4 className="font-display text-white text-lg font-medium">Request Our Customer Reference List</h4>
              <p className="font-body text-xs text-[#8A8A8A] mt-1">Contact our Addis Ababa desk to arrange references with roasting buyers in your geographical region.</p>
            </div>
            <a href="#partnership">
              <MagneticButton variant="gold" className="!px-6 !py-3 text-[10px]">
                Request Reference List &rarr;
              </MagneticButton>
            </a>
          </div>
        </div>

        {/* Centered trust footer */}
        <div className="text-center py-6 border-t border-white/10 opacity-60">
          <span className="text-[9px] font-bold tracking-[0.2em] text-stone/40 font-body uppercase block mb-4">
            OUR SPECIALTY &amp; DEDICATION VALUE BADGES
          </span>
          <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12">
            {['HIGH QUALITY BEANS', 'ORGANICALLY SOURCED', 'FAIR TRADE PRACTICE', 'ETHIOPIAN COFFEE TRADITION'].map((badge) => (
              <span
                key={badge}
                className="text-[9px] font-extrabold tracking-[0.15em] font-mono text-white font-body"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
