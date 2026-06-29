'use client';
import React from 'react';
import SectionReveal from '@/components/ui/SectionReveal';
import GoldDivider from '@/components/ui/GoldDivider';

export default function TermsAndConditions() {
  return (
    <main className="min-h-screen bg-obsidian text-stone select-none pt-28 pb-20 font-body">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        {/* Editorial Header */}
        <div className="mb-12">
          <span className="text-label text-gold block mb-3 uppercase tracking-widest text-[10px]">ORGANIZATION LEGAL DEP</span>
          <h1 className="font-display font-light text-4xl sm:text-5xl text-white tracking-tight">Standard Export Terms of Trade</h1>
          <p className="text-[#8A8A8A] text-xs font-mono uppercase tracking-wider mt-2">
            Fresh Beans Coffee Trading PLC · Addis Ababa, Ethiopia · Effective: {new Date().getFullYear()}
          </p>
        </div>

        <GoldDivider variant="short" className="mb-10" />

        <div className="prose prose-invert max-w-none text-xs sm:text-sm text-[#8A8A8A] leading-relaxed flex flex-col gap-8">
          <SectionReveal variant="rise" delay={0.05}>
            <h2 className="font-display text-white text-xl font-medium mb-3">1. Regulatory Sourcing Alignment</h2>
            <p>
              By engaging with Fresh Beans Coffee Trading PLC (registered LLC based in Addis Ababa, Ethiopia, founded 2024), roasting buyers and green importers agree to adhere to coffee-trading rules governed by the Ministry of Trade and Regional Integration and the Ethiopian Coffee &amp; Tea Authority. All contracts must be validated and authorized through ECX (Ethiopian Commodity Exchange) clearance channels.
            </p>
          </SectionReveal>

          <SectionReveal variant="rise" delay={0.1}>
            <h2 className="font-display text-white text-xl font-medium mb-3">2. Sample Dispatches &amp; Pre-Shipment Approval</h2>
            <p>
              Pre-shipment samples are prepared from active physical warehouse slots representing specified harvest lots. All green samples undergo strict optical sorting in Addis Ababa. Upon feedback declaration of approval by the buyer, contract terms are initiated and locked at Djibouti port loading levels. Samples are dispatch-cleared under B2B terms only.
            </p>
          </SectionReveal>

          <SectionReveal variant="rise" delay={0.15}>
            <h2 className="font-display text-white text-xl font-medium mb-3">3. Incoterms &amp; Maritime Freight</h2>
            <p>
              All default contracts operate on FOB (Free On Board) Djibouti terms, unless clearly scheduled for CIF (Cost, Insurance &amp; Freight) or CFR ports on individual sales schedules. Risk of loss is fully transferred to the buyer&apos;s shipping line upon container validation over the ship&apos;s rail at the Port of Djibouti.
            </p>
          </SectionReveal>

          <SectionReveal variant="rise" delay={0.2}>
            <h2 className="font-display text-white text-xl font-medium mb-3">4. Commercial Payments &amp; LC Sourcing</h2>
            <p>
              Standard commercial financial payment mandates require verified Swift Bank Transfers, Telegraphic Transfers (T/T), or irrevocable Letters of Credit (L/C) opened at an accredited first-tier international banking institution. Settlement terms must align with official central bank export control provisions.
            </p>
          </SectionReveal>

          <SectionReveal variant="rise" delay={0.25}>
            <h2 className="font-display text-white text-xl font-medium mb-3">5. Arbitration &amp; Force Majeure</h2>
            <p>
              Disputes not resolved by amicable negotiation shall be governed under the rules of the International Chamber of Commerce (ICC) or the Coffee Association of Europe/Specialty Coffee Association (SCA) arbitration boards. Force majeure clauses apply for shipping lane closures, regional weather delays, or port congestions affecting Djiboutian ocean terminals.
            </p>
          </SectionReveal>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex justify-between items-center text-[10px] text-stone/50">
          <span>Fresh Beans Coffee Trading PLC</span>
          <span>© {new Date().getFullYear()} Addis Ababa, Ethiopia</span>
        </div>
      </div>
    </main>
  );
}
