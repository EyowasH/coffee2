'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function GsapScrollOrchestrator() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Dynamic top progress line creation
    const progressContainer = document.createElement('div');
    progressContainer.id = 'luxury-scroll-progress-container';
    progressContainer.style.position = 'fixed';
    progressContainer.style.top = '0';
    progressContainer.style.left = '0';
    progressContainer.style.width = '100%';
    progressContainer.style.height = '4px';
    progressContainer.style.zIndex = '99999';
    progressContainer.style.pointerEvents = 'none';
    progressContainer.style.background = 'rgba(255, 255, 255, 0.03)';
    
    const progressBar = document.createElement('div');
    progressBar.id = 'luxury-scroll-progress-bar';
    progressBar.style.height = '100%';
    progressBar.style.width = '100%';
    progressBar.style.transform = 'scaleX(0)';
    progressBar.style.background = 'linear-gradient(90deg, #C5A059 0%, #E6E4E0 50%, #C5A059 100%)';
    progressBar.style.transformOrigin = 'left';
    progressBar.style.willChange = 'transform';
    progressContainer.appendChild(progressBar);
    document.body.appendChild(progressContainer);

    requestAnimationFrame(() => {
      setMounted(true);
    });

    if (typeof window === 'undefined') {
      progressContainer.remove();
      return;
    }

    // Register ScrollTrigger plugin safely
    gsap.registerPlugin(ScrollTrigger);

    // Throttled refresh helper using requestAnimationFrame
    let refreshPending = false;
    const throttledRefresh = () => {
      if (!refreshPending) {
        refreshPending = true;
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
          refreshPending = false;
        });
      }
    };

    let scrollUpdateListener: (() => void) | null = null;

    // Coordinate with global Lenis if present
    const initLenisSync = () => {
      const lenis = (window as any).lenis;
      if (lenis) {
        let scrollUpdatePending = false;
        scrollUpdateListener = () => {
          if (!scrollUpdatePending) {
            scrollUpdatePending = true;
            requestAnimationFrame(() => {
              ScrollTrigger.update();
              scrollUpdatePending = false;
            });
          }
        };

        lenis.on('scroll', scrollUpdateListener);
        gsap.ticker.lagSmoothing(0);
        
        // Initial refresh once synced with Lenis
        throttledRefresh();
      }
    };

    // Watch for layout changes via ResizeObserver on the document body
    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && document.body) {
      resizeObserver = new ResizeObserver(() => {
        throttledRefresh();
      });
      resizeObserver.observe(document.body);
    }

    // Monitor all image loads to trigger refresh, ensuring accurate heights
    const handleImageLoad = () => {
      throttledRefresh();
    };

    const images = document.querySelectorAll('img');
    images.forEach((img) => {
      if (img.complete) {
        // Already loaded
      } else {
        img.addEventListener('load', handleImageLoad);
      }
    });

    // Give Lenis a tiny amount of time to initialize
    const timer = setTimeout(() => {
      initLenisSync();
      throttledRefresh();
    }, 100);

    // Apply GSAP Animations within a React Context Scope
    const ctx = gsap.context(() => {
      
      // 1. Sleek top-of-screen global scroll progress line linking entire site
      gsap.to('#luxury-scroll-progress-bar', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        }
      });

      // 2. Headings True 2026 Editorial Mask-Reveals (translating, skewing and clip-path polygon masks)
      const contentSections = [
        '#heritage',
        '#origins',
        '#journey',
        '#drying',
        '#quality',
        '#markets',
        '#buyers',
        '#partnership',
        'footer'
      ];

      const headingsToAnimate: Element[] = [];
      const paragraphsToAnimate: Element[] = [];

      contentSections.forEach((selector) => {
        const sect = document.querySelector(selector);
        if (sect) {
          const headings = sect.querySelectorAll('h1, h2, h3, h4, h5, h6');
          headings.forEach((el) => {
            if (
              el.closest('button') || 
              el.closest('a') && el.classList.contains('btn') ||
              el.classList.contains('sr-only')
            ) {
              return;
            }
            headingsToAnimate.push(el);
          });

          const paragraphs = sect.querySelectorAll('p');
          paragraphs.forEach((el) => {
            if (
              el.closest('button') || 
              el.closest('a') && el.classList.contains('btn') ||
              el.classList.contains('sr-only')
            ) {
              return;
            }
            paragraphsToAnimate.push(el);
          });
        }
      });

      // 60FPS Hardware Optimization Helper
      const prepElementFor60fps = (el: Element | null, props: string = 'transform, opacity') => {
        if (!el) return;
        const html = el as HTMLElement;
        html.style.willChange = props;
        html.style.backfaceVisibility = 'hidden';
        html.style.transformStyle = 'preserve-3d';
      };

      // Safe dynamic text splitter helper (purely post-hydration within Web/Effect context)
      const splitTextIntoWords = (el: HTMLElement) => {
        if (el.dataset.splitted) return;
        // Skip splitting if node has HTML children to protect styling or color structures
        if (el.children.length > 0) return;
        el.dataset.splitted = 'true';
        
        const originalText = el.innerText || el.textContent || '';
        const words = originalText.trim().split(/\s+/);
        el.innerHTML = '';
        
        words.forEach((word, idx) => {
          const outer = document.createElement('span');
          outer.style.display = 'inline-block';
          outer.style.overflow = 'hidden';
          outer.style.verticalAlign = 'top';
          outer.style.lineHeight = '1.2';
          
          const inner = document.createElement('span');
          inner.style.display = 'inline-block';
          inner.className = 'split-inner-word';
          inner.textContent = word + (idx < words.length - 1 ? '\u00A0' : '');
          
          outer.appendChild(inner);
          el.appendChild(outer);
        });
      };

      // Mask reveal headings on entry with translation and clip-path polygon reveals
      headingsToAnimate.forEach((heading) => {
        const htmlHeading = heading as HTMLElement;
        const hasChildren = htmlHeading.children.length > 0;

        if (!hasChildren) {
          splitTextIntoWords(htmlHeading);
          const innerWords = htmlHeading.querySelectorAll('.split-inner-word');
          innerWords.forEach((word) => prepElementFor60fps(word, 'transform, opacity'));
          
          gsap.fromTo(innerWords,
            {
              yPercent: 105,
              rotate: 3,
              opacity: 0
            },
            {
              yPercent: 0,
              rotate: 0,
              opacity: 1,
              duration: 1.45,
              stagger: 0.035,
              ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
              scrollTrigger: {
                trigger: heading,
                start: () => window.innerWidth < 768 ? 'top 96%' : 'top 93%',
                toggleActions: 'play none none reverse',
                once: false
              }
            }
          );
        } else {
          prepElementFor60fps(heading, 'transform, opacity, clip-path');
          gsap.fromTo(heading,
            {
              opacity: 0,
              y: 85,
              skewY: 5,
              clipPath: 'polygon(0px 100%, 100% 100%, 100% 100%, 0px 100%)'
            },
            {
              opacity: 1,
              y: 0,
              skewY: 0,
              clipPath: 'polygon(0px 0%, 100% 0%, 100% 100%, 0px 100%)',
              duration: 1.7,
              ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
              scrollTrigger: {
                trigger: heading,
                start: () => window.innerWidth < 768 ? 'top 96%' : 'top 93%',
                toggleActions: 'play none none reverse',
                once: false
              }
            }
          );
        }
      });

      // Re-initialize Paragraph styles safely
      paragraphsToAnimate.forEach((para) => {
        const htmlPara = para as HTMLElement;
        const hasChildren = htmlPara.children.length > 0;

        if (!hasChildren) {
          splitTextIntoWords(htmlPara);
          const innerWords = htmlPara.querySelectorAll('.split-inner-word');
          innerWords.forEach((word) => prepElementFor60fps(word, 'transform, opacity'));
          
          gsap.fromTo(innerWords,
            {
              yPercent: 100,
              opacity: 0
            },
            {
              yPercent: 0,
              opacity: 1,
              duration: 1.25,
              stagger: 0.012,
              ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
              scrollTrigger: {
                trigger: para,
                start: () => window.innerWidth < 768 ? 'top 98%' : 'top 95%',
                toggleActions: 'play none none reverse',
                once: false
              }
            }
          );
        } else {
          prepElementFor60fps(para, 'transform, opacity, filter');
          gsap.fromTo(para,
            {
              opacity: 0,
              y: 35,
              filter: 'blur(5px)'
            },
            {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 1.6,
              ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
              scrollTrigger: {
                trigger: para,
                start: () => window.innerWidth < 768 ? 'top 98%' : 'top 95%',
                toggleActions: 'play none none reverse',
                once: false
              }
            }
          );
        }
      });

      // Stature change on sublabels and captions
      const labelsToAnimate = document.querySelectorAll('.text-label, .text-caption, .text-micro');
      labelsToAnimate.forEach((label) => {
        prepElementFor60fps(label, 'transform, opacity');
        gsap.fromTo(label,
          {
            opacity: 0,
            x: -25,
            letterSpacing: '0.12em',
          },
          {
            opacity: 1,
            x: 0,
            letterSpacing: '0.2em',
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: label,
              start: 'top 95%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      // 3. Cinematic Border Radius Morphing & Image Zoom Scrub (Obys/Active Theory style)
      // Only do it on stable section images to avoid any React unmount crashes inside views with AnimatePresence
      const morphImages = document.querySelectorAll(
        `#heritage img, #drying img, #quality img`
      );
      morphImages.forEach((img) => {
        if (!img) return;
        prepElementFor60fps(img, 'transform');
        gsap.fromTo(img,
          { 
            scale: 1.25,
          },
          {
            scale: 1.0,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: img.parentElement || img,
              start: 'top bottom',
              end: 'bottom center',
              scrub: 1.2,
            }
          }
        );
      });

      // 4. Hero Section 3D Curtains-Up Screen Freeze Pinning Moment
      // Combine pinning and scroll animations on #hero into a single clean ScrollTrigger/Timeline to prevent conflicts
      const heroTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          pin: true,
          pinSpacing: false,
          scrub: true,
        }
      });

      const heroH1 = document.querySelector('#hero h1');
      if (heroH1) {
        prepElementFor60fps(heroH1, 'transform, opacity');
        heroTimeline.to(heroH1, {
          yPercent: -35,
          scale: 0.94,
          opacity: 0,
          ease: 'none'
        }, 0);
      }
      
      const heroP = document.querySelector('#hero p');
      if (heroP) {
        prepElementFor60fps(heroP, 'transform, opacity');
        heroTimeline.to(heroP, {
          yPercent: -20,
          opacity: 0,
          ease: 'none'
        }, 0);
      }

      const heroVideoWrap = document.querySelector('#hero video')?.parentElement;
      if (heroVideoWrap) {
        prepElementFor60fps(heroVideoWrap, 'transform, opacity');
        heroTimeline.to(heroVideoWrap, {
          scale: 1.15,
          opacity: 0.25,
          ease: 'none'
        }, 0);
      }

      // 5. Heritage Section - Relative Parallax Focal Shift for Overlapping Images
      const heritageImages = document.querySelectorAll('#heritage img');
      if (heritageImages.length >= 2) {
        const bgImage = heritageImages[0];
        const fgImage = heritageImages[1];
        prepElementFor60fps(bgImage, 'transform');
        prepElementFor60fps(fgImage, 'transform');

        // Background moves slower and down
        gsap.fromTo(bgImage,
          { yPercent: -15, scale: 1.15 },
          {
            yPercent: 12,
            scale: 1.0,
            ease: 'none',
            scrollTrigger: {
              trigger: '#heritage',
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            }
          }
        );

        // Foreground moves faster and up, creating 3D camera displacement
        gsap.fromTo(fgImage,
          { yPercent: 20, scale: 0.92 },
          {
            yPercent: -18,
            scale: 1.08,
            ease: 'none',
            scrollTrigger: {
              trigger: '#heritage',
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            }
          }
        );
      }

      const heritageLines = document.querySelectorAll(
        '#heritage hr, #heritage [role="separator"], #heritage .w-full.h-\\[1px\\]'
      );
      if (heritageLines.length > 0) {
        heritageLines.forEach(line => prepElementFor60fps(line, 'transform'));
        gsap.fromTo(heritageLines,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            duration: 2.0,
            stagger: 0.25,
            ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
            scrollTrigger: {
              trigger: '#heritage',
              start: () => window.innerWidth < 768 ? 'top 95%' : 'top 75%'
            }
          }
        );
      }

      // 6. Origins Section - Kinetic Microclimate Parameter Flow
      const originBlocks = document.querySelectorAll('#origins .lg\\:col-span-7 > *');
      if (originBlocks.length > 0) {
        originBlocks.forEach(block => prepElementFor60fps(block, 'transform, opacity'));
        gsap.fromTo(originBlocks,
          { opacity: 0, y: 35, skewX: -2 },
          {
            opacity: 1,
            y: 0,
            skewX: 0,
            stagger: 0.12,
            duration: 1.5,
            ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
            scrollTrigger: {
              trigger: '#origins',
              start: () => window.innerWidth < 768 ? 'top 92%' : 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // 7. Drying Beds Panels - Overlapping Stagger with depth
      const dryingGridCells = document.querySelectorAll('#drying .grid > div');
      if (dryingGridCells.length > 0) {
        dryingGridCells.forEach(cell => prepElementFor60fps(cell, 'transform, opacity'));
        gsap.fromTo(dryingGridCells,
          { opacity: 0, y: 70, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.4,
            stagger: 0.15,
            ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
            scrollTrigger: {
              trigger: '#drying',
              start: () => window.innerWidth < 768 ? 'top 94%' : 'top 82%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // 8. Quality Trust Pillars - Overlapping Deck-Card Scaling Entrance Flow
      const qualityPillars = document.querySelectorAll('#quality .grid > div');
      if (qualityPillars.length > 0) {
        qualityPillars.forEach(pillar => prepElementFor60fps(pillar, 'transform, opacity'));
        gsap.fromTo(qualityPillars,
          { 
            opacity: 0, 
            y: 90, 
            scale: 0.93,
            rotationZ: -1
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationZ: 0,
            duration: 1.6,
            stagger: 0.15,
            ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
            scrollTrigger: {
              trigger: '#quality',
              start: () => window.innerWidth < 768 ? 'top 92%' : 'top 82%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      const qualityRows = document.querySelectorAll('#quality .space-y-4 > div');
      if (qualityRows.length > 0) {
        qualityRows.forEach(row => prepElementFor60fps(row, 'transform, opacity'));
        gsap.fromTo(qualityRows,
          { opacity: 0, x: -35 },
          {
            opacity: 1,
            x: 0,
            duration: 1.2,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '#quality .grid-cols-12',
              start: () => window.innerWidth < 768 ? 'top 90%' : 'top 75%'
            }
          }
        );
      }

      // 9. Buyer Testimonials Smooth Entrance
      const buyersCards = document.querySelectorAll('#buyers .bg-stoneSoft, #buyers [role="none"], #buyers p.italic');
      if (buyersCards.length > 0) {
        buyersCards.forEach(card => prepElementFor60fps(card, 'transform, opacity'));
        gsap.fromTo(buyersCards,
          { opacity: 0, y: 40, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.3,
            stagger: 0.12,
            ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
            scrollTrigger: {
              trigger: '#buyers',
              start: () => window.innerWidth < 768 ? 'top 92%' : 'top 75%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // 10. Global Export Destination circle pins elastic entrance
      const marketCirclePins = document.querySelectorAll('#markets svg circle');
      if (marketCirclePins.length > 0) {
        marketCirclePins.forEach(pin => prepElementFor60fps(pin, 'transform, opacity'));
        gsap.fromTo(marketCirclePins,
          { scale: 0, opacity: 0, transformOrigin: 'center center' },
          {
            scale: 1,
            opacity: 1,
            duration: 1.5,
            stagger: 0.08,
            ease: 'elastic.out(1, 0.55)',
            scrollTrigger: {
              trigger: '#markets',
              start: () => window.innerWidth < 768 ? 'top 92%' : 'top 75%'
            }
          }
        );
      }

      const marketPaths = document.querySelectorAll('#markets svg path');
      if (marketPaths.length > 0) {
        marketPaths.forEach(path => prepElementFor60fps(path, 'stroke-dashoffset'));
        gsap.fromTo(marketPaths,
          { strokeDashoffset: 1200, strokeDasharray: 1200 },
          {
            strokeDashoffset: 0,
            duration: 2.8,
            stagger: 0.15,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: '#markets',
              start: () => window.innerWidth < 768 ? 'top 90%' : 'top 70%'
            }
          }
        );
      }

      // 11. B2B Alliance Sourcing input groups sequential trigger
      const formInputContainers = document.querySelectorAll('#partnership form > div, #partnership .space-y-6 > *');
      if (formInputContainers.length > 0) {
        formInputContainers.forEach(container => prepElementFor60fps(container, 'transform, opacity'));
        gsap.fromTo(formInputContainers,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '#partnership',
              start: () => window.innerWidth < 768 ? 'top 92%' : 'top 80%'
            }
          }
        );
      }

    });

    // Cleanups registry to manage elite interactive listeners safely
    const cleanups: (() => void)[] = [];
    const addEvent = (el: Element | Window, type: string, idxListener: any) => {
      el.addEventListener(type, idxListener);
      cleanups.push(() => el.removeEventListener(type, idxListener));
    };

    // Golden Ambient Parallax Blooms mapping
    const ambientBlobs = document.querySelectorAll(
      '.rounded-full[class*="bg-gold/5"], .absolute[class*="blur-"]'
    );
    if (ambientBlobs.length > 0) {
      ambientBlobs.forEach(blob => {
        const html = blob as HTMLElement;
        html.style.willChange = 'transform';
        html.style.backfaceVisibility = 'hidden';
      });
      const handleAmbientParallax = (e: MouseEvent) => {
        const normX = (e.clientX / window.innerWidth) - 0.5;
        const normY = (e.clientY / window.innerHeight) - 0.5;
        
        ambientBlobs.forEach((blob) => {
          gsap.to(blob, {
            x: normX * 45,
            y: normY * 45,
            ease: 'power2.out',
            duration: 0.8,
            overwrite: 'auto',
          });
        });
      };
      addEvent(window, 'mousemove', handleAmbientParallax);
    }

    // Handle debounced window resizing to calculate responsive bounds elegantly
    let resizeTimeout: any = null;
    const handleWindowResize = () => {
      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
      }
      resizeTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 250);
    };
    window.addEventListener('resize', handleWindowResize);
    cleanups.push(() => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleWindowResize);
    });

    return () => {
      clearTimeout(timer);
      ctx.revert(); // perfectly clear all GSAP triggers and styles
      // Run custom element event cleanups
      cleanups.forEach((run) => run());
      const lenis = (window as any).lenis;
      if (lenis && scrollUpdateListener) {
        lenis.off('scroll', scrollUpdateListener);
      }
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      images.forEach((img) => {
        img.removeEventListener('load', handleImageLoad);
      });
      progressContainer.remove();
    };
  }, []);

  return null;
}
