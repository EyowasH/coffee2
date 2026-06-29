'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import MagneticButton from '@/components/ui/MagneticButton';
import SectionReveal from '@/components/ui/SectionReveal';
import Image from 'next/image';
import { Calendar, Compass, ShieldCheck, Map, Image as ImageIcon, Droplets, Award, Layers, Mountain } from 'lucide-react';

import { brandData } from '@/lib/brand-data';
import EthiopiaMap from './EthiopiaMap';

const REGION_IMAGES: Record<string, string> = {
  yirgacheffe: 'https://res.cloudinary.com/dlgvyseuq/image/upload/v1781078821/fresh-beans-coffee-trading/section3Slide_1Yirgacheffe_pwdvee.jpg',
  guji: 'https://res.cloudinary.com/dlgvyseuq/image/upload/v1781078826/fresh-beans-coffee-trading/section3Slide_2Guji_kihac9.jpg',
  sidama: 'https://res.cloudinary.com/dlgvyseuq/image/upload/v1781078855/fresh-beans-coffee-trading/section3Slide_3_Sidamo_odrtec.jpg',
  jimma: 'https://res.cloudinary.com/dlgvyseuq/image/upload/v1781078855/fresh-beans-coffee-trading/section3Slide_4_Jimma_ztcggz.jpg',
};

interface DetailedRegion {
  id: string;
  name: string;
  region: string;
  quality: string;
  elevation: string;
  processing: string[];
  process: string[]; // backward compatible
  harvest: string;
  cupScore: string;
  flavors: string[];
  flavor: string[]; // backward compatible
  season: string;
  grades: string[];
  screenSize: string;
  moisture: string;
  tagline: string;
  description: string;
  image: string;
  accentColor: string;
}

const detailedOrigins: DetailedRegion[] = [
  {
    id: 'yirgacheffe',
    name: 'Yirgacheffe',
    region: 'Gedeo Zone, Southern Nations, Ethiopia',
    quality: 'Grade 1 Specialty',
    elevation: '1,800 – 2,200 masl',
    processing: ['Washed', 'Natural', 'Honey'],
    process: ['Washed', 'Natural', 'Honey'],
    harvest: 'October – January',
    cupScore: '84 – 87 SCA',
    flavors: ['jasmine', 'bergamot', 'lemon zest', 'stone fruit', 'black tea'],
    flavor: ['jasmine', 'bergamot', 'lemon zest', 'stone fruit', 'black tea'],
    season: 'Harvest: October – January',
    grades: ['Grade 1', 'Grade 2'],
    screenSize: '15+',
    moisture: '10.5% – 11.5%',
    tagline: 'The Delicate Champion of Floral Profiles',
    description: 'High altitudes and nutrient-dense soils yield Yirgacheffe\'s signature cup clarity. Meticulously slow-dried on specialized raised drying beds, these premium lots present intense jasmine perfume paired with clean citrus lemon zest.',
    image: REGION_IMAGES.yirgacheffe,
    accentColor: '#7A9E8733'
  },
  {
    id: 'guji',
    name: 'Guji',
    region: 'Oromia Region, Southern Highlands, Ethiopia',
    quality: 'Grade 1 Specialty',
    elevation: '1,900 – 2,300 masl',
    processing: ['Washed', 'Natural', 'Honey'],
    process: ['Washed', 'Natural', 'Honey'],
    harvest: 'October – January',
    cupScore: '85 – 88 SCA',
    flavors: ['blueberry', 'dark chocolate', 'wine', 'complex fruit', 'floral'],
    flavor: ['blueberry', 'dark chocolate', 'wine', 'complex fruit', 'floral'],
    season: 'Harvest: October – January',
    grades: ['Grade 1', 'Grade 2'],
    screenSize: '15+',
    moisture: '10.5% – 11.5%',
    tagline: 'Complex Fruit Patterns and Heavy Culinary Depth',
    description: 'Guji\'s pristine semi-forest shade canopies permit slow, sugar-packed cherry maturation. The natural-processed lots are heavily fruit-forward, yielding intense jammy blueberry characteristics alongside rich dark cocoa undertones.',
    image: REGION_IMAGES.guji,
    accentColor: '#8B6F4E33'
  },
  {
    id: 'sidama',
    name: 'Sidamo',
    region: 'Sidama State, Rift Valley Highlands, Ethiopia',
    quality: 'Grade 1 & 2 Specialty',
    elevation: '1,600 – 2,000 masl',
    processing: ['Washed', 'Natural'],
    process: ['Washed', 'Natural'],
    harvest: 'October – January',
    cupScore: '84 – 86 SCA',
    flavors: ['peach', 'nectarine', 'caramel', 'mild citrus', 'clean finish'],
    flavor: ['peach', 'nectarine', 'caramel', 'mild citrus', 'clean finish'],
    season: 'Harvest: October – January',
    grades: ['Grade 1', 'Grade 2'],
    screenSize: '15+',
    moisture: '10.5% – 11.5%',
    tagline: 'The Elegant Landscape of Superb Balance',
    description: 'Grown on high slopes overlooking the Great Rift Valley, our direct-trade Sidamo lots display elegant stone fruit acidity, mild clean nectarine sweetness, and a full caramel mouthfeel making it a staple single-origin roaster favorite.',
    image: REGION_IMAGES.sidama,
    accentColor: '#C4A55A33'
  },
  {
    id: 'jimma',
    name: 'Jimma',
    region: 'Ilu Ababora & Kaffa Zones, Western Forest, Ethiopia',
    quality: 'Grade 1 & 2 Specialty',
    elevation: '1,400 – 1,800 masl',
    processing: ['Washed', 'Natural'],
    process: ['Washed', 'Natural'],
    harvest: 'October – December',
    cupScore: '82 – 84 SCA',
    flavors: ['earthy', 'chocolate', 'walnut', 'full body', 'tobacco'],
    flavor: ['earthy', 'chocolate', 'walnut', 'full body', 'tobacco'],
    season: 'Harvest: October – December',
    grades: ['Grade 1', 'Grade 2'],
    screenSize: '15+',
    moisture: '10.5% – 11.5%',
    tagline: 'Robust Viscosity and Rich Historical Foundations',
    description: 'Jimma contains genetic forest reserves representing Arabica\'s evolutionary origin. Standardized under our strict washing protocols, these selections exhibit heavy bodies, chocolate aromatics, and toasted walnut complexity.',
    image: REGION_IMAGES.jimma,
    accentColor: '#5C7A4E33'
  }
];

export default function Origins() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [viewMode, setViewMode] = useState<'map' | 'photo'>('map');
  const activeOrigin = detailedOrigins[activeIdx];

  return (
    <section
      id="origins"
      className="relative bg-obsidian border-t border-glassBorder text-stone py-28 sm:py-36 md:py-44 overflow-hidden"
    >
      {/* Ambient background gold glow */}
      <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="text-label text-gold block mb-3">Single-Origin Territoires</span>
            <h2 className="font-display font-light text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-none text-left">
              Explore the four micro-climates.
            </h2>
          </div>

          {/* Interactive Navigation Control Tabs */}
          <div className="flex flex-wrap lg:flex-nowrap gap-2 bg-obsidian-soft p-1.5 border border-white/5 max-w-full">
            {detailedOrigins.map((orig, idx) => (
              <button
                key={orig.id}
                onClick={() => setActiveIdx(idx)}
                className={`px-4 sm:px-5 py-2.5 text-[10px] font-bold tracking-[0.15em] font-body uppercase transition-all duration-400 border cursor-pointer ${
                  activeIdx === idx
                    ? 'bg-gold border-gold text-obsidian font-semibold'
                    : 'bg-transparent border-transparent text-[#8A8A8A] hover:text-white hover:border-stone/10'
                }`}
              >
                {orig.name}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Display Panel Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch min-h-[550px]">
          {/* Left Block - Image View Layer / D3 Map Layer */}
          <div className="lg:col-span-5 flex flex-col gap-3 min-h-[480px] w-full">
            {/* View Mode Selector Tabs */}
            <div className="flex bg-obsidian-soft p-1 border border-white/5 self-start select-none">
              <button
                onClick={() => setViewMode('map')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-[9px] font-bold tracking-widest uppercase transition-colors cursor-pointer ${
                  viewMode === 'map' ? 'bg-gold border-gold text-obsidian' : 'text-[#8A8A8A] hover:text-white'
                }`}
                id="origins-view-map-btn"
              >
                <Map className="w-3 h-3" />
                Interactive Map
              </button>
              <button
                onClick={() => setViewMode('photo')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-[9px] font-bold tracking-widest uppercase transition-colors cursor-pointer ${
                  viewMode === 'photo' ? 'bg-gold border-gold text-obsidian' : 'text-[#8A8A8A] hover:text-white'
                }`}
                id="origins-view-photo-btn"
              >
                <ImageIcon className="w-3 h-3" />
                Landscape Photo
              </button>
            </div>

            <div className="relative flex-grow min-h-[380px] lg:min-h-0 w-full overflow-hidden border border-white/5 bg-obsidian-soft flex items-stretch">
              <AnimatePresence mode="wait">
                {viewMode === 'map' ? (
                  <motion.div
                    key="map-container"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full flex"
                  >
                    <EthiopiaMap activeIdx={activeIdx} setActiveIdx={setActiveIdx} />
                  </motion.div>
                ) : (
                  <motion.div
                    key={activeOrigin.id}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <Image
                      src={activeOrigin.image}
                      alt={`${activeOrigin.name} landscape at sorting origin`}
                      fill
                      className="object-cover transition-opacity duration-300 pointer-events-none"
                      referrerPolicy="no-referrer"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-black/30" />
                    {/* Floating Micro Label */}
                    <div className="absolute bottom-6 left-6 glass-surface px-4 py-2 border border-stone/10 font-body text-[10px]">
                      <span className="text-gold font-bold uppercase">{activeOrigin.quality}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Block - In-depth parameters */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-obsidian-soft border border-white/5 px-8 py-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeOrigin.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-6"
              >
                {/* Visual Accent Box */}
                <div className="flex items-center justify-between">
                  <span className="text-micro bg-gold/10 text-gold px-3 py-1 font-bold tracking-[0.2em] font-body uppercase border border-gold/20">
                    Microclimate {activeIdx + 1}
                  </span>
                  <span className="text-xs text-gold italic font-display">{activeOrigin.tagline}</span>
                </div>

                <div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                    <h3 className="font-display text-white text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-none font-medium">
                      {activeOrigin.name}
                    </h3>
                    <span className="text-xs sm:text-sm font-semibold text-gold font-body tracking-wider">{activeOrigin.elevation}</span>
                  </div>
                  <span className="text-caption block mb-4">{activeOrigin.region}</span>
                  <div className="h-[1px] bg-stone/5 w-full my-1" />
                </div>

                <p className="font-body text-[#8A8A8A] text-sm leading-relaxed">
                  {activeOrigin.description}
                </p>

                {/* Highly Polished B2B Technical Specs Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 my-2 border-y border-white/5 py-6">
                  <div className="flex flex-col gap-1.5 align-start text-left">
                    <span className="text-[#8A8A8A] text-[9px] font-bold tracking-widest uppercase font-body flex items-center gap-1.5">
                      <Mountain className="w-3.5 h-3.5 text-gold/80" /> Altitude Elevation
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-white">{activeOrigin.elevation}</span>
                  </div>

                  <div className="flex flex-col gap-1.5 align-start text-left">
                    <span className="text-[#8A8A8A] text-[9px] font-bold tracking-widest uppercase font-body flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5 text-gold/80" /> Sourcing Process
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-white">{activeOrigin.processing.join(', ')}</span>
                  </div>

                  <div className="flex flex-col gap-1.5 align-start text-left">
                    <span className="text-[#8A8A8A] text-[9px] font-bold tracking-widest uppercase font-body flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-gold/80" /> Harvest Season
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-white">{activeOrigin.harvest}</span>
                  </div>

                  <div className="flex flex-col gap-1.5 align-start text-left">
                    <span className="text-[#8A8A8A] text-[9px] font-bold tracking-widest uppercase font-body flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-gold/80" /> Cup Score Area
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-gold font-bold">{activeOrigin.cupScore}</span>
                  </div>

                  <div className="flex flex-col gap-1.5 align-start text-left">
                    <span className="text-[#8A8A8A] text-[9px] font-bold tracking-widest uppercase font-body flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-gold/80" /> Export Grades
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-white">{activeOrigin.grades.join(', ')}</span>
                  </div>

                  <div className="flex flex-col gap-1.5 align-start text-left">
                    <span className="text-[#8A8A8A] text-[9px] font-bold tracking-widest uppercase font-body flex items-center gap-1.5">
                      <Droplets className="w-3.5 h-3.5 text-gold/80" /> Screen & Moisture
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-white">{activeOrigin.screenSize} / {activeOrigin.moisture}</span>
                  </div>
                </div>

                {/* Flavor Notes Panel */}
                <div className="flex flex-col gap-3">
                  <span className="text-[#8A8A8A] text-[9px] font-bold tracking-widest uppercase font-body text-left">Primary Flavor Profile</span>
                  <div className="flex flex-wrap gap-2">
                    {activeOrigin.flavors.map((flav) => (
                      <span
                        key={flav}
                        className="glass-surface px-3 py-1.5 text-xs text-white border border-white/5 uppercase font-body font-medium"
                        style={{ backgroundColor: activeOrigin.accentColor }}
                      >
                        {flav}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Request Button */}
            <div className="mt-8 pt-6 border-t border-stone/5 flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-[#8A8A8A] tracking-wider font-body">QUALITY STANDARD:</span>
                <span className="text-sm text-gold font-bold font-body">{activeOrigin.quality}</span>
              </div>
              <a href="#partnership">
                <MagneticButton variant="gold" className="!py-3 !px-6 text-[11px]">
                  Request Sample &rarr;
                </MagneticButton>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
