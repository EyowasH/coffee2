'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import MagneticButton from '@/components/ui/MagneticButton';
import { Menu, X, Globe, Phone, Mail } from 'lucide-react';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import { gsap } from 'gsap';

const navLinks = [
  { label: 'Heritage', href: '#heritage' },
  { label: 'Origins', href: '#origins' },
  { label: 'Journey', href: '#journey' },
  { label: 'Drying Process', href: '#drying' },
  { label: 'Quality & Trust', href: '#quality' },
  { label: 'Markets', href: '#markets' },
];

export default function Navigation() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [isNavHidden, setIsNavHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const lastScrollY = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          '.mobile-nav-link',
          {
            opacity: 0,
            x: -40,
            rotateX: -15,
            skewY: 1,
            transformOrigin: 'left center',
          },
          {
            opacity: 1,
            x: 0,
            rotateX: 0,
            skewY: 0,
            duration: 0.8,
            stagger: 0.05,
            ease: 'power4.out',
            delay: 0.15,
          }
        );

        gsap.fromTo(
          '.mobile-nav-divider',
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            duration: 0.8,
            ease: 'power3.out',
            delay: 0.35,
          }
        );

        gsap.fromTo(
          '.mobile-nav-actions',
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            delay: 0.45,
          }
        );
      }, containerRef);

      return () => {
        ctx.revert();
      };
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    let scrollPending = false;
    const handleScroll = () => {
      if (!scrollPending) {
        scrollPending = true;
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // Make visible only after 60px scroll
          if (currentScrollY > 60) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }

          // Check scroll direction and set hidden state
          let nextScrollDirection = lastScrollY.current !== 0 ? (currentScrollY > lastScrollY.current ? 'down' : 'up') : null;

          if (currentScrollY > lastScrollY.current + 10) {
            setScrollDirection('down');
            nextScrollDirection = 'down';
          } else if (currentScrollY < lastScrollY.current - 10) {
            setScrollDirection('up');
            nextScrollDirection = 'up';
          }

          if (nextScrollDirection === 'down' && currentScrollY > 200) {
            setIsNavHidden(true);
          } else if (nextScrollDirection === 'up' || currentScrollY <= 200) {
            setIsNavHidden(false);
          }

          lastScrollY.current = currentScrollY;
          scrollPending = false;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Active Section Intersection Observer
    const sections = navLinks.map((link) => link.href.replace('#', ''));
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  // Smooth scroll handler
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      setIsMobileMenuOpen(false);
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.nav
            initial={{ opacity: 0, y: -24 }}
            animate={{
              opacity: 1,
              y: isNavHidden ? -100 : 0,
            }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ type: 'spring', stiffness: 220, damping: 24 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-7xl bg-obsidian/90 border border-white/10 backdrop-blur-md rounded-none px-6 flex flex-row flex-nowrap items-center justify-between h-[64px] min-[380px]:h-[76px] sm:h-[92px] md:h-[106px] lg:h-[120px] shadow-2xl"
          >
            {/* Left: Brand Logo */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center group cursor-pointer"
            >
              <div className="relative w-[220px] h-[58px] min-[380px]:w-[260px] min-[380px]:h-[69px] sm:w-[310px] sm:h-[83px] md:w-[350px] md:h-[93px] lg:w-[410px] lg:h-[110px] flex-shrink-0">
                <Image
                  src="https://res.cloudinary.com/dlgvyseuq/image/upload/v1782629902/fresh-beans-coffee-trading/Freshbeanslogo-removebg-preview-Photoroom_gugilr.png"
                  alt="Fresh Beans Coffee Trading PLC Logo"
                  fill
                  priority
                  sizes="(max-width: 380px) 220px, (max-width: 640px) 260px, (max-width: 768px) 310px, (max-width: 1024px) 350px, 410px"
                  style={{ objectFit: 'contain' }}
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </a>

            {/* Center Links - Desktop Only */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    className={cn(
                      'relative font-body text-[11px] font-semibold tracking-[0.16em] uppercase transition-colors duration-300 py-1 cursor-pointer',
                      isActive ? 'text-gold' : 'text-[#8A8A8A] hover:text-white'
                    )}
                  >
                    {link.label}
                    {/* Hover slider line */}
                    <span
                      className={cn(
                        'absolute bottom-0 left-0 w-full h-[1px] bg-gold scale-x-0 transition-transform duration-300 origin-left',
                        isActive ? 'scale-x-100' : 'hover:scale-x-100'
                      )}
                    />
                  </a>
                );
              })}
            </div>

            {/* Right Side Interactions */}
            <div className="flex items-center gap-4">
              {/* Request Samples Button */}
              <a href="#partnership">
                <MagneticButton
                  variant="ghost"
                  className="hidden md:inline-flex !py-2 !px-5 text-[10px] border-gold/30 hover:border-gold hover:text-gold pointer-events-auto"
                >
                  REQUEST SAMPLES
                </MagneticButton>
              </a>

              {/* Hamburger Button - Mobile Only */}
              <button
                aria-expanded={isMobileMenuOpen}
                aria-label="Toggle navigation menu"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden text-white/80 hover:text-white cursor-pointer p-2 pointer-events-auto min-w-[44px] min-h-[44px] flex items-center justify-center rounded-none hover:bg-white/5 transition-colors focus:outline-none focus:ring-1 focus:ring-gold"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Slide-in Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-xs lg:hidden"
            />

            {/* Sliding Drawer Panel */}
            <motion.div
              ref={containerRef}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile Navigation Menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 240 }}
              className="fixed top-0 right-0 bottom-0 h-full w-[85%] max-w-[380px] bg-obsidian/90 border-l border-white/10 backdrop-blur-md shadow-2xl z-50 flex flex-col justify-between lg:hidden [perspective:1000px] select-none focus:outline-none"
              tabIndex={-1}
            >
              {/* Background dynamic blur accent */}
              <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />

              {/* Top Drawer Header with Brand & Close Button */}
              <div className="relative z-10 flex items-center justify-between px-6 py-5 border-b border-white/10 bg-obsidian/40 backdrop-blur-sm">
                <div className="flex flex-col">
                  <span className="font-display text-sm font-semibold tracking-[0.08em] text-white">
                    FRESH BEANS COFFEE
                  </span>
                  <span className="text-[9px] font-mono tracking-widest text-[#8A8A8A] uppercase">
                    EXPORT DESK
                  </span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close navigation menu"
                  className="text-white/70 hover:text-white cursor-pointer p-2 border border-white/5 bg-white/5 hover:bg-white/10 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center focus:outline-none focus:ring-1 focus:ring-gold"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Content (Contact Header & Links) */}
              <div className="relative z-10 flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-6">
                
                {/* Clear Company Contact Header Card (Improving Accessibility) */}
                <div className="mobile-nav-link opacity-0 flex flex-col gap-3 p-4 bg-gold/[0.04] border border-gold/10 rounded-none">
                  <span className="text-[9px] font-bold tracking-[0.2em] text-gold uppercase font-body block">
                    QUICK CONTACT DESK
                  </span>
                  <div className="flex flex-col gap-2.5">
                    <a
                      href="tel:+251924115178"
                      className="flex items-center gap-2.5 text-stone/90 hover:text-gold transition-colors py-1 select-text text-xs min-h-[44px]"
                    >
                      <Phone className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                      <span className="font-mono font-medium tracking-wide">+251 924 115 178</span>
                    </a>
                    <a
                      href="mailto:coffeefreshbeans@gmail.com"
                      className="flex items-center gap-2.5 text-stone/90 hover:text-gold transition-colors py-1 select-text text-xs min-h-[44px]"
                    >
                      <Mail className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                      <span className="font-mono font-medium tracking-wide break-all">coffeefreshbeans@gmail.com</span>
                    </a>
                  </div>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] font-bold tracking-[0.2em] text-[#8A8A8A] uppercase font-body mb-2 block">
                    NAVIGATION
                  </span>
                  {navLinks.map((link) => {
                    const isActive = activeSection === link.href.replace('#', '');
                    return (
                      <div
                        key={link.label}
                        className="mobile-nav-link opacity-0"
                      >
                        <a
                          href={link.href}
                          onClick={(e) => handleScrollTo(e, link.href)}
                          className={cn(
                            "font-display text-2xl block transition-colors duration-300 relative py-2.5 min-h-[44px] flex items-center focus:outline-none focus:text-gold",
                            isActive ? "text-gold font-medium" : "text-stone/70 hover:text-white font-light"
                          )}
                        >
                          {link.label}
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Actions of Mobile Drawer */}
              <div className="relative z-10 p-6 border-t border-white/5 bg-obsidian/60 backdrop-blur-sm flex flex-col gap-5 mobile-nav-actions opacity-0">
                <div className="flex flex-col gap-4">
                  <a href="#partnership" onClick={() => setIsMobileMenuOpen(false)}>
                    <MagneticButton variant="gold" className="w-full">
                      Sourcing Inquiry
                    </MagneticButton>
                  </a>
                  <div className="flex items-center justify-between text-xs tracking-widest text-[#8A8A8A] px-1">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-gold" />
                      <span className="text-white font-medium">EN</span>
                      <span>/</span>
                      <span className="hover:text-white cursor-pointer">JA</span>
                      <span>/</span>
                      <span className="hover:text-white cursor-pointer">DE</span>
                    </div>
                    <span className="text-[10px] text-[#555] font-mono">EST. 2024</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating contact widget under client component hydration space */}
      <WhatsAppButton />
    </>
  );
}
