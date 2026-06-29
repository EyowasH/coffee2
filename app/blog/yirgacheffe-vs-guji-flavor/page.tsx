'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SectionReveal from '@/components/ui/SectionReveal';
import GoldDivider from '@/components/ui/GoldDivider';

export default function BlogPost() {
  return (
    <main className="min-h-screen bg-obsidian text-stone select-none pt-28 pb-20 font-body">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        {/* Back Link */}
        <div className="mb-8">
          <Link href="/blog" className="text-gold hover:text-white transition-colors font-mono text-[10px] uppercase font-bold tracking-widest inline-flex items-center gap-1.5">
            &larr; Back to Green Blog
          </Link>
        </div>

        {/* Header Block */}
        <div className="mb-12 text-left">
          <span className="text-micro bg-gold/15 text-gold px-3 py-1 font-bold tracking-widest font-mono uppercase border border-gold/20 mb-4 inline-block">
            SENSORY QUALITY PAPERS
          </span>
          <h1 className="font-display font-light text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight mt-2">
            Yirgacheffe vs. Guji: Comparative Sensory Analysis for Specialty Roasters
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-[10px] text-[#8A8A8A] uppercase font-mono mt-4 pt-4 border-t border-white/5">
            <span>Published: June 2026</span>
            <span>·</span>
            <span>By: PLC Quality Desk</span>
            <span>·</span>
            <span>Read Time: 6 min read</span>
          </div>
        </div>

        {/* Post Image Banner */}
        <div className="relative aspect-[16/9] w-full overflow-hidden border border-white/15 bg-obsidian-soft mb-12">
          <Image
            src="https://res.cloudinary.com/dlgvyseuq/image/upload/v1781078932/fresh-beans-coffee-trading/section5Close-Up_Micro_Texture_Bottom-Left_Side_fcogi0.jpg"
            alt="Meticulous sorting of micro-lot arabica coffee cherries"
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            priority
            referrerPolicy="no-referrer"
            className="object-cover"
          />
        </div>

        {/* Article content */}
        <div className="prose prose-invert max-w-none text-xs sm:text-sm text-[#8A8A8A] leading-relaxed flex flex-col gap-8 text-left">
          
          <SectionReveal variant="rise" delay={0.05}>
            <p className="text-sm sm:text-base text-stone/90 italic leading-relaxed">
              When sourcing premium Arabica greens from the Ethiopian southern highlands, B2B coffee buyers and master roasters face a classic sensory decision: Yirgacheffe vs. Guji. While sharing ancestral microclimate proximity, their structural bean densities and chemical acidities present distinct behaviors under modern roasting profiles.
            </p>
          </SectionReveal>

          <GoldDivider variant="ornate" className="py-4" />

          <SectionReveal variant="rise" delay={0.1}>
            <h2 className="font-display text-white text-2xl font-light tracking-tight mt-4 mb-3">
              1. Botanical Terroir &amp; Elevation Profiles
            </h2>
            <p>
              Yirgacheffe’s classic microclimates are highly concentrated around valleys displaying altitudes of 1,800 to 2,200 MASL. The dense garden forestry and cool night thermal shifts slow down cherry maturity. This maximizes the storage of organic sugars in the endosperm, creating the iconic thin-body tea-like profile.
            </p>
            <p className="mt-4">
              Guji, conversely, showcases massive landscape expansions stretching towards altitudes exceeding 2,300 MASL. The surrounding volcanic nutrient deposits and higher solar insulation yield highly dense seeds with thick cells. Roasters targeting caramelized profiles will find Guji’s structural density holds more thermal energy, allowing longer caramelization cycles in the drum.
            </p>
          </SectionReveal>

          <SectionReveal variant="rise" delay={0.15}>
            <h2 className="font-display text-white text-2xl font-light tracking-tight mt-4 mb-3">
              2. Chemical Acidity Calibration (Citric vs. Malic)
            </h2>
            <p>
              The difference between these origins resides in the molecular acidity profiling:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-6">
              <div className="bg-[#090b0a] border border-white/5 p-6">
                <h4 className="font-display text-white text-sm font-bold uppercase tracking-wider mb-2 text-gold">Yirgacheffe Acidity Profile</h4>
                <p className="text-[11px] leading-relaxed text-[#8A8A8A]">
                  Mainly **citric**. Under washing processes, this expresses pristine lime, lemon-blossom, and bergamot acids. Perfect for light filter roasts targeting a high, clean floral acidity.
                </p>
              </div>
              <div className="bg-[#090b0a] border border-white/5 p-6">
                <h4 className="font-display text-white text-sm font-bold uppercase tracking-wider mb-2 text-gold">Guji Acidity Profile</h4>
                <p className="text-[11px] leading-relaxed text-[#8A8A8A]">
                  Pronounced **malic &amp; tartaric**. Naturally presents dense, thick orchard fruits like peach, mango, and stone fruit. Ideal for single-origin espresso or specialty blends where sweetness and deep syrup notes are highly valued.
                </p>
              </div>
            </div>
          </SectionReveal>

          <SectionReveal variant="rise" delay={0.2}>
            <h2 className="font-display text-white text-2xl font-light tracking-tight mt-4 mb-3">
              3. Moisture Retention &amp; Storage Preserves
            </h2>
            <p>
              Fresh Beans Coffee Trading PLC strictly calibrates moisture outputs between **10.5% and 11.5%** before packing into GrainPro hermetic liners. For Yirgacheffe lot selections, the slow drying beds secure highly stable water activity profiles, preserving the delicate, ethereal floral jasmine notes from deteriorating in container cargo shipping.
            </p>
            <p className="mt-4">
              In Guji Naturals, the dry-cherry casing increases initial sucrose density, requiring a slightly different initial charge temperature when roasting. We recommend a gentler initial soak period under roasting drums to avoid scorching the exterior skin while leaving the dense green core underdeveloped.
            </p>
          </SectionReveal>

          <SectionReveal variant="rise" delay={0.25}>
            <h2 className="font-display text-white text-2xl font-light tracking-tight mt-4 mb-3">
              Summary Conclusion for Buyers
            </h2>
            <p>
              For roasters seeking high-contrast elegance and floral prestige, washed Yirgacheffe allocations remain the supreme option. But for distributors demanding robust sweetness, heavy stone-fruit acids, and clean natural profiles that withstand milk pairings, Guji micro-lots represent the modern specialty standard.
            </p>
            <p className="mt-4">
              Pre-shipment sample kits of Grade 1 lots from both regions are currently available for dispatch from our Addis Ababa center. Complete analyses can be requested directly via our procurement channels.
            </p>
          </SectionReveal>
        </div>

        {/* Footer Contact */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center text-[10px] text-stone/50 gap-4">
          <span>Fresh Beans Coffee Trading PLC</span>
          <Link href="/blog" className="text-gold font-bold hover:text-white transition-colors uppercase font-mono tracking-widest text-[9px] block">
            &larr; Return to Articles
          </Link>
          <span>© {new Date().getFullYear()} Addis Ababa, Ethiopia</span>
        </div>
      </div>
    </main>
  );
}
