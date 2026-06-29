'use client';
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { motion, AnimatePresence } from 'motion/react';
import { brandData } from '@/lib/brand-data';

interface EthiopiaMapProps {
  activeIdx: number;
  setActiveIdx: (idx: number) => void;
}

interface MapRegion {
  id: string;
  name: string;
  x: number;
  y: number;
  quality: string;
  tagline: string;
  flavor: string[];
  region: string;
}

// Coordinate coordinates customized for a perfect proportional fit inside 500x450 container
const MAP_REGIONS: MapRegion[] = [
  {
    id: 'yirgacheffe',
    name: 'Yirgacheffe',
    x: 255,
    y: 350,
    quality: 'High Quality',
    tagline: 'The Flavorful Specialty',
    flavor: ['Unique Floral', 'Bright & Flavorful'],
    region: 'Yirgacheffe Region, Ethiopia'
  },
  {
    id: 'guji',
    name: 'Guji',
    x: 315,
    y: 360,
    quality: 'Organic Beans',
    tagline: 'The Rich Harmony',
    flavor: ['Rich & Diverse', 'Organic Depth'],
    region: 'Guji Region, Ethiopia'
  },
  {
    id: 'sidama',
    name: 'Sidamo',
    x: 280,
    y: 315,
    quality: 'Environmentally Friendly',
    tagline: 'The Exquisite Balance',
    flavor: ['Scented Sweetness', 'Fine Traditional Cup'],
    region: 'Sidamo Region, Ethiopia'
  },
  {
    id: 'jimma',
    name: 'Jimma',
    x: 185,
    y: 290,
    quality: 'Ethiopian Heritage',
    tagline: 'The Classic Essence',
    flavor: ['Deep & Smooth', 'Authentic Specialty'],
    region: 'Jimma Region, Ethiopia'
  }
];

const CAPITAL_PT = { name: 'Addis Ababa', x: 265, y: 240 };

// Detailed custom SVG path outline representing a stylized scale map of Ethiopia
const ETHIOPIA_BORDER_PATH = "M 210,100 C 230,95 245,85 260,85 C 280,85 295,75 315,90 C 330,100 350,110 365,115 C 380,120 395,140 410,150 C 425,160 445,170 455,190 C 465,210 475,230 485,250 C 490,265 480,285 465,295 C 450,305 430,310 415,315 C 400,320 385,335 385,350 C 385,365 395,380 380,395 C 365,410 345,415 325,410 C 305,405 285,412 265,415 C 245,418 225,410 205,400 C 185,390 165,375 155,355 C 145,335 140,315 145,295 C 150,275 140,260 130,245 C 120,230 115,215 125,200 C 135,185 150,175 165,160 C 180,145 195,125 210,100 Z";

export default function EthiopiaMap({ activeIdx, setActiveIdx }: EthiopiaMapProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<MapRegion | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);

    // Dynamic scale or transition effects for pathways on selection
    svg.selectAll('.radar-line')
      .transition()
      .duration(800)
      .style('stroke', (d: any, i: number) => i === activeIdx ? '#C4A55A' : 'rgba(196, 165, 90, 0.25)')
      .style('stroke-width', (d: any, i: number) => i === activeIdx ? '1.5px' : '1px');

    svg.selectAll('.region-halo')
      .transition()
      .duration(600)
      .attr('r', (d: any, i: number) => i === activeIdx ? 16 : 8)
      .style('opacity', (d: any, i: number) => i === activeIdx ? 0.35 : 0);

  }, [activeIdx]);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!svgRef.current) return;
    const bounds = svgRef.current.getBoundingClientRect();
    const x = e.clientX - bounds.left + 15;
    const y = e.clientY - bounds.top - 15;
    
    if (tooltipRef.current) {
      tooltipRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    } else {
      setTooltipPos({ x, y });
    }
  };

  return (
    <div className="relative w-full h-full min-h-[420px] bg-obsidian border border-white/5 p-4 overflow-hidden select-none flex flex-col justify-between">
      {/* Topology Exploration Header */}
      <div className="flex items-center justify-between pb-2 border-b border-white/5 z-10">
        <div className="flex flex-col text-left">
          <span className="text-[9px] font-bold text-gold tracking-widest uppercase font-mono">D3.js Spatial Navigation Engine</span>
          <span className="text-white text-xs font-semibold uppercase">Sourcing Coordinates</span>
        </div>
        <div className="text-right flex flex-col text-[8px] font-mono text-[#8A8A8A]">
          <span>GRID SEC: 45°N / 38°E</span>
          <span className="text-gold font-bold">INTERACTIVE MATRIX</span>
        </div>
      </div>

      {/* Styled Grid Coordinate System Visual Effect */}
      <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-3 pointer-events-none">
        {Array.from({ length: 36 }).map((_, i) => (
          <div key={i} className="border-[0.5px] border-[#8A8A8A]/10 w-full h-full" />
        ))}
      </div>

      {/* D3 Render Area */}
      <div className="relative w-full flex-grow flex items-center justify-center py-4">
        <svg
          ref={svgRef}
          viewBox="0 0 500 450"
          className="w-full max-w-[480px] h-auto drop-shadow-2xl cursor-crosshair"
          onPointerMove={handlePointerMove}
        >
          {/* Subtle Outer Boundary Aura */}
          <path
            d={ETHIOPIA_BORDER_PATH}
            className="fill-none stroke-gold/10 stroke-[6px] blur-sm transition-all duration-700"
          />

          {/* Core Ethiopia Styled Map Boundary */}
          <path
            d={ETHIOPIA_BORDER_PATH}
            className="fill-[#141414] stroke-[#222222] stroke-1.5 transition-colors duration-500 hover:fill-[#121212]"
          />

          {/* Dotted Radial Sourcing Guide circles centered on Addis Ababa */}
          <circle
            cx={CAPITAL_PT.x}
            cy={CAPITAL_PT.y}
            r="60"
            className="fill-none stroke-stone/5 stroke-1 stroke-dasharray-[2,4]"
          />
          <circle
            cx={CAPITAL_PT.x}
            cy={CAPITAL_PT.y}
            r="120"
            className="fill-none stroke-stone/5 stroke-1 stroke-dasharray-[3,5]"
          />

          {/* Radar lines connecting capital Addis Ababa to harvesting locations */}
          {MAP_REGIONS.map((region, idx) => (
            <line
              key={`line-${region.id}`}
              x1={CAPITAL_PT.x}
              y1={CAPITAL_PT.y}
              x2={region.x}
              y2={region.y}
              className="radar-line transition-all duration-500"
              style={{
                stroke: activeIdx === idx ? '#C4A55A' : 'rgba(196, 165, 90, 0.25)',
                strokeDasharray: '4,4',
                strokeWidth: activeIdx === idx ? '1.5px' : '1px'
              }}
            />
          ))}

          {/* Addis Ababa Capital Reference Marker */}
          <g>
            <circle
              cx={CAPITAL_PT.x}
              cy={CAPITAL_PT.y}
              r="4"
              className="fill-white stroke-gold stroke-1"
            />
            <circle
              cx={CAPITAL_PT.x}
              cy={CAPITAL_PT.y}
              r="8"
              className="fill-none stroke-white/20 stroke-0.5 animate-ping"
            />
            <text
              x={CAPITAL_PT.x}
              y={CAPITAL_PT.y - 10}
              className="fill-white/70 font-mono text-[8px] font-bold tracking-widest text-middle text-center"
              textAnchor="middle"
            >
              ADDIS ABABA (HQ)
            </text>
          </g>

          {/* Interactive Sourced Region Overlay Groups */}
          {MAP_REGIONS.map((region, idx) => {
            const isActive = activeIdx === idx;
            const isHovered = hoveredRegion?.id === region.id;
            return (
              <g
                key={region.id}
                className="group cursor-pointer"
                onClick={() => setActiveIdx(idx)}
                onPointerOver={() => setHoveredRegion(region)}
                onPointerLeave={() => setHoveredRegion(null)}
              >
                {/* Expanding pulse sensor context */}
                <circle
                  cx={region.x}
                  cy={region.y}
                  r={isActive ? 18 : 10}
                  className="fill-none stroke-gold/30 transition-all duration-500"
                  style={{ strokeWidth: '0.5px' }}
                />

                {/* Golden Animated Wave halo */}
                <circle
                  cx={region.x}
                  cy={region.y}
                  r="8"
                  className="region-halo fill-gold/10 stroke-gold/40 stroke-0.5"
                />

                {/* Main Core hotspot dot */}
                <circle
                  cx={region.x}
                  cy={region.y}
                  r="5.5"
                  className={`transition-all duration-400 ${
                    isActive
                      ? 'fill-gold stroke-white stroke-1.5 shadow-[0_0_10px_rgba(196,165,90,0.8)]'
                      : isHovered
                      ? 'fill-white stroke-gold stroke-1'
                      : 'fill-[#5A5A5A] stroke-[#1C1C1C] stroke-1 hover:fill-gold'
                  }`}
                />

                {/* Hotspot Title Anchor Text tag */}
                <text
                  x={region.x}
                  y={region.y + 16}
                  className={`font-body text-[9px] uppercase tracking-wider transition-colors duration-300 font-bold ${
                    isActive ? 'fill-gold' : isHovered ? 'fill-white' : 'fill-[#8A8A8A]'
                  }`}
                  textAnchor="middle"
                >
                  {region.name}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Floating Custom Micro Tooltip Panel */}
        <AnimatePresence>
          {hoveredRegion && (
            <motion.div
              ref={tooltipRef}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute z-40 bg-black/90 border border-gold/40 text-left p-3.5 w-60 max-w-[90vw] pointer-events-none"
              style={{
                left: 0,
                top: 0,
                transform: `translate3d(${tooltipPos.x}px, ${tooltipPos.y}px, 0)`,
              }}
            >
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between border-b border-white/10 pb-1">
                  <span className="font-display text-white text-xs font-bold uppercase tracking-wider">
                    {hoveredRegion.name}
                  </span>
                  <span className="text-[8px] font-mono text-gold font-bold uppercase tracking-widest bg-gold/5 px-1.5 py-0.5 border border-gold/10">
                    {hoveredRegion.quality}
                  </span>
                </div>
                <span className="text-[9px] font-mono text-[#8A8A8A] uppercase">
                  {hoveredRegion.region}
                </span>
                <span className="text-[10px] text-stone/90 leading-relaxed font-body">
                  {hoveredRegion.tagline}
                </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {hoveredRegion.flavor.map((f) => (
                    <span
                      key={f}
                      className="text-[8px] px-1.5 py-0.5 bg-white/5 border border-white/10 text-white leading-none uppercase"
                    >
                      {f}
                    </span>
                  ))}
                </div>
                <div className="mt-1 pb-0.5 border-t border-white/5 pt-1 text-[8px] font-mono text-white/50 uppercase tracking-widest text-center">
                  Click hotspot to sync details &rarr;
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sourcing Legend / Guidance Tag */}
      <div className="flex flex-col sm:flex-row items-center justify-between border-t border-white/5 pt-2 gap-2 text-[9px] font-body text-[#8A8A8A] font-medium tracking-wide">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" /> Selected Region
          </span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5a5a5a] inline-block" /> Coffee Hotspots
          </span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-white inline-block" /> Addis Ababa (HQ)
          </span>
        </div>
        <div className="uppercase font-mono text-[8px] text-gold/80 italic">
          *Hover to inspect · Click to explore
        </div>
      </div>
    </div>
  );
}
