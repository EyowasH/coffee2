'use client';
import React from 'react';
import SectionReveal from '@/components/ui/SectionReveal';
import GoldDivider from '@/components/ui/GoldDivider';

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-obsidian text-stone select-none pt-28 pb-20 font-body">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        {/* Editorial Header */}
        <div className="mb-12">
          <span className="text-label text-gold block mb-3 uppercase tracking-widest text-[10px]">ORGANIZATION LEGAL DEP</span>
          <h1 className="font-display font-light text-4xl sm:text-5xl text-white tracking-tight">Privacy &amp; Data Protection Policy</h1>
          <p className="text-[#8A8A8A] text-xs font-mono uppercase tracking-wider mt-2">
            Fresh Beans Coffee Trading PLC · Addis Ababa, Ethiopia · Effective: {new Date().getFullYear()}
          </p>
        </div>

        <GoldDivider variant="short" className="mb-10" />

        <div className="prose prose-invert max-w-none text-xs sm:text-sm text-[#8A8A8A] leading-relaxed flex flex-col gap-8">
          <SectionReveal variant="rise" delay={0.05}>
            <h2 className="font-display text-white text-xl font-medium mb-3">1. Scope of B2B Sourcing Data</h2>
            <p>
              Fresh Beans Coffee Trading PLC is committed to protecting corporate client credentials, trade logs, and sample shipping details. This Privacy Policy documents how we process company credentials submitted through our digital portals or directly via our Addis Ababa trading desk.
            </p>
          </SectionReveal>

          <SectionReveal variant="rise" delay={0.1}>
            <h2 className="font-display text-white text-xl font-medium mb-3">2. Sourcing &amp; Procurement Collection</h2>
            <p>
              When you submit an export partnership file or sample request, we collect specific verification data to coordinate international customs clearance:
            </p>
            <ul className="list-disc pl-5 mt-2 flex flex-col gap-1.5 text-stone/80">
              <li>Corporate Name, Trade Registry, and Legal Sourcing Jurisdiction</li>
              <li>Consolidated Shipping Destination, Destination Ports, and Import License Codes</li>
              <li>Official Contact Telephone, Corporate Mail Address, and WhatsApp identifiers</li>
              <li>Requested Green Lot Profiles, Tasting Parameters, and SCA grading tolerances</li>
            </ul>
          </SectionReveal>

          <SectionReveal variant="rise" delay={0.15}>
            <h2 className="font-display text-white text-xl font-medium mb-3">3. Usage of Trade Logistics Information</h2>
            <p>
              Registered data is restricted solely to routing direct-trade samples, preparing commercial invoices, securing Phytosanitary certificates from the Ethiopian Ministry of Agriculture, clearing ECX allocation contracts, and notifying shipping carriers. We do not engage in consumer list selling, tracking, or automated profiling.
            </p>
          </SectionReveal>

          <SectionReveal variant="rise" delay={0.2}>
            <h2 className="font-display text-white text-xl font-medium mb-3">4. International Trade Compliance &amp; Security</h2>
            <p>
              Under Ethiopia&apos;s telecommunications and commerce guidelines, our databases utilize enterprise-grade SSL protection layers. Data is hosted on secure Vercel servers, with restricted access granted only to verified trade coordinators at our main Addis Ababa office.
            </p>
          </SectionReveal>

          <SectionReveal variant="rise" delay={0.25}>
            <h2 className="font-display text-white text-xl font-medium mb-3">5. Corporate Inquiries &amp; Data Erasure</h2>
            <p>
              According to standard B2B transparency, roasting partners and green importers can request complete extraction, auditing, or removal of their procurement contact files at any time by contacting our database compliance manager at <strong className="text-white font-medium">coffeefreshbeans@gmail.com</strong>. We respond to and process all inquiries within 24 business hours.
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
