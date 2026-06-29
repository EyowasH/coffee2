import React from 'react';
import Navigation from '@/components/layout/Navigation';
import Hero from '@/components/sections/Hero';
import Heritage from '@/components/sections/Heritage';
import Origins from '@/components/sections/Origins';
import JourneyScroll from '@/components/sections/JourneyScroll';
import DryingBeds from '@/components/sections/DryingBeds';
import Quality from '@/components/sections/Quality';
import GlobalReach from '@/components/sections/GlobalReach';
import WhyUs from '@/components/sections/WhyUs';
import Partnership from '@/components/sections/Partnership';
import Footer from '@/components/layout/Footer';
import GsapScrollOrchestrator from '@/components/ui/GsapScrollOrchestrator';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-obsidian text-stone overflow-x-hidden selection:bg-gold selection:text-obsidian">
      {/* Cinematic Scroll Trigger Animations Coordinator */}
      <GsapScrollOrchestrator />

      {/* Luxury Navigation Overlay */}
      <Navigation />

      {/* Structural Sections Layout List */}
      <Hero />
      <Heritage />
      <Origins />
      <JourneyScroll />
      <DryingBeds />
      <Quality />
      <GlobalReach />
      <WhyUs />
      <Partnership />

      {/* Editorial Footer Information */}
      <Footer />
    </main>
  );
}
