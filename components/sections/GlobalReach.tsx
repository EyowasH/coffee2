'use client';
import React, { useState } from 'react';
import { motion } from 'motion/react';
import SectionReveal from '@/components/ui/SectionReveal';
import MetricCounter from '@/components/ui/MetricCounter';

const destinations = [
  { name: 'Oslo, Norway', cx: 180, cy: 30, textOffset: [-10, -12] },
  { name: 'London, UK', cx: 160, cy: 35, textOffset: [-10, -12] },
  { name: 'Tokyo, Japan', cx: 290, cy: 60, textOffset: [10, -5] },
  { name: 'Seoul, S. Korea', cx: 280, cy: 55, textOffset: [10, -5] },
  { name: 'Melbourne, Australia', cx: 285, cy: 125, textOffset: [12, 12] },
  { name: 'New York, USA', cx: 100, cy: 45, textOffset: [-15, -12] },
  { name: 'Hamburg, Germany', cx: 175, cy: 38, textOffset: [10, -10] },
  { name: 'Amsterdam, Netherlands', cx: 168, cy: 40, textOffset: [10, -10] },
];

const origin = { x: 195, y: 72, name: 'Addis Ababa (Origin)' };

export default function GlobalReach() {
  const [hoveredDest, setHoveredDest] = useState<string | null>(null);

  return (
    <section
      id="markets"
      className="relative bg-obsidian border-t border-glassBorder text-stone py-24 sm:py-32 overflow-hidden"
    >
      {/* Background Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay bg-[linear-gradient(to_right,#F5F0E8_1px,transparent_1px),linear-gradient(to_bottom,#F5F0E8_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col items-center">
        {/* Centered Editorial Header */}
        <div className="max-w-3xl text-center mb-16 sm:mb-24">
          <span className="text-label text-gold block mb-3">Global Export Ports</span>
          <h2 className="font-display font-light text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-none mb-4">
            From the highlands of Ethiopia — to you.
          </h2>
          <p className="font-body text-[#8A8A8A] text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Direct-traded, container-sealed maritime shipments and air freights dispatched straight from the capital to roasting hubs globally.
          </p>
        </div>

        {/* Dynamic Interactive SVG Map Container */}
        <div className="relative w-full aspect-[2/1] min-h-[300px] md:min-h-[450px] bg-obsidian-soft border border-white/5 p-4 sm:p-8 flex items-center justify-center overflow-hidden mb-16">
          <svg
            viewBox="0 0 350 150"
            className="w-full h-full text-stone select-none pointer-events-auto"
            style={{ filter: 'grayscale(0.3)' }}
          >
            {/* World Land mass silhouette (abstracted curved coordinates for premium layout) */}
            <g fill="rgba(255, 255, 255, 0.01)" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5">
              {/* North America abstraction */}
              <path d="M 30,20 Q 55,25 70,20 T 115,50 T 110,75 T 90,65 T 70,55 Z" />
              {/* South America abstraction */}
              <path d="M 85,75 Q 110,85 115,95 T 100,140 T 90,120 T 80,95 Z" />
              {/* Africa-Europe abstraction */}
              <path d="M 140,25 Q 170,10 190,20 T 205,45 T 195,65 T 200,90 T 180,105 T 160,85 T 145,55 Z" />
              {/* Asia abstraction */}
              <path d="M 190,20 Q 230,10 280,15 T 320,40 T 310,75 T 270,85 T 235,55 Z" />
              {/* Australia abstraction */}
              <path d="M 270,100 Q 300,105 310,115 T 290,135 T 265,115 Z" />
            </g>

            {/* Direct Export Route Lines with draw transition */}
            {destinations.map((dest, idx) => {
              const isHovered = hoveredDest === dest.name;
              return (
                <g key={`route-${dest.name}`}>
                  <motion.path
                    d={`M ${origin.x} ${origin.y} Q ${(origin.x + dest.cx) / 2} ${(origin.y + dest.cy) / 2 - 15} ${dest.cx} ${dest.cy}`}
                    fill="none"
                    stroke={isHovered ? '#C9A84C' : 'rgba(201,168,76,0.22)'}
                    strokeWidth={isHovered ? 1.25 : 0.75}
                    strokeDasharray={isHovered ? 'none' : '2, 3'}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                      duration: 1.5,
                      delay: idx * 0.15,
                      ease: 'easeOut',
                    }}
                  />
                  {/* Subtle directional flowing photon dot */}
                  <motion.circle
                    r="0.8"
                    fill="#C9A84C"
                    initial={{ offsetDistance: '0%' }}
                    animate={{
                      offsetDistance: ['0%', '100%'],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'linear',
                      delay: idx * 0.4,
                    }}
                    style={{
                      motionPath: `M ${origin.x} ${origin.y} Q ${(origin.x + dest.cx) / 2} ${(origin.y + dest.cy) / 2 - 15} ${dest.cx} ${dest.cy}`,
                    }}
                  />
                </g>
              );
            })}

            {/* Ethiopia Origin Pin Node */}
            <g transform={`translate(${origin.x}, ${origin.y})`}>
              <circle r="4" fill="rgba(201,168,76,0.15)" className="animate-ping" />
              <circle r="2" fill="#C9A84C" />
              <text y="5" textAnchor="middle" className="text-[4px] font-bold fill-white tracking-widest font-body">ET</text>
            </g>

            {/* Destination Pins & Pulses */}
            {destinations.map((dest) => {
              const isActive = hoveredDest === dest.name;
              return (
                <g
                  key={dest.name}
                  transform={`translate(${dest.cx}, ${dest.cy})`}
                  onMouseEnter={() => setHoveredDest(dest.name)}
                  onMouseLeave={() => setHoveredDest(null)}
                  className="cursor-pointer"
                >
                  <circle
                    r={isActive ? 4 : 2}
                    fill={isActive ? '#C9A84C' : 'rgba(255,255,255,0.4)'}
                    className="transition-all duration-300"
                  />
                  {isActive && (
                    <circle
                      r="7"
                      fill="none"
                      stroke="#C9A84C"
                      strokeWidth="0.5"
                      className="animate-ping"
                    />
                  )}

                  {/* Desktop Label Layer */}
                  <text
                    x={dest.textOffset[0]}
                    y={dest.textOffset[1]}
                    className={`text-[3.5px] tracking-wider font-semibold font-body uppercase select-none transition-all duration-300 ${
                      isActive ? 'fill-gold font-bold scale-[1.1]' : 'fill-[#8A8A8A]/70'
                    }`}
                  >
                    {dest.name}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Floating Live Tooltip */}
          {hoveredDest && (
            <div className="absolute top-4 left-4 glass-surface px-4 py-2 border border-gold/40 flex flex-col pointer-events-none transition-opacity duration-300">
              <span className="text-[9px] font-bold text-gold tracking-widest uppercase font-body">ROASTING RECIPIENT MARKET</span>
              <span className="text-[11px] font-semibold text-white font-body mt-0.5">{hoveredDest}</span>
            </div>
          )}
        </div>

        {/* Global Specialty Indicators */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-16 w-full mt-4 text-center md:text-left select-none">
          <div className="flex flex-col">
            <span className="font-display font-medium text-4xl sm:text-5xl lg:text-6xl text-gold mb-2 tracking-tight">4</span>
            <span className="text-label text-stone/60 font-body uppercase tracking-wider">Sourced Regions Only</span>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-medium text-4xl sm:text-5xl lg:text-6xl text-gold mb-2 tracking-tight">Organic</span>
            <span className="text-label text-stone/60 font-body uppercase tracking-wider">Sourced Premium Beans</span>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-medium text-4xl sm:text-5xl lg:text-6xl text-gold mb-2 tracking-tight">100%</span>
            <span className="text-label text-stone/60 font-body uppercase tracking-wider">Carefully Hand-Picked</span>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-medium text-4xl sm:text-5xl lg:text-6xl text-gold mb-2 tracking-tight">Global</span>
            <span className="text-label text-stone/60 font-body uppercase tracking-wider">Safe Export Connections</span>
          </div>
        </div>
      </div>
    </section>
  );
}
