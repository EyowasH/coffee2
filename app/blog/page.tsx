'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SectionReveal from '@/components/ui/SectionReveal';
import GoldDivider from '@/components/ui/GoldDivider';

const blogArticles = [
  {
    slug: "yirgacheffe-vs-guji-flavor",
    title: "Yirgacheffe vs. Guji: Comparative Sensory Analysis for Specialty Roasters",
    excerpt: "An in-depth sensory exploration into modern wash and natural allocations from Southern highlands. We dissect altitude patterns, density metrics, and cup profiles.",
    published: "June 2026",
    readTime: "6 min read",
    author: "PLC Quality Desk",
    image: "https://res.cloudinary.com/dlgvyseuq/image/upload/v1781078932/fresh-beans-coffee-trading/section5Close-Up_Micro_Texture_Bottom-Left_Side_fcogi0.jpg",
    category: "Sensory Calibration"
  }
];

export default function BlogIndex() {
  return (
    <main className="min-h-screen bg-obsidian text-stone select-none pt-28 pb-20 font-body">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        {/* Editorial Header */}
        <div className="mb-16 text-left">
          <span className="text-label text-gold block mb-3 uppercase tracking-widest text-[10px]">COMMERCIAL INTEL</span>
          <h1 className="font-display font-light text-4xl sm:text-5xl lg:text-md text-white tracking-tight">Specialty Green Coffee Blog</h1>
          <p className="text-[#8A8A8A] text-xs sm:text-sm mt-3 max-w-2xl">
            Technical papers, crop availability reports, and sensory profiling guidelines prepared directly by our sensory grader panel in Addis Ababa.
          </p>
        </div>

        <GoldDivider variant="short" className="mb-12" />

        {/* Featured Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
          {blogArticles.map((art, idx) => (
            <SectionReveal
              key={art.slug}
              variant="rise"
              delay={idx * 0.1}
              className="group flex flex-col justify-between border border-white/5 bg-obsidian-soft hover:border-gold/30 transition-all duration-300"
            >
              <Link href={`/blog/${art.slug}`} className="block relative aspect-[16/10] overflow-hidden bg-obsidian-soft border-b border-white/5">
                <Image
                  src={art.image}
                  alt={art.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  referrerPolicy="no-referrer"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-gold/90 text-black font-bold uppercase tracking-widest text-[8px] font-mono px-2.5 py-1">
                  {art.category}
                </span>
              </Link>
              
              <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center text-[10px] text-[#8A8A8A] font-mono mb-4 uppercase">
                    <span>{art.published}</span>
                    <span>{art.readTime}</span>
                  </div>
                  <h2 className="font-display text-white text-xl font-medium tracking-tight mb-3 group-hover:text-gold transition-colors">
                    <Link href={`/blog/${art.slug}`}>{art.title}</Link>
                  </h2>
                  <p className="text-xs text-[#8A8A8A] leading-relaxed mb-6">
                    {art.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex justify-between items-center text-[10px] font-mono text-stone/50 uppercase">
                  <span>Author: {art.author}</span>
                  <Link href={`/blog/${art.slug}`} className="text-gold font-bold group-hover:translate-x-1 transition-transform inline-flex items-center">
                    READ ANALYSIS &rarr;
                  </Link>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </main>
  );
}
