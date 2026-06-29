'use client';
import React from 'react';
import Image from 'next/image';
import GoldDivider from '@/components/ui/GoldDivider';

export default function Footer() {
  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-obsidian border-t border-glassBorder text-stone pt-24 pb-12 overflow-hidden select-none">
      {/* Background radial gradient mask for subtle mood */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-[300px] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          {/* Column 1: Logo & Tagline summary */}
          <div className="md:col-span-5 flex flex-col gap-6">
            <div className="relative w-[200px] h-[52px] sm:w-[250px] sm:h-[66px] flex-shrink-0">
              <Image
                src="https://res.cloudinary.com/dlgvyseuq/image/upload/v1782629902/fresh-beans-coffee-trading/Freshbeanslogo-removebg-preview-Photoroom_gugilr.png"
                alt="Fresh Beans Coffee Trading PLC Logo"
                fill
                loading="lazy"
                sizes="(max-width: 640px) 200px, 250px"
                style={{ objectFit: 'contain', objectPosition: 'left' }}
                decoding="async"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="font-body text-sm text-[#8A8A8A] leading-relaxed max-w-sm">
              Connecting Ethiopia&apos;s ancient coffee heritage with the world. We offer organic, premium, and sustainably sourced raw and roasted coffee beans.
            </p>
            <div className="flex flex-col gap-1.5 text-xs text-gold/80 font-semibold tracking-wider font-body">
              <span>ETHICALLY & SUSTAINABLY SOURCED</span>
              <span>ORGANIC COFFEE CERTIFIED</span>
              <span>PARTNERS WITH HARDWORKING FARMERS</span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="md:col-span-3 flex flex-col gap-6">
            <h4 className="text-[10px] font-bold tracking-[0.2em] text-gold uppercase font-body">
              NAVIGATION
            </h4>
            <div className="flex flex-col gap-3 font-body text-xs text-[#8A8A8A]">
              <a
                href="#heritage"
                onClick={(e) => handleScrollToSection(e, 'heritage')}
                className="hover:text-white transition-colors duration-300"
              >
                Our Heritage
              </a>
              <a
                href="#origins"
                onClick={(e) => handleScrollToSection(e, 'origins')}
                className="hover:text-white transition-colors duration-300"
              >
                Origin Regions (4)
              </a>
              <a
                href="#journey"
                onClick={(e) => handleScrollToSection(e, 'journey')}
                className="hover:text-white transition-colors duration-300"
              >
                Traceability Journey
              </a>
              <a
                href="#drying"
                onClick={(e) => handleScrollToSection(e, 'drying')}
                className="hover:text-white transition-colors duration-300"
              >
                Drying & Process
              </a>
              <a
                href="#quality"
                onClick={(e) => handleScrollToSection(e, 'quality')}
                className="hover:text-white transition-colors duration-300"
              >
                Documented Quality
              </a>
              <a
                href="#partnership"
                onClick={(e) => handleScrollToSection(e, 'partnership')}
                className="hover:text-white transition-colors duration-300 text-gold/80 font-medium"
              >
                Sourcing Inquiry
              </a>
            </div>
          </div>

          {/* Column 3: Contact & Exporter licenses */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <h4 className="text-[10px] font-bold tracking-[0.2em] text-gold uppercase font-body">
              EXPORT DESK
            </h4>
            <div className="flex flex-col gap-3 font-body text-xs text-[#8A8A8A] leading-relaxed select-text">
              <span className="text-white block">HEADQUARTERS</span>
              <span>Etsehiwot engidawork Bldg., 4th Floor Office #407<br />Addis Ababa, Ethiopia</span>
              <span className="block mt-2">
                TELEPHONE<br />
                <span className="text-white">+251-924115178 | +251-911657738</span>
              </span>
              <span className="block mt-2">
                INQUIRY EMAIL<br />
                <a
                  href="mailto:coffeefreshbeans@gmail.com"
                  className="text-white hover:text-gold transition-all duration-300 underline underline-offset-4"
                >
                  coffeefreshbeans@gmail.com
                </a>
              </span>
            </div>
          </div>
        </div>

        {/* Separator line */}
        <GoldDivider variant="dash" className="my-12 opacity-30" />

        {/* Bottom Strip */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 text-[10px] text-[#8A8A8A] tracking-[0.08em] font-body">
          <span>Copyright &copy; 2024 Fresh Beans Coffee Trading PLC. All Rights Reserved.</span>

          {/* Micro sequence of origins sorted with markers */}
          <div className="hidden lg:flex items-center gap-2 text-gold/60 font-semibold">
            <span>YIRGACHEFFE</span>
            <span className="opacity-30">&#183;</span>
            <span>GUJI</span>
            <span className="opacity-30">&#183;</span>
            <span>SIDAMO</span>
            <span className="opacity-30">&#183;</span>
            <span>JIMMA</span>
          </div>

          <div className="flex items-center gap-4 text-center">
            <span>SPEC-GREEN EXPORTER</span>
            <span>&#183;</span>
            <span>DIRECT OCEAN SHIPMENT</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
